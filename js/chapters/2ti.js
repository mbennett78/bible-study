// 2 Timothy chapter notes.
import { makeBook } from "./make.js";

const sources = {
  knight: "George W. Knight III, The Pastoral Epistles, New International Greek Testament Commentary (Eerdmans, 1992).",
  towner: "Philip H. Towner, The Letters to Timothy and Titus, New International Commentary on the New Testament (Eerdmans, 2006).",
  mounce: "William D. Mounce, Pastoral Epistles, Word Biblical Commentary 46 (Thomas Nelson, 2000).",
  stott2T: "John Stott, The Message of 2 Timothy, The Bible Speaks Today (InterVarsity Press, 1973).",
  bdag: "Bauer, Danker, Arndt and Gingrich, A Greek-English Lexicon of the New Testament, 3rd ed. (University of Chicago Press, 2000).",
};

export default makeBook({ lang: "Greek", sources, use: ["towner", "knight"] }, {
  1: {
    intro: "Paul writes from prison to Timothy, \"my beloved son,\" remembering his tears and the sincere faith that first lived in his grandmother Lois and his mother Eunice. \"Kindle afresh the gift of God which is in you... For God has not given us a spirit of timidity, but of power and love and discipline.\" Do not be ashamed of the testimony of our Lord or of Paul His prisoner. Christ \"abolished death and brought life and immortality to light through the gospel.\" \"I know whom I have believed and I am convinced that He is able to guard what I have entrusted to Him.\" Onesiphorus was not ashamed of Paul's chains and searched Rome to find him.",
    v: [
      ["1:5", "The sincere faith within you, which first dwelt in your grandmother Lois and your mother Eunice", "Faith passed down."],
      ["1:6", "Kindle afresh the gift of God which is in you", "Fan the flame."],
      ["1:7", "God has not given us a spirit of timidity, but of power and love and discipline", "Courage."],
      ["1:8", "Do not be ashamed of the testimony of our Lord", "Unashamed."],
      ["1:10", "Who abolished death and brought life and immortality to light", "Death defeated."],
      ["1:12", "I know whom I have believed", "Confidence in Jesus."],
    ],
    bg: [["Paul's last letter", "Most scholars think this is Paul's final letter, written from a Roman prison shortly before his execution under Nero, around AD 64-67. Unlike his earlier house arrest, he is now in chains, cold and mostly alone.", "strong", ["towner", "stott2T"]]],
    why: "Grandparents and parents in this family can see themselves in Lois and Eunice: faith handed down through the generations.",
    refs: [["ACT.16", "Acts 16:1", "Timothy's mother"], ["DEU.6", "Deuteronomy 6:6-7", "Teach your children"], ["ROM.1", "Romans 1:16", "Not ashamed of the gospel"]],
  },
  2: {
    intro: "\"Be strong in the grace that is in Christ Jesus.\" Pass on what you heard to faithful people who will teach others also. Paul gives three pictures: a soldier who aims to please his commander, an athlete who competes by the rules, and a hard-working farmer who gets the first share of the crops. \"Remember Jesus Christ, risen from the dead.\" Paul is chained, \"but the word of God is not imprisoned.\" \"Be diligent to present yourself approved to God as a workman who does not need to be ashamed, accurately handling the word of truth.\" Flee youthful lusts and pursue righteousness, faith, love and peace; the Lord's servant must be kind, patient and gentle when correcting.",
    v: [
      ["2:2", "Entrust these to faithful men who will be able to teach others also", "Four generations of teaching."],
      ["2:3", "Suffer hardship with me, as a good soldier of Christ Jesus", "A good soldier."],
      ["2:8", "Remember Jesus Christ, risen from the dead", "Remember Him."],
      ["2:9", "The word of God is not imprisoned", "Unchained word."],
      ["2:13", "If we are faithless, He remains faithful", "God stays faithful."],
      ["2:15", "Accurately handling the word of truth", "Handle the Bible well."],
      ["2:22", "Flee from youthful lusts and pursue righteousness, faith, love and peace", "Run away, run toward."],
      ["2:24", "The Lord's bond-servant must not be quarrelsome, but be kind to all", "Kind and patient."],
    ],
    w: [["accurately handling", "orthotomeō", "G3718", "cutting straight", "Literally \"to cut straight,\" like a road builder cutting a straight path or a tentmaker cutting cloth carefully. Handle God's word with care so others can follow it.", ["bdag", "mounce"]]],
    refs: [["1CO.9", "1 Corinthians 9:24-27", "The athlete"], ["NUM.16", "Numbers 16:5", "The Lord knows those who are His"], ["PHP.1", "Philippians 1:12-14", "Chains that spread the gospel"]],
  },
  3: {
    intro: "In the last days difficult times will come. People will be lovers of self and money, boastful, ungrateful, disobedient to parents, unloving, \"lovers of pleasure rather than lovers of God, holding to a form of godliness, although they have denied its power.\" Timothy has followed Paul's teaching and seen his sufferings, and the Lord rescued him. \"All who desire to live godly in Christ Jesus will be persecuted.\" But \"continue in the things you have learned,\" for \"from childhood you have known the sacred writings which are able to give you the wisdom that leads to salvation.\" \"All Scripture is inspired by God and profitable for teaching, for reproof, for correction, for training in righteousness; so that the man of God may be adequate, equipped for every good work.\"",
    v: [
      ["3:1", "In the last days difficult times will come", "Hard times."],
      ["3:4", "Lovers of pleasure rather than lovers of God", "Misplaced love."],
      ["3:5", "Holding to a form of godliness, although they have denied its power", "Real faith."],
      ["3:12", "All who desire to live godly in Christ Jesus will be persecuted", "Expect opposition."],
      ["3:15", "From childhood you have known the sacred writings", "Scripture from childhood."],
      ["3:16", "All Scripture is inspired by God and profitable", "God-breathed."],
      ["3:17", "Equipped for every good work", "Ready."],
    ],
    w: [["inspired by God", "theopneustos", "G2315", "God-breathed", "A word Paul may have coined: Scripture is breathed out by God. It comes from His own mouth, which is why it can teach, correct and train us.", ["bdag", "knight"]]],
    refs: [["EXO.7", "Exodus 7:11", "Jannes and Jambres opposed Moses"], ["PSA.119", "Psalm 119:105", "A lamp to my feet"], ["2PE.1", "2 Peter 1:20-21", "Men moved by the Holy Spirit"]],
  },
  4: {
    intro: "\"Preach the word; be ready in season and out of season; reprove, rebuke, exhort, with great patience.\" A time will come when people will want teachers who tell them what their itching ears want to hear. \"I am already being poured out as a drink offering, and the time of my departure has come. I have fought the good fight, I have finished the course, I have kept the faith; in the future there is laid up for me the crown of righteousness.\" Paul asks Timothy to come quickly before winter, bringing Mark, his cloak and the parchments. Demas has left him; only Luke is with him. At his first defense no one stood by him, \"but the Lord stood with me and strengthened me.\"",
    v: [
      ["4:2", "Preach the word; be ready in season and out of season", "Always ready."],
      ["4:3", "They will not endure sound doctrine", "Itching ears."],
      ["4:5", "Do the work of an evangelist, fulfill your ministry", "Finish your work."],
      ["4:7", "I have fought the good fight, I have finished the course, I have kept the faith", "Finishing well."],
      ["4:8", "The crown of righteousness... to all who have loved His appearing", "A crown waiting."],
      ["4:11", "Only Luke is with me. Pick up Mark and bring him with you", "Mark restored."],
      ["4:17", "But the Lord stood with me and strengthened me", "Never alone."],
    ],
    bg: [["A cloak and books", "Roman prisons were cold and dark. Paul asks for his heavy cloak before winter and his scrolls and parchments, probably Scriptures and notes. Even at the end he wanted to keep reading.", "strong", ["towner", "stott2T"]]],
    refs: [["PHP.2", "Philippians 2:17", "Poured out like a drink offering"], ["ACT.20", "Acts 20:24", "Finishing the course"], ["COL.4", "Colossians 4:10-14", "Mark, Luke and Demas"]],
  },
});
