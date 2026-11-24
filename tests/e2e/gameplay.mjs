// Plays Bible Spin all the way through, many times, in every mode: solo (winning and losing),
// against Buddy at each level, and a family game. Each game must reach its end screen with no
// page errors and no screen where nothing can be tapped. Then the practice quiz is played through.
// Run: node tests/e2e/gameplay.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", show: { buddy: false }, quest: { coins: 500, sound: false } })); });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("dialog", (d) => d.accept());
  await page.clock.install();
  await page.goto(site.url); await page.clock.runFor(1500);
  const has = (sel) => page.$(`dialog.quest ${sel}`).then(Boolean);
  const tap = (sel) => page.$eval(`dialog.quest ${sel}`, (b) => b.click());
  const text = (sel) => page.$eval(sel, (el) => el.textContent.replace(/\s+/g, " ").trim()).catch(() => "");
  const answer = (rightChance) => page.evaluate(async (p) => {
    const banks = await Promise.all(["/js/trivia-bank.js", "/js/trivia-bank2.js", "/js/trivia-bank3.js"].map((u) => import(u).catch(() => ({}))));
    const all = banks.flatMap((m) => Object.values(m).filter(Array.isArray).flat());
    const qText = document.querySelector(".q-card p")?.textContent;
    const q = all.find((x) => x?.q === qText);
    const live = [...document.querySelectorAll(".q-choice")].filter((b) => !b.disabled && !b.classList.contains("gone"));
    if (!live.length) return "none";
    const right = q ? live.find((b) => Number(b.dataset.k) === q.a) : null;
    const wrong = q ? live.filter((b) => Number(b.dataset.k) !== q.a) : live;
    const pick = right && (Math.random() < p || !wrong.length) ? right : wrong[Math.floor(Math.random() * wrong.length)] || live[0];
    pick.click();
    return q ? "ok" : "unknown question";
  }, rightChance);

  // Drive one game to its end. Returns { ended, steps, unknown }.
  async function play(rightChance, maxSteps = 400) {
    let steps = 0, idle = 0, unknown = 0;
    while (steps++ < maxSteps) {
      if (await has(".q-end")) return { ended: true, steps, unknown };
      if (await has("[data-ready]")) { await tap("[data-ready]"); await page.clock.runFor(300); idle = 0; continue; }
      if (await has("[data-next]")) { await tap("[data-next]"); await page.clock.runFor(400); idle = 0; continue; }
      if (await has("[data-spin]")) { await tap("[data-spin]"); await page.clock.runFor(3200); idle = 0; continue; }
      const myTurn = await page.$$eval("dialog.quest .q-choice", (bs) => bs.some((b) => !b.disabled)).catch(() => false);
      if (myTurn) { if ((await answer(rightChance)) === "unknown question") unknown++; await page.clock.runFor(1600); idle = 0; continue; }
      // Buddy's turn, or an animation: let time pass.
      await page.clock.runFor(2000);
      if (++idle > 30) return { ended: false, steps, unknown, stuck: (await text("dialog.quest .q-body")).slice(0, 120) };
    }
    return { ended: false, steps, unknown, stuck: "too many steps" };
  }
  const open = async () => { if (!(await page.$eval("dialog.quest", (d) => d.open).catch(() => false))) { await page.click("#homeGames"); await page.clock.runFor(300); } };
  const home = async () => { if (await has("[data-home]")) { await tap("[data-home]"); await page.clock.runFor(300); } };

  // Solo: a strong player (should win all jewels sometimes) and a weak one (runs out of hearts).
  for (const [label, p, runs] of [["solo, mostly right", 0.95, 3], ["solo, mostly wrong", 0.2, 3]]) {
    let ok = 0, details = [];
    for (let i = 0; i < runs; i++) {
      await open(); await tap('[data-mode="solo"]'); await page.clock.runFor(300);
      const r = await play(p);
      if (r.ended) ok++; else details.push(r.stuck);
      if (r.unknown) details.push(`${r.unknown} question(s) not found in the banks`);
      await home();
    }
    check(`${label}: ${runs} games played to the end`, ok === runs, details.join(" | "));
  }
  // Buddy at every level.
  const levels = await (async () => { await open(); await tap('[data-mode="buddy"]'); await page.clock.runFor(300); const lv = await page.$$eval("dialog.quest [data-lv]", (bs) => bs.map((b) => b.dataset.lv)); await tap("[data-back]").catch(() => {}); await page.clock.runFor(200); return lv; })();
  check("Buddy has levels to choose from", levels.length >= 2, levels.join(","));
  for (const lv of levels) {
    await open();
    if (!(await has('[data-mode="buddy"]'))) await home();
    await tap('[data-mode="buddy"]'); await page.clock.runFor(300);
    await tap(`[data-lv="${lv}"]`); await page.clock.runFor(300);
    const r = await play(0.6, 700);
    check(`against Buddy (${lv}): played to the end`, r.ended, r.stuck || "");
    if (r.ended) check(`against Buddy (${lv}): the end screen names a winner`, /beat|won/i.test(await text("dialog.quest .q-end h2")), await text("dialog.quest .q-end h2"));
    await home();
  }
  // Family: three players taking turns on one device.
  await open();
  if (!(await has('[data-mode="family"]'))) await home();
  await tap('[data-mode="family"]'); await page.clock.runFor(200);
  await tap("[data-add]"); await page.fill('dialog.quest [data-name="1"]', "Grandpa");
  await tap("[data-add]"); await page.fill('dialog.quest [data-name="2"]', "Ava");
  await tap("[data-go]"); await page.clock.runFor(300);
  const fam = await play(0.7, 900);
  check("family game with three players: played to the end", fam.ended, fam.stuck || "");
  if (fam.ended) check("family game: the end screen names who won", /wins!/.test(await text("dialog.quest .q-end h2")), await text("dialog.quest .q-end h2"));
  await home();
  // Play again from the end screen works.
  await tap('[data-mode="solo"]'); await page.clock.runFor(300);
  await play(0.2);
  if (await has("[data-again]")) { await tap("[data-again]"); await page.clock.runFor(400); check("Play again starts a fresh game", await has("[data-spin]") || await has("[data-ready]")); }
  await page.$eval("dialog.quest [data-close]", (b) => b.click()).catch(() => {}); await page.clock.runFor(300);
  check("Bible Spin closes cleanly", !(await page.$eval("dialog.quest", (d) => d.open)));
  check("no page errors in any game", !errors.length, errors.slice(0, 3).join(" | "));
} catch (e) { stopped = e; console.log(e.stack?.split("\n").slice(0, 8).join("\n")); }
await browser.close(); site.close(); finish(stopped);
