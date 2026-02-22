# Molds Model Context Protocol (MCP) Server

This is a MCP server which will require the user to first authenticate. The MCP server will then be able to call the Mold Inventory API on behalf of the user.

- [Auth0](https://auth0.com/) for login
- Allows an LLM to receive the list of molds on behalf of the user.
- User must have `read:molds` permission for the Mold Inventory API.

### MCP Server AI Chat

See [MCP Server AI Chat](./docs/mcp-server-ai-chat.md) for screenshots interacting with AI.

## Configuration

### Make sure Auth0 tenant is deployed

Refer to [`auth0-tenant`](../auth0-tenant/README.md) app.

### Set up OAUTH_KV namespace

- Create the `OAUTH_KV` KV namespace: `pnpm run kv:create`
- Update `./wrangler.jsonc` file with the KV ID

## Development and Staging

Refer to `.dev.vars.example` and create a `.dev.vars` file in the root of the project with the following structure:

```
AUTH0_CLIENT_SECRET=The Client Secret of the application in Auth0
NODE_ENV=development
```

Configure environment variables in `wrangler.jsonc`.

### Testing the MCP Server

To start the MCP server, with the development Auth0 tenant, you can use the following command:

```
pnpm run dev
```

To start the MCP server with the staging Auth0 tenant, update the `AUTH0_CLIENT_SECERET` in `.dev.vars` and use:

```
pnpm run staging
```

With MCP Inspector you can connect to the MCP server, list the available tools and call them. Make sure to set the transport type to `sse` and the URL to `http://localhost:8788/sse`.

## Deploying the MCP Server to Cloudflare

To deploy the MCP Server to Cloudflare, you will first need to set the following secrets:

```bash
wrangler -e production secret put AUTH0_CLIENT_SECRET
```

Once the secrets are set, you can deploy the MCP Server with the following command:

```bash
pnpm run deploy
```

To test this you can now use the Workers AI LLM Playground. Navigate to [https://playground.ai.cloudflare.com/](https://playground.ai.cloudflare.com/) and connect to the molds MCP server on the bottom left using the following URL:

https://molds-mcp-production.epicpatka.workers.dev/sse

This will open a popup where you can sign in after which you'll be able to use all of the tools.

## Commands

- `pnpm run dev` - run Cloudflare Worker locally using development Auth0 tenant
- `pnpm run staging` - run Cloudflare Worker locally using staging Auth0 tenant
- `pnpm run cf-typegen` - update type definitions after adding new bindings to your Wrangler configuration
- `pnpm run type-check` - typescript lint
- `pnpm run prettier` - check code format with prettier
- `pnpm run prettier:fix` - fix code format with prettier
- `pnpm run kv:create` - Set up OAUTH_KV namespace
- `pnpm run deploy` - deploy production version to Cloudflare

## Troubleshooting

If you encounter any issues while setting up or using the MCP server, here are some troubleshooting steps:

**Check Worker Logs**

Visit the [Cloudflare Workers Logs](https://developers.cloudflare.com/workers/observability/logs/) in your dashboard

**Auth0 Dashboard Logs**

- Navigate to the Logs section in your Auth0 Dashboard
- Review authentication attempts and failures

**Common Issues**

- If authentication fails, verify your Auth0 configuration and secrets
- For connection issues, ensure your Worker is deployed and the domain is correct
- Check that all callback URLs are properly configured in Auth0
- Verify the API_BASE_URL matches your deployed API endpoint
