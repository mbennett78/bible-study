// Bible games: quiz yourself, or play together with up to 20 players or teams.
// Pick any part of the Bible, how many questions and a timer. Questions are shuffled and
// fresh each game (nothing repeats until a section's questions have all been used), names
// are remembered for the leaderboard, and a great score gets a celebration with sound.
import { BOOKS } from "./books.js";
import { TRIVIA } from "./trivia-bank.js";
import { BUDDY_SVG } from "./buddy.js";

export const MAX_PLAYERS = 20;
const BOOK_NAME = Object.fromEntries(BOOKS.map((b) => [b.id, b.name]));
// Every fourth question is golden: worth double stars.
export const isGolden = (turn) => turn % 4 === 3;
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

// Kinds of questions, like the categories in a trivia app. New questions name their topic;
// older ones are sorted by what they ask (who, where, how many...).
export const TOPICS = [
  ["any", "Any kind", "🎲"],
  ["people", "Bible people", "👤"],
  ["places", "Places", "🗺️"],
  ["numbers", "Numbers and Bible math", "🔢"],
  ["events", "Stories and sayings", "📖"],
  ["books", "Books of the Bible", "📚"],
  ["history", "History and the world", "🏛️"],
  ["science", "Science and the Bible", "🔭"],
  ["arts", "Music, poetry and crafts", "🎨"],
  ["connections", "Old and New connections", "🔗"],
];
export function topicOf(q) {
  if (q.topic) return q.topic;
  if (q.kind === "connection") return "connections";
  if (q.kind === "geography") return "places";
  if (q.kind === "history") return "history";
  const t = q.q;
  if (/^How (many|long|old|much)\b/i.test(t) || q.choices.every((c) => /^\d/.test(c))) return "numbers";
  if (/^Where\b|which (city|town|mountain|river|sea|land|country|place|village|region)\b|^To what (city|place)/i.test(t)) return "places";
  if (/^(Who|Whose|Whom)\b|which (\w+ )?(man|woman|king|queen|prophet|prophetess|apostle|disciple|judge|person|son|brother|priest|helper|leader|ruler|wife|mother|father|sister|daughter|boy|girl)\b|^What was the name of|new name|\bnamed\b/i.test(t)) return "people";
  return "events";
}

// Questions in a part of the Bible (a question counts when every chapter it uses is in that part),
// optionally of one kind.
export function questionsIn(scopeId, topic = "any") {
  const inScope = (SCOPES.find(([id]) => id === scopeId) || SCOPES[0])[2];
  return TRIVIA.filter((q) => q.refs.every((r) => inScope(r.split(".")[0])) && (topic === "any" || topicOf(q) === topic));
}

// Picks `need` questions, unseen ones first, each with its choices shuffled.
export function dealQuestions(scopeId, need, seen = [], topic = "any") {
  const pool = questionsIn(scopeId, topic);
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
    const was = { games: 0, right: 0, asked: 0, wins: 0, best: 0, stars: 0, ...out[key] };
    const pct = p.asked ? Math.round((p.right / p.asked) * 100) : 0;
    out[key] = { games: was.games + 1, right: was.right + p.right, asked: was.asked + p.asked, wins: was.wins + (players.length > 1 && p.right === top ? 1 : 0), best: Math.max(was.best, pct), stars: was.stars + (p.stars || 0) };
  }
  return out;
}

/* ---------- Stars, levels and badges ---------- */
// Up to three stars for a right answer: quicker answers earn more. Without a timer the
// windows are generous, so slower readers still earn stars.
export function starsFor(right, ms, timerSecs = 0) {
  if (!right) return 0;
  if (timerSecs) { const left = 1 - ms / (timerSecs * 1000); return left >= 2 / 3 ? 3 : left >= 1 / 3 ? 2 : 1; }
  return ms <= 8000 ? 3 : ms <= 16000 ? 2 : 1;
}

// Bible scholar levels, reached by collecting stars in Quiz myself.
export const LEVELS = [
  [0, "Seedling", "🌱"], [15, "Sprout", "🌿"], [40, "Lamp Lighter", "🪔"], [80, "Scroll Reader", "📜"],
  [140, "Bible Explorer", "🧭"], [220, "Bible Scholar", "🎓"], [330, "Wise Teacher", "🦉"], [480, "Faithful Sage", "👑"],
];
export function levelFor(stars) {
  let i = 0;
  while (i + 1 < LEVELS.length && stars >= LEVELS[i + 1][0]) i++;
  const [at, name, icon] = LEVELS[i], next = LEVELS[i + 1];
  return { n: i + 1, name, icon, at, next: next ? { at: next[0], name: next[1], icon: next[2] } : null };
}

