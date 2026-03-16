import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AssessmentScale } from '@/components/AssessmentScale'
import { BIG_FIVE_DOMAINS } from '@/lib/mock-data'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function PatientBigFiveForm({
  patientId,
  onComplete,
}: {
  patientId: string
  onComplete?: () => void
}) {
  const { submitJourneyStage } = useAppStore()
  const [scores, setScores] = useState<Record<string, string>>({})

  const handleScoreChange = (id: string, val: string) => {
    setScores((p) => ({ ...p, [id]: val }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let filledCount = 0
    BIG_FIVE_DOMAINS.forEach((domain) => {
      if (scores[domain.id]) filledCount++
    })

    if (filledCount < BIG_FIVE_DOMAINS.length) {
      toast({
        title: 'Atenção',
        description: 'Por favor, avalie todos os traços antes de enviar.',
        variant: 'destructive',
      })
      return
    }

    submitJourneyStage(patientId, 'big_five', scores)
    toast({
      title: 'Etapa Concluída',
      description: 'Sua autoavaliação de Personalidade foi enviada para validação clínica.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
    onComplete?.()
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-primary animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Perfil de Personalidade (Big Five)</CardTitle>
        <CardDescription>
          Avalie a intensidade de cada traço de personalidade no seu comportamento atual.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> Responda a todos os traços listados para prosseguir.
            </p>
          </div>
          <div className="space-y-6">
            <AssessmentScale
              items={BIG_FIVE_DOMAINS.map((d) => ({
                id: d.id,
                name: d.name,
                description: d.description,
              }))}
              scores={scores}
              onScoreChange={handleScoreChange}
            />
          </div>
          <Button type="submit" className="w-full text-lg h-12">
            Enviar para Validação
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
