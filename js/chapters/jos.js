// Joshua chapter notes.
import { makeBook } from "./make.js";

const sources = {
  howard: "David M. Howard Jr., Joshua, New American Commentary 5 (Broadman & Holman, 1998).",
  hess: "Richard S. Hess, Joshua, Tyndale Old Testament Commentaries (InterVarsity Press, 1996).",
  woudstra: "Marten H. Woudstra, The Book of Joshua, New International Commentary on the Old Testament (Eerdmans, 1981).",
  butler: "Trent C. Butler, Joshua, Word Biblical Commentary 7 (Word, 1983).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  copan: "Paul Copan and Matthew Flannagan, Did God Really Command Genocide? (Baker, 2014).",
  wright: "Christopher J. H. Wright, The God I Don't Understand (Zondervan, 2008).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["howard", "hess"] }, {
  1: {
    intro: "After Moses dies, God commissions Joshua to lead Israel across the Jordan: \"Be strong and courageous... for the LORD your God is with you wherever you go.\" He must meditate on God's law day and night. Joshua prepares the people, and the eastern tribes promise to fight alongside their brothers.",
    v: [
      ["1:5", "I will not fail you or forsake you", "The promise given through Moses (Deuteronomy 31:6) is repeated to Joshua."],
      ["1:7", "Do not turn from it to the right or to the left", "Courage here is the courage to obey."],
      ["1:8", "Meditate on it day and night", "Like Psalm 1:2. Success comes from God's word in heart and mouth."],
      ["1:9", "Be strong and courageous", "Said three times in this chapter (1:6, 7, 9), with the reason: God is with you."],
    ],
    refs: [["DEU.31", "Deuteronomy 31:6-8", "Be strong and courageous"], ["PSA.1", "Psalm 1:2", "Meditating day and night"], ["HEB.13", "Hebrews 13:5", "I will never desert you"]],
  },
  2: {
    intro: "Joshua sends two spies to Jericho. They stay at the house of Rahab, a prostitute, who hides them on her roof under flax and lies to the king's men. She confesses that the LORD is God in heaven and on earth, and asks for her family to be spared. The spies promise, and she ties a scarlet cord in her window.",
    v: [
      ["2:9-11", "Our hearts melted", "Jericho had heard about the Red Sea and Sihon and Og. Rahab concludes, \"The LORD your God, He is God in heaven above and on earth beneath.\""],
      ["2:12", "Deal kindly with my father's household", "She asks for hesed, covenant kindness."],
      ["2:18", "The cord of scarlet thread", "A sign of rescue, like the Passover blood on the door."],
    ],
    why: "Rahab lied to protect the spies (2:4-5). Was she right to lie?",
    views: [
      ["Commended for faith, not for the lie", "Many hold that Scripture praises her faith and courage (Hebrews 11:31; James 2:25) without approving the lie.", ["howard", "woudstra"]],
      ["A justified deception", "Others argue that deceiving those set on murder, like the Hebrew midwives (Exodus 1:19), is not the kind of lying the Bible condemns.", ["hess"]],
    ],
    common: "All agree that Rahab, an outsider and a sinner, was saved by faith, joined God's people and became an ancestor of David and Jesus (Matthew 1:5).",
    refs: [["HEB.11", "Hebrews 11:31", "By faith Rahab"], ["JAS.2", "James 2:25", "Rahab justified by works"], ["MAT.1", "Matthew 1:5", "Salmon was the father of Boaz by Rahab"]],
  },
  3: {
    intro: "The priests carrying the ark step into the flooded Jordan, and the water upstream stops and piles up at the town of Adam. All Israel crosses on dry ground while the priests stand in the middle of the riverbed.",
    v: [
      ["3:5", "Consecrate yourselves", "\"Tomorrow the LORD will do wonders among you.\""],
      ["3:10", "The living God is among you", "The crossing proves God will drive out the nations."],
      ["3:15", "The Jordan overflows all its banks", "The miracle happened at flood season, in spring."],
      ["3:16", "At Adam", "About 18 miles upstream. Landslides there have blocked the Jordan for hours in recorded history, as in 1927. God may have used such means, but the timing was His miracle.", "good", ["howard", "hess"]],
    ],
    refs: [["EXO.14", "Exodus 14:21-22", "The Red Sea crossing"], ["PSA.114", "Psalm 114:3-5", "The Jordan turned back"]],
  },
  4: {
    intro: "Twelve men, one from each tribe, carry twelve stones from the riverbed and set them up at Gilgal as a memorial. When children ask, \"What do these stones mean?\" parents will tell how the Jordan stopped. Once the priests step out, the river flows again.",
    v: [
      ["4:6", "When your children ask", "Memorials invite questions and stories."],
      ["4:14", "The LORD exalted Joshua", "The people now revere Joshua as they did Moses."],
      ["4:24", "That all the peoples of the earth may know", "God's acts are meant for the whole world."],
    ],
    refs: [["EXO.12", "Exodus 12:26-27", "When your children ask"], ["PSA.78", "Psalm 78:4", "Tell the next generation"]],
  },
  5: {
    intro: "The kings of Canaan lose heart. At Gilgal the new generation is circumcised, and God says, \"Today I have rolled away the reproach of Egypt.\" They keep the Passover, eat the produce of the land, and the manna stops. Near Jericho, Joshua meets the commander of the LORD's army and is told to remove his sandals.",
    v: [
      ["5:9", "Gilgal, rolling", "The name sounds like the Hebrew for \"roll away.\""],
      ["5:12", "The manna ceased", "God's provision changes form but does not stop."],
      ["5:13-14", "Are you for us or for our adversaries?", "\"No; rather I indeed come now as captain of the host of the LORD.\" The question is not whether God is on our side, but whether we are on His."],
      ["5:15", "Remove your sandal", "As Moses did at the bush (Exodus 3:5)."],
    ],
    refs: [["EXO.3", "Exodus 3:5", "Holy ground"], ["COL.2", "Colossians 2:11", "Circumcision made without hands"]],
  },
  6: {
    intro: "God tells Israel to march around Jericho once a day for six days, with seven priests blowing ram's horns before the ark, and seven times on the seventh day. At the long trumpet blast the people shout, and the wall falls down flat. The city is devoted to destruction, but Rahab and her family are rescued, as promised.",
    v: [
      ["6:2", "I have given Jericho into your hand", "Spoken before the battle."],
      ["6:17", "Under the ban", "Hebrew herem: devoted to God, either to destruction or to His treasury."],
      ["6:20", "The wall fell down flat", "Hebrews 11:30: \"By faith the walls of Jericho fell down.\""],
      ["6:25", "Rahab lived in Israel", "\"To this day\": her family joined God's people."],
    ],
    bg: [["Jericho's walls", "Excavations at Jericho found collapsed walls, a burn layer and storage jars full of grain, meaning the city fell quickly in spring after harvest. But the dating is debated: Kathleen Kenyon dated the destruction to about 1550 BC, before the usual dates for Joshua, while others argue for about 1400 BC.", "debated", ["kitchen", "hess"]]],
    why: "Why did God command the destruction of the Canaanite cities? This is one of the hardest questions in the Old Testament.",
    views: [
      ["Judgment on long, terrible sin", "God had waited over four hundred years, \"for the iniquity of the Amorite is not yet complete\" (Genesis 15:16). Child sacrifice and other practices brought judgment, as Israel itself would later be judged for the same sins.", ["wright", "howard"]],
      ["War language and focus on military targets", "Others note that ancient war reports used sweeping language (\"left no survivor\") alongside statements that many people remained (Judges 1). They argue the commands focused on driving out and on military strongholds.", ["copan", "hess"]],
    ],
    common: "All agree this was a unique moment in history, not a pattern for God's people today; that God judges sin justly and spared those like Rahab who turned to Him; and that Jesus calls His followers to love their enemies.",
    refs: [["HEB.11", "Hebrews 11:30-31", "By faith the walls fell"], ["GEN.15", "Genesis 15:16", "The iniquity of the Amorite"], ["1KI.16", "1 Kings 16:34", "Hiel rebuilds Jericho"]],
  },
  7: {
    intro: "Israel attacks the small town of Ai and is defeated. Joshua falls before the ark in grief. God reveals that someone took devoted things from Jericho. By lot, Achan is found; he confesses he saw, coveted and took a cloak, silver and gold, and hid them in his tent. He and his family are stoned in the Valley of Achor.",
    v: [
      ["7:1", "Israel acted unfaithfully", "One man's sin affects the whole people."],
      ["7:11", "They have sinned", "God tells Joshua to stop lying on his face and deal with the sin."],
      ["7:21", "I saw... coveted... took... hid", "The same steps as Eve in Genesis 3:6."],
      ["7:26", "The Valley of Achor", "\"Trouble.\" Hosea 2:15 promises God will make it \"a door of hope.\""],
    ],
    refs: [["HOS.2", "Hosea 2:15", "The valley of Achor as a door of hope"], ["ACT.5", "Acts 5:1-11", "Ananias and Sapphira"], ["JAS.1", "James 1:14-15", "Lust conceived gives birth to sin"]],
  },
  8: {
    intro: "Encouraged by God, Israel takes Ai using an ambush. Then Joshua builds an altar on Mount Ebal, writes a copy of the law on stones, and reads all of it to the people, with half on Gerizim and half on Ebal, as Moses commanded.",
    v: [
      ["8:1", "Do not fear", "After failure, God renews His promise."],
      ["8:2", "Take its spoil", "Here God allows what He had forbidden at Jericho. Achan only had to wait."],
      ["8:35", "Not a word which Joshua did not read", "To men, women, children and strangers."],
    ],
    refs: [["DEU.27", "Deuteronomy 27:1-8", "Moses' instructions"], ["NEH.8", "Nehemiah 8:1-8", "Ezra reads the law"]],
  },
  9: {
    intro: "The people of Gibeon, a nearby city, pretend to have come from far away, with old sacks, patched sandals and moldy bread. Israel's leaders make a peace treaty with them without asking the LORD. When the truth comes out, Israel keeps its oath, and the Gibeonites become woodcutters and water carriers for the altar.",
    v: [
      ["9:14", "They did not ask for the counsel of the LORD", "The real failure was not seeking God."],
      ["9:19", "We have sworn to them", "Israel keeps its word even when tricked."],
      ["9:27", "For the altar of the LORD", "The Gibeonites end up serving at God's house."],
    ],
    refs: [["2SA.21", "2 Samuel 21:1-2", "Saul broke the oath to Gibeon"], ["PSA.15", "Psalm 15:4", "He swears to his own hurt and does not change"]],
  },
  10: {
    intro: "Five Amorite kings attack Gibeon, and Israel marches all night to defend their new ally. God throws the enemy into panic and sends huge hailstones. Joshua prays, \"O sun, stand still at Gibeon,\" and the sun stays in the sky about a whole day. Joshua then takes the cities of the south.",
    v: [
      ["10:8", "Do not fear them", "God's promise before battle."],
      ["10:11", "More died from the hailstones", "God fought for Israel."],
      ["10:13", "The book of Jashar", "An ancient poetry book also quoted in 2 Samuel 1:18."],
      ["10:14", "There was no day like that", "\"When the LORD listened to the voice of a man.\""],
    ],
    why: "What happened when \"the sun stood still\" (10:12-14)? Christians who all believe in miracles read this differently.",
    views: [
      ["The day was lengthened", "Many hold that God miraculously extended the daylight, as the plain words say.", ["howard"]],
      ["Light, darkness or a sign", "Others note that Hebrew \"be still\" can mean \"be silent\" or \"stop shining,\" and suggest God kept the hot sun hidden by the storm, or gave a sign in the sky that meant victory.", ["hess", "woudstra"]],
      ["Poetic language", "Some note it is quoted from a book of poetry, and read it as the vivid language of a song about a God-given victory.", ["butler"]],
    ],
    common: "All agree God answered Joshua's prayer and fought for Israel that day in a way no one had ever seen.",
    refs: [["HAB.3", "Habakkuk 3:11", "Sun and moon stood in their places"], ["ISA.28", "Isaiah 28:21", "As in the valley of Gibeon"]],
  },
  11: {
    intro: "Jabin king of Hazor gathers a huge northern army with horses and chariots. God says, \"Do not be afraid,\" and Israel wins at the waters of Merom. Joshua burns Hazor and takes the north. After a long war, \"the land had rest from war.\"",
    v: [
      ["11:6", "Hamstring their horses", "Israel was not to trust in chariots."],
      ["11:15", "He left nothing undone", "Joshua obeyed everything God commanded Moses."],
      ["11:23", "The land had rest", "Yet much land remained (13:1)."],
    ],
    bg: [["Hazor", "Hazor was the largest city in Canaan. Its great Late Bronze Age city was destroyed by fire in the 1200s BC, and its excavators linked that burn layer with Joshua.", "good", ["kitchen", "hess"]]],
    refs: [["JDG.4", "Judges 4:2", "Another Jabin of Hazor"], ["PSA.20", "Psalm 20:7", "Some trust in chariots"]],
  },
  12: {
    intro: "A list of the kings defeated by Moses east of the Jordan and by Joshua west of it: thirty-one kings in all.",
    v: [
      ["12:1-5", "Sihon and Og", "The two Amorite kings east of the Jordan, whose defeat was sung about for generations (Psalm 136:19-20)."],
      ["12:6", "Moses the servant of the LORD", "The two leaders' victories are put side by side."],
      ["12:24", "In all, thirty-one kings", "Each name is a promise kept."],
    ],
    bg: [["Why a list of kings?", "Ancient rulers often recorded their victories as lists of defeated cities or kings; Egyptian pharaohs carved such lists on temple walls. A list like this fits its time. For Israel it was also a record of God's faithfulness, the promise of the land kept city by city.", "good", ["hess", "kitchen"]]],
    refs: [["PSA.136", "Psalm 136:17-22", "He struck down great kings"], ["DEU.7", "Deuteronomy 7:24", "He will deliver their kings into your hand"]],
  },
  13: {
    intro: "Joshua is old, and much land remains to be taken. God tells him to divide the land anyway. The chapter records the land east of the Jordan given to Reuben, Gad and half of Manasseh. The Levites receive no land, because the LORD is their inheritance.",
    v: [
      ["13:1", "Very much of the land remains", "God's gift was real, but taking it required faith over time."],
      ["13:14", "The offerings are their inheritance", "Repeated in 13:33: \"the LORD... is their inheritance.\""],
      ["13:22", "Balaam", "His death (Numbers 31:8) is recalled."],
    ],
    refs: [["NUM.32", "Numbers 32", "The eastern tribes"], ["NUM.18", "Numbers 18:20", "I am your portion"]],
  },
  14: {
    intro: "The land west of the Jordan is divided by lot. Caleb, now 85, reminds Joshua of God's promise and asks for the hill country of Hebron, still held by giants: \"Give me this mountain.\" Joshua blesses him, and Hebron becomes his.",
    v: [
      ["14:2", "By lot", "The lot put the choice in God's hands (Proverbs 16:33)."],
      ["14:8", "I followed the LORD my God fully", "Caleb's testimony after forty-five years."],
      ["14:11", "As strong today as I was", "Faith does not retire."],
    ],
    refs: [["NUM.14", "Numbers 14:24", "My servant Caleb"], ["PRO.16", "Proverbs 16:33", "The lot is cast into the lap"]],
  },
  15: {
    intro: "The borders and towns of Judah's territory. Caleb drives out the three sons of Anak from Hebron and gives his daughter Achsah to Othniel, who captures Debir. Achsah asks for springs of water and receives them. Judah cannot drive out the Jebusites of Jerusalem.",
    v: [
      ["15:14", "Caleb drove out the three sons of Anak", "The giants who frightened the ten spies."],
      ["15:19", "Give me a blessing", "Achsah boldly asks her father for springs."],
      ["15:63", "They could not drive them out", "Jerusalem stayed Jebusite until David took it (2 Samuel 5:6-7)."],
    ],
    refs: [["JDG.1", "Judges 1:12-15", "Othniel and Achsah"], ["2SA.5", "2 Samuel 5:6-7", "David takes Jerusalem"]],
  },
  16: {
    intro: "The land given to the sons of Joseph, beginning with Ephraim. Ephraim does not drive out the Canaanites of Gezer, who instead become forced laborers.",
    v: [
      ["16:1-3", "The lot for the sons of Joseph", "The border runs from the Jordan at Jericho up through the hill country to Bethel and down to the sea. Joseph's sons received the rich central hills."],
      ["16:9", "Towns set apart for Ephraim within Manasseh", "The two brother tribes lived side by side, sometimes in each other's land."],
      ["16:10", "They did not drive out the Canaanites", "Partial obedience becomes a pattern that the book of Judges traces with sorrow."],
    ],
    bg: [["Gezer", "Gezer guarded the main road from the coast up to Jerusalem, so it mattered to every power in the region. It stayed Canaanite until a pharaoh captured it and gave it to Solomon as a wedding gift (1 Kings 9:16). Solomon rebuilt it along with Hazor and Megiddo (1 Kings 9:15). Archaeologists found matching gates with six rooms at all three sites. When these gates were built is debated, in Solomon's day or a little later.", "good", ["howard", "kitchen"]]],
    refs: [["1KI.9", "1 Kings 9:16", "Pharaoh gave Gezer to Solomon"], ["JDG.1", "Judges 1:29", "Ephraim did not drive out Gezer"]],
  },
  17: {
    intro: "Manasseh's land is described. Zelophehad's daughters receive their inheritance as Moses commanded. The sons of Joseph complain that their land is too small, and Joshua tells them to clear the forest and drive out the Canaanites with iron chariots.",
    v: [
      ["17:4", "The LORD commanded Moses to give us an inheritance", "The daughters claim God's promise."],
      ["17:14", "Only one lot?", "A large tribe asks for more."],
      ["17:18", "You shall drive out the Canaanites", "Joshua challenges them to act in faith rather than complain."],
    ],
    refs: [["NUM.27", "Numbers 27:1-11", "The daughters' request"], ["NUM.36", "Numbers 36", "Their marriages"]],
  },
  18: {
    intro: "The whole congregation gathers at Shiloh and sets up the tent of meeting. Seven tribes still have no land. Joshua asks, \"How long will you put off entering?\" and sends men to map the land so it can be divided by lot. Benjamin's territory is assigned.",
    v: [
      ["18:1", "Shiloh", "The tabernacle stays at Shiloh through the time of Eli and Samuel."],
      ["18:3", "How long will you put off?", "Delay can be a form of unbelief."],
      ["18:6", "Describe the land in seven divisions", "Careful planning and trust in God go together."],
    ],
    refs: [["1SA.1", "1 Samuel 1:3", "Worship at Shiloh"], ["JER.7", "Jeremiah 7:12", "Go to My place at Shiloh"]],
  },
  19: {
    intro: "The lands for Simeon (within Judah), Zebulun, Issachar, Asher, Naphtali and Dan are assigned. Dan later moves north to Leshem. Finally Israel gives Joshua the town he asks for, Timnath-serah in Ephraim.",
    v: [
      ["19:1", "Within the inheritance of Judah", "Simeon is absorbed into Judah, as Jacob foretold (Genesis 49:7)."],
      ["19:47", "Dan took Leshem", "Told more fully in Judges 18."],
      ["19:49-50", "Joshua last", "The leader takes his own land after everyone else."],
    ],
    refs: [["GEN.49", "Genesis 49:7", "I will scatter them in Israel"], ["JDG.18", "Judges 18", "Dan moves north"]],
  },
  20: {
    intro: "Six cities of refuge are set apart: Kedesh, Shechem and Hebron west of the Jordan, and Bezer, Ramoth and Golan east of it, for anyone who kills a person unintentionally.",
    v: [
      ["20:3", "Without premeditation", "The law protected the innocent from revenge."],
      ["20:4", "He shall stand at the entrance of the gate of the city", "The elders at the gate heard his case first. Refuge was for the innocent, not a hiding place for murderers."],
      ["20:6", "Until the death of the high priest", "Then the manslayer could go home."],
    ],
    bg: [["Never too far to run", "The six cities were spread across the land, three on each side of the Jordan, so a person in danger was never far from one. Later Jewish teaching says the roads to them were kept in good repair and marked with signs reading \"Refuge.\"", "good", ["howard", "hess"]]],
    w: [["miqlat", "mik-LAHT", "H4733", "refuge, place of safety", "From a root meaning to take in. It is used only for these cities: a place that takes in the one who flees.", ["halot"]]],
    refs: [["NUM.35", "Numbers 35:9-34", "Cities of refuge commanded"], ["HEB.6", "Hebrews 6:18", "We who have taken refuge"]],
  },
  21: {
    intro: "The Levites receive forty-eight towns with pasturelands scattered through all the tribes. The chapter ends: \"Not one of the good promises which the LORD had made to the house of Israel failed; all came to pass.\"",
    v: [
      ["21:41", "Forty-eight cities", "The Levites lived among all the tribes to teach God's law."],
      ["21:44", "The LORD gave them rest", "God kept His oath to the fathers."],
      ["21:45", "Not one promise failed", "One of the great summaries of God's faithfulness."],
    ],
    refs: [["1KI.8", "1 Kings 8:56", "Not one word has failed"], ["2CO.1", "2 Corinthians 1:20", "All the promises of God are yes in Him"]],
  },
  22: {
    intro: "Joshua sends the eastern tribes home with his blessing. They build a large altar by the Jordan, and the other tribes, fearing rebellion, prepare for war. Phinehas leads a delegation, and the eastern tribes explain: it is a witness, not for sacrifice, so that future generations will know they too belong to the LORD. War is avoided.",
    v: [
      ["22:5", "Love the LORD your God, walk in His ways", "Joshua's charge."],
      ["22:22", "The Mighty One, God, the LORD! He knows", "The eastern tribes call God as witness."],
      ["22:30-31", "It pleased them", "Listening before acting prevented a civil war."],
    ],
    refs: [["PRO.18", "Proverbs 18:13", "He who answers before listening"], ["JAS.1", "James 1:19", "Quick to hear, slow to speak"]],
  },
  23: {
    intro: "Old Joshua gathers Israel's leaders. He reminds them that God fought for them and urges them to keep the law, to cling to the LORD, and not to mix with the nations or their gods. \"Not one word of all the good words which the LORD your God spoke concerning you has failed.\"",
    v: [
      ["23:8", "Cling to the LORD your God", "The same word as a husband cleaving to his wife (Genesis 2:24)."],
      ["23:11", "Take diligent heed to yourselves to love the LORD", "Love needs watchful care."],
      ["23:14", "The way of all the earth", "Joshua knows he will die soon."],
    ],
    refs: [["DEU.10", "Deuteronomy 10:20", "Cling to Him"], ["ACT.11", "Acts 11:23", "Remain true to the Lord"]],
  },
  24: {
    intro: "At Shechem Joshua retells Israel's story from Abraham to the conquest, all God's doing. Then he calls for a choice: \"Choose for yourselves today whom you will serve... but as for me and my house, we will serve the LORD.\" The people promise, Joshua writes it down and sets up a stone as witness. Joshua dies at 110, and Joseph's bones are buried at Shechem.",
    v: [
      ["24:2", "Your fathers served other gods", "Even Abraham's family began as idol worshipers."],
      ["24:13", "Cities which you had not built", "Everything Israel had was a gift."],
      ["24:15", "As for me and my house", "Joshua leads by example."],
      ["24:31", "Israel served the LORD all the days of Joshua", "And of the elders who outlived him. The next generation would forget (Judges 2:10)."],
      ["24:32", "Joseph's bones", "The promise of Genesis 50:25 is kept."],
    ],
    refs: [["JDG.2", "Judges 2:7-10", "Another generation arose who did not know the LORD"], ["ACT.7", "Acts 7:2-45", "Stephen retells the same story"], ["GEN.50", "Genesis 50:25", "Carry my bones up from here"]],
  },
});
