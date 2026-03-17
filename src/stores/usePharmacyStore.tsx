import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface PharmacyBaseline {
  symptoms: string
  medications: string
  exams: string
  qeeg: string
  summary: string
}

export interface PharmacyFormula {
  id: string
  patientId: string
  actives: Array<{ name: string; dose: string }>
  objective: string
  output: string
  status: 'Pendente' | 'Validada' | 'Revisada'
  date: string
  notes: Array<{ role: string; content: string; date: string }>
}

export interface PharmacyMonitoring {
  id: string
  date: string
  adherence: string
  effects: string
  evolution: string
  qeegBase: string
  qeegCurrent: string
  qeegObs: string
}

export interface PartnerEntity {
  id: string
  nome: string
  tipo: 'laboratorio' | 'farmacia'
  localizacao: string
  certificacoes: string[]
  servicos: string[]
  integracao_api: boolean
  status: 'ativo' | 'inativo'
}

export interface ExamRequest {
  id: string
  patientId: string
  biomarcador: string
  status: 'recomendado' | 'pendente' | 'realizado'
  resultado?: 'baixo' | 'normal' | 'alto'
  impacto_funcional: string
  eixo: string
  dateRequested: string
  datePerformed?: string
}

export interface FunctionalIntervention {
  id: string
  patientId: string
  necessidade: string
  eixo: string
  prioridade: 'baixa' | 'media' | 'alta'
  status: 'proposta' | 'validada' | 'executada'
}

export interface MonetizationEvent {
  id: string
  partnerId: string
  patientId: string
  type: 'revenue_share' | 'fee'
  amount: number
  date: string
}

interface PharmacyState {
  baselines: Record<string, PharmacyBaseline>
  formulas: PharmacyFormula[]
  monitoringLogs: Record<string, PharmacyMonitoring[]>
  setBaseline: (patientId: string, baseline: PharmacyBaseline) => void
  addFormula: (formula: PharmacyFormula) => void
  updateFormulaStatus: (formulaId: string, status: PharmacyFormula['status']) => void
  addFormulaNote: (formulaId: string, note: { role: string; content: string; date: string }) => void
  addMonitoringLog: (patientId: string, log: PharmacyMonitoring) => void

  partners: PartnerEntity[]
  examRequests: ExamRequest[]
  interventions: FunctionalIntervention[]
  monetizationEvents: MonetizationEvent[]
  metabolicAxes: Record<string, { inflamacao: number; energia: number; microbiota: number }>

  addExamRequest: (exam: Omit<ExamRequest, 'id' | 'dateRequested'>) => void
  updateExamStatus: (
    id: string,
    status: ExamRequest['status'],
    resultado?: ExamRequest['resultado'],
  ) => void
  addIntervention: (intervention: Omit<FunctionalIntervention, 'id' | 'status'>) => void
  updateInterventionStatus: (id: string, status: FunctionalIntervention['status']) => void
  addMonetizationEvent: (event: Omit<MonetizationEvent, 'id' | 'date'>) => void
  setMetabolicAxis: (
    patientId: string,
    axis: { inflamacao: number; energia: number; microbiota: number },
  ) => void
}

const PharmacyContext = createContext<PharmacyState | undefined>(undefined)

