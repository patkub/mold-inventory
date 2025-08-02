/**
 * CSRF middleware for hono
 */

import { createMiddleware } from 'hono/factory'
import { csrf } from 'hono/csrf'

// Require authentication
const setupCSRF = createMiddleware(async (c, next) => {
  const middleware = csrf({
    origin: c.env.CORS_ORIGIN,
  })
  return middleware(c, next)
})

export { setupCSRF }
