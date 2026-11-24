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
