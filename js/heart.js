// Two keepsake helpers. Learn a verse by heart, in four gentle steps, the way memory-verse cards work:
// read it (and hear it), then every other word hidden, then only first letters, then say it
// with all the words hidden. Any hidden word can be tapped to peek. Nothing is scored or kept.
// Speech loads only when the page opens a verse (so these helpers also run in tests).
const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
const speech = () => import("./speech.js");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const STEPS = [
  ["Read it", "Read it out loud two or three times."],
  ["Every other word", "Say the whole verse. Tap a blank to peek."],
  ["First letters", "Only the first letter of each word is left."],
  ["By heart", "Say it all. Tap a blank to peek, or show it to check."],
];

// Split into words and the spaces and punctuation around them.
export function heartWords(text) {
  return String(text).split(/(\s+)/).filter(Boolean).map((t) => {
    if (/^\s+$/.test(t)) return { space: t };
    const m = t.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}'’-]+)([^\p{L}\p{N}]*)$/u);
    return m ? { pre: m[1], word: m[2], post: m[3] } : { pre: t, word: "", post: "" };
  });
}

// How a word shows at a step (0 to 3); i is its place among the words.
export function shown(word, i, step) {
  if (step === 0 || !word) return { text: word, hidden: false };
  if (step === 1) return i % 2 ? { text: word, hidden: true } : { text: word, hidden: false };
  if (step === 2) return { text: word[0], hidden: true, hint: true };
  return { text: "", hidden: true };
}

export function openHeart({ ref, text, ver = "" }) {
  const dlg = document.createElement("dialog");
  dlg.className = "word-sheet heart-sheet";
  dlg.setAttribute("aria-label", `Learn ${ref} by heart`);
  const words = heartWords(text);
  let step = 0, showAll = false;
  const paint = () => {
    let n = -1;
    const body = words.map((w) => {
      if (w.space) return w.space;
      if (!w.word) return esc(w.pre);
      n++;
      const s = shown(w.word, n, showAll ? 0 : step);
      const inner = s.hidden ? `<button type="button" class="hw-blank" data-word="${esc(w.word)}" aria-label="Hidden word, tap to peek">${esc(s.text)}<span aria-hidden="true">${"_".repeat(Math.max(2, Math.min(8, w.word.length - (s.hint ? 1 : 0))))}</span></button>` : esc(s.text);
      return `${esc(w.pre)}${inner}${esc(w.post)}`;
    }).join("");
    const [name, how] = STEPS[step];
    dlg.innerHTML = `<div class="ws-head"><h2>🧠 Learn ${esc(ref)} by heart</h2><button type="button" class="ws-close" aria-label="Close">✕</button></div>
      <ol class="heart-steps" aria-label="Steps">${STEPS.map(([s], i) => `<li class="${i === step ? "on" : i < step ? "done" : ""}">${i < step ? "✓ " : ""}${esc(s)}</li>`).join("")}</ol>
      <p class="heart-how"><b>Step ${step + 1}: ${esc(name)}.</b> ${esc(how)}</p>
      <p class="heart-verse">${body}</p>
      <p class="muted small-print">${esc(ref)}${ver ? ` (${esc(ver)})` : ""}</p>
      <div class="heart-acts">
        ${canSpeak ? `<button type="button" class="small" data-h="hear">🔊 Hear it</button>` : ""}
        ${step === 3 ? `<button type="button" class="small" data-h="show" aria-pressed="${showAll}">${showAll ? "Hide it again" : "Show it to check"}</button>` : ""}
        ${step > 0 ? `<button type="button" class="small" data-h="back">‹ Back</button>` : ""}
        ${step < 3 ? `<button type="button" class="heart-go" data-h="next">Next step ›</button>` : `<button type="button" class="heart-go" data-h="done">I said it! ✓</button>`}
      </div>
      <p class="heart-cheer" role="status"></p>`;
  };
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) { dlg.close(); return; }
    const b = e.target.closest("button");
    if (!b) return;
    if (b.classList.contains("ws-close")) { dlg.close(); return; }
    if (b.classList.contains("hw-blank")) { b.classList.add("peek"); b.textContent = b.dataset.word; return; }
    const h = b.dataset.h;
    if (h === "hear") { speech().then(({ sayAloud, stopSaying }) => { stopSaying(); sayAloud(`${text}. ${ref}.`, { rate: 0.9 }); }); return; }
    if (h === "next") { step = Math.min(3, step + 1); showAll = false; }
    else if (h === "back") { step = Math.max(0, step - 1); showAll = false; }
    else if (h === "show") showAll = !showAll;
    else if (h === "done") {
      dlg.querySelector(".heart-cheer").textContent = `Well done! "Your word I have treasured in my heart" (Psalm 119:11). Come back tomorrow and say it again.`;
      return;
    }
    paint();
  });
  dlg.addEventListener("close", () => { if (canSpeak) speechSynthesis.cancel(); dlg.remove(); });
  paint();
  document.body.append(dlg);
  dlg.showModal();
  return dlg;
}

// On this day: things written on today's month and day in an earlier year, newest first.
// `when` gives each item's date ("2026-12-25" or a full ISO time); dates are read as local days.
export function onThisDay(items, when, now = new Date()) {
  const md = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const out = [];
  for (const item of items) {
    const raw = String(when(item) || "");
    const d = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? new Date(`${raw}T12:00:00`) : new Date(raw);
    if (Number.isNaN(d.getTime())) continue;
    const years = now.getFullYear() - d.getFullYear();
    if (years < 1) continue;
    if (`${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` === md) out.push({ item, years });
  }
  return out.sort((a, b) => a.years - b.years);
}
