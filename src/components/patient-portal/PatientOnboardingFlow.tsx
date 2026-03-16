import { useState } from 'react'
import { Brain, ShieldCheck, UserCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

export function PatientOnboardingFlow({ patientId }: { patientId: string }) {
  const { professionals, linkProfessional, setPatientOnboarded } = useAppStore()
  const [lgpdAccepted, setLgpdAccepted] = useState(false)
  const [selectedProfId, setSelectedProfId] = useState('')

  const handleConfirm = () => {
    if (!lgpdAccepted || !selectedProfId) {
      toast({
        title: 'Atenção',
        description: 'Aceite os termos e selecione um profissional para continuar.',
        variant: 'destructive',
      })
      return
    }

    const prof = professionals.find((p) => p.id === selectedProfId)
    if (prof) {
      linkProfessional(patientId, { id: prof.id, name: prof.fullName, role: prof.specialty })
      setPatientOnboarded(patientId, true)
      toast({
        title: 'Acesso Liberado',
        description: 'Seu vínculo profissional foi estabelecido com sucesso.',
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in mt-10">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-primary">Bem-vindo ao Check-up Mental</h2>
        <p className="text-lg text-muted-foreground">
          Para garantir sua segurança clínica e a privacidade dos seus dados, precisamos configurar
          seu acesso supervisionado.
        </p>
      </div>

      <Card className="border-t-4 border-t-accent shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-accent" /> Vínculo Profissional
          </CardTitle>
          <CardDescription>
            Selecione o profissional de saúde que irá acompanhar e validar seus resultados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select value={selectedProfId} onValueChange={setSelectedProfId}>
            <SelectTrigger className="w-full h-12 text-base">
              <SelectValue placeholder="Selecione seu Médico ou Psicólogo..." />
            </SelectTrigger>
            <SelectContent>
              {professionals.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.fullName} ({p.specialty})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="lgpd"
                checked={lgpdAccepted}
                onCheckedChange={(c) => setLgpdAccepted(!!c)}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="lgpd"
                  className="text-sm font-medium leading-tight cursor-pointer text-foreground"
                >
                  Consentimento de Uso de Dados (LGPD)
                </label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Autorizo o processamento dos meus dados neurofuncionais e comportamentais para
                  fins de acompanhamento clínico. Entendo que meus dados são criptografados e
                  somente meu profissional vinculado terá acesso.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleConfirm} className="w-full h-12 text-base" size="lg">
            <ShieldCheck className="w-5 h-5 mr-2" /> Iniciar Jornada Segura
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
