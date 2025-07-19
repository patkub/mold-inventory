// worker.ts
import openNextWorker from './.open-next/worker.js'; // Adjust path as needed

import jwksClient from 'jwks-rsa'

import { PrismaClient } from './.generated/prisma/';
import { PrismaD1 } from '@prisma/adapter-d1';
import { D1Database } from '@cloudflare/workers-types';

import { setupAuth } from './worker/auth'

export interface Env {
  MOLD_DB: D1Database;
}

// Initialize JWKS client with the URL to fetch keys
const domain = "dev-5gm1mr1z8nbmuhv7.us.auth0.com";
const client = jwksClient({ jwksUri: `https://${domain}/.well-known/jwks.json` })
const authProvider = setupAuth(client);
const { isAuthorized } = authProvider;

export default {
  async fetch(request: any, env: Env, ctx: any) {
    // Add custom logic before or after the Next.js handler
    console.log("Custom worker logic before fetch");

    const { pathname } = new URL(request.url);

    if (pathname === "/api/molds") {

      // Custom Auth logic
      if (!isAuthorized(request)) {
        return new Response('Unauthorized', { status: 401 });
      }

      // Prisma adapter
      const adapter = new PrismaD1(env.MOLD_DB);
      const prisma = new PrismaClient({ adapter });

      const molds = await prisma.mold.findMany();
      const result = JSON.stringify(molds);
      return new Response(result);
    }

    // Next.js handler
    const response = await openNextWorker.fetch(request, env, ctx);

    console.log("Custom worker logic after fetch");
    return response;
  },
  // Add other handlers like scheduled, or Durable Objects here
};
