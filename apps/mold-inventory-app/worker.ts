// worker.ts
import openNextWorker from './.open-next/worker.js'; // Adjust path as needed

import { verify } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

// Initialize JWKS client with the URL to fetch keys
const domain = "dev-5gm1mr1z8nbmuhv7.us.auth0.com";
const client = jwksClient({ jwksUri: `https://${domain}/.well-known/jwks.json` })

// Function to retrieve the signing key from the JWKS endpoint
const getKey = (
  header: any, callback: any,
) => {
  return client.getSigningKey(
    header.kid,
    (
      err: any, key: any,
    ) => {
      if (err) {
        callback(err)
      } else {
        const signingKey = key.publicKey || key.rsaPublicKey
        callback(
          null,
          signingKey,
        )
      }
    },
  )
}

// Function to verify the JWT token
const verifyJwtToken = (token: string) => {
  return new Promise((
    resolve, reject,
  ) => {
    verify(
      token,
      getKey,
      {},
      (
        err: any, decoded: any,
      ) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      },
    )
  })
}

// Function to verify the access token from request headers
const verifyAccessToken = async (headers: any) => {
  const authHeader = headers.get('authorization')
  const accessToken = authHeader?.split(' ')[1]

  if (!accessToken) return false

  const tokenBody = await verifyJwtToken(accessToken)

  if (!tokenBody) return false

  return true
}

// Returns true if authorized, false otherwise
function isAuthorized(request: any) {
  // Custom Auth logic
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    // Unauthorized
    return false;
  }
  try {

    const accessTokenIsValid = verifyAccessToken(request.headers)

    if (!accessTokenIsValid) {
      // Unauthorized
      return false;
    }

    // Authorized
    return true;

  } catch (error) {
    console.error(error);
    // Unauthorized
    return false;
  }
}

export default {
  async fetch(request: any, env: any, ctx: any) {
    // Add custom logic before or after the Next.js handler
    console.log("Custom worker logic before fetch");

    const { pathname } = new URL(request.url);

    if (pathname === "/api/molds") {

      // Custom Auth logic
      if (!isAuthorized(request)) {
        return new Response('Unauthorized', { status: 401 });
      }

      // If you did not use `DB` as your binding name, change it here
      const { results } = await env.MOLD_DB.prepare(
        "SELECT * FROM molds",
      )
        .all();
      return Response.json(results);
    }

    // Next.js handler
    const response = await openNextWorker.fetch(request, env, ctx);

    console.log("Custom worker logic after fetch");
    return response;
  },
  // Add other handlers like scheduled, or Durable Objects here
};
