// Ecclesiastes chapter notes.
import { makeBook } from "./make.js";

const sources = {
  longmanE: "Tremper Longman III, The Book of Ecclesiastes, New International Commentary on the Old Testament (Eerdmans, 1998).",
  eaton: "Michael A. Eaton, Ecclesiastes, Tyndale Old Testament Commentaries (InterVarsity Press, 1983).",
  garrett: "Duane A. Garrett, Proverbs, Ecclesiastes, Song of Songs, New American Commentary 14 (Broadman & Holman, 1993).",
  fox: "Michael V. Fox, A Time to Tear Down and a Time to Build Up: A Rereading of Ecclesiastes (Eerdmans, 1999).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["eaton", "garrett"] }, {
  1: {
    intro: "\"The words of the Preacher, the son of David, king in Jerusalem. Vanity of vanities! All is vanity.\" What does a man gain from all his work under the sun? Generations come and go; the sun rises and sets; rivers run to the sea and it is never full. \"There is nothing new under the sun.\" The Preacher set out to explore everything by wisdom and found it like striving after wind.",
    v: [
      ["1:2", "Vanity of vanities! All is vanity", "The Hebrew word hebel means breath or vapor. Life \"under the sun,\" without God in view, is like mist: here, then gone, and hard to grasp."],
      ["1:3", "Under the sun", "Life seen from an earthly viewpoint; the phrase appears 29 times."],
      ["1:9", "There is nothing new under the sun", "What has been will be again; there is nothing new under the sun. Human life goes in circles like the sun, wind and streams (1:5-7)."],
      ["1:18", "In much wisdom there is much grief", "The Teacher searched out wisdom and found that the more you know, the more sorrow you see."],
    ],
    w: [["הֶבֶל", "hevel", "H1892", "vapor, breath, vanity", "Literally a breath or mist: something that vanishes quickly and cannot be grasped. It appears 38 times in the book. Translations use \"vanity,\" \"meaningless,\" or \"fleeting.\"", ["halot", "longmanE"]]],
    why: "Ecclesiastes is called the words of \"the Preacher\" (Qoheleth), \"son of David, king in Jerusalem,\" but never names Solomon. Scholars discuss who wrote it.",
    views: [
      ["Solomon", "Traditionally the book is credited to Solomon, whose wisdom, wealth and building projects (chapter 2) match the description, writing late in life.", ["garrett", "eaton"]],
      ["A later wise teacher", "Many scholars think a later writer spoke in Solomon's voice as a literary persona to explore whether wisdom, pleasure or riches can give life meaning, noting the Hebrew style and that he speaks of Solomon's reign in the past (1:12).", ["longmanE", "fox"]],
    ],
    common: "All agree the book is inspired Scripture that honestly faces life's frustrations and points to fearing God as the answer.",
    refs: [["ROM.8", "Romans 8:20-21", "Creation subjected to futility, in hope"], ["JAS.4", "James 4:14", "Life is a vapor"], ["1KI.4", "1 Kings 4:29-34", "Solomon's wisdom"]],
  },
  2: {
    intro: "The Preacher tests pleasure: laughter, wine, great building projects, gardens, servants, silver and gold, singers. \"All that my eyes desired I did not refuse them.\" But when he looked at it all, \"behold all was vanity and striving after wind.\" Wise and fool both die. He hated his work because he must leave it to someone else. Yet he sees that to eat, drink and enjoy work is from the hand of God.",
    v: [
      ["2:10", "All that my eyes desired I did not refuse them", "The Teacher tried everything: building, gardens, servants, treasure, music, pleasure. He denied himself nothing he wanted."],
      ["2:11", "All was vanity and striving after wind", "When he looked at all he had done, it was all a chasing after wind. Nothing under the sun satisfied."],
      ["2:24-25", "This also is from the hand of God", "There is nothing better than to eat, drink and find joy in our work. Even these simple joys come from God's hand."],
    ],
    bg: [["Gardens, parks and pleasures", "The Preacher built houses, planted vineyards and made gardens and parks with pools to water the trees (2:4-6), like the great royal gardens of the ancient world. He denied himself no pleasure, \"and behold all was vanity and striving after wind\" (2:11).", "good", ["longmanE", "eaton"]]],
    w: [["פַּרְדֵּס", "pardes", "H6508", "park, orchard", "A Persian loanword for an enclosed garden, the source of our word \"paradise.\" Even the finest garden could not satisfy the heart.", ["halot", "fox"]]],
    refs: [["LUK.12", "Luke 12:16-21", "The rich fool"], ["1TI.6", "1 Timothy 6:17", "God richly supplies us with all things to enjoy"]],
  },
  3: {
    intro: "\"There is an appointed time for everything... a time to be born and a time to die... a time to weep and a time to laugh; a time to mourn and a time to dance.\" God has made everything beautiful in its time and \"has also set eternity in their heart.\" Whatever God does lasts forever. People and animals both die and go to dust.",
    v: [
      ["3:1", "There is an appointed time for everything", "There is a right time for everything. The poem that follows lists fourteen pairs, from birth and death to war and peace (3:2-8)."],
      ["3:4", "A time to weep and a time to laugh", "Weeping and laughing, mourning and dancing: each has its time, and God is present in every season of life."],
      ["3:11", "He has made everything appropriate in its time", "God has made everything beautiful in its time, even when we cannot yet see how."],
      ["3:11", "He has also set eternity in their heart", "God has put a sense of eternity in the human heart. Nothing in this life fully satisfies, because we were made for more."],
    ],
    refs: [["ROM.8", "Romans 8:28", "All things work together for good"], ["GAL.4", "Galatians 4:4", "The fullness of time"], ["2CO.4", "2 Corinthians 4:18", "Things not seen are eternal"]],
  },
  4: {
    intro: "The Preacher sees the tears of the oppressed with no one to comfort them. Much work comes from envy. A lonely man works endlessly with no one to share it. \"Two are better than one... if either of them falls, the one will lift up his companion.\" \"A cord of three strands is not quickly torn apart.\"",
    v: [
      ["4:1", "They had no one to comfort them", "The Teacher saw the tears of the oppressed, with power on the side of their oppressors, and no one to comfort them."],
      ["4:9-10", "Two are better than one", "Two are better than one. If one falls, the other can help them up. Pity the person who falls with no one to help."],
      ["4:12", "A cord of three strands is not quickly torn apart", "One person can be overpowered, two can defend themselves, and a cord of three strands is not easily broken. Many weddings use this verse, with God as the third strand."],
    ],
    bg: [["Two are better than one", "\"Two are better than one... For if either of them falls, the one will lift up his companion\" (4:9-10). Travelers sleeping in the cold desert night kept each other warm (4:11). \"A cord of three strands is not quickly torn apart\" (4:12) is often read at weddings.", "good", ["longmanE", "garrett"]]],
    refs: [["GEN.2", "Genesis 2:18", "It is not good for man to be alone"], ["GAL.6", "Galatians 6:2", "Bear one another's burdens"]],
  },
  5: {
    intro: "\"Guard your steps as you go to the house of God.\" Listen more than you speak: \"God is in heaven and you are on the earth; therefore let your words be few.\" Keep your vows. He who loves money will not be satisfied with money. \"As he had come naked from his mother's womb, so will he return.\" Enjoying one's work and food is a gift of God.",
    v: [
      ["5:2", "Let your words be few", "Do not rush to speak before God. He is in heaven and you are on earth, so let your words be few."],
      ["5:5", "Better that you should not vow than that you should vow and not pay", "It is better not to make a vow than to make one and not keep it. Promises to God are serious."],
      ["5:10", "He who loves money will not be satisfied with money", "Whoever loves money never has enough; whoever loves wealth is never satisfied with what they earn."],
      ["5:19", "This is the gift of God", "When God gives someone wealth and the ability to enjoy it, to accept their lot and be happy in their work, that is a gift of God."],
    ],
    bg: [["Let your words be few", "\"God is in heaven and you are on the earth; therefore let your words be few\" (5:2). If you make a vow, keep it (Deuteronomy 23:21-23). It is better not to vow than to vow and not pay (5:5).", "good", ["longmanE", "eaton"]]],
    w: [["נֶדֶר", "neder", "H5088", "vow", "A solemn promise to God, often made in time of trouble. Hannah vowed to give her son to the LORD and kept her word (1 Samuel 1:11, 28).", ["halot", "fox"]]],
    refs: [["MAT.6", "Matthew 6:7", "Do not use meaningless repetition"], ["1TI.6", "1 Timothy 6:6-10", "Godliness with contentment"]],
  },
  6: {
    intro: "A man may have riches, honor and a hundred children, yet if he cannot enjoy them, a stillborn child is better off. \"All a man's labor is for his mouth and yet the appetite is not satisfied.\" Who knows what is good for a man during his few years, and what will happen after him?",
    v: [
      ["6:2", "God has not empowered him to eat from them", "A person can have riches, possessions and honor, yet God does not let them enjoy it, and a stranger enjoys it instead. Having is not the same as enjoying."],
      ["6:7", "The appetite is not satisfied", "All our work is for our mouths, yet the appetite is never satisfied."],
      ["6:12", "Who knows what is good for a man?", "Who knows what is good for a person during their few, fleeting days? Only God can answer that."],
    ],
    bg: [["Wealth without enjoyment", "The Preacher sees a man to whom God gives riches and honor but not the ability to enjoy them (6:2). Enjoying what we have is itself a gift from God (5:19).", "good", ["longmanE", "garrett"]]],
    refs: [["JHN.6", "John 6:35", "I am the bread of life"]],
  },
  7: {
    intro: "A series of proverbs. \"A good name is better than a good ointment.\" \"It is better to go to a house of mourning than to go to a house of feasting.\" \"Do not say, Why is it that the former days were better than these?\" \"In the day of prosperity be happy, but in the day of adversity consider: God has made the one as well as the other.\" \"There is not a righteous man on earth who continually does good and who never sins.\"",
    v: [
      ["7:2", "Better to go to a house of mourning", "It is better to go to a funeral than a party. Death is everyone's end, and the living should take it to heart."],
      ["7:10", "Why were the former days better?", "Do not ask why the old days were better. That question does not come from wisdom."],
      ["7:14", "God has made the one as well as the other", "When times are good, be glad; when times are bad, consider that God made both. He is present in every kind of day."],
      ["7:20", "There is not a righteous man on earth who never sins", "There is no one on earth who always does right and never sins. Paul makes the same point in Romans 3:10-12."],
    ],
    bg: [["\"Better than\" sayings", "Chapter 7 is full of \"better\" sayings: a good name is better than fine perfume, the house of mourning better than the house of feasting (7:1-2). They are short proverbs like those in the book of Proverbs, but with a sober edge.", "good", ["longmanE", "fox"]]],
    refs: [["PRO.22", "Proverbs 22:1", "A good name"], ["ROM.3", "Romans 3:23", "All have sinned"]],
  },
  8: {
    intro: "\"A man's wisdom illumines him.\" Obey the king's command. No one has power over the day of death. Because judgment against evil is not carried out quickly, people's hearts are set on evil. \"Still I know that it will be well for those who fear God.\" No one can discover all the work of God.",
    v: [
      ["8:11", "Because the sentence against an evil deed is not executed quickly", "When punishment for a crime does not come quickly, people's hearts are emboldened to do wrong."],
      ["8:12", "It will be well for those who fear God", "Even if a sinner lives long, the Teacher knows it will go well for those who fear God."],
      ["8:17", "Man cannot discover the work which has been done under the sun", "No one can fully understand what God is doing under the sun, however hard they try or however wise they claim to be."],
    ],
    bg: [["Under the king's word", "\"Keep the command of the king because of the oath before God\" (8:2). Life at an ancient royal court was dangerous; a wise person knew when and how to speak. Even so, no one can control the day of death (8:8).", "good", ["longmanE", "eaton"]]],
    refs: [["2PE.3", "2 Peter 3:9", "The Lord is not slow"], ["ROM.11", "Romans 11:33", "Unsearchable are His judgments"]],
  },
  9: {
    intro: "The righteous and wise and their deeds are in the hand of God. One fate comes to all. \"A live dog is better than a dead lion.\" \"Go then, eat your bread in happiness and drink your wine with a cheerful heart... Enjoy life with the woman whom you love.\" \"Whatever your hand finds to do, do it with all your might.\" The race is not to the swift; time and chance happen to all. A poor wise man saved a city, but no one remembered him.",
    v: [
      ["9:1", "In the hand of God", "The righteous and the wise, and all they do, are in God's hands."],
      ["9:7", "Eat your bread in happiness", "Go, eat your food with gladness and drink with a joyful heart, for God has already approved what you do."],
      ["9:10", "Whatever your hand finds to do, do it with all your might", "Whatever you do, do it with all your strength, because life on earth is short (Colossians 3:23)."],
      ["9:11", "Time and chance overtake them all", "The race does not always go to the fastest or the battle to the strongest. Time and chance happen to everyone."],
    ],
    bg: [["Eat your bread with joy", "\"Go then, eat your bread in happiness and drink your wine with a cheerful heart... Enjoy life with the woman whom you love\" (9:7-9). The ancient Epic of Gilgamesh has a tavern keeper give very similar advice. Ecclesiastes adds that God has already approved your works.", "strong", ["longmanE", "fox"]]],
    refs: [["COL.3", "Colossians 3:23", "Work heartily, as for the Lord"], ["JOB.21", "Job 21:23-26", "One fate for all"]],
  },
  10: {
    intro: "Proverbs on wisdom and folly. \"Dead flies make a perfumer's oil stink, so a little foolishness is weightier than wisdom.\" \"He who digs a pit may fall into it.\" \"If the axe is dull... then he must exert more strength. Wisdom has the advantage of giving success.\" \"Through indolence the rafters sag.\"",
    v: [
      ["10:1", "Dead flies make a perfumer's oil stink", "As dead flies make perfume stink, a little foolishness can outweigh much wisdom and honor."],
      ["10:10", "If the axe is dull", "If the axe is dull and not sharpened, you must work much harder. Wisdom helps you succeed with less effort."],
      ["10:18", "Through indolence the rafters sag", "Through laziness the roof sags; through idle hands the house leaks. Neglect has consequences."],
    ],
    bg: [["Dead flies in perfume", "\"Dead flies make a perfumer's oil stink\" (10:1). A precious jar of perfumed oil could be ruined by a few flies. In the same way, a little foolishness can spoil a lot of wisdom and honor.", "good", ["longmanE", "garrett"]]],
    refs: [["PRO.26", "Proverbs 26:27", "He who digs a pit"]],
  },
  11: {
    intro: "\"Cast your bread on the surface of the waters, for you will find it after many days.\" Give generously; you do not know what disaster may come. \"He who watches the wind will not sow.\" You do not know the work of God who makes all things, so sow your seed morning and evening. \"Rejoice, young man, during your childhood... yet know that God will bring you to judgment for all these things.\"",
    v: [
      ["11:1", "Cast your bread on the waters", "Send your bread out on the waters, and after many days you will find it again. Be generous and willing to take risks for good."],
      ["11:4", "He who watches the wind will not sow", "Waiting for perfect conditions means never acting."],
      ["11:9", "Rejoice, young man... yet know that God will bring you to judgment", "Young people, enjoy your youth and follow your heart, but know that God will bring you to account for everything you do."],
    ],
    bg: [["Bread on the waters", "\"Cast your bread on the surface of the waters, for you will find it after many days\" (11:1). Some read it as sending goods by sea in trade, others as generous giving. Either way: since no one knows the future, be bold and generous (11:2, 6).", "good", ["longmanE", "eaton"]]],
    refs: [["2CO.9", "2 Corinthians 9:6-8", "God loves a cheerful giver"], ["GAL.6", "Galatians 6:9", "We will reap"]],
  },
  12: {
    intro: "\"Remember also your Creator in the days of your youth, before the evil days come.\" A poetic picture of old age: the keepers of the house tremble, the grinders stop because they are few, the windows grow dim, the almond tree blossoms, until the silver cord is broken and the dust returns to the earth and the spirit to God. The conclusion: \"Fear God and keep His commandments, because this applies to every person.\"",
    v: [
      ["12:1", "Remember your Creator in the days of your youth", "Remember your Creator while you are young, before the hard days of old age come. The poem that follows pictures the body growing old (12:2-7)."],
      ["12:3-5", "The grinding ones stand idle", "Poetic images of aging: teeth, eyes, white hair."],
      ["12:7", "The spirit will return to God who gave it", "At death the body returns to the dust it came from, and the spirit returns to God who gave it (Genesis 2:7)."],
      ["12:13", "Fear God and keep His commandments", "After all his searching, the Teacher's conclusion: fear God and keep His commandments, for this is the whole duty of every person."],
      ["12:14", "God will bring every act to judgment", "God will bring every deed into judgment, including every hidden thing, whether good or evil. Nothing is truly meaningless to Him."],
    ],
    bg: [["The answer above the sun", "After testing everything \"under the sun,\" the book ends by looking up to God. Many readers find that its honest frustration prepares the heart for the hope of the gospel.", "good", ["eaton", "garrett"]]],
    refs: [["2CO.5", "2 Corinthians 5:10", "We must all appear before the judgment seat"], ["DEU.10", "Deuteronomy 10:12-13", "What does the LORD require?"], ["PSA.71", "Psalm 71:17-18", "From my youth to old age"]],
  },
});
