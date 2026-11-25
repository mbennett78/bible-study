// Psalms chapter notes.
import { makeBook } from "./make.js";

const sources = {
  craigie: "Peter C. Craigie, Psalms 1-50, Word Biblical Commentary 19 (Word, 1983).",
  tate: "Marvin E. Tate, Psalms 51-100, Word Biblical Commentary 20 (Word, 1990).",
  allen: "Leslie C. Allen, Psalms 101-150, Word Biblical Commentary 21 (Word, 1983).",
  kidner: "Derek Kidner, Psalms, 2 vols., Tyndale Old Testament Commentaries (InterVarsity Press, 1973-75).",
  vangemeren: "Willem A. VanGemeren, Psalms, Expositor's Bible Commentary 5, rev. ed. (Zondervan, 2008).",
  wilson: "Gerald H. Wilson, Psalms Volume 1, NIV Application Commentary (Zondervan, 2002).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["kidner", "vangemeren"] }, {
  2: {
    intro: "The nations rage and plot against the LORD and His Anointed. God in heaven laughs and declares, \"I have installed My King upon Zion.\" The King tells God's decree: \"You are My Son, today I have begotten You.\" Kings are warned to serve the LORD with fear and do homage to the Son. \"How blessed are all who take refuge in Him!\"",
    v: [
      ["2:1-2", "Why are the nations in an uproar?", "Earthly rebellion against God's chosen king."],
      ["2:4", "He who sits in the heavens laughs", "God is not threatened."],
      ["2:7", "You are My Son", "Quoted at Jesus' baptism and in Hebrews 1:5."],
      ["2:12", "Do homage to the Son", "The only safe place is with the King."],
    ],
    w: [["מָשִׁיחַ", "mashiach", "H4899", "anointed one", "A king or priest anointed with oil for God's service. It became the title Messiah, in Greek Christos, Christ.", ["halot", "craigie"]]],
    refs: [["ACT.4", "Acts 4:25-28", "The early church applies Psalm 2 to Jesus"], ["HEB.1", "Hebrews 1:5", "You are My Son"], ["2SA.7", "2 Samuel 7:14", "I will be a father to him"]],
  },
  3: {
    intro: "David writes while fleeing from his son Absalom. Many say God will not help him. \"But You, O LORD, are a shield about me, my glory, and the One who lifts my head.\" He lies down and sleeps, and wakes again, because the LORD sustains him. \"Salvation belongs to the LORD.\"",
    v: [
      ["3:2", "There is no deliverance for him in God", "The enemies' taunt."],
      ["3:3", "You, O LORD, are a shield about me", "God surrounds him."],
      ["3:5", "I lay down and slept; I awoke", "Peaceful sleep in danger."],
      ["3:8", "Salvation belongs to the LORD", "Rescue comes from God alone."],
    ],
    bg: [["Selah", "The word Selah appears 71 times in the Psalms. Its meaning is uncertain; it was probably a musical or worship direction, such as a pause or a lifting of voices or instruments.", "debated", ["craigie", "halot"]]],
    refs: [["2SA.15", "2 Samuel 15", "David flees from Absalom"], ["JON.2", "Jonah 2:9", "Salvation is from the LORD"]],
  },
  4: {
    intro: "An evening prayer. David asks God to answer him and reminds people that the LORD has set apart the godly for Himself. \"Tremble, and do not sin; meditate in your heart upon your bed, and be still.\" God has put more gladness in his heart than a rich harvest brings. \"In peace I will both lie down and sleep.\"",
    v: [
      ["4:4", "Tremble, and do not sin", "Paul quotes this in Ephesians 4:26: be angry and do not sin."],
      ["4:7", "You have put gladness in my heart", "Joy greater than wealth."],
      ["4:8", "In peace I will both lie down and sleep", "A bedtime verse of trust."],
    ],
    refs: [["EPH.4", "Ephesians 4:26", "Be angry, and yet do not sin"], ["PRO.3", "Proverbs 3:24", "Your sleep will be sweet"]],
  },
  5: {
    intro: "A morning prayer. \"In the morning, O LORD, You will hear my voice; in the morning I will order my prayer to You and eagerly watch.\" God takes no pleasure in wickedness. David enters God's house by His lovingkindness. He prays that all who take refuge in God will be glad and sing for joy.",
    v: [
      ["5:3", "In the morning... I will eagerly watch", "Praying and then watching for God's answer."],
      ["5:7", "By Your abundant lovingkindness I will enter Your house", "Access by grace."],
      ["5:11-12", "You surround him with favor as with a shield", "God's protection."],
    ],
    refs: [["MRK.1", "Mark 1:35", "Jesus prayed early in the morning"], ["PSA.143", "Psalm 143:8", "Let me hear Your lovingkindness in the morning"]],
  },
  6: {
    intro: "The first of the seven penitential psalms. David is weak, his bones are dismayed, and he soaks his bed with tears. \"Return, O LORD, rescue my soul; save me because of Your lovingkindness.\" Suddenly his tone changes: \"The LORD has heard my supplication.\"",
    v: [
      ["6:1", "Do not rebuke me in Your anger", "Asking for mercy, not punishment."],
      ["6:6", "Every night I make my bed swim", "Deep grief."],
      ["6:9", "The LORD has heard my supplication", "Lament turns to confidence."],
    ],
    bg: [["The penitential psalms", "Since early church times, Psalms 6, 32, 38, 51, 102, 130 and 143 have been grouped as the penitential psalms, prayers of sorrow and repentance.", "strong", ["kidner", "wilson"]]],
    refs: [["PSA.51", "Psalm 51", "Another penitential psalm"], ["MAT.7", "Matthew 7:23", "Depart from Me"]],
  },
  7: {
    intro: "David, falsely accused by Cush the Benjamite, takes refuge in God and asks Him to judge rightly. If he has done wrong, let the enemy catch him. God is a righteous judge who tests hearts. The wicked dig a pit and fall into it. David ends in praise.",
    v: [
      ["7:1", "In You I have taken refuge", "Where to go when accused."],
      ["7:9", "The righteous God tries the hearts and minds", "God knows the truth."],
      ["7:15", "He has dug a pit and fallen into it", "Evil comes back on the evildoer."],
    ],
    refs: [["EST.7", "Esther 7:10", "Haman on his own gallows"], ["1PE.2", "1 Peter 2:23", "Jesus entrusted Himself to Him who judges righteously"]],
  },
  8: {
    intro: "\"O LORD, our Lord, how majestic is Your name in all the earth!\" God's glory is above the heavens, yet He has ordained praise from the mouths of babies. When David looks at the moon and stars, he wonders, \"What is man that You take thought of him?\" Yet God crowned people with glory and gave them rule over His works.",
    v: [
      ["8:1", "How majestic is Your name", "The psalm begins and ends with praise."],
      ["8:2", "From the mouth of infants", "Jesus quoted this when children praised Him (Matthew 21:16)."],
      ["8:4", "What is man?", "Small, yet loved."],
      ["8:6", "You have put all things under his feet", "Hebrews 2 applies this to Jesus."],
    ],
    refs: [["GEN.1", "Genesis 1:26-28", "Let them rule"], ["HEB.2", "Hebrews 2:6-9", "We see Jesus crowned with glory"], ["MAT.21", "Matthew 21:16", "Out of the mouth of infants"]],
  },
  9: {
    intro: "David gives thanks with all his heart and tells of God's wonders. God has judged the nations and sits as King forever. \"The LORD also will be a stronghold for the oppressed.\" Those who know God's name will put their trust in Him, because He has not forsaken those who seek Him.",
    v: [
      ["9:1", "I will give thanks with all my heart", "Wholehearted praise."],
      ["9:9", "A stronghold for the oppressed", "God is safe ground."],
      ["9:10", "Those who know Your name will put their trust in You", "Knowing God leads to trusting Him."],
    ],
    bg: [["An acrostic", "Psalms 9 and 10 together form a broken alphabet poem, with sections starting with successive Hebrew letters. Some ancient translations treat them as one psalm, which is why psalm numbers differ in some older Bibles.", "good", ["craigie", "kidner"]]],
    refs: [["PSA.10", "Psalm 10", "The second half of the acrostic"], ["NAM.1", "Nahum 1:7", "A stronghold in the day of trouble"]],
  },
  10: {
    intro: "\"Why do You stand afar off, O LORD?\" The wicked man boasts, preys on the helpless, and says in his heart that God has forgotten. The psalmist pleads, \"Arise, O LORD... do not forget the afflicted.\" He ends with confidence: God hears the humble and defends the orphan.",
    v: [
      ["10:1", "Why do You hide Yourself in times of trouble?", "An honest question."],
      ["10:4", "All his thoughts are, There is no God", "The heart of wickedness."],
      ["10:14", "You have been the helper of the orphan", "God sees the helpless."],
      ["10:17", "You have heard the desire of the humble", "God answers."],
    ],
    refs: [["PSA.14", "Psalm 14:1", "The fool says there is no God"], ["JAS.1", "James 1:27", "Care for orphans"]],
  },
  11: {
    intro: "Friends urge David to flee like a bird to the mountains because the foundations are being destroyed. David answers that he has taken refuge in the LORD. The LORD is in His holy temple; His eyes watch over everyone. The upright will see His face.",
    v: [
      ["11:1", "Flee as a bird to your mountain", "The advice of fear."],
      ["11:3", "If the foundations are destroyed, what can the righteous do?", "The question when everything shakes."],
      ["11:4", "The LORD is in His holy temple", "The answer: God is still on His throne."],
      ["11:7", "The upright will behold His face", "The final hope."],
    ],
    refs: [["HAB.2", "Habakkuk 2:20", "The LORD is in His holy temple"], ["MAT.5", "Matthew 5:8", "The pure in heart shall see God"]],
  },
  12: {
    intro: "\"Help, LORD, for the godly man ceases to be.\" People speak lies and flattery. God promises to arise for the afflicted. In contrast to lying lips, \"The words of the LORD are pure words, as silver tried in a furnace, refined seven times.\"",
    v: [
      ["12:2", "With flattering lips and a double heart", "Words that cannot be trusted."],
      ["12:5", "Now I will arise, says the LORD", "God speaks up for the poor."],
      ["12:6", "Refined seven times", "God's word is completely pure."],
    ],
    refs: [["PRO.30", "Proverbs 30:5", "Every word of God is tested"], ["JAS.3", "James 3:5-10", "The tongue"]],
  },
  13: {
    intro: "\"How long, O LORD? Will You forget me forever?\" Four times David cries \"How long?\" He asks God to answer before he sleeps the sleep of death. Then he turns: \"But I have trusted in Your lovingkindness; my heart shall rejoice in Your salvation. I will sing to the LORD.\"",
    v: [
      ["13:1", "How long, O LORD?", "God welcomes honest prayer."],
      ["13:3", "Enlighten my eyes", "Revive me."],
      ["13:5", "But I have trusted in Your lovingkindness", "The turning point."],
    ],
    w: [["חֶסֶד", "chesed", "H2617", "lovingkindness, steadfast love", "God's loyal, covenant love that never lets go. It appears about 130 times in the Psalms and is hard to translate with one English word.", ["halot", "wilson"]]],
    refs: [["REV.6", "Revelation 6:10", "How long, O Lord?"], ["LAM.3", "Lamentations 3:22-23", "His lovingkindnesses never cease"]],
  },
  14: {
    intro: "\"The fool has said in his heart, There is no God.\" The LORD looks down to see if anyone seeks Him, and finds none who does good. Evildoers devour God's people, but God is with the righteous. The psalm ends longing for salvation to come out of Zion.",
    v: [
      ["14:1", "The fool has said in his heart", "The Hebrew fool is morally, not mentally, foolish."],
      ["14:3", "There is no one who does good, not even one", "Paul quotes this in Romans 3."],
      ["14:7", "Oh, that the salvation of Israel would come out of Zion!", "Hope for rescue."],
    ],
    refs: [["PSA.53", "Psalm 53", "Almost the same psalm"], ["ROM.3", "Romans 3:10-12", "None righteous"]],
  },
  15: {
    intro: "\"O LORD, who may abide in Your tent?\" The answer describes a person of integrity: who walks blamelessly, speaks truth from the heart, does not slander, honors those who fear the LORD, keeps his word even when it hurts, and does not take bribes. \"He who does these things will never be shaken.\"",
    v: [
      ["15:1", "Who may dwell on Your holy hill?", "Who can live near God?"],
      ["15:2", "Speaks truth in his heart", "Honesty inside and out."],
      ["15:4", "He swears to his own hurt and does not change", "Keeping promises even when costly."],
    ],
    refs: [["PSA.24", "Psalm 24:3-4", "Who may ascend the hill of the LORD?"], ["MAT.5", "Matthew 5:37", "Let your yes be yes"]],
  },
  16: {
    intro: "\"Preserve me, O God, for I take refuge in You.\" The LORD is David's portion and cup; the boundary lines have fallen for him in pleasant places. He sets the LORD always before him. \"You will not abandon my soul to Sheol, nor allow Your Holy One to undergo decay.\" In God's presence is fullness of joy.",
    v: [
      ["16:5", "The LORD is the portion of my inheritance", "God Himself is the best gift."],
      ["16:6", "The lines have fallen to me in pleasant places", "Contentment."],
      ["16:10", "Nor will You allow Your Holy One to undergo decay", "Peter and Paul apply this to Jesus' resurrection."],
      ["16:11", "In Your presence is fullness of joy", "The source of lasting joy."],
    ],
    refs: [["ACT.2", "Acts 2:25-31", "Peter preaches Psalm 16"], ["ACT.13", "Acts 13:35-37", "Paul preaches Psalm 16"]],
  },
  17: {
    intro: "David asks God to hear his just cause. He has kept from violent paths. \"Keep me as the apple of the eye; hide me in the shadow of Your wings.\" Enemies are like a lion eager to tear. David is satisfied to see God's face when he awakes.",
    v: [
      ["17:8", "Keep me as the apple of the eye", "Precious and carefully guarded."],
      ["17:8", "In the shadow of Your wings", "Like a mother bird."],
      ["17:15", "I will be satisfied with Your likeness when I awake", "Hope beyond this life."],
    ],
    refs: [["DEU.32", "Deuteronomy 32:10", "The apple of His eye"], ["MAT.23", "Matthew 23:37", "As a hen gathers her chicks"]],
  },
  18: {
    intro: "David's great song of thanks after God rescued him from Saul and all his enemies. \"I love You, O LORD, my strength. The LORD is my rock and my fortress and my deliverer.\" He cried out, and God came down in storm and earthquake to rescue him. God trains his hands for war and makes his feet like deer's feet.",
    v: [
      ["18:2", "My rock, my fortress, my deliverer", "Image after image of safety."],
      ["18:16", "He drew me out of many waters", "Rescue from overwhelming trouble."],
      ["18:30", "As for God, His way is blameless", "God is completely trustworthy."],
      ["18:33", "He makes my feet like hinds' feet", "Sure-footed in hard places."],
    ],
    refs: [["2SA.22", "2 Samuel 22", "The same song"], ["HAB.3", "Habakkuk 3:19", "Feet like hinds' feet"]],
  },
  19: {
    intro: "\"The heavens are telling of the glory of God.\" Day and night speak without words; the sun runs its course like a bridegroom. Then the psalm turns to God's written word: perfect, sure, right, pure, sweeter than honey. David asks to be kept from hidden faults and ends, \"Let the words of my mouth and the meditation of my heart be acceptable in Your sight.\"",
    v: [
      ["19:1", "The heavens are telling of the glory of God", "Creation speaks of its Maker."],
      ["19:7", "The law of the LORD is perfect, restoring the soul", "God's word gives life."],
      ["19:10", "Sweeter also than honey", "Delight in Scripture."],
      ["19:14", "Let the words of my mouth... be acceptable", "A prayer often said before teaching."],
    ],
    refs: [["ROM.1", "Romans 1:20", "His invisible attributes clearly seen"], ["ROM.10", "Romans 10:18", "Their voice has gone out"], ["PSA.119", "Psalm 119", "Love for God's word"]],
  },
  20: {
    intro: "A prayer for the king before battle. \"May the LORD answer you in the day of trouble.\" The people pray for his success. \"Some boast in chariots and some in horses, but we will boast in the name of the LORD, our God.\"",
    v: [
      ["20:1", "May the LORD answer you in the day of trouble", "A blessing for leaders."],
      ["20:4", "May He grant you your heart's desire", "Praying for others' plans."],
      ["20:7", "Some boast in chariots", "Trust in God, not weapons."],
    ],
    refs: [["PSA.21", "Psalm 21", "The thanksgiving after victory"], ["1TI.2", "1 Timothy 2:1-2", "Pray for kings"]],
  },
  21: {
    intro: "A thanksgiving for the king's victory, a companion to Psalm 20. God has given him his heart's desire, a crown of gold and length of days. The king trusts in the LORD and will not be shaken. The psalm ends, \"Be exalted, O LORD, in Your strength.\"",
    v: [
      ["21:2", "You have given him his heart's desire", "Psalm 20's prayer answered."],
      ["21:7", "The king trusts in the LORD", "The secret of his strength."],
      ["21:13", "We will sing and praise Your power", "Victory leads to worship."],
    ],
    refs: [["PSA.20", "Psalm 20", "The prayer before battle"]],
  },
  22: {
    intro: "\"My God, my God, why have You forsaken me?\" The sufferer is scorned and mocked: \"He trusts in the LORD; let Him deliver him.\" His bones are out of joint, his strength dried up, \"they pierced my hands and my feet,\" and they cast lots for his clothing. Then the psalm turns to praise: God has answered, and all the ends of the earth will turn to the LORD. \"He has done it.\"",
    v: [
      ["22:1", "My God, my God, why have You forsaken me?", "Jesus cried these words from the cross."],
      ["22:7-8", "Let Him deliver him", "The same mockery at the cross."],
      ["22:16", "They pierced my hands and my feet", "A picture fulfilled at the crucifixion."],
      ["22:18", "They cast lots for my clothing", "Fulfilled in John 19:24."],
      ["22:31", "He has done it", "Some hear an echo in Jesus' \"It is finished.\""],
    ],
    why: "Psalm 22:16 is read differently in the Hebrew manuscripts, and scholars weigh how it relates to Jesus' crucifixion.",
    views: [
      ["\"They pierced\"", "Many follow the oldest Greek translation and a Dead Sea Scrolls fragment, which read \"they pierced (or dug) my hands and my feet,\" a striking picture of crucifixion centuries before it was used.", ["craigie", "vangemeren", "kidner"]],
      ["\"Like a lion\"", "The standard Hebrew text reads \"like a lion, my hands and my feet,\" a broken phrase that some read as lions mauling; translators who follow it often still see the psalm as pointing to Christ's suffering.", ["wilson"]],
    ],
    common: "All agree the Gospels use Psalm 22 to describe Jesus' death, and that the psalm moves from abandonment to worldwide praise.",
    refs: [["MAT.27", "Matthew 27:35-46", "The crucifixion"], ["JHN.19", "John 19:23-24", "They divided My garments"], ["HEB.2", "Hebrews 2:12", "I will proclaim Your name to My brethren"]],
  },
  24: {
    intro: "\"The earth is the LORD's, and all it contains.\" Who may ascend the hill of the LORD? \"He who has clean hands and a pure heart.\" Then a call goes out: \"Lift up your heads, O gates... that the King of glory may come in!\" Who is the King of glory? The LORD of hosts.",
    v: [
      ["24:1", "The earth is the LORD's", "Everything belongs to God."],
      ["24:4", "Clean hands and a pure heart", "Right actions and right motives."],
      ["24:7", "Lift up your heads, O gates", "Probably sung as the ark entered Jerusalem."],
      ["24:10", "The LORD of hosts, He is the King of glory", "The answer."],
    ],
    refs: [["2SA.6", "2 Samuel 6", "The ark comes to Jerusalem"], ["1CO.10", "1 Corinthians 10:26", "The earth is the Lord's"], ["MAT.5", "Matthew 5:8", "Blessed are the pure in heart"]],
  },
  25: {
    intro: "An alphabet prayer. \"To You, O LORD, I lift up my soul.\" David asks God to show him His ways, teach him His paths, and remember His mercy, not the sins of his youth. \"All the paths of the LORD are lovingkindness and truth.\" He asks to be guarded and forgiven.",
    v: [
      ["25:4", "Make me know Your ways", "Asking to be taught."],
      ["25:7", "Do not remember the sins of my youth", "Forgiveness for the past."],
      ["25:14", "The secret of the LORD is for those who fear Him", "Friendship with God."],
    ],
    refs: [["PSA.86", "Psalm 86:11", "Teach me Your way"], ["ISA.43", "Isaiah 43:25", "I will not remember your sins"]],
  },
  26: {
    intro: "David asks God to vindicate him, for he has walked in integrity and trusted without wavering. He does not sit with deceitful men. He washes his hands in innocence and walks around God's altar, loving the place where God's glory dwells.",
    v: [
      ["26:2", "Examine me, O LORD, and try me", "An open heart before God."],
      ["26:6", "I shall wash my hands in innocence", "A picture of a clean life."],
      ["26:8", "I love the habitation of Your house", "Love for worship."],
    ],
    refs: [["PSA.139", "Psalm 139:23", "Search me, O God"], ["PSA.84", "Psalm 84", "How lovely are Your dwelling places"]],
  },
  27: {
    intro: "\"The LORD is my light and my salvation; whom shall I fear?\" David asks one thing: to dwell in the house of the LORD all his days and behold His beauty. \"When You said, Seek My face, my heart said to You, Your face, O LORD, I shall seek.\" Even if father and mother forsake him, the LORD will take him up. \"Wait for the LORD; be strong.\"",
    v: [
      ["27:1", "The LORD is my light", "With the LORD as his light, salvation and stronghold, David asks: whom shall I fear? God's presence drives out fear."],
      ["27:4", "One thing I have asked", "Of all he could ask for, David wants one thing: to live near God and gaze on His beauty."],
      ["27:10", "The LORD will take me up", "Even if father and mother turned away, the LORD would take him in. God's care is deeper than the closest human love."],
      ["27:14", "Wait for the LORD", "The psalm ends by telling David's own heart, and ours: wait for the LORD. Be strong and take courage while you wait."],
    ],
    refs: [["JHN.8", "John 8:12", "I am the light of the world"], ["LUK.10", "Luke 10:42", "Only one thing is necessary"], ["ISA.40", "Isaiah 40:31", "Those who wait for the LORD"]],
  },
  28: {
    intro: "David cries to God, his rock, not to be silent. He asks not to be dragged away with the wicked. Then praise breaks out: \"Blessed be the LORD, because He has heard.\" He prays for the people: \"Save Your people... be their shepherd also, and carry them forever.\"",
    v: [
      ["28:1", "Do not be deaf to me", "Fear of God's silence."],
      ["28:7", "The LORD is my strength and my shield", "Trust brings joy."],
      ["28:9", "Be their shepherd and carry them forever", "A prayer for God's people."],
    ],
    refs: [["ISA.40", "Isaiah 40:11", "He will carry the lambs"]],
  },
  29: {
    intro: "A psalm of a thunderstorm. Seven times \"the voice of the LORD\" sounds: over the waters, breaking cedars of Lebanon, flashing fire, shaking the wilderness, stripping the forests. In His temple everything says, \"Glory!\" The LORD sits as King over the flood. He gives strength and peace to His people.",
    v: [
      ["29:3", "The voice of the LORD is upon the waters", "Thunder over the sea."],
      ["29:9", "In His temple everything says, Glory!", "Creation and worshipers respond."],
      ["29:11", "The LORD will bless His people with peace", "Peace after the storm."],
    ],
    bg: [["The storm god answered", "Canaanite texts from Ugarit praise Baal as the storm god whose voice is thunder. Many scholars think Psalm 29 deliberately claims that power for the LORD alone.", "good", ["craigie", "vangemeren"]]],
    refs: [["MRK.4", "Mark 4:39-41", "Even the wind and sea obey Him"], ["1KI.18", "1 Kings 18", "The LORD versus Baal"]],
  },
  30: {
    intro: "A song for the dedication of the house. David praises God for lifting him up and healing him. \"Weeping may last for the night, but a shout of joy comes in the morning.\" In prosperity he had felt secure; when God hid His face, he was dismayed. \"You have turned for me my mourning into dancing.\"",
    v: [
      ["30:5", "Weeping may last for the night", "Sorrow is temporary for God's people."],
      ["30:6", "I will never be moved", "Pride in good times."],
      ["30:11", "You have turned my mourning into dancing", "God changes sorrow to joy."],
    ],
    refs: [["JHN.16", "John 16:20-22", "Your grief will be turned into joy"], ["2CO.4", "2 Corinthians 4:17", "Momentary, light affliction"]],
  },
  31: {
    intro: "David takes refuge in God, his rock and fortress. \"Into Your hand I commit my spirit.\" He is broken like a pot, a reproach to neighbors, but he says, \"My times are in Your hand.\" \"How great is Your goodness, which You have stored up for those who fear You!\" \"Be strong and let your heart take courage, all you who hope in the LORD.\"",
    v: [
      ["31:5", "Into Your hand I commit my spirit", "Jesus' last words on the cross."],
      ["31:15", "My times are in Your hand", "Trust about the future."],
      ["31:19", "How great is Your goodness", "God's stored-up kindness."],
    ],
    refs: [["LUK.23", "Luke 23:46", "Father, into Your hands"], ["ACT.7", "Acts 7:59", "Lord Jesus, receive my spirit"]],
  },
  32: {
    intro: "\"How blessed is he whose transgression is forgiven, whose sin is covered!\" When David kept silent about his sin, his body wasted away. When he confessed, God forgave. God promises, \"I will instruct you and teach you in the way which you should go; I will counsel you with My eye upon you.\" Do not be like a stubborn mule.",
    v: [
      ["32:1-2", "How blessed is he whose sin is covered", "Paul quotes this in Romans 4."],
      ["32:3", "When I kept silent, my body wasted away", "Hidden sin weighs heavily."],
      ["32:5", "I acknowledged my sin to You", "Confession brings forgiveness."],
      ["32:8", "I will instruct you and teach you", "God's guidance."],
    ],
    w: [["פֶּשַׁע, חֲטָאָה, עָוֹן", "pesha, chata'ah, avon", "H6588, H2401, H5771", "transgression, sin, iniquity", "Three words for wrongdoing: rebellion, missing the mark, and twisted guilt. Psalm 32 uses all three and then three words for forgiveness: lifted, covered, not counted.", ["halot", "kidner"]]],
    refs: [["ROM.4", "Romans 4:6-8", "Righteousness apart from works"], ["1JN.1", "1 John 1:9", "If we confess our sins"], ["PSA.51", "Psalm 51", "David's confession"]],
  },
  33: {
    intro: "\"Sing for joy in the LORD, O you righteous ones... sing to Him a new song.\" By the word of the LORD the heavens were made. He spoke, and it was done. God frustrates the plans of nations, but His counsel stands forever. A king is not saved by a mighty army. \"Our soul waits for the LORD; He is our help and our shield.\"",
    v: [
      ["33:3", "Sing to Him a new song", "Fresh praise."],
      ["33:6", "By the word of the LORD the heavens were made", "Creation by God's word."],
      ["33:12", "Blessed is the nation whose God is the LORD", "True security."],
      ["33:18", "The eye of the LORD is on those who fear Him", "God watches over His people."],
    ],
    refs: [["GEN.1", "Genesis 1:3", "God said, and it was"], ["HEB.11", "Hebrews 11:3", "Worlds prepared by the word of God"]],
  },
  34: {
    intro: "Written when David pretended to be insane before the Philistine king. \"I will bless the LORD at all times.\" David sought the LORD, and He delivered him from all his fears. \"O taste and see that the LORD is good.\" \"The LORD is near to the brokenhearted.\" He keeps all the bones of the righteous; not one is broken.",
    v: [
      ["34:4", "He delivered me from all my fears", "The heading links this psalm to David pretending to be mad before a Philistine king (1 Samuel 21:10-15). He sought the LORD, and God freed him from all his fears."],
      ["34:8", "O taste and see that the LORD is good", "David invites us to try God for ourselves, like tasting good food. Those who take refuge in Him are blessed."],
      ["34:18", "The LORD is near to the brokenhearted", "God does not stay away from people in pain. He comes close to the brokenhearted and saves those crushed in spirit."],
      ["34:20", "Not one of them is broken", "John applies this to Jesus (John 19:36)."],
    ],
    refs: [["1SA.21", "1 Samuel 21:10-15", "David before Achish"], ["1PE.2", "1 Peter 2:3", "You have tasted the kindness of the Lord"], ["1PE.3", "1 Peter 3:10-12", "Peter quotes Psalm 34"]],
  },
  35: {
    intro: "David asks God to fight those who fight him. People he once helped, for whom he fasted and mourned when they were sick, now repay evil for good and rejoice at his stumbling. He asks God to wake up and vindicate him, and promises to praise Him all day long.",
    v: [
      ["35:3", "Say to my soul, I am your salvation", "He needs to hear God's assurance."],
      ["35:13", "I humbled my soul with fasting", "David had cared for them."],
      ["35:19", "Those who hate me without cause", "Jesus applied this to Himself (John 15:25)."],
    ],
    refs: [["JHN.15", "John 15:25", "They hated Me without a cause"], ["ROM.12", "Romans 12:19", "Leave room for the wrath of God"]],
  },
  36: {
    intro: "The wicked have no fear of God before their eyes. But God's lovingkindness reaches to the heavens, His faithfulness to the skies. People take refuge in the shadow of His wings and drink from the river of His delights. \"For with You is the fountain of life; in Your light we see light.\"",
    v: [
      ["36:1", "There is no fear of God before his eyes", "Paul quotes this in Romans 3:18."],
      ["36:5", "Your lovingkindness extends to the heavens", "God's love has no limit."],
      ["36:9", "In Your light we see light", "God helps us see truly."],
    ],
    refs: [["JHN.4", "John 4:14", "Living water"], ["JHN.8", "John 8:12", "The light of life"]],
  },
  37: {
    intro: "A wisdom psalm in alphabet form. \"Do not fret because of evildoers.\" They will wither like grass. \"Delight yourself in the LORD; and He will give you the desires of your heart. Commit your way to the LORD.\" The meek will inherit the land. David has never seen the righteous forsaken. Wait for the LORD and keep His way.",
    v: [
      ["37:1", "Do not fret because of evildoers", "Do not burn with worry or envy when wrongdoers seem to succeed. Like grass, they will soon fade (37:2)."],
      ["37:4", "Delight yourself in the LORD", "When the LORD is our joy, our wants begin to line up with His, and He gives us the desires of our heart."],
      ["37:5", "Commit your way to the LORD", "The Hebrew word for commit means to roll, like rolling a heavy load onto someone stronger. Trust Him, and He will act."],
      ["37:11", "The humble will inherit the land", "Jesus echoes this verse in Matthew 5:5: blessed are the gentle, for they shall inherit the earth."],
    ],
    refs: [["MAT.5", "Matthew 5:5", "The meek shall inherit the earth"], ["PRO.16", "Proverbs 16:3", "Commit your works to the LORD"], ["PSA.73", "Psalm 73", "The prosperity of the wicked"]],
  },
  38: {
    intro: "A penitential psalm. David feels God's arrows and hand heavy on him because of his sin. His wounds are foul, his strength gone, his friends stand far off. Enemies seek his life. He confesses his sin and pleads, \"Do not forsake me, O LORD... make haste to help me.\"",
    v: [
      ["38:4", "My iniquities are gone over my head", "Overwhelmed by guilt."],
      ["38:11", "My loved ones and my friends stand aloof", "Loneliness in suffering."],
      ["38:18", "I confess my iniquity", "The way back."],
      ["38:22", "Make haste to help me, O Lord, my salvation", "Urgent trust."],
    ],
    refs: [["PSA.6", "Psalm 6", "Another penitential psalm"], ["LUK.18", "Luke 18:13", "God, be merciful to me, a sinner"]],
  },
  39: {
    intro: "David tried to keep silent before the wicked, but his heart burned. \"LORD, make me to know my end... let me know how transient I am.\" Every person is a mere breath. \"And now, Lord, for what do I wait? My hope is in You.\" He asks God to hear his tears.",
    v: [
      ["39:4", "Let me know how transient I am", "Wisdom about life's shortness."],
      ["39:5", "Every man at his best is a mere breath", "Life is brief."],
      ["39:7", "My hope is in You", "The only lasting hope."],
    ],
    refs: [["JAS.4", "James 4:14", "You are just a vapor"], ["PSA.90", "Psalm 90:12", "Teach us to number our days"]],
  },
  40: {
    intro: "\"I waited patiently for the LORD; and He inclined to me and heard my cry.\" God lifted David out of the pit, set his feet on a rock and put a new song in his mouth. God desires not sacrifice but an open ear: \"I delight to do Your will, O my God.\" Yet troubles surround him again, and he prays, \"Do not delay, O my God.\"",
    v: [
      ["40:2", "He brought me up out of the pit", "Rescue from despair."],
      ["40:3", "He put a new song in my mouth", "Many will see and trust."],
      ["40:6-8", "I delight to do Your will", "Hebrews 10 applies this to Christ."],
      ["40:17", "I am afflicted and needy; let the Lord be mindful of me", "Still needy, still trusting."],
    ],
    refs: [["HEB.10", "Hebrews 10:5-10", "A body You have prepared for Me"], ["1SA.15", "1 Samuel 15:22", "To obey is better than sacrifice"]],
  },
  41: {
    intro: "\"How blessed is he who considers the helpless.\" David is sick and enemies wait for him to die. \"Even my close friend in whom I trusted, who ate my bread, has lifted up his heel against me.\" He asks God to raise him up. Book One of the Psalms ends with a blessing: \"Blessed be the LORD, the God of Israel, from everlasting to everlasting. Amen and Amen.\"",
    v: [
      ["41:1", "Blessed is he who considers the helpless", "God cares for those who care."],
      ["41:9", "My close friend... has lifted up his heel against me", "Jesus applied this to Judas (John 13:18)."],
      ["41:13", "Amen and Amen", "The close of Book One."],
    ],
    bg: [["Five books of Psalms", "The Psalms are divided into five books (1-41, 42-72, 73-89, 90-106, 107-150), each ending with a blessing. Many think this echoes the five books of Moses.", "strong", ["wilson", "vangemeren"]]],
    refs: [["JHN.13", "John 13:18", "He who eats My bread"], ["MAT.5", "Matthew 5:7", "Blessed are the merciful"]],
  },
  42: {
    intro: "Book Two opens. \"As the deer pants for the water brooks, so my soul pants for You, O God.\" Far from the temple, the psalmist remembers leading crowds to worship. Tears have been his food while people ask, \"Where is your God?\" He talks to himself: \"Why are you in despair, O my soul? Hope in God, for I shall again praise Him.\"",
    v: [
      ["42:1", "As the deer pants for the water brooks", "Like a deer desperate for water in a dry land, the psalmist longs for God Himself."],
      ["42:3", "My tears have been my food", "He has cried day and night while others mock, Where is your God? The psalms give us words for honest grief."],
      ["42:5", "Why are you in despair, O my soul?", "The psalmist talks back to his own sad heart: why so downcast? Hope in God, for I will yet praise Him. The refrain comes again in 42:11 and 43:5."],
      ["42:8", "His song will be with me in the night", "By day the LORD sends His steadfast love, and at night His song stays with me, a prayer to the God of my life."],
    ],
    bg: [["The sons of Korah", "Psalms 42-49 and 84-88 are credited to the sons of Korah, a family of Levite temple singers. Their ancestor Korah rebelled against Moses (Numbers 16), but his descendants became worship leaders.", "good", ["craigie", "wilson"]]],
    refs: [["PSA.43", "Psalm 43", "The same refrain continues"], ["JHN.7", "John 7:37", "If anyone is thirsty, let him come to Me"], ["NUM.26", "Numbers 26:11", "The sons of Korah did not die"]],
  },
  43: {
    intro: "Probably once joined with Psalm 42, it shares the same refrain. The psalmist asks God to vindicate him and to send out His light and truth to lead him back to God's holy hill and altar, \"to God my exceeding joy.\"",
    v: [
      ["43:1", "Vindicate me, O God, and plead my case", "He asks God to be both his judge and his defender."],
      ["43:3", "Send out Your light and Your truth, let them lead me", "God's guidance home."],
      ["43:4", "God my exceeding joy", "God Himself is the joy."],
      ["43:5", "Hope in God", "The refrain a third time."],
    ],
    bg: [["One psalm or two?", "Psalm 43 has no title, though the psalms around it do, and it repeats the refrain of Psalm 42 (42:5, 11; 43:5). Some Hebrew manuscripts join them as one psalm. Many think they were written as one song in three stanzas.", "good", ["craigie", "kidner"]]],
    refs: [["PSA.42", "Psalm 42", "The first half"], ["JHN.14", "John 14:6", "I am the way, the truth"]],
  },
  44: {
    intro: "The people remember what God did for their fathers: not by their own sword did they win the land, but by God's right hand. Yet now they have been defeated and scattered, though they have not forgotten God. \"For Your sake we are killed all day long.\" They cry, \"Awake, why do You sleep, O Lord?\"",
    v: [
      ["44:3", "Not by their own sword", "Past victories were God's doing."],
      ["44:17", "We have not forgotten You", "Suffering without obvious cause."],
      ["44:22", "For Your sake we are killed all day long", "Paul quotes this in Romans 8:36."],
      ["44:26", "Redeem us for the sake of Your lovingkindness", "An appeal to God's love."],
    ],
    refs: [["ROM.8", "Romans 8:35-37", "More than conquerors"], ["JOB.1", "Job 1", "Suffering that is not punishment"]],
  },
  45: {
    intro: "A royal wedding song. The king is fairer than the sons of men, grace poured on his lips; he rides in majesty for truth and righteousness. \"Your throne, O God, is forever and ever.\" The bride, glorious in gold, is led to the king, and his name will be remembered in all generations.",
    v: [
      ["45:2", "You are fairer than the sons of men", "Praise for the king."],
      ["45:6-7", "Your throne, O God, is forever", "Hebrews 1:8-9 applies this to the Son."],
      ["45:10", "Forget your people and your father's house", "The bride's new loyalty."],
    ],
    refs: [["HEB.1", "Hebrews 1:8-9", "Your throne, O God"], ["EPH.5", "Ephesians 5:25-27", "Christ and His bride"], ["REV.19", "Revelation 19:7", "The marriage of the Lamb"]],
  },
  46: {
    intro: "\"God is our refuge and strength, a very present help in trouble.\" Even if the earth changes and mountains fall into the sea, we will not fear. There is a river whose streams make glad the city of God. \"The LORD of hosts is with us.\" God makes wars cease. \"Cease striving and know that I am God.\"",
    v: [
      ["46:1", "A very present help in trouble", "God is not far off. He is a refuge and strength, a help we find right there in the middle of trouble."],
      ["46:4", "There is a river", "Jerusalem had no great river; God Himself is the source."],
      ["46:10", "Cease striving and know that I am God", "The Hebrew means to let go, stop fighting. In the middle of wars and turmoil, God says: be still and know that I am God."],
    ],
    bg: [["A Mighty Fortress", "Martin Luther's hymn \"A Mighty Fortress Is Our God\" (1529) is based on Psalm 46 and has been sung by Protestant churches ever since.", "strong", ["kidner"]]],
    refs: [["2KI.19", "2 Kings 19:32-35", "God defends Jerusalem"], ["REV.22", "Revelation 22:1", "The river of the water of life"]],
  },
  47: {
    intro: "\"O clap your hands, all peoples; shout to God with the voice of joy.\" The LORD Most High is a great King over all the earth. \"God has ascended with a shout.\" The princes of the nations gather as the people of the God of Abraham.",
    v: [
      ["47:1", "Clap your hands, all peoples", "All nations invited."],
      ["47:5", "God has ascended with a shout", "Christians often read this at Ascension."],
      ["47:9", "The princes of the people have assembled", "The nations join Abraham's family."],
    ],
    refs: [["GEN.12", "Genesis 12:3", "All families blessed in Abraham"], ["ACT.1", "Acts 1:9-11", "Jesus ascends"]],
  },
  48: {
    intro: "\"Great is the LORD, and greatly to be praised, in the city of our God.\" Mount Zion is beautiful, the joy of the whole earth. Kings came and fled in panic. \"We have thought on Your lovingkindness, O God, in the midst of Your temple.\" Walk about Zion and tell the next generation: \"This is God, our God forever.\"",
    v: [
      ["48:1", "Great is the LORD", "Praise for God's city."],
      ["48:9", "We have thought on Your lovingkindness", "Thoughtful worship."],
      ["48:13-14", "Tell it to the next generation", "Passing on faith."],
    ],
    refs: [["HEB.12", "Hebrews 12:22", "Mount Zion, the city of the living God"], ["PSA.78", "Psalm 78:4", "Tell the generation to come"]],
  },
  49: {
    intro: "A wisdom psalm for rich and poor alike. Why fear when wealthy people boast? No one can pay God a ransom for another's life. The wise and the foolish both die and leave wealth to others. \"But God will redeem my soul from the power of Sheol, for He will receive me.\"",
    v: [
      ["49:7", "No man can by any means redeem his brother", "Money cannot buy life."],
      ["49:15", "God will redeem my soul... He will receive me", "Hope beyond death."],
      ["49:17", "When he dies he will carry nothing away", "Wealth stays behind."],
    ],
    refs: [["LUK.12", "Luke 12:16-21", "The rich fool"], ["1TI.6", "1 Timothy 6:7", "We brought nothing into the world"], ["MRK.8", "Mark 8:36-37", "What will a man give in exchange for his soul?"]],
  },
  50: {
    intro: "God calls heaven and earth to witness as He judges His people. He does not need their animals: \"every beast of the forest is Mine, the cattle on a thousand hills.\" What He wants is thanksgiving, kept promises and calling on Him in trouble. He rebukes those who recite His covenant but hate discipline.",
    v: [
      ["50:10", "The cattle on a thousand hills", "God owns everything."],
      ["50:14", "Offer to God a sacrifice of thanksgiving", "Grateful hearts."],
      ["50:15", "Call upon Me in the day of trouble", "God invites our prayers."],
      ["50:23", "He who offers a sacrifice of thanksgiving honors Me", "Thanks honors God."],
    ],
    refs: [["HEB.13", "Hebrews 13:15", "A sacrifice of praise"], ["MIC.6", "Micah 6:6-8", "What does the LORD require?"]],
  },
  51: {
    intro: "David's prayer after Nathan confronted him about his sin with Bathsheba. \"Be gracious to me, O God, according to Your lovingkindness... wash me thoroughly from my iniquity.\" \"Against You, You only, I have sinned.\" \"Create in me a clean heart, O God, and renew a steadfast spirit within me.\" God does not despise a broken and contrite heart.",
    v: [
      ["51:1", "According to Your lovingkindness", "The heading links this psalm to David's sin with Bathsheba (2 Samuel 11-12). He offers no excuse and asks only for God's mercy and steadfast love."],
      ["51:4", "Against You, You only, I have sinned", "David had wronged Bathsheba and Uriah terribly, yet he sees that every sin is first of all against God."],
      ["51:7", "Purify me with hyssop", "Hyssop was a small plant used to sprinkle blood or water in cleansing rites (Leviticus 14:4-7; Numbers 19:18). David asks God to wash him whiter than snow."],
      ["51:10", "Create in me a clean heart", "The Hebrew word for create is the one used in Genesis 1:1. A clean heart is something only God can make."],
      ["51:17", "A broken and a contrite heart", "Sacrifices alone could not fix David's sin. What God wants is a heart broken over sin and humble before Him."],
    ],
    w: [["בָּרָא", "bara", "H1254", "create", "The same verb as Genesis 1:1. In the Bible only God is ever the subject of this verb. David asks for a new creation inside him.", ["halot", "tate"]]],
    refs: [["2SA.12", "2 Samuel 12", "Nathan confronts David"], ["EZK.36", "Ezekiel 36:26", "A new heart"], ["2CO.5", "2 Corinthians 5:17", "A new creation"]],
  },
  52: {
    intro: "Written after Doeg the Edomite betrayed David's helpers to Saul. The boastful man loves evil and his tongue is like a sharp razor; he trusted in riches. God will uproot him. \"But as for me, I am like a green olive tree in the house of God; I trust in the lovingkindness of God forever.\"",
    v: [
      ["52:2", "Your tongue devises destruction", "The damage of words."],
      ["52:7", "Trusted in the abundance of his riches", "Misplaced trust."],
      ["52:8", "Like a green olive tree in the house of God", "Rooted and fruitful."],
    ],
    refs: [["1SA.22", "1 Samuel 22:9-19", "Doeg's betrayal"], ["JER.17", "Jeremiah 17:7-8", "Like a tree planted by water"]],
  },
  53: {
    intro: "Nearly the same as Psalm 14. \"The fool has said in his heart, There is no God.\" God looks down and finds no one who seeks Him. The psalm longs for salvation from Zion.",
    v: [
      ["53:1", "The fool has said in his heart", "Practical atheism."],
      ["53:5", "Where no terror had been", "A detail added from Psalm 14."],
    ],
    bg: [["Why twice?", "Psalm 53 uses the general name God (Elohim) where Psalm 14 uses the LORD (Yahweh), a pattern across Psalms 42-83. Many think the same song was kept in two collections of temple songs.", "good", ["tate", "kidner"]]],
    refs: [["PSA.14", "Psalm 14", "The twin psalm"], ["ROM.3", "Romans 3:10-12", "None righteous"]],
  },
  54: {
    intro: "Written when the Ziphites told Saul where David was hiding. \"Save me, O God, by Your name.\" \"Behold, God is my helper; the Lord is the sustainer of my soul.\" David promises to give thanks.",
    v: [
      ["54:1", "Save me, O God, by Your name", "God's character is his hope."],
      ["54:3", "Strangers have risen against me", "The betrayers were fellow Judeans, yet they acted like strangers."],
      ["54:4", "God is my helper", "A turning point."],
      ["54:6", "A freewill offering I will sacrifice to You", "Thanks given gladly, not because it was owed."],
    ],
    bg: [["The Ziphites", "Ziph lay in the rough wilderness southeast of Hebron, in David's own tribe of Judah. Twice its people told Saul where David was hiding (1 Samuel 23:19; 26:1). This psalm turns that betrayal into prayer.", "good", ["tate", "kidner"]]],
    refs: [["1SA.26", "1 Samuel 26:1", "The second betrayal"], ["1SA.23", "1 Samuel 23:19-29", "The Ziphites betray David"], ["HEB.13", "Hebrews 13:6", "The Lord is my helper"]],
  },
  55: {
    intro: "David is overwhelmed with fear: \"Oh, that I had wings like a dove! I would fly away and be at rest.\" The worst part is that the betrayer is \"my companion and my familiar friend; we who had sweet fellowship together.\" Evening, morning and noon he will pray. \"Cast your burden upon the LORD and He will sustain you.\"",
    v: [
      ["55:6", "Wings like a dove", "Longing to escape."],
      ["55:12-14", "It is you, my companion", "Betrayal by a close friend."],
      ["55:17", "Evening and morning and at noon", "Steady prayer."],
      ["55:22", "Cast your burden upon the LORD", "Peter echoes this in 1 Peter 5:7."],
    ],
    refs: [["1PE.5", "1 Peter 5:7", "Casting all your anxiety on Him"], ["2SA.15", "2 Samuel 15:31", "Ahithophel betrays David"]],
  },
  56: {
    intro: "Written when the Philistines seized David in Gath. \"When I am afraid, I will put my trust in You. In God, whose word I praise, in God I have put my trust; I shall not be afraid. What can mere man do to me?\" God keeps his tears in a bottle.",
    v: [
      ["56:3", "When I am afraid, I will put my trust in You", "Fear met with trust."],
      ["56:8", "Put my tears in Your bottle", "God remembers every tear."],
      ["56:11", "What can man do to me?", "Hebrews 13:6 echoes this."],
    ],
    refs: [["1SA.21", "1 Samuel 21:10", "David in Gath"], ["REV.21", "Revelation 21:4", "He will wipe away every tear"]],
  },
  57: {
    intro: "Written when David hid from Saul in the cave. \"In the shadow of Your wings I will take refuge until destruction passes by.\" He is among lions, but his heart is steadfast. \"Awake, my glory... I will awaken the dawn!\" \"Be exalted above the heavens, O God.\"",
    v: [
      ["57:1", "In the shadow of Your wings", "Like chicks under a mother bird's wings (Psalm 91:4; Matthew 23:37). David waits there \"until destruction passes by.\""],
      ["57:7", "My heart is steadfast", "Steadfast means firm and fixed. Danger is still all around, but his heart is settled."],
      ["57:8", "I will awaken the dawn", "Usually the dawn wakes us. David plans to be up singing before the sun."],
    ],
    bg: [["Do Not Destroy", "The heading names a tune, Al-tashheth, \"Do not destroy,\" shared by Psalms 57, 58, 59 and 75. David hid from Saul in caves at Adullam (1 Samuel 22:1) and at En-gedi (1 Samuel 24).", "good", ["tate", "kidner"]]],
    refs: [["1SA.24", "1 Samuel 24", "David spares Saul in the cave"], ["PSA.108", "Psalm 108", "Repeats part of this psalm"]],
  },
  58: {
    intro: "David challenges unjust rulers who speak crookedly and judge unfairly. They are like a cobra that will not listen to the charmer. He asks God to break their teeth. In the end people will say, \"Surely there is a God who judges on earth.\"",
    v: [
      ["58:1", "Do you indeed speak righteousness, O gods?", "Probably addressed to rulers or judges."],
      ["58:11", "Surely there is a God who judges on earth", "Justice will come."],
    ],
    why: "Psalm 58 is one of the imprecatory psalms, which ask God to judge enemies in strong language. Believers have long asked how to read them.",
    whySrc: ["kidner", "wilson"],
    views: [
      ["Prayers for God's justice", "Many see them as honest cries that hand vengeance over to God rather than taking it oneself, longing for evil to be stopped, as in Romans 12:19.", ["kidner", "vangemeren"]],
      ["Honest prayers we learn from", "Others stress that they show the real anger of the oppressed and teach us to bring even our anger to God, while Jesus also calls us to love and pray for enemies.", ["wilson", "tate"]],
    ],
    common: "All agree these psalms leave judgment in God's hands and that Christians read them in light of Jesus' command to love enemies.",
    refs: [["ROM.12", "Romans 12:19", "Vengeance is Mine"], ["MAT.5", "Matthew 5:44", "Love your enemies"], ["REV.6", "Revelation 6:10", "How long, O Lord, until You judge?"]],
  },
  59: {
    intro: "Written when Saul sent men to watch David's house to kill him. Enemies return each evening, howling like dogs. \"But as for me, I shall sing of Your strength... for You have been my stronghold.\"",
    v: [
      ["59:6", "They return at evening, they howl like a dog", "Relentless enemies."],
      ["59:16", "I shall joyfully sing of Your lovingkindness in the morning", "Morning brings praise."],
      ["59:17", "O my strength, I will sing praises to You", "God is his fortress."],
    ],
    refs: [["1SA.19", "1 Samuel 19:11-17", "Michal helps David escape"]],
  },
  60: {
    intro: "After a defeat, David says, \"O God, You have rejected us.\" But God has spoken: Shechem, Gilead, Ephraim and Judah are His. \"Through God we shall do valiantly, and it is He who will tread down our adversaries.\"",
    v: [
      ["60:4", "A banner to those who fear You", "God rallies His people."],
      ["60:11", "Deliverance by man is in vain", "Human help is not enough."],
      ["60:12", "Through God we shall do valiantly", "Victory through God."],
    ],
    refs: [["2SA.8", "2 Samuel 8:13-14", "Victory over Edom"], ["PSA.108", "Psalm 108", "Repeats this psalm"]],
  },
  61: {
    intro: "\"Hear my cry, O God... from the end of the earth I call to You when my heart is faint; lead me to the rock that is higher than I.\" He longs to dwell in God's tent forever and prays for the king's long life.",
    v: [
      ["61:2", "Lead me to the rock that is higher than I", "A safety beyond himself."],
      ["61:2", "From the end of the earth I call to You", "Far from home, or simply at the end of his strength, he can still pray."],
      ["61:4", "Let me dwell in Your tent forever", "Longing for God's presence."],
      ["61:4", "The shelter of Your wings", "A picture of a mother bird, or of the cherubim's wings over the ark."],
    ],
    bg: [["A prayer for the king", "Verses 6-7 pray for the king's long life and steadfast love. Many think David prayed this while far from Jerusalem, perhaps during Absalom's revolt. Christians have long heard in it the King whose reign has no end.", "good", ["tate", "kidner"]]],
    refs: [["PSA.18", "Psalm 18:2", "The LORD is my rock"]],
  },
  62: {
    intro: "\"My soul waits in silence for God only; from Him is my salvation. He only is my rock.\" People are a breath, and riches should not be trusted. \"Trust in Him at all times, O people; pour out your heart before Him.\" Power belongs to God, and so does lovingkindness.",
    v: [
      ["62:1", "My soul waits in silence for God only", "The psalmist waits quietly for God alone. His rescue comes from God, not from his own efforts."],
      ["62:8", "Pour out your heart before Him", "Trust Him at all times and tell Him everything. God is a safe place to pour out your heart."],
      ["62:10", "If riches increase, do not set your heart upon them", "Do not trust in getting rich by force or theft, and even if riches grow honestly, do not set your heart on them."],
      ["62:11-12", "Power belongs to God... and lovingkindness", "God has made two things clear: power belongs to Him, and so does steadfast love. He is both strong and kind."],
    ],
    refs: [["1PE.5", "1 Peter 5:7", "Cast your cares on Him"], ["1TI.6", "1 Timothy 6:17", "Hope not in riches"]],
  },
  63: {
    intro: "Written in the wilderness of Judah. \"O God, You are my God; I shall seek You earnestly; my soul thirsts for You... in a dry and weary land where there is no water.\" \"Because Your lovingkindness is better than life, my lips will praise You.\" He remembers God on his bed at night and clings to Him.",
    v: [
      ["63:1", "My soul thirsts for You", "Desert thirst for God."],
      ["63:3", "Your lovingkindness is better than life", "God's love above all."],
      ["63:6", "When I remember You on my bed", "Night meditation."],
      ["63:8", "My soul clings to You", "Holding on to God."],
    ],
    refs: [["MAT.5", "Matthew 5:6", "Those who hunger and thirst"], ["PHP.3", "Philippians 3:8", "Surpassing value of knowing Christ"]],
  },
  64: {
    intro: "David asks God to hide him from secret plots. Enemies sharpen their tongues like swords and shoot bitter words like arrows. But God shoots His arrow at them, and their own tongues trip them up. The righteous will be glad in the LORD.",
    v: [
      ["64:3", "Who have sharpened their tongue like a sword", "Words as weapons."],
      ["64:5", "They talk of laying snares secretly; they say, Who will see them?", "Plotters forget that God sees."],
      ["64:7", "But God will shoot at them with an arrow", "God turns the tables."],
      ["64:9", "Then all men will fear, and will declare the work of God", "When God acts, people everywhere learn from it."],
    ],
    refs: [["PRO.12", "Proverbs 12:18", "Rash words like sword thrusts"], ["JAS.3", "James 3:6-8", "The tongue is a fire"]],
  },
  65: {
    intro: "A harvest psalm. Praise waits for God in Zion. He forgives sins and satisfies us with the goodness of His house. He stills the roaring seas, waters the earth, and crowns the year with His bounty. \"The meadows are clothed with flocks... they shout for joy, yes, they sing.\"",
    v: [
      ["65:3", "You forgive our transgressions", "Forgiveness comes first."],
      ["65:9", "You visit the earth and cause it to overflow", "God sends rain."],
      ["65:11", "You have crowned the year with Your bounty", "A Thanksgiving verse."],
    ],
    refs: [["ACT.14", "Acts 14:17", "He gave you rains and fruitful seasons"], ["MAT.6", "Matthew 6:26-30", "God feeds and clothes"]],
  },
  66: {
    intro: "\"Shout joyfully to God, all the earth.\" Come and see God's works: He turned the sea into dry land. He tested His people like silver, brought them through fire and water to a place of abundance. The psalmist keeps his vows and tells what God did for his soul. \"Blessed be God, who has not turned away my prayer.\"",
    v: [
      ["66:6", "He turned the sea into dry land", "Remembering the exodus."],
      ["66:10", "You have tried us as silver is tried", "Testing that refines."],
      ["66:16", "Come and hear... I will tell of what He has done for my soul", "Personal testimony."],
      ["66:18", "If I regard wickedness in my heart, the Lord will not hear", "Prayer and a clean heart."],
    ],
    refs: [["EXO.14", "Exodus 14", "The Red Sea"], ["1PE.1", "1 Peter 1:7", "Faith tested by fire"]],
  },
  67: {
    intro: "\"God be gracious to us and bless us, and cause His face to shine upon us\" (echoing the priestly blessing), \"that Your way may be known on the earth, Your salvation among all nations.\" \"Let the peoples praise You, O God; let all the peoples praise You.\"",
    v: [
      ["67:1", "Cause His face to shine upon us", "From Numbers 6:24-26."],
      ["67:2", "That Your way may be known on the earth", "Blessed to be a blessing."],
      ["67:7", "All the ends of the earth may fear Him", "A missionary psalm."],
    ],
    refs: [["NUM.6", "Numbers 6:24-26", "The priestly blessing"], ["MAT.28", "Matthew 28:19", "Make disciples of all nations"]],
  },
  68: {
    intro: "\"Let God arise, let His enemies be scattered.\" A triumphant march: God led His people through the wilderness, shook Sinai, gave victory, and ascended to His sanctuary. \"A father of the fatherless and a judge for the widows is God.\" \"Blessed be the Lord, who daily bears our burden.\"",
    v: [
      ["68:1", "Let God arise", "The cry when the ark set out (Numbers 10:35)."],
      ["68:5-6", "A father of the fatherless", "God sets the lonely in families."],
      ["68:18", "You have ascended on high", "Paul applies this to Christ in Ephesians 4:8."],
      ["68:19", "Who daily bears our burden", "Everyday help."],
    ],
    refs: [["NUM.10", "Numbers 10:35", "Rise up, O LORD"], ["EPH.4", "Ephesians 4:8-10", "He led captive a host of captives"]],
  },
  69: {
    intro: "\"Save me, O God, for the waters have threatened my life.\" The psalmist sinks in deep mire. Those who hate him without cause are many. \"Zeal for Your house has consumed me.\" \"They gave me gall for my food, and for my thirst they gave me vinegar.\" He ends in praise: God hears the needy.",
    v: [
      ["69:4", "Those who hate me without a cause", "Jesus quoted this (John 15:25)."],
      ["69:9", "Zeal for Your house has consumed me", "Remembered when Jesus cleared the temple."],
      ["69:21", "For my thirst they gave me vinegar", "Fulfilled at the cross."],
      ["69:30", "I will praise the name of God with song", "Lament ends in praise."],
    ],
    refs: [["JHN.2", "John 2:17", "Zeal for Your house"], ["MAT.27", "Matthew 27:34, 48", "Gall and sour wine"], ["ROM.15", "Romans 15:3", "The reproaches fell on Me"]],
  },
  70: {
    intro: "A short urgent prayer, nearly the same as Psalm 40:13-17. \"O God, hasten to deliver me.\" Let all who seek God rejoice. \"I am afflicted and needy; hasten to me, O God! You are my help and my deliverer.\"",
    v: [
      ["70:1", "O God, hasten to deliver me", "Urgent prayer."],
      ["70:2-3", "Who say, Aha, aha!", "The mockers gloat; David asks that they be turned back in shame."],
      ["70:4", "Let God be magnified", "Others will praise."],
      ["70:5", "Do not delay", "Honest need."],
    ],
    bg: [["A psalm \"to bring to remembrance\"", "The title is the same as Psalm 38 and may connect it with the memorial offering, asking God to remember. Its words repeat Psalm 40:13-17 almost exactly, a short prayer kept on its own for urgent need.", "good", ["tate", "kidner"]]],
    refs: [["PSA.40", "Psalm 40:13-17", "The same prayer"]],
  },
  71: {
    intro: "A prayer of an older believer. \"You are my hope; O Lord GOD, You are my confidence from my youth.\" God has been with him from birth. \"Do not cast me off in the time of old age; do not forsake me when my strength fails.\" He wants to declare God's strength to the next generation and will still praise more and more.",
    v: [
      ["71:5", "My confidence from my youth", "A lifetime of trust."],
      ["71:9", "Do not cast me off in old age", "A prayer for the elderly."],
      ["71:14", "I will praise You yet more and more", "Praise keeps growing."],
      ["71:18", "Until I declare Your strength to this generation", "Older believers passing on faith."],
    ],
    refs: [["ISA.46", "Isaiah 46:4", "Even to your old age I will be the same"], ["2TI.1", "2 Timothy 1:5", "Faith passed down"]],
  },
  72: {
    intro: "A prayer for the king, credited to Solomon. May he judge with righteousness, defend the poor and crush the oppressor. May he rule from sea to sea, and may all kings bow before him and all nations call him blessed. \"Blessed be His glorious name forever; and may the whole earth be filled with His glory.\" \"The prayers of David the son of Jesse are ended.\"",
    v: [
      ["72:4", "May he vindicate the afflicted", "A king who cares for the poor."],
      ["72:8", "From sea to sea", "A worldwide kingdom."],
      ["72:11", "Let all kings bow down before him", "Fulfilled fully only in the Messiah."],
      ["72:19", "May the whole earth be filled with His glory", "The close of Book Two."],
    ],
    refs: [["ISA.11", "Isaiah 11:1-5", "The righteous King"], ["MAT.2", "Matthew 2:11", "The wise men bring gifts"], ["HAB.2", "Habakkuk 2:14", "The earth filled with the knowledge of His glory"]],
  },
  73: {
    intro: "Book Three opens with Asaph's honest struggle. \"Surely God is good to Israel... but as for me, my feet came close to stumbling,\" because he envied the prosperity of the wicked. It troubled him \"until I came into the sanctuary of God; then I perceived their end.\" \"Whom have I in heaven but You? And besides You, I desire nothing on earth.\"",
    v: [
      ["73:3", "I was envious of the arrogant", "Honest about jealousy."],
      ["73:17", "Until I came into the sanctuary of God", "Worship changed his view."],
      ["73:25", "Whom have I in heaven but You?", "God is enough."],
      ["73:26", "God is the strength of my heart and my portion forever", "When body fails, God remains."],
    ],
    bg: [["Asaph", "Asaph was one of David's chief musicians (1 Chronicles 16:5). Psalms 50 and 73-83 bear his name, likely written by him and the guild of singers who carried on his name.", "good", ["tate", "kidner"]]],
    refs: [["PSA.37", "Psalm 37", "Do not fret over the wicked"], ["JOB.21", "Job 21:7", "Why do the wicked live?"], ["PHP.3", "Philippians 3:8", "Knowing Christ above all"]],
  },
  74: {
    intro: "A lament after enemies destroyed the temple. \"O God, why have You rejected us forever?\" They smashed the carvings and burned the sanctuary. \"There is no longer any prophet.\" Yet God is King from of old, who divided the sea and set the boundaries of the earth. \"Arise, O God, and plead Your own cause.\"",
    v: [
      ["74:1", "Why have You rejected us forever?", "Grief over ruin."],
      ["74:7", "They have burned Your sanctuary to the ground", "Likely the Babylonian destruction in 586 BC."],
      ["74:12", "Yet God is my king from of old", "Faith remembers God's past power."],
    ],
    refs: [["LAM.2", "Lamentations 2", "The temple destroyed"], ["2KI.25", "2 Kings 25:9", "The house of the LORD burned"]],
  },
  75: {
    intro: "\"We give thanks to You, O God.\" God says, \"When I select an appointed time, it is I who judge with equity.\" Exaltation does not come from east or west, but God puts down one and exalts another. The wicked drink from the cup in the LORD's hand.",
    v: [
      ["75:2", "It is I who judge with equity", "God sets the time."],
      ["75:3", "It is I who have firmly set its pillars", "When the earth seems to shake, God holds it steady."],
      ["75:6-7", "God is the Judge; He puts down one and exalts another", "Promotion comes from God."],
      ["75:8", "A cup is in the hand of the LORD", "The cup of God's judgment, a picture used by the prophets and by Jesus in Gethsemane."],
    ],
    bg: [["The cup of wrath", "The prophets pictured God's judgment as a cup the wicked must drink (Isaiah 51:17; Jeremiah 25:15). In Gethsemane Jesus prayed, \"Let this cup pass from Me\" (Matthew 26:39), and then drank it for others.", "good", ["tate", "kidner"]]],
    refs: [["MAT.26", "Matthew 26:39", "Let this cup pass from Me"], ["LUK.1", "Luke 1:52", "He has brought down rulers"], ["1SA.2", "1 Samuel 2:7", "The LORD brings low and exalts"]],
  },
  76: {
    intro: "God is known in Judah; His dwelling is in Zion. There He broke the flaming arrows and the weapons of war. The warriors slept their final sleep. \"You, even You, are to be feared.\" Even human wrath will praise Him.",
    v: [
      ["76:3", "There He broke the flaming arrows", "God ends war."],
      ["76:10", "The wrath of man shall praise You", "God turns opposition into praise."],
    ],
    bg: [["Sennacherib's army", "The ancient Greek translation adds \"concerning the Assyrian\" to this psalm's title, linking it to the night the Assyrian army died outside Jerusalem (2 Kings 19:35).", "good", ["tate", "kidner"]]],
    refs: [["2KI.19", "2 Kings 19:35", "The angel of the LORD strikes the Assyrian camp"]],
  },
  77: {
    intro: "In the day of trouble the psalmist seeks the Lord, but his soul refuses comfort. \"Will the Lord reject forever?... Has His lovingkindness ceased forever?\" Then he decides, \"I shall remember the deeds of the LORD.\" He recalls the exodus: \"Your way was in the sea... and Your footprints may not be known. You led Your people like a flock.\"",
    v: [
      ["77:7-9", "Has God forgotten to be gracious?", "Six honest questions."],
      ["77:11", "I shall remember the deeds of the LORD", "The turning point is memory."],
      ["77:19", "Your footprints may not be known", "God leads even when we can't see how."],
    ],
    refs: [["EXO.14", "Exodus 14", "The way through the sea"], ["LAM.3", "Lamentations 3:21-23", "This I recall, therefore I have hope"]],
  },
  78: {
    intro: "Asaph opens his mouth in a parable to tell the next generation the praises of the LORD, so they will set their hope in God and not forget His works. He retells Israel's history: the exodus, manna, water from the rock, and Israel's repeated rebellion in the wilderness and in the land. Yet God was compassionate. He chose David to shepherd His people \"with integrity of heart.\"",
    v: [
      ["78:2", "I will open my mouth in a parable", "Matthew 13:35 applies this to Jesus' teaching."],
      ["78:4", "Telling to the generation to come", "Passing faith to children."],
      ["78:38", "But He, being compassionate, forgave", "God's patience."],
      ["78:72", "He shepherded them according to the integrity of his heart", "David's leadership."],
    ],
    refs: [["DEU.6", "Deuteronomy 6:6-7", "Teach them diligently to your sons"], ["MAT.13", "Matthew 13:35", "I will open My mouth in parables"], ["1CO.10", "1 Corinthians 10:1-11", "These things were written as examples"]],
  },
  79: {
    intro: "\"O God, the nations have invaded Your inheritance; they have defiled Your holy temple; they have laid Jerusalem in ruins.\" The dead lie unburied. \"Help us, O God of our salvation, for the glory of Your name; and deliver us and forgive our sins for Your name's sake.\" The people are the sheep of His pasture.",
    v: [
      ["79:1", "They have laid Jerusalem in ruins", "Lament for the city."],
      ["79:9", "For the glory of Your name", "Prayer rooted in God's honor."],
      ["79:13", "We Your people and the sheep of Your pasture", "Still His flock."],
    ],
    refs: [["PSA.74", "Psalm 74", "Another lament for the temple"], ["JER.10", "Jeremiah 10:25", "Pour out Your wrath on the nations"]],
  },
  80: {
    intro: "\"O Shepherd of Israel... You who are enthroned above the cherubim, shine forth!\" Three times the refrain prays, \"O God, restore us and cause Your face to shine upon us, and we will be saved.\" Israel is a vine God brought out of Egypt and planted, now broken down and burned. \"Let Your hand be upon the man of Your right hand.\"",
    v: [
      ["80:3", "Cause Your face to shine upon us", "A refrain of hope."],
      ["80:8", "You removed a vine from Egypt", "Israel as God's vine."],
      ["80:17", "The son of man whom You made strong for Yourself", "A hope for God's chosen king."],
    ],
    refs: [["ISA.5", "Isaiah 5:1-7", "The song of the vineyard"], ["JHN.15", "John 15:1-5", "I am the true vine"]],
  },
  81: {
    intro: "\"Sing for joy to God our strength!\" Blow the trumpet at the new moon and the full moon on the feast day. God speaks: \"I relieved his shoulder of the burden... Open your mouth wide and I will fill it.\" But His people would not listen. \"Oh that My people would listen to Me!\" He would feed them with the finest wheat and honey from the rock.",
    v: [
      ["81:10", "Open your mouth wide and I will fill it", "God wants to give generously."],
      ["81:13", "Oh that My people would listen to Me", "God's longing."],
      ["81:16", "With honey from the rock I would satisfy you", "The blessing they missed."],
    ],
    refs: [["LEV.23", "Leviticus 23:24", "The Feast of Trumpets"], ["MAT.23", "Matthew 23:37", "You were unwilling"]],
  },
  82: {
    intro: "God takes His stand in the divine assembly and judges among the \"gods.\" \"How long will you judge unjustly?\" He commands, \"Vindicate the weak and fatherless; do justice to the afflicted.\" \"I said, You are gods... nevertheless you will die like men.\" \"Arise, O God, judge the earth!\"",
    v: [
      ["82:3", "Vindicate the weak and fatherless", "God's concern for justice."],
      ["82:6", "I said, You are gods", "Jesus quoted this in John 10:34."],
      ["82:8", "Arise, O God, judge the earth", "Hope for true justice."],
    ],
    why: "Psalm 82 speaks of God judging \"gods\" in His assembly. Scholars discuss who these \"gods\" are.",
    views: [
      ["Human judges", "Many read the \"gods\" as Israel's rulers and judges, who stood in God's place to give justice; Jesus' use in John 10:34-35 fits this reading.", ["kidner", "vangemeren"]],
      ["Heavenly beings", "Others see them as spiritual powers in God's heavenly council who were given authority over nations and abused it, comparing Deuteronomy 32:8 and Daniel 10.", ["tate"]],
    ],
    common: "All agree the psalm shows God as the supreme Judge who demands justice for the weak and will judge all who rule unjustly.",
    refs: [["JHN.10", "John 10:34-36", "Jesus quotes Psalm 82"], ["ISA.1", "Isaiah 1:17", "Defend the orphan"]],
  },
  83: {
    intro: "\"O God, do not remain quiet.\" A coalition of nations, Edom, Moab, Ammon, Philistia, Tyre and Assyria, plots to wipe Israel out. The psalmist asks God to deal with them as with Midian and Sisera, \"that they may know that You alone, whose name is the LORD, are the Most High over all the earth.\"",
    v: [
      ["83:4", "Let us wipe them out as a nation", "A real threat."],
      ["83:9", "Deal with them as with Midian", "Remembering Gideon's victory."],
      ["83:18", "That they may know that You alone are the Most High", "The goal is God's name known."],
    ],
    refs: [["JDG.7", "Judges 7", "Gideon defeats Midian"], ["2CH.20", "2 Chronicles 20", "An alliance against Jehoshaphat"]],
  },
  84: {
    intro: "\"How lovely are Your dwelling places, O LORD of hosts!\" Even the sparrow has found a home near God's altars. \"How blessed are those who dwell in Your house.\" Pilgrims passing through the valley of Baca make it a spring. \"A day in Your courts is better than a thousand outside. I would rather stand at the threshold of the house of my God.\"",
    v: [
      ["84:2", "My soul longed and even yearned", "The psalmist aches to be in the courts of the LORD. Even the sparrows have found a home near His altars (84:3)."],
      ["84:5", "In whose heart are the highways to Zion", "Blessed are those whose strength is in God and whose hearts are set on the pilgrim roads to Jerusalem."],
      ["84:10", "A day in Your courts is better than a thousand", "One day near God is worth more than a thousand anywhere else. Better to stand at the door of His house than live comfortably among the wicked."],
      ["84:11", "The LORD God is a sun and shield", "The LORD is like the sun that gives light and a shield that protects. He does not hold back any good thing from those who walk uprightly."],
    ],
    refs: [["PSA.27", "Psalm 27:4", "One thing I have asked"], ["HEB.13", "Hebrews 13:14", "We seek the city to come"]],
  },
  85: {
    intro: "God showed favor before and restored His people. Now the psalmist asks, \"Will You not Yourself revive us again, that Your people may rejoice in You?\" He listens for God's word of peace. \"Lovingkindness and truth have met together; righteousness and peace have kissed each other.\"",
    v: [
      ["85:6", "Will You not revive us again?", "A prayer for renewal."],
      ["85:8", "He will speak peace to His people", "Listening for God."],
      ["85:10", "Righteousness and peace have kissed", "A beautiful picture, often linked to the cross."],
    ],
    refs: [["HAB.3", "Habakkuk 3:2", "Revive Your work"], ["ROM.5", "Romans 5:1", "Peace with God"]],
  },
  86: {
    intro: "\"Incline Your ear, O LORD, and answer me; for I am afflicted and needy.\" God is good, ready to forgive, abundant in lovingkindness. \"Teach me Your way, O LORD; I will walk in Your truth; unite my heart to fear Your name.\" All nations will come and worship. \"Turn to me and be gracious to me.\"",
    v: [
      ["86:5", "Ready to forgive", "God's eager mercy."],
      ["86:11", "Unite my heart to fear Your name", "An undivided heart."],
      ["86:15", "Slow to anger and abundant in lovingkindness", "Quoting Exodus 34:6."],
    ],
    refs: [["EXO.34", "Exodus 34:6", "Compassionate and gracious"], ["JAS.1", "James 1:8", "A double-minded man"]],
  },
  87: {
    intro: "A short song about Zion, the city God loves. Surprising nations are listed as born there: Egypt (Rahab), Babylon, Philistia, Tyre and Ethiopia. \"This one and that one were born in her.\" The LORD records the peoples as citizens of Zion. \"All my springs of joy are in you.\"",
    v: [
      ["87:4", "This one was born there", "Former enemies become citizens."],
      ["87:6", "The LORD shall count when He registers the peoples", "God's book of citizens."],
      ["87:2", "The LORD loves the gates of Zion", "Not because the city is grand, but because God chose to dwell there (Psalm 132:13)."],
      ["87:4", "Rahab and Babylon", "Rahab here is a poetic name for Egypt (Isaiah 30:7), not Rahab of Jericho. Israel's oldest enemies, Egypt and Babylon, are named first among those who know God."],
      ["87:7", "All my springs of joy are in you", "Singers and dancers celebrate. The life of every people now flows from God's city."],
    ],
    bg: [["The sons of Korah", "Psalm 87 is one of eleven psalms headed \"of the sons of Korah,\" a family of Levite temple singers (1 Chronicles 6:31-37). Their ancestor Korah rebelled against Moses (Numbers 16), but \"the sons of Korah did not die\" (Numbers 26:11), and his descendants became worship leaders.", "good", ["tate", "kidner"]]],
    refs: [["GAL.4", "Galatians 4:26", "The Jerusalem above is our mother"], ["EPH.2", "Ephesians 2:19", "Fellow citizens with the saints"], ["REV.7", "Revelation 7:9", "From every nation"]],
  },
  88: {
    intro: "The darkest psalm. \"O LORD, the God of my salvation, I have cried out by day and in the night.\" The psalmist feels near death, cut off, abandoned by friends. \"Will Your wonders be made known in the darkness?\" It ends without resolution: \"You have removed lover and friend far from me; my acquaintances are in darkness.\"",
    v: [
      ["88:1", "God of my salvation", "Even here, he speaks to his Savior."],
      ["88:13", "In the morning my prayer comes before You", "He keeps praying."],
      ["88:18", "My acquaintances are in darkness", "No happy ending."],
    ],
    bg: [["A psalm for the darkest days", "Psalm 88 is the only lament that does not turn to praise. Many teachers note its gift: it shows that faith can keep praying even when there is no feeling of answer, and that such prayers belong in the Bible.", "good", ["tate", "kidner"]]],
    refs: [["JOB.30", "Job 30:20", "I cry out, but You do not answer"], ["MAT.26", "Matthew 26:38", "My soul is deeply grieved"]],
  },
  89: {
    intro: "\"I will sing of the lovingkindness of the LORD forever.\" God made a covenant with David: \"I will establish your seed forever and build up your throne to all generations.\" God rules the raging sea. Even if David's sons sin, God will not break His covenant. But now the crown is in the dust, and the psalmist asks, \"How long, O LORD?\" Book Three ends: \"Blessed be the LORD forever! Amen and Amen.\"",
    v: [
      ["89:1", "I will sing of the lovingkindness of the LORD forever", "Faithfulness praised."],
      ["89:3-4", "I have made a covenant with My chosen", "The promise to David."],
      ["89:34", "My covenant I will not violate", "God keeps His word."],
      ["89:46", "How long, O LORD?", "Waiting for the promise."],
    ],
    refs: [["2SA.7", "2 Samuel 7:12-16", "God's covenant with David"], ["LUK.1", "Luke 1:32-33", "The throne of His father David"], ["ACT.13", "Acts 13:22-23", "From David's offspring, a Savior"]],
  },
  90: {
    intro: "Book Four opens with the only psalm credited to Moses. \"Lord, You have been our dwelling place in all generations... from everlasting to everlasting, You are God.\" A thousand years are like yesterday to Him. Our lives are like grass, seventy or eighty years. \"Teach us to number our days, that we may present to You a heart of wisdom.\" \"Confirm for us the work of our hands.\"",
    v: [
      ["90:1", "You have been our dwelling place", "The heading calls this a prayer of Moses, the oldest psalm by its title. Through every generation, God Himself has been His people's home."],
      ["90:4", "A thousand years in Your sight are like yesterday", "To the eternal God, a thousand years are like a day that has just passed. Peter uses this when people ask why Jesus has not yet returned (2 Peter 3:8)."],
      ["90:12", "Teach us to number our days", "Our lives are short, like grass that fades by evening (90:5-6). Teach us to count our days so we live them wisely."],
      ["90:17", "Confirm the work of our hands", "Moses asks God's favor on His people and that He would make the work of their hands last."],
    ],
    refs: [["2PE.3", "2 Peter 3:8", "With the Lord one day is like a thousand years"], ["JAS.4", "James 4:14", "Life is a vapor"], ["DEU.33", "Deuteronomy 33:27", "The eternal God is a dwelling place"]],
  },
  91: {
    intro: "\"He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.\" God covers His people with His feathers. \"You will not be afraid of the terror by night, or of the arrow that flies by day.\" He gives His angels charge over them. God says, \"Because he has loved Me, I will deliver him... I will be with him in trouble.\"",
    v: [
      ["91:1", "In the shadow of the Almighty", "The one who lives close to the Most High rests in His shadow, like finding shade and safety near Him."],
      ["91:4", "Under His wings you may seek refuge", "God covers His people like a bird spreading its wings over its young. His faithfulness is their shield."],
      ["91:11-12", "He will give His angels charge concerning you", "Satan misused this verse to tempt Jesus."],
      ["91:15", "I will be with him in trouble", "God does not promise there will be no trouble. He promises to be with His people in it and to rescue them."],
    ],
    refs: [["MAT.4", "Matthew 4:5-7", "Satan quotes Psalm 91"], ["HEB.1", "Hebrews 1:14", "Ministering spirits"]],
  },
  92: {
    intro: "A song for the Sabbath. \"It is good to give thanks to the LORD... to declare Your lovingkindness in the morning and Your faithfulness by night.\" The wicked sprout like grass but are destroyed. \"The righteous man will flourish like the palm tree... They will still yield fruit in old age; they shall be full of sap and very green.\"",
    v: [
      ["92:1-2", "Morning and night", "Thanks all day long."],
      ["92:12", "Flourish like the palm tree", "Strong and lasting."],
      ["92:14", "They will still yield fruit in old age", "A promise for older believers."],
    ],
    refs: [["PSA.1", "Psalm 1:3", "A tree firmly planted"], ["ISA.40", "Isaiah 40:29-31", "Renewed strength"]],
  },
  93: {
    intro: "\"The LORD reigns, He is clothed with majesty.\" His throne is established from of old. The floods have lifted up their roaring, but \"more than the sounds of many waters... the LORD on high is mighty.\" His testimonies are sure, and holiness befits His house forever.",
    v: [
      ["93:1", "The LORD reigns", "The theme of Psalms 93-99."],
      ["93:3", "The floods have lifted up their voice", "Roaring waters picture every power that threatens chaos."],
      ["93:4", "More than the sounds of many waters", "God is stronger than chaos."],
      ["93:5", "Holiness befits Your house, O LORD, forevermore", "The King's house must be holy."],
    ],
    bg: [["The LORD above the sea", "Israel's neighbors told stories of gods battling the sea. Texts from ancient Ugarit, for example, tell of Baal fighting Yam, the sea god. This psalm sings that no battle is needed: the LORD already reigns, mightier than the loudest waves.", "good", ["tate", "vangemeren"]]],
    refs: [["MRK.4", "Mark 4:39-41", "Even the wind and sea obey Him"], ["REV.19", "Revelation 19:6", "The Lord our God, the Almighty, reigns"]],
  },
  94: {
    intro: "\"O LORD, God of vengeance, shine forth!\" The wicked crush God's people and say the LORD does not see. \"He who planted the ear, does He not hear?\" \"Blessed is the man whom You chasten.\" \"If I should say, My foot has slipped, Your lovingkindness, O LORD, will hold me up. When my anxious thoughts multiply within me, Your consolations delight my soul.\"",
    v: [
      ["94:9", "He who planted the ear, does He not hear?", "God sees and hears."],
      ["94:18", "Your lovingkindness will hold me up", "God catches us when we slip."],
      ["94:19", "When my anxious thoughts multiply", "God's comfort in anxiety."],
    ],
    refs: [["ROM.12", "Romans 12:19", "Vengeance is Mine"], ["PHP.4", "Philippians 4:6-7", "Be anxious for nothing"]],
  },
  95: {
    intro: "\"O come, let us sing for joy to the LORD.\" He is a great King; the depths of the earth and the peaks of the mountains are His. \"Come, let us worship and bow down, let us kneel before the LORD our Maker.\" Then a warning: \"Today, if you would hear His voice, do not harden your hearts\" as Israel did at Meribah.",
    v: [
      ["95:1", "Let us sing for joy to the LORD", "A call to worship."],
      ["95:6", "Let us worship and bow down", "Humble worship."],
      ["95:7-8", "Today, if you would hear His voice", "Hebrews 3-4 builds on this."],
    ],
    refs: [["HEB.3", "Hebrews 3:7-15", "Do not harden your hearts"], ["EXO.17", "Exodus 17:1-7", "Meribah"]],
  },
  96: {
    intro: "\"Sing to the LORD a new song; sing to the LORD, all the earth.\" Tell of His glory among the nations. The gods of the peoples are idols, but the LORD made the heavens. \"Worship the LORD in holy attire.\" Let the heavens be glad and the trees of the forest sing, for He is coming to judge the world in righteousness.",
    v: [
      ["96:3", "Tell of His glory among the nations", "A call to share God's fame."],
      ["96:9", "In the splendor of holiness", "Worship in reverence."],
      ["96:12-13", "All the trees of the forest will sing for joy", "Creation celebrates God's coming."],
    ],
    refs: [["1CH.16", "1 Chronicles 16:23-33", "Sung when the ark came to Jerusalem"], ["ROM.8", "Romans 8:19-21", "Creation waits"]],
  },
  97: {
    intro: "\"The LORD reigns, let the earth rejoice.\" Clouds and darkness surround Him; righteousness and justice are His throne. Fire goes before Him; mountains melt like wax. \"Hate evil, you who love the LORD.\" \"Light is sown like seed for the righteous.\"",
    v: [
      ["97:2", "Righteousness and justice are the foundation of His throne", "God rules rightly."],
      ["97:10", "Hate evil, you who love the LORD", "Love for God means turning from evil."],
      ["97:11", "Light is sown like seed for the righteous", "Joy will grow."],
    ],
    refs: [["EXO.19", "Exodus 19:16-18", "God on Sinai"], ["ROM.12", "Romans 12:9", "Abhor what is evil"]],
  },
  98: {
    intro: "\"O sing to the LORD a new song, for He has done wonderful things.\" He has made known His salvation to the nations and remembered His lovingkindness to Israel. \"Shout joyfully to the LORD, all the earth.\" Let the sea roar, the rivers clap their hands, and the mountains sing, for He is coming to judge the earth.",
    v: [
      ["98:1", "His right hand has gained the victory", "God's saving power."],
      ["98:3", "All the ends of the earth have seen the salvation of our God", "Salvation for the world."],
      ["98:8", "Let the rivers clap their hands", "Creation praises."],
    ],
    bg: [["Joy to the World", "Isaac Watts based the Christmas hymn \"Joy to the World\" (1719) on Psalm 98, reading it as celebrating Christ's coming.", "strong", ["kidner"]]],
    refs: [["LUK.2", "Luke 2:30-32", "My eyes have seen Your salvation"], ["ISA.52", "Isaiah 52:10", "All the ends of the earth will see"]],
  },
  99: {
    intro: "\"The LORD reigns, let the peoples tremble.\" Three times the psalm declares, \"Holy is He.\" Moses, Aaron and Samuel called on Him and He answered. He was a forgiving God to them, yet He also disciplined their deeds. \"Exalt the LORD our God and worship at His holy hill.\"",
    v: [
      ["99:3", "Holy is He", "A refrain of holiness."],
      ["99:6", "Moses and Aaron... Samuel", "Leaders who prayed."],
      ["99:8", "A forgiving God, and yet an avenger of their evil deeds", "Mercy and justice together."],
    ],
    refs: [["ISA.6", "Isaiah 6:3", "Holy, holy, holy"], ["REV.4", "Revelation 4:8", "Holy, holy, holy"]],
  },
  100: {
    intro: "A psalm for giving thanks. \"Shout joyfully to the LORD, all the earth. Serve the LORD with gladness; come before Him with joyful singing. Know that the LORD Himself is God; it is He who has made us, and not we ourselves; we are His people and the sheep of His pasture.\" \"Enter His gates with thanksgiving.\" For the LORD is good; His lovingkindness is everlasting.",
    v: [
      ["100:2", "Serve the LORD with gladness", "Worship is not a chore. Come before the LORD with gladness and joyful singing."],
      ["100:3", "It is He who has made us", "The LORD is God. He made us and we belong to Him, like sheep of His own pasture."],
      ["100:4", "Enter His gates with thanksgiving", "Worshipers entered the temple gates and courts singing. Thanksgiving and praise are the way in."],
      ["100:5", "His faithfulness to all generations", "The LORD is good, His love lasts forever, and His faithfulness reaches every generation of a family."],
    ],
    bg: [["The Old Hundredth", "The hymn \"All People That on Earth Do Dwell\" (1561) set this psalm to a tune called \"Old Hundredth,\" the same tune often used for the Doxology, \"Praise God from Whom All Blessings Flow.\"", "strong", ["kidner"]]],
    refs: [["PSA.95", "Psalm 95:6-7", "The sheep of His hand"], ["JHN.10", "John 10:14-16", "I am the good shepherd"]],
  },
  101: {
    intro: "David's pledge as king. \"I will sing of lovingkindness and justice.\" \"I will walk within my house in the integrity of my heart. I will set no worthless thing before my eyes.\" He will not keep company with slanderers or the proud, but will look for the faithful of the land to serve him.",
    v: [
      ["101:2", "I will walk within my house in integrity", "Faithfulness at home first."],
      ["101:3", "I will set no worthless thing before my eyes", "Guarding what we look at."],
      ["101:6", "My eyes shall be upon the faithful", "Choosing good companions."],
    ],
    refs: [["PHP.4", "Philippians 4:8", "Whatever is true, honorable, pure"], ["PRO.4", "Proverbs 4:23", "Guard your heart"]],
  },
  102: {
    intro: "\"A prayer of the afflicted when he is faint.\" His days vanish like smoke, he is like a lonely bird on a housetop. But the LORD abides forever and will have compassion on Zion. \"This will be written for the generation to come.\" The heavens will wear out like clothing, \"but You are the same, and Your years will not come to an end.\"",
    v: [
      ["102:7", "Like a lonely bird on a housetop", "Isolation."],
      ["102:18", "Written for the generation to come", "Prayers that help later believers."],
      ["102:25-27", "You are the same", "Hebrews 1:10-12 applies this to the Son."],
    ],
    refs: [["HEB.1", "Hebrews 1:10-12", "You remain"], ["HEB.13", "Hebrews 13:8", "Jesus Christ is the same"]],
  },
  103: {
    intro: "\"Bless the LORD, O my soul, and all that is within me, bless His holy name... and forget none of His benefits.\" He pardons, heals, redeems, crowns with lovingkindness. \"As far as the east is from the west, so far has He removed our transgressions from us.\" \"Just as a father has compassion on his children, so the LORD has compassion on those who fear Him.\"",
    v: [
      ["103:2", "Forget none of His benefits", "David tells his own soul to bless the LORD and not forget all He has done: forgiving, healing, redeeming, crowning with love (103:3-4)."],
      ["103:8", "Compassionate and gracious, slow to anger", "Quoting God's own description of Himself to Moses (Exodus 34:6): compassionate and gracious, slow to anger and full of love."],
      ["103:12", "As far as the east is from the west", "North and south meet at the poles, but east and west never meet. That is how far God removes our sins."],
      ["103:13", "Just as a father has compassion on his children", "God knows how weak we are, that we are dust (103:14). He is tender toward us like a loving father with his children."],
    ],
    refs: [["EXO.34", "Exodus 34:6-7", "God's name"], ["MIC.7", "Micah 7:19", "Sins cast into the sea"], ["LUK.15", "Luke 15:20", "The father ran"]],
  },
  104: {
    intro: "\"Bless the LORD, O my soul! O LORD my God, You are very great.\" A hymn to God as Creator following the days of creation: light like a cloak, the earth set on foundations, springs for wild donkeys, trees for birds, wine to gladden hearts, the moon for seasons, lions seeking food from God, the sea with Leviathan at play. \"O LORD, how many are Your works! In wisdom You have made them all.\"",
    v: [
      ["104:2", "Covering Yourself with light as with a cloak", "God's glory."],
      ["104:15", "Wine which makes man's heart glad", "God's good gifts."],
      ["104:24", "In wisdom You have made them all", "Creation shows God's wisdom."],
      ["104:30", "You send forth Your Spirit, they are created", "God renews life."],
    ],
    refs: [["GEN.1", "Genesis 1", "Creation"], ["JOB.38", "Job 38-39", "God's wisdom in creation"], ["MAT.6", "Matthew 6:26", "Your Father feeds them"]],
  },
  105: {
    intro: "\"Oh give thanks to the LORD, call upon His name; make known His deeds among the peoples.\" Remember His covenant with Abraham, Isaac and Jacob. God protected the patriarchs, sent Joseph ahead into Egypt, sent Moses, struck Egypt with plagues, brought Israel out with silver and gold, and fed them in the wilderness, \"so that they might keep His statutes.\"",
    v: [
      ["105:8", "He has remembered His covenant forever", "God keeps promises."],
      ["105:17", "He sent a man before them, Joseph", "God's plan in hardship."],
      ["105:45", "So that they might keep His statutes", "Grace leads to obedience."],
    ],
    refs: [["GEN.15", "Genesis 15", "The covenant with Abraham"], ["GEN.50", "Genesis 50:20", "God meant it for good"], ["1CH.16", "1 Chronicles 16:8-22", "Sung when the ark came"]],
  },
  106: {
    intro: "\"Praise the LORD! Oh give thanks to the LORD, for He is good.\" The companion to Psalm 105 tells Israel's side: \"We have sinned like our fathers.\" They forgot God at the sea, craved meat, made the golden calf, refused the land, worshiped Baal of Peor and mixed with the nations. Yet again and again God remembered His covenant. Book Four ends: \"Blessed be the LORD... And let all the people say, Amen.\"",
    v: [
      ["106:6", "We have sinned like our fathers", "Honest confession."],
      ["106:13", "They quickly forgot His works", "The danger of forgetting."],
      ["106:23", "Had not Moses His chosen one stood in the breach", "A praying mediator."],
      ["106:45", "He remembered His covenant", "God's faithfulness beats our failure."],
    ],
    refs: [["EXO.32", "Exodus 32", "The golden calf"], ["NUM.25", "Numbers 25", "Baal of Peor"], ["NEH.9", "Nehemiah 9", "A similar confession"]],
  },
  107: {
    intro: "Book Five opens: \"Oh give thanks to the LORD, for He is good... let the redeemed of the LORD say so.\" Four groups cry out in trouble and are rescued: wanderers in the desert, prisoners in darkness, the sick near death, and sailors in a storm. Each time: \"They cried out to the LORD in their trouble, and He delivered them.\" \"Let them give thanks to the LORD for His lovingkindness.\"",
    v: [
      ["107:2", "Let the redeemed of the LORD say so", "Tell your story."],
      ["107:9", "He has satisfied the thirsty soul", "God fills the empty."],
      ["107:20", "He sent His word and healed them", "Healing by God's word."],
      ["107:29", "He caused the storm to be still", "As Jesus did on the sea."],
    ],
    refs: [["MRK.4", "Mark 4:39", "Hush, be still"], ["LUK.4", "Luke 4:18", "Release to the captives"]],
  },
  108: {
    intro: "David combines parts of two earlier psalms (57:7-11 and 60:5-12). \"My heart is steadfast, O God; I will sing.\" \"Be exalted, O God, above the heavens.\" \"Through God we will do valiantly.\"",
    v: [
      ["108:1", "My heart is steadfast", "Settled praise."],
      ["108:7-9", "Judah is my scepter; Moab is my washbasin", "God speaks as the owner of every land, Israel's and her neighbors' alike."],
      ["108:12", "Vain is the salvation of man", "Human help fails; God's help does not."],
      ["108:13", "Through God we will do valiantly", "Victory through God."],
    ],
    bg: [["An old song for a new day", "Israel reused older psalms when new needs came. Here the confident praise of Psalm 57 is joined to the prayer for victory of Psalm 60, making one new song. It sits in Book V of the Psalms, which was gathered after the exile, when God's people again needed both praise and help.", "good", ["allen", "kidner"]]],
    refs: [["PSA.57", "Psalm 57:7-11", "The first half"], ["PSA.60", "Psalm 60:5-12", "The second half"]],
  },
  109: {
    intro: "David is attacked by lying tongues: \"In return for my love they act as my accusers; but I am in prayer.\" He asks God to judge his accuser severely. \"Let another take his office.\" He is poor and needy, his heart wounded. \"Help me, O LORD my God; save me according to Your lovingkindness.\"",
    v: [
      ["109:4", "But I am in prayer", "Answering hatred with prayer."],
      ["109:8", "Let another take his office", "Peter applied this to Judas (Acts 1:20)."],
      ["109:26", "Save me according to Your lovingkindness", "Trust in God's love."],
    ],
    refs: [["ACT.1", "Acts 1:20", "Let another man take his office"], ["PSA.58", "Psalm 58", "Another imprecatory psalm"], ["LUK.6", "Luke 6:28", "Pray for those who mistreat you"]],
  },
  110: {
    intro: "\"The LORD says to my Lord: Sit at My right hand until I make Your enemies a footstool for Your feet.\" The LORD will stretch out His scepter from Zion. \"The LORD has sworn and will not change His mind, You are a priest forever according to the order of Melchizedek.\" The New Testament quotes this psalm more than any other.",
    v: [
      ["110:1", "The LORD says to my Lord", "Jesus used this to show the Messiah is greater than David (Matthew 22:41-45)."],
      ["110:1", "Sit at My right hand", "Fulfilled when Jesus ascended."],
      ["110:4", "A priest forever according to the order of Melchizedek", "Explained in Hebrews 5-7."],
    ],
    w: [["אֲדֹנִי", "adoni", "H113", "my lord, my master", "David calls the one God speaks to \"my lord.\" Jesus asked how the Messiah could be David's son if David called him Lord.", ["halot", "allen"]]],
    refs: [["MAT.22", "Matthew 22:41-46", "Jesus asks about Psalm 110"], ["ACT.2", "Acts 2:34-36", "Peter preaches Psalm 110"], ["HEB.7", "Hebrews 7", "A priest like Melchizedek"], ["GEN.14", "Genesis 14:18-20", "Melchizedek"]],
  },
  111: {
    intro: "An alphabet psalm of praise. \"Great are the works of the LORD; they are studied by all who delight in them.\" He has made His wonders to be remembered; He is gracious and compassionate. He sent redemption to His people. \"The fear of the LORD is the beginning of wisdom.\"",
    v: [
      ["111:2", "Studied by all who delight in them", "Delight leads to study."],
      ["111:4", "He has made His wonders to be remembered", "God wants us to remember."],
      ["111:10", "The fear of the LORD is the beginning of wisdom", "The foundation of wisdom."],
    ],
    refs: [["PRO.9", "Proverbs 9:10", "The beginning of wisdom"], ["PSA.112", "Psalm 112", "The companion psalm"]],
  },
  112: {
    intro: "A companion to Psalm 111, describing the person who fears the LORD. He delights in God's commands; his children will be mighty. He is gracious, lends generously and conducts his affairs with justice. \"He will not fear evil tidings; his heart is steadfast, trusting in the LORD.\"",
    v: [
      ["112:1", "Who greatly delights in His commandments", "Joy in obedience."],
      ["112:7", "He will not fear evil tidings", "Steady in bad news."],
      ["112:9", "He has given freely to the poor", "Paul quotes this in 2 Corinthians 9:9."],
    ],
    refs: [["2CO.9", "2 Corinthians 9:9", "He scattered abroad, he gave to the poor"], ["PSA.1", "Psalm 1", "The blessed man"]],
  },
  113: {
    intro: "The first of the Hallel psalms (113-118), sung at Passover. \"From the rising of the sun to its setting the name of the LORD is to be praised.\" God is high above the nations, yet He humbles Himself to look on heaven and earth. He raises the poor from the dust and makes the barren woman a joyful mother of children.",
    v: [
      ["113:3", "From the rising of the sun to its setting", "All day, everywhere."],
      ["113:6", "Who humbles Himself to behold", "The high God stoops down."],
      ["113:7-9", "He raises the poor from the dust", "Echoed in Hannah's and Mary's songs."],
    ],
    bg: [["The Hallel", "Psalms 113-118 are called the Egyptian Hallel (\"praise\") and were sung at Passover. The hymn Jesus and His disciples sang after the Last Supper was probably Psalms 115-118 (Matthew 26:30).", "strong", ["allen", "kidner"]]],
    refs: [["1SA.2", "1 Samuel 2:8", "Hannah's song"], ["LUK.1", "Luke 1:52-53", "Mary's song"], ["PHP.2", "Philippians 2:6-8", "Christ humbled Himself"]],
  },
  114: {
    intro: "When Israel went out of Egypt, the sea looked and fled, the Jordan turned back, the mountains skipped like rams. \"What ails you, O sea?\" \"Tremble, O earth, before the Lord... who turned the rock into a pool of water.\"",
    v: [
      ["114:3", "The sea looked and fled", "Creation responds to God."],
      ["114:7", "Tremble, O earth, before the Lord", "The proper response."],
      ["114:8", "Who turned the rock into a pool of water", "God's provision."],
    ],
    refs: [["EXO.14", "Exodus 14", "The Red Sea"], ["JOS.3", "Joshua 3", "The Jordan stopped"], ["1CO.10", "1 Corinthians 10:4", "The rock was Christ"]],
  },
  115: {
    intro: "\"Not to us, O LORD, not to us, but to Your name give glory.\" The nations ask, \"Where is their God?\" Our God is in the heavens and does whatever He pleases. Idols have mouths but cannot speak, eyes but cannot see, \"those who make them will become like them.\" \"O Israel, trust in the LORD; He is their help and their shield.\"",
    v: [
      ["115:1", "Not to us, O LORD, but to Your name give glory", "Humble worship."],
      ["115:4-7", "They have mouths, but they cannot speak", "Idols are powerless."],
      ["115:8", "Those who make them will become like them", "We become like what we worship."],
    ],
    refs: [["ISA.44", "Isaiah 44:9-20", "The folly of idols"], ["1CO.10", "1 Corinthians 10:31", "Do all to the glory of God"]],
  },
  116: {
    intro: "\"I love the LORD, because He hears my voice.\" The cords of death surrounded him; he called on God and was saved. \"Return to your rest, O my soul.\" \"What shall I render to the LORD for all His benefits?\" He will lift up the cup of salvation. \"Precious in the sight of the LORD is the death of His godly ones.\"",
    v: [
      ["116:1", "I love the LORD, because He hears", "Love answers love."],
      ["116:7", "Return to your rest, O my soul", "Peace after danger."],
      ["116:12-13", "What shall I render to the LORD?", "Gratitude in action."],
      ["116:15", "Precious in the sight of the LORD is the death of His godly ones", "God cares about His people's deaths."],
    ],
    refs: [["2CO.4", "2 Corinthians 4:13", "I believed, therefore I spoke"], ["MAT.11", "Matthew 11:28-29", "Rest for your souls"]],
  },
  117: {
    intro: "The shortest chapter in the Bible, two verses. \"Praise the LORD, all nations; laud Him, all peoples! For His lovingkindness is great toward us, and the truth of the LORD is everlasting. Praise the LORD!\"",
    v: [
      ["117:1", "Praise the LORD, all nations", "Paul quotes this in Romans 15:11."],
      ["117:2", "His lovingkindness is great toward us", "Two reasons: love and faithfulness."],
    ],
    bg: [["The middle chapter", "Counting the 1,189 chapters in the Protestant Bible, Psalm 117 sits right in the middle, with 594 chapters before it and 594 after. The shortest chapter calls every nation to praise.", "good", ["allen"]]],
    w: [["hesed", "KHEH-sed", "H2617", "steadfast love, lovingkindness", "God's loyal love that keeps His promises, the reason the nations are called to praise.", ["halot"]], ["emet", "eh-MET", "H571", "truth, faithfulness", "Firmness and reliability: God is true to His word forever.", ["halot"]]],
    refs: [["ROM.15", "Romans 15:11", "Gentiles praising God"], ["REV.7", "Revelation 7:9-10", "Every nation praising"]],
  },
  118: {
    intro: "\"Give thanks to the LORD, for He is good; for His lovingkindness is everlasting.\" In distress the psalmist called, and God set him free. \"It is better to take refuge in the LORD than to trust in man.\" \"Open to me the gates of righteousness.\" \"The stone which the builders rejected has become the chief corner stone.\" \"This is the day which the LORD has made.\" \"Blessed is the one who comes in the name of the LORD.\"",
    v: [
      ["118:6", "The LORD is for me; I will not fear", "With the LORD on his side, the psalmist will not be afraid of what people can do. Hebrews 13:6 quotes this."],
      ["118:8", "Better to take refuge in the LORD than to trust in man", "It is better to take refuge in the LORD than to trust in people, even powerful rulers (118:9)."],
      ["118:22", "The stone which the builders rejected", "The stone the builders threw away became the cornerstone. Jesus applied this to Himself (Matthew 21:42), and so did Peter (Acts 4:11)."],
      ["118:24", "This is the day which the LORD has made", "In this psalm, \"the day\" is the day God acted to save. Today many also say it as a joyful start to any day."],
      ["118:26", "Blessed is the one who comes in the name of the LORD", "Pilgrims were welcomed to the temple with these words. The crowds shouted them as Jesus rode into Jerusalem (Matthew 21:9)."],
    ],
    w: [["הוֹשִׁיעָה נָּא", "hoshi'ah na", "H3467, H4994", "save now, please", "The cry in 118:25. It became the word Hosanna, shouted when Jesus entered Jerusalem.", ["halot", "allen"]]],
    refs: [["MAT.21", "Matthew 21:9, 42", "Hosanna and the cornerstone"], ["ACT.4", "Acts 4:11", "The stone rejected by you builders"], ["1PE.2", "1 Peter 2:7", "The precious cornerstone"]],
  },
  119: {
    intro: "The longest chapter in the Bible, 176 verses: an alphabet poem in 22 sections of eight verses, one section for each Hebrew letter. Almost every verse speaks of God's word, using words like law, testimonies, precepts, statutes, commandments and judgments. \"How can a young man keep his way pure? By keeping it according to Your word.\" \"Your word is a lamp to my feet and a light to my path.\"",
    v: [
      ["119:9", "How can a young man keep his way pure?", "How can a young person stay on a clean path? By living according to God's word."],
      ["119:11", "Your word I have treasured in my heart", "Storing God's word in the heart, by reading and learning it by heart, helps keep us from sin."],
      ["119:18", "Open my eyes, that I may behold wonderful things", "Only God can open our eyes to the wonders in His word. Many use this verse as a prayer before reading the Bible."],
      ["119:71", "It is good for me that I was afflicted", "Hard times taught the psalmist God's ways. Looking back, he can say the affliction was good for him."],
      ["119:105", "Your word is a lamp to my feet", "In those days a small oil lamp lit only a few steps ahead. God's word gives enough light for the next step on the path."],
    ],
    bg: [["An alphabet of the word", "Each of the 22 sections begins every one of its eight lines with the same Hebrew letter: Aleph, Beth, Gimel and so on. Many Bibles print the letter names as section headings. The form suggests the psalm covers God's word \"from A to Z.\"", "strong", ["allen", "kidner"]]],
    w: [["תּוֹרָה", "torah", "H8451", "law, instruction", "More than rules: God's teaching and direction for life. The word appears 25 times in Psalm 119.", ["halot", "allen"]]],
    refs: [["PSA.19", "Psalm 19:7-11", "The law of the LORD is perfect"], ["2TI.3", "2 Timothy 3:16-17", "All Scripture is inspired"], ["JOS.1", "Joshua 1:8", "Meditate on it day and night"]],
  },
  120: {
    intro: "The first of fifteen Songs of Ascents (120-134), sung by pilgrims going up to Jerusalem. The pilgrim lives far away among liars and people who hate peace. \"I am for peace, but when I speak, they are for war.\"",
    v: [
      ["120:1", "In my trouble I cried to the LORD, and He answered me", "Starting the journey with prayer."],
      ["120:7", "I am for peace", "Longing for a better home."],
    ],
    bg: [["Songs of Ascents", "Psalms 120-134 are titled \"A Song of Ascents.\" Most scholars think pilgrims sang them on the way up to Jerusalem for the three yearly feasts; Jerusalem sits high in the hills, so every road goes up.", "good", ["allen", "kidner"]]],
    refs: [["LUK.2", "Luke 2:41-42", "Jesus' family goes up to Jerusalem"], ["HEB.11", "Hebrews 11:13-16", "Strangers seeking a homeland"]],
  },
  121: {
    intro: "\"I will lift up my eyes to the mountains; from where shall my help come? My help comes from the LORD, who made heaven and earth.\" He who keeps you will not slumber. \"The LORD is your keeper... The sun will not smite you by day, nor the moon by night. The LORD will guard your going out and your coming in from this time forth and forever.\"",
    v: [
      ["121:1-2", "My help comes from the LORD", "Pilgrims climbing to Jerusalem looked up at the hills. Their help does not come from the hills but from the LORD, who made heaven and earth."],
      ["121:4", "He who keeps Israel will neither slumber nor sleep", "God never dozes off on watch. Day and night, He keeps His people."],
      ["121:8", "Your going out and your coming in", "The LORD guards your leaving and returning, now and forever. Many families pray this over travelers."],
    ],
    w: [["שָׁמַר", "shamar", "H8104", "to keep, guard, watch over", "A shepherd's or watchman's word. It appears six times in these eight verses.", ["halot", "allen"]]],
    refs: [["PSA.124", "Psalm 124:8", "Our help is in the name of the LORD"], ["JHN.17", "John 17:11-12", "Jesus keeps His disciples"]],
  },
  122: {
    intro: "\"I was glad when they said to me, Let us go to the house of the LORD.\" Pilgrims arrive and stand within Jerusalem's gates, the city where the tribes go up to give thanks. \"Pray for the peace of Jerusalem: May they prosper who love you.\"",
    v: [
      ["122:1", "I was glad when they said to me", "Joy in going to worship."],
      ["122:3", "Jerusalem, that is built as a city that is compact together", "Pilgrims marveled at the city crowded on its hills, a picture of the people joined together."],
      ["122:5", "Thrones were set for judgment", "Jerusalem was also where justice was given, at the throne of David's house."],
      ["122:6", "Pray for the peace of Jerusalem", "Shalom: wholeness, not only no war."],
    ],
    bg: [["A play on Jerusalem's name", "The Hebrew word for peace, shalom, echoes the name Jerusalem (Yerushalayim). The pilgrims pray for the peace of the city whose name sounds like peace. This is a Song of Ascents, sung by pilgrims going up to the feasts.", "good", ["allen", "kidner"]]],
    refs: [["HEB.10", "Hebrews 10:25", "Not forsaking our assembling together"]],
  },
  123: {
    intro: "\"To You I lift up my eyes, O You who are enthroned in the heavens!\" As servants watch their master's hand, so we look to the LORD until He is gracious. \"Be gracious to us, O LORD, for we are greatly filled with contempt.\"",
    v: [
      ["123:1", "O You who are enthroned in the heavens", "Looking up past the scorn of people to the throne of God."],
      ["123:2", "As the eyes of servants look to the hand of their master", "Watching for God's help."],
      ["123:3", "Be gracious to us", "A prayer under scorn."],
    ],
    bg: [["A Song of Ascents", "Psalms 120-134 are \"Songs of Ascents,\" most likely sung by pilgrims as they went up to Jerusalem for the feasts. This short one fits a people who have been mocked by the proud, as the returned exiles were while they rebuilt (Nehemiah 4:1-4).", "good", ["allen", "kidner"]]],
    refs: [["NEH.4", "Nehemiah 4:1-4", "Mocked while rebuilding"], ["HEB.12", "Hebrews 12:2", "Fixing our eyes on Jesus"]],
  },
  124: {
    intro: "\"Had it not been the LORD who was on our side, let Israel now say.\" The enemies would have swallowed them, the flood would have swept them away. \"Our soul has escaped as a bird out of the snare.\" \"Our help is in the name of the LORD, who made heaven and earth.\"",
    v: [
      ["124:1", "Had it not been the LORD who was on our side", "Remembering rescue."],
      ["124:7", "As a bird out of the snare", "Escape."],
      ["124:8", "Our help is in the name of the LORD", "Often said at the start of worship."],
    ],
    refs: [["ROM.8", "Romans 8:31", "If God is for us"]],
  },
  125: {
    intro: "\"Those who trust in the LORD are as Mount Zion, which cannot be moved but abides forever. As the mountains surround Jerusalem, so the LORD surrounds His people.\" Do good, O LORD, to those who are upright. \"Peace be upon Israel.\"",
    v: [
      ["125:1", "As Mount Zion, which cannot be moved", "Steady trust."],
      ["125:2", "As the mountains surround Jerusalem", "Pilgrims could see the hills around the city."],
      ["125:3", "The scepter of wickedness shall not rest upon the land of the righteous", "Evil rule will not last forever, so the righteous are not pushed into doing wrong."],
      ["125:5", "Those who turn aside to their crooked ways", "A warning: trust in God means walking His straight path."],
    ],
    bg: [["The hills around Jerusalem", "Jerusalem sits lower than the hills around it: the Mount of Olives to the east, Mount Scopus to the northeast, and higher ground to the south and west. Pilgrims climbing toward the city saw it ringed by mountains, a picture of the LORD surrounding His people.", "strong", ["allen", "vangemeren"]]],
    refs: [["PRO.10", "Proverbs 10:25", "The righteous has an everlasting foundation"]],
  },
  126: {
    intro: "\"When the LORD brought back the captive ones of Zion, we were like those who dream.\" Their mouths filled with laughter. \"The LORD has done great things for us; we are glad.\" Now they pray again: \"Restore our fortunes.\" \"Those who sow in tears shall reap with joyful shouting.\"",
    v: [
      ["126:1", "We were like those who dream", "Joy too good to believe."],
      ["126:3", "The LORD has done great things for us", "Remembering answered prayer."],
      ["126:5", "Those who sow in tears shall reap with joyful shouting", "Hope for hard seasons."],
    ],
    refs: [["EZR.1", "Ezra 1", "The return from exile"], ["GAL.6", "Galatians 6:9", "In due time we will reap"]],
  },
  127: {
    intro: "A psalm of Solomon. \"Unless the LORD builds the house, they labor in vain who build it.\" It is vain to rise early and stay up late, for \"He gives to His beloved even in his sleep.\" \"Children are a gift of the LORD... like arrows in the hand of a warrior.\"",
    v: [
      ["127:1", "Unless the LORD builds the house", "God's blessing makes the work count."],
      ["127:2", "He gives to His beloved even in his sleep", "Rest is a gift."],
      ["127:3", "Children are a gift of the LORD", "A blessing, not a burden."],
    ],
    refs: [["MAT.6", "Matthew 6:25-34", "Do not be anxious"], ["PSA.128", "Psalm 128", "Blessings on the home"]],
  },
  128: {
    intro: "\"How blessed is everyone who fears the LORD, who walks in His ways.\" He will eat the fruit of his work. \"Your wife shall be like a fruitful vine within your house, your children like olive plants around your table.\" May you see your children's children.",
    v: [
      ["128:1", "Who walks in His ways", "Fear of God shown in daily life."],
      ["128:3", "Your children like olive plants around your table", "A picture of family blessing."],
      ["128:6", "May you see your children's children", "A blessing for grandparents."],
    ],
    refs: [["PRO.17", "Proverbs 17:6", "Grandchildren are the crown of old men"]],
  },
  129: {
    intro: "\"Many times they have persecuted me from my youth up, let Israel now say.\" The plowers plowed on Israel's back, but the LORD is righteous and has cut the cords of the wicked. Those who hate Zion will be like grass on the rooftops that withers before it grows.",
    v: [
      ["129:2", "Yet they have not prevailed against me", "Survival by God's grace."],
      ["129:3", "The plowers plowed upon my back", "A vivid picture of long suffering, deep furrows of pain."],
      ["129:4", "The LORD is righteous; He has cut in two the cords", "God sets free."],
      ["129:6", "Like grass upon the housetops", "Grass sprouting on flat mud roofs has no deep soil and withers fast."],
      ["129:8", "The blessing of the LORD be upon you", "The friendly greeting at harvest (Ruth 2:4) no one will give to the enemies of Zion."],
    ],
    bg: [["A Song of Ascents", "Pilgrims going up to Jerusalem sang of Israel's long history of suffering, from slavery in Egypt to exile, and of God who kept them through it all.", "good", ["allen", "kidner"]]],
    refs: [["RUT.2", "Ruth 2:4", "The LORD be with you"], ["2CO.4", "2 Corinthians 4:8-9", "Persecuted, but not forsaken"]],
  },
  130: {
    intro: "\"Out of the depths I have cried to You, O LORD.\" \"If You, LORD, should mark iniquities, O Lord, who could stand? But there is forgiveness with You, that You may be feared.\" \"My soul waits for the Lord more than the watchmen for the morning.\" With the LORD there is abundant redemption.",
    v: [
      ["130:1", "Out of the depths", "Prayer from the lowest place."],
      ["130:3-4", "There is forgiveness with You", "Forgiveness leads to reverence."],
      ["130:6", "More than the watchmen for the morning", "Eager waiting."],
      ["130:7", "With Him is abundant redemption", "More than enough grace."],
    ],
    refs: [["ROM.3", "Romans 3:23-24", "Justified by His grace"], ["1JN.1", "1 John 1:9", "He is faithful to forgive"]],
  },
  131: {
    intro: "A short psalm of humble trust. \"O LORD, my heart is not proud, nor my eyes haughty.\" David does not busy himself with things too great for him. \"Surely I have composed and quieted my soul; like a weaned child rests against his mother.\" \"O Israel, hope in the LORD.\"",
    v: [
      ["131:1", "Nor do I involve myself in great matters", "Content not to know everything."],
      ["131:2", "Like a weaned child rests against his mother", "Calm trust, not demanding."],
      ["131:3", "O Israel, hope in the LORD", "One person's quiet trust becomes a call to the whole people."],
    ],
    bg: [["A weaned child", "In Israel children were usually weaned around age two or three (Hannah waited until Samuel was weaned before bringing him to the temple, 1 Samuel 1:22-24). A nursing baby fusses to be fed; a weaned child simply rests with its mother. David's trust has grown quiet like that.", "good", ["allen", "kidner"]]],
    refs: [["1SA.1", "1 Samuel 1:22-24", "When the child is weaned"], ["MAT.18", "Matthew 18:3-4", "Become like children"], ["MAT.11", "Matthew 11:29", "Gentle and humble in heart"]],
  },
  132: {
    intro: "A psalm remembering David's vow not to rest until he found a dwelling place for the LORD, and God's answering promise: \"Of the fruit of your body I will set upon your throne.\" God has chosen Zion as His resting place forever. \"There I will cause the horn of David to spring forth.\"",
    v: [
      ["132:5", "Until I find a place for the LORD", "David's passion for God's house."],
      ["132:11", "The LORD has sworn to David a truth", "God's oath."],
      ["132:17", "There I will cause the horn of David to spring forth", "A messianic hope (Luke 1:69)."],
    ],
    refs: [["2SA.7", "2 Samuel 7", "God's covenant with David"], ["LUK.1", "Luke 1:69", "A horn of salvation in the house of David"]],
  },
  133: {
    intro: "\"Behold, how good and how pleasant it is for brothers to dwell together in unity!\" It is like the precious oil poured on Aaron's head, running down his beard, like the dew of Hermon falling on Zion. \"For there the LORD commanded the blessing, life forever.\"",
    v: [
      ["133:1", "How good and how pleasant", "Unity is a blessing."],
      ["133:2", "Like the precious oil upon the head", "Unity is holy and refreshing."],
      ["133:3", "There the LORD commanded the blessing", "God blesses unity."],
    ],
    refs: [["JHN.17", "John 17:21", "That they may all be one"], ["EPH.4", "Ephesians 4:3", "Preserve the unity of the Spirit"]],
  },
  134: {
    intro: "The last Song of Ascents, a night blessing. \"Behold, bless the LORD, all servants of the LORD, who serve by night in the house of the LORD! Lift up your hands to the sanctuary and bless the LORD.\" The priests answer: \"May the LORD bless you from Zion, He who made heaven and earth.\"",
    v: [
      ["134:1", "Who serve by night in the house of the LORD", "Faithful night watch."],
      ["134:2", "Lift up your hands to the sanctuary", "Raised hands were a common posture of prayer and praise."],
      ["134:3", "May the LORD bless you from Zion", "A blessing to take home."],
    ],
    bg: [["The last Song of Ascents", "The pilgrim songs (Psalms 120-134) end in the temple at night. The people call on the priests and Levites on night duty to bless the LORD, and the priests answer with a blessing on the people, just as Aaron's blessing did (Numbers 6:24-26).", "good", ["allen", "kidner"]]],
    refs: [["1CH.9", "1 Chronicles 9:33", "Singers on duty day and night"], ["NUM.6", "Numbers 6:24", "The LORD bless you"]],
  },
  135: {
    intro: "\"Praise the name of the LORD; praise Him, O servants of the LORD.\" The LORD has chosen Jacob as His own possession. Whatever He pleases He does, in heaven and earth. He struck Egypt and the kings of Canaan and gave their land to Israel. Idols are silver and gold that cannot speak. \"Bless the LORD, O house of Israel.\"",
    v: [
      ["135:4", "Israel for His own possession", "A treasured people."],
      ["135:6", "Whatever the LORD pleases, He does", "God's sovereignty."],
      ["135:15-18", "The idols of the nations", "Echoes Psalm 115."],
    ],
    refs: [["EXO.19", "Exodus 19:5", "My own possession"], ["PSA.115", "Psalm 115:4-8", "Idols that cannot speak"]],
  },
  136: {
    intro: "A responsive song: every one of 26 verses ends, \"For His lovingkindness is everlasting.\" It thanks God for who He is, for creation (the heavens, the earth, the sun and moon), for the exodus, for the wilderness, for the land, and for food for all flesh.",
    v: [
      ["136:1", "Give thanks to the LORD, for He is good", "The heart of worship."],
      ["136:13", "Who divided the Red Sea", "Remembering the exodus."],
      ["136:23", "Who remembered us in our low estate", "God's personal care."],
      ["136:25", "Who gives food to all flesh", "Daily provision."],
    ],
    bg: [["Sung in response", "The repeated line suggests a leader sang each first half and the congregation answered with the refrain, as at the dedication of Solomon's temple (2 Chronicles 7:3).", "good", ["allen", "kidner"]]],
    refs: [["2CH.7", "2 Chronicles 7:3", "His lovingkindness is everlasting"], ["EZR.3", "Ezra 3:11", "Sung at the new temple's foundation"]],
  },
  137: {
    intro: "\"By the rivers of Babylon, there we sat down and wept, when we remembered Zion.\" Their captors asked for songs of Zion. \"How can we sing the LORD's song in a foreign land?\" \"If I forget you, O Jerusalem, may my right hand forget her skill.\" The psalm ends with raw, bitter cries against Edom and Babylon.",
    v: [
      ["137:1", "By the rivers of Babylon", "Grief in exile."],
      ["137:4", "How can we sing the LORD's song in a foreign land?", "Faith far from home."],
      ["137:5", "If I forget you, O Jerusalem", "Refusing to forget."],
      ["137:9", "How blessed will be the one who seizes your little ones", "Shocking words of grief and anger."],
    ],
    why: "The last verses of Psalm 137 are among the hardest in the Bible. Scholars and teachers weigh how believers should read them.",
    views: [
      ["Honest grief handed to God", "Many read these lines as the raw cry of people who had seen their own children killed, asking God to repay Babylon as the prophets foretold (Isaiah 13:16), rather than taking revenge themselves.", ["kidner", "allen"]],
      ["Recorded, not commanded", "Others stress that Scripture faithfully records these feelings without approving them as models, and that Jesus teaches love for enemies, so the psalm shows how deep the wound was.", ["wilson", "vangemeren"]],
    ],
    common: "All agree the psalm shows the deep pain of exile, and that Christians bring such anger to God and read it in light of the cross.",
    refs: [["JER.51", "Jeremiah 51:24", "Babylon repaid"], ["OBA.1", "Obadiah 10-14", "Edom's cruelty"], ["MAT.5", "Matthew 5:44", "Love your enemies"]],
  },
  138: {
    intro: "\"I will give You thanks with all my heart.\" God answered on the day David called, and made him bold with strength. All the kings of the earth will praise Him. \"Though the LORD is exalted, yet He regards the lowly.\" \"The LORD will accomplish what concerns me.\"",
    v: [
      ["138:3", "On the day I called, You answered me", "Answered prayer."],
      ["138:6", "He regards the lowly", "God sees the humble."],
      ["138:8", "The LORD will accomplish what concerns me", "God finishes His work."],
    ],
    refs: [["PHP.1", "Philippians 1:6", "He who began a good work will perfect it"], ["JAS.4", "James 4:6", "Grace to the humble"]],
  },
  139: {
    intro: "\"O LORD, You have searched me and known me.\" God knows when David sits and stands, his thoughts and words before he speaks. \"Where can I go from Your Spirit?\" Even darkness is light to God. \"You formed my inward parts; You wove me in my mother's womb. I will give thanks to You, for I am fearfully and wonderfully made.\" \"Search me, O God, and know my heart.\"",
    v: [
      ["139:1", "You have searched me and known me", "God has looked deeply into David's heart and knows him completely: when he sits, stands, thinks or speaks."],
      ["139:7", "Where can I go from Your Spirit?", "There is nowhere David can go where God is not, from the heights of heaven to the depths, from dawn to the far sea (139:8-9)."],
      ["139:13-14", "Fearfully and wonderfully made", "God formed David in his mother's womb with care. He responds with praise: I am fearfully and wonderfully made."],
      ["139:16", "Your eyes have seen my unformed substance", "Before David was born, God saw him and knew all his days. Every person's life is known and valued by God."],
      ["139:23-24", "Search me, O God", "David ends by inviting God to search his heart, show him anything wrong, and lead him in the everlasting way."],
    ],
    refs: [["JER.1", "Jeremiah 1:5", "Before I formed you in the womb, I knew you"], ["HEB.4", "Hebrews 4:13", "All things are open to His eyes"], ["MAT.10", "Matthew 10:30", "The hairs of your head are numbered"]],
  },
  140: {
    intro: "\"Rescue me, O LORD, from evil men.\" They sharpen their tongues like a serpent; poison of a viper is under their lips. They set traps. \"You are my God; give ear, O LORD.\" \"I know that the LORD will maintain the cause of the afflicted.\"",
    v: [
      ["140:3", "Poison of a viper is under their lips", "Paul quotes this in Romans 3:13."],
      ["140:7", "You have covered my head in the day of battle", "God as helmet."],
      ["140:12", "The LORD will maintain the cause of the afflicted", "Justice for the weak."],
    ],
    refs: [["ROM.3", "Romans 3:13", "The poison of asps"], ["EPH.6", "Ephesians 6:17", "The helmet of salvation"]],
  },
  141: {
    intro: "An evening prayer. \"May my prayer be counted as incense before You; the lifting up of my hands as the evening offering.\" \"Set a guard, O LORD, over my mouth.\" David asks not to be drawn to evil or to eat the delicacies of the wicked. \"Let the righteous smite me in kindness and reprove me.\"",
    v: [
      ["141:2", "May my prayer be counted as incense", "Prayer rising to God."],
      ["141:3", "Set a guard over my mouth", "Help to speak well."],
      ["141:5", "Let the righteous smite me in kindness", "Welcoming correction."],
    ],
    refs: [["REV.8", "Revelation 8:3-4", "The prayers of the saints like incense"], ["JAS.3", "James 3:2-10", "Taming the tongue"], ["PRO.27", "Proverbs 27:6", "Faithful are the wounds of a friend"]],
  },
  142: {
    intro: "A prayer of David in the cave. \"I pour out my complaint before Him; I declare my trouble before Him.\" No one cares for his soul. \"You are my refuge, my portion in the land of the living.\" \"Bring my soul out of prison, so that I may give thanks to Your name.\"",
    v: [
      ["142:2", "I pour out my complaint before Him", "God welcomes honest prayer."],
      ["142:4", "No one cares for my soul", "Feeling alone."],
      ["142:5", "You are my refuge, my portion", "God is enough."],
    ],
    refs: [["1SA.22", "1 Samuel 22:1", "David in the cave of Adullam"], ["1PE.5", "1 Peter 5:7", "He cares for you"]],
  },
  143: {
    intro: "The last penitential psalm. \"Do not enter into judgment with Your servant, for in Your sight no man living is righteous.\" David remembers the days of old and stretches out his hands, thirsty like a parched land. \"Let me hear Your lovingkindness in the morning... teach me the way in which I should walk.\" \"Teach me to do Your will, for You are my God; let Your good Spirit lead me.\"",
    v: [
      ["143:2", "In Your sight no man living is righteous", "Paul echoes this in Romans 3:20."],
      ["143:8", "Let me hear Your lovingkindness in the morning", "A morning prayer."],
      ["143:10", "Teach me to do Your will", "Asking to be led."],
    ],
    refs: [["ROM.3", "Romans 3:20", "No flesh justified by works of the law"], ["GAL.5", "Galatians 5:25", "Walk by the Spirit"]],
  },
  144: {
    intro: "\"Blessed be the LORD, my rock, who trains my hands for war.\" \"O LORD, what is man, that You take knowledge of him?\" David asks God to bow the heavens and rescue him. He sings a new song and pictures a blessed land: sons like grown plants, daughters like corner pillars, full barns and flocks. \"How blessed are the people whose God is the LORD!\"",
    v: [
      ["144:3", "What is man, that You take knowledge of him?", "Echoes Psalm 8."],
      ["144:9", "I will sing a new song to You", "Fresh praise."],
      ["144:15", "How blessed are the people whose God is the LORD", "True blessing."],
    ],
    refs: [["PSA.18", "Psalm 18", "Similar words"], ["PSA.8", "Psalm 8:4", "What is man?"]],
  },
  145: {
    intro: "David's alphabet hymn of praise. \"I will extol You, my God, O King, and I will bless Your name forever.\" \"One generation shall praise Your works to another.\" \"The LORD is gracious and merciful; slow to anger and great in lovingkindness. The LORD is good to all.\" \"The LORD is near to all who call upon Him.\"",
    v: [
      ["145:3", "His greatness is unsearchable", "No end to God."],
      ["145:4", "One generation shall praise Your works to another", "Grandparents to grandchildren."],
      ["145:9", "The LORD is good to all", "God's goodness to everyone."],
      ["145:18", "The LORD is near to all who call upon Him", "God draws near."],
    ],
    refs: [["EXO.34", "Exodus 34:6", "Gracious and merciful"], ["ACT.17", "Acts 17:27", "He is not far from each one of us"]],
  },
  146: {
    intro: "The first of five Hallelujah psalms that close the book (146-150). \"Praise the LORD, O my soul! I will praise the LORD while I live.\" \"Do not trust in princes.\" Blessed is the one whose help is the God of Jacob, who made heaven and earth, keeps faith forever, feeds the hungry, frees prisoners, opens blind eyes, and protects strangers, orphans and widows. \"The LORD will reign forever.\"",
    v: [
      ["146:3", "Do not trust in princes", "People are mortal."],
      ["146:5", "Whose help is the God of Jacob", "True help."],
      ["146:7-9", "The LORD sets the prisoners free", "Jesus' ministry fulfilled these words."],
    ],
    refs: [["LUK.4", "Luke 4:18-19", "Jesus' mission"], ["LUK.7", "Luke 7:22", "The blind receive sight"]],
  },
  147: {
    intro: "\"Praise the LORD! For it is good to sing praises to our God.\" The LORD builds up Jerusalem and gathers the outcasts. \"He heals the brokenhearted and binds up their wounds. He counts the number of the stars; He gives names to all of them.\" He gives snow like wool and sends His word to melt it. He does not delight in a horse's strength but in those who fear Him.",
    v: [
      ["147:3", "He heals the brokenhearted", "God's tender care."],
      ["147:4", "He counts the number of the stars", "God's vast power."],
      ["147:11", "The LORD favors those who fear Him", "God delights in trust, not strength."],
    ],
    refs: [["ISA.61", "Isaiah 61:1", "To bind up the brokenhearted"], ["ISA.40", "Isaiah 40:26", "He calls them all by name"]],
  },
  148: {
    intro: "All creation is called to praise. From the heavens: angels, sun and moon, shining stars. From the earth: sea creatures, fire and hail, snow and wind, mountains and fruit trees, wild animals and birds, kings and all peoples, young men and young women, old men and children. \"Let them praise the name of the LORD, for His name alone is exalted.\"",
    v: [
      ["148:2", "Praise Him, all His angels", "Heaven's choir."],
      ["148:7-10", "Sea monsters... fire and hail... creeping things", "Everything God made."],
      ["148:12", "Both young men and virgins; old men and children", "Every age praising together."],
    ],
    refs: [["REV.5", "Revelation 5:13", "Every created thing praising"], ["GEN.1", "Genesis 1", "Creation"]],
  },
  149: {
    intro: "\"Sing to the LORD a new song, and His praise in the congregation of the godly ones.\" Let Israel be glad in their Maker. Let them praise His name with dancing, timbrel and lyre. \"For the LORD takes pleasure in His people; He will beautify the afflicted ones with salvation.\"",
    v: [
      ["149:1", "Sing to the LORD a new song", "A new song answers new mercies. The phrase comes again and again in the Psalms (33:3; 96:1; 98:1) and in heaven's worship (Revelation 5:9)."],
      ["149:3", "Praise His name with dancing", "Dancing, the timbrel (a hand drum) and the lyre all belong in joyful praise, as when Miriam danced after the Red Sea crossing (Exodus 15:20)."],
      ["149:4", "The LORD takes pleasure in His people", "God is pleased with His people and accepts them. He \"will beautify the afflicted ones with salvation.\""],
    ],
    bg: [["The Hallelujah psalms", "Psalms 146 to 150 each begin and end with \"Praise the LORD,\" in Hebrew hallelu-yah. The book of Psalms ends in a crescendo of praise.", "strong", ["allen"]]],
    refs: [["ZEP.3", "Zephaniah 3:17", "He will rejoice over you with shouts of joy"]],
  },
  150: {
    intro: "The final psalm is pure praise. \"Praise God in His sanctuary; praise Him in His mighty expanse.\" Praise Him for His mighty deeds and His excellent greatness. Praise Him with trumpet, harp and lyre, timbrel and dancing, strings and pipe, loud and resounding cymbals. \"Let everything that has breath praise the LORD. Praise the LORD!\"",
    v: [
      ["150:1", "Praise God in His sanctuary", "Where to praise."],
      ["150:2", "For His mighty deeds", "Why to praise."],
      ["150:3-5", "Trumpet, harp, lyre, timbrel, cymbals", "How to praise."],
      ["150:6", "Let everything that has breath praise the LORD", "Who should praise: everyone."],
    ],
    bg: [["The Psalms end in praise", "The book moves from lament toward praise. Its Hebrew name, Tehillim, means \"praises,\" and the last five psalms all begin and end with Hallelujah, \"Praise the LORD.\"", "strong", ["wilson", "allen"]]],
    refs: [["REV.19", "Revelation 19:1-6", "Hallelujah in heaven"], ["PSA.1", "Psalm 1", "The book's beginning"]],
  },
});
