// Isaiah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  oswalt: "John N. Oswalt, The Book of Isaiah, 2 vols., New International Commentary on the Old Testament (Eerdmans, 1986-98).",
  motyer: "J. Alec Motyer, Isaiah, Tyndale Old Testament Commentaries (InterVarsity Press, 1999).",
  childs: "Brevard S. Childs, Isaiah, Old Testament Library (Westminster John Knox, 2001).",
  smithG: "Gary V. Smith, Isaiah, 2 vols., New American Commentary 15A-B (B&H, 2007-09).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["oswalt", "motyer"] }, {
  1: {
    intro: "The vision of Isaiah son of Amoz in the days of Uzziah, Jotham, Ahaz and Hezekiah, kings of Judah. \"Sons I have reared, but they have revolted against Me.\" An ox knows its owner, but Israel does not know God. Their sacrifices and feasts are worthless while their hands are full of blood. \"Wash yourselves... learn to do good; seek justice.\" \"Come now, and let us reason together... though your sins are as scarlet, they will be as white as snow.\"",
    v: [
      ["1:3", "An ox knows its owner", "Even an ox and a donkey know who feeds them. God's own people do not know Him or understand."],
      ["1:13", "Bring your worthless offerings no longer", "The people kept festivals and offered sacrifices while their hands were full of wrongdoing (1:15). God calls that worship empty."],
      ["1:17", "Seek justice, reprove the ruthless, defend the orphan", "Instead of more rituals, God asks for justice: correct the oppressor, defend the orphan, plead for the widow."],
      ["1:18", "Though your sins are as scarlet, they will be as white as snow", "Scarlet dye was hard to wash out. God invites His people to come and settle things with Him, and He will make them clean."],
    ],
    bg: [["Isaiah's times", "Isaiah prophesied from about 740 to 700 BC, when Assyria was the superpower. He saw the northern kingdom fall in 722 BC and Jerusalem nearly captured in 701 BC.", "strong", ["oswalt", "kitchen"]]],
    refs: [["MIC.6", "Micah 6:6-8", "What does the LORD require?"], ["PSA.51", "Psalm 51:7", "Whiter than snow"], ["JAS.1", "James 1:27", "Pure religion"]],
  },
  2: {
    intro: "In the last days the mountain of the LORD's house will be raised above all mountains, and all nations will stream to it. \"Come, let us go up to the mountain of the LORD... that He may teach us His ways.\" \"They will hammer their swords into plowshares... nation will not lift up sword against nation.\" But now the land is full of idols, and the proud will be humbled when the LORD alone is exalted.",
    v: [
      ["2:2", "In the last days", "In the last days the mountain of the LORD's house will stand above all others, and all nations will stream to it. Micah 4:1-3 has the same prophecy."],
      ["2:3", "That He may teach us concerning His ways", "The nations come not to fight but to learn God's ways and walk in His paths. His word goes out from Jerusalem."],
      ["2:4", "Swords into plowshares", "With God as judge, nations will beat their swords into farm tools and never train for war again."],
      ["2:11", "The LORD alone will be exalted in that day", "Proud looks will be brought low and human arrogance humbled. On that day only the LORD will be lifted high."],
    ],
    bg: [["Swords into plowshares", "A sculpture with this theme, a gift from the Soviet Union in 1959, stands in the United Nations garden in New York. The same prophecy appears in Micah 4:1-3.", "strong", ["oswalt"]]],
    refs: [["MIC.4", "Micah 4:1-4", "The same prophecy"], ["REV.21", "Revelation 21:24-26", "The nations walk by its light"]],
  },
  3: {
    intro: "The LORD is removing Jerusalem's support: its leaders, warriors, judges and prophets. Youths and the inexperienced will rule. \"Say to the righteous that it will go well with them.\" God judges the elders who plundered the poor, and the proud women of Zion who walk with heads held high.",
    v: [
      ["3:4", "I will make mere lads their princes", "When God removes wise leaders, inexperienced ones fill the gap."],
      ["3:10", "It will go well with them", "In the middle of judgment on Jerusalem, God tells the righteous it will go well with them. They will enjoy the fruit of their deeds."],
      ["3:14-15", "Crushing My people", "God brings charges against Judah's leaders: they have robbed the poor and crushed His people."],
      ["3:16-23", "Anklets, headbands, crescent ornaments...", "Isaiah lists more than twenty pieces of finery, the pride of a city that ignored the poor."],
    ],
    bg: [["Jewelry from Isaiah's day", "The finery in 3:18-23 (anklets, crescent pendants, earrings, nose rings, signet rings, perfume boxes) matches the kinds of jewelry archaeologists have found in Judah and its neighbors from this period.", "good", ["oswalt", "motyer"]]],
    refs: [["AMO.4", "Amos 4:1", "Cows of Bashan who oppress the poor"]],
  },
  4: {
    intro: "After judgment, \"the Branch of the LORD will be beautiful and glorious.\" Those left in Zion will be called holy, washed clean. Over Mount Zion God will create a cloud by day and fire by night, a shelter and shade like the wilderness journey.",
    v: [
      ["4:1", "Seven women will take hold of one man", "So many men will die in war that women will beg for a husband's name."],
      ["4:2", "The Branch of the LORD", "On that day the Branch of the LORD will be beautiful and glorious. Later prophets use Branch as a title for the coming King (Jeremiah 23:5; Zechariah 3:8)."],
      ["4:4", "By the spirit of judgment and the spirit of burning", "God's cleansing fire purifies a remnant."],
      ["4:5", "A cloud by day... a flaming fire by night", "God will cover Zion with cloud by day and fire by night, as He led Israel in the wilderness (Exodus 13:21)."],
    ],
    bg: [["The Branch", "\"Branch\" (tsemach) became a title for the coming King from David's line (Jeremiah 23:5; 33:15; Zechariah 3:8; 6:12). Some readers think in Isaiah 4:2 it may simply mean the land's fruitfulness, but many see the Messiah here too.", "debated", ["oswalt", "motyer"]]],
    refs: [["JER.23", "Jeremiah 23:5", "A righteous Branch"], ["ZEC.3", "Zechariah 3:8", "My servant the Branch"], ["EXO.13", "Exodus 13:21", "The pillar of cloud and fire"]],
  },
  5: {
    intro: "The Song of the Vineyard: God planted a choice vine, did everything for it, and \"expected it to produce good grapes, but it produced only worthless ones.\" The vineyard is Israel. Six woes follow on those who add house to house, chase strong drink, \"call evil good, and good evil,\" and are wise in their own eyes.",
    v: [
      ["5:4", "What more was there to do for My vineyard?", "In the song of the vineyard, God did everything a farmer could do, yet His vineyard, Israel, produced only bad grapes."],
      ["5:7", "He looked for justice, but behold, bloodshed", "A wordplay in Hebrew: mishpat and mishpach."],
      ["5:20", "Woe to those who call evil good", "Woe to those who call evil good and good evil, who swap darkness for light and bitter for sweet."],
    ],
    refs: [["MAT.21", "Matthew 21:33-43", "Jesus' parable of the vineyard"], ["JHN.15", "John 15:1-8", "The true vine"]],
  },
  6: {
    intro: "\"In the year of King Uzziah's death I saw the Lord sitting on a throne, lofty and exalted.\" Seraphim cry, \"Holy, Holy, Holy, is the LORD of hosts, the whole earth is full of His glory.\" Isaiah cries, \"Woe is me, for I am ruined!\" A seraph touches his lips with a burning coal: \"Your iniquity is taken away.\" God asks, \"Whom shall I send?\" Isaiah answers, \"Here am I. Send me!\"",
    v: [
      ["6:1", "In the year of King Uzziah's death", "About 740 BC; an earthly king dies, the true King is seen."],
      ["6:3", "Holy, Holy, Holy", "The seraphim call out to one another, holy, holy, holy. Saying a word three times in Hebrew stresses it as strongly as possible."],
      ["6:5", "Woe is me, for I am ruined", "Seeing the King, Isaiah does not feel important. He sees his own sin and the sin of his people, and cries out."],
      ["6:7", "Your iniquity is taken away", "A seraph touches Isaiah's lips with a burning coal from the altar. His guilt is taken away before he is ever sent."],
      ["6:8", "Here am I. Send me!", "God asks who will go for Him. Cleansed and forgiven, Isaiah answers right away: here I am, send me."],
    ],
    w: [["קָדוֹשׁ", "qadosh", "H6918", "holy", "Set apart, utterly different and pure. Saying it three times was the strongest way to express \"most holy.\" Isaiah's favorite title for God is \"the Holy One of Israel,\" used about 25 times.", ["halot", "oswalt"]]],
    refs: [["REV.4", "Revelation 4:8", "Holy, holy, holy"], ["JHN.12", "John 12:39-41", "Isaiah saw His glory"], ["LUK.5", "Luke 5:8", "Depart from me, for I am a sinful man"]],
  },
  8: {
    intro: "Isaiah names a son Maher-shalal-hash-baz, \"swift is the booty,\" a sign that Assyria will soon plunder Damascus and Samaria. Assyria will flood into Judah too, \"Immanuel.\" \"It is the LORD of hosts whom you should regard as holy... He shall become a sanctuary; but to both houses of Israel, a stone to strike and a rock to stumble over.\" \"To the law and to the testimony!\"",
    v: [
      ["8:8", "O Immanuel", "Assyria will flood the land like a river up to the neck. Yet this is Immanuel's land, and \"God with us\" is still true (8:10)."],
      ["8:13", "It is the LORD of hosts whom you should regard as holy", "People were afraid of plots and alliances. God says the One to fear is the LORD of hosts."],
      ["8:14", "A stone to strike and a rock to stumble over", "The LORD will be a sanctuary for some and a stone that trips others. Peter applies this to Jesus (1 Peter 2:8)."],
      ["8:20", "To the law and to the testimony!", "When people turn to mediums for answers (8:19), Isaiah says turn to God's teaching and testimony. Test everything by His word."],
    ],
    refs: [["1PE.2", "1 Peter 2:8", "A stone of stumbling"], ["1PE.3", "1 Peter 3:14-15", "Do not fear their intimidation"], ["ISA.7", "Isaiah 7:14", "Immanuel"]],
  },
  10: {
    intro: "Woe to those who make unjust laws and rob the poor. Assyria is \"the rod of My anger,\" but Assyria boasts in its own power: \"Is the axe to boast itself over the one who chops with it?\" God will punish Assyria's pride. A remnant of Israel will return to the Mighty God.",
    v: [
      ["10:5", "Woe to Assyria, the rod of My anger", "God used Assyria like a rod to discipline His people, but Assyria will be judged for its own pride and cruelty."],
      ["10:15", "Is the axe to boast itself over the one who chops with it?", "Assyria boasts as if it won by its own power. An axe cannot brag against the one who swings it."],
      ["10:21", "A remnant will return to the Mighty God", "A remnant of Israel will return to the Mighty God. Isaiah named his son Shear-jashub, \"a remnant will return\" (7:3)."],
    ],
    refs: [["ROM.9", "Romans 9:27", "Paul quotes the remnant promise"], ["HAB.1", "Habakkuk 1:6-11", "God uses Babylon"]],
  },
  11: {
    intro: "\"A shoot will spring from the stem of Jesse, and a branch from his roots will bear fruit. The Spirit of the LORD will rest on Him, the spirit of wisdom and understanding.\" He will judge the poor with righteousness. \"The wolf will dwell with the lamb... and a little boy will lead them.\" \"The earth will be full of the knowledge of the LORD as the waters cover the sea.\"",
    v: [
      ["11:1", "A shoot will spring from the stem of Jesse", "From David's family, cut down like a stump."],
      ["11:2", "The Spirit of the LORD will rest on Him", "The Spirit of the LORD will rest on this shoot from Jesse's family, with wisdom, understanding, counsel and might. The Spirit came on Jesus at His baptism (Matthew 3:16)."],
      ["11:6", "The wolf will dwell with the lamb", "Under the coming King, wolf and lamb will lie down together, and a little child will lead them. Creation itself will be at peace."],
      ["11:9", "As the waters cover the sea", "No harm or destruction on God's holy mountain, because the earth will be full of the knowledge of the LORD as water fills the sea."],
    ],
    refs: [["MAT.3", "Matthew 3:16", "The Spirit descends on Jesus"], ["ROM.15", "Romans 15:12", "The root of Jesse"], ["REV.5", "Revelation 5:5", "The Root of David"]],
  },
  12: {
    intro: "A short song for \"that day.\" \"I will give thanks to You, O LORD; for although You were angry with me, Your anger is turned away, and You comfort me. Behold, God is my salvation, I will trust and not be afraid.\" \"You will joyously draw water from the springs of salvation.\"",
    v: [
      ["12:2", "God is my salvation, I will trust and not be afraid", "This song echoes Moses' song after the Red Sea (Exodus 15:2). God is my salvation; I will trust and not be afraid."],
      ["12:3", "Draw water from the springs of salvation", "Drawing water from a well was daily work. Isaiah pictures God's people drawing joy from the wells of salvation."],
      ["12:4", "Make known His deeds among the peoples", "Praise is not only private: it tells the nations."],
      ["12:6", "Great in your midst is the Holy One of Israel", "Isaiah's favorite name for God closes the first part of his book."],
    ],
    bg: [["Drawing water with joy", "In later Jewish practice at the Feast of Tabernacles, priests drew water from the Pool of Siloam and poured it out at the altar with great rejoicing, singing words like Isaiah 12:3. On the last day of that feast Jesus stood and cried out, \"If anyone is thirsty, let him come to Me and drink\" (John 7:37).", "good", ["oswalt", "motyer"]]],
    refs: [["EXO.15", "Exodus 15:2", "The LORD is my strength and song"], ["JHN.7", "John 7:37-38", "Rivers of living water"]],
  },
  13: {
    intro: "The first of the oracles against the nations: Babylon. The LORD musters an army; the day of the LORD comes, cruel with fury. The stars will not shine. God will stir up the Medes against Babylon, and Babylon, the glory of kingdoms, will become like Sodom, never inhabited again.",
    v: [
      ["13:6", "The day of the LORD is near", "The day of the LORD is near. In the prophets this phrase means the time when God comes to judge."],
      ["13:17", "I will stir up the Medes", "Fulfilled when the Medes and Persians took Babylon in 539 BC."],
      ["13:19", "Babylon... will be as when God overthrew Sodom", "Babylon, the jewel of kingdoms, will be overthrown like Sodom and Gomorrah. Its ruins in Iraq stood empty for centuries."],
    ],
    refs: [["JER.50", "Jeremiah 50-51", "Babylon's fall"], ["REV.18", "Revelation 18", "Babylon the great has fallen"]],
  },
  14: {
    intro: "God will have compassion on Jacob. Israel will taunt the king of Babylon: \"How you have fallen from heaven, O star of the morning, son of the dawn!\" He said, \"I will ascend to heaven... I will make myself like the Most High,\" but he is brought down to Sheol. Oracles follow against Assyria and Philistia. \"The LORD has founded Zion, and the afflicted of His people will seek refuge in it.\"",
    v: [
      ["14:12", "How you have fallen from heaven, O star of the morning", "A taunt against the king of Babylon, the proud \"morning star\" (Latin Lucifer) cast down. Many Christians also see in it the fall of Satan; readers differ."],
      ["14:13-14", "I will make myself like the Most High", "The king wanted to raise his throne above God's stars and make himself like the Most High. This is the root of all pride."],
      ["14:27", "His stretched-out hand, who can turn it back?", "The LORD of hosts has made His plan. Who can stop it? His hand is stretched out, and no one can turn it back."],
    ],
    why: "Isaiah 14:12-15 taunts the king of Babylon as a \"star of the morning\" who fell from heaven. Readers discuss whether it also describes Satan.",
    views: [
      ["The king of Babylon only", "Many scholars read it strictly as a taunt-song about a proud human king, using poetic images of a star trying to climb above the others.", ["oswalt", "childs"]],
      ["Also a picture of Satan's fall", "Many early church writers, and teachers since, saw behind the king the pride of Satan, comparing Luke 10:18 and Ezekiel 28, while affirming the passage first addresses Babylon's king.", ["motyer", "smithG"]],
    ],
    common: "All agree the passage shows how God brings down pride that tries to take His place.",
    refs: [["EZK.28", "Ezekiel 28:12-17", "The king of Tyre"], ["LUK.10", "Luke 10:18", "I saw Satan fall like lightning"], ["PRO.16", "Proverbs 16:18", "Pride goes before destruction"]],
  },
  15: {
    intro: "An oracle about Moab. In one night its cities are destroyed. People wail on every rooftop; heads are shaved in mourning. Even God's heart cries out for Moab as refugees flee.",
    v: [
      ["15:1", "In a night Ar of Moab is laid waste", "The disaster comes suddenly. Ar and Kir were Moab's chief cities."],
      ["15:2", "Dibon has gone up to the high places to weep", "In their grief the people turn to the shrines of their god Chemosh, which cannot save them."],
      ["15:5", "My heart cries out for Moab", "God grieves even over judgment, and the prophet shares that grief."],
      ["15:9", "The waters of Dibon are full of blood", "The play on words (Dimon or Dibon, and dam, blood) makes the river itself a picture of loss."],
    ],
    bg: [["The Moabite Stone", "In 1868 a black stone was found at Dhiban, the Dibon of this chapter. On it Mesha king of Moab (2 Kings 3) boasts of freeing Moab from Israel with the help of Chemosh. It names Dibon, Medeba, Nebo and other towns in Isaiah 15-16, and it mentions Omri king of Israel and the LORD by name.", "strong", ["oswalt", "kitchen"]]],
    refs: [["JER.48", "Jeremiah 48", "Moab's judgment"], ["RUT.1", "Ruth 1", "Ruth the Moabite"]],
  },
  16: {
    intro: "Moab's refugees ask Judah for shelter. Then: \"A throne will even be established in lovingkindness, and a judge will sit on it in faithfulness in the tent of David.\" Moab's pride is famous. Within three years Moab's glory will be brought low.",
    v: [
      ["16:1", "Send the tribute lamb to the ruler of the land", "Moab had once paid Israel tribute in lambs. King Mesha sent 100,000 lambs a year (2 Kings 3:4)."],
      ["16:3-4", "Hide the outcasts, do not betray the fugitive", "Moab's refugees ask Judah for the very shelter Moab once gave David's parents."],
      ["16:5", "A throne established in lovingkindness... in the tent of David", "A promise of a righteous King."],
      ["16:6", "We have heard of the pride of Moab", "Pride brings ruin."],
      ["16:14", "Within three years, as a hired man would count them", "Exactly three years: a hired worker counted the days of his contract carefully."],
    ],
    bg: [["Moab and David's family", "Ruth, David's great-grandmother, came from Moab. When Saul hunted David, David took his father and mother to the king of Moab for safety (1 Samuel 22:3-4). Isaiah 16 imagines Moab now asking David's house for refuge.", "good", ["oswalt", "smithG"]]],
    refs: [["2KI.3", "2 Kings 3:4", "Mesha's tribute of lambs"], ["1SA.22", "1 Samuel 22:3-4", "David's parents in Moab"], ["AMO.9", "Amos 9:11", "The tent of David restored"]],
  },
  17: {
    intro: "Damascus will become a heap of ruins, and Israel's glory will fade, leaving only a few olives on the tree. In that day people will look to their Maker. \"You have forgotten the God of your salvation.\" The roaring nations will flee like chaff before the wind.",
    v: [
      ["17:6", "Two or three olives on the topmost bough", "After harvest, only a few olives are left where poles cannot reach: a picture of the small remnant left."],
      ["17:7", "In that day man will have regard for his Maker", "Judgment turns hearts back."],
      ["17:10", "You have forgotten the God of your salvation", "The root problem."],
      ["17:12-14", "At evening time, behold, terror! Before morning they are no more", "Many link this to Sennacherib's army, struck down in one night outside Jerusalem (Isaiah 37:36)."],
    ],
    bg: [["Damascus and Israel against Judah", "Around 734 BC Damascus (Aram) and Israel joined to attack Judah. Assyria's king Tiglath-pileser III captured Damascus in 732 BC and took much of northern Israel, as his own records and 2 Kings 15-16 describe.", "strong", ["oswalt", "kitchen"]]],
    refs: [["ISA.37", "Isaiah 37:36", "Gone by morning"], ["2KI.16", "2 Kings 16:9", "Damascus captured by Assyria"]],
  },
  18: {
    intro: "An oracle to Cush (Ethiopia), a land of tall people sending messengers by papyrus boats. God waits quietly like heat in sunshine. In the end, gifts will be brought from Cush to Mount Zion, the place of the name of the LORD.",
    v: [
      ["18:2", "Vessels of papyrus on the waters", "Light reed boats, used on the Nile for thousands of years."],
      ["18:4", "I will look from My dwelling place quietly", "God's timing."],
      ["18:5", "Before the harvest... he will cut off the sprigs", "Like a vinedresser pruning just before harvest, God will cut short Assyria's plans at the right moment."],
      ["18:7", "A gift of homage will be brought to the LORD of hosts", "Distant nations come to God."],
    ],
    bg: [["Cush and its pharaohs", "Cush was the Nile kingdom south of Egypt (in today's Sudan), not modern Ethiopia. In Isaiah's day its kings ruled Egypt too, as the 25th Dynasty. One of them, Tirhakah, marched against Assyria in Hezekiah's time (2 Kings 19:9). Their envoys were probably seeking allies against Assyria. Isaiah's answer: wait for God.", "strong", ["oswalt", "kitchen"]]],
    refs: [["2KI.19", "2 Kings 19:9", "Tirhakah king of Cush"], ["ACT.8", "Acts 8:27-39", "An Ethiopian official believes"]],
  },
  19: {
    intro: "God rides on a swift cloud to Egypt. Egypt's idols tremble, the Nile dries up, its wise men become fools. Then a surprise: \"In that day there will be an altar to the LORD in the midst of the land of Egypt.\" Egypt and Assyria, Israel's great enemies, will worship together. \"Blessed is Egypt My people, and Assyria the work of My hands, and Israel My inheritance.\"",
    v: [
      ["19:1", "The LORD is riding on a swift cloud", "God comes in judgment."],
      ["19:19", "An altar to the LORD in the midst of Egypt", "Enemies become worshipers."],
      ["19:25", "Blessed is Egypt My people", "An astonishing promise of salvation for the nations."],
    ],
    refs: [["EPH.2", "Ephesians 2:14-16", "Two made into one"], ["MAT.2", "Matthew 2:13-15", "Jesus in Egypt"]],
  },
  20: {
    intro: "When Assyria captured the Philistine city of Ashdod, God told Isaiah to walk barefoot and stripped like a captive for three years, a sign that Assyria would lead Egypt and Cush away as captives. Those who trusted in Egypt would be ashamed.",
    v: [
      ["20:1", "Sargon the king of Assyria", "Sargon II, once known only from the Bible, was confirmed when his palace was found in 1843."],
      ["20:3", "As a sign and token", "Isaiah's life became a message."],
      ["20:6", "Such is our hope", "Trusting Egypt was foolish."],
    ],
    bg: [["Sargon found", "For centuries Isaiah 20:1 was the only known mention of Sargon. In 1843 his palace at Khorsabad was excavated, with inscriptions describing his capture of Ashdod in 711 BC.", "strong", ["kitchen", "oswalt"]]],
    refs: [["EZK.4", "Ezekiel 4", "Another acted-out prophecy"]],
  },
  21: {
    intro: "A vision of judgment on Babylon. A watchman sees riders: \"Fallen, fallen is Babylon; and all the images of her gods are shattered on the ground.\" Short oracles follow for Edom (\"Watchman, how far gone is the night?\") and Arabia.",
    v: [
      ["21:2", "Go up, Elam, lay siege, Media", "Elam and Media, peoples of the east, would bring Babylon down."],
      ["21:9", "Fallen, fallen is Babylon", "Echoed in Revelation 14:8."],
      ["21:11", "Watchman, how far gone is the night?", "Waiting for dawn."],
      ["21:16-17", "Within a year... the glory of Kedar will end", "Kedar was a powerful Arabian tribe of the desert."],
    ],
    bg: [["Which fall of Babylon?", "Babylon fell more than once. Some scholars link this vision to the Assyrian king Sennacherib's capture of Babylon in 689 BC; others to its fall to Cyrus of Persia in 539 BC, since Elam and Media fought on Cyrus's side. Either way, the gods of Babylon could not save it.", "debated", ["oswalt", "motyer"]]],
    refs: [["REV.14", "Revelation 14:8", "Fallen is Babylon the great"], ["REV.18", "Revelation 18:2", "Babylon has fallen"]],
  },
  22: {
    intro: "Jerusalem celebrates on the rooftops while disaster comes. They check their weapons and water supply \"but you did not depend on Him who made it.\" Instead of repenting they say, \"Let us eat and drink, for tomorrow we may die.\" The proud steward Shebna will be replaced by Eliakim, on whose shoulder God will place the key of the house of David.",
    v: [
      ["22:11", "You did not depend on Him who made it", "Preparation without prayer."],
      ["22:13", "Let us eat and drink, for tomorrow we may die", "Quoted in 1 Corinthians 15:32."],
      ["22:22", "The key of the house of David", "Applied to Jesus in Revelation 3:7."],
    ],
    bg: [["The Siloam tunnel", "Hezekiah's tunnel, carved through rock to bring water into Jerusalem, still exists. An inscription found in it in 1880 describes the two crews meeting. Isaiah 22:9-11 refers to this water work.", "strong", ["kitchen", "oswalt"]]],
    refs: [["2KI.20", "2 Kings 20:20", "Hezekiah's tunnel"], ["REV.3", "Revelation 3:7", "He who has the key of David"], ["1CO.15", "1 Corinthians 15:32", "Let us eat and drink"]],
  },
  23: {
    intro: "An oracle about Tyre, the great sea-trading city. Ships of Tarshish wail because Tyre is destroyed. \"The LORD of hosts has planned it, to defile the pride of all beauty.\" After seventy years Tyre will trade again, but her profits will be set apart for the LORD.",
    v: [
      ["23:1", "Wail, O ships of Tarshish", "Sailors returning from the far west hear the news at Cyprus (Kittim)."],
      ["23:9", "The LORD of hosts has planned it", "God humbles the proud and wealthy."],
      ["23:15", "Tyre will be forgotten for seventy years", "A set time of humbling, like Judah's seventy years."],
      ["23:18", "Her gain will be set apart to the LORD", "Wealth used for God."],
    ],
    bg: [["Tyre's long fall", "Tyre stood on an island and withstood many attacks. Assyria pressed it in Isaiah's day, Nebuchadnezzar besieged it for thirteen years (about 585-572 BC), and Alexander the Great finally took it in 332 BC by building a causeway out to the island.", "strong", ["oswalt", "kitchen"]]],
    refs: [["EZK.26", "Ezekiel 26-28", "Tyre's judgment"], ["REV.18", "Revelation 18:11-19", "Merchants weep"]],
  },
  24: {
    intro: "Isaiah 24-27 is sometimes called the \"Little Apocalypse.\" The LORD lays the earth waste because people \"transgressed laws, violated statutes, broke the everlasting covenant.\" Joy is gone. Yet from the ends of the earth come songs: \"Glory to the Righteous One.\" The LORD of hosts will reign on Mount Zion.",
    v: [
      ["24:5", "Broke the everlasting covenant", "All humanity accountable."],
      ["24:16", "Glory to the Righteous One", "Praise in the midst of judgment."],
      ["24:23", "The LORD of hosts will reign", "God's final kingship."],
    ],
    refs: [["REV.6", "Revelation 6:12-17", "Cosmic judgment"], ["GEN.9", "Genesis 9:16", "The everlasting covenant"]],
  },
  25: {
    intro: "\"O LORD, You are my God; I will exalt You.\" God has been a refuge for the poor. On this mountain the LORD will prepare a lavish banquet for all peoples. \"He will swallow up death for all time, and the Lord GOD will wipe tears away from all faces.\" \"Behold, this is our God for whom we have waited.\"",
    v: [
      ["25:4", "A defense for the helpless", "God shelters the weak."],
      ["25:6", "A lavish banquet for all peoples", "God's great feast."],
      ["25:8", "He will swallow up death for all time", "Quoted in 1 Corinthians 15:54."],
      ["25:9", "This is our God for whom we have waited", "Joy at God's coming."],
    ],
    refs: [["1CO.15", "1 Corinthians 15:54", "Death swallowed up in victory"], ["REV.21", "Revelation 21:4", "He will wipe away every tear"], ["MAT.8", "Matthew 8:11", "Many will come from east and west"]],
  },
  26: {
    intro: "A song: \"We have a strong city; He sets up walls and ramparts for security.\" \"The steadfast of mind You will keep in perfect peace, because he trusts in You. Trust in the LORD forever, for in GOD the LORD, we have an everlasting Rock.\" \"Your dead will live; their corpses will rise. You who lie in the dust, awake and shout for joy.\"",
    v: [
      ["26:3", "You will keep in perfect peace", "Hebrew: shalom shalom, peace upon peace."],
      ["26:4", "An everlasting Rock", "God never shifts."],
      ["26:19", "Your dead will live", "One of the clearest Old Testament promises of resurrection."],
    ],
    refs: [["PHP.4", "Philippians 4:7", "The peace of God guards your hearts"], ["DAN.12", "Daniel 12:2", "Many who sleep will awake"], ["JHN.5", "John 5:28-29", "All in the tombs will hear His voice"]],
  },
  27: {
    intro: "In that day the LORD will punish Leviathan, the fleeing serpent. A new song of the vineyard: \"I, the LORD, am its keeper; I water it every moment.\" Israel will blossom and fill the whole world with fruit. A great trumpet will sound, and the scattered will come and worship on the holy mountain.",
    v: [
      ["27:1", "Leviathan the fleeing serpent", "God defeats all evil."],
      ["27:3", "I water it every moment", "Contrast with the vineyard of chapter 5."],
      ["27:6", "Fill the whole world with fruit", "Blessing to the world."],
      ["27:13", "A great trumpet will be blown", "God gathers His people."],
    ],
    refs: [["ISA.5", "Isaiah 5:1-7", "The first vineyard song"], ["1TH.4", "1 Thessalonians 4:16", "The trumpet of God"], ["REV.12", "Revelation 12:9", "The serpent of old"]],
  },
  28: {
    intro: "Woe to the drunken leaders of Ephraim. Jerusalem's leaders mock Isaiah's simple teaching: \"Order on order, line on line.\" They have made a covenant with death. But God says, \"Behold, I am laying in Zion a stone, a tested stone, a costly cornerstone... He who believes in it will not be disturbed.\" A farmer knows when to plow and thresh, because God teaches him.",
    v: [
      ["28:10", "Order on order, line on line", "Mocking Isaiah as baby talk."],
      ["28:16", "A costly cornerstone", "Applied to Christ in Romans 9:33 and 1 Peter 2:6."],
      ["28:29", "Wonderful in counsel and great in wisdom", "God's wise ways."],
    ],
    refs: [["1PE.2", "1 Peter 2:6", "A precious cornerstone"], ["ROM.9", "Romans 9:33", "He who believes will not be disappointed"]],
  },
  29: {
    intro: "Woe to Ariel (Jerusalem). The people are spiritually asleep; God's message is like a sealed book. \"This people draw near with their words and honor Me with their lip service, but they remove their hearts far from Me.\" Yet a day is coming when the deaf will hear and the blind will see.",
    v: [
      ["29:13", "Honor Me with their lip service", "Jesus quoted this (Mark 7:6-7)."],
      ["29:16", "Shall the potter be considered as equal with the clay?", "Who is God?"],
      ["29:18", "The deaf will hear... the blind will see", "Fulfilled in Jesus' ministry."],
    ],
    refs: [["MRK.7", "Mark 7:6-7", "This people honors Me with their lips"], ["MAT.11", "Matthew 11:5", "The blind receive sight"]],
  },
  30: {
    intro: "Woe to those who go to Egypt for help without asking God. \"In repentance and rest you will be saved, in quietness and trust is your strength. But you were not willing.\" Yet the LORD longs to be gracious. \"Your ears will hear a word behind you, This is the way, walk in it.\"",
    v: [
      ["30:15", "In quietness and trust is your strength", "Rest in God, not alliances."],
      ["30:18", "The LORD longs to be gracious to you", "God waits to bless."],
      ["30:21", "This is the way, walk in it", "God's guidance."],
    ],
    refs: [["PSA.46", "Psalm 46:10", "Be still and know"], ["JHN.10", "John 10:27", "My sheep hear My voice"]],
  },
  31: {
    intro: "\"Woe to those who go down to Egypt for help and rely on horses.\" The Egyptians are men and not God; their horses are flesh and not spirit. Like a lion over its prey, like birds hovering, the LORD of hosts will protect Jerusalem. \"Return to Him from whom you have deeply defected.\"",
    v: [
      ["31:1", "Rely on horses", "Judah's leaders hoped Egypt's chariot horses could stop Assyria. They looked everywhere except to \"the Holy One of Israel\" (31:1)."],
      ["31:3", "The Egyptians are men and not God", "Flesh and spirit: the strongest army is still only human, and God is Spirit."],
      ["31:5", "Like flying birds the LORD will protect Jerusalem", "God is pictured both as a lion that will not be scared off (31:4) and as a mother bird hovering over her nest."],
    ],
    bg: [["Assyria turned back from Jerusalem", "31:8 says Assyria will fall by a sword not of man. In 701 BC King Sennacherib's army threatened Jerusalem, and 2 Kings 19:35 tells how the angel of the LORD struck the camp. Sennacherib's own records boast that he shut Hezekiah up \"like a bird in a cage,\" but never claim that he took the city.", "strong", ["kitchen", "oswalt"]]],
    refs: [["PSA.20", "Psalm 20:7", "Some trust in chariots"]],
  },
  32: {
    intro: "\"Behold, a king will reign righteously.\" Each ruler will be like a shelter from the wind and like streams of water in a dry land. The complacent women of Jerusalem will mourn. But the Spirit will be poured out from on high, and \"the work of righteousness will be peace.\"",
    v: [
      ["32:1", "A king will reign righteously", "The coming righteous King."],
      ["32:2", "Like a shelter from the wind", "Leaders who protect."],
      ["32:15", "Until the Spirit is poured out upon us from on high", "Renewal by the Spirit."],
      ["32:17", "The work of righteousness will be peace", "Righteousness brings peace."],
    ],
    refs: [["JOL.2", "Joel 2:28", "I will pour out My Spirit"], ["ACT.2", "Acts 2:17", "The Spirit poured out"]],
  },
  33: {
    intro: "\"O LORD, be gracious to us; we have waited for You.\" Sinners in Zion are terrified: \"Who among us can live with the consuming fire?\" The one who walks righteously. \"Your eyes will see the King in His beauty.\" \"For the LORD is our judge, the LORD is our lawgiver, the LORD is our king; He will save us.\"",
    v: [
      ["33:2", "Be our strength every morning", "Daily dependence."],
      ["33:17", "Your eyes will see the King in His beauty", "A future hope."],
      ["33:22", "The LORD is our judge... lawgiver... king", "God holds every office."],
    ],
    refs: [["PSA.15", "Psalm 15", "Who may dwell with God?"], ["HEB.12", "Hebrews 12:29", "Our God is a consuming fire"]],
  },
  34: {
    intro: "God's judgment on the nations, pictured in Edom. The sky will be rolled up like a scroll and the stars will fall. Edom's land will become a desert of thorns where owls and wild animals live. \"Seek from the book of the LORD, and read.\"",
    v: [
      ["34:4", "The sky will be rolled up like a scroll", "Echoed in Revelation 6:14."],
      ["34:6", "The LORD has a sacrifice in Bozrah", "Bozrah was Edom's chief city."],
      ["34:11", "The pelican and hedgehog will possess it", "Once proud cities become home to wild creatures."],
      ["34:16", "Seek from the book of the LORD, and read", "God's word comes true."],
    ],
    bg: [["Edom as a picture", "Chapters 34 and 35 belong together. Edom stands for every proud nation set against God, and its land becomes a desert. Then chapter 35 turns the picture around: the desert of God's people will bloom, and the redeemed will come to Zion with singing.", "good", ["oswalt", "motyer"]]],
    refs: [["ISA.35", "Isaiah 35", "The desert will bloom"], ["REV.6", "Revelation 6:14", "The sky split like a scroll"], ["OBA.1", "Obadiah", "Edom's judgment"]],
  },
  35: {
    intro: "\"The wilderness and the desert will be glad, and the Arabah will rejoice and blossom.\" \"Say to those with anxious heart, Take courage, fear not. Behold, your God will come.\" \"Then the eyes of the blind will be opened and the ears of the deaf will be unstopped. Then the lame will leap like a deer.\" A highway called the Highway of Holiness. \"The ransomed of the LORD will return and come with joyful shouting to Zion.\"",
    v: [
      ["35:1", "The desert will blossom", "Creation renewed."],
      ["35:4", "Take courage, fear not", "Comfort for anxious hearts."],
      ["35:5-6", "The blind will see... the lame will leap", "Jesus pointed to these signs (Matthew 11:5)."],
      ["35:10", "Sorrow and sighing will flee away", "Everlasting joy."],
    ],
    refs: [["MAT.11", "Matthew 11:4-5", "Go and report to John"], ["ACT.3", "Acts 3:8", "The lame man leaps"], ["REV.21", "Revelation 21:4", "No more mourning"]],
  },
  36: {
    intro: "Chapters 36-39 are history, nearly the same as 2 Kings 18-20. In 701 BC Sennacherib of Assyria captures Judah's fortified cities. His officer, the Rabshakeh, stands outside Jerusalem and mocks: \"On whom do you rely?\" He tells the people in Hebrew that the LORD cannot save them. The people keep silent as Hezekiah commanded.",
    v: [
      ["36:4", "What is this confidence that you have?", "The enemy attacks faith itself."],
      ["36:18", "Has any one of the gods of the nations delivered his land?", "The Rabshakeh's mistake: the LORD is not like idols."],
      ["36:21", "They were silent", "No need to argue."],
    ],
    bg: [["Sennacherib's account", "Sennacherib's own record on a clay prism (now in museums in Chicago, London and Jerusalem) boasts that he shut up Hezekiah \"like a bird in a cage\" in Jerusalem. It does not claim to have captured the city.", "strong", ["kitchen", "oswalt"]]],
    refs: [["2KI.18", "2 Kings 18:13-37", "The same story"], ["2CH.32", "2 Chronicles 32", "Hezekiah and Sennacherib"]],
  },
  37: {
    intro: "Hezekiah tears his clothes and sends to Isaiah. When Sennacherib sends a threatening letter, Hezekiah spreads it before the LORD and prays: \"You alone are God.\" Isaiah answers with God's word against Assyria. That night the angel of the LORD strikes 185,000 in the Assyrian camp. Sennacherib returns home and is later killed by his own sons.",
    v: [
      ["37:14", "Spread it out before the LORD", "Bringing troubles to God."],
      ["37:20", "That all the kingdoms of the earth may know that You alone, LORD, are God", "Praying for God's glory."],
      ["37:36", "The angel of the LORD went out and struck", "God's deliverance."],
    ],
    refs: [["2KI.19", "2 Kings 19", "The same story"], ["PSA.46", "Psalm 46", "God is our refuge"]],
  },
  38: {
    intro: "Hezekiah becomes mortally ill. Isaiah tells him to set his house in order. Hezekiah turns his face to the wall, prays and weeps. God answers: \"I have heard your prayer, I have seen your tears; behold, I will add fifteen years to your life.\" As a sign, the shadow on the stairway goes back ten steps. Hezekiah writes a psalm of thanks.",
    v: [
      ["38:3", "Remember now, O LORD", "Hezekiah reminds God of his faithful life. It is not bragging but the honest prayer of a man facing death."],
      ["38:5", "I have heard your prayer, I have seen your tears", "God answers quickly. 2 Kings 20:4 says the word came before Isaiah had even left the palace courtyard."],
      ["38:17", "You have cast all my sins behind Your back", "Out of sight: God puts our sins where He will not look at them again (Micah 7:19)."],
    ],
    bg: [["The stairway of Ahaz", "The sign in 38:8 is the shadow on the stairway of Ahaz going back ten steps. Steps or dials that marked time by the sun's shadow were known in the ancient world. Whatever its form, the sign was a miracle given in answer to prayer.", "good", ["oswalt"]]],
    refs: [["2KI.20", "2 Kings 20:1-11", "The same story"], ["JAS.5", "James 5:15-16", "The prayer of faith"]],
  },
  39: {
    intro: "Envoys from Merodach-baladan, king of Babylon, visit Hezekiah, and he proudly shows them all his treasures. Isaiah announces that one day everything in his house will be carried off to Babylon, and some of his descendants will serve in the palace there. Hezekiah answers, \"The word of the LORD is good... for there will be peace and truth in my days.\"",
    v: [
      ["39:2", "Hezekiah... showed them all his treasure house", "Pride after deliverance."],
      ["39:6", "All that is in your house... will be carried to Babylon", "Fulfilled about a century later."],
      ["39:8", "There will be peace and truth in my days", "A troubling answer."],
    ],
    bg: [["Merodach-baladan", "Merodach-baladan II was a real Babylonian ruler who rebelled against Assyria twice (around 721-710 and 703 BC). His interest in Hezekiah fits his search for allies against Assyria.", "strong", ["kitchen", "oswalt"]]],
    refs: [["2KI.20", "2 Kings 20:12-19", "The same story"], ["DAN.1", "Daniel 1:3-6", "Judah's young men serve in Babylon"]],
  },
  40: {
    intro: "\"Comfort, O comfort My people,\" says your God. Jerusalem's warfare is ended and her iniquity removed. \"A voice is calling, Clear the way for the LORD in the wilderness.\" All flesh is grass, \"but the word of our God stands forever.\" God tends His flock like a shepherd. Who has measured the waters in His hand? To whom will you compare God? \"Those who wait for the LORD will gain new strength; they will mount up with wings like eagles.\"",
    v: [
      ["40:1", "Comfort, O comfort My people", "After 39 chapters full of warnings, Isaiah's tone changes. God tells His prophets to comfort His people."],
      ["40:3", "Clear the way for the LORD", "A voice calls to prepare a highway for the LORD in the desert. All four Gospels apply this to John the Baptist (Matthew 3:3)."],
      ["40:8", "The word of our God stands forever", "People are like grass that withers and flowers that fade, but God's word stands forever. Peter quotes this in 1 Peter 1:24-25."],
      ["40:11", "Like a shepherd He will tend His flock", "The God who measures the oceans in His hand (40:12) carries His lambs close to His heart and gently leads the mothers."],
      ["40:31", "They will mount up with wings like eagles", "Those who wait for the LORD, trusting Him, will find new strength. They will soar like eagles, run and not grow weary."],
    ],
    why: "Isaiah 40-66 speaks to people in Babylonian exile and names Cyrus, who lived 150 years after Isaiah. Scholars discuss how these chapters relate to Isaiah son of Amoz.",
    views: [
      ["One prophet, Isaiah", "Many hold that Isaiah himself wrote the whole book, predicting the exile and Cyrus by God's revelation, noting that the New Testament quotes chapters 40-66 as Isaiah's words (John 12:38-41) and that the book shares one style and theme, \"the Holy One of Israel.\"", ["oswalt", "motyer", "smithG"]],
      ["Isaiah's message carried on", "Others think later prophets in Isaiah's tradition wrote chapters 40-66 during and after the exile, addressing their own day, while the book was deliberately joined as one message.", ["childs"]],
    ],
    common: "All agree the book was received as one inspired whole, and that chapters 40-66 announce God's comfort, the return from exile, and the coming Servant.",
    refs: [["MAT.3", "Matthew 3:3", "The voice of one crying in the wilderness"], ["1PE.1", "1 Peter 1:24-25", "The word of the Lord endures forever"], ["JHN.10", "John 10:11", "The good shepherd"]],
  },
  41: {
    intro: "God calls the nations to court. He has raised up a conqueror from the east. Idol makers encourage each other to nail their idols down so they won't totter. But to Israel God says, \"Do not fear, for I am with you; do not anxiously look about you, for I am your God. I will strengthen you, surely I will help you, surely I will uphold you with My righteous right hand.\"",
    v: [
      ["41:8", "Abraham My friend", "God calls Israel the offspring of Abraham, His friend. James 2:23 also calls Abraham God's friend."],
      ["41:10", "Do not fear, for I am with you", "Do not fear, for I am with you. God promises His presence, strength, help and His righteous right hand holding them up."],
      ["41:13", "I am the LORD your God, who upholds your right hand", "The LORD takes His people by the right hand, like a parent with a child, and says: do not fear, I will help you."],
      ["41:23", "Declare the things that are going to come", "God challenges the idols: tell us what is going to happen, so we know you are gods. They cannot; only the LORD can."],
    ],
    refs: [["JAS.2", "James 2:23", "Abraham the friend of God"], ["HEB.13", "Hebrews 13:5-6", "I will never desert you"]],
  },
  42: {
    intro: "The first Servant Song: \"Behold, My Servant, whom I uphold; My chosen one in whom My soul delights. I have put My Spirit upon Him.\" \"A bruised reed He will not break and a dimly burning wick He will not extinguish.\" He will be a light to the nations, opening blind eyes. \"Sing to the LORD a new song.\"",
    v: [
      ["42:1", "Behold, My Servant... in whom My soul delights", "The first of Isaiah's Servant Songs. God delights in His Servant and puts His Spirit on Him. The Father's words at Jesus' baptism echo this (Matthew 3:17; 12:18-21)."],
      ["42:3", "A bruised reed He will not break", "Gentle with the weak. Quoted in Matthew 12:18-21."],
      ["42:6", "A light to the nations", "God's Servant will be a covenant for the people and a light for the nations, to open blind eyes and free prisoners (42:7)."],
      ["42:8", "My glory I will not give to another", "I am the LORD; that is My name. God will not share His glory with any idol."],
    ],
    bg: [["The Servant Songs", "Four passages (42:1-9, 49:1-13, 50:4-11, 52:13-53:12) describe the Servant of the LORD. Sometimes Israel is called God's servant, but these songs describe one who suffers to restore Israel itself. The New Testament sees them fulfilled in Jesus.", "strong", ["oswalt", "motyer"]]],
    refs: [["MAT.12", "Matthew 12:17-21", "Matthew quotes Isaiah 42"], ["MAT.3", "Matthew 3:17", "My beloved Son, in whom I am well-pleased"], ["LUK.2", "Luke 2:32", "A light of revelation to the Gentiles"]],
  },
  43: {
    intro: "\"Do not fear, for I have redeemed you; I have called you by name; you are Mine! When you pass through the waters, I will be with you.\" \"You are precious in My sight... and I love you.\" \"You are My witnesses... before Me there was no God formed.\" \"Behold, I will do something new.\" \"I, even I, am the one who wipes out your transgressions for My own sake.\"",
    v: [
      ["43:1", "I have called you by name; you are Mine", "The God who created and formed Israel says: do not fear, I have redeemed you, I have called you by name, you are Mine."],
      ["43:2", "When you pass through the waters, I will be with you", "God does not promise there will be no deep waters or fire. He promises to be with His people when they go through them."],
      ["43:4", "You are precious in My sight", "You are precious and honored in My sight, and I love you. God speaks to His people with deep tenderness."],
      ["43:19", "Behold, I will do something new", "Do not just dwell on the past, God says. I am doing a new thing, making a way in the wilderness and rivers in the desert."],
      ["43:25", "I will not remember your sins", "God Himself wipes out His people's sins, for His own sake, and chooses not to remember them."],
    ],
    refs: [["JHN.10", "John 10:3", "He calls His own sheep by name"], ["ACT.1", "Acts 1:8", "You shall be My witnesses"], ["2CO.5", "2 Corinthians 5:17", "New things have come"]],
  },
  44: {
    intro: "\"I will pour out My Spirit on your offspring.\" \"I am the first and I am the last, and there is no God besides Me.\" A long satire: a man cuts down a tree, uses half to cook his dinner and warm himself, and carves the rest into a god and prays, \"Deliver me, for you are my god.\" God says of Cyrus, \"He is My shepherd.\"",
    v: [
      ["44:3", "I will pour out My Spirit on your offspring", "As God pours water on thirsty ground, He will pour His Spirit on the children of His people and His blessing on their descendants."],
      ["44:6", "I am the first and I am the last", "Jesus uses this title in Revelation 1:17."],
      ["44:17", "He falls down before it and worships", "A man cuts a tree, cooks his dinner with half of it, then carves a god from the rest and bows to it. Isaiah shows how foolish idols are."],
      ["44:28", "It is I who says of Cyrus, He is My shepherd", "Cyrus, who freed the Jews in 538 BC, is named here. Isaiah lived about 150 years earlier; many scholars think these chapters come from the exile. Readers differ, but all see God directing history."],
    ],
    refs: [["REV.1", "Revelation 1:17", "I am the first and the last"], ["EZR.1", "Ezra 1:1-4", "Cyrus's decree"], ["PSA.115", "Psalm 115:4-8", "Idols"]],
  },
  45: {
    intro: "God speaks to Cyrus, His anointed: \"I will go before you and make the rough places smooth... so that you may know that it is I, the LORD.\" \"I am the LORD, and there is no other; besides Me there is no God.\" \"Turn to Me and be saved, all the ends of the earth.\" \"To Me every knee will bow, every tongue will swear allegiance.\"",
    v: [
      ["45:1", "To Cyrus His anointed", "Cyrus was a Persian king who did not know the LORD (45:4), yet God calls him His anointed, chosen to set His people free."],
      ["45:7", "Causing well-being and creating calamity", "God forms light and darkness, brings peace and sends disaster. Nothing in history is outside His rule."],
      ["45:22", "Turn to Me and be saved, all the ends of the earth", "Charles Spurgeon was converted hearing this verse."],
      ["45:23", "Every knee will bow", "Applied to Jesus in Philippians 2:10-11."],
    ],
    bg: [["Cyrus's own words", "The Cyrus Cylinder in the British Museum records Cyrus saying the god Marduk chose him and called him by name, and that he returned exiled peoples. Isaiah says it was the LORD who called him.", "strong", ["kitchen", "oswalt"]]],
    refs: [["PHP.2", "Philippians 2:10-11", "Every knee should bow"], ["ROM.14", "Romans 14:11", "Every knee shall bow to Me"]],
  },
  46: {
    intro: "Babylon's gods Bel and Nebo are loaded on animals and carried into exile, a burden to weary beasts. But God says to Israel, \"Even to your old age I will be the same, and even to your graying years I will bear you! I have done it, and I will carry you.\" \"My purpose will be established.\"",
    v: [
      ["46:1", "Bel has bowed down, Nebo stoops over", "Bel and Nebo were Babylon's chief gods. Their statues had to be loaded on tired animals and carried away."],
      ["46:4", "Even to your old age... I will carry you", "Idols must be carried, but God carries His people, from birth to gray hair. I have made you, and I will carry you."],
      ["46:10", "Declaring the end from the beginning", "God tells the end from the beginning. His purpose will stand, and He will do all He pleases."],
    ],
    refs: [["DEU.1", "Deuteronomy 1:31", "As a man carries his son"], ["PSA.71", "Psalm 71:18", "Even when I am old and gray"]],
  },
  47: {
    intro: "A taunt against Babylon, pictured as a proud queen: \"Come down and sit in the dust, O virgin daughter of Babylon.\" She said, \"I will be a queen forever,\" and, \"I am, and there is no one besides me.\" Her sorceries and astrologers cannot save her.",
    v: [
      ["47:7", "I will be a queen forever", "Babylon thought she would rule as queen forever and never thought about how it would end."],
      ["47:10", "I am, and there is no one besides me", "Babylon says, \"I am, and there is no one besides me,\" words that belong only to God (45:5-6). Pride claims what is His."],
      ["47:13", "Let the astrologers... stand up and save you", "Babylon was famous for astrologers and stargazers. Isaiah dares them to save the city. They cannot even save themselves (47:14)."],
    ],
    refs: [["REV.18", "Revelation 18:7", "I sit as a queen"]],
  },
  48: {
    intro: "God rebukes stubborn Israel, \"your neck is an iron sinew.\" He told them things beforehand so they could not credit their idols. \"I have refined you, but not as silver; I have tested you in the furnace of affliction.\" \"I am the LORD your God, who teaches you to profit, who leads you in the way you should go.\" \"Go forth from Babylon!\"",
    v: [
      ["48:10", "In the furnace of affliction", "Like metal tested in a furnace, God's people were refined through the hardship of exile."],
      ["48:17", "Who teaches you to profit", "The LORD, your Redeemer, teaches you what is good for you and leads you in the way you should go."],
      ["48:18", "Your peace would have been like a river", "If only you had listened, God says, your peace would have flowed like a river and your righteousness like ocean waves."],
      ["48:20", "Go forth from Babylon!", "Leave Babylon! Shout it with joy to the ends of the earth: the LORD has redeemed His servant Jacob."],
    ],
    refs: [["1PE.1", "1 Peter 1:6-7", "Faith tested by fire"], ["PSA.32", "Psalm 32:8", "I will instruct you"]],
  },
  49: {
    intro: "The second Servant Song: \"The LORD called Me from the womb.\" The Servant feels He has labored in vain, but God says, \"It is too small a thing that You should be My Servant to raise up the tribes of Jacob... I will also make You a light of the nations.\" Zion says, \"The LORD has forgotten me.\" God answers, \"Can a woman forget her nursing child?... Even these may forget, but I will not forget you. I have inscribed you on the palms of My hands.\"",
    v: [
      ["49:1", "The LORD called Me from the womb", "The Servant speaks: the LORD called Me before I was born and named Me while I was in My mother's womb."],
      ["49:6", "A light of the nations", "Paul applies this to his mission (Acts 13:47)."],
      ["49:15", "Can a woman forget her nursing child?", "Even if a mother could forget her nursing baby, God will never forget His people."],
      ["49:16", "Inscribed you on the palms of My hands", "God has engraved His people on the palms of His hands. They are always before Him."],
    ],
    refs: [["ACT.13", "Acts 13:47", "A light for the Gentiles"], ["LUK.2", "Luke 2:32", "A light of revelation"], ["JHN.20", "John 20:27", "See My hands"]],
  },
  50: {
    intro: "The third Servant Song: \"The Lord GOD has given Me the tongue of disciples, that I may know how to sustain the weary one with a word. He awakens Me morning by morning.\" \"I gave My back to those who strike Me... I did not cover My face from humiliation and spitting.\" \"I have set My face like flint.\" \"Who is among you that fears the LORD... let him trust in the name of the LORD.\"",
    v: [
      ["50:4", "To sustain the weary one with a word", "The Servant listens to God every morning like a student, so He knows the word that can lift up the weary."],
      ["50:6", "I gave My back to those who strike Me", "The Servant offered His back to those who beat Him and did not hide His face from mocking and spitting. Jesus suffered this at His trial (Matthew 26:67)."],
      ["50:7", "I have set My face like flint", "Jesus set His face toward Jerusalem (Luke 9:51)."],
      ["50:10", "Let him trust in the name of the LORD", "Whoever walks in darkness with no light should trust in the name of the LORD and lean on their God."],
    ],
    refs: [["MAT.26", "Matthew 26:67", "They spat in His face"], ["LUK.9", "Luke 9:51", "He resolutely set His face"]],
  },
  51: {
    intro: "\"Look to the rock from which you were hewn\": look to Abraham and Sarah. God will comfort Zion and make her wilderness like Eden. His salvation will be forever. \"Awake, awake, put on strength, O arm of the LORD.\" \"The ransomed of the LORD will return and come with joyful shouting to Zion.\"",
    v: [
      ["51:1", "Look to the rock from which you were hewn", "Look back to the rock you were cut from: Abraham and Sarah. God made one man into a great people (51:2)."],
      ["51:3", "Her wilderness He will make like Eden", "The LORD will comfort Zion and make her deserts like Eden, the garden of the LORD, full of joy and singing."],
      ["51:6", "My salvation will be forever", "The heavens will vanish like smoke and the earth wear out like clothing, but God's salvation will last forever."],
      ["51:11", "Everlasting joy will be on their heads", "The redeemed will return to Zion singing, crowned with everlasting joy. Sorrow and sighing will run away."],
    ],
    refs: [["GEN.12", "Genesis 12:1-3", "God's call to Abraham"], ["HEB.11", "Hebrews 11:11-12", "Abraham and Sarah"]],
  },
  52: {
    intro: "\"Awake, awake, clothe yourself in your strength, O Zion.\" \"How lovely on the mountains are the feet of him who brings good news, who announces peace... who says to Zion, Your God reigns!\" \"Depart, depart, go out from there.\" The fourth Servant Song begins: \"Behold, My servant will prosper... His appearance was marred more than any man.\" He will sprinkle many nations.",
    v: [
      ["52:7", "How lovely are the feet of him who brings good news", "A runner crosses the mountains bringing news of peace: Your God reigns! Paul quotes this about those who preach the gospel (Romans 10:15)."],
      ["52:10", "All the ends of the earth may see the salvation of our God", "The LORD has bared His holy arm, rolling up His sleeve to act, and the whole world will see His salvation."],
      ["52:13", "Behold, My servant will prosper", "The fourth Servant Song (52:13-53:12) begins with the end: God's Servant will succeed and be lifted up very high."],
      ["52:14", "His appearance was marred more than any man", "Many were shocked at Him, because He was so disfigured He hardly looked human. Christians see the suffering of Jesus here."],
    ],
    refs: [["ROM.10", "Romans 10:15", "Beautiful feet"], ["ISA.53", "Isaiah 53", "The Servant's suffering continues"]],
  },
  54: {
    intro: "\"Shout for joy, O barren one.\" Enlarge your tent; your descendants will possess nations. God was like a husband who briefly left: \"For a brief moment I forsook you, but with great compassion I will gather you.\" \"The mountains may be removed... but My lovingkindness will not be removed from you.\" \"No weapon that is formed against you will prosper.\"",
    v: [
      ["54:1", "Shout for joy, O barren one", "Zion is pictured as a childless woman who will have more children than she can count. Paul quotes this in Galatians 4:27."],
      ["54:2", "Enlarge the place of your tent", "Make your tent bigger and stretch out its curtains. God is about to grow His family beyond anything they imagined."],
      ["54:10", "My lovingkindness will not be removed from you", "Mountains may shake and hills be removed, but God's steadfast love and covenant of peace will not."],
      ["54:17", "No weapon formed against you will prosper", "No weapon made against God's servants will succeed. This is their heritage from the LORD."],
    ],
    refs: [["GAL.4", "Galatians 4:27", "Rejoice, barren woman"], ["ROM.8", "Romans 8:38-39", "Nothing can separate us"]],
  },
  55: {
    intro: "\"Ho! Every one who thirsts, come to the waters; and you who have no money come, buy and eat... without money and without cost.\" \"Seek the LORD while He may be found.\" \"My thoughts are not your thoughts, nor are your ways My ways.\" As rain waters the earth, \"so will My word be which goes forth from My mouth; it will not return to Me empty.\" \"You will go out with joy... and all the trees of the field will clap their hands.\"",
    v: [
      ["55:1", "Come, buy without money", "Like a street seller calling out, God invites all who are thirsty to come and receive without money. Grace is free."],
      ["55:6", "Seek the LORD while He may be found", "Seek the LORD while He may be found and call on Him while He is near. Do not put it off."],
      ["55:8-9", "My ways are higher than your ways", "God's thoughts and ways are higher than ours, as the heavens are higher than the earth. That is why He can pardon freely (55:7)."],
      ["55:11", "My word will not return to Me empty", "As rain and snow water the earth and make it grow, God's word will do what He sends it to do."],
      ["55:12", "The trees of the field will clap their hands", "God's people will go out with joy and be led in peace. Mountains sing and trees clap their hands."],
    ],
    refs: [["JHN.7", "John 7:37", "If anyone is thirsty, let him come"], ["REV.22", "Revelation 22:17", "Let the one who is thirsty come"], ["ACT.13", "Acts 13:34", "The sure mercies of David"]],
  },
  56: {
    intro: "\"Preserve justice and do righteousness, for My salvation is about to come.\" God welcomes foreigners and eunuchs who hold fast His covenant: \"I will give them an everlasting name.\" \"My house will be called a house of prayer for all the peoples.\" Israel's leaders, though, are blind watchmen and lazy dogs.",
    v: [
      ["56:3-5", "Let not the eunuch say, I am a dry tree", "A eunuch could have no children and might feel like a dry tree with no future. God promises those who hold fast to His covenant a name better than sons and daughters."],
      ["56:7", "A house of prayer for all the peoples", "Jesus quoted this when He cleared the temple."],
      ["56:2", "How blessed is the man who keeps from profaning the sabbath", "Sabbath-keeping was a visible sign of belonging to God's covenant people (Exodus 31:13)."],
      ["56:10", "His watchmen are blind", "Watchmen were meant to see danger and warn the city (Ezekiel 33:6). These leaders see nothing and say nothing."],
    ],
    bg: [["Foreigners and eunuchs in the Law", "Deuteronomy 23:1-8 kept eunuchs and some foreigners out of the assembly. Isaiah announces a day when faithful outsiders will be welcomed into God's house. Acts 8 shows it happening, when an Ethiopian eunuch reading Isaiah is baptized.", "good", ["oswalt", "motyer"]]],
    refs: [["MRK.11", "Mark 11:17", "My house shall be called a house of prayer"], ["ACT.8", "Acts 8:26-39", "The Ethiopian eunuch"]],
  },
  57: {
    intro: "The righteous perish and no one considers that they are taken from coming evil. God condemns idolatry on every hill. But \"I dwell on a high and holy place, and also with the contrite and lowly of spirit in order to revive the spirit of the lowly.\" \"Peace, peace to him who is far and to him who is near.\" \"There is no peace for the wicked.\"",
    v: [
      ["57:15", "I dwell... also with the contrite and lowly", "The high and holy God, who lives forever, also lives with those who are humble and sorry for their sin, to revive them."],
      ["57:19", "Peace, peace to him who is far and to him who is near", "Peace, peace to those far away and those near. Paul echoes this about Gentiles and Jews brought together in Christ (Ephesians 2:17)."],
      ["57:21", "There is no peace for the wicked", "There is no peace for the wicked. Isaiah uses this line to close sections of his book (48:22)."],
    ],
    refs: [["EPH.2", "Ephesians 2:17", "Peace to those far and near"], ["PSA.51", "Psalm 51:17", "A broken and contrite heart"]],
  },
  58: {
    intro: "The people fast and complain that God does not notice. God answers: they fast while oppressing workers and fighting. \"Is this not the fast which I choose, to loosen the bonds of wickedness... to divide your bread with the hungry and bring the homeless poor into the house?\" \"Then your light will break out like the dawn.\" Call the Sabbath a delight.",
    v: [
      ["58:3", "Why have we fasted and You do not see?", "The people complain that God ignores their fasting. God answers that on their fast days they still exploit their workers and quarrel."],
      ["58:6-7", "Is this not the fast which I choose?", "The fast God wants is to free the oppressed, share food with the hungry, shelter the homeless and clothe the naked."],
      ["58:8", "Your light will break out like the dawn", "When God's people show that kind of mercy, their light breaks out like dawn and God's glory guards them from behind."],
      ["58:11", "You will be like a watered garden", "The LORD will guide them always and satisfy them, like a well-watered garden or a spring that never runs dry."],
    ],
    refs: [["MAT.6", "Matthew 6:16-18", "When you fast"], ["JAS.2", "James 2:15-17", "Faith without works"]],
  },
  59: {
    intro: "\"The LORD's hand is not so short that it cannot save... but your iniquities have made a separation between you and your God.\" Truth stumbles in the street. God saw there was no one to intervene, \"so His own arm brought salvation to Him.\" He put on righteousness like a breastplate and a helmet of salvation. \"A Redeemer will come to Zion.\"",
    v: [
      ["59:1-2", "Your iniquities have made a separation", "God's arm is not too short to save or His ear too dull to hear. It is sin that has built a wall between people and God."],
      ["59:16", "His own arm brought salvation", "God saw that no one would step in to help, so His own arm brought salvation."],
      ["59:17", "Righteousness like a breastplate, a helmet of salvation", "God puts on righteousness like armor and salvation like a helmet. Paul uses the same picture for the believer's armor (Ephesians 6:14-17)."],
      ["59:20", "A Redeemer will come to Zion", "A Redeemer will come to Zion, to those who turn from sin. Paul quotes this in Romans 11:26."],
    ],
    refs: [["ROM.3", "Romans 3:10-18", "Paul quotes 59:7-8"], ["EPH.6", "Ephesians 6:14-17", "The armor of God"], ["ROM.11", "Romans 11:26", "The Deliverer will come from Zion"]],
  },
  60: {
    intro: "\"Arise, shine; for your light has come, and the glory of the LORD has risen upon you.\" Darkness covers the earth, but nations will come to your light, and kings to the brightness of your rising. They bring gold and frankincense on camels. \"No longer will you have the sun for light by day... but you will have the LORD for an everlasting light.\"",
    v: [
      ["60:1", "Arise, shine; for your light has come", "Rise and shine, for your light has come and the LORD's glory has risen on you. Many read this at Christmas and Epiphany."],
      ["60:3", "Nations will come to your light", "Darkness covers the earth, but nations and kings will come to the light shining on God's people."],
      ["60:6", "They will bring gold and frankincense", "Camels from distant lands bring gold and frankincense and praise the LORD. Many recall the wise men's gifts (Matthew 2:11)."],
      ["60:19", "The LORD for an everlasting light", "No more need for sun or moon. The LORD will be an everlasting light. Revelation 21:23 describes the new Jerusalem the same way."],
    ],
    refs: [["MAT.2", "Matthew 2:11", "Gold, frankincense and myrrh"], ["REV.21", "Revelation 21:23-26", "The Lamb is its lamp"], ["JHN.8", "John 8:12", "The light of the world"]],
  },
  61: {
    intro: "\"The Spirit of the Lord GOD is upon me, because the LORD has anointed me to bring good news to the afflicted; He has sent me to bind up the brokenhearted, to proclaim liberty to captives... to proclaim the favorable year of the LORD.\" He gives \"a garland instead of ashes, the oil of gladness instead of mourning.\" \"He has clothed me with garments of salvation.\"",
    v: [
      ["61:1", "The Spirit of the Lord GOD is upon me", "Jesus read this in Nazareth and said, \"Today this Scripture has been fulfilled.\""],
      ["61:2", "The favorable year of the LORD", "Jesus stopped reading before \"the day of vengeance.\""],
      ["61:3", "A garland instead of ashes", "Mourners put ashes on their heads. God will give them a beautiful headdress instead of ashes, and joy instead of mourning."],
      ["61:10", "Garments of salvation", "God clothes His people in garments of salvation and a robe of righteousness, like a bride and groom dressed for their wedding."],
    ],
    refs: [["LUK.4", "Luke 4:16-21", "Jesus reads Isaiah 61"], ["MAT.5", "Matthew 5:4", "Blessed are those who mourn"]],
  },
  62: {
    intro: "\"For Zion's sake I will not keep silent.\" Zion will be called by a new name: no longer \"Forsaken\" but \"My delight is in her.\" \"As the bridegroom rejoices over the bride, so your God will rejoice over you.\" Watchmen on the walls will never be silent. \"Say to the daughter of Zion, Lo, your salvation comes.\"",
    v: [
      ["62:4", "My delight is in her", "The Hebrew is Hephzibah, \"my delight is in her.\" It was also the name of King Hezekiah's wife (2 Kings 21:1)."],
      ["62:5", "As the bridegroom rejoices over the bride", "God does not merely put up with His people. He rejoices over them like a groom on his wedding day."],
      ["62:6-7", "Give Him no rest", "Those who pray are told to give God no rest until He keeps His promise. God welcomes bold, persistent prayer (Luke 18:1-8)."],
      ["62:2", "You will be called by a new name", "A new name means a new identity, like Abram becoming Abraham, and the new name promised in Revelation 2:17."],
    ],
    bg: [["Beulah", "62:4 also says the land will be called Beulah, \"married\" (the NASB translates it). The word gave its name to old hymns like \"Beulah Land,\" a picture of heaven.", "good", ["oswalt"]]],
    refs: [["REV.21", "Revelation 21:2", "A bride adorned for her husband"], ["ZEP.3", "Zephaniah 3:17", "He will rejoice over you"]],
  },
  63: {
    intro: "A warrior comes from Edom in red-stained garments: \"I have trodden the wine trough alone.\" Then the prophet remembers \"the lovingkindnesses of the LORD\": \"In all their affliction He was afflicted, and the angel of His presence saved them.\" But they rebelled and grieved His Holy Spirit. \"You, O LORD, are our Father, our Redeemer from of old.\"",
    v: [
      ["63:3", "I have trodden the wine trough alone", "A warrior returns with robes stained red, as if from treading grapes. He has defeated His enemies alone. Revelation 19:13-15 uses the same picture of Christ."],
      ["63:9", "In all their affliction He was afflicted", "In all their suffering, God suffered too, and the angel of His presence saved them. He lifted and carried them all the days of old."],
      ["63:10", "They grieved His Holy Spirit", "Israel rebelled and grieved God's Holy Spirit. Paul warns believers in the same words (Ephesians 4:30)."],
      ["63:16", "You, O LORD, are our Father", "A rare Old Testament prayer to God as Father."],
    ],
    refs: [["REV.19", "Revelation 19:13-15", "Robe dipped in blood"], ["EPH.4", "Ephesians 4:30", "Do not grieve the Holy Spirit"], ["HEB.4", "Hebrews 4:15", "He sympathizes with our weaknesses"]],
  },
  64: {
    intro: "\"Oh, that You would rend the heavens and come down.\" From ancient times no eye has seen a God besides Him, who acts for those who wait for Him. \"All of us have become like one who is unclean, and all our righteous deeds are like a filthy garment.\" \"But now, O LORD, You are our Father, we are the clay, and You our potter.\"",
    v: [
      ["64:1", "Oh, that You would rend the heavens and come down", "Isaiah longs for God to tear open the heavens and come down, so the mountains would shake at His presence."],
      ["64:4", "No eye has seen a God besides You", "No one has ever seen or heard of a God like Him, who acts for those who wait for Him. Paul echoes this in 1 Corinthians 2:9."],
      ["64:6", "Our righteous deeds are like a filthy garment", "Even our best deeds, without God, are like stained rags. We cannot clean ourselves up enough to save ourselves."],
      ["64:8", "We are the clay, and You our potter", "Yet You are our Father, LORD. We are the clay and You are the potter; we are all the work of Your hand."],
    ],
    refs: [["1CO.2", "1 Corinthians 2:9", "Eye has not seen"], ["MRK.1", "Mark 1:10", "The heavens torn open at Jesus' baptism"], ["JER.18", "Jeremiah 18:1-6", "The potter's house"]],
  },
  65: {
    intro: "\"I permitted Myself to be found by those who did not seek Me.\" God held out His hands all day to a rebellious people. But for His servants: \"Behold, I create new heavens and a new earth; and the former things will not be remembered.\" No more weeping, long lives, homes and vineyards enjoyed. \"Before they call, I will answer.\" \"The wolf and the lamb will graze together.\"",
    v: [
      ["65:1", "I permitted Myself to be found by those who did not seek Me", "Paul applies this to the Gentiles (Romans 10:20)."],
      ["65:17", "I create new heavens and a new earth", "God will create new heavens and a new earth, and the former troubles will not even come to mind. Revelation 21:1 picks up this hope."],
      ["65:19", "No longer will be heard in her the voice of weeping", "God will rejoice over Jerusalem, and the sound of weeping and crying will never be heard there again."],
      ["65:24", "Before they call, I will answer", "Before His people call, God will answer; while they are still speaking, He will hear."],
    ],
    refs: [["ROM.10", "Romans 10:20-21", "Found by those who did not seek Me"], ["REV.21", "Revelation 21:1-4", "A new heaven and new earth"], ["2PE.3", "2 Peter 3:13", "New heavens and a new earth"]],
  },
  66: {
    intro: "\"Heaven is My throne and the earth is My footstool. Where then is a house you could build for Me?\" \"To this one I will look, to him who is humble and contrite of spirit, and who trembles at My word.\" Zion will give birth to a nation in a day. \"As one whom his mother comforts, so I will comfort you.\" God will gather all nations to see His glory, and send messengers to declare it. All flesh will come to worship.",
    v: [
      ["66:1", "Heaven is My throne", "Heaven is God's throne and earth His footstool. What house could anyone build for Him? Stephen quotes this in Acts 7:49."],
      ["66:2", "Him who is humble and contrite... and trembles at My word", "God made all things. The person He looks to is the one who is humble, sorry for sin, and trembles at His word."],
      ["66:13", "As one whom his mother comforts", "Like a mother comforts her child, God will comfort His people."],
      ["66:22", "The new heavens and the new earth will endure", "As the new heavens and earth will last, so will God's people and their name."],
    ],
    refs: [["ACT.7", "Acts 7:48-50", "Stephen quotes Isaiah 66"], ["MAT.28", "Matthew 28:19", "Go to all nations"], ["REV.21", "Revelation 21", "All things new"]],
  },
});
