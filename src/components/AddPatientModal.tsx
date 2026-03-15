import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  const [consent, setConsent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    sex: '',
    education: '',
    familyContext: '',
    medicalHistory: '',
    perinatalHistory: '',
    traumaticHistory: '',
    symptoms: '',
    developmentHistory: '',
    socialBehavior: '',
    cognition: '',
    emotionalRegulation: '',
    adaptiveFunctioning: '',
  })

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
    toast({
      title: 'Sucesso',
      description: 'Paciente e Anamnese registrados com trilha de auditoria.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col p-0 overflow-hidden">
        <div className="p-6 pb-2">
          <DialogHeader>
            <DialogTitle>Registro Clínico e Anamnese</DialogTitle>
            <DialogDescription>
              Gerenciamento avançado com rastreabilidade (LGPD/EHR).
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="ident" className="flex-1 flex flex-col min-h-0 w-full px-6">
            <TabsList className="grid w-full grid-cols-3 shrink-0">
              <TabsTrigger value="ident">Identificação</TabsTrigger>
              <TabsTrigger value="anamnesis">Anamnese</TabsTrigger>
              <TabsTrigger value="lgpd">Conformidade</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1 mt-4 -mx-6 px-6">
              <TabsContent value="ident" className="space-y-4 m-0 pb-6">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nascimento</Label>
                    <Input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sexo</Label>
                    <select
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
                  <Label>Escolaridade</Label>
                  <Input
                    placeholder="Ex: Ensino Superior"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contexto Familiar / Social</Label>
                  <Input
                    placeholder="Ex: Casado, 2 filhos"
                    value={formData.familyContext}
                    onChange={(e) => setFormData({ ...formData, familyContext: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Histórico Médico Geral</Label>
                  <Textarea
                    placeholder="Comorbidades, medicações, internações..."
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Histórico Perinatal</Label>
                    <Input
                      value={formData.perinatalHistory}
                      onChange={(e) =>
                        setFormData({ ...formData, perinatalHistory: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Histórico Traumático</Label>
                    <Input
                      value={formData.traumaticHistory}
                      onChange={(e) =>
                        setFormData({ ...formData, traumaticHistory: e.target.value })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="anamnesis" className="space-y-4 m-0 pb-6">
                <div className="space-y-2">
                  <Label>Sintomas Atuais (Queixa Principal)</Label>
                  <Textarea
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Histórico de Desenvolvimento</Label>
                  <Textarea
                    placeholder="Marcos do desenvolvimento, infância, adolescência..."
                    value={formData.developmentHistory}
                    onChange={(e) =>
                      setFormData({ ...formData, developmentHistory: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Comportamento Social</Label>
                    <Textarea
                      className="h-20"
                      value={formData.socialBehavior}
                      onChange={(e) => setFormData({ ...formData, socialBehavior: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Desempenho Cognitivo</Label>
                    <Textarea
                      className="h-20"
                      value={formData.cognition}
                      onChange={(e) => setFormData({ ...formData, cognition: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Regulação Emocional</Label>
                    <Textarea
                      className="h-20"
                      value={formData.emotionalRegulation}
                      onChange={(e) =>
                        setFormData({ ...formData, emotionalRegulation: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Funcionamento Adaptativo</Label>
                    <Textarea
                      className="h-20"
                      value={formData.adaptiveFunctioning}
                      onChange={(e) =>
                        setFormData({ ...formData, adaptiveFunctioning: e.target.value })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lgpd" className="space-y-6 m-0 pb-6">
                <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground space-y-2 border">
                  <p>
                    <strong>Aviso Legal (LGPD e EHR):</strong> Todos os dados inseridos são
                    processados com criptografia estruturada. A criação deste registro gerará uma
                    assinatura temporal imutável atrelada ao usuário logado, em conformidade com
                    normas de prontuário eletrônico (EHR).
                  </p>
                </div>
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="lgpd"
                    checked={consent}
                    onCheckedChange={(c) => setConsent(c as boolean)}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="lgpd"
                    className="text-sm font-medium text-foreground leading-snug cursor-pointer"
                  >
                    Confirmo que possuo consentimento explícito do paciente (ou responsável legal)
                    para tratamento destes dados clínicos sensíveis, e concordo com a gravação de
                    auditoria do sistema.
                  </Label>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
          <div className="p-6 border-t bg-background shrink-0">
            <Button type="submit" className="w-full">
              Assinar e Finalizar Registro
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
