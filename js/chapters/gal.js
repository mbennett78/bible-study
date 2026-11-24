// Galatians chapter notes.
import { makeBook } from "./make.js";

const sources = {
  mooG: "Douglas J. Moo, Galatians, Baker Exegetical Commentary on the New Testament (Baker Academic, 2013).",
  bruceG: "F. F. Bruce, The Epistle to the Galatians, New International Greek Testament Commentary (Eerdmans, 1982).",
  schreinerG: "Thomas R. Schreiner, Galatians, Zondervan Exegetical Commentary on the New Testament (Zondervan, 2010).",
  stottG: "John Stott, The Message of Galatians, The Bible Speaks Today (InterVarsity Press, 1968).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["mooG", "bruceG"] }, {
  1: {
    intro: "Paul skips his usual thanksgiving. He is amazed that the Galatians are so quickly turning to a different gospel, which is really no gospel at all. \"Even if we, or an angel from heaven, should preach to you a gospel contrary to what we have preached to you, he is to be accursed!\" Paul's gospel did not come from people but by a revelation of Jesus Christ. Once he violently persecuted the church; then God, who set him apart from birth, revealed His Son to him. He spent time in Arabia and only later met Peter and James in Jerusalem.",
    v: [
      ["1:4", "Who gave Himself for our sins so that He might rescue us", "Rescued."],
      ["1:6", "I am amazed that you are so quickly deserting Him", "Paul is alarmed."],
      ["1:8", "Even if we, or an angel from heaven, should preach to you a gospel contrary", "One true gospel."],
      ["1:10", "If I were still trying to please men, I would not be a bond-servant of Christ", "Pleasing God."],
      ["1:12", "I received it through a revelation of Jesus Christ", "Where Paul's message came from."],
      ["1:23", "He who once persecuted us is now preaching the faith", "A changed life."],
    ],
    bg: [["Who were the Galatians?", "Galatia was a Roman province in what is now central Turkey. Many scholars think Paul wrote to the churches he started on his first journey (Pisidian Antioch, Iconium, Lystra, Derbe; Acts 13-14). Teachers had arrived saying Gentile believers must be circumcised and keep the Law of Moses to truly belong.", "debated", ["bruceG", "mooG"]]],
    refs: [["ACT.9", "Acts 9:1-22", "Paul's conversion"], ["ACT.13", "Acts 13-14", "Churches in Galatia"], ["JER.1", "Jeremiah 1:5", "Set apart before birth"]],
  },
  2: {
    intro: "Fourteen years later Paul went to Jerusalem with Barnabas and Titus, a Gentile believer, and the leaders did not require Titus to be circumcised. James, Peter and John gave Paul the right hand of fellowship. Later in Antioch, Peter stopped eating with Gentile believers out of fear, and Paul opposed him to his face, because it denied the gospel. \"A man is not justified by the works of the Law but through faith in Christ Jesus.\" \"I have been crucified with Christ; and it is no longer I who live, but Christ lives in me.\"",
    v: [
      ["2:5", "So that the truth of the gospel would remain with you", "Standing for the truth."],
      ["2:9", "They gave to me and Barnabas the right hand of fellowship", "Partners."],
      ["2:11", "I opposed him to his face", "Loving correction."],
      ["2:16", "A man is not justified by the works of the Law but through faith in Christ Jesus", "Faith, not works."],
      ["2:20", "I have been crucified with Christ; and it is no longer I who live, but Christ lives in me", "A new life."],
      ["2:21", "If righteousness comes through the Law, then Christ died needlessly", "Why the cross."],
    ],
    bg: [["Table fellowship", "Eating together showed you accepted someone as family. When Peter pulled away from Gentile believers, he was saying, without words, that they were second-class. Paul saw this as a denial of the gospel.", "strong", ["mooG", "stottG"]]],
    refs: [["ACT.15", "Acts 15", "The Jerusalem meeting"], ["ACT.10", "Acts 10", "Peter and Cornelius"], ["ROM.6", "Romans 6:6", "Our old self crucified"]],
  },
  3: {
    intro: "\"You foolish Galatians, who has bewitched you?\" Did they receive the Spirit by works of the Law or by hearing with faith? Abraham believed God, and it was credited to him as righteousness, so those who believe are Abraham's children. The Law brings a curse on those who break it, but \"Christ redeemed us from the curse of the Law, having become a curse for us.\" The Law came 430 years after God's promise and could not cancel it; it was a guardian to lead us to Christ. \"For all of you who were baptized into Christ have clothed yourselves with Christ. There is neither Jew nor Greek, there is neither slave nor free man, there is neither male nor female; for you are all one in Christ Jesus.\"",
    v: [
      ["3:1", "You foolish Galatians, who has bewitched you?", "A wake-up call."],
      ["3:6", "Abraham believed God, and it was reckoned to him as righteousness", "Faith like Abraham."],
      ["3:13", "Christ redeemed us from the curse of the Law, having become a curse for us", "He took our curse."],
      ["3:24", "The Law has become our tutor to lead us to Christ", "Pointing to Christ."],
      ["3:27", "All of you who were baptized into Christ have clothed yourselves with Christ", "Clothed with Christ."],
      ["3:28", "You are all one in Christ Jesus", "One family."],
    ],
    w: [["tutor", "paidagōgos", "G3807", "guardian, child-minder", "A trusted household slave who walked a child to school, watched over him and kept him in line until he grew up. Not the teacher, but the guardian until the child came of age.", ["bdag", "bruceG"]]],
    refs: [["GEN.15", "Genesis 15:6", "Abraham believed"], ["DEU.21", "Deuteronomy 21:23", "Cursed is everyone who hangs on a tree"], ["GEN.12", "Genesis 12:3", "All nations blessed"], ["ROM.6", "Romans 6:3-4", "Baptized into His death"]],
  },
  4: {
    intro: "An heir who is a child is no different from a slave until the time set by his father. \"When the fullness of the time came, God sent forth His Son, born of a woman, born under the Law, so that He might redeem those who were under the Law, that we might receive the adoption as sons.\" Because we are sons, God sent the Spirit of His Son into our hearts, crying, \"Abba! Father!\" Why go back to weak and worthless rules? Paul remembers how they welcomed him when he was sick, and he is in labor again until Christ is formed in them. He uses Hagar and Sarah as a picture: believers are children of promise and freedom.",
    v: [
      ["4:4", "When the fullness of the time came, God sent forth His Son", "Right on time."],
      ["4:5", "That we might receive the adoption as sons", "Adopted."],
      ["4:6", "Crying, \"Abba! Father!\"", "Close to God."],
      ["4:7", "You are no longer a slave, but a son; and if a son, then an heir", "Heirs of God."],
      ["4:19", "Until Christ is formed in you", "Growing like Jesus."],
      ["4:28", "You brethren, like Isaac, are children of promise", "Children of promise."],
    ],
    w: [["Abba", "abba", "G5", "Father, dear father", "An Aramaic word a child used for his father, warm and respectful. Jesus prayed this way (Mark 14:36), and the Spirit lets believers pray the same way.", ["bdag", "mooG"]]],
    refs: [["MRK.14", "Mark 14:36", "Jesus prays Abba"], ["ROM.8", "Romans 8:15-17", "The Spirit of adoption"], ["GEN.21", "Genesis 21", "Isaac and Ishmael"]],
  },
  5: {
    intro: "\"It was for freedom that Christ set us free; therefore keep standing firm and do not be subject again to a yoke of slavery.\" If they rely on circumcision for righteousness, they have cut themselves off from Christ. \"In Christ Jesus neither circumcision nor uncircumcision means anything, but faith working through love.\" Freedom is not an excuse for the flesh; rather, \"through love serve one another.\" Walk by the Spirit, and you will not carry out the desire of the flesh. Paul lists the deeds of the flesh, then the fruit of the Spirit: \"love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.\"",
    v: [
      ["5:1", "It was for freedom that Christ set us free", "Stand firm in freedom."],
      ["5:6", "Faith working through love", "Faith that acts."],
      ["5:13", "Through love serve one another", "Freedom to serve."],
      ["5:14", "You shall love your neighbor as yourself", "The whole Law in one word."],
      ["5:16", "Walk by the Spirit, and you will not carry out the desire of the flesh", "Led by the Spirit."],
      ["5:22", "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness", "The fruit of the Spirit. Kids can memorize the fruit of the Spirit as a list of nine, and families can pick one each week to practice together."],
      ["5:25", "If we live by the Spirit, let us also walk by the Spirit", "Keep in step."],
    ],
    w: [["fruit", "karpos", "G2590", "fruit", "Singular: one fruit with nine flavors. Fruit grows naturally from a healthy tree; the Spirit grows these qualities in a believer's life over time.", ["bdag", "stottG"]]],
    refs: [["JHN.15", "John 15:1-8", "Abide and bear fruit"], ["ROM.8", "Romans 8:4-14", "Walking by the Spirit"], ["LEV.19", "Leviticus 19:18", "Love your neighbor"]],
  },
  6: {
    intro: "If someone is caught in a sin, you who are spiritual should restore him gently, watching yourself. \"Bear one another's burdens, and thereby fulfill the law of Christ.\" \"Do not be deceived, God is not mocked; for whatever a man sows, this he will also reap.\" \"Let us not lose heart in doing good, for in due time we will reap if we do not grow weary.\" Paul writes the ending in large letters with his own hand: \"May it never be that I would boast, except in the cross of our Lord Jesus Christ.\" What matters is a new creation.",
    v: [
      ["6:1", "Restore such a one in a spirit of gentleness", "Gentle help."],
      ["6:2", "Bear one another's burdens", "Carry each other."],
      ["6:7", "Whatever a man sows, this he will also reap", "Sowing and reaping."],
      ["6:9", "Let us not lose heart in doing good", "Keep going."],
      ["6:10", "Let us do good to all people, and especially to those who are of the household of the faith", "Do good."],
      ["6:14", "May it never be that I would boast, except in the cross", "Boast in the cross."],
      ["6:15", "But a new creation", "What really counts."],
    ],
    refs: [["MAT.18", "Matthew 18:15", "Go to your brother"], ["HOS.8", "Hosea 8:7", "Sow the wind, reap the whirlwind"], ["2CO.5", "2 Corinthians 5:17", "A new creation"]],
  },
});
