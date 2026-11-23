import { BOOKS, BOOK_BY_ID, TOTAL_CHAPTERS } from "./books.js";
import { store, onSave } from "./store.js";
import { getChapter, listEnglishBibles, bibleGatewayUrl, searchBible } from "./text.js";
import { PATH_ORDER, PATH_BY_ID, pathChapters, expandReading, readingLabel } from "./paths.js";
import { Reader, Commands, chunksFrom, canSpeak, canListen, listVoices, dictateInto } from "./speech.js";
import { pickQuestions, knowledgeRating, bankSize } from "./trivia.js";
import { THEME_LOOKS, seaScene, fishFlourish, classicFlourish, fishStrip, friend, edgeVines, cornerSprig, passageStrip } from "./art.js";
import { notesFor, sampleChapters, EVIDENCE } from "./notes.js";
import { glossFor, stem } from "./glossary.js";
import { INTROS } from "./intros.js";
import { dailyToday } from "./daily.js";
import { authEnabled, currentUser, signIn, emailSignInLink, verifyEmailCode, changePassword, signOut, onSignedOut, linkArrival, getFamilyKey, setFamilyKey, saveBackup, loadBackup, askHelper, helperStatus } from "./auth.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- Appearance ---------- */
// High contrast: black (or white, in dark mode) words and stronger lines, whatever the look.
const MAX_EXTRA_BIBLES = 6; // extra versions on the reader's switch, beside the NASB and ESV
const CONTRAST_VARS = ["--text", "--muted", "--line", "--verse"];
function applyContrast() {
  const root = document.documentElement;
  CONTRAST_VARS.forEach((v) => root.style.removeProperty(v));
  root.toggleAttribute("data-contrast", Boolean(store.get("contrast")));
  if (!store.get("contrast")) return;
  const bg = getComputedStyle(root).getPropertyValue("--bg").trim();
  const m = bg.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
  const dark = m ? (parseInt(m[1], 16) * 0.3 + parseInt(m[2], 16) * 0.59 + parseInt(m[3], 16) * 0.11) < 128 : false;
  const [t, mu, li] = dark ? ["#ffffff", "#e6e6e6", "#9a9a9a"] : ["#000000", "#1f1f1f", "#6b6b6b"];
  root.style.setProperty("--text", t); root.style.setProperty("--muted", mu); root.style.setProperty("--line", li); root.style.setProperty("--verse", mu);
}
function applyAppearance() {
  const theme = store.get("theme");
  if (theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  document.documentElement.style.setProperty("--reading-size", `${store.get("textSize")}px`);
  document.documentElement.style.fontSize = store.get("uiScale") > 100 ? `${store.get("uiScale")}%` : "";
  document.documentElement.dataset.graphics = store.get("graphics") || "full";
  const shown = store.get("show") || {};
  for (const f of FEATURES) document.body.classList.toggle(`hide-${f.id}`, shown[f.id] === false);
  const style = store.get("style");
  if (style === "sage") delete document.documentElement.dataset.style;
  else document.documentElement.dataset.style = style;
  if (isStill(style)) document.documentElement.dataset.still = "1"; else delete document.documentElement.dataset.still;
  // Match the phone's status bar and Safari's edges to this look's page color.
  const page = getComputedStyle(document.documentElement).getPropertyValue("--page").trim();
  if (page) document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.content = page; });
  applyContrast();
  if (typeof updateMascot === "function") updateMascot();
}

/* ---------- Navigation between tabs ---------- */
function showView(name) {
  document.querySelectorAll(".view").forEach((v) => { v.hidden = v.id !== `view-${name}`; });
  document.querySelectorAll(".tabbar button").forEach((b) => {
    if (b.dataset.view === name) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  document.body.dataset.view = name;
  $("#topTitle").textContent = { home: "Home", books: "My study", path: "My path", settings: "Settings", shop: "Books and music" }[name] || "";
  if (name === "shop") renderShop();
  if (name === "home") renderHome();
  if (name === "books") renderMyStudy();
  if (name === "path") renderPath();
  if (name === "settings") renderSetupCard();
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tabbar button").forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));
// Keep page content clear of the bottom menu, whatever its real height on this device.
// Some iPad Safari windows place fixed bars off the true bottom edge. Line the bottom menu up
// with what's actually on screen, including when someone has zoomed in.
if (window.visualViewport) {
  const bar = document.querySelector(".tabbar"), vv = window.visualViewport;
  const pin = () => {
    const gap = Math.round(window.innerHeight - (vv.height + vv.offsetTop));
    bar.style.transform = Math.abs(gap) > 2 ? `translateY(${-gap}px)` : "";
  };
  vv.addEventListener("resize", pin); vv.addEventListener("scroll", pin); window.addEventListener("scroll", pin, { passive: true }); pin();
}
if ("ResizeObserver" in window) new ResizeObserver(([e]) => document.documentElement.style.setProperty("--tabbar-total", `${Math.ceil(e.target.getBoundingClientRect().height)}px`)).observe(document.querySelector(".tabbar"));

/* ---------- Reading ---------- */
function neighbors(book, ch) {
  const i = BOOKS.findIndex((b) => b.id === book);
  const prev = ch > 1 ? { book, chapter: ch - 1 } : i > 0 ? { book: BOOKS[i - 1].id, chapter: BOOKS[i - 1].chapters } : null;
  const next = ch < BOOK_BY_ID[book].chapters ? { book, chapter: ch + 1 } : i < BOOKS.length - 1 ? { book: BOOKS[i + 1].id, chapter: 1 } : null;
  return { prev, next };
}
const refName = (r) => `${BOOK_BY_ID[r.book].name} ${r.chapter}`;

let loadToken = 0;
let autoplayNext = false;
async function openChapter(book, chapter, { scroll = true } = {}) {
  store.set("last", { book, chapter });
  const version = store.get("version");
  $("#refLabel").textContent = `${BOOK_BY_ID[book].name} ${chapter}`;
  document.title = `${BOOK_BY_ID[book].name} ${chapter} · Bible Study`;
  $("#gatewayLink").href = bibleGatewayUrl(version, book, chapter);
  updateMarkRead();
  updateFavorite();
  updateVisitLine();
  updatePathBits();
  renderJournal();
  updateTriviaHint();
  renderNotes(book, chapter);
  renderPassageArt(book, chapter);
  renderMargin();
  resetChat();
  friendWhich = friendWhich === "lamb" ? "donkey" : "lamb";
  if (store.get("style") === "animated") $("#friendSlot").innerHTML = friend(friendWhich);
  mascotSay(mascotLineFor(book, chapter));
  reader.stop();
  $("#listenBtn").setAttribute("aria-pressed", "false");
  syncPlayBtn(false);
  $("#topPrev").disabled = !neighbors(book, chapter).prev;
  $("#topNext").disabled = !neighbors(book, chapter).next;

  const { prev, next } = neighbors(book, chapter);
  $("#prevCh").disabled = !prev;
  $("#nextCh").disabled = !next;
  $("#prevCh span").textContent = prev ? refName(prev) : "";
  $("#nextCh span").textContent = next ? refName(next) : "";
  $("#prevCh").onclick = () => prev && openChapter(prev.book, prev.chapter);
  $("#nextCh").onclick = () => next && openChapter(next.book, next.chapter);

  if (scroll) window.scrollTo(0, 0);
  renderBookIntro(book, chapter);
  const token = ++loadToken;
  const readerEl = $("#reader");
  readerEl.innerHTML = `<p class="muted">Loading…</p>`;
  $("#copyright").textContent = "";
  try {
    const result = await getChapter(version, book, chapter);
    if (token !== loadToken) return;
    readerEl.innerHTML = (result.offline ? `<p class="offline-note">Offline: showing a saved copy.</p>` : "") + sanitize(result.html);
    $("#copyright").textContent = result.copyright;
    store.recordVisit(book, chapter);
    updateVisitLine();
    if (!$("#drive").hidden) $("#driveText").innerHTML = readerEl.innerHTML;
    reader.load(chunksFrom(readerEl), `${BOOK_BY_ID[book].name}, chapter ${chapter}.`);
    if (autoplayNext) { autoplayNext = false; reader.play(); }
  } catch (e) {
    if (token !== loadToken) return;
    const needsSettings = e.kind === "nokey" || e.kind === "auth" || e.kind === "noversion";
    autoplayNext = false;
    if (driveOn()) $("#driveStatus").textContent = e.message || "Couldn't load this chapter.";
    if (authEnabled && signedInUser && needsSettings) {
      // Family members never see key setup: point them to the organizer instead.
      const why = e.kind === "nokey" ? "No Bible key is saved on this device yet, and none has been shared with the family."
        : e.kind === "auth" ? "API.Bible didn't accept the saved key, or this version isn't on the plan."
        : "No NASB edition was found on the plan. Pick one under Load versions on my plan.";
      readerEl.innerHTML = `<div class="message"><strong>The Bible text isn't ready yet</strong>Please ask the person who set up the app to share the Bible text with the family, then tap Try again.
        <span class="why">${esc(why)}</span><br><button class="small" id="retryFamily">Try again</button> <button class="small" id="iSetUp">I set up the app</button></div>`;
      $("#retryFamily").addEventListener("click", async () => { const fk = await getFamilyKey(); if (fk) { store.set("apiBibleKey", ""); applyInvite({ ...fk, look: "" }); } openChapter(book, chapter); });
      $("#iSetUp").addEventListener("click", () => { showView("settings"); const box = $("#organizerBox"); if (box) box.open = true; $("#bibleTextCard").scrollIntoView({ block: "start" }); });
      return;
    }
    readerEl.innerHTML = `<div class="message"><strong>Can't show this chapter yet</strong>${esc(e.message || "Something went wrong.")}
      ${needsSettings ? `<br><button class="small" id="goSettings">${e.kind === "nokey" ? "How to get your free key" : "Open Settings"}</button>` : `<br><button class="small" id="retry">Try again</button>`}</div>`;
    $("#goSettings")?.addEventListener("click", () => { showView("settings"); if (e.kind === "nokey") { $("#keyHelp").open = true; $("#keyHelp").scrollIntoView({ block: "center" }); } });
    $("#retry")?.addEventListener("click", () => openChapter(book, chapter));
  }
}

// Text comes from the publishers' APIs; keep only harmless markup.
function sanitize(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  tpl.content.querySelectorAll("script, style, iframe, object, embed, link, meta, img, audio, video, form").forEach((n) => n.remove());
  tpl.content.querySelectorAll("*").forEach((el) => {
    for (const attr of [...el.attributes]) {
      if (!["class", "data-number", "data-sid", "data-vid"].includes(attr.name)) el.removeAttribute(attr.name);
    }
    if (el.tagName === "A") el.replaceWith(...el.childNodes);
  });
  return tpl.innerHTML;
}

function updateMarkRead() {
  const { book, chapter } = store.get("last");
  const on = store.isRead(book, chapter);
  $("#markRead").setAttribute("aria-pressed", String(on));
  $("#markRead span").textContent = on ? "Read" : "Mark chapter read";
}
function toggleRead() {
  const { book, chapter } = store.get("last");
  const on = !store.isRead(book, chapter);
  store.setRead(book, chapter, on);
  const path = store.get("activePath");
  if (path && pathIndex(path, book, chapter) >= 0) store.setPathRead(path, book, chapter, on);
  updateMarkRead();
  updatePathBits();
  updateDrive();
  renderMargin();
  if (on && store.readCount(book) === BOOK_BY_ID[book].chapters) {
    $("#triviaHint").textContent = `You finished ${BOOK_BY_ID[book].name}! Play ${BOOK_BY_ID[book].name} trivia`;
    $("#triviaBtn").classList.add("glow");
    mascotSay(`You finished ${BOOK_BY_ID[book].name}! Want to try some trivia?`);
  } else if (on) mascotSay(pick(["Well done today.", "Another chapter hidden in your heart.", "Keep going, you're doing great."]));
  if (on) celebrate(store.readCount(book) === BOOK_BY_ID[book].chapters ? "big" : "small");
}
$("#markRead").addEventListener("click", toggleRead);

/* ---------- Favorites & visit history ---------- */
const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
const keyRef = (k) => { const [book, ch] = k.split("."); return { book, chapter: Number(ch), name: `${BOOK_BY_ID[book].name} ${ch}` }; };
function updateFavorite() {
  const { book, chapter } = store.get("last");
  $("#favBtn").setAttribute("aria-pressed", String(store.isFavorite(book, chapter)));
}
$("#favBtn").addEventListener("click", () => {
  const { book, chapter } = store.get("last");
  store.toggleFavorite(book, chapter);
  updateFavorite();
});
function updateVisitLine() {
  const { book, chapter } = store.get("last");
  const v = store.visit(book, chapter);
  const prev = v && v.dates[1];
  $("#visitLine").textContent = !v ? "First time studying this chapter"
    : v.count === 1 ? `First studied ${fmtDate(v.dates[0])}`
    : `Visited ${v.count} times · previous visit ${fmtDate(prev)}`;
}

// The version switch at the top: NASB, any extra versions picked from the same API.Bible
// plan (Settings, Bible text), and the ESV when an ESV key is saved.
function versionList() {
  const list = [["NASB", (store.get("nasbLabel") || "NASB").replace(/\s.*$/, "")]];
  for (const b of store.get("extraBibles") || []) list.push([`B:${b.id}`, b.label]);
  if (store.get("esvKey")) list.push(["ESV", "ESV"]);
  return list;
}
function syncVersionSwitch() {
  const list = versionList();
  if (!list.some(([v]) => v === store.get("version"))) store.set("version", "NASB");
  const cur = store.get("version");
  const el = document.querySelector(".version-switch");
  el.hidden = list.length < 2;
  el.innerHTML = list.length > 3
    ? `<select aria-label="Bible version">${list.map(([v, l]) => `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(l)}</option>`).join("")}</select>`
    : list.map(([v, l]) => `<button data-version="${esc(v)}" aria-pressed="${v === cur}">${esc(l)}</button>`).join("");
  const pick = async (v) => {
    // Switching versions mid-chapter keeps you on the verse you were reading.
    const verse = $("#view-read").hidden ? 0 : verseInView();
    store.set("version", v);
    syncVersionSwitch();
    const { book, chapter } = store.get("last");
    await openChapter(book, chapter, { scroll: false });
    if (verse > 1) goToVerse(verse);
  };
  el.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => pick(b.dataset.version)));
  el.querySelector("select")?.addEventListener("change", (e) => pick(e.target.value));
}

/* ---------- Book & chapter picker ---------- */
const picker = $("#picker");
// The book picker works like a study Bible app: square tiles for every book, colored by
// section, Old Testament then New. Tap a book for its introduction and chapters, then a
// chapter for its verses. Typing is optional.
const BOOK_GROUPS = [
  ["law", "Law", "GEN", "DEU"], ["hist", "History", "JOS", "EST"], ["poet", "Poetry and Wisdom", "JOB", "SNG"],
  ["major", "Major Prophets", "ISA", "DAN"], ["minor", "Minor Prophets", "HOS", "MAL"],
  ["gosp", "Gospels", "MAT", "JHN"], ["acts", "Acts", "ACT", "ACT"], ["paul", "Paul's Letters", "ROM", "PHM"],
  ["gen", "General Letters", "HEB", "JUD"], ["rev", "Revelation", "REV", "REV"],
];
const bookIndex = (id) => BOOKS.findIndex((b) => b.id === id);
const groupOf = (id) => BOOK_GROUPS.find(([, , a, z]) => bookIndex(id) >= bookIndex(a) && bookIndex(id) <= bookIndex(z));
const SHORT_NAMES = { "Song of Songs": "Song", Lamentations: "Lament&shy;ations", Ecclesiastes: "Eccle&shy;siastes", Deuteronomy: "Deuter&shy;onomy", Thessalonians: "Thess" };
function tileName(name) {
  const m = name.match(/^(\d) (.+)$/);
  if (m) return `${m[1]} ${SHORT_NAMES[m[2]] || esc(m[2])}`;
  return SHORT_NAMES[name] || esc(name);
}
let pickerBookOpen = null; // the book whose chapters are showing, so Back from verses returns there
function pickerBooks() {
  pickerBookOpen = null;
  $("#pickerTitle").textContent = "Books";
  $("#pickerBack").hidden = true;
  const here = store.get("last").book;
  const section = (t, label) => `<p class="testament-title">${label}</p><div class="book-tiles">${
    BOOKS.filter((b) => b.testament === t).map((b) => { const g = groupOf(b.id); const read = store.readCount(b.id);
      return `<button class="book-tile g-${g[0]}${b.id === here ? " is-here" : ""}" data-book="${b.id}" aria-label="${esc(b.name)}"><span class="bt-name">${tileName(b.name)}</span>${read ? `<small>${read}/${b.chapters}</small>` : ""}</button>`; }).join("")
  }</div>`;
  const key = BOOK_GROUPS.map(([g, label]) => `<span class="bk-key g-${g}">${esc(label)}</span>`).join("");
  $("#pickerBody").innerHTML = section("OT", "Old Testament") + section("NT", "New Testament") + `<div class="book-key">${key}</div>`;
  $("#pickerBody").querySelectorAll("[data-book]").forEach((btn) => btn.addEventListener("click", () => pickerChapters(btn.dataset.book)));
  $("#pickerBody").scrollTop = 0;
}
function pickerChapters(bookId) {
  const b = BOOK_BY_ID[bookId], intro = INTROS[bookId];
  $("#pickerTitle").textContent = b.name;
  $("#pickerBack").hidden = false;
  $("#pickerBody").innerHTML = `${intro ? `<details class="picker-intro" open><summary>About ${esc(b.name)}</summary>
      <p>${esc(intro.about)}</p><p class="muted small-print"><strong>Written by:</strong> ${esc(intro.who)} <strong>When:</strong> ${esc(intro.when)}</p></details>` : ""}
    <button type="button" class="big-btn" id="pickStart">Start reading ${esc(b.name)} 1</button>
    <p class="testament-title">Choose a chapter</p>
    <div class="chapter-grid">${chapterButtons(b)}</div>`;
  $("#pickStart").addEventListener("click", () => { picker.close(); showView("read"); openChapter(b.id, 1); });
  $("#pickerBody").querySelectorAll("[data-ch]").forEach((btn) => btn.addEventListener("click", () => pickerVerses(b.id, Number(btn.dataset.ch))));
  $("#pickerBody").scrollTop = 0;
}
async function pickerVerses(bookId, chapter) {
  const b = BOOK_BY_ID[bookId];
  pickerBookOpen = bookId;
  $("#pickerTitle").textContent = `${b.name} ${chapter}`;
  $("#pickerBack").hidden = false;
  $("#pickerBody").innerHTML = `<button type="button" class="big-btn" id="pickWhole">Read all of chapter ${chapter}</button>
    <p class="testament-title">Or go to a verse</p><div class="chapter-grid" id="verseGrid"><p class="muted small-print">Loading verses…</p></div>`;
  const go = (v) => { picker.close(); showView("read"); openChapter(b.id, chapter).then(() => v && goToVerse(v)); };
  $("#pickWhole").addEventListener("click", () => go(0));
  // Verse count from the word list for this chapter (every verse has words).
  const rows = await loadStrongs(bookId, chapter);
  const grid = $("#verseGrid");
  if (!grid || !grid.isConnected) return;
  const n = rows ? Math.max(0, ...rows.flatMap((r) => r[5])) : 0;
  if (!n) { grid.innerHTML = `<p class="muted small-print">Verse numbers couldn't load. Tap "Read all of chapter ${chapter}".</p>`; return; }
  grid.innerHTML = Array.from({ length: n }, (_, i) => `<button data-v="${i + 1}" aria-label="Verse ${i + 1}">${i + 1}</button>`).join("");
  grid.querySelectorAll("[data-v]").forEach((btn) => btn.addEventListener("click", () => go(Number(btn.dataset.v))));
}
// Scroll to a verse in the open chapter and flash it so it's easy to spot.
// The first verse number showing at the top of the screen (1 if none).
function verseInView() {
  const top = ($(".topbar")?.getBoundingClientRect().bottom || 0) + 8;
  const marks = [...$("#reader").querySelectorAll(".v, .verse-num, .chapter-num, [data-number]")];
  const m = marks.find((x) => x.getBoundingClientRect().top >= top);
  return m ? (m.classList.contains("chapter-num") ? 1 : parseInt(m.dataset.number || m.textContent, 10) || 1) : 1;
}
function goToVerse(v) {
  const mark = [...$("#reader").querySelectorAll(".v, .verse-num, .chapter-num, [data-number]")].find((m) => (m.classList.contains("chapter-num") ? 1 : parseInt(m.dataset.number || m.textContent, 10)) === v);
  if (!mark) return;
  mark.scrollIntoView({ block: "center" });
  mark.classList.add("verse-flash");
  setTimeout(() => mark.classList.remove("verse-flash"), 2600);
}
function chapterButtons(b) {
  const here = store.get("last");
  return Array.from({ length: b.chapters }, (_, i) => i + 1).map((ch) => {
    const cls = [store.isRead(b.id, ch) && "is-read", here.book === b.id && here.chapter === ch && "is-here"].filter(Boolean).join(" ");
    return `<button data-ch="${ch}" class="${cls}" aria-label="${esc(b.name)} ${ch}${store.isRead(b.id, ch) ? ", read" : ""}">${ch}</button>`;
  }).join("");
}
$("#refButton").addEventListener("click", openPicker);
$("#pickerBack").addEventListener("click", () => { $("#pickerSearch").value = ""; if (pickerBookOpen) { const b = pickerBookOpen; pickerChapters(b); pickerBookOpen = null; } else pickerBooks(); });
$("#pickerClose").addEventListener("click", () => picker.close());
picker.addEventListener("click", (e) => { if (e.target === picker) picker.close(); });

/* ---------- Progress tracker ---------- */
function renderProgress() {
  const total = store.totalRead();
  $("#overallCount").textContent = `${total} of ${TOTAL_CHAPTERS} chapters`;
  $("#overallBar").style.width = `${(total / TOTAL_CHAPTERS) * 100}%`;
  const section = (t, label) => `<p class="testament-title">${label}</p>${BOOKS.filter((b) => b.testament === t).map((b) => {
    const n = store.readCount(b.id);
    return `<details class="book-row" data-book="${b.id}"><summary><span>${esc(b.name)}</span><span class="count">${n}/${b.chapters}</span><div class="bar"><span style="width:${(n / b.chapters) * 100}%"></span></div></summary><div class="chapter-grid"></div></details>`;
  }).join("")}`;
  const list = $("#bookList");
  list.innerHTML = section("OT", "Old Testament") + section("NT", "New Testament");
  list.querySelectorAll("details").forEach((d) => d.addEventListener("toggle", () => {
    if (!d.open) return;
    const b = BOOK_BY_ID[d.dataset.book];
    const grid = d.querySelector(".chapter-grid");
    grid.innerHTML = chapterButtons(b);
    grid.querySelectorAll("[data-ch]").forEach((btn) => btn.addEventListener("click", () => {
      showView("read"); openChapter(b.id, Number(btn.dataset.ch));
    }));
  }));
}

