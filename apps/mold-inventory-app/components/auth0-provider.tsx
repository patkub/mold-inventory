"use client"

import { Auth0Provider as Auth0ProviderBase } from "@auth0/auth0-react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

export function Auth0Provider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || ""
  const scopes = process.env.NEXT_PUBLIC_AUTH0_SCOPES || ""
  const redirectUri = typeof window !== "undefined" ? window.location.origin : ""

  if (!domain || !clientId || !audience) {
    return <>{children}</>
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0ProviderBase
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: scopes
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0ProviderBase>
  )
}
