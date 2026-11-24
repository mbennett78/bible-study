-- Make one account the family organizer. Run once in Supabase:
-- SQL Editor -> New query -> paste -> type your own sign-in email where it says so -> Run.
--
-- What it does:
-- 1. Marks your account as the organizer. Only Supabase admins can set this mark
--    (app_metadata), so nobody can make themselves the organizer from inside the app.
-- 2. Lets only the organizer save or change the family's Bible settings. Everyone else
--    can still read them, so their devices get the Bible text automatically.
-- The app shows "Family organizer tools" only to the organizer's account.
-- Safe to run again.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "organizer"}'::jsonb
where lower(email) = lower('TYPE-YOUR-EMAIL-HERE');

drop policy if exists "family can add" on public.family_settings;
drop policy if exists "family can change" on public.family_settings;
drop policy if exists "organizer can add" on public.family_settings;
drop policy if exists "organizer can change" on public.family_settings;
create policy "organizer can add" on public.family_settings for insert to authenticated
  with check (id = 1 and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'organizer');
create policy "organizer can change" on public.family_settings for update to authenticated
  using (id = 1 and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'organizer')
  with check (id = 1 and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'organizer');

-- Check: this should list exactly one email, yours.
select email from auth.users where raw_app_meta_data ->> 'role' = 'organizer';
