// Study notes for each chapter: then-and-now map, history and culture, geography,
// science, original-language words, the main Christian views, and sources.
// Every note carries an evidence label so it's clear what is firm and what is debated.
// Two full samples so far (Genesis 1 and Luke 5). More chapters get added book by book.

export const EVIDENCE = {
  strong: { label: "Strong evidence", tip: "Ancient texts, archaeology or measurement that scholars of all views accept." },
  good: { label: "Good evidence", tip: "Well supported, with some details still discussed." },
  debated: { label: "Debated", tip: "Careful scholars disagree. The main views are shown." },
  faith: { label: "Faith reading", tip: "A way believers read the text. It goes beyond what evidence can show." },
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
  "GEN.1": {
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
        { word: "בְּרֵאשִׁית", say: "bereshit", means: "in the beginning", ev: "debated", src: ["wenham", "halot"], text: "Most translations read it as a full statement: \"In the beginning God created.\" Some Jewish translations read it as \"When God began to create.\" The first reading points more clearly to creation from nothing." },
        { word: "בָּרָא", say: "bara", means: "create", ev: "strong", src: ["halot", "wenham"], text: "In this form of the verb, only God is ever the one who creates. People make (asah) and form (yatsar), but only God creates (bara). It appears three times in verse 27." },
        { word: "אֱלֹהִים", say: "Elohim", means: "God", ev: "faith", src: ["mathews", "wenham"], text: "A plural form that takes singular verbs, often explained as a plural of majesty. Many Christians also see room here, and in \"Let Us make\" (1:26), for the Trinity revealed later in Scripture." },
        { word: "תֹהוּ וָבֹהוּ", say: "tohu va-vohu", means: "formless and void", ev: "strong", src: ["wenham"], text: "A rhyming pair meaning empty and unshaped. Jeremiah uses the same words to describe a land undone by judgment (Jeremiah 4:23)." },
        { word: "רָקִיעַ", say: "raqia", means: "expanse, firmament", ev: "debated", src: ["halot", "walton", "collins"], text: "It comes from a verb meaning to beat or spread out, used for hammering gold thin (Exodus 39:3). Some think it pictures the sky as a solid dome, as neighboring peoples did. Others read it as the open sky or air we see." },
        { word: "יוֹם", say: "yom", means: "day", ev: "debated", src: ["collins", "morris", "ross"], text: "It can mean a 24-hour day, the daylight hours, or a longer time (\"in the day that the Lord God made earth and heaven,\" Genesis 2:4). How to take it in Genesis 1 is the heart of the debate about the days." },
      ] },
      { id: "views", title: "How Christians read it", items: [
        { head: "Six ordinary days, recently", who: "Young earth", src: ["morris"], text: "The days are 24-hour days, marked by \"evening and morning,\" and the earth is thousands of years old. This view is widely held in Churches of Christ and Baptist churches." },
        { head: "Long ages", who: "Day-age, old earth", src: ["ross"], text: "Each day is a long period. The order of creation fits what science finds." },
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
      planck: "Planck Collaboration, \"Planck 2018 results. VI. Cosmological parameters,\" Astronomy & Astrophysics 641 (2020): A6.",
      collins: "C. John Collins, Genesis 1-4: A Linguistic, Literary, and Theological Commentary (P&R, 2006).",
      morris: "Henry M. Morris, The Genesis Record (Baker, 1976).",
      ross: "Hugh Ross, A Matter of Days (NavPress, 2004).",
      blocher: "Henri Blocher, In the Beginning (InterVarsity Press, 1984).",
    },
  },

  "LUK.5": {
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
        { word: "Ἐπιστάτα", say: "epistata", means: "Master", ev: "strong", src: ["bdag", "bock"], text: "A title for someone in charge, like a foreman or overseer. Only Luke uses it in the New Testament. Simon starts with \"Master\" (5:5) and ends with \"Lord\" (5:8)." },
        { word: "δίκτυα", say: "diktya", means: "nets", ev: "good", src: ["nun", "bdag"], text: "The general word for fishing nets. Here they are the heavy night nets the men were washing (5:2)." },
        { word: "ζωγρῶν", say: "zōgrōn", means: "catching alive", ev: "strong", src: ["bdag", "green"], text: "Jesus says \"from now on you will be catching people\" (5:10). The word means to take alive, used elsewhere for capturing people alive in war. Fish caught in nets die. People caught by the gospel are brought to life." },
        { word: "ἁμαρτωλός", say: "hamartōlos", means: "sinner", ev: "strong", src: ["bdag"], text: "Simon calls himself this (5:8), and the Pharisees use it for Levi's friends (5:30). Jesus answers that He came to call sinners to repentance (5:32)." },
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
      josephus: "Josephus, Jewish War 3.506-521 (the lake of Gennesar and its fish).",
      britannica: "Encyclopaedia Britannica, \"Sea of Galilee.\"",
      bock: "Darrell L. Bock, Luke 1:1-9:50, Baker Exegetical Commentary (Baker, 1994).",
      green: "Joel B. Green, The Gospel of Luke, New International Commentary (Eerdmans, 1997).",
      bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
      brown: "Raymond E. Brown, The Gospel According to John XIII-XXI, Anchor Bible (Doubleday, 1970).",
    },
  },
};

export const notesFor = (book, chapter) => NOTES[`${book}.${chapter}`] || null;
export const sampleChapters = () => Object.keys(NOTES);
