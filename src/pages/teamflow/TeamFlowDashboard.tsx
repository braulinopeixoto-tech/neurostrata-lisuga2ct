import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import {
  Network,
  Users,
  Layers,
  FileCheck,
  ArrowRight,
  BrainCircuit,
  Edit2,
  ShieldCheck,
  Plus,
} from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { ClinicSettingsModal } from '@/components/teamflow/ClinicSettingsModal'
import { NewNeuroModelModal } from '@/components/neuromodel/NewNeuroModelModal'

export default function TeamFlowDashboard() {
  const { organization, caseWorkspaces, teamMembers } = useTeamFlowStore()
  const { patients } = useAppStore()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [newModelOpen, setNewModelOpen] = useState(false)

  const pendingCases = caseWorkspaces.filter((c) => c.status !== 'Laudo Validado')

  const getPatientName = (id: string) => patients.find((p) => p.id === id)?.name || id

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-elevation relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Layers className="w-64 h-64 -mt-10 -mr-10 text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 uppercase tracking-widest text-[10px]">
              {organization.name} | {organization.crm}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white"
              onClick={() => setSettingsOpen(true)}
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-400" /> Command Center (BIM Clínico)
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Infraestrutura de engenharia diagnóstica. Trate cada paciente como um NeuroModel
            multicamadas, integrando evidências, fluxos de equipe e validação auditável.
          </p>
        </div>
        <div className="flex gap-3 relative z-10 w-full sm:w-auto">
          <Button
            asChild
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white flex-1 sm:flex-none"
          >
            <Link to="/teamflow/team">
              <Users className="w-4 h-4 mr-2" /> Equipe
            </Link>
          </Button>
          <Button
            onClick={() => setNewModelOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4 mr-2" /> Novo NeuroModel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
              <span>Modelos Ativos</span>
              <Layers className="w-4 h-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCases.length}</div>
            <p className="text-xs text-muted-foreground mt-1">NeuroModels em construção</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
              <span>Laudos Compilados</span>
              <FileCheck className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Versionados na Trust Layer™</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
              <span>Especialistas Integrados</span>
              <Users className="w-4 h-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Colaborando no ecossistema</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-indigo-600" /> Fila de Convergência e Validação
        </h2>
        <Button asChild variant="ghost" size="sm" className="text-indigo-600">
          <Link to="/teamflow/cases">
            Ver Todos os Modelos <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pendingCases.map((cw) => (
          <Card
            key={cw.id}
            className="shadow-sm hover:shadow-md transition-shadow group border-l-4 border-l-indigo-500"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors">
                    {cw.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Paciente:{' '}
                    <span className="font-semibold text-slate-700">
                      {getPatientName(cw.patient_id)}
                    </span>
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 text-indigo-700 border-indigo-200"
                >
                  {cw.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Integridade dos Dados (BIM)</span>
                    <span className="text-emerald-600">{cw.consistency_score}%</span>
                  </div>
                  <Progress
                    value={cw.consistency_score}
                    className="h-1.5 bg-emerald-100 [&>div]:bg-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Risco Clínico</span>
                    <span className="text-rose-600">{cw.risk_score}%</span>
                  </div>
                  <Progress
                    value={cw.risk_score}
                    className="h-1.5 bg-rose-100 [&>div]:bg-rose-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  asChild
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <Link to={`/teamflow/cases/${cw.id}`}>
                    <Layers className="w-4 h-4 mr-2" /> Acessar NeuroModel
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {pendingCases.length === 0 && (
          <div className="lg:col-span-2 text-center p-12 bg-slate-50 border border-dashed rounded-xl text-muted-foreground">
            Nenhum NeuroModel em aberto na fila.
          </div>
        )}
      </div>

      <Alert className="bg-slate-50 border-slate-200 shadow-sm mt-8">
        <ShieldCheck className="h-4 w-4 !text-indigo-600" />
        <AlertTitle className="text-slate-800 font-semibold">
          BIM Clínico (Building Information Modeling)
        </AlertTitle>
        <AlertDescription className="text-slate-600 mt-2 text-sm leading-relaxed text-justify">
          Assim como na engenharia o BIM centraliza informações físicas e funcionais de uma obra, o{' '}
          <strong>NeuroModel</strong> centraliza 17 camadas de dados neurofuncionais do paciente.
          Cada inserção altera o modelo global, detectando incompatibilidades ("clashes"
          diagnósticos) e convergindo para um laudo estruturado auditável via Trust Layer™.
        </AlertDescription>
      </Alert>

      <ClinicSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      <NewNeuroModelModal open={newModelOpen} onOpenChange={setNewModelOpen} />
    </div>
  )
}
