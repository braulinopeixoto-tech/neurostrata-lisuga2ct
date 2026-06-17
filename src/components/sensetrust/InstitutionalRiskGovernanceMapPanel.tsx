import type { SenseTrustInstitutionalRiskGovernanceMap } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function InstitutionalRiskGovernanceMapPanel({ maps }: { maps: SenseTrustInstitutionalRiskGovernanceMap[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Institutional Risk Governance Map</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{maps.slice(0, 8).map((map) => <div key={map.map_id} className="rounded-md bg-slate-50 p-3"><p className="font-black text-slate-900">{map.risk_level}</p><p className="text-xs text-slate-600">{map.mitigations.join(' / ')}</p></div>)}</div></section>
}
