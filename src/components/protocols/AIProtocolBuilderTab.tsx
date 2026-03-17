import { useState } from 'react'
import { Bot, Sparkles, Plus, Zap, ArrowRight, BrainCircuit, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export function AIProtocolBuilderTab() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleGenerate = () => {
    if (!prompt) return
    setIsGenerating(true)

    // Simulate AI thinking
    setTimeout(() => {
      setResult({
        phase1: {
          title: 'Fase 1: Estabilização de Base (Semanas 1-4)',
          desc: 'Foco na redução de neuroinflamação e melhora da qualidade de sono profunda.',
          modules: ['Suporte Mitocondrial Diurno', 'Cronobiologia Noturna (Melatonina 0.21mg)'],
        },
        phase2: {
          title: 'Fase 2: Modulação de Redes (Semanas 5-8)',
          desc: 'Estimulação direcionada após garantia de reserva metabólica.',
          modules: ['tDCS Anódica F3 (2mA/20min)', 'Treino de Coerência Cardíaca (HRV)'],
        },
        phase3: {
          title: 'Fase 3: Neuroplasticidade Ativa (Semanas 9-12)',
          desc: 'Treinamento cognitivo exigente e consolidação.',
          modules: ['Treino N-Back Dual', 'Psicoterapia Focada em Esquemas'],
        },
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="shadow-sm flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-accent" /> IA Generativa de Protocolos
          </CardTitle>
          <CardDescription>
            Descreva o quadro do paciente e deixe a IA propor um sequenciamento terapêutico
            validado.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          <div className="space-y-2 flex-1">
            <Label>Descrição Clínica (Sintomas, Queixas, Histórico)</Label>
            <Textarea
              placeholder="Ex: Paciente 45 anos, queixa de brain fog intenso à tarde, insônia inicial, histórico de Covid Longa e ansiedade moderada..."
              className="h-full min-h-[200px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <Button
            className="w-full mt-auto"
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2 animate-pulse">
                <BrainCircuit className="w-4 h-4" /> Processando na NeuroStrata Engine...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Gerar Sequenciamento Estratégico
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {!result ? (
          <Card className="h-full border-dashed bg-muted/20 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <Zap className="w-12 h-12 mb-4 opacity-20" />
            <p className="max-w-xs">
              O sequenciamento sugerido pela IA aparecerá aqui após a análise estruturada.
            </p>
          </Card>
        ) : (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Estratégia Sequencial Proposta
            </h3>

            {[result.phase1, result.phase2, result.phase3].map((phase, i) => (
              <Card
                key={i}
                className="shadow-sm border-l-4 border-l-accent overflow-hidden relative group"
              >
                <CardContent className="p-5">
                  <h4 className="font-bold text-foreground mb-1">{phase.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{phase.desc}</p>

                  <div className="space-y-2">
                    {phase.modules.map((mod: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm bg-muted/30 p-2 rounded border"
                      >
                        <Plus className="w-3.5 h-3.5 text-accent" /> {mod}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-full opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10"
                  >
                    Importar para Prontuário <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
