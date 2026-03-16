import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { CheckCircle2, ClipboardList, AlertCircle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const DASS21_QUESTIONS = [
  { id: 1, text: 'Achei difícil me acalmar.', type: 'S' },
  { id: 2, text: 'Senti minha boca seca.', type: 'A' },
  { id: 3, text: 'Não consegui vivenciar nenhum sentimento positivo.', type: 'D' },
  { id: 4, text: 'Tive dificuldade em respirar.', type: 'A' },
  { id: 5, text: 'Achei difícil ter iniciativa para fazer as coisas.', type: 'D' },
  { id: 6, text: 'Tendi a reagir de forma exagerada às situações.', type: 'S' },
  { id: 7, text: 'Senti tremores.', type: 'A' },
  { id: 8, text: 'Senti que estava sempre nervoso.', type: 'S' },
  {
    id: 9,
    text: 'Preocupei-me com situações nas quais eu pudesse entrar em pânico e parecer ridículo.',
    type: 'A',
  },
  { id: 10, text: 'Senti que não tinha nada a esperar do futuro.', type: 'D' },
  { id: 11, text: 'Senti que estava muito agitado.', type: 'S' },
  { id: 12, text: 'Achei difícil relaxar.', type: 'S' },
  { id: 13, text: 'Senti-me deprimido e sem ânimo.', type: 'D' },
  {
    id: 14,
    text: 'Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo.',
    type: 'S',
  },
  { id: 15, text: 'Senti que ia entrar em pânico.', type: 'A' },
  { id: 16, text: 'Não consegui me entusiasmar com nada.', type: 'D' },
  { id: 17, text: 'Senti que não tinha muito valor como pessoa.', type: 'D' },
  { id: 18, text: 'Senti que estava muito sensível/irritável.', type: 'S' },
  {
    id: 19,
    text: 'Sabia o que era a ação do meu coração sem que houvesse esforço físico.',
    type: 'A',
  },
  { id: 20, text: 'Senti medo sem motivo.', type: 'A' },
  { id: 21, text: 'Senti que a vida não tinha sentido.', type: 'D' },
]

const OPTIONS = [
  { value: 0, label: '0 - Não se aplicou nada a mim' },
  { value: 1, label: '1 - Aplicou-se a mim em algum grau ou por pouco tempo' },
  { value: 2, label: '2 - Aplicou-se a mim em um grau considerável ou por uma boa parte do tempo' },
  { value: 3, label: '3 - Aplicou-se a mim muito ou na maioria do tempo' },
]

export function PatientDASS21Form({
  patientId,
  onComplete,
}: {
  patientId: string
  onComplete?: () => void
}) {
  const { patientDASS21, addPatientDASS21 } = useAppStore()
  const history = patientDASS21[patientId] || []

  const today = new Date().toISOString().split('T')[0]
  const hasSubmittedToday = history.some((f: any) => f.date.startsWith(today))

  const [answers, setAnswers] = useState<Record<number, number>>({})

  const handleOptionChange = (qId: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: parseInt(val, 10) }))
  }

  const getClassification = (score: number, type: 'D' | 'A' | 'S') => {
    if (type === 'D') {
      if (score <= 9) return 'Normal'
      if (score <= 13) return 'Leve'
      if (score <= 20) return 'Moderado'
      if (score <= 27) return 'Severo'
      return 'Extremamente Severo'
    }
    if (type === 'A') {
      if (score <= 7) return 'Normal'
      if (score <= 9) return 'Leve'
      if (score <= 14) return 'Moderado'
      if (score <= 19) return 'Severo'
      return 'Extremamente Severo'
    }
    if (type === 'S') {
      if (score <= 14) return 'Normal'
      if (score <= 18) return 'Leve'
      if (score <= 25) return 'Moderado'
      if (score <= 33) return 'Severo'
      return 'Extremamente Severo'
    }
    return 'Normal'
  }

  const getColor = (classification: string) => {
    switch (classification) {
      case 'Normal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Leve':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Moderado':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Severo':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Extremamente Severo':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(answers).length < 21) {
      toast({
        title: 'Atenção',
        description: 'Por favor, responda a todas as 21 perguntas antes de enviar.',
        variant: 'destructive',
      })
      return
    }

    let rawD = 0,
      rawA = 0,
      rawS = 0
    DASS21_QUESTIONS.forEach((q) => {
      if (q.type === 'D') rawD += answers[q.id]
      if (q.type === 'A') rawA += answers[q.id]
      if (q.type === 'S') rawS += answers[q.id]
    })

    const scoreD = rawD * 2
    const scoreA = rawA * 2
    const scoreS = rawS * 2

    const result = {
      scores: { depression: scoreD, anxiety: scoreA, stress: scoreS },
      classification: {
        depression: getClassification(scoreD, 'D'),
        anxiety: getClassification(scoreA, 'A'),
        stress: getClassification(scoreS, 'S'),
      },
      rawAnswers: answers,
    }

    addPatientDASS21(patientId, result)

    toast({
      title: 'Avaliação Concluída',
      description: 'Sua escala DASS-21 foi processada com sucesso.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
    onComplete?.()
  }

  if (hasSubmittedToday) {
    const latest = history[0]
    return (
      <Card className="border-t-4 border-t-emerald-500 bg-emerald-50/30">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold text-emerald-800">DASS-21 Concluído</h3>
          <p className="text-emerald-700 mt-2 mb-6 max-w-md">
            Você já enviou sua avaliação DASS-21 hoje. Seus resultados foram registrados e enviados
            ao seu profissional.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Depressão
              </span>
              <span className="text-2xl font-bold mb-2">{latest.scores.depression}</span>
              <Badge variant="outline" className={getColor(latest.classification.depression)}>
                {latest.classification.depression}
              </Badge>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Ansiedade
              </span>
              <span className="text-2xl font-bold mb-2">{latest.scores.anxiety}</span>
              <Badge variant="outline" className={getColor(latest.classification.anxiety)}>
                {latest.classification.anxiety}
              </Badge>
            </div>
            <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col items-center">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Estresse
              </span>
              <span className="text-2xl font-bold mb-2">{latest.scores.stress}</span>
              <Badge variant="outline" className={getColor(latest.classification.stress)}>
                {latest.classification.stress}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ClipboardList className="w-5 h-5 text-indigo-500" /> Escala de Avaliação DASS-21
        </CardTitle>
        <CardDescription>
          Por favor, leia cada afirmação e indique o quanto ela se aplicou a você durante a{' '}
          <strong>última semana</strong>. Não há respostas certas ou erradas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> Responda a todas as 21 questões. A avaliação só poderá ser
              enviada quando estiver completa. Seu progresso é:{' '}
              <strong>{Object.keys(answers).length}/21</strong>
            </p>
          </div>

          <ScrollArea className="h-[600px] pr-4 border rounded-md bg-muted/10 p-4">
            <div className="space-y-8">
              {DASS21_QUESTIONS.map((q, idx) => (
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

          <Button type="submit" className="w-full text-lg h-12 bg-indigo-600 hover:bg-indigo-700">
            Calcular e Enviar Resultados
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
