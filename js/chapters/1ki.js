// 1 Kings chapter notes.
import { makeBook } from "./make.js";

const sources = {
  house: "Paul R. House, 1, 2 Kings, New American Commentary 8 (Broadman & Holman, 1995).",
  provan: "Iain W. Provan, 1 and 2 Kings, New International Biblical Commentary (Hendrickson, 1995).",
  wiseman: "Donald J. Wiseman, 1 and 2 Kings, Tyndale Old Testament Commentaries (InterVarsity Press, 1993).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  thiele: "Edwin R. Thiele, The Mysterious Numbers of the Hebrew Kings, new rev. ed. (Kregel, 1983).",
  anet: "James B. Pritchard, ed., Ancient Near Eastern Texts Relating to the Old Testament, 3rd ed. (Princeton University Press, 1969).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["house", "provan"] }, {
  1: {
    intro: "King David is old and weak. His son Adonijah declares himself king, backed by Joab and Abiathar. Nathan and Bathsheba remind David of his promise that Solomon would reign. David orders Solomon anointed at the Gihon spring, and the city rejoices. Adonijah's supporters scatter, and he clings to the horns of the altar.",
    v: [
      ["1:6", "His father had never crossed him", "David never corrected Adonijah, a pattern in David's family."],
      ["1:30", "Solomon your son shall be king", "When Adonijah tried to take the throne, the aging David kept his oath to Bathsheba: Solomon your son will be king after me."],
      ["1:39", "Long live King Solomon!", "Zadok anoints him with oil from the tabernacle."],
      ["1:50", "The horns of the altar", "Holding the altar was a plea for sanctuary."],
    ],
    refs: [["1CH.23", "1 Chronicles 23:1", "David made Solomon king"], ["2SA.7", "2 Samuel 7:12", "I will raise up your descendant"]],
  },
  2: {
    intro: "David charges Solomon: \"Be strong and show yourself a man. Keep the charge of the LORD.\" David dies after reigning forty years. Solomon secures the throne, dealing with Adonijah, Abiathar, Joab and Shimei.",
    v: [
      ["2:2-3", "Keep the charge of the LORD", "David's last advice is to walk in God's ways."],
      ["2:10", "David slept with his fathers", "Buried in the City of David. Acts 2:29 notes his tomb was still known."],
      ["2:27", "Removed Abiathar from being priest", "Fulfilling God's word against Eli's house (1 Samuel 2:31-35)."],
      ["2:46", "The kingdom was established in the hands of Solomon", "The chapter ends: the kingdom was now firmly established in Solomon's hands. Old threats to David's throne had been dealt with."],
    ],
    refs: [["ACT.2", "Acts 2:29", "David died and was buried"], ["1SA.2", "1 Samuel 2:31-35", "Judgment on Eli's house"]],
  },
  3: {
    intro: "Solomon loves the LORD. At Gibeon, God appears in a dream: \"Ask what you wish me to give you.\" Solomon asks for an understanding heart to judge God's people. God is pleased and gives him wisdom, plus riches and honor. Then two women claim the same baby, and Solomon's wise command to divide it reveals the true mother.",
    v: [
      ["3:7", "I am but a little child", "Solomon tells God he is like a little child who does not know how to go out or come in. He begins his reign humbly."],
      ["3:9", "An understanding heart", "Solomon asks for an understanding heart, literally \"a listening heart,\" to govern God's people and tell good from evil. God is pleased (3:10)."],
      ["3:13", "What you have not asked", "God gives more than Solomon asked (Matthew 6:33)."],
      ["3:28", "The wisdom of God was in him", "When Israel heard how Solomon judged between the two mothers, they stood in awe, seeing that God's wisdom was in him to do justice."],
    ],
    refs: [["JAS.1", "James 1:5", "If any of you lacks wisdom, let him ask of God"], ["MAT.6", "Matthew 6:33", "Seek first His kingdom"], ["2CH.1", "2 Chronicles 1:7-12", "The same request"]],
  },
  4: {
    intro: "Solomon's officials and district governors are listed. Israel is as numerous as the sand and eats, drinks and rejoices. Solomon rules from the Euphrates to Egypt. His wisdom surpasses all the East: he speaks 3,000 proverbs and 1,005 songs, and teaches about plants and animals.",
    v: [
      ["4:20", "As numerous as the sand", "God's promise to Abraham (Genesis 22:17) fulfilled."],
      ["4:25", "Every man under his vine and his fig tree", "A picture of peace and safety that the prophets later use for the age to come (Micah 4:4)."],
      ["4:32", "3,000 proverbs", "Solomon spoke 3,000 proverbs and 1,005 songs. Some of them are preserved in Proverbs, Song of Songs and Psalms 72 and 127."],
    ],
    refs: [["MIC.4", "Micah 4:4", "Each under his vine and fig tree"], ["MAT.12", "Matthew 12:42", "Something greater than Solomon is here"]],
  },
  5: {
    intro: "Hiram king of Tyre, David's friend, agrees to supply cedar and cypress from Lebanon for the temple in exchange for wheat and oil. Solomon drafts laborers and stonecutters, and great costly stones are cut for the foundation.",
    v: [
      ["5:3", "David could not build a house", "Because of his many wars (1 Chronicles 22:8)."],
      ["5:5", "A house for the name of the LORD", "God's \"name\" stands for His presence and reputation."],
      ["5:17", "Costly stones", "Massive cut stones were used, like those still seen at the base of the later Temple Mount walls."],
    ],
    refs: [["1CH.22", "1 Chronicles 22:6-10", "David prepares Solomon"], ["2CH.2", "2 Chronicles 2", "Hiram's help"]],
  },
  6: {
    intro: "In the 480th year after the exodus, Solomon begins the temple. Its stones are cut at the quarry so no hammer is heard at the site. Inside, cedar and gold cover everything, with carved cherubim, palm trees and open flowers. Two great olive-wood cherubim stand in the inner sanctuary. It takes seven years.",
    v: [
      ["6:1", "The 480th year", "A key verse for dating the exodus to about 1446 BC.", "debated", ["kitchen", "house"]],
      ["6:7", "No hammer or axe was heard", "The temple stones were finished at the quarry, so no hammer, axe or iron tool was heard at the building site. God's house rose in quiet."],
      ["6:12-13", "I will dwell among the sons of Israel", "God's presence depends on faithfulness, not stones."],
      ["6:29", "Cherubim, palm trees and open flowers", "Images of Eden: the temple pictures a return to God's garden."],
    ],
    refs: [["2CH.3", "2 Chronicles 3", "The temple built"], ["ACT.7", "Acts 7:47-49", "The Most High does not dwell in houses made by hands"], ["1CO.3", "1 Corinthians 3:16", "You are a temple of God"]],
  },
  7: {
    intro: "Solomon spends thirteen years building his own palace, including the House of the Forest of Lebanon and a hall of judgment. The bronze worker Huram makes two great bronze pillars named Jachin and Boaz, a huge bronze \"sea,\" ten stands and basins, and all the temple's gold furnishings.",
    v: [
      ["7:1", "Thirteen years", "Longer than the seven years for the temple."],
      ["7:21", "Jachin and Boaz", "\"He establishes\" and \"In Him is strength.\""],
      ["7:23", "The sea of cast metal", "The Sea was a huge cast bronze basin, about 15 feet across, resting on twelve bronze oxen. The priests used it for washing (2 Chronicles 4:6)."],
    ],
    refs: [["2CH.4", "2 Chronicles 4", "The temple furnishings"], ["REV.3", "Revelation 3:12", "A pillar in the temple of My God"]],
  },
  8: {
    intro: "The ark is brought into the temple, and the cloud of the LORD's glory fills the house so the priests cannot stand to minister. Solomon blesses the people and prays a long prayer of dedication: \"Heaven and the highest heaven cannot contain You, how much less this house.\" He asks God to hear prayers made toward this place, even from foreigners and exiles.",
    v: [
      ["8:11", "The glory of the LORD filled the house", "When the ark was placed in the temple, a cloud filled the house and the priests could not stand to serve, because the LORD's glory filled it, as at the tabernacle (Exodus 40:34-35)."],
      ["8:27", "Heaven cannot contain You", "In his prayer Solomon admits: heaven and the highest heaven cannot contain You, how much less this house I have built. God is far greater than any building."],
      ["8:41-43", "The foreigner", "Solomon prays that all the peoples of the earth may know God's name."],
      ["8:46", "There is no man who does not sin", "Paul makes the same point in Romans 3:23."],
      ["8:56", "Not one word has failed", "Of all God's good promises through Moses."],
    ],
    refs: [["2CH.6", "2 Chronicles 6", "Solomon's prayer"], ["2CH.7", "2 Chronicles 7:1-3", "Fire falls"], ["DAN.6", "Daniel 6:10", "Daniel prays toward Jerusalem"]],
  },
  9: {
    intro: "God appears to Solomon a second time: if he walks with integrity, his throne will last; if Israel turns away, the temple will become a heap of ruins. Solomon builds cities, uses forced labor, and builds a fleet with Hiram to sail to Ophir for gold.",
    v: [
      ["9:4", "In integrity of heart and uprightness", "God tells Solomon: if you walk before Me with integrity of heart and uprightness, as David your father did, I will establish your throne forever."],
      ["9:6-7", "If you turn away", "But if you or your sons turn away to serve other gods, I will cut Israel off from the land and reject this temple. This warning later came true (2 Kings 25)."],
      ["9:15", "Hazor, Megiddo and Gezer", "Archaeologists have found similar six-chambered gates at all three, often linked to Solomon's building.", "debated", ["kitchen"]],
    ],
    refs: [["2CH.7", "2 Chronicles 7:12-22", "God's answer"], ["JER.7", "Jeremiah 7:4-14", "Do not trust in deceptive words, \"the temple of the LORD\""]],
  },
  10: {
    intro: "The queen of Sheba comes with hard questions and great gifts. Solomon answers everything, and she is breathless: \"The half was not told me.\" She blesses the LORD. Solomon's wealth grows: gold shields, an ivory throne, ships of Tarshish, horses and chariots from Egypt.",
    v: [
      ["10:1", "Because of the name of the LORD", "The queen of Sheba heard of Solomon's fame connected with the name of the LORD, and came to test him with hard questions."],
      ["10:9", "Blessed be the LORD your God", "After seeing Solomon's wisdom, the foreign queen praises Israel's God: blessed be the LORD your God, who delighted in you."],
      ["10:26-29", "Horses from Egypt", "Deuteronomy 17:16 warned kings against this."],
    ],
    bg: [["Sheba", "Sheba was most likely in south-west Arabia (modern Yemen), a land rich from the incense trade. Its camel caravans carried frankincense and spices north.", "good", ["kitchen", "wiseman"]]],
    refs: [["MAT.12", "Matthew 12:42", "The Queen of the South"], ["DEU.17", "Deuteronomy 17:16-17", "Not multiply horses, wives or gold"]],
  },
  11: {
    intro: "Solomon loves many foreign women, 700 wives and 300 concubines, and in his old age they turn his heart after other gods: Ashtoreth, Milcom and Chemosh. God is angry and says the kingdom will be torn away, except one tribe, for David's sake. Adversaries rise, including Jeroboam, to whom the prophet Ahijah gives ten pieces of a torn cloak. Solomon dies after forty years.",
    v: [
      ["11:3", "His wives turned his heart away", "The wisest man was not wise in his own heart."],
      ["11:4", "Not wholly devoted to the LORD", "\"As the heart of David his father had been.\""],
      ["11:31", "Ten pieces", "The prophet Ahijah tore his new cloak into twelve pieces and told Jeroboam to take ten. God would give him ten tribes because Solomon turned to other gods."],
      ["11:36", "A lamp always before Me in Jerusalem", "God keeps David's line for His promise's sake."],
    ],
    refs: [["NEH.13", "Nehemiah 13:26", "Did not Solomon sin regarding these things?"], ["DEU.17", "Deuteronomy 17:17", "Nor multiply wives"], ["ECC.2", "Ecclesiastes 2:10-11", "All was vanity"]],
  },
  12: {
    intro: "Solomon's son Rehoboam rejects the elders' advice to lighten the people's load and follows his young friends: \"My father disciplined you with whips, but I will discipline you with scorpions.\" The ten northern tribes revolt and make Jeroboam king. To keep his people from going to Jerusalem, Jeroboam sets up golden calves at Bethel and Dan.",
    v: [
      ["12:7", "Be a servant to this people today", "The older advisers told Rehoboam: if you will be a servant to this people today and speak kindly, they will serve you forever. He rejected their advice."],
      ["12:15", "A turn of events from the LORD", "The king did not listen to the people. This turn of events came from the LORD, fulfilling His word through Ahijah."],
      ["12:16", "To your tents, O Israel", "The kingdom divides: Israel in the north, Judah in the south."],
      ["12:28", "Behold your gods, O Israel", "Jeroboam made two golden calves and said: here are your gods, Israel, who brought you up from Egypt. The same words Aaron used (Exodus 32:4)."],
    ],
    refs: [["2CH.10", "2 Chronicles 10", "Rehoboam's choice"], ["MRK.10", "Mark 10:42-45", "Whoever wishes to be great shall be your servant"], ["EXO.32", "Exodus 32:4", "The golden calf"]],
  },
  13: {
    intro: "A man of God from Judah cries out against Jeroboam's altar at Bethel, foretelling a king named Josiah. The altar splits, and Jeroboam's hand withers until the prophet prays. The man of God is told not to eat there, but an old prophet lies to him, he disobeys, and a lion kills him on the road.",
    v: [
      ["13:2", "Josiah by name", "Fulfilled about 300 years later (2 Kings 23:15-16)."],
      ["13:18", "He lied to him", "A warning to test every word, even from religious people."],
      ["13:33", "Jeroboam did not return from his evil way", "Even after the altar split apart and his hand withered (13:4-5), Jeroboam did not turn from his evil way and kept appointing priests for the high places."],
    ],
    refs: [["2KI.23", "2 Kings 23:15-18", "Josiah fulfills the prophecy"], ["GAL.1", "Galatians 1:8", "Even if an angel preaches another gospel"], ["1JN.4", "1 John 4:1", "Test the spirits"]],
  },
  14: {
    intro: "Jeroboam's son falls ill, and he sends his wife in disguise to the old prophet Ahijah, who is blind but not fooled. Ahijah announces judgment on Jeroboam's house. In Judah, Rehoboam's people build idol shrines, and Pharaoh Shishak plunders the temple's gold.",
    v: [
      ["14:6", "Why do you pretend?", "Jeroboam's wife came disguised to the blind prophet Ahijah, but God had told him. He greets her: why do you pretend to be someone else?"],
      ["14:13", "Something good was found toward the LORD", "God sees the one good child in a bad house."],
      ["14:25-26", "Shishak king of Egypt", "Rehoboam replaces the gold shields with bronze, a sad picture of decline."],
    ],
    bg: [["Shishak's invasion", "Pharaoh Sheshonq I recorded a campaign into Canaan, about 925 BC, on the wall of the temple of Karnak in Egypt, listing towns he captured. A fragment of his victory monument was found at Megiddo.", "strong", ["kitchen", "anet"]]],
    refs: [["2CH.12", "2 Chronicles 12", "Shishak and Rehoboam"]],
  },
  15: {
    intro: "Abijam reigns briefly in Judah. His son Asa does right: he removes idols, even deposing his grandmother for making an Asherah. In Israel, Nadab, Jeroboam's son, is murdered by Baasha, who wipes out Jeroboam's family as Ahijah had said.",
    v: [
      ["15:4", "For David's sake", "Abijam did evil, yet for David's sake the LORD gave him a lamp in Jerusalem, keeping David's line alive."],
      ["15:11", "Asa did what was right", "King Asa did what was right in the LORD's eyes, as David his father had, and removed idols from the land."],
      ["15:13", "He also removed Maacah his grandmother from being queen mother", "Faithfulness reached into his own family."],
      ["15:23", "In the time of his old age he was diseased in his feet", "Chronicles adds that he sought physicians, not the LORD (2 Chronicles 16:12)."],
      ["15:29", "According to the word of the LORD", "God's words through the prophets come true."],
    ],
    bg: [["The queen mother", "In Judah the king's mother (here his grandmother) held an official, honored place, the gebirah or \"great lady.\" Asa removing her for idolatry was a bold public step.", "good", ["house", "wiseman"]]],
    refs: [["2CH.14", "2 Chronicles 14-16", "Asa's reign"]],
  },
  16: {
    intro: "Kings rise and fall quickly in Israel: Baasha, Elah, Zimri (seven days), then Omri, who builds Samaria as his capital. Omri's son Ahab does more evil than all before him. He marries Jezebel of Sidon and builds a temple for Baal in Samaria.",
    v: [
      ["16:24", "Samaria", "Omri buys the hill and builds a strong capital."],
      ["16:30", "More evil than all who were before him", "Ahab did more evil in the LORD's sight than all who came before him. He married Jezebel and served Baal. His reign is a low point for Israel."],
      ["16:31", "Jezebel", "A Phoenician princess who promotes Baal worship."],
      ["16:34", "Hiel rebuilt Jericho", "At the cost of his sons, as Joshua foretold (Joshua 6:26)."],
    ],
    bg: [["Omri outside the Bible", "The Moabite Stone (about 840 BC) names \"Omri king of Israel,\" and Assyrian records called Israel \"the house of Omri\" long after his dynasty ended.", "strong", ["kitchen", "anet"]]],
    refs: [["JOS.6", "Joshua 6:26", "Cursed is the man who rebuilds Jericho"], ["MIC.6", "Micah 6:16", "The statutes of Omri"]],
  },
  17: {
    intro: "Elijah the Tishbite tells Ahab there will be no rain except at his word. God feeds Elijah by ravens at the brook Cherith, then sends him to a widow in Zarephath of Sidon. Her flour and oil do not run out. When her son dies, Elijah prays, and God brings the boy back to life.",
    v: [
      ["17:1", "As the LORD lives, before whom I stand", "Elijah's name means \"My God is the LORD.\" Baal was worshiped as the rain god; the drought shows who rules the rain."],
      ["17:6", "The ravens brought him bread", "During the drought, ravens brought Elijah bread and meat morning and evening, and he drank from the brook. God provides in unexpected ways."],
      ["17:16", "The bowl of flour was not exhausted", "Jesus mentions this widow in Luke 4:25-26."],
      ["17:24", "Now I know that you are a man of God", "When Elijah brought her son back to life, the widow of Zarephath said: now I know you are a man of God and the LORD's word in your mouth is truth."],
    ],
    refs: [["LUK.4", "Luke 4:25-26", "A widow in Zarephath"], ["JAS.5", "James 5:17-18", "Elijah prayed earnestly"]],
  },
  18: {
    intro: "After three years, Elijah confronts Ahab and challenges 450 prophets of Baal on Mount Carmel. \"How long will you hesitate between two opinions?\" Baal's prophets cry and cut themselves all day with no answer. Elijah soaks his altar with water and prays simply. Fire falls from heaven, and the people cry, \"The LORD, He is God!\" Then rain comes.",
    v: [
      ["18:21", "How long will you hesitate?", "Elijah asks the people how long they will limp between two opinions. If the LORD is God, follow Him; if Baal, follow him."],
      ["18:27", "Perhaps he is asleep", "When Baal did not answer, Elijah mocked: shout louder; maybe he is busy, traveling or asleep. An idol cannot hear."],
      ["18:37", "Answer me, O LORD", "\"That this people may know that You, O LORD, are God.\""],
      ["18:39", "The LORD, He is God", "When fire fell from heaven and consumed the sacrifice, the people fell on their faces and cried: the LORD, He is God! The LORD, He is God!"],
      ["18:44", "A cloud as small as a man's hand", "Elijah keeps praying until the rain comes."],
    ],
    refs: [["JAS.5", "James 5:17-18", "He prayed again, and the sky poured rain"], ["JOS.24", "Joshua 24:15", "Choose for yourselves today"]],
  },
  19: {
    intro: "Jezebel threatens Elijah's life, and he runs into the wilderness, asking to die. An angel feeds him twice, and he travels forty days to Horeb. There God passes by: not in the wind, earthquake or fire, but in \"a sound of a gentle blowing.\" God gives Elijah new work and tells him 7,000 in Israel have not bowed to Baal. Elijah calls Elisha.",
    v: [
      ["19:4", "It is enough; take my life", "After his greatest victory, Elijah's lowest moment."],
      ["19:5-7", "Arise, eat", "God first cares for Elijah's body with sleep and food."],
      ["19:12", "A gentle blowing", "God was not in the wind, earthquake or fire, but in a gentle whisper. Older Bibles call it a still small voice. God met His worn-out prophet quietly."],
      ["19:18", "Seven thousand", "Elijah was not alone after all (Romans 11:4)."],
    ],
    refs: [["ROM.11", "Romans 11:2-5", "A remnant according to God's choice"], ["EXO.33", "Exodus 33:21-22", "Moses in the cleft of the rock at the same mountain"], ["1KI.18", "1 Kings 18", "The victory just before"]],
  },
  20: {
    intro: "Ben-hadad of Aram besieges Samaria. A prophet promises Ahab victory so he will know the LORD, and Israel wins twice. But Ahab lets Ben-hadad go with a treaty, and a prophet rebukes him with an acted-out parable.",
    v: [
      ["20:11", "Let not him who girds on his armor boast", "When the king of Aram boasted, Ahab answered with a proverb: the one putting on his armor should not boast like the one taking it off."],
      ["20:28", "The LORD is a god of the hills", "The Arameans think God's power has limits; God proves them wrong."],
      ["20:42", "Your life shall go for his life", "Ahab let Ben-hadad go after God had given him into his hand. A prophet tells Ahab his life will be taken in place of the man he spared."],
    ],
    refs: [["PRO.27", "Proverbs 27:1", "Do not boast about tomorrow"]],
  },
  21: {
    intro: "Naboth refuses to sell his family vineyard to King Ahab. Ahab sulks, and Jezebel arranges false witnesses to accuse Naboth of cursing God and the king. Naboth is stoned, and Ahab takes the vineyard. Elijah meets him there with God's judgment. Ahab humbles himself, and God delays the disaster.",
    v: [
      ["21:3", "The inheritance of my fathers", "Family land was a trust from God (Leviticus 25:23)."],
      ["21:20", "Have you found me, O my enemy?", "\"I have found you, because you have sold yourself to do evil.\""],
      ["21:29", "Because he has humbled himself", "After Elijah's warning, Ahab tore his clothes and fasted. God tells Elijah: because he has humbled himself, I will not bring the disaster in his days. God responds even to Ahab's repentance."],
    ],
    refs: [["LEV.25", "Leviticus 25:23", "The land is Mine"], ["2KI.9", "2 Kings 9:25-26, 36-37", "The judgment fulfilled"]],
  },
  22: {
    intro: "Ahab and Jehoshaphat of Judah plan to fight for Ramoth-gilead. Ahab's 400 prophets promise victory; Jehoshaphat asks for a prophet of the LORD. Micaiah, whom Ahab hates, foresees Israel scattered like sheep. Ahab disguises himself, but a random arrow strikes him between his armor, and he dies. Dogs lick his blood, as Elijah said.",
    v: [
      ["22:8", "I hate him", "Ahab hates the prophet who tells the truth."],
      ["22:14", "What the LORD says to me, that I shall speak", "Urged to agree with the four hundred prophets, Micaiah answers: as the LORD lives, whatever the LORD tells me, that is what I will speak."],
      ["22:34", "A certain man drew his bow at random", "Ahab disguised himself for battle, but someone drew a bow without aiming and hit him between pieces of his armor. Nothing is random to God."],
      ["22:38", "The dogs licked up his blood", "Ahab's chariot was washed at the pool of Samaria and dogs licked up his blood, as the LORD's word through Elijah said (21:19)."],
    ],
    refs: [["2CH.18", "2 Chronicles 18", "The same account"], ["2TI.4", "2 Timothy 4:3", "Teachers in accordance with their own desires"]],
  },
});
