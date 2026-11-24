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
      ["1:3", "The LORD is slow to anger and great in power", "Patience is not weakness."],
      ["1:7", "The LORD is good, a stronghold in the day of trouble", "Comfort in the middle of judgment."],
      ["1:13", "I will break his yoke bar from upon you", "Freedom from the oppressor."],
      ["1:15", "On the mountains the feet of him who brings good news", "Echoed in Isaiah 52:7 and Romans 10:15."],
    ],
    why: "Some readers find Nahum's celebration over an enemy's fall hard to square with Jonah's message of mercy for Nineveh.",
    views: [
      ["Two sides of one God", "Many note that Nineveh repented under Jonah but returned to great cruelty. Nahum shows that God's patience has a limit and that He defends the oppressed.", ["robertson", "baker2"]],
      ["Comfort for victims", "Others stress that Nahum (whose name means \"comfort\") wrote for a people crushed by Assyria; the book assures victims that evil will not have the last word.", ["smithR"]],
    ],
    common: "Both books affirm God is \"slow to anger\" (Jonah 4:2; Nahum 1:3) and both mercy and justice belong to Him.",
    refs: [["JON.4", "Jonah 4:2", "Slow to anger, abounding in love"], ["EXO.34", "Exodus 34:6-7", "The LORD's name proclaimed"], ["ISA.52", "Isaiah 52:7", "How lovely on the mountains"], ["ROM.10", "Romans 10:15", "Beautiful feet"]],
  },
  2: {
    intro: "A vivid battle poem: the attacker comes against Nineveh, shields red, chariots racing like lightning through the streets. The river gates are opened and the palace dissolves. The city is plundered of silver and gold. The lions' den, Assyria's proud capital, is empty. \"Behold, I am against you,\" declares the LORD of hosts.",
    v: [
      ["2:4", "The chariots race madly in the streets", "Panic in the city."],
      ["2:6", "The gates of the rivers are opened and the palace is dissolved", "Water plays a part in the fall."],
      ["2:11", "Where is the den of the lions?", "Assyria liked to picture its kings as lions."],
      ["2:13", "Behold, I am against you, declares the LORD of hosts", "No empire can stand against God."],
    ],
    bg: [["The fall of Nineveh, 612 BC", "Babylonian and Median armies captured Nineveh in 612 BC. A Babylonian chronicle records the siege. Ancient historians later wrote that a flood of the river broke part of the wall, which fits Nahum 2:6.", "strong", ["kitchen", "robertson"]]],
    refs: [["ZEP.2", "Zephaniah 2:13-15", "Nineveh made a desolation"], ["ISA.10", "Isaiah 10:12", "The arrogant heart of Assyria's king"]],
  },
  3: {
    intro: "Woe to the bloody city, full of lies and plunder. Horsemen charge, and corpses lie without end. Nineveh is no better than Thebes in Egypt, which also fell despite its rivers and allies. Her fortresses are fig trees with ripe figs that fall into the eater's mouth. Her merchants and officials scatter like locusts. The book ends: \"All who hear about you will clap their hands over you, for on whom has not your evil passed continually?\"",
    v: [
      ["3:1", "Woe to the bloody city, completely full of lies", "Assyria's cruelty named."],
      ["3:8", "Are you better than No-amon?", "Thebes fell to Assyria in 663 BC."],
      ["3:12", "All your fortifications are fig trees with ripe fruit", "Strength that shakes loose."],
      ["3:19", "On whom has not your evil passed continually?", "Every nation had suffered from Assyria."],
    ],
    refs: [["EZK.24", "Ezekiel 24:6-9", "Woe to the bloody city"], ["REV.18", "Revelation 18", "The fall of a great proud city"], ["PSA.37", "Psalm 37:35-36", "The wicked pass away"]],
  },
});
