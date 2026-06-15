import type { SenseTrustInvestorRoomState } from '@/types/sensetrust/investor-room'
import { DataRoomChecklistPanel } from './DataRoomChecklistPanel'
import { DueDiligenceChecklistPanel } from './DueDiligenceChecklistPanel'
import { InvestorFAQPanel } from './InvestorFAQPanel'
import { InvestorRiskDisclosurePanel } from './InvestorRiskDisclosurePanel'
import { PitchDeckOutlinePanel } from './PitchDeckOutlinePanel'
import { StrategicPartnerMapPanel } from './StrategicPartnerMapPanel'
import { UseOfFundsPanel } from './UseOfFundsPanel'

interface InvestorRoomDashboardProps {
  state: SenseTrustInvestorRoomState
}

export function InvestorRoomDashboard({ state }: InvestorRoomDashboardProps) {
  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Investor & Partnership Room</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">metadata_only / simulated_only / controlled disclosure</p>
          </div>
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">no real revenue claims</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          <Metric label="data room" value={state.data_room_items.length} />
          <Metric label="pitch" value={state.pitch_deck_sections.length} />
          <Metric label="partners" value={state.strategic_partners.length} />
          <Metric label="FAQ" value={state.investor_faq.length} />
          <Metric label="DD" value={state.due_diligence_items.length} />
        </div>
      </section>
      <DataRoomChecklistPanel items={state.data_room_items} />
      <PitchDeckOutlinePanel sections={state.pitch_deck_sections} />
      <StrategicPartnerMapPanel partners={state.strategic_partners} />
      <DueDiligenceChecklistPanel items={state.due_diligence_items} />
      <UseOfFundsPanel items={state.use_of_funds} />
      <InvestorRiskDisclosurePanel risks={state.risk_disclosures} />
      <InvestorFAQPanel items={state.investor_faq} />
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
