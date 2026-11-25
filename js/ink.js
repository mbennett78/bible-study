// Handwriting and drawing: write or draw with Apple Pencil, a finger or a mouse.
// A drawing is kept as its strokes, not as a picture, so it stays small to save and back up
// and prints sharp at any size. With a Pencil, a hand resting on the screen doesn't draw.
//
// A drawing: { t: "ink", n, page, w, h, bg, s: [{ c, z, hl, d }] }
//   n: its number in the entry ("Drawing 2"); page: a full handwriting page or a sketch box;
//   bg: "plain" | "lines" | "grid"; each stroke has a colour c, a size z, hl for highlighter,
//   and d: its points as "x,y,p" (p is pressure 0-9), the first in full and the rest as steps.

export const PENS = [["#1f2937", "Black"], ["#1d4ed8", "Blue"], ["#b91c1c", "Red"], ["#15803d", "Green"], ["#7c3aed", "Purple"]];
export const MARKERS = [["#facc15", "Yellow"], ["#4ade80", "Green"], ["#f472b6", "Pink"], ["#60a5fa", "Blue"]];
const SIZES = [[2.2, "Fine"], [4, "Medium"], [7, "Bold"]];
const PAPER = [["plain", "Plain"], ["lines", "Lines"], ["grid", "Grid"]];
export const SKETCH = { w: 800, h: 500 };
export const PAGE = { w: 800, h: 1035 };
const r1 = (v) => Math.round(v * 10) / 10;

export function encodePoints(pts) {
  let px = 0, py = 0, pp = 0;
  return pts.map(([x, y, p], i) => { const out = i ? [x - px, y - py, p - pp] : [x, y, p]; px = x; py = y; pp = p; return out.join(","); }).join(",");
}
export function decodePoints(d) {
  const v = String(d || "").split(",").map(Number), pts = [];
  let x = 0, y = 0, p = 0;
  for (let i = 0; i + 2 < v.length; i += 3) { x += v[i]; y += v[i + 1]; p += v[i + 2]; pts.push([x, y, p]); }
  return pts;
}

