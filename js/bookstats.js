// Verses in each book (the standard English count, 31,102 in all), for "By the numbers".
const V = "GEN 1533 EXO 1213 LEV 859 NUM 1288 DEU 959 JOS 658 JDG 618 RUT 85 1SA 810 2SA 695 1KI 816 2KI 719 1CH 942 2CH 822 EZR 280 NEH 406 EST 167 JOB 1070 PSA 2461 PRO 915 ECC 222 SNG 117 ISA 1292 JER 1364 LAM 154 EZK 1273 DAN 357 HOS 197 JOL 73 AMO 146 OBA 21 JON 48 MIC 105 NAM 47 HAB 56 ZEP 53 HAG 38 ZEC 211 MAL 55 MAT 1071 MRK 678 LUK 1151 JHN 879 ACT 1007 ROM 433 1CO 437 2CO 257 GAL 149 EPH 155 PHP 104 COL 95 1TH 89 2TH 47 1TI 113 2TI 83 TIT 46 PHM 25 HEB 303 JAS 108 1PE 105 2PE 61 1JN 105 2JN 13 3JN 14 JUD 25 REV 404".split(" ");
export const VERSES = Object.fromEntries(V.flatMap((x, i) => (i % 2 ? [] : [[x, Number(V[i + 1])]])));
export const TOTAL_VERSES = Object.values(VERSES).reduce((a, b) => a + b, 0);
// A few facts worth knowing, true by any common count.
export const BOOK_FACTS = {
  PSA: "The longest book in the Bible, with 150 chapters. Psalm 117 is the shortest chapter in the Bible, and Psalm 119 the longest (176 verses).",
  "3JN": "The shortest book in the Bible by number of words, under 300 in Greek.",
  "2JN": "With 3 John and Jude, one of the shortest books; a single page in most Bibles.",
  OBA: "The shortest book in the Old Testament: one chapter, 21 verses.",
  EST: "God is never named in Esther, yet His care shows in every turn of the story.",
  JHN: "Records seven \"I am\" sayings and seven signs. John 11:35, \"Jesus wept,\" is the shortest verse in most English Bibles.",
  LUK: "The longest book in the New Testament. With Acts, Luke wrote more of the New Testament than any other writer, about a quarter of it.",
  ROM: "Paul's longest letter, and the most complete explanation of the gospel in the Bible.",
  ISA: "Quoted or alluded to in the New Testament more than almost any other Old Testament book. A complete scroll of Isaiah found among the Dead Sea Scrolls (1947) is about 1,000 years older than the copies known before.",
  GEN: "Covers more time than any other book of the Bible: from creation to Joseph, at least 2,000 years of history.",
  PHM: "Paul's shortest letter: 25 verses, written to ask a master to welcome back a runaway slave as a brother.",
  REV: "The only New Testament book that promises a blessing to those who read it aloud and hear it (1:3).",
  LAM: "Chapters 1, 2 and 4 are acrostic poems: each verse begins with the next letter of the Hebrew alphabet. Chapter 3 gives each letter three verses.",
  MRK: "The shortest Gospel, and the fastest-moving: the word \"immediately\" appears over 40 times.",
  ACT: "Covers about 30 years, from Jesus' ascension to Paul in Rome, and records the church's spread across about 10,000 miles of travel.",
  JON: "Jesus compared His three days in the tomb to Jonah's three days in the fish (Matthew 12:40).",
};
