import type { SenseTrustWebsitePage } from '@/types/sensetrust/website-blueprint'

interface LandingExperiencePanelProps {
  page?: SenseTrustWebsitePage
}

export function LandingExperiencePanel({ page }: LandingExperiencePanelProps) {
  if (!page) return null

  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-black text-slate-950">Landing experience</p>
          <p className="text-sm text-slate-600">{page.safe_positioning}</p>
        </div>
        <span className="rounded-md bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{page.publication_status}</span>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        {page.sections.map((section) => (
          <div key={section.section_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">{section.type}</p>
            <p className="mt-1 font-bold text-slate-950">{section.heading}</p>
            <p className="mt-2 text-sm text-slate-600">{section.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {page.ctas.map((cta) => (
          <span key={cta.cta_id} className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
            {cta.label}
          </span>
        ))}
      </div>
    </section>
  )
}
