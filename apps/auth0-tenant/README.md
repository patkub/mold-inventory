# Mold Inventory - Auth0 Tenant

## Explanation

This subproject is responsible for the Auth0 tenant configuration.

## Setup

Install Node.js 22 dependencies.
```bash
# install Node.js dependencies
pnpm install
```

### Development Auth0 Tenant

Copy auth0 config from `auth0-config.json.example` to `auth0-config-dev.json` and fill out details using Machine to Machine client.

Deploy Auth0 configuration.
```bash
# deploy development Auth0 configuration
pnpm run deploy-dev
```

### Staging Auth0 Tenant

Fill out auth0 config in `auth0-config-staging.json`.

```bash
# deploy staging Auth0 configuration
pnpm run deploy-staging
```

### Production Auth0 Tenant

Fill out auth0 config in `auth0-config-prod.json`.

```bash
# deploy production Auth0 configuration
pnpm run deploy-prod
```

### Create Users

Create users in Auth0 dashboard.
- Assign permissions to users for the Mold Inventory API.
  - Available permissions: `create:molds`, `read:molds`, `update:molds`, and `delete:molds`

### Configure Actions

Define secrets for MoldInventoryPostUserRegistration action.

- `DOMAIN` - Auth0 domain
- `CLIENT_ID` - Molds M2M Client ID
- `CLIENT_SECRET` - Molds M2M Client Secret

### Unit Tests

Run unit tests for Auth0 Actions.

```
pnpm test
```
