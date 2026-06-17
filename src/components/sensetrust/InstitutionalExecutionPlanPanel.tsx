import type { SenseTrustInstitutionalExecutionPlan } from '@/types/sensetrust/strategic-scale-operating-model'

export function InstitutionalExecutionPlanPanel({ plans }: { plans: SenseTrustInstitutionalExecutionPlan[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Institutional Execution Plan</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{plans.slice(0, 8).map((plan) => <div key={plan.execution_plan_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-lg font-black text-slate-950">{plan.readiness_score}%</p><p className="text-xs text-slate-600">{plan.execution_items.length} itens; sem compromisso real</p></div>)}</div></section>
}
