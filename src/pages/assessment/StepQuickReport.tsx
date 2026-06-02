import { useState } from 'react'
import { Sparkles, FileSignature, Stethoscope, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'
import { generateDndaReportDraft, type DndaReportResult } from '@/services/dnda-report-ai'

export function StepQuickReport({
  onNext,
  onPrev,
  patientName,
}: {
  onNext: () => void
  onPrev: () => void
  patientName?: string
}) {
  const { quickReportDraft, setQuickReportDraft, currentAssessmentData } = useAppStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [aiResult, setAiResult] = useState<DndaReportResult | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const inputAnamnesis = JSON.stringify(
        {
          patientName,
          assessment: currentAssessmentData,
        },
        null,
        2,
      )

      const result = await generateDndaReportDraft({
        inputAnamnesis,
        reportData: {
          reason: 'Quick Report DNDA a partir dos dados dimensionais preenchidos no assessment.',
          history: JSON.stringify({
            age: currentAssessmentData.age,
            medications: currentAssessmentData.medications,
            sleepQuality: currentAssessmentData.sleepQuality,
            comorbidities: currentAssessmentData.comorbidities,
          }),
          neurophysio: JSON.stringify({
            qeegTheta: currentAssessmentData.qeegTheta,
            qeegAlpha: currentAssessmentData.qeegAlpha,
            seizureRisk: currentAssessmentData.seizureRisk,
            implants: currentAssessmentData.implants,
          }),
          rdoc: JSON.stringify(currentAssessmentData.rdoc),
          bigFive: JSON.stringify(currentAssessmentData.bigFive),
          psychicFunc: JSON.stringify(currentAssessmentData.psychicFunctions),
        },
        patientContext: {
          patient_identifier: patientName || 'nao_informado',
          age: currentAssessmentData.age,
          sleepQuality: currentAssessmentData.sleepQuality,
        },
      })

      setAiResult(result)
      setQuickReportDraft(result.reportMarkdown)
      setIsGenerated(true)
    } catch (error) {
      toast({
        title: 'Falha ao gerar Quick Report',
        description: error instanceof Error ? error.message : 'Erro inesperado na geracao do relatorio.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" /> Quick Report DNDA com IA
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Gera o Relatorio de Convergencia NeuroStrata como rascunho tecnico, usando dados dimensionais e notas vetorizadas.
        </p>
      </div>

      {!isGenerated && !isGenerating && (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-slate-50/50">
          <FileSignature className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-slate-500 mb-6 text-center max-w-md">
            A IA processara RDoC, Big Five, funcoes psiquicas e biomarcadores registrados para
            estruturar um relatorio DNDA auditavel para {patientName || 'o paciente selecionado'}.
          </p>
          <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Sparkles className="w-4 h-4 mr-2" /> Gerar Relatorio de Convergencia
          </Button>
        </div>
      )}

      {isGenerating && (
        <div className="p-8 border rounded-xl bg-slate-50 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-sm font-medium text-slate-600 animate-pulse">
            Recuperando notas vetorizadas e montando o template DNDA...
          </p>
        </div>
      )}

      {isGenerated && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                Relatorio de Convergencia NeuroStrata
              </h3>
            </div>

            <section className="animate-fade-in-up">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Rascunho DNDA assistido por IA
              </h4>
              <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {aiResult?.reportMarkdown || quickReportDraft}
              </pre>
            </section>

            {aiResult?.retrievedSources?.length ? (
              <div className="mt-6 p-3 bg-white rounded border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Fontes recuperadas
                </h4>
                <div className="space-y-1">
                  {aiResult.retrievedSources.slice(0, 6).map((source) => (
                    <p key={source.id} className="text-xs text-slate-600">
                      {source.title} ({source.similarity.toFixed(2)})
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 p-3 bg-blue-50/50 rounded flex items-start gap-3 border border-blue-100">
              <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Este documento e um rascunho tecnico assistido por IA. Revise lacunas, fontes,
                riscos e linguagem antes de qualquer emissao ou assinatura.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Label className="text-base font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Stethoscope className="w-5 h-5 text-accent" /> Revisao humana do relatorio
            </Label>
            <p className="text-xs text-muted-foreground mb-3">
              Edite o rascunho antes de salvar. O documento deve permanecer dependente de revisao e validacao profissional.
            </p>
            <Textarea
              className="min-h-[220px] text-sm leading-relaxed bg-white border-slate-300 focus-visible:ring-accent resize-y"
              placeholder="Revise o rascunho gerado pela IA..."
              value={quickReportDraft}
              onChange={(e) => setQuickReportDraft(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t mt-8">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={onNext} disabled={isGenerating}>
          Salvar e Avancar
        </Button>
      </div>
    </div>
  )
}
