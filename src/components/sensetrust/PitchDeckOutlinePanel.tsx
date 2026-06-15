import type { SenseTrustPitchDeckSection } from '@/types/sensetrust/investor-room'

interface PitchDeckOutlinePanelProps {
  sections: SenseTrustPitchDeckSection[]
}

export function PitchDeckOutlinePanel({ sections }: PitchDeckOutlinePanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Pitch deck outline</p>
      <ol className="mt-4 space-y-3">
        {sections.map((section) => (
          <li key={section.section_id} className="rounded-md bg-slate-50 p-3 text-sm">
            <p className="font-bold text-slate-900">{section.order}. {section.title}</p>
            <p className="mt-1 text-slate-700">{section.narrative}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
