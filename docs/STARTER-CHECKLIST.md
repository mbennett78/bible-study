# Starter kit: your family's own copy

This kit is the whole Family Bible Study app, ready for your family to run on its own. Your
copy is completely separate: your own sign-ins, your own keys, your own family's notes. The
full steps, with every click, are in [SETUP.md](SETUP.md) (docs/SETUP.md). This page is the short checklist.

Plan on about an hour. Steps marked *optional* can wait; the app works without them.

## Before you start: accounts to make

- [ ] A **GitHub** account (free), to publish the app as a website.
- [ ] An **API.Bible** key (free), for the NASB and other versions: scripture.api.bible.
- [ ] *Optional:* an **ESV** key (free, non-commercial): api.esv.org.
- [ ] *Optional:* a **Supabase** account (free plan), for sign-in, backups and syncing between devices.
- [ ] *Optional:* an **Anthropic** key, for the built-in Bible helper. Set a monthly spend limit.

Keys are always typed into the app or into Supabase, never into a file, an email or a chat.

## Checklist

- [ ] **1. Copy the app.** Put this folder in a new GitHub repository (SETUP step 1).
- [ ] **2. Publish it.** Turn on GitHub Pages, and put your site's address in `js/guide.js` as `SITE`. Open the site and check it loads (step 2).
- [ ] *Optional:* **3. Sign-in and backups.** Create the Supabase project and run `tools/supabase-setup.sql`. Put the Project URL and the publishable key in `js/config.js`, and choose a starter password (step 3).
- [ ] *Optional:* **4. Lock down sign-in.** Turn off new sign-ups, set the site address, and add each family member (step 4).
- [ ] *Optional:* **5. Password-reset email.** Set up an app password and custom SMTP so reset codes reach everyone (step 5).
- [ ] *Optional:* **6. Bible helper.** Deploy the `study-partner` function and set your Anthropic key as a Supabase secret (step 6). Buddy then answers any question, Bible or everyday, and keeps it family-safe. Deploy `family-admin` for the organizer's family panel (step 6b): Add a family member, New password, New email (same account, nothing lost) and Remove.
- [ ] **7. Bible versions.** Sign in as the organizer, open Settings, Family organizer tools, paste your Bible keys and tap "Save key for the whole family" (step 7).
- [ ] **8. Try it.** Sign in on a phone, add it to the Home Screen, read a chapter, try its Quick check, write a note with a verse card, and ask Buddy a question. Tap a 🎤 button once to see the only permission the app asks for (the microphone).
- [ ] **9. Hand it out.** Give each person the site address, their email and the starter password. Print the gift packet (a cover, a setup page with lines for each person's email and starter password, and the illustrated user guide): run `node tools/gift/make-packet.mjs packet.pdf`. Its words come from the user guide in Settings, so paper and screen match.

## Good to know

- The app never sells anything: no ads, no purchases. Please keep it that way in your copy.
- Settings opens with the user guide at the top; everything else folds into six groups.
- With no signal, recently read chapters still open, and notes and journal entries sync when the signal comes back.

- Never use or share the Supabase **service_role** key. The app only needs the publishable key.
- Updates: run `npm run check`, bump `VERSION` in `sw.js`, and push. Everyone's app updates the next time it opens, without losing anyone's place (step 8).
- Questions about how the app keeps data safe are answered in [SECURITY.md](SECURITY.md) and [DATA-SAFETY.md](DATA-SAFETY.md).
