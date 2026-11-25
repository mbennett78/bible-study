// Preview shots (not part of the suite): the Seasonal changes look on a phone for each of the 13
// times of year, Home and a reading page. Run: OUT=dir node tests/e2e/_seasonshots.mjs [season...]
import { chromium, serve } from "./harness.mjs";
const DAYS = { "new-year": "2027-01-02", winter: "2027-01-15", angels: "2027-02-10", march: "2027-03-10", easter: "2027-03-26", april: "2027-04-14", may: "2027-05-12", june: "2027-06-10", summer: "2027-07-20", learning: "2027-09-15", psalm23: "2027-10-14", harvest: "2026-11-10", advent: "2026-12-10" };
const out = process.env.OUT || ".";
const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(DAYS);
const site = await serve();
const browser = await chromium.launch();
for (const k of keys) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: Number(process.env.DSF || 2) });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v" data-number="1">1</span>The LORD is my shepherd, I shall not want. <span class="v" data-number="2">2</span>He makes me lie down in green pastures; He leads me beside quiet waters. <span class="v" data-number="3">3</span>He restores my soul; He guides me in the paths of righteousness for His name’s sake. <span class="v" data-number="4">4</span>Even though I walk through the valley of the shadow of death, I fear no evil, for You are with me; Your rod and Your staff, they comfort me.</p>', copyright: "c" } } }));
  await ctx.addInitScript(() => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", style: "seasons", last: { book: "PSA", chapter: 23 }, whatsNewSeen: "9999" })));
  const page = await ctx.newPage();
  await page.clock.setFixedTime(new Date(`${DAYS[k]}T10:00:00`));
  await page.goto(site.url); await page.waitForTimeout(1200);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=home]").click()); await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/${k}-home.jpg`, type: "jpeg", quality: 72 });
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${k}-read.jpg`, type: "jpeg", quality: 72 });
  await ctx.close();
  console.log("shot", k);
}
await browser.close(); site.close();
