import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  FlaskConical,
  BookOpen,
  PenLine,
  ArrowRight,
  Zap,
  Syringe,
  Pill,
  Beaker,
  Brain,
  Sparkles,
  RefreshCw,
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'
import { QuickReportValidationModal } from './QuickReportValidationModal'
import { SmartClinicalAlerts } from '@/components/medical/SmartClinicalAlerts'

export function ClinicalHubTab() {
  const { quickReportDraft, setQuickReportDraft, patients, updatePatient } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  const MOCK_AI_SUGGESTION = {
    scoreImpact: -5,
    newScore: 57,
    dimensions: {
      cognition: {
        status: 'Moderado',
        label: '🟡 Moderado',
        reason: 'Déficit atencional sustentado extraído do relato',
      },
      emotion: {
        status: 'Alterado',
        label: '🔴 Alterado',
        reason: 'Pico de ansiedade reportado (insônia)',
      },
      behavior: {
        status: 'Alterado',
        label: '🔴 Alterado',
        reason: 'Irritabilidade e sono fragmentado',
      },
    },
    functionalAreas: {
      neuropsychology: {
        status: 'Crítico',
        summary: 'Piora na atenção sustentada e controle inibitório.',
      },
      pharmacy: { status: 'Atenção', summary: 'Sugerido ajuste no protocolo ansiolítico/foco.' },
      nutrition: {
        status: 'Atenção',
        summary: 'Indícios de neuroinflamação impactando sono e irritabilidade.',
      },
      speechTherapy: {
        status: 'Normal',
        summary: 'Sem queixas de processamento da linguagem neste relato.',
      },
      psychopedagogy: {
        status: 'Crítico',
        summary: 'Impacto direto no rendimento e atenção escolar reportado.',
      },
    },
  }

  const handleProcessReport = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowValidation(true)
    }, 2000)
  }

  const handleConfirmValidation = () => {
    updatePatient(selectedPatientId, {
      score: MOCK_AI_SUGGESTION.newScore,
      dimensions: MOCK_AI_SUGGESTION.dimensions,
      functionalAreas: MOCK_AI_SUGGESTION.functionalAreas,
    })

    toast({
      title: 'Integração Concluída',
      description: 'Os dados foram validados e o Painel Neurofuncional do paciente foi atualizado.',
    })
    setShowValidation(false)
    setQuickReportDraft('')
  }

  const patientName = patients.find((p) => p.id === selectedPatientId)?.name || 'Paciente'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <Card className="lg:col-span-2 shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" /> Quick Report (IA)
          </CardTitle>
          <CardDescription>
            Geração rápida de resumos clínicos com IA. Estratifica notas não estruturadas nas
            dimensões da Avaliação Multifuncional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-2">
            <Label className="font-medium whitespace-nowrap">Paciente-alvo:</Label>
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
              <SelectTrigger className="w-full sm:w-[250px] bg-slate-50">
                <SelectValue placeholder="Selecione o paciente" />
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

          {selectedPatientId && <SmartClinicalAlerts patientId={selectedPatientId} />}

          <Textarea
            placeholder="Descreva suas observações clínicas brutas de forma livre. A IA analisará e distribuirá as informações nos painéis de Cognição, Emoção, Comportamento e nas áreas funcionais..."
            className="min-h-[220px] bg-slate-50/50"
            value={quickReportDraft}
            onChange={(e) => setQuickReportDraft(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 gap-4">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 hidden sm:flex">
              <Sparkles className="w-3 h-3 text-accent" /> Baseado no motor NeuroStrata™
            </p>
            <div className="flex justify-end gap-3 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setQuickReportDraft('')}>
                Limpar
              </Button>
              <Button
                onClick={handleProcessReport}
                disabled={isProcessing || !quickReportDraft.trim()}
                className="bg-accent hover:bg-accent/90"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isProcessing ? 'Analisando...' : 'Processar Relatório (IA)'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="shadow-sm border-t-4 border-t-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-500" /> Área de Nova Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Inicie um workflow estruturado para avaliação neurofuncional de novos pacientes.
            </p>
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link to="/assessment">
                Iniciar Avaliação <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-accent" /> Farmacopeia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Referência pesquisável de medicamentos, suplementos e interações farmacológicas.
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link to="/pharmacopeia">
                Acessar Farmacopeia <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" /> Biblioteca de Protocolos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-xs text-center font-medium h-16">
                <Pill className="w-4 h-4 mb-1 text-blue-500" /> Medicamentosos
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-[11px] leading-tight text-center font-medium h-16">
                <Zap className="w-4 h-4 mb-1 text-amber-500" /> Protocolos de Neuromodulação
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-xs text-center font-medium h-16">
                <Syringe className="w-4 h-4 mb-1 text-emerald-500" /> Protocolos Injetáveis
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-[11px] leading-tight text-center font-medium h-16">
                <Beaker className="w-4 h-4 mb-1 text-purple-500" /> Protocolos de Manipulação
              </div>
            </div>
            <Button asChild className="w-full" variant="outline">
              <Link to="/protocols">
                Ver Protocolos <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <QuickReportValidationModal
        open={showValidation}
        onOpenChange={setShowValidation}
        patientName={patientName}
        suggestion={MOCK_AI_SUGGESTION}
        onConfirm={handleConfirmValidation}
      />
    </div>
  )
}
