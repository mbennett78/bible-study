// Haggai chapter notes.
import { makeBook } from "./make.js";

const sources = {
  verhoef: "Pieter A. Verhoef, The Books of Haggai and Malachi, New International Commentary on the Old Testament (Eerdmans, 1987).",
  baldwin: "Joyce G. Baldwin, Haggai, Zechariah, Malachi, Tyndale Old Testament Commentaries (InterVarsity Press, 1972).",
  smithR: "Ralph L. Smith, Micah-Malachi, Word Biblical Commentary 32 (Word, 1984).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["verhoef", "baldwin"] }, {
  1: {
    intro: "In 520 BC, the second year of Darius king of Persia, the exiles have been home for about eighteen years, but God's temple still lies in ruins. The people say, \"The time has not come.\" Haggai asks, \"Is it time for you yourselves to dwell in your paneled houses while this house lies desolate?\" They sow much but harvest little, and earn wages to put into a purse with holes. \"Consider your ways!\" Governor Zerubbabel, the high priest Joshua and the people obey, and within weeks the work begins.",
    v: [
      ["1:2", "The time has not come", "Excuses for delay."],
      ["1:4", "Is it time for you yourselves to dwell in your paneled houses?", "Misplaced priorities."],
      ["1:6", "He who earns, earns wages to put into a purse with holes", "Never enough."],
      ["1:7", "Consider your ways!", "Stop and think."],
      ["1:13", "I am with you, declares the LORD", "God's presence encourages the work."],
      ["1:14", "The LORD stirred up the spirit of Zerubbabel", "God moves hearts to act."],
    ],
    bg: [["Dated to the day", "Haggai dates each message to the day, using the Persian king's reign. Scholars can match these dates to the modern calendar: the first message fell on August 29, 520 BC, and the work began on September 21.", "strong", ["verhoef", "kitchen"]]],
    refs: [["EZR.4", "Ezra 4:24", "The work stopped"], ["EZR.5", "Ezra 5:1-2", "Haggai and Zechariah encourage the builders"], ["MAT.6", "Matthew 6:33", "Seek first the kingdom"]],
  },
  2: {
    intro: "A month later the older people, who remember Solomon's temple, are discouraged: this house seems like nothing. God says, \"Be strong... and work, for I am with you.\" \"I will shake all the nations, and they will come with the wealth of all nations, and I will fill this house with glory.\" \"The latter glory of this house will be greater than the former.\" A lesson about clean and unclean shows that holiness does not rub off, but sin does. From the day the foundation is laid, God will bless. Zerubbabel will be like a signet ring.",
    v: [
      ["2:3", "Does it not seem to you like nothing in comparison?", "Remembering \"the good old days.\""],
      ["2:4", "Be strong... and work, for I am with you", "God's answer to discouragement."],
      ["2:7", "I will fill this house with glory", "A greater glory to come."],
      ["2:9", "The latter glory of this house will be greater than the former", "Jesus would one day teach in this temple."],
      ["2:19", "From this day on I will bless you", "Obedience opens the door."],
      ["2:23", "I will make you like a signet ring, for I have chosen you", "Reverses the curse of Jeremiah 22:24."],
    ],
    why: "Haggai 2:7 is translated in two ways.",
    views: [
      ["\"The desire of all nations\"", "Older translations read it as a person, \"the Desire of all nations will come,\" and many have seen a promise of the Messiah.", ["baldwin"]],
      ["\"The wealth of all nations\"", "Many newer translations read \"the treasures of all nations,\" since the verb is plural and verse 8 speaks of silver and gold.", ["verhoef", "smithR"]],
    ],
    common: "Both readings agree God would fill the rebuilt temple with a glory greater than Solomon's.",
    refs: [["EZR.3", "Ezra 3:12", "The old men wept"], ["HEB.12", "Hebrews 12:26-28", "Once more I will shake"], ["JER.22", "Jeremiah 22:24", "The signet ring"], ["MAT.1", "Matthew 1:12", "Zerubbabel in Jesus' family line"]],
  },
});
