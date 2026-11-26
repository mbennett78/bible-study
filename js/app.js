import { BOOKS, BOOK_BY_ID, TOTAL_CHAPTERS } from "./books.js";
import { store, onSave } from "./store.js";
import { findTopics } from "./topics.js";
import { OUTLINES } from "./outlines.js";
import { STICKERS, STICKER_GROUPS, stickerSvg, BOOK_ART } from "./stickers.js";
import { VERSES, TOTAL_VERSES, BOOK_FACTS } from "./bookstats.js";
import { getChapter, listEnglishBibles, bibleGatewayUrl, searchBible, versionName, pickNasb, esvAudioUrl, saveAhead } from "./text.js";
import { PATH_ORDER, PATH_BY_ID, pathChapters, expandReading, readingLabel, AUDIENCE_NOTES } from "./paths.js";
import { Reader, Commands, chunksFrom, canSpeak, canListen, listVoices, dictateInto, sayAloud, stopSaying } from "./speech.js";
import { createBuddy, BUDDY_SVG, BUDDY_ACTIONS, buddyCommand, seat } from "./buddy.js";
import { guideAnswer, seasonNow, welcomeLine, sessionNudge, timeAnswer } from "./buddyguide.js";
import { isScary, checkingOn, comfortLine, propFor, newProp, warmthLevel, learnFrom, remember, learnedLine, ASK_MEMORY, FORGET_LAST, FORGET_ALL, memoryLine, recallLine } from "./buddygrow.js";
import { createQuest } from "./quest.js";
import { createGame } from "./game.js";
import { pickQuestions, knowledgeRating, bankSize } from "./trivia.js";
import { THEME_LOOKS, seasonOf, seasonSrc, flock, seaScene, fishFlourish, classicFlourish, fishStrip, friend, edgeVines, cornerSprig, passageStrip, bookThumb } from "./art.js";
import { notesFor, sampleChapters, EVIDENCE, ABOUT, sourceText, sourceUrl, MAP_OUTLINES, bookNotesReady, loadBookNotes } from "./notes.js";
import { eraFor, regionOf, TRIBES, tribeName } from "./history.js";
import { glossFor, stem } from "./glossary.js";
import { INTROS } from "./intros.js";
import { dailyToday } from "./daily.js";
import { GUIDE, guideHtml } from "./guide.js";
import { NEWS, newsToShow, newsHtml, recentNews } from "./whatsnew.js";
import { nextPrompt } from "./prompts.js";
import { openVersePic } from "./versepic.js";
import { openHeart, onThisDay } from "./heart.js";
import { openInk, inkSvg, inkPng } from "./ink.js";
import { authEnabled, isOrganizer, familyAdmin, currentUser, signIn, emailSignInLink, verifyEmailCode, changePassword, changeEmail, setMyName, signOut, onSignedOut, linkArrival, getFamilyKey, setFamilyKey, saveBackup, loadBackup, askHelper, helperStatus } from "./auth.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- Appearance ---------- */
// High contrast: black (or white, in dark mode) words and stronger lines, whatever the look.
const MAX_EXTRA_BIBLES = 8; // extra versions on the reader's switch, beside the NASB and ESV
// The versions turned on for the family the first time the plan's list is loaded, best known first.
const FAVORITE_VERSIONS = [/NASB|New American Standard/i, /^NIV|New International/i, /^KJV$|^King James/i, /NKJV|New King James/i, /^NLT|New Living/i, /^CSB|Christian Standard/i, /^AMP|Amplified/i, /^ASV|American Standard Version/i, /^WEB|World English/i];
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
  document.documentElement.dataset.pageWidth = ["narrow", "wide"].includes(store.get("pageWidth")) ? store.get("pageWidth") : "medium";
  document.documentElement.style.fontSize = store.get("uiScale") > 100 ? `${store.get("uiScale")}%` : "";
  document.documentElement.dataset.graphics = store.get("graphics") || "full";
  const shown = store.get("show") || {};
  for (const f of FEATURES) document.body.classList.toggle(`hide-${f.id}`, shown[f.id] === false);
  const style = store.get("style");
  if (style === "sage") delete document.documentElement.dataset.style;
  else document.documentElement.dataset.style = style;
  if (isStill(style)) document.documentElement.dataset.still = "1"; else delete document.documentElement.dataset.still;
  // Seasonal changes: the painting (and the header color) follow the time of year.
  if (style === "seasons") { document.documentElement.dataset.season = seasonOf(); document.documentElement.style.setProperty("--season-img", `url(${seasonSrc()})`); }
  else { delete document.documentElement.dataset.season; document.documentElement.style.removeProperty("--season-img"); }
  // Match the phone's status bar and Safari's edges to this look's page color.
  const page = getComputedStyle(document.documentElement).getPropertyValue("--page").trim();
  if (page) document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.content = page; });
  applyContrast();
  if (typeof updateMascot === "function") updateMascot();
}

