// Jude chapter notes.
import { makeBook } from "./make.js";

const sources = {
  bauckham: "Richard J. Bauckham, Jude, 2 Peter, Word Biblical Commentary 50 (Word, 1983).",
  green2P: "Gene L. Green, Jude and 2 Peter, Baker Exegetical Commentary on the New Testament (Baker Academic, 2008).",
  schreinerP: "Thomas R. Schreiner, 1, 2 Peter, Jude, New American Commentary 37 (Broadman and Holman, 2003).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["bauckham", "schreinerP"] }, {
  1: {
    intro: "Jude, a bond-servant of Jesus Christ and brother of James, meant to write about the salvation they share, but instead urges them \"to contend earnestly for the faith which was once for all handed down to the saints.\" Certain people have crept in, turning God's grace into an excuse for immorality and denying Jesus Christ. Jude reminds them of judgment on unbelieving Israel, the rebellious angels and Sodom, and compares these people to Cain, Balaam and Korah: \"clouds without water... trees without fruit.\" But you, beloved, build yourselves up in your most holy faith, pray in the Holy Spirit, keep yourselves in the love of God, and have mercy on those who doubt. Then one of the Bible's great blessings: \"Now to Him who is able to keep you from stumbling, and to make you stand in the presence of His glory blameless with great joy.\"",
    v: [
      ["1:1", "To those who are the called, beloved in God the Father, and kept for Jesus Christ", "Called, loved, kept."],
      ["1:3", "Contend earnestly for the faith which was once for all handed down to the saints", "Stand for the faith."],
      ["1:12", "Clouds without water, carried along by winds", "Empty promises."],
      ["1:20", "Building yourselves up on your most holy faith, praying in the Holy Spirit", "Build up."],
      ["1:21", "Keep yourselves in the love of God", "Stay in His love."],
      ["1:22", "Have mercy on some, who are doubting", "Mercy for doubters."],
      ["1:24", "Now to Him who is able to keep you from stumbling", "He keeps us."],
    ],
    bg: [["Jude, brother of James", "Jude (Judas in Greek) is most likely another half-brother of Jesus (Mark 6:3), like James. Like James, he does not call himself Jesus' brother, only His servant. He quotes from Jewish writings his readers knew, such as 1 Enoch, to make his point.", "strong", ["bauckham", "green2P"]]],
    why: "Jude's closing blessing (verses 24-25) is often sung or spoken at the end of worship. It reminds anxious believers that God Himself keeps them.",
    refs: [["MRK.6", "Mark 6:3", "Jesus' brothers"], ["NUM.16", "Numbers 16", "Korah's rebellion"], ["2PE.2", "2 Peter 2", "Peter's warning"], ["GEN.19", "Genesis 19", "Sodom"]],
  },
});
