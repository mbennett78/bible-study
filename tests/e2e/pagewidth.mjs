// Page width (Settings > Reading): Narrow, Medium or Wide Bible text on an iPad, saved for next time.
// Run: node tests/e2e/pagewidth.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span data-number="1" class="v">1</span>For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life.</p>', copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", newsOff: true, show: { buddy: false }, last: { book: "JHN", chapter: 3 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  const width = async (w) => {
    await page.evaluate((v) => { const s = document.querySelector("#pageWidth"); s.value = v; s.dispatchEvent(new Event("change", { bubbles: true })); }, w);
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(300);
    return page.$eval("#view-read .reader", (r) => r.getBoundingClientRect().width);
  };
  check("Settings offers a Page width choice, Medium to start", await page.$eval("#pageWidth", (s) => s.value) === "medium" && (await page.$$("#pageWidth option")).length === 3);
  const m = await width("medium"), n = await width("narrow"), w = await width("wide");
  check("Narrow is narrower and Wide is wider than Medium", n < m && w > m, `${n} ${m} ${w}`);
  await page.reload(); await page.waitForTimeout(800);
  check("the choice is kept", await page.evaluate(() => document.documentElement.dataset.pageWidth) === "wide" && await page.$eval("#pageWidth", (s) => s.value) === "wide");
  check("no page errors", !errors.length, errors.join("; "));
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
