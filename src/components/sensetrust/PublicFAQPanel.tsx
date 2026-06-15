import type { SenseTrustPublicFAQ } from '@/types/sensetrust/public-narrative'

interface PublicFAQPanelProps {
  items: SenseTrustPublicFAQ[]
}

export function PublicFAQPanel({ items }: PublicFAQPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Public FAQ</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.faq_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="font-bold text-slate-900">{item.question}</p>
            <p className="mt-2 text-slate-700">{item.answer}</p>
            <p className="mt-2 font-mono text-slate-500">{item.claim_status}</p>
            <p className="mt-1 text-amber-700">{item.disclaimer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