// A smooth line through the points (for the highlighter).
function centerPath(pts) {
  if (pts.length === 1) return `M${pts[0][0]} ${pts[0][1]} l0.1 0`;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) d += ` Q${pts[i][0]} ${pts[i][1]} ${r1((pts[i][0] + pts[i + 1][0]) / 2)} ${r1((pts[i][1] + pts[i + 1][1]) / 2)}`;
  const l = pts[pts.length - 1];
  return `${d} L${l[0]} ${l[1]}`;
}
// The pen: an outline that is thicker where the Pencil pressed harder, with round ends.
export function strokePath(pts, size) {
  if (!pts.length) return "";
  const w = (p) => size * (0.45 + 0.75 * p / 9);
  // Soften the wobble of the hand a little.
  const sm = pts.map((pt, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; return i && i < pts.length - 1 ? [(a[0] + 2 * pt[0] + b[0]) / 4, (a[1] + 2 * pt[1] + b[1]) / 4, (a[2] + 2 * pt[2] + b[2]) / 4] : pt; });
  const dot = (x, y, r) => `M${r1(x - r)} ${r1(y)} a${r1(r)} ${r1(r)} 0 1 0 ${r1(2 * r)} 0 a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2 * r)} 0Z`;
  if (sm.length === 1) return dot(sm[0][0], sm[0][1], w(sm[0][2]) / 2);
  const left = [], right = [];
  for (let i = 0; i < sm.length; i++) {
    const a = sm[Math.max(0, i - 1)], b = sm[Math.min(sm.length - 1, i + 1)];
    let tx = b[0] - a[0], ty = b[1] - a[1];
    const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
    const r = w(sm[i][2]) / 2;
    left.push([sm[i][0] - ty * r, sm[i][1] + tx * r]); right.push([sm[i][0] + ty * r, sm[i][1] - tx * r]);
  }
  const side = (P) => P.slice(1).map((p, i) => (i < P.length - 2 ? `Q${r1(p[0])} ${r1(p[1])} ${r1((p[0] + P[i + 2][0]) / 2)} ${r1((p[1] + P[i + 2][1]) / 2)}` : `L${r1(p[0])} ${r1(p[1])}`)).join(" ");
  const rr = right.reverse();
  const s = sm[0], e = sm[sm.length - 1];
  return `M${r1(left[0][0])} ${r1(left[0][1])} ${side(left)} L${r1(rr[0][0])} ${r1(rr[0][1])} ${side(rr)}Z ${dot(s[0], s[1], w(s[2]) / 2)} ${dot(e[0], e[1], w(e[2]) / 2)}`;
}
const strokeSvg = (st) => {
  const pts = decodePoints(st.d);
  return st.hl ? `<path d="${centerPath(pts)}" fill="none" stroke="${st.c}" stroke-width="${st.z}" stroke-linecap="round" stroke-linejoin="round" opacity=".38" style="mix-blend-mode:multiply"/>`
    : `<path d="${strokePath(pts, st.z)}" fill="${st.c}"/>`;
};
const paperSvg = (w, h, bg, page) => {
  let g = `<rect width="${w}" height="${h}" fill="#fffdf8"/>`;
  if (bg === "lines") { for (let y = page ? 110 : 60; y < h - 10; y += 44) g += `<path d="M0 ${y}H${w}" stroke="#c7d5e8" stroke-width="1.5"/>`; if (page) g += `<path d="M84 0V${h}" stroke="#efb0b0" stroke-width="1.5"/>`; }
  if (bg === "grid") { for (let y = 40; y < h; y += 40) g += `<path d="M0 ${y}H${w}" stroke="#dbe4ef" stroke-width="1"/>`; for (let x = 40; x < w; x += 40) g += `<path d="M${x} 0V${h}" stroke="#dbe4ef" stroke-width="1"/>`; }
  return g;
};
// The drawing as a picture for the page and for printing.
export function inkSvg(pic, attrs = "") {
  const { w, h } = pic.page ? PAGE : SKETCH, s = pic.s || [];
  return `<svg class="ink-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${pic.page ? "Handwriting page" : "Drawing"}" ${attrs}>${paperSvg(w, h, pic.bg, pic.page)}${s.filter((x) => x.hl).map(strokeSvg).join("")}${s.filter((x) => !x.hl).map(strokeSvg).join("")}</svg>`;
}
function paint(ctx, pic, strokes = pic.s || []) {
  const { w, h } = pic.page ? PAGE : SKETCH;
  ctx.fillStyle = "#fffdf8"; ctx.fillRect(0, 0, w, h);
  const lines = paperSvg(w, h, pic.bg, pic.page).matchAll(/<path d="M([\d.]+) ([\d.]+)([HV])([\d.]+)" stroke="([^"]+)" stroke-width="([\d.]+)"/g);
  for (const [, x, y, k, to, c, sw] of lines) { ctx.strokeStyle = c; ctx.lineWidth = Number(sw); ctx.beginPath(); ctx.moveTo(+x, +y); if (k === "H") ctx.lineTo(+to, +y); else ctx.lineTo(+x, +to); ctx.stroke(); }
  for (const st of strokes.filter((x) => x.hl)) drawStroke(ctx, st);
  for (const st of strokes.filter((x) => !x.hl)) drawStroke(ctx, st);
}
function drawStroke(ctx, st, pts = decodePoints(st.d)) {
  ctx.save();
  if (st.hl) { ctx.globalAlpha = .38; ctx.globalCompositeOperation = "multiply"; ctx.strokeStyle = st.c; ctx.lineWidth = st.z; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke(new Path2D(centerPath(pts))); }
  else { ctx.fillStyle = st.c; ctx.fill(new Path2D(strokePath(pts, st.z))); }
  ctx.restore();
}
// The drawing as a PNG, for documents that can't show the strokes (Google Docs, Word).
export function inkPng(pic, width = 1000) {
  const { w, h } = pic.page ? PAGE : SKETCH, k = width / w;
  const c = Object.assign(document.createElement("canvas"), { width: Math.round(w * k), height: Math.round(h * k) });
  const ctx = c.getContext("2d"); ctx.scale(k, k); paint(ctx, pic);
  return c.toDataURL("image/png");
}

