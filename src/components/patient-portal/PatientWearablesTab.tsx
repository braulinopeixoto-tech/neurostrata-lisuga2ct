import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Moon,
  Flame,
  Zap,
  Calendar,
  Sparkles,
  BrainCircuit,
} from 'lucide-react'

export function PatientWearablesTab({ patientId }: { patientId: string }) {
  const metrics = [
    {
      id: 'hrv',
      name: 'HRV (VFC)',
      value: '65 ms',
      icon: Activity,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      trend: '+5% vs mês anterior',
    },
    {
      id: 'hr',
      name: 'Freq. Cardíaca',
      value: '72 bpm',
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      trend: 'Estável',
    },
    {
      id: 'temp',
      name: 'Temp. Corporal',
      value: '36.6 °C',
      icon: Thermometer,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      trend: 'Normal',
    },
    {
      id: 'spo2',
      name: 'SpO2',
      value: '98%',
      icon: Droplet,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      trend: 'Ideal',
    },
    {
      id: 'sleep',
      name: 'Qualidade do Sono',
      value: '85/100',
      icon: Moon,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      trend: '+12% melhora',
    },
    {
      id: 'cal',
      name: 'Queima Calórica',
      value: '2400 kcal',
      icon: Flame,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      trend: 'Na meta',
    },
    {
      id: 'stress',
      name: 'Nível de Stress',
      value: '42/100',
      icon: Zap,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      trend: '-15% redução',
    },
    {
      id: 'cycle',
      name: 'Ciclo Menstrual',
      value: 'Fase Folicular',
      icon: Calendar,
      color: 'text-pink-500',
      bg: 'bg-pink-50',
      trend: 'Dia 10',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card
            key={m.id}
            className="shadow-sm border-t-[3px]"
            style={{ borderTopColor: 'currentColor' }}
          >
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full ${m.bg} flex items-center justify-center mb-3 ring-4 ring-white shadow-sm`}
              >
                <m.icon className={`w-6 h-6 ${m.color}`} />
              </div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">
                {m.name}
              </p>
              <h4 className="text-2xl font-black text-foreground tracking-tight">{m.value}</h4>
              <p className="text-[11px] text-muted-foreground mt-2 bg-muted/60 px-2.5 py-0.5 rounded-full font-medium">
                {m.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50/50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-900">
              <Sparkles className="w-5 h-5 text-purple-600" /> Insights Preditivos IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-800/90 leading-relaxed font-medium">
              Com base na tendência de aumento da{' '}
              <strong>Variabilidade da Frequência Cardíaca (HRV)</strong> e melhora na{' '}
              <strong>Qualidade do Sono</strong> nos últimos 7 dias, a rede preditiva indica uma
              janela de <strong>alta neuroplasticidade</strong> para as próximas 48-72 horas.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-purple-200 text-purple-700 bg-purple-100/50"
              >
                Janela de Recuperação Otimizada
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-200 text-purple-700 bg-purple-100/50"
              >
                Baixo Risco de Fadiga
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50/50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
              <BrainCircuit className="w-5 h-5 text-blue-600" /> Contexto Clínico Regenerativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800/90 leading-relaxed font-medium">
              O estado neurofuncional atual reflete estabilização metabólica. A redução nos níveis
              de <strong>Stress</strong> (-15%) correlaciona-se diretamente com o aumento do{' '}
              <strong>Foco e Atenção</strong> observado no último Biograma. Estratégias de regulação
              circadiana estão ativas com sucesso.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-100/50">
                Modulação Circadiana Ativa
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-100/50">
                Alinhamento Metabólico
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
