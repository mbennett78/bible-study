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
  await page.fill("#entryText", "For Grandma's surgery on Friday.");
  await page.click("#entrySave"); await page.waitForTimeout(300);
  check("Save says it's saved", /Saved ✓/.test(await page.textContent("#entryEditor")));
  check("the entry is listed to read again", /Grandma's surgery/.test(await page.textContent("#journalList")) && /Prayer/.test(await page.textContent("#journalList")));
  // Typing is kept even without tapping Save.
  await page.click('#diaryToday [data-add="day"]'); await page.waitForTimeout(200);
  await page.fill("#entryText", "We decorated the tree."); await page.waitForTimeout(1200);
  check("words are kept as they type", await page.evaluate(() => JSON.stringify(JSON.parse(localStorage.getItem("bible-study:v1")).entries).includes("decorated the tree")));
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
  // The chapter journal has the same buttons, with the chapter attached.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(500);
  await page.evaluate(() => { document.querySelector("#journalBox").open = true; document.querySelector('#journalBox [data-add="bible"]').click(); });
  await page.waitForTimeout(200);
  check("chapter journal: Bible thoughts on John 3", /John 3/.test(await page.textContent("#chapterEntryHost")));
  await page.fill("#entryText", "Born from above."); await page.click("#entrySave"); await page.waitForTimeout(300);
  check("chapter journal: listed under the chapter", /Born from above/.test(await page.textContent("#journalInner")));

  // Lock it, then unlock with the number pad.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(200);
  await page.fill("#lockCode", "2580"); await page.click("#lockSet"); await page.waitForTimeout(400);
  check("passcode: shows it's saved, as dots", /Saved ✓/.test(await page.textContent("#lockStatus")) && await page.$eval("#lockCode", (i) => i.type === "password" && i.value.length === 4));
  await page.click("#lockShow");
  check("passcode: Show reveals it", await page.$eval("#lockCode", (i) => i.type === "text" && i.value === "2580"));
  await openJournal();
  check("locked: a big number pad appears", (await page.$$("#journalList .keypad button")).length === 12 && !(await page.$("#journalList input")));
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
