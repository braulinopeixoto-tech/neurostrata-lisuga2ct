import type { SenseTrustWebsiteBlueprintState } from '@/types/sensetrust/website-blueprint'
import { AudienceJourneyPanel } from './AudienceJourneyPanel'
import { LandingExperiencePanel } from './LandingExperiencePanel'
import { WebsiteClaimGuardrailsPanel } from './WebsiteClaimGuardrailsPanel'
import { WebsiteCTAMatrix } from './WebsiteCTAMatrix'
import { WebsitePublicationChecklistPanel } from './WebsitePublicationChecklistPanel'
import { WebsiteRiskDisclosurePanel } from './WebsiteRiskDisclosurePanel'
import { WebsiteSitemapPanel } from './WebsiteSitemapPanel'

interface WebsiteBlueprintDashboardProps {
  state: SenseTrustWebsiteBlueprintState
}

export function WebsiteBlueprintDashboard({ state }: WebsiteBlueprintDashboardProps) {
  const homePage = state.pages.find((page) => page.page_type === 'home')

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Website Blueprint v1.9</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">metadata_only / blueprint_only / no production deploy</p>
          </div>
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">no real lead collection</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          <Metric label="paginas" value={state.pages.length} />
          <Metric label="secoes" value={state.sections.length} />
          <Metric label="ctas" value={state.ctas.length} />
          <Metric label="jornadas" value={state.audience_journeys.length} />
          <Metric label="forms" value={state.form_blueprints.length} />
          <Metric label="analytics" value={state.analytics_blueprints.length} />
        </div>
      </section>
      <WebsiteSitemapPanel pages={state.pages} navigation={state.navigation} />
      <LandingExperiencePanel page={homePage} />
      <AudienceJourneyPanel journeys={state.audience_journeys} />
      <WebsiteCTAMatrix ctas={state.ctas} />
      <WebsiteClaimGuardrailsPanel guardrails={state.claim_guardrails} />
      <WebsitePublicationChecklistPanel items={state.publication_checklist} />
      <WebsiteRiskDisclosurePanel disclosures={state.risk_disclosures} />
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
