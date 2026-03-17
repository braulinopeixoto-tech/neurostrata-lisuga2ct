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
      setReport(`RELATÓRIO RÁPIDO - SÍNTESE NEUROPSICOLÓGICA
Data: ${new Date().toLocaleDateString()}

ESTADO ATUAL:
Paciente apresenta estabilização em métricas de RDoC (Valência Negativa), compatível com a redução de queixas ansiosas.

FUNÇÕES EXECUTIVAS:
Atenção sustentada: Preservada
Memória de trabalho: Regular
Controle Inibitório: Disfuncional Leve

INTELIGÊNCIA PREDITIVA:
Risco de crise aguda reduzido. Trajetória de recuperação positiva (NSI projetado para 85%).

CONDUTA:
Manutenção de protocolo de neuromodulação anódica F3 e início de treino dinâmico N-Back.`)
      setGenerating(false)
    }, 1500)
  }

  const handleExport = () => {
    toast({
      title: 'Exportação Concluída',
      description: 'O relatório rápido foi baixado como PDF.',
    })
  }

  return (
    <Card className="shadow-sm animate-fade-in border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Gerador de Quick Report
        </CardTitle>
        <CardDescription>
          Resumo clínico instantâneo focado nos achados das últimas avaliações do paciente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          className="min-h-[300px] text-sm leading-relaxed font-mono bg-slate-50"
          placeholder="O texto do relatório aparecerá aqui..."
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="outline" onClick={handleGenerate} disabled={generating}>
            <Sparkles className="w-4 h-4 mr-2 text-accent" />{' '}
            {generating ? 'Sintetizando Dados...' : 'Gerar Resumo por IA'}
          </Button>
          <Button onClick={handleExport} disabled={!report}>
            <Download className="w-4 h-4 mr-2" /> Exportar PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
