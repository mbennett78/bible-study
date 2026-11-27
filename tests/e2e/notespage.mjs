// My Notes as one page, like the printed notes: every note in full with its formatting; tap one
// for Change, Delete and Print; Change opens it right there; ＋ writes a new one at the top under
// "Today" while the rest fade back.
// Run: node tests/e2e/notespage.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span class='v' data-number='1'>1</span>Words.</p>" } } }));
  await ctx.addInitScript(() => {
    if (localStorage.getItem("bible-study:v1")) return;
    const entries = {
      a: { kind: "note", title: "On Romans", text: "Read **Romans 8:28** again.\n\nAll things ==g:work together==.", created: "2026-11-20T10:00:00Z" },
      b: { kind: "church", title: "Abram's faith", speaker: "Pastor Dan", text: "Genesis 12:4 he went.", created: "2026-11-22T10:00:00Z" },
      c: { kind: "note", title: "Delete me", text: "Old note.", created: "2026-11-23T10:00:00Z" },
    };
    localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, wordTipSeen: true, name: "Mel", last: { book: "GEN", chapter: 12 }, entries }));
  });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=notes]").click()); await page.waitForTimeout(400);
  const a = '#notesList [data-entry-id="a"]';
  check("every note shows in full on the page, with its formatting", await page.$eval(`${a} .nc-snip`, (s) => s.querySelectorAll("p").length === 2 && Boolean(s.querySelector("b")) && Boolean(s.querySelector(".nh-g, mark")) && !/\*\*|==/.test(s.textContent)));
  check("no Change or Delete until a note is tapped", !(await page.isVisible(`${a} .np-acts`)));
  await page.click(`${a} .nc-snip p:last-child`); await page.waitForTimeout(150);
  check("tapping a note lights it up with Change, Delete and Print", await page.isVisible(`${a} [data-change]`) && await page.isVisible(`${a} [data-del]`) && await page.isVisible(`${a} [data-print1]`) && await page.$eval(a, (x) => x.classList.contains("tapped")));
  await page.click('#notesList [data-note="b"]'); await page.waitForTimeout(150);
  check("tapping another moves the buttons to it", !(await page.isVisible(`${a} .np-acts`)) && await page.isVisible('#notesList [data-entry-id="b"] .np-acts'));
  // Change: opens right there, in its place.
  await page.click('#notesList [data-change="b"]'); await page.waitForTimeout(400);
  const placed = await page.evaluate(() => { const h = document.querySelector("#notesEditHere"); return Boolean(h && h.previousElementSibling?.dataset.entryId === "b" && h.querySelector("#entryText")); });
  check("✏️ Change opens the note right where it is on the page", placed);
  check("and the other notes fade back", await page.$eval("#notesPage", (p) => p.classList.contains("writing")));
  await page.fill("#eeTitle", "Abram went"); await page.click("#entrySave"); await page.waitForTimeout(500);
  check("Save puts it back on the page, changed, with Saved ✓", (await page.textContent('#notesList [data-entry-id="b"]')).includes("Abram went") && (await page.textContent('#notesList [data-entry-id="b"]')).includes("Saved ✓") && !(await page.$("#notesEditHere")));
  check("and the page is clear again", !(await page.$eval("#notesPage", (p) => p.classList.contains("writing"))));
  // Delete: two taps, right on the page.
  await page.click('#notesList [data-note="c"]'); await page.click('#notesList [data-del="c"]');
  check("Delete asks for a second tap", (await page.textContent('#notesList [data-del="c"]')).includes("Tap again"));
  await page.click('#notesList [data-del="c"]'); await page.waitForTimeout(300);
  check("and then the note is gone", !(await page.$('#notesList [data-entry-id="c"]')) && (await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).entries?.c?.deleted === true)));
  // ＋ Add a note: written right on the page, under Today.
  check("＋ Add a note is at the top of the page", await page.isVisible("#notesPage .np-plus") && await page.isVisible("#notesPage [data-new-note=note]"));
  await page.click("#notesPage [data-new-note=note]"); await page.waitForTimeout(400);
  const today = await page.evaluate(() => getComputedStyle(document.querySelector("#notesEditor"), "::before").content);
  check("a new note opens on the page under Today", /Today/.test(today) && await page.isVisible("#notesEditor #entryRich"), today);
  check("with the rest of the page faded back", await page.$eval("#notesPage", (p) => p.classList.contains("writing")) && Number(await page.$eval("#notesList", (l) => getComputedStyle(l).opacity)) < .6);
  await page.fill("#eeTitle", "Thankful"); await page.fill("#entryRich", "So glad we read Genesis 12 together.");
  await page.click("#entrySave"); await page.waitForTimeout(500);
  check("saved, it's part of the page", (await page.textContent("#notesList")).includes("Thankful") && (await page.textContent("#notesList .nl-day")).length > 0);
  // Print just one.
  await page.evaluate(() => { window.print = () => { window.__printed = document.querySelector("#printBook").innerHTML; }; });
  await page.click(`#notesList [data-note="a"]`); await page.click('#notesList [data-print1="a"]'); await page.waitForTimeout(200);
  await page.click(".send-sheet [data-how=print]"); await page.waitForTimeout(300);
  const printed = await page.evaluate(() => window.__printed || "");
  check("🖨 Print prints just that note", printed.includes("On Romans") && !printed.includes("Abram went"), printed.slice(0, 120));
  check("no page errors", errors.length === 0, errors.join(" | "));
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
