import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AssessmentScale } from '@/components/AssessmentScale'
import { RDOC_DOMAINS } from '@/lib/mock-data'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function PatientRDoCForm({
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
    RDOC_DOMAINS.forEach((domain) => {
      if (scores[domain.id]) filledCount++
    })

    if (filledCount < RDOC_DOMAINS.length) {
      toast({
        title: 'Atenção',
        description: 'Por favor, avalie todos os domínios antes de enviar.',
        variant: 'destructive',
      })
      return
    }

    submitJourneyStage(patientId, 'level2_rdoc', scores)
    toast({
      title: 'Etapa Concluída',
      description: 'Sua autoavaliação RDoC foi enviada para validação clínica.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
    onComplete?.()
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-primary animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Nível 02: Domínios RDoC</CardTitle>
        <CardDescription>
          Avalie como você percebe o funcionamento dos seus sistemas biológicos e comportamentais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> Responda a todas as categorias para prosseguir.
            </p>
          </div>
          <div className="space-y-6">
            <AssessmentScale
              items={RDOC_DOMAINS.map((d) => ({
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
