// Ezra chapter notes.
import { makeBook } from "./make.js";

const sources = {
  fensham: "F. Charles Fensham, The Books of Ezra and Nehemiah, New International Commentary on the Old Testament (Eerdmans, 1982).",
  williamsonEN: "H. G. M. Williamson, Ezra, Nehemiah, Word Biblical Commentary 16 (Word, 1985).",
  kidner: "Derek Kidner, Ezra and Nehemiah, Tyndale Old Testament Commentaries (InterVarsity Press, 1979).",
  breneman: "Mervin Breneman, Ezra, Nehemiah, Esther, New American Commentary 10 (Broadman & Holman, 1993).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["kidner", "fensham"] }, {
  1: {
    intro: "In the first year of Cyrus king of Persia (538 BC), the LORD stirs Cyrus's spirit to fulfill Jeremiah's word. Cyrus announces that the Jews may go home to Jerusalem and rebuild the house of the LORD. Neighbors give silver, gold and gifts, and Cyrus returns the temple vessels Nebuchadnezzar had taken. Sheshbazzar leads the first group home.",
    v: [
      ["1:1", "To fulfill the word of the LORD by the mouth of Jeremiah", "Jeremiah had promised a return after seventy years (Jeremiah 29:10)."],
      ["1:1", "The LORD stirred up the spirit of Cyrus", "God moves the heart of a pagan emperor to serve His purpose."],
      ["1:5", "Everyone whose spirit God had stirred", "The same God stirs His people to go."],
      ["1:7-11", "The articles of the house of the LORD", "The sacred vessels, carried off about fifty years earlier, come home."],
    ],
    bg: [["The Cyrus Cylinder", "A clay cylinder found in Babylon in 1879, now in the British Museum, records Cyrus's policy of returning captured peoples and their gods to their homelands and restoring their temples. It does not name the Jews, but it shows the kind of decree Ezra 1 describes.", "strong", ["kitchen", "williamsonEN"]]],
    refs: [["JER.29", "Jeremiah 29:10", "After seventy years I will bring you back"], ["ISA.44", "Isaiah 44:28-45:1", "Cyrus, My shepherd"], ["2CH.36", "2 Chronicles 36:22-23", "Chronicles ends with the same decree"]],
  },
  2: {
    intro: "A long list names the families who returned with Zerubbabel and Jeshua: priests, Levites, singers, gatekeepers and temple servants. Some cannot prove their family line and are kept from the priesthood until a priest can consult the Urim and Thummim. The whole group numbers 42,360, plus servants and singers. They give freely toward rebuilding.",
    v: [
      ["2:1", "Each to his city", "The returning exiles reclaim their family homes."],
      ["2:2", "Zerubbabel, Jeshua", "The governor from David's line and the high priest lead together."],
      ["2:62", "They searched among their ancestral registration", "Family records mattered for the priesthood."],
      ["2:68-69", "Offered willingly for the house of God", "The people give according to their ability."],
    ],
    bg: [["Why the long list?", "The list shows that the people who returned were the same families who went into exile. It ties the new community to the old promises. Nehemiah 7 repeats it with small differences in numbers, which scholars often explain as copying differences or counts taken at different times.", "good", ["williamsonEN", "breneman"]]],
    refs: [["NEH.7", "Nehemiah 7", "The same list"], ["EXO.28", "Exodus 28:30", "The Urim and Thummim"]],
  },
  3: {
    intro: "In the seventh month the people gather as one in Jerusalem. Jeshua and Zerubbabel rebuild the altar and begin daily offerings, even though they fear the peoples around them. They keep the Feast of Booths. In the second year they lay the foundation of the temple. The priests blow trumpets and the people shout praise, but older men who had seen the first temple weep aloud. No one can tell the shouts of joy from the weeping.",
    v: [
      ["3:3", "They set up the altar", "Worship comes first, before walls or houses."],
      ["3:11", "For He is good, for His lovingkindness is upon Israel forever", "The same song sung when Solomon's temple was dedicated."],
      ["3:12", "Wept with a loud voice", "Some grieve what was lost."],
      ["3:13", "The people could not distinguish", "Joy and sorrow mixed together."],
    ],
    refs: [["HAG.2", "Haggai 2:3", "Does it not seem to you like nothing?"], ["PSA.136", "Psalm 136", "His lovingkindness is everlasting"], ["2CH.5", "2 Chronicles 5:13", "The same praise at Solomon's temple"]],
  },
  4: {
    intro: "The enemies of Judah offer to help build, but Zerubbabel refuses. They then discourage the people, hire counselors against them, and write accusations to the Persian kings. The chapter jumps ahead to later letters under Xerxes and Artaxerxes, when opponents stopped work on the city walls. Then it returns: the temple work stops until the second year of Darius.",
    v: [
      ["4:3", "You have nothing in common with us", "Zerubbabel keeps the work faithful to the LORD alone."],
      ["4:4", "Discouraged the people of Judah", "Opposition often comes as discouragement."],
      ["4:8", "Written in Aramaic", "From 4:8 to 6:18 the book is written in Aramaic, the official language of the Persian empire."],
      ["4:24", "Work on the house of God ceased", "About sixteen years of delay."],
    ],
    bg: [["A chapter arranged by theme", "Verses 6-23 describe opposition under Xerxes (486-465 BC) and Artaxerxes (464-424 BC), long after the temple was finished in 516 BC. The writer groups these stories together to show a pattern of opposition, then returns to the temple story in verse 24.", "good", ["williamsonEN", "kidner"]]],
    refs: [["NEH.4", "Nehemiah 4", "Opposition to the walls"], ["HAG.1", "Haggai 1:2-4", "Is it time for you to live in paneled houses?"]],
  },
  5: {
    intro: "The prophets Haggai and Zechariah stir the people, and Zerubbabel and Jeshua start building again. Tattenai, the Persian governor, asks who gave them permission. The elders answer that they serve the God of heaven and that Cyrus authorized the work. \"The eye of their God was on the elders,\" so the work continues while Tattenai writes to King Darius.",
    v: [
      ["5:1", "Haggai the prophet and Zechariah", "God's word restarts the stalled work."],
      ["5:5", "The eye of their God was on the elders", "God watches over His people."],
      ["5:11", "We are the servants of the God of heaven and earth", "A humble, honest answer."],
    ],
    refs: [["HAG.1", "Haggai 1", "Consider your ways"], ["ZEC.4", "Zechariah 4:6", "Not by might nor by power, but by My Spirit"]],
  },
  6: {
    intro: "Darius has the archives searched, and Cyrus's decree is found at Ecbatana. Darius orders Tattenai not to interfere and to pay the costs from royal taxes. The temple is finished in the sixth year of Darius (516 BC) and dedicated with joy. The returned exiles celebrate the Passover, \"for the LORD had caused them to rejoice.\"",
    v: [
      ["6:2", "In Ecbatana", "The decree was found in the Persian summer capital."],
      ["6:14", "According to the command of the God of Israel and the decree of Cyrus", "God's will works through earthly rulers."],
      ["6:15", "In the sixth year of Darius", "March 515 BC, about seventy years after the first temple was destroyed."],
      ["6:22", "The LORD had caused them to rejoice", "Joy is God's gift."],
    ],
    bg: [["Persian archives", "Persian officials kept careful records. Clay tablets found at Persepolis show detailed royal administration, which fits a search of the archives for an earlier decree.", "strong", ["kitchen", "fensham"]]],
    refs: [["PRO.21", "Proverbs 21:1", "The king's heart is in the hand of the LORD"], ["EXO.12", "Exodus 12", "The Passover"]],
  },
  7: {
    intro: "About sixty years later, in the seventh year of Artaxerxes (458 BC), Ezra comes from Babylon. He is a priest descended from Aaron and a scribe skilled in the law of Moses. \"Ezra had set his heart to study the law of the LORD and to practice it, and to teach.\" Artaxerxes sends him with gifts and authority to teach the law and appoint judges. Ezra praises God for His kindness.",
    v: [
      ["7:6", "The hand of the LORD his God was upon him", "A phrase repeated through Ezra and Nehemiah."],
      ["7:10", "Set his heart to study, to practice, and to teach", "The pattern of a faithful teacher: learn it, live it, then teach it."],
      ["7:27", "Who has put such a thing as this in the king's heart", "Ezra gives God the credit."],
    ],
    w: [["סֹפֵר", "sopher", "H5608", "scribe", "Once a royal secretary, the word came to mean an expert in God's law who copied, studied and explained it. Ezra is the model scribe.", ["halot", "williamsonEN"]]],
    why: "Ezra 7 dates Ezra's arrival to \"the seventh year of Artaxerxes,\" but there were two kings named Artaxerxes, so scholars discuss which one is meant and how Ezra's work relates to Nehemiah's.",
    views: [
      ["Ezra came first (458 BC)", "The most common view reads this as Artaxerxes I, so Ezra came in 458 BC and Nehemiah in 445 BC, which matches the order of the books and Nehemiah 8, where both appear together.", ["kidner", "williamsonEN", "fensham"]],
      ["Ezra came later", "Some suggest Artaxerxes II, placing Ezra in 398 BC after Nehemiah, pointing to details such as the high priest named in Ezra 10:6.", ["breneman"]],
    ],
    common: "All agree that Ezra was a real priest and scribe who brought the law of Moses to the center of Jewish life after the exile.",
    refs: [["NEH.8", "Nehemiah 8", "Ezra reads the law"], ["PSA.119", "Psalm 119:97", "O how I love Your law"], ["2TI.2", "2 Timothy 2:15", "Accurately handling the word of truth"]],
  },
  8: {
    intro: "Ezra lists the families who went with him. Finding no Levites, he sends for some to serve in the temple. Before the long journey he proclaims a fast at the Ahava canal to ask God for a safe trip, because he was ashamed to ask the king for soldiers after saying God protects those who seek Him. God answers, and they arrive safely with the treasure, which is weighed and recorded.",
    v: [
      ["8:21", "A safe journey for us, our little ones, and all our possessions", "They humble themselves before God."],
      ["8:22", "I was ashamed to request from the king troops", "Ezra's words and actions match."],
      ["8:23", "He listened to our entreaty", "God answers prayer."],
      ["8:31", "The hand of our God was over us", "He protected them from enemies and ambushes on the way."],
    ],
    refs: [["PSA.121", "Psalm 121:7-8", "The LORD will guard your going out and coming in"], ["2CH.20", "2 Chronicles 20:3", "Jehoshaphat proclaims a fast"]],
  },
  9: {
    intro: "Leaders report that many people, including priests and Levites, have married women from the surrounding peoples who worship other gods. Ezra tears his clothes, pulls his hair and sits stunned until evening. Then he falls on his knees and prays a prayer of confession, speaking of the people's sins as \"our\" sins and praising God's mercy in leaving a remnant.",
    v: [
      ["9:3", "I tore my garment and my robe", "Deep grief over sin."],
      ["9:6", "Our iniquities have risen above our heads", "Ezra includes himself in the confession."],
      ["9:8", "To give us a peg in His holy place", "A small foothold of grace."],
      ["9:15", "You are righteous", "Ezra makes no excuses."],
    ],
    bg: [["The real issue", "The concern was not race or nationality. Rahab and Ruth were welcomed into Israel. The problem was marriage to people who kept serving other gods, which had pulled Solomon and many others into idolatry (Deuteronomy 7:3-4).", "good", ["kidner", "breneman"]]],
    refs: [["DEU.7", "Deuteronomy 7:3-4", "They will turn your sons away from following Me"], ["DAN.9", "Daniel 9:4-19", "Another great prayer of confession"], ["NEH.9", "Nehemiah 9", "The people confess"]],
  },
  10: {
    intro: "While Ezra prays and weeps, a large crowd gathers and weeps too. Shecaniah urges them to make a covenant to send away the foreign wives and children. The people gather in the cold rain and agree. A committee examines each case over three months. The book ends with a list of the men who had married foreign wives.",
    v: [
      ["10:2", "Yet now there is hope for Israel in spite of this", "Confession opens the way to hope."],
      ["10:4", "Be courageous and act", "Repentance takes action."],
      ["10:9", "Trembling because of this matter and the heavy rain", "A sober, serious moment."],
    ],
    why: "The ending of Ezra is hard for modern readers, because families were separated. Scholars and teachers weigh how to understand it.",
    views: [
      ["A necessary step in a crisis", "Many see it as a painful but necessary step to protect the small community's faith, since mixed marriages had already led Israel into idolatry, and note that each case was examined.", ["kidner", "fensham"]],
      ["Described, not prescribed", "Others stress that the narrative records what was done in a unique moment and is not a rule for later believers; the New Testament tells a believer to stay with an unbelieving spouse (1 Corinthians 7:12-14).", ["breneman", "williamsonEN"]],
    ],
    common: "All agree the deeper lesson is wholehearted loyalty to God and taking sin seriously, while the New Testament guides believers today on marriage.",
    refs: [["NEH.13", "Nehemiah 13:23-27", "The problem returns"], ["1CO.7", "1 Corinthians 7:12-14", "Do not send an unbelieving spouse away"], ["2CO.6", "2 Corinthians 6:14", "Do not be bound together with unbelievers"]],
  },
});
