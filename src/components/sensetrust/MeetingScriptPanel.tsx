import type { SenseTrustMeetingScript } from '@/types/sensetrust/partner-demo-kit'

export function MeetingScriptPanel({ scripts }: { scripts: SenseTrustMeetingScript[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Meeting scripts</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {scripts.map((script) => (
          <div key={script.script_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-bold text-slate-950">{script.audience}</p>
            <p className="mt-2 text-sm text-slate-700">{script.opening}</p>
            <p className="mt-2 text-sm text-slate-600">{script.demonstration}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-700">Permitida: {script.permitted_phrase}</p>
            <p className="mt-1 text-xs font-semibold text-rose-700">Proibida: {script.prohibited_phrase}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
