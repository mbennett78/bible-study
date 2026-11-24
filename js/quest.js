// Bible Quest: the main Bible game. Spin the wheel, answer before the candle burns down,
// collect coins, and win a jewel for each kind of question (like the jewels on the high
// priest's breastplate, Exodus 28:15-21). Collect them all to win.
//
// Ways to play:
//   - Solo: three hearts. A wrong answer (or the candle going out) costs a heart.
//   - Family: two to four people pass the device. Right answers keep your turn; a wrong one
//     passes it on. First to collect every jewel wins.
//   - Challenge Buddy: the study buddy plays fair, like a person. He takes a few seconds to
//     think, he gets some wrong (how many depends on Easy, Fair or Tough), and he has no
//     power-ups. He can be beaten.
//
// Coins (saved per person) buy small helps in Solo and Challenge Buddy: take away two wrong
// answers, or more time. Family games have no helps, so they stay fair.
import { TRIVIA } from "./trivia-bank.js";
import { topicOf, SOUNDS, medal, confetti } from "./game.js";
import { BUDDY_SVG } from "./buddy.js";

export const CATEGORIES = [
  { id: "people", name: "People", icon: "👤", color: "#e8634a", topics: ["people"] },
  { id: "places", name: "Places", icon: "🗺️", color: "#2f8fd0", topics: ["places"] },
  { id: "stories", name: "Stories & Miracles", icon: "✨", color: "#4fae4a", topics: ["events"] },
  { id: "stem", name: "STEM", icon: "🔬", color: "#f2a516", topics: ["science", "numbers"] },
  { id: "books", name: "Books & Verses", icon: "📜", color: "#9b5fc7", topics: ["books", "connections"] },
  { id: "history", name: "History", icon: "🏛️", color: "#e0457b", topics: ["history"] },
  { id: "arts", name: "Arts & Music", icon: "🎨", color: "#15b3a6", topics: ["arts"] },
];
export const NEED_PER_JEWEL = 2;   // right answers in a category to win its jewel
export const CANDLE_SECS = 20;
export const HEARTS = 3;
export const MAX_ROUNDS = 40;      // a family game always ends
export const BUDDY_LEVELS = [["easy", "Easy", 0.5], ["fair", "Fair", 0.65], ["tough", "Tough", 0.78]];
export const HELPS = { half: { cost: 30, label: "Take away 2", icon: "✂️" }, time: { cost: 20, label: "+10 seconds", icon: "🕯️" } };
export const QUEST_BADGES = [
  ["firstJewel", "First jewel", "💎", "Win your first jewel"],
  ["firstWin", "Winner", "🏆", "Win a game"],
  ["breastplate", "The full breastplate", "🛡️", "Collect every jewel in one game"],
  ["beatBuddy", "Beat your buddy", "🤝", "Win against your study buddy"],
  ["beatTough", "Beat Tough buddy", "🦁", "Win against your study buddy on Tough"],
  ["streak5", "On fire", "🔥", "5 right in a row"],
  ["streak10", "Unstoppable", "⚡", "10 right in a row"],
  ["coins500", "Treasure", "🪙", "Earn 500 coins"],
  ["coins2000", "Hidden treasure", "👑", "Earn 2,000 coins (Matthew 13:44)"],
  ["games10", "Faithful player", "🎮", "Play 10 games"],
];

