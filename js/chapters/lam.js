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
      ["1:2", "She weeps bitterly in the night... she has none to comfort her", "Lamentations mourns Jerusalem's fall to Babylon in 586 BC. The city weeps through the night, and \"no one to comfort\" comes again and again in this chapter."],
      ["1:12", "Is it nothing to all you who pass this way?", "Often read on Good Friday about Jesus' suffering."],
      ["1:18", "The LORD is righteous; for I have rebelled", "Jerusalem confesses: the LORD is right, for I rebelled against His command."],
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
      ["2:11", "My eyes fail because of tears", "The poet's eyes are worn out with weeping because children and infants faint from hunger in the streets."],
      ["2:14", "Your prophets have seen false and foolish visions", "Jerusalem's prophets saw false visions and did not expose her sin. Their comforting words led to disaster."],
      ["2:17", "The LORD has done what He purposed", "The LORD has done what He planned. He carried out the warnings He gave long ago (Deuteronomy 28)."],
      ["2:19", "Pour out your heart like water before the Lord", "Get up and cry out in the night. Pour out your heart like water before the Lord, and lift your hands to Him for your children."],
    ],
    bg: [["An alphabet of grief", "Lamentations 1-4 are each acrostic poems, every verse starting with the next letter of the Hebrew alphabet. Grief is given order, from A to Z. In chapter 2 Jerusalem is pictured as the \"daughter of Zion,\" weeping over her ruins.", "strong", ["house", "parry"]]],
    refs: [["DEU.28", "Deuteronomy 28:15-68", "The warnings"], ["PSA.62", "Psalm 62:8", "Pour out your heart before Him"]],
  },
  3: {
    intro: "A man speaks: \"I am the man who has seen affliction.\" God has walled him in, made his chains heavy, and shut out his prayer. Then, at the center of the book: \"This I recall to my mind, therefore I have hope. The LORD's lovingkindnesses indeed never cease, for His compassions never fail. They are new every morning; great is Your faithfulness.\" \"The LORD is good to those who wait for Him.\" \"Let us examine and probe our ways, and let us return to the LORD.\"",
    v: [
      ["3:1", "I am the man who has seen affliction", "The poet speaks as one man who has seen suffering. His pain is personal, not just the nation's."],
      ["3:21", "This I recall to my mind, therefore I have hope", "In the middle of the book's darkness the poet says: yet this I call to mind, and so I have hope. Hope starts with remembering who God is."],
      ["3:22-23", "His compassions never fail. They are new every morning", "The hymn \"Great Is Thy Faithfulness\" comes from here."],
      ["3:25-26", "It is good that he waits silently for the salvation of the LORD", "The LORD is good to those who wait for Him. It is good to wait quietly for His salvation."],
      ["3:33", "He does not afflict willingly", "God does not willingly bring suffering or grief to anyone. Even His discipline is not His delight."],
      ["3:40", "Let us examine and probe our ways", "Let us examine our ways, test them, and return to the LORD."],
    ],
    w: [["חֶסֶד", "chesed", "H2617", "lovingkindness, steadfast love", "God's loyal covenant love. Even in the ruins, the poet finds that God's chesed has not ended.", ["halot", "house"]]],
    refs: [["PSA.30", "Psalm 30:5", "Joy comes in the morning"], ["ROM.8", "Romans 8:28", "God works all things for good"], ["HEB.10", "Hebrews 10:23", "He who promised is faithful"]],
  },
  4: {
    intro: "\"How dark the gold has become!\" The precious sons of Zion are treated like clay pots. Nursing babies' tongues stick to their mouths from thirst. Princes once brighter than snow are now unrecognizable. Jerusalem's punishment is greater than Sodom's. Yet the chapter ends: \"The punishment of your iniquity has been completed, O daughter of Zion; He will exile you no longer.\"",
    v: [
      ["4:1", "How dark the gold has become", "How the gold has lost its shine. Jerusalem's precious people are treated like clay pots."],
      ["4:13", "Because of the sins of her prophets and the iniquities of her priests", "The city fell because of the sins of its prophets and priests, who were supposed to lead the people to God."],
      ["4:22", "He will exile you no longer", "Your punishment will end, Zion; God will not keep you in exile. A ray of hope at the end."],
    ],
    bg: [["The horror of the siege", "Chapter 4, another acrostic, describes the Babylonian siege of 588-586 BC: children begging for bread, nobles once dressed in purple now thin and blackened (4:4-8). It ends with a word against Edom, which rejoiced over Jerusalem's fall (4:21-22; Obadiah 10-14).", "good", ["house", "harrison"]]],
    refs: [["ISA.40", "Isaiah 40:2", "Her warfare has ended"], ["OBA.1", "Obadiah 10-15", "Edom's betrayal"]],
  },
  5: {
    intro: "A community prayer: \"Remember, O LORD, what has befallen us; look, and see our reproach!\" Their inheritance is given to strangers; they are orphans; they pay for their own water. \"The joy of our hearts has ceased; our dancing has been turned into mourning.\" \"You, O LORD, rule forever.\" \"Restore us to You, O LORD, that we may be restored; renew our days as of old.\"",
    v: [
      ["5:1", "Remember, O LORD", "The final poem is a prayer: remember, LORD, what has happened to us; look and see our disgrace."],
      ["5:16", "Woe to us, for we have sinned", "The crown has fallen from our head. Woe to us, for we have sinned."],
      ["5:19", "You, O LORD, rule forever", "Jerusalem lies in ruins, but You, LORD, reign forever. Your throne lasts from generation to generation."],
      ["5:21", "Restore us to You, O LORD, that we may be restored", "Bring us back to You, LORD, that we may return; renew our days as of old. Only God can restore His people."],
    ],
    bg: [["An ending without a bow", "The book ends with a question (5:22) rather than a happy ending. Jewish readers often repeat verse 21 after reading verse 22 so the reading ends on hope.", "strong", ["house", "parry"]]],
    refs: [["PSA.80", "Psalm 80:3", "Restore us, O God"], ["JER.31", "Jeremiah 31:18", "Bring me back that I may be restored"]],
  },
});
