// Read to me: one switch. On, it reads this chapter and every chapter opened after it, going
// on to the next by itself. Off, it stops. It is remembered, but never starts talking by
// itself when the app is first opened.
// Run: node tests/e2e/readaloud.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => {
    const ch = new URL(r.request().url()).pathname.split("/").pop();
    r.fulfill({ json: { data: { content: `<p><span class="v" data-number="1">1</span>Words of ${ch}.</p>` } } });
  });
  await ctx.addInitScript(() => {
    if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, last: { book: "JHN", chapter: 1 } }));
    // Pretend speech: each piece "finishes" quickly, so a chapter ends and the next can begin.
    window.__said = [];
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: { speak: (u) => { window.__said.push(u.text); setTimeout(() => u.onend && u.onend(), 30); }, cancel() {}, getVoices: () => [], addEventListener() {} } });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(400);
  const said = () => page.evaluate(() => window.__said.join(" | "));
  check("the switch is called Read to me", /Read to me/.test(await page.textContent("#listenBar")));
  check("nothing is read until asked", (await said()) === "");
  check("read aloud starts folded: one Play button and More", await page.isVisible("#playBtn") && await page.isVisible("#listenMore") && !(await page.isVisible("#driveQuick")));
  await page.click("#listenMore"); await page.waitForTimeout(150);
  check("More opens speed, sleep timer and Read to me", await page.isVisible("#driveQuick") && await page.isVisible("#quickRate") && await page.isVisible("#sleepSel"));
  await page.click("#driveQuick"); await page.waitForTimeout(1200);
  const heard = await said();
  check("turning it on reads this chapter", /John, chapter 1/.test(heard) && /Words of JHN\.1/.test(heard), heard);
  check("and goes on to the next chapter by itself", /John, chapter 2/.test(heard) && /Words of JHN\.2/.test(heard), heard);
  await page.click("#driveQuick"); await page.waitForTimeout(200);
  await page.evaluate(() => { window.__said = []; });
  await page.click("#nextCh"); await page.waitForTimeout(500);
  check("turned off: the next chapter isn't read", (await said()) === "", await said());
  await page.click("#driveQuick"); await page.waitForTimeout(150);
  check("the switch is remembered", await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).modes.drive === true));
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { window.__said = []; document.querySelector(".tabbar [data-view=read]").click(); }); await page.waitForTimeout(500);
  check("reopening the app doesn't start talking by itself", (await said()) === "");
  check("the switch still shows on", await page.$eval("#driveQuick", (i) => i.checked));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
