import type { SenseTrustHumanReviewEscalationPath } from '@/types/sensetrust/strategic-scale-operating-model'

export function HumanReviewEscalationPathPanel({ paths }: { paths: SenseTrustHumanReviewEscalationPath[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Human Review Escalation Path</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{paths.slice(0, 8).map((path) => <div key={path.escalation_path_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-lg font-black text-slate-950">{path.escalation_items.length}</p><p className="text-xs text-slate-600">gatilhos de revisao humana simulada</p></div>)}</div></section>
}
