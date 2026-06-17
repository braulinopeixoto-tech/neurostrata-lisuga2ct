import type { SenseTrustV3StrategicRoadmap } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function V3StrategicRoadmapPanel({ roadmaps }: { roadmaps: SenseTrustV3StrategicRoadmap[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">v3 Strategic Roadmap</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{roadmaps.slice(0, 8).map((roadmap) => <div key={roadmap.roadmap_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{roadmap.roadmap_status}</p><p className="text-xs text-slate-600">{roadmap.items.length} acoes internas simuladas</p></div>)}</div></section>
}
