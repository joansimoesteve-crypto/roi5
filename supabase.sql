-- Pega esto en Supabase → SQL Editor → Run
create table if not exists ratings (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  type text not null,            -- page | element | place | web | org | project
  subject text not null,
  site text,
  mood smallint not null check (mood between 0 and 4),
  tags text[],
  comment text,
  url text,
  address text,
  lat double precision,
  lng double precision
);
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  ts timestamptz default now(),
  name text, org text, email text, kind text, interest text, message text
);
alter table ratings enable row level security;   -- sin políticas: solo accede el servidor con la service key
alter table leads enable row level security;
