// Study notes for each chapter: a map with Bible-times and present-day names, history and
// culture, geography, original-language words, scholars' views, and sources.
// Every note carries an evidence label so it's clear what is firm and what is debated.
// Full notes so far: Genesis 1 and 2, Psalm 23, Luke 2, Luke 5, John 1 and John 3. More are added book by book.
//
// A source is a plain citation, or { text, url } when there's a page to open. Every source
// gets a "Look it up" link either way (a library search when there's no page of its own).

// What each part of the study section is, in one line, so nobody wonders what they're reading.
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
};

export const notesFor = (book, chapter) => NOTES[`${book}.${chapter}`] || null;
const ORDER = ["GEN", "PSA", "MAT", "MRK", "LUK", "JHN"];
export const sampleChapters = () => Object.keys(NOTES).sort((a, b) => {
  const [ba, ca] = a.split("."), [bb, cb] = b.split(".");
  return (ORDER.indexOf(ba) - ORDER.indexOf(bb)) || (Number(ca) - Number(cb));
});