/* ---------- My study: history & favorites ---------- */
let segment = "progress";
document.querySelectorAll(".segments button").forEach((b) => b.addEventListener("click", () => { segment = b.dataset.seg; renderMyStudy(); }));
function renderMyStudy() {
  document.querySelectorAll(".segments button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.seg === segment)));
  document.querySelectorAll("[data-seg-panel]").forEach((p) => { p.hidden = p.dataset.segPanel !== segment; });
  if (segment === "progress") { renderProgress(); renderKnowledge(); }
  if (segment === "journal") { renderDiaryToday(); renderJournalList(); }
  if (segment === "history") renderLog("#historyList", store.allVisits(), (v) => `
    <strong>${esc(keyRef(v.key).name)}</strong><span class="tag">${store.isFavorite(keyRef(v.key).book, keyRef(v.key).chapter) ? "♥ " : ""}${store.isRead(keyRef(v.key).book, keyRef(v.key).chapter) ? "Read" : ""}</span>
    <small>Visited ${v.count} time${v.count === 1 ? "" : "s"} · last ${fmtDate(v.last)}</small><span></span>
    ${v.count > 1 ? `<span class="log-dates">Visits: ${v.dates.slice(0, 6).map(fmtDate).join(" · ")}</span>` : ""}`, "Chapters you open will show up here with the dates you studied them.");
  if (segment === "favorites") renderLog("#favList", store.allFavorites(), (f) => {
    const v = store.visit(keyRef(f.key).book, keyRef(f.key).chapter);
    return `<strong>${esc(keyRef(f.key).name)}</strong><span class="tag">♥</span><small>Saved ${fmtDate(f.at)}${v ? ` · visited ${v.count} time${v.count === 1 ? "" : "s"}` : ""}</small>`;
  }, "Tap the heart under a chapter to keep it here.");
}
function renderLog(sel, items, row, emptyText) {
  const el = $(sel);
  el.innerHTML = items.length ? items.map((it) => `<button class="log-row" data-key="${it.key}">${row(it)}</button>`).join("") : `<p class="empty">${emptyText}</p>`;
  el.querySelectorAll("[data-key]").forEach((b) => b.addEventListener("click", () => {
    const r = keyRef(b.dataset.key); showView("read"); openChapter(r.book, r.chapter);
  }));
}

/* ---------- Study paths ---------- */
function pathIndex(pathId, book, chapter) {
  return pathChapters(pathId).findIndex((c) => c.book === book && c.chapter === chapter);
}
function nextUnread(pathId) {
  return pathChapters(pathId).find((c) => !store.isPathRead(pathId, c.book, c.chapter)) || null;
}
function updatePathBits() {
  const pathId = store.get("activePath");
  const { book, chapter } = store.get("last");
  const banner = $("#pathBanner"), btn = $("#nextInPath");
  if (!pathId) { banner.hidden = true; btn.hidden = true; return; }
  const list = pathChapters(pathId);
  const i = pathIndex(pathId, book, chapter);
  const p = PATH_BY_ID[pathId];
  banner.hidden = false;
  banner.textContent = `${p.name} · Stage ${list[i].stage + 1}: ${p.stages[list[i].stage].title} · ${store.pathReadCount(pathId)} of ${list.length} chapters`;
  const next = list[i + 1];
  btn.hidden = !next;
  if (next) {
    btn.textContent = `Next on your ${p.short} path: ${BOOK_BY_ID[next.book].name} ${next.chapter} ›`;
    btn.onclick = () => openChapter(next.book, next.chapter);
  }
}
function renderPath() {
  const view = $("#pathView");
  const active = store.get("activePath");
  if (!active) {
    view.innerHTML = `${seaScene(store.get("style"))}<p class="greeting">${esc(greeting())}</p><h1>Choose your study path</h1>
      <p class="muted">Each path takes you through the whole Bible, all 66 books and 1,189 chapters, in a different order. You can switch any time, and each path keeps its own progress.</p>
      ${pathCardsHtml()}${archiveHtml()}`;
    wirePathCards(view);
    wireArchive(view);
    return;
  }
  const p = PATH_BY_ID[active];
  const list = pathChapters(active);
  const done = store.pathReadCount(active);
  const next = nextUnread(active);
  const started = store.get("pathStarted")[active];
  const days = Math.floor((Date.now() - new Date(started)) / 86400000); // whole days since starting
  const yearPace = Math.floor((days / 365) * list.length);
  const paceText = done >= yearPace ? "You're on pace to finish within a year." : `${yearPace - done} chapters behind a one-year pace. No pressure: go at your own pace.`;
  const plan = store.get("yearPace") ? todayPlan(active) : null;
  const switcher = `<div class="path-switch" aria-label="All my studies">${PATH_ORDER.map((id) => {
    const d = store.pathReadCount(id), t = pathChapters(id).length;
    return `<button class="ps-row${id === active ? " is-active" : ""}" data-switch="${id}" aria-pressed="${id === active}"><span class="ps-name">${esc(PATH_BY_ID[id].name)}</span><span class="bar"><span style="width:${(d / t) * 100}%"></span></span><span class="ps-pct">${Math.round((d / t) * 100)}%</span></button>`;
  }).join("")}</div>`;
  view.innerHTML = `${seaScene(store.get("style"))}${switcher}<div class="path-head">
      <p class="greeting">${esc(greeting())}</p>
      <p class="muted small-print">Your study path</p>
      <h1>${esc(p.name)}</h1>
      <div class="bar"><span style="width:${(done / list.length) * 100}%"></span></div>
      <p class="muted small-print">${done} of ${list.length} chapters · started ${fmtDate(started)}${store.get("yearPace") ? "" : ` · ${paceText}`}</p>
    </div>
    ${plan ? `<div class="today-card"><strong>${plan.left ? `Today's reading: ${esc(plan.label)}` : "Today's reading is done ✓"}</strong>${esc(plan.note)}</div>` : ""}
    ${next ? `<button class="continue-btn" id="continuePath">Continue: ${esc(BOOK_BY_ID[next.book].name)} ${next.chapter}<small>Stage ${next.stage + 1} · ${esc(p.stages[next.stage].title)}</small></button>` : `<p class="card">You've finished the whole Bible on this path. 🎉</p>`}
    <div id="stageList">${p.stages.map((s, si) => {
      const chs = list.filter((c) => c.stage === si);
      const n = chs.filter((c) => store.isPathRead(active, c.book, c.chapter)).length;
      return `<details class="stage${n === chs.length ? " is-done" : ""}" ${next && next.stage === si ? "open" : ""}>
        <summary><strong>${si + 1}. ${esc(s.title)}</strong><span class="count">${n}/${chs.length}</span><span class="about">${esc(s.about)}</span><div class="bar"><span style="width:${(n / chs.length) * 100}%"></span></div></summary>
        ${s.readings.map((r) => `<p class="reading-label">${esc(readingLabel(r))}</p><div class="chapter-grid">${expandReading(r).map((c) => {
          const cls = [store.isPathRead(active, c.book, c.chapter) && "is-read", next && next.book === c.book && next.chapter === c.chapter && "is-here"].filter(Boolean).join(" ");
          return `<button class="${cls}" data-b="${c.book}" data-c="${c.chapter}" aria-label="${esc(BOOK_BY_ID[c.book].name)} ${c.chapter}">${c.chapter}</button>`;
        }).join("")}</div>`).join("")}
      </details>`;
    }).join("")}</div>
    <p class="path-note">${esc(p.note)}</p>
    <div class="walk-again">
      <button class="small" id="walkAgain">Walk this path again</button>
      <button class="quiet-link" id="switchPath">Switch to a different path</button>
    </div>
    <div id="walkConfirm"></div>
    ${archiveHtml()}`;
  wireArchive(view);
  $("#walkAgain").addEventListener("click", () => {
    $("#walkConfirm").innerHTML = `<div class="confirm-box">This saves your current walk (${done} of ${list.length} chapters, started ${fmtDate(started)}) to your archive and starts the ${esc(p.name)} path fresh. Your journal, favorites and history stay as they are.
      <div class="row"><button class="small" id="walkYes">Archive and start again</button><button class="quiet-link" id="walkNo">Keep going instead</button></div></div>`;
    $("#walkYes").addEventListener("click", () => { store.archivePath(active); renderPath(); updatePathBits(); celebrate(); });
    $("#walkNo").addEventListener("click", () => { $("#walkConfirm").innerHTML = ""; });
  });
  $("#continuePath")?.addEventListener("click", () => { showView("read"); openChapter(next.book, next.chapter); });
  view.querySelectorAll("[data-b]").forEach((b) => b.addEventListener("click", () => { showView("read"); openChapter(b.dataset.b, Number(b.dataset.c)); }));
  view.querySelectorAll("[data-switch]").forEach((b) => b.addEventListener("click", () => { store.startPath(b.dataset.switch); updatePathBits(); renderMargin(); renderPath(); }));
  $("#switchPath").addEventListener("click", () => showView("home"));
}

/* ---------- Read aloud & drive mode ---------- */
const driveOn = () => store.get("modes").drive;
const reader = new Reader({
  // Follow along: the paragraph being read is highlighted, so people who can't hear well can keep their place.
  onChunk(i) {
    document.querySelectorAll("#reader .speaking").forEach((el) => el.classList.remove("speaking"));
    const el = i >= 0 ? reader.blocks?.[i] : null;
    if (!el || !el.isConnected) return;
    el.classList.add("speaking");
    if (!$("#view-read").hidden) {
      const r = el.getBoundingClientRect();
      if (r.top < 90 || r.bottom > window.innerHeight - 140) el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  },
  onState(state) {
    $("#listenBtn").setAttribute("aria-pressed", String(state === "playing"));
    syncPlayBtn(state === "playing");
    updateDrive(state);
  },
  onEnd() {
    // In drive mode, keep going chapter after chapter (following the path if one is active).
    if (!driveOn()) return;
    const { book, chapter } = store.get("last");
    const path = store.get("activePath");
    let next = null;
    if (path) { const list = pathChapters(path); next = list[pathIndex(path, book, chapter) + 1]; }
    else next = neighbors(book, chapter).next;
    if (next) { autoplayNext = true; openChapter(next.book, next.chapter); }
  },
});
reader.rate = store.get("voiceRate");
reader.volume = store.get("voiceVolume") ?? 1;
reader.voiceName = store.get("voiceName") || "";
// Reader voice choice, in Settings and on the Drive screen. Voices arrive a moment after load on some devices.
function fillVoices() {
  const voices = listVoices();
  document.querySelectorAll(".voice-select").forEach((sel) => {
    sel.innerHTML = `<option value="">Automatic</option>` + voices.map((v) => `<option value="${esc(v.name)}">${esc(v.name.replace(/\s*\(.*\)$/, ""))} (${esc(v.lang)})</option>`).join("");
    sel.value = voices.some((v) => v.name === store.get("voiceName")) ? store.get("voiceName") : "";
    sel.closest("label").hidden = !voices.length;
  });
}
document.querySelectorAll(".voice-select").forEach((sel) => sel.addEventListener("change", () => {
  store.set("voiceName", sel.value); reader.voiceName = sel.value;
  document.querySelectorAll(".voice-select").forEach((o) => { o.value = sel.value; });
  if (reader.playing) { reader.pause(); reader.play(); }
}));
fillVoices();
if (canSpeak) speechSynthesis.addEventListener?.("voiceschanged", fillVoices);
$("#listenBtn").hidden = !canSpeak;
$("#listenBtn").addEventListener("click", () => reader.toggle());

let wakeLock = null;
async function keepAwake(on) {
  try {
    if (on && "wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen");
    else { await wakeLock?.release(); wakeLock = null; }
  } catch { /* not supported */ }
}
const commands = new Commands([
  [["next"], () => { const n = nextTarget(); if (n) { autoplayNext = true; openChapter(n.book, n.chapter); } }],
  [["pause", "stop", "wait"], () => reader.pause()],
  [["play", "continue", "resume", "go on"], () => reader.play()],
  [["repeat", "again", "start over"], () => reader.restart()],
  [["back"], () => reader.back()],
  [["mark", "read it", "done"], () => { const { book, chapter } = store.get("last"); if (!store.isRead(book, chapter)) toggleRead(); }],
]);
function nextTarget() {
  const { book, chapter } = store.get("last");
  const path = store.get("activePath");
  if (path) return pathChapters(path)[pathIndex(path, book, chapter) + 1] || null;
  return neighbors(book, chapter).next;
}
function closeDrive() {
  $("#drive").hidden = true;
  document.body.classList.remove("drive-open");
  reader.pause();
  commands.stop();
  keepAwake(false);
}
function updateDrive(state) {
  if ($("#drive").hidden) return;
  const { book, chapter } = store.get("last");
  $("#driveRef").textContent = `${BOOK_BY_ID[book].name} ${chapter}`;
  const playing = reader.playing;
  $("#drivePlay").textContent = playing ? "Pause" : "Play";
  if (state === "playing") $("#driveStatus").textContent = "Reading aloud…";
  else if (state === "ended") $("#driveStatus").textContent = "Finished this chapter";
  else if (state === "paused") $("#driveStatus").textContent = "Paused";
  $("#driveMark").setAttribute("aria-pressed", String(store.isRead(book, chapter)));
  $("#driveMark").textContent = store.isRead(book, chapter) ? "Read" : "Mark read";
  $("#driveListening").hidden = !(store.get("modes").voiceCommands && canListen);
  // The words, for a passenger reading along. Copied from the reader so no extra request is used.
  $("#driveText").innerHTML = $("#reader").innerHTML;
}
$("#drivePlay").addEventListener("click", () => reader.toggle());
$("#driveBack").addEventListener("click", () => reader.back());
$("#driveNext").addEventListener("click", () => { const n = nextTarget(); if (n) { autoplayNext = true; openChapter(n.book, n.chapter); updateDrive(); } });
$("#driveMark").addEventListener("click", toggleRead);
$("#driveExit").addEventListener("click", () => setDrive(false));
$("#driveHome").addEventListener("click", () => { setDrive(false); showView("home"); });
$("#driveSettings").addEventListener("click", () => { setDrive(false); showView("settings"); });

/* ---------- Archive of past walks ---------- */
function archiveHtml() {
  const list = store.get("archives");
  if (!list.length) return "";
  return `<div class="archive"><h2>My past walks</h2>${list.map((a) => {
    const total = pathChapters(a.pathId).length;
    const n = Object.keys(a.reads).length;
    return `<button class="archive-row" data-archive="${esc(a.id)}"><strong>${esc(PATH_BY_ID[a.pathId].name)} path</strong><span class="tag">${n === total ? "Finished ✓" : `${n} of ${total}`}</span><small>${fmtDate(a.started)} to ${fmtDate(a.ended)}</small></button>`;
  }).join("")}</div>`;
}
function wireArchive(root) {
  root.querySelectorAll("[data-archive]").forEach((b) => b.addEventListener("click", () => showArchive(b.dataset.archive)));
}
function showArchive(id) {
  const a = store.get("archives").find((x) => x.id === id);
  if (!a) return;
  const p = PATH_BY_ID[a.pathId];
  const list = pathChapters(a.pathId);
  const inRange = (iso) => iso >= a.started && iso <= a.ended;
  const journals = store.allJournal().filter((j) => inRange(j.updated)).length;
  const rounds = store.get("trivia").sessions.filter((t) => inRange(t.at));
  const view = $("#pathView");
  view.innerHTML = `${seaScene(store.get("style"))}
    <button class="quiet-link" id="archiveBack">‹ Back to my path</button>
    <h1>${esc(p.name)} path</h1>
    <p class="readonly-note">A past walk from ${fmtDate(a.started)} to ${fmtDate(a.ended)}: ${Object.keys(a.reads).length} of ${list.length} chapters read${journals ? `, ${journals} journal entr${journals === 1 ? "y" : "ies"} written` : ""}${rounds.length ? `, ${rounds.length} trivia round${rounds.length === 1 ? "" : "s"} played` : ""}. Tap any chapter to read it again.</p>
    ${p.stages.map((s, si) => {
      const chs = list.filter((c) => c.stage === si);
      const n = chs.filter((c) => a.reads[`${c.book}.${c.chapter}`]).length;
      return `<details class="stage${n === chs.length ? " is-done" : ""}"><summary><strong>${si + 1}. ${esc(s.title)}</strong><span class="count">${n}/${chs.length}</span><div class="bar"><span style="width:${(n / chs.length) * 100}%"></span></div></summary>
        <div class="chapter-grid">${chs.map((c) => `<button class="${a.reads[`${c.book}.${c.chapter}`] ? "is-read" : ""}" data-b="${c.book}" data-c="${c.chapter}" aria-label="${esc(BOOK_BY_ID[c.book].name)} ${c.chapter}">${c.chapter}</button>`).join("")}</div></details>`;
    }).join("")}`;
  $("#archiveBack").addEventListener("click", renderPath);
  view.querySelectorAll("[data-b]").forEach((b) => b.addEventListener("click", () => { showView("read"); openChapter(b.dataset.b, Number(b.dataset.c)); }));
  window.scrollTo(0, 0);
}

/* ---------- Greeting & one-year pace ---------- */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
function greeting() {
  const h = new Date().getHours();
  const part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const name = store.get("name").trim();
  return name ? `${part}, ${name}` : part;
}
const DAY = 86400000;
const isToday = (iso) => iso && new Date(iso).toDateString() === new Date().toDateString();
// Spreads the chapters still unread over the days left in the year. If you fall
// behind, the daily amount grows a little; if you read ahead, it shrinks.
function todayPlan(pathId) {
  const list = pathChapters(pathId);
  const reads = store.get("pathRead")[pathId] || {};
  const end = new Date(store.get("pathStarted")[pathId]).getTime() + 365 * DAY;
  const daysLeft = Math.max(1, Math.ceil((end - Date.now()) / DAY));
  const readToday = Object.values(reads).filter(isToday).length;
  const unread = list.filter((c) => !reads[`${c.book}.${c.chapter}`]);
  const remainingAtStart = unread.length + readToday;
  const perDay = Math.max(1, Math.ceil(remainingAtStart / daysLeft));
  const left = Math.max(0, perDay - readToday);
  const chunk = unread.slice(0, left);
  const label = chunk.length ? describeRun(chunk) : "";
  const note = Date.now() > end ? ` Your year is up, and that's fine: ${unread.length} chapters to go.` : ` About ${perDay} chapter${perDay === 1 ? "" : "s"} a day finishes this path by ${fmtDate(new Date(end).toISOString())}.`;
  return { left, label, note, perDay };
}
function describeRun(chs) {
  const groups = [];
  for (const c of chs) {
    const g = groups[groups.length - 1];
    if (g && g.book === c.book && g.to === c.chapter - 1) g.to = c.chapter; else groups.push({ book: c.book, from: c.chapter, to: c.chapter });
  }
  return groups.map((g) => `${BOOK_BY_ID[g.book].name} ${g.from}${g.to > g.from ? `–${g.to}` : ""}`).join(", ");
}

/* ---------- Learning path margin ---------- */
function setMargin(open) {
  store.set("margin", open);
  $("#margin").hidden = !open;
  document.body.classList.toggle("margin-open", open);
  $("#marginBtn").setAttribute("aria-expanded", String(open));
  document.querySelector(".margin-scrim")?.remove();
  if (open && window.innerWidth < 1000) {
    const scrim = Object.assign(document.createElement("div"), { className: "margin-scrim" });
    scrim.addEventListener("click", () => setMargin(false));
    document.body.append(scrim);
  }
  if (open) renderMargin();
}
$("#marginBtn").addEventListener("click", () => setMargin($("#margin").hidden));
$("#marginClose").addEventListener("click", () => setMargin(false));
function statusIcon(done, total) {
  if (done === total) return `<span class="st done" aria-label="Done">✓</span>`;
  if (done > 0) return `<span class="st part" aria-label="Started">◐</span>`;
  return `<span class="st none" aria-label="Not started">○</span>`;
}
function renderMargin() {
  if ($("#margin").hidden) return;
  const active = store.get("activePath");
  const here = store.get("last");
  let html = "";
  if (active) {
    const p = PATH_BY_ID[active];
    $("#marginTitle").textContent = p.name;
    const plan = store.get("yearPace") ? todayPlan(active) : null;
    if (plan) html += `<div class="margin-today">${plan.left ? `Today: ${esc(plan.label)}` : "Today's reading is done ✓"}</div>`;
    const list = pathChapters(active);
    p.stages.forEach((s, si) => {
      html += `<p class="margin-stage">${si + 1}. ${esc(s.title)}</p>`;
      s.readings.forEach((r) => {
        const chs = expandReading(r);
        const n = chs.filter((c) => store.isPathRead(active, c.book, c.chapter)).length;
        const first = chs.find((c) => !store.isPathRead(active, c.book, c.chapter)) || chs[0];
        const isHere = chs.some((c) => c.book === here.book && c.chapter === here.chapter);
        html += `<button class="margin-book${isHere ? " is-here" : ""}" data-b="${first.book}" data-c="${first.chapter}">${statusIcon(n, chs.length)}${esc(readingLabel(r))}<small>${n}/${chs.length}</small></button>`;
      });
    });
    void list;
  } else {
    $("#marginTitle").textContent = "Books of the Bible";
    BOOKS.forEach((b, i) => {
      if (i === 0 || i === 39) html += `<p class="margin-stage">${i === 0 ? "Old Testament" : "New Testament"}</p>`;
      const n = store.readCount(b.id);
      const first = Array.from({ length: b.chapters }, (_, k) => k + 1).find((ch) => !store.isRead(b.id, ch)) || 1;
      html += `<button class="margin-book${here.book === b.id ? " is-here" : ""}" data-b="${b.id}" data-c="${first}">${statusIcon(n, b.chapters)}${esc(b.name)}<small>${n}/${b.chapters}</small></button>`;
    });
  }
  $("#marginBody").innerHTML = html;
  $("#marginBody").querySelectorAll("[data-b]").forEach((btn) => btn.addEventListener("click", () => {
    if (window.innerWidth < 1000) setMargin(false);
    showView("read"); openChapter(btn.dataset.b, Number(btn.dataset.c));
  }));
}

/* ---------- Journal (with optional passcode) ---------- */
let journalUnlocked = false;
async function hashCode(code) {
  const data = new TextEncoder().encode(`bible-study:${code}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
const journalLocked = () => Boolean(store.get("journalLock")) && !journalUnlocked;
// The journal stays open until the person chooses to lock it again.
function lockNowButton(rerender) {
  const b = Object.assign(document.createElement("button"), { type: "button", className: "small lock-now", textContent: "🔒 Lock my journal" });
  b.addEventListener("click", () => { journalUnlocked = false; rerender(); if (rerender !== renderJournal) renderJournal(); });
  return b;
}
function unlockForm(onDone) {
  const wrap = document.createElement("div");
  wrap.innerHTML = `<p class="muted small-print">Your journal is locked.</p><div class="unlock"><input type="password" inputmode="numeric" placeholder="Passcode" aria-label="Journal passcode"><button class="small">Unlock</button></div><p class="muted small-print" role="alert"></p>`;
  const input = wrap.querySelector("input"), msg = wrap.querySelector("[role=alert]");
  const tryIt = async () => {
    if (await hashCode(input.value) === store.get("journalLock")) { journalUnlocked = true; onDone(); }
    else { msg.textContent = "That passcode doesn't match. Try again."; input.value = ""; }
  };
  wrap.querySelector("button").addEventListener("click", tryIt);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") tryIt(); });
  return wrap;
}
const JOURNAL_BOXES = [
  { field: "text", label: "Thoughts", icon: "✎", ph: (ref) => `What is ${ref} saying to you today? How does it make you feel?` },
  { field: "prayer", label: "Prayers", icon: "🙏", ph: () => "Who and what are you praying for?" },
  { field: "gratitude", label: "Gratitude", icon: "❀", ph: () => "What are you thankful for today?" },
];
function renderJournal() {
  const { book, chapter } = store.get("last");
  const inner = $("#journalInner");
  const entry = store.journalEntry(book, chapter);
  const filled = entry ? JOURNAL_BOXES.filter((b) => (entry[b.field] || "").trim()).map((b) => b.label.toLowerCase()) : [];
  $("#journalHint").textContent = journalLocked() ? "Locked" : filled.length ? `You've written ${filled.join(", ")}. Tap to read or add more.` : "Thoughts, prayers and gratitude for this chapter";
  inner.innerHTML = "";
  if (journalLocked()) { inner.append(unlockForm(renderJournal)); return; }
  if (store.get("journalLock")) inner.append(lockNowButton(renderJournal));
  const ref = `${BOOK_BY_ID[book].name} ${chapter}`;
  const saved = Object.assign(document.createElement("p"), { className: "saved" });
  saved.textContent = entry ? `Saved ${fmtDate(entry.updated)}` : "Saves as you type";
  for (const box of JOURNAL_BOXES) {
    const wrap = Object.assign(document.createElement("label"), { className: `journal-box jb-${box.field}` });
    wrap.innerHTML = `<span class="jb-label"><span aria-hidden="true">${box.icon}</span> ${box.label}</span>`;
    const ta = document.createElement("textarea");
    ta.id = box.field === "text" ? "journalText" : `journal-${box.field}`;
    ta.rows = box.field === "text" ? 5 : 3;
    ta.placeholder = box.ph(ref);
    ta.value = entry?.[box.field] || "";
    let t;
    ta.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => { store.setJournalField(book, chapter, box.field, ta.value); saved.textContent = "Saved just now"; }, 500);
    });
    wrap.append(ta);
    addMic(wrap, ta);
    if (box.field === "prayer") {
      const ans = Object.assign(document.createElement("label"), { className: "answered" });
      ans.innerHTML = `<input type="checkbox" ${entry?.answered ? "checked" : ""}> Answered${entry?.answered ? ` <span class="muted">· ${fmtDate(entry.answered)}</span>` : ""}`;
      ans.querySelector("input").addEventListener("change", (e) => {
        store.setJournalField(book, chapter, "answered", e.target.checked ? new Date().toISOString() : "");
        if (e.target.checked) { celebrate("small"); mascotSay("Praise God for answered prayer!"); }
        renderJournal();
      });
      wrap.append(ans);
    }
    inner.append(wrap);
  }
  inner.append(saved);
}
// A microphone button beside a text box: talk instead of type (where the browser allows it).
function addMic(wrap, ta) {
  if (!canListen) return;
  const b = Object.assign(document.createElement("button"), { type: "button", className: "mic-btn", textContent: "🎤 Talk" });
  b.setAttribute("aria-label", "Talk instead of type"); b.setAttribute("aria-pressed", "false");
  wrap.append(b);
  dictateInto(ta, b);
}

