## Commands

Reference of npm scripts.

### auth0-tenant

- `pnpm nx deploy-dev auth0-tenant` - deploy development Auth0 tenant
- `pnpm nx deploy-staging auth0-tenant` - deploy staging Auth0 tenant
- `pnpm nx deploy-prod auth0-tenant` - deploy production Auth0 tenant
- `pnpm nx test auth0-tenant` - vitest actions single run
- `pnpm nx test:watch auth0-tenant` - vitest actions watch test suites for changes

### mold-inventory-api

- `pnpm nx dev mold-inventory-api` - run Cloudflare Worker locally
- `pnpm nx staging mold-inventory-api` - run Cloudflare Worker locally with Auth0 staging tenant
- `pnpm nx type-check mold-inventory-api` - typescript type check
- `pnpm nx lint mold-inventory-api` - check code with eslint
- `pnpm nx lint:fix mold-inventory-api` - fix code with eslint
- `pnpm nx prettier mold-inventory-api` - check code format with prettier
- `pnpm nx prettier:fix mold-inventory-api` - fix code format with prettier
- `pnpm nx test mold-inventory-api` - vitest single run
- `pnpm nx test:watch mold-inventory-api` - vitest watch test suites for changes

#### Cloudflare Commands

- `pnpm nx db:create mold-inventory-api` - create mold-inventory-app database in Cloudflare
- `pnpm nx db:migrate mold-inventory-api` - set up mold-inventory-app database in Cloudflare
- `pnpm nx db:migrate:local mold-inventory-api` - set up mold-inventory-app database locally
- `pnpm nx db:seed mold-inventory-api` - seed initial mold-inventory-app data in Cloudflare
- `pnpm nx db:seed:local mold-inventory-api` - seed initial mold-inventory-app data locally
- `pnpm nx prisma:generate mold-inventory-api` - generate prisma database schema
- `pnpm nx cf-typegen mold-inventory-api` - update type definitions after adding new bindings to your Wrangler configuration
- `pnpm nx upload mold-inventory-api` - deploy preview version to Cloudflare
- `pnpm nx deploy mold-inventory-api` - deploy production version to Cloudflare

### mold-inventory-app

- `pnpm nx dev mold-inventory-app` - starts Next.js in development mode with hot-code reloading, error reporting, and more
- `pnpm nx dev:staging mold-inventory-app` - starts Next.js in development mode with staging Auth0 tenant
- `pnpm nx build mold-inventory-app` - create optimized production build
- `pnpm nx start mold-inventory-app` - start Next.js in production mode
- `pnpm nx lint mold-inventory-app` - check code with eslint
- `pnpm nx lint:fix mold-inventory-app` - fix code with eslint
- `pnpm nx prettier mold-inventory-app` - check code format with prettier
- `pnpm nx prettier:fix mold-inventory-app` - fix code format with prettier
- `pnpm nx test mold-inventory-app` - vitest single run
- `pnpm nx test:watch mold-inventory-app` - vitest watch test suites for changes

#### Cloudflare Commands

- `pnpm nx cf-typegen mold-inventory-app` - update type definitions after adding new bindings to your Wrangler configuration
- `pnpm nx cf:build mold-inventory-app` - build Next.js app for Cloudflare workerd runtime
- `pnpm nx preview mold-inventory-app` - run locally in the Cloudflare workerd runtime, which is more accurate to production
- `pnpm nx preview:staging mold-inventory-app` - run locally in the Cloudflare workerd runtime with staging Auth0 tenant
- `pnpm nx upload mold-inventory-app` - deploy preview version to Cloudflare
- `pnpm nx deploy mold-inventory-app` - deploy production version to Cloudflare

### molds-mcp

- `pnpm nx dev molds-mcp` - run Cloudflare Worker locally using development Auth0 tenant
- `pnpm nx staging molds-mcp` - run Cloudflare Worker locally using staging Auth0 tenant
- `pnpm nx cf-typegen molds-mcp` - update type definitions after adding new bindings to your Wrangler configuration
- `pnpm nx type-check molds-mcp` - typescript lint
- `pnpm nx prettier molds-mcp` - check code format with prettier
- `pnpm nx prettier:fix molds-mcp` - fix code format with prettier
- `pnpm nx kv:create molds-mcp` - Set up OAUTH_KV namespace
- `pnpm nx deploy molds-mcp` - deploy production version to Cloudflare
