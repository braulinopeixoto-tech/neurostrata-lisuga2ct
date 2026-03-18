import { BiogramaDataPoint } from '@/stores/useAppStore'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Activity, Watch, FileText, Cpu, Clock, Calendar } from 'lucide-react'

interface Props {
  data: BiogramaDataPoint
}

export function BiogramaDetailCard({ data }: Props) {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'wearable':
        return <Watch className="w-4 h-4 text-indigo-500" />
      case 'clinical':
        return <FileText className="w-4 h-4 text-emerald-500" />
      case 'system':
        return <Cpu className="w-4 h-4 text-blue-500" />
      default:
        return <Activity className="w-4 h-4 text-slate-500" />
    }
  }

  const metricsList = [
    { label: 'Cognição', val: data.metrics.cognition, color: 'text-blue-600' },
    { label: 'Emoção', val: data.metrics.emotion, color: 'text-rose-600' },
    { label: 'Fisiologia', val: data.metrics.physiology, color: 'text-emerald-600' },
    { label: 'Qual. Sono', val: data.metrics.sleep, color: 'text-indigo-600' },
    { label: 'Stress', val: data.metrics.stress, color: 'text-amber-600', invert: true },
    { label: 'HRV', val: data.metrics.hrv, color: 'text-purple-600' },
  ]

  return (
    <Card className="shadow-lg border-t-4 border-t-primary bg-gradient-to-b from-white to-slate-50/50 animate-fade-in-up">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" /> Inspeção do Biograma
            </h3>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4" />
              {new Date(data.date).toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {data.verification.isVerified ? (
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 flex flex-col items-end gap-0.5 py-1.5 px-3">
              <span className="flex items-center gap-1 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" /> Dado Verificado
              </span>
              <span className="text-[10px] font-medium text-emerald-600 uppercase">
                Por: {data.verification.verifiedBy}
              </span>
            </Badge>
          ) : (
            <Badge variant="outline" className="text-slate-500 bg-white shadow-sm py-1.5 px-3">
              <Clock className="w-4 h-4 mr-1.5" /> Aguardando Validação
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Col: Reserve Score & Qualitative */}
          <div className="md:col-span-4 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Reserva Funcional
            </span>
            <div className="relative flex items-center justify-center w-32 h-32 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-sm">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * data.reserveScore) / 100}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-slate-800">{data.reserveScore}</span>
              </div>
            </div>
            <p className="text-sm text-center text-slate-600 italic font-medium">
              "{data.qualitativeInsight}"
            </p>
          </div>

          {/* Mid Col: Metrics */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b pb-2">
              Decomposição Vetorial
            </h4>
            <div className="space-y-3">
              {metricsList.map((m) => (
                <div key={m.label} className="flex items-center justify-between group">
                  <span className="text-sm font-medium text-slate-700 w-24">{m.label}</span>
                  <div className="flex-1 mx-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 bg-current ${m.color}`}
                      style={{ width: `${m.val}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold w-8 text-right ${m.color}`}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Audit Trail */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b pb-2 flex items-center justify-between">
              Audit Trail
              <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-mono">
                {data.sources.length} Fontes
              </Badge>
            </h4>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {data.sources.map((src) => (
                <div key={src.id} className="bg-white p-3 rounded-lg border shadow-sm relative">
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-md bg-slate-200" />
                  <div className="pl-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        {getSourceIcon(src.type)} {src.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight mb-2">
                      {src.description}
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>ID: {src.id}</span>
                      <span>{new Date(src.timestamp).toLocaleTimeString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
