import type { SenseTrustWebsitePublicationChecklistItem } from '@/types/sensetrust/website-blueprint'

interface WebsitePublicationChecklistPanelProps {
  items: SenseTrustWebsitePublicationChecklistItem[]
}

export function WebsitePublicationChecklistPanel({ items }: WebsitePublicationChecklistPanelProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Publication checklist</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.item_id} className="rounded-md bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase text-slate-500">{item.area}</p>
              <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-slate-700">{item.status}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">{item.requirement}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
