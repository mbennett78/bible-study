import { BOOKS, BOOK_BY_ID, TOTAL_CHAPTERS } from "./books.js";
import { store } from "./store.js";
import { getChapter, listEnglishBibles, bibleGatewayUrl } from "./text.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- Appearance ---------- */
function applyAppearance() {
  const theme = store.get("theme");
  if (theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  document.documentElement.style.setProperty("--reading-size", `${store.get("textSize")}px`);
}

/* ---------- Navigation between tabs ---------- */
function showView(name) {
  document.querySelectorAll(".view").forEach((v) => { v.hidden = v.id !== `view-${name}`; });
  document.querySelectorAll(".tabbar button").forEach((b) => {
    if (b.dataset.view === name) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  $(".topbar").hidden = name !== "read";
  if (name === "books") renderProgress();
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
async function openChapter(book, chapter, { scroll = true } = {}) {
  store.set("last", { book, chapter });
  const version = store.get("version");
  $("#refLabel").textContent = `${BOOK_BY_ID[book].name} ${chapter}`;
  document.title = `${BOOK_BY_ID[book].name} ${chapter} · Bible Study`;
  $("#gatewayLink").href = bibleGatewayUrl(version, book, chapter);
  updateMarkRead();

  const { prev, next } = neighbors(book, chapter);
  $("#prevCh").disabled = !prev;
  $("#nextCh").disabled = !next;
  $("#prevCh span").textContent = prev ? refName(prev) : "";
  $("#nextCh span").textContent = next ? refName(next) : "";
  $("#prevCh").onclick = () => prev && openChapter(prev.book, prev.chapter);
  $("#nextCh").onclick = () => next && openChapter(next.book, next.chapter);

  if (scroll) window.scrollTo(0, 0);
  const token = ++loadToken;
  const reader = $("#reader");
  reader.innerHTML = `<p class="muted">Loading…</p>`;
  $("#copyright").textContent = "";
  try {
    const result = await getChapter(version, book, chapter);
    if (token !== loadToken) return;
    reader.innerHTML = (result.offline ? `<p class="offline-note">Offline: showing a saved copy.</p>` : "") + sanitize(result.html);
    $("#copyright").textContent = result.copyright;
  } catch (e) {
    if (token !== loadToken) return;
    const needsSettings = e.kind === "nokey" || e.kind === "auth" || e.kind === "noversion";
    reader.innerHTML = `<div class="message"><strong>Can't show this chapter yet</strong>${esc(e.message || "Something went wrong.")}
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
$("#markRead").addEventListener("click", () => {
  const { book, chapter } = store.get("last");
  store.setRead(book, chapter, !store.isRead(book, chapter));
  updateMarkRead();
});

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

/* ---------- Settings ---------- */
function initSettings() {
  const apiKey = $("#apiBibleKey"), esvKey = $("#esvKey"), size = $("#textSize"), theme = $("#theme"), sel = $("#nasbSelect");
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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
