import type { SenseTrustPrototypeUXState } from '@/types/sensetrust/prototype-ux'
import { PrototypeAudiencePage } from './PrototypeAudiencePage'
import { PrototypeDisclosureBanner } from './PrototypeDisclosureBanner'
import { PrototypeMockLeadForm } from './PrototypeMockLeadForm'
import { PrototypePublicVerificationDemo } from './PrototypePublicVerificationDemo'
import { PrototypeRouteMapPanel } from './PrototypeRouteMapPanel'

interface PrototypeUXDashboardProps {
  state: SenseTrustPrototypeUXState
}

export function PrototypeUXDashboard({ state }: PrototypeUXDashboardProps) {
  const blockers = ['no production deploy', 'no real lead collection', 'no real analytics', 'no clinical data', 'no real revenue', 'no real billing', 'no diagnostic truth certification']

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Prototype UX v2.0</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">ready_for_demo / simulated_only / metadata_only</p>
          </div>
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">not production</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          <Metric label="rotas" value={state.routes.length} />
          <Metric label="paginas" value={state.pages.length} />
          <Metric label="fluxos" value={state.audience_flows.length} />
          <Metric label="ctas" value={state.ctas.length} />
          <Metric label="forms" value={state.mock_forms.length} />
          <Metric label="demos" value={state.demo_scenarios.length} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {blockers.map((blocker) => (
            <span key={blocker} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{blocker}</span>
          ))}
        </div>
      </section>
      <PrototypeDisclosureBanner />
      <PrototypeRouteMapPanel routes={state.routes} />
      <PrototypeAudiencePage flows={state.audience_flows} />
      <PrototypePublicVerificationDemo />
      <PrototypeMockLeadForm forms={state.mock_forms} />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-xl font-black text-slate-950">{value}</p>
    </div>
  )
}
