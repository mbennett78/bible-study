// Settings: grouped sections with quick jumps, and the user guide at the top.
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span data-number=\"1\" class=\"v\">1</span>Words.</p>", copyright: "c" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", show: { buddy: false }, last: { book: "JHN", chapter: 3 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(300);
  const groups = await page.$$eval("#view-settings .settings-group", (h) => h.map((x) => x.textContent));
  check("settings are in six named groups", groups.length === 6 && groups[0] === "Help and guide", groups.join(" | "));
  check("the user guide comes first", await page.evaluate(() => {
    const cards = [...document.querySelectorAll("#view-settings .card:not(.setup-card)")].filter((c) => !c.hidden);
    return cards[0]?.id === "guideCard";
  }));
  check("the guide lists its topics, closed until tapped", (await page.$$("#guideList details.guide-topic")).length >= 8 && !(await page.$("#guideList details[open]")));
  await page.click('#guideList [data-guide="offline"] summary');
  check("a topic opens to show its tips", /next two ahead/.test(await page.textContent('#guideList [data-guide="offline"]')));
  await page.screenshot({ path: process.env.SHOT || "/dev/null" }).catch(() => {});
  const setGroups = await page.$$eval("#view-settings details.set-group", (ds) => ds.map((d) => ({ open: d.open, hint: d.querySelector("summary small")?.textContent || "" })));
  check("Settings folds into six groups, each saying what's inside, with only Help and guide open", setGroups.length === 6 && setGroups.every((g) => g.hint.length > 5) && setGroups.filter((g) => g.open).length === 1 && setGroups[0].open, JSON.stringify(setGroups));
  await page.click('details[data-group="sg-reading"] > summary'); await page.waitForTimeout(500);
  check("opening a group shows its settings and folds the others away", await page.isVisible("#textSize") && !(await page.isVisible("#guideCard")));
  await page.$eval("#textSize", (i) => { i.value = String(Number(i.value) + 1); i.dispatchEvent(new Event("input", { bubbles: true })); i.dispatchEvent(new Event("change", { bubbles: true })); }); await page.waitForTimeout(100);
  check("changing a setting says Saved ✓", /Saved ✓/.test(await page.textContent(".saved-note")) && await page.$eval(".saved-note", (n) => n.classList.contains("show")));
  await page.click('details[data-group="sg-reading"] .set-done-btn'); await page.waitForTimeout(200);
  check("Done closes the group and says all changes are saved", !(await page.$eval('details[data-group="sg-reading"]', (d) => d.open)) && /All changes saved/.test(await page.textContent(".saved-note")));
  const h = await page.evaluate(() => document.querySelector("#view-settings").scrollHeight);
  check("Settings stays short", h < 4500, String(h));
  await page.click('details[data-group="sg-help"] > summary'); await page.waitForTimeout(500);
  await page.click("#printGuide"); await page.waitForTimeout(200);
  check("Print the guide offers paper or sending a copy", /User Guide/.test(await page.textContent(".send-sheet")) && (await page.$$(".send-sheet .send-opt")).length === 2);
  check("no page errors", !errors.length, errors.join("; "));
} catch (e) { stopped = e; }
await browser.close(); site.close(); finish(stopped);
