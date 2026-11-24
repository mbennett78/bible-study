// Four journeys through the whole Bible. Each one covers all 66 books and
// all 1,189 chapters exactly once, in its own order. `checkPaths()` proves it.
// Reading strings: "GEN" (whole book) or "GEN 1-11" / "PSA 90" (chapter range).
import { BOOKS, BOOK_BY_ID, TOTAL_CHAPTERS } from "./books.js";

export const PATHS = [
  {
    id: "chronological",
    name: "Chronological Study",
    short: "Chronological",
    blurb: "Read the story in the order it happened, with prophets and psalms placed beside the events they speak to.",
    note: "Dates for some books (Job, Joel, Obadiah, parts of Isaiah) are debated. Placement follows widely used chronological reading plans.",
    stages: [
      { title: "Beginnings", about: "Creation, the flood, and the patriarchs. Job is set in the patriarchal era.", readings: ["GEN 1-11", "JOB", "GEN 12-50"] },
      { title: "Rescue and the Law", about: "Israel leaves Egypt, meets God at Sinai, and wanders in the wilderness.", readings: ["EXO", "LEV", "NUM", "DEU", "PSA 90"] },
      { title: "Into the land", about: "Conquest, the judges, and Ruth's faithful love.", readings: ["JOS", "JDG", "RUT"] },
      { title: "Saul and David", about: "Israel asks for a king. David's life and many of his psalms.", readings: ["1SA", "2SA", "1CH", "PSA 1-41", "PSA 51-72"] },
      { title: "Solomon and the songs of worship", about: "The temple, wisdom writing, and the psalms of Israel's worship leaders.", readings: ["1KI 1-11", "2CH 1-9", "PRO", "ECC", "SNG", "PSA 42-50", "PSA 73-89"] },
      { title: "A divided kingdom", about: "Israel splits in two. Prophets warn the northern kingdom before it falls to Assyria.", readings: ["1KI 12-22", "2KI 1-17", "2CH 10-28", "JOL", "JON", "AMO", "HOS", "MIC", "ISA 1-39"] },
      { title: "Judah's last kings", about: "Judah stands alone, reforms, and then falls to Babylon.", readings: ["2KI 18-25", "2CH 29-36", "NAM", "ZEP", "HAB", "JER", "LAM", "OBA"] },
      { title: "Exile", about: "Hope and faithfulness far from home.", readings: ["ISA 40-66", "EZK", "DAN"] },
      { title: "Return and rebuilding", about: "The exiles come home, rebuild the temple and walls, and wait for God's promises.", readings: ["EZR 1-6", "HAG", "ZEC", "EST", "EZR 7-10", "NEH", "MAL", "PSA 91-150"] },
      { title: "The life of Jesus", about: "Four witnesses to Jesus' life, death and resurrection.", readings: ["MAT", "MRK", "LUK", "JHN"] },
      { title: "The church begins", about: "The Spirit comes, the church grows, and Paul's first letters are written along the way.", readings: ["ACT 1-12", "JAS", "ACT 13-14", "GAL", "ACT 15-18", "1TH", "2TH", "ACT 19", "1CO", "2CO", "ROM", "ACT 20-28"] },
      { title: "Letters from prison and the last letters", about: "Paul, Peter, John and Jude write to strengthen churches facing pressure.", readings: ["EPH", "PHP", "COL", "PHM", "1TI", "TIT", "1PE", "2TI", "HEB", "2PE", "JUD", "1JN", "2JN", "3JN"] },
      { title: "The end of the story", about: "John's vision of Jesus' victory and the new heaven and new earth.", readings: ["REV"] },
    ],
  },
  {
    id: "audience",
    name: "Study by Audience/Type",
    short: "Audience",
    blurb: "Read the books grouped by who they were first written to, so you hear them the way the first readers did.",
    note: "Some audiences are debated (Hebrews, James and 1 Peter) and one is unknown (Job). Tap \"Who it was written to\" beside those books to read why, with sources.",
    stages: [
      { title: "A people being formed", about: "Written for Israel as it became a nation under Moses.", readings: ["GEN", "EXO", "LEV", "NUM", "DEU"] },
      { title: "Israel in the land", about: "Israel's history, told to help the nation remember who God is.", readings: ["JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI"] },
      { title: "Worshipers and the wise", about: "Songs, prayers and wisdom for God's people in everyday life.", readings: ["PSA", "PRO", "ECC", "SNG", "JOB"] },
      { title: "The northern kingdom", about: "Prophets calling Israel in the north back to God.", readings: ["AMO", "HOS"] },
      { title: "Judah before the exile", about: "Warnings and promises to Jerusalem and Judah.", readings: ["ISA", "MIC", "JOL", "ZEP", "HAB", "JER", "LAM"] },
      { title: "Other nations", about: "Messages God sent to or about Israel's neighbors.", readings: ["JON", "NAM", "OBA"] },
      { title: "Exiles far from home", about: "Written for God's people living in Babylon and Persia.", readings: ["EZK", "DAN", "EST"] },
      { title: "The community that came home", about: "Written for the returned exiles rebuilding Jerusalem.", readings: ["EZR", "NEH", "HAG", "ZEC", "MAL", "1CH", "2CH"] },
      { title: "Jewish believers", about: "Gospel and letters shaped for readers who knew the Scriptures and the Law.", readings: ["MAT", "HEB", "JAS"] },
      { title: "Gentile and Roman readers", about: "The good news explained for people outside Judaism.", readings: ["MRK", "LUK", "ACT"] },
      { title: "Anyone who would believe", about: "Written so that readers may believe Jesus is the Christ (John 20:31).", readings: ["JHN"] },
      { title: "Churches in the cities", about: "Paul's letters to congregations across the Roman world.", readings: ["ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH"] },
      { title: "Leaders and friends", about: "Personal letters to church leaders and individuals.", readings: ["1TI", "2TI", "TIT", "PHM", "2JN", "3JN"] },
      { title: "Believers under pressure", about: "Scattered and suffering churches, warned and encouraged to hold on.", readings: ["1PE", "2PE", "JUD", "1JN", "REV"] },
    ],
  },
  {
    id: "themes",
    name: "Study by Theme",
    short: "Themes",
    blurb: "Follow the big themes of the Bible, pairing Old and New Testament books that speak to each other.",
    note: "Every book belongs to many themes. Each one is placed where its theme is strongest, so the whole Bible is still covered once.",
    stages: [
      { title: "Creation and new creation", about: "God makes the world and makes all things new in the Word made flesh.", readings: ["GEN", "JHN"] },
      { title: "Rescue and freedom", about: "God frees slaves, from Egypt to the freedom we have in Christ.", readings: ["EXO", "GAL", "ROM"] },
      { title: "Holiness and worship", about: "How a holy God makes a way for people to come near.", readings: ["LEV", "HEB", "PSA 1-41"] },
      { title: "Trusting God in the wilderness", about: "Faith that is tested while we wait.", readings: ["NUM", "DEU", "JAS"] },
      { title: "Faithful love", about: "God's covenant love, and our love for him and for others.", readings: ["RUT", "HOS", "SNG", "1JN", "2JN", "3JN"] },
      { title: "Kingdom and the King", about: "Israel's kings, and the King who was promised.", readings: ["JOS", "JDG", "1SA", "2SA", "1CH", "PSA 42-72", "MAT"] },
      { title: "Wisdom for everyday life", about: "Living wisely, patiently and well.", readings: ["PRO", "ECC", "COL", "PHP"] },
      { title: "Suffering, prayer and hope", about: "Honest questions when life is hard and prayers seem unanswered.", readings: ["JOB", "LAM", "HAB", "PSA 73-89", "1PE", "2CO"] },
      { title: "Justice and mercy", about: "God's heart for the poor, the outsider and the enemy.", readings: ["AMO", "MIC", "JON", "OBA", "NAM", "JOL", "LUK"] },
      { title: "Warning and turning back", about: "The rise and fall of kings, and the prophets who called them home.", readings: ["1KI", "2KI", "2CH", "ZEP", "ISA 1-39", "JER"] },
      { title: "Exile, comfort and return", about: "God comforts his people and brings them home.", readings: ["ISA 40-66", "EZK", "EZR", "NEH", "EST", "HAG", "ZEC", "MAL"] },
      { title: "The church and the Spirit", about: "The Spirit gives birth to the church and gifts it to serve.", readings: ["ACT", "MRK", "1CO", "EPH"] },
      { title: "Leading and serving", about: "Caring for God's people as shepherds and friends.", readings: ["1TI", "2TI", "TIT", "PHM"] },
      { title: "Heaven, angels and the hope ahead", about: "God's throne room, the unseen world, and the promise of what is to come.", readings: ["DAN", "1TH", "2TH", "2PE", "JUD", "PSA 90-150", "REV"] },
    ],
  },
  {
    id: "general",
    name: "My Bible",
    short: "My Bible",
    blurb: "Your Bible, straight through in the order it's printed, Genesis to Revelation, one section at a time.",
    note: "This is the order of the 66 books in Protestant Bibles. Catholic and Orthodox Bibles include a few more books, which aren't part of this plan.",
    stages: [
      { title: "The Law", about: "The five books of Moses: creation, the patriarchs, the exodus and the covenant at Sinai.", readings: ["GEN", "EXO", "LEV", "NUM", "DEU"] },
      { title: "History", about: "Israel in the land, the kings, the exile and the return.", readings: ["JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST"] },
      { title: "Poetry and Wisdom", about: "Job, the Psalms, Proverbs, Ecclesiastes and the Song of Songs.", readings: ["JOB", "PSA", "PRO", "ECC", "SNG"] },
      { title: "Major Prophets", about: "The longer prophetic books: Isaiah, Jeremiah, Lamentations, Ezekiel and Daniel.", readings: ["ISA", "JER", "LAM", "EZK", "DAN"] },
      { title: "Minor Prophets", about: "Twelve shorter prophets, from Hosea to Malachi.", readings: ["HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL"] },
      { title: "The Gospels", about: "The life, death and resurrection of Jesus.", readings: ["MAT", "MRK", "LUK", "JHN"] },
      { title: "The early church", about: "The Holy Spirit comes and the good news spreads.", readings: ["ACT"] },
      { title: "Paul's letters", about: "Letters to churches and to Timothy, Titus and Philemon.", readings: ["ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM"] },
      { title: "General letters", about: "Hebrews and the letters of James, Peter, John and Jude.", readings: ["HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD"] },
      { title: "Revelation", about: "The vision of Christ's victory and all things made new.", readings: ["REV"] },
    ],
  },
];

