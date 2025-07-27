/**
 * JWT middleware for hono
 */

import { createMiddleware } from "hono/factory";
import { jwk } from 'hono/jwk'

// Require authentication
const setupJWT = createMiddleware(async (c, next) => {
  const middleware = jwk({
    jwks_uri: (c) =>
      `https://${c.env.NEXT_PUBLIC_AUTH0_DOMAIN}/.well-known/jwks.json`,
  })
  return middleware(c, next)
});

export {
  setupJWT
}
