// Home screenshot in a given look (not part of the test run). Run: W=768 node tests/e2e/_homeshot.mjs <style> <out.png>
import { chromium, serve } from "./harness.mjs";
const [style, out] = process.argv.slice(2);
const site = await serve();
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: +(process.env.W || 768), height: 1024 }, deviceScaleFactor: 1 });
await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
await ctx.addInitScript((style) => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, style, graphics: "full" })), style);
const page = await ctx.newPage();
const errs = []; page.on("pageerror", (e) => errs.push(e.message));
await page.goto(site.url); await page.waitForTimeout(1500);
await page.screenshot({ path: out });
console.log(errs.join(" | ") || "no errors");
await browser.close(); site.close();
