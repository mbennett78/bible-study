// Zephaniah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  robertson: "O. Palmer Robertson, The Books of Nahum, Habakkuk, and Zephaniah, New International Commentary on the Old Testament (Eerdmans, 1990).",
  smithR: "Ralph L. Smith, Micah-Malachi, Word Biblical Commentary 32 (Word, 1984).",
  baker2: "David W. Baker, Nahum, Habakkuk and Zephaniah, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["robertson", "baker2"] }, {
  1: {
    intro: "Zephaniah, a great-great-grandson of King Hezekiah, prophesies in the days of King Josiah. God announces a sweeping judgment on Judah for worshiping Baal and the stars, and for those who say in their hearts, \"The LORD will not do good or evil.\" \"Near is the great day of the LORD... a day of wrath, a day of trouble and distress.\" Neither silver nor gold will be able to save them.",
    v: [
      ["1:1", "In the days of Josiah son of Amon", "Zephaniah, a descendant of King Hezekiah, prophesied in the days of King Josiah, probably before or during Josiah's great reform (2 Kings 22-23)."],
      ["1:5", "Those who bow down... swear to the LORD and yet swear by Milcom", "Some bowed to the stars on their rooftops, and others swore by the LORD and also by Milcom, an Ammonite god. God will not share their loyalty."],
      ["1:12", "Men who are stagnant in spirit, who say, \"The LORD will not do good or evil\"", "God will search Jerusalem with lamps and punish those who are settled and complacent, who say the LORD will do nothing, good or bad."],
      ["1:14", "Near is the great day of the LORD", "The great day of the LORD is near and coming fast. This is the central theme of Zephaniah."],
      ["1:18", "Neither their silver nor their gold will be able to deliver them", "Neither their silver nor their gold will be able to save them on the day of the LORD's anger."],
    ],
    bg: [["Dies irae", "Zephaniah 1:15 (\"a day of wrath\") gave its Latin name, Dies irae, to a famous medieval hymn about the final judgment, later set to music by Mozart and Verdi.", "strong", ["robertson"]]],
    refs: [["2KI.22", "2 Kings 22-23", "Josiah's reform"], ["JOL.2", "Joel 2:1-2", "The day of the LORD is near"], ["AMO.5", "Amos 5:18-20", "Darkness, not light"], ["MAT.6", "Matthew 6:24", "No one can serve two masters"]],
  },
  2: {
    intro: "Zephaniah calls Judah to gather before the decree takes effect: \"Seek the LORD, all you humble of the earth... seek righteousness, seek humility; perhaps you will be hidden in the day of the LORD's anger.\" Judgment then sweeps around the compass: Philistia to the west, Moab and Ammon to the east, Ethiopia to the south, and Assyria to the north. Proud Nineveh, which said, \"I am, and there is no one besides me,\" will become a desert where wild animals lie down.",
    v: [
      ["2:3", "Seek the LORD, all you humble of the earth", "Before judgment comes, Zephaniah calls: seek the LORD, all you humble of the land; seek righteousness and humility. Perhaps you will be sheltered."],
      ["2:7", "The LORD their God will care for them and restore their fortune", "The coastland will belong to the remnant of Judah. The LORD their God will care for them and restore their fortunes."],
      ["2:11", "All the coastlands of the nations will bow down to Him", "God will bring down the gods of the earth, and people from every coastland will worship Him, each in their own land."],
      ["2:15", "I am, and there is no one besides me", "Proud Nineveh said, I am, and there is no one else. Pride talks as if it were God."],
    ],
    refs: [["AMO.5", "Amos 5:4-6", "Seek Me and live"], ["NAM.3", "Nahum 3", "Nineveh's fall"], ["ISA.47", "Isaiah 47:8", "I am, and there is no one besides me"]],
  },
  3: {
    intro: "Woe to Jerusalem, rebellious and defiled: she heeds no voice and does not draw near to her God. Her leaders are like roaring lions and her prophets reckless. But then the tone turns. God will give the peoples purified lips to call on His name. A humble remnant will remain. \"Shout for joy, O daughter of Zion!\" \"The LORD your God is in your midst, a victorious warrior. He will exult over you with joy, He will be quiet in His love, He will rejoice over you with shouts of joy.\"",
    v: [
      ["3:2", "She did not trust in the LORD, she did not draw near to her God", "Jerusalem obeyed no one and accepted no correction. She did not trust the LORD or draw near to her God."],
      ["3:9", "I will give to the peoples purified lips", "God will give the peoples pure lips, so all may call on His name and serve Him together. Many see the confusion of Babel being undone (Genesis 11)."],
      ["3:12", "A humble and lowly people... will take refuge in the name of the LORD", "God will leave a humble and lowly people who take refuge in the name of the LORD."],
      ["3:17", "He will rejoice over you with shouts of joy", "The LORD your God is with you, a mighty Savior. He delights in you, quiets you with His love, and rejoices over you with singing."],
      ["3:20", "I will give you renown and praise among all the peoples", "God will bring His people home and give them honor and praise among all the peoples of the earth."],
    ],
    w: [["רָנַן", "ranan", "H7442", "to sing, shout for joy", "Used of a joyful ringing cry. In 3:14 Zion sings; in 3:17 God Himself sings over her.", ["halot", "robertson"]]],
    refs: [["GEN.11", "Genesis 11:1-9", "Babel"], ["ACT.2", "Acts 2", "Many languages praise God"], ["ISA.62", "Isaiah 62:5", "God rejoices over you"], ["LUK.15", "Luke 15:7", "Joy in heaven"]],
  },
});
