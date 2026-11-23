// The study buddy: a small stick figure with a talk bubble who opens the study partner chat.
// He stands at the side of the screen, sits down when nothing is happening, and gets
// excited when someone asks him something. He can be dragged anywhere along either edge,
// and he remembers where he was put. He never covers the bottom buttons, and he stays still
// for anyone who has asked their device for less motion.

const SVG = `<svg class="buddy-svg" viewBox="0 0 72 84" aria-hidden="true">
  <g class="buddy-bubble">
    <path class="ti-front" d="M47 2h19a6 6 0 0 1 6 6v11a6 6 0 0 1-6 6h-9l-6 5v-5h-4a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"/>
    <circle class="ti-dot d1" cx="49" cy="13.5" r="2"/><circle class="ti-dot d2" cx="56.5" cy="13.5" r="2"/><circle class="ti-dot d3" cx="64" cy="13.5" r="2"/>
  </g>
  <g class="buddy-body">
    <circle class="buddy-head" cx="26" cy="22" r="10"/>
    <circle class="buddy-eye" cx="22.5" cy="20.5" r="1.6"/><circle class="buddy-eye" cx="29.5" cy="20.5" r="1.6"/>
    <path class="buddy-smile" d="M21.5 25.5q4.5 4 9 0"/>
    <path class="buddy-line" d="M26 32v22"/>
    <path class="buddy-line buddy-arm-l" d="M26 38l-10 9"/>
    <g class="buddy-arm-r"><path class="buddy-line" d="M26 38l10 9"/></g>
    <g class="buddy-legs-stand"><path class="buddy-line" d="M26 54l-8 18M26 54l8 18"/></g>
    <g class="buddy-legs-sit"><path class="buddy-line" d="M26 54l15 2l4 2M26 54l11-5l4 9"/></g>
  </g>
</svg>`;

const SPOT_KEY = "bible-study:buddy-spot";
const SIT_AFTER_MS = 25000;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function createBuddy({ onTap, label = "Open my study buddy chat", defaultSide = () => "right" }) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "buddy";
  el.setAttribute("aria-label", label);
  el.innerHTML = SVG;
  document.body.append(el);

  // Where he stands: which edge, and how far down (0 = top of the free space, 1 = bottom).
  // Until someone moves him, he takes the side the app suggests (away from the corner friend).
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(SPOT_KEY)); } catch { /* first time */ }
  let spot = saved || { side: defaultSide(), y: 1 };

  // The space he may use: below the top bar and above the bottom buttons.
  function bounds() {
    const top = (document.querySelector(".topbar")?.getBoundingClientRect().bottom || 0) + 8;
    const tabs = document.querySelector(".tabbar");
    const bottom = (tabs && getComputedStyle(tabs).display !== "none" ? tabs.getBoundingClientRect().top : innerHeight) - 8;
    return { top, bottom: Math.max(top + el.offsetHeight, bottom) };
  }
  function place() {
    if (!saved) spot = { side: defaultSide(), y: 1 };
    const b = bounds(), h = el.offsetHeight || 84;
    el.style.top = `${b.top + clamp(spot.y, 0, 1) * (b.bottom - b.top - h)}px`;
    el.style.left = spot.side === "left" ? "4px" : "";
    el.style.right = spot.side === "right" ? "4px" : "";
    el.classList.toggle("on-right", spot.side === "right");
  }

  // Sits down after a while with nothing happening; stands up again for any activity.
  let sitTimer = 0;
  const wake = () => { el.classList.remove("sitting"); clearTimeout(sitTimer); sitTimer = setTimeout(() => el.classList.add("sitting"), SIT_AFTER_MS); };
  const play = (cls, ms) => { wake(); el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); };

  // Drag him along the edges; a tap (no real movement) opens the chat.
  let drag = null;
  el.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, top: el.getBoundingClientRect().top, moved: false };
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 8) return;
    drag.moved = true;
    el.classList.add("dragging");
    const b = bounds();
    el.style.top = `${clamp(drag.top + e.clientY - drag.y, b.top, b.bottom - el.offsetHeight)}px`;
    el.style.left = `${clamp(e.clientX - el.offsetWidth / 2, 0, innerWidth - el.offsetWidth)}px`;
    el.style.right = "";
  });
  const drop = (e) => {
    if (!drag) return;
    const was = drag; drag = null;
    el.classList.remove("dragging");
    if (!was.moved) { if (e.type === "pointerup") { play("waving", 1200); onTap(); } return; }
    const b = bounds(), r = el.getBoundingClientRect();
    spot = { side: r.left + r.width / 2 < innerWidth / 2 ? "left" : "right", y: clamp((r.top - b.top) / Math.max(1, b.bottom - b.top - r.height), 0, 1) };
    saved = spot;
    try { localStorage.setItem(SPOT_KEY, JSON.stringify(spot)); } catch { /* not saved */ }
    place();
  };
  el.addEventListener("pointerup", drop);
  el.addEventListener("pointercancel", drop);
  // Keyboard and screen readers: Enter or Space opens the chat (the pointer handlers cover taps).
  el.addEventListener("click", (e) => { if (e.detail === 0) { play("waving", 1200); onTap(); } });

  addEventListener("resize", place);
  for (const ev of ["pointerdown", "keydown", "scroll"]) addEventListener(ev, wake, { passive: true });
  requestAnimationFrame(place);
  wake();

  return {
    el,
    place,
    show(on) { el.hidden = !on; if (on) place(); },
    excite() { play("excited", 1400); },     // someone asked him something
    cheer() { play("cheering", 2600); },     // a great quiz score
    thinking(on) { wake(); el.classList.toggle("thinking", on); },
    talking(on) { wake(); el.classList.toggle("talking", on); },
  };
}
