import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { RDOC_DOMAINS } from '@/lib/mock-data'
import { useState } from 'react'

export function StepRDoC({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [scores, setScores] = useState<Record<string, number>>({})

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold">Matriz Dimensional RDoC</h2>
        <p className="text-sm text-muted-foreground">
          Classificação quantitativa baseada em construtos neurobiológicos. (0 = Adaptação, 100 =
          Desregulação Extrema)
        </p>
      </div>

      <div className="space-y-6">
        {RDOC_DOMAINS.map((domain) => {
          const val = scores[domain.id] || 0
          return (
            <div key={domain.id} className="p-5 border rounded-xl bg-white shadow-sm space-y-4">
              <div>
                <Label className="text-base font-bold text-primary">{domain.name}</Label>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{domain.desc}</p>
              </div>
              <div className="flex items-center gap-6">
                <Slider
                  className="flex-1"
                  value={[val]}
                  max={100}
                  step={1}
                  onValueChange={(v) => setScores({ ...scores, [domain.id]: v[0] })}
                />
                <div className="w-16 text-center font-mono text-lg font-medium border p-1 rounded-md bg-muted/30">
                  {val}
                </div>
              </div>
              {val > 70 && (
                <p className="text-xs text-destructive font-medium bg-destructive/10 px-2 py-1 rounded inline-block">
                  Impacto clínico significativo identificado
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={onNext}>Avançar para Big Five</Button>
      </div>
    </div>
  )
}
