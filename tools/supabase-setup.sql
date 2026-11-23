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

-- Added later: the built-in Bible helper (safe to run again).
-- One row per question asked, so the helper can keep to each person's daily limit and the
-- family's monthly budget. People can see their own rows; only the helper adds them.
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

-- Checks the limits and saves a place for one question, all at once so two people asking
-- at the same moment can't slip past the budget. Prices are Claude Haiku 5.5's
-- ($0.10 per million tokens read, $0.50 per million written; a token is about ¾ of a word).
create or replace function public.ai_take_turn(daily_limit int, monthly_limit int, monthly_cents int)
returns json language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  n_day int; n_month int; spent numeric; turn bigint;
begin
  if uid is null then return json_build_object('ok', false, 'why', 'signin'); end if;
  perform pg_advisory_xact_lock(7316);
  select count(*) into n_day from ai_usage where user_id = uid and created_at > now() - interval '24 hours';
  select count(*), coalesce(sum(input_tokens * 0.10 + output_tokens * 0.50), 0) / 10000.0
    into n_month, spent from ai_usage where created_at >= date_trunc('month', now());
  if n_day >= daily_limit then return json_build_object('ok', false, 'why', 'daily', 'limit', daily_limit); end if;
  if n_month >= monthly_limit or spent >= monthly_cents then return json_build_object('ok', false, 'why', 'monthly'); end if;
  insert into ai_usage (user_id) values (uid) returning id into turn;
  return json_build_object('ok', true, 'turn', turn, 'left_today', daily_limit - n_day - 1);
end $$;

-- Records what one answer used, for the monthly budget.
create or replace function public.ai_record_turn(turn bigint, used_in int, used_out int)
returns void language sql security definer set search_path = public as $$
  update ai_usage set input_tokens = greatest(used_in, 0), output_tokens = greatest(used_out, 0)
  where id = turn and user_id = auth.uid() and input_tokens = 0 and output_tokens = 0;
$$;
revoke all on function public.ai_take_turn(int, int, int) from public, anon;
revoke all on function public.ai_record_turn(bigint, int, int) from public, anon;
grant execute on function public.ai_take_turn(int, int, int) to authenticated;
grant execute on function public.ai_record_turn(bigint, int, int) to authenticated;
