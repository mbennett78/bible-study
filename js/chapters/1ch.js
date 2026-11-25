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
      ["1:28", "Isaac and Ishmael", "Both sons of Abraham are listed."],
      ["1:34", "Esau and Israel", "The line narrows toward the people of promise."],
    ],
    why: "Who wrote Chronicles, and when? The book does not name its author.",
    views: [
      ["Ezra or his circle", "Jewish tradition named Ezra, and the end of 2 Chronicles is repeated at the start of Ezra.", ["thompson"]],
      ["An unnamed writer about 400-350 BC", "Many scholars think a separate writer, often called \"the Chronicler,\" wrote after the return, perhaps a Levite, since the book has so much interest in temple worship.", ["japhet", "williamson"]],
    ],
    common: "All agree it was written after the exile to encourage God's people that His promises to David and His worship at the temple still stood.",
    refs: [["GEN.5", "Genesis 5", "Adam to Noah"], ["LUK.3", "Luke 3:23-38", "Jesus' line back to Adam"], ["MAT.1", "Matthew 1:1-17", "The genealogy of Jesus"]],
  },
  2: {
    intro: "The sons of Israel, then the family of Judah, given first and in the most detail, leading to Jesse and his seven sons, including David.",
    v: [
      ["2:1-2", "The sons of Israel", "Twelve tribes, one family."],
      ["2:3", "Er was evil in the sight of the LORD", "Even a family list remembers that God sees."],
      ["2:15", "David the seventh", "The youngest, as in 1 Samuel 16."],
    ],
    refs: [["RUT.4", "Ruth 4:18-22", "From Perez to David"], ["GEN.38", "Genesis 38", "Judah and Tamar"]],
  },
  3: {
    intro: "The sons of David born in Hebron and Jerusalem, and the line of kings descended from Solomon, continuing past the exile to the family of Zerubbabel and beyond.",
    v: [
      ["3:5", "Solomon", "Son of Bathsheba (Bath-shua)."],
      ["3:17", "Jeconiah, the prisoner", "The line survives in exile."],
      ["3:19", "Zerubbabel", "The leader of the return (Ezra 3; Haggai 1), in Jesus' family line (Matthew 1:12)."],
    ],
    refs: [["MAT.1", "Matthew 1:6-16", "David to Jesus"], ["HAG.2", "Haggai 2:23", "Zerubbabel as a signet ring"]],
  },
  4: {
    intro: "More families of Judah and Simeon. In the middle of the list is a short prayer by a man named Jabez, whom God answered.",
    v: [
      ["4:9", "Jabez was more honorable than his brothers", "His name sounds like the Hebrew for \"pain.\""],
      ["4:10", "Oh that You would bless me indeed", "Jabez prays for blessing, God's hand with him, and protection from harm, and \"God granted him what he requested.\""],
      ["4:23", "The potters", "Craftsmen who worked for the king."],
    ],
    refs: [["MAT.7", "Matthew 7:7-11", "Ask, and it will be given to you"], ["JAS.4", "James 4:2", "You do not have because you do not ask"]],
  },
  5: {
    intro: "The tribes east of the Jordan: Reuben, Gad and half of Manasseh. When they trusted God in battle He helped them, but when they were unfaithful He let Assyria carry them away.",
    v: [
      ["5:1", "Reuben, the firstborn", "He lost the birthright through sin (Genesis 35:22; 49:4)."],
      ["5:20", "They cried out to God in the battle", "\"He answered their prayers because they trusted in Him.\""],
      ["5:26", "Tiglath-pileser", "Exile came for unfaithfulness."],
    ],
    refs: [["GEN.49", "Genesis 49:3-4", "Reuben's lost place"], ["2KI.15", "2 Kings 15:29", "The first deportations"]],
  },
  6: {
    intro: "The tribe of Levi: the high priests from Aaron to the exile, the temple singers David appointed (Heman, Asaph and Ethan), and the towns given to the Levites.",
    v: [
      ["6:31", "Over the service of song", "David organized music for worship."],
      ["6:39", "Asaph", "Twelve psalms carry Asaph's name (Psalms 50, 73-83)."],
      ["6:49", "To make atonement for Israel", "The heart of the priests' work."],
    ],
    refs: [["PSA.73", "Psalm 73", "A psalm of Asaph"], ["NUM.35", "Numbers 35:1-8", "Cities for the Levites"]],
  },
  7: {
    intro: "Family lines of Issachar, Benjamin, Naphtali, Manasseh, Ephraim and Asher, often listing their fighting men. Ephraim's line leads to Joshua.",
    v: [
      ["7:22-23", "Ephraim mourned many days", "A father's grief, then a new son named Beriah."],
      ["7:24", "His daughter was Sheerah, who built Lower and Upper Beth-horon", "A rare mention of a woman who founded towns, and one of them, Uzzen-sheerah, carries her name."],
      ["7:27", "Joshua his son", "The successor of Moses."],
    ],
    bg: [["Why so many names?", "Chronicles was written for Jews home from exile in Babylon. These family lists told them they still belonged to the twelve tribes and to God's promises. Tribes like Naphtali and Asher, scattered long before, are still counted.", "good", ["selman", "japhet"]]],
    refs: [["NUM.13", "Numbers 13:8, 16", "Joshua of Ephraim"]],
  },
  8: {
    intro: "The family of Benjamin, leading to King Saul and his descendants, including Jonathan's son Mephibosheth (here called Merib-baal).",
    v: [
      ["8:33", "Saul", "Israel's first king came from Benjamin."],
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
      ["9:2", "The first who lived in their possessions", "God brought His people back."],
      ["9:33", "The singers... day and night", "Worship never stopped."],
    ],
    refs: [["NEH.11", "Nehemiah 11", "The people who settled in Jerusalem"]],
  },
  10: {
    intro: "Saul and his sons die on Mount Gilboa. The writer explains why: \"Saul died for his trespass which he committed against the LORD... and also because he asked counsel of a medium... So He killed him and turned the kingdom to David.\"",
    v: [
      ["10:13", "He did not keep the word of the LORD", "Chronicles gives the spiritual reason for Saul's fall."],
      ["10:14", "He did not inquire of the LORD", "Saul asked a medium instead."],
    ],
    refs: [["1SA.31", "1 Samuel 31", "Saul's death"], ["1SA.28", "1 Samuel 28", "The medium at Endor"]],
  },
  11: {
    intro: "All Israel anoints David king at Hebron. He takes Jerusalem, and Joab becomes chief. The rest of the chapter lists David's mighty men, including the three who brought water from Bethlehem's well.",
    v: [
      ["11:3", "According to the word of the LORD through Samuel", "God's promise fulfilled."],
      ["11:9", "David became greater and greater", "\"For the LORD of hosts was with him.\""],
      ["11:19", "Shall I drink the blood of these men?", "David pours out the water as an offering."],
    ],
    refs: [["2SA.5", "2 Samuel 5:1-10", "The same events"], ["2SA.23", "2 Samuel 23:8-39", "The mighty men"]],
  },
  12: {
    intro: "Men from every tribe come to David, even during Saul's lifetime, including skilled Benjaminite archers who could shoot with either hand and men of Issachar \"who understood the times.\" A huge army gathers at Hebron with three days of feasting and joy.",
    v: [
      ["12:18", "Peace be to you, for your God helps you", "The Spirit comes on Amasai."],
      ["12:32", "Men who understood the times", "\"With knowledge of what Israel should do.\""],
      ["12:40", "There was joy in Israel", "The kingdom begins in celebration."],
    ],
    refs: [["1SA.22", "1 Samuel 22:2", "David's first followers"]],
  },
  13: {
    intro: "David consults the people and sets out to bring the ark from Kiriath-jearim on a new cart. Uzza reaches out to steady it and dies. David is afraid, and the ark stays three months at the house of Obed-edom, whose household is blessed.",
    v: [
      ["13:3", "We did not seek it in the days of Saul", "David wants God at the center."],
      ["13:10", "The anger of the LORD burned against Uzza", "They had not followed God's instructions for carrying it."],
      ["13:14", "The LORD blessed the family of Obed-edom", "God's presence brings blessing."],
    ],
    refs: [["2SA.6", "2 Samuel 6:1-11", "The same events"], ["NUM.4", "Numbers 4:15", "Carried by the Kohathites"]],
  },
  14: {
    intro: "Hiram of Tyre sends materials for David's house, and David realizes God has established him for Israel's sake. He asks God before each battle with the Philistines, and God gives victory, once by the sound of marching in the tops of the balsam trees.",
    v: [
      ["14:2", "For the sake of His people Israel", "David's kingdom was for others."],
      ["14:10", "David inquired of God", "Each time."],
      ["14:15", "The sound of marching in the tops of the balsam trees", "God goes ahead into battle."],
    ],
    refs: [["2SA.5", "2 Samuel 5:11-25", "The same events"]],
  },
  15: {
    intro: "This time David prepares carefully. Only the Levites carry the ark, on poles on their shoulders, as Moses commanded. Singers and musicians play lyres, harps and cymbals, and David, in a linen robe, dances and celebrates as the ark enters Jerusalem. Michal despises him.",
    v: [
      ["15:2", "No one is to carry the ark but the Levites", "David learned from his mistake."],
      ["15:13", "We did not seek Him according to the ordinance", "David explains Uzza's death."],
      ["15:16", "To raise sounds of joy", "Music was central to worship."],
    ],
    refs: [["2SA.6", "2 Samuel 6:12-23", "The same events"], ["PSA.24", "Psalm 24", "The King of glory comes in"]],
  },
  16: {
    intro: "The ark is placed in the tent David pitched, and offerings and gifts are given. David appoints Asaph and his relatives to give thanks, and they sing a psalm of praise: \"Oh give thanks to the LORD, call upon His name; make known His deeds among the peoples.\"",
    v: [
      ["16:8", "Give thanks to the LORD", "This psalm combines parts of Psalms 105, 96 and 106."],
      ["16:11", "Seek the LORD and His strength", "\"Seek His face continually.\""],
      ["16:34", "His lovingkindness is everlasting", "A refrain that runs through Chronicles."],
    ],
    refs: [["PSA.105", "Psalm 105:1-15", "The first part of the song"], ["PSA.96", "Psalm 96", "Sing to the LORD, all the earth"], ["PSA.106", "Psalm 106:1, 47-48", "The closing lines"]],
  },
  17: {
    intro: "David wants to build God a house. Through Nathan, God promises instead to build David a house: a son whose throne God will establish forever. \"I will be his father and he shall be My son.\" David sits before the LORD in amazed thanks.",
    v: [
      ["17:11-12", "I will establish his throne forever", "Chronicles stresses the promise to David's son."],
      ["17:14", "In My house and in My kingdom forever", "The kingdom belongs to God; the king rules for Him."],
      ["17:16", "Who am I, O LORD God?", "Humility in the face of grace."],
    ],
    refs: [["2SA.7", "2 Samuel 7", "The same promise"], ["LUK.1", "Luke 1:32-33", "The throne of His father David"], ["HEB.1", "Hebrews 1:5", "I will be a Father to Him"]],
  },
  18: {
    intro: "David defeats the Philistines, Moab, Zobah, Aram and Edom. \"The LORD helped David wherever he went.\" He dedicates the spoil to the LORD, later used for the temple. He reigns with justice and righteousness.",
    v: [
      ["18:6", "The LORD helped David", "Repeated in 18:13."],
      ["18:8", "Bronze for the temple", "The spoils of war become temple materials."],
      ["18:14", "Justice and righteousness for all his people", "The mark of a godly king."],
    ],
    refs: [["2SA.8", "2 Samuel 8", "The same events"]],
  },
  19: {
    intro: "David sends comfort to the new king of Ammon, but his envoys are humiliated. Ammon hires Aramean armies. Joab and Abishai defeat them: \"Be strong, and let us show ourselves courageous for the sake of our people and the cities of our God; and may the LORD do what is good in His sight.\"",
    v: [
      ["19:2", "I will show kindness", "Kindness rejected."],
      ["19:13", "May the LORD do what is good in His sight", "Courage and trust together."],
    ],
    refs: [["2SA.10", "2 Samuel 10", "The same events"]],
  },
  20: {
    intro: "Joab takes the Ammonite capital Rabbah, and David receives its king's crown. In later battles, David's men kill Philistine giants, including Lahmi the brother of Goliath.",
    v: [
      ["20:1", "At the time when kings go out to battle", "Chronicles does not repeat the story of David and Bathsheba from that spring; its focus is the temple and God's promise."],
      ["20:5", "Lahmi the brother of Goliath", "This helps explain 2 Samuel 21:19."],
    ],
    refs: [["2SA.12", "2 Samuel 12:26-31", "The fall of Rabbah"], ["2SA.21", "2 Samuel 21:15-22", "The giants"]],
  },
  21: {
    intro: "Satan stirs David to count Israel. Joab objects, but David insists, and then knows he has sinned. God offers three choices of judgment, and a plague strikes until the angel stands by the threshing floor of Ornan. David buys it, builds an altar, and God answers with fire from heaven. This becomes the site of the temple.",
    v: [
      ["21:1", "Satan stood up against Israel", "2 Samuel 24:1 says the LORD's anger moved David: both are true, as in Job."],
      ["21:13", "Let me fall into the hand of the LORD, for His mercies are very great", "David trusts God's mercy."],
      ["21:24", "I will not offer burnt offerings which cost me nothing", "True worship costs something."],
      ["21:26", "He answered him with fire", "God accepts the offering."],
    ],
    refs: [["2SA.24", "2 Samuel 24", "The same census"], ["2CH.3", "2 Chronicles 3:1", "The temple on Ornan's threshing floor"], ["JOB.1", "Job 1:6-12", "Satan and God's permission"]],
  },
  22: {
    intro: "David declares, \"This is the house of the LORD God.\" He gathers stone, iron, bronze and cedar in abundance, because Solomon is young. He charges Solomon to build the temple, explaining that he himself shed too much blood to build it, and urges Israel's leaders to help: \"Set your heart and your soul to seek the LORD your God.\"",
    v: [
      ["22:5", "Exceedingly magnificent", "\"Famous and glorious throughout all lands.\""],
      ["22:8", "You have shed much blood", "The temple would be built by a man of peace (Solomon's name is like shalom)."],
      ["22:13", "Be strong and courageous", "The words spoken to Joshua."],
      ["22:19", "Set your heart and your soul to seek the LORD", "The heart of Chronicles' message."],
    ],
    refs: [["1KI.5", "1 Kings 5:3-5", "Solomon explains"], ["JOS.1", "Joshua 1:9", "Be strong and courageous"]],
  },
  23: {
    intro: "David, old, makes Solomon king. He counts the Levites from age thirty up (later twenty) and organizes them for temple service, gatekeeping, music and praise every morning and evening.",
    v: [
      ["23:13", "Aaron was set apart to sanctify him as most holy", "The priests' special role."],
      ["23:30", "To stand every morning to thank and to praise the LORD", "And likewise at evening."],
    ],
    refs: [["NUM.4", "Numbers 4:3", "Levites' service ages"], ["PSA.92", "Psalm 92:1-2", "To declare Your lovingkindness in the morning"]],
  },
  24: {
    intro: "The priests, descendants of Aaron through Eleazar and Ithamar, are divided by lot into twenty-four divisions to take turns serving at the temple.",
    v: [
      ["24:5", "By lot", "Fair division, left to God."],
      ["24:10", "The eighth to Abijah", "Zechariah, father of John the Baptist, belonged to the division of Abijah (Luke 1:5)."],
    ],
    bg: [["The priestly courses", "Each of the twenty-four divisions served at the temple for a week at a time, about twice a year, and all served together at the great feasts. Scrolls found at Qumran keep calendars of these courses, and an inscription from Caesarea lists the twenty-four courses with the Galilee towns where their families later lived.", "good", ["selman", "williamson"]]],
    refs: [["LUK.1", "Luke 1:5, 8-9", "Zechariah's division"]],
  },
  25: {
    intro: "David and the army commanders set apart the sons of Asaph, Heman and Jeduthun \"to prophesy with lyres, harps and cymbals.\" The 288 trained musicians are divided by lot into twenty-four groups, small and great, teacher and pupil alike.",
    v: [
      ["25:1", "Prophesy with lyres", "Worship music was a spiritual ministry."],
      ["25:7", "Trained in singing to the LORD", "Skill offered to God."],
      ["25:8", "The small as well as the great, the teacher as well as the pupil", "Everyone takes turns."],
    ],
    refs: [["COL.3", "Colossians 3:16", "Singing psalms and hymns"], ["PSA.150", "Psalm 150", "Praise Him with harp and lyre"]],
  },
  26: {
    intro: "The gatekeepers are assigned to the temple's gates by lot, and others are put in charge of the treasuries, including the dedicated spoils of war. Officials and judges are appointed for the work outside the temple.",
    v: [
      ["26:8", "Able men with strength for the service", "Even gatekeeping is God's work."],
      ["26:27", "From the spoil won in battles", "Dedicated to repair the house of the LORD."],
    ],
    refs: [["PSA.84", "Psalm 84:10", "I would rather stand at the threshold of the house of my God"]],
  },
  27: {
    intro: "Lists of Israel's army divisions, each serving one month a year, the leaders of the tribes, and the officials over the king's property, flocks, vineyards and counselors.",
    v: [
      ["27:1", "Month by month", "A citizen army that served in rotation."],
      ["27:23", "David did not count those twenty years and under", "Because God had promised to make Israel as many as the stars."],
      ["27:33", "Ahithophel was counselor to the king", "Hushai was the king's friend."],
    ],
    refs: [["GEN.15", "Genesis 15:5", "Count the stars"]],
  },
  28: {
    intro: "David assembles all Israel's leaders. He tells them God chose Solomon to build the temple, and charges Solomon: \"Know the God of your father, and serve Him with a whole heart and a willing mind; for the LORD searches all hearts.\" He gives Solomon the plans for the temple, written by the hand of the LORD upon him.",
    v: [
      ["28:9", "If you seek Him, He will let you find Him", "\"But if you forsake Him, He will reject you forever.\""],
      ["28:12", "The plan of all that he had in mind by the Spirit", "The temple plan came from God, like the tabernacle's."],
      ["28:20", "He will not fail you nor forsake you", "Until the work is finished."],
    ],
    refs: [["JER.29", "Jeremiah 29:13", "You will seek Me and find Me"], ["EXO.25", "Exodus 25:9", "The pattern shown to Moses"], ["HEB.13", "Hebrews 13:5", "I will never desert you"]],
  },
  29: {
    intro: "David gives his own treasure of gold and silver for the temple, and the leaders and people give willingly and rejoice. David blesses the LORD before the assembly: \"Yours, O LORD, is the greatness and the power and the glory... all things come from You, and from Your hand we have given You.\" Solomon is made king a second time, and David dies at a good old age.",
    v: [
      ["29:9", "The people rejoiced because they had offered so willingly", "Joyful giving."],
      ["29:11", "Yours, O LORD, is the greatness", "Echoed in the closing words often added to the Lord's Prayer."],
      ["29:14", "From Your hand we have given You", "Every gift to God was His first."],
      ["29:28", "Full of days, riches and honor", "David's life ends well."],
    ],
    refs: [["2CO.9", "2 Corinthians 9:7", "God loves a cheerful giver"], ["MAT.6", "Matthew 6:13", "Yours is the kingdom and the power"], ["1KI.2", "1 Kings 2:10-12", "David's death"]],
  },
});
