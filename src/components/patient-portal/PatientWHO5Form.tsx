import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { CheckCircle2, ClipboardList, AlertCircle, Heart } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'

const WHO5_QUESTIONS = [
  { id: 1, text: 'Me senti alegre e de bom humor.' },
  { id: 2, text: 'Me senti calmo(a) e relaxado(a).' },
  { id: 3, text: 'Me senti ativo(a) e vigoroso(a).' },
  { id: 4, text: 'Acordei me sentindo bem e descansado(a).' },
  { id: 5, text: 'Meu dia a dia tem sido cheio de coisas que me interessam.' },
]

const OPTIONS = [
  { value: 5, label: '5 - O tempo todo' },
  { value: 4, label: '4 - Quase sempre' },
  { value: 3, label: '3 - Mais da metade do tempo' },
  { value: 2, label: '2 - Menos da metade do tempo' },
  { value: 1, label: '1 - De vez em quando' },
  { value: 0, label: '0 - Nunca' },
]

export function PatientWHO5Form({ patientId }: { patientId: string }) {
  const { patientWHO5, addPatientWHO5 } = useAppStore()
  const history = patientWHO5[patientId] || []

  const today = new Date().toISOString().split('T')[0]
  const hasSubmittedToday = history.some((f: any) => f.date.startsWith(today))

  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleOptionChange = (qId: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: parseInt(val, 10) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(answers).length < 5) {
      toast({
        title: 'Atenção',
        description: 'Por favor, responda a todas as 5 questões antes de enviar.',
        variant: 'destructive',
      })
      return
    }

    let totalScore = 0
    Object.values(answers).forEach((val) => {
      totalScore += val
    })

    const percentage = totalScore * 4
    const classification = percentage < 50 ? 'Baixo Bem-Estar' : 'Bem-Estar Adequado'

    const result = {
      score: totalScore,
      percentage,
      classification,
      rawAnswers: answers,
    }

    addPatientWHO5(patientId, result)

    toast({
      title: 'Avaliação Concluída',
      description: 'Sua escala WHO-5 foi processada e enviada ao seu profissional.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
  }

  if (hasSubmittedToday) {
    const latest = history[0]
    return (
      <Card className="border-t-4 border-t-emerald-500 bg-emerald-50/30">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold text-emerald-800">WHO-5 Concluído</h3>
          <p className="text-emerald-700 mt-2 mb-6 max-w-md">
            Você já enviou sua avaliação WHO-5 hoje. Seus resultados foram registrados e enviados ao
            seu profissional.
          </p>
          <div className="bg-white p-6 rounded-lg border shadow-sm flex flex-col items-center min-w-[250px] w-full max-w-md">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Índice de Bem-Estar (%)
            </span>
            <span className="text-4xl font-bold mb-4">{latest.percentage}%</span>
            <Progress value={latest.percentage} className="h-3 w-full mb-4 bg-muted" />
            <Badge
              variant="outline"
              className={
                latest.percentage < 50
                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }
            >
              {latest.classification}
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Heart className="w-5 h-5 text-purple-500" /> Índice de Bem-Estar (WHO-5)
        </CardTitle>
        <CardDescription>
          Por favor, indique para cada uma das afirmações qual foi a que mais se aproximou de como
          você se sentiu nas <strong>últimas duas semanas</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> Responda a todas as 5 questões. Seu progresso é:{' '}
              <strong>{Object.keys(answers).length}/5</strong>
            </p>
          </div>

          <ScrollArea className="h-[500px] pr-4 border rounded-md bg-muted/10 p-4">
            <div className="space-y-8">
              {WHO5_QUESTIONS.map((q, idx) => (
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

          <Button type="submit" className="w-full text-lg h-12 bg-purple-600 hover:bg-purple-700">
            Calcular e Enviar Resultados
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
