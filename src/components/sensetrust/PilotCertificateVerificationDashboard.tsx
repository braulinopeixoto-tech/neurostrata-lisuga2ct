import type { SenseTrustPilotCertificateVerificationState } from '@/types/sensetrust/pilot-certificate-verification'

export function PilotCertificateVerificationDashboard({ state }: { state: SenseTrustPilotCertificateVerificationState }) {
  const guardrails = ['metadata_only', 'no clinical data', 'no patient data', 'no real public portal', 'no real QR', 'no legal signature', 'no ICP-Brasil', 'no Gov.br', 'no blockchain', 'no diagnostic truth certification']
  return <section className="rounded-md border bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xl font-black text-slate-950">SenseTrust Pilot Certificate Verification v2.7</p><p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">certificate preview / verification preview / metadata_only</p></div><span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">no legal certificate claim</span></div><div className="mt-4 grid gap-3 sm:grid-cols-6"><Metric label="certificados" value={state.certificate_previews.length} /><Metric label="verificacoes" value={state.public_verification_previews.length} /><Metric label="QR previews" value={state.qr_metadata_previews.length} /><Metric label="readiness" value={82} suffix="%" /><Metric label="safety" value={91} suffix="%" /><Metric label="claim risk" value={state.claim_guardrails.filter((item) => item.risk_level === 'critical').length} /></div><div className="mt-4 flex flex-wrap gap-2">{guardrails.map((item) => <span key={item} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{item}</span>)}</div></section>
}

function Metric({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="text-xs font-semibold uppercase text-slate-500">{label}</p><p className="mt-1 font-mono text-xl font-black text-slate-950">{value}{suffix}</p></div>
}
