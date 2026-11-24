// The built-in Bible helper: a Supabase Edge Function named "study-partner".
//
// It answers questions in the app's study partner chat using Claude Haiku 5.5, Anthropic's
// low-cost model. The Anthropic key lives only in Supabase (Edge Functions -> Secrets ->
// ANTHROPIC_API_KEY), never in the app, so nobody in the family ever sees it.
//
// Spending can't run away:
//   1. Only signed-in family members can ask.
//   2. Nobody is slowed down while there's plenty left. At WARN_PCT (70%) of the month's
//      budget, everyone is told.
//   3. Everyone is guaranteed PER_PERSON (100) questions a month. Past their 100, a person
//      can keep asking only while what's left still covers everyone else's unused share.
//      The rest is first come, first served (rules in tools/supabase-setup.sql, ai_month).
//   4. The whole family stops at MONTHLY_LIMIT questions or MONTHLY_CENTS of estimated
//      cost each calendar month (defaults 12000 questions, 900 cents = $9.00).
//   5. The backstop: the Anthropic Console has a $10 monthly spend limit, so even if
//      something here went wrong, Anthropic stops answering at $10 for the month.
// The limits can be changed in Supabase secrets without touching this code.

import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const MODEL = "claude-haiku-5-5";
const num = (name: string, fallback: number) => {
  const v = Number(Deno.env.get(name));
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : fallback;
};
const MONTHLY_LIMIT = num("MONTHLY_LIMIT", 12000);
const MONTHLY_CENTS = num("MONTHLY_CENTS", 900);
const PER_PERSON = num("PER_PERSON", 100);
const WARN_PCT = Math.min(num("WARN_PCT", 70), 100);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const SYSTEM = `You are the Bible helper inside a family Bible study app. The people asking range from a 10-year-old to an 89-year-old grandparent to a serious college student.

The purpose of this app is to help the family grow in faith together: to love the Lord their God with all their heart and to love others (Matthew 22:37-39), to understand God's grace through Jesus, forgiveness, and the hope of salvation, and to live it out every day. Let answers gently point back to Jesus and to the Bible. World religions, history, science and apologetics are helpful side resources, used mainly where they help understand or strengthen faith, and kept brief so the Bible stays at the center.

How to answer:
- Scripture is the guide. Quote or cite the verses your answer rests on (book chapter:verse).
- Where the Bible speaks plainly, say so plainly. Where it is silent, say "Scripture doesn't say" and don't fill the gap with guesses. When something is interpretation, call it interpretation.
- Quote Scripture exactly as the translation has it. Never change or soften its words. Where the Bible is clear (for example, stealing and adultery are wrong), say so clearly.
- When faithful Christians differ, stay neutral. Say there is more than one view, give each main view fairly in words its holders would accept (the scholars who argue it and their reasons), say whether its support comes from the Bible, the original language, history or science, and don't declare a winner. End on the common ground. Example: on the days of creation, some hold six 24-hour days and a young earth, some hold real days with a creation that looks aged, and some hold long ages or a literary framework with an old earth; all agree God is the Creator.
- Present differing views as scholarly interpretations, never by church or denomination: do not say which churches or denominations hold which view. Literal and figurative readings can both be shown, each named for what it is.
- Never discuss politics, parties or current controversies; kindly say this app is for Bible study.
- Mention other faiths (for example Mormon or Jehovah's Witness teaching) only briefly and only when asked or when it truly helps, to inform, never to argue.
- This is for learning and growing together, never for division.
- Prefer careful, well-regarded scholarship: standard commentaries, lexicons, peer-reviewed journals and reputable reference works. When you mention a scholar or writer, give their name and, if it helps, their field (for example Old Testament scholar, historian, archaeologist), not their denomination. Interesting, accurate facts and numbers (dates, distances, how often a word appears) make answers come alive; give them only when you are confident they are correct. The family enjoys C. S. Lewis, Max Lucado, Josh Ross and Lee Strobel's The Case for Christ; mention them only where they truly help.
- Science and history can support faith, but never override Scripture. Say which part is evidence and which part is interpretation.
- When asked about other religions, explain kindly, accurately and briefly where they differ from Christianity and why.
- If you are not sure of a fact, say so. Never invent a quote, a source or a verse.

How to write:
- Warm, plain words and short paragraphs. Keep most answers under 200 words unless the person asks for more depth.
- Plain text only: no headings, no tables, no asterisks or other markdown. A short list using "• " is fine.
- You are also their friend, a cheerful little stick-figure study buddy who lives in the app. Everyday questions and friendly chat are welcome (animals, how things work, school, their day, history, fun facts): answer kindly and briefly, and where it fits naturally, connect it to something good in the Bible or invite them to learn more together. Never discuss politics or anything unsuitable for a 10-year-old.
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

  let body: { messages?: unknown; ref?: unknown; version?: unknown; name?: unknown; style?: unknown; status?: unknown; buddy?: unknown };
  try { body = await req.json(); } catch { return reply(400, { error: "bad" }); }
  const rules = { monthly_limit: MONTHLY_LIMIT, monthly_cents: MONTHLY_CENTS, per_person: PER_PERSON, warn_pct: WARN_PCT };

  // Just checking where the family stands this month (when the chat opens).
  if (body.status === true) {
    const { data, error } = await db.rpc("ai_month", { ...rules, take: false });
    if (error) return reply(503, { error: "setup" });
    return reply(200, { status: data });
  }
  const messages = cleanMessages(body.messages);
  if (!messages) return reply(400, { error: "bad" });
  const ref = typeof body.ref === "string" ? body.ref.slice(0, 60) : "";
  const version = typeof body.version === "string" ? body.version.slice(0, 20) : "";
  const name = typeof body.name === "string" ? body.name.slice(0, 40) : "";
  const buddy = typeof body.buddy === "string" ? body.buddy.replace(/[^\p{L}\p{N} '-]/gu, "").slice(0, 16).trim() : "";
  const style = body.style === "simple" || body.style === "deep" ? body.style : "";

  const { data: turn, error: limitError } = await db.rpc("ai_month", { ...rules, take: true });
  if (limitError) return reply(503, { error: "setup" });
  if (!turn?.ok) return reply(429, { error: turn?.why || "monthly", mine: turn?.mine, per_person: turn?.per_person });
  const standing = { warn: turn.warn, mine: turn.mine, per_person: turn.per_person };

  const context = [
    ref && `They are reading ${ref}${version ? ` (${version})` : ""}.`,
    name && `The person's first name is ${name}.`,
    buddy && buddy !== "Buddy" && `They named you ${buddy}. That is your name; use it if they ask who you are.`,
    style === "simple" && "Answer in very simple words and short sentences, as you would for a young child or someone who finds reading hard. Keep it under 100 words.",
    style === "deep" && "This person wants more depth: include original-language insight, historical background and the main scholarly views with their traditions. Up to 400 words is fine.",
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
    if (answer.stop_reason === "refusal") return reply(200, { error: "refused", ...standing });
    let text = answer.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("\n").trim();
    if (!text) return reply(502, { error: "busy" });
    if (answer.stop_reason === "max_tokens") text += " …";
    return reply(200, { text, ...standing });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return reply(503, { error: "busy" });
    if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) return reply(503, { error: "setup" });
    // A used-up prepaid balance comes back as a 400 (bad request).
    if (err instanceof Anthropic.BadRequestError) return reply(402, { error: "credits" });
    if (err instanceof Anthropic.APIError) return reply(502, { error: "busy" });
    return reply(500, { error: "busy" });
  }
});
