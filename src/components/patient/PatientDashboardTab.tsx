import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Brain,
  Heart,
  Activity,
  AlertTriangle,
  Target,
  FileText,
  TrendingUp,
  Plus,
  BrainCircuit,
  Pill,
  Apple,
  MessageSquare,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowDown,
  ArrowUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface PatientDashboardTabProps {
  patient: any
  onTabChange: (tab: string) => void
}

export function PatientDashboardTab({ patient, onTabChange }: PatientDashboardTabProps) {
  // Ensure we have a score fallback
  const score = patient.score || 62
  const scoreColor =
    score >= 75 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-rose-500'
  const offset = 283 - (283 * score) / 100

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Strategic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border shadow-sm border-l-4 border-l-primary">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
          <p className="text-muted-foreground text-sm mt-1">
            ID: {patient.id} • Data da última avaliação:{' '}
            {new Date(patient.lastAssessment || Date.now()).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button
            onClick={() => onTabChange('checkup')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-none"
          >
            <Activity className="w-4 h-4 mr-2" /> Iniciar Check-up
          </Button>
          <Button
            onClick={() => onTabChange('evolution')}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <TrendingUp className="w-4 h-4 mr-2" /> Atualizar Evolução
          </Button>
          <Button asChild variant="secondary" className="flex-1 sm:flex-none">
            <Link to="/report/new">
              <FileText className="w-4 h-4 mr-2" /> Gerar Relatório
            </Link>
          </Button>
        </div>
      </div>

      {/* Automatic Insights */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex gap-4 items-start shadow-sm">
        <div className="bg-accent/10 p-2 rounded-full shrink-0">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-accent mb-2">Insights Automáticos da IA</h4>
          <div className="space-y-1.5 text-sm text-slate-700 font-medium">
            <p>• Déficit atencional impacta desempenho escolar.</p>
            <p>• Ansiedade pode estar agravando dificuldades cognitivas.</p>
            <p>• Intervenções múltiplas em andamento.</p>
          </div>
        </div>
      </div>

      {/* Current State Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-sm border-t-4 border-t-primary">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg text-slate-800">Estado Atual (Global)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={scoreColor}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-800">{score}</span>
                  <span className="text-[10px] font-bold text-slate-500">/ 100</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">VitalScore</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                  Métrica integrada de saúde neurofuncional
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                <span className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                  <Brain className="w-4 h-4 text-amber-500" /> Cognição
                </span>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-800 border-amber-200 uppercase tracking-wider text-[10px]"
                >
                  🟡 Moderado
                </Badge>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                <span className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                  <Heart className="w-4 h-4 text-rose-500" /> Emoção
                </span>
                <Badge
                  variant="outline"
                  className="bg-rose-50 text-rose-800 border-rose-200 uppercase tracking-wider text-[10px]"
                >
                  🔴 Alterado
                </Badge>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-100">
                <span className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                  <Activity className="w-4 h-4 text-amber-500" /> Comportamento
                </span>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-800 border-amber-200 uppercase tracking-wider text-[10px]"
                >
                  🟡 Instável
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm">
          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="p-6 border-b md:border-b-0 md:border-r flex flex-col justify-center bg-rose-50/20">
              <h3 className="text-base font-bold flex items-center gap-2 text-rose-800 mb-5">
                <AlertTriangle className="w-5 h-5 text-rose-500" /> Principais Alertas
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span className="text-slate-800 font-medium">Déficit atencional</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span className="text-slate-800 font-medium">Ansiedade elevada</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span className="text-slate-800 font-medium">Sono irregular</span>
                </li>
              </ul>
            </div>
            <div className="p-6 flex flex-col justify-center bg-blue-50/30">
              <h3 className="text-base font-bold flex items-center gap-2 text-blue-800 mb-5">
                <Target className="w-5 h-5 text-blue-500" /> Foco Atual de Intervenção
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span className="text-slate-800 font-medium">Regulação emocional</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span className="text-slate-800 font-medium">Atenção sustentada</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span className="text-slate-800 font-medium">Qualidade do sono</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrated Functional Areas */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-bold text-slate-800">Áreas Funcionais Integradas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col h-full gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Brain className="w-4 h-4 text-purple-600" /> Neuropsicologia
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 px-2 py-1 rounded text-[10px] font-bold text-rose-700 uppercase">
                  <div className="w-2 h-2 rounded-full bg-rose-500" /> Crítico
                </div>
              </div>
              <p className="text-sm text-slate-600 flex-1">
                déficit em atenção e memória de trabalho
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs justify-between bg-slate-50 hover:bg-slate-100"
                onClick={() => onTabChange('reports')}
              >
                Ver detalhes <ArrowRight className="w-3 h-3" />
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col h-full gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Pill className="w-4 h-4 text-blue-600" /> Farmacêutico
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded text-[10px] font-bold text-amber-700 uppercase">
                  <div className="w-2 h-2 rounded-full bg-amber-500" /> Atenção
                </div>
              </div>
              <p className="text-sm text-slate-600 flex-1">uso de fórmula para foco</p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs justify-between bg-slate-50 hover:bg-slate-100"
                asChild
              >
                <Link to="/gestao-metabolica">
                  Ver fórmula <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col h-full gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Apple className="w-4 h-4 text-green-600" /> Nutrição
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 px-2 py-1 rounded text-[10px] font-bold text-rose-700 uppercase">
                  <div className="w-2 h-2 rounded-full bg-rose-500" /> Crítico
                </div>
              </div>
              <p className="text-sm text-slate-600 flex-1">padrão alimentar inflamatório</p>
              <div className="h-8"></div>
              {/* Spacer to match buttons height */}
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col h-full gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <MessageSquare className="w-4 h-4 text-sky-500" /> Fonoaudiologia
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded text-[10px] font-bold text-amber-700 uppercase">
                  <div className="w-2 h-2 rounded-full bg-amber-500" /> Atenção
                </div>
              </div>
              <p className="text-sm text-slate-600 flex-1">dificuldade de processamento auditivo</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col h-full gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <GraduationCap className="w-4 h-4 text-indigo-500" /> Psicopedagogia
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 px-2 py-1 rounded text-[10px] font-bold text-rose-700 uppercase">
                  <div className="w-2 h-2 rounded-full bg-rose-500" /> Crítico
                </div>
              </div>
              <p className="text-sm text-slate-600 flex-1">
                dificuldade em leitura e atenção escolar
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Neurofunctional Data */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-violet-600" /> Dados Neurofuncionais
        </h3>
        <Card className="shadow-sm border-l-4 border-l-violet-500">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Alfa frontal
                </span>
                <span className="text-2xl font-black text-rose-600 flex items-center gap-1">
                  <ArrowDown className="w-6 h-6 stroke-[3]" />
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Theta difusa
                </span>
                <span className="text-2xl font-black text-amber-600 flex items-center gap-1">
                  <ArrowUp className="w-6 h-6 stroke-[3]" />
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  P300 (Atenção)
                </span>
                <span className="text-lg font-bold text-rose-600 mt-1">Atraso</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Timeline */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-800">Linha do Tempo Clínica</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTabChange('evolution')}
              className="bg-white"
            >
              <Activity className="w-4 h-4 mr-2" /> Visualizar Evolução
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" /> Adicionar Evento
            </Button>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-2">
              <div className="pl-6 relative">
                <div className="absolute w-3.5 h-3.5 bg-primary rounded-full -left-[8px] top-1 ring-4 ring-white" />
                <p className="text-sm font-bold text-primary mb-0.5">Hoje</p>
                <p className="text-base text-slate-700 font-medium">
                  Revisão de equipe multidisciplinar
                </p>
              </div>
              <div className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                <p className="text-sm font-bold text-slate-500 mb-0.5">15/02</p>
                <p className="text-base text-slate-700">Início intervenção farmacêutica</p>
              </div>
              <div className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                <p className="text-sm font-bold text-slate-500 mb-0.5">10/02</p>
                <p className="text-base text-slate-700">Avaliação inicial</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
