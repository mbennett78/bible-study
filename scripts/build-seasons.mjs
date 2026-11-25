// Paints the 13 backgrounds for the "Seasonal changes" look: warm, glowing, softly painted
// scenes (in the spirit of cottage-light landscape painting, not copying any painter's work).
// Each scene is drawn as SVG, then given a painterly finish (brushy edges, a soft glow and
// canvas grain) and saved as a light JPEG in img/season/.
// Run: node scripts/build-seasons.mjs [ids...]   (needs the pre-installed Playwright)
/* global process, console */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const W = 1600, H = 900;

/* ---------- little helpers ---------- */
const rng = (s) => () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
let R = rng(7);
const rr = (a, b) => a + R() * (b - a);
const pick = (a) => a[Math.floor(R() * a.length)];
let gid = 0;
const id = (p = "g") => `${p}${++gid}`;
const f = (n) => n.toFixed(1);

// A soft radial glow.
function glow(cx, cy, r, color, op = 1, defs) {
  const g = id("gl");
  defs.push(`<radialGradient id="${g}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset=".35" stop-color="${color}" stop-opacity="${op * .45}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`);
  return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="url(#${g})"/>`;
}
function lin(defs, stops, x2 = 0, y2 = 1) {
  const g = id("lg");
  defs.push(`<linearGradient id="${g}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join("")}</linearGradient>`);
  return `url(#${g})`;
}
// Lighten (amt > 0) or darken (amt < 0) a hex color.
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(amt > 0 ? v + (255 - v) * amt : v * (1 + amt)));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
}
// A rolling ridge line across the picture, with brush strokes in its own colors and a rim of light.
function ridge(y, amp, fill, { seed = 1, freq = 1, from = -20, to = W + 20, bottom = H + 20, op = 1, tex = true, rim = null } = {}) {
  const r = rng(seed); const ph = [r() * 6, r() * 6, r() * 6];
  const pts = [];
  for (let x = from; x <= to; x += 20) {
    const t = x / W * Math.PI * 2 * freq;
    pts.push([x, y + amp * (.55 * Math.sin(t + ph[0]) + .3 * Math.sin(2.3 * t + ph[1]) + .15 * Math.sin(5.1 * t + ph[2]))]);
  }
  const pid = id("rc");
  let t = "";
  if (tex) {
    const band = Math.min(bottom, y + amp + 160) - (y - amp);
    t = dabs((from + to) / 2, y + band / 2 - amp * .3, (to - from) / 2, band / 2, Math.round((to - from) / 9), [shade(fill, .12), shade(fill, -.12), shade(fill, .22), shade(fill, -.2)], { box: true, r1: 6, r2: 15, op: [.25, .6], stretch: 2.6 });
  }
  const line = `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L")}`;
  if (rim) t += `<path d="${line}" stroke="${rim}" stroke-width="10" fill="none" opacity=".28"/><path d="${line}" stroke="${rim}" stroke-width="3.5" fill="none" opacity=".5"/>`;
  const d = `M${from} ${bottom} L${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L")} L${to} ${bottom} Z`;
  return `<clipPath id="${pid}"><path d="${d}"/></clipPath><g opacity="${op}"><path fill="${fill}" d="${d}"/><g clip-path="url(#${pid})">${t}</g></g>`;
}
// Dark, leafy masses in the near corners that frame the light, with sunlit edges.
function frame(dark, lit, { left = true, right = true, top = false, y = H } = {}) {
  let g = "";
  const mass = (cx, cy, rx, ry) => dabs(cx, cy, rx, ry, 170, dark, { r1: 14, r2: 30, op: [.85, 1], stretch: 1.3 }) + dabs(cx, cy, rx * 1.05, ry * 1.05, 260, dark, { r1: 5, r2: 11, op: [.6, .95], stretch: 2.2 }) + dabs(cx + (cx < W / 2 ? rx * .4 : -rx * .4), cy - ry * .45, rx * .5, ry * .35, 45, lit, { r1: 2.5, r2: 6, op: [.3, .75], stretch: 2.2 });
  if (left) g += mass(40, y - 60, 220, 170);
  if (right) g += mass(W - 40, y - 60, 220, 170);
  if (top) g += mass(60, -20, 300, 120) + mass(W - 60, -20, 300, 120);
  return g;
}
// Brush dabs: many soft strokes scattered in an ellipse or a box, for leaves, flowers, light and texture.
function dabs(cx, cy, rx, ry, n, colors, { r1 = 4, r2 = 10, op = [.5, .95], box = false, stretch = 1.6 } = {}) {
  let s = "";
  for (let i = 0; i < n; i++) {
    let x, y;
    if (box) { x = cx + rr(-rx, rx); y = cy + rr(-ry, ry); } else { const a = R() * Math.PI * 2, d = Math.sqrt(R()); x = cx + Math.cos(a) * rx * d; y = cy + Math.sin(a) * ry * d; }
    const r = rr(r1, r2);
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * stretch)}" ry="${f(r)}" transform="rotate(${f(rr(-40, 40))} ${f(x)} ${f(y)})" fill="${pick(colors)}" opacity="${rr(op[0], op[1]).toFixed(2)}"/>`;
  }
  return s;
}
const clouds = (cx, cy, w, h, colors, n = 60) => dabs(cx, cy, w, h, n, colors, { r1: h * .35, r2: h * .8, op: [.25, .6], stretch: 2.4 });

