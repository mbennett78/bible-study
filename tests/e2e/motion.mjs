// Lively pictures have gentle motion in every look (birds, doves, breeze, fish, stars).
// Still pictures, and devices set to reduce motion, stay perfectly still.
// Run: node tests/e2e/motion.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const LOOKS = ["classic", "classic2", "sage", "nativity", "easter", "fall", "christmas", "masculine", "animated"];
const site = await serve();
const browser = await chromium.launch();
let stopped = null;
const moving = async ({ style, graphics, reduce = false }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: reduce ? "reduce" : "no-preference" });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  await ctx.addInitScript(([style, graphics]) => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, style, graphics })), [style, graphics]);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(700);
  const n = await page.evaluate(() => [...document.querySelectorAll("#homeView .scene")].reduce((t, sc) => t + sc.getAnimations({ subtree: true }).filter((a) => a.playState === "running").length, 0));
  await ctx.close();
  return { n, errors };
};
try {
  for (const style of LOOKS) {
    const lively = await moving({ style, graphics: "full" });
    check(`${style}: Lively pictures move`, lively.n >= 5, String(lively.n));
    const still = await moving({ style, graphics: "simple" });
    check(`${style}: Still pictures stay still`, still.n === 0, String(still.n));
    check(`${style}: no page errors`, !lively.errors.length && !still.errors.length, [...lively.errors, ...still.errors].join(" | "));
  }
  // Indoors (Thanksgiving): birds fly only in the window, never over the walls, and candles flicker.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.addInitScript(() => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, style: "fall", graphics: "full" })));
    const page = await ctx.newPage();
    await page.goto(site.url); await page.waitForTimeout(700);
    const birdsOut = await page.evaluate(() => [...document.querySelectorAll("#homeView .theme-fall .m-bird")].filter((b) => !b.closest(".scene-sky[clip-path]")).length);
    const birdsIn = await page.$$eval("#homeView .theme-fall .scene-sky .m-bird", (l) => l.length);
    check("Thanksgiving: birds stay inside the window", birdsIn > 0 && birdsOut === 0, `${birdsIn} in, ${birdsOut} out`);
    const flames = await page.evaluate(() => [...document.querySelectorAll("#homeView .theme-fall .flame, #homeView .theme-fall .candle-glow")].filter((f) => f.getAnimations().some((a) => a.playState === "running")).length);
    check("Thanksgiving: candles flicker", flames >= 4, String(flames));
    await ctx.close();
  }
  for (const style of ["classic", "sage", "animated"]) {
    const calm = await moving({ style, graphics: "full", reduce: true });
    check(`${style}: a device set to reduce motion stays still`, calm.n === 0, String(calm.n));
  }
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
