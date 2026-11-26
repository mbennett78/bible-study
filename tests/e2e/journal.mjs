// The journal ("My Journey"): add an entry with a big Save button, read it back in the list,
// unlock with the on-screen number pad, and print the keepsake book.
// Run: node tests/e2e/journal.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: Array.from({ length: 40 }, (_, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>Verse words ${i + 1}.</p>`).join(""), copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", show: { buddy: false }, last: { book: "JHN", chapter: 3 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  const openJournal = async () => {
    await page.evaluate(() => document.querySelector(".tabbar [data-view=books]").click()); await page.waitForTimeout(200);
    await page.evaluate(() => document.querySelector('[data-seg="journal"]').click()); await page.waitForTimeout(300);
  };
  await openJournal();
  check("the journal is called My Journey", /My Journey/.test(await page.textContent("#diaryToday")) && /A journal by Mel/.test(await page.textContent("#diaryToday")));
  check("big Add buttons for a journal entry, prayer, thanks, Bible thoughts and Church notes", (await page.$$("#diaryToday .add-entry")).length === 5);
  await page.click('#diaryToday [data-add="prayer"]'); await page.waitForTimeout(300);
  check("a new entry shows today's date and time", /🕒/.test(await page.textContent(".entry-editor")) && /\d:\d\d/.test(await page.textContent(".ee-when")));
  await page.fill("#entryRich", "For Grandma's surgery on Friday.");
  await page.click("#entrySave"); await page.waitForTimeout(300);
  check("Save says it's saved", /Saved ✓/.test(await page.textContent("#entryEditor")));
  check("the entry is listed to read again", /Grandma's surgery/.test(await page.textContent("#journalList")) && /Prayer/.test(await page.textContent("#journalList")));
  // Typing is kept even without tapping Save.
  await page.click('#diaryToday [data-add="day"]'); await page.waitForTimeout(200);
  await page.fill("#entryRich", "We decorated the tree."); await page.waitForTimeout(1200);
  check("words are kept as they type", await page.evaluate(() => JSON.stringify(JSON.parse(localStorage.getItem("bible-study:v1")).entries).includes("decorated the tree")));
  // Pasting a picture (from Photos, a website or another app) adds it; pasted words go in the box.
  const pasteImage = (type) => page.evaluate(async (type) => {
    const c = Object.assign(document.createElement("canvas"), { width: 40, height: 30 });
    c.getContext("2d").fillRect(0, 0, 40, 30);
    const blob = await new Promise((r) => c.toBlob(r, "image/png"));
    const dt = new DataTransfer(); dt.items.add(new File([blob], "image.png", { type: "image/png" }));
    const ta = document.querySelector("#entryRich"); ta.focus();
    const ev = type === "paste" ? new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }) : new DragEvent("drop", { dataTransfer: dt, bubbles: true, cancelable: true });
    ta.dispatchEvent(ev);
  }, type);
  await pasteImage("paste"); await page.waitForTimeout(600);
  check("a pasted picture is added to the entry", (await page.$$("#entryRich .is-photo img")).length === 1 && await page.$eval("#entryRich .is-photo img", (i) => i.alt === "Pasted picture" && i.src.startsWith("data:image/jpeg")));
  await pasteImage("drop"); await page.waitForTimeout(600);
  check("a picture dragged onto the entry is added too", (await page.$$("#entryRich .is-photo img")).length === 2);
  await page.focus("#entryRich"); await page.keyboard.press("Control+End"); await page.keyboard.insertText(" Pasted from a website.");
  check("pasted words go into the box", (await page.inputValue("#entryText")).endsWith("Pasted from a website."));
  // They choose how it starts and which day it's for; prayer and thanks are optional.
  check("a journal entry has no prayer or thanks box until they ask", await page.$eval("#eePrayerBox", (b) => b.hidden) && await page.$eval("#eeGratBox", (b) => b.hidden));
  await page.click('[data-opener="This Week"]');
  check("they choose the opening words", (await page.textContent("#eeKindLabel")) === "This Week" && /This Week…/.test(await page.textContent("#eeTextLabel")));
  await page.click('[data-extra="eeGratBox"]');
  await page.fill("#eeGrat", "Family at the table.");
  const yday = await page.evaluate(() => { const d = new Date(Date.now() - 2 * 864e5); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; });
  await page.fill("#eeDate", yday); await page.dispatchEvent("#eeDate", "change");
  await page.click("#entrySave"); await page.waitForTimeout(300);
  const saved = await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem("bible-study:v1")).entries).find((e) => /decorated/.test(e.text || "")));
  check("the entry keeps its opening words, thanks and chosen date", saved.opener === "This Week" && saved.gratitude === "Family at the table." && !saved.prayer && new Date(saved.created).getDate() === Number(yday.slice(8)));
  check("the list shows the opening words and the thanks", /This Week/.test(await page.textContent("#journalList")) && /Thankful for: Family at the table/.test(await page.textContent("#journalList")));
  // Tapping an entry opens it; it can be changed and saved.
  await page.click('#journalList [data-entry]:has-text("Grandma")'); await page.waitForTimeout(300);
  await page.check("#entryAnswered"); await page.click("#entrySave"); await page.waitForTimeout(300);
  check("a prayer can be marked answered", /answered ✓/.test(await page.textContent("#journalList")));
  // Notes on a chapter: never locked, separate from the journal.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(500);
  await page.evaluate(() => { document.querySelector("#journalBox").open = true; document.querySelector('#journalBox [data-add="note"]').click(); });
  await page.waitForTimeout(200);
  check("chapter notes: a note on John 3", /John 3/.test(await page.textContent("#chapterEntryHost")));
  await page.fill("#entryRich", "Born from above."); await page.click("#entrySave"); await page.waitForTimeout(300);
  check("chapter notes: listed under the chapter", /Born from above/.test(await page.textContent("#journalInner")));

  // Lock it, then unlock with the number pad.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(200);
  await page.evaluate((s) => { document.querySelector(s).closest("details.set-group").open = true; }, "#lockCode"); await page.waitForTimeout(100);
    await page.fill("#lockCode", "2580"); await page.click("#lockSet"); await page.waitForTimeout(400);
  check("passcode: shows it's saved, as dots", /Saved ✓/.test(await page.textContent("#lockStatus")) && await page.$eval("#lockCode", (i) => i.type === "password" && i.value.length === 4));
  await page.click("#lockShow");
  check("passcode: Show reveals it", await page.$eval("#lockCode", (i) => i.type === "text" && i.value === "2580"));
  await openJournal();
  check("locked: a big number pad appears", (await page.$$("#journalList .keypad button")).length === 12 && !(await page.$("#journalList input")));
  // The bug Melissa found: notes on a chapter must never show the journal's lock.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(500);
  await page.evaluate(() => { document.querySelector("#journalBox").open = true; });
  check("locked journal: chapter notes stay open, with no number pad", !(await page.$("#journalInner .keypad")) && /Born from above/.test(await page.textContent("#journalInner")) && /My notes on this chapter/.test(await page.textContent("#journalBox summary")));
  check("chapter notes point to the Journal for personal reflections", Boolean(await page.$("#journalInner [data-to-journal]")));
  await openJournal();
  for (const d of "1111") await page.click(`#journalList [data-kp="${d}"]`);
  await page.click('#journalList [data-kp="✓"]'); await page.waitForTimeout(200);
  check("locked: a wrong code is explained", /doesn't match/.test(await page.textContent("#journalList")));
  for (const d of "2580") await page.click(`#journalList [data-kp="${d}"]`);
  await page.waitForTimeout(300);
  check("locked: the right code opens it right away", /Grandma/.test(await page.textContent("#journalList")) && /My Journey/.test(await page.textContent("#diaryToday")));

  // The keepsake book.
  await page.evaluate(() => { window.print = () => { window.__printed = true; }; });
  await page.click("#makeBook"); await page.waitForTimeout(300);
  check("print offers paper or sending to Docs or Drive", await page.isVisible(".send-sheet [data-how=send]"));
  await page.click(".send-sheet [data-how=print]"); await page.waitForTimeout(600);
  const book = await page.textContent("#printBook");
  check("book: titled My Journey, a journal by Mel", /My Journey/.test(book) && /a journal by Mel/.test(book));
  check("book: entries by day, with the verse of the day", /Grandma's surgery/.test(book) && /The verse for/.test(book) && await page.evaluate(() => window.__printed === true));
  check("book: has the picture header", Boolean(await page.$("#printBook .pb-art svg")));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
