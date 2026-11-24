// Every verse: tapping its number shows cross-references (each opens in place, with a way to
// go there) and the Greek or Hebrew words in that verse.
// Run: node tests/e2e/versetools.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => { const ch = new URL(r.request().url()).pathname.split("/").pop(); r.fulfill({ json: { data: { content: Array.from({ length: 40 }, (_, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>Words of ${ch} verse ${i + 1}.</p>`).join(""), copyright: "NASB" } } }); });
  await ctx.addInitScript(() => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "nasb95", nasbLabel: "NASB1995", setup: { done: true }, tourSeen: true, wordTipSeen: true, name: "Test", last: { book: "JHN", chapter: 3 } })));
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector('#reader [data-number="16"]').click()); await page.waitForTimeout(900);
  const refs = await page.$$eval(".verse-sheet .vs-xbtn", (a) => a.map((b) => b.textContent));
  check("John 3:16 lists cross-references", refs.length >= 4 && refs.includes("Romans 5:8"), refs.join(", "));
  await page.evaluate(() => { document.querySelector(".verse-sheet .vs-xref").open = true; [...document.querySelectorAll(".verse-sheet .vs-xbtn")].find((b) => b.textContent === "Romans 5:8").click(); }); await page.waitForTimeout(900);
  const shown = await page.textContent(".verse-sheet .vs-xtext:not([hidden])");
  check("tapping one shows its words in place", shown.includes("ROM.5 verse 8"), shown);
  const greek = await page.$$eval(".verse-sheet .vs-orig .ws-orig", (a) => a.map((d) => d.dataset.n));
  check("the Greek words of the verse are listed", greek.includes("G2316") && greek.includes("G4100"), greek.join(","));
  await page.evaluate(() => document.querySelector(".verse-sheet .vs-xtext:not([hidden]) [data-go]").click()); await page.waitForTimeout(1200);
  check("Go there opens Romans 5", (await page.textContent("#reader")).includes("ROM.5 verse 8"));
  await page.evaluate(() => document.querySelector('#reader [data-number="1"]').click()); await page.waitForTimeout(900);
  const heb = await page.evaluate(async () => { const r = await fetch("data/xref/GEN.1.json"); return r.ok; });
  check("an Old Testament chapter has its cross-references file", heb);
  check("no page errors", !errors.length, errors.join(" | "));
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
