// The saved data: migrations never lose anything, and backups restore and merge safely.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
};

beforeEach(() => mem.clear());

test("old saved data is migrated without losing progress", async () => {
  mem.set("bible-study:v1", JSON.stringify({ style: "feminine", read: { "JHN.3": "2026-01-01T00:00:00.000Z" }, journal: { "JHN.3": { text: "Born again" } } }));
  const { store } = await import(`../../js/store.js?m=${Date.now()}`);
  assert.equal(store.get("style"), "sage");
  assert.ok(store.isRead("JHN", 3));
  assert.equal(store.journalFor("JHN", 3), "Born again");
  assert.equal(store.get("dataVersion"), 2);
});

test("a new person starts with the Classic look and the defaults", async () => {
  const { store } = await import(`../../js/store.js?n=${Date.now()}`);
  assert.equal(store.get("style"), "classic");
  assert.equal(store.get("wordTap"), true);
  assert.ok(store.isEmpty());
});

test("a backup snapshot never includes Bible keys and restores cleanly", async () => {
  const { store } = await import(`../../js/store.js?s=${Date.now()}`);
  store.set("apiBibleKey", "SECRET"); store.set("esvKey", "SECRET2");
  store.setRead("GEN", 1, true);
  const snap = store.snapshot();
  assert.ok(!JSON.stringify(snap).includes("SECRET"));
  store.setRead("GEN", 1, false);
  store.restore(snap);
  assert.ok(store.isRead("GEN", 1));
  assert.equal(store.get("apiBibleKey"), "SECRET", "restoring keeps this device's keys");
});

test("devices stay in step: un-marking sticks, highlights and bookmarks sync, newest wins", async () => {
  const { store } = await import(`../../js/store.js?sync=${Date.now()}`);
  store.setRead("JHN", 3, true);
  store.toggleFavorite("JHN", 3);
  const other = store.snapshot(); // the other device still has both marks
  store.setRead("JHN", 3, false); // un-marked here, later
  store.toggleFavorite("JHN", 3);
  store.setVerseMark("JHN", 3, 16, { color: "yellow" });
  assert.equal(store.mergeFrom(other), false, "nothing new came in");
  assert.ok(!store.isRead("JHN", 3), "an un-marked chapter isn't brought back");
  assert.ok(!store.isFavorite("JHN", 3));
  assert.equal(store.verseMark("JHN", 3, 16).color, "yellow");
  // The other device highlights a verse and bookmarks another: both arrive.
  const theirs = { ...store.snapshot(), highlights: { "PSA.23.1": { color: "green", bookmark: true, updated: "2099-01-01T00:00:00.000Z" } } };
  assert.equal(store.mergeFrom(theirs), true);
  assert.equal(store.verseMark("PSA", 23, 1).color, "green");
  assert.ok(store.verseMark("PSA", 23, 1).bookmark);
  assert.equal(store.allVerseMarks().length, 2);
  // Marking it read again later wins over the older un-mark.
  store.setRead("JHN", 3, true);
  store.mergeFrom(other);
  assert.ok(store.isRead("JHN", 3));
});
