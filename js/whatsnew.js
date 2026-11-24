// "What's new this week": a short, friendly note on Home after an update. It never pops up
// over anything, never starts a tour, and never changes anyone's look or place. Tap "Got it"
// to put it away until the next note, or turn these notes off in Settings (Help and guide).
// Newest first. Each note's id must be new so it shows once.
export const NEWS = [
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
export function newsToShow({ seen = "", off = false, setupDone = true } = {}) {
  if (off || !setupDone) return null;
  const top = NEWS[0];
  return top && top.id !== seen ? top : null;
}

export const newsHtml = (n, esc) => `<div class="card news-card" id="newsCard" role="region" aria-label="${esc(n.title)}">
  <h2>✨ ${esc(n.title)}</h2>
  <ul>${n.items.slice(0, 3).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
  ${n.items.length > 3 ? `<details class="news-more"><summary>${n.items.length - 3} more</summary><ul>${n.items.slice(3).map((t) => `<li>${esc(t)}</li>`).join("")}</ul></details>` : ""}
  <div class="news-btns"><button type="button" class="small" id="newsOk">Got it</button><button type="button" class="news-off" id="newsOff">Don't show these</button></div>
</div>`;
