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
  aiPartner: "",            // no longer used (the Bible helper is built in); kept so older saved data loads
  apiBibleKey: "",
  esvKey: "",
  nasbBibleId: "",          // API.Bible id for the chosen NASB edition
  nasbLabel: "",
  familySyncedAt: "",       // when this device last took the family's shared versions
  textSize: 19,
  theme: "auto",            // "auto" | "light" | "dark"
  last: { book: "JHN", chapter: 1 },
  read: {},                 // { "JHN.3": "2026-11-22T16:00:00.000Z" }
  visits: {},               // { "JHN.3": { count: 4, last: iso, dates: [iso, ...] } }
  favorites: {},            // { "JHN.3": iso }
  highlights: {},           // verse marks: { "JHN.3.16": { color: "yellow" | "" (cleared), bookmark: bool, updated: iso } }
  removed: {},              // when something was un-marked, so another device's copy doesn't bring it back: { "read:JHN.3": iso }
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
  helperSpeak: false,       // the study buddy reads his answers aloud
  buddyDid: {},             // how often this person asked Buddy to do each action (stays on this device and in their own backup)
  micExplained: false,      // the "why the microphone?" note has been shown
  helperStyle: "",          // "" | "simple" | "deep": how the Bible helper answers
  daily: {},                // which parts of Today show on Home: { verse, readings, devotion } (all on by default)
  tourSeen: false,          // the welcome tour has been shown (it can always be replayed)
  newsSeen: "",             // the last "What's new" note put away (js/whatsnew.js)
  newsOff: false,           // no "What's new" notes on Home
  style: "classic",         // the default look for new people. classic | classic2 | sage | nativity | easter | fall | christmas | masculine ("Animated") | animated ("For kids")
  margin: true,             // learning path margin open
  yearPace: true,           // suggest a daily reading to finish a path in a year
  journal: {},              // { "JHN.3": { text, prayer, gratitude, answered, created, updated } }
  entries: {},              // journal entries: { id: { kind, text, ref, answered, created, updated, deleted } }
  diary: {},                // daily life journal by date: { "2026-11-22": { text, prayer, gratitude, created, updated } }
  journalLock: "",          // SHA-256 of the passcode, or ""
  journalCode: "",          // the passcode itself, so its owner can look it up (Show)
  trivia: { answered: 0, correct: 0, sessions: [], recent: [] },
  setup: { done: false, skipped: false }, // first-time setup
  graphics: "full",         // "full" | "simple" (no cartoon faces or characters) | "none"
  show: {},                 // features someone has switched off, e.g. { trivia: false }
  owner: "",                // the signed-in account this saved data belongs to
  archives: [],             // past walks: { id, pathId, started, ended, reads, finished }             // { chronological: { "GEN.1": iso } } kept per path, so each journey has its own progress
};

const REVISIT_GAP_MS = 30 * 60 * 1000; // reopening within 30 minutes counts as the same visit

let state = load();

// Fills in any settings added since the data was saved (nested objects too), then upgrades
// it. Data saved before versioning has no dataVersion, so it starts at 1.
function fromSaved(saved, keep = {}) {
  const merged = { ...structuredClone(defaults), ...saved, ...keep };
  for (const [k, v] of Object.entries(defaults)) {
    if (v && typeof v === "object" && !Array.isArray(v) && saved[k] && typeof saved[k] === "object") merged[k] = { ...v, ...saved[k] };
  }
  merged.dataVersion = saved.dataVersion || 1;
  return migrate(merged);
}

