// Bible games: quiz yourself, or play together with up to 20 players or teams.
// Pick any part of the Bible, how many questions and a timer. Questions are shuffled and
// fresh each game (nothing repeats until a section's questions have all been used), names
// are remembered for the leaderboard, and a great score gets a celebration with sound.
import { BOOKS } from "./books.js";
import { TRIVIA } from "./trivia-bank.js";
import { BUDDY_SVG } from "./buddy.js";

export const MAX_PLAYERS = 20;
const bookAt = Object.fromEntries(BOOKS.map((b, i) => [b.id, i]));
const range = (from, to) => (b) => bookAt[b] >= bookAt[from] && bookAt[b] <= bookAt[to];
export const SCOPES = [
  ["all", "Whole Bible", () => true],
  ["ot", "Old Testament", range("GEN", "MAL")],
  ["nt", "New Testament", range("MAT", "REV")],
  ["law", "Books of the Law", range("GEN", "DEU")],
  ["history", "History", range("JOS", "EST")],
  ["poetry", "Poetry and Wisdom", range("JOB", "SNG")],
  ["prophets", "Prophets", range("ISA", "MAL")],
  ["gospels", "Gospels", range("MAT", "JHN")],
  ["letters", "Acts and the Letters", range("ACT", "JUD")],
  ["revelation", "Revelation", range("REV", "REV")],
];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

// Questions in a part of the Bible (a question counts when every chapter it uses is in that part).
export function questionsIn(scopeId) {
  const inScope = (SCOPES.find(([id]) => id === scopeId) || SCOPES[0])[2];
  return TRIVIA.filter((q) => q.refs.every((r) => inScope(r.split(".")[0])));
}

// Picks `need` questions, unseen ones first, each with its choices shuffled.
export function dealQuestions(scopeId, need, seen = []) {
  const pool = questionsIn(scopeId);
  const fresh = shuffle(pool.filter((q) => !seen.includes(q.id)));
  const reuse = shuffle(pool.filter((q) => seen.includes(q.id)));
  return [...fresh, ...reuse].slice(0, need).map((q) => {
    const order = shuffle(q.choices.map((_, i) => i));
    return { ...q, choices: order.map((i) => q.choices[i]), a: order.indexOf(q.a) };
  });
}

// Final standings: highest score first; ties share a place.
export function standings(players) {
  const sorted = [...players].sort((a, b) => b.right - a.right || a.name.localeCompare(b.name));
  return sorted.map((p, i) => ({ ...p, place: i && sorted[i - 1].right === p.right ? null : i + 1, pct: p.asked ? Math.round((p.right / p.asked) * 100) : 0 }));
}

// Adds a finished game to the saved leaderboard.
export function recordGame(board, players) {
  const out = { ...board };
  const top = Math.max(...players.map((p) => p.right));
  for (const p of players) {
    const key = p.name.trim();
    const was = out[key] || { games: 0, right: 0, asked: 0, wins: 0, best: 0 };
    const pct = p.asked ? Math.round((p.right / p.asked) * 100) : 0;
    out[key] = { games: was.games + 1, right: was.right + p.right, asked: was.asked + p.asked, wins: was.wins + (players.length > 1 && p.right === top ? 1 : 0), best: Math.max(was.best, pct) };
  }
  return out;
}

/* ---------- Sound effects (Web Audio, no files to download) ---------- */
// Quiet, short tones. They follow the device volume, and on iPhone and iPad the silent switch.
let audio = null;
function tone(notes, { type = "sine", gap = 0.12, length = 0.18, volume = 0.18 } = {}) {
  try {
    if (navigator.audioSession) navigator.audioSession.type = "ambient";
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === "suspended") audio.resume();
    notes.forEach((f, i) => {
      const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime + i * gap;
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(volume, t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + length);
      o.connect(g).connect(audio.destination); o.start(t); o.stop(t + length + 0.05);
    });
  } catch { /* no sound on this device */ }
}
export const SOUNDS = {
  right: () => tone([784, 1047], { type: "triangle" }),
  wrong: () => tone([220, 196], { type: "sine", gap: 0.15, length: 0.25, volume: 0.12 }),
  tick: () => tone([880], { length: 0.05, volume: 0.05 }),
  cheer: () => tone([523, 659, 784, 1047, 784, 1047, 1319], { type: "triangle", gap: 0.11, length: 0.3 }),
  done: () => tone([523, 659, 784], { type: "triangle", gap: 0.14, length: 0.3, volume: 0.14 }),
};

