import { useState } from 'react'
import { UserCircle, CheckCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function PortalAccessModal() {
  const { patients, updatePatientPortalAccess } = useAppStore()
  const [open, setOpen] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [access, setAccess] = useState(false)
  const [visibility, setVisibility] = useState<'Simplified' | 'Detailed'>('Detailed')

  const handlePatientSelect = (id: string) => {
    setSelectedPatientId(id)
    const patient = patients.find((p) => p.id === id)
    if (patient) {
      setAccess(patient.hasPortalAccess || false)
      setVisibility(patient.portalVisibility || 'Detailed')
    }
  }

  const handleSave = () => {
    if (selectedPatientId) {
      updatePatientPortalAccess(selectedPatientId, access, visibility)
      toast({
        title: 'Acesso Atualizado',
        description: 'As configurações do Portal do Paciente foram salvas.',
        action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserCircle className="w-4 h-4" /> Gestão de Portal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-primary" /> Configurar Portal do Paciente
          </DialogTitle>
          <DialogDescription>
            Controle o acesso e a visibilidade de laudos e biogramas para seus pacientes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Selecionar Paciente</Label>
            <Select value={selectedPatientId} onValueChange={handlePatientSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um paciente..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPatientId && (
            <div className="space-y-6 p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Liberar Acesso ao Portal</Label>
                  <p className="text-xs text-muted-foreground">
                    Permite login com e-mail/senha para autoavaliação.
                  </p>
                </div>
                <Switch checked={access} onCheckedChange={setAccess} />
              </div>

              {access && (
                <div className="space-y-3 pt-4 border-t">
                  <Label>Nível de Visibilidade de Dados Clínicos</Label>
                  <Select value={visibility} onValueChange={(v) => setVisibility(v as any)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Simplified">
                        <div className="font-medium">Simplificada (Padrão)</div>
                        <span className="text-xs text-muted-foreground block">
                          Apenas gráficos de evolução, autoavaliação e comunicados.
                        </span>
                      </SelectItem>
                      <SelectItem value="Detailed">
                        <div className="font-medium">Detalhada (Avançada)</div>
                        <span className="text-xs text-muted-foreground block">
                          Acesso aos Laudos em PDF, Biograma completo e Certificados ICP-Brasil.
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!selectedPatientId}>
            Salvar Configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
