// Seeing notes without printing: by date, by Bible study or by passage; printing can include
// the journal, in color or black and white, with a look at the pages first; and a passage you've
// written about shows a 📝 note above it and beside the verse.
// Run: node tests/e2e/notesview.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: Array.from({ length: 9 }, (_, i) => `<p><span class="v" data-number="${i + 1}">${i + 1}</span>Verse ${i + 1} words.</p>`).join("") } } }));
  await ctx.addInitScript(() => {
    if (localStorage.getItem("bible-study:v1")) return;
    const entries = {
      a: { kind: "note", title: "On Romans", text: "Read Romans 8:28 again.", created: "2026-11-20T10:00:00Z" },
      b: { kind: "church", title: "Abram's faith", text: "Genesis 12:4 he went.", created: "2026-11-22T10:00:00Z" },
      c: { kind: "study", path: "chronological", ref: "GEN.12", title: "", text: "Called out.", created: "2026-11-25T10:00:00Z" },
      d: { kind: "day", opener: "My Day", text: "We baked bread together.", prayer: "For Grandma.", created: "2026-11-24T10:00:00Z" },
    };
    localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, wordTipSeen: true, name: "Mel", last: { book: "GEN", chapter: 12 }, entries }));
  });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click()); await page.waitForTimeout(900);
  check("a passage you've written about says so above it", /written 2 notes about Genesis 12/.test(await page.textContent("#myNotesHere")), await page.textContent("#myNotesHere"));
  check("and the verse you named is marked", await page.$eval('#reader [data-number="4"]', (v) => v.classList.contains("has-mine")));
  await page.evaluate(() => document.querySelector(".tabbar [data-view=notes]").click()); await page.waitForTimeout(400);
  const heads = () => page.$$eval("#notesList .nl-day", (h) => h.map((x) => x.textContent.trim()));
  check("by date, newest first", (await heads()).length === 3 && /November 25/.test((await heads())[0]), JSON.stringify(await heads()));
  await page.selectOption("#notesBy", "passage"); await page.waitForTimeout(200);
  check("by passage, in Bible order", JSON.stringify(await heads()) === JSON.stringify(["📖 Genesis 12", "📖 Romans 8"]), JSON.stringify(await heads()));
  await page.selectOption("#notesBy", "study"); await page.waitForTimeout(200);
  check("by Bible study", (await heads()).some((h) => /Chronological/.test(h)) && (await heads()).some((h) => /Church/.test(h)), JSON.stringify(await heads()));
  await page.evaluate(() => { window.print = () => { window.__printed = document.querySelector("#printBook").innerHTML; window.__cls = document.querySelector("#printBook").className; }; });
  await page.check("#printWithJournal");
  await page.click("#printNotes"); await page.waitForTimeout(200);
  check("printing offers color or black and white, and a look first", await page.isVisible(".send-sheet [data-bw='1']") && await page.isVisible(".send-sheet [data-how=preview]"));
  await page.click(".send-sheet [data-bw='1']");
  await page.click(".send-sheet [data-how=preview]"); await page.waitForTimeout(300);
  check("the look-first window shows the pages, journal included", /We baked bread together/.test(await page.textContent(".print-preview")) && /For Grandma/.test(await page.textContent(".print-preview")) && /Abram's faith/.test(await page.textContent(".print-preview")));
  check("in black and white when chosen", await page.$eval(".print-preview", (p) => p.classList.contains("is-bw")));
  check("it has ✕ and Print", await page.isVisible(".print-preview-sheet .ws-close") && await page.isVisible(".print-preview-sheet [data-pp=print]"));
  await page.click(".print-preview-sheet [data-pp=print]"); await page.waitForTimeout(300);
  check("and prints in black and white", /pb-bw/.test(await page.evaluate(() => window.__cls || "")) && /We baked bread/.test(await page.evaluate(() => window.__printed || "")));
  check("no page errors", errors.length === 0, errors.join(" | "));
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
