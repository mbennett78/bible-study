// Obadiah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  stuartM: "Douglas Stuart, Hosea-Jonah, Word Biblical Commentary 31 (Word, 1987).",
  smithB: "Billy K. Smith and Frank S. Page, Amos, Obadiah, Jonah, New American Commentary 19B (Broadman & Holman, 1995).",
  garrettH: "Duane A. Garrett, Hosea, Joel, New American Commentary 19A (Broadman & Holman, 1997).",
  hubbardD: "David A. Hubbard, Hosea and Joel and Amos, Tyndale Old Testament Commentaries (InterVarsity Press, 1989).",
  baker: "David W. Baker, T. Desmond Alexander and Bruce K. Waltke, Obadiah, Jonah and Micah, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["baker", "smithB"] }, {
  1: {
    intro: "The shortest book of the Old Testament, one chapter. Obadiah's vision is against Edom, descended from Jacob's brother Esau. Edom lived proudly in the high rock cliffs and thought, \"Who will bring me down to earth?\" God says, \"Though you build high like the eagle, though you set your nest among the stars, from there I will bring you down.\" When Jerusalem fell, Edom stood aloof, gloated, looted and handed over survivors. \"As you have done, it will be done to you.\" But on Mount Zion there will be deliverance, \"and the kingdom will be the LORD's.\"",
    v: [
      ["1:3", "The arrogance of your heart has deceived you", "Edom lived in high rocky cliffs and felt safe. Its proud heart fooled it into thinking no one could bring it down."],
      ["1:4", "Though you set your nest among the stars", "Even if Edom soared like an eagle and made its nest among the stars, God would bring it down."],
      ["1:10", "Because of violence to your brother Jacob", "Edom came from Esau, Jacob's brother. Because of its violence against its brother nation, Edom will be covered with shame."],
      ["1:12", "Do not gloat over your brother's day", "When Babylon destroyed Jerusalem, Edom stood by and gloated. God says you should not have looked down on your brother in his trouble."],
      ["1:15", "As you have done, it will be done to you", "The day of the LORD is near for all nations. As you have done, it will be done to you."],
      ["1:21", "The kingdom will be the LORD's", "The shortest book in the Old Testament ends with hope: deliverers will go up to Mount Zion, and the kingdom will be the LORD's."],
    ],
    bg: [["Petra and Edom", "Edom's land south of the Dead Sea is full of red sandstone cliffs. Later the Nabataeans carved the famous city of Petra there. Edom as a nation vanished from history by the time of the Romans.", "strong", ["baker", "smithB"]]],
    refs: [["GEN.27", "Genesis 27:41", "Esau hates Jacob"], ["PSA.137", "Psalm 137:7", "Remember the sons of Edom"], ["JER.49", "Jeremiah 49:7-22", "A similar prophecy"]],
  },
});
