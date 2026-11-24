// Amos chapter notes.
import { makeBook } from "./make.js";

const sources = {
  stuartM: "Douglas Stuart, Hosea-Jonah, Word Biblical Commentary 31 (Word, 1987).",
  smithB: "Billy K. Smith and Frank S. Page, Amos, Obadiah, Jonah, New American Commentary 19B (Broadman & Holman, 1995).",
  garrettH: "Duane A. Garrett, Hosea, Joel, New American Commentary 19A (Broadman & Holman, 1997).",
  hubbardD: "David A. Hubbard, Hosea and Joel and Amos, Tyndale Old Testament Commentaries (InterVarsity Press, 1989).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["smithB", "hubbardD"] }, {
  1: {
    intro: "Amos, a shepherd and fig farmer from Tekoa in Judah, prophesies to the northern kingdom of Israel two years before an earthquake, about 760 BC. \"The LORD roars from Zion.\" He begins with Israel's neighbors: \"For three transgressions of Damascus and for four I will not revoke its punishment.\" Gaza, Tyre, Edom and Ammon follow, each judged for cruelty.",
    v: [
      ["1:1", "Who was among the sheepherders from Tekoa", "An ordinary man called by God."],
      ["1:2", "The LORD roars from Zion", "Like a lion before it springs."],
      ["1:3", "For three transgressions and for four", "A Hebrew way of saying \"sin upon sin.\""],
      ["1:13", "They ripped open the pregnant women", "God judges cruelty in war."],
    ],
    bg: [["The great earthquake", "Excavations at Hazor and other sites show destruction from a major earthquake around 760 BC. It was remembered for centuries (Zechariah 14:5).", "strong", ["kitchen", "smithB"]]],
    refs: [["ZEC.14", "Zechariah 14:5", "The earthquake in Uzziah's days"], ["2KI.14", "2 Kings 14:23-27", "Jeroboam II"]],
  },
  2: {
    intro: "Moab and Judah are judged, and then the surprise: Israel. \"They sell the righteous for money and the needy for a pair of sandals.\" They trample the poor, deny justice to the afflicted, and lie down by every altar on garments taken in pledge. God reminds them that He brought them out of Egypt and gave them prophets, but they told the prophets not to prophesy.",
    v: [
      ["2:4", "They rejected the law of the LORD", "Judah judged for disobedience."],
      ["2:6", "They sell the needy for a pair of sandals", "People treated as cheap."],
      ["2:7", "These who pant after the very dust on the heads of the helpless", "Greed with no limits."],
      ["2:12", "You commanded the prophets saying, You shall not prophesy!", "Silencing God's voice."],
    ],
    refs: [["EXO.22", "Exodus 22:26-27", "Return the cloak by sunset"], ["JAS.5", "James 5:1-6", "Woe to the rich who oppress"]],
  },
  3: {
    intro: "\"You only have I chosen among all the families of the earth; therefore I will punish you for all your iniquities.\" A series of questions: Do two walk together unless they have agreed? Does a lion roar when it has no prey? \"Surely the Lord GOD does nothing unless He reveals His secret counsel to His servants the prophets.\" \"A lion has roared! Who will not fear?\"",
    v: [
      ["3:2", "You only have I chosen", "Privilege brings responsibility."],
      ["3:3", "Do two men walk together unless they have made an appointment?", "Cause and effect."],
      ["3:7", "He reveals His secret counsel to His servants the prophets", "God warns before He acts."],
      ["3:8", "The Lord GOD has spoken! Who can but prophesy?", "Amos must speak."],
    ],
    bg: [["Ivory houses", "Excavations at Samaria found over 500 carved ivory pieces from furniture and wall panels from Amos's era, matching his words about \"houses of ivory\" (3:15).", "strong", ["kitchen", "smithB"]]],
    refs: [["LUK.12", "Luke 12:48", "To whom much is given"], ["1KI.22", "1 Kings 22:39", "Ahab's ivory house"]],
  },
  4: {
    intro: "\"Hear this word, you cows of Bashan,\" wealthy women who oppress the poor and say to their husbands, \"Bring now, that we may drink!\" God sent famine, drought, blight, locusts, plague and war, \"yet you have not returned to Me.\" Five times this refrain. \"Prepare to meet your God, O Israel.\"",
    v: [
      ["4:1", "You cows of Bashan", "Pampered and well fed."],
      ["4:6", "Yet you have not returned to Me", "The sad refrain repeats five times."],
      ["4:12", "Prepare to meet your God", "A solemn warning."],
      ["4:13", "He who forms mountains and creates the wind", "God's power over creation."],
    ],
    refs: [["LEV.26", "Leviticus 26:14-39", "Warnings if they do not listen"], ["HAG.2", "Haggai 2:17", "Yet you did not come back to Me"]],
  },
  5: {
    intro: "A funeral song for Israel. \"Seek Me that you may live.\" \"Seek good and not evil, that you may live.\" \"Hate evil, love good, and establish justice in the gate.\" Those who long for the day of the LORD should beware: it will be darkness, not light. God hates their religious feasts and noisy songs. \"But let justice roll down like waters and righteousness like an ever-flowing stream.\"",
    v: [
      ["5:4", "Seek Me that you may live", "The way to life."],
      ["5:14", "Seek good and not evil", "Practical faith."],
      ["5:18", "Alas, you who are longing for the day of the LORD", "Not the day they expect."],
      ["5:21", "I hate, I reject your festivals", "Worship without justice is empty."],
      ["5:24", "Let justice roll down like waters", "Quoted by Dr. Martin Luther King Jr."],
    ],
    refs: [["ISA.1", "Isaiah 1:11-17", "Your worthless offerings"], ["MIC.6", "Micah 6:6-8", "What the LORD requires"], ["ACT.7", "Acts 7:42-43", "Stephen quotes Amos 5"]],
  },
  6: {
    intro: "\"Woe to those who are at ease in Zion.\" They lie on ivory beds, eat the best lambs, sing idle songs, drink wine from bowls and anoint themselves with fine oil, \"yet they have not grieved over the ruin of Joseph.\" They will be first to go into exile.",
    v: [
      ["6:1", "Woe to those who are at ease in Zion", "Comfort that ignores others' pain."],
      ["6:4", "Those who recline on beds of ivory", "Luxury."],
      ["6:6", "They have not grieved over the ruin of Joseph", "Not caring about the nation's ruin."],
    ],
    refs: [["LUK.16", "Luke 16:19-25", "The rich man and Lazarus"], ["JAS.5", "James 5:5", "Lived luxuriously"]],
  },
  7: {
    intro: "Amos sees visions of locusts and fire; each time he prays, \"Lord GOD, please pardon!\" and God relents. Then a plumb line: God will measure Israel and spare them no longer. The priest Amaziah tells Amos to go home to Judah. Amos answers, \"I am not a prophet, nor am I the son of a prophet; for I am a herdsman and a grower of sycamore figs. But the LORD took me from following the flock.\"",
    v: [
      ["7:2", "Lord GOD, please pardon!", "The prophet intercedes."],
      ["7:8", "I am about to put a plumb line", "God's standard for straightness."],
      ["7:14-15", "The LORD took me from following the flock", "God calls ordinary people."],
    ],
    refs: [["EXO.32", "Exodus 32:11-14", "Moses intercedes"], ["1CO.1", "1 Corinthians 1:27", "God chose the foolish things"]],
  },
  8: {
    intro: "A basket of summer fruit (qayits) means the end (qets) has come. God condemns those who trample the needy, can't wait for the Sabbath to end so they can cheat with false scales, and buy the poor for silver. \"Behold, days are coming when I will send a famine on the land, not a famine for bread or a thirst for water, but rather for hearing the words of the LORD.\"",
    v: [
      ["8:2", "The end has come", "A wordplay on summer fruit."],
      ["8:5", "To make the bushel smaller and the shekel bigger", "Cheating in business."],
      ["8:11", "A famine for hearing the words of the LORD", "The worst famine."],
    ],
    refs: [["PRO.11", "Proverbs 11:1", "A false balance"], ["MAT.4", "Matthew 4:4", "Man shall not live by bread alone"]],
  },
  9: {
    intro: "Amos sees the Lord standing by the altar. No one can hide from God, not in Sheol, heaven, Carmel or the bottom of the sea. Yet God will not totally destroy the house of Jacob. \"In that day I will raise up the fallen booth of David... and rebuild it as in the days of old.\" The plowman will overtake the reaper; mountains will drip sweet wine; God's people will be planted and never again rooted out.",
    v: [
      ["9:2-3", "Though they dig into Sheol... ascend to heaven", "No hiding from God."],
      ["9:11", "I will raise up the fallen booth of David", "James quoted this at the Jerusalem council."],
      ["9:13", "The plowman will overtake the reaper", "Harvests so big they overlap."],
      ["9:15", "They will not again be rooted out", "A lasting home."],
    ],
    refs: [["ACT.15", "Acts 15:15-17", "James quotes Amos 9"], ["PSA.139", "Psalm 139:7-10", "Where can I flee?"]],
  },
});
