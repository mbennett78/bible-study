// 1 Chronicles chapter notes.
import { makeBook } from "./make.js";

const sources = {
  selman: "Martin J. Selman, 1 Chronicles, Tyndale Old Testament Commentaries (InterVarsity Press, 1994).",
  thompson: "J. A. Thompson, 1, 2 Chronicles, New American Commentary 9 (Broadman & Holman, 1994).",
  japhet: "Sara Japhet, I and II Chronicles, Old Testament Library (Westminster John Knox, 1993).",
  williamson: "H. G. M. Williamson, 1 and 2 Chronicles, New Century Bible Commentary (Eerdmans, 1982).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["selman", "thompson"] }, {
  1: {
    intro: "Chronicles begins with a family tree from Adam to Israel (Jacob), passing through Noah's sons, Abraham, Ishmael, Esau and the kings of Edom. It was written for Jews returning from exile, to remind them who they were and where they came from.",
    v: [
      ["1:1", "Adam, Seth, Enosh", "The book starts with the first man: Israel's story is part of the whole human story."],
      ["1:28", "Isaac and Ishmael", "Both of Abraham's sons are listed, Ishmael as well as Isaac. Chronicles begins with all the nations before it narrows to Israel."],
      ["1:34", "Esau and Israel", "The line narrows toward the people of promise."],
    ],
    why: "Who wrote Chronicles, and when? The book does not name its author.",
    views: [
      ["Ezra or his circle", "Jewish tradition named Ezra, and the end of 2 Chronicles is repeated at the start of Ezra.", ["thompson"]],
      ["An unnamed writer about 400-350 BC", "Many scholars think a separate writer, often called \"the Chronicler,\" wrote after the return, perhaps a Levite, since the book has so much interest in temple worship.", ["japhet", "williamson"]],
    ],
    common: "All agree it was written after the exile to encourage God's people that His promises to David and His worship at the temple still stood.",
    bg: [["From Adam to Israel", "Chronicles begins with nine chapters of family lists, starting with Adam. In the Hebrew Bible, Chronicles is the last book, so the Old Testament ends by retelling the whole story from the beginning, reminding returned exiles that they belonged to God's long plan.", "good", ["selman", "williamson"]]],
    refs: [["GEN.5", "Genesis 5", "Adam to Noah"], ["LUK.3", "Luke 3:23-38", "Jesus' line back to Adam"], ["MAT.1", "Matthew 1:1-17", "The genealogy of Jesus"]],
  },
  2: {
    intro: "The sons of Israel, then the family of Judah, given first and in the most detail, leading to Jesse and his seven sons, including David.",
    v: [
      ["2:1-2", "The sons of Israel", "The twelve sons of Israel (Jacob) head the twelve tribes. The whole nation is one family."],
      ["2:3", "Er was evil in the sight of the LORD", "Even a family list remembers that God sees."],
      ["2:7", "Achar, the troubler of Israel", "Achan of Joshua 7; his name is spelled to sound like trouble (achar)."],
      ["2:15", "David the seventh", "David is named as Jesse's seventh son, the youngest, just as in 1 Samuel 16:10-11. God often chooses the least likely one."],
      ["2:34-35", "Sheshan gave his daughter to Jarha his Egyptian servant", "A foreign servant becomes part of Judah's family line."],
    ],
    bg: [["Why Judah first?", "Judah was not the oldest son, but Chronicles lists his family first and at greatest length because the kings came from Judah and God promised David's house a lasting throne. Matthew's list of Jesus' ancestors follows the same line (Matthew 1:3-6).", "good", ["selman", "japhet"]]],
    refs: [["MAT.1", "Matthew 1:3-6", "Judah to David in Jesus' family line"], ["RUT.4", "Ruth 4:18-22", "From Perez to David"], ["GEN.38", "Genesis 38", "Judah and Tamar"]],
  },
  3: {
    intro: "The sons of David born in Hebron and Jerusalem, and the line of kings descended from Solomon, continuing past the exile to the family of Zerubbabel and beyond.",
    v: [
      ["3:1-4", "Born to him in Hebron", "Six sons in seven and a half years at Hebron, including Amnon, Absalom and Adonijah."],
      ["3:5", "Solomon", "Bath-shua is another form of the name Bathsheba. Solomon, the next king, was her son."],
      ["3:17", "Jeconiah, the prisoner", "Jeconiah (also called Jehoiachin) was taken captive to Babylon. Even in exile, David's royal line survives, and Matthew 1:12 traces Jesus through it."],
      ["3:19", "Zerubbabel", "The leader of the return (Ezra 3; Haggai 1), in Jesus' family line (Matthew 1:12)."],
      ["3:22", "Hattush", "Ezra 8:2 names a Hattush of David's line among those who returned with Ezra."],
    ],
    bg: [["David's line after the exile", "The list carries David's family past the fall of Jerusalem, through King Jeconiah in exile, to Zerubbabel and several generations after him. For the returned exiles, it showed that God's promise to David's house had not died.", "good", ["selman", "williamson"]]],
    refs: [["MAT.1", "Matthew 1:6-16", "David to Jesus"], ["HAG.2", "Haggai 2:23", "Zerubbabel as a signet ring"]],
  },
  4: {
    intro: "More families of Judah and Simeon. In the middle of the list is a short prayer by a man named Jabez, whom God answered.",
    v: [
      ["4:9", "Jabez was more honorable than his brothers", "His name sounds like the Hebrew for \"pain.\""],
      ["4:10", "Oh that You would bless me indeed", "Jabez prays for blessing, God's hand with him, and protection from harm, and \"God granted him what he requested.\""],
      ["4:23", "The potters", "These potters lived near the king and worked for him. Many jar handles stamped \"belonging to the king\" have been found in Judah from about Hezekiah's day."],
    ],
    bg: [["The prayer of Jabez", "In the middle of a long list, the writer pauses for Jabez, whose name sounds like the Hebrew word for pain. He prayed, \"Oh that You would bless me indeed and enlarge my border... and keep me from harm,\" and God granted his request (4:10).", "good", ["selman", "thompson"]]],
    refs: [["MAT.7", "Matthew 7:7-11", "Ask, and it will be given to you"], ["JAS.4", "James 4:2", "You do not have because you do not ask"]],
  },
  5: {
    intro: "The tribes east of the Jordan: Reuben, Gad and half of Manasseh. When they trusted God in battle He helped them, but when they were unfaithful He let Assyria carry them away.",
    v: [
      ["5:1", "Reuben, the firstborn", "He lost the birthright through sin (Genesis 35:22; 49:4)."],
      ["5:20", "They cried out to God in the battle", "\"He answered their prayers because they trusted in Him.\""],
      ["5:26", "Tiglath-pileser", "The Assyrian king Tiglath-pileser (also called Pul) carried off Reuben, Gad and half of Manasseh. Chronicles says plainly that exile came because they were unfaithful to God (5:25)."],
    ],
    bg: [["They trusted in Him", "The tribes east of the Jordan won a war \"because they trusted in Him\" (5:20). Later they were unfaithful, and God stirred up Pul, also called Tiglath-pileser, king of Assyria, who carried them away (5:25-26).", "good", ["selman", "japhet"]]],
    refs: [["GEN.49", "Genesis 49:3-4", "Reuben's lost place"], ["2KI.15", "2 Kings 15:29", "The first deportations"]],
  },
  6: {
    intro: "The tribe of Levi: the high priests from Aaron to the exile, the temple singers David appointed (Heman, Asaph and Ethan), and the towns given to the Levites.",
    v: [
      ["6:31", "Over the service of song", "David appointed Levites to lead the singing at the house of the LORD. Music has had a place in organized worship ever since."],
      ["6:39", "Asaph", "Twelve psalms carry Asaph's name (Psalms 50, 73-83)."],
      ["6:49", "To make atonement for Israel", "Aaron and his sons offered the sacrifices and made atonement for Israel. That was the heart of the priests' work."],
      ["6:54-81", "Their dwelling places", "The Levites had no land of their own but lived in towns spread through every tribe, teaching God's law across Israel."],
    ],
    bg: [["Singers in the temple", "Heman, Asaph and Ethan led the temple music David arranged. Psalms carry their names: Asaph (50, 73-83), Heman (88) and Ethan (89). The sons of Korah, also Levites, wrote others (42-49, 84-85, 87-88).", "good", ["selman", "japhet"]]],
    refs: [["PSA.88", "Psalm 88", "A psalm of Heman"], ["PSA.89", "Psalm 89", "A psalm of Ethan"], ["PSA.73", "Psalm 73", "A psalm of Asaph"], ["NUM.35", "Numbers 35:1-8", "Cities for the Levites"]],
  },
  7: {
    intro: "Family lines of Issachar, Benjamin, Naphtali, Manasseh, Ephraim and Asher, often listing their fighting men. Ephraim's line leads to Joshua.",
    v: [
      ["7:22-23", "Ephraim mourned many days", "A father's grief, then a new son named Beriah."],
      ["7:24", "His daughter was Sheerah, who built Lower and Upper Beth-horon", "A rare mention of a woman who founded towns, and one of them, Uzzen-sheerah, carries her name."],
      ["7:27", "Joshua his son", "Joshua, Moses' successor, came from the tribe of Ephraim. His family line is traced here."],
    ],
    bg: [["Why so many names?", "Chronicles was written for Jews home from exile in Babylon. These family lists told them they still belonged to the twelve tribes and to God's promises. Tribes like Naphtali and Asher, scattered long before, are still counted.", "good", ["selman", "japhet"]]],
    refs: [["NUM.13", "Numbers 13:8, 16", "Joshua of Ephraim"]],
  },
  8: {
    intro: "The family of Benjamin, leading to King Saul and his descendants, including Jonathan's son Mephibosheth (here called Merib-baal).",
    v: [
      ["8:33", "Saul", "Saul, Israel's first king, came from the small tribe of Benjamin. His family is listed here, and again in 9:39."],
      ["8:33", "Esh-baal", "Saul's son, called Ish-bosheth in 2 Samuel, the same pattern of name-changing."],
      ["8:34", "Merib-baal", "The name Mephibosheth in 2 Samuel; writers sometimes replaced \"baal\" with \"bosheth\" (shame)."],
    ],
    bg: [["The tribe of Benjamin", "Benjamin was small but known for skilled fighters: left-handed slingers who could hit a hair (Judges 20:16) and archers who could shoot with either hand (1 Chronicles 12:2; 8:40). From this tribe came King Saul, and much later the apostle Paul.", "good", ["selman", "thompson"]]],
    refs: [["2SA.9", "2 Samuel 9", "Mephibosheth"], ["PHP.3", "Philippians 3:5", "Paul, of the tribe of Benjamin"]],
  },
  9: {
    intro: "The people who resettled Jerusalem after the exile: Israelites, priests, Levites and gatekeepers, each with their duties. The chapter ends with Saul's family again, leading into Saul's death.",
    v: [
      ["9:1", "Carried away to Babylon for their unfaithfulness", "The reason for the exile is stated plainly."],
      ["9:2", "The first who lived in their possessions", "These are the first people to settle again in their towns after the exile. God brought His people back home."],
      ["9:22", "David and Samuel the seer appointed them", "The gatekeepers' duties went back to Israel's earliest worship."],
      ["9:26-27", "They spent the night around the house of God", "Gatekeepers kept the keys and opened the doors every morning."],
      ["9:33", "The singers... day and night", "The singers were on duty day and night. In God's house, worship never stopped."],
    ],
    bg: [["Life after return", "This chapter shows Jerusalem resettled after the exile, much like Nehemiah 11. The long family lists of chapters 1-8 end here, where the readers lived: back in the land, with worship going on day and night.", "good", ["selman", "williamson"]]],
    refs: [["NEH.11", "Nehemiah 11", "The people who settled in Jerusalem"]],
  },
  10: {
    intro: "Saul and his sons die on Mount Gilboa. The writer explains why: \"Saul died for his trespass which he committed against the LORD... and also because he asked counsel of a medium... So He killed him and turned the kingdom to David.\"",
    v: [
      ["10:6", "So Saul died, and his three sons", "Chronicles skips Saul's whole reign and begins with its end, to turn quickly to David."],
      ["10:10", "They fastened his head in the house of Dagon", "The Philistines credit their god with the victory."],
      ["10:12", "All the valiant men... took away the body of Saul", "The men of Jabesh-gilead remember how Saul once rescued them (1 Samuel 11)."],
      ["10:13", "He did not keep the word of the LORD", "Chronicles gives the spiritual reason for Saul's fall."],
      ["10:14", "He did not inquire of the LORD", "Saul consulted a medium instead of seeking the LORD (1 Samuel 28). Chronicles says that is why his kingdom passed to David."],
    ],
    bg: [["Why begin with Saul's death?", "After nine chapters of family lists, the story in Chronicles starts here. It tells only how Saul's reign ended and why, so that David's kingdom, and God's promise to his house, can take center stage.", "good", ["selman", "japhet"]]],
    refs: [["1SA.11", "1 Samuel 11", "Saul rescues Jabesh-gilead"], ["1SA.31", "1 Samuel 31", "Saul's death"], ["1SA.28", "1 Samuel 28", "The medium at Endor"]],
  },
  11: {
    intro: "All Israel anoints David king at Hebron. He takes Jerusalem, and Joab becomes chief. The rest of the chapter lists David's mighty men, including the three who brought water from Bethlehem's well.",
    v: [
      ["11:3", "According to the word of the LORD through Samuel", "All Israel anointed David king, just as the LORD had promised through Samuel years before (1 Samuel 16:1-13)."],
      ["11:9", "David became greater and greater", "David kept growing stronger, \"for the LORD of hosts was with him.\" His success came from God's presence, not his own skill."],
      ["11:19", "Shall I drink the blood of these men?", "David pours out the water as an offering."],
    ],
    bg: [["Taking Jebus", "Jerusalem was a Jebusite fortress on a steep hill. David promised that whoever struck first would be chief, and Joab went up first (11:6). 2 Samuel 5:8 mentions a water shaft, and many link this with tunnels found near the Gihon spring.", "good", ["selman", "williamson"]]],
    refs: [["2SA.5", "2 Samuel 5:1-10", "The same events"], ["2SA.23", "2 Samuel 23:8-39", "The mighty men"]],
  },
  12: {
    intro: "Men from every tribe come to David, even during Saul's lifetime, including skilled Benjaminite archers who could shoot with either hand and men of Issachar \"who understood the times.\" A huge army gathers at Hebron with three days of feasting and joy.",
    v: [
      ["12:18", "Peace be to you, for your God helps you", "The Spirit came on Amasai, and he pledged loyalty to David: \"Peace be to you, for your God helps you.\""],
      ["12:32", "Men who understood the times", "\"With knowledge of what Israel should do.\""],
      ["12:40", "There was joy in Israel", "People brought food on donkeys, camels and oxen from as far as Issachar and Naphtali. David's kingdom begins in celebration."],
    ],
    bg: [["Men who understood the times", "Thousands from every tribe came to make David king. The men of Issachar are remembered as those \"who understood the times, with knowledge of what Israel should do\" (12:32).", "good", ["selman", "thompson"]]],
    refs: [["1SA.22", "1 Samuel 22:2", "David's first followers"]],
  },
  13: {
    intro: "David consults the people and sets out to bring the ark from Kiriath-jearim on a new cart. Uzza reaches out to steady it and dies. David is afraid, and the ark stays three months at the house of Obed-edom, whose household is blessed.",
    v: [
      ["13:3", "We did not seek it in the days of Saul", "Under Saul no one sought God at the ark. David wants God's presence back at the center of the nation's life."],
      ["13:10", "The anger of the LORD burned against Uzza", "They had not followed God's instructions for carrying it."],
      ["13:14", "The LORD blessed the family of Obed-edom", "The ark stayed three months in the home of Obed-edom, and God blessed his whole family. God's presence brings blessing."],
    ],
    bg: [["Ark first, then palace", "Chronicles tells of bringing up the ark (chapter 13) before David's palace and family (chapter 14), changing the order of 2 Samuel. The arrangement shows what mattered most: God's presence at the center of the nation.", "good", ["williamson", "japhet"]]],
    refs: [["2SA.6", "2 Samuel 6:1-11", "The same events"], ["NUM.4", "Numbers 4:15", "Carried by the Kohathites"]],
  },
  14: {
    intro: "Hiram of Tyre sends materials for David's house, and David realizes God has established him for Israel's sake. He asks God before each battle with the Philistines, and God gives victory, once by the sound of marching in the tops of the balsam trees.",
    v: [
      ["14:2", "For the sake of His people Israel", "David understood that God made him king for the sake of His people Israel. His kingdom was meant to serve others."],
      ["14:10", "David inquired of God", "Before each battle David asked God what to do (14:10, 14). He did not assume that the last answer would fit the next fight."],
      ["14:12", "They abandoned their gods there, so David gave the order and they were burned", "The Philistines' idols could not save them."],
      ["14:15", "The sound of marching in the tops of the balsam trees", "The sound of marching in the treetops was the signal that God Himself was going out ahead of David's army."],
      ["14:17", "The fame of David went out into all lands", "David's fame spread to all lands. It was God's blessing, Chronicles says, that made his name known."],
    ],
    bg: [["Why here?", "Chronicles places these victories between the first, failed attempt to bring up the ark (chapter 13) and the joyful second one (chapter 15). David's new habit of asking God first, before each battle, prepares him to bring the ark up the right way.", "good", ["selman", "thompson"]]],
    refs: [["2SA.5", "2 Samuel 5:11-25", "The same events"]],
  },
  15: {
    intro: "This time David prepares carefully. Only the Levites carry the ark, on poles on their shoulders, as Moses commanded. Singers and musicians play lyres, harps and cymbals, and David, in a linen robe, dances and celebrates as the ark enters Jerusalem. Michal despises him.",
    v: [
      ["15:2", "No one is to carry the ark but the Levites", "The Law said only Levites should carry the ark, on poles on their shoulders (Numbers 4:15; 7:9). David learned from his mistake with the cart."],
      ["15:13", "We did not seek Him according to the ordinance", "David admits that Uzza died because they had not done things God's way (13:9-10). Zeal is not enough without obedience."],
      ["15:16", "To raise sounds of joy", "Singers, harps, lyres and cymbals raised loud sounds of joy. Music was central to Israel's worship."],
    ],
    bg: [["Done the right way", "This time the Levites carried the ark on poles on their shoulders, as Moses commanded (15:15). David also appointed singers and players, and Chenaniah led the singing \"because he was skillful\" (15:22).", "good", ["selman", "thompson"]]],
    refs: [["2SA.6", "2 Samuel 6:12-23", "The same events"], ["PSA.24", "Psalm 24", "The King of glory comes in"]],
  },
  16: {
    intro: "The ark is placed in the tent David pitched, and offerings and gifts are given. David appoints Asaph and his relatives to give thanks, and they sing a psalm of praise: \"Oh give thanks to the LORD, call upon His name; make known His deeds among the peoples.\"",
    v: [
      ["16:8", "Give thanks to the LORD", "This psalm combines parts of Psalms 105, 96 and 106."],
      ["16:11", "Seek the LORD and His strength", "\"Seek the LORD and His strength; seek His face continually.\" David's song (also found in Psalms 105 and 96) calls God's people to keep seeking Him."],
      ["16:34", "His lovingkindness is everlasting", "\"His lovingkindness is everlasting.\" The refrain comes back again and again in Chronicles (2 Chronicles 5:13; 7:3; 20:21) and in Psalm 136."],
    ],
    bg: [["A song made from psalms", "The song sung when the ark arrived (16:8-36) combines parts of Psalms 105, 96 and 106. David appointed Asaph and his relatives to lead thanksgiving before the ark every day (16:4-7, 37).", "strong", ["williamson", "selman"]]],
    refs: [["PSA.105", "Psalm 105:1-15", "The first part of the song"], ["PSA.96", "Psalm 96", "Sing to the LORD, all the earth"], ["PSA.106", "Psalm 106:1, 47-48", "The closing lines"]],
  },
  17: {
    intro: "David wants to build God a house. Through Nathan, God promises instead to build David a house: a son whose throne God will establish forever. \"I will be his father and he shall be My son.\" David sits before the LORD in amazed thanks.",
    v: [
      ["17:11-12", "I will establish his throne forever", "Chronicles stresses the promise to David's son."],
      ["17:14", "In My house and in My kingdom forever", "The kingdom belongs to God; the king rules for Him."],
      ["17:16", "Who am I, O LORD God?", "God has just promised David a lasting dynasty. David sits before the LORD and asks, \"Who am I?\" Grace makes him humble, not proud."],
    ],
    bg: [["The promise to David retold", "God's promise of a lasting dynasty is told here much as in 2 Samuel 7. Chronicles leaves out the line about punishing David's son if he sins, and keeps the focus on the King God will establish forever (17:14).", "good", ["williamson", "japhet"]]],
    refs: [["2SA.7", "2 Samuel 7", "The same promise"], ["LUK.1", "Luke 1:32-33", "The throne of His father David"], ["HEB.1", "Hebrews 1:5", "I will be a Father to Him"]],
  },
  18: {
    intro: "David defeats the Philistines, Moab, Zobah, Aram and Edom. \"The LORD helped David wherever he went.\" He dedicates the spoil to the LORD, later used for the temple. He reigns with justice and righteousness.",
    v: [
      ["18:4", "David hamstrung all the chariot horses, except for a hundred", "Kings were not to trust in horses (Deuteronomy 17:16)."],
      ["18:6", "The LORD helped David", "\"The LORD helped David wherever he went.\" The line is repeated in 18:13: every victory is God's."],
      ["18:8", "Bronze for the temple", "The spoils of war become temple materials."],
      ["18:14", "Justice and righteousness for all his people", "David did justice and righteousness for all his people. That is the mark of a king after God's own heart."],
    ],
    bg: [["A kingdom secure", "These victories gave Israel peace on every side, the setting God had promised before His house could be built (1 Chronicles 22:8-9). David gathered, and Solomon built.", "good", ["selman", "thompson"]]],
    refs: [["DEU.17", "Deuteronomy 17:16", "Not many horses"], ["2SA.8", "2 Samuel 8", "The same events"]],
  },
  19: {
    intro: "David sends comfort to the new king of Ammon, but his envoys are humiliated. Ammon hires Aramean armies. Joab and Abishai defeat them: \"Be strong, and let us show ourselves courageous for the sake of our people and the cities of our God; and may the LORD do what is good in His sight.\"",
    v: [
      ["19:2", "I will show kindness", "David wanted to show kindness to the new king of Ammon after his father died. The kindness was rejected and turned into an insult."],
      ["19:4", "Shaved them and cut off their garments", "In that culture a shaved beard and exposed body were a deep public shame, an insult to David himself."],
      ["19:5", "Stay at Jericho until your beards grow", "The Ammonites shaved half of each envoy's beard, a deep insult. David let his men wait at Jericho until their beards grew back, sparing them shame."],
      ["19:6", "A thousand talents of silver", "Ammon hired chariots and soldiers from Aram, a huge sum showing how serious the quarrel had become."],
      ["19:13", "May the LORD do what is good in His sight", "Joab tells his men to be strong and fight bravely, and then leaves the outcome with God. Courage and trust go together."],
    ],
    bg: [["Ammon", "Ammon lived east of the Jordan, with its capital at Rabbah, today's Amman in Jordan. Nahash, the father of the new king, had shown David kindness, which is why David sent comfort.", "good", ["selman", "thompson"]]],
    refs: [["2SA.10", "2 Samuel 10", "The same events"]],
  },
  20: {
    intro: "Joab takes the Ammonite capital Rabbah, and David receives its king's crown. In later battles, David's men kill Philistine giants, including Lahmi the brother of Goliath.",
    v: [
      ["20:1", "At the time when kings go out to battle", "Chronicles does not repeat the story of David and Bathsheba from that spring; its focus is the temple and God's promise."],
      ["20:2", "David took the crown of their king", "It weighed a talent of gold, about 75 pounds, and was set on David's head."],
      ["20:5", "Lahmi the brother of Goliath", "Elhanan killed Lahmi, the brother of Goliath. This verse helps explain 2 Samuel 21:19, which seems to say Elhanan killed Goliath himself."],
      ["20:6", "A man of great stature who had twenty-four fingers and toes", "This giant had six fingers on each hand and six toes on each foot. The Philistine giants of Gath were known for their size (Joshua 11:22)."],
    ],
    bg: [["Lahmi and 2 Samuel 21:19", "2 Samuel 21:19 says Elhanan killed \"Goliath the Gittite,\" while 1 Chronicles 20:5 says he killed \"Lahmi the brother of Goliath.\" Many think the Samuel text suffered a copying slip (the Hebrew words look alike). Others think the giant's brother bore a family name. Either way, David killed Goliath in 1 Samuel 17.", "debated", ["selman", "thompson"]]],
    refs: [["2SA.12", "2 Samuel 12:26-31", "The fall of Rabbah"], ["2SA.21", "2 Samuel 21:15-22", "The giants"]],
  },
  21: {
    intro: "Satan stirs David to count Israel. Joab objects, but David insists, and then knows he has sinned. God offers three choices of judgment, and a plague strikes until the angel stands by the threshing floor of Ornan. David buys it, builds an altar, and God answers with fire from heaven. This becomes the site of the temple.",
    v: [
      ["21:1", "Satan stood up against Israel", "2 Samuel 24:1 says the LORD's anger moved David: both are true, as in Job."],
      ["21:13", "Let me fall into the hand of the LORD, for His mercies are very great", "Offered three punishments, David chooses to fall into God's hands, because \"His mercies are very great.\" Even under judgment, he trusts God's mercy."],
      ["21:24", "I will not offer burnt offerings which cost me nothing", "David refuses Ornan's gift: \"I will not offer burnt offerings which cost me nothing.\" True worship costs us something."],
      ["21:26", "He answered him with fire", "God answered with fire from heaven on the altar, showing that He accepted the offering. This threshing floor became the site of the temple (2 Chronicles 3:1)."],
    ],
    bg: [["Who moved David?", "2 Samuel 24:1 says the LORD's anger moved David to count Israel; 1 Chronicles 21:1 says Satan stirred him up. Many readers see both as true: God allowed Satan's work to bring judgment, as in Job 1-2. David paid six hundred shekels of gold for the whole site (21:25), where 2 Samuel mentions fifty shekels of silver for the threshing floor and oxen.", "good", ["selman", "thompson"]]],
    refs: [["2SA.24", "2 Samuel 24", "The same census"], ["2CH.3", "2 Chronicles 3:1", "The temple on Ornan's threshing floor"], ["JOB.1", "Job 1:6-12", "Satan and God's permission"]],
  },
  22: {
    intro: "David declares, \"This is the house of the LORD God.\" He gathers stone, iron, bronze and cedar in abundance, because Solomon is young. He charges Solomon to build the temple, explaining that he himself shed too much blood to build it, and urges Israel's leaders to help: \"Set your heart and your soul to seek the LORD your God.\"",
    v: [
      ["22:5", "Exceedingly magnificent", "\"Famous and glorious throughout all lands.\""],
      ["22:8", "You have shed much blood", "The temple would be built by a man of peace (Solomon's name is like shalom)."],
      ["22:13", "Be strong and courageous", "\"Be strong and courageous.\" David passes on to Solomon the same words God spoke to Joshua (Joshua 1:6-9)."],
      ["22:19", "Set your heart and your soul to seek the LORD", "\"Set your heart and your soul to seek the LORD your God.\" Seeking God with the whole heart is the heart of Chronicles' message."],
    ],
    bg: [["David prepares for the temple", "God told David he could not build the temple because he had shed much blood in war (22:8). So David gathered stone, iron, bronze and cedar \"in great quantity\" and charged Solomon, a man of peace, to build it.", "good", ["selman", "williamson"]]],
    refs: [["1KI.5", "1 Kings 5:3-5", "Solomon explains"], ["JOS.1", "Joshua 1:9", "Be strong and courageous"]],
  },
  23: {
    intro: "David, old, makes Solomon king. He counts the Levites from age thirty up (later twenty) and organizes them for temple service, gatekeeping, music and praise every morning and evening.",
    v: [
      ["23:13", "Aaron was set apart to sanctify him as most holy", "Aaron and his sons were set apart for the holiest duties, to burn incense, minister before the LORD and bless in His name."],
      ["23:26", "The Levites will no longer need to carry the tabernacle", "With a permanent temple, their old work of carrying the tent was done, so David gave them new duties."],
      ["23:30", "To stand every morning to thank and to praise the LORD", "The Levites stood every morning and every evening to thank and praise the LORD. Praise was part of the daily rhythm."],
    ],
    bg: [["Thirty or twenty?", "In Numbers 4 Levites served from age thirty; here David counts from thirty, then lowers the age to twenty (23:24, 27). A permanent temple with daily music, gatekeeping and care of the courts needed many more helpers than carrying the tabernacle had.", "good", ["selman", "williamson"]]],
    refs: [["NUM.4", "Numbers 4:3", "Levites' service ages"], ["PSA.92", "Psalm 92:1-2", "To declare Your lovingkindness in the morning"]],
  },
  24: {
    intro: "The priests, descendants of Aaron through Eleazar and Ithamar, are divided by lot into twenty-four divisions to take turns serving at the temple.",
    v: [
      ["24:5", "By lot", "The priests were divided into twenty-four groups by casting lots, so no family was favored. In Luke 1:5-9, Zacharias serves in the eighth group, Abijah (24:10)."],
      ["24:10", "The eighth to Abijah", "Zechariah, father of John the Baptist, belonged to the division of Abijah (Luke 1:5)."],
    ],
    bg: [["The priestly courses", "Each of the twenty-four divisions served at the temple for a week at a time, about twice a year, and all served together at the great feasts. Scrolls found at Qumran keep calendars of these courses, and an inscription from Caesarea lists the twenty-four courses with the Galilee towns where their families later lived.", "good", ["selman", "williamson"]]],
    refs: [["LUK.1", "Luke 1:5, 8-9", "Zechariah's division"]],
  },
  25: {
    intro: "David and the army commanders set apart the sons of Asaph, Heman and Jeduthun \"to prophesy with lyres, harps and cymbals.\" The 288 trained musicians are divided by lot into twenty-four groups, small and great, teacher and pupil alike.",
    v: [
      ["25:1", "Prophesy with lyres", "The sons of Asaph, Heman and Jeduthun were to \"prophesy\" with lyres, harps and cymbals. Leading worship in music was a spiritual ministry."],
      ["25:7", "Trained in singing to the LORD", "These 288 musicians were trained and skilled in singing to the LORD. Skill is a gift we can offer back to God."],
      ["25:8", "The small as well as the great, the teacher as well as the pupil", "Young and old, teacher and pupil all cast lots for their turns. Everyone served on the same footing."],
    ],
    bg: [["Temple musicians", "David set apart the sons of Asaph, Heman and Jeduthun to prophesy with music. There were 288 skilled musicians in twenty-four groups, each taking turns, \"the small as well as the great\" (25:7-8).", "good", ["selman", "thompson"]]],
    refs: [["COL.3", "Colossians 3:16", "Singing psalms and hymns"], ["PSA.150", "Psalm 150", "Praise Him with harp and lyre"]],
  },
  26: {
    intro: "The gatekeepers are assigned to the temple's gates by lot, and others are put in charge of the treasuries, including the dedicated spoils of war. Officials and judges are appointed for the work outside the temple.",
    v: [
      ["26:5", "For God had blessed him", "Obed-edom, who had sheltered the ark (13:14), now has a large family serving at God's house."],
      ["26:8", "Able men with strength for the service", "The gatekeepers are called able men with strength for the work. Even guarding doors was service to God."],
      ["26:27", "From the spoil won in battles", "Dedicated to repair the house of the LORD."],
      ["26:28", "All that Samuel the seer had dedicated", "Gifts from Samuel, Saul, Abner and Joab: Israel's history stored up for God's house."],
    ],
    bg: [["Gatekeepers and treasurers", "Gatekeepers guarded the temple's entrances day and night and cared for its storerooms. Treasurers kept the temple gifts and the spoils dedicated from battles, set aside for the house of God.", "good", ["selman", "japhet"]]],
    refs: [["PSA.84", "Psalm 84:10", "I would rather stand at the threshold of the house of my God"]],
  },
  27: {
    intro: "Lists of Israel's army divisions, each serving one month a year, the leaders of the tribes, and the officials over the king's property, flocks, vineyards and counselors.",
    v: [
      ["27:1", "Month by month", "Each of twelve divisions of 24,000 men served one month a year. It was a citizen army that took turns."],
      ["27:23", "David did not count those twenty years and under", "Because God had promised to make Israel as many as the stars."],
      ["27:24", "The number was not included in the account of the chronicles of King David", "The census of chapter 21 had brought judgment, so its total was left out of the royal records."],
      ["27:33", "Ahithophel was counselor to the king", "Ahithophel was the king's counselor and Hushai was \"the king's friend.\" When Absalom rebelled, Ahithophel joined him and Hushai stayed loyal (2 Samuel 15-17)."],
    ],
    bg: [["A citizen army", "Twelve divisions of 24,000 men each took turns serving one month a year. This kept a trained force ready without a large standing army, and let men spend most of the year at home on their farms.", "good", ["selman", "thompson"]]],
    refs: [["1CH.21", "1 Chronicles 21", "David's census"], ["GEN.15", "Genesis 15:5", "Count the stars"]],
  },
  28: {
    intro: "David assembles all Israel's leaders. He tells them God chose Solomon to build the temple, and charges Solomon: \"Know the God of your father, and serve Him with a whole heart and a willing mind; for the LORD searches all hearts.\" He gives Solomon the plans for the temple, written by the hand of the LORD upon him.",
    v: [
      ["28:9", "If you seek Him, He will let you find Him", "\"But if you forsake Him, He will reject you forever.\""],
      ["28:12", "The plan of all that he had in mind by the Spirit", "The temple plan came from God, like the tabernacle's."],
      ["28:20", "He will not fail you nor forsake you", "David assures Solomon that God \"will not fail you nor forsake you\" until all the work for the temple is finished (compare Hebrews 13:5)."],
    ],
    bg: [["The plan given by the Spirit", "David gave Solomon the plan for the temple and its courts, rooms and furnishings, \"the plan of all that he had in mind by the Spirit\" (28:12, 19), as Moses received the pattern for the tabernacle (Exodus 25:9).", "good", ["selman", "williamson"]]],
    refs: [["JER.29", "Jeremiah 29:13", "You will seek Me and find Me"], ["EXO.25", "Exodus 25:9", "The pattern shown to Moses"], ["HEB.13", "Hebrews 13:5", "I will never desert you"]],
  },
  29: {
    intro: "David gives his own treasure of gold and silver for the temple, and the leaders and people give willingly and rejoice. David blesses the LORD before the assembly: \"Yours, O LORD, is the greatness and the power and the glory... all things come from You, and from Your hand we have given You.\" Solomon is made king a second time, and David dies at a good old age.",
    v: [
      ["29:9", "The people rejoiced because they had offered so willingly", "The people rejoiced because they gave willingly and with a whole heart. God loves a cheerful giver (2 Corinthians 9:7)."],
      ["29:11", "Yours, O LORD, is the greatness", "Echoed in the closing words often added to the Lord's Prayer."],
      ["29:14", "From Your hand we have given You", "\"All things come from You, and from Your hand we have given You.\" Every gift we bring God was His first."],
      ["29:28", "Full of days, riches and honor", "David died in a good old age, full of days, riches and honor. In spite of his failures, his life ends well."],
    ],
    bg: [["\"Yours, O LORD, is the greatness\"", "David's prayer, \"Yours, O LORD, is the greatness and the power and the glory\" (29:11), has shaped Christian worship. Many think it inspired the closing words often added to the Lord's Prayer: \"For Yours is the kingdom and the power and the glory forever.\"", "good", ["selman", "thompson"]]],
    refs: [["2CO.9", "2 Corinthians 9:7", "God loves a cheerful giver"], ["MAT.6", "Matthew 6:13", "Yours is the kingdom and the power"], ["1KI.2", "1 Kings 2:10-12", "David's death"]],
  },
});
