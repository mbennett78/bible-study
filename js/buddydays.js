// Buddy's calendar and moods. Everything runs on Central time (the family's time zone), so
// "midnight on New Year's" and "7:30 on his birthday" mean the same moment for everyone.
// Kept small and pure so it's easy to test.

const TZ = "America/Chicago";
const BORN = 2019; // he turns 8 on Aug 3, 2027
export const BIRTHDAY = { m: 8, d: 3 };

// Now, on Central time. Tests (and the preview) can set window.__buddyNow to a time in ms.
export function ctNow(ms = globalThis.__buddyNow ?? Date.now()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23" })
    .formatToParts(new Date(ms)).filter((p) => p.type !== "literal").map((p) => [p.type, Number(p.value)]));
  const { year: y, month: m, day: d, hour: h, minute: min } = parts;
  const key = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  return { y, m, d, h, min, key };
}

export const ageIn = (y) => y - BORN;

// Days until Christmas (0 on Christmas Day), or -1 after it.
function toChristmas(t) {
  const a = Date.UTC(t.y, t.m - 1, t.d), b = Date.UTC(t.y, 11, 25);
  return a > b ? -1 : Math.round((b - a) / 864e5);
}

// What's special about right now, if anything.
export function special(t = ctNow()) {
  const md = `${t.m}-${t.d}`;
  if (md === "12-31" && t.h >= 18) return { kind: "nye" };
  if (md === "1-1" && t.h === 0) return { kind: "midnight" };
  if (md === "1-1") return { kind: "newyear" };
  if (md === "12-25") return { kind: "christmas", gift: "socks" };
  if (md === "12-28") return { kind: "grandparents", gift: "teddy", from: "Grandma" };
  if (md === "12-29") return { kind: "grandparents", gift: "flashlight", from: "Grandpa" };
  if (md === "12-24") return { kind: "christmaseve" };
  const left = toChristmas(t);
  if (left > 0 && left <= 25) return { kind: "countdown", days: left };
  if (t.m === BIRTHDAY.m && t.d === BIRTHDAY.d) return { kind: "birthday", age: ageIn(t.y), gift: "lure", evening: t.h >= 18, cakeTime: t.h > 19 || (t.h === 19 && t.min >= 30) };
  if (md === "7-4") return { kind: "july4" };
  return null;
}

// A small, steady random number from a string (the same all day for the same date).
function seeded(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

// His mood for this part of the day. Most days he's happy most of the time; some days are a
// little off, and some hours he's a bit grumpy or sleepy. Kindness cheers him right up.
export function dayMood(t = ctNow(), cheered = false) {
  if (cheered) return "happy";
  const sp = special(t);
  if (sp && sp.kind !== "countdown") return "happy"; // nobody's grumpy on Christmas
  const offDay = seeded(t.key) < 0.3;
  const r = seeded(`${t.key}:${Math.floor(t.h / 3)}`);
  const [happy, calm, grumpy] = offDay ? [0.3, 0.6, 0.85] : [0.6, 0.9, 0.95];
  return r < happy ? "happy" : r < calm ? "calm" : r < grumpy ? "grumpy" : "sleepy";
}
export const moodBlock = (t = ctNow()) => `${t.key}:${Math.floor(t.h / 3)}`;
