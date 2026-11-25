// 1 John chapter notes.
import { makeBook } from "./make.js";

const sources = {
  yarbrough: "Robert W. Yarbrough, 1-3 John, Baker Exegetical Commentary on the New Testament (Baker Academic, 2008).",
  kruseJ: "Colin G. Kruse, The Letters of John, 2nd ed., Pillar New Testament Commentary (Eerdmans, 2020).",
  marshallJ: "I. Howard Marshall, The Epistles of John, New International Commentary on the New Testament (Eerdmans, 1978).",
  stottJ: "John Stott, The Letters of John, rev. ed., Tyndale New Testament Commentaries (InterVarsity Press, 1988).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["yarbrough", "kruseJ"] }, {
  1: {
    intro: "John writes about \"what was from the beginning, what we have heard, what we have seen with our eyes, what we have looked at and touched with our hands, concerning the Word of Life.\" He shares it so his readers can have fellowship with the apostles and with the Father and the Son, and so their joy may be complete. \"God is Light, and in Him there is no darkness at all.\" If we walk in the light, we have fellowship with one another, and the blood of Jesus cleanses us from all sin. \"If we say that we have no sin, we are deceiving ourselves... If we confess our sins, He is faithful and righteous to forgive us our sins and to cleanse us from all unrighteousness.\"",
    v: [
      ["1:1", "What we have looked at and touched with our hands", "John heard, saw and touched Jesus. The faith rests on real eyewitnesses of a real person, not on a story or an idea."],
      ["1:3", "Our fellowship is with the Father, and with His Son Jesus Christ", "John shares what he saw so that readers can share in the same friendship with God the apostles enjoy."],
      ["1:4", "So that our joy may be made complete", "Sharing the good news makes joy complete, both for the one telling and for those who hear."],
      ["1:5", "God is Light, and in Him there is no darkness at all", "God is completely pure and true. There is nothing dark or deceptive in Him at all."],
      ["1:7", "The blood of Jesus His Son cleanses us from all sin", "Walking in the light does not mean never sinning; it means living openly before God, and Jesus' blood keeps cleansing us."],
      ["1:9", "If we confess our sins, He is faithful and righteous to forgive us", "Confessing means agreeing with God about our sin. He forgives because He is faithful to His promise and just, since Jesus paid for it."],
    ],
    bg: [["Why John wrote", "The apostle John wrote late in the first century, probably from Ephesus. Some people had left the church teaching that Jesus did not truly come in the flesh and that sin did not matter. John writes to reassure believers and help them know they have eternal life (5:13).", "strong", ["yarbrough", "stottJ"]]],
    refs: [["JHN.1", "John 1:1-14", "The Word was from the beginning"], ["PSA.32", "Psalm 32:5", "I acknowledged my sin"], ["JHN.8", "John 8:12", "The Light of the world"]],
  },
  2: {
    intro: "\"My little children, I am writing these things to you so that you may not sin. And if anyone sins, we have an Advocate with the Father, Jesus Christ the righteous; and He Himself is the propitiation for our sins.\" We know we have come to know Him if we keep His commandments; whoever says he abides in Him should walk as Jesus walked. The one who loves his brother abides in the light. John writes to children, fathers and young men. \"Do not love the world nor the things in the world\"; the world is passing away, \"but the one who does the will of God lives forever.\" Many antichrists have come, denying that Jesus is the Christ. But you have the anointing from the Holy One; abide in Him.",
    v: [
      ["2:1", "We have an Advocate with the Father, Jesus Christ the righteous", "John hopes they will not sin, but if they do, Jesus stands beside them before the Father, like a defense lawyer who is Himself righteous."],
      ["2:2", "He Himself is the propitiation for our sins", "Propitiation means the sacrifice that turns away God's anger against sin. Jesus' death is enough for the whole world."],
      ["2:6", "The one who says he abides in Him ought himself to walk in the same manner as He walked", "Saying we belong to Jesus is easy. The proof is living the way He lived."],
      ["2:10", "The one who loves his brother abides in the Light", "Love keeps us in the light, where we can see clearly and do not trip ourselves or others."],
      ["2:15", "Do not love the world nor the things in the world", "\"The world\" here means life arranged without God: cravings, greed and pride (2:16). We cannot love that and the Father at once."],
      ["2:17", "The one who does the will of God lives forever", "The world and its desires are passing away. Only a life that does God's will lasts forever."],
      ["2:28", "Abide in Him, so that when He appears, we may have confidence", "Abiding, staying close to Jesus day by day, means we will be glad, not ashamed, to see Him when He comes."],
    ],
    w: [["Advocate", "paraklētos", "G3875", "advocate, helper, one called alongside", "A friend who stands beside you in court to speak for you. Jesus calls the Holy Spirit by this name too (John 14:16).", ["bdag", "kruseJ"]]],
    refs: [["JHN.14", "John 14:16", "Another Helper"], ["JHN.13", "John 13:34", "Love one another"], ["ROM.12", "Romans 12:2", "Do not be conformed"]],
  },
  3: {
    intro: "\"See how great a love the Father has bestowed on us, that we would be called children of God; and such we are.\" \"We know that when He appears, we will be like Him, because we will see Him just as He is.\" Everyone with this hope purifies himself. God's children do not keep on living in sin, because His seed abides in them. \"The Son of God appeared for this purpose, to destroy the works of the devil.\" Do not be like Cain. \"We know love by this, that He laid down His life for us; and we ought to lay down our lives for the brethren.\" \"Let us not love with word or with tongue, but in deed and truth.\" If our heart condemns us, \"God is greater than our heart.\"",
    v: [
      ["3:1", "See how great a love the Father has bestowed on us, that we would be called children of God", "John is amazed: not just called God's children, \"and such we are.\" It is a real family relationship."],
      ["3:2", "When He appears, we will be like Him, because we will see Him just as He is", "We do not know everything about the future, but we know this: when Jesus appears, we will see Him and be like Him."],
      ["3:8", "The Son of God appeared for this purpose, to destroy the works of the devil", "Jesus came to undo everything the devil has done: sin, lies and death."],
      ["3:16", "We know love by this, that He laid down His life for us", "Love is not first a feeling but an action, and the cross shows what it looks like. So we give ourselves for others too."],
      ["3:18", "Let us not love with word or with tongue, but in deed and truth", "Talk is cheap. Real love shows in practical help, like sharing with a brother or sister in need (3:17)."],
      ["3:20", "God is greater than our heart and knows all things", "When our conscience condemns us, we can rest in God, who knows everything, including our trust in Him, and is greater than our guilt."],
    ],
    bg: [["Cain", "John points to Cain, who killed his brother Abel (Genesis 4:8), as the opposite of love. Cain hated his brother because his own deeds were evil (3:12). Love lays down its life for others, as Christ did (3:16).", "good", ["yarbrough", "kruseJ"]]],
    w: [["τέκνον", "teknon", "G5043", "child", "John loves to call believers God's children. \"See how great a love the Father has bestowed on us, that we would be called children of God; and such we are\" (3:1).", ["bdag", "stottJ"]]],
    refs: [["GEN.4", "Genesis 4:1-8", "Cain and Abel"], ["JHN.15", "John 15:13", "Greater love"], ["JAS.2", "James 2:15-16", "Faith that helps"]],
  },
  4: {
    intro: "\"Do not believe every spirit, but test the spirits.\" Every spirit that confesses that Jesus Christ has come in the flesh is from God. \"Greater is He who is in you than he who is in the world.\" \"Beloved, let us love one another, for love is from God... for God is love.\" God showed His love by sending His only Son so we might live through Him. \"In this is love, not that we loved God, but that He loved us and sent His Son to be the propitiation for our sins.\" No one has seen God, but if we love one another, God abides in us. \"There is no fear in love; but perfect love casts out fear.\" \"We love, because He first loved us.\"",
    v: [
      ["4:1", "Do not believe every spirit, but test the spirits", "Not every teacher who claims to speak for God really does. Test what you hear against the truth about Jesus (4:2-3)."],
      ["4:4", "Greater is He who is in you than he who is in the world", "God's Spirit living in believers is far stronger than any power at work in the world."],
      ["4:8", "God is love", "Love is not just something God does; it is who He is. That is why people who do not love do not really know Him."],
      ["4:10", "Not that we loved God, but that He loved us", "Love started with God, not with us. He sent His Son to be the sacrifice for our sins."],
      ["4:11", "If God so loved us, we also ought to love one another", "God's love is meant to flow on through us to one another."],
      ["4:18", "Perfect love casts out fear", "The more we know God's complete love, the less we fear His judgment. Love and terror cannot live together."],
      ["4:19", "We love, because He first loved us", "Why we love. \"God is love\" (4:8) and \"We love, because He first loved us\" (4:19) are short enough for the youngest in the family to memorize."],
    ],
    refs: [["JHN.3", "John 3:16", "God so loved the world"], ["DEU.13", "Deuteronomy 13:1-4", "Testing prophets"], ["ROM.5", "Romans 5:8", "While we were sinners"]],
  },
  5: {
    intro: "Whoever believes that Jesus is the Christ is born of God, and loving God means keeping His commandments, which are not burdensome. \"This is the victory that has overcome the world, our faith.\" Jesus came by water and blood, and the Spirit testifies. \"God has given us eternal life, and this life is in His Son. He who has the Son has the life.\" \"These things I have written to you who believe in the name of the Son of God, so that you may know that you have eternal life.\" If we ask anything according to His will, He hears us. \"Little children, guard yourselves from idols.\"",
    v: [
      ["5:3", "His commandments are not burdensome", "Love for God shows up as obedience, and His commands are not crushing weights. They are what love looks like."],
      ["5:4", "This is the victory that has overcome the world, our faith", "The world's pull is strong, but trusting Jesus has already won. John uses \"overcome\" more than any other New Testament writer."],
      ["5:11", "God has given us eternal life, and this life is in His Son", "Eternal life is not a prize we earn on our own; it is found in a Person. To have Jesus is to have life."],
      ["5:12", "He who has the Son has the life", "John puts it in plain words that a child can say: have the Son, have the life."],
      ["5:13", "So that you may know that you have eternal life", "John wrote so believers can be sure, not anxious. This is why John wrote his letter, as John 20:31 is why he wrote his Gospel."],
      ["5:14", "If we ask anything according to His will, He hears us", "Prayer is not a way to bend God to our will, but asking in line with His will, and that kind of prayer He always hears."],
      ["5:21", "Little children, guard yourselves from idols", "The letter ends with a warning: anything that takes God's place in our hearts is an idol."],
    ],
    bg: [["The extra words in 5:7-8", "The King James Version adds words about \"the Father, the Word, and the Holy Ghost\" in 5:7-8. They are not found in any Greek manuscript before the late Middle Ages, so modern translations leave them out. The Trinity is taught elsewhere in Scripture and does not depend on these words.", "strong", ["kruseJ", "marshallJ"]]],
    w: [["νικάω", "nikaō", "G3528", "to overcome, win", "Related to Nike, the Greek goddess of victory. \"This is the victory that has overcome the world: our faith\" (5:4).", ["bdag", "yarbrough"]]],
    refs: [["JHN.20", "John 20:31", "That you may believe and have life"], ["JHN.19", "John 19:34", "Blood and water"], ["JHN.14", "John 14:13-14", "Ask in My name"]],
  },
});
