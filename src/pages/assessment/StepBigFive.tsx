import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { BIG_FIVE_DOMAINS } from '@/lib/mock-data'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export function StepBigFive({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const [scores, setScores] = useState<Record<string, number>>({})

  const getProfileText = (id: string, val: number) => {
    if (val === undefined) return 'Não avaliado'
    if (id === 'n' && val > 75) return 'Vulnerabilidade Emocional Alta'
    if (id === 'e' && val < 30) return 'Isolamento Social Moderado'
    if (val > 80) return 'Traço Predominante'
    if (val < 20) return 'Traço Deprimido'
    return 'Padrão Normativo'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold">Perfil de Personalidade (Big Five)</h2>
        <p className="text-sm text-muted-foreground">
          Avaliação dos 5 grandes fatores de personalidade para inferência de impacto funcional.
        </p>
      </div>

      <div className="space-y-5">
        {BIG_FIVE_DOMAINS.map((domain) => {
          const val = scores[domain.id] !== undefined ? scores[domain.id] : 50
          return (
            <div
              key={domain.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b pb-6"
            >
              <div className="md:col-span-1">
                <Label className="text-sm font-bold">{domain.name}</Label>
                <p className="text-xs text-muted-foreground mt-1 pr-4">{domain.desc}</p>
              </div>
              <div className="md:col-span-2 space-y-3 flex flex-col justify-center">
                <div className="flex items-center gap-4">
                  <Slider
                    value={[val]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setScores({ ...scores, [domain.id]: v[0] })}
                  />
                  <span className="font-mono text-sm w-8 text-right">{val}</span>
                </div>
                <Badge
                  variant={val > 75 || val < 25 ? 'secondary' : 'outline'}
                  className="w-max font-normal"
                >
                  Inferência: {getProfileText(domain.id, val)}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={onNext}>Avançar para Biomarcadores</Button>
      </div>
    </div>
  )
}
