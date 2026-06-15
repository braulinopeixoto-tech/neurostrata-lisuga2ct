import { InvestorRoomDashboard } from '@/components/sensetrust/InvestorRoomDashboard'
import { createInvestorRoomState } from '@/services/sensetrust/investor-room-service'

export default function SenseTrustInvestorRoom() {
  const state = createInvestorRoomState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <InvestorRoomDashboard state={state} />
      </div>
    </main>
  )
}
