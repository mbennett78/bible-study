// Habakkuk chapter notes.
import { makeBook } from "./make.js";

const sources = {
  robertson: "O. Palmer Robertson, The Books of Nahum, Habakkuk, and Zephaniah, New International Commentary on the Old Testament (Eerdmans, 1990).",
  smithR: "Ralph L. Smith, Micah-Malachi, Word Biblical Commentary 32 (Word, 1984).",
  baker2: "David W. Baker, Nahum, Habakkuk and Zephaniah, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["robertson", "baker2"] }, {
  1: {
    intro: "Habakkuk does something unusual: instead of speaking for God to the people, he questions God. \"How long, O LORD, will I call for help, and You will not hear?\" Violence and injustice fill Judah. God answers that He is raising up the Chaldeans (Babylonians), a fierce and swift nation. That troubles Habakkuk even more: \"Your eyes are too pure to approve evil... Why are You silent when the wicked swallow up those more righteous than they?\"",
    v: [
      ["1:2", "How long, O LORD, will I call for help?", "It is okay to bring honest questions to God."],
      ["1:5", "I am doing something in your days you would not believe", "Habakkuk asked why God allowed injustice. God answers that He is doing something they would not believe. Paul quotes this in Acts 13:41."],
      ["1:6", "I am raising up the Chaldeans", "God is raising up the Babylonians (Chaldeans), a fierce nation, to judge Judah. He can use even a pagan empire."],
      ["1:13", "Your eyes are too pure to approve evil", "Habakkuk's second question: God is too pure to look on evil, so how can He use people more wicked than Judah?"],
    ],
    refs: [["PSA.13", "Psalm 13:1", "How long, O LORD?"], ["JOB.21", "Job 21:7", "Why do the wicked prosper?"], ["ACT.13", "Acts 13:41", "Paul quotes Habakkuk 1:5"]],
  },
  2: {
    intro: "Habakkuk stations himself on the watchtower to see how God will answer. God tells him to write the vision plainly on tablets so a runner can read it: it will come at the appointed time; though it tarries, wait for it. \"The righteous will live by his faith.\" Five woes follow against the proud oppressor. \"The earth will be filled with the knowledge of the glory of the LORD, as the waters cover the sea.\" \"The LORD is in His holy temple. Let all the earth be silent before Him.\"",
    v: [
      ["2:1", "I will stand on my guard post", "Habakkuk climbs to his lookout post to wait and see how God will answer his complaint."],
      ["2:3", "Though it tarries, wait for it; for it will certainly come", "The vision is for an appointed time. If it seems slow, wait for it; it will surely come and will not be late."],
      ["2:4", "The righteous will live by his faith", "Quoted three times in the New Testament."],
      ["2:14", "As the waters cover the sea", "The earth will be filled with the knowledge of the LORD's glory as the waters cover the sea (Isaiah 11:9)."],
      ["2:20", "The LORD is in His holy temple. Let all the earth be silent before Him", "After woes on idols that cannot speak (2:18-19), Habakkuk says: the LORD is in His holy temple. Let all the earth be silent before Him."],
    ],
    w: [["אֱמוּנָה", "emunah", "H530", "faithfulness, faith", "Steady trust that holds on. The New Testament reads it as faith in God that saves (Romans 1:17).", ["halot", "robertson"]]],
    refs: [["ROM.1", "Romans 1:17", "The righteous will live by faith"], ["GAL.3", "Galatians 3:11", "Not by the Law"], ["HEB.10", "Hebrews 10:37-38", "He who is coming will come"], ["ISA.11", "Isaiah 11:9", "As the waters cover the sea"]],
  },
  3: {
    intro: "Habakkuk's prayer is a song. \"LORD, revive Your work in the midst of the years; in wrath remember mercy.\" He pictures God marching out as at the Exodus and Sinai, with mountains shaking and the sun and moon standing still. He trembles but chooses to wait. Then comes one of the great statements of faith: though the fig tree does not blossom and there is no fruit, no flock and no herd, \"yet I will exult in the LORD, I will rejoice in the God of my salvation.\" God makes his feet like a deer's on the heights.",
    v: [
      ["3:2", "In wrath remember mercy", "Habakkuk has heard of God's deeds and stands in awe. He prays: renew Your work in our day, and in wrath remember mercy."],
      ["3:16", "I must wait quietly for the day of distress", "The coming invasion makes Habakkuk tremble, yet he will wait quietly for the day of trouble."],
      ["3:17", "Though the fig tree should not blossom", "Even if the fig tree does not bud, the vines have no grapes, the fields fail and the stalls are empty, yet I will rejoice in the LORD (3:18)."],
      ["3:18", "Yet I will exult in the LORD", "Joy that does not depend on circumstances."],
      ["3:19", "He has made my feet like hinds' feet", "The Sovereign LORD is my strength. He makes my feet like a deer's, able to walk safely on the heights."],
    ],
    bg: [["A psalm with music notes", "The chapter begins \"on Shigionoth\" and ends \"for the choir director, on my stringed instruments,\" and uses \"Selah\" three times, the same musical terms found in the Psalms. It was meant to be sung.", "good", ["robertson", "smithR"]]],
    refs: [["PSA.18", "Psalm 18:33", "Feet like the deer"], ["PHP.4", "Philippians 4:11-13", "Content in every circumstance"], ["JOS.10", "Joshua 10:12-13", "Sun and moon stood still"]],
  },
});
