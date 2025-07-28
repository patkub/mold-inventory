# Mold Inventory

[https://mold-inventory-app-production.epicpatka.workers.dev/](https://mold-inventory-app-production.epicpatka.workers.dev/)

## Architecture

This is a monorepo powered by [Nx](https://nx.dev/).

### Tech Stack
[Auth0](https://auth0.com/), [Cloudflare D1](https://developers.cloudflare.com/d1/), [Cloudflare Workers](https://developers.cloudflare.com/workers/), [Hono](https://hono.dev/), [Prisma](https://www.prisma.io/), [Next.js](https://nextjs.org/)


### Apps

- [`auth0-tenant`](./apps/auth0-tenant/README.md): [Auth0](https://auth0.com/) tenant configuration
- [`mold-inventory-api`](./apps/mold-inventory-api/README.md): Cloudflare Worker serving a [Hono](https://hono.dev/) API backend
- [`mold-inventory-app`](./apps/mold-inventory-app/README.md): Cloudflare Worker serving the [Next.js](https://nextjs.org/) app


### Implementation Details

#### auth0-tenant

Deployable [Auth0](https://auth0.com/) tenant configuration for this app.

#### mold-inventory-api

[`mold-inventory-api`](./apps/mold-inventory-api/README.md): Cloudflare Worker [Hono](https://hono.dev/) API backend

- Cloudflare Worker that serves a [Hono](https://hono.dev/) CRUD API that manages molds.
- Validates [Auth0](https://auth0.com/) JWT access token scope claim for permissions.
- Uses [Prisma](https://www.prisma.io/) ORM to manage a [Cloudflare D1](https://developers.cloudflare.com/d1/) database

#### mold-inventory-app

[`mold-inventory-app`](./apps/mold-inventory-app/README.md): Cloudflare Worker serving the [Next.js](https://nextjs.org/) app
  - [Auth0](https://auth0.com/) for login
  - [Next.js](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) as the frontend React Framework


## UI

![Screenshot of UI](./apps/mold-inventory-app/docs/ui.png)

UI generated with [v0.dev](https://v0.dev/)


## Setup

### Install Dependencies

Install Node.js dependencies.
```bash
# install Node.js dependencies
npm install
```

### Deploy Auth0 Configuration

Copy auth0 config from `apps/auth0-tenant/auth0-config.json.example` to `apps/auth0-tenant/auth0-config.json` and fill out details using Machine to Machine client.

Deploy Auth0 configuration.
```bash
# deploy Auth0 configuration
npx nx deploy auth0-tenant
```

Create users in Auth0 dashboard.
- Assign permissions to users for the Mold Inventory API.
  - Available permissions: `create:molds`, `read:molds`, `update:molds`, and `delete:molds`


### Run App

Copy `apps/mold-inventory-app/.env.example` to `apps/mold-inventory-app/.env`. Fill out Auth0 details.
```
NEXT_PUBLIC_AUTH0_DOMAIN=dev-5gm1mr1z8nbmuhv7.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=DYZT9rpjL5LoJNfpjo8JEQtPaLqyABHO
NEXT_PUBLIC_AUTH0_AUDIENCE=mold-inventory-app-production.epicpatka.workers.dev/api
NEXT_PUBLIC_AUTH0_SCOPES="openid profile read:current_user create:molds read:molds update:molds delete:molds"
```

Configure environments in `apps/mold-inventory-app/wrangler.jsonc`.

Setup local Cloudflare D1 database for the first time.
```bash
# setup local Cloudflare D1 database
npx nx db:migrate:local mold-inventory-app
npx nx db:seed:local mold-inventory-app
```

Run the app locally.
```bash
# run Cloudflare Worker locally
npx nx preview mold-inventory-app
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Unit Testing
- `npx nx test mold-inventory-app` - vitest single run
- `npx nx test:watch mold-inventory-app` - vitest watch test suites for changes


## Deploy to Cloudflare
```bash
npx nx deploy mold-inventory-app
```

## Commands

### Cloudflare Commands
- `npx nx db:create mold-inventory-app` - create mold-inventory-app database in Cloudflare
- `npx nx db:migrate mold-inventory-app` - setup mold-inventory-app database in Cloudflare
- `npx nx db:migrate:local mold-inventory-app` - setup mold-inventory-app database locally
- `npx nx db:seed mold-inventory-app` - seed initial mold-inventory-app data in Cloudflare
- `npx nx db:seed:local mold-inventory-app` - seed initial mold-inventory-app data locally
- `npx nx cf-typegen mold-inventory-app` - update type definitions after adding new bindings to your Wrangler configuration
- `npx nx upload mold-inventory-app` - deploy preview version to Cloudflare
- `npx nx deploy mold-inventory-app` - deploy production version to Cloudflare

### Other Commands
- `npx nx prisma:generate` - regenerate prisma database schema
