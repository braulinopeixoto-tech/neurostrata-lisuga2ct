import type { SenseTrustPilotBoundaryClaimsGuardrail } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotBoundaryClaimsGuardrailPanel({ guardrails }: { guardrails: SenseTrustPilotBoundaryClaimsGuardrail[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Boundary Claims Guardrail</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{guardrails.slice(0, 8).map((x) => <div key={x.boundary_claims_guardrail_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.items[0]?.prohibited_claim}</p><p className="text-xs text-slate-600">{x.items[0]?.safe_language}</p></div>)}</div></section>
}
