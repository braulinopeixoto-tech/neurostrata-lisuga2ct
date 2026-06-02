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
import { Sparkles, BrainCircuit, Activity, Network } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function AIInsightsPanel() {
  const [open, setOpen] = useState(false)

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
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-accent">
            <Sparkles className="w-5 h-5" /> NeuroStrata AI Engine
          </SheetTitle>
          <SheetDescription>
            Análise automática do contexto clínico para enriquecimento do laudo.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="bg-slate-50 border p-4 rounded-lg space-y-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-primary">
              <BrainCircuit className="w-4 h-4" /> Cruzamento qEEG vs RDoC
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Detectada forte correlação entre a hiperativação frontal relatada e a pontuação
              crítica no domínio de Valência Negativa (Ameaça Aguda). Sugere-se incluir esta métrica
              na justificativa para intervenção neuromodulatória.
            </p>
            <Button size="sm" variant="secondary" className="w-full text-xs h-8">
              Inserir na Conclusão
            </Button>
          </div>

          <div className="bg-slate-50 border p-4 rounded-lg space-y-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-emerald-600">
              <Activity className="w-4 h-4" /> Análise de Evolução (Biograma)
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O paciente apresenta um aumento de 35% no Score de Performance nos últimos 60 dias.
              Recomenda-se transição de protocolo para foco em consolidação e manutenção de ganhos.
            </p>
            <Button size="sm" variant="secondary" className="w-full text-xs h-8">
              Inserir em Evolução
            </Button>
          </div>

          <div className="bg-slate-50 border p-4 rounded-lg space-y-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-blue-600">
              <Network className="w-4 h-4" /> Referência Científica Recomendada
            </h4>
            <p className="text-xs text-muted-foreground italic border-l-2 border-blue-400 pl-2">
              "Impact of prefrontal regulation on emotional valence systems (RDoC framework)..."
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white">
                Neurosynth
              </Badge>
              <Badge variant="outline" className="bg-white">
                PubMed
              </Badge>
            </div>
            <Button size="sm" variant="secondary" className="w-full text-xs h-8">
              Adicionar Referência
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
