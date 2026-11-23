// App settings that are safe to publish. Loaded before everything else.
// The Supabase Project URL and anon (publishable) key are designed to sit in a web app:
// what each person can see is enforced by Supabase, not by keeping these secret.
// Never put the service_role / secret key here.
window.BIBLE_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",
};
// With sign-in on, hide the app until someone is signed in (no flash of the app first).
if (window.BIBLE_CONFIG.supabaseUrl && window.BIBLE_CONFIG.supabaseAnonKey) document.documentElement.classList.add("auth-wait");
