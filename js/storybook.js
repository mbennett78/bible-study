// Storybook pictures for kids: big, friendly sticker-style scenes for the best-known stories.
// Bold ink outlines, soft shading, rosy cheeks, a white sticker edge and a watercolor sky, all
// drawn here for this app (no outside art). Small gentle movements (the ark bobbing, a dove
// flying, waves rolling, a star twinkling, a lion's tail swishing) stand still with "reduce
// motion" or Still pictures (styles.css, "Storybook pictures").
// Each scene draws in a 360 x 200 box.

const INK = "#3a2a1f";
const L = `stroke="${INK}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"`;
const L2 = `stroke="${INK}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"`;
const SKIN = "#f1c6a0", SKIN_D = "#d99c78";
const g = (x, y, s, inner, extra = "") => `<g transform="translate(${x} ${y}) scale(${s})"${extra}>${inner}</g>`;
const flip = (inner) => `<g transform="scale(-1 1)">${inner}</g>`;

// Shared effects: a white sticker edge with a soft shadow, watercolor edges, a soft blur, paper.
export function defs(id) {
  return `<defs>
  <filter id="stk${id}" x="-15%" y="-15%" width="130%" height="130%"><feMorphology in="SourceAlpha" operator="dilate" radius="2.3" result="d"/>
    <feFlood flood-color="#fffdf6"/><feComposite in2="d" operator="in" result="w"/><feGaussianBlur in="d" stdDeviation="2" result="b"/><feOffset in="b" dy="2" result="o"/>
    <feFlood flood-color="#3a2a1f" flood-opacity=".22"/><feComposite in2="o" operator="in" result="s"/><feMerge><feMergeNode in="s"/><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="wc${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="${id % 9}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="soft${id}"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="paper${id}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .35  0 0 0 0 .25  0 0 0 .09 0"/></filter>
  </defs>`;
}
const stick = (id, inner) => `<g filter="url(#stk${id})">${inner}</g>`;
const wash = (id, inner) => `<g filter="url(#wc${id})">${inner}</g>`;
const paper = (id) => `<rect width="360" height="200" filter="url(#paper${id})" pointer-events="none"/>`;
const sky = (id, top, bottom) => `<defs><linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="360" height="200" fill="url(#sky${id})"/>`;
const cloud = (id, x, y, s = 1, c = "#fff", o = .9) => `<g class="sb-drift" style="--sd:${40 + (x % 17)}s"><g transform="translate(${x} ${y}) scale(${s})" filter="url(#soft${id})" opacity="${o}"><ellipse rx="34" ry="11" fill="${c}"/><ellipse cx="-12" cy="-8" rx="16" ry="11" fill="${c}"/><ellipse cx="10" cy="-11" rx="19" ry="14" fill="${c}"/></g></g>`;
const sunW = (id, x, y, r = 18) => `<g transform="translate(${x} ${y})"><circle r="${r * 1.9}" fill="#ffe7a3" opacity=".55" filter="url(#soft${id})"/><g class="sb-spin">${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${-r - 4} C 3 ${-r - 9}, 1 ${-r - 14}, 0 ${-r - 17} C -1 ${-r - 14}, -3 ${-r - 9}, 0 ${-r - 4} Z" fill="#f6c14e" transform="rotate(${i * 30})"/>`).join("")}</g>
  <circle r="${r}" fill="#f9d266"/><circle r="${r}" fill="none" stroke="#f0b23c" stroke-width="2" opacity=".6"/><path d="M${-r * .35} ${-r * .1} C ${-r * .2} ${r * .5}, ${r * .45} ${r * .35}, ${r * .35} ${-r * .15} C ${r * .25} ${-r * .55}, ${-r * .3} ${-r * .5}, ${-r * .2} ${-r * .05}" fill="none" stroke="#f0b23c" stroke-width="1.8" stroke-linecap="round"/></g>`;

/* ---------- People ---------- */
// Feet at 0, about 100 tall. opts: robe, mantle, sash, cloth (head cloth), veil, hair, beard,
// arms: [left, right] of "down" | "up" | "out" | "pray", kneel, staff ("left" | "right").
const shade = (c, k = .82) => { const n = parseInt(c.slice(1), 16); const f = (v) => Math.max(0, Math.min(255, Math.round(v * k))); return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => f(v).toString(16).padStart(2, "0")).join("")}`; };
function arm(pose, robe) {
  const sl = (d) => `<path d="${d}" fill="${robe}" ${L}/>`;
  const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="3.7" fill="${SKIN}" ${L2}/>`;
  if (pose === "up") return sl("M11 -62 C 19 -66, 25 -77, 27 -89 L 19 -92 C 17 -81, 13 -73, 7 -67 Z") + hand(23.5, -93);
  if (pose === "out") return sl("M12 -61 C 21 -60, 29 -56, 35 -50 L 31 -44 C 25 -49, 18 -52, 11 -53 Z") + hand(35, -46);
  if (pose === "pray") return sl("M13 -61 C 18 -55, 14 -46, 4 -46 L 3 -52 C 8 -52, 10 -55, 9 -59 Z");
  return sl("M13 -62 C 20 -56, 23 -44, 22 -33 L 14 -32 C 14 -41, 12 -50, 9 -57 Z") + hand(18.5, -30);
}
function head(o) {
  const browC = o.beard ? "#9a948c" : "#5a3a24";
  const backCloth = o.veil ? `<path d="M-14 -88 C -20 -72, -21 -56, -22 -38 L 22 -38 C 21 -56, 20 -72, 14 -88 Z" fill="${o.veil}" ${L}/><path d="M8 -86 C 14 -70, 16 -56, 17 -39 L 22 -38 C 21 -56, 20 -72, 14 -88 Z" fill="#000" opacity=".12"/>`
    : o.cloth ? `<path d="M-13 -86 C -16 -73, -17 -65, -18 -58 L 18 -58 C 17 -65, 16 -73, 13 -86 Z" fill="${o.cloth}" ${L}/>` : "";
  const top = o.veil ? `<path d="M-13.8 -78 C -15 -96, 15 -96, 13.8 -78 C 9 -86, -9 -86, -13.8 -78 Z" fill="${o.veil}" ${L}/><path d="M-12 -84 Q 0 -90.5 12 -84" stroke="#fff" stroke-width="1.6" fill="none" opacity=".55"/>`
    : o.cloth ? `<path d="M-13.6 -80 C -14 -96, 14 -96, 13.6 -80 C 8 -85.5, -8 -85.5, -13.6 -80 Z" fill="${o.cloth}" ${L}/><path d="M-13.2 -83.6 Q 0 -89 13.2 -83.6" stroke="${o.band || "#c9853c"}" stroke-width="2.6" fill="none"/>`
    : `<path d="M-12.4 -79 C -15 -96, 15 -96, 12.4 -79 C 11 -86, 5 -89, 0 -87 C -5 -89, -11 -86, -12.4 -79 Z" fill="${o.hair || "#6b4528"}" ${L}/><path d="M-6 -90 C -3 -86, 2 -86, 4 -89" stroke="#fff" stroke-width="1.2" fill="none" opacity=".35"/>`;
  const beard = o.beard ? `<path d="M-11.8 -80 C -13 -68, -8 -57, 0 -53 C 8 -57, 13 -68, 11.8 -80 C 9 -73.5, 6 -71.5, 0 -71.5 C -6 -71.5, -9 -73.5, -11.8 -80 Z" fill="${o.beard}" ${L}/>
    <path d="M-6 -66 C -5 -62, -3 -59, -2 -57 M 0 -64 L 0 -56 M 6 -66 C 5 -62, 3 -59, 2 -57" stroke="${shade(o.beard, .78)}" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M-6.6 -71.4 C -4 -73.8, -1 -73, 0 -71.8 C 1 -73, 4 -73.8, 6.6 -71.4 C 4 -69.8, 1.5 -70, 0 -70.8 C -1.5 -70, -4 -69.8, -6.6 -71.4 Z" fill="${o.beard}" ${L2}/>
    <path d="M-2.2 -67.6 Q 0 -66 2.2 -67.6" stroke="#7a3b2a" stroke-width="1.2" fill="none" stroke-linecap="round"/>`
    : `<path d="M-3.4 -71.5 Q 0 -68.6 3.4 -71.5" stroke="#7a3b2a" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  const eyes = o.sleep ? `<path d="M-7 -79 Q -4.6 -77 -2.4 -79 M 2.4 -79 Q 4.6 -77 7 -79" stroke="#2b1d14" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
    : [-4.6, 4.6].map((x) => `<ellipse cx="${x}" cy="-79" rx="1.9" ry="2.5" fill="#2b1d14"/><circle cx="${x + .7}" cy="-80" r=".8" fill="#fff"/>`).join("");
  return `${backCloth}<rect x="-3.5" y="-68" width="7" height="7" fill="${SKIN_D}"/>
    <ellipse cx="-11.6" cy="-77" rx="2.2" ry="3" fill="${SKIN}" ${L2}/><ellipse cx="11.6" cy="-77" rx="2.2" ry="3" fill="${SKIN}" ${L2}/>
    <ellipse cx="0" cy="-78" rx="11.6" ry="12.6" fill="${SKIN}" ${L}/><path d="M5 -89 C 11 -86, 12 -76, 9 -68 C 11 -72, 12 -80, 10 -86 Z" fill="${SKIN_D}" opacity=".5"/>
    ${top}${eyes}<path d="M-7 -84.6 Q -4.6 -86.6 -2.4 -85 M 2.4 -85 Q 4.6 -86.6 7 -84.6" stroke="${browC}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="-7.4" cy="-73.8" rx="2.5" ry="1.5" fill="#f08f7e" opacity=".5"/><ellipse cx="7.4" cy="-73.8" rx="2.5" ry="1.5" fill="#f08f7e" opacity=".5"/>
    <path d="M-.4 -77 Q 1.4 -75.4 -.2 -74.4" stroke="#b9785a" stroke-width="1.1" fill="none" stroke-linecap="round"/>${beard}`;
}
export function person(o) {
  const robe = o.robe || "#5b8fb9", dark = shade(robe, .75);
  const [la, ra] = o.arms || ["down", "down"];
  const staff = o.staff ? `<g transform="translate(${o.staff === "left" ? -23.5 : 23.5} 0)"><path d="M0 2 L 0 ${o.staffTop || -112} C 0 ${(o.staffTop || -112) - 9}, 10 ${(o.staffTop || -112) - 9}, 10 ${(o.staffTop || -112) - 1}" stroke="${INK}" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M0 2 L 0 ${o.staffTop || -112} C 0 ${(o.staffTop || -112) - 9}, 10 ${(o.staffTop || -112) - 9}, 10 ${(o.staffTop || -112) - 1}" stroke="#a06c3e" stroke-width="3" fill="none" stroke-linecap="round"/></g>` : "";
  if (o.kneel) {
    const body = `<path d="M-15 -45 C -20 -34, -23 -16, -25 -2 L 27 -2 C 28 -9, 22 -14, 15 -16 C 17 -28, 17 -38, 15 -45 Q 0 -49 -15 -45 Z" fill="${robe}" ${L}/>
      <path d="M5 -46 C 10 -36, 11 -24, 10 -15 C 16 -14, 24 -10, 26 -4 L 27 -2 C 28 -9, 22 -14, 15 -16 C 17 -28, 17 -38, 15 -45 Z" fill="#000" opacity=".12"/>
      <path d="M-8 -30 C -10 -20, -11 -10, -12 -2 M 2 -14 C 10 -12, 18 -8, 22 -3" stroke="${dark}" stroke-width="1.3" fill="none" opacity=".6"/>
      ${o.mantle ? `<path d="M-15 -45 C -20 -34, -23 -16, -25 -2 Q -18 0 -11 0 C -12 -18, -9 -34, -5 -46 Z" fill="${o.mantle}" ${L}/>` : ""}
      <path d="M-17 -30 Q 0 -27 16.5 -30 L 16.8 -25 Q 0 -22 -17.5 -25 Z" fill="${o.sash || "#e1b04a"}" ${L2}/>`;
    return `${staff}${body}<g transform="translate(0 18)">${flip(arm(la, robe))}${arm(ra, robe)}${head(o)}${la === "pray" ? `<path d="M-3.2 -46 C -4 -52, -1.2 -58.5, 0 -58.5 C 1.2 -58.5, 4 -52, 3.2 -46 Z" fill="${SKIN}" ${L2}/>` : ""}</g>`;
  }
  const body = `<path d="M-14 -63 C -19 -48, -23 -22, -25 -3 Q 0 2 25 -3 C 23 -22, 19 -48, 14 -63 Q 0 -67 -14 -63 Z" fill="${robe}" ${L}/>
    <path d="M5 -64 C 11 -48, 15 -22, 16 -1 L 25 -3 C 23 -22, 19 -48, 14 -63 Z" fill="#000" opacity=".12"/>
    <path d="M-7 -42 C -9 -28, -10 -16, -11 -2 M 4 -40 C 5 -28, 6 -16, 7 -1" stroke="${dark}" stroke-width="1.3" fill="none" opacity=".6"/>
    ${o.mantle ? `<path d="M-14 -63 C -19 -48, -23 -22, -25 -3 Q -19 -.5 -12 0 C -12 -20, -9 -44, -5 -63.5 Z" fill="${o.mantle}" ${L}/><path d="M14 -63 C 19 -48, 23 -22, 25 -3 Q 19 -.5 12 0 C 12 -20, 9 -44, 5 -63.5 Z" fill="${o.mantle}" ${L}/><path d="M12 -50 C 16 -34, 18 -18, 19 -2" stroke="#000" stroke-width="3" opacity=".1"/>` : ""}
    <path d="M-17.6 -38 Q 0 -34 17.6 -38 L 18.3 -32 Q 0 -28 -18.3 -32 Z" fill="${o.sash || "#e1b04a"}" ${L2}/><path d="M5 -31 L 3 -21 L 8.5 -22.5 Z" fill="${o.sash || "#e1b04a"}" ${L2}/>
    <ellipse cx="-8" cy="-.5" rx="6.4" ry="2.8" fill="#8a5a36" ${L2}/><ellipse cx="8" cy="-.5" rx="6.4" ry="2.8" fill="#8a5a36" ${L2}/>`;
  return `${staff}${body}${flip(arm(la, robe))}${arm(ra, robe)}${head(o)}`;
}

