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
      ["1:32", "You did not trust the LORD", "The reason for the wandering."],
    ],
    bg: [["A covenant document", "Deuteronomy follows the pattern of ancient treaties between a great king and his people: preamble, history, laws, blessings and curses, witnesses. The closest matches are Hittite treaties of about 1400-1200 BC.", "good", ["kitchen", "craigie"]]],
    refs: [["NUM.13", "Numbers 13-14", "The spies and the refusal"], ["HEB.3", "Hebrews 3:16-19", "They could not enter because of unbelief"]],
  },
  2: {
    intro: "Moses recalls the years of wandering and God's instructions not to fight Edom, Moab or Ammon, because God had given them their lands. Then God gives Sihon king of Heshbon into Israel's hand.",
    v: [
      ["2:5", "Do not provoke them", "God gave land to Esau's descendants too."],
      ["2:7", "You have not lacked a thing", "Forty years of God's care."],
      ["2:14-15", "Until all the generation perished", "The hand of the LORD was against them."],
    ],
    refs: [["NUM.21", "Numbers 21:21-31", "The defeat of Sihon"], ["ACT.17", "Acts 17:26", "He determined the boundaries of their habitation"]],
  },
  3: {
    intro: "Israel defeats Og king of Bashan, whose iron bed is still shown in Rabbah. The land east of the Jordan is given to Reuben, Gad and half of Manasseh. Moses pleads to cross into the land, but God says, \"Enough! Speak to Me no more of this matter,\" and lets him see it from Pisgah.",
    v: [
      ["3:11", "An iron bedstead", "Og's bed was about 13 by 6 feet."],
      ["3:24", "You have begun to show Your greatness", "Moses longs to see more of what God will do."],
      ["3:28", "Charge Joshua", "Moses' task now is to strengthen his successor."],
    ],
    refs: [["NUM.21", "Numbers 21:33-35", "Og defeated"], ["DEU.34", "Deuteronomy 34:1-4", "Moses sees the land"]],
  },
  4: {
    intro: "Moses urges Israel to listen and obey, and never forget what they saw at Horeb: God spoke from the fire, and they saw no form, so they must make no idol. If they turn away, they will be scattered, but if they seek God with all their heart they will find Him. \"The LORD, He is God in heaven above and on the earth below; there is no other.\"",
    v: [
      ["4:7", "So near", "What other nation has a God so near whenever they call?"],
      ["4:9", "Make them known to your sons and grandsons", "Faith passed down."],
      ["4:15-16", "You did not see any form", "God's people worship the God who speaks, not an image."],
      ["4:29", "You will find Him", "\"If you search for Him with all your heart and all your soul.\""],
      ["4:31", "A compassionate God", "He will not fail you or forget His covenant."],
    ],
    refs: [["JER.29", "Jeremiah 29:13", "You will seek Me and find Me"], ["ACT.17", "Acts 17:27", "He is not far from each one of us"], ["ROM.10", "Romans 10:8", "The word is near you"]],
  },
  5: {
    intro: "Moses repeats the Ten Commandments to the new generation: \"The LORD our God made a covenant with us at Horeb... with us, all those of us alive here today.\" He recalls the people's fear at the mountain and God's wish: \"Oh that they had such a heart in them, that they would fear Me.\"",
    v: [
      ["5:3", "With us, all of us alive here today", "Each generation must own the covenant for itself."],
      ["5:15", "Remember that you were a slave", "Here the Sabbath is also tied to rescue from Egypt, so servants must rest too."],
      ["5:29", "Oh that they had such a heart", "God longs for His people's hearts."],
    ],
    refs: [["EXO.20", "Exodus 20:1-17", "The Ten Commandments first given"], ["MAT.19", "Matthew 19:17-19", "Keep the commandments"]],
  },
  6: {
    intro: "The heart of Deuteronomy: \"Hear, O Israel! The LORD is our God, the LORD is one! You shall love the LORD your God with all your heart and with all your soul and with all your might.\" Parents must teach these words to their children at home and on the road, at bedtime and at breakfast, and never forget the God who brought them out of slavery.",
    v: [
      ["6:4", "The Shema", "\"Hear\" (shema) begins Judaism's central confession, still prayed morning and evening."],
      ["6:5", "With all your heart", "Jesus calls this the great and foremost commandment (Matthew 22:37-38)."],
      ["6:7", "Teach them diligently to your sons", "Faith is taught in everyday life: sitting, walking, lying down, rising up."],
      ["6:12", "Watch yourself, that you do not forget", "Plenty can make people forget God."],
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
    refs: [["1PE.2", "1 Peter 2:9", "A people for God's own possession"], ["EPH.1", "Ephesians 1:4-5", "He chose us in love"]],
  },
  8: {
    intro: "Remember the forty years: God humbled you and fed you with manna to teach you that \"man does not live by bread alone, but by everything that proceeds out of the mouth of the LORD.\" When you are full and prosperous in the good land, do not forget God or say, \"My power made me rich.\"",
    v: [
      ["8:3", "Not by bread alone", "Jesus answers Satan with this verse (Matthew 4:4)."],
      ["8:4", "Your clothing did not wear out", "God's quiet daily care."],
      ["8:5", "As a man disciplines his son", "Hardship can be loving training (Hebrews 12:5-11)."],
      ["8:18", "He gives you power to make wealth", "Every good thing comes from God."],
    ],
    refs: [["MAT.4", "Matthew 4:4", "Man shall not live on bread alone"], ["HEB.12", "Hebrews 12:5-11", "The Lord disciplines those He loves"], ["JAS.1", "James 1:17", "Every good gift is from above"]],
  },
  9: {
    intro: "God will drive out the nations, but not because Israel is righteous: \"you are a stubborn people.\" Moses reminds them of the golden calf and their rebellions, and of how he lay on his face forty days and nights praying for them.",
    v: [
      ["9:4", "Not because of your righteousness", "The land is a gift of grace, and a judgment on the nations' wickedness."],
      ["9:7", "Remember", "Israel's story is honest about its failures."],
      ["9:26", "Your inheritance, whom You have redeemed", "Moses' prayer rests on God's own promises."],
    ],
    refs: [["TIT.3", "Titus 3:5", "Not on the basis of deeds which we have done"], ["EXO.32", "Exodus 32", "The golden calf"]],
  },
  10: {
    intro: "God writes the commandments again on new tablets, kept in the ark. \"Now, Israel, what does the LORD your God require from you, but to fear the LORD your God, to walk in all His ways and love Him, and to serve the LORD your God with all your heart.\" Circumcise your heart, and love the stranger.",
    v: [
      ["10:12-13", "What does the LORD require?", "Fear, walk, love, serve, obey, \"for your good.\""],
      ["10:16", "Circumcise your heart", "The outward sign is meant to show an inner change (Romans 2:29)."],
      ["10:17-18", "He does justice for the orphan and the widow", "The great God shows no partiality and loves the stranger."],
    ],
    refs: [["MIC.6", "Micah 6:8", "What does the LORD require of you?"], ["ROM.2", "Romans 2:29", "Circumcision of the heart"], ["JAS.1", "James 1:27", "Pure religion"]],
  },
  11: {
    intro: "Love God and keep His commands, and He will send rain in its season. The promised land is not like Egypt, watered by hand; it drinks rain from heaven, under God's eye. Teach these words to your children. Moses sets before them a blessing and a curse, to be proclaimed on Mounts Gerizim and Ebal.",
    v: [
      ["11:12", "The eyes of the LORD are always on it", "A land that depends on rain teaches trust."],
      ["11:18-19", "Bind them as a sign", "Words on hands, foreheads and doorposts: God's word everywhere."],
      ["11:26", "A blessing and a curse", "The choice is Israel's."],
    ],
    refs: [["DEU.27", "Deuteronomy 27:11-13", "Blessing and curse on the two mountains"], ["JOS.8", "Joshua 8:30-35", "Joshua does it"]],
  },
  12: {
    intro: "In the land, Israel must destroy the Canaanite shrines and worship only at the place God will choose to put His name. There they will bring offerings and rejoice before the LORD. Meat may be eaten anywhere, but not blood.",
    v: [
      ["12:5", "The place which the LORD will choose", "Later Shiloh, and finally Jerusalem."],
      ["12:7", "Rejoice in all your undertakings", "Worship is meant to be joyful."],
      ["12:32", "Do not add to it nor take away", "Revelation 22:18-19 echoes this."],
    ],
    why: "Many critical scholars connect Deuteronomy's demand for one place of worship with King Josiah's reforms in 622 BC (2 Kings 22-23), and date the book then.",
    views: [
      ["From Moses", "Others hold the book records Moses' own words, noting its treaty form, its setting before the conquest, and that it does not name Jerusalem.", ["kitchen", "merrill"]],
      ["Found and renewed under Josiah", "Many hold that the \"book of the law\" found in Josiah's day was Deuteronomy, at least in its main form, written or edited not long before.", ["wright"]],
    ],
    common: "Both views agree Deuteronomy shaped Israel's worship deeply, that Josiah's reform rested on it, and that Jesus quoted it more than almost any other book.",
    refs: [["2KI.22", "2 Kings 22:8-13", "The book of the law found"], ["JHN.4", "John 4:20-24", "Worship in spirit and truth"]],
  },
  13: {
    intro: "Even if a prophet does a sign that comes true, if he says \"Let us follow other gods,\" do not listen: God is testing you. The same applies to a family member or a whole town that turns to idols.",
    v: [
      ["13:3", "The LORD your God is testing you", "Signs alone do not prove a message is from God; its faithfulness to God does."],
      ["13:4", "You shall follow the LORD your God", "Follow, fear, keep, listen, serve, cling."],
    ],
    refs: [["MAT.24", "Matthew 24:24", "False prophets will show great signs"], ["GAL.1", "Galatians 1:8", "Even if an angel preaches another gospel"]],
  },
  14: {
    intro: "Israel is God's holy people, so they must not cut themselves in mourning like their neighbors. The clean and unclean food laws are repeated. A tithe of the harvest is eaten in a joyful feast before God, and every third year it is stored for the Levite, the stranger, the orphan and the widow.",
    v: [
      ["14:2", "His own possession", "Holiness reaches into grief and diet."],
      ["14:23", "That you may learn to fear the LORD", "The tithe meal taught reverence through celebration."],
      ["14:29", "The orphan and the widow", "Giving cared for the needy so that God would bless."],
    ],
    refs: [["LEV.11", "Leviticus 11", "Clean and unclean animals"], ["1TH.4", "1 Thessalonians 4:13", "Do not grieve as those who have no hope"]],
  },
  15: {
    intro: "Every seventh year debts are cancelled. Do not be hardhearted or tightfisted toward a poor brother; give freely. Hebrew servants go free in the seventh year, sent away generously, because \"you were a slave in Egypt and the LORD redeemed you.\"",
    v: [
      ["15:4", "There will be no poor among you", "The goal, if Israel obeys."],
      ["15:7-8", "Open your hand wide", "Generosity is commanded."],
      ["15:11", "The poor will never cease", "Jesus quotes this (Mark 14:7), with the command to open the hand."],
      ["15:14", "Furnish him liberally", "A released servant should leave with a start in life."],
    ],
    refs: [["MRK.14", "Mark 14:7", "You always have the poor with you"], ["2CO.9", "2 Corinthians 9:6-7", "God loves a cheerful giver"], ["ACT.4", "Acts 4:34", "Not a needy person among them"]],
  },
  16: {
    intro: "The three pilgrim feasts: Passover with Unleavened Bread, the Feast of Weeks and the Feast of Booths, kept at the place God chooses, with rejoicing that includes servants, Levites, strangers, orphans and widows. Judges must be fair and take no bribes: \"Justice, and only justice, you shall pursue.\"",
    v: [
      ["16:3", "The bread of affliction", "Unleavened bread recalls the hurried night of escape."],
      ["16:14", "Rejoice in your feast", "Everyone shares the celebration."],
      ["16:17", "As he is able", "Each gives according to the blessing God has given."],
      ["16:20", "Justice, and only justice", "Literally \"justice, justice you shall pursue.\""],
    ],
    refs: [["EXO.23", "Exodus 23:14-17", "Three times a year"], ["AMO.5", "Amos 5:24", "Let justice roll down like waters"]],
  },
  17: {
    intro: "Laws about faithful worship, trials with two or three witnesses, and hard cases taken to the priests and judge. If Israel ever wants a king, he must be chosen by God, must not multiply horses, wives or gold, and must write out a copy of God's law and read it all his life.",
    v: [
      ["17:6", "Two or three witnesses", "No one is condemned on one person's word."],
      ["17:16-17", "Not multiply horses, wives or silver", "Solomon broke all three (1 Kings 10-11)."],
      ["17:18-19", "A copy of this law", "The king himself must sit under God's word."],
    ],
    refs: [["1SA.8", "1 Samuel 8", "Israel asks for a king"], ["1KI.11", "1 Kings 11:1-4", "Solomon's wives"], ["2CO.13", "2 Corinthians 13:1", "Two or three witnesses"]],
  },
  18: {
    intro: "The priests and Levites live from the offerings. Israel must not practice the occult ways of Canaan: divination, sorcery, mediums or consulting the dead. Instead, God will raise up a prophet like Moses: \"I will put My words in his mouth.\" A prophet whose words do not come true has not spoken for God.",
    v: [
      ["18:10-11", "Detestable things", "Fortune-telling and contacting the dead are forbidden."],
      ["18:15", "A prophet like me", "Peter and Stephen say this prophet is Jesus (Acts 3:22; 7:37)."],
      ["18:22", "If the thing does not come about", "A test of a true prophet."],
    ],
    refs: [["ACT.3", "Acts 3:22-23", "God will raise up a prophet like me"], ["JHN.6", "John 6:14", "This is truly the Prophet"], ["ISA.8", "Isaiah 8:19-20", "Should not a people consult their God?"]],
  },
  19: {
    intro: "Israel must set apart cities of refuge for accidental killers. Do not move a neighbor's boundary marker. One witness is not enough to convict; a false witness receives the punishment he intended for the accused.",
    v: [
      ["19:4-5", "Like a man in the forest", "An axe head flies off and kills a friend: a refuge protects the innocent."],
      ["19:14", "Your neighbor's boundary mark", "Moving it was stealing land."],
      ["19:19", "Do to him just as he had intended", "Lying in court is punished severely."],
    ],
    refs: [["NUM.35", "Numbers 35", "Cities of refuge"], ["PRO.22", "Proverbs 22:28", "Do not move the ancient boundary"]],
  },
  20: {
    intro: "Rules for war: do not be afraid of larger armies, for God goes with you. Those newly married, building a house or planting a vineyard, and the fainthearted, are sent home. Offer peace to distant cities first. Do not cut down fruit trees during a siege.",
    v: [
      ["20:1", "Do not be afraid", "Horses and chariots mean nothing against the God who brought you out of Egypt."],
      ["20:8", "Fainthearted", "Fear spreads. Gideon used this rule (Judges 7:3)."],
      ["20:19", "Is the tree of the field a man?", "Even in war, the land must be cared for."],
    ],
    refs: [["JDG.7", "Judges 7:2-3", "Whoever is afraid, let him return"], ["PSA.20", "Psalm 20:7", "Some boast in chariots"]],
  },
  21: {
    intro: "Rules for an unsolved murder, marrying a war captive, the rights of a firstborn son of an unloved wife, a stubborn and rebellious son, and burying an executed criminal before nightfall, \"for he who is hanged is accursed of God.\"",
    v: [
      ["21:8", "Forgive Your people", "Even unsolved guilt needs atonement."],
      ["21:17", "A double portion", "The firstborn's rights could not be taken away out of favoritism."],
      ["21:23", "Accursed of God", "Paul writes that Christ became a curse for us by hanging on a tree (Galatians 3:13)."],
    ],
    refs: [["GAL.3", "Galatians 3:13", "Christ redeemed us from the curse"], ["JHN.19", "John 19:31", "The bodies should not remain on the cross"]],
  },
  22: {
    intro: "Laws of neighborliness and purity: return a lost animal, help a fallen donkey, do not mix certain things, put a railing on your roof, and laws about marriage and sexual sin.",
    v: [
      ["22:1-3", "You cannot hide yourself", "Do not ignore a neighbor's loss."],
      ["22:8", "A parapet for your roof", "Flat roofs were living spaces. Love takes care that others are not hurt."],
      ["22:22", "Purge the evil", "Marriage is guarded as sacred."],
    ],
    refs: [["LUK.10", "Luke 10:29-37", "Who is my neighbor?"], ["HEB.13", "Hebrews 13:4", "Let marriage be held in honor"]],
  },
  23: {
    intro: "Laws about who may enter the assembly, keeping the camp clean because God walks in it, protecting runaway slaves, interest, vows, and eating from a neighbor's field without harvesting it.",
    v: [
      ["23:14", "The LORD walks in the midst of your camp", "Even the toilet rules rest on God's presence."],
      ["23:15-16", "Do not hand over a runaway slave", "Unique in the ancient world, where other law codes demanded their return.", "good", ["wright"]],
      ["23:25", "Pluck the heads with your hand", "Jesus' disciples did this (Mark 2:23)."],
    ],
    refs: [["MRK.2", "Mark 2:23", "Picking heads of grain"], ["ECC.5", "Ecclesiastes 5:4", "Do not be late in paying a vow"]],
  },
  24: {
    intro: "Laws about divorce and remarriage, a newlywed's year at home, kidnapping, loans and pledges, paying wages the same day, fairness to the stranger and orphan, and leaving forgotten sheaves for the poor.",
    v: [
      ["24:1", "A certificate of divorce", "Jesus said Moses permitted it \"because of your hardness of heart\" (Matthew 19:8)."],
      ["24:5", "Happiness to his wife", "A new husband was free from war for a year."],
      ["24:15", "Before the sun sets", "Pay workers promptly (James 5:4)."],
      ["24:19", "A forgotten sheaf", "Left for the poor, so God would bless."],
    ],
    refs: [["MAT.19", "Matthew 19:3-9", "Jesus on divorce"], ["JAS.5", "James 5:4", "The wages you withheld"], ["RUT.2", "Ruth 2", "Gleaning"]],
  },
  25: {
    intro: "Punishments are limited to forty lashes. Do not muzzle an ox while it threshes. A brother-in-law should marry his brother's widow. Use honest weights. Remember what Amalek did.",
    v: [
      ["25:3", "Forty lashes", "Later Jewish practice gave thirty-nine to be safe; Paul received this five times (2 Corinthians 11:24)."],
      ["25:4", "Do not muzzle the ox", "Paul uses it to say workers in the gospel deserve support (1 Corinthians 9:9)."],
      ["25:5-6", "His brother's widow", "The custom behind Ruth and Boaz."],
      ["25:15", "A full and just weight", "Honest business is part of godliness."],
    ],
    refs: [["1CO.9", "1 Corinthians 9:9-10", "Do not muzzle the ox"], ["1TI.5", "1 Timothy 5:18", "The laborer is worthy"], ["RUT.4", "Ruth 4", "The kinsman redeemer"]],
  },
  26: {
    intro: "When they enter the land, each Israelite is to bring firstfruits in a basket and say, \"My father was a wandering Aramean...\" telling the story of the exodus. The third-year tithe is given to the needy. Israel and God declare their commitment to each other.",
    v: [
      ["26:5", "A wandering Aramean was my father", "Jacob. Every worshiper retells the story of grace."],
      ["26:11", "Rejoice in all the good", "With the Levite and the stranger."],
      ["26:17-18", "You have declared... the LORD has declared", "A covenant of mutual promise."],
    ],
    refs: [["1PE.2", "1 Peter 2:9-10", "Once not a people, now the people of God"], ["PSA.105", "Psalm 105", "Remember His wonders"]],
  },
  27: {
    intro: "When Israel crosses the Jordan, they are to set up plastered stones on Mount Ebal with the law written on them and build an altar. Six tribes stand on Gerizim to bless and six on Ebal for the curses, and the Levites call out twelve curses, each answered by the people's \"Amen.\"",
    v: [
      ["27:3", "Write on them all the words", "God's law set up in public for all to see."],
      ["27:15", "Amen", "The people agree with each curse."],
      ["27:26", "Cursed is he who does not confirm the words", "Paul quotes this to show no one keeps the law perfectly, and that Christ took the curse (Galatians 3:10-13)."],
    ],
    bg: [["An altar on Mount Ebal", "A stone structure found on Mount Ebal in the 1980s has been identified by its excavator as an early Israelite altar from about 1200 BC. Others think it was a farmstead or watchtower.", "debated", ["kitchen"]]],
    refs: [["JOS.8", "Joshua 8:30-35", "Joshua builds the altar"], ["GAL.3", "Galatians 3:10-13", "Christ redeemed us from the curse"]],
  },
  28: {
    intro: "A long chapter of blessings for obedience (in the city and the field, coming in and going out) and much longer curses for disobedience: disease, defeat, siege, famine and exile among the nations, \"from one end of the earth to the other.\"",
    v: [
      ["28:1-2", "If you diligently obey", "Blessings will \"overtake\" them."],
      ["28:13", "The head and not the tail", "God's blessing makes His people a light to others."],
      ["28:36", "A nation which neither you nor your fathers have known", "Fulfilled in the exiles to Assyria and Babylon."],
      ["28:64", "Scattered among all peoples", "A sobering prophecy of Israel's long history."],
    ],
    refs: [["LEV.26", "Leviticus 26", "Blessings and curses"], ["2KI.17", "2 Kings 17:7-23", "Israel exiled"], ["2KI.25", "2 Kings 25", "Judah exiled"]],
  },
  29: {
    intro: "Moses calls Israel to renew the covenant, including their little ones, the strangers, and \"those who are not with us here today.\" He warns against a root bearing bitter poison. \"The secret things belong to the LORD our God, but the things revealed belong to us and to our sons forever.\"",
    v: [
      ["29:4", "Not a heart to know", "Even after all the miracles, real understanding is God's gift (Romans 11:8)."],
      ["29:15", "Those who are not with us here today", "Future generations are included."],
      ["29:29", "The secret things belong to the LORD", "Some things God has not told us. We are responsible for what He has revealed."],
    ],
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
    refs: [["ROM.10", "Romans 10:6-10", "The word is near you"], ["JER.31", "Jeremiah 31:33", "I will write it on their heart"], ["JHN.10", "John 10:10", "Life abundantly"]],
  },
  31: {
    intro: "Moses, now 120, tells Israel that Joshua will lead them across. \"Be strong and courageous... He will not fail you or forsake you.\" Moses writes the law and orders it read to all Israel every seven years. God tells Moses Israel will turn away, and gives him a song to teach them as a witness.",
    v: [
      ["31:6", "He will not fail you", "Hebrews 13:5 quotes this promise for every believer."],
      ["31:8", "The LORD is the one who goes ahead of you", "Spoken to Joshua."],
      ["31:12", "Assemble the people, men, women, children and the alien", "Everyone hears God's word."],
    ],
    refs: [["HEB.13", "Hebrews 13:5", "I will never desert you"], ["JOS.1", "Joshua 1:5-9", "Be strong and courageous"]],
  },
  32: {
    intro: "The Song of Moses: heaven and earth are called as witnesses. God is the Rock, perfect and just. He found Israel in the wilderness and cared for them like an eagle with its young, but they grew fat and forsook Him. He will judge, yet He will vindicate His people. God then tells Moses to climb Mount Nebo to see the land and die there.",
    v: [
      ["32:4", "The Rock", "\"His work is perfect, for all His ways are just; a God of faithfulness and without injustice.\""],
      ["32:11", "Like an eagle that stirs up its nest", "God trains His people to fly."],
      ["32:15", "Jeshurun grew fat and kicked", "A pet name for Israel, \"upright one.\""],
      ["32:35", "Vengeance is Mine", "Quoted in Romans 12:19 and Hebrews 10:30."],
      ["32:47", "It is your life", "\"It is not an idle word for you.\""],
    ],
    refs: [["ROM.12", "Romans 12:19", "Vengeance is Mine"], ["REV.15", "Revelation 15:3", "The song of Moses"], ["1CO.10", "1 Corinthians 10:4", "The Rock was Christ"]],
  },
  33: {
    intro: "Moses blesses the tribes of Israel one by one before his death. It ends: \"The eternal God is a dwelling place, and underneath are the everlasting arms... Blessed are you, O Israel; who is like you, a people saved by the LORD?\"",
    v: [
      ["33:3", "He loves the people", "All His holy ones are in His hand."],
      ["33:12", "The beloved of the LORD", "Benjamin dwells securely between His shoulders."],
      ["33:27", "The everlasting arms", "One of the Bible's most comforting lines."],
      ["33:29", "Saved by the LORD", "Israel's happiness is God Himself."],
    ],
    refs: [["GEN.49", "Genesis 49", "Jacob blesses his sons"], ["PSA.90", "Psalm 90:1", "You have been our dwelling place"]],
  },
  34: {
    intro: "Moses climbs Mount Nebo, and God shows him the whole land. He dies there at 120, his eyes not dim, and God buries him in Moab; no one knows the place. Israel mourns thirty days. Joshua is full of the spirit of wisdom. \"Since then no prophet has risen in Israel like Moses, whom the LORD knew face to face.\"",
    v: [
      ["34:4", "You shall not go over there", "Moses sees the land; he will stand in it with Jesus on the mount of transfiguration (Matthew 17:3)."],
      ["34:6", "He buried him", "God Himself buried Moses."],
      ["34:10", "Face to face", "No one like Moses, until the Prophet he spoke of (18:15)."],
    ],
    why: "If Moses wrote the Torah, who wrote the account of his own death and burial?",
    views: [
      ["Added by Joshua or another", "Most who hold that Moses wrote the Torah say Joshua or another inspired writer added this final chapter, and perhaps a few notes like \"to this day.\"", ["merrill", "craigie"]],
      ["Written much later", "Others see the phrase \"since then no prophet has risen like Moses\" as written long afterward, as part of a later final edition.", ["wright"]],
    ],
    common: "All agree the chapter honors Moses as the greatest prophet of the old covenant and points ahead to the greater Prophet God promised.",
    refs: [["MAT.17", "Matthew 17:1-3", "Moses and Elijah with Jesus"], ["JUD.1", "Jude 1:9", "Michael disputed about the body of Moses"], ["HEB.3", "Hebrews 3:5-6", "Moses a servant, Christ a Son"]],
  },
});
