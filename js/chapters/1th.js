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
      ["1:3", "Your work of faith and labor of love and steadfastness of hope", "Paul's favorite trio, faith, love and hope (1 Corinthians 13:13), each one shown in action: work, labor and endurance."],
      ["1:5", "Our gospel did not come to you in word only, but also in power", "The gospel came with words, but also with the Holy Spirit's power and deep conviction. Lives were changed."],
      ["1:6", "Having received the word in much tribulation with the joy of the Holy Spirit", "The church in Thessalonica began under persecution (Acts 17:5-9), yet they welcomed the message with joy from the Spirit."],
      ["1:8", "The word of the Lord has sounded forth from you", "Their faith became known everywhere, like a sound echoing across the region. A changed church is its own sermon."],
      ["1:9", "You turned to God from idols to serve a living and true God", "Three verbs tell their story: they turned to God, from idols, to serve Him. Conversion means a whole new direction."],
      ["1:10", "To wait for His Son from heaven", "Christians live in between: serving now and waiting for Jesus, who rescues us from the coming wrath."],
    ],
    bg: [["A young church", "Paul started the church in Thessalonica, a busy port and capital of Macedonia, but had to leave after only a few weeks because of a riot (Acts 17). He wrote this letter from Corinth around AD 50, making it one of the earliest New Testament books.", "strong", ["weima", "green"]]],
    refs: [["ACT.17", "Acts 17:1-10", "Paul in Thessalonica"], ["1CO.13", "1 Corinthians 13:13", "Faith, hope, love"], ["PSA.115", "Psalm 115:4-8", "Idols cannot see or hear"]],
  },
  2: {
    intro: "Paul reminds them how he came to them after being mistreated in Philippi. He did not use flattery or seek glory; \"we proved to be gentle among you, as a nursing mother tenderly cares for her own children.\" He worked night and day so as not to be a burden, and encouraged each one like a father. They received God's word not as human words, \"but for what it really is, the word of God.\" Paul longed to see them again, but Satan hindered him. \"For you are our glory and joy.\"",
    v: [
      ["2:4", "Not as pleasing men, but God who examines our hearts", "Paul's message was not shaped to win applause. He answered to God, who sees the heart."],
      ["2:7", "As a nursing mother tenderly cares for her own children", "Paul could have used his authority as an apostle (2:6). Instead he was gentle, like a mother caring for her little ones."],
      ["2:8", "We were well-pleased to impart to you not only the gospel of God but also our own lives", "Paul and his friends shared not just a message but their lives. People mattered to them."],
      ["2:11", "As a father would his own children", "Like a good father, Paul encouraged, comforted and urged each of them to live in a way worthy of God."],
      ["2:13", "You accepted it not as the word of men, but for what it really is, the word of God", "They heard human voices, but they recognized God speaking, and that word went to work in them."],
      ["2:20", "You are our glory and joy", "Paul's greatest joy and reward are not achievements but people who know and follow Jesus."],
    ],
    refs: [["ACT.16", "Acts 16:22-24", "Mistreated at Philippi"], ["ACT.18", "Acts 18:3", "Paul the tentmaker"], ["GAL.1", "Galatians 1:10", "Pleasing God, not men"]],
  },
  3: {
    intro: "Paul could not stand the waiting, so he sent Timothy to strengthen and encourage them, worried that the tempter might have shaken them through their troubles. Timothy came back with good news of their faith and love, and that they longed to see Paul too. \"For now we really live, if you stand firm in the Lord.\" Paul prays night and day to see them, and asks that the Lord would make them increase and abound in love for one another and for all people.",
    v: [
      ["3:2", "To strengthen and encourage you as to your faith", "Paul could not go back to Thessalonica himself, so he sent Timothy to strengthen the young church."],
      ["3:3", "So that no one would be disturbed by these afflictions", "Paul had warned them that trouble would come (3:4). Suffering does not mean God has abandoned His people."],
      ["3:6", "Timothy has come to us from you, and has brought us good news", "Timothy returned with news of their faith and love. Paul uses the word for \"good news\" usually used of the gospel itself."],
      ["3:8", "For now we really live, if you stand firm in the Lord", "Paul says their faithfulness makes him come alive again. Other believers' growth is one of life's deepest joys."],
      ["3:12", "May the Lord cause you to increase and abound in love", "Paul prays that their love will overflow, both for each other and for everyone else."],
      ["3:13", "So that He may establish your hearts without blame in holiness", "Love now prepares believers to stand blameless before God when Jesus returns with all His holy ones."],
    ],
    refs: [["ACT.17", "Acts 17:14-15", "Timothy stays behind"], ["2TI.3", "2 Timothy 3:12", "All who live godly will be persecuted"], ["PHP.1", "Philippians 1:9", "Love that abounds"]],
  },
  4: {
    intro: "\"This is the will of God, your sanctification.\" Paul urges sexual purity and self-control, \"for God has not called us for the purpose of impurity, but in sanctification.\" They already love one another, but they should do so more and more, \"make it your ambition to lead a quiet life and attend to your own business and work with your hands.\" Then comfort about believers who have died: \"we do not want you to be uninformed... so that you will not grieve as do the rest who have no hope.\" \"The Lord Himself will descend from heaven with a shout... and the dead in Christ will rise first. Then we who are alive and remain will be caught up together with them... and so we shall always be with the Lord. Therefore comfort one another with these words.\"",
    v: [
      ["4:3", "This is the will of God, your sanctification", "People often wonder what God's will is for their lives. Here is part of it, plainly: be holy, especially in sexual purity."],
      ["4:9", "You yourselves are taught by God to love one another", "They did not need a lesson on loving each other; God Himself had taught them. Paul urges them to keep growing in it."],
      ["4:11", "Make it your ambition to lead a quiet life", "Not ambition for fame, but for a quiet life, minding your own business and working, so outsiders respect the faith (4:12)."],
      ["4:13", "So that you will not grieve as do the rest who have no hope", "Christians grieve when loved ones die, but not without hope, because Jesus died and rose again (4:14)."],
      ["4:16", "The Lord Himself will descend from heaven with a shout", "Jesus' return will be personal (\"the Lord Himself\"), loud and public, and the dead in Christ will rise first."],
      ["4:17", "So we shall always be with the Lord", "Christians differ on the details of the end times, but this promise is clear: believers will be with the Lord forever."],
      ["4:18", "Comfort one another with these words", "Paul gave this teaching to comfort grieving people. It is meant to be shared at funerals and hospital beds."],
    ],
    w: [["caught up", "harpazō", "G726", "to snatch, seize, catch up", "To take suddenly and with force. The Latin translation used the word rapiemur, from which the English word \"rapture\" comes.", ["bdag", "weima"]]],
    views: [["When are believers \"caught up\"?", "Some believers read this as a gathering of the church before a time of great tribulation. Others read it as happening at the end of the tribulation, when Christ returns visibly. Others read it as part of one single return of Christ at the end of history, when believers rise to meet Him like a welcoming party and return with Him. All agree that Jesus will come back, the dead in Christ will rise, and believers will be with the Lord forever.", ["weima", "green", "fee12"]]],
    bg: [["Meeting the King", "The word for \"meet\" (apantēsis) was used when citizens went out of the city to greet an arriving king or official and then escorted him back in. Many scholars think Paul uses that picture here.", "good", ["weima", "green"]]],
    refs: [["1CO.15", "1 Corinthians 15:51-52", "Changed at the last trumpet"], ["JHN.14", "John 14:1-3", "I will come again"], ["ACT.1", "Acts 1:11", "He will come the same way"]],
  },
  5: {
    intro: "The day of the Lord will come like a thief in the night, when people say, \"Peace and safety!\" But believers are not in darkness; they are children of light and of the day. So stay alert and sober, \"having put on the breastplate of faith and love, and as a helmet, the hope of salvation. For God has not destined us for wrath, but for obtaining salvation through our Lord Jesus Christ.\" \"Encourage one another and build up one another.\" Then a string of short commands: \"Rejoice always; pray without ceasing; in everything give thanks; for this is God's will for you in Christ Jesus.\"",
    v: [
      ["5:2", "The day of the Lord will come just like a thief in the night", "A thief does not send a note ahead. The Lord's return will be sudden, so believers live ready every day."],
      ["5:5", "You are all sons of light and sons of day", "Believers are not caught off guard like people asleep in the dark. They belong to the day, so they stay awake and clear-headed."],
      ["5:9", "God has not destined us for wrath, but for obtaining salvation", "For those in Christ, the future holds salvation, not wrath, because He \"died for us\" (5:10)."],
      ["5:11", "Encourage one another and build up one another", "Hope in Christ is meant to be shared. Paul tells them to keep doing what they are already doing: building each other up."],
      ["5:16", "Rejoice always", "Always joy. Verses 16-18 are three short commands that even young children can memorize: rejoice, pray, give thanks."],
      ["5:17", "Pray without ceasing", "Not nonstop words, but a life in steady conversation with God, turning to Him all day long."],
      ["5:18", "In everything give thanks", "Not thankful for every evil, but thankful in every situation, because God is still good and still at work."],
      ["5:21", "Examine everything carefully; hold fast to that which is good", "Do not believe everything or reject everything. Test what you hear against God's truth, keep what is good, and turn from every kind of evil (5:22)."],
    ],
    refs: [["MAT.24", "Matthew 24:42-44", "Like a thief"], ["EPH.6", "Ephesians 6:14-17", "Breastplate and helmet"], ["PHP.4", "Philippians 4:4-6", "Rejoice and pray"]],
  },
});
