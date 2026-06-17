import type { SenseTrustCertificateClaimGuardrail } from '@/types/sensetrust/pilot-certificate-verification'

export function CertificateClaimGuardrailsPanel({ guardrails }: { guardrails: SenseTrustCertificateClaimGuardrail[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">Certificate claim guardrails</p><div className="mt-4 grid gap-3 md:grid-cols-3">{guardrails.slice(0, 12).map((item) => <div key={item.guardrail_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-xs font-bold uppercase text-rose-700">{item.risk_level}</p><p className="mt-2 text-sm font-black text-slate-900">{item.claim_type}</p><p className="mt-1 text-xs text-slate-600">Allowed: {item.allowed_claims.join(', ')}</p><p className="mt-1 text-xs text-rose-700">Prohibited: {item.prohibited_claims.join(', ')}</p><p className="mt-1 text-xs text-slate-600">{item.recommended_language}</p></div>)}</div></section>
}
