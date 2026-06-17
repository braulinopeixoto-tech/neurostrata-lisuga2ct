import type { SenseTrustPilotAcceptanceCriterion } from '@/types/sensetrust/institutional-pilot-control-room'

export function SupervisedAcceptancePanel({ criteria }: { criteria: SenseTrustPilotAcceptanceCriterion[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Supervised acceptance</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {criteria.slice(0, 12).map((item) => (
          <div key={item.criterion_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-sm font-black text-slate-900">{item.criterion_title}</p>
            <p className="mt-1 text-xs text-slate-600">{item.criterion_description}</p>
            <p className="mt-2 text-xs text-slate-600">Evidence: {item.evidence_required}</p>
            <p className="text-xs text-slate-600">Status: {item.acceptance_status}</p>
            <p className="text-xs text-slate-600">Human/legal review: {item.human_review_required ? 'yes' : 'no'} / {item.legal_review_required ? 'yes' : 'no'}</p>
            <p className="mt-1 text-xs font-bold text-rose-700">Blocking if failed: {item.blocking_if_failed ? 'yes' : 'no'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
