// The user guide: shown at the top of Settings and printed as a booklet. One place for the
// words, so the screen and the paper always say the same thing. Plain words, short steps.
// The family's web address, in one place. A family running its own copy puts theirs here
// (docs/SETUP.md, step 2); the printed gift packet uses it too.
export const SITE = "bible.breakoutroom.net";

export const GUIDE = [
  { id: "start", icon: "👋", title: "Getting started", tips: [
    `Open ${SITE || "your family's Bible Study web address"} in Safari on an iPhone or iPad, or any browser on a computer.`,
    "Sign in with the email and starter password from the person who gave you the app, then choose your own password.",
    "To keep it like an app: tap the Share button, then Add to Home Screen.",
    "You never need to type a Bible key. Your family sign-in brings them to every device.",
  ] },
  { id: "around", icon: "🧭", title: "Getting around", tips: [
    "The buttons along the bottom go to Home, Read, My Bible, Journal, Bible study and Settings. Tap ☰ at the top left for the side menu, with My notes, Journal and Games. On an iPad or computer, Notes and Games are down the side too.",
    "Home's top card takes you back to where you left off.",
    "Tap ❓ at the top of any screen for help with that screen, or take the tour.",
  ] },
  { id: "read", icon: "📖", title: "Reading the Bible", tips: [
    "Tap the book name at the top to pick a book, chapter and verse. The ‹ › arrows go to the last or next chapter.",
    "The version button at the top switches Bible versions.",
    "Tap any word for its meaning, with the Hebrew or Greek behind it.",
    "Four buttons sit above the Bible text: 📜 Setting the stage (who wrote the book, when, for whom, and what happens in this chapter), 🏛️ Background (the history and culture behind it), 🔗 Cross-references (other passages on the same subject) and 🧭 When and where (the time, the world around it, and a map with Bible-times and today's names). Each opens in its own window: tap ✕ or \"Close and go back\" to return to your place.",
    "Want to look at another passage without losing your place? Tap ↪ Jump to another passage. Your place stays in a tab at the top; tap it to go back, or ✕ to close it. Cross-references and Find a verse open beside your place the same way.",
    "Where is the deeper research? The history and archaeology are in 🏛️ Background. Below the Bible text are 📖 Verse by verse (a plain explanation of the key verses, drawn from the commentaries listed under Sources), ✍️ Key words (word studies in the Hebrew or Greek), 🎓 Scholars and views (where careful scholars read a passage differently, each view named and explained fairly), and א Strong's concordance (every original word in the chapter). 📚 Sources lists the books behind all of it, with links.",
    "Tap 🔍 at the top of any screen to find a verse by what it's about or the words you remember.",
    "Tap Read aloud to hear the chapter. The part being read is highlighted. Tap More beside it for the volume, speed, a sleep timer, Repeat, and Read to me (keeps reading chapter after chapter).",
    "Tap a verse number for more: highlight it, add it to your notes, Compare versions to see it in every version your family has, or Share it as words or a verse picture.",
    "To learn a verse by heart, tap its number and choose Learn by heart. Four steps take you from reading it to saying it with every word hidden.",
  ] },
  { id: "buddy", icon: "🙂", title: "Your study buddy", tips: [
    "Tap the little stick-figure friend and ask him anything. Bible questions are his favorite, but he fully answers any question, like homework, a recipe or how to use your phone, and always keeps it family-friendly.",
    "Ask him simple things too, like \"jump rope,\" \"dance\" or \"do a cartwheel.\"",
    "Ask him where things are, like \"Where is text size?\" or \"How do I lock my journal?\" He answers right away, even with no signal, and can show you the spot.",
    "He remembers where you left off and your study, knows the season (like Advent), and after a long study time he may suggest a stretch.",
    "Teach him things, like \"My favorite verse is John 3:16\" or \"Remember that I love horses.\" Ask \"What do you remember about me?\" any time, or say \"forget that.\" Only you can see what you teach him.",
    "In scary stories (like the lions' den) he gets a little scared. Ask \"Are you okay?\" and he feels better. The more time you spend with him, the more story props he finds, like Zacchaeus' tree.",
    "In the way? Drag him up or down either edge. In Settings, under Buddy and Bible Appearance, you can rename him, make him quieter, or hide him.",
    "He tries hard to be accurate but can make mistakes. Check what he says against the Bible.",
  ] },
  { id: "journal", icon: "✍️", title: "Journal and notes", tips: [
    "✎ Journal is for personal reflections: your days, prayers and things you're thankful for. It's in the side menu, and you can lock it with a passcode.",
    "📝 Notes are for study: comments, research and verses on a passage. Write them under any chapter, in My notes, or in Notes in the menu. Notes are never locked.",
    "Quote a verse, or paste one, and it becomes a verse card. Add your comment in an optional callout box: Classic, Parchment, Sticky note, Bubble or Floral.",
    "Add verses, pictures, arrows, shaded boxes, maps, charts and tables with the buttons under the writing box.",
    "📷 Photo opens your photo library or camera. You can also paste a picture or words from another app.",
    "Not sure what to write? Tap 💭 Need an idea? for a gentle prompt. On a date you wrote something in an earlier year, \"On this day\" shows it at the top.",
    "Tap 📋 Use a guide for SOAP (Scripture, Observation, Application, Prayer) or ACTS prayer headings to write under. 🔍 Search my journal finds any old entry.",
    "Your words save as you type, even without a signal.",
    "Print your journal or notes as a little book, or send a copy to Google Docs.",
    "Want privacy? Set a journal passcode in Settings.",
  ] },
  { id: "study", icon: "🗺️", title: "Bible studies and games", tips: [
    "My Bible reads straight through, Genesis to Revelation. Three other studies go through the Bible a different way.",
    "Each study keeps its own place, so you can switch any time.",
    "✅ Quick check: after you read a chapter, a few questions on it, right under the chapter.",
    "🎲 Games: Bible Spin and the other games are behind the Games button. Bible Spin plays like a game show, with a lamp to fill, jewels to win and a bonus round. Open the daily treasure chest, try the three daily missions, and level up from Seeker to Wise elder. Your scores are only yours.",
    "⚔️ Family duel in Bible Spin: challenge someone in the family to the same 10 questions on their own phone or iPad. Only your first name is shown, and only the two of you see the scores.",
  ] },
  { id: "offline", icon: "📶", title: "No signal?", tips: [
    "Chapters you opened recently, plus the next two ahead, are saved for reading offline.",
    "Notes, journal entries, highlights and your place save on your device right away.",
    "When the signal comes back, everything syncs by itself, so your other devices catch up.",
    "Buddy's answers and chapters you haven't opened need a signal.",
  ] },
  { id: "devices", icon: "📱", title: "Phones, iPads and permissions", tips: [
    "Sign in on any device and your reading, journal and notes follow you.",
    "The first time you tap a microphone button, your device asks to use the microphone. Tap Allow. It asks only once.",
    "Reading aloud and Buddy's voice need no permission. The app never asks for your location, contacts, camera or notifications.",
    "Settings opens with this guide at the top. Everything else sits in groups below it.",
    "Bigger words, bigger buttons and high contrast are under Reading and listening in Settings. On an iPad, Page width there makes the lines narrower or wider. Pick a look under Buddy and Bible Appearance. The For kids look has storybook pictures that gently move, and they hold still if you choose Still pictures or your device has motion turned down.",
    "There is nothing to buy, ever. The app never sells anything.",
  ] },
];

