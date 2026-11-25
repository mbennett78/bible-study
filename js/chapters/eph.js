// Ephesians chapter notes. Chapter 2 keeps its full notes in notes.js.
import { makeBook } from "./make.js";

const sources = {
  arnold: "Clinton E. Arnold, Ephesians, Zondervan Exegetical Commentary on the New Testament (Zondervan, 2010).",
  hoehner: "Harold W. Hoehner, Ephesians: An Exegetical Commentary (Baker Academic, 2002).",
  stottE: "John Stott, The Message of Ephesians, The Bible Speaks Today (InterVarsity Press, 1979).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["arnold", "hoehner"] }, {
  1: {
    intro: "Paul writes to the saints in Ephesus and bursts into praise: \"Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ.\" God chose us in Him before the foundation of the world, adopted us as sons, and in Him we have redemption through His blood, the forgiveness of our sins. Believers were sealed with the Holy Spirit as a pledge of what is coming. Paul prays that the eyes of their hearts would be enlightened to know the hope of His calling and the surpassing greatness of His power, the same power that raised Christ and seated Him far above every ruler.",
    v: [
      ["1:3", "Who has blessed us with every spiritual blessing", "Ephesians 1:3-14 is one long sentence in Greek, a flood of praise. In Christ, believers have every spiritual blessing."],
      ["1:4", "He chose us in Him before the foundation of the world", "Before creation, God chose His people in Christ to be holy and blameless. Christians differ on how choosing works, but all agree the starting point is God's love."],
      ["1:7", "In Him we have redemption through His blood, the forgiveness of our trespasses", "Redemption means being set free by a payment. Christ's blood paid for our freedom and the forgiveness of our sins."],
      ["1:13", "You were sealed in Him with the Holy Spirit of promise", "A seal marked ownership and protection. The Holy Spirit marks believers as belonging to God."],
      ["1:18", "That the eyes of your heart may be enlightened", "Paul prays that their hearts will be opened to see the hope of God's calling and the riches of what He has given them."],
      ["1:22", "He put all things in subjection under His feet", "Quoting Psalm 8:6. God has put everything under Christ's feet and made Him head over all things for the church."],
    ],
    bg: [["Ephesus", "Ephesus was one of the largest cities in the Roman world, home to the great temple of Artemis, one of the seven wonders. Magic and fear of spiritual powers were common there (Acts 19:19), which is why Paul stresses Christ's power over every ruler and authority.", "strong", ["arnold", "hoehner"]]],
    w: [["pledge", "arrabōn", "G728", "down payment, first installment", "A business word for a deposit that guarantees the rest will be paid. The Spirit is God's guarantee that the full inheritance is coming.", ["bdag"]]],
    views: [["\"He chose us in Him\" (1:4)", "Some read this as God choosing particular individuals for salvation before time began. Others read it as God choosing a people, the church, in Christ, so that whoever is in Christ by faith shares in that choice. Others stress that God chose in advance the destiny of believers: to be holy and blameless. All agree it is grace, rooted in God's love, and centered in Christ.", ["arnold", "hoehner", "stottE"]]],
    refs: [["ACT.19", "Acts 19", "Paul in Ephesus"], ["PSA.110", "Psalm 110:1", "Sit at My right hand"], ["2CO.1", "2 Corinthians 1:22", "The Spirit as a pledge"]],
  },
  3: {
    intro: "Paul, a prisoner for Christ Jesus on behalf of the Gentiles, explains the mystery now revealed: \"the Gentiles are fellow heirs and fellow members of the body, and fellow partakers of the promise in Christ Jesus through the gospel.\" Paul calls himself \"the very least of all saints,\" yet he was given grace to preach the unfathomable riches of Christ. Then he kneels and prays that they would be strengthened by the Spirit, that Christ would dwell in their hearts through faith, and that they would know the love of Christ which surpasses knowledge. \"Now to Him who is able to do far more abundantly beyond all that we ask or think... to Him be the glory.\"",
    v: [
      ["3:6", "The Gentiles are fellow heirs and fellow members of the body", "The secret hidden for ages is now open: Gentiles share fully with Israel in God's promises and in one body, the church."],
      ["3:8", "To me, the very least of all saints, this grace was given", "Paul calls himself the very least of all God's people. He never forgot that he once persecuted the church (1 Timothy 1:15)."],
      ["3:12", "In whom we have boldness and confident access through faith in Him", "Because of Jesus, we can come to God freely and confidently, not afraid of being turned away (Hebrews 4:16)."],
      ["3:17", "So that Christ may dwell in your hearts through faith", "The word for dwell means to settle down and make a home. Paul prays that Christ will be at home in their hearts."],
      ["3:19", "To know the love of Christ which surpasses knowledge", "Christ's love is too big to measure, yet Paul prays that we will truly know it, by living in it more and more."],
      ["3:20", "Able to do far more abundantly beyond all that we ask or think", "God can do far more than we ask, or even imagine. Paul ends his prayer by giving Him glory (3:21)."],
    ],
    w: [["mystery", "mystērion", "G3466", "a secret now revealed", "Not a puzzle, but something God kept hidden in the past and has now made known. Here it is that Jews and Gentiles become one people in Christ.", ["bdag", "hoehner"]]],
    refs: [["EPH.2", "Ephesians 2:11-22", "One new people"], ["COL.1", "Colossians 1:26-27", "Christ in you"], ["GAL.3", "Galatians 3:28-29", "Heirs of the promise"]],
  },
  4: {
    intro: "\"Walk in a manner worthy of the calling with which you have been called, with all humility and gentleness.\" \"There is one body and one Spirit... one Lord, one faith, one baptism, one God and Father of all.\" Christ gave apostles, prophets, evangelists, pastors and teachers to equip the saints for the work of service, so that the body would grow up into Him, speaking the truth in love. So put off the old self and put on the new self. Speak truth, \"be angry, and yet do not sin; do not let the sun go down on your anger.\" Work so you can share. Let your words build up. \"Be kind to one another, tender-hearted, forgiving each other, just as God in Christ also has forgiven you.\"",
    v: [
      ["4:1", "Walk in a manner worthy of the calling", "Paul spent three chapters on what God has done. Now he says: live in a way that matches who you are."],
      ["4:3", "Being diligent to preserve the unity of the Spirit in the bond of peace", "Unity is a gift the Spirit makes, so believers are not asked to create it but to work hard to keep it."],
      ["4:5", "One Lord, one faith, one baptism", "Verses 4-6 list seven \"ones\": one body, Spirit, hope, Lord, faith, baptism, and God and Father. These are the things all believers share."],
      ["4:12", "For the equipping of the saints for the work of service", "Leaders are given to train every member for ministry. In Christ's body there are no spectators."],
      ["4:15", "Speaking the truth in love", "Truth without love wounds; love without truth misleads. Growing up into Christ needs both together."],
      ["4:26", "Do not let the sun go down on your anger", "Anger is not always sin, but it must not be left to grow overnight. Deal with it quickly, before it gives the devil a foothold (4:27)."],
      ["4:32", "Be kind to one another, tender-hearted, forgiving each other", "Kindness, a tender heart and forgiveness, all flowing from the forgiveness God has already given us in Christ."],
    ],
    bg: [["\"He gave gifts to men\"", "Paul quotes Psalm 68:18, a picture of a victorious king going up to his throne with captives and gifts. Paul sees it fulfilled in Christ, who rose and ascended and now gives gifts to His church (4:8-11).", "good", ["arnold", "hoehner"]]],
    w: [["ἑνότης", "henotēs", "G1775", "unity, oneness", "Found only here (4:3, 13) in the New Testament. Paul does not tell the church to create unity but to keep the unity the Spirit has already given.", ["bdag", "stottE"]]],
    refs: [["PSA.68", "Psalm 68:18", "He ascended on high"], ["1CO.12", "1 Corinthians 12", "One body, many gifts"], ["COL.3", "Colossians 3:8-13", "Put off and put on"], ["MAT.6", "Matthew 6:14-15", "Forgive others"]],
  },
  5: {
    intro: "\"Be imitators of God, as beloved children; and walk in love, just as Christ also loved you and gave Himself up for us.\" Avoid immorality, coarse jokes and greed, and instead give thanks. \"You were formerly darkness, but now you are Light in the Lord; walk as children of Light.\" Make the most of your time; do not get drunk with wine, but be filled with the Spirit, singing psalms, hymns and spiritual songs, always giving thanks, and submitting to one another in the fear of Christ. Wives are to respect their husbands as the church does Christ; husbands are to love their wives \"just as Christ also loved the church and gave Himself up for her.\"",
    v: [
      ["5:1", "Be imitators of God, as beloved children", "Children naturally copy the parents they love. God's beloved children learn to copy Him."],
      ["5:2", "Walk in love, just as Christ also loved you", "Jesus' love is the pattern: He gave Himself up for us, \"a fragrant aroma\" pleasing to God."],
      ["5:8", "Walk as children of Light", "Paul does not just say they were in darkness; they were darkness. Now they are light in the Lord, so they live like it."],
      ["5:16", "Making the most of your time", "Literally \"buying up the time,\" like a shopper grabbing a bargain. Every day holds chances to do good."],
      ["5:18", "Be filled with the Spirit", "The contrast is with drunkenness. Instead of wine taking control, let God's Spirit fill and guide you."],
      ["5:21", "Be subject to one another in the fear of Christ", "A bridge into the household teaching that follows (5:22-6:9). Every believer puts others first out of reverence for Christ."],
      ["5:25", "Husbands, love your wives, just as Christ also loved the church", "The standard for husbands is the cross: Christ \"gave Himself up\" for the church. Love that serves and sacrifices."],
    ],
    bg: [["Household rules", "Greek writers such as Aristotle taught how a household should run: husband and wife, parents and children, masters and slaves. Paul's version begins with \"be subject to one another\" (5:21) and calls husbands to love their wives as Christ loved the church and gave Himself for her.", "good", ["arnold", "hoehner"]]],
    w: [["μυστήριον", "mystērion", "G3466", "mystery", "Not a puzzle, but something once hidden that God has now made known. Paul says marriage points to a great mystery: Christ and the church (5:32).", ["bdag", "stottE"]]],
    refs: [["GEN.2", "Genesis 2:24", "One flesh"], ["COL.3", "Colossians 3:16-19", "Songs and families"], ["1PE.3", "1 Peter 3:1-7", "Wives and husbands"], ["JHN.8", "John 8:12", "The Light of the world"]],
  },
  6: {
    intro: "\"Children, obey your parents in the Lord, for this is right. Honor your father and mother (which is the first commandment with a promise).\" Fathers should not provoke their children to anger but bring them up in the discipline and instruction of the Lord. Servants and masters should both serve the Lord, who shows no favoritism. Then: \"Be strong in the Lord and in the strength of His might. Put on the full armor of God,\" for our struggle is not against flesh and blood but against spiritual forces of wickedness. The belt of truth, breastplate of righteousness, shoes of the gospel of peace, shield of faith, helmet of salvation and sword of the Spirit, the word of God, with prayer at all times.",
    v: [
      ["6:1", "Children, obey your parents in the Lord, for this is right", "Paul speaks to children directly, so they were in the room when the letter was read. Obeying parents is right and pleases the Lord."],
      ["6:4", "Fathers, do not provoke your children to anger", "Fathers are not to push their children into anger with harshness or unfairness, but to raise them with the Lord's teaching and care."],
      ["6:10", "Be strong in the Lord and in the strength of His might", "The Christian life is not lived in our own strength. We stand in the Lord's power, the same power that raised Jesus (1:19-20)."],
      ["6:11", "Put on the full armor of God", "Dressed for battle. Families with young children love acting out the armor of God, one piece at a time."],
      ["6:12", "Our struggle is not against flesh and blood", "Our real fight is not with people but with spiritual forces of evil. That is why God's armor is needed."],
      ["6:17", "The sword of the Spirit, which is the word of God", "The only weapon in the armor list is God's word. Jesus answered the devil's temptations with Scripture (Matthew 4:1-11)."],
      ["6:18", "With all prayer and petition pray at all times in the Spirit", "Prayer ties the whole armor together: at all times, in the Spirit, staying alert, and praying for all of God's people."],
    ],
    bg: [["A soldier at the door", "Paul wrote as a prisoner, likely chained to a Roman soldier (6:20). He could look at the soldier's belt, breastplate, sandals, shield, helmet and short sword as he described God's armor.", "good", ["arnold", "stottE"]]],
    refs: [["EXO.20", "Exodus 20:12", "Honor your father and mother"], ["ISA.59", "Isaiah 59:17", "God's breastplate and helmet"], ["ISA.52", "Isaiah 52:7", "Feet that bring good news"], ["HEB.4", "Hebrews 4:12", "The word is sharper than a sword"]],
  },
});