export function PharmacyStoreProvider({ children }: { children: ReactNode }) {
  const [baselines, setBaselines] = useState<Record<string, PharmacyBaseline>>({})
  const [formulas, setFormulas] = useState<PharmacyFormula[]>([
    {
      id: 'f-mock-1',
      patientId: 'P001',
      actives: [
        { name: 'L-Teanina', dose: '200mg' },
        { name: 'Curcumina', dose: '500mg' },
      ],
      objective: 'Redução de neuroinflamação e ansiedade basal.',
      output:
        'L-Teanina ........... 200mg\nCurcumina ........... 500mg\nExcipiente q.s.p .. 1 dose',
      status: 'Pendente',
      date: new Date().toISOString(),
      notes: [],
    },
  ])
  const [monitoringLogs, setMonitoringLogs] = useState<Record<string, PharmacyMonitoring[]>>({})

  const [partners] = useState<PartnerEntity[]>([
    {
      id: 'lab-1',
      nome: 'NeuroLab Diagnostics',
      tipo: 'laboratorio',
      localizacao: 'São Paulo, SP',
      certificacoes: ['ISO 9001', 'PALC'],
      servicos: ['Biomarcadores Sanguíneos', 'Painel Metabólico'],
      integracao_api: true,
      status: 'ativo',
    },
    {
      id: 'farm-1',
      nome: 'Magistral NeuroFarma',
      tipo: 'farmacia',
      localizacao: 'Rio de Janeiro, RJ',
      certificacoes: ['BPMF', 'ANVISA'],
      servicos: ['Cápsulas', 'Sublinguais', 'Gotas'],
      integracao_api: true,
      status: 'ativo',
    },
    {
      id: 'lab-2',
      nome: 'Metabolik Center',
      tipo: 'laboratorio',
      localizacao: 'Curitiba, PR',
      certificacoes: ['ISO 14001'],
      servicos: ['Análise de Microbiota', 'Exames Funcionais'],
      integracao_api: false,
      status: 'ativo',
    },
    {
      id: 'farm-2',
      nome: 'Essência Vital Farmácia',
      tipo: 'farmacia',
      localizacao: 'Belo Horizonte, MG',
      certificacoes: ['BPMF'],
      servicos: ['Formulações Pediátricas', 'Cápsulas'],
      integracao_api: false,
      status: 'ativo',
    },
  ])

  const [examRequests, setExamRequests] = useState<ExamRequest[]>([])
  const [interventions, setInterventions] = useState<FunctionalIntervention[]>([])
  const [monetizationEvents, setMonetizationEvents] = useState<MonetizationEvent[]>([])
  const [metabolicAxes, setMetabolicAxes] = useState<
    Record<string, { inflamacao: number; energia: number; microbiota: number }>
  >({})

  const setBaseline = (patientId: string, baseline: PharmacyBaseline) => {
    setBaselines((prev) => ({ ...prev, [patientId]: baseline }))
  }
  const addFormula = (formula: PharmacyFormula) => setFormulas((prev) => [formula, ...prev])
  const updateFormulaStatus = (formulaId: string, status: PharmacyFormula['status']) => {
    setFormulas((prev) => prev.map((f) => (f.id === formulaId ? { ...f, status } : f)))
  }
  const addFormulaNote = (
    formulaId: string,
    note: { role: string; content: string; date: string },
  ) => {
    setFormulas((prev) =>
      prev.map((f) => (f.id === formulaId ? { ...f, notes: [...f.notes, note] } : f)),
    )
  }
  const addMonitoringLog = (patientId: string, log: PharmacyMonitoring) => {
    setMonitoringLogs((prev) => ({ ...prev, [patientId]: [log, ...(prev[patientId] || [])] }))
  }

  const addExamRequest = (exam: Omit<ExamRequest, 'id' | 'dateRequested'>) => {
    setExamRequests((prev) => [
      ...prev,
      { ...exam, id: `ex-${Date.now()}`, dateRequested: new Date().toISOString() },
    ])
  }
  const updateExamStatus = (
    id: string,
    status: ExamRequest['status'],
    resultado?: ExamRequest['resultado'],
  ) => {
    setExamRequests((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status,
              resultado,
              datePerformed: status === 'realizado' ? new Date().toISOString() : e.datePerformed,
            }
          : e,
      ),
    )
  }
  const addIntervention = (intervention: Omit<FunctionalIntervention, 'id' | 'status'>) => {
    setInterventions((prev) => [
      ...prev,
      { ...intervention, id: `int-${Date.now()}`, status: 'proposta' },
    ])
  }
  const updateInterventionStatus = (id: string, status: FunctionalIntervention['status']) => {
    setInterventions((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
  }
  const addMonetizationEvent = (event: Omit<MonetizationEvent, 'id' | 'date'>) => {
    setMonetizationEvents((prev) => [
      ...prev,
      { ...event, id: `mon-${Date.now()}`, date: new Date().toISOString() },
    ])
  }
  const setMetabolicAxis = (
    patientId: string,
    axis: { inflamacao: number; energia: number; microbiota: number },
  ) => {
    setMetabolicAxes((prev) => ({ ...prev, [patientId]: axis }))
  }

  return (
    <PharmacyContext.Provider
      value={{
        baselines,
        formulas,
        monitoringLogs,
        setBaseline,
        addFormula,
        updateFormulaStatus,
        addFormulaNote,
        addMonitoringLog,
        partners,
        examRequests,
        interventions,
        monetizationEvents,
        metabolicAxes,
        addExamRequest,
        updateExamStatus,
        addIntervention,
        updateInterventionStatus,
        addMonetizationEvent,
        setMetabolicAxis,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  )
}

export default function usePharmacyStore() {
  const context = useContext(PharmacyContext)
  if (!context) throw new Error('usePharmacyStore must be used within PharmacyStoreProvider')
  return context
}
