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
      ["1:1", "What we have looked at and touched with our hands", "Real eyewitnesses."],
      ["1:3", "Our fellowship is with the Father, and with His Son Jesus Christ", "Fellowship."],
      ["1:4", "So that our joy may be made complete", "Full joy."],
      ["1:5", "God is Light, and in Him there is no darkness at all", "Pure light."],
      ["1:7", "The blood of Jesus His Son cleanses us from all sin", "Cleansed."],
      ["1:9", "If we confess our sins, He is faithful and righteous to forgive us", "Confess and be forgiven."],
    ],
    bg: [["Why John wrote", "The apostle John wrote late in the first century, probably from Ephesus. Some people had left the church teaching that Jesus did not truly come in the flesh and that sin did not matter. John writes to reassure believers and help them know they have eternal life (5:13).", "strong", ["yarbrough", "stottJ"]]],
    refs: [["JHN.1", "John 1:1-14", "The Word was from the beginning"], ["PSA.32", "Psalm 32:5", "I acknowledged my sin"], ["JHN.8", "John 8:12", "The Light of the world"]],
  },
  2: {
    intro: "\"My little children, I am writing these things to you so that you may not sin. And if anyone sins, we have an Advocate with the Father, Jesus Christ the righteous; and He Himself is the propitiation for our sins.\" We know we have come to know Him if we keep His commandments; whoever says he abides in Him should walk as Jesus walked. The one who loves his brother abides in the light. John writes to children, fathers and young men. \"Do not love the world nor the things in the world\"; the world is passing away, \"but the one who does the will of God lives forever.\" Many antichrists have come, denying that Jesus is the Christ. But you have the anointing from the Holy One; abide in Him.",
    v: [
      ["2:1", "We have an Advocate with the Father, Jesus Christ the righteous", "Jesus speaks for us."],
      ["2:2", "He Himself is the propitiation for our sins", "For the whole world."],
      ["2:6", "The one who says he abides in Him ought himself to walk in the same manner as He walked", "Walk like Jesus."],
      ["2:10", "The one who loves his brother abides in the Light", "Love lights the way."],
      ["2:15", "Do not love the world nor the things in the world", "What we love."],
      ["2:17", "The one who does the will of God lives forever", "What lasts."],
      ["2:28", "Abide in Him, so that when He appears, we may have confidence", "Stay close."],
    ],
    w: [["Advocate", "paraklētos", "G3875", "advocate, helper, one called alongside", "A friend who stands beside you in court to speak for you. Jesus calls the Holy Spirit by this name too (John 14:16).", ["bdag", "kruseJ"]]],
    refs: [["JHN.14", "John 14:16", "Another Helper"], ["JHN.13", "John 13:34", "Love one another"], ["ROM.12", "Romans 12:2", "Do not be conformed"]],
  },
  3: {
    intro: "\"See how great a love the Father has bestowed on us, that we would be called children of God; and such we are.\" \"We know that when He appears, we will be like Him, because we will see Him just as He is.\" Everyone with this hope purifies himself. God's children do not keep on living in sin, because His seed abides in them. \"The Son of God appeared for this purpose, to destroy the works of the devil.\" Do not be like Cain. \"We know love by this, that He laid down His life for us; and we ought to lay down our lives for the brethren.\" \"Let us not love with word or with tongue, but in deed and truth.\" If our heart condemns us, \"God is greater than our heart.\"",
    v: [
      ["3:1", "See how great a love the Father has bestowed on us, that we would be called children of God", "Children of God."],
      ["3:2", "When He appears, we will be like Him, because we will see Him just as He is", "Like Him."],
      ["3:8", "The Son of God appeared for this purpose, to destroy the works of the devil", "Why Jesus came."],
      ["3:16", "We know love by this, that He laid down His life for us", "What love is."],
      ["3:18", "Let us not love with word or with tongue, but in deed and truth", "Love in action."],
      ["3:20", "God is greater than our heart and knows all things", "Greater than guilt."],
    ],
    refs: [["GEN.4", "Genesis 4:1-8", "Cain and Abel"], ["JHN.15", "John 15:13", "Greater love"], ["JAS.2", "James 2:15-16", "Faith that helps"]],
  },
  4: {
    intro: "\"Do not believe every spirit, but test the spirits.\" Every spirit that confesses that Jesus Christ has come in the flesh is from God. \"Greater is He who is in you than he who is in the world.\" \"Beloved, let us love one another, for love is from God... for God is love.\" God showed His love by sending His only Son so we might live through Him. \"In this is love, not that we loved God, but that He loved us and sent His Son to be the propitiation for our sins.\" No one has seen God, but if we love one another, God abides in us. \"There is no fear in love; but perfect love casts out fear.\" \"We love, because He first loved us.\"",
    v: [
      ["4:1", "Do not believe every spirit, but test the spirits", "Test what you hear."],
      ["4:4", "Greater is He who is in you than he who is in the world", "God is greater."],
      ["4:8", "God is love", "Who God is."],
      ["4:10", "Not that we loved God, but that He loved us", "He loved first."],
      ["4:11", "If God so loved us, we also ought to love one another", "Pass it on."],
      ["4:18", "Perfect love casts out fear", "No fear."],
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
    refs: [["JHN.20", "John 20:31", "That you may believe and have life"], ["JHN.19", "John 19:34", "Blood and water"], ["JHN.14", "John 14:13-14", "Ask in My name"]],
  },
});
