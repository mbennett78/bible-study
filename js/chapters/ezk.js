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
  25: {
    intro: "Oracles against Israel's neighbors begin (25-32). Ammon clapped its hands when the temple was profaned; Moab said Judah was like all the nations; Edom and Philistia took revenge. Each will be judged, \"and they will know that I am the LORD.\"",
    v: [
      ["25:3", "Because you said, Aha!", "Gloating over others' ruin."],
      ["25:12", "Edom has acted against the house of Judah by taking vengeance", "Revenge judged."],
    ],
    refs: [["OBA.1", "Obadiah 12", "Do not gloat"], ["PRO.24", "Proverbs 24:17", "Do not rejoice when your enemy falls"]],
  },
  26: {
    intro: "Tyre, the rich island trading city, rejoiced at Jerusalem's fall, hoping to profit. God will bring many nations against her like waves. Nebuchadnezzar will besiege her; her stones and timber will be thrown into the sea, and she will become a bare rock for spreading fishing nets.",
    v: [
      ["26:2", "Aha, the gateway of the peoples is broken", "Greed at another's loss."],
      ["26:3", "As the sea brings up its waves", "Wave after wave of attackers."],
      ["26:14", "A bare rock... a place for the spreading of nets", "Tyre's ruin."],
    ],
    why: "Ezekiel 26 says Nebuchadnezzar would besiege Tyre and that Tyre would be scraped bare and never rebuilt. Scholars discuss how this was fulfilled.",
    views: [
      ["Fulfilled in stages", "Many note the shift from \"he\" (Nebuchadnezzar, 26:7-11) to \"they\" (many nations, 26:12), and see fulfillment in stages: Nebuchadnezzar's 13-year siege of the mainland city, then Alexander the Great in 332 BC throwing the old city's rubble into the sea to build a causeway to the island.", ["cooper", "taylor"]],
      ["A partial fulfillment Ezekiel acknowledged", "Others point out that Ezekiel himself later says Nebuchadnezzar got no reward from Tyre (29:18), and read the prophecy as poetic judgment language whose full force came over time.", ["block", "duguidE"]],
    ],
    common: "All agree Tyre's proud commercial power was broken as God said, and that Ezekiel openly recorded how events unfolded.",
    refs: [["EZK.29", "Ezekiel 29:17-20", "Nebuchadnezzar's labor at Tyre"], ["ISA.23", "Isaiah 23", "Oracle against Tyre"], ["REV.18", "Revelation 18", "A fallen trading city"]],
  },
  27: {
    intro: "A lament for Tyre pictured as a magnificent merchant ship built from the finest materials, trading with nations from Spain to Arabia. A long list of trading partners and goods follows. Then the east wind wrecks the ship in the heart of the seas, and sailors and merchants wail.",
    v: [
      ["27:3", "I am perfect in beauty", "Pride in wealth."],
      ["27:26", "The east wind has broken you", "Sudden ruin."],
    ],
    refs: [["REV.18", "Revelation 18:11-19", "Merchants weep over Babylon"], ["JAS.4", "James 4:13-16", "Boasting in plans"]],
  },
  28: {
    intro: "The prince of Tyre says, \"I am a god,\" yet he is only a man. Then a lament for the king of Tyre: \"You were the signet of perfection, full of wisdom and perfect in beauty. You were in Eden, the garden of God... You were the anointed cherub who covers.\" He was blameless until unrighteousness was found in him; his heart was lifted up because of his beauty. Sidon is judged too, and Israel will be gathered and live securely.",
    v: [
      ["28:2", "I am a god", "The ultimate pride."],
      ["28:13", "You were in Eden, the garden of God", "Poetic language of an exalted figure."],
      ["28:17", "Your heart was lifted up because of your beauty", "Pride's root."],
      ["28:26", "They will live in it securely", "Hope for God's people."],
    ],
    why: "Ezekiel 28:11-19 describes the king of Tyre as a cherub in Eden who fell through pride. Readers discuss whether it also describes Satan.",
    views: [
      ["The king of Tyre in vivid imagery", "Many scholars read it as a lament over the human king, using Eden and cherub imagery to describe his privileged position and his fall through pride.", ["block", "duguidE"]],
      ["Also a picture of Satan's fall", "Many church fathers and later teachers saw behind the king the fall of Satan, since the language goes beyond any human, comparing Isaiah 14 and Luke 10:18.", ["cooper", "taylor"]],
    ],
    common: "All agree the passage shows how pride corrupts even great gifts and leads to a fall.",
    refs: [["ISA.14", "Isaiah 14:12-15", "The fall of the morning star"], ["GEN.3", "Genesis 3", "The garden of Eden"], ["1TI.3", "1 Timothy 3:6", "Conceit and the devil's condemnation"]],
  },
  29: {
    intro: "Pharaoh, the great monster lying in the Nile, says, \"My Nile is mine, and I myself have made it.\" God will put hooks in his jaws. Egypt has been a staff of reed to Israel that splinters when leaned on. Egypt will be humbled and never again rule over nations. Later (571 BC), God gives Egypt to Nebuchadnezzar as wages for his labor against Tyre.",
    v: [
      ["29:3", "My Nile is mine, and I myself have made it", "Pride claims what God made."],
      ["29:6", "A staff made of reed", "Egypt was unreliable help."],
      ["29:18", "He and his army had no wages from Tyre", "Ezekiel honestly records this."],
    ],
    refs: [["ISA.36", "Isaiah 36:6", "A crushed reed"], ["JER.46", "Jeremiah 46", "Egypt's defeat"]],
  },
  30: {
    intro: "\"Wail, Alas for the day! For the day is near, the day of the LORD.\" Egypt and her allies will fall to Nebuchadnezzar. God has broken Pharaoh's arm, and will strengthen the arms of the king of Babylon.",
    v: [
      ["30:3", "The day of the LORD is near", "A day of judgment for nations."],
      ["30:21", "I have broken the arm of Pharaoh", "Egypt's power broken."],
    ],
    refs: [["JER.46", "Jeremiah 46:13-26", "Nebuchadnezzar against Egypt"]],
  },
  31: {
    intro: "Pharaoh is compared to Assyria, once a towering cedar in Lebanon, the envy of every tree in Eden, with birds in its branches and nations in its shade. Because its heart was proud, it was cut down and went down to Sheol. So it will be with Pharaoh.",
    v: [
      ["31:3", "Assyria was a cedar in Lebanon", "A picture of a great empire."],
      ["31:10", "Its heart is haughty in its loftiness", "Pride brings it down."],
    ],
    refs: [["DAN.4", "Daniel 4:10-17", "Nebuchadnezzar's tree dream"], ["NAM.3", "Nahum 3", "Assyria's fall"]],
  },
  32: {
    intro: "A lament for Pharaoh, a sea monster caught in God's net. Then a solemn picture of the grave: Egypt goes down to the pit to join Assyria, Elam, Meshech, Tubal, Edom and Sidon, mighty nations that once spread terror and now lie with the slain.",
    v: [
      ["32:2", "You are like the monster in the seas", "Pharaoh's power pictured."],
      ["32:18", "Wail for the hordes of Egypt", "Even the mighty fall."],
    ],
    refs: [["ISA.14", "Isaiah 14:9-11", "The grave stirs to meet them"]],
  },
  33: {
    intro: "God renews Ezekiel's call as watchman. \"As I live, I take no pleasure in the death of the wicked, but rather that the wicked turn from his way and live. Turn back, turn back from your evil ways! Why then will you die, O house of Israel?\" Then a fugitive arrives: \"The city has been taken.\" Ezekiel can speak freely again. The people enjoy hearing him like a love song, but do not obey.",
    v: [
      ["33:7", "I have appointed you a watchman", "The call renewed."],
      ["33:11", "Turn back, turn back... Why then will you die?", "God's heart for the lost."],
      ["33:21", "The city has been taken", "News reaches the exiles."],
      ["33:32", "Like a sensual song... they hear your words but do not practice them", "Listening without doing."],
    ],
    refs: [["EZK.18", "Ezekiel 18:23, 32", "No pleasure in death"], ["JAS.1", "James 1:22", "Be doers of the word"], ["2PE.3", "2 Peter 3:9", "Not wishing any to perish"]],
  },
  34: {
    intro: "\"Woe, shepherds of Israel who have been feeding themselves!\" They ate the fat and clothed themselves with the wool but did not care for the flock. So God says, \"I Myself will search for My sheep and seek them out... I will seek the lost, bring back the scattered, bind up the broken and strengthen the sick.\" \"I will set over them one shepherd, My servant David.\" A covenant of peace and showers of blessing.",
    v: [
      ["34:2", "Shepherds who have been feeding themselves", "Leaders who serve themselves."],
      ["34:11", "I Myself will search for My sheep", "God the Shepherd."],
      ["34:16", "I will seek the lost", "Jesus said He came to seek and save the lost."],
      ["34:23", "One shepherd, My servant David", "A promise of the Messiah."],
      ["34:26", "There will be showers of blessing", "The source of the hymn's title."],
    ],
    refs: [["JHN.10", "John 10:11-16", "I am the good shepherd"], ["LUK.19", "Luke 19:10", "To seek and save the lost"], ["PSA.23", "Psalm 23", "The LORD is my shepherd"]],
  },
  35: {
    intro: "An oracle against Mount Seir (Edom), which held an everlasting hatred against Israel, handed them over to the sword in their calamity, and said, \"These two nations will be mine.\" Edom will become a desolation.",
    v: [
      ["35:5", "Because you have had everlasting enmity", "Long-held hatred."],
      ["35:10", "Although the LORD was there", "Edom forgot God was with Israel."],
    ],
    refs: [["OBA.1", "Obadiah", "Edom's judgment"], ["GEN.27", "Genesis 27:41", "Esau's grudge"]],
  },
  36: {
    intro: "God speaks to the mountains of Israel: they will bear fruit again and be inhabited. Israel profaned God's name among the nations, \"but I had concern for My holy name.\" \"I will sprinkle clean water on you, and you will be clean... Moreover, I will give you a new heart and put a new spirit within you; and I will remove the heart of stone from your flesh and give you a heart of flesh. I will put My Spirit within you and cause you to walk in My statutes.\"",
    v: [
      ["36:22", "Not for your sake... but for My holy name", "Grace rooted in God's character."],
      ["36:25", "I will sprinkle clean water on you", "Cleansing."],
      ["36:26", "A new heart and a new spirit", "Inner transformation."],
      ["36:27", "I will put My Spirit within you", "The Spirit enables obedience."],
    ],
    refs: [["JHN.3", "John 3:5", "Born of water and the Spirit"], ["JER.31", "Jeremiah 31:33", "The new covenant"], ["2CO.3", "2 Corinthians 3:3", "Tablets of human hearts"]],
  },
  37: {
    intro: "The Spirit sets Ezekiel in a valley full of very dry bones. \"Son of man, can these bones live?\" \"O Lord GOD, You know.\" He prophesies, and there is a rattling; bones come together, sinews and flesh and skin cover them, but no breath. He prophesies to the breath, and they stand up, an exceedingly great army. These bones are Israel, who say, \"Our hope has perished.\" God will open their graves and put His Spirit in them. Then two sticks, Judah and Joseph, become one in his hand: one nation under one King, David, with an everlasting covenant of peace.",
    v: [
      ["37:3", "Can these bones live?", "A hopeless situation."],
      ["37:4", "O dry bones, hear the word of the LORD", "God's word gives life."],
      ["37:9", "Come from the four winds, O breath", "Hebrew ruach: breath, wind and Spirit."],
      ["37:11", "Our hope has perished", "God answers despair."],
      ["37:24", "My servant David will be king over them", "One Shepherd King."],
    ],
    w: [["רוּחַ", "ruach", "H7307", "breath, wind, spirit", "One Hebrew word means breath, wind and Spirit. Ezekiel 37 uses all three meanings: the wind blows, the breath enters, and God's Spirit gives life.", ["halot", "block"]]],
    refs: [["GEN.2", "Genesis 2:7", "God breathed into man the breath of life"], ["JHN.20", "John 20:22", "Jesus breathed on them: Receive the Holy Spirit"], ["ROM.8", "Romans 8:11", "He will give life to your mortal bodies"]],
  },
  38: {
    intro: "Gog, of the land of Magog, chief prince of Meshech and Tubal, will gather a vast coalition and attack Israel \"in the latter years,\" when the people are living securely in unwalled villages. But God will rise up against Gog with earthquake, plague, hail and fire. \"I will magnify Myself... and they will know that I am the LORD.\"",
    v: [
      ["38:8", "In the latter years", "A future conflict."],
      ["38:11", "Unwalled villages... living securely", "God's restored people at rest."],
      ["38:23", "I will make Myself known in the sight of many nations", "The purpose: God's glory."],
    ],
    why: "Scholars and teachers read the Gog and Magog prophecy (38-39) in different ways.",
    views: [
      ["A future literal battle", "Some read it as a specific future invasion of Israel by a northern coalition before or during the end times, often linked to Revelation's timeline.", ["cooper"]],
      ["A symbolic picture of God's final victory", "Others read Gog as a symbol of all the forces that oppose God's people, gathered in one great final attack and defeated, as Revelation 20:8 uses \"Gog and Magog\" for the nations of the whole earth.", ["block", "taylor", "duguidE"]],
    ],
    common: "All agree that God will protect His people and finally defeat every enemy, so that all nations will know He is the LORD.",
    refs: [["REV.20", "Revelation 20:7-10", "Gog and Magog"], ["ZEC.14", "Zechariah 14", "Nations gathered against Jerusalem"]],
  },
  39: {
    intro: "Gog falls on the mountains of Israel. The people burn the weapons for seven years and bury the dead for seven months. Birds and beasts are invited to a great feast. Then God promises: \"Now I will restore the fortunes of Jacob... I will not hide My face from them any longer, for I will have poured out My Spirit on the house of Israel.\"",
    v: [
      ["39:9", "They will make fires with the weapons", "Weapons no longer needed."],
      ["39:25", "I will restore the fortunes of Jacob", "Mercy after judgment."],
      ["39:29", "I will not hide My face from them any longer", "God's face turned toward His people."],
    ],
    refs: [["REV.19", "Revelation 19:17-18", "The great supper of God"], ["JOL.2", "Joel 2:28", "I will pour out My Spirit"]],
  },
  40: {
    intro: "In 573 BC, twenty-five years into exile, Ezekiel is taken in a vision to a very high mountain in Israel. A man shining like bronze, with a measuring line and rod, shows him a temple and measures everything: walls, gates, courts, rooms and altars. \"Declare to the house of Israel all that you see.\" Chapters 40-48 describe this temple and land in great detail.",
    v: [
      ["40:2", "On a very high mountain", "The place of God's presence."],
      ["40:3", "A man whose appearance was like bronze", "A heavenly guide."],
      ["40:4", "Declare to the house of Israel all that you see", "A vision for exiles with no temple."],
    ],
    why: "Ezekiel 40-48 describes a temple, sacrifices and land divisions that were never built as described. Scholars and teachers read these chapters in different ways.",
    views: [
      ["A future temple", "Some expect a literal temple to be built in a future age, with these chapters as its blueprint.", ["cooper"]],
      ["A picture of God dwelling with His people", "Many read the vision as symbolic, using the familiar language of temple and land to show perfect worship and God's presence fulfilled in Christ and the church and finally in the new creation, which Revelation 21-22 describes with Ezekiel's images.", ["block", "taylor", "duguidE"]],
    ],
    common: "All agree the vision promises that God's glory will return and dwell with a cleansed, restored people, and that life will flow from His presence.",
    refs: [["REV.21", "Revelation 21:10-22", "The holy city measured"], ["ZEC.2", "Zechariah 2:1-5", "A man with a measuring line"], ["JHN.2", "John 2:19-21", "The temple of His body"]],
  },
  41: {
    intro: "The guide measures the temple building itself: the nave, the inner room (the Most Holy Place), side rooms on three levels, and walls carved with cherubim and palm trees, each cherub with two faces, a man's and a lion's. A wooden altar stands before the LORD.",
    v: [
      ["41:4", "This is the most holy place", "The heart of the temple."],
      ["41:18", "Cherubim and palm trees", "Images of Eden and God's presence."],
      ["41:22", "This is the table that is before the LORD", "Fellowship with God."],
    ],
    refs: [["1KI.6", "1 Kings 6", "Solomon's temple"], ["HEB.9", "Hebrews 9:1-12", "The true holy place"]],
  },
  42: {
    intro: "The guide shows Ezekiel the priests' chambers, where they eat the most holy offerings and change their garments. Then he measures the outer wall, 500 rods on each side, \"to divide between the holy and the profane.\"",
    v: [
      ["42:14", "They shall lay their garments in which they minister", "Holiness in worship."],
      ["42:20", "To divide between the holy and the profane", "God's holiness protected."],
    ],
    refs: [["LEV.10", "Leviticus 10:10", "Distinguish between holy and common"]],
  },
  43: {
    intro: "The glory of the God of Israel comes from the east, with a sound like many waters, and the earth shines with His glory. It enters the temple by the east gate and fills the house. God says, \"This is the place of My throne... where I will dwell among the sons of Israel forever.\" The altar is described and consecrated.",
    v: [
      ["43:2", "His voice was like the sound of many waters", "The same description as the risen Jesus (Revelation 1:15)."],
      ["43:5", "The glory of the LORD filled the house", "The glory that left in chapter 10 returns."],
      ["43:7", "I will dwell among the sons of Israel forever", "God's presence restored."],
    ],
    refs: [["EZK.10", "Ezekiel 10:18-19", "The glory departs"], ["REV.1", "Revelation 1:15", "His voice like the sound of many waters"], ["JHN.1", "John 1:14", "We beheld His glory"]],
  },
  44: {
    intro: "The east gate is shut because the LORD entered by it; only the prince may sit there to eat before the LORD. Foreigners uncircumcised in heart may not enter. The Levites who served idols lose their priestly rank; the faithful sons of Zadok will minister and teach the people the difference between holy and common.",
    v: [
      ["44:2", "This gate shall be shut", "Honoring the way God came."],
      ["44:15", "The sons of Zadok, who kept charge of My sanctuary", "Faithfulness rewarded."],
      ["44:23", "Teach My people the difference between the holy and the profane", "A priest's calling."],
    ],
    refs: [["1SA.2", "1 Samuel 2:35", "A faithful priest"], ["MAL.2", "Malachi 2:7", "The lips of a priest preserve knowledge"]],
  },
  45: {
    intro: "A holy portion of land is set apart for the sanctuary, priests and Levites, with land for the prince on each side. God commands the princes: \"Put away violence and destruction, and practice justice and righteousness.\" Honest weights and measures, and offerings for the feasts.",
    v: [
      ["45:1", "An allotment to the LORD, a holy portion", "God at the center."],
      ["45:9", "Practice justice and righteousness", "Leaders must not oppress."],
      ["45:10", "You shall have just balances", "Honesty in business."],
    ],
    refs: [["MIC.6", "Micah 6:8, 11", "Do justice; dishonest scales"], ["PRO.11", "Proverbs 11:1", "A false balance"]],
  },
  46: {
    intro: "Rules for worship on Sabbaths and new moons. The people enter by one gate and leave by the opposite gate, so no one turns back. The prince worships among the people. Kitchens are set in the corners of the court for cooking the offerings.",
    v: [
      ["46:9", "He shall go straight out", "Worship moves forward."],
      ["46:10", "The prince shall go in among them", "The leader worships with the people."],
    ],
    refs: [["PSA.42", "Psalm 42:4", "Going with the throng to the house of God"]],
  },
  47: {
    intro: "Water flows from under the threshold of the temple toward the east. Ezekiel's guide measures it: ankle-deep, knee-deep, waist-deep, then a river too deep to cross. Where it flows into the Dead Sea, the water becomes fresh and teems with fish, and fishermen spread nets. Trees on both banks bear fruit every month, \"and their leaves for healing.\" The land's borders are drawn, and foreigners living among Israel receive an inheritance too.",
    v: [
      ["47:1", "Water was flowing from under the threshold", "Life flows from God's presence."],
      ["47:5", "A river that I could not ford", "Ever-deepening blessing."],
      ["47:9", "Everything will live where the river goes", "Even the Dead Sea comes alive."],
      ["47:12", "Their leaves for healing", "Echoed in Revelation 22:2."],
      ["47:22", "The aliens who stay in your midst... shall have an inheritance", "Room for outsiders."],
    ],
    refs: [["REV.22", "Revelation 22:1-2", "The river of the water of life"], ["JHN.7", "John 7:37-39", "Rivers of living water"], ["ZEC.14", "Zechariah 14:8", "Living waters from Jerusalem"]],
  },
  48: {
    intro: "The land is divided among the twelve tribes in parallel strips, with the holy portion in the middle. The city has twelve gates named for the tribes, three on each side. The book ends with the city's new name: \"The LORD is there.\"",
    v: [
      ["48:31", "The gates of the city shall be named after the tribes", "Every tribe has a place."],
      ["48:35", "The LORD is there", "Hebrew: Yahweh Shammah. The best thing about the city is God's presence."],
    ],
    refs: [["REV.21", "Revelation 21:3, 12-13", "Twelve gates; God dwells with them"], ["MAT.1", "Matthew 1:23", "Immanuel, God with us"]],
  },
});
