import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Network,
  Users,
  Activity,
  FileCheck,
  ArrowRight,
  ActivitySquare,
  BrainCircuit,
  Edit2,
} from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import { ClinicSettingsModal } from '@/components/teamflow/ClinicSettingsModal'

export default function TeamFlowDashboard() {
  const { organization, caseWorkspaces, teamMembers } = useTeamFlowStore()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const pendingCases = caseWorkspaces.filter((c) => c.status !== 'Laudo Validado')

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className="bg-indigo-50 text-indigo-700 border-indigo-200 uppercase tracking-widest text-[10px]"
            >
              {organization.name} | {organization.crm}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-muted-foreground hover:text-indigo-600"
              onClick={() => setSettingsOpen(true)}
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-indigo-900 flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-500" /> Meu Núcleo (TeamFlow™)
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            Gestão translacional da sua equipe multidisciplinar, delegação de avaliações e validação
            de diagnósticos.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
          >
            <Link to="/teamflow/team">
              <Users className="w-4 h-4 mr-2" /> Gerir Equipe
            </Link>
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link to="/teamflow/cases">
              <ActivitySquare className="w-4 h-4 mr-2" /> Casos Abertos
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
              <span>Membros da Equipe</span>
              <Users className="w-4 h-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Especialistas conectados</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
              <span>Workspaces em Andamento</span>
              <Activity className="w-4 h-4 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCases.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando convergência</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
              <span>Laudos Consolidados</span>
              <FileCheck className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Assinados via Trust Layer™</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600" /> Fila de Validação Diagnóstica
          </CardTitle>
          <CardDescription>
            Casos que já passaram pela coleta da equipe e aguardam sua revisão médica final.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingCases.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 border border-dashed rounded-lg text-muted-foreground">
              Nenhum caso na fila de validação.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingCases.map((cw) => (
                <div
                  key={cw.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800">{cw.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      ID Paciente: {cw.patient_id} • Status: {cw.status}
                    </p>
                  </div>
                  <Button asChild size="sm" variant="secondary" className="mt-3 sm:mt-0">
                    <Link to={`/teamflow/cases/${cw.id}`}>
                      Revisar Caso <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ClinicSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}
