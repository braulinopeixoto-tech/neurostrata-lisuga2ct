import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RDOC_DOMAINS } from '@/lib/mock-data'

export function StepRDoC({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold">2. Domínios RDoC</h2>
        <p className="text-sm text-muted-foreground">
          Insira a valoração dimensional baseada em observação e testes.
        </p>
      </div>

      <div className="space-y-4">
        {RDOC_DOMAINS.map((domain) => (
          <div
            key={domain.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg hover:border-accent transition-colors"
          >
            <div className="flex-1">
              <Label className="text-base font-medium text-primary">{domain.name}</Label>
              <p className="text-xs text-muted-foreground mt-1">{domain.desc}</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="Escore (0-100)"
                className="w-24 text-center font-mono"
                defaultValue="50"
              />
              <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden hidden sm:block">
                <div className="h-full bg-accent w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={onNext}>Avançar para Conectividade</Button>
      </div>
    </div>
  )
}
