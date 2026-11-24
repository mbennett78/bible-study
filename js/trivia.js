// Trivia game logic (no screen code): choosing questions and working out ratings.
import { TRIVIA } from "./trivia-bank.js";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

// Picks up to `count` questions about chapters already read. A round is a mix, so people
// keep meeting new questions: up to two on the chapter just read, one more from the same book,
// and the rest from anywhere else they've read. Questions never asked before come first, and
// at most one recent question comes back as a review.
export function pickQuestions({ isRead, current, pathId, count = 5, recent = [], seen = {} }) {
  const key = current ? `${current.book}.${current.chapter}` : null;
  const ok = (q) => q.refs.every((r) => r === key || isRead(r));
  const eligible = TRIVIA.filter(ok);
  const lately = new Set(recent.slice(0, 60));
  const rank = (q) => Math.random() - Math.min(seen[q.id] || 0, 4) * 1.2
    + (q.kind === "connection" && (pathId === "themes" || pathId === "audience") ? 1.5 : 0);
  const byRank = (list) => list.map((q) => ({ q, s: rank(q) })).sort((a, b) => b.s - a.s).map(({ q }) => q);
  const here = byRank(eligible.filter((q) => key && q.refs.includes(key)));
  const book = byRank(eligible.filter((q) => !here.includes(q) && current && q.refs.some((r) => r.startsWith(`${current.book}.`))));
  const wide = byRank(eligible.filter((q) => !here.includes(q) && !book.includes(q)));
  const picks = [];
  let repeats = 0;
  const take = (list, max) => {
    let n = 0;
    for (const q of list) {
      if (picks.length >= count || n >= max) break;
      if (picks.includes(q) || lately.has(q.id)) continue;
      picks.push(q); n += 1;
    }
  };
  take(here, 2); take(book, 1); take(wide, count); take(book, count); take(here, count);
  // Not enough new ones: one review from recent rounds, then any that are left.
  for (const q of [...here, ...book, ...wide]) {
    if (picks.length >= count) break;
    if (picks.includes(q)) continue;
    if (lately.has(q.id) && repeats >= 1 && eligible.length - lately.size >= count) continue;
    if (lately.has(q.id)) repeats += 1;
    picks.push(q);
  }
  return picks.map((q) => {
    // Shuffle the choices so the answer moves every time.
    const order = shuffle(q.choices.map((_, i) => i));
    return { ...q, review: lately.has(q.id), choices: order.map((i) => q.choices[i]), a: order.indexOf(q.a) };
  });
}

export const bankSize = () => TRIVIA.length;

// Overall rating from every answer given. Levels are gentle on purpose.
export function knowledgeRating({ answered, correct }) {
  const pct = answered ? Math.round((correct / answered) * 100) : 0;
  const levels = [
    { min: 90, name: "Cedar of Lebanon" },
    { min: 75, name: "Olive tree" },
    { min: 60, name: "Fruitful vine" },
    { min: 0, name: "Growing sprout" },
  ];
  const level = answered < 10 ? { name: "Mustard seed" } : levels.find((l) => pct >= l.min);
  return { pct, level: level.name, answered };
}
