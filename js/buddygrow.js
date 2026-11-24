// Buddy grows, part 2: he gets a little scared in scary stories (and feels better when someone
// checks on him), finds small story props as they spend time with him, and remembers what each
// person teaches him. Everything stays on this person's device and in their own backup.
// Nothing here makes him bigger on screen, and he can still be quieted, moved or turned off.

// Chapters where he gets a little scared (lions, giants, storms, the big fish...).
export const SCARY = {
  "GEN.3": "the serpent", "GEN.7": "the flood", "EXO.14": "the Red Sea", "1SA.17": "Goliath", "DAN.3": "the fiery furnace",
  "DAN.6": "the lions", "JON.1": "the storm", "JON.2": "the big fish", "MAT.8": "the storm", "MRK.4": "the storm", "LUK.8": "the storm",
  "MAT.14": "the waves", "ACT.27": "the shipwreck", "MAT.27": "the cross", "MRK.15": "the cross", "LUK.23": "the cross", "JHN.19": "the cross",
  "1KI.18": "the fire from heaven", "JDG.7": "the battle", "JOS.6": "the falling walls", "EXO.12": "that sad night in Egypt", "REV.12": "the dragon", "REV.13": "the beast",
};
const SCARY_WORDS = /\b(lions?|bears?|serpent|dragon|beast|giant|storm|tempest|darkness|terrif\w*|afraid|fear\w*|trembl\w*|sword|army|armies|enemies|wolves|devour\w*)\b/gi;
// A chapter is scary if it's a known scary story, or if scary words fill it.
export function isScary(ref, text = "") {
  if (SCARY[ref]) return SCARY[ref];
  return (String(text).match(SCARY_WORDS) || []).length >= 6 ? "this part" : "";
}

