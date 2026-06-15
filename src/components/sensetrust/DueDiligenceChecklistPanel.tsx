import type { SenseTrustDueDiligenceItem } from '@/types/sensetrust/investor-room'

interface DueDiligenceChecklistPanelProps {
  items: SenseTrustDueDiligenceItem[]
}

export function DueDiligenceChecklistPanel({ items }: DueDiligenceChecklistPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Due diligence checklist</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="text-slate-500">
            <tr>
              <th className="px-2 py-2">item</th>
              <th className="px-2 py-2">category</th>
              <th className="px-2 py-2">readiness</th>
              <th className="px-2 py-2">owner</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id} className="border-t">
                <td className="px-2 py-2 font-bold">{item.title}</td>
                <td className="px-2 py-2">{item.category}</td>
                <td className="px-2 py-2">{item.readiness}</td>
                <td className="px-2 py-2">{item.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
