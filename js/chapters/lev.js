// Leviticus chapter notes.
import { makeBook } from "./make.js";

const sources = {
  wenham: "Gordon J. Wenham, The Book of Leviticus, New International Commentary on the Old Testament (Eerdmans, 1979).",
  hartley: "John E. Hartley, Leviticus, Word Biblical Commentary 4 (Word, 1992).",
  milgrom: "Jacob Milgrom, Leviticus 1-16, Anchor Bible 3 (Doubleday, 1991).",
  ross: "Allen P. Ross, Holiness to the LORD: A Guide to the Exposition of the Book of Leviticus (Baker, 2002).",
  halot: "Koehler and Baumgartner, The Hebrew and Aramaic Lexicon of the Old Testament (Brill, 1994-2000).",
};

export default makeBook({ lang: "Hebrew", sources, use: ["wenham", "ross"] }, {
  1: {
    intro: "From the newly built tabernacle, the LORD calls Moses and gives the first offering: the burnt offering. A worshiper brings an unblemished bull, sheep, goat or bird, lays a hand on its head, and the whole animal is burned on the altar as \"a soothing aroma to the LORD.\"",
    v: [
      ["1:1", "The LORD called to Moses from the tent of meeting", "Exodus ended with the glory filling the tabernacle; Leviticus begins with God speaking from it. Its theme is how a holy God can live among a sinful people."],
      ["1:4", "Lay his hand on the head", "The worshiper identifies with the animal, which dies in his place, \"to make atonement on his behalf.\""],
      ["1:9", "A soothing aroma", "The whole offering pleases God. Ephesians 5:2 says Christ gave Himself \"as an offering and a sacrifice to God as a fragrant aroma.\""],
      ["1:14", "Turtledoves or young pigeons", "The poor could bring birds. Mary and Joseph brought birds at Jesus' presentation (Luke 2:24)."],
    ],
    w: [["כָּפַר", "kaphar", "H3722", "to make atonement, to ransom, to cover", "Atonement in Leviticus means removing sin and its guilt by a ransom paid, so the worshiper can be at peace with God.", ["halot", "milgrom"]]],
    refs: [["EPH.5", "Ephesians 5:2", "A fragrant aroma"], ["HEB.10", "Hebrews 10:1-10", "Sacrifices could not take away sins; Christ came"], ["ROM.12", "Romans 12:1", "Present your bodies a living sacrifice"]],
  },
  2: {
    intro: "The grain offering: fine flour with oil and frankincense, or baked cakes, offered without yeast or honey but always with salt. A handful is burned as a memorial, and the rest goes to the priests.",
    v: [
      ["2:1", "Fine flour", "The fruit of daily work, given back to God in thanks."],
      ["2:11", "No leaven or honey", "Both cause fermentation, often a picture of corruption in Scripture."],
      ["2:13", "The salt of the covenant", "Salt preserves. Jesus called His followers \"the salt of the earth\" (Matthew 5:13)."],
    ],
    w: [["מִנְחָה", "minchah", "H4503", "gift, tribute, grain offering", "The word first meant a gift brought to honor a greater person, like Jacob's present to Esau (Genesis 32:13). The grain offering was a gift of the harvest to God, offered with salt, called \"the salt of the covenant\" (2:13).", ["halot", "wenham"]]],
    refs: [["MAT.5", "Matthew 5:13", "You are the salt of the earth"], ["COL.4", "Colossians 4:6", "Speech seasoned with salt"]],
  },
  3: {
    intro: "The peace offering (or fellowship offering): an unblemished animal from the herd or flock. The fat portions are burned for the LORD, and much of the meat is eaten by the worshiper and family in a joyful meal. No fat or blood may be eaten.",
    v: [
      ["3:1", "A sacrifice of peace offerings", "Shalom means wholeness and fellowship. This offering celebrated being at peace with God."],
      ["3:16", "All fat is the LORD's", "In the peace offering, the fat was burned on the altar as a pleasing aroma. All the fat belongs to the LORD; the richest part was His."],
      ["3:17", "Neither fat nor blood", "A lasting rule \"throughout your generations.\""],
    ],
    w: [["שְׁלָמִים", "shelamim", "H8002", "peace offering, fellowship offering", "From the same root as shalom. Unlike the burnt offering, most of this sacrifice was eaten by the worshiper and family, a meal shared in God's presence (7:15).", ["halot", "milgrom"]]],
    refs: [["EPH.2", "Ephesians 2:14", "He Himself is our peace"], ["COL.1", "Colossians 1:20", "Peace through the blood of His cross"]],
  },
  4: {
    intro: "The sin offering (or purification offering) for unintentional sins, with different animals for the anointed priest, the whole congregation, a leader and an ordinary person. The blood is applied to the altar, and the person is forgiven.",
    v: [
      ["4:2", "Unintentionally", "Even sins we do not realize make us unclean before God. Psalm 19:12: \"Acquit me of hidden faults.\""],
      ["4:3", "If the anointed priest sins", "The priest's sin brings guilt on the people, so he offers the largest animal, a bull."],
      ["4:12", "Outside the camp", "Hebrews 13:11-12 notes that Jesus also suffered outside the gate."],
      ["4:31", "He will be forgiven", "Each section on sin offerings ends with the same promise: the priest will make atonement for him, and he will be forgiven."],
    ],
    w: [["חַטָּאת", "chatta't", "H2403", "sin; sin offering", "The same Hebrew word names both the sin and the offering that deals with it. Some scholars call it the \"purification offering,\" because its blood cleansed the sanctuary from the stain of sin. It covered sins done unintentionally (4:2).", ["halot", "milgrom"]]],
    refs: [["HEB.13", "Hebrews 13:11-12", "Jesus suffered outside the gate"], ["PSA.19", "Psalm 19:12", "Acquit me of hidden faults"], ["2CO.5", "2 Corinthians 5:21", "He made Him who knew no sin to be sin"]],
  },
  5: {
    intro: "More on the sin offering: failing to testify, touching something unclean, careless oaths. The sinner must confess, and offerings are scaled so that even the very poor can bring two birds or some flour. Then the guilt offering for wrongs against holy things begins.",
    v: [
      ["5:5", "He shall confess", "When someone realized their guilt, they had to confess the sin they committed. Confession came before the sacrifice."],
      ["5:7, 11", "If he cannot afford", "A person who could not afford a lamb could bring two birds, and the very poor a little flour. No one was too poor to be forgiven."],
      ["5:15-16", "Make restitution plus a fifth", "The guilt offering repairs the damage as well as the relationship."],
    ],
    w: [["אָשָׁם", "asham", "H817", "guilt, guilt offering, reparation", "This offering came with repayment: the worshiper restored what was taken and added a fifth more (5:16; 6:5). Isaiah 53:10 uses this word for the Servant who gives His life as a guilt offering.", ["halot", "hartley"]]],
    refs: [["1JN.1", "1 John 1:9", "If we confess our sins"], ["PSA.32", "Psalm 32:5", "I acknowledged my sin to You"]],
  },
  6: {
    intro: "The guilt offering for wronging a neighbor (lying about a deposit, robbery, extortion): repay in full plus a fifth, then bring an offering. Then instructions to the priests for the burnt, grain and sin offerings, including that the altar fire must never go out.",
    v: [
      ["6:2", "Acts unfaithfully against the LORD", "Wronging a neighbor is first a sin against God."],
      ["6:5", "On the day he presents his guilt offering", "Make things right with people before coming to God, as Jesus taught (Matthew 5:23-24)."],
      ["6:13", "Fire shall be kept burning continually", "The fire God first lit (9:24) was to be kept alive."],
    ],
    bg: [["A fire that never went out", "\"Fire shall be kept burning continually on the altar; it is not to go out\" (6:13). The priests added wood every morning, so the altar was always ready for worship. Many readers see in it a picture of devotion that never lets the flame die.", "good", ["wenham", "hartley"]]],
    refs: [["MAT.5", "Matthew 5:23-24", "First be reconciled to your brother"], ["LUK.19", "Luke 19:8", "Zacchaeus repays"]],
  },
  7: {
    intro: "More instructions to the priests on the guilt offering and the peace offering, including offerings of thanksgiving, vows and freewill gifts, and the priests' portions. Anyone who eats sacred meat while unclean is cut off.",
    v: [
      ["7:12", "For thanksgiving", "Peace offerings could be given just to say thank you. Hebrews 13:15: \"a sacrifice of praise.\""],
      ["7:16", "A vow or a freewill offering", "Worship included both promised and spontaneous gifts."],
      ["7:20", "Unclean", "Holy things are to be handled with reverence. Paul warns similarly about the Lord's Supper (1 Corinthians 11:27-29)."],
    ],
    bg: [["Eaten the same day", "A thanksgiving offering had to be eaten on the day it was offered, with nothing left until morning (7:15). Thanks to God was meant to be shared at once with family and friends, not stored away.", "good", ["milgrom", "ross"]]],
    refs: [["HEB.13", "Hebrews 13:15", "A sacrifice of praise"], ["1CO.11", "1 Corinthians 11:27-29", "Eating in an unworthy manner"]],
  },
  8: {
    intro: "Moses ordains Aaron and his sons before the whole congregation, exactly as God commanded in Exodus 29: washing, robing, anointing with oil, offerings and blood on ear, thumb and toe. They stay at the doorway of the tent for seven days.",
    v: [
      ["8:6", "Washed them with water", "Before Aaron and his sons were dressed and anointed as priests, Moses washed them with water. Cleansing came before service."],
      ["8:12", "Anointed him to consecrate him", "Messiah means \"anointed one.\" Psalm 133:2 pictures the oil running down Aaron's beard."],
      ["8:36", "Did all the things", "The chapter repeats \"just as the LORD commanded Moses\" seven times."],
    ],
    bg: [["Ear, thumb and toe", "At Aaron's ordination, Moses put blood on the right ear, right thumb and right big toe of Aaron and his sons (8:23-24). Many interpreters see the whole person set apart: ears to hear God, hands to serve, feet to walk in His ways. The ordination lasted seven days (8:33).", "good", ["wenham", "ross"]]],
    refs: [["EXO.29", "Exodus 29", "The ordination commanded"], ["PSA.133", "Psalm 133:2", "Like the precious oil upon Aaron's beard"], ["HEB.5", "Hebrews 5:1-5", "Every high priest taken from among men"]],
  },
  9: {
    intro: "On the eighth day Aaron offers the first sacrifices for himself and the people. He lifts his hands and blesses them, Moses and Aaron go into the tent, and the glory of the LORD appears. Fire comes out from the LORD and consumes the offering, and the people shout and fall on their faces.",
    v: [
      ["9:6", "That the glory of the LORD may appear", "Moses tells the people to do what the LORD commanded, so that the glory of the LORD may appear to them. That was the purpose of it all, and it did (9:23-24)."],
      ["9:22", "Aaron lifted up his hands and blessed them", "Probably with the blessing of Numbers 6:24-26."],
      ["9:24", "Fire came out from before the LORD", "God accepts the offering. Fire also fell at the dedication of Solomon's temple (2 Chronicles 7:1)."],
    ],
    bg: [["Fire from the LORD", "On the first day of the priests' service, fire came out from the LORD and consumed the offering, and the people shouted and fell on their faces (9:24). God showed that He accepted the worship. Similar fire fell at Solomon's temple (2 Chronicles 7:1) and for Elijah (1 Kings 18:38).", "good", ["wenham", "hartley"]]],
    refs: [["2CH.7", "2 Chronicles 7:1-3", "Fire came down from heaven"], ["1KI.18", "1 Kings 18:38-39", "The fire of the LORD fell on Elijah's altar"]],
  },
  10: {
    intro: "On the same day, Aaron's sons Nadab and Abihu offer \"strange fire\" that God had not commanded, and fire from the LORD consumes them. Aaron is silent. God tells the priests not to drink wine before serving, and to teach the difference between holy and common.",
    v: [
      ["10:1", "Strange fire", "Scripture does not explain exactly what was wrong, only that it was \"what He had not commanded them.\"", "silent"],
      ["10:3", "By those who come near Me I will be treated as holy", "Nearness to God is a privilege, not something to treat casually."],
      ["10:9-10", "Do not drink wine", "Some suggest this hints that drunkenness lay behind the sin. Priests must have clear minds to tell holy from common."],
    ],
    bg: [["Nadab and Abihu", "Aaron's sons offered \"strange fire\" that God had not commanded, and fire from the LORD consumed them (10:1-2). Readers differ on exactly what went wrong: the wrong fire source, the wrong time, or acting without being told. The warning against wine that follows (10:9) leads some to think they were drunk.", "good", ["wenham", "milgrom"]]],
    refs: [["HEB.12", "Hebrews 12:28-29", "Our God is a consuming fire"], ["ACT.5", "Acts 5:1-11", "Ananias and Sapphira"]],
  },
  11: {
    intro: "Rules about clean and unclean animals: land animals that chew the cud and have split hooves, water creatures with fins and scales, a list of forbidden birds, and certain insects. The chapter ends: \"Be holy, for I am holy.\"",
    v: [
      ["11:3", "Divides the hoof and chews the cud", "Cattle, sheep and goats were clean; pigs and camels were not."],
      ["11:44", "Be holy, for I am holy", "Peter quotes this for Christians (1 Peter 1:16)."],
      ["11:47", "To make a distinction", "Even daily meals reminded Israel that they were set apart."],
    ],
    why: "Why were some animals clean and others unclean? Leviticus gives the rules but not the reasons.",
    views: [
      ["Symbols of order and wholeness", "Many hold that clean animals fit the normal pattern of their realm (land, water, air), picturing the wholeness and order of a holy life.", ["wenham", "milgrom"]],
      ["Health and hygiene", "Some point out that many unclean animals carry disease or eat carrion, so the laws also protected health.", ["hartley"]],
      ["A mark of separation", "Others stress that the rules simply set Israel apart from the nations, which is why Peter's vision about food came with the call to the Gentiles (Acts 10).", ["ross"]],
    ],
    common: "All agree that the rules taught Israel to be different for God, and that the New Testament declares all foods clean in Christ (Mark 7:19; Acts 10:15).",
    bg: [["Why some animals were unclean", "Scholars have offered several reasons for the food laws: health, separating Israel from pagan worship, or a symbol of wholeness in which creatures that fit their kind were clean. The chapter itself gives the main reason: \"be holy, for I am holy\" (11:44; 1 Peter 1:16). In the New Testament, Jesus declared all foods clean (Mark 7:19) and Peter saw a vision about it (Acts 10).", "good", ["wenham", "milgrom", "hartley"]]],
    refs: [["1PE.1", "1 Peter 1:15-16", "You shall be holy, for I am holy"], ["MRK.7", "Mark 7:18-19", "He declared all foods clean"], ["ACT.10", "Acts 10:9-16", "Peter's vision"]],
  },
  12: {
    intro: "After childbirth a mother is ceremonially unclean for a time, longer for a daughter than a son. A son is circumcised on the eighth day. At the end of her purification, the mother brings a lamb and a bird, or two birds if she is poor.",
    v: [
      ["12:3", "On the eighth day", "The sign of the covenant given to Abraham (Genesis 17:12). Jesus was circumcised on the eighth day (Luke 2:21)."],
      ["12:8", "Two turtledoves", "Mary offered two birds (Luke 2:22-24), showing that Jesus was born into a poor family."],
    ],
    bg: [["Unclean does not mean sinful", "Ritual uncleanness in Leviticus is not the same as sin. Childbirth is a blessing; the uncleanness related to the loss of blood, connected with life and death.", "good", ["wenham", "milgrom"]]],
    refs: [["LUK.2", "Luke 2:21-24", "Jesus circumcised and presented"]],
  },
  13: {
    intro: "Instructions for priests to examine skin diseases (traditionally \"leprosy\"), mildew in clothing and the like. A person with an active disease must live outside the camp, with torn clothes and uncovered head, crying \"Unclean! Unclean!\"",
    v: [
      ["13:3", "The priest shall look", "The priest acted as health inspector, deciding by careful observation."],
      ["13:45-46", "Unclean! Unclean!", "A lonely life outside the camp. Jesus touched lepers and healed them (Mark 1:40-42)."],
    ],
    w: [["צָרַעַת", "tsara'at", "H6883", "a skin disease (often translated leprosy), or mold on cloth or walls", "Not the same as modern leprosy (Hansen's disease). The word covers several skin conditions and even mildew.", ["halot", "hartley"]]],
    refs: [["MRK.1", "Mark 1:40-45", "Jesus touches and cleanses a leper"], ["LUK.17", "Luke 17:11-19", "Ten lepers healed"]],
  },
  14: {
    intro: "The ceremony for a healed person to be declared clean: two birds, one killed and one dipped in its blood and set free, then washing, shaving and offerings on the eighth day. Rules follow for mold in a house.",
    v: [
      ["14:3", "The priest shall go out", "The priest goes out to the one outside the camp."],
      ["14:7", "Let the live bird go free", "For a person healed of a skin disease, one bird was killed and another dipped in its blood and released into the open field. A picture of cleansing and freedom."],
      ["14:14", "Ear, thumb and toe", "The same marks as a priest's ordination. The healed person is restored to the worshiping community."],
    ],
    bg: [["Two birds", "To cleanse a healed person, one bird was killed over fresh water, and the other was dipped in its blood and set free over an open field (14:4-7). It was a vivid picture of a life restored and released. Jesus told a healed leper to show himself to the priest and offer what Moses commanded (Mark 1:44).", "good", ["wenham", "ross"]]],
    refs: [["MAT.8", "Matthew 8:4", "Show yourself to the priest"], ["LUK.5", "Luke 5:12-14", "Offer for your cleansing"]],
  },
  15: {
    intro: "Rules about bodily discharges for men and women, which make a person ritually unclean, and how to be cleansed by washing and waiting. The goal: \"so that they will not die in their uncleanness by defiling My tabernacle.\"",
    v: [
      ["15:31", "Keep the sons of Israel separated from their uncleanness", "God lived in their midst, so the people had to keep His dwelling pure."],
      ["15:25", "A discharge of her blood many days", "The woman Jesus healed after twelve years of bleeding (Mark 5:25-34) would have been unclean under this law. Jesus did not shrink from her touch."],
    ],
    bg: [["A woman who touched Jesus", "Under 15:25, a woman with a long flow of blood was unclean, and whatever she touched became unclean too. The woman in Mark 5:25-34 had suffered twelve years. When she touched Jesus, uncleanness did not pass to Him; instead, healing passed to her.", "good", ["wenham", "hartley"]]],
    refs: [["MRK.5", "Mark 5:25-34", "The woman who touched His cloak"]],
  },
  16: {
    intro: "The Day of Atonement, the holiest day of Israel's year. Once a year the high priest enters the holy of holies with blood. Two goats are chosen: one is sacrificed as a sin offering, and the other, the scapegoat, has the people's sins confessed over it and is sent away into the wilderness.",
    v: [
      ["16:2", "Not at any time", "Aaron was not to enter the Most Holy Place whenever he chose, or he would die. Only once a year, on the Day of Atonement, and only with blood (Hebrews 9:7)."],
      ["16:21", "Confess over it all the iniquities", "The live goat carries away the people's sins."],
      ["16:30", "You will be clean from all your sins before the LORD", "The Day promised a fresh start every year."],
      ["16:34", "Once every year", "Hebrews contrasts this with Christ, who entered \"once for all\" with His own blood (Hebrews 9:12)."],
    ],
    w: [["עֲזָאזֵל", "azazel", "H5799", "scapegoat; or the name of a place or being", "The meaning is uncertain. It may mean \"the goat that goes away,\" \"complete removal,\" or a wilderness place or demon. All agree the goat carries sin far away.", ["halot", "milgrom"]]],
    refs: [["HEB.9", "Hebrews 9:6-14", "Christ entered the holy place once for all"], ["HEB.10", "Hebrews 10:1-4", "Reminders of sins year by year"], ["PSA.103", "Psalm 103:12", "As far as the east is from the west"]],
  },
  17: {
    intro: "All sacrifices must be brought to the tabernacle, not offered in the open fields, where people had been offering to goat demons. No one may eat blood, \"for the life of the flesh is in the blood, and I have given it to you on the altar to make atonement.\"",
    v: [
      ["17:7", "Goat demons", "God stops false worship hiding in the fields."],
      ["17:11", "The life is in the blood", "The key verse on sacrifice: life is given for life. Hebrews 9:22: \"without shedding of blood there is no forgiveness.\""],
      ["17:3-4", "Has not brought it to the doorway of the tent of meeting", "In the wilderness every animal killed for food was brought as a peace offering, so no one could quietly sacrifice to other gods. Once Israel spread out in the land, Deuteronomy 12:20-21 allowed killing animals for food at home."],
      ["17:13", "He shall pour out its blood and cover it with earth", "Even with wild game, the blood, which stands for the life, is given back to God, not eaten."],
    ],
    bg: [["Goat demons", "The Hebrew se'irim means \"hairy ones\" or goats. Neighboring peoples believed spirits haunted the open country, and some Israelites had been sacrificing to them. Later King Jeroboam appointed priests for them (2 Chronicles 11:15).", "good", ["milgrom", "hartley"]]],
    w: [["כָּפַר", "kaphar", "H3722", "to make atonement", "To cover over or wipe clean a debt of sin, so that the relationship with God is restored. Leviticus 17:11 is one of the clearest statements of how atonement works: a life given in place of a life.", ["halot", "wenham"]]],
    refs: [["HEB.9", "Hebrews 9:22", "Without shedding of blood"], ["ACT.15", "Acts 15:20, 29", "Abstain from blood"]],
  },
  18: {
    intro: "God forbids Israel to follow the ways of Egypt and Canaan. He lists forbidden sexual relationships (close relatives, adultery, same-sex relations, bestiality) and forbids child sacrifice to Molech. These practices defiled the land, and the land would \"vomit out\" any people who did them.",
    v: [
      ["18:3", "You shall not do what is done in Egypt or Canaan", "Do not live as people did in Egypt, where you came from, or in Canaan, where I am bringing you. God's people must be different."],
      ["18:5", "If a man does them, he shall live", "Quoted by Paul in Romans 10:5 and Galatians 3:12."],
      ["18:21", "Molech", "A god whose worship involved burning children."],
      ["18:28", "The land will spew you out", "God judges His own people by the same standard."],
    ],
    bg: [["Not like Egypt or Canaan", "\"You shall not do what is done in the land of Egypt... nor in the land of Canaan\" (18:3). The chapter guards family life and forbids offering children to Molech (18:21). Israel was called to be different from the nations around it.", "good", ["wenham", "ross"]]],
    refs: [["1CO.6", "1 Corinthians 6:9-11", "Such were some of you; but you were washed"], ["ROM.10", "Romans 10:5", "The man who practices the righteousness of the law"]],
  },
  19: {
    intro: "A chapter of holiness in daily life, under the heading \"You shall be holy, for I the LORD your God am holy.\" Honor parents, keep the Sabbath, leave gleanings for the poor, do not steal or lie, pay workers promptly, do not curse the deaf or trip the blind, judge fairly, do not hate or take revenge, love your neighbor as yourself, and love the stranger as yourself.",
    v: [
      ["19:2", "You shall be holy", "Holiness is not only for priests and rituals but for farm fields, wages and words."],
      ["19:9-10", "Leave the gleanings", "Do not harvest to the very edges of your field or gather what falls. Leave it for the poor and the foreigner. Ruth gleaned under this law (Ruth 2)."],
      ["19:18", "Love your neighbor as yourself", "Jesus calls this the second greatest commandment (Matthew 22:39)."],
      ["19:34", "Love him as yourself", "Love reaches to the foreigner too, \"for you were aliens in the land of Egypt.\""],
    ],
    bg: [["Love your neighbor", "\"You shall love your neighbor as yourself\" (19:18) comes in the middle of practical laws: leave grain for the poor at the edges of the field (19:9-10), pay workers the same day (19:13), and love the foreigner as yourself (19:34). Jesus called it the second greatest commandment (Matthew 22:39). Boaz followed the gleaning law with Ruth (Ruth 2).", "strong", ["wenham", "hartley"]]],
    w: [["קָדוֹשׁ", "qadosh", "H6918", "holy, set apart", "\"You shall be holy, for I the LORD your God am holy\" (19:2). Holy means set apart for God, and this chapter shows it reaches into farming, business, family and how people treat the deaf and blind (19:14).", ["halot", "milgrom"]]],
    refs: [["MAT.22", "Matthew 22:39", "The second is like it"], ["LUK.10", "Luke 10:25-37", "The good Samaritan"], ["JAS.2", "James 2:8", "The royal law"], ["RUT.2", "Ruth 2", "Ruth gleans"]],
  },
  20: {
    intro: "Penalties for the sins listed in chapter 18 and for turning to mediums and spiritists. God repeats His call: \"Consecrate yourselves therefore and be holy... I am the LORD who sanctifies you.\"",
    v: [
      ["20:6", "Mediums and spiritists", "Turning to them is spiritual unfaithfulness. Saul's visit to the medium of Endor shows the danger (1 Samuel 28)."],
      ["20:8", "I am the LORD who sanctifies you", "Keep My decrees and follow them. I am the LORD who makes you holy. Holiness is God's work in His people."],
      ["20:26", "I have set you apart", "You are to be holy to Me, because I the LORD am holy, and I have set you apart from the nations to be My own."],
    ],
    bg: [["Molech", "Molech was a god worshiped by offering children in fire (20:2-5). Solomon later built a shrine for Molech, \"the detestable idol of the Ammonites\" (1 Kings 11:7), and kings Ahaz and Manasseh made their sons pass through fire (2 Kings 16:3; 21:6). God treated it as one of the worst sins.", "good", ["hartley", "milgrom"]]],
    refs: [["1SA.28", "1 Samuel 28", "Saul and the medium"], ["1TH.4", "1 Thessalonians 4:3-7", "This is the will of God, your sanctification"]],
  },
  21: {
    intro: "Special rules of holiness for priests: about mourning, marriage and physical defects. The high priest must keep the strictest standards because \"the crown of the anointing oil of his God is on him.\"",
    v: [
      ["21:6", "They shall be holy to their God", "Those who serve closest to God carry the highest responsibility."],
      ["21:17", "No one who has a defect", "Priests with physical defects could still eat the holy food (21:22) but could not serve at the altar, picturing the perfection required of the one who approaches God. Christ is the perfect High Priest (Hebrews 7:26)."],
    ],
    bg: [["The high priest's clothes", "The high priest was not to tear his clothes in mourning (21:10). At Jesus' trial, the high priest Caiaphas tore his robes when he charged Jesus with blasphemy (Matthew 26:65).", "good", ["hartley", "ross"]]],
    refs: [["HEB.7", "Hebrews 7:26", "Holy, innocent, undefiled"], ["JAS.3", "James 3:1", "Teachers will incur a stricter judgment"]],
  },
  22: {
    intro: "More rules for priests: no unclean priest may eat holy food, and offerings must be without defect. \"You shall not profane My holy name, but I will be sanctified among the sons of Israel.\"",
    v: [
      ["22:10-13", "No stranger shall eat the holy gift", "Holy food belonged to the priest's household, including a bought servant or a widowed daughter who came home."],
      ["22:20", "Whatever has a defect, you shall not offer", "Malachi 1:8 rebukes priests who offered blind and lame animals."],
      ["22:28", "You shall not kill both it and its young in one day", "Do not slaughter a cow or sheep and its young on the same day. Even in sacrifice, God taught mercy."],
      ["22:32", "I will be sanctified", "God's name is honored when His people treat Him as holy."],
    ],
    bg: [["Without blemish", "Only animals without defect could be offered, because the offering stood for giving God one's best. The New Testament calls Christ \"a lamb unblemished and spotless\" (1 Peter 1:19), the perfect offering.", "good", ["wenham", "ross"]]],
    refs: [["MAL.1", "Malachi 1:6-14", "Blemished offerings rebuked"], ["1PE.1", "1 Peter 1:19", "A lamb unblemished and spotless"]],
  },
  23: {
    intro: "The calendar of Israel's holy days: the weekly Sabbath, Passover and Unleavened Bread, Firstfruits, the Feast of Weeks (Pentecost), Trumpets, the Day of Atonement, and the Feast of Booths.",
    v: [
      ["23:5", "Passover", "The LORD's Passover begins at twilight on the fourteenth day of the first month. Jesus was crucified at Passover, and Paul calls Him our Passover lamb (1 Corinthians 5:7)."],
      ["23:10-11", "Firstfruits", "Offered the day after the Sabbath following Passover. Paul calls Christ's resurrection \"the first fruits of those who are asleep\" (1 Corinthians 15:20)."],
      ["23:15-16", "Fifty days", "The Feast of Weeks, called Pentecost (\"fiftieth\") in Greek, when the Spirit came (Acts 2:1)."],
      ["23:42-43", "Live in booths", "So that each generation remembers that God made Israel live in booths when He brought them out of Egypt."],
    ],
    bg: [["Israel's calendar of feasts", "The chapter lists the sacred times: the weekly Sabbath, Passover, Unleavened Bread, Firstfruits, the Feast of Weeks fifty days later (later called Pentecost), Trumpets, the Day of Atonement and Booths. Christ died at Passover, Paul calls Him \"the first fruits\" of those raised (1 Corinthians 15:20), and the Spirit came at Pentecost (Acts 2:1).", "strong", ["wenham", "hartley"]]],
    w: [["מוֹעֵד", "mo'ed", "H4150", "appointed time, meeting, festival", "The feasts are \"the LORD's appointed times\" (23:2). The same word names the \"tent of meeting.\" These were dates set by God to meet with His people.", ["halot", "milgrom"]]],
    refs: [["1CO.15", "1 Corinthians 15:20", "Christ, the first fruits"], ["ACT.2", "Acts 2:1", "The day of Pentecost"], ["JHN.7", "John 7:37-38", "On the last day of the feast"]],
  },
  24: {
    intro: "The lamp in the tabernacle must burn continually, and twelve loaves of the bread of the Presence are set out each Sabbath. A man who blasphemes God's name is stoned, and God gives the law of equal justice: \"There shall be one standard for you; it shall be for the stranger as well as the native.\"",
    v: [
      ["24:2", "Clear oil from beaten olives", "A lamp burning before the LORD continually."],
      ["24:8", "Every Sabbath day", "Twelve loaves for the twelve tribes. David once ate this bread (1 Samuel 21:6), and Jesus referred to it (Mark 2:26)."],
      ["24:22", "One standard", "The same law for everyone, foreigner and Israelite."],
    ],
    bg: [["One law for everyone", "A man with an Israelite mother and an Egyptian father cursed God's name (24:10-11). God ruled that the same law applied to the foreigner and the native-born (24:22). \"Eye for eye\" here (24:20) set a limit for judges, so punishment fit the crime.", "good", ["wenham", "hartley"]]],
    refs: [["MRK.2", "Mark 2:25-26", "David ate the consecrated bread"], ["EXO.25", "Exodus 25:30", "The bread of the Presence"]],
  },
  25: {
    intro: "Every seventh year the land rests, and every fiftieth year is a Jubilee: land returns to its original families, and Israelites who sold themselves into service go free. \"The land is Mine; for you are but aliens and sojourners with Me.\" God also forbids charging interest to a poor brother.",
    v: [
      ["25:10", "Proclaim liberty throughout the land", "These words are engraved on the Liberty Bell in Philadelphia."],
      ["25:23", "The land is Mine", "The land must not be sold permanently, because it belongs to God. Israel lived on it as foreigners and guests, holding it in trust from Him."],
      ["25:35-36", "Support him", "Help a poor relative without charging interest, \"that your countryman may live with you.\""],
      ["25:55", "My servants whom I brought out", "Israelites belong to God, so they cannot be permanently enslaved."],
    ],
    w: [["יוֹבֵל", "yovel", "H3104", "ram's horn; jubilee", "The fiftieth year was announced by a ram's horn on the Day of Atonement (25:9), and the word for the horn gave us \"jubilee.\" Land went back to its family and slaves went free. Jesus began His ministry announcing \"the favorable year of the Lord\" (Luke 4:19).", ["halot", "hartley"]]],
    refs: [["LUK.4", "Luke 4:18-19", "The favorable year of the Lord"], ["ISA.61", "Isaiah 61:1-2", "To proclaim liberty to captives"]],
  },
  26: {
    intro: "God sets out blessings for obedience (rain, harvests, peace, His presence: \"I will walk among you and be your God\") and curses for disobedience, growing worse until exile. Yet even then, if they confess, God will remember His covenant with Jacob, Isaac and Abraham.",
    v: [
      ["26:12", "I will walk among you", "Paul applies it to the church in 2 Corinthians 6:16."],
      ["26:13", "I broke the bars of your yoke and made you walk erect", "I am the LORD who brought you out of Egypt. I broke the bars of your yoke and let you walk with your heads held high."],
      ["26:40-42", "If they confess their iniquity... I will remember My covenant", "Even after judgment, the door to return stays open."],
      ["26:44", "I will not reject them", "God's faithfulness outlasts Israel's unfaithfulness."],
    ],
    bg: [["Blessings, warnings and hope", "Like Deuteronomy 28, this chapter sets out blessings for obedience and warnings for disobedience, ending with exile from the land (26:33). Yet God promises that even then He will remember His covenant with Abraham, Isaac and Jacob (26:42-45). The exile and return later came to pass.", "strong", ["wenham", "hartley"]]],
    refs: [["DEU.28", "Deuteronomy 28", "Blessings and curses"], ["2CO.6", "2 Corinthians 6:16", "I will dwell in them and walk among them"], ["2CH.36", "2 Chronicles 36:20-21", "The land enjoyed its sabbaths"]],
  },
  27: {
    intro: "Rules for vows: people, animals, houses and fields dedicated to the LORD, and how to redeem them with a payment. The tithe of land and flock belongs to the LORD. The book ends: \"These are the commandments which the LORD commanded Moses for the sons of Israel at Mount Sinai.\"",
    v: [
      ["27:2", "A difficult vow", "A person could be dedicated to God's service and then redeemed with silver."],
      ["27:30", "The tithe is holy to the LORD", "A tenth of the harvest belonged to God already."],
      ["27:34", "At Mount Sinai", "Leviticus ends where it began, with God speaking."],
    ],
    bg: [["Vows and tithes", "The book ends with rules for keeping promises made to God and for the tithe: \"all the tithe of the land... is holy to the LORD\" (27:30). Making a vow was voluntary, but keeping it was not (Ecclesiastes 5:4-5).", "good", ["wenham", "ross"]]],
    refs: [["ECC.5", "Ecclesiastes 5:4-5", "Pay what you vow"], ["MAL.3", "Malachi 3:10", "Bring the whole tithe"]],
  },
});
