import { PilotFeedbackIntelligenceDashboard } from '@/components/sensetrust/PilotFeedbackIntelligenceDashboard'
import { createPilotFeedbackIntelligenceState } from '@/services/sensetrust/pilot-feedback-intelligence-service'

export default function SenseTrustPilotFeedbackIntelligence() {
  const state = createPilotFeedbackIntelligenceState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PilotFeedbackIntelligenceDashboard state={state} />
      </div>
    </main>
  )
}
