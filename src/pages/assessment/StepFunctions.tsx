import { Button } from '@/components/ui/button'
import { PSYCHIC_FUNCTIONS_CATEGORIZED } from '@/lib/mock-data'
import { AlertTriangle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from 'sonner'
import { AssessmentScale } from '@/components/AssessmentScale'

export function StepFunctions({
  onNext,
  nextLabel = 'Avançar',
  patientSelected = true,
}: {
  onNext: () => void
  nextLabel?: string
  patientSelected?: boolean
}) {
  const {
    currentAssessmentData,
    setAssessmentData,
    currentAssessmentId,
    addPatientBiogramData,
    addPatientAuditLog,
    currentUser,
  } = useAppStore()

  const scores = currentAssessmentData.psychicFunctions || {}

  const handleScoreChange = (fn: string, val: string) => {
    setAssessmentData({
      psychicFunctions: {
        ...scores,
        [fn]: val,
      },
    })
  }

  const handleNextClick = () => {
    let filledCount = 0
    PSYCHIC_FUNCTIONS_CATEGORIZED.forEach((cat) => {
      cat.items.forEach((fn) => {
        if (scores[fn]) filledCount++
      })
    })

    if (filledCount < 18) {
      toast.error('Preenchimento obrigatório', {
        description: 'Por favor, avalie todas as 18 funções psíquicas antes de avançar.',
      })
      return
    }

    if (currentAssessmentId) {
      const getVal = (v: string) => {
        if (v === 'Plenamente preservado') return 100
        if (v === 'Preservado') return 80
        if (v === 'Regular') return 60
        if (v === 'Disfuncional') return 40
        if (v === 'Disfuncional grave') return 20
        return 0
      }

      let bemEstarAcc = 0,
        focoAcc = 0,
        energiaAcc = 0
      let bemEstarCount = 0,
        focoCount = 0,
        energiaCount = 0

      PSYCHIC_FUNCTIONS_CATEGORIZED.forEach((cat) => {
        cat.items.forEach((fn) => {
          if (scores[fn]) {
            const v = getVal(scores[fn])
            if (cat.category === 'Regulação Emocional') {
              bemEstarAcc += v
              bemEstarCount++
            } else if (
              cat.category === 'Atenção e Foco' ||
              cat.category === 'Memória e Aprendizagem'
            ) {
              focoAcc += v
              focoCount++
            } else if (cat.category === 'Funções Executivas') {
              energiaAcc += v
              energiaCount++
            }
          }
        })
      })

      const newBiogramPoint = {
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        bemEstar: bemEstarCount ? Math.round(bemEstarAcc / bemEstarCount) : 50,
        foco: focoCount ? Math.round(focoAcc / focoCount) : 50,
        energia: energiaCount ? Math.round(energiaAcc / energiaCount) : 50,
      }

      addPatientBiogramData(currentAssessmentId, newBiogramPoint)
      addPatientAuditLog(currentAssessmentId, {
        date: new Date().toISOString(),
        action: 'Mapeamento de 18 Funções Psíquicas Salvo',
        user: currentUser.fullName,
      })

      toast.success('Mapeamento funcional salvo com sucesso', {
        description: 'Os dados foram integrados ao Biograma Longitudinal.',
      })
    }

    onNext()
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-primary">Mapeamento de 18 Funções Psíquicas</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Avalie o comprometimento em 4 eixos funcionais utilizando a escala clínica padronizada.
        </p>
        {!patientSelected && (
          <div className="flex items-center gap-2 text-sm text-destructive mt-4 bg-destructive/10 p-3 rounded-md border border-destructive/20 w-max">
            <AlertTriangle className="w-4 h-4" /> Selecione o paciente antes de avançar.
          </div>
        )}
      </div>

      <div className="space-y-12">
        {PSYCHIC_FUNCTIONS_CATEGORIZED.map((cat) => (
          <div key={cat.category} className="space-y-4">
            <h3 className="font-bold text-lg uppercase tracking-wider flex items-center gap-2 text-foreground">
              <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
              Eixo: {cat.category}
            </h3>
            <AssessmentScale
              items={cat.items.map((fn) => ({ id: fn, name: fn }))}
              scores={scores}
              onScoreChange={handleScoreChange}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6 border-t mt-10">
        <Button
          onClick={handleNextClick}
          disabled={!patientSelected}
          className="px-8 h-11 text-base"
        >
          Avançar para {nextLabel}
        </Button>
      </div>
    </div>
  )
}
