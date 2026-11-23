// Family sign-in with Supabase: email + password. Only people added in the Supabase
// dashboard can sign in (new sign-ups are turned off there). A forgotten password can be
// replaced by emailing a one-time sign-in link, then choosing a new password in Settings.
const cfg = window.BIBLE_CONFIG || {};
export const authEnabled = Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey);
const AUTH_KEY = "bible-study:auth";

// Arriving from an emailed sign-in link? Read the address before the sign-in library tidies it
// away: "signin" means the link worked, "expired" means it was old or already used.
export const linkArrival = (() => {
  try {
    const h = new URLSearchParams(location.hash.slice(1));
    if (h.get("error_code") || h.get("error")) return "expired";
    if (h.get("access_token") && /magiclink|recovery|email/.test(h.get("type") || "")) return "signin";
  } catch { /* no address to read */ }
  return null;
})();

let client = null;
async function sb() {
  if (!client) {
    // supabase-js 2.117.3 (MIT), kept in the app so sign-in doesn't depend on another website.
    if (!window.supabase) await new Promise((ok, fail) => {
      const tag = Object.assign(document.createElement("script"), { src: "js/vendor/supabase.js", onload: ok, onerror: fail });
      document.head.append(tag);
    });
    const { createClient } = window.supabase;
    client = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: AUTH_KEY },
    });
  }
  return client;
}

function savedUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY))?.user || null; } catch { return null; }
}

// The saved sign-in, read from this device (works offline). When the sign-in is more than an
// hour old the library renews it; if that fails only because there's no internet, the saved
// sign-in still counts. A sign-in that is truly over (revoked, or the person was removed) is
// deleted by the library, so it can't be used.
export async function currentUser() {
  if (!authEnabled) return null;
  try {
    const c = await sb();
    const { data, error } = await c.auth.getSession();
    if (data.session) return data.session.user;
    return error ? savedUser() : null;
  } catch {
    return savedUser(); // offline and the sign-in library couldn't load
  }
}

// Told when the sign-in ends while the app is open (signed out on this device, or it couldn't
// be renewed because it was revoked), so the app can ask the person to sign in again.
export async function onSignedOut(fn) {
  if (!authEnabled) return;
  try { const c = await sb(); c.auth.onAuthStateChange((event) => { if (event === "SIGNED_OUT") fn(); }); } catch { /* offline */ }
}

function friendly(error) {
  const m = String(error?.message || error || "");
  if (/invalid login|invalid credentials/i.test(m)) return "That email and password don't match. Check them and try again.";
  if (/email not confirmed/i.test(m)) return "This account isn't confirmed yet. Ask whoever set up the app to confirm it in Supabase.";
  if (/signups? not allowed|not found|user not/i.test(m)) return "That email isn't on the family list yet. Ask whoever set up the app to add it.";
  if (/should be different|same.password/i.test(m)) return "That's the password you already have. Please choose a new one.";
  if (/password.*(short|least|weak|character)/i.test(m)) return "Please use a longer password (at least 6 characters).";
  if (/session.*missing|not authenticated|jwt|refresh token/i.test(m)) return "You've been signed out. Please sign in again, then try once more.";
  if (/reauthenticat/i.test(m)) return "For safety, please sign out and sign in again, then change your password.";
  if (/expired|invalid|token|otp/i.test(m)) return "That code didn't work or has expired. Check the newest email, or send a new one.";
  if (/rate|too many|seconds|security purposes/i.test(m)) return "Too many tries just now. Please wait a minute and try again.";
  if (/fetch|network|load/i.test(m)) return "Couldn't connect. Check your internet and try again.";
  return m || "Something went wrong. Please try again.";
}

export async function signIn(email, password) {
  const c = await sb();
  const { data, error } = await c.auth.signInWithPassword({ email, password });
  if (error) throw new Error(friendly(error));
  return data.user;
}

// Forgotten password: email a one-time sign-in link back to this app's address.
export async function emailSignInLink(email) {
  const c = await sb();
  const { error } = await c.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: location.origin + location.pathname } });
  if (error) throw new Error(friendly(error));
}

