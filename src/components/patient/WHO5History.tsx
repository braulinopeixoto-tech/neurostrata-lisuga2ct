import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import useAppStore from '@/stores/useAppStore'

export function WHO5History({ patientId }: { patientId: string }) {
  const { patientWHO5 } = useAppStore()
  const history = patientWHO5[patientId] || []

  if (history.length === 0) return null

  return (
    <Card className="shadow-sm border-t-4 border-t-purple-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500" /> Resultados WHO-5 (Bem-Estar)
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
              className="p-4 border rounded-lg bg-card shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-sm bg-muted px-3 py-1.5 rounded-md flex items-center gap-2">
                  Realizado em: {new Date(assessment.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 p-4 bg-muted/30 rounded-md border w-full max-w-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">
                      Índice de Bem-Estar (%)
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        assessment.percentage < 50
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }
                    >
                      {assessment.classification}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-purple-900">
                      {assessment.percentage}%
                    </span>
                    <Progress value={assessment.percentage} className="h-3 w-full bg-muted" />
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
