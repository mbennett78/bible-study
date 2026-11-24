// Buddy grows, part 2: he remembers what you teach him (and forgets on request), gets a little
// scared in the lions' den and feels better when you check on him, brings out the Zacchaeus
// tree, and never says words over the Bible.
// Run: node tests/e2e/buddygrow.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v" data-number="1">1</span>It seemed good to Darius to appoint satraps.</p>' } } }));
  await ctx.addInitScript(() => {
    if (!sessionStorage.getItem("seeded")) {
      localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, name: "Mel", buddyName: "Buddy", last: { book: "DAN", chapter: 6 } }));
      sessionStorage.setItem("seeded", "1");
    }
  });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  const stored = () => page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")));
  const ask = async (q) => { await page.fill("#partnerQ", q); await page.click("#partnerGo"); await page.waitForTimeout(400); return page.$$eval("#chatLog .chat-row.them", (r) => r.at(-1)?.textContent || ""); };

  // Teaching him.
  await page.tap(".buddy"); await page.waitForTimeout(500);
  let said = await ask("My favorite verse is John 3:16");
  check("he says he'll remember what you teach him", /remember that your favorite verse is John 3:16/.test(said), said);
  check("it's saved for this person", (await stored()).buddyMemory?.[0]?.text === "John 3:16");
  said = await ask("Remember that I love horses");
  said = await ask("What do you remember about me?");
  check("he tells you what he remembers", /you love horses/.test(said) && /John 3:16/.test(said) && /Only you can see this/.test(said), said);
  said = await ask("forget that");
  check("\"forget that\" forgets the last thing", /forgot/.test(said) && (await stored()).buddyMemory.length === 1, said);
  check("time together counts up as you chat", (await stored()).buddyTogether >= 2);
  await page.$eval("#chatSheetClose", (b) => b.click()); await page.waitForTimeout(300);

  // The lions' den: a little scared, no words over the Bible.
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click());
  await page.waitForTimeout(3300);
  check("in the lions' den he gets a little scared", /😨/.test(await page.textContent(".buddy-pop")) && await page.$eval(".buddy", (b) => b.classList.contains("scared")), await page.textContent(".buddy-pop"));
  check("no words over the Bible while he's scared", await page.$eval(".buddy-say", (el) => el.hidden));
  check("he never gets bigger on screen", await page.$eval(".buddy", (b) => b.getBoundingClientRect().height < 140));
  await page.tap(".buddy"); await page.waitForTimeout(500);
  said = await ask("Are you okay?");
  check("checking on him: he feels better and says what scared him", /lions/.test(said) && /(better|brave|okay)/.test(said), said);
  await page.$eval("#chatSheetClose", (b) => b.click()); await page.waitForTimeout(300);

  // The Zacchaeus tree.
  await page.evaluate(() => { location.hash = ""; });
  await page.evaluate(async () => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.last = { book: "LUK", chapter: 19 }; localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => document.querySelector(".tabbar [data-view=read]").click());
  let tree = false;
  for (let i = 0; i < 24 && !tree; i++) { await page.waitForTimeout(500); tree = /🌳/.test(await page.textContent(".buddy-pop")); }
  check("at Zacchaeus he brings out his sycamore tree", tree);
  check("no page errors", !errors.length, errors.join(" | "));
  await ctx.close();
} catch (e) { stopped = e; console.log(e.stack?.split("\n").slice(0, 8).join("\n")); }
await browser.close(); site.close(); finish(stopped);
