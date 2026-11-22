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

export const lamb = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})"><g class="bob">
    <ellipse class="wool" cx="0" cy="0" rx="22" ry="14"/>
    <circle class="wool" cx="-14" cy="-6" r="8"/><circle class="wool" cx="-4" cy="-11" r="9"/><circle class="wool" cx="9" cy="-10" r="8"/>
    <ellipse class="face" cx="22" cy="-6" rx="8" ry="7"/>
    <ellipse class="face" cx="16" cy="-10" rx="4" ry="2" transform="rotate(-30 16 -10)"/>
    <circle class="eye" cx="24" cy="-8" r="1.3"/>
    <rect class="face" x="-12" y="10" width="4" height="9" rx="2"/><rect class="face" x="8" y="10" width="4" height="9" rx="2"/>
  </g></g>`;

export const donkey = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path class="tail swish" d="M-24 -6 C -32 0, -32 8, -30 14"/>
    <ellipse class="donkey" cx="0" cy="0" rx="25" ry="13"/>
    <path class="donkey" d="M18 -6 L 30 -26 L 40 -22 L 28 -2 Z"/>
    <ellipse class="donkey" cx="38" cy="-24" rx="9" ry="7" transform="rotate(25 38 -24)"/>
    <ellipse class="muzzle" cx="44" cy="-20" rx="4.5" ry="4" transform="rotate(25 44 -20)"/>
    <ellipse class="donkey ear" cx="30" cy="-38" rx="3" ry="10" transform="rotate(-15 30 -38)"/>
    <ellipse class="donkey ear" cx="36" cy="-38" rx="3" ry="10" transform="rotate(10 36 -38)"/>
    <circle class="eye-dark" cx="38" cy="-27" r="1.4"/>
    <path class="mane" d="M22 -10 L 31 -28"/>
    <rect class="donkey" x="-17" y="8" width="5" height="15" rx="2"/><rect class="donkey" x="-7" y="8" width="5" height="15" rx="2"/>
    <rect class="donkey" x="8" y="8" width="5" height="15" rx="2"/><rect class="donkey" x="16" y="8" width="5" height="15" rx="2"/>
  </g>`;

export const fish = (x, y, s = 1, flip = false) => `
  <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="swim">
    <path class="fish" d="M-16 0 C -6 -10, 10 -10, 16 0 C 10 10, -6 10, -16 0 Z M-16 0 L -24 -7 L -24 7 Z"/>
    <circle class="eye-dark" cx="9" cy="-1.5" r="1.4"/>
  </g></g>`;

