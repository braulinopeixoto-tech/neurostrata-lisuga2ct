import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  FileCheck,
  TrendingUp,
  Target,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { DimensionalRadarChart } from '@/components/charts/DimensionalRadarChart'

export function PatientDashboardTab({
  patient,
  onTabChange,
}: {
  patient: any
  onTabChange: (tab: string) => void
}) {
  const isAtRisk = 100 - patient.score >= 50

  const radarData = [
    { subject: 'Sist. Cognitivos', value: 85 },
    { subject: 'Valência Negativa', value: 75 },
    { subject: 'Valência Positiva', value: 45 },
    { subject: 'Sist. Sociais', value: 25 },
    { subject: 'Alerta/Regulação', value: 42 },
    { subject: 'Sist. Motores', value: 90 },
  ]

  return (
    <div className="space-y-6 animate-fade-in mt-4">
      {isAtRisk && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-900">Alerta Clínico Crítico</h4>
            <p className="text-sm text-rose-800/80 mt-1">
              O Score de Risco ultrapassou o limite de segurança (50%). Avalie imediatamente as
              sugestões no <strong>Núcleo Diagnóstico</strong> para adequação de protocolo.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="ml-auto shrink-0 border-rose-200 text-rose-700 bg-white"
          >
            <Link to="/diagnostic-core">Ver Núcleo</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-sm border-t-4 border-t-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-amber-500" /> Perfil Neurofuncional (Camada 3)
              </div>
              <Badge
                variant="outline"
                className="text-[10px] uppercase font-bold tracking-widest text-slate-500"
              >
                Atualizado: Hoje
              </Badge>
            </CardTitle>
            <CardDescription>
              Radar de integridade calculado automaticamente pelo cruzamento de psicometrias e
              exames (qEEG).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-1/2">
              <DimensionalRadarChart data={radarData} />
            </div>
            <div className="w-full sm:w-1/2 space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  <span>Confiabilidade Diagnóstica</span>
                  <span className="text-amber-600">92%</span>
                </div>
                <Progress value={92} className="h-1.5 bg-amber-100 [&>div]:bg-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Hipótese Primária Validada
                </h4>
                <p className="text-xs text-slate-600 bg-white p-2 rounded border">
                  Transtorno de Déficit de Atenção/Hiperatividade (TDAH)
                </p>
              </div>
              <Button
                asChild
                className="w-full bg-slate-900 text-white hover:bg-slate-800"
                size="sm"
              >
                <Link to="/diagnostic-core">Acessar Convergência Completa</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 flex flex-col">
          <Card className="shadow-sm flex-1 border-t-4 border-t-emerald-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-700">
                <Target className="w-4 h-4" /> Próximos Passos (Camada 4)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-3">
                A IA recomenda intervenção imediata baseada nas redes afetadas.
              </p>
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <p className="font-semibold text-emerald-900 text-sm">Protocolo tDCS Frontal</p>
                <Badge className="bg-emerald-200 text-emerald-800 hover:bg-emerald-200 border-none mt-2 text-[10px]">
                  Alta Evidência
                </Badge>
              </div>
              <Button
                variant="link"
                asChild
                className="w-full mt-2 text-xs text-emerald-700 px-0 h-auto justify-end"
              >
                <Link to="/interventions">
                  Prescrever Intervenção <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm flex-1 bg-slate-900 text-white border-none">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div>
                <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
                <h3 className="font-bold text-lg">Trust Layer™</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Este prontuário está assegurado criptograficamente.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="mt-4 w-full bg-white/10 text-white hover:bg-white/20 border-none"
              >
                <Link to="/trust-layer">Auditoria de Dados</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
