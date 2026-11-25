// 2 Thessalonians chapter notes.
import { makeBook } from "./make.js";

const sources = {
  weima: "Jeffrey A. D. Weima, 1-2 Thessalonians, Baker Exegetical Commentary on the New Testament (Baker Academic, 2014).",
  green: "Gene L. Green, The Letters to the Thessalonians, Pillar New Testament Commentary (Eerdmans, 2002).",
  fee12: "Gordon D. Fee, The First and Second Letters to the Thessalonians, New International Commentary on the New Testament (Eerdmans, 2009).",
  stottT: "John Stott, The Message of 1 and 2 Thessalonians, The Bible Speaks Today (InterVarsity Press, 1991).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["weima", "green"] }, {
  1: {
    intro: "Paul thanks God that the Thessalonians' faith is growing and their love for each other is increasing, even under persecution. God is just: He will give relief to those who suffer and bring justice when the Lord Jesus is revealed from heaven with His mighty angels. On that day He will be glorified in His saints. Paul prays that God would count them worthy of their calling and fulfill every desire for goodness, \"so that the name of our Lord Jesus will be glorified in you, and you in Him.\"",
    v: [
      ["1:3", "Your faith is greatly enlarged, and the love of each one of you toward one another grows ever greater", "Paul thanks God because their faith and love are growing, and not slowly, but \"greatly.\""],
      ["1:4", "Your perseverance and faith in the midst of all your persecutions", "Paul brags to other churches about this church's faithful endurance under persecution."],
      ["1:6", "It is only just for God to repay with affliction those who afflict you", "God sees how His people are treated. He will set things right, so believers do not have to take revenge."],
      ["1:7", "When the Lord Jesus will be revealed from heaven", "Relief for the suffering will come when Jesus is revealed from heaven with His mighty angels."],
      ["1:11", "That our God will count you worthy of your calling", "Paul prays that God will make them worthy of His call and complete every good desire and work of faith."],
      ["1:12", "So that the name of our Lord Jesus will be glorified in you", "The goal of everything: that Jesus' name is honored in them, and they in Him."],
    ],
    bg: [["A follow-up letter", "Paul wrote this second letter a few months after the first, around AD 50-51. Persecution had grown worse, and someone had confused the believers by claiming the day of the Lord had already come.", "strong", ["weima", "fee12"]]],
    refs: [["1TH.1", "1 Thessalonians 1:3-6", "Their faith in trouble"], ["ROM.12", "Romans 12:19", "Vengeance is Mine"], ["MAT.25", "Matthew 25:31", "The Son of Man comes in glory"]],
  },
  2: {
    intro: "Some claimed, even with a fake letter from Paul, that the day of the Lord had already come. Paul says not to be shaken: that day will not come until the apostasy comes and the man of lawlessness is revealed, who sets himself up as God. Something is restraining him now, but the Lord Jesus will destroy him by the breath of His mouth and the brightness of His coming. Paul thanks God that He chose them for salvation \"through sanctification by the Spirit and faith in the truth.\" \"So then, brethren, stand firm and hold to the traditions which you were taught.\"",
    v: [
      ["2:2", "That you not be quickly shaken from your composure", "Someone was saying the day of the Lord had already come. Paul tells them not to be shaken or alarmed."],
      ["2:3", "Let no one in any way deceive you", "Paul says certain things must happen first, including a great rebellion and \"the man of lawlessness.\" Christians differ on the details, but the warning is clear: do not be deceived."],
      ["2:8", "Whom the Lord will slay with the breath of His mouth", "However powerful evil seems, Jesus will defeat it with a breath when He appears."],
      ["2:13", "God has chosen you from the beginning for salvation", "Paul gives thanks that God chose them for salvation, through the Spirit's work and their belief in the truth."],
      ["2:15", "Stand firm and hold to the traditions which you were taught", "\"Traditions\" here means the apostles' teaching, given by word of mouth and by letter. Believers hold on to it."],
      ["2:16", "Gave us eternal comfort and good hope by grace", "God loved us and gave eternal comfort and good hope as a gift of grace, not something earned."],
    ],
    views: [["Who or what is the \"restrainer\" (2:6-7)?", "Some think it is the Holy Spirit working through the church. Others think it is the rule of law and government that holds back chaos. Others think it is an angel such as Michael, or the preaching of the gospel. Paul says the readers already knew what he meant, but we do not know for sure. All agree that God is in control and that Christ will defeat evil.", ["weima", "green", "fee12"]]],
    refs: [["DAN.7", "Daniel 7:25", "He will speak against the Most High"], ["DAN.11", "Daniel 11:36", "He will exalt himself"], ["MAT.24", "Matthew 24:4-24", "Do not be misled"], ["1JN.2", "1 John 2:18", "Many antichrists"]],
  },
  3: {
    intro: "Paul asks them to pray that the word of the Lord will spread rapidly and that he will be rescued from evil people. \"The Lord is faithful, and He will strengthen and protect you from the evil one.\" Some believers have quit working and become busybodies, perhaps thinking the Lord's return made work pointless. Paul reminds them that he worked night and day to set an example: \"if anyone is not willing to work, then he is not to eat.\" \"Do not grow weary of doing good.\" He signs it with his own hand: \"The grace of our Lord Jesus Christ be with you all.\"",
    v: [
      ["3:1", "Pray for us that the word of the Lord will spread rapidly", "Praying for the gospel."],
      ["3:3", "The Lord is faithful, and He will strengthen and protect you", "God protects."],
      ["3:5", "May the Lord direct your hearts into the love of God", "Hearts directed."],
      ["3:10", "If anyone is not willing to work, then he is not to eat", "Work matters. \"If anyone is not willing to work\" is about people who can work but refuse, not those who cannot work or cannot find work. The same letters call believers to help the weak (1 Thessalonians 5:14)."],
      ["3:13", "Do not grow weary of doing good", "Keep doing good."],
      ["3:16", "May the Lord of peace Himself continually grant you peace in every circumstance", "Peace always."],
    ],
    refs: [["1TH.4", "1 Thessalonians 4:11-12", "Work with your hands"], ["GAL.6", "Galatians 6:9", "Do not lose heart"], ["PRO.6", "Proverbs 6:6-11", "Learn from the ant"]],
  },
});