/* ---------- Rules (plain functions, unit-tested) ---------- */
export const categoryOf = (q) => CATEGORIES.find((c) => c.topics.includes(topicOf(q))) || CATEGORIES[2];
export const questionsFor = (catId) => TRIVIA.filter((q) => categoryOf(q).id === catId);
// A question from this category the person hasn't seen lately (or any, once all are seen).
export function pickQuestion(catId, seen = [], rand = Math.random) {
  const all = questionsFor(catId);
  const fresh = all.filter((q) => !seen.includes(q.id));
  const pool = fresh.length ? fresh : all;
  return pool[Math.floor(rand() * pool.length)];
}
// Coins for a right answer: 10, plus up to 10 for speed, plus a little for a streak.
export function coinsFor(msLeft, totalMs, streak) {
  const speed = Math.round(10 * Math.max(0, Math.min(1, msLeft / totalMs)));
  return 10 + speed + Math.min(10, Math.max(0, streak - 1) * 2);
}
// Buddy plays like a person: right some of the time, and he takes a few seconds to answer.
export function buddyTurn(level = "fair", rand = Math.random) {
  const p = (BUDDY_LEVELS.find(([id]) => id === level) || BUDDY_LEVELS[1])[2];
  return { right: rand() < p, ms: 2500 + Math.floor(rand() * 6500) };
}
export const newPlayer = (name, kind = "person") => ({ name, kind, jewels: {}, progress: {}, coins: 0, right: 0, asked: 0, streak: 0, longest: 0, hearts: HEARTS });
export const jewelCount = (p) => CATEGORIES.filter((c) => p.jewels[c.id]).length;
// Record one answer. Returns what happened: { jewel, won, out }.
export function answer(game, player, catId, right, coins = 0) {
  player.asked++;
  game.rounds = (game.rounds || 0) + 1;
  let jewel = false;
  if (right) {
    player.right++; player.streak++; player.longest = Math.max(player.longest, player.streak); player.coins += coins;
    if (!player.jewels[catId]) {
      player.progress[catId] = (player.progress[catId] || 0) + 1;
      if (player.progress[catId] >= NEED_PER_JEWEL) { player.jewels[catId] = true; jewel = true; player.coins += 25; }
    }
  } else {
    player.streak = 0;
    if (game.mode === "solo") player.hearts--;
  }
  const won = jewelCount(player) === CATEGORIES.length;
  const out = game.mode === "solo" ? player.hearts <= 0 : false;
  return { jewel, won, out, over: won || out || (game.mode !== "solo" && game.rounds >= MAX_ROUNDS) };
}
// Who's ahead: most jewels, then most right answers, then most coins.
export const leader = (players) => [...players].sort((a, b) => jewelCount(b) - jewelCount(a) || b.right - a.right || b.coins - a.coins)[0];

/* ---------- Drawn pieces ---------- */
const jewelSvg = (c, have, progress = 0) => `<span class="q-jewel${have ? " have" : ""}" style="--jc:${c.color}" title="${c.name}">
  <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 15 L14 7 H26 L32 15 L20 34 Z" class="jw-body"/><path d="M8 15 H32 M14 7 L17 15 L20 34 L23 15 L26 7" class="jw-cut"/><path d="M15 9 L13 14" class="jw-shine"/></svg>
  ${have ? "" : `<i class="q-pips">${Array.from({ length: NEED_PER_JEWEL }, (_, i) => `<b class="${i < progress ? "on" : ""}"></b>`).join("")}</i>`}</span>`;
