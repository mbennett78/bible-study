// Find a verse by what it's about. A small topical index (in the spirit of Nave's Topical
// Bible) and the best-known stories, so someone who remembers "the one about the lost sheep"
// or wants "every passage about baptism" gets a list right away, even offline.
// Each entry: [reference key "BOOK.chapter.verse(-verse)", short description].

export const STORIES = [
  ["Creation", ["GEN.1.1-31", "God makes the heavens and the earth in six days"]],
  ["Adam and Eve in the garden of Eden", ["GEN.2.8-25", "The garden, the two trees, and the first marriage"]],
  ["The serpent and the forbidden fruit", ["GEN.3.1-24", "The fall, and the first promise of a Savior (3:15)"]],
  ["Cain and Abel", ["GEN.4.1-16", "\"Am I my brother's keeper?\""]],
  ["Noah's ark and the flood", ["GEN.6.9-22", "God tells Noah to build the ark"]],
  ["The rainbow promise", ["GEN.9.8-17", "God's covenant never to flood the earth again"]],
  ["The tower of Babel", ["GEN.11.1-9", "God confuses the languages"]],
  ["God calls Abraham", ["GEN.12.1-9", "\"Go forth from your country... and I will bless you\""]],
  ["Abraham offers Isaac", ["GEN.22.1-19", "\"God will provide for Himself the lamb\""]],
  ["Jacob's ladder", ["GEN.28.10-22", "A stairway to heaven with angels going up and down"]],
  ["Jacob wrestles with God", ["GEN.32.22-32", "Jacob is renamed Israel"]],
  ["Joseph's coat of many colors", ["GEN.37.1-36", "Joseph's brothers sell him into Egypt"]],
  ["Joseph forgives his brothers", ["GEN.50.15-21", "\"You meant evil against me, but God meant it for good\""]],
  ["Baby Moses in the basket", ["EXO.2.1-10", "Pharaoh's daughter finds Moses in the Nile"]],
  ["The burning bush", ["EXO.3.1-15", "\"I AM WHO I AM\""]],
  ["The ten plagues", ["EXO.7.14-25", "The plagues on Egypt begin (chapters 7-12)"]],
  ["The Passover", ["EXO.12.1-28", "The lamb's blood on the doorposts"]],
  ["Crossing the Red Sea", ["EXO.14.10-31", "The sea parts and Israel walks through on dry ground"]],
  ["Manna from heaven", ["EXO.16.1-36", "Bread from heaven in the wilderness"]],
  ["The Ten Commandments", ["EXO.20.1-17", "God gives the Law at Mount Sinai"]],
  ["The golden calf", ["EXO.32.1-35", "Israel worships an idol while Moses is on the mountain"]],
  ["The bronze serpent", ["NUM.21.4-9", "Look and live (see John 3:14)"]],
  ["Balaam's talking donkey", ["NUM.22.21-35", "The donkey sees the angel"]],
  ["The walls of Jericho", ["JOS.6.1-27", "The walls fall down"]],
  ["Gideon and the fleece", ["JDG.6.36-40", "Gideon asks God for a sign"]],
  ["Samson", ["JDG.16.4-31", "Samson and Delilah"]],
  ["Ruth and Naomi", ["RUT.1.16-17", "\"Where you go, I will go\""]],
  ["God calls the boy Samuel", ["1SA.3.1-10", "\"Speak, for Your servant is listening\""]],
  ["David and Goliath", ["1SA.17.32-50", "A shepherd boy, a sling and a giant"]],
  ["David and Bathsheba", ["2SA.11.1-27", "David's sin, and Nathan's rebuke in chapter 12"]],
  ["Solomon asks for wisdom", ["1KI.3.5-14", "\"Give Your servant an understanding heart\""]],
  ["Elijah and the prophets of Baal", ["1KI.18.20-39", "Fire from heaven on Mount Carmel"]],
  ["Elijah and the still small voice", ["1KI.19.9-13", "A gentle whisper"]],
  ["Elijah taken up in a whirlwind", ["2KI.2.1-14", "Chariots of fire"]],
  ["Naaman healed", ["2KI.5.1-14", "Washing seven times in the Jordan"]],
  ["Esther before the king", ["EST.4.13-16", "\"For such a time as this\""]],
  ["Job's suffering", ["JOB.1.13-22", "\"The LORD gave and the LORD has taken away\""]],
  ["The fiery furnace", ["DAN.3.13-30", "Shadrach, Meshach and Abed-nego"]],
  ["Daniel in the lions' den", ["DAN.6.10-23", "God shuts the lions' mouths"]],
  ["The writing on the wall", ["DAN.5.1-31", "Belshazzar's feast"]],
  ["Jonah and the great fish", ["JON.2.1-10", "Jonah prays inside the fish"]],
  ["The birth of Jesus", ["LUK.2.1-20", "Born in Bethlehem, laid in a manger, the shepherds"]],
  ["The wise men", ["MAT.2.1-12", "Magi follow the star"]],
  ["The boy Jesus in the temple", ["LUK.2.41-52", "\"in My Father's house\""]],
  ["Jesus is baptized", ["MAT.3.13-17", "\"This is My beloved Son\""]],
  ["Jesus is tempted", ["MAT.4.1-11", "Forty days in the wilderness"]],
  ["Water into wine", ["JHN.2.1-11", "The wedding at Cana"]],
  ["Nicodemus at night", ["JHN.3.1-21", "\"You must be born again\""]],
  ["The woman at the well", ["JHN.4.1-26", "Living water"]],
  ["The Sermon on the Mount", ["MAT.5.1-12", "The Beatitudes (chapters 5-7)"]],
  ["The Lord's Prayer", ["MAT.6.9-13", "\"Our Father who is in heaven\""]],
  ["The wise and foolish builders", ["MAT.7.24-27", "The house on the rock"]],
  ["Jesus calms the storm", ["MRK.4.35-41", "\"Hush, be still\""]],
  ["Feeding the five thousand", ["JHN.6.1-14", "Five loaves and two fish"]],
  ["Jesus walks on water", ["MAT.14.22-33", "Peter walks to Jesus, then sinks"]],
  ["The parable of the sower", ["MAT.13.1-23", "Seed on four kinds of soil"]],
  ["The mustard seed", ["MAT.13.31-32", "The smallest seed becomes a tree"]],
  ["The good Samaritan", ["LUK.10.25-37", "\"Who is my neighbor?\""]],
  ["Mary and Martha", ["LUK.10.38-42", "Mary chose the good part"]],
  ["The lost sheep", ["LUK.15.3-7", "The shepherd leaves the ninety-nine"]],
  ["The lost coin", ["LUK.15.8-10", "Joy in heaven over one sinner who repents"]],
  ["The prodigal son", ["LUK.15.11-32", "The lost son comes home to his father"]],
  ["The rich man and Lazarus", ["LUK.16.19-31", "A great chasm"]],
  ["Zacchaeus in the tree", ["LUK.19.1-10", "\"The Son of Man has come to seek and to save that which was lost\""]],
  ["Jesus blesses the children", ["MRK.10.13-16", "\"Permit the children to come to Me\""]],
  ["The rich young ruler", ["MRK.10.17-27", "Easier for a camel to go through the eye of a needle"]],
  ["Blind Bartimaeus", ["MRK.10.46-52", "\"Your faith has made you well\""]],
  ["Raising Lazarus", ["JHN.11.1-44", "\"I am the resurrection and the life\"; \"Jesus wept\""]],
  ["The widow's two coins", ["MRK.12.41-44", "She gave all she had"]],
  ["The ten virgins", ["MAT.25.1-13", "Be ready for the bridegroom"]],
  ["The parable of the talents", ["MAT.25.14-30", "\"Well done, good and faithful slave\""]],
  ["The sheep and the goats", ["MAT.25.31-46", "\"to one of these brothers of Mine, even the least of them\""]],
  ["The triumphal entry", ["MAT.21.1-11", "Palm Sunday: \"Hosanna!\""]],
  ["Jesus washes the disciples' feet", ["JHN.13.1-17", "An example of serving"]],
  ["The Last Supper", ["LUK.22.14-20", "\"Do this in remembrance of Me\""]],
  ["Jesus prays in Gethsemane", ["MAT.26.36-46", "\"Not as I will, but as You will\""]],
  ["Peter denies Jesus", ["LUK.22.54-62", "Three denials before the rooster crows"]],
  ["The crucifixion", ["LUK.23.33-49", "\"Father, forgive them\"; the thief on the cross"]],
  ["The empty tomb", ["MAT.28.1-10", "\"He is not here, for He has risen\""]],
  ["The road to Emmaus", ["LUK.24.13-35", "Their hearts burned within them"]],
  ["Doubting Thomas", ["JHN.20.24-29", "\"My Lord and my God!\""]],
  ["Breakfast by the sea, Peter restored", ["JHN.21.1-19", "\"Do you love Me?... Tend My sheep\""]],
  ["The Great Commission", ["MAT.28.18-20", "\"Go therefore and make disciples of all the nations\""]],
  ["Jesus ascends to heaven", ["ACT.1.6-11", "He will come back the same way"]],
  ["Pentecost", ["ACT.2.1-41", "The Holy Spirit comes; three thousand baptized"]],
  ["Philip and the Ethiopian", ["ACT.8.26-39", "\"What prevents me from being baptized?\""]],
  ["Saul on the road to Damascus", ["ACT.9.1-19", "A light from heaven; Saul becomes Paul"]],
  ["Peter freed from prison", ["ACT.12.1-17", "An angel opens the doors"]],
  ["Paul and Silas sing in prison", ["ACT.16.25-34", "The jailer and his household are baptized"]],
  ["Paul's shipwreck", ["ACT.27.13-44", "Everyone reaches land safely"]],
  ["The love chapter", ["1CO.13.1-13", "\"Love is patient, love is kind\""]],
  ["The armor of God", ["EPH.6.10-18", "Belt of truth, shield of faith, sword of the Spirit"]],
  ["The faith chapter", ["HEB.11.1-40", "\"Faith is the assurance of things hoped for\""]],
  ["A new heaven and a new earth", ["REV.21.1-7", "He will wipe away every tear"]],
];

