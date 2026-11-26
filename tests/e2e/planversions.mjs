// Every version list matches: the switch on the Read page and Settings, under You, both show
// the main version plus every well-known version on the plan that really opens. A version the
// plan lists but won't open (403) never shows. A used-up plan (429) shows a plain message.
// Run: node tests/e2e/planversions.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
const plan = [
  { id: "nasb20", abbreviationLocal: "NASB2020", nameLocal: "New American Standard Bible 2020" },
  { id: "niv", abbreviationLocal: "NIV", nameLocal: "New International Version" },
  { id: "kjv", abbreviationLocal: "KJV", nameLocal: "King James Version" },
  { id: "nlt", abbreviationLocal: "NLT", nameLocal: "New Living Translation" },
  { id: "xyz", abbreviationLocal: "XYZ", nameLocal: "Some Other Bible" },
];
let limit = false;
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => {
    const u = new URL(r.request().url());
    if (u.pathname.endsWith("/bibles")) return r.fulfill({ json: { data: plan } });
    const id = u.pathname.split("/")[3];
    if (id === "nlt") return r.fulfill({ status: 403, json: { message: "Forbidden" } });
    if (limit && id === "kjv") return r.fulfill({ status: 429, json: { message: "Too many requests" } });
    if (u.pathname.includes("/verses/")) return r.fulfill({ json: { data: { content: "For God so loved the world" } } });
    r.fulfill({ json: { data: { content: `<p><span data-number="1" class="v">1</span>${id} words.</p>`, copyright: `${id} copyright` } } });
  });
  await ctx.addInitScript(() => {
    if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({
      apiBibleKey: "k", nasbBibleId: "nasb20", nasbLabel: "NASB 2020", setup: { done: true }, tourSeen: true, newsOff: true, name: "Test", last: { book: "JHN", chapter: 3 },
    }));
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click());
  await page.waitForFunction(() => document.querySelectorAll(".version-switch select option").length > 1, null, { timeout: 9000 }).catch(() => {});
  const top = await page.$$eval(".version-switch select option", (a) => a.map((o) => o.textContent));
  check("the Read page switch lists NASB, NIV and KJV", JSON.stringify(top) === JSON.stringify(["NASB 2020", "NIV", "KJV"]), JSON.stringify(top));
  check("a version the plan lists but won't open is left out", !top.includes("NLT"));
  const mine = await page.$$eval("#myVersion option", (a) => a.map((o) => o.textContent));
  check("Settings, under You, lists exactly the same versions", JSON.stringify(mine) === JSON.stringify(top), JSON.stringify(mine));
  await page.selectOption(".version-switch select", { label: "NIV" }); await page.waitForTimeout(700);
  check("the NIV opens", (await page.textContent("#reader")).includes("niv words"));
  limit = true;
  await page.evaluate(() => localStorage.removeItem("bible-study:recent"));
  await page.selectOption(".version-switch select", { label: "KJV" }); await page.waitForTimeout(700);
  check("a used-up plan says so plainly", /reads are used up/.test(await page.textContent("#reader")), (await page.textContent("#reader")).slice(0, 120));
  check("no page errors", errors.length === 0, errors.join(" | "));
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
