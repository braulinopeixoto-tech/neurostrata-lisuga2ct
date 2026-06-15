import type { SenseTrustWebsiteRiskDisclosure } from '@/types/sensetrust/website-blueprint'

interface WebsiteRiskDisclosurePanelProps {
  disclosures: SenseTrustWebsiteRiskDisclosure[]
}

export function WebsiteRiskDisclosurePanel({ disclosures }: WebsiteRiskDisclosurePanelProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Risk disclosures</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {disclosures.map((disclosure) => (
          <div key={disclosure.disclosure_id} className="rounded-md border border-slate-200 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">{disclosure.category}</p>
            <p className="mt-2 text-sm text-slate-700">{disclosure.statement}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
