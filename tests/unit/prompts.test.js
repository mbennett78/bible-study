import { test } from "node:test";
import assert from "node:assert/strict";
import { PROMPTS, nextPrompt } from "../../js/prompts.js";

test("every journal kind has prompts, and the same one never shows twice in a row", () => {
  for (const k of ["day", "prayer", "gratitude", "bible", "church"]) assert.ok(PROMPTS[k].length >= 5, k);
  let last = "";
  for (let i = 0; i < 50; i++) { const p = nextPrompt("day", last); assert.notEqual(p, last); last = p; }
  assert.ok(PROMPTS.day.includes(nextPrompt("unknown")));
});

test("prompts that cite Scripture use a real book and chapter format", () => {
  const all = Object.values(PROMPTS).flat();
  for (const p of all) for (const m of p.matchAll(/\(([^)]*\d[^)]*)\)/g)) assert.match(m[1], /^(\d )?[A-Z][a-z]+ \d+(:\d+(-\d+)?)?$/, p);
});