// The 6-digit code in the same email (for when the link opens in a different browser,
// such as Safari instead of the app on the Home Screen).
export async function verifyEmailCode(email, code) {
  const c = await sb();
  const { data, error } = await c.auth.verifyOtp({ email, token: code, type: "email" });
  if (error) throw new Error(friendly(error));
  return data.user;
}

// Saves a new password. Also notes on the account that the person has their own password,
// so a second phone or tablet doesn't ask them to replace the starter one again.
export async function changePassword(password) {
  const c = await sb();
  const { error } = await c.auth.updateUser({ password, data: { own_password: true } });
  if (error) throw new Error(friendly(error));
}

// Signs out of this device only. (Supabase's default would sign the person out of every
// phone and tablet they use.)
export async function signOut() {
  try { const c = await sb(); await c.auth.signOut({ scope: "local" }); } catch { /* offline: clear below */ }
  try { localStorage.removeItem(AUTH_KEY); } catch { /* ignore */ }
}

// The family's shared Bible key, kept in the family's own Supabase (table family_settings,
// readable and writable only by signed-in family members). Lets everyone read on one key
// without invite links.
export async function getFamilyKey() {
  if (!authEnabled) return null;
  try {
    const c = await sb();
    const { data, error } = await c.from("family_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !data?.api_bible_key) return null;
    return { k: data.api_bible_key, b: data.nasb_bible_id || "", l: data.nasb_label || "", x: Array.isArray(data.extra_bibles) ? data.extra_bibles : [], e: data.esv_key || "" };
  } catch { return null; }
}
// Each person's own backup of their reading, notes and journal (table user_backups,
// readable and writable only by that person). Bible keys are never included.
export async function saveBackup(data) {
  if (!authEnabled) return false;
  const c = await sb();
  const { data: s } = await c.auth.getSession();
  const uid = s.session?.user?.id;
  if (!uid) return false;
  const { error } = await c.from("user_backups").upsert({ user_id: uid, data, updated_at: new Date().toISOString() });
  return !error;
}
export async function loadBackup() {
  if (!authEnabled) return null;
  try {
    const c = await sb();
    const { data: s } = await c.auth.getSession();
    const uid = s.session?.user?.id;
    if (!uid) return null;
    const { data, error } = await c.from("user_backups").select("data, updated_at").eq("user_id", uid).maybeSingle();
    return error || !data ? null : data;
  } catch { return null; }
}

export async function setFamilyKey({ k, b = "", l = "", x = [], e = "" }) {
  const c = await sb();
  const row = { id: 1, api_bible_key: k, nasb_bible_id: b, nasb_label: l, updated_at: new Date().toISOString() };
  let { error } = await c.from("family_settings").upsert({ ...row, extra_bibles: x, esv_key: e });
  // Before the newer columns are added, share what the table can hold.
  if (error && /esv_key/i.test(error.message || "")) ({ error } = await c.from("family_settings").upsert({ ...row, extra_bibles: x }));
  if (error && /extra_bibles/i.test(error.message || "")) ({ error } = await c.from("family_settings").upsert(row));
  if (error) throw new Error(/relation|does not exist|schema cache/i.test(error.message) ? "The family key table isn't set up in Supabase yet." : friendly(error));
}

// The built-in Bible helper (Supabase Edge Function "study-partner"). The AI key stays
// in Supabase; the app only sends the chat and gets back an answer or a reason it can't.
export async function askHelper({ messages, ref, version, name, style, status }) {
  if (!authEnabled) return { error: "signin" };
  try {
    const c = await sb();
    const { data: s } = await c.auth.getSession();
    if (!s.session) return { error: "signin" };
    const { data, error } = await c.functions.invoke("study-partner", { body: status ? { status: true } : { messages, ref, version, name, style } });
    if (!error) return data || { error: "busy" };
    const res = error.context;
    if (res && typeof res.json === "function") {
      if (res.status === 404) return { error: "setup" };
      try { return await res.json(); } catch { return { error: res.status === 401 ? "signin" : "busy" }; }
    }
    return { error: /fetch|network|relay/i.test(String(error.message)) ? "offline" : "setup" };
  } catch { return { error: "offline" }; }
}

// Where the family stands this month with the Bible helper: { warn, pct, mine, per_person }.
export async function helperStatus() {
  const r = await askHelper({ status: true });
  return r && r.status ? r.status : null;
}
