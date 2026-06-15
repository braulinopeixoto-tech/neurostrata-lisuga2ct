import type { SenseTrustPublicRiskDisclosure } from '@/types/sensetrust/public-narrative'

interface PublicRiskDisclosurePanelProps {
  disclosures: SenseTrustPublicRiskDisclosure[]
}

export function PublicRiskDisclosurePanel({ disclosures }: PublicRiskDisclosurePanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Public risk disclosure</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {disclosures.map((disclosure) => (
          <div key={disclosure.disclosure_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="font-mono font-bold text-slate-900">{disclosure.category}</p>
            <p className="mt-2 text-slate-700">{disclosure.statement}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
