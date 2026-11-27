// The notes and journal editor shows a note as it will look: bold, italic, highlights and
// headings from the toolbar inside the editor; pictures land where the cursor is; a Done
// button puts the keyboard away; 💾 Save is always in reach; and printing shows the same.
// Run: node tests/e2e/editor.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span class='v' data-number='1'>1</span>Words.</p>" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, wordTipSeen: true, name: "Mel", last: { book: "GEN", chapter: 12 } })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=notes]").click()); await page.waitForTimeout(400);
  await page.click("[data-new-note=note]"); await page.waitForTimeout(300);
  await page.fill("#eeTitle", "Abram's call");
  check("the toolbar is inside the editor, with Save", await page.isVisible(".entry-editor .ee-bar [data-fmt=bold]") && await page.isVisible(".entry-editor .ee-bar [data-fmt=save]") && await page.isVisible(".entry-editor .ee-bar [data-fmt=kb]"));
  check("the add-a-picture buttons are tucked under ＋ Add", !(await page.isVisible("[data-tool=sticker]")));
  await page.click("#entryRich"); await page.keyboard.type("God called Abram to go."); await page.keyboard.press("Enter"); await page.keyboard.type("He went, as the LORD had told him.");
  const select = (line, a, b) => page.evaluate(([l, x, y]) => { const t = document.querySelectorAll("#entryRich > div")[l].firstChild; const r = document.createRange(); r.setStart(t, x); r.setEnd(t, y); getSelection().removeAllRanges(); getSelection().addRange(r); }, [line, a, b]);
  await select(0, 11, 16); await page.click("[data-fmt=bold]");
  check("Bold makes the picked words bold, right there", (await page.$eval("#entryRich", (r) => r.querySelector("b")?.textContent)) === "Abram");
  await select(1, 3, 7); await page.click("[data-fmt=hl]"); await page.click("[data-hl=g]");
  check("a highlight color can be picked", (await page.$eval("#entryRich", (r) => r.querySelector("mark.nh-g")?.textContent)) === "went");
  await page.evaluate(() => { const t = document.querySelector("#entryRich > div"); const r = document.createRange(); r.selectNodeContents(t); r.collapse(false); getSelection().removeAllRanges(); getSelection().addRange(r); });
  await page.click("[data-fmt=add]");
  check("＋ Add opens the pictures, boxes, drawings and more", await page.isVisible("[data-tool=sticker]") && await page.isVisible("[data-tool=box]") && await page.isVisible("[data-tool=ink]"));
  await page.click("[data-tool=sticker]"); await page.waitForTimeout(150); await page.click("#eePanel [data-sid]"); await page.waitForTimeout(300);
  const text = await page.inputValue("#entryText");
  check("the picture goes where the cursor was, and shows there", text === "God called **Abram** to go.\n[🎨 Picture 1]\nHe ==g:went==, as the LORD had told him." && Boolean(await page.$("#entryRich .ee-inl .is-sticker svg")), JSON.stringify(text));
  await page.focus("#entryRich"); await page.click("[data-fmt=kb]");
  check("Done puts the keyboard away", await page.evaluate(() => !document.querySelector("#entryRich").contains(document.activeElement) && document.activeElement !== document.querySelector("#entryRich")));
  await page.click("[data-fmt=save]"); await page.waitForTimeout(400);
  check("Save says where it went and how to change it", /Saved ✓/.test(await page.textContent("#notesEditor")));
  check("the list shows the formatting, not the marks", (await page.$eval("#notesList .nc-snip", (p) => p.querySelector("b")?.textContent)) === "Abram" && !/\*\*|==|\[🎨/.test(await page.textContent("#notesList .nc-snip")));
  await page.click("#notesList [data-note]"); await page.click("#notesList [data-change]"); await page.waitForTimeout(400);
  check("opening it again shows it as it looks, picture in place", (await page.$eval("#entryRich", (r) => r.querySelector("b")?.textContent)) === "Abram" && Boolean(await page.$("#entryRich .ee-inl .is-sticker")));
  await page.$eval("#entryRich .ee-inl [data-px]", (b) => b.click()); await page.waitForTimeout(200);
  check("✕ on a picture takes it out of the note", !(await page.inputValue("#entryText")).includes("Picture") && !(await page.$("#entryRich .ee-inl")));
  await page.evaluate(() => { window.print = () => { window.__printed = document.querySelector("#printBook").innerHTML; }; });
  await page.click("#entryPrint"); await page.waitForTimeout(200); await page.click(".send-sheet [data-how=print]"); await page.waitForTimeout(300);
  const printed = await page.evaluate(() => window.__printed || "");
  check("printing shows the bold and highlight too", printed.includes("<b>Abram</b>") && printed.includes('class="nh-g"'), printed.slice(0, 200));
  check("no page errors", errors.length === 0, errors.join(" | "));
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
