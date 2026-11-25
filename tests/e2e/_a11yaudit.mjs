// Ratings audit (not part of the suite): unnamed controls, missing alt text and low-contrast text on every screen in every look.
import { chromium, serve } from "./harness.mjs";
const site = await serve();
const browser = await chromium.launch();
const LOOKS = ["classic","classic2","classic3","sage","nativity","easter","fall","christmas","masculine","animated"];
const VIEWS = ["home","read","books","path","notes","journal","settings"];
const out = {};
for (const look of LOOKS) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/js\/config\.js/, (r) => r.fulfill({ contentType: "text/javascript", body: "window.BIBLE_CONFIG={};" }));
  await ctx.route(/api\.bible/, (r) => r.fulfill({ json: { data: { content: "<p><span data-number=\"1\" class=\"v\">1</span>For God so loved the world.</p>", copyright: "c" } } }));
  await ctx.addInitScript((look) => localStorage.setItem("bible-study:v1", JSON.stringify({ apiBibleKey: "k", nasbBibleId: "x", setup: { done: true }, tourSeen: true, name: "Mel", style: look, last: { book: "JHN", chapter: 3 } })), look);
  const page = await ctx.newPage();
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(site.url); await page.waitForTimeout(900);
  for (const v of VIEWS) {
    await page.evaluate((v) => document.querySelector(`.tabbar [data-view=${v}]`).click(), v); await page.waitForTimeout(500);
    const r = await page.evaluate(() => {
      const vis = (e) => { const s = getComputedStyle(e); const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && s.visibility !== "hidden" && s.display !== "none" && !e.closest("[hidden],[aria-hidden=true]"); };
      const name = (e) => (e.getAttribute("aria-label") || e.getAttribute("title") || e.textContent || e.value || (e.id && document.querySelector(`label[for="${e.id}"]`)?.textContent) || e.closest("label")?.textContent || e.getAttribute("placeholder") || "").trim();
      const unnamed = [...document.querySelectorAll("button,a[href],input:not([type=hidden]),select,textarea,[role=button]")].filter(vis).filter((e) => !name(e)).map((e) => e.outerHTML.slice(0, 90));
      const noAlt = [...document.querySelectorAll("img")].filter(vis).filter((e) => !e.hasAttribute("alt")).map((e) => e.outerHTML.slice(0, 90));
      const lum = (c) => { const m = c.match(/[\d.]+/g); if (!m) return null; let [r,g,b,a=1] = m.map(Number); if (c.startsWith("color(")) { const sl = c.includes("/") ? Number(c.split("/")[1].replace(")","")) : 1; [r,g,b] = [r*255,g*255,b*255]; a = sl; } if (a < 0.5) return null; return [r,g,b].map((x) => { x/=255; return x <= 0.03928 ? x/12.92 : ((x+0.055)/1.055)**2.4; }).reduce((s,x,i)=>s+x*[0.2126,0.7152,0.0722][i],0); };
      const bgOf = (e) => { for (let n = e; n; n = n.parentElement) { const s = getComputedStyle(n); if (s.backgroundImage !== "none" && !s.backgroundImage.startsWith("linear-gradient(transparent")) return "img"; const l = lum(s.backgroundColor); if (l !== null) return l; } return lum("rgb(255,255,255)"); };
      const low = [];
      for (const e of document.querySelectorAll("p,span,a,button,label,h1,h2,h3,h4,li,small,summary,td,div")) {
        if (!vis(e) || ![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) continue;
        if (e.closest("svg")) continue;
        const s = getComputedStyle(e); if (parseFloat(s.opacity) < 0.3) continue;
        const fg = lum(s.color), bg = bgOf(e); if (fg === null || bg === "img") continue;
        const ratio = (Math.max(fg,bg)+0.05)/(Math.min(fg,bg)+0.05);
        const big = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.6 && Number(s.fontWeight) >= 700);
        if (ratio < (big ? 3 : 4.5)) low.push(`${ratio.toFixed(2)} ${e.tagName}.${e.className} "${e.textContent.trim().slice(0,30)}"`);
      }
      const wide = document.documentElement.scrollWidth > innerWidth + 1;
      return { unnamed, noAlt, low, wide };
    });
    out[`${look}/${v}`] = r;
  }
  out[`${look}/errors`] = errors;
  await ctx.close();
}
await browser.close(); site.close();
console.log(JSON.stringify(out));
