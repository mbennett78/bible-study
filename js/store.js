// Everything personal (keys, progress, place) is kept on this device only.
const KEY = "bible-study:v1";

const defaults = {
  version: "NASB",          // "NASB" | "ESV"
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
  activePath: "",           // "chronological" | "audience" | "themes"
  pathStarted: {},          // { chronological: iso }
  pathRead: {},
  name: "",                 // shown in greetings
  style: "sage",            // "sage" | "feminine" | "masculine" | "animated"
  margin: true,             // learning path margin open
  yearPace: true,           // suggest a daily reading to finish a path in a year
  journal: {},              // { "JHN.3": { text, updated } }
  journalLock: "",          // SHA-256 of the passcode, or ""
  trivia: { answered: 0, correct: 0, sessions: [], recent: [] },
  archives: [],             // past walks: { id, pathId, started, ended, reads, finished }             // { chronological: { "GEN.1": iso } } kept per path, so each journey has its own progress
};

const REVISIT_GAP_MS = 30 * 60 * 1000; // reopening within 30 minutes counts as the same visit

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
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
  setJournal(book, ch, text) {
    const k = `${book}.${ch}`;
    const j = { ...state.journal };
    if (text.trim()) j[k] = { text, updated: new Date().toISOString() }; else delete j[k];
    state.journal = j;
    save();
  },
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
  importJSON(text) {
    const data = JSON.parse(text);
    state = { ...defaults, ...data, apiBibleKey: state.apiBibleKey, esvKey: state.esvKey };
    save();
  },
};
