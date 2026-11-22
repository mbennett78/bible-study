// Hand-drawn style illustrations as inline SVG. Colors come from CSS classes
// (styles.css, "Illustrations"), so each look (Sage, Feminine, Masculine, Animated)
// recolors the same drawings. No image files are needed.

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
