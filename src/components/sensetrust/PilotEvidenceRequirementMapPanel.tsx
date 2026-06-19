import type { SenseTrustPilotEvidenceRequirementMap } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotEvidenceRequirementMapPanel({ maps }: { maps: SenseTrustPilotEvidenceRequirementMap[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Evidence Requirement Map</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{maps.slice(0, 8).map((x) => <div key={x.evidence_requirement_map_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.evidence_requirement_map_id}</p><p className="text-xs text-slate-600">{x.items.length} simulated evidence requirements</p></div>)}</div></section>
}
