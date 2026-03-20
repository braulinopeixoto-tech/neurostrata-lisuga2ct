import { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Layers, CheckCircle2 } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function NewNeuroModelModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { patients, currentUser } = useAppStore()
  const { createCaseWorkspace } = useTeamFlowStore()

  const [patientId, setPatientId] = useState('')
  const [title, setTitle] = useState('')

  const handleCreate = () => {
    if (!patientId || !title) {
      toast({ title: 'Atenção', description: 'Preencha todos os campos.', variant: 'destructive' })
      return
    }

    createCaseWorkspace(
      {
        patient_id: patientId,
        title,
        status: 'Triagem',
        risk_score: 50,
        consistency_score: 100,
      },
      currentUser.fullName,
    )

    toast({
      title: 'NeuroModel Instanciado',
      description: 'O ambiente BIM clínico foi criado com sucesso.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
    onOpenChange(false)
    setPatientId('')
    setTitle('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Layers className="w-6 h-6 text-indigo-600" /> Novo NeuroModel (BIM Clínico)
          </DialogTitle>
          <DialogDescription>
            Inicie um novo workflow colaborativo. Este processo instanciará as 17 camadas
            dimensionais para o paciente selecionado.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Paciente Alvo</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o paciente..." />
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
          <div className="space-y-2">
            <Label>Título / Hipótese Investigativa</Label>
            <Input
              placeholder="Ex: Investigação de Déficit Atencional Secundário"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-700">
            Instanciar NeuroModel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
