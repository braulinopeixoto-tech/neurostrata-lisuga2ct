import type { SenseTrustPilotInterruptionRule } from '@/types/sensetrust/institutional-pilot-control-room'

export function PilotInterruptionGovernancePanel({ rules }: { rules: SenseTrustPilotInterruptionRule[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Interruption governance</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {rules.slice(0, 10).map((rule) => (
          <div key={rule.rule_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-sm font-black text-slate-900">{rule.trigger}</p>
            <p className="mt-1 text-xs text-slate-600">Pause: {rule.pause_condition}</p>
            <p className="mt-1 text-xs text-rose-700">Block: {rule.block_condition}</p>
            <p className="mt-2 text-xs text-slate-600">Human/legal review: {rule.human_review_required ? 'yes' : 'no'} / {rule.legal_review_required ? 'yes' : 'no'}</p>
            <p className="mt-1 text-xs font-bold text-slate-800">Decision: {rule.recommended_decision}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
