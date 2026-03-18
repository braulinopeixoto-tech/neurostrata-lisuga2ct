import {
  Landmark,
  Scale,
  HeartPulse,
  Building2,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from 'lucide-react'

const externalCertifications = [
  { name: 'Ministério Público', icon: Landmark, desc: 'Acesso Legal EHR' },
  { name: 'OAB / Defensoria', icon: Scale, desc: 'Amparo Jurídico' },
  { name: 'Planos de Saúde', icon: HeartPulse, desc: 'Auditoria Clínica' },
  { name: 'Redes Hospitalares', icon: Building2, desc: 'Integração de Dados' },
]

export function TrustSection() {
  return (
    <div className="space-y-8 pt-8 border-t border-border/60">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Certificações e Validações Institucionais
        </h2>
        <p className="text-muted-foreground mt-2">
          Reconhecimento técnico e jurídico da infraestrutura clínica NeuroStrata.
        </p>
      </div>

      {/* External Entities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {externalCertifications.map((cert, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-border/80 shadow-sm hover:border-primary/40 hover:shadow-md transition-all text-center group"
          >
            <cert.icon className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors mb-3" />
            <span className="font-semibold text-sm text-foreground">{cert.name}</span>
            <span className="text-xs text-muted-foreground mt-1">{cert.desc}</span>
          </div>
        ))}
      </div>

      {/* Proprietary Validations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-transparent rounded-xl border border-blue-100 hover:shadow-md transition-shadow group">
          <div className="bg-white border border-blue-200 p-3 rounded-xl text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-bold text-blue-950 text-lg">Biograma Longitudinal</h4>
            <p className="text-sm text-blue-900/80 mt-1.5 leading-relaxed font-medium">
              Metodologia proprietária com rastreabilidade auditável e certificação ICP-Brasil para
              evolução clínica contínua.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-50 to-transparent rounded-xl border border-emerald-100 hover:shadow-md transition-shadow group">
          <div className="bg-white border border-emerald-200 p-3 rounded-xl text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-950 text-lg">Diagnóstico Validado</h4>
            <p className="text-sm text-emerald-900/80 mt-1.5 leading-relaxed font-medium">
              Sistematização neurofuncional robusta, cruzada com matrizes RDoC e DSM para máxima
              precisão técnica e segurança jurídica.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Layer Footer Section */}
      <div className="mt-12 bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold tracking-wide uppercase border border-slate-700">
              <Lock className="w-4 h-4 text-emerald-400" />
              Infraestrutura de Segurança
            </div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Trust Layer™ <ShieldCheck className="w-6 h-6 text-primary" />
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed text-justify md:text-left">
              O Trust Layer™ consiste em uma infraestrutura de registro auditável que assegura a
              integridade, rastreabilidade e verificabilidade de todas as operações clínicas
              realizadas no âmbito do NeuroStrata, por meio da vinculação de dados a profissionais
              responsáveis, registros temporais e versões metodológicas, garantindo transparência,
              segurança jurídica e validade técnica das informações produzidas.
            </p>
          </div>
          <div className="w-full md:w-72 bg-slate-800/50 rounded-xl p-5 border border-slate-700 shadow-sm shrink-0">
            <h4 className="text-sm font-bold text-white mb-3 border-b border-slate-700 pb-2 uppercase tracking-tight">
              Metodologias Certificadas
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Biograma
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Diagnóstico Validado
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
