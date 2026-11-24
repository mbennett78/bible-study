// Builds the Christmas gift packet: a printable setup page and an illustrated user guide.
// The words come from js/guide.js (the same guide that's in Settings), so paper and screen
// always agree. The pictures are fresh screenshots of the app.
// Run: node tools/gift/make-packet.mjs [out.pdf]
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium, serve } from "../../tests/e2e/harness.mjs";
import { GUIDE } from "../../js/guide.js";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const OUT = process.argv[2] || `${HERE}gift-packet.pdf`;
const SHOTS = `${HERE}shots`;
mkdirSync(SHOTS, { recursive: true });

const iso = (d, h) => `2026-12-${String(d).padStart(2, "0")}T${String(h).padStart(2, "0")}:00:00`;
const SEED = {
  apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, name: "Grandma",
  last: { book: "JHN", chapter: 3 },
  entries: {
    a: { kind: "church", title: "Joy to the world", speaker: "Christmas Sunday", passage: "Luke 2:8-20", text: "The shepherds went with haste. Do I hurry to Jesus like that?", created: iso(6, 11), updated: iso(6, 11) },
    b: { kind: "prayer", text: "Thank You for my family, every one of them.", created: iso(7, 8), updated: iso(7, 8) },
  },
};
const PASSAGE = '<p><span class="v" data-number="16">16</span>For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life. <span class="v" data-number="17">17</span>For God did not send the Son into the world to judge the world, but that the world might be saved through Him.</p>';

// Which screen illustrates each guide section.
const SHOW = {
  start: { view: "home", cap: "Home: pick up where you left off." },
  around: { view: "read", click: "#refButton", cap: "Tap the book name to go anywhere." },
  read: { view: "read", cap: "Read aloud, word meanings and study notes." },
  buddy: { view: "home", chat: true, cap: "Ask your buddy anything." },
  journal: { view: "journal", scroll: ".seg-journal, #diaryToday, #journalList", cap: "Your journal: days, prayers and thanks." },
  study: { view: "path", cap: "Four ways through the Bible." },
  offline: { view: "notes", cap: "Notes save even with no signal." },
  devices: { view: "settings", cap: "Settings: bigger words, buttons and more." },
};

