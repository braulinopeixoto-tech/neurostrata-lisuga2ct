import type { SenseTrustWebsiteCopyBlock } from '@/types/sensetrust/public-narrative'

interface WebsiteCopyPanelProps {
  blocks: SenseTrustWebsiteCopyBlock[]
}

export function WebsiteCopyPanel({ blocks }: WebsiteCopyPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Website copy</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {blocks.map((block) => (
          <article key={block.block_id} className="rounded-md bg-slate-50 p-3 text-sm">
            <p className="font-bold text-slate-900">{block.title}</p>
            <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{block.subtitle}</p>
            <p className="mt-2 text-slate-700">{block.body}</p>
            <p className="mt-2 font-mono text-xs font-bold text-emerald-700">{block.call_to_action}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
