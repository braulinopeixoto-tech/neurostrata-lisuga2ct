import type { SenseTrustRevenueLedger } from '@/types/sensetrust/revenue-operations'

interface SimulatedRevenueLedgerPanelProps {
  ledger: SenseTrustRevenueLedger
}

export function SimulatedRevenueLedgerPanel({ ledger }: SimulatedRevenueLedgerPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-black text-slate-950">Simulated revenue ledger</p>
        <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-700">MRR R$ {ledger.simulated_mrr_brl} / ARR R$ {ledger.simulated_arr_brl}</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="text-slate-500">
            <tr>
              <th className="px-2 py-2">organizacao</th>
              <th className="px-2 py-2">plano</th>
              <th className="px-2 py-2">valor</th>
              <th className="px-2 py-2">periodo</th>
              <th className="px-2 py-2">status</th>
              <th className="px-2 py-2">vencimento</th>
              <th className="px-2 py-2">flags</th>
            </tr>
          </thead>
          <tbody>
            {ledger.entries.map((entry) => (
              <tr key={entry.entry_id} className="border-t">
                <td className="px-2 py-2 font-bold">{entry.organization_name}</td>
                <td className="px-2 py-2">{entry.plan_name}</td>
                <td className="px-2 py-2">R$ {entry.simulated_amount_brl}</td>
                <td className="px-2 py-2">{entry.simulated_period}</td>
                <td className="px-2 py-2">{entry.simulated_status}</td>
                <td className="px-2 py-2">{entry.simulated_due_date}</td>
                <td className="px-2 py-2 font-mono">no_real_billing/no_real_invoice</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
