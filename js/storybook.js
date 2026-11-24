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
let blinkN = 0;
const blink = (inner) => `<g class="sb-blink" style="--bl:${-((blinkN++ * 1.7) % 5).toFixed(1)}s">${inner}</g>`;
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
// Faces that fit the story: brows and mouth for each mood. y0 is the mouth line.
const BROWS = {
  calm: "M-7 -84.6 Q -4.6 -86.6 -2.4 -85 M 2.4 -85 Q 4.6 -86.6 7 -84.6",
  joy: "M-7 -85.4 Q -4.6 -87.8 -2.4 -86 M 2.4 -86 Q 4.6 -87.8 7 -85.4",
  worried: "M-7.4 -84.4 Q -5 -85.6 -2.2 -87.4 M 2.2 -87.4 Q 5 -85.6 7.4 -84.4",
  sad: "M-7.4 -84.2 Q -5 -85.2 -2.2 -87 M 2.2 -87 Q 5 -85.2 7.4 -84.2",
  terrified: "M-8 -85.6 Q -5.4 -88 -2.4 -89.8 M 2.4 -89.8 Q 5.4 -88 8 -85.6",
  scared: "M-7.4 -84.8 Q -5 -86.4 -2.2 -88.2 M 2.2 -88.2 Q 5 -86.4 7.4 -84.8",
  firm: "M-7.4 -85.6 L -2.2 -84.8 M 2.2 -84.8 L 7.4 -85.6",
  angry: "M-7.6 -86.8 L -2.2 -84.4 M 2.2 -84.4 L 7.6 -86.8",
};
function mouth(mood, y0) {
  const m = (d, w = 1.4) => `<path d="${d}" stroke="#7a3b2a" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  if (mood === "worried") return m(`M-3 ${y0 + .6} Q -1.5 ${y0 - .8} 0 ${y0 + .4} Q 1.5 ${y0 + 1.4} 3 ${y0}`);
  if (mood === "sad") return m(`M-3 ${y0 + 1.6} Q 0 ${y0 - .8} 3 ${y0 + 1.6}`) + `<path class="sb-tear" d="M-6.4 -75.4 C -7.4 -73.4, -7.6 -72, -6.4 -71.4 C -5.2 -72, -5.4 -73.4, -6.4 -75.4 Z" fill="#8fd0f2" stroke="#3a2a1f" stroke-width=".6"/>`;
  if (mood === "terrified") return `<ellipse cx="0" cy="${y0 + 1.2}" rx="2.8" ry="3.6" fill="#7a3b2a" stroke="#3a2a1f" stroke-width=".8"/><ellipse cx="0" cy="${y0 + 2.6}" rx="1.6" ry="1.2" fill="#e57a7a"/>`
    + [[-11, -88], [12, -86]].map(([x, y], i) => `<path class="sb-sweat" style="--sdl:${-i * .8}s" d="M${x} ${y} C ${x - 1.4} ${y + 2.6}, ${x - 1.2} ${y + 4.4}, ${x} ${y + 4.6} C ${x + 1.2} ${y + 4.4}, ${x + 1.4} ${y + 2.6}, ${x} ${y} Z" fill="#8fd0f2" stroke="#3a2a1f" stroke-width=".6"/>`).join("");
  if (mood === "scared") return `<ellipse cx="0" cy="${y0 + .6}" rx="1.9" ry="2.4" fill="#7a3b2a"/>`;
  if (mood === "firm") return m(`M-3 ${y0 + .4} L 3 ${y0 + .4}`);
  if (mood === "angry") return m(`M-3.4 ${y0 + 1.4} Q 0 ${y0 - 1} 3.4 ${y0 + 1.4}`);
  if (mood === "joy") return `<path d="M-3.8 ${y0 - .4} Q 0 ${y0 + 4.4} 3.8 ${y0 - .4} Z" fill="#7a3b2a" ${L2}/>`;
  return m(`M-3.4 ${y0} Q 0 ${y0 + 2.9} 3.4 ${y0}`);
}
function head(o) {
  const browC = o.brow || (/^#f/i.test(o.beard || "") ? "#9a948c" : "#5a3a24");
  const backCloth = o.veil ? `<path d="M-14 -88 C -20 -72, -21 -56, -22 -38 L 22 -38 C 21 -56, 20 -72, 14 -88 Z" fill="${o.veil}" ${L}/><path d="M8 -86 C 14 -70, 16 -56, 17 -39 L 22 -38 C 21 -56, 20 -72, 14 -88 Z" fill="#000" opacity=".12"/>`
    : o.cloth ? `<path d="M-13 -86 C -16 -73, -17 -65, -18 -58 L 18 -58 C 17 -65, 16 -73, 13 -86 Z" fill="${o.cloth}" ${L}/>`
    : o.longHair ? `<path d="M-13 -86 C -16 -74, -16 -66, -15 -59 C -10 -61, 10 -61, 15 -59 C 16 -66, 16 -74, 13 -86 Z" fill="${o.hair || "#6b4528"}" ${L}/>` : "";
  const top = o.helmet ? `<path d="M0 -96 C -7 -104, -3 -112, 7 -109 C 2 -105, 5 -100, 0 -96 Z" fill="#c4473a" ${L2}/><path d="M-13.8 -79 C -14.6 -99, 14.6 -99, 13.8 -79 Z" fill="#a9b2bb" ${L}/><path d="M4 -95 C 9 -92, 12 -86, 12.6 -80 L 13.8 -79 C 14 -88, 11 -94, 4 -95 Z" fill="#000" opacity=".14"/><path d="M-15 -80 L 15 -80" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/><path d="M-15 -80 L 15 -80" stroke="#d6b45a" stroke-width="2.4" stroke-linecap="round"/><path d="M-13.6 -79 L -14 -69 L -10 -71 Z M 13.6 -79 L 14 -69 L 10 -71 Z" fill="#a9b2bb" ${L2}/>`
    : o.veil ? `<path d="M-13.8 -78 C -15 -96, 15 -96, 13.8 -78 C 9 -86, -9 -86, -13.8 -78 Z" fill="${o.veil}" ${L}/><path d="M-12 -84 Q 0 -90.5 12 -84" stroke="#fff" stroke-width="1.6" fill="none" opacity=".55"/>`
    : o.cloth ? `<path d="M-13.6 -80 C -14 -96, 14 -96, 13.6 -80 C 8 -85.5, -8 -85.5, -13.6 -80 Z" fill="${o.cloth}" ${L}/><path d="M-13.2 -83.6 Q 0 -89 13.2 -83.6" stroke="${o.band || "#c9853c"}" stroke-width="2.6" fill="none"/>`
    : `<path d="M-12.4 -79 C -15 -96, 15 -96, 12.4 -79 C 11 -86, 5 -89, 0 -87 C -5 -89, -11 -86, -12.4 -79 Z" fill="${o.hair || "#6b4528"}" ${L}/><path d="M-6 -90 C -3 -86, 2 -86, 4 -89" stroke="#fff" stroke-width="1.2" fill="none" opacity=".35"/>`;
  const beard = o.beard ? `<path d="M-11.8 -80 C -13 -68, -8 -57, 0 -53 C 8 -57, 13 -68, 11.8 -80 C 9 -73.5, 6 -71.5, 0 -71.5 C -6 -71.5, -9 -73.5, -11.8 -80 Z" fill="${o.beard}" ${L}/>
    <path d="M-6 -66 C -5 -62, -3 -59, -2 -57 M 0 -64 L 0 -56 M 6 -66 C 5 -62, 3 -59, 2 -57" stroke="${shade(o.beard, .78)}" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M-6.6 -71.4 C -4 -73.8, -1 -73, 0 -71.8 C 1 -73, 4 -73.8, 6.6 -71.4 C 4 -69.8, 1.5 -70, 0 -70.8 C -1.5 -70, -4 -69.8, -6.6 -71.4 Z" fill="${o.beard}" ${L2}/>
    ${mouth(o.mood, -67.8)}`
    : mouth(o.mood, -71.5);
  const eyes = o.sleep ? `<path d="M-7 -79 Q -4.6 -77 -2.4 -79 M 2.4 -79 Q 4.6 -77 7 -79" stroke="#2b1d14" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
    : o.mood === "terrified" ? blink([-4.8, 4.8].map((x) => `<ellipse cx="${x}" cy="-79.4" rx="3.2" ry="3.8" fill="#fff" stroke="#2b1d14" stroke-width="1.1"/><circle cx="${x}" cy="-80.6" r="1.4" fill="#2b1d14"/>`).join(""))
    : blink([-4.6, 4.6].map((x) => { const up = o.lookUp ? -1.2 : 0; return `<ellipse cx="${x}" cy="${-79 + up}" rx="1.9" ry="2.5" fill="#2b1d14"/><circle cx="${x + .7}" cy="${-80 + up}" r=".8" fill="#fff"/>`; }).join(""));
  return `${backCloth}<rect x="-3.5" y="-68" width="7" height="7" fill="${SKIN_D}"/>
    <ellipse cx="-11.6" cy="-77" rx="2.2" ry="3" fill="${SKIN}" ${L2}/><ellipse cx="11.6" cy="-77" rx="2.2" ry="3" fill="${SKIN}" ${L2}/>
    <ellipse cx="0" cy="-78" rx="11.6" ry="12.6" fill="${SKIN}" ${L}/><path d="M5 -89 C 11 -86, 12 -76, 9 -68 C 11 -72, 12 -80, 10 -86 Z" fill="${SKIN_D}" opacity=".5"/>
    ${top}${eyes}<path d="${BROWS[o.mood] || BROWS.calm}" stroke="${browC}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="-7.4" cy="-73.8" rx="2.5" ry="1.5" fill="#f08f7e" opacity=".5"/><ellipse cx="7.4" cy="-73.8" rx="2.5" ry="1.5" fill="#f08f7e" opacity=".5"/>
    <path d="M-.4 -77 Q 1.4 -75.4 -.2 -74.4" stroke="#b9785a" stroke-width="1.1" fill="none" stroke-linecap="round"/>${beard}`;
}
const wings = () => [1, -1].map((d) => `<g transform="scale(${d} 1)"><g class="sb-wing" style="transform-origin:8px -62px"><path d="M8 -62 C 26 -80, 46 -78, 50 -64 C 44 -62, 46 -54, 38 -52 C 36 -44, 26 -42, 20 -44 C 16 -50, 12 -56, 8 -62 Z" fill="#fffdf6" ${L}/><path d="M18 -64 C 28 -70, 38 -70, 44 -66 M 18 -56 C 26 -60, 34 -60, 38 -56" stroke="#d9d2c2" stroke-width="1.2" fill="none"/></g></g>`).join("");
export function curled(o) {
  const robe = o.robe || "#5b8fb9";
  return `<path d="M-20 0 C -26 -16, -24 -38, -12 -46 L 4 -44 C -2 -34, -6 -18, -4 0 Z" fill="${o.mantle || robe}" ${L}/>
    <path d="M-12 0 C -14 -14, -4 -28, 8 -28 C 18 -28, 22 -14, 20 0 Z" fill="${robe}" ${L}/><path d="M2 -26 C 10 -26, 16 -18, 16 -8" stroke="#000" stroke-width="3" opacity=".1" fill="none"/>
    <ellipse cx="14" cy="-1" rx="6" ry="2.6" fill="#8a5a36" ${L2}/>
    <g transform="translate(-2 30)">${head(o)}</g>
    <path d="M-10 -42 C 2 -40, 14 -32, 16 -22 L 10 -19 C 8 -26, -2 -32, -12 -34 Z" fill="${robe}" ${L}/><circle cx="13" cy="-19" r="3.6" fill="${SKIN}" ${L2}/>`;
}
export function person(o) {
  if (o.mood === "terrified" && !o.shaking) return `<g class="sb-shake">${person({ ...o, shaking: true })}</g>`;
  if (o.angel) return `${wings()}${person({ ...o, angel: false })}<ellipse cx="0" cy="-98" rx="10" ry="3" fill="none" stroke="${INK}" stroke-width="3.6"/><ellipse class="sb-twinkle" cx="0" cy="-98" rx="10" ry="3" fill="none" stroke="#f6cf55" stroke-width="2"/>`;
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
  const rags = o.rags ? `<rect x="-14" y="-24" width="7" height="6" fill="${shade(robe, 1.18)}" ${L2} transform="rotate(-8 -10 -21)"/><rect x="6" y="-44" width="6" height="7" fill="${shade(robe, .8)}" ${L2} transform="rotate(10 9 -40)"/><path d="M-22 -4 L -18 -9 L -14 -3 L -8 -8 L -3 -2 L 3 -8 L 8 -2 L 13 -8 L 18 -3 L 22 -6" stroke="${INK}" stroke-width="1.3" fill="none"/>` : "";
  return `${staff}${body}${rags}${flip(arm(la, robe))}${arm(ra, robe)}${head(o)}${la === "pray" ? `<path d="M-3.2 -44 C -4 -50, -1.2 -56.5, 0 -56.5 C 1.2 -56.5, 4 -50, 3.2 -44 Z" fill="${SKIN}" ${L2}/>` : ""}`;
}

/* ---------- Animals ---------- */
function bumpy(rx, ry, n, bump) {
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return [Math.cos(a) * rx, Math.sin(a) * ry]; });
  return `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} ${pts.map((p, i) => { const q = pts[(i + 1) % n]; return `A ${bump} ${bump} 0 0 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`; }).join(" ")} Z`;
}
export const sheep = (o = {}) => `<path d="M-12 4 L -12 15 M -3 6 L -3 16 M 8 5 L 8 15 M 15 3 L 15 13" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M-12 4 L -12 15 M -3 6 L -3 16 M 8 5 L 8 15 M 15 3 L 15 13" stroke="#5a4a44" stroke-width="2.6" stroke-linecap="round"/>
  <path d="${bumpy(24, 15, 14, 5.5)}" fill="#fbf6ec" ${L}/><path d="M-10 -6 C -4 -10, 6 -10, 12 -6" stroke="#e2d6bf" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="${bumpy(22, 13, 14, 5)}" fill="none" stroke="#e7dcc6" stroke-width="1" transform="translate(1 2) scale(.7)"/>
  <g transform="translate(-23 -6) rotate(${o.down ? 25 : 0})"><ellipse cx="-8" cy="-2" rx="5" ry="2.6" fill="#6b5a52" ${L2} transform="rotate(-25 -8 -2)"/><ellipse cx="0" cy="0" rx="8.5" ry="10" fill="#7a6860" ${L}/><path d="${bumpy(8, 4.5, 8, 2.5)}" fill="#fbf6ec" ${L2} transform="translate(1 -9)"/>
  ${blink(`<ellipse cx="-3" cy="-1" rx="1.4" ry="1.8" fill="#1f1612"/><ellipse cx="3.6" cy="-1" rx="1.4" ry="1.8" fill="#1f1612"/><circle cx="-2.5" cy="-1.6" r=".5" fill="#fff"/><circle cx="4.1" cy="-1.6" r=".5" fill="#fff"/>`)}<ellipse cx="-4.6" cy="2.4" rx="1.6" ry="1" fill="#f08f7e" opacity=".6"/><ellipse cx="5.4" cy="2.4" rx="1.6" ry="1" fill="#f08f7e" opacity=".6"/><path d="M-1 4.5 Q .5 5.8 2 4.5" stroke="#1f1612" stroke-width=".9" fill="none"/></g>`;
export function lion({ sleep = false, shut = false } = {}) {
  return `<g class="sb-breathe">${lionBody({ sleep, shut })}</g>`;
}
function lionBody({ sleep, shut }) {
  const mane = Array.from({ length: 14 }, (_, i) => `<ellipse cx="0" cy="-17" rx="7" ry="10" fill="${i % 2 ? "#d9822f" : "#c4692a"}" ${L2} transform="rotate(${i * (360 / 14)})"/>`).join("");
  return `<g class="sb-tail" style="transform-origin:28px -8px"><path d="M28 -8 C 40 -12, 44 -24, 40 -32" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M28 -8 C 40 -12, 44 -24, 40 -32" stroke="#e8a64a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M40 -32 C 34 -36, 36 -44, 41 -42 C 46 -44, 48 -36, 40 -32 Z" fill="#c4692a" ${L2}/></g>
  <path d="M-30 0 C -32 -14, -14 -24, 8 -22 C 26 -21, 34 -12, 32 0 Z" fill="#f0b354" ${L}/><path d="M6 -21 C 22 -20, 32 -12, 31 0 L 18 0 C 22 -8, 18 -16, 6 -21 Z" fill="#000" opacity=".1"/>
  <ellipse cx="-14" cy="0" rx="8" ry="4.2" fill="#f6c46a" ${L}/><ellipse cx="14" cy="0" rx="8" ry="4.2" fill="#f6c46a" ${L}/><path d="M-17 -2 L -17 2 M -13 -2 L -13 2 M 11 -2 L 11 2 M 15 -2 L 15 2" stroke="${INK}" stroke-width=".9"/>
  <g transform="translate(-18 -22)">${mane}<circle cx="-12" cy="-12" r="4.6" fill="#f0b354" ${L2}/><circle cx="12" cy="-12" r="4.6" fill="#f0b354" ${L2}/><circle cx="-12" cy="-12" r="2" fill="#e58a6a"/><circle cx="12" cy="-12" r="2" fill="#e58a6a"/>
    <circle r="14" fill="#f6c46a" ${L}/><ellipse cx="0" cy="5" rx="8" ry="6" fill="#fff4dc" ${L2}/><path d="M-2.6 1.6 L 2.6 1.6 L 0 4.4 Z" fill="#4a2a1a" ${L2}/>
    ${sleep ? `<path d="M-7.5 -3 Q -5 -1 -2.5 -3 M 2.5 -3 Q 5 -1 7.5 -3" stroke="#2b1d14" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
    : blink(`<ellipse cx="-5" cy="-3" rx="1.9" ry="2.4" fill="#2b1d14"/><ellipse cx="5" cy="-3" rx="1.9" ry="2.4" fill="#2b1d14"/><circle cx="-4.3" cy="-3.8" r=".8" fill="#fff"/><circle cx="5.7" cy="-3.8" r=".8" fill="#fff"/>${shut ? `<path d="M-7.4 -5 L -2.6 -5 M 2.6 -5 L 7.4 -5" stroke="#4a2a1a" stroke-width="1.3" stroke-linecap="round"/>` : ""}`)}
    ${shut ? `<path d="M0 4.4 L 0 7 M -4 8 Q -2 7 0 7 Q 2 7 4 8" stroke="#4a2a1a" stroke-width="1.3" fill="none" stroke-linecap="round"/>` : `<path d="M0 4.4 L 0 6.4 M -3.6 6 Q 0 9.4 3.6 6" stroke="#4a2a1a" stroke-width="1.2" fill="none" stroke-linecap="round"/><ellipse cx="-8.6" cy="3" rx="2.6" ry="1.5" fill="#f08f7e" opacity=".55"/><ellipse cx="8.6" cy="3" rx="2.6" ry="1.5" fill="#f08f7e" opacity=".55"/>`}</g>
  ${sleep ? `<g class="sb-zz" fill="#fff8e1" font-family="Georgia, serif" font-weight="700" stroke="${INK}" stroke-width=".6"><text x="-4" y="-46" font-size="9">z</text><text x="3" y="-55" font-size="11">z</text></g>` : ""}`;
}
const dove = (s = 1, branch = true) => `<g transform="scale(${s})"><path d="M-16 0 C -8 -6, 6 -6, 12 -2 C 16 -4, 20 -4, 22 -2 C 19 0, 17 2, 14 3 C 6 8, -8 7, -16 0 Z" fill="#fff" ${L}/>
  <g class="sb-flap" style="transform-origin:0 -2px"><path d="M-4 -2 C -2 -16, 8 -24, 18 -22 C 12 -16, 9 -9, 6 -1 Z" fill="#fff" ${L}/><path d="M2 -6 C 5 -12, 9 -16, 14 -18 M 0 -4 C 3 -9, 6 -12, 10 -14" stroke="#cfd6dd" stroke-width="1" fill="none"/></g>
  <path d="M-16 0 L -24 -4 L -22 2 L -26 4 L -16 3" fill="#fff" ${L2}/><circle cx="15" cy="-3" r="1.2" fill="${INK}"/><path d="M22 -2 L 25 -1 L 22 0" fill="#f0a33c" ${L2}/>
  ${branch ? `<path d="M24 -1 C 29 1, 33 5, 36 10" stroke="#6f8f3e" stroke-width="1.4" fill="none"/>${[[28, 2, 30], [31, 5, 50], [33, 8, 20], [30, 6, -30]].map(([a, b, r]) => `<ellipse cx="${a}" cy="${b}" rx="3.6" ry="1.5" fill="#8fae5a" ${L2} transform="rotate(${r} ${a} ${b})"/>`).join("")}` : ""}</g>`;
const giraffeHead = () => `<path d="M-4 0 L -3 -30 L 4 -30 L 5 0 Z" fill="#f2c25e" ${L}/><circle cx="0" cy="-12" r="2" fill="#c98a3a"/><circle cx="2" cy="-22" r="1.8" fill="#c98a3a"/><circle cx="-1.5" cy="-4" r="1.6" fill="#c98a3a"/>
  <ellipse cx="2" cy="-34" rx="9" ry="6.5" fill="#f2c25e" ${L}/><ellipse cx="8" cy="-32" rx="4.4" ry="3.6" fill="#f7dc9c" ${L2}/><path d="M-3 -39 L -4 -46 M 3 -40 L 3 -47" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/><circle cx="-4" cy="-46.5" r="1.8" fill="#a8743f"/><circle cx="3" cy="-47.5" r="1.8" fill="#a8743f"/>
  <ellipse cx="-7" cy="-37" rx="3.6" ry="1.8" fill="#f2c25e" ${L2} transform="rotate(-20 -7 -37)"/><ellipse cx="1.5" cy="-35.5" rx="1.4" ry="1.8" fill="#2b1d14"/><circle cx="2" cy="-36.2" r=".5" fill="#fff"/><ellipse cx="4" cy="-31" rx="1.8" ry="1" fill="#f08f7e" opacity=".55"/>`;
const elephantFace = () => `<ellipse cx="-12" cy="0" rx="9" ry="11" fill="#a9b4bf" ${L}/><ellipse cx="12" cy="0" rx="9" ry="11" fill="#a9b4bf" ${L}/><ellipse cx="-12" cy="0" rx="5" ry="7" fill="#e7b7b4" opacity=".7"/><ellipse cx="12" cy="0" rx="5" ry="7" fill="#e7b7b4" opacity=".7"/>
  <ellipse cx="0" cy="-1" rx="10" ry="10" fill="#b9c3cc" ${L}/><path d="M-3 5 C -4 12, -2 18, 3 19 C 6 19, 6 16, 3 15 C 1 14, 2 10, 3 5 Z" fill="#b9c3cc" ${L2}/>${blink(`<ellipse cx="-3.8" cy="-2" rx="1.5" ry="1.9" fill="#2b1d14"/><ellipse cx="3.8" cy="-2" rx="1.5" ry="1.9" fill="#2b1d14"/><circle cx="-3.3" cy="-2.7" r=".5" fill="#fff"/><circle cx="4.3" cy="-2.7" r=".5" fill="#fff"/>`)}<ellipse cx="-6.5" cy="2.5" rx="2" ry="1.2" fill="#f08f7e" opacity=".55"/><ellipse cx="6.5" cy="2.5" rx="2" ry="1.2" fill="#f08f7e" opacity=".55"/>`;

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
const flower = (x, y, c) => `<g transform="translate(${x} ${y})"><g class="sb-sway" style="--sdl:${-(x % 7) * .4}s"><path d="M0 0 C 1 -5, -1 -9, 0 -12" stroke="#5e8a3a" stroke-width="1.6" fill="none"/>${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-16" rx="2.6" ry="3.8" fill="${c}" ${L2} transform="rotate(${r} 0 -13)"/>`).join("")}<circle cy="-13" r="2" fill="#f6c14e" ${L2}/></g></g>`;
export const grassTuft = (x, y, s = 1) => g(x, y, s, `<g class="sb-sway" style="--sdl:${-(x % 5) * .5}s"><path d="M-10 0 C -9 -8, -12 -14, -14 -18 C -8 -14, -5 -8, -4 0 C -4 -10, -2 -18, 0 -22 C 2 -16, 3 -8, 3 0 C 5 -8, 9 -14, 14 -17 C 10 -12, 8 -6, 9 0 Z" fill="#7cb85a" ${L2}/></g>`);

const spear = (x, top) => `<path d="M${x} 2 L ${x} ${top}" stroke="${INK}" stroke-width="5.4" stroke-linecap="round"/><path d="M${x} 2 L ${x} ${top}" stroke="#9a6438" stroke-width="3" stroke-linecap="round"/><path d="M${x} ${top - 16} L ${x + 5} ${top - 2} L ${x} ${top + 2} L ${x - 5} ${top - 2} Z" fill="#c9d0d6" ${L2}/>`;
const shield = () => `<ellipse cx="0" cy="0" rx="17" ry="21" fill="#c79a3e" ${L}/><ellipse cx="0" cy="0" rx="11" ry="14" fill="none" stroke="#a37a2a" stroke-width="2"/><circle r="4" fill="#e6c766" ${L2}/>`;
const whale = (spout = true, queasy = false) => `<path d="M-70 -10 C -70 -44, -20 -58, 26 -50 C 62 -44, 80 -22, 76 2 C 72 18, 40 26, 0 24 C -40 22, -70 14, -70 -10 Z" fill="#5b8fcb" ${L}/>
  <path d="M-62 4 C -40 18, 30 22, 70 6 C 66 18, 40 26, 0 24 C -40 22, -60 14, -62 4 Z" fill="#cfe3f5" ${L2}/>${[-40, -24, -8, 8, 24, 40].map((x) => `<path d="M${x} ${14 + Math.abs(x) * .05} L ${x + 3} ${22 - Math.abs(x) * .06}" stroke="#a9c6e2" stroke-width="1.2"/>`).join("")}
  <path d="M74 -8 C 92 -24, 104 -22, 108 -30 C 110 -16, 102 -2, 88 2 C 100 6, 108 18, 106 28 C 98 18, 88 12, 74 6 Z" fill="#5b8fcb" ${L}/>
  <path d="M-40 -36 C -30 -46, -10 -50, 4 -50" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"/>
  ${queasy ? `<ellipse cx="-48" cy="-8" rx="12" ry="8" fill="#9fdc8a" opacity=".45" filter="url(#soft0)"/><ellipse cx="-48" cy="-8" rx="9" ry="5.5" fill="#9fdc8a" opacity=".4"/><g class="sb-dizzy" style="transform-origin:-40px -16px"><path d="M-40 -16 m -1 0 a 1 1 0 1 1 2 0 a 2.2 2.2 0 1 1 -4.4 0 a 3.4 3.4 0 1 1 6.8 0" stroke="#1f1612" stroke-width="1.4" fill="none"/></g>
    <path d="M-66 2 Q -62 -2 -58 2 Q -54 6 -50 2 Q -47 -1 -44 2" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round"/><path class="sb-sweat" d="M-30 -34 C -31.6 -31, -31.4 -29, -30 -28.6 C -28.6 -29, -28.4 -31, -30 -34 Z" fill="#8fd0f2" stroke="${INK}" stroke-width=".7"/>`
  : `${blink(`<ellipse cx="-40" cy="-16" rx="3.4" ry="4.4" fill="#1f1612"/><circle cx="-38.8" cy="-17.6" r="1.3" fill="#fff"/>`)}<ellipse cx="-46" cy="-6" rx="5" ry="2.6" fill="#f08f7e" opacity=".55"/>
  <path d="M-66 0 Q -56 8 -46 4" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`}
  ${spout ? `<g class="sb-spout"><path d="M-18 -54 C -20 -64, -24 -70, -32 -74 M -18 -54 C -16 -66, -12 -72, -4 -76 M -18 -54 L -18 -78" stroke="#8fc6ea" stroke-width="3" fill="none" stroke-linecap="round"/>${[[-32, -76], [-4, -78], [-18, -81]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.4" fill="#bfe0f5"/>`).join("")}</g>` : ""}`;
