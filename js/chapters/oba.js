// Obadiah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  stuartM: "Douglas Stuart, Hosea-Jonah, Word Biblical Commentary 31 (Word, 1987).",
  smithB: "Billy K. Smith and Frank S. Page, Amos, Obadiah, Jonah, New American Commentary 19B (Broadman & Holman, 1995).",
  garrettH: "Duane A. Garrett, Hosea, Joel, New American Commentary 19A (Broadman & Holman, 1997).",
  hubbardD: "David A. Hubbard, Hosea and Joel and Amos, Tyndale Old Testament Commentaries (InterVarsity Press, 1989).",
  baker: "Joyce Baldwin, David W. Baker and T. Desmond Alexander, Obadiah, Jonah, Micah, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["baker", "smithB"] }, {
  1: {
    intro: "The shortest book of the Old Testament, one chapter. Obadiah's vision is against Edom, descended from Jacob's brother Esau. Edom lived proudly in the high rock cliffs and thought, \"Who will bring me down to earth?\" God says, \"Though you build high like the eagle, though you set your nest among the stars, from there I will bring you down.\" When Jerusalem fell, Edom stood aloof, gloated, looted and handed over survivors. \"As you have done, it will be done to you.\" But on Mount Zion there will be deliverance, \"and the kingdom will be the LORD's.\"",
    v: [
      ["1:3", "The arrogance of your heart has deceived you", "Pride blinds."],
      ["1:4", "Though you set your nest among the stars", "No height is beyond God."],
      ["1:10", "Because of violence to your brother Jacob", "Edom betrayed family."],
      ["1:12", "Do not gloat over your brother's day", "Gloating is sin."],
      ["1:15", "As you have done, it will be done to you", "Justice returns."],
      ["1:21", "The kingdom will be the LORD's", "God's final rule."],
    ],
    bg: [["Petra and Edom", "Edom's land south of the Dead Sea is full of red sandstone cliffs. Later the Nabataeans carved the famous city of Petra there. Edom as a nation vanished from history by the time of the Romans.", "strong", ["baker", "smithB"]]],
    refs: [["GEN.27", "Genesis 27:41", "Esau hates Jacob"], ["PSA.137", "Psalm 137:7", "Remember the sons of Edom"], ["JER.49", "Jeremiah 49:7-22", "A similar prophecy"]],
  },
});
