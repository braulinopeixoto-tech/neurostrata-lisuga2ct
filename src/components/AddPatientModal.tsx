import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function AddPatientModal({ children }: { children: React.ReactNode }) {
  const { addPatient } = useAppStore()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', dob: '', sex: '', history: '' })
  const [consent, setConsent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      toast({
        title: 'Atenção',
        description: 'O consentimento LGPD é obrigatório.',
        variant: 'destructive',
      })
      return
    }
    addPatient({
      ...formData,
      lastAssessment: new Date().toISOString().split('T')[0],
      status: 'Ativo',
      score: 0,
    })
    setOpen(false)
    toast({ title: 'Sucesso', description: 'Paciente registrado com sucesso.' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Registrar Novo Paciente</DialogTitle>
            <DialogDescription>Insira os dados clínicos básicos do paciente.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Data de Nascimento</Label>
                <Input
                  id="dob"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sexo Biológico</Label>
                <select
                  id="sex"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.sex}
                  onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="history">Histórico Clínico Breve</Label>
              <Textarea
                id="history"
                placeholder="Queixas principais..."
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="lgpd"
                checked={consent}
                onCheckedChange={(c) => setConsent(c as boolean)}
              />
              <Label
                htmlFor="lgpd"
                className="text-sm font-normal text-muted-foreground leading-snug"
              >
                Confirmo que o paciente forneceu consentimento para o tratamento de dados (LGPD).
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Registro</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
