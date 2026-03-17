import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

const DASS_ITEMS = [
  'Achei difícil me acalmar',
  'Tive dificuldade em respirar',
  'Achei difícil tomar iniciativa para fazer as coisas',
  'Senti que estava muito nervoso(a)',
  'Senti que não tinha nada a esperar do futuro',
  'Senti que estava a ponto de entrar em pânico',
  'Não consegui vivenciar nenhum sentimento positivo',
]

export function PatientDASS21Form({ patientId }: { patientId: string }) {
  const { submitJourneyStage } = useAppStore()
  const [scores, setScores] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(scores).length < DASS_ITEMS.length) {
      toast({
        title: 'Atenção',
        description: 'Responda todas as questões.',
        variant: 'destructive',
      })
      return
    }
    submitJourneyStage(patientId, 'level1_dass21', scores)
    toast({
      title: 'Nível 01 Concluído',
      description: 'Rastreio enviado para validação.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-primary animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Nível 01: Rastreio Inicial (DASS-21)</CardTitle>
        <CardDescription>
          Por favor, avalie o quanto cada afirmação se aplicou a você na última semana.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> Responda todas as afirmações para liberar o próximo nível.
            </p>
          </div>
          <div className="space-y-6">
            {DASS_ITEMS.map((item, idx) => (
              <div key={idx} className="space-y-3 bg-muted/20 p-4 rounded-lg border">
                <Label className="text-base font-medium">{item}</Label>
                <RadioGroup
                  value={scores[item]}
                  onValueChange={(val) => setScores((s) => ({ ...s, [item]: val }))}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2"
                >
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value="0" /> <span>Não se aplicou</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value="1" /> <span>Aplicou-se um pouco</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value="2" /> <span>Aplicou-se muito</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value="3" /> <span>Aplicou-se totalmente</span>
                  </label>
                </RadioGroup>
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full text-lg h-12">
            Enviar Rastreio
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
