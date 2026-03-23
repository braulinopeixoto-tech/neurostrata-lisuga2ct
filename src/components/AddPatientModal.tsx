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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'
import { BrainCircuit, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AddPatientModal({ children }: { children: React.ReactNode }) {
  const { addPatient } = useAppStore()
  const navigate = useNavigate()
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
        description: 'O consentimento LGPD é obrigatório na Trust Layer™.',
        variant: 'destructive',
      })
      return
    }

    // Auto-generate a dummy ID or let the store handle it
    addPatient({
      ...formData,
      lastAssessment: new Date().toISOString().split('T')[0],
      status: 'Ativo',
      score: 0,
    })

    setOpen(false)
    toast({
      title: 'Paciente Inserido no Motor Clínico',
      description: 'O prontuário foi criado e registrado no log de auditoria.',
    })

    // Redirect to Clinical Journey (Layer 1)
    setTimeout(() => {
      navigate('/clinical-journey')
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[750px] h-[90vh] flex flex-col p-0 overflow-hidden bg-slate-50 border-slate-200">
        <div className="p-6 pb-4 bg-white border-b border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-slate-900">
              <BrainCircuit className="w-6 h-6 text-blue-600" /> Registro Inicial (Input Clínico)
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600">
              Criação de novo paciente no ecossistema NeuroStrata OS.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 bg-slate-50">
          <Tabs defaultValue="ident" className="flex-1 flex flex-col min-h-0 w-full px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3 shrink-0 bg-slate-200 p-1 rounded-xl h-12">
              <TabsTrigger
                value="ident"
                className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-700"
              >
                Identificação
              </TabsTrigger>
              <TabsTrigger
                value="anamnesis"
                className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-700"
              >
                Queixa Primária
              </TabsTrigger>
              <TabsTrigger
                value="lgpd"
                className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900"
              >
                Trust Layer™
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1 mt-6 -mx-6 px-6">
              <TabsContent value="ident" className="space-y-5 m-0 pb-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Nome Completo</Label>
                  <Input
                    required
                    className="bg-white border-slate-200 h-11"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold">Nascimento</Label>
                    <Input
                      type="date"
                      required
                      className="bg-white border-slate-200 h-11"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold">Sexo</Label>
                    <select
                      className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                  <Label className="text-slate-700 font-bold">Escolaridade</Label>
                  <Input
                    placeholder="Ex: Ensino Superior"
                    className="bg-white border-slate-200 h-11"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Histórico Médico Base</Label>
                  <Textarea
                    className="bg-white border-slate-200 min-h-[100px]"
                    placeholder="Comorbidades prévias conhecidas..."
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="anamnesis" className="space-y-5 m-0 pb-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Sintomas e Queixa Principal</Label>
                  <Textarea
                    className="bg-white border-slate-200 min-h-[120px]"
                    placeholder="Descreva o motivo principal que traz o paciente à avaliação..."
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Comportamento Social Observado</Label>
                  <Textarea
                    className="bg-white border-slate-200 h-24"
                    value={formData.socialBehavior}
                    onChange={(e) => setFormData({ ...formData, socialBehavior: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Regulação Emocional Reportada</Label>
                  <Textarea
                    className="bg-white border-slate-200 h-24"
                    value={formData.emotionalRegulation}
                    onChange={(e) =>
                      setFormData({ ...formData, emotionalRegulation: e.target.value })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="lgpd" className="space-y-6 m-0 pb-6">
                <div className="bg-slate-900 p-5 rounded-xl text-sm text-slate-300 space-y-3 border border-slate-800 shadow-inner">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2 border-b border-slate-700 pb-2">
                    <ShieldCheck className="w-4 h-4" /> Conformidade e Rastreabilidade
                  </div>
                  <p>
                    Ao registrar este paciente, o motor <strong>NeuroStrata OS</strong> criará um{' '}
                    <em>hash criptográfico único</em> (SHA-256).
                  </p>
                  <p>
                    Este registro inicial servirá como a <strong>Linha de Base</strong> no Núcleo
                    Diagnóstico. Todas as futuras adições de psicometrias ou biomarcadores serão
                    versionadas contra este registro imutável.
                  </p>
                </div>
                <div className="flex items-start space-x-3 pt-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <Checkbox
                    id="lgpd"
                    checked={consent}
                    onCheckedChange={(c) => setConsent(c as boolean)}
                    className="mt-1 border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <Label
                    htmlFor="lgpd"
                    className="text-sm font-semibold text-slate-800 leading-snug cursor-pointer"
                  >
                    Confirmo o consentimento explícito para tratamento de dados clínicos sensíveis,
                    ciente de que a autoria desta inserção será anexada ao meu perfil profissional
                    na Trust Layer™.
                  </Label>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
          <div className="p-6 border-t border-slate-200 bg-white shrink-0 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 shadow-sm"
            >
              Registrar e Iniciar Jornada
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