/* ---------- Animals ---------- */
function bumpy(rx, ry, n, bump) {
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [Math.cos(a) * rx, Math.sin(a) * ry]; });
  return `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} ${pts.map((p, i) => { const q = pts[(i + 1) % n]; return `A ${bump} ${bump} 0 0 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`; }).join(" ")} Z`;
}
export const sheep = (o = {}) => `<path d="M-12 4 L -12 15 M -3 6 L -3 16 M 8 5 L 8 15 M 15 3 L 15 13" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M-12 4 L -12 15 M -3 6 L -3 16 M 8 5 L 8 15 M 15 3 L 15 13" stroke="#5a4a44" stroke-width="2.6" stroke-linecap="round"/>
  <path d="${bumpy(24, 15, 14, 5.5)}" fill="#fbf6ec" ${L}/><path d="M-10 -6 C -4 -10, 6 -10, 12 -6" stroke="#e2d6bf" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="${bumpy(22, 13, 14, 5)}" fill="none" stroke="#e7dcc6" stroke-width="1" transform="translate(1 2) scale(.7)"/>
  <g transform="translate(-23 -6) rotate(${o.down ? 25 : 0})"><ellipse cx="-8" cy="-2" rx="5" ry="2.6" fill="#6b5a52" ${L2} transform="rotate(-25 -8 -2)"/><ellipse cx="0" cy="0" rx="8.5" ry="10" fill="#7a6860" ${L}/><path d="${bumpy(8, 4.5, 8, 2.5)}" fill="#fbf6ec" ${L2} transform="translate(1 -9)"/>
  <ellipse cx="-3" cy="-1" rx="1.4" ry="1.8" fill="#1f1612"/><ellipse cx="3.6" cy="-1" rx="1.4" ry="1.8" fill="#1f1612"/><circle cx="-2.5" cy="-1.6" r=".5" fill="#fff"/><circle cx="4.1" cy="-1.6" r=".5" fill="#fff"/><ellipse cx="-4.6" cy="2.4" rx="1.6" ry="1" fill="#f08f7e" opacity=".6"/><ellipse cx="5.4" cy="2.4" rx="1.6" ry="1" fill="#f08f7e" opacity=".6"/><path d="M-1 4.5 Q .5 5.8 2 4.5" stroke="#1f1612" stroke-width=".9" fill="none"/></g>`;
