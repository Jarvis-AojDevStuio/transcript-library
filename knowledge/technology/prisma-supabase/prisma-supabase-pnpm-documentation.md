---
title: "Prisma + Supabase + pnpm Documentation"
description: "Comprehensive documentation for integrating Prisma ORM with Supabase database using pnpm package manager including setup and best practices."
category: "Infrastructure"
subcategory: "Database Integration"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - prisma
  - supabase
  - pnpm
  - database-orm
  - integration
---

# Prisma + Supabase + pnpm Documentation

This document contains comprehensive documentation for using Prisma with Supabase and pnpm, retrieved from Context7.

**Library ID:** `/prisma/docs`  
**Topic Focus:** Supabase integration with pnpm package manager  
**Documentation Scope:** Complete setup and integration patterns

## Table of Contents

1. [Supabase Connection Setup](#supabase-connection-setup)
2. [pnpm Workspace Configuration](#pnpm-workspace-configuration)
3. [Prisma Accelerate with Supabase](#prisma-accelerate-with-supabase)
4. [Monorepo Setup with pnpm](#monorepo-setup-with-pnpm)
5. [Database Package Configuration](#database-package-configuration)
6. [Next.js Integration](#nextjs-integration)
7. [Turborepo Integration](#turborepo-integration)
8. [Common Commands](#common-commands)

## Supabase Connection Setup

### Basic Connection String Format

```bash
postgresql://postgres:[YOUR-PASSWORD]@db.nzpppscrldfwlzfalbrf.supabase.co:5432/postgres
```

### Environment Configuration

#### Basic Setup

```bash
# Set DATABASE_URL in .env (Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nzpppscrldfwlzfalbrf.supabase.co:5432/postgres"
```

#### Connection Pooling with Supavisor

```env
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgres://postgres.[your-supabase-project]:[password]@aws-0-[aws-region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

#### Session Mode for pg_dump

```plaintext
postgres://postgres.apbkobhfnmcqqzqeeqss:[YOUR-PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:5432/postgres
```

#### Direct URL for Migrations

```env
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgres://postgres.[your-supabase-project]:[password]@aws-0-[aws-region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgres://postgres.[your-supabase-project]:[password]@aws-0-[aws-region].pooler.supabase.com:5432/postgres"
```

### Schema Configuration

#### Basic Schema with Direct URL

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

#### Schema with Accelerate

```prisma
datasource db {
  url       = env("DATABASE_URL") // points to the connection pool for queries
  directUrl = env("DIRECT_URL")   // points to the database for migrations
}
```

## pnpm Workspace Configuration

### Initialize Project

```terminal
mkdir my-monorepo
cd my-monorepo
pnpm init
```

### Create Workspace Configuration

```terminal
touch pnpm-workspace.yaml
```

### Configure pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
catalogs:
  prisma:
    prisma: latest
```

### Directory Structure Setup

```terminal
mkdir apps
mkdir -p packages/database
```

### Resolve pnpm Hoisting for Prisma Studio

```npmrc
hoist-pattern[]=*prisma*
```

## Prisma Accelerate with Supabase

### Install Prisma CLI

```bash
npm install prisma --save-dev
```

### Initialize Prisma

```bash
npx prisma init
```

### Install Accelerate Extension

```bash
npm install @prisma/extension-accelerate
```

### Environment Configuration for Accelerate

```bash
# Update DATABASE_URL to Accelerate
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=ey..."

# Set DIRECT_URL for migrations
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=ey..."
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.nzpppscrldfwlzfalbrf.supabase.co:5432/postgres"
```

### Database Introspection

```bash
npx prisma db pull
```

### Generate Client with No Engine

```bash
npx prisma generate --no-engine
```

### Accelerate Extension Implementation

```typescript
import { PrismaClient } from "./generated/prisma"
import { withAccelerate } from "@prisma/extension-accelerate"

const prisma = new PrismaClient().$extends(withAccelerate())
```

## Monorepo Setup with pnpm

### Database Package Setup

#### Navigate to Database Package

```terminal
cd packages/database
pnpm init
```

#### Add Prisma Dependencies

```json
"devDependencies": {
  "prisma": "catalog:prisma"
}
```

#### Install Dependencies

```terminal
pnpm install
```

#### Add TypeScript Dependencies

```terminal
pnpm add typescript tsx @types/node -D
```

#### Install Accelerate Extension

```terminal
pnpm add @prisma/extension-accelerate
```

#### Initialize TypeScript

```terminal
pnpm tsc --init
```

#### Initialize Prisma with Custom Output

```terminal
pnpm prisma init --db
```

### Schema Configuration for Monorepo

```prisma
generator client {
  provider = "prisma-client-js"
  output = "../generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

### Helper Scripts Configuration

```json
{
  "scripts": {
    "db:generate": "prisma generate --no-engine",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:studio": "prisma studio"
  }
}
```

### Prisma Client Setup

```ts
import { PrismaClient } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Instantiate the extended Prisma client to infer its type
const extendedPrisma = new PrismaClient().$extends(withAccelerate());
type ExtendedPrismaClient = typeof extendedPrisma;

// Use globalThis for broader environment compatibility
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: ExtendedPrismaClient;
};

// Named export with global memoization
export const prisma: ExtendedPrismaClient =
  globalForPrisma.prisma ?? extendedPrisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### Export Configuration

```ts
export { prisma } from "./client";
export * from "./generated/client";
```

### Run Database Operations

```terminal
# Run migrations
pnpm run db:migrate

# Launch Prisma Studio
pnpm run studio
```

## Next.js Integration

### Navigate to Apps Directory

```terminal
cd ../../apps
```

### Create Next.js Application

```terminal
pnpm create next-app@latest web --yes
```

### Navigate to Next.js App

```terminal
cd web/
```

### Copy Environment Variables

```terminal
cp ../../packages/database/.env .
```

### Add Database Dependency

```json
"dependencies": {
  "database": "workspace:*"
}
```

### Return to Monorepo Root

```terminal
cd ../../
```

### Install Dependencies

```terminal
pnpm install
```

### Integrate Prisma in Next.js Page

```tsx
import { prisma } from "database";

export default async function Home() {
  const user = await prisma.user.findFirst({
    select: {
      name: true
    }
  });

  return (
    <div>
      {user?.name && <p>Hello from {user.name}</p>}
      {!user?.name && <p>No user has been added to the database yet. </p>}
    </div>
  );
}
```

### Monorepo Helper Scripts

```json
"scripts": {
  "build": "pnpm --filter database db:deploy && pnpm --filter database db:generate  && pnpm --filter web build",
  "start": "pnpm --filter web start",
  "dev": "pnpm --filter database db:generate && pnpm --filter web dev",
  "studio": "pnpm --filter database db:studio"
}
```

### Start Development Server

```terminal
pnpm run dev
```

## Turborepo Integration

### Install Turborepo

```pnpm
cd turborepo-prisma
pnpm add turbo --save-dev --ignore-workspace-root-check
```

### Database Package in Turborepo

#### Create Database Package

```terminal
cd packages/
mkdir database
cd database
touch package.json
```

#### Define Package JSON

```json
{
  "name": "@repo/db",
  "version": "0.0.0"
}
```

#### Initialize Prisma with Custom Output

```terminal
pnpm prisma init --db --output ../generated/prisma
```

### Add Database Dependency to Web App

#### Using npm

```json
{
    // ...
    "dependencies": {
      "@repo/db": "*"
      // ...
    }
    // ...
  }
```

#### Using pnpm

```json
{
    // ...
    "dependencies": {
      "@repo/db": "workspace:*"
      // ...
    }
    // ...
  }
```

### Install Web App Dependencies

```terminal
cd apps/web
pnpm install
```

### Configure Turborepo Tasks

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build", "^db:generate"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"],
      "env": ["DATABASE_URL"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "dependsOn": ["^db:generate"],
      "cache": false,
      "persistent": true
    },
    "db:generate": {
      "cache": false
    },
    "db:migrate": {
      "cache": false,
      "persistent": true
    },
    "db:deploy": {
      "cache": false
    }
  }
}
```

### Run Turborepo Commands

```terminal
# Generate Prisma types
pnpm turbo db:generate

# Run migrations
pnpm turbo db:migrate

# Run development server
pnpm turbo run dev --filter=web

# Launch Prisma Studio
pnpm prisma studio
```

## Common Commands

### pnpm Commands

```terminal
# Install dependencies
pnpm install

# Install shared database package
pnpm install

# Upgrade Prisma packages
pnpm upgrade prisma@6 @prisma/client@6
pnpm upgrade prisma@5 @prisma/client@5

# Execute Prisma CLI
pnpm dlx prisma

# Global Prisma installation (not recommended)
pnpm install prisma --global
```

### Prisma Commands

```terminal
# Generate client
pnpm prisma generate --no-engine

# Run migrations
pnpm prisma migrate dev

# Deploy migrations
pnpm prisma migrate deploy

# Launch Studio
pnpm prisma studio

# Database introspection
pnpm prisma db pull
```

### Workspace-Specific Commands

```terminal
# Filter commands to specific packages
pnpm --filter database db:deploy
pnpm --filter database db:generate
pnpm --filter web build
pnpm --filter web dev
```

## Prisma Postgres Serverless Driver

### Installation

```terminal
npm install @prisma/ppg
```

### Function API

```typescript
// ppg function signature
function ppg(connectionString: string, deserialize?: Deserialize): Sql;

// Usage examples
import { ppg } from "@prisma/ppg";

type Post = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number | null;
}

type User = {
  id: number;
  email: string
}

const sql = ppg("prisma+postgres://accelerate.prisma-data.net/?api_key=...");

const posts: Post[] = await sql<Post>`SELECT * FROM "Post"`

const userId = 42;
const user: User[] = await sql<User>`SELECT * FROM "User" WHERE "id" = ${userId}`
```

### PPG Tunnel for Backups

```bash
npx @prisma/ppg-tunnel --host 127.0.0.1 --port 5432
```

## Multi-Database Configuration

### Environment Variables for Multiple Databases

```text file
PPG_POST_DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI..."
```

## Best Practices

1. **Use Workspace Dependencies**: Always reference shared packages with `workspace:*` in pnpm
2. **Leverage Catalogs**: Pin Prisma versions using pnpm catalogs for consistency
3. **Custom Output Paths**: Use custom output directories for better organization in monorepos
4. **Direct URLs**: Always configure direct URLs for migration operations with Supabase
5. **Connection Pooling**: Use Supavisor for production applications
6. **Environment Variables**: Keep sensitive credentials in `.env` files
7. **Task Dependencies**: Configure proper task dependencies in Turborepo for smooth builds
8. **Memoization**: Use global memoization for Prisma Client in development

## Migration from SQLite

When migrating from SQLite to PostgreSQL:

```terminal
rm prisma/dev.db # Delete SQLite database file
rm -r prisma/migrations # Delete the pre-existing migrations folder
```

## Driver Adapters with Custom Output

For custom Prisma Client output paths with driver adapters:

```terminal
# npm
npm add db@./src/generated/client

# pnpm
pnpm add db@link:./src/generated/client

# yarn
yarn add db@link:./src/generated/client
```

This documentation provides complete coverage of Prisma integration with Supabase using pnpm, including monorepo setups, Turborepo integration, and advanced patterns.
