// 1 Timothy chapter notes.
import { makeBook } from "./make.js";

const sources = {
  knight: "George W. Knight III, The Pastoral Epistles, New International Greek Testament Commentary (Eerdmans, 1992).",
  towner: "Philip H. Towner, The Letters to Timothy and Titus, New International Commentary on the New Testament (Eerdmans, 2006).",
  mounce: "William D. Mounce, Pastoral Epistles, Word Biblical Commentary 46 (Thomas Nelson, 2000).",
  guthrieP: "Donald Guthrie, The Pastoral Epistles, rev. ed., Tyndale New Testament Commentaries (InterVarsity Press, 1990).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["towner", "knight"] }, {
  1: {
    intro: "Paul writes to Timothy, \"my true child in the faith,\" whom he left in Ephesus to stop certain people from teaching strange doctrines and endless myths. \"The goal of our instruction is love from a pure heart and a good conscience and a sincere faith.\" The Law is good when used rightly. Paul thanks Christ for showing mercy to him, a former blasphemer and persecutor: \"It is a trustworthy statement, deserving full acceptance, that Christ Jesus came into the world to save sinners, among whom I am foremost of all.\" He charges Timothy to fight the good fight, keeping faith and a good conscience.",
    v: [
      ["1:2", "To Timothy, my true child in the faith", "Like a son."],
      ["1:5", "The goal of our instruction is love from a pure heart", "The aim of teaching."],
      ["1:13", "I was shown mercy because I acted ignorantly in unbelief", "Mercy for Paul."],
      ["1:15", "Christ Jesus came into the world to save sinners, among whom I am foremost", "The worst sinner saved."],
      ["1:16", "As an example for those who would believe in Him", "Hope for anyone."],
      ["1:17", "Now to the King eternal, immortal, invisible, the only God, be honor and glory", "Praise."],
      ["1:18", "Fight the good fight", "Stay strong."],
    ],
    bg: [["Letters to a young pastor", "First Timothy, 2 Timothy and Titus are called the Pastoral Letters because they guide church leaders. Timothy, son of a Jewish believing mother and a Greek father, had traveled with Paul for years (Acts 16:1-3).", "strong", ["towner", "guthrieP"]]],
    refs: [["ACT.16", "Acts 16:1-3", "Timothy joins Paul"], ["ACT.9", "Acts 9:1-5", "Paul the persecutor"], ["LUK.19", "Luke 19:10", "To seek and save the lost"]],
  },
  2: {
    intro: "First of all, pray for all people, including kings and all in authority, so we may lead a tranquil and quiet life in godliness. This is good in God's sight, who \"desires all men to be saved and to come to the knowledge of the truth. For there is one God, and one mediator also between God and men, the man Christ Jesus, who gave Himself as a ransom for all.\" Men should pray, lifting holy hands without anger. Women should adorn themselves with good works more than fancy clothes and jewelry. Paul also gives instructions about learning and teaching in the church.",
    v: [
      ["2:1", "Entreaties and prayers, petitions and thanksgivings, be made on behalf of all men", "Pray for everyone."],
      ["2:2", "For kings and all who are in authority", "Pray for leaders."],
      ["2:4", "Who desires all men to be saved", "God's heart."],
      ["2:5", "One mediator also between God and men, the man Christ Jesus", "One go-between."],
      ["2:6", "Who gave Himself as a ransom for all", "The ransom."],
      ["2:10", "By means of good works, as is proper for women making a claim to godliness", "True beauty."],
    ],
    views: [["Women teaching in 2:11-15", "Some readers hold that Paul limits the role of pastor or elder, and teaching with authority over the gathered church, to qualified men, grounding this in creation order. Others read it as addressing a specific problem in Ephesus, such as untrained women influenced by false teachers, and see the instruction as tied to that setting. Readers on both sides affirm that women are equally saved, gifted and valued, and that many women served alongside Paul.", ["towner", "knight", "mounce"]]],
    refs: [["JER.29", "Jeremiah 29:7", "Pray for the city"], ["MRK.10", "Mark 10:45", "A ransom for many"], ["1PE.3", "1 Peter 3:3-4", "Inner beauty"]],
  },
  3: {
    intro: "If a man aspires to be an overseer, he desires a fine work. An overseer must be above reproach, faithful in marriage, self-controlled, respectable, hospitable, able to teach, not a drunkard or violent but gentle, not a lover of money, managing his own household well, not a new convert, and well thought of by outsiders. Deacons must be dignified, honest, and tested first. Paul writes so Timothy will know how to behave in \"the household of God, which is the church of the living God, the pillar and support of the truth.\" Then a short hymn: \"He who was revealed in the flesh, was vindicated in the Spirit... taken up in glory.\"",
    v: [
      ["3:1", "If any man aspires to the office of overseer, it is a fine work he desires to do", "A good work."],
      ["3:2", "An overseer, then, must be above reproach", "Good character."],
      ["3:4", "One who manages his own household well", "Faith at home."],
      ["3:8", "Deacons likewise must be men of dignity", "Servants."],
      ["3:15", "The household of God, which is the church of the living God", "God's family."],
      ["3:16", "Great is the mystery of godliness: He who was revealed in the flesh", "An early hymn."],
    ],
    w: [["overseer", "episkopos", "G1985", "overseer, guardian", "Someone who watches over and cares for others. In the New Testament the same leaders are also called elders (presbyteros) and shepherds or pastors (Acts 20:17, 28; Titus 1:5-7).", ["bdag", "knight"]]],
    refs: [["TIT.1", "Titus 1:5-9", "Qualifications for elders"], ["ACT.6", "Acts 6:1-6", "Seven chosen to serve"], ["ACT.20", "Acts 20:28", "Shepherd the church of God"]],
  },
  4: {
    intro: "The Spirit says that in later times some will fall away, following deceiving spirits, forbidding marriage and certain foods. But \"everything created by God is good, and nothing is to be rejected if it is received with gratitude.\" \"Discipline yourself for the purpose of godliness; for bodily discipline is only of little profit, but godliness is profitable for all things.\" \"Let no one look down on your youthfulness, but rather in speech, conduct, love, faith and purity, show yourself an example of those who believe.\" Give attention to reading Scripture, encouraging and teaching. Do not neglect your gift. \"Pay close attention to yourself and to your teaching.\"",
    v: [
      ["4:4", "Everything created by God is good", "Receive with thanks."],
      ["4:7", "Discipline yourself for the purpose of godliness", "Spiritual training."],
      ["4:8", "Godliness is profitable for all things", "What lasts."],
      ["4:12", "Let no one look down on your youthfulness", "Young people can lead."],
      ["4:13", "Give attention to the public reading of Scripture", "Read it aloud."],
      ["4:16", "Pay close attention to yourself and to your teaching", "Life and teaching."],
    ],
    why: "1 Timothy 4:12 speaks straight to the youngest readers: kids and teens can be examples of faith for everyone.",
    refs: [["GEN.1", "Genesis 1:31", "Everything was very good"], ["1CO.9", "1 Corinthians 9:25-27", "Training like an athlete"], ["2TI.1", "2 Timothy 1:6", "Kindle the gift"]],
  },
  5: {
    intro: "Treat an older man as a father, younger men as brothers, older women as mothers, and younger women as sisters, in all purity. Honor widows who are truly in need; their families should care for them first, for \"if anyone does not provide for his own, and especially for those of his household, he has denied the faith.\" Elders who lead well, especially in preaching and teaching, deserve double honor: \"You shall not muzzle the ox while he is threshing.\" Accusations against an elder need two or three witnesses. Paul also tells Timothy to use a little wine for his frequent stomach troubles.",
    v: [
      ["5:1", "Do not sharply rebuke an older man, but rather appeal to him as a father", "Respect elders."],
      ["5:4", "Learn to practice piety in regard to their own family", "Care for family."],
      ["5:8", "If anyone does not provide for his own... he has denied the faith", "Family duty."],
      ["5:17", "The elders who rule well are to be considered worthy of double honor", "Honor leaders."],
      ["5:18", "The laborer is worthy of his wages", "Fair pay."],
      ["5:23", "Use a little wine for the sake of your stomach", "Practical care."],
    ],
    refs: [["EXO.20", "Exodus 20:12", "Honor your parents"], ["DEU.25", "Deuteronomy 25:4", "Do not muzzle the ox"], ["LUK.10", "Luke 10:7", "The laborer deserves his wages"], ["JAS.1", "James 1:27", "Visit widows and orphans"]],
  },
  6: {
    intro: "Servants should honor their masters so God's name is not spoken against. \"Godliness actually is a means of great gain when accompanied by contentment. For we have brought nothing into the world, so we cannot take anything out of it either.\" \"For the love of money is a root of all sorts of evil.\" \"But flee from these things, you man of God, and pursue righteousness, godliness, faith, love, perseverance and gentleness. Fight the good fight of faith; take hold of the eternal life.\" Tell the rich not to be proud or trust in riches, but to be rich in good works, generous and ready to share. \"O Timothy, guard what has been entrusted to you.\"",
    v: [
      ["6:6", "Godliness actually is a means of great gain when accompanied by contentment", "Contentment."],
      ["6:7", "We have brought nothing into the world, so we cannot take anything out of it", "Can't take it with you."],
      ["6:10", "The love of money is a root of all sorts of evil", "Loving money."],
      ["6:11", "Pursue righteousness, godliness, faith, love, perseverance and gentleness", "Run toward good."],
      ["6:12", "Fight the good fight of faith", "Keep fighting."],
      ["6:17", "God, who richly supplies us with all things to enjoy", "God gives."],
      ["6:20", "Guard what has been entrusted to you", "Keep the faith."],
    ],
    common: "Paul does not say money is the root of all evil, but that the love of money is a root of all sorts of evil.",
    refs: [["JOB.1", "Job 1:21", "Naked I came"], ["MAT.6", "Matthew 6:19-24", "You cannot serve God and money"], ["HEB.13", "Hebrews 13:5", "Be content"], ["LUK.12", "Luke 12:15-21", "The rich fool"]],
  },
});
