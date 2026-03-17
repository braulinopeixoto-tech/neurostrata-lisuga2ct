import { Apple, ActivitySquare, BookOpen, Brain, Activity, LineChart, FileText } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { AssessmentHubTab } from '@/components/nutrition/AssessmentHubTab'
import { ProtocolLibraryTab } from '@/components/nutrition/ProtocolLibraryTab'
import { NeuronutritionEngineTab } from '@/components/nutrition/NeuronutritionEngineTab'
import { ExamsBiomarkersTab } from '@/components/nutrition/ExamsBiomarkersTab'
import { SupervisionDashboardTab } from '@/components/nutrition/SupervisionDashboardTab'
import { MetabolicStressTab } from '@/components/nutrition/MetabolicStressTab'
import { TrustLayerReportTab } from '@/components/nutrition/TrustLayerReportTab'

export default function NutritionArea() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Apple className="w-8 h-8 text-green-600" /> Área de Nutrição Funcional Integrada
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Centro de correlação entre dados metabólicos e função neuropsicológica, visando o eixo
            intestino-cérebro.
          </p>
        </div>
      </div>

      <Tabs defaultValue="assessment" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="assessment"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ActivitySquare className="w-4 h-4" /> Avaliação Nutricional
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" /> Biblioteca Funcional
          </TabsTrigger>
          <TabsTrigger
            value="engine"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Brain className="w-4 h-4" /> Motor de Neuronutrição
          </TabsTrigger>
          <TabsTrigger
            value="exams"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Exames e Biomarcadores
          </TabsTrigger>
          <TabsTrigger
            value="supervision"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ActivitySquare className="w-4 h-4" /> Painel de Supervisão
          </TabsTrigger>
          <TabsTrigger
            value="stress"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <LineChart className="w-4 h-4" /> Stress Metabólico
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <FileText className="w-4 h-4" /> Laudos Trust Layer™
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="assessment" className="m-0 focus-visible:outline-none">
            <AssessmentHubTab />
          </TabsContent>
          <TabsContent value="library" className="m-0 focus-visible:outline-none">
            <ProtocolLibraryTab />
          </TabsContent>
          <TabsContent value="engine" className="m-0 focus-visible:outline-none">
            <NeuronutritionEngineTab />
          </TabsContent>
          <TabsContent value="exams" className="m-0 focus-visible:outline-none">
            <ExamsBiomarkersTab />
          </TabsContent>
          <TabsContent value="supervision" className="m-0 focus-visible:outline-none">
            <SupervisionDashboardTab />
          </TabsContent>
          <TabsContent value="stress" className="m-0 focus-visible:outline-none">
            <MetabolicStressTab />
          </TabsContent>
          <TabsContent value="report" className="m-0 focus-visible:outline-none">
            <TrustLayerReportTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
