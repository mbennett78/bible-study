// When and where: the time period of each book, the world around it, the regions of the
// Bible lands, and the twelve tribes. Dates are approximate. Where careful scholars date
// something differently, both dates are given and it is marked as debated.

// [first chapter, last chapter (0 = to the end), period, dates, debated?, the world around it]
const ERA = {
  primeval: ["Before Abraham", "Before recorded history", false, "Genesis 1-11 tells of the world's beginnings. It gives no dates, and the Bible's genealogies were not written as a timeline."],
  patriarchs: ["The patriarchs: Abraham, Isaac, Jacob and Joseph", "About 2100-1800 BC", true, "Egypt's Middle Kingdom and the city-states of Mesopotamia. Ur, Haran and Egypt in these chapters were all real, well-known places of the time."],
  exodus: ["The exodus and the wilderness", "About 1446 BC or about 1260 BC", true, "Egypt's New Kingdom, the age of the great pharaohs. Some scholars date the exodus to the 1400s BC (1 Kings 6:1), others to the 1200s BC (the city of Rameses, Exodus 1:11)."],
  conquest: ["Israel enters Canaan", "About 1400 BC or about 1220 BC", true, "Canaan was a land of small walled city-states under Egypt's loose control. The two dates follow the two dates for the exodus."],
  judges: ["The judges", "About 1375-1050 BC (or 1200-1050 BC)", true, "No great empire ruled Canaan. The Philistines settled on the coast about 1175 BC and became Israel's main enemy."],
  united: ["The united kingdom: Saul, David and Solomon", "About 1050-930 BC", false, "Egypt and Assyria were both weak for a time, which left room for a strong kingdom in Israel. The Tel Dan stone (800s BC) names \"the house of David.\""],
  divided: ["The divided kingdom: Israel in the north, Judah in the south", "930-722 BC", false, "Assyria grew into an empire. Its records name kings of Israel and Judah, among them Ahab, Jehu and Hezekiah. Samaria fell to Assyria in 722 BC."],
  judah: ["Judah alone, until the exile", "722-586 BC", false, "Assyria, then Babylon. Babylon destroyed Jerusalem and the temple in 586 BC and took many of its people to Babylon."],
  exile: ["The exile in Babylon", "605-538 BC", false, "Babylon under Nebuchadnezzar, then Persia: Cyrus took Babylon in 539 BC and let the exiles go home."],
  return: ["The return from exile", "538-430 BC", false, "The Persian Empire ruled from India to Egypt. Its kings Cyrus, Darius, Xerxes (Ahasuerus) and Artaxerxes all appear in the Bible."],
  monarchyPoems: ["Israel's kings and wise men", "About 1000-500 BC", true, "Most psalms come from David's time to after the exile. Proverbs gathers sayings from Solomon's day to Hezekiah's (about 700 BC)."],
  jesus: ["The life of Jesus", "About 6/4 BC to AD 30/33", false, "The Roman Empire under Augustus and Tiberius. Herod the Great, then his sons, ruled the Jewish lands for Rome; Pontius Pilate governed Judea AD 26-36."],
  church: ["The first churches", "About AD 30-62", false, "The Roman Empire at peace (the Pax Romana), with roads and sea lanes that carried the gospel. Emperors Tiberius, Caligula, Claudius and Nero."],
  letters: ["The letters to the churches", "", false, "The Roman Empire under Claudius and Nero, then the Flavian emperors. Jerusalem's temple was destroyed by Rome in AD 70."],
};
// For each book: [era, date of the book or its setting, debated?] or a list of chapter ranges.
const BOOK_ERA = {
  GEN: [[1, 11, "primeval"], [12, 0, "patriarchs"]], EXO: "exodus", LEV: "exodus", NUM: "exodus", DEU: "exodus",
  JOS: "conquest", JDG: "judges", RUT: "judges", "1SA": "united", "2SA": "united", "1KI": [[1, 11, "united"], [12, 0, "divided"]],
  "2KI": [[1, 17, "divided"], [18, 0, "judah"]], "1CH": "united", "2CH": [[1, 9, "united"], [10, 0, "divided"]], EZR: "return", NEH: "return", EST: "return",
  JOB: "patriarchs", PSA: "monarchyPoems", PRO: "monarchyPoems", ECC: "united", SNG: "united",
  ISA: "divided", JER: "judah", LAM: "exile", EZK: "exile", DAN: "exile", HOS: "divided", JOL: "judah", AMO: "divided", OBA: "exile", JON: "divided",
  MIC: "divided", NAM: "judah", HAB: "judah", ZEP: "judah", HAG: "return", ZEC: "return", MAL: "return",
  MAT: "jesus", MRK: "jesus", LUK: "jesus", JHN: "jesus", ACT: "church",
};
// When each book was written or set, where a book-level date helps. [dates, debated?]
const BOOK_DATE = {
  JOB: ["Set in the time of the patriarchs; written at an unknown date", true], ECC: ["Traditionally Solomon, about 950 BC; some scholars date it after the exile", true],
  SNG: ["Traditionally Solomon, about 950 BC", true], ISA: ["Isaiah's ministry, about 740-680 BC", false], JER: ["Jeremiah's ministry, 627-about 580 BC", false],
  LAM: ["Soon after Jerusalem fell in 586 BC", false], EZK: ["593-571 BC, among the exiles in Babylon", false], DAN: ["Set 605-530 BC in Babylon and Persia; the date of writing is debated", true],
  HOS: ["About 755-715 BC, in the northern kingdom", false], JOL: ["Unknown; suggestions range from the 800s to the 400s BC", true], AMO: ["About 760 BC", false],
  OBA: ["Probably soon after 586 BC", true], JON: ["Set about 780 BC, in the days of Jeroboam II (2 Kings 14:25)", false], MIC: ["About 740-700 BC", false],
  NAM: ["Between 663 and 612 BC, before Nineveh fell", false], HAB: ["About 609-598 BC", false], ZEP: ["About 630 BC, under King Josiah", false],
  HAG: ["520 BC", false], ZEC: ["520-518 BC (chapters 1-8); chapters 9-14 perhaps later", true], MAL: ["About 450-430 BC", false],
  EZR: ["538-458 BC", false], NEH: ["445-about 430 BC", false], EST: ["483-473 BC, under Xerxes", false],
  MAT: ["Written about AD 50-70 (some say 80s)", true], MRK: ["Written about AD 50-65", true], LUK: ["Written about AD 60-62 (some say 80s)", true], JHN: ["Written about AD 85-95", false],
  ACT: ["Written about AD 62", true], ROM: ["AD 57, from Corinth", false], "1CO": ["About AD 55, from Ephesus", false], "2CO": ["About AD 56, from Macedonia", false],
  GAL: ["About AD 48 or about AD 55", true], EPH: ["About AD 60-62, from prison", false], PHP: ["About AD 60-62 (or 54-55)", true], COL: ["About AD 60-62, from prison", false],
  "1TH": ["About AD 50-51, from Corinth", false], "2TH": ["About AD 51", false], "1TI": ["About AD 62-64", true], "2TI": ["About AD 64-67, Paul's last letter", true],
  TIT: ["About AD 62-64", true], PHM: ["About AD 60-62, from prison", false], HEB: ["Before AD 70", true], JAS: ["About AD 45-62", true],
  "1PE": ["About AD 62-64", true], "2PE": ["About AD 64-68", true], "1JN": ["About AD 85-95", true], "2JN": ["About AD 85-95", true], "3JN": ["About AD 85-95", true],
  JUD: ["About AD 65-80", true], REV: ["About AD 95 (some say about AD 68)", true],
};
export function eraFor(book, chapter) {
  let e = BOOK_ERA[book];
  if (Array.isArray(e)) e = (e.find(([a, b]) => chapter >= a && (!b || chapter <= b)) || e[0])[2];
  if (!e) e = "letters";
  const [title, dates, debated, world] = ERA[e];
  const bd = BOOK_DATE[book];
  return { id: e, title, dates: e === "letters" && bd ? bd[0] : dates, debated: e === "letters" && bd ? bd[1] : debated, world, written: e !== "letters" && bd ? bd[0] : "", writtenDebated: bd?.[1] || false };
}

