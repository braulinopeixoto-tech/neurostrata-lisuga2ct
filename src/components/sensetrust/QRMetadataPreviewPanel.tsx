import type { SenseTrustQRMetadataPreview } from '@/types/sensetrust/pilot-certificate-verification'

export function QRMetadataPreviewPanel({ previews }: { previews: SenseTrustQRMetadataPreview[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">QR metadata preview</p><div className="mt-4 grid gap-3 md:grid-cols-2">{previews.map((item) => <div key={item.qr_preview_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-xs font-bold text-slate-500">{item.qr_payload_simulated}</p><p className="mt-2 text-sm font-black text-slate-900">{item.qr_state}</p><p className="mt-1 text-xs text-slate-600">Allowed: {item.allowed_metadata_fields.join(', ')}</p><p className="mt-1 text-xs text-rose-700">Blocked: {item.blocked_metadata_fields.join(', ')}</p><p className="mt-2 text-xs font-bold text-emerald-700">sem exposicao clinica</p></div>)}</div></section>
}
