import type { SenseTrustRevenueOpsReport } from '@/types/sensetrust/revenue-operations'

interface RevenueOpsExecutiveSummaryProps {
  report: SenseTrustRevenueOpsReport
  nextAction: string
}

export function RevenueOpsExecutiveSummary({ report, nextAction }: RevenueOpsExecutiveSummaryProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">Revenue Ops executive summary</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">{report.recommended_decision}</p>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm font-black text-slate-900">{report.readiness_score}/100</span>
      </div>
      <p className="mt-3 text-sm text-slate-700">{nextAction}</p>
      <div className="mt-4 rounded-md bg-rose-50 p-3 text-xs text-rose-800">
        {report.blockers.map((blocker) => <p key={blocker}>{blocker}</p>)}
      </div>
    </section>
  )
}
