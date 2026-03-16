import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { CheckCircle2, ClipboardList, AlertCircle, AlertTriangle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const PHQ9_QUESTIONS = [
  { id: 1, text: 'Pouco interesse ou pouco prazer em fazer as coisas.' },
  { id: 2, text: 'Se sentir para baixo, deprimido(a) ou sem perspectiva.' },
  {
    id: 3,
    text: 'Dificuldade para pegar no sono ou permanecer dormindo, ou dormir mais do que o de costume.',
  },
  { id: 4, text: 'Se sentir cansado(a) ou com pouca energia.' },
  { id: 5, text: 'Falta de apetite ou comendo demais.' },
  {
    id: 6,
    text: 'Se sentir mal consigo mesmo(a) — ou achar que é um fracasso ou que decepcionou a si mesmo(a) ou à sua família.',
  },
  { id: 7, text: 'Dificuldade para se concentrar nas coisas, como ler o jornal ou ver televisão.' },
  {
    id: 8,
    text: 'Se movimentar ou falar tão devagar que as outras pessoas poderiam ter notado. Ou o oposto — estar tão agitado(a) ou inquieto(a) que você fica andando de um lado para o outro muito mais do que o de costume.',
  },
  { id: 9, text: 'Pensamentos de que seria melhor estar morto ou de se ferir de alguma maneira.' },
]

const OPTIONS = [
  { value: 0, label: '0 - Nenhuma vez' },
  { value: 1, label: '1 - Vários dias' },
  { value: 2, label: '2 - Mais da metade dos dias' },
  { value: 3, label: '3 - Quase todos os dias' },
]

export function PatientPHQ9Form({
  patientId,
  onComplete,
}: {
  patientId: string
  onComplete?: () => void
}) {
  const { patientPHQ9, addPatientPHQ9 } = useAppStore()
  const history = patientPHQ9[patientId] || []

  const today = new Date().toISOString().split('T')[0]
  const hasSubmittedToday = history.some((f: any) => f.date.startsWith(today))

  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleOptionChange = (qId: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: parseInt(val, 10) }))
  }

  const getClassification = (score: number) => {
    if (score <= 4) return 'Mínima'
    if (score <= 9) return 'Leve'
    if (score <= 14) return 'Moderada'
    if (score <= 19) return 'Moderadamente Severa'
    return 'Severa'
  }

  const getColor = (classification: string) => {
    switch (classification) {
      case 'Mínima':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Leve':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Moderada':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Moderadamente Severa':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Severa':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(answers).length < 9) {
      toast({
        title: 'Atenção',
        description: 'Por favor, responda a todas as 9 questões antes de enviar.',
        variant: 'destructive',
      })
      return
    }

    let totalScore = 0
    let suicidalIdeationScore = answers[9] || 0
    Object.values(answers).forEach((val) => {
      totalScore += val
    })

    const classification = getClassification(totalScore)
    const hasCriticalAlert = suicidalIdeationScore > 0

    const result = {
      score: totalScore,
      classification,
      hasCriticalAlert,
      rawAnswers: answers,
    }

    addPatientPHQ9(patientId, result)

    if (hasCriticalAlert) {
      toast({
        title: 'Avaliação Concluída',
        description:
          'Sua escala foi enviada. Um alerta foi gerado para sua equipe clínica e eles entrarão em contato em breve.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Avaliação Concluída',
        description: 'Sua escala PHQ-9 foi processada e enviada ao seu profissional.',
        action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      })
    }
    onComplete?.()
  }

  if (hasSubmittedToday) {
    const latest = history[0]
    return (
      <Card className="border-t-4 border-t-emerald-500 bg-emerald-50/30">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold text-emerald-800">PHQ-9 Concluído</h3>
          <p className="text-emerald-700 mt-2 mb-6 max-w-md">
            Você já enviou sua avaliação PHQ-9 hoje. Seus resultados foram registrados e enviados ao
            seu profissional.
          </p>
          <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center min-w-[200px]">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Score Total
            </span>
            <span className="text-2xl font-bold mb-2">{latest.score} / 27</span>
            <Badge variant="outline" className={getColor(latest.classification)}>
              {latest.classification}
            </Badge>
            {latest.hasCriticalAlert && (
              <Badge variant="destructive" className="mt-2 text-xs flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Alerta Clínico
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ClipboardList className="w-5 h-5 text-blue-500" /> Questionário de Saúde do Paciente
          (PHQ-9)
        </CardTitle>
        <CardDescription>
          Durante as <strong>últimas 2 semanas</strong>, com que frequência você foi incomodado(a)
          por qualquer um dos problemas a seguir?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> Responda a todas as 9 questões. Seu progresso é:{' '}
              <strong>{Object.keys(answers).length}/9</strong>
            </p>
          </div>

          <ScrollArea className="h-[500px] pr-4 border rounded-md bg-muted/10 p-4">
            <div className="space-y-8">
              {PHQ9_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="p-4 bg-white border rounded-lg shadow-sm">
                  <h4 className="font-semibold text-base mb-4">
                    <span className="text-muted-foreground mr-2">{idx + 1}.</span>
                    {q.text}
                  </h4>
                  <RadioGroup
                    value={answers[q.id]?.toString()}
                    onValueChange={(val) => handleOptionChange(q.id, val)}
                    className="grid grid-cols-1 gap-3"
                  >
                    {OPTIONS.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={opt.value.toString()}
                          id={`q${q.id}-opt${opt.value}`}
                        />
                        <Label
                          htmlFor={`q${q.id}-opt${opt.value}`}
                          className="font-normal cursor-pointer leading-tight"
                        >
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Button type="submit" className="w-full text-lg h-12 bg-blue-600 hover:bg-blue-700">
            Calcular e Enviar Resultados
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
