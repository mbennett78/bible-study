// The user guide: shown at the top of Settings and printed as a booklet. One place for the
// words, so the screen and the paper always say the same thing. Plain words, short steps.
export const GUIDE = [
  { id: "start", icon: "👋", title: "Getting started", tips: [
    "Open bible.breakoutroom.net in Safari on an iPhone or iPad, or any browser on a computer.",
    "Sign in with the email and starter password from the person who gave you the app, then choose your own password.",
    "To keep it like an app: tap the Share button, then Add to Home Screen.",
    "You never need to type a Bible key. Your family sign-in brings them to every device.",
  ] },
  { id: "around", icon: "🧭", title: "Getting around", tips: [
    "The buttons along the bottom (or the side, on an iPad or computer) go anywhere: Home, Read, My Bible, Journal, Bible study, Notes, Games and Settings.",
    "Home's top card takes you back to where you left off.",
    "Tap ❓ at the top of any screen for help with that screen, or take the tour.",
  ] },
  { id: "read", icon: "📖", title: "Reading the Bible", tips: [
    "Tap the book name at the top to pick a book, chapter and verse. The ‹ › arrows go to the last or next chapter.",
    "The version button at the top switches Bible versions.",
    "Tap any word for its meaning, with the Hebrew or Greek behind it.",
    "Scroll below the chapter for study notes: history, maps, word studies, what scholars say, and cross-references.",
    "Tap Read aloud to hear the chapter. The part being read is highlighted.",
  ] },
  { id: "buddy", icon: "🙂", title: "Your study buddy", tips: [
    "Tap the little stick-figure friend to ask any Bible question.",
    "Ask him simple things too, like \"jump rope,\" \"dance\" or \"do a cartwheel.\"",
    "In the way? Drag him up or down either edge. In Settings, under My study buddy, you can rename him, make him quieter, or hide him.",
    "He tries hard to be accurate but can make mistakes. Check what he says against the Bible.",
  ] },
  { id: "journal", icon: "✍️", title: "Journal and notes", tips: [
    "✎ Journal is for personal reflections: your days, prayers and things you're thankful for. It's in the side menu, and you can lock it with a passcode.",
    "📝 Notes are for study: comments, research and verses on a passage. Write them under any chapter, in My notes, or in Notes in the menu. Notes are never locked.",
    "Quote a verse, or paste one, and it becomes a verse card. Add your comment in an optional callout box: Classic, Parchment, Sticky note, Bubble or Floral.",
    "Add verses, pictures, arrows, shaded boxes, maps, charts and tables with the buttons under the writing box.",
    "📷 Photo opens your photo library or camera. You can also paste a picture or words from another app.",
    "Your words save as you type, even without a signal.",
    "Print your journal or notes as a little book, or send a copy to Google Docs.",
    "Want privacy? Set a journal passcode in Settings.",
  ] },
  { id: "study", icon: "🗺️", title: "Bible studies and games", tips: [
    "My Bible reads straight through, Genesis to Revelation. Three other studies go through the Bible a different way.",
    "Each study keeps its own place, so you can switch any time.",
    "✅ Quick check: after you read a chapter, a few questions on it, right under the chapter.",
    "🎲 Games: Bible Spin and the other games are behind the Games button. Your scores are only yours.",
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
    "Bigger words, bigger buttons and high contrast are under Reading and Bible in Settings.",
  ] },
];

// The guide as plain HTML for printing or sending as a document.
export function guideHtml(esc) {
  return `<h1>Family Bible Study: User Guide</h1>
${GUIDE.map((g) => `<h2>${g.icon} ${esc(g.title)}</h2><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`).join("\n")}
<p>Still stuck? Ask the person who gave you the app, or ask your study buddy.</p>`;
}
