-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 0. CLEANUP (CAREFUL: This deletes existing data!)
drop table if exists projects cascade;
drop table if exists categories cascade;

-- 1. Create Categories Table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Projects/Posts Table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique,
  category_id uuid references categories(id) on delete cascade not null,
  
  -- Flexible content fields
  image_url text, -- For Art/Architecture
  music_url text, -- For Music
  content text,   -- For Literature
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS
alter table categories enable row level security;
alter table projects enable row level security;

-- 4. RLS Policies (Drop first to avoid errors if re-running)

-- Categories
drop policy if exists "Public categories are viewable by everyone" on categories;
create policy "Public categories are viewable by everyone" on categories for select to public using (true);

drop policy if exists "Admins can insert categories" on categories;
create policy "Admins can insert categories" on categories for insert to authenticated with check (true);

drop policy if exists "Admins can update categories" on categories;
create policy "Admins can update categories" on categories for update to authenticated using (true);

drop policy if exists "Admins can delete categories" on categories;
create policy "Admins can delete categories" on categories for delete to authenticated using (true);

-- Projects
drop policy if exists "Public projects are viewable by everyone" on projects;
create policy "Public projects are viewable by everyone" on projects for select to public using (true);

drop policy if exists "Admins can insert projects" on projects;
create policy "Admins can insert projects" on projects for insert to authenticated with check (true);

drop policy if exists "Admins can update projects" on projects;
create policy "Admins can update projects" on projects for update to authenticated using (true);

drop policy if exists "Admins can delete projects" on projects;
create policy "Admins can delete projects" on projects for delete to authenticated using (true);

-- 5. Seed Data
insert into categories (name, slug) values
  ('Art', 'art'),
  ('Music', 'music'),
  ('Literature', 'literature'),
  ('Architecture', 'architecture')
on conflict (slug) do nothing;

-- 6. Storage Setup
insert into storage.buckets (id, name, public)
values ('project_images', 'project_images', true)
on conflict (id) do nothing;

-- Drop existing storage policies to fix the "policy already exists" error
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select to public using ( bucket_id = 'project_images' );

drop policy if exists "Admin Upload" on storage.objects;
create policy "Admin Upload" on storage.objects for insert to authenticated with check ( bucket_id = 'project_images' );

drop policy if exists "Admin Update" on storage.objects;
create policy "Admin Update" on storage.objects for update to authenticated using ( bucket_id = 'project_images' );

drop policy if exists "Admin Delete" on storage.objects;
create policy "Admin Delete" on storage.objects for delete to authenticated using ( bucket_id = 'project_images' );
