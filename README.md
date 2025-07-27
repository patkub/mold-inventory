# Mold Inventory

This is a monorepo powered by [Nx](https://nx.dev/).

## Apps

- [`auth0-tenant`](./apps/auth0-tenant/README.md): Auth0 configuration
- [`mold-inventory-app`](./apps/mold-inventory-app/README.md): Cloudflare Worker Next.js app

## Setup

Install Node.js dependencies.
```bash
# install Node.js dependencies
npm install
```

## NX

Deploy Auth0 configuration.
```bash
# deploy Auth0 configuration
npx nx deploy auth0-tenant
```






### TODO FIX BELOW


Run Locally

```bash
# These work
# create apps/mold-inventory-app/.env

# Generate prisma
nx prisma:generate mold-inventory-app

# 
nx preview mold-inventory-app
```