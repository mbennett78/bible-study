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
  const pickText = (text, right) => page.$$eval("dialog.game [data-pick]", (bs, [t, r]) => { const b = bs.find((x) => (x.querySelector(".g-choice").textContent === t) === r); b.click(); }, [text, right]);

  // Solo: Gospels, 5 questions, every answer right.
  await page.click("#homeGames"); await page.waitForTimeout(200);
  await page.click("dialog.quest [data-practice]"); await page.waitForTimeout(200);
  check("the practice quiz opens from Bible Quest", await page.$eval("dialog.game", (d) => d.open));
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
    const why = await txt(".g-why");
    check(`solo question ${i + 1} marked right`, /✓/.test(why));
    if (i === 2) check("three right in a row gets a streak shout", /3 in a row/.test(why), why);
    if (i === 4) check("five in a row is on fire", /5 in a row/.test(why), why);
    await page.click("#gNext");
  }
  check("no question repeats in a game", new Set(asked).size === 5);
  check("perfect score shown", /5 of 5/.test(await txt(".g-big")));
  check("buddy cheers at 80% or more", Boolean(await g(".buddy-inline.cheering")));
  check("confetti in the look's colors", Boolean(await g(".g-confetti")));
  const notes = await txt(".g-mine-notes");
  check("stars earned are shown", /15\s*stars earned/.test(await txt(".g-won-stars")), await txt(".g-won-stars"));
  check("new badges are celebrated", /First game/.test(await txt(".g-new-badges")) && /Perfect score/.test(await txt(".g-new-badges")), await txt(".g-new-badges"));
  check("the first level-up is celebrated", /now a Sprout/.test(await txt(".g-levelup")), await txt(".g-levelup"));
  check("solo results show progress in that part of the Bible", /Gospels: 5 of \d+ questions answered right \(5 new today\)/.test(notes), notes);
  check("and the longest run", /Longest run: 5 in a row/.test(notes), notes);

  // My progress on the setup screen, and a weekly goal.
  await page.click("#gChange"); await page.waitForTimeout(100);
  const mine = await txt(".g-mine");
  check("my progress shows when quizzing myself", /Gospels:.*5 of \d+.*best score 100%/.test(mine), mine);
  check("quick answers earned stars and a level", /Level 2 · Sprout/.test(mine) && /15 stars/.test(mine), mine);
  check("badges earned are shown, the rest locked", (await page.$$("dialog.game .g-badges li.won")).length >= 3 && (await page.$$("dialog.game .medal.locked")).length >= 5);
  await page.click("dialog.game .g-mine details:last-of-type summary");
  await page.click('dialog.game [data-goal="10"]'); await page.waitForTimeout(100);
  check("a weekly goal can be set", /This week:.*5 of 10 questions/.test(await txt(".g-mine")), await txt(".g-mine"));
  check("the goal is kept", await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).game.mine.goal === 10));
  await page.click("#gStart");
  for (let i = 0; i < 5; i++) { await pickText(rightAnswer(await txt(".g-q")), false); await page.click("#gNext"); }
  check("reaching the weekly goal is celebrated", /reached your goal of 10/.test(await txt(".g-mine-notes")), await txt(".g-mine-notes"));
  check("even a low score cheers when the goal is reached", Boolean(await g(".buddy-inline.cheering")));
  await page.click("#gChange"); await page.waitForTimeout(100);
  await page.click('dialog.game [data-scope="revelation"]'); await page.click('dialog.game [data-topic="science"]');
  check("a part with no questions of a kind says so", /No questions of this kind/.test(await txt("#gAvail")));
  await page.click("#gStart");
  check("and won't start an empty game", /no questions of that kind/i.test(await txt("#gErr")));
  await page.click('dialog.game [data-scope="all"]'); await page.click('dialog.game [data-topic="books"]'); await page.click('dialog.game [data-count="5"]');
  await page.click("#gStart");
  const bookText = await txt(".g-q"); const bookQ = TRIVIA.find((t) => t.q === bookText);
  check("a kind of question deals only that kind", bookQ && bookQ.topic === "books", bookQ && bookQ.q);
  await page.click("dialog.game [data-close]"); await page.waitForTimeout(100);
  await page.click('dialog.game [data-topic="any"]'); await page.click('dialog.game [data-scope="gospels"]');
  await page.click("#gStart");
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
  await page.click("dialog.quest [data-practice]"); await page.waitForTimeout(100);
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
