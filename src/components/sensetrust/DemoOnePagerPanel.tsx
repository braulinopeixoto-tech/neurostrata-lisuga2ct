import type { SenseTrustDemoOnePager } from '@/types/sensetrust/partner-demo-kit'

export function DemoOnePagerPanel({ onePager }: { onePager: SenseTrustDemoOnePager }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-xl font-black text-slate-950">{onePager.title}</p>
      <p className="mt-1 text-sm font-semibold text-emerald-700">{onePager.subtitle}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Block title="Problema" body={onePager.problem} />
        <Block title="Solucao" body={onePager.solution} />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <List title="O que certifica" items={onePager.certifies} />
        <List title="O que nao certifica" items={onePager.does_not_certify} />
        <List title="Proof points" items={onePager.proof_points} />
      </div>
      <p className="mt-4 rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{onePager.required_disclosure}</p>
    </section>
  )
}

function Block({ title, body }: { title: string; body: string }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-950">{title}</p><p className="mt-2 text-sm text-slate-600">{body}</p></div>
}

function List({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-md border p-3"><p className="font-bold text-slate-950">{title}</p>{items.map((item) => <p key={item} className="mt-2 text-sm text-slate-600">{item}</p>)}</div>
}