// The drawing board: full screen, so the page never scrolls while you write.
// Resolves with the finished drawing, or null if it was cancelled.
export function openInk(start) {
  return new Promise((resolve) => {
    const pic = { t: "ink", bg: start.page ? "lines" : "plain", ...start, s: [...(start.s || [])] };
    const { w, h } = pic.page ? PAGE : SKETCH;
    let tool = "pen", color = PENS[0][0], marker = MARKERS[0][0], size = SIZES[1][0];
    const undo = [], redo = [];
    const dlg = document.createElement("dialog");
    dlg.className = `ink-sheet${pic.page ? " is-page" : ""}`;
    dlg.setAttribute("aria-label", pic.page ? "Handwriting page" : "Draw or write");
    const sw = (list, cur, attr) => list.map(([c, l]) => `<button type="button" class="ink-sw" data-${attr}="${c}" style="--sw:${c}" aria-label="${l}" aria-pressed="${c === cur}"></button>`).join("");
    dlg.innerHTML = `<div class="ink-top"><button type="button" class="small" data-x="cancel">Cancel</button><b>${pic.page ? "Handwriting page" : "Draw or write"}</b><button type="button" class="ink-done" data-x="done">Done</button></div>
      <div class="ink-bar" role="toolbar" aria-label="Drawing tools">
        <div class="ink-group" role="group" aria-label="Tool"><button type="button" data-tool="pen" aria-pressed="true">✒️ Pen</button><button type="button" data-tool="hl" aria-pressed="false">🖍 Highlight</button><button type="button" data-tool="erase" aria-pressed="false">🧽 Eraser</button></div>
        <div class="ink-group ink-colors" role="group" aria-label="Color"></div>
        <div class="ink-group" role="group" aria-label="Size">${SIZES.map(([z, l]) => `<button type="button" class="ink-size" data-size="${z}" aria-label="${l}" aria-pressed="${z === size}"><i style="--d:${Math.round(z * 2 + 3)}px"></i></button>`).join("")}</div>
        <div class="ink-group" role="group" aria-label="Paper">${PAPER.map(([v, l]) => `<button type="button" data-bg="${v}" aria-pressed="${pic.bg === v}">${l}</button>`).join("")}</div>
        <div class="ink-group"><button type="button" data-x="undo" aria-label="Undo">↶ Undo</button><button type="button" data-x="redo" aria-label="Redo">↷</button><button type="button" data-x="clear">Clear</button></div>
      </div>
      <div class="ink-stage"><canvas></canvas></div>
      <p class="ink-hint">Write or draw with Apple Pencil, your finger or a mouse. With a Pencil, your hand can rest on the screen.</p>`;
    document.body.append(dlg);
    const canvas = dlg.querySelector("canvas"), ctx = canvas.getContext("2d"), stage = dlg.querySelector(".ink-stage");
    const base = document.createElement("canvas"), bctx = base.getContext("2d");
    let scale = 1, dpr = 1;
    const drawColors = () => {
      dlg.querySelector(".ink-colors").innerHTML = tool === "hl" ? sw(MARKERS, marker, "marker") : sw(PENS, color, "color");
      dlg.querySelectorAll("[data-color]").forEach((b) => b.addEventListener("click", () => { color = b.dataset.color; if (tool === "erase") setTool("pen"); drawColors(); }));
      dlg.querySelectorAll("[data-marker]").forEach((b) => b.addEventListener("click", () => { marker = b.dataset.marker; drawColors(); }));
      dlg.querySelector(".ink-colors").toggleAttribute("hidden", tool === "erase");
    };
    const setTool = (t) => { tool = t; dlg.querySelectorAll("[data-tool]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tool === t))); canvas.dataset.tool = t; drawColors(); };
    const rebase = () => { bctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0); paint(bctx, pic); };
    const show = (live) => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(base, 0, 0); if (live) { ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0); drawStroke(ctx, live, live.pts); } };
    const fit = () => {
      const r = stage.getBoundingClientRect();
      scale = Math.max(.1, Math.min(r.width / w, r.height / h)); dpr = Math.min(3, window.devicePixelRatio || 1);
      canvas.style.width = `${Math.round(w * scale)}px`; canvas.style.height = `${Math.round(h * scale)}px`;
      canvas.width = base.width = Math.round(w * scale * dpr); canvas.height = base.height = Math.round(h * scale * dpr);
      rebase(); show();
    };
    const changed = () => { rebase(); show(); dlg.querySelector('[data-x="undo"]').disabled = !undo.length; dlg.querySelector('[data-x="redo"]').disabled = !redo.length; };
    const snapshot = () => { undo.push(pic.s.slice()); if (undo.length > 60) undo.shift(); redo.length = 0; };
    // Drawing
    let penSeen = false, cur = null, erased = false, lastT = 0;
    const at = (e) => { const r = canvas.getBoundingClientRect(); return [Math.round((e.clientX - r.left) / scale), Math.round((e.clientY - r.top) / scale)]; };
    const pressure = (e, x, y) => {
      if (e.pointerType === "pen" && e.pressure > 0) return Math.max(1, Math.min(9, Math.round(e.pressure * 11)));
      // A finger or a mouse has no pressure: quick lines come out a little thinner, like real ink.
      const last = cur?.pts[cur.pts.length - 1], dt = Math.max(1, (e.timeStamp || 0) - lastT);
      const speed = last ? Math.hypot(x - last[0], y - last[1]) / dt : 0;
      return Math.max(3, Math.min(7, Math.round(7 - speed * 2.2)));
    };
    const eraseAt = ([x, y]) => {
      const R = 14;
      const keep = pic.s.filter((st) => !decodePoints(st.d).some(([px, py]) => Math.abs(px - x) < R + st.z && Math.abs(py - y) < R + st.z && Math.hypot(px - x, py - y) < R + st.z / 2));
      if (keep.length !== pic.s.length) { if (!erased) { undo.push(pic.s.slice()); redo.length = 0; erased = true; } pic.s = keep; changed(); }
    };
    const addPoint = (e) => {
      const [x, y] = at(e);
      if (tool === "erase") { eraseAt([x, y]); return; }
      const last = cur.pts[cur.pts.length - 1];
      if (last && Math.hypot(x - last[0], y - last[1]) < 1.5) return;
      cur.pts.push([x, y, pressure(e, x, y)]); lastT = e.timeStamp || 0;
    };
    let frame = 0;
    const live = () => { if (frame) return; frame = requestAnimationFrame(() => { frame = 0; if (cur && tool !== "erase") show(cur); }); };
    canvas.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "pen") penSeen = true;
      else if (penSeen && e.pointerType === "touch") return; // a hand resting while writing with the Pencil
      if (cur || (e.pointerType === "mouse" && e.button !== 0)) return;
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch { /* not every pointer can be captured */ }
      erased = false;
      cur = { id: e.pointerId, pts: [], hl: tool === "hl" ? 1 : 0, c: tool === "hl" ? marker : color, z: tool === "hl" ? size * 5 + 8 : size };
      lastT = e.timeStamp || 0;
      addPoint(e); live();
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!cur || e.pointerId !== cur.id) return;
      const all = e.getCoalescedEvents?.();
      for (const ev of all?.length ? all : [e]) addPoint(ev);
      live();
    });
    const end = (e) => {
      if (!cur || e.pointerId !== cur.id) return;
      if (tool !== "erase" && cur.pts.length) {
        snapshot();
        pic.s = [...pic.s, { c: cur.c, z: cur.z, ...(cur.hl ? { hl: 1 } : {}), d: encodePoints(cur.pts) }];
      }
      cur = null; changed();
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    // Buttons
    dlg.querySelectorAll("[data-tool]").forEach((b) => b.addEventListener("click", () => setTool(b.dataset.tool)));
    dlg.querySelectorAll("[data-size]").forEach((b) => b.addEventListener("click", () => { size = Number(b.dataset.size); dlg.querySelectorAll("[data-size]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); if (tool === "erase") setTool("pen"); }));
    dlg.querySelectorAll("[data-bg]").forEach((b) => b.addEventListener("click", () => { pic.bg = b.dataset.bg; dlg.querySelectorAll("[data-bg]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); changed(); }));
    let result = null;
    dlg.querySelector('[data-x="undo"]').addEventListener("click", () => { if (!undo.length) return; redo.push(pic.s); pic.s = undo.pop(); changed(); });
    dlg.querySelector('[data-x="redo"]').addEventListener("click", () => { if (!redo.length) return; undo.push(pic.s); pic.s = redo.pop(); changed(); });
    dlg.querySelector('[data-x="clear"]').addEventListener("click", () => { if (!pic.s.length) return; snapshot(); pic.s = []; changed(); });
    dlg.querySelector('[data-x="done"]').addEventListener("click", () => { result = pic; dlg.close(); });
    dlg.querySelector('[data-x="cancel"]').addEventListener("click", () => dlg.close());
    // Closing by mistake (Escape) keeps the drawing rather than losing it.
    dlg.addEventListener("cancel", (e) => { e.preventDefault(); result = pic; dlg.close(); });
    const ro = new ResizeObserver(() => fit());
    dlg.addEventListener("close", () => { ro.disconnect(); dlg.remove(); document.documentElement.classList.remove("inking"); resolve(result); });
    document.documentElement.classList.add("inking");
    dlg.showModal();
    setTool("pen");
    ro.observe(stage);
    fit(); changed();
  });
}
