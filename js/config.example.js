// Copy this file to js/config.js and fill in your own values (docs/SETUP.md, step 3).
// Everything here is safe to publish: the Supabase URL and publishable (anon) key are meant
// to sit in a web app, and row-level security decides what each person can see.
// Never put the service_role / secret key, an Anthropic key or a Bible key in this file.
// Leave supabaseUrl empty to run without sign-in (single-device mode).
window.BIBLE_CONFIG = {
  supabaseUrl: "",          // e.g. "https://abcdefghijkl.supabase.co"
  supabaseAnonKey: "",      // Project Settings, API, publishable key ("sb_publishable_...")
  // The first-time password you give each new family member. The app makes them replace it
  // right after their first sign-in and never accepts it as a new password.
  starterPassword: "",
};
// With sign-in on, hide the app until someone is signed in (no flash of the app first).
if (window.BIBLE_CONFIG.supabaseUrl && window.BIBLE_CONFIG.supabaseAnonKey) document.documentElement.classList.add("auth-wait");
