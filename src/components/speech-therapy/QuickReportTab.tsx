import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Download, Sparkles, FolderPlus } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

export function QuickReportTab({ patientId }: { patientId: string }) {
  const [report, setReport] = useState('')
  const [generating, setGenerating] = useState(false)
  const { appendQuickReportDraft, patients } = useAppStore()

  const patient = patients.find((p) => p.id === patientId)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setReport(`QUICK REPORT FONOAUDIOLÓGICO - INTEGRAÇÃO VITALSCORE
Paciente: ${patient?.name || 'Não selecionado'}
Data: ${new Date().toLocaleDateString('pt-BR')}

1. PERFIL FUNCIONAL DA LINGUAGEM E RDoC:
Afasia Receptiva Provável, com comprometimento na decodificação de estímulos semânticos.
Impacto RDoC: Sistemas Cognitivos (Linguagem) com alto nível de atrito.

2. ACHADOS NEUROFUNCIONAIS:
- qEEG: Lentificação Fronto-Temporal Esquerda (Broca/Wernicke).
- P300/N400: Atraso de latência significativo.

3. PLANO DE INTERVENÇÃO COMBINADO:
- Fonoaudiologia: Reabilitação de Afasia (Treino de Compreensão)
- Neuromodulação: tDCS Anódica sobre área de Wernicke (CP5/P3), 20 min / 2mA, 2x por semana.

4. PROGNÓSTICO:
Melhora esperada na latência do processamento auditivo após 8 sessões, com reflexo positivo projetado no Score de Performance Global.`)
      setGenerating(false)
    }, 1200)
  }

  const handleExport = () => {
    toast({
      title: 'Relatório Exportado',
      description: 'Quick Report Fonoaudiológico gerado com sucesso em PDF.',
    })
  }

  const handleSendToGlobal = () => {
    appendQuickReportDraft(`\n\n[SÍNTESE FONOAUDIOLÓGICA]\n${report}`)
    toast({
      title: 'Enviado ao Prontuário Global',
      description: 'O texto foi anexado ao laudo multidimensional.',
    })
  }

  return (
    <Card className="shadow-sm animate-fade-in border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" /> Quick Report Fonoaudiológico
        </CardTitle>
        <CardDescription>
          Síntese estruturada contendo Perfil de linguagem, Integração RDoC, Plano e Prognóstico.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          className="min-h-[350px] text-sm leading-relaxed font-mono bg-slate-50"
          placeholder="O relatório estruturado aparecerá aqui após ser gerado..."
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleGenerate}
            disabled={generating}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {generating ? 'Sintetizando...' : 'Gerar via IA'}
          </Button>
          <Button
            variant="outline"
            onClick={handleSendToGlobal}
            disabled={!report}
            className="bg-white"
          >
            <FolderPlus className="w-4 h-4 mr-2 text-indigo-600" /> Anexar ao Laudo Global
          </Button>
          <Button
            onClick={handleExport}
            disabled={!report}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" /> Exportar PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
