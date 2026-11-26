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
      ["1:1", "Ahasuerus who reigned from India to Ethiopia", "Ahasuerus is generally identified with Xerxes I, who ruled Persia from 486 to 465 BC over 127 provinces from India to Ethiopia (Cush)."],
      ["1:10", "When the heart of the king was merry with wine", "On the seventh day of a long feast, when the king was merry with wine, he made a rash command. Big decisions were made at a drinking party."],
      ["1:12", "Queen Vashti refused", "Queen Vashti refused to be paraded before the king's drunken guests. Her refusal set the whole story in motion."],
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
      ["2:17", "The king loved Esther more than all the women", "Out of all the young women brought to the palace, the king loved Esther most and made her queen. She had kept her Jewish identity secret (2:10)."],
      ["2:23", "It was written in the Book of the Chronicles", "A small detail that will turn the story."],
    ],
    bg: [["The palace at Susa", "Susa was one of the Persian kings' capitals. French archaeologists uncovered its great palace and audience hall, built by Darius I and used by Xerxes. Esther's Hebrew name was Hadassah, and her Persian name Esther may mean \"star.\"", "strong", ["yamauchi", "jobes"]]],
    w: [["הֲדַסָּה", "Hadassah", "H1919", "Hadassah, myrtle", "From the myrtle tree, a sweet-smelling evergreen. In Isaiah 55:13 the myrtle grows where briers once grew, a sign of God's blessing.", ["halot", "baldwin"]]],
    refs: [["GEN.39", "Genesis 39:21", "God gave Joseph favor"], ["DAN.1", "Daniel 1:9", "God gave Daniel favor"]],
  },
  3: {
    intro: "The king promotes Haman, a descendant of Agag, and orders everyone to bow to him. Mordecai refuses. Furious, Haman plans to destroy not just Mordecai but all the Jews in the empire. He casts lots (pur) to pick a date, then offers the king a fortune to allow it. The decree goes out, and the city of Susa is thrown into confusion while the king and Haman sit down to drink.",
    v: [
      ["3:1", "Haman the Agagite", "Agag was the Amalekite king in 1 Samuel 15, enemies of Israel."],
      ["3:2", "Mordecai neither bowed down nor paid homage", "Everyone at the king's gate bowed to Haman, but Mordecai would not. He told them he was a Jew (3:4)."],
      ["3:7", "Pur, that is the lot", "Haman leaves the date to chance; the reader knows better."],
      ["3:15", "The king and Haman sat down to drink", "The decree to destroy the Jews went out and the city of Susa was thrown into confusion, while the king and Haman sat down to drink."],
    ],
    w: [["פּוּר", "pur", "H6332", "lot", "A borrowed word for a lot or die used to decide something by chance. A clay die inscribed with the name of a Persian-era official has been found. The feast of Purim takes its name from it.", ["halot", "bush"]]],
    refs: [["1SA.15", "1 Samuel 15:8", "Agag king of the Amalekites"], ["EXO.17", "Exodus 17:14-16", "War with Amalek from generation to generation"], ["PRO.16", "Proverbs 16:33", "The lot is cast, but the decision is from the LORD"]],
  },
  4: {
    intro: "Mordecai and Jews everywhere mourn in sackcloth. Mordecai asks Esther to plead with the king, but anyone who goes to him uninvited may be put to death. Mordecai answers, \"Who knows whether you have not attained royalty for such a time as this?\" Esther asks all the Jews in Susa to fast for her three days, and says, \"If I perish, I perish.\"",
    v: [
      ["4:11", "There is one law, that he be put to death", "Anyone who went to the king without being called would be put to death, unless he held out his golden scepter. Esther had not been called for thirty days."],
      ["4:14", "Relief and deliverance will arise for the Jews from another place", "Mordecai trusts that God will save His people."],
      ["4:14", "For such a time as this", "Mordecai tells Esther that help will come from somewhere if she stays silent, and asks: who knows whether you have come to the kingdom for such a time as this?"],
      ["4:16", "If I perish, I perish", "Esther asks all the Jews in Susa to fast for her three days, and she and her maids will fast too. Then she will go to the king: if I perish, I perish."],
    ],
    why: "Esther never mentions God by name, which is unique among books of the Bible. Scholars discuss why.",
    views: [
      ["God hidden but at work", "Many see the silence as deliberate: the story is full of \"coincidences\" that show God quietly guiding events even when He seems absent, and the fasting in 4:16 implies prayer.", ["jobes", "baldwin", "breneman"]],
      ["A story for life in exile", "Others suggest the book was written as a Persian-court story for a festival, so its focus is on human courage and loyalty, with God's care assumed in the background.", ["bush"]],
    ],
    common: "All agree that the story shows the survival of God's people against all odds and calls readers to courage.",
    bg: [["\"For such a time as this\"", "When Haman's decree went out, Mordecai and the Jews put on sackcloth and ashes, signs of grief. Mordecai urged Esther to speak to the king: \"Who knows whether you have not attained royalty for such a time as this?\" (4:14). Esther asked the Jews to fast for three days before she went in.", "good", ["jobes", "bush"]]],
    refs: [["GEN.50", "Genesis 50:20", "You meant evil, God meant it for good"], ["ROM.8", "Romans 8:28", "God causes all things to work together for good"], ["JON.3", "Jonah 3:9", "Who knows, God may turn"]],
  },
  5: {
    intro: "On the third day Esther puts on her royal robes and stands in the inner court. The king holds out his golden scepter and offers her up to half his kingdom. She invites the king and Haman to a banquet, and there invites them to a second one. Haman leaves happy, but seeing Mordecai still refusing to bow fills him with rage. His wife and friends suggest building gallows fifty cubits high for Mordecai.",
    v: [
      ["5:2", "The king extended to Esther the golden scepter", "When the king saw Queen Esther standing in the court, she won his favor, and he held out the golden scepter. She touched its tip and lived."],
      ["5:8", "Tomorrow I will do as the king says", "Instead of asking right away, Esther invites the king and Haman to a second banquet. She waits for the right moment."],
      ["5:13", "Yet all of this does not satisfy me", "Haman boasts of his wealth, sons and honors, then says: all this means nothing as long as I see Mordecai sitting at the king's gate. Pride is never satisfied."],
      ["5:14", "Have a gallows made fifty cubits high", "About 75 feet; probably a stake for impaling or hanging."],
    ],
    bg: [["The golden scepter", "Anyone who came to the Persian king's inner court without being called could be put to death, unless the king held out his golden scepter (4:11). The Greek historian Herodotus also describes strict rules about who could approach the king. Esther risked her life, and the king held out the scepter (5:2).", "good", ["yamauchi", "jobes"]]],
    refs: [["PRO.16", "Proverbs 16:18", "Pride goes before destruction"], ["ECC.3", "Ecclesiastes 3:7", "A time to be silent, a time to speak"]],
  },
  6: {
    intro: "That very night the king cannot sleep. He has the royal records read to him and learns that Mordecai saved his life but was never rewarded. Just then Haman arrives to ask for Mordecai's death. The king asks him how to honor a man the king delights in. Thinking it is himself, Haman describes a royal parade, and then is ordered to lead Mordecai through the city in that very honor.",
    v: [
      ["6:1", "During that night the king could not sleep", "That night the king could not sleep, so he had the royal records read to him. He heard how Mordecai once saved his life (2:21-23). This is the turning point."],
      ["6:6", "Whom would the king desire to honor more than me?", "Asked how to honor a man the king delights in, Haman thinks: whom would the king want to honor more than me? Pride blinds him."],
      ["6:11", "Thus it shall be done to the man whom the king desires to honor", "Haman has to dress Mordecai in royal robes, lead him on the king's horse through the city, and shout his honor."],
      ["6:13", "You will surely fall before him", "Haman's wife and advisers tell him: if Mordecai is a Jew, you cannot win against him; you will surely fall."],
    ],
    bg: [["Reversals", "The book is built on reversals: the honor Haman wanted goes to Mordecai, the gallows he built is used for him, and the day meant for the Jews' destruction becomes a day of victory. Scholars see this pattern as the book's way of showing hidden providence.", "good", ["jobes", "bush"]]],
    refs: [["PSA.121", "Psalm 121:4", "He who keeps Israel will neither slumber nor sleep"], ["LUK.14", "Luke 14:11", "Everyone who exalts himself will be humbled"]],
  },
  7: {
    intro: "At the second banquet Esther reveals that she and her people have been sold to be destroyed, and names Haman as the enemy. The king storms out in anger. Haman falls on Esther's couch begging for his life just as the king returns, which makes things worse. A servant mentions the gallows Haman built for Mordecai, and the king orders Haman hanged on it.",
    v: [
      ["7:3", "Let my life be given me as my petition, and my people", "At last Esther reveals who she is: spare my life, and the life of my people. Our enemy has sold us to be destroyed."],
      ["7:6", "This wicked Haman", "Asked who would dare do this, Esther points: the enemy is this wicked Haman. Haman is terrified."],
      ["7:10", "They hanged Haman on the gallows which he had prepared", "Haman was hanged on the gallows he had built for Mordecai. The trap caught the one who set it (Psalm 7:15)."],
    ],
    bg: [["Fallen on the couch", "Persians reclined on couches at banquets. When the king returned from the garden and found Haman fallen on Esther's couch begging for his life, it looked like an attack on the queen (7:8). Haman was hanged on the very gallows he had built for Mordecai.", "good", ["jobes", "breneman"]]],
    refs: [["PSA.7", "Psalm 7:15-16", "He has fallen into the hole he made"], ["PRO.26", "Proverbs 26:27", "He who digs a pit will fall into it"]],
  },
  8: {
    intro: "The king gives Haman's house to Esther and his signet ring to Mordecai. But a Persian law cannot be revoked. Esther pleads with tears, so the king lets Mordecai write a second decree allowing the Jews to defend themselves on the appointed day. Couriers ride on royal horses, and the Jews have light, gladness, joy and honor. Many people of the land become Jews.",
    v: [
      ["8:6", "How can I endure to see the calamity", "Haman is dead, but his decree still stands. Esther pleads: how can I bear to see disaster fall on my people and my family?"],
      ["8:8", "A decree written in the name of the king may not be revoked", "A Persian law could not be canceled, so the king lets Esther and Mordecai write a second decree allowing the Jews to defend themselves."],
      ["8:16", "Light and gladness and joy and honor", "For the Jews there was light and gladness, joy and honor. Mourning turned to celebration."],
      ["8:17", "Many among the peoples of the land became Jews", "In every province people celebrated, and many from other peoples became Jews, because fear of the Jews had fallen on them."],
    ],
    bg: [["Royal couriers", "The new decree was carried by couriers on swift royal horses to all 127 provinces (8:10, 14). Herodotus praised the Persian royal messengers, stationed with fresh horses a day's ride apart, saying nothing stopped them. His words were later used for the motto of the United States Postal Service.", "strong", ["yamauchi", "baldwin"]]],
    refs: [["DAN.6", "Daniel 6:15", "No decree may be changed"], ["PSA.30", "Psalm 30:11", "You have turned my mourning into dancing"]],
  },
  9: {
    intro: "On the thirteenth day of Adar, the day meant for their destruction, the Jews defend themselves and defeat those who hate them. In Susa a second day is allowed, and Haman's ten sons are hanged. Three times the text says they did not take the plunder. Mordecai and Esther write letters establishing the feast of Purim, days of feasting, gifts to one another, and gifts to the poor, to be remembered forever.",
    v: [
      ["9:1", "It was turned to the contrary", "On the very day their enemies hoped to overpower them, the reverse happened. \"It was turned around\" is the key phrase of the book."],
      ["9:10", "They did not lay their hands on the plunder", "The Jews defended themselves but did not touch the plunder, though the decree allowed it (8:11). It was defense, not greed."],
      ["9:22", "A month which was turned for them from sorrow into gladness", "Mordecai made the 14th and 15th of Adar days of feasting, gifts to one another and gifts to the poor. This is the feast of Purim."],
      ["9:28", "These days were to be remembered and celebrated", "These days are to be remembered and kept in every generation and family, so the memory of God's rescue never fades."],
    ],
    bg: [["Purim today", "Jewish families still celebrate Purim in late winter, reading the book of Esther aloud in synagogue (and booing whenever Haman's name is read), giving food gifts to friends, and giving to the poor.", "strong", ["baldwin", "jobes"]]],
    refs: [["1SA.15", "1 Samuel 15:3", "Saul took the plunder of Amalek"], ["EXO.12", "Exodus 12:14", "A memorial forever"]],
  },
  10: {
    intro: "The short last chapter tells of the greatness of King Ahasuerus and of Mordecai, who becomes second to the king. Mordecai is great among the Jews and popular with them, \"one who sought the good of his people and one who spoke for the welfare of his whole nation.\"",
    v: [
      ["10:3", "Second only to King Ahasuerus", "Like Joseph in Egypt and Daniel in Babylon."],
      ["10:3", "Sought the good of his people", "Mordecai was second only to the king, highly respected among the Jews, because he worked for the good of his people and spoke up for their welfare."],
      ["10:1", "Ahasuerus laid a tribute on the land and on the coastlands of the sea", "His empire stretched from India to Ethiopia (1:1), over land and sea. The story ends where it began, in the court of a vast empire, but now with a Jew beside the throne."],
      ["10:2", "The Book of the Chronicles of the Kings of Media and Persia", "Persian kings kept careful records. One of them, read aloud on a sleepless night, saved Mordecai's life (6:1-2)."],
    ],
    bg: [["Xerxes in history", "Most scholars identify Ahasuerus with Xerxes I, who ruled Persia from 486 to 465 BC; the Hebrew name matches the Persian Khshayarsha. The Greek historian Herodotus describes his lavish court and his costly war with Greece, lost at Salamis in 480 BC, which fits a king raising new taxes.", "good", ["yamauchi", "baldwin"]], ["God unnamed, yet at work", "Esther never names God, yet the book is full of well-timed turns: a sleepless king, a banquet at just the right moment, a gallows used against its builder. Many readers see God's quiet providence behind every one.", "good", ["jobes"]]],
    refs: [["GEN.41", "Genesis 41:40-43", "Joseph second to Pharaoh"], ["DAN.2", "Daniel 2:48", "Daniel made ruler over Babylon"], ["MRK.10", "Mark 10:43-45", "Whoever wishes to become great shall be your servant"]],
  },
});
