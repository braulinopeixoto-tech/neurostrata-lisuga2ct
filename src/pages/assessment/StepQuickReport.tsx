import { useState } from 'react'
import { Sparkles, FileSignature, Stethoscope, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'

const AI_REPORT_MOCK = [
  {
    title: 'Integração Multidimensional (RDoC, Big Five e Funções)',
    content:
      'O paciente apresenta escores críticos no domínio RDoC de Valência Negativa (hiperativação do sistema de ameaça). Isso se correlaciona clinicamente com o traço de Neuroticismo elevado (>85%) no Big Five. Há preservação das funções cognitivas básicas, mas constata-se déficit secundário em funções executivas (Controle Inibitório e Flexibilidade) estado-dependentes, conforme mapeamento das 18 Funções Psíquicas.',
  },
  {
    title: 'Matriz de Risco Funcional',
    content:
      'Risco Funcional GRAVE para ocupações que exigem tomada de decisão sob pressão ou vigilância contínua. Capacidade laboral preservada apenas para rotinas operacionais previsíveis e de baixa demanda interpessoal. O perfil neurofuncional sugere fadiga alostática com impacto direto na sustentação atencional a longo prazo.',
  },
  {
    title: 'Enquadramento Regulatório (CID-11, DSM-5-TR e INSS)',
    content:
      '• CID-11: Perfil compatível com 6B00 (Transtorno de Ansiedade Generalizada).\n• DSM-5-TR: Atende aos critérios diagnósticos A, B e C para TAG.\n• Normativas INSS: O comprometimento executivo associado à severa reatividade emocional embasa tecnicamente a solicitação de afastamento temporário (Auxílio-Doença) por incapacidade específica para a função atual.',
  },
]

export function StepQuickReport({
  onNext,
  onPrev,
  patientName,
}: {
  onNext: () => void
  onPrev: () => void
  patientName?: string
}) {
  const { quickReportDraft, setQuickReportDraft } = useAppStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 2500)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" /> Relatório Médico Rápido (AI)
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Geração de síntese clínica fundamentada em evidências, normativas legais e dados
          dimensionais.
        </p>
      </div>

      {!isGenerated && !isGenerating && (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-slate-50/50">
          <FileSignature className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-slate-500 mb-6 text-center max-w-md">
            O motor de IA irá processar os domínios RDoC, personalidade e funções psíquicas do
            paciente {patientName ? `(${patientName})` : ''} para estruturar um raciocínio clínico
            padrão Open Evidence.
          </p>
          <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Sparkles className="w-4 h-4 mr-2" /> Gerar Síntese de Evidências Clínicas
          </Button>
        </div>
      )}

      {isGenerating && (
        <div className="p-8 border rounded-xl bg-slate-50 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-sm font-medium text-slate-600 animate-pulse">
            Sintetizando matriz de risco funcional e normativas regulatórias...
          </p>
        </div>
      )}

      {isGenerated && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                Síntese de Inteligência Clínica
              </h3>
            </div>

            <div className="space-y-6">
              {AI_REPORT_MOCK.map((section, idx) => (
                <section
                  key={idx}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {section.title}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-6 p-3 bg-blue-50/50 rounded flex items-start gap-3 border border-blue-100">
              <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Este relatório foi gerado via processamento algorítmico e deve ser revisado,
                validado e complementado com o raciocínio clínico humano abaixo antes da emissão
                final do laudo.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Label className="text-base font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Stethoscope className="w-5 h-5 text-accent" /> Definição Humana do Diagnóstico Final
            </Label>
            <p className="text-xs text-muted-foreground mb-3">
              Insira a conclusão diagnóstica final, observações adicionais e a conduta terapêutica
              (medicação, neuromodulação, encaminhamentos). As evidências enviadas via
              Neuronavegação aparecerão aqui.
            </p>
            <Textarea
              className="min-h-[220px] text-sm leading-relaxed bg-white border-slate-300 focus-visible:ring-accent resize-y"
              placeholder="Ex: Confirmo a hipótese diagnóstica de TAG (CID-11 6B00). Em virtude do impacto funcional executivo documentado, prescrevo afastamento das atividades laborais por 30 dias..."
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
          Salvar e Avançar
        </Button>
      </div>
    </div>
  )
}
