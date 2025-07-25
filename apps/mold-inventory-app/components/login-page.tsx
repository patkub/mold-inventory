"use client"

import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@/components/ui/button"
import { Package2, LogIn } from "lucide-react"

export function LoginPage() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Package2 className="h-12 w-12 text-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Mold Inventory Management</h1>
          <p className="mt-2 text-foreground">Track and manage your mold inventory efficiently</p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="text-center text-sm text-foreground">
            <p>Please sign in to access your mold inventory</p>
          </div>

          <Button className="w-full" onClick={() => loginWithRedirect()}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Secure authentication powered by Auth0</p>
        </div>
      </div>
    </div>
  )
}
