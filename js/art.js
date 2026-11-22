// Hand-drawn style illustrations as inline SVG. Colors come from CSS classes
// (styles.css, "Illustrations"), so each look (Sage, Feminine, Masculine, Animated)
// recolors the same drawings. No image files are needed.

const leaf = (x, y, r, s = 1) => `<ellipse class="leaf" cx="0" cy="0" rx="${9 * s}" ry="${3.6 * s}" transform="translate(${x} ${y}) rotate(${r})"/>`;

export const oliveBranch = (x = 0, y = 0, scale = 1, flip = false) => `
  <g class="sway" transform="translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})">
    <path class="stem" d="M0 0 C 30 -8, 60 -6, 92 -20"/>
    ${leaf(16, -8, -40)}${leaf(20, 1, 30)}${leaf(38, -12, -50)}${leaf(42, -2, 25)}${leaf(60, -16, -45)}${leaf(64, -6, 20)}${leaf(82, -22, -35)}${leaf(86, -12, 30)}
    <circle class="olive" cx="30" cy="-2" r="3.2"/><circle class="olive" cx="54" cy="-6" r="3.2"/><circle class="olive" cx="74" cy="-11" r="3"/>
  </g>`;

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
  <g class="bob" transform="translate(${x} ${y}) scale(${s})">
    <ellipse class="wool" cx="0" cy="0" rx="22" ry="14"/>
    <circle class="wool" cx="-14" cy="-6" r="8"/><circle class="wool" cx="-4" cy="-11" r="9"/><circle class="wool" cx="9" cy="-10" r="8"/>
    <ellipse class="face" cx="22" cy="-6" rx="8" ry="7"/>
    <ellipse class="face" cx="16" cy="-10" rx="4" ry="2" transform="rotate(-30 16 -10)"/>
    <circle class="eye" cx="24" cy="-8" r="1.3"/>
    <rect class="face" x="-12" y="10" width="4" height="9" rx="2"/><rect class="face" x="8" y="10" width="4" height="9" rx="2"/>
  </g>`;

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
  <g class="swim" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <path class="fish" d="M-16 0 C -6 -10, 10 -10, 16 0 C 10 10, -6 10, -16 0 Z M-16 0 L -24 -7 L -24 7 Z"/>
    <circle class="eye-dark" cx="9" cy="-1.5" r="1.4"/>
  </g>`;

export const boat = (x, y, s = 1) => `
  <g class="rock" transform="translate(${x} ${y}) scale(${s})">
    <path class="hull" d="M-40 0 L 40 0 L 30 14 L -30 14 Z"/>
    <path class="mast" d="M-4 0 L -4 -48"/>
    <path class="sail" d="M-2 -46 L 30 -8 L -2 -8 Z"/>
    <circle class="fisher" cx="-22" cy="-12" r="4"/>
    <path class="fisher" d="M-26 -8 L -18 -8 L -17 0 L -27 0 Z"/>
    <path class="line" d="M-18 -10 L -52 -26 M-52 -26 L -54 16"/>
  </g>`;

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
