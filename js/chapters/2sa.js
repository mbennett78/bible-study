// 2 Samuel chapter notes.
import { makeBook } from "./make.js";

const sources = {
  bergen: "Robert D. Bergen, 1, 2 Samuel, New American Commentary 7 (Broadman & Holman, 1996).",
  baldwin: "Joyce G. Baldwin, 1 and 2 Samuel, Tyndale Old Testament Commentaries (InterVarsity Press, 1988).",
  anderson: "A. A. Anderson, 2 Samuel, Word Biblical Commentary 11 (Word, 1989).",
  gordon: "Robert P. Gordon, 1 and 2 Samuel: A Commentary (Paternoster, 1986).",
  kitchen: "K. A. Kitchen, On the Reliability of the Old Testament (Eerdmans, 2003).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["bergen", "baldwin"] }, {
  1: {
    intro: "An Amalekite brings David Saul's crown, claiming he killed Saul at Saul's request. Instead of rewarding him, David has him executed for striking the LORD's anointed. Then David mourns with a moving lament for Saul and Jonathan: \"How have the mighty fallen!\"",
    v: [
      ["1:10", "I killed him", "His story differs from 1 Samuel 31. He likely lied, hoping for a reward."],
      ["1:16", "Your blood is on your head", "An Amalekite claimed he killed Saul, expecting a reward. David had him put to death for striking the LORD's anointed, honoring Saul even in death."],
      ["1:23", "Saul and Jonathan, beloved and pleasant", "In his lament for Saul and Jonathan, David speaks only good of Saul, the man who hunted him for years."],
      ["1:26", "My brother Jonathan", "\"Your love to me was more wonderful than the love of women,\" the deep loyalty of a covenant friend."],
    ],
    bg: [["The Book of Jashar", "David's lament for Saul and Jonathan, \"How have the mighty fallen!\" (1:19, 25, 27), was written in the Book of Jashar (1:18), an old collection of songs also quoted in Joshua 10:13. That book is now lost. David mourns even the king who hunted him.", "good", ["bergen", "anderson"]]],
    refs: [["1SA.31", "1 Samuel 31", "Saul's death"], ["ROM.12", "Romans 12:15", "Weep with those who weep"]],
  },
  2: {
    intro: "David asks God and moves to Hebron, where Judah anoints him king. Abner, Saul's general, makes Saul's son Ish-bosheth king over the rest of Israel. A long war begins between the two houses. In a battle at Gibeon, Abner kills Asahel, brother of Joab.",
    v: [
      ["2:1", "David inquired of the LORD", "After Saul's death, David asked the LORD whether to go up to Judah and where. He began his reign by asking God."],
      ["2:4", "They anointed David king over Judah", "The men of Judah anointed David king over Judah at Hebron. Samuel had anointed him privately years before (1 Samuel 16:13)."],
      ["2:26", "Shall the sword devour forever?", "After much bloodshed between Saul's and David's men, Abner calls to Joab: must the sword devour forever? Joab agrees to stop."],
    ],
    bg: [["The pool of Gibeon", "The men of David and of Saul's son Ish-bosheth met \"by the pool of Gibeon\" (2:13). Archaeologists at Gibeon found a huge round shaft cut into the rock, with a spiral stairway leading down to water, and jar handles stamped with the city's name.", "strong", ["bergen", "kitchen"]]],
    refs: [["1CH.11", "1 Chronicles 11:1-3", "David anointed at Hebron"]],
  },
  3: {
    intro: "David's house grows stronger, and six sons are born to him in Hebron. Abner quarrels with Ish-bosheth and offers to bring all Israel over to David. But Joab, avenging his brother Asahel, murders Abner. David publicly mourns and declares himself innocent.",
    v: [
      ["3:1", "David grew steadily stronger", "The war between the house of Saul and the house of David was long. David grew stronger and stronger as God's promise slowly unfolded."],
      ["3:27", "Joab struck him", "Abner came to make peace and bring all Israel to David. Joab murdered him to avenge his brother, undoing David's peace plan."],
      ["3:39", "I am weak today, though anointed king", "David mourns Abner publicly. He admits he is weak that day, though anointed king, and cannot control the harsh sons of Zeruiah."],
    ],
    bg: [["Murder at the gate", "Joab took Abner aside \"in the middle of the gate\" of Hebron and killed him to avenge his brother (3:27). City gates had side rooms where people met and did business. David publicly mourned Abner, and the people saw he had no part in it (3:36-37).", "good", ["bergen", "gordon"]]],
    refs: [["1KI.2", "1 Kings 2:5-6", "David remembers Joab's murders"]],
  },
  4: {
    intro: "Two of Ish-bosheth's captains murder him in his bed and bring his head to David, expecting a reward. David has them executed. The chapter also introduces Jonathan's son Mephibosheth, lame since childhood.",
    v: [
      ["4:4", "Mephibosheth", "Dropped by his nurse as she fled, at age five."],
      ["4:5-6", "In the heat of the day", "They struck while Ish-bosheth lay resting at noon, a coward's attack."],
      ["4:9", "As the LORD lives, who has redeemed my life", "David trusts God to give him the throne, not murderers."],
    ],
    bg: [["A kingdom east of the Jordan", "After Saul's death, Abner made Ish-bosheth king at Mahanaim, east of the Jordan, away from the Philistines (2 Samuel 2:8-9). With Abner dead, the kingdom had no real strength left. David honored Ish-bosheth even in death, burying his head in Abner's tomb at Hebron (4:12).", "good", ["bergen", "baldwin"]]],
    refs: [["2SA.1", "2 Samuel 1:14-16", "David's like response to Saul's killer"], ["2SA.9", "2 Samuel 9", "David's kindness to Mephibosheth"]],
  },
  5: {
    intro: "All the tribes come to Hebron and anoint David king over all Israel. He captures Jerusalem from the Jebusites, makes it his capital, the City of David, and defeats the Philistines twice, asking God before each battle.",
    v: [
      ["5:2", "You will shepherd My people", "All Israel's tribes come to make David king, recalling the LORD's word: you will shepherd My people Israel. A king is meant to be a shepherd."],
      ["5:4", "Thirty years old", "He reigns forty years, seven in Hebron and thirty-three in Jerusalem."],
      ["5:8", "The water tunnel", "David's men may have entered through Jerusalem's water shaft."],
      ["5:10", "The LORD God of hosts was with him", "David became greater and greater, because the LORD God of hosts was with him."],
    ],
    bg: [["The house of David", "An Aramaic inscription found at Tel Dan in 1993, from about 840 BC, mentions the \"house of David,\" the earliest reference to David outside the Bible.", "strong", ["kitchen"]]],
    refs: [["1CH.11", "1 Chronicles 11:1-9", "David takes Jerusalem"], ["PSA.78", "Psalm 78:70-72", "To shepherd Jacob His people"]],
  },
  6: {
    intro: "David brings the ark toward Jerusalem on a new cart. When the oxen stumble, Uzzah reaches out to steady it and is struck dead. David, angry and afraid, leaves the ark at Obed-edom's house for three months. Then he brings it up properly, dancing before the LORD with all his might. His wife Michal despises him for it.",
    v: [
      ["6:3", "A new cart", "The Philistines' method (1 Samuel 6), not God's. The Levites were to carry it on poles."],
      ["6:7", "God struck him", "God's holiness is real. 1 Chronicles 15:13 says, \"we did not seek Him according to the ordinance.\""],
      ["6:14", "David was dancing with all his might", "As the ark was brought into Jerusalem, David, wearing a simple linen ephod, danced before the LORD with all his might. His worship was joyful and wholehearted."],
      ["6:22", "I will be more lightly esteemed than this", "David cares more about God's honor than his own dignity."],
    ],
    bg: [["Dancing before the ark", "When the ark finally came into Jerusalem, David danced \"with all his might\" wearing a simple linen ephod, like a priest rather than a king (6:14). Michal despised him for it, but David said he would celebrate before the LORD (6:21-22).", "good", ["bergen", "baldwin"]]],
    w: [["אֵפוֹד", "ephod", "H646", "ephod", "A linen garment like a vest or apron, worn by priests. The high priest's ephod was richly decorated (Exodus 28:6). The boy Samuel wore a simple linen one (1 Samuel 2:18).", ["halot", "anderson"]]],
    refs: [["1CH.15", "1 Chronicles 15:2, 13-15", "Carried by the Levites"], ["PSA.24", "Psalm 24:7-10", "Lift up your heads, O gates"], ["PSA.132", "Psalm 132", "David's vow for the ark"]],
  },
  7: {
    intro: "David wants to build a house (temple) for God. Through the prophet Nathan, God answers that He will build David a house: a dynasty. David's son will build the temple, and \"your house and your kingdom shall endure before Me forever; your throne shall be established forever.\" David sits before the LORD in humble, amazed prayer.",
    v: [
      ["7:11", "The LORD will make a house for you", "A wordplay: David's \"house\" means his family line."],
      ["7:14", "I will be a father to him", "God promises David a son whose throne will last forever: I will be his father, and he will be My son. Hebrews 1:5 applies this to Jesus."],
      ["7:16", "Your throne shall be established forever", "The Davidic covenant. Gabriel told Mary her Son would receive \"the throne of His father David\" (Luke 1:32-33)."],
      ["7:18", "Who am I, O Lord GOD?", "David's response is humility and worship."],
    ],
    bg: [["\"The house of David\" in stone", "God promised David a lasting house, a dynasty (7:16). In 1993, a stone inscription found at Tel Dan in northern Israel, from the 800s BC, mentions a king of \"the house of David.\" It is the earliest mention of David outside the Bible.", "strong", ["bergen", "kitchen"]]],
    w: [["בַּיִת", "bayit", "H1004", "house", "A wordplay runs through the chapter. David wants to build God a house (a temple), but God says He will build David a house (a family line of kings).", ["halot", "gordon"]]],
    refs: [["LUK.1", "Luke 1:32-33", "The throne of His father David"], ["PSA.89", "Psalm 89:3-4", "I have sworn to David"], ["ACT.2", "Acts 2:29-36", "Peter on David's descendant"], ["HEB.1", "Hebrews 1:5", "I will be a Father to Him"]],
  },
  8: {
    intro: "David defeats the Philistines, Moabites, Arameans, Edomites and others, and his kingdom expands. \"The LORD helped David wherever he went.\" He reigns with justice and righteousness for all his people. His officials are listed.",
    v: [
      ["8:6", "The LORD helped David wherever he went", "David defeated the nations around Israel. The writer says twice that the LORD gave David victory wherever he went (8:6, 14)."],
      ["8:11", "Dedicated to the LORD", "David gives the spoils to God, later used for the temple."],
      ["8:15", "Justice and righteousness for all his people", "David reigned over all Israel and did what was just and right for all his people, the picture of a godly king."],
    ],
    bg: [["David's kingdom grows", "David defeated the Philistines, Moab, Edom, Ammon and the Arameans of Zobah and Damascus (8:1-14). For a short time, between the decline of Egypt and the rise of Assyria, Israel was the strongest kingdom in the region.", "good", ["bergen", "kitchen"]]],
    refs: [["1CH.18", "1 Chronicles 18", "David's victories"], ["PSA.60", "Psalm 60", "Written when David fought Aram and Edom"]],
  },
  9: {
    intro: "David asks, \"Is there yet anyone left of the house of Saul, that I may show him kindness for Jonathan's sake?\" He finds Jonathan's lame son Mephibosheth, restores Saul's land to him, and gives him a permanent place at the king's table.",
    v: [
      ["9:3", "The kindness of God", "David shows hesed, God-like covenant love."],
      ["9:8", "A dead dog like me", "Mephibosheth expected judgment and received grace."],
      ["9:13", "He ate at the king's table regularly", "A beautiful picture of grace: welcomed as a son."],
    ],
    bg: [["A seat at the king's table", "Mephibosheth, Jonathan's son, was lame in both feet and expected nothing from the new king; the old king's family often had reason to fear. David gave back his grandfather's land and said, \"You shall eat at my table regularly\" (9:7), out of kindness for Jonathan's sake.", "good", ["bergen", "baldwin"]]],
    refs: [["1SA.20", "1 Samuel 20:14-17", "David's promise to Jonathan"], ["LUK.14", "Luke 14:13", "Invite the poor, the crippled"], ["EPH.2", "Ephesians 2:19", "Members of God's household"]],
  },
  10: {
    intro: "David sends envoys to comfort the new Ammonite king after his father's death. The Ammonites humiliate them, shaving half their beards and cutting their robes. War follows; Joab and Abishai defeat the Ammonites and their Aramean allies.",
    v: [
      ["10:2", "I will show kindness", "When the king of Ammon died, David sent men to comfort his son Hanun, as his father had been kind to David. Hanun's advisers called it spying."],
      ["10:5", "Stay at Jericho until your beards grow", "Hanun shaved off half of each envoy's beard and cut their clothes, a terrible insult. David told them to stay in Jericho until their beards grew back, protecting their dignity."],
      ["10:12", "Be strong, and let us show ourselves courageous", "\"And may the LORD do what is good in His sight.\""],
    ],
    bg: [["Half-shaved beards", "The Ammonite king shaved off half of each of David's envoys' beards and cut their robes short (10:4), a deep public shame. Rabbah, the Ammonite capital, is today's Amman, the capital of Jordan.", "good", ["bergen", "anderson"]]],
    refs: [["1CH.19", "1 Chronicles 19", "The same war"]],
  },
  11: {
    intro: "In spring, when kings go to war, David stays home. From his roof he sees Bathsheba bathing, sends for her and sleeps with her, though she is the wife of Uriah, one of his loyal soldiers. She becomes pregnant. David tries to cover it up, and when Uriah will not go home, David arranges for him to die in battle. \"But the thing that David had done was evil in the sight of the LORD.\"",
    v: [
      ["11:1", "David stayed at Jerusalem", "In spring, when kings went to war, David sent Joab and stayed home in Jerusalem. He was idle at the wrong time and in the wrong place."],
      ["11:4", "David sent messengers and took her", "David sent messengers and took Bathsheba, the wife of one of his soldiers. The king used his power for wrong."],
      ["11:11", "Shall I then go to my house?", "Uriah, a foreigner, is more faithful than the king."],
      ["11:27", "Evil in the sight of the LORD", "David married Bathsheba after arranging Uriah's death, thinking the matter was covered. But what David had done displeased the LORD."],
    ],
    bg: [["When kings go to war", "Battles were usually fought in spring, after the winter rains, when roads were dry and grain was available. \"At the time when kings go out to battle,\" David stayed home (11:1). Houses had flat roofs where people walked in the cool of evening.", "good", ["bergen", "gordon"]]],
    refs: [["PSA.51", "Psalm 51", "David's prayer of repentance"], ["JAS.1", "James 1:14-15", "Lust gives birth to sin"], ["MAT.1", "Matthew 1:6", "By her who had been the wife of Uriah"]],
  },
  12: {
    intro: "God sends Nathan to tell David a story of a rich man who stole a poor man's only lamb. David is furious, and Nathan says, \"You are the man!\" David confesses, \"I have sinned against the LORD.\" Nathan says God has taken away his sin, but the sword will not depart from his house, and the child will die. David fasts and prays; when the child dies, he worships. Later Solomon is born, whom God loves.",
    v: [
      ["12:7", "You are the man", "Nathan tells a story of a rich man who stole a poor man's only lamb. David is furious, and Nathan says: you are the man. A brave prophet confronts a king."],
      ["12:13", "I have sinned against the LORD", "David's confession is immediate and real; Psalm 51 records it."],
      ["12:13", "The LORD also has taken away your sin", "Forgiveness, though consequences remain."],
      ["12:23", "I will go to him, but he will not return to me", "Many find comfort here about children who die."],
      ["12:24-25", "Jedidiah", "Solomon's other name, \"beloved of the LORD.\""],
    ],
    bg: [["\"You are the man!\"", "Nathan told David a story about a rich man who stole a poor man's only lamb, and David angrily condemned him. \"You are the man!\" (12:7). Psalm 51 is headed as David's prayer after Nathan came to him.", "strong", ["bergen", "baldwin"]]],
    refs: [["PSA.51", "Psalm 51", "Create in me a clean heart"], ["PSA.32", "Psalm 32:1-5", "How blessed is he whose transgression is forgiven"]],
  },
  13: {
    intro: "David's son Amnon desires his half-sister Tamar, tricks her and violates her, then hates her. David is angry but does nothing. Tamar's full brother Absalom waits two years, then has Amnon killed at a feast and flees to his grandfather in Geshur.",
    v: [
      ["13:15", "The hatred was greater than the love", "After Amnon forced himself on his half-sister Tamar, he hated her more than he had \"loved\" her. What he called love was lust."],
      ["13:21", "He was very angry", "But David did not act. The Greek translation adds that he would not punish his firstborn because he loved him."],
      ["13:37-39", "David mourned for his son", "The sword Nathan spoke of has entered David's house."],
    ],
    bg: [["Tamar's robe", "Tamar wore \"a long-sleeved garment,\" the kind worn by the king's unmarried daughters (13:18). The Hebrew is the same as Joseph's famous coat (Genesis 37:3). Tamar tore it in grief.", "strong", ["bergen", "anderson"]]],
    w: [["כְּתֹנֶת", "ketonet", "H3801", "tunic, robe", "A long garment. With \"passim\" it describes a special robe, perhaps long-sleeved or richly colored, worn only by Joseph and Tamar in the Bible.", ["halot", "gordon"]]],
    refs: [["2SA.12", "2 Samuel 12:10", "The sword shall never depart from your house"]],
  },
  14: {
    intro: "Joab sends a wise woman from Tekoa with a made-up story to persuade David to bring Absalom home. David agrees, but refuses to see Absalom for two years. Absalom, handsome and admired, forces a meeting by burning Joab's field. The king kisses him.",
    v: [
      ["14:14", "God devises plans so that the banished one will not be cast out", "A beautiful line about God's mercy, spoken by the wise woman."],
      ["14:25", "No one as handsome as Absalom", "No one in Israel was praised for his good looks like Absalom, flawless from head to foot. Outward appearance can be misleading."],
      ["14:33", "The king kissed Absalom", "After years of exile and two more years in Jerusalem, Absalom finally sees the king, who kisses him. It is a reconciliation in form, not in heart."],
    ],
    bg: [["The wise woman of Tekoa", "Joab sent for a wise woman from Tekoa, a town in the hills south of Bethlehem, to tell David a made-up story that would move him to bring Absalom home (14:2-20). Tekoa was later the home of the prophet Amos.", "good", ["bergen", "baldwin"]]],
    refs: [["1SA.16", "1 Samuel 16:7", "The LORD looks at the heart"]],
  },
  15: {
    intro: "Absalom wins the hearts of Israel by sitting at the gate and promising justice. After four years he declares himself king in Hebron. David flees Jerusalem, weeping, barefoot, up the Mount of Olives. He sends the ark back: \"If I find favor in the sight of the LORD, He will bring me back.\" He sends his friend Hushai to confuse Absalom's advisers.",
    v: [
      ["15:6", "Absalom stole away the hearts", "Absalom stood by the city gate, flattering people and promising justice. In this way he stole the hearts of the men of Israel."],
      ["15:21", "Wherever my lord the king may be", "Ittai, a foreigner from Gath, refuses to leave David: wherever my lord the king is, in life or death, there your servant will be."],
      ["15:26", "Let Him do to me as seems good", "Sending the ark back to Jerusalem, David says: if God no longer delights in me, let Him do to me as seems good to Him."],
      ["15:31", "Make the counsel of Ahithophel foolishness", "Told that his wise adviser Ahithophel had joined Absalom, David prays that God would turn his counsel into foolishness, then sends Hushai to help (15:32-34)."],
    ],
    bg: [["Weeping on the Mount of Olives", "Absalom stood at the city gate and stole the hearts of the people (15:6). When David fled Jerusalem, he went up the Mount of Olives weeping, barefoot, his head covered (15:30). Centuries later, the Son of David also wept and prayed on that mountain.", "good", ["bergen", "gordon"]]],
    refs: [["PSA.3", "Psalm 3", "When he fled from Absalom his son"], ["LUK.22", "Luke 22:39-44", "Jesus on the Mount of Olives"]],
  },
  16: {
    intro: "Ziba, Mephibosheth's servant, brings David supplies and accuses his master of disloyalty. Shimei of Saul's family curses David and throws stones. David refuses to let Abishai kill him: \"Perhaps the LORD will look on my affliction.\" In Jerusalem, Ahithophel advises Absalom to take David's concubines publicly.",
    v: [
      ["16:11", "Let him alone and let him curse", "Shimei curses and throws stones at the fleeing king. David stops his men from killing him: let him curse, perhaps the LORD has told him to."],
      ["16:12", "The LORD will return good to me", "David hopes that the LORD will see his distress and repay him with good for the cursing he receives."],
      ["16:22", "In the sight of all Israel", "Absalom took his father's concubines publicly on the palace roof. Nathan's warning to David came true (12:11-12)."],
    ],
    bg: [["Shimei throws stones", "At Bahurim, a man from Saul's family named Shimei cursed David and threw stones and dust at him. David would not let his men kill him: \"Perhaps the LORD will look on my affliction\" (16:12).", "good", ["bergen", "baldwin"]]],
    refs: [["1PE.2", "1 Peter 2:23", "While being reviled, He did not revile in return"], ["2SA.12", "2 Samuel 12:11-12", "Nathan's warning"]],
  },
  17: {
    intro: "Ahithophel advises attacking David at once. Hushai gives different advice, to gather all Israel first, and Absalom follows it, \"for the LORD had ordained to thwart the good counsel of Ahithophel.\" Priests' sons carry warning to David, who crosses the Jordan. Ahithophel goes home and hangs himself.",
    v: [
      ["17:14", "The LORD had ordained it", "Absalom chose Hushai's advice over Ahithophel's good advice, because the LORD had decided to defeat it. God answered David's prayer (15:31)."],
      ["17:23", "He set his house in order and strangled himself", "A sad end for a once-trusted adviser. Ahithophel was probably Bathsheba's grandfather (11:3; 23:34)."],
      ["17:27-29", "Barzillai and others brought food", "In the wilderness, Shobi, Machir and old Barzillai brought beds, bowls, grain, beans, honey and cheese for David and his weary people."],
    ],
    bg: [["Ahithophel's counsel", "Ahithophel's advice was treated like the word of God (16:23), but God turned it aside through Hushai (17:14). Some scholars think Ahithophel was Bathsheba's grandfather, since her father Eliam is called the son of Ahithophel (11:3; 23:34), which might explain why he turned against David.", "good", ["bergen", "anderson"]]],
    refs: [["PSA.41", "Psalm 41:9", "My close friend has lifted up his heel against me"], ["MAT.27", "Matthew 27:5", "Judas hanged himself"]],
  },
  18: {
    intro: "David's army fights Absalom's in the forest of Ephraim. David asks his commanders to deal gently with Absalom. Absalom's hair catches in an oak, and he hangs there; Joab kills him against David's orders. When David hears, he weeps: \"O my son Absalom, my son, my son Absalom! Would I had died instead of you.\"",
    v: [
      ["18:5", "Deal gently for my sake with the young man", "Before the battle, David orders his commanders in front of everyone: deal gently with the young man Absalom for my sake."],
      ["18:9", "His head caught fast in the oak", "Riding under a large oak, Absalom's head caught in its branches and his mule ran on. Many think his famous long hair (14:26) tangled there."],
      ["18:33", "Would I had died instead of you", "One of the most heartbreaking cries in the Bible."],
    ],
    bg: [["Absalom's monument", "Absalom had set up a pillar for himself in the King's Valley because he had no son (18:18). The monument in Jerusalem's Kidron Valley called \"Absalom's Tomb\" today was built about a thousand years later and has no real link to him.", "strong", ["bergen", "kitchen"]]],
    refs: [["LUK.15", "Luke 15:20", "The father's love for the prodigal"], ["ROM.5", "Romans 5:8", "While we were yet sinners, Christ died for us"]],
  },
  19: {
    intro: "Joab rebukes David for mourning while his men risk their lives for him. David returns to Jerusalem. He pardons Shimei, hears Mephibosheth's side, and thanks old Barzillai. Tension flares between Judah and the northern tribes over who will bring the king home.",
    v: [
      ["19:7", "Go out and speak kindly to your servants", "A leader must care for those who stood by him."],
      ["19:23", "You shall not die", "David shows mercy on a day of celebration."],
      ["19:30", "Let him take it all", "Mephibosheth cares only that the king is safe."],
    ],
    bg: [["Barzillai", "Barzillai, a wealthy man of Gilead, had fed David and his men in their flight. At eighty he declined to go to Jerusalem and asked David to take Chimham instead (19:32-38). David never forgot such loyalty (1 Kings 2:7).", "good", ["bergen", "baldwin"]]],
    refs: [["2SA.9", "2 Samuel 9", "David and Mephibosheth"]],
  },
  20: {
    intro: "Sheba, a troublemaker, leads the northern tribes in revolt. Joab murders Amasa, his rival, and pursues Sheba to the city of Abel. A wise woman of the city persuades the people to throw Sheba's head over the wall, and the city is saved.",
    v: [
      ["20:1", "We have no portion in David", "The same cry the north will raise at the kingdom's split (1 Kings 12:16)."],
      ["20:10", "Joab struck him", "Joab greeted Amasa, David's new commander, as if to kiss him and stabbed him with a hidden dagger. Joab's violence continued."],
      ["20:19", "A mother in Israel", "A wise woman saves her city through calm words."],
    ],
    bg: [["A wise woman saves her city", "Joab besieged Sheba the rebel in Abel Beth-maacah, in the far north. A wise woman called from the wall, bargained for her city, and the people threw Sheba's head over the wall instead (20:16-22). Wisdom saved a whole town.", "good", ["bergen", "gordon"]]],
    refs: [["1KI.12", "1 Kings 12:16", "To your tents, O Israel"], ["ECC.9", "Ecclesiastes 9:14-16", "Wisdom is better than strength"]],
  },
  21: {
    intro: "A three-year famine comes because Saul broke Israel's oath to the Gibeonites. David hands over seven of Saul's descendants to them, but spares Mephibosheth. Rizpah, mother of two of them, guards the bodies from birds and beasts for months, and David then buries Saul and Jonathan's bones. Four Philistine giants are killed by David's men.",
    v: [
      ["21:1", "David sought the presence of the LORD", "After three years of famine, David sought the face of the LORD to ask why. God answered that it was because of Saul's bloodshed against the Gibeonites."],
      ["21:7", "The king spared Mephibosheth", "The king spared Mephibosheth, Jonathan's son, because of the oath before the LORD between David and Jonathan."],
      ["21:10", "Rizpah", "A grieving mother's long vigil moves the king."],
    ],
    why: "2 Samuel 21:19 says Elhanan killed \"Goliath the Gittite,\" while 1 Samuel 17 says David did. How do these fit?",
    views: [
      ["Goliath's brother", "1 Chronicles 20:5 says Elhanan killed \"Lahmi the brother of Goliath.\" Many hold that 2 Samuel's copy lost a word in copying.", ["bergen", "kitchen"]],
      ["Another giant with the same name", "Others suggest Goliath was a family name or title, used for more than one giant from Gath.", ["baldwin"]],
    ],
    common: "Both views hold that David killed the giant of 1 Samuel 17, and that God gave David's men victory over the giants of Gath.",
    bg: [["Rizpah's vigil", "Saul had broken Israel's old oath to the Gibeonites (Joshua 9). After seven of Saul's descendants were executed, Rizpah, a mother of two of them, kept watch over their bodies from the barley harvest until the rains, driving away birds and animals (21:10). Her faithfulness moved David to bury Saul's family with honor.", "good", ["bergen", "baldwin"]]],
    refs: [["JOS.9", "Joshua 9:15-20", "The oath to Gibeon"], ["1CH.20", "1 Chronicles 20:4-8", "The giants killed"]],
  },
  22: {
    intro: "David's song of praise on the day God rescued him from all his enemies and from Saul: \"The LORD is my rock and my fortress and my deliverer.\" God heard his cry, came down in power, drew him out of many waters, and showed lovingkindness to His anointed forever. The same song appears as Psalm 18.",
    v: [
      ["22:2-3", "My rock, my fortress, my deliverer", "Nine pictures of God's protection in two verses."],
      ["22:7", "In my distress I called upon the LORD", "This song is also Psalm 18. In his distress David called to the LORD, and from His temple God heard his voice."],
      ["22:31", "As for God, His way is blameless", "\"He is a shield to all who take refuge in Him.\""],
      ["22:51", "To David and his descendants forever", "God shows steadfast love to His anointed, to David and his descendants forever. Christians see this fulfilled in Jesus, the Son of David."],
    ],
    bg: [["David's song of rescue", "This song appears again with small differences as Psalm 18. It looks back over David's whole life: \"The LORD is my rock and my fortress and my deliverer\" (22:2). Paul quotes 22:50 in Romans 15:9.", "strong", ["bergen", "anderson"]]],
    refs: [["PSA.18", "Psalm 18", "The same song"], ["ROM.15", "Romans 15:9", "Paul quotes 22:50"]],
  },
  23: {
    intro: "David's last words: a just ruler is like morning light after rain, and God has made an everlasting covenant with him. Then a list of David's mighty men and their deeds, including three who broke through Philistine lines to bring him water from Bethlehem's well, which he poured out to the LORD. The list ends with Uriah the Hittite.",
    v: [
      ["23:3-4", "He who rules righteously", "\"Is as the light of the morning when the sun rises.\""],
      ["23:5", "An everlasting covenant", "In his last words, David says God made an everlasting covenant with him, ordered and secure. His hope rests on God's promise."],
      ["23:16-17", "He poured it out to the LORD", "Too precious to drink, bought with his men's lives."],
      ["23:39", "Uriah the Hittite", "The last name on the list, a quiet reminder of David's sin."],
    ],
    bg: [["David's mighty men", "Chapter 23 lists David's bravest warriors, the Three and the Thirty. Three of them broke through Philistine lines just to bring David water from Bethlehem's well, and he poured it out to the LORD (23:15-17). The list ends with \"Uriah the Hittite\" (23:39), a quiet reminder of David's great sin.", "strong", ["bergen", "gordon"]]],
    w: [["גִּבּוֹר", "gibbor", "H1368", "mighty man, warrior", "A hero in battle. Isaiah 9:6 calls the coming King \"Mighty God,\" El Gibbor.", ["halot", "anderson"]]],
    refs: [["1CH.11", "1 Chronicles 11:10-47", "David's mighty men"], ["2SA.7", "2 Samuel 7:12-16", "The covenant with David"]],
  },
  24: {
    intro: "David orders a census of fighting men, against Joab's advice, and afterward his heart troubles him. God offers three punishments, and David chooses to fall into God's hands rather than man's. A plague strikes; God stops the angel at the threshing floor of Araunah. David buys the floor, saying, \"I will not offer burnt offerings to the LORD my God which cost me nothing.\" The temple will later be built there.",
    v: [
      ["24:10", "David's heart troubled him", "After counting the fighting men, David's conscience struck him. He confessed that he had sinned greatly and asked God to take away his guilt."],
      ["24:14", "Let us fall into the hand of the LORD, for His mercies are great", "Given a choice of punishments, David chose to fall into the LORD's hands rather than people's, because God's mercy is great."],
      ["24:16", "The LORD relented", "As the angel reached out to destroy Jerusalem, the LORD relented and said, Enough. His mercy stopped the judgment."],
      ["24:24", "Which cost me nothing", "Araunah offered his threshing floor for free. David insisted on paying: I will not offer to the LORD what costs me nothing. Solomon's temple was later built there (2 Chronicles 3:1)."],
    ],
    why: "2 Samuel 24:1 says the LORD incited David to take the census, while 1 Chronicles 21:1 says Satan did. How do these fit?",
    views: [
      ["Both true at different levels", "Many hold that God allowed Satan to tempt David as judgment on Israel, as with Job. Satan intended evil; God remained sovereign.", ["bergen", "baldwin"]],
      ["Different emphases", "Others note that Chronicles, written later, makes clear what Samuel assumed: God permits, but evil itself comes from the tempter (James 1:13).", ["anderson", "gordon"]],
    ],
    common: "All agree that David was responsible for his sin, that God does not tempt anyone to do evil, and that God showed mercy at the place where the temple would stand.",
    bg: [["Araunah's threshing floor", "After the census and the plague, David bought the threshing floor of Araunah and built an altar there (24:24-25). 2 Chronicles 3:1 says Solomon built the temple on that very spot, on Mount Moriah.", "strong", ["bergen", "baldwin"]]],
    w: [["גֹּרֶן", "goren", "H1637", "threshing floor", "A flat, open area, often on a hilltop where the wind could blow away the chaff. It is also the setting of Ruth 3.", ["halot", "gordon"]]],
    refs: [["1CH.21", "1 Chronicles 21", "The same census"], ["2CH.3", "2 Chronicles 3:1", "The temple on Ornan's threshing floor"], ["JAS.1", "James 1:13", "God does not tempt anyone"]],
  },
});
