// Job chapter notes.
import { makeBook } from "./make.js";

const sources = {
  hartley: "John E. Hartley, The Book of Job, New International Commentary on the Old Testament (Eerdmans, 1988).",
  andersen: "Francis I. Andersen, Job, Tyndale Old Testament Commentaries (InterVarsity Press, 1976).",
  alden: "Robert L. Alden, Job, New American Commentary 11 (Broadman & Holman, 1993).",
  clines: "David J. A. Clines, Job 1-20, Word Biblical Commentary 17 (Word, 1989).",
  walton: "John H. Walton, Job, NIV Application Commentary (Zondervan, 2012).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["hartley", "andersen"] }, {
  1: {
    intro: "Job lives in the land of Uz, blameless and upright, fearing God and turning from evil, with ten children and great wealth. In heaven, the Accuser (Satan) claims Job serves God only because God blesses him. God allows him to take Job's possessions. In one day Job loses his animals, servants and all ten children. Job tears his robe, worships and says, \"The LORD gave and the LORD has taken away. Blessed be the name of the LORD.\"",
    v: [
      ["1:1", "Blameless, upright, fearing God", "The book insists Job's suffering is not punishment for sin."],
      ["1:9", "Does Job fear God for nothing?", "The question the whole book tests."],
      ["1:12", "Only do not put forth your hand on him", "The Accuser works only within God's limits."],
      ["1:21", "The LORD gave and the LORD has taken away", "Worship in the worst moment."],
    ],
    w: [["הַשָּׂטָן", "hassatan", "H7854", "the accuser, the adversary", "With \"the\" in front, it reads like a title: the one who accuses. The New Testament identifies Satan as the accuser of believers (Revelation 12:10).", ["halot", "hartley"]]],
    bg: [["When was Job set?", "Job's wealth measured in herds, his role as priest for his family, and his long life fit the age of the patriarchs like Abraham. Uz was probably east or southeast of Israel, toward Edom. The book never ties itself to Israel's history.", "good", ["hartley", "alden"]]],
    why: "Scholars discuss what kind of book Job is and when it was written.",
    views: [
      ["A real man's story", "Many hold that Job was a historical person (Ezekiel 14:14 and James 5:11 name him with Noah and Daniel), whose story was later told in poetic form.", ["alden", "andersen"]],
      ["Wisdom drama", "Others read Job as a wisdom drama built around a traditional figure, whose poetic speeches were composed to explore why the righteous suffer.", ["clines", "walton"]],
    ],
    common: "All agree that the book is inspired Scripture and that its main questions about suffering and trusting God are real ones.",
    refs: [["EZK.14", "Ezekiel 14:14", "Noah, Daniel and Job"], ["JAS.5", "James 5:11", "The endurance of Job"], ["REV.12", "Revelation 12:10", "The accuser of our brethren"]],
  },
  2: {
    intro: "The Accuser says Job will curse God if his own body is touched. God permits it but forbids taking his life. Job is struck with painful sores from head to foot and sits in the ashes scraping himself. His wife says, \"Curse God and die!\" Job answers, \"Shall we indeed accept good from God and not accept adversity?\" Three friends, Eliphaz, Bildad and Zophar, come to comfort him and sit silently with him for seven days.",
    v: [
      ["2:6", "Only spare his life", "God sets the limit."],
      ["2:9", "Curse God and die", "Job's wife speaks from her own grief."],
      ["2:10", "In all this Job did not sin with his lips", "Faith tested and holding."],
      ["2:13", "No one spoke a word to him", "The friends' best moment was their silent presence."],
    ],
    refs: [["ROM.12", "Romans 12:15", "Weep with those who weep"], ["2CO.12", "2 Corinthians 12:7-9", "Paul's thorn in the flesh"]],
  },
  3: {
    intro: "Job finally speaks and curses the day he was born. He wishes he had died at birth, where the weary are at rest. Why is light given to one in misery? \"What I fear comes upon me... I am not at ease, nor am I quiet, and I am not at rest, but turmoil comes.\"",
    v: [
      ["3:1", "Job cursed the day of his birth", "He curses his birthday, not God."],
      ["3:11", "Why did I not die at birth?", "Honest lament."],
      ["3:20", "Why is light given to him who suffers?", "The great \"why\" questions begin."],
      ["3:26", "I am not at rest, but turmoil comes", "Grief without relief."],
    ],
    bg: [["Poetry begins", "From 3:2 to 42:6 the book is written in Hebrew poetry, framed by a prose story at the start and end. Job's poetry has many rare words, and scholars count it among the most difficult and beautiful Hebrew in the Bible.", "good", ["hartley", "clines"]]],
    refs: [["JER.20", "Jeremiah 20:14-18", "Jeremiah curses his birth"], ["PSA.88", "Psalm 88", "A lament with no easy answer"]],
  },
  4: {
    intro: "Eliphaz speaks first, politely at first. Job has strengthened others, but now he is troubled. \"Who ever perished being innocent?\" Those who plow trouble reap it. Eliphaz describes a spirit that passed before his face in the night, asking whether any mortal can be right before God.",
    v: [
      ["4:3-5", "You have strengthened weak hands", "Kind words, but they lead to blame."],
      ["4:7", "Who ever perished being innocent?", "Eliphaz assumes suffering proves guilt."],
      ["4:8", "Those who sow trouble harvest it", "True in general, wrong about Job."],
      ["4:17", "Can mankind be just before God?", "A true point used the wrong way."],
    ],
    bg: [["The friends' mistake", "The three friends hold a strict view of retribution: God always rewards the good and punishes the wicked in this life, so great suffering means great sin. The opening chapters have already shown the reader that this does not explain Job.", "good", ["walton", "hartley"]]],
    refs: [["JHN.9", "John 9:1-3", "Who sinned, this man or his parents?"], ["LUK.13", "Luke 13:1-5", "Do you suppose they were worse sinners?"]],
  },
  5: {
    intro: "Eliphaz continues: man is born for trouble as sparks fly upward. If he were Job, he would seek God. \"Blessed is the man whom God reproves, so do not despise the discipline of the Almighty.\" God wounds and binds up. Eliphaz promises that if Job accepts correction, he will be safe and prosper.",
    v: [
      ["5:7", "Man is born for trouble, as sparks fly upward", "Trouble is part of life."],
      ["5:13", "He captures the wise by their own shrewdness", "Paul quotes this verse in 1 Corinthians 3:19."],
      ["5:17", "Blessed is the man whom God reproves", "True in its place, but Job is not being disciplined for sin."],
    ],
    refs: [["1CO.3", "1 Corinthians 3:19", "Paul quotes Eliphaz"], ["HEB.12", "Hebrews 12:5-11", "God disciplines those He loves"], ["PRO.3", "Proverbs 3:11-12", "Do not reject the discipline of the LORD"]],
  },
  6: {
    intro: "Job answers that his grief, if weighed, would be heavier than the sand of the seas. He longs for God to crush him. His friends are like a desert stream that dries up when travelers need it most. \"Teach me, and I will be silent; show me how I have erred.\"",
    v: [
      ["6:2", "Oh that my grief were actually weighed", "Words cannot measure his pain."],
      ["6:10", "I have not denied the words of the Holy One", "His comfort is his faithfulness."],
      ["6:14", "For the despairing man there should be kindness from his friend", "What Job needs most."],
      ["6:24", "Show me how I have erred", "He asks for evidence, not accusations."],
    ],
    refs: [["PRO.17", "Proverbs 17:17", "A friend loves at all times"], ["GAL.6", "Galatians 6:2", "Bear one another's burdens"]],
  },
  7: {
    intro: "Job describes life as hard service, months of emptiness and nights of misery. His days are swifter than a weaver's shuttle. Then he turns to God directly: \"What is man that You magnify him... that You examine him every morning?\" Why not pardon him and leave him alone?",
    v: [
      ["7:6", "Swifter than a weaver's shuttle", "Life is short."],
      ["7:11", "I will not restrain my mouth", "Job speaks honestly to God."],
      ["7:17", "What is man that You magnify him?", "A bitter echo of Psalm 8."],
    ],
    refs: [["PSA.8", "Psalm 8:4", "What is man that You take thought of him?"], ["PSA.39", "Psalm 39:4-5", "Let me know how transient I am"]],
  },
  8: {
    intro: "Bildad speaks more bluntly: does God pervert justice? Job's children must have sinned and been punished. If Job seeks God and is pure, God will restore him. Ask the former generations: those who forget God are like papyrus without water or a spider's web.",
    v: [
      ["8:3", "Does God pervert justice?", "Job never said He does."],
      ["8:4", "If your sons sinned against Him", "A cruel thing to say to a grieving father."],
      ["8:8", "Please inquire of past generations", "Tradition used as a weapon."],
    ],
    refs: [["PSA.1", "Psalm 1", "Like a tree by water"], ["MAT.7", "Matthew 7:1-2", "Do not judge"]],
  },
  9: {
    intro: "Job agrees that God is just, but asks how a man can be right with God. God is all-powerful; He moves mountains, made the Bear, Orion and the Pleiades. If Job argued his case, God could crush him. \"There is no umpire between us, who may lay his hand upon us both.\"",
    v: [
      ["9:2", "How can a man be in the right before God?", "The deepest question of all."],
      ["9:9", "The Bear, Orion and the Pleiades", "Star groups God made."],
      ["9:33", "There is no umpire between us", "Job longs for someone to stand between God and man."],
    ],
    w: [["מוֹכִיחַ", "mokiach", "H3198", "arbiter, umpire", "Someone who decides between two sides and can reach out to both. Job's wish for such a person points toward a mediator.", ["halot", "andersen"]]],
    refs: [["1TI.2", "1 Timothy 2:5", "One mediator between God and men"], ["AMO.5", "Amos 5:8", "He who made the Pleiades and Orion"]],
  },
  10: {
    intro: "Job pleads with God: \"Do not condemn me; let me know why You contend with me.\" God's own hands shaped him like clay, clothed him with skin, knit him with bones. Why make him only to destroy him? Job asks for a little relief before he goes to the land of darkness.",
    v: [
      ["10:2", "Let me know why You contend with me", "He wants to understand."],
      ["10:8", "Your hands fashioned and made me altogether", "God made him; surely God cares."],
      ["10:12", "Your care has preserved my spirit", "Even in protest, Job remembers God's kindness."],
    ],
    refs: [["PSA.139", "Psalm 139:13-16", "You wove me in my mother's womb"], ["ISA.64", "Isaiah 64:8", "We are the clay, You our potter"]],
  },
  11: {
    intro: "Zophar is the harshest. Job's talk must not go unanswered; God is punishing him less than he deserves. Can Job find out the deep things of God? If Job directs his heart and puts away sin, his life will become brighter than noonday.",
    v: [
      ["11:6", "God forgets a part of your iniquity", "Zophar's harsh accusation."],
      ["11:7", "Can you discover the depths of God?", "True, but it applies to Zophar too."],
      ["11:13-15", "If you would direct your heart right", "Advice that assumes Job is guilty."],
    ],
    refs: [["ROM.11", "Romans 11:33", "How unsearchable are His judgments"], ["ISA.55", "Isaiah 55:8-9", "My ways are higher than your ways"]],
  },
  12: {
    intro: "Job answers with sarcasm: \"Truly then you are the people, and with you wisdom will die!\" He knows these things as well as they do. Ask the animals: they know the LORD has done this. Wisdom and power belong to God, who overturns kings and priests.",
    v: [
      ["12:2", "With you wisdom will die", "Job mocks their certainty."],
      ["12:9-10", "In whose hand is the life of every living thing", "God holds all life."],
      ["12:13", "With Him are wisdom and might", "Job agrees God is in control, which is the problem."],
    ],
    refs: [["DAN.2", "Daniel 2:21", "He removes kings and establishes kings"], ["ACT.17", "Acts 17:25", "He gives to all people life and breath"]],
  },
  13: {
    intro: "Job tells his friends they are worthless physicians, smearing lies. He wants to argue with God Himself. \"Though He slay me, I will hope in Him.\" He asks God to remove His hand and answer him: how many are his sins?",
    v: [
      ["13:4", "You are all worthless physicians", "Their cure is worse than the disease."],
      ["13:5", "O that you would be completely silent", "Their silence was wiser."],
      ["13:15", "Though He slay me, I will hope in Him", "One of the Bible's great sayings of faith."],
      ["13:23", "How many are my iniquities?", "Job wants a fair hearing."],
    ],
    w: [["יָחַל", "yachal", "H3176", "to wait, to hope", "The word means to wait with expectation. In 13:15 the Hebrew text can be read \"I will hope in Him\" or \"I have no hope\"; most translations follow the Jewish scribes' reading, \"I will hope in Him.\"", ["halot", "hartley"]]],
    refs: [["PSA.62", "Psalm 62:5", "My hope is from Him"], ["HAB.3", "Habakkuk 3:17-18", "Though the fig tree should not blossom"]],
  },
  14: {
    intro: "Man, born of woman, is short-lived and full of trouble. A tree cut down may sprout again, but a man dies and lies still. \"If a man dies, will he live again?\" Job longs for God to hide him in the grave until His anger passes and then remember him.",
    v: [
      ["14:1", "Man, who is born of woman, is short-lived", "Life is brief and hard."],
      ["14:7", "There is hope for a tree", "A tree can grow again."],
      ["14:14", "If a man dies, will he live again?", "The question of resurrection."],
      ["14:15", "You will long for the work of Your hands", "A flash of hope."],
    ],
    refs: [["1CO.15", "1 Corinthians 15:20-22", "In Christ all will be made alive"], ["JHN.11", "John 11:25", "I am the resurrection and the life"]],
  },
  15: {
    intro: "Eliphaz's second speech is sharper. Job's own words condemn him; he is undermining reverence for God. Were you the first man born? The wicked writhe in pain all their days and will not escape darkness.",
    v: [
      ["15:4", "You do away with reverence", "Eliphaz thinks Job's honesty is dangerous."],
      ["15:7", "Were you the first man to be born?", "Mocking Job's claims."],
      ["15:11", "Are the consolations of God too small for you?", "Eliphaz thinks his own words were God's comfort, and Job has refused them."],
      ["15:20", "The wicked man writhes in pain", "Again suffering is linked to wickedness."],
    ],
    bg: [["The friends grow harsher", "In the second round of speeches (chapters 15-21), the friends stop offering Job hope and simply describe the fate of the wicked, hinting that it describes him. God later says they \"have not spoken of Me what is right\" (42:7).", "good", ["hartley", "alden"]]],
    refs: [["JOB.42", "Job 42:7", "God corrects the friends"], ["PSA.73", "Psalm 73", "Why do the wicked prosper?"]],
  },
  16: {
    intro: "\"Sorry comforters are you all.\" Job says he too could talk as they do if they were in his place. He describes God as attacking him. Yet in the middle of it he says, \"Even now, behold, my witness is in heaven, and my advocate is on high.\"",
    v: [
      ["16:2", "Sorry comforters are you all", "Their comfort only adds to his pain."],
      ["16:5", "I could strengthen you with my mouth", "What real comfort would look like."],
      ["16:19", "My witness is in heaven", "Job believes someone in heaven will speak for him."],
      ["16:21", "O that a man might plead with God", "Again he longs for a mediator."],
    ],
    refs: [["1JN.2", "1 John 2:1", "We have an Advocate with the Father"], ["HEB.7", "Hebrews 7:25", "He always lives to make intercession"]],
  },
  17: {
    intro: "Job's spirit is broken; the grave is ready for him. He asks God to put up a pledge for him, since no one else will. Mockers surround him. \"Where now is my hope? And who regards my hope?\"",
    v: [
      ["17:3", "Lay down, now, a pledge for me with Yourself", "Only God can guarantee him."],
      ["17:6", "He has made me a byword of the people", "Job has become the one everyone talks about, a warning tale."],
      ["17:9", "The righteous will hold to his way", "Even now, Job holds on."],
      ["17:15", "Where now is my hope?", "Darkness closing in."],
    ],
    bg: [["A pledge only God can give", "To \"strike hands\" was to stand as guarantor for someone's debt (Proverbs 6:1). Job has no one to stand for him, so he asks God to be his guarantor with God. The New Testament calls Jesus \"the guarantee of a better covenant\" (Hebrews 7:22).", "good", ["hartley", "andersen"]]],
    refs: [["HEB.7", "Hebrews 7:22", "Jesus, our guarantee"], ["PSA.42", "Psalm 42:5", "Why are you in despair, O my soul?"]],
  },
  18: {
    intro: "Bildad's second speech describes the fate of the wicked in vivid pictures: his light goes out, his steps are caught in a trap, terrors frighten him, disease eats his skin, and his memory perishes from the earth. The description is clearly aimed at Job.",
    v: [
      ["18:5", "The light of the wicked goes out", "A picture of total ruin."],
      ["18:13", "His skin is devoured by disease", "A pointed reference to Job's sores."],
      ["18:17", "Memory of him perishes", "Bildad attacks Job's legacy too."],
    ],
    refs: [["PRO.13", "Proverbs 13:9", "The lamp of the wicked goes out"]],
  },
  19: {
    intro: "Job asks how long they will torment him. God has walled up his way; his family and friends have turned away; even his breath is strange to his wife. \"Have pity on me, O you my friends.\" Then he rises to his greatest statement of faith: \"I know that my Redeemer lives, and at the last He will take His stand on the earth... yet from my flesh I shall see God.\"",
    v: [
      ["19:14", "My relatives have failed", "Total loneliness."],
      ["19:21", "Pity me, pity me, O you my friends", "He begs for compassion."],
      ["19:25", "I know that my Redeemer lives", "Faith shining in the darkest place."],
      ["19:26-27", "From my flesh I shall see God", "Hope beyond death."],
    ],
    w: [["גֹּאֵל", "go'el", "H1350", "redeemer", "A close relative who defends and rescues family members (as Boaz did for Ruth). Job is sure he has a living redeemer who will stand up for him in the end.", ["halot", "hartley"]]],
    why: "Job 19:25-27 is famous and hard to translate. Scholars discuss who the Redeemer is and whether Job expects to see God after death.",
    views: [
      ["God, and hope after death", "Many read the Redeemer as God Himself and \"from my flesh I shall see God\" as hope of seeing God in a resurrected body, a passage Christians have long linked to Christ.", ["hartley", "alden", "andersen"]],
      ["A heavenly defender in this life", "Others understand the Redeemer as the heavenly witness of 16:19 and read Job's hope as a vindication he expects to see, possibly before death; the Hebrew can be translated \"apart from my flesh\" or \"in my flesh.\"", ["clines", "walton"]],
    ],
    common: "All agree that Job, at his lowest point, expresses firm confidence that God will finally vindicate him.",
    refs: [["RUT.4", "Ruth 4", "Boaz the redeemer"], ["1CO.15", "1 Corinthians 15:51-54", "We will be changed"], ["1JN.3", "1 John 3:2", "We will see Him just as He is"]],
  },
  20: {
    intro: "Zophar is insulted and answers that the joy of the wicked is short. He may swallow riches, but he will vomit them up. Heaven will reveal his guilt. This is the wicked man's portion from God.",
    v: [
      ["20:2", "My disquieting thoughts make me respond", "Zophar answers out of hurt pride."],
      ["20:5", "The triumphing of the wicked is short", "A general truth turned against Job."],
      ["20:15", "He swallows riches, but will vomit them up", "Ill-gotten gain does not last."],
      ["20:29", "This is the wicked man's portion from God", "Zophar's last word."],
    ],
    bg: [["Zophar's last word", "This is Zophar's final speech; he does not speak in the third round. What he says is often true in general, as the Psalms and Proverbs agree, but he is wrong to apply it to Job. Job answers in chapter 21 that the wicked often do prosper.", "good", ["hartley", "andersen"]]],
    refs: [["JOB.21", "Job 21:7", "Why do the wicked still live?"], ["PSA.37", "Psalm 37:1-2", "Do not fret because of evildoers"]],
  },
  21: {
    intro: "Job challenges the friends' main idea directly. Look around: the wicked often live long, grow rich, see their children prosper, and die in peace. One man dies healthy and another bitter, and both lie in the dust. \"How then will you vainly comfort me?\"",
    v: [
      ["21:7", "Why do the wicked still live?", "Real life does not fit their theory."],
      ["21:23-26", "One dies in his full strength... another dies with a bitter soul", "Death comes to all alike."],
      ["21:34", "Your answers remain full of falsehood", "Their theory is wrong."],
    ],
    refs: [["PSA.73", "Psalm 73:3-17", "I saw the prosperity of the wicked"], ["JER.12", "Jeremiah 12:1", "Why has the way of the wicked prospered?"], ["ECC.9", "Ecclesiastes 9:2-3", "One fate for all"]],
  },
  22: {
    intro: "Eliphaz now accuses Job of specific sins he has no evidence for: taking pledges from the poor, stripping the naked, refusing water to the thirsty and bread to the hungry, and sending widows away empty. He urges Job to return to the Almighty, and then God will hear his prayers.",
    v: [
      ["22:5", "Is not your wickedness great?", "Accusation without proof."],
      ["22:6-9", "You have stripped the naked of their clothing", "Every charge is false, as chapter 29 shows."],
      ["22:21", "Yield now and be at peace with Him", "Good words aimed at the wrong man."],
    ],
    refs: [["JOB.29", "Job 29:12-17", "Job's true record"], ["JOB.42", "Job 42:7", "God says the friends were wrong"]],
  },
  23: {
    intro: "Job longs to find God and lay his case before Him. He goes forward and back, left and right, but cannot find Him. \"But He knows the way I take; when He has tried me, I shall come forth as gold.\" He has treasured God's words more than his daily food.",
    v: [
      ["23:3", "Oh that I knew where I might find Him", "Feeling God's absence."],
      ["23:10", "When He has tried me, I shall come forth as gold", "Trust in God's purpose through testing."],
      ["23:12", "I have treasured the words of His mouth more than my necessary food", "Job's love for God's word."],
    ],
    refs: [["1PE.1", "1 Peter 1:6-7", "Faith more precious than gold tested by fire"], ["PSA.119", "Psalm 119:103", "How sweet are Your words"]],
  },
  24: {
    intro: "Why does God not set times for judgment? Job describes the cruelty of the powerful: moving boundary stones, stealing flocks, pushing the poor aside, so that the poor shiver without clothing and the dying groan in the city. Yet God seems not to notice. In the end the wicked are cut off like heads of grain.",
    v: [
      ["24:1", "Why are times not stored up by the Almighty?", "Why does justice wait?"],
      ["24:12", "Yet God does not pay attention to folly", "Job feels God is silent about injustice."],
      ["24:24", "They are exalted a little while, then they are gone", "In the end, the wicked fall."],
    ],
    refs: [["HAB.1", "Habakkuk 1:2-4", "How long, O LORD?"], ["2PE.3", "2 Peter 3:9", "The Lord is not slow about His promise"]],
  },
  25: {
    intro: "Bildad's last speech is only six verses. Dominion and awe belong to God. Not even the moon and stars are pure in His sight, \"how much less man, that maggot.\" The friends have run out of arguments.",
    v: [
      ["25:2", "Dominion and awe belong to Him", "Bildad says true things about God, but uses them to crush Job."],
      ["25:4", "How then can a man be just with God?", "A true question with no answer from Bildad."],
      ["25:6", "How much less man, that maggot", "A low view of people."],
    ],
    bg: [["The friends fall silent", "Bildad's speech is the shortest in the book, and the third friend, Zophar, does not speak at all in this last round. The friends have run out of things to say. Job keeps talking, and then God Himself answers.", "good", ["hartley", "andersen"]]],
    refs: [["PSA.8", "Psalm 8:5", "You crowned him with glory and majesty"], ["ROM.3", "Romans 3:23-26", "God declares sinners righteous through faith"]],
  },
  26: {
    intro: "Job answers Bildad's weak comfort with a hymn to God's power. God stretches out the north over empty space and \"hangs the earth on nothing.\" He binds water in clouds, sets the horizon, and stills the sea. \"These are the fringes of His ways; how faint a word we hear of Him!\"",
    v: [
      ["26:2", "What a help you are to the weak!", "Sarcasm again."],
      ["26:7", "He hangs the earth on nothing", "A striking poetic picture of the earth in space."],
      ["26:14", "These are the fringes of His ways", "We see only the edges of God's power."],
    ],
    refs: [["PSA.104", "Psalm 104", "God's power in creation"], ["ISA.40", "Isaiah 40:22", "He sits above the circle of the earth"]],
  },
  27: {
    intro: "Job swears by God that he will hold fast his integrity and not lie. \"Till I die I will not put away my integrity from me.\" He then describes the end of the wicked, agreeing that God does judge them in the end.",
    v: [
      ["27:5-6", "Till I die I will not put away my integrity", "Job refuses to confess sins he did not commit."],
      ["27:8", "What is the hope of the godless?", "Job agrees the wicked have no lasting hope."],
    ],
    why: "Job 27:13-23 sounds like the friends' speeches, and the third round of speeches has no speech from Zophar. Scholars discuss how to read this section.",
    views: [
      ["Job is speaking", "Many read it as Job's own words: he agrees the wicked are finally judged, while denying that this explains his own suffering.", ["alden", "andersen"]],
      ["A rearranged dialogue", "Others suggest some verses originally belonged to Zophar or Bildad and that the third round was disturbed in copying, so they assign parts to the friends.", ["clines", "hartley"]],
    ],
    common: "All agree that Job holds fast his integrity and that the friends' arguments have run dry.",
    refs: [["PSA.26", "Psalm 26:1", "I have walked in my integrity"]],
  },
  28: {
    intro: "A beautiful poem asks where wisdom can be found. People dig deep mines for silver, gold and sapphires and bring hidden things to light, but they cannot find wisdom. It cannot be bought with gold. Only God knows the way to it. \"Behold, the fear of the Lord, that is wisdom; and to depart from evil is understanding.\"",
    v: [
      ["28:1-11", "Surely there is a mine for silver", "Human skill can find buried treasure."],
      ["28:12", "Where can wisdom be found?", "The poem's question."],
      ["28:23", "God understands its way", "Only God has wisdom fully."],
      ["28:28", "The fear of the Lord, that is wisdom", "The heart of biblical wisdom."],
    ],
    bg: [["Ancient mining", "Egyptian and other ancient miners dug shafts and tunnels and lowered themselves on ropes, as 28:4 describes. Copper mines at Timna in the Negev date back thousands of years.", "good", ["hartley", "walton"]]],
    refs: [["PRO.1", "Proverbs 1:7", "The fear of the LORD is the beginning of knowledge"], ["PRO.3", "Proverbs 3:13-15", "Wisdom is better than gold"], ["COL.2", "Colossians 2:3", "In Christ are hidden all the treasures of wisdom"]],
  },
  29: {
    intro: "Job remembers the old days when God watched over him and the friendship of God was over his tent. His children were around him, and people honored him at the city gate. He rescued the poor and the orphan, made the widow's heart sing, was eyes to the blind and feet to the lame, and a father to the needy.",
    v: [
      ["29:4", "When the friendship of God was over my tent", "What Job misses most."],
      ["29:12", "I delivered the poor who cried for help", "The truth about Job's life."],
      ["29:15", "I was eyes to the blind and feet to the lame", "Mercy in action."],
    ],
    refs: [["JAS.1", "James 1:27", "Visit orphans and widows"], ["MAT.25", "Matthew 25:35-40", "You did it to Me"]],
  },
  30: {
    intro: "But now the young mock him, men whose fathers he would not have trusted with his sheepdogs. They spit at him. His pain gnaws at night. He cries to God and gets no answer. \"My harp is turned to mourning, and my flute to the sound of those who weep.\"",
    v: [
      ["30:1", "Now those younger than I mock me", "A great fall in honor."],
      ["30:20", "I cry out to You for help, but You do not answer me", "Prayer that seems unheard."],
      ["30:31", "My harp is turned to mourning", "Joy has turned to grief."],
    ],
    refs: [["PSA.22", "Psalm 22:1-8", "All who see me sneer at me"], ["MAT.27", "Matthew 27:39-44", "Jesus mocked"]],
  },
  31: {
    intro: "Job takes a final oath of innocence. He has made a covenant with his eyes not to look with lust. He has not lied, committed adultery, mistreated servants, ignored the poor, trusted in gold, or rejoiced over an enemy's ruin. If he has, let punishment come. He signs his name and asks the Almighty to answer him. \"The words of Job are ended.\"",
    v: [
      ["31:1", "I have made a covenant with my eyes", "Purity starts with the eyes."],
      ["31:15", "Did not He who made me in the womb make him?", "Servants and masters are equal before God."],
      ["31:24-28", "If I have put my confidence in gold", "Job did not worship wealth."],
      ["31:35", "Here is my signature; let the Almighty answer me", "Job rests his case."],
    ],
    refs: [["MAT.5", "Matthew 5:28", "Everyone who looks at a woman with lust"], ["EPH.6", "Ephesians 6:9", "Masters, your Master is in heaven"], ["1TI.6", "1 Timothy 6:17", "Do not fix your hope on riches"]],
  },
  32: {
    intro: "The three friends stop answering. A younger man, Elihu, who has waited because of his age, becomes angry at Job for justifying himself rather than God, and at the friends for condemning Job without an answer. He says the spirit in man gives understanding, not just age, and he is bursting to speak.",
    v: [
      ["32:2", "Elihu... burned with anger", "A new voice enters."],
      ["32:8", "It is the spirit in man... that gives him understanding", "Wisdom is not only for the old."],
      ["32:19", "My belly is like unvented wine", "He cannot hold it in."],
    ],
    why: "Elihu speaks for six chapters, but God neither praises nor rebukes him at the end. Scholars discuss how to evaluate him.",
    views: [
      ["A helpful bridge", "Many see Elihu as adding real insight, that God may use suffering to teach and refine, not only to punish, and as preparing the way for God's speech.", ["alden", "hartley"]],
      ["An eager young man", "Others view him as well-meaning but long-winded, repeating much of the friends' thinking with more confidence than wisdom.", ["clines", "walton"]],
    ],
    common: "All agree Elihu stresses God's greatness and the idea that suffering can teach, and that God's own speech is the true climax.",
    refs: [["1TI.4", "1 Timothy 4:12", "Let no one look down on your youthfulness"], ["PRO.18", "Proverbs 18:13", "He who answers before he hears"]],
  },
  33: {
    intro: "Elihu speaks to Job directly. God speaks in many ways, in dreams and through pain on a sickbed, to turn people from pride and keep them from the pit. If there is an angel, a mediator, to show what is right, God is gracious and says, \"Deliver him... I have found a ransom.\"",
    v: [
      ["33:14", "God speaks once, or twice, yet no one notices it", "God is not silent."],
      ["33:19", "Man is also chastened with pain", "Suffering can be God's teacher."],
      ["33:23-24", "I have found a ransom", "Rescue through a mediator."],
    ],
    refs: [["MRK.10", "Mark 10:45", "A ransom for many"], ["PSA.119", "Psalm 119:71", "It is good for me that I was afflicted"]],
  },
  34: {
    intro: "Elihu defends God's justice. \"Far be it from God to do wickedness.\" God repays each one according to his work and shows no partiality to princes. Elihu thinks Job adds rebellion to his sin by speaking against God.",
    v: [
      ["34:10", "Far be it from God to do wickedness", "God is always just."],
      ["34:19", "Who shows no partiality to princes", "God treats rich and poor alike."],
      ["34:21", "His eyes are upon the ways of a man", "God sees everything."],
    ],
    refs: [["GEN.18", "Genesis 18:25", "Shall not the Judge of all the earth deal justly?"], ["ROM.2", "Romans 2:11", "No partiality with God"]],
  },
  35: {
    intro: "Elihu asks what Job's righteousness gives God, or his sin takes from Him. God is far above. People cry out in oppression but do not say, \"Where is God my Maker, who gives songs in the night?\"",
    v: [
      ["35:7", "What do you give to Him?", "God needs nothing from us."],
      ["35:10", "Who gives songs in the night", "God brings hope in dark times."],
      ["35:11", "Who teaches us more than the beasts of the earth", "God gives people understanding to call on Him, more than animals that only cry out."],
      ["35:13", "Surely God will not listen to an empty cry", "Elihu warns against crying out without turning to God Himself."],
    ],
    bg: [["Who is Elihu?", "Elihu is a young man who speaks after Job's three friends fall silent (chapters 32-37). Some readers see him as preparing the way for God's speeches; others think he mostly repeats the friends. God rebukes the three friends at the end (42:7) but does not mention Elihu.", "debated", ["hartley", "walton"]]],
    refs: [["PSA.42", "Psalm 42:8", "His song will be with me in the night"], ["ACT.16", "Acts 16:25", "Paul and Silas sang at midnight"]],
  },
  36: {
    intro: "Elihu speaks for God. God is mighty yet despises no one. He opens people's ears through affliction. \"Behold, God is exalted in His power; who is a teacher like Him?\" Elihu begins to describe God's power in the storm: He draws up drops of water and pours rain from the clouds.",
    v: [
      ["36:5", "God is mighty but does not despise any", "Power and kindness together."],
      ["36:15", "He delivers the afflicted by their affliction", "Suffering can open ears."],
      ["36:22", "Who is a teacher like Him?", "God teaches through all things."],
      ["36:26", "God is exalted, and we do not know Him", "Beyond our understanding."],
    ],
    refs: [["HEB.12", "Hebrews 12:10-11", "Discipline yields the fruit of righteousness"], ["2CO.4", "2 Corinthians 4:17", "Light affliction producing glory"]],
  },
  37: {
    intro: "A thunderstorm seems to build as Elihu speaks. God thunders with His majestic voice; He commands snow, rain, ice and lightning. \"Listen to this, O Job, stand and consider the wonders of God.\" Out of the north comes golden splendor; around God is awesome majesty.",
    v: [
      ["37:5", "God thunders with His voice wondrously", "Creation shows God's greatness."],
      ["37:14", "Stand and consider the wonders of God", "Stop and look."],
      ["37:22", "Around God is awesome majesty", "Setting the stage for God to speak."],
    ],
    refs: [["PSA.29", "Psalm 29", "The voice of the LORD is upon the waters"], ["PSA.147", "Psalm 147:16-18", "He gives snow like wool"]],
  },
  38: {
    intro: "Then the LORD answers Job out of the whirlwind. \"Where were you when I laid the foundation of the earth?\" God asks Job question after question about creation: the sea's limits, the morning, the storehouses of snow, the stars, the rain, and the lions and ravens He feeds. God does not explain Job's suffering, but He shows Himself.",
    v: [
      ["38:1", "The LORD answered Job out of the whirlwind", "God comes to Job at last."],
      ["38:4", "Where were you when I laid the foundation of the earth?", "Job sees his place."],
      ["38:7", "When the morning stars sang together", "Creation was a joyful event."],
      ["38:31", "Can you bind the chains of the Pleiades?", "God rules the stars."],
      ["38:41", "Who prepares for the raven its nourishment?", "God cares for wild creatures."],
    ],
    bg: [["God's answer", "God does not tell Job about the heavenly scene in chapters 1-2. Instead He shows Job His wisdom and care over a vast world Job cannot control or understand. Many readers find that meeting God Himself is the answer Job needed.", "good", ["walton", "andersen"]]],
    refs: [["PSA.104", "Psalm 104", "God's wisdom in creation"], ["ISA.40", "Isaiah 40:12-14", "Who has measured the waters?"], ["MAT.6", "Matthew 6:26", "Look at the birds of the air"]],
  },
  39: {
    intro: "God continues with wild animals: the mountain goats giving birth, the wild donkey, the wild ox, the ostrich who leaves her eggs yet outruns a horse, the war horse that laughs at fear, and the hawk and eagle. Each lives by God's design, not Job's.",
    v: [
      ["39:1", "Do you know the time the mountain goats give birth?", "God knows what we never see."],
      ["39:13-18", "The ostriches' wings flap joyously", "God even made creatures that seem odd."],
      ["39:19-25", "Do you give the horse his might?", "The war horse's courage."],
      ["39:27", "Is it at your command that the eagle mounts up?", "God's design, not ours."],
    ],
    refs: [["PSA.50", "Psalm 50:10-11", "Every beast of the forest is Mine"], ["ISA.40", "Isaiah 40:31", "Mount up with wings like eagles"]],
  },
  40: {
    intro: "God asks whether the faultfinder will contend with the Almighty. Job answers, \"Behold, I am insignificant... I lay my hand on my mouth.\" God speaks again from the storm: \"Will you condemn Me that you may be justified?\" He describes Behemoth, a huge beast that eats grass like an ox, \"the first of the ways of God.\"",
    v: [
      ["40:4", "I lay my hand on my mouth", "Job falls silent."],
      ["40:8", "Will you condemn Me that you may be justified?", "Job need not accuse God to defend himself."],
      ["40:15", "Behold now, Behemoth", "A mighty creature only God can master."],
    ],
    why: "Scholars discuss what Behemoth (chapter 40) and Leviathan (chapter 41) were.",
    views: [
      ["Real animals described in poetry", "Many identify Behemoth with the hippopotamus or elephant and Leviathan with the crocodile, described in grand poetic language.", ["alden", "hartley"]],
      ["Symbols of chaos", "Others see them as symbols of chaos and evil, drawn from ancient imagery, showing that only God can master the forces Job fears; Leviathan also appears in Isaiah 27:1 as a sea monster.", ["walton", "clines"]],
    ],
    common: "All agree the point is that these creatures are far beyond human control, yet God made them and rules them.",
    refs: [["ISA.27", "Isaiah 27:1", "Leviathan the fleeing serpent"], ["ROM.9", "Romans 9:20", "Who are you to answer back to God?"]],
  },
  41: {
    intro: "God describes Leviathan, a fierce creature no one can catch with a hook or tame as a pet. His scales are like shields, sparks leap from his mouth, and he laughs at spears. \"Nothing on earth is like him.\" If no one dares stir up Leviathan, who can stand before God?",
    v: [
      ["41:1", "Can you draw out Leviathan with a fishhook?", "Humans cannot control it."],
      ["41:10-11", "Who then is he that can stand before Me?", "The point: God is greater."],
      ["41:11", "Whatever is under the whole heaven is Mine", "Paul echoes this in Romans 11:35."],
    ],
    refs: [["PSA.104", "Psalm 104:26", "Leviathan, which You have formed to sport in it"], ["ROM.11", "Romans 11:35-36", "Who has first given to Him?"]],
  },
  42: {
    intro: "Job answers, \"I know that You can do all things... I have heard of You by the hearing of the ear, but now my eye sees You; therefore I retract, and I repent in dust and ashes.\" God tells the friends they have not spoken of Him what is right, as Job has, and Job prays for them. God restores Job's fortunes twice over, gives him seven sons and three beautiful daughters, and Job lives 140 more years.",
    v: [
      ["42:2", "I know that You can do all things", "Trust restored."],
      ["42:5", "Now my eye sees You", "Meeting God changed everything."],
      ["42:7", "You have not spoken of Me what is right, as My servant Job has", "God honors Job's honesty over the friends' theories."],
      ["42:10", "When he prayed for his friends", "Restoration came as Job forgave."],
      ["42:15", "Their father gave them inheritance among their brothers", "Unusual honor for daughters."],
    ],
    w: [["נִחַם", "nicham", "H5162", "to repent, to be comforted", "The word in 42:6 can mean to change one's mind or to be comforted. Job is not confessing the sins the friends accused him of, but turning from his demand that God answer him on his terms.", ["halot", "hartley"]]],
    refs: [["JAS.5", "James 5:11", "The Lord is full of compassion and mercy"], ["MAT.5", "Matthew 5:44", "Pray for those who persecute you"], ["ISA.6", "Isaiah 6:5", "My eyes have seen the King"]],
  },
});
