-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- A one-row table that holds the family's shared API.Bible key.
-- Signed-in family members can read it; only the family organizer can change it.
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
-- Only the family organizer (see tools/organizer.sql) can save or change the shared settings.
drop policy if exists "organizer can add" on public.family_settings;
drop policy if exists "organizer can change" on public.family_settings;
create policy "organizer can add" on public.family_settings for insert to authenticated
  with check (id = 1 and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'organizer');
create policy "organizer can change" on public.family_settings for update to authenticated
  using (id = 1 and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'organizer')
  with check (id = 1 and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'organizer');

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

-- Added later: the built-in Bible helper (safe to run again).
-- One row per question asked, so the helper can keep to the family's monthly budget.
-- People can see their own rows; only the helper adds them.
create table if not exists public.ai_usage (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  input_tokens int not null default 0,
  output_tokens int not null default 0
);
create index if not exists ai_usage_when on public.ai_usage (created_at);
alter table public.ai_usage enable row level security;
drop policy if exists "own ai usage read" on public.ai_usage;
create policy "own ai usage read" on public.ai_usage for select to authenticated using (user_id = auth.uid());

-- The family's monthly rules, checked all at once so two people asking together can't slip past:
--   * Nobody is slowed down while there's plenty left. At warn_pct (70%) of the month's
--     questions or dollars, everyone is told.
--   * Every family member is guaranteed per_person (100) questions a month. Once someone has
--     had their 100, they can keep asking only while what's left still covers everyone else's
--     unused share of 100. Everything beyond that is first come, first served.
--   * Hard stop at monthly_limit questions or monthly_cents of estimated cost.
-- Cost uses Claude Haiku 5.5's prices: $0.10 per million tokens read, $0.50 per million
-- written (a token is about 3/4 of a word). take = false only checks; take = true saves a place.
drop function if exists public.ai_take_turn(int, int, int);
create or replace function public.ai_month(monthly_limit int, monthly_cents int, per_person int, warn_pct int, take boolean)
returns json language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  month_start timestamptz := date_trunc('month', now());
  mine int; n_month int; spent numeric; per_q numeric; owed int; pct numeric; turn bigint;
begin
  if uid is null then return json_build_object('ok', false, 'why', 'signin'); end if;
  if take then perform pg_advisory_xact_lock(7316); end if;
  select count(*), coalesce(sum(input_tokens * 0.10 + output_tokens * 0.50), 0) / 10000.0
    into n_month, spent from ai_usage where created_at >= month_start;
  select count(*) into mine from ai_usage where user_id = uid and created_at >= month_start;
  -- Questions still owed to everyone else who hasn't had their guaranteed share this month.
  select coalesce(sum(greatest(per_person - coalesce(a.n, 0), 0)), 0) into owed
    from auth.users u
    left join (select user_id, count(*) as n from ai_usage where created_at >= month_start group by user_id) a on a.user_id = u.id
    where u.id <> uid;
  per_q := case when n_month > 0 and spent > 0 then spent / n_month else 0.1 end;  -- cents per question
  pct := greatest(n_month * 100.0 / monthly_limit, spent * 100.0 / monthly_cents);
  if n_month >= monthly_limit or spent >= monthly_cents then
    return json_build_object('ok', false, 'why', 'monthly', 'warn', true, 'mine', mine, 'per_person', per_person);
  end if;
  if mine >= per_person and (n_month + 1 + owed > monthly_limit or spent + per_q * (1 + owed) > monthly_cents) then
    return json_build_object('ok', false, 'why', 'shared', 'warn', true, 'mine', mine, 'per_person', per_person);
  end if;
  if take then insert into ai_usage (user_id) values (uid) returning id into turn; mine := mine + 1; end if;
  return json_build_object('ok', true, 'turn', turn, 'warn', pct >= warn_pct, 'pct', round(pct), 'mine', mine, 'per_person', per_person);
end $$;

-- Records what one answer used, for the monthly budget.
create or replace function public.ai_record_turn(turn bigint, used_in int, used_out int)
returns void language sql security definer set search_path = public as $$
  update ai_usage set input_tokens = greatest(used_in, 0), output_tokens = greatest(used_out, 0)
  where id = turn and user_id = auth.uid() and input_tokens = 0 and output_tokens = 0;
