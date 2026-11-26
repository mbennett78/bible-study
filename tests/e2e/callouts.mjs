// Verse cards in notes and the journal: pasted Scripture becomes a card, and the comment on it
// can sit in an optional callout box (fun or classy) that also prints.
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
const shots = process.env.SHOTS || "";
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const tall = async () => page.setViewportSize({ width: 390, height: 1500 });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span data-number=\"1\" class=\"v\">1</span>Words.</p>", copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", show: { buddy: false }, last: { book: "JHN", chapter: 3 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=books]").click()); await page.waitForTimeout(200);
  await page.evaluate(() => document.querySelector('[data-seg="journal"]').click()); await page.waitForTimeout(300);
  await page.click('#diaryToday [data-add="day"]'); await page.waitForTimeout(200);

  const verse = "“For God so loved the world, that He gave His only Son, that whoever believes in Him shall not perish, but have eternal life.” John 3:16 (NASB)";
  await page.evaluate((text) => {
    const ta = document.querySelector("#entryRich"); ta.focus();
    const dt = new DataTransfer(); dt.setData("text/plain", text);
    ta.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
  }, verse);
  await page.waitForTimeout(200);
  check("pasted Scripture is recognized", /John 3:16/.test(await page.textContent("#eeVerseOffer")));
  await page.click('#eeVerseOffer [data-vo="yes"]'); await page.waitForTimeout(200);
  const card = await page.$eval("#eeQuotes .ee-quote", (q) => ({ words: q.querySelector("blockquote").textContent, cite: q.querySelector("cite").textContent }));
  check("the verse card keeps the exact words", card.words === "“For God so loved the world, that He gave His only Son, that whoever believes in Him shall not perish, but have eternal life.”", card.words);
  check("the card shows the reference and version", card.cite === "John 3:16 (NASB)", card.cite);
  check("the pasted words leave the writing box", !(await page.inputValue("#entryText")).includes("God so loved"));
  check("a callout box is optional: Plain is chosen at first", await page.$eval('[data-colook="plain"]', (b) => b.getAttribute("aria-pressed") === "true"));
  check("six box styles, fun and classy", (await page.$$("#eeQuotes [data-colook]")).length === 6);
  await page.fill("#eeQuotes .q-note", "God's love is for everyone in my family.");
  await page.click('[data-colook="sticky"]'); await page.waitForTimeout(150);
  check("choosing a style shows the box right away", await page.$eval("#eeQuotes .q-callout", (c) => c.classList.contains("co-sticky")) && /Comment/i.test(await page.textContent("#eeQuotes .co-tag")));
  check("the comment is kept when the style changes", (await page.inputValue("#eeQuotes .q-note")) === "God's love is for everyone in my family.");
  if (shots) await page.$eval("#eeQuotes", (e) => e.scrollIntoView({ block: "center" })), await page.screenshot({ path: `${shots}/callout-editor.png` });
  await page.click("#entrySave"); await page.waitForTimeout(400);
  const saved = await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem("bible-study:v1")).entries).flat().find((e) => e?.quotes?.length));
  check("the verse, comment and style are saved", saved?.quotes[0].look === "sticky" && saved.quotes[0].ref === "JHN.3.16" && saved.quotes[0].note.startsWith("God's love"));
  // Each style draws as a finished box (as in the list and on paper).
  const looks = ["classic", "parchment", "sticky", "bubble", "floral"];
  await page.evaluate((looks) => {
    const host = document.createElement("div"); host.id = "coGallery"; host.className = "print-book"; host.style.cssText = "display:block;padding:16px;background:#fff;position:absolute;top:0;left:0;right:0;z-index:99999";
    host.innerHTML = looks.map((l) => `<div class="ee-quote"><blockquote>“The LORD is my shepherd, I shall not want.”</blockquote><cite>Psalm 23:1 (NASB)</cite><div class="q-callout co-${l}"><span class="co-tag">💬 Comment</span><p>A ${l} callout box.</p></div></div>`).join("");
    document.body.prepend(host);
  }, looks);
  check("every style draws its box", await page.$$eval("#coGallery .q-callout", (cs) => cs.every((c) => (getComputedStyle(c).backgroundColor !== "rgba(0, 0, 0, 0)" || getComputedStyle(c).backgroundImage !== "none"))));
  if (shots) await tall(), await page.evaluate(() => scrollTo(0, 0)), await page.screenshot({ path: `${shots}/callout-styles.png` });
  await page.evaluate(() => document.querySelector("#coGallery").remove());
  // Pasting ordinary words never offers a card.
  await page.click('#diaryToday [data-add="day"]'); await page.waitForTimeout(200);
  await page.evaluate(() => {
    const ta = document.querySelector("#entryRich"); ta.focus();
    const dt = new DataTransfer(); dt.setData("text/plain", "We talked about this at dinner tonight.");
    ta.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
  });
  await page.waitForTimeout(150);
  check("ordinary pasted words are left alone", !(await page.$("#eeVerseOffer")));
  check("no page errors", !errors.length, errors.join("; "));
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
