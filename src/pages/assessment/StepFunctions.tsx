import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { PSYCHIC_FUNCTIONS_CATEGORIZED } from '@/lib/mock-data'
import { AlertTriangle } from 'lucide-react'

export function StepFunctions({
  onNext,
  patientSelected = true,
}: {
  onNext: () => void
  patientSelected?: boolean
}) {
  const [scores, setScores] = useState<Record<string, number>>({})

  const getScore = (fn: string) => scores[fn] || 50

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-primary">Mapeamento de 18 Funções Psíquicas</h2>
        <p className="text-sm text-muted-foreground">
          Avalie o comprometimento em 4 eixos funcionais (0 = Disfuncional grave, 100 = Plenamente
          preservado).
        </p>
        {!patientSelected && (
          <div className="flex items-center gap-2 text-sm text-destructive mt-3 bg-destructive/10 p-3 rounded-md border border-destructive/20 w-max">
            <AlertTriangle className="w-4 h-4" /> Selecione o paciente antes de avançar.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {PSYCHIC_FUNCTIONS_CATEGORIZED.map((cat) => (
          <div key={cat.category} className="space-y-4 p-5 bg-muted/20 border rounded-xl">
            <h3 className={`font-bold text-sm uppercase tracking-wider flex items-center gap-2`}>
              <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
              Eixo {cat.category}
            </h3>
            <div className="space-y-5">
              {cat.items.map((fn) => (
                <div key={fn} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <Label className="font-medium">{fn}</Label>
                    <span
                      className={`font-mono px-2 py-0.5 rounded text-xs ${getScore(fn) < 40 ? 'bg-destructive/10 text-destructive' : 'bg-white border'}`}
                    >
                      {getScore(fn)}
                    </span>
                  </div>
                  <Slider
                    value={[getScore(fn)]}
                    max={100}
                    step={1}
                    onValueChange={(val) => setScores({ ...scores, [fn]: val[0] })}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={onNext} disabled={!patientSelected} className="px-8 h-11">
          Avançar para RDoC
        </Button>
      </div>
    </div>
  )
}
