import type { SenseTrustStrategicPartnershipPilotProposalExecutiveReport } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function StrategicPartnershipPilotProposalExecutiveReportPanel({ reports }: { reports: SenseTrustStrategicPartnershipPilotProposalExecutiveReport[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Strategic Partnership Pilot Proposal Executive Report</h2><div className="mt-3 grid gap-2 md:grid-cols-2">{reports.slice(0, 4).map((x) => <div key={x.report_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.recommended_decision}</p><p className="text-xs text-slate-600">{x.executive_summary}</p></div>)}</div></section>
}
