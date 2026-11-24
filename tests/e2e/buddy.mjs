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
      Math.random = () => 0.6; // his visit asks if they're wondering anything (not a game or a check-in)
      // Pretend speech so read-aloud can be checked.
      window.__said = [];
      Object.defineProperty(window, "speechSynthesis", { configurable: true, value: { speak: (u) => { window.__said.push(u.text); setTimeout(() => u.onend && u.onend(), 50); }, cancel() {}, getVoices: () => [], addEventListener() {} } });
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
    });
    const page = await ctx.newPage();
    await page.clock.install({ time: new Date("2026-10-20T14:00:00") });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(site.url); await page.waitForTimeout(900);
    const box = () => page.$eval(".buddy", (b) => { const r = b.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, shown: getComputedStyle(b).display !== "none" }; });
    const tabTop = await page.$eval(".tabbar", (t) => t.getBoundingClientRect().top);
    let b = await box();
    check(`${tag}: buddy is showing`, b.shown);
    // Phones: above the bottom bar. iPad: the menu is a rail on the left, so he has the full height.
    const lastBtn = await page.$eval(".tabbar", (t) => [...t.querySelectorAll("button")].pop().getBoundingClientRect().bottom);
    const railR = await page.$eval(".tabbar", (t) => t.getBoundingClientRect().right);
    check(`${tag}: buddy never sits on the menu buttons`, tag === "phone" ? b.b <= tabTop : b.t >= lastBtn && b.b <= 1180, `${JSON.stringify(b)} vs ${tabTop}`);
    if (tag === "iPad") check("iPad: he rests in the side menu, off the page", b.r <= railR + 1, `${JSON.stringify(b)} rail ${railR}`);
    check(`${tag}: buddy is easy to see but not in the way`, tag === "phone" ? b.r - b.l <= 64 && b.r - b.l >= 56 : b.r - b.l <= 84 && b.r - b.l >= 76, `${b.r - b.l}`);
    // While reading he shrinks into the corner, so the Bible text keeps the whole width.
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(400);
    const small = await box();
    check(`${tag}: while reading he stays out of the text`, tag === "phone" ? small.r - small.l <= 52 : small.r <= railR + 1, JSON.stringify(small));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=home]").click()); await page.waitForTimeout(400);
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
    check(`${tag}: the tap that opened it doesn't press anything inside`, (await page.$$("dialog[open]")).length === 1);
    check(`${tag}: he stands up while chatting`, await page.$eval(".buddy", (el) => !el.classList.contains("sitting")));
    await page.$eval("#chatSheetClose", (b) => b.click()); await page.waitForTimeout(300);
    check(`${tag}: closing puts the chat back under the chapter`, Boolean(await page.$("#partnerBox #partnerQ")));
    // Drag him to the left side; he stays there after reopening.
    const s = await box();
    await page.mouse.move(s.l + 20, s.t + 30); await page.mouse.down();
    // Phone: to the left edge. iPad: out of the menu onto the page's left edge.
    const railRight = tag === "phone" ? 0 : railR;
    await page.mouse.move(railRight + 60, s.t - 150, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(400);
    b = await box();
    check(`${tag}: dragged to the left edge of the page`, b.l >= railRight && b.l < railRight + 20, `left ${b.l}`);
    check(`${tag}: dragging doesn't open anything`, !(await page.$("dialog[open]")));
    await page.reload(); await page.waitForTimeout(900);
    b = await box();
    check(`${tag}: remembers where he was put`, b.l < railRight + 20 && Math.abs(b.t - (s.t - 150)) < 60, `left ${b.l} top ${b.t}`);
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
    check(`${tag}: Settings has his on and off switches`, (await page.$$("#buddyToggles input[type=checkbox]")).length >= 2 && Boolean(await page.$("[data-buddy-feat=buddy]")) && Boolean(await page.$("[data-buddy-feat=buddyvisits]")));
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
    await page.clock.install({ time: new Date("2026-10-20T14:00:00") });
    await page.goto(site.url); await page.waitForTimeout(900);
    for (let i = 0; i < 300 && !(await page.$("dialog.buddy-name-dialog[open]")); i++) await page.clock.runFor(2000);
    check("naming: his first visit asks what to call him, in a big window", /What would you like to call me/.test(await page.textContent(".buddy-name-dialog")));
    const nb = await page.$eval(".buddy-name-dialog", (d) => { const r = d.getBoundingClientRect(), i = d.querySelector("input").getBoundingClientRect(); return { top: r.top, w: r.width, ih: i.height, ib: i.bottom }; });
    check("naming: the window sits near the top (above any keyboard), roomy, with a big box", nb.top < 80 && nb.w >= 340 && nb.ih >= 56 && nb.ib < 844 * 0.45, JSON.stringify(nb));
    check("naming: the box is ready to type in", await page.evaluate(() => document.activeElement?.closest(".buddy-name-dialog") !== null));
    await page.clock.runFor(60000);
    check("naming: it stays until they answer", Boolean(await page.$("dialog.buddy-name-dialog[open]")));
    await page.fill(".buddy-name-dialog input", "Pip");
    await page.click(".buddy-name-dialog .bnd-save"); await page.clock.runFor(1500);
    check("naming: he loves his new name, and it's saved", /I'm Pip now/.test(await page.textContent(".buddy-say")) && await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).buddyName === "Pip"));
    check("naming: the chat says his name", /Ask Pip anything/.test(await page.textContent("#chatSheet h2")));
    await ctx.close();
  }
  // Sometimes he asks them to play Bible Spin with him.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
    await ctx.addInitScript(() => { Math.random = () => 0.1; if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", buddyName: "Pip" })); });
    const page = await ctx.newPage();
    await page.clock.install({ time: new Date("2026-10-20T14:00:00") });
    await page.goto(site.url); await page.waitForTimeout(900);
    for (let i = 0; i < 300 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    check("play: now and then he asks them to play Bible Spin", /Bible Spin|play|Spin/i.test(await page.textContent(".buddy-say .bs-words")) && /Let's play/.test(await page.textContent(".buddy-say .bs-yes")));
    await page.$eval(".buddy-say .bs-yes", (b) => b.click()); await page.clock.runFor(1500);
    check("play: yes takes them straight to choosing how tough he plays", await page.$eval("dialog.quest", (d) => d.open) && Boolean(await page.$("dialog.quest [data-lv]")) && /How tough should Pip be/.test(await page.textContent("dialog.quest")));
    await ctx.close();
  }
  // His tricks, his nap when nobody's around, and his voice switch.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
    await ctx.addInitScript(() => { Math.random = () => 0.1; if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", buddyName: "Buddy", buddyVisitLog: { day: new Date().toISOString().slice(0, 10), n: 9 } })); });
    const page = await ctx.newPage();
    const errs = []; page.on("pageerror", (e) => errs.push(e.message));
    await page.clock.install({ time: new Date("2026-10-20T14:00:00") });
    await page.goto(site.url); await page.waitForTimeout(900);
    const seen = new Set();
    for (let i = 0; i < 40; i++) {
      await page.clock.runFor(5000);
      for (const c of await page.$eval(".buddy", (b) => [...b.classList])) seen.add(c);
      if (seen.has("sleeping")) break;
    }
    check("tricks: he does things on his own (cartwheels, strolls, thinking, Yay!)", ["cartwheel", "strolling", "pondering", "yay", "reading"].some((c) => seen.has(c)), [...seen].join(" "));
    for (let i = 0; i < 40 && !(await page.$eval(".buddy", (b) => b.classList.contains("sleeping"))); i++) await page.clock.runFor(5000);
    check("nap: he lies down for a nap when nobody's been around", await page.$eval(".buddy", (b) => b.classList.contains("sleeping")) && /z z z/.test(await page.textContent(".buddy-pop")));
    await page.mouse.click(200, 400); await page.clock.runFor(300);
    check("nap: a tap anywhere wakes him up", !(await page.$eval(".buddy", (b) => b.classList.contains("sleeping"))));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.clock.runFor(500);
    check("voice: a switch to have him talk out loud, off to start", await page.$eval('[data-buddy-feat="buddyvoice"]', (i) => !i.checked));
    check("name box: big and easy to type in", await page.$eval("#buddyNameInput", (i) => i.getBoundingClientRect().height >= 48 && i.getBoundingClientRect().width >= 240));
    check("tricks: no page errors", !errs.length, errs.join(" | "));
    await ctx.close();
  }
  // Time of day, check-ins, moods over his head, thank-yous and celebrations.
  {
    const setupStore = (extra = {}) => JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", buddyName: "Buddy", last: { book: "JHN", chapter: 11 }, ...extra });
    const open = async (time, extra, html = '<p><span class="v" data-number="1">1</span>Jesus wept. They mourned with sorrow and tears and grief, weeping at the death.</p>') => {
      const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 } });
      await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
      await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: html } } }));
      await ctx.addInitScript((st) => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", st); }, setupStore(extra));
      const page = await ctx.newPage();
      const errs = []; page.on("pageerror", (e) => errs.push(e.message));
      await page.clock.install({ time: new Date(time) });
      await page.goto(site.url); await page.waitForTimeout(900);
      return { ctx, page, errs };
    };
    let { ctx, page, errs } = await open("2026-10-20T08:00:00");
    for (let i = 0; i < 30 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    check("time: he says good morning", /Good morning, Mel/.test(await page.textContent(".buddy-say")), await page.textContent(".buddy-say"));
    // A sad chapter: a little cloud over his head.
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click());
    await page.clock.runFor(3500);
    check("mood: a cloud over his head for a sad chapter", /☁️/.test(await page.textContent(".buddy-pop")) && await page.$eval(".buddy-pop", (p) => p.classList.contains("on")), await page.textContent(".buddy-pop"));
    // A thank-you: hearts.
    await page.evaluate(() => { document.querySelector("#partnerBox").open = true; });
    await page.clock.runFor(8000);
    await page.fill("#partnerQ", "Thank you!"); await page.evaluate(() => document.querySelector("#partnerGo").click()); await page.clock.runFor(300);
    check("thanks: a thank-you gets hearts", /💕/.test(await page.textContent(".buddy-pop")));
    check("moods: no page errors", !errs.length, errs.join(" | "));
    await ctx.close();
    ({ ctx, page, errs } = await open("2026-10-20T22:30:00"));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click());
    for (let i = 0; i < 30 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    check("time: late at night he says it's time for bed", /bed|Goodnight/.test(await page.textContent(".buddy-say")), await page.textContent(".buddy-say"));
    await page.clock.runFor(30000);
    for (let i = 0; i < 12 && !(await page.$eval(".buddy", (b) => b.classList.contains("sleeping"))); i++) await page.clock.runFor(10000);
    check("time: late at night he falls asleep quickly", await page.$eval(".buddy", (b) => b.classList.contains("sleeping")));
    await ctx.close();
    // A check-in, with his own answers.
    ({ ctx, page, errs } = await open("2026-10-20T14:00:00", { show: { games: false } }, "<p>Text</p>"));
    await page.evaluate(() => { Math.random = () => 0.05; });
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click());
    for (let i = 0; i < 300 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    const words = await page.textContent(".buddy-say .bs-words");
    check("check-in: he gently asks how they're doing", /gotten out of the house/.test(words) && /Yes, I did/.test(await page.textContent(".bs-yes")) && /Not yet/.test(await page.textContent(".bs-no")), words);
    await page.click(".bs-yes"); await page.clock.runFor(300);
    check("check-in: he answers kindly", /Fresh air/.test(await page.textContent(".buddy-say")));
    // Typing somewhere: his bubble gets out of the way.
    await page.clock.runFor(4000);
    await page.evaluate(() => window.__bud = 1);
    check("check-ins: no page errors", !errs.length, errs.join(" | "));
    await ctx.close();
    // Near Christmas he asks if they'd like the Christmas look, and takes "no" for an answer.
    ({ ctx, page, errs } = await open("2026-12-08T14:00:00", { show: { games: false } }, "<p>Text</p>"));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click());
    for (let i = 0; i < 300 && await page.$eval(".buddy-say", (el) => el.hidden); i++) await page.clock.runFor(2000);
    check("season: near Christmas he offers the Christmas look", /Christmas/.test(await page.textContent(".buddy-say .bs-words")) && /No thanks/.test(await page.textContent(".bs-no")));
    await page.click(".bs-no"); await page.clock.runFor(300);
    check("season: no means no, and he won't ask again this year", /Okie/.test(await page.textContent(".buddy-say")) && await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).seasonAsked["christmas-2026"] === true && JSON.parse(localStorage.getItem("bible-study:v1")).style !== "christmas"));
    check("season: no page errors", !errs.length, errs.join(" | "));
    await ctx.close();
  }
  // While reading, his words never pop up over the Bible; they wait for another screen.
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
    await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", buddyName: "Buddy" })); });
    const page = await ctx.newPage();
    await page.clock.install({ time: new Date("2026-10-20T14:00:00") });
    await page.goto(site.url); await page.waitForTimeout(900);
    await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click());
    let popped = false;
    for (let i = 0; i < 300 && !popped; i++) { await page.clock.runFor(2000); popped = !(await page.$eval(".buddy-say", (el) => el.hidden)); }
    check("reading: his talk bubble never pops up over the Bible", !popped);
    await page.evaluate(() => document.querySelector(".tabbar [data-view=home]").click());
    for (let i = 0; i < 60 && !popped; i++) { await page.clock.runFor(2000); popped = !(await page.$eval(".buddy-say", (el) => el.hidden)); }
    check("reading: he says hi once they're on another screen", popped);
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
