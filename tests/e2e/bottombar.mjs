// The bottom buttons stay locked to the bottom of the screen on iPad and iPhone sizes, even
// when Safari's visible area doesn't match where "bottom: 0" lands (the floating-bar bug),
// and nothing from the page shows underneath them. Run: node tests/e2e/bottombar.mjs
import { chromium, serve, check, finish } from "./harness.mjs";
import { createRequire } from "node:module";
const { devices } = createRequire(import.meta.url)("playwright");

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  for (const dev of ["iPad Mini", "iPad Pro 11", "iPhone 13"]) {
    const ctx = await browser.newContext({ ...devices[dev] });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: Array.from({ length: 60 }, (_, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>Verse words ${i + 1}.</p>`).join(""), copyright: "c" } } }));
    await ctx.addInitScript(() => { localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", buddyName: "Pip", last: { book: "JOS", chapter: 1 } })); });
    const page = await ctx.newPage();
    const errors = []; page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(site.url); await page.waitForTimeout(900);
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(600);
    await page.evaluate(() => scrollTo(0, 600)); await page.waitForTimeout(200);
    const where = () => page.evaluate(() => { const r = document.querySelector(".tabbar").getBoundingClientRect(); return { bar: Math.round(r.bottom), screen: Math.round(visualViewport.offsetTop + visualViewport.height) }; });
    let w = await where();
    check(`${dev}: the bar sits on the bottom edge`, Math.abs(w.bar - w.screen) <= 1, JSON.stringify(w));
    check(`${dev}: the very bottom of the screen is the bar, never the reading`, await page.evaluate(() => [2, innerWidth / 2, innerWidth - 3].every((x) => Boolean(document.elementFromPoint(x, innerHeight - 1)?.closest(".tabbar")))));
    // Address bar collapsed: the visible area grows taller than where bottom:0 lands.
    await page.evaluate(() => { const H = visualViewport.height; Object.defineProperty(VisualViewport.prototype, "height", { get: () => H + 150, configurable: true }); visualViewport.dispatchEvent(new Event("resize")); });
    await page.waitForTimeout(150); w = await where();
    check(`${dev}: still on the bottom edge when the visible area grows`, Math.abs(w.bar - w.screen) <= 1, JSON.stringify(w));
    // Page left shifted after the keyboard closes.
    await page.evaluate(() => { Object.defineProperty(VisualViewport.prototype, "offsetTop", { get: () => 40, configurable: true }); visualViewport.dispatchEvent(new Event("scroll")); });
    await page.waitForTimeout(150); w = await where();
    check(`${dev}: still on the bottom edge when the page is shifted`, Math.abs(w.bar - w.screen) <= 1, JSON.stringify(w));
    // Typing: the bar steps aside for the keyboard.
    await page.evaluate(() => { delete VisualViewport.prototype.height; delete VisualViewport.prototype.offsetTop; });
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(300);
    await page.focus("#userName").catch(() => page.focus("input[type=text]"));
    await page.waitForTimeout(150);
    check(`${dev}: while typing, the bar steps aside for the keyboard`, await page.$eval(".tabbar", (t) => getComputedStyle(t).visibility === "hidden"));
    await page.evaluate(() => document.activeElement.blur()); await page.waitForTimeout(400);
    check(`${dev}: and comes back after`, await page.$eval(".tabbar", (t) => getComputedStyle(t).visibility === "visible"));
    check(`${dev}: the tab says Bible study`, /Bible study/.test(await page.textContent(".tabbar")) && !/My path/.test(await page.textContent(".tabbar")));
    check(`${dev}: no page errors`, !errors.length, errors.join(" | "));
    await ctx.close();
  }
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
