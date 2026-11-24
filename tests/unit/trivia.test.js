// Chapter quizzes: each round mixes the chapter just read with the rest of what's been read,
// new questions come before repeats, and at most one recent question comes back as a review.
import { test } from "node:test";
import assert from "node:assert/strict";
import { pickQuestions } from "../../js/trivia.js";
import { TRIVIA } from "../../js/trivia-bank.js";

const readBooks = new Set(["GEN", "JHN", "JOB"]);
const isRead = (k) => readBooks.has(k.split(".")[0]);
const current = { book: "JHN", chapter: 3 };

test("a round mixes the chapter with other chapters read", () => {
  const qs = pickQuestions({ isRead, current, count: 5 });
  assert.equal(qs.length, 5);
  const here = qs.filter((q) => q.refs.includes("JHN.3")).length;
  assert.ok(here >= 1 && here <= 2, `questions on John 3: ${here}`);
  assert.ok(qs.some((q) => !q.refs.some((r) => r.startsWith("JHN."))), "at least one from another book");
});

test("several rounds in a row bring new questions", () => {
  let recent = [];
  const seen = {};
  const asked = [];
  for (let round = 0; round < 6; round++) {
    const qs = pickQuestions({ isRead, current, count: 5, recent, seen });
    assert.ok(qs.filter((q) => q.review).length <= 1, "at most one review a round");
    for (const q of qs) { asked.push(q.id); seen[q.id] = (seen[q.id] || 0) + 1; }
    recent = [...qs.map((q) => q.id), ...recent].slice(0, 150);
  }
  const eligible = TRIVIA.filter((q) => q.refs.every((r) => r === "JHN.3" || isRead(r))).length;
  if (eligible >= 40) assert.equal(new Set(asked).size, asked.length, "no repeats while new ones are left");
});

test("the right answer still matches after shuffling", () => {
  for (const q of pickQuestions({ isRead, current, count: 5 })) {
    const orig = TRIVIA.find((x) => x.id === q.id);
    assert.equal(q.choices[q.a], orig.choices[orig.a]);
  }
});