/* ---------- things in the pictures ---------- */
function cross(x, base, h, { wood = "#5a3b22", light = "#c98a4a", op = 1 } = {}) {
  const w = h * .085, arm = h * .62, ay = base - h * .74;
  return `<g opacity="${op}"><rect x="${f(x - w / 2)}" y="${f(base - h)}" width="${f(w)}" height="${f(h)}" fill="${wood}"/><rect x="${f(x - arm / 2)}" y="${f(ay - w / 2)}" width="${f(arm)}" height="${f(w * .95)}" fill="${wood}"/>
    <rect x="${f(x - w / 2)}" y="${f(base - h)}" width="${f(w * .3)}" height="${f(h)}" fill="${light}" opacity=".55"/><rect x="${f(x - arm / 2)}" y="${f(ay - w / 2)}" width="${f(arm)}" height="${f(w * .28)}" fill="${light}" opacity=".55"/></g>`;
}
function oliveTree(x, y, s, { leaf = ["#7d8b5a", "#9aa874", "#b8c08e", "#5f6d45"], trunk = "#5a4632" } = {}) {
  return `<path d="M${x - 8 * s} ${y} C ${x - 14 * s} ${y - 40 * s}, ${x + 10 * s} ${y - 50 * s}, ${x - 4 * s} ${y - 95 * s} L ${x + 6 * s} ${y - 95 * s} C ${x + 22 * s} ${y - 52 * s}, ${x + 4 * s} ${y - 36 * s}, ${x + 12 * s} ${y} Z" fill="${trunk}"/>
    ${dabs(x, y - 120 * s, 85 * s, 48 * s, Math.round(70 + 40 * s), leaf, { r1: 5 * s, r2: 12 * s })}`;
}
function cypress(x, y, s, c = ["#2f4a33", "#3d5c3f", "#4f6f48"]) {
  return `<path d="M${x} ${y - 190 * s} C ${x + 26 * s} ${y - 120 * s}, ${x + 24 * s} ${y - 30 * s}, ${x + 6 * s} ${y} L ${x - 6 * s} ${y} C ${x - 24 * s} ${y - 30 * s}, ${x - 26 * s} ${y - 120 * s}, ${x} ${y - 190 * s} Z" fill="${c[0]}"/>${dabs(x, y - 95 * s, 15 * s, 85 * s, 26, c, { r1: 4 * s, r2: 8 * s, op: [.4, .8] })}`;
}
function palm(x, y, s, c = "#4c6b3c") {
  let fr = "";
  for (let i = 0; i < 9; i++) { const a = -Math.PI + i * Math.PI / 8 + rr(-.1, .1), L = rr(70, 95) * s; const cx = x + 14 * s, cy = y - 200 * s, up = Math.sin(-a); const ex = cx + Math.cos(a) * L, ey = cy + L * .38 - up * L * .3; fr += `<path d="M${f(cx)} ${f(cy)} Q ${f(cx + Math.cos(a) * L * .5)} ${f(cy - up * L * .45 - 12 * s)}, ${f(ex)} ${f(ey)}" stroke="${c}" stroke-width="${f(9 * s)}" fill="none" stroke-linecap="round"/>`; }
  return `<path d="M${x - 6 * s} ${y} Q ${x + 4 * s} ${y - 110 * s}, ${x + 14 * s} ${y - 200 * s}" stroke="#6b5338" stroke-width="${f(12 * s)}" fill="none"/>${fr}`;
}
function blossomTree(x, y, s, colors, trunk = "#5d4636") {
  return `<path d="M${x - 7 * s} ${y} C ${x - 4 * s} ${y - 50 * s}, ${x - 30 * s} ${y - 80 * s}, ${x - 50 * s} ${y - 110 * s} M${x} ${y - 60 * s} C ${x + 20 * s} ${y - 90 * s}, ${x + 40 * s} ${y - 100 * s}, ${x + 55 * s} ${y - 120 * s} M${x} ${y} L ${x + 2 * s} ${y - 130 * s}" stroke="${trunk}" stroke-width="${f(9 * s)}" fill="none" stroke-linecap="round"/>
    ${dabs(x, y - 135 * s, 100 * s, 60 * s, Math.round(120 + 60 * s), colors, { r1: 4 * s, r2: 10 * s })}`;
}
function fallTree(x, y, s) { return blossomTree(x, y, s, ["#c8642a", "#e09a3a", "#a8452a", "#e8c25a", "#8a3a22"], "#4a3426"); }
// A flat-roofed stone house with a lamp-lit door and windows.
function house(x, y, w, h, { wall = "#c9b08c", shade: side = "#9a7f5e", lit = true, defs, roof = "#8f7656", door = true } = {}) {
  let s = `<rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}" fill="${wall}"/><rect x="${f(x + w * .72)}" y="${f(y - h)}" width="${f(w * .28)}" height="${f(h)}" fill="${side}" opacity=".55"/><rect x="${f(x - 3)}" y="${f(y - h - 6)}" width="${f(w + 6)}" height="${f(Math.max(7, h * .06))}" fill="${roof}"/>`;
  s += dabs(x + w / 2, y - h / 2, w / 2 - 4, h / 2 - 6, Math.round(w * h / 260), [shade(wall, .14), shade(wall, -.12), shade(wall, -.22)], { box: true, r1: 3, r2: Math.max(4, w / 18), op: [.25, .55], stretch: 2.2 });
  s += `<ellipse cx="${f(x + w / 2)}" cy="${f(y + 2)}" rx="${f(w * .62)}" ry="${f(Math.max(4, h * .05))}" fill="#000" opacity=".16"/>`;
  const wy = y - h * .62;
  if (lit) {
    s += glow(x + w * .3, wy + 6, w * .55, "#ffcc66", .55, defs);
    s += `<rect x="${f(x + w * .22)}" y="${f(wy)}" width="${f(w * .16)}" height="${f(h * .2)}" rx="3" fill="#ffd27a"/>`;
    if (door) { s += glow(x + w * .58, y - h * .2, w * .5, "#ffb84d", .5, defs); s += `<path d="M${f(x + w * .5)} ${y} L${f(x + w * .5)} ${f(y - h * .34)} Q ${f(x + w * .58)} ${f(y - h * .48)}, ${f(x + w * .66)} ${f(y - h * .34)} L${f(x + w * .66)} ${y} Z" fill="#ffc35e"/>`; }
  } else s += `<rect x="${f(x + w * .22)}" y="${f(wy)}" width="${f(w * .16)}" height="${f(h * .2)}" rx="3" fill="#4a3a2c"/>`;
  return s;
}
// A robed person, painted simply. dir 1 faces right.
function person(x, y, s, { robe = "#7a5a3c", robe2 = "#a77d52", veil = null, skin = "#b98563", hair = "#3b2a1e", jar = false, child = false, arm = "down", dir = 1, glowc = null, defs } = {}) {
  const h = (child ? 110 : 170) * s, hw = (child ? 22 : 30) * s, hy = y - h;
  let g = glowc && defs ? glow(x, y - h * .5, h * .7, glowc, .35, defs) : "";
  g += `<path d="M${f(x - hw * .55)} ${f(hy + 26 * s)} C ${f(x - hw * .9)} ${f(y - h * .4)}, ${f(x - hw * 1.2)} ${f(y - 10 * s)}, ${f(x - hw * 1.25)} ${f(y)} L ${f(x + hw * 1.25)} ${f(y)} C ${f(x + hw * 1.15)} ${f(y - 10 * s)}, ${f(x + hw * .9)} ${f(y - h * .4)}, ${f(x + hw * .55)} ${f(hy + 26 * s)} Z" fill="${robe}"/>`;
  g += `<path d="M${f(x + dir * hw * .1)} ${f(hy + 30 * s)} C ${f(x + dir * hw * .5)} ${f(y - h * .4)}, ${f(x + dir * hw * .8)} ${f(y - 20 * s)}, ${f(x + dir * hw * .9)} ${f(y)} L ${f(x + dir * hw * 1.25)} ${f(y)} C ${f(x + dir * hw * 1.1)} ${f(y - h * .4)}, ${f(x + dir * hw * .8)} ${f(hy + 40 * s)}, ${f(x + dir * hw * .55)} ${f(hy + 26 * s)} Z" fill="${robe2}" opacity=".75"/>`;
  // face, then head covering framing it
  const fr = (child ? 11 : 13) * s, fx = x + dir * 2 * s, fy = hy + 14 * s;
  g += `<ellipse cx="${f(fx)}" cy="${f(fy)}" rx="${f(fr * .82)}" ry="${f(fr)}" fill="${skin}"/>`;
  if (veil) g += `<path d="M${f(fx - fr * 1.25)} ${f(fy + fr * 2.4)} C ${f(fx - fr * 1.5)} ${f(fy - fr * .5)}, ${f(fx - fr * .9)} ${f(fy - fr * 1.6)}, ${f(fx)} ${f(fy - fr * 1.55)} C ${f(fx + fr * .9)} ${f(fy - fr * 1.6)}, ${f(fx + fr * 1.5)} ${f(fy - fr * .5)}, ${f(fx + fr * 1.25)} ${f(fy + fr * 2.4)} C ${f(fx + fr * .9)} ${f(fy + fr * .6)}, ${f(fx + fr * .95)} ${f(fy - fr * .7)}, ${f(fx)} ${f(fy - fr * 1.05)} C ${f(fx - fr * .95)} ${f(fy - fr * .7)}, ${f(fx - fr * .9)} ${f(fy + fr * .6)}, ${f(fx - fr * 1.25)} ${f(fy + fr * 2.4)} Z" fill="${veil}"/>`;
  else g += `<path d="M${f(fx - fr * .85)} ${f(fy - fr * .2)} C ${f(fx - fr * .9)} ${f(fy - fr * 1.3)}, ${f(fx + fr * .9)} ${f(fy - fr * 1.3)}, ${f(fx + fr * .85)} ${f(fy - fr * .2)} C ${f(fx + fr * .5)} ${f(fy - fr * .75)}, ${f(fx - fr * .5)} ${f(fy - fr * .75)}, ${f(fx - fr * .85)} ${f(fy - fr * .2)} Z" fill="${hair}"/>`;
  // a gentle face: eyes and a soft smile, a touch of cheek
  g += `<circle cx="${f(fx - fr * .3 + dir * fr * .12)}" cy="${f(fy - fr * .05)}" r="${f(fr * .1)}" fill="#3a2418"/><circle cx="${f(fx + fr * .3 + dir * fr * .12)}" cy="${f(fy - fr * .05)}" r="${f(fr * .1)}" fill="#3a2418"/>
    <path d="M${f(fx - fr * .28 + dir * fr * .1)} ${f(fy + fr * .38)} Q ${f(fx + dir * fr * .1)} ${f(fy + fr * .58)}, ${f(fx + fr * .28 + dir * fr * .1)} ${f(fy + fr * .38)}" stroke="#7a3f2c" stroke-width="${f(fr * .1)}" fill="none" stroke-linecap="round"/>
    <circle cx="${f(fx - fr * .5)}" cy="${f(fy + fr * .25)}" r="${f(fr * .2)}" fill="#e08a74" opacity=".35"/><circle cx="${f(fx + fr * .5)}" cy="${f(fy + fr * .25)}" r="${f(fr * .2)}" fill="#e08a74" opacity=".35"/>`;
  if (jar) g += `<g transform="translate(${f(x + dir * hw * .55)} ${f(hy + 4 * s)})"><path d="M${f(-11 * s)} 0 C ${f(-20 * s)} ${f(-6 * s)}, ${f(-18 * s)} ${f(-30 * s)}, ${f(-5 * s)} ${f(-36 * s)} L ${f(-5 * s)} ${f(-44 * s)} L ${f(5 * s)} ${f(-44 * s)} L ${f(5 * s)} ${f(-36 * s)} C ${f(18 * s)} ${f(-30 * s)}, ${f(20 * s)} ${f(-6 * s)}, ${f(11 * s)} 0 Z" fill="#b5683c"/><path d="M${f(-8 * s)} ${f(-6 * s)} C ${f(-14 * s)} ${f(-14 * s)}, ${f(-12 * s)} ${f(-26 * s)}, ${f(-4 * s)} ${f(-31 * s)}" stroke="#e7a36c" stroke-width="${f(3 * s)}" fill="none" opacity=".7"/></g>
    <path d="M${f(x + dir * hw * .35)} ${f(hy + 40 * s)} L ${f(x + dir * hw * .6)} ${f(hy + 6 * s)}" stroke="${robe}" stroke-width="${f(9 * s)}" stroke-linecap="round"/>`;
  else if (arm === "out") g += `<path d="M${f(x + dir * hw * .5)} ${f(hy + 44 * s)} Q ${f(x + dir * hw * 1.2)} ${f(hy + 56 * s)}, ${f(x + dir * hw * 1.7)} ${f(hy + 50 * s)}" stroke="${robe}" stroke-width="${f(10 * s)}" fill="none" stroke-linecap="round"/><circle cx="${f(x + dir * hw * 1.75)}" cy="${f(hy + 49 * s)}" r="${f(5 * s)}" fill="${skin}"/>`;
  return g;
}
function angel(x, y, s, defs, { robe = "#fbf3e2", wing = ["#ffffff", "#fff4dc", "#f3e2bf", "#ffe9b8"], op = 1 } = {}) {
  let g = glow(x, y - 120 * s, 260 * s, "#fff1c8", .55, defs);
  for (const d of [-1, 1]) {
    let fe = "";
    for (let i = 0; i < 14; i++) { const t = i / 13; const L = (60 + 120 * Math.sin(t * Math.PI * .9)) * s; const bx = x + d * 18 * s, by = y - 150 * s + t * 70 * s; const a = (-.9 + t * .9) ; fe += `<path d="M${f(bx)} ${f(by)} Q ${f(bx + d * L * .6)} ${f(by - 40 * s + Math.sin(a) * L * .4)}, ${f(bx + d * L)} ${f(by - 60 * s + t * 50 * s)}" stroke="${pick(wing)}" stroke-width="${f(14 * s)}" fill="none" stroke-linecap="round" opacity=".85"/>`; }
    g += fe;
  }
  g += `<path d="M${f(x - 20 * s)} ${f(y - 165 * s)} C ${f(x - 40 * s)} ${f(y - 90 * s)}, ${f(x - 60 * s)} ${f(y - 20 * s)}, ${f(x - 66 * s)} ${f(y)} L ${f(x + 66 * s)} ${f(y)} C ${f(x + 60 * s)} ${f(y - 20 * s)}, ${f(x + 40 * s)} ${f(y - 90 * s)}, ${f(x + 20 * s)} ${f(y - 165 * s)} Z" fill="${robe}"/>
    <path d="M${f(x - 30 * s)} ${f(y - 120 * s)} C ${f(x - 50 * s)} ${f(y - 60 * s)}, ${f(x - 52 * s)} ${f(y - 30 * s)}, ${f(x - 56 * s)} ${f(y)}" stroke="#e8d4ae" stroke-width="${f(3 * s)}" fill="none"/><path d="M${f(x + 10 * s)} ${f(y - 120 * s)} C ${f(x + 18 * s)} ${f(y - 60 * s)}, ${f(x + 22 * s)} ${f(y - 30 * s)}, ${f(x + 26 * s)} ${f(y)}" stroke="#e8d4ae" stroke-width="${f(3 * s)}" fill="none"/>
    <circle cx="${f(x)}" cy="${f(y - 182 * s)}" r="${f(17 * s)}" fill="#f1cfae"/><path d="M${f(x - 18 * s)} ${f(y - 180 * s)} C ${f(x - 20 * s)} ${f(y - 208 * s)}, ${f(x + 20 * s)} ${f(y - 208 * s)}, ${f(x + 18 * s)} ${f(y - 180 * s)} C ${f(x + 10 * s)} ${f(y - 196 * s)}, ${f(x - 10 * s)} ${f(y - 196 * s)}, ${f(x - 18 * s)} ${f(y - 180 * s)} Z" fill="#d9a55a"/>
    <ellipse cx="${f(x + 5 * s)}" cy="${f(y - 186 * s)}" rx="${f(9 * s)}" ry="${f(8 * s)}" fill="#fff0de" opacity=".7"/>
    <ellipse cx="${f(x)}" cy="${f(y - 206 * s)}" rx="${f(22 * s)}" ry="${f(5 * s)}" fill="none" stroke="#ffe39a" stroke-width="${f(3 * s)}" opacity=".9"/>`;
  return `<g opacity="${op}">${g}</g>`;
}
function star(x, y, r, defs, color = "#fff6d8") {
  return `${glow(x, y, r * 6, color, .7, defs)}<path d="M${x} ${y - r * 3.2} L${x + r * .35} ${y - r * .35} L${x + r * 2.2} ${y} L${x + r * .35} ${y + r * .35} L${x} ${y + r * 4.2} L${x - r * .35} ${y + r * .35} L${x - r * 2.2} ${y} L${x - r * .35} ${y - r * .35} Z" fill="${color}"/>`;
}
const stars = (n, y2, colors = ["#fff8e0", "#ffffff", "#ffe9b0"]) => Array.from({ length: n }, () => `<circle cx="${f(rr(0, W))}" cy="${f(rr(0, y2))}" r="${f(rr(.8, 2.6))}" fill="${pick(colors)}" opacity="${rr(.4, 1).toFixed(2)}"/>`).join("");
function lamp(x, y, s, defs, flame = true) {
  return `${flame ? glow(x + 34 * s, y - 34 * s, 160 * s, "#ffbf5a", .75, defs) : ""}<path d="M${f(x - 40 * s)} ${f(y - 10 * s)} C ${f(x - 40 * s)} ${f(y - 34 * s)}, ${f(x + 30 * s)} ${f(y - 36 * s)}, ${f(x + 44 * s)} ${f(y - 18 * s)} L ${f(x + 36 * s)} ${f(y - 8 * s)} C ${f(x + 10 * s)} ${f(y + 2 * s)}, ${f(x - 30 * s)} ${f(y + 4 * s)}, ${f(x - 40 * s)} ${f(y - 10 * s)} Z" fill="#a8603a"/><ellipse cx="${f(x - 8 * s)}" cy="${f(y - 26 * s)}" rx="${f(10 * s)}" ry="${f(4 * s)}" fill="#5c3220"/><path d="M${f(x - 34 * s)} ${f(y - 16 * s)} C ${f(x - 50 * s)} ${f(y - 28 * s)}, ${f(x - 50 * s)} ${f(y - 6 * s)}, ${f(x - 34 * s)} ${f(y - 6 * s)}" stroke="#a8603a" stroke-width="${f(5 * s)}" fill="none"/>
    ${flame ? `<path d="M${f(x + 38 * s)} ${f(y - 22 * s)} C ${f(x + 28 * s)} ${f(y - 40 * s)}, ${f(x + 40 * s)} ${f(y - 56 * s)}, ${f(x + 42 * s)} ${f(y - 70 * s)} C ${f(x + 52 * s)} ${f(y - 52 * s)}, ${f(x + 52 * s)} ${f(y - 34 * s)}, ${f(x + 38 * s)} ${f(y - 22 * s)} Z" fill="#ffe08a"/><path d="M${f(x + 40 * s)} ${f(y - 26 * s)} C ${f(x + 36 * s)} ${f(y - 36 * s)}, ${f(x + 41 * s)} ${f(y - 46 * s)}, ${f(x + 42 * s)} ${f(y - 52 * s)} C ${f(x + 47 * s)} ${f(y - 42 * s)}, ${f(x + 46 * s)} ${f(y - 32 * s)}, ${f(x + 40 * s)} ${f(y - 26 * s)} Z" fill="#fff8de"/>` : ""}`;
}
function jar(x, y, s, c = "#b06a3e", hi = "#dc9a64") {
  return `<path d="M${f(x - 20 * s)} ${y} C ${f(x - 38 * s)} ${f(y - 16 * s)}, ${f(x - 36 * s)} ${f(y - 62 * s)}, ${f(x - 12 * s)} ${f(y - 72 * s)} L ${f(x - 12 * s)} ${f(y - 86 * s)} L ${f(x + 12 * s)} ${f(y - 86 * s)} L ${f(x + 12 * s)} ${f(y - 72 * s)} C ${f(x + 36 * s)} ${f(y - 62 * s)}, ${f(x + 38 * s)} ${f(y - 16 * s)}, ${f(x + 20 * s)} ${y} Z" fill="${c}"/><path d="M${f(x - 22 * s)} ${f(y - 14 * s)} C ${f(x - 30 * s)} ${f(y - 34 * s)}, ${f(x - 26 * s)} ${f(y - 56 * s)}, ${f(x - 12 * s)} ${f(y - 64 * s)}" stroke="${hi}" stroke-width="${f(5 * s)}" fill="none" opacity=".7"/><rect x="${f(x - 15 * s)}" y="${f(y - 90 * s)}" width="${f(30 * s)}" height="${f(6 * s)}" rx="${f(3 * s)}" fill="${c}"/>`;
}
function scroll(x, y, s, open = true) {
  if (!open) return `<g transform="rotate(-8 ${x} ${y})"><rect x="${f(x - 60 * s)}" y="${f(y - 14 * s)}" width="${f(120 * s)}" height="${f(28 * s)}" rx="${f(14 * s)}" fill="#e9d6a8"/><rect x="${f(x - 60 * s)}" y="${f(y - 14 * s)}" width="${f(120 * s)}" height="${f(8 * s)}" rx="${f(4 * s)}" fill="#fff0c8" opacity=".6"/><rect x="${f(x - 10 * s)}" y="${f(y - 15 * s)}" width="${f(10 * s)}" height="${f(30 * s)}" fill="#8a3a2a"/></g>`;
  let lines = ""; for (let i = 0; i < 7; i++) for (const c of [-1, 1]) lines += `<path d="M${f(x + c * 70 * s - 46 * s)} ${f(y - 34 * s + i * 11 * s)} h ${f(rr(70, 92) * s)}" stroke="#6b5036" stroke-width="${f(2.4 * s)}" opacity=".55"/>`;
  return `<path d="M${f(x - 160 * s)} ${f(y - 48 * s)} Q ${f(x)} ${f(y - 30 * s)}, ${f(x + 160 * s)} ${f(y - 48 * s)} L ${f(x + 160 * s)} ${f(y + 44 * s)} Q ${f(x)} ${f(y + 60 * s)}, ${f(x - 160 * s)} ${f(y + 44 * s)} Z" fill="#f1e0b6"/>${lines}
    <rect x="${f(x - 182 * s)}" y="${f(y - 58 * s)}" width="${f(26 * s)}" height="${f(112 * s)}" rx="${f(12 * s)}" fill="#dcc394"/><rect x="${f(x + 156 * s)}" y="${f(y - 58 * s)}" width="${f(26 * s)}" height="${f(112 * s)}" rx="${f(12 * s)}" fill="#dcc394"/>
    <rect x="${f(x - 174 * s)}" y="${f(y - 74 * s)}" width="${f(10 * s)}" height="${f(144 * s)}" rx="${f(4 * s)}" fill="#6b4226"/><rect x="${f(x + 164 * s)}" y="${f(y - 74 * s)}" width="${f(10 * s)}" height="${f(144 * s)}" rx="${f(4 * s)}" fill="#6b4226"/>`;
}
function sheep(x, y, s, dir = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${dir * s} ${s})">${["M-30 0 v14", "M-14 2 v14", "M16 2 v14", "M28 0 v14"].map((d) => `<path d="${d}" stroke="#3a2e26" stroke-width="5"/>`).join("")}
    <ellipse cx="0" cy="-12" rx="42" ry="26" fill="#efe6d4"/>${[[-26, -24], [-6, -30], [16, -28], [30, -14], [-34, -6], [8, -10]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="14" fill="#f7f0e2"/>`).join("")}
    <ellipse cx="44" cy="-22" rx="13" ry="16" fill="#4a3a30"/><ellipse cx="34" cy="-30" rx="9" ry="5" fill="#4a3a30" transform="rotate(-25 34 -30)"/><circle cx="48" cy="-25" r="2.2" fill="#f5e6c8"/></g>`;
}
function wheat(x, y, s, c = "#d9a843") {
  let g = ""; for (let i = 0; i < 12; i++) { const a = (i - 5.5) * .07, L = rr(120, 150) * s, ex = x + Math.sin(a) * L, ey = y - Math.cos(a) * L; g += `<path d="M${f(x)} ${f(y)} L${f(ex)} ${f(ey)}" stroke="#b88a3a" stroke-width="${f(3 * s)}"/><ellipse cx="${f(ex)}" cy="${f(ey - 10 * s)}" rx="${f(5 * s)}" ry="${f(16 * s)}" transform="rotate(${f(a * 57)} ${f(ex)} ${f(ey - 10 * s)})" fill="${c}"/>`; }
  return g + `<rect x="${f(x - 16 * s)}" y="${f(y - 46 * s)}" width="${f(32 * s)}" height="${f(9 * s)}" fill="#a0702c"/>`;
}
function basket(x, y, s, fruit) {
  return `${dabs(x, y - 34 * s, 60 * s, 26 * s, 40, fruit, { r1: 9 * s, r2: 14 * s, op: [.9, 1], stretch: 1 })}<path d="M${f(x - 70 * s)} ${f(y - 34 * s)} L ${f(x + 70 * s)} ${f(y - 34 * s)} L ${f(x + 54 * s)} ${y} L ${f(x - 54 * s)} ${y} Z" fill="#8a5a30"/>${[0, 1, 2].map((i) => `<path d="M${f(x - 66 * s + i * 4 * s)} ${f(y - 24 * s + i * 10 * s)} L ${f(x + 66 * s - i * 4 * s)} ${f(y - 24 * s + i * 10 * s)}" stroke="#b07a42" stroke-width="${f(3 * s)}"/>`).join("")}`;
}
function candle(x, y, h, color, defs, s = 1) {
  return `${glow(x, y - h - 18 * s, 120 * s, "#ffcf70", .6, defs)}<rect x="${f(x - 14 * s)}" y="${f(y - h)}" width="${f(28 * s)}" height="${f(h)}" rx="${f(3 * s)}" fill="${color}"/><rect x="${f(x - 14 * s)}" y="${f(y - h)}" width="${f(8 * s)}" height="${f(h)}" fill="#fff" opacity=".18"/>
    <path d="M${f(x)} ${f(y - h - 4 * s)} C ${f(x - 8 * s)} ${f(y - h - 16 * s)}, ${f(x - 2 * s)} ${f(y - h - 30 * s)}, ${f(x)} ${f(y - h - 40 * s)} C ${f(x + 6 * s)} ${f(y - h - 28 * s)}, ${f(x + 8 * s)} ${f(y - h - 14 * s)}, ${f(x)} ${f(y - h - 4 * s)} Z" fill="#ffe7a0"/><circle cx="${f(x)}" cy="${f(y - h - 12 * s)}" r="${f(4 * s)}" fill="#fffbe8"/>`;
}
function boat(x, y, s, sail = "#efe2c8") {
  return `<path d="M${f(x - 70 * s)} ${f(y - 14 * s)} Q ${f(x)} ${f(y + 18 * s)}, ${f(x + 74 * s)} ${f(y - 16 * s)} L ${f(x + 60 * s)} ${f(y - 2 * s)} Q ${f(x)} ${f(y + 14 * s)}, ${f(x - 58 * s)} ${f(y)} Z" fill="#5a3b26"/><path d="M${f(x)} ${f(y - 10 * s)} L ${f(x)} ${f(y - 110 * s)}" stroke="#4a3020" stroke-width="${f(4 * s)}"/><path d="M${f(x + 3 * s)} ${f(y - 104 * s)} Q ${f(x + 54 * s)} ${f(y - 64 * s)}, ${f(x + 4 * s)} ${f(y - 20 * s)} Z" fill="${sail}"/>`;
}
function burst(cx, cy, r, colors, defs, n = 22) {
  let g = glow(cx, cy, r * 1.3, colors[0], .55, defs);
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + rr(-.08, .08), L = r * rr(.6, 1); const ex = cx + Math.cos(a) * L, ey = cy + Math.sin(a) * L + L * .08; g += `<path d="M${f(cx + Math.cos(a) * r * .12)} ${f(cy + Math.sin(a) * r * .12)} Q ${f(cx + Math.cos(a) * L * .6)} ${f(cy + Math.sin(a) * L * .6)}, ${f(ex)} ${f(ey)}" stroke="${pick(colors)}" stroke-width="${f(rr(2, 4))}" stroke-linecap="round" fill="none" opacity=".85"/><circle cx="${f(ex)}" cy="${f(ey)}" r="${f(rr(3, 6))}" fill="${pick(colors)}"/>`; }
  return g;
}
function tomb(x, y, s, defs, op = 1) {
  return `<g opacity="${op}"><path d="M${f(x - 260 * s)} ${y} C ${f(x - 250 * s)} ${f(y - 150 * s)}, ${f(x - 120 * s)} ${f(y - 230 * s)}, ${f(x + 20 * s)} ${f(y - 220 * s)} C ${f(x + 180 * s)} ${f(y - 210 * s)}, ${f(x + 270 * s)} ${f(y - 130 * s)}, ${f(x + 290 * s)} ${y} Z" fill="#b39a7c"/>
    ${dabs(x, y - 120 * s, 230 * s, 90 * s, 60, ["#c8b08f", "#9c8366", "#d8c3a2"], { r1: 8 * s, r2: 20 * s, op: [.3, .6] })}
    ${glow(x - 10 * s, y - 60 * s, 160 * s, "#fff2c4", .9, defs)}<path d="M${f(x - 58 * s)} ${y} L ${f(x - 58 * s)} ${f(y - 80 * s)} A ${f(48 * s)} ${f(48 * s)} 0 0 1 ${f(x + 38 * s)} ${f(y - 80 * s)} L ${f(x + 38 * s)} ${y} Z" fill="#fff1c9"/>
    <ellipse cx="${f(x + 120 * s)}" cy="${f(y - 66 * s)}" rx="${f(62 * s)}" ry="${f(66 * s)}" fill="#a48a6c"/><ellipse cx="${f(x + 112 * s)}" cy="${f(y - 70 * s)}" rx="${f(40 * s)}" ry="${f(44 * s)}" fill="#bfa585" opacity=".7"/></g>`;
}
function lily(x, y, s) {
  return `<path d="M${x} ${y} Q ${f(x + 4 * s)} ${f(y - 60 * s)}, ${f(x)} ${f(y - 120 * s)}" stroke="#4d7a3a" stroke-width="${f(4 * s)}" fill="none"/><path d="M${x} ${f(y - 40 * s)} q ${f(-30 * s)} ${f(-10 * s)} ${f(-40 * s)} ${f(-40 * s)} q ${f(24 * s)} ${f(4 * s)} ${f(40 * s)} ${f(30 * s)}" fill="#5f8f46"/>
    ${[-1, 1, 0].map((d) => `<path d="M${f(x)} ${f(y - 118 * s)} Q ${f(x + d * 30 * s)} ${f(y - 140 * s)}, ${f(x + d * 40 * s + (d ? 0 : 6 * s))} ${f(y - 170 * s)} Q ${f(x + d * 14 * s)} ${f(y - 150 * s)}, ${f(x)} ${f(y - 118 * s)} Z" fill="#fffdf4" stroke="#e6dcc0" stroke-width="${f(1.4 * s)}"/>`).join("")}<circle cx="${x}" cy="${f(y - 130 * s)}" r="${f(4 * s)}" fill="#e8b840"/>`;
}
const rain = (n, op = .22) => Array.from({ length: n }, () => { const x = rr(-100, W), y = rr(0, H * .7), L = rr(30, 60); return `<path d="M${f(x)} ${f(y)} l ${f(-L * .25)} ${f(L)}" stroke="#e8f0f6" stroke-width="1.6" opacity="${op}"/>`; }).join("");
function rainbow(cx, cy, r, op) {
  const cols = ["#d9534f", "#f0ad4e", "#f7e463", "#6fbf73", "#5b9bd5", "#8e6fc2"];
  return `<g opacity="${op}">${cols.map((c, i) => `<path d="M${cx - r + i * 12} ${cy} A ${r - i * 12} ${r - i * 12} 0 0 1 ${cx + r - i * 12} ${cy}" stroke="${c}" stroke-width="13" fill="none"/>`).join("")}</g>`;
}

