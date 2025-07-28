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
npm run db:migrate:local
npm run db:seed:local

# generate prisma database schema
npm run prisma:generate
```

Run the API locally.
```bash
# run Cloudflare Worker locally
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Unit Testing
- `npm run test` - vitest single run
- `npm run test:watch` - vitest watch test suites for changes

## Deploy to Cloudflare
```bash
npm run deploy
```

## Commands

- `npm run dev` - run Cloudflare Worker locally
- `npm run test` - vitest single run
- `npm run test:watch` -  vitest watch test suites for changes

### Cloudflare Commands
- `npm run db:create` - create mold-inventory-app database in Cloudflare
- `npm run db:migrate` - setup mold-inventory-app database in Cloudflare
- `npm run db:migrate:local` - setup mold-inventory-app database locally
- `npm run db:seed` - seed initial mold-inventory-app data in Cloudflare
- `npm run db:seed:local` - seed initial mold-inventory-app data locally
- `npm run prisma:generate` - generate prisma database schema
- `npm run cf-typegen` - update type definitions after adding new bindings to your Wrangler configuration
- `npm run upload` - deploy preview version to Cloudflare
- `npm run deploy` - deploy production version to Cloudflare
