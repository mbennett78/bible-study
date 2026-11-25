// Philemon chapter notes.
import { makeBook } from "./make.js";

const sources = {
  mooC: "Douglas J. Moo, The Letters to the Colossians and to Philemon, Pillar New Testament Commentary (Eerdmans, 2008).",
  wrightC: "N. T. Wright, Colossians and Philemon, Tyndale New Testament Commentaries (InterVarsity Press, 1986).",
  bruceC: "F. F. Bruce, The Epistles to the Colossians, to Philemon, and to the Ephesians, New International Commentary on the New Testament (Eerdmans, 1984).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["mooC", "wrightC"] }, {
  1: {
    intro: "Paul, a prisoner of Christ Jesus, writes a short personal letter to his friend Philemon, a believer in Colossae whose home hosts a church. Philemon's servant Onesimus had run away, perhaps taking something with him, and somehow met Paul in prison, where he became a believer. Now Paul sends him back. He could command Philemon, but he appeals out of love: receive Onesimus \"no longer as a slave, but more than a slave, a beloved brother.\" \"If he has wronged you in any way or owes you anything, charge that to my account.\" Paul is confident Philemon will do even more than he asks.",
    v: [
      ["1:2", "To the church in your house", "There were no church buildings yet. The church in Colossae met in Philemon's home."],
      ["1:7", "The hearts of the saints have been refreshed through you", "Philemon's love had encouraged and refreshed God's people. Paul now asks him to refresh his own heart (1:20)."],
      ["1:10", "I appeal to you for my child Onesimus, whom I have begotten in my imprisonment", "Onesimus, Philemon's runaway slave, met Paul in prison and became a believer. Paul calls him his own child in the faith."],
      ["1:11", "Who formerly was useless to you, but now is useful", "The name Onesimus means \"useful.\" Paul makes a gentle pun: once useless to you, now useful to both of us."],
      ["1:16", "No longer as a slave, but more than a slave, a beloved brother", "Paul asks Philemon to welcome Onesimus back not merely as a slave, but as a dear brother in the Lord. The gospel changes relationships."],
      ["1:18", "If he has wronged you in any way or owes you anything, charge that to my account", "Paul pays the debt. Paul offers to pay Onesimus's debt himself, a small picture of what Christ did for us: \"charge that to my account.\""],
      ["1:21", "Knowing that you will do even more than what I say", "Paul does not order Philemon. He trusts that he will do even more than asked, and many read this as a hint to set Onesimus free."],
    ],
    bg: [["Onesimus means \"useful\"", "The name Onesimus was common for slaves and means \"useful\" or \"profitable.\" Paul jokes that the formerly useless man is now truly useful. Many early Christian writers believed this same Onesimus later became a leader of the church in Ephesus.", "debated", ["mooC", "bruceC"]]],
    refs: [["COL.4", "Colossians 4:7-9", "Onesimus returns with Tychicus"], ["GAL.3", "Galatians 3:28", "Neither slave nor free"], ["2CO.5", "2 Corinthians 5:19-21", "Not counting trespasses"]],
  },
});
