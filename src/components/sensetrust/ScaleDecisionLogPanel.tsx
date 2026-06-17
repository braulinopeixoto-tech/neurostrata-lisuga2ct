import type { SenseTrustScaleDecisionLog } from '@/types/sensetrust/strategic-scale-operating-model'

export function ScaleDecisionLogPanel({ logs }: { logs: SenseTrustScaleDecisionLog[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale Decision Log</h2><div className="mt-3 space-y-2">{logs.slice(0, 4).map((log) => <div key={log.decision_log_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{log.decision_log_id}</p><p className="text-xs text-slate-600">{log.decision_items.length} decisoes simuladas metadata_only</p></div>)}</div></section>
}
