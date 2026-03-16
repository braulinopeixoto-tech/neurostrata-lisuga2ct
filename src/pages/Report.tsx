import { FileText, Download, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { TabIdentification } from '@/components/report/TabIdentification'
import { TabEvaluation } from '@/components/report/TabEvaluation'
import { TabBiomarkers } from '@/components/report/TabBiomarkers'
import { TabConclusion } from '@/components/report/TabConclusion'
import { ReportPreviewDocument } from '@/components/report/ReportPreviewDocument'
import { ReportStoreProvider } from '@/stores/useReportStore'

export default function ReportPage() {
  return (
    <ReportStoreProvider>
      <ReportBuilder />
    </ReportStoreProvider>
  )
}

function ReportBuilder() {
  const handleExport = (format: string) => {
    toast({
      title: `${format} Gerado`,
      description: 'O documento foi compilado e baixado com sucesso.',
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border-b sticky top-16 z-20 shadow-sm rounded-lg">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-accent" /> Editor de Laudo Dimensional
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Integração Neurofuncional de 17 Blocos (Padrão NeuroStrata)
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 sm:flex-auto"
            onClick={() => handleExport('PDF (Resumo Clínico)')}
          >
            <Download className="w-4 h-4 mr-2" /> PDF Clínico
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-auto"
            onClick={() => handleExport('PDF (Laudo Completo)')}
          >
            <FileCheck className="w-4 h-4 mr-2" /> PDF Completo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="b1" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto gap-2 p-2 bg-muted/30 border">
          <TabsTrigger value="b1" className="py-2">
            1. Identificação
          </TabsTrigger>
          <TabsTrigger value="b2" className="py-2">
            2. Avaliação
          </TabsTrigger>
          <TabsTrigger value="b3" className="py-2">
            3. Biomarcadores
          </TabsTrigger>
          <TabsTrigger value="b4" className="py-2">
            4. Conclusão
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="py-2 bg-primary/5 text-primary border border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Visualização Final
          </TabsTrigger>
        </TabsList>

        <TabsContent value="b1" className="mt-6">
          <TabIdentification />
        </TabsContent>
        <TabsContent value="b2" className="mt-6">
          <TabEvaluation />
        </TabsContent>
        <TabsContent value="b3" className="mt-6">
          <TabBiomarkers />
        </TabsContent>
        <TabsContent value="b4" className="mt-6">
          <TabConclusion />
        </TabsContent>
        <TabsContent value="preview" className="mt-6">
          <ReportPreviewDocument />
        </TabsContent>
      </Tabs>
    </div>
  )
}
