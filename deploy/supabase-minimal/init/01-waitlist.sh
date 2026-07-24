#!/bin/sh
set -eu

psql --set=ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  --set=api_password="$PGRST_API_PASSWORD" <<'EOSQL'
create role anon nologin;
create role authenticator noinherit login;
alter role authenticator password :'api_password';
grant anon to authenticator;

create schema api;

create table api.waitlist_entries (
  id bigint generated always as identity primary key,
  email text not null,
  moment text not null,
  created_at timestamptz not null default now(),
  constraint waitlist_email_length check (char_length(email) between 3 and 254),
  constraint waitlist_email_lowercase check (email = lower(email)),
  constraint waitlist_email_shape check (email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  constraint waitlist_moment_allowed check (
    moment in ('cant-start', 'night-scroll', 'break-plans', 'old-habits')
  )
);

create unique index waitlist_email_unique on api.waitlist_entries (lower(email));

alter table api.waitlist_entries enable row level security;
create policy waitlist_insert_only
  on api.waitlist_entries
  for insert
  to anon
  with check (true);

grant usage on schema api to anon;
grant insert (email, moment) on api.waitlist_entries to anon;
grant usage on sequence api.waitlist_entries_id_seq to anon;
EOSQL
