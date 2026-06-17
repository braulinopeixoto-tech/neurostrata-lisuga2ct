import type { SenseTrustPipelineOpportunity } from '@/types/sensetrust/pipeline-governance'

export function OpportunityPrioritizationBoard({ opportunities }: { opportunities: SenseTrustPipelineOpportunity[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Opportunity prioritization</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {opportunities.map((item) => (
          <div key={item.opportunity_id} className="rounded-md border border-slate-200 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-slate-950">{item.opportunity_name}</p>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">{item.priority_level}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{item.main_interest_signal}</p>
            <p className="mt-2 text-xs text-rose-700">Objecao: {item.main_objection}</p>
            <p className="mt-2 text-xs font-semibold text-slate-700">Score {item.opportunity_priority_score.score} / risco {item.pipeline_risk_score.score} / next {item.recommended_next_move}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
