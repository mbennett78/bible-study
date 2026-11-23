// Bible games in the browser: quiz yourself, play together with players or teams, turns
// rotate, the timer runs out fairly, scores and the leaderboard are saved, names are
// remembered, and a great score brings confetti and a cheering buddy.
// Run: node tests/e2e/games.mjs
import { chromium, serve, check, finish } from "./harness.mjs";
import { TRIVIA } from "../../js/trivia-bank.js";

const rightAnswer = (qText) => { const q = TRIVIA.find((t) => t.q === qText); return q && q.choices[q.a]; };
const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", style: "christmas" })); });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("dialog", (d) => d.accept());
  await page.goto(site.url); await page.waitForTimeout(800);
  const g = (sel) => page.$(`dialog.game ${sel}`);
  const txt = (sel) => page.$eval(`dialog.game ${sel}`, (e) => e.textContent.trim()).catch(() => "");
  const pickText = (text, right) => page.$$eval("dialog.game [data-pick]", (bs, [t, r]) => { const b = bs.find((x) => (x.textContent === t) === r); b.click(); }, [text, right]);

  // Solo: Gospels, 5 questions, every answer right.
  await page.click("#homeGames"); await page.waitForTimeout(200);
  check("games open from Home", await page.$eval("dialog.game", (d) => d.open));
  await page.click('dialog.game [data-scope="gospels"]');
  await page.click('dialog.game [data-count="5"]');
  await page.click('dialog.game [data-timer="0"]');
  await page.click("#gStart");
  const asked = [];
  for (let i = 0; i < 5; i++) {
    const q = await txt(".g-q"); asked.push(q);
    const ans = rightAnswer(q);
    check(`solo question ${i + 1} is a real Gospels question`, Boolean(ans), q);
    await pickText(ans, true);
    check(`solo question ${i + 1} marked right`, /Right!/.test(await txt(".g-why")));
    await page.click("#gNext");
  }
  check("no question repeats in a game", new Set(asked).size === 5);
  check("perfect score shown", /5 of 5/.test(await txt(".g-big")));
  check("buddy cheers at 80% or more", Boolean(await g(".buddy-inline.cheering")));
  check("confetti in the look's colors", Boolean(await g(".g-confetti")));
  await page.click("#gAgain"); await page.waitForTimeout(100);
  check("play again gives new questions", !asked.includes(await txt(".g-q")));
  await page.click("dialog.game [data-close]"); await page.waitForTimeout(100);

  // Together: three players, 3 questions each, turns rotate.
  await page.click('dialog.game [data-mode="group"]');
  for (const n of ["Grandpa", "Team Blue", "Ava"]) { await page.fill("#gName", n); await page.click("#gAdd"); }
  await page.fill("#gName", "grandpa"); await page.click("#gAdd");
  check("the same name can't be added twice", /already playing/.test(await txt("#gErr")));
  await page.click('dialog.game [data-scope="all"]');
  await page.click('dialog.game [data-count="3"]');
  await page.click('dialog.game [data-timer="15"]');
  await page.click("#gStart");
  const turns = [];
  for (let i = 0; i < 9; i++) {
    const who = (await txt(".g-head h2")).replace("'s turn", "");
    turns.push(who);
    const ans = rightAnswer(await txt(".g-q"));
    if (i === 0) {
      await page.waitForTimeout(15600); // let Grandpa's first timer run out
      check("timer runs out and counts as a miss", /Time's up/.test(await txt(".g-why")));
      check("the right answer is shown when time runs out", Boolean(await g("[data-pick].right")));
    } else await pickText(ans, who === "Ava");
    await page.click("#gNext");
  }
  check("turns rotate between players", turns.join(",") === "Grandpa,Team Blue,Ava,Grandpa,Team Blue,Ava,Grandpa,Team Blue,Ava", turns.join(","));
  check("winner announced", /Ava wins/.test(await txt(".g-head h2")));
  check("scores listed for everyone", (await page.$$("dialog.game .g-results li")).length === 3);
  await page.click("#gChange"); await page.waitForTimeout(100);
  check("leaderboard saved", /Ava/.test(await txt(".g-board")) && /Grandpa/.test(await txt(".g-board")));
  await page.reload(); await page.waitForTimeout(700);
  await page.click("#homeGames"); await page.waitForTimeout(100);
  check("players are remembered for next time", (await page.$$("dialog.game .g-player")).length === 3);
  await page.click('dialog.game [data-drop="0"]');
  check("a saved name can be tapped to add back", Boolean(await g('[data-known="Grandpa"]')));
  for (let i = 0; i < 19; i++) { await page.fill("#gName", `P${i}`); await page.click("#gAdd"); }
  check("no more than 20 players", (await page.$$("dialog.game .g-player")).length === 20 && /Up to 20/.test(await txt("#gErr")));
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.show = { games: false }; localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
  await page.reload(); await page.waitForTimeout(700);
  check("hidden when turned off in the ⋮ menu", !(await page.$eval("#homeGames", (b) => getComputedStyle(b).display !== "none")));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
