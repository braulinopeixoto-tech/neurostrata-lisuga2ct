import { PilotCRMDashboard } from '@/components/sensetrust/PilotCRMDashboard'
import { createPilotCRMState } from '@/services/sensetrust/pilot-crm-service'

export default function SenseTrustPilotCRM() {
  const state = createPilotCRMState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PilotCRMDashboard records={state.records} />
      </div>
    </main>
  )
}
