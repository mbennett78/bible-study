// Nahum chapter notes.
import { makeBook } from "./make.js";

const sources = {
  robertson: "O. Palmer Robertson, The Books of Nahum, Habakkuk, and Zephaniah, New International Commentary on the Old Testament (Eerdmans, 1990).",
  smithR: "Ralph L. Smith, Micah-Malachi, Word Biblical Commentary 32 (Word, 1984).",
  baker2: "David W. Baker, Nahum, Habakkuk and Zephaniah, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["robertson", "baker2"] }, {
  1: {
    intro: "Nahum's vision concerns Nineveh, about a century after Jonah. The LORD is a jealous and avenging God, slow to anger but great in power; He will by no means leave the guilty unpunished. Mountains quake before Him. \"The LORD is good, a stronghold in the day of trouble, and He knows those who take refuge in Him.\" Judah hears good news: \"Behold, on the mountains the feet of him who brings good news, who announces peace!\" Assyria's yoke will be broken.",
    v: [
      ["1:3", "The LORD is slow to anger and great in power", "The LORD is slow to anger but great in power, and He will not leave the guilty unpunished. His patience is not weakness."],
      ["1:7", "The LORD is good, a stronghold in the day of trouble", "In a book about judgment on Nineveh comes this comfort: the LORD is good, a refuge in times of trouble. He knows those who trust Him."],
      ["1:13", "I will break his yoke bar from upon you", "To Judah, long oppressed by Assyria, God promises: I will break his yoke off your neck and tear away your chains."],
      ["1:15", "On the mountains the feet of him who brings good news", "A messenger runs across the mountains with good news of peace: the enemy is gone. Isaiah 52:7 has almost the same words, and Paul uses them in Romans 10:15."],
    ],
    why: "Some readers find Nahum's celebration over an enemy's fall hard to square with Jonah's message of mercy for Nineveh.",
    views: [
      ["Two sides of one God", "Many note that Nineveh repented under Jonah but returned to great cruelty. Nahum shows that God's patience has a limit and that He defends the oppressed.", ["robertson", "baker2"]],
      ["Comfort for victims", "Others stress that Nahum (whose name means \"comfort\") wrote for a people crushed by Assyria; the book assures victims that evil will not have the last word.", ["smithR"]],
    ],
    common: "Both books affirm God is \"slow to anger\" (Jonah 4:2; Nahum 1:3) and both mercy and justice belong to Him.",
    bg: [["The fall of Nineveh", "Nahum announces the end of Nineveh, Assyria's capital, which had crushed many nations. It fell to the Babylonians and Medes in 612 BC. Yet Nahum also says, \"The LORD is good, a stronghold in the day of trouble\" (1:7).", "strong", ["robertson", "kitchen"]]],
    refs: [["JON.4", "Jonah 4:2", "Slow to anger, abounding in love"], ["EXO.34", "Exodus 34:6-7", "The LORD's name proclaimed"], ["ISA.52", "Isaiah 52:7", "How lovely on the mountains"], ["ROM.10", "Romans 10:15", "Beautiful feet"]],
  },
  2: {
    intro: "A vivid battle poem: the attacker comes against Nineveh, shields red, chariots racing like lightning through the streets. The river gates are opened and the palace dissolves. The city is plundered of silver and gold. The lions' den, Assyria's proud capital, is empty. \"Behold, I am against you,\" declares the LORD of hosts.",
    v: [
      ["2:4", "The chariots race madly in the streets", "Nahum pictures Nineveh's fall: chariots storm wildly through the streets, flashing like torches and darting like lightning."],
      ["2:6", "The gates of the rivers are opened and the palace is dissolved", "The river gates are thrown open and the palace collapses. Ancient writers said flooding helped bring down Nineveh's walls in 612 BC."],
      ["2:11", "Where is the den of the lions?", "Assyria liked to picture its kings as lions."],
      ["2:13", "Behold, I am against you, declares the LORD of hosts", "I am against you, says the LORD of hosts. No empire, however cruel or strong, can stand against Him."],
    ],
    bg: [["The fall of Nineveh, 612 BC", "Babylonian and Median armies captured Nineveh in 612 BC. A Babylonian chronicle records the siege. Ancient historians later wrote that a flood of the river broke part of the wall, which fits Nahum 2:6.", "strong", ["kitchen", "robertson"]]],
    refs: [["ZEP.2", "Zephaniah 2:13-15", "Nineveh made a desolation"], ["ISA.10", "Isaiah 10:12", "The arrogant heart of Assyria's king"]],
  },
  3: {
    intro: "Woe to the bloody city, full of lies and plunder. Horsemen charge, and corpses lie without end. Nineveh is no better than Thebes in Egypt, which also fell despite its rivers and allies. Her fortresses are fig trees with ripe figs that fall into the eater's mouth. Her merchants and officials scatter like locusts. The book ends: \"All who hear about you will clap their hands over you, for on whom has not your evil passed continually?\"",
    v: [
      ["3:1", "Woe to the bloody city, completely full of lies", "Woe to the city of bloodshed, full of lies and plunder. Assyria was famous for its cruelty to conquered peoples."],
      ["3:8", "Are you better than No-amon?", "No-amon is Thebes, a great Egyptian city protected by the Nile, which Assyria itself destroyed in 663 BC. Nineveh is no safer."],
      ["3:12", "All your fortifications are fig trees with ripe fruit", "All of Nineveh's fortresses are like fig trees with ripe figs. Shake them, and the fruit falls into the eater's mouth."],
      ["3:19", "On whom has not your evil passed continually?", "The book ends with the nations clapping at Nineveh's fall, for who had not suffered from its endless cruelty?"],
    ],
    bg: [["Are you better than Thebes?", "\"Are you better than No-amon?\" (3:8). No-amon was Thebes, the great city of Egypt, protected by the Nile. Assyria itself had captured and plundered it in 663 BC. If Thebes fell, so could Nineveh.", "strong", ["robertson", "kitchen"]]],
    refs: [["EZK.24", "Ezekiel 24:6-9", "Woe to the bloody city"], ["REV.18", "Revelation 18", "The fall of a great proud city"], ["PSA.37", "Psalm 37:35-36", "The wicked pass away"]],
  },
});
