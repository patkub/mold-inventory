// worker.ts

// @ts-ignore: Will be resolved by wrangler build
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

type Bindings = {
  CORS_ORIGIN: string[],
  MOLD_DB: D1Database
}

// Hono
const app = new Hono<{ Bindings: Bindings }>()

// CORS middleware
app.use('*', async (c, next) => {
  const middleware = cors({
    origin: c.env.CORS_ORIGIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
  return middleware(c, next)
})

// For Cloudflare Workers
app.use("/", async (c) => {
  // Next.js handler
  // https://github.com/honojs/hono/issues/1677
  return await openNextWorker.fetch(c.req.raw, c.env, c.executionCtx);
})

// Require authentication for /api endpoints
const checkAuth = createMiddleware(async (c, next) => {
  // Skip auth locally
  if (c.env.IS_LOCAL_MODE) {
    await next();
    return;
  }

  // Initialize JWKS client with the URL to fetch keys
  const domain = c.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const client = jwksClient({ jwksUri: `https://${domain}/.well-known/jwks.json` })
  const authProvider = setupAuth(client);
  const { isAuthorized } = authProvider;

  // Get raw request in Cloudflare Worker
  const raw = c.req.raw;

  // Check if authorized
  if (!isAuthorized(raw)) {
    c.status(401);
    return c.text("Unauthorized");
  }

  // Proceed with request
  await next();
});

// Require authentication for /api endpoints
// Middleware must be registered before any /api endpoints.
app.use("/api/*", checkAuth);
// Now register /api endpoints


// Get all molds
app.get("/api/molds", async (c) => {
  try {
    // Prisma adapter
    const adapter = new PrismaD1(c.env.MOLD_DB);
    const prisma = new PrismaClient({ adapter });

    const molds = await prisma.molds.findMany();

    // return molds as json
    return c.json({ molds })

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to fetch molds" })
  }
})


// Create new mold
app.post("/api/molds", async (c) => {
  try {
    // Prisma adapter
    const adapter = new PrismaD1(c.env.MOLD_DB);
    const prisma = new PrismaClient({ adapter });

    // request data
    const data = await c.req.json();

    // create new mold in database
    const mold = await prisma.molds.create({
      data: data
    })

    // return the new mold as json
    return c.json({ mold })

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to create new mold" })
  }
})


// Update mold
app.put("/api/molds", async (c) => {
  try {
    // Prisma adapter
    const adapter = new PrismaD1(c.env.MOLD_DB);
    const prisma = new PrismaClient({ adapter });

    // request data
    const data = await c.req.json();

    // update mold in database
    const updateMold = await prisma.molds.update({
      where: {
        number: data.number,
      },
      data: data,
    })

    // return the updated mold as json
    return c.json({ updateMold })

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to update mold" })
  }
})


// Delete mold
app.delete("/api/molds", async (c) => {
  try {
    // Prisma adapter
    const adapter = new PrismaD1(c.env.MOLD_DB);
    const prisma = new PrismaClient({ adapter });

    // request data
    const data = await c.req.json();

    // delete mold from database
    const deleteMold = await prisma.molds.delete({
      where: {
        number: data.number,
      },
    })

    // return the new mold as json
    return c.json({ message: "Mold has been deleted" })

  } catch (error) {
    throw new HTTPException(500, { message: "Failed to create new mold" })
  }
})


export default app