// Regions of the Bible world, as rough boxes: [Bible-times name, today, lat range, lon range].
export const REGIONS = [
  ["Galilee", "Northern Israel", [32.55, 33.3], [35.05, 35.68]],
  ["Samaria", "Central West Bank and northern Israel", [32.05, 32.55], [34.9, 35.58]],
  ["Judea", "Jerusalem and the hills around it", [31.2, 32.05], [34.85, 35.5]],
  ["The coastal plain (Philistia)", "Israel's southern coast and Gaza", [31.2, 32.4], [34.2, 34.85]],
  ["The Negev", "Southern Israel", [30.3, 31.2], [34.2, 35.45]],
  ["Gilead, Ammon and Moab (east of the Jordan)", "Jordan", [30.6, 32.75], [35.5, 36.6]],
  ["Bashan and Golan", "Golan Heights and southern Syria", [32.75, 33.4], [35.68, 36.6]],
  ["Phoenicia (Tyre and Sidon)", "Lebanon", [33.0, 34.7], [35.05, 36.2]],
  ["Cyprus", "Cyprus", [34.5, 35.75], [32.2, 34.65]],
  ["Edom", "Southern Jordan", [29.5, 30.6], [35.2, 36.2]],
  ["Aram (Syria)", "Syria", [33.0, 37.0], [35.7, 38.6]],
  ["Egypt", "Egypt", [22.0, 31.7], [24.0, 32.6]],
  ["The Sinai wilderness", "Sinai Peninsula, Egypt", [27.5, 31.3], [32.6, 35.0]],
  ["Arabia", "Saudi Arabia", [16.0, 29.5], [35.0, 50.0]],
  ["Mesopotamia (Assyria and Babylonia)", "Iraq and eastern Syria", [29.5, 37.5], [38.6, 48.5]],
  ["Persia and Media", "Iran", [25.0, 40.0], [48.5, 62.0]],
  ["Asia Minor", "Turkey", [36.0, 42.5], [26.0, 44.5]],
  ["Macedonia and Greece", "Greece", [34.8, 42.0], [19.0, 26.0]],
  ["Italy", "Italy", [36.5, 47.0], [6.5, 18.6]],
  ["Crete", "Crete, Greece", [34.8, 35.7], [23.4, 26.4]],
];
export function regionOf(lat, lon) {
  const r = REGIONS.find(([, , la, lo]) => lat >= la[0] && lat <= la[1] && lon >= lo[0] && lon <= lo[1]);
  return r ? { then: r[0], now: r[1] } : null;
}

