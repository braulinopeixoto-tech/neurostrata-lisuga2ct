import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Target, Activity, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Interventions() {
  return (
    <div className="space-y-8 animate-fade-in-up pb-16 max-w-6xl mx-auto mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-emerald-700 flex items-center gap-3">
          <Target className="w-10 h-10" /> Intervenções
        </h1>
        <p className="text-lg text-slate-600 font-medium">
          Módulo de prescrição e acompanhamento baseado na evidência gerada pelo Núcleo Diagnóstico.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-t-4 border-t-emerald-500 shadow-lg">
          <CardHeader className="bg-emerald-50/50 pb-4 border-b border-emerald-100">
            <CardTitle className="text-emerald-900 flex items-center gap-2 text-xl font-bold">
              <GitBranch className="w-6 h-6 text-emerald-600" />
              Protocolos Versionados
            </CardTitle>
            <CardDescription className="text-emerald-700/80 font-medium">
              Sugestões automáticas baseadas no diagnóstico de alta confiabilidade.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {[
              {
                title: 'Neuromodulação (tDCS) Frontal',
                type: 'Neuro',
                version: 'v1.2',
                active: true,
              },
              {
                title: 'Suplementação Anti-inflamatória',
                type: 'Metabólico',
                version: 'v1.0',
                active: true,
              },
              {
                title: 'Treino de Funções Executivas',
                type: 'Cognitivo',
                version: 'v2.1',
                active: false,
              },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm hover:border-emerald-300 transition-colors"
              >
                <div>
                  <h4 className="font-bold text-slate-800">{p.title}</h4>
                  <div className="flex gap-2 mt-1.5">
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-600 font-semibold"
                    >
                      {p.type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-mono border-emerald-200 text-emerald-700 bg-emerald-50"
                    >
                      Versão {p.version}
                    </Badge>
                  </div>
                </div>
                {p.active ? (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-bold px-3 py-1">
                    Em Andamento
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-emerald-700 border-emerald-200 font-bold shadow-sm"
                  >
                    Prescrever
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-emerald-500 shadow-lg">
          <CardHeader className="bg-emerald-50/50 pb-4 border-b border-emerald-100">
            <CardTitle className="text-emerald-900 flex items-center gap-2 text-xl font-bold">
              <Activity className="w-6 h-6 text-emerald-600" />
              Evolução Longitudinal
            </CardTitle>
            <CardDescription className="text-emerald-700/80 font-medium">
              Rastreamento contínuo de eficácia terapêutica no paciente.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative border-l-2 border-emerald-200 ml-4 space-y-8 pb-4">
              <div className="relative pl-6">
                <div className="absolute w-4 h-4 bg-emerald-500 rounded-full -left-[9px] top-1 ring-4 ring-white" />
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Hoje
                </p>
                <p className="font-bold text-slate-800 text-base">Sessão 5 de tDCS concluída.</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Score de ansiedade reduziu 15% em relação à baseline. Paciente relata melhora na
                  regulação emocional diária.
                </p>
              </div>
              <div className="relative pl-6 opacity-70">
                <div className="absolute w-4 h-4 bg-slate-300 rounded-full -left-[9px] top-1 ring-4 ring-white" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                  10 dias atrás
                </p>
                <p className="font-bold text-slate-800 text-base">
                  Início do protocolo nutricional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-200">
        <Button
          asChild
          size="lg"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-md px-8"
        >
          <Link to="/trust-layer">
            Avançar para Auditoria (Trust Layer) <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
