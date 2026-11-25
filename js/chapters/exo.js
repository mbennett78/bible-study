// Exodus chapter notes (Exodus 14 has full notes in notes.js).
import { makeBook } from "./make.js";

const sources = {
  stuart: "Douglas K. Stuart, Exodus, New American Commentary 2 (Broadman & Holman, 2006).",
  cole: "R. Alan Cole, Exodus, Tyndale Old Testament Commentaries (InterVarsity Press, 1973).",
  durham: "John I. Durham, Exodus, Word Biblical Commentary 3 (Word, 1987).",
  hoffmeier: "James K. Hoffmeier, Israel in Egypt: The Evidence for the Authenticity of the Exodus Tradition (Oxford University Press, 1997).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
  anet: "James B. Pritchard, ed., Ancient Near Eastern Texts Relating to the Old Testament, 3rd ed. (Princeton University Press, 1969).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["stuart", "cole"] }, {
  1: {
    intro: "Jacob's family of seventy grows into a great people in Egypt. A new king who did not know Joseph enslaves them, forcing them to build store cities. When they keep multiplying, he orders the Hebrew midwives to kill the baby boys. The midwives fear God and refuse, so Pharaoh orders every Hebrew boy thrown into the Nile.",
    v: [
      ["1:7", "Fruitful and multiplied", "The words of God's blessing at creation (Genesis 1:28) and to Abraham are coming true, even in slavery."],
      ["1:8", "A new king who did not know Joseph", "A change of dynasty. The new ruler sees Israel as a threat, not a gift."],
      ["1:11", "Pithom and Raamses", "Store cities in the eastern Nile Delta, built with forced labor."],
      ["1:17", "The midwives feared God", "Shiphrah and Puah are named, while the mighty Pharaoh is not. God blesses them with families of their own (1:21)."],
    ],
    bg: [["Bricks and forced labor", "Egyptian tomb paintings, such as the tomb of Rekhmire (about 1450 BC), show foreign workers making bricks under taskmasters. The city of Pi-Ramesses in the Delta matches the name Raamses.", "strong", ["hoffmeier", "kitchen"]]],
    why: "When did the exodus happen? The Bible gives clues that point to different centuries, and scholars weigh them differently.",
    views: [
      ["About 1446 BC", "1 Kings 6:1 says Solomon began the temple 480 years after the exodus, which points to about 1446 BC. Judges 11:26 gives a long time in the land as well.", ["stuart"]],
      ["About 1260 BC", "Others note that the city of Raamses (1:11) was built under Ramesses II in the 1200s BC, and read the 480 years as twelve generations of 40 years.", ["kitchen", "hoffmeier"]],
    ],
    common: "Both views hold that Israel really was enslaved in Egypt and that God really brought them out. The date changes the setting, not the story.",
    refs: [["ACT.7", "Acts 7:17-19", "The people increased and multiplied in Egypt"], ["GEN.15", "Genesis 15:13-14", "Your descendants will be enslaved"], ["HEB.11", "Hebrews 11:23", "By faith Moses was hidden by his parents"]],
  },
  2: {
    intro: "A Levite mother hides her baby boy, then places him in a basket among the reeds of the Nile. Pharaoh's daughter finds him, his sister Miriam arranges for his own mother to nurse him, and the princess names him Moses. Grown up, Moses kills an Egyptian who was beating a Hebrew and flees to Midian, where he marries Zipporah. Meanwhile Israel cries out, and God hears.",
    v: [
      ["2:3", "A wicker basket", "The same Hebrew word as Noah's ark (tevah). Again God saves through the waters."],
      ["2:10", "Moses", "The name sounds like the Hebrew for \"drawn out\" and is also an Egyptian name element meaning \"born of,\" as in Thutmose."],
      ["2:11-12", "He struck down the Egyptian", "Moses acts on his own strength and has to run. God will later send him in His strength."],
      ["2:24-25", "God heard... God remembered... God saw... God took notice", "Four verbs show God is about to act on His covenant with Abraham, Isaac and Jacob."],
    ],
    refs: [["HEB.11", "Hebrews 11:24-27", "By faith Moses refused to be called the son of Pharaoh's daughter"], ["ACT.7", "Acts 7:20-29", "Stephen tells Moses' early life"]],
  },
  3: {
    intro: "Moses, now a shepherd for forty years, sees a bush burning but not burned up on Horeb, the mountain of God. God calls to him from the bush, tells him to remove his sandals, and sends him to Pharaoh to bring Israel out. When Moses asks God's name, God answers, \"I AM WHO I AM.\"",
    v: [
      ["3:5", "Holy ground", "The ground is holy because God is there."],
      ["3:7", "I have surely seen the affliction of My people", "God sees, hears, knows and comes down to rescue."],
      ["3:11-12", "Who am I?", "Moses' question about himself gets an answer about God: \"Certainly I will be with you.\""],
      ["3:14", "I AM WHO I AM", "God names Himself as the One who simply is, unchanging and needing no one. Jesus says, \"Before Abraham was born, I am\" (John 8:58)."],
      ["3:21-22", "Not empty-handed", "Israel will leave with the Egyptians' silver and gold, as God told Abraham (Genesis 15:14)."],
    ],
    w: [["יהוה", "YHWH (often written Yahweh; \"the LORD\" in most Bibles)", "H3068", "the LORD, God's personal name", "Connected to the verb \"to be\" in 3:14. Out of reverence Jews read it aloud as Adonai, \"Lord,\" which is why many Bibles print LORD in small capitals.", ["halot", "durham"]]],
    why: "What does God's name \"I AM WHO I AM\" mean exactly? The Hebrew verb can be read as present or future.",
    views: [
      ["The self-existent One", "Many read it as God's eternal, self-existent being: He is, and depends on no one.", ["cole"]],
      ["I will be who I will be", "Others stress the future sense: God will show who He is by what He does, and He will be with His people (3:12).", ["durham", "stuart"]],
    ],
    common: "All agree that God reveals His personal name to Israel, and that He is both beyond everything and present with His people.",
    refs: [["JHN.8", "John 8:58", "Before Abraham was born, I am"], ["ACT.7", "Acts 7:30-34", "The angel in the flame of fire in the bush"], ["MRK.12", "Mark 12:26", "The God of Abraham, Isaac and Jacob"]],
  },
  4: {
    intro: "Moses still objects. God gives him signs (a staff that becomes a snake, a hand made leprous and healed, water turned to blood) and answers his excuse about speech. When Moses asks God to send someone else, God sends Aaron to speak for him. On the way to Egypt, a strange episode happens with Zipporah and circumcision. The elders of Israel believe and worship.",
    v: [
      ["4:11", "Who has made man's mouth?", "God made Moses' mouth, and He will be with it."],
      ["4:13", "Please send someone else", "Moses' real problem is unwillingness, and God's anger burns, yet He still provides Aaron."],
      ["4:21-23", "Israel is My son, My firstborn", "God calls the whole nation His firstborn son. If Pharaoh will not let God's son go, Pharaoh's firstborn will die."],
      ["4:31", "They bowed low and worshiped", "When the people hear that God has seen their affliction, they believe."],
    ],
    why: "God says, \"I will harden his heart\" (4:21), yet elsewhere Pharaoh hardens his own heart (8:15). Readers ask how both can be true.",
    views: [
      ["Both together", "Many note that the first plagues say Pharaoh hardened his own heart, and only later that God hardened it. God confirmed the choice Pharaoh kept making.", ["cole", "stuart"]],
      ["God's sovereign purpose", "Others stress that God announced the hardening beforehand to show His power (Romans 9:17-18), while Pharaoh remained fully responsible.", ["durham"]],
    ],
    common: "All agree that Pharaoh was responsible for his actions and that God used even his stubbornness to show His glory and save His people.",
    refs: [["ROM.9", "Romans 9:17-18", "For this very purpose I raised you up"], ["EXO.8", "Exodus 8:15", "Pharaoh hardened his heart"], ["HOS.11", "Hosea 11:1", "Out of Egypt I called My son"]],
  },
  5: {
    intro: "Moses and Aaron ask Pharaoh to let Israel go worship in the wilderness. Pharaoh answers, \"Who is the LORD that I should obey His voice?\" and makes the work harder: the slaves must find their own straw but make the same number of bricks. The Hebrew foremen blame Moses, and Moses complains to God.",
    v: [
      ["5:2", "Who is the LORD?", "The rest of the plagues answer Pharaoh's question (7:5)."],
      ["5:7", "Straw for bricks", "Straw helped mud bricks hold together. Gathering their own straw made the quota nearly impossible."],
      ["5:22-23", "Why have You brought harm?", "Things get worse before they get better. Moses brings his honest complaint to God."],
    ],
    bg: [["Brick quotas", "An Egyptian leather scroll from the reign of Ramesses II records brick quotas for work teams, and letters complain of missing straw.", "strong", ["kitchen", "hoffmeier"]]],
    refs: [["EXO.6", "Exodus 6:1", "Now you shall see what I will do"], ["PSA.13", "Psalm 13:1-2", "How long, O LORD?"]],
  },
  6: {
    intro: "God answers Moses: \"Now you shall see what I will do to Pharaoh.\" He repeats His covenant name and gives seven \"I will\" promises: to bring out, deliver, redeem, take Israel as His people, be their God, bring them in and give them the land. The people are too crushed to listen. A family record of Moses and Aaron follows.",
    v: [
      ["6:3", "By My name, LORD, I did not make Myself known", "The patriarchs used the name LORD, so many take this to mean they had not yet experienced all that the name means: God keeping His promise in action.", "debated", ["cole", "stuart"]],
      ["6:6-7", "I will redeem you", "Redeem means to buy back or rescue a relative. God acts as Israel's kinsman."],
      ["6:9", "Despondency and cruel bondage", "Crushed spirits cannot always hear good news at first. God keeps working."],
    ],
    refs: [["JER.31", "Jeremiah 31:33", "I will be their God and they shall be My people"], ["2CO.6", "2 Corinthians 6:16", "I will be their God"]],
  },
  7: {
    intro: "God sends Moses, now 80, and Aaron, 83, back to Pharaoh. Aaron's staff becomes a serpent and swallows the magicians' staffs. Then the first plague: Aaron strikes the Nile and the water turns to blood. The magicians copy it, and Pharaoh's heart is hardened.",
    v: [
      ["7:5", "The Egyptians shall know that I am the LORD", "The plagues are not only judgment; they are revelation, even for Egypt."],
      ["7:12", "Aaron's staff swallowed up their staffs", "The serpent was a symbol of Pharaoh's own power on his crown."],
      ["7:20", "The Nile turned to blood", "The river that was Egypt's life, and where Israel's babies were drowned, becomes death."],
    ],
    bg: [["The plagues and Egypt's gods", "Egypt worshiped the Nile's flooding (Hapi), frogs (Heqet), cattle (Apis, Hathor) and the sun (Ra). Exodus 12:12 says God executed judgment \"against all the gods of Egypt.\"", "good", ["hoffmeier", "stuart"]]],
    refs: [["EXO.12", "Exodus 12:12", "Against all the gods of Egypt"], ["REV.16", "Revelation 16:4", "The rivers became blood"], ["2TI.3", "2 Timothy 3:8", "Jannes and Jambres opposed Moses"]],
  },
  8: {
    intro: "Three more plagues: frogs, then gnats from the dust, then swarms of flies. The magicians can copy the frogs but not the gnats, and they say, \"This is the finger of God.\" From the flies on, God makes a distinction: the land of Goshen, where Israel lives, is spared. Pharaoh promises to let the people go, then changes his mind.",
    v: [
      ["8:10", "Tomorrow", "Pharaoh chooses one more night with the frogs, so that he will know \"there is no one like the LORD our God.\""],
      ["8:19", "The finger of God", "The magicians admit defeat. Jesus later says He casts out demons \"by the finger of God\" (Luke 11:20)."],
      ["8:22-23", "A distinction", "God separates His people from Egypt in the plagues."],
    ],
    refs: [["LUK.11", "Luke 11:20", "By the finger of God"], ["PSA.105", "Psalm 105:30-31", "Their land swarmed with frogs"]],
  },
  9: {
    intro: "A deadly disease strikes Egypt's livestock, then boils break out on people and animals, then the worst hailstorm in Egypt's history. Israel's animals and land are spared. Some Egyptians who fear the word of the LORD bring their servants and cattle indoors. Pharaoh admits, \"I have sinned this time,\" but hardens his heart again.",
    v: [
      ["9:16", "To show you My power", "Paul quotes this in Romans 9:17: God raised Pharaoh up so His name would be proclaimed in all the earth."],
      ["9:20", "The one who feared the word of the LORD", "Some Egyptians believe God's warning and are protected."],
      ["9:27", "I have sinned", "Words of confession without real change."],
    ],
    refs: [["ROM.9", "Romans 9:17", "For this very purpose I raised you up"], ["REV.16", "Revelation 16:21", "Huge hailstones from heaven"]],
  },
  10: {
    intro: "Locusts cover Egypt and eat every green thing the hail left. Then a thick darkness lies over Egypt for three days, but all Israel has light in their homes. Pharaoh offers to let the men go, then the families, but not the flocks. Moses refuses: \"Not a hoof shall be left behind.\" Pharaoh threatens to kill Moses if he sees him again.",
    v: [
      ["10:2", "Tell your son and grandson", "The plagues are to be told to future generations."],
      ["10:22-23", "Darkness that can be felt", "A blow against Ra, Egypt's sun god. \"All the sons of Israel had light in their dwellings.\""],
      ["10:26", "Not a hoof", "Moses will accept no half-obedience."],
    ],
    refs: [["JOL.2", "Joel 2:1-11", "A day of darkness and locusts"], ["REV.9", "Revelation 9:3", "Locusts came upon the earth"]],
  },
  11: {
    intro: "God tells Moses one more plague is coming: at midnight every firstborn in Egypt will die, from Pharaoh's son to the slave girl's and the cattle. Israel is to ask their neighbors for silver and gold, and God gives them favor. Moses leaves Pharaoh in hot anger.",
    v: [
      ["11:3", "Moses was greatly esteemed", "Even Pharaoh's servants respect Moses."],
      ["11:5", "All the firstborn", "Pharaoh ordered Israel's sons drowned (1:22); God had warned that Pharaoh's firstborn would pay (4:23)."],
      ["11:7", "Not even a dog will bark", "So quiet will Israel's camp be that the difference between the two peoples will be plain."],
    ],
    refs: [["EXO.4", "Exodus 4:22-23", "Israel is My firstborn"], ["PSA.105", "Psalm 105:36-37", "He struck down all the firstborn"]],
  },
  12: {
    intro: "God gives Israel the Passover: each household is to kill an unblemished lamb, put its blood on the doorposts, and eat it in haste with unleavened bread and bitter herbs. At midnight the LORD strikes Egypt's firstborn but passes over the houses marked with blood. Pharaoh sends Israel out, and about 600,000 men, plus families and a mixed multitude, leave after 430 years.",
    v: [
      ["12:2", "The first month", "Israel's calendar starts with redemption."],
      ["12:5", "An unblemished lamb", "Paul writes, \"Christ our Passover also has been sacrificed\" (1 Corinthians 5:7). Jesus died at Passover."],
      ["12:13", "When I see the blood I will pass over you", "Israel was saved not by their worth but by the blood of the lamb."],
      ["12:26-27", "What does this rite mean?", "Passover is built for children's questions. Jewish families still answer them at the Seder."],
      ["12:46", "Not a bone broken", "John 19:36 applies this to Jesus on the cross."],
    ],
    w: [["פֶּסַח", "pesach", "H6453", "Passover", "From the verb pasach, to pass or leap over, or possibly to hover over in protection.", ["halot", "durham"]]],
    why: "Exodus 12:37 counts about 600,000 men on foot, which would mean two million people or more. Scholars discuss how to read the Hebrew word for \"thousand.\"",
    views: [
      ["As counted", "Many take the number at face value, pointing to God's miraculous care in the wilderness and the census totals in Numbers 1 and 26 that agree.", ["stuart"]],
      ["Units or clans", "Others note that the Hebrew 'eleph can mean a clan or military unit, not only a thousand, which would give a smaller total.", ["kitchen", "cole"]],
    ],
    common: "All agree that a whole people left Egypt, that God fed and guided them, and that the exodus was the great saving event of the Old Testament.",
    refs: [["1CO.5", "1 Corinthians 5:7", "Christ our Passover"], ["JHN.19", "John 19:36", "Not a bone of Him shall be broken"], ["LUK.22", "Luke 22:7-20", "Jesus' last Passover"], ["1PE.1", "1 Peter 1:18-19", "Redeemed with precious blood, as of a lamb"]],
  },
  13: {
    intro: "God claims every firstborn as His, and Israel is to keep the Feast of Unleavened Bread as a reminder. God leads them not by the short coast road through Philistine land but toward the Red Sea, going before them in a pillar of cloud by day and a pillar of fire by night. Moses takes Joseph's bones with him.",
    v: [
      ["13:2", "Sanctify to Me every firstborn", "Firstborn sons were redeemed with a price (13:13), remembering how God spared them. Jesus was presented at the temple for this reason (Luke 2:22-23)."],
      ["13:17", "Lest the people change their minds", "God knows His people's weakness and chooses the longer road."],
      ["13:19", "Joseph's bones", "Joseph's dying request (Genesis 50:25) is honored about four centuries later."],
      ["13:21-22", "The pillar of cloud and fire", "God's visible presence led them every day and night."],
    ],
    why: "The Hebrew is Yam Suph. Does it mean the Red Sea, or a \"Sea of Reeds\" closer to Egypt?",
    views: [
      ["The Red Sea", "Yam Suph means the Red Sea or its Gulf of Aqaba arm in 1 Kings 9:26, and the Greek translation and the New Testament call it the Red Sea (Acts 7:36; Hebrews 11:29).", ["stuart"]],
      ["A sea of reeds", "Suph means reeds (Exodus 2:3). Some place the crossing at one of the lakes on Egypt's eastern border, such as the Bitter Lakes or Lake Timsah, which were still deep and wide enough to drown an army.", ["hoffmeier", "kitchen"]],
    ],
    common: "Both views hold that God parted real waters and Israel crossed on dry ground. The question is where, not whether.",
    refs: [["LUK.2", "Luke 2:22-23", "Every firstborn male shall be called holy"], ["1CO.10", "1 Corinthians 10:1-2", "Under the cloud and through the sea"], ["NEH.9", "Nehemiah 9:12", "A pillar of cloud by day"]],
  },
  15: {
    intro: "On the far shore Moses and Israel sing a victory song to the LORD: \"The LORD is a warrior.\" Miriam leads the women with tambourines and dancing. Three days into the wilderness the water at Marah is bitter. God shows Moses a tree that makes it sweet and promises, \"I, the LORD, am your healer.\" They camp at the oasis of Elim.",
    v: [
      ["15:2", "The LORD is my strength and song", "Isaiah 12:2 and Psalm 118:14 repeat these words."],
      ["15:11", "Who is like You?", "God is majestic in holiness and working wonders."],
      ["15:24", "The people grumbled", "Three days after the greatest miracle, Israel complains. The pattern repeats throughout the wilderness."],
      ["15:26", "Jehovah-Rapha", "\"I, the LORD, am your healer.\""],
    ],
    refs: [["REV.15", "Revelation 15:3", "The song of Moses and of the Lamb"], ["PSA.118", "Psalm 118:14", "The LORD is my strength and song"], ["ISA.12", "Isaiah 12:2", "He has become my salvation"]],
  },
  16: {
    intro: "In the Wilderness of Sin, the people grumble for the food of Egypt. God sends quail in the evening and manna in the morning, bread from heaven. Each family is to gather just what they need each day, and twice as much on the sixth day, because the seventh day is a Sabbath rest. Some disobey, and the extra manna rots. A jar of manna is kept as a reminder.",
    v: [
      ["16:4", "Bread from heaven", "God tests whether they will trust Him one day at a time."],
      ["16:15", "What is it?", "In Hebrew, man hu, which gives manna its name."],
      ["16:18", "No lack", "Paul uses this for generous sharing in 2 Corinthians 8:15."],
      ["16:23", "A holy Sabbath", "The first time the Sabbath is commanded, before Sinai."],
    ],
    refs: [["JHN.6", "John 6:31-35", "I am the bread of life"], ["DEU.8", "Deuteronomy 8:3", "Man does not live by bread alone"], ["MAT.6", "Matthew 6:11", "Give us this day our daily bread"]],
  },
  17: {
    intro: "At Rephidim there is no water, and the people quarrel with Moses. God tells Moses to strike the rock at Horeb, and water flows out. Then Amalek attacks. Joshua leads the fighting, while on the hilltop Moses raises his hands, held up by Aaron and Hur. Israel wins, and Moses builds an altar called \"The LORD is My Banner.\"",
    v: [
      ["17:6", "Strike the rock", "Paul writes that \"the rock was Christ\" (1 Corinthians 10:4)."],
      ["17:7", "Massah and Meribah", "\"Testing\" and \"quarreling\": \"Is the LORD among us, or not?\" Psalm 95:8 warns not to harden hearts as there."],
      ["17:11-12", "When Moses held his hand up", "Victory depended on God, not on Israel's swords, and Moses needed friends to hold him up."],
      ["17:15", "Jehovah-Nissi", "\"The LORD is My Banner.\""],
    ],
    refs: [["1CO.10", "1 Corinthians 10:4", "The rock was Christ"], ["PSA.95", "Psalm 95:8-9", "Do not harden your hearts as at Meribah"], ["DEU.25", "Deuteronomy 25:17-19", "Remember what Amalek did"]],
  },
  18: {
    intro: "Jethro, Moses' father-in-law, brings Zipporah and Moses' sons to the camp. Hearing all that God did, Jethro rejoices and offers sacrifices. Seeing Moses judge the people from morning to evening, he gives wise advice: choose capable, God-fearing, honest men to handle smaller cases, and bring only the hard cases to Moses.",
    v: [
      ["18:11", "Now I know", "A Midianite priest confesses that the LORD is greater than all the gods."],
      ["18:18", "You will surely wear out", "Even Moses needs help. Leadership is meant to be shared."],
      ["18:21", "Able men who fear God", "Character first: men of truth who hate dishonest gain."],
    ],
    refs: [["ACT.6", "Acts 6:1-6", "Seven men chosen to serve"], ["DEU.1", "Deuteronomy 1:9-18", "Moses recalls appointing judges"]],
  },
  19: {
    intro: "Three months after leaving Egypt, Israel camps before Mount Sinai. God says, \"I bore you on eagles' wings and brought you to Myself,\" and offers them a covenant: they will be His treasured possession, a kingdom of priests and a holy nation. The people prepare for three days. Then, with thunder, lightning, a thick cloud, fire, smoke and a very loud trumpet, the LORD comes down on the mountain.",
    v: [
      ["19:4", "On eagles' wings", "God rescued them first; then He gave the law. Grace comes before command."],
      ["19:5-6", "A kingdom of priests and a holy nation", "Peter applies these words to the church (1 Peter 2:9)."],
      ["19:12", "Set bounds", "God's holiness is dangerous. Hebrews 12:18-24 contrasts Sinai with the welcome of Mount Zion in Christ."],
      ["19:18", "The whole mountain quaked", "God's presence shakes the earth."],
    ],
    why: "Where is Mount Sinai? The Bible names it but gives no map coordinates.",
    views: [
      ["In the southern Sinai Peninsula", "The traditional site, Jebel Musa, has been honored since at least the 300s AD, and the travel stages in Numbers 33 fit a southern route.", ["hoffmeier", "kitchen"]],
      ["Elsewhere in Sinai or in Arabia", "Others suggest a northern Sinai site, or a mountain in north-west Arabia, since Paul places Sinai \"in Arabia\" (Galatians 4:25) and Moses met God near Midian.", ["stuart"]],
    ],
    common: "All agree that God met Israel at a real mountain, gave His covenant there, and that the place matters less than the meeting.",
    refs: [["1PE.2", "1 Peter 2:9", "A royal priesthood, a holy nation"], ["HEB.12", "Hebrews 12:18-24", "You have not come to a mountain that can be touched"], ["DEU.32", "Deuteronomy 32:11", "Like an eagle that stirs up its nest"]],
  },
  20: {
    intro: "God speaks the Ten Commandments to all Israel: no other gods, no idols, not misusing His name, keeping the Sabbath, honoring parents, no murder, no adultery, no stealing, no false witness and no coveting. The people are terrified and ask Moses to speak to them instead. God gives instructions for a simple altar.",
    v: [
      ["20:2", "I am the LORD your God, who brought you out", "The commandments begin with what God has done. Obedience answers grace."],
      ["20:3", "No other gods before Me", "Literally \"before My face.\" Nothing may share God's place."],
      ["20:8-11", "Remember the Sabbath", "Rest is rooted in creation. Deuteronomy 5:15 adds the exodus as a reason."],
      ["20:12", "Honor your father and your mother", "Paul calls it \"the first commandment with a promise\" (Ephesians 6:2)."],
      ["20:20", "Do not be afraid... that the fear of Him may remain", "Not terror, but a reverence that keeps us from sin."],
    ],
    refs: [["DEU.5", "Deuteronomy 5:6-21", "The Ten Commandments repeated"], ["MAT.22", "Matthew 22:37-40", "The two great commandments"], ["ROM.13", "Romans 13:8-10", "Love is the fulfillment of the law"]],
  },
  21: {
    intro: "Laws for daily life in Israel begin, often called the Book of the Covenant (chapters 21-23): laws about Hebrew servants, which limit service to six years, and about violence, injury, and damages caused by people and animals, including \"eye for eye, tooth for tooth.\"",
    v: [
      ["21:2", "Six years, then free", "Hebrew servanthood was a way to pay off debt, with a set end."],
      ["21:5-6", "I love my master", "A servant could choose to stay for life, marked by an awl through the ear at the doorpost."],
      ["21:23-25", "Eye for eye", "A rule for judges, limiting punishment to fit the harm, not a license for personal revenge (Matthew 5:38-39)."],
    ],
    bg: [["Other ancient law codes", "Babylon's Code of Hammurabi (about 1750 BC) has similar case laws, but it punished by class: harming a nobleman cost more than harming a commoner. Israel's laws protect slaves and treat human life as beyond price.", "strong", ["anet", "stuart"]]],
    refs: [["MAT.5", "Matthew 5:38-42", "You have heard, an eye for an eye"], ["DEU.15", "Deuteronomy 15:12-18", "Releasing a Hebrew servant"]],
  },
  22: {
    intro: "Laws about theft and repayment, property damage, borrowing, and moral and religious duties: do not wrong a stranger, a widow or an orphan, do not charge interest to the poor, and return a poor man's cloak by sunset.",
    v: [
      ["22:1", "Repay five oxen for one", "Restitution, not prison, was the main response to theft. Zacchaeus offered fourfold (Luke 19:8)."],
      ["22:21", "You were strangers in Egypt", "Israel's own past is the reason to be kind to foreigners."],
      ["22:22-24", "The widow and the orphan", "God Himself hears their cry."],
      ["22:26-27", "Before the sun sets", "A poor man's cloak was his blanket. \"I am gracious.\""],
    ],
    refs: [["LUK.19", "Luke 19:8", "I will give back four times as much"], ["JAS.1", "James 1:27", "Visit orphans and widows"]],
  },
  23: {
    intro: "Laws for justice in court, kindness even to an enemy's animal, the Sabbath year for the land, and three yearly feasts: Unleavened Bread, Harvest and Ingathering. God promises to send His angel before Israel to guard them and bring them into the land, little by little.",
    v: [
      ["23:2", "Do not follow the crowd in doing evil", "Justice must not bend to majority opinion or to pity for the rich or poor."],
      ["23:4-5", "Your enemy's ox", "Love for enemies starts with helping their animals."],
      ["23:14-17", "Three feasts", "Passover with Unleavened Bread, the Feast of Harvest (later Pentecost), and Ingathering (Booths)."],
      ["23:20", "I am going to send an angel before you", "God's presence will lead them, and they must obey Him."],
    ],
    refs: [["MAT.5", "Matthew 5:44", "Love your enemies"], ["LEV.23", "Leviticus 23", "The feasts of the LORD"]],
  },
  24: {
    intro: "Moses reads the Book of the Covenant to the people, and they answer, \"All that the LORD has spoken we will do.\" He sprinkles blood on the altar and on the people: \"the blood of the covenant.\" Moses, Aaron, his sons and seventy elders see the God of Israel and eat a meal in His presence. Then Moses goes up the mountain for forty days.",
    v: [
      ["24:7", "We will do", "A sincere promise they will quickly break (chapter 32)."],
      ["24:8", "The blood of the covenant", "Jesus echoes these words at the Last Supper: \"This is My blood of the covenant\" (Mark 14:24)."],
      ["24:10-11", "They saw God, and they ate and drank", "Under His feet was something like sapphire, clear as the sky. A covenant meal in God's presence."],
      ["24:18", "Forty days and forty nights", "Moses waits on God on the mountain."],
    ],
    refs: [["MRK.14", "Mark 14:24", "My blood of the covenant"], ["HEB.9", "Hebrews 9:18-22", "Not even the first covenant was made without blood"]],
  },
  25: {
    intro: "God asks Israel for a willing offering to build a sanctuary \"that I may dwell among them,\" built exactly after the pattern He shows Moses. He describes the ark of the covenant with its mercy seat and cherubim, the table for the bread of the Presence, and the golden lampstand.",
    v: [
      ["25:2", "From every man whose heart moves him", "The tabernacle is built by glad, voluntary giving."],
      ["25:8", "That I may dwell among them", "The heart of the tabernacle. John 1:14 says the Word \"dwelt among us,\" literally \"tabernacled.\""],
      ["25:17-22", "The mercy seat", "The gold lid of the ark, where blood was sprinkled on the Day of Atonement. Romans 3:25 uses the Greek word for it of Christ."],
      ["25:31", "The lampstand", "A golden tree-like lamp with seven branches, giving light in the holy place."],
    ],
    refs: [["JHN.1", "John 1:14", "The Word dwelt among us"], ["HEB.8", "Hebrews 8:5", "A copy and shadow of the heavenly things"], ["HEB.9", "Hebrews 9:1-5", "The tabernacle and its furniture"]],
  },
  26: {
    intro: "Instructions for the tabernacle tent itself: curtains of fine linen with cherubim woven in, coverings of goat hair and skins, a frame of boards set in silver sockets, and a veil that divides the holy place from the holy of holies, where the ark will sit.",
    v: [
      ["26:1", "Curtains with cherubim", "Cherubim guarded Eden (Genesis 3:24). The tabernacle pictures a way back into God's presence."],
      ["26:30", "According to its plan", "Every detail follows God's pattern."],
      ["26:33", "The veil", "Only the high priest went behind it, once a year. When Jesus died, the temple veil was torn from top to bottom (Matthew 27:51)."],
    ],
    refs: [["MAT.27", "Matthew 27:51", "The veil of the temple was torn"], ["HEB.10", "Hebrews 10:19-20", "A new and living way through the veil, His flesh"]],
  },
  27: {
    intro: "Instructions for the bronze altar of burnt offering with horns on its four corners, the courtyard around the tabernacle with its linen hangings and gate, and the clear olive oil to keep the lamp burning continually.",
    v: [
      ["27:1-2", "The bronze altar", "The first thing a worshiper met inside the gate: there is no approach to God without sacrifice."],
      ["27:16", "The gate", "One entrance, on the east side."],
      ["27:20-21", "A lamp to burn continually", "The light was tended from evening to morning, a sign of God's ongoing presence."],
    ],
    refs: [["JHN.10", "John 10:9", "I am the door"], ["HEB.13", "Hebrews 13:10", "We have an altar"]],
  },
  28: {
    intro: "God appoints Aaron and his sons as priests and describes their holy garments \"for glory and for beauty\": the ephod with two onyx stones engraved with the tribes' names, the breastpiece with twelve gems and the Urim and Thummim, the blue robe with bells and pomegranates, and the gold plate on the turban engraved \"Holy to the LORD.\"",
    v: [
      ["28:12, 29", "Names on his shoulders and heart", "The high priest carries the people before God, a picture of Christ who always lives to intercede (Hebrews 7:25)."],
      ["28:30", "The Urim and Thummim", "Objects kept in the breastpiece for learning God's will. Scripture does not say exactly what they were or how they worked.", "silent"],
      ["28:36", "Holy to the LORD", "Engraved on a gold plate on Aaron's forehead."],
    ],
    refs: [["HEB.7", "Hebrews 7:25-28", "A high priest who always lives to intercede"], ["HEB.4", "Hebrews 4:14-16", "A great high priest"]],
  },
  29: {
    intro: "The seven-day ordination of Aaron and his sons: washing, clothing, anointing, a sin offering, a burnt offering and an ordination ram whose blood is put on the right ear, thumb and big toe. God also commands the daily burnt offering of two lambs, morning and evening, and promises, \"I will dwell among the sons of Israel and will be their God.\"",
    v: [
      ["29:4", "Wash them with water", "Priests had to be cleansed before they could serve."],
      ["29:20", "Ear, thumb and toe", "Their hearing, their work and their walk were set apart for God."],
      ["29:38-42", "The continual burnt offering", "Every morning and evening a lamb was offered, the steady heartbeat of Israel's worship."],
      ["29:45-46", "I will dwell among them", "The purpose of the exodus: God brought them out so He could live with them."],
    ],
    refs: [["LEV.8", "Leviticus 8", "Aaron and his sons ordained"], ["HEB.10", "Hebrews 10:11-14", "One sacrifice for sins for all time"]],
  },
  30: {
    intro: "Instructions for the gold altar of incense in front of the veil, a half-shekel ransom paid equally by every man counted in a census, the bronze basin for priests to wash, the holy anointing oil and the holy incense, which were not to be copied for common use.",
    v: [
      ["30:7-8", "Fragrant incense every morning and evening", "Psalm 141:2: \"May my prayer be counted as incense before You.\""],
      ["30:15", "The rich shall not pay more and the poor shall not pay less", "Every life is ransomed at the same price."],
      ["30:18-21", "The bronze basin", "Priests washed hands and feet before serving, so that they would not die."],
    ],
    refs: [["PSA.141", "Psalm 141:2", "My prayer as incense"], ["REV.8", "Revelation 8:3-4", "Incense with the prayers of the saints"], ["1PE.1", "1 Peter 1:18-19", "Redeemed not with silver or gold"]],
  },
  31: {
    intro: "God has filled Bezalel of Judah with His Spirit, wisdom and skill for every craft, and gives him Oholiab as a helper to make everything for the tabernacle. God then repeats the Sabbath command as the sign of His covenant, and gives Moses the two stone tablets written by the finger of God.",
    v: [
      ["31:3", "Filled with the Spirit of God", "The first person said to be filled with God's Spirit is an artist."],
      ["31:13", "A sign between Me and you", "The Sabbath showed Israel that the LORD makes them holy."],
      ["31:18", "Written by the finger of God", "The commandments are God's own words."],
    ],
    refs: [["EXO.35", "Exodus 35:30-35", "Bezalel and Oholiab begin work"], ["2CO.3", "2 Corinthians 3:3", "Written not on tablets of stone but on hearts"]],
  },
  32: {
    intro: "While Moses is on the mountain, the people ask Aaron to make gods, and he makes a golden calf. They worship and feast. God tells Moses to go down, and Moses pleads for the people. Seeing the calf, Moses breaks the tablets, burns the calf, and grinds it to powder. The Levites side with the LORD. Moses offers to be blotted out of God's book for the people's sake.",
    v: [
      ["32:4", "These are your gods, O Israel", "They likely meant the calf to represent the LORD (32:5), but God had forbidden any image of Himself."],
      ["32:11-14", "Moses pleads", "Moses appeals to God's glory and His promises, and God relents."],
      ["32:24", "Out came this calf", "Aaron's famous excuse."],
      ["32:32", "Blot me out of Your book", "Moses would give himself for the people, as Paul later wishes for Israel (Romans 9:3)."],
    ],
    refs: [["PSA.106", "Psalm 106:19-23", "They made a calf in Horeb"], ["ACT.7", "Acts 7:39-41", "They made a calf"], ["1CO.10", "1 Corinthians 10:7", "Do not be idolaters"]],
  },
  33: {
    intro: "God says He will send an angel ahead but will not go with Israel Himself, and the people mourn. Moses meets God in the tent of meeting \"face to face, just as a man speaks to his friend.\" Moses pleads, \"If Your presence does not go with us, do not lead us up from here,\" and God agrees. Moses asks to see God's glory, and God hides him in a rock and passes by.",
    v: [
      ["33:11", "As a man speaks to his friend", "Not that Moses saw God's full being (33:20), but that God spoke with him openly and personally."],
      ["33:15", "If Your presence does not go with us", "Moses wants God Himself, not just the land."],
      ["33:19", "I will be gracious to whom I will be gracious", "Paul quotes it in Romans 9:15."],
      ["33:22", "In the cleft of the rock", "God shields Moses with His hand."],
    ],
    refs: [["JHN.1", "John 1:18", "No one has seen God at any time; the only begotten God has explained Him"], ["2CO.4", "2 Corinthians 4:6", "The glory of God in the face of Christ"]],
  },
  34: {
    intro: "God renews the covenant. Moses cuts two new tablets, and the LORD passes by proclaiming His name: \"The LORD, the LORD God, compassionate and gracious, slow to anger, and abounding in lovingkindness and truth.\" After forty more days, Moses comes down, and his face shines, so he wears a veil.",
    v: [
      ["34:6-7", "God's own description of Himself", "The most quoted verse in the Old Testament, repeated in Numbers, Nehemiah, the Psalms, Joel, Jonah and Nahum."],
      ["34:14", "Jealous is His name", "God's jealousy is the rightful love of a husband for his wife."],
      ["34:29", "The skin of his face shone", "Moses did not know it. Paul writes about this veil in 2 Corinthians 3."],
    ],
    refs: [["PSA.103", "Psalm 103:8", "Compassionate and gracious"], ["JON.4", "Jonah 4:2", "I knew that You are a gracious God"], ["2CO.3", "2 Corinthians 3:7-18", "The glory on Moses' face"]],
  },
  35: {
    intro: "Moses repeats the Sabbath law and invites everyone with a willing heart to bring offerings for the tabernacle. Men and women bring gold, jewelry, yarn, skins, wood, oil and spices, and skilled women spin. Bezalel and Oholiab are named as the master craftsmen, gifted by God to teach others.",
    v: [
      ["35:5", "Whoever is of a willing heart", "Giving is a matter of the heart."],
      ["35:21", "Everyone whose heart stirred him", "The same people who gave gold to a calf now give it to God's house."],
      ["35:34", "To teach", "God gave the craftsmen the ability to teach as well as to do."],
    ],
    refs: [["2CO.9", "2 Corinthians 9:7", "God loves a cheerful giver"], ["1CH.29", "1 Chronicles 29:9", "The people rejoiced because they gave willingly"]],
  },
  36: {
    intro: "The craftsmen begin work. The people bring so much that the workers tell Moses, and Moses has to tell the people to stop giving. Then the tabernacle's curtains, coverings, boards and veil are made exactly as God commanded.",
    v: [
      ["36:5", "Much more than enough", "A rare problem: too many gifts."],
      ["36:6", "So the people were restrained from bringing any more", "Generosity overflowed."],
      ["36:8", "Skillful workmen", "Chapters 36-39 repeat the instructions of 25-31 almost word for word, now as obedience."],
    ],
    refs: [["EXO.26", "Exodus 26", "The instructions for the tent"], ["2CO.8", "2 Corinthians 8:1-5", "Overflowing generosity"]],
  },
  37: {
    intro: "Bezalel makes the ark of acacia wood overlaid with gold, the mercy seat with two cherubim, the table, the golden lampstand, the altar of incense, and the holy anointing oil and incense.",
    v: [
      ["37:1", "Bezalel made the ark", "The master craftsman makes the most holy object himself."],
      ["37:9", "Facing each other", "The cherubim look down toward the mercy seat, where God meets His people."],
      ["37:17", "Of pure gold", "The lampstand was hammered from one talent of gold, about 75 pounds.", "good", ["stuart"]],
    ],
    refs: [["EXO.25", "Exodus 25:10-40", "The instructions"], ["HEB.9", "Hebrews 9:3-5", "The ark and the cherubim of glory"]],
  },
  38: {
    intro: "The bronze altar, the bronze basin made from the mirrors of the women who served at the tent's door, and the courtyard are made. An account is given of the gold, silver and bronze used, counted under Ithamar the priest.",
    v: [
      ["38:8", "Mirrors of the serving women", "Polished bronze mirrors were given up to make the basin."],
      ["38:22-23", "Bezalel... and with him Oholiab", "Skilled craftsmen filled with God's Spirit for the work (31:1-6)."],
      ["38:24", "All the gold... was 29 talents", "A great treasure, given freely by the people (35:21)."],
      ["38:25-26", "Silver from the census", "The half-shekel ransom of 603,550 men became the silver bases of the tabernacle. It literally stood on redemption money."],
    ],
    bg: [["Ancient mirrors", "Mirrors in this period were polished bronze, not glass. Many have been found in Egypt. The women gave up something personal and precious so it could become the basin where the priests washed.", "strong", ["stuart", "hoffmeier"]]],
    refs: [["EXO.30", "Exodus 30:11-16", "The ransom money"], ["NUM.1", "Numbers 1:46", "603,550 counted"]],
  },
  39: {
    intro: "The priests' garments are made: the ephod, the breastpiece with twelve stones for the twelve tribes, the robe, tunics and the gold plate engraved \"Holy to the LORD.\" The finished work is brought to Moses. He sees that they have done everything just as the LORD commanded, and he blesses them.",
    v: [
      ["39:30", "Holy to the LORD", "The gold plate for Aaron's turban."],
      ["39:32", "Just as the LORD had commanded", "The phrase is repeated again and again in chapters 39-40."],
      ["39:43", "Moses blessed them", "Like God viewing creation, Moses inspects the finished work and blesses it."],
    ],
    refs: [["GEN.1", "Genesis 1:31", "God saw all that He had made"], ["EXO.28", "Exodus 28", "The instructions for the garments"]],
  },
  40: {
    intro: "On the first day of the second year, Moses sets up the tabernacle, puts everything in place and anoints it. When the work is finished, the cloud covers the tent and the glory of the LORD fills the tabernacle, so that even Moses cannot enter. From then on, the cloud leads Israel on all their journeys.",
    v: [
      ["40:2", "The first day of the first month", "About a year after leaving Egypt."],
      ["40:33", "So Moses finished the work", "Echoing Genesis 2:2, where God finished His work of creation."],
      ["40:34-35", "The glory of the LORD filled the tabernacle", "The book that began with Israel enslaved ends with God living among them."],
      ["40:38", "Throughout all their journeys", "God's presence goes with them all the way."],
    ],
    refs: [["1KI.8", "1 Kings 8:10-11", "The glory fills Solomon's temple"], ["JHN.1", "John 1:14", "We saw His glory"], ["REV.21", "Revelation 21:3", "The tabernacle of God is among men"]],
  },
});
