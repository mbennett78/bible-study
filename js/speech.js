// Read-aloud with the device's built-in voice, plus optional spoken commands.
// Both run only while the app is open on screen: browsers stop them when the phone locks.

export const canSpeak = "speechSynthesis" in window;
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = Boolean(Recognition);

// Turn the reader's HTML into speakable chunks (one per verse or heading).
export function chunksFrom(readerEl) {
  const clone = readerEl.cloneNode(true);
  clone.querySelectorAll(".offline-note, .v, sup, .verse-num, .chapter-num, .footnotes").forEach((n) => n.remove());
  const blocks = [...clone.querySelectorAll("p, h2, h3, .s, .s1, .q1, .q2, .line")].filter((el) => !el.querySelector("p"));
  const text = (blocks.length ? blocks.map((b) => b.textContent) : [clone.textContent]).map((t) => t.replace(/\s+/g, " ").trim()).filter(Boolean);
  // Split long paragraphs at sentence ends so iOS doesn't cut a long utterance short.
  return text.flatMap((t) => t.length < 280 ? [t] : t.match(/[^.!?;:]+[.!?;:"”’)]*\s*/g) || [t]);
}

function pickVoice() {
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
  const preferred = ["Samantha", "Karen", "Daniel", "Moira", "Google US English"];
  return preferred.map((n) => voices.find((v) => v.name.includes(n))).find(Boolean) || voices.find((v) => v.localService) || voices[0] || null;
}

export class Reader {
  constructor({ onState, onEnd }) {
    this.onState = onState;
    this.onEnd = onEnd;
    this.chunks = [];
    this.index = 0;
    this.playing = false;
    this.rate = 1;
    this.volume = 1;
  }
  load(chunks, intro) {
    this.stop();
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
    const u = new SpeechSynthesisUtterance(this.chunks[this.index]);
    const voice = pickVoice();
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
    if (canSpeak) speechSynthesis.cancel();
  }
}

// Listens for a few short commands. Pauses itself while the app is speaking
// so it doesn't hear its own voice.
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