const boat = () => `<path d="M-78 -16 L 78 -16 C 72 0, 56 10, 36 12 L -36 12 C -56 10, -72 0, -78 -16 Z" fill="#b5793f" ${L}/>${plankLines(-72, 72, [-8, 1], "#7e4f27")}<path d="M-80 -17 L 80 -17" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M-80 -17 L 80 -17" stroke="#8a5530" stroke-width="2"/>
  <path d="M-60 -10 C -30 6, 30 6, 66 -10 C 60 2, 46 10, 36 12 L -36 12 C -50 10, -58 2, -60 -10 Z" fill="#000" opacity=".12"/>`;
const tomb = () => `<path d="M-80 0 C -86 -40, -60 -76, -10 -80 C 44 -84, 84 -50, 80 0 Z" fill="#b9ad9c" ${L}/><path d="M20 -80 C 56 -74, 84 -46, 80 0 L 50 0 C 60 -30, 48 -62, 20 -80 Z" fill="#000" opacity=".12"/>
  <path d="M-34 0 C -36 -30, -20 -46, 0 -46 C 20 -46, 34 -30, 32 0 Z" fill="#2e2219" ${L}/><path d="M-24 0 C -24 -20, -14 -32, 0 -32 C 6 -32, 12 -30, 16 -26" stroke="#fff3c4" stroke-width="2" fill="none" opacity=".35"/>
  <path d="M-60 -50 C -50 -56, -40 -58, -30 -58 M 30 -66 C 40 -62, 52 -56, 58 -48" stroke="#9c907e" stroke-width="1.4" fill="none"/>`;
