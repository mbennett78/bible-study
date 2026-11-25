// 2 John chapter notes.
import { makeBook } from "./make.js";

const sources = {
  yarbrough: "Robert W. Yarbrough, 1-3 John, Baker Exegetical Commentary on the New Testament (Baker Academic, 2008).",
  kruseJ: "Colin G. Kruse, The Letters of John, 2nd ed., Pillar New Testament Commentary (Eerdmans, 2020).",
  stottJ: "John Stott, The Letters of John, rev. ed., Tyndale New Testament Commentaries (InterVarsity Press, 1988).",
};

export default makeBook({ lang: "Greek", sources, use: ["yarbrough", "kruseJ"] }, {
  1: {
    intro: "\"The elder to the chosen lady and her children, whom I love in truth.\" John rejoices that some of her children are walking in the truth. He reminds them of the commandment they had from the beginning: \"that we love one another.\" \"This is love, that we walk according to His commandments.\" Many deceivers have gone out who do not confess Jesus Christ as coming in the flesh. Watch yourselves, so you do not lose what you worked for. Do not welcome false teachers into your house or give them a greeting that supports their work. John has much more to say, but hopes to come and speak face to face, \"so that your joy may be made full.\"",
    v: [
      ["1:1", "The elder to the chosen lady and her children, whom I love in truth", "\"The chosen lady and her children\" may be a woman and her family or, as many think, a church and its members."],
      ["1:4", "I was very glad to find some of your children walking in truth", "Nothing made John happier than to hear that believers were living by the truth."],
      ["1:5", "That we love one another", "Love one another is not a new rule; it goes back to the beginning, to Jesus' own words (John 13:34)."],
      ["1:6", "This is love, that we walk according to His commandments", "Love and obedience go together. Loving God means walking in His commands, and His command is to love."],
      ["1:8", "Watch yourselves, that you do not lose what we have accomplished", "False teachers were going around (1:7). Watch out, so that you do not lose what has been built up in you."],
      ["1:12", "I hope to come to you and speak face to face", "John prefers a visit to paper and ink, so that their joy may be complete. Some things are best said in person."],
    ],
    bg: [["The chosen lady", "Many scholars think \"the chosen lady and her children\" is a warm way of naming a local church and its members, since the letter closes with greetings from \"the children of your chosen sister,\" another church. Others think it is a real woman and her family. Either way, John writes with a father's love.", "debated", ["yarbrough", "stottJ"]]],
    refs: [["1JN.4", "1 John 4:1-3", "Test the spirits"], ["JHN.13", "John 13:34-35", "Love one another"], ["3JN.1", "3 John 4", "No greater joy"]],
  },
});