/* ---------- The game screen ---------- */
/* ---------- Confetti in the colors of the current look ---------- */
// Drawn inside the game window (which sits above the rest of the app).
function confetti(host, colors, count = 140) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = Object.assign(document.createElement("canvas"), { className: "g-confetti" });
  host.append(c);
  const ctx = c.getContext("2d"), W = innerWidth, H = innerHeight;
  c.width = W * devicePixelRatio; c.height = H * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio);
  const bits = Array.from({ length: count }, () => ({ x: W / 2 + (Math.random() - 0.5) * 80, y: H / 3, vx: (Math.random() - 0.5) * 13, vy: Math.random() * -13 - 4, r: Math.random() * 7 + 4, a: Math.random() * 6, c: colors[Math.floor(Math.random() * colors.length)] }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const b of bits) { b.vy += 0.32; b.vx *= 0.99; b.x += b.vx; b.y += b.vy; b.a += 0.2; ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c; ctx.fillRect(-b.r / 2, -b.r / 4, b.r, b.r / 2); ctx.restore(); }
    if (++frames < 170 && c.isConnected) requestAnimationFrame(tick); else c.remove();
  })();
}
const miniBuddy = (cls = "") => `<span class="buddy buddy-inline ${cls}" aria-hidden="true">${BUDDY_SVG}</span>`;

