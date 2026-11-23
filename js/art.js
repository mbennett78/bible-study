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
  if (style === "classic" || style === "classic2") return classicScene({ height, style });
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
  if (style === "classic" || style === "classic2") return classicStrip("Olive branches and a cross");
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
  if (style === "classic" || style === "classic2") return { kind: "classic", caption: "", svg: classicStrip("Olive branches and three crosses") };
  if (style === "animated") { const story = kidsStory(book, chapter); if (story) return story; }
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
// Gentle motion for Lively pictures (styles.css, "Gentle motion"). With Still pictures or
// "reduce motion" everything here simply stands still in its place.
const breeze = (svg, delay = 0, cls = "m-sway") => `<g class="${cls}" style="--md:${-delay}s">${svg}</g>`;
const bird = (s = 1) => `<g transform="scale(${s})"><path class="m-bird" d="M-7 0 Q -3.5 -4.5 0 0 Q 3.5 -4.5 7 0" fill="none" stroke-width="1.6" stroke-linecap="round"/></g>`;
// Now and then a small flock passes over (app.js adds it to the picture for one flight).
export function flock(y = 30) {
  const v = [[0, 0, 1], [-12, 6, .85], [-12, -6, .85], [-23, 11, .7], [-23, -11, .7]];
  return `<g class="m-flock" aria-hidden="true">${v.map(([x, dy, sc]) => `<g transform="translate(${x} ${y + dy})">${bird(sc)}</g>`).join("")}</g>`;
}
// Things that travel slowly across the sky, wrapping round: [x, y, scale, seconds, head start].
function across(list, draw, width = 360) {
  return list.map(([x, y, sc, dur, lead]) => `<g class="across" style="--from:${-50 - x}px;--to:${width + 50 - x}px;--dur:${dur}s;--delay:${-lead}s"><g transform="translate(${x} ${y})"><g class="m-glide" style="--md:${-lead}s">${draw(sc)}</g></g></g>`).join("");
}
const cloud = (sc = 1) => `<g class="cl-cloud" transform="scale(${sc})"><ellipse cx="0" cy="0" rx="22" ry="7"/><ellipse cx="-8" cy="-5" rx="10" ry="7"/><ellipse cx="6" cy="-7" rx="12" ry="9"/></g>`;
const birds = (list, width) => across(list, bird, width);
const doves = (list, width) => across(list, (sc) => dove(0, 0, sc), width);
// Petals or leaves drifting down from a point: [x, y, seconds, head start].
const drift = (list, cls) => list.map(([x, y, dur, lead]) => `<g class="m-drift" style="--dd:${dur}s;--md:${-lead}s"><ellipse class="${cls}" cx="${x}" cy="${y}" rx="2.4" ry="1.5"/></g>`).join("");
// Classic 2's picture: five loaves and two fish in a basket, softly lit (John 6:9-13).
function loavesAndFish(x, y, id) {
  const loaf = (lx, ly, r = 0) => `<g transform="translate(${lx} ${ly}) rotate(${r})"><ellipse class="lf-loaf" cx="0" cy="0" rx="9" ry="5.5"/><path class="lf-score" d="M-4 -3 L -2 2 M 1 -4 L 3 1" fill="none"/></g>`;
  const fish = (fx, fy, flip = 1) => `<g transform="translate(${fx} ${fy}) scale(${flip} 1)"><path class="lf-fish" d="M-12 0 C -6 -6, 6 -6, 10 0 C 6 6, -6 6, -12 0 Z M 10 0 L 17 -5 L 16 0 L 17 5 Z"/><circle class="lf-eye" cx="-7" cy="-1" r="1"/></g>`;
  return `<g class="lf" transform="translate(${x} ${y}) scale(1.45)">
    <ellipse class="lf-glow m-glow2" cx="0" cy="-18" rx="70" ry="44" fill="url(#lfg${id})"/>
    ${loaf(-14, -26, -12)}${loaf(0, -30)}${loaf(14, -26, 12)}${loaf(-7, -21, -4)}${loaf(8, -21, 6)}
    ${fish(-6, -36, 1)}${fish(8, -39, -1)}
    <path class="lf-basket" d="M-34 -22 L 34 -22 L 26 4 C 10 8, -10 8, -26 4 Z"/>
    <path class="lf-weave" d="M-31 -14 C -10 -10, 10 -10, 31 -14 M -29 -6 C -10 -2, 10 -2, 29 -6 M -18 -21 L -14 5 M 0 -21 L 0 6 M 18 -21 L 14 5" fill="none"/>
    <path class="lf-rim" d="M-36 -24 C -12 -18, 12 -18, 36 -24" fill="none"/></g>`;
}
export function classicScene({ height = 170, style = "classic" } = {}) {
  const W = 360, H = height, id = ++uid, ground = H - 34;
  return `<svg class="scene classic-scene" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid slice" aria-label="Three crosses on a hill, framed by olive branches">
    <defs><linearGradient id="cls${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="cl-sky-top"/><stop offset="1" class="cl-sky-low"/></linearGradient>
      <radialGradient id="clg${id}" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#cls${id})"/>
    <circle class="cl-sun m-glow" cx="292" cy="38" r="20"/>
    ${across([[40, 30, 1, 120, 10], [210, 52, .8, 150, 70], [320, 22, .65, 130, 40]], cloud)}
    <ellipse class="m-glow" cx="180" cy="${ground - 40}" rx="120" ry="70" fill="url(#clg${id})"/>
    <g class="cl-birds">${birds([[70, 40, 1.3, 34, 12], [96, 30, 1.05, 34, 12.6], [250, 50, 1.15, 40, 26]], W)}</g>
    <path class="cl-hill far" d="M0 ${ground - 6} C 70 ${ground - 26}, 120 ${ground - 18}, 180 ${ground - 30} C 240 ${ground - 18}, 300 ${ground - 24}, 360 ${ground - 8} L 360 ${H} L 0 ${H} Z"/>
    <path class="cl-hill" d="M0 ${ground + 10} C 90 ${ground - 4}, 140 ${ground - 2}, 180 ${ground - 14} C 220 ${ground - 2}, 280 ${ground - 2}, 360 ${ground + 12} L 360 ${H} L 0 ${H} Z"/>
    ${style === "classic2" ? `<radialGradient id="lfg${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient>
      ${loavesAndFish(180, ground + 10, id)}`
    : `${cross(136, ground - 6, 54)}${cross(224, ground - 6, 54)}${cross(180, ground - 12, 92)}`}
    ${breeze(clBranch(0, H - 6, 1.25), 0, "m-sway m-branch")}${breeze(clBranch(W, H - 6, 1.25, true), 2.5, "m-sway m-branch")}
    <path class="cl-rule" d="M0 ${H - .5} H ${W}"/>
  </svg>`;
}
export function classicStrip(caption = "") {
  return `<svg class="fish-strip passage-art classic-strip" viewBox="0 0 360 54" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${caption.replace(/"/g, "&quot;")}">
    <rect width="360" height="54" rx="14" class="cl-band"/>
    ${clBranch(104, 40, .48, true)}${cross(156, 46, 26)}${cross(204, 46, 26)}${cross(180, 46, 38)}${clBranch(256, 40, .48)}
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
    <img src="img/wooden-cross.jpg" alt="">
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
const holly = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <path class="holly-leaf" d="M0 0 C 4 -2, 6 -6, 10 -6 C 9 -3, 12 -1, 14 -2 C 13 1, 15 4, 18 4 C 14 6, 10 6, 8 8 C 7 5, 3 4, 0 0 Z"/>
  <path class="holly-leaf" d="M0 0 C 2 -4, 1 -8, 3 -12 C 5 -9, 8 -9, 9 -11 C 10 -8, 12 -6, 15 -6 C 12 -3, 9 -1, 8 2 C 5 0, 2 1, 0 0 Z" transform="rotate(-50)"/>
  <circle class="holly-berry" cx="2" cy="-2" r="2.4"/><circle class="holly-berry" cx="5" cy="1" r="2.2"/><circle class="holly-berry" cx="-1" cy="2" r="2"/></g>`;

// Spring garden pieces for Sage
const blossomTree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="trunk" d="M-2.5 0 C -2 -10, -4 -18, 0 -28 C 3 -18, 2 -10, 2.5 0 Z"/>
  <circle class="blossom a" cx="-11" cy="-32" r="11"/><circle class="blossom b" cx="9" cy="-35" r="12"/><circle class="blossom a" cx="-1" cy="-45" r="10"/><circle class="blossom c" cx="1" cy="-30" r="8"/>
  ${[[-14, -38], [-4, -50], [8, -44], [14, -30], [-8, -26], [4, -36]].map(([a, b]) => `<circle class="petal-dot" cx="${a}" cy="${b}" r="1.6"/>`).join("")}</g>`;
const olive2 = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="trunk" d="M-3 0 C -1 -8, -6 -14, -2 -24 M 3 0 C 2 -10, 6 -16, 2 -24" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse class="olive-canopy" cx="-8" cy="-30" rx="13" ry="9"/><ellipse class="olive-canopy" cx="9" cy="-32" rx="12" ry="9"/><ellipse class="olive-canopy hi" cx="0" cy="-40" rx="11" ry="8"/></g>`;
const bloom = (x, y, c = "a") => `<g transform="translate(${x} ${y})"><path class="lily-stem" d="M0 0 L 0 -8" stroke-width="1" fill="none"/><circle class="spring-bloom ${c}" cx="0" cy="-9" r="2.6"/></g>`;
// Lord's Supper pieces for Thanksgiving
// The upper room, as it might have looked in Jerusalem (Luke 22:12): plaster and stone,
// small open windows with wooden shutters, clay oil lamps, flat bread, clay cups and bowls.
// A shallow pottery bowl, filled with grapes or olives.
const bowl = (x, y, s, fill) => `<g transform="translate(${x} ${y}) scale(${s})">${fill}<path class="bowl" d="M-14 -9 L 14 -9 C 13 -3, 8 0, 0 0 C -8 0, -13 -3, -14 -9 Z"/><path class="bowl-rim" d="M-14 -9 L 14 -9" stroke-width="1.4"/></g>`;
const grapeBowl = (x, y, s = 1) => bowl(x, y, s, `${[[-7, -11], [-2, -12], [3, -11], [8, -10], [-4, -16], [1, -17], [6, -15], [-1, -21]].map(([a, b]) => `<circle class="grape" cx="${a}" cy="${b}" r="3"/>`).join("")}<path class="grape-stem" d="M-1 -23 C 0 -27, 3 -28, 5 -27" stroke-width="1.4" fill="none"/><path class="grape-leaf" d="M1 -25 C 7 -32, 15 -28, 13 -22 C 9 -22, 5 -22, 1 -25 Z"/>`);
const oliveBowl = (x, y, s = 1) => bowl(x, y, s, [[-8, -10, "a"], [-3, -11, "b"], [2, -10, "a"], [7, -10, "b"], [-5, -14, "b"], [0, -15, "a"], [5, -14, "a"], [-1, -18, "b"]].map(([a, b, k]) => `<ellipse class="olive-fruit ${k}" cx="${a}" cy="${b}" rx="2.6" ry="2" transform="rotate(${a * 4} ${a} ${b})"/>`).join(""));
const flatbread = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="flatbread" cx="-2" cy="-2.6" rx="18" ry="3.6"/><ellipse class="flatbread top" cx="1" cy="-6" rx="16" ry="3.2"/>
  ${[[-8, -6.4], [-2, -5.2], [5, -6.6], [10, -5.6], [-5, -7.6], [3, -7.8]].map(([a, b]) => `<circle class="flatbread-dot" cx="${a}" cy="${b}" r=".7"/>`).join("")}
  <path class="flatbread top" d="M14 -2 C 20 -5, 26 -4, 26 -1 C 24 1, 18 1, 14 -2 Z"/></g>`;
const clayCup = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="clay-cup" d="M-7 -14 L 7 -14 C 7 -7, 4.5 -3, 2 -2.4 L 3.4 0 L -3.4 0 L -2 -2.4 C -4.5 -3, -7 -7, -7 -14 Z"/><ellipse class="wine" cx="0" cy="-13.6" rx="6.4" ry="1.5"/><path class="clay-line" d="M-6.6 -10.5 C -2 -9.6, 2 -9.6, 6.6 -10.5" stroke-width=".8" fill="none"/></g>`;
const pitcher = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="clay-handle" d="M6 -21 C 14 -21, 14 -10, 7 -8" stroke-width="2.4" fill="none"/><path class="clay-jar" d="M-4 -26 L 4 -26 L 3.5 -22 C 10 -18, 10 -4, 5 0 L -5 0 C -10 -4, -10 -18, -3.5 -22 Z"/><path class="clay-line" d="M-7.6 -14 C -3 -12.8, 3 -12.8, 7.6 -14" stroke-width=".8" fill="none"/></g>`;
const pomegranate = (x, y, r = 6) => `<g transform="translate(${x} ${y})"><circle class="pomegranate" cy="${-r}" r="${r}"/><path class="pomegranate" d="M-2.2 ${-2 * r + 1} L -2.6 ${-2 * r - 3} L -.8 ${-2 * r - 1.4} L 0 ${-2 * r - 3.4} L .8 ${-2 * r - 1.4} L 2.6 ${-2 * r - 3} L 2.2 ${-2 * r + 1} Z"/><circle class="pomegranate-shine" cx="${-r * .35}" cy="${-r * 1.3}" r="${r * .25}"/></g>`;
// A clay oil lamp. Its little flame flickers in Lively pictures.
const oilLamp = (x, y, s = 1) => { const gid = `cg${++uid}`; return `<g transform="translate(${x} ${y}) scale(${s})"><defs><radialGradient id="${gid}"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient></defs>
  <circle class="candle-glow" cx="11" cy="-14" r="20" fill="url(#${gid})"/><path class="clay-lamp" d="M-11 -1 C -13 -6, -6 -9, 1 -8.6 L 12 -7.4 C 14 -6.4, 13.4 -4, 10.6 -4 C 7 -3, 4 -1, -1 -.4 C -5 0, -9 0, -11 -1 Z"/><path class="clay-handle" d="M-11 -4 C -15 -5, -15 -1, -11 -1.6" stroke-width="1.6" fill="none"/><circle class="clay-hole" cx="-1" cy="-7.8" r="1.4"/>
  <path class="flame" style="animation-delay:-${(uid % 4) * .35}s" d="M12.4 -18 C 16 -13, 15.6 -9, 12.4 -6.8 C 9.2 -9, 8.8 -13, 12.4 -18 Z"/></g>`; };
const hangingLamp = (x, top, drop) => { const gid = `cg${++uid}`; return `<g transform="translate(${x} ${top})"><path class="lamp-chain" d="M0 0 L 0 ${drop - 7} M -10 ${drop - 3} L 0 ${drop - 7} L 10 ${drop - 3}" stroke-width="1" fill="none"/>
  <defs><radialGradient id="${gid}"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".7"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient></defs><circle class="candle-glow" cy="${drop - 6}" r="26" fill="url(#${gid})"/>
  <path class="clay-lamp" d="M-12 ${drop - 3} C -12 ${drop + 4}, 12 ${drop + 4}, 12 ${drop - 3} Z"/>
  <path class="flame" style="animation-delay:-${(uid % 4) * .35}s" d="M-9 ${drop - 11} C -6.6 ${drop - 7}, -7 ${drop - 4.4}, -9 ${drop - 3.2} C -11 ${drop - 4.4}, -11.4 ${drop - 7}, -9 ${drop - 11} Z"/>
  <path class="flame" style="animation-delay:-${((uid + 2) % 4) * .35}s" d="M9 ${drop - 11} C 11.4 ${drop - 7}, 11 ${drop - 4.4}, 9 ${drop - 3.2} C 7 ${drop - 4.4}, 6.6 ${drop - 7}, 9 ${drop - 11} Z"/></g>`; };
// A small, unglazed window in a thick wall, wooden shutters folded back; outside, the hills
// and olive trees (Matthew 26:30). Birds fly only in the opening (it is the picture's sky).
const openWindow = (c, y0, y1, sky, flip = false) => { const id = `ow${++uid}`, w = 17, open = `M${c - w} ${y1} L ${c - w} ${y0 + 14} C ${c - w} ${y0 - 4}, ${c + w} ${y0 - 4}, ${c + w} ${y0 + 14} L ${c + w} ${y1} Z`;
  return `<clipPath id="${id}"><path d="${open}"/></clipPath>
  ${[-1, 1].map((d) => `<g class="shutter"><path d="M${c + d * (w + 3)} ${y0 + 8} L ${c + d * (w + 15)} ${y0 + 12} L ${c + d * (w + 15)} ${y1 - 2} L ${c + d * (w + 3)} ${y1} Z"/><path class="shutter-line" d="M${c + d * (w + 7)} ${y0 + 9} L ${c + d * (w + 7)} ${y1 - .6} M ${c + d * (w + 11)} ${y0 + 10.4} L ${c + d * (w + 11)} ${y1 - 1.3}" stroke-width=".8"/></g>`).join("")}
  <g class="scene-sky" clip-path="url(#${id})"><rect x="${c - w}" y="${y0 - 6}" width="${2 * w}" height="${y1 - y0 + 6}" fill="url(#${sky})"/>
    <path class="field far" d="M${c - w} ${y1 - 14} C ${c - 6} ${y1 - 24}, ${c + 6} ${y1 - 22}, ${c + w} ${y1 - 16} L ${c + w} ${y1} L ${c - w} ${y1} Z"/>
    ${[[flip ? 8 : -8, y1 - 19, 4.4], [flip ? -2 : 2, y1 - 21, 3.6], [flip ? -10 : 10, y1 - 15, 4]].map(([dx, yy, r]) => `<g class="olive-far"><rect x="${c + dx - .6}" y="${yy}" width="1.2" height="5"/><circle cx="${c + dx}" cy="${yy - 1}" r="${r}"/></g>`).join("")}
    ${across([[c - 8, y0 + 12, .45, 9, flip ? 4 : 0], [c + 4, y0 + 8, .36, 9, flip ? 4.4 : .4]], bird, c + w + 30)}
    <path class="field" d="M${c - w} ${y1 - 7} C ${c - 4} ${y1 - 11}, ${c + 6} ${y1 - 10}, ${c + w} ${y1 - 6} L ${c + w} ${y1} L ${c - w} ${y1} Z"/></g>
  <path class="window-reveal" d="${open}" fill="none" stroke-width="3.4"/><rect class="window-sill" x="${c - w - 4}" y="${y1}" width="${2 * w + 8}" height="4" rx="1.2"/>`; };
// Bigger nativity pieces for Christmas
const sheep = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="wool">${[[-6, -8], [0, -10], [6, -8], [-3, -5], [4, -5]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="5"/>`).join("")}</g>
  <ellipse class="sheep-head" cx="11" cy="-10" rx="3.6" ry="2.8"/><path class="sheep-legs" d="M-5 -2 L -5 2 M 4 -2 L 4 2" stroke-width="1.6"/></g>`;
const nativityBig = (x, y, s = 1) => { const gid = `ng${++uid}`; return `<g transform="translate(${x} ${y}) scale(${s})">
  <defs><radialGradient id="${gid}" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#ffe6a6"/><stop offset=".6" stop-color="#e3b25e"/><stop offset="1" stop-color="#8a5a2e"/></radialGradient></defs>
  <path d="M-50 -58 L 0 -82 L 50 -58 L 50 0 L -50 0 Z" fill="url(#${gid})"/>
  <path class="stable-wall" d="M-56 -60 L -49 -60 L -49 0 L -56 0 Z M 49 -60 L 56 -60 L 56 0 L 49 0 Z"/>
  <path class="stable-roof" d="M-66 -58 L 0 -94 L 66 -58 L 60 -54 L 0 -86 L -60 -54 Z"/>
  <path class="hay" d="M-50 0 C -30 -5, 30 -5, 50 0 Z"/>
  <g class="nat-mary"><path class="mary-robe" d="M-38 0 C -40 -12, -34 -26, -25 -28 C -18 -26, -15 -14, -13 0 Z"/><path class="mary-veil" d="M-31 -27 C -33 -40, -17 -42, -17 -30 C -18 -24, -21 -20, -25 -21 C -29 -22, -31 -24, -31 -27 Z"/><circle class="skin-soft" cx="-24" cy="-31" r="3.8"/></g>
  <g class="nat-joseph"><path class="joseph-robe" d="M18 0 C 17 -22, 21 -40, 28 -42 C 35 -40, 39 -22, 38 0 Z"/><path class="joseph-cloth" d="M22 -44 C 22 -54, 34 -54, 34 -44 L 35 -38 L 21 -38 Z"/><circle class="skin-soft" cx="28" cy="-46" r="4"/>
    <path class="staff-dark" d="M43 0 L 41 -56 C 41 -61, 47 -61, 47 -56" stroke-width="2" fill="none"/></g>
  <g class="nat-manger"><circle class="halo" cx="-2" cy="-17" r="7"/><path class="manger" d="M-14 -12 L 14 -12 L 10 0 L -10 0 Z"/><path class="hay" d="M-13 -12 C -6 -16, 6 -16, 13 -12 Z"/>
    <ellipse class="baby" cx="2" cy="-15" rx="8" ry="3.6"/><circle class="skin-soft" cx="-5" cy="-16" r="3"/></g></g>`; };
const ox = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="ox" cx="0" cy="-9" rx="17" ry="9"/><ellipse class="ox" cx="-17" cy="-14" rx="7" ry="5.5"/><path class="horn" d="M-20 -19 C -23 -23, -26 -23, -27 -21 M -14 -19 C -12 -23, -9 -23, -8 -21" stroke-width="1.6" fill="none"/></g>`;
const donkey2 = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="donkey" cx="0" cy="-20" rx="15" ry="8"/><path class="donkey-legs" d="M-10 -14 L -10 0 M -5 -14 L -5 0 M 6 -14 L 6 0 M 11 -14 L 11 0" stroke-width="2.6"/>
  <path class="donkey" d="M-12 -24 C -16 -30, -18 -34, -20 -36 L -14 -38 C -11 -34, -8 -30, -6 -26 Z"/><ellipse class="donkey" cx="-21" cy="-35" rx="7" ry="4" transform="rotate(25 -21 -35)"/><path class="donkey" d="M-17 -40 L -15 -50 L -13 -40 Z M -21 -40 L -21 -49 L -18 -40 Z"/></g>`;
const kneelShepherd = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="shep-robe" d="M-10 0 C -12 -10, -6 -22, 2 -24 C 8 -22, 10 -12, 10 0 Z"/><path class="shep-cloth" d="M-4 -26 C -4 -35, 8 -35, 8 -26 L 9 -21 L -5 -21 Z"/><circle class="skin-soft" cx="2" cy="-28" r="3.6"/>
  <path class="staff-dark" d="M-14 0 L -13 -40 C -13 -45, -7 -45, -7 -40" stroke-width="1.8" fill="none"/></g>`;
