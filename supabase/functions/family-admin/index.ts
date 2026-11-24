// The family organizer's panel: a Supabase Edge Function named "family-admin".
//
// Lets the organizer (the one account marked { "role": "organizer" } in app_metadata, see
// tools/organizer.sql) manage the family from inside the app:
//   - see everyone in the family, when they last signed in, and their Bible helper use
//   - see how much of this month's Bible helper allowance the family has left
//   - add a family member with a temporary password (they choose their own at first sign-in)
//   - give someone a new temporary password if they forget theirs
//   - remove someone from the family
//
// Safety:
//   - Every request is checked: the caller must be signed in AND be the organizer. Anyone
//     else gets "not allowed", whatever they send.
//   - The admin key (SUPABASE_SERVICE_ROLE_KEY) is provided to Edge Functions by Supabase
//     itself. It never leaves Supabase and is never in the app.
//   - The organizer can't remove their own account or strip their own organizer mark here.

import { createClient } from "npm:@supabase/supabase-js@2";

const num = (name: string, fallback: number) => {
  const v = Number(Deno.env.get(name));
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : fallback;
};
// The same limits the Bible helper uses (study-partner); Supabase secrets are shared.
const MONTHLY_LIMIT = num("MONTHLY_LIMIT", 12000);
const MONTHLY_CENTS = num("MONTHLY_CENTS", 900);
const PER_PERSON = num("PER_PERSON", 100);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

// Supabase's errors are plain objects, not Error, so pull out whatever message they carry.
const says = (e: unknown) => {
  if (e instanceof Error) return e.message;
  const o = e as Record<string, unknown> | null;
  return String(o?.message || o?.msg || o?.error_description || o?.code || JSON.stringify(e));
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const goodPassword = (p: unknown) => typeof p === "string" && p.length >= 6 && p.length <= 72;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return reply(405, { error: "method" });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  const { data: who, error: whoErr } = await admin.auth.getUser(token);
  if (whoErr || !who.user) return reply(401, { error: "signin" });
  if (who.user.app_metadata?.role !== "organizer") return reply(403, { error: "not_allowed" });
  const me = who.user.id;

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty */ }
  const action = String(body.action || "list");

  try {
    if (action === "list") {
      const { data: page, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
      if (error) throw error;
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      // The helper's usage is a nice extra: if it can't be read (say the ai_usage table was never
      // made), still list the family, with usage unknown.
      let usage: { user_id: string; input_tokens: number; output_tokens: number }[] | null = null;
      let usageProblem = "";
      try {
        const { data, error: uErr } = await admin.from("ai_usage").select("user_id, input_tokens, output_tokens").gte("created_at", monthStart);
        if (uErr) usageProblem = uErr.message || "ai_usage"; else usage = data;
      } catch (e) { usageProblem = says(e); }
      const asked: Record<string, number> = {};
      let cents = 0;
      for (const u of usage || []) {
        asked[u.user_id] = (asked[u.user_id] || 0) + 1;
        cents += (u.input_tokens * 0.10 + u.output_tokens * 0.50) / 10000;
      }
      const people = page.users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.user_metadata?.name || "",
        organizer: u.app_metadata?.role === "organizer",
        lastSignIn: u.last_sign_in_at || null,
        tempPassword: Boolean(u.user_metadata?.temp_password),
        asked: usage ? asked[u.id] || 0 : null,
      })).sort((a, b) => Number(b.organizer) - Number(a.organizer) || String(a.email).localeCompare(String(b.email)));
      const used = (usage || []).length;
      const resets = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString();
      return reply(200, {
        people,
        usageProblem: usageProblem || undefined,
        helper: usage === null ? null : {
          used, limit: MONTHLY_LIMIT, left: Math.max(0, MONTHLY_LIMIT - used),
          cents: Math.round(cents), centsLimit: MONTHLY_CENTS,
          pct: Math.round(Math.min(100, Math.max(used / MONTHLY_LIMIT, cents / MONTHLY_CENTS) * 100)),
          perPerson: PER_PERSON, resets,
        },
      });
    }

    if (action === "add") {
      const email = String(body.email || "").trim().toLowerCase();
      const name = String(body.name || "").trim().slice(0, 40);
      if (!EMAIL.test(email)) return reply(400, { error: "email" });
      if (!goodPassword(body.password)) return reply(400, { error: "password" });
      const { error } = await admin.auth.admin.createUser({
        email, password: String(body.password), email_confirm: true,
        user_metadata: { name, temp_password: true },
      });
      if (error) return reply(400, { error: /already/i.test(error.message) ? "exists" : "add" });
      return reply(200, { ok: true });
    }

    const id = String(body.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(id)) return reply(400, { error: "who" });

    if (action === "password") {
      if (!goodPassword(body.password)) return reply(400, { error: "password" });
      const { data: u, error: gErr } = await admin.auth.admin.getUserById(id);
      if (gErr || !u.user) return reply(404, { error: "who" });
      const { error } = await admin.auth.admin.updateUserById(id, {
        password: String(body.password),
        user_metadata: { ...(u.user.user_metadata || {}), temp_password: id !== me, own_password: id === me },
      });
      if (error) throw error;
      return reply(200, { ok: true });
    }

    // Which looks the family uses, as counts only (for choosing which looks to improve). It
    // never says who uses which look: no names, emails or ids leave this function.
    if (action === "looks") {
      const { data, error } = await admin.from("user_backups").select("style:data->>style, graphics:data->>graphics");
      if (error) throw error;
      const looks: Record<string, number> = {};
      let simple = 0;
      for (const r of (data || []) as { style: string | null; graphics: string | null }[]) {
        const k = r.style || "classic";
        looks[k] = (looks[k] || 0) + 1;
        if (r.graphics === "simple") simple++;
      }
      return reply(200, { looks, counted: (data || []).length, simple });
    }

    if (action === "remove") {
      if (id === me) return reply(400, { error: "self" });
      const { error } = await admin.auth.admin.deleteUser(id);
      if (error) throw error;
      return reply(200, { ok: true });
    }

    return reply(400, { error: "action" });
  } catch (e) {
    console.error("family-admin", action, says(e));
    return reply(500, { error: "busy", detail: `${action}: ${says(e)}`.slice(0, 200) });
  }
});
