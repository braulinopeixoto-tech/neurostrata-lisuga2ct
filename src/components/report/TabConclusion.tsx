import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'

export function TabConclusion() {
  const { data, updateData } = useReportStore()

  const handleApplyTemplate = () => {
    const template = `Com base na integração multidimensional dos dados clínicos, psicométricos e neurofisiológicos, conclui-se que o(a) paciente apresenta um quadro compatível com [INSERIR SÍNDROME/HIPÓTESE PRINCIPAL], caracterizado primariamente por [DESCREVER DÉFICIT CENTRAL].

A análise da arquitetura mental via Matriz RDoC evidencia vulnerabilidade nos sistemas de [INSERIR DOMÍNIO], corroborada por achados de [INSERIR ACHADO BIOMARCADOR]. Observa-se preservação das funções [INSERIR FUNÇÕES PRESERVADAS], que servirão de base para o processo de neuroplasticidade estruturada.

Recomenda-se o início imediato de protocolo de intervenção interdisciplinar, com foco na regulação do tônus autonômico e otimização das redes executivas centrais. O prognóstico é favorável condicionado à adesão terapêutica.`

    updateData({ conclusion: template })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-emerald-500 shadow-sm">
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 15. Conclusão Técnica e Parecer
            </CardTitle>
            <CardDescription>
              Síntese final do laudo, fechamento diagnóstico e orientações de conduta.
            </CardDescription>
          </div>
          <button
            onClick={handleApplyTemplate}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            Usar Template Estruturado
          </button>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Elabore o parecer final detalhado..."
            className="min-h-[300px] text-base leading-relaxed"
            value={data.conclusion || ''}
            onChange={(e) => updateData({ conclusion: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card className="bg-amber-50/50 border-amber-200">
        <CardContent className="p-4 flex gap-3 text-sm text-amber-800">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <p>
            <strong>Recomendação Ética:</strong> Certifique-se de que a conclusão seja objetiva,
            embasada exclusivamente nos dados apresentados nos blocos anteriores, e esteja em
            conformidade com as diretrizes do seu conselho de classe profissional antes de realizar
            a assinatura digital na próxima aba.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