const site = await serve();
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 760 }, deviceScaleFactor: 2, hasTouch: true });
await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: PASSAGE } } }));
await ctx.addInitScript((s) => { if (!sessionStorage.getItem("seeded")) { localStorage.setItem("bible-study:v1", JSON.stringify(s)); sessionStorage.setItem("seeded", "1"); } }, SEED);
const page = await ctx.newPage();
await page.goto(site.url); await page.waitForTimeout(1200);
const go = (v) => page.evaluate((v) => (document.querySelector(`.tabbar [data-view=${v}]`) || document.querySelector(`[data-view=${v}]`))?.click(), v);
for (const [id, s] of Object.entries(SHOW)) {
  await page.evaluate(() => document.querySelectorAll("dialog[open]").forEach((d) => d.close()));
  await go(s.view); await page.waitForTimeout(1100);
  await page.evaluate(() => window.scrollTo(0, 0));
  if (s.scroll) await page.evaluate((q) => { const el = document.querySelector(q); if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); }, s.scroll);
  if (s.click) { await page.click(s.click); await page.waitForTimeout(700); }
  if (s.chat) {
    await page.tap(".buddy"); await page.waitForTimeout(500);
    await page.fill("#partnerQ", "Where is text size?"); await page.click("#partnerGo"); await page.waitForTimeout(600);
  }
  await page.screenshot({ path: `${SHOTS}/${id}.png` });
  if (s.chat) await page.$eval("#chatSheetClose", (b) => b.click());
}
await ctx.close();

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const img = (id) => `<img src="file://${SHOTS}/${id}.png" alt="">`;
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Family Bible Study</title><style>
@page { size: Letter; margin: 0.55in; }
* { box-sizing: border-box; }
body { margin: 0; font: 12.5pt/1.5 Georgia, "Times New Roman", serif; color: #2a2620; }
h1, h2, h3 { font-family: Georgia, serif; font-weight: normal; margin: 0; }
.page { page-break-after: always; break-after: page; height: 9.75in; overflow: hidden; position: relative; }
.page:last-child { page-break-after: auto; }
.cover { text-align: center; padding-top: 1.1in; border: 2px solid #b8955a; border-radius: 10px; }
.cover .orn { color: #b8955a; font-size: 28pt; }
.cover h1 { font-size: 34pt; margin: .2in 0 .1in; }
.cover .sub { font-style: italic; font-size: 14pt; color: #6b5d48; }
.cover .to { margin: .7in auto 0; width: 4.6in; text-align: left; font-size: 13pt; }
.cover .to p { border-bottom: 1px solid #cdbb98; padding: .18in 0 .04in; margin: 0; }
.cover blockquote { margin: .8in auto 0; width: 5in; font-style: italic; color: #4c4335; }
.cover cite { display: block; font-style: normal; font-size: 10pt; letter-spacing: .08em; text-transform: uppercase; color: #8a7a60; margin-top: .08in; }
.kicker { font: 600 9.5pt Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #9a7b45; }
.setup h1 { font-size: 24pt; margin: .04in 0 .14in; }
.steps { counter-reset: s; list-style: none; padding: 0; margin: 0; }
.steps li { counter-increment: s; position: relative; padding: .1in 0 .1in .55in; border-bottom: 1px solid #eadfca; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: .1in; width: .38in; height: .38in; border-radius: 50%; background: #9a7b45; color: #fff; font: 700 13pt/.38in Arial, sans-serif; text-align: center; }
.steps b { font-family: Arial, sans-serif; }
.blank { display: inline-block; min-width: 3in; border-bottom: 1px solid #555; }
.note { margin-top: .16in; padding: .12in .16in; background: #f6f0e4; border-radius: 8px; font-size: 11.5pt; }
.sec { display: grid; grid-template-columns: 2.05in 1fr; gap: .32in; align-items: start; break-inside: avoid; page-break-inside: avoid; margin-bottom: .3in; }
.sec figure { margin: 0; }
.sec img { width: 2.05in; border-radius: 14px; border: 1px solid #ccc; display: block; }
.sec figcaption { font-size: 9.5pt; color: #6b5d48; text-align: center; margin-top: .05in; font-style: italic; }
.sec h2 { font-size: 18pt; margin: 0 0 .06in; }
.sec ul { margin: 0; padding-left: .2in; }
.sec li { margin: 0 0 .05in; font-size: 11pt; line-height: 1.42; }
.foot { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; font-size: 9pt; color: #8a7a60; }
</style></head><body>
<section class="page cover">
  <div class="orn">❦</div>
  <h1>Family Bible Study</h1>
  <p class="sub">A Christmas gift, with love</p>
  <div class="to"><p>For: </p><p>From: </p><p>Christmas 2026</p></div>
  <blockquote>“Thy word is a lamp unto my feet, and a light unto my path.”<cite>Psalm 119:105</cite></blockquote>
</section>
<section class="page setup">
  <p class="kicker">Start here</p>
  <h1>Setting up, in five minutes</h1>
  <ol class="steps">
    <li>On an iPhone or iPad, open <b>Safari</b>. On a computer, open any web browser. Go to <b>bible.breakoutroom.net</b></li>
    <li>Sign in with your email and the starter password below. The app then asks you to choose your own password.
      <p style="margin:.12in 0 0">Email: <span class="blank"></span></p>
      <p style="margin:.1in 0 0">Starter password: <span class="blank"></span></p></li>
    <li>Make it an app on your Home Screen: tap the <b>Share</b> button (the square with an arrow), then <b>Add to Home Screen</b>, then <b>Add</b>.</li>
    <li>A short welcome walks you through picking a look and a study. You can skip it, and change anything later in Settings.</li>
    <li>The first time you tap a 🎤 microphone button, your device asks to use the microphone. Tap <b>Allow</b>. It asks only once.</li>
  </ol>
  <div class="note"><b>Good to know.</b> You never need to type a Bible key; your family sign-in brings everything with it. Sign in on another phone, iPad or computer and your reading, journal and notes follow you. Forgot your password? Tap “Forgot your password?” on the sign-in screen and a code comes to your email.</div>
  <p class="foot">Need help? Tap ❓ at the top of any screen, or ask your study buddy.</p>
</section>
${(() => {
  const pages = [];
  for (let i = 0; i < GUIDE.length; i += 2) pages.push(GUIDE.slice(i, i + 2));
  return pages.map((two, n) => `<section class="page">${n === 0 ? `<p class="kicker">The user guide</p>` : ""}
    ${two.map((g) => `<div class="sec"><figure>${img(g.id)}<figcaption>${esc(SHOW[g.id].cap)}</figcaption></figure>
      <div><h2>${g.icon} ${esc(g.title)}</h2><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div></div>`).join("")}
    <p class="foot">Family Bible Study · ${n + 3}</p></section>`).join("");
})()}
</body></html>`;
writeFileSync(`${HERE}gift-packet.html`, html);
const pdfPage = await browser.newPage();
await pdfPage.goto(`file://${HERE}gift-packet.html`); await pdfPage.waitForTimeout(500);
await pdfPage.pdf({ path: OUT, format: "Letter", printBackground: true });
await browser.close(); site.close();
console.log(`Saved ${OUT}`);
