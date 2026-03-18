import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeartPulse, Moon, Zap, ActivitySquare, CheckCircle2, History } from 'lucide-react'
import { VitalRecord } from '@/stores/useVitalStrataStore'

export function PatientView({ latestRecord }: { latestRecord: VitalRecord | undefined }) {
  if (!latestRecord) return null

  const score = latestRecord.vitalScore

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-indigo-600 to-primary text-white shadow-lg border-none">
        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 flex-1">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-none px-3 py-1 text-xs">
              <HeartPulse className="w-3.5 h-3.5 mr-1.5" /> VitalStrata™ Living Document
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black">Sua Reserva Funcional</h2>
            <p className="text-indigo-100 max-w-md text-base leading-relaxed">
              O VitalScore reflete a capacidade contínua do seu corpo e cérebro de se adaptar ao
              estresse e manter a performance diária. Seu documento clínico é vivo e evolui com
              você.
            </p>
          </div>
          <div className="relative flex items-center justify-center w-40 h-40 shrink-0 bg-white/10 rounded-full p-4 shadow-inner border border-white/20">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
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
                strokeDashoffset={283 - (283 * score) / 100}
                strokeLinecap="round"
                className="text-white drop-shadow-md transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-white">{score}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold text-slate-800 pt-4 px-2">
        Insights Acionáveis e Tendências
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-t-4 border-t-amber-500 hover:-translate-y-1 transition-transform">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Moon className="w-5 h-5 text-amber-500" /> Gargalo Detectado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Seus dados contextuais indicam que a irregularidade do sono está reduzindo sua reserva
              metabólica. Tente deitar 30 min mais cedo.
            </p>
            <Badge
              variant="outline"
              className="text-xs bg-amber-50 text-amber-700 border-amber-200"
            >
              Alto Impacto no Score
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-emerald-500 hover:-translate-y-1 transition-transform">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ActivitySquare className="w-5 h-5 text-emerald-500" /> Tendência Positiva
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Ótimo trabalho! Seu eixo neurofuncional está estável graças à consistência no
              protocolo de neuromodulação nas últimas semanas.
            </p>
            <Badge
              variant="outline"
              className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center w-max gap-1"
            >
              <CheckCircle2 className="w-3 h-3" /> Eixo Estabilizado
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-blue-500 hover:-translate-y-1 transition-transform">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" /> Próxima Ação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">
              Continue o acompanhamento contínuo diário no app. A próxima reavaliação preditiva
              automática acontecerá em breve.
            </p>
            <Badge variant="secondary" className="text-xs flex items-center gap-1 w-max">
              <History className="w-3 h-3" /> Monitoramento Ativo
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
