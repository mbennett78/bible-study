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
  constructor({ onState, onEnd, onChunk, onSource }) {
    this.onState = onState;
    this.onChunk = onChunk;
    this.onEnd = onEnd;
    this.chunks = [];
    this.index = 0;
    this.playing = false;
    this.rate = 1;
    this.volume = 1;
    this.voiceName = "";
    // A recorded narrator: audioFor() resolves to an audio URL for the loaded chapter, or null.
    // When it can't be had, the device voice reads instead.
    this.audioFor = null;
    this.audio = null;
    this.audioUrl = null;
    this.usingAudio = false;
    this.onSource = onSource; // called with "recorded" or "device"
  }
  load(chunks, intro) {
    this.stop();
    if (this.audio) { this.audio.removeAttribute("src"); this.audio.load(); }
    if (this.audioUrl?.startsWith("blob:")) URL.revokeObjectURL(this.audioUrl);
    this.audioUrl = null; this.audioTried = false; this.usingAudio = false;
    this.blocks = intro ? [null, ...(chunks.blocks || [])] : (chunks.blocks || []);
    this.chunks = intro ? [intro, ...chunks] : chunks;
    this.index = 0;
    this.cum = null;
  }
  play() {
    if (!this.chunks.length) return;
    if (this.audioFor && !this.audioTried) { this.#startAudio(); return; }
    if (this.usingAudio) { this.#resumeAudio(); return; }
    if (!canSpeak) return;
    this.playing = true;
    this.onState?.("playing");
    this.onSource?.("device");
    this.#speakNext();
  }
  async #startAudio() {
    this.audioTried = true;
    this.playing = true;
    this.onState?.("loading");
    let url = null;
    try { url = await this.audioFor(); } catch { url = null; }
    if (!url) { this.usingAudio = false; if (this.playing) { this.playing = false; this.play(); } return; }
    this.audioUrl = url;
    this.usingAudio = true;
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.preload = "auto";
      this.audio.addEventListener("timeupdate", () => this.#followAudio());
      this.audio.addEventListener("ended", () => { this.playing = false; this.onChunk?.(-1); this.onState?.("ended"); this.onEnd?.(); });
      this.audio.addEventListener("error", () => { if (!this.usingAudio) return; this.usingAudio = false; if (this.playing) { this.playing = false; this.play(); } });
    }
    this.audio.src = url;
    if (this.playing) this.#resumeAudio(); // else paused while it loaded; play() picks it up
  }
  #resumeAudio() {
    this.playing = true;
    this.audio.playbackRate = this.rate;
    this.audio.volume = this.volume;
    // Start where the highlighted part is, roughly, after "back" or a chapter reload.
    if (this.index > 0 && this.audio.duration && this.audio.currentTime === 0) this.audio.currentTime = this.#timeAt(this.index);
    this.audio.play().then(() => { this.onState?.("playing"); this.onSource?.("recorded"); }).catch(() => { this.usingAudio = false; this.playing = false; this.play(); });
  }
  // Recordings have no verse timings, so the highlight follows by how far through the words it is.
  #weights() {
    if (!this.cum) { let t = 0; this.cum = this.chunks.map((c) => (t += (c || "").length)); }
    return this.cum;
  }
  #timeAt(i) { const w = this.#weights(), total = w[w.length - 1] || 1; return ((w[i - 1] || 0) / total) * (this.audio.duration || 0); }
  #followAudio() {
    if (!this.audio?.duration) return;
    const w = this.#weights(), total = w[w.length - 1] || 1;
    const at = (this.audio.currentTime / this.audio.duration) * total;
    const i = Math.max(0, w.findIndex((x) => x >= at));
    if (i !== this.index) { this.index = i; this.onChunk?.(i); }
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
    if (this.usingAudio && this.audio) this.audio.pause();
    else if (canSpeak) speechSynthesis.cancel(); // cancel + resume-from-chunk is more reliable than pause() on iOS
    this.onState?.("paused");
  }
  setRate(r) { this.rate = r; if (this.audio) this.audio.playbackRate = r; }
  setVolume(v) { this.volume = v; if (this.audio) this.audio.volume = v; }
  toggle() { this.playing ? this.pause() : this.play(); }
  restart() { this.stop(); this.index = 0; if (this.audio && this.usingAudio) this.audio.currentTime = 0; this.play(); }
  back() {
    const was = this.playing;
    if (this.usingAudio && this.audio) { this.index = Math.max(0, this.index - 1); this.audio.currentTime = this.#timeAt(this.index); if (!was) this.onChunk?.(this.index); return; }
    this.stop(); this.index = Math.max(0, this.index - 1); if (was) this.play();
  }
  stop() {
    this.playing = false;
    this.onChunk?.(-1);
    if (this.audio) { this.audio.pause(); if (this.audio.duration) this.audio.currentTime = 0; }
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
export function sayAloud(text, { voiceName = "", rate = 1, pitch = 1, onDone } = {}) {
  if (!canSpeak) { onDone?.(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(voiceName);
  if (voice) u.voice = voice;
  u.rate = rate;
  u.pitch = pitch;
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
