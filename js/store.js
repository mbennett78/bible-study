// Everything personal (keys, progress, place) is kept on this device only.
const KEY = "bible-study:v1";

// Bump DATA_VERSION and add a step to MIGRATIONS whenever saved data changes shape.
// Steps only ever add or rename; they never drop anyone's progress, journal or notes.
const DATA_VERSION = 2;
const MIGRATIONS = {
  // 1 → 2: retired looks (Feminine became Sage, the Wooden Cross photo became Classic).
  2: (s) => { if (s.style === "feminine") s.style = "sage"; if (s.style === "wood") s.style = "classic"; },
};
function migrate(s) {
  for (let v = (s.dataVersion || 1) + 1; v <= DATA_VERSION; v++) { try { MIGRATIONS[v]?.(s); } catch { /* keep going */ } }
  s.dataVersion = DATA_VERSION;
  return s;
}

const defaults = {
  dataVersion: DATA_VERSION,
  savedAt: "",
  version: "NASB",          // "NASB" | "ESV" | "B:<API.Bible id>" for an extra version
  extraBibles: [],
  voiceName: "",
  aiPartner: "",            // "claude" | "chatgpt" | "grok" | "gemini" | "" (none)            // the reader voice picked on this device ("" = automatic)          // more versions from the same API.Bible plan: [{ id, label }]
  apiBibleKey: "",
  esvKey: "",
  nasbBibleId: "",          // API.Bible id for the chosen NASB edition
  nasbLabel: "",
  textSize: 19,
  theme: "auto",            // "auto" | "light" | "dark"
  last: { book: "JHN", chapter: 1 },
  read: {},                 // { "JHN.3": "2026-11-22T16:00:00.000Z" }
  visits: {},               // { "JHN.3": { count: 4, last: iso, dates: [iso, ...] } }
  favorites: {},            // { "JHN.3": iso }
  modes: { drive: false, voiceCommands: true },
  voiceRate: 1,
  voiceVolume: 1,
  activePath: "",           // "chronological" | "audience" | "themes"
  pathStarted: {},          // { chronological: iso }
  pathRead: {},
  name: "",                 // shown in greetings
  uiScale: 100,             // 100 | 112 | 125: bigger labels and buttons
  contrast: false,          // high contrast words
  wordTap: true,            // tap a word in the Bible text for its meaning
  helperStyle: "",          // "" | "simple" | "deep": how the Bible helper answers
  tourSeen: false,          // the welcome tour has been shown (it can always be replayed)
  style: "classic",         // the default look for new people. classic | sage | nativity | easter | fall | christmas | masculine ("Animated") | animated ("For kids")
  margin: true,             // learning path margin open
  yearPace: true,           // suggest a daily reading to finish a path in a year
  journal: {},              // { "JHN.3": { text, prayer, gratitude, answered, created, updated } }
  diary: {},                // daily life journal by date: { "2026-11-22": { text, prayer, gratitude, created, updated } }
  journalLock: "",          // SHA-256 of the passcode, or ""
  trivia: { answered: 0, correct: 0, sessions: [], recent: [] },
  setup: { done: false, skipped: false }, // first-time setup
  graphics: "full",         // "full" | "simple" (no cartoon faces or characters) | "none"
  show: {},                 // features someone has switched off, e.g. { trivia: false }
  archives: [],             // past walks: { id, pathId, started, ended, reads, finished }             // { chronological: { "GEN.1": iso } } kept per path, so each journey has its own progress
};

const REVISIT_GAP_MS = 30 * 60 * 1000; // reopening within 30 minutes counts as the same visit

let state = load();

// Updates to the app never touch this saved data: it lives under one fixed key, and
// new settings are filled in from the defaults without overwriting anything saved.
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(defaults);
    const saved = JSON.parse(raw);
    const merged = { ...structuredClone(defaults), ...saved };
    for (const [k, v] of Object.entries(defaults)) {
      if (v && typeof v === "object" && !Array.isArray(v) && saved[k] && typeof saved[k] === "object") merged[k] = { ...v, ...saved[k] };
    }
    return migrate(merged);
  } catch {
    try { const safe = localStorage.getItem(`${KEY}:safety`); if (safe) return migrate({ ...structuredClone(defaults), ...JSON.parse(safe) }); } catch { /* fall through */ }
    return structuredClone(defaults);
  }
}
// Ask the browser not to clear this app's storage when the device is low on space.
try { navigator.storage?.persist?.(); } catch { /* not supported */ }

