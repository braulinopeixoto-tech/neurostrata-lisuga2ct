import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Eye,
  FileArchive,
  Printer,
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { NeuroModelReportPreview } from '@/components/neuromodel/NeuroModelReportPreview'

export function LayerReport({ caseId }: { caseId: string }) {
  const { caseWorkspaces, updateCaseBlock, updateCaseStatus } = useTeamFlowStore()
  const { currentUser } = useAppStore()
  const [previewOpen, setPreviewOpen] = useState(false)

  const cw = caseWorkspaces.find((c) => c.id === caseId)
  if (!cw) return null

  const handleChange = (block: keyof typeof cw.blocks, value: string) => {
    updateCaseBlock(caseId, block, value, currentUser.fullName)
  }

  const isValidated = cw.status === 'Laudo Validado'

  const handleValidate = () => {
    updateCaseBlock(
      caseId,
      'b17_signature',
      {
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        timestamp: new Date().toISOString(),
      },
      currentUser.fullName,
    )
    updateCaseStatus(caseId, 'Laudo Validado', currentUser.fullName)
    toast({
      title: 'NeuroModel Validado',
      description: 'O Laudo Dimensional foi selado na Trust Layer™.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  const handleExport = (type: string) => {
    toast({
      title: `Exportando ${type}`,
      description: 'O arquivo está sendo gerado e o download iniciará em instantes.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Camadas 6 e 7: Dashboard e Laudo Final
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Blocos 15 a 17. Conclusão técnica, assinaturas e outputs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewOpen(true)} className="bg-white">
            <Eye className="w-4 h-4 mr-2" /> Pré-visualizar (17 Blocos)
          </Button>
        </div>
      </div>

      {isValidated && (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Lock className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <h3 className="font-bold text-emerald-900">Documento Selado e Validado</h3>
              <p className="text-sm text-emerald-800">
                As camadas deste NeuroModel foram travadas. Emissão disponível em múltiplos
                formatos.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
              onClick={() => handleExport('PDF (Resumido)')}
            >
              <Printer className="w-4 h-4 mr-2" /> Resumo (Prontuário)
            </Button>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => handleExport('PDF (Completo)')}
            >
              <FileArchive className="w-4 h-4 mr-2" /> PDF Laudo Completo
            </Button>
          </div>
        </div>
      )}

      <Card className="shadow-sm border-t-4 border-t-slate-800">
        <CardHeader>
          <CardTitle>Bloco 15: Conclusão Técnica</CardTitle>
          <CardDescription>
            Síntese clínica e parecer neuroético final baseados nas camadas anteriores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[200px]"
            value={cw.blocks.b15_conclusion || ''}
            onChange={(e) => handleChange('b15_conclusion', e.target.value)}
            placeholder="Com base na integração multidimensional dos dados..."
            disabled={isValidated}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Bloco 16: Referências Científicas</CardTitle>
          <CardDescription>Literatura que fundamenta a análise interpretativa.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={
              cw.blocks.b16_references?.join('\n') ||
              'American Psychiatric Association. DSM-5-TR.\nInsel T. Research Domain Criteria (RDoC).\nCosta & McCrae. Big Five Personality Model.\nBuzsáki G. Rhythms of the Brain.'
            }
            onChange={(e) => handleChange('b16_references', e.target.value.split('\n'))}
            disabled={isValidated}
          />
        </CardContent>
      </Card>

      <Card
        className={`shadow-sm border-t-4 ${isValidated ? 'border-t-emerald-500' : 'border-t-amber-500'}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck
              className={`w-5 h-5 ${isValidated ? 'text-emerald-500' : 'text-amber-500'}`}
            />
            Bloco 17: Assinatura Profissional & Trust Layer™
          </CardTitle>
          <CardDescription>Validação final de autoria do modelo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-50 p-4 rounded border text-sm">
            <p>
              <strong>Responsável:</strong> {currentUser.fullName}
            </p>
            <p>
              <strong>Registro:</strong> {currentUser.registrationId}
            </p>
          </div>
          {!isValidated ? (
            <Button
              onClick={handleValidate}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
            >
              Validar Modelo e Assinar Laudo Digitalmente
            </Button>
          ) : (
            <div className="text-xs font-mono bg-emerald-100/50 p-3 rounded text-emerald-800 border border-emerald-200">
              <strong className="block mb-1 font-sans text-emerald-900">
                Selo ICP-Brasil (Simulado) / Trust Layer™
              </strong>
              Hash: {cw.blocks.b17_signature?.hash} <br /> Data:{' '}
              {new Date(cw.blocks.b17_signature?.timestamp).toLocaleString('pt-BR')}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-muted/20">
          <DialogHeader className="p-4 bg-white border-b z-10 shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <FileText className="w-5 h-5 text-indigo-600" /> Output: Relatório Neurofuncional
                  Dimensional
                </DialogTitle>
                <DialogDescription>
                  Apresentação final baseada no Template Oficial NeuroStrata (17 Blocos).
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <NeuroModelReportPreview caseData={cw} />
          </div>
          <div className="p-4 bg-white border-t z-10 shrink-0 flex justify-end gap-3">
            <Button variant="outline" onClick={() => handleExport('DOCX')}>
              Baixar DOCX
            </Button>
            <Button onClick={() => handleExport('PDF')}>
              <Download className="w-4 h-4 mr-2" /> Baixar PDF Oficial
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
