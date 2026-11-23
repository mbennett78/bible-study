// The built-in Bible helper: a Supabase Edge Function named "study-partner".
//
// It answers questions in the app's study partner chat using Claude Haiku 5.5, Anthropic's
// low-cost model. The Anthropic key lives only in Supabase (Edge Functions -> Secrets ->
// ANTHROPIC_API_KEY), never in the app, so nobody in the family ever sees it.
//
// Spending can't run away:
//   1. Only signed-in family members can ask.
//   2. Each person gets DAILY_LIMIT questions in any 24 hours (default 25).
//   3. The whole family stops at MONTHLY_LIMIT questions or MONTHLY_CENTS of estimated
//      cost each calendar month (defaults 2000 questions, 400 cents = $4.00).
//   4. The real backstop: the Anthropic account holds prepaid credits with auto-reload
//      turned off. When the credits are used up, Anthropic stops answering. Nothing is
//      ever charged beyond what was prepaid.
// The limits can be changed in Supabase secrets without touching this code.

import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const MODEL = "claude-haiku-5-5";
const num = (name: string, fallback: number) => {
  const v = Number(Deno.env.get(name));
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : fallback;
};
const DAILY_LIMIT = num("DAILY_LIMIT", 25);
const MONTHLY_LIMIT = num("MONTHLY_LIMIT", 2000);
const MONTHLY_CENTS = num("MONTHLY_CENTS", 400);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const SYSTEM = `You are the Bible helper inside a family Bible study app. The people asking range from a 10-year-old to an 89-year-old grandparent to a serious college student. The family's background is Church of Christ and Baptist.

How to answer:
- Scripture is the guide. Quote or cite the verses your answer rests on (book chapter:verse).
- Where the Bible speaks plainly, say so plainly. Where it is silent, say "Scripture doesn't say" and don't fill the gap with guesses. When something is interpretation, call it interpretation.
- When faithful Christians differ, show the main views fairly and without taking sides. Show Church of Christ and Baptist views clearly and kindly where they matter, alongside others.
- When you mention a scholar or writer, name them and their tradition (for example Baptist, Church of Christ / Restoration Movement, Catholic, Jewish, secular historian). The family enjoys C. S. Lewis, Max Lucado, Josh Ross and Lee Strobel's The Case for Christ; mention them only where they truly help.
- Science and history can support faith, but never override Scripture. Say which part is evidence and which part is interpretation.
- When asked about other religions, explain kindly and accurately where they differ from Christianity and why.
- If you are not sure of a fact, say so. Never invent a quote, a source or a verse.

How to write:
- Warm, plain words and short paragraphs. Keep most answers under 200 words unless the person asks for more depth.
- Plain text only: no headings, no tables, no asterisks or other markdown. A short list using "• " is fine.
- If a question is about something unrelated to faith, the Bible or this study, answer briefly and kindly steer back to the Bible.
- If someone seems to be hurting or in danger, answer gently, point them to Scripture's comfort, and encourage them to talk to a parent, grandparent, minister or someone they trust right away (in the US they can call or text 988).`;

type Turn = { role: "user" | "assistant"; content: string };

function cleanMessages(raw: unknown): Turn[] | null {
  if (!Array.isArray(raw)) return null;
  const turns = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }) as Turn)
    .slice(-8);
  while (turns.length && turns[0].role !== "user") turns.shift();
  // The conversation must alternate and end with the person's question.
  const ok = turns.length > 0 && turns.every((t, i) => t.role === (i % 2 ? "assistant" : "user")) && turns.at(-1)!.role === "user";
  return ok ? turns : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return reply(405, { error: "method" });

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return reply(503, { error: "setup" });

  // Act as the person who is asking, so the database knows who they are.
  const auth = req.headers.get("Authorization") || "";
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || req.headers.get("apikey") || "";
  const db = createClient(Deno.env.get("SUPABASE_URL")!, supabaseKey, { global: { headers: { Authorization: auth } } });
  const { data: who } = await db.auth.getUser(auth.replace(/^Bearer\s+/i, ""));
  if (!who?.user) return reply(401, { error: "signin" });

  let body: { messages?: unknown; ref?: unknown; version?: unknown; name?: unknown };
  try { body = await req.json(); } catch { return reply(400, { error: "bad" }); }
  const messages = cleanMessages(body.messages);
  if (!messages) return reply(400, { error: "bad" });
  const ref = typeof body.ref === "string" ? body.ref.slice(0, 60) : "";
  const version = typeof body.version === "string" ? body.version.slice(0, 20) : "";
  const name = typeof body.name === "string" ? body.name.slice(0, 40) : "";

  const { data: turn, error: limitError } = await db.rpc("ai_take_turn", {
    daily_limit: DAILY_LIMIT, monthly_limit: MONTHLY_LIMIT, monthly_cents: MONTHLY_CENTS,
  });
  if (limitError) return reply(503, { error: "setup" });
  if (!turn?.ok) return reply(429, { error: turn?.why || "monthly", limit: turn?.limit });

  const context = [
    ref && `They are reading ${ref}${version ? ` (${version})` : ""}.`,
    name && `The person's first name is ${name}.`,
  ].filter(Boolean).join(" ");

  const anthropic = new Anthropic({ apiKey });
  try {
    const answer = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1500,
      output_config: { effort: "low" },
      system: context ? `${SYSTEM}\n\n${context}` : SYSTEM,
      messages,
    });
    await db.rpc("ai_record_turn", {
      turn: turn.turn, used_in: answer.usage.input_tokens, used_out: answer.usage.output_tokens,
    });
    if (answer.stop_reason === "refusal") return reply(200, { error: "refused" });
    let text = answer.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("\n").trim();
    if (!text) return reply(502, { error: "busy" });
    if (answer.stop_reason === "max_tokens") text += " …";
    return reply(200, { text, left: turn.left_today });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return reply(503, { error: "busy" });
    if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) return reply(503, { error: "setup" });
    // A used-up prepaid balance comes back as a 400 (bad request).
    if (err instanceof Anthropic.BadRequestError) return reply(402, { error: "credits" });
    if (err instanceof Anthropic.APIError) return reply(502, { error: "busy" });
    return reply(500, { error: "busy" });
  }
});
