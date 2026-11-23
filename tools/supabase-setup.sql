-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- A one-row table that holds the family's shared API.Bible key.
-- Only signed-in family members (people added under Authentication -> Users) can read or change it.
create table if not exists public.family_settings (
  id int primary key default 1 check (id = 1),
  api_bible_key text,
  nasb_bible_id text,
  nasb_label text,
  extra_bibles jsonb default '[]'::jsonb,
  esv_key text,
  updated_at timestamptz default now()
);
alter table public.family_settings enable row level security;
drop policy if exists "family can read" on public.family_settings;
drop policy if exists "family can add" on public.family_settings;
drop policy if exists "family can change" on public.family_settings;
create policy "family can read" on public.family_settings for select to authenticated using (true);
create policy "family can add" on public.family_settings for insert to authenticated with check (id = 1);
create policy "family can change" on public.family_settings for update to authenticated using (id = 1) with check (id = 1);

-- Added later: extra Bible versions shared with the family (safe to run again).
alter table public.family_settings add column if not exists extra_bibles jsonb default '[]'::jsonb;
alter table public.family_settings add column if not exists esv_key text;

-- Added later: each person's own backup of their reading, notes and journal (safe to run again).
-- Only that signed-in person can read or change their row. Bible keys are never stored here.
create table if not exists public.user_backups (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz default now()
);
alter table public.user_backups enable row level security;
drop policy if exists "own backup read" on public.user_backups;
drop policy if exists "own backup add" on public.user_backups;
drop policy if exists "own backup change" on public.user_backups;
create policy "own backup read" on public.user_backups for select to authenticated using (user_id = auth.uid());
create policy "own backup add" on public.user_backups for insert to authenticated with check (user_id = auth.uid());
create policy "own backup change" on public.user_backups for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
