// Hand-drawn style illustrations as inline SVG. Colors come from CSS classes
// (styles.css, "Illustrations"), so each look (Sage, Feminine, Masculine, Animated)
// recolors the same drawings. The Classic look swaps in still olive-and-cross art. No image files are needed.

// Still looks drawn by themeScene() instead of the sea.
export const THEME_LOOKS = ["sage", "nativity", "easter", "fall", "christmas"];

const leaf = (x, y, r, s = 1) => `<ellipse class="leaf" cx="0" cy="0" rx="${9 * s}" ry="${3.6 * s}" transform="translate(${x} ${y}) rotate(${r})"/>`;

export const oliveBranch = (x = 0, y = 0, scale = 1, flip = false) => `
  <g transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})"><g class="sway">
    <path class="stem" d="M0 0 C 30 -8, 60 -6, 92 -20"/>
    ${leaf(16, -8, -40)}${leaf(20, 1, 30)}${leaf(38, -12, -50)}${leaf(42, -2, 25)}${leaf(60, -16, -45)}${leaf(64, -6, 20)}${leaf(82, -22, -35)}${leaf(86, -12, 30)}
    <circle class="olive" cx="30" cy="-2" r="3.2"/><circle class="olive" cx="54" cy="-6" r="3.2"/><circle class="olive" cx="74" cy="-11" r="3"/>
  </g></g>`;

export const oliveTree = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path class="trunk" d="M-6 0 C -4 -14, -10 -22, -2 -34 C 2 -26, 8 -20, 6 0 Z"/>
    <g class="sway">
      <ellipse class="canopy" cx="-14" cy="-42" rx="18" ry="11"/>
      <ellipse class="canopy" cx="10" cy="-46" rx="20" ry="12"/>
      <ellipse class="canopy" cx="-2" cy="-56" rx="16" ry="10"/>
      <circle class="olive" cx="-10" cy="-40" r="2"/><circle class="olive" cx="12" cy="-44" r="2"/><circle class="olive" cx="2" cy="-54" r="2"/>
    </g>
  </g>`;

const figLeaf = (x, y, r, s = 1) => `<path class="fig-leaf" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0 C -8 -4,-12 -12,-6 -16 C -8 -22,-2 -26,0 -20 C 2 -26,8 -22,6 -16 C 12 -12,8 -4,0 0 Z"/>`;
export const figTree = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path class="trunk" d="M-4 0 C -3 -16, -6 -24, -12 -30 M-4 0 C -2 -14, 4 -22, 10 -30 M-4 0 L 4 0 C 4 -12, 2 -20, 0 -34" stroke-width="5"/>
    <g class="sway">
      ${figLeaf(-14, -30, -20, 1.2)}${figLeaf(10, -30, 25, 1.2)}${figLeaf(-2, -36, 0, 1.3)}${figLeaf(-22, -38, -40)}${figLeaf(18, -40, 40)}
      <ellipse class="fig" cx="-6" cy="-34" rx="3" ry="4"/><ellipse class="fig" cx="8" cy="-36" rx="3" ry="4"/>
    </g>
  </g>`;

// Friendly characters: round shapes, big shiny eyes, rosy cheeks, gentle motion.
const eyes = (pts, r = 2.2) => `<g class="blink">${pts.map(([x, y]) => `<circle class="eye-ink" cx="${x}" cy="${y}" r="${r}"/><circle class="eye-shine" cx="${x + r * .35}" cy="${y - r * .4}" r="${r * .38}"/>`).join("")}</g>`;
const cheeks = (pts) => pts.map(([x, y]) => `<ellipse class="blush" cx="${x}" cy="${y}" rx="2.2" ry="1.3"/>`).join("");

export const lamb = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})"><g class="bob">
    <rect class="lamb-leg" x="-13" y="6" width="5" height="13" rx="2.5"/><rect class="lamb-leg" x="-4" y="8" width="5" height="11" rx="2.5"/>
    <rect class="lamb-leg" x="5" y="8" width="5" height="11" rx="2.5"/><rect class="lamb-leg" x="13" y="6" width="5" height="13" rx="2.5"/>
    <ellipse class="wool" cx="0" cy="0" rx="20" ry="13"/>
    ${[[-16, -2, 8], [-9, -9, 8], [0, -12, 8.5], [10, -10, 8], [17, -2, 7], [-14, 6, 7], [12, 6, 7], [0, 8, 8]].map(([cx, cy, r]) => `<circle class="wool" cx="${cx}" cy="${cy}" r="${r}"/>`).join("")}
    <circle class="wool" cx="-22" cy="-4" r="3.5"/>
    <g transform="translate(21 -10)"><g class="nod">
      <ellipse class="lamb-ear" cx="-9" cy="-1" rx="6" ry="2.6" transform="rotate(20 -9 -1)"/><ellipse class="lamb-ear" cx="9" cy="-1" rx="6" ry="2.6" transform="rotate(-20 9 -1)"/>
      <ellipse class="lamb-face" cx="0" cy="0" rx="8.5" ry="9.5"/>
      <circle class="wool" cx="-3.5" cy="-8.5" r="3.6"/><circle class="wool" cx="1" cy="-10" r="4.2"/><circle class="wool" cx="5" cy="-8" r="3.2"/>
      ${eyes([[-3.2, -0.5], [3.4, -0.5]])}${cheeks([[-5.4, 3.6], [5.6, 3.6]])}
      <ellipse class="nose" cx=".1" cy="3.8" rx="1.3" ry=".9"/><path class="smile" d="M-1.6 5.4 q 1.7 1.5 3.4 0"/>
    </g></g>
  </g></g>`;

