/**
 * Auth0 authentication middleware for hono
 */

import { createMiddleware } from "hono/factory";
import jwksClient from 'jwks-rsa'
import { setupAuth } from './auth'

// Require authentication
const checkAuth = createMiddleware(async (c, next) => {
  // Skip auth locally
  if (c.env.IS_LOCAL_MODE) {
    await next();
    return;
  }

  // Initialize JWKS client with the URL to fetch keys
  const config = {
    domain: c.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    jwksUri: `https://${c.env.NEXT_PUBLIC_AUTH0_DOMAIN}/.well-known/jwks.json`,
    audience: `https://${c.env.NEXT_PUBLIC_AUTH0_AUDIENCE}`,
    issuer: `https://${c.env.NEXT_PUBLIC_AUTH0_DOMAIN}`
  }

  const client = jwksClient({ jwksUri: config.jwksUri })
  const authProvider = setupAuth(client, config);
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

export {
  checkAuth
}