// Books whose first readers are debated or unknown: what scholars say, and why. Shown on the
// Audience path and in the book's introduction. Sources are standard commentaries.
const CM = "D. A. Carson and Douglas J. Moo, An Introduction to the New Testament, 2nd ed. (Zondervan, 2005)";
export const AUDIENCE_NOTES = {
  HEB: { status: "debated", text: "The letter never names its readers. Most scholars think they were Jewish Christians, because it leans so heavily on the priests, sacrifices and tabernacle of the Old Testament and warns them not to drift back (Hebrews 2:1; 10:32-39). Some think the church included Gentiles too. Where they lived is also debated: \"those from Italy send greetings\" (13:24) leads many to suggest Rome; others suggest Jerusalem.",
    src: ["F. F. Bruce, The Epistle to the Hebrews, NICNT, rev. ed. (Eerdmans, 1990)", "William L. Lane, Hebrews 1-8, Word Biblical Commentary 47A (Word, 1991)", CM] },
  JAS: { status: "debated", text: "James writes \"to the twelve tribes who are dispersed abroad\" (1:1). Many scholars take this literally: Jewish Christians scattered outside Israel, perhaps after the persecution in Acts 8:1 and 11:19. Others read \"twelve tribes\" as a picture of the whole church, God's new Israel, scattered through the world (compare 1 Peter 1:1).",
    src: ["Douglas J. Moo, The Letter of James, Pillar New Testament Commentary (Eerdmans, 2000)", "Peter H. Davids, The Epistle of James, NIGTC (Eerdmans, 1982)", CM] },
  "1PE": { status: "debated", text: "Peter writes to \"those who reside as aliens, scattered\" in five provinces of what is now Turkey (1:1). Some early writers, and some scholars today, think they were Jewish Christians. Most modern commentators think they were mainly Gentiles, because Peter speaks of their \"former lusts\" in ignorance, the \"futile way of life inherited from your forefathers\" and \"once you were not a people\" (1:14, 18; 2:10; 4:3). Many think the churches were mixed.",
    src: ["Karen H. Jobes, 1 Peter, Baker Exegetical Commentary (Baker, 2005)", "Peter H. Davids, The First Epistle of Peter, NICNT (Eerdmans, 1990)", CM] },
  JOB: { status: "unknown", text: "The author, the date of writing and the first readers are all unknown. The story is set in the time of the patriarchs, in the land of Uz, outside Israel, and Job himself is not an Israelite. Because it was kept among Israel's Scriptures and wisdom writings, it is usually read as written for God's people, and for anyone who suffers.",
    src: ["John E. Hartley, The Book of Job, NICOT (Eerdmans, 1988)", "Tremper Longman III and Raymond B. Dillard, An Introduction to the Old Testament, 2nd ed. (Zondervan, 2006)"] },
};