// The great golden lampstands of the temple courts (lit at the Feast of Tabernacles).
// eslint-disable-next-line no-unused-vars -- kept in case the New Year scene changes again
function lampstand(x, base, h, defs) {
  const top = base - h, arm = h * .28;
  let g = `<rect x="${f(x - 4)}" y="${f(top)}" width="8" height="${f(h)}" fill="#b8862e"/><rect x="${f(x - arm)}" y="${f(top + 6)}" width="${f(arm * 2)}" height="6" fill="#c8963a"/><path d="M${f(x - 16)} ${base} L ${f(x + 16)} ${base} L ${f(x + 6)} ${f(base - 14)} L ${f(x - 6)} ${f(base - 14)} Z" fill="#a8782a"/>`;
  for (const dx of [-arm, -arm / 3, arm / 3, arm]) g += `${glow(x + dx, top - 4, 90, "#ffc860", .8, defs)}<ellipse cx="${f(x + dx)}" cy="${f(top + 4)}" rx="9" ry="5" fill="#d8a848"/><path d="M${f(x + dx)} ${f(top + 2)} C ${f(x + dx - 7)} ${f(top - 10)}, ${f(x + dx - 2)} ${f(top - 20)}, ${f(x + dx)} ${f(top - 26)} C ${f(x + dx + 5)} ${f(top - 16)}, ${f(x + dx + 7)} ${f(top - 8)}, ${f(x + dx)} ${f(top + 2)} Z" fill="#fff0b0"/>`;
  return g;
}
// A fig tree: a low, wide crown of big, dark leaves.
function figTree(x, y, s) {
  return `<path d="M${x - 6 * s} ${y} C ${x - 10 * s} ${y - 40 * s}, ${x - 30 * s} ${y - 60 * s}, ${x - 46 * s} ${y - 80 * s} M${x} ${y - 30 * s} C ${x + 20 * s} ${y - 50 * s}, ${x + 40 * s} ${y - 70 * s}, ${x + 56 * s} ${y - 82 * s}" stroke="#6a5a48" stroke-width="${f(9 * s)}" fill="none" stroke-linecap="round"/>
    ${dabs(x, y - 100 * s, 110 * s, 52 * s, Math.round(60 + 30 * s), ["#3e6a32", "#4e7e3a", "#2e5428", "#6a9a48"], { r1: 9 * s, r2: 17 * s, stretch: 1.2, op: [.8, 1] })}${dabs(x + 20 * s, y - 120 * s, 70 * s, 26 * s, 24, ["#8ab860", "#a8c870"], { r1: 4 * s, r2: 8 * s, op: [.4, .8] })}`;
}
function ox(x, y, s, dir = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${dir * s} ${s})"><path d="M-40 0 v-26 M-26 0 v-26 M22 0 v-26 M34 0 v-26" stroke="#4a3422" stroke-width="8"/><ellipse cx="0" cy="-42" rx="46" ry="26" fill="#8a5e3a"/><ellipse cx="-6" cy="-50" rx="30" ry="12" fill="#a87a50" opacity=".6"/><ellipse cx="50" cy="-50" rx="17" ry="19" fill="#7a5232"/><path d="M42 -66 q -8 -14 -18 -12 M58 -66 q 8 -14 18 -12" stroke="#efe2c8" stroke-width="4" fill="none"/><circle cx="56" cy="-54" r="2.6" fill="#1a1008"/><ellipse cx="60" cy="-40" rx="9" ry="6" fill="#c89878"/></g>`;
}
function donkey(x, y, s, dir = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${dir * s} ${s})"><path d="M-30 0 v-30 M-18 0 v-30 M18 0 v-30 M28 0 v-30" stroke="#4a4440" stroke-width="6"/><ellipse cx="0" cy="-44" rx="38" ry="20" fill="#8a847c"/><path d="M30 -52 L 50 -80 L 64 -74 L 46 -46 Z" fill="#8a847c"/><ellipse cx="62" cy="-78" rx="12" ry="9" fill="#9a948a"/><path d="M52 -86 l -4 -20 l 8 16 M60 -88 l 2 -20 l 4 18" stroke="#6a645c" stroke-width="5"/><circle cx="64" cy="-80" r="2.2" fill="#1a1008"/><ellipse cx="70" cy="-74" rx="5" ry="4" fill="#d8d0c4"/></g>`;
}