export function lion({ sleep = false, id = 0 } = {}) {
  const mane = Array.from({ length: 14 }, (_, i) => `<ellipse cx="0" cy="-17" rx="7" ry="10" fill="${i % 2 ? "#d9822f" : "#c4692a"}" ${L2} transform="rotate(${i * (360 / 14)})"/>`).join("");
  return `<g class="sb-tail" style="transform-origin:28px -8px"><path d="M28 -8 C 40 -12, 44 -24, 40 -32" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 -8 C 40 -12, 44 -24, 40 -32" stroke="#e8a64a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M40 -32 C 34 -36, 36 -44, 41 -42 C 46 -44, 48 -36, 40 -32 Z" fill="#c4692a" ${L2}/></g>
  <path d="M-30 0 C -32 -14, -14 -24, 8 -22 C 26 -21, 34 -12, 32 0 Z" fill="#f0b354" ${L}/><path d="M6 -21 C 22 -20, 32 -12, 31 0 L 18 0 C 22 -8, 18 -16, 6 -21 Z" fill="#000" opacity=".1"/>
  <ellipse cx="-14" cy="0" rx="8" ry="4.2" fill="#f6c46a" ${L}/><ellipse cx="14" cy="0" rx="8" ry="4.2" fill="#f6c46a" ${L}/><path d="M-17 -2 L -17 2 M -13 -2 L -13 2 M 11 -2 L 11 2 M 15 -2 L 15 2" stroke="${INK}" stroke-width=".9"/>
  <g transform="translate(-18 -22)">${mane}<circle cx="-12" cy="-12" r="4.6" fill="#f0b354" ${L2}/><circle cx="12" cy="-12" r="4.6" fill="#f0b354" ${L2}/><circle cx="-12" cy="-12" r="2" fill="#e58a6a"/><circle cx="12" cy="-12" r="2" fill="#e58a6a"/>
    <circle r="14" fill="#f6c46a" ${L}/><ellipse cx="0" cy="5" rx="8" ry="6" fill="#fff4dc" ${L2}/><path d="M-2.6 1.6 L 2.6 1.6 L 0 4.4 Z" fill="#4a2a1a" ${L2}/>
    ${sleep ? `<path d="M-7.5 -3 Q -5 -1 -2.5 -3 M 2.5 -3 Q 5 -1 7.5 -3" stroke="#2b1d14" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="-5" cy="-3" rx="1.9" ry="2.4" fill="#2b1d14"/><ellipse cx="5" cy="-3" rx="1.9" ry="2.4" fill="#2b1d14"/><circle cx="-4.3" cy="-3.8" r=".8" fill="#fff"/><circle cx="5.7" cy="-3.8" r=".8" fill="#fff"/>`}
    <path d="M0 4.4 L 0 6.4 M -3.6 6 Q 0 9.4 3.6 6" stroke="#4a2a1a" stroke-width="1.2" fill="none" stroke-linecap="round"/><ellipse cx="-8.6" cy="3" rx="2.6" ry="1.5" fill="#f08f7e" opacity=".55"/><ellipse cx="8.6" cy="3" rx="2.6" ry="1.5" fill="#f08f7e" opacity=".55"/></g>
  ${sleep ? `<g class="sb-zz" fill="#fff8e1" font-family="Georgia, serif" font-weight="700" stroke="${INK}" stroke-width=".6"><text x="-4" y="-46" font-size="9">z</text><text x="3" y="-55" font-size="11">z</text></g>` : ""}${id ? "" : ""}`;
}
const dove = (s = 1) => `<g transform="scale(${s})"><path d="M-16 0 C -8 -6, 6 -6, 12 -2 C 16 -4, 20 -4, 22 -2 C 19 0, 17 2, 14 3 C 6 8, -8 7, -16 0 Z" fill="#fff" ${L}/>
  <g class="sb-flap" style="transform-origin:0 -2px"><path d="M-4 -2 C -2 -16, 8 -24, 18 -22 C 12 -16, 9 -9, 6 -1 Z" fill="#fff" ${L}/><path d="M2 -6 C 5 -12, 9 -16, 14 -18 M 0 -4 C 3 -9, 6 -12, 10 -14" stroke="#cfd6dd" stroke-width="1" fill="none"/></g>
  <path d="M-16 0 L -24 -4 L -22 2 L -26 4 L -16 3" fill="#fff" ${L2}/><circle cx="15" cy="-3" r="1.2" fill="${INK}"/><path d="M22 -2 L 25 -1 L 22 0" fill="#f0a33c" ${L2}/>
  <path d="M24 -1 C 29 1, 33 5, 36 10" stroke="#6f8f3e" stroke-width="1.4" fill="none"/>${[[28, 2, 30], [31, 5, 50], [33, 8, 20], [30, 6, -30]].map(([a, b, r]) => `<ellipse cx="${a}" cy="${b}" rx="3.6" ry="1.5" fill="#8fae5a" ${L2} transform="rotate(${r} ${a} ${b})"/>`).join("")}</g>`;
