import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CaseWorkspace, useTeamFlowStore } from '@/stores/useTeamFlowStore'
import { HeartPulse, User, Brain, AlertTriangle } from 'lucide-react'

export function CaseOverviewTab({ caseData, patient }: { caseData: CaseWorkspace; patient: any }) {
  const { vitalSnapshots } = useTeamFlowStore()
  const snapshot = vitalSnapshots.find((vs) => vs.case_workspace_id === caseData.id)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
      <Card className="md:col-span-2 shadow-sm border-t-4 border-t-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-slate-600" /> Contexto Clínico do Paciente
          </CardTitle>
          <CardDescription>Resumo dos dados demográficos e status basal.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg border">
            <div>
              <strong className="block text-slate-500 mb-1">Nome</strong> {patient.name}
            </div>
            <div>
              <strong className="block text-slate-500 mb-1">Idade/Nascimento</strong> {patient.dob}
            </div>
            <div>
              <strong className="block text-slate-500 mb-1">Escolaridade</strong>{' '}
              {patient.education}
            </div>
            <div>
              <strong className="block text-slate-500 mb-1">Status na Clínica</strong>{' '}
              <Badge variant="outline">{patient.status}</Badge>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4" /> Dimensões Neurofuncionais (Última Avaliação)
            </h4>
            <div className="flex gap-3">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                Cognição: {patient.dimensions?.cognition.status}
              </Badge>
              <Badge variant="secondary" className="bg-rose-50 text-rose-700">
                Emoção: {patient.dimensions?.emotion.status}
              </Badge>
              <Badge variant="secondary" className="bg-amber-50 text-amber-700">
                Comportamento: {patient.dimensions?.behavior.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-t-4 border-t-rose-500 bg-rose-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-rose-800">
            <HeartPulse className="w-5 h-5 text-rose-500" /> VitalStrata™ Snapshot
          </CardTitle>
          <CardDescription>Reserva Funcional atrelada a este caso.</CardDescription>
        </CardHeader>
        <CardContent>
          {snapshot ? (
            <div className="space-y-4 text-center">
              <div className="relative flex items-center justify-center w-32 h-32 mx-auto">
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
                    strokeDashoffset={283 - (283 * snapshot.total_score) / 100}
                    strokeLinecap="round"
                    className="text-rose-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-800">{snapshot.total_score}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-left">
                <div className="bg-white p-2 rounded border">
                  <span className="text-slate-500 block text-[10px] uppercase">Reserva</span>
                  <span className="font-bold">{snapshot.reserve_level}</span>
                </div>
                <div className="bg-white p-2 rounded border">
                  <span className="text-slate-500 block text-[10px] uppercase">Tendência</span>
                  <span className="font-bold">{snapshot.trend}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-30" />
              Nenhum snapshot gerado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
