// Bible Spin from start to finish: the wheel, the candle timer, coins, jewels, solo hearts,
// a fair game against Buddy, passing the device in a family game, and the practice quiz.
// Run: node tests/e2e/quest.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", quest: { coins: 100, sound: false } })); });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.clock.install();
  await page.goto(site.url); await page.clock.runFor(1500);
  const tap = (sel) => page.$eval(sel.startsWith("#") ? sel : `dialog.quest ${sel}`, (b) => b.click());
  const text = (sel) => page.$eval(sel, (el) => el.textContent.replace(/\s+/g, " ").trim()).catch(() => "");
  const coins = async () => Number((await text(".q-coins b")).replace(/,/g, ""));
  // Spin and wait for the question to fly in.
  const spin = async () => { await tap("[data-spin]"); await page.clock.runFor(3000); };
  // Answer right or wrong, using the question bank to know which is which.
  const answerIt = async (right) => page.evaluate(async (want) => {
    const { TRIVIA } = await import("/js/trivia-bank.js");
    const qText = document.querySelector(".q-card p").textContent;
    const q = TRIVIA.find((x) => x.q === qText);
    const btn = [...document.querySelectorAll(".q-choice")].find((b) => !b.disabled && (Number(b.dataset.k) === q.a) === want);
    btn.click();
  }, right);

  await page.click("#homeGames"); await page.clock.runFor(300);
  check("Bible games opens Bible Spin", await page.$eval("dialog.quest", (d) => d.open));
  check("three big ways to play", (await page.$$("dialog.quest [data-mode]")).length === 3);

  // Solo
  await tap('[data-mode="solo"]'); await page.clock.runFor(300);
  check("solo shows a jewel for every category and three hearts", (await page.$$(".q-pl .q-jewel")).length === 7 && /❤️❤️❤️/.test(await text(".q-hearts")));
  await spin();
  check("a question flies in with a category, a candle and four choices", Boolean(await page.$(".q-cat")) && Boolean(await page.$(".q-candle")) && (await page.$$(".q-choice")).length === 4);
  const before = await coins();
  await page.clock.runFor(2000);
  await answerIt(true); await page.clock.runFor(1500);
  check("a quick right answer earns coins", /\+\d+ 🪙/.test(await text(".q-gain")) && (await coins()) > before, `${before} -> ${await coins()}`);
  await tap("[data-next]"); await page.clock.runFor(300);
  check("one of two steps toward that jewel is marked", (await page.$$(".q-pl .q-pips b.on")).length === 1);
  // The candle runs out.
  await spin();
  await page.clock.runFor(21000); await page.clock.runFor(1500);
  check("when the candle burns down, it counts as a miss", /candle went out/.test(await text(".q-fb h2")));
  check("the right answer and its verse are shown", /The answer:/.test(await text(".q-why")));
  await tap("[data-next]"); await page.clock.runFor(300);
  check("a miss costs a heart", /❤️❤️🤍/.test(await text(".q-hearts")));
  // Helps cost coins.
  await spin();
  const c0 = await coins();
  await tap('[data-help="half"]'); await page.clock.runFor(100);
  check("'Take away 2' removes two wrong answers and costs 30 coins", (await page.$$(".q-choice.gone")).length === 2 && (await coins()) === c0 - 30);
  await answerIt(false); await page.clock.runFor(1500); await tap("[data-next]"); await page.clock.runFor(300);
  await spin(); await answerIt(false); await page.clock.runFor(1500);
  await tap("[data-next]"); await page.clock.runFor(500);
  check("three misses end a solo game", /of 7 jewels|Good try/.test(await text(".q-end h2")), await text(".q-end h2"));
  await tap("[data-home]"); await page.clock.runFor(300);

  // Challenge Buddy
  await tap('[data-mode="buddy"]'); await page.clock.runFor(300);
  check("Buddy's levels say how often he gets it right", /about 5 out of 10/.test(await text(".q-levels")));
  await tap('[data-lv="easy"]'); await page.clock.runFor(300);
  await spin(); await answerIt(false); await page.clock.runFor(1500);
  check("after a miss it's Buddy's turn", /Buddy's turn/.test(await text("[data-next]")));
  await tap("[data-next]"); await page.clock.runFor(300);
  check("Buddy spins by himself", /Buddy is spinning/.test(await text(".q-turn")));
  await page.clock.runFor(4000);
  check("Buddy thinks before answering, and can't use helps", /Buddy is thinking/.test(await text(".q-turn")) && !(await page.$("[data-help]")) && await page.$eval(".q-choice", (b) => b.disabled));
  await page.clock.runFor(10000);
  check("then Buddy answers", Boolean(await page.$(".q-fb")) || Boolean(await page.$(".q-board")) || Boolean(await page.$(".q-ask")));
  page.once("dialog", (d) => d.accept());
  await page.$eval("[data-close]", (b) => b.click()).catch(() => {});
  await page.clock.runFor(300);
  check("closing mid-game shuts Bible Spin", !(await page.$eval("dialog.quest", (d) => d.open)));

  // Family
  await page.click("#homeGames"); await page.clock.runFor(300);
  await tap('[data-mode="family"]'); await page.clock.runFor(200);
  await tap("[data-add]"); await page.fill('[data-name="1"]', "Grandpa"); await page.clock.runFor(100);
  check("family: the players' names can be read (dark on white)", await page.$eval('[data-name="1"]', (i) => { const s = getComputedStyle(i); return s.webkitTextFillColor !== s.backgroundColor && s.color !== s.backgroundColor; }));
  await tap("[data-go]"); await page.clock.runFor(300);
  check("family: pass the device to the first player", /Pass the device to/.test(await text(".q-pass")) && /Mel/.test(await text(".q-pass h2")));
  await tap("[data-ready]"); await page.clock.runFor(300);
  check("family: no paid helps, so it stays fair", (await page.$$(".q-pl")).length === 2);
  await spin();
  check("family: helps aren't offered", !(await page.$("[data-help]")));
  await answerIt(false); await page.clock.runFor(1500); await tap("[data-next]"); await page.clock.runFor(300);
  check("family: a miss passes the device to the next player", /Grandpa/.test(await text(".q-pass h2")));
  page.once("dialog", (d) => d.accept());
  await page.$eval("[data-close]", (b) => b.click()); await page.clock.runFor(300);

  // Practice quiz is still there.
  await page.click("#homeGames"); await page.clock.runFor(300);
  await tap("[data-practice]"); await page.clock.runFor(300);
  check("'Practice one part of the Bible' opens the practice quiz", await page.$eval("dialog.game", (d) => d.open));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