const giraffeHead = () => `<path d="M-4 0 L -3 -30 L 4 -30 L 5 0 Z" fill="#f2c25e" ${L}/><circle cx="0" cy="-12" r="2" fill="#c98a3a"/><circle cx="2" cy="-22" r="1.8" fill="#c98a3a"/><circle cx="-1.5" cy="-4" r="1.6" fill="#c98a3a"/>
  <ellipse cx="2" cy="-34" rx="9" ry="6.5" fill="#f2c25e" ${L}/><ellipse cx="8" cy="-32" rx="4.4" ry="3.6" fill="#f7dc9c" ${L2}/><path d="M-3 -39 L -4 -46 M 3 -40 L 3 -47" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/><circle cx="-4" cy="-46.5" r="1.8" fill="#a8743f"/><circle cx="3" cy="-47.5" r="1.8" fill="#a8743f"/>
  <ellipse cx="-7" cy="-37" rx="3.6" ry="1.8" fill="#f2c25e" ${L2} transform="rotate(-20 -7 -37)"/><ellipse cx="1.5" cy="-35.5" rx="1.4" ry="1.8" fill="#2b1d14"/><circle cx="2" cy="-36.2" r=".5" fill="#fff"/><ellipse cx="4" cy="-31" rx="1.8" ry="1" fill="#f08f7e" opacity=".55"/>`;
