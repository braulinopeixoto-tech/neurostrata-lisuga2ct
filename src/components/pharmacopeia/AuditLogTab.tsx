import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { History, ShieldCheck, Clock, User } from 'lucide-react'
import useTrustStore from '@/stores/useTrustStore'
import { Badge } from '@/components/ui/badge'

export function AuditLogTab() {
  const { auditLogs } = useTrustStore()

  const moduleLogs = auditLogs.filter((log) => log.origem.includes('Gestão Metabólica'))

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-amber-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="w-5 h-5 text-amber-600" /> Log de Auditoria (Trust Layer™)
          </CardTitle>
          <CardDescription>
            Rastreabilidade automatizada de todas as decisões, solicitações e validações clínicas
            realizadas no módulo de Gestão Metabólica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden bg-white shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[180px]">Data/Hora</TableHead>
                  <TableHead>Profissional (Registro)</TableHead>
                  <TableHead>Ação / Evento</TableHead>
                  <TableHead>Módulo Origem</TableHead>
                  <TableHead className="text-right">Status do Registro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moduleLogs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-10 bg-slate-50/50"
                    >
                      Nenhum registro de auditoria gerado na sessão atual.
                      <br /> Interaja com as abas do módulo para criar evidências rastreáveis.
                    </TableCell>
                  </TableRow>
                ) : (
                  moduleLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="text-slate-600 text-xs font-mono whitespace-nowrap h-full py-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          {new Date(log.data).toLocaleString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-800 text-sm">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-muted-foreground" /> {log.profissional}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-slate-700">
                        {log.evento}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-normal text-[10px] bg-slate-100 text-slate-600"
                        >
                          {log.origem}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {log.decisao_validada ? (
                          <span className="inline-flex items-center text-emerald-600 text-xs font-semibold gap-1 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                            <ShieldCheck className="w-3.5 h-3.5" /> Assinado
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs font-medium px-2 py-1 bg-slate-100 rounded border border-slate-200">
                            Pendente
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
