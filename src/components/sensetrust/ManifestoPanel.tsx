import type { SenseTrustManifesto } from '@/types/sensetrust/public-narrative'

interface ManifestoPanelProps {
  manifesto: SenseTrustManifesto
}

export function ManifestoPanel({ manifesto }: ManifestoPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">{manifesto.title}</p>
      <p className="mt-2 text-sm text-slate-700">{manifesto.thesis}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-emerald-50 p-3 text-xs text-emerald-800">
          <p className="font-bold">Promessa permitida</p>
          <p className="mt-1">{manifesto.permitted_promise}</p>
        </div>
        <div className="rounded-md bg-rose-50 p-3 text-xs text-rose-800">
          <p className="font-bold">Limite publico</p>
          <p className="mt-1">{manifesto.public_limit}</p>
        </div>
      </div>
    </section>
  )
}
