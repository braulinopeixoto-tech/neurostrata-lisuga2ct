import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function AlertsDashboard({ patientId }: { patientId: string }) {
  const { patientAlerts } = useAppStore()
  const alerts = patientAlerts[patientId] || []

  if (alerts.length === 0) return null

  return (
    <Card className="shadow-sm border-t-4 border-t-rose-500 mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" /> Alertas Clínicos
        </CardTitle>
        <CardDescription>
          Sinalizações do motor NSI ou da equipe baseadas nas respostas diárias.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 border rounded-lg bg-slate-50 flex flex-col md:flex-row gap-4 justify-between items-start"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={
                    alert.level === 'Red'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-700'
                  }
                >
                  Nível {alert.level}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(alert.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="font-semibold text-sm text-foreground">{alert.trigger}</p>
            </div>

            <div className="shrink-0 w-full md:w-auto text-right">
              {alert.status === 'resolved' ? (
                <div className="flex flex-col items-end">
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    Resolvido
                  </Badge>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    Por: {alert.resolvedBy}
                  </span>
                </div>
              ) : (
                <Badge variant="secondary" className="animate-pulse">
                  Ação Necessária
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
