import type { SenseTrustVisualQACheck } from '@/types/sensetrust/demo-readiness'

export function VisualQAChecklistPanel({ checks }: { checks: SenseTrustVisualQACheck[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Visual QA checklist</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {checks.slice(0, 12).map((check) => (
          <div key={check.check_id} className="rounded-md border border-slate-200 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-950">{check.title}</p>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{check.status} / {check.severity}</span>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500">{check.route}</p>
            <p className="mt-2 text-sm text-slate-600">{check.finding}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-700">{check.recommendation}</p>
            <p className="mt-2 text-xs font-bold text-rose-700">Bloqueia demo: {check.blocks_demo ? 'sim' : 'nao'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