$$;
revoke all on function public.ai_month(int, int, int, int, boolean) from public, anon;
revoke all on function public.ai_record_turn(bigint, int, int) from public, anon;
grant execute on function public.ai_month(int, int, int, int, boolean) to authenticated;
grant execute on function public.ai_record_turn(bigint, int, int) to authenticated;

-- Family duels in Bible Spin (safe to run again).
-- duel_players: who has chosen to play, with just a first name. Any signed-in family member can
-- see the list; each person can only add, rename or remove themselves.
-- duels: one row per challenge. Only its two players can see it, the challenger creates it,
-- and each player can only fill in their own score, once.
create table if not exists public.duel_players (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 40),
  updated_at timestamptz not null default now()
);
alter table public.duel_players enable row level security;
drop policy if exists "family sees duel players" on public.duel_players;
drop policy if exists "join duels" on public.duel_players;
drop policy if exists "rename in duels" on public.duel_players;
drop policy if exists "leave duels" on public.duel_players;
create policy "family sees duel players" on public.duel_players for select to authenticated using (true);
create policy "join duels" on public.duel_players for insert to authenticated with check (user_id = auth.uid());
create policy "rename in duels" on public.duel_players for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "leave duels" on public.duel_players for delete to authenticated using (user_id = auth.uid());

create table if not exists public.duels (
  id uuid primary key default gen_random_uuid(),
  from_id uuid not null references auth.users (id) on delete cascade,
  to_id uuid not null references auth.users (id) on delete cascade,
  from_name text not null check (char_length(from_name) between 1 and 40),
  to_name text not null check (char_length(to_name) between 1 and 40),
  questions text[] not null check (array_length(questions, 1) between 1 and 20),
  from_score int check (from_score between 0 and 400),
  from_marks text check (from_marks ~ '^[01]{0,20}$'),
  to_score int check (to_score between 0 and 400),
  to_marks text check (to_marks ~ '^[01]{0,20}$'),
  created_at timestamptz not null default now(),
  finished_at timestamptz,
  check (from_id <> to_id)
);
create index if not exists duels_from on public.duels (from_id);
create index if not exists duels_to on public.duels (to_id);
alter table public.duels enable row level security;
drop policy if exists "players see their duels" on public.duels;
drop policy if exists "challenge someone" on public.duels;
drop policy if exists "players add their score" on public.duels;
drop policy if exists "players remove a duel" on public.duels;
create policy "players see their duels" on public.duels for select to authenticated using (auth.uid() in (from_id, to_id));
create policy "challenge someone" on public.duels for insert to authenticated
  with check (from_id = auth.uid() and to_score is null and to_marks is null
    and exists (select 1 from public.duel_players p where p.user_id = to_id));
create policy "players add their score" on public.duels for update to authenticated using (auth.uid() in (from_id, to_id)) with check (auth.uid() in (from_id, to_id));
create policy "players remove a duel" on public.duels for delete to authenticated using (auth.uid() in (from_id, to_id));

-- Each player fills in only their own score, only once, and nothing else about a duel changes.
create or replace function public.duel_guard() returns trigger language plpgsql set search_path = public as $$
begin
  if new.from_id <> old.from_id or new.to_id <> old.to_id or new.questions <> old.questions
     or new.from_name <> old.from_name or new.to_name <> old.to_name or new.created_at <> old.created_at then
    raise exception 'A duel''s players and questions can''t be changed';
  end if;
  if (new.from_score is distinct from old.from_score or new.from_marks is distinct from old.from_marks)
     and (auth.uid() <> old.from_id or old.from_score is not null) then
    raise exception 'Only the challenger can add their score, once';
  end if;
  if (new.to_score is distinct from old.to_score or new.to_marks is distinct from old.to_marks)
     and (auth.uid() <> old.to_id or old.to_score is not null) then
    raise exception 'Only the person challenged can add their score, once';
  end if;
  return new;
end $$;
drop trigger if exists duel_guard on public.duels;
create trigger duel_guard before update on public.duels for each row execute function public.duel_guard();
