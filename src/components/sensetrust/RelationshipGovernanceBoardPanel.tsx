import type { SenseTrustRelationshipGovernanceBoard } from '@/types/sensetrust/pipeline-governance'

export function RelationshipGovernanceBoardPanel({ board }: { board: SenseTrustRelationshipGovernanceBoard }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Relationship governance board</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-950">Contato</p><p className="mt-2 text-sm text-slate-600">{board.contact_policy}</p></div>
        <div className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-950">Material</p><p className="mt-2 text-sm text-slate-600">{board.material_policy}</p></div>
      </div>
      <p className="mt-4 text-sm font-semibold text-rose-700">{board.partnership_disclosure_rule}</p>
      <div className="mt-3 flex flex-wrap gap-2">{board.usage_limits.map((item) => <span key={item} className="rounded bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div>
    </section>
  )
}
