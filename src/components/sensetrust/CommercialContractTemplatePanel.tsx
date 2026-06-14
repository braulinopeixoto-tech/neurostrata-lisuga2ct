import type { SenseTrustCommercialContractTemplate } from '@/types/sensetrust/revenue-operations'

interface CommercialContractTemplatePanelProps {
  templates: SenseTrustCommercialContractTemplate[]
}

export function CommercialContractTemplatePanel({ templates }: CommercialContractTemplatePanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Commercial contract templates</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {templates.map((template) => (
          <article key={template.template_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-900">{template.template_name}</p>
                <p className="font-mono text-slate-500">{template.intended_plan}</p>
              </div>
              <span className="rounded-md bg-white px-2 py-1 font-bold text-amber-700">{template.legal_review_status}</span>
            </div>
            <div className="mt-3 space-y-2">
              {template.clauses.map((clause) => (
                <p key={clause.clause_id} className="rounded-md bg-white p-2 text-slate-700"><strong>{clause.title}:</strong> {clause.body}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
