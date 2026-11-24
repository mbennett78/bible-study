// Buddy's own know-how, with no internet and no AI: where things are in the app, a warm
// "welcome back" that remembers where they left off, what day and season it is, and how long
// they've been studying. Everything here is plain words and simple rules, so it always works.

// "Where do I change the text size?" -> a short answer and the place to show them.
// go: [view, selector] (the screen to open and the thing to point at), or "games".
export const APP_GUIDE = [
  { keys: /text size|font|bigger (words|text|letters|print)|(words|text|letters|print) bigger|smaller (words|text|letters)|(words|text|letters|print) (are |is )?(too )?(small|big|tiny)|hard to (read|see)/, say: "Text size is in Settings, under Reading. Slide it bigger or smaller and the Bible changes right away.", go: ["settings", "#textSize"], label: "Show me" },
  { keys: /bigger (buttons|labels)|buttons (are |is )?(too )?small/, say: "In Settings, under Reading, turn on \"Bigger labels and buttons.\"", go: ["settings", "#uiScale"], label: "Show me" },
  { keys: /dark mode|night mode|darker|too bright|appearance|light mode/, say: "Light or dark is under Appearance in Settings. Dark is easier on the eyes at night.", go: ["settings", "#theme"], label: "Show me" },
  { keys: /contrast/, say: "High contrast is a switch in Settings, under Reading. It makes the words stand out more.", go: ["settings", "#contrastHigh"], label: "Show me" },
  { keys: /\b(looks?(?! up)|theme|colou?rs?|style)\b|(christmas|easter|fall) look/, say: "Pick a new look in Settings, under Buddy and look. Each one changes the colors and pictures, and you can switch back any time.", go: ["settings", "#lookCard"], label: "Show me" },
  { keys: /picture|graphics|drawings|kids'? (bible|pictures)/, say: "The Bible pictures follow your look. Settings, under Look, lets you choose full pictures or simple ones.", go: ["settings", "#lookGraphics"], label: "Show me" },
  { keys: /read (it )?(aloud|out loud)|listen|hear (it|the bible|the chapter)|audio/, say: "On any chapter, tap the ▶ Read aloud button near the top. The part being read lights up as it goes.", go: ["read", "#playBtn"], label: "Show me" },
  { keys: /reading speed|read (faster|slower)|voice|talks? too (fast|slow)/, say: "Reader voice and reading speed are in Settings, under Modes.", go: ["settings", "#voiceRate"], label: "Show me" },
  { keys: /version|translation|\bnasb\b|\bkjv\b|\bniv\b|\besv\b|\bnkjv\b|\bcsb\b/, say: "Tap the version button at the top of any chapter to switch. To change your everyday version, it's in Settings, under You.", go: ["settings", "#myVersion"], label: "Show me" },
  { keys: /passcode|lock (my )?journal|journal (lock|password|private)|keep (my )?journal private/, say: "You can lock your journal with a passcode in Settings, under Journal passcode. Notes are never locked.", go: ["settings", "#lockCard"], label: "Show me" },
  { keys: /journal|reflection|diary|prayer list/, say: "✎ Journal is for your own reflections and prayers. It's in the menu, and you can lock it.", go: ["journal", null], label: "Open my journal" },
  { keys: /verse card|callout|call out|quote a verse|paste a verse|copy (a |the )?(verse|scripture)/, say: "In your notes, paste a verse or tap Quote a verse, and it becomes a verse card. Then add your thoughts in a callout box if you like.", go: ["notes", null], label: "Open my notes" },
  { keys: /\bnotes?\b|research|comment on/, say: "📝 Notes are for study. Write them under any chapter, or open Notes to see them all.", go: ["notes", null], label: "Open my notes" },
  { keys: /photo|camera|add a picture|attach/, say: "In Notes or Journal, tap 📷 Photo under the writing box. It opens your photos or your camera.", go: ["notes", null], label: "Open my notes" },
  { keys: /game|bible spin|trivia|quiz|play/, say: "Games is where Bible Spin lives. Spin the wheel, answer questions, and collect all seven jewels!", go: "games", label: "Let's play" },
  { keys: /bible stud(y|ies)|reading plan|chronological|\bstudies\b|\bpath\b/, say: "Bible study has self-guided studies: through the Bible in time order, by theme, and more.", go: ["path", null], label: "Open Bible study" },
  { keys: /left off|leave off|where (was|am) i|keep reading|last (chapter|time)|my bible/, say: "Home's top card and My Bible both take you right back to where you left off.", go: ["books", "#myBibleGo"], label: "Take me there" },
  { keys: /word (meaning|means)|tap a word|hebrew|greek|original language|strong'?s/, say: "Tap any word in the Bible to see what it means, with the Hebrew or Greek behind it. You can turn that on or off in Settings.", go: ["settings", "#wordTap"], label: "Show me" },
  { keys: /study notes|commentary|history|maps?|cross.?ref/, say: "Scroll below any chapter for its study notes: history, maps, word studies, what scholars say, and cross-references.", go: ["read", null], label: "Go to my chapter" },
  { keys: /rename (you|buddy)|your name|call you|hide (you|buddy)|turn (you|buddy) off|quiet|too chatty|be quiet|move (you|buddy)/, say: "You can rename me, make me quieter, or hide me in Settings, under My study buddy. You can also drag me up or down the edge. I won't mind! 😊", go: ["settings", "#buddyCard"], label: "Show me" },
  { keys: /my name|change (my )?name|greet me/, say: "Your name is in Settings, under You. That's how I know what to call you.", go: ["settings", "#userName"], label: "Show me" },
  { keys: /back ?up|restore|save (a )?copy|new phone/, say: "Backup is in Settings, under This device and backup. Your notes and journal also save to your family sign-in.", go: ["settings", "#exportBtn"], label: "Show me" },
  { keys: /home screen|install|like an app|app icon/, say: "To keep it like an app, see Settings, under Put it on your home screen.", go: ["settings", "#installCard"], label: "Show me" },
  { keys: /password|sign (out|in)|log ?(out|in)|account/, say: "Your account and password are in Settings, under Account.", go: ["settings", "#accountCard"], label: "Show me" },
  { keys: /what'?s new|new things|updates?/, say: "What's new is at the top of Settings, with a short list of everything that changed.", go: ["settings", ".news-settings"], label: "Show me" },
  { keys: /tour|show me around/, say: "The tour is at the top of Settings, under New here? It's short, and you can stop any time.", go: ["settings", ".tour-card-settings"], label: "Show me" },
  { keys: /user guide|guide|instructions|manual|how (does|do) (this|the) app/, say: "The user guide is at the very top of Settings, and you can print it.", go: ["settings", "#guideCard"], label: "Show me" },
  { keys: /settings|options/, say: "Settings is the ⚙️ button in the menu. It's sorted into groups, with Help at the top.", go: ["settings", "#sg-help"], label: "Show me" },
];

// Only questions about the app itself (not "where is Bethlehem?").
const APP_Q = /\b(where|how (do|can|to|would)|can i|can you|could i|is there|i want to|i'd like to|help me|how come|turn (on|off)|change|make|find|show me|open|set up|use)\b/i;
const NOT_APP = /\b(bethlehem|jerusalem|egypt|israel|jesus|god|lord|moses|paul|david|abraham|heaven|sin|baptism|church|verse mean|bible say)\b/i;

export function guideAnswer(q) {
  const t = String(q || "").toLowerCase().trim();
  if (!t) return null;
  if (/^(help|what can you do|what can you help with|what do you do)\??$/.test(t)) {
    return { say: "I can answer Bible questions, play Bible Spin, and show you around. Try \"Where is text size?\" or \"How do I lock my journal?\"", go: null };
  }
  if (!APP_Q.test(t) || NOT_APP.test(t)) return null;
  const hit = APP_GUIDE.find((g) => g.keys.test(t));
  return hit ? { say: hit.say, go: hit.go, label: hit.label } : null;
}

// Christian seasons and holidays, by date. Easter is passed in (the app works it out).
export function seasonNow(now = new Date(), easter = null) {
  const y = now.getFullYear(), m = now.getMonth(), d = now.getDate(), day = 864e5;
  const at = (mm, dd) => new Date(y, mm, dd);
  const xmas = at(11, 25);
  const advent = new Date(+xmas - ((xmas.getDay() || 7) + 21) * day); // the fourth Sunday before Christmas
  const thanks = new Date(y, 10, 1); thanks.setDate(1 + ((11 - thanks.getDay()) % 7) + 21);
  const today = at(m, d);
  if (m === 11 && d === 25) return { key: "christmas", icon: "🎄", line: "Merry Christmas! Jesus is born! 🎄" };
  if (m === 11 && d === 24) return { key: "christmaseve", icon: "🕯️", line: "It's Christmas Eve! 🕯️" };
  if (m === 0 && d === 1) return { key: "newyear", icon: "🎉", line: "Happy New Year! 🎉 His mercies are new every morning." };
  if (m === 0 && d <= 6 || m === 11 && d > 25) return { key: "christmastide", icon: "⭐", line: "It's still Christmastime! ⭐" };
  if (easter) {
    const e = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate()), diff = Math.round((today - e) / day);
    if (diff === 0) return { key: "easter", icon: "🌷", line: "He is risen! Happy Easter! 🌷" };
    if (diff === -2) return { key: "goodfriday", icon: "✝️", line: "Today is Good Friday. ✝️" };
    if (diff === -7) return { key: "palmsunday", icon: "🌿", line: "Happy Palm Sunday! 🌿" };
    if (diff > -7 && diff < 0) return { key: "holyweek", icon: "✝️", line: "It's Holy Week. ✝️" };
    if (diff === 49) return { key: "pentecost", icon: "🔥", line: "Happy Pentecost! 🔥" };
  }
  if (+today === +thanks) return { key: "thanksgiving", icon: "🦃", line: "Happy Thanksgiving! 🦃 Give thanks to the Lord, for He is good." };
  if (today > new Date(+thanks - 6 * day) && today < thanks) return { key: "thanksweek", icon: "🍂", line: "It's Thanksgiving week! 🍂" };
  if (today >= advent && today < xmas) {
    const left = Math.round((xmas - today) / day);
    return { key: "advent", icon: "🕯️", line: `It's Advent! 🕯️ ${left} day${left === 1 ? "" : "s"} until Christmas.` };
  }
  return null;
}

const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

// "Welcome back! Last time you were in John 3." Once a day, on Home, never over the Bible.
// away: milliseconds since they last opened the app (0 if this is the first time).
// hello: "Good morning" or "Good evening" when it's that time of day (it stands in for his
// separate time-of-day hello, so he says one thing, not two).
export function welcomeLine({ name = "", place = "", study = "", away = 0, season = null, hello = "" } = {}) {
  const hi = hello ? `${hello}${name ? `, ${name}` : ""}! Welcome back.` : `Welcome back${name ? `, ${name}` : ""}!`;
  const days = Math.round(away / 864e5);
  const gap = days >= 14 ? " I missed you! 💛" : days >= 2 ? ` It's been ${plural(days, "day")}.` : "";
  const where = study && place ? ` You were in ${place}, in your ${study} study.` : place ? ` Last time you were in ${place}.` : "";
  const ask = place ? " Want to pick up there?" : "";
  return `${season ? `${season.line} ` : ""}${hi}${gap}${where}${ask}`.trim();
}

// "How long have I been studying?" in plain words.
export function sessionWords(ms) {
  const min = Math.round(ms / 60e3);
  if (min < 1) return "less than a minute";
  if (min < 60) return plural(min, "minute");
  const h = Math.floor(min / 60), r = min % 60;
  return `${plural(h, "hour")}${r ? ` and ${plural(r, "minute")}` : ""}`;
}

// A gentle nudge after a long stretch: at 30 minutes, then every hour after. Never more.
export function sessionNudge(ms, said = []) {
  const min = ms / 60e3;
  const mark = min >= 90 ? 90 : min >= 30 ? 30 : 0;
  if (!mark || said.includes(mark)) return null;
  return { mark, line: mark === 30
    ? `We've been studying for ${sessionWords(ms)}! 🌟 Great job. Maybe stretch, or get a drink of water?`
    : `Wow, ${sessionWords(ms)} in God's Word today! 💛 Don't forget to rest your eyes.` };
}

// Quick answers about time: "what day is it?", "how long have I been studying?"
export function timeAnswer(q, { now = new Date(), sessionMs = 0, season = null } = {}) {
  const t = String(q || "").toLowerCase();
  if (/how long (have|has) (i|we) been|how long (am|was) i|how much time/.test(t)) return `We've been studying together for ${sessionWords(sessionMs)} this time. 😊`;
  if (/what('?s| is) (the )?(date|day)|what day is (it|today)|today'?s date/.test(t)) {
    const s = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    return `Today is ${s}.${season ? ` ${season.line}` : ""}`;
  }
  if (/what season|is it advent|how (long|many days) (until|till|to) christmas|days (until|till) christmas/.test(t)) {
    const xmas = new Date(now.getFullYear(), 11, 25), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const left = Math.round((xmas - today) / 864e5);
    const xm = left > 0 ? ` ${plural(left, "day")} until Christmas!` : "";
    return season ? `${season.line}${season.key === "advent" ? "" : xm}` : `It's an ordinary week, and every day is a good day for God's Word.${xm}`;
  }
  return null;
}
