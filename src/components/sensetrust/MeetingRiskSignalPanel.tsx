import type { SenseTrustMeetingRiskSignal } from '@/types/sensetrust/meeting-intelligence'

export function MeetingRiskSignalPanel({ risks }: { risks: SenseTrustMeetingRiskSignal[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Risk signals</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {risks.map((risk) => (
          <div key={risk.risk_id} className="rounded-md border border-rose-100 p-3">
            <p className="font-bold text-slate-950">{risk.source}</p>
            <p className="mt-1 text-xs font-semibold text-rose-700">{risk.risk_level}</p>
            <p className="mt-2 text-sm text-slate-600">{risk.mitigation}</p>
            <p className="mt-2 text-xs text-slate-700">Bloqueia follow-up: {risk.blocks_follow_up ? 'sim' : 'nao'} / Revisao humana: {risk.requires_human_review ? 'sim' : 'nao'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
