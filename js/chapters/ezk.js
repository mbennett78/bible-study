// Ezekiel chapter notes.
import { makeBook } from "./make.js";

const sources = {
  block: "Daniel I. Block, The Book of Ezekiel, 2 vols., New International Commentary on the Old Testament (Eerdmans, 1997-98).",
  taylor: "John B. Taylor, Ezekiel, Tyndale Old Testament Commentaries (InterVarsity Press, 1969).",
  cooper: "Lamar Eugene Cooper Sr., Ezekiel, New American Commentary 17 (Broadman & Holman, 1994).",
  duguidE: "Iain M. Duguid, Ezekiel, NIV Application Commentary (Zondervan, 1999).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["block", "taylor"] }, {
  1: {
    intro: "In 593 BC Ezekiel, a priest among the exiles by the Chebar canal in Babylon, sees the heavens opened. A storm cloud with flashing fire comes from the north. In it are four living creatures, each with four faces (man, lion, ox, eagle) and wings, beside wheels \"full of eyes.\" Above them is a crystal expanse and a sapphire throne, and on the throne a figure like a man, glowing like fire, with a rainbow around Him. \"Such was the appearance of the likeness of the glory of the LORD.\" Ezekiel falls on his face.",
    v: [
      ["1:1", "The heavens were opened, and I saw visions of God", "God meets His people even in exile."],
      ["1:10", "The face of a man... a lion... a bull... an eagle", "Church tradition later linked these to the four Gospels."],
      ["1:16", "A wheel within a wheel", "Able to go any direction: God is not limited to Jerusalem."],
      ["1:28", "Such was the appearance of the likeness of the glory of the LORD", "Ezekiel describes carefully and humbly."],
    ],
    bg: [["The exiles by the Chebar", "Babylonian business records from Nippur mention the Kabaru canal and Jewish names, matching the setting of the exiles who were taken with King Jehoiachin in 597 BC.", "strong", ["kitchen", "block"]]],
    refs: [["REV.4", "Revelation 4:2-8", "The throne and four living creatures"], ["ISA.6", "Isaiah 6:1-5", "Isaiah's vision of the Lord"], ["DAN.7", "Daniel 7:9-10", "A fiery throne with wheels"]],
  },
  2: {
    intro: "\"Son of man, stand on your feet that I may speak with you.\" The Spirit enters Ezekiel and sets him on his feet. God sends him to rebellious, stubborn Israel: \"whether they listen or not... they will know that a prophet has been among them.\" \"Do not be afraid of them\" though they are like thorns and scorpions. A hand holds out a scroll written front and back with lamentations, mourning and woe.",
    v: [
      ["2:1", "Son of man", "God calls Ezekiel this over 90 times; it means \"human one.\" Jesus used it of Himself."],
      ["2:2", "The Spirit entered me and set me on my feet", "God's Spirit enables His servant."],
      ["2:5", "Whether they listen or not", "Faithfulness, not results, is the calling."],
    ],
    refs: [["DAN.7", "Daniel 7:13", "One like a son of man"], ["MRK.2", "Mark 2:10", "The Son of Man has authority"], ["JER.1", "Jeremiah 1:8", "Do not be afraid"]],
  },
  3: {
    intro: "God tells Ezekiel to eat the scroll, and it is as sweet as honey. He is sent to his own people, who will not listen. \"I have appointed you a watchman to the house of Israel.\" If he fails to warn the wicked, their blood will be on his hands; if he warns them, he has saved himself. God makes him unable to speak except when God gives him a message.",
    v: [
      ["3:3", "It was sweet as honey in my mouth", "Taking God's word inside."],
      ["3:17", "I have appointed you a watchman", "A watchman warns of danger."],
      ["3:18-19", "If you warn the wicked", "Responsibility to speak."],
    ],
    refs: [["JER.15", "Jeremiah 15:16", "Your words were found and I ate them"], ["REV.10", "Revelation 10:9-10", "Sweet as honey"], ["EZK.33", "Ezekiel 33:1-9", "The watchman again"]],
  },
  4: {
    intro: "Ezekiel acts out Jerusalem's siege. He draws the city on a clay brick, builds tiny siege works around it, and lies on his side for many days bearing the people's guilt. He eats measured rations of mixed-grain bread and water, a picture of famine in the besieged city.",
    v: [
      ["4:1", "Take a brick... and inscribe a city on it", "A model siege."],
      ["4:4-6", "Lie on your left side... bear their iniquity", "One day for each year of sin."],
      ["4:9", "Wheat, barley, beans, lentils, millet and spelt", "Scraping together whatever grain is left."],
    ],
    refs: [["JER.19", "Jeremiah 19", "Another acted-out message"], ["2KI.25", "2 Kings 25:1-3", "The siege and famine"]],
  },
  5: {
    intro: "Ezekiel shaves his head and beard with a sword and divides the hair into thirds: one burned in the city, one struck with the sword, one scattered to the wind. A few hairs are tucked into his robe. So Jerusalem, set at the center of the nations, will be judged for rebelling more than the nations around her, though a remnant will survive.",
    v: [
      ["5:3", "Bind them in the edges of your robes", "A small remnant kept."],
      ["5:5", "This is Jerusalem; I have set her at the center of the nations", "Privilege brings responsibility."],
    ],
    refs: [["ISA.6", "Isaiah 6:13", "A holy seed remains"], ["LUK.12", "Luke 12:48", "To whom much is given"]],
  },
  6: {
    intro: "Ezekiel prophesies against the mountains of Israel, where the idol shrines stand. The altars will be ruined and the idols broken. Yet a remnant will remember God among the nations and loathe themselves for their evil. Again and again: \"Then you will know that I am the LORD.\"",
    v: [
      ["6:9", "How I have been hurt by their adulterous hearts", "God is grieved by unfaithfulness."],
      ["6:10", "Then they will know that I am the LORD", "This phrase appears over 60 times in Ezekiel."],
    ],
    refs: [["LEV.26", "Leviticus 26:30", "I will destroy your high places"], ["HOS.11", "Hosea 11:8", "How can I give you up?"]],
  },
  7: {
    intro: "\"An end! The end is coming on the four corners of the land.\" The day of doom has come. People will throw their silver into the streets, because it cannot save them. They will seek a vision from the prophet, but the law will perish from the priest.",
    v: [
      ["7:2", "An end! The end is coming", "Final judgment for Judah."],
      ["7:19", "Their silver and gold will not be able to deliver them", "Money cannot save."],
    ],
    refs: [["ZEP.1", "Zephaniah 1:18", "Neither silver nor gold will deliver them"], ["AMO.8", "Amos 8:2", "The end has come"]],
  },
  8: {
    intro: "In a vision the Spirit lifts Ezekiel by his hair to the Jerusalem temple. He sees an idol at the gate, seventy elders burning incense to creeping things in a secret room, women weeping for the god Tammuz, and twenty-five men with their backs to the temple bowing to the sun. \"Have you seen this, son of man?\"",
    v: [
      ["8:12", "The LORD does not see us", "Secret sin assumes God doesn't notice."],
      ["8:14", "Women weeping for Tammuz", "A Babylonian god of vegetation."],
      ["8:16", "Their backs to the temple of the LORD and their faces toward the east", "Turning their backs on God."],
    ],
    refs: [["PSA.94", "Psalm 94:7-9", "He who planted the ear, does He not hear?"], ["2KI.21", "2 Kings 21:3-5", "Manasseh's idolatry"]],
  },
  9: {
    intro: "God calls executioners to the city. First, a man clothed in linen with a writing case is told to put a mark on the foreheads of all who sigh and groan over the abominations. The executioners spare those with the mark. Ezekiel cries, \"Alas, Lord GOD! Are You destroying the whole remnant?\"",
    v: [
      ["9:4", "Put a mark on the foreheads of the men who sigh and groan", "God knows and protects His own."],
      ["9:6", "Start from My sanctuary", "Judgment begins at God's house."],
      ["9:8", "Alas, Lord GOD!", "The prophet intercedes."],
    ],
    refs: [["REV.7", "Revelation 7:3", "Sealed on their foreheads"], ["1PE.4", "1 Peter 4:17", "Judgment begins with the household of God"], ["EXO.12", "Exodus 12:13", "The blood as a sign"]],
  },
  10: {
    intro: "The vision continues. The man in linen takes burning coals from among the cherubim and scatters them over the city. Then the glory of the LORD rises from the temple, pauses at the threshold, and moves to the east gate with the cherubim and wheels. God's presence is leaving His house.",
    v: [
      ["10:4", "The glory of the LORD went up from the cherub to the threshold", "God's presence begins to leave."],
      ["10:18", "The glory of the LORD departed from the threshold", "The saddest moment in Ezekiel."],
      ["10:20", "I knew that they were cherubim", "The creatures of chapter 1."],
    ],
    refs: [["1SA.4", "1 Samuel 4:21-22", "Ichabod: the glory has departed"], ["EZK.43", "Ezekiel 43:1-5", "The glory returns"]],
  },
  11: {
    intro: "Leaders in Jerusalem claim they are the safe \"meat in the pot.\" God says they will be judged. Ezekiel asks again whether all will be destroyed. God answers that He Himself has been \"a sanctuary for them a little while\" among the exiles. \"I will give them one heart, and put a new spirit within them. And I will take the heart of stone out of their flesh and give them a heart of flesh.\" The glory leaves the city and stands over the Mount of Olives.",
    v: [
      ["11:16", "I was a sanctuary for them a little while", "God was present with the exiles."],
      ["11:19", "A heart of flesh", "God gives a new heart."],
      ["11:23", "The glory of the LORD went up... and stood over the mountain east of the city", "The Mount of Olives."],
    ],
    refs: [["EZK.36", "Ezekiel 36:26", "A new heart"], ["JER.31", "Jeremiah 31:33", "Written on their heart"], ["ACT.1", "Acts 1:9-12", "Jesus ascends from the Mount of Olives"]],
  },
  12: {
    intro: "Ezekiel packs an exile's bag, digs through the wall at evening, and leaves with his face covered. It is a sign: the prince in Jerusalem will flee by night and be captured, yet will not see Babylon though he dies there. People say, \"The days are long and every vision fails,\" but God says the time is near.",
    v: [
      ["12:6", "I have set you as a sign", "Ezekiel's actions preach."],
      ["12:13", "He will not see it, though he will die there", "Zedekiah was blinded and taken to Babylon."],
      ["12:28", "None of My words will be delayed any longer", "God's word will come true."],
    ],
    refs: [["JER.39", "Jeremiah 39:4-7", "Zedekiah captured and blinded"], ["2PE.3", "2 Peter 3:4, 9", "Where is the promise?"]],
  },
  13: {
    intro: "Woe to the foolish prophets who follow their own spirit and have seen nothing. They say \"Peace!\" when there is no peace, like men covering a flimsy wall with whitewash. A storm of God's anger will knock it down. Women who sell magic charms are also condemned.",
    v: [
      ["13:3", "Who follow their own spirit and have seen nothing", "Prophecy without God."],
      ["13:10", "Peace! when there is no peace", "False comfort."],
      ["13:11", "They plaster it over with whitewash", "Covering problems instead of fixing them."],
    ],
    refs: [["JER.6", "Jeremiah 6:14", "Peace, peace"], ["MAT.23", "Matthew 23:27", "Whitewashed tombs"]],
  },
  14: {
    intro: "Elders come to Ezekiel, but they have set up idols in their hearts. God says that even if Noah, Daniel and Job were in a land under judgment, they would save only themselves by their righteousness. Yet a remnant will survive, and others will be comforted when they see why God acted.",
    v: [
      ["14:3", "These men have set up their idols in their hearts", "Idolatry can be inward."],
      ["14:14", "Noah, Daniel and Job", "Three famous righteous men."],
    ],
    refs: [["JOB.1", "Job 1:1", "Blameless and upright"], ["1JN.5", "1 John 5:21", "Guard yourselves from idols"]],
  },
  15: {
    intro: "A vine is valuable only for its fruit; its wood is useless, not even good enough to make a peg. If it is burned, it is good for nothing. So Jerusalem, which bore no fruit, will be given to the fire.",
    v: [
      ["15:2", "How is the wood of the vine better than any wood?", "A vine exists to bear fruit."],
      ["15:6", "As the wood of the vine... so I have given up the inhabitants of Jerusalem", "Fruitlessness leads to judgment."],
    ],
    refs: [["JHN.15", "John 15:1-6", "Abide in the vine"], ["ISA.5", "Isaiah 5:1-7", "The fruitless vineyard"]],
  },
  16: {
    intro: "An allegory of Jerusalem as an abandoned baby girl, left in a field on the day she was born. God passed by, said \"Live!\", raised her, married her, and clothed her in splendor. But she trusted in her beauty and became unfaithful with idols and foreign nations. Yet God will remember His covenant: \"I will establish an everlasting covenant with you... when I have forgiven you for all that you have done.\"",
    v: [
      ["16:6", "I said to you while you were in your blood, Live!", "God's grace to the helpless."],
      ["16:15", "You trusted in your beauty", "Gifts turned into idols."],
      ["16:60", "I will remember My covenant with you", "Mercy after unfaithfulness."],
      ["16:63", "When I have forgiven you", "Forgiveness that humbles."],
    ],
    refs: [["HOS.2", "Hosea 2", "The unfaithful wife restored"], ["EPH.2", "Ephesians 2:1-5", "Dead in sin, made alive"]],
  },
  17: {
    intro: "A riddle: a great eagle (Babylon) plants a vine (Zedekiah), but the vine stretches toward another eagle (Egypt). Because Zedekiah broke his oath, he will be judged. Then God promises to take a tender sprig from the top of the cedar and plant it on a high mountain, where it will become a stately cedar and birds of every kind will nest in it.",
    v: [
      ["17:15", "He rebelled against him by sending his envoys to Egypt", "Zedekiah's broken oath."],
      ["17:22", "I will take a tender twig and plant it on a high mountain", "A future King from David's line."],
      ["17:23", "Birds of every kind will nest under it", "Like Jesus' parable of the mustard seed."],
    ],
    refs: [["MAT.13", "Matthew 13:31-32", "The birds nest in its branches"], ["ISA.11", "Isaiah 11:1", "A shoot from Jesse"]],
  },
  18: {
    intro: "The people quote a proverb: \"The fathers eat sour grapes, but the children's teeth are set on edge,\" blaming their parents for their troubles. God says, \"The soul who sins will die.\" Each person is responsible. A righteous son of a wicked father will live; a wicked man who turns from his sins will live. \"I have no pleasure in the death of anyone who dies... Therefore, repent and live.\"",
    v: [
      ["18:2", "The fathers eat sour grapes", "Blaming the past."],
      ["18:4", "All souls are Mine", "Every person belongs to God."],
      ["18:23", "Do I have any pleasure in the death of the wicked?", "God wants people to turn and live."],
      ["18:31", "Make yourselves a new heart and a new spirit", "Turn now."],
      ["18:32", "Therefore, repent and live", "God's invitation."],
    ],
    refs: [["JER.31", "Jeremiah 31:29-30", "The same proverb"], ["2PE.3", "2 Peter 3:9", "Not wishing for any to perish"], ["DEU.24", "Deuteronomy 24:16", "Each for his own sin"]],
  },
  19: {
    intro: "A lament for Israel's princes. Their mother was a lioness whose cubs became young lions; one was caught and taken to Egypt (Jehoahaz), another to Babylon (Jehoiachin). Then their mother was a vine, once fruitful, now plucked up and planted in the wilderness.",
    v: [
      ["19:4", "They brought him with hooks to the land of Egypt", "King Jehoahaz."],
      ["19:9", "They brought him to the king of Babylon", "King Jehoiachin."],
      ["19:14", "This is a lamentation", "Grief for David's fallen house."],
    ],
    refs: [["2KI.23", "2 Kings 23:31-34", "Jehoahaz taken to Egypt"], ["2KI.24", "2 Kings 24:12-15", "Jehoiachin taken to Babylon"]],
  },
  20: {
    intro: "Elders come again. God retells Israel's history of rebellion in Egypt, in the wilderness, and in the land, and how He acted \"for the sake of My name\" each time. He will not be consulted by them now. But He will bring them out, purge the rebels, and accept them as a soothing aroma. \"Then you will know that I am the LORD, when I have dealt with you for My name's sake.\"",
    v: [
      ["20:9", "I acted for the sake of My name", "God's mercy protects His honor."],
      ["20:12", "I gave them My sabbaths to be a sign", "A sign of belonging to God."],
      ["20:44", "Not according to your evil ways", "Grace they did not deserve."],
    ],
    refs: [["PSA.106", "Psalm 106", "Israel's rebellion and God's mercy"], ["NEH.9", "Nehemiah 9", "A similar retelling"]],
  },
  21: {
    intro: "\"A sword, a sword sharpened and polished!\" God draws His sword against Jerusalem. The king of Babylon stands at a fork in the road, casting lots, consulting idols and looking at a liver, and the lot points to Jerusalem. The crown will be removed \"until He comes whose right it is, and I will give it to Him.\"",
    v: [
      ["21:9", "A sword, a sword sharpened", "Judgment is near."],
      ["21:21", "He looks at the liver", "Babylonian fortune-telling, yet God directs the outcome."],
      ["21:27", "Until He comes whose right it is", "A promise of the rightful King."],
    ],
    refs: [["GEN.49", "Genesis 49:10", "Until Shiloh comes"], ["PRO.16", "Proverbs 16:33", "The decision is from the LORD"]],
  },
  22: {
    intro: "A list of Jerusalem's sins: bloodshed, idols, contempt for parents, oppression of strangers, orphans and widows, bribery, broken sabbaths. Israel has become dross in God's furnace. Prophets, priests, princes and people are all corrupt. \"I searched for a man among them who would build up the wall and stand in the gap before Me for the land... but I found no one.\"",
    v: [
      ["22:7", "They have treated father and mother lightly", "Family respect broken."],
      ["22:18", "Israel has become dross to Me", "Impurities left after refining."],
      ["22:30", "Stand in the gap before Me", "God looked for an intercessor."],
    ],
    refs: [["ISA.59", "Isaiah 59:16", "No one to intercede"], ["PSA.106", "Psalm 106:23", "Moses stood in the breach"], ["HEB.7", "Hebrews 7:25", "Christ always intercedes"]],
  },
  23: {
    intro: "An allegory of two sisters, Oholah (Samaria) and Oholibah (Jerusalem), who were unfaithful to God by chasing alliances with Egypt, Assyria and Babylon and their idols. Samaria was judged first; Jerusalem saw it and did worse. Both will drink the cup of judgment.",
    v: [
      ["23:4", "Oholah... and Oholibah", "Names meaning \"her tent\" and \"My tent is in her.\""],
      ["23:11", "Her sister Oholibah saw this, yet she was more corrupt", "Not learning from others."],
      ["23:49", "Then you will know that I am the Lord GOD", "The goal of judgment."],
    ],
    refs: [["JER.3", "Jeremiah 3:6-10", "Faithless Israel and treacherous Judah"], ["2KI.17", "2 Kings 17", "Samaria falls"]],
  },
  24: {
    intro: "On the very day Babylon begins the siege of Jerusalem (January 588 BC), God gives Ezekiel a parable of a rusty cooking pot. Then God tells him that his wife, \"the desire of your eyes,\" will die suddenly, and he must not mourn publicly. She dies that evening. It is a sign: Jerusalem, the desire of their eyes, will fall, and they will be too stunned to mourn.",
    v: [
      ["24:2", "Write the name of the day, this very day", "The siege begins."],
      ["24:16", "The desire of your eyes", "Ezekiel's beloved wife."],
      ["24:18", "In the evening my wife died", "A heartbreaking cost for the prophet."],
      ["24:24", "Ezekiel will be a sign to you", "His grief preaches."],
    ],
    refs: [["2KI.25", "2 Kings 25:1", "The siege begins"], ["HOS.1", "Hosea 1:2", "A prophet's family as a sign"]],
  },
});
