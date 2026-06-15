import type { SenseTrustAuthorizedMaterial, SenseTrustProhibitedMaterial } from '@/types/sensetrust/partner-demo-kit'

export function AuthorizedMaterialsPanel({ authorized, prohibited }: { authorized: SenseTrustAuthorizedMaterial[]; prohibited: SenseTrustProhibitedMaterial[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Authorized materials</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {authorized.slice(0, 8).map((material) => (
          <div key={material.material_id} className="rounded-md border border-emerald-100 bg-emerald-50 p-3">
            <p className="font-bold text-emerald-950">{material.title}</p>
            <p className="mt-1 text-xs font-semibold text-emerald-700">{material.status} / {material.audience}</p>
            <p className="mt-2 text-sm text-slate-700">{material.allowed_use}</p>
            <p className="mt-2 text-xs text-rose-700">Proibido: {material.prohibited_use}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-rose-700">Materiais bloqueados: {prohibited.map((item) => item.title).join(', ')}</p>
    </section>
  )
}
