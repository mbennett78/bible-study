// Bible games: questions come from the chosen part of the Bible, nothing repeats until a
// section is used up, scores and ties are ranked fairly, and the leaderboard adds up.
import { test } from "node:test";
import assert from "node:assert/strict";
import { SCOPES, questionsIn, dealQuestions, standings, recordGame, MAX_PLAYERS } from "../../js/game.js";

test("every part of the Bible has questions, and they stay in that part", () => {
  for (const [id] of SCOPES) {
    const qs = questionsIn(id);
    assert.ok(qs.length >= 5, `${id} has only ${qs.length}`);
  }
  assert.ok(questionsIn("gospels").every((q) => q.refs.every((r) => ["MAT", "MRK", "LUK", "JHN"].includes(r.split(".")[0]))));
  assert.ok(questionsIn("law").every((q) => q.refs.every((r) => ["GEN", "EXO", "LEV", "NUM", "DEU"].includes(r.split(".")[0]))));
});

test("dealt questions are fresh first, shuffled, and keep the right answer", () => {
  const all = questionsIn("gospels");
  const seen = all.slice(0, all.length - 5).map((q) => q.id);
  const dealt = dealQuestions("gospels", 5, seen);
  assert.equal(dealt.length, 5);
  assert.ok(dealt.every((q) => !seen.includes(q.id)), "unseen questions come first");
  for (const q of dealt) {
    const orig = all.find((o) => o.id === q.id);
    assert.equal(q.choices[q.a], orig.choices[orig.a]);
    assert.equal(new Set(q.choices).size, 4);
  }
  assert.equal(new Set(dealQuestions("all", 40).map((q) => q.id)).size, 40, "no repeats within a game");
});

test("standings rank by score and share places on a tie", () => {
  const t = standings([{ name: "Ann", right: 3, asked: 5 }, { name: "Bob", right: 5, asked: 5 }, { name: "Cy", right: 3, asked: 5 }]);
  assert.deepEqual(t.map((p) => [p.name, p.place, p.pct]), [["Bob", 1, 100], ["Ann", 2, 60], ["Cy", null, 60]]);
});

test("the leaderboard adds games, right answers, wins and best scores", () => {
  let b = recordGame({}, [{ name: "Ann", right: 4, asked: 5 }, { name: "Bob", right: 2, asked: 5 }]);
  b = recordGame(b, [{ name: "Ann", right: 1, asked: 5 }, { name: "Bob", right: 5, asked: 5 }]);
  assert.deepEqual(b.Ann, { games: 2, right: 5, asked: 10, wins: 1, best: 80 });
  assert.deepEqual(b.Bob, { games: 2, right: 7, asked: 10, wins: 1, best: 100 });
  assert.equal(recordGame({}, [{ name: "Solo", right: 5, asked: 5 }]).Solo.wins, 0, "a solo quiz isn't a win");
  assert.equal(MAX_PLAYERS, 20);
});
