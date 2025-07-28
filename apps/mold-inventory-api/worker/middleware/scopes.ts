/**
 * JWT middleware for hono
 */

import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception"

/**
 * Ensure JWT "scope" claim includes all permissions
 * @param c 
 * @param {string[]} scopes all scopes to check for
 */
function checkJWTScopes(c: any, scopes: string[]) {
  const jwtPayload = c.get('jwtPayload')
  if (!jwtPayload || !jwtPayload.scope) {
    throw new HTTPException(403, { message: "Permission denied" })
  }

  // ensure "scope" claim includes all "scopes"
  const jwtScopes = jwtPayload.scope.split(' ');
  const includesAllScopes = scopes.every(el => jwtScopes.includes(el))
  if (!includesAllScopes) {
    throw new HTTPException(403, { message: "Permission denied" })
  }
}

/**
 * Ensure JWT "scope" claim includes all permissions
 * @param {string[]} scopes list of JWT "scope" claims to check for
 * @throws {HTTPException} if any scope claims are missing
 */
const createScopesMiddleware = (scopes: string[]) => createMiddleware(async (c, next) => {
  checkJWTScopes(c, scopes)
  return next();
});

export {
  checkJWTScopes,
  createScopesMiddleware
}
