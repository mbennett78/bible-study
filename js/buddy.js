// The study buddy: a small stick figure with a talk bubble who opens the Bible helper chat.
// He sits quietly at the side of the screen until someone taps him; then he stands up,
// waves and opens the chat. Now and then (the app decides when) he walks in a few steps to
// say hi, check on them, or ask if they're wondering anything. They can answer him: "Not
// now" gets a cheerful "Okie!", and "Yes" gets an excited "Oh yeah, I can find something!"
// before the chat opens. He looks caring when someone asks about something sad. He can be
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
    <path class="buddy-shut" d="M20.8 21q1.7 1.2 3.4 0M27.8 21q1.7 1.2 3.4 0"/>
    <path class="buddy-smile" d="M21.5 25.5q4.5 4 9 0"/>
    <ellipse class="buddy-mouth" cx="26" cy="26.6" rx="2.8" ry="1.9"/>
    <path class="buddy-frown" d="M23 27.2q3-1.3 6 0"/>
    <path class="buddy-brow" d="M20.3 17.2l3.2-.8M31.7 17.2l-3.2-.8"/>
    <path class="buddy-line" d="M26 32v22"/>
    <g class="buddy-arm-l"><path class="buddy-line" d="M26 38l-10 9"/></g>
    <g class="buddy-arm-r"><path class="buddy-line" d="M26 38l10 9"/></g>
    <g class="buddy-legs-stand"><path class="buddy-line" d="M26 54l-8 18M26 54l8 18"/></g>
    <g class="buddy-legs-sit"><path class="buddy-line" d="M26 54l15 2l4 2M26 54l11-5l4 9"/></g>
  </g>
