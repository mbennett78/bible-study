// Updates never interrupt anyone. When a new version arrives while the app is open, it waits:
// not while reading aloud, not during a game, not while typing. It switches over only after
// 15 quiet minutes (when the app goes to Home anyway) or on the next fresh open, and
// everyone's place and journal are still there afterwards.
// Run: node tests/e2e/updates.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: `<p><span class="v" data-number="1">1</span>Words.</p>` } } }));
  await ctx.addInitScript(() => {
    if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, last: { book: "ROM", chapter: 8 } }));
    // Speech that keeps going until stopped, like a long chapter being read aloud.
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: { speak() {}, cancel() {}, getVoices: () => [], addEventListener() {} } });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.clock.install();
  await page.goto(site.url);
  await page.waitForFunction(() => navigator.serviceWorker.ready);
  await page.reload(); // now the app is controlled by its service worker, as on a family member's phone
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  await page.waitForTimeout(600);

  const still = () => page.evaluate(() => window.__samePage === true).catch(() => false);
  const mark = () => page.evaluate(() => { window.__samePage = true; });
  const newVersion = () => page.evaluate(() => navigator.serviceWorker.dispatchEvent(new Event("controllerchange")));
  const away = async (mins) => { await page.clock.fastForward(mins * 60 * 1000); await page.waitForTimeout(300); };

  // Reading aloud when the update lands: keep reading.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(400);
  await mark();
  await page.click("#playBtn"); await page.waitForTimeout(200);
  await newVersion(); await page.waitForTimeout(300);
  check("a new version doesn't reload the page while reading", await still());
  await away(20);
  check("not even after 20 minutes of reading aloud", await still());
  await page.click("#playBtn"); await page.waitForTimeout(200);

  // In the middle of a game.
  await page.evaluate(() => document.querySelector("#qmGames").click()); await page.waitForTimeout(300);
  await page.$eval('dialog.quest [data-mode="solo"]', (b) => b.click()); await page.waitForTimeout(200);
  await away(20);
  check("or during a game left open", await still() && await page.$eval("dialog.quest", (d) => d.open));
  await page.$eval("dialog.quest", (d) => d.close());

  // Writing in the journal.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(300);
  await page.evaluate(() => { document.querySelector("#journalBox").open = true; document.querySelector('#journalBox [data-add="bible"]').click(); });
  const box = await page.$("#entryText");
  check("there is a journal box to write in", Boolean(box) && await box.isVisible());
  await box.click(); await page.keyboard.type("Nothing can separate us from the love of God.");
  await page.clock.runFor(1000); await page.waitForTimeout(200); // it saves half a second after typing stops
  await away(20);
  check("or while someone is writing", await still());
  await page.evaluate(() => document.activeElement.blur());

  // Quiet for 15 minutes: now it switches to the new version.
  await away(16);
  check("after 15 quiet minutes it switches to the new version", !(await still()));
  await page.waitForTimeout(800);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")));
  check("their place is kept", saved.last.book === "ROM" && saved.last.chapter === 8);
  check("their journal is kept", JSON.stringify(saved).includes("Nothing can separate us from the love of God."));
  check("they can pick up where they left off", /Romans 8/.test(await page.textContent("#homeView")));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