const elephantFace = () => `<ellipse cx="-12" cy="0" rx="9" ry="11" fill="#a9b4bf" ${L}/><ellipse cx="12" cy="0" rx="9" ry="11" fill="#a9b4bf" ${L}/><ellipse cx="-12" cy="0" rx="5" ry="7" fill="#e7b7b4" opacity=".7"/><ellipse cx="12" cy="0" rx="5" ry="7" fill="#e7b7b4" opacity=".7"/>
  <ellipse cx="0" cy="-1" rx="10" ry="10" fill="#b9c3cc" ${L}/><path d="M-3 5 C -4 12, -2 18, 3 19 C 6 19, 6 16, 3 15 C 1 14, 2 10, 3 5 Z" fill="#b9c3cc" ${L2}/><ellipse cx="-3.8" cy="-2" rx="1.5" ry="1.9" fill="#2b1d14"/><ellipse cx="3.8" cy="-2" rx="1.5" ry="1.9" fill="#2b1d14"/><circle cx="-3.3" cy="-2.7" r=".5" fill="#fff"/><circle cx="4.3" cy="-2.7" r=".5" fill="#fff"/><ellipse cx="-6.5" cy="2.5" rx="2" ry="1.2" fill="#f08f7e" opacity=".55"/><ellipse cx="6.5" cy="2.5" rx="2" ry="1.2" fill="#f08f7e" opacity=".55"/>`;

