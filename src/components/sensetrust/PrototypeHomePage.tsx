import type { SenseTrustPrototypeRoute } from '@/types/sensetrust/prototype-ux'
import { PrototypePublicVerificationDemo } from './PrototypePublicVerificationDemo'

interface PrototypeHomePageProps {
  route: SenseTrustPrototypeRoute
}

export function PrototypeHomePage({ route }: PrototypeHomePageProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-md bg-slate-50 p-5">
        <p className="text-3xl font-black text-slate-950">{route.title}</p>
        <p className="mt-2 max-w-3xl text-slate-600">{route.subtitle}</p>
      </section>
      <div className="grid gap-3 md:grid-cols-3">
        {['Problema: documentos sem trilha', 'Solucao: Trust Layer', 'Como funciona: evidencia, hash, commit, estado e verificacao'].map((item) => (
          <div key={item} className="rounded-md border p-4">
            <p className="font-bold text-slate-950">{item}</p>
            <p className="mt-2 text-sm text-slate-600">Bloco visual para demonstracao interna sem backend real.</p>
          </div>
        ))}
      </div>
      <PrototypePublicVerificationDemo />
      <p className="rounded-md border border-rose-100 bg-rose-50 p-3 text-sm font-semibold text-rose-700">{route.disclosures[0]?.statement}</p>
    </div>
  )
}
