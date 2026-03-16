import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings, ShieldCheck, UserCheck } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { Badge } from '@/components/ui/badge'

export function PortalAccessModal() {
  const { patients, updatePatientPortalAccess } = useAppStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
          <Settings className="w-4 h-4 mr-2" /> Acessos ao Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-slate-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-primary">
            <ShieldCheck className="w-6 h-6" /> Gerenciamento de Permissões (Portal do Paciente)
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 border rounded-xl overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead className="text-center">Acesso Ativo</TableHead>
                <TableHead>Nível de Visibilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-muted-foreground" />
                    {p.name}
                    {p.hasPortalAccess && (
                      <Badge
                        variant="secondary"
                        className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      >
                        Conectado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={p.hasPortalAccess}
                      onCheckedChange={(c) =>
                        updatePatientPortalAccess(p.id, c, p.portalVisibility || 'Detailed')
                      }
                      className="mx-auto"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={p.portalVisibility || 'Detailed'}
                      onValueChange={(v: 'Simplified' | 'Detailed') =>
                        updatePatientPortalAccess(p.id, p.hasPortalAccess || false, v)
                      }
                      disabled={!p.hasPortalAccess}
                    >
                      <SelectTrigger className="w-[200px] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Simplified">Simplificado (Resumos)</SelectItem>
                        <SelectItem value="Detailed">Detalhado (Insights)</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
