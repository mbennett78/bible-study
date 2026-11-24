// When and where: the time period, regions, a places map from OpenBible data and the tribes;
// plus the Christmas pictures that change from chapter to chapter.
// Run: node tests/e2e/where.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 430, height: 1200 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span data-number=\"1\" class=\"v\">1</span>The tribe of Judah camped on the east, then the tribe of Issachar.</p>", copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, wordTipSeen: true, last: { book: "JHN", chapter: 4 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1200);
  check("a When and where square in the Reference section", !!(await page.$('#studyNotes [data-tab="where"]')));
  await page.evaluate(() => document.querySelector('#studyNotes [data-tab="where"]').click()); await page.waitForTimeout(1000);
  check("it gives the time period", /The life of Jesus/.test(await page.textContent("#refPanel")) && /Pontius Pilate/.test(await page.textContent("#refPanel")));
  check("it names the regions, then and now", /Samaria/.test(await page.textContent("#wherePlaces")) && /today/.test(await page.textContent("#wherePlaces")));
  const names = await page.$$eval("#wherePlaces .map-place", (g) => g.map((x) => x.getAttribute("aria-label")));
  check("the map shows the chapter's places", names.some((n) => /Sychar/.test(n)) && names.some((n) => /Jerusalem/.test(n)));
  await page.evaluate(() => [...document.querySelectorAll("#wherePlaces .map-place")].find((g) => /Capernaum/.test(g.getAttribute("aria-label"))).dispatchEvent(new MouseEvent("click", { bubbles: true })));
  check("tapping a place tells where it is today and how sure scholars are", /Tell Hum/.test(await page.textContent("#whereNote")) && /Location/.test(await page.textContent("#whereNote")) && !!(await page.$('#whereNote a[href*="openbible.info/geo/ancient/capernaum"]')));
  check("the places are credited to OpenBible", /OpenBible\.info/.test(await page.textContent("#wherePlaces")));
  check("the tribes named in the chapter are marked", (await page.$$("#whereTribes .tribe.is-named")).length === 2 && (await page.$$("#whereTribes .tribe")).length === 13);
  // A chapter that isn't about the tribes doesn't show them.
  await ctx.unroute(/api\.bible/);
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span data-number=\"1\" class=\"v\">1</span>Jesus came to a city of Samaria called Sychar.</p>", copyright: "c" } } }));
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.last = { book: "JHN", chapter: 9 }; localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1200);
  await page.evaluate(() => document.querySelector('#studyNotes [data-tab="where"]').click()); await page.waitForTimeout(1000);
  check("the tribes stay out of chapters that aren't about them", !(await page.$("#whereTribes .tribe")) && /The life of Jesus/.test(await page.textContent("#refPanel")));
  await page.evaluate(async () => { const m = await import("/js/history.js"); window.__era = m.eraFor("EXO", 14); });
  check("dates scholars debate are marked as debated", await page.evaluate(() => window.__era.debated && /1446/.test(window.__era.dates)));
  // Christmas pictures change from chapter to chapter.
  const caps = await page.evaluate(async () => { const { christmasStrip } = await import("/js/art.js"); return new Set(Array.from({ length: 20 }, (_, i) => christmasStrip("LUK", i + 1).caption)).size; });
  check("the Christmas pictures rotate", caps >= 6);
  check("no page errors", errors.length === 0, errors.join("; "));
} finally {
  await browser.close(); site.close();
}
finish();
