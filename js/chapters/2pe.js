// 2 Peter chapter notes.
import { makeBook } from "./make.js";

const sources = {
  schreinerP: "Thomas R. Schreiner, 1, 2 Peter, Jude, New American Commentary 37 (Broadman and Holman, 2003).",
  green2P: "Gene L. Green, Jude and 2 Peter, Baker Exegetical Commentary on the New Testament (Baker Academic, 2008).",
  bauckham: "Richard J. Bauckham, Jude, 2 Peter, Word Biblical Commentary 50 (Word, 1983).",
  mooP: "Douglas J. Moo, 2 Peter and Jude, NIV Application Commentary (Zondervan, 1996).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["schreinerP", "green2P"] }, {
  1: {
    intro: "Simon Peter writes that God's divine power \"has granted to us everything pertaining to life and godliness.\" So add to your faith moral excellence, knowledge, self-control, perseverance, godliness, brotherly kindness and love; if these are yours and growing, you will be useful and fruitful. Peter knows his death is near, as the Lord showed him, so he wants to remind them. He was not following clever stories: \"we were eyewitnesses of His majesty\" on the holy mountain, when the voice said, \"This is My beloved Son.\" And prophecy did not come from human will, \"but men moved by the Holy Spirit spoke from God.\"",
    v: [
      ["1:3", "His divine power has granted to us everything pertaining to life and godliness", "Everything we need."],
      ["1:4", "That by them you may become partakers of the divine nature", "Sharing God's life."],
      ["1:5", "Applying all diligence, in your faith supply moral excellence", "A ladder of growth."],
      ["1:8", "If these qualities are yours and are increasing, they render you neither useless nor unfruitful", "Fruitful."],
      ["1:16", "We were eyewitnesses of His majesty", "Peter saw it."],
      ["1:21", "Men moved by the Holy Spirit spoke from God", "Where Scripture comes from."],
    ],
    w: [["moved", "pherō", "G5342", "to carry, bear along", "The same word Luke uses for a ship driven along by the wind (Acts 27:15, 17). The prophets were carried along by the Spirit as they spoke.", ["bdag", "green2P"]]],
    refs: [["MAT.17", "Matthew 17:1-8", "The transfiguration"], ["JHN.21", "John 21:18-19", "Jesus foretells Peter's death"], ["2TI.3", "2 Timothy 3:16", "God-breathed Scripture"]],
  },
  2: {
    intro: "Just as false prophets arose in Israel, false teachers will arise among believers, bringing destructive ideas and even denying the Master who bought them. In their greed they will exploit people with false words. But God knows how to judge and how to rescue: He did not spare the angels who sinned or the ancient world, but He protected Noah, \"a preacher of righteousness.\" He judged Sodom and Gomorrah but rescued righteous Lot. \"The Lord knows how to rescue the godly from temptation.\" These teachers promise freedom while they themselves are slaves of corruption, like Balaam who loved the wages of wrongdoing.",
    v: [
      ["2:1", "There will also be false teachers among you", "A warning."],
      ["2:5", "Preserved Noah, a preacher of righteousness", "Noah kept safe."],
      ["2:7", "He rescued righteous Lot", "Lot rescued."],
      ["2:9", "The Lord knows how to rescue the godly from temptation", "God rescues."],
      ["2:15", "Balaam... who loved the wages of unrighteousness", "Greedy teachers."],
      ["2:19", "Promising them freedom while they themselves are slaves", "False freedom."],
    ],
    refs: [["GEN.6", "Genesis 6-8", "Noah and the flood"], ["GEN.19", "Genesis 19", "Sodom and Lot"], ["NUM.22", "Numbers 22", "Balaam's donkey"], ["JUD.1", "Jude 4-16", "Jude's similar warning"]],
  },
  3: {
    intro: "Mockers will come, saying, \"Where is the promise of His coming?\" But they forget that the world was formed by God's word and once destroyed by water. \"With the Lord one day is like a thousand years, and a thousand years like one day. The Lord is not slow about His promise, as some count slowness, but is patient toward you, not wishing for any to perish but for all to come to repentance.\" The day of the Lord will come like a thief, and the elements will be destroyed by fire. \"We are looking for new heavens and a new earth, in which righteousness dwells.\" Peter mentions \"our beloved brother Paul,\" whose letters some twist like the rest of Scripture. \"Grow in the grace and knowledge of our Lord and Savior Jesus Christ.\"",
    v: [
      ["3:4", "Where is the promise of His coming?", "Mockers."],
      ["3:8", "With the Lord one day is like a thousand years", "God's timing."],
      ["3:9", "Not wishing for any to perish but for all to come to repentance", "God's patience."],
      ["3:10", "The day of the Lord will come like a thief", "Unexpected."],
      ["3:13", "New heavens and a new earth, in which righteousness dwells", "A new creation."],
      ["3:16", "As also in all his letters... the rest of the Scriptures", "Paul's letters as Scripture."],
      ["3:18", "Grow in the grace and knowledge of our Lord and Savior Jesus Christ", "Keep growing."],
    ],
    refs: [["PSA.90", "Psalm 90:4", "A thousand years like a day"], ["ISA.65", "Isaiah 65:17", "New heavens and a new earth"], ["REV.21", "Revelation 21:1", "All things new"], ["MAT.24", "Matthew 24:43", "Like a thief"]],
  },
});
