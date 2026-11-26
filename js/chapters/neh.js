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
      ["1:4", "I sat down and wept and mourned for days", "When Nehemiah heard that Jerusalem's walls were broken down, he sat down and wept, mourned, fasted and prayed for days. The burden came before the building."],
      ["1:6", "I and my father's house have sinned", "Nehemiah confesses Israel's sins and includes himself: I and my father's family have sinned against You."],
      ["1:8-9", "Remember the word which You commanded Moses", "He prays God's own promises back to Him."],
      ["1:11", "I was the cupbearer to the king", "Nehemiah was cupbearer to King Artaxerxes, a trusted servant who tasted the king's wine and stood close to him."],
    ],
    bg: [["The cupbearer", "A royal cupbearer tasted the king's wine to guard against poison and often became a close adviser. Persian palace reliefs show such officials standing near the throne.", "good", ["fensham", "williamsonEN"]]],
    refs: [["DEU.30", "Deuteronomy 30:1-4", "If you return, I will gather you"], ["DAN.9", "Daniel 9", "Daniel's prayer of confession"]],
  },
  2: {
    intro: "Four months later the king notices Nehemiah's sad face and asks why. Nehemiah, very afraid, explains. When the king asks what he wants, Nehemiah prays silently and then asks to go rebuild the city. The king sends letters and an escort. In Jerusalem Nehemiah inspects the walls by night, then rallies the leaders: \"Let us arise and build.\" Sanballat, Tobiah and Geshem mock them.",
    v: [
      ["2:4", "So I prayed to the God of heaven", "When the king asked what he wanted, Nehemiah prayed silently to the God of heaven, then answered. A quick prayer in the moment."],
      ["2:8", "The good hand of my God was on me", "The king granted his requests for letters and timber, because the good hand of Nehemiah's God was on him."],
      ["2:17", "Come, let us rebuild the wall", "Nehemiah tells the leaders: you see the trouble we are in. Come, let us rebuild the wall. He puts himself in the work."],
      ["2:20", "The God of heaven will give us success", "When enemies mocked, Nehemiah answered: the God of heaven will give us success, and we His servants will build."],
    ],
    bg: [["Sanballat and Tobiah", "Papyrus letters from Elephantine in Egypt, written about 407 BC, mention \"Sanballat governor of Samaria\" and his sons. This confirms that Nehemiah's opponent was a real official.", "strong", ["kitchen", "williamsonEN"]]],
    refs: [["PRO.21", "Proverbs 21:1", "The king's heart is in the hand of the LORD"], ["PHP.4", "Philippians 4:6", "In everything by prayer"]],
  },
  3: {
    intro: "This chapter lists who built each section of the wall and each gate: priests, goldsmiths, perfume makers, rulers, merchants, and even daughters. Most build near their own homes. One group of nobles from Tekoa refuses to help. The work moves around the whole city from the Sheep Gate back to the Sheep Gate.",
    v: [
      ["3:1", "Eliashib the high priest arose with his brothers", "Eliashib the high priest and his fellow priests were the first to build, beginning at the Sheep Gate. The leaders worked first."],
      ["3:5", "Their nobles did not support the work", "The men of Tekoa worked hard, but their nobles would not put their shoulders to the work. Not everyone helps."],
      ["3:12", "He and his daughters", "Shallum, ruler of half of Jerusalem, repaired his section with the help of his daughters. Women built too."],
      ["3:28", "Each in front of his house", "The priests repaired the wall each in front of his own house. Everyone did the part nearest to them."],
    ],
    bg: [["Everyone on the wall", "Chapter 3 lists who rebuilt each section of Jerusalem's wall: priests, goldsmiths, perfumers, rulers and even daughters (3:12). Many worked on the part in front of their own homes. Archaeologists have uncovered the \"Broad Wall\" (3:8), a massive wall from Hezekiah's day.", "strong", ["williamsonEN", "kitchen"]]],
    refs: [["1CO.12", "1 Corinthians 12:12-27", "Many members, one body"], ["EPH.4", "Ephesians 4:16", "Each part working properly"]],
  },
  4: {
    intro: "Sanballat and Tobiah mock: \"If a fox should jump on it, he would break their stone wall down!\" The people keep building because \"the people had a mind to work.\" When enemies plot an attack, Nehemiah posts guards, prays, and reminds the people to remember the Lord. From then on half work and half stand guard; builders work with a tool in one hand and a weapon in the other.",
    v: [
      ["4:6", "The people had a mind to work", "The wall was built to half its height all the way around, because the people had a mind to work."],
      ["4:9", "We prayed to our God, and because of them we set up a guard", "When enemies plotted to attack, they prayed to God and posted a guard day and night. Prayer and wise action went together."],
      ["4:14", "Remember the Lord who is great and awesome", "Nehemiah told the frightened people: do not be afraid. Remember the Lord, great and awesome, and fight for your families and homes."],
      ["4:20", "Our God will fight for us", "Wherever you hear the trumpet, gather to us there. Our God will fight for us."],
    ],
    bg: [["Sanballat in history", "Sanballat led the opposition to the wall (4:1-8). Letters from the Jewish colony at Elephantine in Egypt, written in 407 BC, mention \"Sanballat, governor of Samaria\" and his sons. The builders worked with a tool in one hand and a weapon in the other (4:17).", "strong", ["williamsonEN", "kitchen"]]],
    refs: [["PSA.127", "Psalm 127:1", "Unless the LORD builds the house"], ["EPH.6", "Ephesians 6:10-18", "The armor of God"]],
  },
  5: {
    intro: "A crisis comes from inside. Poor families have mortgaged fields and sold children into slavery to buy grain and pay taxes, and wealthy Jews are charging interest. Nehemiah is very angry, rebukes the nobles, and makes them return the land and stop charging interest. As governor he refuses the food allowance due him, because the people's load is already heavy.",
    v: [
      ["5:6", "I was very angry", "Poor families were selling their children to pay debts to wealthy Jews. When Nehemiah heard their outcry, he was very angry."],
      ["5:9", "Should you not walk in the fear of our God?", "How believers treat the poor reflects on God."],
      ["5:15", "I did not do so because of the fear of God", "Earlier governors had burdened the people with taxes, but Nehemiah did not, because he feared God. He led by example."],
      ["5:19", "Remember me, O my God, for good", "Remember me with favor, my God, for all I have done for this people. Nehemiah prays this kind of short prayer often in his book."],
    ],
    bg: [["Debt and slavery", "In a time of famine, poor families had mortgaged their fields and sold their children into slavery to fellow Jews to pay the king's tax (5:1-5). Nehemiah made the nobles give back fields and stop charging interest, and he himself refused the governor's food allowance (5:14-18).", "good", ["williamsonEN", "kidner"]]],
    refs: [["LEV.25", "Leviticus 25:35-37", "Do not take interest from your brother"], ["JAS.5", "James 5:4", "Wages withheld cry out"]],
  },
  6: {
    intro: "Enemies try to trap Nehemiah. Four times they invite him to a meeting on the plain of Ono, and he answers, \"I am doing a great work and I cannot come down.\" Sanballat sends an open letter accusing him of rebellion. A hired prophet urges him to hide in the temple. Nehemiah refuses each trap, and the wall is finished in only fifty-two days. Even the enemies know this work was done with the help of God.",
    v: [
      ["6:3", "I am doing a great work and I cannot come down", "His enemies invited him to a meeting to harm him. Nehemiah answered: I am doing a great work and cannot come down."],
      ["6:9", "But now, O God, strengthen my hands", "They tried to frighten the builders, thinking their hands would weaken. Nehemiah prayed: but now, God, strengthen my hands."],
      ["6:11", "Should a man like me flee?", "He will not break God's law to save himself."],
      ["6:15-16", "In fifty-two days", "The enemies lost their confidence, for they saw this work was from God."],
    ],
    bg: [["Fifty-two days", "The wall was finished in just fifty-two days (6:15), and even Israel's enemies saw it was the work of God (6:16). Geshem the Arab, another opponent (6:1), is likely the same Geshem named as king of Kedar on a silver bowl found in Egypt.", "strong", ["williamsonEN", "kitchen"]]],
    refs: [["1CO.15", "1 Corinthians 15:58", "Be steadfast, immovable"], ["GAL.6", "Galatians 6:9", "Let us not lose heart in doing good"]],
  },
  7: {
    intro: "With the wall finished, Nehemiah appoints gatekeepers, singers and Levites, and puts his brother Hanani and Hananiah, \"a faithful man who feared God more than many,\" in charge. The city is large but has few people. Nehemiah finds the record of those who first returned and repeats the list found in Ezra 2.",
    v: [
      ["7:2", "A faithful man who feared God more than many", "Nehemiah put his brother Hanani and Hananiah in charge of Jerusalem, because Hananiah was faithful and feared God more than most. Character mattered most."],
      ["7:4", "The city was large and spacious, but the people in it were few", "The city was large and spacious, but there were few people and the houses had not been rebuilt. Walls alone do not make a city."],
      ["7:5", "My God put it into my heart", "My God put it into my heart to gather the people and register them by families. God guided the next step."],
    ],
    bg: [["Lists of names", "Nehemiah found the list of the first exiles who returned and copied it (7:5-73), nearly the same as Ezra 2. Such lists showed who belonged to Israel and which priests could serve. Every name mattered to God.", "good", ["williamsonEN", "fensham"]]],
    refs: [["EZR.2", "Ezra 2", "The same list"], ["1TI.3", "1 Timothy 3", "Qualifications for leaders"]],
  },
  8: {
    intro: "All the people gather as one at the Water Gate and ask Ezra to bring the book of the law. He reads from early morning until midday on a wooden platform, and the people stand and listen. Levites explain the meaning so the people understand. The people weep, but Nehemiah and Ezra say, \"Do not be grieved, for the joy of the LORD is your strength.\" They celebrate the Feast of Booths for the first time in centuries as it was meant to be kept.",
    v: [
      ["8:3", "All the people were attentive to the book of the law", "Ezra read the law aloud from early morning until noon, and all the people listened closely to the book of the law."],
      ["8:8", "Translating to give the sense", "They explained the meaning so the people could understand."],
      ["8:10", "The joy of the LORD is your strength", "The people were weeping as they heard the law. Nehemiah said: go and celebrate, share with those who have nothing, for the joy of the LORD is your strength."],
      ["8:17", "There was great rejoicing", "The people built shelters and kept the Feast of Booths as it had not been kept since Joshua's day, and there was very great joy."],
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
      ["9:21", "Forty years You provided for them", "In their prayer the people remember: for forty years You sustained them in the wilderness. They lacked nothing, their clothes did not wear out, and their feet did not swell."],
      ["9:33", "You have dealt faithfully, but we have acted wickedly", "In all that has happened to us You have been just. You acted faithfully, while we did wrong. Honest confession."],
    ],
    bg: [["A great prayer of confession", "The Levites led a long prayer retelling Israel's history from creation to exile, confessing sin and praising God's patience: \"You are a God of forgiveness, gracious and compassionate\" (9:17). It is one of the longest prayers in the Bible.", "good", ["williamsonEN", "kidner"]]],
    refs: [["EXO.34", "Exodus 34:6-7", "Compassionate and gracious"], ["PSA.106", "Psalm 106", "Israel's sin and God's mercy"], ["ACT.7", "Acts 7", "Stephen retells Israel's story"]],
  },
  10: {
    intro: "Nehemiah, the priests, Levites and leaders sign a sealed covenant, and all the people join it with an oath to walk in God's law. They promise specific things: not to marry those who worship other gods, to keep the Sabbath, to give a third of a shekel yearly for the temple, to bring wood, firstfruits, firstborn and tithes. \"We will not neglect the house of our God.\"",
    v: [
      ["10:29", "Taking on themselves a curse and an oath", "The people bound themselves with a curse and an oath to follow God's law given through Moses. It was a serious, public commitment."],
      ["10:31", "We will not buy on the Sabbath", "They promised not to buy from traders who brought goods on the Sabbath. Faith reached into everyday business."],
      ["10:39", "We will not neglect the house of our God", "The covenant ends with one summary promise: we will not neglect the house of our God."],
    ],
    bg: [["A signed promise", "The leaders, Levites and priests put their seals on a written agreement to keep God's law: not to marry those who worshiped other gods, to keep the Sabbath and the seventh year, and to support the temple (10:28-39). \"We will not neglect the house of our God.\"", "good", ["williamsonEN", "breneman"]]],
    refs: [["JOS.24", "Joshua 24:24-25", "Joshua's covenant"], ["MAL.3", "Malachi 3:8-10", "Bring the whole tithe"]],
  },
  11: {
    intro: "Jerusalem needs more people. The leaders live there, and the rest of the people cast lots so that one in ten moves into the city. The people bless everyone who volunteers. The chapter lists the families who lived in Jerusalem and the towns where others settled.",
    v: [
      ["11:1", "The holy city", "Jerusalem is called holy because God's house is there."],
      ["11:2", "The people blessed all the men who volunteered", "Living in Jerusalem was a sacrifice, so the people blessed all those who volunteered to move there."],
      ["11:17", "The leader in beginning the thanksgiving at prayer", "Mattaniah led the temple songs of thanks."],
      ["11:23", "A commandment from the king concerning them", "The Persian king himself supported the singers' daily needs."],
    ],
    bg: [["An empty city", "Jerusalem's walls were rebuilt, but few people lived inside and the houses were not yet built (7:4). Living in the city meant leaving farms and family land and being first in danger. So one family in ten was chosen by lot to move, a kind of tithe of the people.", "good", ["kidner", "williamsonEN"]]],
    refs: [["NEH.7", "Nehemiah 7:4", "The city was large, the people few"], ["PSA.122", "Psalm 122:6", "Pray for the peace of Jerusalem"], ["REV.21", "Revelation 21:2", "The holy city, new Jerusalem"]],
  },
  12: {
    intro: "Lists of priests and Levites lead into the dedication of the wall. Two great choirs with instruments walk on top of the wall in opposite directions and meet at the temple. They offer sacrifices and rejoice, \"so that the joy of Jerusalem was heard from afar.\" Men are appointed to care for the storerooms.",
    v: [
      ["12:27", "To celebrate the dedication with gladness", "For the dedication of the wall, the Levites were brought to Jerusalem to celebrate with thanksgiving and singing, with cymbals, harps and lyres."],
      ["12:31", "Two great choirs", "Music and procession on the wall itself."],
      ["12:43", "The joy of Jerusalem was heard from afar", "They offered great sacrifices and rejoiced, because God had given them great joy. Women and children rejoiced too, and the sound was heard far away."],
    ],
    bg: [["Two choirs on the wall", "At the dedication of the wall, Nehemiah set two great choirs walking on top of it in opposite directions until they met at the temple. \"The joy of Jerusalem was heard from afar\" (12:43).", "good", ["williamsonEN", "kidner"]]],
    refs: [["PSA.48", "Psalm 48:12-14", "Walk about Zion, go around her"], ["PSA.147", "Psalm 147:2", "The LORD builds up Jerusalem"]],
  },
  13: {
    intro: "After returning to the king for a time, Nehemiah comes back to find the covenant broken. The priest Eliashib has given Tobiah a room in the temple; Levites have not been paid; merchants sell on the Sabbath; and men have married women from Ashdod, Ammon and Moab. Nehemiah throws out Tobiah's furniture, restores the tithes, shuts the gates on the Sabbath, and rebukes the men. He prays, \"Remember me, O my God, for good.\"",
    v: [
      ["13:8", "I threw all of Tobiah's household goods out", "The high priest had given Nehemiah's enemy Tobiah a room in the temple. Nehemiah threw all his belongings out and had the rooms cleansed."],
      ["13:11", "Why is the house of God forsaken?", "The same promise from 10:39, now broken."],
      ["13:26", "Did not Solomon sin regarding these things?", "Nehemiah warns against marrying foreign wives who worship other gods: was it not because of such marriages that even Solomon sinned?"],
      ["13:31", "Remember me, O my God, for good", "The book's last words are a prayer: remember me, my God, for good."],
    ],
    why: "The book ends not in triumph but with the people falling back into the same sins. Scholars discuss what the ending is meant to teach.",
    views: [
      ["Reform must keep going", "Many read the ending as a realistic picture: renewal is not a one-time event, and faithful leaders must keep calling God's people back.", ["kidner", "breneman"]],
      ["Pointing beyond itself", "Others see the unfinished ending as showing that walls and laws alone cannot change hearts, preparing for the new covenant promised by the prophets.", ["williamsonEN", "fensham"]],
    ],
    common: "Both readings agree that Nehemiah's faithfulness is an example and that true change needs God's work in the heart.",
    bg: [["Back to old ways", "When Nehemiah returned after a time away, he found Tobiah, an enemy, living in a temple storeroom, the Levites unpaid, and merchants selling on the Sabbath. He threw out Tobiah's things and shut the city gates on the Sabbath (13:8, 19). Reform needs to be kept up.", "good", ["williamsonEN", "fensham"]]],
    refs: [["MAL.2", "Malachi 2:10-16", "Malachi addresses the same sins"], ["JHN.2", "John 2:13-17", "Jesus clears the temple"], ["JER.31", "Jeremiah 31:33", "I will write My law on their hearts"]],
  },
});
