/**
 * JWT middleware for hono
 */

import { createMiddleware } from 'hono/factory'
import { jwk } from 'hono/jwk'

// Require authentication
const setupJWT = createMiddleware(async (c, next) => {
  const middleware = jwk({
    jwks_uri: (c) => `https://${c.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    alg: ['RS256'],
    verification: {
      iss: `https://${c.env.AUTH0_DOMAIN}/`,
      aud: 'https://mold-inventory-api-production.epicpatka.workers.dev/api'
    }
  })
  return middleware(c, next)
})

export { setupJWT }
