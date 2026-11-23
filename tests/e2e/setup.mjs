// First-time setup opens by itself only the very first time. Someone who started it and came
// back later lands on Home and stays there, with a "Finish setting up" card for when they're ready.
// Run: node tests/e2e/setup.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
const open = async (saved) => {
  const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  if (saved) await ctx.addInitScript((d) => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify(d)); }, saved);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  return { ctx, page, errors };
};
try {
  // Brand new: setup opens.
  let { ctx, page, errors } = await open(null);
  check("the very first open starts setup", await page.$eval("#setup", (d) => d.open));
  await page.fill("#setupName", "Mel"); await page.waitForTimeout(100);
  await ctx.close();

  // Started setup earlier (name given), then left: Home stays put.
  ({ ctx, page, errors } = await open({ name: "Mel", apiBibleKey: "k", nasbBibleId: "x", setup: { done: false, skipped: false, look: true } }));
  await page.waitForTimeout(1500);
  check("coming back mid-setup doesn't jump into setup", !(await page.$eval("#setup", (d) => d.open)));
  check("Home stays, with the greeting", /Mel/.test(await page.textContent("#homeView .home-hello")));
  check("a card offers Continue to setup or keep reading", /Continue to setup/.test(await page.textContent("#homeSetup")) && /keep reading/.test(await page.textContent("#homeSetup")));
  await page.click("#homeSetupGo"); await page.waitForTimeout(300);
  check("tapping it opens setup at the next unfinished step", await page.$eval("#setup", (d) => d.open) && !(await page.$("#setupName")));
  await page.click("#setupLater"); await page.waitForTimeout(300);
  check("Finish later puts it away", !(await page.$eval("#setup", (d) => d.open)) && !(await page.$("#homeSetup")));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();

  // Continue: straight back to reading, and the card doesn't come back.
  ({ ctx, page, errors } = await open({ name: "Mel", apiBibleKey: "k", nasbBibleId: "x", last: { book: "PSA", chapter: 23 }, setup: { done: false, skipped: false } }));
  await page.click("#homeSetupLater"); await page.waitForTimeout(400);
  check("Continue goes back to where they left off", (await page.textContent("#refLabel")) === "Psalms 23" || /Psalm/.test(await page.textContent("#refLabel")), await page.textContent("#refLabel"));
  await page.reload(); await page.waitForTimeout(900);
  check("and the question doesn't come back next time", !(await page.$("#homeSetup")) && !(await page.$eval("#setup", (d) => d.open)));
  await ctx.close();

  // Finished: no card, no setup.
  ({ ctx, page, errors } = await open({ name: "Mel", apiBibleKey: "k", nasbBibleId: "x", tourSeen: true, setup: { done: true } }));
  check("finished setup never shows again", !(await page.$eval("#setup", (d) => d.open)) && !(await page.$("#homeSetup")));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
