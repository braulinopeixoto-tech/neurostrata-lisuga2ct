import type { SenseTrustDemoAudienceBriefing } from '@/types/sensetrust/partner-demo-kit'

export function AudienceBriefingPanel({ briefings }: { briefings: SenseTrustDemoAudienceBriefing[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Audience briefings</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {briefings.map((briefing) => (
          <div key={briefing.briefing_id} className="rounded-md border border-slate-200 p-3">
            <p className="font-bold text-slate-950">{briefing.audience_name}</p>
            <p className="mt-1 text-sm text-slate-600">{briefing.main_pain}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700">{briefing.safe_promise}</p>
            <p className="mt-2 text-xs text-slate-600">Material: {briefing.recommended_materials.join(', ')}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Proibido: {briefing.prohibited_language}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
