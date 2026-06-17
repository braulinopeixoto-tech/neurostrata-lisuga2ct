import type { SenseTrustPipelineStageGate } from '@/types/sensetrust/pipeline-governance'

export function PipelineStageGatePanel({ gates }: { gates: SenseTrustPipelineStageGate[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Pipeline stage gates</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {gates.map((gate) => (
          <div key={gate.gate_id} className="rounded-md border border-slate-200 p-3">
            <p className="font-bold text-slate-950">{gate.stage_type}</p>
            <p className="mt-2 text-xs text-emerald-700">Entrada: {gate.entry_criteria.join(', ')}</p>
            <p className="mt-2 text-xs text-slate-600">Saida: {gate.exit_criteria.join(', ')}</p>
            <p className="mt-2 text-xs text-rose-700">Bloqueios: {gate.blockers.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
