import { useState } from 'react'
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
import { Slider } from '@/components/ui/slider'
import { Activity, Brain, CheckCircle2 } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import { toast } from '@/components/ui/use-toast'

export function MonitoringTab() {
  const { patients } = useAppStore()
  const { addMonitoringLog, monitoringLogs } = usePharmacyStore()

  const [patientId, setPatientId] = useState('')
  const [adherence, setAdherence] = useState([8])
  const [effects, setEffects] = useState('')
  const [evolution, setEvolution] = useState('')
  const [qeegBase, setQeegBase] = useState('')
  const [qeegCurrent, setQeegCurrent] = useState('')
  const [qeegObs, setQeegObs] = useState('')

  const handleSave = () => {
    if (!patientId) {
      toast({ title: 'Erro', description: 'Selecione um paciente.', variant: 'destructive' })
      return
    }

    addMonitoringLog(patientId, {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      adherence: adherence[0].toString(),
      effects,
      evolution,
      qeegBase,
      qeegCurrent,
      qeegObs,
    })

    toast({
      title: 'Monitoramento Salvo',
      description: 'Evolução clínica e marcadores registrados.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
    setEffects('')
    setEvolution('')
    setQeegBase('')
    setQeegCurrent('')
    setQeegObs('')
  }

  const logs = patientId ? monitoringLogs[patientId] || [] : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Registro Clínico
          </CardTitle>
          <CardDescription>Acompanhe adesão e efeitos do plano farmacêutico.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Paciente</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger>
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

          <div className="space-y-4 pt-2">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Adesão ao Tratamento (1-10)</Label>
                <span className="font-bold">{adherence[0]}</span>
              </div>
              <Slider max={10} min={1} step={1} value={adherence} onValueChange={setAdherence} />
            </div>
            <div className="space-y-2">
              <Label>Efeitos Percebidos (Subjetivo)</Label>
              <Textarea
                placeholder="Descreva os efeitos relatados pelo paciente..."
                value={effects}
                onChange={(e) => setEffects(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Evolução Clínica (Objetiva)</Label>
              <Textarea
                placeholder="Descreva a evolução baseada em avaliações e escalas..."
                value={evolution}
                onChange={(e) => setEvolution(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-t-4 border-t-blue-500 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" /> Validação Simples (qEEG)
          </CardTitle>
          <CardDescription>
            Correlacione o uso da fórmula com variações topográficas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Marcador Base (Pré)</Label>
              <Input
                placeholder="Ex: Beta excessivo Frontal"
                value={qeegBase}
                onChange={(e) => setQeegBase(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Marcador Atual (Pós)</Label>
              <Input
                placeholder="Ex: Aumento de Alpha Parietal"
                value={qeegCurrent}
                onChange={(e) => setQeegCurrent(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Descrição da Modulação Neural</Label>
            <Textarea
              placeholder="Sintetize como a intervenção impactou a rede neural alvo..."
              className="h-24"
              value={qeegObs}
              onChange={(e) => setQeegObs(e.target.value)}
            />
          </div>
          <Button onClick={handleSave} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
            Registrar Evolução Global
          </Button>
        </CardContent>
      </Card>

      {logs.length > 0 && (
        <Card className="lg:col-span-2 shadow-sm bg-slate-50">
          <CardHeader>
            <CardTitle className="text-base">Histórico de Monitoramento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-white p-4 rounded border shadow-sm flex flex-col md:flex-row gap-6"
              >
                <div className="flex-1 space-y-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    {new Date(log.date).toLocaleDateString()}
                  </span>
                  <p className="text-sm">
                    <strong className="text-slate-700">Adesão:</strong> {log.adherence}/10
                  </p>
                  <p className="text-sm">
                    <strong className="text-slate-700">Efeitos:</strong> {log.effects}
                  </p>
                  <p className="text-sm">
                    <strong className="text-slate-700">Evolução:</strong> {log.evolution}
                  </p>
                </div>
                {(log.qeegBase || log.qeegCurrent) && (
                  <div className="flex-1 border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-6 space-y-2">
                    <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Brain className="w-3 h-3" /> Modulação qEEG
                    </p>
                    <p className="text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded">
                      Pré: {log.qeegBase} ➔ Pós: {log.qeegCurrent}
                    </p>
                    <p className="text-xs text-muted-foreground italic mt-1">"{log.qeegObs}"</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
