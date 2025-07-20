// worker.ts
import openNextWorker from './.open-next/worker.js'; // Adjust path as needed

import { Hono } from "hono"
import { createMiddleware } from "hono/factory";
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"

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

type Bindings = {
  MOLD_DB: D1Database
  AUTH0_DOMAIN: string
  AUTH0_AUDIENCE: string
}

type Variables = {
  user: any
}

// Hono
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// CORS middleware
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://mold-inventory-app.epicpatka.workers.dev"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
)

// For Cloudflare Workers
app.use("/", async (c) => {
  // Next.js handler
  // https://github.com/honojs/hono/issues/1677
  const response = await openNextWorker.fetch(c.req.raw, c.env, c.executionCtx);

  console.log("Custom worker logic after fetch");
  return response;
})

// Require authentication for /api endpoints
const checkAuth = createMiddleware(async (c, next) => {
  // Get raw request in Cloudflare Worker
  const raw = c.req.raw;

  // Custom Auth logic
  if (!isAuthorized(raw)) {
    c.status(401);
    return c.text("Unauthorized");
  }

  // Proceed with request
  await next();
});

// First, register the middleware
app.use("/api/*", checkAuth);


// Get all molds
app.get("/api/molds", async (c) => {
  try {
    // Prisma adapter
    const adapter = new PrismaD1(c.env.MOLD_DB);
    const prisma = new PrismaClient({ adapter });

    const molds = await prisma.mold.findMany();

    // return molds as json
    return c.json({ molds })

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to fetch molds" })
  }
})

export default app
