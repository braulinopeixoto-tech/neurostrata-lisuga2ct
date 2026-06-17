import type { SenseTrustPilotExecutiveReport } from '@/types/sensetrust/institutional-pilot-control-room'

export function InstitutionalPilotExecutiveReportPanel({ reports }: { reports: SenseTrustPilotExecutiveReport[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Institutional pilot executive report</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {reports.slice(0, 8).map((report) => (
          <div key={report.report_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold text-slate-500">{report.pilot_id}</p>
            <p className="mt-2 text-sm font-bold text-slate-900">{report.executive_summary}</p>
            <p className="mt-1 text-xs text-slate-600">Progress: {report.progress_summary}</p>
            <p className="mt-1 text-xs text-rose-700">Risks: {report.risk_summary}</p>
            <p className="mt-1 text-xs text-slate-600">Acceptance: {report.acceptance_summary}</p>
            <p className="mt-2 text-xs font-black text-slate-800">Recommendation: {report.recommendation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
