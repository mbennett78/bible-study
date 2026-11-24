import { BOOKS } from "./books.js";
// Study notes for each chapter: a map with Bible-times and present-day names, history and
// culture, geography, original-language words, scholars' views, and sources.
// Every note carries an evidence label so it's clear what is firm and what is debated.
// Full notes so far: Genesis 1-3, Exodus 14, Psalms 1 and 23, Isaiah 53, Matthew 5, Luke 2, 5 and 15,
// John 1, 3, 11 and 14, Acts 2, Romans 8 and 12, 1 Corinthians 13, Ephesians 2, Philippians 4
// and Revelation 21. More are added book by book.
//
// A source is a plain citation, or { text, url } when there's a page to open. Every source
// gets a "Look it up" link either way (a library search when there's no page of its own).

// What each part of the study section is, in one line, so nobody wonders what they're reading.
import { MORE_NOTES } from "./notes-more.js";

export const ABOUT = {
  verses: "Verse by verse: notes on key verses, the way a study Bible explains them at the bottom of the page. Tap a verse number to jump to it.",
  strongs: "Strong's concordance: every Hebrew or Greek word in this chapter, numbered as in James Strong's concordance (1890). Tap a word to see what it means and where else it's used.",
  map: "Map: the places in this chapter. Brown names are what they were called in Bible times; blue names are what they're called today. Tap a place to read about it.",
  history: "Background: the history, culture and archaeology behind the chapter. Each note is labeled with how firm the evidence is.",
  geography: "Geography: the land itself, and how it shapes the story.",
  words: "Key words: important words in the original language, what they mean, and how they're used elsewhere in the Bible.",
  views: "Scholars and views: how careful Bible scholars read this passage, the reasons they give, and the questions others raise. These are interpretations, not Scripture. Each view is given in its best light, with sources you can open and read for yourself, and the common ground comes last.",
  xref: "Cross-references: other passages on the same subject. Scripture is the best explainer of Scripture.",
  search: "Find a verse: type what it's about (a story, or a topic like baptism or worry) or the words you remember. You'll get a list of passages, and your Bible helper can find the rest.",
  sources: "Sources: the commentaries, lexicons and studies behind these notes. Tap Look it up to open the source, or to find the book in a library.",
  where: "When and where: the time period of this chapter, the world around it, the regions and places it names, and the tribes of Israel. Places and their locations come from OpenBible.info, which weighs the identifications made by scholars and archaeologists. Dates are approximate; where careful scholars differ, it says so.",
  mine: "My notes: what you've written in your journal about this chapter. Only you can see these.",
};
export const sourceText = (s) => (typeof s === "string" ? s : s.text);
// A page for the source itself, or a library search for the book.
export const sourceUrl = (s) => (typeof s === "object" && s.url) || `https://search.worldcat.org/search?q=${encodeURIComponent(sourceText(s).replace(/\([^)]*\)/g, "").replace(/[,.]+\s*$/, "").slice(0, 120))}`;

export const EVIDENCE = {
  scripture: { label: "Scripture says", tip: "The Bible states this directly. The verse is given." },
  strong: { label: "Strong evidence", tip: "Ancient texts, archaeology or measurement that scholars of all views accept." },
  good: { label: "Good evidence", tip: "Well supported, with some details still discussed." },
  debated: { label: "Debated", tip: "Careful scholars disagree. The main views are shown." },
  faith: { label: "Faith reading", tip: "A way believers read the text. It goes beyond what evidence can show." },
  silent: { label: "Scripture is silent", tip: "The Bible doesn't say. Anything here is a suggestion, labeled as one." },
};

// Simplified outlines for the maps, as [latitude, longitude]. Not survey accurate.
const GALILEE = {
  bounds: { lat: [32.69, 32.935], lon: [35.49, 35.68] },
  water: [[[32.873, 35.548], [32.881, 35.572], [32.887, 35.594], [32.889, 35.613], [32.88, 35.63], [32.862, 35.64], [32.83, 35.648], [32.79, 35.642], [32.75, 35.632], [32.72, 35.612], [32.707, 35.588], [32.712, 35.568], [32.735, 35.556], [32.77, 35.548], [32.795, 35.54], [32.815, 35.525], [32.835, 35.518], [32.85, 35.522], [32.862, 35.533]]],
  rivers: [[[32.935, 35.627], [32.905, 35.62], [32.889, 35.613]], [[32.707, 35.588], [32.69, 35.574]]],
  riverLabels: [{ lat: 32.93, lon: 35.632, text: "Jordan River" }, { lat: 32.697, lon: 35.592, text: "Jordan River" }],
  waterLabel: { lat: 32.755, lon: 35.6, text: "Sea of Galilee" },
};
// Coastlines and rivers traced from standard atlases (simplified). Rivers carry their Bible
// name and today's name, so the map can show both.
const NEAR_EAST = {
  bounds: { lat: [24.5, 39.4], lon: [28.5, 52] },
  water: [
    // Mediterranean (the Great Sea)
    [[31.0, 28.5], [31.2, 29.9], [31.5, 31.0], [31.3, 32.3], [31.1, 33.3], [31.3, 34.2], [31.9, 34.65], [32.8, 34.95], [33.3, 35.2], [33.9, 35.45], [34.4, 35.8], [35.2, 35.9], [35.6, 35.75], [36.0, 35.95], [36.6, 36.2], [36.9, 36.0], [36.8, 35.5], [36.7, 34.7], [36.3, 34.0], [36.1, 33.4], [36.2, 32.6], [36.6, 31.9], [36.8, 30.7], [36.4, 30.4], [36.2, 29.6], [36.6, 28.5]],
    // Red Sea with the Gulf of Suez and the Gulf of Aqaba
    [[29.97, 32.55], [29.0, 32.7], [28.2, 33.2], [27.2, 33.85], [26.1, 34.3], [25.0, 34.95], [24.5, 35.2], [24.5, 37.6], [25.0, 37.2], [26.2, 36.4], [27.4, 35.4], [28.0, 34.62], [29.0, 34.75], [29.53, 35.0], [29.4, 34.88], [28.5, 34.5], [28.0, 34.43], [27.73, 34.25], [28.3, 33.6], [29.0, 32.95], [29.6, 32.72], [29.97, 32.58]],
    // Persian Gulf
    [[29.95, 48.6], [29.6, 48.3], [29.35, 48.05], [28.6, 48.4], [27.9, 48.85], [27.0, 49.6], [26.4, 50.1], [25.9, 50.15], [25.5, 50.45], [25.0, 50.75], [25.5, 50.85], [26.15, 51.25], [25.6, 51.55], [25.0, 51.6], [24.5, 51.65], [24.5, 52.0], [27.8, 52.0], [28.5, 51.2], [28.95, 50.8], [29.6, 50.3], [30.1, 49.6], [30.2, 49.0]],
    // Caspian Sea (southwest corner)
    [[39.4, 49.3], [38.4, 48.88], [37.5, 49.1], [37.3, 49.6], [37.1, 50.3], [36.8, 51.0], [36.65, 51.6], [36.7, 52.0], [39.4, 52.0]],
    // Dead Sea, Lake Van, Lake Urmia
    [[31.78, 35.57], [31.5, 35.48], [31.1, 35.4], [31.05, 35.45], [31.5, 35.58]],
    [[38.95, 42.9], [38.8, 43.6], [38.4, 43.3], [38.5, 42.5], [38.75, 42.3]],
    [[38.2, 45.6], [37.7, 45.9], [37.2, 45.6], [37.6, 45.2], [38.0, 45.3]],
  ],
  rivers: [
    // Nile
    [[31.4, 31.0], [30.05, 31.25], [28.1, 30.75], [27.2, 31.2], [26.15, 32.7], [25.7, 32.65], [24.5, 32.9]],
    // Jordan
    [[33.2, 35.62], [32.85, 35.6], [32.7, 35.57], [32.2, 35.55], [31.78, 35.56]],
    // Euphrates
    [[39.4, 40.0], [38.8, 39.0], [38.0, 38.6], [37.0, 38.0], [36.5, 38.2], [35.95, 39.0], [35.33, 40.14], [34.45, 40.95], [34.13, 42.2], [33.42, 43.3], [33.3, 43.8], [32.55, 44.35], [32.0, 44.6], [31.3, 45.3], [31.04, 46.26], [31.0, 47.43]],
    // Tigris
    [[38.5, 39.4], [37.9, 40.2], [37.33, 42.19], [36.34, 43.13], [35.46, 43.3], [34.6, 43.68], [34.2, 43.9], [33.3, 44.4], [32.5, 45.82], [31.84, 47.15], [31.0, 47.43]],
    // Shatt al-Arab, where the two flow together to the Gulf
    [[31.0, 47.43], [30.5, 47.81], [29.95, 48.6]],
    // Karun (some say the Gihon)
    [[32.6, 50.3], [32.05, 48.85], [31.32, 48.67], [30.43, 48.17]],
  ],
  dryRivers: [
    // Wadi al-Batin, a dry riverbed across Arabia (some say the Pishon)
    [[24.8, 40.2], [25.6, 42.0], [26.3, 43.9], [27.4, 45.2], [28.5, 46.5], [29.6, 47.4]],
  ],
  islands: [[[35.2, 32.3], [35.6, 34.6], [35.1, 34.0], [34.6, 33.0], [34.9, 32.4]]],
  riverLabels: [
    { lat: 27.4, lon: 31.6, then: "Nile", now: "Nile" },
    { lat: 34.9, lon: 39.6, then: "Perath", now: "Euphrates", angle: -30 },
    { lat: 37.0, lon: 40.0, then: "Hiddekel", now: "Tigris", angle: 0 },
    { lat: 32.7, lon: 49.0, then: "Gihon?", now: "Karun" },
    { lat: 26.9, lon: 42.3, then: "Pishon?", now: "Wadi al-Batin (dry)", angle: 25 },
  ],
  waterLabels: [
    { lat: 33.7, lon: 31.6, then: "The Great Sea", now: "Mediterranean Sea" },
    { lat: 26.6, lon: 35.0, then: "Red Sea", now: "Red Sea", angle: -55 },
    { lat: 27.5, lon: 50.0, then: "", now: "Persian Gulf", angle: -40 },
    { lat: 37.9, lon: 49.9, then: "", now: "Caspian Sea" },
  ],
};

// Egypt's eastern delta and the Sinai, for the exodus (simplified from standard atlases).
const SINAI = {
  bounds: { lat: [27.6, 31.95], lon: [30.9, 35.62] },
  water: [
    // Mediterranean coast from the Nile mouths to Gaza
    [[31.95, 30.9], [31.55, 30.9], [31.5, 31.5], [31.42, 31.81], [31.3, 32.1], [31.26, 32.3], [31.1, 32.6], [31.1, 33.0], [31.13, 33.8], [31.28, 34.24], [31.52, 34.45], [31.95, 34.7]],
    // Gulf of Suez, the Red Sea and the Gulf of Aqaba
    [[29.97, 32.55], [29.6, 32.35], [29.0, 32.62], [28.3, 33.05], [27.6, 33.75], [27.6, 35.5], [27.95, 35.2], [28.1, 34.82], [29.0, 34.86], [29.53, 35.0], [29.4, 34.9], [28.97, 34.68], [28.5, 34.52], [27.92, 34.32], [27.73, 34.25], [28.2, 33.62], [28.7, 33.2], [29.2, 32.9], [29.7, 32.7], [29.97, 32.58]],
    // Lake Timsah, the Bitter Lakes, Lake Manzala, Lake Bardawil, the Dead Sea
    [[30.6, 32.25], [30.59, 32.33], [30.55, 32.31], [30.56, 32.24]],
    [[30.44, 32.3], [30.36, 32.45], [30.2, 32.5], [30.25, 32.36]],
    [[31.42, 31.85], [31.25, 32.25], [31.14, 32.15], [31.3, 31.8]],
    [[31.18, 32.85], [31.18, 33.3], [31.08, 33.25], [31.07, 32.9]],
    [[31.78, 35.57], [31.5, 35.48], [31.1, 35.4], [31.05, 35.45], [31.5, 35.58]],
  ],
  rivers: [
    [[27.6, 30.93], [28.3, 30.92], [29.07, 31.1], [29.6, 31.25], [30.05, 31.23], [30.2, 31.15], [30.6, 31.3], [31.0, 31.6], [31.42, 31.81]],
    [[30.2, 31.15], [30.6, 30.97], [30.9, 30.9]],
  ],
  riverLabels: [{ lat: 28.55, lon: 31.2, then: "", now: "Nile", angle: -78 }],
  waterLabels: [
    { lat: 31.7, lon: 32.9, then: "The Great Sea", now: "Mediterranean Sea" },
    { lat: 28.75, lon: 32.75, then: "", now: "Gulf of Suez", angle: -52 },
    { lat: 28.5, lon: 34.93, then: "", now: "Gulf of Aqaba", angle: -76 },
    { lat: 27.78, lon: 34.95, then: "Red Sea", now: "Red Sea" },
  ],
};

// The coastlines and rivers, for the When and where map of any chapter.
export const MAP_OUTLINES = { NEAR_EAST, SINAI, GALILEE };

