// Family sign-in with Supabase: email + password. Only people added in the Supabase
// dashboard can sign in (new sign-ups are turned off there). A forgotten password can be
// replaced by emailing a one-time sign-in link, then choosing a new password in Settings.
const cfg = window.BIBLE_CONFIG || {};
export const authEnabled = Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey);

let client = null;
async function sb() {
  if (!client) {
    // supabase-js 2.45.4 (MIT), kept in the app so sign-in doesn't depend on another website.
    if (!window.supabase) await new Promise((ok, fail) => {
      const tag = Object.assign(document.createElement("script"), { src: "js/vendor/supabase.js", onload: ok, onerror: fail });
      document.head.append(tag);
    });
    const { createClient } = window.supabase;
    client = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: "bible-study:auth" },
    });
  }
  return client;
}

// The saved sign-in, read from this device (works offline).
export async function currentUser() {
  if (!authEnabled) return null;
  try {
    const c = await sb();
    const { data } = await c.auth.getSession();
    return data.session?.user || null;
  } catch {
    // Offline and the sign-in library couldn't load: trust a sign-in saved on this device.
    try { const s = JSON.parse(localStorage.getItem("bible-study:auth")); return s?.user || null; } catch { return null; }
  }
}

function friendly(error) {
  const m = String(error?.message || error || "");
  if (/invalid login|invalid credentials/i.test(m)) return "That email and password don't match. Check them and try again.";
  if (/email not confirmed/i.test(m)) return "This account isn't confirmed yet. Ask whoever set up the app to confirm it in Supabase.";
  if (/signups? not allowed|not found|user not/i.test(m)) return "That email isn't on the family list yet. Ask whoever set up the app to add it.";
  if (/password.*(short|least|weak)/i.test(m)) return "Please use a longer password (at least 6 characters).";
  if (/expired|invalid|token/i.test(m)) return "That code didn't work or has expired. Check the newest email, or send a new code.";
  if (/rate|too many|seconds/i.test(m)) return "Too many codes were asked for just now. Please wait a few minutes and try again.";
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

export async function changePassword(password) {
  const c = await sb();
  const { error } = await c.auth.updateUser({ password });
  if (error) throw new Error(friendly(error));
}

export async function signOut() {
  try { const c = await sb(); await c.auth.signOut(); } catch { /* offline: clear below */ }
  try { localStorage.removeItem("bible-study:auth"); } catch {}
}

// The family's shared Bible key, kept in the family's own Supabase (table family_settings,
// readable and writable only by signed-in family members). Lets everyone read on one key
// without invite links.
export async function getFamilyKey() {
  if (!authEnabled) return null;
  try {
    const c = await sb();
    const { data, error } = await c.from("family_settings").select("api_bible_key, nasb_bible_id, nasb_label").eq("id", 1).maybeSingle();
    if (error || !data?.api_bible_key) return null;
    return { k: data.api_bible_key, b: data.nasb_bible_id || "", l: data.nasb_label || "" };
  } catch { return null; }
}
export async function setFamilyKey({ k, b = "", l = "" }) {
  const c = await sb();
  const { error } = await c.from("family_settings").upsert({ id: 1, api_bible_key: k, nasb_bible_id: b, nasb_label: l, updated_at: new Date().toISOString() });
  if (error) throw new Error(/relation|does not exist|schema cache/i.test(error.message) ? "The family key table isn't set up in Supabase yet." : friendly(error));
}
