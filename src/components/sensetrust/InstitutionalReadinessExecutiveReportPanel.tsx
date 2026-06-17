import type { SenseTrustInstitutionalReadinessExecutiveReport } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function InstitutionalReadinessExecutiveReportPanel({ reports }: { reports: SenseTrustInstitutionalReadinessExecutiveReport[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Institutional Readiness Executive Report</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{reports.slice(0, 4).map((report) => <article key={report.report_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{report.recommended_decision}</p><p className="text-sm text-slate-600">{report.executive_summary}</p><p className="mt-2 text-xs text-slate-500">{report.risk_summary}</p></article>)}</div></section>
}