// The twelve tribes of Israel: Jacob's sons (Joseph's line counts as two tribes, Ephraim and
// Manasseh; Levi received no land, only towns). [name, mother, where they settled, key passages, people]
export const TRIBES = [
  ["Reuben", "Leah", "East of the Jordan, north of the Arnon river (today's Jordan)", "Genesis 49:3-4; Numbers 32; Joshua 13:15-23", "Jacob's firstborn"],
  ["Simeon", "Leah", "Inside Judah's land, in the far south (the Negev)", "Genesis 49:5-7; Joshua 19:1-9", ""],
  ["Levi", "Leah", "No land of its own: 48 towns among the other tribes, to serve at the tabernacle and teach", "Genesis 49:5-7; Numbers 18:20-24; Joshua 21", "Moses, Aaron and the priests"],
  ["Judah", "Leah", "The hill country around Bethlehem, Hebron and later Jerusalem; it gave its name to the southern kingdom", "Genesis 49:8-12; Joshua 15", "David, Solomon and the line of Jesus"],
  ["Dan", "Bilhah (Rachel's servant)", "First near the coast west of Jerusalem, then the far north at Laish (Dan)", "Genesis 49:16-18; Joshua 19:40-48; Judges 18", "Samson"],
  ["Naphtali", "Bilhah", "Galilee, west and north of the Sea of Galilee", "Genesis 49:21; Joshua 19:32-39; Isaiah 9:1-2", "Barak"],
  ["Gad", "Zilpah (Leah's servant)", "Gilead, east of the Jordan", "Genesis 49:19; Numbers 32; Joshua 13:24-28", ""],
  ["Asher", "Zilpah", "The coast north of Mount Carmel, toward Tyre", "Genesis 49:20; Joshua 19:24-31", "Anna the prophetess (Luke 2:36)"],
  ["Issachar", "Leah", "The Jezreel Valley, south of Galilee", "Genesis 49:14-15; Joshua 19:17-23", ""],
  ["Zebulun", "Leah", "Lower Galilee, around Nazareth", "Genesis 49:13; Joshua 19:10-16; Matthew 4:13-16", ""],
  ["Joseph: Ephraim", "Rachel", "The central hill country, around Shechem and Shiloh; Ephraim often stands for the whole northern kingdom", "Genesis 48; Joshua 16", "Joshua, Samuel's family"],
  ["Joseph: Manasseh", "Rachel", "Half west of the Jordan (north of Ephraim) and half east (Bashan and Gilead)", "Genesis 48; Joshua 17", "Gideon"],
  ["Benjamin", "Rachel", "A small strip just north of Jerusalem, between Judah and Ephraim", "Genesis 49:27; Joshua 18:11-28", "King Saul, and the apostle Paul (Philippians 3:5)"],
];
export const tribeName = (t) => t[0].replace("Joseph: ", "");