const stone = () => `<circle r="30" fill="#c9bfb0" ${L}/><circle r="30" fill="none" stroke="#a89c8a" stroke-width="2" transform="scale(.7)"/><path d="M10 -26 C 24 -18, 30 -2, 24 14" stroke="#000" stroke-width="5" fill="none" opacity=".08"/>`;
export const lily = (x, y, s = 1) => g(x, y, s, `<g class="sb-sway" style="--sdl:${-(x % 6) * .5}s"><path d="M0 0 C 1 -10, -1 -20, 0 -28" stroke="#5e8a3a" stroke-width="2" fill="none"/><path d="M0 -6 C -8 -10, -12 -16, -12 -20 C -6 -18, -2 -12, 0 -6 Z" fill="#7cb85a" ${L2}/>
  <path d="M0 -26 C -8 -30, -12 -38, -9 -44 C -6 -38, -3 -36, 0 -36 C 3 -36, 6 -38, 9 -44 C 12 -38, 8 -30, 0 -26 Z" fill="#fffdf6" ${L2}/><path d="M0 -28 C -2 -36, -1 -42, 0 -46 C 1 -42, 2 -36, 0 -28 Z" fill="#fffdf6" ${L2}/><circle cx="0" cy="-30" r="1.6" fill="#f6c14e"/></g>`);

