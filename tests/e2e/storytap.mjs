// Kids' storybook: tapping someone in a story picture makes them hop with a twinkle, only with
// Lively pictures; with motion turned down the picture stays still.
// Run: node tests/e2e/storytap.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  for (const [graphics, lively] of [["full", true], ["simple", false]]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span class=\"v\" data-number=\"1\">1</span>Text</p>" } } }));
    await ctx.addInitScript((graphics) => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, wordTipSeen: true, newsOff: true, style: "animated", graphics, last: { book: "DAN", chapter: 6 } })), graphics);
    const page = await ctx.newPage();
    const errors = []; page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(site.url); await page.waitForTimeout(900);
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(800);
    const has = await page.$("svg.storybook");
    if (lively) check("Daniel 6 shows its storybook picture", Boolean(has));
    if (has) {
      const hit = await page.evaluate(() => { const svg = document.querySelector("svg.storybook"); svg.scrollIntoView({ block: "center" }); const r = svg.getBoundingClientRect(); const el = document.elementFromPoint(r.left + r.width * .5, r.top + r.height * .6); el.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: r.left + r.width * .5, clientY: r.top + r.height * .6 })); return [Boolean(svg.querySelector(".sb-hop")), Boolean(svg.querySelector(".sb-tapstar"))]; });
      if (lively) check("tapping the picture makes someone hop with a twinkle", hit[0] && hit[1], JSON.stringify(hit));
      else check("with still pictures, tapping does nothing", !hit[0] && !hit[1]);
    } else if (!lively) check("with still pictures, tapping does nothing", true);
    check(`no page errors (${graphics})`, !errors.length, errors.join(" | "));
    await ctx.close();
  }
} catch (e) { stopped = e; } finally {
  await browser.close(); site.close(); finish(stopped);
}
