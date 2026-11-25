// 3 John chapter notes.
import { makeBook } from "./make.js";

const sources = {
  yarbrough: "Robert W. Yarbrough, 1-3 John, Baker Exegetical Commentary on the New Testament (Baker Academic, 2008).",
  kruseJ: "Colin G. Kruse, The Letters of John, 2nd ed., Pillar New Testament Commentary (Eerdmans, 2020).",
  stottJ: "John Stott, The Letters of John, rev. ed., Tyndale New Testament Commentaries (InterVarsity Press, 1988).",
};

export default makeBook({ lang: "Greek", sources, use: ["yarbrough", "kruseJ"] }, {
  1: {
    intro: "The elder writes to his dear friend Gaius: \"I pray that in all respects you may prosper and be in good health, just as your soul prospers.\" Traveling believers have reported how faithfully Gaius walks in the truth. \"I have no greater joy than this, to hear of my children walking in the truth.\" Gaius welcomes traveling teachers, even strangers, and sends them on their way well supplied, which makes him a fellow worker for the truth. But Diotrephes, \"who loves to be first,\" refuses to welcome them and spreads false accusations. \"Do not imitate what is evil, but what is good.\" Demetrius has a good testimony from everyone.",
    v: [
      ["1:2", "I pray that in all respects you may prosper and be in good health", "John prays that his friend Gaius will be in good health in every way, just as his soul is doing well."],
      ["1:4", "I have no greater joy than this, to hear of my children walking in the truth", "The greatest joy. 3 John 4 is a verse many grandparents and parents could say about the family reading this Bible together."],
      ["1:5", "You are acting faithfully in whatever you accomplish for the brethren, and especially when they are strangers", "Gaius welcomed traveling Christian teachers, even ones he had never met. Hospitality was a faithful way to serve."],
      ["1:8", "So that we may be fellow workers with the truth", "When believers support those who go out for the Lord's name, they become partners in spreading the truth."],
      ["1:9", "Diotrephes, who loves to be first among them", "Diotrephes loved being in charge. He refused to welcome John's messengers and threw out those who did (1:10)."],
      ["1:11", "Do not imitate what is evil, but what is good", "Copy what is good, not what is evil. Doing good shows a person belongs to God. Demetrius is held up as a good example (1:12)."],
    ],
    bg: [["Traveling teachers", "There were few inns, and many were rough places. Believers who traveled to teach depended on church families for food, a bed and supplies for the next leg of the journey. Welcoming them was a real way to share in the gospel's spread.", "strong", ["kruseJ", "yarbrough"]]],
    refs: [["2JN.1", "2 John 4", "Children walking in truth"], ["HEB.13", "Hebrews 13:2", "Show hospitality"], ["MAT.20", "Matthew 20:26-28", "Whoever wants to be first"]],
  },
});