export const donkey = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})"><g class="bob slow">
    <g class="swish"><path class="tail" d="M-23 -4 C -31 0, -32 8, -30 13"/><ellipse class="mane-fill" cx="-30" cy="15" rx="2.6" ry="3.6"/></g>
    <rect class="donkey" x="-17" y="5" width="7" height="17" rx="3.5"/><rect class="donkey" x="-7" y="7" width="7" height="15" rx="3.5"/>
    <rect class="donkey" x="5" y="7" width="7" height="15" rx="3.5"/><rect class="donkey" x="14" y="5" width="7" height="17" rx="3.5"/>
    <ellipse class="hoof" cx="-13.5" cy="21.5" rx="3.8" ry="1.8"/><ellipse class="hoof" cx="-3.5" cy="21.5" rx="3.8" ry="1.8"/><ellipse class="hoof" cx="8.5" cy="21.5" rx="3.8" ry="1.8"/><ellipse class="hoof" cx="17.5" cy="21.5" rx="3.8" ry="1.8"/>
    <ellipse class="donkey" cx="0" cy="0" rx="25" ry="15"/>
    <ellipse class="muzzle" cx="1" cy="7" rx="15" ry="6"/>
    <path class="donkey" d="M13 -7 C 17 -17, 22 -23, 28 -25 L 36 -15 C 30 -11, 25 -4, 21 3 Z"/>
    <g transform="translate(33 -27)"><g class="nod">
      <g class="ear-wiggle"><ellipse class="donkey" cx="-6" cy="-13" rx="3.8" ry="11" transform="rotate(-18 -6 -13)"/><ellipse class="ear-in" cx="-6" cy="-12" rx="1.8" ry="7" transform="rotate(-18 -6 -12)"/></g>
      <ellipse class="donkey" cx="5" cy="-14" rx="3.8" ry="11" transform="rotate(14 5 -14)"/><ellipse class="ear-in" cx="5" cy="-13" rx="1.8" ry="7" transform="rotate(14 5 -13)"/>
      <circle class="mane-fill" cx="-1" cy="-9" r="3.2"/><circle class="mane-fill" cx="2.5" cy="-10" r="3"/>
      <ellipse class="donkey" cx="0" cy="0" rx="11" ry="10"/>
      <ellipse class="muzzle" cx="3" cy="5.5" rx="8.5" ry="6"/>
      <circle class="eye-ink" cx="1.5" cy="4.5" r=".9"/><circle class="eye-ink" cx="6" cy="4.5" r=".9"/>
      ${eyes([[-3.6, -2.6], [4.2, -2.6]], 2.3)}${cheeks([[-7, 1.8]])}
      <path class="smile" d="M1.8 8.4 q 2 1.4 4 0"/>
    </g></g>
  </g></g>`;

// A first-century fishing boat on the Sea of Galilee: a round-bellied wooden hull
// with an upswept stern, one mast and a square sail, oars, and two fishermen with
// nets (a cast net in the air and a dragnet with floats), the way the Gospels describe.
export const boat = (x, y, s = 1) => {
  const castPts = [[46, -6], [52, -3], [59, -2], [66, -3], [71, -6]];
  return `
  <g transform="translate(${x} ${y}) scale(${s})"><g class="rock">
    <path class="net" d="M-60 -1 C -74 2, -88 2, -104 -1"/>
    <path class="net mesh" d="M-62 0 L -66 12 L -71 1 L -76 13 L -81 1 L -86 13 L -91 1 L -96 12 L -101 0 M-66 12 C -80 15, -88 15, -96 12"/>
    ${[-68, -79, -90, -101].map((cx) => `<circle class="float" cx="${cx}" cy="0" r="2.2"/>`).join("")}
    <path class="oar" d="M-44 -14 L -58 10"/><ellipse class="oar-blade" cx="-58" cy="9" rx="2.6" ry="6.5" transform="rotate(30 -58 9)"/>
    <path class="oar" d="M-14 -6 L -22 12"/><ellipse class="oar-blade" cx="-22" cy="11" rx="2.2" ry="5" transform="rotate(25 -22 11)"/>
    <path class="oar" d="M10 -6 L 4 12"/><ellipse class="oar-blade" cx="4" cy="11" rx="2.2" ry="5" transform="rotate(20 4 11)"/>
    <path class="rope" d="M-30 -60 L -48 -18 M20 -60 L 44 -14"/>
    <path class="mast" d="M-4 -8 L -4 -68"/>
    <path class="mast thin" d="M-32 -60 C -10 -62, 6 -62, 24 -60"/>
    <path class="sail" d="M-29 -59 L 21 -59 C 26 -46, 26 -34, 21 -22 L -29 -22 C -25 -34, -25 -46, -29 -59 Z"/>
    <path class="sail-stripe" d="M-27.5 -50 L 23.5 -50 C 24.3 -47, 24.3 -45, 24 -43 L -26.5 -43 C -26.9 -45, -27.1 -47, -27.5 -50 Z"/>
    <path class="hull" d="M-52 -24 C -50 -16, -44 -10, -36 -8 L 36 -8 C 42 -10, 47 -14, 50 -19 C 52 -10, 45 4, 30 7 L -32 7 C -46 4, -55 -10, -52 -24 Z"/>
    <path class="hull-line" d="M-52 -24 C -55 -29, -50 -33, -46 -29"/>
    <path class="plank" d="M-46 -3 C -20 1, 20 1, 46 -6 M-40 2.5 C -16 5, 16 5, 40 0.5"/>
    <path class="rim" d="M-37 -8 L 37 -8"/>
    <g transform="translate(-34 -8)">
      <path class="robe-a" d="M-6.5 0 C -7 -11, 7 -11, 6.5 0 Z"/><path class="arm" d="M-3 -6 L -9 -7"/>
      <circle class="skin" cx="0" cy="-13" r="5"/><path class="headcloth" d="M-5.6 -13.5 C -5.4 -21, 5.4 -21, 5.6 -13.5 L 7 -9 L 4.2 -11.5 C 2 -15.5, -2 -15.5, -4.2 -11.5 L -7 -9 Z"/>
      ${eyes([[-1.6, -12.4], [1.9, -12.4]], .9)}${cheeks([[-3, -10.3], [3.3, -10.3]])}
    </g>
    <g transform="translate(26 -8)">
      <path class="robe-b" d="M-6.5 0 C -7 -11, 7 -11, 6.5 0 Z"/><path class="arm" d="M2 -7 L 10 -19 M-2 -7 L 6 -21"/>
      <circle class="skin" cx="0" cy="-13" r="5"/><path class="headcloth b" d="M-5.6 -13.5 C -5.4 -21, 5.4 -21, 5.6 -13.5 L 7 -9 L 4.2 -11.5 C 2 -15.5, -2 -15.5, -4.2 -11.5 L -7 -9 Z"/>
      ${eyes([[-1.4, -12.4], [2.1, -12.4]], .9)}${cheeks([[-3, -10.3], [3.4, -10.3]])}
    </g>
    <g class="cast">
      <path class="net mesh" d="${castPts.map(([px, py]) => `M34 -28 L ${px} ${py}`).join(" ")}"/>
      <path class="net" d="M${castPts.map(([px, py]) => `${px} ${py}`).join(" L ")}"/>
      <path class="net mesh" d="M38 -20 C 46 -18, 58 -18, 64 -17 M42 -12 C 50 -10, 60 -10, 68 -11"/>
      ${castPts.map(([px, py]) => `<circle class="weight" cx="${px}" cy="${py}" r="1.3"/>`).join("")}
    </g>
  </g></g>`;
};

const flower = (x, y) => `<g transform="translate(${x} ${y})"><path class="stem" d="M0 0 L 0 -14"/><circle class="bloom" cx="0" cy="-16" r="4"/><circle class="bloom-center" cx="0" cy="-16" r="1.6"/></g>`;

// The friend in the corner for the Animated look.
export const friend = (which) => `<svg viewBox="-42 -58 100 84" aria-hidden="true" class="friend">${which === "donkey" ? donkey(0, 0, 1) : lamb(0, 0, 1.3)}</svg>`;

/* ---------- The Sea of Galilee: swimming fish ---------- */
// Each fish is drawn facing right, about 64 units long. The tail and fins move on
// their own, the body wiggles gently, and the whole fish glides across the water.
// Gradient ids get a fresh suffix per drawing, because a gradient inside a hidden
// view would otherwise blank out the copies in visible ones.
let uid = 0;
const FISH_KINDS = ["a", "b", "c"];

function fishBody(kind, id) {
  return `
    <defs>
      <linearGradient id="fg${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="f${kind}-top"/><stop offset=".55" class="f${kind}-mid"/><stop offset="1" class="f${kind}-belly"/>
      </linearGradient>
      <linearGradient id="ff${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" class="f${kind}-fin" stop-opacity=".95"/><stop offset="1" class="f${kind}-fin" stop-opacity=".55"/>
      </linearGradient>
    </defs>
    <g class="fish-wiggle">
      <g class="fish-tail"><path fill="url(#ff${id})" d="M-17 0 C -24 -5, -31 -15, -36 -13 C -40 -11, -38 -4, -35 0 C -38 4, -40 11, -36 13 C -31 15, -24 5, -17 0 Z"/>
        <path class="fin-ray" d="M-21 -1 L -32 -9 M-21 1 L -32 9 M-22 0 L -34 0"/></g>
      <path class="fish-fin" fill="url(#ff${id})" d="M-10 -14 C -7 -24, 6 -25, 10 -13 C 2 -15, -4 -15, -10 -14 Z"/>
      <path class="fish-fin" fill="url(#ff${id})" d="M-9 13 C -8 19, -2 20, 1 14 Z"/>
      <path fill="url(#fg${id})" class="fish-skin" d="M-19 0 C -19 -15, 0 -19, 14 -13 C 24 -8, 26 6, 15 12 C 2 19, -19 15, -19 0 Z"/>
      <path class="scales" d="M-11 -6 q 3 3 0 6 q 3 3 0 6 M-5 -9 q 3 3 0 6 q 3 3 0 6 q 3 3 0 6 M1 -10 q 3 3 0 6 q 3 3 0 6 q 3 3 0 6"/>
      <ellipse class="sheen" cx="-1" cy="-10" rx="10" ry="2.6"/>
      <path class="gill" d="M8 -9 C 4.5 -3, 4.5 3, 8 9"/>
      <g class="fish-pec"><path fill="url(#ff${id})" d="M5 4 C 1 10, -5 12, -8 10 C -4 7, 1 5, 5 4 Z"/></g>
      <g class="blink"><circle class="fish-eye" cx="13" cy="-4" r="5.4"/><circle class="fish-pupil" cx="14" cy="-3.6" r="3.5"/><circle class="fish-glint" cx="15.4" cy="-5.3" r="1.4"/><circle class="fish-glint" cx="12.9" cy="-2.2" r=".6"/></g>
      <ellipse class="blush" cx="14" cy="4.6" rx="3" ry="1.7"/>
      <path class="smile" d="M19.5 4.2 q 2 1.8 4 -.4"/>
    </g>`;
}

// One fish crossing the water. x, y: where it sits when motion is off.
// dir 1 swims right, -1 swims left. dur: seconds to cross. width: scene width.
export function swimmer({ x, y, s = 1, dir = 1, dur = 20, delay = 0, kind = "a", width = 360 }) {
  const id = `${++uid}`;
  const from = dir > 0 ? -60 - x : width + 60 - x;
  const to = dir > 0 ? width + 60 - x : -60 - x;
  return `<g class="across" style="--from:${from}px;--to:${to}px;--dur:${dur}s;--delay:${-delay}s">
    <g transform="translate(${x} ${y}) scale(${dir * s} ${s})"><g class="fish-bob" style="--bob:${2.6 + (uid % 5) * .4}s">${fishBody(kind, id)}</g></g></g>`;
}

// A small school of little fish that travel together.
const school = (y, dir, dur, delay, width = 360) => [[0, 0], [-14, -7], [-15, 7], [-28, -2], [-30, 11], [-42, 4]]
  .map(([dx, dy], i) => swimmer({ x: 180 + dx * dir, y: y + dy, s: .28, dir, dur, delay: delay + i * .15, kind: FISH_KINDS[i % 3], width })).join("");

const bubbles = (n, width, top, bottom) => Array.from({ length: n }, (_, i) => {
  const x = ((i * 67) % (width - 20)) + 10;
  return `<circle class="bubble-dot" cx="${x}" cy="${bottom}" r="${1.2 + (i % 3) * .8}" style="--rise:${bottom - top}px;--bd:${5 + (i % 4)}s;--bdelay:${-i * 1.3}s"/>`;
}).join("");

const grass = (x, h, bottom) => `<path class="sea-grass" style="--gd:${3 + (x % 3)}s" d="M${x} ${bottom} C ${x - 4} ${bottom - h / 3}, ${x + 4} ${bottom - (2 * h) / 3}, ${x} ${bottom - h}"/>`;

// The wide banner for Home and the study pages, in each look's colors.
export function seaScene(style, { height = 170 } = {}) {
  if (style === "classic") return classicScene({ height });
  if (THEME_LOOKS.includes(style)) return themeScene(style, { height });
  const W = 360, H = height, surf = 58, bottom = H - 8;
  const id = ++uid;
  const waveLine = (y, cls) => `<path class="${cls}" d="M-60 ${y} ${Array.from({ length: 16 }, () => "q 7.5 -4 15 0 t 15 0").join(" ")}"/>`;
  const shore = style === "animated"
    ? `<path class="shore" d="M0 ${surf + 2} C 50 ${surf - 8}, 100 ${surf - 6}, 150 ${surf + 2} Z"/>${oliveTree(26, surf - 1, .8)}<g class="critter">${lamb(64, surf - 10, .5)}${donkey(112, surf - 11, .42)}</g>${boat(285, surf - 2, .5)}`
    : style === "feminine"
      ? `${boat(190, surf - 2, .5)}${figTree(326, surf, .85)}${flower(296, surf)}${flower(306, surf + 1)}${oliveBranch(0, 16, .8)}${oliveBranch(360, 16, .8, true)}`
      : `${boat(style === "masculine" ? 220 : 240, surf - 3, .78)}`;
  return `<svg class="scene sea" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid slice" aria-label="Fish swimming in the Sea of Galilee">
    <defs>
      <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sky-top"/><stop offset="1" class="sky-low"/></linearGradient>
      <linearGradient id="sea${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sea-top"/><stop offset="1" class="sea-deep"/></linearGradient>
      <linearGradient id="ray${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <clipPath id="water${id}"><rect y="${surf}" width="${W}" height="${H - surf}"/></clipPath>
    </defs>
    <rect width="${W}" height="${surf + 2}" fill="url(#sky${id})"/>
    <circle class="sun" cx="${style === "feminine" ? 250 : 300}" cy="24" r="13"/>
    <path class="far-hill" d="M0 ${surf} C 50 ${surf - 16}, 110 ${surf - 10}, 160 ${surf - 4} C 220 ${surf - 18}, 290 ${surf - 14}, 360 ${surf - 2} L 360 ${surf + 1} L 0 ${surf + 1} Z"/>
    <rect y="${surf}" width="${W}" height="${H - surf}" fill="url(#sea${id})"/>
    <g clip-path="url(#water${id})">
      <g class="rays"><path fill="url(#ray${id})" d="M60 ${surf} L 90 ${surf} L 70 ${H} L 20 ${H} Z"/><path fill="url(#ray${id})" d="M170 ${surf} L 192 ${surf} L 200 ${H} L 150 ${H} Z"/><path fill="url(#ray${id})" d="M280 ${surf} L 300 ${surf} L 330 ${H} L 290 ${H} Z"/></g>
      ${bubbles(9, W, surf + 6, bottom)}
      ${swimmer({ x: 250, y: surf + 62, s: .55, dir: -1, dur: 34, delay: 6, kind: "c" })}
      ${school(surf + 30, 1, 26, 10)}
      ${swimmer({ x: 90, y: surf + 36, s: .8, dir: 1, dur: 22, delay: 3, kind: "a" })}
      ${swimmer({ x: 300, y: surf + 80, s: .95, dir: -1, dur: 28, delay: 15, kind: "b" })}
      ${swimmer({ x: 150, y: surf + 92, s: .65, dir: 1, dur: 30, delay: 20, kind: "c" })}
      <path class="seabed" d="M0 ${bottom - 2} C 60 ${bottom - 10}, 120 ${bottom}, 180 ${bottom - 6} C 240 ${bottom - 12}, 300 ${bottom - 2}, 360 ${bottom - 8} L 360 ${H} L 0 ${H} Z"/>
      ${[24, 30, 112, 118, 214, 300, 306, 312].map((x, i) => grass(x, 16 + (i % 3) * 7, bottom - 2)).join("")}
      <circle class="pebble" cx="70" cy="${bottom - 3}" r="3"/><circle class="pebble" cx="250" cy="${bottom - 5}" r="2.4"/><circle class="pebble" cx="258" cy="${bottom - 4}" r="1.6"/>
    </g>
    <g class="wave-move">${waveLine(surf, "wave")}</g>
    <g class="wave-move slow">${waveLine(surf + 6, "wave faint")}</g>
    ${shore}
  </svg>`;
}

// End-of-chapter ornament: two fish circling each other over a little wave.
export function fishFlourish() {
  return `<svg class="flourish fish-flourish" viewBox="0 0 160 44" aria-hidden="true">
    <path class="wave faint" d="M10 34 q 7.5 -4 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0"/>
    <g class="circle-swim"><g transform="translate(58 18) scale(.42)"><g class="fish-bob" style="--bob:2.8s">${fishBody("a", `${++uid}`)}</g></g></g>
    <g class="circle-swim two"><g transform="translate(102 22) scale(-.42 .42)"><g class="fish-bob" style="--bob:3.2s">${fishBody("b", `${++uid}`)}</g></g></g>
  </svg>`;
}

// Olive branches that frame the edges of the app (the "love branches").
export function edgeVines() {
  const vine = (side) => {
    const sprigs = Array.from({ length: 9 }, (_, i) => {
      const y = 70 + i * 110;
      const r = i % 2 ? 35 : -35;
      return `${leaf(10, y, r + 90, 1.3)}${leaf(18, y + 18, -r + 90, 1.2)}${leaf(6, y + 40, r + 80, 1.1)}${i % 3 === 0 ? `<circle class="olive" cx="16" cy="${y + 30}" r="3.4"/><circle class="olive" cx="11" cy="${y + 36}" r="3"/>` : ""}`;
    }).join("");
    return `<svg class="vine vine-${side}" viewBox="0 0 34 1100" preserveAspectRatio="xMidYMin slice" aria-hidden="true"><g class="vine-sway"><path class="stem vine-stem" d="M12 0 C 22 120, 4 240, 14 360 C 24 480, 4 600, 14 720 C 24 840, 6 960, 14 1100"/>${sprigs}</g></svg>`;
  };
  return vine("left") + vine("right");
}

// Small branch for a sheet corner.
export const cornerSprig = (flip = false) => `<svg class="corner-sprig${flip ? " flip" : ""}" viewBox="0 0 100 40" aria-hidden="true">${oliveBranch(4, 34, .95)}</svg>`;

// A slim strip of water with a few fish, for the top of pages that need only a touch.
export function fishStrip(style = "") {
  if (style === "classic") return classicStrip("Olive branches and a cross");
  if (THEME_LOOKS.includes(style)) return themeStrip(style);
  const id = ++uid, W = 360, H = 54;
  return `<svg class="fish-strip" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="st${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sea-top"/><stop offset="1" class="sea-deep"/></linearGradient>
    <clipPath id="sc${id}"><rect width="${W}" height="${H}" rx="16"/></clipPath></defs>
    <g clip-path="url(#sc${id})">
      <rect width="${W}" height="${H}" fill="url(#st${id})"/>
      <g class="wave-move"><path class="wave" d="M-60 6 ${Array.from({ length: 16 }, () => "q 7.5 -4 15 0 t 15 0").join(" ")}"/></g>
      ${bubbles(6, W, 8, H - 2)}
      ${swimmer({ x: 70, y: 28, s: .42, dir: 1, dur: 18, delay: 4, kind: "a" })}
      ${swimmer({ x: 250, y: 36, s: .36, dir: -1, dur: 22, delay: 12, kind: "b" })}
      ${swimmer({ x: 160, y: 22, s: .3, dir: 1, dur: 26, delay: 18, kind: "c" })}
      ${style === "animated" ? swimmer({ x: 300, y: 18, s: .26, dir: -1, dur: 15, delay: 2, kind: "a" }) : ""}
    </g></svg>`;
}

/* ---------- Art that fits the passage ---------- */
// Chapters (or whole books) matched to a setting. Anything not listed gets the sea.
const SETTINGS = {
  sky: ["GEN.1", "GEN.15", "JOB.38", "PSA.8", "PSA.19", "PSA.104", "PSA.147", "ISA.40", "MAT.2"],
  garden: ["GEN.2", "GEN.3", "SNG", "PSA.1", "ISA.5", "JHN.15", "JHN.18", "JHN.20", "REV.22", "MAT.13", "MRK.4"],
  pasture: ["PSA.23", "PSA.100", "JHN.10", "LUK.2", "LUK.15", "EZK.34", "ISA.53", "1SA.16", "1SA.17", "GEN.29", "GEN.30", "RUT"],
  desert: ["EXO.13", "EXO.15", "EXO.16", "EXO.17", "EXO.19", "EXO.20", "NUM", "DEU", "MAT.4", "LUK.4"],
  sea: ["MAT.8", "MAT.14", "MRK.1", "MRK.6", "LUK.5", "LUK.8", "JHN.6", "JHN.21", "JON", "ACT.27", "EXO.14", "GEN.6", "GEN.7", "GEN.8"],
};
const CAPTIONS = {
  sky: "The heavens declare the glory of God",
  garden: "A garden planted by God",
  pasture: "Green pastures and a shepherd",
  desert: "Through the wilderness",
  sea: "The Sea of Galilee",
};
export function settingFor(book, chapter) {
  const key = `${book}.${chapter}`;
  for (const [name, list] of Object.entries(SETTINGS)) if (list.includes(key)) return name;
  for (const [name, list] of Object.entries(SETTINGS)) if (list.includes(book)) return name;
  return "sea";
}

const stripFrame = (id, inner, defs = "") => `<svg class="fish-strip passage-art" viewBox="0 0 360 54" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>${defs}<clipPath id="pc${id}"><rect width="360" height="54" rx="16"/></clipPath></defs><g clip-path="url(#pc${id})">${inner}</g></svg>`;

const shepherd = (x, y) => `<g transform="translate(${x} ${y})">
  <path class="staff" d="M9 2 L 9 -26 C 9 -32, 15 -32, 15 -27"/>
  <path class="robe-a" d="M-7 2 C -8 -12, 8 -12, 7 2 Z"/><circle class="skin" cx="0" cy="-15" r="4.6"/>
  <path class="headcloth" d="M-5.2 -15.5 C -5 -22, 5 -22, 5.2 -15.5 L 6.4 -11.5 L 3.8 -13.5 C 2 -17, -2 -17, -3.8 -13.5 L -6.4 -11.5 Z"/>
  <g class="face-bits">${eyes([[-1.5, -14.6], [1.8, -14.6]], .8)}</g><path class="arm" d="M3 -6 L 9 -10"/></g>`;
const palm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="trunk" d="M0 0 C 1 -10, -1 -20, 2 -30" stroke-width="3" fill="none"/>
  <g class="sway">${[-60, -25, 15, 50, 85].map((r) => `<ellipse class="palm-leaf" cx="0" cy="0" rx="12" ry="3" transform="translate(2 -30) rotate(${r - 90}) translate(10 0)"/>`).join("")}</g></g>`;
