// Bible Quest rules: every wedge of the wheel has questions, jewels take two right answers,
// solo ends at three misses, coins reward speed, and Buddy plays fair (beatable, not perfect).
import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, NEED_PER_JEWEL, HEARTS, MAX_ROUNDS, BUDDY_LEVELS, questionsFor, pickQuestion, coinsFor, buddyTurn, newPlayer, answer, jewelCount, leader } from "../../js/quest.js";

test("every wedge of the wheel has plenty of questions, each with one right answer", () => {
  for (const c of CATEGORIES) {
    const qs = questionsFor(c.id);
    assert.ok(qs.length >= 15, `${c.name} has only ${qs.length}`);
    for (const q of qs) assert.ok(q.choices[q.a] !== undefined, q.id);
  }
});

test("questions don't repeat until the wedge's questions are used up", () => {
  const all = questionsFor("people"), seen = all.slice(1).map((q) => q.id);
  assert.equal(pickQuestion("people", seen).id, all[0].id);
  assert.ok(pickQuestion("people", all.map((q) => q.id)));
});

test("a jewel takes two right answers in its wedge, and six jewels win", () => {
  const game = { mode: "family", players: [] }, p = newPlayer("Anna");
  let r = answer(game, p, "people", true, 10);
  assert.equal(r.jewel, false);
  r = answer(game, p, "people", true, 10);
  assert.equal(r.jewel, true);
  assert.equal(NEED_PER_JEWEL, 2);
  assert.equal(p.coins, 45); // 10 + 10 + 25 for the jewel
  for (const c of CATEGORIES.slice(1)) { answer(game, p, c.id, true); r = answer(game, p, c.id, true); }
  assert.equal(jewelCount(p), 6);
  assert.equal(r.won, true);
  assert.equal(r.over, true);
});

test("solo: three misses end the game; a family game always ends", () => {
  const solo = { mode: "solo" }, p = newPlayer("Me");
  let r;
  for (let i = 0; i < HEARTS; i++) r = answer(solo, p, "books", false);
  assert.equal(r.out, true);
  const fam = { mode: "family" }, a = newPlayer("A");
  for (let i = 0; i < MAX_ROUNDS; i++) r = answer(fam, a, "books", false);
  assert.equal(r.over, true);
});

test("coins: more for answering quickly and for a streak", () => {
  assert.equal(coinsFor(20000, 20000, 1), 20);
  assert.equal(coinsFor(0, 20000, 1), 10);
  assert.ok(coinsFor(10000, 20000, 5) > coinsFor(10000, 20000, 1));
});

test("Buddy plays fair: about his level's share right, and he takes time to think", () => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const [id, , p] of BUDDY_LEVELS) {
    let right = 0;
    for (let i = 0; i < 4000; i++) {
      const t = buddyTurn(id, rand);
      if (t.right) right++;
      assert.ok(t.ms >= 2500 && t.ms <= 9000);
    }
    assert.ok(Math.abs(right / 4000 - p) < 0.04, `${id}: ${right / 4000}`);
    assert.ok(p < 0.85, "Buddy is never close to perfect");
  }
});

test("the leader has the most jewels, then the most right answers", () => {
  const a = newPlayer("A"), b = newPlayer("B");
  a.jewels = { people: true }; b.jewels = { people: true, places: true };
  assert.equal(leader([a, b]).name, "B");
  b.jewels = { people: true }; a.right = 5; b.right = 3;
  assert.equal(leader([a, b]).name, "A");
});
