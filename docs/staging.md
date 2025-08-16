# Staging Deploy

Deploy to staging environment.

## Deploy Staging Auth0 Tenant

Copy auth0 config from `apps/auth0-tenant/auth0-config.json.example` to `apps/auth0-tenant/auth0-config-staging.json` and fill out details using Machine to Machine client.

Deploy staging Auth0 configuration.

```bash
pnpm nx deploy-staging auth0-tenant
```

Create users in Auth0 dashboard.

- Assign permissions to users for the Mold Inventory API.
  - Available permissions: `create:molds`, `read:molds`, `update:molds`, and `delete:molds`

Define secrets for MoldInventoryPostUserRegistration action.

- `DOMAIN` - Auth0 domain
- `CLIENT_ID` - Molds M2M Client ID
- `CLIENT_SECRET` - Molds M2M Client Secret

Staging Auth0 tenant can be used as another testing environment.

## Run the API
```bash
pnpm nx staging mold-inventory-api
```

## Run the App

Run locally in Node.js using the Next.js development server, with hot-code reloading, error reporting, and more.

```bash
pnpm nx dev:staging mold-inventory-app
```

Run locally in the Cloudflare workerd runtime, which is more accurate to production.

```bash
pnpm nx preview:staging mold-inventory-app
```

## Run the Molds MCP Server

```bash
pnpm nx staging molds-mcp
```