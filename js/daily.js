// Daily study: a verse of the day, a psalm and a proverb of the day, and a devotional
// question with a prayer. Everyone in the family sees the same ones on the same day, so
// they can talk about them together. References only: the words come from the version
// each person reads.

// [book, chapter, verse, theme]
export const DAILY_VERSES = [
  ["GEN", 1, 1, "God the Creator"], ["GEN", 50, 20, "God turns harm to good"], ["EXO", 14, 14, "The Lord fights for you"],
  ["EXO", 34, 6, "Slow to anger, abounding in love"], ["NUM", 6, 24, "The Lord bless you and keep you"], ["DEU", 6, 5, "Love the Lord with all your heart"],
  ["DEU", 31, 8, "He will not leave you"], ["JOS", 1, 9, "Be strong and courageous"], ["JOS", 24, 15, "As for me and my house"],
  ["RUT", 1, 16, "Loyal love"], ["1SA", 16, 7, "God looks at the heart"], ["2SA", 22, 31, "His way is blameless"],
  ["1KI", 8, 23, "No God like You"], ["1CH", 16, 34, "Give thanks, His love endures"], ["2CH", 7, 14, "If My people humble themselves"],
  ["NEH", 8, 10, "The joy of the Lord"], ["EST", 4, 14, "For such a time as this"], ["JOB", 19, 25, "My Redeemer lives"],
  ["PSA", 1, 1, "The blessed person"], ["PSA", 16, 11, "Fullness of joy"], ["PSA", 19, 1, "The heavens declare His glory"],
  ["PSA", 23, 1, "The Lord is my shepherd"], ["PSA", 27, 1, "The Lord is my light"], ["PSA", 34, 8, "Taste and see"],
  ["PSA", 37, 4, "Delight in the Lord"], ["PSA", 46, 1, "Our refuge and strength"], ["PSA", 46, 10, "Be still and know"],
  ["PSA", 51, 10, "A clean heart"], ["PSA", 62, 1, "My soul waits for God"], ["PSA", 90, 12, "Number our days"],
  ["PSA", 91, 1, "In the shelter of the Most High"], ["PSA", 100, 4, "Enter His gates with thanks"], ["PSA", 103, 12, "As far as east from west"],
  ["PSA", 118, 24, "This is the day"], ["PSA", 119, 105, "A lamp to my feet"], ["PSA", 121, 1, "My help comes from the Lord"],
  ["PSA", 139, 14, "Fearfully and wonderfully made"], ["PSA", 145, 18, "Near to all who call"], ["PRO", 3, 5, "Trust in the Lord"],
  ["PRO", 4, 23, "Guard your heart"], ["PRO", 15, 1, "A gentle answer"], ["PRO", 16, 3, "Commit your work to the Lord"],
  ["PRO", 17, 17, "A friend loves at all times"], ["PRO", 22, 6, "Train up a child"], ["ECC", 3, 1, "A time for everything"],
  ["ISA", 9, 6, "Wonderful Counselor"], ["ISA", 26, 3, "Perfect peace"], ["ISA", 40, 31, "Wings like eagles"],
  ["ISA", 41, 10, "Do not fear, I am with you"], ["ISA", 43, 2, "Through the waters"], ["ISA", 53, 5, "By His wounds we are healed"],
  ["ISA", 55, 8, "My thoughts are not your thoughts"], ["JER", 17, 7, "Blessed is the one who trusts"], ["JER", 29, 11, "Plans for a future and a hope"],
  ["LAM", 3, 22, "His mercies are new every morning"], ["EZK", 36, 26, "A new heart"], ["DAN", 3, 17, "God is able"],
  ["HOS", 6, 6, "Mercy, not sacrifice"], ["MIC", 6, 8, "Do justice, love kindness, walk humbly"], ["NAM", 1, 7, "The Lord is good, a stronghold"],
  ["HAB", 3, 18, "I will rejoice in the Lord"], ["ZEP", 3, 17, "He rejoices over you with singing"], ["MAL", 3, 6, "I do not change"],
  ["MAT", 5, 9, "Blessed are the peacemakers"], ["MAT", 5, 16, "Let your light shine"], ["MAT", 6, 33, "Seek first His kingdom"],
  ["MAT", 6, 34, "Don't worry about tomorrow"], ["MAT", 7, 7, "Ask, seek, knock"], ["MAT", 11, 28, "Come to Me and rest"],
  ["MAT", 22, 37, "The greatest commandment"], ["MAT", 28, 20, "I am with you always"], ["MRK", 10, 45, "He came to serve"],
  ["MRK", 12, 31, "Love your neighbor"], ["LUK", 1, 37, "Nothing is impossible with God"], ["LUK", 2, 11, "A Savior is born"],
  ["LUK", 6, 31, "Treat others as you want to be treated"], ["LUK", 19, 10, "To seek and save the lost"], ["JHN", 1, 14, "The Word became flesh"],
  ["JHN", 3, 16, "God so loved the world"], ["JHN", 8, 12, "The light of the world"], ["JHN", 10, 10, "Life to the full"],
  ["JHN", 11, 25, "The resurrection and the life"], ["JHN", 13, 34, "Love one another"], ["JHN", 14, 6, "The way, the truth, the life"],
  ["JHN", 14, 27, "My peace I give you"], ["JHN", 15, 5, "I am the vine"], ["JHN", 16, 33, "I have overcome the world"],
  ["ACT", 1, 8, "You will be My witnesses"], ["ACT", 2, 38, "Repent and be baptized"], ["ACT", 4, 12, "No other name"],
  ["ROM", 3, 23, "All have sinned"], ["ROM", 5, 8, "While we were still sinners"], ["ROM", 6, 23, "The gift of God"],
  ["ROM", 8, 1, "No condemnation"], ["ROM", 8, 28, "All things work together for good"], ["ROM", 8, 38, "Nothing can separate us"],
  ["ROM", 10, 9, "Confess and believe"], ["ROM", 12, 2, "Be transformed"], ["ROM", 12, 12, "Joyful in hope"],
  ["ROM", 15, 13, "The God of hope"], ["1CO", 10, 13, "A way of escape"], ["1CO", 13, 4, "Love is patient"],
  ["1CO", 13, 13, "The greatest is love"], ["1CO", 15, 57, "Victory through Jesus"], ["2CO", 4, 16, "Renewed day by day"],
  ["2CO", 5, 17, "A new creation"], ["2CO", 12, 9, "My grace is sufficient"], ["GAL", 2, 20, "Christ lives in me"],
  ["GAL", 5, 22, "The fruit of the Spirit"], ["GAL", 6, 9, "Don't grow weary"], ["EPH", 2, 8, "Saved by grace through faith"],
  ["EPH", 2, 10, "His workmanship"], ["EPH", 4, 32, "Kind and forgiving"], ["EPH", 6, 10, "Strong in the Lord"],
  ["PHP", 1, 6, "He will finish what He started"], ["PHP", 4, 4, "Rejoice always"], ["PHP", 4, 6, "Don't be anxious, pray"],
  ["PHP", 4, 8, "Think on these things"], ["PHP", 4, 13, "Strength through Christ"], ["PHP", 4, 19, "God will supply"],
  ["COL", 3, 2, "Set your mind on things above"], ["COL", 3, 23, "Work as for the Lord"], ["1TH", 5, 16, "Rejoice, pray, give thanks"],
  ["2TI", 1, 7, "Power, love and self-control"], ["2TI", 3, 16, "All Scripture is God-breathed"], ["TIT", 3, 5, "By His mercy"],
  ["HEB", 4, 16, "Approach the throne of grace"], ["HEB", 11, 1, "Faith is the assurance"], ["HEB", 12, 1, "Run with endurance"],
  ["HEB", 13, 5, "Never leave nor forsake"], ["HEB", 13, 8, "The same yesterday, today and forever"], ["JAS", 1, 5, "Ask God for wisdom"],
  ["JAS", 1, 22, "Doers of the word"], ["JAS", 4, 8, "Draw near to God"], ["1PE", 5, 7, "Cast your cares on Him"],
  ["2PE", 3, 9, "Not wanting any to perish"], ["1JN", 1, 9, "He is faithful to forgive"], ["1JN", 4, 19, "We love because He first loved us"],
  ["JUD", 1, 24, "Able to keep you from stumbling"], ["REV", 3, 20, "I stand at the door and knock"], ["REV", 21, 4, "No more tears"],
];

