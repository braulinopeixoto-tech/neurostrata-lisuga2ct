import { useState } from 'react'
import { Bot, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import useReportStore from '@/stores/useReportStore'
import { toast } from '@/components/ui/use-toast'

export function AIInsightsPanel() {
  const { data, updateData } = useReportStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [insights, setInsights] = useState<{ hypotheses: string; intervention: string } | null>(
    null,
  )

  const hasSufficientData =
    data.rdoc.length > 20 && data.bigFive.length > 20 && data.neurophysio.length > 20

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI delay
    setTimeout(() => {
      setInsights({
        hypotheses:
          'Considerando a hiperativação da rede de saliência associada à pontuação elevada de Neuroticismo e histórico de evitação, sugere-se a hipótese principal de Transtorno de Ansiedade Generalizada (DSM-5-TR: F41.1) com componente reativo ao estresse crônico (carga alostática).',
        intervention:
          '1. Iniciar protocolo de Neuromodulação Não Invasiva (tDCS catódico em Córtex Pré-Frontal Medial) visando regulação inibitória.\n2. Integração com Terapia Cognitivo-Comportamental focada em reestruturação de crenças de ameaça.\n3. Monitoramento longitudinal do eixo ansiolítico via biomarcadores periféricos.',
      })
      setIsGenerating(false)
    }, 1500)
  }

  const applyText = (field: 'hypotheses' | 'intervention', text: string) => {
    updateData({ [field]: text })
    toast({
      title: 'Sugestão Aplicada',
      description: 'O texto do laudo foi atualizado com a recomendação da IA.',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50/50">
          <Sparkles className="w-4 h-4 mr-2" /> Assistente IA
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col bg-slate-50">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-indigo-700">
            <Bot className="w-6 h-6" /> Motor de Insights Clínicos
          </SheetTitle>
          <SheetDescription>
            A IA correlaciona os domínios funcionais, RDoC e biomarcadores para sugerir hipóteses
            diagnósticas e rotas terapêuticas.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6 py-6">
          {!hasSufficientData ? (
            <div className="text-center p-8 text-muted-foreground bg-white border border-dashed rounded-lg">
              Preencha os blocos de RDoC, Big Five e Neurofisiologia para ativar as sugestões do
              assistente.
            </div>
          ) : !insights ? (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
              <Bot className="w-12 h-12 text-indigo-200" />
              <p className="text-sm text-slate-600">
                Os dados atuais são suficientes para gerar uma análise correlacional avançada.
              </p>
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <span className="animate-pulse flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" /> Processando Metadados...
                  </span>
                ) : (
                  'Gerar Sugestões de Laudo'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in-up">
              <Card className="border-t-4 border-t-indigo-500 shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide text-slate-500 flex items-center gap-2 mb-2">
                      <ChevronRight className="w-4 h-4" /> Sugestão de Hipótese (Bloco 11)
                    </h4>
                    <p className="text-sm bg-indigo-50/50 p-3 rounded border border-indigo-100 leading-relaxed">
                      {insights.hypotheses}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                    onClick={() => applyText('hypotheses', insights.hypotheses)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Aplicar ao Documento
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-emerald-500 shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide text-slate-500 flex items-center gap-2 mb-2">
                      <ChevronRight className="w-4 h-4" /> Plano de Intervenção (Bloco 12)
                    </h4>
                    <p className="text-sm bg-emerald-50/50 p-3 rounded border border-emerald-100 leading-relaxed whitespace-pre-wrap">
                      {insights.intervention}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                    onClick={() => applyText('intervention', insights.intervention)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Aplicar ao Documento
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
