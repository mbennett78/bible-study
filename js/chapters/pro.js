// Proverbs chapter notes.
import { makeBook } from "./make.js";

const sources = {
  waltke: "Bruce K. Waltke, The Book of Proverbs, 2 vols., New International Commentary on the Old Testament (Eerdmans, 2004-05).",
  kidnerP: "Derek Kidner, Proverbs, Tyndale Old Testament Commentaries (InterVarsity Press, 1964).",
  longman: "Tremper Longman III, Proverbs, Baker Commentary on the Old Testament Wisdom and Psalms (Baker, 2006).",
  garrett: "Duane A. Garrett, Proverbs, Ecclesiastes, Song of Songs, New American Commentary 14 (Broadman & Holman, 1993).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["kidnerP", "waltke"] }, {
  1: {
    intro: "\"The proverbs of Solomon the son of David, king of Israel.\" The book's purpose: to know wisdom and instruction, to give prudence to the simple and knowledge to the young. \"The fear of the LORD is the beginning of knowledge.\" A father warns his son not to join sinners who lie in wait for blood. Wisdom shouts in the streets, warning those who ignore her.",
    v: [
      ["1:2-4", "To know wisdom and instruction", "The book states its purpose up front: to give wisdom, discipline and good sense, especially to the young and inexperienced."],
      ["1:7", "The fear of the LORD is the beginning of knowledge", "This is the motto of Proverbs. True knowledge begins with reverence for the LORD. Fools despise wisdom and instruction."],
      ["1:8", "Hear, my son, your father's instruction", "Listen to your father's teaching and do not forsake your mother's. Wisdom is meant to be learned at home."],
      ["1:10", "If sinners entice you, do not consent", "If others try to pull you into wrongdoing, do not go along. Peer pressure is as old as people."],
      ["1:20", "Wisdom shouts in the street", "Wisdom is pictured as a woman calling out in the busy streets and public squares. She is not hidden; she invites everyone."],
    ],
    w: [["חָכְמָה", "chokmah", "H2451", "wisdom, skill", "Practical skill for living well. The same word describes the skill of craftsmen who built the tabernacle (Exodus 31:3). In Proverbs it means living skillfully in God's world.", ["halot", "waltke"]]],
    bg: [["What a proverb is", "A proverb is a short, memorable saying about how life usually works. Proverbs are wise general truths, not promises that hold in every case; Job and Ecclesiastes show the exceptions.", "strong", ["longman", "garrett"]]],
    refs: [["1KI.4", "1 Kings 4:29-34", "Solomon's wisdom"], ["JAS.1", "James 1:5", "If anyone lacks wisdom, let him ask God"], ["PSA.111", "Psalm 111:10", "The beginning of wisdom"]],
  },
  2: {
    intro: "If you receive wisdom's words, seek her like silver and search for her as hidden treasure, \"then you will discern the fear of the LORD and discover the knowledge of God. For the LORD gives wisdom.\" Wisdom guards you from evil men and from the adulterous woman.",
    v: [
      ["2:4", "Search for her as for hidden treasures", "Miners dug deep for silver (Job 28:1-11). Wisdom is worth that kind of effort."],
      ["2:6", "For the LORD gives wisdom", "We search, but in the end wisdom is a gift. God gives it to those who ask (James 1:5)."],
      ["2:11", "Discretion will guard you", "Good sense is pictured as a guard posted around your life, keeping you off paths that lead to harm."],
      ["2:1", "My son, if you will receive my words", "Proverbs 1-9 is written like a parent's talks to a child, passing faith on to the next generation (Deuteronomy 6:6-7)."],
    ],
    w: [["חָכְמָה", "chokmah", "H2451", "wisdom", "Not just knowing facts, but skill for living. The same word describes the skill God gave Bezalel to build the tabernacle (Exodus 31:3).", ["halot", "waltke"]]],
    refs: [["MAT.13", "Matthew 13:44", "Treasure hidden in a field"], ["JAS.1", "James 1:5", "God gives generously"]],
  },
  3: {
    intro: "Do not forget my teaching; let kindness and truth not leave you. \"Trust in the LORD with all your heart and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.\" Honor the LORD with your wealth. Do not despise His discipline, for He reproves those He loves. Wisdom is better than silver and gold.",
    v: [
      ["3:3", "Write them on the tablet of your heart", "Do not let steadfast love and faithfulness leave you. Tie them around your neck and write them on your heart."],
      ["3:5-6", "Trust in the LORD with all your heart", "Trust the LORD with your whole heart, not your own understanding. In everything, acknowledge Him, and He will make your paths straight."],
      ["3:9", "Honor the LORD from your wealth", "Give God the first and best of what you have, not the leftovers. Israel brought the firstfruits of the harvest to Him."],
      ["3:11-12", "The LORD reproves him whom He loves", "When the LORD corrects us, it is a sign of His love, like a father with a son he delights in. Hebrews 12:5-6 quotes this."],
      ["3:27", "Do not withhold good from those to whom it is due", "When it is in your power to help someone, do it. Do not tell your neighbor to come back tomorrow (3:28)."],
    ],
    refs: [["HEB.12", "Hebrews 12:5-6", "The Lord disciplines those He loves"], ["JER.17", "Jeremiah 17:7-8", "Blessed is the man who trusts in the LORD"]],
  },
  4: {
    intro: "A father passes on what his own father taught him: \"Acquire wisdom! Acquire understanding!\" Do not enter the path of the wicked. \"The path of the righteous is like the light of dawn, that shines brighter and brighter until the full day.\" \"Watch over your heart with all diligence, for from it flow the springs of life.\"",
    v: [
      ["4:3-4", "When I was a son to my father", "The father remembers being taught by his own father. Faith and wisdom passed down through three generations."],
      ["4:18", "Like the light of dawn", "The path of the righteous is like the first light of dawn, shining brighter and brighter until full day."],
      ["4:23", "Watch over your heart", "Guard your heart above everything else, because everything you do flows from it."],
      ["4:26", "Watch the path of your feet", "Think carefully about the path your feet are on, and all your ways will be steady."],
    ],
    refs: [["MAT.15", "Matthew 15:18-19", "Out of the heart come evil thoughts"], ["DEU.6", "Deuteronomy 6:6-7", "Teach your children"]],
  },
  5: {
    intro: "A father warns his son about the adulteress: her lips drip honey, but in the end she is bitter as wormwood. Keep far from her door. \"Drink water from your own cistern... rejoice in the wife of your youth.\" The ways of a man are before the eyes of the LORD.",
    v: [
      ["5:3-4", "Her lips drip honey... in the end she is bitter", "Sin promises sweetness and delivers bitterness."],
      ["5:8", "Do not go near the door of her house", "Keep far away from the immoral woman; do not even go near the door of her house. The safest way to avoid a trap is to stay away from it."],
      ["5:18", "Rejoice in the wife of your youth", "Let your fountain be blessed, and rejoice in the wife of your youth. God means faithful marriage to be full of joy."],
      ["5:21", "The ways of a man are before the eyes of the LORD", "Everything a person does is in full view of the LORD, and He examines all their paths."],
    ],
    refs: [["1CO.6", "1 Corinthians 6:18", "Flee immorality"], ["HEB.13", "Hebrews 13:4", "Let marriage be held in honor"]],
  },
  6: {
    intro: "Warnings about co-signing loans, laziness and troublemakers. \"Go to the ant, O sluggard, observe her ways and be wise.\" Six things the LORD hates, yes, seven: haughty eyes, a lying tongue, hands that shed innocent blood, a heart that devises wicked plans, feet that run to evil, a false witness, and one who spreads strife among brothers. Then another warning about adultery.",
    v: [
      ["6:1-5", "If you have become surety for your neighbor", "If you have promised to pay someone else's debt, go quickly and humbly get yourself free. Be careful about rash promises with money."],
      ["6:6", "Go to the ant, O sluggard", "The lazy person should watch the ant. No one has to tell it what to do, yet it stores food in summer for the winter."],
      ["6:16-19", "Six things the LORD hates, yes, seven", "A list of sins against God and neighbor."],
    ],
    refs: [["2TH.3", "2 Thessalonians 3:10-12", "Work quietly"], ["PRO.30", "Proverbs 30:24-25", "The ants are not a strong people"]],
  },
  7: {
    intro: "A vivid story: from his window the father watches a naive young man walk at twilight toward the house of an adulteress. She grabs him, kisses him, and tempts him with smooth words while her husband is away. He follows her \"as an ox goes to the slaughter.\" \"Her house is the way to Sheol.\"",
    v: [
      ["7:2", "Keep my teaching as the apple of your eye", "Keep my teaching as carefully as the pupil of your eye, and you will live."],
      ["7:7-9", "A young man lacking sense... in the twilight", "Temptation finds those who drift near it."],
      ["7:22", "As an ox goes to the slaughter", "The young man follows the immoral woman like an ox to the slaughter, not knowing it will cost him his life."],
    ],
    refs: [["JAS.1", "James 1:14-15", "Lust gives birth to sin"], ["2TI.2", "2 Timothy 2:22", "Flee youthful lusts"]],
  },
  8: {
    intro: "Wisdom calls out at the city gates to all people: her words are true, better than jewels. \"By me kings reign.\" Then Wisdom speaks of creation: \"The LORD possessed me at the beginning of His way... When He established the heavens, I was there... I was beside Him, as a master workman; and I was daily His delight, rejoicing always before Him.\" \"He who finds me finds life.\"",
    v: [
      ["8:11", "Wisdom is better than jewels", "Wisdom is worth more than precious jewels; nothing you could want compares with her."],
      ["8:22", "The LORD possessed me at the beginning", "Wisdom speaks: the LORD had me at the beginning, before He made anything. God's wisdom is older than creation."],
      ["8:30", "I was beside Him, as a master workman", "Wisdom was beside God like a skilled craftsman as He made the world, delighting in it. Many Christians hear an echo of Christ, through whom all things were made (John 1:3; Colossians 1:16)."],
      ["8:35", "He who finds me finds life", "Whoever finds wisdom finds life and receives favor from the LORD."],
    ],
    why: "Proverbs 8 pictures Wisdom as a person present with God at creation. Scholars and teachers discuss how this relates to Christ.",
    views: [
      ["A poetic picture fulfilled in Christ", "Many read Wisdom as a vivid poetic personification of God's own wisdom, which the New Testament sees fully revealed in Christ, \"the wisdom of God\" through whom all things were made (1 Corinthians 1:24; Colossians 1:15-17).", ["waltke", "kidnerP"]],
      ["Personification only", "Others stress that the chapter personifies God's wisdom as a woman, like \"Folly\" in chapter 9, and caution against reading every detail (such as \"possessed\" or \"brought forth\") as a statement about the Son.", ["longman", "garrett"]],
    ],
    common: "All agree that God's wisdom is eternal, built into creation, and that Christians find it embodied in Jesus.",
    refs: [["JHN.1", "John 1:1-3", "In the beginning was the Word"], ["COL.1", "Colossians 1:15-17", "All things created through Him"], ["1CO.1", "1 Corinthians 1:24, 30", "Christ the wisdom of God"]],
  },
  9: {
    intro: "Two women invite the simple to dinner. Wisdom has built her house, set her table, and calls, \"Come, eat of my food... forsake your folly and live.\" Folly, loud and ignorant, also calls: \"Stolen water is sweet.\" But her guests are in the depths of Sheol. In between: \"The fear of the LORD is the beginning of wisdom.\"",
    v: [
      ["9:1", "Wisdom has built her house", "Wisdom has built her house, prepared a feast, and sends out invitations to anyone who lacks sense (9:4-5)."],
      ["9:8", "Reprove a wise man and he will love you", "Correct a mocker and he will hate you; correct a wise person and he will love you for it."],
      ["9:10", "The fear of the LORD is the beginning of wisdom", "The book's theme returns: the fear of the LORD is the beginning of wisdom, and knowing the Holy One is understanding."],
      ["9:17", "Stolen water is sweet", "Folly, pictured as a loud woman, says stolen water is sweet. She does not mention that her guests end up in the grave (9:18)."],
    ],
    refs: [["LUK.14", "Luke 14:16-24", "The great banquet"], ["MAT.7", "Matthew 7:13-14", "Two ways"]],
  },
  10: {
    intro: "The collection of Solomon's short proverbs begins, mostly two-line sayings that contrast the wise and the foolish, the righteous and the wicked. \"A wise son makes a father glad.\" \"Hatred stirs up strife, but love covers all transgressions.\" \"When there are many words, transgression is unavoidable, but he who restrains his lips is wise.\"",
    v: [
      ["10:1", "A wise son makes a father glad", "The individual proverbs of Solomon begin here. A wise child brings joy to a father; a foolish one brings grief to a mother."],
      ["10:4", "Poor is he who works with a negligent hand", "Lazy hands lead to poverty, but diligent hands bring wealth. Proverbs are general truths about how life usually works."],
      ["10:12", "Love covers all transgressions", "Hatred stirs up fights, but love covers over all wrongs. Peter quotes this in 1 Peter 4:8."],
      ["10:19", "He who restrains his lips is wise", "When words are many, sin is not far away. The wise know when to stop talking."],
    ],
    bg: [["How these chapters work", "Chapters 10-29 are mostly separate sayings, not a continuous argument. Many use contrast (\"but\"), and some are grouped by key words or themes. Reading them slowly, a few at a time, works best.", "good", ["longman", "garrett"]]],
    refs: [["1PE.4", "1 Peter 4:8", "Love covers a multitude of sins"], ["JAS.1", "James 1:19", "Slow to speak"]],
  },
  11: {
    intro: "Proverbs on honesty, humility and generosity. \"A false balance is an abomination to the LORD.\" \"When pride comes, then comes dishonor, but with the humble is wisdom.\" \"Like a gold ring in a pig's snout is a beautiful woman who lacks discretion.\" \"The generous man will be prosperous, and he who waters will himself be watered.\"",
    v: [
      ["11:1", "A false balance is an abomination", "Merchants weighed goods on scales. Rigged scales are hateful to the LORD, but honest weights please Him."],
      ["11:2", "With the humble is wisdom", "When pride comes, disgrace follows, but wisdom is found with the humble."],
      ["11:14", "In abundance of counselors there is victory", "A nation falls without guidance, but with many advisers there is safety. Wise people seek counsel."],
      ["11:25", "He who waters will himself be watered", "A generous person will prosper; whoever refreshes others will be refreshed."],
      ["11:30", "He who is wise wins souls", "The fruit of a righteous life is like a tree of life, and the wise draw others toward life."],
    ],
    refs: [["LUK.6", "Luke 6:38", "Give, and it will be given to you"], ["2CO.9", "2 Corinthians 9:6", "Sowing bountifully"]],
  },
  12: {
    intro: "\"Whoever loves discipline loves knowledge, but he who hates reproof is stupid.\" \"An excellent wife is the crown of her husband.\" \"A righteous man has regard for the life of his animal.\" \"The way of a fool is right in his own eyes.\" \"Anxiety in a man's heart weighs it down, but a good word makes it glad.\"",
    v: [
      ["12:1", "Whoever loves discipline loves knowledge", "Whoever loves discipline loves knowledge, but whoever hates correction is foolish. Being teachable is the start of growing wise."],
      ["12:10", "A righteous man has regard for the life of his animal", "A righteous person cares about the needs of their animals. Kindness reaches even to creatures in our care."],
      ["12:15", "The way of a fool is right in his own eyes", "A fool always thinks his own way is right, but a wise person listens to advice."],
      ["12:25", "A good word makes it glad", "Worry weighs a heart down, but a kind word cheers it up."],
    ],
    refs: [["PRO.31", "Proverbs 31:10-31", "The excellent wife"], ["1TH.5", "1 Thessalonians 5:11", "Encourage one another"]],
  },
  13: {
    intro: "\"A wise son accepts his father's discipline.\" \"Hope deferred makes the heart sick, but desire fulfilled is a tree of life.\" \"He who walks with wise men will be wise, but the companion of fools will suffer harm.\" \"A good man leaves an inheritance to his children's children.\" \"He who withholds his rod hates his son.\"",
    v: [
      ["13:12", "Hope deferred makes the heart sick", "Hope put off again and again makes the heart sick, but a longing fulfilled is like a tree of life. Proverbs is honest about how hard waiting is."],
      ["13:20", "He who walks with wise men will be wise", "Spend time with the wise and you will become wise; the companion of fools will suffer harm. Friends shape us."],
      ["13:22", "An inheritance to his children's children", "A good person leaves an inheritance to their grandchildren, not only money but a life worth following."],
      ["13:24", "He who loves him disciplines him diligently", "Loving parents correct their children carefully and consistently. Not correcting them at all is not true love."],
    ],
    refs: [["1CO.15", "1 Corinthians 15:33", "Bad company corrupts good morals"], ["EPH.6", "Ephesians 6:4", "Do not provoke your children"]],
  },
  14: {
    intro: "\"The wise woman builds her house, but the foolish tears it down.\" \"There is a way which seems right to a man, but its end is the way of death.\" \"Even in laughter the heart may be in pain.\" \"In the fear of the LORD there is strong confidence, and his children will have refuge.\" \"Righteousness exalts a nation.\"",
    v: [
      ["14:1", "The wise woman builds her house", "A wise woman builds up her home, but a foolish one tears hers down with her own hands."],
      ["14:12", "A way which seems right to a man", "Some paths look right to us but end in death. The proverb is repeated word for word in 16:25, as if to make sure we hear it."],
      ["14:26", "His children will have refuge", "Whoever fears the LORD has a strong confidence, and their children will have a place of refuge."],
      ["14:31", "He who oppresses the poor taunts his Maker", "Whoever oppresses the poor insults their Maker, but whoever is kind to the needy honors God."],
      ["14:34", "Righteousness exalts a nation", "Doing right lifts a nation up, but sin is a disgrace to any people."],
    ],
    refs: [["MAT.25", "Matthew 25:40", "To the least of these"], ["MAT.7", "Matthew 7:13", "The broad way"]],
  },
  15: {
    intro: "\"A gentle answer turns away wrath, but a harsh word stirs up anger.\" \"The eyes of the LORD are in every place.\" \"Better is a little with the fear of the LORD than great treasure and turmoil with it.\" \"Without consultation, plans are frustrated, but with many counselors they succeed.\" \"A joyful heart makes a cheerful face.\"",
    v: [
      ["15:1", "A gentle answer turns away wrath", "A gentle answer turns away anger, but harsh words stir it up. How we speak can cool a hot moment."],
      ["15:3", "The eyes of the LORD are in every place", "The eyes of the LORD are everywhere, watching both the evil and the good."],
      ["15:16-17", "Better is a dish of vegetables where love is", "A little with reverence for God is better than great wealth with trouble. A simple meal with love beats a feast with hatred."],
      ["15:22", "With many counselors they succeed", "Plans fail when there is no counsel, but with many advisers they succeed."],
    ],
    refs: [["JAS.1", "James 1:19-20", "Slow to anger"], ["COL.4", "Colossians 4:6", "Speech seasoned with salt"]],
  },
  16: {
    intro: "\"The plans of the heart belong to man, but the answer of the tongue is from the LORD.\" \"Commit your works to the LORD and your plans will be established.\" \"Pride goes before destruction, and a haughty spirit before stumbling.\" \"Gray hair is a crown of glory.\" \"The lot is cast into the lap, but its every decision is from the LORD.\"",
    v: [
      ["16:3", "Commit your works to the LORD", "Commit your work to the LORD, literally roll it onto Him, and your plans will be established."],
      ["16:9", "The mind of man plans his way, but the LORD directs his steps", "People make their plans, but the LORD guides their steps. We plan; God directs."],
      ["16:18", "Pride goes before destruction", "Pride goes before destruction, and a haughty spirit before a fall."],
      ["16:31", "Gray hair is a crown of glory", "Gray hair is a crown of glory, earned by a life lived rightly. Older people deserve honor."],
      ["16:33", "Its every decision is from the LORD", "People cast lots to make decisions, but every outcome is from the LORD. Nothing is random to Him."],
    ],
    refs: [["JAS.4", "James 4:13-15", "If the Lord wills"], ["EST.3", "Esther 3:7", "The lot was cast"]],
  },
  17: {
    intro: "\"Better is a dry morsel and quietness with it than a house full of feasting with strife.\" \"Grandchildren are the crown of old men, and the glory of sons is their fathers.\" \"A friend loves at all times, and a brother is born for adversity.\" \"A joyful heart is good medicine.\" \"Even a fool, when he keeps silent, is considered wise.\"",
    v: [
      ["17:6", "Grandchildren are the crown of old men", "Grandchildren are the crown of the elderly, and parents are the pride of their children. Three generations bless each other."],
      ["17:17", "A friend loves at all times", "A true friend loves at all times, and a brother is born to help in times of trouble."],
      ["17:22", "A joyful heart is good medicine", "A cheerful heart is good medicine, but a crushed spirit dries up the bones."],
      ["17:28", "Even a fool, when he keeps silent, is considered wise", "Even a fool seems wise when he keeps quiet. Sometimes silence is the wisest answer."],
    ],
    refs: [["JHN.15", "John 15:13-15", "I have called you friends"], ["RUT.1", "Ruth 1:16", "Loyal love"]],
  },
  18: {
    intro: "\"The name of the LORD is a strong tower; the righteous runs into it and is safe.\" \"He who gives an answer before he hears, it is folly and shame to him.\" \"Death and life are in the power of the tongue.\" \"He who finds a wife finds a good thing.\" \"There is a friend who sticks closer than a brother.\"",
    v: [
      ["18:10", "The name of the LORD is a strong tower", "The name of the LORD, His character and presence, is a strong tower. The righteous run into it and are safe."],
      ["18:13", "He who gives an answer before he hears", "Answering before listening is foolish and shameful. Hear the whole matter first."],
      ["18:21", "Death and life are in the power of the tongue", "The tongue has the power of life and death. Our words can build up or tear down."],
      ["18:24", "A friend who sticks closer than a brother", "Some so-called friends bring ruin, but there is a friend who sticks closer than a brother."],
    ],
    refs: [["PSA.61", "Psalm 61:3", "A tower of strength"], ["JAS.3", "James 3:5-10", "The tongue"]],
  },
  19: {
    intro: "\"A man's discretion makes him slow to anger, and it is his glory to overlook a transgression.\" \"House and wealth are an inheritance from fathers, but a prudent wife is from the LORD.\" \"One who is gracious to a poor man lends to the LORD.\" \"Many plans are in a man's heart, but the counsel of the LORD will stand.\"",
    v: [
      ["19:11", "It is his glory to overlook a transgression", "Good sense makes a person patient, and it is to their glory to overlook an offense."],
      ["19:17", "Gracious to a poor man lends to the LORD", "Whoever is kind to the poor lends to the LORD, and He will repay them for their deed."],
      ["19:21", "The counsel of the LORD will stand", "People have many plans in their hearts, but it is the LORD's purpose that will stand."],
    ],
    refs: [["MAT.25", "Matthew 25:35-40", "You did it to Me"], ["COL.3", "Colossians 3:13", "Forgive each other"]],
  },
  20: {
    intro: "\"Wine is a mocker, strong drink a brawler.\" \"Many a man proclaims his own loyalty, but who can find a trustworthy man?\" \"It is by his deeds that a lad distinguishes himself.\" \"Differing weights and differing measures, both of them are abominable to the LORD.\" \"The glory of young men is their strength, and the honor of old men is their gray hair.\"",
    v: [
      ["20:1", "Wine is a mocker", "Wine mocks and strong drink starts fights. Whoever is led astray by them is not wise. Proverbs warns again in 23:29-35."],
      ["20:11", "By his deeds a lad distinguishes himself", "Even a child is known by what they do, whether their conduct is pure and right."],
      ["20:22", "Wait for the LORD, and He will save you", "Do not say you will pay someone back for a wrong. Wait for the LORD, and He will make it right."],
      ["20:29", "The honor of old men is their gray hair", "The glory of young people is their strength; the honor of older people is their gray hair. Each age has its gift."],
    ],
    refs: [["EPH.5", "Ephesians 5:18", "Do not get drunk with wine"], ["ROM.12", "Romans 12:17-19", "Never pay back evil"]],
  },
  21: {
    intro: "\"The king's heart is like channels of water in the hand of the LORD; He turns it wherever He wishes.\" \"To do righteousness and justice is desired by the LORD more than sacrifice.\" \"It is better to live in a corner of a roof than in a house shared with a contentious woman.\" \"The horse is prepared for the day of battle, but victory belongs to the LORD.\"",
    v: [
      ["21:1", "The king's heart is in the hand of the LORD", "Like a farmer directing water through channels, the LORD can turn a king's heart wherever He wishes. God rules even rulers."],
      ["21:3", "Righteousness and justice more than sacrifice", "Doing what is right and just pleases the LORD more than sacrifices. Obedience matters more than ritual (1 Samuel 15:22)."],
      ["21:13", "He who shuts his ear to the cry of the poor", "Whoever closes their ears to the cry of the poor will one day cry out and not be answered."],
      ["21:31", "Victory belongs to the LORD", "The horse is made ready for battle, but victory belongs to the LORD. Prepare well, then trust Him."],
    ],
    refs: [["EZR.1", "Ezra 1:1", "God stirred Cyrus's heart"], ["1SA.15", "1 Samuel 15:22", "To obey is better than sacrifice"]],
  },
  22: {
    intro: "\"A good name is to be more desired than great wealth.\" \"The rich and the poor have a common bond, the LORD is the maker of them all.\" \"Train up a child in the way he should go, even when he is old he will not depart from it.\" At 22:17 a new section begins, \"the words of the wise,\" thirty sayings of counsel.",
    v: [
      ["22:1", "A good name is to be more desired than great wealth", "A good name, meaning a good reputation and character, is worth more than great riches, and being well thought of is better than silver or gold."],
      ["22:2", "The LORD is the maker of them all", "Rich and poor have this in common: the LORD made them both. Each has the same worth before Him."],
      ["22:6", "Train up a child in the way he should go", "Train a child in the way they should go, and when they are old they will not turn from it. A general truth about how life usually works, not an ironclad guarantee."],
      ["22:29", "A man skilled in his work will stand before kings", "Someone skilled and diligent in their work will serve before kings, not unknown people. Good work opens doors."],
    ],
    why: "Proverbs 22:17-24:22 has close parallels to an Egyptian wisdom text called the Instruction of Amenemope. Scholars discuss the relationship.",
    views: [
      ["Israel adapted Egyptian wisdom", "Many think Israel's wise men knew Amenemope and reshaped some of its sayings under faith in the LORD, showing that God's people could recognize and refine true wisdom wherever found.", ["waltke", "longman"]],
      ["Shared tradition", "Others argue both drew from a common pool of ancient Near Eastern sayings, or that the borrowing ran the other way or cannot be proven, noting important differences.", ["kitchen", "garrett"]],
    ],
    common: "All agree the biblical sayings are placed under \"trust in the LORD\" (22:19), which makes them distinct from their neighbors.",
    refs: [["EPH.6", "Ephesians 6:4", "Bring them up in the instruction of the Lord"], ["2TI.3", "2 Timothy 3:15", "From childhood you have known the Scriptures"], ["ECC.7", "Ecclesiastes 7:1", "A good name is better than precious oil"]],
  },
  23: {
    intro: "More sayings of the wise: be careful at a ruler's table; \"Do not weary yourself to gain wealth... it makes itself wings.\" Do not move ancient boundary stones of orphans. \"Buy truth, and do not sell it.\" \"My son, give me your heart.\" A vivid warning about drunkenness: \"Who has woe? Who has sorrow?... Those who linger long over wine.\"",
    v: [
      ["23:4-5", "Wealth certainly makes itself wings", "Do not wear yourself out to get rich. Riches can vanish in a blink, as if they grew wings and flew away like an eagle."],
      ["23:23", "Buy truth, and do not sell it", "Buy the truth and do not sell it, along with wisdom, instruction and understanding. Truth is worth any price."],
      ["23:26", "My son, give me your heart", "A father pleads: give me your heart, and let your eyes delight in my ways."],
      ["23:29-35", "Who has woe?", "Who has sorrow, fights, wounds and red eyes? Those who linger over wine. A vivid warning about drunkenness."],
    ],
    refs: [["1TI.6", "1 Timothy 6:9-10", "The love of money"], ["MAT.6", "Matthew 6:19-21", "Treasures in heaven"]],
  },
  24: {
    intro: "\"Do not be envious of evil men.\" \"By wisdom a house is built.\" \"If you are slack in the day of distress, your strength is limited.\" \"Rescue those who are being taken away to death.\" \"A righteous man falls seven times, and rises again.\" \"Do not rejoice when your enemy falls.\" A field of a lazy man is overgrown: \"a little sleep, a little slumber... then your poverty will come.\"",
    v: [
      ["24:3", "By wisdom a house is built", "By wisdom a house is built, and by understanding it is made firm. Knowledge fills its rooms with treasures (24:4)."],
      ["24:11-12", "Deliver those who are being taken away to death", "Rescue those being led away to death. Do not say we did not know; God, who weighs hearts, knows what we knew."],
      ["24:16", "A righteous man falls seven times, and rises again", "A righteous person may fall seven times, but they get back up. Falling is not the end for those who trust God."],
      ["24:17", "Do not rejoice when your enemy falls", "Do not celebrate when your enemy falls or be glad when they stumble. God sees a gloating heart (24:18)."],
    ],
    refs: [["MIC.7", "Micah 7:8", "Though I fall I will rise"], ["MAT.5", "Matthew 5:44", "Love your enemies"]],
  },
  25: {
    intro: "\"These also are proverbs of Solomon which the men of Hezekiah, king of Judah, transcribed.\" \"It is the glory of God to conceal a matter, but the glory of kings is to search out a matter.\" \"Like apples of gold in settings of silver is a word spoken in right circumstances.\" \"If your enemy is hungry, give him food to eat... you will heap burning coals on his head.\"",
    v: [
      ["25:1", "The men of Hezekiah transcribed", "Some 250 years after Solomon, King Hezekiah's scholars copied out more of his proverbs. The book was gathered over centuries."],
      ["25:2", "The glory of kings is to search out a matter", "It is God's glory to conceal things, and the glory of kings to search them out. Discovering how the world works honors its Maker."],
      ["25:11", "Like apples of gold in settings of silver", "A word spoken at the right time is like golden apples in a silver setting, beautiful and fitting."],
      ["25:21-22", "If your enemy is hungry, give him food", "If your enemy is hungry, feed him. Kindness may bring him to shame and change. Paul quotes this in Romans 12:20."],
      ["25:28", "Like a city broken into... is a man who has no control over his spirit", "A person without self-control is like a city whose walls are broken down, open to every attack."],
    ],
    refs: [["ROM.12", "Romans 12:20-21", "Overcome evil with good"], ["2KI.18", "2 Kings 18", "King Hezekiah"]],
  },
  26: {
    intro: "Sayings about fools, sluggards and gossips. \"Do not answer a fool according to his folly, or you will also be like him. Answer a fool as his folly deserves, that he not be wise in his own eyes.\" \"As a dog returns to its vomit is a fool who repeats his folly.\" The lazy man says, \"There is a lion in the road!\" \"For lack of wood the fire goes out, and where there is no whisperer, contention quiets down.\"",
    v: [
      ["26:4-5", "Do not answer a fool... Answer a fool", "These two proverbs sit side by side on purpose. Sometimes answering a fool drags you down; sometimes silence lets him think he is wise. Wisdom knows which moment it is."],
      ["26:11", "As a dog returns to its vomit", "A fool who repeats his foolishness is like a dog going back to its vomit. Peter quotes this in 2 Peter 2:22."],
      ["26:20", "Where there is no whisperer, contention quiets down", "Without wood a fire goes out, and without gossip a quarrel dies down."],
      ["26:27", "He who digs a pit will fall into it", "Whoever digs a pit for others will fall into it, and a stone rolled at others will roll back on the one who pushed it."],
    ],
    refs: [["2PE.2", "2 Peter 2:22", "A dog returns to its vomit"], ["JAS.3", "James 3:5-6", "A small fire"]],
  },
  27: {
    intro: "\"Do not boast about tomorrow, for you do not know what a day may bring.\" \"Faithful are the wounds of a friend.\" \"Iron sharpens iron, so one man sharpens another.\" \"As in water face reflects face, so the heart of man reflects man.\" \"Know well the condition of your flocks.\"",
    v: [
      ["27:1", "Do not boast about tomorrow", "Do not boast about tomorrow, because you do not know what a day may bring. James 4:13-15 echoes this."],
      ["27:6", "Faithful are the wounds of a friend", "Wounds from a friend who tells the truth can be trusted, but an enemy's kisses are many and false."],
      ["27:17", "Iron sharpens iron", "As iron sharpens iron, one person sharpens another. Good friends make each other better."],
      ["27:23", "Know well the condition of your flocks", "A shepherd should know the condition of each sheep and pay attention to the herds. Take care of what has been entrusted to you."],
    ],
    refs: [["JAS.4", "James 4:13-15", "You do not know what tomorrow brings"], ["HEB.10", "Hebrews 10:24", "Stimulate one another to love"]],
  },
  28: {
    intro: "\"The wicked flee when no one is pursuing, but the righteous are bold as a lion.\" \"He who turns away his ear from listening to the law, even his prayer is an abomination.\" \"He who conceals his transgressions will not prosper, but he who confesses and forsakes them will find compassion.\" \"He who trusts in his own heart is a fool.\"",
    v: [
      ["28:1", "The righteous are bold as a lion", "The wicked run away when no one is chasing them, but the righteous are as bold as a lion. A clear conscience gives courage."],
      ["28:13", "He who confesses and forsakes them will find compassion", "Whoever hides their sins will not prosper, but whoever confesses and turns from them will find mercy."],
      ["28:26", "He who trusts in his own heart is a fool", "Whoever trusts in their own mind is a fool, but whoever walks in wisdom will be kept safe."],
      ["28:27", "He who gives to the poor will never want", "Whoever gives to the poor will lack nothing, but whoever closes their eyes to them will receive many curses."],
    ],
    refs: [["PSA.32", "Psalm 32:3-5", "I acknowledged my sin"], ["1JN.1", "1 John 1:9", "If we confess"]],
  },
  29: {
    intro: "\"When the righteous increase, the people rejoice.\" \"The rod and reproof give wisdom.\" \"Where there is no vision, the people are unrestrained, but happy is he who keeps the law.\" \"A man's pride will bring him low.\" \"The fear of man brings a snare, but he who trusts in the LORD will be exalted.\"",
    v: [
      ["29:2", "When the righteous increase, the people rejoice", "When the righteous grow in number or rule, the people rejoice; when the wicked rule, the people groan."],
      ["29:18", "Where there is no vision, the people are unrestrained", "\"Vision\" here means revelation from God. Where His word is not heard, people throw off restraint; blessed is the one who keeps His law."],
      ["29:25", "The fear of man brings a snare", "Fear of what people think is a trap, but whoever trusts in the LORD is kept safe."],
    ],
    w: [["חָזוֹן", "chazon", "H2377", "vision, revelation", "In 29:18 the word means a prophet's message from God, not a leader's plan. Without God's word, people throw off restraint.", ["halot", "waltke"]]],
    refs: [["AMO.8", "Amos 8:11", "A famine for hearing the words of the LORD"], ["GAL.1", "Galatians 1:10", "Pleasing men or God?"]],
  },
  30: {
    intro: "The words of Agur. He confesses he has not learned wisdom on his own: \"Who has ascended into heaven and descended?... What is His name or His son's name?\" \"Every word of God is tested.\" He prays, \"Give me neither poverty nor riches.\" Then come number sayings: four things never satisfied, four things too wonderful, four small but wise creatures: ants, rock badgers, locusts and lizards.",
    v: [
      ["30:4", "What is His name or His son's name?", "Agur asks who has gone up to heaven and come down, who holds the wind in his fists. What is His name, and His son's name? Christians see the answer in Jesus (John 3:13)."],
      ["30:5", "Every word of God is tested", "Every word of God is proven true, like refined metal. He is a shield to those who take refuge in Him."],
      ["30:8-9", "Give me neither poverty nor riches", "Agur prays for neither poverty nor riches: if rich, he might forget God; if poor, he might steal. Give me just my daily bread."],
      ["30:24-28", "Four things are small on the earth, but they are exceedingly wise", "Ants, rock badgers, locusts and lizards are small, yet wise: they plan ahead, find shelter, work together and get into palaces."],
    ],
    refs: [["JHN.3", "John 3:13", "No one has ascended into heaven but He who descended"], ["PHP.4", "Philippians 4:11-12", "I have learned to be content"], ["PSA.12", "Psalm 12:6", "The words of the LORD are pure"]],
  },
  31: {
    intro: "The words of King Lemuel, taught by his mother: do not give your strength to women or wine; \"Open your mouth for the mute... defend the rights of the afflicted and needy.\" The book ends with an alphabet poem about the excellent wife: worth far more than jewels, hardworking, wise in business, generous to the poor, strong, kind, and fearing the LORD. \"Her children rise up and bless her.\"",
    v: [
      ["31:8-9", "Open your mouth for the mute", "King Lemuel's mother teaches him to speak up for those who cannot speak for themselves and defend the rights of the poor and needy."],
      ["31:10", "An excellent wife, who can find?", "A poem about a woman of noble character begins here, each verse starting with the next letter of the Hebrew alphabet. She is worth far more than jewels."],
      ["31:20", "She extends her hand to the poor", "She opens her hands to the poor and reaches out to the needy."],
      ["31:26", "The teaching of kindness is on her tongue", "When she speaks, her words are wise, and kind teaching is on her tongue."],
      ["31:30", "A woman who fears the LORD, she shall be praised", "The book ends where it began: the fear of the LORD."],
    ],
    bg: [["A woman of valor", "The phrase translated \"excellent wife\" (eshet chayil) can mean \"woman of strength\" or \"valor.\" Ruth is the only woman in the Bible called by this phrase (Ruth 3:11). In Jewish homes, husbands traditionally sing this poem to their wives on Friday evenings.", "strong", ["waltke", "longman"]]],
    refs: [["RUT.3", "Ruth 3:11", "A woman of excellence"], ["1PE.3", "1 Peter 3:3-4", "The hidden person of the heart"], ["PRO.1", "Proverbs 1:7", "The fear of the LORD"]],
  },
});
