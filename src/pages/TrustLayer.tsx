import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Lock, Fingerprint, History, CheckCircle2, Server } from 'lucide-react'

export default function TrustLayer() {
  return (
    <div className="space-y-8 animate-fade-in-up pb-16 max-w-6xl mx-auto mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-slate-900" /> Trust Layer™ (Auditoria)
        </h1>
        <p className="text-lg text-slate-600 font-medium max-w-3xl">
          Módulo de rastreabilidade com log imutável de ações. Segurança jurídica e autoridade
          científica garantida para o Sistema Operacional da Saúde Mental.
        </p>
      </div>

      {/* Selos Visuais Principais V2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-2xl flex items-center gap-5 relative overflow-hidden border border-slate-700 group cursor-default">
          <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Fingerprint className="w-48 h-48" />
          </div>
          <div className="bg-emerald-400/20 p-4 rounded-full backdrop-blur-sm shrink-0 border border-emerald-400/30">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="relative z-10">
            <h3 className="font-black text-xl tracking-tight uppercase leading-tight">
              Diagnóstico Validado NeuroStrata™
            </h3>
            <p className="text-slate-300 text-sm mt-1.5 font-medium">
              Convergência clinicamente atestada e auditada com precisão.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-2xl flex items-center gap-5 relative overflow-hidden border border-slate-700 group cursor-default">
          <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Server className="w-48 h-48" />
          </div>
          <div className="bg-blue-400/20 p-4 rounded-full backdrop-blur-sm shrink-0 border border-blue-400/30">
            <History className="w-8 h-8 text-blue-400" />
          </div>
          <div className="relative z-10">
            <h3 className="font-black text-xl tracking-tight uppercase leading-tight">
              Biograma Longitudinal NeuroStrata™
            </h3>
            <p className="text-slate-300 text-sm mt-1.5 font-medium">
              Evolução do paciente registrada de forma contínua e imutável.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-t-4 border-t-slate-900 shadow-xl mt-8">
        <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-200">
          <CardTitle className="text-slate-900 flex items-center gap-2 text-2xl font-black tracking-tight">
            <Lock className="w-6 h-6 text-slate-700" />
            Log Imutável de Decisão Clínica
          </CardTitle>
          <CardDescription className="font-medium text-slate-600 text-base mt-1">
            Registro de todas as ações multiprofissionais com timestamp e Hash criptográfico.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              {
                action: 'Prescrição de Protocolo tDCS v1.2',
                author: 'Dr. Renato Alves (Neurologia)',
                time: 'Há 10 min',
                hash: 'e3b0c4429fc1c14...91b7852b855',
              },
              {
                action: 'Convergência Diagnóstica Gerada',
                author: 'Motor IA NeuroStrata',
                time: 'Ontem, 14:30',
                hash: '8d969eef6ecad3c...2020c923adc',
              },
              {
                action: 'Input de Avaliação Neuropsicológica',
                author: 'Dra. Camila Rocha (Neuropsicologia)',
                time: 'Ontem, 10:15',
                hash: 'b10a8db164e0754...10c3b4007b8',
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-400 transition-colors gap-4"
              >
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {log.action}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 font-semibold">
                    Responsável: <span className="text-slate-800">{log.author}</span>
                  </p>
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 mb-2 font-bold">
                    {log.time}
                  </Badge>
                  <p className="text-[11px] font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                    Hash ICP: {log.hash}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
