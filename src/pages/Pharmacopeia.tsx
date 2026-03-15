import { FlaskConical, BookOpen, GraduationCap, PenTool } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LibraryTab } from '@/components/pharmacopeia/LibraryTab'
import { ReferenceTab } from '@/components/pharmacopeia/ReferenceTab'
import { MyFormulasTab } from '@/components/pharmacopeia/MyFormulasTab'

export default function Pharmacopeia() {
  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <FlaskConical className="w-8 h-8 text-accent" /> Farmacopeia Neurofuncional
        </h1>
        <p className="text-muted-foreground mt-1">
          Biblioteca de protocolos clínicos, guias de referência e gestão de composições magistrais.
        </p>
      </div>

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="library"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <BookOpen className="w-4 h-4" /> Protocolos Clínicos (37)
          </TabsTrigger>
          <TabsTrigger
            value="reference"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <GraduationCap className="w-4 h-4" /> Centro de Referência
          </TabsTrigger>
          <TabsTrigger
            value="my-formulas"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <PenTool className="w-4 h-4" /> Minhas Fórmulas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="m-0 focus-visible:outline-none">
          <LibraryTab />
        </TabsContent>
        <TabsContent value="reference" className="m-0 focus-visible:outline-none mt-6">
          <ReferenceTab />
        </TabsContent>
        <TabsContent value="my-formulas" className="m-0 focus-visible:outline-none">
          <MyFormulasTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
