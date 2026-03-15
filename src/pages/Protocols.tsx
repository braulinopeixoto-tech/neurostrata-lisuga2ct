import { Brain, Bot, Network, Zap } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ModularLibraryTab } from '@/components/protocols/ModularLibraryTab'
import { AIProtocolBuilderTab } from '@/components/protocols/AIProtocolBuilderTab'
import { SimulationLearningTab } from '@/components/protocols/SimulationLearningTab'

export default function Protocols() {
  return (
    <div className="space-y-6 animate-fade-in-up pb-10 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Brain className="w-8 h-8 text-accent" /> Biblioteca Inteligente de Protocolos
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Transição de técnicas isoladas para sequenciamento terapêutico estruturado, orientado
            por redes e validado por evidência científica.
          </p>
        </div>
      </div>

      <Tabs defaultValue="workflow" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="workflow"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Bot className="w-4 h-4" /> Construtor IA & Estratégia Sequencial
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Zap className="w-4 h-4" /> Biblioteca Modular Integrada
          </TabsTrigger>
          <TabsTrigger
            value="learning"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Network className="w-4 h-4" /> Simulação & Aprendizado Clínico
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="workflow" className="m-0 focus-visible:outline-none">
            <AIProtocolBuilderTab />
          </TabsContent>

          <TabsContent value="library" className="m-0 focus-visible:outline-none">
            <ModularLibraryTab />
          </TabsContent>

          <TabsContent value="learning" className="m-0 focus-visible:outline-none">
            <SimulationLearningTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
