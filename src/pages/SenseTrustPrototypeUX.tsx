import { PrototypeDisclosureBanner } from '@/components/sensetrust/PrototypeDisclosureBanner'
import { PrototypeMockLeadForm } from '@/components/sensetrust/PrototypeMockLeadForm'
import { PrototypePublicVerificationDemo } from '@/components/sensetrust/PrototypePublicVerificationDemo'
import { PrototypeRouteMapPanel } from '@/components/sensetrust/PrototypeRouteMapPanel'
import { PrototypeUXDashboard } from '@/components/sensetrust/PrototypeUXDashboard'
import { createPrototypeUXState } from '@/services/sensetrust/prototype-ux-service'

export default function SenseTrustPrototypeUX() {
  const state = createPrototypeUXState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <PrototypeUXDashboard state={state} />
        <PrototypeRouteMapPanel routes={state.routes} />
        <PrototypePublicVerificationDemo />
        <PrototypeMockLeadForm forms={state.mock_forms} />
        <PrototypeDisclosureBanner />
      </div>
    </main>
  )
}
