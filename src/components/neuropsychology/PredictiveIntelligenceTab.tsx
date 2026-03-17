import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { Bot, AlertTriangle, TrendingDown } from 'lucide-react'

export function PredictiveIntelligenceTab() {
  const radarData = [
    { subject: 'Crise Aguda', value: 80 },
    { subject: 'Risco Suicídio', value: 20 },
    { subject: 'Descompensação', value: 65 },
    { subject: 'Isolamento Social', value: 90 },
    { subject: 'Burnout (Fadiga)', value: 75 },
    { subject: 'Impulsividade', value: 40 },
  ]

  const trajectoryData = [
    { month: 'Jan', neuroIndex: 40 },
    { month: 'Fev', neuroIndex: 45 },
    { month: 'Mar', neuroIndex: 60 },
    { month: 'Abr', neuroIndex: 75 },
    { month: 'Mai', neuroIndex: 82 },
    { month: 'Jun', neuroIndex: 85 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-rose-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" /> CrisisRadar
          </CardTitle>
          <CardDescription>Mapeamento preditivo de riscos comportamentais severos.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer
              config={{ value: { color: 'hsl(var(--destructive))', label: 'Risco Preditivo (%)' } }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Radar
                    name="Risco"
                    dataKey="value"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-blue-500" /> NeuroTrajectory
          </CardTitle>
          <CardDescription>Previsão de evolução do Índice Neurofuncional (NSI).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] pt-4">
            <ChartContainer
              config={{ neuroIndex: { color: 'hsl(var(--primary))', label: 'NSI' } }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectoryData} margin={{ left: -20, bottom: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="neuroIndex"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    dot={{ r: 5, fill: 'white' }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-sm bg-muted/20 border-dashed">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Bot className="w-12 h-12 text-accent shrink-0" />
          <div>
            <h4 className="text-lg font-bold text-foreground">Insight Preditivo Gerado</h4>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Baseado na elevação do isolamento social (90%) e na fadiga crônica, o modelo aponta
              uma janela de vulnerabilidade alta nas próximas 2 semanas. A trajetória de recuperação
              do NSI (atualmente em platô de 85) indica forte resiliência neuroplástica se
              protocolos de ativação do córtex pré-frontal forem mantidos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
