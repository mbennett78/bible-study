import { test } from "node:test";
import assert from "node:assert/strict";
import { ctNow, special, dayMood, ageIn } from "../../js/buddydays.js";

// Central time: Dec 25, 2026 at 9 AM CST is 15:00 UTC.
const at = (iso) => ctNow(Date.parse(iso));

test("special days follow Central time", () => {
  assert.equal(special(at("2026-12-25T15:00:00Z")).kind, "christmas");
  assert.equal(special(at("2026-12-28T15:00:00Z")).gift, "teddy");
  assert.equal(special(at("2026-12-29T15:00:00Z")).gift, "flashlight");
  assert.equal(special(at("2026-11-30T15:00:00Z")).days, 25);
  assert.equal(special(at("2026-11-29T15:00:00Z")), null);
  assert.equal(special(at("2026-12-24T15:00:00Z")).kind, "christmaseve");
  assert.equal(special(at("2026-12-31T20:00:00Z")), null); // 2 PM on New Year's Eve: not evening yet
  assert.equal(special(at("2027-01-01T00:30:00Z")).kind, "nye"); // 6:30 PM CST Dec 31
  assert.equal(special(at("2027-01-01T06:10:00Z")).kind, "midnight"); // 12:10 AM CST
  assert.equal(special(at("2027-01-01T18:00:00Z")).kind, "newyear");
  assert.equal(special(at("2027-07-04T17:00:00Z")).kind, "july4");
});

test("his birthday: 8 in 2027, present in the morning, cake in the evening", () => {
  const morning = special(at("2027-08-03T14:00:00Z")); // 9 AM CDT
  assert.equal(morning.kind, "birthday"); assert.equal(morning.age, 8); assert.equal(morning.evening, false);
  const six = special(at("2027-08-03T23:05:00Z")); // 6:05 PM CDT
  assert.equal(six.evening, true); assert.equal(six.cakeTime, false);
  assert.equal(special(at("2027-08-04T00:31:00Z")).cakeTime, true); // 7:31 PM CDT
  assert.equal(ageIn(2027), 8);
});

test("moods: mostly happy, never grumpy on a holiday, and kindness cheers him up", () => {
  let happy = 0, n = 0;
  for (let d = 1; d <= 28; d++) for (let h = 0; h < 24; h += 3) { n++; if (dayMood({ y: 2026, m: 2, d, h, min: 0, key: `2026-02-${String(d).padStart(2, "0")}` }) === "happy") happy++; }
  assert.ok(happy / n > 0.35 && happy / n < 0.8, `happy share ${happy / n}`);
  assert.equal(dayMood(at("2026-12-25T15:00:00Z")), "happy");
  assert.equal(dayMood({ y: 2026, m: 2, d: 3, h: 9, min: 0, key: "2026-02-03" }, true), "happy");
});
