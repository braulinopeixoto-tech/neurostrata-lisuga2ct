import {
  FlaskConical,
  Activity,
  BriefcaseMedical,
  TestTube,
  Network,
  ShieldCheck,
  History,
  Dna,
  Microscope,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MetabolicAxisTab } from '@/components/pharmacopeia/MetabolicAxisTab'
import { ExamsTab } from '@/components/pharmacopeia/ExamsTab'
import { InterventionsTab } from '@/components/pharmacopeia/InterventionsTab'
import { PartnerNetworkTab } from '@/components/pharmacopeia/PartnerNetworkTab'
import { IntegratedReportTab } from '@/components/pharmacopeia/IntegratedReportTab'
import { AuditLogTab } from '@/components/pharmacopeia/AuditLogTab'
import { PharmacogeneticsTab } from '@/components/genetics/PharmacogeneticsTab'
import { NutrigeneticsTab } from '@/components/genetics/NutrigeneticsTab'

export default function Pharmacopeia() {
  return (
    <div className="space-y-6 animate-fade-in-up pb-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <FlaskConical className="w-8 h-8 text-accent" /> Gestão Metabólica
        </h1>
        <p className="text-muted-foreground mt-1">
          Coordenação de evidências clínicas, resultados laboratoriais e intervenções funcionais em
          um ambiente neutro, rastreável e auditável.
        </p>
      </div>

      <Alert
        variant="default"
        className="bg-blue-50/50 border-blue-200 text-blue-900 shadow-sm mt-4"
      >
        <ShieldCheck className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800">
          Garantia de Neutralidade e Rastreabilidade (LGPD)
        </AlertTitle>
        <AlertDescription className="text-sm mt-1">
          Este módulo promove uma ponte segura entre a validação metabólica e a execução
          terapêutica. A escolha da entidade parceira (laboratório ou farmácia de manipulação)
          permanece exclusivamente de livre arbítrio do paciente/profissional. Todas as decisões são
          imutáveis e auditadas pela Trust Layer™.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="metabolic" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="metabolic"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Eixo Metabólico
          </TabsTrigger>
          <TabsTrigger
            value="exams"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <TestTube className="w-4 h-4" /> Exames
          </TabsTrigger>
          <TabsTrigger
            value="interventions"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <BriefcaseMedical className="w-4 h-4" /> Intervenções
          </TabsTrigger>
          <TabsTrigger
            value="network"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Network className="w-4 h-4" /> Rede Parceira
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <History className="w-4 h-4" /> Log de Auditoria
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4" /> Relatório Dossiê
          </TabsTrigger>
          <TabsTrigger
            value="pharmacogenetics"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Dna className="w-4 h-4" /> Farmacogenética
          </TabsTrigger>
          <TabsTrigger
            value="nutrigenetics"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Microscope className="w-4 h-4" /> Nutrigenética & Metabolômica
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metabolic" className="m-0 focus-visible:outline-none">
          <MetabolicAxisTab />
        </TabsContent>
        <TabsContent value="exams" className="m-0 focus-visible:outline-none">
          <ExamsTab />
        </TabsContent>
        <TabsContent value="interventions" className="m-0 focus-visible:outline-none">
          <InterventionsTab />
        </TabsContent>
        <TabsContent value="network" className="m-0 focus-visible:outline-none">
          <PartnerNetworkTab />
        </TabsContent>
        <TabsContent value="audit" className="m-0 focus-visible:outline-none">
          <AuditLogTab />
        </TabsContent>
        <TabsContent value="report" className="m-0 focus-visible:outline-none">
          <IntegratedReportTab />
        </TabsContent>
        <TabsContent value="pharmacogenetics" className="m-0 focus-visible:outline-none">
          <PharmacogeneticsTab />
        </TabsContent>
        <TabsContent value="nutrigenetics" className="m-0 focus-visible:outline-none">
          <NutrigeneticsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
