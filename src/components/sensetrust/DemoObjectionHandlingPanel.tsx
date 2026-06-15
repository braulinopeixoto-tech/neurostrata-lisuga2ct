import type { SenseTrustDemoObjection } from '@/types/sensetrust/demo-readiness'

export function DemoObjectionHandlingPanel({ objections }: { objections: SenseTrustDemoObjection[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Objection handling</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {objections.map((item) => (
          <div key={item.objection_id} className="rounded-md border border-slate-200 p-3">
            <p className="font-bold text-slate-950">{item.objection}</p>
            <p className="mt-2 text-sm text-slate-700">{item.safe_response}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-700">Permitido: {item.permitted_claim}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Proibido: {item.prohibited_claim}</p>
            <p className="mt-2 text-xs text-slate-600">{item.next_step}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
