// Buddy's own know-how: app questions go to the right place, Bible questions are left for the
// helper, seasons fall on the right days, and the welcome and study nudges read naturally.
import { test } from "node:test";
import assert from "node:assert/strict";
import { APP_GUIDE, guideAnswer, seasonNow, welcomeLine, sessionNudge, sessionWords, timeAnswer } from "../../js/buddyguide.js";

test("app questions point to the right place", () => {
  const where = (q) => guideAnswer(q)?.go;
  assert.deepEqual(where("Where do I change the text size?"), ["settings", "#textSize"]);
  assert.deepEqual(where("how do I make the words bigger"), ["settings", "#textSize"]);
  assert.deepEqual(where("How do I lock my journal?"), ["settings", "#lockCard"]);
  assert.deepEqual(where("where is my journal"), ["journal", null]);
  assert.equal(where("how do I play Bible Spin"), "games");
  assert.deepEqual(where("how can I hear the chapter read aloud"), ["read", "#playBtn"]);
  assert.deepEqual(where("how do I turn on dark mode"), ["settings", "#theme"]);
  assert.deepEqual(where("can I change the Christmas look"), ["settings", "#lookCard"]);
  assert.deepEqual(where("how do I paste a verse into my notes"), ["notes", null]);
  assert.deepEqual(where("how do I hide you"), ["settings", "#buddyCard"]);
  assert.deepEqual(where("where did I leave off"), ["books", "#myBibleGo"]);
  assert.ok(guideAnswer("help").say);
});

test("Bible questions are left for the helper", () => {
  for (const q of ["Where is Bethlehem?", "How do I know God loves me?", "What does John 3:16 mean?", "Who was Moses?", "how do I look up a word in Hebrew about grace", "find a verse about joy"]) {
    const a = guideAnswer(q);
    assert.ok(!a || a.go?.[1] === "#wordTap", `${q} -> ${a?.say}`);
  }
  assert.equal(guideAnswer("Where is Bethlehem?"), null);
  assert.equal(guideAnswer("find a verse about joy"), null);
});

test("every guide entry points at something", () => {
  for (const g of APP_GUIDE) assert.ok(g.say && (g.go === "games" || (Array.isArray(g.go) && g.go[0])), g.say);
});

test("seasons fall on the right days", () => {
  const easter26 = new Date(2026, 3, 5);
  assert.equal(seasonNow(new Date(2026, 10, 24), easter26)?.key, "thanksweek");
  assert.equal(seasonNow(new Date(2026, 10, 26), easter26)?.key, "thanksgiving");
  assert.equal(seasonNow(new Date(2026, 10, 29), easter26)?.key, "advent"); // first Sunday of Advent 2026
  assert.equal(seasonNow(new Date(2026, 10, 28), easter26), null);
  assert.match(seasonNow(new Date(2026, 11, 20), easter26).line, /5 days until Christmas/);
  assert.equal(seasonNow(new Date(2026, 11, 24), easter26)?.key, "christmaseve");
  assert.equal(seasonNow(new Date(2026, 11, 25), easter26)?.key, "christmas");
  assert.equal(seasonNow(new Date(2027, 0, 1), easter26)?.key, "newyear");
  assert.equal(seasonNow(new Date(2026, 3, 5), easter26)?.key, "easter");
  assert.equal(seasonNow(new Date(2026, 3, 3), easter26)?.key, "goodfriday");
  assert.equal(seasonNow(new Date(2026, 2, 29), easter26)?.key, "palmsunday");
  assert.equal(seasonNow(new Date(2026, 6, 14), easter26), null);
});

test("welcome back remembers their place", () => {
  assert.equal(welcomeLine({ name: "Ruth", place: "John 3", away: 864e5 }), "Welcome back, Ruth! Last time you were in John 3. Want to pick up there?");
  assert.match(welcomeLine({ place: "Genesis 12", study: "Chronological", away: 3 * 864e5 }), /It's been 3 days\. You were in Genesis 12, in your Chronological study\./);
  assert.match(welcomeLine({ away: 20 * 864e5 }), /I missed you/);
  assert.match(welcomeLine({ name: "Mel", hello: "Good morning", place: "John 1" }), /^Good morning, Mel! Welcome back\. Last time/);
  assert.match(welcomeLine({ place: "Luke 2", season: { line: "It's Advent! 🕯️" } }), /^It's Advent!/);
});

test("study time nudges come at 30 and 90 minutes, once each", () => {
  assert.equal(sessionNudge(20 * 60e3), null);
  assert.equal(sessionNudge(31 * 60e3).mark, 30);
  assert.equal(sessionNudge(45 * 60e3, [30]), null);
  assert.equal(sessionNudge(95 * 60e3, [30]).mark, 90);
  assert.equal(sessionNudge(200 * 60e3, [30, 90]), null);
  assert.equal(sessionWords(65 * 60e3), "1 hour and 5 minutes");
  assert.equal(sessionWords(20e3), "less than a minute");
});

test("time questions are answered right away", () => {
  const now = new Date(2026, 11, 1);
  assert.match(timeAnswer("what day is it?", { now }), /^Today is .*2026/);
  assert.match(timeAnswer("how long have I been studying?", { sessionMs: 12 * 60e3 }), /12 minutes/);
  assert.match(timeAnswer("how many days until Christmas?", { now }), /24 days until Christmas/);
  assert.equal(timeAnswer("who wrote Romans?"), null);
});
