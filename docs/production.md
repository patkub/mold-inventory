# Production Deploy

Deploy to production.

## Deploy Production Auth0 Configuration

Copy auth0 config from `apps/auth0-tenant/auth0-config.json.example` to `apps/auth0-tenant/auth0-config-prod.json` and fill out details using Machine to Machine client.

Deploy production Auth0 configuration.

```bash
pnpm nx deploy-prod auth0-tenant
```

Create users in Auth0 dashboard.

- Assign permissions to users for the Mold Inventory API.
  - Available permissions: `create:molds`, `read:molds`, `update:molds`, and `delete:molds`

Define secrets for MoldInventoryPostUserRegistration action.

- `DOMAIN` - Auth0 domain
- `CLIENT_ID` - Molds M2M Client ID
- `CLIENT_SECRET` - Molds M2M Client Secret

## Deploy Production API to Cloudflare

Create and seed mold-inventory-app database in Cloudflare.

```bash
pnpm nx db:create mold-inventory-api
pnpm nx db:migrate mold-inventory-api
```

Deploy the API to Cloudflare.

```bash
pnpm nx deploy mold-inventory-api
```

## Deploy Production App to Cloudflare

Configure environment variables for production in `apps/mold-inventory-app/wrangler.jsonc`.

```bash
pnpm nx deploy mold-inventory-app
```

## Deploy Production Molds MCP Server to Cloudflare

### Set up OAUTH_KV namespace

- Create the `OAUTH_KV` KV namespace: `pnpm nx kv:create molds-mcp`
- Update `./wrangler.jsonc` file with the KV ID

To deploy the MCP Server to Cloudflare, you will first need to set the following secrets:

```bash
wrangler -e production secret put AUTH0_CLIENT_SECRET
```

Once the secrets are set, you can deploy the MCP Server with the following command:

```bash
pnpm nx deploy molds-mcp
```

## Deployment Details

### Endpoints
- App: https://mold-inventory-app-production.epicpatka.workers.dev/
- Molds MCP server: https://molds-mcp-production.epicpatka.workers.dev/sse
- API: https://mold-inventory-api-production.epicpatka.workers.dev/api/molds