let saveListener = null;
export function onSave(fn) { saveListener = fn; }
function save() {
  state.savedAt = new Date().toISOString();
  try { saveListener?.(); } catch { /* backup is best effort */ }
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    // A second copy, refreshed at most once a day, as a safety net.
    const day = new Date().toDateString();
    if (localStorage.getItem(`${KEY}:safety-day`) !== day) { localStorage.setItem(`${KEY}:safety`, JSON.stringify(state)); localStorage.setItem(`${KEY}:safety-day`, day); }
  } catch { /* storage full or blocked */ }
}

export const store = {
  get: (k) => state[k],
  set(k, v) { state[k] = v; save(); },
  isRead: (book, ch) => Boolean(state.read[`${book}.${ch}`]),
  setRead(book, ch, on) {
    const k = `${book}.${ch}`;
    if (on) state.read[k] = new Date().toISOString();
    else delete state.read[k];
    save();
  },
  readCount(book) {
    const prefix = `${book}.`;
    return Object.keys(state.read).filter((k) => k.startsWith(prefix)).length;
  },
  totalRead: () => Object.keys(state.read).length,
  recordVisit(book, ch) {
    const k = `${book}.${ch}`;
    const now = new Date();
    const v = state.visits[k] || { count: 0, last: null, dates: [] };
    if (v.last && now - new Date(v.last) < REVISIT_GAP_MS) { v.last = now.toISOString(); }
    else { v.count += 1; v.last = now.toISOString(); v.dates = [now.toISOString(), ...v.dates].slice(0, 50); }
    state.visits[k] = v;
    save();
  },
  visit: (book, ch) => state.visits[`${book}.${ch}`] || null,
  allVisits: () => Object.entries(state.visits).map(([k, v]) => ({ key: k, ...v })).sort((a, b) => b.last.localeCompare(a.last)),
  isFavorite: (book, ch) => Boolean(state.favorites[`${book}.${ch}`]),
  toggleFavorite(book, ch) {
    const k = `${book}.${ch}`;
    if (state.favorites[k]) delete state.favorites[k]; else state.favorites[k] = new Date().toISOString();
    save();
    return Boolean(state.favorites[k]);
  },
  allFavorites: () => Object.entries(state.favorites).map(([k, at]) => ({ key: k, at })).sort((a, b) => b.at.localeCompare(a.at)),
  isPathRead: (pathId, book, ch) => Boolean(state.pathRead[pathId]?.[`${book}.${ch}`]),
  setPathRead(pathId, book, ch, on) {
    const k = `${book}.${ch}`;
    const m = { ...(state.pathRead[pathId] || {}) };
    if (on) m[k] = new Date().toISOString(); else delete m[k];
    state.pathRead = { ...state.pathRead, [pathId]: m };
    save();
  },
  pathReadCount: (pathId) => Object.keys(state.pathRead[pathId] || {}).length,
  startPath(pathId) {
    state.activePath = pathId;
    if (!state.pathStarted[pathId]) state.pathStarted = { ...state.pathStarted, [pathId]: new Date().toISOString() };
    save();
  },
  journalFor: (book, ch) => state.journal[`${book}.${ch}`]?.text || "",
  setJournal(book, ch, text) { this.setJournalField(book, ch, "text", text); },
  // Each chapter's journal has three boxes: thoughts (text), prayers and gratitude.
  journalEntry: (book, ch) => state.journal[`${book}.${ch}`] || null,
  setJournalField(book, ch, field, value) {
    const k = `${book}.${ch}`;
    const now = new Date().toISOString();
    const e = { text: "", prayer: "", gratitude: "", created: now, ...(state.journal[k] || {}), [field]: value, updated: now };
    const j = { ...state.journal };
    if ((e.text || "").trim() || (e.prayer || "").trim() || (e.gratitude || "").trim()) j[k] = e; else delete j[k];
    state.journal = j;
    save();
  },
  diaryEntry: (day) => state.diary?.[day] || null,
  setDiaryField(day, field, value) {
    const now = new Date().toISOString();
    const e = { text: "", prayer: "", gratitude: "", created: now, ...(state.diary?.[day] || {}), [field]: value, updated: now };
    const d = { ...(state.diary || {}) };
    if ((e.text || "").trim() || (e.prayer || "").trim() || (e.gratitude || "").trim()) d[day] = e; else delete d[day];
    state.diary = d;
    save();
  },
  allDiary: () => Object.entries(state.diary || {}).map(([day, v]) => ({ day, ...v })).sort((a, b) => b.day.localeCompare(a.day)),
  allJournal: () => Object.entries(state.journal).map(([k, v]) => ({ key: k, ...v })).sort((a, b) => b.updated.localeCompare(a.updated)),
  recordTrivia(results, label) {
    const t = state.trivia;
    const correct = results.filter((r) => r.right).length;
    state.trivia = {
      answered: t.answered + results.length,
      correct: t.correct + correct,
      sessions: [{ at: new Date().toISOString(), score: correct, total: results.length, label }, ...t.sessions].slice(0, 100),
      recent: [...results.map((r) => r.id), ...t.recent].slice(0, 40),
    };
    save();
  },
  // Saves the current walk through a path to the archive and starts it fresh.
  archivePath(pathId) {
    const reads = state.pathRead[pathId] || {};
    const entry = { id: `${pathId}-${Date.now()}`, pathId, started: state.pathStarted[pathId] || new Date().toISOString(), ended: new Date().toISOString(), reads };
    state.archives = [entry, ...state.archives];
    state.pathRead = { ...state.pathRead, [pathId]: {} };
    state.pathStarted = { ...state.pathStarted, [pathId]: new Date().toISOString() };
    save();
    return entry;
  },
  setMode(name, on) { state.modes = { ...state.modes, [name]: on }; save(); },
  exportJSON: () => JSON.stringify({ ...state, apiBibleKey: "", esvKey: "" }, null, 2),
  // Account backup: everything except Bible keys.
  snapshot: () => ({ ...structuredClone(state), apiBibleKey: "", esvKey: "" }),
  isEmpty: () => !Object.keys(state.read).length && !Object.keys(state.journal).length && !Object.keys(state.diary || {}).length
    && !Object.keys(state.visits).length && !Object.keys(state.favorites).length && !Object.values(state.pathRead).some((m) => Object.keys(m || {}).length),
  restore(data) {
    const merged = { ...structuredClone(defaults), ...data, apiBibleKey: state.apiBibleKey, esvKey: state.esvKey };
    for (const [k, v] of Object.entries(defaults)) if (v && typeof v === "object" && !Array.isArray(v) && data[k] && typeof data[k] === "object") merged[k] = { ...v, ...data[k] };
    state = migrate(merged); save();
  },
  // Brings in progress from another device without losing anything here: read marks, favorites,
  // visits, path progress and archives are combined; for a journal entry the newer one is kept.
  mergeFrom(data) {
    if (!data) return;
    const newer = (a, b) => (!a ? b : !b ? a : (b.updated || "") > (a.updated || "") ? b : a);
    const byNewer = (mine = {}, theirs = {}) => { const out = { ...mine }; for (const [k, v] of Object.entries(theirs)) out[k] = newer(out[k], v); return out; };
    state.read = { ...(data.read || {}), ...state.read };
    state.favorites = { ...(data.favorites || {}), ...state.favorites };
    const visits = { ...state.visits };
    for (const [k, v] of Object.entries(data.visits || {})) if (!visits[k] || (v.count || 0) > (visits[k].count || 0)) visits[k] = v;
    state.visits = visits;
    const pr = { ...state.pathRead };
    for (const [p, m] of Object.entries(data.pathRead || {})) pr[p] = { ...(m || {}), ...(pr[p] || {}) };
    state.pathRead = pr;
    state.pathStarted = { ...(data.pathStarted || {}), ...state.pathStarted };
    state.journal = byNewer(state.journal, data.journal);
    state.diary = byNewer(state.diary, data.diary);
    const ids = new Set(state.archives.map((a) => a.id));
    state.archives = [...state.archives, ...(data.archives || []).filter((a) => !ids.has(a.id))];
    if ((data.trivia?.answered || 0) > (state.trivia?.answered || 0)) state.trivia = data.trivia;
    if (!state.activePath && data.activePath) state.activePath = data.activePath;
    save();
  },
  importJSON(text) {
    const data = JSON.parse(text);
    state = migrate({ ...defaults, ...data, apiBibleKey: state.apiBibleKey, esvKey: state.esvKey });
    save();
  },
};
