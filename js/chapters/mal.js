// Malachi chapter notes.
import { makeBook } from "./make.js";

const sources = {
  verhoef: "Pieter A. Verhoef, The Books of Haggai and Malachi, New International Commentary on the Old Testament (Eerdmans, 1987).",
  baldwin: "Joyce G. Baldwin, Haggai, Zechariah, Malachi, Tyndale Old Testament Commentaries (InterVarsity Press, 1972).",
  smithR: "Ralph L. Smith, Micah-Malachi, Word Biblical Commentary 32 (Word, 1984).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["verhoef", "baldwin"] }, {
  1: {
    intro: "Malachi, the last of the Old Testament prophets, speaks to a weary people around the 400s BC. The book is a series of questions and answers. God says, \"I have loved you,\" and they reply, \"How have You loved us?\" He answers with history. Then He confronts the priests: they despise His name by offering blind, lame and sick animals they would never dare give the governor. \"From the rising of the sun even to its setting, My name will be great among the nations.\"",
    v: [
      ["1:2", "\"I have loved you,\" says the LORD. But you say, \"How have You loved us?\"", "The book opens with love."],
      ["1:6", "A son honors his father... where is My honor?", "God asks for respect."],
      ["1:8", "Why not offer it to your governor?", "Giving God leftovers."],
      ["1:11", "My name will be great among the nations", "Worship will spread to the whole world."],
      ["1:13", "My, how tiresome it is!", "Bored with worship."],
    ],
    bg: [["The dispute style", "Malachi uses a pattern of statement, question and answer: God says something, the people object, and God explains. Scholars count six such exchanges in the book.", "strong", ["verhoef", "baldwin"]]],
    refs: [["ROM.9", "Romans 9:13", "Jacob I loved"], ["LEV.22", "Leviticus 22:20-22", "No blemished offerings"], ["ROM.12", "Romans 12:1", "A living sacrifice"]],
  },
  2: {
    intro: "God warns the priests that He will curse their blessings, because they have turned from the path and caused many to stumble. A true priest's lips should keep knowledge, for he is the messenger of the LORD. Then God addresses marriage: men have married women who worship other gods, and have broken faith with the wives of their youth. \"I hate divorce,\" says the LORD. The people have wearied God by saying, \"Where is the God of justice?\"",
    v: [
      ["2:6", "True instruction was in his mouth", "The faithful priest Levi."],
      ["2:7", "The lips of a priest should preserve knowledge", "Teachers must know God's word."],
      ["2:10", "Do we not all have one father? Has not one God created us?", "Faithfulness to one another."],
      ["2:14", "She is your companion and your wife by covenant", "Marriage is a covenant before God."],
      ["2:16", "I hate divorce, says the LORD", "God guards the vulnerable spouse."],
      ["2:17", "Where is the God of justice?", "Doubting God's fairness."],
    ],
    w: [["בָּגַד", "bagad", "H898", "to deal treacherously, break faith", "Used five times in this chapter for betraying a trust, whether with God, a neighbor or a spouse.", ["halot", "verhoef"]]],
    refs: [["GEN.2", "Genesis 2:24", "The two become one flesh"], ["MAT.19", "Matthew 19:3-9", "Jesus on marriage"], ["JAS.3", "James 3:1", "Teachers judged more strictly"]],
  },
  3: {
    intro: "\"Behold, I am going to send My messenger, and he will clear the way before Me. And the Lord, whom you seek, will suddenly come to His temple.\" He will be like a refiner's fire and launderer's soap. \"I, the LORD, do not change.\" God calls, \"Return to Me, and I will return to you,\" and challenges them about tithes: \"Test Me now... if I will not open for you the windows of heaven.\" Those who fear the LORD speak to one another, and a book of remembrance is written; they will be His own possession.",
    v: [
      ["3:1", "I am going to send My messenger, and he will clear the way before Me", "Fulfilled in John the Baptist."],
      ["3:2", "He is like a refiner's fire", "God purifies His people."],
      ["3:6", "I, the LORD, do not change", "God's faithfulness is why they still exist."],
      ["3:7", "Return to Me, and I will return to you", "The door is still open."],
      ["3:10", "Test Me now in this... if I will not open for you the windows of heaven", "Trusting God with giving."],
      ["3:16", "A book of remembrance was written before Him", "God notices the faithful."],
    ],
    refs: [["MRK.1", "Mark 1:2", "The messenger fulfilled"], ["MAT.11", "Matthew 11:10", "Jesus on John the Baptist"], ["JAS.1", "James 1:17", "No variation or shifting shadow"], ["2CO.9", "2 Corinthians 9:6-8", "God loves a cheerful giver"]],
  },
  4: {
    intro: "The day is coming, burning like a furnace, when the arrogant will be like stubble. \"But for you who fear My name, the sun of righteousness will rise with healing in its wings; and you will go forth and skip about like calves from the stall.\" Remember the law of Moses. \"Behold, I am going to send you Elijah the prophet before the coming of the great and terrible day of the LORD. He will restore the hearts of the fathers to their children and the hearts of the children to their fathers.\" Then God is silent for about four hundred years, until an angel speaks to Zechariah in the temple.",
    v: [
      ["4:2", "The sun of righteousness will rise with healing in its wings", "Hope at sunrise."],
      ["4:2", "You will go forth and skip about like calves from the stall", "Pure joy."],
      ["4:4", "Remember the law of Moses My servant", "Hold on to God's word."],
      ["4:5", "I am going to send you Elijah the prophet", "Jesus said John came in this role."],
      ["4:6", "He will restore the hearts of the fathers to their children", "Families reconciled."],
    ],
    bg: [["Three chapters or four", "In Hebrew Bibles, chapter 4 is counted as part of chapter 3 (3:19-24). English Bibles, following the Greek and Latin, split it out.", "strong", ["verhoef"]]],
    refs: [["LUK.1", "Luke 1:17", "In the spirit and power of Elijah"], ["MAT.17", "Matthew 17:10-13", "Elijah has already come"], ["MAT.17", "Matthew 17:3", "Moses and Elijah at the Transfiguration"]],
  },
});
