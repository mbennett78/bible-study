# Keeping everyone's place safe across updates

Every update to the app must keep each person's place, progress, journals, notes and settings.

- Saved data lives under one fixed key, `bible-study:v1`, on each device. Updates never rename or clear it.
- New settings get their values from `defaults` in `js/store.js`. Nothing saved is overwritten.
- When saved data changes shape, bump `DATA_VERSION` and add a step to `MIGRATIONS` in `js/store.js`. Steps only add or rename things. They never drop progress, journals or notes.
- A second copy, `bible-study:v1:safety`, is refreshed daily. It is used if the main copy can't be read.
- Signed-in people also get an account backup in Supabase (`user_backups`, readable only by them). It is written a few seconds after each change and again when the app is put away. Bible keys are never included.
- A device with no progress (new phone, or the browser cleared it) restores from the account backup when the person signs in.
- "Bring in progress from my other devices" (Settings, Account) combines progress from all devices and removes nothing.
- The service worker only caches app files. It never touches saved data.

## Updates never interrupt

A new version installs quietly in the background, but the open app keeps running the version
it started with. It switches over only on the next fresh open, or after 15 minutes with no
taps (when the app goes to Home anyway). It never switches while reading aloud, during a
game or any other open window, or while someone is typing. `tests/e2e/updates.mjs` checks
each of these, and that the person's place and journal are still there afterwards.
