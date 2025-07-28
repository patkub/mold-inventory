# Mold Inventory App

[https://mold-inventory-app-production.epicpatka.workers.dev/](https://mold-inventory-app-production.epicpatka.workers.dev/)

## Tech Stack
- [Auth0](https://auth0.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
  - [Hono](https://hono.dev/)
  - [Prisma](https://www.prisma.io/)
- [Next.js](https://nextjs.org/)

### Implementation Details

A custom [Cloudflare Worker](https://developers.cloudflare.com/workers/) using
  - [Auth0](https://auth0.com/) for login
  - [Hono](https://hono.dev/) for the backend web framework
  - [Prisma](https://www.prisma.io/) ORM to manage a [Cloudflare D1](https://developers.cloudflare.com/d1/) database
  - [Next.js](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) as the frontend React Framework
  
The [Cloudflare Worker](https://developers.cloudflare.com/workers/)
  - Serves the Next.js app
  - A CRUD API that manages molds
    - Validates Auth0 JWT access token scope claim for permissions

UI generated with [v0.dev](https://v0.dev/)


## UI

![Screenshot of UI](./docs/ui.png)


## Setup

Install Node.js dependencies.
```bash
# install Node.js dependencies
npm install
```

### App

Copy `.env.example` to `.env`. Fill out Auth0 details.
```
AUTH0_DOMAIN=dev-5gm1mr1z8nbmuhv7.us.auth0.com
AUTH0_CLIENT_ID=DYZT9rpjL5LoJNfpjo8JEQtPaLqyABHO
AUTH0_AUDIENCE=mold-inventory-app-production.epicpatka.workers.dev/api
AUTH0_SCOPES="openid profile read:current_user create:molds read:molds update:molds delete:molds"
```

Configure environments in `wrangler.jsonc`.

Setup local Cloudflare D1 database for the first time.
```bash
# setup local Cloudflare D1 database
npm run db:migrate:local
npm run db:seed:local

# generate prisma database schema
npm run prisma:generate
```

Run the app locally.
```bash
# run Cloudflare Worker locally
npm run preview
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
