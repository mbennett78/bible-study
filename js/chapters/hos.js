// Hosea chapter notes.
import { makeBook } from "./make.js";

const sources = {
  stuartM: "Douglas Stuart, Hosea-Jonah, Word Biblical Commentary 31 (Word, 1987).",
  smithB: "Billy K. Smith and Frank S. Page, Amos, Obadiah, Jonah, New American Commentary 19B (Broadman & Holman, 1995).",
  garrettH: "Duane A. Garrett, Hosea, Joel, New American Commentary 19A (Broadman & Holman, 1997).",
  hubbardD: "David A. Hubbard, Hosea and Joel and Amos, Tyndale Old Testament Commentaries (InterVarsity Press, 1989).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["garrettH", "stuartM"] }, {
  1: {
    intro: "In the days of King Jeroboam II of Israel (about 750 BC), God tells Hosea to marry Gomer, who will be unfaithful, as a picture of Israel's unfaithfulness to God. Their children's names are messages: Jezreel (judgment is coming), Lo-ruhamah (\"no compassion\") and Lo-ammi (\"not My people\"). Yet God promises a day when they will be called \"sons of the living God.\"",
    v: [
      ["1:2", "Take to yourself a wife of harlotry", "Hosea's marriage mirrors God's relationship with Israel."],
      ["1:9", "You are not My people", "Hosea's third child is named Lo-ammi, \"not My people.\" Israel's unfaithfulness had broken the covenant."],
      ["1:10", "Sons of the living God", "Yet in the very place they were called \"not My people,\" they will be called children of the living God. Paul quotes this in Romans 9:26."],
    ],
    why: "Scholars discuss what Hosea's marriage to Gomer was like.",
    views: [
      ["A real marriage", "Most read it as Hosea's actual marriage: either Gomer was already immoral, or (as many think) she became unfaithful later, and \"wife of harlotry\" describes how it would turn out.", ["garrettH", "stuartM", "hubbardD"]],
      ["A vision or acted parable", "Some older interpreters thought the marriage happened only in a vision, finding it hard to believe God would command it.", ["hubbardD"]],
    ],
    common: "All agree the main point is God's faithful, suffering love for an unfaithful people.",
    refs: [["ROM.9", "Romans 9:25-26", "Not My people, now My people"], ["1PE.2", "1 Peter 2:10", "Once not a people, now God's people"], ["2KI.14", "2 Kings 14:23-29", "Jeroboam II"]],
  },
  2: {
    intro: "God speaks of Israel as an unfaithful wife who chased lovers (Baal) and did not know that it was God who gave her grain, wine and oil. He will hedge up her way. Then: \"I will allure her, bring her into the wilderness and speak kindly to her.\" She will call Him \"my Husband,\" no longer \"my Baal.\" \"I will betroth you to Me forever... in righteousness and in justice, in lovingkindness and in compassion... in faithfulness. Then you will know the LORD.\"",
    v: [
      ["2:8", "She does not know that it was I who gave her the grain", "Israel did not realize that it was the LORD, not the god Baal, who gave her grain, wine, oil and silver. She forgot the Giver."],
      ["2:14", "I will allure her... and speak kindly to her", "Instead of giving up, God will lead His unfaithful people into the wilderness and speak tenderly to them, as when He first loved them."],
      ["2:15", "The valley of Achor as a door of hope", "Achor, \"trouble,\" was where Achan's sin brought disaster (Joshua 7). God will turn the Valley of Trouble into a door of hope."],
      ["2:19-20", "I will betroth you to Me forever", "God will betroth His people to Himself forever, in righteousness, justice, steadfast love, mercy and faithfulness. Then they will know the LORD."],
      ["2:23", "You are My people!", "God reverses the children's names: to Lo-ammi, \"not My people,\" He will say, You are My people, and they will say, You are my God."],
    ],
    refs: [["JOS.7", "Joshua 7:26", "The valley of Achor"], ["EPH.5", "Ephesians 5:25-27", "Christ and His bride"], ["JER.2", "Jeremiah 2:2", "The devotion of your youth"]],
  },
  3: {
    intro: "God tells Hosea, \"Go again, love a woman who is loved by her husband, yet an adulteress, even as the LORD loves the sons of Israel.\" Hosea buys her back for fifteen shekels of silver and some barley. Israel will live many days without king or sacrifice, \"afterward the sons of Israel will return and seek the LORD their God and David their king.\"",
    v: [
      ["3:1", "Go again, love a woman", "God tells Hosea to go again and love his unfaithful wife, as the LORD loves Israel though they turn to other gods."],
      ["3:2", "So I bought her for myself", "Hosea pays silver and barley to buy her back. Redeeming love costs something."],
      ["3:5", "They will come trembling to the LORD and to His goodness", "Afterward Israel will return, seek the LORD and David their king, and come trembling to the LORD and His goodness in the last days."],
    ],
    refs: [["ROM.5", "Romans 5:8", "While we were yet sinners"], ["1CO.6", "1 Corinthians 6:20", "Bought with a price"], ["LUK.15", "Luke 15:20-24", "The father welcomes the son"]],
  },
  4: {
    intro: "God brings a case against Israel: \"There is no faithfulness or kindness or knowledge of God in the land.\" Swearing, lying, murder, stealing and adultery spread. \"My people are destroyed for lack of knowledge.\" The priests have forgotten God's law, and the people consult wooden idols.",
    v: [
      ["4:1", "No knowledge of God in the land", "The LORD brings a charge against Israel: there is no faithfulness, no love and no knowledge of God in the land. Every other sin follows (4:2)."],
      ["4:6", "My people are destroyed for lack of knowledge", "My people are destroyed for lack of knowledge. The priests rejected God's teaching, and the people perished for not knowing Him."],
      ["4:9", "Like people, like priest", "Like people, like priest. Those who should have led the people to God sinned just as they did, and both will answer for it."],
    ],
    w: [["דַּעַת", "da'at", "H1847", "knowledge", "In Hosea, \"knowledge of God\" is more than facts: it means a close, faithful relationship, like the knowing of husband and wife.", ["halot", "garrettH"]]],
    refs: [["JER.9", "Jeremiah 9:24", "Boast that he knows Me"], ["JHN.17", "John 17:3", "Eternal life is knowing God"]],
  },
  5: {
    intro: "Priests, Israel and the royal house are all judged. Their deeds will not let them return to God. When Ephraim saw his sickness, he went to Assyria for help, but it could not heal him. God says, \"I will go away and return to My place until they acknowledge their guilt and seek My face; in their affliction they will earnestly seek Me.\"",
    v: [
      ["5:4", "Their deeds will not allow them to return", "Their deeds will not let them return to God. A spirit of unfaithfulness has taken hold, and they do not know the LORD."],
      ["5:13", "Ephraim went to Assyria", "When Israel saw its sickness, it went to Assyria for help. But the king of Assyria could not cure them."],
      ["5:15", "In their affliction they will earnestly seek Me", "God will withdraw until they admit their guilt and seek His face. In their distress they will look for Him."],
    ],
    refs: [["2KI.15", "2 Kings 15:19-20", "Menahem pays Assyria"], ["PSA.119", "Psalm 119:67", "Before I was afflicted I went astray"]],
  },
  6: {
    intro: "\"Come, let us return to the LORD. For He has torn us, but He will heal us... He will revive us after two days; He will raise us up on the third day.\" But their loyalty is like a morning cloud that vanishes. \"I delight in loyalty rather than sacrifice, and in the knowledge of God rather than burnt offerings.\"",
    v: [
      ["6:1", "Come, let us return to the LORD", "Come, let us return to the LORD. He has torn us, but He will heal us; He has wounded us, but He will bind us up."],
      ["6:2", "He will raise us up on the third day", "Many Christians hear an echo of the resurrection."],
      ["6:3", "Let us press on to know the LORD", "Let us press on to know the LORD. He will come as surely as the dawn, like spring rains that water the earth."],
      ["6:6", "I delight in loyalty rather than sacrifice", "God wants steadfast love more than sacrifice, and knowing Him more than burnt offerings. Jesus quoted this twice (Matthew 9:13; 12:7)."],
    ],
    refs: [["MAT.9", "Matthew 9:13", "I desire compassion, not sacrifice"], ["MAT.12", "Matthew 12:7", "Jesus quotes Hosea 6:6"], ["1CO.15", "1 Corinthians 15:4", "Raised on the third day"]],
  },
  7: {
    intro: "Israel's sins are like a baker's oven, burning all night. \"Ephraim is a cake not turned,\" burned on one side and raw on the other. Ephraim is like a silly dove, flying to Egypt and Assyria instead of to God. \"They do not cry to Me from their heart.\"",
    v: [
      ["7:8", "A cake not turned", "Ephraim is like a flat cake not turned over, burned on one side and raw on the other. Its faith is half-hearted."],
      ["7:11", "Like a silly dove, without sense", "Israel is like a silly dove, flying to Egypt and then to Assyria for help, but never to God."],
      ["7:14", "They do not cry to Me from their heart", "They wail on their beds for grain and wine, but they do not cry out to God from their hearts."],
    ],
    refs: [["REV.3", "Revelation 3:15-16", "Neither hot nor cold"], ["ISA.31", "Isaiah 31:1", "Woe to those who go to Egypt"]],
  },
  8: {
    intro: "Sound the alarm! Israel made kings without God's approval and idols from silver and gold, including the calf of Samaria. \"They sow the wind and they reap the whirlwind.\" They forgot their Maker and built palaces.",
    v: [
      ["8:4", "They have set up kings, but not by Me", "Leaders chosen without God."],
      ["8:7", "They sow the wind and they reap the whirlwind", "Small sins bring great harvests."],
      ["8:14", "Israel has forgotten his Maker", "The root problem."],
    ],
    refs: [["GAL.6", "Galatians 6:7", "Whatever a man sows"], ["1KI.12", "1 Kings 12:28", "Jeroboam's calves"]],
  },
  9: {
    intro: "Israel's festivals will end; the people will return to Egypt in spirit and eat unclean food in Assyria. \"The days of punishment have come.\" The prophet is called a fool. Israel was once like grapes in the wilderness to God, but they turned to Baal.",
    v: [
      ["9:7", "The prophet is a fool", "The messenger rejected."],
      ["9:10", "Like grapes in the wilderness", "God's delight in early Israel."],
      ["9:17", "They will be wanderers among the nations", "Exile ahead."],
    ],
    refs: [["NUM.25", "Numbers 25", "Baal-peor"], ["2KI.17", "2 Kings 17:6", "Israel exiled to Assyria"]],
  },
  10: {
    intro: "Israel is a luxuriant vine: the more fruit, the more altars it built. Its heart is divided. \"Sow with a view to righteousness, reap in accordance with kindness; break up your fallow ground, for it is time to seek the LORD until He comes to rain righteousness on you.\"",
    v: [
      ["10:2", "Their heart is faithless", "A divided heart."],
      ["10:8", "They will say to the mountains, Cover us!", "Jesus and Revelation echo this."],
      ["10:12", "Break up your fallow ground, for it is time to seek the LORD", "A call to renewal."],
    ],
    refs: [["LUK.23", "Luke 23:30", "Mountains, fall on us"], ["JER.4", "Jeremiah 4:3", "Break up your fallow ground"], ["REV.6", "Revelation 6:16", "Fall on us"]],
  },
  11: {
    intro: "\"When Israel was a youth I loved him, and out of Egypt I called My son.\" God taught Ephraim to walk, took them in His arms and led them with cords of love. They refused to return. Yet God cries, \"How can I give you up, O Ephraim?... My heart is turned over within Me, all My compassions are kindled.\" \"I am God and not man, the Holy One in your midst.\"",
    v: [
      ["11:1", "Out of Egypt I called My son", "Matthew 2:15 applies this to Jesus."],
      ["11:3", "It is I who taught Ephraim to walk", "God as a loving parent."],
      ["11:4", "With cords of a man, with bonds of love", "Gentle leading."],
      ["11:8", "How can I give you up?", "God's heart of love."],
      ["11:9", "I am God and not man", "God's mercy is beyond human."],
    ],
    refs: [["MAT.2", "Matthew 2:15", "Out of Egypt I called My Son"], ["LUK.15", "Luke 15:20", "The father ran"], ["DEU.1", "Deuteronomy 1:31", "As a man carries his son"]],
  },
  12: {
    intro: "Ephraim feeds on wind and makes treaties with Assyria and Egypt. God recalls Jacob, who wrestled with the angel, wept and sought His favor. \"Therefore, return to your God, observe kindness and justice, and wait for your God continually.\" Ephraim says, \"I have become rich.\"",
    v: [
      ["12:4", "He wrestled with the angel and prevailed; he wept and sought His favor", "Jacob's example."],
      ["12:6", "Observe kindness and justice, and wait for your God continually", "A summary of faith."],
      ["12:8", "I have become rich", "Wealth breeds pride."],
    ],
    refs: [["GEN.32", "Genesis 32:24-30", "Jacob wrestles"], ["MIC.6", "Micah 6:8", "Do justice, love kindness"], ["REV.3", "Revelation 3:17", "I am rich"]],
  },
  13: {
    intro: "Ephraim now kisses calves. They will be like morning mist and chaff. \"I have been the LORD your God since the land of Egypt; you were not to know any god except Me.\" When they were satisfied, their hearts became proud and they forgot God. Yet: \"Shall I ransom them from the power of Sheol?... O Death, where are your thorns? O Sheol, where is your sting?\"",
    v: [
      ["13:4", "There is no savior besides Me", "God alone saves."],
      ["13:6", "As they had their pasture, they became satisfied... and forgot Me", "Comfort can make us forget God."],
      ["13:14", "O Death, where are your thorns?", "Paul quotes this in 1 Corinthians 15:55."],
    ],
    refs: [["1CO.15", "1 Corinthians 15:55", "O death, where is your sting?"], ["DEU.8", "Deuteronomy 8:11-14", "When you have eaten and are satisfied"]],
  },
  14: {
    intro: "\"Return, O Israel, to the LORD your God.\" Take words with you: \"Take away all iniquity and receive us graciously.\" God answers, \"I will heal their apostasy, I will love them freely.\" Israel will blossom like the lily, spread roots like the cedars of Lebanon, and smell like the olive tree. \"Whoever is wise, let him understand these things... for the ways of the LORD are right.\"",
    v: [
      ["14:2", "Take words with you and return to the LORD", "God tells them what to pray."],
      ["14:4", "I will heal their apostasy, I will love them freely", "Free grace."],
      ["14:5", "I will be like the dew to Israel", "Quiet, refreshing blessing."],
      ["14:9", "The ways of the LORD are right", "The book's conclusion."],
    ],
    refs: [["LUK.15", "Luke 15:18-24", "I will get up and go to my father"], ["JER.3", "Jeremiah 3:22", "I will heal your faithlessness"]],
  },
});
