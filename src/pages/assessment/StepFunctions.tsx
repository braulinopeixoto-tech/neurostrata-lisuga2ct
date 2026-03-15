import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { PSYCHIC_FUNCTIONS } from '@/lib/mock-data'

export function StepFunctions({
  onNext,
  patientSelected = true,
}: {
  onNext: () => void
  patientSelected?: boolean
}) {
  const [scores, setScores] = useState<Record<string, number>>(
    PSYCHIC_FUNCTIONS.reduce((acc, fn) => ({ ...acc, [fn]: 50 }), {}),
  )
  const [observations, setObservations] = useState<Record<string, string>>({})

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-primary">1. Funções Psíquicas</h2>
        <p className="text-sm text-muted-foreground">
          Avalie sistematicamente o desempenho neurofuncional em escala de 0 a 100.
        </p>
        {!patientSelected && (
          <p className="text-sm text-destructive mt-3 font-medium bg-destructive/10 p-3 rounded-md border border-destructive/20 inline-block">
            Por favor, selecione um paciente no topo da página antes de avançar.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PSYCHIC_FUNCTIONS.map((fn) => (
          <div
            key={fn}
            className="space-y-4 bg-muted/20 p-5 rounded-xl border border-border/50 hover:border-accent/40 transition-colors shadow-sm"
          >
            <div className="flex justify-between items-center">
              <Label className="font-semibold text-foreground/90 line-clamp-1" title={fn}>
                {fn}
              </Label>
              <span className="text-sm font-mono bg-white px-2.5 py-1 rounded-md border shadow-sm w-12 text-center text-primary font-medium">
                {scores[fn]}
              </span>
            </div>
            <div className="pt-2 pb-1">
              <Slider
                value={[scores[fn]]}
                max={100}
                step={1}
                onValueChange={(val) => setScores({ ...scores, [fn]: val[0] })}
                className="cursor-pointer"
              />
            </div>
            <div>
              <Input
                placeholder="Observações clínicas (opcional)"
                className="h-9 text-xs bg-white/70 focus:bg-white transition-colors"
                value={observations[fn] || ''}
                onChange={(e) => setObservations({ ...observations, [fn]: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6 border-t mt-8">
        <Button
          onClick={onNext}
          disabled={!patientSelected}
          className="w-full sm:w-auto text-base h-11 px-8"
        >
          Avançar para RDoC
        </Button>
      </div>
    </div>
  )
}
