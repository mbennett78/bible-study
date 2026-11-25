// Compare versions: the verse menu shows the verse in each version the family has.
// Run: node tests/e2e/compare.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => {
    const kjv = /bibles\/kjvid\//.test(r.request().url());
    r.fulfill({ json: { data: { content: `<p><span data-number="1" class="v">1</span>${kjv ? "The LORD is my shepherd; I shall not want." : "The LORD is my shepherd, I will not be in need."}</p>`, copyright: "c" } } });
  });
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", extraBibles: [{ id: "kjvid", label: "KJV" }], setup: { done: true }, tourSeen: true, wordTipSeen: true, newsOff: true, name: "Mel", show: { buddy: false }, last: { book: "PSA", chapter: 23 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1000);
  await page.$eval('#reader [data-number="1"]', (b) => b.click()); await page.waitForTimeout(300);
  check("the verse menu offers Compare versions when there's more than one", Boolean(await page.$(".verse-sheet .vs-compare")));
  await page.click(".verse-sheet .vs-compare summary"); await page.waitForTimeout(600);
  const t = await page.textContent(".verse-sheet .vs-clist");
  check("it shows the verse in each version", /NASB.*will not be in need/.test(t) && /KJV.*I shall not want/.test(t), t);
  // Share: the words, or a verse picture.
  await page.$eval('.verse-sheet [data-act="share"]', (b) => b.click()); await page.waitForTimeout(200);
  await page.$eval('.verse-sheet [data-share="pic"]', (b) => b.click()); await page.waitForTimeout(400);
  check("Share offers a verse picture, drawn as a square card", await page.$eval(".versepic-sheet canvas", (c) => c.width === 1080 && c.height === 1080));
  const before = await page.$eval(".versepic-sheet canvas", (c) => c.toDataURL().length);
  await page.click('.versepic-sheet [data-style="night"]'); await page.waitForTimeout(100);
  check("picking a color redraws it", await page.$eval(".versepic-sheet canvas", (c) => c.toDataURL().length) !== before);
  const dl = page.waitForEvent("download", { timeout: 3000 }).catch(() => null);
  await page.$eval('.versepic-sheet [data-vp="share"]', (b) => b.click());
  const got = await dl; await page.waitForTimeout(300);
  check("where files can't be shared, it saves the picture", Boolean(got) || /Saved/.test(await page.textContent(".versepic-sheet .vp-msg")));
  await page.screenshot({ path: process.env.SHOT || "/dev/null" }).catch(() => {});
  check("no page errors", !errors.length, errors.join("; "));
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
