// The study buddy: a small stick figure with a talk bubble who opens the Bible helper chat.
// He sits quietly at the side of the screen until someone taps him; then he stands up,
// waves and opens the chat. Now and then (the app decides when) he walks in a few steps to
// say hi or ask if they're wondering anything, then goes back and sits down. He can be
// dragged anywhere along either edge, and remembers where he was put. He never covers the
// bottom buttons, and he stays still for anyone who has asked their device for less motion.

export const BUDDY_SVG = `<svg class="buddy-svg" viewBox="0 0 72 84" aria-hidden="true">
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
const SIT_AFTER_MS = 12000;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function createBuddy({ onTap, label = "Open my study buddy chat", defaultSide = () => "right" }) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "buddy";
  el.setAttribute("aria-label", label);
  el.innerHTML = BUDDY_SVG;
  el.classList.add("sitting");
  document.body.append(el);
  // His little speech bubble for visits ("Hi! Wondering anything?").
  const say = document.createElement("button");
  say.type = "button";
  say.className = "buddy-say";
  say.hidden = true;
  document.body.append(say);

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
    placeSay();
  }
  function placeSay() {
    if (say.hidden) return;
    const r = el.getBoundingClientRect();
    say.style.top = `${Math.max(8, r.top - say.offsetHeight + 10)}px`;
    say.style.left = spot.side === "left" ? `${Math.max(6, r.right - 6)}px` : "";
    say.style.right = spot.side === "right" ? `${Math.max(6, innerWidth - r.left - 6)}px` : "";
    say.classList.toggle("on-right", spot.side === "right");
  }

  // He stands while he's busy (chatting, visiting, cheering), then sits back down.
  let sitTimer = 0, keepStanding = false;
  const sitSoon = (ms = SIT_AFTER_MS) => { clearTimeout(sitTimer); sitTimer = setTimeout(() => { if (!keepStanding) el.classList.add("sitting"); }, ms); };
  const wake = () => { el.classList.remove("sitting"); sitSoon(); };
  let holdUntil = Date.now() + 3000; // stays out while he's greeting, celebrating or answering
  const hold = (ms = 3000) => { holdUntil = Date.now() + ms; };
  const play = (cls, ms) => { wake(); hold(Math.max(ms, 3000)); el.classList.remove("tucked"); el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); };

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
    if (!was.moved) { if (e.type === "pointerup") tapped(); return; }
    const b = bounds(), r = el.getBoundingClientRect();
    spot = { side: r.left + r.width / 2 < innerWidth / 2 ? "left" : "right", y: clamp((r.top - b.top) / Math.max(1, b.bottom - b.top - r.height), 0, 1) };
    saved = spot;
    try { localStorage.setItem(SPOT_KEY, JSON.stringify(spot)); } catch { /* not saved */ }
    place();
  };
  el.addEventListener("pointerup", drop);
  el.addEventListener("pointercancel", drop);
  // Keyboard and screen readers: Enter or Space opens the chat (the pointer handlers cover taps).
  el.addEventListener("click", (e) => { if (e.detail === 0) tapped(); });
  say.addEventListener("click", () => tapped());
  function tapped() { endVisit(); play("excited", 1400); onTap(); }

  // A visit: he stands, walks a few steps into the screen, says something short, then
  // walks back and sits. Tapping him or his bubble opens the chat.
  let visitTimer = 0;
  function endVisit() {
    clearTimeout(visitTimer);
    say.hidden = true;
    el.classList.remove("visiting", "walking");
    sitSoon(4000);
  }
  function visit(text, ms = 7000) {
    if (el.hidden || drag || !say.hidden) return false;
    el.classList.remove("tucked", "sitting");
    el.classList.add("walking", "visiting");
    hold(ms + 1500);
    setTimeout(() => {
      el.classList.remove("walking");
      play("waving", 1200);
      say.textContent = text;
      say.hidden = false;
      placeSay();
    }, 900);
    visitTimer = setTimeout(() => { say.hidden = true; el.classList.add("walking"); el.classList.remove("visiting"); setTimeout(endVisit, 900); }, ms);
    return true;
  }

  addEventListener("resize", place);
  // While someone scrolls through the reading he sits and fades a little, so he never
  // distracts from the words. He's still there to tap.
  const tuck = (on) => { el.classList.toggle("tucked", on); if (on && !keepStanding) el.classList.add("sitting"); };
  addEventListener("scroll", () => { if (!drag && Date.now() > holdUntil) tuck(true); }, { passive: true });
  requestAnimationFrame(place);

  return {
    el,
    place,
    show(on) { el.hidden = !on; if (!on) endVisit(); else place(); },
    visit,
    visiting: () => !say.hidden || el.classList.contains("visiting"),
    // Stands while the chat is open; sits again when it closes.
    chatting(on) { keepStanding = on; if (on) { el.classList.remove("sitting", "tucked"); } else sitSoon(3000); },
    excite() { play("excited", 1400); },     // someone asked him something
    cheer() { play("cheering", 2600); },     // a great quiz score
    thinking(on) { wake(); hold(); if (on) el.classList.remove("tucked"); el.classList.toggle("thinking", on); },
    talking(on) { wake(); if (on) { hold(60000); el.classList.remove("tucked"); } else hold(); el.classList.toggle("talking", on); },
  };
}