const oliveTree = (x, y, s = 1) => g(x, y, s, `<path d="M-6 0 C -4 -10, -10 -18, -4 -28 C 0 -34, -6 -40, -2 -46 L 4 -46 C 2 -38, 8 -32, 4 -24 C 0 -16, 6 -8, 6 0 Z" fill="#8a7a66" ${L}/><path d="M-1 -20 C 1 -14, 0 -8, 1 0" stroke="#6b5c4b" stroke-width="1.2" fill="none"/>
  <g class="sb-sway" style="--sdl:${-(x % 5) * .6}s">${[[-16, -50, 14, 10], [0, -60, 16, 11], [16, -50, 14, 10], [-6, -44, 12, 8], [10, -42, 12, 8]].map(([a, b, rx, ry]) => `<ellipse cx="${a}" cy="${b}" rx="${rx}" ry="${ry}" fill="#9aa97a" ${L2}/>`).join("")}
  ${[[-14, -52], [4, -62], [16, -48], [-4, -44], [8, -54]].map(([a, b]) => `<path d="M${a - 4} ${b} l 7 -2" stroke="#c9d3ae" stroke-width="1.6" stroke-linecap="round"/>`).join("")}${[[-10, -46], [6, -56], [14, -44]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.6" fill="#4e5a34"/>`).join("")}</g>`);
const terebinth = (x, y, s = 1) => g(x, y, s, `<path d="M-8 0 C -6 -10, -8 -20, -14 -28 L -8 -30 C -4 -24, 0 -22, 2 -22 C 6 -26, 10 -30, 16 -32 L 20 -28 C 12 -22, 8 -12, 8 0 Z" fill="#7a6250" ${L}/>
  <g class="sb-sway" style="--sdl:${-(x % 5) * .6}s">${[[-26, -38, 18, 12], [0, -48, 24, 15], [26, -38, 18, 12], [-12, -32, 16, 9], [14, -32, 16, 9]].map(([a, b, rx, ry]) => `<ellipse cx="${a}" cy="${b}" rx="${rx}" ry="${ry}" fill="#6f8f4a" ${L2}/>`).join("")}${[[-20, -40], [4, -52], [22, -40], [-6, -34]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" fill="#b5524a"/>`).join("")}</g>`);
const datePalm = (x, y, s = 1) => g(x, y, s, `<path d="M-4 0 C -2 -30, 0 -56, 4 -80 L 9 -80 C 6 -56, 4 -30, 4 0 Z" fill="#a37a4e" ${L}/>${Array.from({ length: 8 }, (_, i) => `<path d="M${-2 + (i % 2) * 2} ${-8 - i * 9} l 8 -3" stroke="#7e5a36" stroke-width="1.2"/>`).join("")}
  <g class="sb-sway" style="--sdl:${-(x % 4) * .7}s;transform-origin:6px -80px">${[-150, -120, -95, -70, -40, -15].map((r) => `<path d="M6 -80 C ${6 + 18 * Math.cos(r * Math.PI / 180)} ${-80 + 18 * Math.sin(r * Math.PI / 180) - 6}, ${6 + 34 * Math.cos(r * Math.PI / 180)} ${-80 + 34 * Math.sin(r * Math.PI / 180)}, ${6 + 40 * Math.cos((r + 20) * Math.PI / 180)} ${-80 + 40 * Math.sin((r + 20) * Math.PI / 180) + 12}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M6 -80 C ${6 + 18 * Math.cos(r * Math.PI / 180)} ${-80 + 18 * Math.sin(r * Math.PI / 180) - 6}, ${6 + 34 * Math.cos(r * Math.PI / 180)} ${-80 + 34 * Math.sin(r * Math.PI / 180)}, ${6 + 40 * Math.cos((r + 20) * Math.PI / 180)} ${-80 + 40 * Math.sin((r + 20) * Math.PI / 180) + 12}" stroke="#6f9a4a" stroke-width="3.6" fill="none" stroke-linecap="round"/>`).join("")}
  ${[[0, -74], [10, -73], [5, -70]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="#d9822f" ${L2}/>`).join("")}</g>`);
const scrub = (x, y, s = 1) => g(x, y, s, `<g class="sb-sway" style="--sdl:${-(x % 6) * .4}s"><path d="M-14 0 C -18 -8, -10 -16, -2 -14 C 2 -20, 12 -18, 12 -10 C 18 -8, 16 0, 12 0 Z" fill="#a3ad84" ${L2}/><path d="M-8 -6 l 3 -4 M 2 -10 l 2 -4 M 8 -5 l 3 -3" stroke="#7f8a62" stroke-width="1.1" stroke-linecap="round"/></g>`);
const anemone = (x, y, c = "#d9363e") => `<g transform="translate(${x} ${y})"><g class="sb-sway" style="--sdl:${-(x % 7) * .4}s"><path d="M0 0 C 1 -5, -1 -9, 0 -12" stroke="#5e7a3a" stroke-width="1.6" fill="none"/>${[0, 60, 120, 180, 240, 300].map((r) => `<ellipse cx="0" cy="-17" rx="2.8" ry="4" fill="${c}" ${L2} transform="rotate(${r} 0 -13)"/>`).join("")}<circle cy="-13" r="2.2" fill="#231a24"/></g></g>`;
const rocks = (x, y, s = 1) => g(x, y, s, `<path d="M-16 0 C -18 -8, -10 -12, -4 -10 C 0 -16, 10 -14, 12 -8 C 18 -6, 18 0, 16 0 Z" fill="#c9b48e" ${L2}/><path d="M-4 -10 C -2 -6, -4 -2, -6 0 M 12 -8 C 10 -5, 10 -2, 11 0" stroke="#a8936d" stroke-width="1.1" fill="none"/>`);
const stoneHouse = (x, y, w = 30, h = 22, lit = false) => `<g transform="translate(${x} ${y})"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="#d8c39a" ${L2}/><rect x="-1.5" y="${-h - 3}" width="${w + 3}" height="3.6" fill="#b9a073" ${L2}/><rect x="${w * .2}" y="${-h * .62}" width="5" height="6" rx="2.4" fill="${lit ? "#ffd98a" : "#5a4632"}"/><rect x="${w * .62}" y="${-h * .5}" width="6" height="${h * .5}" rx="3" fill="#6b5236"/></g>`;
const hills = (id, a, b) => wash(id, `<path d="M0 130 C 50 104, 110 100, 160 116 C 210 96, 290 92, 360 112 L 360 200 L 0 200 Z" fill="${a}"/><path d="M0 150 C 80 134, 170 140, 240 146 C 290 140, 330 138, 360 144 L 360 200 L 0 200 Z" fill="${b}"/>`);

const sycamore = (x, y, s = 1) => g(x, y, s, `<path d="M-12 0 C -8 -20, -14 -40, -30 -56 L -22 -60 C -10 -48, -4 -40, 0 -34 C 4 -46, 12 -56, 26 -64 L 32 -58 C 18 -48, 10 -34, 12 0 Z" fill="#9a7a5a" ${L}/><path d="M-4 -10 C -2 -18, -4 -26, -2 -30" stroke="#7a5c40" stroke-width="1.4" fill="none"/>
  <g class="sb-sway" style="transform-origin:0 -60px">${[[-46, -70, 26, 18], [-14, -86, 30, 20], [22, -84, 28, 19], [50, -66, 24, 16], [0, -64, 28, 14]].map(([a, b, rx, ry]) => `<ellipse cx="${a}" cy="${b}" rx="${rx}" ry="${ry}" fill="#7fa65a" ${L2}/>`).join("")}
  ${[[-40, -64], [-20, -80], [10, -92], [30, -76], [48, -62], [-2, -70], [-52, -76]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="#b9874a" ${L2}/>`).join("")}</g>`);
const leafFront = (x, y, s = 1) => g(x, y, s, `<g class="sb-sway" style="--sdl:-1s">${[[-14, 0, 16, 10], [10, 2, 14, 9]].map(([a, b, rx, ry]) => `<ellipse cx="${a}" cy="${b}" rx="${rx}" ry="${ry}" fill="#8db866" ${L2}/>`).join("")}<circle cx="-6" cy="-2" r="2.4" fill="#b9874a" ${L2}/></g>`);
const pig = (x, y, s = 1) => g(x, y, s, `<ellipse cx="0" cy="-8" rx="14" ry="9" fill="#f2b7b0" ${L}/><circle cx="12" cy="-12" r="6.4" fill="#f2b7b0" ${L}/><ellipse cx="17" cy="-11" rx="3" ry="2.4" fill="#e89a92" ${L2}/><circle cx="11" cy="-14" r="1" fill="${INK}"/><path d="M-8 0 L -8 -2 M -2 0 L -2 -2 M 6 0 L 6 -2" stroke="${INK}" stroke-width="2.4"/><path d="M-14 -10 c -4 -2, -4 -6, 0 -6" stroke="${INK}" stroke-width="1.2" fill="none"/>`);

const ox = (x, y, s = 1) => g(x, y, s, `<path d="M-22 0 L -22 -10 M -12 0 L -12 -10 M 10 0 L 10 -10 M 18 0 L 18 -10" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M-22 0 L -22 -10 M -12 0 L -12 -10 M 10 0 L 10 -10 M 18 0 L 18 -10" stroke="#7a5236" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="-2" cy="-18" rx="26" ry="14" fill="#a8744a" ${L}/><path d="M-26 -22 c -6 4, -6 12, -2 16" stroke="${INK}" stroke-width="1.4" fill="none"/><ellipse cx="4" cy="-14" rx="10" ry="7" fill="#c99a6a" opacity=".6"/>
  <g transform="translate(26 -24)"><path d="M-6 -10 C -12 -16, -14 -20, -10 -22 M 6 -10 C 12 -16, 14 -20, 10 -22" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-6 -10 C -12 -16, -14 -20, -10 -22 M 6 -10 C 12 -16, 14 -20, 10 -22" stroke="#efe2c4" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="0" rx="11" ry="12" fill="#a8744a" ${L}/><ellipse cx="0" cy="7" rx="8" ry="5.6" fill="#e8b4a4" ${L2}/><circle cx="-2.6" cy="7" r="1" fill="${INK}"/><circle cx="2.6" cy="7" r="1" fill="${INK}"/>
    ${blink(`<ellipse cx="-4.4" cy="-3" rx="1.6" ry="2" fill="#1f1612"/><ellipse cx="4.4" cy="-3" rx="1.6" ry="2" fill="#1f1612"/><circle cx="-3.9" cy="-3.6" r=".5" fill="#fff"/><circle cx="4.9" cy="-3.6" r=".5" fill="#fff"/>`)}</g>`);
const donkey = (x, y, s = 1) => g(x, y, s, `<path d="M-18 0 L -18 -12 M -10 0 L -10 -12 M 8 0 L 8 -12 M 15 0 L 15 -12" stroke="${INK}" stroke-width="4.6" stroke-linecap="round"/><path d="M-18 0 L -18 -12 M -10 0 L -10 -12 M 8 0 L 8 -12 M 15 0 L 15 -12" stroke="#8a8f96" stroke-width="2.6" stroke-linecap="round"/>
  <ellipse cx="-2" cy="-20" rx="22" ry="12" fill="#9aa0a8" ${L}/><ellipse cx="-2" cy="-14" rx="14" ry="5" fill="#d8dbe0" opacity=".7"/><path d="M-24 -22 c -6 2, -8 10, -6 14" stroke="${INK}" stroke-width="1.4" fill="none"/>
  <g transform="translate(22 -32) rotate(18)"><ellipse cx="-4" cy="-16" rx="3.6" ry="10" fill="#9aa0a8" ${L2} transform="rotate(-14 -4 -16)"/><ellipse cx="5" cy="-16" rx="3.6" ry="10" fill="#9aa0a8" ${L2} transform="rotate(12 5 -16)"/>
    <ellipse cx="0" cy="0" rx="9" ry="12" fill="#9aa0a8" ${L}/><ellipse cx="0" cy="8" rx="7" ry="5.4" fill="#e6e2da" ${L2}/><path d="M-6 -10 C -2 -6, 2 -6, 6 -10" stroke="#5a4a44" stroke-width="2" fill="none"/>
    ${blink(`<ellipse cx="-3.6" cy="-2" rx="1.5" ry="1.9" fill="#1f1612"/><ellipse cx="3.6" cy="-2" rx="1.5" ry="1.9" fill="#1f1612"/><circle cx="-3.1" cy="-2.6" r=".5" fill="#fff"/><circle cx="4.1" cy="-2.6" r=".5" fill="#fff"/>`)}</g>`);
const hayBale = (x, y, s = 1) => g(x, y, s, `<rect x="-16" y="-14" width="32" height="14" rx="3" fill="#e2c065" ${L2}/>${[-10, -4, 2, 8].map((a) => `<path d="M${a} -12 l 2 10" stroke="#c49a3e" stroke-width="1"/>`).join("")}<path d="M-16 -7 L 16 -7" stroke="#a37a2a" stroke-width="1.4"/>`);
const cart = (x, y, s = 1) => g(x, y, s, `<rect x="-20" y="-20" width="40" height="12" rx="2" fill="#b5793f" ${L2}/><path d="M-22 -18 L -34 -12" stroke="${INK}" stroke-width="2.6"/>${[[-8, -14], [6, -16], [-2, -20]].map(([a, b]) => `<ellipse cx="${a}" cy="${b - 4}" rx="7" ry="5" fill="#e9dcc0" ${L2}/>`).join("")}<circle cx="-12" cy="-6" r="6" fill="#8a5a36" ${L2}/><circle cx="12" cy="-6" r="6" fill="#8a5a36" ${L2}/>`);
const goat = (x, y, s = 1) => g(x, y, s, `<path d="M-10 0 L -10 -8 M -4 0 L -4 -8 M 6 0 L 6 -8 M 11 0 L 11 -8" stroke="${INK}" stroke-width="2.4"/><ellipse cx="0" cy="-12" rx="14" ry="7" fill="#6b5446" ${L2}/><circle cx="15" cy="-18" r="5" fill="#6b5446" ${L2}/><path d="M14 -22 C 14 -28, 10 -30, 8 -28 M 17 -22 C 18 -28, 22 -30, 23 -27" stroke="${INK}" stroke-width="1.4" fill="none"/><path d="M17 -14 l 0 4" stroke="#e9e2d0" stroke-width="2"/>`);

const woodCross = (x, y, h = 90, cloth = false) => `<g transform="translate(${x} ${y})"><rect x="-5" y="${-h}" width="10" height="${h + 4}" rx="2" fill="#8a5d3b" ${L}/><rect x="${-h * .32}" y="${-h * .76}" width="${h * .64}" height="9" rx="2" fill="#8a5d3b" ${L}/><path d="M-2 ${-h + 8} L -2 -4 M ${-h * .28} ${-h * .72} L ${h * .28} ${-h * .72}" stroke="#6b4428" stroke-width="1.2"/>${cloth ? `<path d="M${-h * .3} ${-h * .7} C ${-h * .2} ${-h * .52}, ${-h * .08} ${-h * .5}, -4 ${-h * .62} L -4 ${-h * .3} C -8 ${-h * .24}, -14 ${-h * .22}, -18 ${-h * .3} Z" fill="#fbf8f0" ${L2}/><path d="M${h * .3} ${-h * .7} C ${h * .2} ${-h * .52}, ${h * .08} ${-h * .5}, 4 ${-h * .62} L 4 ${-h * .3} C 8 ${-h * .24}, 14 ${-h * .22}, 18 ${-h * .3} Z" fill="#fbf8f0" ${L2}/>` : ""}</g>`;
const reeds = (x, y, s = 1) => g(x, y, s, `<g class="sb-sway" style="--sdl:${-(x % 5) * .5}s">${[[-8, -34, -4], [-3, -42, 0], [2, -38, 3], [7, -30, 6]].map(([a, h, b]) => `<path d="M${a} 0 C ${a} ${h / 2}, ${b} ${h * .8}, ${b} ${h}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${a} 0 C ${a} ${h / 2}, ${b} ${h * .8}, ${b} ${h}" stroke="#8aa65a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join("")}<ellipse cx="0" cy="-40" rx="2.6" ry="6" fill="#9a6a3a" ${L2}/></g>`);
const loaf = (x, y, s = 1) => g(x, y, s, `<ellipse rx="9" ry="5.5" fill="#d9a35a" ${L2}/><path d="M-4 -3 L -2 2 M 1 -4 L 3 1" stroke="#a8743a" stroke-width="1.1"/>`);
const fishS = (x, y, s = 1, d = 1) => g(x, y, s, `<g transform="scale(${d} 1)"><path d="M-9 0 C -4 -5, 4 -5, 8 0 C 4 5, -4 5, -9 0 Z M 8 0 L 13 -4 L 13 4 Z" fill="#9fb4c0" ${L2}/><circle cx="-4" cy="-1" r=".9" fill="${INK}"/></g>`);
const basket = (x, y, s = 1, inner = "") => g(x, y, s, `${inner}<path d="M-18 -10 L 18 -10 L 14 6 L -14 6 Z" fill="#c99a52" ${L}/><path d="M-16 -4 L 16 -4 M -15 1 L 15 1" stroke="#9a6e34" stroke-width="1.2"/>${[-10, -3, 4, 11].map((a) => `<path d="M${a} -10 L ${a - 1} 6" stroke="#9a6e34" stroke-width="1"/>`).join("")}`);
const flame = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sb-glow" style="animation-delay:${-d}s;animation-duration:1.6s"><path d="M0 0 C -6 -4, -6 -12, 0 -20 C 1 -14, 6 -12, 5 -6 C 5 -2, 3 0, 0 0 Z" fill="#ff9a3c" stroke="#e0602a" stroke-width="1.2"/><path d="M0 -2 C -3 -4, -3 -9, 0 -13 C 2 -9, 3 -6, 0 -2 Z" fill="#ffe08a"/></g></g>`;
const swirl = (x, y, s = 1, d = 0) => `<g class="sb-drift" style="--sd:${7 + d}s"><path d="M${x} ${y} c ${18 * s} ${-10 * s}, ${40 * s} ${-6 * s}, ${46 * s} ${4 * s} c ${4 * s} ${8 * s}, ${-6 * s} ${12 * s}, ${-12 * s} ${6 * s}" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/></g>`;

/* ---------- The scenes ---------- */
export const STORYBOOK = {
  ark: { caption: "Noah's ark", draw: (id) => `${sky(id, "#a9d8f0", "#f3f8ee")}${cloud(id, 70, 40, 1.1)}${cloud(id, 250, 30, .8)}${sunW(id, 316, 40, 17)}
    <g class="sb-fly">${g(70, 60, 1, dove(1.1))}</g>
    ${wash(id, `<path d="M0 150 C 40 142, 80 156, 120 148 C 170 140, 210 156, 260 148 C 300 142, 330 152, 360 146 L 360 200 L 0 200 Z" fill="#7fc0e0"/>`)}
    <g class="sb-bob">${stick(id, g(200, 150, .82, `${ark()}${g(-92, -31, .62, person({ robe: "#5b7fa6", mantle: "#b4613f", cloth: "#efe6d2", beard: "#f4f1ea", sash: "#e1b04a", arms: ["out", "down"], staff: "right" }))}`))}</g>
    ${wash(id, `<g class="sb-wave"><path d="M-40 168 ${Array.from({ length: 12 }, () => "c 10 -10, 24 -10, 34 0").join(" ")} L 400 200 L -40 200 Z" fill="#4f9fcb"/></g>`)}
    <g class="sb-wave2">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 46 - 10} 172 c 6 -6, 14 -6, 18 -1 c -4 -2, -9 -1, -11 3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"/>`).join("")}</g>` },
  sea: { caption: "Israel crosses the Red Sea on dry ground", draw: (id) => `${sky(id, "#2e3a63", "#c98a5a")}<circle cx="180" cy="80" r="40" fill="#ffb347" opacity=".55" filter="url(#soft${id})"/>
    <g class="sb-glow" style="animation-duration:2.4s"><path d="M168 108 C 160 80, 172 60, 166 30 C 176 44, 186 40, 184 16 C 196 40, 200 70, 192 108 Z" fill="#ffb347" opacity=".9"/><path d="M174 108 C 170 86, 178 70, 176 50 C 184 62, 190 80, 186 108 Z" fill="#ffe08a"/></g>
    <path d="M140 108 L 220 108 L 300 200 L 60 200 Z" fill="#e3c88e"/><path d="M140 108 L 220 108 L 236 132 L 124 132 Z" fill="#d6b97c"/>
    ${[[150, 116, .14], [162, 114, .14], [196, 114, .14], [208, 116, .14], [140, 124, .17], [214, 124, .17]].map(([x, y, k], n) => g(x, y, k, person({ robe: ["#b4613f", "#5b8fb9", "#6aa06a", "#c08a3e", "#7f6cc8", "#a63f35"][n], cloth: "#efe6d2", mood: "worried" }))).join("")}
    ${g(176, 120, .2, `${g(-14, 0, 1, person({ robe: "#8a6a48", cloth: "#efe6d2", beard: "#5a3a24", mood: "firm", arms: ["out", "down"] }))}<rect x="-6" y="-58" width="38" height="16" rx="2" fill="#c79a3e" ${L}/><path d="M-6 -50 L 32 -50" stroke="#8a6a2a" stroke-width="2"/>${g(34, 0, 1, person({ robe: "#5b7fa6", cloth: "#efe6d2", beard: "#3a2a1f", mood: "firm", arms: ["down", "out"] }))}`)}
    ${cart(140, 146, .55)}${goat(222, 146, .5)}${g(206, 150, .32, sheep())}${g(126, 152, .3, flip(sheep()))}
    <g class="sb-surge" style="transform-origin:0 120px">${wash(id, `<path d="M-10 200 L -10 30 C 30 20, 70 34, 100 28 C 120 24, 136 40, 140 60 C 150 100, 140 150, 96 200 Z" fill="#2f7bb0"/><path d="M-10 200 L -10 50 C 40 44, 80 60, 110 56 C 124 90, 110 150, 70 200 Z" fill="#4f9cca"/>`)}
      ${[[118, 64, 132, 96, 124, 140], [100, 80, 112, 120, 92, 170], [80, 60, 92, 100, 70, 150]].map(([a, b, c, d, e, f], i) => `<path class="sb-foam" style="--sdl:${-i * .5}s" d="M${a} ${b} C ${c} ${d}, ${c} ${d + 20}, ${e} ${f}" stroke="#e6f5fc" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-dasharray="10 12" opacity=".8"/>`).join("")}</g>
    <g class="sb-surge r" style="transform-origin:360px 120px">${wash(id, `<path d="M370 200 L 370 30 C 330 20, 290 34, 260 28 C 240 24, 224 40, 220 60 C 210 100, 220 150, 264 200 Z" fill="#2f7bb0"/><path d="M370 200 L 370 50 C 320 44, 280 60, 250 56 C 236 90, 250 150, 290 200 Z" fill="#4f9cca"/>`)}
      ${[[242, 64, 228, 96, 236, 140], [260, 80, 248, 120, 268, 170], [280, 60, 268, 100, 290, 150]].map(([a, b, c, d, e, f], i) => `<path class="sb-foam" style="--sdl:${-i * .5}s" d="M${a} ${b} C ${c} ${d}, ${c} ${d + 20}, ${e} ${f}" stroke="#e6f5fc" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-dasharray="10 12" opacity=".8"/>`).join("")}</g>
    ${[[128, 26], [140, 40], [116, 18], [232, 26], [220, 40], [244, 18], [104, 30], [256, 30]].map(([x, y], i) => `<circle class="sb-splash" style="--sdl:${-i * .35}s;--sx:${x < 180 ? 8 : -8}px" cx="${x}" cy="${y}" r="${1.8 + (i % 3) * .8}" fill="#e6f5fc" stroke="#2f7bb0" stroke-width=".6"/>`).join("")}
    <g class="sb-crash">${[[100, 30, 1], [258, 30, -1]].map(([x, y, d]) => `<g transform="translate(${x} ${y}) scale(${d} 1)"><path d="M-30 4 C -20 -10, 6 -16, 18 -4 C 26 4, 22 16, 12 16 C 4 16, 2 8, 8 6" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-60 8 C -50 -2, -38 -4, -28 2" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/></g>`).join("")}</g>
    ${[[40, 100, 1], [60, 150, -1], [310, 110, -1], [300, 160, 1]].map(([x, y, d], i) => `<g class="sb-swim" style="--sdl:${-i * 1.3}s"><g transform="translate(${x} ${y}) scale(${d} 1)"><path d="M-8 0 C -4 -5, 4 -5, 8 0 C 4 5, -4 5, -8 0 Z M 8 0 L 13 -4 L 13 4 Z" fill="#f4a259" ${L2}/><circle cx="-4" cy="-1" r=".9" fill="${INK}"/></g></g>`).join("")}
    ${[[136, 160, .26, "#6aa06a", "veil"], [158, 158, .26, "#c08a3e", "cloth"], [186, 158, .26, "#7f6cc8", "veil"], [206, 160, .26, "#5b8fb9", "cloth"], [226, 162, .26, "#b4613f", "veil"],
      [172, 182, .38, "#a63f35", "veil"], [194, 184, .36, "#6aa06a", "cloth"], [212, 186, .3, "#f08ab0", "hair"], [230, 184, .36, "#c08a3e", "veil"], [132, 184, .3, "#5b8fb9", "hair"]].map(([x, y, k, c, h]) => g(x, y, k, person({ robe: c, [h]: h === "hair" ? "#5a3a24" : "#efe6d2", beard: h === "cloth" ? "#5a3a24" : undefined, sash: "#e1b04a", mood: h === "hair" ? "scared" : "worried", arms: h === "hair" ? ["up", "down"] : ["down", "down"] }))).join("")}
    ${stick(id, g(150, 198, .74, person({ robe: "#c99a62", mantle: "#a63f35", cloth: "#f4efe4", band: "#a63f35", beard: "#f4f1ea", sash: "#5b7fa6", mood: "firm", arms: ["out", "up"], staff: "right", staffTop: -122 })))}` },
  manger: { caption: "Jesus is born and laid in a manger", draw: (id) => `${sky(id, "#1e2b52", "#4a5684")}${smallStars([[24, 24, 3], [70, 50, 2], [110, 18, 2.6], [250, 20, 2.4], [300, 50, 2], [338, 22, 3], [220, 44, 1.8]])}
    <g transform="translate(160 26)">${starBig(id)}</g><path d="M160 40 L 110 172 L 210 172 Z" fill="#fff3c4" opacity=".14"/>
    ${wash(id, `<path d="M0 166 C 60 158, 140 162, 200 160 C 260 158, 320 162, 360 158 L 360 200 L 0 200 Z" fill="#6e6248"/>`)}
    ${stick(id, `<g transform="translate(316 170)"><rect x="-44" y="-86" width="88" height="86" fill="#cdb48a" ${L}/><rect x="-46" y="-90" width="92" height="6" fill="#a88f66" ${L2}/>
      <rect x="-32" y="-72" width="14" height="14" rx="6" fill="#ffd98a" ${L2}/><rect x="10" y="-72" width="14" height="14" rx="6" fill="#ffd98a" ${L2}/><rect x="-10" y="-34" width="18" height="34" rx="8" fill="#6b5236" ${L2}/><circle cx="-24" cy="-30" r="5" fill="#ffd98a" opacity=".8"/>
      ${[[-40, -50], [-20, -44], [20, -52], [30, -20]].map(([a, b]) => `<path d="M${a} ${b} l 10 0" stroke="#a88f66" stroke-width="1.2"/>`).join("")}</g>`)}
    ${stick(id, `<g transform="translate(150 172)"><rect x="-118" y="-92" width="236" height="92" fill="#8f7a5a" ${L}/>${[[-100, -70], [-60, -50], [-20, -78], [30, -60], [70, -80], [96, -40], [-80, -28], [50, -24]].map(([a, b]) => `<path d="M${a} ${b} l 16 0 M ${a + 8} ${b} l 0 10" stroke="#76634a" stroke-width="1.4"/>`).join("")}
      <path d="M-122 0 L -122 -96 M 122 0 L 122 -96" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M-122 0 L -122 -96 M 122 0 L 122 -96" stroke="#9a6438" stroke-width="6" stroke-linecap="round"/>
      <path d="M-136 -88 L 0 -124 L 136 -88 L 128 -78 L 0 -112 L -128 -78 Z" fill="#d6b35a" ${L}/>${Array.from({ length: 14 }, (_, k) => `<path d="M${-124 + k * 18} ${-84 - Math.min(k, 13 - k) * 5} l 2 8" stroke="#a8863a" stroke-width="1.4"/>`).join("")}
      <ellipse cx="0" cy="-2" rx="112" ry="8" fill="#e2c065" ${L2}/></g>`)}
    <ellipse cx="160" cy="150" rx="40" ry="16" fill="#fff3c4" opacity=".55" filter="url(#soft${id})"/>
    ${stick(id, `${ox(62, 172, .95)}${hayBale(96, 174, .8)}${flip(donkey(-246, 172, .95))}
      ${g(112, 184, .78, person({ robe: "#dbe8f5", mantle: "#4f7fc0", veil: "#4f7fc0", kneel: true, mood: "calm", arms: ["pray", "pray"], sash: "#f2eee4" }))}
      ${g(160, 178, .9, manger())}
      ${g(208, 186, .78, `${person({ robe: "#8a6a48", mantle: "#c99a62", cloth: "#e9e2d0", band: "#8a6a48", beard: "#6b4528", sash: "#5b7fa6", mood: "calm", arms: ["down", "out"], staff: "left" })}<path d="M35 -46 L 35 -40" stroke="${INK}" stroke-width="1.4"/><rect x="30" y="-40" width="10" height="13" rx="2" fill="#ffd98a" ${L2}/><circle cx="35" cy="-34" r="9" fill="#ffd98a" opacity=".35"/>`)}
      ${g(30, 190, .5, sheep({ down: true }))}`)}` },
  giant: { caption: "David faces Goliath in the Valley of Elah", draw: (id) => `${sky(id, "#bfe3f5", "#f4f6e6")}${cloud(id, 80, 34, .9)}${cloud(id, 280, 26, .7)}${sunW(id, 40, 36, 14)}
    ${hills(id, "#d9c27e", "#c7ad6a")}${wash(id, `<path d="M0 178 C 60 170, 140 176, 200 172 C 260 168, 320 176, 360 172 L 360 184 C 300 188, 220 182, 160 186 C 100 190, 40 184, 0 188 Z" fill="#7fb6d6"/>`)}${terebinth(178, 152, .85)}${scrub(150, 168, .8)}
    ${stick(id, `${g(258, 190, 1.45, `${spear(26, -150)}${person({ robe: "#8a8f96", mantle: "#6f5a45", helmet: true, beard: "#3a2a1f", brow: "#2b1d14", mood: "angry", sash: "#c79a3e", arms: ["out", "down"] })}${g(-22, -40, 1, shield())}`)}
      ${g(104, 192, .78, `${person({ robe: "#d9b77a", sash: "#6aa06a", hair: "#7a4a2a", mood: "firm", arms: ["down", "up"] })}<circle cx="23.5" cy="-93" r="24" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="5 6" opacity=".8"/><g class="sb-whirl" style="transform-origin:23.5px -93px"><path d="M23.5 -93 C 30 -104, 38 -112, 44 -116 M 23.5 -93 C 32 -100, 40 -108, 47 -111" stroke="#6b4a2a" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M42 -120 C 50 -122, 53 -112, 49 -108 C 44 -110, 40 -114, 42 -120 Z" fill="#8a5a36" ${L2}/><circle cx="47.4" cy="-114.6" r="2.6" fill="#b8b2a8" ${L2}/></g>`)}
      ${g(40, 188, .55, sheep())}`)}
    ${rocks(150, 198, .7)}${rocks(178, 196, .5)}${anemone(70, 196)}${scrub(336, 198, .9)}` },
  jonah: { caption: "Jonah prays inside the big fish", draw: (id) => `${sky(id, "#6fb4dc", "#1d5a86")}
    ${[60, 130, 200, 270].map((x, i) => `<path d="M${x} 0 L ${x + 30} 0 L ${x + 60} 200 L ${x + 20} 200 Z" fill="#fff" opacity=".07" class="sb-glow" style="animation-delay:${-i}s"/>`).join("")}
    ${[[30, 200, 60], [52, 200, 44], [318, 200, 66], [340, 200, 48]].map(([x, y, h], i) => `<g class="sb-sway" style="--sdl:${-i * .7}s"><path d="M${x} ${y} C ${x - 10} ${y - h * .3}, ${x + 10} ${y - h * .6}, ${x} ${y - h}" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${x} ${y} C ${x - 10} ${y - h * .3}, ${x + 10} ${y - h * .6}, ${x} ${y - h}" stroke="#5e9a4a" stroke-width="4.6" fill="none" stroke-linecap="round"/></g>`).join("")}
    ${wash(id, `<path d="M0 186 C 80 178, 280 178, 360 186 L 360 200 L 0 200 Z" fill="#d9c08a"/>`)}
    ${[[96, 150], [104, 120], [262, 140], [274, 106], [180, 40]].map(([x, y], i) => `<circle class="sb-bubble" style="--sdl:${-i * .9}s" cx="${x}" cy="${y}" r="${2 + (i % 3)}" fill="none" stroke="#dff2fb" stroke-width="1.4"/>`).join("")}
    <g class="sb-queasy">${stick(id, g(184, 118, 1.45, `${whale(false, true)}<ellipse cx="8" cy="-8" rx="40" ry="26" fill="#8a3d4c" ${L}/><path d="M-22 -16 C -10 -24, 22 -24, 34 -14 M -26 2 C -10 10, 22 10, 36 0" stroke="#a85a68" stroke-width="2" fill="none"/><ellipse cx="8" cy="-8" rx="40" ry="26" fill="none" stroke="#fff" stroke-width="1" opacity=".35"/>
      ${g(10, 16, .5, `<g class="sb-shake">${curled({ robe: "#c9853c", mantle: "#6aa06a", hair: "#5a3a24", beard: "#5a3a24", mood: "terrified" })}</g><path d="M-16 -62 C -6 -70, 6 -68, 14 -60 C 18 -50, 24 -44, 28 -36" stroke="#5e9a4a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`)}`))}</g>
    ${[[40, 70, 1], [330, 60, -1]].map(([x, y, d], i) => `<g class="sb-swim" style="--sdl:${-i * 2}s"><g transform="translate(${x} ${y}) scale(${d} 1)"><path d="M-8 0 C -4 -5, 4 -5, 8 0 C 4 5, -4 5, -8 0 Z M 8 0 L 13 -4 L 13 4 Z" fill="#f4a259" ${L2}/><circle cx="-4" cy="-1" r=".9" fill="${INK}"/></g></g>`).join("")}` },
  storm: { caption: "Jesus calms the storm", draw: (id) => `${sky(id, "#8fa3b8", "#e4ecf0")}<circle cx="300" cy="40" r="60" fill="#fff6d6" opacity=".7" filter="url(#soft${id})"/>
    ${cloud(id, 60, 34, 1.6, "#6f7f92", .95)}${cloud(id, 150, 24, 1.2, "#7f8fa2", .9)}${cloud(id, 300, 30, 1, "#fff", .9)}
    <path class="sb-flash" d="M118 20 L 108 44 L 116 44 L 104 70 L 126 38 L 117 38 L 126 20 Z" fill="#fff6c4" stroke="#f6cf55" stroke-width="1.2"/><g class="sb-rain">${Array.from({ length: 14 }, (_, i) => `<path d="M${20 + i * 12} ${40 + (i % 3) * 8} l -4 10" stroke="#c9d6e2" stroke-width="1.6" stroke-linecap="round"/>`).join("")}</g>
    ${wash(id, `<path d="M0 124 C 50 100, 120 98, 170 112 C 230 96, 300 96, 360 108 L 360 130 L 0 130 Z" fill="#9c8a6a" opacity=".8"/>`)}
    ${wash(id, `<path d="M0 128 C 50 116, 100 132, 150 122 C 210 112, 270 126, 360 118 L 360 200 L 0 200 Z" fill="#5f9cc4"/>`)}
    <g class="sb-bob">${stick(id, g(180, 160, .95, `${g(-40, -16, .7, person({ robe: "#6aa06a", hair: "#3a2a1f", beard: "#3a2a1f", sash: "#e1b04a", mood: "scared", arms: ["down", "down"] }))}${g(44, -16, .7, person({ robe: "#c08a3e", cloth: "#efe6d2", beard: "#7a4a2a", sash: "#5b8fcb", mood: "worried", arms: ["down", "down"] }))}${boat()}${g(2, -16, .92, person({ robe: "#f6f3ec", mantle: "#b5473a", hair: "#6b4528", longHair: true, beard: "#6b4528", sash: "#d9a441", mood: "firm", arms: ["out", "up"] }))}`))}</g>
    ${wash(id, `<g class="sb-wave"><path d="M-40 176 ${Array.from({ length: 12 }, () => "c 10 -12, 24 -12, 34 0").join(" ")} L 400 200 L -40 200 Z" fill="#3f86b4"/></g>`)}
    <g class="sb-wave2">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 46 - 4} 178 c 6 -6, 14 -6, 18 -1 c -4 -2, -9 -1, -11 3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"/>`).join("")}</g>` },
  tomb: { caption: "He is risen!", draw: (id) => `${sky(id, "#f9c99b", "#fdf0dc")}<g class="sb-sunrise"><g transform="translate(250 116)"><circle r="70" fill="#ffe7a3" opacity=".7" filter="url(#soft${id})"/><g class="sb-spin">${Array.from({ length: 16 }, (_, i) => `<path d="M0 -40 L 4 -120 L -4 -120 Z" fill="#fff3c4" opacity=".35" transform="rotate(${i * 22.5})"/>`).join("")}</g></g></g>
    ${cloud(id, 70, 36, .9)}${wash(id, `<path d="M0 130 C 70 116, 160 120, 220 126 C 280 132, 320 124, 360 128 L 360 200 L 0 200 Z" fill="#c4bb86"/><path d="M0 170 C 90 160, 270 160, 360 170 L 360 200 L 0 200 Z" fill="#a9a56e"/>`)}${oliveTree(42, 170, 1.1)}${oliveTree(334, 168, .9)}
    ${stick(id, `${g(150, 172, 1, tomb())}${g(246, 172, .9, stone())}${g(246, 146, .62, person({ robe: "#fffdf6", angel: true, hair: "#e2b04a", sash: "#f6cf55", mood: "joy", arms: ["out", "up"] }))}`)}
    ${rocks(80, 194, 1)}${rocks(300, 196, .8)}${anemone(100, 194)}${anemone(116, 198, "#e9e2f2")}${anemone(282, 196)}${anemone(352, 198, "#c23a6a")}${scrub(70, 198, .9)}
    <g class="sb-fly">${g(60, 70, 1, `<g class="sb-flap" style="transform-origin:0 0"><path d="M0 0 C -6 -10, -14 -8, -12 0 C -14 8, -6 8, 0 0 Z M 0 0 C 6 -10, 14 -8, 12 0 C 14 8, 6 8, 0 0 Z" fill="#f2c45a" ${L2}/></g>`)}</g>` },
  zacchaeus: { caption: "Zacchaeus climbs a sycamore tree to see Jesus", draw: (id) => `${sky(id, "#bfe0ef", "#f8f0dc")}${cloud(id, 300, 30, .8)}${sunW(id, 40, 34, 13)}
    ${hills(id, "#d8c28c", "#c9ae76")}${stoneHouse(250, 138, 30, 22)}${stoneHouse(282, 134, 26, 26)}${datePalm(330, 160, .85)}${datePalm(240, 150, .6)}
    ${stick(id, `${sycamore(90, 186, 1.2)}${g(98, 102, .46, person({ robe: "#7a5aa6", mantle: "#c99a62", hair: "#3a2a1f", beard: "#3a2a1f", sash: "#e1b04a", mood: "joy", arms: ["out", "up"] }))}`)}${leafFront(92, 102, 1.1)}
    ${stick(id, `${g(196, 190, .84, person({ robe: "#f6f3ec", mantle: "#b5473a", hair: "#6b4528", longHair: true, beard: "#6b4528", sash: "#d9a441", mood: "joy", lookUp: true, arms: ["down", "up"] }))}
      ${g(250, 190, .7, person({ robe: "#6aa06a", cloth: "#efe6d2", beard: "#5a3a24", sash: "#c08a3e", mood: "worried", arms: ["down", "down"] }))}
      ${g(284, 192, .66, person({ robe: "#c08a3e", veil: "#b4613f", sash: "#efe6d2", mood: "calm", arms: ["down", "down"] }))}`)}
    ${rocks(150, 196, .7)}${scrub(330, 198, .8)}` },
  sheep: { caption: "The Good Shepherd carries His lamb", draw: (id) => `${sky(id, "#bfe3f5", "#f6f2e2")}${cloud(id, 90, 30, 1)}${cloud(id, 280, 40, .7)}
    ${hills(id, "#b9b27a", "#a5a066")}${wash(id, `<path d="M220 168 C 250 160, 320 160, 360 166 L 360 182 C 320 186, 260 184, 220 180 Z" fill="#8fc6e0"/>`)}${oliveTree(40, 160, 1)}${oliveTree(320, 150, .7)}
    ${stick(id, `${g(160, 192, .95, `${person({ robe: "#f6f3ec", mantle: "#b5473a", hair: "#6b4528", longHair: true, beard: "#6b4528", sash: "#d9a441", mood: "calm", arms: ["down", "down"], staff: "left", staffTop: -118 })}${g(0, -40, .62, `<g transform="rotate(-4)">${sheep()}</g>`)}`)}
      ${g(84, 188, .6, sheep())}${g(250, 190, .62, flip(sheep()))}${g(300, 184, .5, sheep({ down: true }))}`)}
    ${anemone(120, 196)}${anemone(212, 198, "#e9e2f2")}${rocks(28, 196, .8)}${scrub(350, 198, .8)}` },
  prodigal: { caption: "The father runs to welcome his son home", draw: (id) => `${sky(id, "#f6c9a0", "#fcefdc")}<circle cx="300" cy="70" r="26" fill="#ffd98a" opacity=".8" filter="url(#soft${id})"/>
    ${hills(id, "#cdb67c", "#b99f66")}${stoneHouse(270, 150, 44, 34, true)}${oliveTree(330, 160, .7)}${g(40, 150, .3, pig(0, 0, 1))}${g(60, 148, .26, pig(0, 0, 1))}
    ${stick(id, `<g transform="translate(206 192) rotate(-6)">${g(0, 0, .9, person({ robe: "#5b7fa6", mantle: "#c99a62", cloth: "#efe6d2", beard: "#f4f1ea", sash: "#e1b04a", mood: "joy", arms: ["out", "out"] }))}</g>
      ${g(126, 194, .78, person({ robe: "#9a8a70", hair: "#5a3a24", rags: true, sash: "#7a6a50", mood: "sad", arms: ["down", "pray"] }))}`)}
    ${rocks(80, 196, .7)}${scrub(30, 198, .8)}` },
  children: { caption: "Jesus welcomes the children", draw: (id) => `${sky(id, "#bfe3f5", "#f6f2e2")}${cloud(id, 80, 30, .9)}${sunW(id, 320, 34, 13)}
    ${hills(id, "#c9be84", "#b4aa70")}${oliveTree(46, 160, 1.05)}${oliveTree(316, 156, .9)}
    ${stick(id, `${g(286, 178, .62, person({ robe: "#c08a3e", cloth: "#efe6d2", beard: "#5a3a24", sash: "#5b8fcb", mood: "worried", arms: ["down", "down"] }))}
      ${g(180, 192, .9, person({ robe: "#f6f3ec", mantle: "#b5473a", hair: "#6b4528", longHair: true, beard: "#6b4528", sash: "#d9a441", mood: "joy", arms: ["out", "out"] }))}
      ${g(126, 194, .5, person({ robe: "#e1b04a", hair: "#3a2a1f", sash: "#6aa06a", mood: "joy", arms: ["down", "up"] }))}${g(100, 196, .44, person({ robe: "#f08ab0", veil: "#f6d9a8", sash: "#fff", mood: "joy", arms: ["down", "down"] }))}
      ${g(234, 194, .48, person({ robe: "#6aa06a", hair: "#7a4a2a", sash: "#e1b04a", mood: "joy", arms: ["up", "down"] }))}${g(258, 198, .38, person({ robe: "#7f6cc8", veil: "#e9e2d0", sash: "#f6cf55", mood: "calm", arms: ["down", "down"] }))}`)}
    ${anemone(150, 198)}${anemone(212, 198, "#f6cf55")}${rocks(20, 196, .7)}` },
  cross: { caption: "Jesus gave His life on the cross for us", draw: (id) => `${sky(id, "#4a4560", "#e8a77a")}<circle cx="180" cy="150" r="70" fill="#ffd9a0" opacity=".6" filter="url(#soft${id})"/>
    ${cloud(id, 70, 30, 1.3, "#5d5670", .9)}${cloud(id, 290, 26, 1.1, "#5d5670", .9)}
    ${wash(id, `<path d="M0 150 C 60 140, 120 132, 180 118 C 240 132, 300 140, 360 150 L 360 200 L 0 200 Z" fill="#a39168"/><path d="M0 176 C 90 168, 270 168, 360 176 L 360 200 L 0 200 Z" fill="#8c7d58"/>`)}
    ${stick(id, `${woodCross(126, 136, 64)}${woodCross(234, 136, 64)}${woodCross(180, 124, 92, true)}`)}
    ${stick(id, `${g(118, 194, .66, person({ robe: "#dbe8f5", mantle: "#4f7fc0", veil: "#4f7fc0", sash: "#f2eee4", mood: "sad", lookUp: true, arms: ["pray", "pray"] }))}
      ${g(150, 196, .68, person({ robe: "#6aa06a", hair: "#5a3a24", sash: "#e1b04a", mood: "sad", lookUp: true, arms: ["down", "down"] }))}
      ${g(222, 196, .64, person({ robe: "#c08a3e", veil: "#a63f35", sash: "#efe6d2", mood: "sad", lookUp: true, arms: ["pray", "pray"] }))}`)}
    ${rocks(40, 194, .9)}${rocks(320, 196, .8)}${scrub(290, 198, .8)}${anemone(70, 196)}` },
  baptism: { caption: "Jesus is baptized, and the Spirit comes like a dove", draw: (id) => `${sky(id, "#a9d6f0", "#f6f2e2")}
    <g class="sb-glow"><path d="M150 0 L 210 0 L 196 150 L 164 150 Z" fill="#fff6c4" opacity=".35"/></g><ellipse cx="180" cy="6" rx="50" ry="14" fill="#fff6c4" opacity=".8" filter="url(#soft${id})"/>
    ${cloud(id, 60, 30, 1)}${cloud(id, 300, 36, .8)}${hills(id, "#cdb67c", "#b9a46c")}${datePalm(320, 140, .7)}${datePalm(40, 136, .6)}
    ${wash(id, `<path d="M0 150 C 80 142, 280 142, 360 150 L 360 200 L 0 200 Z" fill="#6fa9c9"/>`)}
    ${stick(id, `${g(176, 186, .9, person({ robe: "#f6f3ec", hair: "#6b4528", longHair: true, beard: "#6b4528", sash: "#d9a441", mood: "calm", lookUp: true, arms: ["pray", "pray"] }))}
      ${g(230, 188, .84, person({ robe: "#a07a4a", hair: "#4a3020", beard: "#4a3020", sash: "#5a3a24", mood: "joy", arms: ["down", "out"] }))}`)}
    ${wash(id, `<g class="sb-wave"><path d="M-40 168 ${Array.from({ length: 12 }, () => "c 10 -6, 24 -6, 34 0").join(" ")} L 400 200 L -40 200 Z" fill="#5f9cc4" opacity=".92"/></g>`)}
    <g class="sb-wave2">${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 48 + 6} 178 c 6 -4, 14 -4, 18 0" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".8"/>`).join("")}</g>
    <g class="sb-bob">${g(180, 58, 1.1, dove(1, false))}</g>
    ${reeds(24, 170, 1)}${reeds(46, 174, .8)}${reeds(330, 172, .9)}${reeds(350, 176, .7)}` },
  loaves: { caption: "Jesus feeds 5,000 with a boy's lunch", draw: (id) => `${sky(id, "#bfe3f5", "#f6f2e2")}${cloud(id, 80, 28, .9)}${sunW(id, 320, 30, 12)}
    ${wash(id, `<path d="M0 96 C 60 84, 130 86, 180 92 C 240 82, 310 84, 360 92 L 360 112 L 0 112 Z" fill="#a8946c"/><path d="M0 108 L 360 108 L 360 124 L 0 124 Z" fill="#7fb6d6"/>`)}
    ${wash(id, `<path d="M0 124 C 80 116, 200 118, 360 122 L 360 200 L 0 200 Z" fill="#a9c27a"/><path d="M0 164 C 100 154, 260 156, 360 162 L 360 200 L 0 200 Z" fill="#94b466"/>`)}
    ${[128, 136, 145, 155].flatMap((y, r) => Array.from({ length: 20 }, (_, i) => [8 + i * 18 + (r % 2) * 9, y])).filter(([x, y]) => y < 140 || x < 64 || x > 238).map(([x, y], n) => g(x, y, .17 + (y - 124) * .006, person({ robe: ["#b4613f", "#5b8fb9", "#6aa06a", "#c08a3e", "#7f6cc8"][n % 5], [n % 2 ? "veil" : "cloth"]: "#efe6d2", sash: "#e1b04a", kneel: true, mood: "joy", arms: ["pray", "pray"] }))).join("")}
    ${stick(id, `${g(190, 186, .9, person({ robe: "#f6f3ec", mantle: "#b5473a", hair: "#6b4528", longHair: true, beard: "#6b4528", sash: "#d9a441", mood: "joy", lookUp: true, arms: ["up", "up"] }))}${loaf(166, 100, 1.1)}${fishS(214, 100, 1.1, -1)}
      ${g(122, 192, .56, person({ robe: "#e1b04a", hair: "#3a2a1f", sash: "#6aa06a", mood: "joy", arms: ["out", "out"] }))}${basket(142, 168, .9, `${loaf(-8, -11, .8)}${loaf(4, -12, .8)}${loaf(-2, -15, .8)}${fishS(-4, -18, .8)}${fishS(8, -17, .8, -1)}`)}
      ${g(92, 190, .74, person({ robe: "#5b8fb9", cloth: "#efe6d2", beard: "#7a4a2a", sash: "#c08a3e", mood: "worried", arms: ["down", "out"] }))}
      ${basket(262, 192, .9, `${loaf(-6, -10, .8)}${loaf(6, -11, .8)}`)}${basket(296, 194, .8, `${loaf(0, -10, .8)}${fishS(4, -14, .7)}`)}${basket(328, 196, .7, `${loaf(-2, -10, .8)}`)}`)}
    ${anemone(40, 196)}${anemone(230, 198, "#f6cf55")}${rocks(14, 196, .6)}` },
  pentecost: { caption: "The Holy Spirit comes at Pentecost", draw: (id) => `${sky(id, "#f2d8a8", "#fbefd8")}
    ${wash(id, `<rect x="0" y="0" width="360" height="200" fill="#e3cfa6"/><path d="M0 150 L 360 150 L 360 200 L 0 200 Z" fill="#c9ae80"/>`)}
    ${[[30, 20], [100, 46], [170, 18], [250, 40], [320, 24], [60, 96], [290, 92]].map(([a, b]) => `<path d="M${a} ${b} l 22 0 M ${a + 11} ${b} l 0 12" stroke="#cdb488" stroke-width="1.4"/>`).join("")}
    ${stick(id, `<g transform="translate(180 72)"><path d="M-40 34 L -40 -16 C -40 -46, 40 -46, 40 -16 L 40 34 Z" fill="#9fd0ec" ${L}/><path d="M0 -42 L 0 34 M -40 2 L 40 2" stroke="#7a5c40" stroke-width="3"/></g>`)}
    ${swirl(90, 60, 1, 0)}${swirl(220, 40, 1.1, 2)}${swirl(150, 110, .8, 4)}${swirl(260, 96, .9, 1)}
    ${stick(id, `${[[60, 190, .72, "#6aa06a", "hair", "#3a2a1f", ["up", "down"]], [110, 194, .78, "#c08a3e", "cloth", "#efe6d2", ["down", "up"]], [180, 196, .8, "#dbe8f5", "veil", "#4f7fc0", ["pray", "pray"]], [250, 194, .78, "#5b8fb9", "hair", "#5a3a24", ["up", "up"]], [302, 190, .72, "#a63f35", "cloth", "#efe6d2", ["out", "down"]]].map(([x, y, k, c, h, hc, arms]) => g(x, y, k, person({ robe: c, [h]: hc, beard: h === "veil" ? undefined : "#5a3a24", sash: "#e1b04a", mood: "joy", lookUp: true, arms }))).join("")}`)}
    ${[[60, 190, .72], [110, 194, .78], [180, 196, .8], [250, 194, .78], [302, 190, .72]].map(([x, y, k], i) => flame(x, y - 102 * k, 1.15, i * .3)).join("")}` },
  lions: { caption: "God shut the lions' mouths", draw: (id) => `${sky(id, "#7d5f4a", "#a88464")}
    ${wash(id, `<path d="M0 0 L 360 0 L 360 70 C 300 60, 250 30, 230 0 Z" fill="#5f4535"/><path d="M0 0 L 130 0 C 110 30, 60 60, 0 70 Z" fill="#5f4535"/><path d="M0 150 C 80 140, 280 140, 360 150 L 360 200 L 0 200 Z" fill="#94704f"/>
      ${[[40, 110, 22], [300, 100, 26], [80, 60, 14], [330, 160, 16]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .7}" fill="#6f5240"/>`).join("")}`)}
    <path d="M140 0 L 220 0 L 262 160 L 98 160 Z" fill="#fff3c4" opacity=".28" class="sb-glow"/>${[150, 170, 190, 210].map((x, i) => `<circle class="sb-mote" style="--sdl:${-i * 1.6}s" cx="${x}" cy="${40 + i * 18}" r="1.4" fill="#fff6d6"/>`).join("")}
    <circle cx="180" cy="44" r="34" fill="#fff6d6" opacity=".55" filter="url(#soft${id})"/>
    ${stick(id, `${g(180, 92, .5, person({ robe: "#fffdf6", angel: true, hair: "#e2b04a", sash: "#f6cf55", mood: "calm", arms: ["out", "out"] }))}
      ${g(76, 178, 1.05, lion({ shut: true }))}${g(284, 178, 1.05, flip(lion({ shut: true })))}
      ${g(180, 190, .98, person({ robe: "#5b7fa6", mantle: "#7a4a8a", hair: "#4a2f1d", sash: "#e1b04a", mood: "worried", lookUp: true, arms: ["pray", "pray"] }))}`)}
    ${scrub(26, 198, .8)}${scrub(338, 198, .9)}` },
};
// Little flowers to brighten scenes that are outdoors in the day.
export const sprinkle = (list) => list.map(([x, y, c]) => flower(x, y, c)).join("");

export function storybookSvg(name, uidN) {
  const sb = STORYBOOK[name];
  if (!sb) return "";
  return `<svg class="fish-strip passage-art kids-story storybook" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${sb.caption.replace(/"/g, "&quot;")}">${defs(uidN)}<defs><clipPath id="sbc${uidN}"><rect width="360" height="200" rx="18"/></clipPath></defs><g clip-path="url(#sbc${uidN})">${sb.draw(uidN)}${paper(uidN)}</g></svg>`;
}
