import { useState } from 'react'
import { ShieldCheck, CheckCircle2, Lock, FileEdit, Activity, Brain } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore, { CheckupStageId } from '@/stores/useAppStore'
import { BrainMapVisualizer } from '@/components/charts/BrainMapVisualizer'
import { toast } from '@/components/ui/use-toast'

export function SupervisionPanelTab() {
  const { patients, patientJourneys, validateJourneyStage, currentUser } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('P001')

  const journey = patientJourneys[selectedPatientId]

  const handleValidate = (stage: CheckupStageId) => {
    validateJourneyStage(
      selectedPatientId,
      stage,
      currentUser.fullName,
      'Validado via Supervisão Neuropsicológica',
    )
    toast({ title: 'Etapa Validada', description: 'Nível processado com sucesso.' })
  }

  const renderStage = (id: CheckupStageId, title: string) => {
    const status = journey?.stages[id] || 'locked'
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white mb-3 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          {status === 'validated' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {status === 'pending_validation' && (
            <Activity className="w-5 h-5 text-amber-500 shrink-0" />
          )}
          {status === 'available' && <Activity className="w-5 h-5 text-blue-500 shrink-0" />}
          {status === 'locked' && <Lock className="w-5 h-5 text-muted-foreground shrink-0" />}
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <div className="shrink-0 flex items-center justify-end">
          {status === 'pending_validation' && (
            <Button size="sm" onClick={() => handleValidate(id)} className="w-full sm:w-auto">
              <FileEdit className="w-4 h-4 mr-2" /> Validar Etapa
            </Button>
          )}
          {status === 'validated' && (
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 w-full sm:w-auto justify-center">
              Validado
            </Badge>
          )}
          {status === 'locked' && (
            <Badge variant="secondary" className="w-full sm:w-auto justify-center">
              Bloqueado
            </Badge>
          )}
          {status === 'available' && (
            <Badge
              variant="outline"
              className="text-blue-600 bg-blue-50 w-full sm:w-auto justify-center"
            >
              Em Preenchimento
            </Badge>
          )}
        </div>
      </div>
    )
  }

  const isLevel1Valid = journey?.stages.level1_dass21 === 'validated'
  const isLevel2Valid =
    journey?.stages.level2_functions === 'validated' &&
    journey?.stages.level2_rdoc === 'validated' &&
    journey?.stages.level2_bigfive === 'validated'
  const isLevel3Valid = journey?.stages.level3_performance === 'validated'
  const finalUnlocked = isLevel1Valid && isLevel2Valid && isLevel3Valid

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Painel de Supervisão (Check-up Mental)</CardTitle>
          <CardDescription>
            Controle o fluxo de validação estratificada dos testes psicométricos respondidos pelos
            pacientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mb-6">
            <label className="text-sm font-medium mb-1 block">Selecionar Paciente</label>
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
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

          <div className="space-y-8">
            <section>
              <h3 className="font-semibold text-lg border-b pb-2 mb-4">Nível 01: Rastreio</h3>
              {renderStage('level1_dass21', 'Escala DASS-21')}
            </section>

            <section>
              <h3 className="font-semibold text-lg border-b pb-2 mb-4">
                Nível 02: Mapeamento Multidimensional
              </h3>
              <div className="bg-muted/30 p-4 rounded-xl border border-dashed">
                {renderStage('level2_functions', '18 Funções Psíquicas')}
                {renderStage('level2_rdoc', 'Sistemas RDoC')}
                {renderStage('level2_bigfive', 'Perfil de Personalidade (Big Five)')}
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-lg border-b pb-2 mb-4">
                Nível 03: Testes de Performance
              </h3>
              {renderStage('level3_performance', 'Bateria de Performance (Aprovada pelo CFP)')}
            </section>
          </div>
        </CardContent>
      </Card>

      {finalUnlocked ? (
        <Card className="border-emerald-500 border-t-4 shadow-sm animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-emerald-700 flex items-center gap-2">
              <Brain className="w-6 h-6" /> Mapa Final da Arquitetura Mental
            </CardTitle>
            <CardDescription>
              Visualização integrada desbloqueada após a validação completa do check-up.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-6 bg-slate-50 rounded-b-lg">
            <BrainMapVisualizer
              variant="default"
              title="Assinatura Funcional Global"
              subtitle="Integrado Nível 1 ao 3"
              className="scale-125 my-6"
            />
            <p className="text-sm text-center text-muted-foreground mt-6 max-w-md">
              A topografia atual indica estabilidade executiva e boa regulação da rede de saliência,
              compatível com os dados validados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed shadow-none bg-muted/20">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center text-muted-foreground">
            <Lock className="w-12 h-12 mb-4 opacity-50" />
            <h3 className="font-semibold text-lg text-foreground">
              Mapa da Arquitetura Mental Bloqueado
            </h3>
            <p className="max-w-md mt-1">
              Conclua e valide todos os níveis de avaliação acima para desbloquear a síntese
              neurofuncional do paciente.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
