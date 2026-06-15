import type { SenseTrustDemoFeedbackMock, SenseTrustPostDemoChecklist } from '@/types/sensetrust/partner-demo-kit'

export function PostDemoFeedbackPanel({ checklist, feedback }: { checklist: SenseTrustPostDemoChecklist; feedback: SenseTrustDemoFeedbackMock[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Post-demo feedback mock</p>
      <p className="mt-1 text-sm font-semibold text-rose-700">Feedback real deve ser coletado apenas em ferramenta aprovada futuramente.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {feedback.map((item) => <div key={item.feedback_id} className="rounded-md bg-slate-50 p-3"><p className="font-semibold text-slate-950">{item.prompt}</p><p className="mt-2 text-sm text-slate-600">{item.simulated_response}</p></div>)}
      </div>
      <p className="mt-4 text-sm text-slate-600">Checklist: {checklist.items.join(' / ')}</p>
    </section>
  )
}
