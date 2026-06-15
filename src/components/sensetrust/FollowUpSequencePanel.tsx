import type { SenseTrustFollowUpSequence } from '@/types/sensetrust/partner-demo-kit'

export function FollowUpSequencePanel({ sequences }: { sequences: SenseTrustFollowUpSequence[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Follow-up controlado</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {sequences.map((sequence) => (
          <div key={sequence.sequence_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-bold text-slate-950">{sequence.audience}</p>
            <p className="mt-2 text-sm text-slate-700">{sequence.message}</p>
            <p className="mt-2 text-xs text-slate-600">Material permitido: {sequence.allowed_materials.join(', ')}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Bloqueios: {sequence.blockers.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