const garland = (W) => `<path class="garland" d="M-4 4 Q 45 26, 90 6 Q 135 26, 180 6 Q 225 26, 270 6 Q 315 26, 364 4" fill="none" stroke-width="7" stroke-linecap="round"/>
  <path class="garland-hi" d="M-4 4 Q 45 26, 90 6 Q 135 26, 180 6 Q 225 26, 270 6 Q 315 26, 364 4" fill="none" stroke-width="3" stroke-dasharray="2 4"/>
  ${[90, 180, 270].map((x) => `<g transform="translate(${x} 7)"><path class="bow" d="M0 0 C -8 -6, -12 2, -2 2 Z M 0 0 C 8 -6, 12 2, 2 2 Z M -1 1 L -5 10 M 1 1 L 5 10" stroke-width="1.6"/><circle class="bow" r="2"/></g>`).join("")}
  ${[30, 60, 120, 150, 210, 240, 300, 330].map((x, i) => `<circle class="holly-berry" cx="${x}" cy="${14 + (i % 2) * 2}" r="2.2"/>`).join("")}`;

const SCENE_LABELS = {
  sage: "A spring garden with olive trees, doves and three crosses on a hill",
  nativity: "Wise men crossing the desert toward the star over Bethlehem",
  easter: "The empty tomb at sunrise, with lilies",
  fall: "The Lord's Supper in the upper room: bread and cup by lamplight",
  christmas: "The nativity in Bethlehem under the star",
};
export function themeScene(theme, { height = 170 } = {}) {
  const W = 360, H = height, id = ++uid, g = H - 30;
  const grad = (stops) => `<linearGradient id="tg${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;
  let defs = "", art = "";
  if (theme === "sage") {
    defs = grad([[0, "#dcebe0"], [.7, "#f4f6ea"], [1, "#fbf8ef"]]);
    art = `<circle class="spring-sun" cx="290" cy="34" r="16"/>
      <path class="th-hill far" d="M0 ${g - 14} C 70 ${g - 30}, 130 ${g - 34}, 180 ${g - 50} C 230 ${g - 34}, 300 ${g - 28}, 360 ${g - 16} L 360 ${H} L 0 ${H} Z"/>
      ${cross(160, g - 42, 26)}${cross(200, g - 42, 26)}${cross(180, g - 48, 40)}
      <path class="th-hill" d="M0 ${g + 4} C 80 ${g - 10}, 150 ${g - 6}, 200 ${g - 4} C 260 ${g - 12}, 320 ${g - 6}, 360 ${g} L 360 ${H} L 0 ${H} Z"/>
      ${breeze(olive2(44, g + 2, 1.15), 1)}${breeze(blossomTree(96, g - 2, .9), 2)}${breeze(blossomTree(274, g, .95), 3.5)}${breeze(olive2(322, g + 4, 1.05), 4.5)}
      ${drift([[92, g - 36, 9, 0], [104, g - 40, 11, 4], [270, g - 34, 10, 2], [282, g - 38, 12, 7], [266, g - 30, 9, 5]], "m-petal")}
      <path class="stream" d="M120 ${H} C 140 ${H - 10}, 200 ${H - 6}, 230 ${H - 16} S 300 ${H - 20}, 340 ${H - 18}" fill="none" stroke-width="5" stroke-linecap="round"/>
      ${[[24, H - 8, "a"], [70, H - 6, "b"], [150, H - 22, "a"], [176, H - 18, "c"], [252, H - 26, "b"], [300, H - 10, "a"], [346, H - 6, "c"], [206, H - 30, "b"]].map(([a, b, c]) => bloom(a, b, c)).join("")}
      ${doves([[214, 44, .8, 46, 18], [150, 60, .62, 52, 2]], W)}`;
  } else if (theme === "christmas") {
    defs = grad([[0, "#0e1a2c"], [.55, "#1b3340"], [1, "#2c4a3a"]]);
    art = `${sky(22)}
      <path class="star-beam" d="M180 30 L 160 ${g - 80} L 200 ${g - 80} Z"/>
      ${star(180, 28, 10)}
      <path class="xmas-hill far" d="M0 ${g - 20} C 60 ${g - 36}, 120 ${g - 28}, 180 ${g - 24} C 240 ${g - 30}, 300 ${g - 36}, 360 ${g - 18} L 360 ${H} L 0 ${H} Z"/>
      <path class="xmas-hill" d="M0 ${g + 2} C 80 ${g - 8}, 280 ${g - 8}, 360 ${g + 2} L 360 ${H} L 0 ${H} Z"/>
      ${nativityBig(180, g + 6, 1.05)}
      ${ox(110, g + 6, 1)}${donkey2(258, g + 6, 1)}${breeze(sheep(78, g + 8, 1.1), 0, "m-graze")}${breeze(sheep(296, g + 10, 1, true), 1.4, "m-graze")}${breeze(sheep(318, g + 6, .85, true), 2.6, "m-graze")}
      ${kneelShepherd(46, g + 8, 1.1)}
      ${holly(10, H - 6, 1.6)}${holly(W - 10, H - 6, 1.6, true)}
      ${breeze(garland(W), 0, "m-garland")}`;
  } else if (theme === "nativity") {
    defs = grad([[0, "#16213b"], [.45, "#2d3f66"], [.8, "#d8a94e"], [1, "#f4dd9c"]]);
    art = `${sky(22)}
      <path class="star-beam" d="M262 36 L 250 ${g - 40} L 286 ${g - 40} Z"/>
      ${star(262, 34, 8)}
      <path class="dune far" d="M0 ${g - 14} C 60 ${g - 30}, 120 ${g - 22}, 190 ${g - 18} C 250 ${g - 28}, 310 ${g - 22}, 360 ${g - 16} L 360 ${H} L 0 ${H} Z"/>
      <path class="dune" d="M0 ${g + 2} C 70 ${g - 14}, 150 ${g - 6}, 210 ${g - 2} C 270 ${g - 10}, 320 ${g - 6}, 360 ${g} L 360 ${H} L 0 ${H} Z"/>
      ${breeze(camel(70, g - 6, .62), 0, "m-plod")}${breeze(camel(104, g - 8, .58), .6, "m-plod")}${breeze(camel(136, g - 9, .54), 1.2, "m-plod")}${stable(282, g + 2, .95)}${breeze(palm2(330, g + 6, .9), 1)}
      <path class="ground" d="M0 ${g + 10} C 100 ${g + 2}, 260 ${g + 4}, 360 ${g + 8} L 360 ${H} L 0 ${H} Z"/>
      ${breeze(palm2(26, g + 12, 1.05), 3)}`;
  } else if (theme === "easter") {
    defs = grad([[0, "#d9d3ea"], [.55, "#f5d9c4"], [1, "#fbefc9"]]);
    art = `<circle class="sunrise m-glow" cx="250" cy="${g - 22}" r="26"/>
      <g class="easter-birds">${birds([[150, 30, .8, 38, 10], [172, 22, .65, 38, 10.5], [40, 46, .7, 44, 30]], W)}</g>
      <path class="th-hill far" d="M0 ${g - 10} C 50 ${g - 34}, 100 ${g - 30}, 130 ${g - 18} C 200 ${g - 26}, 300 ${g - 22}, 360 ${g - 12} L 360 ${H} L 0 ${H} Z"/>
      <g class="far-crosses">${cross(62, g - 26, 26)}${cross(80, g - 30, 32)}${cross(98, g - 26, 26)}</g>
      <path class="tomb-rock" d="M196 ${g + 6} C 200 ${g - 40}, 260 ${g - 52}, 330 ${g - 30} C 352 ${g - 20}, 360 ${g - 6}, 360 ${g + 6} Z"/>
      <path class="tomb-door" d="M262 ${g + 4} L 262 ${g - 14} C 262 ${g - 26}, 284 ${g - 26}, 284 ${g - 14} L 284 ${g + 4} Z"/>
      <circle class="tomb-stone" cx="236" cy="${g - 10}" r="15"/>
      <path class="th-hill" d="M0 ${g + 10} C 100 ${g}, 220 ${g + 2}, 360 ${g + 8} L 360 ${H} L 0 ${H} Z"/>
      ${breeze(lily(28, H - 6, 1), 0)}${breeze(lily(44, H - 4, .85), 1.5)}${breeze(lily(160, H - 4, .9), 3)}${breeze(lily(330, H - 4, .95), .8)}${breeze(lily(346, H - 6, .8), 2.2)}`;
  } else if (theme === "fall") {
    const wid = `fw${id}`;
    defs = grad([[0, "#efe0c4"], [1, "#e2cca4"]]) + `<linearGradient id="${wid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d58e"/><stop offset=".7" stop-color="#e29a55"/><stop offset="1" stop-color="#b5652e"/></linearGradient>`;
    const top = H - 52;
    const stones = [];
    for (let row = 0, y = 22; y < top - 4; row++, y += 16) {
      stones.push(`M0 ${y} H 360`);
      for (let x = (row % 2) * 24 + 12; x < 360; x += 48) stones.push(`M${x} ${y} V ${Math.min(y + 16, top)}`);
    }
    art = `<path class="wall-stone" d="${stones.join(" ")}" fill="none" stroke-width=".8"/>
      <rect class="beam" x="0" y="0" width="360" height="10"/>${[40, 120, 240, 320].map((x) => `<rect class="beam-end" x="${x - 5}" y="9" width="10" height="5" rx="1"/>`).join("")}
      ${openWindow(96, 28, top - 26, wid)}${openWindow(264, 28, top - 26, wid, true)}
      ${hangingLamp(180, 10, 36)}
      <rect class="table-top" x="0" y="${top}" width="360" height="10"/>
      <path class="cloth" d="M0 ${top + 8} H 360 V ${H} H 0 Z"/>
      <path class="runner" d="M150 ${top + 8} H 210 V ${H - 8} L 180 ${H - 2} L 150 ${H - 8} Z"/>
      <path class="cloth-fold" d="M60 ${top + 12} L 56 ${H} M 120 ${top + 12} L 118 ${H} M 240 ${top + 12} L 242 ${H} M 300 ${top + 12} L 304 ${H}" stroke-width="1" fill="none"/>
      ${breeze(wheat(17, top - 19, .95), 0)}${pitcher(16, top + 4, 1)}${oliveBowl(50, top + 4, 1)}${oilLamp(80, top + 4, 1)}${clayCup(112, top + 4, .95)}${flatbread(140, top + 4, 1.05)}${clayCup(186, top + 4, 1.45)}
      ${grapeBowl(230, top + 4, 1)}${clayCup(260, top + 4, .95)}${oilLamp(284, top + 4, 1)}${pomegranate(310, top + 4, 5)}${pomegranate(322, top + 4, 6)}${breeze(wheat(345, top - 19, .95), 3)}${pitcher(344, top + 4, 1)}
      ${drift([[22, top - 44, 10, 0], [340, top - 42, 12, 5]], "fall-leaf b")}`;
  }
  return `<svg class="scene theme-scene theme-${theme}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid slice" aria-label="${SCENE_LABELS[theme] || ""}">
    <defs>${defs}</defs><rect width="${W}" height="${H}" fill="url(#tg${id})"/>${art}<path class="cl-rule" d="M0 ${H - .5} H ${W}"/></svg>`;
}
export function themeStrip(theme) {
  const id = ++uid;
  const inner = theme === "sage" ? `${blossomTree(110, 52, .5)}${cross(160, 46, 24)}${cross(200, 46, 24)}${cross(180, 46, 34)}${dove(212, 16, .5)}${olive2(250, 52, .6)}`
    : theme === "nativity" ? `${sky(10)}${star(180, 22, 6)}${camel(112, 50, .42)}${camel(136, 50, .4)}${stable(240, 52, .55, false)}`
    : theme === "christmas" ? `${sky(10)}${star(180, 14, 5)}${holly(96, 44, .9)}${holly(264, 44, .9, true)}${sheep(136, 52, .6)}${nativityBig(180, 54, .42)}${sheep(222, 52, .6, true)}`
    : theme === "easter" ? `${lily(120, 52, .8)}${lily(134, 52, .7)}${cross(180, 48, 34)}${lily(226, 52, .7)}${lily(240, 52, .8)}`
    : `${wheat(112, 50, .7)}${flatbread(156, 46, .7)}${clayCup(198, 47, .8)}${grapeBowl(228, 48, .6)}${wheat(252, 50, .7)}`;
  const dark = theme === "nativity" || theme === "christmas";
  return `<svg class="fish-strip passage-art theme-strip theme-${theme}" viewBox="0 0 360 54" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><clipPath id="ts${id}"><rect width="360" height="54" rx="14"/></clipPath></defs>
    <g clip-path="url(#ts${id})"><rect width="360" height="54" class="${dark ? "band-dark" : "cl-band"}"/>${inner}</g></svg>`;
}

/* ---------- For kids: a picture of the story you're reading ---------- */
// Bright, friendly scenes for well-known stories. Chapters without one get the usual setting strip.
const kid = (x, y, s = 1, robe = "#5b8fb9", cloth = "#f1c84b", skin = "#e8b98f") => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-8 0 C -9 -12, -6 -20, 0 -21 C 6 -20, 9 -12, 8 0 Z" fill="${robe}"/><circle cx="0" cy="-26" r="6" fill="${skin}"/>
  <path d="M-6.5 -27 C -7 -35, 7 -35, 6.5 -27 L 7.5 -22 L 4.5 -25 C 2 -29, -2 -29, -4.5 -25 L -7.5 -22 Z" fill="${cloth}"/>
  ${eyes([[-2.2, -25.6], [2.2, -25.6]], .9)}<path d="M-2 -22.6 Q 0 -21, 2 -22.6" stroke="#6b3d2a" stroke-width=".8" fill="none"/></g>`;
const sun = (x, y, r = 10) => `<g transform="translate(${x} ${y})"><g class="sway">${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${-r - 3} L 0 ${-r - 8}" stroke="#f5c542" stroke-width="2" stroke-linecap="round" transform="rotate(${i * 36})"/>`).join("")}</g><circle r="${r}" fill="#f7d35c"/></g>`;
const waves = (y, c = "#4f9fc8", c2 = "#7fc3e0") => `<path d="M0 ${y} ${Array.from({ length: 13 }, () => "q 7 -5 14 0 t 14 0").join(" ")} L 360 90 L 0 90 Z" fill="${c}"/><g class="wave-move"><path d="M-30 ${y + 8} ${Array.from({ length: 15 }, () => "q 7 -4 14 0 t 14 0").join(" ")}" stroke="${c2}" stroke-width="2" fill="none"/></g>`;
const skyG = (id, a, b) => `<defs><linearGradient id="kg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><clipPath id="kc${id}"><rect width="360" height="90" rx="16"/></clipPath></defs>`;
const bob = (inner, x = 0, y = 0) => `<g transform="translate(${x} ${y})"><g class="bob">${inner}</g></g>`;

