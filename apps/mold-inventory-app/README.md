# Mold Inventory App

[https://mold-inventory-app-production.epicpatka.workers.dev/](https://mold-inventory-app-production.epicpatka.workers.dev/)

## Tech Stack
- [Auth0](https://auth0.com/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Next.js](https://nextjs.org/)

### Implementation Details

A Cloudflare Worker that serves the [Next.js](https://nextjs.org/) app.

## UI

![Screenshot of UI](./docs/ui.png)

UI generated with [v0.dev](https://v0.dev/)


## Setup

Install Node.js dependencies.
```bash
# install Node.js dependencies
npm install
```

### App

Copy `.env.development.example` to `.env.development`.

Fill out Auth0 details for dev and prod in:
- `apps/mold-inventory-app/.env.development`
- `apps/mold-inventory-app/.env.production`

Configure environment variables in `wrangler.jsonc`.

There are two ways to run the app locally, using either the Next.js development server, or the Cloudflare workerd runtime.

Run locally in Node.js using the Next.js development server, with hot-code reloading, error reporting, and more.
```bash
npm run dev
```

Run locally in the Cloudflare workerd runtime, which is more accurate to production.
```bash
npm run preview
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Unit Testing
- `npm run test` - vitest single run
- `npm run test:watch` - vitest watch test suites for changes

## Deploy to Cloudflare
```bash
npm run deploy
```

## Commands

- `npm run dev` - starts Next.js in development mode with hot-code reloading, error reporting, and more
- `npm run build` - create optimized production build
- `npm run start` - start Next.js in production mode
- `npm run lint` - run eslint
- `npm run test` - vitest single run
- `npm run test:watch` -  vitest watch test suites for changes

### Cloudflare Commands
- `npm run cf-typegen` - update type definitions after adding new bindings to your Wrangler configuration
- `npm run cf:build` - build Next.js app for Cloudflare workerd runtime
- `npm run preview` - run locally in the Cloudflare workerd runtime, which is more accurate to production
- `npm run upload` - deploy preview version to Cloudflare
- `npm run deploy` - deploy production version to Cloudflare
