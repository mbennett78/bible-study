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
    refs: [["PSA.10", "Psalm 10", "The second half of the acrostic"], ["NAH.1", "Nahum 1:7", "A stronghold in the day of trouble"]],
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
      ["27:1", "The LORD is my light", "God drives out fear."],
      ["27:4", "One thing I have asked", "One great desire."],
      ["27:10", "The LORD will take me up", "God never abandons."],
      ["27:14", "Wait for the LORD", "Patient courage."],
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
      ["34:4", "He delivered me from all my fears", "Seeking God brings relief."],
      ["34:8", "O taste and see that the LORD is good", "Try Him and find Him good."],
      ["34:18", "The LORD is near to the brokenhearted", "God draws close in grief."],
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
      ["37:1", "Do not fret because of evildoers", "Don't let the wicked steal your peace."],
      ["37:4", "Delight yourself in the LORD", "Delighting in God shapes our desires."],
      ["37:5", "Commit your way to the LORD", "Roll your path onto Him."],
      ["37:11", "The humble will inherit the land", "Jesus echoes this in Matthew 5:5."],
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
      ["42:1", "As the deer pants for the water brooks", "Thirst for God."],
      ["42:3", "My tears have been my food", "Honest sorrow."],
      ["42:5", "Why are you in despair, O my soul?", "Preaching hope to oneself."],
      ["42:8", "His song will be with me in the night", "God's love by day and night."],
    ],
    bg: [["The sons of Korah", "Psalms 42-49 and 84-88 are credited to the sons of Korah, a family of Levite temple singers. Their ancestor Korah rebelled against Moses (Numbers 16), but his descendants became worship leaders.", "good", ["craigie", "wilson"]]],
    refs: [["PSA.43", "Psalm 43", "The same refrain continues"], ["JHN.7", "John 7:37", "If anyone is thirsty, let him come to Me"], ["NUM.26", "Numbers 26:11", "The sons of Korah did not die"]],
  },
  43: {
    intro: "Probably once joined with Psalm 42, it shares the same refrain. The psalmist asks God to vindicate him and to send out His light and truth to lead him back to God's holy hill and altar, \"to God my exceeding joy.\"",
    v: [
      ["43:3", "Send out Your light and Your truth, let them lead me", "God's guidance home."],
      ["43:4", "God my exceeding joy", "God Himself is the joy."],
      ["43:5", "Hope in God", "The refrain a third time."],
    ],
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
      ["46:1", "A very present help in trouble", "Always near."],
      ["46:4", "There is a river", "Jerusalem had no great river; God Himself is the source."],
      ["46:10", "Cease striving and know that I am God", "Be still: let go and trust."],
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
      ["51:1", "According to Your lovingkindness", "David appeals only to God's mercy."],
      ["51:4", "Against You, You only, I have sinned", "All sin is ultimately against God."],
      ["51:7", "Purify me with hyssop", "Hyssop was used in cleansing rites."],
      ["51:10", "Create in me a clean heart", "Only God can make a new heart."],
      ["51:17", "A broken and a contrite heart", "What God accepts."],
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
      ["54:4", "God is my helper", "A turning point."],
    ],
    refs: [["1SA.23", "1 Samuel 23:19-29", "The Ziphites betray David"], ["HEB.13", "Hebrews 13:6", "The Lord is my helper"]],
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
      ["57:1", "In the shadow of Your wings", "Shelter while danger passes."],
      ["57:7", "My heart is steadfast", "Settled trust."],
      ["57:8", "I will awaken the dawn", "Praise that wakes the morning."],
    ],
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
      ["61:4", "Let me dwell in Your tent forever", "Longing for God's presence."],
    ],
    refs: [["PSA.18", "Psalm 18:2", "The LORD is my rock"]],
  },
  62: {
    intro: "\"My soul waits in silence for God only; from Him is my salvation. He only is my rock.\" People are a breath, and riches should not be trusted. \"Trust in Him at all times, O people; pour out your heart before Him.\" Power belongs to God, and so does lovingkindness.",
    v: [
      ["62:1", "My soul waits in silence for God only", "Quiet trust."],
      ["62:8", "Pour out your heart before Him", "Honest prayer."],
      ["62:10", "If riches increase, do not set your heart upon them", "Wealth is not security."],
      ["62:11-12", "Power belongs to God... and lovingkindness", "Strength and love together."],
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
      ["64:7", "But God will shoot at them with an arrow", "God turns the tables."],
    ],
    refs: [["JAS.3", "James 3:6-8", "The tongue is a fire"]],
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
      ["70:4", "Let God be magnified", "Others will praise."],
      ["70:5", "Do not delay", "Honest need."],
    ],
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
      ["75:6-7", "God is the Judge; He puts down one and exalts another", "Promotion comes from God."],
    ],
    refs: [["LUK.1", "Luke 1:52", "He has brought down rulers"], ["1SA.2", "1 Samuel 2:7", "The LORD brings low and exalts"]],
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
      ["84:2", "My soul longed and even yearned", "Longing for worship."],
      ["84:5", "In whose heart are the highways to Zion", "Pilgrims at heart."],
      ["84:10", "A day in Your courts is better than a thousand", "The value of God's presence."],
      ["84:11", "The LORD God is a sun and shield", "Light and protection."],
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
    ],
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
      ["90:1", "You have been our dwelling place", "God is home."],
      ["90:4", "A thousand years in Your sight are like yesterday", "Peter echoes this (2 Peter 3:8)."],
      ["90:12", "Teach us to number our days", "Living wisely because life is short."],
      ["90:17", "Confirm the work of our hands", "Asking God to make our work last."],
    ],
    refs: [["2PE.3", "2 Peter 3:8", "With the Lord one day is like a thousand years"], ["JAS.4", "James 4:14", "Life is a vapor"], ["DEU.33", "Deuteronomy 33:27", "The eternal God is a dwelling place"]],
  },
  91: {
    intro: "\"He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.\" God covers His people with His feathers. \"You will not be afraid of the terror by night, or of the arrow that flies by day.\" He gives His angels charge over them. God says, \"Because he has loved Me, I will deliver him... I will be with him in trouble.\"",
    v: [
      ["91:1", "In the shadow of the Almighty", "Safe in God."],
      ["91:4", "Under His wings you may seek refuge", "A mother bird's care."],
      ["91:11-12", "He will give His angels charge concerning you", "Satan misused this verse to tempt Jesus."],
      ["91:15", "I will be with him in trouble", "God's presence in hardship."],
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
      ["93:4", "More than the sounds of many waters", "God is stronger than chaos."],
    ],
    refs: [["REV.19", "Revelation 19:6", "The Lord our God, the Almighty, reigns"]],
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
      ["100:2", "Serve the LORD with gladness", "Joyful service."],
      ["100:3", "It is He who has made us", "We belong to God."],
      ["100:4", "Enter His gates with thanksgiving", "The way into worship."],
      ["100:5", "His faithfulness to all generations", "A promise for families."],
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
      ["103:2", "Forget none of His benefits", "Remembering God's gifts."],
      ["103:8", "Compassionate and gracious, slow to anger", "From Exodus 34:6."],
      ["103:12", "As far as the east is from the west", "Complete forgiveness."],
      ["103:13", "Just as a father has compassion on his children", "God's fatherly heart."],
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
});
