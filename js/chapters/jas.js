// James chapter notes.
import { makeBook } from "./make.js";

const sources = {
  mooJ: "Douglas J. Moo, The Letter of James, 2nd ed., Pillar New Testament Commentary (Eerdmans, 2021).",
  mcknight: "Scot McKnight, The Letter of James, New International Commentary on the New Testament (Eerdmans, 2011).",
  davids: "Peter H. Davids, The Epistle of James, New International Greek Testament Commentary (Eerdmans, 1982).",
  blomberg: "Craig L. Blomberg and Mariam J. Kamell, James, Zondervan Exegetical Commentary on the New Testament (Zondervan, 2008).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["mooJ", "mcknight"] }, {
  1: {
    intro: "James, a bond-servant of God and of the Lord Jesus Christ, writes to believers scattered abroad. \"Consider it all joy, my brethren, when you encounter various trials, knowing that the testing of your faith produces endurance.\" If you lack wisdom, ask God, who gives generously, but ask in faith without doubting. Temptation does not come from God; \"every good thing given and every perfect gift is from above, coming down from the Father of lights.\" \"Everyone must be quick to hear, slow to speak and slow to anger.\" \"Prove yourselves doers of the word, and not merely hearers.\" Pure religion is to visit orphans and widows in their distress and keep oneself unstained by the world.",
    v: [
      ["1:2", "Consider it all joy, my brethren, when you encounter various trials", "Joy in trials."],
      ["1:5", "If any of you lacks wisdom, let him ask of God, who gives to all generously", "Ask for wisdom."],
      ["1:12", "Blessed is a man who perseveres under trial", "The crown of life."],
      ["1:17", "Every good thing given and every perfect gift is from above", "Good gifts."],
      ["1:19", "Quick to hear, slow to speak and slow to anger", "Listen first."],
      ["1:22", "Prove yourselves doers of the word, and not merely hearers", "Do it."],
      ["1:27", "To visit orphans and widows in their distress", "Pure religion."],
    ],
    bg: [["James, the brother of Jesus", "Most scholars think this James is the half-brother of Jesus, who did not believe during Jesus' ministry (John 7:5) but saw the risen Lord (1 Corinthians 15:7) and became a leader of the Jerusalem church (Acts 15). He writes humbly as a servant, not as Jesus' brother.", "strong", ["mooJ", "mcknight"]]],
    refs: [["ROM.5", "Romans 5:3-5", "Tribulation brings perseverance"], ["PRO.2", "Proverbs 2:6", "The LORD gives wisdom"], ["MAT.7", "Matthew 7:24-27", "Hear and do"], ["ACT.15", "Acts 15:13-21", "James speaks"]],
  },
  2: {
    intro: "Do not show favoritism. If a rich man in fine clothes and a poor man in dirty clothes come into your meeting, and you give the rich man the good seat, you have become judges with evil motives. \"Did not God choose the poor of this world to be rich in faith?\" Keep the royal law: \"You shall love your neighbor as yourself.\" \"Mercy triumphs over judgment.\" Then: \"What use is it, my brethren, if someone says he has faith but he has no works?\" If a brother is without clothes and food, saying \"Go in peace, be warmed and be filled\" does nothing. \"Faith, if it has no works, is dead.\" Abraham's faith was shown by offering Isaac; Rahab's by hiding the spies.",
    v: [
      ["2:1", "Do not hold your faith in our glorious Lord Jesus Christ with an attitude of personal favoritism", "No favorites."],
      ["2:5", "Did not God choose the poor of this world to be rich in faith?", "Rich in faith."],
      ["2:8", "You shall love your neighbor as yourself", "The royal law."],
      ["2:13", "Mercy triumphs over judgment", "Mercy wins."],
      ["2:17", "Faith, if it has no works, is dead, being by itself", "Living faith."],
      ["2:18", "I will show you my faith by my works", "Faith you can see."],
      ["2:26", "As the body without the spirit is dead, so also faith without works is dead", "Body and breath."],
    ],
    views: [["James and Paul on faith and works", "Paul says a person is justified by faith apart from works of the Law (Romans 3:28); James says a person is justified by works and not by faith alone (2:24). Most scholars see no contradiction: Paul fights the idea of earning God's favor through the Law, while James fights an empty faith that changes nothing. Some read James's \"justified\" as being shown to be right before people; others as God's final verdict on a faith that has proved real. Both apostles use Abraham, and both agree that true faith works through love.", ["mooJ", "mcknight", "davids"]]],
    refs: [["LEV.19", "Leviticus 19:15-18", "No partiality; love your neighbor"], ["GEN.22", "Genesis 22", "Abraham offers Isaac"], ["JOS.2", "Joshua 2", "Rahab hides the spies"], ["GAL.5", "Galatians 5:6", "Faith working through love"]],
  },
  3: {
    intro: "Not many should become teachers, since teachers will be judged more strictly. \"We all stumble in many ways.\" The tongue is small, like a horse's bit, a ship's rudder, or a spark that sets a forest on fire. People can tame every kind of animal, \"but no one can tame the tongue.\" \"With it we bless our Lord and Father, and with it we curse men, who have been made in the likeness of God... My brethren, these things ought not to be this way.\" Does a spring give both fresh and bitter water? Wisdom from above is \"first pure, then peaceable, gentle, reasonable, full of mercy and good fruits, unwavering, without hypocrisy.\"",
    v: [
      ["3:2", "We all stumble in many ways", "Even teachers, maybe especially teachers, make mistakes. Our words are where we stumble most often."],
      ["3:4", "Directed by a very small rudder", "A tiny rudder steers a huge ship. The tongue is small but can steer the direction of a whole life."],
      ["3:5", "See how great a forest is set aflame by such a small fire!", "One spark can burn a whole forest. One careless word can do damage that spreads far beyond what we meant."],
      ["3:8", "No one can tame the tongue", "People have tamed every kind of animal, but no one can tame the tongue alone. We need God's help with our words."],
      ["3:10", "From the same mouth come both blessing and cursing", "Praising God and then cursing people made in His image (3:9) from the same mouth \"ought not to be this way.\""],
      ["3:17", "The wisdom from above is first pure, then peaceable, gentle", "True wisdom is shown less by cleverness than by character: pure, peaceful, gentle, open to reason, merciful and sincere."],
      ["3:18", "The seed whose fruit is righteousness is sown in peace", "Peacemakers are like farmers. They plant peace, and a harvest of righteousness grows from it."],
    ],
    refs: [["PRO.18", "Proverbs 18:21", "Death and life are in the tongue"], ["PSA.141", "Psalm 141:3", "Set a guard over my mouth"], ["MAT.12", "Matthew 12:34-37", "Out of the heart the mouth speaks"]],
  },
  4: {
    intro: "Where do quarrels come from? From desires at war inside you. \"You do not have because you do not ask.\" Friendship with the world is hostility toward God. \"God is opposed to the proud, but gives grace to the humble. Submit therefore to God. Resist the devil and he will flee from you. Draw near to God and He will draw near to you.\" \"Humble yourselves in the presence of the Lord, and He will exalt you.\" Do not speak against one another. And do not boast about tomorrow: \"You are just a vapor that appears for a little while and then vanishes away. Instead, you ought to say, 'If the Lord wills, we will live and also do this or that.'\"",
    v: [
      ["4:2", "You do not have because you do not ask", "Quarrels come from wanting what we do not have. James says the better way is to ask God, and to ask with right motives (4:3)."],
      ["4:6", "God is opposed to the proud, but gives grace to the humble", "Quoting Proverbs 3:34. God resists the proud, but there is always more grace for those who humble themselves."],
      ["4:7", "Resist the devil and he will flee from you", "First submit to God, then stand against the devil. He is not stronger than God, and he will run."],
      ["4:8", "Draw near to God and He will draw near to you", "God invites us to come near, with clean hands and a pure heart (Psalm 24:3-4), and He promises to meet us."],
      ["4:10", "Humble yourselves in the presence of the Lord, and He will exalt you", "The way up is down. Jesus taught the same: whoever humbles himself will be exalted (Luke 14:11)."],
      ["4:14", "You are just a vapor that appears for a little while", "Like morning mist that disappears as the sun rises. Our lives are short, so we hold our plans loosely."],
      ["4:15", "If the Lord wills, we will live and also do this or that", "Planning is not wrong; leaving God out of our plans is. Saying \"if the Lord wills\" keeps us humble and trusting."],
    ],
    refs: [["PRO.3", "Proverbs 3:34", "He gives grace to the afflicted"], ["PRO.27", "Proverbs 27:1", "Do not boast about tomorrow"], ["1PE.5", "1 Peter 5:5-9", "Humble yourselves; resist the devil"]],
  },
  5: {
    intro: "James warns rich oppressors who held back workers' wages and lived in luxury: the cries of the workers have reached the Lord. \"Be patient, therefore, brethren, until the coming of the Lord,\" like a farmer waiting for the early and late rains. Remember the prophets and Job's endurance, and \"the Lord is full of compassion and is merciful.\" Let your yes be yes and your no be no. \"Is anyone among you suffering? Then he must pray. Is anyone cheerful? He is to sing praises.\" If anyone is sick, call the elders to pray and anoint him with oil. \"Confess your sins to one another, and pray for one another so that you may be healed. The effective prayer of a righteous man can accomplish much,\" like Elijah, who was a man just like us.",
    v: [
      ["5:4", "The pay of the laborers... cries out against you", "God hears the wronged."],
      ["5:7", "Be patient, therefore, brethren, until the coming of the Lord", "Patient waiting."],
      ["5:11", "You have heard of the endurance of Job", "Job's endurance."],
      ["5:12", "Your yes is to be yes, and your no, no", "Honest words."],
      ["5:13", "Is anyone among you suffering? Then he must pray", "Pray and sing."],
      ["5:16", "The effective prayer of a righteous man can accomplish much", "Prayer works."],
      ["5:17", "Elijah was a man with a nature like ours", "Ordinary people, real prayer."],
    ],
    bg: [["Early and late rains", "In Israel the early rains came in October and November to soften the soil for planting, and the late rains in March and April to fill out the grain. Farmers could not hurry them; they had to wait.", "strong", ["davids", "mooJ"]]],
    refs: [["JOB.42", "Job 42:10-17", "The Lord restores Job"], ["1KI.18", "1 Kings 18:41-45", "Elijah prays for rain"], ["MAT.5", "Matthew 5:37", "Let your yes be yes"], ["MRK.6", "Mark 6:13", "Anointing the sick with oil"]],
  },
});