export const TOPICS = {
  "Baptism": { also: ["baptize", "baptized", "born again", "immersion", "water"], refs: [
    ["MAT.3.13-17", "Jesus is baptized by John"], ["MAT.28.18-20", "Make disciples, baptizing them"], ["MRK.16.15-16", "He who believes and is baptized will be saved"],
    ["JHN.3.3-5", "Born of water and the Spirit"], ["ACT.2.36-41", "Repent and be baptized; about three thousand baptized"], ["ACT.8.12-13", "Samaritans believe and are baptized"],
    ["ACT.8.35-39", "The Ethiopian is baptized"], ["ACT.10.44-48", "Cornelius' household is baptized"], ["ACT.16.14-15", "Lydia is baptized"],
    ["ACT.16.30-34", "The Philippian jailer is baptized"], ["ACT.19.1-7", "Baptized in the name of the Lord Jesus"], ["ACT.22.16", "Arise, and be baptized, and wash away your sins"],
    ["ROM.6.3-4", "Buried with Him through baptism"], ["1CO.12.13", "By one Spirit we were all baptized into one body"], ["GAL.3.26-27", "Baptized into Christ, clothed with Christ"],
    ["EPH.4.4-6", "One Lord, one faith, one baptism"], ["COL.2.12", "Buried with Him in baptism, raised with Him"], ["TIT.3.5", "The washing of regeneration"],
    ["1PE.3.20-21", "Baptism now saves you, an appeal to God for a good conscience"],
  ] },
  "Love": { also: ["loving", "loved", "charity"], refs: [
    ["JHN.3.16", "For God so loved the world"], ["1CO.13.4-7", "Love is patient, love is kind"], ["1JN.4.7-12", "God is love"], ["ROM.5.8", "While we were yet sinners, Christ died for us"],
    ["ROM.8.38-39", "Nothing can separate us from the love of God"], ["JHN.13.34-35", "Love one another as I have loved you"], ["JHN.15.13", "Greater love has no one than this"],
    ["MAT.22.36-40", "The two greatest commandments"], ["MAT.5.43-48", "Love your enemies"], ["1JN.4.19", "We love, because He first loved us"],
  ] },
  "Faith": { also: ["believe", "belief", "trust"], refs: [
    ["HEB.11.1-6", "Without faith it is impossible to please Him"], ["ROM.10.17", "Faith comes from hearing"], ["EPH.2.8-10", "By grace you have been saved through faith"],
    ["JAS.2.14-26", "Faith without works is dead"], ["MAT.17.20", "Faith as a mustard seed"], ["MRK.9.23-24", "\"I do believe; help my unbelief\""], ["2CO.5.7", "We walk by faith, not by sight"],
    ["ROM.1.16-17", "The righteous man shall live by faith"], ["GAL.2.20", "I live by faith in the Son of God"],
  ] },
  "Trust and worry": { also: ["anxiety", "anxious", "worry", "fear", "afraid", "stress"], refs: [
    ["PRO.3.5-6", "Trust in the LORD with all your heart"], ["PHP.4.6-7", "Be anxious for nothing; the peace of God"], ["MAT.6.25-34", "Do not worry about tomorrow"],
    ["1PE.5.7", "Cast all your anxiety on Him, because He cares for you"], ["ISA.41.10", "Do not fear, for I am with you"], ["PSA.56.3-4", "When I am afraid, I will put my trust in You"],
    ["JOS.1.9", "Be strong and courageous; do not tremble"], ["2TI.1.7", "God has not given us a spirit of timidity"], ["PSA.23.4", "I fear no evil, for You are with me"], ["JHN.14.27", "Let not your heart be troubled"],
  ] },
  "Prayer": { also: ["pray", "praying", "ask"], refs: [
    ["MAT.6.5-13", "How to pray; the Lord's Prayer"], ["1TH.5.16-18", "Pray without ceasing"], ["PHP.4.6", "In everything by prayer, let your requests be made known"], ["JAS.5.13-16", "The prayer of a righteous man"],
    ["MAT.7.7-11", "Ask, seek, knock"], ["LUK.18.1-8", "Pray and do not lose heart"], ["ROM.8.26-27", "The Spirit helps us in our weakness"], ["1JN.5.14-15", "If we ask according to His will, He hears us"],
    ["JHN.17.1-26", "Jesus prays for His disciples and for us"], ["MAT.26.39", "\"Not as I will, but as You will\""],
  ] },
  "Forgiveness": { also: ["forgive", "forgiven", "pardon", "mercy"], refs: [
    ["1JN.1.9", "If we confess our sins, He is faithful to forgive"], ["EPH.4.31-32", "Forgive each other, as God in Christ forgave you"], ["COL.3.13", "Just as the Lord forgave you, so also should you"],
    ["MAT.6.14-15", "If you forgive others, your Father will forgive you"], ["MAT.18.21-35", "Seventy times seven; the unforgiving servant"], ["PSA.103.10-12", "As far as the east is from the west"],
    ["ISA.1.18", "Though your sins are as scarlet, they will be as white as snow"], ["LUK.23.34", "\"Father, forgive them\""], ["PSA.51.1-12", "David's prayer for a clean heart"],
  ] },
  "Salvation": { also: ["saved", "save", "gospel", "eternal life", "how to be saved"], refs: [
    ["JHN.3.16-18", "Whoever believes in Him shall have eternal life"], ["ACT.2.37-41", "\"What shall we do?\" Repent and be baptized"], ["ROM.3.23-24", "All have sinned; justified as a gift by His grace"],
    ["ROM.6.23", "The free gift of God is eternal life"], ["ROM.10.9-13", "Confess with your mouth Jesus as Lord"], ["EPH.2.8-10", "By grace through faith"], ["ACT.4.12", "No other name by which we must be saved"],
    ["JHN.14.6", "I am the way, and the truth, and the life"], ["TIT.3.4-7", "He saved us, not on the basis of deeds"], ["1CO.15.1-4", "The gospel: Christ died, was buried and was raised"],
  ] },
  "Grace": { also: ["gracious", "undeserved", "gift"], refs: [
    ["EPH.2.4-9", "By grace you have been saved"], ["2CO.12.9", "My grace is sufficient for you"], ["TIT.2.11-14", "The grace of God has appeared"], ["ROM.5.20-21", "Where sin increased, grace abounded all the more"],
    ["JHN.1.14-17", "Full of grace and truth"], ["HEB.4.16", "Draw near with confidence to the throne of grace"],
  ] },
  "Repentance": { also: ["repent", "turn", "sorry", "confess"], refs: [
    ["ACT.2.38", "Repent and be baptized"], ["ACT.3.19", "Repent and return, so that your sins may be wiped away"], ["LUK.15.7", "Joy in heaven over one sinner who repents"], ["2PE.3.9", "Not wishing for any to perish"],
    ["2CO.7.10", "Godly sorrow produces repentance"], ["LUK.15.17-24", "The prodigal son comes to his senses"], ["2CH.7.14", "If My people humble themselves and pray"],
  ] },
  "The Holy Spirit": { also: ["spirit", "holy ghost", "comforter", "helper"], refs: [
    ["JHN.14.16-17", "Another Helper, the Spirit of truth"], ["JHN.14.26", "He will teach you all things"], ["ACT.2.1-4", "Pentecost: the Spirit comes"], ["ACT.2.38", "You will receive the gift of the Holy Spirit"],
    ["ROM.8.9-17", "Led by the Spirit of God"], ["GAL.5.22-23", "The fruit of the Spirit"], ["1CO.6.19-20", "Your body is a temple of the Holy Spirit"], ["EPH.1.13-14", "Sealed with the Holy Spirit of promise"],
  ] },
  "Peace": { also: ["calm", "rest", "quiet"], refs: [
    ["PHP.4.6-7", "The peace of God, which surpasses all comprehension"], ["JHN.14.27", "Peace I leave with you"], ["ISA.26.3", "Perfect peace, because he trusts in You"], ["JHN.16.33", "In Me you may have peace; I have overcome the world"],
    ["MAT.11.28-30", "Come to Me, and I will give you rest"], ["ROM.5.1", "Peace with God through our Lord Jesus Christ"], ["COL.3.15", "Let the peace of Christ rule in your hearts"], ["NUM.6.24-26", "The LORD bless you, and keep you"],
  ] },
  "Comfort and grief": { also: ["comfort", "grief", "sad", "mourning", "loss", "death of a loved one", "suffering"], refs: [
    ["PSA.23.1-6", "The LORD is my shepherd"], ["MAT.5.4", "Blessed are those who mourn"], ["2CO.1.3-4", "The God of all comfort"], ["PSA.34.18", "The LORD is near to the brokenhearted"],
    ["1TH.4.13-18", "Not grieving as those who have no hope"], ["REV.21.4", "He will wipe away every tear"], ["JHN.11.25-26", "I am the resurrection and the life"], ["ROM.8.28", "God causes all things to work together for good"],
    ["PSA.46.1-3", "God is our refuge and strength"], ["JHN.11.35", "Jesus wept"],
  ] },
  "Hope": { also: ["hopeful", "future"], refs: [
    ["JER.29.11", "Plans for welfare and not for calamity, to give you a future and a hope"], ["ROM.15.13", "May the God of hope fill you with all joy and peace"], ["ROM.5.3-5", "Hope does not disappoint"],
    ["HEB.6.19", "An anchor of the soul"], ["1PE.1.3-5", "A living hope through the resurrection"], ["LAM.3.21-24", "His compassions never fail; they are new every morning"], ["ISA.40.31", "Those who wait for the LORD will gain new strength"],
  ] },
  "Strength and courage": { also: ["strength", "strong", "courage", "brave", "weak"], refs: [
    ["PHP.4.13", "I can do all things through Him who strengthens me"], ["ISA.40.28-31", "They will mount up with wings like eagles"], ["JOS.1.9", "Be strong and courageous"], ["2CO.12.9-10", "When I am weak, then I am strong"],
    ["PSA.27.1", "The LORD is my light and my salvation; whom shall I fear?"], ["DEU.31.6", "He will not fail you or forsake you"], ["EPH.6.10", "Be strong in the Lord"],
  ] },
  "Joy and thankfulness": { also: ["joy", "happy", "rejoice", "thankful", "thanks", "gratitude", "praise"], refs: [
    ["PHP.4.4", "Rejoice in the Lord always"], ["1TH.5.16-18", "In everything give thanks"], ["PSA.100.1-5", "Enter His gates with thanksgiving"], ["NEH.8.10", "The joy of the LORD is your strength"],
    ["PSA.118.24", "This is the day which the LORD has made"], ["JAS.1.2-4", "Consider it all joy when you encounter trials"], ["PSA.136.1", "Give thanks to the LORD, for He is good"], ["COL.3.15-17", "Be thankful; do all in the name of the Lord Jesus"],
  ] },
  "Marriage and family": { also: ["marriage", "husband", "wife", "wedding", "family", "parents", "children"], refs: [
    ["GEN.2.18-24", "The two shall become one flesh"], ["MAT.19.4-6", "What God has joined together"], ["EPH.5.22-33", "Husbands and wives, Christ and the church"], ["EPH.6.1-4", "Children, obey your parents; fathers, do not provoke"],
    ["COL.3.18-21", "Wives, husbands, children and fathers"], ["PRO.22.6", "Train up a child in the way he should go"], ["PSA.127.3-5", "Children are a gift of the LORD"], ["EXO.20.12", "Honor your father and your mother"],
    ["PRO.31.10-31", "An excellent wife"], ["1PE.3.1-7", "Wives and husbands, grace of life together"], ["DEU.6.4-9", "Teach them diligently to your children"],
  ] },
  "Heaven": { also: ["paradise", "afterlife", "eternity"], refs: [
    ["JHN.14.1-3", "In My Father's house are many dwelling places"], ["REV.21.1-7", "A new heaven and a new earth"], ["REV.22.1-5", "The river of life and the tree of life"], ["PHP.3.20-21", "Our citizenship is in heaven"],
    ["2CO.5.1-8", "A building from God, eternal in the heavens"], ["1CO.2.9", "Things which eye has not seen"], ["LUK.23.43", "Today you shall be with Me in Paradise"],
  ] },
  "Resurrection": { also: ["risen", "rose", "easter", "raised from the dead"], refs: [
    ["MAT.28.1-10", "He is not here, for He has risen"], ["1CO.15.1-8", "He was raised on the third day and appeared"], ["1CO.15.20-28", "Christ the first fruits"], ["1CO.15.50-58", "We will all be changed; death is swallowed up"],
    ["JHN.11.25-26", "I am the resurrection and the life"], ["ROM.6.4-5", "Raised to walk in newness of life"], ["1TH.4.13-18", "The dead in Christ will rise first"],
  ] },
  "The return of Jesus": { also: ["second coming", "coming again", "end times", "rapture", "judgment day"], refs: [
    ["ACT.1.9-11", "He will come in just the same way"], ["1TH.4.13-18", "The Lord Himself will descend"], ["MAT.24.36-44", "No one knows the day or hour"], ["JHN.14.3", "I will come again and receive you"],
    ["2PE.3.8-13", "The day of the Lord will come like a thief"], ["REV.22.12-13", "I am coming quickly"], ["MAT.25.31-46", "When the Son of Man comes in His glory"],
  ] },
  "The Lord's Supper": { also: ["communion", "bread and cup", "lord's table", "last supper"], refs: [
    ["LUK.22.14-20", "Do this in remembrance of Me"], ["MAT.26.26-29", "This is My body; this is My blood of the covenant"], ["1CO.11.23-29", "You proclaim the Lord's death until He comes"],
    ["ACT.2.42", "Devoted to the breaking of bread and to prayer"], ["ACT.20.7", "On the first day of the week, gathered to break bread"], ["1CO.10.16-17", "We who are many are one body"],
  ] },
  "The church": { also: ["church", "body of christ", "fellowship", "gathering together"], refs: [
    ["MAT.16.15-18", "Upon this rock I will build My church"], ["ACT.2.42-47", "The first believers' life together"], ["EPH.4.11-16", "Building up the body of Christ"], ["1CO.12.12-27", "Many members, one body"],
    ["HEB.10.24-25", "Not forsaking our own assembling together"], ["COL.1.18", "He is the head of the body, the church"], ["EPH.5.25-27", "Christ loved the church and gave Himself up for her"],
  ] },
  "Creation": { also: ["creator", "made the world", "beginning", "nature"], refs: [
    ["GEN.1.1-31", "In the beginning God created"], ["GEN.2.4-25", "The LORD God forms man and plants a garden"], ["PSA.19.1-6", "The heavens are telling of the glory of God"], ["PSA.104.1-35", "A song about creation"],
    ["JHN.1.1-3", "All things came into being through Him"], ["COL.1.15-17", "All things have been created through Him and for Him"], ["HEB.11.3", "The worlds were prepared by the word of God"], ["ROM.1.20", "His invisible attributes are clearly seen"],
    ["JOB.38.1-11", "Where were you when I laid the foundation of the earth?"], ["PSA.139.13-16", "Fearfully and wonderfully made"],
  ] },
  "Sin and temptation": { also: ["sin", "temptation", "tempted", "evil"], refs: [
    ["ROM.3.23", "All have sinned"], ["1CO.10.13", "God will provide the way of escape"], ["JAS.1.12-15", "Each one is tempted by his own lust"], ["HEB.4.15-16", "Tempted in all things as we are, yet without sin"],
    ["MAT.4.1-11", "Jesus answers temptation with Scripture"], ["GEN.3.1-7", "The first sin"], ["PSA.119.9-11", "Your word I have treasured in my heart"], ["GAL.5.16-24", "Walk by the Spirit"],
  ] },
  "God's word": { also: ["scripture", "bible", "word of god"], refs: [
    ["2TI.3.16-17", "All Scripture is inspired by God"], ["PSA.119.105", "Your word is a lamp to my feet"], ["HEB.4.12", "Living and active, sharper than any two-edged sword"], ["ISA.40.8", "The word of our God stands forever"],
    ["JOS.1.8", "Meditate on it day and night"], ["MAT.4.4", "Man shall not live on bread alone"], ["ROM.15.4", "Written for our instruction"], ["JAS.1.22-25", "Be doers of the word"],
  ] },
  "Wisdom": { also: ["wise", "decisions", "guidance", "direction"], refs: [
    ["PRO.1.7", "The fear of the LORD is the beginning of knowledge"], ["JAS.1.5", "If any of you lacks wisdom, let him ask of God"], ["PRO.3.5-7", "He will make your paths straight"], ["1KI.3.5-14", "Solomon asks for wisdom"],
    ["PSA.32.8", "I will instruct you and teach you in the way you should go"], ["JAS.3.13-18", "The wisdom from above"], ["COL.3.16", "Teaching and admonishing one another with all wisdom"],
  ] },
  "Humility and pride": { also: ["humble", "pride", "proud", "servant"], refs: [
    ["PHP.2.3-11", "Have this attitude in yourselves which was also in Christ Jesus"], ["JAS.4.6-10", "God is opposed to the proud, but gives grace to the humble"], ["MIC.6.8", "Do justice, love kindness, walk humbly with your God"],
    ["PRO.16.18", "Pride goes before destruction"], ["MRK.10.42-45", "The Son of Man came to serve"], ["JHN.13.12-17", "Jesus washes their feet as an example"], ["1PE.5.5-6", "Humble yourselves under the mighty hand of God"],
  ] },
  "Kindness and serving others": { also: ["kind", "serve", "help", "neighbor", "poor", "generous"], refs: [
    ["LUK.10.25-37", "The good Samaritan"], ["MAT.25.34-40", "To one of the least of these"], ["GAL.6.9-10", "Let us not lose heart in doing good"], ["EPH.4.32", "Be kind to one another, tender-hearted"],
    ["MIC.6.8", "Love kindness"], ["JAS.1.27", "Visit orphans and widows in their distress"], ["1PE.4.10", "Serve one another with the gift you have received"], ["MAT.7.12", "Treat people the same way you want them to treat you"],
  ] },
  "Giving and money": { also: ["money", "giving", "tithe", "rich", "wealth", "generosity"], refs: [
    ["2CO.9.6-8", "God loves a cheerful giver"], ["MAT.6.19-24", "Treasures in heaven; you cannot serve God and wealth"], ["1TI.6.6-10", "The love of money is a root of all sorts of evil"], ["HEB.13.5", "Be content; I will never desert you"],
    ["MRK.12.41-44", "The widow's two coins"], ["MAL.3.10", "Bring the whole tithe into the storehouse"], ["ACT.20.35", "It is more blessed to give than to receive"], ["LUK.12.13-21", "The rich fool"],
  ] },
  "Anger and patience": { also: ["anger", "angry", "patience", "patient", "temper"], refs: [
    ["JAS.1.19-20", "Quick to hear, slow to speak and slow to anger"], ["EPH.4.26-27", "Be angry, and yet do not sin"], ["PRO.15.1", "A gentle answer turns away wrath"], ["COL.3.8-13", "Put on a heart of compassion, kindness, patience"],
    ["GAL.5.22-23", "The fruit of the Spirit is... patience"], ["ROM.12.17-21", "Overcome evil with good"], ["PSA.37.7-8", "Rest in the LORD and wait patiently for Him"],
  ] },
  "Healing": { also: ["sick", "illness", "heal", "healed"], refs: [
    ["JAS.5.14-16", "The prayer offered in faith will restore the one who is sick"], ["ISA.53.4-5", "By His scourging we are healed"], ["PSA.103.1-5", "Who heals all your diseases"], ["MRK.5.25-34", "The woman who touched His cloak"],
    ["MAT.8.1-17", "Jesus heals a leper, a servant and many more"], ["JER.17.14", "Heal me, O LORD, and I will be healed"], ["3JN.1.2", "I pray that you may prosper and be in good health"],
  ] },
  "Jesus is God's Son": { also: ["deity of christ", "who is jesus", "son of god", "messiah"], refs: [
    ["JHN.1.1-14", "The Word was God, and became flesh"], ["MAT.16.13-17", "\"You are the Christ, the Son of the living God\""], ["JHN.8.58", "Before Abraham was born, I am"], ["JHN.20.28-31", "\"My Lord and my God!\""],
    ["COL.1.15-20", "The image of the invisible God"], ["HEB.1.1-4", "The exact representation of His nature"], ["PHP.2.5-11", "Every knee will bow"], ["ISA.9.6-7", "Mighty God, Eternal Father, Prince of Peace"],
  ] },
  "The cross": { also: ["crucifixion", "atonement", "died for our sins", "sacrifice", "blood"], refs: [
    ["ISA.53.3-6", "He was pierced through for our transgressions"], ["JHN.19.16-30", "\"It is finished!\""], ["ROM.5.6-11", "Christ died for the ungodly"], ["1PE.2.24", "He Himself bore our sins in His body on the cross"],
    ["2CO.5.21", "He made Him who knew no sin to be sin on our behalf"], ["GAL.2.20", "I have been crucified with Christ"], ["HEB.9.11-14", "The blood of Christ will cleanse your conscience"], ["1CO.1.18", "The word of the cross is the power of God"],
  ] },
  "Obedience": { also: ["obey", "commandments", "follow"], refs: [
    ["JHN.14.15", "If you love Me, you will keep My commandments"], ["1SA.15.22", "To obey is better than sacrifice"], ["JAS.1.22", "Prove yourselves doers of the word"], ["LUK.6.46-49", "Why do you call Me Lord and do not do what I say?"],
    ["DEU.10.12-13", "What does the LORD your God require from you?"], ["1JN.5.3", "His commandments are not burdensome"], ["HEB.5.8-9", "The source of eternal salvation to all who obey Him"],
  ] },
  "Friendship": { also: ["friend", "friends", "loneliness", "lonely"], refs: [
    ["PRO.17.17", "A friend loves at all times"], ["JHN.15.12-15", "I have called you friends"], ["ECC.4.9-12", "Two are better than one"], ["PRO.18.24", "A friend who sticks closer than a brother"],
    ["1SA.18.1-4", "David and Jonathan"], ["PRO.27.17", "Iron sharpens iron"], ["HEB.13.5", "I will never desert you, nor will I ever forsake you"],
  ] },
  "Work": { also: ["job", "working", "labor", "diligence"], refs: [
    ["COL.3.23-24", "Do your work heartily, as for the Lord"], ["GEN.2.15", "To cultivate it and keep it"], ["PRO.6.6-11", "Go to the ant, O sluggard"], ["2TH.3.10-12", "If anyone is not willing to work"],
    ["ECC.9.10", "Whatever your hand finds to do, do it with all your might"], ["1CO.15.58", "Your toil is not in vain in the Lord"],
  ] },
  "Worship": { also: ["praise", "sing", "music", "worship"], refs: [
    ["JHN.4.23-24", "Worship in spirit and truth"], ["PSA.95.1-7", "Come, let us worship and bow down"], ["PSA.150.1-6", "Let everything that has breath praise the LORD"], ["ROM.12.1-2", "Present your bodies a living sacrifice"],
    ["COL.3.16", "Singing with thankfulness in your hearts to God"], ["EPH.5.18-20", "Speaking to one another in psalms and hymns and spiritual songs"], ["HEB.13.15", "A sacrifice of praise"], ["REV.4.8-11", "Holy, holy, holy"],
  ] },
  "God's care": { also: ["provision", "provide", "shepherd", "protection", "god cares"], refs: [
    ["PSA.23.1-6", "The LORD is my shepherd"], ["MAT.6.25-33", "Look at the birds of the air"], ["PSA.121.1-8", "My help comes from the LORD"], ["PHP.4.19", "My God will supply all your needs"],
    ["PSA.91.1-16", "He who dwells in the shelter of the Most High"], ["LUK.12.6-7", "The very hairs of your head are all numbered"], ["ISA.43.1-3", "When you pass through the waters, I will be with you"], ["JHN.10.11-15", "I am the good shepherd"],
  ] },
};

