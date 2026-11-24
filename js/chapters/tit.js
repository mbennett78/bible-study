// Titus chapter notes.
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
    intro: "Paul left Titus on the island of Crete to set things in order and appoint elders in every city. An elder must be above reproach, faithful to his wife, with believing children who are not wild, not self-willed or quick-tempered, not a drunkard or greedy, but hospitable, loving what is good, sensible, just, devout and self-controlled, holding fast the faithful word so he can encourage with sound teaching and correct those who oppose it. Some on Crete were teaching for money and upsetting whole families. \"To the pure, all things are pure.\" They profess to know God, but by their deeds they deny Him.",
    v: [
      ["1:2", "In the hope of eternal life, which God, who cannot lie, promised long ages ago", "God cannot lie."],
      ["1:5", "Appoint elders in every city as I directed you", "Leaders for every church."],
      ["1:7", "The overseer must be above reproach as God's steward", "God's manager."],
      ["1:9", "Holding fast the faithful word", "Hold on to truth."],
      ["1:15", "To the pure, all things are pure", "A clean heart."],
      ["1:16", "They profess to know God, but by their deeds they deny Him", "Words and actions."],
    ],
    bg: [["Crete", "Crete is a large island south of Greece. A Cretan poet, Epimenides, had famously written, \"Cretans are always liars, evil beasts, lazy gluttons,\" and Paul quotes him (1:12). Titus, a Gentile believer, was one of Paul's most trusted helpers (Galatians 2:3; 2 Corinthians 8:23).", "strong", ["towner", "guthrieP"]]],
    refs: [["1TI.3", "1 Timothy 3:1-7", "Overseers"], ["ACT.2", "Acts 2:11", "Cretans at Pentecost"], ["ACT.27", "Acts 27:7-13", "Paul sails past Crete"]],
  },
  2: {
    intro: "Teach what fits sound doctrine. Older men should be dignified, sensible and sound in faith, love and perseverance. Older women should be reverent and teach what is good, so they can encourage the young women to love their husbands and children. Young men should be sensible, and Titus himself should be an example of good deeds. Servants should be trustworthy, \"so that they will adorn the doctrine of God our Savior in every respect.\" \"For the grace of God has appeared, bringing salvation to all men, instructing us to deny ungodliness... and to live sensibly, righteously and godly in the present age, looking for the blessed hope and the appearing of the glory of our great God and Savior, Christ Jesus.\"",
    v: [
      ["2:2", "Older men are to be temperate, dignified, sensible, sound in faith", "For grandfathers."],
      ["2:3", "Older women likewise are to be reverent... teaching what is good", "For grandmothers."],
      ["2:7", "In all things show yourself to be an example of good deeds", "Be an example."],
      ["2:10", "So that they will adorn the doctrine of God our Savior in every respect", "Making the gospel beautiful."],
      ["2:11", "The grace of God has appeared, bringing salvation to all men", "Grace appeared."],
      ["2:13", "Looking for the blessed hope and the appearing of the glory of our great God and Savior, Christ Jesus", "The blessed hope."],
      ["2:14", "Zealous for good deeds", "Eager to do good."],
    ],
    why: "Titus 2 is a picture of a whole church family, every age teaching and helping the next. It fits a family that spans 10 to 89.",
    w: [["adorn", "kosmeō", "G2885", "to decorate, make attractive", "Our word \"cosmetic\" comes from it. A faithful life makes the gospel look beautiful to others.", ["bdag"]]],
    refs: [["1TI.5", "1 Timothy 5:1-2", "Treat each age as family"], ["PRO.31", "Proverbs 31", "A woman of strength"], ["1PE.2", "1 Peter 2:9", "A people for God's own possession"]],
  },
  3: {
    intro: "Remind believers to respect rulers, be ready for every good deed, speak evil of no one, be peaceable and gentle, \"showing every consideration for all men.\" We too were once foolish and enslaved to our desires. \"But when the kindness of God our Savior and His love for mankind appeared, He saved us, not on the basis of deeds which we have done in righteousness, but according to His mercy, by the washing of regeneration and renewing by the Holy Spirit, whom He poured out upon us richly through Jesus Christ our Savior, so that being justified by His grace we would be made heirs according to the hope of eternal life.\" Avoid foolish arguments. Paul closes with travel plans and a call to good deeds.",
    v: [
      ["3:1", "To be ready for every good deed", "Ready to help."],
      ["3:2", "To malign no one, to be peaceable, gentle", "Gentle with all."],
      ["3:4", "The kindness of God our Savior and His love for mankind appeared", "God's kindness."],
      ["3:5", "He saved us, not on the basis of deeds which we have done... but according to His mercy", "Saved by mercy."],
      ["3:7", "Being justified by His grace we would be made heirs", "Heirs of hope."],
      ["3:14", "Our people must also learn to engage in good deeds", "Learning to do good."],
    ],
    views: [["\"The washing of regeneration\" (3:5)", "Some scholars see a direct reference to baptism as the moment God applies the new birth and renewal of the Spirit to the believer. Others see the washing as the cleansing the Spirit does inwardly, which baptism pictures. Others hold that Paul links the two closely without making the water itself the cause. All agree the passage stresses that salvation is by God's mercy and grace, not by our own good works.", ["towner", "knight", "mounce"]]],
    refs: [["EZK.36", "Ezekiel 36:25-27", "Clean water and a new spirit"], ["JHN.3", "John 3:5", "Born of water and the Spirit"], ["EPH.2", "Ephesians 2:8-10", "Saved by grace for good works"]],
  },
});
