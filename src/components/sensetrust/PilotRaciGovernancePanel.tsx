import type { SenseTrustPilotRaciRole } from '@/types/sensetrust/institutional-pilot-control-room'

export function PilotRaciGovernancePanel({ roles }: { roles: SenseTrustPilotRaciRole[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">RACI governance</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {roles.slice(0, 12).map((role) => (
          <div key={role.role_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-sm font-black text-slate-900">{role.role_name}</p>
            <p className="mt-1 text-xs text-slate-600">R: {role.responsible}</p>
            <p className="text-xs text-slate-600">A: {role.accountable}</p>
            <p className="text-xs text-slate-600">C: {role.consulted.join(', ')}</p>
            <p className="text-xs text-slate-600">I: {role.informed.join(', ')}</p>
            <p className="mt-2 text-xs font-bold text-emerald-700">human review required</p>
          </div>
        ))}
      </div>
    </section>
  )
}