export const boat = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})"><g class="rock">
    <path class="hull" d="M-40 0 L 40 0 L 30 14 L -30 14 Z"/>
    <path class="mast" d="M-4 0 L -4 -48"/>
    <path class="sail" d="M-2 -46 L 30 -8 L -2 -8 Z"/>
    <circle class="fisher" cx="-22" cy="-12" r="4"/>
    <path class="fisher" d="M-26 -8 L -18 -8 L -17 0 L -27 0 Z"/>
    <path class="line" d="M-18 -10 L -52 -26 M-52 -26 L -54 16"/>
  </g></g>`;

const waves = (y, w = 360) => `<path class="wave" d="M0 ${y} ${Array.from({ length: Math.ceil(w / 30) }, (_, i) => `q 7.5 -6 15 0 t 15 0`).join(" ")}"/>`;
const hills = `<path class="hill" d="M0 110 C 60 80, 120 86, 180 98 C 240 108, 300 84, 360 92 L 360 120 L 0 120 Z"/>`;
const sun = (x, y) => `<circle class="sun" cx="${x}" cy="${y}" r="14"/>`;
const arch = (x, y) => `<path class="arch" d="M${x - 26} ${y} L ${x - 26} ${y - 46} A 26 26 0 0 1 ${x + 26} ${y - 46} L ${x + 26} ${y}"/>`;
const flower = (x, y) => `<g transform="translate(${x} ${y})"><path class="stem" d="M0 0 L 0 -14"/><circle class="bloom" cx="0" cy="-16" r="4"/><circle class="bloom-center" cx="0" cy="-16" r="1.6"/></g>`;
const pomegranate = (x, y) => `<g transform="translate(${x} ${y})"><circle class="fruit" r="6"/><path class="fruit" d="M-2 -6 L 0 -10 L 2 -6 Z"/></g>`;

// A wide scene for the top of pages, chosen by look.
export function scene(style) {
  const open = `<svg class="scene" viewBox="0 0 360 120" role="img" preserveAspectRatio="xMidYMax meet"`;
  if (style === "masculine") {
    return `${open} aria-label="A fishing boat on the Sea of Galilee"><rect class="sky" width="360" height="120"/>${sun(300, 30)}
      ${boat(170, 78, 1)}${waves(92)}${waves(104)}${fish(70, 108, .7)}${fish(250, 112, .6, true)}${fish(310, 104, .5)}</svg>`;
  }
  if (style === "feminine") {
    return `${open} aria-label="A garden with olive branches and a fig tree"><rect class="sky" width="360" height="120"/>${hills}
      ${arch(180, 112)}${oliveTree(110, 112, .9)}${figTree(250, 112, 1)}${flower(150, 112)}${flower(212, 112)}${flower(300, 114)}${pomegranate(64, 104)}
      ${oliveBranch(0, 22, .9)}${oliveBranch(360, 22, .9, true)}</svg>`;
  }
  if (style === "animated") {
    return `${open} aria-label="A lamb and a donkey under olive and fig trees"><rect class="sky" width="360" height="120"/>${sun(320, 26)}${hills}
      ${oliveTree(60, 104, 1)}${figTree(300, 102, 1)}${lamb(150, 96, .9)}${donkey(220, 88, .85)}</svg>`;
  }
  return `${open} aria-label="Olive and fig trees on a hillside"><rect class="sky" width="360" height="120"/>${hills}
    ${oliveTree(80, 104, 1)}${oliveTree(130, 100, .7)}${figTree(270, 102, 1)}${oliveBranch(10, 30, .7)}</svg>`;
}

// A small flourish for the end of a chapter.
export function flourish(style) {
  const inner = style === "masculine" ? `${fish(60, 16, .8)}${fish(100, 16, .8, true)}`
    : style === "animated" ? `${lamb(60, 18, .6)}${donkey(110, 22, .5)}`
    : `${oliveBranch(80, 20, .75)}${oliveBranch(80, 20, .75, true)}`;
  return `<svg class="flourish" viewBox="0 0 160 36" aria-hidden="true">${inner}</svg>`;
}

// The friend in the corner for the Animated look.
export const friend = (which) => `<svg viewBox="-40 -50 100 80" aria-hidden="true" class="friend">${which === "donkey" ? donkey(0, 0, 1) : lamb(0, 0, 1.3)}</svg>`;

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
      <g class="fish-tail"><path fill="url(#ff${id})" d="M-22 0 C -28 -3, -34 -12, -41 -16 C -38 -7, -38 7, -41 16 C -34 12, -28 3, -22 0 Z"/>
        <path class="fin-ray" d="M-26 -1 L -38 -11 M-26 1 L -38 11 M-27 0 L -39 0"/></g>
      <path class="fish-fin" fill="url(#ff${id})" d="M-12 -11 C -6 -23, 7 -22, 12 -11 C 4 -13, -4 -13, -12 -11 Z"/>
      <path class="fish-fin" fill="url(#ff${id})" d="M-13 9 C -11 15, -5 16, -2 11 Z"/>
      <path fill="url(#fg${id})" class="fish-skin" d="M-24 0 C -16 -15, 9 -17, 23 -6 C 28 -2, 28 2, 23 6 C 9 17, -16 15, -24 0 Z"/>
      <path class="scales" d="M-14 -6 q 3 3 0 6 q 3 3 0 6 M-8 -9 q 3 3 0 6 q 3 3 0 6 q 3 3 0 6 M-2 -10 q 3 3 0 6 q 3 3 0 6 q 3 3 0 6 M4 -10 q 3 3 0 6 q 3 3 0 6 q 3 3 0 6 M10 -8 q 3 3 0 6 q 3 3 0 6"/>
      <path class="lateral" d="M-20 -1 C -6 -4, 8 -4, 20 -2"/>
      <ellipse class="sheen" cx="0" cy="-8" rx="12" ry="2.2"/>
      <path class="gill" d="M13 -8 C 9 -3, 9 3, 13 8"/>
      <g class="fish-pec"><path fill="url(#ff${id})" d="M8 3 C 3 8, -3 10, -6 9 C -2 6, 3 4, 8 3 Z"/></g>
      <circle class="fish-eye" cx="17" cy="-2.5" r="3.3"/><circle class="fish-pupil" cx="17.7" cy="-2.5" r="1.9"/><circle class="fish-glint" cx="18.4" cy="-3.4" r=".75"/>
      <path class="gill" d="M25 2.2 q -2 1.2 -3.6 .2"/>
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
    ? `<path class="shore" d="M0 ${surf + 2} C 50 ${surf - 8}, 100 ${surf - 6}, 150 ${surf + 2} Z"/>${oliveTree(26, surf - 1, .8)}${lamb(64, surf - 10, .5)}${donkey(112, surf - 11, .42)}`
    : style === "feminine"
      ? `${figTree(326, surf, .85)}${flower(296, surf)}${flower(306, surf + 1)}${oliveBranch(0, 16, .8)}${oliveBranch(360, 16, .8, true)}`
      : `${boat(style === "masculine" ? 200 : 230, surf - 4, .8)}`;
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
