import { Button } from '@/components/ui/button'
import { BIG_FIVE_DOMAINS } from '@/lib/mock-data'
import { AssessmentScale } from '@/components/AssessmentScale'
import useAppStore from '@/stores/useAppStore'
import { toast } from 'sonner'

export function StepBigFive({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const { currentAssessmentData, setAssessmentData } = useAppStore()

  const scores = currentAssessmentData.bigFive || {}

  const handleScoreChange = (id: string, val: string) => {
    setAssessmentData({
      bigFive: { ...scores, [id]: val },
    })
  }

  const handleNextClick = () => {
    let filledCount = 0
    BIG_FIVE_DOMAINS.forEach((domain) => {
      if (scores[domain.id]) filledCount++
    })

    if (filledCount < BIG_FIVE_DOMAINS.length) {
      toast.error('Preenchimento obrigatório', {
        description: 'Por favor, avalie todos os domínios do Big Five antes de avançar.',
      })
      return
    }

    onNext()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-primary">Perfil de Personalidade (Big Five)</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Avaliação dos grandes fatores de personalidade sob a ótica funcional clínica.
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

      <div className="flex justify-between pt-6 border-t mt-8">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={handleNextClick} className="px-8 h-11 text-base">
          Avançar para Biomarcadores
        </Button>
      </div>
    </div>
  )
}