</svg>`;

const SPOT_KEY = "bible-study:buddy-spot";
// His little tricks while nobody needs him, and when he naps.
const TRICK_EVERY_MS = 25000;
const NAP_AFTER_MS = 150000;
const TRICKS = ["cartwheel", "stroll", "pondering", "yay", "stroll", "pondering", "yay", "cartwheel"];
const SIT_AFTER_MS = 12000;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const pick = (list) => list[Math.floor(Math.random() * list.length)];
// What he says back, so it never sounds the same twice in a row.
const NO_LINES = ["Okie! 😊", "Sure thing! Just let me know.", "Okay! I'll be right over here.", "No problem! I'm here whenever you need me.", "Okie dokie! Happy reading."];
const PLAY_LINES = ["Yay! Let's play! 🎲", "Woohoo! Get ready to spin!", "Game on! I'll try my best!"];
const YES_LINES = ["Oh yeah! I can find something!", "Ooh, yay! What is it?", "Oh good, I love questions!", "Yes! Let's find out together!"];
let careTimer = 0;

export function createBuddy({ onTap, label = "Open my study buddy chat", defaultSide = () => "right", sayOutLoud = null }) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "buddy";
  el.setAttribute("aria-label", label);
  el.innerHTML = BUDDY_SVG + `<span class="buddy-pop" aria-hidden="true"></span>`;
  const pop = el.querySelector(".buddy-pop");
  el.classList.add("sitting");
  document.body.append(el);
  // His little speech bubble for visits ("Hi! Wondering anything?"), with two ways to answer him.
  const say = document.createElement("div");
  say.className = "buddy-say";
  say.setAttribute("role", "status");
  say.hidden = true;
  say.innerHTML = `<button type="button" class="bs-words"></button><span class="bs-acts"><button type="button" class="bs-yes">Yes, I have a question</button><button type="button" class="bs-no">Not now</button></span>
    <form class="bs-name" hidden><input type="text" maxlength="16" autocomplete="off" aria-label="His name" value="Buddy"><button type="submit">That's your name!</button></form>`;
  const words = say.querySelector(".bs-words"), acts = say.querySelector(".bs-acts"), nameForm = say.querySelector(".bs-name");
  let onName = null;
  // Asking for his name (people who set up the app before he could be named).
  nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = nameForm.querySelector("input").value.trim().slice(0, 16) || "Buddy";
    nameForm.hidden = true;
    clearTimeout(visitTimer);
    onName?.(v); onName = null;
    speak(`I love it! I'm ${v} now. 😊 Tap me any time you want to talk.`, false);
    play("excited", 1400);
    visitTimer = setTimeout(goBack, 3500);
  });
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
  words.addEventListener("click", () => tapped());
  // "Yes": he's thrilled, then the chat opens.
  const yesBtn = say.querySelector(".bs-yes");
  let onYes = null;
  yesBtn.addEventListener("click", () => {
    clearTimeout(visitTimer);
    const then = onYes || onTap;
    speak(onYes ? pick(PLAY_LINES) : pick(YES_LINES), false);
    play("excited", 1400);
    visitTimer = setTimeout(() => { endVisit(); then(); }, 1100);
  });
  // "Not now": a happy "Okie!" and back he goes.
  say.querySelector(".bs-no").addEventListener("click", () => {
    clearTimeout(visitTimer);
    speak(pick(NO_LINES), false);
    play("waving", 1200);
    visitTimer = setTimeout(goBack, 2400);
  });
  function tapped() { rouse(); endVisit(); play("excited", 1400); onTap(); }
  // He "says" each line: his mouth moves for a moment, about as long as the words.
  let talkTimer = 0;
  function speak(text, ask) {
    if (ask !== "name") nameForm.hidden = true;
    clearTimeout(talkTimer);
    el.classList.add("speaking");
    talkTimer = setTimeout(() => el.classList.remove("speaking"), Math.min(3200, 600 + text.length * 35));
    words.textContent = text;
    sayOutLoud?.(text);
    acts.hidden = ask !== true;
    if (ask === "name") nameForm.hidden = false;
    say.hidden = false;
    placeSay();
  }

  // A visit: he stands, walks a few steps into the screen, says something short, then
  // walks back and sits. Tapping him or his bubble opens the chat.
  let visitTimer = 0;
  function endVisit() {
    clearTimeout(visitTimer);
    say.hidden = true;
    el.classList.remove("visiting", "walking");
    sitSoon(4000);
  }
  const goBack = () => { say.hidden = true; el.classList.add("walking"); el.classList.remove("visiting"); setTimeout(endVisit, 900); };
  // A visit where he asks what they'd like to call him; onPicked(name) saves it.
  function askName(text, onPicked) {
    if (!visit(text, 30000, "name")) return false;
    onName = onPicked;
    return true;
  }
  // A visit that invites them to something ("Want to play?"): yes runs `go` instead of the chat.
  function invite(text, yesLabel, go) {
    if (!visit(text, 14000)) return false;
    onYes = go;
    yesBtn.textContent = yesLabel;
    return true;
  }
  function visit(text, ms = 12000, ask = true) {
    onYes = null;
    yesBtn.textContent = "Yes, I have a question";
    if (el.hidden || drag || !say.hidden) return false;
    rouse();
    el.classList.remove("tucked", "sitting");
    el.classList.add("walking", "visiting");
    hold(ms + 1500);
    setTimeout(() => {
      el.classList.remove("walking");
      play("waving", 1200);
      speak(text, ask);
    }, 900);
    visitTimer = setTimeout(goBack, ms);
    return true;
  }

  // Little things he does on his own: cartwheels, a stroll, a think, a "Yay!", and a nap on
  // the ground when nobody has touched the app for a while. Any tap or key wakes him.
  let lastActive = Date.now(), trickUntil = 0;
  const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.graphics === "simple";
  const busy = () => el.hidden || drag || !say.hidden || keepStanding || el.classList.contains("visiting") || Date.now() < holdUntil || Date.now() < trickUntil || document.hidden;
  const popUp = (text, ms) => { pop.textContent = text; pop.classList.add("on"); setTimeout(() => pop.classList.remove("on"), ms); };
  function trick(name) {
    if (busy() || el.classList.contains("sleeping")) return false;
    const ms = { cartwheel: 1700, stroll: 3200, pondering: 5000, yay: 2000 }[name] || 2000;
    trickUntil = Date.now() + ms + 400;
    el.classList.remove("tucked", "sitting");
    if (name === "stroll") {
      el.classList.add("walking", "strolling");
      setTimeout(() => el.classList.remove("strolling"), 1500);
      setTimeout(() => el.classList.remove("walking"), ms);
    } else {
      el.classList.add(name);
      setTimeout(() => el.classList.remove(name), ms);
    }
    if (name === "yay") popUp("Yay!", ms);
    if (name === "pondering") popUp("?", ms);
    sitSoon(ms + 2500);
    return true;
  }
  function nap() {
    if (busy() || el.classList.contains("sleeping")) return;
    el.classList.remove("sitting", "tucked", "thinking", "talking");
    el.classList.add("sleeping");
    pop.textContent = "z z z"; pop.classList.add("on", "snore");
  }
  function rouse() {
    if (!el.classList.contains("sleeping")) return;
    el.classList.remove("sleeping"); pop.classList.remove("on", "snore");
    el.classList.add("sitting");
  }
  const active = () => { lastActive = Date.now(); if (el.classList.contains("sleeping")) { rouse(); trick("yay"); } };
  addEventListener("pointerdown", active, { passive: true });
  addEventListener("keydown", active);
  setInterval(() => {
    if (still()) return;
    if (Date.now() - lastActive > NAP_AFTER_MS) { nap(); return; }
    if (Math.random() < 0.55) trick(pick(TRICKS));
  }, TRICK_EVERY_MS);

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
    askName,
    invite,
    visiting: () => !say.hidden || el.classList.contains("visiting"),
    // Stands while the chat is open; sits again when it closes.
    chatting(on) { keepStanding = on; if (on) { el.classList.remove("sitting", "tucked"); } else sitSoon(3000); },
    excite() { play("excited", 1400); },     // someone asked him something
    // A friendly wave from where he sits, now and then, without walking over.
    wave() { if (el.hidden || drag || !say.hidden) return false; el.classList.remove("tucked"); play("waving", 1600); sitSoon(3500); return true; },
    // Someone asked about something sad: a gentle, caring face for a while.
    caring(on) { clearTimeout(careTimer); el.classList.toggle("caring", on); if (on) { wake(); hold(8000); el.classList.remove("tucked"); careTimer = setTimeout(() => el.classList.remove("caring"), 90000); } },
    cheer() { play("cheering", 2600); },     // a great quiz score
    trick,                                    // "cartwheel" | "stroll" | "pondering" | "yay"
    nap,
    sleeping: () => el.classList.contains("sleeping"),
    thinking(on) { wake(); hold(); if (on) el.classList.remove("tucked"); el.classList.toggle("thinking", on); },
    talking(on) { wake(); if (on) { hold(60000); el.classList.remove("tucked"); } else hold(); el.classList.toggle("talking", on); },
  };
}