// deps: { store, esc, lively(), lookColors(), myName() }
//   lively(): true when the person's Pictures setting allows confetti and animation.
export function createGame({ store, esc, lively, lookColors, myName }) {
  const dlg = document.createElement("dialog");
  dlg.className = "game";
  dlg.setAttribute("aria-label", "Bible games");
  document.body.append(dlg);
  dlg.addEventListener("close", stopTimer);

  const saved = () => ({ players: [], board: {}, seen: [], sound: true, last: {}, ...(store.get("game") || {}) });
  const save = (patch) => store.set("game", { ...saved(), ...patch });
  const sound = (name) => { if (saved().sound) SOUNDS[name](); };

  let setup = null;   // { mode, players[], scope, count, timer }
  let play = null;    // { players[{name,right,asked}], deck[], turn, q }
  let timer = 0;

  function stopTimer() { clearInterval(timer); timer = 0; }

  function open() {
    const s = saved();
    setup = { mode: "solo", players: [], scope: "all", count: 10, timer: 30, ...s.last };
    setup.players = (setup.players || []).filter(Boolean).slice(0, MAX_PLAYERS);
    renderSetup();
    if (!dlg.open) dlg.showModal();
  }

  function chips(list, current, attr) {
    return list.map(([v, l]) => `<button type="button" class="g-chip" ${attr}="${esc(v)}" aria-pressed="${String(v) === String(current)}">${esc(l)}</button>`).join("");
  }

  function renderSetup() {
    stopTimer();
    const s = saved();
    const together = setup.mode === "group";
    const known = s.players.filter((n) => !setup.players.includes(n));
    const avail = questionsIn(setup.scope).length;
    const board = Object.entries(s.board).map(([name, b]) => ({ name, ...b })).sort((a, b) => b.right - a.right || b.best - a.best).slice(0, 10);
    dlg.innerHTML = `<div class="g-head">${miniBuddy()}<h2>🎲 Bible games</h2><button type="button" class="g-x" data-close aria-label="Close">✕</button></div>
      <div class="g-body">
        <div class="g-seg" role="group" aria-label="How to play">
          <button type="button" data-mode="solo" aria-pressed="${!together}">🙋 Quiz myself</button>
          <button type="button" data-mode="group" aria-pressed="${together}">👨‍👩‍👧‍👦 Play together</button>
        </div>
        ${together ? `<section class="g-sec"><h3>Players or teams <small>(up to ${MAX_PLAYERS})</small></h3>
          <div class="g-add"><input id="gName" maxlength="24" placeholder="Name, like Grandpa or Team Blue" aria-label="Player or team name" autocomplete="off"><button type="button" class="small" id="gAdd">Add</button></div>
          <div class="g-players">${setup.players.map((n, i) => `<span class="g-player">${i + 1}. ${esc(n)}<button type="button" data-drop="${i}" aria-label="Remove ${esc(n)}">✕</button></span>`).join("") || `<span class="muted small-print">Add at least two players or teams.</span>`}</div>
          ${known.length ? `<p class="muted small-print">Tap to add someone who played before:</p><div class="g-chips">${known.map((n) => `<button type="button" class="g-chip" data-known="${esc(n)}">+ ${esc(n)}</button>`).join("")}</div>` : ""}
        </section>` : ""}
        <section class="g-sec"><h3>Which part of the Bible?</h3><div class="g-chips">${chips(SCOPES.map(([id, l]) => [id, l]), setup.scope, "data-scope")}</div>
          <p class="muted small-print">${avail} questions here. ${avail < 30 ? "More are being added." : ""}</p></section>
        <section class="g-sec"><h3>${together ? "Questions for each player" : "How many questions?"}</h3><div class="g-chips">${chips((together ? [3, 5, 10] : [5, 10, 15, 20]).map((n) => [n, String(n)]), setup.count, "data-count")}</div></section>
        <section class="g-sec"><h3>Timer for each question</h3><div class="g-chips">${chips([[0, "No timer"], [15, "15 seconds"], [30, "30 seconds"], [60, "1 minute"]], setup.timer, "data-timer")}</div></section>
        <label class="switch-row"><span>Sound effects<small>Chimes for right answers and a fanfare for a great score</small></span><input type="checkbox" role="switch" id="gSound" ${s.sound ? "checked" : ""}></label>
        <p class="g-err" id="gErr" role="alert"></p>
        <button type="button" class="big-btn" id="gStart">Start the game</button>
        ${board.length ? `<section class="g-sec g-board"><h3>🏆 Leaderboard</h3><ol>${board.map((b) => `<li><strong>${esc(b.name)}</strong><span>${b.right} right · best ${b.best}%${b.wins ? ` · ${b.wins} win${b.wins === 1 ? "" : "s"}` : ""} · ${b.games} game${b.games === 1 ? "" : "s"}</span></li>`).join("")}</ol>
          <button type="button" class="quiet-link" id="gClear">Clear the leaderboard</button></section>` : ""}
      </div>`;
    dlg.querySelector("[data-close]").onclick = () => dlg.close();
    dlg.querySelectorAll("[data-mode]").forEach((b) => (b.onclick = () => { setup.mode = b.dataset.mode; setup.count = setup.mode === "group" ? 5 : 10; renderSetup(); }));
    dlg.querySelectorAll("[data-scope]").forEach((b) => (b.onclick = () => { setup.scope = b.dataset.scope; renderSetup(); }));
    dlg.querySelectorAll("[data-count]").forEach((b) => (b.onclick = () => { setup.count = Number(b.dataset.count); renderSetup(); }));
    dlg.querySelectorAll("[data-timer]").forEach((b) => (b.onclick = () => { setup.timer = Number(b.dataset.timer); renderSetup(); }));
    dlg.querySelector("#gSound").onchange = (e) => save({ sound: e.target.checked });
    const err = dlg.querySelector("#gErr");
    const add = (name) => {
      const n = name.replace(/\s+/g, " ").trim().slice(0, 24);
      if (!n) return;
      if (setup.players.some((p) => p.toLowerCase() === n.toLowerCase())) { err.textContent = `${n} is already playing.`; return; }
      if (setup.players.length >= MAX_PLAYERS) { err.textContent = `Up to ${MAX_PLAYERS} players or teams can play at once.`; return; }
      setup.players.push(n); renderSetup(); dlg.querySelector("#gName")?.focus();
    };
    dlg.querySelector("#gAdd")?.addEventListener("click", () => add(dlg.querySelector("#gName").value));
    dlg.querySelector("#gName")?.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); add(e.target.value); } });
    dlg.querySelectorAll("[data-known]").forEach((b) => (b.onclick = () => add(b.dataset.known)));
    dlg.querySelectorAll("[data-drop]").forEach((b) => (b.onclick = () => { setup.players.splice(Number(b.dataset.drop), 1); renderSetup(); }));
    dlg.querySelector("#gClear")?.addEventListener("click", () => { if (confirm("Clear the leaderboard on this device? Saved names stay.")) { save({ board: {} }); renderSetup(); } });
    dlg.querySelector("#gStart").onclick = () => {
      const names = together ? setup.players : [myName()];
      if (together && names.length < 2) { err.textContent = "Add at least two players or teams, or choose Quiz myself."; return; }
      start(names);
    };
  }

  function start(names) {
    const s = saved();
    const need = setup.count * names.length;
    const deck = dealQuestions(setup.scope, need, s.seen);
    // Remember names (most recent first) and settings for next time.
    const players = [...new Set([...names, ...s.players])].slice(0, 60);
    save({ players: setup.mode === "group" ? players : s.players, last: { mode: setup.mode, players: setup.mode === "group" ? names : [], scope: setup.scope, count: setup.count, timer: setup.timer } });
    const perPlayer = Math.max(1, Math.floor(deck.length / names.length));
    play = { players: names.map((name) => ({ name, right: 0, asked: 0 })), deck: deck.slice(0, perPlayer * names.length), turn: 0, short: deck.length < need };
    showQuestion();
  }

  function showQuestion() {
    stopTimer();
    const q = play.deck[play.turn];
    const who = play.players[play.turn % play.players.length];
    const solo = play.players.length === 1;
    dlg.innerHTML = `<div class="g-head">${miniBuddy("sitting")}<h2>${solo ? `Question ${play.turn + 1} of ${play.deck.length}` : `${esc(who.name)}'s turn`}</h2><button type="button" class="g-x" data-close aria-label="Stop the game">✕</button></div>
      <div class="g-body">
        ${solo ? "" : `<p class="muted small-print">Question ${play.turn + 1} of ${play.deck.length}</p>`}
        ${setup.timer ? `<div class="g-timer" aria-hidden="true"><i></i></div><p class="sr-only" id="gTimeLeft" aria-live="off"></p>` : ""}
        <p class="g-q">${esc(q.q)}</p>
        <div class="g-choices">${q.choices.map((c, i) => `<button type="button" data-pick="${i}">${esc(c)}</button>`).join("")}</div>
        <p class="g-why" role="status"></p>
        <button type="button" class="big-btn" id="gNext" hidden></button>
        ${solo ? "" : `<p class="g-score">${play.players.map((p) => `${esc(p.name)} ${p.right}`).join(" · ")}</p>`}
      </div>`;
    dlg.querySelector("[data-close]").onclick = () => { if (play.turn === 0 || confirm("Stop this game? Scores so far won't be saved.")) { stopTimer(); renderSetup(); } };
    dlg.querySelectorAll("[data-pick]").forEach((b) => (b.onclick = () => answer(Number(b.dataset.pick))));
    if (setup.timer) {
      const bar = dlg.querySelector(".g-timer i"), end = Date.now() + setup.timer * 1000;
      let lastTick = 99;
      timer = setInterval(() => {
        const left = Math.max(0, end - Date.now());
        bar.style.width = `${(left / (setup.timer * 1000)) * 100}%`;
        bar.parentElement.classList.toggle("low", left < 5000);
        const secs = Math.ceil(left / 1000);
        if (secs <= 5 && secs < lastTick && secs > 0) { lastTick = secs; sound("tick"); }
        if (!left) answer(-1);
      }, 100);
    }
  }

  function answer(pick) {
    stopTimer();
    const q = play.deck[play.turn];
    const who = play.players[play.turn % play.players.length];
    if (dlg.querySelector("[data-pick][disabled]")) return;
    const right = pick === q.a;
    who.asked += 1; if (right) who.right += 1;
    dlg.querySelectorAll("[data-pick]").forEach((b) => {
      b.disabled = true;
      const i = Number(b.dataset.pick);
      if (i === q.a) b.classList.add("right");
      else if (i === pick) b.classList.add("wrong");
    });
    sound(right ? "right" : "wrong");
    const mini = dlg.querySelector(".buddy-inline");
    if (right && mini) { mini.classList.remove("sitting"); mini.classList.add("excited"); }
    dlg.querySelector(".g-why").innerHTML = `${pick === -1 ? "⏰ Time's up! " : right ? "✓ Right! " : "Not quite. "}<span>${esc(q.why)}</span>`;
    const next = dlg.querySelector("#gNext");
    const last = play.turn + 1 >= play.deck.length;
    const nextWho = play.players[(play.turn + 1) % play.players.length];
    next.textContent = last ? "See the scores" : play.players.length > 1 ? `Next: ${nextWho.name}'s turn` : "Next question";
    next.hidden = false; next.focus();
    next.onclick = () => { play.turn += 1; if (last) finish(); else showQuestion(); };
  }

  function finish() {
    const s = saved();
    const asked = play.deck.map((q) => q.id);
    const pool = questionsIn(setup.scope).map((q) => q.id);
    let seen = [...new Set([...s.seen, ...asked])];
    if (pool.every((id) => seen.includes(id))) seen = seen.filter((id) => !pool.includes(id)); // all used: start fresh
    save({ seen, board: recordGame(s.board, play.players) });
    const table = standings(play.players);
    const best = table[0];
    const great = best.pct >= 80;
    const solo = play.players.length === 1;
    const winners = table.filter((p) => p.right === best.right);
    dlg.innerHTML = `<div class="g-head">${miniBuddy(great ? "cheering" : "waving")}<h2>${solo ? (great ? "🎉 Wonderful!" : "Well done!") : winners.length > 1 ? "🎉 It's a tie!" : `🎉 ${esc(best.name)} wins!`}</h2><button type="button" class="g-x" data-close aria-label="Close">✕</button></div>
      <div class="g-body">
        ${solo ? `<p class="g-big">${best.right} of ${best.asked}</p><p class="g-pct">${best.pct}% right</p>`
          : `<ol class="g-results">${table.map((p) => `<li class="${p.right === best.right ? "top" : ""}"><span class="g-place">${p.place ? `${p.place}` : "="}</span><strong>${esc(p.name)}</strong><span>${p.right} of ${p.asked} · ${p.pct}%</span></li>`).join("")}</ol>`}
        <p class="muted">${great ? "Your study buddy is cheering for you!" : "Every game helps God's Word take deeper root. Try again with new questions!"}</p>
        ${play.short ? `<p class="muted small-print">This part of the Bible ran out of new questions, so some were shared out evenly. More are being added.</p>` : ""}
        <button type="button" class="big-btn" id="gAgain">Play again with new questions</button>
        <button type="button" class="wb-new" id="gChange">Change players or settings</button>
      </div>`;
    dlg.querySelector("[data-close]").onclick = () => dlg.close();
    dlg.querySelector("#gAgain").onclick = () => start(play.players.map((p) => p.name));
    dlg.querySelector("#gChange").onclick = renderSetup;
    if (great) { sound("cheer"); if (lively()) confetti(dlg, lookColors()); } else sound("done");
  }

  return { open };
}
