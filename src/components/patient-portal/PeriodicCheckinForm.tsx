import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Activity, Calendar, CalendarDays, CalendarRange, Send } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

export function PeriodicCheckinForm({ patientId }: { patientId: string }) {
  const { addPatientCheckin, addPatientAlert } = useAppStore()
  const [daily, setDaily] = useState({ mood: '3', energy: '3', stress: '3', sleep: '3' })
  const [weekly, setWeekly] = useState({ focus: '3', anxiety: '3', social: '3', motivation: '3' })

  const handleDailySubmit = () => {
    addPatientCheckin(patientId, { type: 'daily', data: daily })

    let level: 'Green' | 'Yellow' | 'Orange' | 'Red' = 'Green'
    let trigger = ''

    if (daily.stress === '5' && daily.mood === '1') {
      level = 'Red'
      trigger = 'Crise emocional severa: Estresse máximo e Humor mínimo.'
    } else if (daily.stress === '5' || daily.sleep === '1') {
      level = 'Yellow'
      trigger = 'Alerta moderado: Estresse elevado ou privação severa de sono.'
    }

    if (level !== 'Green') {
      addPatientAlert(patientId, { level, trigger })
    }

    toast({
      title: 'Check-in Diário Salvo',
      description: 'Suus dados foram registrados na sua linha do tempo.',
    })
  }

  const handleWeeklySubmit = () => {
    addPatientCheckin(patientId, { type: 'weekly', data: weekly })

    let level: 'Green' | 'Yellow' | 'Orange' | 'Red' = 'Green'
    let trigger = ''

    if (weekly.anxiety === '5') {
      level = 'Orange'
      trigger = 'Alerta: Nível de ansiedade crítico na última semana.'
    } else if (weekly.motivation === '1') {
      level = 'Yellow'
      trigger = 'Atenção: Queda significativa na motivação.'
    }

    if (level !== 'Green') {
      addPatientAlert(patientId, { level, trigger })
    }

    toast({
      title: 'Check-in Semanal Salvo',
      description: 'Sua evolução semanal foi atualizada com sucesso.',
    })
  }

  const ScaleRadio = ({
    value,
    onChange,
    label,
  }: {
    value: string
    onChange: (v: string) => void
    label: string
  }) => (
    <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
      <Label className="text-base font-semibold">{label}</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex justify-between max-w-sm gap-2"
      >
        {['1', '2', '3', '4', '5'].map((v) => (
          <div key={v} className="flex flex-col items-center gap-1">
            <RadioGroupItem value={v} id={`${label}-${v}`} className="w-5 h-5" />
            <span className="text-xs text-muted-foreground font-medium">{v}</span>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between max-w-sm text-[10px] text-muted-foreground uppercase tracking-wider">
        <span>Muito Ruim</span>
        <span>Excelente</span>
      </div>
    </div>
  )

  return (
    <Card className="shadow-sm border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" /> Monitoramento Contínuo
        </CardTitle>
        <CardDescription>
          Realize seus check-ins periódicos para alimentar seu Biograma e manter seu profissional
          informado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Diário
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Semanal
            </TabsTrigger>
            <TabsTrigger value="monthly" disabled>
              Mensal
            </TabsTrigger>
            <TabsTrigger value="quarterly" disabled>
              Trimestral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ScaleRadio
                label="Humor Atual"
                value={daily.mood}
                onChange={(v) => setDaily({ ...daily, mood: v })}
              />
              <ScaleRadio
                label="Nível de Energia"
                value={daily.energy}
                onChange={(v) => setDaily({ ...daily, energy: v })}
              />
              <ScaleRadio
                label="Percepção de Estresse"
                value={daily.stress}
                onChange={(v) => setDaily({ ...daily, stress: v })}
              />
              <ScaleRadio
                label="Qualidade do Sono"
                value={daily.sleep}
                onChange={(v) => setDaily({ ...daily, sleep: v })}
              />
            </div>
            <Button onClick={handleDailySubmit} className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" /> Salvar Check-in Diário
            </Button>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ScaleRadio
                label="Concentração (Últimos 7 dias)"
                value={weekly.focus}
                onChange={(v) => setWeekly({ ...weekly, focus: v })}
              />
              <ScaleRadio
                label="Nível de Ansiedade"
                value={weekly.anxiety}
                onChange={(v) => setWeekly({ ...weekly, anxiety: v })}
              />
              <ScaleRadio
                label="Sociabilidade / Isolamento"
                value={weekly.social}
                onChange={(v) => setWeekly({ ...weekly, social: v })}
              />
              <ScaleRadio
                label="Motivação Global"
                value={weekly.motivation}
                onChange={(v) => setWeekly({ ...weekly, motivation: v })}
              />
            </div>
            <Button onClick={handleWeeklySubmit} className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" /> Salvar Check-in Semanal
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
