import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Network, Search, ArrowRight, ShieldCheck } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function BiogramaMethodologyTab({ patient }: { patient: any }) {
  const { biogramaTraceability } = useAppStore()
  const dimensions = biogramaTraceability[patient.id] || []
  const [selectedDim, setSelectedDim] = useState<any>(null)

  if (dimensions.length === 0) {
    return (
      <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20">
        Nenhum dado do Biograma mapeado para este paciente ainda.
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Preservado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Alerta':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Crítico':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-purple-50 p-6 rounded-xl border border-purple-100">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-purple-900">
            <Network className="w-6 h-6" /> Biograma Methodology Dashboard
          </h2>
          <p className="text-sm text-purple-800 mt-1 max-w-2xl">
            Motor de Rastreabilidade Trust Layer™. Visualize a correlação exata entre a abstração
            clínica (Dimensões do Biograma) e os dados brutos multifatoriais que a fundamentam.
          </p>
        </div>
        <Badge className="bg-purple-600 text-white hover:bg-purple-700 flex gap-1 items-center shrink-0">
          <ShieldCheck className="w-4 h-4" /> Traceability Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dimensions.map((dim) => (
          <Card
            key={dim.id}
            className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-purple-500 flex flex-col h-full"
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg text-slate-900">{dim.name}</CardTitle>
                <Badge variant="outline" className={getStatusColor(dim.status)}>
                  {dim.status}
                </Badge>
              </div>
              <div className="text-3xl font-black text-slate-800">
                {dim.score}
                <span className="text-sm font-medium text-slate-500">/100</span>
              </div>
              <CardDescription className="line-clamp-2 mt-2">{dim.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Network className="w-3.5 h-3.5" /> {dim.contributors.length} Fontes Clínicas
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDim(dim)}
                className="text-purple-700 hover:text-purple-800 hover:bg-purple-100"
              >
                Ver Rastreabilidade <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedDim} onOpenChange={(open) => !open && setSelectedDim(null)}>
        <DialogContent className="max-w-3xl bg-slate-50">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 uppercase tracking-widest text-[10px]">
                Auditoria de Dados
              </Badge>
            </div>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-slate-900">
              Rastreio: {selectedDim?.name}
            </DialogTitle>
            <DialogDescription>
              Dados brutos e avaliações que compõem o escore atual desta dimensão no Biograma.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {selectedDim?.contributors.map((c: any, idx: number) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border shadow-sm relative overflow-hidden"
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${c.impact === 'High' ? 'bg-rose-500' : c.impact === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}
                />
                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] font-mono bg-slate-100">
                        {c.module}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                        <Search className="w-3 h-3" /> Origem: {c.source}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-base">{c.metric}</h4>
                  </div>
                  <div className="flex flex-col sm:items-end bg-slate-50 px-4 py-2 rounded-lg border">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                      Valor Medido
                    </span>
                    <span className="font-mono text-sm font-bold text-slate-800">{c.value}</span>
                    <span className="text-[10px] text-muted-foreground mt-1">
                      Data: {new Date(c.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
