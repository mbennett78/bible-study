import { BOOKS, BOOK_BY_ID, TOTAL_CHAPTERS } from "./books.js";
import { store } from "./store.js";
import { getChapter, listEnglishBibles, bibleGatewayUrl } from "./text.js";
import { PATHS, PATH_BY_ID, pathChapters, expandReading, readingLabel } from "./paths.js";
import { Reader, Commands, chunksFrom, canSpeak, canListen } from "./speech.js";
import { pickQuestions, knowledgeRating, bankSize } from "./trivia.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- Appearance ---------- */
function applyAppearance() {
  const theme = store.get("theme");
  if (theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  document.documentElement.style.setProperty("--reading-size", `${store.get("textSize")}px`);
  const style = store.get("style");
  if (style === "sage") delete document.documentElement.dataset.style;
  else document.documentElement.dataset.style = style;
  if (typeof updateMascot === "function") updateMascot();
}

/* ---------- Navigation between tabs ---------- */
function showView(name) {
  document.querySelectorAll(".view").forEach((v) => { v.hidden = v.id !== `view-${name}`; });
  document.querySelectorAll(".tabbar button").forEach((b) => {
    if (b.dataset.view === name) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  $(".topbar").hidden = name !== "read";
  if (name === "books") renderMyStudy();
  if (name === "path") renderPath();
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
  renderMargin();
  mascotSay(mascotLineFor(book, chapter));
  reader.stop();
  $("#listenBtn").setAttribute("aria-pressed", "false");

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
      ${needsSettings ? `<br><button class="small" id="goSettings">Open Settings</button>` : `<br><button class="small" id="retry">Try again</button>`}</div>`;
    $("#goSettings")?.addEventListener("click", () => showView("settings"));
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
    if (b.chapters === 1) { picker.close(); openChapter(b.id, 1); } else pickerChapters(b.id);
  }));
}
function pickerChapters(bookId) {
  const b = BOOK_BY_ID[bookId];
  $("#pickerTitle").textContent = b.name;
  $("#pickerBack").hidden = false;
  $("#pickerBody").innerHTML = `<div class="chapter-grid">${chapterButtons(b)}</div>`;
  $("#pickerBody").querySelectorAll("[data-ch]").forEach((btn) => btn.addEventListener("click", () => {
    picker.close(); openChapter(b.id, Number(btn.dataset.ch));
  }));
}
function chapterButtons(b) {
  const here = store.get("last");
  return Array.from({ length: b.chapters }, (_, i) => i + 1).map((ch) => {
    const cls = [store.isRead(b.id, ch) && "is-read", here.book === b.id && here.chapter === ch && "is-here"].filter(Boolean).join(" ");
    return `<button data-ch="${ch}" class="${cls}" aria-label="${esc(b.name)} ${ch}${store.isRead(b.id, ch) ? ", read" : ""}">${ch}</button>`;
  }).join("");
}
$("#refButton").addEventListener("click", () => { pickerBooks(); picker.showModal(); });
$("#pickerBack").addEventListener("click", pickerBooks);
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
  if (segment === "journal") renderJournalList();
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
  banner.textContent = `${p.name} path · Stage ${list[i].stage + 1}: ${p.stages[list[i].stage].title} · ${store.pathReadCount(pathId)} of ${list.length} chapters`;
  const next = list[i + 1];
  btn.hidden = !next;
  if (next) {
    btn.textContent = `Next in your ${p.name.toLowerCase()} path: ${BOOK_BY_ID[next.book].name} ${next.chapter} ›`;
    btn.onclick = () => openChapter(next.book, next.chapter);
  }
}
function renderPath() {
  const view = $("#pathView");
  const active = store.get("activePath");
  if (!active) {
    view.innerHTML = `<h1>Choose your study path</h1>
      <p class="muted">Each path takes you through the whole Bible, all 66 books and 1,189 chapters, in a different order. You can switch any time, and each path keeps its own progress.</p>
      <div class="path-choice">${PATHS.map((p) => `<div class="card">
        <h2>${esc(p.name)}</h2><p>${esc(p.blurb)}</p>
        <details><summary>See the ${p.stages.length} stages</summary><ol>${p.stages.map((s) => `<li>${esc(s.title)}</li>`).join("")}</ol></details>
        <button class="small" data-start="${p.id}">${store.pathReadCount(p.id) ? "Continue" : "Start"} this path</button></div>`).join("")}</div>`;
    view.querySelectorAll("[data-start]").forEach((b) => b.addEventListener("click", () => { store.startPath(b.dataset.start); renderPath(); updatePathBits(); }));
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
  view.innerHTML = `<div class="path-head">
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
    <button class="quiet-link" id="switchPath">Switch to a different path</button>`;
  $("#continuePath")?.addEventListener("click", () => { showView("read"); openChapter(next.book, next.chapter); });
  view.querySelectorAll("[data-b]").forEach((b) => b.addEventListener("click", () => { showView("read"); openChapter(b.dataset.b, Number(b.dataset.c)); }));
  $("#switchPath").addEventListener("click", () => { store.set("activePath", ""); renderPath(); updatePathBits(); });
}

/* ---------- Read aloud & drive mode ---------- */
const driveOn = () => store.get("modes").drive;
const reader = new Reader({
  onState(state) {
    $("#listenBtn").setAttribute("aria-pressed", String(state === "playing"));
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
$("#driveExit").addEventListener("click", () => { closeDrive(); store.setMode("drive", false); $("#modeDrive").checked = false; });

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
    $("#marginTitle").textContent = `${p.name} path`;
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
function renderJournal() {
  const { book, chapter } = store.get("last");
  const inner = $("#journalInner");
  const text = store.journalFor(book, chapter);
  $("#journalHint").textContent = journalLocked() ? "Locked" : text ? "You've written here. Tap to read or add more." : "Thoughts and feelings on this chapter";
  inner.innerHTML = "";
  if (journalLocked()) { inner.append(unlockForm(renderJournal)); return; }
  const ta = document.createElement("textarea");
  ta.id = "journalText";
  ta.placeholder = `What is ${BOOK_BY_ID[book].name} ${chapter} saying to you today? How does it make you feel?`;
  ta.value = text;
  const saved = Object.assign(document.createElement("p"), { className: "saved" });
  const entry = store.get("journal")[`${book}.${chapter}`];
  saved.textContent = entry ? `Saved ${fmtDate(entry.updated)}` : "Saves as you type";
  let t;
  ta.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => { store.setJournal(book, chapter, ta.value); saved.textContent = "Saved just now"; }, 500);
  });
  inner.append(ta, saved);
}
function renderJournalList() {
  const el = $("#journalList");
  if (journalLocked()) { el.innerHTML = ""; el.append(unlockForm(renderJournalList)); return; }
  const items = store.allJournal();
  el.innerHTML = items.length ? items.map((j) => `<button class="log-row" data-key="${j.key}"><strong>${esc(keyRef(j.key).name)}</strong><small>${fmtDate(j.updated)}</small><span class="log-dates">${esc(j.text.slice(0, 140))}${j.text.length > 140 ? "…" : ""}</span></button>`).join("")
    : `<p class="empty">Open "My journal" under any chapter to write your thoughts. They'll be collected here.</p>`;
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
    if (great) confetti();
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
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = $("#confetti"), ctx = c.getContext("2d");
  c.width = innerWidth * devicePixelRatio; c.height = innerHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const colors = ["#46604f", "#c8a55a", "#c9826b", "#9cc0a8", "#f4f1e8"];
  const bits = Array.from({ length: 120 }, () => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 12, vy: Math.random() * -12 - 4, r: Math.random() * 6 + 3, a: Math.random() * 6, c: pick(colors) }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits.forEach((b) => { b.vy += .35; b.x += b.vx; b.y += b.vy; b.a += .2; ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c; ctx.fillRect(-b.r / 2, -b.r / 4, b.r, b.r / 2); ctx.restore(); });
    if (++frames < 140) requestAnimationFrame(tick); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}

/* ---------- Friendly lamb (Animated style) ---------- */
let mascotTimer;
function updateMascot() { $("#mascot").hidden = store.get("style") !== "animated"; }
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
$("#mascot").addEventListener("click", () => mascotSay(pick(["Baa! You're doing great.", "Did you know sheep know their shepherd's voice? (John 10:4)", "Tap the trivia card when you finish a chapter!"])));

/* ---------- Settings ---------- */
function initSettings() {
  const apiKey = $("#apiBibleKey"), esvKey = $("#esvKey"), size = $("#textSize"), theme = $("#theme"), sel = $("#nasbSelect");
  $("#userName").value = store.get("name");
  $("#userName").addEventListener("change", (e) => { store.set("name", e.target.value.trim()); });
  $("#styleSelect").value = store.get("style");
  $("#styleSelect").addEventListener("change", (e) => { store.set("style", e.target.value); applyAppearance(); mascotSay("Hello! I'm here to cheer you on."); });
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
  $("#modeDrive").addEventListener("change", (e) => {
    store.setMode("drive", e.target.checked);
    if (e.target.checked) { showView("read"); openDrive(); }
  });
  $("#modeVoice").addEventListener("change", (e) => store.setMode("voiceCommands", e.target.checked));
  $("#voiceRate").addEventListener("input", (e) => { store.set("voiceRate", Number(e.target.value)); reader.rate = Number(e.target.value); });
  apiKey.value = store.get("apiBibleKey");
  esvKey.value = store.get("esvKey");
  size.value = store.get("textSize");
  theme.value = store.get("theme");
  if (store.get("nasbBibleId")) {
    sel.add(new Option(store.get("nasbLabel") || "Saved edition", store.get("nasbBibleId"), true, true));
  }
  apiKey.addEventListener("change", () => { store.set("apiBibleKey", apiKey.value.trim()); });
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

/* ---------- Start ---------- */
applyAppearance();
syncVersionSwitch();
initSettings();
const start = store.get("last");
openChapter(start.book, start.chapter);
if (driveOn()) openDrive();
updateMascot();
setMargin(store.get("margin") && window.innerWidth >= 1000);
if (!store.get("activePath") && !store.totalRead()) showView("path"); // first run: choose a path

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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
