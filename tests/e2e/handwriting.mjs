// Handwriting and drawing: a drawing in the middle of typed notes and a full handwriting page,
// with a pen, highlighter, eraser and undo, a resting hand ignored while writing with a Pencil,
// and both kept, printed in place and sent to Google Docs as pictures.
// Run: node tests/e2e/handwriting.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p>Text</p>" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, wordTipSeen: true, name: "Mel", whatsNewSeen: "9999", last: { book: "JHN", chapter: 3 } })); });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  // Draw a line on the board with pointer events of a given kind (mouse, pen or touch).
  const draw = (kind, from, to, pressure = 0.5) => page.evaluate(([kind, from, to, pressure]) => {
    const c = document.querySelector(".ink-sheet canvas"), r = c.getBoundingClientRect(), id = kind === "touch" ? 7 : kind === "pen" ? 3 : 1;
    const ev = (type, f) => c.dispatchEvent(new PointerEvent(type, { pointerId: id, pointerType: kind, isPrimary: true, bubbles: true, button: 0, buttons: type === "pointerup" ? 0 : 1, pressure: type === "pointerup" ? 0 : pressure, clientX: r.left + r.width * f[0], clientY: r.top + r.height * f[1] }));
    ev("pointerdown", from);
    for (let i = 1; i <= 12; i++) ev("pointermove", [from[0] + (to[0] - from[0]) * i / 12, from[1] + (to[1] - from[1]) * i / 12]);
    ev("pointerup", to);
  }, [kind, from, to, pressure]);

  await page.click(".tabbar [data-view=notes]"); await page.waitForTimeout(400);
  await page.click("[data-new-note=note]"); await page.waitForTimeout(300);
  await page.fill("#eeTitle", "Sunday class");
  await page.fill("#entryRich", "First point.\nSecond point.");
  await page.focus("#entryRich");
  await page.evaluate(() => { const first = document.querySelector("#entryRich").firstChild; const r = document.createRange(); r.selectNodeContents(first); r.collapse(false); getSelection().removeAllRanges(); getSelection().addRange(r); });
  await page.waitForTimeout(100);
  check("notes offer drawing and a handwriting page", Boolean(await page.$("[data-tool=ink]")) && Boolean(await page.$("[data-tool=inkpage]")));
  await page.$eval("[data-tool=ink]", (b) => b.click()); await page.waitForTimeout(300);
  check("the drawing board opens full screen", await page.$eval(".ink-sheet", (d) => d.open && d.getBoundingClientRect().width >= innerWidth - 1));
  check("it has pens, a highlighter, an eraser, sizes, paper and undo", (await page.$$(".ink-sheet [data-color]")).length === 5 && await page.isVisible(".ink-sheet [data-tool=hl]") && await page.isVisible(".ink-sheet [data-tool=erase]") && (await page.$$(".ink-sheet [data-size]")).length === 3 && (await page.$$(".ink-sheet [data-bg]")).length === 3);
  await draw("mouse", [.1, .2], [.9, .25]);
  await page.click(".ink-sheet [data-color='#1d4ed8']");
  await draw("pen", [.1, .5], [.6, .6], 0.9);
  // With a Pencil in use, a hand resting on the glass doesn't draw.
  await draw("touch", [.2, .8], [.8, .85]);
  await page.click(".ink-sheet [data-tool=hl]");
  await draw("mouse", [.1, .7], [.5, .7]);
  await page.click(".ink-sheet [data-x=undo]");
  await page.click(".ink-sheet [data-x=done]"); await page.waitForTimeout(300);
  const saved = () => page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).entries);
  let ents = Object.values(await saved());
  let e = ents.find((x) => x.title === "Sunday class");
  const ink = e?.pics?.find((p) => p.t === "ink");
  check("the drawing is kept as strokes (the resting hand and the undone line left out)", ink && ink.s.length === 2, JSON.stringify(ink?.s?.map((s) => s.c)));
  check("a Pencil's pressure is kept", ink && ink.s[1].d.split(",")[2] === "9" && ink.s[1].c === "#1d4ed8");
  check("the drawing goes where the cursor was in the words", /^First point\.\n\[✏️ Drawing 1\]\nSecond point\.$/.test(await page.inputValue("#entryText")), JSON.stringify(await page.inputValue("#entryText")));
  check("it shows in the note", Boolean(await page.$("#entryRich .is-ink svg path")));
  // Change it: the eraser takes a stroke away.
  await page.click("#entryRich .is-ink [data-iedit].chart-edit"); await page.waitForTimeout(300);
  await page.click(".ink-sheet [data-tool=erase]");
  await draw("mouse", [.05, .22], [.95, .23]);
  await page.click(".ink-sheet [data-x=done]"); await page.waitForTimeout(300);
  e = Object.values(await saved()).find((x) => x.title === "Sunday class");
  check("the eraser removes a stroke", e.pics.find((p) => p.t === "ink").s.length === 1);
  // A full handwriting page.
  await page.$eval("[data-tool=inkpage]", (b) => b.click()); await page.waitForTimeout(300);
  check("a handwriting page is a tall lined page", await page.$eval(".ink-sheet canvas", (c) => c.height > c.width) && await page.getAttribute(".ink-sheet [data-bg=lines]", "aria-pressed") === "true");
  await draw("pen", [.1, .1], [.8, .12], 0.4);
  await page.click(".ink-sheet [data-x=done]"); await page.waitForTimeout(300);
  check("the page is added to the words too", (await page.inputValue("#entryText")).includes("[📄 Page 2]"));
  await page.click("#entrySave"); await page.waitForTimeout(300);
  // Print: the drawing sits between the two points.
  await page.evaluate(() => { window.print = () => { window.__printed = document.querySelector("#printBook").innerHTML; }; });
  await page.click("#printNotes"); await page.waitForTimeout(200); await page.click(".send-sheet [data-how=print]"); await page.waitForTimeout(300);
  const printed = await page.evaluate(() => window.__printed || "");
  const a = printed.indexOf("First point"), b = printed.indexOf("ink-svg"), c = printed.indexOf("Second point");
  check("printing puts the drawing in its place in the words", a > 0 && b > a && c > b && !printed.includes("[✏️"), `${a} ${b} ${c}`);
  check("the handwriting page prints too", (printed.match(/ink-svg/g) || []).length === 2);
  await page.click("#printNotes"); await page.waitForTimeout(200);
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click(".send-sheet [data-how=send]")]);
  const doc = await (await import("node:fs/promises")).readFile(await dl.path(), "utf8");
  check("sent to Google Docs, drawings come along as pictures", (doc.match(/<img[^>]+src="data:image\/png/g) || []).length === 2 && !doc.includes("<svg"));
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; } finally {
  await browser.close();
  site.close();
  finish(stopped);
}
