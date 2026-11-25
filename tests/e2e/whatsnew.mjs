// "What's new": a short note on Home after an update. It shows once for people who finished
// setup, "Got it" puts it away, "Don't show" turns notes off, and Settings can turn them back on.
// New people (setup not done) never see old notes.
// Run: node tests/e2e/whatsnew.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const base = { apiBibleKey: "k", nasbBibleId: "x", tourSeen: true, name: "Mel", show: { buddy: false } };
  const run = async (state) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
    await ctx.addInitScript((s) => { if (!sessionStorage.getItem("seeded")) { localStorage.setItem("bible-study:v1", JSON.stringify(s)); sessionStorage.setItem("seeded", "1"); } }, state);
    const page = await ctx.newPage();
    const errors = []; page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(site.url); await page.waitForTimeout(800);
    return { ctx, page, errors };
  };
  const stored = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")));

  let { ctx, page, errors } = await run({ ...base, setup: { done: true } });
  check("a set-up person sees the What's new note on Home", await page.isVisible("#newsCard"));
  await page.click("#newsOk"); await page.waitForTimeout(200);
  check("Got it puts the note away", !(await page.$("#newsCard")));
  await page.reload(); await page.waitForTimeout(800);
  check("the same note doesn't come back", !(await page.$("#newsCard")));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();

  ({ ctx, page, errors } = await run({ ...base, setup: { done: true } }));
  const box = await page.$eval("#newsCard", (c) => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + 20]; });
  await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] + 70, box[1], { steps: 4 }); await page.mouse.move(box[0] + 160, box[1], { steps: 4 }); await page.mouse.up(); await page.waitForTimeout(200);
  check("the note can be swiped away", !(await page.$("#newsCard")) && Boolean((await stored(page)).newsSeenAt));
  await ctx.close();

  ({ ctx, page, errors } = await run({ ...base, setup: { done: true } }));
  await page.click("#newsOff"); await page.waitForTimeout(200);
  check("Don't show turns notes off and says where to turn them on", (await stored(page)).newsOff === true && /Settings/.test(await page.textContent("#newsCard")));
  await page.reload(); await page.waitForTimeout(800);
  check("with notes off, none shows", !(await page.$("#newsCard")));
  const sw = await page.$eval("#newsShow", (i) => i.checked);
  check("the Settings switch shows notes are off", sw === false);
  await page.evaluate(() => { const i = document.querySelector("#newsShow"); i.checked = true; i.dispatchEvent(new Event("change")); });
  check("the Settings switch turns notes back on", (await stored(page)).newsOff === false);
  check("Settings lists the updates from the last 30 days", (await page.$$eval("#newsList details", (d) => d.length)) >= 1 || /No updates in the last 30 days/.test(await page.textContent("#newsList")));
  await ctx.close();

  ({ ctx, page, errors } = await run({ ...base, tourSeen: false, setup: {} }));
  check("a brand-new person doesn't get old notes", !(await page.$("#newsCard")));
  check("no page errors for a new person", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; console.log(e.stack?.split("\n").slice(0, 8).join("\n")); }
await browser.close(); site.close(); finish(stopped);
