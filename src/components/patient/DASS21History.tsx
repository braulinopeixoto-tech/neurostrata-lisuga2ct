import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ClipboardList } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function DASS21History({ patientId }: { patientId: string }) {
  const { patientDASS21 } = useAppStore()
  const history = patientDASS21[patientId] || []

  if (history.length === 0) return null

  const getColor = (classification: string) => {
    switch (classification) {
      case 'Normal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Leve':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Moderado':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Severo':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Extremamente Severo':
        return 'bg-rose-100 text-rose-800 border-rose-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-indigo-500" /> Resultados DASS-21 (Depressão,
          Ansiedade e Estresse)
        </CardTitle>
        <CardDescription>
          Acompanhamento longitudinal dos scores padronizados reportados pelo paciente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((assessment: any) => (
            <div
              key={assessment.id}
              className="p-4 border rounded-lg bg-card shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-sm bg-muted px-3 py-1.5 rounded-md flex items-center gap-2">
                  Realizado em: {new Date(assessment.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-md border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Depressão
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{assessment.scores.depression}</span>
                    <Badge
                      variant="outline"
                      className={getColor(assessment.classification.depression)}
                    >
                      {assessment.classification.depression}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-md border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Ansiedade
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{assessment.scores.anxiety}</span>
                    <Badge
                      variant="outline"
                      className={getColor(assessment.classification.anxiety)}
                    >
                      {assessment.classification.anxiety}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-md border">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Estresse
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{assessment.scores.stress}</span>
                    <Badge variant="outline" className={getColor(assessment.classification.stress)}>
                      {assessment.classification.stress}
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
