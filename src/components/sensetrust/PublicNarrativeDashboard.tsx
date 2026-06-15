import type { SenseTrustPublicNarrativeState } from '@/types/sensetrust/public-narrative'
import { AudienceMessagingMatrix } from './AudienceMessagingMatrix'
import { ClaimsGovernancePanel } from './ClaimsGovernancePanel'
import { InstitutionalAuthorityPillars } from './InstitutionalAuthorityPillars'
import { ManifestoPanel } from './ManifestoPanel'
import { PublicFAQPanel } from './PublicFAQPanel'
import { PublicRiskDisclosurePanel } from './PublicRiskDisclosurePanel'
import { WebsiteCopyPanel } from './WebsiteCopyPanel'

interface PublicNarrativeDashboardProps {
  state: SenseTrustPublicNarrativeState
}

export function PublicNarrativeDashboard({ state }: PublicNarrativeDashboardProps) {
  const channels = new Set(state.website_copy.map((block) => block.channel))
  const audiences = new Set(state.audience_messages.map((message) => message.audience))

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Public Narrative</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">metadata_only / no clinical data / no real revenue</p>
          </div>
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">no diagnostic truth certification</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          <Metric label="canais" value={channels.size} />
          <Metric label="audiencias" value={audiences.size} />
          <Metric label="permitidos" value={state.permitted_claims.length} />
          <Metric label="proibidos" value={state.prohibited_claims.length} />
          <Metric label="disclosures" value={state.risk_disclosures.length} />
        </div>
      </section>
      <ManifestoPanel manifesto={state.manifesto} />
      <WebsiteCopyPanel blocks={state.website_copy} />
      <ClaimsGovernancePanel permitted={state.permitted_claims} prohibited={state.prohibited_claims} safeLanguage={state.safe_language} />
      <AudienceMessagingMatrix messages={state.audience_messages} />
      <PublicFAQPanel items={state.public_faq} />
      <InstitutionalAuthorityPillars pillars={state.authority_pillars} />
      <PublicRiskDisclosurePanel disclosures={state.risk_disclosures} />
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