/* ---------- Navigation between tabs ---------- */
// Whoever looks after the keys sees every version on the plan in Settings without tapping
// anything: the list loads by itself, once per visit to the app.
let planVersionsLoaded = false;
let pendingMood = null; // Buddy's feeling about the chapter, shown once they're reading it
function loadPlanVersionsOnce() {
  const card = $("#bibleTextCard");
  if (planVersionsLoaded || !card || card.hidden || !store.get("apiBibleKey")) return;
  planVersionsLoaded = true;
  $("#loadVersions").dataset.quiet = "1";
  $("#loadVersions").click();
}
// Journal has its own button in the menu: it opens My Bible on the Journal page.
let segment = "progress";
function showView(name) {
  setBarsAway(false);
  if (name === "journal") { segment = "journal"; navFromMenu = false; showView("books"); markNav("journal"); return; }
  if (name === "books" && segment === "journal" && navFromMenu) segment = "progress"; // the My Bible button shows the books
  document.querySelectorAll(".view").forEach((v) => { v.hidden = v.id !== `view-${name}`; });
  markNav(name);
  document.body.dataset.view = name;
  // Buddy keeps you company: journaling while you journal, reading while you read.
  setTimeout(() => { try { if (document.body.dataset.view === name) buddy.mirror(name === "books" && segment === "journal" ? "journal" : name); } catch { /* he isn't here yet */ } }, 1800);
  $("#topTitle").textContent = { home: "Home", books: "My Bible", path: "Bible study", settings: "Settings", notes: "My Notes" }[name] || "";
  if (name === "notes") renderNotesList();
  if (name === "read") showPassageMood();
  if (name === "home") renderHome();
  if (name === "books") renderMyStudy();
  if (name === "path") renderPath();
  if (name === "settings") { renderSetupCard(); loadPlanVersionsOnce(); }
  window.scrollTo(0, 0);
}
function markNav(name) {
  document.querySelectorAll(".tabbar button").forEach((b) => {
    if (b.dataset.view === name) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
}
let navFromMenu = false;
document.querySelectorAll(".tabbar button[data-view]").forEach((b) => b.addEventListener("click", () => { navFromMenu = true; showView(b.dataset.view); navFromMenu = false; }));
// On iPad and other wide screens the menu is a rail down the left side instead of a bar.
const railMedia = matchMedia("(min-width: 700px) and (min-height: 500px)");
const railMode = () => railMedia.matches;
/* ---------- Full screen while reading on a phone ---------- */
// Scrolling down through the Bible text slides the top and bottom menus away; scrolling up a
// little, or tapping the small Menu tab, brings them back. iPads keep their side menu.
let lastY = 0, upBy = 0;
function setBarsAway(away) {
  document.body.classList.toggle("bars-away", away);
  const tab = document.getElementById("pullTab");
  if (tab) tab.hidden = !away;
}
window.addEventListener("scroll", () => {
  const y = window.scrollY, dy = y - lastY;
  lastY = y;
  const reading = !document.getElementById("view-read")?.hidden;
  if (!reading || railMode() || store.get("focusRead") === false || document.documentElement.classList.contains("typing")) { if (document.body.classList.contains("bars-away")) setBarsAway(false); return; }
  if (dy > 6 && y > 160) { upBy = 0; if (!document.body.classList.contains("bars-away")) setBarsAway(true); }
  else if (dy < 0) { upBy -= dy; if (upBy > 40 || y < 80) setBarsAway(false); }
}, { passive: true });
document.getElementById("pullTab")?.addEventListener("click", () => { upBy = 0; setBarsAway(false); });
// Keep page content clear of the bottom menu, whatever its real height on this device.
const measureBar = () => document.documentElement.style.setProperty("--tabbar-total", railMode() ? "0px" : `${Math.ceil(document.querySelector(".tabbar").getBoundingClientRect().height)}px`);
if ("ResizeObserver" in window) new ResizeObserver(measureBar).observe(document.querySelector(".tabbar"));
railMedia.addEventListener?.("change", () => { measureBar(); pinTabbar(); buddy?.place(); });
// The bottom buttons stay pinned to the bottom edge of what's on screen. iPad and iPhone
// Safari sometimes leave a "fixed" bar floating above the bottom (after the keyboard closes,
// or as the address bar grows and shrinks), with the page showing underneath it. So we
// measure where the screen's visible bottom really is and move the bar onto it, every time
// the visible area changes. While someone is typing, the bar steps aside for the keyboard.
const tabbarEl = document.querySelector(".tabbar");
const barProbe = Object.assign(document.createElement("div"), { className: "bar-probe" });
barProbe.setAttribute("aria-hidden", "true");
document.body.append(barProbe);
const typingField = () => { const a = document.activeElement; return Boolean(a && (/^(TEXTAREA|SELECT)$/.test(a.tagName) || (a.tagName === "INPUT" && !/^(checkbox|radio|button|submit|range|color|file)$/.test(a.type)) || a.isContentEditable)); };
function pinTabbar() {
  const typing = typingField();
  document.documentElement.classList.toggle("typing", typing);
  const vv = window.visualViewport;
  if (!vv || typing || vv.scale > 1.05 || railMode()) { tabbarEl.style.transform = ""; return; } // zoomed in, or the side rail: leave it be
  // Where "bottom: 0" lands, and where the visible screen really ends (same coordinates).
  const shift = Math.round(vv.offsetTop + vv.height - barProbe.getBoundingClientRect().top);
  tabbarEl.style.transform = shift && Math.abs(shift) < 800 ? `translateY(${shift}px)` : "";
}
let pinQueued = false;
const pinSoon = () => { if (pinQueued) return; pinQueued = true; requestAnimationFrame(() => { pinQueued = false; pinTabbar(); }); };
window.visualViewport?.addEventListener("resize", pinSoon);
window.visualViewport?.addEventListener("scroll", pinSoon);
addEventListener("scroll", pinSoon, { passive: true });
addEventListener("resize", pinSoon);
addEventListener("orientationchange", () => [100, 400, 900].forEach((ms) => setTimeout(pinTabbar, ms)));
addEventListener("pageshow", pinSoon);
document.addEventListener("focusin", pinSoon);
// When the keyboard closes, Safari can leave the page shifted: settle it, then re-pin.
document.addEventListener("focusout", () => setTimeout(() => {
  if (typingField()) return;
  window.scrollTo(window.scrollX, window.scrollY);
  [0, 250, 700].forEach((ms) => setTimeout(pinTabbar, ms));
}, 60));
setInterval(() => { if (!document.hidden) pinTabbar(); }, 1500);
// No pinch zoom: the app has its own text size (Settings). A stuck zoom is hard to undo.
["gesturestart", "gesturechange"].forEach((t) => document.addEventListener(t, (e) => e.preventDefault(), { passive: false }));
// If the page was ever left zoomed or slid sideways, put it back.
addEventListener("orientationchange", () => setTimeout(() => { if (window.scrollX) window.scrollTo(0, window.scrollY); }, 300));
pinTabbar();

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
let readArmed = false; // "Read to me" is reading in this visit (never starts by itself when the app opens)
async function openChapter(book, chapter, { scroll = true } = {}) {
  store.set("last", { book, chapter });
  // This book's chapter notes load the first time; show them as soon as they arrive.
  if (!bookNotesReady(book)) loadBookNotes(book).then(() => {
    const here = store.get("last");
    if (here.book !== book || !bookNotesReady(book)) return;
    renderNotes(here.book, here.chapter); renderBookIntro(here.book, here.chapter); updateFollow();
  });
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
  // The same buttons right under the last verse, so no one has to scroll back up.
  $("#prevCh2").disabled = !prev; $("#nextCh2").disabled = !next;
  $("#prevCh2 small").textContent = prev ? refName(prev) : "";
  $("#nextCh2 small").textContent = next ? refName(next) : "";
  $("#prevCh2").onclick = $("#prevCh").onclick; $("#nextCh2").onclick = $("#nextCh").onclick;

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
    // Until they've tried it once: let them know any word can be tapped.
    if (!store.get("wordTipSeen") && store.get("wordTap") !== false) {
      readerEl.insertAdjacentHTML("afterbegin", `<p class="word-tip">💡 Tap any word to see what it means and the ${BOOK_BY_ID[book].testament === "OT" ? "Hebrew" : "Greek"} behind it. Tap a verse number to highlight or bookmark the verse. <button type="button" class="quiet-link">Got it</button></p>`);
      readerEl.querySelector(".word-tip button").addEventListener("click", () => { store.set("wordTipSeen", true); readerEl.querySelector(".word-tip")?.remove(); });
    }
    $("#copyright").textContent = result.copyright;
    store.recordVisit(book, chapter);
    updateVisitLine();
    buddyFeelsPassage(readerEl.textContent, `${book}.${chapter}`);
    if (!$("#drive").hidden) $("#driveText").innerHTML = readerEl.innerHTML;
    reader.load(chunksFrom(readerEl), `${BOOK_BY_ID[book].name}, chapter ${chapter}.`);
    // The ESV has a real narrator. Other versions are read by the device's own voice.
    reader.audioFor = version === "ESV" && store.get("humanVoice") !== false && !result.offline ? () => esvAudioUrl(book, chapter) : null;
    syncNarrator(null);
    applyVerseMarks(book, chapter);
    followKey = ""; setTimeout(updateFollow, 60);
    markStudyWords(readerEl, book, chapter, token);
    // Save the next two chapters (on their path, if they're following one) for reading with no signal.
    if (!result.offline) setTimeout(() => {
      if (token !== loadToken) return;
      const ahead = [];
      const path = store.get("activePath");
      if (path) { const list = pathChapters(path); const at = pathIndex(path, book, chapter); if (at >= 0) ahead.push(...list.slice(at + 1, at + 3)); }
      if (!ahead.length) { let n = neighbors(book, chapter).next; if (n) { ahead.push(n); n = neighbors(n.book, n.chapter).next; if (n) ahead.push(n); } }
      saveAhead(version, ahead);
    }, 2500);
    // Read to me: once it's on and started, every chapter opened is read aloud.
    if (autoplayNext || (readArmed && driveOn() && !$("#view-read").hidden)) { autoplayNext = false; reader.play(); }
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
        <span class="why">${esc(why)}</span><br><button class="small" id="retryFamily">Try again</button> <button class="small" id="iSetUp" hidden>I set up the app</button></div>`;
      isOrganizer().then((yes) => { if (yes && $("#iSetUp")) $("#iSetUp").hidden = false; });
      $("#retryFamily").addEventListener("click", async () => { const fk = await getFamilyKey(); if (fk) { store.set("apiBibleKey", ""); applyInvite({ ...fk, look: "" }); } openChapter(book, chapter); });
      $("#iSetUp").addEventListener("click", () => { showView("settings"); const box = $("#organizerBox"); if (box) { revealSetting(box); box.open = true; } revealSetting($("#bibleTextCard")).scrollIntoView({ block: "start" }); });
      return;
    }
    readerEl.innerHTML = `<div class="message"><strong>Can't show this chapter yet</strong>${esc(e.message || "Something went wrong.")}
      ${needsSettings ? `<br><button class="small" id="goSettings">${e.kind === "nokey" ? "How to get your free key" : "Open Settings"}</button>` : `<br><button class="small" id="retry">Try again</button>`}</div>`;
    $("#goSettings")?.addEventListener("click", () => { showView("settings"); if (e.kind === "nokey") { revealSetting($("#keyHelp")).open = true; $("#keyHelp").scrollIntoView({ block: "center" }); } });
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
    $("#triviaHint").textContent = `You finished ${BOOK_BY_ID[book].name}! Take a quick check on ${BOOK_BY_ID[book].name}`;
    $("#triviaBtn").classList.add("glow");
    mascotSay(`You finished ${BOOK_BY_ID[book].name}! Want a quick check? For bigger games, tap 🎲 Games.`);
    buddy.celebrate(`You finished ${BOOK_BY_ID[book].name}! I'm SO proud of you! 🎉`);
  } else if (on) mascotSay(pick(["Well done today.", "Another chapter hidden in your heart.", "Keep going, you're doing great."]));
  if (on) celebrate(store.readCount(book) === BOOK_BY_ID[book].chapters ? "big" : "small");
}
$("#markRead").addEventListener("click", toggleRead);
// Two ways to read: "Just the Bible" (the words, read-aloud and Mark read, nothing else) or
// "Study Bible" (study notes, the book introduction, pictures, trivia, journal and helper).
function syncStudyWords() { document.body.classList.toggle("no-study-words", store.get("studyWords") === false || store.get("wordTap") === false); }
syncStudyWords();
function setReadMode(mode) {
  store.set("readMode", mode);
  document.body.classList.toggle("plain-reading", mode === "plain");
  document.querySelectorAll("[data-readmode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.readmode === mode)));
}
document.querySelectorAll("[data-readmode]").forEach((b) => b.addEventListener("click", () => setReadMode(b.dataset.readmode)));
setReadMode(store.get("readMode") === "plain" ? "plain" : "study");

/* ---------- Favorites & visit history ---------- */
const fmtDate = (iso) => { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); };
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
  const main = store.get("nasbLabel") || "NASB";
  const list = [["NASB", /^NASB \d{4}$/.test(main) ? main : main.replace(/\s.*$/, "")]];
  for (const b of store.get("extraBibles") || []) list.push([`B:${b.id}`, b.label]);
  if (store.get("esvKey")) list.push(["ESV", "ESV"]);
  return list;
}
// Each person's own favorite version (Settings, under You), from the versions the family has.
function renderMyVersion() {
  const sel = $("#myVersion");
  if (!sel) return;
  const list = versionList(), cur = store.get("version");
  sel.innerHTML = list.map(([v, l]) => `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(l)}</option>`).join("");
  sel.disabled = list.length < 2;
  $("#myVersionNote").textContent = list.length < 2 ? "More versions appear here once the family organizer turns them on." : "You can also switch any time at the top of the Read page.";
}
$("#myVersion")?.addEventListener("change", (e) => { store.set("version", e.target.value); syncVersionSwitch(); const { book, chapter } = store.get("last"); openChapter(book, chapter, { scroll: false }); });
function syncVersionSwitch() {
  renderMyVersion();
  const list = versionList();
  if (!list.some(([v]) => v === store.get("version"))) store.set("version", "NASB");
  const cur = store.get("version");
  const el = document.querySelector(".version-switch");
  el.hidden = list.length < 2;
  el.innerHTML = list.length > 1
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
/* ---------- Tap a verse number: highlight, bookmark, write a note, copy or share ---------- */
const HL_COLORS = [["yellow", "Yellow"], ["green", "Green"], ["blue", "Blue"], ["pink", "Pink"]];
const verseMarkEls = () => [...$("#reader").querySelectorAll(".v, .verse-num, .chapter-num, [data-number]")].filter((m) => !m.closest(".footnotes"));
const markNum = (m) => (m.classList.contains("chapter-num") ? 1 : parseInt(m.dataset.number || m.textContent, 10) || 0);
// The text nodes of each verse, in order.
function verseTextNodes(readerEl) {
  const walker = document.createTreeWalker(readerEl, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => (n.nodeType === 1 && n.matches(".offline-note, .word-tip, .footnotes, sup, .v, .verse-num, .chapter-num, [data-number]") ? (n.matches(".v, .verse-num, .chapter-num, [data-number]") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT) : NodeFilter.FILTER_ACCEPT),
  });
  const byVerse = new Map();
  let verse = 1;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeType === 1) { if (n.matches(".v, .verse-num, .chapter-num, [data-number]")) { const num = markNum(n); if (num) verse = num; } continue; }
    if (n.parentElement.closest(".v, .verse-num, .chapter-num, [data-number], .footnotes, sup")) continue;
    if (!n.textContent.trim() && !/^[ \u00a0]+$/.test(n.textContent)) continue; // keep spaces between words, skip line breaks between paragraphs
    if (!byVerse.has(verse)) byVerse.set(verse, []);
    byVerse.get(verse).push(n);
  }
  return byVerse;
}
function verseText(v) { return (verseTextNodes($("#reader")).get(v) || []).map((n) => n.textContent).join("").replace(/\s+/g, " ").trim(); }
// Draw the highlights and bookmarks saved for this chapter.
function applyVerseMarks(book, chapter) {
  const readerEl = $("#reader");
  if (!readerEl) return;
  readerEl.querySelectorAll("mark.hl").forEach((m) => m.replaceWith(...m.childNodes));
  readerEl.querySelectorAll(".is-bookmarked, .has-note, .has-mine").forEach((m) => m.classList.remove("is-bookmarked", "has-note", "has-mine"));
  // A small dot after a verse number: blue-green for a study note, gold for one of your own notes.
  const mine = new Set(store.allEntries().flatMap((e) => (e.quotes || []).map((q) => q.ref)));
  for (const el of verseMarkEls()) {
    const v = markNum(el);
    if (!v) continue;
    if (verseNoteFor(book, chapter, v)?.start === v) el.classList.add("has-note");
    if (mine.has(`${book}.${chapter}.${v}`)) el.classList.add("has-mine");
  }
  const marks = store.chapterMarks(book, chapter);
  if (!Object.keys(marks).length) return;
  const nodes = verseTextNodes(readerEl);
  for (const [v, m] of Object.entries(marks)) {
    if (m.color) for (const n of nodes.get(Number(v)) || []) {
      const mk = Object.assign(document.createElement("mark"), { className: `hl hl-${m.color}` });
      mk.dataset.v = v;
      n.replaceWith(mk); mk.append(n);
    }
    if (m.bookmark) verseMarkEls().find((x) => markNum(x) === Number(v))?.classList.add("is-bookmarked");
  }
}
// The verse-by-verse study note that covers a verse ("2:7", "2:1-3" or "2:1, 5"), if any.
function verseNoteFor(book, chapter, v) {
  const sec = notesFor(book, chapter)?.sections?.find((x) => x.id === "verses");
  if (!sec) return null;
  let best = null;
  for (const it of sec.items) {
    const m = String(it.ref || "").match(/^(\d+):(\d+)(?:\s*[-–]\s*(\d+))?/);
    if (!m || Number(m[1]) !== Number(chapter)) continue;
    const start = Number(m[2]), end = Number(m[3] || m[2]);
    if (v >= start && v <= end) return { ...it, start, end };
    if (start <= v && (!best || start > best.start) && v - start <= 3) best = { ...it, start, end, near: true };
  }
  return best;
}
/* ---------- Follow along: the study note for the verse you're reading travels with you ---------- */
// On a phone or portrait iPad, a small card rides at the bottom of the Scripture and changes as you
// scroll. With the notes beside the text (wide iPad), the notes column scrolls to the same verse.
const follow = document.createElement("div");
follow.id = "follow"; follow.className = "follow"; follow.hidden = true;
follow.setAttribute("role", "region"); follow.setAttribute("aria-label", "Study note for the verse you're reading");
let followKey = "", followOpen = false;
function updateFollow() {
  const view = $("#view-read");
  if (!view || view.hidden || !$("#reader")) { follow.hidden = true; return; }
  if (!follow.isConnected) $("#reader").after(follow);
  const { book, chapter } = store.get("last");
  const notes = notesFor(book, chapter);
  if (!notes || store.get("followNotes") === false) { follow.hidden = true; return; }
  const v = verseInView();
  const it = verseNoteFor(book, chapter, v);
  const side = getComputedStyle($("#studyNotes")).position === "sticky";
  if (side) {
    follow.hidden = true;
    // Wide screen: the Verse by verse notes sit beside the text; keep the matching one in view.
    const col = $("#studyNotes"), items = [...col.querySelectorAll(".verse-note")];
    items.forEach((x) => x.classList.toggle("is-now", Boolean(it) && x.dataset.start === String(it.start)));
    const now = col.querySelector(".verse-note.is-now");
    if (now && followKey !== `${book}.${chapter}.${it.start}`) col.scrollTo({ top: now.offsetTop - col.clientHeight / 3, behavior: "smooth" });
    followKey = it ? `${book}.${chapter}.${it.start}` : "";
    return;
  }
  if (!it) { follow.hidden = true; followKey = ""; return; }
  const key = `${book}.${chapter}.${it.start}`;
  follow.hidden = false;
  if (key === followKey) return;
  followKey = key;
  const ref = it.end > it.start ? `${chapter}:${it.start}-${it.end}` : `${chapter}:${it.start}`;
  follow.innerHTML = `<button type="button" class="fl-bar" aria-expanded="${followOpen}"><span class="fl-ref">${esc(ref)}</span><span class="fl-head">${esc(it.head)}</span><span class="fl-more" aria-hidden="true">${followOpen ? "▾" : "▸"}</span></button>
    <div class="fl-body"${followOpen ? "" : " hidden"}><p>${esc(it.text)}</p><div class="fl-acts"><button type="button" class="small" data-fl="all">All verse notes</button><button type="button" class="small" data-fl="note">Add to my notes</button><button type="button" class="small quiet-link" data-fl="off">Hide these</button></div></div>`;
  follow.querySelector(".fl-bar").addEventListener("click", () => { followOpen = !followOpen; followKey = ""; updateFollow(); });
  follow.querySelectorAll("[data-fl]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.fl === "all") { notesTab = "verses"; renderNotes(book, chapter); $("#refPanel")?.scrollIntoView({ block: "start", behavior: "smooth" }); }
    if (b.dataset.fl === "note") openVerseSheet(it.start);
    if (b.dataset.fl === "off") { store.set("followNotes", false); follow.hidden = true; mascotSay("Okay. Turn follow-along notes back on in Settings."); }
  }));
}
let followTick = 0;
window.addEventListener("scroll", () => { if (!followTick) followTick = requestAnimationFrame(() => { followTick = 0; updateFollow(); }); }, { passive: true, capture: true });
const verseSheet = document.createElement("dialog");
verseSheet.className = "word-sheet verse-sheet"; verseSheet.setAttribute("aria-label", "Verse");
verseSheet.addEventListener("click", (e) => { if (e.target === verseSheet) verseSheet.close(); });
function openVerseSheet(v) {
  const { book, chapter } = store.get("last");
  const ref = `${BOOK_BY_ID[book].name} ${chapter}:${v}`;
  const text = verseText(v);
  const m = store.verseMark(book, chapter, v) || {};
  const vNote = verseNoteFor(book, chapter, v);
  const ver = (versionList().find(([x]) => x === store.get("version")) || ["", "NASB"])[1];
  verseSheet.innerHTML = `<div class="ws-head"><h2>${esc(ref)}</h2><button type="button" class="ws-close" aria-label="Close">✕</button></div>
    ${text ? `<p class="vs-text">${esc(text.length > 260 ? `${text.slice(0, 260)}…` : text)}</p>` : ""}
    ${vNote && !vNote.near ? `<div class="vs-note"><p class="vs-label">Study note</p><strong>${esc(vNote.head)}</strong><p>${esc(vNote.text.length > 420 ? `${vNote.text.slice(0, 420)}…` : vNote.text)}</p><button type="button" class="small" data-act="notes">All verse notes</button></div>` : ""}
    <details class="vs-more vs-xref" hidden><summary>Cross-references</summary><div class="vs-xlist"></div><p class="muted small-print">Tap one to read it here. From OpenBible.info's cross-references (CC BY), ranked by how many readers found them helpful.</p></details>
    <details class="vs-more vs-orig" hidden><summary>${BOOK_BY_ID[book].testament === "OT" ? "Hebrew" : "Greek"} words in this verse</summary><div class="vs-olist"></div><p class="muted small-print ws-credit">Word tagging: STEPBible.org, Tyndale House Cambridge (CC BY). Definitions: James Strong (1890).</p></details>
    ${versionList().length > 1 ? `<details class="vs-more vs-compare"><summary>Compare versions</summary><div class="vs-clist"><p class="muted small-print">Loading…</p></div></details>` : ""}
    <p class="vs-label">Highlight</p>
    <div class="vs-colors">${HL_COLORS.map(([c, label]) => `<button type="button" class="vs-color hl-${c}" data-color="${c}" aria-pressed="${m.color === c}" aria-label="${label}">${m.color === c ? "✓" : ""}</button>`).join("")}
      <button type="button" class="vs-clear" data-color="" ${m.color ? "" : "disabled"}>No color</button></div>
    <div class="vs-acts">
      <button type="button" class="vs-act" data-act="bookmark" aria-pressed="${Boolean(m.bookmark)}"><span aria-hidden="true">🔖</span>${m.bookmark ? "Bookmarked ✓" : "Bookmark"}</button>
      <button type="button" class="vs-act" data-act="note"><span aria-hidden="true">📝</span>Add to notes</button>
      <button type="button" class="vs-act" data-act="copy"><span aria-hidden="true">📋</span>Copy</button>
      ${text ? `<button type="button" class="vs-act" data-act="heart"><span aria-hidden="true">🧠</span>Learn by heart</button>` : ""}
      <button type="button" class="vs-act" data-act="share"><span aria-hidden="true">↗</span>Share</button>
    </div>
    <p class="vs-msg muted small-print" role="status"></p>
    <p class="muted small-print">Highlights and bookmarks are saved to your account and show on all your devices. Find them in My Bible, under Saved.</p>`;
  const msg = verseSheet.querySelector(".vs-msg");
  verseSheet.querySelector(".ws-close").addEventListener("click", () => verseSheet.close());
  verseSheet.querySelectorAll("[data-color]").forEach((b) => b.addEventListener("click", () => {
    store.setVerseMark(book, chapter, v, { color: b.dataset.color });
    applyVerseMarks(book, chapter);
    verseSheet.close();
  }));
  const quote = `“${text}” ${ref} (${ver})`;
  verseSheet.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", async () => {
    const act = b.dataset.act;
    if (act === "bookmark") { store.setVerseMark(book, chapter, v, { bookmark: !m.bookmark }); applyVerseMarks(book, chapter); verseSheet.close(); }
    else if (act === "notes") { verseSheet.close(); notesTab = "verses"; renderNotes(book, chapter); $("#refPanel")?.scrollIntoView({ block: "start", behavior: "smooth" }); }
    else if (act === "note") {
      const quote = { ref: `${book}.${chapter}.${v}`, text, ver };
      // Writing church notes (or any entry) right now? Offer to add it there.
      const open = editing && entryHost?.isConnected && entryHost.querySelector(".entry-editor") ? editing : null;
      const today = store.allEntries().find((x) => x.kind === "church" && dayOf(x.created) === todayKey());
      const choices = [open && ["open", "The note I'm writing"], today && (!open || open.id !== today.id) && ["church", `Today's church notes${today.title ? `: ${today.title}` : ""}`], ["new", `A new note on ${BOOK_BY_ID[book].name} ${chapter}`]].filter(Boolean);
      const go = (where) => {
        verseSheet.close();
        if (!$("#chapterEntryHost")) { showView("notes"); openEntry({ kind: "note", ref: `${book}.${chapter}`, addQuote: quote }, $("#notesEditor")); return; }
        if (where === "open") { openEntry({ id: open.id, kind: open.kind, ref: open.ref, addQuote: quote }, entryHost); return; }
        if (where === "church") { showView("journal"); setTimeout(() => openEntry({ id: today.id, addQuote: quote }), 150); return; }
        notesTab = "mine"; renderNotes(book, chapter);
        $("#refPanel")?.scrollIntoView({ block: "start", behavior: "smooth" });
        openEntry({ kind: "note", ref: `${book}.${chapter}`, addQuote: quote }, $("#chapterEntryHost"));
      };
      if (choices.length === 1) go("new");
      else {
        msg.innerHTML = `<span class="vs-where">Add it to:</span> ${choices.map(([w, l]) => `<button type="button" class="small" data-where="${w}">${esc(l)}</button>`).join(" ")}`;
        msg.querySelectorAll("[data-where]").forEach((b) => b.addEventListener("click", () => go(b.dataset.where)));
      }
    } else if (act === "heart") {
      verseSheet.close(); openHeart({ ref, text, ver });
    } else if (act === "copy") {
      try { await navigator.clipboard.writeText(quote); msg.textContent = "Copied ✓"; } catch { msg.textContent = "Copying isn't allowed here. Press and hold the verse to copy it instead."; }
    } else if (act === "share") {
      // Share the words, or a picture of the verse (like a verse image) to send or save.
      msg.innerHTML = `<span class="vs-where">Share:</span> ${navigator.share ? `<button type="button" class="small" data-share="words">The words</button> ` : ""}${text ? `<button type="button" class="small" data-share="pic">🖼 A verse picture</button>` : ""}`;
      msg.querySelector('[data-share="words"]')?.addEventListener("click", async () => { try { await navigator.share({ text: quote }); } catch { /* they closed the share sheet */ } });
      msg.querySelector('[data-share="pic"]')?.addEventListener("click", () => { verseSheet.close(); openVersePic({ ref, text, ver }); });
    }
  }));
  // Compare versions: this verse in each version the family has, side by side (like a parallel Bible).
  verseSheet.querySelector(".vs-compare")?.addEventListener("toggle", async (e) => {
    const box = e.currentTarget.querySelector(".vs-clist");
    if (!e.currentTarget.open || box.dataset.done) return;
    box.dataset.done = "1";
    const rows = await Promise.all(versionList().map(async ([id, label]) => {
      try {
        const res = await getChapter(id, book, chapter);
        const div = document.createElement("div"); div.innerHTML = sanitize(res.html);
        const t = (verseTextNodes(div).get(v) || []).map((n) => n.textContent).join("").replace(/\s+/g, " ").trim();
        return `<p class="vs-cver${id === store.get("version") ? " is-mine" : ""}"><b>${esc(label)}</b> ${t ? esc(t) : `<span class="muted">Not found in this version.</span>`}</p>`;
      } catch { return `<p class="vs-cver"><b>${esc(label)}</b> <span class="muted">Couldn't load this version right now.</span></p>`; }
    }));
    box.innerHTML = rows.join("");
  });
  fillVerseTools(book, chapter, v);
  if (!verseSheet.isConnected) document.body.append(verseSheet); // added when first used, after the word sheet
  if (!verseSheet.open) verseSheet.showModal();
}
/* ---------- Cross-references and the original words, for every verse ---------- */
const xrefCache = {};
function loadXref(book, chapter) {
  const k = `${book}.${chapter}`;
  if (!xrefCache[k]) xrefCache[k] = fetch(`data/xref/${k}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((d) => { if (!d) delete xrefCache[k]; return d; });
  return xrefCache[k];
}
// "JHN.7.47-50" or "GEN.1.31-2:3" → the parts and a name to show.
function parseXref(s) {
  const [b, c, rest] = s.split(".");
  const [v, end] = rest.split("-");
  const [endC, endV] = end?.includes(":") ? end.split(":").map(Number) : [Number(c), end ? Number(end) : Number(v)];
  const name = `${BOOK_BY_ID[b]?.name || b} ${c}:${v}${end ? `-${end}` : ""}`;
  return { book: b, chapter: Number(c), verse: Number(v), endC, endV, name };
}
async function fillVerseTools(book, chapter, v) {
  const me = `${book}.${chapter}.${v}`;
  verseSheet.dataset.v = me;
  const [x, rows] = await Promise.all([loadXref(book, chapter), loadStrongs(book, chapter)]);
  if (verseSheet.dataset.v !== me) return; // another verse was opened meanwhile
  const xbox = verseSheet.querySelector(".vs-xref"), obox = verseSheet.querySelector(".vs-orig");
  const refs = (x?.[String(v)] || []).map(parseXref);
  if (xbox && refs.length) {
    xbox.hidden = false;
    xbox.querySelector("summary").textContent = `Cross-references (${refs.length})`;
    xbox.querySelector(".vs-xlist").innerHTML = refs.map((r, i) => `<div class="vs-x"><button type="button" class="vs-xbtn" data-x="${i}" aria-expanded="false">${esc(r.name)}</button><div class="vs-xtext" hidden></div></div>`).join("");
    xbox.querySelectorAll("[data-x]").forEach((b) => b.addEventListener("click", async () => {
      const r = refs[Number(b.dataset.x)], box = b.nextElementSibling;
      const open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(open)); box.hidden = !open;
      if (!open || box.dataset.done) return;
      box.innerHTML = `<p class="muted small-print">Loading…</p>`;
      let words = "";
      try {
        const html = (await getChapter(store.get("version"), r.book, r.chapter)).html;
        const last = r.endC === r.chapter ? r.endV : r.verse + 2;
        const parts = [];
        for (let n = r.verse; n <= Math.min(last, r.verse + 5); n += 1) { const t = verseFromHtml(html, n); if (t) parts.push(t); }
        words = parts.join(" ") + (last > r.verse + 5 || r.endC !== r.chapter ? " …" : "");
      } catch { /* shown below */ }
      box.dataset.done = words ? "1" : "";
      box.innerHTML = `${words ? `<p class="vs-xwords">${esc(words)}</p>` : `<p class="muted small-print">This verse couldn't load just now.</p>`}<button type="button" class="small" data-go>Go to ${esc(r.name)}</button>`;
      box.querySelector("[data-go]").addEventListener("click", async () => { verseSheet.close(); showView("read"); await openChapter(r.book, r.chapter); setTimeout(() => goToVerse(r.verse), 300); });
    }));
  }
  const words = (rows || []).filter((r) => r[5]?.includes(v)).sort((a, b) => (a[6] ? 1 : 0) - (b[6] ? 1 : 0));
  if (obox && words.length) {
    obox.hidden = false;
    obox.querySelector("summary").textContent = `${BOOK_BY_ID[book].testament === "OT" ? "Hebrew" : "Greek"} words in this verse (${words.length})`;
    obox.querySelector(".vs-olist").innerHTML = words.map((r) => origCard(r)).join("");
    wireOrig(obox);
  }
}
$("#reader").addEventListener("click", (e) => {
  const m = e.target.closest?.(".v, .verse-num, .chapter-num, [data-number]");
  if (!m || !$("#reader").contains(m)) return;
  const v = markNum(m);
  if (v) openVerseSheet(v);
});
// Every verse someone has highlighted or bookmarked, newest first (My Bible, Saved).
function renderVerseMarks() {
  const el = $("#verseMarksList");
  if (!el) return;
  const all = store.allVerseMarks();
  el.innerHTML = `<h2 class="home-h">Saved verses</h2>${all.length ? all.map((x) => {
    const [b, c, v] = x.key.split(".");
    return `<button class="log-row vm-row" data-vm="${esc(x.key)}"><strong>${x.color ? `<span class="vm-dot hl-${x.color}" aria-hidden="true"></span>` : ""}${x.bookmark ? "🔖 " : ""}${esc(BOOK_BY_ID[b]?.name || b)} ${c}:${v}</strong><small>${x.bookmark && x.color ? "Bookmarked and highlighted" : x.bookmark ? "Bookmarked" : "Highlighted"} · ${fmtDate(x.updated)}</small></button>`;
  }).join("") : `<p class="empty">Tap a verse number while you read to highlight or bookmark a verse. It will be kept here.</p>`}<h2 class="home-h">Favorite chapters</h2>`;
  el.querySelectorAll("[data-vm]").forEach((b) => b.addEventListener("click", async () => {
    const [bk, c, v] = b.dataset.vm.split(".");
    showView("read"); await openChapter(bk, Number(c)); setTimeout(() => goToVerse(Number(v)), 300);
  }));
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

/* ---------- My Bible: history & favorites ---------- */
document.querySelectorAll(".segments button").forEach((b) => b.addEventListener("click", () => { segment = b.dataset.seg; renderMyStudy(); }));
$("#myBibleGo").addEventListener("click", () => { const { book, chapter } = store.get("last"); showView("read"); openChapter(book, chapter); });
function renderMyStudy() {
  { const { book, chapter } = store.get("last"); $("#myBibleGoRef").textContent = `${BOOK_BY_ID[book]?.name || "John"} ${chapter || 1}`; }
  document.querySelectorAll(".segments button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.seg === segment)));
  if (document.body.dataset.view === "books") markNav(segment === "journal" ? "journal" : "books");
  document.querySelectorAll("[data-seg-panel]").forEach((p) => { p.hidden = p.dataset.segPanel !== segment; });
  if (segment === "progress") { renderProgress(); renderKnowledge(); }
  if (segment === "journal") { renderDiaryToday(); renderJournalList(); }
  if (segment === "history") renderLog("#historyList", store.allVisits(), (v) => `
    <strong>${esc(keyRef(v.key).name)}</strong><span class="tag">${store.isFavorite(keyRef(v.key).book, keyRef(v.key).chapter) ? "♥ " : ""}${store.isRead(keyRef(v.key).book, keyRef(v.key).chapter) ? "Read" : ""}</span>
    <small>Visited ${v.count} time${v.count === 1 ? "" : "s"} · last ${fmtDate(v.last)}</small><span></span>
    ${v.count > 1 ? `<span class="log-dates">Visits: ${v.dates.slice(0, 6).map(fmtDate).join(" · ")}</span>` : ""}`, "Chapters you open will show up here with the dates you studied them.");
  if (segment === "favorites") renderVerseMarks();
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
  // Wandered off to read something else? One tap goes back to your place on the path.
  let back = $("#backToPlace");
  if (!back) { back = Object.assign(document.createElement("button"), { id: "backToPlace", className: "next-in-path back-to-place" }); btn.after(back); }
  const place = nextUnread(pathId);
  const away = place && !(place.book === book && place.chapter === chapter) && !(next && place.book === next.book && place.chapter === next.chapter);
  back.hidden = !away;
  if (away) {
    back.textContent = `↩ Back to my place: ${BOOK_BY_ID[place.book].name} ${place.chapter}`;
    back.onclick = () => openChapter(place.book, place.chapter);
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
  if (Number.isNaN(new Date((store.get("pathStarted") || {})[active]).getTime())) store.set("pathStarted", { ...(store.get("pathStarted") || {}), [active]: new Date().toISOString() }); // brought in without a start date
  const plan = store.get("yearPace") ? todayPlan(active) : null;
  const started = store.get("pathStarted")[active];
  const days = Math.floor((Date.now() - new Date(started)) / 86400000); // whole days since starting
  const yearPace = Math.floor((days / 365) * list.length);
  const paceText = done >= yearPace ? "You're on pace to finish within a year." : `${yearPace - done} chapters behind a one-year pace. No pressure: go at your own pace.`;
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
        ${s.readings.map((r) => `<p class="reading-label">${esc(readingLabel(r))}</p>${active === "audience" ? audienceNoteHtml(r.split(" ")[0]) : ""}<div class="chapter-grid">${expandReading(r).map((c) => {
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
  onSource(src) { syncNarrator(src); },
  onState(state) {
    $("#listenBtn").setAttribute("aria-pressed", String(state === "playing" || state === "loading"));
    syncPlayBtn(state === "playing" || state === "loading", state === "loading");
    updateDrive(state);
  },
  onEnd() {
    // Sleep timer set to "end of this chapter": stop here.
    if (sleepAt === "chapter") { sleepAt = 0; $("#sleepSel").value = "0"; syncSleepNote(); return; }
    // Repeat: read the same chapter again from the top.
    if ($("#repeatBtn")?.getAttribute("aria-pressed") === "true") { reader.index = 0; setTimeout(() => reader.play(), 900); return; }
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
  // A path brought in from another device may have no start date yet: count from today.
  let started = new Date((store.get("pathStarted") || {})[pathId]).getTime();
  if (!Number.isFinite(started)) { started = Date.now(); store.set("pathStarted", { ...(store.get("pathStarted") || {}), [pathId]: new Date().toISOString() }); }
  const end = started + 365 * DAY;
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
// Unlocking: a big number pad on the screen, like a phone's lock screen, so nobody has to
// find the right keyboard. It opens as soon as the right passcode is tapped in.
function unlockForm(onDone) {
  const wrap = Object.assign(document.createElement("div"), { className: "keypad-wrap" });
  wrap.innerHTML = `<p class="kp-title">🔒 Your journal is locked</p><p class="muted small-print">Tap your passcode.</p>
    <div class="kp-dots" aria-live="polite"></div>
    <div class="keypad">${["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"].map((k) => `<button type="button" data-kp="${k}" aria-label="${k === "⌫" ? "Delete" : k === "✓" ? "Unlock" : k}">${k}</button>`).join("")}</div>
    <p class="kp-msg" role="alert"></p>`;
  let code = "";
  const dots = wrap.querySelector(".kp-dots"), msg = wrap.querySelector(".kp-msg");
  const show = () => { dots.innerHTML = Array.from({ length: Math.max(4, code.length) }, (_, i) => `<i class="${i < code.length ? "on" : ""}"></i>`).join(""); };
  const tryIt = async (final) => {
    if (code.length >= 4 && await hashCode(code) === store.get("journalLock")) { journalUnlocked = true; onDone(); return; }
    if (final) { msg.textContent = "That passcode doesn't match. Try again."; code = ""; show(); wrap.classList.remove("shake"); void wrap.offsetWidth; wrap.classList.add("shake"); }
  };
  wrap.querySelectorAll("[data-kp]").forEach((b) => b.addEventListener("click", () => {
    const k = b.dataset.kp;
    msg.textContent = "";
    if (k === "⌫") code = code.slice(0, -1);
    else if (k === "✓") { tryIt(true); return; }
    else if (code.length < 8) code += k;
    show();
    tryIt(code.length === 8);
  }));
  // A keyboard still works too, for anyone who has one.
  wrap.tabIndex = -1;
  wrap.addEventListener("keydown", (e) => {
    if (/^\d$/.test(e.key) && code.length < 8) { code += e.key; show(); tryIt(code.length === 8); }
    else if (e.key === "Backspace") { code = code.slice(0, -1); show(); }
    else if (e.key === "Enter") tryIt(true);
  });
  show();
  return wrap;
}
const JOURNAL_BOXES = [
  { field: "text", label: "Thoughts", icon: "✎", ph: (ref) => `What is ${ref} saying to you today? How does it make you feel?` },
  { field: "prayer", label: "Prayers", icon: "🙏", ph: () => "Who and what are you praying for?" },
  { field: "gratitude", label: "Gratitude", icon: "❀", ph: () => "What are you thankful for today?" },
];
// "Tuesday, Nov 24, 2026 · 8:15 PM": the date and time stamp for journal entries.
const stampNow = (d = new Date()) => `${d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric", year: "numeric" })} · ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
const whenSaved = (e) => e ? `Started ${fmtDate(e.created)} · last saved ${stampNow(new Date(e.updated))}` : "Saves by itself as you type";
// The journal under each chapter: the same "Add entry" buttons, with the chapter attached,
// and this chapter's entries listed underneath. Older three-box notes stay readable and editable.
function renderJournal() {
  const { book, chapter } = store.get("last");
  const key = `${book}.${chapter}`;
  const inner = $("#journalInner");
  const entry = store.journalEntry(book, chapter);
  const mine = store.allEntries().filter((e) => e.ref === key && NOTE_KINDS.includes(e.kind));
  const oldFilled = entry ? JOURNAL_BOXES.filter((b) => (entry[b.field] || "").trim()) : [];
  const count = mine.length + (oldFilled.length ? 1 : 0);
  const mineTile = $('.ref-tile[data-tab="mine"] .rt-sub');
  if (mineTile) mineTile.textContent = count ? `${count} note${count === 1 ? "" : "s"}` : "Write one";
  $("#journalHint").textContent = count ? `${count} note${count === 1 ? "" : "s"} on this chapter. Tap to read or add more.` : "Study comments, research and verse cards";
  inner.innerHTML = "";
  // Notes are never locked. Personal reflections (the Journal) live in the side menu.
  const top = document.createElement("div");
  top.innerHTML = `<div class="add-entries"><button class="add-entry ae-note" data-add="note"><span aria-hidden="true">📝</span><b>＋ A note on ${esc(refName({ book, chapter }))}</b></button></div>
    <div class="entry-host" id="chapterEntryHost"></div>
    ${mine.length ? `<div class="chapter-entries">${mine.map((e) => `<button class="log-row entry-row er-${e.kind}" data-entry="${e.id}"><strong>${KIND[e.kind]?.icon || ""} ${esc(e.title || KIND[e.kind]?.label || "")}${e.answered ? " · answered ✓" : ""}</strong><small>${esc(stampNow(new Date(e.created)))}</small><span class="log-dates">${entrySnippet(e)}</span></button>`).join("")}</div>` : ""}
    <p class="muted small-print">📝 Notes are for study: comments, research and verses. They're never locked, and they're all in Notes in the menu. Personal reflections and prayers go in your <button type="button" class="quiet-link" data-to-journal>✎ Journal</button>.</p>`;
  inner.append(top);
  top.querySelector("[data-to-journal]")?.addEventListener("click", () => showView("journal"));
  top.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => openEntry({ kind: b.dataset.add, ref: key }, $("#chapterEntryHost"))));
  top.querySelectorAll("[data-entry]").forEach((b) => b.addEventListener("click", () => openEntry({ id: b.dataset.entry }, $("#chapterEntryHost"))));
  if (!oldFilled.length) return;
  // Notes written before entries existed: still here, still editable.
  const old = Object.assign(document.createElement("details"), { className: "old-notes" });
  old.innerHTML = `<summary>Earlier notes on this chapter</summary>`;
  const saved = Object.assign(document.createElement("p"), { className: "saved", textContent: whenSaved(entry) });
  for (const box of oldFilled) {
    const wrap = Object.assign(document.createElement("label"), { className: `journal-box jb-${box.field}` });
    wrap.innerHTML = `<span class="jb-label"><span aria-hidden="true">${box.icon}</span> ${box.label}</span>`;
    const ta = Object.assign(document.createElement("textarea"), { rows: 3, value: entry[box.field] || "" });
    ta.id = box.field === "text" ? "journalText" : `journal-${box.field}`;
    let t;
    ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { store.setJournalField(book, chapter, box.field, ta.value); saved.textContent = `Saved ✓ ${stampNow()}`; }, 500); });
    wrap.append(ta);
    old.append(wrap);
  }
  old.append(saved);
  inner.append(old);
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
// Only the family's shared Bible helper; nobody is sent off to other AI sites.
const PARTNERS = [["", "Bible helper", TALK_ICON, null]];
// A couple of playful ones too, so people find out he can really do things.
const BUDDY_FUN = ["Do a trick!", "Can you jump rope?", "Dance for me!", "Tell me about yourself", "Do a cartwheel!", "Play catch with me!"];
const pickTwo = (list) => { const a = [...list].sort(() => Math.random() - 0.5); return a.slice(0, 2); };
const CHAT_IDEAS = ["What's the main point of this chapter?", "What was happening when this was written?", "How does this point to Jesus?", "What does a key word mean in the original language?", "How can I live this out this week?", "How would I explain this to a friend who isn't a believer?"];
const currentPartner = () => PARTNERS[0];
const builtIn = (p) => p && p[0] === "";
function renderPartnerPicks() {
  if ($("#partnerHint")) $("#partnerHint").textContent = "Ask questions and get answers right here";
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
  setup: "The built-in helper isn't turned on yet. Whoever set up the app can switch it on.",
  monthly: "The family has used all of this month's questions, so I'm resting until the 1st. These questions are a gift provided by the app developer. For more, please contact the app developer.",
  credits: "The family's question credits are used up for now. These questions are a gift provided by the app developer. For more, please contact the app developer.",
  offline: "I couldn't connect. Check your internet and try again.",
  refused: "I'm not able to help with that one. Try asking another way, or talk it over with someone you trust.",
  busy: "I'm a little busy right now. Please try again in a minute.",
};
async function askBuiltIn(q) {
  const { book, chapter } = store.get("last");
  const ver = (versionList().find(([v]) => v === store.get("version")) || ["", "NASB"])[1];
  chatTurns.push({ role: "user", content: q });
  chatBusy = true; $("#partnerGo").disabled = true;
  const wait = chatBubble("them", pickOne(sadAsk(q) ? CARE_WAIT : HAPPY_WAIT), "typing");
  buddy.thinking(true); clearTimeout(lookT); document.querySelectorAll(".buddy.lookup").forEach((x) => x.classList.remove("lookup")); chatPose("look", 60000);
  if (/\b(greek|hebrew|aramaic|scholar|commentar|historian|archaeolog|manuscript|translat|original language|strong'?s)\w*/i.test(q)) buddy.nerd(9000);
  const r = await askHelper({ messages: chatTurns, ref: `${BOOK_BY_ID[book].name} ${chapter}`, version: ver, name: store.get("name") || "", style: store.get("helperStyle") || "", buddy: buddyName() });
  wait.remove();
  buddy.thinking(false); chatAnswered();
  chatBusy = false; $("#partnerGo").disabled = false;
  if (r && r.text) {
    // The helper can ask him to act something out: [[do:dance]] at the end of its answer.
    let doIt = null;
    const text = String(r.text).replace(/\[\[do:([a-z]+)\]\]/gi, (m, a) => { doIt ||= a.toLowerCase(); return ""; }).trim().replace(/\*\*|__/g, "").replace(/^#+\s*/gm, "");
    if (doIt && BUDDY_ACTIONS[doIt]) setTimeout(() => buddyAct(doIt), 300);
    chatTurns.push({ role: "assistant", content: text });
    chatBubble("them", text);
    buddySpeak(text);
    if (r.warn) helperWarning(r);
    return;
  }
  chatTurns.pop();
  const why = r?.error || "busy";
  chatBubble("them", why === "shared"
    ? `You've had your ${r.per_person || 100} questions this month and some extras. What's left is saved so everyone else in the family gets their ${r.per_person || 100} too. Your questions come back on the 1st. These questions are provided by the app developer; for more, please contact the app developer.`
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
  const { book, chapter } = store.get("last");
  $("#chatLog").innerHTML = "";
  chatTurns = [];
  const hi = `Hi${store.get("name") ? ` ${store.get("name")}` : ""}!`, ref = `${BOOK_BY_ID[book].name} ${chapter}`;
  chatBubble("them", pickOne([
    `${hi} Ask me about anything! 😊`,
    `${hi} Want help with ${ref}? I'd love to dig in with you.`,
    `${hi} Get to know me! Ask me anything about me, or about ${ref}.`,
    `${hi} Ask me about ${ref}, Bible people and places, or anything you're wondering.`,
    `${hi} Want help with ${ref}? Or just tell me to do something fun, like "jump rope"! 🪢`,
  ]));
  $("#chatSuggest").innerHTML = [...CHAT_IDEAS, ...pickTwo(BUDDY_FUN)].map((q) => `<button type="button" class="chat-idea">${esc(q)}</button>`).join("");
  $("#chatSuggest").querySelectorAll(".chat-idea").forEach((b) => b.addEventListener("click", () => { $("#partnerQ").value = b.textContent; sendChat(); }));
}
// Buddy's heart: excited to help, and gentle when the question is about something sad.
const pickOne = (list) => list[Math.floor(Math.random() * list.length)];
const SAD_WORDS = /\b(died|dies|dying|death|dead|passed away|funeral|grie(f|ving)|mourn\w*|sad|sadness|cry|crying|lonely|alone|depress\w*|anxious|anxiety|afraid|scared|fear|worried|worry|sick|cancer|hospital|illness|divorce|hurt\w*|pain|suffer\w*|lost (my|a|our)|miss (my|him|her|them)|heartbroken|broken|hopeless|ashamed|guilt\w*|forgive me)\b/i;
const sadAsk = (q) => SAD_WORDS.test(q);
const HAPPY_WAIT = ["Oh yeah, I can find something", "Ooh, good question! Let me look", "Ooh, I love this one! Finding it now", "Oh! I know where to look"];
const CARE_WAIT = ["I'm so sorry. Let me find something that might help", "That sounds hard. I'm right here with you. Let me look", "Oh, friend. Let me find some comfort in God's Word for you"];
function buddyFeels(q) {
  const sad = sadAsk(q), face = chatSheet.querySelector(".buddy-inline");
  buddy.caring(sad);
  face.classList.toggle("caring", sad);
  if (!sad) { buddy.excite(); face.classList.remove("excited"); void face.offsetWidth; face.classList.add("excited"); setTimeout(() => face.classList.remove("excited"), 1400); }
}
// In the chat he keeps busy like a real friend: while he looks up an answer he sits down to read
// his Bible or write at his desk; then he looks up and talks. Between questions he now and then
// reads in his chair, swings his feet or waves. Nothing moves when motion is turned down.
const chatFace = () => chatSheet.querySelector(".buddy-inline");
const calmChat = () => store.get("graphics") === "simple" || matchMedia("(prefers-reduced-motion: reduce)").matches;
const POSES = ["reading", "writing", "waving", "swing", "flowering"];
document.addEventListener("input", (e) => { if (e.target?.id === "partnerQ") lookUp(); });
function chatPose(kind, ms) {
  const f = chatFace();
  if (!f || calmChat()) return;
  f.classList.remove(...POSES, "talking");
  if (kind === "look") { seat(f, pickOne(["chair", "desk", "ground"]), ms); f.classList.add(f.classList.contains("desk") ? "writing" : "reading"); }
  else if (kind === "read") { seat(f, "chair", ms); f.classList.add("reading"); }
  else if (kind === "swing") { seat(f, "ground", ms); f.classList.add("swing"); }
  else f.classList.add(kind);
  // Not always the big grin: sometimes a softer smile, sometimes a serious, thinking look.
  f.classList.remove("mood-soft", "mood-focus");
  if (kind === "swing" && Math.random() < .5) f.classList.add(pickOne(["mood-soft", "mood-focus"]));
  clearTimeout(f._poseT);
  f._poseT = setTimeout(() => { f.classList.remove(...POSES, "mood-soft", "mood-focus"); }, ms);
}
// When someone starts talking to him (typing in the chat), he looks up at them from his book or desk.
let lookT = 0;
function lookUp() {
  const both = [chatFace(), document.querySelector(".buddy:not(.buddy-inline)")].filter(Boolean);
  both.forEach((x) => x.classList.add("lookup"));
  clearTimeout(lookT);
  lookT = setTimeout(() => both.forEach((x) => x.classList.remove("lookup")), 5000);
}
function chatAnswered() {
  const f = chatFace();
  if (!f) return;
  clearTimeout(f._poseT); clearTimeout(f._seatT);
  f.classList.remove(...POSES, "chair", "desk", "sitting", "mood-soft", "mood-focus");
  if (calmChat()) return;
  f.classList.add("talking"); setTimeout(() => f.classList.remove("talking"), 2600);
}
setInterval(() => {
  if (!chatSheet.open || chatBusy || document.hidden || Math.random() < .5) return;
  chatPose(pickOne(["read", "read", "swing", "waving"]), 6000);
}, 15000);
// Does an action on the screen, and in the chat's own little picture of him when it's open.
function buddyAct(name) {
  const face = chatSheet.open ? chatSheet.querySelector(".buddy-inline") : null;
  const did = buddy.act(name, face);
  if (did && did !== "nap" && did !== "wake") {
    // A private, per-person tally of what they've asked him to do (for his growing later).
    const c = store.get("buddyDid") || {}; c[did] = (c[did] || 0) + 1; store.set("buddyDid", c);
  }
  return did;
}
// Time together: each chat, game or thing they teach him. Now and then it unlocks a prop.
let propNews = null;
function buddyTogether() {
  const n = (store.get("buddyTogether") || 0) + 1;
  store.set("buddyTogether", n);
  const p = newProp(n);
  if (p) propNews = p;
}
let scaredOf = "", scaredAt = 0;
async function sendChat() {
  const q = $("#partnerQ").value.trim();
  if (!q) { $("#partnerQ").focus(); return; }
  if (chatBusy) return;
  chatBubble("me", q);
  $("#partnerQ").value = "";
  // A simple thank-you: hearts from him, and a warm reply right away (no need to look anything up).
  if (/^[\s\p{P}]*(thank(s| you)( so much| very much)?|thx|ty|love you)([\s,]+\p{L}+){0,3}[\s\p{P}\p{Extended_Pictographic}]*$/iu.test(q)) {
    buddy.love();
    chatBubble("them", pickOne(["You're so welcome! 💕", "Anytime, friend! 😊", "Aww, you're welcome! I love helping you. 💕"]));
    return;
  }
  // "Jump rope!", "Can you dance?": he just does it, right away (no need to look anything up).
  const cmd = buddyCommand(q, buddyName());
  if (cmd) {
    // On a phone or tablet the chat covers the screen, so it steps aside and he does it out
    // in the open, saying his line in his own bubble. Tap him to keep chatting.
    const hidden = buddy.el.hidden;
    if (!hidden && chatSheet.open && !chatSheet.classList.contains("side")) { chatSheet.close(); await new Promise((r) => setTimeout(r, 350)); }
    const did = buddyAct(cmd);
    const line = did ? pickOne(BUDDY_ACTIONS[did].say) : "I'd love to, but I'm turned off right now. You can turn me back on in Settings. 😊";
    chatBubble("them", line);
    if (did && !chatSheet.open) buddy.says(line, Math.max(4000, BUDDY_ACTIONS[did].ms + 1500));
    return;
  }
  const who = store.get("name")?.trim() || "";
  // Checking on him: "Are you okay?", "Don't be scared." He feels better, and says so.
  if (checkingOn(q)) {
    const of = Date.now() - scaredAt < 15 * 60e3 ? scaredOf : "";
    scaredOf = ""; scaredAt = 0;
    buddy.love(); buddyTogether();
    const line = comfortLine({ scaredOf: of, name: who, warmth: warmthLevel(store.get("buddyTogether")) });
    chatBubble("them", line); buddySpeak(line);
    return;
  }
  // Teaching him: "Remember that I love horses", "My favorite verse is John 3:16".
  if (ASK_MEMORY.test(q)) { const line = memoryLine(store.get("buddyMemory") || [], who); chatBubble("them", line); return; }
  if (FORGET_ALL.test(q)) { store.set("buddyMemory", []); chatBubble("them", "Okay, I've forgotten everything you taught me. We can start fresh any time. 😊"); return; }
  if (FORGET_LAST.test(q) && (store.get("buddyMemory") || []).length) { const [gone, ...rest] = store.get("buddyMemory"); store.set("buddyMemory", rest); chatBubble("them", `Okay, I forgot that ${gone.key ? `your ${gone.key} is ${gone.text}` : gone.text}. 👍`); return; }
  const fact = learnFrom(q);
  if (fact) {
    store.set("buddyMemory", remember(store.get("buddyMemory") || [], fact));
    buddy.love(); buddyTogether();
    const line = learnedLine(fact, who);
    chatBubble("them", line); buddySpeak(line);
    buddyPropNews();
    return;
  }
  buddyTogether();
  // "What day is it?", "How long have I been studying?": he just knows.
  const when = timeAnswer(q, { sessionMs: studyMs, season: seasonNow(new Date(), easterOf(new Date().getFullYear())) });
  if (when) { chatBubble("them", when); buddySpeak(when); return; }
  // "Where do I change the text size?": he answers and offers to show them the spot.
  const how = guideAnswer(q);
  if (how) {
    const row = chatBubble("them", how.say);
    buddySpeak(how.say);
    if (how.go) {
      const b = Object.assign(document.createElement("button"), { type: "button", className: "small chat-show", textContent: how.label || "Show me" });
      b.addEventListener("click", () => buddyShowPlace(how.go));
      row.querySelector(".chat-bubble").append(document.createElement("br"), b);
    }
    return;
  }
  buddyFeels(q);
  await askBuiltIn(q);
}
// A new prop unlocked: he says so in the chat ("I found a little boat!").
function buddyPropNews() {
  const p = propNews;
  if (!p) return;
  propNews = null;
  setTimeout(() => chatBubble("them", `Guess what? Spending time with you, I found ${p.name}! ${p.icon} I'll bring it out when we read that story.`), 900);
}
// Takes them to a place in the app and points it out with a soft glow (no tour, no popups).
function buddyShowPlace(go) {
  if (chatSheet.open) chatSheet.close();
  if (go === "games") { quest.open(); return; }
  const [view, sel] = go;
  if (view === "read") { const { book, chapter } = store.get("last"); showView("read"); openChapter(book, chapter); }
  else showView(view);
  if (!sel) return;
  setTimeout(() => {
    const el = revealSetting(document.querySelector(sel));
    if (!el) return;
    const spot = el.closest(".field, .switch-row, .card") && !el.matches(".card, h2") ? el.closest(".field, .switch-row") || el : el;
    spot.scrollIntoView({ block: "center" });
    spot.classList.remove("buddy-point"); void spot.offsetWidth; spot.classList.add("buddy-point");
    setTimeout(() => spot.classList.remove("buddy-point"), 3200);
  }, 250);
}
/* ---------- Games: Bible Spin, plus the older practice quiz ---------- */
const game = createGame({
  store, esc,
  myName: () => store.get("name")?.trim() || "Me",
  lively: () => (store.get("graphics") || "full") === "full",
  // Confetti in the look's own colors (its swatches plus the accent color in use).
  lookColors: () => {
    const sw = (LOOKS.find(([v]) => v === store.get("style")) || LOOKS[0])[3];
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    return [...sw, accent, "#f4d35e"].filter(Boolean);
  },
});
// Bible Spin is the main game; the older quiz stays as "Practice one part of the Bible".
const quest = createQuest({
  store, esc,
  myName: () => store.get("name")?.trim() || "Me",
  lively: () => (store.get("graphics") || "full") === "full",
  lookColors: () => ["#ffcf3f", "#ff7a59", "#5cc46b", "#3d8bb0", "#8e6bb5"],
  practice: () => game.open(),
  buddyName: () => buddyName(),
  // A win at trivia: he can hardly contain himself (once the game window closes).
  onWin: (mode) => buddyAfterDialogs(() => {
    if (mode === "buddy") buddyTogether();
    if (mode === "buddy") {
      // Beaten! A little pout... then a good sport.
      buddy.mood("cry", 2200);
      setTimeout(() => buddy.celebrate(pickOne(["Aww, I lost... 😢 But hey, YOU won! Great game! 🏆", "So close! 😅 You beat me fair and square. Good game! 🤝", "You got me! That was so fun. You were amazing! 🏆"]), "trophy"), 2400);
    } else buddy.celebrate(pickOne([`You WON! 🏆 That was amazing, ${store.get("name")?.trim() || "friend"}!`, "Woohoo! You're a trivia champion! 🎉", "YES! I knew you could do it! 🏆"]), "trophy");
  }),
  // He won: a happy little victory dance, and then he's a good sport about it.
  onBuddyWin: () => buddyTogether() || buddyAfterDialogs(() => buddy.celebrate(pickOne(["I WON! 🎉 *victory dance* ...good game though. You almost had me!", "Woohoo, I won! 🏆 You were awesome too. Rematch sometime?", "Yay me! 😄 Okay, okay, I'll stop cheering. Good game, friend!"]), "party")),
});
// He says his little lines out loud too, when the family turns that on (Settings, Study buddy).
// Never over the Bible reading, and off by default so he's never a surprise in church.
function buddyOutLoud(text) {
  if ((store.get("show") || {}).buddyvoice !== true || !canSpeak || reader.playing) return;
  const plain = String(text).replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, "").trim();
  if (plain) sayAloud(plain, { voiceName: store.get("voiceName") || "", rate: Math.min(1.15, (store.get("voiceRate") || 1) * 1.05), pitch: 1.35 });
}
const buddy = createBuddy({ onTap: openBuddyChat, defaultSide: () => ($("#mascot") && !$("#mascot").hidden ? "left" : "right"), sayOutLoud: (t) => buddyOutLoud(t), sleepy: () => (store.get("show") || {}).buddysleepy === true });
// Scholarly things (Strong's, Greek and Hebrew, the scholars, sources): on go his nerd glasses,
// now and then, never more than once every couple of minutes.
let nerdAt = 0;
function buddyNerd() { if (Date.now() - nerdAt < 120e3 || Math.random() < 0.4) return; if (buddy.nerd()) nerdAt = Date.now(); }
// When they write, sometimes he pulls out his own paper and pencil. Not every time.
let writeAt = Date.now();
document.addEventListener("input", (e) => {
  if (!e.target.closest?.("#entryEditor, #notesEditor, #chapterEntryHost")) return;
  if (Date.now() - writeAt < 180e3) return;
  writeAt = Date.now();
  if (Math.random() < 0.5) buddy.writing();
});
// Tapping him opens the chat right where you are, on any page, in a sheet over the page.
// It's the same chat as under each chapter (moved into the sheet while it's open).
const chatSheet = document.createElement("dialog");
chatSheet.className = "chat-sheet"; chatSheet.id = "chatSheet"; chatSheet.setAttribute("aria-label", "Ask my Bible helper");
chatSheet.innerHTML = `<div class="chat-sheet-head"><span class="buddy buddy-inline" aria-hidden="true"></span><h2>Ask ${esc(buddyName())} anything!<small>Meaning, history, culture, people, places, words in Hebrew and Greek, or how to live it out. A gift for the family from the app's developer.</small></h2><button type="button" class="close-x" id="chatSheetClose" aria-label="Close">×</button></div>`;
document.body.append(chatSheet);
chatSheet.querySelector(".buddy-inline").innerHTML = BUDDY_SVG;
$("#chatSheetClose").addEventListener("click", () => chatSheet.close());
// A tap outside the sheet closes it (but not the tap that opened it).
let chatSheetOpenedAt = 0;
// The tap that opened the chat must not "fall through" onto a button inside it (on iPad
// the panel's microphone button sits right where Buddy was tapped).
chatSheet.addEventListener("click", (e) => { if (Date.now() - chatSheetOpenedAt < 450) { e.preventDefault(); e.stopPropagation(); } }, true);
chatSheet.addEventListener("click", (e) => {
  if (e.target !== chatSheet || Date.now() - chatSheetOpenedAt < 500) return;
  const r = chatSheet.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) chatSheet.close();
});
chatSheet.addEventListener("close", () => {
  const chat = chatSheet.querySelector(".chat"); if (chat) $("#partnerBox").append(chat);
  chatSheet.classList.remove("side");
  buddy.chatting(false); buddy.place();
});
// On iPad the chat slides in as a panel over the right side of the page (the reading keeps
// its full width underneath). On phones it's a sheet over the page.
chatSheet.addEventListener("keydown", (e) => { if (e.key === "Escape" && chatSheet.classList.contains("side")) chatSheet.close(); });
function fitChatPanel() {
  if (!chatSheet.classList.contains("side") || !window.visualViewport) return;
  // Keep the panel inside what's visible, so the keyboard never covers the typing box.
  chatSheet.style.top = `${Math.max(0, visualViewport.offsetTop)}px`;
  chatSheet.style.height = `${visualViewport.height}px`;
}
window.visualViewport?.addEventListener("resize", fitChatPanel);
window.visualViewport?.addEventListener("scroll", fitChatPanel);
function openBuddyChat() {
  const chat = $("#partnerBox .chat");
  if (chat) chatSheet.append(chat);
  if (!chatSheet.open) {
    chatSheetOpenedAt = Date.now();
    // iPad: a panel that slides in over the right side of the page, so the Bible text keeps
    // its full width underneath; tap outside it (or ×) to close. Phones: a sheet over the page.
    if (railMode()) chatSheet.classList.add("side");
    chatSheet.showModal(); fitChatPanel();
  }
  buddy.chatting(true);
  if (!$("#chatLog").childElementCount) resetChat();
  checkHelperStanding();
  setTimeout(() => $("#partnerQ").focus({ preventScroll: true }), 80);
}
// Now and then he walks over to say hi or ask if they're wondering anything. Gentle: only
// after a few minutes of use, never while reading aloud, typing, or in another window, at
// most three times a day, and never if turned off.
// Each person names their own study buddy (first setup, or Settings); "Buddy" until they do.
function buddyName() { return (store.get("buddyName") || "").trim() || "Buddy"; }
const BUDDY_LINES = [
  (n) => `Hi${n ? ` ${n}` : ""}! 👋 Wondering anything? Ask me!`,
  // Now and then he just checks on them, because he's their friend.
  (n) => `I hope you're doing okay today${n ? `, ${n}` : ""}. I care about you and think about you. You can ask me anything you're wondering.`,
  (n) => `Just checking on you${n ? `, ${n}` : ""}. 💛 I'm glad you're here. Anything on your mind?`,
  () => "I was thinking about you! Hope your day is going well. Want to ask me anything?",
  (n) => `You matter so much${n ? `, ${n}` : ""}. If you're wondering about anything at all, I'm right here.`,
  // Just being a friend: everyday things, and learning the Bible together.
  (n) => `Hey${n ? ` ${n}` : ""}! How's your day going? I'd love to hear about it.`,
  () => "What's the best thing that happened to you today? 😊",
  () => "Have you had some water today? 💧 Even study buddies need reminders!",
  () => "I love learning the Bible with you. Want to find something new together?",
  () => "Did you know you can ask me about anything? Animals, history, how things work... I'll look it up!",
  () => `I'm ${buddyName()}, your study buddy! I'm so glad we get to do this together.`,
  () => "Curious what life was like back then? Tap me and ask!",
  (n, ref) => `Any questions about ${ref}? I'd love to help.`,
  (n, ref) => `Want help with ${ref}? Tap me!`,
  () => "Get to know me! Tap me and ask me anything about me. 😊",
  () => "Psst! Tap me and tell me to \"jump rope\" or \"dance.\" I've been practicing! 🪢",
  () => "Ask me about anything! I mean it. 😄",
  () => "Want to know what a word means in Hebrew or Greek? Ask me!",
  () => "I know lots about Bible people and places. Try me!",
  (n) => `Can I look anything up for you${n ? `, ${n}` : ""}? I'm happy to help.`,
];
// Little things he just says, like a friend sitting nearby. No answer needed.
const BUDDY_CHAT = [
  "I just read about Noah's ark. That's a LOT of animals! 🐘🦒",
  "Fun fact: a mustard seed is teeny tiny, but it grows into a big plant. 🌱",
  "I love quiet time with my Bible. ☕",
  "Psalm 118:24 is one of my favorites: this is the day the Lord has made! ☀️",
  "I've been practicing my trivia. Watch out! 😄",
  "Sometimes I just like sitting here with you. 💛",
  "Did you know the Bible has 66 books? I'm reading them one by one too! 📖",
  "I tried to read all the \"begats\" in one go. I fell asleep. 😴",
  "Don't tell anyone, but I peeked at the end of Revelation. Spoiler: Jesus wins! 🎉",
  "I tried a cartwheel earlier and landed on my head. I'm fine! 😅",
  "Shh... I'm hiding. Okay, I'm bad at hiding. 🙈",
  "If I had a camel I'd name it Humphrey. 🐪",
];
// Now and then (every few days at most) he says he loves them, the casual way a kid would.
const BUDDY_LOVE = [
  (n) => `Hey${n ? ` ${n}` : ""}... love ya! 💛 Okay, back to being cool. 😎`,
  () => "Just so you know, you're my favorite. Don't tell the others. 💛",
  (n) => `Love you${n ? `, ${n}` : ""}! That's all. Carry on! 😊`,
];
// Gentle check-ins, with his own answers.
const BUDDY_CHECKINS = [
  () => ["Have you gotten out of the house today? ☀️", { label: "Yes, I did!", line: "Wonderful! Fresh air is a gift from God. 🌤️" }, { label: "Not yet", line: "Maybe a little walk later? Even the porch counts! 😊" }],
  () => ["Have you talked with someone you love today? 📞", { label: "Yes!", line: "That makes my heart happy! 💕" }, { label: "Not yet", line: "Maybe give someone a call? I bet they'd love it." }],
  () => ["Want to write a little in your journal today? ✏️", { label: "Sure!", line: "Yay! I'll open it for you.", go: () => openMyJourney() }, { label: "Not now", line: "Okie! It'll be right there when you want it." }],
];
function openMyJourney() {
  showView("books");
  document.querySelector('[data-seg="journal"]')?.click();
  openEntry({ kind: "day" }); // right away, so the keyboard comes up on iPad and iPhone
}
// Run something once no window (like the game) is open over the page.
function buddyAfterDialogs(fn, tries = 600) {
  if (!document.querySelector("dialog[open]")) { setTimeout(fn, 400); return; }
  if (tries > 0) setTimeout(() => buddyAfterDialogs(fn, tries - 1), 1000);
}
// A cloud over his head for a sad chapter, hearts for a happy one, lightning for a dramatic one.
const MOOD_WORDS = {
  sad: /\b(wept|weep\w*|mourn\w*|sorrow\w*|grie(f|ve\w*)|lament\w*|sackcloth|tears|famine|afflict\w*|captiv\w*|desolat\w*|died|death|slain|forsaken|anguish)\b/gi,
  happy: /\b(love\w*|joy\w*|rejoic\w*|prais\w*|bless\w*|peace|hope|grace|merc\w*|glad\w*|sing|song|thank\w*|comfort\w*|delight\w*|shepherd)\b/gi,
  dramatic: /\b(fire|storm|thunder\w*|lightning\w*|sword\w*|battle\w*|earthquake|war|plague\w*|flood|smote|struck|chariots?|hail|fought|destroy\w*)\b/gi,
};
let lastMoodRef = "";
function buddyFeelsPassage(text, ref) {
  if (ref === lastMoodRef || (store.get("show") || {}).buddy === false) return;
  lastMoodRef = ref;
  const counts = Object.fromEntries(Object.entries(MOOD_WORDS).map(([k, re]) => [k, (text.match(re) || []).length]));
  const [kind, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const scary = isScary(ref, text);
  if (scary) { pendingMood = { kind: "scared", ref, of: scary }; if (document.body.dataset.view === "read") showPassageMood(); return; }
  if (n < 3) { const p = propFor(ref, store.get("buddyTogether") || 0); if (p) { pendingMood = { kind: p.icon, ref, prop: p }; if (document.body.dataset.view === "read") showPassageMood(); } return; }
  pendingMood = { kind, ref };
  if (document.body.dataset.view === "read") showPassageMood();
}
// Shown once they're actually looking at the chapter.
function showPassageMood() {
  const m = pendingMood;
  if (!m) return;
  pendingMood = null;
  const here = () => { const l = store.get("last"); return l && `${l.book}.${l.chapter}` === m.ref && document.body.dataset.view === "read"; };
  setTimeout(() => {
    if (!here()) return;
    if (buddy.mood(m.kind, 7000) && m.kind === "scared") { scaredOf = m.of; scaredAt = Date.now(); }
    // His story prop (a boat for the storm, a tree for Zacchaeus), once the mood has passed.
    const p = m.prop ? null : propFor(m.ref, store.get("buddyTogether") || 0);
    if (p) setTimeout(() => { if (here()) buddy.mood(p.icon, 6000); }, 8000);
  }, 2500);
}
// Good morning, good evening, and "time for bed?" once each, at the right time of day.
function timeOfDay(h = new Date().getHours()) { return h >= 5 && h < 11 ? "morning" : h >= 17 && h < 21 ? "evening" : h >= 21 || h < 5 ? "late" : ""; }
function buddyTimeHello() {
  const when = timeOfDay();
  if (!when) return false;
  const today = new Date().toDateString(), log = store.get("buddyHello") || {};
  const said = log.day === today ? log.said || [] : [];
  if (said.includes(when)) return false;
  const n = store.get("name")?.trim() || "";
  const text = {
    morning: pickOne([`Good morning${n ? `, ${n}` : ""}! ☀️ I'm so glad you're here.`, `Good morning${n ? `, ${n}` : ""}! ☀️ This is the day the Lord has made!`]),
    evening: pickOne([`Good evening${n ? `, ${n}` : ""}! 🌆 How was your day?`, `Evening${n ? `, ${n}` : ""}! I hope today was a good one. 💛`]),
    late: pickOne([`It's getting late${n ? `, ${n}` : ""}. 🌙 Time for bed soon? Goodnight, sleep well!`, `Yawn... 🥱 it's late! Don't stay up too long${n ? `, ${n}` : ""}. Goodnight! 🌙`]),
  }[when];
  // While reading, no words over the Bible: just a little sun or moon over his head.
  const ok = document.body.dataset.view === "read" ? buddy.mood(when === "morning" ? "morning" : "night", 5000) : buddy.visit(text, 8000, false);
  if (ok) store.set("buddyHello", { day: today, said: [...said, when] });
  return ok;
}
let buddyVisitAt = Date.now() + 4 * 60e3 + Math.random() * 3 * 60e3;
const buddyStartedAt = Date.now();
// How long they've been here this time (only while the app is on screen).
let studyMs = 0, studyTick = Date.now();
const nudgesSaid = [];
setInterval(() => { const t = Date.now(); if (!document.hidden && t - studyTick < 60e3) studyMs += t - studyTick; studyTick = t; }, 10e3);
const awayMs = (() => { const was = store.get("lastOpenAt") || 0; store.set("lastOpenAt", Date.now()); return was ? Date.now() - was : 0; })();
// "Welcome back! Last time you were in John 3. Want to pick up there?" Once a day, on Home only.
function buddyWelcome() {
  const today = new Date().toDateString();
  if (!awayMs || !(store.get("setup") || {}).done || store.get("buddyWelcomeDay") === today || document.body.dataset.view !== "home") return false;
  const { book, chapter } = store.get("last");
  const visited = Object.keys(store.get("visits") || {}).length > 0;
  const path = store.get("activePath");
  const study = path && path !== "general" && PATH_BY_ID[path] ? (PATH_BY_ID[path].short || PATH_BY_ID[path].name || "") : "";
  const place = visited && BOOK_BY_ID[book] ? `${BOOK_BY_ID[book].name} ${chapter}` : "";
  const season = seasonNow(new Date(), easterOf(new Date().getFullYear()));
  const hello = { morning: "Good morning", evening: "Good evening" }[timeOfDay()] || "";
  const warm = ["", "", " I missed studying with you.", " You're my favorite study buddy. 💛", " Studying with you is the best part of my day. 💛"][warmthLevel(store.get("buddyTogether") || 0)];
  const text = welcomeLine({ name: store.get("name")?.trim() || "", place, study, away: awayMs, season, hello }) + warm;
  const ok = place ? buddy.ask(text, { label: "Keep reading", go: () => { showView("read"); openChapter(book, chapter); } }, { label: "Not now", line: "Okie! It'll be right here when you're ready. 😊" }) : buddy.visit(text, 8000, false);
  if (ok) {
    store.set("buddyWelcomeDay", today);
    markActive(); // he said it, so no "Welcome back" window on top of him
    // He already said hello, so no separate "good morning" right after.
    const when = timeOfDay(), log = store.get("buddyHello") || {};
    if (when) store.set("buddyHello", { day: today, said: [...(log.day === today ? log.said || [] : []), when] });
  }
  return ok;
}
// After a long stretch: "We've been studying for 30 minutes! Maybe stretch?" Not over the Bible.
function buddyStudyNudge() {
  const n = sessionNudge(studyMs, nudgesSaid);
  if (!n || document.body.dataset.view === "read") return false;
  if (buddy.visit(n.line, 8000, false)) { nudgesSaid.push(n.mark); if (n.mark === 90) nudgesSaid.push(30); return true; }
  return false;
}
let buddyWaveAt = Date.now() + 90e3 + Math.random() * 90e3;
setInterval(() => {
  if (document.hidden || (store.get("show") || {}).buddy === false || (store.get("show") || {}).buddyvisits === false) return;
  if (reader.playing || document.querySelector("dialog[open]") || document.documentElement.classList.contains("touring")) return;
  // Now and then a little wave from where he sits (no walking, no words).
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
  if (!typing && Date.now() - buddyStartedAt > 15e3 && buddyWelcome()) return;
  if (!typing && Date.now() - buddyStartedAt > 15e3 && buddyTimeHello()) return;
  if (!typing && buddyStudyNudge()) return;
  if (Date.now() >= buddyWaveAt && Date.now() < buddyVisitAt - 60e3) { if (buddy.wave()) buddyWaveAt = Date.now() + 5 * 60e3 + Math.random() * 5 * 60e3; return; }
  if (Date.now() < buddyVisitAt) return;
  // While someone is reading, he never pops up with words over the Bible: he saves his
  // visit for Home or another screen (a wave or a trick from the edge is still fine).
  if (document.body.dataset.view === "read") return;
  const a = document.activeElement;
  if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
  const today = new Date().toDateString(), log = store.get("buddyVisitLog") || {};
  if (log.day === today && log.n >= 2) return; // quiet by default: at most twice a day
  const { book, chapter } = store.get("last");
  // Never named yet (set up before he could be): his first visit asks what to call him.
  if (!store.get("buddyName") && (store.get("setup") || {}).done) {
    if (buddy.askName(`Hi${store.get("name")?.trim() ? ` ${store.get("name").trim()}` : ""}! 👋 I'm your study buddy, and I don't have a name yet. What would you like to call me?`, (n) => setBuddyName(n))) {
      store.set("buddyVisitLog", { day: today, n: log.day === today ? log.n + 1 : 1 });
      buddyVisitAt = Date.now() + 12 * 60e3 + Math.random() * 10 * 60e3;
    }
    return;
  }
  // Near Christmas, Easter or Thanksgiving: would they like the Bible to look like the season?
  const season = seasonOffer();
  if (season) {
    const yesLine = { label: "Yes, please!", go: () => { setStyle(season.look); setTimeout(() => buddy.celebrate(`Ta-da! ${season.icon} So pretty!`), 600); } };
    if (buddy.ask(season.ask, yesLine, { label: "No thanks", line: "Okie! Maybe another time. 😊" })) {
      store.set("seasonAsked", { ...(store.get("seasonAsked") || {}), [season.key]: true });
      store.set("buddyVisitLog", { day: today, n: log.day === today ? log.n + 1 : 1 });
      buddyVisitAt = Date.now() + 12 * 60e3 + Math.random() * 10 * 60e3;
    }
    return;
  }
  if (Date.now() - (store.get("buddyLoveAt") || 0) > 3 * 864e5 && Math.random() > 0.88) {
    if (buddy.visit(pickOne(BUDDY_LOVE)(store.get("name")?.trim() || ""), 7000, false)) {
      store.set("buddyLoveAt", Date.now());
      store.set("buddyVisitLog", { day: today, n: log.day === today ? log.n + 1 : 1 });
      buddyVisitAt = Date.now() + 12 * 60e3 + Math.random() * 10 * 60e3;
    }
    return;
  }
  // Now and then he brings up something they taught him.
  const mem = store.get("buddyMemory") || [];
  if (mem.length && Math.random() < 0.15) {
    if (buddy.visit(recallLine(mem, store.get("name")?.trim() || ""), 8000, false)) {
      store.set("buddyVisitLog", { day: today, n: log.day === today ? log.n + 1 : 1 });
      buddyVisitAt = Date.now() + 12 * 60e3 + Math.random() * 10 * 60e3;
    }
    return;
  }
  // About one visit in four, he asks them to play Bible Spin with him (if games are on).
  if ((store.get("show") || {}).games !== false && Math.random() < 0.25) {
    const n = store.get("name")?.trim() || "";
    const ask = [`Hey${n ? ` ${n}` : ""}! Want to play a round of Bible Spin with me? 🎲`, "I've been practicing my Bible trivia... bet you can't beat me! Want to play?", "Spin the wheel with me? I'll play fair, promise! 😄"];
    if (buddy.invite(ask[Math.floor(Math.random() * ask.length)], "Let's play!", () => quest.challenge())) {
      store.set("buddyVisitLog", { day: today, n: log.day === today ? log.n + 1 : 1 });
      buddyVisitAt = Date.now() + 12 * 60e3 + Math.random() * 10 * 60e3;
    }
    return;
  }
  // Otherwise: a check-in, a little chat, or an offer to help.
  const roll = Math.random();
  let went;
  if (roll < 0.3) { const [q, yes, no] = pickOne(BUDDY_CHECKINS)(); went = buddy.ask(q, yes, no); }
  else if (roll < 0.55) went = buddy.visit(pickOne(BUDDY_CHAT), 8000, false);
  else went = buddy.visit(pickOne(BUDDY_LINES)(store.get("name")?.trim() || "", `${BOOK_BY_ID[book].name} ${chapter}`));
  if (went) {
    store.set("buddyVisitLog", { day: today, n: log.day === today ? log.n + 1 : 1 });
    buddyVisitAt = Date.now() + 12 * 60e3 + Math.random() * 10 * 60e3;
  }
}, 20000);
// When "read answers aloud" is on, the buddy says the answer (stopping the Bible reading first).
function buddySpeak(text) {
  if (!store.get("helperSpeak") || !canSpeak) return;
  if (reader.playing) { reader.pause(); syncPlayBtn(false); }
  buddy.talking(true);
  sayAloud(text, { voiceName: store.get("voiceName") || "", rate: store.get("voiceRate") || 1, onDone: () => buddy.talking(false) });
}
// Before the device's own "allow the microphone?" question, say plainly why it's asking.
const micSheet = document.createElement("dialog");
micSheet.className = "welcome-back mic-sheet"; micSheet.setAttribute("aria-label", "Using the microphone");
document.body.append(micSheet);
function explainMic() {
  if (store.get("micExplained")) return Promise.resolve(true);
  return new Promise((done) => {
    micSheet.innerHTML = `<div class="wb-icon" aria-hidden="true">🎤</div>
      <h2>Ask by talking</h2>
      <p>Your ${/iPad/.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent)) ? "iPad" : /iPhone/.test(navigator.userAgent) ? "iPhone" : "device"} will ask if Bible Study may use the microphone. Tap <strong>Allow</strong> so I can hear your question and type it for you.</p>
      <p class="muted small-print">I only listen while the 🎤 button is red. Tap it again to stop.</p>
      <button type="button" class="big-btn" id="micOk">OK, let's talk</button>
      <button type="button" class="wb-new" id="micNo">I'll type instead</button>`;
    micSheet.showModal();
    $("#micOk").onclick = () => { store.set("micExplained", true); micSheet.close(); done(true); };
    $("#micNo").onclick = () => { micSheet.close(); done(false); };
  });
}
function micTrouble(kind) {
  if (kind === "denied") {
    micSheet.innerHTML = `<div class="wb-icon" aria-hidden="true">🎤</div>
      <h2>The microphone is off for Bible Study</h2>
      <p>No problem, you can still type. To talk instead:</p>
      <ol><li>On an iPhone or iPad, open the <strong>Settings</strong> app, tap <strong>Apps</strong> (or scroll down), then <strong>Safari</strong>, then <strong>Microphone</strong>, and choose <strong>Ask</strong> or <strong>Allow</strong>.</li>
      <li>Or, in Safari, tap the <strong>aA</strong> or page menu beside the address, then <strong>Website Settings</strong>, then <strong>Microphone: Allow</strong>.</li>
      <li>Or tap the 🎤 on your keyboard. It types what you say without any setting.</li></ol>
      <button type="button" class="big-btn" id="micOk">OK</button>`;
    micSheet.showModal();
    $("#micOk").onclick = () => micSheet.close();
  } else if (kind === "nomic") chatBubble("them", "I couldn't find a microphone on this device. You can type your question instead.", "notice");
  else chatBubble("them", "I couldn't hear that. Tap 🎤 and try again, or type your question.", "notice");
}

if ($("#partnerBox")) {
  renderPartnerPicks();
  resetChat();
  if (canListen) { $("#partnerMic").hidden = false; dictateInto($("#partnerQ"), $("#partnerMic"), { before: explainMic, onError: micTrouble }); }
  if (canSpeak) {
    const sp = $("#partnerSpeak");
    const sync = () => { const on = Boolean(store.get("helperSpeak")); sp.setAttribute("aria-pressed", String(on)); sp.textContent = on ? "🔊" : "🔈"; sp.setAttribute("aria-label", on ? "Reading answers aloud: on" : "Read answers aloud"); };
    sp.hidden = false; sync();
    sp.addEventListener("click", () => { store.set("helperSpeak", !store.get("helperSpeak")); sync(); if (!store.get("helperSpeak")) { stopSaying(); buddy.talking(false); } });
  }
  $("#partnerGo").addEventListener("click", sendChat);
  $("#partnerBox").addEventListener("toggle", () => { if ($("#partnerBox").open && builtIn(currentPartner())) checkHelperStanding(); });
  $("#partnerQ").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } });
}

