// Study notes for each chapter: then-and-now map, history and culture, geography,
// science, original-language words, the main Christian views, and sources.
// Every note carries an evidence label so it's clear what is firm and what is debated.
// Full notes so far: Genesis 1, Psalm 23, Luke 5 and John 1. More are added book by book.
//
// A source is a plain citation, or { text, url } when there's a page to open. Every source
// gets a "Look it up" link either way (a library search when there's no page of its own).

// What each part of the study section is, in one line, so nobody wonders what they're reading.
export const ABOUT = {
  verses: "Verse by verse: notes on key verses, the way a study Bible explains them at the bottom of the page. Tap a verse number to jump to it.",
  strongs: "Strong's concordance: every Hebrew or Greek word in this chapter, numbered as in James Strong's concordance (1890). Tap a word to see what it means and where else it's used.",
  map: "Map then and now: the places in this chapter, with their names in Bible times and today.",
  history: "Background: the history, culture and archaeology behind the chapter. Each note is labeled with how firm the evidence is.",
  geography: "Geography: the land itself, and how it shapes the story.",
  science: "Science and nature: where the chapter touches the natural world. Science describes how things work; Scripture tells who made them and why. These notes show where the two meet.",
  words: "Key words: important words in the original language, what they mean, and how they're used elsewhere in the Bible.",
  views: "Scholars and views: what Bible scholars and church traditions think. These are interpretations, not Scripture. Where faithful Christians differ, each main view is given fairly, and the common ground is shown.",
  xref: "Cross-references: other passages on the same subject. Scripture is the best explainer of Scripture.",
  search: "Word search: how many times a word or phrase appears in the Bible, and where.",
  sources: "Sources: the commentaries, lexicons and studies behind these notes. Tap Look it up to find any of them.",
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
const NEAR_EAST = {
  bounds: { lat: [24.5, 38.5], lon: [28.5, 49] },
  water: [
    [[31.0, 28.5], [31.2, 29.9], [31.5, 31.0], [31.3, 32.3], [31.1, 33.3], [31.3, 34.2], [31.9, 34.65], [32.8, 34.95], [33.3, 35.2], [33.9, 35.45], [34.4, 35.8], [35.2, 35.9], [35.6, 35.75], [36.0, 35.95], [36.6, 36.2], [36.9, 36.0], [36.8, 35.5], [36.7, 34.7], [36.3, 34.0], [36.1, 33.4], [36.2, 32.6], [36.6, 31.9], [36.8, 30.7], [36.4, 30.4], [36.2, 29.6], [36.6, 28.5]],
    [[30.05, 48.5], [29.4, 48.0], [28.3, 48.6], [27.0, 49.6], [26.3, 50.1], [25.5, 50.8], [24.5, 51.2], [24.5, 49.0], [26.0, 49.0], [27.5, 48.6], [29.0, 48.2], [29.9, 49.0]],
  ],
  rivers: [
    [[31.4, 31.0], [30.05, 31.25], [28.1, 30.75], [27.2, 31.2], [26.15, 32.7], [25.7, 32.65], [24.5, 32.9]],
    [[37.0, 38.5], [36.0, 38.2], [34.5, 40.9], [33.4, 43.3], [32.55, 44.3], [31.0, 46.0], [30.45, 47.65], [30.05, 48.5]],
    [[37.5, 42.4], [36.35, 43.15], [35.0, 43.6], [33.3, 44.4], [32.0, 45.8], [31.0, 47.4], [30.45, 47.65]],
  ],
  islands: [[[35.2, 32.3], [35.6, 34.6], [35.1, 34.0], [34.6, 33.0], [34.9, 32.4]]],
  riverLabels: [{ lat: 27.4, lon: 31.6, text: "Nile" }, { lat: 34.2, lon: 41.2, text: "Euphrates" }, { lat: 35.4, lon: 44.0, text: "Tigris" }],
  waterLabel: { lat: 33.6, lon: 31.9, text: "Mediterranean Sea" },
};

export const NOTES = {
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
      caption: "Genesis 1 names no places. This map shows where the creation stories of Israel's neighbors were written down, so you can see what Genesis was speaking into.",
      places: [
        { lat: 31.78, lon: 35.23, then: "Jerusalem", now: "Jerusalem", note: "Where Israel's Scriptures were kept and read in the temple." },
        { lat: 32.54, lon: 44.42, then: "Babylon", now: "Ruins near Hillah, Iraq", note: "Home of the creation epic Enuma Elish, where the god Marduk builds the world from a defeated sea goddess." },
        { lat: 36.36, lon: 43.15, dy: -6, then: "Nineveh", now: "Mosul, Iraq", note: "Tablets of Enuma Elish were found here in King Ashurbanipal's library in the 1840s and 1850s." },
        { lat: 29.85, lon: 31.25, then: "Memphis", now: "Mit Rahina, near Cairo, Egypt", note: "An Egyptian text (the Shabaka Stone) says the god Ptah made things by thought and word." },
        { lat: 35.6, lon: 35.78, side: "right", dy: 12, then: "Ugarit", now: "Ras Shamra, near Latakia, Syria", note: "Its Baal stories describe a storm god fighting Yam, the sea." },
      ],
    },
    sections: [
      { id: "history", title: "History and culture", items: [
        { head: "One God, no battle", ev: "strong", src: ["dalley", "hasel"], text: "In Babylon's Enuma Elish, the world is made after a war among gods: Marduk splits the sea goddess Tiamat in two to form sky and earth. Genesis 1 has no rival gods and no struggle. God speaks, and it is so. Even the great sea creatures (1:21) are just creatures God made and called good." },
        { head: "The sun and moon aren't named", ev: "debated", src: ["hasel", "wenham"], text: "Verse 16 says \"the greater light\" and \"the lesser light\" instead of the usual Hebrew words for sun and moon, which were also names of gods in the region. Many scholars think this is on purpose: the lights people worshiped are only lamps God hung in the sky. Others think it's simply the poetic style of the chapter." },
        { head: "Made in His image", ev: "good", src: ["walton", "wenham", "mathews"], text: "Kings in the ancient Near East set up statues, called images, to show where they ruled. Genesis gives that honor to every person, male and female (1:27): each one represents God's rule on earth. In neighboring stories, people were made to do the gods' chores." },
        { head: "A pattern of forming and filling", ev: "strong", src: ["wenham", "mathews"], text: "Days 1 to 3 shape the spaces (light, sky and sea, land). Days 4 to 6 fill them (lights, birds and fish, animals and people). The seventh day, when God rests, stands apart. This careful structure is plain in the Hebrew." },
      ] },
      { id: "science", title: "Science and nature", items: [
        { head: "The universe had a beginning", ev: "strong", src: ["planck"], text: "Measurements of the cosmic background light show the universe has not always existed. Its age is measured at about 13.8 billion years." },
        { head: "How believers relate this to Genesis", ev: "faith", src: ["ross", "morris", "collins"], text: "Many Christians see harmony with \"In the beginning God created.\" Old-earth believers accept the measured age and read the days as long ages or as God's workdays. Young-earth believers hold that the days were recent, ordinary days, and they question the assumptions behind the long ages. Science can describe how the world works. It can't prove or disprove that God created it." },
        { head: "Light before the sun", ev: "debated", src: ["collins", "ross", "morris"], text: "Light appears on day 1 (1:3), but the sun, moon and stars on day 4 (1:14-19). Some say God Himself was the first light source. Some say the sun already existed and became visible from the earth's surface on day 4. Others say the days are arranged by topic, not in time order." },
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
        { head: "Six ordinary days, recently", who: "Young earth", src: ["morris"], text: "The days are 24-hour days, marked by \"evening and morning,\" and the earth is thousands of years old. This view is widely held in Churches of Christ and Baptist churches." },
        { head: "Real days, a mature creation", who: "Young earth, created mature", src: ["morris"], text: "The days are real days, but God made a working world that looked older from the start, as Adam was made a grown man and trees were made already bearing fruit (1:11-12, 2:7). Some add that floods, earthquakes and other forces can make things look older than they are." },
        { head: "Long ages", who: "Day-age, old earth", src: ["ross"], text: "Each day is a long period. Some note that the sun, moon and seasons that mark our days aren't set in place until day 4 (1:14-19), so the first days may not be 24-hour days. The order of creation fits what science finds." },
        { head: "God's workdays", who: "Analogical days", src: ["collins"], text: "The days are God's workdays, told in a way that's like a human work week, and they give the pattern for our own week and Sabbath. They aren't meant to give the age of the earth." },
        { head: "A framework", who: "Literary framework", src: ["blocher"], text: "The six days are a frame that arranges creation by topic (forming and filling) to teach who made all things and why." },
        { head: "A cosmic temple", who: "Functional view", src: ["walton"], text: "Genesis 1 tells how God set up the world as His temple, giving each part its role, and then took up His rest in it." },
        { head: "What all of them agree on", who: "Common ground", src: ["mathews"], text: "God alone made everything. Creation is good. Every human being bears God's image. The Sabbath points to God's rest." },
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
      collins: "C. John Collins, Genesis 1-4: A Linguistic, Literary, and Theological Commentary (P&R, 2006).",
      morris: "Henry M. Morris, The Genesis Record (Baker, 1976).",
      ross: "Hugh Ross, A Matter of Days (NavPress, 2004).",
      blocher: "Henri Blocher, In the Beginning (InterVarsity Press, 1984).",
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
        { head: "Levi at the tax booth", ev: "good", src: ["green", "bock"], text: "Capernaum sat on a road near the border between Herod Antipas' territory and Philip's, so tolls were collected there. Tax collectors were seen as cheats who worked with foreign powers, which is why the religious leaders objected to Jesus eating with them (5:30)." },
      ] },
      { id: "geography", title: "Geography", items: [
        { head: "The lowest freshwater lake on earth", ev: "strong", src: ["britannica", "josephus"], text: "The lake's surface lies about 690 feet (210 meters) below sea level. It is about 13 miles long and 8 miles wide, fed by the Jordan River from the north. The Jewish historian Josephus praised its sweet water and its many kinds of fish." },
        { head: "Sudden storms", ev: "strong", src: ["britannica"], text: "Hills rise steeply around the lake. Cool air from the heights can rush down onto the warm water and stir up strong winds quickly, as in the storm of Luke 8:22-25." },
      ] },
      { id: "science", title: "Science and nature", items: [
        { head: "Why they fished at night", ev: "good", src: ["nun"], text: "In clear daylight fish can see a net and swim away, so trammel nets were set at night. Simon's \"we worked hard all night\" (5:5) describes the normal way to fish. Letting the nets down in daytime, in deep water, was not what an expert would expect to work." },
        { head: "St. Peter's fish", ev: "good", src: ["nun"], text: "The lake's best-known fish is a tilapia (Sarotherodon galilaeus), served today as \"St. Peter's fish.\" Tilapia swim in large schools, which helps explain a catch big enough to tear nets and nearly sink two boats (5:6-7)." },
        { head: "A miracle, or good timing?", ev: "faith", src: ["bock"], text: "Some try to explain the catch as a school of fish that Jesus happened to spot. Luke tells it as a sign of who Jesus is. Simon's response is not \"good fishing\" but \"I am a sinful man, Lord\" (5:8)." },
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
export const sampleChapters = () => Object.keys(NOTES);