// Achievements. test(stats) decides each one; stats come from recordSolo.
export const BADGES = [
  ["first", "First game", "🎈", "Finish your first quiz", (s) => s.games >= 1],
  ["perfect", "Perfect score", "💯", "Get every question right", (s) => s.perfect >= 1],
  ["streak5", "On fire", "🔥", "5 right in a row", (s) => s.bestStreak >= 5],
  ["streak10", "Unstoppable", "☄️", "10 right in a row", (s) => s.bestStreak >= 10],
  ["swift", "Swift as Asahel", "⚡", "Three stars on every question of a game (2 Samuel 2:18)", (s) => s.swift >= 1],
  ["q100", "Hundred club", "📚", "Answer 100 questions", (s) => s.answered >= 100],
  ["q500", "Faithful student", "🏛️", "Answer 500 questions", (s) => s.answered >= 500],
  ["goal", "Goal keeper", "🎯", "Reach your weekly goal", (s) => s.goals >= 1],
  ["explorer", "Explorer", "🗺️", "Play every part of the Bible", (s) => SCOPES.every(([id]) => s.scopes.includes(id))],
  ["topics", "Curious mind", "🧩", "Try every kind of question", (s) => TOPICS.every(([id]) => id === "any" || s.topics.includes(id))],
  ["master", "Master of a part", "🏆", "Answer every question in one part of the Bible right", (s) => s.mastery >= 1],
  ["scholar", "Bible Scholar", "🎓", "Reach the Bible Scholar level", (s) => s.stars >= LEVELS[5][0]],
  ["sage", "Faithful Sage", "👑", "Reach the top level", (s) => s.stars >= LEVELS[LEVELS.length - 1][0]],
];

/* ---------- Quiz myself: personal progress ---------- */
// Kept per person (it lives in their own saved data, so each person on a shared tablet has
// their own). mastered: question ids answered right at least once. best: best % per part of
// the Bible. goal: questions a week (0 = no goal). week: { start, n } for the current week.
export const GOALS = [0, 10, 25, 50, 100];
export const emptyProgress = () => ({ mastered: [], best: {}, goal: 0, week: { start: "", n: 0 }, games: 0, stars: 0, answered: 0, perfect: 0, swift: 0, goals: 0, bestStreak: 0, scopes: [], topics: [], badges: {} });
const bestKey = (scopeId, topic = "any") => (topic === "any" ? scopeId : `${scopeId}+${topic}`);

