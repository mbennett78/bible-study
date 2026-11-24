// Shared pieces for the browser tests: a small static server for the app, a pretend
// Supabase (so sign-in can be tested without a real account), and a tiny check helper.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

export const { chromium } = createRequire(import.meta.url)("playwright");
const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json" };

export function serve() {
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
    const file = join(ROOT, path.endsWith("/") ? `${path}index.html` : path);
    try {
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" }).end(body);
    } catch { res.writeHead(404).end(); }
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok({ url: `http://127.0.0.1:${server.address().port}/`, close: () => server.close() })));
}

let failures = 0, checks = 0;
export function check(name, ok, detail = "") {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${ok || !detail ? "" : `  (${detail})`}`);
  checks++;
  if (!ok) failures++;
}
export function finish(error) {
  if (error) { console.log(`FAIL the test stopped early: ${error.message.split("\n")[0]}`); failures++; }
  console.log(failures ? `\n${failures} of ${checks} check(s) failed` : `\nAll ${checks} checks passed`);
  process.exitCode = failures ? 1 : 0;
}

// A pretend Supabase that keeps a list of family members and records what the app asked for.
export const SUPA = "https://family-test.supabase.co"; // matches the app's content security policy
export function fakeSupabase(people) {
  const calls = [];
  const backups = {};
  const session = (u) => ({ access_token: `tok-${u.id}`, token_type: "bearer", expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, refresh_token: `ref-${u.id}`, user: user(u) });
  const user = (u) => ({ id: u.id, email: u.email, aud: "authenticated", role: "authenticated", user_metadata: u.meta || {}, app_metadata: u.app || {} });
  const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
  const bearer = (req) => (req.headers().authorization || "").replace("Bearer tok-", "");
  async function handle(route) {
    const req = route.request(), url = new URL(req.url()), m = req.method();
    if (m === "OPTIONS") return route.fulfill({ status: 200, headers: cors, body: "ok" });
    const body = req.postData() ? JSON.parse(req.postData()) : {};
    calls.push({ method: m, path: url.pathname, query: url.search, body });
    const json = (status, data) => route.fulfill({ status, headers: cors, json: data });
    if (url.pathname === "/auth/v1/token" && url.searchParams.get("grant_type") === "password") {
      const p = people.find((x) => x.email === body.email);
      if (!p || p.password !== body.password) return json(400, { error_code: "invalid_credentials", msg: "Invalid login credentials" });
      return json(200, session(p));
    }
    if (url.pathname === "/auth/v1/token") return route.abort("internetdisconnected"); // refresh: tests treat it as offline
    if (url.pathname === "/auth/v1/otp") {
      if (!people.some((x) => x.email === body.email)) return json(422, { error_code: "otp_disabled", msg: "Signups not allowed for otp" });
      return json(200, {});
    }
    if (url.pathname === "/auth/v1/verify") {
      const p = people.find((x) => x.email === body.email);
      if (!p || body.token !== "123456") return json(403, { error_code: "otp_expired", msg: "Token has expired or is invalid" });
      return json(200, session(p));
    }
    if (url.pathname === "/auth/v1/user") {
      const p = people.find((x) => x.id === bearer(req));
      if (!p) return json(401, { msg: "invalid JWT" });
      if (m === "PUT") {
        if (body.password === p.password) return json(422, { error_code: "same_password", msg: "New password should be different from the old password." });
        if (body.password) p.password = body.password;
        p.meta = { ...(p.meta || {}), ...(body.data || {}) };
      }
      return json(200, user(p));
    }
    if (url.pathname === "/auth/v1/logout") return route.fulfill({ status: 204, headers: cors });
    if (url.pathname === "/rest/v1/user_backups") {
      const id = bearer(req);
      if (m === "POST") { backups[id] = body; return json(201, []); }
      return json(200, backups[id] ? backups[id] : null);
    }
    if (url.pathname === "/rest/v1/family_settings") return json(200, null);
    if (url.pathname === "/functions/v1/family-admin") {
      const p = people.find((x) => x.id === bearer(req));
      if (!p || p.app?.role !== "organizer") return json(403, { error: "not_allowed" });
      if (body.action === "list") return json(200, { people: people.map((x) => ({ id: `0000000${x.id}`.padEnd(36, "0"), email: x.email, name: x.meta?.name || "", organizer: x.app?.role === "organizer", lastSignIn: null, tempPassword: false, asked: 3 })), helper: { used: 40, limit: 12000, left: 11960, cents: 12, centsLimit: 900, pct: 1, perPerson: 100, resets: "2026-12-01T00:00:00Z" } });
      if (body.action === "looks") return json(200, { looks: { christmas: 3, classic: 1, sage: 1 }, counted: 5, simple: 1 });
      return json(200, { ok: true });
    }
    if (url.pathname.startsWith("/functions/v1/")) return json(200, { status: { ok: true, warn: false, pct: 5, mine: 0, per_person: 100 } });
    return json(200, {});
  }
  return { calls, backups, handle };
}

// A browser page with sign-in turned on and pretend Bible text.
export async function signInPage(browser, base, fake, { seed, viewport = { width: 390, height: 900 }, state } = {}) {
  const ctx = await browser.newContext({ viewport, storageState: state });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: `window.BIBLE_CONFIG={supabaseUrl:"${SUPA}",supabaseAnonKey:"anon",starterPassword:"biblestudy"};document.documentElement.classList.add("auth-wait");` }));
  await ctx.route(/api\.bible|api\.esv\.org/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v">1</span>In the beginning was the Word.</p>' } } }));
  await ctx.route((u) => u.href.startsWith(SUPA), fake.handle);
  if (seed) await ctx.addInitScript((s) => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify(s)); }, seed);
  const page = await ctx.newPage();
  page.errors = [];
  page.on("pageerror", (e) => page.errors.push(e.message));
  page.on("dialog", (d) => d.accept());
  return { ctx, page };
}
