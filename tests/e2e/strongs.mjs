// Strong's, organized: the chapter's Hebrew or Greek words sorted into names of God, key
// words, people and places, everyday and small words; a find box; verse buttons that jump
// to the verse; and tapping any word in the Bible text (with a first-time tip) to see the
// original word, even when the English differs from the short dictionary gloss.
// Run: node tests/e2e/strongs.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v" data-number="1">1</span>In the beginning was the Word, and the Word was with God. <span class="v" data-number="5">5</span>The Light shines in the darkness, and the darkness did not comprehend it.</p>' } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", last: { book: "JHN", chapter: 1 } })); });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(800);
  check("a first-time tip says any word can be tapped", /Tap any word/.test(await page.textContent("#reader .word-tip").catch(() => "")));

  // The organized concordance.
  await page.waitForSelector("#strongsPanel .sc-group");
  const groups = await page.$$eval("#strongsPanel .sc-group", (gs) => gs.map((g) => [g.dataset.group, g.open, g.querySelectorAll(".sc-word").length]));
  check("words are sorted into groups, names of God and key words open", groups.map((g) => g[0]).join() === "god,key,names,common,small" && groups[0][1] && groups[1][1] && !groups[4][1], JSON.stringify(groups));
  check("names of God holds God, Jesus and Christ", await page.$$eval('#strongsPanel [data-group="god"] .sc-word', (w) => ["G2316", "G2424", "G5547"].every((n) => w.some((x) => x.dataset.n === n))));
  check("people and places holds John and Moses, not “I”", await page.$$eval('#strongsPanel [data-group="names"] .sc-word', (w) => w.some((x) => x.dataset.n === "G2491") && w.some((x) => x.dataset.n === "G3475") && !w.some((x) => x.dataset.n === "G3165")));
  await page.fill("#strongsPanel .sc-find input", "word");
  const shown = await page.$$eval("#strongsPanel .sc-word", (w) => w.filter((x) => !x.hidden && !x.closest(".sc-group").hidden).map((x) => x.dataset.n));
  check("the find box narrows to matching words", shown.includes("G3056") && shown.length < 6, shown.join());
  await page.fill("#strongsPanel .sc-find input", "zzzz");
  check("and says so when nothing matches", await page.$eval("#strongsPanel .sc-none", (p) => !p.hidden));
  await page.fill("#strongsPanel .sc-find input", "");
  await page.$eval('#strongsPanel .sc-word[data-n="G3056"] summary', (s) => s.click()); await page.waitForTimeout(400);
  check("opening a word shows Strong's definition", /Divine Expression/.test(await page.textContent('#strongsPanel .sc-word[data-n="G3056"] .sc-def')));
  await page.$eval('#strongsPanel .sc-word[data-n="G3056"] .sc-v[data-v="1"]', (b) => b.click()); await page.waitForTimeout(100);
  check("its verse buttons jump to the verse", await page.$eval('#reader .v[data-number="1"]', (v) => v.classList.contains("verse-flash")));

  // Tap a word in the reading.
  const tapWord = async (w) => {
    const pt = await page.evaluate((word) => {
      const walk = document.createTreeWalker(document.querySelector("#reader"), NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walk.nextNode())) { const i = n.textContent.indexOf(word); if (i >= 0) { const r = document.createRange(); r.setStart(n, i + 1); r.setEnd(n, i + 2); const b = r.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; } }
      return null;
    }, w);
    await page.mouse.click(pt.x, pt.y); await page.waitForTimeout(700);
  };
  await page.evaluate(() => document.querySelector("#reader .v").scrollIntoView({ block: "center" }));
  await tapWord("Word");
  check("tapping “Word” shows the Greek logos", await page.$eval(".word-sheet", (d) => d.open) && /G3056/.test(await page.textContent(".word-sheet .ws-lang")), await page.textContent(".word-sheet").catch(() => "closed"));
  check("and the tip goes away once they've tried it", !(await page.$("#reader .word-tip")));
  await page.click(".word-sheet .ws-done"); await page.waitForTimeout(200);
  await tapWord("comprehend");
  check("“comprehend” finds katalambanō through the King James renderings", /In the Greek[\s\S]*G2638/.test(await page.textContent(".word-sheet .ws-lang")));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
