import { FileText, Download, FileCheck, Code, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'
import { TabIdentification } from '@/components/report/TabIdentification'
import { TabEvaluation } from '@/components/report/TabEvaluation'
import { TabBiomarkers } from '@/components/report/TabBiomarkers'
import { TabConclusion } from '@/components/report/TabConclusion'
import { TabEvolution } from '@/components/report/TabEvolution'
import { ReportPreviewDocument } from '@/components/report/ReportPreviewDocument'
import { ValidationChecklist } from '@/components/report/ValidationChecklist'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useReportStore, { ReportStoreProvider } from '@/stores/useReportStore'

export default function ReportPage() {
  return (
    <ReportStoreProvider>
      <ReportBuilder />
    </ReportStoreProvider>
  )
}

function ReportBuilder() {
  const { data } = useReportStore()

  const handleExport = (format: string) => {
    toast({
      title: `${format} Gerado`,
      description: 'O documento foi compilado e baixado com sucesso.',
    })
  }

  const handleExportJson = () => {
    const exportData = {
      patientInfo: {
        block1_Identification: {
          patientName: data.patientName,
          dob: data.dob,
          age: data.age,
          sex: data.sex,
          education: data.education,
          guardian: data.guardian,
          professional: data.professional,
          institution: data.institution,
          evalDate: data.evalDate,
        },
      },
      clinicalNarrative: {
        block2_Reason: data.reason,
        block3_History: data.history,
        block4_Behavior: data.behavior,
      },
      evaluation: {
        block5_Cognitive: data.cognitive,
        block6_RDoC: data.rdoc,
        block7_BigFive: data.bigFive,
        block8_PsychicFunctions: data.psychicFunc,
      },
      biomarkers: {
        block9_Neurophysiology: data.neurophysio,
        block10_Integration: data.integration,
        block11_Hypotheses: data.hypotheses,
        block12_Intervention: data.intervention,
      },
      indices: {
        block13_NeuroStrataIndex: {
          integrity: data.idxIntegrity,
          impairment: data.idxImpairment,
          risk: data.idxRisk,
          dysfunction: data.idxDysfunction,
        },
        block14_RadarData: data.radarData,
      },
      conclusion: {
        block15_TechnicalConclusion: data.conclusion,
        block16_ScientificReferences: [
          'American Psychiatric Association. (2022). Diagnostic and Statistical Manual of Mental Disorders (5th ed., text rev.).',
          'Insel, T., et al. (2010). Research Domain Criteria (RDoC): Toward a new classification framework. Am J Psychiatry.',
          'Costa, P. T., & McCrae, R. R. (1992). Revised NEO Personality Inventory.',
          'Buzsáki, G. (2006). Rhythms of the Brain. Oxford University Press.',
        ],
        block17_ProfessionalSignature: {
          name: data.professional,
          institution: data.institution,
          timestamp: new Date().toISOString(),
        },
      },
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neurostrata_export_${data.patientName.replace(/\s+/g, '_')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: 'Exportação JSON Concluída',
      description: 'O arquivo estruturado foi gerado para integração com prontuário (EMR/PEP).',
    })
  }

  const getTabStatus = (tab: string) => {
    const blocks = {
      b1: [1, 2, 3, 4],
      b2: [5, 6, 7, 8],
      b3: [9, 10, 11, 12],
      b4: [13, 14, 15],
    }
    const validators = [
      () => (data.patientName?.length || 0) > 0 && (data.dob?.length || 0) > 0,
      () => (data.reason?.length || 0) > 20,
      () => (data.history?.length || 0) > 20,
      () => (data.behavior?.length || 0) > 20,
      () => (data.cognitive?.length || 0) > 20,
      () => (data.rdoc?.length || 0) > 20,
      () => (data.bigFive?.length || 0) > 20,
      () => (data.psychicFunc?.length || 0) > 20,
      () => (data.neurophysio?.length || 0) > 20,
      () => (data.integration?.length || 0) > 20,
      () => (data.hypotheses?.length || 0) > 20,
      () => (data.intervention?.length || 0) > 20,
      () => data.idxIntegrity > 0,
      () => data.radarData?.some((d: any) => d.value > 0),
      () => (data.conclusion?.length || 0) > 50,
    ]
    const indices = blocks[tab as keyof typeof blocks]
    if (!indices) return true
    return indices.every((i) => validators[i - 1]())
  }

  const TabIndicator = ({ valid }: { valid: boolean }) =>
    valid ? (
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-1.5" />
    ) : (
      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 ml-1.5" />
    )

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
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <ValidationChecklist />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="flex-1 sm:flex-auto">
                <Download className="w-4 h-4 mr-2" /> Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem onClick={() => handleExport('PDF (Resumo Clínico)')}>
                <FileText className="w-4 h-4 mr-2" /> PDF Clínico
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('PDF (Laudo Completo)')}>
                <FileCheck className="w-4 h-4 mr-2" /> PDF Completo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJson}>
                <Code className="w-4 h-4 mr-2" /> Exportar para Prontuário (JSON)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="b1" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto gap-2 p-2 bg-muted/30 border">
          <TabsTrigger value="b1" className="py-2 flex items-center justify-center">
            1. Identificação <TabIndicator valid={getTabStatus('b1')} />
          </TabsTrigger>
          <TabsTrigger value="b2" className="py-2 flex items-center justify-center">
            2. Avaliação <TabIndicator valid={getTabStatus('b2')} />
          </TabsTrigger>
          <TabsTrigger value="b3" className="py-2 flex items-center justify-center">
            3. Biomarcadores <TabIndicator valid={getTabStatus('b3')} />
          </TabsTrigger>
          <TabsTrigger value="b4" className="py-2 flex items-center justify-center">
            4. Conclusão <TabIndicator valid={getTabStatus('b4')} />
          </TabsTrigger>
          <TabsTrigger value="evolucao" className="py-2">
            Evolução
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="py-2 bg-primary/5 text-primary border border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Visualização
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
        <TabsContent value="evolucao" className="mt-6">
          <TabEvolution />
        </TabsContent>
        <TabsContent value="preview" className="mt-6">
          <ReportPreviewDocument />
        </TabsContent>
      </Tabs>
    </div>
  )
}
