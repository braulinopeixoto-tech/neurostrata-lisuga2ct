import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Network, Play, Activity } from 'lucide-react'

export function SimulationLearningTab() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-accent/10 text-accent flex items-center justify-center rounded-2xl mx-auto mb-4">
          <Network className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Ambiente de Simulação Neural</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore o impacto teórico de intervenções nas redes cerebrais em tempo real, utilizando a
          base de conhecimento de neurociência de redes (Network Neuroscience).
        </p>
      </div>

      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>Cenário: Hipoativação da Rede Executiva (CEN)</CardTitle>
          <CardDescription>
            Simulação de resposta ao protocolo de Neuromodulação Anódica F3 (tDCS).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4 w-full">
              <div className="bg-slate-50 p-4 rounded-xl border">
                <h4 className="font-semibold text-sm mb-2 text-primary">Estado Pré-Intervenção</h4>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground w-16">DMN</span>
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-[80%]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16">CEN</span>
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[30%]"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Activity className="w-6 h-6 text-muted-foreground animate-pulse" />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border">
                <h4 className="font-semibold text-sm mb-2 text-emerald-600">
                  Projeção Pós-Intervenção (Efeito Alvo)
                </h4>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground w-16">DMN</span>
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 w-[50%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16">CEN</span>
                  <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[75%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 shrink-0 space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-900 leading-relaxed">
                <p className="font-bold mb-2">Fundamento Clínico:</p>A estimulação do Córtex
                Pré-Frontal Dorsolateral esquerdo visa aumentar a excitabilidade cortical,
                fortalecendo a conectividade da Rede Executiva Central e promovendo inibição
                descendente (Top-Down) sobre a DMN.
              </div>
              <Button className="w-full" variant="outline">
                <Play className="w-4 h-4 mr-2" /> Rodar Simulação Dinâmica
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4">
        <Badge variant="secondary" className="text-muted-foreground">
          Módulo Educacional em Fase Beta
        </Badge>
      </div>
    </div>
  )
}
