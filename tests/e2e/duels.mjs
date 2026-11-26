// Family duels in Bible Spin, with two family members on their own devices against a pretend
// Supabase: joining, a challenge, the same 10 questions for both, scores, results, and the
// friendly message before the Supabase step is done.
// Run: node tests/e2e/duels.mjs
import { chromium, serve, check, finish, fakeSupabase, signInPage, SUPA } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
const people = [
  { id: "mel", email: "mel@example.com", password: "grace-2026", app: { role: "organizer" }, meta: { own_password: true } },
  { id: "dad", email: "dad@example.com", password: "olive-tree-7", meta: { own_password: true } },
];
const fake = fakeSupabase(people);
const seed = (name) => ({ setup: { done: true }, tourSeen: true, newsOff: true, name, graphics: "simple", quest: { sound: false } });
const text = (page, sel) => page.$eval(sel, (el) => el.textContent.replace(/\s+/g, " ").trim()).catch(() => "");
const shot = (page, name) => (process.env.SHOTS ? page.screenshot({ path: `${process.env.SHOTS}/${name}.png` }) : null); // pictures for the family
const tap = (page, sel) => page.$eval(`dialog.quest ${sel}`, (b) => b.click());
async function open(name, email, password) {
  const { ctx, page } = await signInPage(browser, site.url, fake, { seed: seed(name) });
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.fill("#gateEmail", email); await page.fill("#gatePassword", password);
  await page.click("#gateForm button[type=submit]"); await page.waitForTimeout(1200);
  return { ctx, page };
}
async function spin(page) { await page.click("#homeGames"); await page.waitForTimeout(500); }
// Answer all 10: right (or wrong) on purpose, and remember which questions came up.
async function playAll(page, right) {
  const seen = [];
  for (let i = 0; i < 10; i++) {
    await page.waitForSelector("dialog.quest .q-choice:not([disabled])", { timeout: 5000 });
    seen.push(await page.evaluate(async (r) => {
      const { TRIVIA } = await import("/js/trivia-bank.js");
      const q = TRIVIA.find((x) => x.q === document.querySelector(".q-card p").textContent);
      const b = [...document.querySelectorAll(".q-choice")].find((c) => (Number(c.dataset.k) === q.a) === r);
      b.click();
      return q.id;
    }, right));
    await page.waitForTimeout(650);
  }
  await page.waitForTimeout(500);
  return seen;
}

