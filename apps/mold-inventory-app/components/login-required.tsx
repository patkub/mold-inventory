"use client"

import { useAuth0 } from "@auth0/auth0-react"
import { LoginPage } from "@/components/login-page"
import { LoadingScreen } from "@/components/loading-screen"
import type { ReactNode } from "react"

interface LoginRequiredProps {
  children: ReactNode
}

export function LoginRequired({ children }: LoginRequiredProps) {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <>{children}</>
}