/* ---------- Study partner: the built-in Bible helper, or the person's own AI ---------- */
// "" is the built-in helper: it answers right here in the chat, paid for by the family's
// prepaid AI credits with daily and monthly limits (supabase/functions/study-partner).
const TALK_ICON = `<svg class="talk-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M40 20c10 1 18 8 18 17 0 4-1.5 7.5-4 10.5l2 7-8-3c-2.5 1-5 1.5-8 1.5-8 0-15-4-17.5-10" class="ti-back"/><path d="M27 8C15 8 6 16 6 26c0 4.5 2 8.5 5 11.5L8 46l10-4c3 1.3 6 2 9 2 12 0 21-8 21-18S39 8 27 8z" class="ti-front"/><circle cx="17" cy="26" r="3" class="ti-dot"/><circle cx="27" cy="26" r="3" class="ti-dot"/><circle cx="37" cy="26" r="3" class="ti-dot"/></svg>`;
const PARTNERS = [
  ...(authEnabled ? [["", "Bible helper", TALK_ICON, null]] : []),
  ["claude", "Claude", "🧡", (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`],
  ["chatgpt", "ChatGPT", "💬", (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`],
  ["grok", "Grok", "⚡", (q) => `https://grok.com/?q=${encodeURIComponent(q)}`],
  ["gemini", "Gemini", "✨", () => "https://gemini.google.com/app"],
];
const CHAT_IDEAS = ["What's the main point of this chapter?", "What was happening when this was written?", "How does this point to Jesus?", "What does a key word mean in the original language?", "How can I live this out this week?", "How would I explain this to a friend who isn't a believer?"];
function partnerPrompt(question) {
  const { book, chapter } = store.get("last");
  const ver = (versionList().find(([v]) => v === store.get("version")) || ["", "NASB"])[1];
  return `I'm studying ${BOOK_BY_ID[book].name} ${chapter} (${ver}) and I'd like you to be my Bible study partner.

${question.trim() || "Help me understand this chapter: what it says, the background, and how it connects to the rest of the Bible."}

Please keep Scripture first and quote it exactly. Say clearly what the text states plainly, what is interpretation, and where the Bible is silent. Where the Bible is clear, say so clearly. Where faithful Christians differ, stay neutral: show the main views fairly, say who holds each and whether its support comes from the Bible or elsewhere, don't pick a winner, and end on the common ground. Name your sources and the tradition they come from (for example Baptist, Church of Christ, Catholic, or Jewish). No politics. I'm Baptist / Church of Christ, so mention other religions only briefly if they help. Keep it warm and easy to follow.`;
}
const currentPartner = () => PARTNERS.find(([v]) => v === (store.get("aiPartner") || ""));
const builtIn = (p) => p && p[0] === "";
function renderPartnerPicks() {
  const cur = store.get("aiPartner") || "";
  document.querySelectorAll(".partner-pick").forEach((el) => {
    el.innerHTML = PARTNERS.map(([v, l, icon]) => `<button type="button" class="chat-avatar-btn" data-partner="${v}" aria-pressed="${cur === v}"><span class="chat-emoji" aria-hidden="true">${icon}</span>${l}</button>`).join("")
      + (el.id === "partnerPick" || authEnabled ? "" : `<button type="button" class="chat-avatar-btn" data-partner="" aria-pressed="${!cur}">None</button>`);
    el.querySelectorAll("[data-partner]").forEach((b) => b.addEventListener("click", () => { store.set("aiPartner", b.dataset.partner); renderPartnerPicks(); resetChat(); }));
  });
  const p = currentPartner();
  if ($("#partnerHint")) $("#partnerHint").textContent = builtIn(p) ? "Ask questions and get answers right here" : p ? `Talk this chapter over with ${p[1]} ${p[2]}` : "Talk this chapter over with your AI helper";
}
function chatBubble(who, text, extra = "") {
  const p = currentPartner();
  const row = Object.assign(document.createElement("div"), { className: `chat-row ${who} ${extra}`.trim() });
  row.innerHTML = who === "me"
    ? `<div class="chat-bubble">${esc(text)}</div><span class="chat-face" aria-hidden="true">🙂</span>`
    : `<span class="chat-face" aria-hidden="true">${p ? p[2] : "📖"}</span><div class="chat-bubble">${esc(text)}</div>`;
  $("#chatLog").append(row);
  row.scrollIntoView({ block: "nearest" });
  return row;
}
let chatTurns = [];   // this chapter's conversation with the built-in helper
let chatBusy = false;
const HELPER_SAYS = {
  signin: "Please sign in first (Settings, then Account) so I can answer you here.",
  setup: "The built-in helper isn't turned on yet. Whoever set up the app can switch it on. For now you can tap Claude, ChatGPT, Grok or Gemini above.",
  monthly: "The family has used all of this month's questions, so I'm resting until the 1st. These questions are a gift provided by the app developer. For more, please contact the app developer. You can still tap Claude, ChatGPT, Grok or Gemini above.",
  credits: "The family's question credits are used up for now. These questions are a gift provided by the app developer. For more, please contact the app developer. You can still tap Claude, ChatGPT, Grok or Gemini above.",
  offline: "I couldn't connect. Check your internet and try again.",
  refused: "I'm not able to help with that one. Try asking another way, or talk it over with someone you trust.",
  busy: "I'm a little busy right now. Please try again in a minute.",
};
async function askBuiltIn(q) {
  const { book, chapter } = store.get("last");
  const ver = (versionList().find(([v]) => v === store.get("version")) || ["", "NASB"])[1];
  chatTurns.push({ role: "user", content: q });
  chatBusy = true; $("#partnerGo").disabled = true;
  const wait = chatBubble("them", "Thinking", "typing");
  const r = await askHelper({ messages: chatTurns, ref: `${BOOK_BY_ID[book].name} ${chapter}`, version: ver, name: store.get("name") || "", style: store.get("helperStyle") || "" });
  wait.remove();
  chatBusy = false; $("#partnerGo").disabled = false;
  if (r && r.text) {
    const text = String(r.text).replace(/\*\*|__/g, "").replace(/^#+\s*/gm, "");
    chatTurns.push({ role: "assistant", content: text });
    chatBubble("them", text);
    if (r.warn) helperWarning(r);
    return;
  }
  chatTurns.pop();
  const why = r?.error || "busy";
  chatBubble("them", why === "shared"
    ? `You've had your ${r.per_person || 100} questions this month and some extras. What's left is saved so everyone else in the family gets their ${r.per_person || 100} too. Your questions come back on the 1st. These questions are provided by the app developer; for more, please contact the app developer. You can still tap Claude, ChatGPT, Grok or Gemini above.`
    : HELPER_SAYS[why] || HELPER_SAYS.busy);
}
// Once a session, when the family has used 70% of the month's helper budget.
let helperWarned = false;
function helperWarning(s) {
  if (helperWarned || !s || !s.warn) return;
  helperWarned = true;
  const each = s.per_person || 100;
  chatBubble("them", `Heads up: the family has used most of this month's Bible helper questions. Everyone is still guaranteed ${each} a month${typeof s.mine === "number" ? ` (you've asked ${s.mine})` : ""}. Extra questions past that are first come, first served, and everything resets on the 1st. These questions are provided by the app developer; for more, please contact the app developer.`, "notice");
}
let helperChecked = false;
async function checkHelperStanding() {
  if (helperChecked || helperWarned) return;
  helperChecked = true;
  helperWarning(await helperStatus().catch(() => null));
}
function resetChat() {
  if (!$("#chatLog")) return;
  const p = currentPartner();
  const { book, chapter } = store.get("last");
  $("#chatLog").innerHTML = "";
  chatTurns = [];
  chatBubble("them", builtIn(p)
    ? `Hi${store.get("name") ? ` ${store.get("name")}` : ""}! I'm your Bible helper. Ask me anything about ${BOOK_BY_ID[book].name} ${chapter} and I'll answer right here.`
    : p
    ? `Hi${store.get("name") ? ` ${store.get("name")}` : ""}! I'm ${p[1]}, your study partner. What would you like to talk about in ${BOOK_BY_ID[book].name} ${chapter}?`
    : "Hi! Pick your study partner above: Claude, ChatGPT, Grok or Gemini. Then ask me anything about this chapter.");
  $("#chatSuggest").innerHTML = CHAT_IDEAS.map((q) => `<button type="button" class="chat-idea">${esc(q)}</button>`).join("");
  $("#chatSuggest").querySelectorAll(".chat-idea").forEach((b) => b.addEventListener("click", () => { $("#partnerQ").value = b.textContent; sendChat(); }));
}
async function sendChat() {
  const p = currentPartner();
  const q = $("#partnerQ").value.trim();
  if (!q) { $("#partnerQ").focus(); return; }
  if (chatBusy) return;
  chatBubble("me", q);
  $("#partnerQ").value = "";
  if (builtIn(p)) { await askBuiltIn(q); return; }
  if (!p) { chatBubble("them", "Pick Claude, ChatGPT, Grok or Gemini above first, then send again."); $("#partnerQ").value = q; return; }
  const prompt = partnerPrompt(q);
  let copied = false;
  try { await navigator.clipboard.writeText(prompt); copied = true; } catch { /* not allowed */ }
  window.open(p[3](prompt), "_blank", "noopener");
  chatBubble("them", p[0] === "gemini"
    ? `I opened Gemini for you. ${copied ? "Tap the message box there, paste, and send." : "Type your question there."} Come back here any time for the next question.`
    : `I opened ${p[1]} with your question about this chapter ready. Press send there to see my answer. Come back here any time for the next question.`);
}
if ($("#partnerBox")) {
  renderPartnerPicks();
  resetChat();
  if (canListen) { $("#partnerMic").hidden = false; dictateInto($("#partnerQ"), $("#partnerMic")); }
  $("#partnerGo").addEventListener("click", sendChat);
  $("#partnerBox").addEventListener("toggle", () => { if ($("#partnerBox").open && builtIn(currentPartner())) checkHelperStanding(); });
  $("#partnerQ").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } });
}

/* ---------- Books and music: Amazon searches, no store integration ---------- */
const SHOP = [
  ["Christian books", [["Bible study guides", "bible study guide book"], ["Christian living", "christian living books"], ["Apologetics: the case for Christ", "christian apologetics books"], ["C. S. Lewis", "C. S. Lewis books"], ["Max Lucado", "Max Lucado books"], ["Josh Ross", "Josh Ross books"], ["Devotionals", "daily christian devotional"], ["Bible commentaries", "bible commentary"]]],
  ["Christian counseling and psychology", [["Christian psychology", "christian psychology books"], ["Christian counseling", "biblical counseling books"], ["Faith and anxiety", "christian books on anxiety and worry"], ["Grief and hope", "christian books on grief"], ["Marriage and family", "christian marriage and family books"]]],
  ["Psychology", [["Popular psychology", "psychology books"], ["Habits and the mind", "habits psychology books"], ["Aging well and memory", "aging well memory books"]]],
  ["For kids", [["Bible storybooks", "children's bible storybook"], ["Kids' devotionals", "devotional for kids"], ["Bible activity books", "bible activity book for kids"]]],
  ["Christian music", [["Worship music", "worship music", "music"], ["Hymns", "hymns", "music"], ["Southern gospel", "southern gospel", "music"], ["A cappella hymns", "a cappella hymns", "music"], ["Kids' worship songs", "kids worship songs", "music"], ["Songbooks and hymnals", "hymnal songbook"]]],
];
function renderShop() {
  const el = $("#shopList");
  if (!el || el.childElementCount) return;
  const url = (q, kind) => kind === "music" ? `https://music.amazon.com/search/${encodeURIComponent(q)}` : `https://www.amazon.com/s?k=${encodeURIComponent(q)}`;
  el.innerHTML = SHOP.map(([title, items]) => `<div class="card shop-card"><h2>${esc(title)}</h2><div class="shop-links">${items.map(([label, q, kind]) => `<a class="btn-link" href="${url(q, kind)}" target="_blank" rel="noopener">${esc(label)}</a>`).join("")}</div></div>`).join("");
}

/* ---------- Daily life journal ---------- */
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const dayLabel = (day) => new Date(`${day}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
const DIARY_BOXES = [
  { field: "text", label: "My day", icon: "✎", ph: "What's going on in your life today? What would you want your family to know someday?" },
  { field: "prayer", label: "Prayers", icon: "🙏", ph: "Who and what are you praying for?" },
  { field: "gratitude", label: "Gratitude", icon: "❀", ph: "What are you thankful for today?" },
];
function renderDiaryToday() {
  const el = $("#diaryToday");
  if (!el) return;
  el.innerHTML = "";
  if (journalLocked()) return;
  const day = todayKey();
  const entry = store.diaryEntry(day);
  const card = Object.assign(document.createElement("div"), { className: "diary-card" });
  card.innerHTML = `<p class="diary-date">${esc(dayLabel(day))}</p><h2>Today's journal</h2><p class="muted small-print">Your daily life journal, separate from your chapter notes. Each day gets its own dated page.</p>`;
  const saved = Object.assign(document.createElement("p"), { className: "saved", textContent: entry ? `Saved ${new Date(entry.updated).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}` : "Saves as you type" });
  for (const box of DIARY_BOXES) {
    const wrap = Object.assign(document.createElement("label"), { className: `journal-box jb-${box.field}` });
    wrap.innerHTML = `<span class="jb-label"><span aria-hidden="true">${box.icon}</span> ${box.label}</span>`;
    const ta = Object.assign(document.createElement("textarea"), { rows: box.field === "text" ? 5 : 3, placeholder: box.ph, value: entry?.[box.field] || "" });
    ta.id = `diary-${box.field}`;
    let t;
    ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { store.setDiaryField(day, box.field, ta.value); saved.textContent = "Saved just now"; renderJournalList(); }, 600); });
    wrap.append(ta);
    addMic(wrap, ta);
    card.append(wrap);
  }
  card.append(saved);
  el.append(card);
}

/* ---------- Keepsake journal book (print or save as PDF) ---------- */
function makeJournalBook() {
  if (journalLocked()) { mascotSay("Unlock your journal first."); return; }
  const name = store.get("name").trim();
  const entries = [
    ...store.allDiary().map((d) => ({ when: d.day, title: dayLabel(d.day), kind: "Daily journal", parts: d })),
    ...store.allJournal().map((j) => { const d = new Date(j.created || j.updated); const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; return { when: day, title: dayLabel(day), kind: `Reflections on ${keyRef(j.key).name}`, parts: j }; }),
  ].sort((a, b) => a.when.localeCompare(b.when));
  const para = (t) => esc(t).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  const sec = (label, t, extra = "") => (t || "").trim() ? `<h4>${label}${extra}</h4>${para(t)}` : "";
  const book = $("#printBook");
  book.innerHTML = `<section class="pb-title"><p class="pb-orn">❦</p><h1>${name ? `The Journal of ${esc(name)}` : "My Journal"}</h1><p>My walk through the Bible, my prayers, and my life</p>
      <p class="pb-range">${entries.length ? `${esc(dayLabel(entries[0].when))} to ${esc(dayLabel(entries[entries.length - 1].when))}` : ""}</p></section>
    ${entries.length ? entries.map((e) => `<article class="pb-entry"><p class="pb-date">${esc(e.title)}</p><h3>${esc(e.kind)}</h3>
      ${sec(e.kind === "Daily journal" ? "My day" : "Thoughts", e.parts.text)}${sec("Prayers", e.parts.prayer, e.parts.answered ? ` · answered ${esc(fmtDate(e.parts.answered))}` : "")}${sec("Gratitude", e.parts.gratitude)}</article>`).join("")
      : `<p>No entries yet.</p>`}`;
  book.hidden = false;
  document.body.classList.add("printing");
  const done = () => { document.body.classList.remove("printing"); book.hidden = true; window.removeEventListener("afterprint", done); };
  window.addEventListener("afterprint", done);
  setTimeout(() => window.print(), 50);
}
$("#makeBook").addEventListener("click", makeJournalBook);

function showDiaryDay(day) {
  const d = store.diaryEntry(day);
  if (!d) return;
  const para = (t) => esc(t).replace(/\n/g, "<br>");
  $("#diaryToday").innerHTML = `<div class="diary-card"><p class="diary-date">${esc(dayLabel(day))}</p><h2>Daily journal</h2>
    ${DIARY_BOXES.filter((b) => (d[b.field] || "").trim()).map((b) => `<p class="jb-label">${b.icon} ${b.label}</p><p class="diary-read">${para(d[b.field])}</p>`).join("")}
    <button class="small" id="backToday">Back to today</button></div>`;
  $("#backToday").addEventListener("click", renderDiaryToday);
  $("#diaryToday").scrollIntoView({ block: "start" });
}
let journalFilter = "all";
function renderJournalList() {
  const el = $("#journalList");
  if (journalLocked()) { el.innerHTML = ""; el.append(unlockForm(renderJournalList)); return; }
  const lockRow = store.get("journalLock") ? lockNowButton(renderJournalList) : null;
  const items = [
    ...store.allDiary().map((d) => ({ ...d, key: null, sortAt: d.updated, title: dayLabel(d.day), daily: true })),
    ...store.allJournal().map((j) => ({ ...j, sortAt: j.updated, title: keyRef(j.key).name })),
  ].filter((j) => journalFilter === "all" || (j[journalFilter] || "").trim()).sort((a, b) => b.sortAt.localeCompare(a.sortAt));
  const snip = (t) => `${esc(t.slice(0, 140))}${t.length > 140 ? "…" : ""}`;
  const filters = [["all", "All"], ["text", "Thoughts"], ["prayer", "Prayers"], ["gratitude", "Gratitude"]];
  el.innerHTML = `<div class="journal-filter">${filters.map(([v, l]) => `<button data-jf="${v}" aria-pressed="${journalFilter === v}">${l}</button>`).join("")}</div>` + (items.length ? items.map((j) => `<button class="log-row${j.daily ? " is-daily" : ""}" ${j.daily ? `data-day="${j.day}"` : `data-key="${j.key}"`}><strong>${j.daily ? "Daily journal" : esc(j.title)}</strong><small>${j.daily ? esc(j.title) : `${fmtDate(j.created || j.updated)}${j.created && fmtDate(j.created) !== fmtDate(j.updated) ? ` · edited ${fmtDate(j.updated)}` : ""}`}</small>
      ${JOURNAL_BOXES.filter((b) => (journalFilter === "all" || journalFilter === b.field) && (j[b.field] || "").trim()).map((b) => `<span class="log-dates"><em>${j.daily && b.field === "text" ? "My day" : b.label}${b.field === "prayer" && j.answered ? " · answered ✓" : ""}:</em> ${snip(j[b.field])}</span>`).join("")}</button>`).join("")
    : `<p class="empty">${journalFilter === "all" ? `Open "My journal" under any chapter to write your thoughts, prayers and gratitude. They'll be collected here.` : "Nothing here yet."}</p>`);
  el.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => { if (b.dataset.day === todayKey()) $("#diary-text")?.focus(); else showDiaryDay(b.dataset.day); }));
  el.querySelectorAll("[data-jf]").forEach((b) => b.addEventListener("click", () => { journalFilter = b.dataset.jf; renderJournalList(); }));
  el.querySelectorAll("[data-key]").forEach((b) => b.addEventListener("click", () => {
    const r = keyRef(b.dataset.key); showView("read"); openChapter(r.book, r.chapter); $("#journalBox").open = true;
  }));  if (lockRow) el.prepend(lockRow);
}

