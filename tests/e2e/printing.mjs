// Notes and journal entries reach the printer. On iPhone and iPad the print window can open after
// "afterprint" has fired, so the pages must still be there then; and in print, only the pages
// show (never the app screen), for a note, a journal entry, and "Print all my notes".
// Run: node tests/e2e/printing.mjs
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
      a: { kind: "note", title: "Abram's call", text: "God called **Abram** to go.", created: "2026-11-20T10:00:00Z" },
      d: { kind: "day", opener: "My Day", text: "We baked bread together.", prayer: "For Grandma.", created: "2026-11-24T10:00:00Z" },
    };
    localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, wordTipSeen: true, name: "Mel", last: { book: "GEN", chapter: 12 }, entries }));
  });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  // Like iPhone: print() returns at once and "afterprint" fires before the print window draws.
  await page.evaluate(() => { window.print = () => { window.__prints = (window.__prints || 0) + 1; window.dispatchEvent(new Event("afterprint")); }; });
  const inPrint = async (label, words) => {
    await page.waitForTimeout(800);
    const ready = await page.evaluate(() => ({ cls: document.body.classList.contains("printing"), hidden: document.querySelector("#printBook").hidden, text: document.querySelector("#printBook").textContent }));
    check(`${label}: the pages are still ready after the print window opens`, ready.cls && !ready.hidden && words.every((w) => ready.text.includes(w)), JSON.stringify(ready).slice(0, 160));
    await page.emulateMedia({ media: "print" });
    const shown = await page.evaluate(() => ({ book: getComputedStyle(document.querySelector("#printBook")).display, app: [...document.body.children].filter((c) => c.id !== "printBook" && getComputedStyle(c).display !== "none").map((c) => c.id || c.className) }));
    check(`${label}: on paper only the pages show`, shown.book !== "none" && shown.app.length === 0, JSON.stringify(shown));
    await page.emulateMedia({ media: "screen" });
    check(`${label}: the app screen stays as it was`, await page.evaluate(() => getComputedStyle(document.querySelector("#printBook")).display === "none"));
    await page.mouse.click(5, 400); await page.waitForTimeout(200);
    check(`${label}: back in the app, everything is tidied away`, await page.evaluate(() => !document.body.classList.contains("printing") && document.querySelector("#printBook").hidden));
  };

  // A note.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=notes]").click()); await page.waitForTimeout(400);
  await page.click('#notesList [data-note="a"]'); await page.waitForTimeout(400);
  await page.click("#entryPrint"); await page.waitForTimeout(200); await page.click(".send-sheet [data-how=print]");
  await inPrint("a note", ["Abram's call", "Abram"]);
  // All my notes, with the journal.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=notes]").click()); await page.waitForTimeout(300);
  await page.check("#printWithJournal"); await page.click("#printNotes"); await page.waitForTimeout(200); await page.click(".send-sheet [data-how=print]");
  await inPrint("all my notes and journal", ["Abram's call", "We baked bread together", "For Grandma"]);
  // A journal entry.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=journal]").click()); await page.waitForTimeout(400);
  const opened = await page.evaluate(() => { const b = document.querySelector('[data-entry="d"]'); if (b) b.click(); return Boolean(b); });
  await page.waitForTimeout(400);
  if (opened && await page.isVisible("#entryPrint")) {
    await page.click("#entryPrint"); await page.waitForTimeout(200); await page.click(".send-sheet [data-how=print]");
    await inPrint("a journal entry", ["We baked bread together"]);
  } else check("a journal entry can be opened and printed", false, "could not find the entry or its Print button");
  check("no page errors", errors.length === 0, errors.join(" | "));
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
