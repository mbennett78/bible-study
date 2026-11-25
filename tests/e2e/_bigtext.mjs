// Ratings audit: Largest text + biggest reading size on small phones, every screen.
import { chromium, serve } from "./harness.mjs";
const site = await serve(); const browser = await chromium.launch();
const VIEWS = ["home","read","books","path","notes","journal","settings"];
for (const width of [320, 390]) for (const look of ["sage","classic","animated","christmas"]) {
  const ctx = await browser.newContext({ viewport: { width, height: 740 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span data-number=\"16\" class=\"v\">16</span>For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life.</p>", copyright: "c" } } }));
  await ctx.addInitScript((look) => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", style: look, uiScale: 125, textSize: 36, last: { book: "JHN", chapter: 3 } })), look);
  const page = await ctx.newPage(); const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  for (const v of VIEWS) {
    await page.evaluate((v) => document.querySelector(`.tabbar [data-view=${v}]`).click(), v); await page.waitForTimeout(500);
    if (v === "settings") await page.evaluate(() => document.querySelectorAll("#view-settings details.set-group").forEach((d) => d.open = true));
    const r = await page.evaluate(() => {
      const vis = (e) => { const s = getComputedStyle(e); const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && s.visibility !== "hidden" && !e.closest("[hidden]"); };
      const wide = document.documentElement.scrollWidth - innerWidth;
      const out = [...document.querySelectorAll(".view:not([hidden]) *")].filter(vis).filter((e) => { const b = e.getBoundingClientRect(); return b.right > innerWidth + 2 && !e.closest("[style*=overflow],.scroller,.chips,.h-scroll,svg") && getComputedStyle(e.parentElement).overflowX === "visible"; }).slice(0, 5).map((e) => `${e.tagName}.${e.className} ${Math.round(e.getBoundingClientRect().right)}`);
      const small = [...document.querySelectorAll(".view:not([hidden]) button, .view:not([hidden]) a[href], .tabbar button")].filter(vis).filter((e) => { const b = e.getBoundingClientRect(); return b.height < 32 || b.width < 32; }).slice(0, 6).map((e) => `${e.tagName}.${e.className} "${e.textContent.trim().slice(0,20)}" ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
      return { wide, out, small };
    });
    if (r.wide > 0 || r.out.length || r.small.length) console.log(width, look, v, JSON.stringify(r));
  }
  if (errors.length) console.log("ERR", look, errors);
  await ctx.close();
}
await browser.close(); site.close(); console.log("done");
