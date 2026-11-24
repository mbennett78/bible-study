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
      ["1:2", "Vanity of vanities! All is vanity", "The book's theme."],
      ["1:3", "Under the sun", "Life seen from an earthly viewpoint; the phrase appears 29 times."],
      ["1:9", "There is nothing new under the sun", "History repeats."],
      ["1:18", "In much wisdom there is much grief", "Knowing more can hurt more."],
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
      ["2:10", "All that my eyes desired I did not refuse them", "Everything money could buy."],
      ["2:11", "All was vanity and striving after wind", "It did not satisfy."],
      ["2:24-25", "This also is from the hand of God", "Simple joys are God's gifts."],
    ],
    refs: [["LUK.12", "Luke 12:16-21", "The rich fool"], ["1TI.6", "1 Timothy 6:17", "God richly supplies us with all things to enjoy"]],
  },
  3: {
    intro: "\"There is an appointed time for everything... a time to be born and a time to die... a time to weep and a time to laugh; a time to mourn and a time to dance.\" God has made everything beautiful in its time and \"has also set eternity in their heart.\" Whatever God does lasts forever. People and animals both die and go to dust.",
    v: [
      ["3:1", "There is an appointed time for everything", "Life has seasons."],
      ["3:4", "A time to weep and a time to laugh", "God is present in every season."],
      ["3:11", "He has made everything appropriate in its time", "God's timing is beautiful."],
      ["3:11", "He has also set eternity in their heart", "We long for more than this life."],
    ],
    refs: [["ROM.8", "Romans 8:28", "All things work together for good"], ["GAL.4", "Galatians 4:4", "The fullness of time"], ["2CO.4", "2 Corinthians 4:18", "Things not seen are eternal"]],
  },
  4: {
    intro: "The Preacher sees the tears of the oppressed with no one to comfort them. Much work comes from envy. A lonely man works endlessly with no one to share it. \"Two are better than one... if either of them falls, the one will lift up his companion.\" \"A cord of three strands is not quickly torn apart.\"",
    v: [
      ["4:1", "They had no one to comfort them", "Grief over injustice."],
      ["4:9-10", "Two are better than one", "We need each other."],
      ["4:12", "A cord of three strands is not quickly torn apart", "Often read at weddings."],
    ],
    refs: [["GEN.2", "Genesis 2:18", "It is not good for man to be alone"], ["GAL.6", "Galatians 6:2", "Bear one another's burdens"]],
  },
  5: {
    intro: "\"Guard your steps as you go to the house of God.\" Listen more than you speak: \"God is in heaven and you are on the earth; therefore let your words be few.\" Keep your vows. He who loves money will not be satisfied with money. \"As he had come naked from his mother's womb, so will he return.\" Enjoying one's work and food is a gift of God.",
    v: [
      ["5:2", "Let your words be few", "Reverent worship."],
      ["5:5", "Better that you should not vow than that you should vow and not pay", "Keep promises to God."],
      ["5:10", "He who loves money will not be satisfied with money", "Wealth never satisfies."],
      ["5:19", "This is the gift of God", "Joy in our portion."],
    ],
    refs: [["MAT.6", "Matthew 6:7", "Do not use meaningless repetition"], ["1TI.6", "1 Timothy 6:6-10", "Godliness with contentment"]],
  },
  6: {
    intro: "A man may have riches, honor and a hundred children, yet if he cannot enjoy them, a stillborn child is better off. \"All a man's labor is for his mouth and yet the appetite is not satisfied.\" Who knows what is good for a man during his few years, and what will happen after him?",
    v: [
      ["6:2", "God has not empowered him to eat from them", "Having without enjoying."],
      ["6:7", "The appetite is not satisfied", "Endless wanting."],
      ["6:12", "Who knows what is good for a man?", "Questions only God can answer."],
    ],
    refs: [["JHN.6", "John 6:35", "I am the bread of life"]],
  },
  7: {
    intro: "A series of proverbs. \"A good name is better than a good ointment.\" \"It is better to go to a house of mourning than to go to a house of feasting.\" \"Do not say, Why is it that the former days were better than these?\" \"In the day of prosperity be happy, but in the day of adversity consider: God has made the one as well as the other.\" \"There is not a righteous man on earth who continually does good and who never sins.\"",
    v: [
      ["7:2", "Better to go to a house of mourning", "Grief teaches wisdom."],
      ["7:10", "Why were the former days better?", "Nostalgia can be unwise."],
      ["7:14", "God has made the one as well as the other", "God is in good days and bad."],
      ["7:20", "There is not a righteous man on earth who never sins", "Paul echoes this in Romans 3."],
    ],
    refs: [["PRO.22", "Proverbs 22:1", "A good name"], ["ROM.3", "Romans 3:23", "All have sinned"]],
  },
  8: {
    intro: "\"A man's wisdom illumines him.\" Obey the king's command. No one has power over the day of death. Because judgment against evil is not carried out quickly, people's hearts are set on evil. \"Still I know that it will be well for those who fear God.\" No one can discover all the work of God.",
    v: [
      ["8:11", "Because the sentence against an evil deed is not executed quickly", "Delayed justice encourages evil."],
      ["8:12", "It will be well for those who fear God", "Faith in the end."],
      ["8:17", "Man cannot discover the work which has been done under the sun", "God's ways are beyond us."],
    ],
    refs: [["2PE.3", "2 Peter 3:9", "The Lord is not slow"], ["ROM.11", "Romans 11:33", "Unsearchable are His judgments"]],
  },
  9: {
    intro: "The righteous and wise and their deeds are in the hand of God. One fate comes to all. \"A live dog is better than a dead lion.\" \"Go then, eat your bread in happiness and drink your wine with a cheerful heart... Enjoy life with the woman whom you love.\" \"Whatever your hand finds to do, do it with all your might.\" The race is not to the swift; time and chance happen to all. A poor wise man saved a city, but no one remembered him.",
    v: [
      ["9:1", "In the hand of God", "Everyone's life is in God's hand."],
      ["9:7", "Eat your bread in happiness", "Enjoy God's gifts now."],
      ["9:10", "Whatever your hand finds to do, do it with all your might", "Wholehearted work."],
      ["9:11", "Time and chance overtake them all", "Life is not always fair."],
    ],
    refs: [["COL.3", "Colossians 3:23", "Work heartily, as for the Lord"], ["JOB.21", "Job 21:23-26", "One fate for all"]],
  },
  10: {
    intro: "Proverbs on wisdom and folly. \"Dead flies make a perfumer's oil stink, so a little foolishness is weightier than wisdom.\" \"He who digs a pit may fall into it.\" \"If the axe is dull... then he must exert more strength. Wisdom has the advantage of giving success.\" \"Through indolence the rafters sag.\"",
    v: [
      ["10:1", "Dead flies make a perfumer's oil stink", "A little folly spoils much."],
      ["10:10", "If the axe is dull", "Wisdom saves effort."],
      ["10:18", "Through indolence the rafters sag", "Neglect has consequences."],
    ],
    refs: [["PRO.26", "Proverbs 26:27", "He who digs a pit"]],
  },
  11: {
    intro: "\"Cast your bread on the surface of the waters, for you will find it after many days.\" Give generously; you do not know what disaster may come. \"He who watches the wind will not sow.\" You do not know the work of God who makes all things, so sow your seed morning and evening. \"Rejoice, young man, during your childhood... yet know that God will bring you to judgment for all these things.\"",
    v: [
      ["11:1", "Cast your bread on the waters", "Be generous and bold."],
      ["11:4", "He who watches the wind will not sow", "Waiting for perfect conditions means never acting."],
      ["11:9", "Rejoice, young man... yet know that God will bring you to judgment", "Joy with responsibility."],
    ],
    refs: [["2CO.9", "2 Corinthians 9:6-8", "God loves a cheerful giver"], ["GAL.6", "Galatians 6:9", "We will reap"]],
  },
  12: {
    intro: "\"Remember also your Creator in the days of your youth, before the evil days come.\" A poetic picture of old age: the keepers of the house tremble, the grinders stop because they are few, the windows grow dim, the almond tree blossoms, until the silver cord is broken and the dust returns to the earth and the spirit to God. The conclusion: \"Fear God and keep His commandments, because this applies to every person.\"",
    v: [
      ["12:1", "Remember your Creator in the days of your youth", "Start early."],
      ["12:3-5", "The grinding ones stand idle", "Poetic images of aging: teeth, eyes, white hair."],
      ["12:7", "The spirit will return to God who gave it", "Life beyond the grave."],
      ["12:13", "Fear God and keep His commandments", "The book's conclusion."],
      ["12:14", "God will bring every act to judgment", "Everything matters."],
    ],
    bg: [["The answer above the sun", "After testing everything \"under the sun,\" the book ends by looking up to God. Many readers find that its honest frustration prepares the heart for the hope of the gospel.", "good", ["eaton", "garrett"]]],
    refs: [["2CO.5", "2 Corinthians 5:10", "We must all appear before the judgment seat"], ["DEU.10", "Deuteronomy 10:12-13", "What does the LORD require?"], ["PSA.71", "Psalm 71:17-18", "From my youth to old age"]],
  },
});
