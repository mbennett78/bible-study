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
