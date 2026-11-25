// Song of Songs chapter notes.
import { makeBook } from "./make.js";

const sources = {
  longmanS: "Tremper Longman III, Song of Songs, New International Commentary on the Old Testament (Eerdmans, 2001).",
  carr: "G. Lloyd Carr, The Song of Solomon, Tyndale Old Testament Commentaries (InterVarsity Press, 1984).",
  garrett: "Duane A. Garrett, Proverbs, Ecclesiastes, Song of Songs, New American Commentary 14 (Broadman & Holman, 1993).",
  duguid: "Iain M. Duguid, The Song of Songs, Tyndale Old Testament Commentaries 19 (InterVarsity Press, 2015).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["carr", "duguid"] }, {
  1: {
    intro: "\"The Song of Songs, which is Solomon's.\" A young woman longs for her beloved: \"Your love is better than wine.\" She is dark from working in the vineyards. The two praise each other in the language of shepherds and gardens: \"How beautiful you are, my darling.\" Friends join in.",
    v: [
      ["1:1", "The Song of Songs", "Meaning \"the greatest song.\""],
      ["1:2", "Your love is better than wine", "Delight in love."],
      ["1:15", "How beautiful you are, my darling", "Words of honor and affection."],
    ],
    why: "The Song of Songs celebrates love between a man and a woman and never mentions God directly. Readers through history have understood it in different ways.",
    views: [
      ["A celebration of married love", "Many today read it first as poetry honoring the love of husband and wife as God's good gift, consistent with Genesis 2, while also seeing it reflect the greater love of God for His people.", ["longmanS", "garrett", "carr"]],
      ["A picture of God and His people", "For much of history, Jewish readers saw it as a picture of God's love for Israel and Christians as Christ's love for the church, and many still emphasize this reading alongside the plain one.", ["duguid"]],
    ],
    common: "All agree love and faithfulness in marriage are good gifts of God, and that human love at its best points to God's own love.",
    refs: [["GEN.2", "Genesis 2:23-25", "The first marriage"], ["EPH.5", "Ephesians 5:25-32", "Christ and the church"], ["HOS.2", "Hosea 2:19-20", "I will betroth you to Me"]],
  },
  2: {
    intro: "\"I am the rose of Sharon, the lily of the valleys.\" \"His banner over me is love.\" Winter is past: \"Arise, my darling, my beautiful one, and come along. For behold, the winter is past, the rain is over and gone. The flowers have already appeared in the land.\" \"Catch the foxes that are ruining the vineyards.\" \"My beloved is mine, and I am his.\"",
    v: [
      ["2:4", "His banner over me is love", "Love openly declared."],
      ["2:7", "Do not arouse or awaken love until it pleases", "A refrain urging patience: wait for the right time."],
      ["2:11-12", "The winter is past", "Springtime of love."],
      ["2:15", "The little foxes that are ruining the vineyards", "Small problems can spoil love."],
      ["2:16", "My beloved is mine, and I am his", "Belonging to each other."],
    ],
    refs: [["SNG.8", "Song of Songs 8:4", "The refrain repeated"], ["1CO.13", "1 Corinthians 13:4-7", "Love is patient"]],
  },
  3: {
    intro: "At night the young woman searches for the one her soul loves through the city streets, asks the watchmen, and finds him: \"I held on to him and would not let him go.\" Then a royal procession comes up from the wilderness: Solomon's carriage, guarded by sixty mighty men, on his wedding day.",
    v: [
      ["3:1", "I sought him whom my soul loves", "In a dream-like night scene she searches the city for him. Real love goes looking; it will not sit still."],
      ["3:4", "I held on to him and would not let him go", "Once she finds him, she will not let go. Many readers hear in this how a believer clings to the Lord (Genesis 32:26)."],
      ["3:11", "On the day of his wedding", "His mother crowns him \"on the day of his gladness of heart.\" A wedding is meant to be a day of deep joy."],
      ["3:5", "Do not arouse or awaken my love until she pleases", "A refrain repeated three times (2:7; 3:5; 8:4): love has its right time, so do not rush it."],
    ],
    bg: [["A royal wedding procession", "Royal weddings included a procession with music and guards. Solomon's carried couch (3:9-10) is made of timber from Lebanon, with posts of silver, a back of gold and a seat of purple cloth, the finest materials in his kingdom.", "good", ["longmanS", "garrett"]]],
    refs: [["JHN.20", "John 20:15-17", "Mary seeks Jesus at the tomb"]],
  },
  4: {
    intro: "The groom praises his bride in poetic pictures from nature: eyes like doves, hair like a flock of goats, a neck like the tower of David. \"You are altogether beautiful, my darling, and there is no blemish in you.\" She is \"a garden locked,\" a spring sealed up, kept pure for him.",
    v: [
      ["4:1", "Your eyes are like doves", "Images of gentleness."],
      ["4:7", "You are altogether beautiful", "Love sees beauty."],
      ["4:12", "A garden locked is my sister, my bride", "Faithfulness and purity."],
    ],
    bg: [["Ancient love poetry", "Egyptian love songs from about 1300-1100 BC use similar images: gardens, gazelles, \"my sister\" as a term of affection. The Song fits this tradition of poetry.", "strong", ["longmanS", "carr"]]],
    refs: [["EPH.5", "Ephesians 5:27", "Holy and blameless"]],
  },
  5: {
    intro: "The beloved knocks at night, but she is slow to open; when she does, he is gone. She searches, and the watchmen mistreat her. The daughters of Jerusalem ask what makes her beloved better than others, and she describes him: \"My beloved is dazzling and ruddy, outstanding among ten thousand... This is my beloved and this is my friend.\"",
    v: [
      ["5:2", "I was asleep but my heart was awake", "A dreamlike scene."],
      ["5:6", "My beloved had turned away and had gone", "Love missed by delay."],
      ["5:10", "Outstanding among ten thousand", "No one compares."],
      ["5:16", "This is my beloved and this is my friend", "Love and friendship together."],
    ],
    refs: [["REV.3", "Revelation 3:20", "I stand at the door and knock"]],
  },
  6: {
    intro: "The daughters ask where the beloved has gone. She knows: to his garden. \"I am my beloved's and my beloved is mine.\" He praises her again: \"My dove, my perfect one, is unique.\" Even queens praise her. \"Who is this that grows like the dawn, as beautiful as the full moon, as pure as the sun?\"",
    v: [
      ["6:3", "I am my beloved's and my beloved is mine", "After a time apart (5:6), they belong to each other again. The vow from 2:16 comes back with its order turned around."],
      ["6:9", "My dove, my perfect one, is unique", "Even among sixty queens and eighty concubines (6:8), she is the only one for him. Faithful love sees one person as one of a kind."],
      ["6:10", "Who is this that grows like the dawn?", "Dawn, moon and sun: her beauty is described with the brightest things in the sky."],
      ["6:4", "As beautiful as Tirzah, as lovely as Jerusalem", "Tirzah, whose name means \"pleasant,\" was a lovely city that later became a royal capital of the northern kingdom (1 Kings 16:23)."],
    ],
    refs: [["SNG.2", "Song of Songs 2:16", "The earlier vow"]],
  },
  7: {
    intro: "Friends call out to the young woman as she dances. Her beloved praises her beauty from her feet to her head. She answers, \"I am my beloved's, and his desire is for me,\" and invites him to go out to the countryside together where the vines have budded.",
    v: [
      ["7:1", "How beautiful are your feet", "He praises her from her feet up, the reverse of 4:1-5. In the Song, love is honest, kind and full of delight."],
      ["7:10", "I am my beloved's, and his desire is for me", "After the fall, the woman's desire is for a husband who rules over her (Genesis 3:16). Here his desire is for her. Many see love being healed."],
      ["7:12", "Let us rise early and go to the vineyards", "Love makes time. The couple plan a day in the countryside among the vines and blossoms."],
    ],
    refs: [["GEN.3", "Genesis 3:16", "Desire after the fall; here love is restored"]],
  },
  8: {
    intro: "\"Put me like a seal over your heart... for love is as strong as death... Its flashes are flashes of fire, the very flame of the LORD. Many waters cannot quench love, nor will rivers overflow it.\" Love cannot be bought. The Song ends with the lovers calling to each other.",
    v: [
      ["8:4", "Do not arouse or awaken love until it pleases", "The refrain a third time."],
      ["8:6", "Love is as strong as death", "The Song's high point."],
      ["8:6", "The very flame of the LORD", "Possibly the only mention of God's name in the Song."],
      ["8:7", "Many waters cannot quench love", "Love that endures."],
    ],
    w: [["שַׁלְהֶבֶתְיָה", "shalhevetyah", "H7957", "flame of the LORD, mighty flame", "The word ends with \"-yah,\" a short form of God's name. It may mean \"a mighty flame\" or \"the flame of the LORD,\" suggesting that true love comes from God.", ["halot", "longmanS"]]],
    refs: [["ROM.8", "Romans 8:35-39", "Nothing can separate us from the love of God"], ["1CO.13", "1 Corinthians 13:7-8", "Love never fails"], ["1JN.4", "1 John 4:7-8", "Love is from God"]],
  },
});
