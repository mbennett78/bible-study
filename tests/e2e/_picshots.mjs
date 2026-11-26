// Screenshots of chapter pictures for review (not part of the test run).
// Run: node tests/e2e/_picshots.mjs <outdir> GEN.4 GEN.2 ...
import { chromium, serve } from "./harness.mjs";
const [out, ...refs] = process.argv.slice(2);
const site = await serve();
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +(process.env.W || 768), height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p class=\"p\"><span class=\"v\">1</span>In the beginning God created the heavens and the earth.</p>" } } }));
const page = await ctx.newPage();
for (const ref of refs) {
  const [b, c] = ref.split(".");
  await page.goto(site.url);
  await page.evaluate(([b, c]) => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, style: "animated", graphics: "full", last: { book: b, chapter: +c } })), [b, c]);
  await page.reload(); await page.waitForTimeout(800);
  await page.click(".tabbar [data-view=read]").catch(() => {}); await page.waitForTimeout(1500);
  const top = await page.$(".kids-story, .passage-art");
  if (top) await top.screenshot({ path: `${out}/${ref}-picture.png` });
  const intro = await page.$("#bookIntro summary");
  if (intro) await intro.screenshot({ path: `${out}/${ref}-setting-the-stage.png` });
  const nav = await page.$(".end-nav");
  if (nav && ref === refs[0]) { await nav.scrollIntoViewIfNeeded(); await page.screenshot({ path: `${out}/${ref}-end-of-chapter.png` }); }
}
await browser.close(); site.close();