let stopped = null;
try {
  const mel = await open("Mel", "mel@example.com", "grace-2026");
  await spin(mel.page);
  check("Family duel shows in Bible Spin for a signed-in family", Boolean(await mel.page.$("dialog.quest [data-duel]")));
  await tap(mel.page, "[data-duel]"); await mel.page.waitForTimeout(500);
  check("first time, it explains what's shared and asks to join", /Only your first name/.test(await text(mel.page, "dialog.quest")) && Boolean(await mel.page.$("dialog.quest [data-join]")));
  await tap(mel.page, "[data-join]"); await mel.page.waitForTimeout(600);
  check("after joining, nobody else is listed yet", /Nobody else has joined yet/.test(await text(mel.page, "dialog.quest")));
  const joinCall = fake.calls.findLast((c) => c.path === "/rest/v1/duel_players" && c.method === "POST");
  check("joining shares only a first name", joinCall && Object.keys(joinCall.body).sort().join() === "name,updated_at,user_id" && joinCall.body.name === "Mel", JSON.stringify(joinCall?.body));

  const dad = await open("Dad", "dad@example.com", "olive-tree-7");
  await spin(dad.page); await tap(dad.page, "[data-duel]"); await dad.page.waitForTimeout(500);
  await tap(dad.page, "[data-join]"); await dad.page.waitForTimeout(600);
  check("Dad sees Mel to challenge", (await text(dad.page, "dialog.quest .q-dwho")).includes("Mel"));
  await tap(dad.page, "[data-vs]"); await dad.page.waitForTimeout(300);
  await shot(dad.page, "duel-challenge");
  check("the challenge explains the rules", /one from every friend on the wheel/.test(await text(dad.page, "dialog.quest")));
  await tap(dad.page, "[data-go]");
  const dadQs = await playAll(dad.page, true);
  check("Dad gets 10 different questions", new Set(dadQs).size === 10);
  check("after playing, the challenge is sent", /Challenge sent! Mel will see it/.test(await text(dad.page, "dialog.quest")), await text(dad.page, "dialog.quest"));
  const row = fake.duelRows[0];
  check("the duel holds the questions and Dad's score only", row && row.from_id === "dad" && row.to_id === "mel" && row.from_marks === "1111111111" && row.from_score >= 100 && row.to_score === null && row.questions.join() === dadQs.join(), JSON.stringify(row));

  // Mel sees it waiting the next time Bible Spin opens.
  await mel.page.$eval("dialog.quest [data-home]", (b) => b.click()); await mel.page.waitForTimeout(800);
  check("the home screen shows a duel waiting", /1 waiting/.test(await text(mel.page, "dialog.quest [data-duel]")), await text(mel.page, "dialog.quest [data-duel]"));
  await tap(mel.page, "[data-duel]"); await mel.page.waitForTimeout(600);
  check("Your turn: Dad challenged you", /Your turn\s*Dad challenged you/.test(await text(mel.page, "dialog.quest")));
  await shot(mel.page, "duel-your-turn");
  await tap(mel.page, "[data-play]");
  const melQs = await playAll(mel.page, false);
  check("Mel gets the very same questions in the same order", melQs.join() === dadQs.join());
  check("result: Dad won, with both rows of answers", /Dad won this one!/.test(await text(mel.page, "dialog.quest")) && (await mel.page.$$("dialog.quest .q-dmarks i.y")).length === 10, await text(mel.page, "dialog.quest"));
  await shot(mel.page, "duel-result");
  check("Mel's score is saved on the duel and it's finished", fake.duelRows[0].to_marks === "0000000000" && fake.duelRows[0].to_score === 0 && Boolean(fake.duelRows[0].finished_at));
  const patches = fake.calls.filter((c) => c.path === "/rest/v1/duels" && c.method === "PATCH");
  check("Mel only ever writes her own score", patches.length === 1 && !("from_score" in patches[0].body));

  await dad.page.$eval("dialog.quest [data-again]", (b) => b.click()); await dad.page.waitForTimeout(700);
  check("Dad sees the result: he won", /You 10 · Mel 0\s*You won!/.test(await text(dad.page, "dialog.quest .q-dlist")), await text(dad.page, "dialog.quest"));

  // Before the Supabase step: a kind message instead of an error.
  const fresh = await open("Mel", "mel@example.com", "grace-2026");
  await fresh.ctx.route((u) => u.href.startsWith(`${SUPA}/rest/v1/duel`), (r) => r.fulfill({ status: 404, headers: { "access-control-allow-origin": "*" }, json: { code: "PGRST205", message: "Could not find the table 'public.duels' in the schema cache" } }));
  await spin(fresh.page); await tap(fresh.page, "[data-duel]"); await fresh.page.waitForTimeout(600);
  check("before the Supabase step it says duels are almost ready", /almost ready/.test(await text(fresh.page, "dialog.quest")), await text(fresh.page, "dialog.quest"));

  // Without sign-in (a copy of the app with no family accounts) there's no Family duel button.
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  await ctx.addInitScript((s) => localStorage.setItem("bible-study:v1", JSON.stringify(s)), { ...seed("Kim"), apiBibleKey: "k", nasbBibleId: "x" });
  const solo = await ctx.newPage(); solo.errors = []; solo.on("pageerror", (e) => solo.errors.push(e.message));
  await solo.goto(site.url); await solo.waitForTimeout(900); await spin(solo);
  check("no Family duel without family sign-in", !(await solo.$("dialog.quest [data-duel]")));

  const errs = [...mel.page.errors, ...dad.page.errors, ...fresh.page.errors, ...solo.errors];
  check("no page errors", errs.length === 0, errs.join(" | "));
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
