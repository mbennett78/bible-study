// Buddy grows, part 1: he welcomes them back once a day on Home and offers to pick up where
// they left off (never over the Bible), knows the date and season, answers "where is..." app
// questions without the internet and shows them the spot, and suggests a stretch after 30 minutes.
// Run: node tests/e2e/buddyguide.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v" data-number="1">1</span>In the beginning God created the heavens and the earth.</p>' } } }));
  await ctx.addInitScript(() => {
    if (!sessionStorage.getItem("seeded")) {
      localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, name: "Mel", buddyName: "Buddy",
        last: { book: "GEN", chapter: 12 }, visits: { "GEN.12": { count: 1, last: "2026-11-20T15:00:00", dates: [] } }, activePath: "chronological", lastOpenAt: new Date("2026-11-21T15:00:00").getTime() }));
      sessionStorage.setItem("seeded", "1");
    }
    Math.random = () => 0.6;
  });
  const page = await ctx.newPage();
  await page.clock.install({ time: new Date("2026-11-24T14:00:00") });
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  const bubble = () => page.$eval(".buddy-say", (el) => (el.hidden ? "" : el.textContent));

  for (let i = 0; i < 4 && !(await bubble()); i++) await page.clock.runFor(10000);
  await page.clock.runFor(1500);
  const hi = await bubble();
  check("he welcomes them back on Home", /Welcome back, Mel!/.test(hi), hi);
  check("he remembers where they were and their study", /Genesis 12/.test(hi) && /Chronological/.test(hi), hi);
  check("he knows it's been a few days", /It's been 3 days/.test(hi), hi);
  check("he knows the season (Thanksgiving week)", /Thanksgiving week/.test(hi), hi);
  await page.$eval(".buddy-say .bs-yes", (b) => b.click()); await page.waitForTimeout(600);
  const at = await page.evaluate(() => ({ view: document.body.dataset.view, last: JSON.parse(localStorage.getItem("bible-study:v1")).last }));
  check("Keep reading takes them right back to Genesis 12", at.view === "read" && at.last.book === "GEN" && at.last.chapter === 12, JSON.stringify(at));

  await page.evaluate(() => document.querySelector(".tabbar [data-view=home]").click()); await page.waitForTimeout(300);
  await page.clock.runFor(4 * 60e3);
  check("he only welcomes them once a day", !/Welcome back/.test(await bubble()));

  // App questions: answered right away, with a button to the spot.
  await page.tap(".buddy"); await page.waitForTimeout(500);
  await page.fill("#partnerQ", "Where do I change the text size?");
  await page.click("#partnerGo"); await page.waitForTimeout(300);
  const ans = await page.$$eval("#chatLog .chat-row.them", (r) => r.at(-1)?.textContent || "");
  check("he answers an app question without looking it up", /Text size is in Settings/.test(ans) && !(await page.$("#chatLog .typing")), ans);
  await page.click("#chatLog .chat-show"); await page.waitForTimeout(700);
  check("Show me opens Settings and points at the text size", await page.evaluate(() => document.body.dataset.view === "settings") && Boolean(await page.$(".buddy-point")) && !(await page.$eval("#chatSheet", (d) => d.open)));
  const inView = await page.$eval(".buddy-point", (el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
  check("the spot he points at is on screen", inView);

  await page.tap(".buddy"); await page.waitForTimeout(500);
  await page.fill("#partnerQ", "what day is it?");
  await page.click("#partnerGo"); await page.waitForTimeout(300);
  const day = await page.$$eval("#chatLog .chat-row.them", (r) => r.at(-1)?.textContent || "");
  check("he knows the date", /Tuesday, November 24, 2026/.test(day), day);
  await page.fill("#partnerQ", "how do I play the game?");
  await page.click("#partnerGo"); await page.waitForTimeout(300);
  await page.click("#chatLog .chat-row.them:last-child .chat-show"); await page.waitForTimeout(500);
  check("Let's play opens Bible Spin", await page.evaluate(() => [...document.querySelectorAll("dialog[open]")].some((d) => /spin|jewel|player/i.test(d.textContent))));
  await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  await page.evaluate(() => document.querySelectorAll("dialog[open]").forEach((d) => d.close()));

  // After half an hour on screen: a gentle stretch suggestion (not over the Bible).
  await page.evaluate(() => { document.querySelector(".tabbar [data-view=home]").click(); window.__lines = []; new MutationObserver(() => { const t = document.querySelector(".buddy-say .bs-words, .buddy-say")?.textContent; if (t) window.__lines.push(t); }).observe(document.querySelector(".buddy-say"), { subtree: true, childList: true, characterData: true }); });
  let nudge = "";
  for (let i = 0; i < 120 && !nudge; i++) { await page.mouse.move(5 + (i % 3), 300); await page.evaluate(() => window.dispatchEvent(new Event("wheel"))); await page.clock.runFor(20000); nudge = (await page.evaluate(() => window.__lines)).find((t) => /studying for/.test(t)) || ""; }
  check("after about 30 minutes he suggests a stretch", /studying for 3\d minutes/.test(nudge) && /stretch/.test(nudge), nudge || JSON.stringify(await page.evaluate(() => [window.__lines.slice(-4), document.body.dataset.view, [...document.querySelectorAll("dialog[open]")].map((d) => d.id || d.className)])));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; console.log(e.stack?.split("\n").slice(0, 8).join("\n")); }
await browser.close(); site.close(); finish(stopped);