export const NOTES = {
  "LUK.2": {
    crossRefs: [
      ["MIC.5", "Micah 5:2", "Bethlehem, from you One will go forth to be ruler in Israel"],
      ["ISA.9", "Isaiah 9:6-7", "\"For a child will be born to us\""],
      ["MAT.2", "Matthew 2:1-12", "The magi come to Bethlehem"],
      ["LEV.12", "Leviticus 12:1-8", "The offering after a birth: a lamb, or two birds for the poor"],
      ["ISA.49", "Isaiah 49:6", "A light to the nations, as Simeon sings"],
      ["ISA.40", "Isaiah 40:1", "\"Comfort, O comfort My people\": the consolation of Israel"],
      ["GAL.4", "Galatians 4:4-5", "When the fullness of the time came, God sent forth His Son"],
      ["EXO.13", "Exodus 13:2, 12", "Every firstborn son is set apart to the LORD"],
    ],
    intro: "Luke sets the birth of Jesus in real history, in the days of Caesar Augustus. Shepherds hear the angels' good news, Simeon and Anna welcome the baby at the temple, and at twelve Jesus is found in His Father's house.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "2:1", head: "A decree from Caesar Augustus", ev: "strong", src: ["resgestae", "bock"], text: "Augustus ruled the Roman world from 27 BC to AD 14. He counted his citizens and organized taxes across the provinces. Luke shows that God used an emperor's paperwork to bring Mary and Joseph to Bethlehem, where the Messiah was to be born (Micah 5:2)." },
        { ref: "2:2", head: "While Quirinius was governor of Syria", ev: "debated", src: ["josephusant", "marshall", "bock"], text: "Josephus dates a census under Quirinius to AD 6, about ten years after King Herod died, and Jesus was born while Herod was still alive (Matthew 2:1). Scholars offer several answers: Luke's word \"first\" can also mean \"before,\" a census taken before Quirinius' famous one; Quirinius may have held an earlier post in the region; or the census may have been a long process that he completed. Luke's careful history elsewhere gives good reason to take him seriously here." },
        { ref: "2:4", head: "Bethlehem, the city of David", ev: "strong", src: ["bock"], text: "A small town about six miles south of Jerusalem, David's hometown (1 Samuel 16:1). Joseph had to register there because he was from David's family line." },
        { ref: "2:7", head: "No room for them in the inn", ev: "debated", src: ["bailey", "green"], text: "A manger is a feeding trough for animals. The word translated \"inn\" (katalyma) is the same word Luke uses for the \"guest room\" of the Last Supper (22:11). Many scholars think Joseph's family stayed in a relative's home whose guest room was full. In village homes, animals were often brought into a lower part of the house at night, so the baby was laid in a manger there. Others keep the traditional picture of a public inn and a stable or cave." },
        { ref: "2:8", head: "Shepherds out in the fields", src: ["green", "bailey"], text: "Shepherds were ordinary working people, and some looked down on them. God's first announcement of the Savior went to them, near the town where the shepherd boy David had grown up." },
        { ref: "2:11", head: "A Savior, who is Christ the Lord", ev: "strong", src: ["evans", "green"], text: "Three titles in one sentence. Savior: the One who rescues. Christ: the Messiah, God's anointed King. Lord: the title of God Himself. In Luke's day an inscription in Asia Minor (the Priene calendar inscription, 9 BC) called Augustus a savior and his birthday \"the beginning of good news.\" The angel announces the true Savior and the true good news." },
        { ref: "2:14", head: "Peace among men with whom He is pleased", ev: "debated", src: ["metzger"], text: "The oldest manuscripts read \"peace among men of His good pleasure\" (NASB). Later manuscripts read \"good will toward men\" (KJV). The difference is one Greek letter. Either way, peace comes as God's gift." },
        { ref: "2:24", head: "A pair of turtledoves or two young pigeons", ev: "scripture", src: ["green"], text: "Forty days after a son's birth, the law called for a lamb and a bird. A family that could not afford a lamb could bring two birds instead (Leviticus 12:8). Mary and Joseph brought the offering of the poor." },
        { ref: "2:25", head: "Simeon, looking for the consolation of Israel", src: ["bock"], text: "\"Consolation\" echoes Isaiah 40:1, \"Comfort, O comfort My people.\" Simeon's song (2:29-32), often called the Nunc Dimittis from its first words in Latin, says the baby is God's salvation, \"a light of revelation to the Gentiles\" (Isaiah 49:6)." },
        { ref: "2:37", head: "Anna, a widow to the age of eighty-four", ev: "debated", src: ["marshall"], text: "The Greek can mean that Anna was 84 years old, or that she had been a widow for 84 years, which would make her over 100. Either way, she had spent a lifetime in prayer at the temple." },
        { ref: "2:49", head: "In My Father's house", src: ["bock", "green"], text: "These are Jesus' first recorded words, at twelve years old. Mary says \"Your father and I\" (2:48); Jesus speaks of His Father, God. He then goes home and is obedient to Mary and Joseph (2:51)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The Church of the Nativity", ev: "good", src: ["justin", "unescobeth"], text: "Around AD 155, Justin Martyr wrote that Jesus was born in a cave near Bethlehem. Emperor Constantine built a church over that cave in the 4th century, and the present church dates mainly from Justinian in the 6th century. It is one of the oldest churches still in use, and a UNESCO World Heritage Site since 2012." },
        { head: "Traveling to Bethlehem", ev: "good", src: ["bock"], text: "Nazareth to Bethlehem is about 90 miles. On foot that is a journey of several days, likely down the Jordan valley and up through Jericho to avoid Samaria. Luke doesn't mention a donkey; that detail comes from later tradition." },
        { head: "Going up for Passover", ev: "good", src: ["green"], text: "Jewish families traveled to Jerusalem for the great feasts, walking in large groups of relatives and neighbors. That is how Mary and Joseph could travel a whole day before noticing that twelve-year-old Jesus wasn't with them (2:44)." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "κατάλυμα", say: "katalyma", strongs: "G2646", count: "3 times (Mark 14:14, Luke 2:7, Luke 22:11)", means: "guest room, lodging", ev: "good", src: ["bdag", "bailey"], text: "A place to stay. Luke uses a different word (pandocheion) for the public inn in the parable of the Good Samaritan (10:34)." },
        { word: "φάτνη", say: "phatnē", strongs: "G5336", count: "4 times, all in Luke", means: "manger, feeding trough", ev: "strong", src: ["bdag"], text: "Three times in Luke 2 (2:7, 2:12, 2:16), and once where Jesus asks whether anyone would not untie his ox from the manger on the Sabbath (13:15)." },
        { word: "εὐαγγελίζομαι", say: "euangelizomai", strongs: "G2097", count: "about 54 times", means: "bring good news", ev: "strong", src: ["bdag"], text: "\"I bring you good news of great joy\" (2:10). Our word evangelism comes from it." },
        { word: "σωτήρ", say: "sōtēr", strongs: "G4990", count: "24 times", means: "Savior", ev: "strong", src: ["bdag"], text: "Used of God (1:47) and of Jesus. Mary calls God \"my Savior\" in her song (1:47); the angel says the Savior has been born (2:11)." },
      ] },
      { id: "views", title: "How Christians read it", items: [
        { head: "About 6 to 4 BC", who: "Most historians", src: ["marshall", "bock"], text: "Jesus was born shortly before King Herod died, which most date to 4 BC (Matthew 2:19). Our calendar's year 1 was worked out by a monk in the 500s and is a few years off." },
        { head: "December 25", who: "Church tradition", src: ["marshall"], text: "Christians were celebrating the birth on December 25 in Rome by the 300s, and many churches still do. The Bible does not give the day." },
        { head: "Spring or fall", who: "Some interpreters", src: ["bock"], text: "Some suggest a warmer season because the shepherds were out at night. Others answer that flocks near Bethlehem could be kept outdoors in winter too." },
        { head: "What all of them agree on", who: "Common ground", src: ["green"], text: "The exact date is not given; the fact is. God's Son was born in Bethlehem, laid in a manger, and announced as Savior, Christ and Lord." },
      ] },
    ],
    sources: {
      bock: "Darrell L. Bock, Luke 1:1-9:50, Baker Exegetical Commentary (Baker, 1994).",
      green: "Joel B. Green, The Gospel of Luke, New International Commentary (Eerdmans, 1997).",
      marshall: "I. Howard Marshall, The Gospel of Luke, New International Greek Testament Commentary (Eerdmans, 1978).",
      bailey: "Kenneth E. Bailey, Jesus Through Middle Eastern Eyes (IVP Academic, 2008), chapter 1.",
      josephusant: { text: "Josephus, Antiquities of the Jews 18.1-2 (the census of Quirinius).", url: "https://www.gutenberg.org/ebooks/2848" },
      resgestae: "Augustus, Res Gestae Divi Augusti 8 (his census of Roman citizens).",
      evans: "Craig A. Evans, \"Mark's Incipit and the Priene Calendar Inscription,\" Journal of Greco-Roman Christianity and Judaism 1 (2000): 67-81.",
      metzger: "Bruce M. Metzger, A Textual Commentary on the Greek New Testament, 2nd ed. (German Bible Society, 1994), on Luke 2:14.",
      justin: "Justin Martyr, Dialogue with Trypho 78 (about AD 155).",
      unescobeth: { text: "UNESCO World Heritage Centre, \"Birthplace of Jesus: Church of the Nativity and the Pilgrimage Route, Bethlehem,\" inscribed 2012.", url: "https://whc.unesco.org/en/list/1433" },
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "JHN.3": {
    crossRefs: [
      ["NUM.21", "Numbers 21:4-9", "Moses lifts up the bronze serpent"],
      ["EZK.36", "Ezekiel 36:25-27", "Clean water, a new heart and a new spirit"],
      ["TIT.3", "Titus 3:5", "The washing of regeneration and renewing by the Holy Spirit"],
      ["ACT.2", "Acts 2:38", "Repent and be baptized, and you will receive the Holy Spirit"],
      ["1PE.1", "1 Peter 1:23", "Born again of imperishable seed, the living word of God"],
      ["ROM.5", "Romans 5:8", "God demonstrates His love: while we were still sinners, Christ died for us"],
      ["1JN.4", "1 John 4:9-10", "God sent His only begotten Son so that we might live through Him"],
      ["JHN.12", "John 12:32-33", "\"If I am lifted up from the earth, I will draw all men to Myself\""],
    ],
    intro: "Nicodemus, a respected teacher of Israel, comes to Jesus at night and hears that he must be born again. Here is the best-known verse in the Bible, John 3:16. Then John the Baptist rejoices that Jesus must increase.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "3:1", head: "Nicodemus, a ruler of the Jews", ev: "scripture", src: ["carson"], text: "A Pharisee and a member of the Jewish ruling council. John mentions him twice more: defending Jesus' right to a fair hearing (7:50-51), and bringing about 75 pounds of spices to bury Him (19:39). He seems to have moved from curiosity to faith." },
        { ref: "3:2", head: "He came to Jesus by night", ev: "debated", src: ["carson", "keener"], text: "Maybe he wanted to avoid being seen, or wanted a quiet, unhurried talk. John may also mean more: in this Gospel, night often stands for spiritual darkness (13:30), and Nicodemus is coming out of the dark toward the Light (3:19-21)." },
        { ref: "3:3", head: "Born again", ev: "strong", src: ["bdag", "carson"], text: "The Greek word anōthen means both \"again\" and \"from above\" (it means \"from above\" in 3:31). Nicodemus hears only \"again\" and pictures a second physical birth (3:4). Jesus means a new birth that comes from God above." },
        { ref: "3:5", head: "Born of water and the Spirit", ev: "debated", src: ["carson", "cottrell", "schreiner"], text: "Christians understand \"water\" here in more than one way. See \"Scholars and views\" for each main view, fairly explained." },
        { ref: "3:8", head: "The wind blows where it wishes", ev: "strong", src: ["bdag"], text: "In Greek, as in Hebrew, one word (pneuma) means both wind and spirit. You can't see the wind, but you see what it does. The Spirit's work in a person's life is like that." },
        { ref: "3:14", head: "As Moses lifted up the serpent", ev: "scripture", src: ["kostenberger"], text: "When Israel was dying from snakebites, God told Moses to set a bronze serpent on a pole; anyone who looked at it lived (Numbers 21:8-9). \"Lifted up\" in John also points to the cross (12:32-33). Those who look to Jesus in faith live." },
        { ref: "3:16", head: "For God so loved the world", ev: "good", src: ["carson", "kostenberger"], text: "\"So\" (houtōs) means \"in this way\" more than \"so much.\" The verse tells how God loved: He gave His only Son. \"The world\" in John means people in rebellion against God, which makes the love more amazing." },
        { ref: "3:19", head: "Men loved the darkness rather than the Light", src: ["morris"], text: "Judgment is not that God refuses people, but that people refuse the Light when it comes. Those who practice the truth come to the Light (3:21)." },
        { ref: "3:23", head: "Aenon near Salim, because there was much water there", ev: "debated", src: ["notley", "carson"], text: "John chose a place with plenty of water for baptizing. The site is uncertain. The early church historian Eusebius placed it about eight Roman miles south of Scythopolis (Beth Shean), an area with many springs; others look near Shechem in Samaria." },
        { ref: "3:29", head: "The friend of the bridegroom", ev: "good", src: ["keener"], text: "Like a best man, the groom's friend helped arrange the wedding and rejoiced to hear the groom's voice. John the Baptist is glad to step aside: \"He must increase, but I must decrease\" (3:30)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The Pharisees and the council", ev: "good", src: ["danby", "keener"], text: "The Pharisees were a respected movement of teachers devoted to keeping God's law in everyday life. The ruling council in Jerusalem, the Sanhedrin, was later described as having 71 members (Mishnah, Sanhedrin 1:6). Nicodemus was \"the teacher of Israel\" (3:10), a well-known scholar." },
        { head: "What happened to the bronze serpent", ev: "scripture", src: ["kostenberger"], text: "Israel kept the bronze serpent for centuries. By King Hezekiah's day, people were burning incense to it, so he broke it in pieces (2 Kings 18:4). The sign was meant to point to God, never to be worshiped." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "ἄνωθεν", say: "anōthen", strongs: "G509", count: "13 times", means: "again, from above", ev: "strong", src: ["bdag"], text: "Used for the curtain of the temple torn \"from top\" to bottom (Matthew 27:51) and for Jesus' seamless robe woven \"from the top\" (John 19:23). In John 3 both meanings are in play: a new birth, from God above." },
        { word: "πνεῦμα", say: "pneuma", strongs: "G4151", count: "about 380 times", means: "spirit, wind, breath", ev: "strong", src: ["bdag"], text: "The word for the Holy Spirit, for the human spirit, and for the wind. Jesus plays on its meanings in 3:8." },
        { word: "ἠγάπησεν", say: "ēgapēsen", strongs: "G25", count: "the verb agapaō about 143 times", means: "loved", ev: "strong", src: ["bdag"], text: "From agapaō, the love that gives itself for others. 1 John 4:10: \"In this is love, not that we loved God, but that He loved us and sent His Son.\"" },
        { word: "ὑψόω", say: "hypsoō", strongs: "G5312", count: "20 times", means: "lift up, exalt", ev: "strong", src: ["bdag", "carson"], text: "John uses it for Jesus being lifted up on the cross (3:14, 8:28, 12:32-34). His death is also His exaltation." },
      ] },
      { id: "views", title: "How Christians read it", items: [
        { head: "Water means baptism", who: "Baptism reading", src: ["cottrell", "justin"], text: "\"Born of water and the Spirit\" (3:5) points to baptism, the moment a believer is born again. Those who read it this way point to Acts 2:38 (\"Repent, and each of you be baptized... and you will receive the gift of the Holy Spirit\"), to Titus 3:5 (\"the washing of regeneration and renewing by the Holy Spirit\") and to 1 Peter 3:21. John's own setting supports it: right after this conversation, Jesus and His disciples are baptizing in Judea (3:22), and John the Baptist is baptizing nearby \"because there was much water there\" (3:23).\n\nIt is also the oldest reading on record. Around AD 155, Justin Martyr described a new believer's baptism and quoted Jesus' words, \"Unless you are born again, you will not enter the kingdom of heaven\" (First Apology 61).", ask: "Others ask how Nicodemus could be expected to understand Christian baptism before it began (3:10). Supporters answer that he already knew John's baptism of repentance and the washings of the Law." },
        { head: "Water means natural birth", who: "Two-births reading", src: ["schreiner"], text: "\"Water\" is the first, physical birth, and \"Spirit\" the second, spiritual birth. Nicodemus has just asked whether a man can enter his mother's womb a second time (3:4), and the very next verse sets the two births side by side: \"That which is born of the flesh is flesh, and that which is born of the Spirit is spirit\" (3:6). In this reading the new birth is the Spirit's inner work, and baptism follows it as the believer's act of obedience.", ask: "Critics note that in Greek \"water and Spirit\" share a single preposition (ex hydatos kai pneumatos), which reads most naturally as one birth seen two ways, not two births." },
        { head: "God's promised cleansing", who: "Prophecy reading", src: ["carson", "kostenberger"], text: "\"Water and Spirit\" together recall Ezekiel 36:25-27: \"I will sprinkle clean water on you, and you will be clean... I will give you a new heart and put a new spirit within you.\" D. A. Carson argues that this is why Jesus could scold \"the teacher of Israel\" for not understanding (3:10): the prophets had already promised a day when God would wash His people and give them His Spirit. Water and Spirit describe one new birth from two sides, cleansing from sin and new life from God." },
        { head: "What all of them agree on", who: "Common ground", src: ["morris"], text: "New birth is God's work by His Spirit, and no one sees the kingdom of God without it. Jesus commands baptism (Matthew 28:19). Whoever believes in Him has eternal life (3:16). Readers who differ on verse 5 can study it side by side, Bibles open, as Nicodemus did." },
      ] },
    ],
    sources: {
      carson: "D. A. Carson, The Gospel According to John, Pillar New Testament Commentary (Eerdmans, 1991).",
      kostenberger: "Andreas J. Köstenberger, John, Baker Exegetical Commentary on the New Testament (Baker Academic, 2004).",
      morris: "Leon Morris, The Gospel According to John, rev. ed., New International Commentary (Eerdmans, 1995).",
      keener: "Craig S. Keener, The Gospel of John: A Commentary, 2 vols. (Hendrickson, 2003).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
      cottrell: "Jack Cottrell, Baptism: A Biblical Study (College Press, 1989).",
      schreiner: "Thomas R. Schreiner and Shawn D. Wright, eds., Believer's Baptism (B&H Academic, 2006).",
      justin: { text: "Justin Martyr, First Apology 61 (about AD 155), in Ante-Nicene Fathers, vol. 1.", url: "https://en.wikipedia.org/wiki/First_Apology_of_Justin_Martyr" },
      danby: "Herbert Danby, trans., The Mishnah (Oxford University Press, 1933), Sanhedrin 1:6.",
      notley: "R. Steven Notley and Ze'ev Safrai, Eusebius, Onomasticon (Brill, 2005).",
    },
  },

  "JHN.1": {
    crossRefs: [
      ["GEN.1", "Genesis 1:1-3", "\"In the beginning God created\": John's opening words echo it"],
      ["COL.1", "Colossians 1:15-17", "All things were created through Him and for Him"],
      ["HEB.1", "Hebrews 1:1-3", "God has spoken in His Son, through whom He made the world"],
      ["PHP.2", "Philippians 2:5-8", "He emptied Himself, taking the form of a servant"],
      ["EXO.40", "Exodus 40:34-35", "The glory of the LORD filled the tabernacle"],
      ["ISA.40", "Isaiah 40:3", "\"A voice is calling, clear the way for the LORD\""],
      ["ISA.53", "Isaiah 53:7", "Like a lamb that is led to slaughter"],
      ["EXO.12", "Exodus 12:3-13", "The Passover lamb"],
      ["1JN.1", "1 John 1:1-3", "What we have seen and touched: the Word of Life"],
    ],
    intro: "John opens his Gospel before creation: the Word who was with God and was God became a man and lived among us. Then John the Baptist points to Jesus as the Lamb of God, and the first disciples begin to follow Him.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "1:1", head: "In the beginning was the Word", src: ["carson", "kostenberger"], text: "John starts with the same words as Genesis 1:1, on purpose. When the beginning began, the Word already was. Three short lines say three things: the Word existed before creation, the Word was with God (distinct from the Father), and the Word was God (sharing God's own nature)." },
        { ref: "1:3", head: "All things came into being through Him", src: ["carson"], text: "The Word is not part of creation but the One through whom everything was made. Paul and Hebrews say the same of the Son (Colossians 1:16, Hebrews 1:2)." },
        { ref: "1:5", head: "The darkness did not comprehend it", ev: "debated", src: ["bdag", "kostenberger"], text: "The Greek verb (katalambanō) can mean to grasp with the mind or to seize and overpower. So translations differ: \"comprehend\" (NASB 1995), \"grasp\" (NASB 2020), \"overcome\" (ESV, NIV). Both meanings are true to John: the world did not understand the Light, and could not put it out." },
        { ref: "1:6-8", head: "A man sent from God, named John", src: ["carson"], text: "This is John the Baptist, not John the Gospel writer. In this Gospel he is never called \"the Baptist\"; he is simply the witness who points away from himself to Jesus (1:20, 3:30)." },
        { ref: "1:12", head: "The right to become children of God", src: ["morris"], text: "Becoming God's child is a gift received by believing in His name, not a birthright by family line (\"not of blood\") or by human effort (1:13)." },
        { ref: "1:14", head: "The Word became flesh, and dwelt among us", ev: "strong", src: ["bdag", "carson"], text: "\"Dwelt\" translates a Greek word that means to pitch a tent. It calls to mind the tabernacle, God's tent in Israel's camp, which His glory filled (Exodus 40:34). In Jesus, God came to live among His people in person, and \"we saw His glory.\"" },
        { ref: "1:17", head: "Grace and truth", src: ["kostenberger"], text: "The Law came as a true gift through Moses. Grace and truth came in full through Jesus Christ. The words echo Exodus 34:6, where God is \"abounding in lovingkindness and truth.\"" },
        { ref: "1:18", head: "The only begotten God", ev: "debated", src: ["metzger"], text: "The oldest Greek manuscripts read \"only begotten God\" (followed by the NASB), while many later ones read \"only begotten Son\" (followed by the KJV). Either way, the verse teaches that the Son, who is closest to the Father, is the One who makes God known." },
        { ref: "1:21", head: "\"I am not\" Elijah", src: ["carson"], text: "Jesus later says John \"is Elijah who was to come\" (Matthew 11:14). The two fit together: John was not Elijah come back to earth, but he came \"in the spirit and power of Elijah\" (Luke 1:17), as Malachi 4:5 promised." },
        { ref: "1:29", head: "Behold, the Lamb of God", src: ["kostenberger", "morris"], text: "Every Jewish listener knew lambs as sacrifices: the Passover lamb whose blood saved Israel (Exodus 12) and the lamb led to slaughter in Isaiah 53:7. John says this Lamb takes away the sin of the whole world." },
        { ref: "1:39", head: "About the tenth hour", ev: "debated", src: ["carson"], text: "Counting from sunrise, as the Jews usually did, the tenth hour is about 4 in the afternoon, late enough that the two disciples stayed the night. A few scholars think John counts from midnight, which would make it 10 in the morning." },
        { ref: "1:42", head: "Cephas, which is translated Peter", ev: "strong", src: ["bdag"], text: "Kepha is the Aramaic word for rock, the language Jesus spoke day to day. Petros is the Greek form. Jesus gives Simon a new name that describes who he will become." },
        { ref: "1:46", head: "Can any good thing come out of Nazareth?", ev: "good", src: ["dark"], text: "Nazareth was a small farming village in the hills of Galilee, never named in the Old Testament. Nathanael's doubt makes sense, and Philip's answer is the best one: \"Come and see.\"" },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Why John called Him \"the Word\"", ev: "good", src: ["carson", "kostenberger"], text: "Greek thinkers used logos for the reason or order behind the world. Jewish readers knew the \"word of the LORD\" that created the heavens (Psalm 33:6) and spoke through the prophets. John uses a term both audiences understood, then says something neither expected: the Word is a Person, and He became flesh." },
        { head: "Where John was baptizing", ev: "debated", src: ["unesco", "carson"], text: "\"Bethany beyond the Jordan\" (1:28) is a different place from Bethany near Jerusalem. The traditional site, Al-Maghtas on the east bank of the Jordan in the country of Jordan, has remains of churches and pools from the Roman and Byzantine periods and was named a UNESCO World Heritage Site in 2015. Some scholars place it farther north, in the region of Batanea." },
        { head: "What Nazareth was like", ev: "good", src: ["dark"], text: "Excavations show a village of perhaps a few hundred people, with simple stone houses, cisterns and terraced fields. A first-century house cut partly into the rock lies beneath the Sisters of Nazareth convent. Archaeologist Ken Dark has argued it may be the house that early Christians honored as Jesus' childhood home; that identification is still debated." },
        { head: "Following a rabbi", ev: "good", src: ["kostenberger"], text: "\"Rabbi\" means \"my teacher\" (1:38). Students of a rabbi did more than attend lessons: they walked with him, ate with him and learned from his life. \"Where are You staying?\" was a way of asking to become His students." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "λόγος", say: "logos", strongs: "G3056", count: "about 330 times", means: "word, message, reason", ev: "strong", src: ["bdag"], text: "The everyday word for a spoken word or message, and also for reason or explanation. John uses it as a title for the Son in 1:1 and 1:14, and again in 1 John 1:1 and Revelation 19:13." },
        { word: "μονογενής", say: "monogenēs", strongs: "G3439", count: "9 times", means: "only begotten, one and only", ev: "debated", src: ["bdag", "carson"], text: "Used of an only child (Luke 7:12) and of Isaac, Abraham's unique son of promise (Hebrews 11:17). Older translations say \"only begotten\"; many newer ones say \"one and only,\" stressing that He is unique. Both point to the one Son who shares the Father's nature (1:14, 1:18, 3:16)." },
        { word: "ἐσκήνωσεν", say: "eskēnōsen", strongs: "G4637", count: "5 times (John 1:14 and four times in Revelation)", means: "pitched His tent, dwelt", ev: "strong", src: ["bdag"], text: "From skēnē, a tent. Revelation 21:3 uses the same word for the end of the story: \"the tabernacle of God is among men, and He will dwell among them.\"" },
        { word: "ἀμνός", say: "amnos", strongs: "G286", count: "4 times", means: "lamb", ev: "strong", src: ["bdag"], text: "A young sheep, the kind offered in sacrifice. Besides John 1:29 and 1:36, it appears in Acts 8:32 (quoting Isaiah 53) and 1 Peter 1:19, \"a lamb unblemished and spotless, the blood of Christ.\"" },
      ] },
      { id: "views", title: "How Christians read it", items: [
        { head: "\"Only begotten\": eternal Sonship", who: "Nicene Creed, many traditions", src: ["carson"], text: "The Son is eternally \"begotten of the Father before all ages\" (Nicene Creed, AD 381): the Son is from the Father, without having a beginning in time." },
        { head: "\"One and only\": unique Son", who: "Many modern scholars", src: ["bdag", "kostenberger"], text: "Monogenēs stresses that the Son is one of a kind. These scholars still hold that He is fully and eternally God; they read the word as being about His uniqueness more than His origin." },
        { head: "What all of them agree on", who: "Common ground", src: ["morris"], text: "The Word is eternal, fully God and fully man. He made all things, became flesh to make the Father known, and gives the right to become God's children to all who believe in His name (1:12)." },
      ] },
    ],
    sources: {
      carson: "D. A. Carson, The Gospel According to John, Pillar New Testament Commentary (Eerdmans, 1991).",
      kostenberger: "Andreas J. Köstenberger, John, Baker Exegetical Commentary on the New Testament (Baker Academic, 2004).",
      morris: "Leon Morris, The Gospel According to John, rev. ed., New International Commentary (Eerdmans, 1995).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
      metzger: "Bruce M. Metzger, A Textual Commentary on the Greek New Testament, 2nd ed. (German Bible Society, 1994), on John 1:18.",
      unesco: { text: "UNESCO World Heritage Centre, \"Baptism Site 'Bethany Beyond the Jordan' (Al-Maghtas),\" inscribed 2015.", url: "https://whc.unesco.org/en/list/1446" },
      dark: "Ken Dark, Roman-Period and Byzantine Nazareth and Its Hinterland (Routledge, 2020).",
    },
  },

  "PSA.23": {
    crossRefs: [
      ["JHN.10", "John 10:11-16", "\"I am the good shepherd\""],
      ["EZK.34", "Ezekiel 34:11-16", "\"I Myself will search for My sheep\""],
      ["ISA.40", "Isaiah 40:11", "Like a shepherd He will tend His flock"],
      ["1SA.17", "1 Samuel 17:34-37", "David the shepherd fights the lion and the bear"],
      ["REV.7", "Revelation 7:17", "The Lamb will be their shepherd and guide them to springs of water"],
      ["1PE.2", "1 Peter 2:25", "Returned to the Shepherd and Guardian of your souls"],
      ["HEB.13", "Hebrews 13:20", "Jesus, the great Shepherd of the sheep"],
      ["PSA.100", "Psalm 100:3", "We are His people and the sheep of His pasture"],
    ],
    intro: "David, who grew up keeping his father's sheep, pictures the LORD as his Shepherd, then as a generous Host. It is a psalm of trust for every season: green pastures, dark valleys, and the house of the LORD at the end of the road.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "23:1", head: "The LORD is my shepherd", ev: "strong", src: ["kidner", "craigie"], text: "\"LORD\" in small capital letters stands for God's personal name, YHWH, which He made known to Moses (Exodus 3:14-15). David says \"my\" shepherd: the God of all the earth cares for him personally. \"I shall not want\" means he will lack nothing he truly needs." },
        { ref: "23:2", head: "Green pastures, quiet waters", ev: "good", src: ["kingstager", "keller"], text: "In the dry hills of Judea, grass and water had to be found. Sheep depend on a shepherd to lead them to grazing and to calm water they can drink from safely. To \"lie down\" pictures a flock that is fed, safe and at rest." },
        { ref: "23:3", head: "He restores my soul", src: ["vangemeren"], text: "\"Restores\" can mean to bring back, as a shepherd brings back a wandering sheep, or to refresh. \"Paths of righteousness\" are right paths, the ways that lead where they should. He does it \"for His name's sake,\" because His own good name is at stake in how He cares for His sheep." },
        { ref: "23:4", head: "The valley of the shadow of death", ev: "debated", src: ["halot", "craigie"], text: "The Hebrew word (tsalmaveth) can be read as \"shadow of death\" or as \"deep darkness.\" Either way, it is the darkest valley a sheep could walk. Notice the change from \"He\" to \"You\": in the dark, David speaks to God directly. \"For You are with me\" is the center of the psalm." },
        { ref: "23:4", head: "Your rod and Your staff", ev: "good", src: ["kingstager", "keller"], text: "A shepherd carried a short club (the rod) to drive off wild animals and a long staff to guide the sheep and pull them out of trouble. One protects, one guides, and both comfort." },
        { ref: "23:5", head: "You prepare a table before me", ev: "good", src: ["craigie", "kidner"], text: "The picture moves from the pasture to a home. In the ancient Near East, a host was bound to protect his guest, so even enemies looking on could not touch him. Anointing a guest's head with oil was a sign of welcome and honor (Luke 7:46). \"My cup overflows\": more than enough." },
        { ref: "23:6", head: "Goodness and lovingkindness will follow me", ev: "strong", src: ["halot", "vangemeren"], text: "The Hebrew verb usually means to pursue or chase. God's goodness and His loyal, covenant love do not just trail behind; they pursue David every day. \"Dwell in the house of the LORD forever\" is literally \"for length of days.\" Christians also read it as the hope of being with the Lord forever." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "David the shepherd", ev: "scripture", src: ["kidner"], text: "David was the youngest son, out keeping the sheep when Samuel came to anoint him (1 Samuel 16:11). He told Saul he had killed a lion and a bear to rescue his father's flock (1 Samuel 17:34-36). He knew from experience what a good shepherd does." },
        { head: "Kings were called shepherds", ev: "strong", src: ["pritchard", "craigie"], text: "Rulers in the ancient Near East called themselves shepherds of their people. Hammurabi of Babylon (about 1750 BC) calls himself \"the shepherd\" in the prologue to his famous law code. Israel's kings were meant to shepherd too (2 Samuel 5:2), and the prophets scolded them when they failed (Ezekiel 34). Psalm 23 says the LORD Himself is the true Shepherd King." },
        { head: "A shepherd's day", ev: "good", src: ["kingstager"], text: "Shepherds led their flocks from the front, called them by voice (John 10:3-4), and brought them into stone sheepfolds at night, sometimes sleeping across the doorway. They carried a staff, a club, a sling and a bag with food." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "רֹעִי", say: "ro'i", strongs: "H7462", count: "the verb ra'ah about 170 times", means: "my shepherd", ev: "strong", src: ["halot"], text: "From ra'ah, to pasture or tend a flock. The same word is used for leaders who care for God's people (Jeremiah 3:15)." },
        { word: "צַלְמָוֶת", say: "tsalmaveth", strongs: "H6757", count: "18 times, 10 of them in Job", means: "shadow of death, deep darkness", ev: "debated", src: ["halot"], text: "Traditionally divided as tsel (shadow) + maveth (death). Many lexicons read it as one word meaning deep darkness. Both readings describe the darkest of times." },
        { word: "חֶסֶד", say: "chesed", strongs: "H2617", count: "about 250 times", means: "lovingkindness, steadfast love", ev: "strong", src: ["halot", "vangemeren"], text: "God's loyal, faithful love for the people bound to Him by covenant. English needs several words to translate it: lovingkindness, mercy, steadfast love, faithfulness." },
        { word: "רָדַף", say: "radaph", strongs: "H7291", count: "about 140 times", means: "pursue, follow after", ev: "strong", src: ["halot"], text: "Most often used of chasing an enemy (Exodus 14:9). Here the ones doing the chasing are God's goodness and love." },
      ] },
      { id: "views", title: "How Christians read it", items: [
        { head: "One picture all the way through", who: "Some commentators", src: ["keller"], text: "The shepherd picture continues to the end: the \"table\" is a pasture the shepherd has cleared for the flock, and the oil is what shepherds rubbed on sheep's heads to protect them from insects." },
        { head: "Shepherd, then host", who: "Most commentators", src: ["craigie", "kidner"], text: "The psalm changes pictures at verse 5, from a shepherd in the field to a host at a banquet. Both show the same God from two sides: He leads, and He welcomes." },
        { head: "Pointing to Jesus", who: "Christian reading", src: ["vangemeren"], text: "Christians hear this psalm in light of Jesus, who said, \"I am the good shepherd; the good shepherd lays down His life for the sheep\" (John 10:11)." },
        { head: "What all of them agree on", who: "Common ground", src: ["kidner"], text: "The LORD personally cares for His people, provides for them, stays with them in the darkest valley, and brings them home." },
      ] },
    ],
    sources: {
      craigie: "Peter C. Craigie, Psalms 1-50, Word Biblical Commentary 19 (Word, 1983).",
      kidner: "Derek Kidner, Psalms 1-72, Tyndale Old Testament Commentaries (InterVarsity Press, 1973).",
      vangemeren: "Willem A. VanGemeren, \"Psalms,\" in The Expositor's Bible Commentary, rev. ed., vol. 5 (Zondervan, 2008).",
      kingstager: "Philip J. King and Lawrence E. Stager, Life in Biblical Israel (Westminster John Knox, 2001).",
      keller: "W. Phillip Keller, A Shepherd Looks at Psalm 23 (Zondervan, 1970). A sheep rancher's reflections.",
      pritchard: "James B. Pritchard, ed., Ancient Near Eastern Texts Relating to the Old Testament, 3rd ed. (Princeton University Press, 1969), the Code of Hammurabi.",
      halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
    },
  },

  "GEN.1": {
    crossRefs: [
      ["JHN.1", "John 1:1-3", "In the beginning was the Word; all things came into being through Him"],
      ["HEB.11", "Hebrews 11:3", "The world was made by the word of God"],
      ["COL.1", "Colossians 1:16", "All things were created through Him and for Him"],
      ["PSA.33", "Psalm 33:6-9", "By the word of the Lord the heavens were made"],
      ["PSA.104", "Psalm 104", "A song about creation"],
      ["ISA.45", "Isaiah 45:18", "He did not create it a waste place"],
      ["EXO.20", "Exodus 20:11", "In six days the Lord made the heavens and the earth"],
      ["GEN.9", "Genesis 9:6", "Made in the image of God"],
      ["REV.21", "Revelation 21:1", "A new heaven and a new earth"],
    ],
    intro: "Genesis 1 tells how God made the heavens and the earth in six days and filled them with life, with people made in His image as the high point.",
    map: {
      outline: NEAR_EAST,
      caption: "Genesis 1 names no places. The map shows the two most likely areas for Eden (Genesis 2), and the cities where the creation stories of Israel's neighbors were written down, so you can see what Genesis was speaking into.",
      places: [
        { lat: 30.4, lon: 47.9, kind: "eden", side: "left", dy: 14, then: "Eden? (southern view)", now: "Near Basra, Iraq", note: "One of the two leading suggestions. The Tigris and Euphrates join here and flow to the Persian Gulf, and the Karun and a dry Arabian riverbed (Wadi al-Batin) once flowed in nearby. Some think the garden's land now lies under the shallow Gulf. Genesis 2:10-14 names the rivers but not the exact spot." },
        { lat: 38.6, lon: 40.6, kind: "eden", side: "left", dy: -4, then: "Eden? (northern view)", now: "Highlands of eastern Turkey", note: "The other leading suggestion. The Tigris and Euphrates both begin in these mountains, and Genesis says the river flowed out of Eden and then divided (2:10), which sounds like a place upstream, where rivers begin." },
        { lat: 31.78, lon: 35.23, side: "left", then: "Jerusalem", now: "Jerusalem", note: "Where Israel's Scriptures were kept and read in the temple." },
        { lat: 32.54, lon: 44.42, side: "left", then: "Babylon", now: "Ruins near Hillah, Iraq", note: "Home of the creation epic Enuma Elish, where the god Marduk builds the world from a defeated sea goddess." },
        { lat: 36.36, lon: 43.15, side: "right", then: "Nineveh", now: "Mosul, Iraq", note: "Tablets of Enuma Elish were found here in King Ashurbanipal's library in the 1840s and 1850s." },
        { lat: 29.85, lon: 31.25, side: "right", then: "Memphis", now: "Near Cairo, Egypt", note: "An Egyptian text (the Shabaka Stone) says the god Ptah made things by thought and word." },
        { lat: 35.6, lon: 35.78, side: "right", dy: -2, then: "Ugarit", now: "Ras Shamra, Syria", note: "Its Baal stories describe a storm god fighting Yam, the sea." },
      ],
    },
    sections: [
      { id: "history", title: "History and culture", items: [
        { head: "One God, no battle", ev: "strong", src: ["dalley", "hasel"], text: "In Babylon's Enuma Elish, the world is made after a war among gods: Marduk splits the sea goddess Tiamat in two to form sky and earth. Genesis 1 has no rival gods and no struggle. God speaks, and it is so. Even the great sea creatures (1:21) are just creatures God made and called good." },
        { head: "The sun and moon aren't named", ev: "debated", src: ["hasel", "wenham"], text: "Verse 16 says \"the greater light\" and \"the lesser light\" instead of the usual Hebrew words for sun and moon, which were also names of gods in the region. Many scholars think this is on purpose: the lights people worshiped are only lamps God hung in the sky. Others think it's simply the poetic style of the chapter." },
        { head: "Made in His image", ev: "good", src: ["walton", "wenham", "mathews"], text: "Kings in the ancient Near East set up statues, called images, to show where they ruled. Genesis gives that honor to every person, male and female (1:27): each one represents God's rule on earth. In neighboring stories, people were made to do the gods' chores." },
        { head: "A pattern of forming and filling", ev: "strong", src: ["wenham", "mathews"], text: "Days 1 to 3 shape the spaces (light, sky and sea, land). Days 4 to 6 fill them (lights, birds and fish, animals and people). The seventh day, when God rests, stands apart. This careful structure is plain in the Hebrew." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "בְּרֵאשִׁית", say: "bereshit", strongs: "H7225", count: "about 50 times in the Old Testament (as reshit, \"beginning, first\")", means: "in the beginning", ev: "debated", src: ["wenham", "halot"], text: "Most translations read it as a full statement: \"In the beginning God created.\" Some Jewish translations read it as \"When God began to create.\" The first reading points more clearly to creation from nothing." },
        { word: "בָּרָא", say: "bara", strongs: "H1254", count: "about 50 times, with God as the one creating", means: "create", ev: "strong", src: ["halot", "wenham"], text: "In this form of the verb, only God is ever the one who creates. People make (asah) and form (yatsar), but only God creates (bara). It appears three times in verse 27." },
        { word: "אֱלֹהִים", say: "Elohim", strongs: "H430", count: "about 2,600 times", means: "God", ev: "faith", src: ["mathews", "wenham"], text: "A plural form that takes singular verbs, often explained as a plural of majesty. Many Christians also see room here, and in \"Let Us make\" (1:26), for the Trinity revealed later in Scripture." },
        { word: "תֹהוּ וָבֹהוּ", say: "tohu va-vohu", strongs: "H8414 + H922", count: "tohu about 20 times; bohu only 3 times (Genesis 1:2, Isaiah 34:11, Jeremiah 4:23)", means: "formless and void", ev: "strong", src: ["wenham"], text: "A rhyming pair meaning empty and unshaped. Jeremiah uses the same words to describe a land undone by judgment (Jeremiah 4:23)." },
        { word: "רָקִיעַ", say: "raqia", strongs: "H7549", count: "17 times, 9 of them in Genesis 1", means: "expanse, firmament", ev: "debated", src: ["halot", "walton", "collins"], text: "It comes from a verb meaning to beat or spread out, used for hammering gold thin (Exodus 39:3). Some think it pictures the sky as a solid dome, as neighboring peoples did. Others read it as the open sky or air we see." },
        { word: "צֶלֶם", say: "tselem", strongs: "H6754", count: "17 times", means: "image", ev: "strong", src: ["halot", "wenham"], text: "A carved or cast likeness, the word used for statues of gods and kings. Genesis uses it for people: \"God created man in His own image\" (1:27). It returns in Genesis 9:6, where the image is the reason human life is precious." },
        { word: "יוֹם", say: "yom", strongs: "H3117", count: "about 2,300 times", means: "day", ev: "debated", src: ["collins", "morris", "ross"], text: "It can mean a 24-hour day, the daylight hours, or a longer time (\"in the day that the Lord God made earth and heaven,\" Genesis 2:4). How to take it in Genesis 1 is the heart of the debate about the days." },
      ] },
      { id: "views", title: "How Christians read it", items: [
        { head: "Six ordinary days, a young earth", who: "24-hour days", src: ["basil", "morris"], text: "This view takes the days as ordinary days and calls it the plainest reading. When the Hebrew word yom (day) comes with a number (\"the second day\") and with \"evening and morning,\" it almost always means a normal day. The Ten Commandments build the work week on the creation week: \"in six days the LORD made the heavens and the earth... and rested on the seventh day\" (Exodus 20:11). Add up the ages in the family lines of Genesis 5 and 11, and creation lands thousands of years ago, not millions.\n\nThe reading is ancient. Basil of Caesarea, preaching on Genesis around AD 378, said the first day was a day of twenty-four hours. Henry Morris's The Genesis Record (1976) gave it wide modern reach. Its defenders add a reason from the gospel: Romans 5:12 says death entered the world through sin, which is hard to fit with long ages of death before Adam. They hold that Noah's flood laid down much of the rock record, and they question the starting assumptions behind long dates.", ask: "Others ask how there were evenings and mornings before the sun was set in place on day 4, and how light from distant galaxies reached the earth so soon." },
        { head: "Real days, a mature creation", who: "Created mature", src: ["morris"], text: "Here too the days are ordinary days, but God made a working world, not a world of seeds and newborns. Adam was formed a grown man, and the trees were already bearing fruit (1:11-12, 2:7-9). A world made mature would look older than it is from its very first day, much as the wine Jesus made at Cana (John 2:1-11) tasted like good, aged wine though it was minutes old.", ask: "Critics reply that some evidence, such as light recording stars that exploded long ago, would then show events that never happened. Supporters answer that God is not deceiving anyone when He has told us what He did." },
        { head: "Long ages", who: "Day-age", src: ["ross", "planck", "dalrymple"], text: "Each day is a long era. The same word yom covers the whole creation week in Genesis 2:4 (\"in the day that the LORD God made earth and heaven\"), and Psalm 90:4 says a thousand years are like a day to God. The seventh day has no \"evening and morning,\" and Hebrews 4:3-11 treats God's rest as still going on, so they argue that at least one day of the week is not 24 hours long. A great deal happens on day six: Adam tends the garden, names the animals, and has time to feel alone before Eve is made (2:15-23).\n\nAstronomer Hugh Ross argues that Genesis 1 gives the same order science finds: a beginning, light, oceans, dry land, plant life, sea creatures, land animals, and people last of all. The universe's age is measured at about 13.8 billion years from the light left over from its beginning, and the earth's at about 4.5 billion years from its oldest rocks and meteorites.", ask: "Critics note that plants appear on day 3 before the sun on day 4, and that \"evening and morning\" sound like ordinary days. Supporters answer that the sun already existed and became visible from the earth's surface on day 4." },
        { head: "God's workdays", who: "Analogical days", src: ["collins", "augustine"], text: "Old Testament scholar C. John Collins reads the days as God's workdays, told by comparison with a human work week. They are real days for God, but described in a human way, the way Scripture speaks of God's \"arm,\" or says that on the seventh day He \"rested and was refreshed\" (Exodus 31:17). The point is the pattern: we work six days and rest because God did. How long God's days were, the text doesn't say.\n\nThe idea that the days may not be ordinary is very old. Augustine, in The Literal Meaning of Genesis (written about AD 401-415), thought God may have created all things at once, with the days showing the order of His work rather than a span of hours." },
        { head: "A framework", who: "Literary framework", src: ["blocher", "kline", "kline96"], text: "The six days form a frame of two matching sets of three. Days 1 to 3 make realms: light, then sky and seas, then land. Days 4 to 6 fill them with rulers: the lights, then birds and fish, then animals and people. Day 1 pairs with day 4, day 2 with day 5, day 3 with day 6. Henri Blocher and Meredith Kline argue that this arrangement is by topic, not by clock, much as the Gospel writers sometimes group events by theme.\n\nKline points to Genesis 2:5: no plant had yet sprung up \"for the LORD God had not sent rain upon the earth.\" If God was working through ordinary means like rain while He made the world, the days were not a rush of miracles in a few hours.", ask: "Critics answer that Genesis 1 reads like a straightforward account, numbered days and all, and that a beautiful pattern doesn't rule out a real sequence." },
        { head: "A cosmic temple", who: "Functional view", src: ["walton"], text: "John Walton reads Genesis 1 against the ancient Near East, where people cared most about what a thing does, its function. In his reading the seven days describe God giving the world its working order (time, weather, food) and then taking up His rest in it, the way a king sits on his throne in a finished temple (Psalm 132:7-8, 13-14; Isaiah 66:1). The chapter tells us that the whole world is God's dwelling place and why it exists, not how old it is.", ask: "Critics say the word bara (create) is about bringing things into being, not only giving them roles, and that Hebrews 11:3 teaches the world was made out of what is not visible." },
        { head: "Light before the sun", who: "A question every view answers", extra: true, src: ["collins", "ross", "morris"], text: "Light appears on day 1 (1:3), but the sun, moon and stars on day 4 (1:14-19). Some say God Himself lit the first days, as He will light the new creation, where \"they will not have need of the light of a lamp nor the light of the sun\" (Revelation 22:5). Some say the sun already shone and became visible from the surface on day 4 as the sky cleared. Others say the days are arranged by topic, so day 4 tells more about the light of day 1." },
        { head: "What all of them agree on", who: "Common ground", src: ["mathews", "planck"], text: "God alone made everything, and He made it from nothing visible (Hebrews 11:3). The universe had a beginning, which science now affirms as well. Creation is good, orderly and dependable. Every person, male and female, bears God's image and has great worth. The week of work and rest is God's gift. Believers who differ about the days stand together on the first words of the Bible: \"In the beginning God created the heavens and the earth.\"" },
      ] },
    ],
    sources: {
      dalley: "Stephanie Dalley, Myths from Mesopotamia (Oxford University Press, 1989), the Epic of Creation (Enuma Elish).",
      hasel: "Gerhard F. Hasel, \"The Polemic Nature of the Genesis Cosmology,\" Evangelical Quarterly 46 (1974): 81-102.",
      walton: "John H. Walton, The Lost World of Genesis One (IVP Academic, 2009).",
      wenham: "Gordon J. Wenham, Genesis 1-15, Word Biblical Commentary 1 (Word, 1987).",
      mathews: "Kenneth A. Mathews, Genesis 1-11:26, New American Commentary (Broadman & Holman, 1996).",
      halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
      planck: { text: "Planck Collaboration, \"Planck 2018 results. VI. Cosmological parameters,\" Astronomy & Astrophysics 641 (2020): A6.", url: "https://doi.org/10.1051/0004-6361/201833910" },
      dalrymple: "G. Brent Dalrymple, The Age of the Earth (Stanford University Press, 1991).",
      basil: { text: "Basil of Caesarea, Hexaemeron, Homily 2 (about AD 378), in Nicene and Post-Nicene Fathers, 2nd series, vol. 8.", url: "https://www.newadvent.org/fathers/32012.htm" },
      augustine: { text: "Augustine, The Literal Meaning of Genesis (De Genesi ad litteram), about AD 401-415.", url: "https://en.wikipedia.org/wiki/De_Genesi_ad_litteram" },
      kline: "Meredith G. Kline, \"Because It Had Not Rained,\" Westminster Theological Journal 20 (1958): 146-157.",
      kline96: { text: "Meredith G. Kline, \"Space and Time in the Genesis Cosmogony,\" Perspectives on Science and Christian Faith 48 (1996): 2-15.", url: "https://asa3.org/ASA/PSCF3-96Klineold.html" },
      collins: "C. John Collins, Genesis 1-4: A Linguistic, Literary, and Theological Commentary (P&R, 2006).",
      morris: "Henry M. Morris, The Genesis Record (Baker, 1976).",
      ross: { text: "Hugh Ross, A Matter of Days (NavPress, 2004).", url: "https://reasons.org" },
      blocher: "Henri Blocher, In the Beginning (InterVarsity Press, 1984).",
    },
  },

  "GEN.2": {
    crossRefs: [
      ["GEN.1", "Genesis 1:26-31", "Male and female in God's image, blessed and given the earth"],
      ["EXO.20", "Exodus 20:8-11", "The Sabbath, rooted in God's rest on the seventh day"],
      ["EZK.28", "Ezekiel 28:13-14", "Eden, the garden of God, on the holy mountain"],
      ["EZK.47", "Ezekiel 47:1-12", "A river flows from God's house and brings life, with trees for food and healing"],
      ["MAT.19", "Matthew 19:4-6", "Jesus quotes Genesis 2:24 on marriage"],
      ["1CO.15", "1 Corinthians 15:45-49", "The first Adam and the last Adam"],
      ["EPH.5", "Ephesians 5:31-32", "\"The two shall become one flesh\": Christ and the church"],
      ["REV.22", "Revelation 22:1-5", "The river of the water of life and the tree of life, restored"],
    ],
    intro: "God rests on the seventh day. Then the story draws close: the LORD God forms the man from the dust, breathes life into him, plants a garden in Eden with a river and two trees in its middle, and makes the woman as the partner who fits him.",
    map: {
      outline: NEAR_EAST,
      caption: "Genesis 2:10-14 names four rivers. Two are known today, the Tigris and the Euphrates. The Pishon and the Gihon are uncertain, so the two most likely areas for Eden are marked with a question mark. The Bible doesn't give the exact spot.",
      places: [
        { lat: 30.4, lon: 47.9, kind: "eden", side: "left", dy: 14, then: "Eden? (southern view)", now: "Near Basra, Iraq", note: "One of the two leading suggestions. The Tigris and Euphrates join here and flow to the Persian Gulf, and the Karun and a dry Arabian riverbed (Wadi al-Batin) once flowed in nearby. Some think the garden's land now lies under the shallow Gulf. Genesis 2:10-14 names the rivers but not the exact spot." },
        { lat: 38.6, lon: 40.6, kind: "eden", side: "left", dy: -4, then: "Eden? (northern view)", now: "Highlands of eastern Turkey", note: "The other leading suggestion. The Tigris and Euphrates both begin in these mountains, and Genesis says the river flowed out of Eden and then divided (2:10), which sounds like a place upstream, where rivers begin." },
        { lat: 31.0, lon: 47.43, side: "right", dy: -10, then: "Where the rivers join", now: "Al-Qurnah, Iraq", note: "The Tigris and Euphrates meet here and flow on together as the Shatt al-Arab. A local tradition even points out an \"Adam's tree\" in the town." },
        { lat: 38.08, lon: 46.29, side: "left", dy: 4, then: "Eden? (a newer suggestion)", now: "Near Tabriz, Iran", note: "Historian David Rohl suggested a valley here, east of Lake Urmia, and matched the Gihon with the Aras River. Few scholars follow him, but it shows how people try to fit the four rivers." },
        { lat: 32.54, lon: 44.42, side: "left", dy: -6, then: "Babylon", now: "Ruins near Hillah, Iraq", note: "Shinar, the plain of Babylon, is where people moved \"east\" after the flood (11:2). Eden was also \"toward the east\" (2:8)." },
        { lat: 31.78, lon: 35.23, side: "left", then: "Jerusalem", now: "Jerusalem", note: "Israel's temple, decorated with cherubim, palm trees and flowers, recalled the garden where God once walked with people (1 Kings 6:29)." },
      ],
    },
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "2:2", head: "God rested", ev: "scripture", src: ["wenham"], text: "The Hebrew shabat means to stop or cease, the root of the word Sabbath. God was not tired (Isaiah 40:28). He stopped because the work was finished and good, and He blessed the seventh day and made it holy, the first thing in the Bible called holy." },
        { ref: "2:4", head: "The LORD God", ev: "strong", src: ["wenham", "mathews"], text: "Here God's personal name appears for the first time: YHWH, shown in most English Bibles as LORD in small capitals. Genesis 1 calls Him Elohim, the mighty Creator. Genesis 2 joins the two, \"the LORD God,\" the Creator who is also the God who knows His people by name and makes covenants with them." },
        { ref: "2:7", head: "Dust and breath", ev: "strong", src: ["wenham", "halot"], text: "God \"formed\" (yatsar, the word for a potter shaping clay) the man from the dust and breathed into him the breath of life. People are made of the same stuff as the earth, and yet alive with breath from God. Job 33:4: \"The Spirit of God has made me, and the breath of the Almighty gives me life.\"" },
        { ref: "2:9", head: "Two trees in the middle of the garden", ev: "debated", src: ["wenham", "collins"], text: "The tree of life stands for the life God gives; it returns in Proverbs 3:18 and in Revelation 22:2, where its leaves are \"for the healing of the nations.\" The tree of the knowledge of good and evil is the one tree God forbids. Many scholars think \"knowing good and evil\" means deciding for yourself what is good and evil, a right that belongs to God alone. Scripture never names the fruit; the apple came later, from art and from a Latin pun (malum means both \"evil\" and \"apple\")." },
        { ref: "2:10-14", head: "A river and four branches", ev: "debated", src: ["wenham", "sauer"], text: "A river flows out of Eden to water the garden and then divides into four. The Tigris (Hiddekel) and Euphrates are well known. The Pishon flowed around Havilah, a land of gold, and the Gihon around Cush. Their identity is uncertain, which is why scholars still debate where Eden was. See the map." },
        { ref: "2:15", head: "To cultivate it and keep it", ev: "good", src: ["wenham", "walton"], text: "Work came before the fall: Adam was given a garden to tend. The two verbs, avad (serve, work) and shamar (keep, guard), are used together later for the priests' work in the tabernacle (Numbers 3:7-8). Adam was a gardener and something like a priest in God's first sanctuary." },
        { ref: "2:18", head: "A helper suitable for him", ev: "strong", src: ["wenham", "halot"], text: "\"Helper\" (ezer) is no lesser word: it is used most often for God Himself as Israel's help (Psalm 121:1-2). \"Suitable for him\" (kenegdo) means corresponding to him, like a reflection facing him. For the first time something is \"not good\": the man alone." },
        { ref: "2:24", head: "One flesh", ev: "scripture", src: ["mathews"], text: "Jesus quotes this verse as God's design for marriage (Matthew 19:4-6), and Paul sees in it a picture of Christ and the church (Ephesians 5:31-32)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Where was Eden?", ev: "debated", src: ["sauer", "hamblin", "esvmap"], text: "Genesis places the garden \"toward the east\" and ties it to two rivers everyone in Israel knew. That points to Mesopotamia, modern Iraq and its neighbors. Beyond that, scholars differ. The two leading answers are near the head of the Persian Gulf, where the rivers meet, and in the mountains of eastern Turkey, where they begin. Both are marked on the map. See Scholars and views for each case." },
        { head: "Gold, bdellium and onyx", ev: "good", src: ["sauer", "wenham"], text: "Havilah, the land of the Pishon, had \"good gold,\" bdellium (a sweet-smelling resin, or possibly pearls) and onyx (2:11-12). Western Arabia has some of the oldest gold mines in the world, such as Mahd adh-Dhahab, \"cradle of gold,\" still worked today. Later, Havilah is linked with Arabian tribes (Genesis 25:18)." },
        { head: "A royal garden", ev: "good", src: ["dalley2", "wenham"], text: "Ancient kings planted walled parks with streams, fruit trees and animals as signs of their power and wealth. Assyrian kings boasted of theirs, and the Persian word for such a park, pardes, came into Greek as paradeisos and into English as \"paradise.\" Genesis tells of a garden planted by the true King, who walked in it with the people He made (3:8)." },
        { head: "The first sanctuary", ev: "good", src: ["wenham2", "walton"], text: "Eden reads like the first temple. God walks there (3:8, the same verb used of His presence in the tabernacle, Leviticus 26:12). The entrance faces east, and cherubim guard it (3:24), as cherubim were woven into the tabernacle curtain and carved in the temple. Gold and onyx appear again on the high priest's garments (Exodus 28:9-20). The Bible's story moves from this garden to a garden-city where God dwells with His people again (Revelation 21-22)." },
        { head: "What ancient readers thought", ev: "silent", src: ["josephus"], text: "The Jewish historian Josephus (about AD 93) thought the Pishon was the Ganges of India and the Gihon the Nile of Egypt, since Cush is often Ethiopia. Few hold that today, because those rivers can't branch from one source. It shows that readers have wondered about these rivers for two thousand years." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "עֵדֶן", say: "Eden", strongs: "H5731", count: "about 15 times as the place name", means: "Eden; delight", ev: "good", src: ["halot", "wenham"], text: "As a common word, eden means delight or luxury: \"You give them to drink of the river of Your delights\" (Psalm 36:8). Some also link the name to an old Sumerian and Akkadian word, edin, meaning a plain or open steppe. Either way, Eden was a land, and the garden was planted \"toward the east, in Eden\" (2:8)." },
        { word: "גַּן", say: "gan", strongs: "H1588", count: "about 40 times", means: "garden", ev: "strong", src: ["halot"], text: "An enclosed, tended garden or park. The Greek translation of the Old Testament used paradeisos here, and Jesus promised the thief on the cross, \"Today you shall be with Me in Paradise\" (Luke 23:43)." },
        { word: "אָדָם / אֲדָמָה", say: "adam / adamah", strongs: "H120 + H127", count: "adam about 550 times; adamah about 225 times", means: "man / ground", ev: "strong", src: ["halot", "wenham"], text: "God formed the adam (man) from the adamah (ground). The wordplay ties people to the earth they were made to tend, and it returns with sorrow in 3:19: \"you are dust, and to dust you shall return.\"" },
        { word: "עֵזֶר כְּנֶגְדּוֹ", say: "ezer kenegdo", strongs: "H5828 + H5048", count: "ezer 21 times", means: "a helper corresponding to him", ev: "strong", src: ["halot", "wenham"], text: "Ezer is used of God as His people's helper (Exodus 18:4; Psalm 33:20; 121:1-2). Kenegdo means \"like what is opposite him\": a partner who matches and completes, not a servant." },
        { word: "חִדֶּקֶל", say: "Hiddekel", strongs: "H2313", count: "2 times (Genesis 2:14, Daniel 10:4)", means: "the Tigris", ev: "strong", src: ["halot"], text: "The Hebrew form of the old Akkadian name for the Tigris, Idiqlat. Daniel later stood \"by the bank of the great river, that is, the Hiddekel\" (Daniel 10:4). The Euphrates is Perath (H6578), still called the Firat in Turkish today." },
      ] },
      { id: "views", title: "Where was Eden?", items: [
        { head: "At the head of the Persian Gulf", who: "Southern view", src: ["sauer", "hamblin", "esvmap"], text: "The Tigris and Euphrates meet in southern Iraq and flow to the Gulf. Archaeologist Juris Zarins proposed that the Gihon is the Karun River, which flows down from Iran into the same spot, and that the Pishon is the Wadi al-Batin, a riverbed now dry that once carried water across Arabia from the gold country of the west. In the 1990s, James Sauer pointed to satellite images showing this ancient river channel. Zarins also noted that the Gulf was dry land during the last Ice Age and filled as the seas rose, so the garden's land may now lie under water.", ask: "Critics note that Genesis says one river flowed out of Eden and then divided (2:10). At the Gulf, four rivers come together; they don't split apart." },
        { head: "In the mountains where the rivers begin", who: "Northern view", src: ["ligonier", "rohl"], text: "If the river flowed out of Eden and then divided into four \"heads\" (2:10), Eden sounds like high ground where rivers start. The Tigris and Euphrates both rise in the highlands of eastern Turkey, near Lake Van, not far from the mountains of Ararat where the ark came to rest (8:4). Some match the other two rivers with streams of the same region, such as the Aras, which flows to the Caspian Sea. Historian David Rohl placed Eden in a valley near Tabriz, Iran.", ask: "Critics reply that no single spring feeds all four rivers in those mountains, and the Pishon and Gihon are still guesses." },
        { head: "Reshaped by the flood", who: "Lost geography", src: ["morris"], text: "If Noah's flood changed the face of the earth, the rivers Noah's family later named may have carried the old names to new rivers, the way settlers in America named new towns after old ones. On this view, the original Eden can't be found on any modern map.", ask: "Others point out that Genesis 2 speaks of Assyria and Cush in the writer's own day, as if readers could still find the rivers." },
        { head: "A real place that points beyond itself", who: "Theological geography", src: ["wenham2", "walton"], text: "Many scholars stress what Eden means more than where it was. Ezekiel calls it \"the garden of God\" on \"the holy mountain of God\" (Ezekiel 28:13-14). Rivers flowing out of God's place return in Ezekiel 47 and Revelation 22:1-2, where the river of life flows from God's throne past the tree of life. Eden is the first place God lived with His people, and the Bible ends with that home restored." },
        { head: "What all of them agree on", who: "Common ground", src: ["mathews"], text: "Genesis presents Eden as a real place in a real world, named with rivers its first readers knew. People were made to live with God, to work and to keep His garden. The way back was closed (3:24), and Jesus opens it again: \"To him who overcomes, I will grant to eat of the tree of life which is in the Paradise of God\" (Revelation 2:7)." },
      ] },
    ],
    sources: {
      wenham: "Gordon J. Wenham, Genesis 1-15, Word Biblical Commentary 1 (Word, 1987).",
      mathews: "Kenneth A. Mathews, Genesis 1-11:26, New American Commentary (Broadman & Holman, 1996).",
      collins: "C. John Collins, Genesis 1-4: A Linguistic, Literary, and Theological Commentary (P&R, 2006).",
      walton: "John H. Walton, Genesis, NIV Application Commentary (Zondervan, 2001).",
      halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
      wenham2: "Gordon J. Wenham, \"Sanctuary Symbolism in the Garden of Eden Story,\" Proceedings of the Ninth World Congress of Jewish Studies (1986): 19-25.",
      sauer: { text: "James A. Sauer, \"The River Runs Dry,\" Biblical Archaeology Review 22:4 (1996); reported in Christianity Today, October 7, 1996.", url: "https://www.christianitytoday.com/1996/10/do-photos-evidence-lost-edenic-river/" },
      hamblin: "Dora Jane Hamblin, \"Has the Garden of Eden Been Located at Last?\" Smithsonian 18, no. 2 (May 1987): 127-135. On the work of Juris Zarins.",
      esvmap: { text: "ESV Global Study Bible, map \"The Garden of Eden\" (Crossway).", url: "https://esv.org/resources/esv-global-study-bible/map-01-02" },
      ligonier: { text: "Ligonier Ministries, \"Where Was the Garden of Eden?\"", url: "https://learn.ligonier.org/articles/where-was-the-garden-of-eden" },
      rohl: "David M. Rohl, Legend: The Genesis of Civilisation (Century, 1998).",
      dalley2: "Stephanie Dalley, The Mystery of the Hanging Garden of Babylon (Oxford University Press, 2013).",
      josephus: { text: "Josephus, Antiquities of the Jews 1.38-39 (about AD 93).", url: "https://penelope.uchicago.edu/Josephus/ant-1.html" },
      morris: "Henry M. Morris, The Genesis Record (Baker, 1976).",
    },
  },

  "LUK.5": {
    crossRefs: [
      ["MAT.4", "Matthew 4:18-22", "Jesus calls Peter, Andrew, James and John"],
      ["MRK.1", "Mark 1:16-20", "\"I will make you fishers of men\""],
      ["JHN.21", "John 21:1-14", "Another great catch, after the resurrection"],
      ["JER.16", "Jeremiah 16:16", "\"I am going to send for many fishermen\""],
      ["ISA.6", "Isaiah 6:5", "\"Woe is me\": a sinner before a holy God"],
      ["LEV.14", "Leviticus 14", "The law for a cleansed leper (5:14)"],
      ["MRK.2", "Mark 2:1-22", "The paralyzed man, Levi, and the question about fasting"],
      ["MAT.9", "Matthew 9:9-13", "Matthew the tax collector follows Jesus"],
    ],
    intro: "Jesus teaches from Simon's boat, fills the nets with fish, and calls fishermen to follow Him. Then He heals a leper and a paralyzed man and calls Levi the tax collector.",
    map: {
      outline: GALILEE,
      caption: "Luke calls it the Lake of Gennesaret. John calls it the Sea of Tiberias (John 6:1). Today in Israel it is Lake Kinneret.",
      places: [
        { lat: 32.881, lon: 35.575, then: "Capernaum", now: "Capernaum National Park", note: "Jesus' base in Galilee and home of Simon Peter. Visitors see a later synagogue built over an older one, and a house that early Christians honored as Peter's." },
        { lat: 32.846, lon: 35.522, then: "Plain of Gennesaret", now: "Kibbutz Ginosar: the Galilee Boat museum", note: "The fertile plain that gave the lake one of its names. The 2,000-year-old fishing boat found in 1986 is shown here." },
        { lat: 32.825, lon: 35.516, then: "Magdala (Taricheae)", now: "Migdal", note: "A fishing town known for salting fish, which is what its Greek name means. Home of Mary Magdalene." },
        { lat: 32.794, lon: 35.531, then: "Tiberias (founded about AD 20)", now: "Tiberias", note: "Herod Antipas built it as his new capital and named it for Emperor Tiberius." },
        { lat: 32.873, lon: 35.549, side: "left", then: "Seven springs", now: "Tabgha", note: "Warm springs flow into the lake here, and in winter fish gather in the warm water near shore." },
        { lat: 32.91, lon: 35.63, then: "Bethsaida", now: "et-Tell or el-Araj (site debated)", note: "Hometown of Peter, Andrew and Philip (John 1:44). Archaeologists still debate which site it was." },
      ],
    },
    sections: [
      { id: "history", title: "History and culture", items: [
        { head: "A real boat from Jesus' time", ev: "strong", src: ["wachsmann"], text: "In 1986, during a drought, two brothers from Kibbutz Ginosar found a wooden fishing boat in the mud. It dates from about 1st century BC to 1st century AD and is about 27 feet long and 7.5 feet wide, built from about a dozen kinds of wood and patched many times. A boat like this could carry a crew of fishermen and their nets. Nothing ties it to Jesus or His disciples, but it shows the kind of boat Simon owned." },
        { head: "Three kinds of nets", ev: "good", src: ["nun"], text: "Gospel writers use different words for different nets. A cast net (Mark 1:16) is thrown by one man in shallow water. A seine or dragnet (Matthew 13:47) is pulled through the water by a team. Luke 5 uses diktyon, the general word for a net, and the heavy trammel nets set at night fit the scene. Fishermen washed and mended these nets after every night of work (5:2)." },
        { head: "Fishing was a business", ev: "good", src: ["nun", "strabo", "green"], text: "Simon had partners, James and John (5:10), and Mark mentions hired men (Mark 1:20). Towns like Magdala salted fish for sale, and its Greek name, Taricheae, means \"salted-fish town.\" Leaving their boats was leaving a working family business." },
        { head: "Through the roof", ev: "debated", src: ["bock", "green"], text: "Galilean houses had flat roofs of beams, branches and packed mud, reached by an outside stair. Luke says the friends lowered the man \"through the tiles\" (5:19), while Mark says they dug through (Mark 2:4). Many think Luke used a word his Greek-speaking readers would picture. Others note that some houses did use tiles." },
        { head: "Why they fished at night", ev: "good", src: ["nun"], text: "In clear daylight fish can see a net and swim away, so the heavy trammel nets were set at night. Simon's \"we worked hard all night\" (5:5) describes the normal way to fish. Letting the nets down in daytime, in deep water, was not what an expert would expect to work, which makes his \"but I will do as You say\" all the more striking." },
        { head: "St. Peter's fish", ev: "good", src: ["nun"], text: "The lake's best-known fish is a tilapia (Sarotherodon galilaeus), served today as \"St. Peter's fish.\" Tilapia swim in large schools, which helps picture a catch big enough to tear the nets and nearly sink two boats (5:6-7). Luke tells it as a sign of who Jesus is: Simon's answer is not \"good fishing\" but \"I am a sinful man, Lord\" (5:8)." },
        { head: "Levi at the tax booth", ev: "good", src: ["green", "bock"], text: "Capernaum sat on a road near the border between Herod Antipas' territory and Philip's, so tolls were collected there. Tax collectors were seen as cheats who worked with foreign powers, which is why the religious leaders objected to Jesus eating with them (5:30)." },
      ] },
      { id: "geography", title: "Geography", items: [
        { head: "The lowest freshwater lake on earth", ev: "strong", src: ["britannica", "josephus"], text: "The lake's surface lies about 690 feet (210 meters) below sea level. It is about 13 miles long and 8 miles wide, fed by the Jordan River from the north. The Jewish historian Josephus praised its sweet water and its many kinds of fish." },
        { head: "Sudden storms", ev: "strong", src: ["britannica"], text: "Hills rise steeply around the lake. Cool air from the heights can rush down onto the warm water and stir up strong winds quickly, as in the storm of Luke 8:22-25." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "Ἐπιστάτα", say: "epistata", strongs: "G1988", count: "7 times, all in Luke", means: "Master", ev: "strong", src: ["bdag", "bock"], text: "A title for someone in charge, like a foreman or overseer. Only Luke uses it in the New Testament. Simon starts with \"Master\" (5:5) and ends with \"Lord\" (5:8)." },
        { word: "δίκτυα", say: "diktya", strongs: "G1350", count: "12 times, all in the fishing stories of the Gospels", means: "nets", ev: "good", src: ["nun", "bdag"], text: "The general word for fishing nets. Here they are the heavy night nets the men were washing (5:2)." },
        { word: "ζωγρῶν", say: "zōgrōn", strongs: "G2221", count: "2 times (Luke 5:10 and 2 Timothy 2:26)", means: "catching alive", ev: "strong", src: ["bdag", "green"], text: "Jesus says \"from now on you will be catching people\" (5:10). The word means to take alive, used elsewhere for capturing people alive in war. Fish caught in nets die. People caught by the gospel are brought to life." },
        { word: "ἁμαρτωλός", say: "hamartōlos", strongs: "G268", count: "about 47 times", means: "sinner", ev: "strong", src: ["bdag"], text: "Simon calls himself this (5:8), and the Pharisees use it for Levi's friends (5:30). Jesus answers that He came to call sinners to repentance (5:32)." },
      ] },
      { id: "views", title: "How Christians read it", items: [
        { head: "Two separate catches", who: "Most readers", src: ["bock"], text: "Luke 5 at the start of Jesus' ministry and John 21 after the resurrection are two different events. The second deliberately echoes the first as Jesus restores Peter." },
        { head: "One story told two ways", who: "Some scholars", src: ["brown"], text: "Some scholars, such as Raymond Brown, think Luke 5 and John 21 come from one remembered event that the Gospel writers placed differently." },
        { head: "Called to leave everything", who: "Common ground", src: ["green", "bock"], text: "Whatever their view of the details, readers agree on the heart of it: Jesus calls ordinary working people, and they leave everything to follow Him (5:11, 5:28)." },
      ] },
    ],
    sources: {
      wachsmann: "Shelley Wachsmann, The Sea of Galilee Boat: An Extraordinary 2000 Year Old Discovery (Plenum, 1995).",
      nun: "Mendel Nun, The Sea of Galilee and Its Fishermen in the New Testament (Kibbutz Ein Gev, 1989).",
      strabo: "Strabo, Geography 16.2.45 (the salted fish of Taricheae).",
      josephus: { text: "Josephus, Jewish War 3.506-521 (the lake of Gennesar and its fish).", url: "https://www.gutenberg.org/ebooks/2850" },
      britannica: { text: "Encyclopaedia Britannica, \"Sea of Galilee.\"", url: "https://www.britannica.com/place/Sea-of-Galilee" },
      bock: "Darrell L. Bock, Luke 1:1-9:50, Baker Exegetical Commentary (Baker, 1994).",
      green: "Joel B. Green, The Gospel of Luke, New International Commentary (Eerdmans, 1997).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
      brown: "Raymond E. Brown, The Gospel According to John XIII-XXI, Anchor Bible (Doubleday, 1970).",
    },
  },

  "GEN.3": {
    crossRefs: [
      ["ROM.5", "Romans 5:12-19", "Through one man sin entered the world; through one Man, the gift of life"],
      ["1CO.15", "1 Corinthians 15:21-22", "As in Adam all die, so in Christ all will be made alive"],
      ["GAL.4", "Galatians 4:4", "God sent forth His Son, born of a woman"],
      ["HEB.2", "Hebrews 2:14", "Through death He rendered powerless him who had the power of death"],
      ["REV.12", "Revelation 12:9", "The serpent of old who is called the devil and Satan"],
      ["REV.22", "Revelation 22:2-3", "The tree of life again, and no longer any curse"],
    ],
    intro: "The saddest chapter in Genesis, and one of the most hopeful. A cunning serpent questions God's word, the man and the woman eat from the one forbidden tree, and they hide. Yet God comes looking for them, clothes them, and speaks the Bible's first promise that evil will one day be crushed.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "3:1", head: "More crafty than any beast", ev: "strong", src: ["wenham", "mathews"], text: "A wordplay links the chapters: the man and woman were arummim, \"naked\" (2:25), and the serpent was arum, \"crafty\" (3:1). In Proverbs the same word can mean prudent (Proverbs 12:16), so it is cleverness that can go either way. The serpent's first move is a question that twists God's generous \"from any tree you may eat freely\" (2:16) into \"you shall not eat from any tree.\"" },
        { ref: "3:4", head: "\"You surely will not die!\"", ev: "scripture", src: ["wenham"], text: "The serpent contradicts God word for word, the first lie in the Bible. Jesus later calls the devil \"a liar and the father of lies\" who \"was a murderer from the beginning\" (John 8:44)." },
        { ref: "3:6", head: "Good for food, a delight, desirable", ev: "good", src: ["mathews", "collins"], text: "Three steps of temptation: the fruit looked good to eat, lovely to see, and promised wisdom. Many readers hear an echo in 1 John 2:16, \"the lust of the flesh and the lust of the eyes and the boastful pride of life,\" and in the three temptations of Jesus in the wilderness, where He answered each one with Scripture (Matthew 4:1-11)." },
        { ref: "3:8", head: "The sound of the LORD God walking", ev: "debated", src: ["niehaus", "wenham"], text: "Most translations say God walked \"in the cool of the day,\" literally \"at the wind (ruach) of the day,\" the breezy evening. Hebrew scholar Jeffrey Niehaus argued in a peer-reviewed article that the phrase can mean \"in the wind of the storm,\" a mighty approach of God like the thunder at Sinai. Either way, the guilty pair hid from the God who once walked with them." },
        { ref: "3:9", head: "\"Where are you?\"", ev: "scripture", src: ["wenham", "walton"], text: "The first question God asks in the Bible. The all-knowing God doesn't need the answer; He is inviting the man to come out and speak. The questions continue: \"Who told you?\" \"What is this you have done?\" God seeks before He judges." },
        { ref: "3:15", head: "He shall bruise you on the head", ev: "debated", src: ["collins2", "irenaeus", "wenham"], text: "Often called the protoevangelium, the \"first gospel.\" Since at least Irenaeus (about AD 180), Christians have read it as a promise of one descendant of the woman who would crush the serpent while being wounded Himself. Linguist C. John Collins showed in a peer-reviewed study that when the Hebrew word \"seed\" takes singular pronouns, as \"he\" does here, it usually points to one person. Other scholars read it as the long struggle between humanity and evil." },
        { ref: "3:21", head: "Garments of skin", ev: "good", src: ["wenham", "mathews"], text: "Fig leaves were their own idea; God makes them lasting clothes. The first thing God does after the judgment is an act of care. Many readers note that it cost an animal its life, the first hint of the sacrifices to come." },
        { ref: "3:24", head: "Cherubim and the flaming sword", ev: "good", src: ["wenham2", "walton"], text: "Cherubim guard the way back to the tree of life, on the east side. Later, cherubim were woven into the tabernacle veil (Exodus 26:31) that closed off the Most Holy Place. When Jesus died, that veil was torn from top to bottom (Matthew 27:51), and the tree of life stands open again in Revelation 22:2." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Serpents in the ancient world", ev: "good", src: ["walton", "hoffmeier"], text: "Neighboring peoples feared and honored snakes. Egypt's pharaohs wore a rearing cobra, the uraeus, on their crowns, and Egyptian texts are full of spells against serpents. In the Babylonian Epic of Gilgamesh, a snake steals the plant that would have made the hero young again. Genesis turns this around: the serpent is only a creature God made (3:1), and it is put under a curse." },
        { head: "Why \"apple\"?", ev: "good", src: ["mathews"], text: "Genesis never names the fruit. The apple came from European art and a pun in Latin, where malum means both \"evil\" and \"apple.\" Jewish teachers guessed a fig, grapes, wheat or a citron." },
        { head: "Three thousand years of readers", ev: "good", src: ["irenaeus", "collins"], text: "Genesis 3 is one of the most discussed chapters ever written. Paul builds Romans 5 on it, John Milton's Paradise Lost (1667) retold it in more than 10,000 lines of poetry, and its words \"by the sweat of your face\" are still a common saying." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "נָחָשׁ", say: "nachash", strongs: "H5175", count: "about 31 times", means: "serpent, snake", ev: "strong", src: ["halot"], text: "The ordinary word for a snake. It is also the bronze serpent Moses lifted up (Numbers 21:9), which Jesus compared to His own lifting up on the cross (John 3:14)." },
        { word: "אַיֶּכָּה", say: "ayyekkah", strongs: "H335", count: "once in this form", means: "where are you?", ev: "strong", src: ["halot", "wenham"], text: "One short word in Hebrew. Jewish and Christian writers have long heard it as God's question to every person who hides." },
        { word: "זֶרַע", say: "zera", strongs: "H2233", count: "about 229 times", means: "seed, offspring", ev: "strong", src: ["halot", "collins2"], text: "Like the English word \"offspring,\" it can mean one child or many descendants. Paul makes a point of this in Galatians 3:16: \"to your seed,\" that is, Christ." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "A real first couple in history", who: "Historical reading", src: ["collins", "mathews"], text: "Many scholars read Adam and Eve as real people whose choice brought sin and death into the world. They point to the family line from Adam to Abraham (Genesis 5; 11), and to Jesus and Paul, who speak of Adam as a real person (Matthew 19:4; Romans 5:14)." },
        { head: "History told in picture language", who: "Literary-historical reading", src: ["wenham", "walton"], text: "Others say Genesis 3 tells something that truly happened using symbols ancient readers knew well: a talking serpent, sacred trees and guardian cherubim. The point is real: people turned from God and the world was changed. The details are painted, not photographed." },
        { head: "Every person's story", who: "Representative reading", src: ["walton"], text: "Some scholars stress that \"Adam\" means \"human,\" so the chapter is also the story of every one of us: tempted, doubting God's goodness, hiding, blaming. Most who hold this still see a real beginning to human sin behind it." },
      ] },
    ],
    sources: {
      wenham: "Gordon J. Wenham, Genesis 1-15, Word Biblical Commentary 1 (Word, 1987).",
      wenham2: "Gordon J. Wenham, \"Sanctuary Symbolism in the Garden of Eden Story,\" Proceedings of the Ninth World Congress of Jewish Studies (1986): 19-25.",
      mathews: "Kenneth A. Mathews, Genesis 1-11:26, New American Commentary (Broadman & Holman, 1996).",
      collins: "C. John Collins, Genesis 1-4: A Linguistic, Literary, and Theological Commentary (P&R, 2006).",
      collins2: "C. John Collins, \"A Syntactical Note (Genesis 3:15): Is the Woman's Seed Singular or Plural?\" Tyndale Bulletin 48, no. 1 (1997): 139-148.",
      niehaus: "Jeffrey J. Niehaus, \"In the Wind of the Storm: Another Look at Genesis III 8,\" Vetus Testamentum 44, no. 2 (1994): 263-267.",
      walton: "John H. Walton, Genesis, NIV Application Commentary (Zondervan, 2001).",
      halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
      irenaeus: "Irenaeus of Lyon, Against Heresies 5.21 (about AD 180).",
      hoffmeier: "James K. Hoffmeier, Israel in Egypt: The Evidence for the Authenticity of the Exodus Tradition (Oxford University Press, 1997).",
    },
  },

  "EXO.14": {
    crossRefs: [
      ["EXO.15", "Exodus 15:1-21", "The Song of the Sea, one of the oldest poems in the Bible"],
      ["PSA.77", "Psalm 77:16-20", "Your way was in the sea, though Your footprints were not seen"],
      ["ISA.43", "Isaiah 43:16-19", "The LORD who makes a way through the sea will do a new thing"],
      ["1CO.10", "1 Corinthians 10:1-2", "Our fathers all passed through the sea"],
      ["HEB.11", "Hebrews 11:29", "By faith they passed through the Red Sea as though on dry land"],
      ["JOS.4", "Joshua 4:23", "The Jordan dried up as the Red Sea was dried up"],
    ],
    intro: "Trapped between the sea and Pharaoh's chariots, Israel panics. Moses answers, \"The LORD will fight for you while you keep silent.\" An east wind blows all night, the waters part, and a nation of former slaves walks through on dry ground. It is the Old Testament's great picture of rescue.",
    map: {
      outline: SINAI,
      maybe: "Possible crossing site",
      caption: "The exact crossing point is not known, and scholars suggest several. The main proposals are marked. Exodus gives names (Pi-hahiroth, Migdol, Baal-zephon) that have not been located for certain.",
      places: [
        { lat: 30.8, lon: 31.83, side: "left", then: "Rameses", now: "Qantir, Egypt", note: "Israel set out from Rameses (12:37). Excavations at Qantir found the great city Pi-Ramesses, built under Ramesses II in the 1200s BC." },
        { lat: 30.55, lon: 32.1, side: "left", dy: 12, then: "Succoth", now: "Tell el-Maskhuta", note: "The first stop (12:37). Many identify it with the region of Tjeku in the Wadi Tumilat, a natural route east out of Egypt." },
        { lat: 30.4, lon: 32.38, kind: "eden", side: "right", dy: -8, then: "Crossing? (lakes view)", now: "Lake Timsah / Bitter Lakes", note: "Many scholars, including James Hoffmeier, favor the lakes and marshes along today's Suez Canal. Yam suph can mean \"Sea of Reeds,\" and reeds grow in fresh or brackish water like these." },
        { lat: 29.9, lon: 32.6, kind: "eden", side: "right", dy: 4, then: "Crossing? (Gulf of Suez)", now: "Head of the Gulf of Suez", note: "Others place the crossing at the northern tip of the Red Sea's western arm, deep water that fits \"the waters were a wall to them.\"" },
        { lat: 28.97, lon: 34.65, kind: "eden", side: "left", then: "Crossing? (Gulf of Aqaba)", now: "Nuweiba, Egypt", note: "A smaller group places it across the Gulf of Aqaba, with Mount Sinai in Arabia. Most archaeologists find little support for this view." },
        { lat: 28.54, lon: 33.97, side: "left", then: "Mount Sinai?", now: "Jebel Musa", note: "The traditional Mount Sinai, honored since at least the 300s AD, where St. Catherine's Monastery stands today." },
      ],
    },
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "14:2", head: "Turn back and camp by the sea", ev: "good", src: ["hoffmeier", "stuart"], text: "God leads Israel into what looks like a trap on purpose, so that Pharaoh will think they are lost and \"shut in by the wilderness\" (14:3). Migdol is an Egyptian word for a watchtower, and Baal-zephon was the name of a god, so these were likely a border fort and a shrine on Egypt's eastern frontier." },
        { ref: "14:7", head: "Six hundred select chariots", ev: "strong", src: ["kitchen"], text: "Egypt's two-man chariots were the tanks of the ancient world, light and fast on flat ground. Egyptian reliefs of Ramesses II at the Battle of Kadesh (about 1274 BC) show hundreds of them in action. In mud or sand their wheels were a weakness, as 14:25 notes." },
        { ref: "14:13", head: "Do not fear! Stand by and see", ev: "scripture", src: ["durham"], text: "Three commands to a terrified crowd: do not fear, stand firm, see. Then the line many have taken to heart in hard times: \"The LORD will fight for you while you keep silent\" (14:14)." },
        { ref: "14:19", head: "The angel and the pillar", ev: "scripture", src: ["stuart"], text: "The pillar of cloud moves from the front of Israel to the back, standing between the two camps. It is dark to Egypt and light to Israel all night (14:20), the same cloud that would later fill the tabernacle (40:34)." },
        { ref: "14:21", head: "A strong east wind all night", ev: "good", src: ["drews", "stuart"], text: "The Bible says God used a wind, and it took all night. A 2010 peer-reviewed study in PLoS ONE by Carl Drews and Weiqing Han modeled a steady wind of about 63 miles per hour blowing for 12 hours over a shallow lagoon in the eastern Nile Delta. It could push the water back and open a land bridge about 2.5 miles long and 3 miles wide for about four hours. Science can describe how a wind moves water; Exodus tells us who sent it, and when." },
        { ref: "14:22", head: "The waters were like a wall", ev: "scripture", src: ["durham"], text: "\"Wall\" is the ordinary Hebrew word for a city wall (chomah). The poem in the next chapter says the waters \"stood up like a heap\" (15:8). The writers want us to see a way made where there was none." },
        { ref: "14:31", head: "They believed in the LORD and in Moses", ev: "scripture", src: ["stuart"], text: "The chapter ends with fear turned to faith: the people \"feared the LORD\" in a new way, with awe instead of panic. The first time Israel is said to believe the LORD in Exodus was in 4:31; here it is tested and made firm." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Israel in Egyptian records", ev: "strong", src: ["kitchen", "hoffmeier"], text: "The Merneptah Stele, carved about 1208 BC and now in the Cairo Museum, is the oldest mention of Israel outside the Bible: \"Israel is laid waste, his seed is not.\" It shows Israel was already a people in Canaan by then. Egyptian texts never mention the exodus; ancient kings rarely recorded their defeats." },
        { head: "When did it happen?", ev: "debated", src: ["kitchen", "hoffmeier", "stuart"], text: "Scholars propose two main dates. An earlier date, about 1446 BC, comes from 1 Kings 6:1 (480 years before Solomon's temple). A later date, about 1260 BC, fits the city name Rameses (Exodus 1:11) and building in the time of Ramesses II. Both views are held by careful scholars who accept the event as historical." },
        { head: "Remembered every year", ev: "good", src: ["durham"], text: "For more than three thousand years, Jewish families have retold this night at Passover. Israel's poets sing of it again and again (Psalms 66, 77, 78, 106, 114, 136), and Paul sees in it a picture of baptism (1 Corinthians 10:1-2)." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "יַם־סוּף", say: "yam suph", strongs: "H3220 + H5488", count: "about 24 times", means: "Sea of Reeds; the Red Sea", ev: "debated", src: ["halot", "hoffmeier"], text: "Suph is the word for the reeds where baby Moses' basket was placed (2:3). So many scholars translate \"Sea of Reeds.\" Yet the same name is used for the Gulf of Aqaba (1 Kings 9:26), so it can mean the Red Sea and its gulfs too. The ancient Greek translation called it the Red Sea, and most English Bibles follow." },
        { word: "יְשׁוּעָה", say: "yeshuah", strongs: "H3444", count: "about 78 times", means: "salvation, rescue", ev: "strong", src: ["halot"], text: "\"See the salvation of the LORD\" (14:13) uses the word that gives us the name Yeshua, Jesus: \"the LORD saves.\"" },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "A miracle that used nature", who: "Providential view", src: ["stuart", "drews"], text: "Many scholars stress that the text itself names the means: a strong east wind all night (14:21). The miracle is in the timing, the place and the outcome: the sea opens when Moses lifts his staff and closes on the army at dawn." },
        { head: "A miracle beyond nature", who: "Supernatural view", src: ["durham", "kitchen"], text: "Others point out that walls of water standing on both sides (14:22) go beyond what any wind alone could do. On this view, the wind is part of the story, but the event is a direct act of God that cannot be explained by natural forces." },
        { head: "Where it happened", who: "Location debate", src: ["hoffmeier", "kitchen"], text: "Scholars who accept the event still disagree on the place: the lakes along today's Suez Canal, the Gulf of Suez, or less often the Gulf of Aqaba. The map shows each. Exodus gives local place names that were clear to its first readers but have not been found for certain." },
      ] },
    ],
    sources: {
      hoffmeier: "James K. Hoffmeier, Israel in Egypt: The Evidence for the Authenticity of the Exodus Tradition (Oxford University Press, 1997).",
      kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
      stuart: "Douglas K. Stuart, Exodus, New American Commentary (B&H, 2006).",
      durham: "John I. Durham, Exodus, Word Biblical Commentary 3 (Word, 1987).",
      halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
      drews: { text: "Carl Drews and Weiqing Han, \"Dynamics of Wind Setdown at Suez and the Eastern Nile Delta,\" PLoS ONE 5, no. 8 (2010): e12481.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2932978/" },
    },
  },

  "PSA.1": {
    crossRefs: [
      ["JER.17", "Jeremiah 17:7-8", "Blessed is the man who trusts in the LORD; he will be like a tree planted by the water"],
      ["JOS.1", "Joshua 1:8", "Meditate on it day and night"],
      ["PSA.2", "Psalm 2:12", "How blessed are all who take refuge in Him: the other half of the doorway"],
      ["PSA.119", "Psalm 119:97", "O how I love Your law! It is my meditation all the day"],
      ["MAT.7", "Matthew 7:24-27", "Two builders, two foundations, two endings"],
      ["MAT.3", "Matthew 3:12", "He will gather His wheat, but the chaff He will burn"],
    ],
    intro: "Six verses that open the whole book of Psalms. Two ways of life, two pictures (a fruitful tree and blowing chaff), and two endings. Happiness, the psalm says, grows from delighting in God's word.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "1:1", head: "How blessed is the man", ev: "strong", src: ["craigie", "halot"], text: "The first word of the Psalms is ashre, \"oh, the happiness of!\" It is an exclamation more than a rule. The verse describes a slow slide: walking with the wicked, then standing with sinners, then sitting with scoffers. Walk, stand, sit: bad company becomes a home." },
        { ref: "1:2", head: "His delight is in the law of the LORD", ev: "good", src: ["craigie", "wilson"], text: "\"Law\" is torah, which means instruction or teaching, all that God has revealed, not only commands. \"Meditates\" (hagah) means to murmur or speak softly; ancient readers read aloud, so meditation meant saying God's words over and over, \"day and night.\"" },
        { ref: "1:3", head: "Like a tree firmly planted", ev: "good", src: ["craigie", "goldingay"], text: "In a dry land, a tree beside irrigation channels (\"streams\" is the word for canals) stays green when the rains fail. Jeremiah 17:8 adds that such a tree \"will not fear when the heat comes.\" Its fruit comes \"in its season\": growth that is steady, not instant." },
        { ref: "1:4", head: "Like chaff which the wind drives away", ev: "strong", src: ["craigie"], text: "At harvest, farmers tossed grain into the air with a winnowing fork on a hilltop threshing floor. The heavy grain fell back down; the light husks blew away. The wicked are not described as evil-looking, only as weightless." },
        { ref: "1:6", head: "The LORD knows the way of the righteous", ev: "scripture", src: ["goldingay"], text: "\"Knows\" here means cares for and watches over, as in a close relationship. The psalm ends on the word \"perish\" (to'bed), but it begins with \"blessed\": a choice set before every reader." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The doorway to the Psalms", ev: "good", src: ["wilson", "craigie"], text: "Psalm 1 has no title and no author named. Many scholars think it was placed first on purpose, with Psalm 2, as an introduction to all 150 psalms. Psalm 1 begins with \"blessed\" and Psalm 2 ends with \"blessed\" (2:12), framing the doorway. Some early manuscripts of Acts 13:33 even count Psalm 2 as \"the first psalm.\"" },
        { head: "By the numbers", ev: "strong", src: ["craigie"], text: "Psalms is the longest book in the Bible: 150 psalms and 2,461 verses, divided into five books (1-41, 42-72, 73-89, 90-106, 107-150). Psalm 1 has just 6 verses; Psalm 117 has 2 and Psalm 119 has 176." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "אַשְׁרֵי", say: "ashre", strongs: "H835", count: "45 times, 26 of them in the Psalms", means: "how blessed, how happy", ev: "strong", src: ["halot"], text: "Always in the plural, as if to say \"oh, the many joys of.\" Jesus' Beatitudes in Matthew 5 use the Greek word that the ancient Greek Bible used for ashre." },
        { word: "הָגָה", say: "hagah", strongs: "H1897", count: "about 25 times", means: "to meditate, murmur, growl", ev: "strong", src: ["halot"], text: "The same verb describes a lion growling over its prey (Isaiah 31:4) and a dove moaning (Isaiah 38:14). Meditation, in the Bible, is not emptying the mind but chewing on God's word out loud." },
      ] },
    ],
    sources: {
      craigie: "Peter C. Craigie, Psalms 1-50, Word Biblical Commentary 19 (Word, 1983).",
      goldingay: "John Goldingay, Psalms 1-41, Baker Commentary on the Old Testament (Baker, 2006).",
      wilson: "Gerald H. Wilson, The Editing of the Hebrew Psalter, SBL Dissertation Series 76 (Scholars Press, 1985).",
      halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
    },
  },

  "ISA.53": {
    crossRefs: [
      ["ISA.52", "Isaiah 52:13-15", "The song begins: My servant will prosper and be high and lifted up"],
      ["ACT.8", "Acts 8:30-35", "Philip explains this chapter to an Ethiopian official"],
      ["1PE.2", "1 Peter 2:22-25", "By His wounds you were healed"],
      ["MAT.8", "Matthew 8:16-17", "He Himself took our infirmities"],
      ["LUK.22", "Luke 22:37", "He was numbered with transgressors"],
      ["MRK.15", "Mark 15:27-28", "Crucified between two robbers"],
    ],
    intro: "The fourth and best-known Servant Song (52:13-53:12). A servant of the LORD is despised, wounded and silent like a lamb, and dies for the sins of others. Then, astonishingly, he sees light and is raised high. The New Testament quotes or echoes this chapter more than any other passage in Isaiah.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "53:1", head: "Who has believed our message?", ev: "scripture", src: ["oswalt"], text: "The speakers seem to be those who once misjudged the servant and now confess their mistake. John 12:38 and Romans 10:16 both quote this verse about people who did not believe the good news about Jesus." },
        { ref: "53:2", head: "A root out of parched ground", ev: "good", src: ["motyer", "oswalt"], text: "A small shoot pushing up through dry, hard soil, with nothing about his looks to draw a crowd. Isaiah used the same picture of a shoot from the stump of Jesse, David's father (11:1)." },
        { ref: "53:5", head: "Pierced through for our transgressions", ev: "strong", src: ["oswalt", "halot"], text: "\"Pierced\" (mecholal) means wounded through, often fatally. Notice the small words: he was wounded for \"our\" sins, and by \"his\" wounds \"we\" are healed. Scholars call this substitution: one suffers in the place of many. Peter quotes it in 1 Peter 2:24." },
        { ref: "53:7", head: "Like a lamb led to slaughter", ev: "scripture", src: ["oswalt"], text: "Silent before his accusers, as Jesus was before the high priest and Pilate (Mark 14:61; 15:5). This is the very verse the Ethiopian official was reading when Philip ran up to his chariot (Acts 8:32)." },
        { ref: "53:9", head: "His grave with the rich", ev: "debated", src: ["motyer", "oswalt"], text: "He was assigned a grave with the wicked, \"yet with a rich man in his death.\" The Hebrew is hard, and translators differ. Christian readers have long seen it fulfilled when Joseph of Arimathea, \"a rich man,\" laid Jesus in his own new tomb (Matthew 27:57-60)." },
        { ref: "53:11", head: "He will see light", ev: "strong", src: ["dss", "oswalt"], text: "The traditional Hebrew text says \"he will see\" with no object. The Great Isaiah Scroll from Qumran, copied about 125 BC, and the ancient Greek translation both read \"he will see light.\" Many modern Bibles now follow them. After death, the servant sees light: words that sound like resurrection." },
        { ref: "53:12", head: "He poured out Himself to death", ev: "scripture", src: ["motyer"], text: "The servant is \"numbered with the transgressors,\" a line Jesus applied to Himself the night before He died (Luke 22:37), yet He \"interceded for the transgressors,\" as Jesus prayed for those who crucified Him (Luke 23:34)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The Great Isaiah Scroll", ev: "strong", src: ["dss", "oswalt"], text: "Found in a cave near Qumran in 1947, the Great Isaiah Scroll is the only complete book of the Bible among the Dead Sea Scrolls: all 66 chapters on 17 sheets of leather sewn together, about 24 feet long. It is about 1,000 years older than the earlier Hebrew manuscripts we had, and it reads almost word for word the same in Isaiah 53. It is on display at the Shrine of the Book in Jerusalem and can be viewed online." },
        { head: "Quoted across the New Testament", ev: "scripture", src: ["motyer"], text: "Verses from Isaiah 52:13-53:12 appear in Matthew, Mark, Luke, John, Acts, Romans, Hebrews and 1 Peter. When Philip was asked, \"Of whom does the prophet say this?\" he \"began from this Scripture and preached Jesus\" (Acts 8:34-35)." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "עֶבֶד", say: 'eved', strongs: "H5650", count: "about 800 times", means: "servant, slave", ev: "strong", src: ["halot"], text: "Moses, David and the prophets are all called God's servant. In Isaiah 40-55 the word becomes a title: \"My Servant,\" sometimes the nation of Israel (41:8), and in the four songs an individual who restores Israel itself (49:5-6)." },
        { word: "אָשָׁם", say: "asham", strongs: "H817", count: "about 46 times", means: "guilt offering", ev: "strong", src: ["halot", "oswalt"], text: "In 53:10 the servant's life is made \"a guilt offering,\" the sacrifice in Leviticus 5-7 that paid for a wrong done. The chapter speaks in the language of the temple." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "One person, the coming Messiah", who: "Messianic reading", src: ["motyer", "oswalt"], text: "Many scholars read the servant as one individual. He suffers for \"my people\" (53:8), is innocent (53:9), and is silent in his suffering, things the prophets never say of the nation. Some ancient Jewish writings, such as the Aramaic Targum of Isaiah, also applied parts of this song to the Messiah. The New Testament writers read it as fulfilled in Jesus." },
        { head: "The people of Israel", who: "Corporate reading", src: ["oswalt"], text: "Other interpreters, including the medieval Jewish scholar Rashi and many modern scholars, read the servant as Israel, the faithful nation suffering in exile among the nations, who will one day see that Israel suffered for them." },
        { head: "Both at once", who: "Combined reading", src: ["motyer"], text: "Some see a pattern in Isaiah: the servant begins as the nation (41:8), but Israel fails, so one true Israelite fulfills Israel's calling. On this view, the servant is the One who embodies His people." },
      ] },
    ],
    sources: {
      oswalt: "John N. Oswalt, The Book of Isaiah, Chapters 40-66, New International Commentary on the Old Testament (Eerdmans, 1998).",
      motyer: "J. Alec Motyer, The Prophecy of Isaiah (InterVarsity Press, 1993).",
      halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
      dss: { text: "The Great Isaiah Scroll (1QIsa-a), Israel Museum, Jerusalem; put online with Google in 2011.", url: "https://www.npr.org/sections/thetwo-way/2011/09/26/140817335/dead-sea-scrolls-are-now-online" },
    },
  },

  "MAT.5": {
    crossRefs: [
      ["LUK.6", "Luke 6:20-36", "Luke's shorter Sermon on the Plain"],
      ["PSA.37", "Psalm 37:11", "The humble will inherit the land"],
      ["ISA.61", "Isaiah 61:1-3", "To comfort all who mourn"],
      ["EXO.20", "Exodus 20:13-14", "You shall not murder; you shall not commit adultery"],
      ["LEV.19", "Leviticus 19:18", "You shall love your neighbor as yourself"],
      ["ROM.12", "Romans 12:14-21", "Bless those who persecute you; overcome evil with good"],
    ],
    intro: "The opening of the Sermon on the Mount, the longest block of Jesus' teaching in the Gospels. It begins with eight blessings that turn the world's values upside down, calls His followers salt and light, and shows that God's law reaches the heart: anger, desire, honesty, and love even for enemies.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "5:1", head: "He went up on the mountain and sat down", ev: "good", src: ["france", "keener"], text: "Teachers in Jesus' day sat to teach. Matthew, writing for readers who knew their Scriptures, may want us to remember Moses, who received the law on a mountain. Here a greater Teacher gives its true meaning." },
        { ref: "5:3", head: "Blessed are the poor in spirit", ev: "good", src: ["davies", "bdag"], text: "\"Blessed\" (makarios) describes the deep well-being of those God has favored, not a passing mood. The \"poor in spirit\" are those who know they have nothing to offer God. The first and eighth blessings both end with \"theirs is the kingdom of heaven,\" framing all eight." },
        { ref: "5:5", head: "The gentle will inherit the earth", ev: "scripture", src: ["france"], text: "Almost word for word from Psalm 37:11. \"Gentle\" (praus) is strength under control; Jesus uses the same word of Himself: \"I am gentle and humble in heart\" (11:29)." },
        { ref: "5:13", head: "You are the salt of the earth", ev: "debated", src: ["keener", "france"], text: "Salt preserved food and added flavor. Pure salt cannot lose its saltiness, but the salt people gathered from the Dead Sea area was mixed with other minerals; when the salt washed out, what was left was useless. Scholars debate the exact picture, but the point is plain: disciples who lose their difference are good for nothing." },
        { ref: "5:18", head: "Not the smallest letter or stroke", ev: "strong", src: ["bdag", "france"], text: "The \"smallest letter\" (KJV \"jot\") is the Hebrew yod (י), about the size of an apostrophe. The \"stroke\" (\"tittle\") is a tiny hook that tells one Hebrew letter from another. Jesus says even these matter until all is accomplished." },
        { ref: "5:22", head: "Guilty enough to go into the fiery hell", ev: "good", src: ["keener"], text: "\"Hell\" here is Gehenna, the Valley of Hinnom just southwest of Jerusalem, where some kings of Judah once sacrificed children (Jeremiah 7:31). It became a picture of final judgment. Visitors can still walk the valley today." },
        { ref: "5:41", head: "Go with him two", ev: "strong", src: ["keener", "bdag"], text: "Roman soldiers could force a civilian to carry gear for one mile (the Greek word is angareuo, the same used when Simon of Cyrene was made to carry Jesus' cross, 27:32). A Roman mile was a thousand paces, about 1,620 yards. Jesus says: carry it a second mile, by choice." },
        { ref: "5:44", head: "Love your enemies", ev: "scripture", src: ["france", "davies"], text: "The law said love your neighbor (Leviticus 19:18); some had added \"and hate your enemy.\" Jesus' command has no known exact parallel in earlier Jewish or Greek teaching. The reason He gives: this is what God is like, who sends rain on the just and the unjust." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The Mount of Beatitudes", ev: "good", src: ["keener"], text: "Tradition places the sermon on a hillside near Capernaum above the Sea of Galilee. A church was built near Tabgha by the 300s, and the present Church of the Beatitudes (1938) has eight sides, one for each blessing. The gentle slope forms a natural amphitheater where a speaking voice carries well." },
        { head: "By the numbers", ev: "strong", src: ["france"], text: "The Sermon on the Mount fills three chapters (5-7) and 111 verses. It takes about fifteen minutes to read aloud. It contains the Lord's Prayer, the Golden Rule (7:12), and six \"You have heard... but I say to you\" teachings in this chapter alone." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "μακάριος", say: "makarios", strongs: "G3107", count: "50 times", means: "blessed, happy, fortunate", ev: "strong", src: ["bdag"], text: "Used in Greek for the gods and the very fortunate. Jesus gives it to the poor, the mourners and the persecuted." },
        { word: "πραΰς", say: "praus", strongs: "G4239", count: "4 times", means: "gentle, meek, humble", ev: "strong", src: ["bdag"], text: "Used of a horse that has been tamed: still strong, but responsive. Three of its four uses are in Matthew (5:5; 11:29; 21:5)." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "A way of life for every follower", who: "Discipleship reading", src: ["france", "keener"], text: "Most scholars read the sermon as Jesus' description of life in God's kingdom for all His disciples now: hard, but meant to be lived, with God's help and forgiveness when we fall short." },
        { head: "A mirror that shows our need", who: "Law-and-grace reading", src: ["davies"], text: "Others stress that no one keeps these words perfectly (who has never been angry?), so the sermon also shows our need for grace and points us to Jesus, who fulfilled the law (5:17)." },
        { head: "Taken word for word", who: "Literal-ethics reading", src: ["davies"], text: "Some read commands like \"do not resist an evildoer\" and \"turn the other cheek\" as strict rules, refusing all violence. Others read them as vivid sayings about giving up revenge, while still allowing just government and self-defense." },
      ] },
    ],
    sources: {
      france: "R. T. France, The Gospel of Matthew, New International Commentary on the New Testament (Eerdmans, 2007).",
      davies: "W. D. Davies and Dale C. Allison, The Gospel According to Saint Matthew, vol. 1, International Critical Commentary (T&T Clark, 1988).",
      keener: "Craig S. Keener, The Gospel of Matthew: A Socio-Rhetorical Commentary (Eerdmans, 2009).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "LUK.15": {
    crossRefs: [
      ["MAT.18", "Matthew 18:12-14", "The shepherd who leaves the ninety-nine"],
      ["EZK.34", "Ezekiel 34:11-16", "I Myself will search for My sheep"],
      ["PSA.23", "Psalm 23:1-3", "The LORD is my shepherd; He restores my soul"],
      ["LUK.19", "Luke 19:10", "The Son of Man came to seek and to save the lost"],
      ["DEU.21", "Deuteronomy 21:17", "The firstborn receives a double share"],
      ["ISA.53", "Isaiah 53:6", "All of us like sheep have gone astray"],
    ],
    intro: "Religious leaders grumble that Jesus eats with sinners, so He tells three stories: a lost sheep, a lost coin and a lost son. Each ends with a party. The last one leaves the older brother standing outside, and the story stops without telling us if he went in.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "15:2", head: "This man receives sinners and eats with them", ev: "good", src: ["bock2", "green"], text: "Sharing a meal meant welcome and friendship. To the Pharisees, eating with tax collectors and sinners made a teacher unclean. Jesus' three stories are His answer to this complaint." },
        { ref: "15:4", head: "A hundred sheep", ev: "good", src: ["bailey"], text: "A hundred sheep was a fair-sized flock for one family, likely shared among relatives. The shepherd leaves the ninety-nine \"in the open pasture,\" probably with other shepherds, and carries the lost one home on his shoulders: a heavy load for a long walk." },
        { ref: "15:8", head: "Ten silver coins", ev: "good", src: ["bock2", "green"], text: "A drachma was about a day's wage for a laborer. Village homes had small windows and dirt or stone floors, so she lights a lamp and sweeps. Some think the coins were part of her savings or wedding headdress." },
        { ref: "15:12", head: "Give me the share of the estate", ev: "good", src: ["bailey", "bock2"], text: "The law gave a firstborn son a double share (Deuteronomy 21:17), so the younger of two sons would receive one third. Asking for it while his father was alive was shocking. Kenneth Bailey, who spent decades in Middle Eastern villages, said listeners there heard it as \"I wish you were dead.\"" },
        { ref: "15:16", head: "The pods the swine were eating", ev: "strong", src: ["bock2"], text: "Carob pods, food for animals and the very poor. For a Jewish listener, tending pigs (unclean animals, Leviticus 11:7) was as low as a person could fall." },
        { ref: "15:20", head: "His father ran", ev: "good", src: ["bailey", "green"], text: "Older men in that culture did not run; it meant hitching up a long robe and losing dignity in public. The father runs anyway and kisses his son before he can finish his speech. The robe, ring and sandals restore him as a son, not a hired man." },
        { ref: "15:28", head: "He became angry and was not willing to go in", ev: "scripture", src: ["green"], text: "The father goes out to the older son too, and pleads with him. The story ends with an invitation hanging in the air, aimed at the grumblers of verse 2, and at anyone who thinks they have earned their place." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Three stories, one pattern", ev: "good", src: ["green"], text: "One sheep in a hundred, one coin in ten, one son in two: the stakes rise each time. Each story has something lost, a search or a waiting, finding, and a celebration with friends. Jesus says the same joy happens in heaven over one sinner who repents (15:7, 10)." },
        { head: "One of the best-known stories ever told", ev: "good", src: ["bailey"], text: "The Prodigal Son has been painted by Rembrandt (about 1669, now in the Hermitage in St. Petersburg), set to music, and retold in countless forms. \"Prodigal\" means wastefully extravagant; some suggest the father, lavish in his love, is the most prodigal of all." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "ἀπόλλυμι", say: "apollymi", strongs: "G622", count: "about 90 times", means: "to lose; to be lost; to perish", ev: "strong", src: ["bdag"], text: "Used 8 times in this chapter. The same word is \"perish\" in John 3:16. Being lost, in Jesus' stories, means being away from the One who owns you and loves you." },
        { word: "σπλαγχνίζομαι", say: "splanchnizomai", strongs: "G4697", count: "12 times, only in the Gospels", means: "to be moved with compassion", ev: "strong", src: ["bdag"], text: "From the word for the inner organs: a feeling deep in the gut. In the Gospels it describes Jesus, and three times characters in His stories: the forgiving master, the Good Samaritan, and this father (15:20)." },
      ] },
    ],
    sources: {
      bock2: "Darrell L. Bock, Luke 9:51-24:53, Baker Exegetical Commentary on the New Testament (Baker, 1996).",
      green: "Joel B. Green, The Gospel of Luke, New International Commentary on the New Testament (Eerdmans, 1997).",
      bailey: "Kenneth E. Bailey, The Cross and the Prodigal, 2nd ed. (InterVarsity Press, 2005).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "JHN.11": {
    crossRefs: [
      ["JHN.5", "John 5:25-29", "An hour is coming when the dead will hear the voice of the Son of God"],
      ["LUK.10", "Luke 10:38-42", "Martha and Mary welcome Jesus"],
      ["JHN.12", "John 12:1-11", "Dinner at Bethany, with Lazarus at the table"],
      ["1TH.4", "1 Thessalonians 4:13-14", "We do not grieve as those who have no hope"],
      ["1CO.15", "1 Corinthians 15:54-55", "O death, where is your victory?"],
      ["HEB.4", "Hebrews 4:15", "We have a high priest who can sympathize with our weaknesses"],
    ],
    intro: "The seventh and greatest sign in John's Gospel. Jesus waits two days, arrives after Lazarus has been in the tomb four days, weeps with his sisters, and calls him out alive. The miracle that gives life sets in motion the plot to take Jesus' life.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "11:6", head: "He stayed two days longer", ev: "scripture", src: ["carson"], text: "The love in verse 5 and the delay in verse 6 are joined by \"so\": because He loved them, He waited. The delay will show something greater than a healing. Many readers find comfort here when God's timing seems slow." },
        { ref: "11:17", head: "Four days in the tomb", ev: "good", src: ["keener", "carson"], text: "Burial happened the same day as death in that warm climate. Some later Jewish writings say the soul stayed near the body for three days; by the fourth there was no hope. Martha's \"by this time there will be a stench\" (11:39) makes the same point: Lazarus was truly dead." },
        { ref: "11:18", head: "Fifteen stadia from Jerusalem", ev: "strong", src: ["carson"], text: "About 1.7 miles, on the eastern slope of the Mount of Olives. Close enough that many mourners came out from the city, which is how word of the miracle reached the leaders so fast." },
        { ref: "11:25", head: "I am the resurrection and the life", ev: "scripture", src: ["carson", "keener"], text: "The fifth of seven \"I am\" sayings in John. Martha believed in a resurrection \"on the last day\" (11:24). Jesus says the resurrection is not only an event; it is a Person, standing in front of her." },
        { ref: "11:33", head: "Deeply moved in spirit", ev: "debated", src: ["bdag", "carson"], text: "The Greek word (embrimaomai) usually means to snort with anger or indignation. Scholars debate what Jesus was angry at: most suggest death itself and the grief it causes, or the unbelief around Him. It is not anger at Mary." },
        { ref: "11:35", head: "Jesus wept", ev: "strong", src: ["carson"], text: "The shortest verse in most English Bibles. Jesus knew He would raise Lazarus in minutes, yet He still wept with those who wept. The word (dakryo) means shedding tears quietly, different from the loud wailing of the mourners (11:33)." },
        { ref: "11:44", head: "Unbind him, and let him go", ev: "good", src: ["keener"], text: "Bodies were wrapped in strips of linen with spices, and the face covered with a cloth. Lazarus comes out still bound and will die again someday. When Jesus rises, the linen is left lying in the tomb (20:6-7), because He will never die again." },
        { ref: "11:50", head: "One man should die for the people", ev: "strong", src: ["carson", "caiaphas"], text: "Caiaphas meant it as cold politics. John says he spoke more truly than he knew (11:51-52). Caiaphas was high priest from about AD 18 to 36, and a decorated bone box inscribed \"Joseph son of Caiaphas\" was found in Jerusalem in 1990." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Bethany today", ev: "good", src: ["keener"], text: "The village is now called al-Eizariya, from the name Lazarus. Around AD 330 the historian Eusebius mentioned a place there pointed out as Lazarus' tomb, and visitors still climb down its steep steps today." },
        { head: "Seven signs", ev: "good", src: ["carson"], text: "John chooses seven miracles he calls signs: water into wine, a healed official's son, a lame man, feeding the 5,000, walking on water, a man born blind, and Lazarus. Each points to who Jesus is, \"so that you may believe\" (20:31)." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "ἀνάστασις", say: "anastasis", strongs: "G386", count: "42 times", means: "resurrection, rising up", ev: "strong", src: ["bdag"], text: "Literally a \"standing up again.\" The word gives us the name Anastasia." },
        { word: "δακρύω", say: "dakryo", strongs: "G1145", count: "once, John 11:35", means: "to shed tears", ev: "strong", src: ["bdag"], text: "Used only here in the New Testament. The mourners' loud weeping is klaio; Jesus' quiet tears are dakryo." },
      ] },
    ],
    sources: {
      carson: "D. A. Carson, The Gospel According to John, Pillar New Testament Commentary (Eerdmans, 1991).",
      keener: "Craig S. Keener, The Gospel of John: A Commentary, 2 vols. (Hendrickson, 2003).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
      caiaphas: "Zvi Greenhut, \"Burial Cave of the Caiaphas Family,\" Biblical Archaeology Review 18, no. 5 (1992): 28-36.",
    },
  },

  "ACT.2": {
    crossRefs: [
      ["JOL.2", "Joel 2:28-32", "I will pour out My Spirit on all mankind"],
      ["LEV.23", "Leviticus 23:15-21", "The Feast of Weeks, fifty days after Passover"],
      ["GEN.11", "Genesis 11:1-9", "At Babel the languages were confused; at Pentecost they were understood"],
      ["PSA.16", "Psalm 16:8-11", "You will not abandon my soul to Hades"],
      ["PSA.110", "Psalm 110:1", "Sit at My right hand"],
      ["ACT.1", "Acts 1:8", "You will receive power when the Holy Spirit has come upon you"],
    ],
    intro: "Fifty days after Passover, the Holy Spirit comes with a sound like wind and tongues like fire. Galileans speak in the languages of pilgrims from across the world, Peter preaches the first Christian sermon, about 3,000 are baptized, and the first church gathers to learn, share, eat and pray.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "2:1", head: "The day of Pentecost", ev: "strong", src: ["bruce", "keener"], text: "Pentecost is Greek for \"fiftieth\": the Feast of Weeks (Shavuot), fifty days after Passover (Leviticus 23:15-16). It celebrated the wheat harvest, and later Jewish tradition linked it with the giving of the law at Sinai. Jerusalem's population swelled with pilgrims." },
        { ref: "2:3", head: "Tongues as of fire", ev: "scripture", src: ["bock"], text: "Wind and fire are signs of God's presence: the burning bush, the fire on Sinai, the pillar of fire. John the Baptist had said Jesus would baptize \"with the Holy Spirit and fire\" (Luke 3:16)." },
        { ref: "2:9", head: "Parthians, Medes and Elamites", ev: "good", src: ["keener", "bruce"], text: "The list moves from the east (modern Iran and Iraq) through Asia Minor (Turkey) to Egypt, Libya and Rome, then Crete and Arabia: fifteen peoples. It sketches the whole world of the Jewish dispersion, and many think it deliberately reverses the scattering at Babel." },
        { ref: "2:15", head: "Only the third hour of the day", ev: "strong", src: ["bruce"], text: "Counting from sunrise, about 9 in the morning. On a feast day, devout Jews would not eat or drink until after the morning prayers, so Peter's reply was common sense." },
        { ref: "2:24", head: "Impossible for Him to be held", ev: "scripture", src: ["bock"], text: "Peter's sermon quotes three passages: Joel 2, Psalm 16 and Psalm 110. His argument: David died and his tomb is still here (2:29), so Psalm 16 must speak of Someone else, whom God raised. \"We are all witnesses\" (2:32)." },
        { ref: "2:38", head: "Repent, and each of you be baptized", ev: "debated", src: ["bock", "mantey", "marcus"], text: "Peter's answer joins repentance, baptism in the name of Jesus Christ, forgiveness of sins, and the gift of the Spirit. How these fit together is one of the most discussed verses in Acts; see Scholars and views." },
        { ref: "2:41", head: "About three thousand souls", ev: "good", src: ["reich", "keener"], text: "Baptizing so many in one day needed a lot of water. Archaeologists have uncovered dozens of Jewish ritual immersion pools (mikvaot) near the southern steps of the Temple Mount, used by worshipers before entering the temple, along with the large pools of Siloam and Bethesda." },
        { ref: "2:42", head: "Devoted to the apostles' teaching", ev: "scripture", src: ["bruce"], text: "Four marks of the first church: the apostles' teaching, fellowship, the breaking of bread, and prayer. \"Fellowship\" (koinonia) means sharing in common, and they did, even selling property to help those in need (2:44-45)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The temple steps", ev: "strong", src: ["reich"], text: "The broad Southern Steps of the Temple Mount, excavated after 1967, can still be climbed today. Worshipers entered the temple from here, and many think it is a likely setting for a crowd of thousands hearing Peter." },
        { head: "Jews from every nation", ev: "strong", src: ["keener"], text: "By the first century, more Jews lived outside the land of Israel than in it, in large communities in Alexandria, Babylon, Antioch and Rome. Pilgrims came for the feasts, and some settled in Jerusalem." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "πνεῦμα", say: "pneuma", strongs: "G4151", count: "about 380 times", means: "spirit, breath, wind", ev: "strong", src: ["bdag"], text: "One word for spirit, breath and wind, like Hebrew ruach. That is why the Spirit's coming sounds like a violent rushing wind (2:2), and why Jesus breathed on His disciples (John 20:22)." },
        { word: "κοινωνία", say: "koinonia", strongs: "G2842", count: "19 times", means: "fellowship, sharing, partnership", ev: "strong", src: ["bdag"], text: "From koinos, \"common.\" It is used of sharing in Christ, in the Lord's Supper (1 Corinthians 10:16), and in giving money to the poor (Romans 15:26)." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "Baptism as the appointed meeting place", who: "Instrumental reading", src: ["bock", "marcus"], text: "Many scholars read \"for the forgiveness of sins\" (Greek eis) as purpose: be baptized in order to receive forgiveness. Classicist Ralph Marcus argued in the Journal of Biblical Literature (1951-52) that the Greek evidence for a \"because of\" meaning is weak. On this reading, God gives forgiveness to those who repent and are baptized, as the promised response of faith." },
        { head: "Baptism as the response to forgiveness", who: "Declarative reading", src: ["mantey", "bock"], text: "Greek scholar Julius Mantey argued in the same journal (1951) that eis can sometimes mean \"because of\" or \"with reference to\": be baptized because your sins are forgiven. Others note that \"repent\" and \"forgiveness\" are linked elsewhere without baptism (Acts 3:19; 10:43). On this reading, forgiveness comes through faith and repentance, and baptism is the public sign of it." },
        { head: "What both agree on", who: "Common ground", src: ["bruce"], text: "Both readings agree that the first Christians were baptized right away, that baptism was in Jesus' name, that it was joined with repentance and faith, and that it was never treated as optional in Acts. The question is how the parts fit together, not whether baptism matters." },
      ] },
    ],
    sources: {
      bruce: "F. F. Bruce, The Book of the Acts, rev. ed., New International Commentary on the New Testament (Eerdmans, 1988).",
      bock: "Darrell L. Bock, Acts, Baker Exegetical Commentary on the New Testament (Baker, 2007).",
      keener: "Craig S. Keener, Acts: An Exegetical Commentary, vol. 1 (Baker, 2012).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
      mantey: "Julius R. Mantey, \"The Causal Use of Eis in the New Testament,\" Journal of Biblical Literature 70 (1951): 45-48.",
      marcus: "Ralph Marcus, \"On Causal Eis,\" Journal of Biblical Literature 70 (1951): 129-130; and \"The Elusive Causal Eis,\" Journal of Biblical Literature 71 (1952): 43-44.",
      reich: "Ronny Reich, \"Ritual Baths,\" in The Oxford Encyclopedia of Archaeology in the Near East, vol. 4 (Oxford University Press, 1997).",
    },
  },

  "ROM.8": {
    crossRefs: [
      ["ROM.5", "Romans 5:1-5", "Peace with God, and hope that does not disappoint"],
      ["GAL.4", "Galatians 4:6-7", "God sent the Spirit of His Son into our hearts, crying, Abba! Father!"],
      ["GEN.3", "Genesis 3:17-19", "The ground cursed: the groaning creation"],
      ["PSA.44", "Psalm 44:22", "For Your sake we are killed all day long"],
      ["2CO.4", "2 Corinthians 4:16-18", "Momentary, light affliction and an eternal weight of glory"],
      ["REV.21", "Revelation 21:1-5", "Behold, I am making all things new"],
    ],
    intro: "Many call it the greatest chapter in Paul's letters. It begins with \"no condemnation\" and ends with \"no separation.\" In between: life in the Spirit, being God's children, a whole creation groaning for renewal, and the promise that nothing in all creation can separate us from God's love.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "8:1", head: "No condemnation", ev: "scripture", src: ["moo"], text: "\"Condemnation\" (katakrima) is a courtroom word for the sentence that follows a guilty verdict. After the struggle of chapter 7, Paul announces that for those \"in Christ Jesus\" the sentence has been carried out on Another (8:3)." },
        { ref: "8:15", head: "Abba! Father!", ev: "strong", src: ["dunn", "bdag"], text: "Abba is Aramaic, the language Jesus spoke at home. It is what children and grown children called their fathers, warm but respectful. Jesus prayed this way in Gethsemane (Mark 14:36), and Paul keeps the Aramaic word even when writing in Greek to Rome." },
        { ref: "8:17", head: "Heirs of God and fellow heirs with Christ", ev: "good", src: ["moo"], text: "In Roman law an adopted son received the full legal rights of a natural son, including inheritance. Paul says that through the Spirit of adoption (8:15) we share Christ's inheritance, \"if indeed we suffer with Him.\"" },
        { ref: "8:22", head: "The whole creation groans", ev: "good", src: ["moo", "schreiner"], text: "Paul pictures creation like a woman in labor: real pain, but pain that leads to new life. The world was \"subjected to futility\" (8:20), recalling Genesis 3, and waits to be set free when God's children are revealed." },
        { ref: "8:26", head: "The Spirit Himself intercedes", ev: "scripture", src: ["moo"], text: "Three groans in this passage: creation groans (8:22), we groan (8:23), and the Spirit prays for us \"with groanings too deep for words.\" When we don't know how to pray, we are not left alone." },
        { ref: "8:28", head: "God causes all things to work together for good", ev: "scripture", src: ["moo", "schreiner"], text: "Not that everything is good, but that God works in everything for the good of those who love Him. The \"good\" is defined in the next verse: being made like Christ." },
        { ref: "8:29", head: "Foreknew... predestined... called", ev: "debated", src: ["moo", "schreiner", "dunn"], text: "Five links in one golden chain: foreknown, predestined, called, justified, glorified. How God's choosing relates to human response has been debated for centuries; see Scholars and views." },
        { ref: "8:37", head: "More than conquerors", ev: "strong", src: ["bdag"], text: "One word in Greek, hypernikao, \"super-conquer.\" Paul has just listed seven hardships, from tribulation to the sword, and concludes with ten things that cannot separate us from the love of God in Christ (8:38-39)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "A letter to a church Paul had never visited", ev: "strong", src: ["moo"], text: "Paul wrote Romans from Corinth about AD 57, to introduce himself before visiting. Christians in Rome had been through hard times: Emperor Claudius expelled Jews from Rome about AD 49 (Acts 18:2), and within a decade of this letter, Nero's persecution would make 8:36 painfully real." },
        { head: "The Spirit chapter", ev: "strong", src: ["dunn"], text: "The word \"Spirit\" (pneuma) appears about 21 times in Romans 8, more than in any other chapter of Paul's letters, and only a few times in chapters 1-7." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "υἱοθεσία", say: "huiothesia", strongs: "G5206", count: "5 times, all in Paul", means: "adoption as a son", ev: "strong", src: ["bdag"], text: "A legal term from the Roman world: \"placing as a son.\" Used in Romans 8:15, 23; 9:4; Galatians 4:5; Ephesians 1:5." },
        { word: "ὑπερνικάω", say: "hypernikao", strongs: "G5245", count: "once, Romans 8:37", means: "to be more than a conqueror", ev: "strong", src: ["bdag"], text: "Nike means victory. Paul adds hyper, \"beyond\": an overwhelming win, not just survival." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "God chooses individuals for salvation", who: "Individual election", src: ["schreiner"], text: "Some scholars read \"foreknew\" as God's loving choice of particular people beforehand (as in Amos 3:2, \"you only have I known\"). Those He chose He also calls, justifies and glorifies, and none drop out of the chain." },
        { head: "God foresees who will trust Him", who: "Foreknowledge view", src: ["dunn", "moo"], text: "Others read \"foreknew\" as God knowing in advance who would freely respond in faith, and predestining them to be made like Christ. On this view the chain describes God's plan for believers, while each person's response remains real." },
        { head: "God chooses a people in Christ", who: "Corporate election", src: ["dunn", "moo"], text: "Others note that Paul's \"you\" and \"we\" are plural, and that chapters 9-11 are about Israel and the nations. On this view God has chosen a people, those in Christ, and individuals share in that choice by being joined to Christ through faith." },
      ] },
    ],
    sources: {
      moo: "Douglas J. Moo, The Epistle to the Romans, New International Commentary on the New Testament (Eerdmans, 1996).",
      schreiner: "Thomas R. Schreiner, Romans, Baker Exegetical Commentary on the New Testament (Baker, 1998).",
      dunn: "James D. G. Dunn, Romans 1-8, Word Biblical Commentary 38A (Word, 1988).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "1CO.13": {
    crossRefs: [
      ["1CO.12", "1 Corinthians 12:27-31", "The body of Christ, and a still more excellent way"],
      ["1JN.4", "1 John 4:7-12", "God is love"],
      ["JHN.13", "John 13:34-35", "A new commandment: love one another"],
      ["ROM.13", "Romans 13:8-10", "Love is the fulfillment of the law"],
      ["COL.3", "Colossians 3:14", "Put on love, the perfect bond of unity"],
      ["1CO.14", "1 Corinthians 14:1", "Pursue love, yet desire spiritual gifts"],
    ],
    intro: "The love chapter, read at countless weddings, was first written to a church that was gifted, proud and divided. Placed between two chapters about spiritual gifts, it says that without love the greatest gifts are noise, describes love in fifteen verbs, and promises that love outlasts everything.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "13:1", head: "A noisy gong or a clanging cymbal", ev: "good", src: ["fee", "thiselton"], text: "Corinth was famous for its bronze. Pagan worship used gongs and cymbals, and bronze sounding jars may have been used in theaters to carry sound. Gifted speech without love, Paul says, is just loud metal." },
        { ref: "13:3", head: "If I give all my possessions", ev: "debated", src: ["metzger", "fee"], text: "Some ancient manuscripts read \"if I surrender my body to be burned,\" others \"so that I may boast.\" The two Greek words differ by one letter. Either way, even the greatest sacrifice is worth nothing without love." },
        { ref: "13:4", head: "Love is patient, love is kind", ev: "strong", src: ["thiselton"], text: "In Greek, love is described with verbs, not adjectives: love waits patiently, love acts kindly. Fifteen actions in verses 4-7, eight of them negative. Many of them are the opposite of what Paul has already corrected in Corinth: jealousy (3:3), arrogance (4:18; 5:2), and seeking one's own (10:24)." },
        { ref: "13:7", head: "Bears all things", ev: "good", src: ["fee"], text: "\"Bears\" (stego) can mean to cover, as a roof covers a house, or to endure. Love keeps a lid on others' faults (1 Peter 4:8) and holds on through hard times. \"All things\" four times: love never gives up." },
        { ref: "13:10", head: "When the perfect comes", ev: "debated", src: ["fee", "thiselton"], text: "\"Perfect\" (teleion) means complete or mature. What it refers to is one of the chapter's most discussed questions; see Scholars and views." },
        { ref: "13:12", head: "In a mirror dimly", ev: "strong", src: ["thiselton"], text: "Ancient mirrors were polished bronze, and Corinth made some of the best. Even a good one gave a soft, slightly dark reflection. Now we know God truly but partly; then we will see \"face to face,\" as God once spoke with Moses (Numbers 12:8)." },
        { ref: "13:13", head: "The greatest of these is love", ev: "scripture", src: ["fee"], text: "Faith, hope and love appear together often in Paul (1 Thessalonians 1:3; 5:8; Colossians 1:4-5). Love is greatest because it lasts: in God's presence faith becomes sight and hope is fulfilled, but love goes on forever." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Corinth", ev: "strong", src: ["thiselton"], text: "A wealthy Roman colony on the narrow isthmus between two seas, with two harbors. Ships were dragged across the land on a paved trackway, the Diolkos, parts of which can still be seen. The city hosted the Isthmian Games every two years. Paul lived there 18 months (Acts 18:11)." },
        { head: "Three Greek words for love", ev: "good", src: ["bdag"], text: "Greek had eros (romantic desire), philia (friendship) and agape. Agape was a rather plain word before the Bible; the Greek Old Testament and then the New Testament filled it with the meaning of God's self-giving love. It appears 116 times in the New Testament, 9 times in this chapter." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "ἀγάπη", say: "agape", strongs: "G26", count: "116 times", means: "love", ev: "strong", src: ["bdag"], text: "Love that seeks the other's good, shown supremely in the cross: \"God demonstrates His own love toward us, in that while we were yet sinners, Christ died for us\" (Romans 5:8)." },
        { word: "μακροθυμέω", say: "makrothymeo", strongs: "G3114", count: "10 times", means: "to be patient, long-tempered", ev: "strong", src: ["bdag"], text: "Literally \"long-tempered,\" the opposite of short-tempered. It is the first thing Paul says about love." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "When Christ returns", who: "Eschatological view", src: ["fee", "thiselton"], text: "Most commentators read \"the perfect\" as the end of the age, when Christ returns. Verse 12 says that then we will see \"face to face\" and know fully, which sounds like heaven. On this view, gifts like prophecy and tongues serve the church until then." },
        { head: "When the New Testament was complete", who: "Completed-revelation view", src: ["thiselton"], text: "Other interpreters read \"the perfect\" as the completed revelation of the New Testament. Partial gifts of revelation like prophecy and tongues would stop once God's written word was complete; love continues." },
        { head: "When the church is mature", who: "Maturity view", src: ["thiselton"], text: "Some point to Paul's picture of a child growing up (13:11) and read \"the perfect\" as the maturity of the church. A few combine this with one of the other views." },
      ] },
    ],
    sources: {
      fee: "Gordon D. Fee, The First Epistle to the Corinthians, rev. ed., New International Commentary on the New Testament (Eerdmans, 2014).",
      thiselton: "Anthony C. Thiselton, The First Epistle to the Corinthians, New International Greek Testament Commentary (Eerdmans, 2000).",
      metzger: "Bruce M. Metzger, A Textual Commentary on the Greek New Testament, 2nd ed. (German Bible Society, 1994).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "JHN.14": {
    crossRefs: [
      ["JHN.13", "John 13:33-38", "Where I am going, you cannot follow Me now"],
      ["JHN.16", "John 16:7-15", "It is to your advantage that I go away: the Helper will come"],
      ["ACT.4", "Acts 4:12", "There is salvation in no one else"],
      ["1TH.4", "1 Thessalonians 4:16-17", "So we shall always be with the Lord"],
      ["1JN.2", "1 John 2:1", "We have an Advocate with the Father"],
      ["PHP.4", "Philippians 4:6-7", "The peace of God, which surpasses all comprehension"],
    ],
    intro: "The night before the cross, in the upper room, Jesus comforts disciples who have just heard that He is leaving and that Peter will deny Him. \"Do not let your heart be troubled.\" He promises a place in the Father's house, shows Himself as the way to the Father, and promises another Helper, the Holy Spirit, and a peace the world cannot give.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "14:1", head: "Do not let your heart be troubled", ev: "scripture", src: ["carson"], text: "The same word, \"troubled\" (tarasso), was used of Jesus Himself at Lazarus's tomb (11:33) and as He spoke of His betrayer (13:21). He knows the feeling from inside. \"Your\" is plural: He is speaking to all of them together." },
        { ref: "14:2", head: "Many dwelling places", ev: "strong", src: ["carson", "bdag"], text: "\"Dwelling places\" (monai) means places to stay or live. The KJV's \"mansions\" comes from the Latin mansiones, which in 1611 still meant simply \"dwellings,\" not grand houses. The point is room: there is a place for each of them." },
        { ref: "14:3", head: "I will come again", ev: "debated", src: ["carson", "keener"], text: "Jesus promises to come and take them to Himself. Whether He means His return at the end of the age, His coming after the resurrection, His coming through the Spirit, or more than one of these, is discussed under Scholars and views." },
        { ref: "14:6", head: "I am the way, and the truth, and the life", ev: "scripture", src: ["carson", "kostenberger"], text: "Thomas asks for directions; Jesus answers that He is the road. This is one of seven \"I am\" sayings with a picture in John's Gospel. Early Christians were called followers of \"the Way\" (Acts 9:2)." },
        { ref: "14:9", head: "He who has seen Me has seen the Father", ev: "scripture", src: ["kostenberger"], text: "Philip asks to see the Father. Jesus answers that the Father has been in plain sight all along, in Him. This picks up the opening of the Gospel: \"No one has seen God at any time; the only begotten God... has explained Him\" (1:18)." },
        { ref: "14:16", head: "Another Helper", ev: "strong", src: ["bdag", "keener"], text: "\"Another\" (allos) means another of the same kind. Jesus has been their Helper; the Spirit will be another like Him, and will be with them forever. The word \"Helper\" is discussed under Greek words." },
        { ref: "14:26", head: "He will teach you all things", ev: "scripture", src: ["carson"], text: "The Spirit will bring to the apostles' remembrance all that Jesus said. Many see here a promise behind the writing of the New Testament: the Gospels rest on what the Spirit helped the apostles remember." },
        { ref: "14:27", head: "Peace I leave with you", ev: "good", src: ["keener"], text: "\"Shalom\" was the ordinary Jewish greeting and farewell, as it still is. Jesus uses the everyday word for something no one else can give: peace with God and in the heart, even with the cross a few hours away." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The upper room discourse", ev: "strong", src: ["carson"], text: "John 13-17 is Jesus' long farewell at the Last Supper, which John alone records at length. Farewell speeches were a known form in Scripture (Jacob in Genesis 49, Moses in Deuteronomy) and in Jewish writings: a leader gathers his own, comforts them, gives commands and speaks of the future." },
        { head: "The Father's house", ev: "good", src: ["kostenberger", "keener"], text: "Earlier in John, \"My Father's house\" meant the temple (2:16). A large Jewish household could add rooms to the family home as sons married. Both pictures stand behind the promise: a home with God, with room prepared." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "παράκλητος", say: "parakletos", strongs: "G3875", count: "5 times, all in John's writings", means: "one called alongside: helper, advocate, comforter", ev: "strong", src: ["bdag"], text: "Used of a friend who speaks up for someone in court. Translations vary (Helper, Comforter, Advocate, Counselor) because no one English word covers it. In 1 John 2:1 the same word is used of Jesus: \"We have an Advocate with the Father.\"" },
        { word: "μονή", say: "mone", strongs: "G3438", count: "twice, John 14:2 and 14:23", means: "a dwelling, a place to stay", ev: "strong", src: ["bdag"], text: "Notice where the word comes back: \"We will come to him and make Our abode with him\" (14:23). Jesus prepares a place for us with the Father, and the Father and Son make their home with us now." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "His return at the end of the age", who: "Second coming view", src: ["carson"], text: "Many read \"I will come again and receive you to Myself\" (14:3) as Christ's return, when believers will be with Him forever (1 Thessalonians 4:17). The going away is His death, resurrection and ascension; the coming back is His return." },
        { head: "His coming to the believer now", who: "Present coming view", src: ["keener"], text: "Others point to the rest of the chapter: \"I will come to you\" (14:18) and \"We will come to him and make Our abode with him\" (14:23). On this view Jesus comes after the resurrection and through the Spirit, and the believer is already at home with God." },
        { head: "Both, now and later", who: "Combined view", src: ["kostenberger", "carson"], text: "Many scholars hold that John deliberately holds both together: Christ comes to His people now by the Spirit, and will come for them at the end. What starts now is completed then." },
      ] },
    ],
    sources: {
      carson: "D. A. Carson, The Gospel According to John, Pillar New Testament Commentary (Eerdmans, 1991).",
      keener: "Craig S. Keener, The Gospel of John: A Commentary, 2 vols. (Hendrickson, 2003).",
      kostenberger: "Andreas J. Köstenberger, John, Baker Exegetical Commentary on the New Testament (Baker, 2004).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "ROM.12": {
    crossRefs: [
      ["1CO.12", "1 Corinthians 12:4-27", "Many members, one body, different gifts"],
      ["1PE.2", "1 Peter 2:5", "Living stones offering spiritual sacrifices"],
      ["2CO.3", "2 Corinthians 3:18", "Transformed into the same image, from glory to glory"],
      ["PRO.25", "Proverbs 25:21-22", "If your enemy is hungry, give him food"],
      ["MAT.5", "Matthew 5:43-48", "Love your enemies and pray for those who persecute you"],
      ["EPH.4", "Ephesians 4:1-16", "Walk worthy of your calling, with gifts for building up the body"],
    ],
    intro: "After eleven chapters on what God has done, Paul turns with \"therefore\" to how we live. The chapter moves from worship (offer yourselves as living sacrifices) to the church (one body with many gifts) to everyday love, even for enemies. Many call it the Christian's daily guide.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "12:1", head: "Therefore... by the mercies of God", ev: "scripture", src: ["moo"], text: "\"Therefore\" looks back over everything in chapters 1-11. The appeal is not \"do this so God will be merciful\" but \"because God has been merciful.\"" },
        { ref: "12:1", head: "A living and holy sacrifice", ev: "good", src: ["moo", "dunn"], text: "Temple sacrifices were killed and burned. Paul asks for a sacrifice that stays alive: the whole person, \"your bodies,\" given to God in everyday life. \"Spiritual service of worship\" translates two words discussed under Greek words." },
        { ref: "12:2", head: "Do not be conformed... but be transformed", ev: "strong", src: ["bdag", "moo"], text: "\"Conformed\" means pressed into a pattern from outside. \"Transformed\" is the word used of Jesus' transfiguration (Matthew 17:2): a change from within, by \"the renewing of your mind.\"" },
        { ref: "12:3", head: "Not to think more highly of himself", ev: "scripture", src: ["schreiner"], text: "A play on words in Greek: not to over-think (hyperphronein) but to think with sober judgment (sophronein), according to the measure of faith God has given." },
        { ref: "12:6", head: "Gifts that differ", ev: "scripture", src: ["moo"], text: "Seven gifts are named: prophecy, serving, teaching, encouraging, giving, leading and showing mercy. The list is a sample, not complete (compare 1 Corinthians 12 and Ephesians 4). The main point is that every member has something to give." },
        { ref: "12:13", head: "Practicing hospitality", ev: "good", src: ["dunn"], text: "Literally \"pursuing love of strangers\" (philoxenia). Inns had poor reputations, so travelling Christians depended on believers opening their homes. Paul says to chase after it, not just allow it." },
        { ref: "12:18", head: "So far as it depends on you", ev: "scripture", src: ["schreiner"], text: "Paul is realistic: peace with everyone is not always possible. But our part should never be the reason it fails." },
        { ref: "12:20", head: "Heap burning coals on his head", ev: "debated", src: ["moo", "dunn"], text: "Paul quotes Proverbs 25:21-22. What the burning coals mean has puzzled readers since the early church; see Scholars and views. The next verse settles the purpose: \"overcome evil with good.\"" },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Christians in the capital", ev: "strong", src: ["moo"], text: "The church in Rome met in several homes (16:5, 14-15) and included Jews and Gentiles, slaves and free. Some had been expelled under Claudius about AD 49 and had come back. Living at peace and blessing persecutors was a real challenge for them, and a few years later Nero's persecution would test it." },
        { head: "Bodies as sacrifices", ev: "good", src: ["dunn"], text: "Many in the Greek world thought of the body as a prison for the soul and of real religion as purely inward. Paul, like the Old Testament, treats the body as part of the person who belongs to God, and so as the place where worship happens day by day." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "λογικός", say: "logikos", strongs: "G3050", count: "twice, Romans 12:1 and 1 Peter 2:2", means: "reasonable, rational, spiritual", ev: "debated", src: ["bdag", "moo"], text: "From logos, \"word\" or \"reason.\" The KJV has \"reasonable service,\" the NASB and ESV \"spiritual service of worship.\" The idea is worship that fits, that makes sense, given what God has done; worship of the mind and heart, not only of ritual." },
        { word: "μεταμορφόω", say: "metamorphoo", strongs: "G3339", count: "4 times", means: "to be transformed, changed in form", ev: "strong", src: ["bdag"], text: "The root of \"metamorphosis.\" It is used of Jesus' transfiguration (Matthew 17:2; Mark 9:2) and of believers being changed into Christ's image (2 Corinthians 3:18). The verb is present tense: an ongoing change." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "Shame that leads to change", who: "Repentance view", src: ["moo", "schreiner"], text: "Most commentators read the burning coals as the painful sense of shame an enemy feels when repaid with kindness, a shame that may lead to a change of heart. Kindness wins the enemy rather than defeating him." },
        { head: "A sign of repentance", who: "Ancient custom view", src: ["dunn"], text: "Some scholars connect Proverbs with an Egyptian text in which a penitent carried a dish of burning coals on the head as a sign of sorrow. On this view kindness invites the enemy to show repentance. Others think the parallel is too distant to be sure." },
        { head: "Leaving judgment to God", who: "Judgment view", src: ["dunn", "moo"], text: "Some early writers read the coals as God's judgment on an enemy who refuses kindness, since in the Old Testament coals often picture judgment. Most modern scholars find this hard to fit with verse 21. All agree on the command itself: feed the hungry enemy." },
      ] },
    ],
    sources: {
      moo: "Douglas J. Moo, The Epistle to the Romans, New International Commentary on the New Testament (Eerdmans, 1996).",
      schreiner: "Thomas R. Schreiner, Romans, Baker Exegetical Commentary on the New Testament (Baker, 1998).",
      dunn: "James D. G. Dunn, Romans 9-16, Word Biblical Commentary 38B (Word, 1988).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "EPH.2": {
    crossRefs: [
      ["ROM.3", "Romans 3:21-26", "Justified as a gift by His grace through the redemption in Christ"],
      ["ROM.6", "Romans 6:4-11", "Dead to sin, alive to God in Christ"],
      ["TIT.3", "Titus 3:4-7", "Not by works of righteousness, but according to His mercy"],
      ["GAL.3", "Galatians 3:26-28", "All one in Christ Jesus"],
      ["JAS.2", "James 2:14-26", "Faith without works is dead"],
      ["1PE.2", "1 Peter 2:4-10", "Living stones built up as a spiritual house"],
    ],
    intro: "Paul tells the story of salvation in two movements. First, what God did for each of us: dead in sin, made alive with Christ, saved by grace through faith, and created for good works. Second, what God did for all of us together: Jews and Gentiles, once divided by a wall, made one new people and built into one temple where God lives by His Spirit.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "2:1", head: "Dead in your trespasses and sins", ev: "scripture", src: ["arnold", "hoehner"], text: "Paul does not say sick or weak, but dead: cut off from the life of God. The rest of the passage shows why only God could change this." },
        { ref: "2:4", head: "But God", ev: "scripture", src: ["hoehner"], text: "Two words turn the whole passage. After three verses on our condition, God acts, \"being rich in mercy, because of His great love.\"" },
        { ref: "2:6", head: "Raised us up with Him, and seated us with Him", ev: "scripture", src: ["lincoln"], text: "What God did for Christ in 1:20 (raised Him and seated Him at His right hand), He has done for believers \"with Him.\" Paul writes it in the past tense: in Christ it is already true." },
        { ref: "2:8", head: "By grace you have been saved through faith", ev: "scripture", src: ["hoehner", "arnold"], text: "Grace is the source; faith is the means by which it is received. \"Have been saved\" is a Greek perfect: something done in the past that still stands. What exactly \"that is not of yourselves\" points back to is discussed under Scholars and views." },
        { ref: "2:10", head: "We are His workmanship", ev: "strong", src: ["bdag", "lincoln"], text: "Not saved by works (2:9), but saved for good works (2:10). \"Workmanship\" is poiema, something made, like a work of art. God prepared the good works beforehand, \"so that we would walk in them.\"" },
        { ref: "2:12", head: "Without hope and without God", ev: "scripture", src: ["arnold"], text: "Paul describes what Gentiles lacked before Christ: no Messiah, no share in Israel's covenants and promises, no hope. The Greek has atheoi, \"without God,\" though they had many gods." },
        { ref: "2:14", head: "He Himself is our peace", ev: "strong", src: ["arnold", "lincoln"], text: "Christ broke down \"the dividing wall\" between Jew and Gentile. Paul's readers would think of the actual barrier in the Jerusalem temple; see History and culture." },
        { ref: "2:20", head: "The foundation of the apostles and prophets", ev: "good", src: ["hoehner", "lincoln"], text: "The church is pictured as a building with Christ as the cornerstone, the first stone laid, which sets the line for every other. Most commentators read \"prophets\" here as New Testament prophets, since 3:5 and 4:11 name apostles and prophets together." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The temple warning stone", ev: "strong", src: ["josephus", "arnold"], text: "A low stone barrier (the soreg) kept Gentiles out of the inner courts of Herod's temple. Josephus describes warning signs on it in Greek and Latin. Two of them have been found: a complete one in 1871, now in the Istanbul Archaeology Museum, and a fragment in 1935, now in the Israel Museum. They read: \"No foreigner may enter within the barrier around the temple. Whoever is caught will have himself to blame for the death that follows.\" Paul himself was nearly killed when he was accused of bringing a Gentile past it (Acts 21:28-31)." },
        { head: "Ephesus and its temple", ev: "strong", src: ["arnold"], text: "Ephesus was home to the temple of Artemis, one of the Seven Wonders of the ancient world. Paul spent about three years there (Acts 20:31). Writing to Christians who had left that temple, Paul says they are now themselves becoming \"a holy temple in the Lord\" (2:21)." },
        { head: "To whom was the letter sent?", ev: "debated", src: ["metzger", "hoehner"], text: "The words \"in Ephesus\" in 1:1 are missing from several of the oldest manuscripts. Some scholars think the letter was meant to be read in several churches around Ephesus; others hold that it was written to Ephesus itself. The message is the same either way." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "χάρις", say: "charis", strongs: "G5485", count: "about 155 times", means: "grace, favor, a gift freely given", ev: "strong", src: ["bdag"], text: "In everyday Greek it meant kindness or a favor given freely. Paul makes it the heart of the gospel: God's undeserved kindness, given in Christ. It appears three times in this chapter (2:5, 2:7, 2:8), including \"the surpassing riches of His grace.\"" },
        { word: "ποίημα", say: "poiema", strongs: "G4161", count: "twice, Romans 1:20 and Ephesians 2:10", means: "something made, a work", ev: "strong", src: ["bdag"], text: "Our word \"poem\" comes from it, though it means any made thing. In Romans 1:20 it is used of creation itself. In Ephesians 2:10 it is the new creation: believers, made by God in Christ." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "The whole of salvation is the gift", who: "Salvation as gift view", src: ["hoehner", "arnold", "lincoln"], text: "In Greek, \"that\" (touto) is neuter, while \"grace\" and \"faith\" are both feminine. So most commentators read \"that\" as pointing to the whole idea just stated: being saved by grace through faith is not our own doing but God's gift." },
        { head: "Faith itself is the gift", who: "Faith as gift view", src: ["hoehner"], text: "Others, including many older interpreters, read \"that\" as including faith: even the faith by which we receive salvation is given by God. They note that Greek sometimes uses a neuter word to sum up a feminine idea." },
        { head: "Grace, faith and works together", who: "Common ground", src: ["arnold", "lincoln"], text: "Both views agree that salvation is God's work and not something we earn, and that it leads to good works (2:10). How grace, faith, baptism and obedience fit together is discussed across the whole New Testament (for example Titus 3:5, James 2:14-26). Readers should compare those passages too." },
      ] },
    ],
    sources: {
      hoehner: "Harold W. Hoehner, Ephesians: An Exegetical Commentary (Baker, 2002).",
      arnold: "Clinton E. Arnold, Ephesians, Zondervan Exegetical Commentary on the New Testament (Zondervan, 2010).",
      lincoln: "Andrew T. Lincoln, Ephesians, Word Biblical Commentary 42 (Word, 1990).",
      metzger: "Bruce M. Metzger, A Textual Commentary on the Greek New Testament, 2nd ed. (German Bible Society, 1994).",
      josephus: "Flavius Josephus, Jewish War 5.193-194 and Jewish Antiquities 15.417 (first century AD).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "PHP.4": {
    crossRefs: [
      ["PHP.2", "Philippians 2:1-5", "Be of the same mind: have the attitude of Christ"],
      ["MAT.6", "Matthew 6:25-34", "Do not be worried about your life"],
      ["1PE.5", "1 Peter 5:7", "Cast all your anxiety on Him, because He cares for you"],
      ["ACT.16", "Acts 16:11-40", "The church at Philippi begins, and Paul and Silas sing in prison"],
      ["2CO.12", "2 Corinthians 12:9-10", "My grace is sufficient for you"],
      ["1TI.6", "1 Timothy 6:6-8", "Godliness with contentment is great gain"],
    ],
    intro: "Paul writes from prison to the church he loved most. The last chapter is full of joy: stand firm, make peace with each other, rejoice always, pray instead of worrying, think on what is good. He thanks them for their gift and shares a secret he has learned: contentment in any situation, through Christ who gives him strength.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "4:2", head: "Euodia and Syntyche", ev: "scripture", src: ["fee"], text: "Two women who had \"shared my struggle in the cause of the gospel\" (4:3) had fallen out. Paul names them, gently, and asks each the same thing: \"live in harmony in the Lord.\" Women had been at the heart of this church from its first day (Acts 16:13-15)." },
        { ref: "4:3", head: "True companion", ev: "debated", src: ["fee", "hawthorne"], text: "Paul asks his \"true companion\" (syzygos, \"yoke-fellow\") to help the two women. No one knows who this was. Suggestions include Luke, Epaphroditus, Silas, or a man actually named Syzygus, \"true to his name.\"" },
        { ref: "4:4", head: "Rejoice in the Lord always", ev: "scripture", src: ["fee"], text: "Written from prison, with a death sentence possible (1:20). \"Joy\" and \"rejoice\" appear some 16 times in this short letter. Joy \"in the Lord\" does not depend on circumstances, but on Him." },
        { ref: "4:6", head: "Be anxious for nothing", ev: "scripture", src: ["bockmuehl"], text: "Paul gives the alternative to worry: \"in everything by prayer and supplication with thanksgiving let your requests be made known to God.\" Thanksgiving is part of the cure." },
        { ref: "4:7", head: "The peace of God will guard your hearts", ev: "strong", src: ["bdag", "fee"], text: "\"Guard\" is a military word: to keep watch, as a garrison guards a city. Philippi was a Roman colony settled by army veterans, and soldiers were a familiar sight. God's peace stands sentry over the heart and mind." },
        { ref: "4:8", head: "Dwell on these things", ev: "good", src: ["bockmuehl", "hawthorne"], text: "Paul lists eight qualities (true, honorable, right, pure, lovely, of good repute, excellence, worthy of praise). Several were words Greek moral teachers also used. Paul takes the best of what his readers already valued and directs it to the Lord." },
        { ref: "4:11", head: "I have learned to be content", ev: "strong", src: ["bdag", "fee"], text: "\"Content\" is autarkes, a favorite word of Stoic philosophers, who meant being self-sufficient. Paul borrows the word and changes its meaning: not sufficient in himself, but in Christ (4:13)." },
        { ref: "4:13", head: "I can do all things through Him who strengthens me", ev: "scripture", src: ["fee", "bockmuehl"], text: "Often quoted on its own, the verse is about contentment: whether hungry or well fed, in need or in plenty (4:12), Christ gives the strength to face it. It is less about achieving anything and more about enduring everything." },
        { ref: "4:22", head: "Those of Caesar's household", ev: "good", src: ["hawthorne", "fee"], text: "\"Caesar's household\" meant the emperor's slaves and freedmen who ran the imperial service, not his family. They worked wherever the empire did. The gospel had reached people at the heart of the empire's administration." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Philippi, a little Rome", ev: "strong", src: ["fee", "bockmuehl"], text: "Named after Philip II of Macedon, the father of Alexander the Great. After the battle of Philippi in 42 BC and again after the battle of Actium in 31 BC, Rome settled veterans there and made it a colony with Roman law and Latin as an official language. Paul tells them their true \"citizenship is in heaven\" (3:20)." },
        { head: "A church that gave", ev: "scripture", src: ["fee"], text: "The Philippians supported Paul again and again (4:15-16; 2 Corinthians 11:9), though they were poor themselves (2 Corinthians 8:1-2). This chapter is partly a thank-you note for the gift Epaphroditus brought." },
        { head: "Where was Paul in prison?", ev: "debated", src: ["hawthorne", "bockmuehl", "fee"], text: "The traditional view, held by many scholars, is Rome, about AD 60-62 (Acts 28:30). Others suggest Ephesus, about AD 54-55, because of the many trips between Paul and Philippi the letter mentions; a few suggest Caesarea. The letter's message does not depend on the answer." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "αὐτάρκης", say: "autarkes", strongs: "G842", count: "once, Philippians 4:11", means: "content, self-sufficient", ev: "strong", src: ["bdag"], text: "The related noun autarkeia means contentment in 2 Corinthians 9:8 and 1 Timothy 6:6. For Stoic thinkers it meant needing nothing outside oneself; for Paul it means needing nothing outside Christ." },
        { word: "φρουρέω", say: "phroureo", strongs: "G5432", count: "4 times", means: "to guard, to keep under watch", ev: "strong", src: ["bdag"], text: "Used of a city guarded by a garrison (2 Corinthians 11:32), and of believers \"protected by the power of God through faith\" (1 Peter 1:5)." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "A name, or a description?", who: "The true companion", src: ["fee", "hawthorne"], text: "Since Paul does not name the \"true companion,\" scholars offer guesses, each with reasons: Luke, who was with Paul at Philippi's founding (the \"we\" passages of Acts 16 stop there); Epaphroditus, who carried the letter; or Syzygus as a personal name, with Paul punning on it. Scripture is silent, and nothing in the passage depends on it." },
        { head: "Rome, Ephesus or Caesarea", who: "Where Paul wrote", src: ["hawthorne", "bockmuehl"], text: "Those who favor Rome point to the praetorian guard (1:13) and Caesar's household (4:22). Those who favor Ephesus point to the distance: Rome is far from Philippi, and the letter implies several journeys back and forth. Both sides agree Paul was in real danger of death." },
      ] },
    ],
    sources: {
      fee: "Gordon D. Fee, Paul's Letter to the Philippians, New International Commentary on the New Testament (Eerdmans, 1995).",
      hawthorne: "Gerald F. Hawthorne and Ralph P. Martin, Philippians, rev. ed., Word Biblical Commentary 43 (Thomas Nelson, 2004).",
      bockmuehl: "Markus Bockmuehl, The Epistle to the Philippians, Black's New Testament Commentaries (A&C Black, 1997).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },

  "REV.21": {
    crossRefs: [
      ["ISA.65", "Isaiah 65:17-19", "I create new heavens and a new earth"],
      ["ISA.25", "Isaiah 25:8", "He will wipe tears away from all faces"],
      ["EZK.48", "Ezekiel 48:30-35", "A city with twelve gates, named for the tribes: The LORD is there"],
      ["EXO.28", "Exodus 28:17-21", "Twelve stones on the high priest's breastplate"],
      ["2PE.3", "2 Peter 3:13", "New heavens and a new earth, in which righteousness dwells"],
      ["GEN.2", "Genesis 2:8-10", "The first garden, with a river and the tree of life"],
    ],
    intro: "The Bible ends where it began, with heaven and earth, but now made new. God comes to live with His people, wipes away every tear, and ends death and pain. The New Jerusalem descends as a bride, a perfect cube of gold and jewels whose light is the glory of God.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "21:1", head: "There is no longer any sea", ev: "good", src: ["bauckham", "beale"], text: "To ancient Israel, the sea was a place of chaos and danger, and in Revelation the beast rises from it (13:1). Its absence means nothing threatening is left. It also meant something to John, exiled on the island of Patmos and cut off from his churches by water." },
        { ref: "21:3", head: "The tabernacle of God is among men", ev: "scripture", src: ["beale"], text: "\"Tabernacle\" (skene) is the tent where God lived among Israel in the wilderness. John's Gospel used the same word: the Word \"dwelt\" (tabernacled) among us (John 1:14). Now God's promise from Leviticus 26:11-12 is fulfilled completely: \"I will be their God, and they shall be My people.\"" },
        { ref: "21:4", head: "He will wipe away every tear", ev: "scripture", src: ["mounce"], text: "A promise from Isaiah 25:8. Death, mourning, crying and pain, the four sorrows of life since Genesis 3, are listed and then cancelled: \"the first things have passed away.\"" },
        { ref: "21:5", head: "Behold, I am making all things new", ev: "good", src: ["bauckham"], text: "Not \"all new things\" but \"all things new.\" Many scholars note this suggests renewal of this creation rather than replacing it, the way a resurrection body is the same person made new." },
        { ref: "21:16", head: "Twelve thousand stadia", ev: "good", src: ["beale", "mounce"], text: "About 1,400 miles in length, width and height: roughly the distance from Maine to Florida, and as high. The only perfect cube in the Old Testament is the Most Holy Place in Solomon's temple (1 Kings 6:20). The whole city has become the place where God dwells." },
        { ref: "21:19", head: "Adorned with every kind of precious stone", ev: "good", src: ["beale"], text: "Twelve foundation stones, closely matching the twelve stones on the high priest's breastplate (Exodus 28:17-20), which carried the names of the tribes. Now all God's people stand in His presence." },
        { ref: "21:21", head: "Each gate a single pearl", ev: "good", src: ["mounce"], text: "In the ancient world pearls were among the most valuable things anyone could own (Matthew 13:45-46). Pliny the Elder wrote that Cleopatra owned two pearls worth millions. Here each gate is one enormous pearl." },
        { ref: "21:22", head: "I saw no temple in it", ev: "scripture", src: ["bauckham"], text: "For a Jewish reader, a holy city without a temple was startling. The reason: \"the Lord God the Almighty and the Lamb are its temple.\" No sun is needed either, \"for the glory of God has illumined it\" (21:23)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "A book of symbols", ev: "good", src: ["bauckham"], text: "Revelation is apocalyptic writing, a style that uses vivid symbols, numbers and visions, like parts of Daniel and Ezekiel. Twelve (tribes, apostles) and its multiples appear again and again in this chapter: 12 gates, 12 angels, 12 foundations, 12,000 stadia, 144 cubits." },
        { head: "A tale of two cities", ev: "good", src: ["bauckham", "beale"], text: "Revelation contrasts Babylon the great, a harlot dressed in gold and jewels (chapter 17), with the New Jerusalem, a bride adorned for her husband. Many scholars see Babylon as a picture of Rome and every proud power after it." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "καινός", say: "kainos", strongs: "G2537", count: "42 times", means: "new, fresh in kind", ev: "good", src: ["bdag"], text: "Greek has two words for new: neos (new in time, recent) and kainos (new in quality). Revelation uses kainos: a new heaven, new earth, new Jerusalem, a new song and a new name." },
        { word: "σκηνή", say: "skene", strongs: "G4633", count: "20 times", means: "tent, tabernacle, dwelling", ev: "strong", src: ["bdag"], text: "The word behind the English \"scene\": originally the tent or stage building of a Greek theater." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "Future events, described in symbols", who: "Futurist approach", src: ["mounce", "beale"], text: "Many read Revelation 21 as describing the final state after Christ's return. The city may be described in symbols, but it points to a real future home for God's people." },
        { head: "The story of every age", who: "Idealist approach", src: ["beale"], text: "Others read Revelation's visions as pictures of the ongoing struggle between God and evil in every age, ending in God's victory. On this view the New Jerusalem is the people of God themselves, the bride, seen in their final glory." },
        { head: "Written for the first readers", who: "Historical approach", src: ["bauckham"], text: "Others stress what the visions meant to churches under Roman pressure in the first century, who needed to know that Rome's \"Babylon\" would fall and God's city would last. Most scholars combine this with one of the other views." },
      ] },
    ],
    sources: {
      bauckham: "Richard Bauckham, The Theology of the Book of Revelation (Cambridge University Press, 1993).",
      beale: "G. K. Beale, The Book of Revelation, New International Greek Testament Commentary (Eerdmans, 1999).",
      mounce: "Robert H. Mounce, The Book of Revelation, rev. ed., New International Commentary on the New Testament (Eerdmans, 1998).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
    },
  },
};

