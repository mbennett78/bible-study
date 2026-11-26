// Joel chapter notes.
import { makeBook } from "./make.js";

const sources = {
  stuartM: "Douglas Stuart, Hosea-Jonah, Word Biblical Commentary 31 (Word, 1987).",
  smithB: "Billy K. Smith and Frank S. Page, Amos, Obadiah, Jonah, New American Commentary 19B (Broadman & Holman, 1995).",
  garrettH: "Duane A. Garrett, Hosea, Joel, New American Commentary 19A (Broadman & Holman, 1997).",
  hubbardD: "David A. Hubbard, Hosea and Joel and Amos, Tyndale Old Testament Commentaries (InterVarsity Press, 1989).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["garrettH", "hubbardD"] }, {
  1: {
    intro: "\"Hear this, O elders... Has anything like this happened in your days?\" Wave after wave of locusts has stripped the land: the vine is ruined, the fig tree splintered, the grain destroyed. Even the offerings for the temple are cut off. Joel calls the priests to put on sackcloth, proclaim a fast and cry to the LORD, for the day of the LORD is near.",
    v: [
      ["1:3", "Tell your sons about it", "Tell your children about it, and let them tell theirs. Joel wants this disaster and its lesson remembered."],
      ["1:4", "What the gnawing locust has left, the swarming locust has eaten", "Wave after wave of locusts stripped the land. What one swarm left, the next ate."],
      ["1:14", "Consecrate a fast, proclaim a solemn assembly", "Joel calls for a holy fast and a sacred assembly. Gather everyone to the LORD's house and cry out to Him."],
    ],
    bg: [["Locust plagues", "Desert locust swarms can cover hundreds of square miles and strip every green thing. Jerusalem suffered a devastating plague in 1915 that observers compared directly with Joel.", "strong", ["garrettH", "hubbardD"]]],
    refs: [["EXO.10", "Exodus 10:12-15", "The locust plague"], ["DEU.28", "Deuteronomy 28:38", "The locust will consume it"]],
  },
  2: {
    intro: "The day of the LORD comes like an army of locusts, darkening the sun. \"Yet even now,\" declares the LORD, \"return to Me with all your heart... rend your heart and not your garments.\" God is gracious and compassionate. He promises: \"I will make up to you for the years that the swarming locust has eaten.\" \"And it will come about after this that I will pour out My Spirit on all mankind; and your sons and daughters will prophesy.\" \"Whoever calls on the name of the LORD will be delivered.\"",
    v: [
      ["2:12", "Return to Me with all your heart", "Even now, God says, return to Me with all your heart, with fasting, weeping and mourning. It is not too late."],
      ["2:13", "Rend your heart and not your garments", "Inner repentance, not just outward show."],
      ["2:25", "I will make up to you for the years that the locust has eaten", "God promises to repay the years the locusts ate. He can restore what seemed lost forever."],
      ["2:28", "I will pour out My Spirit on all mankind", "God will pour out His Spirit on all people: sons and daughters, young and old, servants. Peter said this happened at Pentecost (Acts 2:16-18)."],
      ["2:32", "Whoever calls on the name of the LORD will be delivered", "Everyone who calls on the name of the LORD will be saved. Peter quotes it in Acts 2:21 and Paul in Romans 10:13."],
    ],
    bg: [["The Spirit poured out", "After a locust plague like an invading army (2:1-11), God promises, \"I will pour out My Spirit on all mankind\" (2:28). At Pentecost Peter said, \"This is what was spoken of through the prophet Joel\" (Acts 2:16-21).", "strong", ["stuartM", "garrettH"]]],
    w: [["אַרְבֶּה", "arbeh", "H697", "locust", "Desert locusts can swarm by the millions and strip every green thing. The word is also used in the eighth plague on Egypt (Exodus 10:4).", ["halot", "hubbardD"]]],
    refs: [["ACT.2", "Acts 2:16-21", "Peter quotes Joel at Pentecost"], ["ROM.10", "Romans 10:13", "Whoever will call on the name of the Lord"], ["EXO.34", "Exodus 34:6", "Gracious and compassionate"]],
  },
  3: {
    intro: "God will gather the nations to the valley of Jehoshaphat (\"the LORD judges\") and judge them for scattering His people and selling them as slaves. \"Beat your plowshares into swords\" (reversing Isaiah 2). \"Multitudes, multitudes in the valley of decision!\" But the LORD is a refuge for His people. The mountains will drip with sweet wine, and a spring will flow from the house of the LORD.",
    v: [
      ["3:2", "The valley of Jehoshaphat", "God will gather the nations to the Valley of Jehoshaphat, a name that means \"the LORD judges,\" and judge them for how they treated His people."],
      ["3:10", "Beat your plowshares into swords", "Isaiah and Micah spoke of swords into plowshares. Here the nations are told the opposite, as they prepare for battle against God."],
      ["3:14", "Multitudes in the valley of decision", "Multitudes, multitudes, in the valley of decision! The day of the LORD is near, the day He gives His verdict."],
      ["3:16", "The LORD is a refuge for His people", "The LORD roars from Zion and the heavens and earth shake, but He is a refuge and stronghold for His people."],
      ["3:18", "A spring will go out from the house of the LORD", "In that day the mountains will drip new wine and a spring will flow from the LORD's house. Ezekiel 47 and Revelation 22 picture the same river."],
    ],
    bg: [["The valley of Jehoshaphat", "God will gather the nations to \"the valley of Jehoshaphat,\" which means \"the LORD judges\" (3:2, 12). Joel turns Isaiah's famous words around: \"Beat your plowshares into swords\" (3:10), a call to the final battle before God's peace.", "good", ["stuartM", "smithB"]]],
    refs: [["ISA.2", "Isaiah 2:4", "Swords into plowshares"], ["EZK.47", "Ezekiel 47:1-12", "The river from the temple"], ["REV.14", "Revelation 14:14-20", "The harvest of the earth"]],
  },
});