/* ---------- Things ---------- */
const plankLines = (x0, x1, ys, c) => ys.map((y) => `<path d="M${x0} ${y} Q ${(x0 + x1) / 2} ${y + 3} ${x1} ${y}" stroke="${c}" stroke-width="1.2" fill="none" opacity=".7"/>`).join("");
const ark = () => `<path d="M-118 -30 L 118 -30 C 114 -8, 92 8, 70 10 L -70 10 C -92 8, -114 -8, -118 -30 Z" fill="#b5793f" ${L}/>${plankLines(-112, 112, [-21, -12, -3], "#7e4f27")}
  <path d="M-118 -30 L 118 -30 C 114 -8, 92 8, 70 10 L -70 10 C -80 9, -90 6, -98 1 C -60 4, 40 4, 100 -12 C 108 -18, 114 -24, 118 -30 Z" fill="#000" opacity=".12"/><path d="M-120 -31 L 120 -31" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M-120 -31 L 120 -31" stroke="#8a5530" stroke-width="2"/>
  <rect x="-74" y="-74" width="148" height="44" rx="3" fill="#d7a265" ${L}/>${Array.from({ length: 9 }, (_, i) => `<path d="M${-58 + i * 15} -73 L ${-58 + i * 15} -31" stroke="#a8743f" stroke-width="1" opacity=".55"/>`).join("")}
  <path d="M-88 -72 L 0 -104 L 88 -72 Z" fill="#8a5432" ${L}/><path d="M-62 -81 L 62 -81 M -34 -92 L 34 -92" stroke="#6e4024" stroke-width="1.2" opacity=".7"/><path d="M0 -104 L 88 -72 L 40 -72 Z" fill="#000" opacity=".1"/>
  <rect x="-60" y="-64" width="26" height="22" rx="6" fill="#4a2f1d" ${L}/><rect x="-13" y="-64" width="26" height="22" rx="6" fill="#4a2f1d" ${L}/><rect x="34" y="-64" width="26" height="22" rx="6" fill="#4a2f1d" ${L}/>
  ${g(-47, -44, .9, elephantFace())}${g(47, -44, .62, sheep())}
  <g transform="translate(0 -42)"><g class="sb-peek">${g(0, 0, .8, giraffeHead())}</g></g>`;
const manger = () => `<path d="M-30 0 L -20 -22 M 30 0 L 20 -22 M -24 0 L -30 -22 M 24 0 L 30 -22" stroke="${INK}" stroke-width="5.4" stroke-linecap="round"/><path d="M-30 0 L -20 -22 M 30 0 L 20 -22 M -24 0 L -30 -22 M 24 0 L 30 -22" stroke="#9a6438" stroke-width="3" stroke-linecap="round"/>
  <path d="M-34 -30 L 34 -30 L 26 -14 L -26 -14 Z" fill="#b5793f" ${L}/><path d="M-30 -22 L 30 -22" stroke="#7e4f27" stroke-width="1.2" opacity=".7"/>
  ${Array.from({ length: 15 }, (_, i) => `<path d="M${-32 + i * 4.6} -30 L ${-34 + i * 4.6 + (i % 3) * 2} ${-37 - (i % 4) * 1.6}" stroke="#e8c45a" stroke-width="2" stroke-linecap="round"/>`).join("")}
  <path d="M-21 -33 C -21 -44, 15 -46, 18 -36 C 19 -31, 10 -29, -2 -29 C -14 -29, -21 -29, -21 -33 Z" fill="#fbf5e6" ${L}/><path d="M-12 -40 C -8 -36, -3 -33, 4 -31 M -4 -42 C 0 -38, 5 -35, 12 -33" stroke="#d8cbb0" stroke-width="1.2" fill="none"/>
  <circle cx="17" cy="-39" r="7.4" fill="${SKIN}" ${L}/><path d="M11 -42 C 12 -48, 22 -48, 23 -42 C 20 -44, 14 -44, 11 -42 Z" fill="#7a4a2a"/><path d="M13.6 -38.6 Q 15 -37.4 16.4 -38.6 M 18.4 -38.6 Q 19.8 -37.4 21.2 -38.6" stroke="#2b1d14" stroke-width="1" fill="none" stroke-linecap="round"/><ellipse cx="13.6" cy="-35.6" rx="1.6" ry="1" fill="#f08f7e" opacity=".6"/><ellipse cx="21" cy="-35.6" rx="1.6" ry="1" fill="#f08f7e" opacity=".6"/><path d="M16 -35 Q 17.4 -34 18.6 -35" stroke="#7a3b2a" stroke-width=".9" fill="none"/>`;
