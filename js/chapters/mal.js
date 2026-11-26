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
      ["1:2", "\"I have loved you,\" says the LORD. But you say, \"How have You loved us?\"", "Malachi, the last book of the Old Testament, opens with God's love. But the people answer with doubt: how have You loved us?"],
      ["1:6", "A son honors his father... where is My honor?", "A son honors his father and a servant his master. If God is a Father and Master, God asks, where is the honor due Him?"],
      ["1:8", "Why not offer it to your governor?", "The priests offered blind, lame and sick animals. Try giving that to your governor, God says. They were giving God their leftovers."],
      ["1:11", "My name will be great among the nations", "From sunrise to sunset, God's name will be great among the nations, and pure offerings will be brought to Him everywhere."],
      ["1:13", "My, how tiresome it is!", "The priests sniffed at their duties and said, What a burden! They had grown bored with worshiping God."],
    ],
    bg: [["The dispute style", "Malachi uses a pattern of statement, question and answer: God says something, the people object, and God explains. Scholars count six such exchanges in the book.", "strong", ["verhoef", "baldwin"]]],
    refs: [["ROM.9", "Romans 9:13", "Jacob I loved"], ["LEV.22", "Leviticus 22:20-22", "No blemished offerings"], ["ROM.12", "Romans 12:1", "A living sacrifice"]],
  },
  2: {
    intro: "God warns the priests that He will curse their blessings, because they have turned from the path and caused many to stumble. A true priest's lips should keep knowledge, for he is the messenger of the LORD. Then God addresses marriage: men have married women who worship other gods, and have broken faith with the wives of their youth. \"I hate divorce,\" says the LORD. The people have wearied God by saying, \"Where is the God of justice?\"",
    v: [
      ["2:6", "True instruction was in his mouth", "God recalls the faithful priests of old: true teaching was in their mouths, they walked with Him in peace, and turned many from sin."],
      ["2:7", "The lips of a priest should preserve knowledge", "A priest's lips should guard knowledge, and people should seek instruction from him, for he is the LORD's messenger."],
      ["2:10", "Do we not all have one father? Has not one God created us?", "We all have one Father and one God created us. So why are we unfaithful to one another?"],
      ["2:14", "She is your companion and your wife by covenant", "The LORD was witness between a man and the wife of his youth. She is his partner, his wife by covenant."],
      ["2:16", "I hate divorce, says the LORD", "The Hebrew is hard to translate; many versions read \"I hate divorce.\" Either way, God condemns treachery against a faithful wife and calls husbands to guard their hearts."],
      ["2:17", "Where is the God of justice?", "The people wearied God by saying that evildoers please Him, or asking: where is the God of justice?"],
    ],
    w: [["בָּגַד", "bagad", "H898", "to deal treacherously, break faith", "Used five times in this chapter for betraying a trust, whether with God, a neighbor or a spouse.", ["halot", "verhoef"]]],
    refs: [["GEN.2", "Genesis 2:24", "The two become one flesh"], ["MAT.19", "Matthew 19:3-9", "Jesus on marriage"], ["JAS.3", "James 3:1", "Teachers judged more strictly"]],
  },
  3: {
    intro: "\"Behold, I am going to send My messenger, and he will clear the way before Me. And the Lord, whom you seek, will suddenly come to His temple.\" He will be like a refiner's fire and launderer's soap. \"I, the LORD, do not change.\" God calls, \"Return to Me, and I will return to you,\" and challenges them about tithes: \"Test Me now... if I will not open for you the windows of heaven.\" Those who fear the LORD speak to one another, and a book of remembrance is written; they will be His own possession.",
    v: [
      ["3:1", "I am going to send My messenger, and he will clear the way before Me", "God will send His messenger to prepare the way, and then the Lord will suddenly come to His temple. The Gospels see John the Baptist as this messenger (Mark 1:2)."],
      ["3:2", "He is like a refiner's fire", "Who can stand when He appears? He is like a refiner's fire and a launderer's soap, purifying His people."],
      ["3:6", "I, the LORD, do not change", "God's faithfulness is why they still exist."],
      ["3:7", "Return to Me, and I will return to you", "Since the days of your ancestors you have turned away. Return to Me, God says, and I will return to you."],
      ["3:10", "Test Me now in this... if I will not open for you the windows of heaven", "God invites the people to bring the full tithe to the storehouse and see if He will not pour out blessing. Trust Him with your giving."],
      ["3:16", "A book of remembrance was written before Him", "Those who feared the LORD talked with each other, and the LORD listened. A book of remembrance was written of those who honored His name."],
    ],
    bg: [["\"I am sending My messenger\"", "\"Behold, I am going to send My messenger, and he will clear the way before Me\" (3:1). Mark's Gospel opens with this verse about John the Baptist (Mark 1:2). Malachi's own name means \"my messenger.\"", "strong", ["verhoef", "baldwin"]]],
    w: [["מַלְאָךְ", "mal'ak", "H4397", "messenger, angel", "The same word means a human messenger or an angel, depending on the context.", ["halot", "smithR"]]],
    refs: [["MRK.1", "Mark 1:2", "The messenger fulfilled"], ["MAT.11", "Matthew 11:10", "Jesus on John the Baptist"], ["JAS.1", "James 1:17", "No variation or shifting shadow"], ["2CO.9", "2 Corinthians 9:6-8", "God loves a cheerful giver"]],
  },
  4: {
    intro: "The day is coming, burning like a furnace, when the arrogant will be like stubble. \"But for you who fear My name, the sun of righteousness will rise with healing in its wings; and you will go forth and skip about like calves from the stall.\" Remember the law of Moses. \"Behold, I am going to send you Elijah the prophet before the coming of the great and terrible day of the LORD. He will restore the hearts of the fathers to their children and the hearts of the children to their fathers.\" Then God is silent for about four hundred years, until an angel speaks to Zechariah in the temple.",
    v: [
      ["4:2", "The sun of righteousness will rise with healing in its wings", "For those who honor God's name, the sun of righteousness will rise with healing in its rays, like the warmth of dawn."],
      ["4:2", "You will go forth and skip about like calves from the stall", "They will go out leaping for joy like calves let out of the stall."],
      ["4:4", "Remember the law of Moses My servant", "Near the end of the Old Testament, God says: remember the law of Moses, which I gave at Sinai."],
      ["4:5", "I am going to send you Elijah the prophet", "God will send Elijah before the great day of the LORD. Jesus said John the Baptist came in the spirit of Elijah (Matthew 11:14; 17:12)."],
      ["4:6", "He will restore the hearts of the fathers to their children", "He will turn the hearts of parents to their children and children to their parents. The Old Testament ends with a promise of families restored."],
    ],
    bg: [["Three chapters or four", "In Hebrew Bibles, chapter 4 is counted as part of chapter 3 (3:19-24). English Bibles, following the Greek and Latin, split it out.", "strong", ["verhoef"]]],
    refs: [["LUK.1", "Luke 1:17", "In the spirit and power of Elijah"], ["MAT.17", "Matthew 17:10-13", "Elijah has already come"], ["MAT.17", "Matthew 17:3", "Moses and Elijah at the Transfiguration"]],
  },
});