const tent = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="tent" d="M-14 0 L 0 -14 L 14 0 Z"/><path class="tent-door" d="M-3 0 L 0 -6 L 3 0 Z"/></g>`;

export function passageStrip(book, chapter, style = "") {
  const kind = settingFor(book, chapter);
  if (THEME_LOOKS.includes(style)) return { kind: style, caption: "", svg: themeStrip(style) };
  if (style === "classic") return { kind: "classic", caption: "", svg: classicStrip("Olive branches and a cross") };
  const id = ++uid;
  let art;
  if (kind === "sky") {
    const stars = Array.from({ length: 26 }, (_, i) => `<circle class="star" cx="${(i * 53) % 350 + 5}" cy="${(i * 29) % 40 + 5}" r="${i % 4 ? .9 : 1.5}" style="--tw:${2 + (i % 5)}s;--td:${-i * .7}s"/>`).join("");
    art = stripFrame(id, `<rect width="360" height="54" fill="url(#ns${id})"/>${stars}
      <circle class="moon" cx="300" cy="18" r="9"/><circle cx="304" cy="15" r="8" fill="url(#ns${id})"/>
      <circle class="sun-rise" cx="40" cy="58" r="16"/><path class="far-hill night" d="M0 54 C 80 40, 160 46, 220 50 C 280 44, 330 46, 360 50 L 360 54 Z"/>`,
      `<linearGradient id="ns${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2b4a"/><stop offset="1" stop-color="#4a5f86"/></linearGradient>`);
  } else if (kind === "garden") {
    art = stripFrame(id, `<rect width="360" height="54" fill="url(#gs${id})"/><circle class="sun" cx="320" cy="14" r="8"/>
      <path class="hill" d="M0 40 C 60 30, 130 34, 180 40 C 240 46, 300 32, 360 38 L 360 54 L 0 54 Z"/>
      <path class="river" d="M0 50 C 60 44, 120 54, 180 48 S 300 46, 360 52"/>
      ${oliveTree(60, 46, .55)}${figTree(250, 46, .55)}${oliveTree(150, 44, .42)}${flower(110, 48)}${flower(200, 47)}${flower(300, 49)}${flower(318, 48)}`,
      `<linearGradient id="gs${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sky-top"/><stop offset="1" class="sky-low"/></linearGradient>`);
  } else if (kind === "pasture") {
    art = stripFrame(id, `<rect width="360" height="54" fill="url(#ps${id})"/><circle class="sun" cx="300" cy="14" r="8"/>
      <path class="hill" d="M0 34 C 70 22, 150 28, 210 34 C 270 40, 320 26, 360 30 L 360 54 L 0 54 Z"/>
      <path class="hill near" d="M0 46 C 80 38, 170 44, 240 46 C 300 48, 340 40, 360 44 L 360 54 L 0 54 Z"/>
      <path class="river" d="M150 54 C 170 48, 210 50, 250 46 S 330 48, 360 46"/>
      <g class="critter">${lamb(70, 40, .38)}${lamb(118, 44, .32)}${lamb(196, 38, .3)}</g>${shepherd(250, 44)}${oliveTree(330, 42, .4)}`,
      `<linearGradient id="ps${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sky-top"/><stop offset="1" class="sky-low"/></linearGradient>`);
  } else if (kind === "desert") {
    art = stripFrame(id, `<rect width="360" height="54" fill="url(#ds${id})"/>
      <path class="cloud-pillar" d="M300 54 C 292 40, 300 30, 294 18 C 290 8, 302 2, 308 8 C 316 2, 324 12, 318 20 C 314 30, 322 42, 316 54 Z"/>
      <path class="dune" d="M0 36 C 60 26, 120 32, 180 38 C 240 30, 300 32, 360 36 L 360 54 L 0 54 Z"/>
      <path class="dune near" d="M0 48 C 90 40, 170 46, 260 44 C 310 42, 340 46, 360 46 L 360 54 L 0 54 Z"/>
      ${tent(70, 44, .9)}${tent(100, 46, .7)}${tent(126, 43, .8)}${tent(160, 46, .6)}${palm(30, 46, .7)}${palm(220, 44, .6)}`,
      `<linearGradient id="ds${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e4c6"/><stop offset="1" stop-color="#f8efdc"/></linearGradient>`);
  } else {
    art = fishStrip(style).replace('class="fish-strip"', 'class="fish-strip passage-art"');
  }
  return { kind, caption: CAPTIONS[kind], svg: art };
}

/* ---------- Classic look: an olive branch and a cross, drawn still ---------- */
// Used in place of the sea scenes, strips and fish when the look is "classic".
// Muted brown, gray and white. Nothing here moves or has a face.
const cross = (x, y, h = 60) => {
  const w = h * .11, arm = h * .52, armY = y - h * .72;
  return `<g class="cl-cross"><rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${w * .2}"/>
    <rect x="${x - arm / 2}" y="${armY - w / 2}" width="${arm}" height="${w}" rx="${w * .2}"/></g>`;
};
const clLeaf = (x, y, r, s = 1) => `<path class="cl-leaf" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0 C 5 -3, 13 -3, 18 0 C 13 3, 5 3, 0 0 Z"/>`;
// A long olive branch that curves up from a corner: leaves in pairs, a few olives.
const clBranch = (x, y, s = 1, flip = false) => {
  const pts = [[14, -4, -38, 22], [28, -10, -48, 18], [42, -18, -55, 12], [56, -27, -62, 6], [70, -37, -70, 0], [82, -49, -78, -6]];
  const leaves = pts.map(([px, py, a, b], i) => `${clLeaf(px, py, a - 32, 1 - i * .05)}${clLeaf(px, py, b + 14, .95 - i * .05)}`).join("");
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <path class="cl-stem" d="M0 0 C 30 -8, 60 -24, 90 -60"/>${leaves}
    <ellipse class="cl-olive" cx="34" cy="-6" rx="3.4" ry="2.6" transform="rotate(-20 34 -6)"/><ellipse class="cl-olive" cx="39" cy="-2" rx="3.4" ry="2.6"/>
    <ellipse class="cl-olive" cx="64" cy="-24" rx="3.2" ry="2.5" transform="rotate(-30 64 -24)"/></g>`;
};
export function classicScene({ height = 170 } = {}) {
  const W = 360, H = height, id = ++uid, ground = H - 34;
  return `<svg class="scene classic-scene" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid slice" aria-label="A cross on a hill, framed by olive branches">
    <defs><linearGradient id="cls${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="cl-sky-top"/><stop offset="1" class="cl-sky-low"/></linearGradient>
      <radialGradient id="clg${id}" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#cls${id})"/>
    <ellipse cx="180" cy="${ground - 40}" rx="120" ry="70" fill="url(#clg${id})"/>
    <path class="cl-hill far" d="M0 ${ground - 6} C 70 ${ground - 26}, 120 ${ground - 18}, 180 ${ground - 30} C 240 ${ground - 18}, 300 ${ground - 24}, 360 ${ground - 8} L 360 ${H} L 0 ${H} Z"/>
    <path class="cl-hill" d="M0 ${ground + 10} C 90 ${ground - 4}, 140 ${ground - 2}, 180 ${ground - 14} C 220 ${ground - 2}, 280 ${ground - 2}, 360 ${ground + 12} L 360 ${H} L 0 ${H} Z"/>
    ${cross(180, ground - 12, 92)}
    ${clBranch(0, H - 6, 1.25)}${clBranch(W, H - 6, 1.25, true)}
    <path class="cl-rule" d="M0 ${H - .5} H ${W}"/>
  </svg>`;
}
export function classicStrip(caption = "") {
  return `<svg class="fish-strip passage-art classic-strip" viewBox="0 0 360 54" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${caption.replace(/"/g, "&quot;")}">
    <rect width="360" height="54" rx="14" class="cl-band"/>
    ${clBranch(110, 40, .48, true)}${cross(180, 46, 38)}${clBranch(250, 40, .48)}
  </svg>`;
}
export function classicFlourish() {
  return `<svg class="flourish classic-flourish" viewBox="0 0 160 44" aria-hidden="true">
    <path class="cl-stem" d="M14 26 H 66 M94 26 H 146"/>
    ${clLeaf(30, 26, -24, .8)}${clLeaf(30, 26, 24, .8)}${clLeaf(48, 26, -24, .8)}${clLeaf(48, 26, 24, .8)}
    ${clLeaf(130, 26, 204, .8)}${clLeaf(130, 26, 156, .8)}${clLeaf(112, 26, 204, .8)}${clLeaf(112, 26, 156, .8)}
    ${cross(80, 40, 30)}</svg>`;
}

/* ---------- Wooden Cross look ---------- */
// Shows the wooden cross picture (img/wooden-cross.jpg) when it's in the app,
// over a still drawn wooden cross that shows until then (or if it can't load).
export function woodScene() {
  const id = ++uid;
  const grain = Array.from({ length: 6 }, (_, i) => `<path class="wood-grain" d="M${176 + i * 1.6} 30 C ${174 + i * 2} 70, ${178 + i * 1.4} 110, ${175 + i * 1.8} 150"/>`).join("")
    + Array.from({ length: 4 }, (_, i) => `<path class="wood-grain" d="M140 ${56 + i * 2} C 160 ${54 + i * 2.4}, 200 ${58 + i * 1.6}, 220 ${55 + i * 2.2}"/>`).join("");
  return `<figure class="scene photo-scene" role="img" aria-label="A weathered wooden cross by the water under a wide sky">
    <svg viewBox="0 0 360 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="wb${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f1ec"/><stop offset="1" stop-color="#d9d2c9"/></linearGradient>
      <linearGradient id="ww${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b4429"/><stop offset=".5" stop-color="#946640"/><stop offset="1" stop-color="#6b4429"/></linearGradient></defs>
      <rect width="360" height="170" fill="url(#wb${id})"/>
      <ellipse cx="180" cy="162" rx="90" ry="6" fill="#000" opacity=".08"/>
      <rect x="168" y="26" width="24" height="134" rx="2" fill="url(#ww${id})"/>
      <rect x="134" y="50" width="92" height="22" rx="2" fill="url(#ww${id})"/>${grain}
    </svg>
    <img src="img/wooden-cross.jpg" alt="" onerror="this.remove()">
  </figure>`;
}

/* ---------- Still and seasonal looks: Sage, Nativity, Easter, Thanksgiving, Christmas ---------- */
// Drawn still. Only the Nativity and Christmas star twinkles, and only with Lively pictures on.
const dove = (x, y, s = 1, flip = false) => `<g class="dove" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <path d="M0 0 C 6 -3, 14 -2, 18 2 C 22 0, 26 0, 28 2 C 25 3, 23 5, 20 6 C 14 9, 5 8, 0 0 Z"/>
  <path d="M8 1 C 10 -9, 18 -15, 26 -14 C 21 -10, 17 -5, 15 2 Z"/>
  <path d="M10 2 C 6 -6, 0 -10, -6 -10 C -2 -6, 2 -2, 4 3 Z" opacity=".8"/>
  <circle class="dove-eye" cx="24" cy="1.6" r=".7"/></g>`;
const star = (x, y, r = 10) => { const gid = `sg${++uid}`; return `<g class="nat-star" transform="translate(${x} ${y})">
  <defs><radialGradient id="${gid}"><stop offset="0" stop-color="#fff2c4" stop-opacity=".75"/><stop offset=".35" stop-color="#ffe7a0" stop-opacity=".28"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/></radialGradient></defs>
  <circle class="star-glow" r="${r * 3.2}" fill="url(#${gid})"/>
  <g class="twinkle"><path class="star-shape" d="M0 ${-r * 1.9} L ${r * .28} ${-r * .28} L ${r * 1.9} 0 L ${r * .28} ${r * .28} L 0 ${r * 1.9} L ${-r * .28} ${r * .28} L ${-r * 1.9} 0 L ${-r * .28} ${-r * .28} Z"/>
  <path class="star-shape" d="M0 ${-r * .9} L ${r * .2} ${-r * .2} L ${r * .9} 0 L ${r * .2} ${r * .2} L 0 ${r * .9} L ${-r * .2} ${r * .2} L ${-r * .9} 0 L ${-r * .2} ${-r * .2} Z" transform="rotate(45)"/></g></g>`; };
const sky = (n) => Array.from({ length: n }, (_, i) => `<circle class="sky-dot" cx="${(i * 71) % 350 + 6}" cy="${(i * 37) % 60 + 6}" r="${i % 3 ? .8 : 1.3}" style="--tw:${3 + (i % 4)}s;--td:${-i * .9}s"/>`).join("");
const camel = (x, y, s = 1) => `<g class="traveler" transform="translate(${x} ${y}) scale(${s})">
  <path d="M-16 -14 C -14 -24, -6 -26, -2 -20 C 2 -28, 10 -27, 12 -18 C 15 -18, 18 -22, 20 -28 C 21 -32, 26 -33, 27 -29 L 25 -27 C 23 -22, 21 -15, 17 -12 C 14 -10, 10 -9, 6 -9 L -12 -9 C -15 -9, -17 -11, -16 -14 Z"/>
  <path d="M-12 -10 L -13 0 M -8 -10 L -7 0 M 6 -10 L 5 0 M 10 -10 L 12 0" stroke-width="2.2" stroke-linecap="round" fill="none" class="traveler-legs"/>
  <path d="M-4 -24 C -5 -32, 3 -32, 2 -24 Z"/><circle cx="-1" cy="-34" r="2.6"/></g>`;
const stable = (x, y, s = 1, glow = true) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${glow ? `<defs><radialGradient id="sl${++uid}"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".7"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient></defs><ellipse class="stable-glow" cx="0" cy="-12" rx="40" ry="26" fill="url(#sl${uid})"/>` : ""}
  <path class="stable-roof" d="M-30 -30 L 0 -46 L 30 -30 L 26 -28 L 0 -41 L -26 -28 Z"/>
  <path class="stable-wall" d="M-24 -29 L -24 0 L -20 0 L -20 -29 Z M 20 -29 L 20 0 L 24 0 L 24 -29 Z"/>
  <g class="holy-family"><path d="M-12 0 C -13 -8, -11 -14, -8 -15 C -5 -14, -4 -8, -4 0 Z"/><circle cx="-8" cy="-17.5" r="2.6"/>
  <path d="M9 0 C 8 -12, 10 -20, 13 -21 C 16 -20, 17 -12, 17 0 Z"/><circle cx="13" cy="-23.5" r="2.8"/><path d="M18 -18 L 20 0" stroke-width="1.2" fill="none" class="staff-line"/>
  <path class="manger" d="M-3 -3 L 5 -3 L 4 0 L -2 0 Z"/><ellipse class="baby" cx="1" cy="-4" rx="3" ry="1.6"/></g></g>`;
const palm2 = (x, y, s = 1) => `<g class="palm2" transform="translate(${x} ${y}) scale(${s})"><path class="palm-trunk" d="M0 0 C 2 -14, 0 -28, 4 -42" fill="none" stroke-width="3.2"/>
  ${[-70, -35, 0, 35, 70, 105].map((r) => `<path class="palm-frond" d="M4 -42 C 10 -46, 20 -44, 26 -38 C 18 -40, 10 -40, 4 -42 Z" transform="rotate(${r - 20} 4 -42)"/>`).join("")}</g>`;
const lily = (x, y, s = 1) => `<g class="lily" transform="translate(${x} ${y}) scale(${s})"><path class="lily-stem" d="M0 0 C 1 -8, -1 -16, 1 -24" fill="none" stroke-width="1.4"/>
  <path class="lily-leaf" d="M0 -6 C -8 -10, -10 -16, -9 -20 C -5 -16, -2 -12, 0 -8 Z"/>
  <path class="lily-flower" d="M1 -24 C -6 -26, -9 -32, -8 -36 C -5 -33, -2 -31, 1 -31 C 4 -31, 7 -33, 10 -36 C 11 -32, 8 -26, 1 -24 Z"/>
  <path class="lily-center" d="M1 -25 L 1 -31" stroke-width="1" fill="none"/></g>`;
const pumpkin = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="pumpkin" cx="-5" cy="-6" rx="7" ry="6"/><ellipse class="pumpkin" cx="5" cy="-6" rx="7" ry="6"/><ellipse class="pumpkin hi" cx="0" cy="-6" rx="6" ry="6.4"/><path class="pumpkin-stem" d="M0 -12 C 0 -15, 2 -17, 4 -17" fill="none" stroke-width="2"/></g>`;
const wheat = (x, y, s = 1) => `<g class="wheat" transform="translate(${x} ${y}) scale(${s})">${[-14, -7, 0, 7, 14].map((r) => `<g transform="rotate(${r})"><path class="wheat-stalk" d="M0 0 L 0 -26" stroke-width="1.2" fill="none"/>${[0, 1, 2, 3].map((k) => `<ellipse class="wheat-grain" cx="${k % 2 ? 1.6 : -1.6}" cy="${-27 - k * 3}" rx="1.5" ry="2.6" transform="rotate(${k % 2 ? 20 : -20} ${k % 2 ? 1.6 : -1.6} ${-27 - k * 3})"/>`).join("")}</g>`).join("")}<path class="wheat-tie" d="M-4 -8 L 4 -8" stroke-width="2"/></g>`;
const fallTree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="trunk" d="M-3 0 C -2 -10, -4 -18, 0 -26 C 3 -18, 2 -10, 3 0 Z"/>
  <circle class="fall-leaf a" cx="-10" cy="-32" r="11"/><circle class="fall-leaf b" cx="8" cy="-34" r="12"/><circle class="fall-leaf c" cx="0" cy="-44" r="10"/><circle class="fall-leaf b" cx="-2" cy="-30" r="8"/></g>`;
const holly = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <path class="holly-leaf" d="M0 0 C 4 -2, 6 -6, 10 -6 C 9 -3, 12 -1, 14 -2 C 13 1, 15 4, 18 4 C 14 6, 10 6, 8 8 C 7 5, 3 4, 0 0 Z"/>
  <path class="holly-leaf" d="M0 0 C 2 -4, 1 -8, 3 -12 C 5 -9, 8 -9, 9 -11 C 10 -8, 12 -6, 15 -6 C 12 -3, 9 -1, 8 2 C 5 0, 2 1, 0 0 Z" transform="rotate(-50)"/>
  <circle class="holly-berry" cx="2" cy="-2" r="2.4"/><circle class="holly-berry" cx="5" cy="1" r="2.2"/><circle class="holly-berry" cx="-1" cy="2" r="2"/></g>`;

const SCENE_LABELS = {
  sage: "A cross on a hill with olive branches and doves",
  nativity: "Wise men crossing the desert toward the star over Bethlehem",
  easter: "The empty tomb at sunrise, with lilies",
  fall: "A harvest field in autumn",
  christmas: "The stable in Bethlehem under the star",
};
export function themeScene(theme, { height = 170 } = {}) {
  const W = 360, H = height, id = ++uid, g = H - 30;
  const grad = (stops) => `<linearGradient id="tg${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;
  let defs = "", art = "";
  if (theme === "sage") {
    defs = grad([[0, "#e6ede6"], [1, "#fbfaf5"]]);
    art = `<path class="th-hill far" d="M0 ${g - 8} C 80 ${g - 26}, 140 ${g - 20}, 180 ${g - 32} C 230 ${g - 20}, 300 ${g - 26}, 360 ${g - 10} L 360 ${H} L 0 ${H} Z"/>
      <path class="th-hill" d="M0 ${g + 8} C 90 ${g - 4}, 140 ${g - 2}, 180 ${g - 14} C 220 ${g - 2}, 280 ${g}, 360 ${g + 10} L 360 ${H} L 0 ${H} Z"/>
      ${cross(180, g - 12, 88)}${dove(206, 44, .9)}${dove(130, 60, .7, true)}
      ${clBranch(0, H - 6, 1.25)}${clBranch(W, H - 6, 1.25, true)}`;
  } else if (theme === "nativity" || theme === "christmas") {
    const xmas = theme === "christmas";
    defs = grad(xmas ? [[0, "#0f1d2e"], [.55, "#1f3550"], [.85, "#c99a45"], [1, "#efd9a0"]] : [[0, "#16213b"], [.45, "#2d3f66"], [.8, "#d8a94e"], [1, "#f4dd9c"]]);
    art = `${sky(22)}
      <path class="star-beam" d="M${xmas ? 180 : 262} 36 L ${xmas ? 166 : 250} ${g - 40} L ${xmas ? 194 : 286} ${g - 40} Z"/>
      ${star(xmas ? 180 : 262, 34, xmas ? 9 : 8)}
      <path class="dune far" d="M0 ${g - 14} C 60 ${g - 30}, 120 ${g - 22}, 190 ${g - 18} C 250 ${g - 28}, 310 ${g - 22}, 360 ${g - 16} L 360 ${H} L 0 ${H} Z"/>
      ${xmas ? `<path class="town" d="M70 ${g - 18} L 70 ${g - 32} L 84 ${g - 32} L 84 ${g - 38} C 84 ${g - 46}, 98 ${g - 46}, 98 ${g - 38} L 98 ${g - 30} L 114 ${g - 30} L 114 ${g - 18} Z M 236 ${g - 18} L 236 ${g - 34} L 256 ${g - 34} L 256 ${g - 26} L 272 ${g - 26} L 272 ${g - 18} Z"/>` : ""}
      <path class="dune" d="M0 ${g + 2} C 70 ${g - 14}, 150 ${g - 6}, 210 ${g - 2} C 270 ${g - 10}, 320 ${g - 6}, 360 ${g} L 360 ${H} L 0 ${H} Z"/>
      ${xmas ? stable(180, g + 2, 1.15) : `${camel(70, g - 6, .62)}${camel(104, g - 8, .58)}${camel(136, g - 9, .54)}${stable(282, g + 2, .95)}${palm2(330, g + 6, .9)}`}
      <path class="ground" d="M0 ${g + 10} C 100 ${g + 2}, 260 ${g + 4}, 360 ${g + 8} L 360 ${H} L 0 ${H} Z"/>
      ${xmas ? `${holly(14, H - 10, 1.4)}${holly(W - 14, H - 10, 1.4, true)}` : palm2(26, g + 12, 1.05)}`;
  } else if (theme === "easter") {
    defs = grad([[0, "#d9d3ea"], [.55, "#f5d9c4"], [1, "#fbefc9"]]);
    art = `<circle class="sunrise" cx="250" cy="${g - 22}" r="26"/>
      <path class="th-hill far" d="M0 ${g - 10} C 50 ${g - 34}, 100 ${g - 30}, 130 ${g - 18} C 200 ${g - 26}, 300 ${g - 22}, 360 ${g - 12} L 360 ${H} L 0 ${H} Z"/>
      <g class="far-crosses">${cross(62, g - 26, 26)}${cross(80, g - 30, 32)}${cross(98, g - 26, 26)}</g>
      <path class="tomb-rock" d="M196 ${g + 6} C 200 ${g - 40}, 260 ${g - 52}, 330 ${g - 30} C 352 ${g - 20}, 360 ${g - 6}, 360 ${g + 6} Z"/>
      <path class="tomb-door" d="M262 ${g + 4} L 262 ${g - 14} C 262 ${g - 26}, 284 ${g - 26}, 284 ${g - 14} L 284 ${g + 4} Z"/>
      <circle class="tomb-stone" cx="236" cy="${g - 10}" r="15"/>
      <path class="th-hill" d="M0 ${g + 10} C 100 ${g}, 220 ${g + 2}, 360 ${g + 8} L 360 ${H} L 0 ${H} Z"/>
      ${lily(28, H - 6, 1)}${lily(44, H - 4, .85)}${lily(160, H - 4, .9)}${lily(330, H - 4, .95)}${lily(346, H - 6, .8)}`;
  } else if (theme === "fall") {
    defs = grad([[0, "#f1e4c8"], [1, "#fbf5e8"]]);
    art = `<circle class="sun" cx="300" cy="34" r="14"/>
      <path class="field far" d="M0 ${g - 10} C 80 ${g - 30}, 150 ${g - 24}, 220 ${g - 16} C 280 ${g - 26}, 330 ${g - 22}, 360 ${g - 14} L 360 ${H} L 0 ${H} Z"/>
      ${cross(228, g - 20, 30)}
      <path class="field" d="M0 ${g + 4} C 90 ${g - 12}, 180 ${g - 6}, 250 ${g - 2} C 300 ${g - 8}, 340 ${g - 4}, 360 ${g} L 360 ${H} L 0 ${H} Z"/>
      ${[0, 1, 2, 3].map((k) => `<path class="furrow" d="M0 ${g + 10 + k * 6} C 120 ${g + 2 + k * 6}, 240 ${g + 4 + k * 6}, 360 ${g + 8 + k * 6}"/>`).join("")}
      ${fallTree(60, g - 2, 1)}${fallTree(312, g - 4, .85)}${wheat(150, H - 10, 1.1)}${pumpkin(186, H - 8, 1)}${pumpkin(206, H - 6, .8)}
      <g class="leaf-drift">${[[100, 30, 20], [140, 52, -40], [260, 60, 60], [330, 80, 10]].map(([x, y, r]) => `<ellipse class="fall-leaf a" cx="${x}" cy="${y}" rx="4" ry="2.2" transform="rotate(${r} ${x} ${y})"/>`).join("")}</g>`;
  }
  return `<svg class="scene theme-scene theme-${theme}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid slice" aria-label="${SCENE_LABELS[theme] || ""}">
    <defs>${defs}</defs><rect width="${W}" height="${H}" fill="url(#tg${id})"/>${art}<path class="cl-rule" d="M0 ${H - .5} H ${W}"/></svg>`;
}
export function themeStrip(theme) {
  const id = ++uid;
  const inner = theme === "sage" ? `${clBranch(112, 40, .48, true)}${cross(180, 46, 36)}${dove(200, 18, .55)}${clBranch(248, 40, .48)}`
    : theme === "nativity" ? `${sky(10)}${star(180, 22, 6)}${camel(112, 50, .42)}${camel(136, 50, .4)}${stable(240, 52, .55, false)}`
    : theme === "christmas" ? `${sky(10)}${star(180, 22, 6)}${holly(110, 44, .9)}${holly(250, 44, .9, true)}${stable(180, 54, .5, false)}`
    : theme === "easter" ? `${lily(120, 52, .8)}${lily(134, 52, .7)}${cross(180, 48, 34)}${lily(226, 52, .7)}${lily(240, 52, .8)}`
    : `${wheat(128, 50, .8)}${cross(180, 48, 32)}${pumpkin(226, 50, .8)}${pumpkin(242, 52, .6)}`;
  const dark = theme === "nativity" || theme === "christmas";
  return `<svg class="fish-strip passage-art theme-strip theme-${theme}" viewBox="0 0 360 54" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><clipPath id="ts${id}"><rect width="360" height="54" rx="14"/></clipPath></defs>
    <g clip-path="url(#ts${id})"><rect width="360" height="54" class="${dark ? "band-dark" : "cl-band"}"/>${inner}</g></svg>`;
}