function wheelSvg() {
  const n = CATEGORIES.length, r = 100, slice = 360 / n;
  const pt = (deg, rad) => [110 + rad * Math.sin((deg * Math.PI) / 180), 110 - rad * Math.cos((deg * Math.PI) / 180)];
  const lights = Array.from({ length: 18 }, (_, i) => { const [x, y] = pt(i * 20 + 10, 108); return `<circle class="q-bulb${i % 2 ? " alt" : ""}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/>`; }).join("");
  return `<svg class="q-wheel-svg" viewBox="0 0 220 220" aria-hidden="true">
  <defs><radialGradient id="qShade" cx="50%" cy="50%" r="50%"><stop offset="55%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".18"/></radialGradient>
    <radialGradient id="qGold" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#fff3b0"/><stop offset="60%" stop-color="#ffcf3f"/><stop offset="100%" stop-color="#e09b16"/></radialGradient>
    <linearGradient id="qShine" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity=".45"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <circle cx="110" cy="110" r="113" fill="url(#qGold)"/>
  <g class="q-wheel-spin">${CATEGORIES.map((c, i) => {
    const a0 = i * slice, a1 = a0 + slice, [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r), [ix, iy] = pt(a0 + slice / 2, 64);
    return `<path d="M110 110 L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${c.color}" stroke="#fff" stroke-width="3"/>
      <text x="${ix.toFixed(1)}" y="${iy.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="30">${c.icon}</text>`;
  }).join("")}<circle cx="110" cy="110" r="${r}" fill="url(#qShade)"/><circle cx="110" cy="110" r="101" fill="none" stroke="#fff" stroke-width="4"/></g>
  ${lights}
  <path d="M30 92 A82 82 0 0 1 190 92 Q110 70 30 92 Z" fill="url(#qShine)" pointer-events="none"/>
  <circle cx="110" cy="110" r="24" fill="url(#qGold)" stroke="#fff" stroke-width="4"/><text x="110" y="111" text-anchor="middle" dominant-baseline="central" font-size="20" fill="#fff" class="q-hub-star">★</text>
  <path d="M110 2 L98 -14 H122 Z" class="q-pointer" transform="translate(0 16)"/></svg>`;
}
const candle = () => `<span class="q-candle" aria-hidden="true"><svg viewBox="0 0 40 90"><ellipse class="qc-glow" cx="20" cy="18" rx="16" ry="16"/><path class="qc-flame" d="M20 4 C 25 12, 25 18, 20 22 C 15 18, 15 12, 20 4 Z"/><rect class="qc-wick" x="19.2" y="21" width="1.6" height="5"/><rect class="qc-wax" x="11" y="26" width="18" height="58" rx="3"/><rect class="qc-dish" x="4" y="83" width="32" height="5" rx="2.5"/></svg></span>`;
// A cute little character for each category: a round friend in the category's color,
// wearing its emblem. Each one has its own shape so they're easy to tell apart.
const CRITTER_BODY = {
  people: '<circle cx="50" cy="58" r="34"/>',
  places: '<rect x="18" y="26" width="64" height="66" rx="26"/>',
  stories: '<path d="M50 20 C78 20 86 46 84 66 C82 86 66 94 50 94 C34 94 18 86 16 66 C14 46 22 20 50 20Z"/>',
  stem: '<path d="M50 22 C72 22 86 40 86 60 C86 80 70 94 50 94 C30 94 14 80 14 60 C14 40 28 22 50 22Z"/>',
  books: '<rect x="16" y="30" width="68" height="62" rx="20"/>',
  history: '<ellipse cx="50" cy="60" rx="36" ry="32"/>',
  arts: '<path d="M50 24 C74 24 86 42 84 62 C82 84 68 94 50 94 C32 94 16 84 16 62 C14 42 26 24 50 24Z"/>',
};
export const critter = (c, cls = "", i = 0) => `<span class="q-critter ${cls}" style="--cc:${c.color};--i:${i}" aria-hidden="true">
  <svg viewBox="0 0 100 100"><g class="qcr-body">${CRITTER_BODY[c.id] || CRITTER_BODY.people}</g>
    <ellipse cx="38" cy="42" rx="10" ry="5" fill="#fff" opacity=".35"/>
    <ellipse class="qcr-eye" cx="39" cy="58" rx="7" ry="8.5"/><ellipse class="qcr-eye" cx="61" cy="58" rx="7" ry="8.5"/>
    <circle cx="41" cy="60" r="3.6" fill="#1d2550"/><circle cx="63" cy="60" r="3.6" fill="#1d2550"/>
    <circle cx="42.4" cy="58.3" r="1.3" fill="#fff"/><circle cx="64.4" cy="58.3" r="1.3" fill="#fff"/>
    <ellipse cx="29" cy="70" rx="5" ry="3" fill="#ff7aa8" opacity=".55"/><ellipse cx="71" cy="70" rx="5" ry="3" fill="#ff7aa8" opacity=".55"/>
    <path d="M42 73 Q50 81 58 73" fill="none" stroke="#1d2550" stroke-width="3" stroke-linecap="round"/></svg>
  <b class="qcr-hat">${c.icon}</b></span>`;
const buddyFace = (cls = "") => `<span class="buddy buddy-inline ${cls}" aria-hidden="true">${BUDDY_SVG}</span>`;
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const RIGHT = ["Right!", "Yes!", "You got it!", "Well done!", "Amen!", "Spot on!"];
const WRONG = ["Not quite!", "Good try!", "So close!", "Now you know!"];

/* ---------- The game window ---------- */
export function createQuest({ store, esc, lively, lookColors, myName, practice, buddyName = () => "Buddy", onWin = null }) {
  const B = () => buddyName(); // the name each person gave their study buddy (plain text)
  const BH = () => esc(buddyName()); // the same, ready for HTML
  const dlg = document.createElement("dialog");
  dlg.className = "quest";
  dlg.setAttribute("aria-label", "Bible Quest");
  document.body.append(dlg);

  const mine = () => ({ coins: 0, earned: 0, played: 0, won: 0, jewels: 0, best: 0, seen: [], badges: {}, players: [], buddy: "fair", sound: true, ...(store.get("quest") || {}) });
  const save = (patch) => store.set("quest", { ...mine(), ...patch });
  const sound = (n) => { if (mine().sound) SOUNDS[n](); };
  const reduce = () => !lively() || matchMedia("(prefers-reduced-motion: reduce)").matches;
  let game = null, tick = 0, waits = [];
  const later = (fn, ms) => { const t = setTimeout(fn, reduce() ? Math.min(ms, 400) : ms); waits.push(t); return t; };
  const stop = () => { clearInterval(tick); tick = 0; waits.forEach(clearTimeout); waits = []; };
  dlg.addEventListener("close", stop);
  // Escape closes it too: stop Buddy and the candle at once, before any timer can fire.
  dlg.addEventListener("cancel", () => { stop(); game = null; });

  function paint(html) {
    dlg.classList.toggle("still", reduce());
    dlg.innerHTML = `<div class="q-top"><span class="q-coins" aria-label="${mine().coins} coins">🪙 <b>${mine().coins.toLocaleString()}</b></span><span class="q-title">Bible Quest</span><button type="button" class="q-x" data-close aria-label="Close">×</button></div><div class="q-body">${html}</div>`;
    dlg.querySelector("[data-close]").onclick = () => { if (!game || game.over || confirm("Leave this game? It won't be saved.")) { stop(); game = null; dlg.close(); } };
  }

  /* Home: three big ways to play */
  function home() {
    stop(); game = null;
    const m = mine(), earned = QUEST_BADGES.filter(([id]) => m.badges[id]).length;
    paint(`<div class="q-home">
      <div class="q-hero">${wheelSvg()}</div>
      <div class="q-crew">${CATEGORIES.map((c, i) => critter(c, "", i)).join("")}</div>
      <p class="q-tag">Spin, answer before the candle burns down, and collect all ${CATEGORIES.length} jewels!</p>
      <button class="q-big q-solo" data-mode="solo"><span>🎯</span><b>Play solo</b><small>Three hearts. How many jewels can you win?</small></button>
      <button class="q-big q-family" data-mode="family"><span>👨‍👩‍👧</span><b>Play with family</b><small>Take turns on this device</small></button>
      <button class="q-big q-buddy" data-mode="buddy">${buddyFace()}<b>Challenge ${BH()}</b><small>He plays fair, so you can beat him!</small></button>
      <div class="q-foot"><button class="q-link" data-badges>🏅 My badges (${earned} of ${QUEST_BADGES.length}) · ${m.won} win${m.won === 1 ? "" : "s"}</button>
      ${practice ? `<button class="q-link" data-practice>📖 Practice one part of the Bible</button>` : ""}
      <label class="q-link"><input type="checkbox" data-sound ${m.sound ? "checked" : ""}> Sounds</label></div></div>`);
    dlg.querySelectorAll("[data-mode]").forEach((b) => b.onclick = () => setupMode(b.dataset.mode));
    dlg.querySelector("[data-badges]").onclick = badges;
    dlg.querySelector("[data-practice]")?.addEventListener("click", () => { dlg.close(); practice(); });
    dlg.querySelector("[data-sound]").onchange = (e) => save({ sound: e.target.checked });
  }

  function badges() {
    const m = mine();
    paint(`<div class="q-badges"><h2>My badges</h2><p class="q-tag">${m.played} games · ${m.won} wins · ${m.jewels} jewels · ${m.earned.toLocaleString()} coins earned</p>
      <div class="q-badge-grid">${QUEST_BADGES.map(([id, name, icon, how]) => `<div class="q-badge${m.badges[id] ? "" : " locked"}">${medal(icon, { locked: !m.badges[id] })}<b>${esc(name)}</b><small>${esc(how)}</small></div>`).join("")}</div>
      <button class="q-btn" data-back>Back</button></div>`);
    dlg.querySelector("[data-back]").onclick = home;
  }

  /* Choosing players or Buddy's level */
  function setupMode(mode) {
    const me = myName();
    if (mode === "solo") return start("solo", [newPlayer(me)]);
    if (mode === "buddy") {
      paint(`<div class="q-setup">${buddyFace("q-buddy-big")}<h2>How tough should ${BH()} be?</h2><p class="q-tag">${BH()} thinks for a few seconds and sometimes gets it wrong, just like a person.</p>
        <div class="q-levels">${BUDDY_LEVELS.map(([id, l, p]) => `<button class="q-big" data-lv="${id}"><b>${l}</b><small>He gets about ${Math.round(p * 10)} out of 10 right</small></button>`).join("")}</div>
        <button class="q-link" data-back>Back</button></div>`);
      dlg.querySelectorAll("[data-lv]").forEach((b) => b.onclick = () => { save({ buddy: b.dataset.lv }); start("buddy", [newPlayer(me), newPlayer(B(), "buddy")], b.dataset.lv); });
      dlg.querySelector("[data-back]").onclick = home;
      return;
    }
    let names = (mine().players || []).slice(0, 4);
    if (!names.length) names = [me];
    const draw = () => {
      paint(`<div class="q-setup"><h2>Who's playing?</h2><p class="q-tag">Two to four players. Pass the device when it's someone else's turn.</p>
        <ol class="q-names">${names.map((n, i) => `<li><input data-name="${i}" value="${esc(n)}" maxlength="16" aria-label="Player ${i + 1}">${names.length > 1 ? `<button class="q-link" data-drop="${i}" aria-label="Take ${esc(n || "this player")} out">✕</button>` : ""}</li>`).join("")}</ol>
        ${names.length < 4 ? `<button class="q-btn ghost" data-add>+ Add a player</button>` : ""}
        <button class="q-btn" data-go ${names.filter((n) => n.trim()).length < 2 ? "disabled" : ""}>Start the game</button>
        <button class="q-link" data-back>Back</button></div>`);
      dlg.querySelectorAll("[data-name]").forEach((i) => i.oninput = () => { names[+i.dataset.name] = i.value; dlg.querySelector("[data-go]").disabled = names.filter((n) => n.trim()).length < 2; });
      dlg.querySelectorAll("[data-drop]").forEach((b) => b.onclick = () => { names.splice(+b.dataset.drop, 1); draw(); });
      dlg.querySelector("[data-add]")?.addEventListener("click", () => { names.push(""); draw(); dlg.querySelector(`[data-name="${names.length - 1}"]`).focus(); });
      dlg.querySelector("[data-go]").onclick = () => { const list = names.map((n) => n.trim()).filter(Boolean).slice(0, 4); save({ players: list }); start("family", list.map((n) => newPlayer(n))); };
      dlg.querySelector("[data-back]").onclick = home;
    };
    draw();
  }

  function start(mode, players, level = "fair") {
    game = { mode, players, level, turn: 0, rounds: 0, over: false, startCoins: mine().coins };
    if (!dlg.open) dlg.showModal();
    mode === "family" ? passTo() : board();
  }
  const current = () => game.players[game.turn];

  /* The board: jewels, hearts, and the wheel */
  function board() {
    const p = current(), buddyPlays = p.kind === "buddy";
    paint(`<div class="q-board">
      <div class="q-players">${game.players.map((pl, i) => `<div class="q-pl${i === game.turn ? " on" : ""}">
        <span class="q-pl-name">${pl.kind === "buddy" ? buddyFace("q-mini") : ""}${esc(pl.name)}</span>
        <span class="q-jewels">${CATEGORIES.map((c) => jewelSvg(c, pl.jewels[c.id], pl.progress[c.id] || 0)).join("")}</span>
        ${game.mode === "solo" ? `<span class="q-hearts" aria-label="${pl.hearts} hearts">${"❤️".repeat(Math.max(0, pl.hearts))}${"🤍".repeat(HEARTS - Math.max(0, pl.hearts))}</span>` : ""}</div>`).join("")}</div>
      <div class="q-wheel">${wheelSvg()}</div>
      ${buddyPlays ? `<p class="q-turn">${buddyFace("q-mini")} ${BH()} is spinning…</p>` : `<button class="q-spin" data-spin>SPIN</button><p class="q-turn">${game.mode === "solo" ? "" : `${esc(p.name)}'s turn`}</p>`}
    </div>`);
    const go = () => spin();
    if (buddyPlays) later(go, 900); else dlg.querySelector("[data-spin]").onclick = go;
  }

  function spin() {
    const btn = dlg.querySelector("[data-spin]");
    if (btn) btn.disabled = true;
    const i = Math.floor(Math.random() * CATEGORIES.length), slice = 360 / CATEGORIES.length;
    const turns = 360 * 4 + (360 - (i * slice + slice / 2)) + (Math.random() - 0.5) * slice * 0.6;
    const wheel = dlg.querySelector(".q-wheel-spin");
    wheel.style.transition = reduce() ? "none" : "transform 2.6s cubic-bezier(.17,.67,.22,1)";
    requestAnimationFrame(() => { wheel.style.transform = `rotate(${turns}deg)`; });
    sound("tick");
    later(() => ask(CATEGORIES[i]), 2800);
  }

  /* A question flies in; the candle burns down */
  function ask(cat) {
    const p = current(), buddyPlays = p.kind === "buddy", m = mine();
    const q = pickQuestion(cat.id, m.seen);
    save({ seen: [...m.seen.filter((id) => id !== q.id), q.id].slice(-200) });
    const order = q.choices.map((_, k) => k);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } // fair shuffle
    const owned = p.jewels[cat.id];
    const helps = game.mode !== "family" && !buddyPlays;
    paint(`<div class="q-ask" style="--cc:${cat.color}">
      <div class="q-cat">${critter(cat, "big")}${esc(cat.name)}${owned ? `<small>Jewel won · bonus coins</small>` : ""}</div>
      <div class="q-row">${candle()}<div class="q-card"><p>${esc(q.q)}</p></div></div>
      <div class="q-choices">${order.map((k, n) => `<button class="q-choice" data-k="${k}" style="--d:${0.25 + n * 0.08}s" ${buddyPlays ? "disabled" : ""}><span class="q-letter">${"ABCD"[n]}</span>${esc(q.choices[k])}</button>`).join("")}</div>
      ${buddyPlays ? `<p class="q-turn">${buddyFace("q-mini thinking")} ${BH()} is thinking…</p>` : helps ? `<div class="q-helps">${Object.entries(HELPS).map(([id, h]) => `<button class="q-help" data-help="${id}" ${m.coins < h.cost ? "disabled" : ""}>${h.icon} ${h.label} <small>🪙 ${h.cost}</small></button>`).join("")}</div>` : ""}
    </div>`);
    const total = CANDLE_SECS * 1000;
    let deadline = Date.now() + total, done = false;
    const wax = dlg.querySelector(".qc-wax"), flameBox = dlg.querySelector(".q-candle");
    const burn = () => {
      const left = Math.max(0, deadline - Date.now()), f = left / total;
      wax.setAttribute("height", String(Math.max(2, 58 * Math.min(1, f))));
      wax.setAttribute("y", String(26 + 58 * (1 - Math.min(1, f))));
      flameBox.style.setProperty("--fy", `${58 * (1 - Math.min(1, f))}px`);
      flameBox.classList.toggle("low", left < 5000);
      if (left <= 0) finish(null);
    };
    const finish = (k) => {
      if (done) return; done = true; stop();
      const right = k === q.a, msLeft = Math.max(0, deadline - Date.now());
      dlg.querySelectorAll(".q-choice").forEach((b) => { b.disabled = true; if (+b.dataset.k === q.a) b.classList.add("right"); else if (+b.dataset.k === k) b.classList.add("wrong"); });
      const coins = right ? coinsFor(msLeft, total, p.streak + 1) : 0;
      const r = answer(game, p, cat.id, right, coins);
      if (p.kind === "person" && game.mode !== "family") save({ coins: mine().coins + coins + (r.jewel ? 25 : 0), earned: mine().earned + coins + (r.jewel ? 25 : 0) });
      sound(right ? (r.jewel ? "streak" : "right") : "wrong");
      later(() => feedback(q, cat, right, coins, r, k === null), buddyPlays ? 1300 : 900);
    };
    tick = setInterval(burn, 100); burn();
    if (buddyPlays) {
      const b = buddyTurn(game.level);
      later(() => finish(b.right ? q.a : pick(q.choices.map((_, k) => k).filter((k) => k !== q.a))), Math.min(b.ms, total - 500));
      return;
    }
    dlg.querySelectorAll(".q-choice").forEach((b) => b.onclick = () => finish(+b.dataset.k));
    dlg.querySelectorAll("[data-help]").forEach((b) => b.onclick = () => {
      const h = HELPS[b.dataset.help], m2 = mine();
      if (m2.coins < h.cost) return;
      save({ coins: m2.coins - h.cost });
      dlg.querySelector(".q-coins b").textContent = (m2.coins - h.cost).toLocaleString();
      b.disabled = true;
      if (b.dataset.help === "half") [...dlg.querySelectorAll(".q-choice")].filter((c) => +c.dataset.k !== q.a).sort(() => Math.random() - 0.5).slice(0, 2).forEach((c) => { c.disabled = true; c.classList.add("gone"); });
      else deadline += 10000;
    });
  }

  function feedback(q, cat, right, coins, r, timedOut) {
    const p = current(), who = p.kind === "buddy" ? B() : game.mode === "solo" ? "You" : p.name;
    const head = right ? (p.kind === "buddy" ? `${B()} got it!` : pick(RIGHT)) : timedOut ? "The candle went out!" : p.kind === "buddy" ? `${B()} missed it!` : pick(WRONG);
    const streak = right && p.streak >= 3 ? `<p class="q-streak">🔥 ${p.streak} in a row!</p>` : "";
    paint(`<div class="q-fb ${right ? "good" : "bad"}" style="--cc:${cat.color}">
      <div class="q-fb-head">${p.kind === "buddy" ? buddyFace(right ? "excited" : "") : `<span class="q-fb-icon">${right ? "🎉" : "🙂"}</span>`}<h2>${esc(head)}</h2></div>
      ${right && coins ? `<p class="q-gain">+${coins} 🪙</p>` : ""}${streak}
      ${r.jewel ? `<div class="q-newjewel">${jewelSvg(cat, true)}<p>${esc(who)} won the <b>${esc(cat.name)}</b> jewel! <span>+25 🪙</span></p></div>` : ""}
      <div class="q-why"><p>${right ? "" : `The answer: <b>${esc(q.choices[q.a])}</b>. `}${esc(q.why || "")}</p></div>
      <button class="q-btn" data-next>${r.over ? "See how it ended" : right || game.mode === "solo" ? (p.kind === "buddy" ? `${BH()} spins again` : "Keep going") : game.mode === "buddy" ? (p.kind === "buddy" ? "My turn!" : `${BH()}'s turn`) : "Next player"}</button></div>`);
    if (r.jewel && lively()) confetti(dlg, [cat.color, "#f4d35e", ...lookColors()], 90);
    const next = () => {
      if (r.over) return end();
      if (!right && game.mode !== "solo") { game.turn = (game.turn + 1) % game.players.length; return game.mode === "family" ? passTo() : board(); }
      board();
    };
    dlg.querySelector("[data-next]").onclick = next;
    if (p.kind === "buddy") later(next, 2600);
  }

  function passTo() {
    const p = current();
    paint(`<div class="q-pass"><p class="q-tag">Pass the device to</p><h2>${esc(p.name)}</h2><button class="q-btn" data-ready>I'm ready!</button></div>`);
    dlg.querySelector("[data-ready]").onclick = board;
  }

  function end() {
    game.over = true;
    const m = mine(), me = game.players[0], top = leader(game.players);
    const iWon = game.mode === "solo" ? jewelCount(me) === CATEGORIES.length : top === me && game.mode === "buddy";
    const badgesNow = { ...m.badges };
    const add = (id, cond) => { if (cond && !badgesNow[id]) badgesNow[id] = new Date().toISOString(); };
    const stats = { played: m.played + 1, won: m.won + (iWon ? 1 : 0), jewels: m.jewels + (game.mode === "family" ? 0 : jewelCount(me)), best: Math.max(m.best, me.longest) };
    if (game.mode !== "family") {
      add("firstJewel", jewelCount(me) > 0); add("firstWin", iWon); add("breastplate", jewelCount(me) === CATEGORIES.length);
      add("beatBuddy", iWon && game.mode === "buddy"); add("beatTough", iWon && game.mode === "buddy" && game.level === "tough");
      add("streak5", me.longest >= 5); add("streak10", me.longest >= 10);
    }
    const winBonus = iWon ? 100 : 0;
    const earned = m.earned + winBonus;
    add("coins500", earned >= 500); add("coins2000", earned >= 2000); add("games10", stats.played >= 10);
    const fresh = QUEST_BADGES.filter(([id]) => badgesNow[id] && !m.badges[id]);
    save({ ...stats, badges: badgesNow, coins: m.coins + winBonus, earned });
    const title = game.mode === "solo" ? (iWon ? "You collected every jewel!" : `You won ${jewelCount(me)} of ${CATEGORIES.length} jewels!`)
      : game.mode === "buddy" ? (top === me ? `You beat ${B()}!` : `${B()} won this time!`) : `${top.name} wins!`;
    paint(`<div class="q-end">
      ${game.mode === "buddy" ? buddyFace(top === me ? "" : "excited") : `<span class="q-fb-icon">🏆</span>`}<h2>${esc(title)}</h2>
      ${game.mode === "buddy" && top !== me ? `<p class="q-tag">"Good game! Want a rematch?"</p>` : ""}
      <div class="q-final">${game.players.map((pl) => `<div class="q-pl"><span class="q-pl-name">${esc(pl.name)}</span><span class="q-jewels">${CATEGORIES.map((c) => jewelSvg(c, pl.jewels[c.id], pl.progress[c.id] || 0)).join("")}</span><small>${pl.right} of ${pl.asked} right · ${pl.coins} 🪙</small></div>`).join("")}</div>
      ${winBonus ? `<p class="q-gain">Winner's bonus +${winBonus} 🪙</p>` : ""}
      ${fresh.length ? `<div class="q-newbadges"><h3>New badge${fresh.length > 1 ? "s" : ""}!</h3>${fresh.map(([, name, icon]) => `<div class="q-badge">${medal(icon, { fresh: true })}<b>${esc(name)}</b></div>`).join("")}</div>` : ""}
      <button class="q-btn" data-again>Play again</button><button class="q-link" data-home>Back to Bible Quest</button></div>`);
    if (lively() && (iWon || game.mode === "family")) { confetti(dlg, lookColors()); sound("cheer"); } else sound("done");
    if (iWon) onWin?.();
    const again = { mode: game.mode, names: game.players.filter((p) => p.kind === "person").map((p) => p.name), level: game.level };
    dlg.querySelector("[data-again]").onclick = () => again.mode === "buddy" ? start("buddy", [newPlayer(again.names[0]), newPlayer(B(), "buddy")], again.level) : start(again.mode, again.names.map((n) => newPlayer(n)));
    dlg.querySelector("[data-home]").onclick = home;
  }

  return {
    open() { home(); if (!dlg.open) dlg.showModal(); },
    // Straight to "How tough should Buddy be?" (Buddy asked them to play).
    challenge() { setupMode("buddy"); if (!dlg.open) dlg.showModal(); },
    el: dlg,
  };
}
