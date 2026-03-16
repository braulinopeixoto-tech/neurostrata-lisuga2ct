import { Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Stethoscope, FlaskConical, TrendingUp, Cpu, Scale, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ClinicalHubTab } from '@/components/medical/ClinicalHubTab'
import { DiagnosticsTab } from '@/components/medical/DiagnosticsTab'
import { MonitoringTab } from '@/components/medical/MonitoringTab'
import { AutomationTab } from '@/components/medical/AutomationTab'
import { GovernanceTab } from '@/components/medical/GovernanceTab'

export default function MedicalArea() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-accent" /> Área Médica
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Hub integrado de conhecimento clínico, fluxo diagnóstico, monitoramento e governança
            legal.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link to="/assessment">
            <Brain className="w-5 h-5 mr-2" /> Área de Nova Avaliação
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="hub" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="hub"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Stethoscope className="w-4 h-4" /> Hub Clínico Integrado
          </TabsTrigger>
          <TabsTrigger
            value="diagnostics"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <FlaskConical className="w-4 h-4" /> Fluxo de Exames e Diagnóstico
          </TabsTrigger>
          <TabsTrigger
            value="monitoring"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4" /> Monitoramento e Evolução
          </TabsTrigger>
          <TabsTrigger
            value="automation"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Cpu className="w-4 h-4" /> Automação e Documentação
          </TabsTrigger>
          <TabsTrigger
            value="governance"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Scale className="w-4 h-4" /> Governança e Portais
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="hub" className="m-0 focus-visible:outline-none">
            <ClinicalHubTab />
          </TabsContent>
          <TabsContent value="diagnostics" className="m-0 focus-visible:outline-none">
            <DiagnosticsTab />
          </TabsContent>
          <TabsContent value="monitoring" className="m-0 focus-visible:outline-none">
            <MonitoringTab />
          </TabsContent>
          <TabsContent value="automation" className="m-0 focus-visible:outline-none">
            <AutomationTab />
          </TabsContent>
          <TabsContent value="governance" className="m-0 focus-visible:outline-none">
            <GovernanceTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
