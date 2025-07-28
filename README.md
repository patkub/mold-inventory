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

[`auth0-tenant`](./apps/auth0-tenant/README.md): Deployable [Auth0](https://auth0.com/) tenant configuration for this app.

#### mold-inventory-api

[`mold-inventory-api`](./apps/mold-inventory-api/README.md): Cloudflare Worker [Hono](https://hono.dev/) API backend

- A Cloudflare Worker that serves a [Hono](https://hono.dev/) CRUD API to manage molds.
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
npm install
```

### Deploy Auth0 Configuration

Copy auth0 config from `apps/auth0-tenant/auth0-config.json.example` to `apps/auth0-tenant/auth0-config.json` and fill out details using Machine to Machine client.

Deploy Auth0 configuration.
```bash
npx nx deploy auth0-tenant
```

Create users in Auth0 dashboard.
- Assign permissions to users for the Mold Inventory API.
  - Available permissions: `create:molds`, `read:molds`, `update:molds`, and `delete:molds`

### Run the API locally

Setup local Cloudflare D1 database for the first time.
```bash
# setup local Cloudflare D1 database
npx nx db:migrate:local mold-inventory-api
npx nx db:seed:local mold-inventory-api

# generate prisma database schema
npx nx prisma:generate mold-inventory-api
```

Configure environment variables in `apps/mold-inventory-app/wrangler.jsonc`.

Run the api locally.
```bash
npx nx dev mold-inventory-api
```

### Run the App locally

Fill out Auth0 details for dev and prod in:
- `apps/mold-inventory-app/.env.development`
- `apps/mold-inventory-app/.env.production`

Configure environment variables in `apps/mold-inventory-app/wrangler.jsonc`.

Run the app locally.
```bash
npx nx dev mold-inventory-app
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Unit Testing

Run unit tests for API and App
```
npx nx run-many -t test -p mold-inventory-api mold-inventory-app
```

- `npx nx test mold-inventory-api` - vitest single run for API
- `npx nx test:watch mold-inventory-api` - vitest watch test suites for changes for API
- `npx nx test mold-inventory-app` - vitest single run for app
- `npx nx test:watch mold-inventory-app` - vitest watch test suites for changes for app


## Deploy to Cloudflare

Deploy the API
```bash
npx nx deploy mold-inventory-api
```

Deploy the app
```bash
npx nx deploy mold-inventory-app
```

## Commands

### Cloudflare Commands

#### API
- `npx nx db:create mold-inventory-api` - create mold-inventory-app database in Cloudflare
- `npx nx db:migrate mold-inventory-api` - setup mold-inventory-app database in Cloudflare
- `npx nx db:migrate:local mold-inventory-api` - setup mold-inventory-app database locally
- `npx nx db:seed mold-inventory-api` - seed initial mold-inventory-app data in Cloudflare
- `npx nx db:seed:local mold-inventory-api` - seed initial mold-inventory-app data locally
- `npx nx cf-typegen mold-inventory-api` - update type definitions after adding new bindings to your Wrangler configuration
- `npx nx upload mold-inventory-api` - deploy preview version of API to Cloudflare

#### App
- `npx nx cf-typegen mold-inventory-app` - update type definitions after adding new bindings to your Wrangler configuration
- `npx nx upload mold-inventory-app` - deploy preview version of app to Cloudflare

### Other Commands
- `npx nx prisma:generate mold-inventory-api` - regenerate prisma database schema
