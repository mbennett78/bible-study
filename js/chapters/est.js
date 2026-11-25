// Esther chapter notes.
import { makeBook } from "./make.js";

const sources = {
  jobes: "Karen H. Jobes, Esther, NIV Application Commentary (Zondervan, 1999).",
  baldwin: "Joyce G. Baldwin, Esther, Tyndale Old Testament Commentaries (InterVarsity Press, 1984).",
  bush: "Frederic W. Bush, Ruth, Esther, Word Biblical Commentary 9 (Word, 1996).",
  breneman: "Mervin Breneman, Ezra, Nehemiah, Esther, New American Commentary 10 (Broadman & Holman, 1993).",
  yamauchi: "Edwin M. Yamauchi, Persia and the Bible (Baker, 1990).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["jobes", "baldwin"] }, {
  1: {
    intro: "King Ahasuerus (Xerxes) of Persia, who rules 127 provinces from India to Ethiopia, throws a six-month display of his wealth and then a seven-day feast at Susa. On the last day, drunk, he orders Queen Vashti to come show her beauty to the guests. She refuses. His advisers fear every wife in the empire will follow her example, so Vashti is removed as queen.",
    v: [
      ["1:1", "Ahasuerus who reigned from India to Ethiopia", "Xerxes I, who ruled 486-465 BC."],
      ["1:10", "When the heart of the king was merry with wine", "Decisions made at a drinking party."],
      ["1:12", "Queen Vashti refused", "She will not be put on display."],
      ["1:22", "Every man should be the master in his own house", "A royal decree that makes the king look foolish."],
    ],
    bg: [["Susa and Xerxes", "French archaeologists excavated the Persian palace at Susa, including its great audience hall. Greek historian Herodotus describes Xerxes as a powerful king given to lavish feasts and sudden anger, which matches Esther's picture.", "strong", ["yamauchi", "baldwin"]]],
    refs: [["DAN.6", "Daniel 6:8", "The law of the Medes and Persians"], ["PRO.20", "Proverbs 20:1", "Wine is a mocker"]],
  },
  2: {
    intro: "The king searches for a new queen. Young women are gathered to the palace, among them Esther, a Jewish orphan raised by her cousin Mordecai. She keeps her people secret on Mordecai's advice. She wins the favor of everyone, and the king loves her above all the others and makes her queen. Meanwhile Mordecai, sitting at the king's gate, uncovers a plot to kill the king and saves his life; it is written in the royal records.",
    v: [
      ["2:7", "Hadassah, that is Esther", "Her Hebrew name means myrtle; Esther may come from a Persian word for star."],
      ["2:10", "Esther did not make known her people", "A hidden identity that will matter later."],
      ["2:17", "The king loved Esther more than all the women", "She becomes queen."],
      ["2:23", "It was written in the Book of the Chronicles", "A small detail that will turn the story."],
    ],
    refs: [["GEN.39", "Genesis 39:21", "God gave Joseph favor"], ["DAN.1", "Daniel 1:9", "God gave Daniel favor"]],
  },
  3: {
    intro: "The king promotes Haman, a descendant of Agag, and orders everyone to bow to him. Mordecai refuses. Furious, Haman plans to destroy not just Mordecai but all the Jews in the empire. He casts lots (pur) to pick a date, then offers the king a fortune to allow it. The decree goes out, and the city of Susa is thrown into confusion while the king and Haman sit down to drink.",
    v: [
      ["3:1", "Haman the Agagite", "Agag was the Amalekite king in 1 Samuel 15, enemies of Israel."],
      ["3:2", "Mordecai neither bowed down nor paid homage", "He will not give Haman the honor."],
      ["3:7", "Pur, that is the lot", "Haman leaves the date to chance; the reader knows better."],
      ["3:15", "The king and Haman sat down to drink", "Cruel indifference."],
    ],
    w: [["פּוּר", "pur", "H6332", "lot", "A borrowed word for a lot or die used to decide something by chance. A clay die inscribed with the name of a Persian-era official has been found. The feast of Purim takes its name from it.", ["halot", "bush"]]],
    refs: [["1SA.15", "1 Samuel 15:8", "Agag king of the Amalekites"], ["EXO.17", "Exodus 17:14-16", "War with Amalek from generation to generation"], ["PRO.16", "Proverbs 16:33", "The lot is cast, but the decision is from the LORD"]],
  },
  4: {
    intro: "Mordecai and Jews everywhere mourn in sackcloth. Mordecai asks Esther to plead with the king, but anyone who goes to him uninvited may be put to death. Mordecai answers, \"Who knows whether you have not attained royalty for such a time as this?\" Esther asks all the Jews in Susa to fast for her three days, and says, \"If I perish, I perish.\"",
    v: [
      ["4:11", "There is one law, that he be put to death", "Real danger."],
      ["4:14", "Relief and deliverance will arise for the Jews from another place", "Mordecai trusts that God will save His people."],
      ["4:14", "For such a time as this", "Esther's position is not an accident."],
      ["4:16", "If I perish, I perish", "Courage with faith."],
    ],
    why: "Esther never mentions God by name, which is unique among books of the Bible. Scholars discuss why.",
    views: [
      ["God hidden but at work", "Many see the silence as deliberate: the story is full of \"coincidences\" that show God quietly guiding events even when He seems absent, and the fasting in 4:16 implies prayer.", ["jobes", "baldwin", "breneman"]],
      ["A story for life in exile", "Others suggest the book was written as a Persian-court story for a festival, so its focus is on human courage and loyalty, with God's care assumed in the background.", ["bush"]],
    ],
    common: "All agree that the story shows the survival of God's people against all odds and calls readers to courage.",
    refs: [["GEN.50", "Genesis 50:20", "You meant evil, God meant it for good"], ["ROM.8", "Romans 8:28", "God causes all things to work together for good"], ["JON.3", "Jonah 3:9", "Who knows, God may turn"]],
  },
  5: {
    intro: "On the third day Esther puts on her royal robes and stands in the inner court. The king holds out his golden scepter and offers her up to half his kingdom. She invites the king and Haman to a banquet, and there invites them to a second one. Haman leaves happy, but seeing Mordecai still refusing to bow fills him with rage. His wife and friends suggest building gallows fifty cubits high for Mordecai.",
    v: [
      ["5:2", "The king extended to Esther the golden scepter", "She is accepted."],
      ["5:8", "Tomorrow I will do as the king says", "Esther waits for the right moment."],
      ["5:13", "Yet all of this does not satisfy me", "Pride is never satisfied."],
      ["5:14", "Have a gallows made fifty cubits high", "About 75 feet; probably a stake for impaling or hanging."],
    ],
    refs: [["PRO.16", "Proverbs 16:18", "Pride goes before destruction"], ["ECC.3", "Ecclesiastes 3:7", "A time to be silent, a time to speak"]],
  },
  6: {
    intro: "That very night the king cannot sleep. He has the royal records read to him and learns that Mordecai saved his life but was never rewarded. Just then Haman arrives to ask for Mordecai's death. The king asks him how to honor a man the king delights in. Thinking it is himself, Haman describes a royal parade, and then is ordered to lead Mordecai through the city in that very honor.",
    v: [
      ["6:1", "During that night the king could not sleep", "The turning point of the book."],
      ["6:6", "Whom would the king desire to honor more than me?", "Pride blinds Haman."],
      ["6:11", "Thus it shall be done to the man whom the king desires to honor", "Haman must shout Mordecai's praise."],
      ["6:13", "You will surely fall before him", "Even Haman's wife sees what is coming."],
    ],
    bg: [["Reversals", "The book is built on reversals: the honor Haman wanted goes to Mordecai, the gallows he built is used for him, and the day meant for the Jews' destruction becomes a day of victory. Scholars see this pattern as the book's way of showing hidden providence.", "good", ["jobes", "bush"]]],
    refs: [["PSA.121", "Psalm 121:4", "He who keeps Israel will neither slumber nor sleep"], ["LUK.14", "Luke 14:11", "Everyone who exalts himself will be humbled"]],
  },
  7: {
    intro: "At the second banquet Esther reveals that she and her people have been sold to be destroyed, and names Haman as the enemy. The king storms out in anger. Haman falls on Esther's couch begging for his life just as the king returns, which makes things worse. A servant mentions the gallows Haman built for Mordecai, and the king orders Haman hanged on it.",
    v: [
      ["7:3", "Let my life be given me as my petition, and my people", "Esther finally reveals who she is."],
      ["7:6", "This wicked Haman", "The truth comes out."],
      ["7:10", "They hanged Haman on the gallows which he had prepared", "The trap catches the one who set it."],
    ],
    refs: [["PSA.7", "Psalm 7:15-16", "He has fallen into the hole he made"], ["PRO.26", "Proverbs 26:27", "He who digs a pit will fall into it"]],
  },
  8: {
    intro: "The king gives Haman's house to Esther and his signet ring to Mordecai. But a Persian law cannot be revoked. Esther pleads with tears, so the king lets Mordecai write a second decree allowing the Jews to defend themselves on the appointed day. Couriers ride on royal horses, and the Jews have light, gladness, joy and honor. Many people of the land become Jews.",
    v: [
      ["8:6", "How can I endure to see the calamity", "Esther pleads for her people."],
      ["8:8", "A decree written in the name of the king may not be revoked", "The second decree answers the first."],
      ["8:16", "Light and gladness and joy and honor", "Mourning turns to joy."],
      ["8:17", "Many among the peoples of the land became Jews", "Others are drawn to God's people."],
    ],
    refs: [["DAN.6", "Daniel 6:15", "No decree may be changed"], ["PSA.30", "Psalm 30:11", "You have turned my mourning into dancing"]],
  },
  9: {
    intro: "On the thirteenth day of Adar, the day meant for their destruction, the Jews defend themselves and defeat those who hate them. In Susa a second day is allowed, and Haman's ten sons are hanged. Three times the text says they did not take the plunder. Mordecai and Esther write letters establishing the feast of Purim, days of feasting, gifts to one another, and gifts to the poor, to be remembered forever.",
    v: [
      ["9:1", "It was turned to the contrary", "The key phrase of the book."],
      ["9:10", "They did not lay their hands on the plunder", "This was defense, not greed."],
      ["9:22", "A month which was turned for them from sorrow into gladness", "Purim celebrates the reversal."],
      ["9:28", "These days were to be remembered and celebrated", "Remembering God's deliverance."],
    ],
    bg: [["Purim today", "Jewish families still celebrate Purim in late winter, reading the book of Esther aloud in synagogue (and booing whenever Haman's name is read), giving food gifts to friends, and giving to the poor.", "strong", ["baldwin", "jobes"]]],
    refs: [["1SA.15", "1 Samuel 15:3", "Saul took the plunder of Amalek"], ["EXO.12", "Exodus 12:14", "A memorial forever"]],
  },
  10: {
    intro: "The short last chapter tells of the greatness of King Ahasuerus and of Mordecai, who becomes second to the king. Mordecai is great among the Jews and popular with them, \"one who sought the good of his people and one who spoke for the welfare of his whole nation.\"",
    v: [
      ["10:3", "Second only to King Ahasuerus", "Like Joseph in Egypt and Daniel in Babylon."],
      ["10:3", "Sought the good of his people", "Greatness used to serve others."],
      ["10:1", "Ahasuerus laid a tribute on the land and on the coastlands of the sea", "His empire stretched from India to Ethiopia (1:1), over land and sea. The story ends where it began, in the court of a vast empire, but now with a Jew beside the throne."],
      ["10:2", "The Book of the Chronicles of the Kings of Media and Persia", "Persian kings kept careful records. One of them, read aloud on a sleepless night, saved Mordecai's life (6:1-2)."],
    ],
    bg: [["Xerxes in history", "Most scholars identify Ahasuerus with Xerxes I, who ruled Persia from 486 to 465 BC; the Hebrew name matches the Persian Khshayarsha. The Greek historian Herodotus describes his lavish court and his costly war with Greece, lost at Salamis in 480 BC, which fits a king raising new taxes.", "good", ["yamauchi", "baldwin"]], ["God unnamed, yet at work", "Esther never names God, yet the book is full of well-timed turns: a sleepless king, a banquet at just the right moment, a gallows used against its builder. Many readers see God's quiet providence behind every one.", "good", ["jobes"]]],
    refs: [["GEN.41", "Genesis 41:40-43", "Joseph second to Pharaoh"], ["DAN.2", "Daniel 2:48", "Daniel made ruler over Babylon"], ["MRK.10", "Mark 10:43-45", "Whoever wishes to become great shall be your servant"]],
  },
});
