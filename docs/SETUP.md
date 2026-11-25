# Setting up your own family's copy

About an hour, start to finish. You need a GitHub account, and for the optional parts a
Supabase account (free plan is enough), an API.Bible key, an ESV key and an Anthropic key.

The app works without Supabase: skip steps 3 to 6 and everyone uses it on their own
device, with no sign-in, backup or built-in helper.

## 1. Copy the repository

1. Fork or copy this repository to your own GitHub account.
2. Remove `CNAME` (it holds this family's domain), or replace its contents with your own.
3. Copy `js/config.example.js` over `js/config.js`. Leave the Supabase values empty for now.

## 2. Publish on GitHub Pages

1. Repository Settings, Pages: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
2. Optional custom domain: put it in `CNAME`, add a `CNAME` DNS record pointing to
   `<your-user>.github.io`, then tick "Enforce HTTPS".
3. Put your site's address in `js/guide.js` as `SITE` (for example `"bible.example.com"`).
   The user guide in Settings and the printed setup page both show it. Left empty, they
   say "your family's Bible Study web address" and the printed page has a line to write it on.
4. Open the site. It should load and ask for a Bible key in Settings.

## 3. Create the Supabase project

1. Create a project at supabase.com. Note the region closest to your family.
2. SQL Editor, New query: paste all of [`tools/supabase-setup.sql`](../tools/supabase-setup.sql)
   and Run. It is safe to run again after updates.
3. Project Settings, API: copy the **Project URL** and the **publishable (anon) key** into
   `js/config.js` as `supabaseUrl` and `supabaseAnonKey`. Never use the `service_role` key.
4. Choose a `starterPassword` in `js/config.js`. Each person replaces it at first sign-in.

## 4. Lock down sign-in

1. Authentication, Providers, Email: turn **off** "Allow new users to sign up". This is
   required; see [SECURITY.md](SECURITY.md).
2. Authentication, URL Configuration: set **Site URL** to your site's address and add the
   same address under **Redirect URLs**.
3. Authentication, Users, "Add user": add each family member with their email and the
   starter password, and tick "Auto confirm".

## 5. Email (so password resets reach everyone)

Supabase's built-in email only sends to the project's own team and its templates can't be
edited. To send to family members:

1. Create an app password for the sending mailbox (for Gmail: Google Account, Security,
   2-Step Verification, App passwords). Never use the mailbox's real password.
2. Authentication, Emails, SMTP Settings: turn on custom SMTP. For Gmail: host
   `smtp.gmail.com`, port `465`, the Gmail address as username and sender, the app password.
3. Authentication, Emails, Templates, **Magic Link**: subject `Your Bible Study sign-in code`,
   body:

   ```html
   <h2>Sign in to Bible Study</h2>
   <p>Your code is: <strong>{{ .Token }}</strong></p>
   <p>Type it in the app, or tap here: <a href="{{ .ConfirmationURL }}">Sign in</a></p>
   <p>If you didn't ask for this, you can ignore this email.</p>
   ```

4. Test it: on the sign-in screen tap "Forgot your password?" with a family member's email.

## 6. The built-in Bible helper (optional)

This is Buddy's chat. He answers any question in full, Bible or everyday (homework,
recipes, how to use a phone), and keeps every answer family-safe.

1. In the Anthropic Console, create an API key and set a **monthly spend limit** (Settings,
   Limits) as the final backstop.
2. Install the Supabase CLI, then from the repository root:

   ```sh
   supabase login
   supabase link --project-ref <your-project-ref>
   supabase functions deploy study-partner
   supabase secrets set ANTHROPIC_API_KEY=<paste here, in your own terminal>
   ```

3. Optional limits (defaults shown): `MONTHLY_LIMIT=12000` questions, `MONTHLY_CENTS=900`,
   `PER_PERSON=100`, `WARN_PCT=70`. Set them with `supabase secrets set` or in the dashboard
   under Edge Functions, Secrets.

## 6b. The family panel (optional)

The organizer's "My family" panel (Settings, Family organizer tools) lists everyone, shows
the Bible helper allowance left this month, and can add a family member, give someone a new
temporary password, give someone a new email (New email: it keeps the same account, so their
notes, journal and reading place stay with them), or remove someone. It runs as a second Edge Function, which only the organizer can
use (it checks the organizer mark from `tools/organizer.sql` on every request):

```sh
supabase functions deploy family-admin
```

Or in the dashboard: Edge Functions, Deploy a new function, Via Editor, name it exactly
`family-admin`, paste `supabase/functions/family-admin/index.ts`, Deploy. It needs no new
secrets: Supabase gives Edge Functions their own admin access, which never leaves Supabase.

## 7. Bible versions

1. **API.Bible** (NASB and others): sign up at scripture.api.bible, create an app and copy
   its key. Licensed versions such as the NASB need to be requested on your plan.
2. **ESV** (optional): request a non-commercial key at api.esv.org.
3. In the app: sign in as the organizer, open Settings, "Family organizer tools", paste the
   keys, choose versions and tap Save. Each change is saved to your family account
   automatically, and everyone else picks it up the next time they open the app. Keys are
   typed into the app only; never commit them.
4. **Shortcut: a ready-filled key.** Another family running this app can share theirs with
   you: in their app, Settings, Family organizer tools, "Set up a device for someone without
   an account", "Make invite link". Paste that whole link into your API.Bible key box (in
   first-time setup or in Settings) and the key, the NASB edition, extra versions and the
   ESV key all fill in at once. Then tap Save so your family gets it too. Both families then
   share one monthly reading allowance (5,000 reads), so it's best as a way to start; swap in
   your own free key whenever you like.

## 8. Releasing changes

1. Run `npm run check` (lint and unit tests) and `npm run test:e2e`.
2. Bump `VERSION` in `sw.js` so installed apps fetch the new files.
3. If you change the shape of saved data, follow [DATA-SAFETY.md](DATA-SAFETY.md).
4. Push to `main`. Pages redeploys in a minute or two, and open apps reload onto the new
   version the next time they're opened.
