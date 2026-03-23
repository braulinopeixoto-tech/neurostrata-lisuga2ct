import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BrainCircuit, AlertTriangle, ShieldCheck, ArrowRight, Target, Network } from 'lucide-react'
import { MentalRadarChart } from '@/components/charts/MentalRadarChart'

export default function DiagnosticCore() {
  return (
    <div className="space-y-8 animate-fade-in-up pb-16 max-w-6xl mx-auto mt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight text-amber-600 flex items-center gap-3">
            <BrainCircuit className="w-10 h-10" /> Núcleo Diagnóstico
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Motor central do sistema. Cruzamento automático de evidências clínicas, RDoC e
            biomarcadores.
          </p>
        </div>
        <div className="flex flex-col items-end text-right bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mb-1">
            Score de Confiabilidade Diagnóstica
          </span>
          <span className="text-5xl font-black text-amber-600">88%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-t-4 border-t-amber-500 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-slate-800 font-bold">
              Convergência Multidimensional
            </CardTitle>
            <CardDescription className="font-medium text-slate-500">
              Radar de integração de constructos: Big Five, RDoC e DSM-5-TR.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <MentalRadarChart />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-t-4 border-t-rose-500 shadow-md">
            <CardHeader className="bg-rose-50/50 pb-3 border-b border-rose-100">
              <CardTitle className="text-rose-900 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5 text-rose-500" /> Alertas de Inconsistência
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="text-sm bg-rose-50 p-4 rounded-lg border border-rose-200 text-rose-900 leading-relaxed shadow-sm">
                <strong className="block mb-1">Divergência detectada:</strong>O auto-relato de
                ansiedade (DASS-21) aponta severidade baixa, mas o qEEG (Biomarcador) demonstra
                hiperativação frontal severa (Beta High). Isso sugere viés de resposta ou
                somatização não percebida pelo paciente.
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500 shadow-md">
            <CardHeader className="bg-amber-50/50 pb-3 border-b border-amber-100">
              <CardTitle className="text-amber-900 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                <Target className="w-5 h-5 text-amber-600" /> Hipóteses e Próximos Passos
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Hipótese Principal
                </p>
                <p className="text-base font-bold text-slate-800 leading-tight">
                  Transtorno de Regulação Emocional com Déficit Executivo Secundário
                </p>
              </div>
              <div className="pt-3 border-t">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Ação Sugerida pela IA
                </p>
                <Button
                  variant="outline"
                  className="w-full justify-start text-amber-700 border-amber-300 hover:bg-amber-50 font-semibold shadow-sm"
                >
                  <Network className="w-4 h-4 mr-2" /> Simular Protocolo de Intervenção
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-6 border-t border-slate-200">
        <div className="inline-flex items-center gap-3 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl border border-slate-700">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          DIAGNÓSTICO VALIDADO NEUROSTRATA™
        </div>
        <Button
          asChild
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md px-8"
        >
          <Link to="/interventions">
            Avançar para Intervenções <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
