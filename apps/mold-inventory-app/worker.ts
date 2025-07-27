// worker.ts

// @ts-ignore: Will be resolved by wrangler build
import openNextWorker from './.open-next/worker.js'; // Adjust path as needed
import { D1Database } from '@cloudflare/workers-types';

// Hono
import { Hono } from "hono";
// CORS
import { setupCORS } from './worker/middleware/cors';
// JWT Auth
import { setupJWT } from './worker/middleware/jwt';
import { createScopesMiddleware } from './worker/middleware/scopes';
import { moldsRoute } from './worker/routes/moldsRoute';

type Bindings = {
  CORS_ORIGIN: string[],
  MOLD_DB: D1Database
}

// Hono
const app = new Hono<{ Bindings: Bindings }>()

// Setup CORS
app.use('*', setupCORS)

// For Cloudflare Workers
app.use("/", async (c) => {
  // Next.js handler
  // https://github.com/honojs/hono/issues/1677
  return await openNextWorker.fetch(c.req.raw, c.env, c.executionCtx);
})

// Middleware must be registered before any /api endpoints
// Require JWT authentication for all /api endpoints
app.use('/api/*', setupJWT)
// Validate JWT scope claim for CRUD routes
app.get('/api/molds/*', createScopesMiddleware(["read:molds"]))
app.post('/api/molds/*', createScopesMiddleware(["create:molds"]))
app.put('/api/molds/*', createScopesMiddleware(["update:molds"]))
app.delete('/api/molds/*', createScopesMiddleware(["delete:molds"]))
// Now register /api endpoints

// Handle /api/molds endpoint
app.route('/api', moldsRoute)


export default app