/* ---------- Daily life journal ---------- */
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const dayLabel = (day) => new Date(`${day}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
const DIARY_BOXES = [
  { field: "text", label: "My day", icon: "✎", ph: "What's going on in your life today? What would you want your family to know someday?" },
  { field: "prayer", label: "Prayers", icon: "🙏", ph: "Who and what are you praying for?" },
  { field: "gratitude", label: "Gratitude", icon: "❀", ph: "What are you thankful for today?" },
];
/* ---------- My Journey: the journal ----------
   A notes-style journal: tap "Add" for My day, a prayer, something you're thankful for, or
   thoughts on the chapter you're reading. Each entry is dated and timed, saved with a big
   Save button, and listed below to read again. "Make my journal book" prints them all as a
   keepsake titled "My Journey". */
const ENTRY_KINDS = [
  { kind: "day", label: "Journal entry", add: "Journal entry", icon: "✎", ph: "What's going on in your life today? What would you want your family to know someday?" },
  { kind: "prayer", label: "Prayer", add: "A prayer", icon: "🙏", ph: "Who and what are you praying for?" },
  { kind: "gratitude", label: "Gratitude", add: "Thankful for", icon: "❀", ph: "What are you thankful for today?" },
  { kind: "bible", label: "Bible thoughts", add: "Bible thoughts", icon: "📖", ph: "What is this chapter saying to you? How does it make you feel?" },
  { kind: "church", label: "Church notes", add: "Church notes", icon: "⛪", ph: "Main points from the lesson, verses mentioned, and one thing to remember this week..." },
  { kind: "class", label: "Bible Class Notes", add: "Bible Class Notes", icon: "🏫", ph: "Your outline or notes for the class: main points, verses to read, questions to ask. Type a verse like John 3:16 and it becomes a link.", notesOnly: true },
  { kind: "study", label: "My Study Path", add: "My Study Path", icon: "🧭", ph: "What you're learning on this study path. Type a verse like John 3:16 and it becomes a link.", notesOnly: true },
  { kind: "note", label: "General Notes", add: "General Notes", icon: "📝", ph: "Anything you want to keep: a class outline, a list, ideas. Type a verse like Romans 8:28 and it becomes a link.", notesOnly: true },
];
// Notes (church, reading, study path and general) live on their own page and are always open.
// The journal's passcode locks only the private journal: days, prayers and thanks.
const NOTE_KINDS = ["class", "church", "note", "study", "bible"];
const NOTE_LABEL = { class: "Bible Class Notes", church: "Church Notes", note: "General Notes", bible: "General Notes", study: "My Study Path" };
const NOTE_FILTERS = ["class", "church", "note", "study"];
const noteGroup = (k) => (k === "bible" ? "note" : k); // notes written on a chapter count as General Notes
const BOX_TONES = [["key", "🔑", "Key point"], ["remember", "💡", "Remember"], ["question", "❓", "Question"], ["prayer", "🙏", "Prayer"]];
const NOTE_FONTS = [["classic", "Classic"], ["clean", "Clean"], ["hand", "Handwritten"], ["big", "Big print"]];
const KIND = Object.fromEntries(ENTRY_KINDS.map((k) => [k.kind, k]));
// How a journal entry starts. They pick one each time.
const OPENERS = ["Today", "My Day", "This Week", "My Reflection", "Lately"];
const openerOf = (e) => (e?.kind === "day" ? e.opener || "My Day" : "");
const entryLabel = (e) => openerOf(e) || KIND[e.kind]?.label || "Journal";
// The date an entry is filed under: the day they chose, at the time it was written.
const onDay = (day, from = new Date()) => { const d = new Date(from); const [y, m, dd] = day.split("-").map(Number); d.setFullYear(y, m - 1, dd); return d.toISOString(); };
const dayOf = (iso) => { const d = new Date(iso); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const timeOf = (iso) => new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
let editing = null; // { id, kind, ref } while the editor is open
let journalFilter = "all";

function renderDiaryToday() {
  const el = $("#diaryToday");
  if (!el) return;
  el.innerHTML = "";
  if (journalLocked()) return;
  const name = (store.get("name") || "").trim();
  const card = Object.assign(document.createElement("div"), { className: "diary-card journey" });
  card.innerHTML = `<p class="diary-date">${esc(dayLabel(todayKey()))}</p>
    <h2>My Journey</h2><p class="muted small-print">${name ? `A journal by ${esc(name)}. ` : ""}Tap what you'd like to write. Each entry is dated and saved, and you can read them all below.</p>
    <div class="add-entries">${ENTRY_KINDS.filter((k) => !k.notesOnly).map((k) => `<button class="add-entry ae-${k.kind}" data-add="${k.kind}"><span aria-hidden="true">${k.icon}</span><b>＋ ${esc(k.add)}</b></button>`).join("")}</div>
    <div id="entryEditor"></div>`;
  card.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => openEntry({ kind: b.dataset.add })));
  el.append(card);
  if (editing && (!entryHost || entryHost.id === "entryEditor")) openEntry(editing);
}
// The writing box for a new entry, or for one they tapped to read or change.
let entryHost = null;
// The writing page for an entry. Besides the words, an entry can hold quoted verses (each with
// a comment, thought or question), stickers, photos, maps and simple charts. Church notes add
// the lesson title, the teacher and the passage.
const QUOTE_TAGS = [["comment", "💬", "Comment"], ["thought", "💭", "Thought"], ["question", "❓", "Question"]];
const entryHasContent = (f) => Boolean((f.text || "").trim() || f.title?.trim() || f.prayer?.trim() || f.gratitude?.trim() || f.quotes?.length || f.pics?.length);
// Optional callout styles for the comment on a verse: some fun, some classy. Each one prints too.
const CALLOUTS = [["plain", "Plain"], ["classic", "✒️ Classic"], ["parchment", "📜 Parchment"], ["sticky", "🗒️ Sticky note"], ["bubble", "💭 Bubble"], ["floral", "🌸 Floral"]];
function quoteCardHtml(q, i, editable = true) {
  const [, tagIcon, tagLabel] = QUOTE_TAGS.find(([t]) => t === (q.tag || "comment")) || QUOTE_TAGS[0];
  const look = CALLOUTS.some(([c]) => c === q.look) ? q.look : "plain";
  return `<div class="ee-quote" data-q="${i}"><blockquote>“${esc(q.text)}”</blockquote><cite>${esc(refKeyName(q.ref))}${q.ver ? ` (${esc(q.ver)})` : ""}</cite>
    ${editable ? `<div class="qtags" role="group" aria-label="What kind of note">${QUOTE_TAGS.map(([t, ic, l]) => `<button type="button" data-qtag="${t}" aria-pressed="${(q.tag || "comment") === t}">${ic} ${l}</button>`).join("")}</div>
    <div class="q-callout co-${look}">${look === "plain" ? "" : `<span class="co-tag">${tagIcon} ${tagLabel}</span>`}<textarea class="q-note" rows="1" placeholder="${q.tag === "question" ? "Your question about this verse…" : q.tag === "thought" ? "Your thought…" : "Your comment…"}">${esc(q.note || "")}</textarea></div>
    <div class="co-pick" role="group" aria-label="Callout box style (optional)"><span class="muted small-print">Box:</span>${CALLOUTS.map(([c, l]) => `<button type="button" data-colook="${c}" aria-pressed="${look === c}">${l}</button>`).join("")}</div>
    <button type="button" class="pic-x" data-qx="${i}" aria-label="Remove this verse">✕</button>`
    : !q.note ? "" : look === "plain" ? `<p class="q-note-read">${tagIcon} ${esc(q.note)}</p>`
    : `<div class="q-callout co-${look}"><span class="co-tag">${tagIcon} ${tagLabel}</span><p>${esc(q.note).replace(/\n/g, "<br>")}</p></div>`}</div>`;
}
function chartHtml(c) {
  const lines = (t) => String(t || "").split(/\n|,/).map((x) => x.trim()).filter(Boolean);
  if (c.kind === "venn") {
    // Wrap each item to the width of its region, so words never run into the next circle.
    const wrap = (t, w) => { const out = []; let cur = ""; for (const word of t.split(/\s+/)) { if (cur && (cur + " " + word).length > w) { out.push(cur); cur = word; } else cur = cur ? `${cur} ${word}` : word; } if (cur) out.push(cur); return out; };
    const col = (items, x, w) => items.slice(0, 5).flatMap((t) => wrap(t, w).slice(0, 2)).slice(0, 8).map((t, i) => `<text x="${x}" y="${104 + i * 15}" text-anchor="middle">${esc(t.slice(0, w + 2))}</text>`).join("");
    return `<svg class="chart-venn" viewBox="0 0 440 250" role="img" aria-label="Venn diagram: ${esc(c.a || "")} and ${esc(c.b || "")}"><circle cx="160" cy="135" r="110" class="v1"/><circle cx="280" cy="135" r="110" class="v2"/>
      <text x="110" y="20" text-anchor="middle" class="vh">${esc(c.a || "")}</text><text x="330" y="20" text-anchor="middle" class="vh">${esc(c.b || "")}</text><text x="220" y="78" text-anchor="middle" class="vh">Both</text>
      ${col(lines(c.left), 105, 13)}${col(lines(c.both), 220, 11)}${col(lines(c.right), 335, 13)}</svg>`;
  }
  if (c.kind === "timeline") return `<ol class="chart-timeline">${lines(c.items).map((t) => `<li><span class="tl-dot"></span>${esc(t)}</li>`).join("")}</ol>`;
  return `<table class="chart-compare"><thead><tr><th>${esc(c.a || "")}</th><th>${esc(c.b || "")}</th></tr></thead><tbody>${Array.from({ length: Math.max(lines(c.left).length, lines(c.right).length) }, (_, i) => `<tr><td>${esc(lines(c.left)[i] || "")}</td><td>${esc(lines(c.right)[i] || "")}</td></tr>`).join("")}</tbody></table>`;
}
function picHtml(p, i, editable = true) {
  const x = editable ? `<button type="button" class="pic-x" data-px="${i}" aria-label="Remove">✕</button>` : "";
  if (p.t === "sticker") return `<div class="ee-pic is-sticker">${stickerSvg(p.id)}${x}</div>`;
  if (p.t === "photo") return `<div class="ee-pic is-photo"><img src="${p.src}" alt="${esc(p.alt || "Photo")}">${x}</div>`;
  if (p.t === "map") { const n = notesFor(...p.key.split(".").map((v, k) => (k ? Number(v) : v))); return n?.map ? `<div class="ee-pic is-map">${mapSvg(n.map)}<p class="muted small-print">Map: ${esc(refKeyName(p.key))}</p>${x}</div>` : ""; }
  if (p.t === "box") { const [, ic, l] = BOX_TONES.find(([v]) => v === p.tone) || BOX_TONES[0]; return `<div class="ee-pic is-box tone-${esc(p.tone || "key")}"><p class="nb-label">${ic} ${esc(l)}</p><p class="nb-text">${linkRefs(esc(p.text || "")).replace(/\n/g, "<br>")}</p>${editable ? `<button type="button" class="small chart-edit" data-bedit="${i}">Change</button>` : ""}${x}</div>`; }
  if (p.t === "table") return `<div class="ee-pic is-table"><table class="note-table">${(p.rows || []).map((r, ri) => `<tr>${r.map((c) => (ri ? `<td>${linkRefs(esc(c))}</td>` : `<th>${esc(c)}</th>`)).join("")}</tr>`).join("")}</table>${editable ? `<button type="button" class="small chart-edit" data-tedit="${i}">Change</button>` : ""}${x}</div>`;
  if (p.t === "ink") return `<div class="ee-pic is-ink${p.page ? " is-page" : ""}">${editable ? `<p class="ink-label">${p.page ? "📄 Page" : "✏️ Drawing"} ${esc(p.n)}</p>` : ""}${inkSvg(p, `data-ink="${inkKey(p)}"${editable ? ` data-iedit="${i}"` : ""}`)}${editable ? `<button type="button" class="small chart-edit" data-iedit="${i}">Change</button>` : ""}${x}</div>`;
  if (p.t === "chart") return `<div class="ee-pic is-chart"${editable ? ` data-chart="${i}"` : ""}>${chartHtml(p)}${editable ? `<button type="button" class="small chart-edit" data-cedit="${i}">Change</button>` : ""}${x}</div>`;
  return "";
}
// Drawings drawn on the page, so a copy for Google Docs can turn each into a picture.
const INK_SEEN = new Map();
const inkKey = (p) => { const k = `i${INK_SEEN.size}`; INK_SEEN.set(k, p); return k; };
// A "[✏️ Drawing 2]" line in the words is where that drawing goes when printed or sent.
const inkLine = (n) => new RegExp(`^\\[(?:✏️ Drawing|📄 Page) ${n}\\]$`, "m");
const inkTag = (p) => `[${p.page ? "📄 Page" : "✏️ Drawing"} ${p.n}]`;
function paraInk(t, pics, para) {
  const inks = (pics || []).filter((p) => p.t === "ink");
  if (!inks.length || !t) return para(t || "");
  return String(t).split(/^\[(?:✏️ Drawing|📄 Page) (\d+)\]$/m).map((c, i) => {
    if (i % 2) { const p = inks.find((x) => String(x.n) === c); return p ? `<div class="ee-pics">${picHtml(p, 0, false)}</div>` : ""; }
    return c.trim() ? para(c.replace(/^\n+|\n+$/g, "")) : "";
  }).join("");
}
// The pictures that aren't already placed in the words.
const loosePics = (e) => (e.pics || []).filter((p) => !(p.t === "ink" && inkLine(p.n).test(e.text || "")));
// Make a photo small enough to keep and sync: at most 720 pixels across.
function shrinkPhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, 720 / Math.max(img.width, img.height));
      const c = Object.assign(document.createElement("canvas"), { width: Math.round(img.width * k), height: Math.round(img.height * k) });
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.68));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("That picture couldn't be opened.")); };
    img.src = url;
  });
}
// The text of a verse or verses ("John 3:16-18"), from the chosen version.
async function fetchVerses(text) {
  const r = findRefs(text)[0];
  if (!r || !r.chapter) throw new Error("Type a book, chapter and verse, like John 3:16.");
  const m = text.match(/:\s*(\d+)\s*(?:[-–]\s*(\d+))?/);
  const from = m ? Number(m[1]) : 1, to = m?.[2] ? Math.max(Number(m[2]), from) : from;
  const res = await getChapter(store.get("version"), r.book, r.chapter);
  const div = document.createElement("div");
  div.innerHTML = sanitize(res.html);
  const nodes = verseTextNodes(div);
  const out = [];
  for (let v = from; v <= Math.min(to, from + 9); v++) out.push((nodes.get(v) || []).map((n) => n.textContent).join(""));
  const quote = out.join(" ").replace(/\s+/g, " ").trim();
  if (!quote) throw new Error("That verse couldn't be found. Check the chapter and verse.");
  return { ref: `${r.book}.${r.chapter}.${from}${to > from ? `-${Math.min(to, from + 9)}` : ""}`, text: quote };
}
const verLabel = () => (versionList().find(([x]) => x === store.get("version")) || ["", "NASB"])[1];
function openEntry({ id = null, kind = "day", ref = null, addQuote = null } = {}, box = $("#entryEditor")) {
  if (!box) return;
  if (entryHost && entryHost !== box) entryHost.innerHTML = "";
  entryHost = box;
  const e = id ? store.entry(id) : null;
  kind = e?.kind || kind;
  if (kind === "bible" && !ref) ref = e?.ref || (() => { const { book, chapter } = store.get("last"); return `${book}.${chapter}`; })();
  ref = ref || e?.ref || null;
  const newId = id || `e${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  editing = { id: newId, kind, ref };
  const draft = { quotes: [...(e?.quotes || [])], pics: [...(e?.pics || [])], font: e?.font || "classic", opener: e?.opener || "My Day" };
  const wroteAt = e?.created ? new Date(e.created) : new Date();
  const isDay = kind === "day";
  const path = kind === "study" ? (e?.path || store.get("activePath") || "") : "";
  if (kind === "study" && !ref && path) { const { book, chapter } = store.get("last"); ref = `${book}.${chapter}`; }
  const noteKind = NOTE_KINDS.includes(kind);
  if (addQuote) draft.quotes.push({ tag: "comment", note: "", ...addQuote });
  const k = KIND[kind] || KIND.day;
  const when = e ? `${stampNow(new Date(e.created))}${e.updated && dayOf(e.updated) !== dayOf(e.created) ? ` · changed ${fmtDate(e.updated)}` : ""}` : stampNow();
  const church = kind === "church" || kind === "class";
  box.innerHTML = `<div class="entry-editor ee-${kind}">
      <p class="ee-head"><span aria-hidden="true">${k.icon}</span> <b id="eeKindLabel">${esc(noteKind ? NOTE_LABEL[kind] : isDay ? draft.opener : k.label)}</b>${path && PATH_BY_ID[path] ? ` <span class="muted">· ${esc(PATH_BY_ID[path].name || "")}</span>` : ""}${ref && !church ? ` <span class="muted">· ${esc(keyRef(ref).name)}</span>` : ""}</p>
      <div class="ee-when-row"><p class="ee-when">🕒 ${esc(when)}</p><label class="ee-date">📅 Date <input type="date" id="eeDate" value="${dayOf(wroteAt.toISOString())}" max="${todayKey()}"></label></div>
      ${isDay ? `<div class="ee-openers" role="group" aria-label="How this entry starts"><span class="muted small-print">Start with:</span> ${OPENERS.map((o) => `<button type="button" data-opener="${o}" aria-pressed="${draft.opener === o}">${o}</button>`).join("")}</div>` : ""}
      ${church ? `<div class="ee-church"><label class="field">${kind === "class" ? "Lesson title" : "Lesson or sermon title"}<input id="eeTitle" type="text" autocomplete="off" value="${esc(e?.title || "")}" placeholder="For example: The Good Shepherd"></label>
        <label class="field">${kind === "class" ? "Teacher (or me, if I'm teaching)" : "Teacher or preacher"}<input id="eeSpeaker" type="text" autocomplete="off" value="${esc(e?.speaker || "")}"></label>
        <label class="field">Passage<input id="eePassage" type="text" autocomplete="off" value="${esc(e?.passage || "")}" placeholder="For example: John 10:1-18"></label></div>`
        : noteKind ? `<label class="field ee-heading">Heading<input id="eeTitle" type="text" autocomplete="off" value="${esc(e?.title || "")}" placeholder="${esc(defaultHeading({ kind, ref }))}"></label>` : ""}
      <div class="ee-quotes" id="eeQuotes"></div>
      <label class="ee-label" for="entryText" id="eeTextLabel">${church ? "Notes" : isDay ? `${esc(draft.opener)}…` : "Write here"}</label>
      ${noteKind ? `<div class="ee-fonts" role="group" aria-label="Writing style">${NOTE_FONTS.map(([f, l]) => `<button type="button" class="nf-${f}" data-font="${f}" aria-pressed="${draft.font === f}">${l}</button>`).join("")}</div>` : ""}
      ${noteKind || church ? "" : `<div class="ee-idea"><button type="button" class="quiet-link" id="eeIdea">💭 Need an idea?</button><p class="ee-prompt" id="eePrompt" hidden></p></div>`}
      <textarea id="entryText" class="nf-${esc(draft.font)}" rows="7" placeholder="${esc(k.ph)}">${esc(e?.text || "")}</textarea>
      <div class="ee-refs" id="eeRefs" aria-live="polite"></div>
      ${isDay ? `<div class="ee-extra" id="eePrayerBox" ${(e?.prayer || "").trim() ? "" : "hidden"}><label class="ee-label" for="eePrayer">🙏 Prayer</label><textarea id="eePrayer" rows="3" placeholder="Who and what are you praying for?">${esc(e?.prayer || "")}</textarea></div>
      <div class="ee-extra" id="eeGratBox" ${(e?.gratitude || "").trim() ? "" : "hidden"}><label class="ee-label" for="eeGrat">❀ Thankful for</label><textarea id="eeGrat" rows="3" placeholder="What are you thankful for today?">${esc(e?.gratitude || "")}</textarea></div>
      <div class="ee-add-extra"><button type="button" class="small" data-extra="eePrayerBox" ${(e?.prayer || "").trim() ? "hidden" : ""}>＋ Add a prayer</button><button type="button" class="small" data-extra="eeGratBox" ${(e?.gratitude || "").trim() ? "hidden" : ""}>＋ Add what I'm thankful for</button><span class="muted small-print">Only if you want to.</span></div>` : ""}
      <div class="ee-pics" id="eePics"></div>
      <div class="ee-tools" role="group" aria-label="Add to this entry">
        <button type="button" data-tool="verse">📖 Quote a verse</button><button type="button" data-tool="sticker">🎨 Pictures &amp; arrows</button><button type="button" data-tool="box">▭ Shaded box</button>
        <button type="button" data-tool="ink">✏️ Draw or write</button><button type="button" data-tool="inkpage">📄 Handwriting page</button><button type="button" data-tool="photo">📷 Photo</button><button type="button" data-tool="map">🗺️ Map</button><button type="button" data-tool="chart">📊 Chart</button><button type="button" data-tool="table">▦ Table</button>
        <input type="file" id="eePhoto" accept="image/*" hidden>
      </div>
      <div class="ee-panel" id="eePanel" hidden></div>
      ${kind === "prayer" ? `<label class="answered"><input type="checkbox" id="entryAnswered" ${e?.answered ? "checked" : ""}> God answered this prayer${e?.answered ? ` <span class="muted">· ${fmtDate(e.answered)}</span>` : ""}</label>` : ""}
      <div class="ee-acts"><button class="ee-save" id="entrySave">Save</button><button class="small" id="entryCancel">Close</button>${noteKind ? `<button class="small" id="entryPrint">🖨 Print</button>` : ""}${e ? `<button class="small danger" id="entryDelete">Delete</button>` : ""}</div>
      <p class="ee-msg" id="entryMsg" role="status"></p></div>`;
  const ta = $("#entryText"), panel = $("#eePanel"), msg = (t) => { $("#entryMsg").textContent = t; };
  // A writing prompt, one at a time. Tap again for another. It never types anything for you.
  $("#eeIdea")?.addEventListener("click", () => {
    const p = $("#eePrompt");
    p.textContent = nextPrompt(kind, p.textContent); p.hidden = false;
    $("#eeIdea").textContent = "💭 Another idea";
  });
  addMic(box.querySelector(".entry-editor"), ta);
  const fields = () => ({ kind, text: ta.value.trim(), ...(ref ? { ref } : {}), quotes: draft.quotes, pics: draft.pics,
    created: onDay($("#eeDate")?.value || dayOf(wroteAt.toISOString()), wroteAt),
    ...(isDay ? { opener: draft.opener, prayer: ($("#eePrayer")?.value || "").trim(), gratitude: ($("#eeGrat")?.value || "").trim() } : {}),
    ...(noteKind ? { font: draft.font } : {}), ...(path ? { path } : {}),
    ...(church ? { title: $("#eeTitle").value.trim(), speaker: $("#eeSpeaker").value.trim(), passage: $("#eePassage").value.trim() } : noteKind ? { title: $("#eeTitle").value.trim() } : {}) });
  // Verses typed in the note become buttons that open the passage, without leaving the note.
  const drawRefs = () => {
    const out = box.querySelector("#eeRefs");
    if (!out) return; // the note was saved or closed meanwhile
    const found = scanRefs(`${$("#eePassage")?.value || ""} ${ta.value}`).slice(0, 10);
    out.innerHTML = found.length ? `<span class="muted small-print">Verses in this note:</span> ${found.map((r) => refButton(r)).join(" ")}` : "";
  };
  // Words are never lost: everything is kept as they go, and Save finishes the entry.
  const keep = () => { const f = fields(); if (!entryHasContent(f)) return false; store.saveEntry(newId, f); return true; };
  let t = 0;
  const keepSoon = () => { clearTimeout(t); t = setTimeout(() => { if (keep()) msg("Kept as you go. Tap Save when you're done."); }, 700); };
  const drawQuotes = () => {
    const q = $("#eeQuotes");
    q.innerHTML = draft.quotes.map((x, i) => quoteCardHtml(x, i)).join("");
    q.querySelectorAll("[data-qtag]").forEach((b) => b.addEventListener("click", () => { const i = Number(b.closest("[data-q]").dataset.q); draft.quotes[i].tag = b.dataset.qtag; drawQuotes(); keep(); }));
    q.querySelectorAll("[data-colook]").forEach((b) => b.addEventListener("click", () => { const i = Number(b.closest("[data-q]").dataset.q); draft.quotes[i].look = b.dataset.colook; drawQuotes(); keep(); }));
    const grow = (n) => { n.style.height = "auto"; n.style.height = `${n.scrollHeight + 2}px`; };
    q.querySelectorAll(".q-note").forEach((n) => { requestAnimationFrame(() => grow(n)); n.addEventListener("input", () => grow(n)); });
    q.querySelectorAll(".q-note").forEach((n) => n.addEventListener("input", () => { draft.quotes[Number(n.closest("[data-q]").dataset.q)].note = n.value; keepSoon(); }));
    q.querySelectorAll("[data-qx]").forEach((b) => b.addEventListener("click", () => { draft.quotes.splice(Number(b.dataset.qx), 1); drawQuotes(); keep(); }));
  };
  const drawPics = () => {
    const el = $("#eePics");
    el.innerHTML = draft.pics.map((x, i) => picHtml(x, i)).join("");
    el.querySelectorAll("[data-px]").forEach((b) => b.addEventListener("click", () => { const [gone] = draft.pics.splice(Number(b.dataset.px), 1); if (gone?.t === "ink") ta.value = ta.value.replace(new RegExp(`\\n?${inkLine(gone.n).source.slice(1, -1)}\\n?`), "\n"); drawPics(); keep(); }));
    el.querySelectorAll("[data-iedit]").forEach((b) => b.addEventListener("click", () => drawInk(draft.pics[Number(b.dataset.iedit)].page, Number(b.dataset.iedit))));
    el.querySelectorAll("[data-cedit]").forEach((b) => b.addEventListener("click", () => chartForm(Number(b.dataset.cedit))));
    el.querySelectorAll("[data-tedit]").forEach((b) => b.addEventListener("click", () => tableForm(Number(b.dataset.tedit))));
    el.querySelectorAll("[data-bedit]").forEach((b) => b.addEventListener("click", () => boxForm(Number(b.dataset.bedit))));
  };
  const addPic = (pic) => { draft.pics.push(pic); drawPics(); keep(); msg("Added ✓"); };
  // Handwriting or a drawing goes where the cursor was in the words.
  let caret = null;
  ta.addEventListener("blur", () => { caret = ta.selectionStart; });
  async function drawInk(page, editAt = -1) {
    const old = editAt >= 0 ? draft.pics[editAt] : null;
    const n = old?.n || 1 + Math.max(0, ...draft.pics.filter((p) => p.t === "ink").map((p) => Number(p.n) || 0));
    const out = await openInk(old || { t: "ink", page, n });
    if (!out) return;
    if (!out.s.length) { if (old) { draft.pics.splice(editAt, 1); ta.value = ta.value.replace(new RegExp(`\\n?${inkLine(old.n).source.slice(1, -1)}\\n?`), "\n"); drawPics(); keep(); } return; }
    if (old) { draft.pics[editAt] = out; drawPics(); keep(); msg("Drawing kept ✓"); return; }
    const at = caret ?? ta.value.length, before = ta.value.slice(0, at), after = ta.value.slice(at);
    ta.value = `${before}${before && !before.endsWith("\n") ? "\n" : ""}${inkTag(out)}\n${after.replace(/^\n/, "")}`;
    caret = before.length + inkTag(out).length + (before && !before.endsWith("\n") ? 2 : 1);
    addPic(out);
  }
  const closePanel = () => { panel.hidden = true; panel.innerHTML = ""; };
  function chartForm(editAt = -1) {
    const c = editAt >= 0 ? draft.pics[editAt] : { kind: "venn" };
    const f = (id, label, v, multi, ph = "") => multi ? `<label class="field">${label}<textarea id="${id}" rows="3" placeholder="${esc(ph)}">${esc(v || "")}</textarea></label>` : `<label class="field">${label}<input id="${id}" type="text" value="${esc(v || "")}" placeholder="${esc(ph)}"></label>`;
    const body = (kd) => kd === "venn" ? `${f("cA", "Left circle", c.a, false, "Moses")}${f("cB", "Right circle", c.b, false, "Jesus")}${f("cL", "Only on the left (one per line)", c.left, true)}${f("cBoth", "In both", c.both, true)}${f("cR", "Only on the right", c.right, true)}`
      : kd === "timeline" ? f("cItems", "Events in order (one per line)", c.items, true, "Creation\nThe flood\nAbraham's call")
      : `${f("cA", "Left heading", c.a, false, "Law")}${f("cB", "Right heading", c.b, false, "Grace")}${f("cL", "Left points (one per line)", c.left, true)}${f("cR", "Right points", c.right, true)}`;
    panel.hidden = false;
    panel.innerHTML = `<div class="chart-kinds" role="group">${[["venn", "◎ Venn circles"], ["timeline", "➝ Timeline"], ["compare", "▥ Compare"]].map(([v, l]) => `<button type="button" data-ck="${v}" aria-pressed="${c.kind === v}">${l}</button>`).join("")}</div>
      <div id="cBody">${body(c.kind)}</div><div class="ee-acts"><button type="button" class="small" id="cDone">${editAt >= 0 ? "Update chart" : "Add chart"}</button><button type="button" class="small" id="cCancel">Cancel</button></div>`;
    panel.querySelectorAll("[data-ck]").forEach((b) => b.addEventListener("click", () => { c.kind = b.dataset.ck; panel.querySelectorAll("[data-ck]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); $("#cBody").innerHTML = body(c.kind); }));
    $("#cCancel").addEventListener("click", closePanel);
    $("#cDone").addEventListener("click", () => {
      const v = (id) => panel.querySelector(`#${id}`)?.value ?? "";
      const chart = c.kind === "timeline" ? { t: "chart", kind: "timeline", items: v("cItems") } : { t: "chart", kind: c.kind, a: v("cA"), b: v("cB"), left: v("cL"), right: v("cR"), ...(c.kind === "venn" ? { both: v("cBoth") } : {}) };
      if (editAt >= 0) { draft.pics[editAt] = chart; drawPics(); keep(); } else addPic(chart);
      closePanel();
    });
  }
  // A simple table: the first row is the heading row.
  function tableForm(editAt = -1) {
    const rows = editAt >= 0 ? draft.pics[editAt].rows.map((r) => [...r]) : [["Verse", "What it says", "What it means to me"], ["", "", ""], ["", "", ""]];
    const draw = () => {
      panel.hidden = false;
      panel.innerHTML = `<div class="table-edit" role="group" aria-label="Table"><table>${rows.map((r, i) => `<tr>${r.map((c, j) => `<td><input type="text" data-cell="${i}.${j}" value="${esc(c)}" aria-label="${i ? `Row ${i}` : "Heading"}, column ${j + 1}" ${i ? "" : 'class="th"'}></td>`).join("")}</tr>`).join("")}</table></div>
        <div class="ee-acts"><button type="button" class="small" data-tadd="row">＋ Row</button><button type="button" class="small" data-tadd="col" ${rows[0].length >= 5 ? "disabled" : ""}>＋ Column</button><button type="button" class="small" data-tadd="less" ${rows.length <= 2 ? "disabled" : ""}>－ Row</button></div>
        <div class="ee-acts"><button type="button" class="small" id="tDone">${editAt >= 0 ? "Update table" : "Add table"}</button><button type="button" class="small" id="tCancel">Cancel</button></div>`;
      panel.querySelectorAll("[data-cell]").forEach((inp) => inp.addEventListener("input", () => { const [i, j] = inp.dataset.cell.split(".").map(Number); rows[i][j] = inp.value; }));
      panel.querySelectorAll("[data-tadd]").forEach((b) => b.addEventListener("click", () => {
        if (b.dataset.tadd === "row") rows.push(rows[0].map(() => ""));
        if (b.dataset.tadd === "col") rows.forEach((r) => r.push(""));
        if (b.dataset.tadd === "less") rows.pop();
        draw();
      }));
      $("#tCancel").addEventListener("click", closePanel);
      $("#tDone").addEventListener("click", () => {
        const table = { t: "table", rows: rows.filter((r, i) => !i || r.some((c) => c.trim())) };
        if (editAt >= 0) { draft.pics[editAt] = table; drawPics(); keep(); } else addPic(table);
        closePanel();
      });
    };
    draw();
    panel.querySelector("[data-cell]")?.focus();
  }
  // A shaded box: a key point, something to remember, a question or a prayer.
  function boxForm(editAt = -1) {
    const b = editAt >= 0 ? { ...draft.pics[editAt] } : { tone: "key", text: "" };
    panel.hidden = false;
    panel.innerHTML = `<div class="chart-kinds" role="group">${BOX_TONES.map(([v, ic, l]) => `<button type="button" data-tone="${v}" aria-pressed="${b.tone === v}">${ic} ${l}</button>`).join("")}</div>
      <label class="field">What goes in the box<textarea id="boxText" rows="3">${esc(b.text || "")}</textarea></label>
      <div class="ee-acts"><button type="button" class="small" id="bDone">${editAt >= 0 ? "Update box" : "Add box"}</button><button type="button" class="small" id="bCancel">Cancel</button></div>`;
    panel.querySelectorAll("[data-tone]").forEach((x) => x.addEventListener("click", () => { b.tone = x.dataset.tone; panel.querySelectorAll("[data-tone]").forEach((y) => y.setAttribute("aria-pressed", String(y === x))); }));
    $("#bCancel").addEventListener("click", closePanel);
    $("#bDone").addEventListener("click", () => {
      const box = { t: "box", tone: b.tone, text: $("#boxText").value.trim() };
      if (!box.text) { $("#boxText").focus(); return; }
      if (editAt >= 0) { draft.pics[editAt] = box; drawPics(); keep(); } else addPic(box);
      closePanel();
    });
    $("#boxText").focus();
  }
  const tools = {
    box() { boxForm(); },
    table() { tableForm(); },
    verse() {
      panel.hidden = false;
      panel.innerHTML = `<form class="jump-row" id="eeVerseForm"><input id="eeVerseIn" type="text" placeholder="John 3:16, or Psalm 23:1-3" autocomplete="off"><button class="small" type="submit">Add</button></form>
        <p class="muted small-print">Type where it is, and its words are copied into your entry from your Bible. Or, while you read, tap a verse number and choose Add to notes.</p>`;
      $("#eeVerseIn").focus();
      $("#eeVerseForm").addEventListener("submit", async (ev) => {
        ev.preventDefault();
        msg("Looking up the verse…");
        try { const q = await fetchVerses($("#eeVerseIn").value); draft.quotes.push({ ...q, ver: verLabel(), tag: "comment", note: "" }); drawQuotes(); keep(); closePanel(); msg("Verse added ✓"); }
        catch (err) { msg(err.message || "That verse couldn't be found."); }
      });
    },
    sticker() {
      panel.hidden = false;
      let grp = "people";
      const draw = () => {
        panel.innerHTML = `<div class="sticker-tabs" role="tablist">${STICKER_GROUPS.map(([g, l]) => `<button type="button" role="tab" data-sg="${g}" aria-selected="${g === grp}">${l}</button>`).join("")}</div>
          <div class="sticker-grid">${Object.entries(STICKERS).filter(([, v]) => v[0] === grp).map(([sid, v]) => `<button type="button" class="sticker-pick" data-sid="${sid}" title="${esc(v[1])}">${stickerSvg(sid)}<span>${esc(v[1])}</span></button>`).join("")}</div>
          <button type="button" class="small" id="stDone">Done</button>`;
        panel.querySelectorAll("[data-sg]").forEach((b) => b.addEventListener("click", () => { grp = b.dataset.sg; draw(); }));
        panel.querySelectorAll("[data-sid]").forEach((b) => b.addEventListener("click", () => addPic({ t: "sticker", id: b.dataset.sid })));
        $("#stDone").addEventListener("click", closePanel);
      };
      draw();
    },
    photo() { $("#eePhoto").click(); },
    ink() { closePanel(); drawInk(false); },
    inkpage() { closePanel(); drawInk(true); },
    map() {
      panel.hidden = false;
      const maps = sampleChapters().filter((key) => keyRef(key) && notesFor(keyRef(key).book, keyRef(key).chapter)?.map);
      panel.innerHTML = `<p class="muted small-print">Add a study map to this entry:</p><div class="row">${maps.map((key) => `<button type="button" class="small" data-mapkey="${key}">${esc(keyRef(key).name)}</button>`).join("")}</div>`;
      panel.querySelectorAll("[data-mapkey]").forEach((b) => b.addEventListener("click", () => { addPic({ t: "map", key: b.dataset.mapkey }); closePanel(); }));
    },
    chart() { chartForm(); },
  };
  box.querySelectorAll("[data-tool]").forEach((b) => b.addEventListener("click", () => { if (!panel.hidden && panel.dataset.tool === b.dataset.tool) { closePanel(); return; } panel.dataset.tool = b.dataset.tool; tools[b.dataset.tool](); }));
  const addPhotoFile = async (file) => {
    if (!file) return;
    const photos = store.allEntries().reduce((n, x) => n + (x.pics || []).filter((p) => p.t === "photo").length, 0);
    if (photos >= 60) { msg("You've added 60 photos to your journal, the most it can keep and sync. Remove an older one to add more."); return; }
    msg("Adding the photo…");
    try { addPic({ t: "photo", src: await shrinkPhoto(file), alt: /^image\.\w+$/i.test(file.name || "") ? "Pasted picture" : (file.name || "Picture").replace(/\.[^.]+$/, "") }); }
    catch (err) { msg(err.message); }
  };
  $("#eePhoto").addEventListener("change", async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    await addPhotoFile(file);
  });
  // Pasting or dropping a picture (copied from Photos, a website or another app) adds it like
  // the Photo button does. Pasted words go into the box as usual.
  const imagesIn = (dt) => [...(dt?.files || [])].filter((f) => f.type.startsWith("image/"));
  const editorEl = box.querySelector(".entry-editor");
  editorEl.addEventListener("paste", async (ev) => {
    const imgs = imagesIn(ev.clipboardData);
    if (!imgs.length) return;
    if (!ev.clipboardData.getData("text/plain")) ev.preventDefault();
    for (const f of imgs.slice(0, 4)) await addPhotoFile(f);
  });
  editorEl.addEventListener("dragover", (ev) => { if ([...(ev.dataTransfer?.items || [])].some((i) => i.kind === "file")) ev.preventDefault(); });
  editorEl.addEventListener("drop", async (ev) => {
    const imgs = imagesIn(ev.dataTransfer);
    if (!imgs.length) return;
    ev.preventDefault();
    for (const f of imgs.slice(0, 4)) await addPhotoFile(f);
  });
  drawQuotes(); drawPics(); drawRefs();
  if (addQuote) keep();
  let rt = 0;
  ta.addEventListener("input", () => { keepSoon(); clearTimeout(rt); rt = setTimeout(drawRefs, 500); });
  // Pasted a verse from another Bible app or website? Offer to make it a verse card, keeping
  // the words exactly as pasted, with room for a comment in a callout box.
  ta.addEventListener("paste", (ev) => {
    const pasted = ev.clipboardData?.getData("text/plain") || "";
    const card = scriptureFromPaste(pasted);
    if (!card) return;
    setTimeout(() => {
      const offer = $("#eeVerseOffer") || Object.assign(document.createElement("div"), { id: "eeVerseOffer", className: "ee-verse-offer" });
      offer.innerHTML = `<span>That looks like ${esc(refKeyName(card.ref))}. Make it a verse card you can comment on?</span><button type="button" class="small" data-vo="yes">📖 Make a verse card</button><button type="button" class="small quiet-link" data-vo="no">Keep as typed</button>`;
      ta.after(offer);
      offer.querySelector('[data-vo="yes"]').addEventListener("click", () => {
        const at = ta.value.lastIndexOf(pasted);
        if (at >= 0) ta.value = (ta.value.slice(0, at) + ta.value.slice(at + pasted.length)).replace(/\n{3,}/g, "\n\n");
        draft.quotes.push({ ...card, tag: "comment", note: "" }); offer.remove(); drawQuotes(); drawRefs(); keep(); msg("Verse card added ✓");
        $("#eeQuotes .ee-quote:last-child .q-note")?.focus();
      });
      offer.querySelector('[data-vo="no"]').addEventListener("click", () => offer.remove());
    }, 0);
  });
  box.querySelectorAll("#eeTitle, #eeSpeaker, #eePassage, #eePrayer, #eeGrat").forEach((i) => i.addEventListener("input", () => { keepSoon(); if (i.id === "eePassage") drawRefs(); }));
  $("#eeDate")?.addEventListener("change", () => { if ($("#eeDate").value > todayKey()) $("#eeDate").value = todayKey(); keep(); });
  box.querySelectorAll("[data-opener]").forEach((b) => b.addEventListener("click", () => {
    draft.opener = b.dataset.opener;
    box.querySelectorAll("[data-opener]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    $("#eeKindLabel").textContent = draft.opener; $("#eeTextLabel").textContent = `${draft.opener}…`;
    keep();
  }));
  box.querySelectorAll("[data-extra]").forEach((b) => b.addEventListener("click", () => { const x = $(`#${b.dataset.extra}`); x.hidden = false; b.hidden = true; x.querySelector("textarea").focus(); }));
  box.querySelectorAll("[data-font]").forEach((b) => b.addEventListener("click", () => {
    draft.font = b.dataset.font;
    box.querySelectorAll("[data-font]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    ta.className = `nf-${draft.font}`;
    keep();
  }));
  $("#entrySave").addEventListener("click", () => {
    clearTimeout(t);
    const f = fields();
    if (!entryHasContent(f)) { msg("Write something first, then tap Save."); ta.focus(); return; }
    const ans = $("#entryAnswered");
    const was = store.entry(newId);
    store.saveEntry(newId, { ...f, ...(ans ? { answered: ans.checked ? (was?.answered || new Date().toISOString()) : "" } : {}) });
    if (ans?.checked && !was?.answered) celebrate("small");
    editing = null;
    box.innerHTML = `<p class="ee-saved" role="status">Saved ✓ ${esc(stampNow())}. ${box.id === "notesEditor" ? "It's in your notes below." : noteKind ? "It's in My Notes." : "It's in your journal below."}</p>`;
    renderJournalList(newId); renderNotesList(newId);
    if (box.id === "chapterEntryHost") { renderJournal(); $("#chapterEntryHost").innerHTML = `<p class="ee-saved" role="status">Saved ✓ ${esc(stampNow())}. It's listed below, and in Notes.</p>`; }
  });
  $("#entryCancel").addEventListener("click", () => {
    clearTimeout(t);
    keep();
    editing = null; box.innerHTML = ""; renderJournalList(); renderNotesList();
    if (box.id === "chapterEntryHost") renderJournal();
  });
  $("#entryPrint")?.addEventListener("click", () => { keep(); const saved = store.entry(newId); if (saved) printNotesBook([{ id: newId, ...saved }]); else msg("Write something first, then print."); });
  $("#entryDelete")?.addEventListener("click", () => {
    const btn = $("#entryDelete");
    if (btn.dataset.sure !== "1") { btn.dataset.sure = "1"; btn.textContent = "Tap again to delete"; return; }
    store.deleteEntry(id); editing = null;
    box.innerHTML = `<p class="ee-saved" role="status">Deleted.</p>`;
    renderJournalList(); renderNotesList();
    if (box.id === "chapterEntryHost") renderJournal();
  });
  box.scrollIntoView({ block: "start", behavior: "smooth" });
  if (!e && !addQuote) (church ? $("#eeTitle") : ta).focus();
  if (addQuote) setTimeout(() => box.querySelector(".q-note")?.focus({ preventScroll: true }), 300);
}
// A short line for an entry in a list: its words, or its first verse, plus what's attached.
function entrySnippet(e) {
  const t = (e.title ? `${e.title}${e.speaker ? ` (${e.speaker})` : ""}. ` : "") + (e.text || (e.quotes?.[0] ? `“${e.quotes[0].text}” ${refKeyName(e.quotes[0].ref)}` : ""));
  const extras = [e.quotes?.length && `📖 ${e.quotes.length}`, e.pics?.filter((p) => p.t === "photo").length && `📷 ${e.pics.filter((p) => p.t === "photo").length}`, e.pics?.some((p) => p.t === "sticker") && e.pics.filter((p) => p.t === "sticker").slice(0, 4).map((p) => stickerSvg(p.id, "mini-sticker")).join(""), e.pics?.some((p) => p.t === "map") && "🗺️", e.pics?.some((p) => p.t === "chart") && "📊", e.pics?.some((p) => p.t === "ink") && "✏️"].filter(Boolean);
  return `${esc(t.slice(0, 160))}${t.length > 160 ? "…" : ""}${extras.length ? `<span class="entry-extras">${extras.join(" ")}</span>` : ""}`;
}
// Prints a little book: only #printBook shows on paper (styles.css, "Printed books").
// Every print button first asks: paper or PDF, or send a copy to Google Docs, Drive, email or Files.
const PRINT_TITLES = { journal: "My Journal", notes: "My Notes" };
function printPages(html, kind = "journal", title = PRINT_TITLES[kind] || "Bible Study") {
  const dlg = document.createElement("dialog");
  dlg.className = "send-sheet";
  dlg.setAttribute("aria-label", "Print or send");
  dlg.innerHTML = `<h2>${esc(title)}</h2>
    <button type="button" class="send-opt" data-how="print"><span aria-hidden="true">🖨</span><b>Print or save as a PDF</b><small>Pick your printer, or choose Save as PDF.</small></button>
    <button type="button" class="send-opt" data-how="send"><span aria-hidden="true">📤</span><b>Send to Google Docs, Drive or email</b><small>${navigator.canShare ? "Opens your share list: choose Drive, Docs, Files, Mail or Messages." : "Saves a document you can upload to Google Drive and open with Google Docs, or open in Word."}</small></button>
    <button type="button" class="quiet-link" data-how="">Cancel</button>`;
  document.body.append(dlg);
  dlg.addEventListener("close", () => dlg.remove());
  dlg.querySelectorAll("[data-how]").forEach((b) => b.addEventListener("click", () => {
    dlg.close();
    if (b.dataset.how === "print") printNow(html, kind);
    else if (b.dataset.how === "send") sendDocument(html, title);
  }));
  dlg.showModal();
}
// A clean copy as a document file. Google Docs and Word both open .html files with their headings
// and paragraphs; the pictures drawn for paper are left out.
async function sendDocument(html, title) {
  const box = document.createElement("div");
  box.innerHTML = html;
  box.querySelectorAll("svg[data-ink]").forEach((n) => { const p = INK_SEEN.get(n.dataset.ink); if (p) n.replaceWith(Object.assign(document.createElement("img"), { src: inkPng(p, p.page ? 800 : 640), alt: p.page ? "Handwriting page" : "Drawing" })); });
  box.querySelectorAll("svg, button, .pb-art, .pb-strip, .pb-blank, script, style").forEach((n) => n.remove());
  const doc = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>body{font-family:Georgia,serif;font-size:13pt;line-height:1.5;max-width:42em;margin:2em auto;color:#222}h1,h2,h3{font-family:Arial,sans-serif;color:#333}blockquote,q{display:block;margin:.6em 0;padding-left:1em;border-left:3px solid #bbb;font-style:italic}cite{display:block;font-size:.9em;color:#555}</style></head>
<body>${box.innerHTML}<p style="color:#777;font-size:10pt">From the Family Bible Study app, ${esc(new Date().toLocaleDateString())}.</p></body></html>`;
  const name = `${title.replace(/[^\w\s-]/g, "").trim() || "Bible Study"}.html`;
  const file = new File([doc], name, { type: "text/html" });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title }); return; } catch (e) { if (e?.name === "AbortError") return; }
  }
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(file), download: name });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  mascotSay("Saved! Upload it to Google Drive and choose Open with Google Docs, or open it in Word.");
}
function printNow(html, kind) {
  const book = $("#printBook");
  book.className = `print-book pb-${kind}`;
  book.innerHTML = html;
  book.hidden = false;
  document.body.classList.add("printing"); document.documentElement.classList.add("printing");
  const done = () => { document.body.classList.remove("printing"); document.documentElement.classList.remove("printing"); book.hidden = true; window.removeEventListener("afterprint", done); };
  window.addEventListener("afterprint", done);
  setTimeout(() => window.print(), 80);
}
const BOOK_KINDS = {
  all: ["My Journey", "a journal"], prayer: ["My Prayers", "prayers"], day: ["My Days", "a daily journal"],
  gratitude: ["Thankful", "a gratitude journal"], bible: ["Bible Thoughts", "a Bible journal"], church: ["Church Notes", "Sunday notes"],
};
async function makeJournalBook() {
  if (journalLocked()) { mascotSay("Unlock your journal first."); return; }
  const only = $("#bookWhat")?.value || "all";
  const want = (k) => only === "all" || only === k;
  const name = (store.get("name") || "").trim();
  const para = (t) => esc(t).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  // Everything written, by day: new entries, older daily pages, and chapter journals.
  const days = {};
  const add = (day, item) => { if (item.parts.some(([, t]) => (t || "").trim()) || item.extra || item.head) (days[day] ||= []).push(item); };
  for (const e of store.allEntries()) if (want(e.kind) || (only === "prayer" && e.prayer?.trim()) || (only === "gratitude" && e.gratitude?.trim())) add(dayOf(e.created), { at: e.created, kind: entryLabel(e), k: e.kind, ref: e.ref,
    parts: e.kind === "day" ? [[openerOf(e), want("day") ? e.text : ""], ["Prayer", want("prayer") ? e.prayer : ""], ["Thankful for", want("gratitude") ? e.gratitude : ""]] : [["", e.text]], answered: e.answered, pics: e.pics,
    head: e.title || e.speaker || e.passage ? `<p class="pb-lesson">${e.title ? `<b>${esc(e.title)}</b>` : ""}${e.speaker ? `<span>${esc(e.speaker)}</span>` : ""}${e.passage ? `<span>${esc(e.passage)}</span>` : ""}</p>` : "",
    extra: (e.quotes || []).map((q, i) => quoteCardHtml(q, i, false)).join("") + (loosePics(e).length ? `<div class="ee-pics">${loosePics(e).map((pc, i) => picHtml(pc, i, false)).join("")}</div>` : "") });
  for (const d of store.allDiary()) {
    const parts = [["My day", d.text, "day"], ["Prayers", d.prayer, "prayer"], ["Thankful for", d.gratitude, "gratitude"]].filter(([, , k]) => want(k));
    add(d.day, { at: d.created || `${d.day}T12:00:00`, kind: only === "all" ? "My day" : BOOK_KINDS[only][0], k: only === "all" ? "day" : only, parts, answered: d.answered });
  }
  for (const j of store.allJournal()) {
    const parts = [["Thoughts", j.text, "bible"], ["Prayers", j.prayer, "prayer"], ["Thankful for", j.gratitude, "gratitude"]].filter(([, , k]) => want(k));
    add(dayOf(j.created || j.updated), { at: j.created || j.updated, kind: "Bible thoughts", k: "bible", ref: j.key, parts, answered: j.answered });
  }
  const order = Object.keys(days).sort();
  if (!order.length) { mascotSay("There's nothing of that kind to print yet."); return; }
  // That day's verse of the day, in their own version when it can be fetched.
  const verses = {};
  await Promise.all(order.map(async (day) => {
    const v = dailyToday(new Date(`${day}T12:00:00`)).verse;
    const ref = `${BOOK_BY_ID[v.book].name} ${v.chapter}:${v.verse}`;
    let words = "";
    try { words = verseFromHtml((await getChapter(store.get("version"), v.book, v.chapter)).html, v.verse) || ""; } catch { /* the reference alone */ }
    verses[day] = { ref, words, theme: v.theme };
  }));
  const [title, sub] = BOOK_KINDS[only] || BOOK_KINDS.all;
  const style = store.get("style");
  const dateParts = (day) => { const d = new Date(`${day}T12:00:00`); return [d.toLocaleDateString([], { weekday: "long" }), d.getDate(), d.toLocaleDateString([], { month: "long", year: "numeric" })]; };
  const html = `<section class="pb-title"><div class="pb-frame">
      <div class="pb-art">${seaScene(style)}</div>
      <p class="pb-orn" aria-hidden="true">❦</p>
      <h1>${esc(title)}</h1><p class="pb-by">${name ? `${esc(sub)} by ${esc(name)}` : esc(sub)}</p>
      <p class="pb-range">${order.length > 1 ? `${esc(dayLabel(order[0]))} to ${esc(dayLabel(order[order.length - 1]))}` : esc(dayLabel(order[0]))}</p>
      <blockquote class="pb-epi">“His compassions fail not. They are new every morning: great is thy faithfulness.”<cite>Lamentations 3:22-23</cite></blockquote>
    </div></section>
    ${order.map((day) => { const [dow, dnum, month] = dateParts(day); return `<article class="pb-day">
      <header class="pb-dayhead"><div class="pb-strip">${seaScene(style, { height: 46 })}</div><div class="pb-when"><span class="pb-dnum">${dnum}</span><span class="pb-dow">${esc(dow)}</span><span class="pb-month">${esc(month)}</span></div></header>
      ${days[day].sort((a, b) => String(a.at).localeCompare(String(b.at))).map((it) => { const filled = it.parts.filter(([, t]) => (t || "").trim()); return `<section class="pb-entry pk-${it.k}">
        <h3><span class="pb-kind">${esc(it.kind)}${it.ref ? ` · ${esc(keyRef(it.ref).name)}` : ""}</span><span class="pb-time">${esc(timeOf(it.at))}</span></h3>${it.head || ""}${it.extra || ""}
        <div class="pb-lines">${filled.map(([label, t]) => `${label && filled.length > 1 ? `<h4>${esc(label)}</h4>` : ""}${paraInk(t, it.pics, para)}`).join("")}</div>
        ${it.answered ? `<p class="pb-answered">Answered ✓ ${esc(fmtDate(it.answered))}</p>` : ""}</section>`; }).join("")}
      <div class="pb-blank" aria-hidden="true"></div>
      <footer class="pb-verse"><span class="pb-vlabel">The verse for ${esc(dow)}</span>${verses[day].words ? `<q>${esc(verses[day].words)}</q>` : `<q>${esc(verses[day].theme)}</q>`}<cite>${esc(verses[day].ref)}</cite></footer>
    </article>`; }).join("")}`;
  printPages(html, "journal", title);
}
// The study notes for a chapter, with your own notes on it, laid out for paper.
function printNotes(book, chapter) {
  const n = notesFor(book, chapter), key = `${book}.${chapter}`;
  const name = refName({ book, chapter });
  const mine = store.allEntries().filter((e) => NOTE_KINDS.includes(e.kind) && (e.ref === key || (e.quotes || []).some((q) => q.ref.startsWith(`${key}.`))));
  const srcKeys = n ? Object.keys(n.sources) : [];
  const cite = (ids) => ids?.length ? `<sup>${ids.map((k) => srcKeys.indexOf(k) + 1).join(",")}</sup>` : "";
  const ev = (k) => k && EVIDENCE[k] ? `<span class="pn-ev">${esc(EVIDENCE[k].label)}</span>` : "";
  const intro = INTROS[book];
  const section = (x) => `<section class="pn-sec"><h2>${esc(x.title)}</h2>${x.items.map((it) => it.word
      ? `<div class="pn-item"><h3><span class="pn-orig">${esc(it.word)}</span> ${esc(it.say)} · <i>${esc(it.means)}</i></h3><p>${esc(it.text)}${cite(it.src)}</p>${it.strongs ? `<p class="pn-small">Strong's ${esc(it.strongs)}${it.count ? `; used ${esc(it.count)}` : ""}</p>` : ""}</div>`
      : `<div class="pn-item"><h3>${it.ref ? `<span class="pn-ref">${esc(it.ref)}</span> ` : ""}${esc(it.head)} ${it.who ? `<span class="pn-ev">${esc(it.who)}</span>` : ev(it.ev)}</h3><p>${esc(it.text)}${cite(it.src)}</p>${it.ask ? `<p class="pn-small">${esc(it.ask)}</p>` : ""}</div>`).join("")}</section>`;
  const html = `<section class="pn-cover"><div class="pb-art">${seaScene(store.get("style"), { height: 120 })}</div>
      <p class="pb-orn" aria-hidden="true">❦</p><h1>${esc(name)}</h1><p class="pb-by">Study notes${(store.get("name") || "").trim() ? ` · ${esc(store.get("name").trim())}` : ""}</p>
      ${n ? `<p class="pn-lead">${esc(n.intro)}</p>` : intro ? `<p class="pn-lead">${esc(intro.about || "")}</p>` : ""}</section>
    ${n ? `${n.sections.map(section).join("")}
      ${n.map ? `<section class="pn-sec pn-map"><h2>Map</h2>${mapSvg(n.map)}<p class="pn-small">${esc(n.map.caption)}</p></section>` : ""}
      ${n.crossRefs ? `<section class="pn-sec"><h2>Cross-references</h2><ul class="pn-x">${n.crossRefs.map(([, r, why]) => `<li><b>${esc(r)}</b> ${esc(why)}</li>`).join("")}</ul></section>` : ""}` : ""}
    ${mine.length ? `<section class="pn-sec pn-mine"><h2>My notes</h2>${mine.map((e) => `<div class="pn-item"><h3>${esc(KIND[e.kind]?.label || "Note")} <span class="pb-time">${esc(dayLabel(dayOf(e.created)))}</span></h3>${e.title ? `<p><b>${esc(e.title)}</b></p>` : ""}${(e.quotes || []).map((q, i) => quoteCardHtml(q, i, false)).join("")}${loosePics(e).length ? `<div class="ee-pics">${loosePics(e).map((pc, i) => picHtml(pc, i, false)).join("")}</div>` : ""}${e.text ? `<div class="pb-lines">${paraInk(e.text, e.pics, (t) => esc(t).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join(""))}</div>` : ""}</div>`).join("")}</section>` : ""}
    ${n ? `<section class="pn-sec pn-sources"><h2>Sources</h2><ol>${srcKeys.map((k) => `<li>${esc(sourceText(n.sources[k]))}</li>`).join("")}</ol></section>` : ""}`;
  printPages(html, "notes", `Study notes: ${name}`);
}
$("#makeBook").addEventListener("click", makeJournalBook);

function showDiaryDay(day) {
  const d = store.diaryEntry(day);
  if (!d) return;
  const para = (t) => esc(t).replace(/\n/g, "<br>");
  $("#diaryToday").innerHTML = `<div class="diary-card"><p class="diary-date">${esc(dayLabel(day))}</p><h2>My day</h2>
    ${DIARY_BOXES.filter((b) => (d[b.field] || "").trim()).map((b) => `<p class="jb-label">${b.icon} ${b.label}</p><p class="diary-read">${para(d[b.field])}</p>`).join("")}
    <button class="small" id="backToday">Back to my journal</button></div>`;
  $("#backToday").addEventListener("click", renderDiaryToday);
  $("#diaryToday").scrollIntoView({ block: "start" });
}
// Everything they've written, newest first, to read again. Tap an entry to open it.
function renderJournalList(justSaved = null) {
  const el = $("#journalList");
  if (!el) return;
  const keep = document.querySelector(".keepsake-row");
  if (keep) keep.hidden = journalLocked();
  if (journalLocked()) { el.innerHTML = ""; el.append(unlockForm(() => { renderJournalList(); renderDiaryToday(); })); return; }
  const lockRow = store.get("journalLock") ? lockNowButton(renderJournalList) : null;
  const snip = (t) => `${esc(t.slice(0, 160))}${t.length > 160 ? "…" : ""}`;
  const items = [
    ...store.allEntries().filter((e) => !KIND[e.kind]?.notesOnly).map((e) => ({ type: "entry", at: e.created, kinds: [e.kind, ...(e.prayer?.trim() ? ["prayer"] : []), ...(e.gratitude?.trim() ? ["gratitude"] : [])], e })),
    ...store.allDiary().map((d) => ({ type: "diary", at: d.updated, kinds: ["day", ...(d.prayer?.trim() ? ["prayer"] : []), ...(d.gratitude?.trim() ? ["gratitude"] : [])], d })),
    ...store.allJournal().map((j) => ({ type: "chapter", at: j.updated, kinds: ["bible", ...(j.prayer?.trim() ? ["prayer"] : []), ...(j.gratitude?.trim() ? ["gratitude"] : [])], j })),
  ].filter((it) => journalFilter === "all" || it.kinds.includes(journalFilter)).sort((a, b) => String(b.at).localeCompare(String(a.at)));
  const filters = [["all", "All"], ...ENTRY_KINDS.filter((k) => !k.notesOnly).map((k) => [k.kind, k.label])];
  const row = (it) => {
    if (it.type === "entry") {
      const e = it.e, k = KIND[e.kind] || KIND.day;
      return `<button class="log-row entry-row er-${e.kind}${e.id === justSaved ? " just-saved" : ""}" data-entry="${e.id}"><strong>${k.icon} ${esc(entryLabel(e))}${e.ref ? ` · ${esc(keyRef(e.ref).name)}` : ""}${e.answered ? " · answered ✓" : ""}</strong><small>${esc(stampNow(new Date(e.created)))}</small><span class="log-dates">${entrySnippet(e)}</span>${e.prayer?.trim() ? `<span class="log-dates"><em>Prayer:</em> ${snip(e.prayer)}</span>` : ""}${e.gratitude?.trim() ? `<span class="log-dates"><em>Thankful for:</em> ${snip(e.gratitude)}</span>` : ""}</button>`;
    }
    if (it.type === "diary") return `<button class="log-row is-daily" data-day="${it.d.day}"><strong>✎ My day</strong><small>${esc(dayLabel(it.d.day))}</small>${DIARY_BOXES.filter((b) => (it.d[b.field] || "").trim()).map((b) => `<span class="log-dates"><em>${b.label}:</em> ${snip(it.d[b.field])}</span>`).join("")}</button>`;
    const j = it.j;
    return `<button class="log-row" data-key="${j.key}"><strong>📖 ${esc(keyRef(j.key).name)}</strong><small>${fmtDate(j.created || j.updated)}</small>${JOURNAL_BOXES.filter((b) => (j[b.field] || "").trim()).map((b) => `<span class="log-dates"><em>${b.label}:</em> ${snip(j[b.field])}</span>`).join("")}</button>`;
  };
  // On this day: what you wrote on this date in earlier years (like a keepsake journal's memories).
  const past = journalFilter === "all" ? onThisDay(items, (it) => (it.type === "diary" ? it.d.day : it.at)) : [];
  el.innerHTML = (past.length ? `<div class="on-this-day"><h3 class="journal-list-head">🕰️ On this day</h3><p class="muted small-print">What you wrote on ${esc(new Date().toLocaleDateString(undefined, { month: "long", day: "numeric" }))} in years before.</p>${past.map((p) => row(p.item).replace("<small>", `<small>${p.years === 1 ? "1 year ago" : `${p.years} years ago`} · `)).join("")}</div>` : "")
    + `<h3 class="journal-list-head">My entries</h3><div class="journal-filter">${filters.map(([v, l]) => `<button data-jf="${v}" aria-pressed="${journalFilter === v}">${esc(l)}</button>`).join("")}</div>`
    + (items.length ? items.map(row).join("") : `<p class="empty">${journalFilter === "all" ? "Nothing written yet. Tap one of the buttons above to write your first entry." : "Nothing here yet."}</p>`);
  el.querySelectorAll("[data-entry]").forEach((b) => b.addEventListener("click", () => openEntry({ id: b.dataset.entry })));
  el.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => showDiaryDay(b.dataset.day)));
  el.querySelectorAll("[data-jf]").forEach((b) => b.addEventListener("click", () => { journalFilter = b.dataset.jf; renderJournalList(); }));
  el.querySelectorAll("[data-key]").forEach((b) => b.addEventListener("click", () => {
    const r = keyRef(b.dataset.key); showView("read"); openChapter(r.book, r.chapter); $("#journalBox").open = true;
  }));
  if (lockRow) el.prepend(lockRow);
}

/* ---------- My Notes: church, reading, study path and general notes ---------- */
// Scripture references written in plain text ("John 3:16", "1 Cor 13:4-7", "Ps 23") are found
// so they can open the passage right there.
const REF_ABBR = { gen: "GEN", ex: "EXO", exod: "EXO", lev: "LEV", num: "NUM", deut: "DEU", dt: "DEU", josh: "JOS", judg: "JDG", sam: "SA", kgs: "KI", kings: "KI", chr: "CH", chron: "CH", neh: "NEH", esth: "EST", ps: "PSA", psa: "PSA", psalm: "PSA", psalms: "PSA", prov: "PRO", pr: "PRO", eccl: "ECC", eccles: "ECC", song: "SNG", isa: "ISA", jer: "JER", lam: "LAM", ezek: "EZK", dan: "DAN", hos: "HOS", obad: "OBA", mic: "MIC", nah: "NAM", hab: "HAB", zeph: "ZEP", hag: "HAG", zech: "ZEC", mal: "MAL", matt: "MAT", mt: "MAT", mk: "MRK", lk: "LUK", luk: "LUK", jn: "JHN", jhn: "JHN", rom: "ROM", ro: "ROM", cor: "CO", gal: "GAL", eph: "EPH", phil: "PHP", php: "PHP", col: "COL", thess: "TH", thes: "TH", tim: "TI", tit: "TIT", phlm: "PHM", heb: "HEB", jas: "JAS", pet: "PE", pt: "PE", jud: "JUD", rev: "REV", revelation: "REV", revelations: "REV" };
const REF_RE = /\b([123](?:st|nd|rd)?\s?)?([A-Z][a-z]+(?:\sof\s[A-Z][a-z]+)?)\.?\s(\d{1,3})(?:\s?:\s?(\d{1,3})(?:\s?[-–]\s?(\d{1,3}))?)?/g;
function refBook(num, word) {
  const n = num ? num.trim()[0] : "";
  const w = norm(word);
  const byName = BOOKS.find((b) => norm(b.name) === `${n}${w}`);
  if (byName) return byName;
  const a = REF_ABBR[w];
  if (!a) return null;
  const id = a.length === 2 ? `${n}${a}` : a;
  return a.length === 2 && !n ? null : BOOK_BY_ID[id] || null;
}
function scanRefs(text) {
  const out = [], seen = new Set();
  for (const m of String(text || "").matchAll(REF_RE)) {
    const b = refBook(m[1], m[2]);
    const ch = Number(m[3]);
    if (!b || ch < 1 || ch > b.chapters) continue;
    const r = { book: b.id, chapter: ch, verse: Number(m[4] || 0), end: Number(m[5] || 0) };
    r.name = `${b.name} ${ch}${r.verse ? `:${r.verse}` : ""}${r.end ? `-${r.end}` : ""}`;
    r.match = m[0];
    if (!seen.has(r.name)) { seen.add(r.name); out.push(r); }
  }
  return out;
}
// Pasted Scripture: one reference plus the verse's words, in either order ("John 3:16 For God…"
// or "“For God…” John 3:16 (NASB)"). Returns a verse card with the words exactly as pasted.
const VERSION_TAGS = /\(?\b(NASB(?:1995|2020)?|NASB95|LSB|ESV|KJV|NKJV|NIV|CSB|HCSB|NLT|NRSV|RSV|ASV|AMP|MSG|NET|WEB)\b\)?/;
function scriptureFromPaste(text) {
  const t = String(text || "").trim();
  if (t.length < 20 || t.length > 2500) return null;
  const refs = scanRefs(t).filter((r) => r.verse);
  if (refs.length !== 1) return null;
  const r = refs[0];
  const ver = (t.match(VERSION_TAGS) || [])[1] || "";
  let words = t.replace(r.match, " ").replace(VERSION_TAGS, " ").replace(/\s+/g, " ").trim();
  words = words.replace(/^[\s\-–—:,(]+|[\s\-–—,(]+$/g, "").replace(/\(\s*\)/g, "").trim().replace(/^["“”']+|["“”']+$/g, "").trim();
  if (words.split(/\s+/).length < 4) return null;
  return { ref: `${r.book}.${r.chapter}.${r.verse}${r.end ? `-${r.end}` : ""}`, text: words, ver };
}
const refButton = (r, text = `📖 ${r.name}`) => `<button type="button" class="ref-link" data-peek="${r.book}.${r.chapter}.${r.verse}.${r.end}">${esc(text)}</button>`;
// Turns references in already-escaped text into buttons.
function linkRefs(html) {
  return html.replace(REF_RE, (whole, num, word, ch, v, end) => {
    const b = refBook(num, word);
    if (!b || Number(ch) < 1 || Number(ch) > b.chapters) return whole;
    return refButton({ book: b.id, chapter: Number(ch), verse: Number(v || 0), end: Number(end || 0) }, whole);
  });
}
// A small window with the passage, so a note (or a class) can stay open underneath.
const peekSheet = document.createElement("dialog");
peekSheet.className = "word-sheet peek-sheet"; peekSheet.setAttribute("aria-label", "Passage");
peekSheet.addEventListener("click", (e) => { if (e.target === peekSheet) peekSheet.close(); });
async function refPeek(key) {
  const [book, c, v, end] = key.split(".");
  const chapter = Number(c), verse = Number(v), last = Number(end) || verse;
  const name = `${BOOK_BY_ID[book].name} ${chapter}${verse ? `:${verse}${Number(end) ? `-${end}` : ""}` : ""}`;
  const ver = (versionList().find(([x]) => x === store.get("version")) || ["", "NASB"])[1];
  peekSheet.innerHTML = `<div class="ws-head"><h2>${esc(name)}</h2><button type="button" class="ws-close" aria-label="Close">✕</button></div>
    <div class="peek-text"><p class="muted small-print">Loading…</p></div>
    <div class="ee-acts"><button type="button" class="small" data-peek-go>Open in the Bible</button><button type="button" class="small" data-peek-close>Close</button></div>`;
  peekSheet.querySelectorAll(".ws-close, [data-peek-close]").forEach((b) => b.addEventListener("click", () => peekSheet.close()));
  peekSheet.querySelector("[data-peek-go]").addEventListener("click", async () => { peekSheet.close(); showView("read"); await openChapter(book, chapter); if (verse > 1) setTimeout(() => goToVerse(verse), 300); });
  if (!peekSheet.isConnected) document.body.append(peekSheet);
  if (!peekSheet.open) peekSheet.showModal();
  const box = peekSheet.querySelector(".peek-text");
  try {
    const res = await getChapter(store.get("version"), book, chapter);
    const from = verse || 1, to = verse ? Math.min(last, from + 11) : 3;
    const parts = [];
    for (let n = from; n <= to; n += 1) { const t = verseFromHtml(res.html, n); if (t) parts.push(`<sup>${n}</sup>${esc(t)}`); }
    box.innerHTML = parts.length ? `<p class="peek-words">${parts.join(" ")}${!verse || last > to ? " …" : ""}</p><p class="muted small-print">${esc(ver)}</p>` : `<p class="muted small-print">That verse wasn't found in ${esc(name.split(":")[0])}.</p>`;
  } catch { box.innerHTML = `<p class="muted small-print">The passage couldn't load just now. Check your connection, or tap Open in the Bible.</p>`; }
}
document.addEventListener("click", (e) => {
  const b = e.target.closest?.("[data-peek]");
  if (!b) return;
  e.preventDefault(); e.stopPropagation();
  refPeek(b.dataset.peek);
}, true);
function defaultHeading(e) {
  if (e.kind === "church") return "Church notes";
  if (e.kind === "class") return "Bible class";
  if (e.kind === "study" && e.path && PATH_BY_ID[e.path]) return `${PATH_BY_ID[e.path].name}${e.ref ? `: ${keyRef(e.ref).name}` : ""}`;
  if (e.ref) return `Notes on ${keyRef(e.ref).name}`;
  return e.created ? `Note, ${fmtDate(e.created)}` : "A short heading, like Sunday school outline";
}
let notesFilter = "all";
function renderNotesList(justSaved = null) {
  const el = $("#notesList");
  if (!el) return;
  const all = store.allEntries().filter((e) => NOTE_KINDS.includes(e.kind));
  const list = shownNotes();

  $("#notesFilter").innerHTML = [["all", "All"], ...NOTE_FILTERS.map((k) => [k, NOTE_LABEL[k]])].map(([v, l]) => `<button type="button" data-nf="${v}" aria-pressed="${notesFilter === v}">${esc(l)}${v === "all" ? "" : ` <span class="muted">${all.filter((e) => noteGroup(e.kind) === v).length}</span>`}</button>`).join("");
  $("#notesRange").textContent = list.length ? `${list.length} note${list.length === 1 ? "" : "s"} · ${noteRange(list)}${notesFilter === "study" ? studyPathsLine(list) : ""}` : "";
  $("#notesFilter").querySelectorAll("[data-nf]").forEach((b) => b.addEventListener("click", () => { notesFilter = b.dataset.nf; renderNotesList(); }));
  if (!list.length) { el.innerHTML = `<p class="empty">${all.length ? "No notes match." : "No notes yet. Tap one of the buttons above to start one. Every note is dated, and you can give it a heading so it's easy to find."}</p>`; return; }
  let lastDay = "";
  el.innerHTML = list.map((e) => {
    const d = dayOf(e.created);
    const head = d !== lastDay ? `<h3 class="nl-day">${esc(dayLabel(d))}</h3>` : "";
    lastDay = d;
    const k = KIND[e.kind];
    const words = (e.text || "").trim();
    const snip = words.length > 220 ? `${words.slice(0, 220)}…` : words;
    const refs = scanRefs(`${e.passage || ""}`).concat(e.ref && e.kind !== "church" && e.kind !== "class" ? [{ ...keyRef(e.ref), verse: 0, end: 0, name: keyRef(e.ref).name }] : []);
    return `${head}<article class="note-card nk-${e.kind}${e.id === justSaved ? " just-saved" : ""}">
      ${choosing ? `<label class="nc-pick"><input type="checkbox" data-pick="${e.id}" ${picked.has(e.id) ? "checked" : ""}> Print this one</label>` : ""}
      <button type="button" class="nc-open" data-note="${e.id}"><span class="nc-kind">${k.icon} ${esc(NOTE_LABEL[e.kind])} · ${esc(timeOf(e.created))}${e.kind === "study" && PATH_BY_ID[e.path] ? `<small class="nc-path">${esc(PATH_BY_ID[e.path].name)} path</small>` : ""}</span><strong class="nc-title">${esc(e.title || defaultHeading(e))}</strong>${e.speaker ? `<span class="nc-sub">${esc(e.speaker)}</span>` : ""}<span class="go" aria-hidden="true">›</span></button>
      ${refs.length ? `<p class="nc-refs">${refs.map((r) => refButton(r)).join(" ")}</p>` : ""}
      ${snip ? `<p class="nc-snip nf-${esc(e.font || "classic")}">${linkRefs(esc(snip)).replace(/\n/g, "<br>")}</p>` : ""}
      ${(e.quotes?.length || e.pics?.length) ? `<p class="nc-extras">${[e.quotes?.length && `📖 ${e.quotes.length} verse${e.quotes.length === 1 ? "" : "s"}`, e.pics?.some((p) => p.t === "table") && "▦ table", e.pics?.some((p) => p.t === "chart") && "📊 chart", e.pics?.some((p) => p.t === "photo") && "📷 photo", e.pics?.some((p) => p.t === "ink") && "✏️ handwriting", e.pics?.some((p) => p.t === "sticker") && e.pics.filter((p) => p.t === "sticker").slice(0, 4).map((p) => stickerSvg(p.id, "mini-sticker")).join("")].filter(Boolean).join(" · ")}</p>` : ""}
    </article>`;
  }).join("");
  el.querySelectorAll("[data-note]").forEach((b) => b.addEventListener("click", () => openEntry({ id: b.dataset.note }, $("#notesEditor"))));
  el.querySelectorAll("[data-pick]").forEach((c) => c.addEventListener("change", () => { if (c.checked) picked.add(c.dataset.pick); else picked.delete(c.dataset.pick); syncPrintButtons(); }));
  syncPrintButtons();
}
// Choosing which notes to print: tick the ones you want, then print them (or save as a PDF).
let choosing = false;
const picked = new Set();
function syncPrintButtons() {
  const all = shownNotes();
  const pb = $("#printNotes"), cb = $("#chooseNotes");
  if (!pb || !cb) return;
  pb.hidden = !all.length; cb.hidden = !all.length;
  const n = [...picked].filter((id) => all.some((e) => e.id === id)).length;
  pb.textContent = choosing ? (n ? `🖨 Print the ${n} I picked` : "Tick the notes to print") : all.length === store.allEntries().filter((e) => NOTE_KINDS.includes(e.kind)).length ? "🖨 Print all my notes" : `🖨 Print these ${all.length}`;
  pb.disabled = choosing && !n;
  cb.textContent = choosing ? "Done choosing" : "☑ Choose which to print";
}
const noteRange = (list) => { const d = list.map((e) => dayOf(e.created)).sort(); const f = (x) => new Date(`${x}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); return d[0] === d[d.length - 1] ? f(d[0]) : `${f(d[0])} to ${f(d[d.length - 1])}`; };
const studyPathsLine = (list) => { const p = [...new Set(list.map((e) => PATH_BY_ID[e.path]?.name).filter(Boolean))]; return p.length ? ` · ${p.join(", ")} path${p.length > 1 ? "s" : ""}` : ""; };
// Notes on paper: each note with its heading, date, passage, verses, tables and pictures.
function printNotesBook(list, title = "My Notes") {
  if (!list.length) { mascotSay("There are no notes to print here yet."); return; }
  const name = (store.get("name") || "").trim();
  const days = [...new Set(list.map((e) => dayOf(e.created)))].sort();
  const para = (t) => esc(t).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  const one = (e) => `<section class="pn-note nk-${e.kind}">
      <p class="pn-meta">${esc(NOTE_LABEL[e.kind] || "Note")} · ${esc(stampNow(new Date(e.created)))}</p>
      <h2>${esc(e.title || defaultHeading(e))}</h2>
      ${e.kind === "study" && PATH_BY_ID[e.path] ? `<p class="pn-path">${esc(PATH_BY_ID[e.path].name)} path</p>` : ""}
      ${e.speaker || e.passage || (e.ref && e.kind !== "church" && e.kind !== "class") ? `<p class="pn-sub">${[e.speaker, e.passage, e.ref && e.kind !== "church" && e.kind !== "class" ? keyRef(e.ref).name : ""].filter(Boolean).map(esc).join(" · ")}</p>` : ""}
      ${(e.quotes || []).map((q, i) => quoteCardHtml(q, i, false)).join("")}
      ${e.text ? `<div class="pb-lines nf-${esc(e.font || "classic")}">${paraInk(e.text, e.pics, para)}</div>` : ""}
      ${loosePics(e).length ? `<div class="ee-pics">${loosePics(e).map((pc, i) => picHtml(pc, i, false)).join("")}</div>` : ""}
      ${scanRefs(`${e.passage || ""} ${e.text || ""}`).length ? `<p class="pn-verses">Verses: ${scanRefs(`${e.passage || ""} ${e.text || ""}`).map((r) => esc(r.name)).join(" · ")}</p>` : ""}
    </section>`;
  const html = list.length === 1 ? `<article class="pn-book">${one(list[0])}</article>`
    : `<section class="pn-cover"><div class="pb-art">${seaScene(store.get("style"), { height: 120 })}</div><p class="pb-orn" aria-hidden="true">❦</p><h1>${esc(title)}</h1>
      ${list.every((e) => e.kind === "study") && studyPathsLine(list) ? `<p class="pn-path">${esc(studyPathsLine(list).slice(3))}</p>` : ""}
      <p class="pb-by">${name ? esc(name) : ""}</p><p class="pb-range">${list.length} note${list.length === 1 ? "" : "s"} · ${days.length > 1 ? `${esc(dayLabel(days[0]))} to ${esc(dayLabel(days[days.length - 1]))}` : esc(dayLabel(days[0]))}</p></section>
      <article class="pn-book">${[...list].sort((a, b) => a.created.localeCompare(b.created)).map(one).join("")}</article>`;
  printPages(html, "notes", title);
}
function shownNotes() {
  const q = norm($("#notesSearch")?.value || "");
  return store.allEntries().filter((e) => NOTE_KINDS.includes(e.kind) && (notesFilter === "all" || noteGroup(e.kind) === notesFilter)
    && (!q || norm(`${e.title || ""} ${e.text || ""} ${e.speaker || ""} ${e.passage || ""} ${e.ref ? keyRef(e.ref).name : ""} ${(e.quotes || []).map((x) => x.text).join(" ")} ${(e.pics || []).filter((p) => p.t === "table").map((p) => p.rows.flat().join(" ")).join(" ")}`).includes(q)));
}
$("#printNotes")?.addEventListener("click", () => {
  const list = shownNotes().filter((e) => !choosing || picked.has(e.id));
  printNotesBook(list, notesFilter === "all" ? "My Notes" : NOTE_LABEL[notesFilter]);
});
$("#chooseNotes")?.addEventListener("click", () => { choosing = !choosing; if (!choosing) picked.clear(); renderNotesList(); });
document.querySelectorAll("[data-new-note]").forEach((b) => b.addEventListener("click", () => openEntry({ kind: b.dataset.newNote }, $("#notesEditor"))));
$("#notesSearch")?.addEventListener("input", () => renderNotesList());
document.querySelectorAll("[data-open-games]").forEach((b) => b.addEventListener("click", () => quest.open()));
// Quick links at the top of the side margin: notes, journal and games one tap away.
document.querySelectorAll("[data-margin-go]").forEach((b) => b.addEventListener("click", () => {
  if (window.innerWidth < 1000) setMargin(false);
  if (b.dataset.marginGo) showView(b.dataset.marginGo);
}));

/* ---------- Trivia ---------- */
const triviaDlg = $("#trivia");
function updateTriviaHint() {
  const { book, chapter } = store.get("last");
  $("#triviaBtn").classList.remove("glow");
  const n = pickQuestions({ isRead: (k) => isReadKey(k), current: { book, chapter }, count: 99 }).length;
  $("#triviaHint").textContent = n ? `${Math.min(5, n)} quick questions on what you just read` : "A quick check for this chapter is coming soon";
}
function isReadKey(k) { const [b, c] = k.split("."); return store.isRead(b, Number(c)); }
function startTrivia() {
  const current = store.get("last");
  const qs = pickQuestions({ isRead: isReadKey, current, pathId: store.get("activePath"), recent: store.get("trivia").recent, seen: store.get("trivia").seen || {} });
  const results = [];
  let i = 0;
  $("#triviaTitle").textContent = "Quick check";
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
      <p class="trivia-kind">${q.review ? "🔁 Review · " : ""}${kindLabel[q.kind] || ""} · ${q.refs.map((r) => esc(keyRef(r).name)).join(" + ")}</p>
      <p class="trivia-q" tabindex="-1">${esc(q.q)}</p>
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
    // Many explanations are just the verse reference: then say the answer in words too.
    const refOnly = whyIsRef(q.why);
    why.innerHTML = `<strong>${right ? "Yes!" : "Not quite."}</strong> ${right ? "" : `The answer is <strong>${esc(q.choices[q.a])}</strong>. `}${refOnly ? `<span class="trivia-ref">${esc(q.why.replace(/\.$/, ""))}</span>` : esc(q.why)}`;
    results[results.length - 1].q = q;
    body.querySelectorAll(".trivia-progress span")[i].className = right ? "right" : "wrong";
    const next = Object.assign(document.createElement("button"), { className: "trivia-next", textContent: i + 1 < qs.length ? "Next question" : "See my score" });
    next.addEventListener("click", () => { i += 1; showQ(); body.querySelector(".trivia-q")?.focus(); });
    body.append(next);
    // On a small phone the Next button can land below the edge; bring it into view.
    next.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.graphics !== "full" ? "auto" : "smooth" });
  }
  function showScore() {
    // Start the score at the top, so the header picture isn't half scrolled away.
    requestAnimationFrame(() => { for (let el = body; el; el = el.parentElement) { if (el.scrollTop) el.scrollTop = 0; if (el.tagName === "DIALOG") break; } });
    const keepRec = keepingRecord();
    store.recordTrivia(results, `${BOOK_BY_ID[current.book].name} ${current.chapter}`, keepRec);
    const score = results.filter((r) => r.right).length;
    const r = knowledgeRating(store.get("trivia"));
    const great = score / results.length >= 0.8;
    const fresh = qs.filter((q) => !q.review).length;
    body.innerHTML = `<div class="trivia-score">
      <p class="big">${score}/${results.length}</p>
      <p>${great ? "Wonderful! You know this well." : score ? "Good work. Every round helps it stick." : "That's how we learn. Try another round."}</p>
      <p class="muted small-print">${fresh === qs.length ? "All new questions this round." : `${fresh} new question${fresh === 1 ? "" : "s"} and ${qs.length - fresh} review.`}</p>
      ${keepRec ? `<p class="muted small-print">Your Bible knowledge: <strong>${esc(r.level)}</strong> · ${r.pct}% correct over ${r.answered} questions. See how you're growing in My Bible.</p>` : `<p class="muted small-print">No record is kept, as you chose. You can turn it on in Settings.</p>`}
      ${missedHtml(results)}
      <button class="trivia-next" id="playAgain">Play again with new questions</button></div>`;
    $("#playAgain").addEventListener("click", startTrivia);
    body.querySelectorAll("[data-read]").forEach((b) => b.addEventListener("click", () => { triviaDlg.close(); jumpTo(JSON.parse(b.dataset.read)); }));
    celebrate(great ? "big" : "small");
    mascotSay(great ? "Hooray! That was wonderful!" : "Nice try! Let's keep learning together.");
  }
  showQ();
  if (!triviaDlg.open) triviaDlg.showModal();
  body.querySelector(".trivia-q")?.focus(); // start on the question, not the Close button
}
// "Genesis 1:3–5" or "John 1:29; Isaiah 53:7" with nothing else: a reference, not an explanation.
const WHY_REF = /((?:[1-3] )?[A-Z][a-z]+(?: of [A-Z][a-z]+)?) (\d+)(?::(\d+))?/;
function whyIsRef(why = "") { return /^[\s\d:;,.–-]*$/.test(why.replace(new RegExp(WHY_REF.source, "g"), "")); }
function refIn(text = "") {
  const m = text.match(WHY_REF);
  const r = m && findRefs(`${m[1]} ${m[2]}${m[3] ? `:${m[3]}` : ""}`)[0];
  return r && r.chapter ? { book: r.book, chapter: r.chapter, verse: r.verse, label: m[0] } : null;
}
// After a round: the questions they missed, with the right answer and a tap to read the verse.
function missedHtml(results) {
  const missed = results.filter((r) => !r.right && r.q);
  if (!missed.length) return "";
  return `<div class="trivia-missed"><h3>To read again</h3><ul>${missed.map(({ q }) => {
    const r = refIn(q.why) || (q.refs?.[0] && (() => { const k = keyRef(q.refs[0]); return k ? { book: k.book, chapter: k.chapter, verse: 0, label: k.name } : null; })());
    return `<li><span>${esc(q.q)}</span><strong>${esc(q.choices[q.a])}</strong>${r ? `<button type="button" class="small quiet-link" data-read='${esc(JSON.stringify({ book: r.book, chapter: r.chapter, verse: r.verse }))}'>📖 Read ${esc(r.label)}</button>` : ""}</li>`;
  }).join("")}</ul></div>`;
}
$("#triviaBtn").addEventListener("click", startTrivia);
$("#triviaClose").addEventListener("click", () => triviaDlg.close());
const keepingRecord = () => store.get("knowledgeRecord") !== false;
// How someone is growing: their last rounds as small bars, and this month against last month.
function growthHtml(t) {
  const rounds = t.sessions.slice(0, 12).reverse();
  if (rounds.length < 2) return "";
  const month = (d) => d.slice(0, 7), now = new Date();
  const thisM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastM = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;
  const pctIn = (m) => { const s = t.sessions.filter((x) => month(x.at) === m); const a = s.reduce((n, x) => n + x.total, 0); return a ? Math.round((s.reduce((n, x) => n + x.score, 0) / a) * 100) : null; };
  const a = pctIn(thisM), b = pctIn(lastM);
  return `<div class="growth" aria-label="Your last ${rounds.length} rounds">${rounds.map((x) => `<span class="gbar" style="height:${Math.max(8, Math.round((x.score / x.total) * 100))}%" title="${esc(x.label || "")}: ${x.score} of ${x.total}"></span>`).join("")}</div>
    <small class="growth-note">Your last ${rounds.length} rounds${a !== null ? ` · this month ${a}%` : ""}${b !== null ? ` · last month ${b}%` : ""}${a !== null && b !== null && a > b ? " · growing! 🌱" : ""}</small>`;
}
function renderKnowledge() {
  const t = store.get("trivia");
  $("#knowledge").hidden = !keepingRecord();
  if (!keepingRecord()) { $("#knowledge").innerHTML = ""; return; }
  const r = knowledgeRating(t);
  const last = t.sessions[0];
  const C = 2 * Math.PI * 22;
  $("#knowledge").innerHTML = `<svg class="ring" viewBox="0 0 54 54" aria-hidden="true">
      <circle cx="27" cy="27" r="22" fill="none" stroke="var(--line)" stroke-width="6"/>
      <circle cx="27" cy="27" r="22" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(r.pct / 100) * C} ${C}" transform="rotate(-90 27 27)"/>
    </svg>
    <strong>Bible knowledge: ${esc(r.level)}</strong>
    <small>${t.answered ? `${r.pct}% correct over ${t.answered} trivia questions${last ? ` · last round ${last.score}/${last.total} on ${fmtDate(last.at)}` : ""}` : "Take a quick check after reading to see your rating grow."}</small>
    ${growthHtml(t)}`;
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
  buddy.place(); // keeps the study buddy away from the corner friend
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
  const saveName = () => {
    const v = $("#userName").value.trim();
    store.set("name", v);
    setMyName(v);
    $("#userNameMsg").textContent = v ? `Saved ✓ Hi, ${v}!` : "Saved ✓";
  };
  $("#userName").addEventListener("change", saveName);
  $("#saveUserName").addEventListener("click", saveName);
  renderLookCard();
  $("#modePace").checked = store.get("yearPace");
  $("#modePace").addEventListener("change", (e) => { store.set("yearPace", e.target.checked); renderMargin(); });
  // The saved passcode shows as dots (with Show to see it), so it's clear one is saved.
  const lockStatus = (saved = false) => {
    const has = Boolean(store.get("journalLock"));
    $("#lockStatus").textContent = has ? `${saved ? "Saved ✓ " : "✓ "}Your journal has a passcode.` : "No passcode yet. Your journal is open to anyone using this device.";
    $("#lockStatus").classList.toggle("ok", has);
    $("#lockLabel").textContent = has ? "Your passcode" : "New passcode";
    $("#lockCode").value = has ? store.get("journalCode") || "" : "";
    $("#lockCode").placeholder = has ? "Saved (type a new one to change it)" : "4 to 8 digits";
    $("#lockShow").hidden = has && !store.get("journalCode") && !$("#lockCode").value;
    $("#lockSet").textContent = has ? "Save new passcode" : "Save passcode";
  };
  lockStatus();
  $("#lockCode").addEventListener("input", () => { $("#lockShow").hidden = false; });
  $("#lockShow").addEventListener("click", () => {
    const show = $("#lockCode").type === "password";
    $("#lockCode").type = show ? "text" : "password";
    $("#lockShow").textContent = show ? "Hide" : "Show";
    $("#lockShow").setAttribute("aria-pressed", String(show));
  });
  $("#lockSet").addEventListener("click", async () => {
    const code = $("#lockCode").value.trim();
    if (!/^\d{4,8}$/.test(code)) { $("#lockStatus").textContent = "Use 4 to 8 digits (numbers only)."; $("#lockStatus").classList.remove("ok"); return; }
    store.set("journalLock", await hashCode(code));
    store.set("journalCode", code); // kept on this device only, so they can look it up
    journalUnlocked = false; lockStatus(true); renderJournal();
  });
  $("#lockClear").addEventListener("click", () => {
    if (journalLocked()) { $("#lockStatus").textContent = "Unlock your journal first (open it under any chapter), then remove the passcode."; return; }
    store.set("journalLock", ""); store.set("journalCode", ""); lockStatus(); $("#lockStatus").textContent = "Passcode removed. Your journal is open."; renderJournal();
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
  const keyStatus = (t) => { $("#apiKeyStatus").textContent = t; };
  const saveKey = () => {
    const inv = readInviteCode(apiKey.value);
    if (inv) { applyInvite(inv); applyAppearance(); return true; }
    const v = apiKey.value.trim();
    if (v === store.get("apiBibleKey")) return false;
    store.set("apiBibleKey", v);
    return true;
  };
  apiKey.addEventListener("change", saveKey);
  $("#saveApiKey").addEventListener("click", () => {
    if (!apiKey.value.trim()) { keyStatus("Paste the key into the box first."); apiKey.focus(); return; }
    saveKey();
    keyStatus("Saved ✓ Checking which versions it opens…");
    $("#loadVersions").click();
  });
  esvKey.addEventListener("change", () => { store.set("esvKey", esvKey.value.trim()); syncVersionSwitch(); });
  $("#saveEsvKey").addEventListener("click", async () => { store.set("esvKey", esvKey.value.trim()); syncVersionSwitch(); keyStatus((esvKey.value.trim() ? "ESV key saved ✓" : "ESV key removed.") + await saveForFamily()); });
  if (store.get("apiBibleKey")) keyStatus("Key saved on this device ✓");
  // One device, one family: the invite link is only for a home without accounts.
  if (authEnabled) $("#shareKeyBox").hidden = true;
  const extrasNow = () => {
    const x = store.get("extraBibles") || [];
    $("#extraVersionsNow").textContent = x.length ? `On everyone's version switch: ${[(store.get("nasbLabel") || "NASB"), ...x.map((b) => b.label)].join(", ")}${store.get("esvKey") ? ", ESV" : ""}.` : "";
  };
  extrasNow();
  size.addEventListener("input", () => { store.set("textSize", Number(size.value)); applyAppearance(); });
  theme.addEventListener("change", () => { store.set("theme", theme.value); applyAppearance(); });
  $("#pageWidth").value = store.get("pageWidth") || "medium";
  $("#pageWidth").addEventListener("change", () => { store.set("pageWidth", $("#pageWidth").value); applyAppearance(); });
  $("#uiScale").value = String(store.get("uiScale") || 100);
  $("#uiScale").addEventListener("change", () => { store.set("uiScale", Number($("#uiScale").value)); applyAppearance(); });
  $("#contrastHigh").checked = Boolean(store.get("contrast"));
  $("#contrastHigh").addEventListener("change", () => { store.set("contrast", $("#contrastHigh").checked); applyAppearance(); });
  $("#wordTap").checked = store.get("wordTap") !== false;
  $("#followNotes").checked = store.get("followNotes") !== false;
  $("#focusRead").checked = store.get("focusRead") !== false;
  $("#humanVoice").checked = store.get("humanVoice") !== false;
  $("#knowledgeRecord").checked = keepingRecord();
  $("#knowledgeRecord").addEventListener("change", (e) => { store.set("knowledgeRecord", e.target.checked); $("#clearKnowledge").hidden = !e.target.checked; renderKnowledge(); });
  $("#clearKnowledge").hidden = !keepingRecord();
  $("#clearKnowledge").addEventListener("click", (e) => {
    const b = e.currentTarget;
    if (b.dataset.sure !== "1") { b.dataset.sure = "1"; b.textContent = "Tap again to clear it"; return; }
    store.clearKnowledge(); b.dataset.sure = ""; b.textContent = "Cleared ✓"; renderKnowledge();
  });
  $("#humanVoice").addEventListener("change", (e) => { store.set("humanVoice", e.target.checked); const { book, chapter } = store.get("last"); reader.stop(); openChapter(book, chapter); });
  $("#focusRead").addEventListener("change", (e) => { store.set("focusRead", e.target.checked); if (!e.target.checked) setBarsAway(false); });
  $("#followNotes").addEventListener("change", (e) => { store.set("followNotes", e.target.checked); followKey = ""; });
  $("#wordTap").addEventListener("change", () => { store.set("wordTap", $("#wordTap").checked); syncStudyWords(); });
  $("#studyWords").checked = store.get("studyWords") !== false;
  $("#studyWords").addEventListener("change", () => { store.set("studyWords", $("#studyWords").checked); syncStudyWords(); });
  $("#helperStyle").value = store.get("helperStyle") || "";
  $("#helperStyle").addEventListener("change", () => store.set("helperStyle", $("#helperStyle").value));
  sel.addEventListener("change", () => {
    store.set("nasbBibleId", sel.value);
    store.set("nasbLabel", sel.value ? sel.selectedOptions[0].dataset.label || sel.selectedOptions[0].textContent.split(" · ")[0] : "");
    // The new main version can't also be an extra one.
    store.set("extraBibles", (store.get("extraBibles") || []).filter((b) => b.id !== sel.value));
    if (!$("#extraVersions").hidden) $("#loadVersions").click();
    extrasNow();
    syncVersionSwitch();
    saveForFamily();
    if (store.get("version") === "NASB") { const { book, chapter } = store.get("last"); openChapter(book, chapter, { scroll: false }); }
  });
  $("#loadVersions").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const quiet = btn.dataset.quiet === "1"; delete btn.dataset.quiet;
    planVersionsLoaded = true;
    if (!apiKey.value.trim()) { keyStatus("Paste the API.Bible key into the box first, then tap Save."); return; }
    saveKey();
    btn.textContent = "Loading…";
    try {
      const bibles = await listEnglishBibles();
      const current = store.get("nasbBibleId");
      // First time: the NASB 2020 is the family's main version when the plan has it, and the
      // well-known versions are all turned on (each person can switch between them).
      let defaulted = false;
      if (!store.get("versionsDefaulted")) {
        defaulted = true;
        const n = pickNasb(bibles);
        if (n && (!current || /2020/.test(versionName(n)))) { store.set("nasbBibleId", n.id); store.set("nasbLabel", versionName(n)); }
        const main = store.get("nasbBibleId");
        const picks = [];
        for (const re of FAVORITE_VERSIONS) for (const b of bibles) if (b.id !== main && (re.test(b.abbr) || re.test(b.name)) && !picks.includes(b)) picks.push(b);
        const had = (store.get("extraBibles") || []).filter((b) => b.id !== main);
        const merged = [...new Map([...had, ...picks.map((b) => ({ id: b.id, label: versionName(b) }))].map((b) => [b.id, b])).values()].slice(0, MAX_EXTRA_BIBLES);
        store.set("extraBibles", merged);
        store.set("versionsDefaulted", true);
        extrasNow(); syncVersionSwitch();
        if (store.get("version") === "NASB") { const { book, chapter } = store.get("last"); openChapter(book, chapter, { scroll: false }); }
      }
      const mainId = store.get("nasbBibleId");
      sel.innerHTML = `<option value="">Pick automatically</option>` + bibles.map((b) => `<option value="${esc(b.id)}" data-label="${esc(versionName(b))}"${b.id === mainId ? " selected" : ""}>${esc(versionName(b))} · ${esc(b.name)}</option>`).join("");
      const hasNkjv = bibles.some((b) => /NKJV|New King James/i.test(`${b.abbr} ${b.name}`));
      btn.textContent = "Check my plan again";
      const fam = quiet && !defaulted ? "" : await saveForFamily();
      if (quiet) keyStatus(`Key saved ✓ ${bibles.length} English version${bibles.length === 1 ? "" : "s"} on your plan. Pick the family's main version, and turn the others on or off below.`);
      else keyStatus(`Saved ✓ Your key works and opens ${bibles.length} English version${bibles.length === 1 ? "" : "s"}${hasNkjv ? "" : " (the NKJV isn't on this plan)"}.${fam} Turn on the ones the family can pick from below.`);
      const chosen = new Set((store.get("extraBibles") || []).map((b) => b.id));
      // The ones that are on come first, so the family's choices are easy to see.
      const others = bibles.filter((b) => b.id !== store.get("nasbBibleId")).sort((a, b) => Number(chosen.has(b.id)) - Number(chosen.has(a.id)));
      $("#extraVersionList").innerHTML = others.map((b) => `<label class="switch-row"><span>${esc(versionName(b))}<small>${esc(b.name)}</small></span><input type="checkbox" role="switch" data-extra="${esc(b.id)}" data-label="${esc(versionName(b))}" ${chosen.has(b.id) ? "checked" : ""}></label>`).join("");
      $("#extraVersions").hidden = false;
      $("#extraVersionList").querySelectorAll("[data-extra]").forEach((i) => i.addEventListener("change", () => {
        let x = (store.get("extraBibles") || []).filter((b) => b.id !== i.dataset.extra);
        if (i.checked) {
          if (x.length >= MAX_EXTRA_BIBLES) { i.checked = false; $("#extraVersionsNow").textContent = `Up to ${MAX_EXTRA_BIBLES} extra versions fit on the switch. Turn one off first.`; return; }
          x = [...x, { id: i.dataset.extra, label: i.dataset.label }];
        }
        store.set("extraBibles", x);
        extrasNow(); syncVersionSwitch();
        saveForFamily().then((fam) => { if (fam) $("#extraVersionsNow").textContent += fam; });
      }));
    } catch (err) {
      btn.textContent = "Check my plan for versions";
      keyStatus(`That key didn't work: ${String(err.message || "couldn't load the versions").replace(/\.+$/, "")}. Check that the whole key was pasted, then tap Save again.`);
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
  { id: "version", title: "Your Bible version", done: () => Boolean(store.get("setup")?.version) },
  { id: "tour", title: "A quick tour", done: () => Boolean(store.get("tourSeen")) },
];
// With accounts, the Bible key comes from the family account (the organizer sets it in
// Settings), so nobody is asked about keys during setup.
SETUP_STEPS = SETUP_STEPS.filter((st) => (authEnabled ? st.id !== "key" : st.id !== "password"));
let setupAt = 0;
// "new": nothing chosen yet on this device. "started": begun but not finished. "done": finished or put off.
function setupState() {
  const su = store.get("setup") || {};
  if (su.done || su.skipped) return "done";
  return store.get("name").trim() || su.look || su.password ? "started" : "new";
}
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
      <label class="field">What should the app call you?<input id="setupName" type="text" autocomplete="given-name" value="${esc(store.get("name"))}" placeholder="Your first name"></label>
      <div class="setup-buddy"><span class="buddy buddy-inline" aria-hidden="true">${BUDDY_SVG}</span>
        <label class="field buddy-name-field">And what would you like to call your study buddy?<input id="setupBuddyName" type="text" autocomplete="off" maxlength="16" value="${esc(buddyName())}"></label></div>
      <p class="muted small-print">He's the little friend at the side of the screen. Tap him any time to ask a question.</p>`;
    $("#setupName").addEventListener("input", (e) => { store.set("name", e.target.value.trim()); $("#userName").value = e.target.value.trim(); });
    $("#setupName").addEventListener("change", (e) => setMyName(e.target.value));
    $("#setupBuddyName").addEventListener("input", (e) => setBuddyName(e.target.value));
  } else if (step.id === "look") {
    body.innerHTML = `<h2 class="setup-h">How should it look?</h2>
      <p class="muted small-print">Classic 1 is chosen for you. Pick another if you like. You can change it any time in Settings, under Look.</p>
      <div class="look-grid">${lookPickerHtml("setupLook")}</div>
      <p class="muted small-print" style="margin-top:14px">Pictures</p>${chips(GRAPHICS, store.get("graphics") || "full", "data-s-gfx")}
      <p class="muted small-print">${esc(GRAPHICS.find(([v]) => v === (store.get("graphics") || "full"))[2])}</p>`;
    wireLookPicker(body, "setupLook", () => { setupSet({ look: true }); renderSetup(); });
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
  } else if (step.id === "version") {
    const list = versionList(), cur = store.get("version");
    setupSet({ version: true });
    body.innerHTML = `<h2 class="setup-h">Which Bible do you like to read?</h2>
      <p class="muted small-print">${list.length > 1 ? "The NASB is chosen for you. Pick your favorite. You can switch any time at the top of the Read page." : "The NASB is ready for you. If the family adds more versions, you can pick one in Settings, under You."}</p>
      <div class="setup-versions">${list.map(([v, l]) => `<button type="button" class="setup-path" data-s-ver="${esc(v)}" aria-pressed="${v === cur}"><span><strong>${esc(l)}</strong></span></button>`).join("")}</div>`;
    body.querySelectorAll("[data-s-ver]").forEach((b) => b.addEventListener("click", () => { store.set("version", b.dataset.sVer); syncVersionSwitch(); renderSetup(); }));
  } else if (step.id === "password") {
    body.innerHTML = `<h2 class="setup-h">Make your own password</h2>
      <p class="muted">You signed in with the starter password. Choose your own now, something you'll remember. If you ever forget it, tap "Forgot password?" on the sign-in screen and we'll email you a link.</p>
      <label class="field">New password<span class="pw-wrap"><input id="setupPw" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="At least 6 letters or numbers"><button type="button" class="pw-show" data-show="setupPw" aria-label="Hide password" aria-pressed="true">Hide</button></span></label>
      <button type="button" class="big-btn" id="setupPwSave">Save my password</button>
      <p class="setup-key-status" id="setupPwMsg" role="status">${store.get("setup")?.password ? "Your own password is saved ✓" : ""}</p>
      <p class="muted small-print">You'll stay signed in on this device. You can change your password any time in Settings, under Account.</p>`;
    $("#setupPwSave").addEventListener("click", async () => {
      const a = $("#setupPw").value, msg = $("#setupPwMsg"), problem = passwordProblem(a);
      if (problem) { msg.textContent = problem; return; }
      $("#setupPwSave").disabled = true; msg.textContent = "Saving…";
      try { await changePassword(a); setupSet({ password: true }); flag(STARTER_KEY, false); flag(RESET_KEY, false); msg.textContent = "Your own password is saved ✓ Tap Next."; $("#setupPw").value = ""; renderSetupDots(); }
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
  { id: "trivia", label: "Quick check", hint: "A few questions after each chapter" },
  { id: "games", label: "Bible games", hint: "Quiz yourself or play together, on Home and in this menu" },
  { id: "journal", label: "Chapter journal", hint: "Thoughts, prayers and gratitude under each chapter" },
  { id: "diary", label: "Daily life journal", hint: "A dated page for each day, and the keepsake journal book, in Journal" },
  { id: "buddy", label: "Study buddy", hint: "The little stick-figure friend at the side. Tap him to ask anything. Drag him anywhere along the edge" },
  { id: "buddyvisits", label: "Study buddy says hi now and then", hint: "Once in a while he walks over to ask if you're wondering anything. A few times a day at most" },
  { id: "mascot", label: "Corner friend", hint: "The lamb or donkey in the Animated look" },
  { id: "vines", label: "Olive branches on the edges", hint: "The branches down both sides" },
  { id: "pathmargin", label: "Learning path button", hint: "The ☰ button for the path list" },
  { id: "visits", label: "My visits to a chapter", hint: "How often and when you've opened each chapter, under the chapter title" },
];
// [value, name, short description, swatch colors]. The saved values "masculine" and "animated"
// are kept so nobody's choice changes; only their names did.
const LOOKS = [
  ["classic", "Classic 1", "Brown, gray and white, with olive branches, three crosses on a hill, soft sun and clouds. Clouds drift and birds glide in Lively pictures.", ["#3a3430", "#ffffff", "#7d8a6e"]],
  ["classic2", "Classic 2", "Navy, blues and warm browns: olive branches and the five loaves and two fish, softly glowing (John 6). Clouds drift in Lively pictures.", ["#1f2b42", "#dfe7f1", "#7a5a40"]],
  ["seasons", "Seasonal changes", "Warm, glowing painted scenes that change through the year: a New Year's dawn, a winter sunrise, angels, spring rain, Easter, gardens and flowers, Bible-times life, the Sea of Galilee, scrolls by lamplight, Psalm 23, the harvest and Advent.", ["#3a2a20", "#fffaf2", "#e0a85a"]],
  ["classic3", "Classic 3", "Hand-colored Holy Land paintings by David Roberts (1839): Jerusalem, Mount Tabor and the Sea of Galilee, in stone, sand and sky colors. The painting changes with the passage you read.", ["#4a3b2c", "#efe6d6", "#8aa0b0"]],
  ["sage", "Sage", "A spring garden with olive trees, blossoms, doves and three crosses. Doves fly and petals fall in Lively pictures.", ["#46604f", "#fbfaf6", "#f2c9cf"]],
  ["nativity", "Nativity", "Navy night sky, desert browns and a star over Bethlehem. Good all year.", ["#1c2742", "#d8a94e", "#5b4636"]],
  ["easter", "Easter", "Sunrise colors, lilies and the empty tomb. Birds fly at sunrise in Lively pictures.", ["#5e5578", "#f3d9b9", "#8a9a6e"]],
  ["fall", "Thanksgiving", "The Lord's Supper in the upper room, with harvest wheat and prayers of thanks. Oil lamps flicker and birds fly past the windows in Lively pictures.", ["#6e3b22", "#d9a441", "#f4ecdc"]],
  ["christmas", "Christmas", "A big nativity in red, green and gold, under the star.", ["#1f3a2e", "#8c2a2a", "#d4b062"]],
  ["masculine", "Animated", "Warm browns, with boats and fish that move.", ["#3b2b20", "#efe3d0", "#b8875a"]],
  ["animated", "For kids", "Bright colors, a friendly lamb, and pictures that change with the Bible story.", ["#3f6f7a", "#e9f4f6", "#e07a5f"]],
];
// Calm looks: no cartoons and no confetti, and motion only with Lively pictures (birds, breeze, candles). Nativity and Christmas follow the Pictures setting,
// so their star twinkles with Lively pictures and stays put with Still pictures.
function isStill(style = store.get("style")) { return ["classic", "classic2", "classic3", "seasons", "sage", "easter", "fall"].includes(style); }
// A drop-down of looks with a live picture of the chosen one right beside it, so people can
// see what they're picking (used in first-time setup and in Settings).
function lookPickerHtml(id) {
  const cur = store.get("style");
  const [, , d, sw] = LOOKS.find(([v]) => v === cur) || LOOKS[0];
  return `<label class="field look-pick">Look<select id="${id}">${LOOKS.map(([v, l]) => `<option value="${v}" ${cur === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></label>
    <div class="look-preview" aria-live="polite">${seaScene(cur)}<p><span class="look-sw" aria-hidden="true">${sw.map((c) => `<i style="background:${c}"></i>`).join("")}</span>${esc(d)}</p></div>`;
}
function wireLookPicker(host, id, after) {
  host.querySelector(`#${id}`).addEventListener("change", (e) => {
    setStyle(e.target.value);
    const keep = document.activeElement === e.target;
    after();
    if (keep) document.getElementById(id)?.focus();
  });
}
function renderLookCard() {
  const grid = $("#lookGrid");
  if (!grid) return;
  grid.innerHTML = lookPickerHtml("lookSelect");
  wireLookPicker(grid, "lookSelect", renderLookCard);
  const g = store.get("graphics") || "full";
  $("#lookGraphics").innerHTML = GRAPHICS.map(([v, l]) => `<button data-set-gfx="${v}" aria-pressed="${g === v}">${l}</button>`).join("");
  $("#lookGraphicsNote").textContent = GRAPHICS.find(([v]) => v === g)[2];
  $("#lookGraphics").querySelectorAll("[data-set-gfx]").forEach((b) => b.addEventListener("click", () => { store.set("graphics", b.dataset.setGfx); applyAppearance(); renderLookCard(); }));
}
const GRAPHICS = [["full", "Lively", "Gentle motion in every look: birds and doves in flight, branches and flowers in the breeze, fish swimming, twinkling stars. Plus friendly characters and confetti in the playful looks."], ["simple", "Still", "The same scenes, maps and borders, drawn still and elegant: no cartoon faces, no motion and no confetti. A good fit for anyone who'd rather not have cartoons."], ["none", "Text only", "Just the Bible text and tools, no pictures."]];
const QM_GROUPS = [
  ["reading", "Under each chapter", ["listen", "notes", "trivia", "journal", "visits"]],
  ["journal", "Journal and games", ["diary", "games"]],
  ["friends", "Buddy and decorations", ["buddy", "buddyvisits", "mascot", "vines", "pathmargin"]],
];
function renderQuickMenu() {
  const shown = store.get("show") || {};
  // Three short folded groups instead of one long list of switches.
  const row = (f) => `<label class="switch-row"><span>${esc(f.label)}<small>${esc(f.hint)}</small></span><input type="checkbox" role="switch" data-qm-feat="${f.id}" ${shown[f.id] === false ? "" : "checked"}></label>`;
  const open = new Set([...document.querySelectorAll("#qmToggles details[open]")].map((d) => d.dataset.qmGroup));
  $("#qmToggles").innerHTML = QM_GROUPS.map(([id, title, ids]) => {
    const fs = FEATURES.filter((f) => ids.includes(f.id));
    const on = fs.filter((f) => shown[f.id] !== false).length;
    return `<details class="qm-group" data-qm-group="${id}" ${open.has(id) ? "open" : ""}><summary>${esc(title)}<small>${on} of ${fs.length} showing</small></summary>${fs.map(row).join("")}</details>`;
  }).join("");
  $("#qmToggles").querySelectorAll("[data-qm-feat]").forEach((i) => i.addEventListener("change", () => {
    store.set("show", { ...(store.get("show") || {}), [i.dataset.qmFeat]: i.checked });
    applyAppearance();
    const d = i.closest("details"), all = d.querySelectorAll("[data-qm-feat]");
    d.querySelector("summary small").textContent = `${[...all].filter((x) => x.checked).length} of ${all.length} showing`;
    if (i.dataset.qmFeat === "pathmargin" && !i.checked) setMargin(false);
  }));
}
// The same two buddy switches, in Settings.
function setBuddyName(v) {
  store.set("buddyName", String(v || "").trim().slice(0, 16));
  const n = buddyName();
  chatSheet.querySelector("h2").firstChild.textContent = `Ask ${n} anything!`;
  buddy.el.setAttribute("aria-label", `Talk to ${n}, your study buddy`);
  if ($("#buddyNameInput") && document.activeElement !== $("#buddyNameInput")) $("#buddyNameInput").value = n;
}
function renderBuddyToggles() {
  const shown = store.get("show") || {};
  const on = (id) => (id === "buddyvoice" || id === "buddysleepy" ? shown[id] === true : shown[id] !== false);
  $("#buddyToggles").innerHTML = `<label class="field buddy-name-field">His name<input id="buddyNameInput" type="text" autocomplete="off" maxlength="16" value="${esc(buddyName())}"></label>` + [["buddy", "Show my study buddy"], ["buddyvisits", "He says hi now and then"], ["buddysleepy", "He naps more and plays less (quieter)"], ...(canSpeak ? [["buddyvoice", "He talks out loud (uses the read-aloud voice)"]] : [])].map(([id, l]) => `<label class="switch-row"><span>${l}</span><input type="checkbox" role="switch" data-buddy-feat="${id}" ${on(id) ? "checked" : ""}></label>`).join("");
  $("#buddyNameInput").addEventListener("input", (e) => setBuddyName(e.target.value));
  $("#buddyToggles").querySelectorAll("[data-buddy-feat]").forEach((i) => i.addEventListener("change", () => {
    store.set("show", { ...(store.get("show") || {}), [i.dataset.buddyFeat]: i.checked });
    applyAppearance();
  }));
}
renderBuddyToggles();
$("#menuBtn").addEventListener("click", () => { renderQuickMenu(); $("#quickMenu").showModal(); });
$("#menuClose").addEventListener("click", () => $("#quickMenu").close());
$("#qmGames").addEventListener("click", () => { $("#quickMenu").close(); quest.open(); });
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
// Every name is shown twice when it changed: brown for its name in Bible times, blue for
// today's. A key under the map says which is which.
const shortNow = (t) => String(t || "").split(/[:(]/)[0].trim();
let mapUid = 0;
function mapSvg(map) {
  const u = ++mapUid;
  const { bounds, water, rivers, dryRivers = [], islands = [] } = map.outline;
  const riverLabels = map.outline.riverLabels.map((l) => l.text ? { ...l, then: l.text, now: l.text } : l);
  const waterLabels = map.outline.waterLabels || [{ ...map.outline.waterLabel, then: map.outline.waterLabel.text, now: map.outline.waterLabel.text }];
  const W = 340;
  const mid = ((bounds.lat[0] + bounds.lat[1]) / 2) * Math.PI / 180;
  const H = Math.round(W * (bounds.lat[1] - bounds.lat[0]) / ((bounds.lon[1] - bounds.lon[0]) * Math.cos(mid)));
  const X = (lon) => ((lon - bounds.lon[0]) / (bounds.lon[1] - bounds.lon[0])) * W;
  const Y = (lat) => ((bounds.lat[1] - lat) / (bounds.lat[1] - bounds.lat[0])) * H;
  // Smooth curves through the traced points, so coasts and rivers look drawn, not ruled.
  const f = (q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  const curve = (pts, closed) => {
    const P = pts.map(([la, lo]) => [X(lo), Y(la)]), n = P.length;
    if (n < 3) return P.map((q, i) => `${i ? "L" : "M"}${f(q)}`).join(" ") + (closed ? " Z" : "");
    const at = (i) => (closed ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))]);
    let d = `M${f(P[0])}`;
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const [a, b, c, e] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
      d += ` C${f([b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6])} ${f([c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6])} ${f(c)}`;
    }
    return d + (closed ? " Z" : "");
  };
  // Lakes and islands close smoothly; seas that run off the map close along its edge.
  const shape = (pts) => { const [a, b] = [pts[0], pts[pts.length - 1]]; return Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.6 ? curve(pts, true) : `${curve(pts, false)} Z`; };
  const line = (pts) => curve(pts, false);
  // Mountains: little peaks along each range, about 15 pixels apart, only where they fit.
  const peaks = (MAP_OUTLINES.RANGES || []).map((r) => {
    const P = r.map(([la, lo]) => [X(lo), Y(la)]);
    const segs = P.slice(1).map((q, i) => Math.hypot(q[0] - P[i][0], q[1] - P[i][1]));
    const len = segs.reduce((a, b) => a + b, 0);
    if (len < 8 || len > 9000) return "";
    const out = [];
    for (let t = 6, k = 0; t < len; t += 15, k++) {
      let s2 = t, i = 0;
      while (i < segs.length - 1 && s2 > segs[i]) s2 -= segs[i++];
      const a = P[i], b = P[i + 1], fr = segs[i] ? s2 / segs[i] : 0, nx = -(b[1] - a[1]) / (segs[i] || 1), ny = (b[0] - a[0]) / (segs[i] || 1), j = k % 2 ? 3.5 : -3.5;
      const x = a[0] + (b[0] - a[0]) * fr + nx * j, y = a[1] + (b[1] - a[1]) * fr + ny * j;
      if (x > 4 && x < W - 4 && y > 6 && y < H - 4) out.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><path class="map-peak" d="M-6 3 L -1.5 -4 L 0.5 -1.6 L 2.4 -4.6 L 7 3 Z"/><path class="map-peak-shade" d="M2.4 -4.6 L 7 3 L 3.2 3 Z"/></g>`);
    }
    return out.join("");
  }).join("");
  const deserts = (MAP_OUTLINES.DESERTS || []).map((d) => `<path d="${shape(d)}"/>`).join("");
  const mpp = ((bounds.lon[1] - bounds.lon[0]) * Math.cos(mid) * 69.17) / W;
  const miles = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500].reduce((b, m) => (Math.abs(m / mpp - 64) < Math.abs(b / mpp - 64) ? m : b), 1);
  const barW = miles / mpp;
  const twoNames = (then, now, x, y, anchor, cls, angle = 0) => {
    const same = !then || !now || then === now;
    const rot = angle ? ` transform="rotate(${angle} ${x.toFixed(1)} ${y.toFixed(1)})"` : "";
    return `<text class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}"${rot}>${then ? `<tspan class="${same ? "nm-both" : "nm-then"}">${esc(then)}</tspan>` : ""}${!same || !then ? `<tspan class="nm-now" x="${x.toFixed(1)}" dy="${then ? "1.1em" : 0}">${esc(now)}</tspan>` : ""}</text>`;
  };
  const hasEden = map.places.some((p) => p.kind === "eden");
  const used = [];
  const places = map.places.map((p, i) => {
    const x = X(p.lon), y = Y(p.lat);
    let right = p.side ? p.side === "right" : x < W * 0.62;
    const wide = Math.max(String(p.then || "").length, shortNow(p.now).length) * 5.7;
    const fits = (r2) => (r2 ? x + 8 + wide < W - 2 : x - 8 - wide > 2);
    if (!fits(right) && fits(!right)) right = !right;
    if (map.auto) {
      // Close places: put the label on the other side, or move it down, so names don't overlap.
      const hit = (r2, yy) => used.some((u) => u.right === r2 && Math.abs(u.y - yy) < 26 && Math.abs(u.x - x) < 90);
      let dy = 0;
      if (hit(right, y)) { if (!hit(!right, y) && fits(!right)) right = !right; else while (hit(right, y + dy) && dy < 66) dy += 11; }
      p = { ...p, dy };
      used.push({ x, y: y + dy, right });
    }
    const eden = p.kind === "eden";
    const dot = eden ? `<circle class="map-eden-ring" cx="${x}" cy="${y}" r="7"/><circle class="map-dot map-eden" cx="${x}" cy="${y}" r="4.2"/>` : `<circle class="map-dot" cx="${x}" cy="${y}" r="4"/>`;
    return `<g class="map-place${eden ? " is-eden" : ""}" data-place="${i}" tabindex="0" role="button" aria-label="${esc(p.then)}${p.now !== p.then ? `, today ${esc(p.now)}` : ""}">
      <circle class="map-dot-halo" cx="${x}" cy="${y}" r="10"/>${dot}
      ${twoNames(p.then, shortNow(p.now), right ? x + 8 : x - 8, y + 3 + (p.dy || 0), right ? "start" : "end", "map-label")}</g>`;
  }).join("");
  const KH = 22; // the key, in a band under the map
  const key = `<g class="map-key" transform="translate(0 ${H})"><rect class="map-key-band" width="${W}" height="${KH}"/>
    <text x="10" y="15"><tspan class="nm-then">Brown</tspan><tspan class="nm-key"> = Bible times</tspan><tspan class="nm-now" dx="10">Blue</tspan><tspan class="nm-key"> = today</tspan></text>
    ${hasEden ? `<circle class="map-dot map-eden" cx="${W - 134}" cy="11" r="4"/><text class="nm-key" x="${W - 126}" y="15">${esc(map.maybe || "Possible site of Eden")}</text>` : ""}
    <g class="map-compass" transform="translate(${W - 13} 11)"><path d="M0 -8 L 3 1 L 0 -1 L -3 1 Z"/><text y="9" text-anchor="middle">N</text></g></g>`;
  return `<svg class="notes-map" viewBox="0 0 ${W} ${H + KH}" role="img" aria-label="Map: ${esc(map.caption)}">
    <defs><clipPath id="mapClip${u}"><rect width="${W}" height="${H + KH}" rx="14"/></clipPath>
      <clipPath id="mapSea${u}">${water.map((w) => `<path d="${shape(w)}"/>`).join("")}</clipPath>
      <radialGradient id="mapLand${u}" cx="50%" cy="42%" r="75%"><stop offset="0" stop-color="#f6efdd"/><stop offset=".7" stop-color="#ece0c4"/><stop offset="1" stop-color="#dfcda6"/></radialGradient>
      <linearGradient id="mapSeaFill${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc6d6"/><stop offset="1" stop-color="#86b3c6"/></linearGradient>
      <pattern id="mapSand${u}" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".75"/><circle cx="5" cy="4.8" r=".6"/></pattern>
      <filter id="mapGrain${u}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .27  0 0 0 0 .16  0 0 0 .55 -.18"/></filter></defs>
    <g clip-path="url(#mapClip${u})"><rect class="map-land" width="${W}" height="${H}" style="fill:url(#mapLand${u})"/>
    <g class="map-desert" style="fill:url(#mapSand${u})">${deserts}</g>
    ${rivers.map((r) => `<path class="map-valley" d="${line(r)}"/>`).join("")}
    ${peaks}
    ${water.map((w) => `<path class="map-water" d="${shape(w)}" style="fill:url(#mapSeaFill${u})"/>`).join("")}
    <g clip-path="url(#mapSea${u})">${water.map((w) => `<path class="map-shallow" d="${shape(w)}"/>`).join("")}</g>
    ${water.map((w) => `<path class="map-coast" d="${shape(w)}"/>`).join("")}
    ${islands.map((w) => `<path class="map-island" d="${curve(w, true)}" style="fill:url(#mapLand${u})"/>`).join("")}
    ${rivers.map((r) => `<path class="map-river" d="${line(r)}"/>`).join("")}
    ${dryRivers.map((r) => `<path class="map-river dry" d="${line(r)}"/>`).join("")}
    ${waterLabels.map((l) => twoNames(l.then, l.now, X(l.lon), Y(l.lat), "middle", "map-water-label", l.angle)).join("")}
    ${riverLabels.map((l) => twoNames(l.then, l.now, X(l.lon), Y(l.lat), "middle", "map-river-label", l.angle)).join("")}
    <rect class="map-grain" width="${W}" height="${H}" filter="url(#mapGrain${u})"/>
    <g class="map-scale" transform="translate(10 ${H - 10})"><rect x="-4" y="-13" width="${(barW + 8).toFixed(1)}" height="17" rx="4"/><path d="M0 0 L ${barW.toFixed(1)} 0 M 0 -3 L 0 3 M ${barW.toFixed(1)} -3 L ${barW.toFixed(1)} 3 M ${(barW / 2).toFixed(1)} -2 L ${(barW / 2).toFixed(1)} 2"/><text x="${(barW / 2).toFixed(1)}" y="-4" text-anchor="middle">${miles} ${miles === 1 ? "mile" : "miles"}</text></g>
    ${places}${key}<rect class="map-frame" x="1.5" y="1.5" width="${W - 3}" height="${H + KH - 3}" rx="13"/></g></svg>`;
}
/* ---------- When and where: the time period, regions, a places map and the tribes ---------- */
let placesData = null;
function loadPlaces() {
  if (!placesData) placesData = fetch("data/places.json").then((r) => (r.ok ? r.json() : null)).catch(() => null).then((d) => { if (!d) placesData = null; return d; });
  return placesData;
}
const placeName = (n) => n.replace(/\s\d+$/, "");
const SURE = { 3: "Location known", 2: "Location likely", 1: "Location uncertain" };
const NOT_ON_MAP = new Set(["region", "people group", "special"]);
// Chapters that are about the twelve tribes as a whole.
const TRIBE_CHAPTERS = new Set(["GEN.29", "GEN.30", "GEN.35", "GEN.48", "GEN.49", "EXO.1", "EXO.28", "NUM.1", "NUM.2", "NUM.7", "NUM.10", "NUM.13", "NUM.26", "NUM.32", "NUM.34", "DEU.27", "DEU.33",
  ...[13, 14, 15, 16, 17, 18, 19, 21, 22].map((c) => `JOS.${c}`), "JDG.1", "JDG.5", "1CH.2", "1CH.6", "1CH.12", "1CH.27", "EZK.47", "EZK.48", "REV.7"]);
