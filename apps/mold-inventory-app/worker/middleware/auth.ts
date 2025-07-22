/**
 * JWT token helpers
 */

import { verify, VerifyOptions } from 'jsonwebtoken'

type AuthConfig = {
  domain: string,
  jwksUri: string,
  audience: string,
  issuer: string
}

const setupAuth = (client: any, config: AuthConfig) => {

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
  const verifyJwtToken = (token: string, options: VerifyOptions) => {
    return new Promise((
      resolve, reject,
    ) => {
      verify(
        token,
        getKey,
        options,
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

    const tokenBody = await verifyJwtToken(accessToken, {
      audience: config.audience,
      issuer: config.issuer
    })

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

  return {
    getKey,
    verifyAccessToken,
    verifyJwtToken,
    isAuthorized
  }
}

export {
  setupAuth
}
