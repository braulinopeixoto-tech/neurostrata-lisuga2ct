import type { SenseTrustNavigationItem, SenseTrustWebsitePage } from '@/types/sensetrust/website-blueprint'

interface WebsiteSitemapPanelProps {
  pages: SenseTrustWebsitePage[]
  navigation: SenseTrustNavigationItem[]
}

export function WebsiteSitemapPanel({ pages, navigation }: WebsiteSitemapPanelProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-black text-slate-950">Sitemap publico v1.9</p>
          <p className="text-sm text-slate-600">Blueprint de paginas metadata_only, sem deploy de producao.</p>
        </div>
        <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{pages.length} paginas</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {navigation.map((item) => {
          const page = pages.find((candidate) => candidate.slug === item.slug)
          return (
            <div key={item.nav_id} className="rounded-md border border-slate-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-950">{item.label}</p>
                  <p className="font-mono text-xs text-slate-500">{item.slug}</p>
                </div>
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{item.page_type}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{page?.primary_goal}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
