// Bible Spin: the main Bible game. Spin the wheel, answer before the candle burns down,
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
// Extras that make it feel like a real game show:
//   - The lamp: every right answer adds oil. When the lamp is full (three right), you choose
//     any jewel you still need and get one question for it.
//   - Streaks: 3, 5 and 10 right in a row earn bonus coins.
//   - Bonus round: every sixth question, three quick questions for extra coins (no hearts lost).
//   - The wheel's friends react: each one has something to say, and they cheer your jewels.
//
// Coins (saved per person) buy small helps in Solo and Challenge Buddy: take away two wrong
// answers, or more time. Family games have no helps, so they stay fair.
import { TRIVIA } from "./trivia-bank.js";
import { topicOf, SOUNDS, medal, confetti } from "./game.js";
import { BUDDY_SVG } from "./buddy.js";

// Each category has its own character: an original, playful cast with a name and a personality.
export const CATEGORIES = [
  { id: "people", name: "People", icon: "👤", color: "#e8634a", topics: ["people"], who: "Rosie", about: "knows everybody's name and loves a good family tree",
    cheer: ["You know your people! 🥰", "Ooh, I'd love to meet them someday!", "Name-remembering champion!"], comfort: ["Even I mix up my cousins sometimes!", "Now you've met someone new. 😊"] },
  { id: "places", name: "Places", icon: "🗺️", color: "#2f8fd0", topics: ["places"], who: "Trek", about: "always has a map out and a bag packed",
    cheer: ["Right on the map! 📍", "You'd make a great guide!", "Pack your bags, you know the way!"], comfort: ["Took a wrong turn. Happens to explorers!", "Now we know where to go next time."] },
  { id: "stories", name: "Stories & Miracles", icon: "✨", color: "#4fae4a", topics: ["events"], who: "Sprout", about: "gasps at every miracle, every single time",
    cheer: ["Wow, wow, WOW! ✨", "That's one of my favorite stories!", "Tell it again!"], comfort: ["Ooh, now you know the story!", "Every story is better the second time."] },
  { id: "stem", name: "STEM", icon: "🔬", color: "#f2a516", topics: ["science", "numbers"], who: "Bolt", about: "counts everything, even the stars",
    cheer: ["Calculated! 🔢", "Your brain is buzzing! ⚡", "Exactly right, to the decimal!"], comfort: ["Close! Let's measure again.", "Every scientist learns from a miss."] },
  { id: "books", name: "Books & Verses", icon: "📜", color: "#9b5fc7", topics: ["books", "connections"], who: "Quill", about: "is a bookworm who quotes a verse for everything",
    cheer: ["Chapter and verse! 📖", "You know your Bible!", "That deserves a bookmark!"], comfort: ["Let's look that one up together.", "Now it's written on your heart."] },
  { id: "history", name: "History", icon: "🏛️", color: "#e0457b", topics: ["history"], who: "Dusty", about: "digs up old treasures and clues from long ago",
    cheer: ["You dug up the answer! ⛏️", "A real history detective!", "That's a treasure!"], comfort: ["Even old clues get dusty.", "Now that's a fact you'll keep."] },
  { id: "arts", name: "Arts & Music", icon: "🎨", color: "#15b3a6", topics: ["arts"], who: "Harper", about: "hums the Psalms and plays a little harp",
    cheer: ["That's music to my ears! 🎶", "Beautiful! 🎨", "Sing it again!"], comfort: ["Every song has a wrong note sometimes.", "Now you know the tune!"] },
];
export const NEED_PER_JEWEL = 2;   // right answers in a category to win its jewel
export const CANDLE_SECS = 20;
export const HEARTS = 3;
export const MAX_ROUNDS = 40;      // a family game always ends
export const BUDDY_LEVELS = [["easy", "Easy", 0.5], ["fair", "Fair", 0.65], ["tough", "Tough", 0.78]];
export const LAMP_FULL = 3;         // right answers that fill the lamp
export const STREAK_REWARDS = [[3, "Hot streak!", 10], [5, "On fire!", 20], [10, "Unstoppable!", 50]];
export const BONUS_EVERY = 6, BONUS_QS = 3, BONUS_SECS = 10, BONUS_COINS = 20;
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
// A finish-the-verse question ("...like a ___ years.") belongs with Quill's Books & Verses,
// even when the practice quiz files it under Stories and sayings.
const isVerseBlank = (q) => !q.topic && /^["“]/.test(q.q) && /_{2,}/.test(q.q);
export const categoryOf = (q) => (isVerseBlank(q) ? CATEGORIES.find((c) => c.id === "books") : CATEGORIES.find((c) => c.topics.includes(topicOf(q)))) || CATEGORIES[2];
export const questionsFor = (catId) => TRIVIA.filter((q) => categoryOf(q).id === catId);
// A question from this category the person hasn't seen lately (or any, once all are seen).
export function pickQuestion(catId, seen = [], rand = Math.random, reported = []) {
  const all = questionsFor(catId).filter((q) => !reported.includes(q.id));
  const fresh = all.filter((q) => !seen.includes(q.id));
  const pool = fresh.length ? fresh : all;
  return pool[Math.floor(rand() * pool.length)];
}
// Levels: every right answer counts. Level n needs 10 × (1 + 2 + … + (n − 1)) right answers,
// so early levels come quickly and later ones take real play.
export const LEVEL_TITLES = ["Seeker", "Learner", "Reader", "Scribe", "Teacher", "Scholar", "Sage", "Wise elder"];
export function levelOf(right = 0) {
  let n = 1;
  while (right >= 5 * n * (n + 1)) n++;
  const from = 5 * (n - 1) * n, to = 5 * n * (n + 1);
  return { n, title: LEVEL_TITLES[Math.min(n - 1, LEVEL_TITLES.length - 1)], into: right - from, need: to - from };
}
// Daily missions: three a day, the same all day, with coins for each one done.
export const MISSIONS = [
  { id: "answer10", goal: 10, text: "Answer 10 questions" },
  { id: "right8", goal: 8, text: "Get 8 right" },
  { id: "streak3", goal: 1, text: "Get 3 right in a row" },
  { id: "jewel2", goal: 2, text: "Win 2 jewels" },
  { id: "bonus", goal: 1, text: "Play a bonus round" },
  { id: "lamp", goal: 1, text: "Fill the lamp and win a jewel with it" },
  { id: "fast5", goal: 5, text: "Answer 5 right with more than half the candle left" },
  { id: "buddy", goal: 1, text: "Beat Buddy at any level" },
  ...CATEGORIES.map((c) => ({ id: `cat-${c.id}`, goal: 3, text: `Get 3 right in ${c.name} with ${c.who}` })),
];
export const MISSION_COINS = 30;
export function missionsFor(day) {
  let h = 7;
  for (const ch of day) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const list = [...MISSIONS], out = [];
  while (out.length < 3) { h = (h * 1103515245 + 12345) >>> 0; const i = h % list.length; out.push(list.splice(i, 1)[0]); }
  return out.map((m) => ({ id: m.id, goal: m.goal, have: 0 }));
}
// The daily treasure chest: 20 to 50 coins, plus 10 for each day in a row (up to a week).
export function chestCoins(daysInRow, rand = Math.random) { return 20 + Math.floor(rand() * 4) * 10 + Math.min(7, Math.max(1, daysInRow)) * 10; }
// Family duels: two people on their own devices play the same 10 questions in the same order:
// one from every category, plus three more. No helps, so it's fair. A right answer scores 10,
// plus up to 10 for speed, so a tie on right answers goes to the quicker player.
export const DUEL_QS = 10;
export function duelQuestions(rand = Math.random, reported = []) {
  const cats = CATEGORIES.map((c) => c.id);
  while (cats.length < DUEL_QS) cats.push(CATEGORIES[Math.floor(rand() * CATEGORIES.length)].id);
  for (let i = cats.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [cats[i], cats[j]] = [cats[j], cats[i]]; }
  const ids = [];
  for (const c of cats) {
    const pool = questionsFor(c).filter((q) => !reported.includes(q.id) && !ids.includes(q.id));
    ids.push(pool[Math.floor(rand() * pool.length)].id);
  }
  return ids;
}
export const duelPoints = (right, msLeft, totalMs) => (right ? 10 + Math.round(10 * Math.max(0, Math.min(1, msLeft / totalMs))) : 0);
// One duel as I see it: whose turn, and who won once both have played.
export function duelView(d, uid) {
  const me = d.from_id === uid ? "from" : "to", them = me === "from" ? "to" : "from";
  const mine = d[`${me}_score`], theirs = d[`${them}_score`];
  const rights = (s) => (s || "").split("").filter((c) => c === "1").length;
  const v = { id: d.id, them: d[`${them}_name`], challenger: me === "from", mine, theirs, myRight: rights(d[`${me}_marks`]), theirRight: rights(d[`${them}_marks`]), myMarks: d[`${me}_marks`] || "", theirMarks: d[`${them}_marks`] || "" };
  v.state = mine == null ? "play" : theirs == null ? "waiting" : "done";
  if (v.state === "done") v.result = mine > theirs ? "win" : mine < theirs ? "lose" : "tie";
  return v;
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
export const newPlayer = (name, kind = "person") => ({ name, kind, jewels: {}, progress: {}, coins: 0, right: 0, asked: 0, streak: 0, longest: 0, hearts: HEARTS, lamp: 0 });
export const missingJewels = (p) => CATEGORIES.filter((c) => !p.jewels[c.id]);
// A person (not Buddy) gets a bonus round after every sixth question they answer.
export const bonusDue = (p) => p.kind === "person" && p.asked > 0 && p.asked % BONUS_EVERY === 0;
export const jewelCount = (p) => CATEGORIES.filter((c) => p.jewels[c.id]).length;
// Record one answer. Returns what happened: { jewel, won, out, streak }.
// A "jewel try" (from a full lamp) wins the jewel with one right answer.
export function answer(game, player, catId, right, coins = 0, { jewelTry = false } = {}) {
  player.asked++;
  game.rounds = (game.rounds || 0) + 1;
  let jewel = false, streak = null;
  if (right) {
    player.right++; player.streak++; player.longest = Math.max(player.longest, player.streak); player.coins += coins;
    if (!player.jewels[catId]) {
      player.progress[catId] = jewelTry ? NEED_PER_JEWEL : (player.progress[catId] || 0) + 1;
      if (player.progress[catId] >= NEED_PER_JEWEL) { player.jewels[catId] = true; jewel = true; player.coins += 25; }
    }
    const sr = STREAK_REWARDS.find(([n]) => n === player.streak);
    if (sr) { streak = { label: sr[1], coins: sr[2] }; player.coins += sr[2]; }
  } else {
    player.streak = 0;
    if (game.mode === "solo") player.hearts--;
  }
  player.lamp = jewelTry ? 0 : right ? Math.min(LAMP_FULL, (player.lamp || 0) + 1) : player.lamp || 0;
  const won = jewelCount(player) === CATEGORIES.length;
  const out = game.mode === "solo" ? player.hearts <= 0 : false;
  return { jewel, won, out, streak, over: won || out || (game.mode !== "solo" && game.rounds >= MAX_ROUNDS) };
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
const MOUTH = {
  "": '<path d="M42 73 Q50 81 58 73" fill="none" stroke="#1d2550" stroke-width="3" stroke-linecap="round"/>',
  happy: '<path d="M39 70 Q50 88 61 70 Z" fill="#1d2550"/><path d="M44 78 Q50 83 56 78" fill="#ff7aa8"/>',
  sad: '<path d="M42 79 Q50 71 58 79" fill="none" stroke="#1d2550" stroke-width="3" stroke-linecap="round"/><path class="qcr-tear" d="M30 64 Q27 70 30 73 Q33 70 30 64Z" fill="#8fd3ff"/>',
};
export const critter = (c, cls = "", i = 0, mood = "") => `<span class="q-critter ${cls}" style="--cc:${c.color};--i:${i}" aria-hidden="true">
  <svg viewBox="0 0 100 100"><g class="qcr-body">${CRITTER_BODY[c.id] || CRITTER_BODY.people}</g>
    <ellipse cx="38" cy="42" rx="10" ry="5" fill="#fff" opacity=".35"/>
    <ellipse class="qcr-eye" cx="39" cy="58" rx="7" ry="8.5"/><ellipse class="qcr-eye" cx="61" cy="58" rx="7" ry="8.5"/>
    <circle cx="41" cy="60" r="3.6" fill="#1d2550"/><circle cx="63" cy="60" r="3.6" fill="#1d2550"/>
    <circle cx="42.4" cy="58.3" r="1.3" fill="#fff"/><circle cx="64.4" cy="58.3" r="1.3" fill="#fff"/>
    <ellipse cx="29" cy="70" rx="5" ry="3" fill="#ff7aa8" opacity=".55"/><ellipse cx="71" cy="70" rx="5" ry="3" fill="#ff7aa8" opacity=".55"/>
    ${MOUTH[mood] || MOUTH[""]}</svg>
  <b class="qcr-hat">${c.icon}</b></span>`;
const buddyFace = (cls = "") => `<span class="buddy buddy-inline ${cls}" aria-hidden="true">${BUDDY_SVG}</span>`;
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const RIGHT = ["Right!", "Yes!", "You got it!", "Well done!", "Amen!", "Spot on!"];
const WRONG = ["Not quite!", "Good try!", "So close!", "Now you know!"];
// What each friend on the wheel says when the wheel lands on them.
const SAYS = {
  people: ["Who's who in the Bible?", "Name that person!", "Meet someone famous!"],
  places: ["Where in the Bible world?", "Grab your map!", "Where did it happen?"],
  stories: ["What happened next?", "Story time!", "A miracle question!"],
  stem: ["Count it up!", "Let's measure and think!", "Numbers and nature!"],
  books: ["Where is it written?", "Open the scroll!", "Know your books?"],
  history: ["Back in time we go!", "Kings and kingdoms!", "Long, long ago..."],
  arts: ["Sing it, paint it, play it!", "Music and making!", "Harps and hymns!"],
};
const BUDDY_CHEER = ["Nice one!", "Ooh, you're good!", "I knew that one too... I think!", "Well played!"];
const BUDDY_TEASE = ["Phew, my turn!", "Tricky one!", "I'd have guessed that too.", "Don't worry, it was a hard one!"];
const lampHtml = (p) => `<span class="q-lamp${(p.lamp || 0) >= LAMP_FULL ? " full" : ""}" title="Fill the lamp to choose a jewel" aria-label="Lamp ${p.lamp || 0} of ${LAMP_FULL}">🪔${Array.from({ length: LAMP_FULL }, (_, i) => `<b class="${i < (p.lamp || 0) ? "on" : ""}"></b>`).join("")}</span>`;

/* ---------- The game window ---------- */
export function createQuest({ store, esc, lively, lookColors, myName, practice, buddyName = () => "Buddy", onWin, onBuddyWin = null, duels = null }) {
  const B = () => buddyName(); // the name each person gave their study buddy (plain text)
  const BH = () => esc(buddyName()); // the same, ready for HTML
  const dlg = document.createElement("dialog");
  dlg.className = "quest";
  dlg.setAttribute("aria-label", "Bible Spin");
  document.body.append(dlg);

  const mine = () => ({ coins: 0, earned: 0, played: 0, won: 0, jewels: 0, best: 0, seen: [], badges: {}, players: [], buddy: "fair", sound: true, ...(store.get("quest") || {}) });
  const save = (patch) => store.set("quest", { ...mine(), ...patch });
  const sound = (n) => { if (mine().sound) SOUNDS[n](); };
  // Daily missions, the daily chest and levels (only for the device's own player: solo and
  // Challenge Buddy; family games pass the device around, so they don't count here).
  const dayKey = (ms = Date.now()) => { const d = new Date(ms); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
  const daily = () => { const m = mine(); if (m.mday === dayKey() && Array.isArray(m.missions)) return m.missions; const list = missionsFor(dayKey()); save({ mday: dayKey(), missions: list }); return list; };
  const missionText = (id) => (MISSIONS.find((x) => x.id === id)?.text || "").replace("Buddy", B());
  let doneNow = [], levelUp = 0;
  function progress(id, by = 1) {
    if (!game || game.mode === "family") return;
    const list = daily(), ms = list.find((x) => x.id === id);
    if (!ms || ms.have >= ms.goal) return;
    ms.have = Math.min(ms.goal, ms.have + by);
    if (ms.have === ms.goal) { doneNow.push(missionText(id)); const m = mine(); save({ missions: list, coins: m.coins + MISSION_COINS, earned: m.earned + MISSION_COINS }); }
    else save({ missions: list });
  }
  function addRight() {
    if (!game || game.mode === "family") return;
    const was = mine().rightTotal || 0, before = levelOf(was).n;
    save({ rightTotal: was + 1 });
    if (levelOf(was + 1).n > before) levelUp = levelOf(was + 1).n;
  }
  const notes = () => {
    const d = doneNow.splice(0), lv = levelUp; levelUp = 0;
    return d.map((t) => `<p class="q-mission-done">✅ Mission done: ${esc(t)} <span>+${MISSION_COINS} 🪙</span></p>`).join("")
      + (lv ? `<p class="q-levelup">⬆️ Level up! <b>Level ${lv}</b> · ${esc(levelOf(mine().rightTotal || 0).title)}</p>` : "");
  };
  // A sound switch at the top of every Bible Spin screen.
  const sndBtn = () => `<button type="button" class="q-snd" data-snd aria-pressed="${mine().sound}" aria-label="Sound effects ${mine().sound ? "on" : "off"}">${mine().sound ? "🔊" : "🔇"}</button>`;
  const wireSnd = () => dlg.querySelector("[data-snd]")?.addEventListener("click", (e) => { save({ sound: !mine().sound }); e.currentTarget.outerHTML = sndBtn(); wireSnd(); const c = dlg.querySelector("[data-sound]"); if (c) c.checked = mine().sound; });
  const reduce = () => !lively() || matchMedia("(prefers-reduced-motion: reduce)").matches;
  let game = null, tick = 0, waits = [];
  const later = (fn, ms) => { const t = setTimeout(fn, reduce() ? Math.min(ms, 400) : ms); waits.push(t); return t; };
  const stop = () => { clearInterval(tick); tick = 0; waits.forEach(clearTimeout); waits = []; };
  dlg.addEventListener("close", stop);
  // Escape closes it too: stop Buddy and the candle at once, before any timer can fire.
  dlg.addEventListener("cancel", () => { stop(); game = null; });

  function paint(html) {
    dlg.classList.toggle("still", reduce());
    dlg.innerHTML = `<div class="q-top"><span class="q-coins" aria-label="${mine().coins} coins">🪙 <b>${mine().coins.toLocaleString()}</b></span><span class="q-title">Bible Spin</span>${sndBtn()}<button type="button" class="q-x" data-close aria-label="Close">×</button></div><div class="q-body">${html}</div>`;
    wireSnd();
    dlg.querySelector("[data-close]").onclick = () => { if (!game || game.over || confirm("Leave this game? It won't be saved.")) { stop(); game = null; dlg.close(); } };
  }

  /* Home: three big ways to play */
  function home() {
    stop(); game = null;
    const m = mine(), earned = QUEST_BADGES.filter(([id]) => m.badges[id]).length;
    const L = levelOf(m.rightTotal || 0), list = daily(), chestReady = m.chestDay !== dayKey();
    const me = `<div class="q-me" aria-label="Level ${L.n}, ${L.title}"><span class="q-lv">${L.n}</span><span class="q-me-t"><b>Level ${L.n} · ${esc(L.title)}</b><span class="q-xp"><i style="width:${Math.round((100 * L.into) / L.need)}%"></i></span><small>${L.need - L.into} more right answers to level ${L.n + 1}</small></span></div>
      ${chestReady ? `<button class="q-chest" data-chest><span class="q-chest-box" aria-hidden="true">🎁</span><b>Daily treasure chest</b><small>Tap to open it</small></button>` : ""}
      <details class="q-missions"${list.some((x) => x.have < x.goal) ? " open" : ""}><summary>🎯 Today's missions <span>${list.filter((x) => x.have >= x.goal).length} of 3 done</span></summary>
        <ul>${list.map((x) => `<li class="${x.have >= x.goal ? "done" : ""}"><span>${x.have >= x.goal ? "✅" : "⬜"} ${esc(missionText(x.id))}</span><small>${x.have >= x.goal ? `+${MISSION_COINS} 🪙` : `${x.have}/${x.goal}`}</small></li>`).join("")}</ul></details>`;
    paint(`<div class="q-home">
      <div class="q-hero">${wheelSvg()}</div>
      <div class="q-crew">${CATEGORIES.map((c, i) => critter(c, "", i)).join("")}</div>
      <details class="q-meet"><summary>Meet the crew</summary><ul>${CATEGORIES.map((c, i) => `<li>${critter(c, "", i, "happy")}<span><b>${esc(c.who)}</b> · ${esc(c.name)}<small>${esc(c.who)} ${esc(c.about)}.</small></span></li>`).join("")}</ul></details>
      ${me}
      <p class="q-tag">Spin, answer before the candle burns down, and collect all ${CATEGORIES.length} jewels!</p>
      <button class="q-big q-solo" data-mode="solo"><span>🎯</span><b>Play solo</b><small>Three hearts. How many jewels can you win?</small></button>
      <button class="q-big q-family" data-mode="family"><span>👨‍👩‍👧</span><b>Play with family</b><small>Take turns on this device</small></button>
      <button class="q-big q-buddy" data-mode="buddy">${buddyFace()}<b>Challenge ${BH()}</b><small>He plays fair, so you can beat him!</small></button>
      ${duels ? `<button class="q-big q-duel" data-duel><span>⚔️</span><b>Family duel${m.duelTurn ? ` <i class="q-due">${m.duelTurn} waiting</i>` : ""}</b><small>Same questions, each on your own device</small></button>` : ""}
      <button class="q-howto-btn" data-howto>❓ How to play, how to win and how to get better</button>
      <div class="q-foot"><button class="q-link" data-badges>🏅 My badges (${earned} of ${QUEST_BADGES.length}) · ${m.won} win${m.won === 1 ? "" : "s"}</button>
      ${practice ? `<button class="q-link" data-practice>📖 Practice one part of the Bible</button>` : ""}
      <label class="q-link"><input type="checkbox" data-sound ${m.sound ? "checked" : ""}> Sounds</label></div></div>`);
    dlg.querySelectorAll("[data-mode]").forEach((b) => b.onclick = () => setupMode(b.dataset.mode));
    dlg.querySelector("[data-duel]")?.addEventListener("click", duelHome);
    if (duels) refreshDuelCount();
    dlg.querySelector("[data-badges]").onclick = badges;
    dlg.querySelector("[data-howto]").onclick = howTo;
    dlg.querySelector("[data-chest]")?.addEventListener("click", (e) => {
      const m2 = mine(), row = m2.chestDay === dayKey(Date.now() - 864e5) ? (m2.chestRow || 0) + 1 : 1, got = chestCoins(row);
      save({ chestDay: dayKey(), chestRow: row, coins: m2.coins + got, earned: m2.earned + got });
      e.currentTarget.outerHTML = `<div class="q-chest open" role="status"><span class="q-chest-box" aria-hidden="true">💰</span><b>+${got} 🪙</b><small>${row > 1 ? `${row} days in a row! Come back tomorrow for more.` : "Come back tomorrow for another chest."}</small></div>`;
      dlg.querySelector(".q-coins b").textContent = mine().coins.toLocaleString();
      sound("streak"); if (lively()) confetti(dlg, ["#f4d35e", "#ffe27a", ...lookColors()], 60);
    });
    dlg.querySelector("[data-practice]")?.addEventListener("click", () => { dlg.close(); practice(); });
    dlg.querySelector("[data-sound]").onchange = (e) => { save({ sound: e.target.checked }); dlg.querySelector("[data-snd]").outerHTML = sndBtn(); wireSnd(); };
  }

  // How to play, in plain words: the turn, each way to win, getting better, and what levels mean.
  function howTo() {
    const lv = LEVEL_TITLES.map((t, i) => `<li><b>${i + 1}. ${esc(t)}</b><span>${i ? `${(5 * i * (i + 1)).toLocaleString()} right answers` : "where everyone starts"}</span></li>`).join("");
    paint(`<div class="q-howto"><h2>How to play Bible Spin</h2>
      <h3>🎡 Each turn</h3>
      <ol><li>Tap <b>Spin</b>. The wheel picks one of ${CATEGORIES.length} kinds of questions, each with its own friend: ${CATEGORIES.map((c) => `${c.icon} ${esc(c.name)}`).join(", ")}.</li>
      <li>Pick your answer before the candle burns down (${CANDLE_SECS} seconds). The faster you answer, the more coins you get.</li>
      <li>Get ${NEED_PER_JEWEL} right in the same kind and you win its <b>jewel</b>, like the jewels on the high priest's breastplate (Exodus 28).</li></ol>
      <h3>🏆 How to win</h3>
      <ul><li><b>Play solo:</b> collect all ${CATEGORIES.length} jewels before you lose your ${HEARTS} hearts. A wrong answer, or letting the candle go out, costs a heart.</li>
      <li><b>Play with family:</b> pass the phone or iPad around. A right answer keeps your turn; a wrong one passes it on. First to collect every jewel wins. If nobody has them all after ${MAX_ROUNDS} turns, whoever has the most jewels wins (then most right answers).</li>
      <li><b>Challenge ${BH()}:</b> the same, against ${BH()}. He thinks for a moment and gets some wrong: about ${Math.round(BUDDY_LEVELS[0][2] * 10)} in 10 right on Easy, ${Math.round(BUDDY_LEVELS[1][2] * 10)} on Fair and ${Math.round(BUDDY_LEVELS[2][2] * 10)} on Tough.</li>
      ${duels ? `<li><b>Family duel:</b> you and someone in the family each answer the same ${DUEL_QS} questions on your own devices, whenever it suits you. More right wins; if it's a tie, the faster one wins.</li>` : ""}</ul>
      <h3>🪔 Helps along the way</h3>
      <ul><li><b>The lamp:</b> every right answer adds oil. When it's full (${LAMP_FULL} right), you choose any jewel you still need and get one question for it.</li>
      <li><b>Streaks:</b> ${STREAK_REWARDS.map(([n, , c]) => `${n} in a row earns ${c}`).join(", ")} extra coins.</li>
      <li><b>Bonus round:</b> every ${BONUS_EVERY}th question, ${BONUS_QS} quick questions for ${BONUS_COINS} coins each. You can't lose a heart there.</li>
      <li><b>Coins buy helps</b> in solo and against ${BH()}: ✂️ take away 2 wrong answers (${HELPS.half.cost} coins) or 🕯️ 10 more seconds (${HELPS.time.cost} coins). Family games have no helps, so they stay fair.</li>
      <li><b>Every day:</b> open the 🎁 treasure chest for coins (more for days in a row) and try the 3 🎯 missions for ${MISSION_COINS} coins each.</li></ul>
      <h3>📈 How to get better</h3>
      <ul><li>Read the short note after each answer. It tells you why, often with the verse, so you'll know it next time.</li>
      <li>Use <b>📖 Practice one part of the Bible</b> for the kinds you miss most.</li>
      <li>Start ${BH()} on Easy, then move up to Fair and Tough as you win.</li>
      <li>Play a little every day: the chest and missions reward coming back, and questions you've seen come up less often.</li></ul>
      <h3>⭐ What your level means</h3>
      <p class="q-small">Your level grows with every right answer you've ever given, in any game. Early levels come quickly; later ones take real play. Levels are just for fun: they don't change the questions.</p>
      <ul class="q-levels-list">${lv}</ul>
      <button class="q-btn" data-back>Back to Bible Spin</button></div>`);
    dlg.querySelector("[data-back]").onclick = home;
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
        <ol class="q-names">${names.map((n, i) => `<li><input data-name="${i}" value="${esc(n)}" maxlength="16" placeholder="Player ${i + 1}" aria-label="Player ${i + 1}">${names.length > 1 ? `<button class="q-link" data-drop="${i}" aria-label="Take ${esc(n || "this player")} out">✕</button>` : ""}</li>`).join("")}</ol>
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
    const p = current(), buddyPlays = p.kind === "buddy", lampFull = (p.lamp || 0) >= LAMP_FULL && missingJewels(p).length > 0;
    paint(`<div class="q-board">
      <div class="q-players">${game.players.map((pl, i) => `<div class="q-pl${i === game.turn ? " on" : ""}">
        <span class="q-pl-name">${pl.kind === "buddy" ? buddyFace("q-mini") : ""}${esc(pl.name)}${pl.streak >= 3 ? ` <i class="q-fire" title="${pl.streak} in a row">🔥${pl.streak}</i>` : ""}</span>${lampHtml(pl)}
        <span class="q-jewels">${CATEGORIES.map((c) => jewelSvg(c, pl.jewels[c.id], pl.progress[c.id] || 0)).join("")}</span>
        ${game.mode === "solo" ? `<span class="q-hearts" aria-label="${pl.hearts} hearts">${"❤️".repeat(Math.max(0, pl.hearts))}${"🤍".repeat(HEARTS - Math.max(0, pl.hearts))}</span>` : ""}</div>`).join("")}</div>
      ${lampFull ? `<div class="q-lampfull"><p class="q-lamp-head">🪔 ${buddyPlays ? `${BH()}'s lamp is full!` : "Your lamp is full!"}</p><p class="q-tag">${buddyPlays ? `${BH()} is choosing a jewel…` : "Choose a jewel. Answer one question to win it!"}</p>
        <div class="q-pickgrid">${missingJewels(p).map((c, i) => `<button class="q-pickjewel" data-pickjewel="${c.id}" style="--cc:${c.color}" ${buddyPlays ? "disabled" : ""}>${critter(c, "", i)}<span>${esc(c.name)}</span></button>`).join("")}</div></div>`
      : `<div class="q-wheel">${wheelSvg()}</div>
      ${buddyPlays ? `<p class="q-turn">${buddyFace("q-mini")} ${BH()} is spinning…</p>` : `<button class="q-spin" data-spin>SPIN</button><p class="q-turn">${game.mode === "solo" ? "" : `${esc(p.name)}'s turn`}</p>`}`}
    </div>`);
    if (lampFull) {
      const choose = (id) => { sound("streak"); ask(CATEGORIES.find((c) => c.id === id), { jewelTry: true }); };
      if (buddyPlays) { const opts = missingJewels(p); later(() => choose(pick(opts).id), 1600); }
      else dlg.querySelectorAll("[data-pickjewel]").forEach((b) => b.onclick = () => choose(b.dataset.pickjewel));
      return;
    }
    const go = () => spin();
    if (buddyPlays) later(go, 900); else dlg.querySelector("[data-spin]").onclick = go;
  }

  function spin() {
    const btn = dlg.querySelector("[data-spin]");
    if (btn) btn.disabled = true;
    const i = Math.floor(Math.random() * CATEGORIES.length), slice = 360 / CATEGORIES.length;
    const turns = 360 * 4 + (360 - (i * slice + slice / 2)) + (Math.random() - 0.5) * slice * 0.6;
    const wheel = dlg.querySelector(".q-wheel-spin");
    if (!wheel || !game || game.over) return; // the board was left (closed, or a new screen) before the spin
    wheel.style.transition = reduce() ? "none" : "transform 2.6s cubic-bezier(.17,.67,.22,1)";
    requestAnimationFrame(() => { wheel.style.transform = `rotate(${turns}deg)`; });
    sound("tick");
    later(() => ask(CATEGORIES[i]), 2800);
  }

  /* A question flies in; the candle burns down */
  function ask(cat, { jewelTry = false } = {}) {
    const p = current(), buddyPlays = p.kind === "buddy", m = mine();
    const q = pickQuestion(cat.id, m.seen, Math.random, m.reported || []);
    save({ seen: [...m.seen.filter((id) => id !== q.id), q.id].slice(-200) });
    const order = q.choices.map((_, k) => k);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } // fair shuffle
    const owned = p.jewels[cat.id];
    const helps = game.mode !== "family" && !buddyPlays;
    paint(`<div class="q-ask" style="--cc:${cat.color}">
      <div class="q-cat">${critter(cat, "big")}<div class="q-catname">${esc(cat.name)} <i class="q-who">with ${esc(cat.who)}</i></div>${jewelTry ? `<small>👑 Jewel question! Get it right to win this jewel.</small>` : owned ? `<small>Jewel won · bonus coins</small>` : ""}</div>
      <p class="q-say" style="--cc:${cat.color}">${esc(pick(SAYS[cat.id] || ["Here we go!"]))}</p>
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
      const r = answer(game, p, cat.id, right, coins, { jewelTry });
      const extra = coins + (r.jewel ? 25 : 0) + (r.streak?.coins || 0);
      if (p.kind === "person" && game.mode !== "family") {
        save({ coins: mine().coins + extra, earned: mine().earned + extra });
        progress("answer10");
        if (right) { addRight(); progress("right8"); progress(`cat-${cat.id}`); if (msLeft > total / 2) progress("fast5"); }
        if (p.streak >= 3) progress("streak3");
        if (r.jewel) { progress("jewel2"); if (jewelTry) progress("lamp"); }
      }
      sound(right ? (r.jewel || r.streak ? "streak" : "right") : "wrong");
      later(() => feedback(q, cat, right, coins, r, k === null, jewelTry), buddyPlays ? 1300 : 900);
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

  function feedback(q, cat, right, coins, r, timedOut, jewelTry = false) {
    const p = current(), who = p.kind === "buddy" ? B() : game.mode === "solo" ? "You" : p.name;
    const head = right ? (p.kind === "buddy" ? `${B()} got it!` : pick(RIGHT)) : timedOut ? "The candle went out!" : p.kind === "buddy" ? `${B()} missed it!` : jewelTry ? "Not this time!" : pick(WRONG);
    const streak = r.streak ? `<p class="q-streak big">🔥 ${esc(r.streak.label)} ${p.streak} in a row! <span>+${r.streak.coins} 🪙</span></p>` : right && p.streak >= 3 ? `<p class="q-streak">🔥 ${p.streak} in a row!</p>` : "";
    const react = game.mode === "buddy" && p.kind === "person" ? `<p class="q-react">${buddyFace("q-mini")} <span>${esc(right ? pick(BUDDY_CHEER) : pick(BUDDY_TEASE))}</span></p>` : "";
    const lampNote = jewelTry && !right ? `<p class="q-tag">The lamp is empty again. Fill it with three right answers to try again.</p>` : "";
    paint(`<div class="q-fb ${right ? "good" : "bad"}" style="--cc:${cat.color}">
      <div class="q-fb-head">${p.kind === "buddy" ? buddyFace(right ? "excited" : "") : critter(cat, `big q-fb-critter ${right ? "cheer" : "sad"}`, 0, right ? "happy" : "sad")}<h2>${esc(head)}</h2></div>
      ${p.kind === "buddy" ? "" : `<p class="q-says"><b>${esc(cat.who)}:</b> ${esc(pick(right ? cat.cheer : cat.comfort))}</p>`}
      ${right && coins ? `<p class="q-gain">+${coins} 🪙</p>` : ""}${streak}${react}${lampNote}${p.kind === "person" ? notes() : ""}
      ${r.jewel ? `<div class="q-newjewel"><span class="q-rays" aria-hidden="true"></span>${jewelSvg(cat, true)}<p>${esc(who)} won the <b>${esc(cat.name)}</b> jewel! <span>+25 🪙</span><small>Jewel ${jewelCount(p)} of ${CATEGORIES.length}</small></p></div>
        <div class="q-crew q-crew-cheer">${CATEGORIES.map((c, i) => critter(c, p.jewels[c.id] ? "cheer" : "", i, p.jewels[c.id] ? "happy" : "")).join("")}</div>` : ""}
      <div class="q-why"><p>${right ? `✓ <b>${esc(q.choices[q.a])}</b>. ` : `The answer: <b>${esc(q.choices[q.a])}</b>. `}${esc(q.why || "")}</p>
        ${p.kind === "person" ? `<button type="button" class="q-report" data-report>⚑ Something wrong with this question?</button>` : ""}</div>
      <button class="q-btn" data-next>${r.over ? "See how it ended" : right || game.mode === "solo" ? (p.kind === "buddy" ? `${BH()} spins again` : "Keep going") : game.mode === "buddy" ? (p.kind === "buddy" ? "My turn!" : `${BH()}'s turn`) : "Next player"}</button></div>`);
    if (r.jewel && lively()) confetti(dlg, [cat.color, "#f4d35e", ...lookColors()], 90);
    // Runs once: Buddy's turn moves on by itself, and tapping the button too must not move twice.
    let moved = false;
    const proceed = () => {
      if (!right && game.mode !== "solo") { game.turn = (game.turn + 1) % game.players.length; return game.mode === "family" ? passTo() : board(); }
      board();
    };
    const next = () => {
      if (moved) return;
      moved = true;
      if (r.over) return end();
      if (bonusDue(p)) return bonusIntro(p, proceed);
      proceed();
    };
    dlg.querySelector("[data-next]").onclick = next;
    // A question that looks wrong or confusing: set it aside so it never comes up again here,
    // and keep a note of it (in the backup) so it can be checked and fixed.
    dlg.querySelector("[data-report]")?.addEventListener("click", (e) => {
      const m2 = mine();
      save({ reported: [...new Set([...(m2.reported || []), q.id])].slice(-300) });
      e.currentTarget.outerHTML = `<p class="q-report-done" role="status">Thanks! That question is set aside and won't come up again.</p>`;
    });
    if (p.kind === "buddy") later(next, 2600);
  }

  /* Bonus round: three quick questions for extra coins. Nothing to lose. */
  function bonusIntro(p, then) {
    paint(`<div class="q-bonus-intro"><p class="q-bonus-star" aria-hidden="true">⭐</p><h2>Bonus round!</h2>
      <p class="q-tag">${game.mode === "family" ? `${esc(p.name)}, ` : ""}${BONUS_QS} quick questions, ${BONUS_SECS} seconds each. +${BONUS_COINS} 🪙 for every right answer, and no hearts to lose!</p>
      <div class="q-crew">${CATEGORIES.map((c, i) => critter(c, "cheer", i, "happy")).join("")}</div>
      <button class="q-btn" data-next>Let's go!</button></div>`);
    sound("streak");
    if (p.kind === "person") progress("bonus");
    dlg.querySelector("[data-next]").onclick = () => bonusQ(p, 0, 0, then);
  }
  function bonusQ(p, n, got, then) {
    const m = mine(), cat = pick(CATEGORIES), q = pickQuestion(cat.id, m.seen, Math.random, m.reported || []);
    save({ seen: [...m.seen.filter((id) => id !== q.id), q.id].slice(-200) });
    const order = q.choices.map((_, k) => k).sort(() => Math.random() - 0.5);
    paint(`<div class="q-ask q-bonus" style="--cc:${cat.color}">
      <div class="q-cat">⭐ Bonus ${n + 1} of ${BONUS_QS}<small>${esc(cat.name)} · +${BONUS_COINS} 🪙</small></div>
      <div class="q-row">${candle()}<div class="q-card"><p>${esc(q.q)}</p></div></div>
      <div class="q-choices">${order.map((k, i) => `<button class="q-choice" data-k="${k}" style="--d:${0.15 + i * 0.06}s"><span class="q-letter">${"ABCD"[i]}</span>${esc(q.choices[k])}</button>`).join("")}</div></div>`);
    const total = BONUS_SECS * 1000, deadline = Date.now() + total;
    let done = false;
    const wax = dlg.querySelector(".qc-wax"), flameBox = dlg.querySelector(".q-candle");
    const done1 = (k) => {
      if (done) return; done = true; stop();
      const right = k === q.a;
      dlg.querySelectorAll(".q-choice").forEach((b) => { b.disabled = true; if (+b.dataset.k === q.a) b.classList.add("right"); else if (+b.dataset.k === k) b.classList.add("wrong"); });
      if (right) { p.coins += BONUS_COINS; if (game.mode !== "family") { save({ coins: mine().coins + BONUS_COINS, earned: mine().earned + BONUS_COINS }); addRight(); } }
      sound(right ? "right" : "wrong");
      later(() => (n + 1 < BONUS_QS ? bonusQ(p, n + 1, got + (right ? 1 : 0), then) : bonusEnd(got + (right ? 1 : 0), then)), 1100);
    };
    const burn = () => {
      const left = Math.max(0, deadline - Date.now()), f = left / total;
      wax.setAttribute("height", String(Math.max(2, 58 * f))); wax.setAttribute("y", String(26 + 58 * (1 - f)));
      flameBox.style.setProperty("--fy", `${58 * (1 - f)}px`); flameBox.classList.toggle("low", left < 3000);
      if (left <= 0) done1(null);
    };
    tick = setInterval(burn, 100); burn();
    dlg.querySelectorAll(".q-choice").forEach((b) => b.onclick = () => done1(+b.dataset.k));
  }
  function bonusEnd(got, then) {
    paint(`<div class="q-bonus-intro"><h2>${got === BONUS_QS ? "Perfect bonus round!" : got ? `${got} of ${BONUS_QS} right!` : "Nice try!"}</h2>
      ${got ? `<p class="q-gain">+${got * BONUS_COINS} 🪙</p>` : `<p class="q-tag">No coins this time, but no hearts lost either.</p>`}
      <div class="q-crew q-crew-cheer">${CATEGORIES.map((c, i) => critter(c, got ? "cheer" : "", i, got ? "happy" : "")).join("")}</div>
      <button class="q-btn" data-next>Back to the game</button></div>`);
    if (got === BONUS_QS && lively()) confetti(dlg, ["#f4d35e", "#ffe27a", ...lookColors()], 70);
    dlg.querySelector("[data-next]").onclick = then;
  }

  /* Family duels: challenge someone in the family to the same 10 questions on their own device */
  const DUEL_MSG = {
    setup: "Family duels are almost ready. They switch on with the last Supabase update.",
    offline: "Family duels need the internet. Try again when you're connected.",
    signin: "Family duels need you to be signed in.",
    busy: "Couldn't reach the family duels just now. Please try again in a minute.",
  };
  // How many duels are waiting for me, kept so the home screen can show it right away.
  async function refreshDuelCount() {
    const r = await duels.list();
    if (r.error) return;
    const n = r.data.filter((d) => duelView(d, r.uid).state === "play").length;
    if (n !== (mine().duelTurn || 0)) save({ duelTurn: n });
    const b = dlg.querySelector("[data-duel] b");
    if (b) b.innerHTML = `Family duel${n ? ` <i class="q-due">${n} waiting</i>` : ""}`;
  }
  // A finished duel that couldn't be sent (no internet) waits here and goes next time.
  async function sendPendingDuel() {
    const p = mine().duelPending;
    if (!p) return null;
    const r = p.duel ? await duels.score(p.duel, p.uid, p.score, p.marks) : await duels.create(p.row);
    if (!r.error) save({ duelPending: null });
    return r.error || null;
  }
  async function duelHome() {
    stop(); game = null;
    paint(`<div class="q-duels"><h2>⚔️ Family duel</h2><p class="q-tag" role="status">Checking for challenges…</p></div>`);
    const shown = dlg.querySelector(".q-duels");
    const pendingErr = await sendPendingDuel();
    const [pl, ls] = await Promise.all([duels.players(), duels.list()]);
    if (!dlg.contains(shown)) return; // they moved on while it loaded
    const err = pendingErr || pl.error || ls.error;
    if (err) {
      paint(`<div class="q-duels"><h2>⚔️ Family duel</h2><p class="q-tag">${esc(DUEL_MSG[err] || DUEL_MSG.busy)}</p>
        ${err === "setup" ? "" : `<button class="q-btn" data-retry>Try again</button>`}<button class="q-link" data-home>Back to Bible Spin</button></div>`);
      dlg.querySelector("[data-retry]")?.addEventListener("click", duelHome);
      dlg.querySelector("[data-home]").onclick = home;
      return;
    }
    const uid = ls.uid, joined = pl.data.some((x) => x.user_id === uid);
    if (!joined) {
      paint(`<div class="q-duels"><h2>⚔️ Family duel</h2>
        <p class="q-tag">Play the same 10 questions as someone in the family, each on your own phone or iPad, whenever it suits you. Whoever gets more right wins, and speed breaks a tie.</p>
        <p class="q-small">Only your first name and your duel scores are shared, and a duel's scores only with the person you played.</p>
        <button class="q-btn" data-join>Join as ${esc(myName())}</button><button class="q-link" data-home>Back to Bible Spin</button></div>`);
      dlg.querySelector("[data-join]").onclick = async (e) => { e.currentTarget.disabled = true; const r = await duels.join(myName()); if (r.error) { e.currentTarget.disabled = false; e.currentTarget.insertAdjacentHTML("afterend", `<p class="q-small" role="alert">${esc(DUEL_MSG[r.error] || DUEL_MSG.busy)}</p>`); } else duelHome(); };
      dlg.querySelector("[data-home]").onclick = home;
      return;
    }
    // Keep my name current if it changed in Settings.
    if (pl.data.find((x) => x.user_id === uid)?.name !== myName()) duels.join(myName());
    const all = ls.data.map((d) => ({ d, v: duelView(d, uid) }));
    const turn = all.filter((x) => x.v.state === "play"), waiting = all.filter((x) => x.v.state === "waiting"), done = all.filter((x) => x.v.state === "done").slice(0, 8);
    save({ duelTurn: turn.length });
    const others = pl.data.filter((x) => x.user_id !== uid);
    const resultLine = (v) => v.result === "win" ? "You won! 🏆" : v.result === "lose" ? `${esc(v.them)} won` : "A tie!";
    paint(`<div class="q-duels"><h2>⚔️ Family duel</h2>
      ${turn.length ? `<h3>Your turn</h3><ul class="q-dlist">${turn.map(({ v }) => `<li><span><b>${esc(v.them)}</b> challenged you</span><button class="q-dgo" data-play="${esc(v.id)}">Play</button></li>`).join("")}</ul>` : ""}
      <h3>Challenge someone</h3>
      ${others.length ? `<div class="q-dwho">${others.map((x) => `<button class="q-dname" data-vs="${esc(x.user_id)}">${esc(x.name)}</button>`).join("")}</div>`
        : `<p class="q-small">Nobody else has joined yet. When someone in the family opens Family duel in Bible Spin and joins, their name shows here.</p>`}
      ${waiting.length ? `<h3>Waiting for them</h3><ul class="q-dlist">${waiting.map(({ v }) => `<li><span>Waiting for <b>${esc(v.them)}</b> · you got ${v.myRight} of ${DUEL_QS}</span><button class="q-link" data-cancel="${esc(v.id)}">Cancel</button></li>`).join("")}</ul>` : ""}
      ${done.length ? `<h3>Results</h3><ul class="q-dlist">${done.map(({ v }) => `<li class="q-d-${v.result}"><span>You ${v.myRight} · ${esc(v.them)} ${v.theirRight}</span><b>${resultLine(v)}</b><button class="q-link" data-see="${esc(v.id)}">See</button></li>`).join("")}</ul>` : ""}
      <button class="q-link" data-home>Back to Bible Spin</button><button class="q-link q-small" data-leave>Leave family duels</button></div>`);
    dlg.querySelector("[data-home]").onclick = home;
    dlg.querySelectorAll("[data-play]").forEach((b) => b.onclick = () => { const d = ls.data.find((x) => x.id === b.dataset.play); duelPlay({ ids: d.questions, them: duelView(d, uid).them, duel: d, uid }); });
    dlg.querySelectorAll("[data-vs]").forEach((b) => b.onclick = () => { const o = others.find((x) => x.user_id === b.dataset.vs); duelIntro(o, uid); });
    dlg.querySelectorAll("[data-see]").forEach((b) => b.onclick = () => duelResult(duelView(ls.data.find((x) => x.id === b.dataset.see), uid)));
    dlg.querySelectorAll("[data-cancel]").forEach((b) => b.onclick = async () => { b.disabled = true; await duels.remove(b.dataset.cancel); duelHome(); });
    dlg.querySelector("[data-leave]").onclick = () => {
      if (!confirm("Leave family duels? Your name comes off the list. You can join again any time.")) return;
      duels.leave().then(() => { save({ duelTurn: 0 }); home(); });
    };
  }
  function duelIntro(o, uid) {
    paint(`<div class="q-duels q-dintro"><p class="q-bonus-star" aria-hidden="true">⚔️</p><h2>Challenge ${esc(o.name)}?</h2>
      <p class="q-tag">${DUEL_QS} questions: one from every friend on the wheel, plus three more. No helps, so it's fair. ${esc(o.name)} gets the same questions on their own device.</p>
      <div class="q-crew">${CATEGORIES.map((c, i) => critter(c, "", i)).join("")}</div>
      <button class="q-btn" data-go>Start</button><button class="q-link" data-back>Back</button></div>`);
    dlg.querySelector("[data-back]").onclick = duelHome;
    dlg.querySelector("[data-go]").onclick = () => duelPlay({ ids: duelQuestions(Math.random, mine().reported || []), them: o.name, to: o.user_id, uid });
  }
  function duelPlay(ctx, n = 0, marks = "", score = 0) {
    game = { mode: "duel", over: false };
    const q = TRIVIA.find((x) => x.id === ctx.ids[n]);
    if (!q) return duelPlay(ctx, n + 1, marks + "0", score); // a question that's since been removed counts as missed for both
    const cat = categoryOf(q), order = q.choices.map((_, k) => k);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    paint(`<div class="q-ask" style="--cc:${cat.color}">
      <div class="q-cat">${critter(cat, "big")}<div class="q-catname">${esc(cat.name)} <i class="q-who">with ${esc(cat.who)}</i></div><small>⚔️ vs ${esc(ctx.them)} · ${n + 1} of ${DUEL_QS}</small></div>
      <div class="q-row">${candle()}<div class="q-card"><p>${esc(q.q)}</p></div></div>
      <div class="q-choices">${order.map((k, i) => `<button class="q-choice" data-k="${k}" style="--d:${0.2 + i * 0.07}s"><span class="q-letter">${"ABCD"[i]}</span>${esc(q.choices[k])}</button>`).join("")}</div></div>`);
    const total = CANDLE_SECS * 1000, deadline = Date.now() + total;
    let done = false;
    const wax = dlg.querySelector(".qc-wax"), flameBox = dlg.querySelector(".q-candle");
    const answered = (k) => {
      if (done) return; done = true; stop();
      const right = k === q.a, pts = duelPoints(right, deadline - Date.now(), total);
      dlg.querySelectorAll(".q-choice").forEach((b) => { b.disabled = true; if (+b.dataset.k === q.a) b.classList.add("right"); else if (+b.dataset.k === k) b.classList.add("wrong"); });
      sound(right ? "right" : "wrong");
      progress("answer10");
      if (right) { addRight(); progress("right8"); progress(`cat-${cat.id}`); save({ coins: mine().coins + 10, earned: mine().earned + 10 }); }
      later(() => (n + 1 < DUEL_QS ? duelPlay(ctx, n + 1, marks + (right ? "1" : "0"), score + pts) : duelDone(ctx, marks + (right ? "1" : "0"), score + pts)), 1200);
    };
    const burn = () => {
      const left = Math.max(0, deadline - Date.now()), f = left / total;
      wax.setAttribute("height", String(Math.max(2, 58 * f))); wax.setAttribute("y", String(26 + 58 * (1 - f)));
      flameBox.style.setProperty("--fy", `${58 * (1 - f)}px`); flameBox.classList.toggle("low", left < 5000);
      if (left <= 0) answered(null);
    };
    tick = setInterval(burn, 100); burn();
    dlg.querySelectorAll(".q-choice").forEach((b) => b.onclick = () => answered(+b.dataset.k));
  }
  async function duelDone(ctx, marks, score) {
    game.over = true;
    const right = marks.split("").filter((c) => c === "1").length;
    paint(`<div class="q-duels"><h2>${right} of ${DUEL_QS} right!</h2><p class="q-tag" role="status">Sending your score…</p></div>`);
    const pending = ctx.duel ? { duel: ctx.duel, uid: ctx.uid, score, marks }
      : { row: { to_id: ctx.to, from_name: myName(), to_name: ctx.them, questions: ctx.ids, from_score: score, from_marks: marks } };
    save({ duelPending: pending, played: mine().played + 1 });
    const err = await sendPendingDuel();
    if (ctx.duel) {
      const d = ctx.duel.from_id === ctx.uid ? { ...ctx.duel, from_score: score, from_marks: marks } : { ...ctx.duel, to_score: score, to_marks: marks };
      const v = duelView(d, ctx.uid);
      if (v.result === "win") { save({ won: mine().won + 1 }); onWin?.("duel"); }
      save({ duelTurn: Math.max(0, (mine().duelTurn || 1) - 1) });
      return duelResult(v, err);
    }
    paint(`<div class="q-duels q-dintro"><p class="q-bonus-star" aria-hidden="true">📨</p><h2>${right} of ${DUEL_QS} right!</h2>
      <p class="q-tag">${err ? "No internet just now, so your score is saved here. It goes to " + esc(ctx.them) + " next time you open Family duel." : `Challenge sent! ${esc(ctx.them)} will see it next time they open Bible Spin.`}</p>
      ${notes()}<button class="q-btn" data-again>Back to Family duel</button><button class="q-link" data-home>Back to Bible Spin</button></div>`);
    sound("done");
    dlg.querySelector("[data-again]").onclick = duelHome;
    dlg.querySelector("[data-home]").onclick = home;
  }
  function duelResult(v, err = null) {
    game = null;
    const head = v.state !== "done" ? `Waiting for ${v.them}` : v.result === "win" ? `You beat ${v.them}!` : v.result === "lose" ? `${v.them} won this one!` : `A tie with ${v.them}!`;
    const row = (marks) => Array.from({ length: DUEL_QS }, (_, i) => `<i class="${marks[i] === "1" ? "y" : "n"}" aria-hidden="true">${marks[i] === "1" ? "✓" : "✗"}</i>`).join("");
    paint(`<div class="q-duels q-dresult"><span class="q-fb-icon">${v.result === "win" ? "🏆" : v.result === "lose" ? "🤝" : "⚔️"}</span><h2>${esc(head)}</h2>
      ${v.state === "done" ? `<div class="q-dscore"><div><b>You</b><span class="q-dmarks" aria-label="You got ${v.myRight} of ${DUEL_QS}">${row(v.myMarks)}</span><small>${v.myRight} right · ${v.mine} points</small></div>
        <div><b>${esc(v.them)}</b><span class="q-dmarks" aria-label="${esc(v.them)} got ${v.theirRight} of ${DUEL_QS}">${row(v.theirMarks)}</span><small>${v.theirRight} right · ${v.theirs} points</small></div></div>
        ${v.myRight === v.theirRight && v.result !== "tie" ? `<p class="q-small">Same number right, so the quicker answers decided it.</p>` : ""}` : ""}
      ${err ? `<p class="q-small" role="alert">No internet just now, so your score is saved here and goes next time you open Family duel.</p>` : ""}
      ${notes()}<button class="q-btn" data-again>Back to Family duel</button><button class="q-link" data-home>Back to Bible Spin</button></div>`);
    if (v.result === "win" && lively()) { confetti(dlg, lookColors()); sound("fanfare"); } else sound("done");
    dlg.querySelector("[data-again]").onclick = duelHome;
    dlg.querySelector("[data-home]").onclick = home;
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
    if (iWon && game.mode === "buddy") progress("buddy");
    const winBonus = iWon ? 100 : 0;
    const earned = m.earned + winBonus;
    add("coins500", earned >= 500); add("coins2000", earned >= 2000); add("games10", stats.played >= 10);
    const fresh = QUEST_BADGES.filter(([id]) => badgesNow[id] && !m.badges[id]);
    save({ ...stats, badges: badgesNow, coins: m.coins + winBonus, earned });
    const jw = jewelCount(me);
    const title = game.mode === "solo" ? (iWon ? "You collected every jewel!" : jw ? `You won ${jw} of ${CATEGORIES.length} jewel${CATEGORIES.length === 1 ? "" : "s"}!` : "Good try! Every game you learn more.")
      : game.mode === "buddy" ? (top === me ? `You beat ${B()}!` : `${B()} won this time!`) : `${top.name} wins!`;
    paint(`<div class="q-end">
      ${game.mode === "buddy" ? buddyFace(top === me ? "" : "excited") : `<span class="q-fb-icon">🏆</span>`}<h2>${esc(title)}</h2>
      ${game.mode === "buddy" && top !== me ? `<p class="q-tag">"Good game! Want a rematch?"</p>` : ""}
      <div class="q-final">${game.players.map((pl) => `<div class="q-pl"><span class="q-pl-name">${esc(pl.name)}</span><span class="q-jewels">${CATEGORIES.map((c) => jewelSvg(c, pl.jewels[c.id], pl.progress[c.id] || 0)).join("")}</span><small>${pl.right} of ${pl.asked} right · ${pl.coins} 🪙</small></div>`).join("")}</div>
      ${winBonus ? `<p class="q-gain">Winner's bonus +${winBonus} 🪙</p>` : ""}${notes()}
      ${fresh.length ? `<div class="q-newbadges"><h3>New badge${fresh.length > 1 ? "s" : ""}!</h3>${fresh.map(([, name, icon]) => `<div class="q-badge">${medal(icon, { fresh: true })}<b>${esc(name)}</b></div>`).join("")}</div>` : ""}
      <button class="q-btn" data-again>Play again</button><button class="q-link" data-home>Back to Bible Spin</button></div>`);
    if (lively() && (iWon || game.mode === "family")) { confetti(dlg, lookColors()); sound("fanfare"); } else sound(iWon ? "fanfare" : "done");
    if (iWon) onWin?.(game.mode);
    else if (game.mode === "buddy" && top !== me) onBuddyWin?.();
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
