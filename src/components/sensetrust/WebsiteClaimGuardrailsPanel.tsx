import type { SenseTrustClaimGuardrail } from '@/types/sensetrust/website-blueprint'

interface WebsiteClaimGuardrailsPanelProps {
  guardrails: SenseTrustClaimGuardrail[]
}

export function WebsiteClaimGuardrailsPanel({ guardrails }: WebsiteClaimGuardrailsPanelProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Claim guardrails</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {guardrails.map((guardrail) => (
          <div key={guardrail.guardrail_id} className="rounded-md border border-rose-100 bg-rose-50 p-3">
            <p className="text-xs font-bold uppercase text-rose-700">{guardrail.review_owner}</p>
            <p className="mt-1 font-semibold text-rose-950">{guardrail.prohibited_claim}</p>
            <p className="mt-2 text-sm text-slate-700">{guardrail.safe_replacement}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
