import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Brain, Heart, Activity, Sparkles, Check } from 'lucide-react'

interface ValidationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientName: string
  suggestion: any
  onConfirm: () => void
}

export function QuickReportValidationModal({
  open,
  onOpenChange,
  patientName,
  suggestion,
  onConfirm,
}: ValidationModalProps) {
  if (!suggestion) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-accent" /> Validação da IA: Relatório Rápido
          </DialogTitle>
          <DialogDescription>
            A IA analisou as notas brutas para <strong>{patientName}</strong> e estratificou as
            informações nas dimensões multifuncionais. Revise antes de integrar.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 mt-4">
            <div className="bg-slate-50 p-4 rounded-xl border flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800">Projeção do VitalScore</h4>
                <p className="text-sm text-muted-foreground">
                  Ajuste baseado na variação do estado clínico reportado.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-rose-50 text-rose-700 border-rose-200 px-3 py-1 text-sm font-bold"
                >
                  {suggestion.scoreImpact} pts
                </Badge>
                <span className="text-2xl font-black text-slate-800">{suggestion.newScore}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                Estratificação Dimensional
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(suggestion.dimensions).map(([key, dim]: [string, any]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-3 border rounded-lg bg-white"
                  >
                    <div className="flex items-center gap-3">
                      {key === 'cognition' && <Brain className="w-5 h-5 text-blue-500" />}
                      {key === 'emotion' && <Heart className="w-5 h-5 text-rose-500" />}
                      {key === 'behavior' && <Activity className="w-5 h-5 text-amber-500" />}
                      <div>
                        <p className="font-semibold text-sm capitalize">
                          {key === 'cognition'
                            ? 'Cognição'
                            : key === 'emotion'
                              ? 'Emoção'
                              : 'Comportamento'}
                        </p>
                        <p className="text-xs text-muted-foreground">{dim.reason}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        dim.status === 'Alterado'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }
                    >
                      {dim.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                Mapeamento por Área Funcional
              </h4>
              <div className="space-y-3">
                {Object.entries(suggestion.functionalAreas).map(([key, area]: [string, any]) => (
                  <div key={key} className="flex items-start gap-4 p-3 border rounded-lg bg-white">
                    <div className="mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${area.status === 'Crítico' ? 'bg-rose-500' : area.status === 'Atenção' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm capitalize">
                          {key === 'neuropsychology'
                            ? 'Neuropsicologia'
                            : key === 'pharmacy'
                              ? 'Farmácia'
                              : key === 'nutrition'
                                ? 'Nutrição'
                                : key === 'speechTherapy'
                                  ? 'Fonoaudiologia'
                                  : 'Psicopedagogia'}
                        </p>
                        <span className="text-xs font-medium text-slate-500">{area.status}</span>
                      </div>
                      <p className="text-xs text-slate-600">{area.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="bg-accent hover:bg-accent/90 text-white">
            <Check className="w-4 h-4 mr-2" /> Validar e Integrar ao Painel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
