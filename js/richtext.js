// The words of a note or journal entry, with simple formatting, kept as plain text so they
// stay small, search well, back up, print and go to Google Docs the same way they always did.
//
//   **bold**   *italic*   __underline__   ==highlight==  (==g:green==, ==b:blue==, ==p:pink==)
//   a line starting "## " is a heading; "• " is a list item
//   a line like "[🎨 Picture 2]" is where that picture, box, table, drawing or map sits
//
// The editor shows all of it as it will look (WYSIWYG) and turns it back into this text.

export const PIC_LABELS = { sticker: "🎨 Picture", box: "▭ Box", table: "▦ Table", chart: "📊 Chart", photo: "📷 Photo", map: "🗺️ Map" };
export const picLabel = (p) => (p.t === "ink" ? (p.page ? "📄 Page" : "✏️ Drawing") : PIC_LABELS[p.t] || "🎨 Picture");
export const picTag = (p) => `[${picLabel(p)} ${p.n}]`;
const LABELS = ["✏️ Drawing", "📄 Page", ...Object.values(PIC_LABELS)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// One line that is only a picture's place: [label n]
export const TAG_LINE = new RegExp(`^\\[(${LABELS.map(escRe).join("|")}) (\\d+)\\]$`);
export const TAG_SPLIT = new RegExp(`^\\[(?:${LABELS.map(escRe).join("|")}) \\d+\\]$`, "m");
export const findPic = (pics, label, n) => (pics || []).find((p) => picLabel(p) === label && String(p.n) === String(n));
export const placed = (text, p) => p.n != null && new RegExp(`^${escRe(picTag(p))}$`, "m").test(text || "");

const HL = { y: "y", g: "g", b: "b", p: "p" };
// Formatting marks in text that's already HTML-escaped, turned into tags.
export function inlineHtml(h) {
  return String(h)
    .replace(/==(?:([ygbp]):)?(.+?)==/g, (m, c, t) => `<mark class="nh-${HL[c] || "y"}">${t}</mark>`)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/__(.+?)__/g, "<u>$1</u>")
    .replace(/(^|[^*\w])\*(?=\S)(.+?)\*(?!\*)/g, "$1<i>$2</i>");
}
// The same words with the marks taken out (for short previews and searching).
export function plainText(t) {
  return String(t || "").split("\n").filter((l) => !TAG_LINE.test(l)).join("\n")
    .replace(/^## /gm, "").replace(/==(?:[ygbp]:)?(.+?)==/g, "$1").replace(/\*\*(.+?)\*\*/g, "$1").replace(/__(.+?)__/g, "$1").replace(/(^|[^*\w])\*(?=\S)(.+?)\*(?!\*)/g, "$1$2");
}
// Text as editor HTML: one block per line; pictures as blocks that can't be typed inside.
export function textToRich(text, pics, picHtml) {
  const lines = String(text || "").split("\n");
  return lines.map((l) => {
    const m = l.match(TAG_LINE);
    if (m) { const p = findPic(pics, m[1], m[2]); if (p) return `<div class="ee-inl" contenteditable="false" data-tag="${esc(l)}">${picHtml(p)}</div>`; }
    if (l.startsWith("## ")) return `<h3>${inlineHtml(esc(l.slice(3))) || "<br>"}</h3>`;
    return `<div>${inlineHtml(esc(l)) || "<br>"}</div>`;
  }).join("") || "<div><br></div>";
}
// Editor HTML back to text.
const BLOCK = /^(DIV|P|H[1-6]|LI|UL|OL|BLOCKQUOTE|SECTION|ARTICLE|PRE)$/;
function inl(node) {
  if (node.nodeType === 3) return node.textContent.replace(/\u00a0/g, " ").replace(/\u200b/g, "");
  if (node.nodeType !== 1) return "";
  if (node.nodeName === "BR") return "\n";
  if (node.classList?.contains("ee-inl")) return `\n${node.dataset.tag}\n`;
  let t = [...node.childNodes].map(inl).join("");
  if (!t.replace(/\n/g, "").trim()) return t;
  const st = node.style || {};
  const wrap = (m, x) => { const lead = x.match(/^\s*/)[0], tail = x.match(/\s*$/)[0], core = x.trim(); return core ? `${lead}${m}${core}${m.replace(/^==\w:$/, "==")}${tail}` : x; };
  const tag = node.nodeName;
  if (tag === "MARK") { const c = (node.className.match(/nh-([ygbp])/) || [])[1] || "y"; const core = t.trim(); return core ? `${t.match(/^\s*/)[0]}==${c === "y" ? "" : `${c}:`}${core}==${t.match(/\s*$/)[0]}` : t; }
  if (tag === "B" || tag === "STRONG" || /^(bold|[6-9]00)$/.test(st.fontWeight || "")) t = wrap("**", t);
  if (tag === "I" || tag === "EM" || st.fontStyle === "italic") t = wrap("*", t);
  if (tag === "U" || /underline/.test(st.textDecoration || st.textDecorationLine || "")) t = wrap("__", t);
  if (!/^(MARK)$/.test(tag) && st.backgroundColor && !/transparent|rgba\(0, 0, 0, 0\)/.test(st.backgroundColor)) { const core = t.trim(); if (core) t = `==${core}==`; }
  return t;
}
function blocks(node, out) {
  let line = null;
  const push = (s) => { for (const l of String(s).split("\n")) out.push(l); };
  const flush = () => { if (line !== null) { push(line); line = null; } };
  for (const c of node.childNodes) {
    if (c.nodeType === 1 && c.classList.contains("ee-inl")) { flush(); out.push(c.dataset.tag); continue; }
    if (c.nodeType === 1 && BLOCK.test(c.nodeName)) {
      flush();
      if (/^H[1-6]$/.test(c.nodeName)) { const h = inl(c).replace(/\n+/g, " ").trim(); out.push(h ? `## ${h}` : ""); continue; }
      if (c.nodeName === "LI") { const sub = []; blocks(c, sub); sub.forEach((l, i) => out.push(i || /^• /.test(l) ? l : `• ${l}`)); continue; }
      if ([...c.childNodes].some((x) => x.nodeType === 1 && (BLOCK.test(x.nodeName) || x.classList.contains("ee-inl")))) { blocks(c, out); continue; }
      let t = inl(c);
      if (t.endsWith("\n")) t = t.slice(0, -1); // "<div>words<br></div>" is one line
      push(t);
      continue;
    }
    if (c.nodeName === "BR") { push(line ?? ""); line = null; continue; }
    line = (line ?? "") + inl(c);
  }
  flush();
}
export function richToText(root) {
  const out = [];
  blocks(root, out);
  // A picture's place is a line of its own.
  const lines = out.flatMap((l) => (TAG_LINE.test(l.trim()) ? [l.trim()] : [l.replace(/\s+$/, "")]));
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return lines.join("\n");
}
