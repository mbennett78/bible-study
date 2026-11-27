// Builds the printed Quick Guide (B-99) for the family who sign in: large print, a picture for
// the main sections, and the same words as the Quick guide at the top of Settings.
// Run: node tools/gift/make-quick-guide.mjs [out.pdf]
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium, serve } from "../../tests/e2e/harness.mjs";
import { QUICK_GUIDE, SITE } from "../../js/guide.js";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const OUT = process.argv[2] || `${HERE}quick-guide.pdf`;
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Fresh pictures of the app, in the calm Sage look, which prints well.
const SEED = { apiBibleKey: "k", nasbBibleId: "x", setup: { done: true, look: true, version: true, password: true }, tourSeen: true, newsOff: true, wordTipSeen: true, name: "Grandma", style: "sage", last: { book: "JHN", chapter: 3 } };
const PASSAGE = '<p><span class="v" data-number="16">16</span>For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life.</p>';
const site = await serve();
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 700 }, deviceScaleFactor: 2 });
await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: PASSAGE } } }));
await ctx.addInitScript((seed) => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify(seed)); }, SEED);
const page = await ctx.newPage();
await page.goto(site.url); await page.waitForTimeout(1200);
const shot = async () => `data:image/png;base64,${(await page.screenshot()).toString("base64")}`;
const pics = {};
pics["Getting in"] = await shot();
await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1200);
pics.Reading = await shot();
await page.evaluate(() => document.querySelector(".tabbar [data-view=notes]")?.click()); await page.waitForTimeout(500);
await page.click("[data-new-note=note]"); await page.waitForTimeout(400);
await page.fill("#eeTitle", "God so loved the world");
await page.click("#entryRich"); await page.keyboard.type("Whoever means anyone.");
await page.evaluate(() => document.querySelector(".entry-editor").scrollIntoView({ block: "start" })); await page.waitForTimeout(300);
pics["Notes and journal"] = await shot();
await browser.close(); site.close();

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Family Bible Study: Quick Guide</title><style>
@page { size: Letter; margin: 0.6in 0.7in; }
body { margin: 0; font: 15pt/1.5 Georgia, "Times New Roman", serif; color: #2a2620; }
h1 { font-weight: normal; font-size: 28pt; margin: 0 0 .04in; }
.sub { color: #6b5d48; font-style: italic; margin: 0 0 .2in; }
section { display: flex; gap: .25in; align-items: flex-start; margin: 0 0 .16in; }
li { break-inside: avoid; }
section > div { flex: 1; }
h2 { font-weight: normal; font-size: 19pt; margin: .1in 0 .05in; border-bottom: 1px solid #d9c9a8; padding-bottom: .03in; }
ul { margin: 0; padding-left: .28in; }
li { margin: 0 0 .06in; }
img { width: 1.9in; border: 1px solid #d9c9a8; border-radius: 10px; flex: none; }
.end { margin-top: .2in; padding: .14in .18in; background: #f6f0e4; border-radius: 8px; break-inside: avoid; }
</style></head><body>
<h1>Family Bible Study</h1>
<p class="sub">Quick guide${SITE ? ` · ${esc(SITE)}` : ""}</p>
${QUICK_GUIDE.map((g) => `<section><div><h2>${g.icon} ${esc(g.title)}</h2><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>${pics[g.title] ? `<img src="${pics[g.title]}" alt="">` : ""}</section>`).join("\n")}
<div class="end">The full user guide is in the app: Settings, Help and guide.</div>
</body></html>`;
const b2 = await chromium.launch();
const p2 = await b2.newPage();
await p2.setContent(html); await p2.waitForTimeout(300);
await p2.pdf({ path: OUT, format: "Letter", printBackground: true });
await b2.close();
console.log(`Saved ${OUT}`, readFileSync(OUT).length);