// Someone checks on him: "Are you okay?", "Don't be scared", "It's okay Buddy".
const CHECK_ON = /\b(are you (ok(ay)?|alright|all right|scared|afraid)|you ok(ay)?|don'?t be (scared|afraid)|it'?s (ok(ay)?|alright|all right)|(i'?ll|i will) (protect|hold|keep) you|you'?re safe|be brave|(no|nothing to) (need to )?be (scared|afraid)|hug)\b/i;
export function checkingOn(q) { return CHECK_ON.test(String(q || "")); }
export function comfortLine({ scaredOf = "", name = "", warmth = 0 } = {}) {
  const n = name ? `, ${name}` : "";
  if (scaredOf) return pick([`Thank you${n}. 🥹 I was a little scared of ${scaredOf}, but God was with them, and He's with us too. I feel better now!`, `Phew. 😮‍💨 Thanks for checking on me${n}. ${scaredOf[0].toUpperCase() + scaredOf.slice(1)} gave me a fright, but "When I am afraid, I will put my trust in You" (Psalm 56:3). I'm okay now!`, `You're so kind${n}. 💛 I feel brave again, even after ${scaredOf}. God takes care of His people, even in scary parts.`]);
  return warmth >= 3 ? pick([`I'm great${n}, especially when I get to study with you! 💛`, `I'm happy as can be${n}. You're one of my favorite people to read with. 😊`]) : pick([`I'm doing great${n}! Thanks for asking. 😊`, `I'm good${n}! It's nice of you to check on me. 💛`]);
}

// Little props he can bring out for certain stories. They unlock one at a time as someone
// spends time with him (chatting, playing, teaching him things), so he keeps growing.
export const PROPS = [
  { id: "tree", icon: "🌳", name: "a sycamore tree", refs: ["LUK.19"], line: "Look! I'm up a tree like Zacchaeus! 🌳" },
  { id: "boat", icon: "⛵", name: "a little boat", refs: ["GEN.6", "GEN.7", "GEN.8", "MAT.8", "MRK.4", "LUK.5", "LUK.8", "JHN.21", "ACT.27"], line: "All aboard my little boat! ⛵" },
  { id: "sling", icon: "🪨", name: "five smooth stones", refs: ["1SA.17"], line: "I found five smooth stones, like David! 🪨" },
  { id: "star", icon: "⭐", name: "a bright star", refs: ["MAT.2", "LUK.2", "GEN.15"], line: "Follow the star! ⭐" },
  { id: "fish", icon: "🐟", name: "a fish", refs: ["JON.1", "JON.2", "MAT.14", "JHN.6", "MRK.6", "LUK.9"], line: "Blub blub! 🐟" },
  { id: "harp", icon: "🎵", name: "a little harp", refs: ["PSA.23", "PSA.100", "PSA.150", "1SA.16"], line: "Let's sing a psalm! 🎵" },
  { id: "lamp", icon: "🪔", name: "a lamp", refs: ["PSA.119", "MAT.5", "MAT.25", "EXO.27"], line: "Your word is a lamp to my feet! 🪔" },
  { id: "sheep", icon: "🐑", name: "a lost lamb", refs: ["LUK.15", "JHN.10", "ISA.53"], line: "I found the lost lamb! 🐑" },
  { id: "crown", icon: "👑", name: "a crown", refs: ["EST.4", "EST.5", "REV.4", "1KI.3", "2SA.5"], line: "A crown for the King of kings! 👑" },
  { id: "dove", icon: "🕊️", name: "a dove", refs: ["GEN.8", "MAT.3", "MRK.1", "LUK.3", "JHN.1"], line: "Coo! A dove! 🕊️" },
];
// How many props are unlocked for this much time together (one to start, then more).
export const PROP_STEPS = [0, 3, 6, 10, 15, 21, 28, 36, 45, 55];
export function propsUnlocked(together = 0) { return PROP_STEPS.filter((n) => together >= n).length; }
export function propFor(ref, together = 0) {
  const open = PROPS.slice(0, propsUnlocked(together));
  return open.find((p) => p.refs.includes(ref)) || null;
}
// The prop that just unlocked at this count, if any.
export function newProp(together) {
  const i = PROP_STEPS.indexOf(together);
  return i > 0 ? PROPS[i] : null;
}

// How warm he is: grows as they spend time with him. Never shrinks, never nags.
export function warmthLevel(together = 0) { return together >= 40 ? 4 : together >= 20 ? 3 : together >= 8 ? 2 : together >= 3 ? 1 : 0; }

// Things people teach him. "My favorite verse is John 3:16", "Remember that I love horses",
// "My dog's name is Max". He keeps up to 30, newest first.
const TEACH = [
  [/^(?:please )?remember (?:that )?(.{3,120})$/i, (m) => ({ text: m[1] })],
  [/\bmy favou?rite (verse|book|story|song|hymn|color|colour|animal|food|bible character|person in the bible|psalm) is (.{1,80})$/i, (m) => ({ key: `favorite ${m[1].toLowerCase().replace("colour", "color")}`, text: m[2] })],
  [/\bmy (dog|cat|horse|pet|bird|fish)(?:'s|s)? name is (.{1,40})$/i, (m) => ({ key: `${m[1].toLowerCase()}'s name`, text: m[2] })],
  [/\bmy (birthday) is (.{3,40})$/i, (m) => ({ key: "birthday", text: m[2] })],
  [/\b(?:call me|my nickname is) (.{1,30})$/i, (m) => ({ key: "nickname", text: m[1] })],
];
const clean = (t) => String(t).trim().replace(/[.!?\s]+$/, "").replace(/\s+/g, " ");
export function learnFrom(q) {
  const t = String(q || "").trim();
  for (const [re, make] of TEACH) {
    const m = t.match(re);
    if (m) { const f = make(m); return { key: f.key || "", text: clean(f.text) }; }
  }
  return null;
}
export function remember(list = [], fact, now = Date.now()) {
  const kept = (Array.isArray(list) ? list : []).filter((f) => !(fact.key && f.key === fact.key) && f.text.toLowerCase() !== fact.text.toLowerCase());
  return [{ ...fact, at: now }, ...kept].slice(0, 30);
}
export function learnedLine(fact, name = "") {
  const n = name ? `, ${name}` : "";
  const what = fact.key ? `your ${fact.key} is ${fact.text}` : `${fact.text.replace(/^(i|I) /, "you ").replace(/\bmy\b/gi, "your").replace(/\bI'm\b/g, "you're").replace(/\bI am\b/g, "you are")}`;
  return pick([`Got it${n}! I'll remember that ${what}. 📝`, `Ooh, thanks for telling me! I'll remember that ${what}. 💛`]);
}
// "What do you remember about me?" and "Forget that" / "Forget everything".
export const ASK_MEMORY = /\bwhat (do|did) you (remember|know) about me\b|\bwhat have i (taught|told) you\b/i;
export const FORGET_LAST = /^(please )?forget (that|it|the last thing)[.!]?$/i;
export const FORGET_ALL = /^(please )?forget (everything|all of it|all that|what i (taught|told) you)[.!]?$/i;
export function memoryLine(list = [], name = "") {
  if (!list.length) return "You haven't taught me anything yet! Try \"Remember that I love the Psalms\" or \"My favorite verse is John 3:16.\" 😊";
  const bits = list.slice(0, 5).map((f) => (f.key ? `your ${f.key} is ${f.text}` : f.text.replace(/^(i|I) /, "you ").replace(/\bmy\b/gi, "your")));
  return `Here's what I remember${name ? `, ${name}` : ""}: ${bits.join("; ")}.${list.length > 5 ? ` And ${list.length - 5} more!` : ""} Only you can see this. Say "forget that" or "forget everything" any time.`;
}
// Now and then he brings one up on his own: "You told me your favorite verse is John 3:16!"
export function recallLine(list = [], name = "", r = Math.random()) {
  if (!list.length) return "";
  const f = list[Math.floor(r * list.length) % list.length];
  const what = f.key ? `your ${f.key} is ${f.text}` : f.text.replace(/^(i|I) /, "you ").replace(/\bmy\b/gi, "your");
  return `I remember you told me ${what}! 😊${name ? ` I love learning about you, ${name}.` : ""}`;
}

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
