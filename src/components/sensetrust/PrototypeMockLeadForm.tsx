import type { SenseTrustPrototypeMockLeadForm } from '@/types/sensetrust/prototype-ux'

interface PrototypeMockLeadFormProps {
  forms: SenseTrustPrototypeMockLeadForm[]
}

export function PrototypeMockLeadForm({ forms }: PrototypeMockLeadFormProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Formulario mockado</p>
      <p className="mt-1 text-sm font-semibold text-rose-700">Envio real bloqueado. Nenhuma coleta real de dados.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {forms.map((form) => (
          <div key={form.form_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-bold text-slate-950">{form.title}</p>
            {form.fields.map((field) => (
              <div key={field} className="mt-2 rounded border bg-white px-3 py-2 text-sm text-slate-600">{field}</div>
            ))}
            <button type="button" disabled className="mt-3 w-full rounded-md bg-slate-300 px-3 py-2 text-sm font-bold text-slate-600">Envio real bloqueado</button>
            <p className="mt-2 text-xs text-rose-700">Campos proibidos: {form.prohibited_fields.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