/* ---------- Trivia ---------- */
const triviaDlg = $("#trivia");
function updateTriviaHint() {
  const { book, chapter } = store.get("last");
  $("#triviaBtn").classList.remove("glow");
  const n = pickQuestions({ isRead: (k) => isReadKey(k), current: { book, chapter }, count: 99 }).length;
  $("#triviaHint").textContent = n ? `Test what you remember · ${Math.min(5, n)} questions` : "Trivia for this chapter is coming soon";
}
function isReadKey(k) { const [b, c] = k.split("."); return store.isRead(b, Number(c)); }
function startTrivia() {
  const current = store.get("last");
  const qs = pickQuestions({ isRead: isReadKey, current, pathId: store.get("activePath"), recent: store.get("trivia").recent });
  const results = [];
  let i = 0;
  $("#triviaTitle").textContent = "Bible trivia";
  const body = $("#triviaBody");
  const kindLabel = { fact: "From your reading", connection: "Connecting passages", geography: "Places then and now", history: "History" };
  function showQ() {
    if (!qs.length) {
      body.innerHTML = `<p class="trivia-empty">Questions for ${esc(BOOK_BY_ID[current.book].name)} ${current.chapter} aren't written yet. The bank has ${bankSize()} questions so far, starting with Genesis, Job and John, and it grows book by book. Mark chapters as read and their questions unlock.</p>`;
      return;
    }
    if (i >= qs.length) return showScore();
    const q = qs[i];
    body.innerHTML = `<div class="trivia-progress">${qs.map((_, k) => `<span class="${results[k] ? (results[k].right ? "right" : "wrong") : ""}"></span>`).join("")}</div>
      <p class="trivia-kind">${kindLabel[q.kind] || ""} · ${q.refs.map((r) => esc(keyRef(r).name)).join(" + ")}</p>
      <p class="trivia-q">${esc(q.q)}</p>
      <div class="trivia-choices">${q.choices.map((c, k) => `<button data-k="${k}">${esc(c)}</button>`).join("")}</div>
      <p class="trivia-why" hidden></p>`;
    body.querySelectorAll("[data-k]").forEach((btn) => btn.addEventListener("click", () => answer(Number(btn.dataset.k))));
  }
  function answer(k) {
    const q = qs[i];
    const right = k === q.a;
    results.push({ id: q.id, right });
    body.querySelectorAll("[data-k]").forEach((btn) => {
      btn.disabled = true;
      if (Number(btn.dataset.k) === q.a) btn.classList.add("right");
      else if (Number(btn.dataset.k) === k) btn.classList.add("wrong");
    });
    const why = body.querySelector(".trivia-why");
    why.hidden = false;
    why.textContent = `${right ? "Yes! " : "Not quite. "}${q.why}`;
    body.querySelectorAll(".trivia-progress span")[i].className = right ? "right" : "wrong";
    const next = Object.assign(document.createElement("button"), { className: "trivia-next", textContent: i + 1 < qs.length ? "Next question" : "See my score" });
    next.addEventListener("click", () => { i += 1; showQ(); });
    body.append(next);
  }
  function showScore() {
    store.recordTrivia(results, `${BOOK_BY_ID[current.book].name} ${current.chapter}`);
    const score = results.filter((r) => r.right).length;
    const r = knowledgeRating(store.get("trivia"));
    const great = score / results.length >= 0.8;
    body.innerHTML = `<div class="trivia-score">
      <p class="big">${score}/${results.length}</p>
      <p>${great ? "Wonderful! You know this well." : score ? "Good work. Every round helps it stick." : "That's how we learn. Try another round."}</p>
      <p class="muted small-print">Your Bible knowledge: <strong>${esc(r.level)}</strong> · ${r.pct}% correct over ${r.answered} questions</p>
      <button class="trivia-next" id="playAgain">Play again with new questions</button></div>`;
    $("#playAgain").addEventListener("click", startTrivia);
    celebrate(great ? "big" : "small");
    mascotSay(great ? "Hooray! That was wonderful!" : "Nice try! Let's keep learning together.");
  }
  showQ();
  if (!triviaDlg.open) triviaDlg.showModal();
}
$("#triviaBtn").addEventListener("click", startTrivia);
$("#triviaClose").addEventListener("click", () => triviaDlg.close());
function renderKnowledge() {
  const t = store.get("trivia");
  const r = knowledgeRating(t);
  const last = t.sessions[0];
  const C = 2 * Math.PI * 22;
  $("#knowledge").innerHTML = `<svg class="ring" viewBox="0 0 54 54" aria-hidden="true">
      <circle cx="27" cy="27" r="22" fill="none" stroke="var(--line)" stroke-width="6"/>
      <circle cx="27" cy="27" r="22" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(r.pct / 100) * C} ${C}" transform="rotate(-90 27 27)"/>
    </svg>
    <strong>Bible knowledge: ${esc(r.level)}</strong>
    <small>${t.answered ? `${r.pct}% correct over ${t.answered} trivia questions${last ? ` · last round ${last.score}/${last.total} on ${fmtDate(last.at)}` : ""}` : "Play chapter trivia to see your rating grow."}</small>`;
}

/* ---------- Celebrations ---------- */
// Lively pictures get confetti. Still pictures and the Classic look get a quiet gold check instead.
function celebrate(size = "big") {
  if ((store.get("graphics") || "full") !== "full" || isStill() || matchMedia("(prefers-reduced-motion: reduce)").matches) { quietCheck(); return; }
  confetti(size === "small" ? 50 : 120);
}
function quietCheck() {
  const el = Object.assign(document.createElement("div"), { className: "quiet-check", textContent: "✓" });
  document.body.append(el);
  setTimeout(() => el.remove(), 1400);
}
function confetti(count = 120) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = $("#confetti"), ctx = c.getContext("2d");
  c.width = innerWidth * devicePixelRatio; c.height = innerHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const colors = ["#46604f", "#c8a55a", "#c9826b", "#9cc0a8", "#f4f1e8"];
  const bits = Array.from({ length: count }, () => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 12, vy: Math.random() * -12 - 4, r: Math.random() * 6 + 3, a: Math.random() * 6, c: pick(colors) }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits.forEach((b) => { b.vy += .35; b.x += b.vx; b.y += b.vy; b.a += .2; ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c; ctx.fillRect(-b.r / 2, -b.r / 4, b.r, b.r / 2); ctx.restore(); });
    if (++frames < 140) requestAnimationFrame(tick); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}

/* ---------- Friendly lamb (Animated style) ---------- */
let mascotTimer;
let friendWhich = "lamb";
function updateMascot() {
  $("#mascot").hidden = store.get("style") !== "animated" || store.get("graphics") !== "full" || (store.get("show") || {}).mascot === false;
  if (store.get("last")) renderPassageArt(store.get("last").book, store.get("last").chapter);
  $("#friendSlot").innerHTML = friend(friendWhich);
  $("#flourish").innerHTML = isStill() || THEME_LOOKS.includes(store.get("style")) ? classicFlourish() : fishFlourish();
  $("#studyScene").innerHTML = seaScene(store.get("style"));
  $("#vines").innerHTML = edgeVines();
  document.querySelectorAll(".art-slot").forEach((el) => { el.innerHTML = el.dataset.art === "scene" ? seaScene(store.get("style")) : fishStrip(store.get("style")); });
  if (!$("#view-home").hidden) renderHome();
}
function mascotSay(text) {
  if (store.get("style") !== "animated" || !text) return;
  $("#mascotSay").textContent = text;
  clearTimeout(mascotTimer);
  mascotTimer = setTimeout(() => { $("#mascotSay").textContent = ""; }, 6000);
}
function mascotLineFor(book, chapter) {
  const path = store.get("activePath");
  const i = path ? pathIndex(path, book, chapter) : -1;
  const stage = i >= 0 ? PATH_BY_ID[path].stages[pathChapters(path)[i].stage].title : null;
  const name = store.get("name").trim();
  return pick([
    stage ? `We're in "${stage}" today.` : `${BOOK_BY_ID[book].name} ${chapter}. Let's read!`,
    name ? `Hi ${name}! Ready to read?` : "Hi! Ready to read?",
    "Take your time. I'll be right here.",
  ]);
}
$("#mascot").addEventListener("click", () => mascotSay(friendWhich === "donkey"
  ? pick(["Hee-haw! Keep going!", "Jesus rode a donkey into Jerusalem (John 12:14).", "Slow and steady wins the race."])
  : pick(["Baa! You're doing great.", "Sheep know their shepherd's voice (John 10:4).", "Tap the trivia card when you finish a chapter!"])));

/* ---------- Settings ---------- */
function initSettings() {
  const apiKey = $("#apiBibleKey"), esvKey = $("#esvKey"), size = $("#textSize"), theme = $("#theme"), sel = $("#nasbSelect");
  $("#userName").value = store.get("name");
  $("#userName").addEventListener("change", (e) => { store.set("name", e.target.value.trim()); });
  renderLookCard();
  $("#modePace").checked = store.get("yearPace");
  $("#modePace").addEventListener("change", (e) => { store.set("yearPace", e.target.checked); renderMargin(); });
  const lockStatus = () => { $("#lockStatus").textContent = store.get("journalLock") ? "Your journal is locked with a passcode." : "No passcode set."; };
  lockStatus();
  $("#lockSet").addEventListener("click", async () => {
    const code = $("#lockCode").value.trim();
    if (!/^\d{4,8}$/.test(code)) { $("#lockStatus").textContent = "Use 4 to 8 digits."; return; }
    store.set("journalLock", await hashCode(code));
    journalUnlocked = false; $("#lockCode").value = ""; lockStatus(); renderJournal();
  });
  $("#lockClear").addEventListener("click", () => {
    if (journalLocked()) { $("#lockStatus").textContent = "Unlock your journal first (open it under any chapter), then remove the passcode."; return; }
    store.set("journalLock", ""); lockStatus(); renderJournal();
  });
  const modes = store.get("modes");
  $("#modeDrive").checked = modes.drive;
  $("#modeVoice").checked = modes.voiceCommands;
  $("#modeVoice").disabled = !canListen;
  $("#voiceRate").value = store.get("voiceRate");
  $("#modeDrive").addEventListener("change", (e) => setDrive(e.target.checked));
  $("#modeVoice").addEventListener("change", (e) => store.setMode("voiceCommands", e.target.checked));
  $("#voiceRate").addEventListener("input", (e) => setRate(Number(e.target.value)));
  apiKey.value = store.get("apiBibleKey");
  esvKey.value = store.get("esvKey");
  size.value = store.get("textSize");
  theme.value = store.get("theme");
  if (store.get("nasbBibleId")) {
    sel.add(new Option(store.get("nasbLabel") || "Saved edition", store.get("nasbBibleId"), true, true));
  }
  apiKey.addEventListener("change", () => {
    const inv = readInviteCode(apiKey.value);
    if (inv) { applyInvite(inv); applyAppearance(); return; }
    store.set("apiBibleKey", apiKey.value.trim());
  });
  esvKey.addEventListener("change", () => { store.set("esvKey", esvKey.value.trim()); syncVersionSwitch(); });
  const extrasNow = () => {
    const x = store.get("extraBibles") || [];
    $("#extraVersionsNow").textContent = x.length ? `Also on the switch: ${x.map((b) => b.label).join(", ")}.` : "";
  };
  extrasNow();
  size.addEventListener("input", () => { store.set("textSize", Number(size.value)); applyAppearance(); });
  theme.addEventListener("change", () => { store.set("theme", theme.value); applyAppearance(); });
  $("#uiScale").value = String(store.get("uiScale") || 100);
  $("#uiScale").addEventListener("change", () => { store.set("uiScale", Number($("#uiScale").value)); applyAppearance(); });
  $("#contrastHigh").checked = Boolean(store.get("contrast"));
  $("#contrastHigh").addEventListener("change", () => { store.set("contrast", $("#contrastHigh").checked); applyAppearance(); });
  $("#wordTap").checked = store.get("wordTap") !== false;
  $("#wordTap").addEventListener("change", () => store.set("wordTap", $("#wordTap").checked));
  $("#helperStyle").value = store.get("helperStyle") || "";
  $("#helperStyle").addEventListener("change", () => store.set("helperStyle", $("#helperStyle").value));
  sel.addEventListener("change", () => {
    store.set("nasbBibleId", sel.value);
    store.set("nasbLabel", sel.value ? sel.selectedOptions[0].textContent.split(" · ")[0] : "");
    syncVersionSwitch();
    if (store.get("version") === "NASB") { const { book, chapter } = store.get("last"); openChapter(book, chapter, { scroll: false }); }
  });
  $("#loadVersions").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    store.set("apiBibleKey", apiKey.value.trim());
    btn.textContent = "Loading…";
    try {
      const bibles = await listEnglishBibles();
      const current = store.get("nasbBibleId");
      sel.innerHTML = `<option value="">Pick automatically</option>` + bibles.map((b) => `<option value="${esc(b.id)}"${b.id === current ? " selected" : ""}>${esc(b.abbr)} · ${esc(b.name)}</option>`).join("");
      btn.textContent = `${bibles.length} versions loaded`;
      // First time: turn on the King James and New King James for the family if the plan has them.
      if (!(store.get("extraBibles") || []).length) {
        const want = [/^KJV$|King James/i, /NKJV|New King James/i];
        const picks = want.map((re) => bibles.find((b) => b.id !== store.get("nasbBibleId") && (re.test(b.abbr) || re.test(b.name)))).filter(Boolean);
        if (picks.length) { store.set("extraBibles", [...new Map(picks.map((b) => [b.id, { id: b.id, label: b.abbr }])).values()].slice(0, MAX_EXTRA_BIBLES)); extrasNow(); syncVersionSwitch(); }
      }
      const hasNkjv = bibles.some((b) => /NKJV|New King James/i.test(`${b.abbr} ${b.name}`));
      btn.textContent = `${bibles.length} versions loaded${hasNkjv ? "" : " · NKJV isn't on this plan"}`;
      const chosen = new Set((store.get("extraBibles") || []).map((b) => b.id));
      $("#extraVersionList").innerHTML = bibles.filter((b) => b.id !== store.get("nasbBibleId")).map((b) => `<label class="switch-row"><span>${esc(b.abbr)}<small>${esc(b.name)}</small></span><input type="checkbox" role="switch" data-extra="${esc(b.id)}" data-label="${esc(b.abbr)}" ${chosen.has(b.id) ? "checked" : ""}></label>`).join("");
      $("#extraVersions").hidden = false;
      $("#extraVersionList").querySelectorAll("[data-extra]").forEach((i) => i.addEventListener("change", () => {
        let x = (store.get("extraBibles") || []).filter((b) => b.id !== i.dataset.extra);
        if (i.checked) {
          if (x.length >= MAX_EXTRA_BIBLES) { i.checked = false; $("#extraVersionsNow").textContent = `Up to ${MAX_EXTRA_BIBLES} extra versions fit on the switch. Turn one off first.`; return; }
          x = [...x, { id: i.dataset.extra, label: i.dataset.label }];
        }
        store.set("extraBibles", x);
        extrasNow(); syncVersionSwitch();
      }));
    } catch (err) {
      btn.textContent = err.message || "Couldn't load versions";
    }
  });
  $("#exportBtn").addEventListener("click", () => {
    const blob = new Blob([store.exportJSON()], { type: "application/json" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `bible-study-backup-${new Date().toISOString().slice(0, 10)}.json` });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("#importFile").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      store.importJSON(await file.text());
      applyAppearance(); syncVersionSwitch();
      const { book, chapter } = store.get("last");
      openChapter(book, chapter);
      showView("read");
    } catch {
      e.target.parentElement.firstChild.textContent = "That file couldn't be read ";
    }
  });
}

/* ---------- First-time setup (and "Set up app" in Settings) ---------- */
// Shown once, the first time someone opens the app: name, their own password (in place of
// the starter one), the look, then the tour or "maybe later". After that it all lives in
// Settings and the ⋮ menu and never asks again.
let SETUP_STEPS = [
  { id: "welcome", title: "Welcome", done: () => Boolean(store.get("name").trim()) },
  { id: "password", title: "Your own password", done: () => Boolean(store.get("setup")?.password) },
  { id: "look", title: "Look and pictures", done: () => Boolean(store.get("setup")?.look) },
  { id: "key", title: "Your Bible key", done: () => Boolean(store.get("apiBibleKey")) },
  { id: "tour", title: "A quick tour", done: () => Boolean(store.get("tourSeen")) },
];
if (!authEnabled) SETUP_STEPS = SETUP_STEPS.filter((st) => st.id !== "password");
let setupAt = 0;
function setupSet(patch) { store.set("setup", { ...(store.get("setup") || {}), ...patch }); }
function openSetup(at = 0) {
  setupAt = at;
  renderSetup();
  if (!$("#setup").open) $("#setup").showModal();
}
function closeSetup(finished) {
  if (finished) setupSet({ done: true }); else setupSet({ skipped: true });
  $("#setup").close();
  renderSetupCard();
  showView("home");
  store.set("tourSeen", true); // the tour was offered in setup; it stays in the menu and ❓
  setupAccountButton();
}
function renderSetupDots() { $("#setupDots").innerHTML = SETUP_STEPS.map((s, i) => `<span class="${i === setupAt ? "on" : s.done() ? "done" : ""}"></span>`).join(""); }
function renderSetup() {
  const step = SETUP_STEPS[setupAt];
  $("#setupStepLabel").textContent = `Step ${setupAt + 1} of ${SETUP_STEPS.length}`;
  renderSetupDots();
  $("#setupBack").style.visibility = setupAt ? "visible" : "hidden";
  $("#setupNext").textContent = setupAt === SETUP_STEPS.length - 1 ? (step.id === "tour" ? "Skip the tour for now" : "Finish") : "Next";
  const body = $("#setupBody");
  const chips = (list, cur, attr) => `<div class="qm-chips">${list.map(([v, l]) => `<button ${attr}="${v}" aria-pressed="${cur === v}">${l}</button>`).join("")}</div>`;
  if (step.id === "welcome") {
    body.innerHTML = `${seaScene(store.get("style"))}<h2 class="setup-h">Welcome to your Bible study</h2>
      <p class="muted">A few quick steps make the app yours. This only happens the first time. You can change any of it later in Settings.</p>
      <label class="field">What should the app call you?<input id="setupName" type="text" autocomplete="given-name" value="${esc(store.get("name"))}" placeholder="Your first name"></label>`;
    $("#setupName").addEventListener("input", (e) => { store.set("name", e.target.value.trim()); $("#userName").value = e.target.value.trim(); });
  } else if (step.id === "look") {
    body.innerHTML = `<h2 class="setup-h">How should it look?</h2>
      <p class="muted small-print">Classic is chosen for you. Pick another if you like. You can change it any time in Settings, under Look.</p>
      <div class="look-grid">${lookGridHtml("data-s-look")}</div>
      <p class="muted small-print" style="margin-top:14px">Pictures</p>${chips(GRAPHICS, store.get("graphics") || "full", "data-s-gfx")}
      <p class="muted small-print">${esc(GRAPHICS.find(([v]) => v === (store.get("graphics") || "full"))[2])}</p>
      ${seaScene(store.get("style"))}`;
    body.querySelectorAll("[data-s-look]").forEach((b) => b.addEventListener("click", () => { setStyle(b.dataset.sLook); setupSet({ look: true }); renderSetup(); }));
    body.querySelectorAll("[data-s-gfx]").forEach((b) => b.addEventListener("click", () => { store.set("graphics", b.dataset.sGfx); applyAppearance(); setupSet({ look: true }); renderSetup(); }));
  } else if (step.id === "key") {
    body.innerHTML = `<h2 class="setup-h">Your own Bible key</h2>
      <p class="muted small-print">The Bible text comes from API.Bible. Paste your free key, or an invite code someone in your family sent you. It's saved on this device only.</p>
      <label class="field">API.Bible key<input id="setupKey" type="password" autocomplete="off" spellcheck="false" placeholder="Paste your key" value="${esc(store.get("apiBibleKey"))}"></label>
      <p class="setup-key-status" id="setupKeyStatus">${store.get("apiBibleKey") ? "Key saved ✓" : ""}</p>
      <details class="key-help" ${store.get("apiBibleKey") ? "" : "open"}><summary>How to get your free key (about 5 minutes)</summary>${$("#keyHelp ol").outerHTML}</details>
      <p class="muted small-print">Don't have it yet? Tap Next. You can add it later in Settings.</p>`;
    $("#setupKey").addEventListener("change", (e) => {
      const inv = readInviteCode(e.target.value);
      if (inv) { applyInvite(inv); applyAppearance(); e.target.value = inv.k; }
      const v = e.target.value.trim();
      store.set("apiBibleKey", v); $("#apiBibleKey").value = v;
      $("#setupKeyStatus").textContent = v ? "Key saved ✓" : "";
      const { book, chapter } = store.get("last"); openChapter(book, chapter, { scroll: false });
    });
  } else if (step.id === "password") {
    body.innerHTML = `<h2 class="setup-h">Make your own password</h2>
      <p class="muted">You signed in with the starter password. Choose your own now, something you'll remember. If you ever forget it, tap "Forgot password?" on the sign-in screen and we'll email you a link.</p>
      <label class="field">New password<input id="setupPw" type="password" autocomplete="new-password" placeholder="At least 6 letters or numbers"></label>
      <label class="field">Type it again<input id="setupPw2" type="password" autocomplete="new-password"></label>
      <button type="button" class="big-btn" id="setupPwSave">Save my password</button>
      <p class="setup-key-status" id="setupPwMsg" role="status">${store.get("setup")?.password ? "Your own password is saved ✓" : ""}</p>
      <p class="muted small-print">You'll stay signed in on this device. You can change your password any time in Settings, under Account.</p>`;
    $("#setupPwSave").addEventListener("click", async () => {
      const a = $("#setupPw").value, b = $("#setupPw2").value, msg = $("#setupPwMsg"), problem = passwordProblem(a, b);
      if (problem) { msg.textContent = problem; return; }
      $("#setupPwSave").disabled = true; msg.textContent = "Saving…";
      try { await changePassword(a); setupSet({ password: true }); flag(STARTER_KEY, false); flag(RESET_KEY, false); msg.textContent = "Your own password is saved ✓ Tap Next."; $("#setupPw").value = $("#setupPw2").value = ""; renderSetupDots(); }
      catch (x) { msg.textContent = x.message || "That didn't save. Check your internet and try again."; }
      $("#setupPwSave").disabled = false;
    });
  } else if (step.id === "tour") {
    body.innerHTML = `<h2 class="setup-h">You're all set${store.get("name") ? `, ${esc(store.get("name"))}` : ""}!</h2>
      <p>Would you like a quick tour? It shows you where everything is: reading, versions, read-aloud, the study section, asking questions, your journal, signing in and out, and Settings.</p>
      <button type="button" class="big-btn" id="setupTour">🧭 Take the tour</button>
      <p class="muted small-print">Not now? You can take it any time: tap ❓ at the top, or open the ⋮ menu, or go to Settings.</p>`;
    $("#setupTour").addEventListener("click", () => { closeSetup(true); startTour(); });
  } else if (step.id === "path") {
    const active = store.get("activePath");
    body.innerHTML = `<h2 class="setup-h">Choose your study path</h2>
      <p class="muted small-print">Each path covers the whole Bible in a different order. You can switch any time.</p>
      <div class="setup-paths">${PATH_ORDER.map((id) => `<button class="setup-path" data-s-path="${id}" aria-pressed="${active === id}"><span class="pc-icon">${PATH_ICONS[id]}</span><span><strong>${esc(PATH_BY_ID[id].name)}</strong><small>${esc(PATH_BY_ID[id].blurb)}</small></span></button>`).join("")}</div>`;
    body.querySelectorAll("[data-s-path]").forEach((b) => b.addEventListener("click", () => { store.startPath(b.dataset.sPath); updatePathBits(); renderSetup(); }));
  } else {
    body.innerHTML = signedInUser
      ? `<h2 class="setup-h">Your account</h2><p>You're signed in as <strong>${esc(signedInUser.email || "")}</strong>.</p>
        <p class="muted small-print">This device stays signed in. You can sign out any time in Settings, under Account. Tap Finish to start reading.</p>`
      : `<h2 class="setup-h">Your account</h2>
        <p class="muted">Family sign-in isn't switched on yet. Once it is, everyone signs in with their own email, and you'll see your account in Settings.</p>
        <p class="muted small-print">For now everything is saved on this device. Tap Finish to start reading.</p>`;
  }
}
$("#setupNext").addEventListener("click", () => { if (setupAt < SETUP_STEPS.length - 1) { setupAt += 1; renderSetup(); } else closeSetup(true); });
$("#setupBack").addEventListener("click", () => { if (setupAt) { setupAt -= 1; renderSetup(); } });
$("#setupLater").addEventListener("click", () => closeSetup(false));
$("#setup").addEventListener("cancel", (e) => { e.preventDefault(); closeSetup(false); });
function renderSetupCard() {
  const el = $("#setupCard");
  const left = SETUP_STEPS.filter((s) => !s.soon && !s.done());
  el.innerHTML = `<h2>Set up app</h2>
    <ul class="setup-list">${SETUP_STEPS.map((s, i) => `<li><button class="setup-row" data-s-open="${i}"><span class="st ${s.done() ? "done" : "none"}">${s.done() ? "✓" : "○"}</span>${esc(s.title)}${s.soon ? ` <small>coming soon</small>` : ""}<span class="go">›</span></button></li>`).join("")}</ul>
    <p class="muted small-print">${left.length ? `${left.length} step${left.length === 1 ? "" : "s"} left. Tap any step to finish or change it.` : "All set. Tap any step to change it."}</p>`;
  el.querySelectorAll("[data-s-open]").forEach((b) => b.addEventListener("click", () => openSetup(Number(b.dataset.sOpen))));
}

