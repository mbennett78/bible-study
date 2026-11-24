// Fetches chapter text from API.Bible (NASB) or the ESV API.
// Keys come from Settings and are stored on this device only.
import { store } from "./store.js";
import { BOOK_BY_ID } from "./books.js";

// API.Bible moved hosts in 2025; try the current one first, then the older one.
const API_BIBLE_HOSTS = ["https://rest.api.bible/v1", "https://api.scripture.api.bible/v1"];

// A small recent-chapters cache. Rereading a recent chapter (or flipping back to it)
// opens from here without using another request from the monthly allowance, and it
// still opens offline. Kept small and fresh on purpose: API.Bible asks apps to cache
// fewer than 500 consecutive verses and refresh within 14 days.
const CACHE_KEY = "bible-study:recent";
const CACHE_MAX = 10;
const CACHE_FRESH_MS = 14 * 24 * 60 * 60 * 1000;

function cacheGet(id) {
  try { return (JSON.parse(localStorage.getItem(CACHE_KEY)) || []).find((c) => c.id === id) || null; }
  catch { return null; }
}
function cachePut(entry) {
  try {
    const list = (JSON.parse(localStorage.getItem(CACHE_KEY)) || []).filter((c) => c.id !== entry.id);
    list.unshift(entry);
    localStorage.setItem(CACHE_KEY, JSON.stringify(list.slice(0, CACHE_MAX)));
  } catch { /* ignore */ }
}

export class TextError extends Error {
  constructor(message, kind) { super(message); this.kind = kind; }
}

async function apiBible(path) {
  const key = store.get("apiBibleKey");
  if (!key) throw new TextError("Add your API.Bible key in Settings to read the NASB.", "nokey");
  let lastErr;
  for (const host of API_BIBLE_HOSTS) {
    try {
      const res = await fetch(host + path, { headers: { "api-key": key } });
      if (res.status === 401 || res.status === 403) {
        throw new TextError("API.Bible didn't accept the key, or this version isn't enabled on your plan.", "auth");
      }
      if (!res.ok) throw new TextError(`API.Bible returned ${res.status}.`, "http");
      return await res.json();
    } catch (e) {
      lastErr = e;
      if (e instanceof TextError && e.kind === "auth") throw e;
    }
  }
  throw lastErr instanceof TextError ? lastErr : new TextError("Couldn't reach API.Bible. Check your connection.", "network");
}

// Lists English Bibles on the key's plan so the person can pick an NASB edition.
export async function listEnglishBibles() {
  const json = await apiBible("/bibles?language=eng");
  return json.data
    .map((b) => ({ id: b.id, abbr: String(b.abbreviationLocal || b.abbreviation || "").replace(/^eng(?=[A-Z])/, ""), name: b.nameLocal || b.name }))
    .sort((a, b) => a.abbr.localeCompare(b.abbr));
}

// A clear name for a version: "NASB 2020" and "NASB 1995" instead of look-alike "NASB"s.
export function versionName(b) {
  const both = `${b.abbr} ${b.name}`;
  if (/NASB|New American Standard/i.test(both)) {
    const year = (both.match(/\b(1977|1995|2020)\b/) || both.match(/(1977|1995|2020)/) || [])[1];
    return year ? `NASB ${year}` : "NASB";
  }
  return b.abbr;
}
const isNasb = (b) => /NASB/i.test(b.abbr) || /New American Standard/i.test(b.name);
// The NASB to start with: the 2020 edition when the plan has it, otherwise any NASB.
export function pickNasb(bibles) {
  const all = bibles.filter(isNasb);
  return all.find((b) => /2020/.test(`${b.abbr} ${b.name}`)) || all.find((b) => !/1977|1995/.test(`${b.abbr} ${b.name}`)) || all[0] || null;
}

async function nasbBibleId() {
  let bibleId = store.get("nasbBibleId");
  if (!bibleId) {
    const bibles = await listEnglishBibles();
    const nasb = pickNasb(bibles);
    if (!nasb) throw new TextError("No NASB edition is enabled on your API.Bible plan. Pick a version in Settings.", "noversion");
    bibleId = nasb.id;
    store.set("nasbBibleId", nasb.id);
    store.set("nasbLabel", versionName(nasb));
  }
  return bibleId;
}

