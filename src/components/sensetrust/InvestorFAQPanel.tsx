import type { SenseTrustInvestorFAQ } from '@/types/sensetrust/investor-room'

interface InvestorFAQPanelProps {
  items: SenseTrustInvestorFAQ[]
}

export function InvestorFAQPanel({ items }: InvestorFAQPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Investor FAQ</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.question_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="font-bold text-slate-900">{item.question}</p>
            <p className="mt-2 text-slate-700">{item.answer}</p>
            <p className="mt-2 font-mono text-slate-500">{item.disclosure_level}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
