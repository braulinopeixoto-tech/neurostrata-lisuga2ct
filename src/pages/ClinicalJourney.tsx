import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ClipboardList,
  Activity,
  Brain,
  CheckCircle2,
  ArrowRight,
  Watch,
  Stethoscope,
} from 'lucide-react'

export default function ClinicalJourney() {
  const [clinicalProgress] = useState(75)
  const [bioProgress] = useState(40)

  return (
    <div className="space-y-8 animate-fade-in-up pb-16 max-w-6xl mx-auto mt-4">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Jornada Clínica</h1>
        <p className="text-lg text-slate-600 font-medium">
          Módulo de captura estruturada: Inputs Clínicos e Biomarcadores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CAMADA 1 - INPUT CLÍNICO (AZUL) */}
        <Card className="border-t-4 border-t-blue-600 shadow-lg">
          <CardHeader className="bg-blue-50/50 pb-4 border-b border-blue-100">
            <CardTitle className="text-blue-900 flex items-center gap-2 text-xl font-bold">
              <ClipboardList className="w-6 h-6 text-blue-600" />
              Camada 1: Input Clínico
            </CardTitle>
            <CardDescription className="text-blue-700/80 font-medium">
              Anamnese, psicometrias e dados comportamentais.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-blue-900">
                <span>Completude da Coleta</span>
                <span>{clinicalProgress}%</span>
              </div>
              <Progress value={clinicalProgress} className="h-2 bg-blue-100 [&>div]:bg-blue-600" />
            </div>

            <div className="space-y-3">
              {[
                { name: 'Anamnese Padronizada', status: 'Completo', req: true },
                { name: 'Psicometria Nível 1 (DASS-21)', status: 'Completo', req: true },
                { name: 'Psicometria Nível 2 (RDoC)', status: 'Pendente', req: true },
                { name: 'Sincronização de Wearables', status: 'Opcional', req: false },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {step.status === 'Completo' ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-800">{step.name}</p>
                      {step.req && (
                        <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">
                          Obrigatório
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 font-semibold">
                    Acessar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CAMADA 2 - BIOMARCADORES (ROXO) */}
        <Card className="border-t-4 border-t-purple-600 shadow-lg">
          <CardHeader className="bg-purple-50/50 pb-4 border-b border-purple-100">
            <CardTitle className="text-purple-900 flex items-center gap-2 text-xl font-bold">
              <Activity className="w-6 h-6 text-purple-600" />
              Camada 2: Biomarcadores
            </CardTitle>
            <CardDescription className="text-purple-700/80 font-medium">
              QEEG, Exames laboratoriais e dados fisiológicos integrados.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-purple-900">
                <span>Mapeamento Fisiológico</span>
                <span>{bioProgress}%</span>
              </div>
              <Progress value={bioProgress} className="h-2 bg-purple-100 [&>div]:bg-purple-600" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 shadow-sm flex flex-col items-center text-center hover:border-purple-300 transition-colors cursor-pointer">
                <Brain className="w-8 h-8 text-purple-500 mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">qEEG / sLORETA</h4>
                <Badge className="mt-2 bg-purple-100 text-purple-800 border-none">
                  Alta Relevância
                </Badge>
              </div>
              <div className="p-5 rounded-xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 shadow-sm flex flex-col items-center text-center hover:border-purple-300 transition-colors cursor-pointer">
                <Stethoscope className="w-8 h-8 text-purple-400 mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">Painel Metabólico</h4>
                <Badge className="mt-2 bg-slate-100 text-slate-600 border-none">Pendente</Badge>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-sm text-purple-800 flex gap-3 shadow-sm">
              <Watch className="w-5 h-5 shrink-0 text-purple-600" />
              <p className="leading-relaxed">
                Os dados de HRV foram sincronizados. A variabilidade da frequência cardíaca indica{' '}
                <strong>alta carga alostática</strong> e risco de exaustão simpática.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button
          asChild
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md px-8"
        >
          <Link to="/diagnostic-core">
            Avançar para Núcleo Diagnóstico <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
