// Never lost: reading something off the path offers one tap back to your place, the book
// introduction stays folded so the Bible text comes first, the buddy tucks aside while you
// read, and a path brought in without a start date (from another device) doesn't break Home.
// Run: node tests/e2e/navigation.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: Array.from({ length: 30 }, (_, i) => `<p><span class="v" data-number="${i + 1}">${i + 1}</span>Verse words ${"here ".repeat(20)}</p>`).join("") } } }));
  // No pathStarted on purpose: as if the path came from another device's backup.
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, activePath: "general", pathRead: { general: { "GEN.1": "2026-11-20T00:00:00Z", "GEN.2": "2026-11-21T00:00:00Z" } }, last: { book: "PSA", chapter: 23 } })); });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  check("Home shows even when a path has no start date", (await page.$$("#homeView .resume-card")).length > 0);
  check("Home shows My Bible and the three studies as four equal boxes", (await page.$$("#homeView .path-cards.four .path-card")).length === 4 && Boolean(await page.$("#homeView .path-cards.four .my-bible")));
  check("no shopping links anywhere", !(await page.$("#view-shop")) && !(await page.$("#homeShop")) && !/amazon/i.test(await page.content()));
  check("the bottom menu sits on the very bottom", await page.evaluate(() => { const r = document.querySelector(".tabbar").getBoundingClientRect(); return Math.abs(r.bottom - innerHeight) < 2; }));
  await page.click("#dailyCustom"); await page.waitForTimeout(150);
  await page.click('[data-dpart="prayer"]'); await page.waitForTimeout(300);
  check("the prayer can be turned off while the question stays", !/Pray/.test(await page.textContent(".daily-card .dy-dev")) && /Think about/.test(await page.textContent(".daily-card .dy-dev")));
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(500);
  check("reading off the path offers a way back", /Back to my place: Genesis 3/.test(await page.textContent("#backToPlace")));
  await page.click("#backToPlace"); await page.waitForTimeout(500);
  check("one tap goes back to your place", (await page.textContent("#refLabel")) === "Genesis 3");
  check("at your place, the back button hides", await page.$eval("#backToPlace", (b) => b.hidden));
  check("book introduction is folded so the text comes first", !(await page.$eval("#bookIntro", (d) => d.open)));
  check("its title says what's inside", /Setting the stage: Genesis/.test(await page.textContent("#bookIntro summary")));
  await page.waitForTimeout(3100); // the buddy's hello
  await page.mouse.wheel(0, 600); await page.waitForTimeout(500);
  check("the buddy sits and fades a little while you read", await page.$eval(".buddy", (b) => b.classList.contains("tucked") && b.classList.contains("sitting")));
  await page.click(".buddy", { position: { x: 12, y: 30 } }); await page.waitForTimeout(400);
  check("tapping him brings him back and opens the chat", !(await page.$eval(".buddy", (b) => b.classList.contains("tucked"))) && await page.$eval("#chatSheet", (d) => d.open));
  await page.click("#chatSheetClose"); await page.waitForTimeout(200);
  // Looks: a drop-down with a picture of the chosen look right under it.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(400);
  check("Settings picks a look from a drop-down", (await page.$$("#lookSelect option")).length === 9);
  await page.selectOption("#lookSelect", "christmas"); await page.waitForTimeout(300);
  check("choosing a look applies it", await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).style === "christmas"));
  check("and shows its picture and description under the list", /red, green and gold/.test(await page.textContent("#lookGrid .look-preview")) && Boolean(await page.$("#lookGrid .look-preview svg")));
  await page.evaluate(() => [...document.querySelectorAll("#setupCard [data-s-open]")].find((b) => /Look/.test(b.textContent)).click()); await page.waitForTimeout(400);
  check("setup's look step can be opened again from Settings", await page.$eval("#setup", (d) => d.open) && Boolean(await page.$("#setupLook")));
  check("the page behind setup is hidden, so nothing shows through", await page.$eval("main, #app, body > :not(dialog)", (el) => getComputedStyle(el).visibility === "hidden"));
  await page.selectOption("#setupLook", "easter"); await page.waitForTimeout(300);
  check("the setup drop-down shows the chosen look too", /empty tomb/.test(await page.textContent("#setup .look-preview")));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
