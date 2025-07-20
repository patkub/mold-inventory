import { LoginRequired } from "@/components/login-required"
import { MoldDashboard } from "@/components/mold-dashboard"
import { MoldProviderDB } from "@/components/mold-providers/mold-provider-db"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <LoginRequired>
        <MoldProviderDB>
          <MoldDashboard />
        </MoldProviderDB>
      </LoginRequired>
    </main>
  )
}
