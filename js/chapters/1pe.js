// 1 Peter chapter notes.
import { makeBook } from "./make.js";

const sources = {
  jobes: "Karen H. Jobes, 1 Peter, Baker Exegetical Commentary on the New Testament (Baker Academic, 2005).",
  davidsP: "Peter H. Davids, The First Epistle of Peter, New International Commentary on the New Testament (Eerdmans, 1990).",
  grudem: "Wayne Grudem, 1 Peter, Tyndale New Testament Commentaries (InterVarsity Press, 1988).",
  schreinerP: "Thomas R. Schreiner, 1, 2 Peter, Jude, New American Commentary 37 (Broadman and Holman, 2003).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["jobes", "schreinerP"] }, {
  1: {
    intro: "Peter writes to God's chosen people living as strangers scattered across what is now Turkey. \"Blessed be the God and Father of our Lord Jesus Christ, who according to His great mercy has caused us to be born again to a living hope through the resurrection of Jesus Christ from the dead, to obtain an inheritance which is imperishable and undefiled and will not fade away, reserved in heaven for you.\" Trials test faith like fire refines gold. \"Though you have not seen Him, you love Him.\" So be holy, \"for I am holy.\" You were redeemed not with silver or gold, \"but with precious blood, as of a lamb unblemished and spotless, the blood of Christ.\" \"The word of the Lord endures forever.\"",
    v: [
      ["1:3", "Born again to a living hope through the resurrection of Jesus Christ", "Our hope is alive because Jesus is alive. The resurrection gives believers a new birth into a hope that cannot die."],
      ["1:4", "An inheritance which is imperishable and undefiled and will not fade away", "Earthly treasures decay, get spoiled and fade. This inheritance does none of those, and it is \"reserved in heaven\" for you."],
      ["1:7", "The proof of your faith, being more precious than gold which is perishable", "Gold is tested in fire to prove it is real. Trials test faith the same way, and real faith is worth far more than gold."],
      ["1:8", "Though you have not seen Him, you love Him", "Peter had seen Jesus; his readers had not. Yet they loved Him and were filled with joy beyond words."],
      ["1:16", "You shall be holy, for I am holy", "Quoting Leviticus 11:44. God's people are called to be like Him, set apart from sin and set apart for Him."],
      ["1:19", "With precious blood, as of a lamb unblemished and spotless", "Like the Passover lamb, which had to be without defect (Exodus 12:5). Jesus' blood was the price of our freedom."],
      ["1:25", "The word of the Lord endures forever", "Quoting Isaiah 40:8. People and their glory wither like grass, but God's word lasts forever, and that word was preached to you."],
    ],
    bg: [["Strangers and exiles", "Peter wrote from Rome (he calls it \"Babylon\" in 5:13) in the early 60s AD, probably with Silvanus's help. His readers, mostly Gentile believers, felt like outsiders because their faith set them apart from their neighbors.", "strong", ["jobes", "davidsP"]]],
    refs: [["LEV.11", "Leviticus 11:44", "Be holy, for I am holy"], ["ISA.40", "Isaiah 40:6-8", "The word stands forever"], ["JHN.20", "John 20:29", "Blessed are those who have not seen"], ["EXO.12", "Exodus 12:5", "A lamb without blemish"]],
  },
  2: {
    intro: "\"Like newborn babies, long for the pure milk of the word, so that by it you may grow.\" Come to Jesus, the living stone rejected by people but chosen by God, and \"you also, as living stones, are being built up as a spiritual house.\" \"But you are a chosen race, a royal priesthood, a holy nation, a people for God's own possession, so that you may proclaim the excellencies of Him who has called you out of darkness into His marvelous light.\" Live honorably among outsiders. Submit to authorities; \"honor all people, love the brotherhood, fear God, honor the king.\" Servants should endure unjust suffering as Christ did, who \"Himself bore our sins in His body on the cross... for by His wounds you were healed.\"",
    v: [
      ["2:2", "Like newborn babies, long for the pure milk of the word", "Babies don't need to be told to be hungry. Peter wants believers to crave God's word that same way, and grow by it."],
      ["2:5", "You also, as living stones, are being built up as a spiritual house", "Jesus is the living cornerstone (2:4, 6), and His people are stones built onto Him, together making a house where God is worshiped."],
      ["2:9", "You are a chosen race, a royal priesthood, a holy nation", "Titles once given to Israel at Mount Sinai (Exodus 19:5-6) now describe all who belong to Christ, with a purpose: to proclaim His excellencies."],
      ["2:11", "As aliens and strangers", "Believers live like foreigners in this world, because their true home is with God (Philippians 3:20; Hebrews 11:13)."],
      ["2:17", "Honor all people, love the brotherhood, fear God, honor the king", "Four short commands in one verse: respect everyone, love fellow believers, fear God, and honor those in authority."],
      ["2:21", "Christ also suffered for you, leaving you an example", "The Greek word for example was used for a tracing pattern that children copied when learning to write. We trace the outline of Jesus' life."],
      ["2:24", "By His wounds you were healed", "Quoting Isaiah 53:5. Jesus carried our sins in His own body on the cross so that we could be healed and live for righteousness."],
    ],
    refs: [["PSA.118", "Psalm 118:22", "The rejected stone"], ["EXO.19", "Exodus 19:5-6", "A kingdom of priests"], ["ISA.53", "Isaiah 53:4-9", "By His wounds"], ["ROM.13", "Romans 13:1-7", "Governing authorities"]],
  },
  3: {
    intro: "Wives may win unbelieving husbands without a word by their pure and respectful lives, with the inner beauty of \"a gentle and quiet spirit, which is precious in the sight of God.\" Husbands should live with their wives in an understanding way, honoring them as fellow heirs of the grace of life. All of you, be harmonious, kind and humble, \"not returning evil for evil.\" \"Sanctify Christ as Lord in your hearts, always being ready to make a defense to everyone who asks you to give an account for the hope that is in you, yet with gentleness and reverence.\" Christ died for sins once for all, \"the just for the unjust, so that He might bring us to God.\" Peter compares Noah's flood to baptism, which saves \"through the resurrection of Jesus Christ.\"",
    v: [
      ["3:4", "A gentle and quiet spirit, which is precious in the sight of God", "Inner beauty."],
      ["3:7", "Grant her honor as a fellow heir of the grace of life", "Honor in marriage."],
      ["3:9", "Not returning evil for evil... but giving a blessing instead", "Bless instead."],
      ["3:15", "Always being ready to make a defense... yet with gentleness and reverence", "Ready to share."],
      ["3:18", "Christ also died for sins once for all, the just for the unjust", "To bring us to God."],
      ["3:21", "Baptism now saves you... through the resurrection of Jesus Christ", "Noah and baptism."],
    ],
    views: [["\"Baptism now saves you\" (3:21)", "Some scholars read Peter as saying God saves through baptism as the moment a believer, trusting the risen Christ, appeals to God for a clean conscience. Others read baptism here as the outward pledge and picture of a salvation already received by faith, stressing Peter's words that it is \"not the removal of dirt from the flesh.\" All agree that the saving power comes from Christ's resurrection, not the water itself, and that baptism was expected of every believer.", ["jobes", "schreinerP", "grudem"]]],
    refs: [["GEN.6", "Genesis 6-8", "Noah's ark"], ["EPH.5", "Ephesians 5:25-33", "Husbands and wives"], ["ROM.12", "Romans 12:17-21", "Do not repay evil"], ["ACT.2", "Acts 2:38", "Repent and be baptized"]],
  },
  4: {
    intro: "Since Christ suffered in the flesh, arm yourselves with the same purpose and live for the will of God, not old desires. \"The end of all things is near; therefore, be of sound judgment and sober spirit for the purpose of prayer. Above all, keep fervent in your love for one another, because love covers a multitude of sins.\" Be hospitable without complaint. \"As each one has received a special gift, employ it in serving one another as good stewards of the manifold grace of God.\" Do not be surprised at the fiery trial; rejoice to share Christ's sufferings. If you suffer as a Christian, do not be ashamed, but glorify God in this name, and entrust your soul to a faithful Creator.",
    v: [
      ["4:7", "The end of all things is near; therefore, be of sound judgment", "Because the end is near, stay level-headed and alert, so that you can pray well."],
      ["4:8", "Love covers a multitude of sins", "Deep love does not keep score. It is quick to forgive and slow to broadcast other people's faults (Proverbs 10:12)."],
      ["4:9", "Be hospitable to one another without complaint", "Open your home to fellow believers, and do it gladly. In the early church, Christian travelers depended on such welcomes."],
      ["4:10", "As each one has received a special gift, employ it in serving one another", "Every believer has received some gift from God. Gifts are not trophies to keep but tools to serve others with."],
      ["4:12", "Do not be surprised at the fiery ordeal among you", "Believers should not think suffering means something has gone wrong. Following a crucified Savior brings trials."],
      ["4:16", "If anyone suffers as a Christian, he is not to be ashamed", "\"Christian\" may first have been a name used by outsiders (Acts 11:26). Peter says to wear it with honor, not shame."],
      ["4:19", "Entrust their souls to a faithful Creator in doing what is right", "In suffering, keep doing good and hand yourself over to God, who made you and keeps His promises."],
    ],
    w: [["Christian", "Christianos", "G5546", "Christian, a follower of Christ", "A nickname outsiders gave believers, first in Antioch (Acts 11:26). It appears only three times in the New Testament.", ["bdag", "jobes"]]],
    refs: [["PRO.10", "Proverbs 10:12", "Love covers all transgressions"], ["ROM.12", "Romans 12:6-13", "Gifts and hospitality"], ["ACT.5", "Acts 5:41", "Rejoicing to suffer for His name"]],
  },
  5: {
    intro: "Peter, \"your fellow elder and witness of the sufferings of Christ,\" urges the elders: \"Shepherd the flock of God among you,\" not under compulsion or for money, but willingly and as examples. When the Chief Shepherd appears, you will receive the unfading crown of glory. \"Clothe yourselves with humility toward one another, for God is opposed to the proud, but gives grace to the humble.\" \"Casting all your anxiety on Him, because He cares for you.\" \"Be of sober spirit, be on the alert. Your adversary, the devil, prowls around like a roaring lion.\" After you have suffered a little while, the God of all grace will Himself perfect, confirm, strengthen and establish you. Silvanus and Mark send greetings.",
    v: [
      ["5:2", "Shepherd the flock of God among you", "Caring leaders."],
      ["5:4", "When the Chief Shepherd appears, you will receive the unfading crown of glory", "The Chief Shepherd."],
      ["5:5", "Clothe yourselves with humility toward one another", "Humble clothes."],
      ["5:7", "Casting all your anxiety on Him, because He cares for you", "He cares for you. 1 Peter 5:7 is a verse worth memorizing at any age: throw your worries on God, because He cares."],
      ["5:8", "Your adversary, the devil, prowls around like a roaring lion", "Stay alert."],
      ["5:10", "The God of all grace... will Himself perfect, confirm, strengthen and establish you", "God will restore."],
    ],
    refs: [["JHN.21", "John 21:15-17", "Tend My sheep"], ["PSA.55", "Psalm 55:22", "Cast your burden on the LORD"], ["JAS.4", "James 4:6-10", "Grace to the humble"], ["ACT.12", "Acts 12:12", "Mark's family home"]],
  },
});
