# Architecture

## Principles

- **No build step.** The repository is what GitHub Pages serves. ES modules load directly in
  the browser, so anyone can read, change and deploy the app with a text editor and `git push`.
- **No runtime dependencies** except supabase-js, which is vendored (`js/vendor`) so a CDN
  outage or a supply-chain change can't alter the app.
- **The device is the source of truth.** Everything a person does is saved locally first.
  Supabase is optional and only adds sign-in, an account backup and the shared family key.
- **Content is data.** Study paths, introductions, notes, glossary, devotions and trivia are
  plain JavaScript modules that unit tests can check for completeness and validity.
- **Calm over clever.** Every feature has to work for a 10-year-old and an 89-year-old on an
  old iPad, with large text, no gestures required, and reduced motion respected.

## Module map

| File | Role |
| --- | --- |
| `index.html` | The whole app shell: every view and dialog, plus the Content Security Policy |
| `styles.css` | All styling, organised by section; each look (theme) is a set of CSS variables |
| `js/config.js` | Deploy settings (`window.BIBLE_CONFIG`), loaded before everything else |
| `js/app.js` | Screen code: views, reader, pickers, settings, setup, sign-in gate, sync |
| `js/store.js` | Saved data: defaults, versioned migrations, safety copy, per-person split |
| `js/auth.js` | Supabase wrapper: sign-in, codes and links, passwords, family key, backups |
| `js/text.js` | Fetching Scripture from API.Bible and the ESV API, with a 14-day device cache |
| `js/speech.js` | Read aloud (speech synthesis with highlighting) and dictation (speech recognition) |
| `js/buddy.js` | The stick-figure study buddy: drawing, dragging, sitting, tucking, moods |
| `js/game.js` | Bible games: setup, turns, timer, scoring, leaderboard, sounds, confetti |
| `js/trivia.js`, `js/trivia-bank.js` | Question selection and the question bank (each tied to a verse) |
| `js/books.js` | The 66 books: USFM id, name, chapter count |
| `js/paths.js` | The four study paths; `checkPaths()` proves each covers all 1,189 chapters once |
| `js/intros.js`, `js/notes.js`, `js/glossary.js`, `js/daily.js` | Study content |
| `js/art.js` | Inline SVG illustrations, recoloured per look through CSS classes |
| `sw.js` | Service worker: caches the app shell for offline use, never touches saved data |
| `data/strongs`, `data/lex` | Strong's tagging and lexicon, split per chapter and per entry, loaded on demand |
| `supabase/functions/study-partner` | Edge Function that calls Claude for the built-in helper |
| `tools/supabase-setup.sql` | Tables, row-level security policies and the helper's budget functions |
| `tools/build-strongs.py` | Rebuilds `data/` from STEPBible and Open Scriptures sources |
| `tools/build-preview.py` | Bundles the app into one HTML file for a quick shareable preview |

## Data flow

1. **Start-up.** `config.js` runs first. If Supabase is configured it hides the page
   (`auth-wait`) until the sign-in gate decides. `store.js` loads `bible-study:v1` from
   `localStorage`, merges it over `defaults` and runs any pending migrations.
2. **Sign-in (optional).** `auth.js` restores the Supabase session. `store.switchPerson()`
   keeps each signed-in person's data separate on a shared device. The family's Bible keys
   are pulled from `family_settings` if this device has none, and the account backup is
   restored if this device has no progress.
3. **Reading.** `text.js` fetches a chapter from the chosen version, sanitises it
   (`sanitize()` in `app.js` keeps only harmless tags and four attributes) and caches it on
   the device. Strong's data for the chapter loads lazily when the study section opens.
4. **Saving.** `store.set()` writes to `localStorage` immediately. When signed in, a backup
   to `user_backups` follows a few seconds later and again when the app is put away.

Saved-data rules (never dropping progress across updates) are in
[DATA-SAFETY.md](DATA-SAFETY.md).

## Storage keys

| Key | What it holds |
| --- | --- |
| `bible-study:v1` | All of one person's data and settings |
| `bible-study:v1:safety` | A daily copy, used if the main copy can't be read |
| `bible-study:v1:person:<id>` | Another signed-in person's data on a shared device |
| `bible-study:auth` | The Supabase session (managed by supabase-js) |
| `bible-study:buddy-spot` | Where the study buddy was moved to |
| `bible-study:pw-reset`, `bible-study:pw-starter` | Whether a new password must be chosen |
| `bible-study:sign-out-on-close` | Set when "Keep me signed in" is off |
| `bible-study:open` (sessionStorage) | Tells a reload apart from a fresh open |
| `bible-study:last-active` | When the app was last used, for the "welcome back" question |
| `bible-study:recent` | Cached chapters (at most 14 days old, under API.Bible's limits) |

Device-only values (Bible keys, chosen voice, theme) are listed in `DEVICE_KEYS` in
`store.js` and are never part of an account backup or export.

## Testing

- **Unit tests** (`tests/unit`, `node:test`): store migrations and the per-person split,
  content integrity (every book, chapter, path, introduction, trivia question and daily
  verse), ESV query building, and game logic.
- **Browser tests** (`tests/e2e`, Playwright): each file is a plain script that serves the
  app with a small Node server, stubs API.Bible and Supabase with route handlers, and checks
  behaviour at phone and iPad sizes. `harness.mjs` holds the shared server, the pretend
  Supabase and the `check()` helper. Speech is stubbed so read-aloud can be tested silently.
- **CI** (`.github/workflows/check.yml`) runs lint and unit tests on every push.

## Known trade-offs and next steps

- `js/app.js` (about 2,700 lines) holds all screen code. It is organised in labelled
  sections, but splitting it into per-view modules (reader, home, settings, setup, gate) is
  the natural next refactor. The other modules already have no DOM dependencies where
  possible, which is what makes them unit-testable.
- Browser tests use fixed waits in places. Moving them to `@playwright/test` with
  auto-waiting assertions would make them faster and less timing-sensitive.
- Study notes cover sample chapters so far; the format and evidence labels are in place for
  more to be added book by book.
