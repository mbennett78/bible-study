# Bible Study

A family Bible study app for iPhone, iPad, Android and computers. It is a progressive web
app: plain HTML, CSS and JavaScript modules with no build step. It installs to the home
screen, opens full screen, and keeps working offline for chapters already read.

It is built for a family whose readers range from 10 to 89 years old, so the priorities are
large and calm screens, nothing that glitches, and study content that sticks to Scripture
and shows differing Christian views fairly ([docs/STUDY-GUIDELINES.md](docs/STUDY-GUIDELINES.md)).

## Features

- **Reading**: NASB by default (API.Bible), with the ESV (api.esv.org) and up to six more
  versions from the same API.Bible plan (KJV, NKJV where licensed, BSB, WEB and others). Switching
  versions mid-chapter keeps your verse. Tile-based book, chapter and verse picker.
- **Study paths**: My Bible (canonical order) and three self-guided studies (chronological,
  by audience, by theme), each with its own progress, a one-year pace, and "Back to my place".
- **Study section under every chapter**: Strong's concordance for every Hebrew and Greek
  word, tap-a-word meanings, book introductions, maps, history, science, scholarly views
  with sources and evidence labels, word search, and Olive Tree / Logos links.
- **Read to me**: speech synthesis with highlighting, speed control, and a single switch
  that keeps reading chapter after chapter.
- **Journal**: per-chapter and daily journals with prayers and answered prayers, an optional
  passcode lock, and a printable keepsake book.
- **Study partner**: a built-in AI Bible helper (Claude Haiku, through a Supabase Edge
  Function with a per-person monthly allowance), or hand-off to Claude, ChatGPT, Grok or
  Gemini. A small stick-figure study buddy opens the chat, reads answers aloud and takes
  spoken questions.
- **Bible games**: solo quizzes or up to 20 players or teams, any part of the Bible,
  optional timer, leaderboard, sound effects and celebrations. 239 questions, each tied to
  its verse.
- **Today**: verse of the day, a psalm and proverb, a question and a prayer.
- **Family accounts** (optional): Supabase email sign-in, account backup of progress and
  journals, one shared Bible key for the family, and a privacy split on shared tablets.
- **Accessibility**: text up to 36px, larger buttons, high contrast, captions while reading
  aloud, reduced motion respected, everything reachable without gestures.
- **Looks**: eight themes (Classic, Sage, Nativity, Easter, Thanksgiving, Christmas,
  Animated, For kids) with Lively, Still or Text-only pictures.

## Run it locally

```sh
npm install          # dev tools only: ESLint and Playwright (the app itself has no dependencies)
npm start            # python3 -m http.server 8000, then open http://localhost:8000
```

Any static file server works. Without a Supabase project in `js/config.js` the app runs in
single-device mode: everything works except sign-in, account backup and the built-in helper.

## Configuration

All deploy-specific settings live in one file, [`js/config.js`](js/config.js). Copy
[`js/config.example.js`](js/config.example.js) and fill in your own values.

| Setting | Where it comes from | Secret? |
| --- | --- | --- |
| `supabaseUrl`, `supabaseAnonKey` | Supabase, Project Settings, API | No. Designed to be public; access is enforced by row-level security |
| `starterPassword` | You choose it | No. Everyone must replace it at first sign-in |
| API.Bible and ESV keys | Typed into the app's Settings by the organizer | Kept on the device and, optionally, in the family's Supabase table |
| `ANTHROPIC_API_KEY`, limits | Supabase, Edge Functions, Secrets | Yes. Never in the app |

Setting up your own copy from scratch, step by step: [docs/SETUP.md](docs/SETUP.md).

## Tests and checks

```sh
npm run lint         # ESLint (flat config)
npm test             # unit tests with node:test (store migrations, content integrity, game logic)
npm run test:e2e     # browser tests with Playwright against a local server and a pretend Supabase
npm run check        # lint + unit tests
```

The browser tests cover sign-in (first sign-in, password rules, reset by code or link,
expired links, offline sessions, sign-out scope, shared devices), Bible versions, the study
buddy, games, read-aloud and navigation, at phone and iPad sizes. They need Chromium for
Playwright (`npx playwright install chromium`). CI runs lint and unit tests on every push.

The content tests check that all 66 books and 1,189 chapters are present, every study path
covers every chapter, every book has an introduction, and every trivia question and daily
verse points at a real chapter.

## Deploy

GitHub Pages serves the repository root. `CNAME` holds the custom domain. Each release bumps
`VERSION` in [`sw.js`](sw.js) so installed apps pick up the new files; saved data is never
touched by an update ([docs/DATA-SAFETY.md](docs/DATA-SAFETY.md)).

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the code is organized and why
- [docs/SECURITY.md](docs/SECURITY.md): the security model and its trade-offs
- [docs/DATA-SAFETY.md](docs/DATA-SAFETY.md): how everyone's place and journals survive updates
- [docs/STUDY-GUIDELINES.md](docs/STUDY-GUIDELINES.md): the content rules for notes, intros and the helper
- [docs/SETUP.md](docs/SETUP.md): setting up your own family's copy

## Data sources and licenses

- **Bible text** is fetched at reading time and not stored in this repository:
  NASB® via API.Bible (© The Lockman Foundation), ESV® via api.esv.org (© Crossway), and
  other versions under their publishers' terms. Copyright notices are shown under each chapter.
  Chapters are cached on the device for at most 14 days, within API.Bible's caching rules.
- **Strong's data** (`data/strongs`, `data/lex`) is built by `tools/build-strongs.py` from
  STEPBible TAHOT and TAGNT (Tyndale House, Cambridge, CC BY 4.0) and the Open Scriptures
  Strong's dictionaries (CC BY-SA; Strong's definitions are public domain).
- **Study notes, introductions, glossary, devotions and trivia** are original to this
  project, with scholarly sources cited in the notes.
- **supabase-js** 2.117.3 (MIT) is vendored in `js/vendor`.
