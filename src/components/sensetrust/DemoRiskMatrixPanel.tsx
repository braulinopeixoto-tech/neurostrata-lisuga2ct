import type { SenseTrustDemoRisk } from '@/types/sensetrust/demo-readiness'

export function DemoRiskMatrixPanel({ risks }: { risks: SenseTrustDemoRisk[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Demo risk matrix</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {risks.map((risk) => (
          <div key={risk.risk_id} className="rounded-md border border-rose-100 bg-rose-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-rose-950">{risk.risk}</p>
              <span className="rounded bg-white px-2 py-1 text-xs font-bold text-rose-700">{risk.level}</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{risk.mitigation}</p>
            <p className="mt-2 text-xs text-rose-700">{risk.disclosure}</p>
            <p className="mt-2 text-xs font-bold text-slate-700">Bloqueia demo: {risk.blocks_demo ? 'sim' : 'nao'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
