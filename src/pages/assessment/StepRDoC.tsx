import { Button } from '@/components/ui/button'
import { RDOC_DOMAINS } from '@/lib/mock-data'
import { AssessmentScale } from '@/components/AssessmentScale'
import useAppStore from '@/stores/useAppStore'
import { toast } from 'sonner'

export function StepRDoC({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const { currentAssessmentData, setAssessmentData } = useAppStore()

  const scores = currentAssessmentData.rdoc || {}

  const handleScoreChange = (id: string, val: string) => {
    setAssessmentData({
      rdoc: { ...scores, [id]: val },
    })
  }

  const handleNextClick = () => {
    let filledCount = 0
    RDOC_DOMAINS.forEach((domain) => {
      if (scores[domain.id]) filledCount++
    })

    if (filledCount < RDOC_DOMAINS.length) {
      toast.error('Preenchimento obrigatório', {
        description: 'Por favor, avalie todos os domínios RDoC antes de avançar.',
      })
      return
    }

    onNext()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-primary">Matriz Dimensional RDoC</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Classificação neurofuncional baseada em construtos biológicos padronizados.
        </p>
      </div>

      <div className="space-y-6">
        <AssessmentScale
          items={RDOC_DOMAINS.map((d) => ({ id: d.id, name: d.name, description: d.description }))}
          scores={scores}
          onScoreChange={handleScoreChange}
        />
      </div>

      <div className="flex justify-between pt-6 border-t mt-8">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={handleNextClick} className="px-8 h-11 text-base">
          Avançar para Big Five
        </Button>
      </div>
    </div>
  )
}
