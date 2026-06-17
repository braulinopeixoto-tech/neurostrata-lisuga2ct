import type { SenseTrustPilotEvidenceManifest } from '@/types/sensetrust/pilot-evidence-vault'

export function EvidenceManifestPanel({ manifests }: { manifests: SenseTrustPilotEvidenceManifest[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">Evidence manifest</p><div className="mt-4 grid gap-3 md:grid-cols-2">{manifests.map((item) => <div key={item.manifest_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-xs font-bold text-slate-500">{item.manifest_id} / {item.version}</p><p className="mt-2 text-sm font-bold text-slate-900">{item.pilot_id}</p><p className="mt-1 text-xs text-slate-600">Evidence: {item.evidence_ids.length}</p><p className="mt-1 text-xs text-slate-600">Hash: {item.manifest_logical_hash}</p><p className="mt-1 text-xs text-slate-600">Checkpoint/acceptance: {item.checkpoint_reference} / {item.acceptance_reference}</p></div>)}</div></section>
}
