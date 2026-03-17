import { FlaskConical, Stethoscope, Activity, Users, FileText, AlertTriangle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BaselineTab } from '@/components/pharmacopeia/BaselineTab'
import { BuilderTab } from '@/components/pharmacopeia/BuilderTab'
import { MonitoringTab } from '@/components/pharmacopeia/MonitoringTab'
import { CollaborationTab } from '@/components/pharmacopeia/CollaborationTab'
import { ReportTab } from '@/components/pharmacopeia/ReportTab'

export default function Pharmacopeia() {
  return (
    <div className="space-y-6 animate-fade-in-up pb-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <FlaskConical className="w-8 h-8 text-accent" /> Fármaco Clínico & Formulações
        </h1>
        <p className="text-muted-foreground mt-1">
          Ambiente dedicado para desenvolvimento de fórmulas magistrais e integração neurofuncional.
        </p>
      </div>

      <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800 shadow-sm">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="font-bold">
          Ferramenta de Suporte Clínico Multidisciplinar
        </AlertTitle>
        <AlertDescription className="text-sm">
          Este módulo é destinado ao suporte à decisão da equipe. Todas as fórmulas magistrais e
          condutas terapêuticas geradas aqui exigem validação rigorosa e prescrição oficial pelo
          profissional médico habilitado antes do uso pelo paciente.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="baseline" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="baseline"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Stethoscope className="w-4 h-4" /> Baseline Funcional
          </TabsTrigger>
          <TabsTrigger
            value="builder"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <FlaskConical className="w-4 h-4" /> Construtor de Fórmulas
          </TabsTrigger>
          <TabsTrigger
            value="monitoring"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Activity className="w-4 h-4" /> Monitoramento & qEEG
          </TabsTrigger>
          <TabsTrigger
            value="collaboration"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Users className="w-4 h-4" /> Integração Interprofissional
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <FileText className="w-4 h-4" /> Quick Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="baseline" className="m-0 focus-visible:outline-none">
          <BaselineTab />
        </TabsContent>
        <TabsContent value="builder" className="m-0 focus-visible:outline-none">
          <BuilderTab />
        </TabsContent>
        <TabsContent value="monitoring" className="m-0 focus-visible:outline-none">
          <MonitoringTab />
        </TabsContent>
        <TabsContent value="collaboration" className="m-0 focus-visible:outline-none">
          <CollaborationTab />
        </TabsContent>
        <TabsContent value="report" className="m-0 focus-visible:outline-none">
          <ReportTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
