# Mold Inventory - Auth0 Tenant

## Explanation

This subproject is responsible for the Auth0 tenant configuration

## Setup

Install Node.js dependencies.
```bash
# install Node.js dependencies
pnpm install
```

### Auth0 Tenant

Copy auth0 config from `auth0-config.json.example` to `auth0-config.json` and fill out details using Machine to Machine client.

Deploy Auth0 configuration.
```bash
# deploy Auth0 configuration
pnpm run auth0-import
```

Create users in Auth0 dashboard.
- Assign permissions to users for the Mold Inventory API.
  - Available permissions: `create:molds`, `read:molds`, `update:molds`, and `delete:molds`
