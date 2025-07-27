import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Auth0Provider } from "@/components/auth0-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mold Inventory Management",
  description: "Track and manage your mold inventory efficiently",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-dvh" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-dvh flex-col bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Auth0Provider>{children}</Auth0Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
