import { RevenueOperationsDashboard } from '@/components/sensetrust/RevenueOperationsDashboard'
import { createRevenueOpsState } from '@/services/sensetrust/revenue-operations-service'

export default function SenseTrustRevenueOperations() {
  const state = createRevenueOpsState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <RevenueOperationsDashboard state={state} />
      </div>
    </main>
  )
}
