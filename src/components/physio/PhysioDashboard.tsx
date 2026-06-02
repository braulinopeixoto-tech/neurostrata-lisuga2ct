import { Patient } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, UserCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function PhysioDashboard({ patient }: { patient: Patient }) {
  // Mock data for the dashboard
  const bfsScore = 68
  const reliability = 'Moderada'
  const inconsistencyDetected = true
  const occStatus = 'Inapto Temporário'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-indigo-500 shadow-sm">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              BFS-P Interno
            </span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {bfsScore}
            <span className="text-sm text-slate-400 font-normal">/100</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">BioStrata Functional Score</div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500 shadow-sm">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Confiabilidade
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-700">{reliability}</div>
          <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
            {inconsistencyDetected && <span>Inconsistência (PROM vs OBS)</span>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-emerald-500 shadow-sm">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Perfil Long.
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-700">Estável</div>
          <div className="text-xs text-emerald-600 mt-1">Sem perdas significativas em 6m</div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500 shadow-sm bg-blue-50/30">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-blue-800 uppercase tracking-wider">
              Conclusão Ocupacional
            </span>
            <UserCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-blue-900">{occStatus}</div>
          <div className="text-xs text-blue-700 mt-1 flex items-center justify-between">
            <span>Base: Exigência Laboral Alta</span>
            <Badge variant="outline" className="bg-white text-[10px]">
              Aguardando Laudo
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-4 mt-4 shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-100 py-3">
          <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Status da Avaliação Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Contexto & Demanda</p>
                <p className="text-xs text-slate-500">Preenchido</p>
              </div>
            </div>
            <div className="hidden md:block flex-1 h-[1px] bg-slate-200 mx-4"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">PROM (Autorrelato)</p>
                <p className="text-xs text-slate-500">WHODAS 2.0 Concluído</p>
              </div>
            </div>
            <div className="hidden md:block flex-1 h-[1px] bg-slate-200 mx-4"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Testes Observacionais</p>
                <p className="text-xs text-slate-500">TUG + Dinamometria</p>
              </div>
            </div>
            <div className="hidden md:block flex-1 h-[1px] bg-slate-200 mx-4"></div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                4
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Conclusão</p>
                <p className="text-xs text-slate-500">Pendente Validação</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
