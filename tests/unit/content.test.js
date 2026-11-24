// Content integrity: every book, path, intro, daily verse and glossary entry is complete
// and points at real chapters and verses.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { BOOKS, BOOK_BY_ID, TOTAL_CHAPTERS } from "../../js/books.js";
import { PATHS, PATH_ORDER, pathChapters, checkPaths } from "../../js/paths.js";
import { INTROS } from "../../js/intros.js";
import { DAILY_VERSES, DEVOTIONS, dailyToday } from "../../js/daily.js";
import { GLOSSARY, glossFor } from "../../js/glossary.js";
import { NOTES, EVIDENCE } from "../../js/notes.js";

const verseExists = (book, chapter, verse) => {
  const f = new URL(`../../data/strongs/${book}.${chapter}.json`, import.meta.url);
  if (!existsSync(f)) return false;
  return JSON.parse(readFileSync(f, "utf8")).some((row) => row[5].includes(verse));
};

test("the Bible has 66 books and 1,189 chapters", () => {
  assert.equal(BOOKS.length, 66);
  assert.equal(TOTAL_CHAPTERS, 1189);
});

test("every study path covers every chapter exactly once", () => {
  assert.deepEqual(PATH_ORDER.slice().sort(), PATHS.map((p) => p.id).sort());
  for (const id of PATH_ORDER) {
    const list = pathChapters(id);
    assert.equal(list.length, TOTAL_CHAPTERS, id);
    assert.equal(new Set(list.map((c) => `${c.book}.${c.chapter}`)).size, TOTAL_CHAPTERS, id);
  }
  const problems = checkPaths();
  assert.ok(!problems || problems.length === 0 || problems === true, String(problems));
});

test("every book has a complete introduction", () => {
  for (const b of BOOKS) {
    const i = INTROS[b.id];
    assert.ok(i, `missing intro for ${b.id}`);
    for (const field of ["who", "when", "to", "setting", "about", "key"]) assert.ok(i[field]?.trim(), `${b.id}.${field}`);
  }
  assert.equal(Object.keys(INTROS).length, 66);
});

test("every verse of the day is a real verse", () => {
  for (const [book, chapter, verse] of DAILY_VERSES) {
    assert.ok(BOOK_BY_ID[book], book);
    assert.ok(verseExists(book, chapter, verse), `${book} ${chapter}:${verse}`);
  }
});

test("today's readings are valid on every day of a leap year", () => {
  for (let d = new Date(2028, 0, 1); d.getFullYear() === 2028; d.setDate(d.getDate() + 1)) {
    const t = dailyToday(new Date(d));
    assert.ok(t.psalm >= 1 && t.psalm <= 150);
    assert.ok(t.proverb >= 1 && t.proverb <= 31);
    assert.ok(t.verse.book && t.devotion[0] && t.devotion[1]);
  }
  assert.equal(DEVOTIONS.length, 31);
});

test("glossary finds simple word forms", () => {
  assert.ok(glossFor("Baptized"));
  assert.equal(glossFor("sins").term, "sin");
  assert.equal(glossFor("covenants").term, "covenant");
  assert.equal(glossFor("Pharisees").term, "pharisees");
  assert.equal(glossFor("table"), null);
  for (const [k, v] of Object.entries(GLOSSARY)) { assert.equal(k, k.toLowerCase()); assert.ok(v.length > 10, k); }
});

test("study notes use known evidence labels and sources", () => {
  for (const [key, n] of Object.entries(NOTES)) {
    const [book] = key.split(".");
    assert.ok(BOOK_BY_ID[book], key);
    const json = JSON.stringify(n);
    for (const m of json.matchAll(/"ev":"(\w+)"/g)) assert.ok(EVIDENCE[m[1]], `${key}: unknown evidence label ${m[1]}`);
    // Every note cites sources that are listed, and every listed source can be looked up.
    for (const sec of n.sections) for (const it of sec.items) for (const id of it.src || []) assert.ok(n.sources[id], `${key}: missing source ${id}`);
    for (const s of Object.values(n.sources)) assert.ok((typeof s === "string" ? s : s.text).length > 10 && (typeof s === "string" || /^https:\/\//.test(s.url)), key);
  }
});

test("every one-chapter book is asked for by its whole verse range in the ESV", async () => {
  globalThis.localStorage ??= { getItem: () => null, setItem() {}, removeItem() {} };
  const { esvQuery } = await import("../../js/text.js");
  const { BOOKS } = await import("../../js/books.js");
  for (const b of BOOKS.filter((x) => x.chapters === 1)) assert.match(esvQuery(b.id, 1), /1:1-\d+$/, b.id);
  assert.equal(esvQuery("JHN", 3), "John 3");
  assert.equal(esvQuery("SNG", 2), "Song of Solomon 2");
});

test("every trivia question points at real chapters and has four different choices", async () => {
  const { TRIVIA } = await import("../../js/trivia-bank.js");
  const { BOOK_BY_ID } = await import("../../js/books.js");
  const ids = new Set();
  for (const q of TRIVIA) {
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`); ids.add(q.id);
    for (const r of q.refs) {
      const [b, c] = r.split(".");
      assert.ok(BOOK_BY_ID[b] && Number(c) >= 1 && Number(c) <= BOOK_BY_ID[b].chapters, `${q.id}: ${r}`);
    }
    assert.equal(new Set(q.choices).size, q.choices.length, `${q.id}: repeated choice`);
    assert.ok(q.a >= 0 && q.a < q.choices.length && q.why, q.id);
  }
});

test("study notes have no science tab and don't say which churches hold which view", () => {
  for (const [key, n] of Object.entries(NOTES)) {
    assert.ok(!n.sections.some((s) => s.id === "science"), `${key}: science section`);
    const views = JSON.stringify(n.sections.filter((s) => s.id === "views"));
    assert.doesNotMatch(views, /(?<!John the )Baptist|Church(es)? of Christ|Catholic|Methodist|Presbyterian|Lutheran|Pentecostal|Restoration Movement/, key);
  }
});

test("the topic finder points at real chapters and finds stories by what they're about", async () => {
  const { TOPICS, STORIES, findTopics } = await import("../../js/topics.js");
  const { OUTLINES } = await import("../../js/outlines.js");
  const keys = [...STORIES.map(([, r]) => r[0]), ...Object.values(TOPICS).flatMap((t) => t.refs.map((r) => r[0]))];
  for (const k of keys) { const [b, c, v] = k.split("."); assert.ok(BOOK_BY_ID[b] && Number(c) <= BOOK_BY_ID[b].chapters && /^\d+(-\d+)?$/.test(v), k); }
  assert.equal(findTopics("the one about the lost sheep")[0].title, "The lost sheep");
  assert.ok(findTopics("baptism")[0].refs.length >= 10);
  for (const [b, list] of Object.entries(OUTLINES)) for (const [r] of list) assert.ok(Number(r.split("-").pop()) <= BOOK_BY_ID[b].chapters, `${b} ${r}`);
});

test("debated and unknown audiences explain why, with at least two sources", async () => {
  const { AUDIENCE_NOTES, PATH_BY_ID } = await import("../../js/paths.js");
  const onPath = new Set(PATH_BY_ID.audience.stages.flatMap((st) => st.readings.map((r) => r.split(" ")[0])));
  for (const [b, a] of Object.entries(AUDIENCE_NOTES)) {
    assert.ok(onPath.has(b) && ["debated", "unknown"].includes(a.status) && a.text.length > 120 && a.src.length >= 2, b);
  }
});
