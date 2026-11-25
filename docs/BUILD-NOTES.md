# How this app was built

The story of the Family Bible Study app: what it is for, how the work is run, the decisions
behind it and the rules it keeps. It is written for anyone picking up the project, whether
that's a family member or a professional developer. For the code itself, start with
[ARCHITECTURE.md](ARCHITECTURE.md).

## At a glance

| | |
| --- | --- |
| **What** | A calm, simple Bible study app for a family whose readers are 10 to 89 years old |
| **Who** | Melissa Bennett: product owner, designer, content editor and tester. Code written with Claude (Anthropic's AI) as a pair programmer, under her direction and review |
| **Started** | Sunday, November 22, 2026 |
| **Release** | Friday, December 4, 2026, as a Christmas gift |
| **Live at** | [bible.breakoutroom.net](https://bible.breakoutroom.net) |
| **Runs on** | iPhone, iPad, Android and computers, from one codebase |
| **Stack** | Progressive web app (HTML, CSS, JavaScript modules, no build step), GitHub Pages, Supabase (optional sign-in and backup), API.Bible and the ESV API for Scripture |
| **Planning** | Project HQ workbook (every task has a code, like B-19) and [STATUS.md](../STATUS.md) (the live tracker) |

## Why it exists

To help the family grow in faith together and to make serious Bible study easy at every age.
The original brief:

- **NASB by default**, with the ESV as an option.
- **Track what I've read**, and offer study paths through the whole Bible: by timeline, by
  connections between books, and by audience.
- **History, culture, maps then and now, and Greek and Hebrew word study**, with cited sources.
- **Show other views fairly.** The family leans Church of Christ and Baptist, and the app
  presents the main Christian views without pushing any of them.
- **Keep the design calm and simple.**

Everything since has grown out of that brief. The family-facing rules for study content are
in [STUDY-GUIDELINES.md](STUDY-GUIDELINES.md).

## How the work is run

The project runs like a small product team: one decision-maker, one builder, written plans,
and automated checks.

1. **Ideas become tasks.** Every request gets a code in the Project HQ workbook (`B-01`
   through `B-79` so far), with a status, whether it's doable as a web app, and notes.
   Feasibility is called out honestly: ✅ doable, ⚠️ needs a workaround, or 🧑‍💼 needs outside
   help (for example, an App Store version needs a Mac and an Apple developer account).
2. **Tasks get a due date in [STATUS.md](../STATUS.md).** It holds the release plan, what's
   done, what's needed from Melissa, open questions and the standing rules. It is updated
   with every publish and at four daily check-ins (9:00 AM, 1:30 PM, 6:30 PM and 10:00 PM
   Central) through release. Project HQ is synced from it after each check-in.
3. **Work is built on a branch and checked before it ships.** Lint, unit tests and browser
   tests run before every publish (see "How quality is checked" below).
4. **Melissa reviews and decides.** Visual work comes to her as screenshots and before/after
   comparisons (looks, maps, storybook pictures, seasonal backgrounds) and is revised in
   rounds from her notes. Statuses move from *Done, needs review* to *Final* only after
   her review.
5. **Decisions become standing rules** so they hold in every later change (listed below).

## Milestones

| Date | What landed |
| --- | --- |
| Sun Nov 22 | Reader with NASB, book and chapter picker, study paths, reading tracker, installable on iPhone and Android |
| Mon Nov 23 | Family sign-in and backup (Supabase), read-aloud, dictation, journal, the built-in Bible helper, automated tests and a content security policy |
| Tue Nov 24 | Study notes for every chapter from Genesis to Revelation, Strong's concordance, maps upgrade, sources audit, Buddy the study companion, Bible Spin game, gift packet and starter kit drafts |
| Wed Nov 25 | Readability check of every screen in every look, Seasonal changes look, handwriting and drawing with Apple Pencil, full concordance search, first quality ratings |
| Wed Dec 2 | Quality review against top Bible, study and journaling apps (B-75), final ratings and fixes |
| Fri Dec 4 | Release |

The day-by-day log is in the "Since last update" section of [STATUS.md](../STATUS.md) and in
the git history.

## Architecture at a glance

- **One codebase for every device.** A progressive web app installs to the home screen,
  opens full screen and works offline for chapters already read. There is no build step:
  what's in the repository is what GitHub Pages serves.
- **The device is the source of truth.** Everything is saved on the device first, so the
  app works with no account and no connection. Supabase adds sign-in, an account backup and
  the shared family Bible key, protected by row-level security.
- **Scripture is fetched, not stored.** Chapters come from API.Bible or the ESV API at
  reading time and are cached on the device for at most 14 days, within the licenses.
- **Content is data.** Study paths, notes, introductions, glossary, devotions and 1,042
  trivia questions are JavaScript modules, so tests can prove that every book, chapter and
  reference is present and valid.
- **AI is optional and fenced.** The built-in helper calls Claude through a Supabase Edge
  Function. The API key lives only in Supabase secrets, and each person has a monthly
  allowance.

Details: [ARCHITECTURE.md](ARCHITECTURE.md), [SECURITY.md](SECURITY.md) and
[DATA-SAFETY.md](DATA-SAFETY.md).

## Key decisions and why

| Decision | Why | Task |
| --- | --- | --- |
| Build a web app, not an App Store app | One codebase covers iPhone, iPad, Android and computers; no Mac, Xcode or developer account needed; updates reach everyone on next open. A native version stays possible later | B-06, B-27 |
| No build step, one vendored dependency | Anyone can read, change and deploy it with a text editor and `git push`; a CDN outage or supply-chain change can't alter the app | B-05 |
| Save on the device first, sync second | Works offline and in church; nobody loses their place if the network or an account fails. Sync was added on top once the basics were solid | B-26, B-45 |
| Supabase for family accounts | Free plan, email sign-in, row-level security, and no server to maintain. The public key is safe by design; the secret key is never used in the app | B-45 |
| NASB first; ESV hidden until its key arrives | Melissa's preferred translation first. The ESV key takes 3 to 4 weeks to approve, so the option stays hidden instead of showing a broken choice | B-01 to B-03 |
| Drop "Car mode"; keep read-aloud, microphone and Drive mode | Web apps can't listen while the phone is locked or use CarPlay and Android Auto, so a big-button Drive mode with continuous read-aloud covers the real need | B-10, B-31 |
| Built-in helper through a server function with a monthly allowance | Keeps the AI key secret and the cost predictable (100 questions per person per month guaranteed, warning at 70%) | B-23, B-46 |
| Notes and Journal kept separate | Study notes are for class and sharing and are never locked; the Journal is private reflection and can be locked. Mixing them caused a real bug, fixed in v143 | B-62 |
| Journal passcode is a privacy screen, not encryption | Honest about what a web app can promise; said plainly in the app | B-39 |
| Debated passages show every main view with sources and no denomination labels | The family holds different views, and the app is for learning, not winning arguments | B-13, B-21 |
| The app never sells anything | Melissa's decision on Nov 24: the Books and music page was removed for good | B-61 |
| Bible Spin is an original game | Original name, characters and art, inspired by game-show trivia but copying none | B-53, B-76 |
| Kids' pictures are drawn in code (SVG), with gentle motion | Light files, fast loading, sharp at any size, and still when motion is turned off | B-66 |
| Look usage is counted per family, never per person | Lets unused looks be retired without tracking anyone | B-70 |
| Sources audited to scholarly works | About 240 sources checked; withdrawn titles replaced; web links swapped for scholarly or primary sources | B-73 |

## How quality is checked

- **Lint and unit tests** (`npm run check`) on every push, in GitHub Actions. Content tests
  prove all 66 books and 1,189 chapters are present, every study path covers every chapter
  exactly once, and every trivia question and daily verse points at a real chapter.
- **Browser tests** (`npm run test:e2e`, Playwright) at phone and iPad sizes against a
  pretend Supabase: sign-in, versions, read-aloud, notes, journal, handwriting, games,
  Buddy, offline use, updates and navigation.
- **Automated sweeps** before release: every link, menu and game entry; every game mode
  played start to finish; a readability check of every screen in every look, in light,
  dark, high contrast and the largest text.
- **Device passes** on iPhone, iPad, Android, computer and landscape phones, including
  read-aloud and printing.
- **Comparison review** (B-75) against highly rated Bible, study Bible, concordance and
  journaling apps, so final ratings rest on evidence rather than self-scoring.

## Standing rules

These hold for every change. The live list is at the end of [STATUS.md](../STATUS.md).

**Faith and content**
- Scripture is the guide; notes inform and never steer. Quote translations exactly.
- Debated passages show the main views fairly, with sources and evidence labels, and no
  denomination labels. See [STUDY-GUIDELINES.md](STUDY-GUIDELINES.md).

**Family and privacy**
- No family reading plan, no tracking each other's reading, no notification reminders.
- The app never sells anything: no store, product links or Books and music page.
- Keys and passwords never go in this repository or in chat.

**Look and feel**
- Calm over clever. Every screen has to work for a 10-year-old and an 89-year-old.
- Celebrations stay short and are skipped when motion is turned down.
- Kids' pictures are fun, modern and playful, with gentle motion only and no video.
- Never change the look someone is using. Retire a look only after its season, or when
  nobody uses it. The Seasonal changes look is opt-in only.
- Buddy can always be moved, quieted or turned off.

**Protect what Melissa loves most.** Rich, accurate study content; the Bible handy in church
and class; notes for class; organized studies; the daily Scripture; printing and sharing to
Google Docs; changing the look; several translations; read-aloud and dictation; Buddy; easy
navigation. These may only get better, never be downgraded or removed.

## Update policy

- **Updates never lose anyone's place, notes or progress** and never interrupt reading,
  a game or typing ([DATA-SAFETY.md](DATA-SAFETY.md)).
- **Schedule:** frequent updates until Christmas; every Saturday night through February;
  then the last Saturday of each month. Glitch fixes ship right away.
- **Announcements stay quiet:** at most one short What's new note a month, which can be
  swiped away or turned off. No update banners. Settings lists the last 30 days of updates.
- **How to release:** run `npm run check`, bump `VERSION` in `sw.js`, and push. Installed
  apps pick up the new version on their next fresh open.

## What's next

After release: weekly deeper study notes, then monthly polish to graphics, the kids' Bible,
navigation, printing, looks and Buddy. The plan is in [ROADMAP.md](ROADMAP.md). Known
technical next steps (splitting `js/app.js` into per-view modules, moving browser tests to
`@playwright/test`) are at the end of [ARCHITECTURE.md](ARCHITECTURE.md).

## Where everything lives

| Need | Go to |
| --- | --- |
| What the app does and how to run it | [README.md](../README.md) |
| Live status, due dates, what's needed from Melissa | [STATUS.md](../STATUS.md) |
| How the code is organized | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Security model | [SECURITY.md](SECURITY.md) |
| Keeping saved data safe across updates | [DATA-SAFETY.md](DATA-SAFETY.md) |
| Rules for study notes | [STUDY-GUIDELINES.md](STUDY-GUIDELINES.md) |
| Plans after release | [ROADMAP.md](ROADMAP.md) |
| Setting up another family's copy | [SETUP.md](SETUP.md) and [STARTER-CHECKLIST.md](STARTER-CHECKLIST.md) |
| Task list with codes (B-01 and up) | Project HQ workbook (private) |
