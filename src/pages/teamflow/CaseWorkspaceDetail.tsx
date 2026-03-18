import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  ActivitySquare,
  BrainCircuit,
  Network,
  ShieldCheck,
  FileSignature,
  CheckCircle2,
} from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { CasePipeline } from '@/components/teamflow/CasePipeline'
import { CaseOverviewTab } from '@/components/teamflow/CaseOverviewTab'
import { SpecialtyDataTab } from '@/components/teamflow/SpecialtyDataTab'
import { ConvergencePanelTab } from '@/components/teamflow/ConvergencePanelTab'
import { ValidationReportTab } from '@/components/teamflow/ValidationReportTab'
import { CaseAuditTab } from '@/components/teamflow/CaseAuditTab'

export default function CaseWorkspaceDetail() {
  const { id } = useParams()
  const { caseWorkspaces } = useTeamFlowStore()
  const { patients } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')

  const caseData = caseWorkspaces.find((cw) => cw.id === id)
  const patient = caseData ? patients.find((p) => p.id === caseData.patient_id) : null

  if (!caseData || !patient) return <div className="p-10 text-center">Caso não encontrado.</div>

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-primary"
        >
          <Link to="/teamflow/cases">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar a Casos
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm border-l-4 border-l-indigo-500">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 border-b pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{caseData.title}</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-700">Paciente:</span> {patient.name}
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-slate-700">Abertura:</span>{' '}
              {new Date(caseData.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>
          {caseData.status === 'Laudo Validado' && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg flex items-center gap-2 font-bold h-fit shadow-sm">
              <ShieldCheck className="w-5 h-5" /> Laudo Emitido e Selado
            </div>
          )}
        </div>

        <CasePipeline currentStatus={caseData.status} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6 h-auto p-1 bg-muted rounded-lg">
          <TabsTrigger value="overview" className="flex items-center gap-2 py-2">
            <ActivitySquare className="w-4 h-4" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger value="specialties" className="flex items-center gap-2 py-2">
            <BrainCircuit className="w-4 h-4" /> Coleta Estruturada
          </TabsTrigger>
          <TabsTrigger value="convergence" className="flex items-center gap-2 py-2">
            <Network className="w-4 h-4" /> Convergência
          </TabsTrigger>
          <TabsTrigger value="validation" className="flex items-center gap-2 py-2">
            <FileSignature className="w-4 h-4" /> Validação & Laudo
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2 py-2 text-emerald-700">
            <ShieldCheck className="w-4 h-4" /> Auditoria Trust Layer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="m-0 focus-visible:outline-none">
          <CaseOverviewTab caseData={caseData} patient={patient} />
        </TabsContent>
        <TabsContent value="specialties" className="m-0 focus-visible:outline-none">
          <SpecialtyDataTab caseId={caseData.id} />
        </TabsContent>
        <TabsContent value="convergence" className="m-0 focus-visible:outline-none">
          <ConvergencePanelTab caseId={caseData.id} />
        </TabsContent>
        <TabsContent value="validation" className="m-0 focus-visible:outline-none">
          <ValidationReportTab caseData={caseData} patient={patient} />
        </TabsContent>
        <TabsContent value="audit" className="m-0 focus-visible:outline-none">
          <CaseAuditTab caseId={caseData.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
