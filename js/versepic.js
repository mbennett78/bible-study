// Verse pictures: a verse on a soft square card, to share with family or save to photos.
// Drawn on a canvas in the device (no upload), in one of a few calm color styles.
export const PIC_STYLES = [
  { id: "dawn", label: "Dawn", bg: ["#fbe3c4", "#f1b38a"], ink: "#3b2414", soft: "#7a4b2c" },
  { id: "sea", label: "Sea", bg: ["#d7ecef", "#7fb3c4"], ink: "#11313d", soft: "#2f5d6c" },
  { id: "olive", label: "Olive", bg: ["#eef0dc", "#a9b47c"], ink: "#2c3317", soft: "#56602c" },
  { id: "night", label: "Night", bg: ["#2b2f55", "#11142b"], ink: "#fbf6e8", soft: "#e8c070" },
];

// Break text into lines that fit `width` with the given measure function.
export function wrapLines(text, width, measure) {
  const lines = [];
  let line = "";
  for (const w of String(text).split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${w}` : w;
    if (line && measure(next) > width) { lines.push(line); line = w; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export function drawVersePic(canvas, { text, ref, ver = "", style = PIC_STYLES[0] }) {
  const S = 1080;
  canvas.width = S; canvas.height = S;
  const g = canvas.getContext("2d");
  const grad = g.createLinearGradient(0, 0, S, S);
  grad.addColorStop(0, style.bg[0]); grad.addColorStop(1, style.bg[1]);
  g.fillStyle = grad; g.fillRect(0, 0, S, S);
  // A soft glow and a thin frame.
  const glow = g.createRadialGradient(S * 0.5, S * 0.32, 20, S * 0.5, S * 0.32, S * 0.6);
  glow.addColorStop(0, "rgba(255,255,255,.35)"); glow.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = glow; g.fillRect(0, 0, S, S);
  g.strokeStyle = style.soft; g.globalAlpha = 0.5; g.lineWidth = 3; g.strokeRect(48, 48, S - 96, S - 96); g.globalAlpha = 1;
  // A small cross above the words.
  g.fillStyle = style.soft; g.fillRect(S / 2 - 4, 120, 8, 56); g.fillRect(S / 2 - 22, 136, 44, 8);
  // The verse, as large as fits.
  const words = `“${String(text).trim()}”`;
  let size = 80, lines = [];
  for (; size >= 30; size -= 2) {
    g.font = `${size}px Georgia, "Times New Roman", serif`;
    lines = wrapLines(words, S - 220, (t) => g.measureText(t).width);
    if (lines.length * size * 1.35 <= S - 420) break;
  }
  g.fillStyle = style.ink; g.textAlign = "center"; g.textBaseline = "middle";
  const lh = size * 1.35, top = S / 2 + 20 - ((lines.length - 1) * lh) / 2;
  lines.forEach((l, i) => g.fillText(l, S / 2, top + i * lh));
  g.font = `600 40px system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.fillStyle = style.soft;
  g.fillText(`${ref}${ver ? ` (${ver})` : ""}`, S / 2, S - 150);
  return canvas;
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// The picture maker: a preview, color styles, then Share (or Save where sharing files isn't offered).
export function openVersePic({ text, ref, ver = "" }) {
  const dlg = document.createElement("dialog");
  dlg.className = "word-sheet versepic-sheet";
  dlg.setAttribute("aria-label", `Verse picture of ${ref}`);
  let style = PIC_STYLES[0];
  dlg.innerHTML = `<div class="ws-head"><h2>🖼 Verse picture</h2><button type="button" class="ws-close" aria-label="Close">✕</button></div>
    <canvas class="vp-canvas" role="img" aria-label="${esc(ref)} on a picture"></canvas>
    <div class="vp-styles" role="group" aria-label="Colors">${PIC_STYLES.map((s, i) => `<button type="button" data-style="${s.id}" aria-pressed="${i === 0}" style="background:linear-gradient(135deg,${s.bg[0]},${s.bg[1]})" aria-label="${s.label}"></button>`).join("")}</div>
    <div class="heart-acts"><button type="button" class="heart-go" data-vp="share">Share or save</button></div>
    <p class="muted small-print vp-msg" role="status">Made on this device. Nothing is uploaded.</p>`;
  const canvas = dlg.querySelector("canvas");
  const paint = () => drawVersePic(canvas, { text, ref, ver, style });
  const name = `${ref.replace(/[^\w]+/g, "-")}.png`;
  dlg.addEventListener("click", async (e) => {
    if (e.target === dlg || e.target.closest(".ws-close")) { dlg.close(); return; }
    const sb = e.target.closest(".vp-styles [data-style]");
    if (sb) { style = PIC_STYLES.find((s) => s.id === sb.dataset.style) || style; dlg.querySelectorAll("[data-style]").forEach((b) => b.setAttribute("aria-pressed", String(b === sb))); paint(); return; }
    if (e.target.closest('[data-vp="share"]')) {
      // toDataURL rather than toBlob: toBlob can stall on some browsers for a large canvas.
      const url = canvas.toDataURL("image/png");
      const bin = atob(url.split(",")[1]), bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const blob = new Blob([bytes], { type: "image/png" });
      const file = blob && typeof File === "function" ? new File([blob], name, { type: "image/png" }) : null;
      try {
        if (file && navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], text: `${ref}${ver ? ` (${ver})` : ""}` }); return; }
      } catch (err) { if (err?.name === "AbortError") return; /* they closed the share sheet; otherwise save it below */ }
      const a = Object.assign(document.createElement("a"), { href: url, download: name });
      document.body.append(a); a.click(); a.remove();
      dlg.querySelector(".vp-msg").textContent = "Saved to your downloads ✓";
    }
  });
  dlg.addEventListener("close", () => dlg.remove());
  paint();
  document.body.append(dlg);
  dlg.showModal();
  return dlg;
}
