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
  let b = recordGame({}, [{ name: "Ann", right: 4, asked: 5, stars: 9 }, { name: "Bob", right: 2, asked: 5, stars: 4 }]);
  b = recordGame(b, [{ name: "Ann", right: 1, asked: 5, stars: 2 }, { name: "Bob", right: 5, asked: 5, stars: 15 }]);
  assert.deepEqual(b.Ann, { games: 2, right: 5, asked: 10, wins: 1, best: 80, stars: 11 });
  assert.deepEqual(b.Bob, { games: 2, right: 7, asked: 10, wins: 1, best: 100, stars: 19 });
  assert.equal(recordGame({ Old: { games: 1, right: 1, asked: 1, wins: 0, best: 100 } }, [{ name: "Old", right: 1, asked: 1 }]).Old.stars, 0, "older saved boards without stars still add up");
  assert.equal(recordGame({}, [{ name: "Solo", right: 5, asked: 5 }]).Solo.wins, 0, "a solo quiz isn't a win");
  assert.equal(MAX_PLAYERS, 20);
});

test("quiz myself: progress, personal bests, streak shouts and a weekly goal", async () => {
  const { recordSolo, scopeProgress, weekStart, thisWeek, emptyProgress, streakShout } = await import("../../js/game.js");
  const mon = new Date(2026, 10, 23, 9), sun = new Date(2026, 10, 29, 22), nextMon = new Date(2026, 10, 30, 8);
  assert.equal(weekStart(mon), "2026-11-23");
  assert.equal(weekStart(sun), "2026-11-23", "Sunday belongs to the week that began on Monday");
  assert.equal(weekStart(nextMon), "2026-11-30");
  const qs = questionsIn("gospels").slice(0, 5);
  let r = recordSolo({ ...emptyProgress(), goal: 10 }, "gospels", qs.map((q, i) => ({ id: q.id, right: i < 3 })), mon);
  assert.equal(r.pct, 60); assert.ok(r.firstGame); assert.ok(!r.newBest); assert.equal(r.newlyMastered, 3);
  assert.equal(scopeProgress(r.mine, "gospels").mastered, 3);
  assert.equal(scopeProgress(r.mine, "all").mastered, 3, "the whole Bible counts them too");
  assert.equal(scopeProgress(r.mine, "law").mastered, 0);
  assert.equal(thisWeek(r.mine, sun), 5); assert.ok(!r.goalReached);
  r = recordSolo(r.mine, "gospels", qs.map((q) => ({ id: q.id, right: true })), sun);
  assert.ok(r.newBest); assert.equal(r.mine.best.gospels, 100); assert.equal(r.newlyMastered, 2);
  assert.ok(r.goalReached, "10 questions reached the goal"); assert.equal(thisWeek(r.mine, sun), 10);
  r = recordSolo(r.mine, "gospels", qs.map((q) => ({ id: q.id, right: true })), sun);
  assert.ok(!r.goalReached, "the goal is celebrated once a week"); assert.ok(!r.newBest, "matching a best isn't a new best");
  assert.equal(thisWeek(r.mine, nextMon), 0, "a new week starts on Monday");
  assert.equal(streakShout(2), ""); assert.match(streakShout(3), /3 in a row/); assert.match(streakShout(12), /12 in a row/);
});

test("stars reward quick answers, generously without a timer", async () => {
  const { starsFor } = await import("../../js/game.js");
  assert.equal(starsFor(false, 1000), 0, "no stars for a miss");
  assert.equal(starsFor(true, 5000), 3); assert.equal(starsFor(true, 12000), 2); assert.equal(starsFor(true, 60000), 1);
  assert.equal(starsFor(true, 5000, 30), 3); assert.equal(starsFor(true, 15000, 30), 2); assert.equal(starsFor(true, 28000, 30), 1);
});

test("levels climb with stars, and badges are earned once", async () => {
  const { levelFor, LEVELS, recordSolo, emptyProgress, BADGES, TOPICS, topicOf } = await import("../../js/game.js");
  assert.equal(levelFor(0).name, "Seedling"); assert.equal(levelFor(0).next.name, "Sprout");
  assert.equal(levelFor(LEVELS[5][0]).name, "Bible Scholar");
  assert.equal(levelFor(99999).next, null, "the top level has nothing after it");
  const qs = questionsIn("gospels").slice(0, 5);
  let r = recordSolo(emptyProgress(), "gospels", qs.map((q) => ({ id: q.id, right: true, stars: 3 })), new Date(), { longest: 5 });
  assert.deepEqual(r.newBadges.sort(), ["first", "perfect", "streak5", "swift"].sort());
  assert.equal(r.stars, 15); assert.equal(r.levelUp.name, "Sprout");
  r = recordSolo(r.mine, "gospels", qs.map((q) => ({ id: q.id, right: true, stars: 3 })), new Date(), { longest: 5 });
  assert.deepEqual(r.newBadges, [], "a badge is only awarded once");
  assert.equal(new Set(BADGES.map(([id]) => id)).size, BADGES.length);
  // Every kind of question has questions, and the new topics are tagged.
  for (const [id] of TOPICS) assert.ok(questionsIn("all", id).length >= 8, `${id} has too few questions`);
  assert.ok(questionsIn("all", "science").every((q) => topicOf(q) === "science"));
});
