import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Download, Sparkles } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function QuickReportTab() {
  const [report, setReport] = useState('')
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setReport(`QUICK REPORT FONOAUDIOLÓGICO
Data: ${new Date().toLocaleDateString()}

1. PERFIL FUNCIONAL DA LINGUAGEM:
Afasia Receptiva Provável, com comprometimento na decodificação de estímulos semânticos (compatível com lentificação Wernicke em qEEG e atraso N400).

2. PRINCIPAIS DIFICULDADES (Bateria de Avaliação):
- Compreensão Auditiva: Alteração Grave
- Fluência Verbal: Alteração Moderada
- Leitura e Escrita: Alteração Moderada

3. PLANO DE INTERVENÇÃO:
- Reabilitação de Afasia (Treino de Compreensão)
- Suporte Neuromodulatório: tDCS Anódica sobre área de Wernicke (CP5/P3), 20 min / 2mA, 2x por semana.

4. EVOLUÇÃO ESPERADA (Prognóstico):
Melhora inicial esperada na latência do processamento auditivo após 8 sessões, refletindo em ganho na comunicação diária.`)
      setGenerating(false)
    }, 1200)
  }

  const handleExport = () => {
    toast({
      title: 'Relatório Exportado',
      description: 'Quick Report Fonoaudiológico gerado com sucesso.',
    })
  }

  return (
    <Card className="shadow-sm animate-fade-in border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" /> Quick Report Fonoaudiológico
        </CardTitle>
        <CardDescription>
          Síntese estruturada contendo Perfil de linguagem, Dificuldades, Plano e Evolução.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          className="min-h-[350px] text-sm leading-relaxed font-mono bg-slate-50"
          placeholder="O relatório estruturado aparecerá aqui..."
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            variant="outline"
            onClick={handleGenerate}
            disabled={generating}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {generating ? 'Sintetizando Dados...' : 'Gerar Quick Report'}
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