/* ---------- Quick menu: look, pictures, and features each person can show or hide ---------- */
const FEATURES = [
  { id: "listen", label: "Read-aloud bar", hint: "Play, speed and drive mode at the top of each chapter" },
  { id: "notes", label: "Study section", hint: "Strong's concordance, word search, maps, history and scholars under each chapter" },
  { id: "trivia", label: "Trivia", hint: "Questions after each chapter" },
  { id: "journal", label: "Chapter journal", hint: "Thoughts, prayers and gratitude under each chapter" },
  { id: "diary", label: "Daily life journal", hint: "A dated page for each day, and the keepsake journal book, in My study" },
  { id: "mascot", label: "Corner friend", hint: "The lamb or donkey in the Animated look" },
  { id: "vines", label: "Olive branches on the edges", hint: "The branches down both sides" },
  { id: "pathmargin", label: "Learning path button", hint: "The ☰ button for the path list" },
  { id: "visits", label: "My visits to a chapter", hint: "How often and when you've opened each chapter, under the chapter title" },
];
// [value, name, short description, swatch colors]. The saved values "masculine" and "animated"
// are kept so nobody's choice changes; only their names did.
const LOOKS = [
  ["classic", "Classic", "Brown, gray and white, with olive branches and three crosses on a hill. Still.", ["#3a3430", "#ffffff", "#7d8a6e"]],
  ["sage", "Sage", "A spring garden with olive trees, blossoms, doves and three crosses. Still.", ["#46604f", "#fbfaf6", "#f2c9cf"]],
  ["nativity", "Nativity", "Navy night sky, desert browns and a star over Bethlehem. Good all year.", ["#1c2742", "#d8a94e", "#5b4636"]],
  ["easter", "Easter", "Sunrise colors, lilies and the empty tomb. Still.", ["#5e5578", "#f3d9b9", "#8a9a6e"]],
  ["fall", "Thanksgiving", "The Lord's Supper at a harvest table, with prayers of thanks. Still.", ["#6e3b22", "#d9a441", "#f4ecdc"]],
  ["christmas", "Christmas", "A big nativity in red, green and gold, under the star.", ["#1f3a2e", "#8c2a2a", "#d4b062"]],
  ["masculine", "Animated", "Warm browns, with boats and fish that move.", ["#3b2b20", "#efe3d0", "#b8875a"]],
  ["animated", "For kids", "Bright colors, a friendly lamb, and pictures that change with the Bible story.", ["#3f6f7a", "#e9f4f6", "#e07a5f"]],
];
// Still looks: no motion, no cartoons, no confetti. Nativity and Christmas follow the Pictures setting,
// so their star twinkles with Lively pictures and stays put with Still pictures.
function isStill(style = store.get("style")) { return ["classic", "sage", "easter", "fall"].includes(style); }
function lookGridHtml(attr) {
  const cur = store.get("style");
  return LOOKS.map(([v, l, d, sw]) => `<button class="look-opt" ${attr}="${v}" aria-pressed="${cur === v}"><span class="look-sw">${sw.map((c) => `<i style="background:${c}"></i>`).join("")}</span><span><strong>${esc(l)}</strong><small>${esc(d)}</small></span></button>`).join("");
}
function renderLookCard() {
  const grid = $("#lookGrid");
  if (!grid) return;
  grid.innerHTML = lookGridHtml("data-set-look");
  grid.querySelectorAll("[data-set-look]").forEach((b) => b.addEventListener("click", () => { setStyle(b.dataset.setLook); renderLookCard(); }));
  const g = store.get("graphics") || "full";
  $("#lookGraphics").innerHTML = GRAPHICS.map(([v, l]) => `<button data-set-gfx="${v}" aria-pressed="${g === v}">${l}</button>`).join("");
  $("#lookGraphicsNote").textContent = GRAPHICS.find(([v]) => v === g)[2];
  $("#lookGraphics").querySelectorAll("[data-set-gfx]").forEach((b) => b.addEventListener("click", () => { store.set("graphics", b.dataset.setGfx); applyAppearance(); renderLookCard(); }));
}
const GRAPHICS = [["full", "Lively", "Friendly characters that move and blink, more pictures while you read, and confetti when you finish trivia or a chapter."], ["simple", "Still", "The same scenes, maps and borders, drawn still and elegant: no cartoon faces, no motion and no confetti. A good fit for anyone who'd rather not have cartoons."], ["none", "Text only", "Just the Bible text and tools, no pictures."]];
function renderQuickMenu() {
  const shown = store.get("show") || {};
  $("#qmToggles").innerHTML = FEATURES.map((f) => `<label class="switch-row"><span>${esc(f.label)}<small>${esc(f.hint)}</small></span><input type="checkbox" role="switch" data-qm-feat="${f.id}" ${shown[f.id] === false ? "" : "checked"}></label>`).join("");
  $("#qmToggles").querySelectorAll("[data-qm-feat]").forEach((i) => i.addEventListener("change", () => {
    store.set("show", { ...(store.get("show") || {}), [i.dataset.qmFeat]: i.checked });
    applyAppearance();
    if (i.dataset.qmFeat === "pathmargin" && !i.checked) setMargin(false);
  }));
}
$("#menuBtn").addEventListener("click", () => { renderQuickMenu(); $("#quickMenu").showModal(); });
$("#menuClose").addEventListener("click", () => $("#quickMenu").close());
$("#quickMenu").addEventListener("click", (e) => { if (e.target.id === "quickMenu") $("#quickMenu").close(); });
document.querySelectorAll("[data-go-view]").forEach((b) => b.addEventListener("click", () => { $("#quickMenu").close(); showView(b.dataset.goView); }));

/* ---------- Art that fits the passage ---------- */
function renderPassageArt(book, chapter) {
  const el = $("#passageArt");
  if (!el) return;
  const { svg, caption } = passageStrip(book, chapter, store.get("style"));
  el.innerHTML = `${svg}<p class="passage-caption">${esc(caption)}</p>`;
}

/* ---------- Study notes: map, history, science, words, views, sources ---------- */
let notesTab = "strongs";
function mapSvg(map, mode) {
  const { bounds, water, rivers, riverLabels, waterLabel, islands = [] } = map.outline;
  const W = 340;
  const mid = ((bounds.lat[0] + bounds.lat[1]) / 2) * Math.PI / 180;
  const H = Math.round(W * (bounds.lat[1] - bounds.lat[0]) / ((bounds.lon[1] - bounds.lon[0]) * Math.cos(mid)));
  const X = (lon) => ((lon - bounds.lon[0]) / (bounds.lon[1] - bounds.lon[0])) * W;
  const Y = (lat) => ((bounds.lat[1] - lat) / (bounds.lat[1] - bounds.lat[0])) * H;
  const line = (pts) => pts.map(([la, lo], i) => `${i ? "L" : "M"}${X(lo).toFixed(1)} ${Y(la).toFixed(1)}`).join(" ");
  const places = map.places.map((p, i) => {
    const x = X(p.lon), y = Y(p.lat), right = p.side ? p.side === "right" : x < W * 0.62;
    return `<g class="map-place" data-place="${i}" tabindex="0" role="button" aria-label="${esc(p[mode])}">
      <circle class="map-dot-halo" cx="${x}" cy="${y}" r="9"/><circle class="map-dot" cx="${x}" cy="${y}" r="4.2"/>
      <text class="map-label" x="${right ? x + 8 : x - 8}" y="${y + 4 + (p.dy || 0)}" text-anchor="${right ? "start" : "end"}">${esc(p[mode])}</text></g>`;
  }).join("");
  return `<svg class="notes-map" viewBox="0 0 ${W} ${H}" role="img" aria-label="Map: ${esc(map.caption)}">
    <rect class="map-land" width="${W}" height="${H}" rx="14"/>
    ${water.map((w) => `<path class="map-water" d="${line(w)} Z"/>`).join("")}
    ${islands.map((w) => `<path class="map-island" d="${line(w)} Z"/>`).join("")}
    ${rivers.map((r) => `<path class="map-river" d="${line(r)}"/>`).join("")}
    ${riverLabels.map((l) => `<text class="map-river-label" x="${X(l.lon)}" y="${Y(l.lat)}">${esc(l.text)}</text>`).join("")}
    <text class="map-water-label" x="${X(waterLabel.lon)}" y="${Y(waterLabel.lat)}" text-anchor="middle">${esc(waterLabel.text)}</text>
    ${places}</svg>`;
}
/* ---------- Strong's concordance for every chapter ---------- */
const strongsCache = {}, lexCache = {};
function loadStrongs(book, chapter) {
  const k = `${book}.${chapter}`;
  if (!strongsCache[k]) strongsCache[k] = fetch(`data/strongs/${k}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((d) => { if (!d) delete strongsCache[k]; return d; });
  return strongsCache[k];
}
function loadLex(n) {
  const b = n[0] + Math.floor(Number(n.slice(1)) / 100);
  if (!lexCache[b]) lexCache[b] = fetch(`data/lex/${b}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((d) => { if (!d) delete lexCache[b]; return d || {}; });
  return lexCache[b].then((d) => d[n]);
}
function strongsRow([n, lemma, xlit, gloss, count, verses]) {
  const heb = n[0] === "H";
  const vs = verses.length > 8 ? `${verses.length} verses` : `v. ${verses.join(", ")}`;
  return `<details class="sc-word" data-n="${n}"><summary>
    <span class="orig" lang="${heb ? "he" : "el"}" dir="${heb ? "rtl" : "ltr"}">${esc(lemma)}</span><span class="say">${esc(xlit)}</span><span class="means">“${esc(gloss)}”</span>
    <span class="sc-meta"><span class="strongs-num">${n}</span> ${count.toLocaleString()} time${count === 1 ? "" : "s"} in the Bible · ${vs}</span></summary>
    <div class="sc-def muted small-print">Loading Strong's entry…</div></details>`;
}
async function fillStrongs(el, book, chapter) {
  const panel = el.querySelector("#strongsPanel");
  if (!panel) return;
  const rows = await loadStrongs(book, chapter);
  if (!panel.isConnected) return;
  if (!rows) { panel.innerHTML = `<p class="muted small-print">The concordance couldn't load. Check your connection and try again.</p>`; return; }
  const big = rows.filter((r) => !r[6]), small = rows.filter((r) => r[6]);
  const lang = BOOK_BY_ID[book].testament === "OT" ? "Hebrew" : "Greek";
  panel.innerHTML = `<p class="muted small-print">Every ${lang} word in ${esc(refName({ book, chapter }))}, in the order it first appears, with its Strong's number and how many times it's used in the whole Bible. Tap a word for James Strong's definition.</p>
    <div class="sc-list">${big.map(strongsRow).join("")}</div>
    ${small.length ? `<details class="sc-small"><summary>Small words like “and”, “the” and “in” (${small.length})</summary><div class="sc-list">${small.map(strongsRow).join("")}</div></details>` : ""}
    <p class="muted small-print sc-credit">Counts are of the ${lang} words, so they can differ from the count of an English word in the NASB. Word tagging: STEPBible.org, Tyndale House Cambridge (CC BY). Definitions: James Strong, <em>Exhaustive Concordance</em> (1890), via Open Scriptures.</p>`;
  panel.querySelectorAll(".sc-word").forEach((d) => d.addEventListener("toggle", async () => {
    if (!d.open || d.dataset.loaded) return;
    const e = await loadLex(d.dataset.n);
    const box = d.querySelector(".sc-def");
    if (!e) { box.textContent = "No dictionary entry for this number. Check your connection and try again."; return; }
    d.dataset.loaded = "1";
    box.classList.remove("muted", "small-print");
    box.innerHTML = `${e.pron ? `<p class="muted small-print">Say it: ${esc(e.pron)}</p>` : ""}
      ${e.def ? `<p><strong>Strong's definition:</strong> ${esc(e.def)}</p>` : ""}
      ${e.kjv ? `<p><strong>KJV translates it:</strong> ${esc(e.kjv)}</p>` : ""}
      ${e.from ? `<p class="muted small-print">Word origin: ${esc(e.from)}</p>` : ""}`;
  }));
}



/* ---------- Setting the stage: book introduction (and this chapter, where written) ---------- */
// Open on a book's first chapter; a tap away on every other chapter.
function renderBookIntro(book, chapter) {
  const box = $("#bookIntro");
  if (!box) return;
  const b = INTROS[book], ch = notesFor(book, chapter)?.intro;
  if (!b && !ch) { box.hidden = true; return; }
  const name = BOOK_BY_ID[book].name;
  const row = (label, text) => (text ? `<div class="bi-row"><dt>${label}</dt><dd>${esc(text)}</dd></div>` : "");
  box.innerHTML = `<summary><span class="bi-icon" aria-hidden="true">📜</span><span><strong>Setting the stage</strong><small>About ${esc(name)}${ch ? ` and chapter ${chapter}` : ""}</small></span></summary>
    <div class="bi-body">
      ${ch ? `<p class="bi-chapter"><strong>In chapter ${chapter}:</strong> ${esc(ch)}</p>` : ""}
      ${b ? `<p class="bi-about">${esc(b.about)}</p>
      <dl class="bi-facts">${row("Written by", b.who)}${row("When", b.when)}${row("First readers", b.to)}${row("Setting", b.setting)}${row("Key verse", b.key)}</dl>
      ${b.views ? `<p class="bi-views"><strong>Where views differ:</strong> ${esc(b.views)}</p>` : ""}` : ""}
      <p class="muted small-print">Introductions give the traditional view first and say where scholars differ. Scripture itself is the guide.</p>
    </div>`;
  box.open = chapter === 1;
  box.hidden = false;
}

/* ---------- Tap a word in the Bible text: plain meaning, then the Hebrew or Greek ---------- */
// Only on a tap (never on hover), and only when "Tap a word for its meaning" is on in Settings.
const wordSheet = document.createElement("dialog");
wordSheet.className = "word-sheet"; wordSheet.setAttribute("aria-label", "Word meaning");
document.body.append(wordSheet);
wordSheet.addEventListener("click", (e) => { if (e.target === wordSheet) wordSheet.close(); });
function wordAt(x, y) {
  let node, offset;
  if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); if (p) { node = p.offsetNode; offset = p.offset; } }
  else if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); if (r) { node = r.startContainer; offset = r.startOffset; } }
  if (!node || node.nodeType !== 3) return null;
  const t = node.textContent, isW = (c) => /[A-Za-z’'-]/.test(c);
  let a = offset, b = offset;
  while (a > 0 && isW(t[a - 1])) a--;
  while (b < t.length && isW(t[b])) b++;
  const word = t.slice(a, b).replace(/^[’'-]+|[’'-]+$/g, "");
  return word.length > 1 ? { word, node } : null;
}
function verseOf(node) {
  // Walk backwards through the text to the nearest verse number.
  const marks = [...$("#reader").querySelectorAll(".v, .verse-num, .chapter-num, [data-number]")];
  let verse = 1;
  for (const m of marks) {
    if (m.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING || m.contains(node)) {
      const n = m.classList.contains("chapter-num") ? 1 : parseInt(m.dataset.number || m.textContent, 10);
      if (n) verse = n;
    } else break;
  }
  return verse;
}
function originalMatches(rows, word, verse) {
  const inVerse = rows.filter((r) => r[5].includes(verse));
  const w = stem(word);
  const score = (r) => {
    const toks = String(r[3]).toLowerCase().split(/[^a-z]+/).filter(Boolean).map(stem);
    if (toks.includes(w)) return 3;
    if (w.length >= 4 && toks.some((t) => t.length >= 4 && (t.startsWith(w.slice(0, 4)) || w.startsWith(t.slice(0, 4))))) return 2;
    return 0;
  };
  const ranked = inVerse.map((r) => [score(r), r]).filter(([n, r]) => n && !(r[6] && n < 3)).sort((a, b) => b[0] - a[0]).map(([, r]) => r);
  return { best: ranked.slice(0, 2), others: inVerse.filter((r) => !ranked.includes(r) && !r[6]) };
}
function origCard(r, open = false) {
  const heb = r[0][0] === "H";
  return `<details class="ws-orig"${open ? " open" : ""} data-n="${r[0]}"><summary>
    <span class="orig" lang="${heb ? "he" : "el"}" dir="${heb ? "rtl" : "ltr"}">${esc(r[1])}</span>
    <span class="ws-say">${esc(r[2])}</span><span class="ws-means">“${esc(r[3])}”</span>
    <span class="ws-meta">${heb ? "Hebrew" : "Greek"} · Strong's ${r[0]} · used ${r[4].toLocaleString()} time${r[4] === 1 ? "" : "s"}</span></summary>
    <div class="ws-def">Loading…</div></details>`;
}
function wireOrig(root) {
  root.querySelectorAll(".ws-orig").forEach((d) => {
    const fill = async () => {
      if (!d.open || d.dataset.loaded) return;
      const e = await loadLex(d.dataset.n);
      const box = d.querySelector(".ws-def");
      if (!e) { box.textContent = "This word's dictionary entry couldn't load. Check your connection."; return; }
      d.dataset.loaded = "1";
      box.innerHTML = `${e.def ? `<p><strong>Meaning (Strong's):</strong> ${esc(e.def)}</p>` : ""}${e.kjv ? `<p><strong>Also translated:</strong> ${esc(e.kjv)}</p>` : ""}${e.pron ? `<p class="muted small-print">Say it: ${esc(e.pron)}</p>` : ""}`;
    };
    d.addEventListener("toggle", fill); fill();
  });
}
async function openWordSheet(word, verse) {
  const { book, chapter } = store.get("last");
  const g = glossFor(word);
  const lang = BOOK_BY_ID[book].testament === "OT" ? "Hebrew" : "Greek";
  wordSheet.innerHTML = `<div class="ws-head"><h2>${esc(word)}</h2><button type="button" class="ws-close" aria-label="Close">✕</button></div>
    <p class="ws-ref">${esc(BOOK_BY_ID[book].name)} ${chapter}:${verse}</p>
    ${g ? `<div class="ws-plain"><strong>What it means</strong><p>${esc(g.text)}</p></div>` : ""}
    <div class="ws-lang"><p class="muted small-print">Looking up the ${lang}…</p></div>
    <button type="button" class="big-btn ws-done">Close</button>`;
  wordSheet.querySelectorAll(".ws-close, .ws-done").forEach((b) => b.addEventListener("click", () => wordSheet.close()));
  if (!wordSheet.open) wordSheet.showModal();
  const rows = await loadStrongs(book, chapter);
  const box = wordSheet.querySelector(".ws-lang");
  if (!box || !box.isConnected) return;
  if (!rows) { box.innerHTML = `<p class="muted small-print">The ${lang} couldn't load. Check your connection and try again.</p>`; return; }
  const { best, others } = originalMatches(rows, word, verse);
  box.innerHTML = `${best.length ? `<strong>In the ${lang}</strong>${best.map((r, i) => origCard(r, i === 0 && !g)).join("")}` : `<p class="muted small-print">${g ? "" : `This English word doesn't line up with one ${lang} word here. `}See every ${lang} word in verse ${verse} below.</p>`}
    ${others.length ? `<details class="ws-more"><summary>Other ${lang} words in verse ${verse} (${others.length})</summary>${others.map((r) => origCard(r)).join("")}</details>` : ""}
    <p class="muted small-print ws-credit">Word tagging: STEPBible.org, Tyndale House Cambridge (CC BY). Definitions: James Strong (1890).</p>`;
  wireOrig(box);
}
$("#reader").addEventListener("click", (e) => {
  if (store.get("wordTap") === false || !window.getSelection().isCollapsed) return;
  if (e.target.closest(".v, .verse-num, .chapter-num, .message, button, a")) return;
  const hit = wordAt(e.clientX, e.clientY);
  if (!hit) return;
  openWordSheet(hit.word, verseOf(hit.node));
});

/* ---------- Open the same chapter in Olive Tree or Logos ---------- */
function openInHtml(book, chapter) {
  const i = BOOKS.findIndex((b) => b.id === book) + 1;
  const logosName = book === "SNG" ? "Song" : BOOK_BY_ID[book].name.replace(/\s+/g, "");
  return `<div class="open-in"><span class="muted small-print">Open this chapter in</span>
    <a class="small btn-link" id="openOlive" href="olivetree://bible/${i}.${chapter}.1">Olive Tree</a>
    <a class="small btn-link" href="https://ref.ly/${encodeURIComponent(logosName)}${chapter}.1" target="_blank" rel="noopener">Logos</a>
    <p class="muted small-print open-note" id="openNote" hidden></p></div>`;
}
function wireOpenIn(el) {
  el.querySelector("#openOlive")?.addEventListener("click", () => {
    const t = setTimeout(() => {
      const n = el.querySelector("#openNote");
      if (n && document.visibilityState === "visible") { n.hidden = false; n.innerHTML = `Olive Tree didn't open. If it isn't on this device, get it free from the <a href="https://apps.apple.com/app/id332615624" target="_blank" rel="noopener">App Store</a>. Your purchased books stay in Olive Tree.`; }
    }, 1800);
    document.addEventListener("visibilitychange", () => clearTimeout(t), { once: true });
  });
}

function renderNotes(book, chapter) {
  const el = $("#studyNotes");
  const n = notesFor(book, chapter);
  if (!n) {
    el.className = "notes-card";
    const tabs = [["strongs", "Strong's concordance"], ["search", "Word search"]];
    if (!tabs.some(([id]) => id === notesTab)) notesTab = "strongs";
    el.innerHTML = `<div class="notes-head"><h2>Study</h2><span class="muted small-print">${esc(refName({ book, chapter }))}</span></div>
      <div class="notes-tabs" role="tablist">${tabs.map(([id, label]) => `<button role="tab" data-tab="${id}" aria-selected="${id === notesTab}">${esc(label)}</button>`).join("")}</div>
      <div class="notes-panel">${notesTab === "strongs" ? `<div id="strongsPanel"><p class="muted small-print">Loading the concordance…</p></div>` : wordSearchHtml()}</div>
      <p class="muted small-print" style="margin-top:14px">Background, maps then and now, scholars' views and cross-references are written for these chapters so far, with more on the way:</p>
      <div class="row">${sampleChapters().map((k) => { const r = keyRef(k); return `<button class="small" data-go="${k}">${esc(r.name)}</button>`; }).join("")}</div>
      ${openInHtml(book, chapter)}`;
    el.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => { notesTab = b.dataset.tab; renderNotes(book, chapter); }));
    el.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => { const r = keyRef(b.dataset.go); openChapter(r.book, r.chapter); }));
    wireWordSearch(el);
    wireOpenIn(el);
    fillStrongs(el, book, chapter);
    return;
  }
  el.className = "notes-card";
  const srcKeys = Object.keys(n.sources);
  const cite = (ids) => ids?.length ? ` <button class="cite" data-cite="${ids[0]}">[${ids.map((k) => srcKeys.indexOf(k) + 1).join(", ")}]</button>` : "";
  const ev = (k) => k ? `<span class="ev ev-${k}" title="${esc(EVIDENCE[k].tip)}">${esc(EVIDENCE[k].label)}</span>` : "";
  const label = (sec) => sec.id === "history" ? "Background" : sec.id === "views" ? "Scholars and views" : sec.lang ? "Key words" : sec.title.split(" ")[0];
  const tabs = [["strongs", "Strong's concordance"], ["map", "Map then and now"], ...n.sections.map((sec) => [sec.id, label(sec)]), ...(n.crossRefs ? [["xref", "Cross-references"]] : []), ["search", "Word search"], ["sources", "Sources"]];
  if (!tabs.some(([id]) => id === notesTab)) notesTab = "strongs";
  let body = "";
  if (notesTab === "strongs") {
    body = `<div id="strongsPanel"><p class="muted small-print">Loading the concordance…</p></div>`;
  } else if (notesTab === "map") {
    const mode = el.dataset.mode || "then";
    body = `<div class="map-toggle" role="group" aria-label="Map labels"><button data-mode="then" aria-pressed="${mode === "then"}">Then</button><button data-mode="now" aria-pressed="${mode === "now"}">Now</button></div>
      ${mapSvg(n.map, mode)}<p class="map-note" id="mapNote">Tap a place to learn about it.</p><p class="muted small-print">${esc(n.map.caption)} The map is simplified, not drawn to survey scale.</p>`;
  } else if (notesTab === "xref") {
    body = `<div class="xrefs">${n.crossRefs.map(([k, ref, why]) => `<button class="xref" data-go="${k}"><strong>${esc(ref)}</strong><span>${esc(why)}</span></button>`).join("")}</div>`;
  } else if (notesTab === "search") {
    body = wordSearchHtml();
  } else if (notesTab === "sources") {
    body = `<ol class="sources">${srcKeys.map((k) => `<li id="src-${k}">${esc(n.sources[k])}</li>`).join("")}</ol>
      <div class="ev-key">${Object.keys(EVIDENCE).map((k) => `<p>${ev(k)} ${esc(EVIDENCE[k].tip)}</p>`).join("")}</div>`;
  } else {
    const sec = n.sections.find((s) => s.id === notesTab);
    body = sec.items.map((it) => it.word
      ? `<div class="note-item word-item"><div class="word-line"><span class="orig" lang="${sec.lang === "Hebrew" ? "he" : "el"}" dir="${sec.lang === "Hebrew" ? "rtl" : "ltr"}">${esc(it.word)}</span><span class="say">${esc(it.say)}</span><span class="means">“${esc(it.means)}”</span>${ev(it.ev)}</div>
        ${it.strongs ? `<p class="strongs"><span class="strongs-num">Strong's ${esc(it.strongs)}</span>${it.count ? ` Used ${esc(it.count)} in the ${sec.lang === "Hebrew" ? "Hebrew Old Testament" : "Greek New Testament"}.` : ""}</p>` : ""}
        <p>${esc(it.text)}${cite(it.src)}</p></div>`
      : `<div class="note-item"><div class="note-head"><strong>${esc(it.head)}</strong>${it.who ? `<span class="who">${esc(it.who)}</span>` : ev(it.ev)}</div><p>${esc(it.text)}${cite(it.src)}</p></div>`).join("");
  }
  if (n.sections.find((x) => x.id === notesTab)?.lang) body += `<p class="muted small-print">Strong's numbers follow James Strong's Exhaustive Concordance (1890). Counts are approximate and vary a little by edition and by how word forms are grouped.</p>`;
  el.innerHTML = `<div class="notes-head"><h2>Study notes</h2><span class="muted small-print">${esc(refName({ book, chapter }))}</span></div>
    <p class="notes-intro">${esc(n.intro)}</p>
    <div class="notes-tabs" role="tablist">${tabs.map(([id, label]) => `<button role="tab" data-tab="${id}" aria-selected="${id === notesTab}">${esc(label)}</button>`).join("")}</div>
    <div class="notes-panel">${body}</div>${openInHtml(book, chapter)}`;
  wireOpenIn(el);
  fillStrongs(el, book, chapter);
  el.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => { notesTab = b.dataset.tab; renderNotes(book, chapter); }));
  el.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => { const r = keyRef(b.dataset.go); openChapter(r.book, r.chapter); }));
  wireWordSearch(el);
  el.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => { el.dataset.mode = b.dataset.mode; renderNotes(book, chapter); }));
  el.querySelectorAll("[data-cite]").forEach((b) => b.addEventListener("click", () => { notesTab = "sources"; renderNotes(book, chapter); $(`#src-${b.dataset.cite}`)?.classList.add("hi"); }));
  el.querySelectorAll("[data-place]").forEach((g) => {
    const show = () => {
      const p = n.map.places[Number(g.dataset.place)];
      el.querySelectorAll(".map-place").forEach((x) => x.classList.toggle("is-on", x === g));
      $("#mapNote").innerHTML = `<strong>${esc(p.then)}</strong>${p.now !== p.then ? ` <span class="muted">· today: ${esc(p.now)}</span>` : ""}<br>${esc(p.note)}`;
    };
    g.addEventListener("click", show);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } });
  });
}

