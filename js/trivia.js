// Trivia game logic (no screen code): choosing questions and working out ratings.
import { TRIVIA } from "./trivia-bank.js";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

// Picks up to `count` questions about chapters already read.
// Order of preference: the current chapter, then the current book, then connections
// (themes and audience paths lean on these), then anything else read.
// Questions asked recently are used only when nothing fresher is left.
export function pickQuestions({ isRead, current, pathId, count = 5, recent = [] }) {
  const key = current ? `${current.book}.${current.chapter}` : null;
  const ok = (q) => q.refs.every((r) => r === key || isRead(r));
  const eligible = TRIVIA.filter(ok);
  const fresh = eligible.filter((q) => !recent.includes(q.id));
  const pool = fresh.length >= count ? fresh : eligible;
  const score = (q) => {
    let s = Math.random();
    if (key && q.refs.includes(key)) s += 4;
    if (current && q.refs.some((r) => r.startsWith(`${current.book}.`))) s += 2;
    if (q.kind === "connection" && (pathId === "themes" || pathId === "audience")) s += 1.5;
    return s;
  };
  return pool
    .map((q) => ({ q, s: score(q) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, count)
    .map(({ q }) => {
      // Shuffle the choices so the answer moves every time.
      const order = shuffle(q.choices.map((_, i) => i));
      return { ...q, choices: order.map((i) => q.choices[i]), a: order.indexOf(q.a) };
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
