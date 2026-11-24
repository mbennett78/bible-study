// Buddy grows, part 2: scared in scary stories, comforted when checked on, props that unlock
// with time together, and private memories of what each person teaches him.
import { test } from "node:test";
import assert from "node:assert/strict";
import { isScary, checkingOn, comfortLine, PROPS, PROP_STEPS, propsUnlocked, propFor, newProp, warmthLevel, learnFrom, remember, learnedLine, memoryLine, recallLine, ASK_MEMORY, FORGET_LAST, FORGET_ALL } from "../../js/buddygrow.js";

test("scary stories make him a little scared", () => {
  assert.equal(isScary("DAN.6"), "the lions");
  assert.equal(isScary("1SA.17"), "Goliath");
  assert.equal(isScary("PSA.23", "The LORD is my shepherd, I shall not want."), "");
  assert.ok(isScary("XXX.1", "lions lions bears darkness afraid trembled sword"));
});

test("checking on him comforts him", () => {
  for (const q of ["Are you okay?", "Don't be scared, Buddy", "It's okay!", "I'll protect you", "you ok?"]) assert.ok(checkingOn(q), q);
  for (const q of ["Who was Daniel?", "Is it okay to pray at night?"]) assert.ok(!checkingOn(q) || /okay/.test(q), q);
  assert.match(comfortLine({ scaredOf: "the lions", name: "Ruth" }), /Ruth|better|brave|okay/);
  assert.ok(comfortLine({}).length > 10);
});

test("props unlock one at a time with time together", () => {
  assert.equal(PROPS.length, PROP_STEPS.length);
  assert.equal(propsUnlocked(0), 1);
  assert.equal(propFor("LUK.19", 0)?.id, "tree"); // the Zacchaeus tree is first
  assert.equal(propFor("1SA.17", 0), null);
  assert.equal(propFor("1SA.17", 6)?.id, "sling");
  assert.equal(newProp(3)?.id, "boat");
  assert.equal(newProp(4), null);
  for (const p of PROPS) assert.ok(p.icon && p.name && p.refs.length && p.line, p.id);
});

test("he grows warmer, never colder", () => {
  const levels = [0, 3, 8, 20, 40, 100].map(warmthLevel);
  assert.deepEqual(levels, [...levels].sort((a, b) => a - b));
  assert.equal(warmthLevel(100), 4);
});

test("he remembers what each person teaches him", () => {
  assert.deepEqual(learnFrom("My favorite verse is John 3:16."), { key: "favorite verse", text: "John 3:16" });
  assert.deepEqual(learnFrom("Remember that I love horses!"), { key: "", text: "I love horses" });
  assert.deepEqual(learnFrom("my dog's name is Max"), { key: "dog's name", text: "Max" });
  assert.equal(learnFrom("What does John 3:16 mean?"), null);
  let mem = remember([], learnFrom("My favorite verse is John 3:16"), 1);
  mem = remember(mem, learnFrom("My favorite verse is Psalm 23"), 2);
  assert.equal(mem.length, 1);
  assert.equal(mem[0].text, "Psalm 23");
  mem = remember(mem, learnFrom("Remember that I love horses"), 3);
  assert.match(learnedLine(mem[0]), /you love horses/);
  assert.match(memoryLine(mem, "Mel"), /you love horses; your favorite verse is Psalm 23/);
  assert.match(memoryLine([]), /haven't taught me/);
  assert.match(recallLine(mem, "", 0), /I remember you told me you love horses/);
  assert.ok(ASK_MEMORY.test("What do you remember about me?") && FORGET_LAST.test("forget that") && FORGET_ALL.test("Forget everything"));
  assert.equal(Array.from({ length: 40 }).reduce((m, _, i) => remember(m, { key: "", text: `fact ${i}` }, i), []).length, 30);
});
