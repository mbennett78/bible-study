// Study words: a light dotted line under the names of God and the chapter's key words,
// so readers know they can tap them for the concordance. Hidden in "Bible only" and when
// turned off in Settings. Run: node tests/e2e/studywords.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 } });
  const V = ["In the beginning God created the heavens and the earth.", "And the earth was a formless and desolate emptiness, and darkness was over the surface of the deep.", "Then God said, “Let there be light”; and there was light."];
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: V.map((t, i) => `<p><span data-number="${i + 1}" class="v">${i + 1}</span>${t}</p>`).join(""), copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, wordTipSeen: true, name: "Mel", buddyName: "Pip", last: { book: "GEN", chapter: 1 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(1200);
  const words = await page.$$eval("#reader .sw", (a) => a.map((s) => s.textContent));
  check("key words get a dotted line", ["beginning", "God", "created", "light"].every((w) => words.includes(w)), words.join(", "));
  check("small words don't", !words.some((w) => /^(the|and|was|in)$/i.test(w)));
  check("the line is dotted and light", await page.$eval("#reader .sw", (s) => /dotted/.test(getComputedStyle(s).textDecorationStyle || getComputedStyle(s).textDecoration)));
  check("verse numbers are untouched", await page.$$eval("#reader .v", (a) => a.every((v) => !v.querySelector(".sw"))));
  check("the words read the same as before", (await page.textContent("#reader")).includes("In the beginning God created the heavens and the earth."));
  await page.click("#reader .sw >> text=created"); await page.waitForTimeout(800);
  check("tapping one opens its Hebrew word", /H1254|bârâʼ/.test(await page.textContent("dialog[open]")));
  await page.keyboard.press("Escape"); await page.waitForTimeout(200);
  await page.click('[data-readmode="plain"]');
  check("Bible only hides the lines", await page.$eval("#reader .sw", (s) => getComputedStyle(s).textDecorationLine === "none"));
  await page.click('[data-readmode="study"]');
  await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(200);
  await page.evaluate(() => { const c = document.querySelector("#studyWords"); c.checked = false; c.dispatchEvent(new Event("change")); });
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(200);
  check("a Settings switch turns the lines off", await page.$eval("#reader .sw", (s) => getComputedStyle(s).textDecorationLine === "none"));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