// Search the topics and the stories. Returns [{ title, kind, refs: [[key, about]] }], best first.
export function findTopics(q) {
  const words = String(q || "").toLowerCase().replace(/[^a-z' ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
  if (!words.length) return [];
  const score = (text) => { const t = text.toLowerCase(); return words.reduce((n, w) => n + (t.includes(w) || (w.length > 4 && t.includes(w.slice(0, -1))) ? 1 : 0), 0); };
  const out = [];
  for (const [name, t] of Object.entries(TOPICS)) {
    const head = score(`${name} ${t.also.join(" ")}`) * 3;
    const hits = t.refs.filter(([, about]) => score(about) > 0);
    if (head) out.push({ title: name, kind: "topic", refs: t.refs, score: head + hits.length });
    else if (hits.length) out.push({ title: name, kind: "topic", refs: hits, score: hits.length });
  }
  for (const [name, ref] of STORIES) {
    const sc = score(name) * 3 + score(ref[1]);
    if (sc) out.push({ title: name, kind: "story", refs: [ref], score: sc });
  }
  // Stories that match well come first, then topics; keep the list short enough to scan.
  return out.sort((a, b) => b.score - a.score).slice(0, 12);
}
const STOP = new Set(["the", "and", "about", "one", "where", "what", "that", "with", "for", "verse", "verses", "bible", "passage", "passages", "says", "said", "story", "who", "was", "were", "from", "all", "his", "her", "they", "them", "this", "there", "find", "when", "how", "god's"]);
