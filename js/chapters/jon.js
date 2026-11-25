// Jonah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  stuartM: "Douglas Stuart, Hosea-Jonah, Word Biblical Commentary 31 (Word, 1987).",
  smithB: "Billy K. Smith and Frank S. Page, Amos, Obadiah, Jonah, New American Commentary 19B (Broadman & Holman, 1995).",
  garrettH: "Duane A. Garrett, Hosea, Joel, New American Commentary 19A (Broadman & Holman, 1997).",
  hubbardD: "David A. Hubbard, Hosea and Joel and Amos, Tyndale Old Testament Commentaries (InterVarsity Press, 1989).",
  baker: "David W. Baker, T. Desmond Alexander and Bruce K. Waltke, Obadiah, Jonah and Micah, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["baker", "stuartM"] }, {
  1: {
    intro: "God tells Jonah to go to Nineveh, Assyria's great city, and cry against its wickedness. Jonah runs the opposite way, boarding a ship to Tarshish. God sends a great storm. The pagan sailors pray to their gods while Jonah sleeps. When the lot falls on Jonah, he tells them, \"I fear the LORD God of heaven who made the sea,\" and asks them to throw him overboard. The sea calms, the sailors worship the LORD, and God appoints a great fish to swallow Jonah.",
    v: [
      ["1:3", "Jonah rose up to flee to Tarshish from the presence of the LORD", "God sent Jonah east to Nineveh, Assyria's capital. Jonah headed for Tarshish, far to the west, trying to run from the LORD."],
      ["1:5", "Jonah had gone below... and fell sound asleep", "While pagan sailors pray to their gods in the storm, God's prophet is asleep below deck."],
      ["1:9", "I fear the LORD God of heaven who made the sea", "Ironic: he is fleeing the God of the sea."],
      ["1:16", "The men feared the LORD greatly", "Pagans turn to God through a disobedient prophet."],
      ["1:17", "The LORD appointed a great fish", "The LORD appointed a great fish to swallow Jonah. It is a rescue, not only a punishment. Jesus spoke of the sign of Jonah's three days (Matthew 12:40)."],
    ],
    why: "Scholars discuss whether Jonah is history or a story told to teach.",
    views: [
      ["A historical account", "Many hold it is history: Jonah son of Amittai is a real prophet (2 Kings 14:25), and Jesus compared His own resurrection and Nineveh's repentance to Jonah's experience (Matthew 12:39-41).", ["stuartM", "baker", "smithB"]],
      ["A teaching story", "Others read it as an inspired, carefully crafted story, like a parable, meant to challenge Israel's attitude toward the nations, noting its humor and exaggeration.", ["baker"]],
    ],
    common: "All agree the book's message is God's mercy toward all people, including enemies, and His patience with a reluctant servant.",
    refs: [["2KI.14", "2 Kings 14:25", "Jonah son of Amittai"], ["MAT.12", "Matthew 12:39-41", "The sign of Jonah"], ["MRK.4", "Mark 4:37-41", "Jesus calms the storm"]],
  },
  2: {
    intro: "Inside the fish for three days and three nights, Jonah prays. His prayer is a psalm: \"I called out of my distress to the LORD, and He answered me.\" The waters surrounded him; seaweed wrapped his head; he went down to the roots of the mountains. \"But You have brought up my life from the pit.\" \"Salvation is from the LORD.\" The fish vomits Jonah onto dry land.",
    v: [
      ["2:2", "I called out of my distress to the LORD", "From inside the fish, Jonah prays. He called to the LORD in his distress, and God answered."],
      ["2:6", "You have brought up my life from the pit", "Jonah sank to the roots of the mountains, but God brought his life up from the pit."],
      ["2:8", "Those who regard vain idols forsake their faithfulness", "Those who cling to worthless idols turn away from God's steadfast love, the only love that can save."],
      ["2:9", "Salvation is from the LORD", "Salvation belongs to the LORD. This short line sums up the whole book. Then the fish puts Jonah on dry land (2:10)."],
    ],
    refs: [["MAT.12", "Matthew 12:40", "Three days and three nights"], ["PSA.18", "Psalm 18:4-6", "Cords of death"], ["PSA.3", "Psalm 3:8", "Salvation belongs to the LORD"]],
  },
  3: {
    intro: "God speaks to Jonah a second time, and this time he goes. Nineveh is a very great city, a three days' walk. Jonah preaches, \"Yet forty days and Nineveh will be overthrown.\" The people believe God, proclaim a fast and put on sackcloth, from the greatest to the least. Even the king sits in ashes and orders everyone, even animals, to fast and \"turn from his wicked way.\" God sees and relents.",
    v: [
      ["3:1", "The word of the LORD came to Jonah the second time", "The word of the LORD came to Jonah a second time. God gives His runaway prophet another chance."],
      ["3:4", "Yet forty days and Nineveh will be overthrown", "An eight-word sermon in English, five in Hebrew."],
      ["3:5", "The people of Nineveh believed in God", "Jonah preached a short warning, and the people of Nineveh believed God. From the greatest to the least, they fasted and wore sackcloth."],
      ["3:10", "God relented concerning the calamity", "When God saw them turn from their evil ways, He relented and did not bring the disaster He had warned about."],
    ],
    bg: [["Nineveh", "Nineveh's ruins lie across the Tigris from modern Mosul, Iraq. Its walls ran nearly eight miles around. The Assyrians were famous for cruelty, which is why Jonah did not want them spared.", "strong", ["kitchen", "stuartM"]]],
    refs: [["LUK.11", "Luke 11:30-32", "The men of Nineveh repented"], ["JER.18", "Jeremiah 18:7-8", "If that nation turns"]],
  },
  4: {
    intro: "Jonah is furious that God spared Nineveh: \"I knew that You are a gracious and compassionate God, slow to anger and abundant in lovingkindness.\" He sits outside the city to watch. God appoints a plant to shade him, then a worm to kill it, then a scorching wind. Jonah wants to die. God asks: \"You had compassion on the plant... Should I not have compassion on Nineveh, the great city, in which there are more than 120,000 persons who do not know the difference between their right and left hand, as well as many animals?\" The book ends with God's question.",
    v: [
      ["4:2", "I knew that You are a gracious and compassionate God", "Jonah admits why he ran: he knew God is gracious and compassionate, slow to anger and full of love (Exodus 34:6), and he did not want Nineveh spared."],
      ["4:4", "Do you have good reason to be angry?", "God does not scold Jonah. He asks a gentle question: is it right for you to be angry?"],
      ["4:10", "You had compassion on the plant", "Jonah cared about a plant that gave him shade. Should God not care about a great city of 120,000 people, and even its animals (4:11)? The book ends with God's question."],
      ["4:11", "Should I not have compassion on Nineveh?", "The book ends with a question for every reader."],
    ],
    refs: [["EXO.34", "Exodus 34:6", "God's character"], ["LUK.15", "Luke 15:25-32", "The older brother's anger"], ["1TI.2", "1 Timothy 2:3-4", "God desires all to be saved"]],
  },
});
