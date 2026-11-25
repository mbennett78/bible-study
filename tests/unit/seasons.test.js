// The Seasonal changes look shows the right painting for each time of year.
import { test } from "node:test";
import assert from "node:assert/strict";
import { seasonOf, easterOf, SEASONS } from "../../js/art.js";

const on = (s) => seasonOf(new Date(`${s}T12:00:00`));
test("Easter dates", () => {
  assert.equal(easterOf(2027).toDateString(), new Date(2027, 2, 28).toDateString());
  assert.equal(easterOf(2026).toDateString(), new Date(2026, 3, 5).toDateString());
});
test("each time of year has its painting", () => {
  const want = { "2026-12-31": "new-year", "2027-01-06": "new-year", "2027-01-07": "winter", "2027-02-14": "angels", "2027-03-10": "march",
    "2027-03-21": "easter", "2027-03-20": "march", "2027-04-04": "easter", "2027-04-05": "april", "2027-05-01": "may", "2027-06-30": "june",
    "2027-07-04": "summer", "2027-08-31": "summer", "2027-09-01": "learning", "2027-10-31": "psalm23", "2026-11-01": "harvest",
    "2026-11-26": "harvest", "2026-11-27": "advent", "2026-12-30": "advent", "2026-03-29": "easter", "2026-04-12": "easter", "2026-04-13": "april" };
  for (const [d, k] of Object.entries(want)) assert.equal(on(d), k, d);
});
test("all 13 paintings have a title", () => assert.equal(Object.keys(SEASONS).length, 13));
