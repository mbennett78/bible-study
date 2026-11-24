// Judges chapter notes.
import { makeBook } from "./make.js";

const sources = {
  block: "Daniel I. Block, Judges, Ruth, New American Commentary 6 (Broadman & Holman, 1999).",
  webb: "Barry G. Webb, The Book of Judges, New International Commentary on the Old Testament (Eerdmans, 2012).",
  younger: "K. Lawson Younger Jr., Judges and Ruth, NIV Application Commentary (Zondervan, 2002).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["block", "webb"] }, {
  1: {
    intro: "After Joshua's death, Judah and Simeon fight successfully and Caleb's family takes Hebron and Debir. But tribe after tribe fails to drive out the Canaanites, who stay in the land and live among Israel.",
    v: [
      ["1:2", "Judah shall go up", "God gives Judah, the royal tribe, the lead."],
      ["1:7", "As I have done, so God has repaid me", "A Canaanite king admits God's justice."],
      ["1:19", "Iron chariots", "Judah could not drive out the people of the valleys. The problem was faith, not iron (compare Joshua 17:18)."],
      ["1:27-33", "Did not drive out", "Repeated again and again. Partial obedience sets up the rest of the book."],
    ],
    refs: [["JOS.15", "Joshua 15:13-19", "Caleb, Othniel and Achsah"], ["NUM.33", "Numbers 33:55", "Thorns in your sides"]],
  },
  2: {
    intro: "The angel of the LORD rebukes Israel for making covenants with the Canaanites. After Joshua's generation dies, \"another generation arose who did not know the LORD.\" The book's cycle is explained: Israel does evil, God gives them to enemies, they cry out, God raises up a judge to save them, then they turn back to sin, even worse.",
    v: [
      ["2:10", "Who did not know the LORD", "Faith was not passed on to the next generation."],
      ["2:16", "The LORD raised up judges", "Judges were deliverers and leaders more than courtroom judges."],
      ["2:18", "The LORD was moved to pity", "God's mercy answers their groaning."],
      ["2:19", "They would turn back and act more corruptly", "The cycle spirals downward."],
    ],
    refs: [["JOS.24", "Joshua 24:31", "Israel served the LORD all the days of Joshua"], ["PSA.106", "Psalm 106:34-46", "They mingled with the nations"], ["DEU.6", "Deuteronomy 6:6-7", "Teach them to your children"]],
  },
  3: {
    intro: "God leaves some nations to test Israel. The first judges: Othniel defeats a Mesopotamian king; left-handed Ehud kills fat King Eglon of Moab with a hidden sword and leads Israel to victory; and Shamgar strikes down 600 Philistines with an ox goad.",
    v: [
      ["3:10", "The Spirit of the LORD came upon him", "The judges' power came from God's Spirit."],
      ["3:15", "Ehud, a left-handed man", "A Benjaminite, from the tribe whose name means \"son of the right hand.\" His sword on his right thigh was missed by the guards."],
      ["3:31", "An oxgoad", "A long pointed stick for driving cattle. God uses ordinary tools."],
    ],
    refs: [["HEB.11", "Hebrews 11:32-34", "Who through faith conquered kingdoms"], ["1CO.1", "1 Corinthians 1:27", "God has chosen the weak things"]],
  },
  4: {
    intro: "Jabin of Hazor and his general Sisera, with 900 iron chariots, oppress Israel. Deborah, a prophetess judging Israel under a palm tree, calls Barak to fight. He will go only if she goes. The LORD routs Sisera at the Kishon River, and Sisera flees to the tent of Jael, who kills him with a tent peg.",
    v: [
      ["4:4", "Deborah, a prophetess", "A woman who led Israel with wisdom and courage."],
      ["4:8", "If you will go with me", "Barak hesitates; Hebrews 11:32 still lists him among the faithful."],
      ["4:9", "The hands of a woman", "The honor would go to a woman, and Jael is the surprise."],
      ["4:14", "Has not the LORD gone out before you?", "Victory is God's."],
    ],
    refs: [["JDG.5", "Judges 5", "The Song of Deborah"], ["HEB.11", "Hebrews 11:32", "Barak among the faithful"]],
  },
  5: {
    intro: "Deborah and Barak sing a victory song, one of the oldest poems in the Bible. It praises the tribes who volunteered, rebukes those who stayed home, tells how the stars fought from heaven and the Kishon swept the enemy away, and ends with Sisera's mother waiting in vain at her window.",
    v: [
      ["5:2", "The people volunteered", "Bless the LORD when leaders lead and people follow willingly."],
      ["5:20-21", "The stars fought", "A storm and flood likely made Sisera's chariots useless in the mud."],
      ["5:31", "Like the rising of the sun in its might", "\"Let those who love Him be.\" The land had rest forty years."],
    ],
    bg: [["An ancient poem", "The song's Hebrew is very old in style, and many scholars of all views regard it as among the oldest pieces of Hebrew poetry.", "good", ["block", "webb"]]],
    refs: [["EXO.15", "Exodus 15", "The Song of Moses"], ["PSA.68", "Psalm 68:7-10", "God marching through the wilderness"]],
  },
  6: {
    intro: "Midianite raiders strip Israel's land for seven years. The angel of the LORD finds Gideon threshing wheat in a winepress to hide it and calls him \"valiant warrior.\" Gideon tears down his father's altar to Baal at night. Before battle he asks for signs with a fleece, wet and then dry, and God patiently gives them.",
    v: [
      ["6:12", "The LORD is with you, O valiant warrior", "God calls Gideon what He will make him."],
      ["6:15", "The least in my father's house", "God chooses the weak."],
      ["6:24", "The LORD is Peace", "Gideon names his altar Yahweh Shalom."],
      ["6:36-40", "The fleece", "Gideon already had God's word. God was patient with his weak faith, though the passage does not present fleeces as the normal way to learn God's will."],
    ],
    refs: [["1CO.1", "1 Corinthians 1:26-29", "Not many mighty"], ["HEB.11", "Hebrews 11:32", "Gideon"]],
  },
  7: {
    intro: "Gideon gathers 32,000 men, but God says it is too many, \"lest Israel boast.\" After sending home the afraid and testing how men drink, only 300 remain. Encouraged by a Midianite's dream, Gideon's men surround the camp at night with trumpets and torches in jars, shout \"A sword for the LORD and for Gideon!\" and the enemy panics and flees.",
    v: [
      ["7:2", "Too many", "God reduces the army so that the glory is clearly His."],
      ["7:5-7", "Those who lapped", "The test simply separated a small group. God's power, not their skill, wins."],
      ["7:20", "Torches in pitchers", "Broken jars and sudden light. Paul speaks of treasure in clay jars (2 Corinthians 4:7)."],
    ],
    refs: [["2CO.4", "2 Corinthians 4:7", "Treasure in earthen vessels"], ["ZEC.4", "Zechariah 4:6", "Not by might nor by power"], ["ISA.9", "Isaiah 9:4", "As at the battle of Midian"]],
  },
  8: {
    intro: "Gideon calms jealous Ephraim, punishes towns that refused to help, and captures the Midianite kings. Israel asks him to rule; he says, \"The LORD shall rule over you.\" But he makes a golden ephod from the plunder, and it becomes a snare. After his death, Israel turns to Baal again.",
    v: [
      ["8:23", "The LORD shall rule over you", "Gideon refuses to be king in word."],
      ["8:27", "All Israel played the harlot with it", "Gideon's ephod becomes an idol."],
      ["8:34", "They did not remember the LORD", "Forgetting is the root of the cycle."],
    ],
    refs: [["1SA.8", "1 Samuel 8:7", "They have rejected Me from being king"], ["PSA.83", "Psalm 83:9-11", "Do to them as to Midian"]],
  },
  9: {
    intro: "Abimelech, Gideon's son by a concubine, murders seventy brothers and becomes king at Shechem. The youngest, Jotham, escapes and tells a parable of the trees who chose a bramble as king. Three years later, Shechem and Abimelech turn on each other, and a woman drops a millstone on Abimelech's head.",
    v: [
      ["9:8-15", "Jotham's parable", "The useful trees refuse to rule; only the thornbush accepts, and threatens fire."],
      ["9:23", "God sent an evil spirit", "God turns the conspirators against each other as judgment."],
      ["9:56", "Thus God repaid the wickedness", "God brought their evil back on their own heads."],
    ],
    refs: [["GAL.6", "Galatians 6:7", "Whatever a man sows"], ["2SA.11", "2 Samuel 11:21", "A woman threw a millstone"]],
  },
  10: {
    intro: "Two minor judges, Tola and Jair, lead Israel. Then Israel serves the gods of seven nations, and the Philistines and Ammonites oppress them. When Israel cries out, God says, \"Go and cry out to the gods which you have chosen.\" They put away their foreign gods, and \"He could bear the misery of Israel no longer.\"",
    v: [
      ["10:13-14", "I will no longer deliver you", "God's rebuke tests whether their repentance is real."],
      ["10:16", "He could bear the misery no longer", "Literally, \"His soul was shortened.\" God feels His people's pain."],
    ],
    refs: [["ISA.63", "Isaiah 63:9", "In all their affliction He was afflicted"], ["HOS.11", "Hosea 11:8", "My heart is turned over within Me"]],
  },
  11: {
    intro: "Jephthah, rejected by his half-brothers, becomes a bandit leader. The elders of Gilead ask him to lead against Ammon. He argues Israel's case to Ammon's king from history, then makes a rash vow to sacrifice whatever comes out of his house first if he wins. He wins, and his only daughter comes out to meet him.",
    v: [
      ["11:26", "Three hundred years", "Jephthah's history lesson gives an important clue for dating the exodus.", "debated", ["kitchen", "block"]],
      ["11:29", "The Spirit of the LORD came upon Jephthah", "Before the vow. God's help did not depend on a bargain."],
      ["11:30-31", "A vow", "A rash vow. God never asked for it."],
    ],
    why: "Did Jephthah actually sacrifice his daughter (11:39)? The text is restrained.",
    views: [
      ["A real sacrifice", "Many hold he did offer her, a terrible act the law forbade (Deuteronomy 12:31), showing how far Israel had fallen.", ["block", "webb"]],
      ["Lifelong service", "Others note she mourned her virginity, not her death, and suggest she was dedicated to lifelong unmarried service at the tabernacle.", ["younger"]],
    ],
    common: "All agree the story is a warning: God never wanted the vow, His law forbids human sacrifice, and faith does not make bargains with God.",
    refs: [["DEU.12", "Deuteronomy 12:31", "They burn their sons and daughters"], ["ECC.5", "Ecclesiastes 5:2-6", "Do not be hasty in word"], ["HEB.11", "Hebrews 11:32", "Jephthah"]],
  },
  12: {
    intro: "Ephraim's men pick a fight with Jephthah, and Gilead defeats them. At the Jordan crossings, Ephraimites are identified because they cannot say \"Shibboleth\" and say \"Sibboleth.\" Three minor judges follow: Ibzan, Elon and Abdon.",
    v: [
      ["12:6", "Shibboleth", "A dialect difference became a deadly test. The word is still used today for a password or test of belonging."],
      ["12:7", "Six years", "Jephthah's short rule ends."],
    ],
    refs: [["JDG.8", "Judges 8:1-3", "Gideon calms Ephraim"], ["PRO.15", "Proverbs 15:1", "A gentle answer turns away wrath"]],
  },
  13: {
    intro: "The Philistines rule Israel for forty years. The angel of the LORD appears to the barren wife of Manoah and promises a son who will be a Nazirite from birth and begin to deliver Israel. Manoah asks the angel's name: \"It is wonderful.\" The angel ascends in the altar's flame. Samson is born.",
    v: [
      ["13:5", "A Nazirite to God from the womb", "No razor, no wine, nothing unclean."],
      ["13:18", "It is wonderful", "The same word used in Isaiah 9:6, \"Wonderful Counselor.\""],
      ["13:22", "We have seen God", "Manoah realizes who the visitor was."],
      ["13:25", "The Spirit of the LORD began to stir him", "God's Spirit at work from his youth."],
    ],
    refs: [["NUM.6", "Numbers 6:1-21", "The Nazirite vow"], ["LUK.1", "Luke 1:13-17", "John the Baptist's birth announced"]],
  },
  14: {
    intro: "Samson wants to marry a Philistine woman of Timnah. On the way he kills a lion with his bare hands and later eats honey from its carcass. At his wedding feast he poses a riddle; his bride pressures him for the answer and tells it to the guests. Samson, furious, kills thirty Philistines to pay his bet.",
    v: [
      ["14:3", "Get her for me, for she looks good to me", "Literally \"she is right in my eyes,\" the theme of the book's last chapters (21:25)."],
      ["14:4", "It was of the LORD", "God used even Samson's choices to confront the Philistines."],
      ["14:9", "He took honey from the carcass", "Touching a dead body broke his Nazirite vow."],
    ],
    refs: [["JDG.21", "Judges 21:25", "Everyone did what was right in his own eyes"], ["NUM.6", "Numbers 6:6", "Not go near a dead person"]],
  },
  15: {
    intro: "Samson's bride is given to another man. In revenge he ties torches to the tails of 300 foxes and burns the Philistines' grain. Men of Judah hand him over tied up, but the Spirit comes on him, the ropes melt, and he kills a thousand men with a donkey's jawbone. Thirsty, he cries out to God, who opens a spring.",
    v: [
      ["15:11", "Do you not know that the Philistines are rulers over us?", "Judah has grown used to slavery."],
      ["15:14", "The Spirit of the LORD came upon him mightily", "Samson's strength was God's gift."],
      ["15:18-19", "He called to the LORD", "Samson's first recorded prayer."],
    ],
    refs: [["JDG.16", "Judges 16:28", "Samson's last prayer"], ["PSA.46", "Psalm 46:1", "God is our refuge and strength"]],
  },
  16: {
    intro: "Samson falls in love with Delilah, and Philistine lords pay her to learn the secret of his strength. Three times he lies; the fourth time he tells her about his uncut hair. She shaves his head, his strength leaves, and the Philistines blind him. In the temple of Dagon, his hair growing again, Samson prays and pushes down the pillars, killing more in his death than in his life.",
    v: [
      ["16:17", "No razor has come on my head", "He gave away the last sign of his vow."],
      ["16:20", "He did not know that the LORD had departed", "One of the saddest lines in Scripture."],
      ["16:22", "His hair began to grow again", "A quiet note of hope."],
      ["16:28", "O Lord GOD, please remember me", "God hears even a broken man."],
    ],
    bg: [["Philistine temples", "Philistine temples excavated at Tell Qasile had a roof supported by two central wooden pillars set on stone bases close together, which fits the account.", "good", ["block", "kitchen"]]],
    refs: [["HEB.11", "Hebrews 11:32-34", "From weakness were made strong"], ["1SA.5", "1 Samuel 5:1-5", "Dagon falls before the ark"]],
  },
  17: {
    intro: "A man named Micah steals silver from his mother, returns it, and she uses some to make an idol. Micah builds a shrine, makes his son a priest, then hires a traveling Levite as his own priest: \"Now I know that the LORD will prosper me.\"",
    v: [
      ["17:3", "Dedicated to the LORD... to make a graven image", "Mixing God's name with idolatry."],
      ["17:6", "Everyone did what was right in his own eyes", "The refrain of the book's final chapters."],
      ["17:13", "Now I know the LORD will prosper me", "Religion used to buy blessing."],
    ],
    refs: [["DEU.12", "Deuteronomy 12:8", "Every man doing whatever is right in his own eyes"], ["EXO.20", "Exodus 20:4", "No graven image"]],
  },
  18: {
    intro: "The tribe of Dan, looking for land, sends spies who pass Micah's house. Later 600 Danites steal Micah's idol and priest and attack the peaceful town of Laish, renaming it Dan. They set up the idol, served by a grandson of Moses.",
    v: [
      ["18:19", "Is it better to be a priest to one man or to a tribe?", "The Levite is happy to move up."],
      ["18:24", "You have taken away my gods", "Gods that can be stolen are no gods."],
      ["18:30", "Jonathan, the son of Gershom, the son of Moses", "Moses' own grandson led idol worship. Some Hebrew copies changed \"Moses\" to \"Manasseh\" out of shame."],
    ],
    refs: [["1KI.12", "1 Kings 12:29-30", "Jeroboam's calf at Dan"], ["JOS.19", "Joshua 19:47", "Dan takes Leshem"]],
  },
  19: {
    intro: "A Levite and his concubine stay overnight in Gibeah of Benjamin. As in Sodom, the men of the town surround the house. The Levite pushes his concubine out, and she is abused all night and dies. He cuts her body into twelve pieces and sends them through Israel.",
    v: [
      ["19:1", "When there was no king in Israel", "The writer explains how things fell so far."],
      ["19:22", "Worthless fellows", "The scene echoes Genesis 19. Israel has become like Sodom."],
      ["19:30", "Consider it, take counsel and speak up", "Everyone who saw it was horrified."],
    ],
    refs: [["GEN.19", "Genesis 19:4-11", "Sodom"], ["HOS.9", "Hosea 9:9", "As in the days of Gibeah"]],
  },
  20: {
    intro: "All Israel gathers at Mizpah and demands that Benjamin hand over the guilty men of Gibeah. Benjamin refuses and goes to war against the rest of Israel. After two days of heavy losses, Israel weeps and asks the LORD, and on the third day nearly destroys the tribe of Benjamin.",
    v: [
      ["20:13", "Deliver up the men", "Benjamin protects the guilty rather than justice."],
      ["20:26", "They wept and fasted", "Israel finally seeks God with humility."],
      ["20:28", "Phinehas", "Aaron's grandson still serves, which shows these events happened early in the judges' period."],
    ],
    refs: [["JOS.22", "Joshua 22:10-34", "A civil war avoided"], ["HOS.10", "Hosea 10:9", "The days of Gibeah"]],
  },
  21: {
    intro: "Israel grieves that a whole tribe is almost gone. Having sworn not to give their daughters to Benjamin, they find wives for the survivors by attacking Jabesh-gilead and by letting them carry off girls dancing at Shiloh. The book ends: \"In those days there was no king in Israel; everyone did what was right in his own eyes.\"",
    v: [
      ["21:3", "Why has this come about?", "They ask God why, but the answer is their own choices."],
      ["21:25", "Everyone did what was right in his own eyes", "The book's last word sets up 1 Samuel and the need for a faithful king."],
    ],
    refs: [["1SA.8", "1 Samuel 8", "Israel asks for a king"], ["PRO.14", "Proverbs 14:12", "A way which seems right to a man"]],
  },
});
