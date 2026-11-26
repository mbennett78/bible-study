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
    bg: [["Why it is called Numbers", "The English name comes from the two counts of the people (chapters 1 and 26). The Hebrew name is Bemidbar, \"In the wilderness.\" The count gives 603,550 fighting men (1:46). Some scholars think the Hebrew word eleph, usually \"thousand,\" can also mean a clan or military unit, which would make the numbers smaller. Readers differ.", "good", ["ashley", "wenham", "cole"]]],
    refs: [["NUM.26", "Numbers 26", "The second census"], ["EXO.38", "Exodus 38:26", "603,550 men"]],
  },
  2: {
    intro: "God arranges the camp: the tabernacle in the center, the Levites around it, and three tribes on each side under a banner. Judah camps on the east, toward the sunrise, and leads the march.",
    v: [
      ["2:2", "Each by his own standard", "Every tribe had its place and its banner."],
      ["2:3", "Judah on the east", "The royal tribe goes first, by the entrance of the tabernacle."],
      ["2:34", "Thus they camped", "Israel camped by tribes on all four sides of the tabernacle, each under its banner. God's dwelling stood at the center of the camp."],
    ],
    bg: [["A camp around God", "The twelve tribes camped in four groups of three on each side of the tabernacle, with the Levites closest (2:2, 17). Judah, the tribe of the future kings, camped on the east, facing the sunrise and the tabernacle entrance. God was literally at the center of His people.", "good", ["wenham", "ashley"]]],
    refs: [["REV.21", "Revelation 21:12-13", "Twelve gates, three on each side"], ["1CO.14", "1 Corinthians 14:33, 40", "God is not a God of confusion"]],
  },
  3: {
    intro: "The family of Aaron and the duties of the Levites. God takes the Levites as His own in place of Israel's firstborn sons, whom He spared in Egypt. The extra 273 firstborn are redeemed with five shekels each.",
    v: [
      ["3:4", "Nadab and Abihu died", "Aaron's sons Nadab and Abihu died before the LORD when they offered unauthorized fire (Leviticus 10:1-2). Eleazar and Ithamar served as priests instead."],
      ["3:12-13", "The Levites shall be Mine", "God claims the firstborn because He spared them at Passover."],
      ["3:46-48", "Redeemed with silver", "When there were more firstborn than Levites, the extra were bought back with money."],
    ],
    bg: [["Levites in place of the firstborn", "God claimed every firstborn son since the night He spared Israel's firstborn in Egypt, and He took the Levites in their place (3:12-13). There were 273 more firstborn than Levites, and each was redeemed for five shekels (3:46-47).", "good", ["ashley", "milgrom"]]],
    refs: [["EXO.13", "Exodus 13:2, 13", "Sanctify every firstborn"], ["1PE.1", "1 Peter 1:18-19", "Redeemed not with silver"]],
  },
  4: {
    intro: "The duties of the three Levite clans for moving the tabernacle. The Kohathites carry the holy furniture, but only after the priests have covered it, \"so that they will not touch the holy objects and die.\" The Gershonites carry the curtains, and the Merarites the frames.",
    v: [
      ["4:15", "They shall not touch the holy objects", "Uzzah died for touching the ark centuries later (2 Samuel 6:6-7)."],
      ["4:19", "Each to his work and his load", "Aaron and his sons were to assign each Levite his task and what he would carry, so no one came near the holy things carelessly and died."],
      ["4:49", "Each according to his service", "Each Levite was counted and given his service and his load. No task in God's house was too small."],
    ],
    bg: [["Carried, not touched", "The Kohathites carried the holy objects on their shoulders but were not to touch them, or they would die (4:15). Generations later, David moved the ark on a cart and Uzzah died after touching it (2 Samuel 6:6-7). The second time, it was carried properly (1 Chronicles 15:15).", "good", ["wenham", "cole"]]],
    refs: [["2SA.6", "2 Samuel 6:6-7", "Uzzah and the ark"], ["1CO.12", "1 Corinthians 12:18-22", "Every member has a role"]],
  },
  5: {
    intro: "Unclean people are kept outside the camp so they do not defile it \"where I dwell in their midst.\" Confession and repayment are required for wrongs done to others. A test is given for a wife suspected of unfaithfulness.",
    v: [
      ["5:3", "Where I dwell", "God's presence makes the whole camp holy."],
      ["5:6-7", "Confess and make restitution", "Wronging a person is \"acting unfaithfully against the LORD.\""],
      ["5:12-31", "The test of jealousy", "This ritual put the matter in God's hands and protected an innocent wife from a jealous husband's violence."],
    ],
    bg: [["The test of bitter water", "A husband who suspected his wife of unfaithfulness had to bring her to the priest rather than act on his own (5:11-31). Many scholars note that this protected women from rash punishment, because the outcome was left to God and needed no human witness. It is the only test of its kind in the Law.", "good", ["wenham", "ashley"]]],
    refs: [["LEV.6", "Leviticus 6:1-7", "Restitution plus a fifth"], ["MAT.5", "Matthew 5:23-24", "Be reconciled first"]],
  },
  6: {
    intro: "The Nazirite vow: a man or woman could take a special vow of separation to God, avoiding wine and grapes, leaving their hair uncut, and staying away from dead bodies. The chapter ends with the priestly blessing.",
    v: [
      ["6:2", "A Nazirite", "From nazir, \"set apart.\" Samson, Samuel and John the Baptist were Nazirites from birth (Judges 13:5; 1 Samuel 1:11; Luke 1:15)."],
      ["6:5", "No razor", "During a Nazirite vow, no razor touched the person's head. The uncut hair showed everyone they were set apart to the LORD."],
      ["6:24-26", "The LORD bless you and keep you", "The priestly blessing. It is one of the oldest parts of the Bible found outside it: two small silver scrolls from about 600 BC, found at Ketef Hinnom in Jerusalem, carry these words.", "strong", ["cole", "milgrom"]],
      ["6:27", "Put My name on them", "After the priestly blessing (6:24-26), God says: so they will put My name on the people of Israel, and I will bless them. To be blessed is to belong to Him."],
    ],
    w: [["נָזִיר", "nazir", "H5139", "one consecrated, separated", "A Nazirite made a vow to belong to God in a special way for a time: no wine or grapes, no haircut and no contact with the dead (6:3-6). Samson (Judges 13:5) and probably Samuel and John the Baptist were set apart like this from birth, and Paul joined men completing a vow (Acts 21:23-26).", ["halot", "milgrom"]]],
    refs: [["JDG.13", "Judges 13:5", "Samson, a Nazirite"], ["LUK.1", "Luke 1:15", "John will drink no wine"], ["ACT.21", "Acts 21:23-26", "Paul and the men under a vow"]],
  },
  7: {
    intro: "At the tabernacle's dedication, the tribal leaders bring wagons and oxen for the Levites. Then each of the twelve leaders brings an identical offering, one per day for twelve days. Moses goes into the tent and hears the voice speaking to him from above the mercy seat.",
    v: [
      ["7:9", "On their shoulders", "The Kohathites received no wagons, because the holy things were to be carried by hand. David later forgot this (1 Chronicles 15:13-15)."],
      ["7:12-83", "Identical gifts", "The longest chapter in the Pentateuch repeats the same gift twelve times. Every tribe's gift was recorded and valued equally."],
      ["7:89", "He heard the voice", "The purpose of it all: God speaking with His people."],
    ],
    bg: [["The same gift, twelve times", "Each tribal leader brought identical gifts on twelve separate days, and the list is repeated in full each time (7:12-83). It is the longest chapter in the Pentateuch. The repetition shows that every tribe's gift was noticed and honored equally.", "good", ["ashley", "cole"]]],
    refs: [["1CH.15", "1 Chronicles 15:13-15", "Carrying the ark properly"], ["EXO.25", "Exodus 25:22", "There I will meet with you"]],
  },
  8: {
    intro: "Aaron sets up the seven lamps of the lampstand. The Levites are cleansed and presented to the LORD as a wave offering from the people, to serve from age twenty-five until fifty.",
    v: [
      ["8:2", "Give light in front of the lampstand", "Aaron was to set up the seven lamps so they lit the area in front of the lampstand. They were the only light in the holy place."],
      ["8:10", "The sons of Israel shall lay their hands on the Levites", "The whole nation took part in setting them apart."],
      ["8:25-26", "At fifty they retire", "Older Levites still helped and guided the younger ones."],
    ],
    bg: [["Starting at twenty-five", "Levites served from age twenty-five to fifty (8:24-25), though chapter 4 counts those from thirty (4:3). Many interpreters suggest the first five years were a kind of training. After fifty, older Levites still helped their brothers (8:26).", "good", ["ashley", "wenham"]]],
    refs: [["EXO.25", "Exodus 25:31-40", "The lampstand"], ["ACT.6", "Acts 6:6", "They laid their hands on them"]],
  },
  9: {
    intro: "Israel keeps the second Passover at Sinai. Men who were unclean from touching a dead body ask to take part, and God allows a second Passover a month later. The cloud over the tabernacle guides them: when it lifts they set out, and when it settles they camp.",
    v: [
      ["9:10-11", "A second chance", "God makes room for those who missed the feast through no fault of their own."],
      ["9:14", "One statute for the alien", "Foreigners who joined Israel could keep the Passover."],
      ["9:18", "At the command of the LORD", "Repeated seven times in 9:18-23. Whether the cloud stayed two days or a year, they followed."],
    ],
    bg: [["A second Passover", "Some men were unclean from touching a dead body and could not keep Passover. God gave a second date a month later for anyone unclean or traveling (9:10-11). God made room for those who wanted to worship but could not come at the regular time.", "good", ["wenham", "cole"]]],
    refs: [["EXO.40", "Exodus 40:36-38", "The cloud led them"], ["PSA.32", "Psalm 32:8", "I will guide you with My eye"]],
  },
  10: {
    intro: "God commands two silver trumpets for calling the people and sounding alarms. Then, in the second year, the cloud lifts and Israel leaves Sinai for the first time, tribe by tribe. Moses invites his brother-in-law Hobab to guide them. Whenever the ark set out, Moses prayed, \"Rise up, O LORD!\"",
    v: [
      ["10:9", "You will be remembered before the LORD", "The trumpets were also a kind of prayer."],
      ["10:29", "Come with us and we will do you good", "An invitation for an outsider to share in God's blessing."],
      ["10:35-36", "Rise up, O LORD", "When the ark set out, Moses said: rise up, LORD, and scatter Your enemies. When it rested: return, LORD, to the countless thousands of Israel. Psalm 68:1 begins with these words."],
    ],
    bg: [["Leaving Sinai", "Israel set out from Sinai in the second year, about eleven months after arriving (10:11). Two silver trumpets signaled the march (10:2). Each time the ark set out, Moses prayed, \"Rise up, O LORD! And let Your enemies be scattered\" (10:35), words that open Psalm 68.", "good", ["ashley", "milgrom"]]],
    refs: [["PSA.68", "Psalm 68:1", "Let God arise"], ["1TH.4", "1 Thessalonians 4:16", "With the trumpet of God"]],
  },
  11: {
    intro: "The people complain, and fire breaks out at the camp's edge. Then the mixed multitude and Israel crave meat and remember Egypt's fish and onions. Moses, worn out, asks God to take his life. God gives seventy elders His Spirit to share the load and sends quail, but a plague follows the greed.",
    v: [
      ["11:5", "The fish we used to eat free", "They remember the food and forget the slavery."],
      ["11:14", "I alone am not able", "Tired of the people's complaining, Moses tells God honestly: I cannot carry all these people by myself; it is too heavy for me. God gives him seventy elders to help."],
      ["11:23", "Is the LORD's power limited?", "God answers Moses' doubt about feeding so many."],
      ["11:29", "Would that all the LORD's people were prophets", "Joel 2:28 and Acts 2 see this wish fulfilled when the Spirit is poured out on all."],
    ],
    bg: [["Graves of craving", "The people grew tired of manna and craved meat. God sent so many quail that the place was named Kibroth-hattaavah, \"graves of craving\" (11:31-34). In the same chapter, when two elders prophesied in the camp, Moses said, \"Would that all the LORD's people were prophets\" (11:29), a wish fulfilled at Pentecost (Acts 2:17).", "good", ["wenham", "ashley"]]],
    refs: [["PSA.78", "Psalm 78:18-31", "They tested God by asking food"], ["1CO.10", "1 Corinthians 10:6", "Not crave evil things as they also craved"], ["ACT.2", "Acts 2:17-18", "I will pour out My Spirit"]],
  },
  12: {
    intro: "Miriam and Aaron criticize Moses because of his Cushite wife and question whether God speaks only through him. God defends Moses as His faithful servant, to whom He speaks \"mouth to mouth.\" Miriam becomes leprous, Moses prays for her, and she is healed after seven days outside the camp.",
    v: [
      ["12:3", "Very humble", "Moses does not defend himself; God does."],
      ["12:7", "Faithful in all My household", "Hebrews 3:2-6 compares Moses the faithful servant with Christ the faithful Son."],
      ["12:13", "O God, heal her, I pray", "Miriam spoke against Moses and was struck with a skin disease. Moses, the one she hurt, cried out: O God, please heal her."],
    ],
    bg: [["The humblest man", "When Miriam and Aaron spoke against Moses, the text notes that Moses was \"very humble, more than any man on the face of the earth\" (12:3). He did not defend himself; God did, saying He spoke with Moses \"mouth to mouth\" (12:8). Moses then prayed for Miriam's healing (12:13).", "good", ["cole", "ashley"]]],
    refs: [["HEB.3", "Hebrews 3:1-6", "Moses was faithful in all His house"], ["MAT.5", "Matthew 5:44", "Pray for those who persecute you"]],
  },
  13: {
    intro: "Twelve spies, one from each tribe, explore Canaan for forty days. They bring back a cluster of grapes so large two men carry it on a pole. The land flows with milk and honey, they say, but the people are strong and the cities fortified. Caleb says, \"We should by all means go up,\" but ten spies spread a bad report: \"We became like grasshoppers in our own sight.\"",
    v: [
      ["13:16", "Joshua", "Moses renames Hoshea (\"salvation\") Joshua (\"the LORD saves\"). The Greek form of Joshua is Jesus."],
      ["13:23", "The valley of Eshcol", "In the Valley of Eshcol, meaning \"cluster,\" the spies cut a single cluster of grapes so big two men carried it on a pole."],
      ["13:30", "We will surely overcome it", "Caleb sees the same giants but measures them against God."],
      ["13:33", "Like grasshoppers", "Fear shrinks them and enlarges the enemy."],
    ],
    bg: [["One cluster of grapes", "The spies brought back a cluster of grapes from the valley of Eshcol so large that two men carried it on a pole (13:23). Israel's Ministry of Tourism uses this picture as its emblem today. Ten spies saw giants; Joshua and Caleb saw God's promise.", "good", ["cole", "wenham"]]],
    refs: [["DEU.1", "Deuteronomy 1:19-33", "Moses recalls the spies"], ["HEB.3", "Hebrews 3:16-19", "They could not enter because of unbelief"]],
  },
  14: {
    intro: "The people weep all night and plan to choose a leader to take them back to Egypt. Joshua and Caleb plead: \"The LORD is with us; do not fear them.\" God threatens to destroy the people; Moses intercedes, quoting God's own words of mercy. God forgives, but that generation will die in the wilderness during forty years. Only Caleb and Joshua will enter.",
    v: [
      ["14:9", "Do not rebel against the LORD", "Joshua and Caleb name the real problem: not giants, but unbelief."],
      ["14:18-19", "Pardon, I pray", "Moses prays God's self-description from Exodus 34:6-7 back to Him."],
      ["14:24", "My servant Caleb has a different spirit", "Because Caleb had a different spirit and followed the LORD fully, God promised to bring him into the land he had explored."],
      ["14:34", "A year for each day", "Forty days of spying become forty years of wandering."],
    ],
    bg: [["A year for each day", "Because the people refused to enter the land, God said they would wander forty years, a year for each of the forty days the spies explored it (14:34). Only Caleb, who had \"a different spirit,\" and Joshua would enter (14:24, 30). Hebrews 3:7-19 uses this as a warning against unbelief.", "strong", ["ashley", "wenham"]]],
    refs: [["HEB.3", "Hebrews 3:7-19", "Today, do not harden your hearts"], ["PSA.95", "Psalm 95:10-11", "For forty years I loathed that generation"], ["JOS.14", "Joshua 14:6-14", "Caleb receives Hebron"]],
  },
  15: {
    intro: "God gives laws for offerings \"when you enter the land,\" a promise that the next generation will arrive. Unintentional sins can be atoned for, but sins done \"defiantly\" (with a high hand) cut a person off. A Sabbath-breaker is judged, and Israel is told to wear tassels to remember God's commands.",
    v: [
      ["15:2", "When you enter the land", "Right after the judgment, God speaks of the future."],
      ["15:30", "Defiantly", "Literally \"with a high hand,\" a shaking fist at God."],
      ["15:38-39", "Tassels", "Blue cords on the corners of garments, \"so that you may look at it and remember.\" Jesus wore them (Matthew 9:20, where \"fringe\" is this tassel)."],
    ],
    w: [["צִיצִת", "tsitsit", "H6734", "tassel, fringe", "Israelites wore tassels with a blue cord on the corners of their clothes to remember God's commands (15:38-39). Jews still wear them on prayer shawls. The woman who was healed touched \"the fringe\" of Jesus' cloak (Matthew 9:20).", ["halot", "milgrom"]]],
    refs: [["MAT.9", "Matthew 9:20", "She touched the fringe of His cloak"], ["HEB.10", "Hebrews 10:26", "Sinning willfully"]],
  },
  16: {
    intro: "Korah, a Levite, with Dathan, Abiram and 250 leaders, rebels against Moses and Aaron: \"All the congregation are holy... why do you exalt yourselves?\" Moses proposes a test with censers of incense. The ground opens and swallows the rebels' households, and fire consumes the 250. When the people blame Moses, a plague breaks out, and Aaron runs with incense to stand between the dead and the living.",
    v: [
      ["16:3", "You have gone far enough", "Korah's words sound humble, but he wants the priesthood (16:10)."],
      ["16:13", "A land flowing with milk and honey", "Dathan and Abiram call Egypt the promised land."],
      ["16:48", "Between the dead and the living", "Aaron, the high priest, stops the plague, a picture of Christ's work."],
    ],
    bg: [["The sons of Korah", "Korah led a rebellion against Moses and Aaron, and the ground swallowed the rebels (16:31-33). Yet \"the sons of Korah did not die\" (26:11). Their descendants became temple singers, and eleven psalms carry their name, including Psalm 42, \"As the deer pants for the water brooks.\"", "strong", ["ashley", "cole"]]],
    refs: [["JUD.1", "Jude 1:11", "Perished in the rebellion of Korah"], ["NUM.26", "Numbers 26:11", "The sons of Korah did not die"]],
  },
  17: {
    intro: "To end the grumbling, God tells each tribe's leader to bring a staff, with Aaron's name on Levi's. They are left overnight before the ark. In the morning Aaron's staff has sprouted, budded, blossomed and produced ripe almonds. It is kept before the ark as a sign.",
    v: [
      ["17:5", "The rod of the man whom I choose will sprout", "Life from a dead stick shows God's choice."],
      ["17:8", "Ripe almonds", "The almond is the first tree to bloom in spring. Its Hebrew name sounds like \"watchful.\""],
      ["17:10", "A sign against the rebels", "Hebrews 9:4 says Aaron's staff was kept in the ark."],
    ],
    bg: [["The rod that budded", "God settled who was His chosen priest: overnight Aaron's staff sprouted, blossomed and bore ripe almonds (17:8). It was kept before the ark as a sign (17:10; Hebrews 9:4). A dead stick bringing forth life showed God's choice.", "good", ["wenham", "ashley"]]],
    refs: [["HEB.9", "Hebrews 9:4", "Aaron's rod which budded"], ["JER.1", "Jeremiah 1:11-12", "A rod of almond; I am watching"]],
  },
  18: {
    intro: "God sets out the duties and portions of priests and Levites. They receive no land: \"I am your portion and your inheritance.\" The Levites receive the tithes of Israel and give a tenth of them to the priests.",
    v: [
      ["18:7", "A gift", "The priesthood is a gift, not a right to grab."],
      ["18:20", "I am your portion", "Their inheritance was God Himself. Psalm 16:5: \"The LORD is the portion of my inheritance.\""],
      ["18:26", "A tenth of the tithe", "The Levites received Israel's tithes, but they too were to give a tenth of what they received as an offering to the LORD."],
    ],
    bg: [["God as their inheritance", "The priests and Levites received no land. God told Aaron, \"I am your portion and your inheritance\" (18:20). They lived on the tithes of the people, and they in turn gave a tenth of what they received (18:26).", "good", ["ashley", "milgrom"]]],
    refs: [["PSA.16", "Psalm 16:5", "The LORD is my portion"], ["1CO.9", "1 Corinthians 9:13-14", "Those who serve at the altar"]],
  },
  19: {
    intro: "The ashes of a red heifer, burned outside the camp with cedar, hyssop and scarlet, are mixed with water to cleanse anyone who has touched a dead body.",
    v: [
      ["19:2", "An unblemished red heifer", "A rare rite. Jewish tradition counted only a handful in all of history."],
      ["19:3", "Outside the camp", "Hebrews 13:12 notes Jesus suffered outside the gate."],
      ["19:11", "Touches the corpse", "Death is the great defilement. Jesus touched the dead and raised them (Luke 7:14)."],
    ],
    bg: [["The red heifer", "A red cow without defect was burned, and its ashes were mixed with water to cleanse anyone who had touched a dead body (19:2-9). Hebrews 9:13-14 contrasts these ashes, which cleansed the body, with the blood of Christ, which cleanses the conscience.", "good", ["wenham", "milgrom"]]],
    refs: [["HEB.9", "Hebrews 9:13-14", "The ashes of a heifer; how much more the blood of Christ"], ["LUK.7", "Luke 7:14", "He touched the coffin"]],
  },
  20: {
    intro: "Miriam dies at Kadesh. With no water, the people quarrel again. God tells Moses to speak to the rock, but Moses, angry, strikes it twice. Water comes out, but God tells Moses and Aaron they will not lead Israel into the land. Edom refuses Israel passage, and Aaron dies on Mount Hor.",
    v: [
      ["20:8", "Speak to the rock", "At Rephidim God told Moses to strike (Exodus 17:6); now He says speak."],
      ["20:10", "Must we bring forth water?", "God told Moses to speak to the rock. Instead Moses shouted: must we bring water out of this rock for you? and struck it twice, as if the power were his."],
      ["20:12", "You have not believed Me, to treat Me as holy", "The sin was unbelief and dishonoring God before the people."],
      ["20:28", "Aaron died there on the mountain top", "On Mount Hor, Moses removed Aaron's priestly garments and put them on his son Eleazar. Then Aaron died there on the mountaintop."],
    ],
    bg: [["Why Moses could not enter", "God told Moses to speak to the rock, but he struck it twice and said, \"Shall we bring forth water for you?\" (20:10-11). God said he had not treated Him as holy (20:12). Readers differ on the main fault: disobeying, anger, or taking the credit. The same chapter records the deaths of Miriam and Aaron.", "good", ["ashley", "wenham", "cole"]]],
    refs: [["PSA.106", "Psalm 106:32-33", "It went hard with Moses on their account"], ["DEU.32", "Deuteronomy 32:51-52", "Because you broke faith with Me"]],
  },
  21: {
    intro: "Israel defeats the Canaanite king of Arad. Growing impatient, they complain about the manna, and God sends fiery serpents. When they confess, God tells Moses to make a bronze serpent on a pole: whoever looks at it lives. Israel then defeats Sihon king of the Amorites and Og king of Bashan.",
    v: [
      ["21:5", "We loathe this miserable food", "The people complained against God and Moses: there is no bread or water, and we detest this miserable food. They called God's daily gift of manna worthless."],
      ["21:8-9", "Look and live", "Jesus said, \"As Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up\" (John 3:14-15)."],
      ["21:14", "The Book of the Wars of the LORD", "An ancient book, now lost, that the writer quotes."],
    ],
    bg: [["The bronze serpent", "When people bitten by snakes looked at the bronze serpent on a pole, they lived (21:8-9). Centuries later King Hezekiah destroyed it because people were burning incense to it, calling it Nehushtan (2 Kings 18:4). Jesus said, \"As Moses lifted up the serpent... so must the Son of Man be lifted up\" (John 3:14).", "strong", ["wenham", "ashley"]]],
    refs: [["JHN.3", "John 3:14-15", "As Moses lifted up the serpent"], ["2KI.18", "2 Kings 18:4", "Hezekiah breaks the bronze serpent, which had become an idol"], ["1CO.10", "1 Corinthians 10:9", "Destroyed by the serpents"]],
  },
  22: {
    intro: "Balak king of Moab, afraid of Israel, hires the prophet Balaam to curse them. God tells Balaam not to go, then allows him to go but say only what God says. On the way, Balaam's donkey sees the angel of the LORD with a sword and turns aside three times. God opens the donkey's mouth, and then Balaam's eyes.",
    v: [
      ["22:12", "You shall not curse the people, for they are blessed", "God's word to Abraham (Genesis 12:3) protects Israel."],
      ["22:28", "The LORD opened the mouth of the donkey", "The animal sees more than the famous seer. 2 Peter 2:16 mentions it."],
      ["22:38", "The word God puts in my mouth", "Balaam tells King Balak he has come, but he can only speak the word God puts in his mouth."],
    ],
    bg: [["Balaam outside the Bible", "An inscription found at Deir Alla in Jordan, written about 800 BC, tells of a vision of \"Balaam son of Beor, a seer of the gods.\" It is one of the few Bible figures named in a text from that region.", "strong", ["kitchen", "milgrom"]]],
    refs: [["2PE.2", "2 Peter 2:15-16", "Balaam loved the wages of unrighteousness"], ["REV.2", "Revelation 2:14", "The teaching of Balaam"]],
  },
  23: {
    intro: "Balak takes Balaam to high places to look at Israel's camp and curse them. Twice Balaam blesses instead: \"How shall I curse whom God has not cursed?\" and \"God is not a man, that He should lie.\"",
    v: [
      ["23:8", "How shall I curse whom God has not cursed?", "Balak hired Balaam to curse Israel. Balaam says: how can I curse those whom God has not cursed? No one can undo God's blessing."],
      ["23:19", "God is not a man, that He should lie", "God is not a human being, that He should lie, or a son of man, that He should change His mind. Has He said, and will He not do it?"],
      ["23:21", "The shout of a king is among them", "God sees no wrong He will punish in Israel. The LORD their God is with them, and the shout of a King is among them."],
    ],
    bg: [["God does not change His mind", "Balak paid Balaam to curse Israel, but every time Balaam opened his mouth, a blessing came out. \"God is not a man, that He should lie\" (23:19). What God has promised, no one can reverse (23:20).", "good", ["ashley", "cole"]]],
    refs: [["ROM.8", "Romans 8:31", "If God is for us, who is against us?"], ["TIT.1", "Titus 1:2", "God, who cannot lie"]],
  },
  24: {
    intro: "The Spirit of God comes on Balaam and he blesses Israel a third time: \"How fair are your tents, O Jacob.\" Balak is furious, but Balaam gives a fourth oracle: \"A star shall come forth from Jacob, a scepter shall rise from Israel.\"",
    v: [
      ["24:5", "How fair are your tents", "Seen from God's view, Israel is beautiful."],
      ["24:9", "Blessed is everyone who blesses you", "Balaam's blessing repeats God's promise to Abraham (Genesis 12:3): blessed is everyone who blesses you, and cursed is everyone who curses you."],
      ["24:17", "A star from Jacob", "Fulfilled first in King David, and seen by many as pointing to the Messiah. Some connect it with the star of Bethlehem (Matthew 2:2)."],
    ],
    bg: [["A star out of Jacob", "\"A star shall come forth from Jacob, a scepter shall rise from Israel\" (24:17). Jewish readers long took this as pointing to a coming king, and in AD 132 the rebel leader Simon was called Bar Kokhba, \"son of the star.\" Christians connect it to the star at Jesus' birth (Matthew 2:2).", "good", ["wenham", "cole"]]],
    refs: [["MAT.2", "Matthew 2:2", "We saw His star"], ["REV.22", "Revelation 22:16", "The bright morning star"]],
  },
  25: {
    intro: "At Peor, Israelite men sin with Moabite women and join in worshiping their god, Baal of Peor. A plague kills 24,000. Phinehas, Aaron's grandson, stops it with zeal for God, and God gives him a covenant of peace and a lasting priesthood.",
    v: [
      ["25:1-3", "Joined to Baal of Peor", "What Balaam's curses could not do, temptation did. Revelation 2:14 says Balaam taught Balak this plan (see Numbers 31:16)."],
      ["25:11", "Jealous with My jealousy", "Phinehas shared God's concern for His honor."],
      ["25:12", "My covenant of peace", "When Israel sinned with Moabite women and their gods, Phinehas acted to stop it. God gave him a covenant of peace, and Psalm 106:30-31 remembers his zeal."],
    ],
    bg: [["Balaam's other plan", "Balaam could not curse Israel, but Numbers 31:16 says he advised the Midianites to lead Israel into idolatry and immorality at Peor. Revelation 2:14 recalls \"the teaching of Balaam.\" Phinehas's zeal stopped the plague (25:7-8).", "good", ["ashley", "wenham"]]],
    refs: [["1CO.10", "1 Corinthians 10:8", "Twenty-three thousand fell in one day"], ["PSA.106", "Psalm 106:28-31", "Phinehas stood up"], ["REV.2", "Revelation 2:14", "Balaam taught Balak"]],
  },
  26: {
    intro: "A second census of the new generation on the plains of Moab, by tribe: 601,730 men. None of those counted at Sinai remain except Caleb and Joshua. The land will be divided by tribe size and by lot.",
    v: [
      ["26:11", "The sons of Korah did not die", "Their descendants later wrote many Psalms (Psalms 42-49, 84-85, 87-88)."],
      ["26:64-65", "Not a man of them", "In the second census, not one man was left from the first count except Caleb and Joshua. God's word in 14:29-30 had come true."],
    ],
    why: "1 Corinthians 10:8 says 23,000 fell in one day, while Numbers 25:9 says 24,000 died in the plague. Readers ask how these fit.",
    views: [
      ["Different counts", "Most note that Paul says \"in one day,\" while Numbers gives the total of the whole plague.", ["cole"]],
      ["Rounded numbers", "Others suggest both are round figures for a number between 23,000 and 24,000.", ["ashley"]],
    ],
    common: "Both agree on the lesson Paul draws: these things happened as examples for us, so that we would not crave evil things.",
    bg: [["A new generation", "The second count gives 601,730 men (26:51), nearly the same as forty years before. But not one of the men counted at Sinai remained except Caleb and Joshua (26:64-65). God kept both His warning and His promise.", "good", ["ashley", "cole"]]],
    refs: [["NUM.1", "Numbers 1", "The first census"], ["NUM.14", "Numbers 14:29-30", "Your corpses will fall in this wilderness"]],
  },
  27: {
    intro: "The five daughters of Zelophehad ask for their father's land, since he had no sons. Moses brings their case to God, who says, \"They are right,\" and makes a new law of inheritance. God then shows Moses the land from a mountain, and Joshua is commissioned as Moses' successor.",
    v: [
      ["27:4", "Why should our father's name be withdrawn?", "Mahlah, Noa, Hoglah, Milcah and Tirzah are each named."],
      ["27:7", "The daughters are right", "God sides with them and changes the inheritance law."],
      ["27:16-17", "Like sheep which have no shepherd", "Moses' concern is for the people. Jesus uses the same words (Matthew 9:36)."],
      ["27:18", "Joshua, a man in whom is the Spirit", "God tells Moses to take Joshua, a man with the Spirit in him, and lay his hand on him before the priest and the people as the next leader."],
    ],
    bg: [["The daughters of Zelophehad", "Five sisters asked for their father's land because he had no sons (27:1-4). Moses took the case to God, who said, \"The daughters of Zelophehad are right\" (27:7), and made it law. The chapter ends with Joshua commissioned to lead after Moses.", "strong", ["wenham", "ashley"]]],
    refs: [["JOS.17", "Joshua 17:3-6", "The daughters receive land"], ["MAT.9", "Matthew 9:36", "Like sheep without a shepherd"]],
  },
  28: {
    intro: "God sets out the regular offerings: daily morning and evening lambs, extra Sabbath offerings, the new-moon offerings, Passover and Unleavened Bread, and the Feast of Weeks.",
    v: [
      ["28:2", "At their appointed time", "Worship was steady and regular, not only when people felt like it."],
      ["28:3", "Continual burnt offering", "Each day two lambs were offered, one in the morning and one at evening. A daily rhythm of worship framed Israel's life."],
      ["28:26", "The day of the first fruits", "The Feast of Weeks, later called Pentecost."],
    ],
    w: [["תָּמִיד", "tamid", "H8548", "continual, regular", "A lamb was offered every morning and every evening as \"a continual burnt offering\" (28:3-6). Later Jewish writings call this daily sacrifice simply \"the Tamid.\" Daniel speaks of its being taken away (Daniel 8:11).", ["halot", "milgrom"]]],
    refs: [["EXO.29", "Exodus 29:38-42", "The daily offering"], ["HEB.10", "Hebrews 10:11-12", "One sacrifice forever"]],
  },
  29: {
    intro: "The offerings for the seventh month: the Feast of Trumpets, the Day of Atonement and the eight days of the Feast of Booths, with a decreasing number of bulls each day, seventy in all.",
    v: [
      ["29:1", "A day for blowing trumpets", "Later called Rosh Hashanah, the Jewish New Year."],
      ["29:7", "Humble yourselves", "On the tenth day of the seventh month, the Day of Atonement, Israel was to hold a holy assembly, humble themselves and do no work (Leviticus 16)."],
      ["29:12-34", "Seventy bulls", "Some Jewish teachers connected the seventy bulls with the seventy nations of Genesis 10."],
    ],
    bg: [["Seventy bulls", "During the Feast of Booths, the number of bulls offered went down from thirteen on the first day to seven on the seventh, seventy in all (29:12-34). Jewish teachers later linked the seventy bulls with the seventy nations of Genesis 10, praying for the whole world.", "good", ["milgrom", "ashley"]]],
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
      ["31:16", "Through the counsel of Balaam", "Moses says the Midianite women led Israel into sin by Balaam's advice. Revelation 2:14 remembers \"the teaching of Balaam.\""],
      ["31:49", "Not a man of us is missing", "After the battle, the officers counted their men: not one was missing. In thanks they brought gold jewelry as an offering to the LORD."],
    ],
    bg: [["The end of Balaam", "In the war against Midian, Israel killed Balaam son of Beor (31:8). The man who had blessed Israel with his mouth had worked against them in secret (31:16). 2 Peter 2:15 says he \"loved the wages of unrighteousness.\"", "good", ["ashley", "cole"]]],
    refs: [["REV.2", "Revelation 2:14", "The teaching of Balaam"], ["NUM.25", "Numbers 25", "The sin at Peor"]],
  },
  32: {
    intro: "The tribes of Reuben and Gad, with half of Manasseh, ask to settle east of the Jordan, good land for their livestock. Moses fears a repeat of the spies' failure, but they promise to cross and fight with their brothers until the land is won. Moses agrees.",
    v: [
      ["32:7", "Why are you discouraging?", "Moses remembers what happened at Kadesh."],
      ["32:23", "Be sure your sin will find you out", "A famous line. Failing to keep their word would be sin against the LORD."],
      ["32:31", "As the LORD has said, so we will do", "They keep their promise (Joshua 22:1-6)."],
    ],
    bg: [["Your sin will find you out", "Reuben and Gad wanted to settle east of the Jordan. Moses agreed only if their men crossed over to fight with the other tribes, warning, \"Be sure your sin will find you out\" (32:23). They kept their word (Joshua 22:1-4).", "good", ["wenham", "ashley"]]],
    refs: [["JOS.22", "Joshua 22:1-6", "The eastern tribes go home"], ["JOS.1", "Joshua 1:12-16", "They cross to fight"]],
  },
  33: {
    intro: "A list of Israel's journeys from Egypt to the plains of Moab, written down by Moses at God's command, about forty stopping places. God tells Israel to drive out the Canaanites and destroy their idols, or they will become \"thorns in your sides.\"",
    v: [
      ["33:2", "Moses recorded their starting places", "A travel record, like the itineraries kept in other ancient kingdoms.", "good", ["kitchen"]],
      ["33:38", "Aaron died in the fortieth year", "At 123 years old, on the first day of the fifth month."],
      ["33:55", "Thorns in your sides", "If Israel did not drive out the land's inhabitants, they would be like thorns in their eyes and sides. Judges 2:3 shows that it happened."],
    ],
    bg: [["The journey written down", "Moses recorded every stage of the journey from Egypt to the plains of Moab, about forty stopping places (33:2). Many of the names cannot be located today, but the list shows a real journey remembered step by step, with God leading at every stop.", "good", ["kitchen", "ashley"]]],
    refs: [["JDG.2", "Judges 2:1-3", "They will become thorns"], ["DEU.8", "Deuteronomy 8:2", "Remember all the way the LORD has led you"]],
  },
  34: {
    intro: "God describes the borders of the promised land on every side and names one leader from each tribe to help Eleazar and Joshua divide it.",
    v: [
      ["34:2", "The land of Canaan according to its borders", "God gives precise boundaries for His promise."],
      ["34:3", "The Salt Sea", "The Dead Sea, so salty nothing lives in it."],
      ["34:5", "The brook of Egypt", "Usually identified with the Wadi el-Arish in northern Sinai, the traditional border with Egypt."],
      ["34:17", "Eleazar the priest and Joshua", "God named Eleazar the priest and Joshua to divide the land for Israel, the new generation of leaders."],
      ["34:19", "Caleb", "Caleb, now about 80, is named for Judah."],
    ],
    bg: [["Borders and promise", "These borders stretch from the Wadi of Egypt to Lebanon and the land near Hamath. Israel held land this wide only under David and Solomon. The boundaries describe what God gave, even when the people did not fully take it.", "good", ["wenham", "ashley"]]],
    refs: [["1KI.4", "1 Kings 4:21, 25", "Solomon's kingdom"], ["EZK.47", "Ezekiel 47:13-21", "The borders in Ezekiel's vision"], ["JOS.14", "Joshua 14:1", "Eleazar and Joshua divide the land"]],
  },
  35: {
    intro: "The Levites receive forty-eight towns with pasturelands throughout Israel. Six of them are cities of refuge, where someone who killed a person by accident could flee and be safe from the avenger until a fair trial. Murder, proven by more than one witness, must be punished, because blood defiles the land.",
    v: [
      ["35:11", "Cities of refuge", "Three on each side of the Jordan, so that none was too far away."],
      ["35:25", "Until the death of the high priest", "The high priest's death set the manslayer free, which many see as a picture of Christ."],
      ["35:30", "Not on one witness", "Deuteronomy 19:15 and Jesus (Matthew 18:16) repeat this principle."],
    ],
    bg: [["Cities of refuge", "Six cities were set apart where someone who killed another by accident could flee from the avenger (35:11-15). He was safe there until the death of the high priest (35:25, 28). Hebrews 6:18 speaks of believers who \"have taken refuge\" in God's hope.", "strong", ["wenham", "cole"]]],
    refs: [["JOS.20", "Joshua 20", "The cities of refuge named"], ["HEB.6", "Hebrews 6:18", "We who have taken refuge"], ["DEU.19", "Deuteronomy 19:1-13", "Cities of refuge"]],
  },
  36: {
    intro: "The leaders of Manasseh point out that if Zelophehad's daughters marry outside the tribe, the land will pass to another tribe. God rules that heiresses marry within their father's tribe, and the daughters do so. The book ends on the plains of Moab by the Jordan, opposite Jericho.",
    v: [
      ["36:5", "The tribe of the sons of Joseph is right", "God hears both sides and refines the law."],
      ["36:10", "Just as the LORD had commanded", "Zelophehad's daughters did just as the LORD commanded Moses and married men from their father's tribe, so their land stayed in the tribe."],
      ["36:13", "By the Jordan opposite Jericho", "The book ends at the edge of the promise."],
    ],
    bg: [["Keeping land in the tribe", "Leaders of Zelophehad's tribe worried that the land would pass to another tribe if the daughters married outside it. Moses ruled that they marry within their tribe, and they did (36:6-12). The book ends with the people on the edge of the promised land.", "good", ["ashley", "wenham"]]],
    refs: [["NUM.27", "Numbers 27:1-11", "The daughters' first request"], ["JOS.17", "Joshua 17:3-6", "They receive their land"]],
  },
});
