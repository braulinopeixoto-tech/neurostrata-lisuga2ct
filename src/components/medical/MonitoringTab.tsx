import { TrendingUp, Activity, BarChart, ChevronRight, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function MonitoringTab() {
  return (
    <div className="space-y-6 animate-fade-in mt-4">
      <Card className="border-t-4 border-t-emerald-600 shadow-sm bg-gradient-to-br from-emerald-50 to-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold uppercase tracking-widest text-[10px]">
              Fluxo V2 — Camada 4
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900">Intervenções e Monitoramento</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              A evolução e prescrição terapêutica agora são gerenciadas na{' '}
              <strong>Camada 4: Intervenções</strong>. O sistema vincula automaticamente a melhora
              longitudinal aos protocolos aplicados.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
          >
            <Link to="/interventions">
              Acessar Camada de Intervenções <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-500" /> Biograma Longitudinal (Legado)
            </CardTitle>
            <CardDescription>
              A visualização histórica do paciente continua disponível através do VitalStrata™.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/vitalstrata">Acessar VitalStrata™</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart className="w-5 h-5 text-slate-500" /> Timeline de Performance
            </CardTitle>
            <CardDescription>
              Acompanhamento de efetividade pré e pós aplicação de protocolos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/performance-timeline">Ver Performance Timeline</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