/* ---------- Word search: how many times a word appears in the Bible ---------- */
let lastSearch = null;
function wordSearchHtml() {
  return `<div class="word-search"><p class="muted small-print">How many times does a word appear in the Bible? Type a word or phrase, like <em>shepherd</em> or <em>fishermen</em>.</p>
    <form class="jump-row" id="wsForm"><input id="wsInput" type="search" placeholder="A word or phrase" autocomplete="off" value="${esc(lastSearch?.q || "")}"><button class="small" type="submit">Count</button></form>
    <div id="wsOut">${lastSearch ? lastSearch.html : ""}</div></div>`;
}
function wireWordSearch(root) {
  const form = root.querySelector("#wsForm");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = root.querySelector("#wsInput").value.trim();
    if (!q) return;
    const out = root.querySelector("#wsOut");
    out.innerHTML = `<p class="muted small-print">Searching…</p>`;
    try {
      const r = await searchBible(q, 20);
      const html = `<p class="ws-total"><strong>${r.total.toLocaleString()}</strong> verse${r.total === 1 ? "" : "s"} in the ${esc(store.get("nasbLabel") || "NASB")} contain “${esc(q)}”.</p>
        ${r.verses.length ? `<div class="ws-list">${r.verses.map((v) => `<button class="ws-verse" data-ch="${esc(v.chapter.slice(0, 2).join("."))}"><strong>${esc(v.ref)}</strong><span>${esc(v.text.slice(0, 160))}${v.text.length > 160 ? "…" : ""}</span></button>`).join("")}</div>${r.total > r.verses.length ? `<p class="muted small-print">Showing the first ${r.verses.length}, in Bible order.</p>` : ""}` : ""}`;
      lastSearch = { q, html };
      out.innerHTML = html;
      out.querySelectorAll("[data-ch]").forEach((b) => b.addEventListener("click", () => { const [bk, c] = b.dataset.ch.split("."); if (BOOK_BY_ID[bk] && c) openChapter(bk, Number(c)); }));
    } catch (err) {
      out.innerHTML = `<p class="muted small-print">${esc(err.message || "The search didn't work.")}${err.kind === "nokey" ? " Add your key in Settings, under Bible text." : ""}</p>`;
    }
  });
}

