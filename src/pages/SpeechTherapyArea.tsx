import {
  MessageSquare,
  ClipboardCheck,
  BrainCircuit,
  Activity,
  Zap,
  FileText,
  Users,
  TrendingUp,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { BaselineTab } from '@/components/speech-therapy/BaselineTab'
import { AssessmentTab } from '@/components/speech-therapy/AssessmentTab'
import { NeurofunctionalTab } from '@/components/speech-therapy/NeurofunctionalTab'
import { RehabProtocolsTab } from '@/components/speech-therapy/RehabProtocolsTab'
import { EvolutionTab } from '@/components/speech-therapy/EvolutionTab'
import { QuickReportTab } from '@/components/speech-therapy/QuickReportTab'
import { MultiProfTab } from '@/components/speech-therapy/MultiProfTab'

export default function SpeechTherapyArea() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" /> Área Fonoaudiológica Integrada
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Ambiente dedicado à avaliação e reabilitação de distúrbios da linguagem e comunicação,
            correlacionados com dados neurofuncionais.
          </p>
        </div>
      </div>

      <Tabs defaultValue="baseline" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="baseline"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Baseline Fonoaudiológico
          </TabsTrigger>
          <TabsTrigger
            value="assessment"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <ClipboardCheck className="w-4 h-4" /> Biblioteca de Avaliação
          </TabsTrigger>
          <TabsTrigger
            value="neurofunctional"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <BrainCircuit className="w-4 h-4" /> Integração qEEG/PE
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
            <TrendingUp className="w-4 h-4" /> Monitoramento de Evolução
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
            <BaselineTab />
          </TabsContent>
          <TabsContent value="assessment" className="m-0 focus-visible:outline-none">
            <AssessmentTab />
          </TabsContent>
          <TabsContent value="neurofunctional" className="m-0 focus-visible:outline-none">
            <NeurofunctionalTab />
          </TabsContent>
          <TabsContent value="protocols" className="m-0 focus-visible:outline-none">
            <RehabProtocolsTab />
          </TabsContent>
          <TabsContent value="evolution" className="m-0 focus-visible:outline-none">
            <EvolutionTab />
          </TabsContent>
          <TabsContent value="multiprof" className="m-0 focus-visible:outline-none">
            <MultiProfTab />
          </TabsContent>
          <TabsContent value="report" className="m-0 focus-visible:outline-none">
            <QuickReportTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
