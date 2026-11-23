// The study buddy: shows at the side, never covers the bottom buttons, opens the chat when
// tapped, can be dragged to the other side and remembers it, gets excited when asked,
// reads answers aloud when that's on, and explains the microphone before the device asks.
// Run: node tests/e2e/buddy.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  for (const [w, h, tag] of [[390, 844, "phone"], [820, 1180, "iPad"]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v" data-number="1">1</span>In the beginning was the Word.</p>' } } }));
    await ctx.addInitScript(() => {
      if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", aiPartner: "claude" }));
      // Pretend speech so read-aloud can be checked.
      window.__said = [];
      window.speechSynthesis = { speak: (u) => { window.__said.push(u.text); setTimeout(() => u.onend && u.onend(), 50); }, cancel() {}, getVoices: () => [], addEventListener() {} };
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(site.url); await page.waitForTimeout(900);
    const box = () => page.$eval(".buddy", (b) => { const r = b.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, shown: getComputedStyle(b).display !== "none" }; });
    const tabTop = await page.$eval(".tabbar", (t) => t.getBoundingClientRect().top);
    let b = await box();
    check(`${tag}: buddy is showing`, b.shown);
    check(`${tag}: buddy sits above the bottom buttons`, b.b <= tabTop, `${b.b} vs ${tabTop}`);
    check(`${tag}: buddy is small`, b.r - b.l <= 64);
    // Tap him: the chat opens on the Read page.
    await page.tap(".buddy"); await page.waitForTimeout(600);
    check(`${tag}: tapping him opens the chat`, await page.$eval("#partnerBox", (d) => d.open) && !(await page.$eval("#view-read", (v) => v.hidden)));
    // Drag him to the left side; he stays there after reopening.
    const s = await box();
    await page.mouse.move(s.l + 20, s.t + 30); await page.mouse.down();
    await page.mouse.move(60, s.t - 150, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(400);
    b = await box();
    check(`${tag}: dragged to the left edge`, b.l < 20, `left ${b.l}`);
    check(`${tag}: dragging doesn't open anything`, !(await page.$("dialog[open]")));
    await page.reload(); await page.waitForTimeout(900);
    b = await box();
    check(`${tag}: remembers where he was put`, b.l < 20 && Math.abs(b.t - (s.t - 150)) < 60, `left ${b.l} top ${b.t}`);
    // Ask something: he gets excited.
    await page.tap(".buddy"); await page.waitForTimeout(500);
    await page.fill("#partnerQ", "What does Word mean here?");
    await page.evaluate(() => { window.open = () => null; });
    await page.click("#partnerGo"); await page.waitForTimeout(100);
    check(`${tag}: he gets excited when asked`, await page.$eval(".buddy", (el) => el.classList.contains("excited")));
    // The read-aloud switch beside the chat box.
    await page.click("#partnerSpeak");
    check(`${tag}: read answers aloud turns on`, (await page.getAttribute("#partnerSpeak", "aria-pressed")) === "true");
    await page.reload(); await page.waitForTimeout(800);
    check(`${tag}: read aloud stays on`, (await page.getAttribute("#partnerSpeak", "aria-pressed")) === "true");
    // Can be turned off in the ⋮ menu.
    await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.show = { buddy: false }; localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
    await page.reload(); await page.waitForTimeout(800);
    check(`${tag}: can be turned off`, !(await box()).shown);
    check(`${tag}: no page errors`, !errors.length, errors.join(" | "));
    await ctx.close();
  }
  // Microphone: explained before the device asks, and a kind way back if it was refused.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
    await ctx.addInitScript(() => {
      if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true }));
      window.__starts = 0;
      window.SpeechRecognition = window.webkitSpeechRecognition = function () { this.start = () => { window.__starts++; setTimeout(() => this.onerror?.({ error: "not-allowed" }), 30); }; this.stop = () => {}; };
    });
    const page = await ctx.newPage();
    await page.goto(site.url); await page.waitForTimeout(800);
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click());
    await page.evaluate(() => { document.querySelector("#partnerBox").open = true; });
    await page.click("#partnerMic"); await page.waitForTimeout(200);
    check("mic: explained before the device asks", /will ask if Bible Study may use the microphone/.test(await page.textContent(".mic-sheet")) && (await page.evaluate(() => window.__starts)) === 0);
    await page.click("#micOk"); await page.waitForTimeout(300);
    check("mic: listening starts right after OK", (await page.evaluate(() => window.__starts)) === 1, String(await page.evaluate(() => window.__starts)));
    check("mic: refused shows how to turn it on, and that typing works", /Website Settings/.test(await page.textContent(".mic-sheet")) && await page.$eval(".mic-sheet", (d) => d.open));
    await ctx.close();
  }
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
