import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The Bible helper's instructions live in the Supabase function. Buddy's pretend helpers
// (js/buddy.js) can't be imported here without a page, so read the action names from the file.
const fn = readFileSync(new URL("../../supabase/functions/study-partner/index.ts", import.meta.url), "utf8");
const buddy = readFileSync(new URL("../../js/buddy.js", import.meta.url), "utf8");
const actions = buddy.slice(buddy.indexOf("export const BUDDY_ACTIONS"), buddy.indexOf("\n};", buddy.indexOf("export const BUDDY_ACTIONS")));
const known = new Set([...actions.matchAll(/^\s{2}(\w+): \{/gm)].map((m) => m[1]));

test("every action the helper may ask for is one Buddy can really do", () => {
  const line = fn.match(/You can do: ([^\n]+?)\. Never say/)[1];
  const named = line.split(/,\s*/).map((x) => x.split(" ")[0]);
  assert.ok(named.length >= 20);
  for (const n of named) assert.ok(known.has(n), `Buddy can't do "${n}"`);
});

test("the helper never labels views by church or denomination, and is careful with quotes", () => {
  assert.match(fn, /never by church or denomination/);
  assert.doesNotMatch(fn, /with their traditions/);
  assert.match(fn, /Never invent a quote, a source or a verse/);
  assert.match(fn, /marked as a paraphrase/);
});