// The quick guide (B-99): the few things the family needs, for those who sign in with the family
// account (no keys, no setup). Short, plain and in the order people meet things.
export const QUICK_GUIDE = [
  { icon: "🔑", title: "Getting in", tips: [
    `On your iPhone or iPad, open Safari and go to ${SITE || "your family's Bible Study web address"}.`,
    "Sign in with your email and the starter password you were given. Then pick your own password.",
    "Keep it like an app: tap the Share button (the square with an arrow), then Add to Home Screen.",
  ] },
  { icon: "📖", title: "Reading", tips: [
    "Tap Read at the bottom. To pick a book and chapter, tap the name at the top (like Genesis 12). The arrows beside it go to the next or last chapter.",
    "The app always remembers your place. Close it any time; it opens right where you left off.",
    "Bible only shows just the words. Study Bible adds four buttons above the passage: Setting the stage, Background, Cross-references, and When and where (with maps).",
    "Jump to another passage opens a second passage in a tab, so your place stays one tap away.",
    "▶ Read aloud reads the chapter to you. More ▾ has the speed and a sleep timer.",
    "🔍 at the top finds a verse: type a few words you remember, or a reference like John 3:16.",
  ] },
  { icon: "📝", title: "Notes and journal", tips: [
    "For notes, tap ☰ at the top left, then 📝 My notes, then ＋ My Notes (or Bible Class or Church Notes). Journal at the bottom is for your day, prayers and thanks.",
    "The bar at the top of the writing box has B (bold), I, U, 🖍 highlight, H (heading) and lists. ＋ Add puts in pictures, boxes and drawings where your cursor is.",
    "Tap 💾 Save when you're done. ⌨︎ Done puts the keyboard away.",
    "On iPad, if the keyboard shrinks to a small floating one, spread two fingers on it to make it full size again.",
    "Your notes are listed by date, by Bible study or by passage. Tap one to read, change or delete it. A 📝 shows on any passage you've written about.",
    "🖨 Print, PDF or Google Docs prints a note, or sends it. You can choose color or black and white, and look at it first.",
  ] },
  { icon: "🙂", title: "Your study buddy", tips: [
    "The little stick figure is your study buddy. Tap him to ask any Bible question in your own words.",
    "If he's too chatty, quiet him or turn him off in Settings, under Buddy and decorations.",
  ] },
  { icon: "🎲", title: "Games", tips: [
    "Bible Spin is on Home and in the ☰ menu. Play alone, with family on one device, or against your buddy.",
    "Not sure how? Tap ❓ How to play on the Bible Spin screen.",
  ] },
  { icon: "⚙️", title: "Make it yours", tips: [
    "Settings, Bible Appearance: pick a look (Classic, Mountains, Purple Flowers and more).",
    "Settings, Reading and listening: bigger words, bigger buttons and high contrast.",
  ] },
  { icon: "❓", title: "When you're stuck", tips: [
    "Tap ❓ at the top of any screen for tips about that screen.",
    "Every popup has an ✕ or Close. Nothing you do loses your place.",
    "Still stuck? Ask your buddy, or call the person who gave you the app.",
  ] },
];
export function quickGuideHtml(esc) {
  return `<h1>Family Bible Study: Quick Guide</h1>
${QUICK_GUIDE.map((g) => `<h2>${g.icon} ${esc(g.title)}</h2><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`).join("\n")}`;
}

// The guide as plain HTML for printing or sending as a document.
export function guideHtml(esc) {
  return `<h1>Family Bible Study: User Guide</h1>
${GUIDE.map((g) => `<h2>${g.icon} ${esc(g.title)}</h2><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`).join("\n")}
<p>Still stuck? Ask the person who gave you the app, or ask your study buddy.</p>`;
}
