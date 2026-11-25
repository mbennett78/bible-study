// 1 Samuel chapter notes.
import { makeBook } from "./make.js";

const sources = {
  tsumura: "David Toshio Tsumura, The First Book of Samuel, New International Commentary on the Old Testament (Eerdmans, 2007).",
  bergen: "Robert D. Bergen, 1, 2 Samuel, New American Commentary 7 (Broadman & Holman, 1996).",
  baldwin: "Joyce G. Baldwin, 1 and 2 Samuel, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  klein: "Ralph W. Klein, 1 Samuel, Word Biblical Commentary 10 (Word, 1983).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["bergen", "baldwin"] }, {
  1: {
    intro: "Hannah, one of Elkanah's two wives, has no children and is provoked by the other wife. At the tabernacle in Shiloh she pours out her soul to God, so earnestly that Eli the priest thinks she is drunk. She vows that if God gives her a son, she will give him back to the LORD. Samuel is born, and after he is weaned she brings him to serve at Shiloh.",
    v: [
      ["1:10", "Greatly distressed", "Hannah brings her bitterness to God rather than to her rival."],
      ["1:15", "I have poured out my soul before the LORD", "Eli thought Hannah was drunk. She explains that she has been pouring out her soul to the LORD. Honest, heartfelt prayer is welcome to God."],
      ["1:18", "Her face was no longer sad", "After she prayed and Eli blessed her, Hannah ate and her face was no longer sad. Peace came before the answer did."],
      ["1:20", "Samuel", "The name sounds like \"heard by God\" or \"asked of God.\""],
      ["1:27-28", "I have dedicated him to the LORD", "Hannah had prayed for this boy, and God answered. Now she keeps her vow and gives Samuel to serve the LORD for life."],
    ],
    refs: [["LUK.1", "Luke 1:46-55", "Mary's song echoes Hannah's"], ["PHP.4", "Philippians 4:6-7", "Let your requests be made known to God"]],
  },
  2: {
    intro: "Hannah prays a song of praise: God humbles the proud and lifts the poor, and will give strength to His king. Meanwhile, Eli's sons, priests themselves, steal from the offerings and sin openly. Little Samuel grows in favor with God and people. A man of God warns Eli that his family will lose the priesthood.",
    v: [
      ["2:2", "No one is holy like the LORD", "Hannah's song: no one is holy like the LORD; there is no one besides Him and no rock like our God."],
      ["2:8", "He raises the poor from the dust", "God lifts the poor from the dust and seats them with princes. Mary's song in Luke 1:46-55 echoes Hannah's."],
      ["2:10", "His anointed", "The first mention of God's anointed king (messiah) in the Bible, before Israel even had a king."],
      ["2:26", "Samuel grew in stature and in favor", "Luke 2:52 uses almost the same words of the boy Jesus."],
      ["2:30", "Those who honor Me I will honor", "Eli honored his wicked sons more than God (2:29). God says: those who honor Me I will honor, and those who despise Me will be lightly esteemed."],
    ],
    refs: [["LUK.1", "Luke 1:46-55", "The Magnificat"], ["LUK.2", "Luke 2:52", "Jesus kept increasing in wisdom and stature"]],
  },
  3: {
    intro: "\"The word of the LORD was rare in those days.\" One night the boy Samuel hears a voice calling his name and runs to Eli three times. Eli realizes it is God and tells him to answer, \"Speak, LORD, for Your servant is listening.\" God tells Samuel of judgment on Eli's house. As Samuel grows, all Israel knows he is a prophet.",
    v: [
      ["3:1", "Word from the LORD was rare", "In those days a word from the LORD was rare and visions were few. It was a time of spiritual famine."],
      ["3:3", "The lamp of God had not yet gone out", "Literal and symbolic: there was still hope."],
      ["3:10", "Speak, for Your servant is listening", "The LORD called the boy Samuel by name a fourth time. Taught by Eli, he answered: speak, for Your servant is listening."],
      ["3:19", "Let none of his words fail", "The LORD was with Samuel as he grew up and let none of his words fall to the ground. Everything he said from God came true."],
    ],
    refs: [["AMO.8", "Amos 8:11", "A famine for hearing the words of the LORD"], ["JHN.10", "John 10:27", "My sheep hear My voice"]],
  },
  4: {
    intro: "Israel loses a battle to the Philistines and brings the ark into the camp like a lucky charm. The Philistines fight harder, Israel is crushed, Eli's sons are killed, and the ark is captured. Hearing the news, 98-year-old Eli falls and breaks his neck. His daughter-in-law names her newborn Ichabod, \"The glory has departed.\"",
    v: [
      ["4:3", "That it may save us", "They trust the box rather than the God of the box."],
      ["4:18", "He fell off the seat backward", "Eli dies when he hears the ark is taken."],
      ["4:21", "Ichabod", "Eli's daughter-in-law, dying in childbirth, named her son Ichabod, \"no glory,\" because the ark had been captured: the glory has departed from Israel."],
    ],
    bg: [["Shiloh destroyed", "Excavations at Shiloh show a destruction around the 1000s BC. Jeremiah 7:12 says God made Shiloh an example of judgment.", "good", ["kitchen", "tsumura"]]],
    refs: [["JER.7", "Jeremiah 7:12-14", "What I did to Shiloh"], ["PSA.78", "Psalm 78:60-64", "He abandoned the dwelling place at Shiloh"]],
  },
  5: {
    intro: "The Philistines place the ark in the temple of their god Dagon at Ashdod. Next morning Dagon has fallen face down before it; the following morning his head and hands are broken off. Tumors break out in Ashdod, then in Gath and Ekron as the ark is moved from city to city.",
    v: [
      ["5:3", "Dagon had fallen on his face", "Before the ark of the LORD, as if bowing."],
      ["5:4", "Only the trunk of Dagon was left", "The Philistines put the ark beside their god Dagon. Twice Dagon fell on his face before it, the second time broken. God needs no army to defeat idols."],
      ["5:11", "Send away the ark", "Plagues followed the ark from city to city, and the Philistines begged their leaders to send it back to Israel."],
    ],
    refs: [["ISA.46", "Isaiah 46:1-2", "Bel has bowed down"], ["EXO.12", "Exodus 12:12", "Judgments against all the gods"]],
  },
  6: {
    intro: "After seven months, the Philistines return the ark on a new cart pulled by two nursing cows, with gold offerings. The cows go straight to Israel, lowing as they go. At Beth-shemesh the people rejoice, but some look into the ark and are struck down. The ark goes to Kiriath-jearim.",
    v: [
      ["6:9", "If it goes up by the way of its own territory", "The Philistines test whether God did it. Mother cows leaving their calves showed His hand."],
      ["6:19", "They had looked into the ark", "God's holiness is not to be treated as a curiosity."],
      ["6:20", "Who is able to stand before the LORD?", "After men of Beth-shemesh looked into the ark and died, the people asked: who can stand before the LORD, this holy God? His holiness is not to be treated lightly."],
    ],
    refs: [["NUM.4", "Numbers 4:15-20", "Do not look at the holy things"], ["2SA.6", "2 Samuel 6:3", "Another new cart"]],
  },
  7: {
    intro: "After twenty years, Israel mourns after the LORD. Samuel calls them to put away their foreign gods. At Mizpah they fast and confess. When the Philistines attack, Samuel prays and God thunders, and Israel wins. Samuel sets up a stone and names it Ebenezer: \"Thus far the LORD has helped us.\"",
    v: [
      ["7:3", "Return to the LORD with all your heart", "Samuel tells Israel: if you are returning to the LORD with all your heart, get rid of your foreign gods and serve Him only."],
      ["7:8", "Do not cease to cry to the LORD", "With the Philistines coming, the people beg Samuel not to stop crying out to the LORD for them. God thundered and the enemy fled (7:10)."],
      ["7:12", "Ebenezer", "\"Stone of help.\" The words \"Here I raise my Ebenezer\" come from the hymn \"Come Thou Fount.\""],
      ["7:15", "Samuel judged Israel all the days of his life", "Samuel led Israel as judge all his life, traveling a circuit each year. He was the last of the judges and also a prophet."],
    ],
    refs: [["1SA.12", "1 Samuel 12:23", "Far be it from me that I should sin by ceasing to pray"], ["JOS.4", "Joshua 4:6-7", "Memorial stones"]],
  },
  8: {
    intro: "Samuel's sons are corrupt judges, and Israel's elders ask for a king \"like all the nations.\" Samuel is displeased, but God says, \"They have not rejected you, but they have rejected Me.\" Samuel warns them a king will take their sons, daughters, fields and a tenth of everything. They insist, and God tells Samuel to give them a king.",
    v: [
      ["8:5", "Like all the nations", "The elders ask for a king to lead them like all the other nations. But Israel was meant to be different, with God as their King."],
      ["8:7", "They have rejected Me", "God tells Samuel: they have not rejected you, they have rejected Me as their King. The real issue was trust."],
      ["8:11-17", "This will be the procedure of the king", "\"He will take\" is repeated over and over."],
      ["8:18", "You will cry out", "And God will not answer, because they chose this."],
    ],
    refs: [["DEU.17", "Deuteronomy 17:14-20", "The law of the king"], ["HOS.13", "Hosea 13:10-11", "I gave you a king in My anger"]],
  },
  9: {
    intro: "Saul, a tall, handsome young Benjaminite, goes searching for his father's lost donkeys. His servant suggests asking the seer. God has already told Samuel that a man from Benjamin is coming, to be anointed ruler. Samuel honors Saul at a meal and keeps him overnight.",
    v: [
      ["9:2", "Choice and handsome", "Saul was an impressive young man, a head taller than anyone else. He looked every bit like a king."],
      ["9:9", "Formerly a prophet was called a seer", "A note for later readers: in earlier days a prophet was called a seer. It shows the book was put together after Samuel's time."],
      ["9:16", "He will deliver My people", "God hears His people's cry even in their wrong request."],
      ["9:21", "The least of all the families", "When Samuel honors him, Saul answers that he is from the smallest tribe and the least important family. He begins humbly."],
    ],
    refs: [["ACT.13", "Acts 13:21", "God gave them Saul"], ["1SA.16", "1 Samuel 16:7", "God looks at the heart"]],
  },
  10: {
    intro: "Samuel anoints Saul in private and gives him three signs, which all come true. God changes Saul's heart, and he prophesies. At Mizpah Saul is chosen by lot, but he is found hiding among the baggage. Some say, \"How can this one deliver us?\"",
    v: [
      ["10:1", "Anointed you a ruler", "Oil poured on the head, a sign of God's choice and Spirit."],
      ["10:6", "Changed into another man", "The Spirit of the LORD would come on Saul, and he would be changed into a different person. God equips those He calls."],
      ["10:22", "Hiding by the baggage", "When Saul was chosen by lot before all Israel, he could not be found. He was hiding among the baggage."],
      ["10:25", "The ordinances of the kingdom", "Samuel explained the rights and duties of the kingship, wrote them in a book and laid it up before the LORD. Even the king was under God's law."],
    ],
    refs: [["DEU.17", "Deuteronomy 17:18-20", "The king's copy of the law"], ["PSA.89", "Psalm 89:20", "With My holy oil I have anointed him"]],
  },
  11: {
    intro: "Nahash the Ammonite threatens to gouge out the right eye of every man in Jabesh-gilead. The Spirit of God comes on Saul, he rallies Israel by sending pieces of oxen through the land, and he rescues the city. Saul refuses to punish those who had doubted him, and the kingdom is renewed at Gilgal.",
    v: [
      ["11:6", "The Spirit of God came upon Saul mightily", "Like the judges before him."],
      ["11:13", "Not a man shall be put to death this day", "Saul's best moment: mercy and credit to God."],
      ["11:1", "Nahash the Ammonite", "Nahash means \"snake.\" Ammon lay east of the Jordan, not far from Jabesh-gilead."],
      ["11:2", "I will gouge out the right eye of every one of you", "The historian Josephus explains that a soldier behind his shield looks out with his right eye, so this would leave the men useless in battle as well as shamed."],
      ["11:15", "There they made Saul king before the LORD in Gilgal", "Saul was anointed in private (10:1), chosen by lot (10:20-24), and now confirmed by all the people after proving himself."],
    ],
    bg: [["The Dead Sea Scrolls add a paragraph", "A Samuel scroll from Qumran (4QSam-a) has a few extra lines before 11:1: Nahash had been gouging out the right eyes of the men of Gad and Reuben, and about 7,000 had escaped to Jabesh-gilead. Josephus knew the same account. A few English versions (such as the NRSV) include it; most, like the NASB, do not.", "good", ["tsumura", "klein"]]],
    refs: [["1SA.31", "1 Samuel 31:11-13", "Jabesh-gilead repays Saul's kindness"], ["JDG.19", "Judges 19:29", "Sending pieces through Israel"]],
  },
  12: {
    intro: "Samuel gives a farewell speech. He asks if he ever cheated anyone, and the people say no. He reviews God's faithfulness and Israel's sin in asking for a king. God sends thunder and rain in wheat harvest. Samuel says, \"Do not fear... serve the LORD with all your heart,\" and promises to keep praying for them.",
    v: [
      ["12:3", "Whose ox have I taken?", "In his farewell, Samuel asks the people to testify: whose ox or donkey did I take, whom did I cheat? No one can name one wrong."],
      ["12:22", "The LORD will not abandon His people", "\"Because the LORD has been pleased to make you a people for Himself.\""],
      ["12:23", "Far be it from me that I should sin by ceasing to pray for you", "Samuel says he would sin against the LORD if he stopped praying for the people. He will keep praying and teaching them the good way."],
      ["12:24", "Consider what great things He has done", "Fear the LORD and serve Him faithfully with all your heart. Remember the great things He has done for you."],
    ],
    refs: [["ACT.20", "Acts 20:33-35", "Paul's farewell"], ["1TH.5", "1 Thessalonians 5:17", "Pray without ceasing"]],
  },
  13: {
    intro: "The Philistines gather a huge army at Michmash, and Saul's troops tremble and scatter. Samuel is late, so Saul offers the burnt offering himself. Samuel arrives and says, \"You have acted foolishly.\" Saul's kingdom will not last; God has sought \"a man after His own heart.\"",
    v: [
      ["13:8", "He waited seven days", "Saul waited the seven days Samuel set, but when Samuel had not arrived and the troops were slipping away, he offered the sacrifice himself."],
      ["13:12", "I forced myself", "Saul's excuse: the enemy was gathering and Samuel was late, so he \"forced himself.\" Fear and pressure pushed him to disobey."],
      ["13:14", "A man after His own heart", "Paul quotes this of David in Acts 13:22."],
      ["13:19", "No blacksmith in Israel", "The Philistines controlled iron working, keeping Israel weak."],
    ],
    refs: [["ACT.13", "Acts 13:22", "A man after My heart"], ["1SA.15", "1 Samuel 15:22", "To obey is better than sacrifice"]],
  },
  14: {
    intro: "Saul's son Jonathan and his armor bearer climb to a Philistine outpost alone: \"The LORD is not restrained to save by many or by few.\" God sends an earthquake, panic spreads, and Israel wins. But Saul's rash oath forbidding food weakens the army, and Jonathan, who didn't hear it, almost dies for eating honey until the people rescue him.",
    v: [
      ["14:6", "By many or by few", "Jonathan's faith, the opposite of his father's fear."],
      ["14:24", "Cursed be the man who eats food", "Saul made his army swear not to eat until evening. The exhausted men grew faint, and Jonathan, who had not heard the oath, ate honey."],
      ["14:45", "Not one hair of his head shall fall", "Saul was ready to put Jonathan to death for breaking the oath, but the people rescued him: he won this victory with God's help."],
    ],
    refs: [["JDG.7", "Judges 7:2", "Too many"], ["2CH.14", "2 Chronicles 14:11", "Nothing to help, whether the powerful or those who have no strength"]],
  },
  15: {
    intro: "God commands Saul to destroy the Amalekites completely. Saul spares King Agag and the best of the animals, then claims he obeyed and saved them to sacrifice. Samuel says, \"To obey is better than sacrifice.\" Because Saul rejected God's word, God rejects him as king. Samuel grieves over Saul.",
    v: [
      ["15:13", "I have carried out the command", "Saul greets Samuel claiming he obeyed the LORD's command, while the bleating of the spared sheep can be heard (15:14)."],
      ["15:22", "To obey is better than sacrifice", "Does the LORD delight in sacrifices as much as in obeying His voice? To obey is better than sacrifice. Worship cannot cover disobedience."],
      ["15:23", "Rebellion is as the sin of divination", "Rebellion is like the sin of divination, and stubbornness like idolatry. Because Saul rejected God's word, God rejected him as king."],
      ["15:29", "The Glory of Israel will not lie or change His mind", "The Glory of Israel does not lie or change His mind like a human being. His word about Saul's kingdom stands."],
    ],
    refs: [["HOS.6", "Hosea 6:6", "I delight in loyalty rather than sacrifice"], ["MAT.9", "Matthew 9:13", "I desire compassion"], ["EXO.17", "Exodus 17:14-16", "Amalek's attack remembered"]],
  },
  16: {
    intro: "God sends Samuel to Bethlehem to anoint one of Jesse's sons. Seven sons pass by, but God says no to each: \"Man looks at the outward appearance, but the LORD looks at the heart.\" The youngest, David, is called in from the sheep and anointed, and the Spirit comes on him. An evil spirit troubles Saul, and David is brought in to play the harp for him.",
    v: [
      ["16:7", "The LORD looks at the heart", "Samuel thought tall Eliab must be the one. God said: people look at the outward appearance, but the LORD looks at the heart."],
      ["16:11", "He is tending the sheep", "The shepherd boy becomes the shepherd king (Psalm 78:70-72)."],
      ["16:13", "The Spirit came mightily upon David from that day forward", "When Samuel anointed the youngest son, David, the Spirit of the LORD rushed on him from that day on. The same Spirit left Saul (16:14)."],
      ["16:23", "Saul would be refreshed", "Whenever the troubling spirit came on Saul, David played the lyre, and Saul was refreshed and felt better."],
    ],
    why: "What was the \"evil spirit from the LORD\" that troubled Saul (16:14)?",
    views: [
      ["A demonic spirit God allowed", "Many hold it was an evil spirit that God permitted to afflict Saul as judgment, as God allowed Satan to test Job.", ["bergen", "baldwin"]],
      ["A troubling, depressive spirit", "Others read \"evil\" as \"harmful\" or \"troubling,\" a spirit of distress and despair that God sent or allowed, without saying more.", ["tsumura", "klein"]],
    ],
    common: "All agree that Saul lost God's Spirit through disobedience, that God remains sovereign over every spirit, and that David's music brought him relief.",
    refs: [["PSA.78", "Psalm 78:70-72", "He chose David from the sheepfolds"], ["ACT.13", "Acts 13:22", "David the son of Jesse"], ["JDG.9", "Judges 9:23", "God sent an evil spirit"]],
  },
  17: {
    intro: "The Philistine champion Goliath of Gath defies Israel's army for forty days. David, bringing food to his brothers, is outraged: \"Who is this uncircumcised Philistine, that he should taunt the armies of the living God?\" Refusing Saul's armor, he faces Goliath with a sling and five stones, \"in the name of the LORD of hosts.\" He kills Goliath, and the Philistines flee.",
    v: [
      ["17:26", "The armies of the living God", "Everyone else saw a giant. David saw a man defying the armies of the living God, and that made it God's battle."],
      ["17:37", "The LORD who delivered me from the lion and the bear", "The LORD who saved David from the lion and the bear while he kept sheep would save him from this Philistine. Past faithfulness builds faith."],
      ["17:45", "I come to you in the name of the LORD", "Goliath comes with sword, spear and javelin. David comes in the name of the LORD of hosts, so the whole earth will know there is a God in Israel (17:46)."],
      ["17:47", "The battle is the LORD's", "So that all the earth may know there is a God in Israel."],
    ],
    w: [["קֶלַע", "qela", "H7050", "sling", "A shepherd's sling was a deadly weapon; stones could reach high speeds. Judges 20:16 tells of slingers who could hit a hair.", ["halot", "bergen"]]],
    why: "How tall was Goliath? The Hebrew Masoretic text says \"six cubits and a span\" (about 9 feet 9 inches), while the oldest Greek translation and a Dead Sea Scroll copy of Samuel say \"four cubits and a span\" (about 6 feet 9 inches).",
    views: [
      ["About nine feet", "Many follow the traditional Hebrew text, the basis of most English Bibles.", ["bergen"]],
      ["About seven feet", "Others follow the older Greek and Dead Sea Scroll reading, noting that nearly seven feet was a giant in a world where average men were much shorter.", ["tsumura", "klein"]],
    ],
    common: "Either way, Goliath was a huge, armed warrior and David was a boy with a sling. The point stands: the battle belongs to the LORD.",
    refs: [["2CH.20", "2 Chronicles 20:15", "The battle is not yours but God's"], ["PSA.144", "Psalm 144:1", "Who trains my hands for war"], ["1CO.1", "1 Corinthians 1:27", "God chose the weak"]],
  },
  18: {
    intro: "Jonathan loves David as himself and makes a covenant with him, giving him his robe and sword. David succeeds in everything, and the women sing, \"Saul has slain his thousands, and David his ten thousands.\" Saul becomes jealous and afraid, tries to pin David to the wall with a spear, and plots his death through a dowry of Philistine lives. Saul's daughter Michal loves David and marries him.",
    v: [
      ["18:1", "The soul of Jonathan was knit to the soul of David", "After David's victory, Jonathan, Saul's son and heir, loved David as himself. Their friendship is one of the Bible's greatest."],
      ["18:4", "Jonathan gave David his robe", "The king's son hands over the signs of his position."],
      ["18:9", "Saul looked at David with suspicion", "When the women sang that Saul had slain thousands and David tens of thousands, Saul eyed David with jealousy from that day on."],
      ["18:14", "The LORD was with him", "David succeeded in everything he did, because the LORD was with him."],
    ],
    refs: [["PRO.18", "Proverbs 18:24", "A friend who sticks closer than a brother"], ["JAS.3", "James 3:16", "Where jealousy exists, there is disorder"]],
  },
  19: {
    intro: "Saul openly orders David killed. Jonathan pleads for David, and Saul relents briefly, then throws his spear again. Michal helps David escape out a window, putting a household idol in the bed. David flees to Samuel at Ramah, and when Saul's men and then Saul himself come, they are overcome by God's Spirit and prophesy.",
    v: [
      ["19:4-5", "Jonathan spoke well of David", "Jonathan reminds his father of all the good David has done and urges him not to shed innocent blood. A true friend defends someone who is not there."],
      ["19:12", "Michal let David down through a window", "When Saul sent men to kill David, his wife Michal let him down through a window, and he escaped. Psalm 59's heading recalls this night."],
      ["19:24", "Is Saul also among the prophets?", "Saul set out to capture David, but the Spirit of God came on him and he lay prophesying all day and night. God stopped him without a battle."],
    ],
    refs: [["PSA.59", "Psalm 59", "When Saul sent men to watch the house"], ["ACT.9", "Acts 9:25", "Paul let down through a window"]],
  },
  20: {
    intro: "David and Jonathan make a plan to learn Saul's intentions. At the new moon feast Saul rages at Jonathan and throws a spear at him. Jonathan uses arrows in the field as a signal and then meets David. They weep together and part, renewing their covenant for their descendants.",
    v: [
      ["20:3", "There is hardly a step between me and death", "David tells Jonathan honestly that there is only a step between him and death."],
      ["20:15", "Do not cut off your lovingkindness from my house forever", "David keeps this promise to Mephibosheth (2 Samuel 9)."],
      ["20:42", "Go in safety", "Jonathan sends David away in peace, reminding him of their oath in the LORD's name: the LORD is witness between us and our children forever."],
    ],
    refs: [["2SA.9", "2 Samuel 9", "Kindness to Jonathan's son"], ["JHN.15", "John 15:13", "Greater love"]],
  },
  21: {
    intro: "David flees to Nob, where the priest Ahimelech gives him the holy bread and Goliath's sword. Then David runs to the Philistine city of Gath and, recognized, pretends to be insane to escape.",
    v: [
      ["21:6", "The consecrated bread", "Jesus uses this example: mercy and need came before ritual (Mark 2:25-26)."],
      ["21:9", "The sword of Goliath", "At Nob the priest gives David the sword of Goliath, kept wrapped behind the ephod. David says there is none like it."],
      ["21:13", "He feigned himself mad", "Afraid of the Philistine king of Gath, David pretended to be mad, scribbling on the gate and drooling. Psalm 34's heading recalls this escape."],
    ],
    refs: [["MRK.2", "Mark 2:25-26", "David ate the consecrated bread"], ["PSA.34", "Psalm 34", "I sought the LORD and He answered me"]],
  },
  22: {
    intro: "David hides in the cave of Adullam, and about 400 men in distress, debt or discontent gather to him. Saul, accusing his officials of conspiracy, learns from Doeg the Edomite that Ahimelech helped David. Saul has Doeg kill eighty-five priests and the town of Nob. Abiathar alone escapes to David.",
    v: [
      ["22:2", "Everyone who was in distress", "David's band of misfits becomes his mighty men."],
      ["22:18", "Doeg turned and attacked the priests", "Saul's servants refused; a foreigner did it."],
      ["22:23", "Stay with me; do not be afraid", "Saul had the priests of Nob killed because they helped David. David tells the one survivor, Abiathar: stay with me and do not be afraid; you are safe with me."],
    ],
    refs: [["PSA.52", "Psalm 52", "When Doeg the Edomite came"], ["PSA.57", "Psalm 57", "When he fled from Saul in the cave"], ["PSA.142", "Psalm 142", "A prayer in the cave"]],
  },
  23: {
    intro: "David rescues the town of Keilah from the Philistines after asking God, then learns the townspeople would hand him over to Saul. Saul hunts him in the wilderness. Jonathan finds David at Horesh and \"encouraged him in God.\" Saul almost catches him, but a Philistine raid calls Saul away.",
    v: [
      ["23:2", "David inquired of the LORD", "Before rescuing the town of Keilah, David asked the LORD whether to go. Asking God first was a habit Saul lacked."],
      ["23:16", "He encouraged him in God", "Jonathan went to David in the wilderness and helped him find strength in God. That is the best thing a friend can do."],
      ["23:17", "You will be king over Israel", "Jonathan says: you will be king over Israel, and I will be next to you. Saul's heir gladly accepts second place."],
    ],
    refs: [["1TH.5", "1 Thessalonians 5:11", "Encourage one another"], ["PSA.54", "Psalm 54", "When the Ziphites came"]],
  },
  24: {
    intro: "In a cave at En-gedi, Saul comes in to relieve himself, unaware David and his men are hiding deeper inside. David's men urge him to kill Saul, but he only cuts off the edge of Saul's robe, and even regrets that. Outside, David calls to Saul, shows the piece, and Saul weeps: \"You are more righteous than I.\"",
    v: [
      ["24:6", "The LORD's anointed", "David will not take the throne by his own hand."],
      ["24:12", "May the LORD judge between you and me", "David spared Saul in the cave and cut off only a corner of his robe. He says: may the LORD judge between us, but my hand will not be against you."],
      ["24:17", "You have dealt well with me", "Saul weeps and admits that David is more righteous than he is, repaying evil with good. For a moment he sees the truth."],
    ],
    refs: [["ROM.12", "Romans 12:17-21", "Never take your own revenge"], ["1PE.2", "1 Peter 2:23", "He kept entrusting Himself to Him who judges righteously"]],
  },
  25: {
    intro: "Samuel dies. David's men protect the flocks of wealthy Nabal, but when David asks for supplies, Nabal insults him. David sets out to kill every male in Nabal's household. Nabal's wise wife Abigail hurries to meet David with food and humbly pleads with him not to take revenge. David blesses her for stopping him. Nabal dies, and David marries Abigail.",
    v: [
      ["25:3", "Intelligent and beautiful... harsh and evil", "Abigail was wise and beautiful; her husband Nabal was harsh and evil. His name means \"fool,\" and he lived up to it (25:25)."],
      ["25:28", "Evil will not be found in you", "Abigail reminds David that he fights the LORD's battles, and asks that no wrong be found in him. Revenge would stain his future."],
      ["25:32-33", "Blessed be your discernment", "David blesses God for sending Abigail and blesses her good sense, which kept him from taking revenge with his own hand."],
    ],
    refs: [["PRO.15", "Proverbs 15:1", "A gentle answer turns away wrath"], ["ROM.12", "Romans 12:19", "Leave room for the wrath of God"]],
  },
  26: {
    intro: "Saul hunts David again. At night David and Abishai slip into Saul's camp, where God has put everyone into a deep sleep. David again refuses to kill the LORD's anointed and takes Saul's spear and water jug instead. From a hill he calls out, and Saul confesses, \"I have sinned... I have played the fool.\"",
    v: [
      ["26:9", "Who can stretch out his hand against the LORD's anointed?", "Again David has Saul in his power, and again he refuses: who can harm the LORD's anointed and be guiltless? He waits for God's timing."],
      ["26:12", "A sound sleep from the LORD", "David took Saul's spear and water jug while no one woke, because the LORD had put them into a deep sleep."],
      ["26:23", "The LORD will repay each man for his righteousness", "The LORD rewards everyone for their righteousness and faithfulness. David trusts God to deal with Saul."],
    ],
    refs: [["1SA.24", "1 Samuel 24", "The first time David spares Saul"], ["PSA.37", "Psalm 37:7", "Rest in the LORD and wait patiently"]],
  },
  27: {
    intro: "Tired of running, David thinks, \"I will perish one day by the hand of Saul,\" and goes over to the Philistines. Achish king of Gath gives him the town of Ziklag. David raids Israel's enemies but tells Achish he is raiding Judah, leaving no survivors to tell the truth.",
    v: [
      ["27:1", "David said in his heart", "Discouragement leads David to act without asking God."],
      ["27:6", "Ziklag belongs to the kings of Judah", "The Philistine king Achish gave David the town of Ziklag. The writer notes it has belonged to the kings of Judah ever since."],
      ["27:12", "He has surely made himself odious", "David raided Israel's enemies but told Achish he had attacked Judah. Achish believed David had made himself hated by his own people."],
    ],
    refs: [["PSA.42", "Psalm 42:5", "Why are you in despair, O my soul?"]],
  },
  28: {
    intro: "The Philistines gather for war, and Saul is terrified. God does not answer him by dreams, Urim or prophets. Saul, who had banned mediums, disguises himself and visits one at Endor, asking her to call up Samuel. Samuel appears and tells Saul that tomorrow he and his sons will die. Saul collapses.",
    v: [
      ["28:6", "The LORD did not answer him", "Facing the Philistine army, Saul asked the LORD, but God did not answer him by dreams, by Urim or by prophets."],
      ["28:7", "Seek for me a woman who is a medium", "Saul had driven mediums out of the land (28:3), as God's law commanded. Now, desperate, he seeks one out himself."],
      ["28:12", "She cried out with a loud voice", "The medium herself seems shocked by what happens."],
      ["28:19", "Tomorrow you and your sons will be with me", "Samuel tells Saul that the LORD will give Israel to the Philistines, and tomorrow Saul and his sons will be with him among the dead."],
    ],
    why: "Did Samuel really come back from the dead at Endor, or was it a deception?",
    views: [
      ["God allowed Samuel to appear", "Many hold that God, not the medium, brought Samuel to deliver a final judgment. The medium's terror suggests something she did not expect, and the text calls him Samuel.", ["bergen", "baldwin"]],
      ["A deceiving spirit or trick", "Others hold that the dead cannot be summoned and that this was a demonic impersonation or the medium's deception. 1 Chronicles 10:13 condemns Saul for consulting her.", ["klein"]],
    ],
    common: "All agree that seeking the dead is forbidden (Deuteronomy 18:10-12), that Saul sinned in doing so, and that the message he received was God's judgment.",
    refs: [["DEU.18", "Deuteronomy 18:10-12", "No medium or spiritist"], ["1CH.10", "1 Chronicles 10:13-14", "Saul died for his unfaithfulness"], ["ISA.8", "Isaiah 8:19", "Should they consult the dead on behalf of the living?"]],
  },
  29: {
    intro: "As the Philistines march to battle against Israel, their commanders refuse to let David come, fearing he will turn on them. Achish sends David home to Ziklag, sparing him from fighting his own people.",
    v: [
      ["29:1", "The Philistines gathered all their armies at Aphek", "The same staging point where they had once captured the ark (4:1)."],
      ["29:3", "What are these Hebrews doing here?", "The Philistine lords will not trust an Israelite at their side in battle."],
      ["29:4", "Make the man go back", "God uses the Philistines' suspicion to rescue David from an impossible situation."],
      ["29:9", "You are pleasing in my sight, like an angel of God", "Achish still trusts David completely, but the other Philistine commanders refuse to let him fight with them. God kept David out of the battle against Israel."],
    ],
    bg: [["God's timing", "Being sent home spared David from fighting Saul and Jonathan, who died in this very battle on Mount Gilboa (chapter 31). It also brought him back to Ziklag just in time to rescue his family from the Amalekites (chapter 30).", "good", ["bergen", "tsumura"]]],
    refs: [["1SA.30", "1 Samuel 30", "Back in time for Ziklag"], ["PRO.21", "Proverbs 21:1", "The king's heart is in the hand of the LORD"]],
  },
  30: {
    intro: "David returns to find Ziklag burned and all the families taken by Amalekite raiders. His men talk of stoning him, but \"David strengthened himself in the LORD his God.\" He asks God, pursues, recovers everyone and everything, and insists the spoils be shared with those too exhausted to fight.",
    v: [
      ["30:6", "David strengthened himself in the LORD his God", "When everyone turns against him, David turns to God."],
      ["30:8", "Pursue, for you will surely overtake them", "Raiders burned Ziklag and took the families. David, in deep distress, strengthened himself in the LORD (30:6) and asked Him; God said pursue, and you will rescue them all."],
      ["30:24", "They shall share alike", "Those who stay by the supplies share with those who fight."],
    ],
    refs: [["PSA.62", "Psalm 62:5-8", "My hope is from Him"], ["1SA.23", "1 Samuel 23:16", "Encouraged him in God"]],
  },
  31: {
    intro: "The Philistines defeat Israel on Mount Gilboa. Jonathan and two of his brothers are killed. Saul, badly wounded, falls on his own sword. The Philistines hang the bodies on the wall of Beth-shan, but the men of Jabesh-gilead, whom Saul had rescued, walk all night to take them down and bury them.",
    v: [
      ["31:4", "Saul took his sword and fell on it", "Badly wounded and afraid of capture, Saul took his own sword and fell on it. Israel's first king, who began so humbly, came to a tragic end."],
      ["31:10", "The temple of Ashtaroth", "Saul's armor becomes a trophy in a pagan temple."],
      ["31:12", "All the valiant men rose and walked all night", "Jabesh-gilead remembers Saul's kindness (chapter 11)."],
    ],
    refs: [["1CH.10", "1 Chronicles 10", "The same account"], ["2SA.1", "2 Samuel 1:17-27", "David's lament for Saul and Jonathan"]],
  },
});