/* ---------- the 13 scenes ---------- */
const SCENES = {
  // Dec 31 to Jan 6: fireworks of light over a fresh dawn, and a hill town waking up.
  "new-year"(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#141e44"], [.38, "#4a3f72"], [.6, "#d98a78"], [.72, "#ffd08a"]])}"/>
      ${stars(160, 360)}${glow(820, 600, 760, "#ffc878", .9, d)}${glow(820, 610, 220, "#fff4d4", 1, d)}
      ${Array.from({ length: 22 }, (_, i) => { const a = Math.PI + (i + .5) * Math.PI / 22; return `<path d="M820 610 L ${f(820 + Math.cos(a) * 1500 - 30)} ${f(610 + Math.sin(a) * 1500)} L ${f(820 + Math.cos(a) * 1500 + 30)} ${f(610 + Math.sin(a) * 1500)} Z" fill="#fff0c8" opacity=".07"/>`; }).join("")}
      ${burst(330, 210, 160, ["#ffe7a3", "#ffd0e8", "#fff8e8"], d)}${burst(1270, 180, 180, ["#fff3c4", "#bfe0ff", "#ffe0a8"], d)}${burst(820, 110, 110, ["#ffffff", "#ffe5b0", "#ffc9d8"], d, 18)}${burst(1500, 400, 80, ["#ffe7a3", "#fff"], d, 14)}${burst(110, 420, 76, ["#ffd0e8", "#fff8e8"], d, 14)}
      ${clouds(380, 470, 280, 26, ["#f0a890", "#ffd0a8", "#c88a9a"])}${clouds(1230, 450, 300, 24, ["#f6b898", "#ffe0b8", "#b8889e"])}
      ${ridge(610, 34, "#8a6a86", { seed: 3, rim: "#ffcf9a" })}${ridge(660, 30, "#5a4668", { seed: 5, rim: "#f6b080" })}
      ${house(980, 690, 120, 90, { defs: d, wall: "#7a6070", shade: "#4e3e52", roof: "#3e3244" })}${house(1110, 700, 90, 70, { defs: d, wall: "#6e566a", shade: "#46384c", roof: "#382e40", door: false })}${house(1210, 690, 110, 96, { defs: d, wall: "#7a6070", shade: "#4e3e52", roof: "#3e3244" })}${house(1330, 705, 80, 62, { defs: d, wall: "#6a5266", shade: "#443648", roof: "#352c3c", door: false })}
      ${ridge(720, 26, "#3c2f4c", { seed: 9 })}
      <path d="M720 900 C 760 820, 820 760, 900 730 L 940 732 C 880 770, 840 830, 830 900 Z" fill="#d8a888" opacity=".45"/>
      ${oliveTree(380, 760, 1.2, { leaf: ["#3e3452", "#4e4264", "#5e5070", "#f0b088"], trunk: "#2a2234" })}${cypress(1500, 780, 1.3, ["#241f34", "#30293f", "#3c344c"])}${cypress(1440, 790, .9, ["#241f34", "#30293f", "#3c344c"])}
      ${frame(["#1c1828", "#262036", "#302842"], ["#d88a78", "#f6b48a", "#8a6a8a"], { y: 900 })}`;
  },
  // Jan 7 to 31: new beginnings, a quiet winter sunrise and a lamp-lit home.
  winter(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#47608f"], [.38, "#a99ac0"], [.58, "#f2bfa6"], [.68, "#ffe0b8"]])}"/>
      ${glow(1080, 520, 620, "#ffd09a", .9, d)}${glow(1080, 520, 120, "#fff6de", 1, d)}
      ${clouds(460, 250, 380, 40, ["#c8a8c8", "#e8c0c4", "#a898c0"])}${clouds(1260, 300, 260, 30, ["#ffd0b8", "#e8b0b8"])}
      ${ridge(520, 34, "#8c80a8", { seed: 21, rim: "#ffe0d0" })}${ridge(580, 30, "#c8c2dc", { seed: 23, rim: "#fff2e8" })}
      ${cypress(1240, 640, .9, ["#2e403a", "#3a5048", "#eef0f8"])}${cypress(1290, 650, .7, ["#2e403a", "#3a5048", "#eef0f8"])}
      ${ridge(650, 22, "#dcdcec", { seed: 25 })}
      ${glow(560, 600, 360, "#ffc070", .5, d)}${house(420, 680, 270, 190, { defs: d, wall: "#d4bea0", shade: "#9a8068", roof: "#ffffff" })}<rect x="470" y="470" width="30" height="34" fill="#8a705a"/><path d="M485 466 q 26 -50 -8 -100 q 36 -40 6 -100" stroke="#e9e4ef" stroke-width="14" fill="none" opacity=".5"/>
      ${oliveTree(820, 700, 1, { leaf: ["#6e7462", "#8a917a", "#f4f4f8", "#ffffff"], trunk: "#4a3a2e" })}
      ${dabs(800, 800, 820, 110, 300, ["#ffffff", "#eeeaf6", "#d6d2ea", "#b8b4d6", "#ffe8d4"], { box: true, r1: 6, r2: 16, op: [.5, .9], stretch: 2.4 })}
      <path d="M560 680 C 600 740, 640 800, 700 910 L 820 910 C 720 820, 650 740, 600 680 Z" fill="#ffd8a8" opacity=".55"/>${dabs(650, 790, 70, 110, 40, ["#ffe6c0", "#fff6e2"], { r1: 3, r2: 7, op: [.4, .9] })}
      ${frame(["#1e2c2c", "#283a38", "#344a46", "#eef0f8", "#ffffff"], ["#ffffff", "#fff0e0", "#ffd8c0"], { y: 900 })}`;
  },
  // February: angels in soft golden light over Bethlehem's hills, with the almond trees in bloom
  // (the first trees to flower in the Holy Land, late January and February) and red anemones.
  angels(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#34407a"], [.28, "#8a7ab8"], [.5, "#f0b8c0"], [.66, "#ffe0b4"]])}"/>
      ${stars(110, 260)}${glow(800, 290, 720, "#ffe8c0", .95, d)}${glow(800, 280, 230, "#fffaf0", 1, d)}
      ${Array.from({ length: 14 }, (_, i) => { const a = Math.PI / 2 + (i - 6.5) * .1; return `<path d="M800 290 L ${f(800 + Math.cos(a) * 1200 - 40)} ${f(290 + Math.sin(a) * 1200)} L ${f(800 + Math.cos(a) * 1200 + 40)} ${f(290 + Math.sin(a) * 1200)} Z" fill="#fff6dc" opacity=".09"/>`; }).join("")}
      ${clouds(800, 460, 660, 60, ["#ffe0e4", "#f6c0d0", "#fff4e8", "#e0b0d0", "#ffd8b0"], 150)}
      ${angel(800, 470, 1.35, d)}${angel(450, 430, .8, d, { op: .92 })}${angel(1150, 430, .8, d, { op: .92 })}
      ${clouds(800, 512, 780, 44, ["#ffffff", "#ffe4ec", "#f8d0dc", "#fff0d8"], 140)}
      ${dabs(800, 330, 700, 240, 70, ["#fff6d8", "#ffffff", "#ffe0f0"], { r1: 1.5, r2: 3.5, op: [.5, 1], stretch: 1 })}
      ${ridge(630, 30, "#6a6a98", { seed: 141, rim: "#ffd8c8" })}${ridge(690, 30, "#4a5a70", { seed: 143, rim: "#f6c8b0" })}
      ${house(1040, 712, 90, 66, { defs: d, wall: "#6a6a7c", side: "#4a4a5c", roof: "#3e3e54" })}${house(1140, 722, 70, 54, { defs: d, wall: "#64647a", side: "#46465a", roof: "#3a3a52", door: false })}${house(1220, 714, 90, 70, { defs: d, wall: "#6a6a7c", side: "#4a4a5c", roof: "#3e3e54" })}
      ${sheep(500, 786, .45)}${sheep(580, 796, .4, -1)}${sheep(650, 784, .38)}${person(420, 796, .6, { robe: "#5a4a3a", robe2: "#7a6448", skin: "#a87452", veil: "#8a7a5a", arm: "out", dir: 1 })}
      ${ridge(790, 20, "#3a4a50", { seed: 145 })}
      ${blossomTree(170, 860, 1.5, ["#ffffff", "#ffeef4", "#f8d2e0", "#ffe4ec"], "#4a3a34")}${blossomTree(1450, 860, 1.5, ["#ffffff", "#ffeef4", "#f8d2e0", "#ffe4ec"], "#4a3a34")}${blossomTree(330, 800, .8, ["#ffffff", "#fbe0ea"], "#4a3a34")}
      ${dabs(800, 860, 820, 50, 160, ["#2e4a3a", "#3a5a44", "#46684c"], { box: true, r1: 6, r2: 14 })}${dabs(800, 850, 760, 40, 110, ["#e0283a", "#f04050", "#ffffff", "#b81c30", "#f6d040"], { r1: 4, r2: 7, stretch: 1 })}`;
  },
  // March: a garden in blues and greens, clouds, gentle rain and a faint rainbow.
  march(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#5f7890"], [.4, "#a8bccb"], [.7, "#e6ecd8"]])}"/>
      ${glow(1240, 260, 560, "#fff4d0", .75, d)}${rainbow(1040, 640, 500, .3, d)}
      ${clouds(380, 170, 460, 80, ["#7a8ca0", "#a8b8c8", "#d6e0e6", "#6c7e94"], 130)}${clouds(1260, 120, 360, 50, ["#dfe6ea", "#ffffff", "#c2cfd8"], 70)}
      ${rain(240, .26)}
      ${ridge(540, 30, "#7f98a0", { seed: 31, rim: "#f6f2dc" })}${ridge(590, 26, "#6a8e74", { seed: 33, rim: "#e8f0c8" })}
      ${cypress(1150, 650, 1)}${cypress(1210, 660, .8)}${cypress(330, 640, .8)}
      ${ridge(650, 18, "#5e8a5e", { seed: 35 })}
      <path d="M680 910 C 740 800, 800 720, 880 660 L 930 660 C 880 720, 860 800, 900 910 Z" fill="#c8bc98"/>${dabs(800, 790, 90, 120, 40, ["#e8e0c4", "#a89e80"], { r1: 3, r2: 7, op: [.3, .7] })}
      <path d="M150 760 L 640 744 L 640 790 L 150 806 Z" fill="#a8a090"/>${dabs(400, 774, 240, 22, 60, ["#c0b8a6", "#8a8272", "#d2cab6"], { box: true, r1: 6, r2: 12, op: [.4, .8], stretch: 1.6 })}
      ${blossomTree(1430, 760, 1.2, ["#f6d2dc", "#ffffff", "#e9b4c6"])}
      ${dabs(400, 840, 380, 70, 260, ["#3f6b47", "#5c8b5a", "#79a36a", "#2e5038"], { r1: 6, r2: 14 })}${dabs(1170, 820, 340, 80, 240, ["#3f6b47", "#5c8b5a", "#79a36a", "#2e5038"], { r1: 6, r2: 14 })}
      ${dabs(400, 830, 360, 60, 120, ["#5a7ed0", "#93aaf0", "#ffffff", "#c8b0f0", "#f6e07a"], { r1: 4, r2: 7, stretch: 1 })}${dabs(1170, 810, 320, 70, 120, ["#5a7ed0", "#93aaf0", "#ffffff", "#c8b0f0"], { r1: 4, r2: 7, stretch: 1 })}
      ${frame(["#1e3428", "#28402e", "#34503a"], ["#a8c890", "#d8e8b0"], { y: 900, right: false })}`;
  },
  // Palm Sunday to the Sunday after Easter: three crosses, the empty tomb faded behind them in the dawn.
  easter(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#4a5a90"], [.3, "#c898b0"], [.55, "#ffcc90"], [.68, "#fff0c8"]])}"/>
      ${glow(1080, 520, 760, "#ffd890", .95, d)}${glow(1080, 520, 180, "#fffbe8", 1, d)}
      ${Array.from({ length: 20 }, (_, i) => { const a = Math.PI + (i + .5) * Math.PI / 20; return `<path d="M1080 520 L ${f(1080 + Math.cos(a) * 1600 - 40)} ${f(520 + Math.sin(a) * 1600)} L ${f(1080 + Math.cos(a) * 1600 + 40)} ${f(520 + Math.sin(a) * 1600)} Z" fill="#fff6dc" opacity=".08"/>`; }).join("")}
      ${clouds(380, 220, 380, 40, ["#e8a8b8", "#ffd0b8", "#c890b0"])}${clouds(1380, 200, 240, 30, ["#ffe0c0", "#f0b8c0"])}
      ${ridge(580, 28, "#b8909a", { seed: 41, rim: "#ffe0c0" })}
      ${tomb(1080, 680, 1.05, d, .55)}
      ${ridge(660, 36, "#8a7c6c", { seed: 43, rim: "#ffd8a0" })}
      <path d="M60 740 C 200 640, 330 590, 470 590 C 620 590, 760 650, 900 740 Z" fill="#6e6450"/>${dabs(470, 660, 300, 60, 90, ["#7c7058", "#5a5040", "#9a8c68", "#6a7a48"], { r1: 6, r2: 14, op: [.4, .7], stretch: 2.4 })}<path d="M200 650 C 300 600, 400 590, 470 590 C 560 590, 650 620, 720 660" stroke="#ffd8a0" stroke-width="6" fill="none" opacity=".35"/>
      ${cross(470, 600, 300, { wood: "#3e2a1c", light: "#ffc070" })}${cross(320, 640, 200, { wood: "#4a3424", light: "#f0a868", op: .92 })}${cross(620, 640, 200, { wood: "#4a3424", light: "#f0a868", op: .92 })}
      ${ridge(730, 28, "#5e7442", { seed: 45, rim: "#e8d890" })}
      ${dabs(800, 820, 820, 80, 260, ["#4e6a36", "#6a8a48", "#86a45a", "#3a5228"], { box: true, r1: 6, r2: 14 })}
      ${dabs(800, 810, 800, 70, 110, ["#fff6dc", "#f6c6d8", "#ffffff", "#f3d873"], { r1: 3, r2: 6, stretch: 1 })}
      ${frame(["#1e2a1a", "#283620", "#32422a"], ["#7a9a4a", "#a8b860"], { y: 910 })}
      ${lily(230, 900, 1.25)}${lily(300, 900, 1)}${lily(1350, 900, 1.2)}${lily(1430, 900, .95)}${lily(1280, 900, .8)}`;
  },
  // April after Easter: spring gardens and the three crosses on the hill, the middle one larger and shining.
  april(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#6a9cc8"], [.45, "#cde0e6"], [.7, "#fbecc8"]])}"/>
      ${glow(1180, 380, 600, "#fff0c0", .95, d)}${clouds(420, 180, 400, 50, ["#ffffff", "#eef4f8", "#d0dcea"], 80)}${clouds(1180, 130, 300, 36, ["#ffffff", "#f4f6fa"])}
      ${ridge(540, 30, "#98b49a", { seed: 51, rim: "#fff8dc" })}
      ${glow(1180, 420, 220, "#fff8d8", .9, d)}${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M1180 420 L ${f(1180 + Math.cos(a) * 260 - 10)} ${f(420 + Math.sin(a) * 260)} L ${f(1180 + Math.cos(a) * 260 + 10)} ${f(420 + Math.sin(a) * 260)} Z" fill="#fff8d8" opacity=".14"/>`; }).join("")}
      ${cross(1060, 540, 150, { wood: "#5a4030", light: "#ffd080", op: .92 })}${cross(1300, 540, 150, { wood: "#5a4030", light: "#ffd080", op: .92 })}${cross(1180, 530, 220, { wood: "#6a4a30", light: "#fff0b0" })}
      ${ridge(600, 26, "#78a466", { seed: 53, rim: "#f0f0b0" })}
      ${oliveTree(240, 690, 1.15, { leaf: ["#6e8a54", "#8aa86a", "#b0c88a", "#506a40"] })}${blossomTree(1450, 700, 1.2, ["#ffffff", "#fbe4ec", "#f2c6d6"])}
      <path d="M560 910 C 640 820, 780 710, 1100 620 L 1160 622 C 880 720, 780 820, 790 910 Z" fill="#e2cfa0"/>${dabs(760, 800, 160, 100, 40, ["#f0e2bc", "#c8b488"], { r1: 3, r2: 7, op: [.3, .7] })}
      ${[[430, 760], [520, 830], [980, 740], [1090, 810], [300, 850], [1240, 870]].map(([x, y], i) => dabs(x, y, 100, 36, 90, i % 2 ? ["#e8708e", "#ffc2d2", "#ffffff", "#c84a70"] : ["#ffc83a", "#fff0a0", "#ffffff", "#e89428"], { r1: 4, r2: 8, stretch: 1 })).join("")}
      ${dabs(800, 840, 820, 70, 260, ["#3e7a3e", "#5e9a4e", "#7cb062", "#2e5e32"], { box: true, r1: 5, r2: 12, op: [.35, .8] })}
      ${frame(["#1e3a22", "#284a2c", "#346038"], ["#b8d890", "#e8f0b0"], { y: 910 })}${lily(650, 900, .95)}${lily(720, 900, 1.15)}`;
  },
  // May: flowers and flowering trees of the land: olive, fig and cypress, pomegranates in red bloom,
  // and a meadow of poppies, anemones and daisies along the path to a little house.
  may(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#6aa8dc"], [.5, "#d4e8ee"], [.72, "#fff2d8"]])}"/>
      ${glow(820, 380, 560, "#fff4d0", .95, d)}${clouds(1180, 180, 360, 40, ["#ffffff", "#f2f7fb"])}${clouds(380, 140, 280, 30, ["#ffffff", "#eef4f8"])}
      ${ridge(520, 30, "#a8c0b0", { seed: 61, rim: "#fffbe0" })}${ridge(570, 26, "#88b07a", { seed: 63, rim: "#f6f6c0" })}
      ${cypress(690, 620, .9)}${cypress(930, 616, .8)}${house(760, 610, 130, 90, { defs: d, wall: "#e8d4b0", side: "#b89c78", roof: "#a8845e" })}
      ${oliveTree(560, 650, .85, { leaf: ["#7e9a62", "#9ab87a", "#bcd29a", "#5f7c4c"] })}${figTree(1080, 650, .95)}
      ${blossomTree(300, 700, 1.5, ["#ffffff", "#ffe6ee", "#f6c2d4", "#ffd8e4"])}
      ${figTree(1330, 720, 1.2)}${dabs(1330, 590, 110, 50, 40, ["#e0302a", "#f05a3a", "#c8201c"], { r1: 4, r2: 7, stretch: 1, op: [.85, 1] })}
      <path d="M640 910 C 700 790, 760 680, 810 615 L 840 615 C 820 690, 840 800, 900 910 Z" fill="#e6d2a8"/>
      ${dabs(800, 790, 820, 110, 380, ["#d8302c", "#f05a40", "#ffffff", "#f6d040", "#b02a52", "#ffa8c0", "#7a5cc8"], { box: true, r1: 5, r2: 10, stretch: 1 })}
      ${dabs(800, 800, 820, 100, 220, ["#4e8a46", "#6aa456", "#3a6e3a"], { box: true, r1: 4, r2: 10, op: [.3, .7] })}
      ${dabs(800, 460, 760, 220, 60, ["#ffe6ee", "#ffffff", "#f6c2d4"], { r1: 3, r2: 5, op: [.5, .9] })}
      ${frame(["#c87090", "#e090a8", "#a85878", "#f0b8c8"], ["#ffffff", "#ffe6ee"], { top: true, left: false, right: false })}${frame(["#2a4a2a", "#36583a", "#426a42"], ["#f6a0b8", "#ffffff", "#ffd060"], { y: 920 })}`;
  },
  // June: daily life in Bible times at the town well: faces, oil lamps and jars, water jugs.
  june(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#b8705a"], [.35, "#eca86c"], [.6, "#ffdc9c"]])}"/>
      ${glow(1000, 330, 560, "#fff0c0", .9, d)}
      ${ridge(400, 30, "#c08a64", { seed: 71, rim: "#ffe0a8" })}
      ${house(40, 520, 280, 260, { defs: d, wall: "#d0a878", shade: "#a07850", roof: "#8a6a46" })}${house(1240, 520, 320, 250, { defs: d, wall: "#c8a072", shade: "#98744c", roof: "#846442" })}${house(340, 480, 170, 150, { defs: d, wall: "#dab88a", shade: "#b09068" })}${house(1080, 470, 130, 120, { defs: d, wall: "#d6b486", shade: "#aa8a62", door: false })}${palm(940, 500, 1.1)}
      <rect x="-10" y="510" width="${W + 20}" height="400" fill="${lin(d, [[0, "#c89c6c"], [1, "#8a6440"]])}"/>
      ${dabs(800, 700, 820, 200, 220, ["#b88c5e", "#d8b084", "#9a7450", "#e8c69a"], { box: true, r1: 8, r2: 20, op: [.25, .5], stretch: 2 })}
      ${glow(800, 560, 400, "#ffd890", .5, d)}<ellipse cx="800" cy="590" rx="120" ry="26" fill="#5a4a3a"/><path d="M680 590 L 680 650 Q 800 690, 920 650 L 920 590" fill="#a08a72"/>${dabs(800, 626, 110, 26, 30, ["#b8a48a", "#8a7660"], { r1: 6, r2: 12 })}
      <path d="M700 590 L 700 490 M900 590 L 900 490 M690 490 L 910 490" stroke="#5a3e28" stroke-width="10"/>
      ${jar(170, 690, 1.2)}${jar(250, 700, .85, "#9a5a34")}${jar(1430, 700, 1.3, "#b87444")}${jar(1350, 690, .85)}${lamp(1180, 600, 1, d)}${lamp(380, 640, .8, d)}
      ${person(560, 880, 1.7, { robe: "#4e5e8e", robe2: "#7e92c2", veil: "#efe2c8", skin: "#c48c66", jar: true, dir: 1, glowc: "#ffd890", defs: d })}
      ${person(1060, 880, 1.7, { robe: "#8a3e30", robe2: "#c06a52", veil: "#3e5a80", skin: "#a87452", jar: true, dir: -1, glowc: "#ffd890", defs: d })}
      ${person(830, 880, 1.15, { robe: "#c8963e", robe2: "#ecc678", skin: "#b88160", hair: "#2f2018", child: true, arm: "out", dir: -1 })}
      ${person(330, 860, 1.3, { robe: "#5e4e32", robe2: "#8a7650", skin: "#a8724e", hair: "#2a1d14", arm: "out", dir: 1 })}
      ${sheep(1290, 870, 1, -1)}
      ${frame(["#2e3a1e", "#3a4a26", "#4a5a2e"], ["#8a9a4a", "#b0b860"], { top: true, left: false, right: false })}`;
  },
  // July and August: a town climbing the hill above the Sea of Galilee, its synagogue among the houses,
  // walls along the shore and fishing boats on the water (after the old Holy Land views of Tiberias).
  summer(d) {
    const rows = [[560, 300, 470], [520, 230, 600], [480, 170, 700], [440, 120, 780], [600, 380, 760]];
    let town = "";
    const R2 = rng(808);
    for (const [y, x0, x1] of rows) for (let x = x0; x < x1; x += 34 + R2() * 22) { const w = 40 + R2() * 30, h = 30 + R2() * 24; town += house(x, y + R2() * 10, w, h, { defs: d, wall: pick(["#e0cfae", "#d6c29e", "#e8dabc", "#cdb894"]), side: "#a8946e", roof: "#b8a07a", lit: R2() < .25, door: false }); }
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#5a8cc4"], [.4, "#c8dce6"], [.55, "#fbe2b8"]])}"/>
      ${glow(1220, 300, 520, "#fff0c0", .95, d)}${clouds(500, 160, 380, 40, ["#ffffff", "#f6f2ea", "#dce6f0"])}${clouds(1200, 120, 300, 30, ["#ffffff", "#fdf6ea"])}
      ${ridge(390, 22, "#a094ac", { seed: 81, rim: "#ffe8d0" })}
      <rect x="-10" y="400" width="${W + 20}" height="260" fill="${lin(d, [[0, "#9ac4d4"], [.4, "#5a96b4"], [1, "#2e6688"]])}"/>
      ${dabs(1220, 440, 240, 34, 110, ["#fff6d8", "#ffe9b0", "#ffffff"], { r1: 2, r2: 5, op: [.4, .9], stretch: 4 })}${dabs(1000, 540, 600, 90, 150, ["#a8d4e4", "#6aa4c0", "#3e7a9c"], { r1: 3, r2: 7, op: [.3, .6], stretch: 5 })}
      ${boat(1000, 520, .9)}${boat(1260, 580, .75, "#f6ead2")}${boat(1450, 480, .55)}${boat(880, 600, .6)}
      <path d="M-20 660 L -20 380 C 60 330, 180 300, 300 310 C 420 320, 560 380, 700 470 C 780 520, 820 570, 840 620 L 840 660 Z" fill="#b8a07a"/>${dabs(380, 480, 380, 150, 160, ["#c8b088", "#a88e66", "#d6c098", "#8a9a5a"], { r1: 6, r2: 14, op: [.3, .6], stretch: 2.2 })}
      ${town}
      <g><rect x="300" y="352" width="170" height="70" fill="#f0e6d2"/><path d="M290 354 L 385 318 L 480 354 Z" fill="#c4a882"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${312 + i * 32}" y="364" width="11" height="58" fill="#fffaf0"/><rect x="${323 + i * 32}" y="364" width="4" height="58" fill="#b0a084" opacity=".7"/>`).join("")}</g>
      <path d="M-20 650 L ${W + 20} 640 L ${W + 20} 780 L -20 780 Z" fill="#d8c49a"/>${dabs(800, 700, 820, 50, 120, ["#e6d4ac", "#c8b088", "#b8a078"], { box: true, r1: 6, r2: 14, op: [.3, .6], stretch: 2.4 })}
      <path d="M100 640 L 840 628 L 840 650 L 100 664 Z" fill="#c8b490"/>${Array.from({ length: 24 }, (_, i) => `<rect x="${104 + i * 31}" y="${626 - i * .5}" width="14" height="10" fill="#c8b490"/>`).join("")}<rect x="300" y="590" width="40" height="70" fill="#bca682"/><rect x="620" y="586" width="40" height="70" fill="#bca682"/>
      ${palm(860, 640, .8)}${palm(130, 640, .9)}${cypress(250, 360, .5)}${cypress(560, 420, .45)}
      ${ridge(740, 28, "#7c8a4a", { seed: 85, rim: "#f0e090" })}
      ${dabs(800, 840, 820, 70, 260, ["#8a8a46", "#a8a058", "#6a7438", "#d8c070", "#e8d498"], { box: true, r1: 6, r2: 14 })}${dabs(800, 830, 600, 50, 80, ["#ffffff", "#f2d24a", "#e86a5a"], { r1: 3, r2: 5, stretch: 1 })}
      ${oliveTree(110, 930, 1.7, { leaf: ["#3e4a2c", "#4e5c36", "#6a7a46", "#c8c890"], trunk: "#3a2c20" })}${figTree(1500, 930, 1.5)}`;
  },
  // September: learning. A scroll half written, the reed pen and ink set down beside it, lamplight, and birds flying past the evening window.
  learning(d) {
    const birds = [[1150, 230, 1], [1190, 260, .8], [1240, 215, .9], [1290, 290, .7], [1120, 300, .6]].map(([x, y, k]) => `<path d="M${x - 12 * k} ${y} q ${6 * k} ${-7 * k} ${12 * k} 0 q ${6 * k} ${-7 * k} ${12 * k} 0" stroke="#2e2430" stroke-width="${2.6 * k}" fill="none" stroke-linecap="round"/>`).join("");
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#2e2018"], [1, "#4a3426"]])}"/>
      ${dabs(800, 360, 820, 360, 260, ["#4a3628", "#5c4434", "#3a2a20", "#6a5038"], { box: true, r1: 20, r2: 50, op: [.3, .6] })}
      <path d="M1080 160 L 1080 470 L 1360 470 L 1360 160 Q 1220 70, 1080 160 Z" fill="${lin(d, [[0, "#2e3e76"], [.5, "#b87068"], [1, "#f2b070"]])}"/>${glow(1220, 450, 200, "#ffcf8a", .6, d)}${ridge(430, 14, "#4a3a56", { seed: 91, from: 1080, to: 1360, bottom: 470, tex: false })}${cypress(1310, 452, .3, ["#2a2030", "#342838", "#3e3040"])}${star(1290, 190, 3, d)}${birds}
      <path d="M1060 140 L 1060 490 L 1380 490 L 1380 140 Q 1220 40, 1060 140 Z M1080 160 L 1080 470 L 1360 470 L 1360 160 Q 1220 70, 1080 160 Z" fill="#6a4a34" fill-rule="evenodd"/>
      <rect x="120" y="180" width="400" height="16" fill="#5a3e28"/><rect x="120" y="340" width="400" height="16" fill="#5a3e28"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<g transform="translate(${170 + i * 60} 170)">${scroll(0, 0, .2, false)}</g>`).join("")}${jar(180, 340, .9)}${jar(260, 340, .7, "#8a5030")}${jar(440, 340, 1, "#a06a40")}
      ${glow(820, 600, 760, "#ffb050", .8, d)}
      <path d="M-20 640 L ${W + 20} 600 L ${W + 20} ${H + 20} L -20 ${H + 20} Z" fill="#6a4026"/><path d="M-20 640 L ${W + 20} 600 L ${W + 20} 632 L -20 672 Z" fill="#a8703e"/>
      ${dabs(800, 780, 820, 100, 120, ["#7a4a2c", "#5a3620", "#8a5634"], { box: true, r1: 10, r2: 24, op: [.3, .6], stretch: 3 })}
      ${scroll(760, 720, 1.25)}${lamp(1100, 650, 1.9, d)}${scroll(280, 660, .6, false)}${scroll(1360, 660, .55, false)}
      <path d="M560 772 L 700 742" stroke="#000" stroke-width="7" stroke-linecap="round" opacity=".18" transform="translate(4 6)"/><path d="M560 772 L 700 742" stroke="#f2e6c8" stroke-width="6" stroke-linecap="round"/><path d="M692 744 L 716 739" stroke="#2a1a10" stroke-width="5" stroke-linecap="round"/><path d="M566 768 L 640 752" stroke="#ffffff" stroke-width="1.6" opacity=".7"/>
      <path d="M720 700 q 30 -6 50 4 q 24 8 50 0" stroke="#2a1a10" stroke-width="3" fill="none" opacity=".7"/><circle cx="470" cy="752" r="22" fill="#3a2a20"/><circle cx="470" cy="748" r="15" fill="#1a1410"/>
      ${dabs(900, 560, 520, 220, 70, ["#ffd28a", "#ffe8b8"], { r1: 2, r2: 4, op: [.15, .45], stretch: 1 })}`;
  },
  // October: Psalm 23. Green pastures on the sunlit hills above; below, the valley of the shadow fades into
  // deep navy, beautiful and a little fearful. The Good Shepherd leads the flock through it toward the light,
  // past still waters, and the rod and staff stand close by to comfort.
  psalm23(d) {
    const hillL = lin(d, [[0, "#86b052"], [.3, "#6a9444"], [.52, "#3a5a48"], [.72, "#1e2848"], [1, "#141a34"]], 1, 1);
    const hillR = lin(d, [[0, "#141a34"], [.28, "#1e2848"], [.48, "#3a5a48"], [.7, "#6a9444"], [1, "#86b052"]], 1, -1);
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#1e2a5a"], [.35, "#6a6a98"], [.55, "#e8a888"], [.66, "#ffdca0"]])}"/>
      ${stars(60, 220)}${glow(800, 520, 560, "#ffd890", .9, d)}${glow(800, 530, 130, "#fff8e0", 1, d)}
      ${clouds(380, 200, 340, 40, ["#5a5a88", "#8a7a9a", "#c8a0a0"])}${clouds(1240, 180, 300, 36, ["#6a6a90", "#9a8aa0", "#e0b0a0"])}
      ${ridge(540, 16, "#8a7a9a", { seed: 121, rim: "#ffe0b0" })}
      <path d="M-20 900 L -20 240 C 140 230, 320 300, 470 420 C 560 490, 640 560, 760 560 L 760 900 Z" fill="${hillL}"/>
      <path d="M${W + 20} 900 L ${W + 20} 220 C 1460 220, 1280 300, 1130 420 C 1040 490, 960 560, 840 560 L 840 900 Z" fill="${hillR}"/>
      <path d="M-20 240 C 140 230, 320 300, 470 420 C 560 490, 640 560, 760 560" stroke="#f6e090" stroke-width="6" fill="none" opacity=".55"/><path d="M${W + 20} 220 C 1460 220, 1280 300, 1130 420 C 1040 490, 960 560, 840 560" stroke="#f6e090" stroke-width="6" fill="none" opacity=".55"/>
      ${dabs(200, 330, 230, 80, 220, ["#7aa64a", "#8ab456", "#6a9442", "#a8c868"], { r1: 3, r2: 7, op: [.35, .7], stretch: 2.6 })}${dabs(1400, 310, 230, 80, 220, ["#7aa64a", "#8ab456", "#6a9442", "#a8c868"], { r1: 3, r2: 7, op: [.35, .7], stretch: 2.6 })}
      ${dabs(200, 330, 200, 60, 60, ["#ffffff", "#f6e070", "#f0a0b0"], { r1: 2.5, r2: 4.5, stretch: 1 })}${dabs(1400, 310, 200, 60, 60, ["#ffffff", "#f6e070", "#f0a0b0"], { r1: 2.5, r2: 4.5, stretch: 1 })}
      ${sheep(150, 330, .5)}${sheep(250, 350, .42, -1)}${sheep(1380, 300, .5, -1)}${sheep(1480, 320, .4)}${oliveTree(380, 380, .55, { leaf: ["#5a7a3a", "#6e8e48", "#8aa85a", "#e8d890"], trunk: "#3a2c20" })}${cypress(1210, 380, .55, ["#2e4a32", "#3a5a3c", "#4a6a48"])}
      ${dabs(330, 650, 330, 220, 220, ["#1e2848", "#161c38", "#26305a", "#2e3a50"], { r1: 10, r2: 26, op: [.3, .6], stretch: 2 })}${dabs(1270, 650, 330, 220, 220, ["#1e2848", "#161c38", "#26305a", "#2e3a50"], { r1: 10, r2: 26, op: [.3, .6], stretch: 2 })}
      ${cypress(560, 600, .5, ["#10142a", "#181e38", "#20284a"])}${cypress(1050, 600, .55, ["#10142a", "#181e38", "#20284a"])}
      <path d="M520 910 C 640 780, 760 640, 790 560 L 812 560 C 830 650, 920 790, 1080 910 Z" fill="#1a2040"/>
      <path d="M760 910 C 780 780, 796 660, 800 560 L 806 560 C 812 660, 830 780, 860 910 Z" fill="#e8c890" opacity=".35"/>${dabs(810, 740, 40, 160, 50, ["#ffe6b0", "#fff4d8"], { r1: 2, r2: 5, op: [.3, .8] })}
      <ellipse cx="690" cy="800" rx="90" ry="20" fill="#5a7aa0" opacity=".8"/><ellipse cx="684" cy="794" rx="56" ry="6" fill="#ffe8c0" opacity=".55"/>
      ${person(830, 690, .55, { robe: "#e8dcc4", robe2: "#fff4e0", skin: "#b88060", veil: "#c8b89a", dir: 1, glowc: "#fff0c0", defs: d })}<path d="M846 690 L 852 600 q 2 -10 10 -6" stroke="#6a4626" stroke-width="3" fill="none"/>
      ${glow(800, 760, 180, "#ffe8b0", .25, d)}${sheep(870, 760, .55, -1)}${sheep(760, 740, .45)}${sheep(900, 820, .7, -1)}${sheep(730, 830, .75)}
      ${frame(["#0c0e1e", "#12152a", "#181c36"], ["#2e3456", "#3e4470"], { y: 920 })}
      ${glow(330, 520, 150, "#ffd890", .22, d)}<g transform="rotate(-8 300 900)"><path d="M300 900 L 300 440 C 300 370, 380 360, 392 412 C 398 442, 368 452, 356 436" stroke="#6a4626" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M292 900 L 292 452" stroke="#d09658" stroke-width="5" opacity=".7"/><path d="M308 394 C 330 366, 372 372, 384 398" stroke="#ffd090" stroke-width="4" fill="none" opacity=".7"/></g>
      ${glow(1290, 620, 130, "#ffd890", .22, d)}<g transform="rotate(10 1300 900)"><path d="M1300 900 L 1300 600" stroke="#5a3a20" stroke-width="22" stroke-linecap="round"/><ellipse cx="1300" cy="584" rx="26" ry="38" fill="#5a3a20"/><path d="M1288 560 C 1284 580, 1286 600, 1290 620" stroke="#d09658" stroke-width="6" fill="none" opacity=".7"/><path d="M1292 900 L 1292 640" stroke="#c08a50" stroke-width="5" opacity=".55"/></g>`;
  },
  // Nov 1 through Thanksgiving: the harvest feast, thanks and fall colors.
  harvest(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#5a4070"], [.32, "#d87a52"], [.55, "#ffc070"], [.66, "#ffe2a8"]])}"/>
      ${glow(1160, 500, 620, "#ffd27a", .95, d)}${glow(1160, 500, 110, "#fff2c8", 1, d)}
      ${clouds(400, 230, 360, 40, ["#d88a6a", "#f0a880", "#a86a7a"])}${clouds(1300, 190, 220, 28, ["#f6b890", "#d08a80"])}
      ${ridge(520, 28, "#9a6a5a", { seed: 101, rim: "#ffd8a0" })}${ridge(580, 30, "#c08a42", { seed: 103, rim: "#ffe0a0" })}
      ${dabs(800, 630, 820, 50, 200, ["#e8b04a", "#f2c860", "#d89a3a", "#c08030"], { box: true, r1: 6, r2: 12 })}
      ${[[700, 640], [860, 650], [1020, 636], [380, 650]].map(([x, y]) => wheat(x, y, .55)).join("")}
      ${house(520, 640, 160, 110, { defs: d, wall: "#c89a6a", shade: "#9a7048", roof: "#7a5434" })}
      ${fallTree(200, 720, 1.5)}${fallTree(1440, 700, 1.5)}${fallTree(1080, 610, .7)}
      ${wheat(380, 750, 1.2)}${wheat(440, 760, 1)}${wheat(1240, 770, 1.2)}
      <path d="M-20 770 L ${W + 20} 750 L ${W + 20} ${H + 20} L -20 ${H + 20} Z" fill="#4e2c18"/><path d="M-20 770 L ${W + 20} 750 L ${W + 20} 782 L -20 802 Z" fill="#8a5430"/>
      <path d="M260 790 L 1340 776 L 1380 910 L 220 910 Z" fill="#efe2c6" opacity=".9"/>${dabs(800, 840, 540, 50, 60, ["#d8c8a6", "#fff4dc"], { box: true, r1: 8, r2: 16, op: [.3, .6], stretch: 3 })}
      ${basket(400, 850, 1.3, ["#6a2440", "#4a2050", "#8a3a6a", "#a8c860"])}${basket(1200, 850, 1.3, ["#b02a22", "#e0563a", "#f2a03a", "#d4c050"])}
      <ellipse cx="800" cy="826" rx="130" ry="40" fill="#b07a3e"/><ellipse cx="800" cy="816" rx="110" ry="28" fill="#e0aa62"/>${dabs(800, 808, 80, 16, 24, ["#f2c890", "#c8863e"], { r1: 6, r2: 10 })}
      ${jar(620, 860, 1.15)}${lamp(990, 860, 1.1, d)}
      ${dabs(800, 480, 800, 300, 80, ["#e8902a", "#c8502a", "#f2c04a"], { r1: 4, r2: 7, op: [.6, .9] })}`;
  },
  // The day after Thanksgiving to Dec 30: Advent and the nativity. The star over the stable, the baby
  // Jesus glowing in the manger with Mary and Joseph, the ox, donkey and sheep, and Advent candles.
  advent(d) {
    return `<rect width="${W}" height="${H}" fill="${lin(d, [[0, "#0a1236"], [.45, "#1c2a64"], [.72, "#3a3c80"]])}"/>
      ${stars(300, 520)}${star(800, 140, 10, d)}${Array.from({ length: 3 }, (_, i) => `<path d="M800 150 L ${740 - i * 40} 560 L ${860 + i * 40} 560 Z" fill="#fff6d8" opacity=".06"/>`).join("")}
      ${ridge(520, 30, "#26366a", { seed: 111, rim: "#9ab0e0" })}${ridge(570, 26, "#1c2a54", { seed: 113 })}
      ${house(140, 590, 120, 86, { defs: d, wall: "#46527a", side: "#343e62", roof: "#eef2fa" })}${house(280, 600, 84, 62, { defs: d, wall: "#424c72", side: "#323a5e", roof: "#eef2fa", door: false })}${house(1290, 590, 130, 90, { defs: d, wall: "#46527a", side: "#343e62", roof: "#eef2fa" })}${house(1440, 600, 84, 62, { defs: d, wall: "#424c72", side: "#323a5e", roof: "#eef2fa", door: false })}
      <path d="M540 660 L 540 520 L 800 420 L 1060 520 L 1060 660 Z" fill="#4a3424"/><path d="M520 530 L 800 410 L 1080 530 L 1080 548 L 800 432 L 520 548 Z" fill="#c8a868"/>${dabs(800, 470, 250, 40, 80, ["#d8b878", "#a88848", "#e8cc90"], { r1: 4, r2: 10, op: [.5, .8], stretch: 3 })}
      ${glow(800, 600, 340, "#ffcf7a", .95, d)}<rect x="580" y="530" width="440" height="130" fill="#ffcf78"/>${dabs(800, 600, 210, 56, 60, ["#ffe0a0", "#f0b060", "#ffd890"], { r1: 4, r2: 10 })}<rect x="570" y="520" width="14" height="140" fill="#5a3e28"/><rect x="1016" y="520" width="14" height="140" fill="#5a3e28"/><rect x="796" y="440" width="10" height="90" fill="#5a3e28"/>
      ${ox(660, 650, .75)}${donkey(960, 652, .8, -1)}
      <path d="M716 660 C 704 600, 732 572, 748 570 C 764 572, 780 600, 770 660 Z" fill="#2e5aa0"/><circle cx="748" cy="560" r="14" fill="#ecc8a4"/><path d="M732 568 C 730 540, 766 540, 764 568 C 758 552, 738 552, 732 568 Z" fill="#2e5aa0"/><path d="M738 566 C 736 586, 740 600, 746 610" stroke="#fff6e8" stroke-width="5" fill="none" opacity=".8"/>
      <path d="M856 660 C 850 594, 868 566, 886 564 C 904 566, 916 594, 910 660 Z" fill="#8a5230"/><circle cx="884" cy="554" r="14" fill="#dcac8a"/><path d="M870 556 C 872 536, 898 536, 900 556 C 894 546, 876 546, 870 556 Z" fill="#c8a878"/><rect x="918" y="490" width="6" height="170" fill="#5a3a22"/>
      ${glow(812, 626, 150, "#fffbe8", 1, d)}<path d="M770 660 L 788 630 L 838 630 L 852 660 Z" fill="#8a6038"/><path d="M780 634 L 846 634" stroke="#e8c878" stroke-width="5"/><ellipse cx="812" cy="626" rx="22" ry="10" fill="#fff8ea"/><circle cx="826" cy="620" r="7" fill="#f0d0b0"/><circle cx="826" cy="620" r="16" fill="none" stroke="#fff2b8" stroke-width="3" opacity=".8"/>
      ${sheep(600, 668, .5)}${sheep(1000, 672, .5, -1)}${sheep(1060, 676, .42)}${person(1120, 676, .6, { robe: "#6a5038", robe2: "#8a6c4a", skin: "#a87452", veil: "#a8987a", dir: -1, arm: "out" })}${person(470, 676, .55, { robe: "#5a4a3a", robe2: "#7a6448", skin: "#b88060", veil: "#8a7a5a", dir: 1 })}
      ${ridge(694, 16, "#e6ecf8", { seed: 115 })}${dabs(800, 790, 820, 110, 220, ["#eef2fa", "#ffffff", "#c8d2f0", "#a8b6e0"], { box: true, r1: 6, r2: 16, stretch: 2.4 })}
      ${dabs(800, 890, 380, 40, 280, ["#14522e", "#1e6a3e", "#0e3e24", "#2e8a4e"], { r1: 8, r2: 16, stretch: 2 })}${dabs(800, 886, 370, 34, 36, ["#d0202c", "#f03a3a"], { r1: 6, r2: 9, stretch: 1, op: [.9, 1] })}
      ${candle(500, 892, 90, "#a01e2c", d)}${candle(640, 880, 104, "#b0242e", d)}${candle(960, 880, 104, "#b0242e", d)}${candle(1100, 892, 90, "#a01e2c", d)}${candle(800, 874, 130, "#fbf6ea", d, 1.1)}
      ${frame(["#0c1a14", "#12241c", "#1a3024"], ["#c8d8f0", "#ffffff"], { y: 920 })}`;
  },
};

// A painterly finish: brushy edges, a soft glow over the light, warm vignette and canvas grain.
function wrap(key) {
  gid = 0; R = rng(key.length * 97 + key.charCodeAt(0));
  const defs = [];
  const body = SCENES[key](defs);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${defs.join("")}
    <filter id="paint" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation=".8" result="b"/><feColorMatrix in="b" type="saturate" values="1.18"/></filter>
    <filter id="bloom"><feComponentTransfer><feFuncR type="linear" slope="2.4" intercept="-1.4"/><feFuncG type="linear" slope="2.4" intercept="-1.4"/><feFuncB type="linear" slope="2.4" intercept="-1.5"/></feComponentTransfer><feGaussianBlur stdDeviation="26"/></filter>
    <filter id="impasto" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035 .09" numOctaves="3" seed="12" result="t"/><feDiffuseLighting in="t" surfaceScale="2.2" lighting-color="#fff" result="l"><feDistantLight azimuth="235" elevation="52"/></feDiffuseLighting></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="8"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .42  0 0 0 0 .32  0 0 0 .22 0"/></filter>
    <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#2a1a10" stop-opacity="0"/><stop offset="1" stop-color="#2a1a10" stop-opacity=".38"/></radialGradient>
  </defs>
  <g id="art" transform="translate(-24 -16) scale(1.03 1.036)"><g filter="url(#paint)"><rect x="-40" y="-40" width="${W + 80}" height="${H + 80}" fill="#000"/>${body}</g></g>
  <g filter="url(#bloom)" style="mix-blend-mode:screen" opacity=".7"><use href="#art"/></g>
  <rect width="${W}" height="${H}" filter="url(#impasto)" style="mix-blend-mode:soft-light" opacity=".55"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" style="mix-blend-mode:overlay"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SCENES);
mkdirSync("img/season", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
for (const k of keys) {
  const svg = wrap(k);
  if (process.env.SVG) writeFileSync(`${process.env.SVG}/${k}.svg`, svg);
  await page.setContent(`<html><body style="margin:0;background:#000">${svg}</body></html>`);
  await page.waitForTimeout(100);
  await page.screenshot({ path: `img/season/${k}.jpg`, type: "jpeg", quality: 78, clip: { x: 0, y: 0, width: W, height: H } });
  console.log("painted", k);
}
await browser.close();
