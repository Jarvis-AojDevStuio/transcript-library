---
title: "Supabase Row Level Security (RLS) Documentation"
description: "Comprehensive documentation for Supabase Row Level Security implementation patterns, policies, and best practices for database security."
category: "Infrastructure"
subcategory: "Database Security"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - supabase
  - row-level-security
  - database-security
  - authentication
  - authorization
---

# Supabase Row Level Security (RLS) Documentation

This document contains comprehensive documentation for Supabase Row Level Security retrieved from Context7.

**Library ID:** `/supabase/supabase`  
**Topic Focus:** Row Level Security  
**Documentation Scope:** Complete RLS implementation patterns and best practices

## Table of Contents

1. [Basic RLS Setup](#basic-rls-setup)
2. [Policy Types and Examples](#policy-types-and-examples)
3. [Advanced Patterns](#advanced-patterns)
4. [Performance Optimization](#performance-optimization)
5. [Multi-Factor Authentication with RLS](#multi-factor-authentication-with-rls)
6. [Multi-Tenancy Patterns](#multi-tenancy-patterns)
7. [Common Use Cases](#common-use-cases)

## Basic RLS Setup

### Enabling Row Level Security

Enable RLS on any table to restrict access based on policies:

```sql
-- Basic RLS enablement
alter table "table_name" enable row level security;

-- With schema specification
alter table <schema_name>.<table_name> enable row level security;
```

### Anonymous Access Policy

Allow public read access to tables:

```sql
-- Turn on security
alter table "todos"
enable row level security;

-- Allow anonymous access
create policy "Allow anonymous access"
on todos
for select
to anon
using (true);
```

## Policy Types and Examples

### SELECT Policies

#### Public Access

```sql
create policy "Profiles are viewable by everyone"
on profiles
for select
to authenticated, anon
using ( true );
```

#### User-Owned Data

```sql
create policy "Individuals can view their own todos."
on todos for select
using ( (select auth.uid()) = user_id );
```

#### Authenticated Users Only

```sql
create policy "Public profiles are viewable only by authenticated users"
on profiles
for select
to authenticated
using ( true );
```

### INSERT Policies

#### User Profile Creation

```sql
create policy "Users can create a profile."
on profiles for insert
to authenticated
with check ( (select auth.uid()) = user_id );
```

#### Message Creation with Ownership

```sql
CREATE POLICY "Individuals can only write their own messages."
ON messages FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);
```

### UPDATE Policies

#### Own Profile Updates

```sql
create policy "Users can update their own profile."
on profiles for update
to authenticated
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );
```

#### Owner-Only Updates

```sql
create policy "Allow update for owners"
on posts for update
using ((select auth.uid()) = user_id);
```

### DELETE Policies

#### Profile Deletion

```sql
create policy "Users can delete a profile."
on profiles for delete
to authenticated
using ( (select auth.uid()) = user_id );
```

## Advanced Patterns

### Complex Multi-Table Example

```sql
-- Enable RLS for all tables
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.org_members enable row level security;
alter table public.posts enable row level security;

-- Helper function for role checks
create or replace function private.get_user_org_role(org_id bigint, user_id uuid)
returns text
set search_path = ''
as $$
  select role from public.org_members
  where org_id = $1 and user_id = $2;
$$ language sql security definer;

-- Complex post visibility policy
create policy "Complex post visibility"
on public.posts for select using (
  -- Published non-premium posts are visible to all
  (status = 'published' and not is_premium)
  or
  -- Premium posts visible to org members only
  (status = 'published' and is_premium and
   private.get_user_org_role(org_id, (select auth.uid())) is not null)
  or
  -- All posts visible to editors and above
  private.get_user_org_role(org_id, (select auth.uid())) in ('owner', 'admin', 'editor')
);
```

### Team-Based Access Control

```sql
create policy "User is in team"
on my_table
to authenticated
using ( team_id in (select auth.jwt() -> 'app_metadata' -> 'teams'));
```

## Performance Optimization

### Efficient Policy Design

#### Good Practice - Use Stored Values

```sql
create policy "rls_test_select" on test_table
to authenticated
using ( (select auth.uid()) = user_id );
```

#### Bad Practice - Direct Function Calls

```sql
-- Avoid this - can be inefficient
create policy "rls_test_select" on test_table
to authenticated
using ( auth.uid() = user_id );
```

### Indexing for RLS Performance

```sql
create index userid
on test_table
using btree (user_id);
```

### Security Definer Functions

Use security definer functions to bypass RLS for lookups:

```sql
create function private.has_good_role()
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1 from roles_table
    where (select auth.uid()) = user_id and role = 'good_role'
  );
end;
$$;

-- Use in policy
create policy "rls_test_select"
on test_table
to authenticated
using ( private.has_good_role() );
```

### Bypass RLS for Administrative Roles

```sql
alter role "role_name" with bypassrls;
```

## Multi-Factor Authentication with RLS

### Enforce MFA for All Users

```sql
create policy "Enforce MFA for all end users."
on table_name
as restrictive
to authenticated
using ( (select auth.jwt()->>'aal') = 'aal2' );
```

### Selective MFA Enforcement

```sql
create policy "Allow access on table only if user has gone through MFA"
on table_name
as restrictive
to authenticated
using (
  array[auth.jwt()->>'aal'] <@ (
    select
      case
        when count(id) > 0 then array['aal2']
        else array['aal1', 'aal2']
      end as aal
    from auth.mfa_factors
    where (select auth.uid()) = user_id and status = 'verified'
  ));
```

### Profile Updates with MFA

```sql
create policy "Restrict updates."
on profiles
as restrictive
for update
to authenticated using (
  (select auth.jwt()->>'aal') = 'aal2'
);
```

## Multi-Tenancy Patterns

### SSO Provider-Based Tenancy

```sql
create policy "Only allow read-write access to tenants"
on tablename as restrictive
to authenticated using (
  tenant_id = (select auth.jwt() -> 'app_metadata' ->> 'provider')
);
```

## Common Use Cases

### Chat Application Example

```sql
-- Helper function for room participation
create or replace function is_room_participant(room_id uuid)
returns boolean as $$
  select exists(
    select 1
    from room_participants
    where room_id = is_room_participant.room_id and profile_id = auth.uid()
  );
$$ language sql security definer;

-- Room access policies
alter table public.rooms enable row level security;
create policy "Users can view rooms that they have joined"
on public.rooms for select using (is_room_participant(id));

alter table public.messages enable row level security;
create policy "Users can view messages on rooms they are in."
on public.messages for select using (is_room_participant(room_id));
create policy "Users can insert messages on rooms they are in."
on public.messages for insert with check (is_room_participant(room_id) and profile_id = auth.uid());
```

### Ride Sharing Application

```sql
alter table public.drivers enable row level security;
create policy "Any authenticated users can select drivers."
on public.drivers for select to authenticated using (true);
create policy "Drivers can update their own status."
on public.drivers for update to authenticated using (auth.uid() = id);

alter table public.rides enable row level security;
create policy "The driver or the passenger can select the ride."
on public.rides for select to authenticated using (driver_id = auth.uid() or passenger_id = auth.uid());
create policy "The driver can update the status."
on public.rides for update to authenticated using (auth.uid() = driver_id);
```

### Kanban Board Example

```sql
alter table boards enable row level security;

create policy "Users can create boards" on boards for
insert to authenticated with CHECK (true);

create policy "Users can view their boards" on boards for
select using (
  id in (
    select get_boards_for_authenticated_user()
  )
);

create policy "Users can delete their created boards" on boards for
delete using ((select auth.uid()) = creator);
```

## Views and RLS

### Security Invoker Views (Postgres 15+)

```sql
create view <VIEW_NAME>
with(security_invoker = true)
as select <QUERY>
```

### View Ownership for RLS

```sql
ALTER VIEW my_view OWNER TO authenticated;
```

## Data Dumping with RLS

### Selective Data Export

```sql
-- Turn on Row Level Security
alter table profiles enable row level security;

-- Only dump data for internal team members 1, 2, 3
create policy "Data dump rule" on profiles
for select
to exporter
using (
  id in (1, 2, 3)
);
```

## Edge Functions and RLS

### Automatic RLS Application

```javascript
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  // RLS policies are automatically applied
  const { data, error } = await supabaseClient.from('profiles').select('*');

  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
```

## Testing RLS Policies

### Using pgTAP

```sql
begin;
select plan( 1 );

select policies_are(
  'public',
  'profiles',
  ARRAY [
    'Profiles are public',
    'Profiles can only be updated by the owner'
  ]
);

select * from finish();
rollback;
```

## Storage Policies

### Public Bucket Access

```sql
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'public' );
```

### Avatar Upload Policy

```sql
create policy "Avatar images are publicly accessible."
on storage.objects for select
using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar."
on storage.objects for insert
with check (bucket_id = 'avatars');
```

## Best Practices

1. **Always specify roles**: Use `to authenticated` or `to anon` to optimize policy evaluation
2. **Index frequently filtered columns**: Create indexes on columns used in RLS policies
3. **Use security definer functions**: For complex role checks that need to bypass RLS
4. **Test policies thoroughly**: Use pgTAP or manual testing to verify policy behavior
5. **Consider performance**: Avoid expensive operations in policy expressions
6. **Use restrictive policies**: For additional security layers with MFA or special conditions

## Performance Tips

- Always specify the role (`to authenticated`) to prevent unnecessary policy evaluation
- Use indexes on columns referenced in policies
- Consider using security definer functions for complex authorization logic
- Cache role/permission checks when possible
- Test policy performance with realistic data volumes

This documentation covers the most common RLS patterns and use cases in Supabase. Each example is production-ready and follows security best practices.