let whereMap = null;
function whereOutline(spots) {
  const { NEAR_EAST: ne, GALILEE: gal, SINAI: sin } = MAP_OUTLINES;
  const inside = spots.filter((p) => p.lat >= ne.bounds.lat[0] && p.lat <= ne.bounds.lat[1] && p.lon >= ne.bounds.lon[0] && p.lon <= ne.bounds.lon[1]);
  if (!inside.length) return { inside };
  let la = [Math.min(...inside.map((p) => p.lat)), Math.max(...inside.map((p) => p.lat))];
  let lo = [Math.min(...inside.map((p) => p.lon)), Math.max(...inside.map((p) => p.lon))];
  const grow = (r, want) => { const m = (r[0] + r[1]) / 2, h = Math.max(r[1] - r[0], want) / 2; return [m - h, m + h]; };
  la = grow(la, (la[1] - la[0]) * 1.3 + 0.12); lo = grow(lo, (lo[1] - lo[0]) * 1.25 + 0.12);
  la = grow(la, 1.8); lo = grow(lo, 1.9);
  // Keep the map a comfortable shape, neither a ribbon nor a tower.
  const cos = Math.cos(((la[0] + la[1]) / 2) * Math.PI / 180);
  const tall = (la[1] - la[0]) / ((lo[1] - lo[0]) * cos);
  if (tall > 1.35) lo = grow(lo, (la[1] - la[0]) / (1.35 * cos));
  if (tall < 0.62) la = grow(la, (lo[1] - lo[0]) * cos * 0.62);
  const clamp = (r, b) => { const span = Math.min(r[1] - r[0], b[1] - b[0]); let a = Math.max(b[0], r[0]); if (a + span > b[1]) a = b[1] - span; return [a, a + span]; };
  const bounds = { lat: clamp(la, ne.bounds.lat), lon: clamp(lo, ne.bounds.lon) };
  const inB = (l) => l.lat > bounds.lat[0] && l.lat < bounds.lat[1] && l.lon > bounds.lon[0] && l.lon < bounds.lon[1];
  const small = bounds.lat[1] - bounds.lat[0] < 3;
  const galLabel = { ...gal.waterLabel, then: gal.waterLabel.text, now: gal.waterLabel.text };
  return {
    inside,
    outline: {
      bounds, water: [...ne.water, ...gal.water, ...(small ? sin.water.slice(2, 4) : [])], rivers: [...ne.rivers, ...(small ? gal.rivers : [])], dryRivers: ne.dryRivers, islands: ne.islands,
      riverLabels: ne.riverLabels.filter(inB), waterLabels: [...ne.waterLabels, ...(small ? [galLabel] : [])].filter(inB),
    },
  };
}
function whereHtml(book, chapter) {
  const era = eraFor(book, chapter);
  const debated = `<span class="ev ev-debated" title="Careful scholars date this differently">Debated</span>`;
  return `<div class="where-era"><h4>🏛️ The time</h4><p class="where-title"><strong>${esc(era.title)}</strong></p>
      ${era.dates ? `<p class="where-dates">${esc(era.dates)} ${era.debated ? debated : ""}</p>` : ""}
      ${era.written ? `<p class="where-written"><span class="muted">This book:</span> ${esc(era.written)} ${era.writtenDebated && !era.debated ? debated : ""}</p>` : ""}
      <p class="where-world"><strong>The world around it.</strong> ${esc(era.world)}</p></div>
    <div id="wherePlaces"><p class="muted small-print">Finding the places…</p></div>
    <div id="whereTribes" hidden></div>`;
}
function tribesHtml(named = []) {
  const rows = TRIBES.map((t) => `<li class="tribe${named.includes(t) ? " is-named" : ""}"><p class="tribe-head"><strong>${esc(tribeName(t))}</strong>${t[0].startsWith("Joseph") ? " <span class=\"muted\">(Joseph's line)</span>" : ""} <span class="muted small-print">· mother ${esc(t[1])}</span></p>
    <p>${esc(t[2])}${t[4] ? `. <span class="muted">${esc(t[4])}.</span>` : ""}</p><p class="tribe-refs">${linkRefs(esc(t[3]))}</p></li>`).join("");
  return `<details class="where-tribes" id="whereTribes" open><summary>👑 The tribes of Israel in this chapter${named.length ? ` <span class="rt-sub">${named.length} named</span>` : ""}</summary>
    <p class="muted small-print">Jacob's twelve sons became the twelve tribes. Joseph's line counts as two tribes, Ephraim and Manasseh, and Levi received towns instead of land.</p>
    <ul class="tribes-list">${rows}</ul></details>`;
}
async function fillWhere(el, book, chapter) {
  const box = el.querySelector("#wherePlaces");
  if (!box) return;
  const key = `${book}.${chapter}`;
  box.dataset.key = key;
  // Tribes named in this chapter, when the chapter speaks of tribes.
  // Shown only when the chapter is about the tribes: it speaks of a tribe by name, or it's
  // one of the chapters that lists them (Jacob's blessing, the census, the land divided...).
  const text = $("#reader")?.textContent || "";
  const named = /\btribes?\b/i.test(text) ? TRIBES.filter((t) => new RegExp(`\\b${tribeName(t)}\\b`).test(text)) : [];
  if (named.length || TRIBE_CHAPTERS.has(key)) el.querySelector("#whereTribes")?.replaceWith(Object.assign(document.createElement("div"), { innerHTML: tribesHtml(named) }).firstElementChild);
  const d = await loadPlaces();
  if (box.dataset.key !== key || !box.isConnected) return;
  if (!d) { box.innerHTML = `<p class="muted small-print">The places couldn't load. Check the internet connection and try again.</p>`; return; }
  const all = (d.chapters[key] || []).map((i) => { const [name, lat, lon, conf, modern, type, ids, slug] = d.places[i]; return { name: placeName(name), lat, lon, conf, modern, type, ids, slug }; });
  const regionsNamed = all.filter((p) => p.type === "region");
  const spots = all.filter((p) => !NOT_ON_MAP.has(p.type));
  const regions = [...new Set([...spots.map((p) => regionOf(p.lat, p.lon)).filter(Boolean).map((r) => `${r.then}|${r.now}`)])].map((s) => s.split("|"));
  const chosen = [...spots].sort((a, b) => b.conf - a.conf).slice(0, 12);
  const { inside, outline } = whereOutline(chosen);
  const far = spots.filter((p) => !inside.some((q) => q.slug === p.slug));
  whereMap = inside.map((p) => ({ ...p, then: p.name, now: p.modern && !/^(another name|near|possibly|probably)/i.test(p.modern) ? p.modern : p.name }));
  const credit = `<p class="muted small-print">Places: <a href="https://www.openbible.info/geo/" target="_blank" rel="noopener">OpenBible.info</a> (CC BY), from scholars' and archaeologists' identifications. Coastlines simplified from standard atlases.</p>`;
  if (!all.length) { box.innerHTML = `<h4>🧭 The places</h4><p class="muted small-print">This chapter doesn't name a place on the map.</p>${credit}`; return; }
  const chip = (p) => `<a class="where-chip" href="https://www.openbible.info/geo/ancient/${encodeURIComponent(p.slug)}" target="_blank" rel="noopener">${esc(p.name)}${p.modern ? ` <span class="muted">· ${esc(shortNow(p.modern))}</span>` : ""}</a>`;
  box.innerHTML = `<h4>🧭 The places</h4>
    ${regions.length || regionsNamed.length ? `<p class="where-regions"><span class="muted">Regions:</span> ${[...regions.map(([then, now]) => `<span class="where-region"><strong>${esc(then)}</strong> <span class="muted">· today ${esc(now)}</span></span>`), ...regionsNamed.filter((r) => !regions.some(([t]) => t.startsWith(r.name))).map((r) => `<span class="where-region"><strong>${esc(r.name)}</strong></span>`)].join("")}</p>` : ""}
    ${whereMap.length ? `<div class="map-scroll">${mapSvg({ auto: true, outline, places: whereMap, caption: `Places in ${refName({ book, chapter })}` })}</div><p class="map-swipe muted small-print">Swipe sideways to see the whole map.</p>
    <p class="map-note" id="whereNote">Tap a place on the map to see where it is today and how sure scholars are.</p>` : ""}
    ${spots.length > chosen.length ? `<p class="muted small-print">The map shows ${chosen.length} of the ${spots.length} places named here. All of them:</p><div class="where-chips">${spots.map(chip).join("")}</div>` : ""}
    ${far.length && spots.length <= chosen.length ? `<p class="muted small-print">Farther away, beyond this map:</p><div class="where-chips">${far.map(chip).join("")}</div>` : ""}
    ${credit}`;
  box.querySelectorAll("[data-place]").forEach((g) => {
    const show = () => {
      const p = whereMap[Number(g.dataset.place)];
      box.querySelectorAll(".map-place").forEach((x) => x.classList.toggle("is-on", x === g));
      box.querySelector("#whereNote").innerHTML = `<strong class="nm-then">${esc(p.name)}</strong>${p.modern ? ` <span class="nm-now">· today: ${esc(p.modern)}</span>` : ""}<br>${esc(SURE[p.conf])}${p.ids > 1 ? `; scholars have suggested ${p.ids} sites` : ""}. <a href="https://www.openbible.info/geo/ancient/${encodeURIComponent(p.slug)}" target="_blank" rel="noopener">More about ${esc(p.name)} ↗</a>`;
    };
    g.addEventListener("click", show);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } });
  });
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
// The chapter's words, sorted the way a study Bible would: names of God first, then the
// people and places, the key words worth studying, everyday words, and the small words.
const GOD_WORDS = new Set(["H430", "H3068", "H3069", "H136", "H410", "H433", "H426", "H5945", "H7706", "H3050", "G2316", "G2962", "G2424", "G5547"]);
const strongsGroup = (r) => r[6] ? "small" : GOD_WORDS.has(r[0]) ? "god" : /^[A-Z][a-z]/.test(r[3]) ? "names" : r[4] > 600 ? "common" : "key";
const STRONGS_GROUPS = [
  ["god", "Names of God", "How this chapter names God, and Jesus in the New Testament.", true],
  ["key", "Key words", "The words most worth studying here, the ones this chapter repeats first. Tap one to see its full meaning and every place it is used.", true],
  ["names", "People and places", "Names, and what many of them mean.", false],
  ["common", "Everyday words", "Words used hundreds or thousands of times, like “say”, “all” and “go”.", false],
  ["small", "Small words", "Words like “and”, “the” and “in”.", false],
];
function strongsRow([n, lemma, xlit, gloss, count, verses]) {
  const heb = n[0] === "H";
  const shown = verses.slice(0, 14);
  return `<details class="sc-word" data-n="${n}" data-find="${esc(`${gloss} ${xlit} ${lemma} ${n}`.toLowerCase())}"><summary>
    <span class="orig" lang="${heb ? "he" : "el"}" dir="${heb ? "rtl" : "ltr"}">${esc(lemma)}</span><span class="say">${esc(xlit)}</span><span class="means">“${esc(gloss)}”</span>
    <span class="sc-meta"><span class="strongs-num">${n}</span> ${count.toLocaleString()} time${count === 1 ? "" : "s"} in the Bible · in ${verses.length} verse${verses.length === 1 ? "" : "s"} here</span></summary>
    <div class="sc-body"><div class="sc-verses"><span class="muted small-print">Go to verse</span> ${shown.map((v) => `<button type="button" class="sc-v" data-v="${v}">${v}</button>`).join("")}${verses.length > shown.length ? `<span class="muted small-print">and ${verses.length - shown.length} more</span>` : ""}</div>
    <div class="sc-def muted small-print">Loading Strong's entry…</div></div></details>`;
}
// A few dictionary entries had their word origin split in two when the dictionary was
// prepared ("from an obsolete (to shine...;" + "compare G5316...); luminousness"). Join them back.
function tidyLex(e) {
  if (!e) return e;
  const open = (t) => (t.match(/\(/g) || []).length - (t.match(/\)/g) || []).length;
  let from = e.from || "", def = e.def || "";
  if (open(from) > 0 && def) {
    let depth = open(from), i = 0;
    for (; i < def.length && depth > 0; i++) { if (def[i] === "(") depth++; if (def[i] === ")") depth--; }
    if (depth === 0) { from = `${from.replace(/;\s*$/, ";")} ${def.slice(0, i)}`; def = def.slice(i).replace(/^[;,\s]+/, ""); }
  }
  return { ...e, from, def };
}
// Strong's numbers inside a dictionary entry ("from G756") become taps that show that root word.
const linkStrongs = (html) => html.replace(/\b([GH])(\d{1,4})\b/g, (m) => `<button type="button" class="sc-link" data-n="${m}">${m}</button>`);
// The full concordance: every chapter and verse in the Bible where a Hebrew or Greek word is used.
const concCache = {};
function loadConc(n) {
  const b = n[0] + Math.floor(Number(n.slice(1)) / 100);
  if (!concCache[b]) concCache[b] = fetch(`data/conc/${b}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((d) => { if (!d) delete concCache[b]; return d || {}; });
  return concCache[b].then((d) => d[n]);
}
async function showConcordance(n, host, btn) {
  btn.disabled = true; btn.textContent = "Finding every place…";
  const list = await loadConc(n);
  if (!list) { btn.disabled = false; btn.textContent = "📖 See every place in the Bible"; host.innerHTML = `<p class="muted small-print">Couldn't load the list. Check your connection and try again.</p>`; return; }
  btn.remove();
  const byBook = [];
  for (const s of list) {
    const [ref, vs] = s.split(":"), [book, ch] = ref.split(".");
    if (byBook.at(-1)?.[0] !== book) byBook.push([book, []]);
    byBook.at(-1)[1].push([Number(ch), vs.split(",").map(Number)]);
  }
  const verses = list.reduce((t, s) => t + s.split(":")[1].split(",").length, 0);
  host.innerHTML = `<p class="sc-conc-sum"><strong>${verses.toLocaleString()} verse${verses === 1 ? "" : "s"}</strong> in ${byBook.length} book${byBook.length === 1 ? "" : "s"}. Tap one to go there.</p>
    ${byBook.length > 1 ? `<label class="sc-conc-pick"><span class="sr-only">Jump to a book</span><select>${byBook.map(([b], i) => `<option value="${i}">${esc(BOOK_BY_ID[b]?.name || b)}</option>`).join("")}</select></label>` : ""}
    <div class="sc-conc-list">${byBook.map(([b, chs], i) => `<section class="sc-conc-book" data-i="${i}"><h4>${esc(BOOK_BY_ID[b]?.name || b)}</h4><div class="sc-conc-refs">${chs.map(([c, vs]) => vs.map((v) => `<button type="button" class="sc-ref" data-b="${b}" data-c="${c}" data-v="${v}">${c}:${v}</button>`).join("")).join("")}</div></section>`).join("")}</div>`;
  host.querySelector(".sc-conc-pick select")?.addEventListener("change", (e) => host.querySelector(`.sc-conc-book[data-i="${e.target.value}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  host.querySelectorAll(".sc-ref").forEach((b) => b.addEventListener("click", () => jumpTo({ book: b.dataset.b, chapter: Number(b.dataset.c), verse: Number(b.dataset.v) })));
}
async function fillStrongs(el, book, chapter) {
  const panel = el.querySelector("#strongsPanel");
  if (!panel) return;
  const rows = await loadStrongs(book, chapter);
  if (!panel.isConnected) return;
  if (!rows) { panel.innerHTML = `<p class="muted small-print">The concordance couldn't load. Check your connection and try again.</p>`; return; }
  const lang = BOOK_BY_ID[book].testament === "OT" ? "Hebrew" : "Greek";
  const groups = STRONGS_GROUPS.map(([id, title, about, open]) => {
    const list = rows.filter((r) => strongsGroup(r) === id);
    // Key words: the ones this chapter repeats most come first (a stable sort keeps first-appearance order for ties).
    if (id === "key") list.sort((a, b) => b[5].length - a[5].length);
    return [id, title, about, open, list];
  }).filter((g) => g[4].length);
  const tapOn = store.get("wordTap") !== false;
  panel.innerHTML = `<p class="sc-tip">${tapOn ? `💡 While you read, <strong>tap any word</strong> in the Bible text to see the ${lang} word behind it. Words with a <span class="sw-demo">light dotted line</span> are the key ones worth looking up.` : `💡 Turn on <strong>Tap a word for its meaning</strong> in Settings to look up any word right in the Bible text.`}</p>
    <label class="sc-find"><span class="sr-only">Find a word in this chapter</span><input type="search" placeholder="Find a word in ${esc(refName({ book, chapter }))}" autocomplete="off"></label>
    <p class="muted small-print sc-none" hidden>No word here matches that. Try a shorter word.</p>
    ${groups.map(([id, title, about, open, list]) => `<details class="sc-group" data-group="${id}"${open ? " open" : ""}><summary><strong>${title}</strong> <span class="count">${list.length}</span><small>${about}</small></summary>
      <div class="sc-list">${list.map((r, i) => (id === "key" && i === 12 && list.length > 15 ? `<button type="button" class="sc-more small">Show all ${list.length} key words</button><div class="sc-rest" hidden>` : "") + strongsRow(r)).join("")}${id === "key" && list.length > 15 ? "</div>" : ""}</div></details>`).join("")}
    <p class="muted small-print sc-credit">Every ${lang} word in the chapter, in the order it first appears. Counts are of the ${lang} words, so they can differ from the count of an English word in the NASB. Word tagging: STEPBible.org, Tyndale House Cambridge (CC BY). Definitions: James Strong, <em>Exhaustive Concordance</em> (1890), via Open Scriptures.</p>`;
  const find = panel.querySelector(".sc-find input");
  find.addEventListener("input", () => {
    const q = find.value.trim().toLowerCase();
    let any = false;
    panel.querySelectorAll(".sc-group").forEach((g) => {
      let hits = 0;
      g.querySelectorAll(".sc-word").forEach((w) => { const on = !q || w.dataset.find.includes(q); w.hidden = !on; if (on) hits++; });
      g.hidden = !hits;
      if (q && hits) { g.open = true; const rest = g.querySelector(".sc-rest"); if (rest) { rest.hidden = false; g.querySelector(".sc-more")?.remove(); } }
      any = any || hits > 0;
    });
    panel.querySelector(".sc-none").hidden = any;
  });
  panel.querySelectorAll(".sc-v").forEach((b) => b.addEventListener("click", () => goToVerse(Number(b.dataset.v))));
  panel.querySelector(".sc-more")?.addEventListener("click", (e) => { e.target.nextElementSibling.hidden = false; e.target.remove(); });
  panel.querySelectorAll(".sc-word").forEach((d) => d.addEventListener("toggle", async () => {
    if (!d.open || d.dataset.loaded) return;
    const e = tidyLex(await loadLex(d.dataset.n));
    const box = d.querySelector(".sc-def");
    if (!e) { box.textContent = "No dictionary entry for this number. Check your connection and try again."; return; }
    d.dataset.loaded = "1";
    box.classList.remove("muted", "small-print");
    box.innerHTML = `${e.pron ? `<p class="muted small-print">Say it: ${esc(e.pron)}</p>` : ""}
      ${e.def ? `<p><strong>Strong's definition:</strong> ${linkStrongs(esc(e.def))}</p>` : ""}
      ${e.kjv ? `<p><strong>KJV translates it:</strong> ${esc(e.kjv)}</p>` : ""}
      ${e.from ? `<p class="muted small-print">Word origin: ${linkStrongs(esc(e.from.replace(/[;,.\s]+$/, "")))}</p>` : ""}
      <div class="sc-root"></div>
      <button type="button" class="small sc-all" data-n="${d.dataset.n}">📖 See every place in the Bible</button><div class="sc-conc"></div>`;
    box.querySelectorAll(".sc-link").forEach((a) => a.addEventListener("click", async () => {
      const r = await loadLex(a.dataset.n), host = box.querySelector(".sc-root");
      host.innerHTML = r ? `<p class="sc-rootdef"><strong>${esc(a.dataset.n)} ${esc(r.lemma || "")}</strong> ${esc(r.def || r.kjv || "")}</p>` : "";
    }));
    box.querySelector(".sc-all").addEventListener("click", (ev) => showConcordance(d.dataset.n, box.querySelector(".sc-conc"), ev.target));
  }));
}



/* ---------- Setting the stage: book introduction (and this chapter, where written) ---------- */
// Open on a book's first chapter; a tap away on every other chapter.
// "By the numbers": chapters, verses, its share of the Bible, and a fact worth knowing.
function bookNumbersHtml(book) {
  const bk = BOOK_BY_ID[book], verses = VERSES[book];
  const sameT = BOOKS.filter((x) => x.testament === bk.testament), pos = sameT.findIndex((x) => x.id === book) + 1;
  const ord = (n) => `${n}${["th", "st", "nd", "rd"][n % 100 > 10 && n % 100 < 14 ? 0 : n % 10] || "th"}`;
  const pct = (verses / TOTAL_VERSES) * 100;
  const byLen = [...BOOKS].sort((a, c) => VERSES[c.id] - VERSES[a.id]), rank = byLen.findIndex((x) => x.id === book) + 1;
  return `<h3 class="bi-h">By the numbers</h3><div class="bi-stats">
    <div><b>${bk.chapters}</b><span>chapter${bk.chapters === 1 ? "" : "s"}</span></div>
    <div><b>${verses.toLocaleString()}</b><span>verses</span></div>
    <div><b>${pct < 0.1 ? "<0.1" : pct.toFixed(pct < 1 ? 2 : 1)}%</b><span>of the Bible</span></div>
    <div><b>${ord(pos)}</b><span>of ${sameT.length} ${bk.testament === "OT" ? "Old" : "New"} Testament books</span></div></div>
    <p class="bi-fact">${rank <= 10 ? `📏 The ${ord(rank) === "1st" ? "" : `${ord(rank)} `}longest book of the Bible by verses. ` : rank >= 57 ? `📏 One of the ten shortest books of the Bible. ` : ""}${BOOK_FACTS[book] ? `💡 ${esc(BOOK_FACTS[book])}` : `About ${Math.max(1, Math.round(verses * 26 / 150))} minute${Math.round(verses * 26 / 150) === 1 ? "" : "s"} to read aloud from start to finish.`}</p>`;
}
// Who a book was first written to, where that's debated or unknown, with its sources.
function audienceNoteHtml(book, open = false) {
  const a = AUDIENCE_NOTES[book];
  if (!a) return "";
  return `<details class="aud-note"${open ? " open" : ""}><summary><span class="ev ev-${a.status === "unknown" ? "faith" : "debated"}">${a.status === "unknown" ? "Audience unknown" : "Audience debated"}</span> Who it was written to</summary>
    <p>${linkRefs(esc(a.text))}</p><p class="read-more"><span>Sources:</span> ${a.src.map((s) => `<a href="${esc(sourceUrl(s))}" target="_blank" rel="noopener">${esc(s.split(" (")[0])} ↗</a>`).join(" · ")}</p></details>`;
}
function renderBookIntro(book, chapter) {
  const box = $("#bookIntro");
  if (!box) return;
  const b = INTROS[book], ch = notesFor(book, chapter)?.intro;
  if (!b && !ch) { box.hidden = true; return; }
  const name = BOOK_BY_ID[book].name;
  const row = (label, text) => (text ? `<div class="bi-row"><dt>${label}</dt><dd>${esc(text)}</dd></div>` : "");
  // Closed by default so the Bible text comes first; a one-line taste shows what's inside.
  const teaser = (ch || b.about || "").replace(/^(.{0,80}\S)\s.*$/s, (m, a) => (m.length > 82 ? `${a}…` : m));
  box.innerHTML = `<summary>${BOOK_ART[book] ? `<span class="bi-art" aria-hidden="true">${bookThumb(book)}</span>` : `<span class="bi-icon" aria-hidden="true">📜</span>`}<span><strong>Setting the stage: ${esc(name)}${ch ? ` ${chapter}` : ""}</strong><small>${esc(teaser)}</small></span></summary>
    <div class="bi-body">
      ${ch ? `<p class="bi-chapter"><strong>In chapter ${chapter}:</strong> ${esc(ch)}</p>` : ""}
      ${b ? `<p class="bi-about">${esc(b.about)}</p>
      <dl class="bi-facts">${row("Written by", b.who)}${row("When", b.when)}${row("First readers", b.to)}${row("Setting", b.setting)}${row("Key verse", b.key)}</dl>
      ${b.views ? `<p class="bi-views"><strong>Where views differ:</strong> ${esc(b.views)}</p>` : ""}${audienceNoteHtml(book, true)}` : ""}
      ${b ? bookNumbersHtml(book) : ""}
      ${OUTLINES[book] ? `<h3 class="bi-h">Outline of ${esc(name)}</h3><ol class="bi-outline">${OUTLINES[book].map(([r, what]) => `<li><button type="button" class="bi-ch" data-bi-ch="${parseInt(r, 10)}">${BOOK_BY_ID[book].chapters === 1 ? "" : `${r.includes("-") ? "Chapters" : "Chapter"} ${esc(r)}`}</button> ${esc(what)}</li>`).join("")}</ol>` : ""}
      <a class="bi-video" href="https://www.youtube.com/@bibleproject/search?query=${encodeURIComponent(`${name} overview`)}" target="_blank" rel="noopener">▶ Watch BibleProject's free overview of ${esc(name)} ↗</a>
      <p class="muted small-print">Introductions give the traditional view first and say where scholars differ. Scripture itself is the guide.</p>
    </div>`;
  box.querySelectorAll("[data-bi-ch]").forEach((x) => x.addEventListener("click", () => openChapter(book, Number(x.dataset.biCh))));
  // The start of every book opens with its synopsis, like the first page of a book in a study Bible.
  box.open = chapter === 1 && Boolean(b);
  box.classList.toggle("bi-start", chapter === 1);
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
// A light dotted line under the words worth looking up (names of God and the chapter's key
// words), so readers know they can tap them for the Hebrew or Greek in the concordance.
// Only where the English word clearly matches the original word in that verse.
async function markStudyWords(readerEl, book, chapter, token) {
  const rows = await loadStrongs(book, chapter);
  if (!rows || token !== loadToken || !readerEl.isConnected) return;
  const byVerse = new Map();
  for (const r of rows) {
    const g = strongsGroup(r);
    if (g !== "god" && g !== "key") continue;
    const toks = String(r[3]).toLowerCase().split(/[^a-z]+/).filter((t) => t.length >= 3 && !SMALL_GLOSS.has(t)).map(stem);
    for (const v of r[5]) {
      if (!byVerse.has(v)) byVerse.set(v, new Map());
      for (const t of toks) if (!byVerse.get(v).has(t)) byVerse.get(v).set(t, r[0]);
    }
  }
  const walker = document.createTreeWalker(readerEl, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => (n.nodeType === 1 && n.matches(".offline-note, .word-tip, .footnotes, sup") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  let verse = 1;
  const work = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeType === 1) {
      if (n.matches(".v, .verse-num, [data-number]")) { const num = parseInt(n.dataset.number || n.textContent, 10); if (num) verse = num; }
      else if (n.matches(".chapter-num")) verse = 1;
      continue;
    }
    if (n.parentElement.closest(".v, .verse-num, .chapter-num")) continue;
    const want = byVerse.get(verse);
    if (want && /[A-Za-z]/.test(n.textContent)) work.push([n, want]);
  }
  // The same word, or the same word with a different ending ("created" for "to create").
  const match = (want, word) => {
    const w = stem(word);
    if (want.has(w)) return want.get(w);
    if (w.length < 5) return null;
    for (const [t, n] of want) if (t.length >= 5 && t.slice(0, 5) === w.slice(0, 5)) return n;
    return null;
  };
  for (const [node, want] of work) {
    const parts = node.textContent.split(/([A-Za-z][A-Za-z’']*)/);
    if (!parts.some((w, i) => i % 2 && match(want, w))) continue;
    const frag = document.createDocumentFragment();
    parts.forEach((w, i) => {
      const n = i % 2 ? match(want, w) : null;
      if (n) frag.append(Object.assign(document.createElement("span"), { className: "sw", textContent: w, title: `Tap to look up (${n})` }));
      else if (w) frag.append(w);
    });
    node.replaceWith(frag);
  }
}
const SMALL_GLOSS = new Set(["the", "and", "for", "with", "from", "that", "this", "who", "which", "not", "but", "obj", "one", "out", "upon", "into", "unto"]);
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
// When no short gloss matches (NASB "overcome" vs gloss "to grasp"), look through how the
// King James translators rendered each word in the verse, which lists many more English words.
async function deepMatches(rows, word, verse) {
  const m = originalMatches(rows, word, verse);
  if (m.best.length) return m;
  const w = stem(word);
  if (w.length < 3) return m;
  const hits = [];
  for (const r of m.others) {
    const e = await loadLex(r[0]);
    const toks = String(e?.kjv || "").toLowerCase().split(/[^a-z]+/).filter(Boolean).map(stem);
    if (toks.includes(w)) hits.push(r);
  }
  return { best: hits.slice(0, 2), others: m.others.filter((r) => !hits.slice(0, 2).includes(r)) };
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
  const { best, others } = await deepMatches(rows, word, verse);
  if (!box.isConnected) return;
  box.innerHTML = `${best.length ? `<strong>In the ${lang}</strong>${best.map((r, i) => origCard(r, i === 0 && !g)).join("")}` : `<p class="muted small-print">${g ? "" : `This English word doesn't line up with one ${lang} word here. `}See every ${lang} word in verse ${verse} below.</p>`}
    ${others.length ? `<details class="ws-more"><summary>Other ${lang} words in verse ${verse} (${others.length})</summary>${others.map((r) => origCard(r)).join("")}</details>` : ""}
    <p class="muted small-print ws-credit">Word tagging: STEPBible.org, Tyndale House Cambridge (CC BY). Definitions: James Strong (1890).</p>`;
  wireOrig(box);
}
$("#reader").addEventListener("click", (e) => {
  if (store.get("wordTap") === false || !window.getSelection().isCollapsed) return;
  if (e.target.closest(".v, .verse-num, .chapter-num, .message, .word-tip, button, a")) return;
  const hit = wordAt(e.clientX, e.clientY);
  if (!hit) return;
  if (!store.get("wordTipSeen")) { store.set("wordTipSeen", true); $("#reader .word-tip")?.remove(); }
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

// The Reference section under the Scripture: square tiles to pick from (no skinny tabs),
// and the one picked opens underneath. "My notes" brings this chapter's journal in here too.
const REF_TILES = {
  verses: ["📖", "Verse by verse"], strongs: ["א", "Strong's concordance"], map: ["🗺️", "Map"],
  history: ["🏛️", "Background"], geography: ["⛰️", "Geography"], words: ["✍️", "Key words"],
  views: ["🎓", "Scholars and views"], xref: ["🔗", "Cross-references"], where: ["🧭", "When and where"], search: ["🔍", "Find a verse"],
  sources: ["📚", "Sources"], mine: ["📝", "My notes"],
};
function journalHome() {
  // Put the chapter journal back in its own box before the Reference section is redrawn.
  const ji = $("#journalInner"), jb = $("#journalBox");
  if (ji && jb && !jb.contains(ji)) jb.append(ji);
  if (jb) jb.hidden = false;
}
function myNotesCount(book, chapter) {
  const key = `${book}.${chapter}`;
  const old = store.journalEntry(book, chapter);
  return store.allEntries().filter((e) => e.ref === key && NOTE_KINDS.includes(e.kind)).length + (old && JOURNAL_BOXES.some((b) => (old[b.field] || "").trim()) ? 1 : 0);
}
function refTilesHtml(tiles, subs = {}) {
  return `<div class="ref-tiles" role="tablist" aria-label="Reference and resources">${tiles.map((id) => `<button class="ref-tile" role="tab" data-tab="${id}" aria-selected="${id === notesTab}">
    <span class="rt-icon" aria-hidden="true">${REF_TILES[id][0]}</span><span class="rt-label">${esc(REF_TILES[id][1])}</span>${subs[id] ? `<span class="rt-sub">${esc(subs[id])}</span>` : ""}</button>`).join("")}</div>`;
}
function refHead(book, chapter) {
  return `<div class="ref-head"><span class="ref-icon" aria-hidden="true">📚</span><div><h2>Reference &amp; resources</h2><p class="muted small-print">Study helps for ${esc(refName({ book, chapter }))}. Tap a square to open it.</p></div><button type="button" class="small ref-print" data-print-notes>🖨 Print</button></div>`;
}
function wireRef(el, book, chapter) {
  el.querySelector("[data-print-notes]")?.addEventListener("click", () => printNotes(book, chapter));
  el.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => {
    notesTab = b.dataset.tab;
    if (["strongs", "words", "views", "sources", "history", "where"].includes(notesTab)) buddyNerd();
    renderNotes(book, chapter);
    $("#refPanel")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }));
  el.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => { const r = keyRef(b.dataset.go); openChapter(r.book, r.chapter); }));
  wireWordSearch(el);
  wireOpenIn(el);
  fillStrongs(el, book, chapter);
  fillWhere(el, book, chapter);
  const slot = el.querySelector("#refJournalSlot");
  if (slot) {
    const ji = $("#journalInner"), jb = $("#journalBox");
    if (ji) { slot.append(ji); if (jb) jb.hidden = true; renderJournal(); }
  }
}
function mineHtml(book, chapter) {
  return `<p class="muted small-print">Your study notes on ${esc(refName({ book, chapter }))}. All your notes are in Notes, in the menu.</p><div id="refJournalSlot" class="ref-journal"></div>`;
}
function renderNotes(book, chapter) {
  const el = $("#studyNotes");
  journalHome();
  const n = notesFor(book, chapter);
  const mineN = myNotesCount(book, chapter);
  const mineSub = mineN ? `${mineN} note${mineN === 1 ? "" : "s"}` : "Write one";
  el.className = "notes-card ref-section";
  if (!n) {
    const tiles = ["strongs", "where", "search", "mine"];
    if (!tiles.includes(notesTab)) notesTab = "strongs";
    el.innerHTML = `${refHead(book, chapter)}${refTilesHtml(tiles, { mine: mineSub, where: "Time, places, tribes" })}
      <div class="notes-panel" id="refPanel"><p class="notes-about">${esc(ABOUT[notesTab])}</p>${notesTab === "strongs" ? `<div id="strongsPanel"><p class="muted small-print">Loading the concordance…</p></div>` : notesTab === "mine" ? mineHtml(book, chapter) : notesTab === "where" ? whereHtml(book, chapter) : wordSearchHtml()}</div>
      <p class="muted small-print" style="margin-top:14px">Full study notes (verse by verse, background, maps, key words, scholars' views and sources) are written for these chapters so far, with more on the way:</p>
      <div class="row">${sampleChapters().map((k) => { const r = keyRef(k); return `<button class="small" data-go="${k}">${esc(r.name)}</button>`; }).join("")}</div>
      ${openInHtml(book, chapter)}`;
    wireRef(el, book, chapter);
    return;
  }
  const srcKeys = Object.keys(n.sources);
  const about = (id) => ABOUT[id] ? `<p class="notes-about">${esc(ABOUT[id])}</p>` : "";
  const cite = (ids) => ids?.length ? ` <button class="cite" data-cite="${ids[0]}">[${ids.map((k) => srcKeys.indexOf(k) + 1).join(", ")}]</button>` : "";
  // "Read more" links straight to each source (its own page, or a library search).
  const readMore = (ids) => ids?.length ? `<p class="read-more"><span>Read more:</span> ${ids.map((k) => { const t = sourceText(n.sources[k]); const short = t.split(/ \(|, (?=\d)/)[0].replace(/\.$/, ""); return `<a href="${esc(sourceUrl(n.sources[k]))}" target="_blank" rel="noopener">${esc(short)} ↗</a>`; }).join(" · ")}</p>` : "";
  const paras = (t) => String(t).split("\n\n").map((x) => `<p>${esc(x)}</p>`);
  const ev = (k) => k ? `<span class="ev ev-${k}" title="${esc(EVIDENCE[k].tip)}">${esc(EVIDENCE[k].label)}</span>` : "";
  const sec = (id) => n.sections.find((x) => x.id === id);
  const tiles = [...(sec("verses") ? ["verses"] : []), "strongs", ...(n.map ? ["map"] : []), "where", ...n.sections.filter((x) => x.id !== "verses").map((x) => x.lang ? "words" : x.id).filter((id) => REF_TILES[id]), ...(n.crossRefs ? ["xref"] : []), "search", "sources", "mine"];
  const secFor = (id) => id === "words" ? n.sections.find((x) => x.lang) : sec(id);
  const subs = { mine: mineSub, where: "Time, places, tribes", sources: `${srcKeys.length} sources` };
  for (const id of tiles) { const x = secFor(id); if (x) { const c = id === "views" ? x.items.filter((it) => it.who !== "Common ground" && !it.extra).length : x.items.length; subs[id] = `${c} ${id === "views" ? "view" : "note"}${c === 1 ? "" : "s"}`; } }
  if (n.map) subs.map = `${n.map.places.length} places`;
  if (n.crossRefs) subs.xref = `${n.crossRefs.length} passages`;
  if (!tiles.includes(notesTab)) notesTab = tiles[0];
  let body = "";
  if (notesTab === "strongs") {
    body = `<div id="strongsPanel"><p class="muted small-print">Loading the concordance…</p></div>`;
  } else if (notesTab === "mine") {
    body = mineHtml(book, chapter);
  } else if (notesTab === "map") {
    body = `<div class="map-scroll">${mapSvg(n.map)}</div><p class="map-swipe muted small-print">Swipe sideways to see the whole map.</p><p class="map-note" id="mapNote">Tap a place on the map to read about it.</p><p class="muted small-print">${esc(n.map.caption)} Simplified from standard Bible atlases; not drawn to survey scale.</p>`;
  } else if (notesTab === "where") {
    body = whereHtml(book, chapter);
  } else if (notesTab === "xref") {
    body = `<div class="xrefs">${n.crossRefs.map(([k, ref, why]) => `<button class="xref" data-go="${k}"><strong>${esc(ref)}</strong><span>${esc(why)}</span></button>`).join("")}</div>`;
  } else if (notesTab === "search") {
    body = wordSearchHtml();
  } else if (notesTab === "sources") {
    body = `<ol class="sources">${srcKeys.map((k) => `<li id="src-${k}">${esc(sourceText(n.sources[k]))} <a class="src-link" href="${esc(sourceUrl(n.sources[k]))}" target="_blank" rel="noopener">Look it up ↗</a></li>`).join("")}</ol>
      <div class="ev-key">${Object.keys(EVIDENCE).map((k) => `<p>${ev(k)} ${esc(EVIDENCE[k].tip)}</p>`).join("")}</div>`;
  } else {
    const s2 = secFor(notesTab);
    const kinds = s2.id === "views" ? s2.items.filter((it) => it.who !== "Common ground" && !it.extra).length : 0;
    body = (kinds > 1 ? `<p class="views-count">There are ${kinds} main views here.</p>` : "") + s2.items.map((it) => it.ref
      ? `<div class="note-item verse-note" data-start="${esc(String(it.ref).split(":")[1]?.match(/\d+/)?.[0] || "")}"><div class="note-head"><button class="vref" data-verse="${esc(it.ref)}" aria-label="Go to verse ${esc(it.ref)}">${esc(it.ref)}</button><strong>${esc(it.head)}</strong>${ev(it.ev)}</div><p>${esc(it.text)}${cite(it.src)}</p></div>`
      : it.word
      ? `<div class="note-item word-item"><div class="word-line"><span class="orig" lang="${s2.lang === "Hebrew" ? "he" : "el"}" dir="${s2.lang === "Hebrew" ? "rtl" : "ltr"}">${esc(it.word)}</span><span class="say">${esc(it.say)}</span><span class="means">“${esc(it.means)}”</span>${ev(it.ev)}</div>
        ${it.strongs ? `<p class="strongs"><span class="strongs-num">Strong's ${esc(it.strongs)}</span>${it.count ? ` Used ${esc(it.count)} in the ${s2.lang === "Hebrew" ? "Hebrew Old Testament" : "Greek New Testament"}.` : ""}</p>` : ""}
        <p>${esc(it.text)}${cite(it.src)}</p></div>`
      : `<div class="note-item${it.who === "Common ground" ? " common-ground" : ""}${s2.id === "views" ? " view-item" : ""}"><div class="note-head"><strong>${esc(it.head)}</strong>${it.who ? `<span class="who">${esc(it.who)}</span>` : ev(it.ev)}</div>${paras(it.text).join("")}${it.ask ? `<p class="view-ask"><strong>Questions raised:</strong> ${esc(it.ask)}</p>` : ""}${readMore(it.src)}</div>`).join("");
    if (s2.lang) body += `<p class="muted small-print">Strong's numbers follow James Strong's Exhaustive Concordance (1890). Counts are approximate and vary a little by edition and by how word forms are grouped.</p>`;
  }
  el.innerHTML = `${refHead(book, chapter)}<p class="notes-intro">${esc(n.intro)}</p>
    ${refTilesHtml(tiles, subs)}
    <div class="notes-panel" id="refPanel"><h3 class="ref-panel-title"><span aria-hidden="true">${REF_TILES[notesTab][0]}</span> ${esc(REF_TILES[notesTab][1])}</h3>${about(notesTab)}${body}</div>${openInHtml(book, chapter)}`;
  el.querySelectorAll("[data-verse]").forEach((b) => b.addEventListener("click", () => { const v = parseInt(String(b.dataset.verse).split(":")[1], 10); if (v) goToVerse(v); }));
  wireRef(el, book, chapter);
  el.querySelectorAll("[data-cite]").forEach((b) => b.addEventListener("click", () => { notesTab = "sources"; renderNotes(book, chapter); $(`#src-${b.dataset.cite}`)?.classList.add("hi"); }));
  if (notesTab === "map") el.querySelectorAll("[data-place]").forEach((g) => {
    const show = () => {
      const p = n.map.places[Number(g.dataset.place)];
      el.querySelectorAll(".map-place").forEach((x) => x.classList.toggle("is-on", x === g));
      $("#mapNote").innerHTML = `<strong class="nm-then">${esc(p.then)}</strong>${p.now !== p.then ? ` <span class="nm-now">· today: ${esc(p.now)}</span>` : ""}<br>${esc(p.note)}`;
    };
    g.addEventListener("click", show);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } });
  });
}

/* ---------- Find a verse: by what it's about, by the words, or by asking the helper ---------- */
let lastSearch = null;
const refKeyName = (k) => { const [b, c, v] = k.split("."); return `${BOOK_BY_ID[b]?.name || b} ${c}${v ? `:${v}` : ""}`; };
function wordSearchHtml() {
  return `<div class="word-search"><p class="muted small-print">Remember what a verse is about, or a few of its words? Try <em>the lost sheep</em>, <em>baptism</em>, <em>worry</em> or <em>love is patient</em>.</p>
    <form class="jump-row" id="wsForm"><input id="wsInput" type="search" placeholder="What is it about, or what does it say?" autocomplete="off" enterkeyhint="search" value="${esc(lastSearch?.q || "")}"><button class="small" type="submit">Find</button></form>
    <div id="wsOut">${lastSearch ? lastSearch.html : ""}</div></div>`;
}
function topicResultsHtml(q) {
  const found = findTopics(q);
  if (!found.length) return "";
  return `<div class="find-topics">${found.map((t) => `<div class="find-topic"><h4>${t.kind === "story" ? "📜" : "📌"} ${esc(t.title)}${t.refs.length > 1 ? ` <span class="muted small-print">${t.refs.length} passages</span>` : ""}</h4>
    <div class="ws-list">${t.refs.map(([k, about]) => `<button class="ws-verse" data-ref="${esc(k)}"><strong>${esc(refKeyName(k))}</strong><span>${esc(about)}</span></button>`).join("")}</div></div>`).join("")}</div>`;
}
function wireFindResults(out) {
  out.querySelectorAll("[data-ref]").forEach((b) => b.addEventListener("click", async () => {
    const [bk, c, v] = b.dataset.ref.split(".");
    if (!BOOK_BY_ID[bk]) return;
    if (findSheet.open) findSheet.close();
    showView("read"); await openChapter(bk, Number(c));
    const n = parseInt(v, 10); if (n > 1) setTimeout(() => goToVerse(n), 300);
  }));
  out.querySelectorAll("[data-ch]").forEach((b) => b.addEventListener("click", () => { const [bk, c] = b.dataset.ch.split("."); if (findSheet.open) findSheet.close(); if (BOOK_BY_ID[bk] && c) { showView("read"); openChapter(bk, Number(c)); } }));
  out.querySelector("[data-ask]")?.addEventListener("click", () => {
    if (findSheet.open) findSheet.close();
    openBuddyChat();
    $("#partnerQ").value = `Where in the Bible is the passage about "${out.dataset.q}"? Please list the references, best match first.`;
    sendChat();
  });
}
function wireWordSearch(root) {
  const form = root.querySelector("#wsForm");
  if (!form) return;
  const out = root.querySelector("#wsOut");
  if (lastSearch) { out.dataset.q = lastSearch.q; wireFindResults(out); }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = root.querySelector("#wsInput").value.trim();
    if (!q) return;
    root.querySelector("#wsInput").blur();
    out.dataset.q = q;
    const topics = topicResultsHtml(q);
    const ask = `<div class="find-ask"><p>Not here? Your Bible helper can find a verse from a description.</p><button class="small" type="button" data-ask>💬 Ask my Bible helper to find it</button></div>`;
    out.innerHTML = `${topics ? `<h3 class="find-h">By topic and story</h3>${topics}` : ""}<h3 class="find-h">Verses with these words</h3><p class="muted small-print" id="wsWords">Searching…</p>${ask}`;
    wireFindResults(out);
    let words;
    try {
      const r = await searchBible(q, 20);
      words = `<p class="ws-total"><strong>${r.total.toLocaleString()}</strong> verse${r.total === 1 ? "" : "s"} in the ${esc(store.get("nasbLabel") || "NASB")} contain “${esc(q)}”.</p>
        ${r.verses.length ? `<div class="ws-list">${r.verses.map((v) => `<button class="ws-verse" data-ref="${esc(/^[1-3A-Z]{3}\.\d+\.\d+/.test(v.id || "") ? v.id.split("-")[0] : v.chapter.slice(0, 2).join("."))}"><strong>${esc(v.ref)}</strong><span>${esc(v.text.slice(0, 160))}${v.text.length > 160 ? "…" : ""}</span></button>`).join("")}</div>${r.total > r.verses.length ? `<p class="muted small-print">Showing the first ${r.verses.length}, in Bible order.</p>` : ""}` : ""}`;
    } catch (err) {
      words = `<p class="muted small-print">${esc(err.message || "The search didn't work.")}${err.kind === "nokey" ? " Add your key in Settings, under Bible text." : ""}</p>`;
    }
    if (out.dataset.q !== q) return;
    const box = out.querySelector("#wsWords");
    if (box) { box.outerHTML = `<div id="wsWords">${words}</div>`; wireFindResults(out.querySelector("#wsWords")); }
    lastSearch = { q, html: out.innerHTML };
  });
}
// The same finder in its own window, from My Bible (and anywhere else that wants it).
const findSheet = document.createElement("dialog");
findSheet.className = "word-sheet find-sheet"; findSheet.setAttribute("aria-label", "Find a verse");
findSheet.addEventListener("click", (e) => { if (e.target === findSheet) findSheet.close(); });
function openFind() {
  findSheet.innerHTML = `<div class="ws-head"><h2>🔍 Find a verse</h2><button type="button" class="ws-close" aria-label="Close">✕</button></div>${wordSearchHtml()}`;
  findSheet.querySelector(".ws-close").addEventListener("click", () => findSheet.close());
  wireWordSearch(findSheet);
  if (!findSheet.isConnected) document.body.append(findSheet);
  findSheet.showModal();
  setTimeout(() => findSheet.querySelector("#wsInput")?.focus(), 60);
}
$("#findGo")?.addEventListener("click", openFind);

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
  // My Bible first, then the three self-guided studies, as four equal boxes. Every one has the same study
  // section, questions, journal and read-aloud under each chapter.
  const [mine, ...studies] = PATH_ORDER;
  return `<section class="studies-box" aria-label="Studies"><div class="sb-head"><span class="sb-icon" aria-hidden="true">📚</span><div><h2 class="home-h">Studies</h2>
    <p class="home-sub small">Four ways through the whole Bible. The study notes, Bible helper, journal and read-aloud are with you in every one.</p></div></div>
    <div class="path-cards four">${card(mine, true)}${studies.map((id) => card(id)).join("")}</div></section>`;
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
  // A brand-new person starts with nothing to catch up on: only notes after they join show.
  if (setupState() !== "done" && store.get("newsSeen") !== NEWS[0].id) store.set("newsSeen", NEWS[0].id);
  const news = newsToShow({ seen: store.get("newsSeen"), off: store.get("newsOff"), setupDone: setupState() === "done", lastAt: store.get("newsSeenAt") });
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
    ${news ? newsHtml(news, esc) : ""}
    ${setupState() === "started" ? `<div class="card setup-resume" id="homeSetup"><h2>Welcome back${store.get("name").trim() ? `, ${esc(store.get("name").trim())}` : ""}!</h2>
      <p class="muted">Setup isn't finished yet: ${SETUP_STEPS.filter((st) => !st.done()).length || 1} quick step${SETUP_STEPS.filter((st) => !st.done()).length === 1 ? "" : "s"} left.</p>
      <div class="setup-resume-btns"><button class="big-btn" id="homeSetupGo">Continue to setup</button><button class="wb-new" id="homeSetupLater">Not now, keep reading</button></div></div>` : ""}
    <button class="resume-card" id="resumeBtn"><span><strong>${esc(resume.title)}</strong><small>${esc(resume.sub)}</small></span><span class="go" aria-hidden="true">›</span></button>
    ${pathCardsHtml()}
    <button class="resume-card games-entry" id="homeGames"><span><strong>🎲 Bible Spin</strong><small>Spin, answer, win jewels: solo, with family, or against Buddy</small></span><span class="go" aria-hidden="true">›</span></button>
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
  $("#homeGames").addEventListener("click", () => quest.open());
  const putAway = () => { store.set("newsSeen", news.id); store.set("newsSeenAt", new Date().toISOString()); $("#newsCard")?.remove(); };
  $("#newsOk")?.addEventListener("click", putAway);
  // Or swipe it away to the side.
  const card = $("#newsCard");
  if (card) {
    let x0 = null, dx = 0;
    card.addEventListener("pointerdown", (e) => { if (e.target.closest("button, a, summary")) return; x0 = e.clientX; dx = 0; });
    card.addEventListener("pointermove", (e) => { if (x0 === null) return; dx = e.clientX - x0; if (Math.abs(dx) > 8) { card.style.transform = `translateX(${dx}px)`; card.style.opacity = String(Math.max(.2, 1 - Math.abs(dx) / 300)); } });
    const letGo = () => { if (x0 === null) return; x0 = null; if (Math.abs(dx) > 90) putAway(); else { card.style.transform = ""; card.style.opacity = ""; } };
    card.addEventListener("pointerup", letGo); card.addEventListener("pointercancel", letGo);
  }
  $("#newsOff")?.addEventListener("click", () => { store.set("newsSeen", news.id); store.set("newsSeenAt", new Date().toISOString()); store.set("newsOff", true); $("#newsCard").innerHTML = `<p class="muted small-print">What's new notes are off. You can turn them back on in Settings, under Help and guide.</p>`; syncNewsSetting(); });
  $("#homeSetupGo")?.addEventListener("click", () => openSetup(Math.max(0, SETUP_STEPS.findIndex((st) => !st.done()))));
  // Continue: put setup away for now (it stays in Settings, under Set up app) and go back to reading.
  $("#homeSetupLater")?.addEventListener("click", () => { setupSet({ skipped: true }); const l = store.get("last"); showView("read"); openChapter(l.book, l.chapter); });
  wireJump($("#homeJump"), $("#homeJumpResults"), (r) => { showView("read"); openChapter(r.book, r.chapter); });
}


/* ---------- Today: verse of the day, psalm and proverb, a question and a prayer ---------- */
const DAILY_PARTS = [["verse", "Verse of the day"], ["readings", "Psalm and Proverb of the day"], ["question", "Think about (a question)"], ["prayer", "Prayer"]];
// "devotion" was once one switch for both; an old "off" still turns both off.
const dailyOn = (k) => { const d = store.get("daily") || {}; return d[k] ?? ((k === "question" || k === "prayer") ? d.devotion !== false : true) ; };
function dailyHtml() {
  const t = dailyToday();
  const v = t.verse, name = BOOK_BY_ID[v.book].name;
  const date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const parts = [];
  if (dailyOn("verse")) parts.push(`<div class="dy-verse"><span class="dy-label">Verse of the day</span>
      <blockquote id="dailyVerseText" class="dy-text">${esc(v.theme)}</blockquote>
      <button class="dy-ref" data-dgo="${v.book}.${v.chapter}.${v.verse}">${esc(name)} ${v.chapter}:${v.verse} · Read it in context ›</button></div>`);
  if (dailyOn("readings")) parts.push(`<div class="dy-row"><button class="dy-btn" data-dgo="PSA.${t.psalm}"><span aria-hidden="true">🎵</span> Psalm ${t.psalm}</button><button class="dy-btn" data-dgo="PRO.${t.proverb}"><span aria-hidden="true">💡</span> Proverbs ${t.proverb}</button></div>`);
  if (dailyOn("question") || dailyOn("prayer")) parts.push(`<div class="dy-dev">${dailyOn("question") ? `<span class="dy-label">Think about</span><p>${esc(t.devotion[0])}</p>` : ""}
      ${dailyOn("prayer") ? `<span class="dy-label">Pray</span><p class="dy-prayer">${esc(t.devotion[1])}</p>` : ""}
      <button class="small" id="dailyWrite">✎ Write in my daily journal</button></div>`);
  return `<section class="daily-card" aria-label="Today">
    <div class="dy-head"><h2><span aria-hidden="true">☀️</span> Today</h2><span class="muted small-print">${esc(date)}</span><button class="quiet-link" id="dailyCustom">Choose what shows</button></div>
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
    openEntry({ kind: "day" }); // right away, so the keyboard comes up on iPad and iPhone
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

// Easter Sunday (Western), by the anonymous Gregorian method.
function easterOf(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, month - 1, day);
}
// The season coming up, if they aren't already in its look and he hasn't asked this year.
function seasonFor(now = new Date()) {
  const y = now.getFullYear(), day = 864e5;
  const easter = easterOf(y);
  const thanks = new Date(y, 10, 1); thanks.setDate(1 + ((11 - thanks.getDay()) % 7) + 21); // fourth Thursday of November
  if (now >= new Date(y, 11, 1) && now < new Date(y, 11, 27)) return { key: `christmas-${y}`, look: "christmas", looks: ["christmas", "nativity"], icon: "🎄", ask: "It's almost Christmas! 🎄 Want me to make your Bible look Christmasy?" };
  if (now >= new Date(easter - 14 * day) && now < new Date(+easter + 2 * day)) return { key: `easter-${y}`, look: "easter", looks: ["easter"], icon: "🌷", ask: "Easter is coming! 🌷 Want your Bible to look like spring and Easter?" };
  if (now >= new Date(y, 10, 1) && now < new Date(+thanks + day)) return { key: `fall-${y}`, look: "fall", looks: ["fall"], icon: "🍂", ask: "It's Thanksgiving time! 🍂 Want your Bible to look like fall?" };
  return null;
}
function seasonOffer() {
  const s = seasonFor();
  if (!s || s.looks.includes(store.get("style")) || store.get("style") === "seasons" || (store.get("seasonAsked") || {})[s.key]) return null;
  return s;
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
  const m = text.trim().match(/^(.*?)(?:\s+(\d+))?(?:\s*:\s*(\d+).*)?$/);
  if (!m || !m[1].trim()) return [];
  const q = norm(m[1]);
  const ch = m[2] ? Number(m[2]) : null;
  let books = BOOKS.filter((b) => norm(b.name).startsWith(q) || b.id.toLowerCase() === q);
  if (ALIASES[q]) books = [BOOK_BY_ID[ALIASES[q]], ...books.filter((b) => b.id !== ALIASES[q])];
  if (!books.length && q.length >= 3) books = BOOKS.filter((b) => norm(b.name).includes(q));
  const verse = m[3] ? Number(m[3]) : 0;
  return books.slice(0, 6).map((b) => ({ book: b.id, chapter: ch ? Math.min(Math.max(ch, 1), b.chapters) : null, verse, name: b.name }));
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
    ? `<div class="picker-books">${refs.map((r, i) => `<button data-i="${i}">${esc(r.name)}${r.chapter ? ` ${r.chapter}${r.verse ? `:${r.verse}` : ""}` : ""}<small>${r.chapter ? "Open" : `${BOOK_BY_ID[r.book].chapters} chapters`}</small></button>`).join("")}</div>`
    : `<p class="muted">No book matches that yet.</p>`;
  $("#pickerBody").querySelectorAll("[data-i]").forEach((b) => b.addEventListener("click", () => {
    const r = refs[Number(b.dataset.i)];
    if (r.chapter || BOOK_BY_ID[r.book].chapters === 1) jumpTo(r);
    else pickerChapters(r.book);
  }));
});
$("#pickerSearch").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const r = findRefs($("#pickerSearch").value)[0];
  if (!r) return;
  e.preventDefault();
  if (r.chapter || BOOK_BY_ID[r.book].chapters === 1) jumpTo(r);
  else pickerChapters(r.book);
});
// Straight to a chapter (and verse, like "Romans 8:28"), from any screen: quick for following a sermon.
async function jumpTo(r) {
  picker.close(); showView("read");
  await openChapter(r.book, r.chapter || 1);
  if (r.verse > 1) goToVerse(r.verse);
}
$("#topPrev").addEventListener("click", () => { const { book, chapter } = store.get("last"); const p = neighbors(book, chapter).prev; if (p) openChapter(p.book, p.chapter); });
$("#topNext").addEventListener("click", () => { const { book, chapter } = store.get("last"); const n = neighbors(book, chapter).next; if (n) openChapter(n.book, n.chapter); });

/* ---------- Listen bar: read aloud, volume, speed, drive mode ---------- */
// Who is reading: the recorded ESV narrator, or the device's voice.
function syncNarrator(src) {
  const el = $("#narrator");
  if (!el) return;
  el.hidden = !src;
  el.textContent = src === "recorded" ? "🎙 Read by a recorded narrator. ESV audio © Crossway." : src === "device" ? "Read by this device's voice." : "";
}
function syncPlayBtn(playing, loading = false) {
  const btn = $("#playBtn");
  btn.setAttribute("aria-pressed", String(playing));
  btn.querySelector("span").textContent = loading ? "Loading…" : playing ? "Pause" : "Read aloud";
  $("#playIcon").setAttribute("d", playing ? "M7 5h4v14H7zM13 5h4v14h-4z" : "M8 5v14l11-7z");
}
function setRate(r) {
  store.set("voiceRate", r);
  reader.setRate(r);
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
$("#playBtn").hidden = !canSpeak && !store.get("esvKey");
$("#playBtn").addEventListener("click", () => { reader.toggle(); readArmed = reader.playing; });
$("#quickRate").addEventListener("change", (e) => setRate(Number(e.target.value)));
// Sleep timer and repeat, for listening at bedtime or on a long drive.
let sleepAt = 0, sleepTimer = 0;
function syncSleepNote() {
  const n = $("#sleepNote");
  if (!n) return;
  n.hidden = !sleepAt;
  n.textContent = sleepAt === "chapter" ? "Stops at the end of this chapter" : sleepAt ? `Stops at ${new Date(sleepAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "";
}
$("#sleepSel")?.addEventListener("change", (e) => {
  clearTimeout(sleepTimer);
  const v = e.target.value;
  sleepAt = v === "chapter" ? "chapter" : Number(v) ? Date.now() + Number(v) * 60e3 : 0;
  if (typeof sleepAt === "number" && sleepAt) sleepTimer = setTimeout(() => { if (reader.playing) reader.pause(); sleepAt = 0; $("#sleepSel").value = "0"; syncSleepNote(); }, Number(v) * 60e3);
  syncSleepNote();
});
$("#repeatBtn")?.addEventListener("click", (e) => { const on = e.currentTarget.getAttribute("aria-pressed") !== "true"; e.currentTarget.setAttribute("aria-pressed", String(on)); });
$("#driveQuick").addEventListener("change", (e) => {
  setDrive(e.target.checked);
  // Turning Read to me on starts reading this chapter now; off stops it.
  if (e.target.checked && canSpeak) { readArmed = true; if (!reader.playing) reader.play(); }
  else { readArmed = false; reader.stop(); }
});
{
  // iPhone and iPad ignore the volume a web page asks for, so point to the side buttons instead.
  const apple = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  $("#volumeCtl").hidden = apple || !canSpeak;
  $("#volumeNote").hidden = !apple || !canSpeak;
  $("#volume").value = store.get("voiceVolume") ?? 1;
  $("#volume").addEventListener("input", (e) => { reader.setVolume(Number(e.target.value)); store.set("voiceVolume", reader.volume); });
}



/* ---------- Family sign-in ---------- */
// When sign-in is on (js/config.js has the Supabase details), nobody gets past this
// screen until they sign in. A sign-in stays on the device until they sign out.
let signedInUser = null;
// Account backup of reading, notes and journal (never the Bible keys).
let lastBackup = "";
// Each backup first brings in what the person's other devices saved, so an iPhone and an
// iPad stay in step on their own: reading, journal, highlights and bookmarks.
let backupBusy = false;
async function backupNow() {
  if (!signedInUser || backupBusy) return;
  backupBusy = true;
  try {
    const b = await loadBackup();
    if (b?.data && store.mergeFrom(b.data)) afterSync();
    if (await saveBackup(store.snapshot())) { lastBackup = new Date().toISOString(); showBackupStatus(); }
  } catch { /* offline: next change tries again */ }
  backupBusy = false;
}
// Show what just arrived from another device, without interrupting anything.
function afterSync() {
  try {
    updatePathBits();
    if (!$("#view-home").hidden) renderHome();
    const { book, chapter } = store.get("last");
    if (!$("#view-read").hidden) { applyVerseMarks(book, chapter); if (!document.activeElement?.matches?.("textarea, input")) renderJournal(); }
  } catch { /* the next screen change shows it */ }
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
  input.type = on ? "text" : "password"; b.textContent = on ? "Hide" : "Show"; b.setAttribute("aria-pressed", String(on)); b.setAttribute("aria-label", on ? "Hide password" : "Show password");
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
        msg.innerHTML = `We emailed <strong>${esc(email)}</strong>. Tap <strong>Sign in</strong> in that email: it opens Bible Study and asks you for a new password. Then come back here and sign in with it. If the email shows a 6-digit code instead, type it below. (It can take a minute to arrive. Check the junk folder too.)`;
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
    <label class="field">New password<span class="pw-wrap"><input id="pwNew" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="At least 6 letters or numbers"><button type="button" class="pw-show" data-show="pwNew" aria-label="Hide password" aria-pressed="true">Hide</button></span></label>
    <button type="button" class="big-btn" id="pwSave">Save my password</button>
    <p class="setup-key-status" id="pwSheetMsg" role="status"></p>
    <button type="button" class="wb-new" id="pwLater">Not now</button>`;
  pwSheet.showModal();
  $("#pwLater").onclick = () => pwSheet.close();
  $("#pwSave").onclick = async () => {
    const out = $("#pwSheetMsg"), problem = passwordProblem($("#pwNew").value);
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
  if (!a.trim()) return "Type the password you'd like in the box first.";
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
         <label class="field">New password<span class="pw-wrap"><input id="newPassword" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="At least 6 letters or numbers"><button type="button" class="pw-show" data-show="newPassword" aria-label="Hide password" aria-pressed="true">Hide</button></span></label>
         <button class="small" id="savePassword">Save new password</button><p class="small-print" id="pwMsg"></p></details>
       <details class="share-key"><summary>Change my email</summary>
         <label class="field">New email<input id="newEmail" type="email" autocomplete="email" autocapitalize="none" spellcheck="false" placeholder="name@example.com"></label>
         <button class="small" id="saveEmail">Send confirmation</button><p class="small-print" id="emailMsg">We'll email a link to confirm it. Until you tap it, keep signing in with ${esc(signedInUser.email || "your current email")}.</p></details>
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
    const v = $("#newPassword").value, out = $("#pwMsg"), problem = passwordProblem(v);
    if (problem) { out.textContent = problem; return; }
    $("#savePassword").disabled = true; out.textContent = "Saving…";
    try { await changePassword(v); flag(STARTER_KEY, false); out.textContent = "Saved ✓ Use this password next time you sign in."; $("#newPassword").value = ""; }
    catch (x) { out.textContent = x.message; }
    $("#savePassword").disabled = false;
  });
  $("#saveEmail")?.addEventListener("click", async () => {
    const out = $("#emailMsg"), v = $("#newEmail").value;
    $("#saveEmail").disabled = true; out.textContent = "Sending…";
    try { await changeEmail(v); out.textContent = `Check ${v.trim()} for a confirmation email and tap its link (your old inbox may get one too). Then sign in with the new email.`; $("#newEmail").value = ""; }
    catch (x) { out.textContent = x.message; }
    $("#saveEmail").disabled = false;
  });
  // Grown-up settings (Bible keys, invite links) live in a closed "Family organizer tools" box,
  // so everyone else just signs in and reads.
  const org = $("#organizerBody");
  if (org && !org.dataset.ready) organizerGate(org);
  wireSignOut();
}
// Family organizer tools: only the organizer's account ever sees them.
// The organizer's keys and versions go to the family account the moment they're saved,
// so there's no separate "share" step. Family members never see the key itself.
let organizerHere = false;
async function saveForFamily() {
  if (!authEnabled || !organizerHere || !store.get("apiBibleKey")) return "";
  try {
    const shared = await setFamilyKey({ k: store.get("apiBibleKey"), b: store.get("nasbBibleId") || "", l: store.get("nasbLabel") || "", x: store.get("extraBibles") || [], e: store.get("esvKey") || "" });
    store.set("familySyncedAt", new Date().toISOString());
    const m = $("#familyKeyMsg"); if (m) m.textContent = `Saved for the whole family ✓ ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
    if (store.get("esvKey") && shared && !shared.esv) return " Saved for the whole family ✓, except the ESV key: the family table needs its ESV column. Run the latest supabase-setup.sql in Supabase once, then tap Save again.";
    return " Saved for the whole family ✓";
  } catch (x) {
    return /row-level|policy|permission/i.test(x.message || "") ? " (Only the family organizer's account can save it for the family.)" : ` (Couldn't save it for the family: ${x.message})`;
  }
}
async function organizerGate(org) {
  org.dataset.ready = "1";
  if (!(await isOrganizer())) { $("#organizerBox").hidden = true; $("#bibleTextCard").hidden = true; return; }
  {
    org.dataset.ready = "1";
    organizerHere = true;
    org.innerHTML = `<div class="card inner" id="familyKeyCard"><h2>For the whole family</h2>
      <p class="muted small-print">Whenever you tap Save above, or turn a version on or off, it's saved to your family account automatically. Nothing is sent to anyone: family members never see the key. Their app picks it up by itself when they sign in, and gets it back if a device ever forgets it. Everyone's reading counts toward your 5,000 a month.</p>
      <p class="small-print" id="familyKeyMsg">${store.get("familySyncedAt") ? "Saved for the whole family ✓" : ""}</p>
      <button class="small" id="shareFamilyKey">Save for the family again</button></div>
      <div class="card inner" id="familyPanel"><h2>My family</h2><div id="familyPanelBody"><p class="muted small-print">Loading…</p></div></div>
      <div class="card inner" id="familyLooks"><h2>Looks in use</h2>
        <p class="muted small-print">How many in the family use each look, so you know which ones to improve. Counts only: it never shows who uses which look.</p>
        <button class="small" id="familyLooksGo">Count the looks</button><div id="familyLooksOut"></div></div>`;
    // 1. The keys, 2. save them for everyone, 3. the family list.
    org.prepend($("#bibleTextCard"));
    $("#bibleTextCard").hidden = false;
    $("#organizerBox").hidden = false;
    $("#organizerBox").addEventListener("toggle", () => { if ($("#organizerBox").open) { renderFamilyPanel(); loadPlanVersionsOnce(); } });
    if (!$("#view-settings").hidden) loadPlanVersionsOnce();
  }
  $("#familyLooksGo").addEventListener("click", renderFamilyLooks);
  $("#shareFamilyKey").addEventListener("click", async () => {
    const out = $("#familyKeyMsg");
    if (!store.get("apiBibleKey")) { out.textContent = "Add your API.Bible key under Bible text first."; return; }
    out.textContent = "Saving…";
    const said = await saveForFamily();
    if (!/✓/.test(said)) out.textContent = said.trim().replace(/^\(|\)$/g, "");
  });
}
// Family-level look counts: one bar per look, most used first. Counts come from everyone's
// own backup (the look they chose), added up inside Supabase; no names come back.
async function renderFamilyLooks() {
  const out = $("#familyLooksOut");
  out.innerHTML = `<p class="muted small-print">Counting…</p>`;
  const r = await familyAdmin("looks");
  if (!r || r.error || !r.looks) {
    const old = r?.error === "action";
    out.innerHTML = `<p class="small-print">${esc(old ? "Your family-admin function in Supabase is from before this feature. Paste the latest supabase/functions/family-admin/index.ts into it and tap Deploy (see docs/SETUP.md), then tap Count the looks again." : adminSays(r))}</p>`;
    return;
  }
  const rows = Object.entries(r.looks).sort((a, b) => b[1] - a[1]);
  const top = Math.max(1, ...rows.map(([, n]) => n));
  const name = (v) => (LOOKS.find(([k]) => k === v) || [v, v])[1];
  const unused = LOOKS.filter(([k]) => !r.looks[k]).map(([, l]) => l);
  out.innerHTML = rows.length ? `<ul class="looks-count">${rows.map(([k, n]) => `<li><span>${esc(name(k))}</span><span class="bar"><span style="width:${Math.round((n / top) * 100)}%"></span></span><strong>${n}</strong></li>`).join("")}</ul>
    <p class="muted small-print">Counted ${r.counted} ${r.counted === 1 ? "person" : "people"} with a saved backup.${r.simple ? ` ${r.simple} use${r.simple === 1 ? "s" : ""} simple pictures.` : ""}${unused.length ? ` Not in use right now: ${esc(unused.join(", "))}.` : ""}</p>`
    : `<p class="muted small-print">No one has a saved backup yet, so there's nothing to count.</p>`;
}
// The organizer's family panel: who's in the family, the Bible helper allowance this month,
// and add / new temporary password / remove.
const ADMIN_SAYS = {
  setup: "The family panel isn't switched on yet. In Supabase, add the Edge Function named family-admin (see docs/SETUP.md), then tap Try again.",
  not_allowed: "Only the family organizer's account can use this.",
  signin: "Please sign in again, then try once more.",
  gate: "Supabase is stopping the family panel before it starts. In Supabase, open Edge Functions, then family-admin, then Details. Turn OFF \"Verify JWT with legacy secret\" (it may say \"Enforce JWT verification\"), tap Save changes, then tap Try again here. The panel still checks that it's you on every request.",
  busy: "The family panel ran into a problem inside Supabase. Please tap Try again in a minute.",
  offline: "Couldn't connect. Check the internet and try again.",
  email: "That email doesn't look right.",
  password: "Temporary passwords need at least 6 characters.",
  exists: "Someone with that email is already in the family.",
  self: "You can't remove your own account here.",
  action: "This needs the newest family-admin function. In Supabase, open Edge Functions, family-admin, and paste in the new code from the project folder (family-admin-function.ts), then Deploy.",
};
const adminSays = (r) => ADMIN_SAYS[r?.error] || "Something went wrong. Please try again in a minute.";
const when = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "never";
async function renderFamilyPanel() {
  const body = $("#familyPanelBody");
  if (!body) return;
  const r = await familyAdmin("list");
  if (!r || r.error) { body.innerHTML = `<p class="small-print">${esc(adminSays(r))}</p>${r?.detail ? `<p class="muted small-print">Details: ${esc(r.detail)}</p>` : ""}<button class="small" id="famRetry">Try again</button>`; $("#famRetry").onclick = renderFamilyPanel; return; }
  const h = r.helper;
  const people = Array.isArray(r.people) ? r.people : [];
  // The family list still shows when the helper's usage can't be read.
  body.innerHTML = `${h ? `<div class="fam-helper"><h3>Bible helper this month</h3>
      <div class="bar"><span style="width:${h.pct}%"></span></div>
      <p><strong>${h.left.toLocaleString()}</strong> of ${h.limit.toLocaleString()} questions left · about $${(h.cents / 100).toFixed(2)} of $${(h.centsLimit / 100).toFixed(2)} used</p>
      <p class="muted small-print">Everyone is guaranteed ${h.perPerson} questions a month. It all starts fresh on ${esc(when(h.resets))}.</p></div>`
    : `<p class="muted small-print">Bible helper use can't be counted yet${r.usageProblem ? ` (${esc(r.usageProblem)})` : ""}. The family list below still works.</p>`}
    <h3>Family members (${people.length})</h3>
    <ul class="fam-list">${people.map((p) => `<li data-id="${p.id}">
      <div class="fam-who"><strong>${esc(p.name || String(p.email || "").split("@")[0])}</strong>${p.organizer ? ` <span class="pc-badge">Organizer</span>` : ""}
        <small>${esc(p.email)} · last signed in ${esc(when(p.lastSignIn))}${typeof p.asked === "number" ? ` · ${p.asked} helper question${p.asked === 1 ? "" : "s"} this month` : ""}${p.tempPassword ? " · has a temporary password" : ""}</small></div>
      <div class="fam-acts"><button class="small" data-fam-pw>New password</button><button class="small" data-fam-email>New email</button>${p.organizer ? "" : `<button class="small danger" data-fam-rm>Remove</button>`}</div>
      <div class="fam-form" hidden></div></li>`).join("")}</ul>
    <details class="fam-add"><summary>Add a family member</summary>
      <label class="field">Name<input id="famName" type="text" autocomplete="off" maxlength="40"></label>
      <label class="field">Email<input id="famEmail" type="email" autocomplete="off"></label>
      <label class="field">Temporary password<input id="famPw" type="text" autocomplete="off" minlength="6"></label>
      <p class="muted small-print">Send them the app link and this password. They choose their own password the first time they sign in.</p>
      <button class="small" id="famAddGo">Add to the family</button><p class="small-print" id="famAddMsg"></p></details>`;
  body.querySelectorAll("[data-fam-pw]").forEach((b) => b.addEventListener("click", () => {
    const li = b.closest("li"), f = li.querySelector(".fam-form");
    f.hidden = false;
    f.innerHTML = `<label class="field">New temporary password<input type="text" class="fam-newpw" autocomplete="off" minlength="6"></label>
      <button class="small" data-go>Save</button> <button class="quiet-link" data-cancel>Cancel</button><p class="small-print" data-msg></p>`;
    f.querySelector("[data-cancel]").onclick = () => { f.hidden = true; };
    f.querySelector("[data-go]").onclick = async () => {
      const out = f.querySelector("[data-msg]");
      out.textContent = "Saving…";
      const res = await familyAdmin("password", { id: li.dataset.id, password: f.querySelector(".fam-newpw").value });
      out.textContent = res?.ok ? "Saved ✓ Tell them this password. They'll choose their own when they sign in." : adminSays(res);
    };
  }));
  body.querySelectorAll("[data-fam-email]").forEach((b) => b.addEventListener("click", () => {
    const li = b.closest("li"), f = li.querySelector(".fam-form");
    f.hidden = false;
    f.innerHTML = `<label class="field">Their new email<input type="email" class="fam-newemail" autocomplete="off"></label>
      <p class="muted small-print">Same account: their notes, journal and place stay with them. They sign in with the new email from now on, with the same password.</p>
      <button class="small" data-go>Save</button> <button class="quiet-link" data-cancel>Cancel</button><p class="small-print" data-msg></p>`;
    f.querySelector("[data-cancel]").onclick = () => { f.hidden = true; };
    f.querySelector("[data-go]").onclick = async () => {
      const out = f.querySelector("[data-msg]");
      out.textContent = "Saving…";
      const res = await familyAdmin("email", { id: li.dataset.id, email: f.querySelector(".fam-newemail").value });
      if (res?.ok) { out.textContent = "Saved ✓ Tell them to sign in with the new email."; setTimeout(renderFamilyPanel, 1800); } else out.textContent = adminSays(res);
    };
  }));
  body.querySelectorAll("[data-fam-rm]").forEach((b) => b.addEventListener("click", async () => {
    const li = b.closest("li"), who = li.querySelector("strong").textContent;
    if (!confirm(`Remove ${who} from the family? They won't be able to sign in, and their saved backup is deleted. This can't be undone.`)) return;
    const res = await familyAdmin("remove", { id: li.dataset.id });
    if (res?.ok) renderFamilyPanel(); else alert(adminSays(res));
  }));
  $("#famAddGo").addEventListener("click", async () => {
    const out = $("#famAddMsg");
    out.textContent = "Adding…";
    const res = await familyAdmin("add", { name: $("#famName").value, email: $("#famEmail").value, password: $("#famPw").value });
    if (res?.ok) { renderFamilyPanel(); } else out.textContent = adminSays(res);
  });
}
function wireSignOut() {
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
  if (signedInUser.user_metadata?.own_password && !signedInUser.user_metadata?.temp_password && !flag(RESET_KEY)) { flag(STARTER_KEY, false); setupSet({ password: true }); }
  // The organizer gave them a temporary password: they choose their own first.
  if (signedInUser.user_metadata?.temp_password) flag(STARTER_KEY, true);
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
  let lastPull = 0;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && backupTimer) { clearTimeout(backupTimer); backupNow(); }
    // Back on this device: pick up anything saved on another one (at most once a minute).
    else if (document.visibilityState === "visible" && Date.now() - lastPull > 60000) { lastPull = Date.now(); backupNow(); }
  });
  // Signal back after time offline: send what was saved meanwhile right away.
  window.addEventListener("online", () => { clearTimeout(backupTimer); lastPull = Date.now(); backupNow(); });
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
// The very first open goes straight into setup. Once someone has started it, the app never
// jumps into it again by itself: Home shows a "Finish setting up" card they can tap when ready.
if (setupState() === "new") openSetup(0); else if (setupState() === "done") maybeStartTour();
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
// Short on purpose: six stops. Everything else is in ❓ help on each screen.
const TOUR = [
  { view: "home", at: ".tabbar", icon: "🧭", title: "Getting around", text: "These buttons at the bottom take you anywhere. Home brings you back to the start." },
  { view: "home", at: ".path-cards.four", icon: "📖", title: "Your studies", text: "My Bible reads straight through, Genesis to Revelation. The other three go through the whole Bible a different way. Each keeps your place." },
  { view: "read", at: "#reader", icon: "👆", title: "Read and tap", text: "Here's the Bible text. Tap any word to see what it means, with the Hebrew or Greek behind it." },
  { view: "read", at: "#studyNotes", icon: "🔎", title: "Study notes", text: "Below each chapter: the history and culture, the main views scholars hold, maps and more, like a study Bible." },
  { view: "read", at: "#partnerBox", icon: TALK_ICON, title: "Ask anything", text: "Your Bible helper answers questions about any chapter, right here. Or tap the little stick-figure friend on the side." },
  { view: "home", at: "#helpBtn", icon: "❓", title: "Help any time", text: "Not sure about something? Tap ❓ at the top of any screen for help with that screen, or to take this tour again." },
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
// Settings: the user guide at the top, and quick jumps to each group of settings.
$("#guideList").innerHTML = GUIDE.map((g) => `<details class="guide-topic" data-guide="${g.id}"><summary><span aria-hidden="true">${g.icon}</span> ${esc(g.title)}</summary><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></details>`).join("");
$("#printGuide").addEventListener("click", () => printPages(guideHtml(esc), "guide", "User Guide"));
// What's new: every note so far, and a switch for the short note on Home after updates.
$("#newsList").innerHTML = recentNews().length ? "" : `<p class="muted small-print">No updates in the last 30 days.</p>`;
$("#newsList").innerHTML += recentNews().map((n) => `<details class="guide-topic"><summary><span aria-hidden="true">✨</span> ${esc(n.title)} <small class="muted">(${esc(new Date(`${n.id}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" }))})</small></summary><ul>${n.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></details>`).join("");
function syncNewsSetting() { $("#newsShow").checked = !store.get("newsOff"); }
syncNewsSetting();
$("#newsShow").addEventListener("change", (e) => { store.set("newsOff", !e.target.checked); if (!$("#view-home").hidden) renderHome(); });
// Settings stays short: each group folds into one row with a line saying what's inside, and
// only one group is open at a time. Help and guide (with the user guide) starts open.
const SET_HINTS = {
  "sg-help": "User guide, what's new, the tour",
  "sg-you": "Your name, account, Bible version, journal passcode",
  "sg-buddy": "Your study buddy, colors and pictures",
  "sg-reading": "Text size, light or dark, read aloud, study helps, Bible keys",
  "sg-device": "Home screen, backup",
  "sg-about": "About this app, family organizer tools",
};
document.querySelectorAll("#view-settings h2.settings-group").forEach((h) => {
  const items = [];
  for (let n = h.nextElementSibling; n && !n.matches("h2.settings-group"); n = n.nextElementSibling) items.push(n);
  const box = Object.assign(document.createElement("details"), { className: "set-group", open: h.id === "sg-help" });
  box.dataset.group = h.id;
  const sum = document.createElement("summary");
  h.before(box);
  sum.append(h);
  sum.insertAdjacentHTML("beforeend", `<small>${esc(SET_HINTS[h.id] || "")}</small>`);
  box.append(sum, ...items);
  // A Done button at the end of each group, so changes feel finished (they are kept as they're made).
  box.insertAdjacentHTML("beforeend", `<div class="set-done"><button type="button" class="big-btn set-done-btn">✓ Done</button><small>Changes are saved the moment you make them.</small></div>`);
  box.querySelector(".set-done-btn").addEventListener("click", () => { box.open = false; savedNote("All changes saved ✓"); sum.scrollIntoView({ block: "nearest" }); sum.focus?.(); });
  box.addEventListener("toggle", () => {
    if (!box.open) return;
    document.querySelectorAll("#view-settings details.set-group[open]").forEach((d) => { if (d !== box) d.open = false; });
    if (box.getBoundingClientRect().top < 60) box.scrollIntoView({ block: "start" });
  });
});
document.querySelector("#view-settings .settings-jump")?.remove();
// "Saved ✓": a short note each time a setting changes, so it feels done.
function savedNote(text = "Saved ✓") {
  let el = document.querySelector(".saved-note");
  if (!el) { el = Object.assign(document.createElement("div"), { className: "saved-note" }); el.setAttribute("role", "status"); document.body.append(el); }
  el.textContent = text; el.classList.remove("show"); void el.offsetWidth; el.classList.add("show");
  clearTimeout(savedNote.t); savedNote.t = setTimeout(() => el.classList.remove("show"), 1600);
}
$("#view-settings").addEventListener("change", (e) => { if (e.target.matches("input:not([type=file]):not([type=password]), select, textarea")) savedNote(); });
// Opens whichever Settings group holds this spot (for links that take you to a setting).
function revealSetting(el) {
  const d = el?.closest?.("details.set-group");
  if (d && !d.open) d.open = true;
  return el;
}
const HELP = {
  home: ["Home", ["Tap the top card to pick up where you left off.", "Today has a verse, a psalm, a proverb, a question and a prayer for each day. Tap \"Choose what shows\" to pick what you see.", "My Bible reads the whole Bible in order. The three self-guided studies below each go a different way, with your progress shown on each.", "Go anywhere in the Bible: type a book or tap Browse books. Your study keeps its place."]],
  read: ["Reading", ["Tap the book name at the top to pick a book, chapter and verse. The ‹ › arrows go to the last or next chapter.", "Tap Read aloud to hear the chapter. The part being read is highlighted.", "Tap any word for its meaning and the Hebrew or Greek.", "Scroll down for Setting the stage, the study section (Strong's, maps, history, scholars), questions for the Bible helper, and your journal."]],
  books: ["My Bible", ["Tap Keep reading to go back to where you were, or tap any book and then a chapter to read it.", "Books shows how much of each book you've read.", "History shows chapters you've visited. Favorites are chapters you starred.", "Journal holds your daily journal and every chapter journal, with prayers and thanks."]],
  path: ["Bible study", ["Your current study, section by section. Tap a chapter to read it.", "Switch studies from Home any time. Each one keeps its own place."]],
  settings: ["Settings", ["The User guide at the top explains every part of the app, and can be printed.", "Settings is sorted into groups. Tap a group to open it; Help and guide is first.", "Account: change your password or sign out.", "Journal passcode: leave your journal open, or lock it with a passcode.", "Reading: bigger words, bigger buttons, high contrast, tap-a-word, and how the Bible helper answers.", "Look: change the colors and pictures."]],
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
let updateReady = false; // a new version is installed and waiting for a quiet moment (see Updates, below)
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
  const writing = document.activeElement?.matches?.("input, textarea, select, [contenteditable]");
  if (!lastActive || away < AWAY_MS || reader.playing || tourAt >= 0 || !$("#gate").hidden || document.querySelector("dialog[open]") || writing) { markActive(); return; }
  // A new version is waiting and nobody is in the middle of anything: switch to it now. The
  // reloaded app opens on Home with "Pick up where you left off", just as a fresh open would.
  if (updateReady) { updateReady = false; location.reload(); return; }
  lastActive = 0; markActive();
  const last = store.get("last");
  const where = `${BOOK_BY_ID[last.book].name} ${last.chapter}`;
  const path = store.get("activePath"), study = path && path !== "general" && PATH_BY_ID[path] ? PATH_BY_ID[path].short || "" : "";
  const season = seasonNow(new Date(), easterOf(new Date().getFullYear()));
  store.set("buddyWelcomeDay", new Date().toDateString()); // Buddy won't say it again today
  showView("home");
  welcomeBack.innerHTML = `<div class="wb-icon" aria-hidden="true">👋</div>
    <h2>Welcome back${store.get("name") ? `, ${esc(store.get("name"))}` : ""}!</h2>
    <p>You were reading <strong>${esc(where)}</strong>${study ? ` in your ${esc(study)} study` : ""}.</p>${season ? `<p class="wb-season">${esc(season.line)}</p>` : ""}
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

/* ---------- Lively pictures: now and then, a little more ---------- */
// Something small is always moving; every half minute or so a flock of birds passes over the
// picture on screen, so the motion varies instead of running constantly at full strength.
function passingFlock() {
  if ((store.get("graphics") || "full") !== "full" || document.visibilityState !== "visible" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const sc = [...document.querySelectorAll("svg.scene")].find((el) => { const r = el.getBoundingClientRect(); return r.width && r.bottom > 0 && r.top < innerHeight; });
  if (!sc || sc.querySelector(".m-flock")) return;
  // Indoor pictures mark their window as the sky, so birds fly past outside, never over the walls.
  (sc.querySelector(".scene-sky") || sc).insertAdjacentHTML("beforeend", flock(18 + Math.round(Math.random() * 20)));
  setTimeout(() => sc.querySelector(".m-flock")?.remove(), 9500);
}
(function flockLater() { setTimeout(() => { passingFlock(); flockLater(); }, 25000 + Math.random() * 25000); })();

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

// Updates: check for a new version each time the app opens or comes back to the screen.
// A new version never interrupts anyone: it waits until the app is next opened fresh, or
// until they come back after 15 minutes away (when the app goes to Home anyway), and never
// while reading aloud, playing a game, writing, or in the middle of any open window.
// Saved reading, notes, journals and keys are kept (they live on the device, not in the update).
if ("serviceWorker" in navigator) {
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then((reg) => {
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") reg.update().catch(() => {}); });
  }).catch(() => {});
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController) return; // first install: nothing to refresh
    updateReady = true;
    // No banner: updates arrive quietly (Melissa: don't overwhelm anyone with notes).
  });
}

/* ---------- Kids' storybook: tap surprises ---------- */
// Tap someone or something in a story picture and it gives a little hop, with a twinkle where
// you tapped. Only with Lively pictures and when motion is welcome; otherwise pictures stay still.
document.addEventListener("click", (e) => {
  const svg = e.target.closest?.("svg.storybook");
  if (!svg || (store.get("graphics") || "full") !== "full" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = svg.querySelector("g[clip-path]");
  if (!root) return;
  const vb = svg.viewBox.baseVal, box = svg.getBoundingClientRect();
  // The thing tapped: the outermost drawn group under the finger that is small enough to hop.
  let hop = null;
  for (let el = e.target; el && el !== root; el = el.parentNode) {
    if (el.tagName === "g") { const r = el.getBoundingClientRect(); if (r.width < box.width * .45 && r.height < box.height * .8) hop = el; }
  }
  if (hop && !hop.classList.contains("sb-hop")) { hop.classList.add("sb-hop"); hop.addEventListener("animationend", () => hop.classList.remove("sb-hop"), { once: true }); }
  // A twinkle where the finger landed (the picture is scaled to fill its box).
  const k = Math.max(box.width / vb.width, box.height / vb.height);
  const x = (e.clientX - box.left - (box.width - vb.width * k) / 2) / k, y = (e.clientY - box.top - (box.height - vb.height * k) / 2) / k;
  const star = document.createElementNS("http://www.w3.org/2000/svg", "path");
  star.setAttribute("d", `M${x} ${y - 9} L ${x + 2.4} ${y - 2.4} L ${x + 9} ${y} L ${x + 2.4} ${y + 2.4} L ${x} ${y + 9} L ${x - 2.4} ${y + 2.4} L ${x - 9} ${y} L ${x - 2.4} ${y - 2.4} Z`);
  star.setAttribute("fill", "#ffe680"); star.setAttribute("stroke", "#3a2a1f"); star.setAttribute("stroke-width", "1.2"); star.setAttribute("class", "sb-tapstar");
  root.append(star);
  setTimeout(() => star.remove(), 900);
});
