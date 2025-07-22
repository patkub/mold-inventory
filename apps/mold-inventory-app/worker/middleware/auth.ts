/**
 * JWT token helpers
 */

import { verify } from 'jsonwebtoken'

const setupAuth = (client: any) => {

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
