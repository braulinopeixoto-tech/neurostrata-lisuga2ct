import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Map as MapIcon } from 'lucide-react'

export function HeatMapVisualizer({ data }: { data: Record<string, string> }) {
  const items = Object.entries(data).map(([key, value]) => ({ key, value }))

  const getColorClass = (val: string) => {
    switch (val) {
      case 'Plenamente preservado':
        return 'bg-emerald-500 border-emerald-600'
      case 'Preservado':
        return 'bg-emerald-400 border-emerald-500'
      case 'Regular':
        return 'bg-yellow-400 border-yellow-500'
      case 'Disfuncional':
        return 'bg-orange-500 border-orange-600'
      case 'Disfuncional grave':
        return 'bg-red-500 border-red-600'
      default:
        return 'bg-slate-200 border-slate-300'
    }
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-indigo-500" /> Mapa de Calor Neurofuncional
        </CardTitle>
        <CardDescription>
          Visão consolidada dos domínios avaliados. Cores mais quentes indicam áreas de maior
          atenção clínica.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {items.map((item, idx) => (
            <TooltipProvider key={idx}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'w-12 h-12 rounded-md border shadow-sm cursor-pointer transition-transform hover:scale-110 hover:shadow-md',
                      getColorClass(item.value),
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-white border text-foreground shadow-lg p-3">
                  <p className="font-bold text-sm">{item.key}</p>
                  <p className="text-xs text-muted-foreground mt-1">Status: {item.value}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-emerald-500 rounded-sm" /> Preservado
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-yellow-400 rounded-sm" /> Regular
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-orange-500 rounded-sm" /> Disfuncional
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-sm" /> Disfuncional grave
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
