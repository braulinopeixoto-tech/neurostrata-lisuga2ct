import type { SenseTrustInvestmentUseOfFunds } from '@/types/sensetrust/investor-room'

interface UseOfFundsPanelProps {
  items: SenseTrustInvestmentUseOfFunds[]
}

export function UseOfFundsPanel({ items }: UseOfFundsPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Use of funds</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.bucket_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="font-bold text-slate-900">{item.bucket}</p>
            <p className="mt-1 font-mono text-xl font-black text-slate-950">{item.allocation_percent_simulated}%</p>
            <p className="mt-2 text-slate-700">{item.purpose}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
