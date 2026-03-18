import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Building2, Save } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import { toast } from '@/components/ui/use-toast'

export function ClinicSettingsModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { organization, updateOrganization } = useTeamFlowStore()
  const [name, setName] = useState(organization.name)
  const [crm, setCrm] = useState(organization.crm)

  useEffect(() => {
    if (open) {
      setName(organization.name)
      setCrm(organization.crm)
    }
  }, [open, organization])

  const handleSave = () => {
    updateOrganization({ name, crm })
    toast({
      title: 'Configurações Salvas',
      description: 'A identidade do núcleo clínico foi atualizada com sucesso.',
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" /> Identidade do Núcleo
          </DialogTitle>
          <DialogDescription>
            Defina o nome da clínica e o registro do responsável técnico (Medical Leader) que
            assinará os laudos integrados.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clinic-name">Nome da Instituição / Clínica</Label>
            <Input id="clinic-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clinic-crm">Registro (CRM/RQE do Líder)</Label>
            <Input id="clinic-crm" value={crm} onChange={(e) => setCrm(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Save className="w-4 h-4 mr-2" /> Salvar Configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
