import type { SenseTrustPrototypeRoute } from '@/types/sensetrust/prototype-ux'

interface PrototypeRouteMapPanelProps {
  routes: SenseTrustPrototypeRoute[]
}

export function PrototypeRouteMapPanel({ routes }: PrototypeRouteMapPanelProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Route map</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {routes.map((route) => (
          <div key={route.route_id} className="rounded-md border border-slate-200 p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-bold text-slate-950">{route.title}</p>
                <p className="font-mono text-xs text-slate-500">{route.route_path}</p>
              </div>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{route.route_status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{route.subtitle}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Disclosure obrigatorio: {route.disclosures.length > 0 ? 'sim' : 'nao'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