// Updates to the app never touch this saved data: it lives under one fixed key, and
// new settings are filled in from the defaults without overwriting anything saved.
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? fromSaved(JSON.parse(raw)) : structuredClone(defaults);
  } catch {
    try { const safe = localStorage.getItem(`${KEY}:safety`); if (safe) return fromSaved(JSON.parse(safe)); } catch { /* fall through */ }
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

// Settings that belong to the device, not the person: kept when someone else signs in.
const DEVICE_KEYS = ["apiBibleKey", "esvKey", "nasbBibleId", "nasbLabel", "extraBibles", "versionsDefaulted", "familySyncedAt", "voiceName", "theme"];

const markRemoved = (k) => { state.removed = { ...(state.removed || {}), [k]: new Date().toISOString() }; };
const unremove = (k) => { if (state.removed?.[k]) { const r = { ...state.removed }; delete r[k]; state.removed = r; } };

export const store = {
  get: (k) => state[k],
  set(k, v) { state[k] = v; save(); },
  isRead: (book, ch) => Boolean(state.read[`${book}.${ch}`]),
  setRead(book, ch, on) {
    const k = `${book}.${ch}`;
    if (on) { state.read[k] = new Date().toISOString(); unremove(`read:${k}`); }
    else { delete state.read[k]; markRemoved(`read:${k}`); }
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
    if (state.favorites[k]) { delete state.favorites[k]; markRemoved(`fav:${k}`); } else { state.favorites[k] = new Date().toISOString(); unremove(`fav:${k}`); }
    save();
    return Boolean(state.favorites[k]);
  },
  allFavorites: () => Object.entries(state.favorites).map(([k, at]) => ({ key: k, at })).sort((a, b) => b.at.localeCompare(a.at)),
  isPathRead: (pathId, book, ch) => Boolean(state.pathRead[pathId]?.[`${book}.${ch}`]),
  setPathRead(pathId, book, ch, on) {
    const k = `${book}.${ch}`;
    const m = { ...(state.pathRead[pathId] || {}) };
    if (on) { m[k] = new Date().toISOString(); unremove(`path:${pathId}:${k}`); } else { delete m[k]; markRemoved(`path:${pathId}:${k}`); }
    state.pathRead = { ...state.pathRead, [pathId]: m };
    save();
  },
  pathReadCount: (pathId) => Object.keys(state.pathRead[pathId] || {}).length,
  startPath(pathId) {
    state.activePath = pathId;
    if (!state.pathStarted[pathId]) state.pathStarted = { ...state.pathStarted, [pathId]: new Date().toISOString() };
    save();
  },
  // Verse highlights and bookmarks. A cleared mark stays as a dated marker so it syncs.
  verseMark: (book, ch, v) => { const m = state.highlights?.[`${book}.${ch}.${v}`]; return m && (m.color || m.bookmark) ? m : null; },
  chapterMarks(book, ch) {
    const pre = `${book}.${ch}.`, out = {};
    for (const [k, m] of Object.entries(state.highlights || {})) if (k.startsWith(pre) && (m.color || m.bookmark)) out[Number(k.slice(pre.length))] = m;
    return out;
  },
  setVerseMark(book, ch, v, fields) {
    const k = `${book}.${ch}.${v}`;
    state.highlights = { ...(state.highlights || {}), [k]: { color: "", bookmark: false, ...(state.highlights?.[k] || {}), ...fields, updated: new Date().toISOString() } };
    save();
  },
  allVerseMarks: () => Object.entries(state.highlights || {}).filter(([, m]) => m.color || m.bookmark).map(([k, m]) => ({ key: k, ...m })).sort((a, b) => b.updated.localeCompare(a.updated)),
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
  // Journal entries, one per "Add entry": My day, Prayer, Gratitude or Bible thoughts.
  // A deleted entry is kept as a marker so another device's copy doesn't bring it back.
  entry: (id) => { const e = state.entries?.[id]; return e && !e.deleted ? { id, ...e } : null; },
  saveEntry(id, fields) {
    const now = new Date().toISOString();
    const was = state.entries?.[id] || {};
    state.entries = { ...(state.entries || {}), [id]: { kind: "day", text: "", created: now, ...was, ...fields, deleted: false, updated: now } };
    save();
  },
  deleteEntry(id) {
    state.entries = { ...(state.entries || {}), [id]: { deleted: true, updated: new Date().toISOString() } };
    save();
  },
  allEntries: () => Object.entries(state.entries || {}).filter(([, v]) => !v.deleted && ((v.text || "").trim() || (v.title || "").trim() || (v.prayer || "").trim() || (v.gratitude || "").trim() || v.quotes?.length || v.pics?.length)).map(([id, v]) => ({ id, ...v })).sort((a, b) => b.created.localeCompare(a.created)),
  allDiary: () => Object.entries(state.diary || {}).map(([day, v]) => ({ day, ...v })).sort((a, b) => b.day.localeCompare(a.day)),
  allJournal: () => Object.entries(state.journal).map(([k, v]) => ({ key: k, ...v })).sort((a, b) => b.updated.localeCompare(a.updated)),
  // Which questions were asked is always kept, so rounds stay fresh. The score history (the
  // "Bible knowledge" record) is kept only when they've chosen to keep it.
  recordTrivia(results, label, keepRecord = true) {
    const t = state.trivia;
    const correct = results.filter((r) => r.right).length;
    const seen = { ...(t.seen || {}) };
    for (const r of results) seen[r.id] = (seen[r.id] || 0) + 1;
    state.trivia = {
      answered: keepRecord ? t.answered + results.length : t.answered,
      correct: keepRecord ? t.correct + correct : t.correct,
      sessions: keepRecord ? [{ at: new Date().toISOString(), score: correct, total: results.length, label }, ...t.sessions].slice(0, 200) : t.sessions,
      recent: [...results.map((r) => r.id), ...t.recent].slice(0, 150),
      seen,
    };
    save();
  },
  clearKnowledge() {
    state.trivia = { ...state.trivia, answered: 0, correct: 0, sessions: [] };
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
  // No reading, notes or journal yet (in this device's data, or in a backup's).
  isEmpty: (d = state) => !Object.keys(d.read || {}).length && !Object.keys(d.journal || {}).length && !Object.keys(d.diary || {}).length && !Object.keys(d.entries || {}).length
    && !Object.keys(d.visits || {}).length && !Object.keys(d.favorites || {}).length && !Object.values(d.pathRead || {}).some((m) => Object.keys(m || {}).length),
  restore(data) {
    state = fromSaved(data, { apiBibleKey: state.apiBibleKey, esvKey: state.esvKey, owner: state.owner }); save();
  },
  // Brings in progress from another device without losing anything here: read marks, favorites,
  // visits, path progress and archives are combined; for a journal entry the newer one is kept.
  mergeFrom(data) {
    if (!data) return false;
    const before = JSON.stringify([state.read, state.favorites, state.visits, state.pathRead, state.pathStarted, state.journal, state.diary, state.entries, state.highlights, state.removed, state.archives.length, state.trivia, state.activePath]);
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
    state.entries = byNewer(state.entries, data.entries);
    const ids = new Set(state.archives.map((a) => a.id));
    state.archives = [...state.archives, ...(data.archives || []).filter((a) => !ids.has(a.id))];
    if ((data.trivia?.answered || 0) > (state.trivia?.answered || 0)) state.trivia = data.trivia;
    if (!state.activePath && data.activePath) state.activePath = data.activePath;
    state.highlights = byNewer(state.highlights, data.highlights);
    // Un-marked on one device: stays un-marked everywhere, unless it was marked again later.
    const removed = { ...(data.removed || {}) };
    for (const [k, at] of Object.entries(state.removed || {})) if (!removed[k] || at > removed[k]) removed[k] = at;
    state.removed = removed;
    const drop = (obj, prefix) => { for (const k of Object.keys(obj)) { const at = removed[`${prefix}${k}`]; if (at && at >= obj[k]) delete obj[k]; } };
    drop(state.read, "read:"); drop(state.favorites, "fav:");
    for (const [pid, m] of Object.entries(state.pathRead)) { const c = { ...m }; drop(c, `path:${pid}:`); state.pathRead[pid] = c; }
    const changed = before !== JSON.stringify([state.read, state.favorites, state.visits, state.pathRead, state.pathStarted, state.journal, state.diary, state.entries, state.highlights, state.removed, state.archives.length, state.trivia, state.activePath]);
    if (changed) save();
    return changed;
  },
  // A shared tablet: each person's reading, notes and journal are kept apart. When someone
  // different signs in, the last person's data is set aside on this device (it is also in
  // their account backup) and the new person's own comes back. Returns true if it switched.
  switchPerson(userId) {
    if (!userId || state.owner === userId) return false;
    if (!state.owner) { state.owner = userId; save(); return false; } // saved before accounts were tracked
    const device = Object.fromEntries(DEVICE_KEYS.map((k) => [k, state[k]]));
    try { localStorage.setItem(`${KEY}:person:${state.owner}`, JSON.stringify(state)); } catch { /* full: their account backup still has it */ }
    let theirs = null;
    try { theirs = JSON.parse(localStorage.getItem(`${KEY}:person:${userId}`)); localStorage.removeItem(`${KEY}:person:${userId}`); } catch { /* none */ }
    state = fromSaved(theirs || { dataVersion: DATA_VERSION }, { ...device, owner: userId });
    save();
    return true;
  },
  importJSON(text) {
    const data = JSON.parse(text);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("not a backup");
    state = fromSaved(data, { apiBibleKey: state.apiBibleKey, esvKey: state.esvKey, owner: state.owner });
    save();
  },
};
