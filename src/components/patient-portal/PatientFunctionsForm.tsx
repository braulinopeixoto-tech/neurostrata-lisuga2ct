import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AssessmentScale } from '@/components/AssessmentScale'
import { PSYCHIC_FUNCTIONS_CATEGORIZED } from '@/lib/mock-data'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function PatientFunctionsForm({
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
    PSYCHIC_FUNCTIONS_CATEGORIZED.forEach((cat) => {
      cat.items.forEach((fn) => {
        if (scores[fn]) filledCount++
      })
    })

    if (filledCount < 18) {
      toast({
        title: 'Atenção',
        description: 'Por favor, avalie todas as 18 funções antes de enviar.',
        variant: 'destructive',
      })
      return
    }

    submitJourneyStage(patientId, 'psychic_functions', scores)
    toast({
      title: 'Etapa Concluída',
      description: 'Sua autoavaliação foi enviada para validação clínica.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
    onComplete?.()
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-primary animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">18 Funções Psíquicas</CardTitle>
        <CardDescription>
          Faça uma autoavaliação do seu funcionamento nas seguintes áreas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> Responda a todas as 18 questões para prosseguir.
            </p>
          </div>
          <div className="space-y-12">
            {PSYCHIC_FUNCTIONS_CATEGORIZED.map((cat) => (
              <div key={cat.category} className="space-y-4">
                <h3 className="font-bold text-lg uppercase tracking-wider flex items-center gap-2 text-foreground">
                  <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                  {cat.category}
                </h3>
                <AssessmentScale
                  items={cat.items.map((fn) => ({ id: fn, name: fn }))}
                  scores={scores}
                  onScoreChange={handleScoreChange}
                />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full text-lg h-12">
            Enviar para Validação
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
