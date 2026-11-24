// Bible versions: each version shows its own words with the right verse numbers, switching
// mid-chapter keeps your place, the ESV is asked for the right passage (including one-chapter
// books), and changing NASB editions never shows the other edition's saved words.
// Run: node tests/e2e/versions.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
const esvAsked = [];
const apiAsked = [];
const verses = (n, label) => Array.from({ length: n }, (_, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>${label} words of verse ${i + 1}. ${"More words here. ".repeat(6)}</p>`).join("");
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => {
    const u = new URL(r.request().url());
    apiAsked.push(u.pathname);
    const id = u.pathname.split("/")[3];
    const label = { nasb95: "NASB1995", nasb20: "NASB2020", kjv: "KJV", bsb: "BSB" }[id] || id;
    r.fulfill({ json: { data: { content: verses(30, label), copyright: `${label} copyright line` } } });
  });
  await ctx.route(/api\.esv\.org/, (r) => {
    const q = new URL(r.request().url()).searchParams.get("q");
    esvAsked.push(q);
    const body = `<h2>${q}</h2><p><b class="chapter-num">3:1</b>ESV words of verse 1.</p>` + Array.from({ length: 29 }, (_, i) => `<p><b class="verse-num">${i + 2}</b>ESV words of verse ${i + 2}. ${"More words here. ".repeat(6)}</p>`).join("");
    r.fulfill({ json: { passages: [body] } });
  });
  await ctx.addInitScript(() => {
    if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({
      apiBibleKey: "k", nasbBibleId: "nasb95", nasbLabel: "NASB1995", esvKey: "e", extraBibles: [{ id: "kjv", label: "KJV" }],
      setup: { done: true }, tourSeen: true, name: "Test", last: { book: "JHN", chapter: 3 },
    }));
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(700);
  const reader = () => page.$eval("#reader", (el) => el.textContent);
  // The quick switch at the top of Read: one "NASB ▾" pill listing every version.
  const versionButtons = () => page.$$eval(".version-switch select option", (a) => a.map((o) => o.textContent + (o.selected ? "*" : "")));
  check("the quick switch at the top lists every version", JSON.stringify(await versionButtons()) === JSON.stringify(["NASB1995*", "KJV", "ESV"]), JSON.stringify(await versionButtons()));
  check("NASB text shown", (await reader()).includes("NASB1995 words of verse 1"));
  check("copyright shown for the NASB", (await page.textContent("#copyright")).includes("NASB1995 copyright"));

  // Read down to verse 12, then switch to the ESV.
  await page.$eval('#reader [data-number="12"]', (el) => { const top = document.querySelector(".topbar")?.getBoundingClientRect().bottom || 0; scrollTo(0, scrollY + el.getBoundingClientRect().top - top - 12); });
  await page.waitForTimeout(200);
  await page.selectOption(".version-switch select", "ESV"); await page.waitForTimeout(900);
  check("ESV text shown after switching", (await reader()).includes("ESV words of verse 1") && !(await reader()).includes("NASB1995 words"));
  check("ESV asked for John 3", esvAsked.at(-1) === "John 3", esvAsked.at(-1));
  check("ESV copyright shown", /English Standard Version/.test(await page.textContent("#copyright")));
  const keptPlace = await page.$$eval("#reader .verse-num", (a) => { const top = document.querySelector(".topbar")?.getBoundingClientRect().bottom || 0; const m = a.find((x) => x.getBoundingClientRect().top >= top); return m ? Number(m.textContent) : 0; });
  check("switching mid-chapter keeps your place", keptPlace >= 10 && keptPlace <= 14, `top verse ${keptPlace}`);

  await page.selectOption(".version-switch select", "B:kjv"); await page.waitForTimeout(900);
  check("KJV text shown", (await reader()).includes("KJV words of verse 1"));
  check("the chosen version is remembered", await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).version === "B:kjv"));
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(700);
  check("still KJV after reopening", (await reader()).includes("KJV words") && (await versionButtons()).includes("KJV*"));

  // ESV: one-chapter books and the Song of Solomon.
  await page.selectOption(".version-switch select", "ESV"); await page.waitForTimeout(600);
  for (const [book, ch, want] of [["JUD", 1, "Jude 1:1-25"], ["OBA", 1, "Obadiah 1:1-21"], ["3JN", 1, "3 John 1:1-15"], ["SNG", 2, "Song of Solomon 2"], ["PSA", 119, "Psalms 119"]]) {
    await page.evaluate(([b, c]) => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.last = { book: b, chapter: c }; localStorage.setItem("bible-study:v1", JSON.stringify(s)); }, [book, ch]);
    esvAsked.length = 0;
    await page.reload(); await page.waitForTimeout(800);
    check(`ESV asks for "${want}"`, esvAsked.includes(want), esvAsked.join(", "));
  }

  // Changing NASB editions never shows the other edition's saved words.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(400);
  await page.selectOption(".version-switch select", "NASB"); await page.waitForTimeout(700);
  check("NASB 1995 shown", (await reader()).includes("NASB1995 words"));
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.nasbBibleId = "nasb20"; s.nasbLabel = "NASB2020"; localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(500);
  check("a new NASB edition shows its own words, not the saved copy", (await reader()).includes("NASB2020 words"));

  // Many versions still fit in the same pill.
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.extraBibles = ["kjv", "bsb", "asv", "web", "lsv", "fbv"].map((id) => ({ id, label: id.toUpperCase() })); localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(500);
  check("many versions all show in the pill", (await page.$$eval(".version-switch select option", (o) => o.length)) === 8);
  await page.selectOption(".version-switch select", "B:bsb"); await page.waitForTimeout(800);
  check("dropdown switches the text", (await reader()).includes("BSB words"));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();

  // Settings lists every version on the plan by itself: the NASB 2020 becomes the family's
  // main version, the well-known others are turned on, and they all reach the switch on Read.
  {
    const c2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await c2.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
    const plan = [["NASB1995", "New American Standard Bible 1995", "n95"], ["NASB", "New American Standard Bible 2020", "n20"], ["NIV", "New International Version", "niv"], ["KJV", "King James Version", "kjv"], ["BSB", "Berean Standard Bible", "bsb"]];
    await c2.route(/api\.bible/, (r) => {
      const u = new URL(r.request().url());
      if (/\/bibles$/.test(u.pathname)) return r.fulfill({ json: { data: plan.map(([abbreviation, name, id]) => ({ id, abbreviation, name })) } });
      r.fulfill({ json: { data: { content: verses(30, u.pathname.split("/")[3]), copyright: "c" } } });
    });
    await c2.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "n95", nasbLabel: "NASB", setup: { done: true }, tourSeen: true, name: "Mel", last: { book: "JHN", chapter: 3 } })); });
    const p2 = await c2.newPage();
    const errs = []; p2.on("pageerror", (e) => errs.push(e.message));
    await p2.goto(site.url); await p2.waitForTimeout(900);
    await p2.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await p2.waitForTimeout(900);
    const main = await p2.$$eval("#nasbSelect option", (o) => o.map((x) => x.textContent.split(" · ")[0] + (x.selected ? "*" : "")));
    check("plan versions: the main list fills in by itself, with clear names", ["NASB 1995", "NASB 2020*", "NIV", "KJV"].every((v) => main.includes(v)), JSON.stringify(main));
    check("plan versions: no opinion in the label", !/is best/.test(await p2.textContent("#bibleTextCard")));
    const on = await p2.$$eval("#extraVersionList input:checked", (a) => a.map((i) => i.dataset.label));
    check("plan versions: the well-known ones are all turned on", ["NASB 1995", "NIV", "KJV"].every((v) => on.includes(v)), JSON.stringify(on));
    await p2.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await p2.waitForTimeout(700);
    const sw = await p2.$$eval(".version-switch select option", (a) => a.map((o) => o.textContent));
    check("plan versions: the switch on Read lists them all", ["NASB 2020", "NASB 1995", "NIV", "KJV"].every((v) => sw.includes(v)), JSON.stringify(sw));
    check("plan versions: reading the NASB 2020", (await p2.textContent("#reader")).includes("n20 words"));
    check("plan versions: no page errors", !errs.length, errs.join(" | "));
    await c2.close();
  }
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
