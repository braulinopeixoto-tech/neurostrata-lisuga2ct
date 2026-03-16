import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ClipboardList, AlertTriangle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function PHQ9History({ patientId }: { patientId: string }) {
  const { patientPHQ9 } = useAppStore()
  const history = patientPHQ9[patientId] || []

  if (history.length === 0) return null

  const getColor = (classification: string) => {
    switch (classification) {
      case 'Mínima':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Leve':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Moderada':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Moderadamente Severa':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Severa':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-500" /> Resultados PHQ-9 (Depressão)
        </CardTitle>
        <CardDescription>
          Acompanhamento longitudinal dos scores reportados pelo paciente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((assessment: any) => (
            <div
              key={assessment.id}
              className={`p-4 border rounded-lg bg-card shadow-sm transition-colors ${assessment.hasCriticalAlert ? 'border-rose-300 bg-rose-50/30' : 'hover:border-primary/40'}`}
            >
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <span className="font-semibold text-sm bg-muted px-3 py-1.5 rounded-md flex items-center gap-2">
                  Realizado em: {new Date(assessment.date).toLocaleDateString('pt-BR')}
                </span>
                {assessment.hasCriticalAlert && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Alerta Crítico: Ideação Suicida
                  </Badge>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-md border min-w-[200px]">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Score Total
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-900">
                      {assessment.score}{' '}
                      <span className="text-sm font-normal text-muted-foreground">/ 27</span>
                    </span>
                    <Badge variant="outline" className={getColor(assessment.classification)}>
                      {assessment.classification}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
