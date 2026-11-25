// Builds the printed user guide on its own: the same words as Settings and the gift packet,
// in large, easy-to-read print with room to write notes. Good for anyone who'd rather keep
// a paper copy beside the iPad.
// Run: node tools/gift/make-guide.mjs [out.pdf]
import { fileURLToPath } from "node:url";
import { chromium } from "../../tests/e2e/harness.mjs";
import { GUIDE, SITE } from "../../js/guide.js";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const OUT = process.argv[2] || `${HERE}user-guide.pdf`;
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Family Bible Study: User Guide</title><style>
@page { size: Letter; margin: 0.7in 0.75in; }
body { margin: 0; font: 14pt/1.5 Georgia, "Times New Roman", serif; color: #2a2620; }
h1 { font-weight: normal; font-size: 26pt; margin: 0 0 .05in; }
.sub { color: #6b5d48; font-style: italic; margin: 0 0 .25in; }
h2 { font-weight: normal; font-size: 18pt; margin: .26in 0 .06in; break-after: avoid; page-break-after: avoid; border-bottom: 1px solid #d9c9a8; padding-bottom: .03in; }
ul { margin: 0; padding-left: .3in; }
li { margin: 0 0 .07in; break-inside: avoid; }
.end { margin-top: .3in; padding: .14in .18in; background: #f6f0e4; border-radius: 8px; break-inside: avoid; }
.lines { margin-top: .3in; break-inside: avoid; }
.lines p { border-bottom: 1px solid #cdbb98; height: .36in; margin: 0; }
</style></head><body>
<h1>Family Bible Study</h1>
<p class="sub">User guide${SITE ? ` · ${esc(SITE)}` : ""}</p>
${GUIDE.map((g) => `<h2>${g.icon} ${esc(g.title)}</h2><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`).join("\n")}
<div class="end"><b>Still stuck?</b> Tap ❓ at the top of any screen, ask your study buddy, or ask the person who gave you the app.</div>
<div class="lines"><b>My notes</b><p></p><p></p><p></p><p></p></div>
</body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html); await page.waitForTimeout(300);
await page.pdf({ path: OUT, format: "Letter", printBackground: true });
await browser.close();
console.log(`Saved ${OUT}`);
