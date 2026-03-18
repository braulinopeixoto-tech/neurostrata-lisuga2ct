import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import {
  HeartPulse,
  ArrowDownRight,
  ArrowUpRight,
  ShieldAlert,
  Activity,
  Brain,
  Zap,
  ArrowRightLeft,
  Target,
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import useVitalStrataStore, { VitalRecord } from '@/stores/useVitalStrataStore'

interface Props {
  latestRecord: VitalRecord | undefined
  previousRecord: VitalRecord | undefined
}

export function GovernancePanel({ latestRecord, previousRecord }: Props) {
  const { protocols, applyIntervention } = useVitalStrataStore()
  const { toast } = useToast()

  if (!latestRecord) return null

  const score = latestRecord.vitalScore
  const trend = previousRecord ? score - previousRecord.vitalScore : 0
  const offset = 283 - (283 * score) / 100

  const domains = [
    { key: 'neuro', name: 'Neurofuncional', val: latestRecord.domains.neuro },
    { key: 'cognitive', name: 'Cognitivo-Comportamental', val: latestRecord.domains.cognitive },
    { key: 'emotional', name: 'Emocional-Regulatório', val: latestRecord.domains.emotional },
    { key: 'metabolic', name: 'Metabólico-Energético', val: latestRecord.domains.metabolic },
    { key: 'contextual', name: 'Contextual', val: latestRecord.domains.contextual },
  ]
  const bottlenecks = domains.filter((d) => d.val < 60).sort((a, b) => a.val - b.val)

  // AI Recommendation Engine Logic
  const recommendations = bottlenecks
    .map((b) => {
      const matchingProtocol = protocols.find((p) => p.targetDomain === b.key)
      if (!matchingProtocol) return null
      return {
        bottleneck: b,
        protocol: matchingProtocol,
        rationale: `Queda crítica detectada (${b.val}%) na reserva ${b.name}. Risco de sobrecarga compensatória evidenciado pelo Strain Index (${latestRecord.proprietaryMetrics.strainIndex}).`,
      }
    })
    .filter(Boolean) as { bottleneck: any; protocol: any; rationale: string }[]

  const handleApply = (rec: any) => {
    applyIntervention(
      latestRecord.patientId,
      rec.protocol.id,
      rec.rationale,
      'Dr. Renato Alves (Sistema)',
    )
    toast({
      title: 'Plano Atualizado & Auditado',
      description: `${rec.protocol.name} inserido no plano via Trust Layer™.`,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {latestRecord.isAlert && (
        <Alert variant="destructive" className="bg-rose-50 border-rose-200 shadow-sm">
          <ShieldAlert className="h-5 w-5 text-rose-600" />
          <AlertTitle className="text-rose-800 font-bold">Alerta do Motor Preditivo</AlertTitle>
          <AlertDescription className="text-rose-700">{latestRecord.alertMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-t-4 border-t-primary flex flex-col justify-center items-center p-6 lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-primary" /> VitalScore™ Atual
          </h3>
          <div className="relative flex items-center justify-center w-36 h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={
                  score >= 70
                    ? 'text-emerald-500'
                    : score >= 50
                      ? 'text-amber-500'
                      : 'text-rose-500'
                }
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-800">{score}</span>
              <span className="text-xs font-bold text-slate-500">/ 100</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 font-medium">
            Tendência:
            {trend > 0 ? (
              <Badge className="bg-emerald-100 text-emerald-800">
                <ArrowUpRight className="w-3 h-3 mr-1" /> +{trend}
              </Badge>
            ) : trend < 0 ? (
              <Badge className="bg-rose-100 text-rose-800">
                <ArrowDownRight className="w-3 h-3 mr-1" /> {trend}
              </Badge>
            ) : (
              <Badge variant="secondary">Estável</Badge>
            )}
          </div>
        </Card>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="shadow-sm border-l-4 border-l-blue-500 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
                <span>Functional Reserve Delta</span>
                <ArrowRightLeft className="w-4 h-4 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-end gap-2">
                {latestRecord.proprietaryMetrics.reserveDelta > 0 ? '+' : ''}
                {latestRecord.proprietaryMetrics.reserveDelta}
                <span className="text-xs font-normal text-muted-foreground mb-1">pts vs basal</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Diferença entre a reserva atual e o nível basal.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-l-purple-500 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
                <span>Compensation Strain Index</span>
                <Activity className="w-4 h-4 text-purple-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-end gap-2">
                {latestRecord.proprietaryMetrics.strainIndex}
                <span className="text-xs font-normal text-muted-foreground mb-1">/ 100</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Nível de esforço para manter a performance aparente.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-l-amber-500 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
                <span>Neurobehavioral Friction</span>
                <Brain className="w-4 h-4 text-amber-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-end gap-2">
                {latestRecord.proprietaryMetrics.frictionScore}
                <span className="text-xs font-normal text-muted-foreground mb-1">/ 100</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Gap entre potencial cognitivo e execução comportamental.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-l-rose-500 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex justify-between items-center">
                <span>Allostatic Load Proxy</span>
                <Zap className="w-4 h-4 text-rose-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-end gap-2">
                {latestRecord.proprietaryMetrics.allostaticLoad}
                <span className="text-xs font-normal text-muted-foreground mb-1">/ 100</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Compósito de marcadores de sobrecarga adaptativa.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-sm border-t-4 border-t-indigo-500 overflow-hidden">
        <CardHeader className="bg-slate-50/50 pb-4 border-b">
          <CardTitle className="text-lg flex items-center gap-2 text-indigo-900">
            <Target className="w-5 h-5 text-indigo-600" /> Governança & Explicabilidade IA
          </CardTitle>
          <CardDescription>
            Gargalos funcionais mapeados e matriz de decisão clínica assistida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h4 className="text-sm font-semibold uppercase text-slate-500 mb-3 tracking-wider">
              Gargalos Identificados (Abaixo de 60%)
            </h4>
            {bottlenecks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {bottlenecks.map((b) => (
                  <Badge
                    key={b.key}
                    variant="outline"
                    className="border-rose-200 text-rose-700 bg-rose-50 px-3 py-1.5 shadow-sm"
                  >
                    {b.name}: {b.val}%
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-emerald-600 font-medium bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                Nenhum gargalo crítico detectado. Reserva Funcional estabilizada.
              </p>
            )}
          </div>

          {recommendations.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase text-indigo-500 mb-2 tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Recomendações Assistidas (SHAP Logic)
              </h4>
              <div className="grid gap-4">
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row gap-4 justify-between items-start bg-white p-5 rounded-xl border shadow-sm border-l-4 border-l-indigo-400 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3 flex-1">
                      <div>
                        <h5 className="font-bold text-slate-800 text-lg">{rec.protocol.name}</h5>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <Badge
                            variant="secondary"
                            className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                          >
                            {rec.protocol.type}
                          </Badge>
                          <Badge variant="outline" className="text-slate-500 bg-slate-50">
                            <Clock className="w-3 h-3 mr-1" /> {rec.protocol.duration}
                          </Badge>
                        </div>
                      </div>
                      <div className="bg-indigo-50/50 border border-indigo-100 text-slate-700 text-xs p-3 rounded-lg flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-indigo-900">Motivo da Sugestão (IA):</strong>{' '}
                          {rec.rationale}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleApply(rec)}
                      className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-auto shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Validar e Aplicar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
