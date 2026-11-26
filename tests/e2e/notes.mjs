// My Notes: its own page, open even when the journal has a passcode, reached from the side
// menu (iPad) or the ☰ menu (phone). Notes have a heading and date, a writing style, tables,
// and Bible references that open the passage in place.
// Run: node tests/e2e/notes.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
const setup = async (ctx) => {
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => { const ch = new URL(r.request().url()).pathname.split("/").pop(); r.fulfill({ json: { data: { content: Array.from({ length: 30 }, (_, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>Words of ${ch} verse ${i + 1}.</p>`).join(""), copyright: "NASB" } } }); });
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "nasb95", nasbLabel: "NASB1995", setup: { done: true }, tourSeen: true, wordTipSeen: true, name: "Test", journalLock: "hash", last: { book: "JHN", chapter: 3 } })); });
};
try {
  // iPad: Notes and Games are in the side menu.
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 1366 } });
  await setup(ctx);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  check("iPad side menu has Notes", await page.isVisible(".tabbar [data-view=notes]"));
  check("iPad side menu has Games", await page.isVisible(".tabbar [data-open-games]"));
  await page.click(".tabbar [data-view=notes]"); await page.waitForTimeout(500);
  check("Notes page opens", await page.isVisible("#view-notes"));
  check("notes are open even with a journal passcode", await page.isVisible("[data-new-note=note]"));
  await page.click("[data-new-note=note]"); await page.waitForTimeout(400);
  check("a new note has a heading box", await page.isVisible("#notesEditor #eeTitle"));
  check("and is dated", /\d{4}/.test(await page.textContent("#notesEditor .ee-when")));
  await page.fill("#eeTitle", "Wednesday class");
  await page.fill("#entryText", "Read John 3:16 and Rom 8:28 before class.");
  await page.waitForTimeout(800);
  const chips = await page.$$eval("#eeRefs .ref-link", (a) => a.map((b) => b.textContent));
  check("verses typed in the note become buttons", chips.join("|").includes("John 3:16") && chips.join("|").includes("Romans 8:28"), chips.join(", "));
  await page.click("[data-font=hand]");
  check("a writing style can be chosen", (await page.getAttribute("#entryText", "class")).includes("nf-hand"));
  await page.click("[data-tool=table]"); await page.waitForTimeout(200);
  await page.fill('[data-cell="1.0"]', "John 3:16"); await page.fill('[data-cell="1.1"]', "God so loved");
  await page.click("#tDone"); await page.waitForTimeout(200);
  check("a table can be added", await page.isVisible("#eePics .note-table"));
  await page.click("#entrySave"); await page.waitForTimeout(400);
  const card = await page.textContent("#notesList");
  check("the saved note is listed under its date with its heading", card.includes("Wednesday class") && /day,/.test(await page.textContent("#notesList .nl-day")), card.slice(0, 120));
  check("the list links the verses", (await page.$$("#notesList .nc-snip .ref-link")).length === 2);
  await page.click("#notesList .nc-snip .ref-link"); await page.waitForTimeout(800);
  check("tapping a verse shows it without leaving notes", (await page.textContent(".peek-sheet")).includes("JHN.3 verse 16") && await page.isVisible("#view-notes"));
  await page.click(".peek-sheet [data-peek-go]"); await page.waitForTimeout(1000);
  check("Open in the Bible goes there", await page.isVisible("#view-read") && (await page.textContent("#reader")).includes("JHN.3 verse 16"));
  await page.click(".tabbar [data-view=notes]"); await page.waitForTimeout(400);
  await page.fill("#notesSearch", "so loved"); await page.waitForTimeout(200);
  check("search finds words in a table", (await page.textContent("#notesList")).includes("Wednesday class"));
  await page.fill("#notesSearch", "zebra"); await page.waitForTimeout(200);
  check("search with no match says so", (await page.textContent("#notesList")).includes("No notes match"));
  await page.fill("#notesSearch", ""); await page.waitForTimeout(200);
  await page.evaluate(() => { window.print = () => { window.__printed = document.querySelector("#printBook").innerHTML; }; });
  await page.click("#printNotes"); await page.waitForTimeout(200); await page.click(".send-sheet [data-how=print]"); await page.waitForTimeout(300);
  const printed = await page.evaluate(() => window.__printed || "");
  check("notes print with heading, date and table", printed.includes("Wednesday class") && printed.includes("note-table") && printed.includes("General Notes"), printed.slice(0, 100));
  // Or send a copy to Google Docs or Drive: a document file with the notes in it.
  await page.click("#printNotes"); await page.waitForTimeout(200);
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click(".send-sheet [data-how=send]")]);
  const docText = await (await import("node:fs/promises")).readFile(await dl.path(), "utf8");
  check("notes can be sent as a document for Google Docs or Word", dl.suggestedFilename() === "My Notes.html" && docText.includes("Wednesday class") && !docText.includes("<svg"), dl.suggestedFilename());
  // A Bible class outline with a shaded box, then print only that one.
  await page.click("[data-new-note=class]"); await page.waitForTimeout(300);
  check("Bible Class Notes have a lesson title and teacher", await page.isVisible("#notesEditor #eeSpeaker") && (await page.textContent("#notesEditor .ee-head")).includes("Bible Class Notes"));
  await page.fill("#eeTitle", "The Good Shepherd outline");
  await page.click("[data-tool=box]"); await page.waitForTimeout(200);
  await page.click("[data-tone=question]"); await page.fill("#boxText", "Who are the sheep in John 10:16?");
  await page.click("#bDone"); await page.waitForTimeout(200);
  check("a shaded box can be added", await page.isVisible("#eePics .is-box.tone-question"));
  await page.click("#entrySave"); await page.waitForTimeout(400);
  check("the filters use the new names", (await page.textContent("#notesFilter")).includes("Bible Class Notes") && (await page.textContent("#notesFilter")).includes("My Study Path"));
  check("the date range of the notes is shown", /notes · /.test(await page.textContent("#notesRange")));
  await page.click("#chooseNotes"); await page.waitForTimeout(200);
  const firstPick = await page.$eval("[data-pick]", (c) => c.dataset.pick);
  await page.check(`[data-pick="${firstPick}"]`); await page.waitForTimeout(100);
  check("choosing notes changes the print button", /Print the 1 I picked/.test(await page.textContent("#printNotes")));
  await page.evaluate(() => { window.__printed = ""; });
  await page.click("#printNotes"); await page.waitForTimeout(200); await page.click(".send-sheet [data-how=print]"); await page.waitForTimeout(300);
  const one = await page.evaluate(() => window.__printed || "");
  check("only the chosen note prints", one.includes("The Good Shepherd outline") && !one.includes("Wednesday class") && one.includes("is-box"), one.slice(0, 80));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
  // Phone: the bottom bar stays the same; Notes is in the ☰ menu.
  const c2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await setup(c2);
  const p2 = await c2.newPage();
  await p2.goto(site.url); await p2.waitForTimeout(900);
  check("phone bar doesn't crowd in extra buttons", !(await p2.isVisible(".tabbar [data-view=notes]")));
  await p2.click("#menuBtn"); await p2.waitForTimeout(300);
  await p2.click("[data-go-view=notes]"); await p2.waitForTimeout(400);
  check("phone: Notes opens from the menu", await p2.isVisible("#view-notes"));
  await c2.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
