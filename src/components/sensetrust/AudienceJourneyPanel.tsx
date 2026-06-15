import type { SenseTrustAudienceJourney } from '@/types/sensetrust/website-blueprint'

interface AudienceJourneyPanelProps {
  journeys: SenseTrustAudienceJourney[]
}

export function AudienceJourneyPanel({ journeys }: AudienceJourneyPanelProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Audience journeys</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {journeys.map((journey) => (
          <div key={journey.journey_id} className="rounded-md border border-slate-200 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-950">{journey.audience}</p>
              <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">{journey.entry_page}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{journey.intent}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {journey.recommended_path.map((path) => (
                <span key={path} className="rounded-md bg-slate-50 px-2 py-1 font-mono text-xs font-semibold text-slate-700">{path}</span>
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-rose-700">{journey.risk_disclosure}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
