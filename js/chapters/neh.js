// Nehemiah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  fensham: "F. Charles Fensham, The Books of Ezra and Nehemiah, New International Commentary on the Old Testament (Eerdmans, 1982).",
  williamsonEN: "H. G. M. Williamson, Ezra, Nehemiah, Word Biblical Commentary 16 (Word, 1985).",
  kidner: "Derek Kidner, Ezra and Nehemiah, Tyndale Old Testament Commentaries (InterVarsity Press, 1979).",
  breneman: "Mervin Breneman, Ezra, Nehemiah, Esther, New American Commentary 10 (Broadman & Holman, 1993).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["kidner", "williamsonEN"] }, {
  1: {
    intro: "Nehemiah, cupbearer to King Artaxerxes in the Persian palace at Susa, hears that Jerusalem's wall is broken down and its gates burned. He sits down and weeps, mourns and fasts for days. He prays, confessing Israel's sins, reminding God of His promise to gather His people, and asking for favor with the king.",
    v: [
      ["1:4", "I sat down and wept and mourned for days", "Burden comes before building."],
      ["1:6", "I and my father's house have sinned", "Nehemiah includes himself."],
      ["1:8-9", "Remember the word which You commanded Moses", "He prays God's own promises back to Him."],
      ["1:11", "I was the cupbearer to the king", "A trusted position close to the king."],
    ],
    bg: [["The cupbearer", "A royal cupbearer tasted the king's wine to guard against poison and often became a close adviser. Persian palace reliefs show such officials standing near the throne.", "good", ["fensham", "williamsonEN"]]],
    refs: [["DEU.30", "Deuteronomy 30:1-4", "If you return, I will gather you"], ["DAN.9", "Daniel 9", "Daniel's prayer of confession"]],
  },
  2: {
    intro: "Four months later the king notices Nehemiah's sad face and asks why. Nehemiah, very afraid, explains. When the king asks what he wants, Nehemiah prays silently and then asks to go rebuild the city. The king sends letters and an escort. In Jerusalem Nehemiah inspects the walls by night, then rallies the leaders: \"Let us arise and build.\" Sanballat, Tobiah and Geshem mock them.",
    v: [
      ["2:4", "So I prayed to the God of heaven", "A quick prayer in the moment."],
      ["2:8", "The good hand of my God was on me", "Nehemiah credits God."],
      ["2:17", "Come, let us rebuild the wall", "He includes himself in the work."],
      ["2:20", "The God of heaven will give us success", "Faith answers mockery."],
    ],
    bg: [["Sanballat and Tobiah", "Papyrus letters from Elephantine in Egypt, written about 407 BC, mention \"Sanballat governor of Samaria\" and his sons. This confirms that Nehemiah's opponent was a real official.", "strong", ["kitchen", "williamsonEN"]]],
    refs: [["PRO.21", "Proverbs 21:1", "The king's heart is in the hand of the LORD"], ["PHP.4", "Philippians 4:6", "In everything by prayer"]],
  },
  3: {
    intro: "This chapter lists who built each section of the wall and each gate: priests, goldsmiths, perfume makers, rulers, merchants, and even daughters. Most build near their own homes. One group of nobles from Tekoa refuses to help. The work moves around the whole city from the Sheep Gate back to the Sheep Gate.",
    v: [
      ["3:1", "Eliashib the high priest arose with his brothers", "The leaders work first."],
      ["3:5", "Their nobles did not support the work", "Not everyone helps."],
      ["3:12", "He and his daughters", "Women build too."],
      ["3:28", "Each in front of his house", "Each one did the part nearest to them."],
    ],
    refs: [["1CO.12", "1 Corinthians 12:12-27", "Many members, one body"], ["EPH.4", "Ephesians 4:16", "Each part working properly"]],
  },
  4: {
    intro: "Sanballat and Tobiah mock: \"If a fox should jump on it, he would break their stone wall down!\" The people keep building because \"the people had a mind to work.\" When enemies plot an attack, Nehemiah posts guards, prays, and reminds the people to remember the Lord. From then on half work and half stand guard; builders work with a tool in one hand and a weapon in the other.",
    v: [
      ["4:6", "The people had a mind to work", "Wholehearted effort."],
      ["4:9", "We prayed to our God, and because of them we set up a guard", "Prayer and wise action together."],
      ["4:14", "Remember the Lord who is great and awesome", "Fear answered by remembering God."],
      ["4:20", "Our God will fight for us", "Confidence in God."],
    ],
    refs: [["PSA.127", "Psalm 127:1", "Unless the LORD builds the house"], ["EPH.6", "Ephesians 6:10-18", "The armor of God"]],
  },
  5: {
    intro: "A crisis comes from inside. Poor families have mortgaged fields and sold children into slavery to buy grain and pay taxes, and wealthy Jews are charging interest. Nehemiah is very angry, rebukes the nobles, and makes them return the land and stop charging interest. As governor he refuses the food allowance due him, because the people's load is already heavy.",
    v: [
      ["5:6", "I was very angry", "Righteous anger at injustice."],
      ["5:9", "Should you not walk in the fear of our God?", "How believers treat the poor reflects on God."],
      ["5:15", "I did not do so because of the fear of God", "Nehemiah leads by example."],
      ["5:19", "Remember me, O my God, for good", "A prayer repeated through the book."],
    ],
    refs: [["LEV.25", "Leviticus 25:35-37", "Do not take interest from your brother"], ["JAS.5", "James 5:4", "Wages withheld cry out"]],
  },
  6: {
    intro: "Enemies try to trap Nehemiah. Four times they invite him to a meeting on the plain of Ono, and he answers, \"I am doing a great work and I cannot come down.\" Sanballat sends an open letter accusing him of rebellion. A hired prophet urges him to hide in the temple. Nehemiah refuses each trap, and the wall is finished in only fifty-two days. Even the enemies know this work was done with the help of God.",
    v: [
      ["6:3", "I am doing a great work and I cannot come down", "Staying focused on God's work."],
      ["6:9", "But now, O God, strengthen my hands", "A short prayer under pressure."],
      ["6:11", "Should a man like me flee?", "He will not break God's law to save himself."],
      ["6:15-16", "In fifty-two days", "The enemies lost their confidence, for they saw this work was from God."],
    ],
    refs: [["1CO.15", "1 Corinthians 15:58", "Be steadfast, immovable"], ["GAL.6", "Galatians 6:9", "Let us not lose heart in doing good"]],
  },
  7: {
    intro: "With the wall finished, Nehemiah appoints gatekeepers, singers and Levites, and puts his brother Hanani and Hananiah, \"a faithful man who feared God more than many,\" in charge. The city is large but has few people. Nehemiah finds the record of those who first returned and repeats the list found in Ezra 2.",
    v: [
      ["7:2", "A faithful man who feared God more than many", "Character is the chief qualification."],
      ["7:4", "The city was large and spacious, but the people in it were few", "Walls alone do not make a city."],
      ["7:5", "My God put it into my heart", "God guides his next step."],
    ],
    refs: [["EZR.2", "Ezra 2", "The same list"], ["1TI.3", "1 Timothy 3", "Qualifications for leaders"]],
  },
  8: {
    intro: "All the people gather as one at the Water Gate and ask Ezra to bring the book of the law. He reads from early morning until midday on a wooden platform, and the people stand and listen. Levites explain the meaning so the people understand. The people weep, but Nehemiah and Ezra say, \"Do not be grieved, for the joy of the LORD is your strength.\" They celebrate the Feast of Booths for the first time in centuries as it was meant to be kept.",
    v: [
      ["8:3", "All the people were attentive to the book of the law", "Hungry for God's word."],
      ["8:8", "Translating to give the sense", "They explained the meaning so the people could understand."],
      ["8:10", "The joy of the LORD is your strength", "Grace leads to joy."],
      ["8:17", "There was great rejoicing", "Obedience brings gladness."],
    ],
    bg: [["Explaining the reading", "Many in Jerusalem now spoke Aramaic. The Levites probably translated and explained the Hebrew text, an early form of what later became Aramaic paraphrases called Targums, and of expository preaching.", "good", ["williamsonEN", "fensham"]]],
    w: [["מְפֹרָשׁ", "mephorash", "H6567", "clearly, with interpretation", "From a verb meaning to make distinct or explain. It describes reading God's law so that its meaning is clear.", ["halot", "williamsonEN"]]],
    refs: [["LEV.23", "Leviticus 23:33-43", "The Feast of Booths"], ["LUK.24", "Luke 24:27", "He explained the Scriptures to them"], ["PSA.19", "Psalm 19:8", "Rejoicing the heart"]],
  },
  9: {
    intro: "Later that month the people fast, wear sackcloth, separate themselves and confess their sins. The Levites lead a long prayer that retells Israel's story from creation and Abraham through the exodus, the wilderness, the land, and the exile. Again and again Israel sinned, and again and again God was gracious. They end by making a written covenant.",
    v: [
      ["9:6", "You alone are the LORD", "The prayer begins with God, not with Israel."],
      ["9:17", "A God of forgiveness, gracious and compassionate", "Quoting God's self-description from Exodus 34:6."],
      ["9:21", "Forty years You provided for them", "Their clothes did not wear out."],
      ["9:33", "You have dealt faithfully, but we have acted wickedly", "Honest confession."],
    ],
    refs: [["EXO.34", "Exodus 34:6-7", "Compassionate and gracious"], ["PSA.106", "Psalm 106", "Israel's sin and God's mercy"], ["ACT.7", "Acts 7", "Stephen retells Israel's story"]],
  },
  10: {
    intro: "Nehemiah, the priests, Levites and leaders sign a sealed covenant, and all the people join it with an oath to walk in God's law. They promise specific things: not to marry those who worship other gods, to keep the Sabbath, to give a third of a shekel yearly for the temple, to bring wood, firstfruits, firstborn and tithes. \"We will not neglect the house of our God.\"",
    v: [
      ["10:29", "Taking on themselves a curse and an oath", "A serious, public commitment."],
      ["10:31", "We will not buy on the Sabbath", "Faith in everyday business."],
      ["10:39", "We will not neglect the house of our God", "The covenant's summary."],
    ],
    refs: [["JOS.24", "Joshua 24:24-25", "Joshua's covenant"], ["MAL.3", "Malachi 3:8-10", "Bring the whole tithe"]],
  },
  11: {
    intro: "Jerusalem needs more people. The leaders live there, and the rest of the people cast lots so that one in ten moves into the city. The people bless everyone who volunteers. The chapter lists the families who lived in Jerusalem and the towns where others settled.",
    v: [
      ["11:1", "The holy city", "Jerusalem is called holy because God's house is there."],
      ["11:2", "The people blessed all the men who volunteered", "Moving was a sacrifice."],
    ],
    refs: [["PSA.122", "Psalm 122:6", "Pray for the peace of Jerusalem"], ["REV.21", "Revelation 21:2", "The holy city, new Jerusalem"]],
  },
  12: {
    intro: "Lists of priests and Levites lead into the dedication of the wall. Two great choirs with instruments walk on top of the wall in opposite directions and meet at the temple. They offer sacrifices and rejoice, \"so that the joy of Jerusalem was heard from afar.\" Men are appointed to care for the storerooms.",
    v: [
      ["12:27", "To celebrate the dedication with gladness", "Hard work ends in worship."],
      ["12:31", "Two great choirs", "Music and procession on the wall itself."],
      ["12:43", "The joy of Jerusalem was heard from afar", "Women and children rejoiced too."],
    ],
    refs: [["PSA.48", "Psalm 48:12-14", "Walk about Zion, go around her"], ["PSA.147", "Psalm 147:2", "The LORD builds up Jerusalem"]],
  },
  13: {
    intro: "After returning to the king for a time, Nehemiah comes back to find the covenant broken. The priest Eliashib has given Tobiah a room in the temple; Levites have not been paid; merchants sell on the Sabbath; and men have married women from Ashdod, Ammon and Moab. Nehemiah throws out Tobiah's furniture, restores the tithes, shuts the gates on the Sabbath, and rebukes the men. He prays, \"Remember me, O my God, for good.\"",
    v: [
      ["13:8", "I threw all of Tobiah's household goods out", "Like Jesus clearing the temple."],
      ["13:11", "Why is the house of God forsaken?", "The same promise from 10:39, now broken."],
      ["13:26", "Did not Solomon sin regarding these things?", "A lesson from history."],
      ["13:31", "Remember me, O my God, for good", "The book's last words are a prayer."],
    ],
    why: "The book ends not in triumph but with the people falling back into the same sins. Scholars discuss what the ending is meant to teach.",
    views: [
      ["Reform must keep going", "Many read the ending as a realistic picture: renewal is not a one-time event, and faithful leaders must keep calling God's people back.", ["kidner", "breneman"]],
      ["Pointing beyond itself", "Others see the unfinished ending as showing that walls and laws alone cannot change hearts, preparing for the new covenant promised by the prophets.", ["williamsonEN", "fensham"]],
    ],
    common: "Both readings agree that Nehemiah's faithfulness is an example and that true change needs God's work in the heart.",
    refs: [["MAL.2", "Malachi 2:10-16", "Malachi addresses the same sins"], ["JHN.2", "John 2:13-17", "Jesus clears the temple"], ["JER.31", "Jeremiah 31:33", "I will write My law on their hearts"]],
  },
});
