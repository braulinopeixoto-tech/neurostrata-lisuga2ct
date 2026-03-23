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
  Lock,
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
import { TrustLayerTab } from '@/components/neuropsychology/TrustLayerTab'

export default function NeuropsychologyArea() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up mt-4">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" /> Área Neuropsicológica
          </h1>
          <p className="text-muted-foreground mt-2 text-base max-w-2xl">
            Ambiente especializado para inputs neuropsicológicos. Os dados coletados aqui alimentam
            o <strong>Núcleo Diagnóstico</strong> global da plataforma.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0 bg-primary hover:bg-primary/90">
          <Link to="/clinical-journey">
            <ActivitySquare className="w-5 h-5 mr-2" /> Iniciar Jornada Clínica
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="supervision" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="supervision"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap font-semibold"
          >
            <ShieldCheck className="w-4 h-4" /> Painel de Supervisão
          </TabsTrigger>
          <TabsTrigger
            value="hub"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ActivitySquare className="w-4 h-4" /> Baterias Coletadas
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" /> Biblioteca Psicométrica
          </TabsTrigger>
          <TabsTrigger
            value="protocols"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Protocolos Neuro
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="supervision" className="m-0 focus-visible:outline-none">
            <SupervisionPanelTab />
          </TabsContent>
          <TabsContent value="hub" className="m-0 focus-visible:outline-none">
            <AssessmentHubTab />
          </TabsContent>
          <TabsContent value="library" className="m-0 focus-visible:outline-none">
            <PsychometricLibraryTab />
          </TabsContent>
          <TabsContent value="protocols" className="m-0 focus-visible:outline-none">
            <ProtocolLibraryTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
