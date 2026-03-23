import {
  Activity,
  Brain,
  Clock,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'

export function ClinicalHubTab() {
  return (
    <div className="space-y-6 animate-fade-in mt-4">
      <Card className="border-t-4 border-t-amber-500 shadow-sm bg-gradient-to-br from-amber-50 to-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <Badge className="bg-amber-100 text-amber-800 border-none font-bold uppercase tracking-widest text-[10px]">
              Aviso de Transição de Módulo
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900">
              Integração com Núcleo Diagnóstico (V2)
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              A Área Médica tradicional agora atua como uma interface de{' '}
              <strong>visão holística</strong>. O motor de decisão foi transferido para o{' '}
              <strong>Núcleo Diagnóstico</strong>, onde suas avaliações cruzam automaticamente com
              dados de neuropsicologia, fonoaudiologia e wearables.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md"
          >
            <Link to="/diagnostic-core">
              Acessar Núcleo Diagnóstico <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-blue-500" /> Consultas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">4</div>
            <p className="text-xs text-slate-500 mt-1">Aguardando anamnese na Jornada Clínica</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Laudos Validados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">12</div>
            <p className="text-xs text-slate-500 mt-1">Selados na Trust Layer™ neste mês</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <Activity className="w-4 h-4 text-rose-500" /> Casos Críticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">2</div>
            <p className="text-xs text-slate-500 mt-1">Sinalizados pelo Núcleo Diagnóstico</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
              <HeartPulse className="w-4 h-4 text-purple-500" /> Exames (Camada 2)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">8</div>
            <p className="text-xs text-slate-500 mt-1">
              Biomarcadores recebidos aguardando análise
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-t-4 border-t-slate-800">
        <CardHeader>
          <CardTitle className="text-lg">Pacientes Recentes (Evolução Longitudinal)</CardTitle>
          <CardDescription>
            Acompanhe o reflexo das intervenções no Score Clínico Dinâmico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Carlos Oliveira',
                score: 85,
                trend: '+5%',
                status: 'Em Melhora',
                color: 'emerald',
              },
              {
                name: 'Mariana Santos',
                score: 60,
                trend: '-2%',
                status: 'Instável',
                color: 'amber',
              },
              {
                name: 'Roberto Fernandes',
                score: 40,
                trend: '-10%',
                status: 'Risco Elevado',
                color: 'rose',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold text-${p.color}-600`}>{p.status}</span>
                    <span className="text-xs text-slate-400">
                      ({p.trend} desde a última visita)
                    </span>
                  </div>
                </div>
                <div className="w-32 flex flex-col gap-1 items-end">
                  <span className="text-xs font-semibold text-slate-600">
                    Score Atual: {p.score}%
                  </span>
                  <Progress
                    value={p.score}
                    className={`h-1.5 w-full bg-${p.color}-100 [&>div]:bg-${p.color}-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