/* ---------- Home: the four study paths ---------- */
const PATH_ICONS = {
  chronological: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  themes: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20C8 16 12 10 20 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="9" cy="12" rx="3.6" ry="1.5" transform="rotate(-50 9 12)" fill="currentColor"/><ellipse cx="13" cy="12.5" rx="3.6" ry="1.5" transform="rotate(20 13 12.5)" fill="currentColor"/><ellipse cx="14" cy="7.5" rx="3.6" ry="1.5" transform="rotate(-55 14 7.5)" fill="currentColor"/><circle cx="17.5" cy="9" r="1.4" fill="currentColor"/></svg>`,
  audience: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16.5" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 19c.8-3.5 3-5 5.5-5s4.7 1.5 5.5 5M13.5 14.5c.9-.6 1.9-.9 3-.9 2.2 0 4 1.3 4.8 4.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  general: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5C5.7 4.5 9 4.5 12 6.3c3-1.8 6.3-1.8 9-.8v13c-2.7-1-6-1-9 .8-3-1.8-6.3-1.8-9-.8zM12 6.3v13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};
function pathCardsHtml() {
  const active = store.get("activePath");
  const card = (id, featured = false) => {
    const p = PATH_BY_ID[id];
    const done = store.pathReadCount(id), total = pathChapters(id).length;
    const isActive = id === active;
    const label = featured ? (done ? "Keep reading" : "Open my Bible") : isActive ? "Continue" : done ? "Pick up again" : "Start this path";
    return `<div class="path-card${isActive ? " is-active" : ""}${featured ? " my-bible" : ""}">
      <div class="pc-top"><span class="pc-icon">${PATH_ICONS[id]}</span><div><h3>${esc(p.name)}</h3>${featured ? "" : `<span class="pc-kind">Self-guided study</span>`}${isActive ? `<span class="pc-badge">Your current path</span>` : ""}</div></div>
      <p>${esc(p.blurb)}</p>
      <div class="bar"><span style="width:${(done / total) * 100}%"></span></div>
      <span class="pc-meta">${done} of ${total} chapters · ${p.stages.length} sections</span>
      <div class="pc-actions"><button class="small" data-start="${id}"${featured ? ` data-read-now="1"` : ""}>${label}</button>${isActive ? `<button class="quiet-link" data-stages="${id}">See ${featured ? "sections" : "stages"}</button>` : ""}</div>
    </div>`;
  };
  // My Bible on its own, then the three self-guided studies. Every one has the same study
  // section, questions, journal and read-aloud under each chapter.
  const [mine, ...studies] = PATH_ORDER;
  return `<div class="path-cards one">${card(mine, true)}</div>
    <h2 class="home-h">Self-guided studies</h2>
    <p class="home-sub small">Each one walks through the whole Bible a different way. The study notes, Bible helper, journal and read-aloud are with you in all of them.</p>
    <div class="path-cards four">${studies.map((id) => card(id)).join("")}</div>`;
}
function wirePathCards(root) {
  root.querySelectorAll("[data-start]").forEach((b) => b.addEventListener("click", () => {
    const id = b.dataset.start;
    const wasActive = store.get("activePath") === id;
    store.startPath(id);
    updatePathBits(); renderMargin();
    const next = nextUnread(id);
    if ((wasActive || b.dataset.readNow) && next) { showView("read"); openChapter(next.book, next.chapter); }
    else showView("path");
  }));
  root.querySelectorAll("[data-stages]").forEach((b) => b.addEventListener("click", () => showView("path")));
}
function renderHome() {
  const view = $("#homeView");
  const last = store.get("last");
  const active = store.get("activePath");
  const next = active ? nextUnread(active) : null;
  const plan = active && store.get("yearPace") ? todayPlan(active) : null;
  const resume = next
    ? { title: `Continue ${PATH_BY_ID[active].name}`, sub: `${BOOK_BY_ID[next.book].name} ${next.chapter}${plan && plan.left ? ` · Today: ${plan.label}` : ""}`, go: next }
    : { title: "Pick up where you left off", sub: `${BOOK_BY_ID[last.book].name} ${last.chapter}`, go: last };
  view.innerHTML = `${seaScene(store.get("style"))}
    <p class="home-hello">${esc(greeting())}</p>
    <p class="home-sub">How would you like to walk through the Bible today?</p>
    ${seasonPrayerHtml()}
    <button class="resume-card" id="resumeBtn"><span><strong>${esc(resume.title)}</strong><small>${esc(resume.sub)}</small></span><span class="go" aria-hidden="true">›</span></button>
    ${pathCardsHtml()}
    <button class="resume-card shop-link" id="homeShop"><span><strong>Books and music</strong><small>Christian books, counseling, psychology and worship music</small></span><span class="go" aria-hidden="true">›</span></button>
    <div class="jump-card">
      <h2>Go anywhere in the Bible</h2>
      <div class="jump-row"><input id="homeJump" type="search" placeholder="Type a book, like Psalm 23" autocomplete="off" aria-label="Find a book and chapter"><button class="small" id="homeBrowse">Browse books</button></div>
      <div class="jump-results" id="homeJumpResults"><span class="hint">Reading outside your path is fine. Your path keeps its place.</span></div>
    </div>
    ${archiveHtml()}
    <div class="home-end"></div>${cornerSprig()}${cornerSprig(true)}`;
  $("#resumeBtn").addEventListener("click", () => { showView("read"); openChapter(resume.go.book, resume.go.chapter); });
  $("#resumeBtn").insertAdjacentHTML("afterend", dailyHtml());
  wireDaily(view);
  wirePathCards(view);
  wireArchive(view);
  $("#homeBrowse").addEventListener("click", openPicker);
  $("#homeShop").addEventListener("click", () => showView("shop"));
  wireJump($("#homeJump"), $("#homeJumpResults"), (r) => { showView("read"); openChapter(r.book, r.chapter); });
}


/* ---------- Today: verse of the day, psalm and proverb, a question and a prayer ---------- */
const DAILY_PARTS = [["verse", "Verse of the day"], ["readings", "Psalm and Proverb of the day"], ["devotion", "Question and prayer"]];
const dailyOn = (k) => (store.get("daily") || {})[k] !== false;
function dailyHtml() {
  const t = dailyToday();
  const v = t.verse, name = BOOK_BY_ID[v.book].name;
  const date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const parts = [];
  if (dailyOn("verse")) parts.push(`<div class="dy-verse"><span class="dy-label">Verse of the day</span>
      <blockquote id="dailyVerseText" class="dy-text">${esc(v.theme)}</blockquote>
      <button class="dy-ref" data-dgo="${v.book}.${v.chapter}.${v.verse}">${esc(name)} ${v.chapter}:${v.verse} · Read it in context ›</button></div>`);
  if (dailyOn("readings")) parts.push(`<div class="dy-row"><button class="dy-btn" data-dgo="PSA.${t.psalm}"><span aria-hidden="true">🎵</span> Psalm ${t.psalm}</button><button class="dy-btn" data-dgo="PRO.${t.proverb}"><span aria-hidden="true">💡</span> Proverbs ${t.proverb}</button></div>`);
  if (dailyOn("devotion")) parts.push(`<div class="dy-dev"><span class="dy-label">Think about</span><p>${esc(t.devotion[0])}</p>
      <span class="dy-label">Pray</span><p class="dy-prayer">${esc(t.devotion[1])}</p>
      <button class="small" id="dailyWrite">✎ Write in my daily journal</button></div>`);
  return `<section class="daily-card" aria-label="Today">
    <div class="dy-head"><h2>Today</h2><span class="muted small-print">${esc(date)}</span><button class="quiet-link" id="dailyCustom">Choose what shows</button></div>
    ${parts.join("") || `<p class="muted small-print">Everything is turned off. Tap "Choose what shows" to turn things back on.</p>`}
    <div class="dy-custom" id="dailyCustomBox" hidden>${DAILY_PARTS.map(([k, l]) => `<label class="switch-row"><span>${l}</span><input type="checkbox" role="switch" data-dpart="${k}" ${dailyOn(k) ? "checked" : ""}></label>`).join("")}</div>
  </section>`;
}
// The words of one verse, taken from the chapter in the version this person reads.
function verseFromHtml(html, v) {
  const tpl = document.createElement("template");
  tpl.innerHTML = sanitize(html);
  const marks = [...tpl.content.querySelectorAll(".v, .verse-num, .chapter-num, [data-number]")];
  const num = (m) => (m.classList.contains("chapter-num") ? 1 : parseInt(m.dataset.number || m.textContent, 10));
  const start = marks.find((m) => num(m) === v);
  if (!start) return "";
  const stop = marks.find((m) => num(m) > v && (start.compareDocumentPosition(m) & Node.DOCUMENT_POSITION_FOLLOWING));
  const range = document.createRange();
  range.setStartAfter(start);
  if (stop) range.setEndBefore(stop); else range.setEndAfter(tpl.content.lastChild);
  const frag = range.cloneContents();
  frag.querySelectorAll("sup, .footnote, .crossref, h3, h2").forEach((n) => n.remove());
  return frag.textContent.replace(/\s+/g, " ").trim();
}
function wireDaily(root) {
  const t = dailyToday();
  root.querySelectorAll("[data-dgo]").forEach((b) => b.addEventListener("click", () => {
    const [book, ch, v] = b.dataset.dgo.split(".");
    showView("read");
    openChapter(book, Number(ch)).then(() => v && goToVerse(Number(v)));
  }));
  $("#dailyWrite")?.addEventListener("click", () => {
    showView("books");
    document.querySelector('[data-seg="journal"]')?.click();
    setTimeout(() => { const ta = $("#diary-text"); if (ta) { ta.scrollIntoView({ block: "center" }); ta.focus(); } }, 150);
  });
  $("#dailyCustom").addEventListener("click", () => { $("#dailyCustomBox").hidden = !$("#dailyCustomBox").hidden; });
  root.querySelectorAll("[data-dpart]").forEach((c) => c.addEventListener("change", () => {
    store.set("daily", { ...(store.get("daily") || {}), [c.dataset.dpart]: c.checked });
    renderHome(); $("#dailyCustomBox").hidden = false;
  }));
  const box = $("#dailyVerseText");
  if (box) getChapter(store.get("version"), t.verse.book, t.verse.chapter).then((r) => {
    const words = verseFromHtml(r.html, t.verse.verse);
    if (words && box.isConnected) { box.textContent = words; box.classList.add("has-words"); }
  }).catch(() => { /* the theme stays as a gentle stand-in */ });
}

/* ---------- Seasonal prayers for the Easter, Thanksgiving and Christmas looks ---------- */
const SEASON_PRAYERS = {
  easter: { title: "An Easter prayer", list: [
    ["Risen Lord, the stone is rolled away and the grave is empty. Let that hope roll away my fears today. Amen.", "Matthew 28:6"],
    ["Jesus, You carried the cross for me. Help me walk today in the new life You won. Amen.", "Romans 6:4"],
    ["Lord, like the women at the tomb, let me run to tell others that You are alive. Amen.", "Luke 24:9"],
    ["Father, thank You that because He lives, we will live also. Fill our home with that joy. Amen.", "John 14:19"],
    ["Lamb of God, You took away the sin of the world. Wash me clean and make my heart new. Amen.", "John 1:29"],
    ["Lord, when I doubt like Thomas, show me Your hands and help me say, my Lord and my God. Amen.", "John 20:28"],
    ["Good Shepherd, You laid down Your life and took it up again. Keep my family safe in Your hands. Amen.", "John 10:11"],
  ] },
  fall: { title: "A prayer of thanks", list: [
    ["Lord of the harvest, thank You for every good gift on our table and every face around it. Amen.", "James 1:17"],
    ["Father, as the leaves fall, teach me to let go of worry and trust Your faithful care. Amen.", "Matthew 6:26"],
    ["Give thanks to the Lord, for He is good. Help me count my blessings one by one today. Amen.", "Psalm 107:1"],
    ["Lord, You crown the year with Your goodness. Make my heart as full as the fields. Amen.", "Psalm 65:11"],
    ["Thank You, God, for my family, near and far. Bind us together in Your love this season. Amen.", "Colossians 3:14"],
    ["In everything give thanks. Lord, even on hard days, help me find a reason to praise You. Amen.", "1 Thessalonians 5:18"],
    ["Father, the seasons change but You never do. Thank You for Your steady love. Amen.", "Lamentations 3:22-23"],
  ] },
  christmas: { title: "A Christmas prayer", list: [
    ["Jesus, You came as a baby in a manger. Make room in my heart for You this Christmas. Amen.", "Luke 2:7"],
    ["Father, like the wise men, let me follow Your light and bring You my best gifts. Amen.", "Matthew 2:10-11"],
    ["Prince of Peace, quiet the busy days of this season and fill our home with Your peace. Amen.", "Isaiah 9:6"],
    ["Lord, the shepherds heard good news of great joy. Let that joy be heard in our family too. Amen.", "Luke 2:10"],
    ["Immanuel, God with us, thank You that I am never alone. Amen.", "Matthew 1:23"],
    ["Light of the world, shine through me to someone who needs kindness today. Amen.", "John 8:12"],
    ["Father, thank You for the greatest gift of all, Your Son. Help me give love as freely. Amen.", "John 3:16"],
  ] },
};
function seasonPrayerHtml() {
  const s = SEASON_PRAYERS[store.get("style")];
  if (!s) return "";
  const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  const [text, ref] = s.list[day % s.list.length];
  return `<div class="season-prayer"><h2>${esc(s.title)}</h2><p>${esc(text)}</p><small>${esc(ref)}</small></div>`;
}

function setStyle(v) {
  store.set("style", v);
  applyAppearance();
  mascotSay("Hello! I'm here to cheer you on.");
}

/* ---------- Finding a passage by typing ---------- */
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
const ALIASES = { psalm: "PSA", ps: "PSA", song: "SNG", songofsolomon: "SNG", canticles: "SNG", jn: "JHN", mt: "MAT", mk: "MRK", lk: "LUK", rev: "REV", revelations: "REV", phil: "PHP", philemon: "PHM" };
// "rom 8", "1 john 3", "psalm 23", "gen" -> matching books, with the chapter if one was typed.
function findRefs(text) {
  const m = text.trim().match(/^(.*?)(?:\s+(\d+))?(?::\d+.*)?$/);
  if (!m || !m[1].trim()) return [];
  const q = norm(m[1]);
  const ch = m[2] ? Number(m[2]) : null;
  let books = BOOKS.filter((b) => norm(b.name).startsWith(q) || b.id.toLowerCase() === q);
  if (ALIASES[q]) books = [BOOK_BY_ID[ALIASES[q]], ...books.filter((b) => b.id !== ALIASES[q])];
  if (!books.length && q.length >= 3) books = BOOKS.filter((b) => norm(b.name).includes(q));
  return books.slice(0, 6).map((b) => ({ book: b.id, chapter: ch ? Math.min(Math.max(ch, 1), b.chapters) : null, name: b.name }));
}
function wireJump(input, out, go) {
  const hint = out.innerHTML;
  const show = () => {
    const refs = findRefs(input.value);
    if (!input.value.trim()) { out.innerHTML = hint; return; }
    if (!refs.length) { out.innerHTML = `<span class="hint">No book matches "${esc(input.value)}".</span>`; return; }
    out.innerHTML = refs.map((r, i) => `<button data-i="${i}">${esc(r.name)}${r.chapter ? ` ${r.chapter}` : ""}</button>`).join("");
    out.querySelectorAll("[data-i]").forEach((b) => b.addEventListener("click", () => {
      const r = refs[Number(b.dataset.i)];
      if (r.chapter || BOOK_BY_ID[r.book].chapters === 1) go({ book: r.book, chapter: r.chapter || 1 });
      else { openPicker(); pickerChapters(r.book); }
    }));
  };
  input.addEventListener("input", show);
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const r = findRefs(input.value)[0];
    if (r) { e.preventDefault(); input.blur(); go({ book: r.book, chapter: r.chapter || 1 }); }
  });
}
function openPicker() {
  $("#pickerSearch").value = "";
  pickerBooks();
  if (!picker.open) picker.showModal();
}
$("#pickerSearch").addEventListener("input", () => {
  const v = $("#pickerSearch").value.trim();
  if (!v) { pickerBooks(); return; }
  const refs = findRefs(v);
  $("#pickerTitle").textContent = "Find";
  $("#pickerBack").hidden = false;
  $("#pickerBody").innerHTML = refs.length
    ? `<div class="picker-books">${refs.map((r, i) => `<button data-i="${i}">${esc(r.name)}${r.chapter ? ` ${r.chapter}` : ""}<small>${r.chapter ? "Open" : `${BOOK_BY_ID[r.book].chapters} chapters`}</small></button>`).join("")}</div>`
    : `<p class="muted">No book matches that yet.</p>`;
  $("#pickerBody").querySelectorAll("[data-i]").forEach((b) => b.addEventListener("click", () => {
    const r = refs[Number(b.dataset.i)];
    if (r.chapter || BOOK_BY_ID[r.book].chapters === 1) { picker.close(); showView("read"); openChapter(r.book, r.chapter || 1); }
    else pickerChapters(r.book);
  }));
});
$("#pickerSearch").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const r = findRefs($("#pickerSearch").value)[0];
  if (!r) return;
  e.preventDefault();
  if (r.chapter || BOOK_BY_ID[r.book].chapters === 1) { picker.close(); showView("read"); openChapter(r.book, r.chapter || 1); }
  else pickerChapters(r.book);
});
$("#topPrev").addEventListener("click", () => { const { book, chapter } = store.get("last"); const p = neighbors(book, chapter).prev; if (p) openChapter(p.book, p.chapter); });
$("#topNext").addEventListener("click", () => { const { book, chapter } = store.get("last"); const n = neighbors(book, chapter).next; if (n) openChapter(n.book, n.chapter); });

/* ---------- Listen bar: read aloud, volume, speed, drive mode ---------- */
function syncPlayBtn(playing) {
  const btn = $("#playBtn");
  btn.setAttribute("aria-pressed", String(playing));
  btn.querySelector("span").textContent = playing ? "Pause" : "Read aloud";
  $("#playIcon").setAttribute("d", playing ? "M7 5h4v14H7zM13 5h4v14h-4z" : "M8 5v14l11-7z");
}
function setRate(r) {
  store.set("voiceRate", r);
  reader.rate = r;
  $("#voiceRate").value = r;
  const opts = [...$("#quickRate").options].map((o) => Number(o.value));
  $("#quickRate").value = String(opts.reduce((a, b) => (Math.abs(b - r) < Math.abs(a - r) ? b : a)));
}
// Drive mode is one setting with three switches (reading page, Home, Settings).
function setDrive(on) {
  store.setMode("drive", on);
  for (const sel of ["#modeDrive", "#driveQuick", "#homeDrive"]) { const el = $(sel); if (el) el.checked = on; }
  // "Keep reading": read aloud carries on into the next chapter. The old big-button Drive screen is retired.
  if (!$("#drive").hidden) closeDrive();
}
$("#playBtn").hidden = !canSpeak;
$("#playBtn").addEventListener("click", () => reader.toggle());
$("#quickRate").addEventListener("change", (e) => setRate(Number(e.target.value)));
$("#driveQuick").addEventListener("change", (e) => setDrive(e.target.checked));
{
  // iPhone and iPad ignore the volume a web page asks for, so point to the side buttons instead.
  const apple = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  $("#volumeCtl").hidden = apple || !canSpeak;
  $("#volumeNote").hidden = !apple || !canSpeak;
  $("#volume").value = store.get("voiceVolume") ?? 1;
  $("#volume").addEventListener("input", (e) => { reader.volume = Number(e.target.value); store.set("voiceVolume", reader.volume); });
}



/* ---------- Family sign-in ---------- */
// When sign-in is on (js/config.js has the Supabase details), nobody gets past this
// screen until they sign in. A sign-in stays on the device until they sign out.
let signedInUser = null;
// Account backup of reading, notes and journal (never the Bible keys).
let lastBackup = "";
async function backupNow() {
  if (!signedInUser) return;
  try { if (await saveBackup(store.snapshot())) { lastBackup = new Date().toISOString(); showBackupStatus(); } } catch { /* offline: next change tries again */ }
}
function showBackupStatus() {
  const el = $("#backupStatus");
  if (el) el.textContent = lastBackup ? `Last backup ${new Date(lastBackup).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}.` : "";
}
// "Keep me signed in": when off, the app asks for the password again each time it's opened fresh.
const KEEP_KEY = "bible-study:sign-out-on-close";
function keepSignedIn() { try { return localStorage.getItem(KEEP_KEY) !== "1"; } catch { return true; } }
function setKeepSignedIn(on) {
  try { if (on) localStorage.removeItem(KEEP_KEY); else localStorage.setItem(KEEP_KEY, "1"); sessionStorage.setItem("bible-study:open", "1"); } catch { /* ignore */ }
}
const STARTER_KEY = "bible-study:pw-starter", RESET_KEY = "bible-study:pw-reset";
const STARTER_PASSWORD = String((window.BIBLE_CONFIG || {}).starterPassword || "biblestudy").toLowerCase(); // replaced after the first sign-in
const flag = (k, on) => { try { if (on === undefined) return localStorage.getItem(k) === "1"; if (on) localStorage.setItem(k, "1"); else localStorage.removeItem(k); } catch { return false; } };
// "Show" buttons beside password boxes, for anyone who finds the dots hard to check.
document.addEventListener("click", (e) => {
  const b = e.target.closest?.(".pw-show");
  if (!b) return;
  const input = document.getElementById(b.dataset.show), on = input.type === "password";
  input.type = on ? "text" : "password"; b.textContent = on ? "Hide" : "Show"; b.setAttribute("aria-pressed", String(on));
});
function showGate(note = "") {
  return new Promise((resolve) => {
    const gate = $("#gate"), form = $("#gateForm"), codeForm = $("#gateCodeForm"), err = $("#gateErr"), msg = $("#gateMsg");
    $("#gateArt").innerHTML = seaScene(store.get("style"));
    if (note) err.textContent = note;
    gate.hidden = false;
    const done = (user) => {
      setKeepSignedIn($("#gateKeep").checked);
      gate.hidden = true;
      $("#gatePassword").value = $("#gateCode").value = "";
      resolve(user);
    };
    const busy = (btn, on, label) => { btn.disabled = on; btn.textContent = label; };
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = $("#gateEmail").value.trim().toLowerCase(), password = $("#gatePassword").value;
      if (!email || !password) return;
      err.textContent = ""; const btn = form.querySelector("button[type=submit]"); busy(btn, true, "Signing in…");
      try {
        const user = await signIn(email, password);
        // Signed in with the starter password: they'll be asked to choose their own.
        flag(STARTER_KEY, password.trim().toLowerCase() === STARTER_PASSWORD);
        done(user);
      } catch (x) { err.textContent = x.message; }
      busy(btn, false, "Sign in");
    };
    $("#gateForgot").onclick = async () => {
      const email = $("#gateEmail").value.trim().toLowerCase();
      if (!email || !$("#gateEmail").checkValidity()) { err.textContent = "Type your email first, then tap Forgot your password."; $("#gateEmail").focus(); return; }
      err.textContent = ""; const btn = $("#gateForgot"); busy(btn, true, "Sending…");
      try {
        await emailSignInLink(email);
        flag(RESET_KEY, true);
        msg.innerHTML = `We emailed <strong>${esc(email)}</strong>. Type the 6-digit code from the email below, or tap the link in the email. Either one signs you in, then you choose a new password. (It can take a minute to arrive. Check the junk folder too.)`;
        form.hidden = true; codeForm.hidden = false; $("#gateCode").focus();
      } catch (x) { err.textContent = x.message; }
      busy(btn, false, "Forgot your password?");
    };
    codeForm.onsubmit = async (e) => {
      e.preventDefault();
      const email = $("#gateEmail").value.trim().toLowerCase(), code = $("#gateCode").value.replace(/\D/g, "");
      if (code.length !== 6) { err.textContent = "The code is 6 numbers. Please check the email and type all six."; return; }
      err.textContent = ""; const btn = codeForm.querySelector("button[type=submit]"); busy(btn, true, "Checking…");
      try { const user = await verifyEmailCode(email, code); flag(RESET_KEY, true); done(user); }
      catch (x) { err.textContent = x.message; }
      busy(btn, false, "Sign in with the code");
    };
    $("#gateBack").onclick = () => {
      codeForm.hidden = true; form.hidden = false; err.textContent = "";
      msg.textContent = "Sign in with the email your family added. The first time, use the starter password you were given. You'll make your own right after.";
    };
  });
}

// Choosing a new password after "Forgot your password?", or replacing the starter password
// when first-time setup is already done on this device.
const pwSheet = document.createElement("dialog");
pwSheet.className = "welcome-back pw-sheet"; pwSheet.setAttribute("aria-label", "Choose a new password");
document.body.append(pwSheet);
function askNewPassword(reason) {
  pwSheet.innerHTML = `<div class="wb-icon" aria-hidden="true">🔑</div>
    <h2>Choose a new password</h2>
    <p class="muted">${reason === "reset" ? "You're signed in from the email. Now choose a new password you'll remember." : "You signed in with the starter password. Please choose your own."}</p>
    <label class="field">New password<span class="pw-wrap"><input id="pwNew" type="password" autocomplete="new-password" placeholder="At least 6 letters or numbers"><button type="button" class="pw-show" data-show="pwNew" aria-label="Show password" aria-pressed="false">Show</button></span></label>
    <label class="field">Type it again<input id="pwNew2" type="password" autocomplete="new-password"></label>
    <button type="button" class="big-btn" id="pwSave">Save my password</button>
    <p class="setup-key-status" id="pwSheetMsg" role="status"></p>
    <button type="button" class="wb-new" id="pwLater">Not now</button>`;
  pwSheet.showModal();
  $("#pwLater").onclick = () => pwSheet.close();
  $("#pwSave").onclick = async () => {
    const out = $("#pwSheetMsg"), problem = passwordProblem($("#pwNew").value, $("#pwNew2").value);
    if (problem) { out.textContent = problem; return; }
    $("#pwSave").disabled = true; out.textContent = "Saving…";
    try {
      await changePassword($("#pwNew").value);
      flag(STARTER_KEY, false); flag(RESET_KEY, false); setupSet({ password: true });
      out.textContent = "Saved ✓ Use this password next time you sign in.";
      setTimeout(() => pwSheet.close(), 1400);
    } catch (x) { out.textContent = x.message; $("#pwSave").disabled = false; }
  };
}
// The same rules everywhere a password is chosen.
function passwordProblem(a, b) {
  if (a.length < 6) return "Please use at least 6 letters or numbers.";
  if (b !== undefined && a !== b) return "Those two don't match. Please type them again.";
  if (a.trim().toLowerCase() === STARTER_PASSWORD) return "Please choose something different from the starter password.";
  return "";
}
function renderAccount() {
  const el = $("#accountBody");
  if (!el) return;
  if (!authEnabled) return;
  el.innerHTML = signedInUser
    ? `<p class="account-line">Signed in as <strong>${esc(signedInUser.email || "")}</strong></p>
       <label class="switch-row"><span>Stay signed in on this device<small>Off: the app asks for your password each time you open it.</small></span><input type="checkbox" role="switch" id="keepSignedIn" ${keepSignedIn() ? "checked" : ""}></label>
       <p class="muted small-print">Your reading, notes and journal are saved on this device and backed up to your account, so an update or a new phone never loses your place. <span id="backupStatus"></span></p>
       <button class="small" id="mergeBackup">Bring in progress from my other devices</button><p class="small-print" id="mergeMsg"></p>
       <details class="share-key"><summary>Change my password</summary>
         <label class="field">New password<span class="pw-wrap"><input id="newPassword" type="password" autocomplete="new-password" minlength="6"><button type="button" class="pw-show" data-show="newPassword" aria-label="Show password" aria-pressed="false">Show</button></span></label>
         <label class="field">Type it again<input id="newPassword2" type="password" autocomplete="new-password"></label>
         <button class="small" id="savePassword">Save new password</button><p class="small-print" id="pwMsg"></p></details>
       <button class="small" id="signOutBtn">Sign out</button>`
    : `<p class="muted small-print">Not signed in.</p>`;
  $("#keepSignedIn")?.addEventListener("change", (e) => setKeepSignedIn(e.target.checked));
  showBackupStatus();
  $("#mergeBackup")?.addEventListener("click", async () => {
    const out = $("#mergeMsg"); out.textContent = "Checking…";
    const b = await loadBackup();
    if (!b?.data) { out.textContent = "No other saved progress yet."; return; }
    store.mergeFrom(b.data); await backupNow();
    out.textContent = "Done ✓ Progress from your other devices is here too. Nothing on this device was removed.";
    updatePathBits(); if (!$("#view-home").hidden) renderHome();
  });
  $("#savePassword")?.addEventListener("click", async () => {
    const v = $("#newPassword").value, out = $("#pwMsg"), problem = passwordProblem(v, $("#newPassword2").value);
    if (problem) { out.textContent = problem; return; }
    $("#savePassword").disabled = true; out.textContent = "Saving…";
    try { await changePassword(v); flag(STARTER_KEY, false); out.textContent = "Saved ✓ Use this password next time you sign in."; $("#newPassword").value = $("#newPassword2").value = ""; }
    catch (x) { out.textContent = x.message; }
    $("#savePassword").disabled = false;
  });
  // Grown-up settings (Bible keys, invite links) live in a closed "Family organizer tools" box,
  // so everyone else just signs in and reads.
  const org = $("#organizerBody");
  if (org && !org.dataset.ready) {
    org.dataset.ready = "1";
    org.innerHTML = `<div class="card inner" id="familyKeyCard"><h2>Share the Bible key with the family</h2>
      <p class="muted small-print">Saves this device's API.Bible key to your family account. Anyone you've added gets it automatically when they sign in, without seeing it. Everyone's reading counts toward your 5,000 a month.</p>
      <button class="small" id="shareFamilyKey">Share this key with the family</button><p class="small-print" id="familyKeyMsg"></p></div>`;
    org.append($("#bibleTextCard"));
    $("#organizerBox").hidden = false;
  }
  $("#shareFamilyKey")?.addEventListener("click", async () => {
    const out = $("#familyKeyMsg");
    if (!store.get("apiBibleKey")) { out.textContent = "Add your API.Bible key under Bible text first."; return; }
    try { await setFamilyKey({ k: store.get("apiBibleKey"), b: store.get("nasbBibleId") || "", l: store.get("nasbLabel") || "", x: store.get("extraBibles") || [], e: store.get("esvKey") || "" }); store.set("familySyncedAt", new Date().toISOString()); out.textContent = "Shared ✓ Family members will get it, and these versions, the next time they open the app."; }
    catch (x) { out.textContent = x.message; }
  });
  $("#signOutBtn")?.addEventListener("click", async () => {
    if (!confirm("Sign out of Bible Study on this device?")) return;
    $("#signOutBtn").disabled = true; $("#signOutBtn").textContent = "Saving and signing out…";
    try { await backupNow(); } catch { /* still sign out */ }
    await signOut();
    location.reload();
  });
}


/* ---------- Account button in the top corner: who's signed in, sign out ---------- */
const acctSheet = document.createElement("dialog");
acctSheet.className = "welcome-back acct-sheet"; acctSheet.setAttribute("aria-label", "My account");
document.body.append(acctSheet);
function setupAccountButton() {
  const btn = $("#acctBtn");
  if (!authEnabled || !signedInUser) { btn.hidden = true; return; }
  const who = store.get("name") || signedInUser.email || "";
  $("#acctInitial").textContent = (who.trim()[0] || "👤").toUpperCase();
  btn.hidden = false;
  btn.onclick = () => {
    acctSheet.innerHTML = `<div class="wb-icon" aria-hidden="true">👤</div>
      <h2>${esc(store.get("name") || "My account")}</h2>
      <p class="muted">Signed in as ${esc(signedInUser.email || "")}</p>
      ${store.get("journalLock") && !journalLocked() ? `<button type="button" class="wb-new" id="acctLock">🔒 Lock my journal</button>` : ""}
      <button type="button" class="big-btn" id="acctOut">Sign out</button>
      <button type="button" class="wb-new" id="acctStay">Stay signed in</button>
      <p class="muted small-print">Your reading, notes and journal are saved to your account and come back when you sign in again.</p>`;
    acctSheet.showModal();
    $("#acctStay").addEventListener("click", () => acctSheet.close());
    $("#acctLock")?.addEventListener("click", () => { journalUnlocked = false; renderJournal(); acctSheet.close(); });
    $("#acctOut").addEventListener("click", async () => {
      $("#acctOut").disabled = true; $("#acctOut").textContent = "Saving and signing out…";
      try { await backupNow(); } catch { /* still sign out */ }
      await signOut(); location.reload();
    });
  };
}

/* ---------- Invite: share this device's Bible key with someone at home ---------- */
// The invite carries the key in the part of the link after "#", which browsers never send
// to the website, so the key goes only from one phone to the other.
const b64url = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64url = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)));
function makeInviteCode({ to = "", look = "" } = {}) {
  const d = { v: 1, k: store.get("apiBibleKey"), b: store.get("nasbBibleId") || "", l: store.get("nasbLabel") || "", e: store.get("esvKey") || "", x: store.get("extraBibles") || [], from: store.get("name").trim(), to, look };
  return "BSI1" + b64url(JSON.stringify(d));
}
function readInviteCode(code) {
  const m = String(code || "").trim().match(/BSI1([\w-]{20,})/);
  if (!m) return null;
  try { const d = JSON.parse(unb64url(m[1])); return d && d.k ? d : null; } catch { return null; }
}
function applyInvite(d) {
  store.set("apiBibleKey", d.k);
  if (d.b) { store.set("nasbBibleId", d.b); store.set("nasbLabel", d.l || "NASB"); }
  if (d.e && !store.get("esvKey")) store.set("esvKey", d.e);
  if (Array.isArray(d.x) && d.x.length && !(store.get("extraBibles") || []).length) store.set("extraBibles", d.x.filter((b) => b && b.id && b.label).slice(0, MAX_EXTRA_BIBLES));
  if (d.to && !store.get("name").trim()) store.set("name", d.to);
  if (d.look && !(store.get("setup") || {}).look) {
    store.set("style", d.look);
    if (isStill(d.look)) store.set("graphics", "simple");
  }
  const ki = $("#apiBibleKey"); if (ki) ki.value = d.k;
}
let joinedFrom = null;
{ // Opened from an invite link?
  const m = location.hash.match(/#join=(BSI1[\w-]+)/);
  if (m) {
    history.replaceState(null, "", location.pathname + location.search);
    const d = readInviteCode(m[1]);
    if (d && (!store.get("apiBibleKey") || store.get("apiBibleKey") === d.k || confirm("This invite has a different Bible key than the one on this device. Use the key from the invite?"))) {
      applyInvite(d);
      joinedFrom = { ...d, code: m[1] };
    }
  }
}
function inviteWelcome() {
  if (!joinedFrom) return;
  const standaloneNow = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const el = Object.assign(document.createElement("div"), { className: "invite-toast", role: "status" });
  el.innerHTML = `<p><strong>You're all set${joinedFrom.to ? `, ${esc(joinedFrom.to)}` : ""}.</strong> ${joinedFrom.from ? esc(joinedFrom.from) + " shared" : "This invite shared"} a Bible key with you, so the Bible text is ready to read.</p>
    ${standaloneNow ? "" : `<p class="small-print">To keep it as an app: tap the Share button, then <strong>Add to Home Screen</strong>. If the Home Screen app asks for a key, paste this invite code into the key box: <button class="small" id="copyInvite">Copy invite code</button></p>`}
    <button class="small" id="inviteOk">OK</button>`;
  ($("#setup").open ? $("#setup") : document.body).append(el);
  el.querySelector("#inviteOk").addEventListener("click", () => el.remove());
  el.querySelector("#copyInvite")?.addEventListener("click", async (e) => { try { await navigator.clipboard.writeText(joinedFrom.code); e.target.textContent = "Copied ✓"; } catch { e.target.textContent = joinedFrom.code; } });
}
function wireShareKey() {
  $("#shareKeyBtn").addEventListener("click", async () => {
    const out = $("#shareKeyOut");
    if (!store.get("apiBibleKey")) { out.innerHTML = `<p class="muted small-print">Add your API.Bible key above first.</p>`; return; }
    const to = $("#shareName").value.trim();
    const code = makeInviteCode({ to, look: $("#shareLook").value });
    const url = `${location.origin}${location.pathname}#join=${code}`;
    const text = `${to ? `${to}, here` : "Here"} is our Bible study app. Open this link on your iPhone or iPad. It sets up the Bible text for you.`;
    out.innerHTML = `<p class="small-print">Invite link ready. ${navigator.share ? "Pick Messages or Mail to send it." : "Copy it and send it by text or email."}</p>
      <div class="row"><button class="small" id="shareSend">${navigator.share ? "Send invite" : "Copy link"}</button><button class="small quiet-link" id="shareCopy">Copy link</button></div>`;
    const copy = async (btn) => { try { await navigator.clipboard.writeText(url); btn.textContent = "Copied ✓"; } catch { out.insertAdjacentHTML("beforeend", `<p class="small-print share-url">${esc(url)}</p>`); } };
    $("#shareCopy").addEventListener("click", (e) => copy(e.target));
    $("#shareSend").addEventListener("click", async (e) => {
      if (navigator.share) { try { await navigator.share({ title: "Bible Study", text, url }); } catch { /* cancelled */ } } else copy(e.target);
    });
  });
}

