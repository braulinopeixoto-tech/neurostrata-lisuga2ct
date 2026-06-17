import type { SenseTrustStrategicScaleMisuseBlocker } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function StrategicScaleMisuseBlockerPanel({ blockers }: { blockers: SenseTrustStrategicScaleMisuseBlocker[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Strategic Scale Misuse Blockers</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{blockers.slice(0, 8).map((blocker) => <div key={blocker.blocker_id} className="rounded-md bg-rose-50 p-3"><p className="font-bold text-rose-900">{blocker.blocked_misuse}</p><p className="text-xs text-rose-700">{blocker.safe_language}</p></div>)}</div></section>
}
