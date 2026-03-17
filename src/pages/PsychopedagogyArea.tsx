import { GraduationCap, ClipboardCheck, School, Target, FileText, Activity } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { BaselineTab } from '@/components/psychopedagogy/BaselineTab'
import { AssessmentTab } from '@/components/psychopedagogy/AssessmentTab'
import { IntegrationTab } from '@/components/psychopedagogy/IntegrationTab'
import { SchoolInterfaceTab } from '@/components/psychopedagogy/SchoolInterfaceTab'
import { InterventionDashboardTab } from '@/components/psychopedagogy/InterventionDashboardTab'
import { QuickReportTab } from '@/components/psychopedagogy/QuickReportTab'

export default function PsychopedagogyArea() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-indigo-600" /> Área Integrada de Psicopedagogia
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Ambiente dedicado à avaliação de dificuldades de aprendizagem, monitoramento cognitivo e
            interface direta com a coordenação escolar baseada em dados neurofuncionais.
          </p>
        </div>
      </div>

      <Tabs defaultValue="baseline" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="baseline"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Baseline Escolar
          </TabsTrigger>
          <TabsTrigger
            value="assessment"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ClipboardCheck className="w-4 h-4" /> Biblioteca de Avaliação
          </TabsTrigger>
          <TabsTrigger
            value="integration"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Hub de Integração Clínica
          </TabsTrigger>
          <TabsTrigger
            value="school"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <School className="w-4 h-4" /> Interface Escola
          </TabsTrigger>
          <TabsTrigger
            value="intervention"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Target className="w-4 h-4" /> Plano e Dashboard de Intervenção
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <FileText className="w-4 h-4" /> Gerador Quick Report
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="baseline" className="m-0 focus-visible:outline-none">
            <BaselineTab />
          </TabsContent>
          <TabsContent value="assessment" className="m-0 focus-visible:outline-none">
            <AssessmentTab />
          </TabsContent>
          <TabsContent value="integration" className="m-0 focus-visible:outline-none">
            <IntegrationTab />
          </TabsContent>
          <TabsContent value="school" className="m-0 focus-visible:outline-none">
            <SchoolInterfaceTab />
          </TabsContent>
          <TabsContent value="intervention" className="m-0 focus-visible:outline-none">
            <InterventionDashboardTab />
          </TabsContent>
          <TabsContent value="report" className="m-0 focus-visible:outline-none">
            <QuickReportTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
