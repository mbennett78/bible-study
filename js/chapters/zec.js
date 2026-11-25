// Zechariah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  boda: "Mark J. Boda, The Book of Zechariah, New International Commentary on the Old Testament (Eerdmans, 2016).",
  baldwin: "Joyce G. Baldwin, Haggai, Zechariah, Malachi, Tyndale Old Testament Commentaries (InterVarsity Press, 1972).",
  smithR: "Ralph L. Smith, Micah-Malachi, Word Biblical Commentary 32 (Word, 1984).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["boda", "baldwin"] }, {
  1: {
    intro: "In 520 BC, two months after Haggai began, Zechariah son of Berechiah calls the returned exiles: \"Return to Me, and I will return to you.\" Their fathers ignored the prophets, and God's word overtook them. Then come eight night visions. In the first, a man on a red horse stands among myrtle trees; patrol riders report that the earth is at rest, yet Jerusalem lies in ruins. God answers with comforting words: \"I will return to Jerusalem with compassion; My house will be built in it.\" A second vision shows four horns, the powers that scattered Judah, and four craftsmen who come to throw them down.",
    v: [
      ["1:3", "Return to Me... that I may return to you", "Zechariah, a prophet to the returned exiles, opens with God's call: return to Me, and I will return to you."],
      ["1:6", "Did they not overtake your fathers?", "Their ancestors ignored the prophets, but God's words still caught up with them. What God says comes true."],
      ["1:12", "How long will You have no compassion for Jerusalem?", "In a vision, the angel of the LORD asks how long God will withhold mercy from Jerusalem, now seventy years after its fall."],
      ["1:16", "I will return to Jerusalem with compassion; My house will be built in it", "God answers with comfort: He will return to Jerusalem with mercy, and His house will be rebuilt there. It encouraged the people rebuilding the temple."],
      ["1:21", "These have come to terrify them, to throw down the horns", "God answers every power that harms His people."],
    ],
    bg: [["Prophet and priest", "Zechariah came from a priestly family that returned from Babylon (Nehemiah 12:16). Ezra 5:1 says he and Haggai together urged the people to rebuild the temple.", "strong", ["baldwin", "kitchen"]]],
    refs: [["MAL.3", "Malachi 3:7", "Return to Me"], ["HAG.1", "Haggai 1", "The call to rebuild"], ["EZR.5", "Ezra 5:1", "Haggai and Zechariah"], ["REV.6", "Revelation 6:1-8", "Colored horses"]],
  },
  2: {
    intro: "In the third vision, a young man goes to measure Jerusalem, but is told the city will have no walls: it will overflow with people and animals, and \"I will be a wall of fire around her, and I will be the glory in her midst.\" Exiles still in Babylon are urged to come home, for \"he who touches you touches the apple of His eye.\" \"Sing for joy... for behold I am coming and I will dwell in your midst.\" Many nations will join themselves to the LORD.",
    v: [
      ["2:4", "Jerusalem will be inhabited without walls", "A young man with a measuring line is told Jerusalem will be a city without walls, because it will be too full of people and animals to fit."],
      ["2:5", "I will be a wall of fire around her", "Jerusalem will not need stone walls. The LORD Himself will be a wall of fire around her and the glory in her midst."],
      ["2:8", "He who touches you touches the apple of His eye", "Whoever touches God's people touches the apple of His eye, the most sensitive and protected part."],
      ["2:11", "Many nations will join themselves to the LORD in that day", "Many nations will join themselves to the LORD in that day and become His people too."],
      ["2:13", "Be silent, all flesh, before the LORD", "Be silent before the LORD, all people, for He has roused Himself from His holy dwelling."],
    ],
    refs: [["DEU.32", "Deuteronomy 32:10", "The apple of His eye"], ["REV.21", "Revelation 21:3", "God dwells with them"], ["HAB.2", "Habakkuk 2:20", "Let all the earth be silent"]],
  },
  3: {
    intro: "In the fourth vision, Joshua the high priest stands before the angel of the LORD in filthy clothes, with Satan at his right hand to accuse him. The LORD rebukes Satan: \"Is this not a brand plucked from the fire?\" Joshua's filthy garments are removed: \"I have taken your iniquity away from you and will clothe you with festal robes.\" A clean turban is set on his head. God promises to bring \"My servant the Branch\" and to remove the iniquity of the land in one day.",
    v: [
      ["3:1", "Satan standing at his right hand to accuse him", "In a vision, Joshua the high priest stands before the angel of the LORD, and Satan, \"the accuser,\" stands ready to accuse him."],
      ["3:2", "The LORD rebuke you, Satan!", "The LORD rebukes Satan. Joshua is like a burning stick snatched from the fire, rescued by God."],
      ["3:4", "I have taken your iniquity away from you", "Joshua's filthy clothes are taken off and he is dressed in clean robes. God says: I have taken away your sin."],
      ["3:8", "I am going to bring in My servant the Branch", "God will bring His servant, the Branch, a title used for the coming King from David's line (Isaiah 11:1; Jeremiah 23:5)."],
      ["3:9", "I will remove the iniquity of that land in one day", "God will remove the sin of the land in a single day. Christians see this fulfilled at the cross."],
    ],
    w: [["שָּׂטָן", "satan", "H7854", "adversary, accuser", "With \"the\" in front, as here and in Job 1-2, it names the accuser who opposes God's people in His court.", ["halot", "boda"]]],
    refs: [["JOB.1", "Job 1:6-12", "The accuser in God's court"], ["JUD.1", "Jude 9", "The Lord rebuke you"], ["REV.12", "Revelation 12:10", "The accuser thrown down"], ["ISA.61", "Isaiah 61:10", "Garments of salvation"], ["JER.23", "Jeremiah 23:5", "A righteous Branch"]],
  },
  4: {
    intro: "In the fifth vision, Zechariah sees a gold lampstand with a bowl on top and seven lamps, fed by two olive trees. The message is for Zerubbabel, the governor: \"Not by might nor by power, but by My Spirit, says the LORD of hosts.\" The great mountain of difficulty will become a plain. Zerubbabel laid the temple's foundation, and his hands will finish it. \"Who has despised the day of small things?\" The two olive trees are the two anointed ones who stand by the Lord of the whole earth.",
    v: [
      ["4:6", "Not by might nor by power, but by My Spirit", "God's word to Zerubbabel, rebuilding the temple: not by might, not by power, but by My Spirit, says the LORD of hosts."],
      ["4:7", "What are you, O great mountain? Before Zerubbabel you will become a plain", "The huge task before Zerubbabel looked like a mountain. Before him it will become level ground."],
      ["4:9", "The hands of Zerubbabel have laid the foundation... his hands will finish it", "Zerubbabel laid the temple's foundation, and he will finish it. The second temple was completed in 515 BC (Ezra 6:15)."],
      ["4:10", "Who has despised the day of small things?", "Some looked down on the small new temple. God says: do not despise the day of small beginnings."],
      ["4:14", "These are the two anointed ones", "Probably Zerubbabel and Joshua, king's line and priest."],
    ],
    refs: [["EXO.25", "Exodus 25:31-40", "The tabernacle lampstand"], ["REV.11", "Revelation 11:4", "Two olive trees and two lampstands"], ["EZR.6", "Ezra 6:15", "The temple finished"], ["MAT.17", "Matthew 17:20", "Faith moves mountains"]],
  },
  5: {
    intro: "In the sixth vision, a huge flying scroll, thirty feet long and fifteen wide, carries a curse against thieves and those who swear falsely; it enters their houses and consumes them. In the seventh, a woman called Wickedness sits inside a measuring basket. A lead cover is pressed down on her, and two women with wings like a stork carry the basket away to Babylon (Shinar), where a house is built for it. Sin is removed from the land.",
    v: [
      ["5:3", "This is the curse that is going forth over the face of the whole land", "Zechariah sees a huge flying scroll, a curse going out over the land against thieves and those who swear falsely."],
      ["5:4", "It will enter the house of the thief", "God's curse will enter the house of the thief and the liar and stay there until it is destroyed. Sin cannot hide."],
      ["5:8", "This is Wickedness!", "Inside a basket is a woman called Wickedness. She is shut in and carried away to Babylon (5:11). God will remove evil from His people."],
      ["5:11", "To build a temple for her in the land of Shinar", "Wickedness sent back to where it belongs."],
    ],
    refs: [["EXO.20", "Exodus 20:7, 15", "Do not steal, do not swear falsely"], ["GEN.11", "Genesis 11:2", "The land of Shinar"], ["REV.18", "Revelation 18:2", "Babylon, home of every unclean thing"]],
  },
  6: {
    intro: "In the eighth vision, four chariots with red, black, white and dappled horses come out from between two bronze mountains and patrol the earth. Those going north have given God's Spirit rest there. Then Zechariah is told to take silver and gold from returned exiles, make a crown and set it on Joshua the high priest: \"Behold, a man whose name is Branch... He who will build the temple of the LORD... He will be a priest on His throne.\" Those far off will come and build.",
    v: [
      ["6:5", "These are the four spirits of heaven", "Four chariots go out to patrol the earth. They are the four spirits of heaven serving the Lord of all the earth."],
      ["6:12", "Behold, a man whose name is Branch", "A crown is placed on Joshua the high priest: here is the man called the Branch. He will build the LORD's temple."],
      ["6:13", "He will be a priest on His throne", "He will sit and rule on His throne and be a priest on His throne, with harmony between the two. Christians see Jesus as both King and Priest (Hebrews 7)."],
      ["6:15", "Those who are far off will come and build the temple", "People from far away will come and help build the LORD's temple, if God's people diligently obey Him."],
    ],
    why: "It is unusual for a priest to be crowned, since kings came from David's line and priests from Levi's.",
    views: [
      ["A sign of the Messiah", "Many read the crowning as a symbolic act pointing to a coming Branch who unites king and priest, which the New Testament sees in Jesus (Hebrews 7).", ["baldwin", "boda"]],
      ["About Zerubbabel and Joshua working together", "Others note the crown was kept in the temple as a memorial (6:14) and see the sign first about the governor and priest sharing leadership in harmony (6:13), with a fuller hope beyond them.", ["smithR", "boda"]],
    ],
    common: "Both readings agree the passage promises a coming ruler who will build God's house and bring peace.",
    refs: [["REV.6", "Revelation 6:1-8", "Four horses"], ["PSA.110", "Psalm 110:4", "A priest forever"], ["HEB.7", "Hebrews 7", "King and priest"], ["JER.33", "Jeremiah 33:15", "The righteous Branch"]],
  },
  7: {
    intro: "Two years later, in 518 BC, people from Bethel ask whether they should keep fasting in the fifth month, as they had for seventy years in memory of the temple's destruction. God asks, \"When you fasted... was it actually for Me?\" He reminds them of what the earlier prophets said: \"Dispense true justice and practice kindness and compassion each to his brother; do not oppress the widow, the orphan, the stranger or the poor.\" Their fathers made their hearts like flint, and so they were scattered.",
    v: [
      ["7:3", "Shall I weep in the fifth month and abstain?", "People from Bethel ask whether they should keep fasting in the fifth month, mourning the temple's destruction, now that it is being rebuilt."],
      ["7:5", "Was it actually for Me that you fasted?", "God asks: during all those years of fasting, was it really for Me that you fasted?"],
      ["7:9", "Dispense true justice and practice kindness and compassion", "What God really wants: judge truly and show steadfast love and compassion to one another."],
      ["7:10", "Do not oppress the widow or the orphan, the stranger or the poor", "Do not oppress the widow, the orphan, the foreigner or the poor, and do not plot evil against each other."],
      ["7:12", "They made their hearts like flint", "Their ancestors made their hearts as hard as flint so they would not hear God's word through the prophets."],
    ],
    refs: [["ISA.58", "Isaiah 58:3-7", "The fast God chooses"], ["MIC.6", "Micah 6:8", "Do justice, love kindness"], ["MAT.6", "Matthew 6:16-18", "Fasting in secret"], ["JAS.1", "James 1:27", "Pure religion"]],
  },
  8: {
    intro: "God answers with ten promises. \"I am exceedingly jealous for Zion.\" Old men and women will again sit in Jerusalem's streets, and the streets will be full of boys and girls playing. If it seems too difficult, is it too difficult for God? He will bring His people home. \"Let your hands be strong.\" Speak truth, judge with peace. The fasts will become joyful feasts. Many peoples will seek the LORD, and ten men from every nation will grab the robe of a Jew, saying, \"Let us go with you, for we have heard that God is with you.\"",
    v: [
      ["8:4", "Old men and old women will again sit in the streets of Jerusalem", "A picture of peace."],
      ["8:5", "Boys and girls playing in its streets", "Joy restored to a city."],
      ["8:6", "Should it also be too difficult in My sight?", "Nothing is too hard for God."],
      ["8:16", "Speak the truth to one another", "How God's people live."],
      ["8:19", "The fasts... will become joy, gladness and cheerful feasts", "Mourning turned to celebration."],
      ["8:23", "Let us go with you, for we have heard that God is with you", "The nations drawn in."],
    ],
    refs: [["JER.32", "Jeremiah 32:17, 27", "Is anything too hard for Me?"], ["EPH.4", "Ephesians 4:25", "Speak truth with your neighbor"], ["ISA.2", "Isaiah 2:3", "Let us go up to the mountain"]],
  },
  9: {
    intro: "The second part of the book begins with an \"oracle.\" God's judgment falls on Judah's neighbors, from Syria to Tyre and Philistia. Then comes a famous promise: \"Rejoice greatly, O daughter of Zion! Behold, your king is coming to you; He is just and endowed with salvation, humble, and mounted on a donkey, even on a colt.\" He will speak peace to the nations, and His rule will reach to the ends of the earth. Because of the blood of the covenant, God will free the prisoners: \"Return to the stronghold, O prisoners who have the hope.\"",
    v: [
      ["9:9", "Your king is coming to you... humble, and mounted on a donkey", "Fulfilled when Jesus entered Jerusalem."],
      ["9:10", "He will speak peace to the nations", "A peaceful King."],
      ["9:11", "Because of the blood of My covenant with you, I have set your prisoners free", "Freedom through covenant blood."],
      ["9:12", "Return to the stronghold, O prisoners who have the hope", "Prisoners of hope."],
      ["9:16", "The LORD their God will save them... like the jewels of a crown", "God's people treasured."],
    ],
    bg: [["A king on a donkey", "Conquering kings rode war horses. A donkey was the mount of peace and of David's royal family (1 Kings 1:33). Jesus chose a young donkey for His entry into Jerusalem, and all four Gospels tell it.", "strong", ["baldwin", "boda"]]],
    refs: [["MAT.21", "Matthew 21:1-11", "Jesus enters Jerusalem"], ["JHN.12", "John 12:14-16", "Fulfilled"], ["1KI.1", "1 Kings 1:33", "Solomon rides David's mule"], ["MRK.14", "Mark 14:24", "Blood of the covenant"]],
  },
  10: {
    intro: "\"Ask rain from the LORD at the time of the spring rain.\" Household idols speak nonsense, and so the people wander like sheep without a shepherd. God is angry with the bad shepherds but will care for His flock and make them like His majestic horse. From Judah will come the cornerstone, the tent peg and the battle bow. God will strengthen Judah, save Joseph and whistle to gather the scattered people home from Egypt and Assyria.",
    v: [
      ["10:1", "Ask rain from the LORD", "Pray to the true Source."],
      ["10:2", "They wander like sheep, they are afflicted, because there is no shepherd", "Lost without good leaders."],
      ["10:4", "From them will come the cornerstone", "A leader from Judah."],
      ["10:6", "They will be as though I had not rejected them", "Full restoration."],
      ["10:8", "I will whistle for them to gather them together", "God calls His people home."],
    ],
    refs: [["MAT.9", "Matthew 9:36", "Sheep without a shepherd"], ["PSA.118", "Psalm 118:22", "The cornerstone"], ["JAS.5", "James 5:7", "The early and late rains"]],
  },
  11: {
    intro: "Zechariah acts out a parable as a shepherd of a flock doomed to slaughter. He takes two staffs, Favor and Union. The flock detests him, so he breaks Favor. He asks for his wages, and they weigh out thirty shekels of silver. The LORD says, \"Throw it to the potter, that magnificent price at which I was valued by them.\" He throws it into the house of the LORD to the potter, then breaks Union. A worthless shepherd will come who deserts the flock.",
    v: [
      ["11:7", "I took for myself two staffs: the one I called Favor and the other I called Union", "Signs of God's care."],
      ["11:12", "They weighed out thirty shekels of silver as my wages", "The price of a slave (Exodus 21:32)."],
      ["11:13", "Throw it to the potter, that magnificent price", "Bitter irony about how little they valued God."],
      ["11:17", "Woe to the worthless shepherd who leaves the flock", "Faithless leadership."],
    ],
    why: "Matthew 27:9-10 attributes this prophecy about thirty pieces of silver and a potter's field to Jeremiah.",
    views: [
      ["Matthew blends two prophets", "Many hold that Matthew combines Zechariah 11 with Jeremiah's potter and field passages (Jeremiah 18-19, 32) and names the more prominent prophet, a known Jewish practice.", ["boda", "baldwin"]],
      ["Jeremiah heads the scroll", "Others note that some ancient lists placed Jeremiah first among the prophets, so his name could stand for the whole prophetic collection.", ["smithR"]],
    ],
    common: "All agree Zechariah's thirty pieces of silver thrown to the potter are fulfilled in Judas's betrayal money buying a potter's field.",
    refs: [["MAT.26", "Matthew 26:15", "Thirty pieces of silver"], ["MAT.27", "Matthew 27:3-10", "The potter's field"], ["EXO.21", "Exodus 21:32", "The price of a slave"], ["JHN.10", "John 10:11-13", "The good shepherd and the hired hand"]],
  },
  12: {
    intro: "Another oracle: God, who stretched out the heavens and formed the human spirit, will make Jerusalem a heavy stone for all nations who come against her. He will protect the house of David. Then a surprising turn: \"I will pour out on the house of David and on the inhabitants of Jerusalem the Spirit of grace and of supplication, so that they will look on Me whom they have pierced; and they will mourn for Him, as one mourns for an only son.\" Every family will mourn by itself.",
    v: [
      ["12:1", "Who forms the spirit of man within him", "The Creator speaks."],
      ["12:3", "I will make Jerusalem a heavy stone for all the peoples", "Those who attack her are hurt."],
      ["12:8", "The feeble among them will be like David", "God strengthens the weak."],
      ["12:10", "They will look on Me whom they have pierced", "John 19:37 applies this to the cross."],
      ["12:12", "The land will mourn, every family by itself", "Deep, personal repentance."],
    ],
    w: [["דָּקַר", "daqar", "H1856", "to pierce through", "Used of a deadly thrust with a sword or spear, as in 13:3.", ["halot", "boda"]]],
    refs: [["JHN.19", "John 19:34-37", "They will look on Him whom they pierced"], ["REV.1", "Revelation 1:7", "Every eye will see Him"], ["ACT.2", "Acts 2:37", "Cut to the heart"], ["JOL.2", "Joel 2:28", "I will pour out My Spirit"]],
  },
  13: {
    intro: "\"In that day a fountain will be opened for the house of David and for the inhabitants of Jerusalem, for sin and for impurity.\" Idols and false prophets will be removed from the land, and false prophets will be ashamed of their visions. Then: \"Awake, O sword, against My Shepherd... Strike the Shepherd that the sheep may be scattered.\" A remnant will be refined like silver and tested like gold. \"They will call on My name, and I will answer them; I will say, 'They are My people,' and they will say, 'The LORD is my God.'\"",
    v: [
      ["13:1", "A fountain will be opened... for sin and for impurity", "Cleansing for sin."],
      ["13:2", "I will cut off the names of the idols from the land", "False worship ended."],
      ["13:7", "Strike the Shepherd that the sheep may be scattered", "Jesus quoted this the night He was arrested."],
      ["13:9", "Refine them as silver is refined", "Trials purify."],
      ["13:9", "They will say, \"The LORD is my God\"", "The covenant restored."],
    ],
    refs: [["MAT.26", "Matthew 26:31", "Jesus quotes 13:7"], ["MRK.14", "Mark 14:27, 50", "The disciples scatter"], ["1PE.1", "1 Peter 1:7", "Faith refined by fire"], ["1JN.1", "1 John 1:7-9", "Cleansed from all sin"], ["HOS.2", "Hosea 2:23", "You are My people"]],
  },
  14: {
    intro: "A day is coming for the LORD. Nations gather against Jerusalem, but the LORD goes out to fight for her. \"In that day His feet will stand on the Mount of Olives,\" which will split in two. There will be one day with no night, \"at evening time there will be light.\" Living waters will flow out of Jerusalem, half to the eastern sea and half to the western. \"The LORD will be king over all the earth; in that day the LORD will be the only one, and His name the only one.\" Survivors from the nations will come to worship and keep the Feast of Booths, and even the bells of the horses and the cooking pots will be inscribed \"Holy to the LORD.\"",
    v: [
      ["14:4", "His feet will stand on the Mount of Olives", "Compare Acts 1:11-12."],
      ["14:7", "At evening time there will be light", "Light where darkness was expected."],
      ["14:8", "Living waters will flow out of Jerusalem", "Life flowing to the world."],
      ["14:9", "The LORD will be king over all the earth", "God's reign complete."],
      ["14:16", "To worship the King, the LORD of hosts, and to celebrate the Feast of Booths", "The nations come to worship."],
      ["14:20", "There will be inscribed on the bells of the horses, \"HOLY TO THE LORD\"", "Everyday things made holy."],
    ],
    why: "Christians read the timing and details of Zechariah 14 differently.",
    views: [
      ["A future, literal fulfillment", "Some read the chapter as describing events at Christ's return, when He stands on the Mount of Olives and reigns on earth.", ["smithR"]],
      ["A picture of God's final victory", "Others read the battle, the split mountain and the flowing waters as rich prophetic pictures, drawn from earlier Scripture, of God's complete victory and the new creation described in Revelation 21-22.", ["baldwin", "boda"]],
    ],
    common: "All agree the chapter promises that the LORD will defeat every enemy, reign over all the earth and make everything holy.",
    refs: [["ACT.1", "Acts 1:11-12", "He will come back the same way"], ["EZK.47", "Ezekiel 47:1-12", "The river from the temple"], ["REV.22", "Revelation 22:1-5", "No night there; the river of life"], ["EXO.28", "Exodus 28:36", "Holy to the LORD"], ["DEU.6", "Deuteronomy 6:4", "The LORD is one"]],
  },
});
