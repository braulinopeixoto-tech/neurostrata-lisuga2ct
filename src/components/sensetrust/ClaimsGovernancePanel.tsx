import type { SenseTrustPermittedClaim, SenseTrustProhibitedClaim, SenseTrustRegulatorySafeLanguage } from '@/types/sensetrust/public-narrative'

interface ClaimsGovernancePanelProps {
  permitted: SenseTrustPermittedClaim[]
  prohibited: SenseTrustProhibitedClaim[]
  safeLanguage: SenseTrustRegulatorySafeLanguage[]
}

export function ClaimsGovernancePanel({ permitted, prohibited, safeLanguage }: ClaimsGovernancePanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Claims governance</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <List title="permitidos" tone="emerald" items={permitted.map((item) => item.claim)} />
        <List title="proibidos" tone="rose" items={prohibited.map((item) => item.claim)} />
        <List title="requires review / roadmap" tone="amber" items={safeLanguage.map((item) => `${item.status}: ${item.phrase}`)} />
      </div>
    </section>
  )
}

function List({ title, tone, items }: { title: string; tone: 'emerald' | 'rose' | 'amber'; items: string[] }) {
  const color = tone === 'emerald' ? 'text-emerald-700' : tone === 'rose' ? 'text-rose-700' : 'text-amber-700'
  return (
    <div className="rounded-md bg-slate-50 p-3 text-xs">
      <p className={`font-bold uppercase ${color}`}>{title}</p>
      {items.map((item) => <p key={item} className="mt-2 text-slate-700">{item}</p>)}
    </div>
  )
}
