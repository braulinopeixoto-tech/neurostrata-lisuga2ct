import type { SenseTrustDemoScript } from '@/types/sensetrust/demo-readiness'

export function DemoScriptPanel({ script }: { script: SenseTrustDemoScript }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">{script.title}</p>
      <div className="mt-4 space-y-3">
        {script.steps.map((step) => (
          <div key={step.step_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-black text-emerald-700">PASSO {step.order}</p>
            <p className="mt-1 font-bold text-slate-950">{step.title}</p>
            <p className="font-mono text-xs text-slate-500">{step.route}</p>
            <p className="mt-2 text-sm text-slate-600">{step.objective}</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{step.talk_track}</p>
            <p className="mt-2 text-xs text-rose-700">Disclosure: {step.disclosure_to_reinforce}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
