// Daniel chapter notes.
import { makeBook } from "./make.js";

const sources = {
  baldwinD: "Joyce G. Baldwin, Daniel, Tyndale Old Testament Commentaries (InterVarsity Press, 1978).",
  miller: "Stephen R. Miller, Daniel, New American Commentary 18 (Broadman & Holman, 1994).",
  longmanD: "Tremper Longman III, Daniel, NIV Application Commentary (Zondervan, 1999).",
  goldingayD: "John E. Goldingay, Daniel, Word Biblical Commentary 30 (Word, 1989).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew and Aramaic", sources, use: ["baldwinD", "miller"] }, {
  1: {
    intro: "In 605 BC Nebuchadnezzar besieges Jerusalem and takes some temple vessels and young nobles to Babylon, including Daniel, Hananiah, Mishael and Azariah. They are renamed Belteshazzar, Shadrach, Meshach and Abed-nego and trained for three years. \"Daniel made up his mind that he would not defile himself with the king's choice food.\" He asks for a ten-day test of vegetables and water, and they look healthier than the others. God gives them knowledge and wisdom, and the king finds them ten times better than all his magicians.",
    v: [
      ["1:2", "The Lord gave Jehoiakim king of Judah into his hand", "Nebuchadnezzar took Jerusalem in 605 BC, but Daniel says the Lord gave the king into his hand. Even in defeat, God is in control."],
      ["1:8", "Daniel made up his mind", "Daniel decided ahead of time not to defile himself with the king's food and wine. Faithfulness often starts with a quiet decision."],
      ["1:12", "Please test your servants for ten days", "Daniel does not rebel or complain. He respectfully suggests a ten-day test of vegetables and water."],
      ["1:17", "God gave them knowledge and intelligence", "God gave the four young men knowledge and skill in all kinds of learning, and gave Daniel understanding of visions and dreams."],
    ],
    bg: [["New names", "Their Hebrew names honored God (Daniel: \"God is my judge\"); their new names honored Babylonian gods (Belteshazzar: \"Bel, protect his life\"). They accepted the names but not the idolatry.", "good", ["miller", "baldwinD"]]],
    why: "Scholars discuss when the book of Daniel was written.",
    views: [
      ["In the 500s BC by Daniel", "Many hold that Daniel wrote it in Babylon and Persia in the sixth century BC, noting Jesus' reference to \"Daniel the prophet\" (Matthew 24:15), the book's knowledge of Babylonian and Persian life, and Dead Sea Scroll copies that show it was already treated as Scripture by the 100s BC.", ["miller", "baldwinD", "kitchen"]],
      ["Completed in the 160s BC", "Others think the book took its final form during the persecution under Antiochus IV in the 160s BC, using stories about Daniel to encourage faithful Jews, and reading the detailed prophecies of chapter 11 as written close to those events.", ["goldingayD", "longmanD"]],
    ],
    common: "All agree the book teaches that God rules over earthly kingdoms and calls His people to faithfulness under pressure, and that its hope looks beyond history to God's everlasting kingdom.",
    refs: [["2KI.24", "2 Kings 24:1", "Nebuchadnezzar comes against Jehoiakim"], ["ISA.39", "Isaiah 39:7", "Some of your sons will serve in Babylon"], ["ROM.12", "Romans 12:2", "Do not be conformed to this world"]],
  },
  2: {
    intro: "Nebuchadnezzar has a troubling dream and demands that his wise men tell him both the dream and its meaning or die. Daniel and his friends pray, and God reveals the mystery. Daniel tells the king of a great statue: head of gold, chest and arms of silver, belly and thighs of bronze, legs of iron, feet of iron mixed with clay. A stone cut without hands strikes the feet, crushes the statue, and becomes a great mountain filling the whole earth. \"The God of heaven will set up a kingdom which will never be destroyed.\"",
    v: [
      ["2:18", "Request compassion from the God of heaven", "Facing death with all the wise men, Daniel asks his three friends to pray with him for God's mercy."],
      ["2:21", "He removes kings and establishes kings", "Daniel praises God, who changes times and seasons, removes kings and sets them up, and gives wisdom to the wise."],
      ["2:28", "There is a God in heaven who reveals mysteries", "Daniel takes no credit. There is a God in heaven who reveals mysteries, and He has shown the king what will happen."],
      ["2:44", "A kingdom which will never be destroyed", "In the days of those kings, the God of heaven will set up a kingdom that will never be destroyed, like a stone that becomes a mountain filling the earth (2:35)."],
    ],
    bg: [["Aramaic chapters", "From 2:4 to the end of chapter 7, Daniel is written in Aramaic, the international language of the empire. The rest is in Hebrew.", "strong", ["miller", "goldingayD"]]],
    why: "Daniel 2 and 7 describe four kingdoms followed by God's kingdom. Scholars identify the kingdoms in different ways.",
    views: [
      ["Babylon, Medo-Persia, Greece, Rome", "Many identify the four as Babylon, Medo-Persia, Greece and Rome, with the stone as Christ's kingdom that began in the Roman era and will fill the earth.", ["miller", "baldwinD"]],
      ["Babylon, Media, Persia, Greece", "Others count Media and Persia separately, making Greece and its successor kingdoms the fourth, so the vision focuses on the time up to Antiochus IV.", ["goldingayD"]],
    ],
    common: "All agree the point is that every human empire passes away and God's kingdom will stand forever.",
    refs: [["DAN.7", "Daniel 7", "Four beasts and the Son of Man"], ["LUK.20", "Luke 20:17-18", "The stone that crushes"], ["REV.11", "Revelation 11:15", "The kingdom of our Lord"]],
  },
  3: {
    intro: "Nebuchadnezzar sets up a golden image ninety feet tall and commands everyone to bow when the music plays. Shadrach, Meshach and Abed-nego refuse. \"Our God whom we serve is able to deliver us from the furnace... But even if He does not, let it be known to you, O king, that we are not going to serve your gods.\" The furnace is heated seven times hotter, but the king sees four men walking in the fire, \"and the appearance of the fourth is like a son of the gods!\" They come out without even the smell of smoke.",
    v: [
      ["3:17", "Our God is able to deliver us", "The three friends tell the king their God is able to save them from the furnace. And even if He does not, they will not bow (3:18)."],
      ["3:18", "But even if He does not", "Faith that does not depend on the outcome."],
      ["3:25", "Four men loosed and walking about in the midst of the fire", "The king sees four men walking unbound in the fire, and the fourth looks like a son of the gods. God was with them in the fire."],
      ["3:27", "The smell of fire had not even come upon them", "Not a hair was singed, their clothes were not scorched, and they did not even smell of smoke."],
    ],
    bg: [["The golden image on the plain of Dura", "Nebuchadnezzar's image was sixty cubits high and six wide, about 90 by 9 feet, perhaps a statue on a tall base (3:1). Babylonian kings boasted of their building works in many inscriptions. Babylonian brick kilns were large enough to be used as the furnace here.", "good", ["baldwinD", "miller"]]],
    w: [["אַתּוּן", "attun", "H861", "furnace", "An Aramaic word for a kiln. Shadrach, Meshach and Abed-nego said God could save them, \"but even if He does not,\" they would not bow down (3:17-18).", ["halot", "longmanD"]]],
    refs: [["ISA.43", "Isaiah 43:2", "When you walk through the fire"], ["HEB.11", "Hebrews 11:34", "Quenched the power of fire"], ["EXO.20", "Exodus 20:4-5", "You shall not worship them"]],
  },
  4: {
    intro: "Nebuchadnezzar himself tells this story. He dreams of a great tree that is cut down to a stump. Daniel interprets: the king will be driven from people and live like an animal for seven periods of time \"until you recognize that the Most High is ruler over the realm of mankind.\" A year later, as he boasts, \"Is this not Babylon the great, which I myself have built?\" he is struck. When he lifts his eyes to heaven, his reason returns, and he praises the King of heaven.",
    v: [
      ["4:27", "Break away now from your sins by doing righteousness", "After explaining the king's dream, Daniel urges him to stop sinning, do what is right and show mercy to the poor."],
      ["4:30", "Is this not Babylon the great, which I myself have built?", "A year later, walking on his palace roof, Nebuchadnezzar boasts that he built great Babylon by his own power and for his own glory."],
      ["4:34", "I raised my eyes toward heaven and my reason returned", "After seven periods living like an animal, the king lifts his eyes to heaven, his sanity returns, and he praises the Most High."],
      ["4:37", "He is able to humble those who walk in pride", "The chapter is written as Nebuchadnezzar's own testimony. He ends: the King of heaven is able to humble those who walk in pride."],
    ],
    bg: [["Babylon the great", "Nebuchadnezzar's building inscriptions boast of his work on Babylon's walls, palaces and the Ishtar Gate (now rebuilt in Berlin's Pergamon Museum), matching his boast in 4:30.", "strong", ["kitchen", "miller"]]],
    refs: [["PRO.16", "Proverbs 16:18", "Pride goes before destruction"], ["JAS.4", "James 4:6, 10", "God gives grace to the humble"], ["EZK.31", "Ezekiel 31", "The great tree cut down"]],
  },
  5: {
    intro: "King Belshazzar throws a feast and drinks from the gold vessels taken from God's temple while praising idols. Suddenly a hand writes on the wall. Daniel, now old, reads it: MENE (God has numbered your kingdom), TEKEL (you have been weighed and found wanting), PERES (your kingdom is divided and given to the Medes and Persians). That night Belshazzar is killed, and Darius the Mede receives the kingdom.",
    v: [
      ["5:2", "The gold and silver vessels... from the temple", "At a drunken feast, King Belshazzar drinks from the gold and silver cups taken from God's temple in Jerusalem, praising idols."],
      ["5:23", "The God in whose hand are your life-breath and your ways, you have not glorified", "Daniel tells the king he has praised gods that cannot see or hear, but has not honored the God who holds his very breath."],
      ["5:27", "You have been weighed on the scales and found deficient", "The writing on the wall says TEKEL: you have been weighed on the scales and found lacking."],
      ["5:30", "That same night Belshazzar was slain", "That very night Belshazzar was killed. Babylon fell to the Medes and Persians in 539 BC."],
    ],
    bg: [["Belshazzar found", "Critics once said Belshazzar never existed, since Nabonidus was Babylon's last king. Cuneiform texts later showed Belshazzar was Nabonidus's son and co-regent, ruling in Babylon while his father was away. That is why he could offer Daniel only \"third ruler\" (5:16).", "strong", ["kitchen", "miller"]]],
    refs: [["ISA.21", "Isaiah 21:9", "Fallen is Babylon"], ["JER.51", "Jeremiah 51:39", "Their feast"]],
  },
  6: {
    intro: "Under King Darius, Daniel is so distinguished that jealous officials look for a charge against him but find none, \"because he was faithful.\" They trick the king into a decree: no one may pray to anyone but the king for thirty days. Daniel goes home and prays three times a day with his windows open toward Jerusalem, as before. He is thrown into the lions' den. In the morning: \"My God sent His angel and shut the lions' mouths.\" Darius proclaims that Daniel's God is the living God.",
    v: [
      ["6:4", "They could find no ground of accusation", "Daniel's rivals looked for something to accuse him of, but found no corruption or carelessness in his work."],
      ["6:10", "He continued kneeling... three times a day", "Knowing about the new law, Daniel went home and prayed three times a day toward Jerusalem with his windows open, just as he always had."],
      ["6:16", "Your God whom you constantly serve will Himself deliver you", "King Darius did not want Daniel harmed. As Daniel is thrown to the lions, the king says: may your God, whom you serve continually, rescue you."],
      ["6:22", "My God sent His angel and shut the lions' mouths", "In the morning Daniel answers from the den: God sent His angel and shut the lions' mouths."],
      ["6:26", "He is the living God and enduring forever", "Darius orders everyone in his kingdom to revere Daniel's God, the living God who endures forever and whose kingdom will never end."],
    ],
    bg: [["Darius the Mede and Persian law", "Daniel 6 is set under \"Darius the Mede,\" a ruler not yet named in other records. Scholars have suggested he was Cyrus's governor Gubaru, or Cyrus himself under another title. The idea that a Persian king's decree could not be changed appears also in Esther 8:8.", "good", ["baldwinD", "kitchen"]]],
    refs: [["HEB.11", "Hebrews 11:33", "Shut the mouths of lions"], ["PSA.55", "Psalm 55:17", "Evening, morning and noon I pray"], ["ACT.5", "Acts 5:29", "We must obey God rather than men"]],
  },
  7: {
    intro: "Daniel's first vision. Four great beasts rise from the sea: a lion with eagle's wings, a bear, a leopard with four heads, and a terrifying fourth beast with iron teeth and ten horns, from which a boastful little horn grows. Then thrones are set up, and the Ancient of Days takes His seat. \"One like a Son of Man\" comes with the clouds of heaven and is given everlasting dominion, glory and a kingdom. \"The saints of the Highest One will receive the kingdom.\"",
    v: [
      ["7:9", "The Ancient of Days took His seat", "After four fearsome beasts, Daniel sees the Ancient of Days take His seat on a fiery throne, His clothing white as snow. God is the eternal Judge."],
      ["7:13", "One like a Son of Man was coming with the clouds of heaven", "One like a son of man comes on the clouds to the Ancient of Days. \"Son of Man\" became the title Jesus used most for Himself (Mark 14:62)."],
      ["7:14", "His dominion is an everlasting dominion", "He is given authority, glory and a kingdom; all peoples serve Him. His rule will never pass away or be destroyed."],
      ["7:27", "Given to the people of the saints of the Highest One", "In the end the kingdom and its greatness are given to the holy people of the Most High. God's people share in His everlasting kingdom."],
    ],
    bg: [["One like a Son of Man", "Daniel sees \"One like a Son of Man\" coming with the clouds to the Ancient of Days and receiving an everlasting kingdom (7:13-14). \"Son of Man\" was Jesus' favorite name for Himself, and at His trial He quoted this verse (Mark 14:62).", "strong", ["baldwinD", "goldingayD"]]],
    w: [["אֱנָשׁ", "enash", "H606", "man, mankind", "In Aramaic, bar enash, \"son of man,\" simply means a human being. Yet this human figure comes on the clouds, which in Scripture is how God travels (Psalm 104:3).", ["halot", "miller"]]],
    refs: [["MRK.14", "Mark 14:61-62", "You will see the Son of Man coming with the clouds"], ["REV.1", "Revelation 1:13-14", "One like a son of man"], ["REV.13", "Revelation 13:1-2", "A beast from the sea"]],
  },
  8: {
    intro: "A vision of a ram with two horns (Media and Persia) charging west, north and south, until a male goat with one great horn (Greece) comes from the west and shatters it. The great horn breaks and four horns replace it. From one of them grows a small horn that exalts itself, stops the daily sacrifice, and throws truth to the ground. Gabriel explains the vision. Daniel is exhausted and sick for days.",
    v: [
      ["8:20", "The ram... the kings of Media and Persia", "The angel Gabriel explains the vision: the two-horned ram stands for the kings of Media and Persia."],
      ["8:21", "The shaggy goat represents the kingdom of Greece", "The goat is the king of Greece, and its large horn is the first king, generally understood as Alexander the Great."],
      ["8:22", "Four kingdoms will arise", "Alexander's empire split among four generals."],
      ["8:25", "He will be broken without human agency", "A proud, deceitful king will rise against the Prince of princes, but he will be broken, and not by human hands. Many identify him with Antiochus IV."],
    ],
    bg: [["Antiochus IV", "Most interpreters identify the small horn of chapter 8 with Antiochus IV Epiphanes, who outlawed Jewish worship and set up a pagan altar in the temple in 167 BC. Jews remember the temple's rededication at Hanukkah.", "strong", ["baldwinD", "goldingayD"]]],
    refs: [["JHN.10", "John 10:22", "The Feast of the Dedication (Hanukkah)"], ["DAN.11", "Daniel 11:21-35", "More on this king"]],
  },
  9: {
    intro: "Reading Jeremiah, Daniel understands that the desolation of Jerusalem would last seventy years. He prays a great prayer of confession: \"We have sinned... Righteousness belongs to You, O Lord, but to us open shame.\" \"We are not presenting our supplications before You on account of any merits of our own, but on account of Your great compassion.\" Gabriel comes swiftly with an answer: seventy \"weeks\" are decreed to finish transgression, make atonement and bring in everlasting righteousness, and Messiah the Prince will be cut off.",
    v: [
      ["9:2", "I, Daniel, observed in the books", "Daniel was reading Jeremiah and saw that the exile would last seventy years (Jeremiah 25:11; 29:10). Scripture led him to pray."],
      ["9:18", "On account of Your great compassion", "Daniel confesses his people's sins and asks God to act, not because they deserve it but because of His great mercy."],
      ["9:23", "You are highly esteemed", "As soon as Daniel began praying, the answer went out. Gabriel tells him he is greatly loved."],
      ["9:24", "Seventy weeks", "The Hebrew is \"seventy sevens,\" usually read as seventy weeks of years, 490 years, set for God's purposes. Readers differ on how to count them."],
      ["9:26", "The Messiah will be cut off", "After the sixty-two sevens an anointed one will be cut off and have nothing. Many Christians see Jesus' death here; others see a priest or king of Daniel's later times."],
    ],
    why: "The \"seventy weeks\" (9:24-27) is one of the most debated passages in the Bible.",
    views: [
      ["Fulfilled in Christ", "Many count 490 years from a decree to rebuild Jerusalem (often Artaxerxes' decree in 458 or 445 BC) to the time of Jesus, with \"Messiah cut off\" pointing to His death and the new covenant.", ["miller", "baldwinD"]],
      ["A gap before the last week", "Some see a gap between the 69th and 70th weeks, placing the final \"week\" in a future time of tribulation.", ["miller"]],
      ["Symbolic, reaching to Antiochus", "Others read the numbers as symbolic periods ending in the crisis under Antiochus IV, with the \"anointed one\" cut off as the high priest Onias III in 171 BC.", ["goldingayD", "longmanD"]],
    ],
    common: "All agree that God has a set timetable for history, that He will deal fully with sin, and that His people can trust Him in the meantime.",
    bg: [["Daniel reads Jeremiah", "In the first year of Darius, Daniel read in Jeremiah that the desolation of Jerusalem would last seventy years (9:2; Jeremiah 25:11). Instead of just waiting, he prayed, confessing \"we have sinned\" and asking God to act for His own name's sake (9:19).", "good", ["baldwinD", "miller"]]],
    w: [["שָׁבוּעַ", "shavua", "H7620", "week, period of seven", "Literally \"a seven.\" The \"seventy weeks\" (9:24) are usually taken as seventy sevens of years. Christians read the details in several ways, as the views on this chapter show.", ["halot", "goldingayD"]]],
    refs: [["JER.25", "Jeremiah 25:11-12", "Seventy years"], ["JER.29", "Jeremiah 29:10", "After seventy years"], ["MAT.24", "Matthew 24:15", "The abomination of desolation"], ["NEH.9", "Nehemiah 9", "Another prayer of confession"]],
  },
  10: {
    intro: "In the third year of Cyrus, Daniel mourns and fasts for three weeks. By the Tigris he sees a man dressed in linen, with a face like lightning and eyes like flaming torches. Daniel's strength leaves him. The messenger touches him: \"O man of high esteem, do not be afraid. Peace be with you; take courage.\" He explains that the prince of Persia withstood him twenty-one days until Michael came to help.",
    v: [
      ["10:12", "From the first day... your words were heard", "Prayer is heard even when the answer is delayed."],
      ["10:13", "The prince of the kingdom of Persia was withstanding me", "The angel says the prince of Persia resisted him for twenty-one days until Michael came to help. It is a glimpse of unseen spiritual conflict (Ephesians 6:12)."],
      ["10:19", "Do not be afraid. Peace be with you; take courage", "Daniel is weak and shaken. The messenger touches him and says: do not be afraid, you are greatly loved, peace, be strong."],
    ],
    bg: [["Unseen battles", "By the Tigris River, an angel tells Daniel his prayer was heard from the first day, but \"the prince of the kingdom of Persia\" withstood him twenty-one days until Michael came to help (10:12-13). It gives a rare glimpse of spiritual conflict behind world events (compare Ephesians 6:12).", "good", ["baldwinD", "miller"]]],
    refs: [["EPH.6", "Ephesians 6:12", "Our struggle is against spiritual forces"], ["REV.1", "Revelation 1:13-17", "A similar vision"], ["JUD.1", "Jude 9", "Michael the archangel"]],
  },
  11: {
    intro: "A detailed prophecy of kings: Persian kings, then a mighty king of Greece whose kingdom is divided; then long wars between the \"king of the South\" (the Ptolemies of Egypt) and the \"king of the North\" (the Seleucids of Syria), with marriages, betrayals and battles. A contemptible king arises, profanes the sanctuary and sets up \"the abomination of desolation.\" \"But the people who know their God will display strength and take action.\"",
    v: [
      ["11:2", "Three more kings are going to arise in Persia", "The angel tells Daniel of kings still to come in Persia. The chapter describes in detail rulers who followed."],
      ["11:3", "A mighty king will arise", "A mighty king will rule with great power and do as he pleases. This is generally understood as Alexander the Great, whose empire split four ways (11:4)."],
      ["11:31", "The abomination of desolation", "Antiochus IV's pagan altar in 167 BC; Jesus spoke of another."],
      ["11:32", "The people who know their God will display strength", "A cruel king will flatter some into turning away, but the people who know their God will stand firm and act."],
      ["11:35", "Some of those who have insight will fall, in order to refine", "Some of the wise will stumble or die, so that God's people may be refined, purified and made spotless until the end."],
    ],
    bg: [["History in advance", "Verses 2-35 match the history of the Persian, Greek, Ptolemaic and Seleucid kings closely, including the marriage of Berenice to Antiochus II (11:6) and Rome's turning back of Antiochus IV in Egypt (11:30). Interpreters differ on whether verses 36-45 continue with Antiochus or look to a final antichrist.", "debated", ["baldwinD", "miller", "goldingayD"]]],
    refs: [["MAT.24", "Matthew 24:15", "When you see the abomination of desolation"], ["2TH.2", "2 Thessalonians 2:3-4", "The man of lawlessness"]],
  },
  12: {
    intro: "\"At that time Michael, the great prince who stands guard over the sons of your people, will arise. And there will be a time of distress.\" Everyone found written in the book will be rescued. \"Many of those who sleep in the dust of the ground will awake, these to everlasting life, but the others to disgrace and everlasting contempt. Those who have insight will shine brightly like the brightness of the expanse of heaven, and those who lead the many to righteousness, like the stars forever and ever.\" Daniel is told to seal the book. \"But as for you, go your way to the end; then you will enter into rest and rise again for your allotted portion at the end of the age.\"",
    v: [
      ["12:1", "Everyone who is found written in the book", "A time of trouble will come, but everyone whose name is written in the book will be rescued. God knows His own."],
      ["12:2", "Many who sleep in the dust will awake", "The clearest Old Testament promise of resurrection."],
      ["12:3", "Like the stars forever and ever", "The wise will shine like the sky, and those who lead many to righteousness will shine like the stars forever."],
      ["12:13", "You will rise again for your allotted portion", "The book ends with a personal promise: Daniel will rest, and at the end of the days he will rise to receive his inheritance."],
    ],
    bg: [["Awake from the dust", "\"Many of those who sleep in the dust of the ground will awake, these to everlasting life, but the others to disgrace and everlasting contempt\" (12:2). It is the clearest promise of bodily resurrection in the Old Testament. Jesus speaks in the same way (John 5:28-29).", "strong", ["baldwinD", "goldingayD"]]],
    w: [["קִיץ", "quts", "H6974", "to awake", "Death is pictured as sleep and resurrection as waking up. \"Those who have insight will shine brightly like the brightness of the expanse of heaven\" (12:3).", ["halot", "longmanD"]]],
    refs: [["JHN.5", "John 5:28-29", "All in the tombs will hear His voice"], ["REV.20", "Revelation 20:12", "The books were opened"], ["MAT.13", "Matthew 13:43", "The righteous will shine like the sun"]],
  },
});
