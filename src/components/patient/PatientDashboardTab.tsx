import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, Heart, Activity, AlertTriangle, Target, Users } from 'lucide-react'

interface PatientDashboardTabProps {
  patient: any
  onTabChange: (tab: string) => void
}

export function PatientDashboardTab({ patient, onTabChange }: PatientDashboardTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-primary">Painel Geral do Paciente</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Visão holística do estado neurofuncional e coordenação clínica.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Button
            onClick={() => onTabChange('checkup')}
            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            👉 Iniciar Check-up
          </Button>
          <Button
            onClick={() => onTabChange('evolution')}
            variant="secondary"
            className="flex-1 sm:flex-none border-2 border-primary/10 hover:border-primary/30 font-semibold"
          >
            👉 Atualizar Evolução
          </Button>
        </div>
      </div>

      {/* Resumo do estado atual */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
          <Activity className="w-5 h-5 text-blue-600" /> Resumo do estado atual
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-t-4 border-t-amber-400 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
                    <Brain className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-base">Cognição</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-semibold text-amber-700">Atenção</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Atenção flutuante e sobrecarga de memória operacional relatada nas últimas
                avaliações.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-rose-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-rose-50 p-2 rounded-lg text-rose-600">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-base">Emoção</span>
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 px-2 py-1 rounded-full border border-rose-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-xs font-semibold text-rose-700">Crítico</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sintomas ansiosos agudos, reatividade acentuada e valência negativa hiperativada.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-emerald-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-base">Comportamento</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-700">Estável</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Funcionalidade diária preservada, mantendo boa adesão às rotinas e intervenções.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Riscos e Focos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm h-full flex flex-col">
          <CardHeader className="pb-3 border-b bg-rose-50/50">
            <CardTitle className="text-base flex items-center gap-2 text-rose-800 font-bold">
              <AlertTriangle className="w-5 h-5 text-rose-600" /> Principais riscos identificados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex-1 bg-white">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0 shadow-sm" />
                <span>
                  Risco de agravamento do quadro ansioso associado a gatilhos e estressores
                  laborais.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-sm" />
                <span>Déficit progressivo de foco sustentado em tarefas complexas.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-sm" />
                <span>
                  Sobrecarga do eixo intestino-cérebro indicando possível inflamação sistêmica.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm h-full flex flex-col">
          <CardHeader className="pb-3 border-b bg-blue-50/50">
            <CardTitle className="text-base flex items-center gap-2 text-blue-800 font-bold">
              <Target className="w-5 h-5 text-blue-600" /> Principais focos de intervenção
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex-1 bg-white">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-sm" />
                <span>
                  Estabilização da reatividade autonômica (modulação do Eixo Noradrenérgico).
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-sm" />
                <span>
                  Treinamento intensivo de funções executivas para melhora do controle inibitório.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-sm" />
                <span>
                  Adequação de protocolo nutricional com foco na matriz anti-inflamatória.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Resumo das áreas envolvidas */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3 border-b bg-slate-50/50">
          <CardTitle className="text-base flex items-center gap-2 text-slate-800 font-bold">
            <Users className="w-5 h-5 text-indigo-500" /> Resumo das áreas envolvidas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 px-4 py-2 text-sm font-semibold shadow-sm">
              Neuro
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 px-4 py-2 text-sm font-semibold shadow-sm">
              Fono
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 px-4 py-2 text-sm font-semibold shadow-sm">
              Nutri
            </Badge>
            <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>
            <Badge
              variant="outline"
              className="border-dashed border-slate-300 text-muted-foreground px-4 py-2 text-sm font-medium hover:bg-slate-50 cursor-pointer transition-colors"
            >
              + Adicionar Especialidade
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
