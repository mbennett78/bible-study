// Visual play-test (not part of the suite): screenshots of Bible Spin and the Quick check at each
// step, on a small phone and an iPad, so glitches can be seen. OUT=dir LOOK=animated node tests/e2e/_playshots.mjs
import { chromium, serve } from "./harness.mjs";
const out = process.env.OUT || ".", look = process.env.LOOK || "classic";
const sizes = { phone: { width: 375, height: 667 }, ipad: { width: 820, height: 1180 } };
const site = await serve();
const browser = await chromium.launch();
for (const [dev, vp] of Object.entries(sizes)) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v" data-number="1">1</span>In the beginning was the Word.</p>' } } }));
  await ctx.addInitScript((look) => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", style: look, whatsNewSeen: "9999", last: { book: "JHN", chapter: 1 }, read: { "JHN.1": 1, "GEN.1": 1, "JHN.3": 1 }, quest: { coins: 500, sound: false } })); }, look);
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("dialog", (d) => d.accept());
  await page.goto(site.url); await page.waitForTimeout(1000);
  let n = 0; const shot = async (name) => { await page.screenshot({ path: `${out}/${look}-${dev}-${String(++n).padStart(2, "0")}-${name}.jpg`, type: "jpeg", quality: 60 }); };
  const has = (sel) => page.$(`dialog.quest ${sel}`).then(Boolean);
  const tap = (sel) => page.$eval(`dialog.quest ${sel}`, (b) => b.click());
  await page.click("#homeGames"); await page.waitForTimeout(500); await shot("menu");
  await tap('[data-mode="solo"]'); await page.waitForTimeout(600); await shot("solo-start");
  for (let step = 0; step < 14; step++) {
    if (await has(".q-end")) { await shot("end"); break; }
    if (await has("[data-ready]")) { await tap("[data-ready]"); await page.waitForTimeout(500); await shot("ready"); continue; }
    if (await has("[data-spin]")) { await tap("[data-spin]"); await page.waitForTimeout(1200); await shot("spinning"); await page.waitForTimeout(2600); await shot("landed"); continue; }
    if (await page.$("dialog.quest [data-pickjewel]:not([disabled])")) { await tap("[data-pickjewel]:not([disabled])"); await page.waitForTimeout(700); await shot("jewel"); continue; }
    const choice = await page.$("dialog.quest .q-choice:not([disabled])");
    if (choice) { await shot("question"); await choice.click(); await page.waitForTimeout(500); await shot("answered"); await page.waitForTimeout(1400); continue; }
    if (await has("[data-next]")) { await tap("[data-next]"); await page.waitForTimeout(500); continue; }
    await page.waitForTimeout(1500);
  }
  await page.keyboard.press("Escape"); await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector("#triviaBtn")?.click()); await page.waitForTimeout(600); await shot("quick-q");
  const b = await page.$("#triviaBody [data-k]"); if (b) { await b.click(); await page.waitForTimeout(400); await shot("quick-answered"); }
  for (let i = 0; i < 6; i++) { const nx = await page.$("#triviaBody .trivia-next"); if (!nx) break; const t = await nx.textContent(); await nx.click(); await page.waitForTimeout(300); if (/score/.test(t)) { await page.waitForTimeout(500); await shot("quick-score"); break; } const c = await page.$("#triviaBody [data-k]"); if (c) { await c.click(); await page.waitForTimeout(300); } }
  console.log(dev, "errors:", errors.length ? errors.join(" | ") : "none");
  await ctx.close();
}
await browser.close(); site.close();
