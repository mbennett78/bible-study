// "Need an idea?" for the Journal: gentle writing prompts, like a good journaling app's,
// shaped by Scripture. One shows at a time, and nothing is ever written in for you.
export const PROMPTS = {
  day: [
    "Where did you notice God's kindness today, even in something small?",
    "What made you smile today? Who would you like to thank for it?",
    "What was hard today? Write it down, then read Philippians 4:6-7.",
    "Who did you help today, or who helped you?",
    "What is one thing you want to remember about this week?",
    "If today were a page in your life story, what would its title be?",
    "Is there someone you need to forgive, or ask to forgive you? (Ephesians 4:32)",
    "What are you looking forward to? What are you worried about? Give both to God (1 Peter 5:7).",
    "What did you learn today, about God, about others or about yourself?",
    "Write a short note to yourself one year from now.",
  ],
  prayer: [
    "Who is on your heart today? Write their name and what you're asking for them.",
    "Praise first: what do you love about who God is? (Psalm 145)",
    "Is there something you need to confess? 1 John 1:9 promises forgiveness.",
    "What do you need wisdom for right now? (James 1:5)",
    "Pray for someone you find hard to love (Matthew 5:44).",
    "Write the Lord's Prayer in your own words (Matthew 6:9-13).",
    "What prayer has God answered? Write it down so you remember.",
    "Pray for your church, your teachers and your leaders (1 Timothy 2:1-2).",
  ],
  gratitude: [
    "Name three good gifts from today (James 1:17).",
    "Who in your family are you thankful for, and why?",
    "What is something easy to forget to be thankful for?",
    "What hard thing turned out to be a blessing?",
    "Which verse are you most thankful for right now?",
    "What about Jesus are you most thankful for today?",
    "Thank God for something in nature you saw today (Psalm 104).",
  ],
  bible: [
    "What does this chapter show you about God?",
    "Is there a promise to hold on to, a command to obey or an example to follow?",
    "Which verse stood out? Write it out, then say why.",
    "If you were in this story, who would you be? How would you feel?",
    "What question does this chapter leave you with? Ask Buddy or your teacher.",
    "How could you live out one thing from this chapter this week?",
    "Where do you see Jesus, or the need for Jesus, in this chapter?",
  ],
};
PROMPTS.church = PROMPTS.bible;

// The next prompt for a kind of entry, never the same one twice in a row.
export function nextPrompt(kind, last = "", rand = Math.random) {
  const list = PROMPTS[kind] || PROMPTS.day;
  const pool = list.filter((p) => p !== last);
  return pool[Math.floor(rand() * pool.length)] || list[0];
}
