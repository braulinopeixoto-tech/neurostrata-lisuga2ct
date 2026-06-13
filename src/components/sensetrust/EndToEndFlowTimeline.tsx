import type { SenseTrustPilotStep } from '@/types/sensetrust/pilot-console'

interface EndToEndFlowTimelineProps {
  steps: SenseTrustPilotStep[]
}

export function EndToEndFlowTimeline({ steps }: EndToEndFlowTimelineProps) {
  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <div key={step.step_id} className="grid gap-2 rounded-md border bg-white p-3 text-sm shadow-sm sm:grid-cols-[56px_1fr_120px]">
          <span className="font-mono text-xs font-bold text-slate-500">#{String(step.sequence).padStart(2, '0')}</span>
          <span className="font-semibold text-slate-900">{step.label}</span>
          <span className={step.status === 'passed' ? 'font-bold text-emerald-700' : 'font-bold text-amber-700'}>{step.status}</span>
        </div>
      ))}
    </div>
  )
}
