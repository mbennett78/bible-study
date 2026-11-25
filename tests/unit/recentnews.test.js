import { test } from "node:test";
import assert from "node:assert/strict";
import { NEWS, recentNews, newsToShow } from "../../js/whatsnew.js";

test("an update note shows at most once a month", () => {
  const now = new Date("2027-01-20T12:00:00");
  assert.equal(newsToShow({ seen: "old", lastAt: "2027-01-02T12:00:00Z", now }), null);
  assert.equal(newsToShow({ seen: "old", lastAt: "2026-12-10T12:00:00Z", now }), NEWS[0]);
  assert.equal(newsToShow({ seen: "old", now }), NEWS[0]);
  assert.equal(newsToShow({ seen: "old", off: true, now }), null);
});

test("Settings lists the update notes from the last 30 days only", () => {
  const top = new Date(`${NEWS[0].id}T12:00:00`);
  assert.ok(recentNews(top).includes(NEWS[0]));
  const later = new Date(top); later.setDate(later.getDate() + 31);
  assert.equal(recentNews(later).length, 0);
});
