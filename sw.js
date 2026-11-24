// Caches the app itself so it opens offline. Scripture text is not cached here.
const VERSION = "bible-study-shell-v152";
const SHELL = ["./", "index.html", "styles.css", "js/app.js", "js/books.js", "js/store.js", "js/text.js", "js/paths.js", "js/speech.js", "js/trivia.js", "js/trivia-bank.js", "js/trivia-bank2.js", "js/trivia-bank3.js", "js/art.js", "js/notes.js", "js/notes-more.js", "js/chapters/make.js", ...["gen", "exo", "lev", "num", "deu", "jos", "jdg", "rut", "1sa", "2sa", "1ki", "2ki", "1ch", "2ch", "ezr", "neh", "est", "job", "psa", "pro", "ecc", "sng", "isa", "jer", "lam", "ezk", "dan", "hos", "jol", "amo", "oba", "jon", "mic", "nam", "hab", "zep", "hag", "mal", "zec", "mrk", "mat", "luk", "jhn", "act", "rom", "1co", "2co"].map((b) => `js/chapters/${b}.js`), "js/history.js", "js/glossary.js", "js/intros.js", "js/topics.js", "js/outlines.js", "js/stickers.js", "js/bookstats.js", "js/daily.js", "js/guide.js", "js/buddy.js", "js/game.js", "js/auth.js", "js/config.js", "js/vendor/supabase.js",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Network first for the app's own files, so updates show up; fall back to cache offline.
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    // "no-cache" asks the website every time instead of using the browser's 10-minute copy,
    // so a new version shows up on the very next open.
    fetch(e.request, { cache: "no-cache" }).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
