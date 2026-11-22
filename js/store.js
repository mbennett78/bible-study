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
};

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
  exportJSON: () => JSON.stringify({ ...state, apiBibleKey: "", esvKey: "" }, null, 2),
  importJSON(text) {
    const data = JSON.parse(text);
    state = { ...defaults, ...data, apiBibleKey: state.apiBibleKey, esvKey: state.esvKey };
    save();
  },
};
