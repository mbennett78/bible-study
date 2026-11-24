// 1 Thessalonians chapter notes.
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
    intro: "Paul, Silvanus and Timothy thank God for the Thessalonians' \"work of faith and labor of love and steadfastness of hope in our Lord Jesus Christ.\" The gospel came to them not only in word but in power and in the Holy Spirit. They welcomed it with joy despite much trouble, and became an example to believers everywhere. People talk about how they \"turned to God from idols to serve a living and true God, and to wait for His Son from heaven.\"",
    v: [
      ["1:3", "Your work of faith and labor of love and steadfastness of hope", "Faith, love and hope."],
      ["1:5", "Our gospel did not come to you in word only, but also in power", "A powerful message."],
      ["1:6", "Having received the word in much tribulation with the joy of the Holy Spirit", "Joy in hard times."],
      ["1:8", "The word of the Lord has sounded forth from you", "Word spreads."],
      ["1:9", "You turned to God from idols to serve a living and true God", "Turning around."],
      ["1:10", "To wait for His Son from heaven", "Waiting for Jesus."],
    ],
    bg: [["A young church", "Paul started the church in Thessalonica, a busy port and capital of Macedonia, but had to leave after only a few weeks because of a riot (Acts 17). He wrote this letter from Corinth around AD 50, making it one of the earliest New Testament books.", "strong", ["weima", "green"]]],
    refs: [["ACT.17", "Acts 17:1-10", "Paul in Thessalonica"], ["1CO.13", "1 Corinthians 13:13", "Faith, hope, love"], ["PSA.115", "Psalm 115:4-8", "Idols cannot see or hear"]],
  },
  2: {
    intro: "Paul reminds them how he came to them after being mistreated in Philippi. He did not use flattery or seek glory; \"we proved to be gentle among you, as a nursing mother tenderly cares for her own children.\" He worked night and day so as not to be a burden, and encouraged each one like a father. They received God's word not as human words, \"but for what it really is, the word of God.\" Paul longed to see them again, but Satan hindered him. \"For you are our glory and joy.\"",
    v: [
      ["2:4", "Not as pleasing men, but God who examines our hearts", "Serving God, not applause."],
      ["2:7", "As a nursing mother tenderly cares for her own children", "Gentle care."],
      ["2:8", "We were well-pleased to impart to you not only the gospel of God but also our own lives", "Sharing life."],
      ["2:11", "As a father would his own children", "Fatherly encouragement."],
      ["2:13", "You accepted it not as the word of men, but for what it really is, the word of God", "God's word."],
      ["2:20", "You are our glory and joy", "People are the prize."],
    ],
    refs: [["ACT.16", "Acts 16:22-24", "Mistreated at Philippi"], ["ACT.18", "Acts 18:3", "Paul the tentmaker"], ["GAL.1", "Galatians 1:10", "Pleasing God, not men"]],
  },
  3: {
    intro: "Paul could not stand the waiting, so he sent Timothy to strengthen and encourage them, worried that the tempter might have shaken them through their troubles. Timothy came back with good news of their faith and love, and that they longed to see Paul too. \"For now we really live, if you stand firm in the Lord.\" Paul prays night and day to see them, and asks that the Lord would make them increase and abound in love for one another and for all people.",
    v: [
      ["3:2", "To strengthen and encourage you as to your faith", "Sending help."],
      ["3:3", "So that no one would be disturbed by these afflictions", "Troubles expected."],
      ["3:6", "Timothy has come to us from you, and has brought us good news", "Good news."],
      ["3:8", "For now we really live, if you stand firm in the Lord", "Joy in others' faith."],
      ["3:12", "May the Lord cause you to increase and abound in love", "Overflowing love."],
      ["3:13", "So that He may establish your hearts without blame in holiness", "Ready for Jesus."],
    ],
    refs: [["ACT.17", "Acts 17:14-15", "Timothy stays behind"], ["2TI.3", "2 Timothy 3:12", "All who live godly will be persecuted"], ["PHP.1", "Philippians 1:9", "Love that abounds"]],
  },
  4: {
    intro: "\"This is the will of God, your sanctification.\" Paul urges sexual purity and self-control, \"for God has not called us for the purpose of impurity, but in sanctification.\" They already love one another, but they should do so more and more, \"make it your ambition to lead a quiet life and attend to your own business and work with your hands.\" Then comfort about believers who have died: \"we do not want you to be uninformed... so that you will not grieve as do the rest who have no hope.\" \"The Lord Himself will descend from heaven with a shout... and the dead in Christ will rise first. Then we who are alive and remain will be caught up together with them... and so we shall always be with the Lord. Therefore comfort one another with these words.\"",
    v: [
      ["4:3", "This is the will of God, your sanctification", "God's will."],
      ["4:9", "You yourselves are taught by God to love one another", "Taught to love."],
      ["4:11", "Make it your ambition to lead a quiet life", "A quiet, faithful life."],
      ["4:13", "So that you will not grieve as do the rest who have no hope", "Grief with hope."],
      ["4:16", "The Lord Himself will descend from heaven with a shout", "Jesus returns."],
      ["4:17", "So we shall always be with the Lord", "Forever with Him."],
      ["4:18", "Comfort one another with these words", "Comfort."],
    ],
    w: [["caught up", "harpazō", "G726", "to snatch, seize, catch up", "To take suddenly and with force. The Latin translation used the word rapiemur, from which the English word \"rapture\" comes.", ["bdag", "weima"]]],
    views: [["When are believers \"caught up\"?", "Some believers read this as a gathering of the church before a time of great tribulation. Others read it as happening at the end of the tribulation, when Christ returns visibly. Others read it as part of one single return of Christ at the end of history, when believers rise to meet Him like a welcoming party and return with Him. All agree that Jesus will come back, the dead in Christ will rise, and believers will be with the Lord forever.", ["weima", "green", "fee12"]]],
    bg: [["Meeting the King", "The word for \"meet\" (apantēsis) was used when citizens went out of the city to greet an arriving king or official and then escorted him back in. Many scholars think Paul uses that picture here.", "good", ["weima", "green"]]],
    refs: [["1CO.15", "1 Corinthians 15:51-52", "Changed at the last trumpet"], ["JHN.14", "John 14:1-3", "I will come again"], ["ACT.1", "Acts 1:11", "He will come the same way"]],
  },
  5: {
    intro: "The day of the Lord will come like a thief in the night, when people say, \"Peace and safety!\" But believers are not in darkness; they are children of light and of the day. So stay alert and sober, \"having put on the breastplate of faith and love, and as a helmet, the hope of salvation. For God has not destined us for wrath, but for obtaining salvation through our Lord Jesus Christ.\" \"Encourage one another and build up one another.\" Then a string of short commands: \"Rejoice always; pray without ceasing; in everything give thanks; for this is God's will for you in Christ Jesus.\"",
    v: [
      ["5:2", "The day of the Lord will come just like a thief in the night", "Unexpected."],
      ["5:5", "You are all sons of light and sons of day", "Children of light."],
      ["5:9", "God has not destined us for wrath, but for obtaining salvation", "Destined for salvation."],
      ["5:11", "Encourage one another and build up one another", "Build each other up."],
      ["5:16", "Rejoice always", "Always joy."],
      ["5:17", "Pray without ceasing", "Always prayer."],
      ["5:18", "In everything give thanks", "Always thanks."],
      ["5:21", "Examine everything carefully; hold fast to that which is good", "Test and keep the good."],
    ],
    why: "Verses 16-18 are three short commands that even young children can memorize: rejoice, pray, give thanks.",
    refs: [["MAT.24", "Matthew 24:42-44", "Like a thief"], ["EPH.6", "Ephesians 6:14-17", "Breastplate and helmet"], ["PHP.4", "Philippians 4:4-6", "Rejoice and pray"]],
  },
});
