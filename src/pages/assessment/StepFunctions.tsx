import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { PSYCHIC_FUNCTIONS } from '@/lib/mock-data'

export function StepFunctions({ onNext }: { onNext: () => void }) {
  // Take first 6 for demo brevity
  const functions = PSYCHIC_FUNCTIONS.slice(0, 6)
  const [scores, setScores] = useState<Record<string, number>>(
    functions.reduce((acc, fn) => ({ ...acc, [fn]: 50 }), {}),
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold">1. Funções Psíquicas</h2>
        <p className="text-sm text-muted-foreground">Avalie o desempenho em escala de 0 a 100.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {functions.map((fn) => (
          <div key={fn} className="space-y-3 bg-muted/30 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <Label className="font-medium text-primary">{fn}</Label>
              <span className="text-sm font-mono bg-white px-2 py-1 rounded border shadow-sm w-12 text-center">
                {scores[fn]}
              </span>
            </div>
            <Slider
              value={[scores[fn]]}
              max={100}
              step={1}
              onValueChange={(val) => setScores({ ...scores, [fn]: val[0] })}
              className="py-2"
            />
            <Input
              placeholder="Observações clínicas (opcional)"
              className="h-8 text-xs mt-2 bg-white"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={onNext} className="w-full sm:w-auto">
          Avançar para RDoC
        </Button>
      </div>
    </div>
  )
}
