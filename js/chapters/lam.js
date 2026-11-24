// Lamentations chapter notes.
import { makeBook } from "./make.js";

const sources = {
  harrison: "R. K. Harrison, Jeremiah and Lamentations, Tyndale Old Testament Commentaries (InterVarsity Press, 1973).",
  huey: "F. B. Huey Jr., Jeremiah, Lamentations, New American Commentary 16 (Broadman & Holman, 1993).",
  house: "Paul R. House, Lamentations, Word Biblical Commentary 23B (Thomas Nelson, 2004).",
  parry: "Robin A. Parry, Lamentations, Two Horizons Old Testament Commentary (Eerdmans, 2010).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["harrison", "house"] }, {
  1: {
    intro: "\"How lonely sits the city that was full of people!\" Jerusalem is pictured as a widow weeping in the night with no one to comfort her. Her friends have betrayed her; her people are in exile; the roads to Zion mourn because no one comes to the feasts. Jerusalem confesses, \"The LORD is righteous; for I have rebelled.\" \"Is it nothing to all you who pass this way? Look and see if there is any pain like my pain.\"",
    v: [
      ["1:1", "How lonely sits the city", "The Hebrew title of the book is \"How\" (Ekah), a cry of grief."],
      ["1:2", "She weeps bitterly in the night... she has none to comfort her", "\"No one to comfort\" repeats five times."],
      ["1:12", "Is it nothing to all you who pass this way?", "Often read on Good Friday about Jesus' suffering."],
      ["1:18", "The LORD is righteous; for I have rebelled", "Honest confession."],
    ],
    bg: [["Alphabet poems", "Chapters 1-4 are acrostics: each verse (or group of verses) starts with the next letter of the Hebrew alphabet. Grief is given order, \"from A to Z.\" Chapter 3 triples it, with three verses for each letter.", "strong", ["house", "parry"]]],
    why: "Lamentations names no author. Scholars discuss whether Jeremiah wrote it.",
    views: [
      ["Jeremiah", "Jewish and Christian tradition, and the ancient Greek translation's introduction, credit Jeremiah, who saw Jerusalem fall and wrote laments (2 Chronicles 35:25); its language and feelings match his book.", ["harrison", "huey"]],
      ["Eyewitness poets", "Others think one or more unnamed eyewitnesses wrote the five poems soon after 586 BC, noting differences in style from Jeremiah.", ["house", "parry"]],
    ],
    common: "All agree the book was written by people who saw Jerusalem's destruction, and that it teaches God's people how to grieve honestly before Him.",
    refs: [["2KI.25", "2 Kings 25", "Jerusalem destroyed"], ["JER.9", "Jeremiah 9:1", "The weeping prophet"], ["MAT.23", "Matthew 23:37-38", "Jesus grieves over Jerusalem"]],
  },
  2: {
    intro: "The Lord has swallowed up Jacob in His anger, torn down the strongholds, and rejected His altar. The elders sit on the ground in silence; young girls bow their heads. Children faint in the streets asking their mothers for bread. The prophets saw false visions. \"Pour out your heart like water before the presence of the Lord; lift up your hands to Him for the life of your little ones.\"",
    v: [
      ["2:11", "My eyes fail because of tears", "Grief for the children."],
      ["2:14", "Your prophets have seen false and foolish visions", "False comfort led to disaster."],
      ["2:17", "The LORD has done what He purposed", "God warned this would happen."],
      ["2:19", "Pour out your heart like water before the Lord", "Bring grief to God."],
    ],
    refs: [["DEU.28", "Deuteronomy 28:15-68", "The warnings"], ["PSA.62", "Psalm 62:8", "Pour out your heart before Him"]],
  },
  3: {
    intro: "A man speaks: \"I am the man who has seen affliction.\" God has walled him in, made his chains heavy, and shut out his prayer. Then, at the center of the book: \"This I recall to my mind, therefore I have hope. The LORD's lovingkindnesses indeed never cease, for His compassions never fail. They are new every morning; great is Your faithfulness.\" \"The LORD is good to those who wait for Him.\" \"Let us examine and probe our ways, and let us return to the LORD.\"",
    v: [
      ["3:1", "I am the man who has seen affliction", "Personal suffering."],
      ["3:21", "This I recall to my mind, therefore I have hope", "Hope begins with remembering."],
      ["3:22-23", "His compassions never fail. They are new every morning", "The hymn \"Great Is Thy Faithfulness\" comes from here."],
      ["3:25-26", "It is good that he waits silently for the salvation of the LORD", "Quiet hope."],
      ["3:33", "He does not afflict willingly", "God takes no pleasure in our pain."],
      ["3:40", "Let us examine and probe our ways", "Turning back to God."],
    ],
    w: [["חֶסֶד", "chesed", "H2617", "lovingkindness, steadfast love", "God's loyal covenant love. Even in the ruins, the poet finds that God's chesed has not ended.", ["halot", "house"]]],
    refs: [["PSA.30", "Psalm 30:5", "Joy comes in the morning"], ["ROM.8", "Romans 8:28", "God works all things for good"], ["HEB.10", "Hebrews 10:23", "He who promised is faithful"]],
  },
  4: {
    intro: "\"How dark the gold has become!\" The precious sons of Zion are treated like clay pots. Nursing babies' tongues stick to their mouths from thirst. Princes once brighter than snow are now unrecognizable. Jerusalem's punishment is greater than Sodom's. Yet the chapter ends: \"The punishment of your iniquity has been completed, O daughter of Zion; He will exile you no longer.\"",
    v: [
      ["4:1", "How dark the gold has become", "Glory lost."],
      ["4:13", "Because of the sins of her prophets and the iniquities of her priests", "Leaders bear responsibility."],
      ["4:22", "He will exile you no longer", "A turn toward hope."],
    ],
    refs: [["ISA.40", "Isaiah 40:2", "Her warfare has ended"], ["OBA.1", "Obadiah 10-15", "Edom's betrayal"]],
  },
  5: {
    intro: "A community prayer: \"Remember, O LORD, what has befallen us; look, and see our reproach!\" Their inheritance is given to strangers; they are orphans; they pay for their own water. \"The joy of our hearts has ceased; our dancing has been turned into mourning.\" \"You, O LORD, rule forever.\" \"Restore us to You, O LORD, that we may be restored; renew our days as of old.\"",
    v: [
      ["5:1", "Remember, O LORD", "Prayer begins with asking God to see."],
      ["5:16", "Woe to us, for we have sinned", "Confession."],
      ["5:19", "You, O LORD, rule forever", "God's throne remains."],
      ["5:21", "Restore us to You, O LORD, that we may be restored", "Only God can bring us back."],
    ],
    bg: [["An ending without a bow", "The book ends with a question (5:22) rather than a happy ending. Jewish readers often repeat verse 21 after reading verse 22 so the reading ends on hope.", "strong", ["house", "parry"]]],
    refs: [["PSA.80", "Psalm 80:3", "Restore us, O God"], ["JER.31", "Jeremiah 31:18", "Bring me back that I may be restored"]],
  },
});
