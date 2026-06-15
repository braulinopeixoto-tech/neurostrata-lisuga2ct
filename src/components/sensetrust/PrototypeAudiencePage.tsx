import type { SenseTrustPrototypeAudienceFlow } from '@/types/sensetrust/prototype-ux'

interface PrototypeAudiencePageProps {
  flows: SenseTrustPrototypeAudienceFlow[]
}

export function PrototypeAudiencePage({ flows }: PrototypeAudiencePageProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Navegacao por audiencia</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {flows.map((flow) => (
          <div key={flow.flow_id} className="rounded-md border border-slate-200 p-3">
            <p className="font-bold text-slate-950">{flow.audience}</p>
            <p className="mt-1 text-sm text-slate-600">{flow.intent}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {flow.route_sequence.map((route) => (
                <span key={route} className="rounded bg-slate-50 px-2 py-1 font-mono text-xs font-semibold text-slate-700">{route}</span>
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-rose-700">{flow.blocker}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
