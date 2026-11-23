# Security model

The app is a static site with an optional Supabase back end. The aim is that a mistake in
the client can never expose another person's journal or run up a bill, because every rule
that matters is enforced on the server.

## What is public and what is secret

| Item | Where it lives | Notes |
| --- | --- | --- |
| Supabase URL and publishable (anon) key | `js/config.js`, public | Grants nothing on its own; row-level security decides access |
| Supabase `service_role` key | Nowhere in this repository | Never needed by the app. Never paste it into `config.js` |
| `ANTHROPIC_API_KEY` | Supabase Edge Function secrets only | The client never sees it; it calls the Edge Function instead |
| API.Bible and ESV keys | Typed into Settings by the organizer | Stored on the device and, if shared, in `family_settings` |
| Starter password | `js/config.js` | Not shown on the sign-in screen; must be replaced at first sign-in and is rejected as a new password |
| SMTP password | Supabase, Authentication, SMTP settings | Use an app password, never an account password |

## Accounts

- **Invite-only.** Family members are added by the organizer under Supabase, Authentication,
  Users. **Public sign-ups must stay off** (Authentication, Providers, Email, "Allow new
  users to sign up"), because every signed-in person can read `family_settings`. The app
  also passes `shouldCreateUser: false` when sending sign-in codes.
- **Passwords.** At least 6 characters (Supabase's default minimum), typed twice, and not the starter password. A person
  still on the starter password, or arriving from a reset email, is asked for a new one
  before anything else. `own_password` in the user's metadata records that it was changed,
  so other devices don't ask again.
- **Resets.** "Forgot your password?" sends a one-time code and link (Supabase's OTP email).
  Expired or reused links are recognised from the URL fragment and explained in plain words.
- **Sessions.** The Supabase session is kept in `localStorage` so the app works offline and
  across restarts. "Keep me signed in" off asks for the password on each fresh open.
  Signing out uses `scope: "local"`, so signing out on a shared tablet doesn't sign that
  person out of their own phone. Signing out elsewhere is picked up and returns to the gate.
- **Shared devices.** Each signed-in person's data is kept under its own key
  (`store.switchPerson()`); switching people stashes one and loads the other. Bible keys and
  the device's look stay with the device.

## Database (row-level security)

Defined in [`tools/supabase-setup.sql`](../tools/supabase-setup.sql). RLS is enabled on
every table.

| Table | Who can read | Who can write |
| --- | --- | --- |
| `family_settings` (one row) | Any signed-in member | Any signed-in member (row `id = 1` only) |
| `user_backups` | Only the owner (`user_id = auth.uid()`) | Only the owner |
| `ai_usage` | Only the owner's own rows | Nobody directly; only through the two functions below |

`ai_month()` and `ai_record_turn()` are `security definer` functions with a fixed
`search_path`, executable only by the `authenticated` role. `ai_month()` takes an advisory
lock so two people asking at once can't both slip past the monthly limit, and
`ai_record_turn()` can only fill in a row that belongs to the caller and hasn't been filled.

**Trade-off:** the family's Bible keys are readable by any signed-in member, by design (one
key for the whole family). The app only shows them inside "Family organizer tools", but a
technically minded member could read them from the database. That is acceptable for a
family, and it is why sign-ups must be off.

## The built-in helper (Edge Function)

[`supabase/functions/study-partner`](../supabase/functions/study-partner/index.ts):

- Verifies the caller's JWT with `auth.getUser()` and rejects anyone not signed in.
- Acts as the caller (their JWT is forwarded), so RLS and the budget functions apply.
- Validates input: only `user`/`assistant` turns, last 8 turns, 2,000 characters each, must
  alternate and end with the person's question. Other fields are length-capped or enumerated.
- Spending limits: a per-person guaranteed share, a family monthly question cap and a
  monthly cost cap (all configurable as secrets), plus a spend limit set in the Anthropic
  Console as a backstop.
- Errors are mapped to a few plain codes; no upstream error text reaches the client.

## In the browser

- **Content Security Policy** (meta tag in `index.html`): scripts only from the app's own
  origin, no inline scripts or event handlers, network access only to Supabase, API.Bible
  and the ESV API, no frames or plugins, `base-uri` and `form-action` locked to self.
  Inline styles are allowed (`'unsafe-inline'` for `style-src`) because the illustrations
  and theme swatches set colours inline; no user input reaches a style attribute.
- **Scripture HTML** from the publishers is sanitised before display: scripts, styles,
  media, forms, links and embeds are removed, and only `class`, `data-number`, `data-sid`
  and `data-vid` attributes are kept.
- **Everything else** that includes user or stored text is built with `esc()` (HTML
  escaping) or `textContent`.
- **Invites** carry the Bible key in the URL fragment (after `#`), which browsers never send
  to a server, and the fragment is cleared from the address bar once read.
- **Exports and backups** never include Bible keys (`DEVICE_KEYS` in `store.js`).
- **No third-party scripts, analytics or trackers.** supabase-js is vendored at a pinned
  version. Cross-origin requests send only the origin as the referrer.

## Reporting a problem

Please open a private security advisory on the GitHub repository rather than a public issue.
