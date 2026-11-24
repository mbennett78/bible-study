// Philippians chapter notes. Chapter 4 keeps its full notes in notes.js.
import { makeBook } from "./make.js";

const sources = {
  feeP: "Gordon D. Fee, Paul's Letter to the Philippians, New International Commentary on the New Testament (Eerdmans, 1995).",
  silva: "Moisés Silva, Philippians, 2nd ed., Baker Exegetical Commentary on the New Testament (Baker Academic, 2005).",
  hansen: "G. Walter Hansen, The Letter to the Philippians, Pillar New Testament Commentary (Eerdmans, 2009).",
  martinP: "Ralph P. Martin, Philippians, Tyndale New Testament Commentaries (InterVarsity Press, 1987).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["feeP", "silva"] }, {
  1: {
    intro: "Paul and Timothy write to the believers in Philippi. Paul thanks God for their partnership in the gospel from the first day, \"confident of this very thing, that He who began a good work in you will perfect it until the day of Christ Jesus.\" He prays their love will abound more and more in knowledge. Though in chains, Paul sees good coming from it: the whole palace guard has heard about Christ, and others preach more boldly. \"For to me, to live is Christ and to die is gain.\" He urges them to live in a manner worthy of the gospel, standing firm in one spirit.",
    v: [
      ["1:3", "I thank my God in all my remembrance of you", "Thankful for friends."],
      ["1:6", "He who began a good work in you will perfect it", "God finishes what He starts."],
      ["1:9", "That your love may abound still more and more", "Growing love."],
      ["1:12", "My circumstances have turned out for the greater progress of the gospel", "Good from hard times."],
      ["1:21", "For to me, to live is Christ and to die is gain", "Living for Christ."],
      ["1:27", "Conduct yourselves in a manner worthy of the gospel of Christ", "Live it out."],
    ],
    bg: [["Philippi", "Philippi was a Roman colony in Macedonia where many retired soldiers lived, proud of their Roman citizenship. Paul started the church there with Lydia and a jailer's family (Acts 16). He wrote while under guard, probably in Rome around AD 60-62.", "strong", ["feeP", "hansen"]]],
    refs: [["ACT.16", "Acts 16", "The church at Philippi begins"], ["2CO.5", "2 Corinthians 5:8", "At home with the Lord"], ["ROM.8", "Romans 8:28", "God works all things for good"]],
  },
  2: {
    intro: "\"Do nothing from selfishness or empty conceit, but with humility of mind regard one another as more important than yourselves.\" \"Have this attitude in yourselves which was also in Christ Jesus, who, although He existed in the form of God... emptied Himself, taking the form of a bond-servant... He humbled Himself by becoming obedient to the point of death, even death on a cross. For this reason also, God highly exalted Him... so that at the name of Jesus every knee will bow.\" \"Work out your salvation with fear and trembling; for it is God who is at work in you.\" Do all things without grumbling, shining as lights in the world. Paul commends Timothy and Epaphroditus, who nearly died serving.",
    v: [
      ["2:3", "Regard one another as more important than yourselves", "Others first."],
      ["2:5", "Have this attitude in yourselves which was also in Christ Jesus", "The mind of Christ."],
      ["2:7", "Emptied Himself, taking the form of a bond-servant", "Jesus the servant."],
      ["2:10", "At the name of Jesus every knee will bow", "Jesus is Lord."],
      ["2:13", "It is God who is at work in you", "God's work in us."],
      ["2:14", "Do all things without grumbling or disputing", "No complaining."],
      ["2:15", "You appear as lights in the world", "Shine."],
    ],
    bg: [["An early hymn", "Many scholars think 2:6-11 was a hymn sung by early believers, or a poem Paul wrote, about Christ's journey from glory to the cross and back to glory. Either way, it shows that within thirty years of the cross, believers worshiped Jesus as God.", "debated", ["martinP", "feeP"]]],
    refs: [["ISA.45", "Isaiah 45:23", "Every knee will bow"], ["ISA.53", "Isaiah 53:12", "He poured out Himself to death"], ["JHN.13", "John 13:1-17", "Jesus washes feet"], ["MAT.5", "Matthew 5:14-16", "The light of the world"]],
  },
  3: {
    intro: "\"Rejoice in the Lord.\" Paul warns about those who trust in circumcision. If anyone could trust in his record, Paul could: circumcised the eighth day, of Israel, of Benjamin, a Pharisee, zealous, blameless under the Law. \"But whatever things were gain to me, those things I have counted as loss for the sake of Christ.\" He wants to know Christ, the power of His resurrection and the fellowship of His sufferings. He has not arrived yet, but \"forgetting what lies behind and reaching forward to what lies ahead, I press on toward the goal for the prize of the upward call of God in Christ Jesus.\" \"Our citizenship is in heaven.\"",
    v: [
      ["3:1", "Rejoice in the Lord", "Joy again."],
      ["3:7", "Those things I have counted as loss for the sake of Christ", "Worth more than anything."],
      ["3:9", "Not having a righteousness of my own... but that which is through faith in Christ", "A gift of righteousness."],
      ["3:10", "That I may know Him and the power of His resurrection", "Knowing Jesus."],
      ["3:13", "Forgetting what lies behind and reaching forward to what lies ahead", "Moving forward."],
      ["3:14", "I press on toward the goal", "Keep running."],
      ["3:20", "Our citizenship is in heaven", "Our true home."],
    ],
    bg: [["Citizens of heaven", "Philippi's people were proud to be citizens of Rome even though they lived far away. Paul tells believers they are citizens of heaven, living here as its representatives while they wait for their Savior.", "strong", ["hansen", "feeP"]]],
    refs: [["ACT.23", "Acts 23:6", "A Pharisee"], ["GAL.2", "Galatians 2:16-20", "Faith in Christ"], ["HEB.12", "Hebrews 12:1-2", "Run the race"], ["1CO.9", "1 Corinthians 9:24-27", "Run to win"]],
  },
});
