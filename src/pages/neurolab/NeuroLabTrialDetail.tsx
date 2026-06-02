import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Brain,
  Activity,
  Lock,
  FileText,
  ShieldCheck,
  Download,
  AlertTriangle,
  Zap,
  Network,
  Dna,
} from 'lucide-react'

export default function NeuroLabTrialDetail() {
  const { id } = useParams()

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 p-6 gap-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/neurolab">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Carlos M. Silva
              </h1>
              <Badge className="bg-violet-100 text-violet-800 border-violet-200">
                Ensaio N-of-1
              </Badge>
            </div>
            <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Protocolo: NL-tDCS-DEP-01
            </p>
          </div>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Quick Report (PDF)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Pipeline Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-violet-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-violet-200" />
                Baseline Engine (RWD)
              </h2>
              <p className="text-violet-100 text-sm mt-1">Coleta Estruturada - Pré Intervenção</p>
            </div>
            <CardContent className="p-6 grid grid-cols-2 gap-6 bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Zap className="w-4 h-4 text-amber-500" />
                  qEEG (Band Power)
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Peak Alpha Freq (PAF)</span>{' '}
                    <span className="font-mono font-bold">9.2 Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Theta/Beta Ratio</span>{' '}
                    <span className="font-mono font-bold">1.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assimetria Frontal</span>{' '}
                    <span className="font-mono font-bold">+12% Dir</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Network className="w-4 h-4 text-blue-500" />
                  sLORETA (Redes)
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">DMN Coherence</span>{' '}
                    <span className="font-mono font-bold text-amber-600">Baixa (0.32)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SN Activity</span>{' '}
                    <span className="font-mono font-bold text-rose-600">Hiperativa</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 shadow-sm">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <Brain className="w-5 h-5" />
                Analytics Engine: Delta Neurofuncional
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4 text-slate-400" />
                    Effect Size (Cohen's d)
                  </span>
                  <div className="flex items-end gap-3 mt-2">
                    <span className="text-4xl font-black text-slate-900">0.85</span>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-1">
                      Large
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-sm text-slate-500 font-medium">
                    Classificação de Energia
                  </span>
                  <span className="text-xl font-bold text-slate-900 mt-2">Normalização</span>
                  <span className="text-sm text-emerald-600 font-medium">De Hipo para Normal</span>
                </div>

                <div className="flex flex-col gap-2 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-sm text-slate-500 font-medium">
                    Integração de Rede (DMN)
                  </span>
                  <span className="text-xl font-bold text-slate-900 mt-2">Acoplado</span>
                  <span className="text-sm text-emerald-600 font-medium">
                    +42% Coerência Global
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Compliance Module
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">Protocolo Off-Label</span>
                </div>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                  Ativo
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">TCLE Digital</span>
                </div>
                <span className="text-xs font-bold text-emerald-700">Assinado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-slate-900 text-slate-100">
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-base flex items-center gap-2 text-slate-100">
                <Lock className="w-5 h-5 text-violet-400" />
                Trust Layer Ledger
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Latest Record Hash (SHA-256)
                </span>
                <div className="p-3 bg-black/50 text-emerald-400 font-mono text-[11px] rounded-lg break-all border border-slate-800 leading-relaxed shadow-inner">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-slate-800 pt-4">
                <span className="text-slate-400">Assinatura do Investigador</span>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                >
                  <ShieldCheck className="w-3 h-3 mr-1" /> Validada
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
