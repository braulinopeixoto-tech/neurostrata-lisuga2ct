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
import { ShieldCheck, Hash, FileText } from 'lucide-react'
import { VitalRecord } from '@/stores/useVitalStrataStore'

export function TrustLayerAudit({ records }: { records: VitalRecord[] }) {
  return (
    <Card className="shadow-sm animate-fade-in border-t-4 border-t-emerald-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Auditoria Trust Layer™ (RFH)
        </CardTitle>
        <CardDescription>
          Registro imutável das transições do VitalScore. Alterações geram novas versões.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Data/Hora (UTC)</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Fonte do Dado</TableHead>
                <TableHead>Confiabilidade</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Hash SHA-256</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-xs">
                    {new Date(r.timestamp).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="font-bold">{r.vitalScore}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs">{r.source}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        r.reliability === 'High'
                          ? 'bg-emerald-50 text-emerald-700'
                          : r.reliability === 'Medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                      }
                    >
                      {r.reliability}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{r.author}</TableCell>
                  <TableCell className="text-right">
                    <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 w-max ml-auto">
                      <Hash className="w-3 h-3" /> {r.hash.substring(0, 12)}...
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
