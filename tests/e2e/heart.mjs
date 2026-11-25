// Learn a verse by heart: from the verse menu, four steps from reading it to saying it with
// every word hidden, peeking at any word with a tap.
// Run: node tests/e2e/heart.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span data-number="1" class="v">1</span>The LORD is my shepherd, I will not be in need.</p>', copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, wordTipSeen: true, newsOff: true, name: "Mel", show: { buddy: false }, last: { book: "PSA", chapter: 23 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1000);
  await page.$eval('#reader [data-number="1"]', (b) => b.click()); await page.waitForTimeout(300);
  check("the verse menu offers Learn by heart", await page.isVisible('.verse-sheet [data-act="heart"]'));
  await page.$eval('.verse-sheet [data-act="heart"]', (b) => b.click()); await page.waitForTimeout(300);
  const verse = () => page.$eval(".heart-sheet .heart-verse", (p) => p.textContent.replace(/\s+/g, " ").trim());
  check("step 1 shows the whole verse", /The LORD is my shepherd, I will not be in need\./.test(await verse()) && !(await page.$(".heart-sheet .hw-blank")));
  await page.click('.heart-sheet [data-h="next"]');
  const half = await page.$$(".heart-sheet .hw-blank");
  check("step 2 hides every other word", half.length === 5, String(half.length));
  await half[0].click();
  check("tapping a blank shows the word", await page.$eval(".heart-sheet .hw-blank.peek", (b) => b.textContent) === "LORD");
  await page.click('.heart-sheet [data-h="next"]');
  await page.screenshot({ path: process.env.SHOT || "/dev/null" }).catch(() => {});
  check("step 3 leaves only first letters", /^T_+ L_+ i_+ m_+ s_+,/.test(await verse()), await verse());
  await page.click('.heart-sheet [data-h="next"]');
  check("step 4 hides every word", (await page.$$(".heart-sheet .hw-blank")).length === 11 && !/LORD/.test(await verse()));
  await page.click('.heart-sheet [data-h="show"]');
  check("Show it to check brings the words back", /The LORD is my shepherd/.test(await verse()));
  await page.click('.heart-sheet [data-h="done"]');
  check("I said it! cheers with Psalm 119:11", /Psalm 119:11/.test(await page.textContent(".heart-cheer")));
  await page.click(".heart-sheet .ws-close"); await page.waitForTimeout(100);
  check("closing puts it away", !(await page.$(".heart-sheet")));
  check("no page errors", !errors.length, errors.join("; "));
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
