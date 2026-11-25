import { test } from "node:test";
import assert from "node:assert/strict";
import { wrapLines, PIC_STYLES } from "../../js/versepic.js";

test("verse pictures wrap words into lines that fit", () => {
  const lines = wrapLines("For God so loved the world that He gave His only Son", 20, (t) => t.length);
  assert.ok(lines.every((l) => l.length <= 20 || !l.includes(" ")));
  assert.equal(lines.join(" "), "For God so loved the world that He gave His only Son");
  assert.ok(PIC_STYLES.length >= 4);
});