// A question to think about and a prayer to pray, one for each day of the month.
export const DEVOTIONS = [
  ["Where did you see God's kindness yesterday?", "Thank You, Lord, for the good gifts I so often overlook. Open my eyes to see You today."],
  ["Who in your life needs encouragement this week?", "Father, show me someone to encourage today, and give me the right words."],
  ["What worry can you hand over to God today?", "Lord, I give You this worry. Help me trust You with it (1 Peter 5:7)."],
  ["What does it mean to love God with all your heart, soul and mind?", "Lord, I want to love You with everything I am. Show me what to give You today."],
  ["Is there someone you need to forgive?", "Jesus, You forgave me so much. Help me forgive as You forgave me (Ephesians 4:32)."],
  ["What is one thing you're grateful for that you didn't have to earn?", "Thank You for Your grace, Lord, given freely through Jesus."],
  ["How can you serve someone at home today?", "Lord Jesus, You came to serve. Make me a servant in my own home."],
  ["What promise of God do you need to remember today?", "Father, You keep every promise. Help me hold on to Yours today."],
  ["When is it hardest for you to be patient?", "Spirit of God, grow patience in me, especially when I'm tired or hurried."],
  ["What sin do you need to confess and leave behind?", "Lord, I confess my sin. Thank You that You are faithful to forgive and cleanse (1 John 1:9)."],
  ["How has God answered a prayer for you in the past?", "Thank You for hearing me before. I trust You to hear me again today."],
  ["Who taught you about God? How can you pass it on?", "Lord, thank You for those who showed me Jesus. Help me show Him to my family."],
  ["What does your Bible reading today teach you about God?", "Open my eyes, Lord, to see wonderful things in Your Word (Psalm 119:18)."],
  ["Where do you need God's strength today?", "Lord, Your power is made perfect in weakness. Be my strength (2 Corinthians 12:9)."],
  ["How can you show love to a neighbor this week?", "Teach me to love my neighbor as myself, Lord, in what I do, not just what I say."],
  ["What fills your mind most often? Is it good for you?", "Lord, help me think on what is true, honorable, pure and lovely (Philippians 4:8)."],
  ["What does salvation mean to you today?", "Thank You, Jesus, for saving me. Help me live today as one who is loved and forgiven."],
  ["Is there a hard conversation you've been avoiding?", "Lord, give me courage and gentleness to speak the truth in love."],
  ["How do you spend your time? Does it honor God?", "Teach me to number my days, Lord, so I gain a heart of wisdom (Psalm 90:12)."],
  ["Who is lonely or hurting that you could reach out to?", "Father, comfort the hurting through me. Show me who needs a call or a visit."],
  ["What is God teaching you through a hard season?", "Lord, even here, work all things together for good (Romans 8:28)."],
  ["How can your words build others up today?", "Set a guard over my mouth, Lord. Let my words be kind and helpful."],
  ["What would it look like to seek God's kingdom first today?", "Lord, help me put You first, and trust You with everything else (Matthew 6:33)."],
  ["Where are you tempted to be proud?", "Humble me, Lord. Help me remember every good thing comes from You."],
  ["What is one way you can be generous this week?", "Lord, everything I have is Yours. Make me a cheerful giver."],
  ["How does Jesus' resurrection give you hope?", "Risen Lord, because You live, I can face tomorrow. Fill me with hope."],
  ["What fruit of the Spirit do you most want to grow?", "Holy Spirit, grow Your fruit in me: love, joy, peace, patience, kindness (Galatians 5:22-23)."],
  ["Who in your family can you pray for by name today?", "Father, I lift up each one in my family to You. Draw them close to You."],
  ["What does it mean to you that God never changes?", "Lord, when everything else changes, You stay the same. I rest in You."],
  ["How can you make time to be still with God today?", "Lord, quiet my heart. Help me be still and know that You are God (Psalm 46:10)."],
  ["What are you looking forward to in heaven?", "Thank You, Lord, for the hope of a home with You where there are no more tears."],
];

const dayOfYear = (d = new Date()) => Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);

export function dailyToday(d = new Date()) {
  const n = dayOfYear(d);
  const [book, chapter, verse, theme] = DAILY_VERSES[(n - 1) % DAILY_VERSES.length];
  return {
    verse: { book, chapter, verse, theme },
    psalm: ((n - 1) % 150) + 1,
    proverb: Math.min(d.getDate(), 31),
    devotion: DEVOTIONS[(d.getDate() - 1) % DEVOTIONS.length],
  };
}
