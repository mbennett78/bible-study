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
      ["1:9", "Does Job fear God for nothing?", "Satan's question is the one the whole book tests: does anyone love God for Himself, or only for what God gives?"],
      ["1:12", "Only do not put forth your hand on him", "The Accuser works only within God's limits."],
      ["1:21", "The LORD gave and the LORD has taken away", "Job has just lost his children and everything he owned, and he falls down and worships. He blesses God's name in the worst moment of his life."],
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
      ["2:6", "Only spare his life", "Satan can go only as far as God allows. Even in Job's suffering, God sets the limit."],
      ["2:9", "Curse God and die", "Job's wife has lost all ten children too. Her bitter words come out of her own deep grief."],
      ["2:10", "In all this Job did not sin with his lips", "Twice tested, Job still does not sin with his words. His faith bends but holds."],
      ["2:13", "No one spoke a word to him", "The friends' best moment was their silent presence."],
    ],
    bg: [["Seven days of silence", "Job's three friends came from far away, tore their robes and sat with him on the ground seven days and seven nights without a word, \"for they saw that his pain was very great\" (2:13). Sitting in silence with someone who grieves is still a Jewish mourning custom. Many readers think this was the best thing the friends did.", "good", ["hartley", "andersen"]]],
    refs: [["ROM.12", "Romans 12:15", "Weep with those who weep"], ["2CO.12", "2 Corinthians 12:7-9", "Paul's thorn in the flesh"]],
  },
  3: {
    intro: "Job finally speaks and curses the day he was born. He wishes he had died at birth, where the weary are at rest. Why is light given to one in misery? \"What I fear comes upon me... I am not at ease, nor am I quiet, and I am not at rest, but turmoil comes.\"",
    v: [
      ["3:1", "Job cursed the day of his birth", "After seven days of silence Job speaks. He curses the day he was born, but he never curses God."],
      ["3:11", "Why did I not die at birth?", "Job wishes he had never lived. The Bible makes room for honest lament like this (see also Jeremiah 20:14-18)."],
      ["3:20", "Why is light given to him who suffers?", "Why give life to someone whose life is only misery? Job's great \"why\" questions begin here."],
      ["3:26", "I am not at rest, but turmoil comes", "No ease, no quiet, no rest: Job's grief brings him no relief at all."],
    ],
    bg: [["Poetry begins", "From 3:2 to 42:6 the book is written in Hebrew poetry, framed by a prose story at the start and end. Job's poetry has many rare words, and scholars count it among the most difficult and beautiful Hebrew in the Bible.", "good", ["hartley", "clines"]]],
    refs: [["JER.20", "Jeremiah 20:14-18", "Jeremiah curses his birth"], ["PSA.88", "Psalm 88", "A lament with no easy answer"]],
  },
  4: {
    intro: "Eliphaz speaks first, politely at first. Job has strengthened others, but now he is troubled. \"Who ever perished being innocent?\" Those who plow trouble reap it. Eliphaz describes a spirit that passed before his face in the night, asking whether any mortal can be right before God.",
    v: [
      ["4:3-5", "You have strengthened weak hands", "Eliphaz starts kindly, reminding Job how he once comforted others. But his kind words soon lead to blame."],
      ["4:7", "Who ever perished being innocent?", "Eliphaz assumes that innocent people never suffer, so Job's suffering must prove that he sinned."],
      ["4:8", "Those who sow trouble harvest it", "As a general rule people reap what they sow (Galatians 6:7). Eliphaz is wrong to apply it to Job."],
      ["4:17", "Can mankind be just before God?", "No one is pure before God; that much is true. Eliphaz uses a true point to make a wrong charge."],
    ],
    bg: [["The friends' mistake", "The three friends hold a strict view of retribution: God always rewards the good and punishes the wicked in this life, so great suffering means great sin. The opening chapters have already shown the reader that this does not explain Job.", "good", ["walton", "hartley"]]],
    refs: [["JHN.9", "John 9:1-3", "Who sinned, this man or his parents?"], ["LUK.13", "Luke 13:1-5", "Do you suppose they were worse sinners?"]],
  },
  5: {
    intro: "Eliphaz continues: man is born for trouble as sparks fly upward. If he were Job, he would seek God. \"Blessed is the man whom God reproves, so do not despise the discipline of the Almighty.\" God wounds and binds up. Eliphaz promises that if Job accepts correction, he will be safe and prosper.",
    v: [
      ["5:7", "Man is born for trouble, as sparks fly upward", "Sparks fly up from a fire as surely as trouble comes in life. Eliphaz is right that trouble is part of every human life."],
      ["5:13", "He captures the wise by their own shrewdness", "Paul quotes this verse in 1 Corinthians 3:19."],
      ["5:17", "Blessed is the man whom God reproves", "True in its place, but Job is not being disciplined for sin."],
    ],
    bg: [["Job quoted in the New Testament", "Eliphaz says God \"catches the wise in their own craftiness\" (5:13). Paul quotes these words in 1 Corinthians 3:19, the only direct quotation of Job in the New Testament. A speaker can say true things and still apply them wrongly, as Eliphaz did to Job.", "strong", ["hartley", "alden"]]],
    refs: [["1CO.3", "1 Corinthians 3:19", "Paul quotes Eliphaz"], ["HEB.12", "Hebrews 12:5-11", "God disciplines those He loves"], ["PRO.3", "Proverbs 3:11-12", "Do not reject the discipline of the LORD"]],
  },
  6: {
    intro: "Job answers that his grief, if weighed, would be heavier than the sand of the seas. He longs for God to crush him. His friends are like a desert stream that dries up when travelers need it most. \"Teach me, and I will be silent; show me how I have erred.\"",
    v: [
      ["6:2", "Oh that my grief were actually weighed", "Job wishes his grief could be weighed on scales. It would be heavier than all the sand of the sea (6:3)."],
      ["6:10", "I have not denied the words of the Holy One", "Job's one comfort is that he has not denied the words of the Holy One. He has stayed faithful."],
      ["6:14", "For the despairing man there should be kindness from his friend", "What a suffering person needs most from a friend is kindness, not a lecture."],
      ["6:24", "Show me how I have erred", "Job asks his friends to show him plainly where he went wrong. He wants evidence, not accusations."],
    ],
    bg: [["Streams that dry up", "Job compares his friends to desert streams (wadis) that rush with water in winter but vanish in the summer heat, just when travelers need them (6:15-20). \"For the despairing man there should be kindness from his friend\" (6:14).", "good", ["andersen", "hartley"]]],
    refs: [["PRO.17", "Proverbs 17:17", "A friend loves at all times"], ["GAL.6", "Galatians 6:2", "Bear one another's burdens"]],
  },
  7: {
    intro: "Job describes life as hard service, months of emptiness and nights of misery. His days are swifter than a weaver's shuttle. Then he turns to God directly: \"What is man that You magnify him... that You examine him every morning?\" Why not pardon him and leave him alone?",
    v: [
      ["7:6", "Swifter than a weaver's shuttle", "A weaver's shuttle flies back and forth across the loom. Job feels his days rushing past just as fast."],
      ["7:11", "I will not restrain my mouth", "Job will not hold back. He pours out his anguish to God honestly, which is itself a kind of faith."],
      ["7:17", "What is man that You magnify him?", "Psalm 8:4 marvels that God cares for man. Job turns the same words into a complaint: why won't God leave him alone?"],
    ],
    bg: [["Psalm 8 turned upside down", "\"What is man that You magnify him, that You are concerned about him?\" (7:17). Psalm 8:4 asks almost the same question in wonder. Job asks it in pain: why does God pay such close attention to a man He seems to be crushing?", "good", ["clines", "hartley"]]],
    refs: [["PSA.8", "Psalm 8:4", "What is man that You take thought of him?"], ["PSA.39", "Psalm 39:4-5", "Let me know how transient I am"]],
  },
  8: {
    intro: "Bildad speaks more bluntly: does God pervert justice? Job's children must have sinned and been punished. If Job seeks God and is pure, God will restore him. Ask the former generations: those who forget God are like papyrus without water or a spider's web.",
    v: [
      ["8:3", "Does God pervert justice?", "Bildad defends God's justice, but Job never said God is unjust. Bildad answers a charge Job did not make."],
      ["8:4", "If your sons sinned against Him", "A cruel thing to say to a grieving father."],
      ["8:8", "Please inquire of past generations", "Bildad leans on what the older generations taught. Tradition is good, but here it is used as a weapon against a hurting man."],
    ],
    bg: [["Bildad's appeal to tradition", "Bildad tells Job to ask the former generations (8:8). His rule is simple: God never rejects the blameless or helps the wicked (8:20). The book of Job shows that this rule, though often true, cannot explain every suffering.", "good", ["andersen", "walton"]]],
    refs: [["PSA.1", "Psalm 1", "Like a tree by water"], ["MAT.7", "Matthew 7:1-2", "Do not judge"]],
  },
  9: {
    intro: "Job agrees that God is just, but asks how a man can be right with God. God is all-powerful; He moves mountains, made the Bear, Orion and the Pleiades. If Job argued his case, God could crush him. \"There is no umpire between us, who may lay his hand upon us both.\"",
    v: [
      ["9:2", "How can a man be in the right before God?", "How can anyone be in the right before a holy God? It is the deepest question in the book, finally answered in the gospel (Romans 3:21-26)."],
      ["9:9", "The Bear, Orion and the Pleiades", "The Bear, Orion and the Pleiades are star groups people still see in the night sky. God made and arranged them all (Amos 5:8)."],
      ["9:33", "There is no umpire between us", "Job longs for someone to stand between God and man."],
    ],
    w: [["מוֹכִיחַ", "mokiach", "H3198", "arbiter, umpire", "Someone who decides between two sides and can reach out to both. Job's wish for such a person points toward a mediator.", ["halot", "andersen"]]],
    refs: [["1TI.2", "1 Timothy 2:5", "One mediator between God and men"], ["AMO.5", "Amos 5:8", "He who made the Pleiades and Orion"]],
  },
  10: {
    intro: "Job pleads with God: \"Do not condemn me; let me know why You contend with me.\" God's own hands shaped him like clay, clothed him with skin, knit him with bones. Why make him only to destroy him? Job asks for a little relief before he goes to the land of darkness.",
    v: [
      ["10:2", "Let me know why You contend with me", "Job begs God to tell him why He is against him. He wants to understand, not just to be relieved."],
      ["10:8", "Your hands fashioned and made me altogether", "God's own hands shaped Job in the womb. Surely, Job pleads, God will not destroy what He made with such care."],
      ["10:12", "Your care has preserved my spirit", "Even in protest, Job remembers God's kindness."],
    ],
    bg: [["Knit together by God", "\"Your hands fashioned and made me altogether... You clothed me with skin and flesh, and knit me together with bones and sinews\" (10:8-11). Like Psalm 139:13, Job pictures God carefully forming a child in the womb. Job cannot understand why the God who made him so carefully would now destroy him.", "good", ["hartley", "clines"]]],
    refs: [["PSA.139", "Psalm 139:13-16", "You wove me in my mother's womb"], ["ISA.64", "Isaiah 64:8", "We are the clay, You our potter"]],
  },
  11: {
    intro: "Zophar is the harshest. Job's talk must not go unanswered; God is punishing him less than he deserves. Can Job find out the deep things of God? If Job directs his heart and puts away sin, his life will become brighter than noonday.",
    v: [
      ["11:6", "God forgets a part of your iniquity", "Zophar says Job deserves even worse than he got. It is the harshest thing any of the friends has said."],
      ["11:7", "Can you discover the depths of God?", "No one can find out the depths of God. That is true, but it humbles Zophar's confident answers too."],
      ["11:13-15", "If you would direct your heart right", "Zophar's advice to turn back to God sounds good, but it assumes Job is guilty."],
    ],
    bg: [["The harshest friend", "Zophar speaks most bluntly of the three: \"Know then that God forgets a part of your iniquity\" (11:6), meaning Job deserves even worse. The reader knows from chapters 1 and 2 that Zophar is wrong about the cause of Job's suffering.", "good", ["andersen", "alden"]]],
    refs: [["ROM.11", "Romans 11:33", "How unsearchable are His judgments"], ["ISA.55", "Isaiah 55:8-9", "My ways are higher than your ways"]],
  },
  12: {
    intro: "Job answers with sarcasm: \"Truly then you are the people, and with you wisdom will die!\" He knows these things as well as they do. Ask the animals: they know the LORD has done this. Wisdom and power belong to God, who overturns kings and priests.",
    v: [
      ["12:2", "With you wisdom will die", "Job mocks his friends: \"No doubt you are the people, and wisdom will die with you!\" They are far too sure of themselves."],
      ["12:9-10", "In whose hand is the life of every living thing", "The life of every creature and the breath of every person is in God's hand. Job knows that as well as they do."],
      ["12:13", "With Him are wisdom and might", "Job agrees God is in control, which is the problem."],
    ],
    bg: [["Job's sarcasm", "\"Truly then you are the people, and with you wisdom will die!\" (12:2). Job answers his friends' lectures with biting humor. He knows the same truths they know (12:3) but insists they do not fit his case.", "good", ["clines", "hartley"]]],
    refs: [["DAN.2", "Daniel 2:21", "He removes kings and establishes kings"], ["ACT.17", "Acts 17:25", "He gives to all people life and breath"]],
  },
  13: {
    intro: "Job tells his friends they are worthless physicians, smearing lies. He wants to argue with God Himself. \"Though He slay me, I will hope in Him.\" He asks God to remove His hand and answer him: how many are his sins?",
    v: [
      ["13:4", "You are all worthless physicians", "Job calls his friends worthless doctors who smear on lies. Their cure is worse than the disease."],
      ["13:5", "O that you would be completely silent", "Job tells them that if they would only be silent, that would be their wisdom. They were at their best in the first seven days (2:13)."],
      ["13:15", "Though He slay me, I will hope in Him", "One of the Bible's great sayings of faith."],
      ["13:23", "How many are my iniquities?", "Job asks God to show him his sins and his wrongs. He wants a fair hearing and a clear charge."],
    ],
    w: [["יָחַל", "yachal", "H3176", "to wait, to hope", "The word means to wait with expectation. In 13:15 the Hebrew text can be read \"I will hope in Him\" or \"I have no hope\"; most translations follow the Jewish scribes' reading, \"I will hope in Him.\"", ["halot", "hartley"]]],
    refs: [["PSA.62", "Psalm 62:5", "My hope is from Him"], ["HAB.3", "Habakkuk 3:17-18", "Though the fig tree should not blossom"]],
  },
  14: {
    intro: "Man, born of woman, is short-lived and full of trouble. A tree cut down may sprout again, but a man dies and lies still. \"If a man dies, will he live again?\" Job longs for God to hide him in the grave until His anger passes and then remember him.",
    v: [
      ["14:1", "Man, who is born of woman, is short-lived", "Man born of woman lives a short life full of trouble. Job's words are still read at many funerals."],
      ["14:7", "There is hope for a tree", "When a tree is cut down, its stump can sprout again. Job wonders whether a person has any such hope."],
      ["14:14", "If a man dies, will he live again?", "\"If a man dies, will he live again?\" Job asks the question that only Jesus' resurrection fully answers (John 11:25)."],
      ["14:15", "You will long for the work of Your hands", "For a moment Job pictures God calling him back from death and longing for the work of His hands. Hope flashes through."],
    ],
    bg: [["Will he live again?", "A cut-down tree can sprout again, but \"if a man dies, will he live again?\" (14:7, 14). Job asks the question without a clear answer, yet he longs for God to hide him in the grave until His anger passes and then call him back (14:13-15). Many readers see here a growing hope that later finds its answer in resurrection.", "strong", ["hartley", "andersen"]]],
    refs: [["1CO.15", "1 Corinthians 15:20-22", "In Christ all will be made alive"], ["JHN.11", "John 11:25", "I am the resurrection and the life"]],
  },
  15: {
    intro: "Eliphaz's second speech is sharper. Job's own words condemn him; he is undermining reverence for God. Were you the first man born? The wicked writhe in pain all their days and will not escape darkness.",
    v: [
      ["15:4", "You do away with reverence", "Eliphaz thinks Job's honesty is dangerous."],
      ["15:7", "Were you the first man to be born?", "Eliphaz mocks Job: was he born before the hills, that he thinks he knows so much?"],
      ["15:11", "Are the consolations of God too small for you?", "Eliphaz thinks his own words were God's comfort, and Job has refused them."],
      ["15:20", "The wicked man writhes in pain", "Again suffering is linked to wickedness."],
    ],
    bg: [["The friends grow harsher", "In the second round of speeches (chapters 15-21), the friends stop offering Job hope and simply describe the fate of the wicked, hinting that it describes him. God later says they \"have not spoken of Me what is right\" (42:7).", "good", ["hartley", "alden"]]],
    refs: [["JOB.42", "Job 42:7", "God corrects the friends"], ["PSA.73", "Psalm 73", "Why do the wicked prosper?"]],
  },
  16: {
    intro: "\"Sorry comforters are you all.\" Job says he too could talk as they do if they were in his place. He describes God as attacking him. Yet in the middle of it he says, \"Even now, behold, my witness is in heaven, and my advocate is on high.\"",
    v: [
      ["16:2", "Sorry comforters are you all", "\"Miserable comforters are you all!\" Their speeches only add to Job's pain."],
      ["16:5", "I could strengthen you with my mouth", "If they were the ones suffering, Job says, he would strengthen them with his words. He describes what real comfort looks like."],
      ["16:19", "My witness is in heaven", "Job believes someone in heaven will speak for him."],
      ["16:21", "O that a man might plead with God", "Again Job longs for someone to plead his case with God, the way a person pleads for a friend. Christians see this longing met in Christ (1 Timothy 2:5)."],
    ],
    bg: [["A witness in heaven", "\"Even now, behold, my witness is in heaven, and my advocate is on high\" (16:19). Readers differ on whom Job had in mind: God Himself, an angel or a heavenly go-between. Christians have often heard in it a longing fulfilled in Christ, \"an Advocate with the Father\" (1 John 2:1).", "good", ["hartley", "walton", "clines"]]],
    refs: [["1JN.2", "1 John 2:1", "We have an Advocate with the Father"], ["HEB.7", "Hebrews 7:25", "He always lives to make intercession"]],
  },
  17: {
    intro: "Job's spirit is broken; the grave is ready for him. He asks God to put up a pledge for him, since no one else will. Mockers surround him. \"Where now is my hope? And who regards my hope?\"",
    v: [
      ["17:3", "Lay down, now, a pledge for me with Yourself", "Job asks God Himself to put down the pledge that guarantees him, because no one else will stand up for him."],
      ["17:6", "He has made me a byword of the people", "Job has become the one everyone talks about, a warning tale."],
      ["17:9", "The righteous will hold to his way", "Even now Job holds on: the righteous will keep to their way. He will not give up his integrity."],
      ["17:15", "Where now is my hope?", "\"Where now is my hope?\" Job feels the darkness of death closing in around him."],
    ],
    bg: [["A pledge only God can give", "To \"strike hands\" was to stand as guarantor for someone's debt (Proverbs 6:1). Job has no one to stand for him, so he asks God to be his guarantor with God. The New Testament calls Jesus \"the guarantee of a better covenant\" (Hebrews 7:22).", "good", ["hartley", "andersen"]]],
    refs: [["HEB.7", "Hebrews 7:22", "Jesus, our guarantee"], ["PSA.42", "Psalm 42:5", "Why are you in despair, O my soul?"]],
  },
  18: {
    intro: "Bildad's second speech describes the fate of the wicked in vivid pictures: his light goes out, his steps are caught in a trap, terrors frighten him, disease eats his skin, and his memory perishes from the earth. The description is clearly aimed at Job.",
    v: [
      ["18:5", "The light of the wicked goes out", "Bildad pictures the wicked man's lamp going out in his tent: total ruin, with no light left."],
      ["18:13", "His skin is devoured by disease", "Bildad describes the wicked man's skin eaten away by disease. With Job sitting covered in sores, the point is cruel."],
      ["18:17", "Memory of him perishes", "Bildad says the wicked man's name will be forgotten. Having lost his children, Job now hears his legacy attacked too."],
    ],
    bg: [["The king of terrors", "Bildad's second speech paints the end of the wicked: trapped, uprooted, forgotten, marched off \"to the king of terrors\" (18:14). The phrase pictures death as a ruler. Bildad means it as a warning to Job.", "good", ["hartley", "alden"]]],
    refs: [["PRO.13", "Proverbs 13:9", "The lamp of the wicked goes out"]],
  },
  19: {
    intro: "Job asks how long they will torment him. God has walled up his way; his family and friends have turned away; even his breath is strange to his wife. \"Have pity on me, O you my friends.\" Then he rises to his greatest statement of faith: \"I know that my Redeemer lives, and at the last He will take His stand on the earth... yet from my flesh I shall see God.\"",
    v: [
      ["19:14", "My relatives have failed", "Job's relatives and close friends have failed him. Even his servants treat him as a stranger (19:15-16)."],
      ["19:21", "Pity me, pity me, O you my friends", "\"Have pity on me, O you my friends.\" Job begs for compassion instead of blame."],
      ["19:25", "I know that my Redeemer lives", "\"I know that my Redeemer lives.\" A redeemer was a close relative who stood up for a family member in need. In his darkest hour Job's faith shines brightest."],
      ["19:26-27", "From my flesh I shall see God", "Job is sure that even after his skin is destroyed he will see God with his own eyes. It is one of the clearest Old Testament hopes of life beyond death."],
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
      ["20:2", "My disquieting thoughts make me respond", "Zophar says his troubled thoughts force him to answer. He speaks out of hurt pride (20:3)."],
      ["20:5", "The triumphing of the wicked is short", "The joy of the wicked is short-lived. It is often true, but Zophar turns it into a charge against Job."],
      ["20:15", "He swallows riches, but will vomit them up", "Riches gained by wrong are like food swallowed and then vomited up. Ill-gotten gain does not last."],
      ["20:29", "This is the wicked man's portion from God", "Zophar's last word: this is the portion God gives the wicked. He never speaks again in the book."],
    ],
    bg: [["Zophar's last word", "This is Zophar's final speech; he does not speak in the third round. What he says is often true in general, as the Psalms and Proverbs agree, but he is wrong to apply it to Job. Job answers in chapter 21 that the wicked often do prosper.", "good", ["hartley", "andersen"]]],
    refs: [["JOB.21", "Job 21:7", "Why do the wicked still live?"], ["PSA.37", "Psalm 37:1-2", "Do not fret because of evildoers"]],
  },
  21: {
    intro: "Job challenges the friends' main idea directly. Look around: the wicked often live long, grow rich, see their children prosper, and die in peace. One man dies healthy and another bitter, and both lie in the dust. \"How then will you vainly comfort me?\"",
    v: [
      ["21:7", "Why do the wicked still live?", "Why do the wicked live on, grow old and become powerful? Job points out that real life does not fit his friends' neat theory."],
      ["21:23-26", "One dies in his full strength... another dies with a bitter soul", "One man dies healthy and at ease, another dies bitter, never having tasted good. Both lie down in the dust alike."],
      ["21:34", "Your answers remain full of falsehood", "Job tells them their comfort is empty and their answers are false. Their theory does not match the facts."],
    ],
    bg: [["Why do the wicked prosper?", "Job challenges his friends with what everyone can see: many wicked people live long, grow rich and die in peace (21:7-13). Psalm 73 and Jeremiah 12:1 ask the same question. Scripture does not hide the problem.", "good", ["andersen", "clines"]]],
    refs: [["PSA.73", "Psalm 73:3-17", "I saw the prosperity of the wicked"], ["JER.12", "Jeremiah 12:1", "Why has the way of the wicked prospered?"], ["ECC.9", "Ecclesiastes 9:2-3", "One fate for all"]],
  },
  22: {
    intro: "Eliphaz now accuses Job of specific sins he has no evidence for: taking pledges from the poor, stripping the naked, refusing water to the thirsty and bread to the hungry, and sending widows away empty. He urges Job to return to the Almighty, and then God will hear his prayers.",
    v: [
      ["22:5", "Is not your wickedness great?", "Eliphaz now accuses Job of great wickedness and lists sins Job never committed (22:6-9). It is accusation without proof."],
      ["22:6-9", "You have stripped the naked of their clothing", "Every charge is false, as chapter 29 shows."],
      ["22:21", "Yield now and be at peace with Him", "\"Yield now and be at peace with Him.\" These are good words, but aimed at the wrong man."],
    ],
    bg: [["Accused of sins he never did", "Eliphaz finally accuses Job of specific wrongs: taking pledges unfairly, refusing water to the thirsty, sending widows away empty (22:6-9). Job's own record in chapters 29 and 31 shows the opposite. Eliphaz's theology had led him to invent sins to explain the suffering.", "good", ["hartley", "andersen"]]],
    refs: [["JOB.29", "Job 29:12-17", "Job's true record"], ["JOB.42", "Job 42:7", "God says the friends were wrong"]],
  },
  23: {
    intro: "Job longs to find God and lay his case before Him. He goes forward and back, left and right, but cannot find Him. \"But He knows the way I take; when He has tried me, I shall come forth as gold.\" He has treasured God's words more than his daily food.",
    v: [
      ["23:3", "Oh that I knew where I might find Him", "\"Oh that I knew where I might find Him!\" Job feels God's absence, yet he keeps looking for Him."],
      ["23:10", "When He has tried me, I shall come forth as gold", "Job cannot see God, but he trusts that God knows his way. When the testing is over, he will come out like refined gold (1 Peter 1:7)."],
      ["23:12", "I have treasured the words of His mouth more than my necessary food", "Job has treasured God's words more than his daily food. His love for God's word has not wavered."],
    ],
    bg: [["Coming forth as gold", "\"He knows the way I take; when He has tried me, I shall come forth as gold\" (23:10). Even while Job cannot find God (23:8-9), he trusts that God knows him. Gold was refined by fire to remove its impurities (compare 1 Peter 1:7).", "good", ["alden", "hartley"]]],
    refs: [["1PE.1", "1 Peter 1:6-7", "Faith more precious than gold tested by fire"], ["PSA.119", "Psalm 119:103", "How sweet are Your words"]],
  },
  24: {
    intro: "Why does God not set times for judgment? Job describes the cruelty of the powerful: moving boundary stones, stealing flocks, pushing the poor aside, so that the poor shiver without clothing and the dying groan in the city. Yet God seems not to notice. In the end the wicked are cut off like heads of grain.",
    v: [
      ["24:1", "Why are times not stored up by the Almighty?", "Why doesn't God set times for judgment that the faithful can see? Job asks why justice seems to wait."],
      ["24:12", "Yet God does not pay attention to folly", "Job feels God is silent about injustice."],
      ["24:24", "They are exalted a little while, then they are gone", "The wicked are lifted up for a little while, and then they are gone. In the end they fall like heads of grain cut at harvest."],
    ],
    bg: [["The cry of the poor", "Job describes the poor driven off the road, gleaning in the fields of the wicked, cold and hungry while harvesting for others (24:4-11). \"Yet God does not pay attention to folly\" (24:12). His honesty about injustice is part of what makes the book true to life.", "good", ["clines", "hartley"]]],
    refs: [["HAB.1", "Habakkuk 1:2-4", "How long, O LORD?"], ["2PE.3", "2 Peter 3:9", "The Lord is not slow about His promise"]],
  },
  25: {
    intro: "Bildad's last speech is only six verses. Dominion and awe belong to God. Not even the moon and stars are pure in His sight, \"how much less man, that maggot.\" The friends have run out of arguments.",
    v: [
      ["25:2", "Dominion and awe belong to Him", "Bildad says true things about God, but uses them to crush Job."],
      ["25:4", "How then can a man be just with God?", "A true question with no answer from Bildad."],
      ["25:6", "How much less man, that maggot", "Bildad's short last speech calls man a maggot and a worm. It is a true picture of human weakness but leaves out God's love."],
    ],
    bg: [["The friends fall silent", "Bildad's speech is the shortest in the book, and the third friend, Zophar, does not speak at all in this last round. The friends have run out of things to say. Job keeps talking, and then God Himself answers.", "good", ["hartley", "andersen"]]],
    refs: [["PSA.8", "Psalm 8:5", "You crowned him with glory and majesty"], ["ROM.3", "Romans 3:23-26", "God declares sinners righteous through faith"]],
  },
  26: {
    intro: "Job answers Bildad's weak comfort with a hymn to God's power. God stretches out the north over empty space and \"hangs the earth on nothing.\" He binds water in clouds, sets the horizon, and stills the sea. \"These are the fringes of His ways; how faint a word we hear of Him!\"",
    v: [
      ["26:2", "What a help you are to the weak!", "\"What a help you are to the weak!\" Job answers Bildad with sarcasm again."],
      ["26:7", "He hangs the earth on nothing", "A striking poetic picture of the earth in space."],
      ["26:14", "These are the fringes of His ways", "All the wonders of creation are only the edges of God's ways, a whisper of His power. We see just a little of Him."],
    ],
    bg: [["He hangs the earth on nothing", "\"He stretches out the north over empty space and hangs the earth on nothing\" (26:7). Some readers see an insight ahead of its time; others read it as poetry about God's power, since the same book speaks of the pillars of the earth (9:6). All agree on Job's point: these are only \"the fringes of His ways\" (26:14).", "good", ["walton", "hartley"]]],
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
    bg: [["I will hold fast my integrity", "Job swears an oath: \"Till I die I will not put away my integrity from me\" (27:5). He will not confess sins he did not commit just to satisfy his friends. God had said the same of him in 2:3.", "good", ["hartley", "andersen"]]],
    refs: [["PSA.26", "Psalm 26:1", "I have walked in my integrity"]],
  },
  28: {
    intro: "A beautiful poem asks where wisdom can be found. People dig deep mines for silver, gold and sapphires and bring hidden things to light, but they cannot find wisdom. It cannot be bought with gold. Only God knows the way to it. \"Behold, the fear of the Lord, that is wisdom; and to depart from evil is understanding.\"",
    v: [
      ["28:1-11", "Surely there is a mine for silver", "People dig deep mines for silver and gold and find treasure in the dark. Human skill can bring hidden riches to light."],
      ["28:12", "Where can wisdom be found?", "But where can wisdom be found? That is the question of this whole poem. No mine can dig it up."],
      ["28:23", "God understands its way", "Only God knows the way to wisdom and where it lives. He alone has wisdom fully."],
      ["28:28", "The fear of the Lord, that is wisdom", "\"The fear of the Lord, that is wisdom; and to depart from evil is understanding.\" The heart of biblical wisdom (Proverbs 9:10)."],
    ],
    bg: [["Ancient mining", "Egyptian and other ancient miners dug shafts and tunnels and lowered themselves on ropes, as 28:4 describes. Copper mines at Timna in the Negev date back thousands of years.", "good", ["hartley", "walton"]]],
    refs: [["PRO.1", "Proverbs 1:7", "The fear of the LORD is the beginning of knowledge"], ["PRO.3", "Proverbs 3:13-15", "Wisdom is better than gold"], ["COL.2", "Colossians 2:3", "In Christ are hidden all the treasures of wisdom"]],
  },
  29: {
    intro: "Job remembers the old days when God watched over him and the friendship of God was over his tent. His children were around him, and people honored him at the city gate. He rescued the poor and the orphan, made the widow's heart sing, was eyes to the blind and feet to the lame, and a father to the needy.",
    v: [
      ["29:4", "When the friendship of God was over my tent", "Job remembers when God's friendship was over his tent. What he misses most is not his wealth but God's closeness."],
      ["29:12", "I delivered the poor who cried for help", "Job rescued the poor and the orphan. This is the truth about his life, against Eliphaz's false charges (22:6-9)."],
      ["29:15", "I was eyes to the blind and feet to the lame", "\"I was eyes to the blind and feet to the lame.\" Job's goodness was mercy put into action."],
    ],
    bg: [["Eyes to the blind", "Job remembers when he sat at the city gate, where elders judged cases, and young and old respected him (29:7-10). \"I was eyes to the blind and feet to the lame; I was a father to the needy\" (29:15-16). His goodness was real and practical.", "good", ["hartley", "alden"]]],
    refs: [["JAS.1", "James 1:27", "Visit orphans and widows"], ["MAT.25", "Matthew 25:35-40", "You did it to Me"]],
  },
  30: {
    intro: "But now the young mock him, men whose fathers he would not have trusted with his sheepdogs. They spit at him. His pain gnaws at night. He cries to God and gets no answer. \"My harp is turned to mourning, and my flute to the sound of those who weep.\"",
    v: [
      ["30:1", "Now those younger than I mock me", "Now young men whose fathers Job would not have trusted with his sheepdogs laugh at him. It is a great fall in honor."],
      ["30:20", "I cry out to You for help, but You do not answer me", "Job cries to God and gets no answer. Many believers have known prayer that seems unheard."],
      ["30:31", "My harp is turned to mourning", "His harp now plays only songs of mourning. All his joy has turned to grief."],
    ],
    bg: [["A brother to jackals", "\"But now\" (30:1) begins Job's description of his present: mocked by young men whose fathers he would not have trusted with his sheepdogs. \"I have become a brother to jackals\" (30:29), animals known for their mournful howls in desolate places.", "good", ["clines", "andersen"]]],
    refs: [["PSA.22", "Psalm 22:1-8", "All who see me sneer at me"], ["MAT.27", "Matthew 27:39-44", "Jesus mocked"]],
  },
  31: {
    intro: "Job takes a final oath of innocence. He has made a covenant with his eyes not to look with lust. He has not lied, committed adultery, mistreated servants, ignored the poor, trusted in gold, or rejoiced over an enemy's ruin. If he has, let punishment come. He signs his name and asks the Almighty to answer him. \"The words of Job are ended.\"",
    v: [
      ["31:1", "I have made a covenant with my eyes", "Job made a covenant with his eyes not to look at a young woman with lust. Jesus also teaches that purity starts with the eyes and heart (Matthew 5:28)."],
      ["31:15", "Did not He who made me in the womb make him?", "Servants and masters are equal before God."],
      ["31:24-28", "If I have put my confidence in gold", "Job never trusted in gold or worshiped the sun and moon. Making wealth one's hope would have been denying God."],
      ["31:35", "Here is my signature; let the Almighty answer me", "Job signs his name to his defense like a legal paper and asks the Almighty to answer. He rests his case."],
    ],
    bg: [["Job's oath of innocence", "Job lists one sin after another and calls a curse on himself if he has done any of them: \"I have made a covenant with my eyes\" (31:1). This \"if I have... then let...\" form was a solemn ancient way to declare innocence in court. Then he rests his case: \"The words of Job are ended\" (31:40).", "strong", ["hartley", "walton"]]],
    refs: [["MAT.5", "Matthew 5:28", "Everyone who looks at a woman with lust"], ["EPH.6", "Ephesians 6:9", "Masters, your Master is in heaven"], ["1TI.6", "1 Timothy 6:17", "Do not fix your hope on riches"]],
  },
  32: {
    intro: "The three friends stop answering. A younger man, Elihu, who has waited because of his age, becomes angry at Job for justifying himself rather than God, and at the friends for condemning Job without an answer. He says the spirit in man gives understanding, not just age, and he is bursting to speak.",
    v: [
      ["32:2", "Elihu... burned with anger", "Elihu, a younger man, has listened quietly. Now he burns with anger at Job and the three friends."],
      ["32:8", "It is the spirit in man... that gives him understanding", "Elihu says understanding comes from God's breath in a person, not only from age. Wisdom is not only for the old."],
      ["32:19", "My belly is like unvented wine", "Elihu feels like new wine in a sealed wineskin, ready to burst. He cannot hold his words in."],
    ],
    why: "Elihu speaks for six chapters, but God neither praises nor rebukes him at the end. Scholars discuss how to evaluate him.",
    views: [
      ["A helpful bridge", "Many see Elihu as adding real insight, that God may use suffering to teach and refine, not only to punish, and as preparing the way for God's speech.", ["alden", "hartley"]],
      ["An eager young man", "Others view him as well-meaning but long-winded, repeating much of the friends' thinking with more confidence than wisdom.", ["clines", "walton"]],
    ],
    common: "All agree Elihu stresses God's greatness and the idea that suffering can teach, and that God's own speech is the true climax.",
    bg: [["Elihu, the young speaker", "Elihu waited to speak because he was younger, but he was angry with Job and with the three friends (32:2-6). Readers differ on Elihu: some see him preparing the way for God's speech, others as one more speaker who did not understand. God rebukes the three friends at the end (42:7) but does not mention Elihu.", "good", ["hartley", "andersen", "walton"]]],
    refs: [["1TI.4", "1 Timothy 4:12", "Let no one look down on your youthfulness"], ["PRO.18", "Proverbs 18:13", "He who answers before he hears"]],
  },
  33: {
    intro: "Elihu speaks to Job directly. God speaks in many ways, in dreams and through pain on a sickbed, to turn people from pride and keep them from the pit. If there is an angel, a mediator, to show what is right, God is gracious and says, \"Deliver him... I have found a ransom.\"",
    v: [
      ["33:14", "God speaks once, or twice, yet no one notices it", "God speaks in one way and then another, yet people don't notice. Elihu insists that God is not silent."],
      ["33:19", "Man is also chastened with pain", "Elihu adds a new idea: pain can be God's way of teaching and warning, not only His punishment."],
      ["33:23-24", "I have found a ransom", "Elihu pictures an angel speaking for a man and God saying, \"I have found a ransom.\" Rescue comes through a go-between."],
    ],
    w: [["כֹּפֶר", "kopher", "H3724", "ransom, price of release", "Elihu pictures an angel, a mediator, who pleads for a dying man: \"Deliver him from going down to the pit, I have found a ransom\" (33:24). It is the same word used for the ransom money in Exodus 30:12. Jesus said He came \"to give His life a ransom for many\" (Mark 10:45).", ["halot", "hartley"]]],
    refs: [["MRK.10", "Mark 10:45", "A ransom for many"], ["PSA.119", "Psalm 119:71", "It is good for me that I was afflicted"]],
  },
  34: {
    intro: "Elihu defends God's justice. \"Far be it from God to do wickedness.\" God repays each one according to his work and shows no partiality to princes. Elihu thinks Job adds rebellion to his sin by speaking against God.",
    v: [
      ["34:10", "Far be it from God to do wickedness", "\"Far be it from God to do wickedness.\" Elihu insists that God is always just."],
      ["34:19", "Who shows no partiality to princes", "God does not favor princes over the poor, because He made them all. He treats rich and poor alike."],
      ["34:21", "His eyes are upon the ways of a man", "God's eyes are on every step a person takes. Nothing is hidden from Him (Hebrews 4:13)."],
    ],
    bg: [["Far be it from God", "Elihu insists, \"Far be it from God to do wickedness\" (34:10). He is right that God is just. His mistake, like the friends', is assuming Job must therefore be guilty (34:37).", "good", ["hartley", "alden"]]],
    refs: [["GEN.18", "Genesis 18:25", "Shall not the Judge of all the earth deal justly?"], ["ROM.2", "Romans 2:11", "No partiality with God"]],
  },
  35: {
    intro: "Elihu asks what Job's righteousness gives God, or his sin takes from Him. God is far above. People cry out in oppression but do not say, \"Where is God my Maker, who gives songs in the night?\"",
    v: [
      ["35:7", "What do you give to Him?", "If you are righteous, what do you give to God? God does not need anything from us."],
      ["35:10", "Who gives songs in the night", "God gives songs in the night. Even in the darkest times He can bring hope and praise (Acts 16:25)."],
      ["35:11", "Who teaches us more than the beasts of the earth", "God gives people understanding to call on Him, more than animals that only cry out."],
      ["35:13", "Surely God will not listen to an empty cry", "Elihu warns against crying out without turning to God Himself."],
    ],
    bg: [["Who is Elihu?", "Elihu is a young man who speaks after Job's three friends fall silent (chapters 32-37). Some readers see him as preparing the way for God's speeches; others think he mostly repeats the friends. God rebukes the three friends at the end (42:7) but does not mention Elihu.", "debated", ["hartley", "walton"]]],
    refs: [["PSA.42", "Psalm 42:8", "His song will be with me in the night"], ["ACT.16", "Acts 16:25", "Paul and Silas sang at midnight"]],
  },
  36: {
    intro: "Elihu speaks for God. God is mighty yet despises no one. He opens people's ears through affliction. \"Behold, God is exalted in His power; who is a teacher like Him?\" Elihu begins to describe God's power in the storm: He draws up drops of water and pours rain from the clouds.",
    v: [
      ["36:5", "God is mighty but does not despise any", "God is mighty, yet He despises no one. Great power and great kindness go together in Him."],
      ["36:15", "He delivers the afflicted by their affliction", "God uses suffering to rescue the suffering and opens their ears through hard times. Pain can be where we learn to hear Him."],
      ["36:22", "Who is a teacher like Him?", "\"Who is a teacher like Him?\" God teaches through everything, even through trouble."],
      ["36:26", "God is exalted, and we do not know Him", "God is so great that we cannot fully know Him, and His years cannot be counted. He is beyond our understanding."],
    ],
    bg: [["Taught through affliction", "Elihu adds a new thought: God \"delivers the afflicted by their affliction, and opens their ear in time of oppression\" (36:15). Suffering can be a way God teaches, not only a punishment. Hebrews 12:10-11 makes a similar point.", "good", ["andersen", "hartley"]]],
    refs: [["HEB.12", "Hebrews 12:10-11", "Discipline yields the fruit of righteousness"], ["2CO.4", "2 Corinthians 4:17", "Light affliction producing glory"]],
  },
  37: {
    intro: "A thunderstorm seems to build as Elihu speaks. God thunders with His majestic voice; He commands snow, rain, ice and lightning. \"Listen to this, O Job, stand and consider the wonders of God.\" Out of the north comes golden splendor; around God is awesome majesty.",
    v: [
      ["37:5", "God thunders with His voice wondrously", "Thunder, snow and rain all show God's power. Elihu points to the storm as a picture of God's greatness."],
      ["37:14", "Stand and consider the wonders of God", "\"Stand and consider the wonders of God.\" Sometimes the wise thing is to stop and look."],
      ["37:22", "Around God is awesome majesty", "God comes in awesome majesty, like golden light from the north. Elihu's words set the stage for God Himself to speak."],
    ],
    bg: [["A storm rolls in", "Elihu describes thunder, lightning, snow and rain as signs of God's power (37:2-6), ending with \"out of the north comes golden splendor; around God is awesome majesty\" (37:22). The storm prepares for the next chapter, when God Himself speaks to Job out of the whirlwind (38:1).", "good", ["hartley", "clines"]]],
    refs: [["PSA.29", "Psalm 29", "The voice of the LORD is upon the waters"], ["PSA.147", "Psalm 147:16-18", "He gives snow like wool"]],
  },
  38: {
    intro: "Then the LORD answers Job out of the whirlwind. \"Where were you when I laid the foundation of the earth?\" God asks Job question after question about creation: the sea's limits, the morning, the storehouses of snow, the stars, the rain, and the lions and ravens He feeds. God does not explain Job's suffering, but He shows Himself.",
    v: [
      ["38:1", "The LORD answered Job out of the whirlwind", "At last God answers Job out of the whirlwind. He does not explain the suffering, but He comes to Job Himself."],
      ["38:4", "Where were you when I laid the foundation of the earth?", "\"Where were you when I laid the foundation of the earth?\" God's questions help Job see his place as a creature before the Creator."],
      ["38:7", "When the morning stars sang together", "At creation the morning stars sang together and the angels shouted for joy. Creation was a joyful event."],
      ["38:31", "Can you bind the chains of the Pleiades?", "Can Job tie the Pleiades together or loosen Orion's belt? Only God rules the stars."],
      ["38:41", "Who prepares for the raven its nourishment?", "God feeds the young ravens when they cry to Him. He cares for wild creatures no person looks after (Luke 12:24)."],
    ],
    bg: [["God's answer", "God does not tell Job about the heavenly scene in chapters 1-2. Instead He shows Job His wisdom and care over a vast world Job cannot control or understand. Many readers find that meeting God Himself is the answer Job needed.", "good", ["walton", "andersen"]]],
    refs: [["PSA.104", "Psalm 104", "God's wisdom in creation"], ["ISA.40", "Isaiah 40:12-14", "Who has measured the waters?"], ["MAT.6", "Matthew 6:26", "Look at the birds of the air"]],
  },
  39: {
    intro: "God continues with wild animals: the mountain goats giving birth, the wild donkey, the wild ox, the ostrich who leaves her eggs yet outruns a horse, the war horse that laughs at fear, and the hawk and eagle. Each lives by God's design, not Job's.",
    v: [
      ["39:1", "Do you know the time the mountain goats give birth?", "Job does not know when the mountain goats give birth, but God does. God watches over what we never see."],
      ["39:13-18", "The ostriches' wings flap joyously", "The ostrich lays eggs in the sand and seems foolish, yet she runs faster than a horse. God even made creatures that seem odd to us, and He delights in them."],
      ["39:19-25", "Do you give the horse his might?", "The war horse charges into battle without fear. God gave it its strength and courage, not Job."],
      ["39:27", "Is it at your command that the eagle mounts up?", "The eagle soars and builds its nest on high cliffs by God's design, not by Job's command."],
    ],
    bg: [["God's wild creatures", "God shows Job animals no person tames or feeds: the mountain goat giving birth, the wild donkey, the ostrich that laughs at the horse, the war horse that \"laughs at fear\" (39:22), the hawk and the eagle. God cares for a world far bigger than humans see.", "good", ["walton", "hartley"]]],
    refs: [["PSA.50", "Psalm 50:10-11", "Every beast of the forest is Mine"], ["ISA.40", "Isaiah 40:31", "Mount up with wings like eagles"]],
  },
  40: {
    intro: "God asks whether the faultfinder will contend with the Almighty. Job answers, \"Behold, I am insignificant... I lay my hand on my mouth.\" God speaks again from the storm: \"Will you condemn Me that you may be justified?\" He describes Behemoth, a huge beast that eats grass like an ox, \"the first of the ways of God.\"",
    v: [
      ["40:4", "I lay my hand on my mouth", "Job puts his hand over his mouth. The man who wanted to argue his case with God now falls silent."],
      ["40:8", "Will you condemn Me that you may be justified?", "Job need not accuse God to defend himself."],
      ["40:15", "Behold now, Behemoth", "Behemoth is a huge land creature, which some identify with the hippopotamus. It is mighty, yet only God, who made it, can master it."],
    ],
    why: "Scholars discuss what Behemoth (chapter 40) and Leviathan (chapter 41) were.",
    views: [
      ["Real animals described in poetry", "Many identify Behemoth with the hippopotamus or elephant and Leviathan with the crocodile, described in grand poetic language.", ["alden", "hartley"]],
      ["Symbols of chaos", "Others see them as symbols of chaos and evil, drawn from ancient imagery, showing that only God can master the forces Job fears; Leviathan also appears in Isaiah 27:1 as a sea monster.", ["walton", "clines"]],
    ],
    common: "All agree the point is that these creatures are far beyond human control, yet God made them and rules them.",
    bg: [["Behemoth", "\"Behold now, Behemoth, which I made as well as you\" (40:15). Readers differ on what animal is meant: many think of the hippopotamus or elephant, some of a dinosaur, and others of a symbol of untamed power. Whatever it is, God made it and only He can master it (40:19).", "good", ["hartley", "walton", "alden"]]],
    refs: [["ISA.27", "Isaiah 27:1", "Leviathan the fleeing serpent"], ["ROM.9", "Romans 9:20", "Who are you to answer back to God?"]],
  },
  41: {
    intro: "God describes Leviathan, a fierce creature no one can catch with a hook or tame as a pet. His scales are like shields, sparks leap from his mouth, and he laughs at spears. \"Nothing on earth is like him.\" If no one dares stir up Leviathan, who can stand before God?",
    v: [
      ["41:1", "Can you draw out Leviathan with a fishhook?", "Leviathan is a fearsome sea creature, which some identify with the crocodile. No one can catch it with a fishhook."],
      ["41:10-11", "Who then is he that can stand before Me?", "No one dares to stir up Leviathan. So who could stand before God, who made it? That is the point of the whole speech."],
      ["41:11", "Whatever is under the whole heaven is Mine", "\"Whatever is under the whole heaven is Mine.\" God owes no one anything. Paul echoes this verse in Romans 11:35."],
    ],
    w: [["לִוְיָתָן", "livyathan", "H3882", "Leviathan, a great sea creature", "Some see a crocodile; others note that ancient Canaanite poems tell of a sea monster called Lotan, a picture of chaos. Psalm 74:14 and Isaiah 27:1 also use the name. God's point to Job is the same either way: what terrifies people is a creature God made and controls.", ["halot", "walton"]]],
    refs: [["PSA.104", "Psalm 104:26", "Leviathan, which You have formed to sport in it"], ["ROM.11", "Romans 11:35-36", "Who has first given to Him?"]],
  },
  42: {
    intro: "Job answers, \"I know that You can do all things... I have heard of You by the hearing of the ear, but now my eye sees You; therefore I retract, and I repent in dust and ashes.\" God tells the friends they have not spoken of Him what is right, as Job has, and Job prays for them. God restores Job's fortunes twice over, gives him seven sons and three beautiful daughters, and Job lives 140 more years.",
    v: [
      ["42:2", "I know that You can do all things", "\"I know that You can do all things.\" Job's trust in God is restored, though his questions were never all answered."],
      ["42:5", "Now my eye sees You", "Job had heard about God; now he sees Him. Meeting God changed everything for him."],
      ["42:7", "You have not spoken of Me what is right, as My servant Job has", "God honors Job's honesty over the friends' theories."],
      ["42:10", "When he prayed for his friends", "God restored Job's fortunes after Job prayed for the friends who had hurt him. Restoration came as Job forgave."],
      ["42:15", "Their father gave them inheritance among their brothers", "Job gave his daughters an inheritance along with their brothers. In that world it was an unusual honor for daughters."],
    ],
    w: [["נִחַם", "nicham", "H5162", "to repent, to be comforted", "The word in 42:6 can mean to change one's mind or to be comforted. Job is not confessing the sins the friends accused him of, but turning from his demand that God answer him on his terms.", ["halot", "hartley"]]],
    refs: [["JAS.5", "James 5:11", "The Lord is full of compassion and mercy"], ["MAT.5", "Matthew 5:44", "Pray for those who persecute you"], ["ISA.6", "Isaiah 6:5", "My eyes have seen the King"]],
  },
});
