import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Sparkles, BrainCircuit, AlertCircle, CheckCircle2, Loader2, Network } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import useReportStore from '@/stores/useReportStore'
import { generateDndaReportDraft, type DndaReportResult } from '@/services/dnda-report-ai'

export function AIInsightsPanel() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DndaReportResult | null>(null)
  const { data, updateData } = useReportStore()

  const inputAnamnesis = [
    data.reason && `Motivo: ${data.reason}`,
    data.history && `Historia: ${data.history}`,
    data.behavior && `Comportamento: ${data.behavior}`,
    data.cognitive && `Cognitivo: ${data.cognitive}`,
    data.rdoc && `RDoC: ${data.rdoc}`,
    data.bigFive && `Big Five: ${data.bigFive}`,
    data.neurophysio && `Neurofisiologia: ${data.neurophysio}`,
    data.integration && `Integracao: ${data.integration}`,
    data.hypotheses && `Hipoteses: ${data.hypotheses}`,
    data.intervention && `Intervencao: ${data.intervention}`,
    data.conclusion && `Conclusao: ${data.conclusion}`,
  ]
    .filter(Boolean)
    .join('\n\n')

  const handleGenerate = async () => {
    if (inputAnamnesis.trim().length < 20) {
      toast({
        title: 'Dados insuficientes',
        description: 'Preencha ao menos motivo, historia ou achados antes de gerar o rascunho.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const draft = await generateDndaReportDraft({
        inputAnamnesis,
        reportData: data,
        patientContext: {
          patient_identifier: data.patientName || 'nao_informado',
          age: data.age,
          sex: data.sex,
          education: data.education,
          professional: data.professional,
          evalDate: data.evalDate,
        },
      })

      setResult(draft)
      toast({
        title: 'Rascunho DNDA gerado',
        description: 'Revise as fontes e aplique ao laudo somente se estiver adequado.',
      })
    } catch (error) {
      toast({
        title: 'Falha ao gerar rascunho',
        description: error instanceof Error ? error.message : 'Erro inesperado na chamada de IA.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    if (!result?.reportFields) return

    updateData({
      ...result.reportFields,
      isSigned: false,
    })

    toast({
      title: 'Rascunho aplicado',
      description: 'Os campos do laudo foram preenchidos para revisao profissional.',
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-accent/5 text-accent hover:bg-accent/10 hover:text-accent border-accent/20"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">IA NeuroStrata Insights</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-accent">
            <Sparkles className="w-5 h-5" /> NeuroStrata AI Engine
          </SheetTitle>
          <SheetDescription>
            Gera um rascunho DNDA auditavel com base nos dados do laudo e nas notas vetorizadas.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5">
          <div className="bg-slate-50 border p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <BrainCircuit className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-primary">Rascunho tecnico assistido</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  A saida nasce como rascunho para revisao humana. O modelo padrao e gpt-5.4-mini
                  com embeddings text-embedding-3-small.
                </p>
              </div>
            </div>
            <Button onClick={handleGenerate} disabled={loading} size="sm" className="w-full">
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Gerando rascunho...' : 'Gerar rascunho DNDA com IA'}
            </Button>
          </div>

          {!result && (
            <div className="border border-dashed p-4 rounded-lg text-sm text-muted-foreground">
              Preencha o laudo, gere o rascunho e confira as fontes recuperadas antes de aplicar.
            </div>
          )}

          {result && (
            <div className="bg-white border p-4 rounded-lg space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-bold text-sm flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" /> Rascunho pronto
                </h4>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                  {result.status}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                Modelo: {result.model} | Prompt: {result.promptVersion}
              </p>

              <div className="max-h-72 overflow-y-auto rounded border bg-slate-50 p-3">
                <pre className="text-xs whitespace-pre-wrap font-sans leading-relaxed">
                  {result.reportMarkdown}
                </pre>
              </div>

              <Button size="sm" onClick={handleApply} className="w-full">
                Aplicar campos ao laudo para revisao
              </Button>
            </div>
          )}

          {result?.retrievedSources?.length ? (
            <div className="bg-slate-50 border p-4 rounded-lg space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-2 text-blue-700">
                <Network className="w-4 h-4" /> Fontes recuperadas
              </h4>
              <div className="space-y-2">
                {result.retrievedSources.slice(0, 8).map((source) => (
                  <div key={source.id} className="rounded border bg-white p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800">{source.title}</p>
                      <Badge variant="outline">{source.similarity.toFixed(2)}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {source.axis || 'sem eixo'} | {source.note_type || 'sem tipo'} |{' '}
                      {source.evidence_level || 'sem nivel'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-900 leading-relaxed">
              O rascunho nao substitui avaliacao clinica, assinatura, validacao profissional ou
              revisao LGPD. Fontes ausentes devem aparecer como lacunas, nao como conclusoes.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