// Counts how many verses in the whole Bible contain a word or phrase, using the
// person's own NASB on API.Bible. Each search uses one request from their allowance.
export async function searchBible(query, limit = 20) {
  const bibleId = await nasbBibleId();
  const json = await apiBible(`/bibles/${bibleId}/search?query=${encodeURIComponent(query)}&limit=${limit}&sort=canonical`);
  const d = json.data || {};
  return {
    total: d.total ?? (d.verses || []).length,
    verses: (d.verses || []).map((v) => ({ id: v.id, ref: v.reference, text: (v.text || "").replace(/\s+/g, " ").trim(), chapter: (v.chapterId || "").split(".") })),
  };
}

const CHAPTER_QUERY = "content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false";

async function nasbChapter(book, ch) {
  const json = await apiBible(`/bibles/${await nasbBibleId()}/chapters/${book}.${ch}?${CHAPTER_QUERY}`);
  return {
    html: json.data.content,
    copyright: json.data.copyright || "Scripture taken from the NASB®, © The Lockman Foundation. Used by permission.",
    label: store.get("nasbLabel") || "NASB",
  };
}

// Another version on the same API.Bible plan, such as the NIV, if the plan includes it.
async function otherChapter(bibleId, book, ch) {
  const json = await apiBible(`/bibles/${bibleId}/chapters/${book}.${ch}?${CHAPTER_QUERY}`);
  const label = ((store.get("extraBibles") || []).find((b) => b.id === bibleId) || {}).label || "";
  return { html: json.data.content, copyright: json.data.copyright || "", label };
}

// How the ESV API is asked for a chapter. A one-chapter book is asked for with its full verse
// range ("Jude 1:1-25"), because "Jude 1" could be read as verse 1 instead of chapter 1.
const ESV_NAMES = { SNG: "Song of Solomon" };
const ESV_ONE_CHAPTER = { OBA: 21, PHM: 25, "2JN": 13, "3JN": 15, JUD: 25 }; // verses in the ESV
export function esvQuery(book, ch) {
  const name = ESV_NAMES[book] || BOOK_BY_ID[book].name;
  return ESV_ONE_CHAPTER[book] ? `${name} 1:1-${ESV_ONE_CHAPTER[book]}` : `${name} ${ch}`;
}

async function esvChapter(book, ch) {
  const key = store.get("esvKey");
  if (!key) throw new TextError("Add your ESV key in Settings to read the ESV.", "nokey");
  const q = new URLSearchParams({
    q: esvQuery(book, ch),
    "include-footnotes": "false",
    "include-audio-link": "false",
    "include-passage-references": "false",
    "include-short-copyright": "false",
    "include-copyright": "false",
  });
  let res;
  try {
    res = await fetch(`https://api.esv.org/v3/passage/html/?${q}`, { headers: { Authorization: `Token ${key}` } });
  } catch {
    throw new TextError("Couldn't reach the ESV API. Check your connection.", "network");
  }
  if (res.status === 401 || res.status === 403) throw new TextError("The ESV API didn't accept the key.", "auth");
  if (!res.ok) throw new TextError(`The ESV API returned ${res.status}.`, "http");
  const json = await res.json();
  return {
    html: (json.passages || []).join(""),
    copyright: "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.",
    label: "ESV",
  };
}

export async function getChapter(version, book, ch) {
  // The NASB's saved copy is tied to the edition (1995 or 2020), so changing editions never
  // shows the other one's words.
  const id = `${version === "NASB" ? `NASB-${store.get("nasbBibleId") || "auto"}` : version}:${book}.${ch}`;
  const fresh = cacheGet(id);
  if (fresh && fresh.at && Date.now() - fresh.at < CACHE_FRESH_MS) return fresh;
  try {
    const result = version === "ESV" ? await esvChapter(book, ch)
      : version.startsWith("B:") ? await otherChapter(version.slice(2), book, ch)
      : await nasbChapter(book, ch);
    cachePut({ id, at: Date.now(), ...result });
    return result;
  } catch (e) {
    const cached = cacheGet(id);
    if (cached && e.kind === "network") return { ...cached, offline: true };
    throw e;
  }
}

export function bibleGatewayUrl(version, book, ch) {
  const extra = version.startsWith("B:") && (store.get("extraBibles") || []).find((b) => `B:${b.id}` === version);
  // Bible Gateway calls the 2020 edition plain "NASB".
  const v = version === "ESV" ? "ESV" : extra ? extra.label.replace(/[^A-Za-z0-9]/g, "").replace(/^NASB2020$/, "NASB") : /95/.test(store.get("nasbLabel")) ? "NASB1995" : "NASB";
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${BOOK_BY_ID[book].name} ${ch}`)}&version=${v}`;
}
