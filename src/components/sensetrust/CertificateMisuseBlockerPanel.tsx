import type { SenseTrustCertificateMisuseBlocker } from '@/types/sensetrust/pilot-certificate-verification'

export function CertificateMisuseBlockerPanel({ blockers }: { blockers: SenseTrustCertificateMisuseBlocker[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">Certificate misuse blockers</p><div className="mt-4 grid gap-3 md:grid-cols-2">{blockers.slice(0, 10).map((item) => <div key={item.blocker_id} className="rounded-md bg-slate-50 p-3"><p className="text-sm font-black text-slate-900">{item.blocked_misuse}</p><p className="mt-1 text-xs text-rose-700">Blocked action: {item.blocked_action}</p><p className="mt-1 text-xs text-slate-600">Risk avoided: {item.risk_avoided}</p><p className="mt-1 text-xs font-bold text-slate-700">{item.safe_language}</p></div>)}</div></section>
}
