// Settings: grouped sections with quick jumps, and the user guide at the top.
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span data-number=\"1\" class=\"v\">1</span>Words.</p>", copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", show: { buddy: false }, last: { book: "JHN", chapter: 3 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(300);
  const groups = await page.$$eval("#view-settings .settings-group", (h) => h.map((x) => x.textContent));
  check("settings are in six named groups", groups.length === 6 && groups[0] === "Help and guide", groups.join(" | "));
  check("the user guide comes first", await page.evaluate(() => {
    const cards = [...document.querySelectorAll("#view-settings .card:not(.setup-card)")].filter((c) => !c.hidden);
    return cards[0]?.id === "guideCard";
  }));
  check("the guide lists its topics, closed until tapped", (await page.$$("#guideList details.guide-topic")).length >= 8 && !(await page.$("#guideList details[open]")));
  await page.click('#guideList [data-guide="offline"] summary');
  check("a topic opens to show its tips", /next two ahead/.test(await page.textContent('#guideList [data-guide="offline"]')));
  await page.screenshot({ path: process.env.SHOT || "/dev/null" }).catch(() => {});
  await page.$eval('[data-jump="sg-reading"]', (b) => b.click()); await page.waitForTimeout(1500);
  const top = await page.$eval("#sg-reading", (h) => h.getBoundingClientRect().top);
  check("a section button jumps to that group", top >= 0 && top < 200, String(top));
  await page.click('[data-jump="sg-help"]'); await page.waitForTimeout(700);
  await page.click("#printGuide"); await page.waitForTimeout(200);
  check("Print the guide offers paper or sending a copy", /User Guide/.test(await page.textContent(".send-sheet")) && (await page.$$(".send-sheet .send-opt")).length === 2);
  check("no page errors", !errors.length, errors.join("; "));
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
