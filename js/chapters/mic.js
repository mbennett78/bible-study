// Micah chapter notes. Chapter 5 keeps its full notes in notes-more.js.
import { makeBook } from "./make.js";

const sources = {
  waltke: "Bruce K. Waltke, A Commentary on Micah (Eerdmans, 2007).",
  baker: "David W. Baker, T. Desmond Alexander and Bruce K. Waltke, Obadiah, Jonah and Micah, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  smithR: "Ralph L. Smith, Micah-Malachi, Word Biblical Commentary 32 (Word, 1984).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["waltke", "baker"] }, {
  1: {
    intro: "Micah of Moresheth prophesies in the days of Jotham, Ahaz and Hezekiah, kings of Judah. He calls all the earth to listen: the LORD is coming down from His holy place to judge. Samaria will become a heap of ruins because of her idols, and the wound reaches even to the gate of Jerusalem. Micah mourns, going barefoot, and lists towns of Judah in a string of wordplays on their names.",
    v: [
      ["1:2", "Hear, O peoples, all of you", "Micah opens like a court case: all peoples and the whole earth are called to listen as the Lord testifies."],
      ["1:3", "The LORD is coming forth from His place", "The LORD comes down from His holy place and walks on the heights of the earth, and the mountains melt beneath Him."],
      ["1:6", "I will make Samaria a heap of ruins", "Fulfilled when Assyria took Samaria in 722 BC."],
      ["1:9", "Her wound is incurable... it has reached the gate of my people, to Jerusalem", "Samaria's sin is like an incurable wound, and it has spread south to Judah, right up to Jerusalem's gate."],
    ],
    bg: [["Moresheth and the Shephelah", "Micah's hometown, Moresheth-gath, sat in the low hills southwest of Jerusalem. Many towns he names here, like Lachish, lay on the road Assyria's army took in 701 BC. Assyrian wall carvings of the siege of Lachish survive in the British Museum.", "strong", ["kitchen", "waltke"]]],
    refs: [["ISA.1", "Isaiah 1:2", "Listen, O heavens"], ["2KI.17", "2 Kings 17:5-6", "Samaria falls"], ["JER.26", "Jeremiah 26:18", "Micah's words remembered a century later"]],
  },
  2: {
    intro: "Woe to those who lie awake planning evil and carry it out at dawn: they covet fields and seize them, houses and take them. God plans disaster in return. The people tell Micah, \"Do not preach,\" preferring a prophet who promises wine and beer. Yet the chapter ends with hope: God will gather the remnant like sheep in a fold, and the One who breaks open the way will go up before them, with the LORD at their head.",
    v: [
      ["2:1", "Woe to those who scheme iniquity... on their beds", "Woe to those who lie awake planning evil and carry it out at morning light, because they have the power to do it."],
      ["2:2", "They covet fields and then seize them", "Land grabbing breaks the tenth commandment."],
      ["2:6", "Do not speak out, so they speak out", "The people tell the prophets: do not preach about these things. Many would rather silence the truth than hear it."],
      ["2:11", "He would be spokesman to this people", "They want a preacher who tells them what they like."],
      ["2:13", "The breaker goes up before them... the LORD at their head", "God promises to gather His scattered people. One who breaks open the way will go before them, with the LORD at their head."],
    ],
    bg: [["Land grabbing", "\"They covet fields and then seize them, and houses, and take them away\" (2:2). The Law meant each family to keep its land forever (Leviticus 25:23). The rich were taking it from the poor.", "good", ["waltke", "smithR"]]],
    refs: [["EXO.20", "Exodus 20:17", "Do not covet"], ["1KI.21", "1 Kings 21", "Naboth's vineyard"], ["2TI.4", "2 Timothy 4:3", "Teachers to suit their own desires"], ["JHN.10", "John 10:3-4", "The shepherd goes before the sheep"]],
  },
  3: {
    intro: "Micah turns on the leaders. The rulers who should know justice hate good and love evil; they tear the people apart like meat for a pot. The prophets cry \"Peace\" when they are fed and declare war on anyone who does not feed them. But Micah says, \"I am filled with power, with the Spirit of the LORD, and with justice and courage.\" Because of these leaders, Zion will be plowed like a field.",
    v: [
      ["3:1", "Is it not for you to know justice?", "Micah confronts Israel's rulers: you of all people should know justice, yet you hate good and love evil (3:2)."],
      ["3:5", "When they have something to bite with their teeth, they cry, \"Peace\"", "False prophets promise peace to anyone who feeds them, and declare war on those who do not. Their message is for sale."],
      ["3:8", "I am filled with power, with the Spirit of the LORD", "Unlike the hired prophets, Micah is filled with power, the Spirit of the LORD, justice and courage, to name Israel's sin."],
      ["3:11", "Her priests instruct for a price... yet they lean on the LORD", "Leaders judge for bribes, priests teach for pay, prophets tell fortunes for money, and they still claim the LORD is with them."],
      ["3:12", "Zion will be plowed as a field", "Quoted a century later in Jeremiah 26:18."],
    ],
    bg: [["Zion plowed like a field", "\"Zion will be plowed as a field, Jerusalem will become a heap of ruins\" (3:12). A century later, elders remembered these words and saved Jeremiah's life, because King Hezekiah had repented when Micah spoke them (Jeremiah 26:18-19).", "strong", ["waltke", "baker"]]],
    refs: [["EZK.34", "Ezekiel 34:2-4", "Shepherds who feed themselves"], ["JER.26", "Jeremiah 26:18-19", "Hezekiah heeded Micah"], ["ACT.1", "Acts 1:8", "You will receive power when the Spirit comes"]],
  },
  4: {
    intro: "In the last days, the mountain of the LORD's house will be raised above the hills, and nations will stream to it, saying, \"Come, let us go up... that He may teach us His ways.\" They will beat swords into plowshares and spears into pruning hooks, and each will sit under his own vine and fig tree with no one to make them afraid. The lame and outcast will be gathered. Daughter Zion will go to Babylon, and there she will be rescued.",
    v: [
      ["4:2", "That He may teach us about His ways and that we may walk in His paths", "Many nations will say: let us go up to the LORD's mountain, so He can teach us His ways. Isaiah 2:2-4 has the same vision."],
      ["4:3", "They will hammer their swords into plowshares", "God will judge between nations, and they will hammer swords into plows and spears into pruning hooks."],
      ["4:4", "Each of them will sit under his vine and under his fig tree", "Everyone will sit under their own vine and fig tree, with no one to make them afraid. A picture of peace and safety at home."],
      ["4:5", "We will walk in the name of the LORD our God forever", "Other peoples may walk in the name of their gods, but we will walk in the name of the LORD our God forever."],
      ["4:10", "You will go to Babylon. There you will be rescued", "Zion will go to Babylon, and there the LORD will rescue her. Micah spoke this more than a century before the exile."],
    ],
    why: "Micah 4:1-3 is nearly word for word the same as Isaiah 2:2-4.",
    views: [
      ["Micah drew on Isaiah, or the reverse", "Some hold one contemporary quoted the other, since both preached in Judah in the same years.", ["smithR"]],
      ["Both drew on an older song", "Others suggest both prophets used an earlier, well-known oracle from worship at the temple.", ["waltke", "baker"]],
    ],
    common: "Either way, two prophets independently stood behind the same promise of a world at peace under God's teaching.",
    bg: [["Swords into plowshares", "Micah 4:1-3 and Isaiah 2:2-4 share almost the same words: nations streaming to God's mountain and beating swords into plowshares. Micah adds, \"Each of them will sit under his vine and under his fig tree, with no one to make them afraid\" (4:4).", "strong", ["waltke", "smithR"]]],
    refs: [["ISA.2", "Isaiah 2:2-4", "The same prophecy"], ["JOL.3", "Joel 3:10", "The reverse: plowshares into swords"], ["ZEC.3", "Zechariah 3:10", "Under his vine and fig tree"]],
  },
  6: {
    intro: "The LORD brings His case against Israel, calling the mountains as witnesses: \"My people, what have I done to you? How have I wearied you? Answer Me.\" He reminds them that He brought them out of Egypt and sent Moses, Aaron and Miriam. The worshiper asks what to bring: burnt offerings, thousands of rams, even a firstborn child? Micah answers: \"He has told you, O man, what is good: to do justice, to love kindness and to walk humbly with your God.\" Then God names Jerusalem's cheating scales and violence.",
    v: [
      ["6:3", "My people, what have I done to you?", "God speaks like a hurt parent: My people, what have I done to you? How have I burdened you? Answer Me."],
      ["6:4", "I brought you up from the land of Egypt", "God reminds them of what He did: brought them out of Egypt, redeemed them from slavery, and sent Moses, Aaron and Miriam to lead them."],
      ["6:7", "Shall I present my firstborn for my rebellious acts?", "Would God be pleased with thousands of rams, or even a firstborn child? No gift can buy His favor. Micah 6:8 gives the answer."],
      ["6:8", "To do justice, to love kindness, and to walk humbly with your God", "One of the most loved verses in the prophets."],
      ["6:11", "Can I justify wicked scales?", "God asks: can I call someone innocent who uses dishonest scales and a bag of false weights? Honesty in business matters to Him."],
    ],
    w: [["חֶסֶד", "chesed", "H2617", "kindness, steadfast love", "Loyal, covenant love that keeps showing up. Micah asks people to love it, not just do it.", ["halot", "waltke"]]],
    refs: [["DEU.10", "Deuteronomy 10:12", "What does the LORD require?"], ["HOS.6", "Hosea 6:6", "Mercy, not sacrifice"], ["MAT.23", "Matthew 23:23", "Justice, mercy and faithfulness"], ["PRO.11", "Proverbs 11:1", "False scales"]],
  },
  7: {
    intro: "Micah grieves like someone who finds no fruit after harvest: the godly have vanished, and even family members turn on each other. Yet he says, \"I will watch expectantly for the LORD; I will wait for the God of my salvation.\" \"Though I fall I will rise; though I dwell in darkness, the LORD is a light for me.\" The book ends with praise: \"Who is a God like You, who pardons iniquity?\" He will cast all our sins into the depths of the sea.",
    v: [
      ["7:6", "A man's enemies are the men of his own household", "In a corrupt society, even families turn against each other. Jesus quoted this about how following Him can divide households (Matthew 10:35-36)."],
      ["7:7", "I will watch expectantly for the LORD", "When no one can be trusted, Micah says: but as for me, I will watch for the LORD and wait for the God of my salvation."],
      ["7:8", "Though I fall I will rise; though I dwell in darkness, the LORD is a light for me", "Do not gloat over me, my enemy. Though I fall, I will rise; though I sit in darkness, the LORD will be my light."],
      ["7:18", "Who is a God like You, who pardons iniquity?", "A play on Micah's own name, \"Who is like the LORD?\""],
      ["7:19", "You will cast all their sins into the depths of the sea", "God will have compassion again, tread our sins underfoot, and throw them into the depths of the sea, gone for good."],
    ],
    bg: [["Sins cast into the sea", "\"You will cast all their sins into the depths of the sea\" (7:19). Jews still read 7:18-20 at the New Year in a custom called Tashlich, casting bread into flowing water as a picture of sins carried away.", "strong", ["waltke", "baker"]]],
    refs: [["MAT.10", "Matthew 10:35-36", "Jesus quotes Micah 7:6"], ["PSA.103", "Psalm 103:12", "As far as east from west"], ["EXO.15", "Exodus 15:11", "Who is like You, O LORD?"], ["LUK.1", "Luke 1:72-73", "The oath to Abraham remembered"]],
  },
});
