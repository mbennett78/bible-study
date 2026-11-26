// On this day: the Journal shows what you wrote on today's date in earlier years.
// Run: node tests/e2e/onthisday.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, name: "Mel", show: { buddy: false },
    entries: { a1: { kind: "day", text: "Our first Christmas with the Bible app!", created: "2026-12-25T15:00:00", updated: "2026-12-25T15:00:00" }, a2: { kind: "day", text: "A regular day.", created: "2027-03-02T15:00:00", updated: "2027-03-02T15:00:00" } } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.clock.install({ time: new Date("2027-12-25T10:00:00") });
  await page.goto(site.url); await page.clock.runFor(1200);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=journal]")?.click() || document.querySelector("[data-view=journal]")?.click()); await page.clock.runFor(600);
  const box = await page.$eval(".on-this-day", (b) => b.textContent.replace(/\s+/g, " ")).catch(() => "");
  check("the Journal shows On this day from a year ago", /On this day/.test(box) && /1 year ago/.test(box) && /first Christmas/.test(box), box.slice(0, 200));
  check("other days aren't in it", !/regular day/.test(box));
  // Need an idea? A writing prompt, one at a time, that never types anything in.
  await page.evaluate(() => document.querySelector('#diaryToday [data-add="day"]').click()); await page.clock.runFor(300);
  await page.click("#eeIdea");
  const p1 = await page.textContent("#eePrompt");
  check("Need an idea? shows a writing prompt", p1.length > 20 && await page.isVisible("#eePrompt") && (await page.inputValue("#entryText")) === "", p1);
  await page.click("#eeIdea");
  check("tapping again gives another", (await page.textContent("#eePrompt")) !== p1);
  // Journaling guides: SOAP adds its headings for them to write under.
  await page.click("#eeGuide");
  check("Use a guide offers SOAP, ACTS and more", /SOAP/.test(await page.textContent("#eeGuides")) && /ACTS/.test(await page.textContent("#eeGuides")));
  await page.click('[data-guide="soap"]');
  const soap = await page.inputValue("#entryText");
  check("SOAP adds Scripture, Observation, Application and Prayer headings", /^Scripture: /.test(soap) && /Observation/.test(soap) && /Application/.test(soap) && /Prayer: /.test(soap) && !(await page.isVisible("#eeGuides")), soap);
  // Search the journal: the matching entry stays, others go.
  await page.evaluate(() => document.querySelector("#entryCancel")?.click()); await page.clock.runFor(300);
  await page.fill("#journalSearch", "christmas"); await page.clock.runFor(200);
  const list = (await page.textContent("#journalList")).replace(/\s+/g, " ");
  check("searching the journal finds the matching entry only", /first Christmas/.test(list) && !/regular day/.test(list), list.slice(0, 200));
  await page.fill("#journalSearch", "zebra"); await page.clock.runFor(200);
  check("no match says so", /Nothing matches that search/.test(await page.textContent("#journalList")));
  check("no page errors", !errors.length, errors.join("; "));
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