const starBig = (id) => `<circle r="28" fill="#fff3c4" opacity=".55" filter="url(#soft${id})"/><g class="sb-twinkle"><path d="M0 -24 C 2 -8, 4 -5, 18 -4 C 5 -2, 3 2, 0 20 C -3 2, -5 -2, -18 -4 C -4 -5, -2 -8, 0 -24 Z" fill="#ffe27a" ${L2}/><path d="M0 -24 C 2 -8, 4 -5, 18 -4 L 0 -4 Z" fill="#fff6c4"/></g>`;
const smallStars = (list) => list.map(([x, y, r], i) => `<g class="sb-twinkle" style="--sd:${2 + (i % 4) * .7}s;--sdl:${-i * .6}s;transform-origin:${x}px ${y}px"><path d="M${x} ${y - r} L ${x + r * .3} ${y - r * .3} L ${x + r} ${y} L ${x + r * .3} ${y + r * .3} L ${x} ${y + r} L ${x - r * .3} ${y + r * .3} L ${x - r} ${y} L ${x - r * .3} ${y - r * .3} Z" fill="#fff3c4"/></g>`).join("");
const flower = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M0 0 C 1 -5, -1 -9, 0 -12" stroke="#5e8a3a" stroke-width="1.6" fill="none"/>${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-16" rx="2.6" ry="3.8" fill="${c}" ${L2} transform="rotate(${r} 0 -13)"/>`).join("")}<circle cy="-13" r="2" fill="#f6c14e" ${L2}/></g>`;
const grassTuft = (x, y, s = 1) => g(x, y, s, `<path d="M-10 0 C -9 -8, -12 -14, -14 -18 C -8 -14, -5 -8, -4 0 C -4 -10, -2 -18, 0 -22 C 2 -16, 3 -8, 3 0 C 5 -8, 9 -14, 14 -17 C 10 -12, 8 -6, 9 0 Z" fill="#7cb85a" ${L2}/>`);

