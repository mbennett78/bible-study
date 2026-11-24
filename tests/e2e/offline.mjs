// Offline reading: after a chapter opens, the next two are saved quietly, so they still open
// with no signal. The ESV is never saved ahead, and saved copies older than 30 days are dropped.
// Run: node tests/e2e/offline.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
const asked = [];
const verses = (label) => Array.from({ length: 20 }, (_, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>${label} verse ${i + 1}.</p>`).join("");
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => {
    const u = new URL(r.request().url());
    const ch = u.pathname.split("/").pop();
    asked.push(ch);
    r.fulfill({ json: { data: { content: verses(`NASB ${ch}`), copyright: "NASB copyright line" } } });
  });
  await ctx.route(/api\.esv\.org/, (r) => r.fulfill({ json: { passages: ["<p>ESV</p>"] } }));
  await ctx.addInitScript(() => {
    if (!localStorage.getItem("bible-study:v1")) {
      localStorage.setItem("bible-study:v1", JSON.stringify({
        apiBibleKey: "k", nasbBibleId: "nasb95", nasbLabel: "NASB1995", esvKey: "e",
        setup: { done: true }, tourSeen: true, name: "Test", last: { book: "JHN", chapter: 3 },
      }));
      // A copy saved 40 days ago is past the 30-day limit.
      localStorage.setItem("bible-study:recent", JSON.stringify([{ id: "NASB-nasb95:GEN.1", at: Date.now() - 40 * 864e5, html: "<p>old</p>", copyright: "" }]));
    }
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(3800);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:recent")).map((c) => c.id));
  check("John 4 and 5 are saved ahead", saved.includes("NASB-nasb95:JHN.4") && saved.includes("NASB-nasb95:JHN.5"), saved.join(", "));
  check("the copy past 30 days is dropped", !saved.includes("NASB-nasb95:GEN.1"), saved.join(", "));
  // No signal: John 4 still opens.
  await ctx.setOffline(true);
  await page.evaluate(() => document.querySelector("#topNext").click()); await page.waitForTimeout(900);
  const text = await page.textContent("#reader");
  check("with no signal, the next chapter opens", text.includes("JHN.4 verse 1"), text.slice(0, 80));
  await ctx.setOffline(false);
  // The ESV isn't saved ahead.
  await page.selectOption(".version-switch select", "ESV"); await page.waitForTimeout(3800);
  const esv = await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:recent")).filter((c) => c.id.startsWith("ESV:")).map((c) => c.id));
  check("the ESV saves only the chapter being read", esv.length === 1, esv.join(", "));
  check("no page errors", !errors.length, errors.join(" | "));
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
