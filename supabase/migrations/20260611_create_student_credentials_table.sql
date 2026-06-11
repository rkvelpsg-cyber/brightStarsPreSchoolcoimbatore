-- Cross-device parent credential sync for admin-managed student accounts.
-- Parent passwords are managed in Supabase Auth and are never stored in this table.

create table if not exists public.student_credentials (
  id text primary key,
  name text not null,
  age integer not null default 3,
  father_name text,
  mother_name text,
  father_phone text,
  mother_phone text,
  parent_name text,
  parent_email text,
  parent_auth_email text,
  parent_phone text,
  parent_username text not null,
  address text,
  registration_number text,
  photo_url text,
  class_name text,
  admission_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_credentials
  add column if not exists parent_auth_email text;

alter table public.student_credentials
  add column if not exists parent_email text;

update public.student_credentials
set parent_auth_email = coalesce(
  nullif(trim(parent_auth_email), ''),
  nullif(trim(parent_email), ''),
  nullif(trim(parent_username), '')
)
where coalesce(nullif(trim(parent_auth_email), ''), '') = '';

create unique index if not exists student_credentials_parent_username_idx
  on public.student_credentials (lower(parent_username));

create index if not exists student_credentials_parent_auth_email_idx
  on public.student_credentials (lower(parent_auth_email));

create index if not exists student_credentials_created_at_idx
  on public.student_credentials (created_at);

create or replace function public.set_student_credentials_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_student_credentials_updated_at on public.student_credentials;
create trigger trg_student_credentials_updated_at
before update on public.student_credentials
for each row
execute function public.set_student_credentials_updated_at();

alter table public.student_credentials enable row level security;

drop policy if exists "student_credentials_select_all" on public.student_credentials;
create policy "student_credentials_select_all"
on public.student_credentials
for select
to anon, authenticated
using (true);

drop policy if exists "student_credentials_insert_all" on public.student_credentials;
create policy "student_credentials_insert_all"
on public.student_credentials
for insert
to anon, authenticated
with check (true);

drop policy if exists "student_credentials_update_all" on public.student_credentials;
create policy "student_credentials_update_all"
on public.student_credentials
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "student_credentials_delete_all" on public.student_credentials;
create policy "student_credentials_delete_all"
on public.student_credentials
for delete
to anon, authenticated
using (true);
