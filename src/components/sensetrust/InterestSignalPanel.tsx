import type { SenseTrustMeetingInterestSignal } from '@/types/sensetrust/meeting-intelligence'

export function InterestSignalPanel({ signals }: { signals: SenseTrustMeetingInterestSignal[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Interest signals</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {signals.slice(0, 12).map((signal) => (
          <div key={signal.signal_id} className="rounded-md bg-emerald-50 p-3">
            <p className="text-xs font-bold uppercase text-emerald-700">{signal.audience_type} / {signal.interest_level}</p>
            <p className="mt-2 text-sm font-semibold text-slate-950">{signal.signal}</p>
            <p className="mt-2 text-xs text-slate-600">{signal.simulated_evidence}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
