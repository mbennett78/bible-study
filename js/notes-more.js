// More full study notes, in the same shape as notes.js (see docs/STUDY-GUIDELINES.md).
// The Christmas chapters first: Isaiah 7 and 9, Micah 5, Matthew 1 and 2, Luke 1.

const OSWALT1 = "John N. Oswalt, The Book of Isaiah, Chapters 1-39, New International Commentary on the Old Testament (Eerdmans, 1986).";
const MOTYER = "J. Alec Motyer, The Prophecy of Isaiah (InterVarsity Press, 1993).";
const HALOT = "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).";
const BDAG = "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).";
const FRANCE = "R. T. France, The Gospel of Matthew, New International Commentary on the New Testament (Eerdmans, 2007).";
const DAVIES = "W. D. Davies and Dale C. Allison, The Gospel According to Saint Matthew, vol. 1, International Critical Commentary (T&T Clark, 1988).";
const KEENER = "Craig S. Keener, The Gospel of Matthew: A Socio-Rhetorical Commentary (Eerdmans, 2009).";
const BROWN = "Raymond E. Brown, The Birth of the Messiah, updated ed. (Doubleday, 1993).";
const BOCK = "Darrell L. Bock, Luke 1:1-9:50, Baker Exegetical Commentary on the New Testament (Baker, 1994).";
const GREEN = "Joel B. Green, The Gospel of Luke, New International Commentary on the New Testament (Eerdmans, 1997).";
const MARSHALL = "I. Howard Marshall, The Gospel of Luke, New International Greek Testament Commentary (Eerdmans, 1978).";
const WALTKE = "Bruce K. Waltke, A Commentary on Micah (Eerdmans, 2007).";
const ALLEN = "Leslie C. Allen, The Books of Joel, Obadiah, Jonah and Micah, New International Commentary on the Old Testament (Eerdmans, 1976).";
const HOEHNER = "Harold W. Hoehner, Chronological Aspects of the Life of Christ (Zondervan, 1977).";
const JOSEPHUS = "Josephus, Antiquities of the Jews 17.6-8 (Herod's last days and death), about AD 93.";
const YAMAUCHI = "Edwin M. Yamauchi, Persia and the Bible (Baker, 1990).";
const TIGLATH = "James B. Pritchard, ed., Ancient Near Eastern Texts Relating to the Old Testament, 3rd ed. (Princeton University Press, 1969), the annals of Tiglath-pileser III.";

