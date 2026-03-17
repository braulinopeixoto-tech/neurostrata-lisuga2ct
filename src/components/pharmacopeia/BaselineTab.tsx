import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Activity, Sparkles, CheckCircle2 } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import { toast } from '@/components/ui/use-toast'

export function BaselineTab() {
  const { patients } = useAppStore()
  const { baselines, setBaseline } = usePharmacyStore()
  const [patientId, setPatientId] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [medications, setMedications] = useState('')
  const [exams, setExams] = useState('')
  const [qeeg, setQeeg] = useState('')
  const [summary, setSummary] = useState('')

  useEffect(() => {
    if (patientId && baselines[patientId]) {
      const b = baselines[patientId]
      setSymptoms(b.symptoms)
      setMedications(b.medications)
      setExams(b.exams)
      setQeeg(b.qeeg)
      setSummary(b.summary)
    } else {
      setSymptoms('')
      setMedications('')
      setExams('')
      setQeeg('')
      setSummary('')
    }
  }, [patientId, baselines])

  const handleGenerate = () => {
    if (!patientId) {
      toast({
        title: 'Atenção',
        description: 'Selecione um paciente primeiro.',
        variant: 'destructive',
      })
      return
    }
    const newSummary = `Resumo Funcional (Gerado por IA):\nPaciente apresenta sintomas primários que indicam possível desregulação do eixo HPA e alterações de sono. A medicação atual sugere tentativa de controle inibitório. Achados de qEEG compatíveis com hiperativação límbica. Recomenda-se suporte antioxidante e modulação gabaérgica.`
    setSummary(newSummary)
    setBaseline(patientId, { symptoms, medications, exams, qeeg, summary: newSummary })
    toast({
      title: 'Resumo Gerado',
      description: 'Baseline salvo e resumo funcional atualizado.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Patient Baseline Dashboard
          </CardTitle>
          <CardDescription>
            Consolide o estado atual do paciente para orientar a intervenção farmacêutica.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-md space-y-2 mb-4">
            <Label>Selecione o Paciente</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione..." />
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

          {patientId && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Sintomas Principais</Label>
                  <Textarea
                    placeholder="Ex: Fadiga extrema, insônia de manutenção..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Medicações e Suplementos Atuais</Label>
                  <Textarea
                    placeholder="Ex: Escitalopram 10mg, Vitamina D..."
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exames Laboratoriais (Opcional)</Label>
                  <Textarea
                    placeholder="Ex: PCR-us elevado, Ferritina baixa..."
                    value={exams}
                    onChange={(e) => setExams(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Marcadores qEEG (Opcional)</Label>
                  <Textarea
                    placeholder="Ex: Assimetria Alpha frontal..."
                    value={qeeg}
                    onChange={(e) => setQeeg(e.target.value)}
                  />
                </div>
                <Button onClick={handleGenerate} className="w-full">
                  <Sparkles className="w-4 h-4 mr-2 text-accent" /> Gerar Resumo Funcional
                </Button>
              </div>

              <div className="bg-muted/30 p-4 rounded-xl border border-dashed flex flex-col h-full">
                <Label className="mb-2 uppercase text-xs font-bold text-muted-foreground">
                  Functional Case Summary
                </Label>
                {summary ? (
                  <div className="bg-white p-4 rounded border shadow-sm text-sm text-slate-700 leading-relaxed whitespace-pre-wrap flex-1">
                    {summary}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm text-center px-8">
                    Preencha os dados e clique em "Gerar Resumo Funcional" para obter a síntese
                    clínica cruzada.
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