/* ---------- The scenes ---------- */
export const STORYBOOK = {
  ark: { caption: "Noah's ark", draw: (id) => `${sky(id, "#a9d8f0", "#f3f8ee")}${cloud(id, 70, 40, 1.1)}${cloud(id, 250, 30, .8)}${sunW(id, 316, 40, 17)}
    <g class="sb-fly">${g(70, 60, 1, dove(1.1))}</g>
    ${wash(id, `<path d="M0 150 C 40 142, 80 156, 120 148 C 170 140, 210 156, 260 148 C 300 142, 330 152, 360 146 L 360 200 L 0 200 Z" fill="#7fc0e0"/>`)}
    <g class="sb-bob">${stick(id, g(200, 150, .82, ark()))}</g>
    ${wash(id, `<g class="sb-wave"><path d="M-40 168 ${Array.from({ length: 12 }, () => "c 10 -10, 24 -10, 34 0").join(" ")} L 400 200 L -40 200 Z" fill="#4f9fcb"/></g>`)}
    <g class="sb-wave2">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 46 - 10} 172 c 6 -6, 14 -6, 18 -1 c -4 -2, -9 -1, -11 3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"/>`).join("")}</g>
    ${stick(id, g(54, 196, .72, person({ robe: "#5b7fa6", mantle: "#b4613f", cloth: "#efe6d2", beard: "#f4f1ea", sash: "#e1b04a", arms: ["out", "down"], staff: "right" })))}` },
  sea: { caption: "Moses and the Red Sea", draw: (id) => `${sky(id, "#f8d9a8", "#fdf0d8")}${cloud(id, 180, 34, 1, "#fff6e6")}
    <path d="M150 112 L 210 112 L 280 200 L 80 200 Z" fill="#e8cf98"/><path d="M150 112 L 210 112 L 230 140 L 130 140 Z" fill="#dcc083"/>
    ${[[168, 124, .2, "#b4613f"], [186, 122, .2, "#5b8fb9"], [176, 132, .25, "#6aa06a"], [196, 131, .24, "#c08a3e"]].map(([x, y, s, c]) => g(x, y, s, person({ robe: c, cloth: "#efe6d2" })) ).join("")}
    ${wash(id, `<path d="M-10 200 L -10 30 C 30 20, 70 34, 100 28 C 120 24, 136 40, 140 60 C 150 100, 140 150, 96 200 Z" fill="#3f8fc0"/><path d="M-10 200 L -10 50 C 40 44, 80 60, 110 56 C 124 90, 110 150, 70 200 Z" fill="#5fa8d4"/>
      <path d="M370 200 L 370 30 C 330 20, 290 34, 260 28 C 240 24, 224 40, 220 60 C 210 100, 220 150, 264 200 Z" fill="#3f8fc0"/><path d="M370 200 L 370 50 C 320 44, 280 60, 250 56 C 236 90, 250 150, 290 200 Z" fill="#5fa8d4"/>`)}
    <g class="sb-wave">${[[100, 30, 1], [258, 30, -1]].map(([x, y, d]) => `<g transform="translate(${x} ${y}) scale(${d} 1)"><path d="M-30 4 C -20 -10, 6 -16, 18 -4 C 26 4, 22 16, 12 16 C 4 16, 2 8, 8 6" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-60 8 C -50 -2, -38 -4, -28 2" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/></g>`).join("")}</g>
    ${[[40, 100, 1], [60, 150, -1], [310, 110, -1], [300, 160, 1]].map(([x, y, d], i) => `<g class="sb-swim" style="--sdl:${-i * 1.3}s"><g transform="translate(${x} ${y}) scale(${d} 1)"><path d="M-8 0 C -4 -5, 4 -5, 8 0 C 4 5, -4 5, -8 0 Z M 8 0 L 13 -4 L 13 4 Z" fill="#f4a259" ${L2}/><circle cx="-4" cy="-1" r=".9" fill="${INK}"/></g></g>`).join("")}
    ${stick(id, g(182, 198, .95, person({ robe: "#c99a62", mantle: "#a63f35", cloth: "#f4efe4", band: "#a63f35", beard: "#f4f1ea", sash: "#5b7fa6", arms: ["out", "up"], staff: "right", staffTop: -122 })))}` },
  manger: { caption: "Jesus is born in Bethlehem", draw: (id) => `${sky(id, "#24345e", "#55618c")}${smallStars([[30, 30, 3], [70, 60, 2], [110, 24, 2.6], [250, 26, 2.4], [300, 64, 2], [338, 30, 3], [200, 50, 1.8]])}
    <g transform="translate(180 30)">${starBig(id)}</g><path d="M180 44 L 120 150 L 240 150 Z" fill="#fff3c4" opacity=".12"/>
    ${wash(id, `<path d="M0 160 C 60 150, 120 156, 180 152 C 250 148, 310 156, 360 150 L 360 200 L 0 200 Z" fill="#6f8f5a"/>`)}
    ${stick(id, `<g transform="translate(180 168)"><path d="M-96 0 L -96 -84 M 96 0 L 96 -84" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M-96 0 L -96 -84 M 96 0 L 96 -84" stroke="#9a6438" stroke-width="6" stroke-linecap="round"/>
      <path d="M-116 -78 L 0 -116 L 116 -78 L 108 -70 L 0 -104 L -108 -70 Z" fill="#8a5432" ${L}/><path d="M-60 -95 L -56 -88 M -30 -105 L -27 -97 M 30 -105 L 27 -97 M 60 -95 L 56 -88" stroke="#e8c45a" stroke-width="2.4" stroke-linecap="round"/></g>`)}
    <ellipse cx="180" cy="152" rx="40" ry="14" fill="#fff3c4" opacity=".5" filter="url(#soft${id})"/>
    ${stick(id, `${g(112, 186, .82, person({ robe: "#f2eee4", veil: "#5b8fcb", kneel: true, arms: ["pray", "pray"], sash: "#5b8fcb" }))}
      ${g(180, 182, .95, manger())}
      ${g(250, 186, .8, person({ robe: "#8a6a48", mantle: "#c99a62", cloth: "#e9e2d0", band: "#8a6a48", beard: "#6b4528", sash: "#5b7fa6", arms: ["down", "down"], staff: "right" }))}
      ${g(318, 182, .78, flip(sheep()))}${g(40, 182, .7, sheep({ down: true }))}`)}` },
  lions: { caption: "Daniel in the lions' den", draw: (id) => `${sky(id, "#a2795a", "#c79d74")}
    ${wash(id, `<path d="M0 0 L 360 0 L 360 70 C 300 60, 250 30, 230 0 Z" fill="#7d5a42"/><path d="M0 0 L 130 0 C 110 30, 60 60, 0 70 Z" fill="#7d5a42"/><path d="M0 150 C 80 140, 280 140, 360 150 L 360 200 L 0 200 Z" fill="#b48a62"/>
      ${[[40, 110, 22], [300, 100, 26], [80, 60, 14], [330, 160, 16]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .7}" fill="#8f6a4e"/>`).join("")}`)}
    <path d="M140 0 L 220 0 L 262 160 L 98 160 Z" fill="#fff3c4" opacity=".28" class="sb-glow"/>${[150, 170, 190, 210].map((x, i) => `<circle class="sb-mote" style="--sdl:${-i * 1.6}s" cx="${x}" cy="${40 + i * 18}" r="1.4" fill="#fff6d6"/>`).join("")}
    ${stick(id, `${g(78, 176, 1.05, lion({ sleep: true }))}${g(282, 176, 1.05, flip(lion()))}
      ${g(180, 182, 1.05, person({ robe: "#5b7fa6", mantle: "#7a4a8a", hair: "#4a2f1d", sash: "#e1b04a", kneel: true, arms: ["pray", "pray"] }))}`)}
    ${grassTuft(24, 196, .8)}${grassTuft(340, 196, .9)}` },
};
const STAGE = { ark: ["#7fc0e0", 1], sea: [], manger: [], lions: [] };
// Little flowers to brighten scenes that are outdoors in the day.
export const sprinkle = (list) => list.map(([x, y, c]) => flower(x, y, c)).join("");

export function storybookSvg(name, uidN) {
  const sb = STORYBOOK[name];
  if (!sb) return "";
  void STAGE;
  return `<svg class="fish-strip passage-art kids-story storybook" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${sb.caption.replace(/"/g, "&quot;")}">${defs(uidN)}<defs><clipPath id="sbc${uidN}"><rect width="360" height="200" rx="18"/></clipPath></defs><g clip-path="url(#sbc${uidN})">${sb.draw(uidN)}${paper(uidN)}</g></svg>`;
}
