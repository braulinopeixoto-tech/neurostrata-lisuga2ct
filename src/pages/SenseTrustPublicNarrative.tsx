import { PublicNarrativeDashboard } from '@/components/sensetrust/PublicNarrativeDashboard'
import { createPublicNarrativeState } from '@/services/sensetrust/public-narrative-service'

export default function SenseTrustPublicNarrative() {
  const state = createPublicNarrativeState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PublicNarrativeDashboard state={state} />
      </div>
    </main>
  )
}
