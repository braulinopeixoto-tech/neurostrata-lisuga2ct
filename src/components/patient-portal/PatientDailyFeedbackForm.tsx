import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { CheckCircle2, MessageSquare } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function PatientDailyFeedbackForm({ patientId }: { patientId: string }) {
  const { patientFeedbacks, addPatientFeedback } = useAppStore()
  const feedbacks = patientFeedbacks[patientId] || []

  // Check if already submitted today
  const today = new Date().toISOString().split('T')[0]
  const hasSubmittedToday = feedbacks.some((f: any) => f.date.startsWith(today))

  const [formData, setFormData] = useState({
    mood: 3,
    focus: 3,
    sleep: 3,
    anxiety: 3,
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addPatientFeedback(patientId, formData)
    toast({
      title: 'Feedback Enviado',
      description: 'Sua autoavaliação de hoje foi registrada com sucesso.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
  }

  if (hasSubmittedToday) {
    return (
      <Card className="border-t-4 border-t-emerald-500 bg-emerald-50/30">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold text-emerald-800">Avaliação Concluída</h3>
          <p className="text-emerald-700 mt-2 max-w-md">
            Você já enviou seu feedback diário hoje. Obrigado por participar ativamente do seu
            acompanhamento clínico!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="w-5 h-5 text-primary" /> Autoavaliação de Sintomas
        </CardTitle>
        <CardDescription>
          Por favor, avalie como você está se sentindo hoje. Estes dados auxiliam seu profissional
          no ajuste do seu tratamento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Como está seu Humor / Bem-estar?</Label>
                <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                  {formData.mood}/5
                </span>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[formData.mood]}
                onValueChange={(v) => setFormData((p) => ({ ...p, mood: v[0] }))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Muito deprimido/Triste</span>
                <span>Excelente/Feliz</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Como está seu Foco e Atenção?</Label>
                <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                  {formData.focus}/5
                </span>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[formData.focus]}
                onValueChange={(v) => setFormData((p) => ({ ...p, focus: v[0] }))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Muito distraído</span>
                <span>Foco total</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Como foi sua Qualidade de Sono?</Label>
                <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                  {formData.sleep}/5
                </span>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[formData.sleep]}
                onValueChange={(v) => setFormData((p) => ({ ...p, sleep: v[0] }))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Péssima/Insônia</span>
                <span>Revigorante</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Nível de Ansiedade ou Estresse?</Label>
                <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                  {formData.anxiety}/5
                </span>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[formData.anxiety]}
                onValueChange={(v) => setFormData((p) => ({ ...p, anxiety: v[0] }))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Muito calmo</span>
                <span>Extremamente ansioso</span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label className="text-base font-semibold">Observações Adicionais (Opcional)</Label>
              <Textarea
                placeholder="Ex: Tive dor de cabeça hoje de manhã..."
                value={formData.notes}
                onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <Button type="submit" className="w-full text-lg h-12">
            Enviar Avaliação Diária
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
