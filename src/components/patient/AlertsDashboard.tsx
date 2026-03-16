import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Bell, AlertTriangle, CheckCircle2, FileEdit } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

export function AlertsDashboard({ patientId }: { patientId: string }) {
  const { patientAlerts, resolvePatientAlert, addPatientAuditLog, currentUser } = useAppStore()
  const alerts = patientAlerts[patientId] || []
  const [resolvingAlert, setResolvingAlert] = useState<any>(null)
  const [conductText, setConductText] = useState('')

  const pendingAlerts = alerts.filter((a) => a.status === 'pending')
  const resolvedAlerts = alerts.filter((a) => a.status === 'resolved')

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'Red':
        return 'bg-red-50 border-red-200 text-red-700'
      case 'Orange':
        return 'bg-orange-50 border-orange-200 text-orange-700'
      case 'Yellow':
        return 'bg-amber-50 border-amber-200 text-amber-700'
      default:
        return 'bg-emerald-50 border-emerald-200 text-emerald-700'
    }
  }

  const getAlertLabel = (level: string) => {
    switch (level) {
      case 'Red':
        return 'Crítico'
      case 'Orange':
        return 'Moderado'
      case 'Yellow':
        return 'Leve'
      default:
        return 'Normal'
    }
  }

  const handleResolve = () => {
    if (!conductText.trim()) {
      toast({ title: 'Erro', description: 'Descreva a conduta adotada.', variant: 'destructive' })
      return
    }

    resolvePatientAlert(patientId, resolvingAlert.id, conductText, currentUser.fullName)
    addPatientAuditLog(patientId, {
      date: new Date().toISOString(),
      action: `Tratativa de Alerta Automático (${getAlertLabel(resolvingAlert.level)})`,
      user: currentUser.fullName,
      details: `Motivo: ${resolvingAlert.trigger} | Conduta: ${conductText}`,
    })

    toast({
      title: 'Alerta Tratado',
      description: 'Conduta registrada com sucesso no Biograma do paciente.',
    })
    setResolvingAlert(null)
    setConductText('')
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-red-500 mt-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-500" /> Motor de Alertas (Check-ins)
        </CardTitle>
        <CardDescription>
          Notificações automáticas geradas pelo monitoramento longitudinal do paciente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-sm mb-3">Alertas Pendentes ({pendingAlerts.length})</h4>
          {pendingAlerts.length === 0 ? (
            <div className="bg-muted/20 border border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">
              Nenhum alerta pendente no momento.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    'p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start gap-4',
                    getAlertColor(alert.level),
                  )}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-bold uppercase text-xs tracking-wider">
                        Risco {getAlertLabel(alert.level)}
                      </span>
                      <span className="text-xs opacity-80">
                        {new Date(alert.date).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{alert.trigger}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 bg-white/50 hover:bg-white"
                    onClick={() => setResolvingAlert(alert)}
                  >
                    <FileEdit className="w-4 h-4 mr-2" /> Registrar Conduta
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {resolvedAlerts.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Histórico Tratado</h4>
            <div className="space-y-2">
              {resolvedAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg bg-muted/30 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Alerta {getAlertLabel(alert.level)} resolvido
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Motivo: {alert.trigger}</p>
                  <div className="bg-white p-2 rounded border border-dashed">
                    <span className="font-semibold text-xs block mb-0.5">
                      Conduta ({alert.resolvedBy}):
                    </span>
                    {alert.conduct}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <Dialog open={!!resolvingAlert} onOpenChange={(open) => !open && setResolvingAlert(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tratar Alerta Clínico</DialogTitle>
            <DialogDescription>
              Registre a conduta ou intervenção realizada em resposta a este evento. A ação será
              auditada no prontuário.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-4">
            <div
              className={cn(
                'p-3 rounded-lg border text-sm',
                getAlertColor(resolvingAlert?.level || 'Green'),
              )}
            >
              <span className="font-bold block mb-1">Gatilho do Alerta:</span>
              {resolvingAlert?.trigger}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Conduta Adotada</label>
              <Textarea
                value={conductText}
                onChange={(e) => setConductText(e.target.value)}
                placeholder="Ex: Contato realizado com o paciente, ajuste de medicação, orientação..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResolvingAlert(null)}>
              Cancelar
            </Button>
            <Button onClick={handleResolve}>Salvar e Resolver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
