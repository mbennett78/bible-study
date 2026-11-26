// The bottom buttons stay locked to the bottom of the screen on iPad and iPhone sizes, even
// when Safari's visible area doesn't match where "bottom: 0" lands (the floating-bar bug),
// and nothing from the page shows underneath them. Run: node tests/e2e/bottombar.mjs
import { chromium, serve, check, finish } from "./harness.mjs";
import { createRequire } from "node:module";
const { devices } = createRequire(import.meta.url)("playwright");

const site = await serve();
const innerWidthOf = (dev) => devices[dev].viewport.width;
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
    // On a phone, reading goes full screen: the menus slide away and a Menu tab brings them back.
    if (dev === "iPhone 13") {
      check(`${dev}: scrolling the Bible text slides the menus away, with a Menu tab`, await page.evaluate(() => document.body.classList.contains("bars-away")) && await page.$eval("#pullTab", (t) => !t.hidden));
      await page.click("#pullTab"); await page.waitForTimeout(400);
      check(`${dev}: the Menu tab brings them back`, !(await page.evaluate(() => document.body.classList.contains("bars-away"))));
    } else check(`${dev}: the iPad keeps its menus while reading`, !(await page.evaluate(() => document.body.classList.contains("bars-away"))));
    const rail = dev.startsWith("iPad");
    if (rail) {
      // iPad: the menu is a rail down the left; the page starts after it and nothing sits under it.
      const m = await page.evaluate(() => { const t = document.querySelector(".tabbar").getBoundingClientRect(), v = document.querySelector("#view-read").getBoundingClientRect(); return { tl: t.left, tr: t.right, th: t.height, vl: v.left, ih: innerHeight }; });
      check(`${dev}: the menu is a side rail on the left`, m.tl === 0 && m.th >= m.ih - 1 && m.tr < 120, JSON.stringify(m));
      check(`${dev}: the reading starts after the rail, never under it`, m.vl >= m.tr, JSON.stringify(m));
      check(`${dev}: the page can't slide sideways`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      // Buddy's chat opens beside the reading.
      await page.evaluate(() => document.querySelector(".buddy").click()); await page.waitForTimeout(400);
      const c = await page.evaluate(() => { const s = document.querySelector("#chatSheet").getBoundingClientRect(), r = document.querySelector("#reader").getBoundingClientRect(); return { sl: s.left, sw: s.width, rw: r.width, rail: document.querySelector(".tabbar").getBoundingClientRect().right, open: document.querySelector("#chatSheet").open }; });
      check(`${dev}: the chat pops up over the page as a side panel`, c.open && c.sl > c.rail + 100 && c.sw <= 441, JSON.stringify(c));
      check(`${dev}: the Bible text keeps (nearly) the full width`, c.rw >= innerWidthOf(dev) - c.rail - 120, JSON.stringify(c));
      await page.click("#chatSheetClose"); await page.waitForTimeout(200);
    }
    const where = () => page.evaluate(() => { const r = document.querySelector(".tabbar").getBoundingClientRect(); return { bar: Math.round(r.bottom), screen: Math.round(visualViewport.offsetTop + visualViewport.height) }; });
    let w = await where();
    if (!rail) check(`${dev}: the bar sits on the bottom edge`, Math.abs(w.bar - w.screen) <= 1, JSON.stringify(w));
    if (!rail) check(`${dev}: the very bottom of the screen is the bar, never the reading`, await page.evaluate(() => [2, innerWidth / 2, innerWidth - 3].every((x) => Boolean(document.elementFromPoint(x, innerHeight - 1)?.closest(".tabbar")))));
    // Address bar collapsed: the visible area grows taller than where bottom:0 lands.
    await page.evaluate(() => { const H = visualViewport.height; Object.defineProperty(VisualViewport.prototype, "height", { get: () => H + 150, configurable: true }); visualViewport.dispatchEvent(new Event("resize")); });
    await page.waitForTimeout(150); w = await where();
    if (!rail) check(`${dev}: still on the bottom edge when the visible area grows`, Math.abs(w.bar - w.screen) <= 1, JSON.stringify(w));
    // Page left shifted after the keyboard closes.
    await page.evaluate(() => { Object.defineProperty(VisualViewport.prototype, "offsetTop", { get: () => 40, configurable: true }); visualViewport.dispatchEvent(new Event("scroll")); });
    await page.waitForTimeout(150); w = await where();
    if (!rail) check(`${dev}: still on the bottom edge when the page is shifted`, Math.abs(w.bar - w.screen) <= 1, JSON.stringify(w));
    // Typing: the bar steps aside for the keyboard.
    await page.evaluate(() => { delete VisualViewport.prototype.height; delete VisualViewport.prototype.offsetTop; });
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(300);
    await page.evaluate((s) => { document.querySelector(s).closest("details.set-group").open = true; }, "#userName"); await page.waitForTimeout(100);
    await page.focus("#userName").catch(() => page.focus("input[type=text]"));
    await page.waitForTimeout(150);
    if (!rail) check(`${dev}: while typing, the bar steps aside for the keyboard`, await page.$eval(".tabbar", (t) => getComputedStyle(t).visibility === "hidden"));
    await page.evaluate(() => document.activeElement.blur()); await page.waitForTimeout(400);
    check(`${dev}: and comes back after`, await page.$eval(".tabbar", (t) => getComputedStyle(t).visibility === "visible"));
    // The Journal button, and the two ways to read.
    await page.evaluate(() => document.querySelector(".tabbar [data-view=journal]").click()); await page.waitForTimeout(300);
    check(`${dev}: the Journal button opens My Journey`, /My Journey/.test(await page.textContent("#diaryToday")) && await page.$eval(".tabbar [data-view=journal]", (b) => b.getAttribute("aria-current") === "page"));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=books]").click()); await page.waitForTimeout(200);
    check(`${dev}: My Bible goes back to the books`, await page.$eval('[data-seg="progress"]', (b) => b.getAttribute("aria-selected") === "true"));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(300);
    await page.click('[data-readmode="plain"]');
    check(`${dev}: "Bible only" hides the study notes and tools`, await page.$eval("#studyNotes", (n) => getComputedStyle(n).display === "none") && await page.$eval(".study-tools", (n) => getComputedStyle(n).display === "none") && await page.$eval("#reader", (n) => getComputedStyle(n).display !== "none"));
    await page.click('[data-readmode="study"]');
    check(`${dev}: "Study Bible" brings them back`, await page.$eval(".study-tools", (n) => getComputedStyle(n).display !== "none"));
    // Pinch zoom is allowed everywhere (for older eyes); the page starts at the screen's own size.
    check(`${dev}: pinch zoom allowed, page starts at the screen's size`, ((v) => /initial-scale=1/.test(v) && !/maximum-scale|user-scalable=no/.test(v))(await page.getAttribute('meta[name="viewport"]', "content")));
    check(`${dev}: the tab says Bible study`, /Bible study/.test(await page.textContent(".tabbar")) && !/My path/.test(await page.textContent(".tabbar")));
    check(`${dev}: no page errors`, !errors.length, errors.join(" | "));
    await ctx.close();
  }
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