Object.assign(NOTES, MORE_NOTES);

export const notesFor = (book, chapter) => NOTES[`${book}.${chapter}`] || null;
// Books whose chapter-by-chapter notes live in js/chapters/<book>.js. They load the first time
// a chapter of that book is opened, and the app caches them for offline use.
export const CHAPTER_BOOKS = new Set(["GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "MAL"]);
const bookLoads = {}, bookReady = new Set();
export const bookNotesReady = (book) => !CHAPTER_BOOKS.has(book) || bookReady.has(book);
export const loadBookNotes = (book) => (bookLoads[book] ??= !CHAPTER_BOOKS.has(book) ? Promise.resolve()
  : import(`./chapters/${book.toLowerCase()}.js`).then((m) => {
    for (const [ch, n] of Object.entries(m.default)) NOTES[`${book}.${ch}`] ??= n;
    bookReady.add(book);
  }, () => { delete bookLoads[book]; }));
// In Bible order.
const ORDER = BOOKS.map((b) => b.id);
export const sampleChapters = () => Object.keys(NOTES).filter((k) => !NOTES[k].brief).sort((a, b) => {
  const [ba, ca] = a.split("."), [bb, cb] = b.split(".");
  return (ORDER.indexOf(ba) - ORDER.indexOf(bb)) || (Number(ca) - Number(cb));
});
