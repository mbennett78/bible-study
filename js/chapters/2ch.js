// 2 Chronicles chapter notes.
import { makeBook } from "./make.js";

const sources = {
  selman: "Martin J. Selman, 2 Chronicles, Tyndale Old Testament Commentaries (InterVarsity Press, 1994).",
  thompson: "J. A. Thompson, 1, 2 Chronicles, New American Commentary 9 (Broadman & Holman, 1994).",
  japhet: "Sara Japhet, I and II Chronicles, Old Testament Library (Westminster John Knox, 1993).",
  williamson: "H. G. M. Williamson, 1 and 2 Chronicles, New Century Bible Commentary (Eerdmans, 1982).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["selman", "thompson"] }, {
  1: {
    intro: "Solomon worships at Gibeon, where the old tabernacle stood. God appears and says, \"Ask what I shall give you.\" Solomon asks for wisdom and knowledge to lead God's people, and God gives that and riches and honor besides.",
    v: [
      ["1:10", "Wisdom and knowledge", "For the good of the people, not himself."],
      ["1:12", "Riches, wealth and honor", "Solomon asked only for wisdom, and God gave him riches, wealth and honor as well. God gives more generously than we ask (Ephesians 3:20)."],
      ["1:15", "Silver and gold as plentiful as stones", "Silver and gold were as common as stones, and cedar as common as sycamore trees. It is a picture of Solomon's golden age."],
    ],
    bg: [["Horses from Egypt and Kue", "Solomon's traders bought horses from Egypt and from Kue, in Cilicia (southern Turkey), and sold chariots and horses to the Hittite and Aramean kings (1:16-17). The Law had warned kings not to multiply horses from Egypt (Deuteronomy 17:16).", "good", ["selman", "kitchen"]]],
    refs: [["1KI.3", "1 Kings 3:4-15", "The same dream"], ["JAS.1", "James 1:5", "Ask God for wisdom"]],
  },
  2: {
    intro: "Solomon prepares to build the temple and asks Hiram king of Tyre for cedar and for a skilled craftsman. He writes, \"The house I am about to build will be great, for greater is our God than all the gods. But who is able to build a house for Him, for the heavens cannot contain Him?\"",
    v: [
      ["2:5", "Greater is our God than all the gods", "Solomon wants a great temple because \"our God is greater than all the gods.\" Yet he knows even heaven cannot contain God (2:6)."],
      ["2:6", "The highest heavens cannot contain Him", "No building can hold God; the temple is a place to worship Him."],
      ["2:12", "Blessed be the LORD", "Huram (Hiram), the foreign king of Tyre, blesses the LORD who made heaven and earth. God's greatness is seen even by outsiders."],
    ],
    bg: [["Huram-abi the craftsman", "Hiram of Tyre sent Huram-abi, whose mother was from the tribe of Dan and whose father was from Tyre, skilled in gold, silver, bronze, stone, wood and fine cloth (2:13-14). Like Bezalel for the tabernacle, he led the craftwork.", "good", ["selman", "williamson"]]],
    refs: [["1KI.5", "1 Kings 5", "The same agreement"], ["ACT.17", "Acts 17:24", "God does not dwell in temples made with hands"]],
  },
  3: {
    intro: "Solomon builds the temple on Mount Moriah, at the threshing floor of Ornan where God appeared to David. It is overlaid with gold and decorated with precious stones, with great cherubim in the most holy place, a blue, purple and crimson veil, and two pillars named Jachin and Boaz.",
    v: [
      ["3:1", "Mount Moriah", "Where Abraham offered Isaac (Genesis 22:2) and where God stopped the plague (1 Chronicles 21)."],
      ["3:14", "The veil", "The veil, woven in blue, purple and crimson with cherubim, closed off the Most Holy Place. In the later temple such a curtain was torn in two when Jesus died (Matthew 27:51)."],
      ["3:17", "Jachin and Boaz", "\"He establishes\" and \"In Him is strength.\""],
    ],
    bg: [["Mount Moriah", "Solomon built the temple \"on Mount Moriah\" (3:1). That links it with Genesis 22:2, where Abraham was told to offer Isaac \"in the land of Moriah,\" and God provided a ram instead. The place of sacrifice became the place of worship.", "strong", ["selman", "williamson"]]],
    refs: [["GEN.22", "Genesis 22:2, 14", "On the mount of the LORD it will be provided"], ["MAT.27", "Matthew 27:51", "The veil torn"]],
  },
  4: {
    intro: "The furnishings of the temple are made: a bronze altar, the great bronze sea resting on twelve bronze oxen, ten basins, ten gold lampstands, ten tables, and all the vessels.",
    v: [
      ["4:2-4", "The sea on twelve oxen", "Three facing each direction, perhaps picturing the tribes."],
      ["4:6", "For the priests to wash in", "Ten basins were for rinsing the offerings, and the great bronze \"sea\" was for the priests to wash in. Those who served God had to be clean."],
      ["4:7", "Ten lampstands", "The tabernacle had one golden lampstand; Solomon's temple had ten. God's house was to be filled with light."],
      ["4:17", "In the plain of the Jordan the king cast them, in the clay ground", "The thick clay near Succoth was good for making casting molds."],
    ],
    bg: [["How much did the Sea hold?", "The bronze Sea was about 15 feet across. 2 Chronicles 4:5 says it held 3,000 baths, while 1 Kings 7:26 says 2,000. Some suggest one gives its full capacity and the other its usual level; others think a number was miscopied. It held many thousands of gallons either way.", "debated", ["selman", "thompson"]]],
    refs: [["1KI.7", "1 Kings 7:23-51", "The furnishings"]],
  },
  5: {
    intro: "The ark is brought into the most holy place. As the priests and Levite musicians praise God together, with 120 trumpeters, singing \"He indeed is good, for His lovingkindness is everlasting,\" the house is filled with a cloud, the glory of the LORD.",
    v: [
      ["5:10", "Nothing in the ark except the two tablets", "By Solomon's day nothing was in the ark except the two stone tablets of the covenant Moses received at Horeb. God's covenant word was at the center of His house."],
      ["5:13", "In unison", "The trumpeters and singers joined \"as one, to make one sound\" in praising God. Unity in worship came just before God's glory filled the house."],
      ["5:14", "The glory of the LORD filled the house of God", "The cloud of God's glory filled the temple so that the priests could not stand to minister. God answered His people's worship with His presence."],
    ],
    bg: [["The poles of the ark", "The ark's carrying poles were so long that their ends could be seen from the holy place, \"and they are there to this day\" (5:9). They stayed in place because the ark was never to be carried by any other way (Exodus 25:15).", "good", ["selman", "thompson"]]],
    refs: [["1KI.8", "1 Kings 8:1-11", "The same scene"], ["EXO.40", "Exodus 40:34-35", "Glory fills the tabernacle"]],
  },
  6: {
    intro: "Solomon blesses the people and prays the dedication prayer, standing on a bronze platform and then kneeling with hands spread toward heaven. He asks God to hear prayers made toward this house: in sin, defeat, drought, plague and exile, and the prayers of foreigners too.",
    v: [
      ["6:13", "He knelt on his knees", "Solomon stood on a bronze platform before the whole assembly, then knelt down and spread out his hands toward heaven. The king humbles himself before God."],
      ["6:18", "Will God indeed dwell with mankind on the earth?", "Fulfilled fully in Jesus, God with us (John 1:14)."],
      ["6:36-39", "If they return to You with all their heart", "Solomon foresees a day when the people sin and are carried off to a far land. Even then, if they turn back to God with all their heart, He will hear. Daniel prayed toward Jerusalem in exile in just this way (Daniel 6:10)."],
      ["6:41", "Arise, O LORD God, to Your resting place", "Solomon's prayer ends with words from Psalm 132:8-10, asking God to come to His resting place and clothe His priests with salvation."],
    ],
    bg: [["No one who does not sin", "Solomon's prayer is realistic: \"When they sin against You (for there is no man who does not sin)\" (6:36). He asks God to hear and forgive when His people turn back, even from a far land.", "good", ["selman", "williamson"]]],
    refs: [["1KI.8", "1 Kings 8:22-53", "The same prayer"], ["PSA.132", "Psalm 132:8-10", "Arise, O LORD"], ["JHN.1", "John 1:14", "The Word dwelt among us"]],
  },
  7: {
    intro: "Fire falls from heaven to consume the offerings, and the glory of the LORD fills the house. The people bow and praise: \"He is good; His lovingkindness is everlasting.\" Later God appears to Solomon at night: \"If My people who are called by My name humble themselves and pray and seek My face and turn from their wicked ways, then I will hear from heaven, will forgive their sin and will heal their land.\"",
    v: [
      ["7:1", "Fire came down from heaven", "God accepts the temple, as at the tabernacle (Leviticus 9:24)."],
      ["7:14", "If My people... humble themselves", "One of the best-known promises in the Old Testament, given to Israel about the temple and the land. Christians apply its call to humility, prayer and repentance today."],
      ["7:16", "My eyes and My heart will be there perpetually", "God chose this house and promised that His eyes and His heart would be there always. He commits Himself to His people's place of worship."],
    ],
    bg: [["\"If My people\"", "God answered Solomon's prayer at night: \"If My people who are called by My name humble themselves and pray and seek My face and turn from their wicked ways, then I will hear from heaven, will forgive their sin and will heal their land\" (7:14). It sums up the message of Chronicles.", "good", ["selman", "thompson"]]],
    refs: [["LEV.9", "Leviticus 9:24", "Fire from the LORD"], ["1KI.9", "1 Kings 9:1-9", "God's answer"], ["JAS.4", "James 4:10", "Humble yourselves before the Lord"]],
  },
  8: {
    intro: "Solomon builds cities, sets the foreign peoples to forced labor, and moves Pharaoh's daughter out of the City of David, which is holy because of the ark. He offers sacrifices on the feast days as Moses commanded, and organizes priests and Levites as David directed.",
    v: [
      ["8:11", "The places are holy", "Solomon moved Pharaoh's daughter out of the City of David because the places where the ark had been were holy. He respected God's holiness in practical ways."],
      ["8:13", "According to the commandment of Moses", "Sacrifices were offered on the days the Law of Moses set: Sabbaths, new moons, and the three yearly feasts of Unleavened Bread, Weeks and Booths."],
      ["8:16", "The house of the LORD was completed", "From the laying of the foundation to the finishing, all Solomon's work on the house of the LORD was completed."],
    ],
    bg: [["Ships to Ophir", "Solomon built ships at Ezion-geber on the Gulf of Aqaba, and Hiram's sailors brought back gold from Ophir (8:17-18). No one is sure where Ophir was; suggestions include Arabia, East Africa and India. A pottery piece found near Tel Aviv mentions \"gold of Ophir.\"", "strong", ["selman", "kitchen"]]],
    refs: [["1KI.9", "1 Kings 9:10-28", "Solomon's projects"]],
  },
  9: {
    intro: "The queen of Sheba visits and is overwhelmed by Solomon's wisdom and his worship: \"Blessed be the LORD your God who delighted in you.\" Solomon's great wealth and fame are described. He reigns forty years and dies.",
    v: [
      ["9:6", "The half of the greatness of your wisdom was not told me", "The queen of Sheba says she had not been told even half of Solomon's wisdom. The reality was greater than the reports. Jesus says one greater than Solomon has come (Matthew 12:42)."],
      ["9:8", "To set you on His throne as king for the LORD your God", "Chronicles stresses that it is God's throne."],
      ["9:23", "To hear his wisdom which God had put in his heart", "Kings came from all over the earth to hear the wisdom that God had put in Solomon's heart. His wisdom was God's gift, not his own achievement."],
    ],
    bg: [["The queen of Sheba", "Sheba was a kingdom in southern Arabia, in today's Yemen, rich from the trade in frankincense and spices carried north by camel. Its queen brought \"spices in great abundance\" (9:9) and praised Solomon's God.", "good", ["selman", "kitchen"]]],
    refs: [["1KI.10", "1 Kings 10", "The same visit"], ["MAT.12", "Matthew 12:42", "Something greater than Solomon"]],
  },
  10: {
    intro: "Rehoboam refuses the elders' counsel to lighten the people's load, takes his young friends' harsh advice, and the northern tribes rebel under Jeroboam. The kingdom splits, \"a turn of events from God.\"",
    v: [
      ["10:4", "Your father made our yoke hard", "Solomon's great building projects had cost the people dearly."],
      ["10:7", "If you will be kind to this people", "The older advisers told Rehoboam that if he was kind and spoke good words to the people, they would serve him forever. It was wise advice that he ignored."],
      ["10:15", "A turn of events from God", "Rehoboam's foolish choice was also \"a turn of events from God,\" fulfilling what the prophet Ahijah had said (1 Kings 11:29-39)."],
      ["10:16", "Every man to your tents, O Israel", "\"Every man to your tents, O Israel!\" The northern tribes walk away from David's family, and the kingdom divides in two."],
      ["10:18", "They stoned Hadoram", "Rehoboam sends the very man in charge of forced labor, and the people stone him."],
    ],
    bg: [["Shechem", "Rehoboam went to Shechem to be made king. It was the old heart of the northern tribes, where Joshua had renewed the covenant (Joshua 24). Choosing harsh words there cost him ten tribes.", "good", ["selman", "thompson"]]],
    refs: [["PRO.15", "Proverbs 15:1", "A harsh word stirs up anger"], ["1KI.12", "1 Kings 12:1-20", "The same events"]],
  },
  11: {
    intro: "God forbids Rehoboam to fight the north. Rehoboam fortifies Judah's cities. Priests and Levites, and all who set their hearts to seek the LORD, leave the north and come to Judah, strengthening the kingdom for three years.",
    v: [
      ["11:4", "You shall not fight against your relatives", "Through the prophet Shemaiah, God tells Rehoboam not to fight his own relatives in the north. This time Rehoboam listens."],
      ["11:16", "Those who set their hearts on seeking the LORD", "Priests, Levites and others who set their hearts on seeking the LORD left the north and came to Jerusalem to worship. Faithfulness cost them their homes."],
      ["11:17", "They walked in the way of David and Solomon for three years", "For three years Judah walked in the ways of David and Solomon and grew strong. It was a good beginning."],
    ],
    bg: [["Rehoboam's fortress cities", "Rehoboam fortified fifteen cities in Judah, such as Bethlehem, Lachish and Hebron, stocking them with food, oil, wine, shields and spears (11:5-12). Most guarded the roads from the south and west, the way Egypt's army would come.", "good", ["selman", "kitchen"]]],
    refs: [["1KI.12", "1 Kings 12:21-24", "Do not fight"]],
  },
  12: {
    intro: "Once strong, Rehoboam forsakes God's law, and Shishak of Egypt invades. The prophet Shemaiah says, \"You have forsaken Me, so I have forsaken you.\" The leaders humble themselves, and God grants some deliverance, but Shishak takes the temple treasures.",
    v: [
      ["12:1", "When the kingdom was established and strong", "Once Rehoboam's kingdom was strong, he and all Israel abandoned God's law. Success can make us forget God (Deuteronomy 8:11-14)."],
      ["12:6-7", "They humbled themselves", "When King Shishak of Egypt invaded, the leaders humbled themselves and said, \"The LORD is righteous.\" So God said, \"I will not destroy them.\" Shishak's own list of conquered towns is carved on a temple wall at Karnak in Egypt."],
      ["12:8", "That they may learn the difference", "Between serving God and serving earthly kings."],
    ],
    bg: [["Shishak's campaign", "Pharaoh Sheshonq I listed towns he captured in Canaan on the wall of the Karnak temple in Egypt, about 925 BC.", "strong", ["kitchen"]]],
    refs: [["1KI.14", "1 Kings 14:25-28", "Shishak's invasion"]],
  },
  13: {
    intro: "Abijah of Judah faces Jeroboam's army, twice as large, and calls out from Mount Zemaraim: Judah has the LORD, His priests and His temple. Ambushed from behind, Judah cries to the LORD, the priests blow trumpets, and God routs Israel.",
    v: [
      ["13:5", "By a covenant of salt", "A lasting covenant. Salt, which preserves, stood for permanence (Numbers 18:19)."],
      ["13:12", "God is with us at our head", "King Abijah warns the north: God is with Judah at their head, with His priests and trumpets. \"Do not fight against the LORD.\""],
      ["13:14", "They cried to the LORD", "Surrounded front and back, Judah cried out to the LORD and the priests blew the trumpets. In crisis, they prayed."],
      ["13:18", "Because they trusted in the LORD", "Judah won \"because they trusted in the LORD, the God of their fathers.\" That was the secret of their victory."],
    ],
    bg: [["Two views of one king", "1 Kings 15:3 says Abijam (Abijah) \"walked in all the sins of his father.\" Chronicles does not deny it, but shows the one day he trusted God and God answered. Both are true: a flawed king can still call on the LORD and be heard.", "good", ["selman", "thompson"]]],
    refs: [["NUM.18", "Numbers 18:19", "An everlasting covenant of salt"], ["1KI.15", "1 Kings 15:1-8", "Abijam's reign"]],
  },
  14: {
    intro: "Asa does good: he removes foreign altars and idols and commands Judah to seek the LORD. When Zerah the Cushite attacks with a vast army, Asa prays, \"LORD, there is no one besides You to help in the battle between the powerful and those who have no strength,\" and God gives victory.",
    v: [
      ["14:4", "Seek the LORD God of their fathers", "King Asa told Judah to seek the LORD and obey His law. \"Seek\" is one of the key words in Chronicles."],
      ["14:7", "Because we have sought the LORD", "\"Because we have sought the LORD our God, He has given us rest on every side.\" Seeking God and enjoying peace go together in Chronicles."],
      ["14:11", "In Your name we have come", "Facing a huge army, Asa prays, \"Help us, O LORD our God, for we trust in You, and in Your name have come.\" It is a great prayer for anyone who feels weak."],
    ],
    bg: [["Zerah the Cushite", "Zerah, from Cush (the region of Ethiopia and Sudan), came against Judah with a huge army and three hundred chariots (14:9). Asa prayed, \"Help us, O LORD our God, for we trust in You\" (14:11), and Judah won.", "good", ["selman", "thompson"]]],
    refs: [["1KI.15", "1 Kings 15:9-15", "Asa's reign"], ["PSA.20", "Psalm 20:7", "We will boast in the name of the LORD"]],
  },
  15: {
    intro: "The Spirit of God comes on the prophet Azariah, who tells Asa: \"The LORD is with you when you are with Him. If you seek Him, He will let you find Him.\" Asa takes courage, removes idols, repairs the altar, and leads the people in a covenant to seek God with all their heart. He even removes his grandmother as queen mother for her idol.",
    v: [
      ["15:2", "The LORD is with you when you are with Him", "The prophet Azariah says, \"The LORD is with you when you are with Him. If you seek Him, He will let you find Him.\" It sums up the message of Chronicles."],
      ["15:7", "Be strong and do not lose courage", "\"Be strong and do not lose courage, for there is reward for your work.\" Paul gives the same encouragement in 1 Corinthians 15:58."],
      ["15:15", "They had sought Him earnestly", "The people sought God with their whole desire, and He let them find Him and gave them rest."],
    ],
    bg: [["Removing the queen mother", "Asa removed his grandmother Maacah from her position as queen mother because she had made a horrid image as an Asherah, and he burned it (15:16). His faithfulness reached even into his own family.", "good", ["selman", "williamson"]]],
    refs: [["JER.29", "Jeremiah 29:13", "You will seek Me and find Me"], ["HEB.11", "Hebrews 11:6", "He rewards those who seek Him"]],
  },
  16: {
    intro: "Late in his reign, threatened by Baasha of Israel, Asa pays the king of Aram for help instead of relying on God. The seer Hanani rebukes him: \"The eyes of the LORD move to and fro throughout the earth that He may strongly support those whose heart is completely His.\" Asa jails the prophet and, when ill, seeks only physicians, not the LORD.",
    v: [
      ["16:7", "You relied on the king of Aram", "Late in his reign Asa paid the king of Aram for help instead of trusting God, a sad change from his prayer in 14:11. The prophet Hanani reminds him that God's eyes look for hearts fully His (16:9)."],
      ["16:9", "The eyes of the LORD move to and fro", "God looks for hearts fully devoted to Him."],
      ["16:12", "He did not seek the LORD, but the physicians", "Medicine is good; leaving God out is the problem."],
    ],
    bg: [["Asa's illness", "In his old age Asa had a severe disease in his feet, \"yet even in his disease he did not seek the LORD, but the physicians\" (16:12). The point is not that doctors are wrong, but that Asa had stopped trusting God.", "good", ["selman", "thompson"]]],
    refs: [["1KI.15", "1 Kings 15:16-24", "The war with Baasha"], ["PSA.33", "Psalm 33:18", "The eye of the LORD is on those who fear Him"]],
  },
  17: {
    intro: "Jehoshaphat walks in the ways of David and seeks God. He sends officials, Levites and priests through Judah's cities with the book of the law to teach the people. The fear of the LORD falls on the surrounding nations, and Judah grows strong.",
    v: [
      ["17:6", "He took great pride in the ways of the LORD", "Literally \"his heart was lifted up\" in God's ways."],
      ["17:9", "They taught in Judah, having the book of the law", "Jehoshaphat sent officials, Levites and priests through the towns of Judah with the book of the law to teach the people. It was a traveling Bible school."],
      ["17:10", "The dread of the LORD was on all the kingdoms", "The fear of the LORD fell on the surrounding kingdoms, so they made no war against Jehoshaphat. God protected His faithful king."],
    ],
    bg: [["\"The LORD judges\"", "Jehoshaphat's name means \"the LORD judges.\" He sought God, removed high places, and sent teachers through Judah with the book of the law (17:6-9). His reign shows a king living up to his name.", "good", ["selman", "williamson"]]],
    refs: [["DEU.6", "Deuteronomy 6:6-7", "Teach them diligently"], ["NEH.8", "Nehemiah 8:7-8", "They read and explained"]],
  },
  18: {
    intro: "Jehoshaphat allies with Ahab of Israel by marriage and agrees to fight at Ramoth-gilead. Ahab's 400 prophets promise victory; the prophet Micaiah foresees disaster. In battle Jehoshaphat cries out and God helps him, but Ahab is killed by a random arrow.",
    v: [
      ["18:4", "Inquire first for the word of the LORD", "Before going to war with King Ahab, Jehoshaphat asks first for the word of the LORD. His instinct is right, even though he goes anyway."],
      ["18:13", "What my God says, that I will speak", "\"As the LORD lives, what my God says, that I will speak.\" The prophet Micaiah stands alone against four hundred prophets."],
      ["18:31", "Jehoshaphat cried out, and the LORD helped him", "When the enemy chariots surrounded him, Jehoshaphat cried out, \"and the LORD helped him.\" Chronicles adds these words to the account in 1 Kings 22:32."],
    ],
    bg: [["An arrow drawn at random", "Ahab disguised himself in battle so the enemy would aim at Jehoshaphat in his royal robes. But \"a certain man drew his bow at random\" and struck Ahab between the joints of his armor (18:33), just as Micaiah had warned.", "good", ["selman", "thompson"]]],
    refs: [["1KI.22", "1 Kings 22", "The same events"]],
  },
  19: {
    intro: "The seer Jehu rebukes Jehoshaphat: \"Should you help the wicked and love those who hate the LORD?\" Yet some good is found in him. Jehoshaphat appoints judges in every city: \"Consider what you are doing, for you do not judge for man but for the LORD.\"",
    v: [
      ["19:2", "Should you help the wicked?", "The prophet Jehu asks Jehoshaphat, \"Should you help the wicked and love those who hate the LORD?\" His alliance with Ahab was wrong."],
      ["19:3", "There is some good in you", "Yet God also tells him, \"There is some good in you,\" because he removed idols and set his heart to seek God. God notices the good as well as the bad."],
      ["19:7", "No injustice or partiality or bribery", "Jehoshaphat tells his judges to judge without injustice, favoritism or bribes, because the LORD our God has none of these."],
    ],
    bg: [["Judges in every city", "Jehoshaphat appointed judges in all the fortified cities of Judah and a high court in Jerusalem of Levites, priests and family heads (19:5, 8). \"Deal courageously, and the LORD be with the upright\" (19:11).", "good", ["selman", "williamson"]]],
    refs: [["DEU.16", "Deuteronomy 16:18-20", "Appoint judges"], ["2CO.6", "2 Corinthians 6:14", "Do not be bound together with unbelievers"]],
  },
  20: {
    intro: "A vast army of Moabites, Ammonites and others comes against Judah. Jehoshaphat proclaims a fast and prays: \"We are powerless before this great multitude; nor do we know what to do, but our eyes are on You.\" A Levite prophesies, \"The battle is not yours but God's.\" Singers go out in front of the army praising God, and the enemies destroy each other. Judah names the place the Valley of Beracah, \"blessing.\"",
    v: [
      ["20:12", "Our eyes are on You", "\"We do not know what to do, but our eyes are on You.\" Jehoshaphat's prayer joins honest helplessness with faith."],
      ["20:15", "The battle is not yours but God's", "As David said to Goliath (1 Samuel 17:47)."],
      ["20:21", "Give thanks to the LORD", "Singers went out ahead of the army praising, \"Give thanks to the LORD, for His lovingkindness is everlasting.\" Praise led the way into battle."],
      ["20:22", "When they began singing and praising", "When they began singing and praising, the LORD set ambushes, and the enemy armies turned on each other. Judah never had to fight."],
    ],
    bg: [["The Valley of Beracah", "After God routed the invading armies, Judah gathered in a valley and blessed the LORD, so it was named Beracah, \"blessing\" (20:26). The battle began in the wilderness of Tekoa, south of Bethlehem.", "good", ["selman", "thompson"]]],
    refs: [["1SA.17", "1 Samuel 17:47", "The battle is the LORD's"], ["PSA.123", "Psalm 123:1-2", "Our eyes look to the LORD"], ["EXO.14", "Exodus 14:13-14", "Stand by and see the salvation of the LORD"]],
  },
  21: {
    intro: "Jehoram, Jehoshaphat's son, kills his brothers and walks in the ways of Ahab's house, having married Ahab's daughter. Edom and Libnah revolt, a letter from Elijah announces judgment, and Jehoram dies of a painful disease, \"with no one's regret.\"",
    v: [
      ["21:6", "The daughter of Ahab was his wife", "A bad marriage alliance bears bitter fruit."],
      ["21:7", "Because of the covenant with David", "God still keeps a lamp for David's line."],
      ["21:20", "He departed with no one's regret", "King Jehoram \"departed with no one's regret\" and was not buried in the tombs of the kings. It is one of the saddest epitaphs in the Bible."],
    ],
    bg: [["A letter from Elijah", "A letter from the prophet Elijah came to King Jehoram, warning of judgment because he had led Judah into the ways of Ahab's house (21:12-15). It is the only mention of Elijah in Chronicles.", "good", ["selman", "japhet"]]],
    refs: [["2KI.8", "2 Kings 8:16-24", "Jehoram's reign"]],
  },
  22: {
    intro: "Ahaziah reigns one year, advised by his mother Athaliah to do evil, and is killed by Jehu. Athaliah then destroys the royal family to seize the throne, but Jehoshabeath hides baby Joash in the temple for six years.",
    v: [
      ["22:2", "His mother's name was Athaliah, the granddaughter of Omri", "Athaliah came from Ahab's royal house in the north, through a marriage alliance that pulled Judah toward Baal worship."],
      ["22:3", "His mother was his counselor to do wickedly", "King Ahaziah's mother, Athaliah, from Ahab's family, counseled him to do evil. The people closest to us shape us, for good or ill."],
      ["22:7", "His downfall was from God", "Ahaziah was visiting the king of Israel when Jehu's revolt swept them both away."],
      ["22:11", "Jehoshabeath hid him", "The line of David, and of the Messiah, survives by one courageous woman."],
    ],
    bg: [["The Tel Dan inscription", "Pieces of a stone found at Tel Dan in 1993-94 record an Aramean king, probably Hazael, boasting that he killed the king of Israel and a king of \"the house of David\" in these very years. The names on the broken stone are partly restored, and who really killed the two kings is debated (the Bible credits Jehu). But it is the earliest mention of David's royal line outside the Bible.", "strong", ["thompson", "kitchen"]]],
    refs: [["2KI.9", "2 Kings 9:27-29", "Ahaziah's death"], ["2KI.11", "2 Kings 11:1-3", "Joash hidden"]],
  },
  23: {
    intro: "In the seventh year, Jehoiada the priest gathers the Levites and leaders, crowns young Joash, and the people shout \"Long live the king!\" Athaliah is executed. Jehoiada makes a covenant that they will be the LORD's people, and the temple of Baal is torn down.",
    v: [
      ["23:3", "As the LORD has spoken concerning the sons of David", "Jehoiada the priest acts on God's promise that a son of David would reign. He crowns young Joash, the hidden heir."],
      ["23:16", "That they would be the LORD's people", "Jehoiada made a covenant that king and people would be the LORD's people. The nation renewed its commitment to God."],
      ["23:21", "The city was quiet", "After the wicked queen Athaliah was put to death, the people rejoiced and the city was quiet. Peace returned."],
    ],
    bg: [["A secret coronation", "Jehoiada the priest gathered Levites and commanders, placed guards around the temple, and brought out the young Joash, giving him the crown and \"the testimony,\" a copy of God's law (23:11). Athaliah shouted \"Treason!\" but her reign was over.", "good", ["selman", "williamson"]]],
    refs: [["2KI.11", "2 Kings 11:4-21", "Joash crowned"]],
  },
  24: {
    intro: "Joash does right all the days of Jehoiada the priest and restores the temple. But after Jehoiada dies, Joash listens to officials who turn to idols. When Jehoiada's son Zechariah warns them, Joash has him stoned in the temple court. Aram defeats Judah, and Joash's servants kill him.",
    v: [
      ["24:2", "All the days of Jehoiada", "Joash did right all the days of Jehoiada the priest. When his mentor died, Joash turned away (24:17-18). His faith had leaned on someone else's."],
      ["24:20", "Why do you transgress the commandments?", "The Spirit came on Zechariah, Jehoiada's son, and he warned the people. Joash had him stoned in the temple court. Jesus seems to refer to his death in Luke 11:51."],
      ["24:22", "May the LORD see and avenge!", "Jesus may refer to this Zechariah in Matthew 23:35 and Luke 11:51."],
    ],
    bg: [["From Abel to Zechariah", "Zechariah son of Jehoiada was stoned in the temple court (24:20-22). Jesus spoke of the blood of the righteous \"from the blood of Abel to the blood of Zechariah\" (Luke 11:51). Since Chronicles is the last book of the Hebrew Bible, that meant from the first murder in Scripture to the last.", "good", ["selman", "williamson"]]],
    refs: [["MAT.23", "Matthew 23:35", "From Abel to Zechariah"], ["2KI.12", "2 Kings 12", "Joash's reign"]],
  },
  25: {
    intro: "Amaziah does right, \"yet not with a whole heart.\" He sends home hired Israelite soldiers at a prophet's word, trusting God's promise to repay him, and defeats Edom. But then he worships Edom's gods, ignores a prophet, foolishly challenges Israel and is defeated.",
    v: [
      ["25:2", "Yet not with a whole heart", "Amaziah did what was right, \"yet not with a whole heart.\" Half-hearted faith soon gave way, and he later worshiped the gods of Edom (25:14)."],
      ["25:9", "The LORD has much more to give you than this", "Do the right thing even when it costs money."],
      ["25:14-15", "Why have you sought the gods of the people?", "Gods that could not save their own people."],
    ],
    bg: [["Hired soldiers sent home", "Amaziah hired 100,000 soldiers from Israel for a hundred talents of silver, but a man of God told him to send them home. \"The LORD has much more to give you than this\" (25:9). After winning, Amaziah foolishly worshiped the gods of Edom he had defeated (25:14).", "good", ["selman", "thompson"]]],
    refs: [["2KI.14", "2 Kings 14:1-20", "Amaziah's reign"]],
  },
  26: {
    intro: "Uzziah becomes king at sixteen and seeks God in the days of Zechariah, who taught him the fear of God. \"As long as he sought the LORD, God prospered him.\" He builds towers, engines of war and farms; he loved the soil. But when strong, he becomes proud and burns incense in the temple, and he is struck with leprosy until his death.",
    v: [
      ["26:5", "As long as he sought the LORD, God prospered him", "\"As long as he sought the LORD, God prospered him.\" The theme of Chronicles in one line."],
      ["26:10", "He loved the soil", "Uzziah built towers, dug many cisterns and had farmers and vinedressers, \"for he loved the soil.\" He was a king who loved farming."],
      ["26:16", "When he became strong, his heart was so proud", "When Uzziah became strong, his heart grew proud, and he went into the temple to burn incense. Pride after success brought his fall."],
      ["26:18", "It is not for you, Uzziah, to burn incense", "Azariah and eighty brave priests stood up to the king: burning incense was only for the priests, the sons of Aaron. Uzziah was struck with a skin disease for the rest of his life (26:19-21)."],
    ],
    bg: [["Uzziah's burial plaque", "Uzziah was buried in a field near the royal tombs because of his skin disease (26:23). A stone plaque from about the time of Jesus, found in Jerusalem, reads in Aramaic: \"Here were brought the bones of Uzziah, king of Judah. Do not open.\"", "strong", ["selman", "kitchen"]]],
    refs: [["ISA.6", "Isaiah 6:1", "In the year of King Uzziah's death"], ["PRO.16", "Proverbs 16:18", "Pride goes before destruction"]],
  },
  27: {
    intro: "Jotham reigns sixteen years and does right. He builds the upper gate of the temple and defeats the Ammonites. \"Jotham became mighty because he ordered his ways before the LORD his God.\"",
    v: [
      ["27:2", "He did not enter the temple of the LORD", "Jotham did right as his father had, but he did not go into the temple to burn incense. He learned from his father's mistake."],
      ["27:3", "He built the upper gate of the house of the LORD", "Jotham strengthened the temple and the city walls on the hill of Ophel."],
      ["27:5", "The Ammonites gave him a hundred talents of silver", "Tribute for three years: a sign of God's blessing on a faithful king."],
      ["27:6", "He ordered his ways before the LORD", "Jotham became mighty \"because he ordered his ways before the LORD.\" Steady faithfulness bears fruit."],
    ],
    bg: [["Jotham's times", "Jotham first ruled alongside his father Uzziah, who had leprosy (2 Chronicles 26:21). Isaiah, Hosea and Micah were all preaching in his day (Isaiah 1:1). Assyria was rising under Tiglath-pileser III, and the people, the writer notes, \"still followed corrupt practices\" (27:2) even under a good king.", "good", ["selman", "thompson"]]],
    refs: [["ISA.1", "Isaiah 1:1", "Isaiah prophesied in Jotham's days"], ["2KI.15", "2 Kings 15:32-38", "Jotham's reign"]],
  },
  28: {
    intro: "Ahaz does evil, making idols for the Baals and burning his sons. Aram and Israel defeat Judah. Israel takes 200,000 captives, but the prophet Oded rebukes them, and they clothe, feed and return the captives to Jericho. Ahaz turns to Assyria and to Aram's gods, and closes the doors of the temple.",
    v: [
      ["28:9-11", "Oded", "When Israel carried off 200,000 people from Judah, the prophet Oded told them to send their relatives home. They clothed, fed and anointed the captives and brought them to Jericho (28:15), a scene some compare to the good Samaritan."],
      ["28:15", "They clothed all their naked", "A kindness that may lie behind Jesus' story of the good Samaritan, near Jericho."],
      ["28:22", "In the time of his distress he became yet more unfaithful", "Trouble hardens Ahaz instead of humbling him."],
    ],
    bg: [["Ahaz shuts the temple doors", "Ahaz sacrificed to the gods of Damascus, cut up the temple vessels and shut the doors of the house of the LORD (28:23-24). \"In the time of his distress this same King Ahaz became yet more unfaithful\" (28:22).", "good", ["selman", "williamson"]]],
    refs: [["LUK.10", "Luke 10:30-37", "The good Samaritan"], ["2KI.16", "2 Kings 16", "Ahaz's reign"], ["ISA.7", "Isaiah 7", "Isaiah and Ahaz"]],
  },
  29: {
    intro: "In his very first month, Hezekiah opens the temple doors and repairs them. He gathers the priests and Levites to cleanse the temple, which takes sixteen days. Then sin offerings and burnt offerings are made for all Israel, with singing and trumpets, and everyone rejoices \"because the thing came about suddenly.\"",
    v: [
      ["29:3", "In the first year, in the first month", "In the first month of his first year, Hezekiah opened the temple doors that his father Ahaz had shut (28:24). He did not delay in turning back to God."],
      ["29:11", "My sons, do not be negligent now", "\"My sons, do not be negligent now, for the LORD has chosen you.\" Hezekiah reminds the Levites that serving God is a high calling."],
      ["29:27", "The song to the LORD also began", "When the offering began, the music began."],
      ["29:36", "God had prepared for the people", "Hezekiah and the people rejoiced over what God had prepared for them, because it had all come about so quickly."],
    ],
    bg: [["Sixteen days of cleaning", "The priests and Levites spent sixteen days cleansing the temple, carrying out all the uncleanness to the Kidron Valley (29:16-17). Then Hezekiah restored the sacrifices and the music of David (29:25-30).", "good", ["selman", "thompson"]]],
    refs: [["2KI.18", "2 Kings 18:1-7", "Hezekiah's faith"]],
  },
  30: {
    intro: "Hezekiah invites all Israel, including the remaining northern tribes, to Jerusalem for Passover. Many mock the messengers, but some humble themselves and come. Many are not ceremonially clean, and Hezekiah prays, \"May the good LORD pardon everyone who prepares his heart to seek God.\" God hears and heals, and there is great joy, like nothing since Solomon.",
    v: [
      ["30:9", "The LORD your God is gracious and compassionate", "\"He will not turn His face away from you if you return to Him.\""],
      ["30:10", "They laughed them to scorn", "Hezekiah's messengers invited the northern tribes to the Passover, and many laughed and mocked them. Yet some humbled themselves and came (30:11)."],
      ["30:18-19", "Who prepares his heart to seek God", "Many who came had not been purified by the rules. Hezekiah prayed for everyone who prepared his heart to seek God, and the LORD heard and healed the people (30:20). The heart mattered more than the ritual."],
      ["30:26", "There was great joy in Jerusalem", "The first united Passover since the split."],
    ],
    bg: [["An invitation to the north", "The northern kingdom had fallen to Assyria in 722 BC. Hezekiah sent letters from Beersheba to Dan inviting the survivors to Jerusalem for the Passover: \"Return to the LORD... that He may return to those of you who escaped\" (30:6).", "good", ["selman", "williamson"]]],
    refs: [["EXO.12", "Exodus 12", "The first Passover"], ["1SA.16", "1 Samuel 16:7", "The LORD looks at the heart"]],
  },
  31: {
    intro: "After Passover the people go out and destroy idols throughout the land. Hezekiah reorganizes the priests and Levites, and the people give their tithes and firstfruits so generously that heaps pile up for four months. \"He did it with all his heart and prospered.\"",
    v: [
      ["31:5", "In abundance", "After worship was renewed, the people brought firstfruits and tithes in abundance. Heaps piled up for four months (31:7)."],
      ["31:10", "We have had enough to eat with plenty left over", "The chief priest reports, \"We have had enough to eat with plenty left over, for the LORD has blessed His people.\""],
      ["31:21", "He did it with all his heart", "In everything he began for God's house, the law and the commandments, Hezekiah sought God and worked with all his heart, and he prospered."],
    ],
    bg: [["Heaps of gifts", "The people brought so much grain, oil, honey and tithes that it lay in heaps from the third month to the seventh (31:5-7). Hezekiah had storerooms prepared in the temple to hold it all (31:11).", "good", ["selman", "thompson"]]],
    refs: [["MAL.3", "Malachi 3:10", "Bring the whole tithe"], ["2CO.9", "2 Corinthians 9:6-8", "God is able to make all grace abound"]],
  },
  32: {
    intro: "Sennacherib of Assyria invades. Hezekiah stops up the springs outside the city, repairs the walls, and encourages the people: \"With him is only an arm of flesh, but with us is the LORD our God to help us and to fight our battles.\" After Hezekiah and Isaiah pray, an angel destroys the Assyrian army. Later Hezekiah becomes proud, then humbles himself.",
    v: [
      ["32:7-8", "An arm of flesh", "The difference between human and divine strength."],
      ["32:20", "Hezekiah and Isaiah prayed", "When the Assyrian king mocked God, King Hezekiah and the prophet Isaiah prayed and cried out to heaven. God sent an angel who destroyed the Assyrian army (32:21)."],
      ["32:30", "Hezekiah stopped the upper outlet of the waters of Gihon", "Hezekiah blocked the upper spring of Gihon and brought its water by tunnel to the west side of the city. His tunnel, about a third of a mile long, can still be walked today, and an inscription carved by its diggers was found there in 1880."],
      ["32:31", "God left him alone only to test him", "When envoys came from Babylon, God left Hezekiah to himself to test him, so that all that was in his heart would be known."],
    ],
    bg: [["Hezekiah's tunnel", "A 1,750-foot tunnel carved through rock brings Gihon spring water into Jerusalem. An inscription found inside in 1880 describes the moment the two digging teams met.", "strong", ["kitchen"]]],
    refs: [["2KI.18", "2 Kings 18-19", "Sennacherib's invasion"], ["ISA.36", "Isaiah 36-37", "The same events"], ["JER.17", "Jeremiah 17:5-8", "Cursed is the man who trusts in mankind"]],
  },
  33: {
    intro: "Manasseh does more evil than the nations God destroyed. The Assyrians capture him with hooks and take him to Babylon. In his distress he humbles himself greatly and prays, and God hears and brings him back. \"Then Manasseh knew that the LORD was God.\" He removes the idols, but the people keep using the high places. His son Amon does evil and is killed.",
    v: [
      ["33:9", "More evil than the nations", "Manasseh led Judah to do more evil than the nations God had driven out of the land. It was Judah at its worst."],
      ["33:12-13", "He humbled himself greatly", "Chronicles tells Manasseh's repentance; no one is beyond God's mercy."],
      ["33:13", "Then Manasseh knew that the LORD was God", "Taken to Babylon with hooks and bronze chains, Manasseh humbled himself and prayed, and God brought him home. \"Then Manasseh knew that the LORD was God.\" He learned the hard way, but he learned."],
      ["33:23", "Amon did not humble himself", "Amon did not humble himself as his father Manasseh had. He reigned only two years before his own servants killed him."],
    ],
    why: "2 Kings tells only Manasseh's evil, but Chronicles also tells his capture, repentance and restoration. Scholars weigh this difference.",
    views: [
      ["Both are true", "Many hold that Chronicles adds a real episode Kings left out, noting that Assyrian records list \"Manasseh king of Judah\" as a vassal, so a summons to Babylon fits.", ["thompson", "selman", "kitchen"]],
      ["Chronicles' theme of repentance", "Others think the Chronicler shaped the account to show his main theme, that God forgives those who humble themselves, while drawing on older sources.", ["japhet", "williamson"]],
    ],
    common: "All agree on the message: God hears even the worst sinner who humbles himself, though the damage done to others can last.",
    bg: [["Manasseh's prayer", "Chronicles alone tells that Manasseh, taken captive, humbled himself and prayed, and God restored him (33:12-13). His prayer was \"written in the records of the Hozai\" (33:19). A later writing called the Prayer of Manasseh, included in some Bibles' Apocrypha, imagines its words.", "good", ["selman", "japhet"]]],
    refs: [["2KI.21", "2 Kings 21", "Manasseh's reign"], ["LUK.15", "Luke 15:17-24", "The prodigal comes home"], ["1JN.1", "1 John 1:9", "If we confess, He is faithful to forgive"]],
  },
  34: {
    intro: "Josiah begins to seek God at sixteen and starts removing idols at twenty. While repairing the temple, Hilkiah finds the book of the law. Josiah tears his clothes, the prophetess Huldah speaks for God, and Josiah gathers all the people to make a covenant to follow the LORD with all their heart.",
    v: [
      ["34:3", "While he was still a youth", "At sixteen, in the eighth year of his reign, Josiah began to seek God. At twenty he began clearing idols from the land."],
      ["34:14", "The book of the law of the LORD given by Moses", "While the temple was being repaired, Hilkiah the priest found the book of the law given by Moses. God's word was recovered after years of neglect."],
      ["34:27", "Because your heart was tender", "Through the prophetess Huldah, God tells Josiah that because his heart was tender and he humbled himself, God has heard him."],
      ["34:31", "With all his heart and all his soul", "Josiah stood in his place and made a covenant to follow the LORD with all his heart and soul, and he led the people to do the same."],
    ],
    bg: [["Huldah the prophetess", "When the book of the law was found, Josiah's officials went to Huldah the prophetess, who lived in the Second Quarter of Jerusalem (34:22). She gave God's word plainly, and the king believed it.", "good", ["selman", "williamson"]]],
    refs: [["2KI.22", "2 Kings 22-23", "Josiah's reforms"], ["1TI.4", "1 Timothy 4:12", "Let no one look down on your youthfulness"]],
  },
  35: {
    intro: "Josiah keeps a great Passover, with no Passover like it since Samuel. Later he goes out against Pharaoh Neco, who warns him not to interfere. Josiah disguises himself, fights at Megiddo, is wounded by archers and dies. All Judah mourns, and Jeremiah writes a lament.",
    v: [
      ["35:3", "Serve the LORD your God and His people Israel", "Josiah tells the Levites to put the ark in the temple. They no longer need to carry it, so now they should serve the LORD and His people."],
      ["35:18", "There had not been celebrated a Passover like it", "No Passover like it had been kept since the days of Samuel the prophet. It was a high point of worship."],
      ["35:22", "He did not listen to the words of Neco from the mouth of God", "Pharaoh Neco warned Josiah to stay out of his way, and Chronicles says the warning was from God. Josiah would not listen and died in battle at Megiddo in 609 BC. Even a good king can fail to listen."],
    ],
    bg: [["Jeremiah mourns Josiah", "When Josiah died at Megiddo in 609 BC, \"Jeremiah chanted a lament for Josiah,\" and singers remembered him in their laments for generations (35:25). The death of Judah's last good king was a national grief.", "good", ["selman", "thompson"]]],
    refs: [["2KI.23", "2 Kings 23:21-30", "Passover and Josiah's death"], ["ZEC.12", "Zechariah 12:11", "The mourning in the plain of Megiddo"]],
  },
  36: {
    intro: "Judah's last kings fall to Egypt and Babylon. \"The LORD sent word to them again and again by His messengers, because He had compassion on His people,\" but they mocked the prophets until there was no remedy. Babylon burns the temple and takes the survivors into exile \"to fulfill the word of the LORD by the mouth of Jeremiah,\" seventy years. The book ends with Cyrus of Persia's decree: let God's people go up and build His house.",
    v: [
      ["36:15", "Again and again", "God sent His messengers again and again, because He had compassion on His people and His dwelling place."],
      ["36:16", "Until there was no remedy", "They mocked God's messengers and scorned His words until there was no remedy. Refusing God's word again and again has an end point."],
      ["36:21", "Until the land had enjoyed its sabbaths", "The land lay desolate to make up for the sabbath years Israel had not kept (Leviticus 26:34-35), seventy years as Jeremiah said (Jeremiah 25:11). The book then ends with hope, as Cyrus lets the people go home (36:22-23)."],
      ["36:23", "Let him go up!", "The Hebrew Bible's last book in Jewish order ends with hope and a call to return."],
    ],
    bg: [["The Cyrus Cylinder", "A clay cylinder from Cyrus of Persia, found at Babylon in 1879, records his policy of returning conquered peoples to their homelands and restoring their temples, matching the spirit of his decree.", "strong", ["kitchen"]]],
    refs: [["EZR.1", "Ezra 1:1-4", "The decree repeated"], ["JER.25", "Jeremiah 25:11-12", "Seventy years"], ["ISA.44", "Isaiah 44:28", "Cyrus, My shepherd"]],
  },
});
