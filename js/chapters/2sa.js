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
      ["1:16", "Your blood is on your head", "David honors Saul even in death."],
      ["1:23", "Saul and Jonathan, beloved and pleasant", "David speaks only good of Saul."],
      ["1:26", "My brother Jonathan", "\"Your love to me was more wonderful than the love of women,\" the deep loyalty of a covenant friend."],
    ],
    refs: [["1SA.31", "1 Samuel 31", "Saul's death"], ["ROM.12", "Romans 12:15", "Weep with those who weep"]],
  },
  2: {
    intro: "David asks God and moves to Hebron, where Judah anoints him king. Abner, Saul's general, makes Saul's son Ish-bosheth king over the rest of Israel. A long war begins between the two houses. In a battle at Gibeon, Abner kills Asahel, brother of Joab.",
    v: [
      ["2:1", "David inquired of the LORD", "David begins his reign by asking God."],
      ["2:4", "They anointed David king over Judah", "His second anointing."],
      ["2:26", "Shall the sword devour forever?", "Abner calls for a truce."],
    ],
    refs: [["1CH.11", "1 Chronicles 11:1-3", "David anointed at Hebron"]],
  },
  3: {
    intro: "David's house grows stronger, and six sons are born to him in Hebron. Abner quarrels with Ish-bosheth and offers to bring all Israel over to David. But Joab, avenging his brother Asahel, murders Abner. David publicly mourns and declares himself innocent.",
    v: [
      ["3:1", "David grew steadily stronger", "God's promise unfolds slowly."],
      ["3:27", "Joab struck him", "Revenge undoes David's peace plan."],
      ["3:39", "I am weak today, though anointed king", "David cannot control his own general."],
    ],
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
      ["5:2", "You will shepherd My people", "Kingship as shepherding."],
      ["5:4", "Thirty years old", "He reigns forty years, seven in Hebron and thirty-three in Jerusalem."],
      ["5:8", "The water tunnel", "David's men may have entered through Jerusalem's water shaft."],
      ["5:10", "The LORD God of hosts was with him", "The secret of David's greatness."],
    ],
    bg: [["The house of David", "An Aramaic inscription found at Tel Dan in 1993, from about 840 BC, mentions the \"house of David,\" the earliest reference to David outside the Bible.", "strong", ["kitchen"]]],
    refs: [["1CH.11", "1 Chronicles 11:1-9", "David takes Jerusalem"], ["PSA.78", "Psalm 78:70-72", "To shepherd Jacob His people"]],
  },
  6: {
    intro: "David brings the ark toward Jerusalem on a new cart. When the oxen stumble, Uzzah reaches out to steady it and is struck dead. David, angry and afraid, leaves the ark at Obed-edom's house for three months. Then he brings it up properly, dancing before the LORD with all his might. His wife Michal despises him for it.",
    v: [
      ["6:3", "A new cart", "The Philistines' method (1 Samuel 6), not God's. The Levites were to carry it on poles."],
      ["6:7", "God struck him", "God's holiness is real. 1 Chronicles 15:13 says, \"we did not seek Him according to the ordinance.\""],
      ["6:14", "David was dancing with all his might", "Joyful, wholehearted worship."],
      ["6:22", "I will be more lightly esteemed than this", "David cares more about God's honor than his own dignity."],
    ],
    refs: [["1CH.15", "1 Chronicles 15:2, 13-15", "Carried by the Levites"], ["PSA.24", "Psalm 24:7-10", "Lift up your heads, O gates"], ["PSA.132", "Psalm 132", "David's vow for the ark"]],
  },
  7: {
    intro: "David wants to build a house (temple) for God. Through the prophet Nathan, God answers that He will build David a house: a dynasty. David's son will build the temple, and \"your house and your kingdom shall endure before Me forever; your throne shall be established forever.\" David sits before the LORD in humble, amazed prayer.",
    v: [
      ["7:11", "The LORD will make a house for you", "A wordplay: David's \"house\" means his family line."],
      ["7:14", "I will be a father to him", "Hebrews 1:5 applies this to Jesus."],
      ["7:16", "Your throne shall be established forever", "The Davidic covenant. Gabriel told Mary her Son would receive \"the throne of His father David\" (Luke 1:32-33)."],
      ["7:18", "Who am I, O Lord GOD?", "David's response is humility and worship."],
    ],
    refs: [["LUK.1", "Luke 1:32-33", "The throne of His father David"], ["PSA.89", "Psalm 89:3-4", "I have sworn to David"], ["ACT.2", "Acts 2:29-36", "Peter on David's descendant"], ["HEB.1", "Hebrews 1:5", "I will be a Father to Him"]],
  },
  8: {
    intro: "David defeats the Philistines, Moabites, Arameans, Edomites and others, and his kingdom expands. \"The LORD helped David wherever he went.\" He reigns with justice and righteousness for all his people. His officials are listed.",
    v: [
      ["8:6", "The LORD helped David wherever he went", "Repeated in 8:14."],
      ["8:11", "Dedicated to the LORD", "David gives the spoils to God, later used for the temple."],
      ["8:15", "Justice and righteousness for all his people", "The ideal of a godly king."],
    ],
    refs: [["1CH.18", "1 Chronicles 18", "David's victories"], ["PSA.60", "Psalm 60", "Written when David fought Aram and Edom"]],
  },
  9: {
    intro: "David asks, \"Is there yet anyone left of the house of Saul, that I may show him kindness for Jonathan's sake?\" He finds Jonathan's lame son Mephibosheth, restores Saul's land to him, and gives him a permanent place at the king's table.",
    v: [
      ["9:3", "The kindness of God", "David shows hesed, God-like covenant love."],
      ["9:8", "A dead dog like me", "Mephibosheth expected judgment and received grace."],
      ["9:13", "He ate at the king's table regularly", "A beautiful picture of grace: welcomed as a son."],
    ],
    refs: [["1SA.20", "1 Samuel 20:14-17", "David's promise to Jonathan"], ["LUK.14", "Luke 14:13", "Invite the poor, the crippled"], ["EPH.2", "Ephesians 2:19", "Members of God's household"]],
  },
  10: {
    intro: "David sends envoys to comfort the new Ammonite king after his father's death. The Ammonites humiliate them, shaving half their beards and cutting their robes. War follows; Joab and Abishai defeat the Ammonites and their Aramean allies.",
    v: [
      ["10:2", "I will show kindness", "David's kindness is rejected."],
      ["10:5", "Stay at Jericho until your beards grow", "David protects his men's dignity."],
      ["10:12", "Be strong, and let us show ourselves courageous", "\"And may the LORD do what is good in His sight.\""],
    ],
    refs: [["1CH.19", "1 Chronicles 19", "The same war"]],
  },
  11: {
    intro: "In spring, when kings go to war, David stays home. From his roof he sees Bathsheba bathing, sends for her and sleeps with her, though she is the wife of Uriah, one of his loyal soldiers. She becomes pregnant. David tries to cover it up, and when Uriah will not go home, David arranges for him to die in battle. \"But the thing that David had done was evil in the sight of the LORD.\"",
    v: [
      ["11:1", "David stayed at Jerusalem", "Idleness at the wrong time."],
      ["11:4", "David sent messengers and took her", "The king uses his power wrongly."],
      ["11:11", "Shall I then go to my house?", "Uriah, a foreigner, is more faithful than the king."],
      ["11:27", "Evil in the sight of the LORD", "God sees what David hides."],
    ],
    refs: [["PSA.51", "Psalm 51", "David's prayer of repentance"], ["JAS.1", "James 1:14-15", "Lust gives birth to sin"], ["MAT.1", "Matthew 1:6", "By her who had been the wife of Uriah"]],
  },
  12: {
    intro: "God sends Nathan to tell David a story of a rich man who stole a poor man's only lamb. David is furious, and Nathan says, \"You are the man!\" David confesses, \"I have sinned against the LORD.\" Nathan says God has taken away his sin, but the sword will not depart from his house, and the child will die. David fasts and prays; when the child dies, he worships. Later Solomon is born, whom God loves.",
    v: [
      ["12:7", "You are the man", "A brave prophet confronts a king."],
      ["12:13", "I have sinned against the LORD", "David's confession is immediate and real; Psalm 51 records it."],
      ["12:13", "The LORD also has taken away your sin", "Forgiveness, though consequences remain."],
      ["12:23", "I will go to him, but he will not return to me", "Many find comfort here about children who die."],
      ["12:24-25", "Jedidiah", "Solomon's other name, \"beloved of the LORD.\""],
    ],
    refs: [["PSA.51", "Psalm 51", "Create in me a clean heart"], ["PSA.32", "Psalm 32:1-5", "How blessed is he whose transgression is forgiven"]],
  },
  13: {
    intro: "David's son Amnon desires his half-sister Tamar, tricks her and violates her, then hates her. David is angry but does nothing. Tamar's full brother Absalom waits two years, then has Amnon killed at a feast and flees to his grandfather in Geshur.",
    v: [
      ["13:15", "The hatred was greater than the love", "What Amnon called love was lust."],
      ["13:21", "He was very angry", "But David did not act. The Greek translation adds that he would not punish his firstborn because he loved him."],
      ["13:37-39", "David mourned for his son", "The sword Nathan spoke of has entered David's house."],
    ],
    refs: [["2SA.12", "2 Samuel 12:10", "The sword shall never depart from your house"]],
  },
  14: {
    intro: "Joab sends a wise woman from Tekoa with a made-up story to persuade David to bring Absalom home. David agrees, but refuses to see Absalom for two years. Absalom, handsome and admired, forces a meeting by burning Joab's field. The king kisses him.",
    v: [
      ["14:14", "God devises plans so that the banished one will not be cast out", "A beautiful line about God's mercy, spoken by the wise woman."],
      ["14:25", "No one as handsome as Absalom", "Outward appearance again."],
      ["14:33", "The king kissed Absalom", "Reconciliation in form, not in heart."],
    ],
    refs: [["1SA.16", "1 Samuel 16:7", "The LORD looks at the heart"]],
  },
  15: {
    intro: "Absalom wins the hearts of Israel by sitting at the gate and promising justice. After four years he declares himself king in Hebron. David flees Jerusalem, weeping, barefoot, up the Mount of Olives. He sends the ark back: \"If I find favor in the sight of the LORD, He will bring me back.\" He sends his friend Hushai to confuse Absalom's advisers.",
    v: [
      ["15:6", "Absalom stole away the hearts", "Flattery and promises."],
      ["15:21", "Wherever my lord the king may be", "Ittai, a foreigner, pledges loyalty."],
      ["15:26", "Let Him do to me as seems good", "David surrenders to God's will."],
      ["15:31", "Make the counsel of Ahithophel foolishness", "David prays, then acts (15:32-34)."],
    ],
    refs: [["PSA.3", "Psalm 3", "When he fled from Absalom his son"], ["LUK.22", "Luke 22:39-44", "Jesus on the Mount of Olives"]],
  },
  16: {
    intro: "Ziba, Mephibosheth's servant, brings David supplies and accuses his master of disloyalty. Shimei of Saul's family curses David and throws stones. David refuses to let Abishai kill him: \"Perhaps the LORD will look on my affliction.\" In Jerusalem, Ahithophel advises Absalom to take David's concubines publicly.",
    v: [
      ["16:11", "Let him alone and let him curse", "David accepts humbling as from God."],
      ["16:12", "The LORD will return good to me", "Hope in suffering."],
      ["16:22", "In the sight of all Israel", "Nathan's word (12:11-12) is fulfilled."],
    ],
    refs: [["1PE.2", "1 Peter 2:23", "While being reviled, He did not revile in return"], ["2SA.12", "2 Samuel 12:11-12", "Nathan's warning"]],
  },
  17: {
    intro: "Ahithophel advises attacking David at once. Hushai gives different advice, to gather all Israel first, and Absalom follows it, \"for the LORD had ordained to thwart the good counsel of Ahithophel.\" Priests' sons carry warning to David, who crosses the Jordan. Ahithophel goes home and hangs himself.",
    v: [
      ["17:14", "The LORD had ordained it", "God answers David's prayer from 15:31."],
      ["17:23", "He set his house in order and strangled himself", "A sad end for a once-trusted adviser. Ahithophel was probably Bathsheba's grandfather (11:3; 23:34)."],
      ["17:27-29", "Barzillai and others brought food", "Friends supply David in the wilderness."],
    ],
    refs: [["PSA.41", "Psalm 41:9", "My close friend has lifted up his heel against me"], ["MAT.27", "Matthew 27:5", "Judas hanged himself"]],
  },
  18: {
    intro: "David's army fights Absalom's in the forest of Ephraim. David asks his commanders to deal gently with Absalom. Absalom's hair catches in an oak, and he hangs there; Joab kills him against David's orders. When David hears, he weeps: \"O my son Absalom, my son, my son Absalom! Would I had died instead of you.\"",
    v: [
      ["18:5", "Deal gently for my sake with the young man", "A father's love for a rebel son."],
      ["18:9", "His head caught fast in the oak", "His pride, his hair, became his trap."],
      ["18:33", "Would I had died instead of you", "One of the most heartbreaking cries in the Bible."],
    ],
    refs: [["LUK.15", "Luke 15:20", "The father's love for the prodigal"], ["ROM.5", "Romans 5:8", "While we were yet sinners, Christ died for us"]],
  },
  19: {
    intro: "Joab rebukes David for mourning while his men risk their lives for him. David returns to Jerusalem. He pardons Shimei, hears Mephibosheth's side, and thanks old Barzillai. Tension flares between Judah and the northern tribes over who will bring the king home.",
    v: [
      ["19:7", "Go out and speak kindly to your servants", "A leader must care for those who stood by him."],
      ["19:23", "You shall not die", "David shows mercy on a day of celebration."],
      ["19:30", "Let him take it all", "Mephibosheth cares only that the king is safe."],
    ],
    refs: [["2SA.9", "2 Samuel 9", "David and Mephibosheth"]],
  },
  20: {
    intro: "Sheba, a troublemaker, leads the northern tribes in revolt. Joab murders Amasa, his rival, and pursues Sheba to the city of Abel. A wise woman of the city persuades the people to throw Sheba's head over the wall, and the city is saved.",
    v: [
      ["20:1", "We have no portion in David", "The same cry the north will raise at the kingdom's split (1 Kings 12:16)."],
      ["20:10", "Joab struck him", "Joab's violence continues."],
      ["20:19", "A mother in Israel", "A wise woman saves her city through calm words."],
    ],
    refs: [["1KI.12", "1 Kings 12:16", "To your tents, O Israel"], ["ECC.9", "Ecclesiastes 9:14-16", "Wisdom is better than strength"]],
  },
  21: {
    intro: "A three-year famine comes because Saul broke Israel's oath to the Gibeonites. David hands over seven of Saul's descendants to them, but spares Mephibosheth. Rizpah, mother of two of them, guards the bodies from birds and beasts for months, and David then buries Saul and Jonathan's bones. Four Philistine giants are killed by David's men.",
    v: [
      ["21:1", "David sought the presence of the LORD", "He asks why, and God answers."],
      ["21:7", "The king spared Mephibosheth", "David keeps his oath to Jonathan."],
      ["21:10", "Rizpah", "A grieving mother's long vigil moves the king."],
    ],
    why: "2 Samuel 21:19 says Elhanan killed \"Goliath the Gittite,\" while 1 Samuel 17 says David did. How do these fit?",
    views: [
      ["Goliath's brother", "1 Chronicles 20:5 says Elhanan killed \"Lahmi the brother of Goliath.\" Many hold that 2 Samuel's copy lost a word in copying.", ["bergen", "kitchen"]],
      ["Another giant with the same name", "Others suggest Goliath was a family name or title, used for more than one giant from Gath.", ["baldwin"]],
    ],
    common: "Both views hold that David killed the giant of 1 Samuel 17, and that God gave David's men victory over the giants of Gath.",
    refs: [["JOS.9", "Joshua 9:15-20", "The oath to Gibeon"], ["1CH.20", "1 Chronicles 20:4-8", "The giants killed"]],
  },
  22: {
    intro: "David's song of praise on the day God rescued him from all his enemies and from Saul: \"The LORD is my rock and my fortress and my deliverer.\" God heard his cry, came down in power, drew him out of many waters, and showed lovingkindness to His anointed forever. The same song appears as Psalm 18.",
    v: [
      ["22:2-3", "My rock, my fortress, my deliverer", "Nine pictures of God's protection in two verses."],
      ["22:7", "In my distress I called upon the LORD", "\"He heard my voice from His temple.\""],
      ["22:31", "As for God, His way is blameless", "\"He is a shield to all who take refuge in Him.\""],
      ["22:51", "To David and his descendants forever", "Pointing to the Messiah."],
    ],
    refs: [["PSA.18", "Psalm 18", "The same song"], ["ROM.15", "Romans 15:9", "Paul quotes 22:50"]],
  },
  23: {
    intro: "David's last words: a just ruler is like morning light after rain, and God has made an everlasting covenant with him. Then a list of David's mighty men and their deeds, including three who broke through Philistine lines to bring him water from Bethlehem's well, which he poured out to the LORD. The list ends with Uriah the Hittite.",
    v: [
      ["23:3-4", "He who rules righteously", "\"Is as the light of the morning when the sun rises.\""],
      ["23:5", "An everlasting covenant", "David's hope rests on God's promise."],
      ["23:16-17", "He poured it out to the LORD", "Too precious to drink, bought with his men's lives."],
      ["23:39", "Uriah the Hittite", "The last name on the list, a quiet reminder of David's sin."],
    ],
    refs: [["1CH.11", "1 Chronicles 11:10-47", "David's mighty men"], ["2SA.7", "2 Samuel 7:12-16", "The covenant with David"]],
  },
  24: {
    intro: "David orders a census of fighting men, against Joab's advice, and afterward his heart troubles him. God offers three punishments, and David chooses to fall into God's hands rather than man's. A plague strikes; God stops the angel at the threshing floor of Araunah. David buys the floor, saying, \"I will not offer burnt offerings to the LORD my God which cost me nothing.\" The temple will later be built there.",
    v: [
      ["24:10", "David's heart troubled him", "A tender conscience."],
      ["24:14", "Let us fall into the hand of the LORD, for His mercies are great", "David trusts God's mercy over man's."],
      ["24:16", "The LORD relented", "God's mercy stops judgment."],
      ["24:24", "Which cost me nothing", "True worship costs something."],
    ],
    why: "2 Samuel 24:1 says the LORD incited David to take the census, while 1 Chronicles 21:1 says Satan did. How do these fit?",
    views: [
      ["Both true at different levels", "Many hold that God allowed Satan to tempt David as judgment on Israel, as with Job. Satan intended evil; God remained sovereign.", ["bergen", "baldwin"]],
      ["Different emphases", "Others note that Chronicles, written later, makes clear what Samuel assumed: God permits, but evil itself comes from the tempter (James 1:13).", ["anderson", "gordon"]],
    ],
    common: "All agree that David was responsible for his sin, that God does not tempt anyone to do evil, and that God showed mercy at the place where the temple would stand.",
    refs: [["1CH.21", "1 Chronicles 21", "The same census"], ["2CH.3", "2 Chronicles 3:1", "The temple on Ornan's threshing floor"], ["JAS.1", "James 1:13", "God does not tempt anyone"]],
  },
});