export const MORE_NOTES = {
  "ISA.7": {
    crossRefs: [
      ["MAT.1", "Matthew 1:22-23", "The virgin will be with child, and they shall call His name Immanuel"],
      ["ISA.8", "Isaiah 8:8-10", "God is with us"],
      ["ISA.9", "Isaiah 9:6-7", "A child will be born to us"],
      ["2KI.16", "2 Kings 16:5-9", "Ahaz sends to Assyria for help instead"],
      ["2CH.28", "2 Chronicles 28:16-21", "Assyria troubles Ahaz rather than helping him"],
    ],
    intro: "About 735 BC, the kings of Aram (Syria) and of Israel in the north march on Jerusalem to force Judah into their alliance against Assyria. King Ahaz is terrified. God sends Isaiah to tell him to stand firm in faith, and even offers him a sign. Ahaz refuses, so God gives a sign anyway: a young woman, a virgin, will bear a son called Immanuel, \"God with us.\" Matthew sees that promise fulfilled in Jesus.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "7:2", head: "Shaken like trees in the wind", ev: "scripture", src: ["oswalt"], text: "When Ahaz hears that Aram and Ephraim (the northern kingdom of Israel) have joined forces, \"his heart and the hearts of his people shook as the trees of the forest shake with the wind.\"" },
        { ref: "7:3", head: "Shear-jashub", ev: "scripture", src: ["motyer"], text: "Isaiah brings his son, whose name means \"a remnant will return.\" The name itself is a message: judgment will come, but God will keep a remnant." },
        { ref: "7:4", head: "Two smoldering stubs", ev: "scripture", src: ["oswalt"], text: "God calls the two attacking kings \"two stubs of smoldering firebrands\": all smoke, almost burned out. Within a few years Assyria crushed them both, as Isaiah said (7:16)." },
        { ref: "7:9", head: "If you will not believe, you will not last", ev: "strong", src: ["motyer", "halot"], text: "A wordplay in Hebrew: \"If you do not stand firm (ta'aminu) in faith, you will not stand firm (te'amenu) at all.\" Both come from the root aman, the root of \"amen.\"" },
        { ref: "7:11", head: "Ask for a sign", ev: "scripture", src: ["oswalt"], text: "God invites Ahaz to ask for any sign, \"deep as Sheol or high as heaven.\" Ahaz answers with pious words, \"I will not test the LORD,\" but he had already decided to trust Assyria instead (2 Kings 16:7)." },
        { ref: "7:14", head: "The virgin will be with child", ev: "debated", src: ["oswalt", "motyer", "france"], text: "\"The Lord Himself will give you a sign: Behold, a virgin will be with child and bear a son, and she will call His name Immanuel.\" Scholars discuss the Hebrew word almah and whether there was also a child in Ahaz's day; see Scholars and views. Matthew 1:23 quotes it of Jesus' birth." },
        { ref: "7:15", head: "Curds and honey", ev: "good", src: ["oswalt"], text: "Simple food of a land that had gone back to pasture. Before the child is old enough to choose right from wrong, the land of the two threatening kings will be deserted (7:16)." },
        { ref: "7:20", head: "A razor hired from beyond the River", ev: "scripture", src: ["motyer"], text: "The help Ahaz paid for would become the judgment: Assyria, from beyond the Euphrates, would shave Judah bare. Being shaved was a deep humiliation (2 Samuel 10:4)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "The Syro-Ephraimite war", ev: "strong", src: ["tiglath", "oswalt"], text: "About 735-732 BC, Rezin of Aram and Pekah of Israel tried to force Judah into a revolt against Assyria. Ahaz paid Tiglath-pileser III of Assyria instead (2 Kings 16:7-9). Tiglath-pileser's own annals name \"Jehoahaz of Judah\" (Ahaz) among the kings who paid him tribute, and record his capture of Damascus in 732 BC." },
        { head: "The conduit of the upper pool", ev: "good", src: ["oswalt"], text: "Isaiah meets Ahaz by the water channel (7:3), probably as the king inspects Jerusalem's water supply for a siege. Years later, the Assyrian commander would stand at the very same spot to demand Jerusalem's surrender (Isaiah 36:2)." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "עַלְמָה", say: "almah", strongs: "H5959", count: "7 times", means: "young woman of marriageable age, maiden", ev: "debated", src: ["halot", "oswalt"], text: "Used of Rebekah before her marriage (Genesis 24:43) and of Miriam as a girl (Exodus 2:8). In the Old Testament it is never clearly used of a married woman. The Greek translation made before Christ (the Septuagint) rendered it parthenos, \"virgin,\" the word Matthew uses." },
        { word: "עִמָּנוּאֵל", say: "Immanu-el", strongs: "H6005", count: "twice as a name (7:14; 8:8)", means: "God is with us", ev: "strong", src: ["halot"], text: "From im (\"with\"), nu (\"us\") and El (\"God\"). Isaiah 8:10 repeats it as a cry of faith: \"God is with us.\" Matthew translates it for his readers (1:23)." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "A prophecy only of Jesus", who: "Direct prophecy", src: ["motyer"], text: "Some scholars read 7:14 as pointing only to the virgin birth of Christ. They note that God calls it a sign \"deep as Sheol or high as heaven,\" that the child is called \"God with us,\" and that the same child appears again as \"Mighty God\" in 9:6. An ordinary birth would hardly be such a sign." },
        { head: "A sign then, fulfilled fully in Jesus", who: "Double fulfillment", src: ["oswalt", "france"], text: "Others hold that a child was born in Ahaz's day as a near sign (7:16 ties the timing to that child's growing up), and that the promise was filled to the full in Jesus, as Matthew says. Some suggest Isaiah's own son (8:3) or a son of Ahaz, Hezekiah." },
        { head: "Common ground", who: "Common ground", src: ["oswalt", "motyer"], text: "Careful readers agree that Isaiah spoke a real word to a real king in a real crisis, that the promise reaches beyond Ahaz to the coming King of chapters 9 and 11, and that Matthew rightly sees it fulfilled in Jesus, born of the virgin Mary: God with us." },
      ] },
    ],
    sources: { oswalt: OSWALT1, motyer: MOTYER, halot: HALOT, france: FRANCE, tiglath: TIGLATH },
  },

  "ISA.9": {
    crossRefs: [
      ["MAT.4", "Matthew 4:12-17", "Jesus begins in Galilee of the Gentiles: the people in darkness saw a great light"],
      ["LUK.1", "Luke 1:32-33", "He will reign on David's throne, and His kingdom will have no end"],
      ["ISA.11", "Isaiah 11:1-10", "A shoot from the stem of Jesse"],
      ["JHN.8", "John 8:12", "I am the Light of the world"],
      ["ISA.7", "Isaiah 7:14", "Immanuel"],
      ["EPH.2", "Ephesians 2:14", "He Himself is our peace"],
    ],
    intro: "After the dark days of chapter 8, Isaiah sees light breaking over Galilee, the first land Assyria had overrun. A child will be born, a son given, who will carry the government on His shoulders. His four names are some of the best-loved words in the Bible, read at Christmas and sung in Handel's Messiah. The chapter then turns back to warn proud Israel in the north.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "9:1", head: "Galilee of the Gentiles", ev: "strong", src: ["oswalt", "tiglath"], text: "Zebulun and Naphtali, around the Sea of Galilee, were the first to fall to Assyria (2 Kings 15:29, about 732 BC). Isaiah promises that the land first darkened will be the first to see the light. Matthew 4:13-16 sees this fulfilled when Jesus makes His home in Capernaum." },
        { ref: "9:2", head: "A great light", ev: "scripture", src: ["motyer"], text: "\"The people who walk in darkness will see a great light.\" The verbs are written as if it has already happened: the prophet is so sure of God's promise." },
        { ref: "9:4", head: "As at the day of Midian", ev: "scripture", src: ["oswalt"], text: "God will break the oppressor's rod as He did when Gideon's 300 defeated Midian (Judges 7). That victory came by God's power, not by numbers." },
        { ref: "9:5", head: "Boots and bloody cloaks burned", ev: "scripture", src: ["motyer"], text: "The gear of war becomes fuel for the fire. The coming King brings an end to war itself." },
        { ref: "9:6", head: "Wonderful Counselor, Mighty God", ev: "scripture", src: ["oswalt", "motyer"], text: "\"For a child will be born to us, a son will be given to us; and the government will rest on His shoulders; and His name will be called Wonderful Counselor, Mighty God, Eternal Father, Prince of Peace.\" A child is born (human), a son is given (from God)." },
        { ref: "9:6", head: "Mighty God", ev: "strong", src: ["halot", "oswalt"], text: "\"Mighty God\" (El Gibbor) is used again in Isaiah 10:21, plainly of the LORD Himself. This is one reason Christians have long read this child as more than a human king." },
        { ref: "9:7", head: "No end to the increase", ev: "scripture", src: ["motyer"], text: "His kingdom will grow forever, on David's throne, with justice and righteousness. \"The zeal of the LORD of hosts will accomplish this\": God Himself guarantees it. Compare the angel's words to Mary in Luke 1:32-33." },
        { ref: "9:12", head: "His hand is still stretched out", ev: "scripture", src: ["oswalt"], text: "A refrain repeated four times (9:12, 17, 21; 10:4). Israel in the north will not turn back, so judgment continues. The light of 9:2 shines against a very dark background." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Galilee falls first", ev: "strong", src: ["tiglath", "oswalt"], text: "In 733-732 BC Tiglath-pileser III took Galilee and the land east of the Jordan and deported many of its people (2 Kings 15:29). Assyria made the region a province. It is the \"gloom\" of 9:1." },
        { head: "Throne names", ev: "good", src: ["oswalt", "motyer"], text: "Egyptian kings received several grand throne names at their coronation, and some scholars think Isaiah echoes that custom here. These four names go far beyond any human king's: wisdom, divine power, a father's everlasting care, and peace." },
        { head: "Handel's Messiah", ev: "strong", src: ["motyer"], text: "Charles Jennens drew the words of Messiah (first performed in Dublin in 1742) straight from Scripture. \"For unto us a child is born\" sets Isaiah 9:6 in the King James Version, and \"The people that walked in darkness\" sets 9:2." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "פֶּלֶא", say: "pele", strongs: "H6382", means: "wonder, marvel", ev: "strong", src: ["halot"], text: "Used of God's wonders in the exodus (Exodus 15:11) and in the Psalms. When Samson's parents ask the angel's name, he says it is \"wonderful\" (Judges 13:18, a related word). The child's counsel is a wonder, beyond human wisdom." },
        { word: "שַׂר־שָׁלוֹם", say: "sar shalom", means: "Prince of Peace", ev: "strong", src: ["halot", "motyer"], text: "Sar is a ruler or prince; shalom is far more than the end of war: wholeness, well-being, everything as it should be. \"There will be no end to the increase of His government or of peace\" (9:7)." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "The Messiah, and God Himself", who: "Messianic reading", src: ["oswalt", "motyer"], text: "Many scholars read the child as the coming Messiah, and the names \"Mighty God\" and \"Eternal Father\" as showing He is divine. They point to Isaiah 10:21, to the everlasting kingdom of 9:7, and to the New Testament's use of the passage (Matthew 4:15-16; Luke 1:32-33)." },
        { head: "A royal birth in Isaiah's day, pointing ahead", who: "Near and far fulfillment", src: ["oswalt"], text: "Some scholars think Isaiah first had in view a coming king of Judah, often Hezekiah, and that the grand names were titles describing God's work through the king. Most who hold this also see the promise as reaching its true fulfillment only in Christ, since no king of Judah fit it." },
        { head: "Common ground", who: "Common ground", src: ["oswalt", "motyer"], text: "All agree the passage promises a son of David who brings light, justice and lasting peace, and that the hope was greater than any king of Isaiah's time. The New Testament announces that hope fulfilled in Jesus." },
      ] },
    ],
    sources: { oswalt: OSWALT1, motyer: MOTYER, halot: HALOT, tiglath: TIGLATH },
  },

  "MIC.5": {
    crossRefs: [
      ["MAT.2", "Matthew 2:1-6", "The chief priests quote Micah: in Bethlehem of Judea"],
      ["JHN.7", "John 7:42", "Doesn't Scripture say the Christ comes from Bethlehem?"],
      ["1SA.16", "1 Samuel 16:1-13", "David, the shepherd boy of Bethlehem, is anointed"],
      ["EZK.34", "Ezekiel 34:23-24", "My servant David will be their shepherd"],
      ["JHN.10", "John 10:11", "I am the good shepherd"],
      ["EPH.2", "Ephesians 2:14", "He Himself is our peace"],
    ],
    intro: "Micah, a country prophet from Judah's foothills and a younger contemporary of Isaiah, sees Jerusalem besieged and its ruler humiliated. Then he looks to tiny Bethlehem: from there will come a Ruler whose origins are from long ago, who will shepherd His flock in the strength of the LORD and be their peace. Seven centuries later the scholars in Herod's court quoted this verse to the wise men.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "5:1", head: "Struck on the cheek", ev: "scripture", src: ["waltke", "allen"], text: "\"With a rod they will smite the judge of Israel on the cheek.\" A siege, and a ruler disgraced. Many read it of the Assyrian or Babylonian sieges. Christians have also heard an echo in the striking of Jesus (Matthew 27:30). In Hebrew Bibles this verse is 4:14, and 5:2 is numbered 5:1." },
        { ref: "5:2", head: "Bethlehem Ephrathah", ev: "scripture", src: ["waltke"], text: "\"But as for you, Bethlehem Ephrathah, too little to be among the clans of Judah, from you One will go forth for Me to be ruler in Israel.\" Ephrathah was the old name of the area (Genesis 35:19; Ruth 4:11), and it distinguishes this Bethlehem from another in Zebulun (Joshua 19:15)." },
        { ref: "5:2", head: "From the days of eternity", ev: "debated", src: ["waltke", "allen"], text: "\"His goings forth are from long ago, from the days of eternity.\" Some translate \"from ancient times,\" pointing back to David's ancient line; others see a hint that the Ruler existed before His birth. See Scholars and views." },
        { ref: "5:3", head: "Until she who is in labor has borne", ev: "scripture", src: ["waltke"], text: "God's people will be given up for a time, until a mother gives birth. Many link this with Isaiah 7:14, written in the same years: both prophets look for a promised birth." },
        { ref: "5:4", head: "He will shepherd His flock", ev: "scripture", src: ["allen"], text: "He will stand and shepherd \"in the strength of the LORD, in the majesty of the name of the LORD His God,\" and \"He will be great to the ends of the earth.\" David, Bethlehem's most famous son, had been a shepherd too." },
        { ref: "5:5", head: "This One will be our peace", ev: "scripture", src: ["waltke"], text: "Not just a peacemaker, but peace itself. Compare \"Prince of Peace\" (Isaiah 9:6) and Paul: \"He Himself is our peace\" (Ephesians 2:14)." },
        { ref: "5:7", head: "Like dew from the LORD", ev: "scripture", src: ["allen"], text: "The remnant of Jacob among the nations will be like dew and showers, which come from God and \"do not wait for man\": a quiet blessing to the world." },
        { ref: "5:10", head: "I will cut off your horses", ev: "scripture", src: ["waltke"], text: "God will remove the chariots, fortresses, sorcery and idols His people trusted. Their security will be in Him alone." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Micah's day", ev: "strong", src: ["allen", "waltke"], text: "Micah prophesied under Jotham, Ahaz and Hezekiah (1:1), about 740-700 BC. Jeremiah 26:18 quotes him a century later. In 701 BC Assyria's Sennacherib overran Micah's home region of the Shephelah, and his own annals boast that he shut Hezekiah up in Jerusalem \"like a bird in a cage.\"" },
        { head: "Little Bethlehem", ev: "strong", src: ["waltke"], text: "A small town about 6 miles (10 km) south of Jerusalem, in the hills of Judah. Rachel was buried on the way there (Genesis 35:19), Ruth and Boaz lived there, and David was born there (1 Samuel 16). It was \"too little\" to count among Judah's clans, yet God chose it." },
        { head: "Quoted in Herod's court", ev: "scripture", src: ["france"], text: "When the wise men asked where the King was born, the chief priests and scribes answered from Micah 5:2 (Matthew 2:5-6). By Jesus' day, people widely expected the Messiah to come from David's town (John 7:42)." },
      ] },
      { id: "words", title: "Hebrew words", lang: "Hebrew", items: [
        { word: "מוֹצָאֹת", say: "motsaot", strongs: "H4163", means: "goings forth, origins", ev: "debated", src: ["halot", "waltke"], text: "From the verb yatsa, \"to go out.\" It is the same root as \"will go forth\" earlier in the verse: He will go forth from Bethlehem, and His goings forth are from of old." },
        { word: "אֶפְרָתָה", say: "Ephrathah", strongs: "H672", means: "fruitful", ev: "good", src: ["halot"], text: "The old clan name of the Bethlehem area. David's father Jesse is called \"an Ephrathite of Bethlehem in Judah\" (1 Samuel 17:12)." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "One who existed before His birth", who: "Eternal origins", src: ["waltke"], text: "Some scholars read \"from the days of eternity\" as pointing to the Ruler's existence before His birth in Bethlehem, which fits what the New Testament says of Christ (John 1:1; 8:58). They note that the same words describe God's own everlasting days elsewhere (Psalm 90:2 uses olam)." },
        { head: "From David's ancient line", who: "Ancient origins", src: ["allen"], text: "Others translate \"from ancient days\" (compare Amos 9:11, \"as in the days of old\") and read it as tracing the Ruler back to David's line, some three hundred years before Micah. On this view the verse stresses that God is keeping His old promise to David." },
        { head: "Common ground", who: "Common ground", src: ["waltke", "allen"], text: "Both views agree that Micah promised a Ruler from Bethlehem, of David's line, who would shepherd God's people in the LORD's strength and be their peace, and that the Gospels show Jesus, born in Bethlehem, as that Ruler." },
      ] },
    ],
    sources: { waltke: WALTKE, allen: ALLEN, halot: HALOT, france: FRANCE },
  },

  "MAT.1": {
    crossRefs: [
      ["LUK.3", "Luke 3:23-38", "Luke's genealogy of Jesus, back to Adam"],
      ["GEN.12", "Genesis 12:1-3", "God's promise to Abraham: all nations blessed"],
      ["2SA.7", "2 Samuel 7:12-16", "God's promise of David's everlasting throne"],
      ["ISA.7", "Isaiah 7:14", "The virgin will be with child: Immanuel"],
      ["LUK.1", "Luke 1:26-38", "Gabriel visits Mary"],
      ["RUT.4", "Ruth 4:13-22", "Ruth, Boaz, and the line to David"],
    ],
    intro: "The New Testament opens with a family tree. Matthew shows that Jesus is the son of Abraham and the son of David, the one God's promises were heading toward all along. Then he tells the story from Joseph's side: a righteous man, a hard choice, an angel in a dream, and a child named Jesus, \"for He will save His people from their sins.\"",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "1:1", head: "Son of David, son of Abraham", ev: "scripture", src: ["france"], text: "\"The record of the genealogy of Jesus the Messiah, the son of David, the son of Abraham.\" David's son would sit on the everlasting throne (2 Samuel 7); Abraham's offspring would bless all nations (Genesis 22:18). Matthew begins with both promises." },
        { ref: "1:3", head: "Five women", ev: "scripture", src: ["davies", "keener"], text: "Ancient genealogies usually listed only men. Matthew names Tamar, Rahab, Ruth, \"the wife of Uriah\" (Bathsheba) and Mary. Several were foreigners, and each story had something unusual or scandalous about it. God's grace was at work in surprising places." },
        { ref: "1:5", head: "Rahab and Ruth", ev: "scripture", src: ["france"], text: "Rahab was a Canaanite from Jericho (Joshua 2), and Ruth a Moabite (Ruth 1:4). Both joined God's people by faith, and both became ancestors of King David, and of Jesus." },
        { ref: "1:16", head: "Of whom Jesus was born", ev: "strong", src: ["france", "davies"], text: "The pattern \"X was the father of Y\" runs 39 times, then changes: \"Joseph the husband of Mary, by whom Jesus was born.\" In Greek \"whom\" is feminine, pointing to Mary alone. Matthew prepares for the virgin birth." },
        { ref: "1:17", head: "Three sets of fourteen", ev: "good", src: ["davies", "france"], text: "Matthew arranges the line in three groups of fourteen: Abraham to David, David to the exile, the exile to Christ. He skips some generations to do so, which ancient genealogies often did. In Hebrew the letters of David's name (D-W-D) add up to 14, and many scholars think that is the point." },
        { ref: "1:19", head: "A righteous man", ev: "scripture", src: ["keener"], text: "Betrothal was a binding agreement, broken only by divorce. Joseph, \"being a righteous man and not wanting to disgrace her,\" planned to end it quietly. His righteousness included mercy." },
        { ref: "1:21", head: "You shall call His name Jesus", ev: "strong", src: ["bdag", "france"], text: "Jesus is the Greek form of Yeshua (Joshua), \"the LORD saves.\" The angel explains: \"for He will save His people from their sins.\" Naming the child also meant Joseph took Him as his legal son, giving Him David's royal line." },
        { ref: "1:23", head: "God with us", ev: "scripture", src: ["france"], text: "Matthew quotes Isaiah 7:14 and translates Immanuel: \"God with us.\" His Gospel ends with the same promise from the risen Jesus: \"I am with you always\" (28:20)." },
        { ref: "1:25", head: "Kept her a virgin", ev: "scripture", src: ["france"], text: "Joseph took Mary as his wife \"but kept her a virgin until she gave birth to a Son.\" Matthew stresses that Jesus was conceived by the Holy Spirit, not by Joseph." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "Betrothal", ev: "strong", src: ["keener"], text: "A Jewish betrothal was a legal agreement made in front of witnesses, often a year before the wedding. The couple were called husband and wife (1:19-20) but did not yet live together. Unfaithfulness counted as adultery." },
        { head: "Genealogies mattered", ev: "strong", src: ["keener", "davies"], text: "Priests had to prove their descent (Ezra 2:62), and families kept records. Josephus begins his autobiography with his own priestly family line. A king's claim rested on his family tree." },
        { head: "Two genealogies", ev: "debated", src: ["davies", "brown"], text: "Matthew's list runs forward from Abraham through Solomon; Luke's (3:23-38) runs back to Adam through David's son Nathan. Scholars offer explanations; see Scholars and views." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "Ἰησοῦς", say: "Iesous", strongs: "G2424", means: "Jesus; from Hebrew Yeshua, \"the LORD saves\"", ev: "strong", src: ["bdag"], text: "A common name in Jesus' day; Josephus mentions about twenty men called Jesus. The Greek Old Testament uses the same name for Joshua, who led God's people into the promised land." },
        { word: "παρθένος", say: "parthenos", strongs: "G3933", means: "virgin", ev: "strong", src: ["bdag", "france"], text: "The word Matthew uses in 1:23, from the Greek Old Testament of Isaiah 7:14. It is also used of the ten virgins in Jesus' parable (Matthew 25:1)." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "Joseph's line and Mary's line", who: "Two family trees", src: ["davies", "brown"], text: "Many have suggested that Matthew gives Joseph's line and Luke gives Mary's, through her father (an idea found since the 1400s and still held by some scholars). Luke 3:23 says Jesus was \"supposedly\" the son of Joseph." },
        { head: "The royal line and the natural line", who: "Legal and natural descent", src: ["davies"], text: "Others hold that both lists are Joseph's: Matthew traces the legal line of kings through Solomon, while Luke traces Joseph's natural ancestry through Nathan, the two meeting where a man died without a son and a relative carried on his line. An early form of this idea comes from Julius Africanus (about AD 220), quoted by Eusebius." },
        { head: "Common ground", who: "Common ground", src: ["davies", "france"], text: "Both Gospels agree that Jesus is the son of David and was born of the virgin Mary, and that God kept His promises across many generations of very ordinary, and some very flawed, people." },
      ] },
    ],
    sources: { france: FRANCE, davies: DAVIES, keener: KEENER, bdag: BDAG, brown: BROWN },
  },

  "MAT.2": {
    crossRefs: [
      ["MIC.5", "Micah 5:2", "From you, Bethlehem, a Ruler will come"],
      ["NUM.24", "Numbers 24:17", "A star shall come forth from Jacob"],
      ["HOS.11", "Hosea 11:1", "Out of Egypt I called My son"],
      ["JER.31", "Jeremiah 31:15", "Rachel weeping for her children"],
      ["ISA.60", "Isaiah 60:1-6", "Nations come to your light, bringing gold and frankincense"],
      ["EXO.1", "Exodus 1:15-22", "Pharaoh orders the boys killed, but Moses is saved"],
    ],
    intro: "Wise men from the east follow a star to worship the newborn King of the Jews. King Herod pretends he wants to worship too, but plans murder. God warns the wise men and Joseph in dreams. The family escapes to Egypt, Herod kills the little boys of Bethlehem, and after Herod dies the family settles in Nazareth. Matthew shows Jesus reliving Israel's story, and God protecting His Son.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "2:1", head: "Magi from the east", ev: "good", src: ["yamauchi", "france"], text: "Magi were a priestly class from Persia, known for studying the stars and interpreting dreams. They probably came from Persia, Babylon or Arabia. Matthew does not say there were three, or that they were kings: the number three comes from the three gifts." },
        { ref: "2:2", head: "His star in the east", ev: "debated", src: ["brown", "france"], text: "\"In the east\" can also mean \"at its rising.\" What the star was is debated: a miraculous light, a comet, a nova, or a meeting of planets. See Scholars and views. Matthew 2:9 says it \"went on before them\" and stopped over the place." },
        { ref: "2:3", head: "Herod was troubled", ev: "strong", src: ["josephus", "keener"], text: "Herod had executed his wife Mariamne and three of his own sons as possible rivals. Talk of a newborn King of the Jews was dangerous news, and \"all Jerusalem with him\" knew what Herod might do." },
        { ref: "2:6", head: "Bethlehem, by no means least", ev: "scripture", src: ["france"], text: "The scribes quote Micah 5:2 and add words from 2 Samuel 5:2, \"who will shepherd My people Israel.\" Matthew changes Micah's \"too little\" to \"by no means least\": the birth of the King has made the small town great." },
        { ref: "2:11", head: "The house, and the gifts", ev: "scripture", src: ["france", "keener"], text: "By now the family is in a \"house,\" and Jesus is called a \"Child\" (paidion), not a newborn. Gold, frankincense and myrrh were costly gifts fit for a king (compare Isaiah 60:6 and Psalm 72:10-11). Many Christians have seen meaning in each: gold for a king, incense for worship, myrrh for burial (John 19:39)." },
        { ref: "2:15", head: "Out of Egypt I called My Son", ev: "scripture", src: ["france", "davies"], text: "Matthew quotes Hosea 11:1, which first spoke of Israel coming out of Egypt in the exodus. Jesus relives Israel's story: into Egypt, out again, and later through water and into the wilderness (chapters 3-4). Where Israel failed, He is the faithful Son." },
        { ref: "2:16", head: "Two years old and under", ev: "good", src: ["france", "keener"], text: "Herod's age limit suggests the star had first appeared up to two years before. Bethlehem was small; scholars estimate perhaps 10 to 30 boys were killed. Josephus does not record it, but it fits all he says of Herod's cruelty." },
        { ref: "2:18", head: "Rachel weeping", ev: "scripture", src: ["france"], text: "Jeremiah 31:15 pictured Rachel weeping as her descendants were led into exile, near Ramah, but the next verses promise return and a new covenant. Rachel was buried near Bethlehem (Genesis 35:19). The grief is real, and so is the hope." },
        { ref: "2:23", head: "He shall be called a Nazarene", ev: "debated", src: ["davies", "france"], text: "No Old Testament verse says these exact words, and Matthew says \"prophets\" (plural). Many think he is playing on netzer, \"branch\" (Isaiah 11:1), the Messiah's title; others think of the prophets' words that the Messiah would be despised, as Nazareth was (John 1:46)." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "When did Herod die?", ev: "debated", src: ["hoehner", "josephus"], text: "Josephus says Herod died after a lunar eclipse and before Passover. Most scholars date it to 4 BC, which places Jesus' birth about 6-4 BC. A smaller number argue for 1 BC. Our calendar, worked out by the monk Dionysius in AD 525, was off by a few years." },
        { head: "Herod the Great", ev: "strong", src: ["josephus", "keener"], text: "King of Judea for Rome from 37 BC, a brilliant builder (the temple's rebuilding, Caesarea, Masada, the Herodium near Bethlehem) and a ruthless ruler. As he lay dying he ordered leading men to be killed so the nation would mourn at his death; the order was not carried out." },
        { head: "Magi and the Persians", ev: "good", src: ["yamauchi"], text: "The Greek historian Herodotus (400s BC) describes the magi as a priestly tribe of the Medes. Daniel was made chief over the wise men of Babylon (Daniel 2:48). Some suggest that Jewish hopes, like Balaam's \"star from Jacob\" (Numbers 24:17), were known in the east." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "μάγος", say: "magos", strongs: "G3097", count: "6 times", means: "a magus, a wise man of the east; also a sorcerer", ev: "strong", src: ["bdag"], text: "Four times in Matthew 2, of the wise men, and twice in Acts 13 of Bar-Jesus the sorcerer. Matthew's magi are honorable seekers who worship Jesus." },
        { word: "προσκυνέω", say: "proskuneo", strongs: "G4352", means: "to bow down, to worship", ev: "strong", src: ["bdag", "france"], text: "Used three times in this chapter (2:2, 8, 11). The magi truly worship; Herod only says he will. Matthew uses the word often of people coming to Jesus." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "A miraculous light", who: "A miracle", src: ["france"], text: "Some scholars hold that the star was a light God made for the purpose, since it \"went on before them\" and \"stood over\" one house (2:9), which no ordinary star or planet does." },
        { head: "A sign in the sky astronomers could see", who: "An astronomical event", src: ["brown", "hoehner"], text: "Others suggest a real event in the night sky that the magi read as a sign: the meeting of Jupiter and Saturn three times in 7 BC, the meeting of Jupiter and Venus in 3-2 BC, or a comet or new star recorded by Chinese astronomers in 5 BC. Each idea has supporters and problems." },
        { head: "Common ground", who: "Common ground", src: ["france", "brown"], text: "All agree Matthew presents the star as God's sign, guiding Gentile seekers to worship Jesus, the King of the Jews, while Israel's own king tried to kill Him." },
      ] },
    ],
    sources: { france: FRANCE, davies: DAVIES, keener: KEENER, bdag: BDAG, brown: BROWN, josephus: JOSEPHUS, hoehner: HOEHNER, yamauchi: YAMAUCHI },
  },

  "LUK.1": {
    crossRefs: [
      ["1SA.2", "1 Samuel 2:1-10", "Hannah's song, which Mary's song echoes"],
      ["GEN.18", "Genesis 18:10-14", "Is anything too difficult for the LORD? A son for old Sarah"],
      ["MAL.4", "Malachi 4:5-6", "Elijah will turn the hearts of fathers to their children"],
      ["2SA.7", "2 Samuel 7:12-16", "David's throne forever"],
      ["ISA.9", "Isaiah 9:6-7", "On the throne of David, no end to His kingdom"],
      ["MAT.1", "Matthew 1:18-25", "Joseph's side of the story"],
    ],
    intro: "Luke, a careful historian, begins by telling us why he wrote. Then two announcements by the angel Gabriel: to the old priest Zacharias, that his wife Elizabeth will bear John the Baptist, and to young Mary in Nazareth, that she will bear the Son of the Most High. Mary visits Elizabeth, sings the Magnificat, and John is born. The chapter overflows with praise, and with Old Testament hopes coming true.",
    sections: [
      { id: "verses", title: "Verse by verse", items: [
        { ref: "1:3", head: "Investigated everything carefully", ev: "scripture", src: ["bock", "marshall"], text: "Luke writes like the Greek historians of his day: he used eyewitnesses (1:2), \"investigated everything carefully from the beginning,\" and wrote \"in consecutive order\" so Theophilus could \"know the exact truth.\"" },
        { ref: "1:5", head: "The division of Abijah", ev: "strong", src: ["bock"], text: "David organized the priests into 24 divisions that took turns serving at the temple, a week at a time, twice a year (1 Chronicles 24:10 names Abijah's as the eighth). Zacharias and Elizabeth were both from priestly families." },
        { ref: "1:9", head: "Chosen by lot to burn incense", ev: "strong", src: ["green", "bock"], text: "With thousands of priests, a priest might offer the incense only once in his life, if ever. This was Zacharias's great day, and on it Gabriel appeared to him beside the altar of incense." },
        { ref: "1:17", head: "In the spirit and power of Elijah", ev: "scripture", src: ["bock"], text: "Malachi, the last of the prophets, had promised Elijah would come before the day of the LORD (Malachi 4:5-6). After some 400 years of silence, John is that promised forerunner (Matthew 11:14)." },
        { ref: "1:28", head: "Favored one", ev: "strong", src: ["bdag", "marshall"], text: "Gabriel greets Mary as one God has graciously favored. The word (kecharitomene) means she has received God's grace; the same verb is used of all believers in Ephesians 1:6." },
        { ref: "1:32", head: "The throne of His father David", ev: "scripture", src: ["green"], text: "\"He will be great and will be called the Son of the Most High; and the Lord God will give Him the throne of His father David; and He will reign over the house of Jacob forever, and His kingdom will have no end.\" Gabriel echoes 2 Samuel 7 and Isaiah 9:7." },
        { ref: "1:34", head: "How can this be?", ev: "scripture", src: ["bock"], text: "Zacharias asked for proof and was made silent (1:18-20); Mary asks how, and is answered. \"The Holy Spirit will come upon you, and the power of the Most High will overshadow you\" (1:35)." },
        { ref: "1:38", head: "Behold, the bondslave of the Lord", ev: "scripture", src: ["green"], text: "Mary's answer is simple trust: \"may it be done to me according to your word.\" She would face shame and danger in her village, yet she says yes to God." },
        { ref: "1:41", head: "The baby leaped", ev: "scripture", src: ["bock"], text: "When Mary greets Elizabeth, John leaps in his mother's womb, and Elizabeth, filled with the Holy Spirit, calls Mary \"the mother of my Lord.\" John's first act of witness to Jesus comes before he is born." },
        { ref: "1:46", head: "My soul exalts the Lord", ev: "scripture", src: ["green", "marshall"], text: "Mary's song, the Magnificat (from its first word in Latin), is woven from the Old Testament, especially Hannah's song (1 Samuel 2:1-10). God scatters the proud, brings down rulers, lifts the humble and fills the hungry." },
        { ref: "1:63", head: "His name is John", ev: "scripture", src: ["bock"], text: "The relatives expected the boy to be named after his father. Zacharias writes \"His name is John\" (meaning \"the LORD has been gracious\"), obeying the angel, and at once he can speak again." },
        { ref: "1:78", head: "The Sunrise from on high", ev: "scripture", src: ["marshall"], text: "Zacharias's song (the Benedictus) ends with the Messiah as a sunrise: \"to shine upon those who sit in darkness and the shadow of death,\" echoing Isaiah 9:2." },
      ] },
      { id: "history", title: "History and culture", items: [
        { head: "In the days of Herod", ev: "strong", src: ["bock", "hoehner"], text: "Herod the Great ruled Judea for Rome from 37 to about 4 BC. Luke anchors his story in real history, as he does again with Augustus and Quirinius (2:1-2) and the fifteenth year of Tiberius (3:1)." },
        { head: "Barrenness and shame", ev: "good", src: ["green"], text: "Childlessness was often seen as a sorrow and even a disgrace. Elizabeth says God \"looked with favor upon me, to take away my disgrace among men\" (1:25). Like Sarah, Rebekah, Rachel and Hannah before her, she bears a son by God's gift." },
        { head: "Nazareth, a tiny village", ev: "strong", src: ["bock"], text: "Nazareth was a small farming village in the hills of Galilee, perhaps a few hundred people. It is never mentioned in the Old Testament. God's messenger went there, not to Jerusalem or Rome." },
      ] },
      { id: "words", title: "Greek words", lang: "Greek", items: [
        { word: "χαριτόω", say: "charitoo", strongs: "G5487", count: "twice (Luke 1:28; Ephesians 1:6)", means: "to grace, to show favor", ev: "strong", src: ["bdag"], text: "From charis, \"grace.\" Mary is the one to whom God has shown grace. In Ephesians 1:6 God has \"freely bestowed\" the same grace on all who are in Christ." },
        { word: "μεγαλύνω", say: "megaluno", strongs: "G3170", means: "to make great, to magnify, to praise", ev: "strong", src: ["bdag"], text: "\"My soul magnifies the Lord\" (1:46, KJV). Mary cannot make God bigger, but she can declare His greatness. The neighbors say God had \"displayed His great mercy\" to Elizabeth (1:58), using the same word." },
      ] },
      { id: "views", title: "Scholars and views", items: [
        { head: "Mary's family and Elizabeth", who: "Relatives", src: ["bock", "marshall"], text: "Elizabeth is Mary's \"relative\" (1:36), and Elizabeth was \"from the daughters of Aaron\" (1:5), a priestly family. Some scholars think Mary was also of a priestly family; others think she was of David's line (compare 1:27, which may describe Joseph or Mary). Luke does not say exactly how they were related." },
        { head: "Who wrote the songs?", who: "The songs of Luke 1", src: ["brown", "green"], text: "Many scholars read the Magnificat and Benedictus as songs Mary and Zacharias actually sang, steeped in the Scriptures they knew by heart. Others suggest Luke drew them from early Jewish-Christian worship and placed them in the story. Both readings see them as faithful to the people who sing them." },
        { head: "Common ground", who: "Common ground", src: ["bock", "green"], text: "All agree that Luke presents John and Jesus as God's long-promised work, that nothing is impossible with God (1:37), and that Mary's trust is a model for every believer." },
      ] },
    ],
    sources: { bock: BOCK, green: GREEN, marshall: MARSHALL, bdag: BDAG, brown: BROWN, hoehner: HOEHNER },
  },
};
