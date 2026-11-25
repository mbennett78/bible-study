// Jeremiah chapter notes.
import { makeBook } from "./make.js";

const sources = {
  thompsonJ: "J. A. Thompson, The Book of Jeremiah, New International Commentary on the Old Testament (Eerdmans, 1980).",
  harrison: "R. K. Harrison, Jeremiah and Lamentations, Tyndale Old Testament Commentaries (InterVarsity Press, 1973).",
  huey: "F. B. Huey Jr., Jeremiah, Lamentations, New American Commentary 16 (Broadman & Holman, 1993).",
  lundbom: "Jack R. Lundbom, Jeremiah, 3 vols., Anchor Bible 21A-C (Doubleday, 1999-2004).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["thompsonJ", "huey"] }, {
  1: {
    intro: "Jeremiah, a young priest from Anathoth, is called in the thirteenth year of King Josiah (627 BC). God says, \"Before I formed you in the womb I knew you... I have appointed you a prophet to the nations.\" Jeremiah protests, \"I am a youth.\" God touches his mouth: \"I have put My words in your mouth.\" Two visions follow: an almond branch (God is watching over His word) and a boiling pot tipped from the north (disaster coming).",
    v: [
      ["1:5", "Before I formed you in the womb I knew you", "God knew Jeremiah and set him apart as a prophet before he was even born. God's plan for a life begins before birth (Psalm 139:13-16)."],
      ["1:6", "I do not know how to speak, because I am a youth", "Jeremiah protests that he is only a youth and cannot speak well. Like Moses (Exodus 4:10), he learns that God uses unlikely people."],
      ["1:8", "Do not be afraid of them, for I am with you", "God does not promise Jeremiah an easy road. He promises, \"I am with you to deliver you.\" God's presence is the answer to fear."],
      ["1:11-12", "A rod of an almond tree... I am watching over My word", "A wordplay: almond (shaqed) and watching (shoqed)."],
    ],
    bg: [["Jeremiah's times", "Jeremiah prophesied for about forty years, from 627 BC through the fall of Jerusalem in 586 BC and beyond. He lived through five kings, the rise of Babylon, and the destruction of the temple.", "strong", ["thompsonJ", "kitchen"]]],
    refs: [["PSA.139", "Psalm 139:13-16", "Knit together in the womb"], ["GAL.1", "Galatians 1:15", "Set apart from my mother's womb"], ["EXO.4", "Exodus 4:10-12", "Moses: I am slow of speech"]],
  },
  2: {
    intro: "God remembers Israel's early devotion \"like a bride\" in the wilderness. But now: \"My people have committed two evils: they have forsaken Me, the fountain of living waters, to hew for themselves cisterns, broken cisterns that can hold no water.\" They have changed their glorious God for idols that cannot help.",
    v: [
      ["2:2", "The devotion of your youth", "God remembers Israel's early love, like a bride following her husband through the wilderness. He longs for that first love again (Revelation 2:4)."],
      ["2:13", "The fountain of living waters... broken cisterns", "A spring of fresh, flowing water was the best water there was. Cisterns were pits cut in rock to hold rain, and cracked ones held nothing. Israel traded God for what could never satisfy."],
      ["2:32", "Can a virgin forget her ornaments?... My people have forgotten Me", "No bride forgets her wedding jewelry, yet God's people have forgotten Him \"days without number.\" They forgot what matters most."],
    ],
    refs: [["JHN.4", "John 4:10-14", "Living water"], ["REV.2", "Revelation 2:4", "You have left your first love"]],
  },
  3: {
    intro: "Judah saw what happened to unfaithful Israel and still did not return. Yet God pleads: \"Return, faithless Israel... I will not look upon you in anger, for I am gracious.\" \"I will give you shepherds after My own heart.\" One day the ark will not be missed, for Jerusalem will be called the throne of the LORD.",
    v: [
      ["3:12", "Return, faithless Israel... for I am gracious", "Even to faithless Israel in the north, God calls, \"Return... for I am gracious.\" The door is still open."],
      ["3:15", "Shepherds after My own heart", "God promises shepherds after His own heart who will feed the people with knowledge and understanding. Good leaders teach."],
      ["3:22", "Return, O faithless sons, I will heal your faithlessness", "\"Return, O faithless sons; I will heal your faithlessness.\" God does more than forgive; He heals the heart that keeps wandering."],
    ],
    refs: [["HOS.14", "Hosea 14:1-4", "Return to the LORD"], ["LUK.15", "Luke 15:20", "The father ran"]],
  },
  4: {
    intro: "\"Break up your fallow ground, and do not sow among thorns. Circumcise yourselves to the LORD.\" A lion has come out from the north. Jeremiah feels the anguish: \"My soul, my soul! I am in anguish!\" He sees the land returned to emptiness, \"formless and void,\" as before creation.",
    v: [
      ["4:3", "Break up your fallow ground", "Fallow ground is hard, unplowed soil. Like a farmer breaking it up before planting, the people must soften their hearts to receive God's word (Hosea 10:12)."],
      ["4:4", "Circumcise yourselves to the LORD", "A changed heart, not just an outward sign."],
      ["4:19", "My soul, my soul! I am in anguish!", "\"My soul, my soul! I am in anguish!\" Jeremiah feels in his own body the pain that is coming on his people."],
      ["4:23", "Formless and void", "\"Formless and void\" are the words of Genesis 1:2. Jeremiah pictures judgment as creation coming undone."],
    ],
    refs: [["HOS.10", "Hosea 10:12", "Break up your fallow ground"], ["ROM.2", "Romans 2:29", "Circumcision of the heart"], ["GEN.1", "Genesis 1:2", "Formless and void"]],
  },
  5: {
    intro: "\"Roam to and fro through the streets of Jerusalem... if you can find a man, if there is one who does justice, who seeks truth, then I will pardon her.\" Neither poor nor great can be found faithful. \"The prophets prophesy falsely, and the priests rule on their own authority; and My people love it so!\"",
    v: [
      ["5:1", "If you can find a man", "God says to search Jerusalem's streets for one person who does justice and seeks truth, and He will pardon the city. It recalls Abraham pleading for Sodom (Genesis 18:22-32)."],
      ["5:22", "I have placed the sand as a boundary for the sea", "God set the sand as a boundary that the sea, for all its roaring, cannot cross. The sea obeys God, but His people do not."],
      ["5:31", "My people love it so!", "The prophets lie, the priests rule by their own power, \"and My people love it so!\" People often prefer comfortable lies to hard truth (2 Timothy 4:3)."],
    ],
    refs: [["GEN.18", "Genesis 18:23-32", "Abraham pleads for Sodom"], ["2TI.4", "2 Timothy 4:3", "Teachers to tickle their ears"]],
  },
  6: {
    intro: "Danger from the north approaches Jerusalem. \"They have healed the brokenness of My people superficially, saying, Peace, peace, but there is no peace.\" \"Stand by the ways and see and ask for the ancient paths, where the good way is, and walk in it; and you will find rest for your souls. But they said, We will not walk in it.\"",
    v: [
      ["6:14", "Peace, peace, but there is no peace", "False prophets told the people all was well, \"Peace, peace,\" when there was no peace. Their comfort was like a bandage on a deep wound."],
      ["6:16", "Ask for the ancient paths... you will find rest for your souls", "Stand at the crossroads, look for the ancient paths where the good way is, and walk in it, \"and you will find rest for your souls.\" Jesus echoes these words in Matthew 11:29."],
      ["6:27", "An assayer and a tester", "God made Jeremiah a tester of metals, to test the people the way silver is tested in the fire. The verdict: rejected silver (6:30)."],
    ],
    refs: [["MAT.11", "Matthew 11:28-29", "Rest for your souls"], ["EZK.13", "Ezekiel 13:10", "Peace when there is no peace"]],
  },
  7: {
    intro: "Jeremiah stands at the temple gate. The people chant, \"This is the temple of the LORD,\" as if the building guarantees safety while they steal, murder, commit adultery and worship Baal. \"Has this house, which is called by My name, become a den of robbers in your sight?\" God reminds them of Shiloh, where the tabernacle once stood and was destroyed.",
    v: [
      ["7:4", "This is the temple of the LORD", "The people kept repeating \"This is the temple of the LORD\" as if the building guaranteed their safety. They trusted a building instead of God."],
      ["7:11", "A den of robbers", "Jesus quoted this when He cleared the temple."],
      ["7:12", "Go now to My place which was in Shiloh", "Shiloh once held the tabernacle, but God let it be destroyed because of Israel's sin (Psalm 78:60). God's house can be lost when His people turn from Him."],
      ["7:23", "Obey My voice, and I will be your God", "\"Obey My voice, and I will be your God, and you will be My people.\" That is what God wanted from the beginning, not sacrifices alone."],
    ],
    refs: [["MAT.21", "Matthew 21:13", "A robbers' den"], ["JER.26", "Jeremiah 26", "The response to this sermon"], ["1SA.4", "1 Samuel 4", "Shiloh and the ark lost"]],
  },
  8: {
    intro: "Even the stork knows her seasons, but God's people do not know His ways. They say, \"We are wise,\" but reject the word of the LORD. \"Harvest is past, summer is ended, and we are not saved.\" Jeremiah grieves: \"Is there no balm in Gilead? Is there no physician there?\"",
    v: [
      ["8:7", "Even the stork in the sky knows her seasons", "The stork, the turtledove and the swift know the seasons to migrate. Creation obeys its Maker, but God's people do not know His ways."],
      ["8:20", "Harvest is past, summer is ended, and we are not saved", "\"Harvest is past, summer is ended, and we are not saved.\" The season for rescue has passed, and it is too late."],
      ["8:22", "Is there no balm in Gilead?", "The spiritual \"There Is a Balm in Gilead\" answers yes."],
    ],
    refs: [["ISA.1", "Isaiah 1:3", "An ox knows its owner"], ["LUK.19", "Luke 19:41-44", "Jesus weeps over Jerusalem"]],
  },
  9: {
    intro: "\"Oh that my head were waters and my eyes a fountain of tears, that I might weep day and night.\" Jeremiah is known as the weeping prophet. Everyone deceives his neighbor. Call the mourning women. \"Let not a wise man boast of his wisdom... but let him who boasts boast of this, that he understands and knows Me, that I am the LORD who exercises lovingkindness, justice and righteousness.\"",
    v: [
      ["9:1", "That I might weep day and night", "Jeremiah wishes his head were a spring of water so he could weep day and night for his people. That is why he is called the weeping prophet."],
      ["9:23-24", "Let him who boasts boast of this, that he knows Me", "Do not boast of wisdom, strength or riches, but that you understand and know God. Paul quotes this in 1 Corinthians 1:31."],
      ["9:24", "Lovingkindness, justice and righteousness", "God delights in lovingkindness, justice and righteousness on the earth. Knowing Him means loving what He loves."],
    ],
    refs: [["1CO.1", "1 Corinthians 1:31", "Let him who boasts, boast in the Lord"], ["LAM.1", "Lamentations 1:16", "My eyes run down with water"]],
  },
  10: {
    intro: "Do not learn the way of the nations. Their idols are like scarecrows in a cucumber field; they cannot speak or walk and must be carried. \"There is none like You, O LORD; You are great.\" God made the earth by His power. \"I know, O LORD, that a man's way is not in himself.\"",
    v: [
      ["10:5", "Like a scarecrow in a cucumber field", "Idols are like scarecrows in a cucumber patch: they cannot speak and must be carried. There is no reason to fear them."],
      ["10:10", "The LORD is the true God; He is the living God", "\"The LORD is the true God; He is the living God and the everlasting King.\" Unlike idols, God is real and alive."],
      ["10:23", "A man's way is not in himself", "\"A man's way is not in himself.\" We cannot direct our own steps well. We need God's guidance (Proverbs 16:9)."],
    ],
    bg: [["A verse in Aramaic", "Jeremiah 10:11 is written in Aramaic, the international language of the day, probably so it could be said directly to foreigners: \"The gods that did not make the heavens and the earth will perish.\"", "strong", ["thompsonJ", "lundbom"]]],
    refs: [["ISA.44", "Isaiah 44:9-20", "The folly of idols"], ["PSA.115", "Psalm 115:4-8", "Idols that cannot speak"], ["PRO.16", "Proverbs 16:9", "The LORD directs his steps"]],
  },
  11: {
    intro: "God reminds Judah of His covenant: \"Listen to My voice... so you shall be My people, and I will be your God.\" But they broke it, and their gods are as many as their cities. God tells Jeremiah not to pray for them. Then Jeremiah learns that the men of his own hometown, Anathoth, plot to kill him: \"I was like a gentle lamb led to the slaughter.\"",
    v: [
      ["11:4", "Listen to My voice", "When God brought Israel out of Egypt, His covenant came down to this: \"Listen to My voice, and do according to all which I command you.\""],
      ["11:14", "Do not pray for this people", "God tells Jeremiah not to pray for the people (also 7:16; 14:11). It is a sobering sign that judgment has been decided."],
      ["11:19", "Like a gentle lamb led to the slaughter", "The men of Jeremiah's own hometown, Anathoth, were plotting to kill him (11:21). He was like a gentle lamb led to the slaughter, words echoed in Isaiah 53:7."],
    ],
    refs: [["ISA.53", "Isaiah 53:7", "Like a lamb led to slaughter"], ["LUK.4", "Luke 4:24-29", "No prophet is welcome in his hometown"]],
  },
  12: {
    intro: "Jeremiah asks, \"Why has the way of the wicked prospered?\" God answers with a challenge: \"If you have run with footmen and they have tired you out, then how can you compete with horses?\" Harder days are coming. Yet God promises compassion even to neighboring nations if they learn His ways.",
    v: [
      ["12:1", "Why has the way of the wicked prospered?", "\"Why has the way of the wicked prospered?\" Jeremiah brings his honest question straight to God, as Job and Habakkuk did."],
      ["12:5", "How can you compete with horses?", "God answers: if racing men on foot has tired you, how will you compete with horses? Harder days are coming, and God is strengthening him for them."],
      ["12:15-16", "If they will really learn the ways of My people", "Even the nations that harmed Israel will be shown compassion if they learn the ways of God's people. There is hope for the nations."],
    ],
    refs: [["PSA.73", "Psalm 73", "The prosperity of the wicked"], ["HAB.1", "Habakkuk 1:2-4", "How long?"]],
  },
  13: {
    intro: "God has Jeremiah buy a linen belt, wear it, then hide it in a rock crevice by the Euphrates. Later it is ruined, \"totally worthless.\" So Judah, which God bound to Himself to be His glory, has become worthless through pride. \"Can the Ethiopian change his skin or the leopard his spots? Then you also can do good who are accustomed to doing evil.\"",
    v: [
      ["13:11", "So I made the whole household of Israel cling to Me", "A linen waistband clings close to the body. God meant His people to cling to Him that closely, for His praise and glory."],
      ["13:15", "Listen and give heed, do not be haughty", "\"Listen and give heed, do not be haughty, for the LORD has spoken.\" Pride keeps people from hearing God."],
      ["13:23", "Can the leopard change his spots?", "\"Can the leopard change his spots?\" People used to doing evil cannot change their own hearts. Only God can give a new heart (31:33)."],
    ],
    refs: [["EZK.36", "Ezekiel 36:26", "A new heart"], ["ROM.7", "Romans 7:18-25", "Who will set me free?"]],
  },
  14: {
    intro: "A terrible drought: cisterns are empty, the ground is cracked, even the deer abandons her fawn. Jeremiah prays, \"Although our iniquities testify against us, O LORD, act for Your name's sake... You are in our midst, O LORD, and we are called by Your name; do not forsake us!\" False prophets promise peace. Jeremiah weeps night and day.",
    v: [
      ["14:7", "Act for Your name's sake", "\"Though our iniquities testify against us, O LORD, act for Your name's sake.\" The prayer appeals not to their goodness but to God's own character."],
      ["14:9", "We are called by Your name; do not forsake us", "\"We are called by Your name; do not forsake us!\" Belonging to God is the people's only hope."],
      ["14:22", "Are there any among the idols of the nations who give rain?", "During a terrible drought, Jeremiah asks whether any idol can bring rain. Only the LORD sends rain and showers."],
    ],
    refs: [["1KI.17", "1 Kings 17:1", "No rain in Elijah's day"], ["DAN.9", "Daniel 9:18-19", "For Your own sake, O my God"]],
  },
  15: {
    intro: "God says even Moses and Samuel could not turn His judgment now. Jeremiah laments that he was ever born: everyone curses him. \"Your words were found and I ate them, and Your words became for me a joy and the delight of my heart.\" Yet he feels God has become like a deceptive stream. God answers: \"If you return, then I will restore you... I am with you to save you.\"",
    v: [
      ["15:1", "Even though Moses and Samuel were to stand before Me", "Even if Moses and Samuel, Israel's greatest intercessors, prayed for this people, God would not turn back judgment."],
      ["15:16", "Your words were found and I ate them", "\"Your words were found and I ate them, and Your words became for me a joy.\" God's word fed Jeremiah's soul (Ezekiel 3:1-3)."],
      ["15:19", "If you return, then I will restore you", "When Jeremiah grows bitter, God says, \"If you return, then I will restore you.\" God restores His discouraged servant."],
      ["15:20", "I am with you to save you", "God renews the promise He made at Jeremiah's call (1:18-19): \"I am with you to save you and deliver you.\""],
    ],
    refs: [["EZK.3", "Ezekiel 3:1-3", "Eat this scroll"], ["REV.10", "Revelation 10:9-10", "Sweet as honey"]],
  },
  16: {
    intro: "God tells Jeremiah not to marry or have children, not to attend funerals or feasts, as signs of the coming disaster. Yet hope breaks in: days are coming when people will no longer speak of the exodus from Egypt but of God bringing Israel back from the land of the north. \"O LORD, my strength and my stronghold.\"",
    v: [
      ["16:2", "You shall not take a wife", "God tells Jeremiah not to marry or have children, because terrible days are coming. Even his lonely life became a sign to the people."],
      ["16:14-15", "A new exodus", "One day people will speak less of the exodus from Egypt than of God bringing Israel home from the north. The return from exile will be a new exodus."],
      ["16:19", "O LORD, my strength and my stronghold", "\"O LORD, my strength and my stronghold, and my refuge in the day of distress.\" Jeremiah also sees nations coming to God from the ends of the earth."],
    ],
    refs: [["1CO.7", "1 Corinthians 7:26-32", "Present distress"], ["ISA.43", "Isaiah 43:18-19", "Do not remember former things"]],
  },
  17: {
    intro: "Judah's sin is written with an iron pen on their hearts. \"Cursed is the man who trusts in mankind... Blessed is the man who trusts in the LORD... He will be like a tree planted by the water.\" \"The heart is more deceitful than all else and is desperately sick; who can understand it? I, the LORD, search the heart.\" \"Heal me, O LORD, and I will be healed.\" Keep the Sabbath holy.",
    v: [
      ["17:7-8", "Like a tree planted by the water", "The one who trusts the LORD is like a tree planted by the water, with green leaves even in drought (Psalm 1:3). Trust keeps us alive in dry seasons."],
      ["17:9", "The heart is more deceitful than all else", "\"The heart is more deceitful than all else.\" We cannot fully trust our own hearts."],
      ["17:10", "I, the LORD, search the heart", "God searches the heart and tests the mind. He knows us fully and judges fairly."],
      ["17:14", "Heal me, O LORD, and I will be healed", "\"Heal me, O LORD, and I will be healed; save me and I will be saved.\" Only God can truly heal and save us."],
    ],
    refs: [["PSA.1", "Psalm 1:3", "A tree by streams of water"], ["PSA.139", "Psalm 139:23", "Search me, O God"], ["MRK.7", "Mark 7:21-23", "From the heart come evil thoughts"]],
  },
  18: {
    intro: "God sends Jeremiah to the potter's house. The clay pot is spoiled, so the potter remakes it into another vessel. \"Can I not, O house of Israel, deal with you as this potter does?... Like the clay in the potter's hand, so are you in My hand.\" If a nation turns from evil, God relents. But the people say, \"It's hopeless!\" and plot against Jeremiah.",
    v: [
      ["18:4", "So he remade it into another vessel", "When the clay was spoiled in his hands, the potter did not throw it away but shaped it into another pot. God can remake a spoiled life."],
      ["18:6", "Like the clay in the potter's hand", "Like clay in the potter's hand, Israel is in God's hand. God shapes nations and people (Romans 9:21)."],
      ["18:8", "If that nation turns from its evil, I will relent", "If a nation God warned turns from its evil, God will relent. God's warnings are invitations to repent (Jonah 3:10)."],
    ],
    refs: [["ISA.64", "Isaiah 64:8", "We are the clay"], ["ROM.9", "Romans 9:20-21", "The potter has a right over the clay"], ["JON.3", "Jonah 3:10", "God relented"]],
  },
  19: {
    intro: "Jeremiah buys a clay jar, takes elders to the Valley of Ben-hinnom where children were burned to Baal, and smashes the jar: \"Just so will I break this people and this city, even as one breaks a potter's vessel, which cannot again be repaired.\" The valley will be called the Valley of Slaughter.",
    v: [
      ["19:5", "To burn their sons in the fire", "In the Valley of Ben-hinnom, people burned their children as offerings to Baal. The later name Gehenna, used for hell, comes from this valley."],
      ["19:11", "Which cannot again be repaired", "Jeremiah smashed a clay jar in front of the leaders. A broken jar cannot be mended, and the coming judgment would be just as final."],
    ],
    bg: [["The Valley of Hinnom", "The valley south of Jerusalem, Ge-Hinnom, was where children were sacrificed. Its name became Gehenna, the word Jesus used for hell.", "strong", ["thompsonJ", "lundbom"]]],
    refs: [["2KI.23", "2 Kings 23:10", "Josiah defiles Topheth"], ["MAT.10", "Matthew 10:28", "Gehenna"]],
  },
  20: {
    intro: "Pashhur the priest beats Jeremiah and puts him in stocks. Released, Jeremiah renames him \"Terror on every side.\" Then Jeremiah pours out his heart: he is mocked all day. If he says he won't speak God's word anymore, \"then in my heart it becomes like a burning fire shut up in my bones.\" He praises God, then curses the day he was born.",
    v: [
      ["20:7", "I have become a laughingstock all day long", "Beaten and put in the stocks by the priest Pashhur (20:2), Jeremiah says he has become a laughingstock. Faithfulness cost him dearly."],
      ["20:9", "Like a burning fire shut up in my bones", "Jeremiah tries to stop speaking God's word, but it is like a fire shut up in his bones. He cannot hold it in."],
      ["20:11", "The LORD is with me like a dread champion", "\"The LORD is with me like a dread champion.\" In the middle of his complaint, Jeremiah's courage returns."],
      ["20:14", "Cursed be the day when I was born", "Right after praising God, Jeremiah curses the day he was born (compare Job 3). The Bible is honest about a believer's despair."],
    ],
    refs: [["JOB.3", "Job 3", "Job curses his birth"], ["ACT.4", "Acts 4:20", "We cannot stop speaking"]],
  },
  21: {
    intro: "During Babylon's siege, King Zedekiah sends to Jeremiah hoping God will work a miracle as in the past. Jeremiah answers that God Himself will fight against the city. \"I set before you the way of life and the way of death\": those who surrender to Babylon will live.",
    v: [
      ["21:2", "Perhaps the LORD will deal with us according to all His wonderful acts", "Hoping for a miracle without repentance."],
      ["21:8", "The way of life and the way of death", "God sets before the people the way of life and the way of death, just as Moses did (Deuteronomy 30:15). Surrender to Babylon now means life."],
      ["21:1", "Pashhur the son of Malchijah", "A different Pashhur from the priest who put Jeremiah in the stocks (20:1-2). This one later wants Jeremiah dead (38:1-4)."],
      ["21:9", "He will have his own life as booty", "Staying alive is the only prize left. Surrender to Babylon means life."],
      ["21:12", "Administer justice every morning", "Kings heard cases in the morning (2 Samuel 15:2). Even now God calls the king to do justice before it is too late."],
    ],
    bg: [["The siege of 588 BC", "Nebuchadnezzar's army surrounded Jerusalem in Zedekiah's ninth year, about 588 BC (2 Kings 25:1). Letters on pottery found at Lachish, written by a Judean officer during the same campaign, say they can no longer see the signals of Azekah, one of the last cities still standing (Jeremiah 34:7).", "strong", ["kitchen", "lundbom"]]],
    refs: [["DEU.30", "Deuteronomy 30:15-19", "Life and death set before you"], ["2KI.25", "2 Kings 25", "Jerusalem falls"]],
  },
  22: {
    intro: "Jeremiah speaks to the kings of Judah: \"Do justice and righteousness, and deliver the one who has been robbed.\" He rebukes King Jehoiakim for building a palace with unpaid labor and compares him with his father Josiah: \"He pled the cause of the afflicted and needy; then it was well. Is not that what it means to know Me?\" Jehoiachin (Coniah) will be written down childless as to the throne.",
    v: [
      ["22:13", "Woe to him who builds his house without righteousness", "King Jehoiakim built a grand palace using his neighbors' labor without paying them. His father Josiah cared for the poor, and God says, \"Is not that what it means to know Me?\" (22:16)."],
      ["22:16", "Is not that what it means to know Me?", "Knowing God shows in caring for the needy."],
      ["22:30", "Write this man down childless", "No son of his would sit on David's throne."],
    ],
    why: "Jeremiah 22:30 says no descendant of Jehoiachin will rule on David's throne, yet Matthew 1:12 lists Jehoiachin (Jeconiah) in Jesus' ancestry. Scholars discuss how these fit together.",
    views: [
      ["Joseph's legal line, Mary's natural line", "Many note that Matthew traces Joseph's legal line, while Jesus was not Joseph's biological son, and that Luke traces another branch of David's family, so the curse on Jehoiachin's physical descendants is not broken.", ["huey", "harrison"]],
      ["Judgment later softened", "Others point out that the curse applied to Jehoiachin's own sons in his lifetime, and that God later honored his grandson Zerubbabel (Haggai 2:23), showing God's grace beyond judgment.", ["thompsonJ", "lundbom"]],
    ],
    common: "All agree that God kept His promise to David through Jesus, and that Jehoiachin's own sons did not reign.",
    refs: [["MAT.1", "Matthew 1:11-12", "Jeconiah in Jesus' genealogy"], ["HAG.2", "Haggai 2:23", "Zerubbabel like a signet ring"], ["MIC.6", "Micah 6:8", "Do justice, love kindness"]],
  },
  23: {
    intro: "\"Woe to the shepherds who are destroying and scattering the sheep of My pasture!\" God Himself will gather the remnant. \"Behold, the days are coming when I will raise up for David a righteous Branch... and this is His name: The LORD our righteousness.\" Then a long warning against false prophets: \"Is not My word like fire, and like a hammer which shatters a rock?\"",
    v: [
      ["23:5", "A righteous Branch", "A promise of the Messiah from David's line."],
      ["23:6", "The LORD our righteousness", "The coming King, the righteous Branch from David's line, will be called \"The LORD our righteousness,\" in Hebrew Yahweh Tsidqenu. Christians see Jesus as this King (1 Corinthians 1:30)."],
      ["23:24", "Do I not fill the heavens and the earth?", "\"Do I not fill the heavens and the earth?\" No one can hide from God. He is everywhere (Psalm 139:7-10)."],
      ["23:29", "Is not My word like fire... like a hammer?", "God's word is like fire and like a hammer that shatters rock. Unlike the false prophets' dreams, it has real power."],
    ],
    refs: [["JHN.10", "John 10:11-16", "The good shepherd"], ["ISA.11", "Isaiah 11:1", "A shoot from Jesse"], ["1CO.1", "1 Corinthians 1:30", "Christ our righteousness"]],
  },
  24: {
    intro: "After King Jehoiachin is taken to Babylon in 597 BC, God shows Jeremiah two baskets of figs, one very good and one rotten. The good figs are the exiles in Babylon, whom God will bring back: \"I will give them a heart to know Me... for they will return to Me with their whole heart.\" The bad figs are Zedekiah and those who stayed.",
    v: [
      ["24:5", "Like these good figs, so I will regard as good the captives", "The people already taken to Babylon seemed to be the unlucky ones. God says they are the good figs He will watch over for good. It is surprising grace for the exiles."],
      ["24:7", "I will give them a heart to know Me", "\"I will give them a heart to know Me.\" God promises to change their hearts, not just their circumstances (31:33)."],
      ["24:1", "Two baskets of figs set before the temple", "Firstfruits were brought to the temple in baskets (Deuteronomy 26:2). These two baskets picture two groups of people."],
      ["24:8", "Like the bad figs which cannot be eaten", "Those left in Jerusalem thought they were the lucky ones. God says the opposite, and He includes those who fled to Egypt."],
    ],
    w: [["תְּאֵנָה", "te'enah", "H8384", "fig, fig tree", "Figs and vines are the Old Testament picture of peace and plenty: \"each of them will sit under his vine and under his fig tree\" (Micah 4:4). Jesus also used a fig tree as a picture of fruitfulness (Mark 11:12-14).", ["halot"]]],
    refs: [["EZK.11", "Ezekiel 11:16-20", "A sanctuary in exile"], ["2KI.24", "2 Kings 24:10-17", "Jehoiachin taken to Babylon"]],
  },
  25: {
    intro: "In 605 BC, after twenty-three years of warnings, Jeremiah announces that Nebuchadnezzar will conquer Judah and the nations around it, and they will serve Babylon seventy years. Then Babylon itself will be judged. God gives Jeremiah \"the cup of the wine of wrath\" for all the nations to drink.",
    v: [
      ["25:3", "These twenty-three years", "Faithful preaching with little response."],
      ["25:11", "Serve the king of Babylon seventy years", "Judah would serve the king of Babylon seventy years. Years later Daniel read this prophecy and began to pray for his people (Daniel 9:2)."],
      ["25:15", "The cup of the wine of wrath", "God's judgment is pictured as a cup of wrath the nations must drink. Jesus spoke of drinking a cup when He prayed in Gethsemane (Mark 14:36)."],
    ],
    refs: [["DAN.9", "Daniel 9:2", "Daniel reads Jeremiah's seventy years"], ["2CH.36", "2 Chronicles 36:21", "Seventy years fulfilled"], ["REV.14", "Revelation 14:10", "The cup of His anger"]],
  },
  26: {
    intro: "When Jeremiah preaches the temple sermon, priests and prophets seize him: \"You must die!\" Jeremiah says, \"I am in your hands; do with me as is good... but know for certain that if you put me to death, you will bring innocent blood.\" Elders remind the people that King Hezekiah did not kill the prophet Micah. Ahikam protects Jeremiah. Another prophet, Uriah, is not so fortunate.",
    v: [
      ["26:8", "You must die!", "After Jeremiah's temple sermon, the priests, prophets and people seized him and shouted, \"You must die!\" Telling the truth can be costly."],
      ["26:14", "I am in your hands", "\"Behold, I am in your hands; do with me as is good in your sight.\" Jeremiah does not take back God's word. He trusts God with his life."],
      ["26:18", "Micah of Moresheth prophesied", "Some elders remembered that Micah had prophesied Jerusalem's ruin (Micah 3:12), and King Hezekiah repented instead of killing him. History was used to spare Jeremiah."],
      ["26:24", "The hand of Ahikam was with Jeremiah", "Ahikam son of Shaphan protected Jeremiah. Another prophet, Uriah, was killed for the same message (26:20-23). God provided Jeremiah a protector."],
    ],
    refs: [["MIC.3", "Micah 3:12", "Zion plowed as a field"], ["JER.7", "Jeremiah 7", "The temple sermon"], ["ACT.5", "Acts 5:34-39", "Gamaliel's advice"]],
  },
  27: {
    intro: "God tells Jeremiah to wear a wooden yoke on his neck and send word to the kings of Edom, Moab, Ammon, Tyre and Sidon: serve Nebuchadnezzar and live. Do not listen to prophets who promise quick freedom. Even the temple vessels will go to Babylon until God brings them back.",
    v: [
      ["27:2", "Make for yourself bonds and yokes", "Another acted-out message."],
      ["27:6", "Nebuchadnezzar... My servant", "God uses even a pagan king."],
      ["27:22", "Until the day I visit them", "A hint of future return."],
    ],
    refs: [["EZR.1", "Ezra 1:7-11", "The vessels return"], ["DAN.1", "Daniel 1:2", "Temple vessels taken to Babylon"]],
  },
  28: {
    intro: "The prophet Hananiah breaks Jeremiah's wooden yoke and announces that within two years God will break Babylon's yoke. Jeremiah answers, \"Amen! May the LORD do so,\" but warns that only time proves a prophet. God replies: the wooden yoke will be replaced with iron. Jeremiah tells Hananiah he will die that year, and he does.",
    v: [
      ["28:6", "Amen! May the LORD do so", "Jeremiah wished for good news too."],
      ["28:9", "When the word of the prophet comes to pass", "The test of a true prophet."],
      ["28:13", "Yokes of iron", "False hope makes things worse."],
    ],
    refs: [["DEU.18", "Deuteronomy 18:21-22", "How to know a false prophet"], ["1JN.4", "1 John 4:1", "Test the spirits"]],
  },
  29: {
    intro: "Jeremiah sends a letter to the exiles in Babylon: build houses, plant gardens, marry and have children. \"Seek the welfare of the city where I have sent you... and pray to the LORD on its behalf.\" After seventy years God will bring them back. \"For I know the plans that I have for you, declares the LORD, plans for welfare and not for calamity to give you a future and a hope... You will seek Me and find Me when you search for Me with all your heart.\"",
    v: [
      ["29:5-6", "Build houses and live in them", "Live faithfully where you are."],
      ["29:7", "Seek the welfare of the city", "Pray for the place you live."],
      ["29:11", "Plans... to give you a future and a hope", "One of the best-loved promises."],
      ["29:13", "When you search for Me with all your heart", "God can be found."],
    ],
    bg: [["Reading Jeremiah 29:11 in context", "God spoke this promise to the whole exiled community, who would wait seventy years, many dying in Babylon. It teaches that God's good plans include His people through long hardship, not that every individual hope will be fulfilled quickly.", "good", ["thompsonJ", "huey"]]],
    refs: [["ROM.8", "Romans 8:28", "God works all things for good"], ["1TI.2", "1 Timothy 2:1-2", "Pray for all in authority"], ["DEU.4", "Deuteronomy 4:29", "You will find Him if you search"]],
  },
  30: {
    intro: "The \"Book of Comfort\" begins (chapters 30-33). God tells Jeremiah to write in a book that He will restore Israel and Judah. A time of distress for Jacob, \"yet he will be saved from it.\" \"I will restore you to health and I will heal you of your wounds.\" \"You shall be My people, and I will be your God.\"",
    v: [
      ["30:2", "Write all the words which I have spoken to you in a book", "God's promises recorded."],
      ["30:7", "The time of Jacob's distress, but he will be saved from it", "Rescue through trouble."],
      ["30:17", "I will restore you to health", "God heals."],
    ],
    refs: [["ISA.40", "Isaiah 40:1", "Comfort My people"], ["HOS.6", "Hosea 6:1", "He will heal us"]],
  },
  31: {
    intro: "\"I have loved you with an everlasting love; therefore I have drawn you with lovingkindness.\" Israel will be rebuilt with dancing. Rachel weeps for her children, but God says, \"Restrain your voice from weeping... there is hope for your future.\" Then the great promise: \"I will make a new covenant with the house of Israel... I will put My law within them and on their heart I will write it... for I will forgive their iniquity, and their sin I will remember no more.\"",
    v: [
      ["31:3", "I have loved you with an everlasting love", "God's unending love."],
      ["31:15", "Rachel is weeping for her children", "Matthew 2:18 applies this to Herod's slaughter."],
      ["31:31", "I will make a new covenant", "Jesus spoke of the new covenant at the Last Supper."],
      ["31:33", "I will put My law within them", "A changed heart."],
      ["31:34", "Their sin I will remember no more", "Complete forgiveness."],
    ],
    w: [["בְּרִית חֲדָשָׁה", "berit chadashah", "H1285, H2319", "new covenant", "The only place in the Old Testament with this exact phrase. Hebrews 8 quotes it in full, and \"New Testament\" comes from the Latin for \"new covenant.\"", ["halot", "thompsonJ"]]],
    refs: [["LUK.22", "Luke 22:20", "The new covenant in My blood"], ["HEB.8", "Hebrews 8:8-12", "The new covenant quoted"], ["MAT.2", "Matthew 2:18", "Rachel weeping"]],
  },
  32: {
    intro: "While Babylon besieges Jerusalem and Jeremiah is in prison, God tells him to buy a field in Anathoth from his cousin. He signs the deed before witnesses and seals it in a clay jar. \"Houses and fields and vineyards will again be bought in this land.\" Jeremiah prays, \"Nothing is too difficult for You.\" God answers, \"Is anything too difficult for Me?\"",
    v: [
      ["32:9", "I bought the field", "Investing in God's promise during disaster."],
      ["32:14", "Put them in an earthenware jar", "As the Dead Sea Scrolls were preserved."],
      ["32:17", "Nothing is too difficult for You", "Jeremiah's faith."],
      ["32:27", "Is anything too difficult for Me?", "God's answer."],
    ],
    bg: [["Clay seal impressions", "Archaeologists have found clay seal impressions (bullae) from Jeremiah's time, including ones naming Baruch son of Neriah, Jeremiah's scribe, and Gemariah son of Shaphan. Some scholars question the Baruch bullae's authenticity, but many seals from this period match names in Jeremiah.", "debated", ["kitchen", "lundbom"]]],
    refs: [["GEN.18", "Genesis 18:14", "Is anything too difficult for the LORD?"], ["LUK.1", "Luke 1:37", "Nothing will be impossible with God"]],
  },
  33: {
    intro: "\"Call to Me and I will answer you, and I will tell you great and mighty things, which you do not know.\" God will heal and restore the city; joy, gladness, and the voice of bride and groom will return. A righteous Branch will spring up for David. God's covenant with David is as sure as day and night.",
    v: [
      ["33:3", "Call to Me and I will answer you", "God invites prayer."],
      ["33:11", "Give thanks to the LORD of hosts, for the LORD is good", "Worship restored."],
      ["33:15", "A righteous Branch of David", "The Messiah promised again."],
      ["33:20-21", "If you can break My covenant for the day", "God's promises are sure."],
    ],
    refs: [["JER.23", "Jeremiah 23:5-6", "The righteous Branch"], ["LUK.1", "Luke 1:32-33", "The throne of David"]],
  },
  34: {
    intro: "During the siege, King Zedekiah and the people make a covenant to free their Hebrew slaves, as the law required. But when Babylon's army briefly withdraws, they take them back. God says: you proclaimed release and then broke it, so I proclaim a \"release\" for you to the sword, plague and famine.",
    v: [
      ["34:7", "Only Lachish and Azekah remained", "The last fortified cities of Judah still holding out."],
      ["34:8", "To proclaim release to them", "Doing right under pressure."],
      ["34:16", "You turned and profaned My name", "Broken promises."],
      ["34:18", "When they cut the calf in two and passed between its parts", "An ancient covenant rite: may I be cut in two if I break my word."],
    ],
    bg: [["The Lachish Letters", "Pottery letters found at Lachish in 1935 were written by an officer during this very siege. One says, \"we are watching for the signals of Lachish... for we cannot see Azekah,\" which suggests Azekah had just fallen, exactly as Jeremiah 34:7 describes the last two cities.", "strong", ["thompsonJ", "kitchen"]]],
    refs: [["GEN.15", "Genesis 15:9-18", "God passes between the pieces"], ["EXO.21", "Exodus 21:2", "Freedom in the seventh year"], ["DEU.15", "Deuteronomy 15:12-15", "Release your slaves"]],
  },
  35: {
    intro: "God sends Jeremiah to the Rechabites and offers them wine in the temple. They refuse, because their ancestor Jonadab commanded them not to drink wine or build houses, and they have obeyed for over two hundred years. God contrasts their faithfulness to a human father with Judah's refusal to obey God.",
    v: [
      ["35:6", "We will not drink wine", "Faithful to their family's command."],
      ["35:14", "But you have not listened to Me", "The contrast."],
      ["35:19", "Jonadab shall not lack a man to stand before Me always", "God honors faithfulness."],
    ],
    refs: [["2KI.10", "2 Kings 10:15-23", "Jonadab son of Rechab"]],
  },
  36: {
    intro: "God tells Jeremiah to write all His words on a scroll. Baruch writes as Jeremiah dictates and reads it in the temple. The officials take it to King Jehoiakim. As it is read, the king cuts off columns with a knife and throws them into the fire until the whole scroll is burned. God has Jeremiah write it again, with more added.",
    v: [
      ["36:2", "Take a scroll and write", "How the book of Jeremiah came to be written."],
      ["36:3", "Perhaps they will turn", "God's purpose: repentance."],
      ["36:23", "He would cut it with a scribe's knife and throw it into the fire", "Rejecting God's word."],
      ["36:32", "Many similar words were added to them", "God's word cannot be destroyed."],
    ],
    refs: [["ISA.40", "Isaiah 40:8", "The word of our God stands forever"], ["2TI.3", "2 Timothy 3:16", "All Scripture is inspired"]],
  },
  37: {
    intro: "Zedekiah asks Jeremiah to pray, hoping Egypt's army will save them. Jeremiah says Babylon will return. When Jeremiah tries to go to Benjamin to claim property, he is arrested as a deserter, beaten and put in a dungeon. Zedekiah secretly asks, \"Is there a word from the LORD?\" \"There is!\" You will be handed over to Babylon.",
    v: [
      ["37:3", "Please pray to the LORD our God on our behalf", "Wanting prayer, not obedience."],
      ["37:17", "Is there a word from the LORD?", "The king wants to know secretly."],
      ["37:21", "A loaf of bread daily", "God cares for His prophet."],
    ],
    refs: [["JER.21", "Jeremiah 21", "Zedekiah asks again"]],
  },
  38: {
    intro: "Officials say Jeremiah weakens soldiers' morale, and Zedekiah lets them throw him into a muddy cistern, where he sinks in the mire. Ebed-melech, an Ethiopian servant, pleads with the king and pulls Jeremiah out with ropes and old rags under his arms. Zedekiah meets him secretly, but is too afraid to obey.",
    v: [
      ["38:6", "Jeremiah sank into the mud", "Suffering for the truth."],
      ["38:12", "Put these worn-out clothes under your armpits", "Kindness in small details."],
      ["38:19", "I dread the Jews who have gone over", "Fear keeps the king from obeying."],
    ],
    refs: [["PSA.40", "Psalm 40:2", "He brought me up out of the miry clay"], ["JER.39", "Jeremiah 39:15-18", "God rewards Ebed-melech"]],
  },
  39: {
    intro: "In 586 BC Babylon breaks through Jerusalem's wall. Zedekiah flees, is captured, sees his sons killed, and is blinded and taken in chains to Babylon. The city is burned. Nebuchadnezzar orders that Jeremiah be treated well. God promises Ebed-melech, \"I will certainly deliver you... because you have trusted in Me.\"",
    v: [
      ["39:2", "The city wall was breached", "The end of Jerusalem."],
      ["39:7", "He blinded Zedekiah's eyes", "The last sight he saw was his sons' death."],
      ["39:18", "Because you have trusted in Me", "God remembers kindness."],
    ],
    bg: [["Nebuchadnezzar's officials", "A Babylonian tablet now in the British Museum names Nebo-sarsekim, chief official of Nebuchadnezzar, matching \"Sarsekim the Rab-saris\" in Jeremiah 39:3.", "strong", ["kitchen"]]],
    refs: [["2KI.25", "2 Kings 25:1-12", "Jerusalem falls"], ["EZK.12", "Ezekiel 12:13", "He will not see it, though he will die there"]],
  },
  40: {
    intro: "Jeremiah is released and chooses to stay in the land with Gedaliah, whom Babylon appoints governor. Scattered Judeans gather and harvest. Gedaliah is warned that Ishmael plans to kill him, but he does not believe it.",
    v: [
      ["40:4", "Go wherever it seems good", "Jeremiah chooses to stay with the poor."],
      ["40:9", "Serve the king of Babylon, that it may go well with you", "Gedaliah's counsel."],
    ],
    bg: [["Gedaliah's seal", "A clay seal impression reading \"belonging to Gedaliah, who is over the house\" was found at Lachish, and another with \"Gedaliah son of Pashhur\" in Jerusalem.", "good", ["kitchen"]]],
    refs: [["2KI.25", "2 Kings 25:22-26", "Gedaliah governor"]],
  },
  41: {
    intro: "Ishmael, of the royal family, murders Gedaliah at a meal, along with Judeans and Babylonian soldiers, and takes captives. Johanan pursues him and frees the captives. Afraid of Babylon's revenge, they plan to flee to Egypt.",
    v: [
      ["41:2", "Struck down Gedaliah", "Treachery at the table."],
      ["41:5", "Eighty men from Shechem, Shiloh and Samaria", "Mourners from the north still came with offerings to the house of the LORD, even with the temple in ruins."],
      ["41:9", "The cistern that King Asa had made", "Ishmael throws the bodies into an old royal cistern at Mizpah."],
      ["41:17", "To go into Egypt", "Fear drives them back to Egypt."],
    ],
    bg: [["Gedaliah and Mizpah", "Mizpah, Gedaliah's headquarters, is usually identified with Tell en-Nasbeh, north of Jerusalem, a town that kept going after Jerusalem fell. A clay seal impression found at Lachish reads \"Belonging to Gedaliah, who is over the house,\" probably the same man before he became governor.", "good", ["thompsonJ", "lundbom"]]],
    refs: [["2KI.25", "2 Kings 25:25-26", "Gedaliah's murder"]],
  },
  42: {
    intro: "The people ask Jeremiah to pray and promise to obey whatever God says. After ten days God answers: stay in the land and I will build you up; do not fear the king of Babylon. But if you go to Egypt, the sword you fear will overtake you there.",
    v: [
      ["42:6", "Whether it is pleasant or unpleasant, we will listen", "A promise soon broken."],
      ["42:10", "I will build you up and not tear you down", "God's offer."],
      ["42:11", "Do not be afraid of the king of Babylon", "Trust over fear."],
    ],
    refs: [["DEU.17", "Deuteronomy 17:16", "Never return to Egypt"], ["ISA.30", "Isaiah 30:1-3", "Woe to those who go to Egypt"]],
  },
  43: {
    intro: "The leaders accuse Jeremiah of lying and take the remnant, including Jeremiah and Baruch, to Egypt, to Tahpanhes. There Jeremiah buries large stones in the pavement at Pharaoh's palace and announces that Nebuchadnezzar will set his throne over them.",
    v: [
      ["43:2", "You are telling a lie!", "Rejecting an unwelcome answer."],
      ["43:10", "I will set his throne right over these stones", "Egypt will not be safe."],
    ],
    bg: [["Nebuchadnezzar in Egypt", "A Babylonian text records Nebuchadnezzar's campaign against Egypt in his 37th year (568/567 BC), fitting Jeremiah's warning.", "good", ["kitchen", "thompsonJ"]]],
    refs: [["JER.42", "Jeremiah 42", "Their promise"]],
  },
  44: {
    intro: "In Egypt the Judeans burn incense to the \"queen of heaven.\" Jeremiah warns them, but they answer that things went well when they worshiped her and badly when they stopped. Jeremiah says the disaster came because of that very idolatry. Only a few will escape to return to Judah.",
    v: [
      ["44:17", "Burn sacrifices to the queen of heaven", "Probably the goddess Ishtar or Astarte."],
      ["44:18", "Since we stopped... we have lacked everything", "Drawing the wrong lesson."],
      ["44:28", "They will know whose word will stand, Mine or theirs", "God's word stands."],
    ],
    refs: [["JER.7", "Jeremiah 7:18", "Cakes for the queen of heaven"]],
  },
  45: {
    intro: "A short word for Baruch, Jeremiah's scribe, who feels weary and sorrowful. God says He is tearing down what He built. \"But you, are you seeking great things for yourself? Do not seek them... but I will give your life to you as a prize of war in all the places where you may go.\"",
    v: [
      ["45:1", "In the fourth year of Jehoiakim", "605 BC, the year Baruch wrote Jeremiah's scroll (chapter 36). This word is placed late in the book but was given early."],
      ["45:3", "I am weary with my groaning", "Even faithful helpers grow tired."],
      ["45:5", "Are you seeking great things for yourself?", "Be content with God's care."],
    ],
    bg: [["Baruch's seal", "Baruch son of Neriah was a professional scribe from a leading family (his brother Seraiah served the king, 51:59). Clay seal impressions reading \"Belonging to Berekhyahu son of Neriyahu the scribe\" have been published. Some scholars question whether they are genuine, since they came through the antiquities market rather than an excavation.", "debated", ["thompsonJ", "lundbom"]]],
    refs: [["JER.36", "Jeremiah 36:4", "Baruch writes the scroll"], ["MAT.6", "Matthew 6:33", "Seek first His kingdom"], ["PHP.4", "Philippians 4:11-13", "Content in every situation"]],
  },
  46: {
    intro: "The oracles against the nations begin (46-51). Egypt is defeated by Babylon at Carchemish in 605 BC: \"The swift man cannot flee.\" Egypt will be judged, \"but you, O Jacob My servant, do not fear... for I am with you.\"",
    v: [
      ["46:2", "At Carchemish", "A turning point in world history."],
      ["46:28", "O Jacob My servant, do not fear", "God's people kept even as nations fall."],
    ],
    bg: [["Battle of Carchemish", "The Babylonian Chronicle (British Museum) records Nebuchadnezzar's victory over Egypt at Carchemish in 605 BC, which made Babylon the leading power.", "strong", ["kitchen", "thompsonJ"]]],
    refs: [["2KI.24", "2 Kings 24:7", "Egypt did not come out again"], ["ISA.41", "Isaiah 41:10", "Do not fear, I am with you"]],
  },
  47: {
    intro: "An oracle against the Philistines. Waters rise from the north like a flood. \"Ah, sword of the LORD, how long will you not be quiet?\"",
    v: [
      ["47:1", "Before Pharaoh struck down Gaza", "Egypt also attacked the Philistine coast in these years, so the little Philistine cities were caught between two great powers."],
      ["47:2", "Waters are rising out of the north", "Babylon's army is pictured as a flood pouring down the coast."],
      ["47:4", "The remnant of the coastland of Caphtor", "The Philistines had come from Caphtor, usually identified with Crete and the Aegean islands (Amos 9:7)."],
      ["47:6-7", "Ah, sword of the LORD", "Judgment pictured as a sword. It cannot rest, because the LORD Himself has given it its task."],
    ],
    bg: [["Ashkelon falls", "The Babylonian Chronicle records that Nebuchadnezzar captured and destroyed Ashkelon in 604 BC. Excavations at Ashkelon found a thick layer of burned ruins from that same year, with scattered pottery, loose arrowheads and the skeleton of a woman caught in the attack.", "strong", ["lundbom", "kitchen"]]],
    refs: [["EZK.25", "Ezekiel 25:15-17", "Against the Philistines"], ["AMO.9", "Amos 9:7", "The Philistines from Caphtor"], ["ZEP.2", "Zephaniah 2:4-7", "Gaza and Ashkelon"]],
  },
  48: {
    intro: "A long lament over Moab, proud and complacent \"like wine left on its dregs.\" Its cities, gods and pride will fall. Even so, God says, \"I will restore the fortunes of Moab in the latter days.\"",
    v: [
      ["48:7", "Chemosh will go off into exile", "Even Moab's god is carried away. The Moabite Stone names Chemosh as Moab's god."],
      ["48:11", "Like wine on its dregs", "Never shaken, never changed."],
      ["48:13", "Moab will be ashamed of Chemosh, as Israel was ashamed of Bethel", "Both trusted false worship and were let down."],
      ["48:29", "We have heard of the pride of Moab", "Pride is the root."],
      ["48:47", "I will restore the fortunes of Moab", "Mercy beyond judgment."],
    ],
    bg: [["Like wine on its dregs", "Wine was poured from jar to jar to separate it from its sediment. Wine left on its dregs grows thick and sour. Moab had never been \"poured out\" into exile, so it stayed complacent and unchanged. Zephaniah uses the same picture for careless Judah (Zephaniah 1:12).", "good", ["thompsonJ", "huey"]]],
    refs: [["ZEP.1", "Zephaniah 1:12", "Men stagnant on their dregs"], ["ISA.16", "Isaiah 16:6", "The pride of Moab"], ["RUT.1", "Ruth 1:22", "Ruth the Moabitess"]],
  },
  49: {
    intro: "Oracles against Ammon, Edom, Damascus, Kedar and Hazor, and Elam. Edom trusted in its rocky heights, but \"though you make your nest as high as an eagle's, I will bring you down.\" Even so, God promises to restore the fortunes of Ammon and Elam.",
    v: [
      ["49:11", "Leave your orphans behind, I will keep them alive", "God's care for widows and orphans."],
      ["49:16", "Though you make your nest as high as an eagle's", "Echoes Obadiah 4."],
      ["49:39", "I will restore the fortunes of Elam", "Elamites were at Pentecost (Acts 2:9)."],
    ],
    refs: [["OBA.1", "Obadiah 1-4", "Edom brought down"], ["ACT.2", "Acts 2:9", "Elamites at Pentecost"]],
  },
  50: {
    intro: "Babylon, the great conqueror, will itself be conquered by a nation from the north. \"Babylon has been captured... her images have been put to shame.\" Israel and Judah will come weeping to seek the LORD and join themselves in an everlasting covenant. \"Their Redeemer is strong, the LORD of hosts is His name.\"",
    v: [
      ["50:2", "Babylon has been captured", "Fulfilled when Cyrus took Babylon in 539 BC."],
      ["50:5", "An everlasting covenant that will not be forgotten", "God's people return."],
      ["50:34", "Their Redeemer is strong", "God will plead their case."],
    ],
    refs: [["ISA.13", "Isaiah 13", "Babylon's fall"], ["REV.18", "Revelation 18", "Babylon the great is fallen"]],
  },
  51: {
    intro: "More on Babylon's fall: \"Babylon has been a golden cup in the hand of the LORD,\" but she will suddenly fall and be broken. \"Come forth from her midst, My people.\" Jeremiah writes these words on a scroll and has Seraiah read it in Babylon, tie a stone to it and throw it into the Euphrates: \"Just so shall Babylon sink down and not rise again.\"",
    v: [
      ["51:7", "A golden cup in the hand of the LORD", "Babylon was God's tool for a time."],
      ["51:45", "Come forth from her midst, My people", "Echoed in Revelation 18:4."],
      ["51:63-64", "Throw it into the middle of the Euphrates", "Babylon will sink."],
    ],
    refs: [["REV.18", "Revelation 18:4, 21", "Come out of her, My people; a great millstone"], ["ISA.47", "Isaiah 47", "Babylon's humiliation"]],
  },
  52: {
    intro: "A historical appendix, much like 2 Kings 24-25: Zedekiah's rebellion, Jerusalem's fall, the burning of the temple, the bronze pillars broken and carried off, and the numbers taken to Babylon. The book ends with a gleam of hope: in 561 BC, King Evil-merodach releases Jehoiachin from prison and gives him a place at the king's table for the rest of his life.",
    v: [
      ["52:13", "He burned the house of the LORD", "The temple destroyed."],
      ["52:31", "Showed favor to Jehoiachin king of Judah", "David's line survives."],
      ["52:33", "He ate bread in the king's presence regularly", "A small sign God's promise is alive."],
    ],
    bg: [["Jehoiachin's rations", "Clay tablets found in Babylon list oil rations for \"Ya'ukin, king of the land of Yahud\" and his sons, confirming that Jehoiachin lived as a royal captive in Babylon.", "strong", ["kitchen", "thompsonJ"]]],
    refs: [["2KI.25", "2 Kings 25:27-30", "The same ending"], ["2SA.9", "2 Samuel 9:7", "Eating at the king's table"]],
  },
});
