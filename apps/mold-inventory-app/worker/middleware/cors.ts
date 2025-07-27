/**
 * CORS middleware for hono
 */

import { createMiddleware } from "hono/factory";
import { cors } from "hono/cors"

// Require authentication
const setupCORS = createMiddleware(async (c, next) => {
  const middleware = cors({
    origin: c.env.CORS_ORIGIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
  return middleware(c, next)
});

export {
  setupCORS
}
