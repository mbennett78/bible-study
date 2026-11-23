// Read-aloud with the device's built-in voice, plus optional spoken commands.
// Both run only while the app is open on screen: browsers stop them when the phone locks.

export const canSpeak = "speechSynthesis" in window;
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = Boolean(Recognition);

// Turn the reader's HTML into speakable chunks (one per verse or heading).
export function chunksFrom(readerEl) {
  const pick = (root) => [...root.querySelectorAll("p, h2, h3, .s, .s1, .q1, .q2, .line")].filter((el) => !el.querySelector("p"));
  const clone = readerEl.cloneNode(true);
  clone.querySelectorAll(".offline-note, .v, sup, .verse-num, .chapter-num, .footnotes").forEach((n) => n.remove());
  const blocks = pick(clone), live = pick(readerEl);
  const parts = (blocks.length ? blocks.map((b, i) => [b.textContent, i]) : [[clone.textContent, -1]])
    .map(([t, i]) => [t.replace(/\s+/g, " ").trim(), i]).filter(([t]) => t);
  // Split long paragraphs at sentence ends so iOS doesn't cut a long utterance short.
  const chunks = [], where = [];
  for (const [t, i] of parts) for (const piece of t.length < 280 ? [t] : t.match(/[^.!?;:]+[.!?;:"”’)]*\s*/g) || [t]) { chunks.push(piece); where.push(live[i] || null); }
  chunks.blocks = where; // the paragraph on screen for each chunk, to highlight while it's read
  return chunks;
}

// English voices on this device, for the "Reader voice" choice.
export function listVoices() {
  if (!canSpeak) return [];
  return speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en")).map((v) => ({ name: v.name, lang: v.lang }));
}
function pickVoice(name) {
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
  if (name) { const chosen = voices.find((v) => v.name === name); if (chosen) return chosen; }
  const preferred = ["Samantha", "Karen", "Daniel", "Moira", "Google US English"];
  return preferred.map((n) => voices.find((v) => v.name.includes(n))).find(Boolean) || voices.find((v) => v.localService) || voices[0] || null;
}

export class Reader {
  constructor({ onState, onEnd, onChunk }) {
    this.onState = onState;
    this.onChunk = onChunk;
    this.onEnd = onEnd;
    this.chunks = [];
    this.index = 0;
    this.playing = false;
    this.rate = 1;
    this.volume = 1;
    this.voiceName = "";
  }
  load(chunks, intro) {
    this.stop();
    this.blocks = intro ? [null, ...(chunks.blocks || [])] : (chunks.blocks || []);
    this.chunks = intro ? [intro, ...chunks] : chunks;
    this.index = 0;
  }
  play() {
    if (!canSpeak || !this.chunks.length) return;
    this.playing = true;
    this.onState?.("playing");
    this.#speakNext();
  }
  #speakNext() {
    if (!this.playing) return;
    if (this.index >= this.chunks.length) {
      this.playing = false;
      this.onState?.("ended");
      this.onEnd?.();
      return;
    }
    this.onChunk?.(this.index);
    const u = new SpeechSynthesisUtterance(this.chunks[this.index]);
    const voice = pickVoice(this.voiceName);
    if (voice) u.voice = voice;
    u.rate = this.rate;
    u.volume = this.volume;
    u.onend = () => { if (!this.playing) return; this.index += 1; this.#speakNext(); };
    u.onerror = (e) => { if (e.error !== "interrupted" && e.error !== "canceled") { this.index += 1; this.#speakNext(); } };
    speechSynthesis.speak(u);
  }
  pause() {
    this.playing = false;
    speechSynthesis.cancel(); // cancel + resume-from-chunk is more reliable than pause() on iOS
    this.onState?.("paused");
  }
  toggle() { this.playing ? this.pause() : this.play(); }
  restart() { this.stop(); this.index = 0; this.play(); }
  back() { const was = this.playing; this.stop(); this.index = Math.max(0, this.index - 1); if (was) this.play(); }
  stop() {
    this.playing = false;
    this.onChunk?.(-1);
    if (canSpeak) speechSynthesis.cancel();
  }
}

// Listens for a few short commands. Pauses itself while the app is speaking
// so it doesn't hear its own voice.
// Talk instead of type: fills a text box from the microphone until stopped.
// Talk instead of type: fills a text box from the microphone until stopped.
//   before(): may show an explanation first; return false to cancel (runs before the
//             device's own microphone question).
//   onError(kind): "denied" (microphone not allowed), "nomic", or "other".
export function dictateInto(field, button, { before, onError } = {}) {
  if (!canListen) return null;
  let rec = null;
  const stop = () => { try { rec?.stop(); } catch { /* stopped */ } rec = null; button.classList.remove("on"); button.setAttribute("aria-pressed", "false"); };
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    if (rec) { stop(); return; }
    if (before && !(await before())) return;
    rec = new Recognition();
    rec.lang = "en-US"; rec.continuous = true; rec.interimResults = false;
    rec.onresult = (ev) => {
      const said = ev.results[ev.results.length - 1][0].transcript.trim();
      if (!said) return;
      field.value = (field.value && !/\s$/.test(field.value) ? field.value + " " : field.value) + said;
      field.dispatchEvent(new Event("input", { bubbles: true }));
    };
    rec.onend = () => stop();
    rec.onerror = (ev) => {
      stop();
      if (ev.error === "not-allowed" || ev.error === "service-not-allowed") onError?.("denied");
      else if (ev.error === "audio-capture") onError?.("nomic");
      else if (ev.error !== "no-speech" && ev.error !== "aborted") onError?.("other");
    };
    try { rec.start(); button.classList.add("on"); button.setAttribute("aria-pressed", "true"); } catch { stop(); onError?.("other"); }
  });
  return stop;
}

// Says one short piece of text aloud (an answer from the study buddy), in the chosen voice.
export function sayAloud(text, { voiceName = "", rate = 1, onDone } = {}) {
  if (!canSpeak) { onDone?.(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(voiceName);
  if (voice) u.voice = voice;
  u.rate = rate;
  u.onend = u.onerror = () => onDone?.();
  speechSynthesis.speak(u);
}
export function stopSaying() { if (canSpeak) speechSynthesis.cancel(); }

export class Commands {
  constructor(handlers) {
    this.handlers = handlers;
    this.rec = null;
    this.wanted = false;
  }
  start() {
    if (!canListen || this.rec) return;
    this.wanted = true;
    const rec = new Recognition();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const said = e.results[e.results.length - 1][0].transcript.toLowerCase();
      for (const [words, fn] of this.handlers) {
        if (words.some((w) => said.includes(w))) { fn(); break; }
      }
    };
    rec.onend = () => { this.rec = null; if (this.wanted) setTimeout(() => this.start(), 400); };
    rec.onerror = (e) => { if (e.error === "not-allowed" || e.error === "service-not-allowed") this.wanted = false; };
    try { rec.start(); this.rec = rec; } catch { this.rec = null; }
  }
  stop() {
    this.wanted = false;
    try { this.rec?.stop(); } catch { /* already stopped */ }
    this.rec = null;
  }
}
