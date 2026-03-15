import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Clock } from 'lucide-react'

export function AuditTab({ patient }: { patient: any }) {
  return (
    <div className="animate-fade-in space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trilha de Auditoria (Timestamp)</CardTitle>
          <CardDescription>
            Histórico de edições e acessos, em conformidade com políticas EHR e LGPD.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border-l ml-4 space-y-6">
            {(patient.auditLogs || []).map((log: any, idx: number) => (
              <div key={log.id || idx} className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-accent rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                <h4 className="font-medium text-sm text-primary">{log.action}</h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(log.date).toLocaleString()}
                  </span>
                  <span>
                    Autor: <strong className="font-medium">{log.user}</strong>
                  </span>
                </div>
              </div>
            ))}
            {(!patient.auditLogs || patient.auditLogs.length === 0) && (
              <p className="text-sm text-muted-foreground ml-4">
                Nenhum registro de auditoria encontrado.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
