// Inviting a brother or sister (B-95): the link sets up their name and look but never carries a
// Bible key (API.Bible's rules don't allow sharing one); opening it welcomes them and shows the
// steps to get their own free key. An older link that did carry a key still opens.
// Run: node tests/e2e/invite.mjs
import { chromium, serve, check, finish } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
let stopped = null;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span class='v' data-number='1'>1</span>Words.</p>" } } }));
  await ctx.addInitScript(() => { if (!localStorage.getItem("bible-study:v1")) localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "SECRET-KEY-123", nasbBibleId: "x", setup: { done: true }, tourSeen: true, newsOff: true, name: "Mel" })); });
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  const looks = await page.$$eval("#shareLook option", (o) => o.map((x) => x.value));
  check("every look can be picked for them", looks.includes("classic4") && looks.includes("classic3") && looks[0] === "");
  await page.evaluate(() => { navigator.clipboard.writeText = async (t) => { window.__copied = t; }; document.querySelector("#shareName").value = "Anna"; document.querySelector("#shareLook").value = "classic4"; document.querySelector("#shareKeyBtn").click(); });
  await page.waitForTimeout(200);
  await page.evaluate(() => document.querySelector("#shareCopy").click()); await page.waitForTimeout(200);
  const url = await page.evaluate(() => window.__copied || "");
  const payload = await page.evaluate((u) => { const c = u.split("#join=BSI1")[1] || ""; return new TextDecoder().decode(Uint8Array.from(atob(c.replace(/-/g, "+").replace(/_/g, "/")), (ch) => ch.charCodeAt(0))); }, url);
  check("the invite link has their name and look", /"to":"Anna"/.test(payload) && /"look":"classic4"/.test(payload), payload);
  check("and never the Bible key", !payload.includes("SECRET") && !/"k":/.test(payload), payload);
  await ctx.close();

  // Anna opens it on her own phone.
  const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx2.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx2.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "For God so loved the world" } } }));
  const p2 = await ctx2.newPage();
  p2.on("pageerror", (e) => errors.push(e.message));
  await p2.goto(url.replace(/^https?:\/\/[^/]+/, site.url.replace(/\/$/, ""))); await p2.waitForTimeout(1200);
  const toast = await p2.textContent(".invite-toast").catch(() => "");
  check("she's welcomed by name, and told one step is left", /Welcome, Anna/.test(toast) && /Mel invited you/.test(toast) && /own free Bible key/.test(toast), toast);
  const st = await p2.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1") || "{}"));
  check("her name and look are set, with no key", st.name === "Anna" && st.style === "classic4" && !st.apiBibleKey, JSON.stringify(st).slice(0, 200));
  await p2.click("#inviteOk"); await p2.waitForTimeout(500);
  check("Show me the steps opens how to get a free key", await p2.evaluate(() => [...document.querySelectorAll(".key-guide")].some((d) => d.open && d.offsetParent)));
  check("the guide has five plain steps, each with a picture", (await p2.$$("#setup .key-steps li")).length === 5 && (await p2.$$("#setup .key-steps li .ks-pic svg")).length === 4);
  check("the Bible versions came with the invite", await p2.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).nasbBibleId === "x"));
  await p2.fill("#setupKey", "ANNA-OWN-KEY"); await p2.dispatchEvent("#setupKey", "change"); await p2.waitForTimeout(600);
  check("pasting her own key says it works", /It works/.test(await p2.textContent("#setupKeyStatus")), await p2.textContent("#setupKeyStatus"));
  await ctx2.close();

  // An older link that carried a key still works.
  const ctx3 = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx3.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx3.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "" } } }));
  const p3 = await ctx3.newPage();
  const old = "BSI1" + Buffer.from(JSON.stringify({ v: 1, k: "OLD-KEY", b: "x", l: "NASB", from: "Mel", to: "Ben" })).toString("base64url");
  await p3.goto(`${site.url.replace(/\/$/, "")}/#join=${old}`); await p3.waitForTimeout(1200);
  check("an older link with a key still opens", await p3.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1") || "{}").apiBibleKey === "OLD-KEY"));
  await ctx3.close();
  check("no page errors", errors.length === 0, errors.join(" | "));
} catch (e) { stopped = e; }
await browser.close(); site.close();
finish(stopped);
