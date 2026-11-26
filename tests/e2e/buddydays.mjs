// Buddy's special days and moods, on Central time: Christmas morning he opens socks (once that
// day), the countdown line before Christmas, a party hat and confetti at midnight on New Year's,
// his birthday cake in the evening, and asking how he's doing cheers up a grumpy hour.
// Run: node tests/e2e/buddydays.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
const open = async (iso, extra = {}, more = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: '<p><span class="v" data-number="1">1</span>In the beginning.</p>' } } }));
  await ctx.addInitScript(([t, x, mo]) => {
    window.__buddyNow = Date.parse(t);
    if (!sessionStorage.getItem("seeded")) {
      localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, name: "Mel", buddyName: "Buddy", last: { book: "GEN", chapter: 1 }, ...mo }));
      for (const [k, v] of Object.entries(x)) localStorage.setItem(k, v);
      sessionStorage.setItem("seeded", "1");
    }
  }, [iso, extra, more]);
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(800);
  return { ctx, page, errors };
};
const cls = (page) => page.$eval(".buddy:not(.buddy-inline)", (b) => b.className);
const said = (page) => page.$eval(".buddy-say", (s) => (s.hidden ? "" : s.textContent));
let stopped = null;
try {
  // Christmas morning, 9 AM Central.
  let { ctx, page, errors } = await open("2026-12-25T15:00:00Z");
  check("Christmas: Santa hat on", /santa-hat/.test(await cls(page)));
  await page.waitForTimeout(4200);
  check("Christmas: he says Merry Christmas to them by name", /Merry Christmas, Mel/.test(await said(page)), await said(page));
  check("Christmas: a present to open", /gifting g-socks/.test(await cls(page)));
  await page.waitForTimeout(3800);
  check("Christmas: socks, and he loves them", /opened/.test(await cls(page)) && /Socks/.test(await said(page)), (await cls(page)) + " / " + (await said(page)));
  await page.reload(); await page.waitForTimeout(5000);
  check("Christmas: the present happens once that day, not every visit", !/gifting/.test(await cls(page)));
  check("Christmas: no errors", errors.length === 0, errors.join(" | "));
  await ctx.close();

  // The countdown.
  ({ ctx, page, errors } = await open("2026-12-10T15:00:00Z"));
  await page.waitForTimeout(4400);
  check("countdown: no pop-up on opening (it waits for one of his usual visits)", !/almost Christmas/.test(await said(page)));
  const g = await page.evaluate(async () => { const m = await import("./js/buddydays.js"); return m.special(m.ctNow()); });
  check("countdown: 15 days to go", g?.kind === "countdown" && g.days === 15, JSON.stringify(g));
  await ctx.close();

  // New Year's at midnight Central.
  ({ ctx, page, errors } = await open("2027-01-01T06:05:00Z"));
  await page.waitForTimeout(4300);
  check("New Year's: party hat, confetti and fireworks at midnight", /party-hat/.test(await cls(page)) && /confetti/.test(await cls(page)), await cls(page));
  check("New Year's: Happy New Year by name", /Happy New Year, Mel/.test(await said(page)), await said(page));
  await ctx.close();

  // His birthday evening (first open after 6 PM): cake, candle, and he's 8.
  ({ ctx, page, errors } = await open("2027-08-03T23:30:00Z"));
  await page.waitForTimeout(4300);
  check("birthday: cake with a candle", /caking/.test(await cls(page)) && /party-hat/.test(await cls(page)));
  await page.waitForTimeout(5200);
  check("birthday: he blows it out and says he's 8", /blown/.test(await cls(page)) && /I'm 8/.test(await said(page)), await said(page));
  check("birthday: no errors", errors.length === 0, errors.join(" | "));
  await ctx.close();

  // Their own birthday (month and day saved in Settings): a party and "I love you".
  ({ ctx, page, errors } = await open("2026-03-14T15:00:00Z", {}, { birthday: "03-14" }));
  await page.waitForTimeout(4300);
  check("their birthday: Happy birthday by name, and I love you", /Happy birthday, Mel!.*I love you/.test(await said(page)), await said(page));
  check("their birthday: party hat and confetti", /party-hat/.test(await cls(page)) && /confetti/.test(await cls(page)));
  await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]")?.click()); await page.waitForTimeout(300);
  check("Settings shows their birthday", await page.$eval("#setBdayM", (s) => s.value) === "3" && await page.$eval("#setBdayD", (s) => s.value) === "14");
  await page.$eval("#setBdayM", (s) => { s.value = "7"; s.dispatchEvent(new Event("change")); }); await page.waitForTimeout(100);
  check("changing it saves month and day only", await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).birthday) === "07-14");
  await ctx.close();

  // An ordinary day: a grumpy hour, and "how are you?" cheers him up.
  ({ ctx, page, errors } = await open("2026-02-03T15:00:00Z"));
  await page.evaluate(() => { const b = document.querySelector(".buddy:not(.buddy-inline)"); b.classList.add("day-grumpy"); });
  await page.tap(".buddy"); await page.waitForTimeout(500);
  await page.route(/functions\/v1/, (r) => r.fulfill({ json: { answer: "ok" } }));
  await page.fill("#partnerQ", "How are you doing today?"); await page.click("#partnerGo"); await page.waitForTimeout(300);
  check("asking how he is cheers him up", !/day-grumpy|day-sleepy/.test(await cls(page)), await cls(page));
  check("ordinary day: no special hats", !/santa-hat|party-hat/.test(await cls(page)));
  await ctx.close();
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
