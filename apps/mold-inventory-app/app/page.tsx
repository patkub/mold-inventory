import { LoginRequired } from "@/components/login-required"
import { MoldDashboard } from "@/components/mold-dashboard"
import { MoldProvider } from "@/components/mold-provider"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <LoginRequired>
        <MoldProvider>
          <MoldDashboard />
        </MoldProvider>
      </LoginRequired>
    </main>
  )
}