export const PATH_ORDER = ["general", "chronological", "themes", "audience"]; // My Bible (id "general") first, then the three self-guided studies
export const PATH_BY_ID = Object.fromEntries(PATHS.map((p) => [p.id, p]));

// "PSA 42-72" -> [{book:"PSA", chapter:42}, ...]
export function expandReading(r) {
  const [id, range] = r.split(" ");
  const book = BOOK_BY_ID[id];
  if (!book) throw new Error(`Unknown book ${id}`);
  let [from, to] = range ? range.split("-").map(Number) : [1, book.chapters];
  if (to === undefined) to = from;
  return Array.from({ length: to - from + 1 }, (_, i) => ({ book: id, chapter: from + i }));
}

export function readingLabel(r) {
  const [id, range] = r.split(" ");
  return range ? `${BOOK_BY_ID[id].name} ${range.replace("-", "–")}` : BOOK_BY_ID[id].name;
}

const cache = new Map();
// Flat, ordered list of every chapter in a path, each tagged with its stage.
export function pathChapters(pathId) {
  if (cache.has(pathId)) return cache.get(pathId);
  const list = PATH_BY_ID[pathId].stages.flatMap((s, stage) => s.readings.flatMap((r) => expandReading(r).map((c) => ({ ...c, stage }))));
  cache.set(pathId, list);
  return list;
}

// Every chapter exactly once, in every path.
export function checkPaths() {
  const problems = [];
  for (const p of PATHS) {
    const seen = new Map();
    for (const c of pathChapters(p.id)) {
      const k = `${c.book}.${c.chapter}`;
      seen.set(k, (seen.get(k) || 0) + 1);
    }
    for (const b of BOOKS) for (let ch = 1; ch <= b.chapters; ch++) {
      const n = seen.get(`${b.id}.${ch}`) || 0;
      if (n !== 1) problems.push(`${p.name}: ${b.name} ${ch} appears ${n} times`);
    }
    if (pathChapters(p.id).length !== TOTAL_CHAPTERS) problems.push(`${p.name}: ${pathChapters(p.id).length} chapters`);
  }
  return problems;
}
