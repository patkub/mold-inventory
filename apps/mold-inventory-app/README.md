# Mold Inventory App

[https://mold-inventory-app.epicpatka.workers.dev/](https://mold-inventory-app.epicpatka.workers.dev/)

Tech Stack
- [Auth0](https://auth0.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)

## Setup

Copy `.env.example` to `.env`. Fill out Auth0 details.
```
NEXT_PUBLIC_AUTH0_DOMAIN=
NEXT_PUBLIC_AUTH0_CLIENT_ID=
```

Run locally.
```bash
npm install
npm run dev
```

## Deploy to Cloudflare
```bash
npm run deploy
```

### Cloudflare commands
- `npm run db:create` - create mold-inventory-app database in Cloudflare
- `npm run db:migrate` - setup mold-inventory-app database in Cloudflare
- `npm run db:migrate:local` - setup mold-inventory-app database locally
- `npm run db:seed` - seed initial mold-inventory-app data in Cloudflare
- `npm run db:seed:local` - seed initial mold-inventory-app data locally
- `npm run prisma:generate` - regenerate prisma database schema


# Next.js README

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
