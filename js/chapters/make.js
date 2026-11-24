// Turns the short form used in js/chapters/<book>.js into the full study-note shape that
// notes.js and the Reference panel use (see docs/STUDY-GUIDELINES.md).
//
// Short form for one chapter:
//   intro: what happens in the chapter, in two or three plain sentences
//   v:     verse notes, [ref, heading, text, evidence label?, source keys?]
//   bg:    history and culture, [heading, text, evidence label?, source keys?]
//   w:     an original-language word, [word, say, strongs, means, text, source keys?]
//   why:   "why scholars debate this", a short plain explainer, only where careful scholars
//          really disagree (who wrote it, when, to whom, or what it means)
//   views: the main views, [name, text, source keys?]; common: the ground everyone shares
//   refs:  cross-references, [chapter key, label, why]
// A book file gives its sources once, and `use` lists the source keys cited by default.
export function makeBook({ lang, sources, use }, chapters) {
  const out = {};
  for (const [ch, x] of Object.entries(chapters)) {
    const used = new Set();
    const s = (keys) => { const k = keys?.length ? keys : use; k.forEach((id) => used.add(id)); return k; };
    const sections = buildSections(x, s, lang);
    if (!sections.length) continue;
    out[ch] = {
      intro: x.intro,
      ...(x.refs?.length ? { crossRefs: x.refs } : {}),
      sections,
      sources: Object.fromEntries([...used].map((id) => [id, sources[id]])),
      brief: true,
    };
  }
  return out;
}

// The sections for one chapter, from its short form (shared by makeBook and deepen).
function buildSections(x, s, lang) {
  const sections = [];
  if (x.v?.length) sections.push({ id: "verses", title: "Verse by verse", items: x.v.map(([ref, head, text, ev, src]) => ({ ref, head, ev: ev || "scripture", src: s(src), text })) });
  if (x.bg?.length) sections.push({ id: "history", title: "History and culture", items: x.bg.map(([head, text, ev, src]) => ({ head, ev: ev || "good", src: s(src), text })) });
  if (x.w?.length) sections.push({ id: "words", title: `${lang} words`, lang, items: x.w.map(([word, say, strongs, means, text, src]) => ({ word, say, strongs, means, ev: "strong", src: s(src), text })) });
  if (x.why || x.views?.length) {
    const items = [];
    if (x.why) items.push({ head: "Why scholars debate this", who: "Why it's debated", extra: true, src: s(x.whySrc), text: x.why });
    for (const [head, text, src] of x.views || []) items.push({ head, src: s(src), text });
    if (x.common) items.push({ head: "Common ground", who: "Common ground", src: s(x.commonSrc), text: x.common });
    sections.push({ id: "views", title: "Scholars and views", items });
  }
  return sections;
}

// "Deeper notes": more verse notes, history, words and views for the most-read chapters,
// kept in their own files (js/chapters/deeper-ot.js, deeper-nt.js) and added on top of a
// chapter's notes when its book loads. Verse notes stay in verse order; nothing is replaced.
const firstVerse = (ref) => { const m = String(ref).match(/(\d+):(\d+)/); return m ? Number(m[1]) * 1000 + Number(m[2]) : 0; };
export function deepen(note, x, { lang, sources, use }) {
  if (!note || !x) return note;
  const used = new Set();
  const s = (keys) => { const k = keys?.length ? keys : use; k.forEach((id) => used.add(id)); return k; };
  for (const add of buildSections(x, s, lang)) {
    const have = note.sections.find((h) => h.id === add.id);
    if (!have) { note.sections.push(add); continue; }
    have.items.push(...add.items);
    if (add.id === "verses") have.items.sort((a, b) => firstVerse(a.ref) - firstVerse(b.ref));
  }
  const ORDER = ["verses", "history", "words", "views"];
  note.sections.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
  if (x.refs?.length) note.crossRefs = [...(note.crossRefs || []), ...x.refs.filter(([k]) => !(note.crossRefs || []).some(([h]) => h === k))];
  note.sources = { ...note.sources, ...Object.fromEntries([...used].map((id) => [id, sources[id]])) };
  note.deeper = true;
  return note;
}
