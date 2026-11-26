// Deuteronomy chapter notes.
import { makeBook } from "./make.js";

const sources = {
  craigie: "Peter C. Craigie, The Book of Deuteronomy, New International Commentary on the Old Testament (Eerdmans, 1976).",
  block: "Daniel I. Block, Deuteronomy, NIV Application Commentary (Zondervan, 2012).",
  merrill: "Eugene H. Merrill, Deuteronomy, New American Commentary 4 (Broadman & Holman, 1994).",
  wright: "Christopher J. H. Wright, Deuteronomy, New International Biblical Commentary (Hendrickson, 1996).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["craigie", "block"] }, {
  1: {
    intro: "On the plains of Moab, in the fortieth year, Moses begins a series of farewell speeches to the new generation. He recalls how God told them to leave Horeb and take the land, how he appointed judges, and how their parents refused to go in after the spies' report.",
    v: [
      ["1:2", "Eleven days' journey", "A trip of eleven days took forty years, because of unbelief."],
      ["1:17", "The judgment is God's", "Judges must not show partiality or fear anyone."],
      ["1:31", "As a man carries his son", "God carried Israel through the wilderness."],
      ["1:32", "You did not trust the LORD", "Moses reminds the new generation why their parents wandered forty years: despite all God had done, they did not trust the LORD at Kadesh (Numbers 14)."],
    ],
    bg: [["A covenant document", "Deuteronomy follows the pattern of ancient treaties between a great king and his people: preamble, history, laws, blessings and curses, witnesses. The closest matches are Hittite treaties of about 1400-1200 BC.", "good", ["kitchen", "craigie"]]],
    refs: [["NUM.13", "Numbers 13-14", "The spies and the refusal"], ["HEB.3", "Hebrews 3:16-19", "They could not enter because of unbelief"]],
  },
  2: {
    intro: "Moses recalls the years of wandering and God's instructions not to fight Edom, Moab or Ammon, because God had given them their lands. Then God gives Sihon king of Heshbon into Israel's hand.",
    v: [
      ["2:5", "Do not provoke them", "God gave land to Esau's descendants too."],
      ["2:7", "You have not lacked a thing", "For forty years in the wilderness God watched over their journey and blessed their work. They lacked nothing."],
      ["2:14-15", "Until all the generation perished", "It took thirty-eight years until the whole generation of fighting men who refused to enter the land had died, as the LORD had sworn."],
    ],
    bg: [["Land God gave to others", "God told Israel not to attack Edom, Moab or Ammon, because He had given their lands to the descendants of Esau and Lot (2:5, 9, 19). Moses adds notes about older peoples there, like the tall Emim and Zamzummim, who were driven out long before.", "good", ["craigie", "merrill"]]],
    refs: [["NUM.21", "Numbers 21:21-31", "The defeat of Sihon"], ["ACT.17", "Acts 17:26", "He determined the boundaries of their habitation"]],
  },
  3: {
    intro: "Israel defeats Og king of Bashan, whose iron bed is still shown in Rabbah. The land east of the Jordan is given to Reuben, Gad and half of Manasseh. Moses pleads to cross into the land, but God says, \"Enough! Speak to Me no more of this matter,\" and lets him see it from Pisgah.",
    v: [
      ["3:11", "An iron bedstead", "King Og of Bashan was the last of the giant Rephaim. His iron bed was about 13 feet long and 6 feet wide, yet God gave him into Israel's hand."],
      ["3:24", "You have begun to show Your greatness", "Moses longs to see more of what God will do."],
      ["3:28", "Charge Joshua", "Moses' task now is to strengthen his successor."],
    ],
    bg: [["Og's iron bed", "Og, king of Bashan, was a giant whose \"bed of iron\" could still be seen in Rabbah, about thirteen feet long (3:11). Some think it was a basalt coffin or one of the large stone burial tables (dolmens) found in that region.", "good", ["craigie", "kitchen"]]],
    w: [["עֶרֶשׂ", "eres", "H6210", "bed, couch", "A bed or couch. The word may also be used for a burial bier, which is why some think Og's \"bed\" was a coffin.", ["halot", "merrill"]]],
    refs: [["NUM.21", "Numbers 21:33-35", "Og defeated"], ["DEU.34", "Deuteronomy 34:1-4", "Moses sees the land"]],
  },
  4: {
    intro: "Moses urges Israel to listen and obey, and never forget what they saw at Horeb: God spoke from the fire, and they saw no form, so they must make no idol. If they turn away, they will be scattered, but if they seek God with all their heart they will find Him. \"The LORD, He is God in heaven above and on the earth below; there is no other.\"",
    v: [
      ["4:7", "So near", "What other nation has a God so near whenever they call?"],
      ["4:9", "Make them known to your sons and grandsons", "Be careful not to forget what you have seen with your own eyes. Teach it to your children and your grandchildren."],
      ["4:15-16", "You did not see any form", "God's people worship the God who speaks, not an image."],
      ["4:29", "You will find Him", "\"If you search for Him with all your heart and all your soul.\""],
      ["4:31", "A compassionate God", "He will not fail you or forget His covenant."],
    ],
    bg: [["No form at Horeb", "\"You heard the sound of words, but you saw no form, only a voice\" (4:12). That is the reason Israel was not to make any image of God (4:15-19). God makes Himself known through His word.", "good", ["craigie", "wright"]]],
    w: [["תְּמוּנָה", "temunah", "H8544", "form, likeness", "A shape or image. The same word is used in the second commandment (5:8).", ["halot", "block"]]],
    refs: [["JER.29", "Jeremiah 29:13", "You will seek Me and find Me"], ["ACT.17", "Acts 17:27", "He is not far from each one of us"], ["ROM.10", "Romans 10:8", "The word is near you"]],
  },
  5: {
    intro: "Moses repeats the Ten Commandments to the new generation: \"The LORD our God made a covenant with us at Horeb... with us, all those of us alive here today.\" He recalls the people's fear at the mountain and God's wish: \"Oh that they had such a heart in them, that they would fear Me.\"",
    v: [
      ["5:3", "With us, all of us alive here today", "Each generation must own the covenant for itself."],
      ["5:15", "Remember that you were a slave", "Here the Sabbath is also tied to rescue from Egypt, so servants must rest too."],
      ["5:29", "Oh that they had such a heart", "After the people promised to obey, God said: oh that they had such a heart to fear Me and keep My commands always, so it would go well with them forever."],
    ],
    bg: [["Two reasons for the Sabbath", "The Ten Commandments appear twice, in Exodus 20 and here. Exodus grounds the Sabbath in creation: God rested on the seventh day. Deuteronomy grounds it in redemption: \"remember that you were a slave in the land of Egypt\" (5:15), so servants and animals must rest too.", "strong", ["craigie", "block"]]],
    w: [["שָׁמַר", "shamar", "H8104", "to keep, observe, guard", "Exodus says \"Remember the Sabbath\"; Deuteronomy says \"Observe the Sabbath\" (5:12). To keep it is to guard it carefully, like a watchman.", ["halot", "merrill"]]],
    refs: [["EXO.20", "Exodus 20:1-17", "The Ten Commandments first given"], ["MAT.19", "Matthew 19:17-19", "Keep the commandments"]],
  },
  6: {
    intro: "The heart of Deuteronomy: \"Hear, O Israel! The LORD is our God, the LORD is one! You shall love the LORD your God with all your heart and with all your soul and with all your might.\" Parents must teach these words to their children at home and on the road, at bedtime and at breakfast, and never forget the God who brought them out of slavery.",
    v: [
      ["6:4", "The Shema", "\"Hear\" (shema) begins Judaism's central confession, still prayed morning and evening."],
      ["6:5", "With all your heart", "Jesus calls this the great and foremost commandment (Matthew 22:37-38)."],
      ["6:7", "Teach them diligently to your sons", "Faith is taught in everyday life: sitting, walking, lying down, rising up."],
      ["6:12", "Watch yourself, that you do not forget", "When you enjoy houses you did not build and vineyards you did not plant, be careful not to forget the LORD who brought you out of slavery. Plenty can make us forget."],
      ["6:16", "Do not put the LORD to the test", "Jesus quoted this to Satan (Matthew 4:7)."],
    ],
    w: [["שְׁמַע", "shema", "H8085", "hear, listen, obey", "In Hebrew, to hear is to listen and respond. Hearing God means obeying Him.", ["halot"]]],
    refs: [["MAT.22", "Matthew 22:37-38", "The great commandment"], ["MRK.12", "Mark 12:29-30", "Hear, O Israel"], ["MAT.4", "Matthew 4:7", "You shall not put the Lord your God to the test"]],
  },
  7: {
    intro: "Israel must not make treaties or marriages with the nations of Canaan, or worship their gods. God chose Israel not because they were many, but because He loved them and kept His oath. He is the faithful God who keeps His covenant to a thousand generations.",
    v: [
      ["7:6", "A holy people", "Chosen to be God's own treasured possession."],
      ["7:7-8", "Because the LORD loved you", "God's choice rests on His love, not on Israel's greatness."],
      ["7:9", "The faithful God", "Keeping covenant and lovingkindness to a thousand generations."],
    ],
    bg: [["Chosen because loved", "\"The LORD did not set His love on you nor choose you because you were more in number... for you were the fewest of all peoples, but because the LORD loved you\" (7:7-8). God's choice rested on His love and His promise to Abraham, not on Israel's greatness.", "good", ["craigie", "wright"]]],
    refs: [["1PE.2", "1 Peter 2:9", "A people for God's own possession"], ["EPH.1", "Ephesians 1:4-5", "He chose us in love"]],
  },
  8: {
    intro: "Remember the forty years: God humbled you and fed you with manna to teach you that \"man does not live by bread alone, but by everything that proceeds out of the mouth of the LORD.\" When you are full and prosperous in the good land, do not forget God or say, \"My power made me rich.\"",
    v: [
      ["8:3", "Not by bread alone", "Jesus answers Satan with this verse (Matthew 4:4)."],
      ["8:4", "Your clothing did not wear out", "During forty years in the wilderness, their clothes did not wear out and their feet did not swell. God cared for them quietly every day."],
      ["8:5", "As a man disciplines his son", "Hardship can be loving training (Hebrews 12:5-11)."],
      ["8:18", "He gives you power to make wealth", "Remember the LORD your God, for He is the One who gives you the ability to produce wealth. Every good thing comes from Him."],
    ],
    bg: [["Not by bread alone", "God let Israel be hungry and fed them with manna \"that He might make you understand that man does not live by bread alone, but... by everything that proceeds out of the mouth of the LORD\" (8:3). Jesus answered the devil with these words (Matthew 4:4).", "strong", ["craigie", "block"]]],
    refs: [["MAT.4", "Matthew 4:4", "Man shall not live on bread alone"], ["HEB.12", "Hebrews 12:5-11", "The Lord disciplines those He loves"], ["JAS.1", "James 1:17", "Every good gift is from above"]],
  },
  9: {
    intro: "God will drive out the nations, but not because Israel is righteous: \"you are a stubborn people.\" Moses reminds them of the golden calf and their rebellions, and of how he lay on his face forty days and nights praying for them.",
    v: [
      ["9:4", "Not because of your righteousness", "The land is a gift of grace, and a judgment on the nations' wickedness."],
      ["9:7", "Remember", "Israel's story is honest about its failures."],
      ["9:26", "Your inheritance, whom You have redeemed", "Moses' prayer rests on God's own promises."],
    ],
    bg: [["Not because of your righteousness", "Moses warns Israel not to think, \"Because of my righteousness the LORD has brought me in\" (9:4). He reminds them of the golden calf and other rebellions. The land was a gift of grace.", "good", ["craigie", "wright"]]],
    w: [["עֹרֶף", "oreph", "H6203", "back of the neck", "\"A stubborn people,\" literally \"stiff of neck\" (9:6), like an ox that will not bend its neck to the yoke.", ["halot", "merrill"]]],
    refs: [["TIT.3", "Titus 3:5", "Not on the basis of deeds which we have done"], ["EXO.32", "Exodus 32", "The golden calf"]],
  },
  10: {
    intro: "God writes the commandments again on new tablets, kept in the ark. \"Now, Israel, what does the LORD your God require from you, but to fear the LORD your God, to walk in all His ways and love Him, and to serve the LORD your God with all your heart.\" Circumcise your heart, and love the stranger.",
    v: [
      ["10:12-13", "What does the LORD require?", "Fear, walk, love, serve, obey, \"for your good.\""],
      ["10:16", "Circumcise your heart", "The outward sign is meant to show an inner change (Romans 2:29)."],
      ["10:17-18", "He does justice for the orphan and the widow", "The great God shows no partiality and loves the stranger."],
    ],
    bg: [["Circumcise your heart", "\"Circumcise your heart, and stiffen your neck no longer\" (10:16). The outward sign was meant to go with an inward change. Deuteronomy 30:6 promises that God Himself will do it, and Paul speaks of \"circumcision of the heart, by the Spirit\" (Romans 2:29).", "good", ["craigie", "block"]]],
    w: [["מוּל", "mul", "H4135", "to circumcise", "To cut away. Used here for removing what makes a heart hard and closed to God.", ["halot", "wright"]]],
    refs: [["MIC.6", "Micah 6:8", "What does the LORD require of you?"], ["ROM.2", "Romans 2:29", "Circumcision of the heart"], ["JAS.1", "James 1:27", "Pure religion"]],
  },
  11: {
    intro: "Love God and keep His commands, and He will send rain in its season. The promised land is not like Egypt, watered by hand; it drinks rain from heaven, under God's eye. Teach these words to your children. Moses sets before them a blessing and a curse, to be proclaimed on Mounts Gerizim and Ebal.",
    v: [
      ["11:12", "The eyes of the LORD are always on it", "A land that depends on rain teaches trust."],
      ["11:18-19", "Bind them as a sign", "Words on hands, foreheads and doorposts: God's word everywhere."],
      ["11:26", "A blessing and a curse", "Moses sets before Israel a blessing and a curse: blessing if they obey the LORD's commands, curse if they turn to other gods. The choice is theirs."],
    ],
    bg: [["Watered by rain from heaven", "In Egypt, fields were watered from the Nile by irrigation, \"with your foot\" (11:10), perhaps by treading a water wheel or opening channels with the foot. Canaan was a land of hills and valleys that \"drinks water from the rain of heaven\" (11:11). Israel would depend on God for every rain.", "strong", ["craigie", "kitchen"]]],
    refs: [["DEU.27", "Deuteronomy 27:11-13", "Blessing and curse on the two mountains"], ["JOS.8", "Joshua 8:30-35", "Joshua does it"]],
  },
  12: {
    intro: "In the land, Israel must destroy the Canaanite shrines and worship only at the place God will choose to put His name. There they will bring offerings and rejoice before the LORD. Meat may be eaten anywhere, but not blood.",
    v: [
      ["12:5", "The place which the LORD will choose", "Israel was to worship at the place the LORD would choose for His name, first Shiloh and finally Jerusalem, not at Canaan's many shrines."],
      ["12:7", "Rejoice in all your undertakings", "There, with their families, they would eat before the LORD and rejoice in all they had done, because He had blessed them. Worship is meant to be joyful."],
      ["12:32", "Do not add to it nor take away", "Be careful to do everything God commands; do not add to it or take away from it. Revelation 22:18-19 echoes this."],
    ],
    why: "Many critical scholars connect Deuteronomy's demand for one place of worship with King Josiah's reforms in 622 BC (2 Kings 22-23), and date the book then.",
    views: [
      ["From Moses", "Others hold the book records Moses' own words, noting its treaty form, its setting before the conquest, and that it does not name Jerusalem.", ["kitchen", "merrill"]],
      ["Found and renewed under Josiah", "Many hold that the \"book of the law\" found in Josiah's day was Deuteronomy, at least in its main form, written or edited not long before.", ["wright"]],
    ],
    common: "Both views agree Deuteronomy shaped Israel's worship deeply, that Josiah's reform rested on it, and that Jesus quoted it more than almost any other book.",
    bg: [["The place God chooses", "Instead of worshiping at every hilltop shrine like the Canaanites, Israel was to bring offerings \"to the place which the LORD your God will choose\" (12:5). Later this became Jerusalem, where Solomon built the temple.", "good", ["craigie", "merrill"]]],
    refs: [["2KI.22", "2 Kings 22:8-13", "The book of the law found"], ["JHN.4", "John 4:20-24", "Worship in spirit and truth"]],
  },
  13: {
    intro: "Even if a prophet does a sign that comes true, if he says \"Let us follow other gods,\" do not listen: God is testing you. The same applies to a family member or a whole town that turns to idols.",
    v: [
      ["13:3", "The LORD your God is testing you", "Signs alone do not prove a message is from God; its faithfulness to God does."],
      ["13:4", "You shall follow the LORD your God", "Follow, fear, keep, listen, serve, cling."],
      ["13:6", "Your brother... or your friend who is as your own soul", "Loyalty to God comes before even the closest human ties."],
      ["13:14", "You shall investigate and search out and inquire thoroughly", "Before acting on a report of idol worship, the people had to investigate, search and ask carefully. No one was to be judged on rumor."],
    ],
    bg: [["Loyalty like a covenant", "Ancient treaties demanded total loyalty to the great king and required reporting any plot against him, even by family members. Deuteronomy uses that same language for Israel's covenant with the LORD. Paul quotes its refrain, \"purge the evil from among you,\" for church discipline (1 Corinthians 5:13), where the penalty is removal from fellowship, not death.", "good", ["craigie", "block"]]],
    refs: [["1CO.5", "1 Corinthians 5:13", "Remove the wicked man"], ["MAT.24", "Matthew 24:24", "False prophets will show great signs"], ["GAL.1", "Galatians 1:8", "Even if an angel preaches another gospel"]],
  },
  14: {
    intro: "Israel is God's holy people, so they must not cut themselves in mourning like their neighbors. The clean and unclean food laws are repeated. A tithe of the harvest is eaten in a joyful feast before God, and every third year it is stored for the Levite, the stranger, the orphan and the widow.",
    v: [
      ["14:2", "His own possession", "Israel was holy to the LORD, His treasured possession out of all peoples. That holiness reached into how they grieved (14:1) and what they ate."],
      ["14:23", "That you may learn to fear the LORD", "The tithe meal taught reverence through celebration."],
      ["14:29", "The orphan and the widow", "Giving cared for the needy so that God would bless."],
    ],
    bg: [["A tithe feast", "Part of Israel's tithe was eaten in a joyful meal before the LORD, shared with the Levites. Every third year the tithe was stored in the towns for the Levite, the stranger, the orphan and the widow (14:28-29).", "good", ["craigie", "wright"]]],
    refs: [["LEV.11", "Leviticus 11", "Clean and unclean animals"], ["1TH.4", "1 Thessalonians 4:13", "Do not grieve as those who have no hope"]],
  },
  15: {
    intro: "Every seventh year debts are cancelled. Do not be hardhearted or tightfisted toward a poor brother; give freely. Hebrew servants go free in the seventh year, sent away generously, because \"you were a slave in Egypt and the LORD redeemed you.\"",
    v: [
      ["15:4", "There will be no poor among you", "There need be no poor among you, God says, if you fully obey. It was the goal God set before His people."],
      ["15:7-8", "Open your hand wide", "If a fellow Israelite is in need, do not be hard-hearted or tight-fisted. Open your hand wide and lend whatever they need."],
      ["15:11", "The poor will never cease", "Jesus quotes this (Mark 14:7), with the command to open the hand."],
      ["15:14", "Furnish him liberally", "A released servant should leave with a start in life."],
    ],
    bg: [["The year of release", "Every seventh year, debts between Israelites were to be canceled (15:1-2), and Hebrew servants set free with generous gifts from flock, threshing floor and winepress (15:12-14). \"There will be no poor among you\" if God's people obey (15:4).", "good", ["craigie", "wright"]]],
    w: [["שְׁמִטָּה", "shemittah", "H8059", "release, remission", "Letting go of debts in the seventh year. The word is still used in Israel for the seventh-year rest of the land.", ["halot", "block"]]],
    refs: [["MRK.14", "Mark 14:7", "You always have the poor with you"], ["2CO.9", "2 Corinthians 9:6-7", "God loves a cheerful giver"], ["ACT.4", "Acts 4:34", "Not a needy person among them"]],
  },
  16: {
    intro: "The three pilgrim feasts: Passover with Unleavened Bread, the Feast of Weeks and the Feast of Booths, kept at the place God chooses, with rejoicing that includes servants, Levites, strangers, orphans and widows. Judges must be fair and take no bribes: \"Justice, and only justice, you shall pursue.\"",
    v: [
      ["16:3", "The bread of affliction", "Unleavened bread recalls the hurried night of escape."],
      ["16:14", "Rejoice in your feast", "Rejoice at your festival, you, your children, your servants, the Levite, the foreigner, the orphan and the widow. Everyone shares the celebration."],
      ["16:17", "As he is able", "Each gives according to the blessing God has given."],
      ["16:20", "Justice, and only justice", "Literally \"justice, justice you shall pursue.\""],
    ],
    bg: [["\"Justice, and only justice\"", "\"Justice, and only justice, you shall pursue\" (16:20), literally \"justice, justice.\" Judges were to take no bribes, \"for a bribe blinds the eyes of the wise\" (16:19).", "good", ["craigie", "wright"]]],
    refs: [["EXO.23", "Exodus 23:14-17", "Three times a year"], ["AMO.5", "Amos 5:24", "Let justice roll down like waters"]],
  },
  17: {
    intro: "Laws about faithful worship, trials with two or three witnesses, and hard cases taken to the priests and judge. If Israel ever wants a king, he must be chosen by God, must not multiply horses, wives or gold, and must write out a copy of God's law and read it all his life.",
    v: [
      ["17:6", "Two or three witnesses", "No one is condemned on one person's word."],
      ["17:16-17", "Not multiply horses, wives or silver", "Solomon broke all three (1 Kings 10-11)."],
      ["17:18-19", "A copy of this law", "The king himself must sit under God's word."],
    ],
    bg: [["The king's own copy", "Israel's king was to write a copy of God's law and read it all his life (17:18-19). The Greek translators rendered \"copy of this law\" as deuteronomion, \"second law,\" and that gave the book its English name, Deuteronomy.", "strong", ["craigie", "block"]]],
    w: [["מִשְׁנֶה", "mishneh", "H4932", "copy, second", "A duplicate or repetition. The king was not above the law; he was to live under it like everyone else (17:20).", ["halot", "merrill"]]],
    refs: [["1SA.8", "1 Samuel 8", "Israel asks for a king"], ["1KI.11", "1 Kings 11:1-4", "Solomon's wives"], ["2CO.13", "2 Corinthians 13:1", "Two or three witnesses"]],
  },
  18: {
    intro: "The priests and Levites live from the offerings. Israel must not practice the occult ways of Canaan: divination, sorcery, mediums or consulting the dead. Instead, God will raise up a prophet like Moses: \"I will put My words in his mouth.\" A prophet whose words do not come true has not spoken for God.",
    v: [
      ["18:10-11", "Detestable things", "Fortune-telling and contacting the dead are forbidden."],
      ["18:15", "A prophet like me", "Peter and Stephen say this prophet is Jesus (Acts 3:22; 7:37)."],
      ["18:22", "If the thing does not come about", "If a prophet speaks in the LORD's name and it does not happen, the LORD did not speak it. Do not be afraid of him."],
    ],
    bg: [["A prophet like Moses", "\"The LORD your God will raise up for you a prophet like me from among you... you shall listen to him\" (18:15). By Jesus' day people were watching for \"the Prophet\" (John 1:21), and Peter preached that Jesus is the one Moses spoke of (Acts 3:22-26).", "strong", ["craigie", "block"]]],
    refs: [["ACT.3", "Acts 3:22-23", "God will raise up a prophet like me"], ["JHN.6", "John 6:14", "This is truly the Prophet"], ["ISA.8", "Isaiah 8:19-20", "Should not a people consult their God?"]],
  },
  19: {
    intro: "Israel must set apart cities of refuge for accidental killers. Do not move a neighbor's boundary marker. One witness is not enough to convict; a false witness receives the punishment he intended for the accused.",
    v: [
      ["19:4-5", "Like a man in the forest", "An axe head flies off and kills a friend: a refuge protects the innocent."],
      ["19:14", "Your neighbor's boundary mark", "Boundary stones marked each family's land. Moving your neighbor's marker was a way of stealing land God had given."],
      ["19:19", "Do to him just as he had intended", "If a witness lied in court, he was to receive the punishment he meant for the accused. False testimony was taken very seriously."],
    ],
    bg: [["Cities of refuge", "Three cities (later six) were set apart where someone who killed another by accident could flee and be safe from the victim's avenging relative until a fair trial (19:1-10; Numbers 35). The roads to them were to be kept open.", "good", ["craigie", "merrill"]]],
    refs: [["NUM.35", "Numbers 35", "Cities of refuge"], ["PRO.22", "Proverbs 22:28", "Do not move the ancient boundary"]],
  },
  20: {
    intro: "Rules for war: do not be afraid of larger armies, for God goes with you. Those newly married, building a house or planting a vineyard, and the fainthearted, are sent home. Offer peace to distant cities first. Do not cut down fruit trees during a siege.",
    v: [
      ["20:1", "Do not be afraid", "Horses and chariots mean nothing against the God who brought you out of Egypt."],
      ["20:8", "Fainthearted", "Fear spreads. Gideon used this rule (Judges 7:3)."],
      ["20:19", "Is the tree of the field a man?", "Even in war, the land must be cared for."],
    ],
    bg: [["Rules for war", "Before battle, men who had built a new house, planted a new vineyard or just become engaged were sent home, and so were the fearful (20:5-8). Even in a siege, fruit trees were not to be cut down (20:19). War was limited by God's law.", "good", ["craigie", "wright"]]],
    refs: [["JDG.7", "Judges 7:2-3", "Whoever is afraid, let him return"], ["PSA.20", "Psalm 20:7", "Some boast in chariots"]],
  },
  21: {
    intro: "Rules for an unsolved murder, marrying a war captive, the rights of a firstborn son of an unloved wife, a stubborn and rebellious son, and burying an executed criminal before nightfall, \"for he who is hanged is accursed of God.\"",
    v: [
      ["21:8", "Forgive Your people", "When a murder went unsolved, the nearest town's elders asked God: forgive Your people Israel. Even unknown guilt needed atonement."],
      ["21:17", "A double portion", "The firstborn's rights could not be taken away out of favoritism."],
      ["21:23", "Accursed of God", "Paul writes that Christ became a curse for us by hanging on a tree (Galatians 3:13)."],
    ],
    bg: [["Cursed on a tree", "If an executed criminal's body was hung on a tree, it had to be buried the same day, \"for he who is hanged is accursed of God\" (21:23). Paul quotes this: Christ became a curse for us when He hung on the cross (Galatians 3:13).", "strong", ["craigie", "block"]]],
    refs: [["GAL.3", "Galatians 3:13", "Christ redeemed us from the curse"], ["JHN.19", "John 19:31", "The bodies should not remain on the cross"]],
  },
  22: {
    intro: "Laws of neighborliness and purity: return a lost animal, help a fallen donkey, do not mix certain things, put a railing on your roof, and laws about marriage and sexual sin.",
    v: [
      ["22:1-3", "You cannot hide yourself", "If you see your neighbor's ox, sheep or anything else lost, do not ignore it. Take it home and keep it until they come for it."],
      ["22:8", "A parapet for your roof", "Flat roofs were living spaces. Love takes care that others are not hurt."],
      ["22:22", "Purge the evil", "Adultery was punished severely to purge evil from Israel. God guards marriage as sacred."],
    ],
    bg: [["A railing on the roof", "Flat roofs were used for work, sleeping and visiting, so a new house had to have a low wall around the roof \"that you will not bring bloodguilt on your house if anyone falls from it\" (22:8). Loving your neighbor included building safely.", "good", ["craigie", "wright"]]],
    w: [["מַעֲקֶה", "ma'aqeh", "H4624", "parapet, railing", "A low wall around a roof. Found only here in the Bible.", ["halot", "merrill"]]],
    refs: [["LUK.10", "Luke 10:29-37", "Who is my neighbor?"], ["HEB.13", "Hebrews 13:4", "Let marriage be held in honor"]],
  },
  23: {
    intro: "Laws about who may enter the assembly, keeping the camp clean because God walks in it, protecting runaway slaves, interest, vows, and eating from a neighbor's field without harvesting it.",
    v: [
      ["23:14", "The LORD walks in the midst of your camp", "Even the toilet rules rest on God's presence."],
      ["23:15-16", "Do not hand over a runaway slave", "Unique in the ancient world, where other law codes demanded their return.", "good", ["wright"]],
      ["23:25", "Pluck the heads with your hand", "Passing through a neighbor's grain field, you may pick some heads with your hand, but not use a sickle. Jesus' disciples did this (Mark 2:23)."],
    ],
    bg: [["Edom, your brother", "\"You shall not detest an Edomite, for he is your brother; you shall not detest an Egyptian, because you were an alien in his land\" (23:7). Even old wrongs were to be weighed against kinship and past kindness.", "good", ["craigie", "wright"]]],
    refs: [["MRK.2", "Mark 2:23", "Picking heads of grain"], ["ECC.5", "Ecclesiastes 5:4", "Do not be late in paying a vow"]],
  },
  24: {
    intro: "Laws about divorce and remarriage, a newlywed's year at home, kidnapping, loans and pledges, paying wages the same day, fairness to the stranger and orphan, and leaving forgotten sheaves for the poor.",
    v: [
      ["24:1", "A certificate of divorce", "Jesus said Moses permitted it \"because of your hardness of heart\" (Matthew 19:8)."],
      ["24:5", "Happiness to his wife", "A new husband was free from war for a year."],
      ["24:15", "Before the sun sets", "Pay a poor worker their wages each day before sunset, because they are counting on it. James 5:4 warns against holding back wages."],
      ["24:19", "A forgotten sheaf", "If you forget a bundle of grain in the field, do not go back for it. Leave it for the foreigner, orphan and widow, so the LORD will bless you."],
    ],
    bg: [["Leave some for the poor", "Farmers were not to go back for a forgotten sheaf, or beat the olive branches twice, or glean the vineyard twice: what was left was for the stranger, the orphan and the widow (24:19-21). This is the law that let Ruth glean in Boaz's field.", "good", ["craigie", "wright"]]],
    refs: [["MAT.19", "Matthew 19:3-9", "Jesus on divorce"], ["JAS.5", "James 5:4", "The wages you withheld"], ["RUT.2", "Ruth 2", "Gleaning"]],
  },
  25: {
    intro: "Punishments are limited to forty lashes. Do not muzzle an ox while it threshes. A brother-in-law should marry his brother's widow. Use honest weights. Remember what Amalek did.",
    v: [
      ["25:3", "Forty lashes", "Later Jewish practice gave thirty-nine to be safe; Paul received this five times (2 Corinthians 11:24)."],
      ["25:4", "Do not muzzle the ox", "Paul uses it to say workers in the gospel deserve support (1 Corinthians 9:9)."],
      ["25:5-6", "His brother's widow", "If a man died without a son, his brother was to marry the widow, so the dead man's name would continue. This custom stands behind the story of Ruth and Boaz."],
      ["25:15", "A full and just weight", "Use full and honest weights and measures, so you may live long in the land. Honest business is part of godliness."],
    ],
    bg: [["Do not muzzle the ox", "\"You shall not muzzle the ox while he is threshing\" (25:4): let the animal eat as it works. Paul applies it to those who preach the gospel being supported by those they serve (1 Corinthians 9:9; 1 Timothy 5:18).", "strong", ["craigie", "block"]]],
    refs: [["1CO.9", "1 Corinthians 9:9-10", "Do not muzzle the ox"], ["1TI.5", "1 Timothy 5:18", "The laborer is worthy"], ["RUT.4", "Ruth 4", "The kinsman redeemer"]],
  },
  26: {
    intro: "When they enter the land, each Israelite is to bring firstfruits in a basket and say, \"My father was a wandering Aramean...\" telling the story of the exodus. The third-year tithe is given to the needy. Israel and God declare their commitment to each other.",
    v: [
      ["26:5", "A wandering Aramean was my father", "Jacob. Every worshiper retells the story of grace."],
      ["26:11", "Rejoice in all the good", "After bringing their firstfruits, the people were to rejoice in all the good God had given them, along with the Levite and the foreigner."],
      ["26:17-18", "You have declared... the LORD has declared", "Israel declared that the LORD is their God, and the LORD declared that Israel is His treasured people. A covenant of promises on both sides."],
    ],
    bg: [["\"My father was a wandering Aramean\"", "When bringing firstfruits, the worshiper recited Israel's story: \"My father was a wandering Aramean\" (Jacob), who went down to Egypt, was enslaved, and was brought out by God to this land (26:5-9). Every harvest became a reminder of God's rescue.", "strong", ["craigie", "block"]]],
    refs: [["1PE.2", "1 Peter 2:9-10", "Once not a people, now the people of God"], ["PSA.105", "Psalm 105", "Remember His wonders"]],
  },
  27: {
    intro: "When Israel crosses the Jordan, they are to set up plastered stones on Mount Ebal with the law written on them and build an altar. Six tribes stand on Gerizim to bless and six on Ebal for the curses, and the Levites call out twelve curses, each answered by the people's \"Amen.\"",
    v: [
      ["27:3", "Write on them all the words", "God's law set up in public for all to see."],
      ["27:15", "Amen", "At Mount Ebal the Levites read out curses on hidden sins, and after each one all the people said Amen, agreeing with God's judgment."],
      ["27:26", "Cursed is he who does not confirm the words", "Paul quotes this to show no one keeps the law perfectly, and that Christ took the curse (Galatians 3:10-13)."],
    ],
    bg: [["An altar on Mount Ebal", "A stone structure found on Mount Ebal in the 1980s has been identified by its excavator as an early Israelite altar from about 1200 BC. Others think it was a farmstead or watchtower.", "debated", ["kitchen"]]],
    refs: [["JOS.8", "Joshua 8:30-35", "Joshua builds the altar"], ["GAL.3", "Galatians 3:10-13", "Christ redeemed us from the curse"]],
  },
  28: {
    intro: "A long chapter of blessings for obedience (in the city and the field, coming in and going out) and much longer curses for disobedience: disease, defeat, siege, famine and exile among the nations, \"from one end of the earth to the other.\"",
    v: [
      ["28:1-2", "If you diligently obey", "If Israel fully obeyed the LORD, all these blessings would come upon them and overtake them, as if chasing them down."],
      ["28:13", "The head and not the tail", "God's blessing makes His people a light to others."],
      ["28:36", "A nation which neither you nor your fathers have known", "Fulfilled in the exiles to Assyria and Babylon."],
      ["28:64", "Scattered among all peoples", "A sobering prophecy of Israel's long history."],
    ],
    bg: [["Blessings and curses", "Ancient treaties between a great king and a lesser king ended with blessings for loyalty and curses for rebellion. The Assyrian treaties of King Esarhaddon (672 BC) list curses very much like 28:23-35, such as a sky of bronze. Deuteronomy follows a familiar treaty form, but with the LORD as the great King.", "strong", ["craigie", "kitchen"]]],
    refs: [["LEV.26", "Leviticus 26", "Blessings and curses"], ["2KI.17", "2 Kings 17:7-23", "Israel exiled"], ["2KI.25", "2 Kings 25", "Judah exiled"]],
  },
  29: {
    intro: "Moses calls Israel to renew the covenant, including their little ones, the strangers, and \"those who are not with us here today.\" He warns against a root bearing bitter poison. \"The secret things belong to the LORD our God, but the things revealed belong to us and to our sons forever.\"",
    v: [
      ["29:4", "Not a heart to know", "Even after all the miracles, real understanding is God's gift (Romans 11:8)."],
      ["29:15", "Those who are not with us here today", "God made this covenant not only with those standing there that day but also with those not yet born. Future generations were included."],
      ["29:29", "The secret things belong to the LORD", "Some things God has not told us. We are responsible for what He has revealed."],
    ],
    bg: [["The secret things", "\"The secret things belong to the LORD our God, but the things revealed belong to us and to our sons forever, that we may observe all the words of this law\" (29:29). God has not told us everything, but He has told us enough to obey Him.", "good", ["craigie", "wright"]]],
    refs: [["ROM.11", "Romans 11:8", "Eyes to see not"], ["HEB.12", "Hebrews 12:15", "No root of bitterness"]],
  },
  30: {
    intro: "Even after exile, if Israel returns to God with all their heart, He will restore them and \"circumcise your heart\" to love Him. His word is not too hard or far away: \"the word is very near you, in your mouth and in your heart.\" \"I have set before you life and death, the blessing and the curse. So choose life.\"",
    v: [
      ["30:6", "God will circumcise your heart", "What God commanded (10:16), He promises to do. Jeremiah 31:33 and Ezekiel 36:26 build on this."],
      ["30:11-14", "Not too difficult", "Paul applies these words to the gospel in Romans 10:6-8."],
      ["30:19", "Choose life", "\"That you may live, you and your descendants.\""],
      ["30:20", "He is your life", "Loving God, obeying Him and holding fast to Him is life itself."],
    ],
    bg: [["The word is near you", "God's command is not too hard or far away, not up in heaven or across the sea: \"the word is very near you, in your mouth and in your heart\" (30:11-14). Paul applies this to the gospel of faith in Christ (Romans 10:6-8). \"So choose life\" (30:19).", "strong", ["craigie", "block"]]],
    refs: [["ROM.10", "Romans 10:6-10", "The word is near you"], ["JER.31", "Jeremiah 31:33", "I will write it on their heart"], ["JHN.10", "John 10:10", "Life abundantly"]],
  },
  31: {
    intro: "Moses, now 120, tells Israel that Joshua will lead them across. \"Be strong and courageous... He will not fail you or forsake you.\" Moses writes the law and orders it read to all Israel every seven years. God tells Moses Israel will turn away, and gives him a song to teach them as a witness.",
    v: [
      ["31:6", "He will not fail you", "Hebrews 13:5 quotes this promise for every believer."],
      ["31:8", "The LORD is the one who goes ahead of you", "Moses tells Joshua: the LORD Himself goes before you and will be with you. He will never leave you or forsake you. Do not be afraid."],
      ["31:12", "Assemble the people, men, women, children and the alien", "Every seven years the law was to be read to everyone, men, women, children and the foreigners in their towns, so all would learn to fear the LORD."],
    ],
    bg: [["Read every seven years", "Every seventh year, at the Feast of Booths, the law was to be read aloud to all Israel, men, women, children and strangers (31:10-13). Ezra did this after the exile (Nehemiah 8).", "good", ["craigie", "merrill"]]],
    refs: [["HEB.13", "Hebrews 13:5", "I will never desert you"], ["JOS.1", "Joshua 1:5-9", "Be strong and courageous"]],
  },
  32: {
    intro: "The Song of Moses: heaven and earth are called as witnesses. God is the Rock, perfect and just. He found Israel in the wilderness and cared for them like an eagle with its young, but they grew fat and forsook Him. He will judge, yet He will vindicate His people. God then tells Moses to climb Mount Nebo to see the land and die there.",
    v: [
      ["32:4", "The Rock", "\"His work is perfect, for all His ways are just; a God of faithfulness and without injustice.\""],
      ["32:11", "Like an eagle that stirs up its nest", "Like an eagle that stirs up its nest and spreads its wings to catch its young, God trained and carried His people."],
      ["32:15", "Jeshurun grew fat and kicked", "Jeshurun, a pet name meaning \"upright one,\" grew fat and kicked. Comfort made Israel forget the Rock who saved them."],
      ["32:35", "Vengeance is Mine", "Quoted in Romans 12:19 and Hebrews 10:30."],
      ["32:47", "It is your life", "Moses says these words are not empty words for you; they are your life. By them you will live long in the land."],
    ],
    bg: [["The Song of Moses", "Moses taught Israel a song to remember (32:1-43). God found Israel in a desert land and guarded him \"as the pupil of His eye,\" like an eagle that stirs its nest and carries its young on its wings (32:10-11). Paul and Hebrews quote this song (Romans 12:19; Hebrews 10:30).", "good", ["craigie", "block"]]],
    w: [["נֶשֶׁר", "nesher", "H5404", "eagle, vulture", "A great bird of prey. God bore Israel \"on eagles' wings\" (Exodus 19:4), teaching them to fly while keeping them safe.", ["halot", "merrill"]]],
    refs: [["ROM.12", "Romans 12:19", "Vengeance is Mine"], ["REV.15", "Revelation 15:3", "The song of Moses"], ["1CO.10", "1 Corinthians 10:4", "The Rock was Christ"]],
  },
  33: {
    intro: "Moses blesses the tribes of Israel one by one before his death. It ends: \"The eternal God is a dwelling place, and underneath are the everlasting arms... Blessed are you, O Israel; who is like you, a people saved by the LORD?\"",
    v: [
      ["33:3", "He loves the people", "In Moses' final blessing: surely He loves His people; all His holy ones are in His hand."],
      ["33:12", "The beloved of the LORD", "Benjamin dwells securely between His shoulders."],
      ["33:27", "The everlasting arms", "One of the Bible's most comforting lines."],
      ["33:29", "Saved by the LORD", "Blessed are you, Israel! Who is like you, a people saved by the LORD? He is their shield and their glorious sword."],
    ],
    bg: [["Moses blesses the tribes", "Like Jacob in Genesis 49, Moses blesses each tribe before his death. \"The eternal God is a dwelling place, and underneath are the everlasting arms\" (33:27).", "good", ["craigie", "merrill"]]],
    w: [["יְשֻׁרוּן", "Yeshurun", "H3484", "Jeshurun", "A poetic name for Israel, probably meaning \"upright one\" (33:5, 26). It reminds Israel what God called them to be.", ["halot", "block"]]],
    refs: [["GEN.49", "Genesis 49", "Jacob blesses his sons"], ["PSA.90", "Psalm 90:1", "You have been our dwelling place"]],
  },
  34: {
    intro: "Moses climbs Mount Nebo, and God shows him the whole land. He dies there at 120, his eyes not dim, and God buries him in Moab; no one knows the place. Israel mourns thirty days. Joshua is full of the spirit of wisdom. \"Since then no prophet has risen in Israel like Moses, whom the LORD knew face to face.\"",
    v: [
      ["34:4", "You shall not go over there", "Moses sees the land; he will stand in it with Jesus on the mount of transfiguration (Matthew 17:3)."],
      ["34:6", "He buried him", "God Himself buried Moses in a valley in Moab, and to this day no one knows where his grave is."],
      ["34:10", "Face to face", "No one like Moses, until the Prophet he spoke of (18:15)."],
    ],
    why: "If Moses wrote the Torah, who wrote the account of his own death and burial?",
    views: [
      ["Added by Joshua or another", "Most who hold that Moses wrote the Torah say Joshua or another inspired writer added this final chapter, and perhaps a few notes like \"to this day.\"", ["merrill", "craigie"]],
      ["Written much later", "Others see the phrase \"since then no prophet has risen like Moses\" as written long afterward, as part of a later final edition.", ["wright"]],
    ],
    common: "All agree the chapter honors Moses as the greatest prophet of the old covenant and points ahead to the greater Prophet God promised.",
    bg: [["Moses' death on Nebo", "From Mount Nebo, across the Jordan from Jericho, Moses saw the promised land, and there he died. God buried him, \"but no man knows his burial place to this day\" (34:6). Jewish tradition says Joshua wrote this last chapter.", "good", ["craigie", "merrill"]]],
    refs: [["MAT.17", "Matthew 17:1-3", "Moses and Elijah with Jesus"], ["JUD.1", "Jude 1:9", "Michael disputed about the body of Moses"], ["HEB.3", "Hebrews 3:5-6", "Moses a servant, Christ a Son"]],
  },
});
