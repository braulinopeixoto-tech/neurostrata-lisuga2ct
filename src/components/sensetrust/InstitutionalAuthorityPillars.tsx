import type { SenseTrustAuthorityPillar } from '@/types/sensetrust/public-narrative'

interface InstitutionalAuthorityPillarsProps {
  pillars: SenseTrustAuthorityPillar[]
}

export function InstitutionalAuthorityPillars({ pillars }: InstitutionalAuthorityPillarsProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Institutional authority pillars</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.pillar_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="font-bold text-slate-900">{pillar.title}</p>
            <p className="mt-2 text-slate-700">{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
