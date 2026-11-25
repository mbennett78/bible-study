// Colossians chapter notes.
import { makeBook } from "./make.js";

const sources = {
  mooC: "Douglas J. Moo, The Letters to the Colossians and to Philemon, Pillar New Testament Commentary (Eerdmans, 2008).",
  wrightC: "N. T. Wright, Colossians and Philemon, Tyndale New Testament Commentaries (InterVarsity Press, 1986).",
  bruceC: "F. F. Bruce, The Epistles to the Colossians, to Philemon, and to the Ephesians, New International Commentary on the New Testament (Eerdmans, 1984).",
  pao: "David W. Pao, Colossians and Philemon, Zondervan Exegetical Commentary on the New Testament (Zondervan, 2012).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["mooC", "wrightC"] }, {
  1: {
    intro: "Paul thanks God for the Colossians' faith and love, which they learned from Epaphras. He prays they will be filled with the knowledge of God's will, walk worthy of the Lord, and give thanks to the Father, who rescued us from the domain of darkness and transferred us to the kingdom of His beloved Son. Then a great poem about Christ: \"He is the image of the invisible God, the firstborn of all creation. For by Him all things were created... all things have been created through Him and for Him. He is before all things, and in Him all things hold together.\" Through His blood on the cross He made peace. The mystery hidden for ages is \"Christ in you, the hope of glory.\"",
    v: [
      ["1:9", "That you may be filled with the knowledge of His will", "Paul's prayer for believers he had never met: to know God's will, live in a way that pleases Him, and grow in strength and joy."],
      ["1:13", "He rescued us from the domain of darkness", "Like a king moving people from one land to another, God has rescued believers out of darkness and brought them into His Son's kingdom."],
      ["1:15", "He is the image of the invisible God", "Nobody can see God directly, but in Jesus we see exactly what God is like (John 14:9). \"Firstborn\" here means first in rank, not first created."],
      ["1:16", "By Him all things were created", "Everything, seen and unseen, was made through Jesus and for Him (John 1:3). He is not part of creation; He is its Maker."],
      ["1:17", "In Him all things hold together", "Jesus existed before all things, and He keeps the universe from falling apart, right now."],
      ["1:20", "Having made peace through the blood of His cross", "The cross does more than forgive individuals. Through it God is bringing peace to everything that sin has broken."],
      ["1:27", "Christ in you, the hope of glory", "A \"mystery\" in Paul means a secret God has now revealed: Christ lives in His people, even Gentiles, and that is their hope."],
    ],
    bg: [["Colossae", "Colossae was a small town in the Lycus Valley in what is now Turkey, near Laodicea and Hierapolis. Paul had never visited; Epaphras, a local man, started the church. A mixed teaching was pressuring them with special rules, angels and secret knowledge.", "strong", ["mooC", "bruceC"]]],
    w: [["firstborn", "prōtotokos", "G4416", "firstborn, first in rank", "In the Bible, the firstborn held the highest place of honor and inheritance (Psalm 89:27). Paul means Christ is supreme over creation, since all things were made by Him.", ["bdag", "mooC"]]],
    refs: [["JHN.1", "John 1:1-3", "All things made through Him"], ["HEB.1", "Hebrews 1:1-3", "The radiance of His glory"], ["PSA.89", "Psalm 89:27", "I will make him My firstborn"]],
  },
  2: {
    intro: "Paul wants them to have full assurance and to know Christ, \"in whom are hidden all the treasures of wisdom and knowledge.\" \"As you have received Christ Jesus the Lord, so walk in Him, having been firmly rooted and now being built up in Him.\" Do not be taken captive by empty philosophy. In Christ all the fullness of Deity dwells in bodily form. In Him believers were circumcised without hands, buried with Him in baptism and raised with Him through faith in the working of God. He canceled the record of debt, nailing it to the cross, and disarmed the powers. So do not let anyone judge you over food or festivals, which were only a shadow; the substance belongs to Christ.",
    v: [
      ["2:3", "In whom are hidden all the treasures of wisdom and knowledge", "False teachers in Colossae claimed secret knowledge. Paul says every treasure of wisdom is already found in Christ."],
      ["2:6", "As you have received Christ Jesus the Lord, so walk in Him", "Keep living the same way you started: trusting Jesus as Lord. The Christian life is not a new trick, but more of Christ."],
      ["2:7", "Firmly rooted and now being built up in Him", "Two pictures at once: a tree with deep roots and a building rising on a firm foundation, both overflowing with thanks."],
      ["2:9", "In Him all the fullness of Deity dwells in bodily form", "Not a part of God, or a lesser spirit, but all of who God is lives in Jesus, in a real human body."],
      ["2:12", "Buried with Him in baptism... raised up with Him through faith", "Paul pictures baptism as being buried with Christ and raised with Him, through faith in God's power (compare Romans 6:3-4). Christians differ on just how baptism and faith relate to salvation, but they agree it pictures dying to the old life and rising to a new one."],
      ["2:14", "Having canceled out the certificate of debt... nailed it to the cross", "Our sins were like an IOU we could never pay. God canceled it and nailed it to the cross."],
      ["2:17", "Things which are a mere shadow of what is to come", "Food laws, festivals and sabbaths were shadows cast ahead of the real thing. Now that Christ has come, hold on to Him."],
    ],
    w: [["certificate of debt", "cheirographon", "G5498", "a handwritten IOU", "A record written in a person's own hand acknowledging a debt. Christ took the record against us and nailed it to the cross: paid in full.", ["bdag", "mooC"]]],
    refs: [["ROM.6", "Romans 6:3-4", "Buried with Him"], ["HEB.10", "Hebrews 10:1", "The Law a shadow"], ["JHN.19", "John 19:30", "It is finished"]],
  },
  3: {
    intro: "\"If you have been raised up with Christ, keep seeking the things above, where Christ is.\" \"Set your mind on the things above, not on the things that are on earth.\" Put to death the old ways and put aside anger, slander and lying. Put on the new self, where there is no Greek or Jew, slave or free, \"but Christ is all, and in all.\" \"Put on a heart of compassion, kindness, humility, gentleness and patience... forgiving each other... Beyond all these things put on love.\" Let the peace of Christ rule and the word of Christ richly dwell within you, with psalms, hymns and spiritual songs. \"Whatever you do in word or deed, do all in the name of the Lord Jesus.\" Paul gives instructions for wives, husbands, children, fathers and servants.",
    v: [
      ["3:1", "Keep seeking the things above, where Christ is", "Because believers have been raised with Christ, their eyes go up to where He is, seated at God's right hand."],
      ["3:2", "Set your mind on the things above", "Not daydreaming about clouds, but letting Christ's values shape how we think about everything here and now."],
      ["3:12", "Put on a heart of compassion, kindness, humility, gentleness and patience", "Paul pictures taking off old clothes (3:9) and putting on new ones. These five qualities are the wardrobe of God's chosen people."],
      ["3:13", "Just as the Lord forgave you, so also should you", "The measure of our forgiveness is how much we have been forgiven. That makes holding a grudge very hard to defend."],
      ["3:14", "Beyond all these things put on love", "Love is the belt that holds the whole outfit together, \"the perfect bond of unity.\""],
      ["3:16", "Let the word of Christ richly dwell within you", "Scripture is meant to live in us richly, overflowing in teaching, encouragement and singing \"psalms and hymns and spiritual songs.\""],
      ["3:23", "Whatever you do, do your work heartily, as for the Lord", "Even the most ordinary job becomes service to Christ when it is done wholeheartedly for Him."],
    ],
    refs: [["EPH.4", "Ephesians 4:22-32", "Put off, put on"], ["EPH.5", "Ephesians 5:19-33", "Songs and families"], ["MAT.6", "Matthew 6:19-21", "Treasures in heaven"]],
  },
  4: {
    intro: "Masters must treat servants fairly, knowing they too have a Master in heaven. \"Devote yourselves to prayer, keeping alert in it with an attitude of thanksgiving,\" and pray for an open door for the word. Act wisely toward outsiders, making the most of the opportunity. \"Let your speech always be with grace, as though seasoned with salt.\" Paul sends greetings from friends: Tychicus, Onesimus, Aristarchus, Mark (Barnabas's cousin), Luke the beloved physician, Demas, and Epaphras, who always labors in prayer for them. They should share this letter with Laodicea. Paul signs it himself: \"Remember my imprisonment.\"",
    v: [
      ["4:2", "Devote yourselves to prayer, keeping alert in it with an attitude of thanksgiving", "Keep praying, stay awake to what God is doing, and keep thanking Him. Paul joins prayer and thanks again and again (Philippians 4:6)."],
      ["4:3", "That God will open up to us a door for the word", "Paul, writing from prison, does not ask for the chains to come off. He asks for an open door to share the message about Christ."],
      ["4:5", "Conduct yourselves with wisdom toward outsiders", "Outsiders are those who do not yet know Christ. Believers should treat them wisely and make good use of every chance."],
      ["4:6", "Let your speech always be with grace, as though seasoned with salt", "Salt gives flavor and keeps food from spoiling. Kind, thoughtful words make the message about Jesus welcome."],
      ["4:12", "Always laboring earnestly for you in his prayers", "Epaphras, who first brought the gospel to Colossae (1:7), works hard for them in prayer. Praying for others is real work."],
      ["4:14", "Luke, the beloved physician", "This is how we know Luke was a doctor. He traveled with Paul and wrote the Gospel of Luke and the book of Acts."],
    ],
    bg: [["Onesimus and Mark", "Onesimus is the runaway servant Paul sends home in the letter to Philemon, now called \"our faithful and beloved brother.\" Mark is the young man who once left Paul (Acts 15:38) but is now trusted again. Both show God's grace in giving people a second chance.", "strong", ["mooC", "bruceC"]]],
    refs: [["PHM.1", "Philemon 10-16", "Onesimus"], ["ACT.15", "Acts 15:37-39", "Paul and Barnabas disagree over Mark"], ["2TI.4", "2 Timothy 4:11", "Mark is useful to me"]],
  },
});
