import { BOOKS, BOOK_BY_ID, TOTAL_CHAPTERS } from "./books.js";
import { store } from "./store.js";
import { getChapter, listEnglishBibles, bibleGatewayUrl, searchBible } from "./text.js";
import { PATHS, PATH_ORDER, PATH_BY_ID, pathChapters, expandReading, readingLabel } from "./paths.js";
import { Reader, Commands, chunksFrom, canSpeak, canListen } from "./speech.js";
import { pickQuestions, knowledgeRating, bankSize } from "./trivia.js";
import { seaScene, fishFlourish, classicFlourish, fishStrip, friend, edgeVines, cornerSprig, passageStrip } from "./art.js";
import { notesFor, sampleChapters, EVIDENCE } from "./notes.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- Appearance ---------- */
function applyAppearance() {
  const theme = store.get("theme");
  if (theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  document.documentElement.style.setProperty("--reading-size", `${store.get("textSize")}px`);
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
  $("#topTitle").textContent = { home: "Home", books: "My study", path: "My path", settings: "Settings" }[name] || "";
  if (name === "home") renderHome();
  if (name === "books") renderMyStudy();
  if (name === "path") renderPath();
  if (name === "settings") renderSetupCard();
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tabbar button").forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));

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
    reader.load(chunksFrom(readerEl), `${BOOK_BY_ID[book].name}, chapter ${chapter}.`);
    if (autoplayNext) { autoplayNext = false; reader.play(); }
  } catch (e) {
    if (token !== loadToken) return;
    const needsSettings = e.kind === "nokey" || e.kind === "auth" || e.kind === "noversion";
    autoplayNext = false;
    if (driveOn()) $("#driveStatus").textContent = e.message || "Couldn't load this chapter.";
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

document.querySelectorAll(".version-switch button").forEach((b) => b.addEventListener("click", () => {
  store.set("version", b.dataset.version);
  syncVersionSwitch();
  const { book, chapter } = store.get("last");
  openChapter(book, chapter, { scroll: false });
}));
function syncVersionSwitch() {
  document.querySelectorAll(".version-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.version === store.get("version"))));
}

/* ---------- Book & chapter picker ---------- */
const picker = $("#picker");
function pickerBooks() {
  $("#pickerTitle").textContent = "Books";
  $("#pickerBack").hidden = true;
  const section = (t, label) => `<p class="testament-title">${label}</p><div class="picker-books">${
    BOOKS.filter((b) => b.testament === t).map((b) => `<button data-book="${b.id}">${esc(b.name)}<small>${store.readCount(b.id) ? `${store.readCount(b.id)}/${b.chapters}` : ""}</small></button>`).join("")
  }</div>`;
  $("#pickerBody").innerHTML = section("OT", "Old Testament") + section("NT", "New Testament");
  $("#pickerBody").querySelectorAll("[data-book]").forEach((btn) => btn.addEventListener("click", () => {
    const b = BOOK_BY_ID[btn.dataset.book];
    if (b.chapters === 1) { picker.close(); showView("read"); openChapter(b.id, 1); } else pickerChapters(b.id);
  }));
}
function pickerChapters(bookId) {
  const b = BOOK_BY_ID[bookId];
  $("#pickerTitle").textContent = b.name;
  $("#pickerBack").hidden = false;
  $("#pickerBody").innerHTML = `<div class="chapter-grid">${chapterButtons(b)}</div>`;
  $("#pickerBody").querySelectorAll("[data-ch]").forEach((btn) => btn.addEventListener("click", () => {
    picker.close(); showView("read"); openChapter(b.id, Number(btn.dataset.ch));
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
$("#pickerBack").addEventListener("click", () => { $("#pickerSearch").value = ""; pickerBooks(); });
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
  view.innerHTML = `${seaScene(store.get("style"))}<div class="path-head">
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
  $("#switchPath").addEventListener("click", () => showView("home"));
}

/* ---------- Read aloud & drive mode ---------- */
const driveOn = () => store.get("modes").drive;
const reader = new Reader({
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
$("#listenBtn").hidden = !canSpeak;
$("#listenBtn").addEventListener("click", () => { if (driveOn()) openDrive(); else reader.toggle(); });

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
function openDrive() {
  $("#drive").hidden = false;
  keepAwake(true);
  if (store.get("modes").voiceCommands && canListen) commands.start();
  updateDrive();
}
function closeDrive() {
  $("#drive").hidden = true;
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
  }));
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
  $("#flourish").innerHTML = isStill() ? classicFlourish() : fishFlourish();
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
  $("#styleSelect").value = store.get("style");
  $("#styleSelect").addEventListener("change", (e) => setStyle(e.target.value));
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
  esvKey.addEventListener("change", () => { store.set("esvKey", esvKey.value.trim()); });
  size.addEventListener("input", () => { store.set("textSize", Number(size.value)); applyAppearance(); });
  theme.addEventListener("change", () => { store.set("theme", theme.value); applyAppearance(); });
  sel.addEventListener("change", () => {
    store.set("nasbBibleId", sel.value);
    store.set("nasbLabel", sel.value ? sel.selectedOptions[0].textContent.split(" · ")[0] : "");
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
const SETUP_STEPS = [
  { id: "welcome", title: "Welcome", done: () => Boolean(store.get("name").trim()) },
  { id: "look", title: "Look and pictures", done: () => Boolean(store.get("setup")?.look) },
  { id: "key", title: "Your Bible key", done: () => Boolean(store.get("apiBibleKey")) },
  { id: "path", title: "Your study path", done: () => Boolean(store.get("activePath")) },
  { id: "account", title: "Your account", done: () => false, soon: true },
];
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
}
function renderSetup() {
  const step = SETUP_STEPS[setupAt];
  $("#setupStepLabel").textContent = `Step ${setupAt + 1} of ${SETUP_STEPS.length}`;
  $("#setupDots").innerHTML = SETUP_STEPS.map((s, i) => `<span class="${i === setupAt ? "on" : s.done() ? "done" : ""}"></span>`).join("");
  $("#setupBack").style.visibility = setupAt ? "visible" : "hidden";
  $("#setupNext").textContent = setupAt === SETUP_STEPS.length - 1 ? "Finish" : "Next";
  const body = $("#setupBody");
  const chips = (list, cur, attr) => `<div class="qm-chips">${list.map(([v, l]) => `<button ${attr}="${v}" aria-pressed="${cur === v}">${l}</button>`).join("")}</div>`;
  if (step.id === "welcome") {
    body.innerHTML = `${seaScene(store.get("style"))}<h2 class="setup-h">Welcome to your Bible study</h2>
      <p class="muted">A few quick steps make the app yours. You can skip any of them and finish later from Settings, under "Set up app".</p>
      <label class="field">What should the app call you?<input id="setupName" type="text" autocomplete="given-name" value="${esc(store.get("name"))}" placeholder="Your first name"></label>`;
    $("#setupName").addEventListener("input", (e) => { store.set("name", e.target.value.trim()); $("#userName").value = e.target.value.trim(); });
  } else if (step.id === "look") {
    body.innerHTML = `<h2 class="setup-h">How should it look?</h2>
      <p class="muted small-print">Look</p>${chips(LOOKS, store.get("style"), "data-s-look")}
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
  } else if (step.id === "path") {
    const active = store.get("activePath");
    body.innerHTML = `<h2 class="setup-h">Choose your study path</h2>
      <p class="muted small-print">Each path covers the whole Bible in a different order. You can switch any time.</p>
      <div class="setup-paths">${PATH_ORDER.map((id) => `<button class="setup-path" data-s-path="${id}" aria-pressed="${active === id}"><span class="pc-icon">${PATH_ICONS[id]}</span><span><strong>${esc(PATH_BY_ID[id].name)}</strong><small>${esc(PATH_BY_ID[id].blurb)}</small></span></button>`).join("")}</div>`;
    body.querySelectorAll("[data-s-path]").forEach((b) => b.addEventListener("click", () => { store.startPath(b.dataset.sPath); updatePathBits(); renderSetup(); }));
  } else {
    body.innerHTML = `<h2 class="setup-h">Your account</h2>
      <p class="muted">Family accounts are being set up next. When they're ready, you'll sign in here with your email so your progress, journal and key follow you to any device, and you can change your login any time in Settings.</p>
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
];
const LOOKS = [["classic", "Classic"], ["sage", "Sage"], ["feminine", "Feminine"], ["masculine", "Masculine"], ["animated", "Animated"], ["wood", "Wooden Cross"]];
// The two still looks: no motion, no cartoons, no confetti.
function isStill(style = store.get("style")) { return style === "classic" || style === "wood"; }
const GRAPHICS = [["full", "Lively", "Friendly characters that move and blink, more pictures while you read, and confetti when you finish trivia or a chapter."], ["simple", "Still", "The same scenes, maps and borders, drawn still and elegant: no cartoon faces, no motion and no confetti. A good fit for anyone who'd rather not have cartoons."], ["none", "Text only", "Just the Bible text and tools, no pictures."]];
function renderQuickMenu() {
  const chips = (list, cur, attr) => list.map(([v, l]) => `<button ${attr}="${v}" aria-pressed="${cur === v}">${l}</button>`).join("");
  $("#qmLook").innerHTML = chips(LOOKS, store.get("style"), "data-qm-look");
  $("#qmGraphics").innerHTML = chips(GRAPHICS, store.get("graphics") || "full", "data-qm-gfx");
  $("#qmGraphicsNote").textContent = GRAPHICS.find(([v]) => v === (store.get("graphics") || "full"))[2];
  const shown = store.get("show") || {};
  $("#qmToggles").innerHTML = FEATURES.map((f) => `<label class="switch-row"><span>${esc(f.label)}<small>${esc(f.hint)}</small></span><input type="checkbox" role="switch" data-qm-feat="${f.id}" ${shown[f.id] === false ? "" : "checked"}></label>`).join("");
  $("#qmLook").querySelectorAll("[data-qm-look]").forEach((b) => b.addEventListener("click", () => { setStyle(b.dataset.qmLook); renderQuickMenu(); }));
  $("#qmGraphics").querySelectorAll("[data-qm-gfx]").forEach((b) => b.addEventListener("click", () => { store.set("graphics", b.dataset.qmGfx); applyAppearance(); renderQuickMenu(); }));
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
    return `<div class="path-card${isActive ? " is-active" : ""}">
      <div class="pc-top"><span class="pc-icon">${PATH_ICONS[id]}</span><div><h3>${esc(p.name)}</h3>${isActive ? `<span class="pc-badge">Your current path</span>` : ""}</div></div>
      <p>${esc(p.blurb)}</p>
      <div class="bar"><span style="width:${(done / total) * 100}%"></span></div>
      <span class="pc-meta">${done} of ${total} chapters · ${p.stages.length} sections</span>
      <div class="pc-actions"><button class="small" data-start="${id}"${featured ? ` data-read-now="1"` : ""}>${label}</button>${isActive ? `<button class="quiet-link" data-stages="${id}">See ${featured ? "sections" : "stages"}</button>` : ""}</div>
    </div>`;
  };
  // Four equal cards, Traditional first: a 2×2 grid on iPad, stacked on iPhone.
  return `<div class="path-cards four">${PATH_ORDER.map((id, i) => card(id, i === 0)).join("")}</div>`;
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
    <div class="look-chips" role="group" aria-label="Look">${LOOKS.map(([v, l]) => `<button data-look="${v}" aria-pressed="${store.get("style") === v}">${l}</button>`).join("")}</div>
    <button class="resume-card" id="resumeBtn"><span><strong>${esc(resume.title)}</strong><small>${esc(resume.sub)}</small></span><span class="go" aria-hidden="true">›</span></button>
    <h2 class="home-h">Your study paths</h2>
    ${pathCardsHtml()}
    <div class="jump-card">
      <h2>Go anywhere in the Bible</h2>
      <div class="jump-row"><input id="homeJump" type="search" placeholder="Type a book, like Psalm 23" autocomplete="off" aria-label="Find a book and chapter"><button class="small" id="homeBrowse">Browse books</button></div>
      <div class="jump-results" id="homeJumpResults"><span class="hint">Reading outside your path is fine. Your path keeps its place.</span></div>
    </div>
    <label class="home-drive"><span><strong>Drive mode</strong><small>Big buttons and reading aloud, chapter after chapter</small></span><input type="checkbox" role="switch" id="homeDrive" aria-label="Drive mode"></label>
    ${archiveHtml()}
    <div class="home-end"></div>${cornerSprig()}${cornerSprig(true)}`;
  $("#resumeBtn").addEventListener("click", () => { showView("read"); openChapter(resume.go.book, resume.go.chapter); });
  wirePathCards(view);
  wireArchive(view);
  view.querySelectorAll("[data-look]").forEach((btn) => btn.addEventListener("click", () => setStyle(btn.dataset.look)));
  $("#homeBrowse").addEventListener("click", openPicker);
  wireJump($("#homeJump"), $("#homeJumpResults"), (r) => { showView("read"); openChapter(r.book, r.chapter); });
  $("#homeDrive").checked = driveOn();
  $("#homeDrive").addEventListener("change", (e) => setDrive(e.target.checked));
}

function setStyle(v) {
  store.set("style", v);
  $("#styleSelect").value = v;
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
  if (on) { showView("read"); openDrive(); } else if (!$("#drive").hidden) closeDrive();
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


/* ---------- Invite: share this device's Bible key with someone at home ---------- */
// The invite carries the key in the part of the link after "#", which browsers never send
// to the website, so the key goes only from one phone to the other.
const b64url = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64url = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)));
function makeInviteCode({ to = "", look = "" } = {}) {
  const d = { v: 1, k: store.get("apiBibleKey"), b: store.get("nasbBibleId") || "", l: store.get("nasbLabel") || "", e: store.get("esvKey") || "", from: store.get("name").trim(), to, look };
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
  if (d.to && !store.get("name").trim()) store.set("name", d.to);
  if (d.look && !(store.get("setup") || {}).look) {
    store.set("style", d.look);
    if (d.look === "classic" || d.look === "wood") store.set("graphics", "simple");
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
syncVersionSwitch();
initSettings();
setRate(store.get("voiceRate"));
$("#driveQuick").checked = driveOn();
const start = store.get("last");
openChapter(start.book, start.chapter);
if (driveOn()) openDrive();
updateMascot();
setMargin(store.get("margin") && window.innerWidth >= 1000);
showView("home"); // the app always opens on Home, where the study paths are
{ const su = store.get("setup") || {}; if (!su.done && !su.skipped) openSetup(0); } // first time on this device
wireShareKey();
inviteWelcome();

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
