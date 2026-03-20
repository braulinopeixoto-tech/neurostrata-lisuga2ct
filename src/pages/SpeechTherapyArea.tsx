import { useState, useEffect } from 'react'
import {
  MessageSquare,
  ClipboardCheck,
  BrainCircuit,
  Activity,
  Zap,
  FileText,
  Users,
  TrendingUp,
  UserCircle,
  ShieldCheck,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'

import { BaselineTab } from '@/components/speech-therapy/BaselineTab'
import { AssessmentTab } from '@/components/speech-therapy/AssessmentTab'
import { NeurofunctionalTab } from '@/components/speech-therapy/NeurofunctionalTab'
import { RehabProtocolsTab } from '@/components/speech-therapy/RehabProtocolsTab'
import { EvolutionTab } from '@/components/speech-therapy/EvolutionTab'
import { QuickReportTab } from '@/components/speech-therapy/QuickReportTab'
import { MultiProfTab } from '@/components/speech-therapy/MultiProfTab'

export default function SpeechTherapyArea() {
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')

  useEffect(() => {
    if (!selectedPatientId && patients.length > 0) {
      setSelectedPatientId(patients[0].id)
    }
  }, [patients, selectedPatientId])

  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" /> Área Fonoaudiológica Integrada
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Avaliação e reabilitação de distúrbios da comunicação, conectadas ao{' '}
            <strong className="text-slate-700">Módulo RDoC</strong> e auditadas pela{' '}
            <strong className="text-emerald-600">Trust Layer™</strong>.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto bg-slate-50 p-4 rounded-lg border">
          <Label className="text-sm font-semibold flex items-center gap-2 text-primary">
            <UserCircle className="w-4 h-4" /> Paciente em Atendimento
          </Label>
          <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
            <SelectTrigger className="w-full md:w-[250px] bg-white">
              <SelectValue placeholder="Selecione um paciente..." />
            </SelectTrigger>
            <SelectContent>
              {patients.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedPatientId ? (
        <Tabs defaultValue="baseline" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
            <TabsTrigger
              value="baseline"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
            >
              <Activity className="w-4 h-4" /> Baseline (RDoC)
            </TabsTrigger>
            <TabsTrigger
              value="assessment"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
            >
              <ClipboardCheck className="w-4 h-4" /> Avaliação & Trust Layer
            </TabsTrigger>
            <TabsTrigger
              value="neurofunctional"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
            >
              <BrainCircuit className="w-4 h-4" /> Integração qEEG/VitalScore
            </TabsTrigger>
            <TabsTrigger
              value="protocols"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
            >
              <Zap className="w-4 h-4" /> Protocolos de Reabilitação
            </TabsTrigger>
            <TabsTrigger
              value="evolution"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4" /> Monitoramento
            </TabsTrigger>
            <TabsTrigger
              value="multiprof"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
            >
              <Users className="w-4 h-4" /> Visão Multiprofissional
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" /> Quick Report
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="baseline" className="m-0 focus-visible:outline-none">
              <BaselineTab patientId={selectedPatientId} />
            </TabsContent>
            <TabsContent value="assessment" className="m-0 focus-visible:outline-none">
              <AssessmentTab patientId={selectedPatientId} />
            </TabsContent>
            <TabsContent value="neurofunctional" className="m-0 focus-visible:outline-none">
              <NeurofunctionalTab patientId={selectedPatientId} />
            </TabsContent>
            <TabsContent value="protocols" className="m-0 focus-visible:outline-none">
              <RehabProtocolsTab patientId={selectedPatientId} />
            </TabsContent>
            <TabsContent value="evolution" className="m-0 focus-visible:outline-none">
              <EvolutionTab patientId={selectedPatientId} />
            </TabsContent>
            <TabsContent value="multiprof" className="m-0 focus-visible:outline-none">
              <MultiProfTab patientId={selectedPatientId} />
            </TabsContent>
            <TabsContent value="report" className="m-0 focus-visible:outline-none">
              <QuickReportTab patientId={selectedPatientId} />
            </TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="p-12 text-center text-muted-foreground bg-slate-50 border border-dashed rounded-xl">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
          Selecione um paciente para iniciar o fluxo fonoaudiológico integrado.
        </div>
      )}
    </div>
  )
}
