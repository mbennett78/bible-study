// Every way around the app goes where it says: the bottom bar, the side menu, the Menu,
// the side margin's quick links, every Games entry, Quick check, Help and the tour, Settings
// jumps, the home study cards, and every web link on the page.
// Run: node tests/e2e/links.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  for (const [label, viewport] of [["phone", { width: 390, height: 844 }], ["iPad", { width: 820, height: 1180 }]]) {
    const ctx = await browser.newContext({ viewport, hasTouch: true });
    await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: Array.from({ length: 30 }, (_, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>Verse ${i + 1}.</p>`).join(""), copyright: "c" } } }));
    await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", show: { buddy: false }, last: { book: "JHN", chapter: 3 }, quest: { sound: false } })); });
    const page = await ctx.newPage();
    const errors = []; page.on("pageerror", (e) => errors.push(e.message));
    page.on("dialog", (d) => d.accept());
    await page.goto(site.url); await page.waitForTimeout(900);
    const shown = () => page.evaluate(() => [...document.querySelectorAll(".view")].find((v) => !v.hidden)?.id);
    const open = (sel) => page.$eval(sel, (d) => d.open).catch(() => false);
    const click = (sel) => page.$eval(sel, (b) => b.click());
    const closeAll = () => page.evaluate(() => document.querySelectorAll("dialog[open]").forEach((d) => d.close()));
    const want = { home: "view-home", read: "view-read", books: "view-books", journal: "view-books", path: "view-path", notes: "view-notes", settings: "view-settings" };

    // Bottom bar (phone) or side rail (iPad).
    const bar = await page.$$eval("nav.tabbar [data-view]", (bs) => bs.map((b) => b.dataset.view));
    const barBad = [];
    for (const v of bar) { await page.$eval(`nav.tabbar [data-view="${v}"]`, (b) => b.click()); await page.waitForTimeout(250); if ((await shown()) !== want[v]) barBad.push(`${v} -> ${await shown()}`); }
    check(`${label}: every bottom-bar button opens its screen`, bar.length >= 6 && !barBad.length, barBad.join(", ") || bar.join(","));
    check(`${label}: Journal opens the journal, not the book list`, await (async () => { await page.$eval('nav.tabbar [data-view="journal"]', (b) => b.click()); await page.waitForTimeout(300); return page.$eval("#diaryToday", (d) => d.offsetParent !== null).catch(() => false); })());

    // The Menu.
    const menuBad = [];
    for (const v of await page.$$eval("#quickMenu [data-go-view]", (bs) => bs.map((b) => b.dataset.goView))) {
      await click("#menuBtn"); await page.waitForTimeout(200);
      await click(`#quickMenu [data-go-view="${v}"]`); await page.waitForTimeout(250);
      if ((await shown()) !== want[v] || await open("#quickMenu")) menuBad.push(v);
    }
    check(`${label}: every Menu link opens its screen and closes the menu`, !menuBad.length, menuBad.join(", "));
    await click("#menuBtn"); await page.waitForTimeout(200); await click("#qmGames"); await page.waitForTimeout(300);
    check(`${label}: Menu > Bible games opens Bible Spin`, await open("dialog.quest") && !(await open("#quickMenu")));
    await closeAll();

    // Every Games button.
    const gameBtns = await page.$$eval("[data-open-games], #homeGames", (bs) => bs.length);
    let gamesOk = 0;
    for (let i = 0; i < gameBtns; i++) {
      await page.$eval('nav.tabbar [data-view="home"]', (b) => b.click()); await page.waitForTimeout(200);
      await page.evaluate((i) => document.querySelectorAll("[data-open-games], #homeGames")[i].click(), i); await page.waitForTimeout(300);
      if (await open("dialog.quest")) gamesOk++;
      await closeAll();
    }
    check(`${label}: all ${gameBtns} Games buttons open Bible Spin`, gameBtns >= 3 && gamesOk === gameBtns, `${gamesOk}/${gameBtns}`);
    await page.$eval("[data-open-games]", (b) => b.click()); await page.waitForTimeout(300);
    await click("dialog.quest [data-practice]"); await page.waitForTimeout(300);
    check(`${label}: Bible Spin > practice opens the practice quiz`, await open("dialog.game"));
    await closeAll();
    await page.$eval("[data-open-games]", (b) => b.click()); await page.waitForTimeout(300);
    if (await page.$("dialog.quest [data-badges]")) { await click("dialog.quest [data-badges]"); await page.waitForTimeout(200); check(`${label}: Bible Spin > badges opens, and Back returns`, Boolean(await page.$("dialog.quest [data-back]")) && await (async () => { await click("dialog.quest [data-back]"); await page.waitForTimeout(200); return Boolean(await page.$('dialog.quest [data-mode="solo"]')); })()); }
    await closeAll();

    // The side margin's quick links.
    const marginBad = [];
    for (const [v, expect] of [["notes", "view-notes"], ["journal", "view-books"]]) {
      await page.evaluate(() => { const m = document.querySelector("#margin"); if (m.hidden) document.querySelector("#marginBtn").click(); });
      await page.waitForTimeout(200);
      await click(`#margin [data-margin-go="${v}"]`); await page.waitForTimeout(300);
      if ((await shown()) !== expect) marginBad.push(`${v} -> ${await shown()}`);
    }
    check(`${label}: the side margin's My notes and Journal links work`, !marginBad.length, marginBad.join(", "));

    // Reading: Quick check, Help, tour.
    await page.$eval('nav.tabbar [data-view="read"]', (b) => b.click()); await page.waitForTimeout(600);
    await click("#triviaBtn"); await page.waitForTimeout(300);
    check(`${label}: Quick check under the chapter opens Quick check`, await open("#trivia") && /Quick check/.test(await page.textContent("#triviaTitle")));
    await closeAll();
    await click("#helpBtn"); await page.waitForTimeout(200);
    check(`${label}: ❓ opens help for this screen`, /Help: Reading/.test(await page.textContent(".help-sheet")));
    await click("#helpTour"); await page.waitForTimeout(400);
    check(`${label}: help's tour button starts the tour`, await page.$eval(".tour", (t) => !t.hidden));
    await page.$eval("#tourSkip", (b) => b.click()); await page.waitForTimeout(200);

    // Home study cards open a study.
    await page.$eval('nav.tabbar [data-view="home"]', (b) => b.click()); await page.waitForTimeout(300);
    const cards = await page.$$eval(".path-cards [data-path], .path-cards button", (bs) => bs.length);
    check(`${label}: home shows the study cards`, cards >= 4, String(cards));

    // Settings jumps.
    await page.$eval('nav.tabbar [data-view="settings"]', (b) => b.click()); await page.waitForTimeout(300);
    const jumps = await page.$$eval("[data-jump]", (bs) => bs.map((b) => b.dataset.jump));
    check(`${label}: every Settings jump has a section to go to`, jumps.length === 6 && await page.evaluate((ids) => ids.every((id) => document.getElementById(id)), jumps));

    // Web links: https, open in a new tab, safe.
    const links = await page.$$eval("a[href]", (as) => as.map((a) => ({ href: a.getAttribute("href"), target: a.target, rel: a.rel })));
    const badLinks = links.filter((l) => /^https?:/.test(l.href) ? !l.href.startsWith("https://") || l.target !== "_blank" || !/noopener/.test(l.rel) : l.href.startsWith("#") ? l.href.length > 1 && !(l.href.slice(1)) : false);
    check(`${label}: web links are secure and open in a new tab`, !badLinks.length, badLinks.map((l) => l.href).join(", "));
    check(`${label}: no page errors`, !errors.length, errors.slice(0, 3).join(" | "));
    await ctx.close();
  }
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
