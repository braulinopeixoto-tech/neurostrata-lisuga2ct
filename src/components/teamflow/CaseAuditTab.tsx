import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Hash } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'

export function CaseAuditTab({ caseId }: { caseId: string }) {
  const { auditLogs } = useTeamFlowStore()

  // Filter logs related to this case or reports inside this case
  const caseLogs = auditLogs.filter(
    (log) => log.entity_id === caseId || log.entity_type === 'specialty_report',
  )

  return (
    <Card className="shadow-sm border-t-4 border-t-emerald-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Trust Layer™ Case Ledger
        </CardTitle>
        <CardDescription>
          Registro imutável de todas as submissões de relatórios e mudanças de status (LGPD & HIPAA
          Compliant).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Carimbo de Tempo</TableHead>
                <TableHead>Ação / Entidade</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-right">Hash SHA-256</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    Nenhum log registrado para este caso.
                  </TableCell>
                </TableRow>
              ) : (
                caseLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-800">{log.action}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {log.entity_type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50">
                        {log.actor_id}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-emerald-50 border border-emerald-100 px-2 py-1 rounded text-emerald-700">
                        <Hash className="w-3 h-3" /> {log.id.substring(0, 16)}...
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
