import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Activity, ShieldAlert, HeartPulse, BrainCircuit, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ClinicalScores({ data }: { data: Record<string, string> }) {
  const values = Object.values(data)
  let totalScore = 0
  values.forEach((v) => {
    if (v === 'Plenamente preservado') totalScore += 100
    if (v === 'Preservado') totalScore += 80
    if (v === 'Regular') totalScore += 60
    if (v === 'Disfuncional') totalScore += 40
    if (v === 'Disfuncional grave') totalScore += 20
  })

  const average = values.length ? Math.round(totalScore / values.length) : 0

  const vitalScore = average || 75
  const reserveScore = Math.min(100, vitalScore + 10)
  const crisisRadar = Math.max(0, 100 - vitalScore)
  const trajectory = vitalScore > 70 ? 'Estabilidade' : 'Oscilação'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <ScoreCard
        title="VitalScore"
        value={vitalScore}
        suffix="/ 100"
        desc="Índice global de funcionamento mental"
        icon={HeartPulse}
        color="text-emerald-500"
        bg="bg-emerald-50"
      />
      <ScoreCard
        title="ReserveScore"
        value={reserveScore}
        suffix="/ 100"
        desc="Capacidade de adaptação ao estresse"
        icon={BrainCircuit}
        color="text-blue-500"
        bg="bg-blue-50"
      />
      <ScoreCard
        title="CrisisRadar"
        value={crisisRadar}
        suffix="%"
        desc="Risco de desorganização aguda"
        icon={ShieldAlert}
        color={crisisRadar > 40 ? 'text-red-500' : 'text-amber-500'}
        bg={crisisRadar > 40 ? 'bg-red-50' : 'bg-amber-50'}
      />
      <ScoreCard
        title="NeuroTrajectory"
        value={trajectory}
        suffix=""
        desc="Tendência evolutiva atual"
        icon={TrendingUp}
        color="text-primary"
        bg="bg-primary/10"
      />
    </div>
  )
}

function ScoreCard({
  title,
  value,
  suffix,
  desc,
  icon: Icon,
  color,
  bg,
}: {
  title: string
  value: string | number
  suffix: string
  desc: string
  icon: any
  color: string
  bg: string
}) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
        <div className={cn('p-3 rounded-full mb-3', bg, color)}>
          <Icon className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {title}
        </h4>
        <div className="text-2xl font-bold text-foreground flex items-baseline gap-1">
          {value}
          {suffix && <span className="text-sm text-muted-foreground font-normal">{suffix}</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-2">{desc}</p>
      </CardContent>
    </Card>
  )
}
