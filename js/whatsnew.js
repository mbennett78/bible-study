// "What's new this week": a short, friendly note on Home after an update. It never pops up
// over anything, never starts a tour, and never changes anyone's look or place. Tap "Got it"
// to put it away until the next note, or turn these notes off in Settings (Help and guide).
// Newest first. Each note's id must be new so it shows once.
export const NEWS = [
  {
    id: "2026-11-25",
    title: "What's new this week",
    items: [
      "✏️ Write or draw in your notes and journal with Apple Pencil or a finger, or fill a whole handwriting page. It prints and goes to Google Docs too.",
      "🎨 Every kids' story picture is new, plus 8 new stories like the wise men and Hannah's prayer.",
      "🗺️ Maps look like a study Bible's, with mountains, deserts and a scale.",
      "👓 Easier to read: clearer gray words, and Largest text fits small phones.",
      "🧠 Learn a verse by heart: tap its number, then Learn by heart.",
      "📏 Page width in Settings: Narrow, Medium or Wide Bible text.",
      "📝 Every short study note is now a full, plain sentence, in all 66 books.",
      "📜 Every chapter now has a history section or a Greek or Hebrew word study, with sources.",
      "➡️ A Next chapter button now waits right under the last verse.",
      "🌷 Buddy sits down to read or write at his desk, and he can hand you a flower.",
    ],
  },
  {
    id: "2026-11-24",
    title: "What's new this week",
    items: [
      "📖 Study notes for every chapter, Genesis to Revelation.",
      "🎨 New kids' pictures, like the seven days of creation and Palm Sunday.",
      "🎲 Bible Spin: fill the lamp to pick a jewel, plus bonus rounds.",
      "💬 Paste a verse into your notes to make a verse card.",
      "📘 The user guide is at the top of Settings.",
    ],
  },
];

// The note to show on Home now, or null.
// Every note from the last 30 days, newest first, for Settings.
export function recentNews(now = new Date()) {
  const since = new Date(now); since.setDate(since.getDate() - 30);
  return NEWS.filter((n) => new Date(`${n.id}T12:00:00`) >= since);
}
// At most one note a month, so no one is overwhelmed; the rest wait in Settings, under Recent updates.
export function newsToShow({ seen = "", off = false, setupDone = true, lastAt = "", now = new Date() } = {}) {
  if (off || !setupDone) return null;
  if (lastAt && now - new Date(lastAt) < 30 * 864e5) return null;
  const top = NEWS[0];
  return top && top.id !== seen ? top : null;
}

export const newsHtml = (n, esc) => `<div class="card news-card" id="newsCard" role="region" aria-label="${esc(n.title)}">
  <h2>✨ ${esc(n.title)}</h2>
  <ul>${n.items.slice(0, 3).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
  ${n.items.length > 3 ? `<details class="news-more"><summary>${n.items.length - 3} more</summary><ul>${n.items.slice(3).map((t) => `<li>${esc(t)}</li>`).join("")}</ul></details>` : ""}
  <div class="news-btns"><button type="button" class="small" id="newsOk">Got it</button><button type="button" class="news-off" id="newsOff">Don't show these</button></div>
</div>`;
