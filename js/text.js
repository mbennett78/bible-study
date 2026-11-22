// Fetches chapter text from API.Bible (NASB) or the ESV API.
// Keys come from Settings and are stored on this device only.
import { store } from "./store.js";
import { BOOK_BY_ID } from "./books.js";

// API.Bible moved hosts in 2025; try the current one first, then the older one.
const API_BIBLE_HOSTS = ["https://rest.api.bible/v1", "https://api.scripture.api.bible/v1"];

// A small recent-chapters cache so recently read chapters open offline.
// Kept small on purpose: both publishers limit how much text an app may store.
const CACHE_KEY = "bible-study:recent";
const CACHE_MAX = 10;

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
    .map((b) => ({ id: b.id, abbr: b.abbreviationLocal || b.abbreviation, name: b.nameLocal || b.name }))
    .sort((a, b) => a.abbr.localeCompare(b.abbr));
}

async function nasbChapter(book, ch) {
  let bibleId = store.get("nasbBibleId");
  if (!bibleId) {
    const bibles = await listEnglishBibles();
    const nasb = bibles.find((b) => /NASB/i.test(b.abbr) || /New American Standard/i.test(b.name));
    if (!nasb) throw new TextError("No NASB edition is enabled on your API.Bible plan. Pick a version in Settings.", "noversion");
    bibleId = nasb.id;
    store.set("nasbBibleId", nasb.id);
    store.set("nasbLabel", nasb.abbr);
  }
  const q = "content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false";
  const json = await apiBible(`/bibles/${bibleId}/chapters/${book}.${ch}?${q}`);
  return {
    html: json.data.content,
    copyright: json.data.copyright || "Scripture taken from the NASB®, © The Lockman Foundation. Used by permission.",
    label: store.get("nasbLabel") || "NASB",
  };
}

async function esvChapter(book, ch) {
  const key = store.get("esvKey");
  if (!key) throw new TextError("Add your ESV key in Settings to read the ESV.", "nokey");
  const q = new URLSearchParams({
    q: `${BOOK_BY_ID[book].name} ${ch}`,
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
  const id = `${version}:${book}.${ch}`;
  try {
    const result = version === "ESV" ? await esvChapter(book, ch) : await nasbChapter(book, ch);
    cachePut({ id, ...result });
    return result;
  } catch (e) {
    const cached = cacheGet(id);
    if (cached && e.kind === "network") return { ...cached, offline: true };
    throw e;
  }
}

export function bibleGatewayUrl(version, book, ch) {
  const v = version === "ESV" ? "ESV" : /95/.test(store.get("nasbLabel")) ? "NASB1995" : "NASB";
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${BOOK_BY_ID[book].name} ${ch}`)}&version=${v}`;
}
