// Numbers chapter notes.
import { makeBook } from "./make.js";

const sources = {
  ashley: "Timothy R. Ashley, The Book of Numbers, New International Commentary on the Old Testament (Eerdmans, 1993).",
  wenham: "Gordon J. Wenham, Numbers, Tyndale Old Testament Commentaries (InterVarsity Press, 1981).",
  cole: "R. Dennis Cole, Numbers, New American Commentary 3B (Broadman & Holman, 2000).",
  milgrom: "Jacob Milgrom, Numbers, JPS Torah Commentary (Jewish Publication Society, 1990).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["wenham", "ashley"] }, {
  1: {
    intro: "In the Sinai wilderness, a year after the exodus, God tells Moses to count the men twenty years and older who could go to war, tribe by tribe. The total is 603,550. The Levites are not counted with them, because they are set apart to care for the tabernacle.",
    v: [
      ["1:2", "Take a census", "The book's English name, Numbers, comes from its two censuses (chapters 1 and 26). Its Hebrew name, \"In the wilderness,\" describes its setting."],
      ["1:46", "603,550", "The same number as the ransom money in Exodus 38:26."],
      ["1:50", "Over the tabernacle", "The Levites camp around the tabernacle as a guard, \"so that there will be no wrath on the congregation.\""],
    ],
    why: "Numbers counts over 600,000 fighting men, suggesting a nation of two million or more in the desert. Scholars discuss how to read the Hebrew word 'eleph (\"thousand\").",
    views: [
      ["As counted", "Many take the totals at face value, noting that the figures add up carefully and that God miraculously fed the people for forty years.", ["cole"]],
      ["Clans or units", "Others suggest 'eleph sometimes means a family unit or a military squad, which would give a much smaller total. They note the small number of firstborn in 3:43.", ["wenham", "ashley", "kitchen"]],
    ],
    common: "Both views agree that God organized and counted His people carefully, that every tribe and family mattered, and that He provided for them all.",
    refs: [["NUM.26", "Numbers 26", "The second census"], ["EXO.38", "Exodus 38:26", "603,550 men"]],
  },
  2: {
    intro: "God arranges the camp: the tabernacle in the center, the Levites around it, and three tribes on each side under a banner. Judah camps on the east, toward the sunrise, and leads the march.",
    v: [
      ["2:2", "Each by his own standard", "Every tribe had its place and its banner."],
      ["2:3", "Judah on the east", "The royal tribe goes first, by the entrance of the tabernacle."],
      ["2:34", "Thus they camped", "An orderly camp with God at the center."],
    ],
    refs: [["REV.21", "Revelation 21:12-13", "Twelve gates, three on each side"], ["1CO.14", "1 Corinthians 14:33, 40", "God is not a God of confusion"]],
  },
  3: {
    intro: "The family of Aaron and the duties of the Levites. God takes the Levites as His own in place of Israel's firstborn sons, whom He spared in Egypt. The extra 273 firstborn are redeemed with five shekels each.",
    v: [
      ["3:4", "Nadab and Abihu died", "A reminder of Leviticus 10."],
      ["3:12-13", "The Levites shall be Mine", "God claims the firstborn because He spared them at Passover."],
      ["3:46-48", "Redeemed with silver", "When there were more firstborn than Levites, the extra were bought back with money."],
    ],
    refs: [["EXO.13", "Exodus 13:2, 13", "Sanctify every firstborn"], ["1PE.1", "1 Peter 1:18-19", "Redeemed not with silver"]],
  },
  4: {
    intro: "The duties of the three Levite clans for moving the tabernacle. The Kohathites carry the holy furniture, but only after the priests have covered it, \"so that they will not touch the holy objects and die.\" The Gershonites carry the curtains, and the Merarites the frames.",
    v: [
      ["4:15", "They shall not touch the holy objects", "Uzzah died for touching the ark centuries later (2 Samuel 6:6-7)."],
      ["4:19", "Each to his work and his load", "Every Levite had an assigned task."],
      ["4:49", "Each according to his service", "No job was too small in God's house."],
    ],
    refs: [["2SA.6", "2 Samuel 6:6-7", "Uzzah and the ark"], ["1CO.12", "1 Corinthians 12:18-22", "Every member has a role"]],
  },
  5: {
    intro: "Unclean people are kept outside the camp so they do not defile it \"where I dwell in their midst.\" Confession and repayment are required for wrongs done to others. A test is given for a wife suspected of unfaithfulness.",
    v: [
      ["5:3", "Where I dwell", "God's presence makes the whole camp holy."],
      ["5:6-7", "Confess and make restitution", "Wronging a person is \"acting unfaithfully against the LORD.\""],
      ["5:12-31", "The test of jealousy", "This ritual put the matter in God's hands and protected an innocent wife from a jealous husband's violence."],
    ],
    refs: [["LEV.6", "Leviticus 6:1-7", "Restitution plus a fifth"], ["MAT.5", "Matthew 5:23-24", "Be reconciled first"]],
  },
  6: {
    intro: "The Nazirite vow: a man or woman could take a special vow of separation to God, avoiding wine and grapes, leaving their hair uncut, and staying away from dead bodies. The chapter ends with the priestly blessing.",
    v: [
      ["6:2", "A Nazirite", "From nazir, \"set apart.\" Samson, Samuel and John the Baptist were Nazirites from birth (Judges 13:5; 1 Samuel 1:11; Luke 1:15)."],
      ["6:5", "No razor", "Uncut hair showed the vow to everyone."],
      ["6:24-26", "The LORD bless you and keep you", "The priestly blessing. It is one of the oldest parts of the Bible found outside it: two small silver scrolls from about 600 BC, found at Ketef Hinnom in Jerusalem, carry these words.", "strong", ["cole", "milgrom"]],
      ["6:27", "Put My name on them", "To be blessed is to belong to God."],
    ],
    refs: [["JDG.13", "Judges 13:5", "Samson, a Nazirite"], ["LUK.1", "Luke 1:15", "John will drink no wine"], ["ACT.21", "Acts 21:23-26", "Paul and the men under a vow"]],
  },
  7: {
    intro: "At the tabernacle's dedication, the tribal leaders bring wagons and oxen for the Levites. Then each of the twelve leaders brings an identical offering, one per day for twelve days. Moses goes into the tent and hears the voice speaking to him from above the mercy seat.",
    v: [
      ["7:9", "On their shoulders", "The Kohathites received no wagons, because the holy things were to be carried by hand. David later forgot this (1 Chronicles 15:13-15)."],
      ["7:12-83", "Identical gifts", "The longest chapter in the Pentateuch repeats the same gift twelve times. Every tribe's gift was recorded and valued equally."],
      ["7:89", "He heard the voice", "The purpose of it all: God speaking with His people."],
    ],
    refs: [["1CH.15", "1 Chronicles 15:13-15", "Carrying the ark properly"], ["EXO.25", "Exodus 25:22", "There I will meet with you"]],
  },
  8: {
    intro: "Aaron sets up the seven lamps of the lampstand. The Levites are cleansed and presented to the LORD as a wave offering from the people, to serve from age twenty-five until fifty.",
    v: [
      ["8:2", "Give light in front of the lampstand", "The lamps lit the holy place."],
      ["8:10", "The sons of Israel shall lay their hands on the Levites", "The whole nation took part in setting them apart."],
      ["8:25-26", "At fifty they retire", "Older Levites still helped and guided the younger ones."],
    ],
    refs: [["EXO.25", "Exodus 25:31-40", "The lampstand"], ["ACT.6", "Acts 6:6", "They laid their hands on them"]],
  },
  9: {
    intro: "Israel keeps the second Passover at Sinai. Men who were unclean from touching a dead body ask to take part, and God allows a second Passover a month later. The cloud over the tabernacle guides them: when it lifts they set out, and when it settles they camp.",
    v: [
      ["9:10-11", "A second chance", "God makes room for those who missed the feast through no fault of their own."],
      ["9:14", "One statute for the alien", "Foreigners who joined Israel could keep the Passover."],
      ["9:18", "At the command of the LORD", "Repeated seven times in 9:18-23. Whether the cloud stayed two days or a year, they followed."],
    ],
    refs: [["EXO.40", "Exodus 40:36-38", "The cloud led them"], ["PSA.32", "Psalm 32:8", "I will guide you with My eye"]],
  },
  10: {
    intro: "God commands two silver trumpets for calling the people and sounding alarms. Then, in the second year, the cloud lifts and Israel leaves Sinai for the first time, tribe by tribe. Moses invites his brother-in-law Hobab to guide them. Whenever the ark set out, Moses prayed, \"Rise up, O LORD!\"",
    v: [
      ["10:9", "You will be remembered before the LORD", "The trumpets were also a kind of prayer."],
      ["10:29", "Come with us and we will do you good", "An invitation for an outsider to share in God's blessing."],
      ["10:35-36", "Rise up, O LORD", "Psalm 68:1 begins with these words."],
    ],
    refs: [["PSA.68", "Psalm 68:1", "Let God arise"], ["1TH.4", "1 Thessalonians 4:16", "With the trumpet of God"]],
  },
  11: {
    intro: "The people complain, and fire breaks out at the camp's edge. Then the mixed multitude and Israel crave meat and remember Egypt's fish and onions. Moses, worn out, asks God to take his life. God gives seventy elders His Spirit to share the load and sends quail, but a plague follows the greed.",
    v: [
      ["11:5", "The fish we used to eat free", "They remember the food and forget the slavery."],
      ["11:14", "I alone am not able", "Moses' honest prayer of exhaustion."],
      ["11:23", "Is the LORD's power limited?", "God answers Moses' doubt about feeding so many."],
      ["11:29", "Would that all the LORD's people were prophets", "Joel 2:28 and Acts 2 see this wish fulfilled when the Spirit is poured out on all."],
    ],
    refs: [["PSA.78", "Psalm 78:18-31", "They tested God by asking food"], ["1CO.10", "1 Corinthians 10:6", "Not crave evil things as they also craved"], ["ACT.2", "Acts 2:17-18", "I will pour out My Spirit"]],
  },
  12: {
    intro: "Miriam and Aaron criticize Moses because of his Cushite wife and question whether God speaks only through him. God defends Moses as His faithful servant, to whom He speaks \"mouth to mouth.\" Miriam becomes leprous, Moses prays for her, and she is healed after seven days outside the camp.",
    v: [
      ["12:3", "Very humble", "Moses does not defend himself; God does."],
      ["12:7", "Faithful in all My household", "Hebrews 3:2-6 compares Moses the faithful servant with Christ the faithful Son."],
      ["12:13", "O God, heal her, I pray", "Moses prays for the one who hurt him."],
    ],
    refs: [["HEB.3", "Hebrews 3:1-6", "Moses was faithful in all His house"], ["MAT.5", "Matthew 5:44", "Pray for those who persecute you"]],
  },
  13: {
    intro: "Twelve spies, one from each tribe, explore Canaan for forty days. They bring back a cluster of grapes so large two men carry it on a pole. The land flows with milk and honey, they say, but the people are strong and the cities fortified. Caleb says, \"We should by all means go up,\" but ten spies spread a bad report: \"We became like grasshoppers in our own sight.\"",
    v: [
      ["13:16", "Joshua", "Moses renames Hoshea (\"salvation\") Joshua (\"the LORD saves\"). The Greek form of Joshua is Jesus."],
      ["13:23", "The valley of Eshcol", "Eshcol means \"cluster.\""],
      ["13:30", "We will surely overcome it", "Caleb sees the same giants but measures them against God."],
      ["13:33", "Like grasshoppers", "Fear shrinks them and enlarges the enemy."],
    ],
    refs: [["DEU.1", "Deuteronomy 1:19-33", "Moses recalls the spies"], ["HEB.3", "Hebrews 3:16-19", "They could not enter because of unbelief"]],
  },
  14: {
    intro: "The people weep all night and plan to choose a leader to take them back to Egypt. Joshua and Caleb plead: \"The LORD is with us; do not fear them.\" God threatens to destroy the people; Moses intercedes, quoting God's own words of mercy. God forgives, but that generation will die in the wilderness during forty years. Only Caleb and Joshua will enter.",
    v: [
      ["14:9", "Do not rebel against the LORD", "Joshua and Caleb name the real problem: not giants, but unbelief."],
      ["14:18-19", "Pardon, I pray", "Moses prays God's self-description from Exodus 34:6-7 back to Him."],
      ["14:24", "My servant Caleb has a different spirit", "\"He has followed Me fully.\""],
      ["14:34", "A year for each day", "Forty days of spying become forty years of wandering."],
    ],
    refs: [["HEB.3", "Hebrews 3:7-19", "Today, do not harden your hearts"], ["PSA.95", "Psalm 95:10-11", "For forty years I loathed that generation"], ["JOS.14", "Joshua 14:6-14", "Caleb receives Hebron"]],
  },
  15: {
    intro: "God gives laws for offerings \"when you enter the land,\" a promise that the next generation will arrive. Unintentional sins can be atoned for, but sins done \"defiantly\" (with a high hand) cut a person off. A Sabbath-breaker is judged, and Israel is told to wear tassels to remember God's commands.",
    v: [
      ["15:2", "When you enter the land", "Right after the judgment, God speaks of the future."],
      ["15:30", "Defiantly", "Literally \"with a high hand,\" a shaking fist at God."],
      ["15:38-39", "Tassels", "Blue cords on the corners of garments, \"so that you may look at it and remember.\" Jesus wore them (Matthew 9:20, where \"fringe\" is this tassel)."],
    ],
    refs: [["MAT.9", "Matthew 9:20", "She touched the fringe of His cloak"], ["HEB.10", "Hebrews 10:26", "Sinning willfully"]],
  },
  16: {
    intro: "Korah, a Levite, with Dathan, Abiram and 250 leaders, rebels against Moses and Aaron: \"All the congregation are holy... why do you exalt yourselves?\" Moses proposes a test with censers of incense. The ground opens and swallows the rebels' households, and fire consumes the 250. When the people blame Moses, a plague breaks out, and Aaron runs with incense to stand between the dead and the living.",
    v: [
      ["16:3", "You have gone far enough", "Korah's words sound humble, but he wants the priesthood (16:10)."],
      ["16:13", "A land flowing with milk and honey", "Dathan and Abiram call Egypt the promised land."],
      ["16:48", "Between the dead and the living", "Aaron, the high priest, stops the plague, a picture of Christ's work."],
    ],
    refs: [["JUD.1", "Jude 1:11", "Perished in the rebellion of Korah"], ["NUM.26", "Numbers 26:11", "The sons of Korah did not die"]],
  },
  17: {
    intro: "To end the grumbling, God tells each tribe's leader to bring a staff, with Aaron's name on Levi's. They are left overnight before the ark. In the morning Aaron's staff has sprouted, budded, blossomed and produced ripe almonds. It is kept before the ark as a sign.",
    v: [
      ["17:5", "The rod of the man whom I choose will sprout", "Life from a dead stick shows God's choice."],
      ["17:8", "Ripe almonds", "The almond is the first tree to bloom in spring. Its Hebrew name sounds like \"watchful.\""],
      ["17:10", "A sign against the rebels", "Hebrews 9:4 says Aaron's staff was kept in the ark."],
    ],
    refs: [["HEB.9", "Hebrews 9:4", "Aaron's rod which budded"], ["JER.1", "Jeremiah 1:11-12", "A rod of almond; I am watching"]],
  },
  18: {
    intro: "God sets out the duties and portions of priests and Levites. They receive no land: \"I am your portion and your inheritance.\" The Levites receive the tithes of Israel and give a tenth of them to the priests.",
    v: [
      ["18:7", "A gift", "The priesthood is a gift, not a right to grab."],
      ["18:20", "I am your portion", "Their inheritance was God Himself. Psalm 16:5: \"The LORD is the portion of my inheritance.\""],
      ["18:26", "A tenth of the tithe", "Those who received tithes also gave."],
    ],
    refs: [["PSA.16", "Psalm 16:5", "The LORD is my portion"], ["1CO.9", "1 Corinthians 9:13-14", "Those who serve at the altar"]],
  },
  19: {
    intro: "The ashes of a red heifer, burned outside the camp with cedar, hyssop and scarlet, are mixed with water to cleanse anyone who has touched a dead body.",
    v: [
      ["19:2", "An unblemished red heifer", "A rare rite. Jewish tradition counted only a handful in all of history."],
      ["19:3", "Outside the camp", "Hebrews 13:12 notes Jesus suffered outside the gate."],
      ["19:11", "Touches the corpse", "Death is the great defilement. Jesus touched the dead and raised them (Luke 7:14)."],
    ],
    refs: [["HEB.9", "Hebrews 9:13-14", "The ashes of a heifer; how much more the blood of Christ"], ["LUK.7", "Luke 7:14", "He touched the coffin"]],
  },
  20: {
    intro: "Miriam dies at Kadesh. With no water, the people quarrel again. God tells Moses to speak to the rock, but Moses, angry, strikes it twice. Water comes out, but God tells Moses and Aaron they will not lead Israel into the land. Edom refuses Israel passage, and Aaron dies on Mount Hor.",
    v: [
      ["20:8", "Speak to the rock", "At Rephidim God told Moses to strike (Exodus 17:6); now He says speak."],
      ["20:10", "Must we bring forth water?", "Moses speaks as if the power were his."],
      ["20:12", "You have not believed Me, to treat Me as holy", "The sin was unbelief and dishonoring God before the people."],
      ["20:28", "Aaron died there on the mountain top", "Eleazar receives his father's garments."],
    ],
    refs: [["PSA.106", "Psalm 106:32-33", "It went hard with Moses on their account"], ["DEU.32", "Deuteronomy 32:51-52", "Because you broke faith with Me"]],
  },
  21: {
    intro: "Israel defeats the Canaanite king of Arad. Growing impatient, they complain about the manna, and God sends fiery serpents. When they confess, God tells Moses to make a bronze serpent on a pole: whoever looks at it lives. Israel then defeats Sihon king of the Amorites and Og king of Bashan.",
    v: [
      ["21:5", "We loathe this miserable food", "They call God's daily gift \"worthless.\""],
      ["21:8-9", "Look and live", "Jesus said, \"As Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up\" (John 3:14-15)."],
      ["21:14", "The Book of the Wars of the LORD", "An ancient book, now lost, that the writer quotes."],
    ],
    refs: [["JHN.3", "John 3:14-15", "As Moses lifted up the serpent"], ["2KI.18", "2 Kings 18:4", "Hezekiah breaks the bronze serpent, which had become an idol"], ["1CO.10", "1 Corinthians 10:9", "Destroyed by the serpents"]],
  },
  22: {
    intro: "Balak king of Moab, afraid of Israel, hires the prophet Balaam to curse them. God tells Balaam not to go, then allows him to go but say only what God says. On the way, Balaam's donkey sees the angel of the LORD with a sword and turns aside three times. God opens the donkey's mouth, and then Balaam's eyes.",
    v: [
      ["22:12", "You shall not curse the people, for they are blessed", "God's word to Abraham (Genesis 12:3) protects Israel."],
      ["22:28", "The LORD opened the mouth of the donkey", "The animal sees more than the famous seer. 2 Peter 2:16 mentions it."],
      ["22:38", "The word God puts in my mouth", "Balaam cannot say anything else."],
    ],
    bg: [["Balaam outside the Bible", "An inscription found at Deir Alla in Jordan, written about 800 BC, tells of a vision of \"Balaam son of Beor, a seer of the gods.\" It is one of the few Bible figures named in a text from that region.", "strong", ["kitchen", "milgrom"]]],
    refs: [["2PE.2", "2 Peter 2:15-16", "Balaam loved the wages of unrighteousness"], ["REV.2", "Revelation 2:14", "The teaching of Balaam"]],
  },
  23: {
    intro: "Balak takes Balaam to high places to look at Israel's camp and curse them. Twice Balaam blesses instead: \"How shall I curse whom God has not cursed?\" and \"God is not a man, that He should lie.\"",
    v: [
      ["23:8", "How shall I curse whom God has not cursed?", "No one can undo God's blessing."],
      ["23:19", "God is not a man, that He should lie", "A great verse about God's faithfulness."],
      ["23:21", "The shout of a king is among them", "God reigns among His people."],
    ],
    refs: [["ROM.8", "Romans 8:31", "If God is for us, who is against us?"], ["TIT.1", "Titus 1:2", "God, who cannot lie"]],
  },
  24: {
    intro: "The Spirit of God comes on Balaam and he blesses Israel a third time: \"How fair are your tents, O Jacob.\" Balak is furious, but Balaam gives a fourth oracle: \"A star shall come forth from Jacob, a scepter shall rise from Israel.\"",
    v: [
      ["24:5", "How fair are your tents", "Seen from God's view, Israel is beautiful."],
      ["24:9", "Blessed is everyone who blesses you", "Repeating Genesis 12:3."],
      ["24:17", "A star from Jacob", "Fulfilled first in King David, and seen by many as pointing to the Messiah. Some connect it with the star of Bethlehem (Matthew 2:2)."],
    ],
    refs: [["MAT.2", "Matthew 2:2", "We saw His star"], ["REV.22", "Revelation 22:16", "The bright morning star"]],
  },
  25: {
    intro: "At Peor, Israelite men sin with Moabite women and join in worshiping their god, Baal of Peor. A plague kills 24,000. Phinehas, Aaron's grandson, stops it with zeal for God, and God gives him a covenant of peace and a lasting priesthood.",
    v: [
      ["25:1-3", "Joined to Baal of Peor", "What Balaam's curses could not do, temptation did. Revelation 2:14 says Balaam taught Balak this plan (see Numbers 31:16)."],
      ["25:11", "Jealous with My jealousy", "Phinehas shared God's concern for His honor."],
      ["25:12", "My covenant of peace", "Psalm 106:30-31 remembers his deed."],
    ],
    refs: [["1CO.10", "1 Corinthians 10:8", "Twenty-three thousand fell in one day"], ["PSA.106", "Psalm 106:28-31", "Phinehas stood up"], ["REV.2", "Revelation 2:14", "Balaam taught Balak"]],
  },
  26: {
    intro: "A second census of the new generation on the plains of Moab, by tribe: 601,730 men. None of those counted at Sinai remain except Caleb and Joshua. The land will be divided by tribe size and by lot.",
    v: [
      ["26:11", "The sons of Korah did not die", "Their descendants later wrote many Psalms (Psalms 42-49, 84-85, 87-88)."],
      ["26:64-65", "Not a man of them", "God's word in 14:29 came true."],
    ],
    why: "1 Corinthians 10:8 says 23,000 fell in one day, while Numbers 25:9 says 24,000 died in the plague. Readers ask how these fit.",
    views: [
      ["Different counts", "Most note that Paul says \"in one day,\" while Numbers gives the total of the whole plague.", ["cole"]],
      ["Rounded numbers", "Others suggest both are round figures for a number between 23,000 and 24,000.", ["ashley"]],
    ],
    common: "Both agree on the lesson Paul draws: these things happened as examples for us, so that we would not crave evil things.",
    refs: [["NUM.1", "Numbers 1", "The first census"], ["NUM.14", "Numbers 14:29-30", "Your corpses will fall in this wilderness"]],
  },
  27: {
    intro: "The five daughters of Zelophehad ask for their father's land, since he had no sons. Moses brings their case to God, who says, \"They are right,\" and makes a new law of inheritance. God then shows Moses the land from a mountain, and Joshua is commissioned as Moses' successor.",
    v: [
      ["27:4", "Why should our father's name be withdrawn?", "Mahlah, Noa, Hoglah, Milcah and Tirzah are each named."],
      ["27:7", "The daughters are right", "God sides with them and changes the inheritance law."],
      ["27:16-17", "Like sheep which have no shepherd", "Moses' concern is for the people. Jesus uses the same words (Matthew 9:36)."],
      ["27:18", "Joshua, a man in whom is the Spirit", "Moses lays his hand on him."],
    ],
    refs: [["JOS.17", "Joshua 17:3-6", "The daughters receive land"], ["MAT.9", "Matthew 9:36", "Like sheep without a shepherd"]],
  },
  28: {
    intro: "God sets out the regular offerings: daily morning and evening lambs, extra Sabbath offerings, the new-moon offerings, Passover and Unleavened Bread, and the Feast of Weeks.",
    v: [
      ["28:2", "At their appointed time", "Worship was steady and regular, not only when people felt like it."],
      ["28:3", "Continual burnt offering", "The daily rhythm of Israel's worship."],
      ["28:26", "The day of the first fruits", "The Feast of Weeks, later called Pentecost."],
    ],
    refs: [["EXO.29", "Exodus 29:38-42", "The daily offering"], ["HEB.10", "Hebrews 10:11-12", "One sacrifice forever"]],
  },
  29: {
    intro: "The offerings for the seventh month: the Feast of Trumpets, the Day of Atonement and the eight days of the Feast of Booths, with a decreasing number of bulls each day, seventy in all.",
    v: [
      ["29:1", "A day for blowing trumpets", "Later called Rosh Hashanah, the Jewish New Year."],
      ["29:7", "Humble yourselves", "The Day of Atonement."],
      ["29:12-34", "Seventy bulls", "Some Jewish teachers connected the seventy bulls with the seventy nations of Genesis 10."],
    ],
    refs: [["LEV.23", "Leviticus 23:23-43", "The fall feasts"], ["JHN.7", "John 7:2, 37", "The Feast of Booths"]],
  },
  30: {
    intro: "Rules about vows. A man must keep his word. A woman's vow could be cancelled by her father or husband on the day he heard it; if he said nothing, it stood.",
    v: [
      ["30:2", "He shall not violate his word", "Jesus later taught, \"Let your statement be, 'Yes, yes' or 'No, no'\" (Matthew 5:37)."],
      ["30:5", "The LORD will forgive her", "The law protected a woman who made a rash vow."],
      ["30:9", "The vow of a widow or a divorced woman", "A woman heading her own home answered for her own vows."],
      ["30:15", "He shall bear her guilt", "A husband who cancels a vow late, not on the day he hears it, carries the blame himself."],
    ],
    bg: [["Vows in Israel", "A vow was a promise to God, often made in trouble: Hannah vowed a son to the LORD (1 Samuel 1:11), and Jephthah's rash vow ended in grief (Judges 11). These rules kept vows serious while protecting a household from a promise its head had not agreed to.", "good", ["wenham", "ashley"]]],
    w: [["neder", "NEH-der", "H5088", "vow, a promise made to God", "Used for promises of gifts, service or self-denial. A vow was voluntary, but once made it was binding.", ["halot"]]],
    refs: [["MAT.5", "Matthew 5:33-37", "Make no oath at all"], ["ECC.5", "Ecclesiastes 5:4-5", "Pay what you vow"]],
  },
  31: {
    intro: "Israel goes to war against Midian for leading them into sin at Peor. Balaam is killed. Moses rebukes the officers for sparing those who caused the sin. The plunder is divided between soldiers and the community, with a share given to God. Not one Israelite soldier is lost, and the officers bring a thank offering.",
    v: [
      ["31:8", "Balaam the son of Beor", "The prophet who blessed Israel dies with Israel's enemies."],
      ["31:16", "Through the counsel of Balaam", "The source of Revelation 2:14."],
      ["31:49", "Not a man of us is missing", "The officers thank God with gold."],
    ],
    refs: [["REV.2", "Revelation 2:14", "The teaching of Balaam"], ["NUM.25", "Numbers 25", "The sin at Peor"]],
  },
  32: {
    intro: "The tribes of Reuben and Gad, with half of Manasseh, ask to settle east of the Jordan, good land for their livestock. Moses fears a repeat of the spies' failure, but they promise to cross and fight with their brothers until the land is won. Moses agrees.",
    v: [
      ["32:7", "Why are you discouraging?", "Moses remembers what happened at Kadesh."],
      ["32:23", "Be sure your sin will find you out", "A famous line. Failing to keep their word would be sin against the LORD."],
      ["32:31", "As the LORD has said, so we will do", "They keep their promise (Joshua 22:1-6)."],
    ],
    refs: [["JOS.22", "Joshua 22:1-6", "The eastern tribes go home"], ["JOS.1", "Joshua 1:12-16", "They cross to fight"]],
  },
  33: {
    intro: "A list of Israel's journeys from Egypt to the plains of Moab, written down by Moses at God's command, about forty stopping places. God tells Israel to drive out the Canaanites and destroy their idols, or they will become \"thorns in your sides.\"",
    v: [
      ["33:2", "Moses recorded their starting places", "A travel record, like the itineraries kept in other ancient kingdoms.", "good", ["kitchen"]],
      ["33:38", "Aaron died in the fortieth year", "At 123 years old, on the first day of the fifth month."],
      ["33:55", "Thorns in your sides", "Judges 2:3 shows it happened."],
    ],
    refs: [["JDG.2", "Judges 2:1-3", "They will become thorns"], ["DEU.8", "Deuteronomy 8:2", "Remember all the way the LORD has led you"]],
  },
  34: {
    intro: "God describes the borders of the promised land on every side and names one leader from each tribe to help Eleazar and Joshua divide it.",
    v: [
      ["34:2", "The land of Canaan according to its borders", "God gives precise boundaries for His promise."],
      ["34:17", "Eleazar the priest and Joshua", "The new generation of leaders."],
      ["34:19", "Caleb", "Caleb, now about 80, is named for Judah."],
    ],
    refs: [["EZK.47", "Ezekiel 47:13-21", "The borders in Ezekiel's vision"], ["JOS.14", "Joshua 14:1", "Eleazar and Joshua divide the land"]],
  },
  35: {
    intro: "The Levites receive forty-eight towns with pasturelands throughout Israel. Six of them are cities of refuge, where someone who killed a person by accident could flee and be safe from the avenger until a fair trial. Murder, proven by more than one witness, must be punished, because blood defiles the land.",
    v: [
      ["35:11", "Cities of refuge", "Three on each side of the Jordan, so that none was too far away."],
      ["35:25", "Until the death of the high priest", "The high priest's death set the manslayer free, which many see as a picture of Christ."],
      ["35:30", "Not on one witness", "Deuteronomy 19:15 and Jesus (Matthew 18:16) repeat this principle."],
    ],
    refs: [["JOS.20", "Joshua 20", "The cities of refuge named"], ["HEB.6", "Hebrews 6:18", "We who have taken refuge"], ["DEU.19", "Deuteronomy 19:1-13", "Cities of refuge"]],
  },
  36: {
    intro: "The leaders of Manasseh point out that if Zelophehad's daughters marry outside the tribe, the land will pass to another tribe. God rules that heiresses marry within their father's tribe, and the daughters do so. The book ends on the plains of Moab by the Jordan, opposite Jericho.",
    v: [
      ["36:5", "The tribe of the sons of Joseph is right", "God hears both sides and refines the law."],
      ["36:10", "Just as the LORD had commanded", "The daughters obey and marry cousins."],
      ["36:13", "By the Jordan opposite Jericho", "The book ends at the edge of the promise."],
    ],
    refs: [["NUM.27", "Numbers 27:1-11", "The daughters' first request"], ["JOS.17", "Joshua 17:3-6", "They receive their land"]],
  },
});
