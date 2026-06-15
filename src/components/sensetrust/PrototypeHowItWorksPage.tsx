const steps = ['documento/objeto', 'evidence manifest', 'hash/commit', 'estado documental', 'verificacao publica segura']

export function PrototypeHowItWorksPage() {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Como funciona</p>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-black text-emerald-700">0{index + 1}</p>
            <p className="mt-2 font-bold text-slate-950">{step}</p>
            <p className="mt-2 text-sm text-slate-600">Etapa visual simulada, sem conteudo clinico real.</p>
          </div>
        ))}
      </div>
    </section>
  )
}
