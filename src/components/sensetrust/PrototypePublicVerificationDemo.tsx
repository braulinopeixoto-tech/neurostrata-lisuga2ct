export function PrototypePublicVerificationDemo() {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Verificacao publica demo</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <Metric label="token" value="ST-DEMO-2048" />
        <Metric label="estado" value="simulado" />
        <Metric label="hash parcial" value="a91f...02de" />
        <Metric label="exposicao" value="metadata_only" />
      </div>
      <p className="mt-4 text-sm font-semibold text-rose-700">Nao expoe dado clinico, CPF, CID, exame, EEG, qEEG ou laudo real.</p>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-sm font-black text-slate-950">{value}</p>
    </div>
  )
}
