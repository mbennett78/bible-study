import { test } from "node:test";
import assert from "node:assert/strict";
import { onThisDay, heartWords, shown } from "../../js/heart.js";

const now = new Date(2027, 11, 25, 9, 0); // Dec 25, 2027
const when = (x) => x.at;

test("On this day finds entries from today's date in earlier years, newest first", () => {
  const items = [{ at: "2026-12-25" }, { at: "2025-12-25T15:00:00" }, { at: "2027-12-25" }, { at: "2026-12-24" }, { at: "junk" }];
  const got = onThisDay(items, when, now);
  assert.deepEqual(got.map((g) => [g.item.at, g.years]), [["2026-12-25", 1], ["2025-12-25T15:00:00", 2]]);
});

test("nothing shows in the first year", () => {
  assert.equal(onThisDay([{ at: "2027-12-25" }, { at: "2027-06-25" }], when, now).length, 0);
});

test("learning by heart keeps punctuation and hides the right words", () => {
  const w = heartWords("Jesus wept.").filter((x) => !x.space);
  assert.deepEqual(w, [{ pre: "", word: "Jesus", post: "" }, { pre: "", word: "wept", post: "." }]);
  assert.equal(shown("Jesus", 0, 1).hidden, false);
  assert.equal(shown("wept", 1, 1).hidden, true);
  assert.equal(shown("wept", 1, 2).text, "w");
  assert.equal(shown("wept", 1, 3).text, "");
});