// Monday of this week, as YYYY-MM-DD in local time.
export function weekStart(d = new Date()) {
  const m = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
  return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}-${String(m.getDate()).padStart(2, "0")}`;
}

// How far someone has got in one part of the Bible.
export function scopeProgress(mine, scopeId, topic = "any") {
  const pool = questionsIn(scopeId, topic);
  const got = new Set(mine.mastered);
  return { total: pool.length, mastered: pool.filter((q) => got.has(q.id)).length, best: mine.best[bestKey(scopeId, topic)] ?? null };
}

// Questions answered this week (a new week starts on Monday).
export const thisWeek = (mine, now = new Date()) => (mine.week.start === weekStart(now) ? mine.week.n : 0);

// Adds a finished solo game. results: [{ id, right, stars }]. game: { topic, longest }.
// Returns the new progress and what changed (for the celebration).
export function recordSolo(mine, scopeId, results, now = new Date(), game = {}) {
  const topic = game.topic || "any";
  const was = { ...emptyProgress(), ...mine };
  const right = results.filter((r) => r.right).length;
  const stars = results.reduce((n, r) => n + (r.stars || 0), 0);
  const pct = results.length ? Math.round((right / results.length) * 100) : 0;
  const before = scopeProgress(was, scopeId, topic);
  const key = bestKey(scopeId, topic);
  const weekBefore = thisWeek(was, now);
  const goalReached = Boolean(was.goal) && weekBefore < was.goal && weekBefore + results.length >= was.goal;
  const out = {
    ...was,
    mastered: [...new Set([...was.mastered, ...results.filter((r) => r.right).map((r) => r.id)])],
    games: was.games + 1,
    best: { ...was.best, [key]: Math.max(was.best[key] ?? 0, pct) },
    week: { start: weekStart(now), n: weekBefore + results.length },
    stars: was.stars + stars,
    answered: was.answered + results.length,
    perfect: was.perfect + (results.length && right === results.length ? 1 : 0),
    swift: was.swift + (results.length >= 5 && results.every((r) => (r.speed ?? r.stars) === 3) ? 1 : 0),
    goals: was.goals + (goalReached ? 1 : 0),
    bestStreak: Math.max(was.bestStreak, game.longest || 0),
    scopes: [...new Set([...was.scopes, scopeId])],
    topics: [...new Set([...was.topics, topic])],
  };
  const got = new Set(out.mastered);
  const mastery = SCOPES.filter(([id]) => { const pool = questionsIn(id); return pool.length && pool.every((q) => got.has(q.id)); }).length;
  const newBadges = BADGES.filter(([id, , , , test]) => !was.badges[id] && test({ ...out, mastery })).map(([id]) => id);
  out.badges = { ...was.badges, ...Object.fromEntries(newBadges.map((id) => [id, now.toISOString()])) };
  const after = scopeProgress(out, scopeId, topic);
  const lvBefore = levelFor(was.stars), lvAfter = levelFor(out.stars);
  return {
    mine: out, pct, stars,
    newBest: before.best !== null && pct > before.best,
    firstGame: before.best === null,
    newlyMastered: after.mastered - before.mastered,
    goalReached,
    newBadges,
    levelUp: lvAfter.n > lvBefore.n ? lvAfter : null,
  };
}

// Cheerful words for a right answer, kind words for a miss, and a shout for a run of right answers.
export const CHEERS = ["Right!", "Yes!", "You got it!", "Well done!", "Spot on!", "Amen to that!", "Exactly!", "Nicely done!"];
export const KIND = ["Not quite.", "Good try!", "Close one.", "Now you know!"];
export function streakShout(n) {
  if (n >= 10) return `🔥 ${n} in a row! Unstoppable!`;
  if (n === 7) return "🔥 7 in a row! A perfect number!";
  if (n === 5) return "🔥 5 in a row! On fire!";
  if (n === 3) return "🔥 3 in a row!";
  return "";
}
const pickOne = (list) => list[Math.floor(Math.random() * list.length)];

/* ---------- Sound effects (Web Audio, no files to download) ---------- */
// Quiet, short tones. They follow the device volume, and on iPhone and iPad the silent switch.
let audio = null;
function tone(notes, { type = "sine", gap = 0.12, length = 0.18, volume = 0.18 } = {}) {
  try {
    if (navigator.audioSession) navigator.audioSession.type = "ambient";
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === "suspended") audio.resume();
    // A step can be one note or a chord (several notes at once).
    notes.forEach((step, i) => [].concat(step).forEach((f, k, all) => {
      const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime + i * gap;
      const len = i === notes.length - 1 ? length * 2.2 : length, v = volume / Math.sqrt(all.length);
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + len);
      o.connect(g).connect(audio.destination); o.start(t); o.stop(t + len + 0.05);
    }));
  } catch { /* no sound on this device */ }
}
export const SOUNDS = {
  right: () => tone([784, 1047], { type: "triangle" }),
  wrong: () => tone([220, 196], { type: "sine", gap: 0.15, length: 0.25, volume: 0.12 }),
  tick: () => tone([880], { length: 0.05, volume: 0.05 }),
  tap: () => tone([660, 990], { type: "triangle", gap: 0.06, length: 0.12, volume: 0.12 }),
  streak: () => tone([659, 784, 988, 1319], { type: "triangle", gap: 0.08, length: 0.2 }),
  cheer: () => tone([523, 659, 784, 1047, 784, 1047, 1319], { type: "triangle", gap: 0.11, length: 0.3 }),
  // A game won: a bigger, brighter fanfare in chords, much more than a Quick check gets.
  fanfare: () => { tone([[392, 523], [392, 523], [392, 523], [523, 659, 784], [], [494, 622, 740], [523, 659, 784, 1047]], { type: "triangle", gap: 0.13, length: 0.28, volume: 0.24 }); tone([131, [], [], 165, [], [], 196], { type: "sine", gap: 0.13, length: 0.35, volume: 0.2 }); },
  done: () => tone([523, 659, 784], { type: "triangle", gap: 0.14, length: 0.3, volume: 0.14 }),
};

/* ---------- Confetti in the colors of the current look ---------- */
// Drawn inside the game window (which sits above the rest of the app).
export function confetti(host, colors, count = 140) {
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
/* ---------- Drawn pieces: medals, laurel emblems, stars ---------- */
// Colors come from the look (CSS variables), so every badge matches the theme.
const miniBuddy = (cls = "") => `<span class="buddy buddy-inline ${cls}" aria-hidden="true">${BUDDY_SVG}</span>`;
const GRADIENTS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".45" stop-color="#f2c84b"/><stop offset="1" stop-color="#b9831a"/></linearGradient>
  <radialGradient id="gFace" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f4ead2"/></radialGradient>
</defs></svg>`;
export function medal(icon, { locked = false, fresh = false, label = "" } = {}) {
  return `<span class="medal${locked ? " locked" : ""}${fresh ? " fresh" : ""}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>
    <svg viewBox="0 0 64 80" aria-hidden="true" focusable="false">
      <path class="m-rib" d="M18 44 L10 76 L19 70 L25 78 L32 50 Z"/><path class="m-rib m-rib2" d="M46 44 L54 76 L45 70 L39 78 L32 50 Z"/>
      <circle cx="32" cy="32" r="27" fill="url(#gGold)"/><circle cx="32" cy="32" r="22.5" class="m-face" fill="url(#gFace)"/>
      <circle cx="32" cy="32" r="25" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1" stroke-dasharray="1.5 3"/>
      <ellipse cx="23" cy="17" rx="9" ry="4" fill="#fff" opacity=".45" transform="rotate(-30 23 17)"/>
    </svg><span class="m-ico">${locked ? "🔒" : icon}</span></span>`;
}
function laurel(level) {
  // Two olive branches curving up from the bottom around the medal.
  const leaves = [];
  for (let i = 0; i < 7; i++) {
    const t = ((105 + i * 23) * Math.PI) / 180;
    const x = 60 + Math.cos(t) * 47, y = 60 + Math.sin(t) * 47, rot = 105 + i * 23 + 90 - 25;
    leaves.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="10" ry="4.4" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`);
    leaves.push(`<ellipse cx="${(120 - x).toFixed(1)}" cy="${y.toFixed(1)}" rx="10" ry="4.4" transform="rotate(${180 - rot} ${(120 - x).toFixed(1)} ${y.toFixed(1)})"/>`);
  }
  return `<span class="laurel" aria-hidden="true"><svg viewBox="0 0 120 120" focusable="false"><g class="l-leaves">${leaves.join("")}</g>
    <circle cx="60" cy="60" r="34" fill="url(#gGold)"/><circle cx="60" cy="60" r="28" fill="url(#gFace)"/>
    <ellipse cx="49" cy="42" rx="11" ry="5" fill="#fff" opacity=".5" transform="rotate(-30 49 40)"/></svg>
    <span class="l-ico">${level.icon}</span><span class="l-num">${level.n}</span></span>`;
}
const starRow = (n, of = 3, cls = "") => `<span class="g-stars ${cls}" aria-label="${n} star${n === 1 ? "" : "s"}">${Array.from({ length: of }, (_, i) => `<i class="${i < n ? "on" : ""}" style="--d:${i * 0.12}s">★</i>`).join("")}</span>`;
const bar = (have, of) => `<span class="g-bar" aria-hidden="true"><i style="width:${of ? Math.min(100, Math.round((have / of) * 100)) : 0}%"></i></span>`;
const nameOf = (list, id) => (list.find(([v]) => v === id) || list[0])[1];

// deps: { store, esc, lively(), lookColors(), myName() }
//   lively(): true when the person's Pictures setting allows confetti and animation.
export function createGame({ store, esc, lively, lookColors, myName }) {
  const dlg = document.createElement("dialog");
  dlg.className = "game";
  dlg.setAttribute("aria-label", "Bible games");
  document.body.append(dlg);
  dlg.addEventListener("close", stopTimer);

  const saved = () => { const g = { players: [], board: {}, seen: [], sound: true, last: {}, ...(store.get("game") || {}) }; g.mine = { ...emptyProgress(), ...(g.mine || {}) }; return g; };
  const save = (patch) => store.set("game", { ...saved(), ...patch });
  const sound = (name) => { if (saved().sound) SOUNDS[name](); };
  // Every game screen has a sound switch at the top, next to Close.
  const sndBtn = () => `<button type="button" class="g-snd" data-snd aria-pressed="${saved().sound}" aria-label="Sound effects ${saved().sound ? "on" : "off"}">${saved().sound ? "🔊" : "🔇"}</button>`;
  const paint = (html) => {
    dlg.classList.toggle("still", !lively()); dlg.innerHTML = GRADIENTS + html;
    dlg.querySelector(".g-head .g-x")?.insertAdjacentHTML("beforebegin", sndBtn());
    paintSnd();
  };
  const paintSnd = () => dlg.querySelector("[data-snd]")?.addEventListener("click", (e) => { save({ sound: !saved().sound }); e.currentTarget.outerHTML = sndBtn(); paintSnd(); const g = dlg.querySelector("#gSound"); if (g) g.checked = saved().sound; });

  let setup = null;   // { mode, players[], scope, topic, count, timer }
  let play = null;    // { players[{name,right,asked,stars,streak,longest}], deck[], turn, results[], shownAt }
  let timer = 0;

  function stopTimer() { clearInterval(timer); timer = 0; }

  function open() {
    const s = saved();
    setup = { mode: "solo", players: [], scope: "all", topic: "any", count: 10, timer: 30, ...s.last };
    setup.players = (setup.players || []).filter(Boolean).slice(0, MAX_PLAYERS);
    if (!TOPICS.some(([id]) => id === setup.topic)) setup.topic = "any";
    renderSetup();
    if (!dlg.open) dlg.showModal();
  }

  function chips(list, current, attr) {
    return list.map(([v, l, icon]) => `<button type="button" class="g-chip" ${attr}="${esc(v)}" aria-pressed="${String(v) === String(current)}">${icon ? `<span aria-hidden="true">${icon}</span> ` : ""}${esc(l)}</button>`).join("");
  }

  // Quiz myself: level, this week's goal, progress in this part of the Bible, and badges.
  function progressCard(mine) {
    const n = thisWeek(mine), goal = mine.goal;
    const lv = levelFor(mine.stars);
    const here = scopeProgress(mine, setup.scope, setup.topic);
    const label = nameOf(SCOPES, setup.scope) + (setup.topic === "any" ? "" : ` · ${nameOf(TOPICS, setup.topic)}`);
    const earned = BADGES.filter(([id]) => mine.badges[id]).length;
    const rows = SCOPES.map(([id, l]) => { const p = scopeProgress(mine, id); return `<li><span>${esc(l)}</span>${bar(p.mastered, p.total)}<small>${p.mastered} of ${p.total}${p.best !== null ? ` · best ${p.best}%` : ""}</small></li>`; }).join("");
    return `<section class="g-sec g-mine">
      <div class="g-level">${laurel(lv)}<div class="g-lv-text">
        <p class="g-lv-name">Level ${lv.n} · ${esc(lv.name)}</p>
        <p class="g-lv-stars"><span class="g-star-ico" aria-hidden="true">★</span> ${mine.stars} star${mine.stars === 1 ? "" : "s"}${lv.next ? ` · ${lv.next.at - mine.stars} more to ${esc(lv.next.name)} ${lv.next.icon}` : " · the top level!"}</p>
        ${lv.next ? bar(mine.stars - lv.at, lv.next.at - lv.at) : bar(1, 1)}
      </div></div>
      ${goal ? `<p class="g-goal-line"><strong>This week:</strong> ${Math.min(n, goal)} of ${goal} questions${n >= goal ? " ✓ Goal reached!" : ""}</p>${bar(n, goal)}` : ""}
      <p class="g-goal-line"><strong>${esc(label)}:</strong> ${here.mastered} of ${here.total} questions answered right${here.best !== null ? ` · best score ${here.best}%` : ""}</p>${bar(here.mastered, here.total)}
      <details class="g-all g-badges-box"><summary>🏅 My badges (${earned} of ${BADGES.length})</summary>
        <ul class="g-badges">${BADGES.map(([id, name, icon, how]) => `<li class="${mine.badges[id] ? "won" : ""}">${medal(icon, { locked: !mine.badges[id] })}<strong>${esc(name)}</strong><small>${esc(how)}</small></li>`).join("")}</ul></details>
      <details class="g-all"><summary>📈 Every part of the Bible</summary><ul>${rows}</ul></details>
      <details class="g-all g-goal-box"><summary>🎯 My weekly goal${goal ? `: ${goal} questions` : ""}</summary>
        <div class="g-chips" role="group" aria-label="Weekly goal">${chips(GOALS.map((g) => [g, g ? `${g} a week` : "No goal"]), goal, "data-goal")}</div>
        ${!goal && n ? `<p class="muted small-print">${n} question${n === 1 ? "" : "s"} answered this week.</p>` : ""}
        <button type="button" class="quiet-link" id="gResetMine">Start my progress over</button>
      </details>
    </section>`;
  }

  function renderSetup() {
    stopTimer();
    const s = saved();
    const together = setup.mode === "group";
    const known = s.players.filter((n) => !setup.players.includes(n));
    const avail = questionsIn(setup.scope, setup.topic).length;
    const board = Object.entries(s.board).map(([name, b]) => ({ name, stars: 0, ...b })).sort((a, b) => b.right - a.right || b.best - a.best).slice(0, 10);
    paint(`<div class="g-head">${miniBuddy()}<h2>🎲 Bible games</h2><button type="button" class="g-x" data-close aria-label="Close">✕</button></div>
      <div class="g-body">
        <div class="g-seg" role="group" aria-label="How to play">
          <button type="button" data-mode="solo" aria-pressed="${!together}">🙋 Quiz myself</button>
          <button type="button" data-mode="group" aria-pressed="${together}">👨‍👩‍👧‍👦 Play together</button>
        </div>
        ${together ? "" : progressCard(s.mine)}
        ${together ? `<section class="g-sec"><h3>Players or teams <small>(up to ${MAX_PLAYERS})</small></h3>
          <div class="g-add"><input id="gName" maxlength="24" placeholder="Name, like Grandpa or Team Blue" aria-label="Player or team name" autocomplete="off"><button type="button" class="small" id="gAdd">Add</button></div>
          <div class="g-players">${setup.players.map((n, i) => `<span class="g-player">${i + 1}. ${esc(n)}<button type="button" data-drop="${i}" aria-label="Remove ${esc(n)}">✕</button></span>`).join("") || `<span class="muted small-print">Add at least two players or teams.</span>`}</div>
          ${known.length ? `<p class="muted small-print">Tap to add someone who played before:</p><div class="g-chips">${known.map((n) => `<button type="button" class="g-chip" data-known="${esc(n)}">+ ${esc(n)}</button>`).join("")}</div>` : ""}
        </section>` : ""}
        <section class="g-sec"><h3>Which part of the Bible?</h3><div class="g-chips">${chips(SCOPES.map(([id, l]) => [id, l]), setup.scope, "data-scope")}</div></section>
        <section class="g-sec"><h3>What kind of questions?</h3><div class="g-chips g-topics">${chips(TOPICS, setup.topic, "data-topic")}</div>
          <p class="muted small-print" id="gAvail">${avail ? `${avail} question${avail === 1 ? "" : "s"} here.${avail < 30 ? " More are being added." : ""}` : "No questions of this kind in this part yet. Try the Whole Bible or Any kind."}</p></section>
        <section class="g-sec"><h3>${together ? "Questions for each player" : "How many questions?"}</h3><div class="g-chips">${chips((together ? [3, 5, 10] : [5, 10, 15, 20]).map((n) => [n, String(n)]), setup.count, "data-count")}</div></section>
        <section class="g-sec"><h3>Timer for each question</h3><div class="g-chips">${chips([[0, "No timer"], [15, "15 seconds"], [30, "30 seconds"], [60, "1 minute"]], setup.timer, "data-timer")}</div>
          <p class="muted small-print">★★★ Quick answers earn up to three stars${setup.timer ? "." : ", with plenty of time to read."}</p></section>
        <label class="switch-row"><span>Sound effects<small>Chimes for right answers and a fanfare for a great score</small></span><input type="checkbox" role="switch" id="gSound" ${s.sound ? "checked" : ""}></label>
        <p class="g-err" id="gErr" role="alert"></p>
        <button type="button" class="big-btn" id="gStart">Start the game</button>
        ${board.length ? `<section class="g-sec g-board"><h3>🏆 Leaderboard</h3><ol>${board.map((b) => `<li><strong>${esc(b.name)}</strong><span>${b.right} right${b.stars ? ` · ★ ${b.stars}` : ""} · best ${b.best}%${b.wins ? ` · ${b.wins} win${b.wins === 1 ? "" : "s"}` : ""} · ${b.games} game${b.games === 1 ? "" : "s"}</span></li>`).join("")}</ol>
          <button type="button" class="quiet-link" id="gClear">Clear the leaderboard</button></section>` : ""}
      </div>`);
    dlg.querySelector("[data-close]").onclick = () => dlg.close();
    dlg.querySelectorAll("[data-mode]").forEach((b) => (b.onclick = () => { setup.mode = b.dataset.mode; setup.count = setup.mode === "group" ? 5 : 10; renderSetup(); }));
    dlg.querySelectorAll("[data-scope]").forEach((b) => (b.onclick = () => { setup.scope = b.dataset.scope; renderSetup(); }));
    dlg.querySelectorAll("[data-topic]").forEach((b) => (b.onclick = () => { setup.topic = b.dataset.topic; renderSetup(); }));
    dlg.querySelectorAll("[data-count]").forEach((b) => (b.onclick = () => { setup.count = Number(b.dataset.count); renderSetup(); }));
    dlg.querySelectorAll("[data-timer]").forEach((b) => (b.onclick = () => { setup.timer = Number(b.dataset.timer); renderSetup(); }));
    dlg.querySelectorAll("[data-goal]").forEach((b) => (b.onclick = () => { save({ mine: { ...saved().mine, goal: Number(b.dataset.goal) } }); renderSetup(); dlg.querySelector(".g-goal-box").open = true; }));
    dlg.querySelector("#gResetMine")?.addEventListener("click", () => { if (confirm("Start your quiz progress over? Your stars, level, badges and best scores will be cleared. The leaderboard stays.")) { save({ mine: { ...emptyProgress(), goal: saved().mine.goal } }); renderSetup(); } });
    dlg.querySelector("#gSound").onchange = (e) => { save({ sound: e.target.checked }); const b = dlg.querySelector("[data-snd]"); if (b) { b.outerHTML = sndBtn(); paintSnd(); } };
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
      if (!avail) { err.textContent = "There are no questions of that kind in this part of the Bible yet. Pick another."; return; }
      start(names);
    };
  }

  function start(names) {
    const s = saved();
    const need = setup.count * names.length;
    const deck = dealQuestions(setup.scope, need, s.seen, setup.topic);
    // Remember names (most recent first) and settings for next time.
    const players = [...new Set([...names, ...s.players])].slice(0, 60);
    save({ players: setup.mode === "group" ? players : s.players, last: { mode: setup.mode, players: setup.mode === "group" ? names : [], scope: setup.scope, topic: setup.topic, count: setup.count, timer: setup.timer } });
    const perPlayer = Math.max(1, Math.floor(deck.length / names.length));
    play = { players: names.map((name) => ({ name, right: 0, asked: 0, stars: 0, streak: 0, longest: 0, fifty: 1, hint: 1 })), deck: deck.slice(0, perPlayer * names.length), turn: 0, short: deck.length < need, results: [] };
    showQuestion();
  }

  function showQuestion() {
    stopTimer();
    const q = play.deck[play.turn];
    const who = play.players[play.turn % play.players.length];
    const solo = play.players.length === 1;
    const topicIcon = (TOPICS.find(([id]) => id === topicOf(q)) || TOPICS[0])[2];
    const golden = isGolden(play.turn);
    paint(`<div class="g-head">${miniBuddy("sitting")}<h2>${solo ? `Question ${play.turn + 1} of ${play.deck.length}` : `${esc(who.name)}'s turn`}</h2><button type="button" class="g-x" data-close aria-label="Stop the game">✕</button></div>
      <div class="g-body g-play">
        <div class="g-meta">${solo ? `<span class="g-dots" aria-hidden="true">${play.deck.map((_, i) => `<i class="${i < play.turn ? (play.results[i]?.right ? "r" : "w") : i === play.turn ? "now" : ""}"></i>`).join("")}</span>` : `<span class="muted small-print">Question ${play.turn + 1} of ${play.deck.length}</span>`}
          <span class="g-speed" title="Answer quickly for more stars">${starRow(3)}</span></div>
        ${setup.timer ? `<div class="g-timer" aria-hidden="true"><i></i></div>` : ""}
        ${golden ? `<p class="g-golden-tag">✨ Golden question: double stars!</p>` : ""}
        <div class="g-card${golden ? " is-golden" : ""}"><span class="g-topic" aria-hidden="true">${topicIcon}</span><p class="g-q">${esc(q.q)}</p></div>
        <div class="g-helps" role="group" aria-label="Helpers, one of each per game">
          <button type="button" class="g-help" data-help="fifty" ${who.fifty ? "" : "disabled"}>✂️ 50:50<small>${who.fifty ? "Take away two" : "Used"}</small></button>
          <button type="button" class="g-help" data-help="hint" ${who.hint ? "" : "disabled"}>${miniBuddy("sitting")} Ask Pip<small>${who.hint ? "Where to look" : "Used"}</small></button>
        </div>
        <div class="g-choices">${q.choices.map((c, i) => `<button type="button" data-pick="${i}" style="--i:${i}"><span class="g-letter" aria-hidden="true">${"ABCD"[i]}</span><span class="g-choice">${esc(c)}</span></button>`).join("")}</div>
        <p class="g-why" role="status"></p>
        <button type="button" class="big-btn" id="gNext" hidden></button>
        ${solo ? "" : `<p class="g-score">${play.players.map((p) => `${esc(p.name)} ${p.right}${p.stars ? ` <span class="g-star-ico" aria-label="stars">★</span>${p.stars}` : ""}`).join(" · ")}</p>`}
      </div>`);
    dlg.querySelector("[data-close]").onclick = () => { if (play.turn === 0 || confirm("Stop this game? Scores so far won't be saved.")) { stopTimer(); renderSetup(); } };
    dlg.querySelectorAll("[data-pick]").forEach((b) => (b.onclick = () => answer(Number(b.dataset.pick))));
    // Helpers: 50:50 takes away two wrong answers; Pip tells you which chapter it's from.
    dlg.querySelectorAll("[data-help]").forEach((b) => (b.onclick = () => {
      if (dlg.querySelector("[data-pick][disabled]:not(.gone)")) return;
      if (b.dataset.help === "fifty" && who.fifty) {
        who.fifty = 0;
        const wrong = [...dlg.querySelectorAll("[data-pick]")].filter((x) => Number(x.dataset.pick) !== q.a);
        wrong.sort(() => Math.random() - 0.5).slice(0, Math.max(0, wrong.length - 1)).forEach((x) => { x.disabled = true; x.classList.add("gone"); });
      }
      if (b.dataset.help === "hint" && who.hint) {
        who.hint = 0;
        const where = [...new Set(q.refs.map((r) => { const [bk, ch] = r.split("."); return `${BOOK_NAME[bk]} ${ch}`; }))].join(" or ");
        // When the question already names the chapter, Pip gives the answer's first letter instead.
        const named = q.refs.some((r) => q.q.includes(BOOK_NAME[r.split(".")[0]]));
        const first = String(q.choices[q.a]).replace(/^[^A-Za-z0-9]+/, "")[0] || "";
        dlg.querySelector(".g-why").innerHTML = `<strong>Pip says:</strong> <span>${named ? `The answer starts with "${esc(first.toUpperCase())}".` : `Think about ${esc(where)}.`}</span>`;
      }
      b.disabled = true; b.querySelector("small").textContent = "Used";
      sound("tap");
    }));
    if (golden) sound("streak");
    play.shownAt = Date.now();
    const bar = dlg.querySelector(".g-timer i"), speed = dlg.querySelectorAll(".g-speed i");
    const end = play.shownAt + setup.timer * 1000;
    let lastTick = 99;
    timer = setInterval(() => {
      const ms = Date.now() - play.shownAt;
      const can = starsFor(true, ms, setup.timer);
      speed.forEach((s, i) => s.classList.toggle("on", i < can));
      if (!setup.timer) return;
      const left = Math.max(0, end - Date.now());
      bar.style.width = `${(left / (setup.timer * 1000)) * 100}%`;
      bar.parentElement.classList.toggle("low", left < 5000);
      const secs = Math.ceil(left / 1000);
      if (secs <= 5 && secs < lastTick && secs > 0) { lastTick = secs; sound("tick"); }
      if (!left) answer(-1);
    }, 100);
  }

  function answer(pick) {
    if (dlg.querySelector("[data-pick][disabled]:not(.gone)")) return;
    stopTimer();
    dlg.querySelectorAll("[data-help]").forEach((b) => { b.disabled = true; });
    const q = play.deck[play.turn];
    const who = play.players[play.turn % play.players.length];
    const right = pick === q.a;
    const golden = isGolden(play.turn);
    const stars = starsFor(right, Date.now() - play.shownAt, setup.timer) * (golden ? 2 : 1);
    who.asked += 1; if (right) who.right += 1;
    who.stars += stars;
    who.streak = right ? who.streak + 1 : 0; who.longest = Math.max(who.longest, who.streak);
    play.results.push({ id: q.id, right, stars, speed: golden ? stars / 2 : stars, golden });
    const shout = right ? streakShout(who.streak) : "";
    dlg.querySelectorAll("[data-pick]").forEach((b) => {
      b.disabled = true;
      const i = Number(b.dataset.pick);
      if (i === q.a) b.classList.add("right");
      else if (i === pick) b.classList.add("wrong");
    });
    sound(shout ? "streak" : right ? "right" : "wrong");
    const mini = dlg.querySelector(".buddy-inline");
    if (mini) { mini.classList.remove("sitting"); mini.classList.add(shout ? "cheering" : right ? "excited" : "waving"); }
    if (shout && who.streak >= 5 && lively()) confetti(dlg, lookColors(), 60);
    dlg.querySelector(".g-speed").innerHTML = right ? starRow(Math.min(stars, 6), golden ? 6 : 3, "won") : "";
    if (right && golden && lively()) confetti(dlg, ["#f6c445", "#ffd970", "#e0a82e", "#fff3c4"], 50);
    dlg.querySelector(".g-why").innerHTML = `${shout ? `<strong class="g-streak">${shout}</strong> ` : ""}${pick === -1 ? "⏰ Time's up! " : right ? `✓ ${pickOne(CHEERS)} ${golden ? "Double stars! " : stars === 3 ? "Speedy! " : ""}` : `${pickOne(KIND)} `}${right ? "" : `The answer: <b>${esc(q.choices[q.a])}</b>. `}<span>${esc(q.why)}</span>`;
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
    const pool = questionsIn(setup.scope, setup.topic).map((q) => q.id);
    let seen = [...new Set([...s.seen, ...asked])];
    if (pool.every((id) => seen.includes(id))) seen = seen.filter((id) => !pool.includes(id)); // all used: start fresh
    const solo = play.players.length === 1;
    const got = solo ? recordSolo(s.mine, setup.scope, play.results, new Date(), { topic: setup.topic, longest: play.players[0].longest }) : null;
    save({ seen, board: recordGame(s.board, play.players), ...(got ? { mine: got.mine } : {}) });
    const table = standings(play.players);
    const best = table[0];
    const great = best.pct >= 80;
    const winners = table.filter((p) => p.right === best.right);
    const here = got && scopeProgress(got.mine, setup.scope, setup.topic);
    const label = nameOf(SCOPES, setup.scope) + (setup.topic === "any" ? "" : ` · ${nameOf(TOPICS, setup.topic)}`);
    const mineNotes = got ? [
      best.longest >= 3 && `🔥 Longest run: ${best.longest} in a row.`,
      got.newBest && `⭐ New personal best for ${esc(label)}!`,
      got.goalReached && `🎯 You reached your goal of ${got.mine.goal} questions this week!`,
      `${esc(label)}: ${here.mastered} of ${here.total} questions answered right${got.newlyMastered ? ` (${got.newlyMastered} new today)` : ""}.`,
      got.mine.goal && !got.goalReached && `This week: ${Math.min(thisWeek(got.mine), got.mine.goal)} of ${got.mine.goal} questions${thisWeek(got.mine) >= got.mine.goal ? " ✓" : ""}.`,
    ].filter(Boolean) : [];
    const hot = !solo && [...play.players].sort((a, b) => b.longest - a.longest)[0];
    const lv = got && levelFor(got.mine.stars);
    const fresh = got ? BADGES.filter(([id]) => got.newBadges.includes(id)) : [];
    const celebrate = great || (got && (got.newBest || got.goalReached || got.levelUp || fresh.length));
    paint(`<div class="g-head">${miniBuddy(celebrate ? "cheering" : "waving")}<h2>${solo ? (great ? "🎉 Wonderful!" : got.levelUp ? "🎉 Level up!" : "Well done!") : winners.length > 1 ? "🎉 It's a tie!" : `🎉 ${esc(best.name)} wins!`}</h2><button type="button" class="g-x" data-close aria-label="Close">✕</button></div>
      <div class="g-body g-done">
        ${solo ? `<p class="g-big">${best.right} of ${best.asked}</p><p class="g-pct">${best.pct}% right</p>
          <p class="g-won-stars"><span class="g-star-ico big" aria-hidden="true">★</span> <strong>${got.stars}</strong> star${got.stars === 1 ? "" : "s"} earned</p>
          ${got.levelUp ? `<div class="g-levelup">${laurel(got.levelUp)}<p>You're now a <strong>${esc(got.levelUp.name)}</strong>!</p></div>`
            : `<div class="g-level small">${laurel(lv)}<div class="g-lv-text"><p class="g-lv-name">Level ${lv.n} · ${esc(lv.name)}</p>${lv.next ? `<p class="g-lv-stars">${lv.next.at - got.mine.stars} more stars to ${esc(lv.next.name)} ${lv.next.icon}</p>${bar(got.mine.stars - lv.at, lv.next.at - lv.at)}` : ""}</div></div>`}
          ${fresh.length ? `<div class="g-new-badges"><p><strong>New badge${fresh.length === 1 ? "" : "s"}!</strong></p><ul class="g-badges">${fresh.map(([, name, icon, how], i) => `<li class="won" style="--d:${0.3 + i * 0.25}s">${medal(icon, { fresh: true })}<strong>${esc(name)}</strong><small>${esc(how)}</small></li>`).join("")}</ul></div>` : ""}
          ${mineNotes.length ? `<ul class="g-mine-notes">${mineNotes.map((t) => `<li>${t}</li>`).join("")}</ul>` : ""}`
          : `<ol class="g-results">${table.map((p) => `<li class="${p.right === best.right ? "top" : ""}"><span class="g-place">${p.place ? `${p.place}` : "="}</span><strong>${esc(p.name)}</strong><span>${p.right} of ${p.asked} · ${p.pct}%${p.stars ? ` · <span class="g-star-ico" aria-hidden="true">★</span> ${p.stars}` : ""}</span></li>`).join("")}</ol>`}
        ${hot && hot.longest >= 3 ? `<p class="g-hot">🔥 Hottest streak: ${esc(hot.name)}, ${hot.longest} in a row</p>` : ""}
        <p class="muted">${celebrate ? "Your study buddy is cheering for you!" : "Every game helps God's Word take deeper root. Try again with new questions!"}</p>
        ${play.short ? `<p class="muted small-print">This part of the Bible ran out of new questions, so some were shared out evenly. More are being added.</p>` : ""}
        <button type="button" class="big-btn" id="gAgain">Play again with new questions</button>
        <button type="button" class="wb-new" id="gChange">Change players or settings</button>
      </div>`);
    dlg.querySelector("[data-close]").onclick = () => dlg.close();
    dlg.querySelector("#gAgain").onclick = () => start(play.players.map((p) => p.name));
    dlg.querySelector("#gChange").onclick = renderSetup;
    if (celebrate) { sound("fanfare"); if (lively()) confetti(dlg, lookColors()); } else sound("done");
  }

  return { open };
}
