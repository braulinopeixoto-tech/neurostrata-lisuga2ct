import type { SenseTrustDataRoomItem } from '@/types/sensetrust/investor-room'

interface DataRoomChecklistPanelProps {
  items: SenseTrustDataRoomItem[]
}

export function DataRoomChecklistPanel({ items }: DataRoomChecklistPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Data room checklist</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.item_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <div className="flex items-start justify-between gap-2">
              <p className="font-bold text-slate-900">{item.title}</p>
              <span className="rounded-md bg-white px-2 py-1 font-mono font-bold text-slate-600">{item.status}</span>
            </div>
            <p className="mt-2 text-slate-700">{item.summary}</p>
            <p className="mt-2 font-mono text-slate-500">{item.area} / {item.sensitivity}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
