import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Brain,
  ActivitySquare,
  BookOpen,
  Map as MapIcon,
  ShieldCheck,
  Activity,
  Stethoscope,
  Bot,
  FileText,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

import { AssessmentHubTab } from '@/components/neuropsychology/AssessmentHubTab'
import { SupervisionPanelTab } from '@/components/neuropsychology/SupervisionPanelTab'
import { ProtocolLibraryTab } from '@/components/neuropsychology/ProtocolLibraryTab'
import { StressTestTab } from '@/components/neuropsychology/StressTestTab'
import { DiagnosisFlowTab } from '@/components/neuropsychology/DiagnosisFlowTab'
import { PredictiveIntelligenceTab } from '@/components/neuropsychology/PredictiveIntelligenceTab'
import { QuickReportTab } from '@/components/neuropsychology/QuickReportTab'
import { PsychometricLibraryTab } from '@/components/neuropsychology/PsychometricLibraryTab'
import { MonitoringEvolutionTab } from '@/components/neuropsychology/MonitoringEvolutionTab'

export default function NeuropsychologyArea() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Brain className="w-8 h-8 text-accent" /> Área Neuropsicológica
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Hub centralizado para avaliação psicométrica, supervisão de check-ups, protocolos de
            reabilitação e inteligência preditiva.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link to="/assessment">
            <ActivitySquare className="w-5 h-5 mr-2" /> Nova Avaliação
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="hub" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="hub"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ActivitySquare className="w-4 h-4" /> Hub de Avaliação
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" /> Biblioteca Psicométrica
          </TabsTrigger>
          <TabsTrigger
            value="neuronavigation"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <MapIcon className="w-4 h-4" /> Neuronavegação Guiada
          </TabsTrigger>
          <TabsTrigger
            value="supervision"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4" /> Painel de Supervisão
          </TabsTrigger>
          <TabsTrigger
            value="protocols"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" /> Biblioteca de Protocolos
          </TabsTrigger>
          <TabsTrigger
            value="stress_test"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Stress Test Real-Time
          </TabsTrigger>
          <TabsTrigger
            value="diagnosis_flow"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Stethoscope className="w-4 h-4" /> Fluxo de Exames
          </TabsTrigger>
          <TabsTrigger
            value="monitoring"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4" /> Monitoramento e Evolução
          </TabsTrigger>
          <TabsTrigger
            value="intelligence"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Bot className="w-4 h-4" /> Inteligência Preditiva
          </TabsTrigger>
          <TabsTrigger
            value="quick_report"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <FileText className="w-4 h-4" /> Quick Report
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="hub" className="m-0 focus-visible:outline-none">
            <AssessmentHubTab />
          </TabsContent>
          <TabsContent value="library" className="m-0 focus-visible:outline-none">
            <PsychometricLibraryTab />
          </TabsContent>
          <TabsContent value="neuronavigation" className="m-0 focus-visible:outline-none">
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed shadow-sm text-center">
              <MapIcon className="w-16 h-16 text-blue-500 mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Neuronavegação Guiada</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Acesse o ambiente especializado de mapeamento e meta-análise automatizada via
                Neurosynth para planejamento de procedimentos e neuromodulação.
              </p>
              <Button asChild>
                <Link to="/neuronavigation">Ir para Neuronavegação</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="supervision" className="m-0 focus-visible:outline-none">
            <SupervisionPanelTab />
          </TabsContent>
          <TabsContent value="protocols" className="m-0 focus-visible:outline-none">
            <ProtocolLibraryTab />
          </TabsContent>
          <TabsContent value="stress_test" className="m-0 focus-visible:outline-none">
            <StressTestTab />
          </TabsContent>
          <TabsContent value="diagnosis_flow" className="m-0 focus-visible:outline-none">
            <DiagnosisFlowTab />
          </TabsContent>
          <TabsContent value="monitoring" className="m-0 focus-visible:outline-none">
            <MonitoringEvolutionTab />
          </TabsContent>
          <TabsContent value="intelligence" className="m-0 focus-visible:outline-none">
            <PredictiveIntelligenceTab />
          </TabsContent>
          <TabsContent value="quick_report" className="m-0 focus-visible:outline-none">
            <QuickReportTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
