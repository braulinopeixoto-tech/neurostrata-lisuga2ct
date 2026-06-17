import type { SenseTrustPilotScope } from '@/types/sensetrust/institutional-pilot-control-room'

export function PilotScopePanel({ scopes }: { scopes: SenseTrustPilotScope[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Pilot scope</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {scopes.slice(0, 8).map((scope) => (
          <div key={scope.scope_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold text-slate-500">{scope.pilot_id}</p>
            <p className="mt-2 text-sm font-bold text-slate-900">{scope.objective}</p>
            <p className="mt-2 text-xs text-slate-600">In scope: {scope.in_scope.join(', ')}</p>
            <p className="mt-1 text-xs text-rose-700">Out of scope: {scope.out_of_scope.join(', ')}</p>
            <p className="mt-2 text-xs font-bold text-slate-700">Decision Board: {scope.exit_decision}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
