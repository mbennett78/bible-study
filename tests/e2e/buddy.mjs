// The study buddy: sits small at the side, never covers the bottom buttons, stands up and
// opens the chat right where you are when tapped, can be dragged to the other side and
// remembers it, gets excited when asked, walks over now and then to say hi (and that can be
// turned off), reads answers aloud when that's on, and explains the microphone first.
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
      if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", buddyName: "Buddy" }));
      // Pretend speech so read-aloud can be checked.
      window.__said = [];
      Object.defineProperty(window, "speechSynthesis", { configurable: true, value: { speak: (u) => { window.__said.push(u.text); setTimeout(() => u.onend && u.onend(), 50); }, cancel() {}, getVoices: () => [], addEventListener() {} } });
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
    });
    const page = await ctx.newPage();
    await page.clock.install();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(site.url); await page.waitForTimeout(900);
    const box = () => page.$eval(".buddy", (b) => { const r = b.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, shown: getComputedStyle(b).display !== "none" }; });
    const tabTop = await page.$eval(".tabbar", (t) => t.getBoundingClientRect().top);
    let b = await box();
    check(`${tag}: buddy is showing`, b.shown);
    check(`${tag}: buddy sits above the bottom buttons`, b.b <= tabTop, `${b.b} vs ${tabTop}`);
    check(`${tag}: buddy is small (a touch bigger than before)`, b.r - b.l <= 72 && b.r - b.l >= 64);
    check(`${tag}: he sits quietly until someone talks to him`, await page.$eval(".buddy", (el) => el.classList.contains("sitting")));
    // Now and then he walks over to say hi.
    for (let i = 0; i < 300 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    check(`${tag}: now and then he walks over and asks if they're wondering anything`, await page.$eval(".buddy-say", (el) => !el.hidden && el.textContent.length > 5), await page.$eval(".buddy-say", (el) => el.textContent));
    check(`${tag}: they can answer him yes or not now`, await page.$eval(".buddy-say .bs-yes", (b) => b.offsetParent !== null) && await page.$eval(".buddy-say .bs-no", (b) => b.offsetParent !== null));
    await page.$eval(".buddy-say .bs-no", (b) => b.click()); await page.clock.runFor(300);
    check(`${tag}: "not now" gets a cheerful okay`, /Okie|Sure thing|Okay|No problem/.test(await page.$eval(".buddy-say", (el) => el.textContent)) && await page.$eval(".buddy-say .bs-acts", (a) => a.hidden), await page.$eval(".buddy-say", (el) => el.textContent));
    await page.clock.runFor(4000); await page.waitForTimeout(200);
    check(`${tag}: then he goes back and the bubble goes away`, await page.$eval(".buddy-say", (el) => el.hidden));
    // Tap him on Home: he stands up and the chat opens right here, without leaving the page.
    await page.tap(".buddy"); await page.waitForTimeout(600);
    check(`${tag}: tapping him opens the chat right where you are`, await page.$eval("#chatSheet", (d) => d.open) && await page.$eval("#view-read", (v) => v.hidden) && Boolean(await page.$("#chatSheet #partnerQ")));
    check(`${tag}: he stands up while chatting`, await page.$eval(".buddy", (el) => !el.classList.contains("sitting")));
    await page.click("#chatSheetClose"); await page.waitForTimeout(300);
    check(`${tag}: closing puts the chat back under the chapter`, Boolean(await page.$("#partnerBox #partnerQ")));
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
    await page.clock.runFor(1000);
    await page.tap(".buddy"); await page.waitForTimeout(500);
    await page.fill("#partnerQ", "What does Word mean here?");
    await page.evaluate(() => { window.open = () => null; });
    await page.evaluate(() => { window.__waits = []; new MutationObserver((m) => m.forEach((x) => x.addedNodes.forEach((n) => n.classList?.contains("typing") && window.__waits.push(n.textContent)))).observe(document.querySelector("#chatLog"), { childList: true }); });
    await page.click("#partnerGo"); await page.waitForTimeout(100);
    check(`${tag}: he gets excited when asked`, await page.$eval(".buddy", (el) => el.classList.contains("excited")));
    check(`${tag}: he says he can find something`, /find|look|know where/i.test(await page.evaluate(() => window.__waits.join(" "))), await page.evaluate(() => window.__waits.join(" ")));
    await page.clock.runFor(3000); await page.waitForTimeout(300);
    await page.fill("#partnerQ", "My grandma died last week. Where is she now?");
    await page.click("#partnerGo"); await page.waitForTimeout(100);
    check(`${tag}: a sad question gets a caring face, not a happy hop`, await page.$eval(".buddy", (el) => el.classList.contains("caring") && !el.classList.contains("excited")) && await page.$eval("#chatSheet .buddy-inline", (el) => el.classList.contains("caring")));
    // The read-aloud switch beside the chat box.
    await page.click("#partnerSpeak");
    check(`${tag}: read answers aloud turns on`, (await page.getAttribute("#partnerSpeak", "aria-pressed")) === "true");
    await page.reload(); await page.waitForTimeout(800);
    check(`${tag}: read aloud stays on`, (await page.getAttribute("#partnerSpeak", "aria-pressed")) === "true");
    // Can be turned off in the ⋮ menu.
    await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.show = { buddy: false }; localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
    await page.reload(); await page.waitForTimeout(800);
    check(`${tag}: can be turned off`, !(await box()).shown);
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(300);
    check(`${tag}: Settings has his on and off switches`, (await page.$$("#buddyToggles input[type=checkbox]")).length === 2);
    await page.fill("#buddyNameInput", "Sparky");
    check(`${tag}: each person can name their buddy`, /Ask Sparky anything/.test(await page.textContent("#chatSheet h2")));
    check(`${tag}: no page errors`, !errors.length, errors.join(" | "));
    await ctx.close();
  }
  // Set up before he could be named: his first visit asks what to call him.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
    await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel" })); });
    const page = await ctx.newPage();
    await page.clock.install();
    await page.goto(site.url); await page.waitForTimeout(900);
    for (let i = 0; i < 300 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    check("naming: his first visit asks what to call him", /What would you like to call me/.test(await page.textContent(".buddy-say")) && await page.$eval(".buddy-say .bs-name", (f) => !f.hidden));
    await page.fill(".buddy-say .bs-name input", "Pip");
    await page.$eval(".buddy-say .bs-name button", (b) => b.click()); await page.clock.runFor(300);
    check("naming: he loves his new name, and it's saved", /I'm Pip now/.test(await page.textContent(".buddy-say")) && await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).buddyName === "Pip"));
    check("naming: the chat says his name", /Ask Pip anything/.test(await page.textContent("#chatSheet h2")));
    await ctx.close();
  }
  // Sometimes he asks them to play Bible Quest with him.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
    await ctx.addInitScript(() => { Math.random = () => 0.1; if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", buddyName: "Pip" })); });
    const page = await ctx.newPage();
    await page.clock.install();
    await page.goto(site.url); await page.waitForTimeout(900);
    for (let i = 0; i < 300 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    check("play: now and then he asks them to play Bible Quest", /Bible Quest|play|Spin/i.test(await page.textContent(".buddy-say .bs-words")) && /Let's play/.test(await page.textContent(".buddy-say .bs-yes")));
    await page.$eval(".buddy-say .bs-yes", (b) => b.click()); await page.clock.runFor(1500);
    check("play: yes takes them straight to choosing how tough he plays", await page.$eval("dialog.quest", (d) => d.open) && Boolean(await page.$("dialog.quest [data-lv]")) && /How tough should Pip be/.test(await page.textContent("dialog.quest")));
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
