# Mold Inventory API

[https://mold-inventory-api-production.epicpatka.workers.dev/api/molds](https://mold-inventory-api-production.epicpatka.workers.dev/api/molds)

## Tech Stack

- [Auth0](https://auth0.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
  - [Hono](https://hono.dev/)
  - [Prisma](https://www.prisma.io/)

### Implementation Details

A Cloudflare Worker that serves a [Hono](https://hono.dev/) CRUD API to manage molds.

- Validates [Auth0](https://auth0.com/) JWT access token scope claim for permissions.
- Uses [Prisma](https://www.prisma.io/) ORM to manage a [Cloudflare D1](https://developers.cloudflare.com/d1/) database

## Setup

### API

Configure environments in `wrangler.jsonc`.

Setup local Cloudflare D1 database for the first time.

```bash
# setup local Cloudflare D1 database
pnpm run db:migrate:local
pnpm run db:seed:local

# generate prisma database schema
pnpm run prisma:generate
```

Run the API locally.

```bash
# run Cloudflare Worker locally
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Unit Testing

- `pnpm run test` - vitest single run
- `pnpm run test:watch` - vitest watch test suites for changes

## Deploy to Cloudflare

```bash
pnpm run deploy
```

## Commands

- `pnpm run dev` - run Cloudflare Worker locally
- `pnpm run lint` - check code with eslint
- `pnpm run lint:fix` - fix code with eslint
- `pnpm run prettier` - check code format with prettier
- `pnpm run prettier:fix` - fix code format with prettier
- `pnpm run test` - vitest single run
- `pnpm run test:watch` - vitest watch test suites for changes

### Cloudflare Commands

- `pnpm run db:create` - create mold-inventory-app database in Cloudflare
- `pnpm run db:migrate` - setup mold-inventory-app database in Cloudflare
- `pnpm run db:migrate:local` - setup mold-inventory-app database locally
- `pnpm run db:seed` - seed initial mold-inventory-app data in Cloudflare
- `pnpm run db:seed:local` - seed initial mold-inventory-app data locally
- `pnpm run prisma:generate` - generate prisma database schema
- `pnpm run cf-typegen` - update type definitions after adding new bindings to your Wrangler configuration
- `pnpm run upload` - deploy preview version to Cloudflare
- `pnpm run deploy` - deploy production version to Cloudflare
