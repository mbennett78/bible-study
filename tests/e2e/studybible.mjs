// The study Bible parts: the Reference section with square tiles, the map's two name colors
// and key, verse highlights and bookmarks, notes on a verse, and Find a verse.
// Run: node tests/e2e/studybible.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 } });
  const V = ["The heavens and the earth were completed.", "By the seventh day God completed His work.", "Then God blessed the seventh day."];
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible.*search/, (r) => r.fulfill({ json: { data: { total: 1, verses: [{ id: "LUK.15.4", reference: "Luke 15:4", text: "What man among you, if he has a hundred sheep...", chapterId: "LUK.15" }] } } }));
  await ctx.route(/api\.bible\/v1\/bibles\/[^/]+\/chapters/, (r) => r.fulfill({ json: { data: { content: V.map((t, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>${t}</p>`).join(""), copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, wordTipSeen: true, name: "Mel", buddyName: "Pip", last: { book: "GEN", chapter: 2 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1200);

  // Reference section
  check("a clearly marked Reference section under the Scripture", /Reference & resources/.test(await page.textContent("#studyNotes")) && await page.evaluate(() => document.querySelector("#reader").compareDocumentPosition(document.querySelector("#studyNotes")) & Node.DOCUMENT_POSITION_FOLLOWING));
  const tiles = await page.$$eval(".ref-tile", (a) => a.map((t) => [t.dataset.tab, t.getBoundingClientRect().width, t.getBoundingClientRect().height]));
  check("square tiles, three across on iPad", tiles.length >= 6 && new Set(tiles.slice(0, 3).map((t) => Math.round(t[1]))).size === 1 && tiles[0][2] >= 90, JSON.stringify(tiles.slice(0, 4)));
  check("no Science tile", !tiles.some((t) => t[0] === "science"));
  // Map: two colors and a key, with Eden marked
  check("Background, Cross-references and When and where moved above the passage", !(await page.$('.ref-tile[data-tab="map"], .ref-tile[data-tab="where"], .ref-tile[data-tab="xref"], .ref-tile[data-tab="history"]')) && (await page.$$("#studyBtns [data-sheet]")).length === 4);
  await page.click('#studyBtns [data-sheet="where"]'); await page.waitForTimeout(500);
  check("map names in two colors", (await page.$$(".notes-map .nm-then")).length > 3 && (await page.$$(".notes-map .nm-now")).length > 3);
  check("the map has a key", /Bible times/.test(await page.textContent(".notes-map .map-key")) && /today/.test(await page.textContent(".notes-map .map-key")));
  check("likely sites of Eden are marked", (await page.$$(".map-place.is-eden")).length >= 2);
  await page.$eval(".map-place.is-eden", (g) => g.dispatchEvent(new MouseEvent("click", { bubbles: true }))); await page.waitForTimeout(100);
  check("tapping a place explains it", /Eden/.test(await page.textContent("#ssMapNote")));
  await page.keyboard.press("Escape"); await page.waitForTimeout(200);
  // Setting the stage is the overview; it leads to Background (more detail) and the maps.
  await page.click('#studyBtns [data-sheet="stage"]'); await page.waitForTimeout(400);
  check("Setting the stage links to Background and to the maps", Boolean(await page.$('.study-sheet [data-sheet-go="history"]')) && Boolean(await page.$('.study-sheet [data-sheet-go="where"]')));
  await page.click('.study-sheet [data-sheet-go="history"]'); await page.waitForTimeout(300);
  check("Background has the maps and the deep-dive notes one tap away", /Background/.test(await page.textContent(".study-sheet")) && Boolean(await page.$('.study-sheet [data-sheet-go="where"]')) && Boolean(await page.$('.study-sheet [data-deeper="strongs"]')));
  await page.click('.study-sheet [data-sheet-go="where"]'); await page.waitForTimeout(400);
  check("and the maps open from there", (await page.$$(".study-sheet .notes-map .nm-then")).length > 3);
  await page.keyboard.press("Escape"); await page.waitForTimeout(200);
  // Views: no church names, with links to read more
  await page.$eval('.ref-tile[data-tab="views"]', (b) => b.click()); await page.waitForTimeout(300);
  check("views link straight to their sources", (await page.$$("#refPanel .read-more a")).length >= 4);
  check("views don't name churches", !/Baptist|Church of Christ|Churches of Christ/.test((await page.textContent("#refPanel")).replace(/John the Baptist/g, "")));

  // Highlight and bookmark a verse
  await page.$eval('#reader [data-number="2"]', (b) => b.click()); await page.waitForTimeout(300);
  check("tapping a verse number opens the verse menu", /Genesis 2:2/.test(await page.textContent(".verse-sheet")));
  await page.$eval('.verse-sheet [data-color="yellow"]', (b) => b.click()); await page.waitForTimeout(200);
  check("the verse is highlighted", /seventh day God completed/.test(await page.$$eval('#reader mark.hl-yellow[data-v="2"]', (a) => a.map((m) => m.textContent).join(""))));
  await page.$eval('#reader [data-number="3"]', (b) => b.click()); await page.waitForTimeout(200);
  await page.$eval('.verse-sheet [data-act="bookmark"]', (b) => b.click()); await page.waitForTimeout(200);
  check("the verse is bookmarked", (await page.$$("#reader .is-bookmarked")).length === 1);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).highlights);
  check("both are saved (and so back up and sync)", saved["GEN.2.2"]?.color === "yellow" && saved["GEN.2.3"]?.bookmark === true);
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1200);
  check("highlights come back when the chapter opens again", (await page.$$('#reader mark.hl-yellow[data-v="2"]')).length > 0);
  // A note on a verse goes in this chapter's journal, inside the Reference section
  await page.$eval('#reader [data-number="1"]', (b) => b.click()); await page.waitForTimeout(200);
  await page.$eval('.verse-sheet [data-act="note"]', (b) => b.click()); await page.waitForTimeout(500);
  check("the verse is quoted in the note", /heavens and the earth were completed/.test(await page.textContent("#refPanel .ee-quote")) && /Genesis 2:1/.test(await page.textContent("#refPanel .ee-quote")));
  await page.$eval('#refPanel [data-qtag="question"]', (b) => b.click());
  check("a quote can be a comment, thought or question", await page.$eval('#refPanel [data-qtag="question"]', (b) => b.getAttribute("aria-pressed")) === "true");
  await page.fill("#refPanel .q-note", "Why rest?");
  await page.$eval('#refPanel [data-tool="sticker"]', (b) => b.click()); await page.$eval('#refPanel [data-sg="animals"]', (b) => b.click()); await page.$eval('#refPanel [data-sid="lamb"]', (b) => b.click());
  check("a sticker can be added", (await page.$$("#refPanel .ee-pic.is-sticker")).length === 1);
  await page.$eval('#refPanel [data-tool="chart"]', (b) => b.click());
  await page.fill("#cA", "Day 6"); await page.fill("#cB", "Day 7"); await page.fill("#cBoth", "God saw it"); await page.$eval("#cDone", (b) => b.click());
  check("a chart can be added", (await page.$$("#refPanel .ee-pic.is-chart svg.chart-venn")).length === 1);
  await page.focus("#refPanel #entryRich"); await page.keyboard.press("Control+End"); await page.keyboard.insertText("God finished His work."); await page.$eval("#entrySave", (b) => b.click()); await page.waitForTimeout(400);
  const ent = await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem("bible-study:v1")).entries || {}));
  check("the quote, its question, sticker and chart are saved", ent.some((e) => e.quotes?.[0]?.tag === "question" && e.quotes[0].note === "Why rest?" && e.pics?.length === 2));
  check("it's listed with this passage's notes", /God finished His work/.test(await page.textContent("#refPanel")));
  check("My notes tile counts it", /1 note/.test(await page.textContent('.ref-tile[data-tab="mine"]')));

  // Find a verse
  await page.evaluate(() => document.querySelector(".tabbar [data-view=books]").click()); await page.waitForTimeout(300);
  await page.$eval('[data-seg="favorites"]', (b) => b.click()); await page.waitForTimeout(200);
  check("saved verses are listed in My Bible", /Genesis 2:2/.test(await page.textContent("#verseMarksList")) && /Genesis 2:3/.test(await page.textContent("#verseMarksList")));
  await page.$eval("#findGo", (b) => b.click()); await page.waitForTimeout(200);
  await page.fill(".find-sheet #wsInput", "the one about the lost sheep");
  await page.$eval(".find-sheet #wsForm button", (b) => b.click()); await page.waitForTimeout(600);
  const out = await page.textContent(".find-sheet #wsOut");
  check("find by what it's about", /The lost sheep/.test(out) && /Luke 15:3-7/.test(out));
  check("and by its words", /Luke 15:4/.test(out));
  check("and the helper can look for the rest", (await page.$$(".find-sheet [data-ask]")).length === 1);
  await page.fill(".find-sheet #wsInput", "baptism");
  await page.$eval(".find-sheet #wsForm button", (b) => b.click()); await page.waitForTimeout(400);
  check("a topic gives a list of passages", (await page.$$(".find-sheet .find-topic .ws-verse")).length >= 10);
  const placeBefore = await page.evaluate(() => JSON.stringify(JSON.parse(localStorage.getItem("bible-study:v1")).last));
  await page.$eval(".find-sheet .find-topic .ws-verse", (b) => b.click()); await page.waitForTimeout(600);
  check("tapping a result shows the verse in a quick pop-up", await page.$eval(".study-sheet", (d) => d.open) && !(await page.$eval(".find-sheet", (d) => d.open)) && Boolean(await page.$(".study-sheet .ss-passage")), await page.textContent(".study-sheet").catch(() => "none"));
  check("with Back, ✕ and an optional Read the whole chapter", Boolean(await page.$(".study-sheet [data-ss-back]")) && Boolean(await page.$(".study-sheet .ws-close")) && /Read the whole chapter/.test(await page.textContent(".study-sheet [data-ss-tab]")));
  await page.click(".study-sheet [data-ss-back]"); await page.waitForTimeout(300);
  check("Back returns to the results", await page.$eval(".find-sheet", (d) => d.open) && (await page.$$(".find-sheet .find-topic .ws-verse")).length >= 10);
  await page.click(".find-sheet .ws-close"); await page.waitForTimeout(200);
  check("and ✕ closes it with your place unchanged", !(await page.$eval(".find-sheet", (d) => d.open)) && await page.evaluate(() => JSON.stringify(JSON.parse(localStorage.getItem("bible-study:v1")).last)) === placeBefore);
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
