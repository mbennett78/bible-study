// 2 Corinthians chapter notes.
import { makeBook } from "./make.js";

const sources = {
  harris: "Murray J. Harris, The Second Epistle to the Corinthians, New International Greek Testament Commentary (Eerdmans, 2005).",
  guthrie2: "George H. Guthrie, 2 Corinthians, Baker Exegetical Commentary on the New Testament (Baker Academic, 2015).",
  barnett: "Paul Barnett, The Second Epistle to the Corinthians, New International Commentary on the New Testament (Eerdmans, 1997).",
  kruse: "Colin G. Kruse, 2 Corinthians, rev. ed., Tyndale New Testament Commentaries (InterVarsity Press, 2015).",
  murphy: "Jerome Murphy-O'Connor, St. Paul's Corinth: Texts and Archaeology, 3rd ed. (Liturgical Press, 2002).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["harris", "guthrie2"] }, {
  1: {
    intro: "Paul blesses \"the Father of mercies and God of all comfort, who comforts us in all our affliction so that we will be able to comfort those who are in any affliction.\" In Asia he was burdened beyond his strength and even despaired of life, so that he would trust not in himself but in God who raises the dead. Some in Corinth accused Paul of being fickle because he changed his travel plans. He answers that God's promises are all \"yes\" in Christ, and that he stayed away to spare them another painful visit.",
    v: [
      ["1:3", "The Father of mercies and God of all comfort", "God who comforts."],
      ["1:4", "So that we will be able to comfort those who are in any affliction", "Comforted to comfort."],
      ["1:9", "That we would not trust in ourselves, but in God who raises the dead", "Trust when it's hard."],
      ["1:20", "As many as are the promises of God, in Him they are yes", "Yes in Christ."],
      ["1:22", "Gave us the Spirit in our hearts as a pledge", "A down payment."],
    ],
    bg: [["Paul and Corinth after the first letter", "Between 1 and 2 Corinthians, Paul made a painful visit and wrote a severe, tearful letter. Some teachers in Corinth questioned his authority. Second Corinthians, written from Macedonia around AD 56, is Paul's most personal letter.", "strong", ["harris", "barnett"]]],
    w: [["comfort", "paraklēsis", "G3874", "comfort, encouragement", "Literally \"calling alongside.\" God comes alongside us in trouble, and then we come alongside others. The word appears ten times in 1:3-7.", ["bdag", "guthrie2"]]],
    refs: [["ISA.40", "Isaiah 40:1", "Comfort My people"], ["ACT.19", "Acts 19:23-41", "Trouble in Asia"], ["EPH.1", "Ephesians 1:13-14", "Sealed with the Spirit"]],
  },
  2: {
    intro: "Paul wrote his earlier letter \"out of much affliction and anguish of heart... with many tears,\" not to grieve them but so they would know his love. The person who caused the trouble has been disciplined enough; now they should forgive and comfort him, so that he is not overwhelmed and Satan does not take advantage. Paul thanks God, \"who always leads us in triumph in Christ, and manifests through us the sweet aroma of the knowledge of Him in every place.\"",
    v: [
      ["2:4", "Out of much affliction and anguish of heart I wrote to you with many tears", "Tough love."],
      ["2:7", "You should rather forgive and comfort him", "Restoring a brother."],
      ["2:11", "We are not ignorant of his schemes", "Satan's tricks."],
      ["2:14", "Thanks be to God, who always leads us in triumph in Christ", "Christ's victory parade."],
      ["2:15", "We are a fragrance of Christ to God", "A sweet aroma."],
    ],
    bg: [["A Roman triumph", "When a Roman general won a great victory, he led a parade through the city with incense burning. Paul pictures Christ as the victor leading His people, with the smell of the gospel spreading everywhere.", "strong", ["harris", "guthrie2"]]],
    refs: [["1CO.5", "1 Corinthians 5:1-5", "Church discipline"], ["GAL.6", "Galatians 6:1", "Restore gently"], ["EPH.5", "Ephesians 5:2", "A fragrant offering"]],
  },
  3: {
    intro: "Paul needs no letters of recommendation; the Corinthians themselves are his letter, \"written not with ink but with the Spirit of the living God, not on tablets of stone but on tablets of human hearts.\" The old covenant had glory, as Moses' face shone, but the new covenant of the Spirit has far greater glory. When a person turns to the Lord, the veil is taken away. \"Where the Spirit of the Lord is, there is liberty.\" \"We all, with unveiled face, beholding as in a mirror the glory of the Lord, are being transformed into the same image from glory to glory.\"",
    v: [
      ["3:3", "Written not with ink but with the Spirit of the living God", "Paul needs no letter of recommendation. The changed lives of the Corinthians are a letter written by the Spirit on human hearts."],
      ["3:5", "Our adequacy is from God", "Paul does not claim to be capable on his own. Any ability he has for ministry comes from God."],
      ["3:6", "The letter kills, but the Spirit gives life", "The Law written on stone could show sin but could not give life. The new covenant brings the Spirit, who gives life (Jeremiah 31:31-34)."],
      ["3:16", "Whenever a person turns to the Lord, the veil is taken away", "Moses took off his veil when he went in to speak with the LORD (Exodus 34:34). Turning to the Lord removes the veil from the heart."],
      ["3:17", "Where the Spirit of the Lord is, there is liberty", "The Spirit brings freedom: from sin, from guilt and from trying to earn God's favor."],
      ["3:18", "Being transformed into the same image from glory to glory", "As we look at the Lord's glory, the Spirit slowly changes us to become more like Jesus, step by step."],
    ],
    refs: [["EXO.34", "Exodus 34:29-35", "Moses' shining face"], ["JER.31", "Jeremiah 31:31-34", "The new covenant"], ["EZK.36", "Ezekiel 36:26", "A heart of flesh"]],
  },
  4: {
    intro: "Paul does not lose heart or twist God's word. If the gospel is veiled, it is because the god of this world has blinded unbelievers' minds. \"For God, who said, 'Light shall shine out of darkness,' is the One who has shone in our hearts.\" \"We have this treasure in earthen vessels, so that the surpassing greatness of the power will be of God and not from ourselves.\" Afflicted but not crushed, perplexed but not despairing, struck down but not destroyed. \"Though our outer man is decaying, yet our inner man is being renewed day by day.\" We look at the things which are not seen, which are eternal.",
    v: [
      ["4:5", "We do not preach ourselves but Christ Jesus as Lord", "Paul's job is to point to Jesus as Lord, and to see himself as a servant for Jesus' sake."],
      ["4:6", "Light shall shine out of darkness", "The God who said \"Let there be light\" at creation shines in human hearts, showing His glory in the face of Christ."],
      ["4:7", "We have this treasure in earthen vessels", "Treasure was often hidden in cheap clay pots. The ordinary pot shows that the power belongs to God, not to us."],
      ["4:8", "Afflicted in every way, but not crushed", "Four pairs (4:8-9): pressed but not crushed, confused but not hopeless, attacked but not abandoned, knocked down but not destroyed."],
      ["4:16", "Our inner man is being renewed day by day", "Our bodies grow older and weaker, but God renews the inner person day by day."],
      ["4:18", "The things which are not seen are eternal", "Today's troubles are real but temporary. The things we cannot yet see last forever."],
    ],
    bg: [["Clay jars", "People often hid coins and valuables in plain clay pots, and cheap clay lamps were everywhere in Corinth. The treasure is valuable; the container is ordinary, so the glory goes to God.", "strong", ["murphy", "harris"]]],
    refs: [["GEN.1", "Genesis 1:3", "Let there be light"], ["ISA.64", "Isaiah 64:8", "We are the clay"], ["ROM.8", "Romans 8:18", "Present sufferings and future glory"]],
  },
  5: {
    intro: "If our earthly tent is torn down, we have a building from God, eternal in the heavens. \"We walk by faith, not by sight,\" and we aim to please the Lord, since we all must appear before the judgment seat of Christ. \"The love of Christ controls us,\" since One died for all. \"If anyone is in Christ, he is a new creature; the old things passed away; behold, new things have come.\" God has reconciled us to Himself and given us the ministry of reconciliation. \"We are ambassadors for Christ... be reconciled to God. He made Him who knew no sin to be sin on our behalf, so that we might become the righteousness of God in Him.\"",
    v: [
      ["5:1", "We have a building from God, a house not made with hands", "Paul, a tentmaker, compares our bodies to tents that wear out. God has a permanent house waiting for His people."],
      ["5:7", "We walk by faith, not by sight", "Believers live by trusting what God has said, even when they cannot yet see it."],
      ["5:14", "The love of Christ controls us", "Christ's love for us presses on Paul and drives him on. Because Jesus died for all, His people live for Him."],
      ["5:17", "If anyone is in Christ, he is a new creature", "In Christ a person is not just improved but made new. The old life has gone; the new has come."],
      ["5:20", "We are ambassadors for Christ", "An ambassador speaks for a king in a foreign land. Believers carry God's message: be reconciled to Him."],
      ["5:21", "He made Him who knew no sin to be sin on our behalf", "Jesus never sinned, yet He took our sin on Himself so that we could receive God's righteousness. Some call it the great exchange."],
    ],
    w: [["reconcile", "katallassō", "G2644", "to reconcile, make friends again", "To turn enemies into friends. God took the first step through Christ, and He sends His people to invite others back.", ["bdag", "harris"]]],
    refs: [["ISA.43", "Isaiah 43:18-19", "Behold, I do something new"], ["ROM.5", "Romans 5:10-11", "Reconciled through His Son"], ["ISA.53", "Isaiah 53:6", "The LORD laid on Him our sin"]],
  },
  6: {
    intro: "\"Behold, now is 'the acceptable time,' behold, now is 'the day of salvation.'\" Paul lists what he endured as God's servant: troubles, beatings, prisons, sleepless nights, hunger. Yet \"as sorrowful yet always rejoicing, as poor yet making many rich, as having nothing yet possessing all things.\" He opens his heart wide and asks them to do the same. Then he warns, \"Do not be bound together with unbelievers,\" for light has no fellowship with darkness. \"We are the temple of the living God,\" and He says, \"I will be a father to you, and you shall be sons and daughters to Me.\"",
    v: [
      ["6:2", "Now is the day of salvation", "Quoting Isaiah 49:8. The time to respond to God's grace is now, not someday."],
      ["6:4", "In everything commending ourselves as servants of God, in much endurance", "Paul proves he is God's servant not by success but by faithful endurance through hardship (6:4-10)."],
      ["6:10", "As having nothing yet possessing all things", "Poor by the world's measure, Paul has everything that matters in Christ, and makes many others rich."],
      ["6:11", "Our heart is opened wide", "Paul has spoken openly and loves them deeply. He asks them to open their hearts to him in return (6:13)."],
      ["6:14", "Do not be bound together with unbelievers", "Oxen of different strength pulled badly in one yoke (Deuteronomy 22:10). Believers should not tie themselves to partnerships that pull them away from God."],
      ["6:18", "You shall be sons and daughters to Me", "God's promise to David's line (2 Samuel 7:14) widens to all His people, sons and daughters alike."],
    ],
    w: [["bound together", "heterozygeō", "G2086", "to be mismatched in a yoke", "Picture an ox and a donkey yoked together, pulling in different directions. The Law forbade plowing with mismatched animals (Deuteronomy 22:10).", ["bdag", "guthrie2"]]],
    refs: [["ISA.49", "Isaiah 49:8", "In a favorable time I answered you"], ["DEU.22", "Deuteronomy 22:10", "Do not plow with an ox and donkey"], ["LEV.26", "Leviticus 26:12", "I will be your God"]],
  },
  7: {
    intro: "\"Let us cleanse ourselves from all defilement of flesh and spirit.\" Paul was troubled in Macedonia, with conflicts outside and fears inside, \"but God, who comforts the depressed, comforted us by the coming of Titus,\" who reported that the Corinthians had responded well to Paul's tearful letter. Paul rejoices, not that they were sad, but that their sorrow led to change. \"The sorrow that is according to the will of God produces a repentance without regret, leading to salvation, but the sorrow of the world produces death.\"",
    v: [
      ["7:1", "Perfecting holiness in the fear of God", "Growing in holiness."],
      ["7:2", "Make room for us in your hearts", "Paul's plea."],
      ["7:6", "God, who comforts the depressed, comforted us by the coming of Titus", "God sends a friend."],
      ["7:9", "You were made sorrowful to the point of repentance", "Sorrow that helps."],
      ["7:10", "The sorrow that is according to the will of God produces a repentance without regret", "Two kinds of sorrow."],
    ],
    refs: [["PSA.51", "Psalm 51:17", "A broken and contrite heart"], ["MAT.26", "Matthew 26:75", "Peter weeps bitterly"], ["MAT.27", "Matthew 27:3-5", "Judas's regret"]],
  },
  8: {
    intro: "The churches of Macedonia, though very poor, gave generously, even beyond their ability, to help the believers in Jerusalem, because \"they first gave themselves to the Lord.\" Paul urges Corinth to finish the gift they began a year ago. \"For you know the grace of our Lord Jesus Christ, that though He was rich, yet for your sake He became poor, so that you through His poverty might become rich.\" Giving should be from willingness and should create fairness: their plenty supplies others' need now, and one day the reverse. Titus and two trusted brothers will handle the money honestly.",
    v: [
      ["8:2", "Their deep poverty overflowed in the wealth of their liberality", "Generous in hard times."],
      ["8:5", "They first gave themselves to the Lord", "Giving starts with the heart."],
      ["8:9", "Though He was rich, yet for your sake He became poor", "Jesus our example."],
      ["8:12", "If the readiness is present, it is acceptable according to what a person has", "Give what you have."],
      ["8:21", "We have regard for what is honorable... also in the sight of men", "Handling money with integrity."],
    ],
    refs: [["EXO.16", "Exodus 16:18", "Each gathered enough"], ["PHP.2", "Philippians 2:5-8", "Christ emptied Himself"], ["ROM.15", "Romans 15:25-27", "The gift for Jerusalem"]],
  },
  9: {
    intro: "Paul is sending the brothers ahead so Corinth's gift is ready and not given grudgingly. \"He who sows sparingly will also reap sparingly, and he who sows bountifully will also reap bountifully.\" \"Each one must do just as he has purposed in his heart, not grudgingly or under compulsion, for God loves a cheerful giver.\" God is able to make all grace abound, so they will have enough for every good deed. Their gift meets needs and causes many to thank God. \"Thanks be to God for His indescribable gift!\"",
    v: [
      ["9:6", "He who sows bountifully will also reap bountifully", "Sowing and reaping."],
      ["9:7", "God loves a cheerful giver", "Giving with joy."],
      ["9:8", "God is able to make all grace abound to you", "Enough to share."],
      ["9:12", "Overflowing through many thanksgivings to God", "Giving leads to thanks."],
      ["9:15", "Thanks be to God for His indescribable gift!", "The greatest gift."],
    ],
    w: [["cheerful", "hilaros", "G2431", "cheerful, glad", "Our word \"hilarious\" comes from it. Paul means glad, willing giving, not giving because you have to.", ["bdag"]]],
    refs: [["PRO.11", "Proverbs 11:24-25", "The generous will prosper"], ["PRO.22", "Proverbs 22:9", "He who is generous will be blessed"], ["LUK.6", "Luke 6:38", "Give and it will be given"]],
  },
  10: {
    intro: "Some said Paul was bold in letters but weak in person. Paul answers that though we walk in the flesh, we do not fight with worldly weapons. \"The weapons of our warfare are not of the flesh, but divinely powerful for the destruction of fortresses,\" taking every thought captive to the obedience of Christ. He will not compare himself with others or boast beyond his limits. \"He who boasts is to boast in the Lord. For it is not he who commends himself that is approved, but he whom the Lord commends.\"",
    v: [
      ["10:1", "By the meekness and gentleness of Christ", "Gentle strength."],
      ["10:4", "The weapons of our warfare are not of the flesh", "Spiritual weapons."],
      ["10:5", "Taking every thought captive to the obedience of Christ", "Guarding our thinking."],
      ["10:12", "When they measure themselves by themselves... they are without understanding", "Comparison trap."],
      ["10:17", "He who boasts is to boast in the Lord", "Pointing to God."],
    ],
    refs: [["EPH.6", "Ephesians 6:10-18", "The armor of God"], ["PHP.4", "Philippians 4:8", "Think on these things"], ["JER.9", "Jeremiah 9:24", "Boast in knowing Me"]],
  },
  11: {
    intro: "Paul is jealous for the church with godly jealousy, like a father who promised his daughter to one husband, Christ. He fears they will be led astray by \"super-apostles\" preaching another Jesus. He served them free of charge so no one could accuse him. These false teachers disguise themselves, \"for even Satan disguises himself as an angel of light.\" If boasting is needed, Paul will boast like a fool: he has been beaten, stoned, shipwrecked three times, a night and a day in the deep, in danger from rivers, robbers and false brothers, hungry and cold, and under daily pressure of concern for all the churches. Once he escaped Damascus by being let down in a basket.",
    v: [
      ["11:2", "I am jealous for you with a godly jealousy", "Like a father who has promised his daughter in marriage, Paul wants to present the church pure to Christ, her one husband."],
      ["11:3", "Your minds will be led astray from the simplicity and purity of devotion to Christ", "As the serpent deceived Eve, false teachers can lead people away from simple, wholehearted devotion to Jesus."],
      ["11:14", "Satan disguises himself as an angel of light", "Evil rarely looks evil. Satan and his servants can look bright and good, so believers test what they hear."],
      ["11:24", "Five times I received from the Jews thirty-nine lashes", "The Law allowed forty lashes (Deuteronomy 25:3); thirty-nine were given to be sure not to go over. Paul received them five times."],
      ["11:28", "The daily pressure on me of concern for all the churches", "Beyond beatings and shipwrecks, Paul's heaviest load was caring for all the churches."],
      ["11:33", "I was let down in a basket through a window in the wall", "Paul ends his list of sufferings with an escape in a basket (Acts 9:25). He boasts about his weakness, not his strength."],
    ],
    bg: [["Thirty-nine lashes", "The Law allowed up to forty lashes (Deuteronomy 25:3). To avoid breaking the Law by miscounting, synagogue courts stopped at thirty-nine.", "strong", ["harris", "barnett"]]],
    refs: [["ACT.9", "Acts 9:23-25", "The basket escape"], ["ACT.14", "Acts 14:19", "Stoned at Lystra"], ["ACT.27", "Acts 27", "Shipwreck"], ["GAL.1", "Galatians 1:6-9", "Another gospel"]],
  },
  12: {
    intro: "Paul tells of a man caught up to the third heaven, into Paradise, who heard things beyond words. To keep him from becoming proud, he was given \"a thorn in the flesh, a messenger of Satan.\" Three times he begged the Lord to remove it. The Lord said, \"My grace is sufficient for you, for power is perfected in weakness.\" So Paul says, \"Most gladly, therefore, I will rather boast about my weaknesses... for when I am weak, then I am strong.\" He is coming a third time, and he does not want their money, but them.",
    v: [
      ["12:2", "Such a man was caught up to the third heaven", "Paul speaks of himself as \"a man,\" too humble to boast. \"The third heaven\" means the presence of God, also called paradise (12:4)."],
      ["12:7", "There was given me a thorn in the flesh", "No one knows exactly what Paul's thorn was: an illness, an eye problem or persistent opponents. God used it to keep him humble."],
      ["12:9", "My grace is sufficient for you, for power is perfected in weakness", "God did not remove the thorn, but He gave something better: grace that is enough, and power that shows best in weakness."],
      ["12:10", "When I am weak, then I am strong", "When Paul has nothing left in himself, Christ's strength carries him. Weakness becomes a place to meet God's power."],
      ["12:14", "I do not seek what is yours, but you", "Paul does not want their money. He wants them, the way parents want their children's good."],
      ["12:15", "I will most gladly spend and be expended for your souls", "Paul would gladly spend everything, even himself, for their spiritual good."],
    ],
    views: [["What was Paul's thorn?", "Some think it was a physical problem, such as poor eyesight (compare Galatians 4:15 and 6:11) or a recurring illness. Others think it was the constant opposition from false teachers. Others think it was a spiritual attack. Paul never says, which may help every reader apply God's answer to their own struggle.", ["harris", "guthrie2", "barnett"]]],
    refs: [["GAL.4", "Galatians 4:13-15", "A bodily illness"], ["ISA.40", "Isaiah 40:29-31", "He gives strength to the weary"], ["NUM.33", "Numbers 33:55", "Thorns in your sides"]],
  },
  13: {
    intro: "Paul is coming for a third visit, and he will not spare those who keep sinning. Christ \"was crucified because of weakness, yet He lives because of the power of God.\" \"Test yourselves to see if you are in the faith; examine yourselves!\" Paul prays they will do what is right and be made complete. He closes: \"Rejoice, be made complete, be comforted, be like-minded, live in peace; and the God of love and peace will be with you.\" And the blessing many churches still use: \"The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit, be with you all.\"",
    v: [
      ["13:1", "Every fact is to be confirmed by the testimony of two or three witnesses", "Fair judgment."],
      ["13:4", "He was crucified because of weakness, yet He lives because of the power of God", "Weakness and power."],
      ["13:5", "Test yourselves to see if you are in the faith", "Honest self-check."],
      ["13:11", "Rejoice, be made complete, be comforted, be like-minded, live in peace", "Five reminders."],
      ["13:14", "The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit", "Father, Son and Spirit."],
    ],
    refs: [["DEU.19", "Deuteronomy 19:15", "Two or three witnesses"], ["NUM.6", "Numbers 6:24-26", "The priestly blessing"], ["MAT.28", "Matthew 28:19", "Father, Son and Holy Spirit"]],
  },
});