/* ---------- Start ---------- */
applyAppearance();
if (authEnabled) {
  signedInUser = await currentUser();
  // Chose not to stay signed in, and this is a fresh open (not just a reload)? Ask again.
  let fresh = false; try { fresh = !sessionStorage.getItem("bible-study:open"); } catch { /* ignore */ }
  if (signedInUser && !keepSignedIn() && fresh && !linkArrival) { await signOut(); signedInUser = null; }
  if (linkArrival === "signin" && signedInUser) flag(RESET_KEY, true); // came in from the "forgot password" email
  if (!signedInUser) {
    signedInUser = await showGate(linkArrival === "expired"
      ? "That email link has expired or was already used. Type your email and tap Forgot your password? for a new one."
      : "");
  }
  try { sessionStorage.setItem("bible-study:open", "1"); } catch { /* ignore */ }
  document.documentElement.classList.remove("auth-wait");
  // Signed out while the app is open (on this device, or the sign-in was ended): sign in again.
  onSignedOut(() => { if ($("#gate").hidden) location.reload(); });
  // A shared tablet: keep each person's reading and journal apart.
  store.switchPerson(signedInUser.id);
  // Already has their own password (set on another device, or signed in with it)? Don't ask again.
  if (signedInUser.user_metadata?.own_password && !flag(RESET_KEY)) { flag(STARTER_KEY, false); setupSet({ password: true }); }
  if (flag(STARTER_KEY) || flag(RESET_KEY)) setupSet({ password: false });
  else if (!(store.get("setup") || {}).done) setupSet({ password: true });
  // First-time setup only asks for a new password when they're still on the starter one.
  if ((store.get("setup") || {}).password) SETUP_STEPS = SETUP_STEPS.filter((st) => st.id !== "password");
  // No key on this device yet? Use the family's shared key.
  // Also picks up extra Bible versions the organizer shared.
  const fk = await getFamilyKey();
  if (fk && !store.get("apiBibleKey")) { applyInvite({ ...fk, look: "" }); store.set("familySyncedAt", fk.u || ""); }
  else if (fk) {
    // The organizer shared new versions since this device last looked? Bring them in, so
    // the whole family's version switch stays the same without anyone touching Settings.
    const newer = fk.u && fk.u > (store.get("familySyncedAt") || "") && fk.k === store.get("apiBibleKey");
    if (fk.x?.length && (newer || !(store.get("extraBibles") || []).length)) store.set("extraBibles", fk.x.slice(0, MAX_EXTRA_BIBLES));
    if (newer && fk.b) { store.set("nasbBibleId", fk.b); store.set("nasbLabel", fk.l || ""); }
    if (fk.e && (newer || !store.get("esvKey"))) store.set("esvKey", fk.e);
    if (newer) store.set("familySyncedAt", fk.u);
  }
  // Signed-in family members don't set up keys or accounts: the first-time steps are just
  // name, look and study path.
  SETUP_STEPS = SETUP_STEPS.filter((st) => st.id !== "key");
  // New device, or the browser cleared this one? Bring back this person's own saved progress.
  if (store.isEmpty()) {
    const b = await loadBackup();
    // Only a backup with real progress, or one made after first-time setup when this device
    // hasn't done it, replaces what's here. So an early, nearly empty backup can't undo
    // choices just made on this device, and a new device skips setup it doesn't need.
    const finished = (d) => Boolean(d?.setup?.done || d?.setup?.skipped);
    if (b?.data && (!store.isEmpty(b.data) || (finished(b.data) && !finished({ setup: store.get("setup") })))) { store.restore(b.data); applyAppearance(); }
  }
  // From here on, back up a few seconds after each change, and when the app is put away.
  let backupTimer = null;
  onSave(() => { clearTimeout(backupTimer); backupTimer = setTimeout(backupNow, 8000); });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && backupTimer) { clearTimeout(backupTimer); backupNow(); } });
  backupNow();
}
renderAccount();
syncVersionSwitch();
initSettings();
setRate(store.get("voiceRate"));
$("#driveQuick").checked = driveOn();
const start = store.get("last");
openChapter(start.book, start.chapter);

updateMascot();
setMargin(store.get("margin") && window.innerWidth >= 1000);
showView("home"); // the app always opens on Home, where the study paths are
{ const su = store.get("setup") || {}; if (!su.done && !su.skipped) openSetup(0); else maybeStartTour(); } // first time on this device
// Came in from a "Forgot your password?" email, or still on the starter password: ask for a
// new one. (During first-time setup the password step does this instead.)
if (signedInUser && (flag(RESET_KEY) || flag(STARTER_KEY))) {
  const i = SETUP_STEPS.findIndex((st) => st.id === "password");
  if ($("#setup").open && i >= 0) { if (flag(RESET_KEY)) { setupAt = i; renderSetup(); } } // the setup steps include it
  else askNewPassword(flag(RESET_KEY) ? "reset" : "starter");
}
setTimeout(cameBack, 900); // opened again after a while: offer to go back to where they were
wireShareKey();
setupAccountButton();
inviteWelcome();


/* ---------- Welcome tour: big, simple steps that point at each feature ---------- */
// Shown once, the first time someone opens the app (after setup). "Skip" ends it any time,
// and it can always be taken again from Settings or the ⋮ menu.
const qmTour = () => { const d = $("#quickMenu"); renderQuickMenu(); if (!d.open) d.show(); d.classList.add("tour-shown"); };
const TOUR = [
  { icon: "👋", title: "Welcome!", text: "This tour shows you around, one thing at a time. The part we're talking about is circled. Tap Next to go on, or Skip tour any time. You can take it again later: tap ❓ at the top or open the ⋮ menu." },
  { view: "home", at: ".tabbar", icon: "🧭", title: "Getting around", text: "These big buttons at the bottom take you anywhere: Home, Read, My study, My path and Settings. Tap Home to get back to the start." },
  { view: "home", at: "#helpBtn", icon: "❓", title: "Help is always here", text: "Not sure what something does? Tap ❓ at the top of any screen for help with that screen, or to take this tour again." },
  { view: "home", at: "#acctBtn", icon: "👤", title: "Signing in and out", text: "Your first initial is in the top corner. Tap it to see who's signed in or to sign out. You stay signed in on this device until you sign out, so you won't need your password every time." },
  { view: "home", at: "#quickMenu", before: qmTour, icon: "⋮", title: "The ⋮ menu", text: "Tap ⋮ at the top right for this menu. Jump to any page, take this tour again, and turn features on or off, like the read-aloud bar, trivia or the study section." },
  { view: "home", at: ".daily-card", icon: "☀️", title: "Today", text: "Each day: a verse, a psalm and a proverb, a question to think about and a prayer. The whole family gets the same ones, so you can talk about them together. Tap \"Choose what shows\" to pick what you see." },
  { view: "home", at: ".path-card.my-bible", icon: "📖", title: "My Bible", text: "Read the whole Bible in order, Genesis to Revelation. The bar shows how far you've come." },
  { view: "home", at: ".path-cards.four", icon: "🛤️", title: "Self-guided studies", text: "Three more ways through the whole Bible: in the order things happened, by theme, or by who it was written to. Each shows your progress and keeps its own place, so you can switch any time." },
  { view: "home", at: ".jump-card", icon: "🔎", title: "Go anywhere", text: "Jump to any book or chapter, even in the middle of a study. Your study keeps its place for when you come back." },
  { view: "read", at: "#refButton", icon: "📚", title: "Pick a book", text: "Tap the book name at the top. Big squares show every book, Old Testament then New. Tap a book to see what it's about, then a chapter, then a verse. No spelling needed, but you can type if you like." },
  { view: "read", at: ".version-switch", icon: "🔤", title: "Bible versions", text: "Switch versions at the top any time, even in the middle of a study. You stay on the same chapter. (Versions appear there once the family's Bible is set up.)" },
  { view: "read", at: "#listenBar", icon: "🔊", title: "Read it to me", text: "Tap Read aloud and the app reads the chapter to you, highlighting each part as it goes. Turn on Keep reading to go on into the next chapter." },
  { view: "read", at: "#bookIntro", icon: "📜", title: "Setting the stage", text: "Like a study Bible: who wrote the book, when, to whom, the setting, and where scholars' views differ. It opens by itself on chapter 1." },
  { view: "read", at: "#reader", icon: "👆", title: "Tap a word", text: "Tap any word in the Bible text to see what it means in plain words, and the Hebrew or Greek behind it. Nothing pops up unless you tap." },
  { view: "read", at: "#studyNotes", icon: "🔎", title: "The study section", text: "Below every chapter: Strong's concordance with every Hebrew or Greek word, word search, history, maps then and now, science, scholars' views from different churches, cross-references, and the sources for all of it. Scripture comes first." },
  { view: "read", at: "#partnerBox", icon: TALK_ICON, title: "Ask questions", text: "Open Chat with my study partner and ask anything about the chapter. The Bible helper answers right here. Tap 🎤 to talk instead of type." },
  { view: "read", at: "#journalBox", icon: "✎", title: "My journal", text: "Write your thoughts, prayers and thanks for each chapter. Tap 🎤 to speak instead of typing. It saves by itself." },
  { view: "books", at: "#view-books .segments", icon: "📊", title: "My study", text: "Your progress, the chapters you've visited, your favorites, your daily journal and all your journal entries in one place." },
  { view: "settings", at: "#accountCard", icon: "🔑", title: "Your account", text: "Change your password here, and choose whether to stay signed in on this device." },
  { view: "settings", at: "#lockCard", icon: "🔒", title: "Lock your journal (if you want)", text: "Your journal is open unless you choose to lock it. To lock it, type a passcode here and save. Then tap 🔒 Lock my journal whenever you like. To leave it open, do nothing." },
  { view: "settings", at: "#textSize", wrap: ".card", icon: "🔠", title: "Easier to see and use", text: "Make the words bigger, make buttons bigger, turn on high contrast, turn tap-a-word on or off, and choose simple or deeper answers from the Bible helper. You can also pinch to zoom." },
  { view: "settings", at: "#lookCard", icon: "🎨", title: "Change the look", text: "Classic, a spring garden, Christmas, Easter, Thanksgiving, pictures for kids, and more." },
  { view: "shop", at: "#view-shop h1", wrap: "section", icon: "🎵", title: "Books and music", text: "Christian books, kids' books and worship music to buy on Amazon." },
  { view: "home", at: "#helpBtn", icon: "🎉", title: "You're all set!", text: "Take this tour again any time: tap ❓ at the top or open the ⋮ menu. Enjoy your study!" },
];
let tourAt = -1;
const tourEl = document.createElement("div");
tourEl.className = "tour"; tourEl.hidden = true;
tourEl.innerHTML = `<div class="tour-ring" aria-hidden="true"></div>
  <div class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tourTitle">
    <div class="tour-top"><span class="tour-icon" id="tourIcon" aria-hidden="true"></span><span class="tour-count" id="tourCount"></span><button type="button" class="tour-skip" id="tourSkip">Skip tour</button></div>
    <h2 id="tourTitle"></h2>
    <p id="tourText"></p>
    <div class="tour-dots" id="tourDots" aria-hidden="true"></div>
    <div class="tour-btns"><button type="button" class="tour-back" id="tourBack">‹ Back</button><button type="button" class="tour-next" id="tourNext">Next ›</button></div>
  </div>`;
document.body.append(tourEl);
function tourTarget(step) {
  if (!step.at) return null;
  let el = document.querySelector(step.at);
  if (el && step.wrap) el = el.closest(step.wrap) || el;
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return r.width && r.height && getComputedStyle(el).visibility !== "hidden" ? el : null;
}
function placeTour() {
  if (tourAt < 0) return;
  const el = tourTarget(TOUR[tourAt]);
  const ring = tourEl.querySelector(".tour-ring"), card = tourEl.querySelector(".tour-card");
  tourEl.classList.toggle("no-spot", !el);
  if (!el) { card.style.top = ""; card.style.bottom = ""; return; }
  const r = el.getBoundingClientRect(), pad = 6, vh = window.innerHeight;
  const top = Math.max(r.top - pad, 4), bottom = Math.min(r.bottom + pad, vh - 4);
  Object.assign(ring.style, { top: `${top}px`, left: `${Math.max(r.left - pad, 4)}px`, width: `${Math.min(r.width + pad * 2, window.innerWidth - 8)}px`, height: `${Math.max(bottom - top, 24)}px` });
  // Put the card on whichever side of the highlighted spot has more room.
  if (top > vh * 0.45) { card.style.top = "max(12px, env(safe-area-inset-top))"; card.style.bottom = "auto"; }
  else { card.style.top = "auto"; card.style.bottom = "calc(12px + env(safe-area-inset-bottom))"; }
}
function showTourStep(i) {
  tourAt = Math.max(0, Math.min(i, TOUR.length - 1));
  const step = TOUR[tourAt];
  if ($("#quickMenu").classList.contains("tour-shown") && !step.before) { $("#quickMenu").classList.remove("tour-shown"); $("#quickMenu").close(); }
  if (step.view && document.body.dataset.view !== step.view) showView(step.view);
  step.before?.();
  $("#tourIcon").innerHTML = step.icon;
  $("#tourTitle").textContent = step.title;
  $("#tourText").textContent = step.text;
  $("#tourCount").textContent = `${tourAt + 1} of ${TOUR.length}`;
  $("#tourDots").innerHTML = TOUR.map((_, n) => `<span class="${n === tourAt ? "on" : ""}"></span>`).join("");
  $("#tourBack").hidden = tourAt === 0;
  $("#tourNext").textContent = tourAt === TOUR.length - 1 ? "Done" : tourAt === 0 ? "Start the tour ›" : "Next ›";
  $("#tourSkip").hidden = tourAt === TOUR.length - 1;
  const el = tourTarget(step);
  if (el) {
    const r = el.getBoundingClientRect();
    // Tall things: bring their top into view under the top bar, with the tour card below.
    if (r.height > window.innerHeight * 0.4) { if (r.top < 70 || r.top > window.innerHeight * 0.3) { el.scrollIntoView({ block: "start" }); window.scrollBy(0, -80); } }
    else if (r.top < 70 || r.bottom > window.innerHeight - 120) el.scrollIntoView({ block: "center" });
  }
  placeTour();
  requestAnimationFrame(placeTour); setTimeout(placeTour, 350);
  $("#tourNext").focus({ preventScroll: true });
}
function startTour() {
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  tourEl.hidden = false;
  document.documentElement.classList.add("touring");
  showTourStep(0);
}
function endTour() {
  tourAt = -1;
  if ($("#quickMenu").classList.contains("tour-shown")) { $("#quickMenu").classList.remove("tour-shown"); $("#quickMenu").close(); }
  tourEl.hidden = true;
  document.documentElement.classList.remove("touring");
  store.set("tourSeen", true);
  showView("home");
}
function maybeStartTour() {
  if (store.get("tourSeen")) return;
  setTimeout(() => {
    if (store.get("tourSeen") || tourAt >= 0 || document.querySelector("dialog[open]") || !$("#gate").hidden) return;
    startTour();
  }, 700);
}
$("#tourNext").addEventListener("click", () => (tourAt >= TOUR.length - 1 ? endTour() : showTourStep(tourAt + 1)));
$("#tourBack").addEventListener("click", () => showTourStep(tourAt - 1));
$("#tourSkip").addEventListener("click", endTour);
document.addEventListener("keydown", (e) => {
  if (tourAt < 0) return;
  if (e.key === "Escape") endTour();
  if (e.key === "ArrowRight") $("#tourNext").click();
  if (e.key === "ArrowLeft" && tourAt > 0) showTourStep(tourAt - 1);
});
window.addEventListener("resize", placeTour);
window.addEventListener("scroll", placeTour, { passive: true });
document.querySelectorAll("[data-tour]").forEach((b) => b.addEventListener("click", () => { $("#quickMenu").open && $("#quickMenu").close(); startTour(); }));



/* ---------- ❓ Help: tips for the screen you're on, and the tour ---------- */
const HELP = {
  home: ["Home", ["Tap the top card to pick up where you left off.", "Today has a verse, a psalm, a proverb, a question and a prayer for each day. Tap \"Choose what shows\" to pick what you see.", "My Bible reads the whole Bible in order. The three self-guided studies below each go a different way, with your progress shown on each.", "Go anywhere in the Bible: type a book or tap Browse books. Your study keeps its place."]],
  read: ["Reading", ["Tap the book name at the top to pick a book, chapter and verse. The ‹ › arrows go to the last or next chapter.", "Tap Read aloud to hear the chapter. The part being read is highlighted.", "Tap any word for its meaning and the Hebrew or Greek.", "Scroll down for Setting the stage, the study section (Strong's, maps, history, scholars), questions for the Bible helper, and your journal."]],
  books: ["My study", ["Progress shows how much of each book you've read.", "History shows chapters you've visited. Favorites are chapters you starred.", "Journal holds your daily journal and every chapter journal, with prayers and thanks."]],
  path: ["My path", ["Your current study, section by section. Tap a chapter to read it.", "Switch studies from Home any time. Each one keeps its own place."]],
  settings: ["Settings", ["Account: change your password or sign out.", "Journal passcode: leave your journal open, or lock it with a passcode.", "Reading: bigger words, bigger buttons, high contrast, tap-a-word, and how the Bible helper answers.", "Look: change the colors and pictures."]],
  shop: ["Books and music", ["Each button searches Amazon for that kind of book or music. Nothing is bought unless you buy it on Amazon."]],
};
const helpSheet = document.createElement("dialog");
helpSheet.className = "welcome-back help-sheet"; helpSheet.setAttribute("aria-label", "Help");
document.body.append(helpSheet);
function openHelp() {
  const view = document.body.dataset.view || "home";
  const [title, tips] = HELP[view] || HELP.home;
  helpSheet.innerHTML = `<div class="wb-icon" aria-hidden="true">❓</div><h2>Help: ${esc(title)}</h2>
    <ul class="help-tips">${tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <button type="button" class="big-btn" id="helpTour">🧭 Take the tour</button>
    <button type="button" class="wb-new" id="helpClose">Close</button>
    <p class="muted small-print">Still stuck? Ask the person who gave you the app, or ask the Bible helper under any chapter.</p>`;
  helpSheet.showModal();
  $("#helpClose").addEventListener("click", () => helpSheet.close());
  $("#helpTour").addEventListener("click", () => { helpSheet.close(); startTour(); });
}
$("#helpBtn").addEventListener("click", openHelp);

/* ---------- Coming back after a break: Home, with "pick up where you left off" ---------- */
// After 15 minutes away (or with the app closed), people land on Home and are asked
// whether to go back to where they were or start something new. Never while reading aloud.
const AWAY_MS = 15 * 60 * 1000, ACTIVE_KEY = "bible-study:last-active";
let lastActive = Number(localStorage.getItem(ACTIVE_KEY)) || 0;
function markActive() {
  const now = Date.now();
  if (now - lastActive < 15000) return;
  lastActive = now;
  try { localStorage.setItem(ACTIVE_KEY, String(now)); } catch { /* private mode */ }
}
["pointerdown", "keydown", "touchstart", "wheel"].forEach((t) => window.addEventListener(t, markActive, { passive: true }));
const welcomeBack = document.createElement("dialog");
welcomeBack.className = "welcome-back"; welcomeBack.setAttribute("aria-label", "Welcome back");
document.body.append(welcomeBack);
function cameBack() {
  const away = Date.now() - lastActive;
  if (!lastActive || away < AWAY_MS || reader.playing || tourAt >= 0 || !$("#gate").hidden || document.querySelector("dialog[open]")) { markActive(); return; }
  lastActive = 0; markActive();
  const last = store.get("last");
  const where = `${BOOK_BY_ID[last.book].name} ${last.chapter}`;
  showView("home");
  welcomeBack.innerHTML = `<div class="wb-icon" aria-hidden="true">👋</div>
    <h2>Welcome back${store.get("name") ? `, ${esc(store.get("name"))}` : ""}!</h2>
    <p>You were reading <strong>${esc(where)}</strong>.</p>
    <button type="button" class="big-btn" id="wbResume">Go back to ${esc(where)}</button>
    <button type="button" class="wb-new" id="wbNew">Start something new</button>`;
  welcomeBack.showModal();
  $("#wbResume").addEventListener("click", () => { welcomeBack.close(); showView("read"); openChapter(last.book, last.chapter); });
  $("#wbNew").addEventListener("click", () => welcomeBack.close());
}
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") cameBack(); else if (!reader.playing) { lastActive = Date.now(); try { localStorage.setItem(ACTIVE_KEY, String(lastActive)); } catch { /* */ } } });
window.addEventListener("pageshow", (e) => { if (e.persisted) cameBack(); });
// While the app sits open and untouched for 15 minutes, go Home quietly; the question waits for their return.
setInterval(() => { if (document.visibilityState === "visible" && lastActive && Date.now() - lastActive >= AWAY_MS && !reader.playing && !welcomeBack.open) cameBack(); }, 60000);

/* ---------- Home-screen install ---------- */
const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isApple = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(navigator.userAgent);
if (standalone) $("#installCard").hidden = true;
else {
  $("#installIos").hidden = isAndroid;
  $("#installAndroid").hidden = isApple;
}
let installEvent = null;
window.addEventListener("beforeinstallprompt", (e) => { // Chrome on Android offers this
  e.preventDefault();
  installEvent = e;
  $("#installBtn").hidden = false;
});
$("#installBtn").addEventListener("click", async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  $("#installBtn").hidden = true;
});
window.addEventListener("appinstalled", () => { $("#installCard").hidden = true; });

// Updates: check for a new version each time the app opens or comes back to the screen,
// and reload once onto it. Saved reading, notes and keys are kept (they live on the device).
if ("serviceWorker" in navigator) {
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then((reg) => {
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") reg.update().catch(() => {}); });
  }).catch(() => {});
  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloaded) return; // first install: nothing to refresh
    reloaded = true;
    location.reload();
  });
}
