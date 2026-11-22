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
  pathRead: {},             // { chronological: { "GEN.1": iso } } kept per path, so each journey has its own progress
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
  setMode(name, on) { state.modes = { ...state.modes, [name]: on }; save(); },
  exportJSON: () => JSON.stringify({ ...state, apiBibleKey: "", esvKey: "" }, null, 2),
  importJSON(text) {
    const data = JSON.parse(text);
    state = { ...defaults, ...data, apiBibleKey: state.apiBibleKey, esvKey: state.esvKey };
    save();
  },
};
