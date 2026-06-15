import type { SenseTrustMeetingNextStep } from '@/types/sensetrust/meeting-intelligence'

export function NextStepsGovernancePanel({ steps }: { steps: SenseTrustMeetingNextStep[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Next steps governance</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {steps.slice(0, 10).map((step) => (
          <div key={step.next_step_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">{step.type}</p>
            <p className="mt-2 font-semibold text-slate-950">{step.description}</p>
            <p className="mt-2 text-sm text-slate-600">Material: {step.authorized_material}</p>
            <p className="mt-2 text-xs text-rose-700">Bloqueios: {step.blockers.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
