// Buddy waves hello when someone comes back after a few minutes away (not after a minute).
import { chromium, serve, check, finish } from "/home/user/bible-study/tests/e2e/harness.mjs";
const site = await serve(); const browser = await chromium.launch();
for (const mins of [5, 1]) {
  const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>T</p>" } } }));
  await ctx.addInitScript((m) => { localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", newsOff: true })); localStorage.setItem("bible-study:buddy-seen", String(Date.now() - m * 60000)); }, mins);
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(site.url);
  let waved = false; for (let i = 0; i < 40; i++) { await page.waitForTimeout(100); if (await page.$eval(".buddy", (b) => b.classList.contains("waving")).catch(() => false)) { waved = true; break; } }
  check(mins > 2 ? "Buddy waves when someone comes back after a few minutes" : "no wave after a minute away", waved === (mins > 2)); check("no page errors", !errs.length, errs.join("; "));
  await ctx.close();
}
await browser.close(); site.close(); finish(null);
