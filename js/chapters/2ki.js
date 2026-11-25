// 2 Kings chapter notes.
import { makeBook } from "./make.js";

const sources = {
  house: "Paul R. House, 1, 2 Kings, New American Commentary 8 (Broadman & Holman, 1995).",
  provan: "Iain W. Provan, 1 and 2 Kings, New International Biblical Commentary (Hendrickson, 1995).",
  wiseman: "Donald J. Wiseman, 1 and 2 Kings, Tyndale Old Testament Commentaries (InterVarsity Press, 1993).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  anet: "James B. Pritchard, ed., Ancient Near Eastern Texts Relating to the Old Testament, 3rd ed. (Princeton University Press, 1969).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["house", "provan"] }, {
  1: {
    intro: "King Ahaziah of Israel falls through a lattice and sends to ask Baal-zebub, god of Ekron, whether he will recover. Elijah meets the messengers: \"Is it because there is no God in Israel?\" Fire falls on two companies of soldiers sent to seize Elijah; the third captain begs for mercy. Ahaziah dies as Elijah said.",
    v: [
      ["1:3", "Is there no God in Israel?", "The king seeks a foreign god instead of the LORD."],
      ["1:8", "A hairy man with a leather belt", "John the Baptist dressed like Elijah (Mark 1:6)."],
      ["1:13", "Let my life be precious in your sight", "After fire fell on two captains and their men, a third captain knelt before Elijah and begged: let my life be precious in your sight. His humility received mercy."],
    ],
    refs: [["LUK.9", "Luke 9:54-56", "Shall we command fire to come down?"], ["MRK.1", "Mark 1:6", "John wore a leather belt"]],
  },
  2: {
    intro: "Elijah and Elisha walk from Gilgal to Bethel to Jericho to the Jordan. Elijah strikes the river with his cloak and they cross on dry ground. Elisha asks for a double portion of Elijah's spirit. A chariot of fire appears, and Elijah goes up by a whirlwind into heaven. Elisha takes up the cloak, parts the Jordan, heals Jericho's water, and is mocked by youths at Bethel.",
    v: [
      ["2:2", "I will not leave you", "Three times Elijah told Elisha to stay behind, and three times Elisha answered: as the LORD lives, I will not leave you."],
      ["2:9", "A double portion of your spirit", "The firstborn's share: Elisha asks to be Elijah's true heir."],
      ["2:11", "Elijah went up by a whirlwind", "Like Enoch, he did not die. He appears with Jesus at the transfiguration (Matthew 17:3)."],
      ["2:14", "Where is the LORD, the God of Elijah?", "Elisha struck the Jordan with Elijah's cloak and asked: where is the LORD, the God of Elijah? The water parted. The power was God's, not the cloak's."],
    ],
    refs: [["MAT.17", "Matthew 17:1-3", "Moses and Elijah"], ["MAL.4", "Malachi 4:5", "I am going to send you Elijah"], ["LUK.1", "Luke 1:17", "In the spirit and power of Elijah"]],
  },
  3: {
    intro: "Israel, Judah and Edom march against Moab, which had rebelled. In the desert they run out of water. Elisha, for Jehoshaphat's sake, tells them to dig ditches, and God fills them with water without wind or rain. The Moabites see the water red in the morning sun, think it blood, and attack in confusion.",
    v: [
      ["3:14", "Were it not for Jehoshaphat", "Elisha tells King Joram of Israel he would not even look at him, if it were not for his respect for Jehoshaphat, Judah's faithful king."],
      ["3:17", "You shall not see wind nor rain", "God promised water in the dry valley without wind or rain. The next morning the land was filled with water (3:20)."],
      ["3:27", "He offered his oldest son", "In desperation, the king of Moab sacrificed his oldest son on the city wall. Israel withdrew in horror."],
    ],
    bg: [["The Moabite Stone", "King Mesha of Moab set up a stone inscription (about 840 BC) boasting of his revolt against Israel, naming Omri and the LORD (YHWH). It is one of the most important finds for the Bible's history.", "strong", ["kitchen", "anet"]]],
    refs: [["2KI.1", "2 Kings 1:1", "Moab rebelled"]],
  },
  4: {
    intro: "Elisha's miracles of compassion: a prophet's widow fills borrowed jars with oil to pay her debts; a wealthy Shunammite woman builds Elisha a room, receives a son, and when the boy dies, Elisha raises him; poisonous stew is made safe; and twenty loaves feed a hundred men with some left over.",
    v: [
      ["4:6", "The oil stopped", "A poor widow poured her small jar of oil into every jar she could borrow. The oil stopped only when there were no empty jars left."],
      ["4:10", "A little walled upper chamber", "A woman of Shunem asked her husband to build a small upstairs room for Elisha with a bed, table, chair and lamp. Simple hospitality to God's servant."],
      ["4:26", "It is well", "Her son had just died, yet when asked if all was well, the Shunammite answered: it is well. She went straight to the man of God."],
      ["4:42-44", "They ate and had some left over", "Elisha fed a hundred men with twenty barley loaves, and there was some left over, as the LORD said. Jesus did far greater when He fed the crowds (John 6:9-13)."],
    ],
    refs: [["LUK.7", "Luke 7:11-16", "Jesus raises a widow's son"], ["JHN.6", "John 6:9-13", "Five barley loaves"], ["HEB.11", "Hebrews 11:35", "Women received back their dead"]],
  },
  5: {
    intro: "Naaman, commander of Aram's army, has leprosy. A captive Israelite girl tells of the prophet in Samaria. Elisha sends word to wash seven times in the Jordan. Naaman is angry, but his servants persuade him, and his flesh becomes like a child's. He confesses there is no God but Israel's. Elisha's servant Gehazi greedily takes gifts and is struck with leprosy.",
    v: [
      ["5:3", "I wish my master were with the prophet", "A young Israelite girl, taken captive and serving Naaman's wife, said: if only my master would see the prophet in Samaria. Her kindness and faith started it all."],
      ["5:11", "I thought he would surely come out", "Naaman was angry. He expected Elisha to come out, call on God and wave his hand. Pride almost kept him from being healed."],
      ["5:14", "Like the flesh of a little child", "Naaman dipped seven times in the Jordan, and his skin became like a young boy's. Jesus mentioned Naaman in Luke 4:27."],
      ["5:15", "No God in all the earth, but in Israel", "Naaman came back and confessed: now I know there is no God in all the earth except in Israel."],
    ],
    refs: [["LUK.4", "Luke 4:27", "None was cleansed but Naaman the Syrian"], ["LUK.17", "Luke 17:15-18", "The foreigner who returned to give thanks"]],
  },
  6: {
    intro: "An axe head floats. Elisha warns Israel's king of every Aramean ambush, so Aram sends an army to capture him. Elisha's servant panics, and Elisha prays, \"Open his eyes that he may see\": the hills are full of horses and chariots of fire. The Arameans are struck blind, led to Samaria, fed and sent home. Later, Samaria endures a terrible siege and famine.",
    v: [
      ["6:16", "Those who are with us are more", "Surrounded by Aramean troops, Elisha told his frightened servant: do not be afraid, those with us are more than those with them."],
      ["6:17", "Chariots of fire", "Elisha prayed, and God opened the servant's eyes. The hills were full of horses and chariots of fire around Elisha."],
      ["6:22", "Set bread and water before them", "Instead of killing the captured soldiers, Elisha told the king to give them bread and water and send them home. The raids stopped (6:23). Compare Romans 12:20."],
    ],
    refs: [["PSA.34", "Psalm 34:7", "The angel of the LORD encamps around those who fear Him"], ["ROM.12", "Romans 12:20", "If your enemy is hungry, feed him"], ["2CO.4", "2 Corinthians 4:18", "The things which are not seen"]],
  },
  7: {
    intro: "Elisha promises food will be cheap in Samaria the next day. An officer scoffs. Four lepers at the gate decide to surrender to Aram and find the camp empty: God had made the Arameans hear the sound of a great army and flee. The lepers say, \"This day is a day of good news,\" and tell the city. The scoffing officer is trampled at the gate.",
    v: [
      ["7:2", "If the LORD should make windows in heaven", "Elisha promised food would be cheap by the next day in starving Samaria. The king's officer scoffed: even if God opened windows in heaven, could this happen?"],
      ["7:6", "The Lord had caused them to hear a sound", "The Lord made the Aramean army hear the sound of chariots, horses and a great army. They fled, leaving everything behind. God won without a battle."],
      ["7:9", "We are not doing right", "\"This day is a day of good news.\" Good news must be shared."],
    ],
    refs: [["ROM.10", "Romans 10:15", "How beautiful are the feet of those who bring good news"]],
  },
  8: {
    intro: "The Shunammite woman returns after a famine, and the king restores her land as Gehazi is telling him her story. Elisha weeps as he foresees that Hazael will become king of Aram and harm Israel; Hazael murders Ben-hadad. In Judah, Jehoram and Ahaziah follow the ways of Ahab's house.",
    v: [
      ["8:5", "Just as he was relating", "Just as Gehazi was telling the king how Elisha raised the Shunammite's son, she walked in to ask for her land back. God's timing was perfect."],
      ["8:11-12", "The man of God wept", "Elisha stared at Hazael until he was ashamed, then wept, knowing the terrible harm Hazael would do to Israel as king of Aram."],
      ["8:19", "A lamp to him through his sons always", "God keeps David's line for His promise's sake."],
    ],
    refs: [["2SA.7", "2 Samuel 7:12-16", "The promise to David"]],
  },
  9: {
    intro: "Elisha sends a young prophet to anoint Jehu king of Israel with orders to destroy Ahab's house. Jehu drives \"furiously,\" kills King Joram of Israel and King Ahaziah of Judah, and has Jezebel thrown from a window. Dogs eat her body, as Elijah said.",
    v: [
      ["9:20", "He drives furiously", "The watchman on Jezreel's tower recognized Jehu from far away: he drives like a madman. Jehu's driving was famous."],
      ["9:26", "In this property", "Joram's body is thrown on Naboth's field."],
      ["9:36", "This is the word of the LORD", "Elijah's prophecy (1 Kings 21:23) comes true."],
    ],
    bg: [["Jehu on the Black Obelisk", "Assyria's Black Obelisk of Shalmaneser III (about 841 BC), now in the British Museum, shows \"Jehu son of Omri\" bowing and paying tribute. It may be the only surviving picture of an Israelite king.", "strong", ["kitchen", "anet"]]],
    refs: [["1KI.21", "1 Kings 21:21-24", "Elijah's word against Ahab's house"], ["HOS.1", "Hosea 1:4", "The bloodshed of Jezreel"]],
  },
  10: {
    intro: "Jehu has Ahab's seventy sons killed, then tricks the worshipers of Baal into gathering in their temple and destroys them all, tearing down the temple. Yet Jehu keeps Jeroboam's golden calves and \"was not careful to walk in the law of the LORD with all his heart.\"",
    v: [
      ["10:16", "Come with me and see my zeal for the LORD", "Jehu invited Jehonadab: come with me and see my zeal for the LORD. His zeal was real, but mixed with ambition and violence."],
      ["10:28", "Jehu eradicated Baal out of Israel", "Jehu wiped out Baal worship from Israel, a real reform."],
      ["10:31", "Not careful to walk with all his heart", "Yet Jehu was not careful to follow the LORD's law with all his heart. He kept Jeroboam's golden calves. His obedience was only partial."],
    ],
    refs: [["HOS.1", "Hosea 1:4", "God judges the bloodshed of Jezreel"]],
  },
  11: {
    intro: "When her son Ahaziah dies, Athaliah, Ahab's daughter, seizes Judah's throne and kills the royal family. But baby Joash is hidden in the temple for six years by his aunt Jehosheba. Then the priest Jehoiada crowns Joash king, and Athaliah is executed. A covenant is made, and the temple of Baal is torn down.",
    v: [
      ["11:2", "Jehosheba hid him", "One brave woman saves David's line, and the line of the Messiah."],
      ["11:12", "Long live the king!", "Seven-year-old Joash is crowned with the testimony (the law)."],
      ["11:17", "A covenant between the LORD and the king and the people", "After the wicked queen Athaliah was removed, the priest Jehoiada made a covenant between the LORD, the young king and the people that they would be the LORD's people."],
    ],
    refs: [["2CH.22", "2 Chronicles 22:10-12", "Joash hidden"], ["2SA.7", "2 Samuel 7:16", "Your throne shall be established forever"]],
  },
  12: {
    intro: "Joash does right as long as Jehoiada the priest instructs him. He repairs the temple using a chest with a hole in the lid for offerings, and the workmen are so honest no accounts are needed. Later he pays Hazael of Aram with the temple treasures, and his servants kill him.",
    v: [
      ["12:2", "All his days in which Jehoiada instructed him", "A good mentor matters. After Jehoiada died, Joash turned away (2 Chronicles 24:17-22)."],
      ["12:9", "A chest", "To repair the temple, the priest Jehoiada bored a hole in the lid of a chest and set it by the altar. A simple system for giving."],
      ["12:15", "They dealt faithfully", "No one asked for an accounting from the men who paid the workers, because they dealt honestly."],
    ],
    refs: [["2CH.24", "2 Chronicles 24", "Joash's reign and fall"], ["2CO.8", "2 Corinthians 8:20-21", "Honest handling of gifts"]],
  },
  13: {
    intro: "Jehoahaz and Jehoash reign in Israel. Elisha, dying, tells King Jehoash to strike the ground with arrows; he strikes only three times, so he will defeat Aram only three times. After Elisha's death, a dead man thrown into his grave touches his bones and comes back to life.",
    v: [
      ["13:14", "The chariots of Israel and its horsemen!", "The king honors Elisha with the words Elisha spoke of Elijah."],
      ["13:19", "You should have struck five or six times", "Half-hearted faith gets limited results."],
      ["13:21", "He revived and stood up", "God's power continues after the prophet's death."],
      ["13:23", "The LORD was gracious to them", "Because of His covenant with Abraham, Isaac and Jacob."],
    ],
    refs: [["2KI.2", "2 Kings 2:12", "My father, the chariots of Israel"]],
  },
  14: {
    intro: "Amaziah of Judah defeats Edom, then proudly challenges Israel's King Jehoash, who answers with a fable of a thistle and a cedar. Israel wins, breaks Jerusalem's wall and takes the temple treasures. Jeroboam II of Israel restores its borders, as the prophet Jonah had foretold.",
    v: [
      ["14:6", "Each shall be put to death for his own sin", "King Amaziah executed his father's murderers but not their children, following the law of Moses: each person dies for their own sin (Deuteronomy 24:16)."],
      ["14:10", "Your heart has become proud", "After defeating Edom, Amaziah challenged Israel. King Jehoash warned: your heart has become proud; stay home. Amaziah would not listen and was defeated."],
      ["14:25", "Jonah the son of Amittai", "The same Jonah who later went to Nineveh."],
    ],
    refs: [["JON.1", "Jonah 1:1", "Jonah the son of Amittai"], ["DEU.24", "Deuteronomy 24:16", "Each for his own sin"]],
  },
  15: {
    intro: "Azariah (Uzziah) reigns fifty-two years in Judah but is struck with leprosy. In Israel, a quick series of kings are murdered: Zechariah, Shallum, Menahem, Pekahiah, Pekah. Assyria's Tiglath-pileser (called Pul) invades and takes captives.",
    v: [
      ["15:5", "The LORD struck the king", "2 Chronicles 26:16-21 explains: Uzziah proudly burned incense in the temple."],
      ["15:19", "Pul, king of Assyria", "Pul is another name for Tiglath-pileser III of Assyria, who ruled 745-727 BC. His own records mention receiving tribute from Menahem of Israel."],
      ["15:29", "Carried them captive to Assyria", "Tiglath-pileser captured northern Israel's towns and Galilee and carried the people to Assyria. These were the first deportations from the north."],
    ],
    refs: [["ISA.6", "Isaiah 6:1", "In the year of King Uzziah's death"], ["2CH.26", "2 Chronicles 26", "Uzziah's pride"]],
  },
  16: {
    intro: "Ahaz of Judah does evil, even making his son pass through the fire. When Aram and Israel attack, he sends temple silver and gold to the king of Assyria for help. In Damascus he sees a pagan altar, has a copy built for the temple, and moves the LORD's bronze altar aside.",
    v: [
      ["16:3", "He made his son pass through the fire", "Child sacrifice, the worst practice of Canaan."],
      ["16:7", "I am your servant and your son", "Ahaz trusts Assyria rather than God (Isaiah 7)."],
      ["16:10-11", "The altar at Damascus", "King Ahaz saw an altar in Damascus and had a copy built for God's temple. He copied the worship of the nations instead of following God's pattern."],
    ],
    refs: [["ISA.7", "Isaiah 7", "Isaiah's word to Ahaz"], ["2CH.28", "2 Chronicles 28", "Ahaz's reign"]],
  },
  17: {
    intro: "In 722 BC, after a three-year siege, Assyria captures Samaria and deports Israel. The writer explains why: they feared other gods, rejected God's statutes and prophets, and \"followed vanity and became vain.\" Assyria resettles foreigners in Samaria, who mix worship of the LORD with their own gods.",
    v: [
      ["17:6", "In the ninth year of Hoshea", "In Hoshea's ninth year, 722 BC, Assyria captured Samaria and carried Israel into exile. The northern kingdom came to an end."],
      ["17:13", "Yet the LORD warned Israel", "The LORD warned Israel and Judah again and again through every prophet and seer: turn from your evil ways. They would not listen (17:14)."],
      ["17:15", "Followed vanity and became vain", "We become like what we worship (Psalm 115:8)."],
      ["17:33", "They feared the LORD and served their own gods", "The roots of the Samaritans of Jesus' day."],
    ],
    bg: [["Sargon's records", "Sargon II of Assyria boasted that he captured Samaria and carried off 27,290 people. Assyrian deportation was a deliberate policy to break up rebel nations.", "strong", ["anet", "kitchen"]]],
    refs: [["JHN.4", "John 4:9, 20-22", "Jews and Samaritans"], ["HOS.13", "Hosea 13:16", "Samaria will be held guilty"], ["PSA.115", "Psalm 115:4-8", "Those who make them will become like them"]],
  },
  18: {
    intro: "Hezekiah becomes king of Judah. He trusts the LORD like no king before or after, removes the high places, and breaks the bronze serpent Moses made, because people were burning incense to it. Assyria's King Sennacherib invades, and his officer the Rabshakeh stands outside Jerusalem mocking Hezekiah's trust in God.",
    v: [
      ["18:4", "Nehushtan", "Even a good thing from God can become an idol."],
      ["18:5", "He trusted in the LORD", "\"So that after him there was none like him among all the kings of Judah.\""],
      ["18:22", "We trust in the LORD our God", "Assyria's spokesman, the Rabshakeh, mocks Judah's trust in the LORD, saying Hezekiah removed His altars. He misunderstood Hezekiah's reform."],
      ["18:35", "Who among all the gods of the lands?", "He puts the LORD with the idols, a fatal mistake."],
    ],
    bg: [["Hezekiah's tunnel and Sennacherib's prism", "Hezekiah's water tunnel under Jerusalem (2 Kings 20:20) can still be walked today, and its ancient inscription was found in 1880. Sennacherib's own record says he shut Hezekiah up in Jerusalem \"like a bird in a cage,\" but does not claim to have captured it.", "strong", ["kitchen", "anet"]]],
    refs: [["NUM.21", "Numbers 21:8-9", "The bronze serpent"], ["ISA.36", "Isaiah 36", "The same account"], ["2CH.32", "2 Chronicles 32", "Hezekiah and Sennacherib"]],
  },
  19: {
    intro: "Hezekiah tears his clothes, goes into the temple, and sends to Isaiah. Sennacherib sends a threatening letter; Hezekiah spreads it out before the LORD and prays. Isaiah brings God's answer. That night the angel of the LORD strikes 185,000 in the Assyrian camp, and Sennacherib goes home to Nineveh, where his sons later kill him.",
    v: [
      ["19:14", "Spread it out before the LORD", "A model of bringing our troubles to God."],
      ["19:19", "That all the kingdoms of the earth may know", "Hezekiah spread Sennacherib's letter before the LORD and prayed: save us, so all the kingdoms of the earth may know that You alone are God."],
      ["19:34", "For My own sake and for My servant David's sake", "Through Isaiah God answered: I will defend this city to save it, for My own sake and for the sake of My servant David."],
      ["19:37", "His sons killed him", "Assyrian records confirm Sennacherib was murdered by a son, in 681 BC."],
    ],
    refs: [["ISA.37", "Isaiah 37", "The same account"], ["PSA.46", "Psalm 46", "God is our refuge"], ["PHP.4", "Philippians 4:6", "Let your requests be made known to God"]],
  },
  20: {
    intro: "Hezekiah becomes mortally ill. He prays with tears, and God adds fifteen years to his life, confirming it with the shadow going back ten steps. But when envoys come from Babylon, Hezekiah proudly shows them all his treasures. Isaiah foretells that everything will one day be carried to Babylon.",
    v: [
      ["20:3", "Remember now, O LORD", "Told he would die, Hezekiah turned his face to the wall and prayed: remember, LORD, how I have walked before You faithfully. And he wept bitterly."],
      ["20:5", "I have heard your prayer, I have seen your tears", "Before Isaiah had left the middle courtyard, God sent him back: I have heard your prayer and seen your tears; I will heal you and add fifteen years."],
      ["20:17", "Carried to Babylon", "Over a hundred years before it happened."],
      ["20:19", "Peace and truth in my days", "Told that his treasures would go to Babylon, Hezekiah thought: at least there will be peace in my lifetime. It was a self-centered response."],
    ],
    refs: [["ISA.38", "Isaiah 38", "Hezekiah's prayer and song"], ["ISA.39", "Isaiah 39", "The Babylonian envoys"], ["2CH.32", "2 Chronicles 32:24-31", "Hezekiah's pride"]],
  },
  21: {
    intro: "Manasseh, Hezekiah's son, reigns fifty-five years and undoes his father's reforms. He rebuilds high places, worships the stars, practices sorcery, makes his son pass through fire, puts an idol in the temple, and sheds much innocent blood. God declares He will wipe Jerusalem as one wipes a dish. Amon follows and is assassinated.",
    v: [
      ["21:9", "More evil than the nations", "Judah becomes worse than the Canaanites."],
      ["21:13", "As one wipes a dish", "Because of King Manasseh's evil, God says He will wipe Jerusalem as one wipes a dish, wiping it and turning it upside down."],
      ["21:16", "Very much innocent blood", "Jewish tradition says Isaiah was killed under Manasseh."],
    ],
    refs: [["2CH.33", "2 Chronicles 33:10-20", "Manasseh repents late in life"], ["JER.15", "Jeremiah 15:4", "Because of Manasseh"]],
  },
  22: {
    intro: "Josiah becomes king at eight and does right, not turning aside to the right or the left. While the temple is being repaired, Hilkiah the high priest finds the book of the law. When it is read to Josiah, he tears his clothes. The prophetess Huldah says judgment will come, but not in Josiah's day, because his heart was tender.",
    v: [
      ["22:2", "He did right in the sight of the LORD", "\"He did not turn aside to the right or to the left.\""],
      ["22:8", "I have found the book of the law", "God's word had been lost in God's own house."],
      ["22:19", "Your heart was tender", "When King Josiah heard the rediscovered book of the law, he tore his clothes and wept. God said: because your heart was tender and you humbled yourself, I have heard you."],
    ],
    refs: [["2CH.34", "2 Chronicles 34", "Josiah's reign"], ["DEU.28", "Deuteronomy 28", "The curses read to Josiah"]],
  },
  23: {
    intro: "Josiah reads the book of the covenant to all the people and renews the covenant. He cleans out the temple, destroys the high places, defiles Topheth where children were sacrificed, and tears down Jeroboam's altar at Bethel, fulfilling the prophecy of 1 Kings 13. He keeps a great Passover. Yet God's anger over Manasseh remains. Josiah dies fighting Pharaoh Neco at Megiddo.",
    v: [
      ["23:3", "With all his heart and all his soul", "Josiah stood by the pillar and made a covenant before the LORD to follow Him with all his heart and soul. All the people joined in."],
      ["23:16", "According to the word of the LORD", "Josiah burned bones on Jeroboam's altar at Bethel, fulfilling the word of a man of God about three hundred years earlier, who had even named Josiah (1 Kings 13:2)."],
      ["23:25", "Before him there was no king like him", "Who turned to the LORD with all his heart, soul and might."],
      ["23:29", "Pharaoh Neco", "Josiah's death at Megiddo was mourned for generations (2 Chronicles 35:25)."],
    ],
    refs: [["1KI.13", "1 Kings 13:2", "Josiah named in advance"], ["DEU.6", "Deuteronomy 6:5", "With all your heart, soul and might"]],
  },
  24: {
    intro: "Nebuchadnezzar of Babylon makes Judah a vassal. Jehoiakim rebels and dies. His son Jehoiachin surrenders after three months in 597 BC, and Nebuchadnezzar takes the king, the leaders, the craftsmen and the temple treasures to Babylon, including Ezekiel. Zedekiah is made king and later rebels too.",
    v: [
      ["24:3", "At the command of the LORD", "Babylon is God's instrument of judgment."],
      ["24:14", "All Jerusalem", "In 597 BC Nebuchadnezzar carried off Jerusalem's officials, soldiers and craftsmen, 10,000 people, leaving only the poorest. The prophet Ezekiel was among them."],
      ["24:20", "Zedekiah rebelled", "Against Jeremiah's advice (Jeremiah 27)."],
    ],
    bg: [["The Babylonian Chronicle", "A Babylonian tablet records that Nebuchadnezzar captured \"the city of Judah\" on 2 Adar (March 16) 597 BC and appointed a king of his choice, matching 2 Kings 24.", "strong", ["kitchen", "anet"]]],
    refs: [["DAN.1", "Daniel 1:1-2", "Daniel taken to Babylon"], ["JER.52", "Jeremiah 52", "The fall of Jerusalem"], ["EZK.1", "Ezekiel 1:1-2", "Ezekiel among the exiles"]],
  },
  25: {
    intro: "In 586 BC Babylon breaks through Jerusalem's wall after a long siege and famine. Zedekiah is captured, his sons are killed before his eyes, and he is blinded. The temple, palace and houses are burned, and the walls torn down. Most of the people are taken into exile. The book ends with a glimmer of hope: in Babylon, King Jehoiachin is released from prison and given a seat at the king's table.",
    v: [
      ["25:9", "He burned the house of the LORD", "In 586 BC Babylon's commander burned the LORD's house, the king's palace and every great house in Jerusalem. Solomon's temple was destroyed."],
      ["25:21", "So Judah was led away into exile", "So Judah went into exile out of its land, as Moses (Deuteronomy 28:36) and the prophets had warned. The book still ends with a ray of hope (25:27-30)."],
      ["25:27-30", "He spoke kindly to him", "David's line survives, waiting for God's promised King."],
    ],
    bg: [["Jehoiachin's rations", "Babylonian ration tablets found in Babylon list oil given to \"Yaukin, king of the land of Yahud\" and his sons, confirming he lived at the Babylonian court.", "strong", ["anet", "kitchen"]]],
    refs: [["JER.52", "Jeremiah 52", "The same account"], ["LAM.1", "Lamentations 1", "How lonely sits the city"], ["PSA.137", "Psalm 137", "By the rivers of Babylon"], ["MAT.1", "Matthew 1:11-12", "The deportation to Babylon"]],
  },
});