const STORY_ART = {
  creation: ["God made everything, and it was good", () => `${sun(60, 26, 11)}<circle cx="300" cy="20" r="8" fill="#fdf3c4"/><circle cx="304" cy="17" r="7" fill="#9cc9e6"/>
    ${[[250, 12], [270, 30], [330, 34], [345, 12], [225, 26]].map(([a, b]) => `<path d="M${a} ${b - 3} L ${a + 1} ${b} L ${a + 4} ${b} L ${a + 1.5} ${b + 2} L ${a + 2.5} ${b + 5} L ${a} ${b + 3} L ${a - 2.5} ${b + 5} L ${a - 1.5} ${b + 2} L ${a - 4} ${b} L ${a - 1} ${b} Z" fill="#fff6c8"/>`).join("")}
    <path d="M0 64 C 80 50, 160 58, 220 62 C 280 54, 330 58, 360 62 L 360 90 L 0 90 Z" fill="#8cc56a"/><ellipse cx="170" cy="78" rx="34" ry="7" fill="#5fb0d8"/>
    ${bob(`<path d="M-6 0 C -2 -4, 4 -4, 6 0 C 4 4, -2 4, -6 0 Z M 6 0 L 10 -3 L 10 3 Z" fill="#f08a4b"/>`, 165, 78)}
    ${oliveTree(70, 72, .5)}${oliveTree(290, 70, .45)}${lamb(230, 70, .32)}
    ${bob(`<path d="M0 0 q 5 -5 10 0 q 5 -5 10 0" stroke="#4a5a6a" stroke-width="1.6" fill="none"/>`, 120, 22)}${bob(`<path d="M0 0 q 4 -4 8 0 q 4 -4 8 0" stroke="#4a5a6a" stroke-width="1.4" fill="none"/>`, 150, 34)}`, ["#9cc9e6", "#e8f4fb"]],
  ark: ["Noah's ark", () => `${sun(320, 18, 8)}${waves(62)}
    ${bob(`<path d="M-60 0 L 60 0 L 48 18 L -48 18 Z" fill="#9a6a3f"/><path d="M-60 0 L 60 0" stroke="#6e4826" stroke-width="2"/><rect x="-34" y="-20" width="68" height="20" fill="#c08a55"/><path d="M-40 -20 L 0 -34 L 40 -20 Z" fill="#7a4f2e"/>
      <rect x="-24" y="-14" width="10" height="9" rx="2" fill="#4b3320"/><rect x="14" y="-14" width="10" height="9" rx="2" fill="#4b3320"/>
      <path d="M-2 -20 L -2 -44 M -6 -40 C -4 -46, 0 -46, 2 -40" stroke="#e3b46b" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="1" cy="-47" r="3.4" fill="#e3b46b"/>
      <circle cx="-19" cy="-9" r="3" fill="#9aa0a8"/><path d="M-22 -10 C -28 -6, -28 0, -26 2" stroke="#9aa0a8" stroke-width="2" fill="none"/>`, 180, 50)}
    ${bob(`<path d="M0 0 C 6 -3, 14 -2, 18 2 C 22 0, 26 0, 28 2 C 25 3, 23 5, 20 6 C 14 9, 5 8, 0 0 Z" fill="#fff"/><path d="M8 1 C 10 -9, 18 -15, 26 -14 C 21 -10, 17 -5, 15 2 Z" fill="#fff"/><path d="M28 2 L 34 0" stroke="#6f9a4e" stroke-width="2"/>`, 70, 22)}`, ["#bfe3f5", "#e8f6fb"]],
  rainbow: ["God's promise: the rainbow", () => `${["#e85d5d", "#f39c4a", "#f5d04a", "#6cc26a", "#4f9fc8", "#7f6cc8"].map((c, i) => `<path d="M60 90 A 120 ${78 - i * 6} 0 0 1 300 90" stroke="${c}" stroke-width="6" fill="none" transform="translate(0 ${i * 6})"/>`).join("")}
    <path d="M0 76 C 90 66, 270 66, 360 76 L 360 90 L 0 90 Z" fill="#8cc56a"/>${kid(150, 84, .9, "#7a5a3a", "#e9e2d0")}${kid(176, 84, .8, "#a65a6a", "#f1c84b")}${lamb(220, 80, .3)}`, ["#cfeefc", "#f2fbff"]],
  basket: ["Baby Moses in a basket on the river", () => `${sun(316, 18, 8)}<path d="M0 50 C 100 44, 260 44, 360 50 L 360 90 L 0 90 Z" fill="#5fb0d8"/>
    ${[[30, 50], [44, 52], [300, 50], [316, 52], [330, 49]].map(([a, b]) => `<g class="sway" style="transform-origin:${a}px ${b + 30}px"><path d="M${a} ${b + 30} L ${a} ${b - 14}" stroke="#5e8a3a" stroke-width="2.4"/><ellipse cx="${a}" cy="${b - 16}" rx="2.4" ry="6" fill="#8a6a3a"/></g>`).join("")}
    ${bob(`<ellipse cx="0" cy="0" rx="26" ry="8" fill="#c99a52"/><path d="M-22 -2 L 22 -2" stroke="#a5793a" stroke-width="1.4"/><ellipse cx="0" cy="-5" rx="16" ry="5" fill="#f4ecd8"/><circle cx="-8" cy="-7" r="4" fill="#e8b98f"/>`, 180, 64)}`, ["#bfe3f5", "#eef8fb"]],
  bush: ["The burning bush", () => `<path d="M0 64 C 80 56, 280 56, 360 64 L 360 90 L 0 90 Z" fill="#d9b77a"/><path d="M220 64 L 260 20 L 300 64 Z" fill="#b08a5a"/>
    <g transform="translate(150 70)"><ellipse cx="0" cy="-8" rx="22" ry="12" fill="#6f8a3a"/><g class="sway">${[[-12, -16], [0, -24], [12, -16], [-4, -14], [6, -12]].map(([a, b]) => `<path d="M${a} ${b} C ${a - 6} ${b - 8}, ${a} ${b - 18}, ${a + 2} ${b - 22} C ${a + 4} ${b - 14}, ${a + 8} ${b - 8}, ${a} ${b} Z" fill="#f39c4a"/><path d="M${a} ${b} C ${a - 3} ${b - 5}, ${a} ${b - 11}, ${a + 1} ${b - 13} C ${a + 2} ${b - 8}, ${a + 4} ${b - 5}, ${a} ${b} Z" fill="#f7d35c"/>`).join("")}</g></g>
    ${kid(90, 84, 1, "#8a6a48", "#c9b48a")}`, ["#f6e2b8", "#fbf2dd"]],
  sea: ["Crossing the Red Sea on dry ground", () => `<path d="M0 10 C 30 6, 70 14, 120 10 L 130 90 L 0 90 Z" fill="#3f8ab8"/><path d="M360 10 C 330 6, 290 14, 240 10 L 230 90 L 360 90 Z" fill="#3f8ab8"/>
    <path d="M118 14 C 124 40, 128 66, 132 90 M 242 14 C 236 40, 232 66, 228 90" stroke="#9fd3ec" stroke-width="3" fill="none"/>
    <path d="M130 90 L 150 30 L 210 30 L 230 90 Z" fill="#e3c88f"/>
    ${kid(170, 82, .8, "#a65a6a", "#f1c84b")}${kid(192, 76, .7, "#5b8fb9", "#e9e2d0")}${kid(160, 66, .55, "#7a5a3a", "#c9b48a")}${kid(204, 58, .45, "#6aa06a", "#f1c84b")}
    <g class="sway" style="transform-origin:300px 60px"><path d="M296 60 C 292 40, 300 24, 296 6 C 304 14, 310 30, 304 60 Z" fill="#f39c4a" opacity=".9"/></g>`, ["#f2dca6", "#fbefd2"]],
  tablets: ["The Ten Commandments", () => `<path d="M60 90 L 180 14 L 300 90 Z" fill="#a08566"/><path d="M180 14 L 150 34 L 168 32 L 180 40 L 196 30 L 210 34 Z" fill="#efe7da"/>
    <g transform="translate(180 72)"><path d="M-30 0 L -30 -26 C -30 -36, -4 -36, -4 -26 L -4 0 Z M 4 0 L 4 -26 C 4 -36, 30 -36, 30 -26 L 30 0 Z" fill="#d9d2c4" stroke="#9a9184"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M-25 ${-24 + i * 5} L -9 ${-24 + i * 5} M 9 ${-24 + i * 5} L 25 ${-24 + i * 5}" stroke="#8a8174" stroke-width="1.2"/>`).join("")}</g>
    ${[[100, 22], [130, 12], [240, 14], [270, 26]].map(([a, b]) => bob(`<path d="M0 0 L 4 -6 L 8 0 L 4 6 Z" fill="#f7d35c"/>`, a, b)).join("")}`, ["#c9d8ea", "#eef3f9"]],
  walls: ["The walls of Jericho", () => `<path d="M0 76 L 360 76 L 360 90 L 0 90 Z" fill="#d9b77a"/>
    <path d="M200 76 L 200 40 L 214 40 L 214 34 L 226 34 L 226 40 L 240 40 L 240 34 L 252 34 L 252 40 L 270 40 L 270 76 Z" fill="#c4a073"/><path d="M276 76 L 290 52 L 306 60 L 330 50 L 350 76 Z" fill="#b08a5a"/>
    ${[[296, 44], [318, 40], [338, 46]].map(([a, b]) => bob(`<rect x="-4" y="-4" width="8" height="6" fill="#c4a073"/>`, a, b)).join("")}
    ${kid(60, 84, .9, "#5b8fb9", "#e9e2d0")}${kid(96, 84, .9, "#a65a6a", "#f1c84b")}${kid(132, 84, .9, "#6aa06a", "#e9e2d0")}
    ${[60, 96, 132].map((a) => `<path d="M${a + 4} 60 L ${a + 20} 52 L ${a + 22} 56 L ${a + 6} 63 Z" fill="#e3b46b"/>`).join("")}`, ["#f6e2b8", "#fbf2dd"]],
  giant: ["David and Goliath", () => `<path d="M0 74 C 90 66, 270 66, 360 74 L 360 90 L 0 90 Z" fill="#8cc56a"/>
    <g transform="translate(260 84) scale(2.3)"><path d="M-8 0 C -9 -12, -6 -20, 0 -21 C 6 -20, 9 -12, 8 0 Z" fill="#8a8f96"/><circle cx="0" cy="-26" r="6" fill="#d9a77a"/><path d="M-6.5 -28 C -6 -36, 6 -36, 6.5 -28 Z" fill="#9aa0a8"/>${eyes([[-2.2, -25.6], [2.2, -25.6]], .8)}<path d="M10 0 L 10 -30" stroke="#7a5a3a" stroke-width="1.6"/></g>
    ${kid(90, 84, 1, "#c9a35a", "#a65a6a")}
    <g class="sway" style="transform-origin:96px 56px"><path d="M96 58 C 110 40, 122 40, 120 52" stroke="#7a5a3a" stroke-width="1.4" fill="none"/><circle cx="120" cy="52" r="2.6" fill="#7a7a7a"/></g>`, ["#cfeefc", "#f2fbff"]],
  lions: ["Daniel in the lions' den", () => `<rect width="360" height="90" fill="#7a6250"/><path d="M0 0 H 360 V 20 C 300 30, 60 30, 0 20 Z" fill="#5a4636"/>
    <path d="M150 0 L 210 0 L 230 90 L 130 90 Z" fill="#f7e6a8" opacity=".35"/>
    ${kid(180, 84, 1.05, "#5b8fb9", "#e9e2d0")}
    ${[[100, 82, 1], [262, 82, -1]].map(([a, b, f]) => `<g transform="translate(${a} ${b}) scale(${f} 1)"><ellipse cx="0" cy="-8" rx="20" ry="8" fill="#e3a44a"/><circle cx="18" cy="-14" r="10" fill="#b5652e"/><circle cx="18" cy="-14" r="6.5" fill="#e3a44a"/><path d="M14 -15 q 2 2 4 0 M 19 -15 q 2 2 4 0" stroke="#5a3a20" stroke-width=".9" fill="none"/></g>`).join("")}
    ${bob(`<text x="0" y="0" font-size="9" fill="#fff6c8">z z</text>`, 124, 56)}`, ["#7a6250", "#7a6250"]],
  furnace: ["Three friends safe in the fire", () => `<rect width="360" height="90" fill="#3f2e2a"/><path d="M90 90 L 90 30 C 90 12, 270 12, 270 30 L 270 90 Z" fill="#c4502e"/>
    <g class="sway" style="transform-origin:180px 90px">${[110, 150, 190, 230, 250].map((a) => `<path d="M${a} 90 C ${a - 12} 60, ${a} 40, ${a + 4} 26 C ${a + 10} 44, ${a + 18} 60, ${a + 8} 90 Z" fill="#f39c4a" opacity=".85"/>`).join("")}</g>
    ${kid(138, 86, .8, "#5b8fb9", "#f1c84b")}${kid(166, 86, .8, "#6aa06a", "#f1c84b")}${kid(194, 86, .8, "#a65a6a", "#f1c84b")}<g opacity=".85">${kid(222, 86, .82, "#fffdf0", "#fff6c8")}</g>`, ["#3f2e2a", "#3f2e2a"]],
  jonah: ["Jonah and the big fish", () => `${waves(40, "#3f8ab8", "#7fc3e0")}
    ${bob(`<path d="M-70 0 C -60 -26, 30 -30, 60 -6 L 84 -20 L 80 4 L 86 22 L 60 8 C 30 30, -60 26, -70 0 Z" fill="#5b6f8a"/><path d="M-70 2 C -40 14, 20 16, 58 8" stroke="#8fa3bf" stroke-width="2" fill="none"/><circle cx="-46" cy="-8" r="3.4" fill="#fff"/><circle cx="-45" cy="-8" r="1.8" fill="#222"/>
      <path d="M-30 -26 C -30 -36, -26 -40, -22 -44 M -30 -26 C -34 -36, -38 -38, -42 -40" stroke="#bfe3f5" stroke-width="2" fill="none"/>`, 170, 62)}
    ${bob(`<path d="M-18 0 L 18 0 L 12 8 L -12 8 Z" fill="#9a6a3f"/><path d="M0 0 L 0 -22 L 14 -4 Z" fill="#fff"/>`, 300, 34)}`, ["#9cc9e6", "#d8eef8"]],
  manger: ["Jesus is born in Bethlehem", () => `${star(180, 16, 6)}<path d="M0 76 C 90 70, 270 70, 360 76 L 360 90 L 0 90 Z" fill="#6f8a5e"/>
    <path d="M130 80 L 130 44 L 180 26 L 230 44 L 230 80 Z" fill="#c08a55"/><path d="M122 46 L 180 20 L 238 46 L 232 48 L 180 26 L 128 48 Z" fill="#7a4f2e"/>
    <path d="M170 80 L 190 80 L 188 72 L 172 72 Z" fill="#7a4f2e"/><ellipse cx="180" cy="70" rx="10" ry="4" fill="#fffaf0"/><circle cx="173" cy="69" r="3" fill="#e8b98f"/><circle cx="173" cy="69" r="6" fill="#ffe6a6" opacity=".5"/>
    ${kid(152, 82, .9, "#5b8fb9", "#5b8fb9")}${kid(208, 82, .95, "#8a6a48", "#c9b48a")}${lamb(96, 78, .32)}${lamb(262, 80, .3)}`, ["#1d2b4a", "#4a5f86"]],
  storm: ["Jesus calms the storm", () => `${waves(54, "#3a6f96", "#8fc0dc")}
    ${bob(`<path d="M-44 0 L 44 0 L 34 14 L -34 14 Z" fill="#9a6a3f"/><path d="M0 0 L 0 -40" stroke="#6e4826" stroke-width="2"/><path d="M2 -38 L 30 -6 L 2 -6 Z" fill="#f4ecd8"/>
      ${kid(-22, 0, .7, "#fffdf0", "#c9b48a")}${kid(-6, 0, .62, "#5b8fb9", "#f1c84b")}${kid(20, 0, .62, "#a65a6a", "#e9e2d0")}`, 180, 56)}
    <g class="sway" style="transform-origin:300px 20px"><path d="M280 20 C 290 10, 310 10, 320 20 C 330 18, 340 26, 332 32 L 282 32 C 274 30, 274 22, 280 20 Z" fill="#9aa8b8"/></g>`, ["#7d93ab", "#c6d3e0"]],
  water: ["Jesus walks on the water", () => `${waves(56, "#3a6f96", "#8fc0dc")}
    ${bob(`<path d="M-40 0 L 40 0 L 30 12 L -30 12 Z" fill="#9a6a3f"/><path d="M0 0 L 0 -34" stroke="#6e4826" stroke-width="2"/>${kid(-14, 0, .58, "#5b8fb9", "#f1c84b")}${kid(14, 0, .58, "#a65a6a", "#e9e2d0")}`, 110, 58)}
    <circle cx="250" cy="34" r="16" fill="#fff6c8" opacity=".4"/>${kid(250, 58, 1, "#fffdf0", "#c9b48a")}${kid(214, 64, .8, "#6aa06a", "#e9e2d0")}`, ["#2c3f5e", "#6d86a6"]],
  loaves: ["Five loaves and two fish feed everyone", () => `<path d="M0 60 C 90 50, 270 50, 360 60 L 360 90 L 0 90 Z" fill="#8cc56a"/>${sun(320, 18, 8)}
    <g transform="translate(180 76)"><path d="M-22 0 L 22 0 L 18 -14 L -18 -14 Z" fill="#c99a52"/><path d="M-20 -10 L 20 -10 M -19 -5 L 19 -5" stroke="#a5793a"/>
      ${bob(`<ellipse cx="-8" cy="-18" rx="7" ry="4.5" fill="#d9a35a"/><ellipse cx="6" cy="-19" rx="7" ry="4.5" fill="#d9a35a"/><path d="M-4 -24 C 0 -28, 6 -28, 10 -24 C 6 -20, 0 -20, -4 -24 Z M 10 -24 L 14 -27 L 14 -21 Z" fill="#8fb3c8"/>`)}</g>
    ${kid(130, 84, .95, "#fffdf0", "#c9b48a")}${kid(226, 84, .7, "#f08a4b", "#f1c84b")}${[40, 66, 290, 318].map((a, i) => kid(a, 62, .5, ["#5b8fb9", "#a65a6a", "#6aa06a", "#c9a35a"][i], "#e9e2d0")).join("")}`, ["#cfeefc", "#f2fbff"]],
  nets: ["Nets full of fish", () => `${waves(48, "#3f8ab8", "#7fc3e0")}${sun(40, 18, 8)}
    ${bob(`<path d="M-46 0 L 46 0 L 36 14 L -36 14 Z" fill="#9a6a3f"/>${kid(-20, 0, .66, "#5b8fb9", "#f1c84b")}${kid(4, 0, .66, "#a65a6a", "#e9e2d0")}`, 150, 50)}
    <path d="M196 52 C 220 60, 260 62, 290 52 C 290 72, 260 84, 220 78 Z" fill="none" stroke="#e9e2d0" stroke-width="1.2" stroke-dasharray="3 2"/>
    ${[[220, 66], [236, 72], [252, 64], [268, 70], [244, 58]].map(([a, b]) => bob(`<path d="M-5 0 C -2 -3, 3 -3, 5 0 C 3 3, -2 3, -5 0 Z M 5 0 L 8 -2.5 L 8 2.5 Z" fill="#f5c542"/>`, a, b)).join("")}`, ["#bfe3f5", "#e8f6fb"]],
  zacchaeus: ["Zacchaeus climbs a tree to see Jesus", () => `<path d="M0 76 C 90 70, 270 70, 360 76 L 360 90 L 0 90 Z" fill="#d9b77a"/>
    <path d="M226 84 C 228 60, 222 40, 232 22" stroke="#7a5a3a" stroke-width="7" fill="none"/><path d="M228 46 L 252 34" stroke="#7a5a3a" stroke-width="4"/>
    <g class="sway" style="transform-origin:236px 40px"><circle cx="220" cy="22" r="18" fill="#6f9a4e"/><circle cx="246" cy="18" r="16" fill="#86b061"/><circle cx="262" cy="34" r="12" fill="#6f9a4e"/></g>
    ${kid(248, 36, .62, "#a65a6a", "#f1c84b")}${kid(150, 84, 1, "#fffdf0", "#c9b48a")}${kid(110, 84, .8, "#5b8fb9", "#e9e2d0")}`, ["#cfeefc", "#f2fbff"]],
  sheep: ["The shepherd finds the lost sheep", () => `<path d="M0 60 C 80 48, 280 50, 360 60 L 360 90 L 0 90 Z" fill="#8cc56a"/>${sun(320, 18, 8)}
    ${kid(170, 84, 1.05, "#8a6a48", "#c9b48a")}${bob(lamb(0, 0, .4), 204, 74)}${lamb(60, 76, .32)}${lamb(90, 80, .3)}${lamb(272, 78, .32)}`, ["#cfeefc", "#f2fbff"]],
  tomb: ["He is risen!", () => `${sun(250, 54, 16)}<path d="M0 70 C 90 60, 270 60, 360 70 L 360 90 L 0 90 Z" fill="#8cc56a"/>
    <path d="M150 74 C 152 34, 230 26, 280 50 C 296 58, 300 68, 300 74 Z" fill="#b5a693"/><path d="M212 74 L 212 56 C 212 46, 236 46, 236 56 L 236 74 Z" fill="#3b332c"/><circle cx="182" cy="62" r="13" fill="#cfc4b4" stroke="#9a8e7e"/>
    ${[[40, 82], [64, 84], [100, 82], [320, 84], [340, 82]].map(([a, b]) => `<g transform="translate(${a} ${b})"><path d="M0 0 L 0 -10" stroke="#5e8a3a" stroke-width="1.4"/><circle cy="-12" r="3.4" fill="#fff"/><circle cy="-12" r="1.2" fill="#f5c542"/></g>`).join("")}
    ${kid(120, 84, .85, "#a65a6a", "#e9e2d0")}`, ["#f9d9b6", "#fdf1df"]],
  pentecost: ["The Holy Spirit comes at Pentecost", () => `<rect width="360" height="90" fill="#f4e3c4"/><path d="M0 70 H 360 V 90 H 0 Z" fill="#c9a875"/>
    ${[70, 120, 170, 220, 270].map((a, i) => `${kid(a, 84, .9, ["#5b8fb9", "#a65a6a", "#6aa06a", "#c9a35a", "#7f6cc8"][i], "#e9e2d0")}<g class="sway" style="transform-origin:${a}px 54px"><path d="M${a} 54 C ${a - 4} 48, ${a} 42, ${a + 1} 38 C ${a + 3} 44, ${a + 5} 48, ${a} 54 Z" fill="#f39c4a"/></g>`).join("")}
    <path d="M300 10 C 320 20, 330 10, 350 18" stroke="#c9b48a" stroke-width="2" fill="none"/>`, ["#f4e3c4", "#f4e3c4"]],
  ship: ["Paul's shipwreck", () => `${waves(50, "#3a6f96", "#8fc0dc")}
    ${bob(`<path d="M-56 0 L 56 0 L 44 16 L -44 16 Z" fill="#7a5a3a"/><path d="M-10 0 L -10 -44 M 20 0 L 20 -36" stroke="#5a3e2b" stroke-width="2.4"/><path d="M-8 -42 L 16 -12 L -8 -12 Z" fill="#e9e2d0"/>`, 160, 54)}
    <path d="M280 90 C 290 70, 320 64, 360 70 L 360 90 Z" fill="#c9b48a"/>${kid(320, 74, .7, "#a65a6a", "#e9e2d0")}`, ["#7d93ab", "#c6d3e0"]],
  samaritan: ["The good Samaritan helps", () => `<path d="M0 72 C 90 64, 270 64, 360 72 L 360 90 L 0 90 Z" fill="#d9b77a"/>${sun(40, 18, 8)}
    <g transform="translate(150 84)">${donkey(0, 0, .5).replace("<g transform", "<g class=\"kid-donkey\" transform")}</g>
    ${kid(196, 84, 1, "#6aa06a", "#f1c84b")}<g transform="translate(220 84) rotate(-8)">${kid(0, 0, .9, "#5b8fb9", "#e9e2d0")}</g><path d="M214 60 L 226 60" stroke="#fff" stroke-width="2"/>`, ["#cfeefc", "#f2fbff"]],
  joseph: ["Joseph's coat of many colors", () => `<path d="M0 70 C 90 62, 270 62, 360 70 L 360 90 L 0 90 Z" fill="#d9b77a"/>${sun(320, 18, 8)}
    <g transform="translate(180 84) scale(1.4)"><path d="M-8 0 C -9 -12, -6 -20, 0 -21 C 6 -20, 9 -12, 8 0 Z" fill="#e85d5d"/>${["#f39c4a", "#f5d04a", "#6cc26a", "#4f9fc8", "#7f6cc8"].map((c, i) => `<path d="M-8.5 ${-3 - i * 3.6} L 8.5 ${-3 - i * 3.6}" stroke="${c}" stroke-width="2.2"/>`).join("")}
      <circle cx="0" cy="-26" r="6" fill="#e8b98f"/><path d="M-6 -28 C -6 -34, 6 -34, 6 -28 Z" fill="#5a3a20"/>${eyes([[-2.2, -25.6], [2.2, -25.6]], .9)}</g>
    ${lamb(90, 78, .3)}${lamb(270, 80, .3)}${palm(40, 74, .7)}`, ["#cfeefc", "#f2fbff"]],
};
const STORIES = {
  creation: ["GEN.1", "GEN.2"], ark: ["GEN.6", "GEN.7", "GEN.8"], rainbow: ["GEN.9"], joseph: ["GEN.37"],
  basket: ["EXO.2"], bush: ["EXO.3"], sea: ["EXO.14", "EXO.15"], tablets: ["EXO.19", "EXO.20", "EXO.31", "EXO.32", "EXO.34", "DEU.5"],
  walls: ["JOS.6"], giant: ["1SA.17"], lions: ["DAN.6"], furnace: ["DAN.3"], jonah: ["JON.1", "JON.2", "JON.3", "JON.4"],
  manger: ["LUK.2", "MAT.1", "MAT.2"], storm: ["MAT.8", "MRK.4", "LUK.8"], water: ["MAT.14"], loaves: ["MRK.6", "LUK.9", "JHN.6", "MAT.15", "MRK.8"],
  nets: ["LUK.5", "JHN.21"], zacchaeus: ["LUK.19"], sheep: ["LUK.15", "PSA.23", "JHN.10"], samaritan: ["LUK.10"],
  tomb: ["MAT.28", "MRK.16", "LUK.24", "JHN.20", "MAT.27", "MRK.15", "LUK.23", "JHN.19"], pentecost: ["ACT.2"], ship: ["ACT.27"],
};
export function kidsStory(book, chapter) {
  const key = `${book}.${chapter}`;
  const name = Object.keys(STORIES).find((k) => STORIES[k].includes(key));
  if (!name) return null;
  const [caption, draw, [a, b]] = STORY_ART[name];
  const id = ++uid;
  return { kind: name, caption, svg: `<svg class="fish-strip passage-art kids-story" viewBox="0 0 360 90" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${caption.replace(/"/g, "&quot;")}">${skyG(id, a, b)}<g clip-path="url(#kc${id})"><rect width="360" height="90" fill="url(#kg${id})"/>${draw()}</g></svg>` };
}
