// Ruth chapter notes.
import { makeBook } from "./make.js";

const sources = {
  block: "Daniel I. Block, Judges, Ruth, New American Commentary 6 (Broadman & Holman, 1999).",
  hubbard: "Robert L. Hubbard Jr., The Book of Ruth, New International Commentary on the Old Testament (Eerdmans, 1988).",
  younger: "K. Lawson Younger Jr., Judges and Ruth, NIV Application Commentary (Zondervan, 2002).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["hubbard", "block"] }, {
  1: {
    intro: "In the days of the judges, a famine drives Elimelech, Naomi and their two sons from Bethlehem to Moab. The men die, leaving Naomi with two Moabite daughters-in-law. Naomi decides to go home. Orpah kisses her goodbye, but Ruth clings to her: \"Where you go, I will go... your people shall be my people, and your God, my God.\"",
    v: [
      ["1:1", "In the days when the judges governed", "A story of quiet faithfulness set in a dark time."],
      ["1:16-17", "Your God, my God", "Ruth's vow is a confession of faith in the LORD."],
      ["1:20", "Call me Mara", "Naomi (\"pleasant\") calls herself Mara (\"bitter\")."],
      ["1:22", "At the beginning of barley harvest", "A hint that hope is coming."],
    ],
    refs: [["MAT.1", "Matthew 1:5", "Boaz the father of Obed by Ruth"], ["JDG.21", "Judges 21:25", "The days of the judges"]],
  },
  2: {
    intro: "Ruth gleans barley behind the reapers and \"happens\" to come to the field of Boaz, a relative of Elimelech. Boaz is kind to her, protects her and gives her extra grain, because he has heard of her loyalty to Naomi. Naomi tells Ruth that Boaz is one of their close relatives, a kinsman-redeemer.",
    v: [
      ["2:3", "She happened to come", "The writer smiles: what looks like chance is God's guiding hand."],
      ["2:12", "Under whose wings you have come to seek refuge", "Boaz blesses Ruth in the LORD's name."],
      ["2:20", "One of our redeemers", "Hope returns to Naomi."],
    ],
    w: [["גֹּאֵל", "go'el", "H1350", "kinsman-redeemer", "A close relative responsible to buy back family land, free a relative from slavery or carry on a dead man's name (Leviticus 25:25). The Bible calls God Israel's Redeemer (Isaiah 41:14).", ["halot", "hubbard"]]],
    refs: [["LEV.19", "Leviticus 19:9-10", "Leave the gleanings"], ["PSA.91", "Psalm 91:4", "Under His wings you may seek refuge"]],
  },
  3: {
    intro: "Naomi sends Ruth to the threshing floor at night. Ruth lies at Boaz's feet and asks him to spread his garment over her, a request for marriage. Boaz praises her and agrees, but explains there is a closer relative who must first be asked. He sends her home with six measures of barley.",
    v: [
      ["3:9", "Spread your covering over your maid", "The same word as \"wings\" in 2:12. Ruth asks Boaz to be the answer to his own prayer. Ezekiel 16:8 uses the same picture of God and Israel."],
      ["3:10", "This last kindness", "Ruth's loyalty to Naomi's family is hesed."],
      ["3:11", "A woman of excellence", "The same phrase as Proverbs 31:10."],
    ],
    refs: [["EZK.16", "Ezekiel 16:8", "I spread My skirt over you"], ["PRO.31", "Proverbs 31:10", "An excellent wife"]],
  },
  4: {
    intro: "At the town gate, the closer relative declines to redeem, and Boaz buys Naomi's land and marries Ruth before witnesses. Ruth bears a son, Obed. The women bless Naomi, who holds the child. Obed is the grandfather of King David.",
    v: [
      ["4:7", "A man removed his sandal", "The custom that sealed the deal."],
      ["4:14", "Blessed is the LORD", "The women praise God for giving Naomi a redeemer."],
      ["4:17", "The father of Jesse, the father of David", "A Moabite woman becomes the great-grandmother of Israel's greatest king, and an ancestor of Jesus."],
    ],
    why: "When was Ruth written? The story is set in the judges' period, but it ends with David's family line.",
    views: [
      ["In David's time or soon after", "Many date it to the time of David or Solomon, perhaps to show God's hand in David's family, including a faithful Moabite ancestor.", ["hubbard", "block"]],
      ["After the exile", "Others suggest a later date, when Israel was debating marriages with foreigners (Ezra 9-10), as a gentle reminder of Ruth.", ["younger"]],
    ],
    common: "All agree that Ruth shows God's quiet care through ordinary faithfulness, and that His family has always had room for those from other nations who trust Him.",
    refs: [["MAT.1", "Matthew 1:5-6", "Ruth in Jesus' family line"], ["DEU.25", "Deuteronomy 25:5-10", "The brother-in-law's duty"]],
  },
});
