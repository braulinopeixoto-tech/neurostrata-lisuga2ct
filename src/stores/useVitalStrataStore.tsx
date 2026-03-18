import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface VitalDomainScores {
  neuro: number
  cognitive: number
  emotional: number
  metabolic: number
  contextual: number
}

export interface ProprietaryMetrics {
  reserveDelta: number
  strainIndex: number
  frictionScore: number
  allostaticLoad: number
}

export interface VitalRecord {
  id: string
  patientId: string
  timestamp: string
  domains: VitalDomainScores
  proprietaryMetrics: ProprietaryMetrics
  vitalScore: number
  source: string
  reliability: 'High' | 'Medium' | 'Low'
  evidenceLink: string
  author: string
  isAlert?: boolean
  alertMessage?: string
  hash: string
  interventions?: string[]
}

export interface ClinicalProtocol {
  id: string
  name: string
  type: 'Neuromodulation' | 'Behavioral' | 'Metabolic' | 'Cognitive'
  targetDomain: keyof VitalDomainScores
  expectedOutcome: string
  duration: string
  description: string
}

export interface AppliedIntervention {
  id: string
  patientId: string
  protocolId: string
  appliedAt: string
  appliedBy: string
  rationale: string
  status: 'Active' | 'Completed' | 'Discontinued'
}

export const calculateVitalScore = (domains: VitalDomainScores) => {
  return Math.round(
    domains.neuro * 0.3 +
      domains.cognitive * 0.25 +
      domains.emotional * 0.2 +
      domains.metabolic * 0.15 +
      domains.contextual * 0.1,
  )
}

interface VitalStrataState {
  records: VitalRecord[]
  protocols: ClinicalProtocol[]
  appliedInterventions: AppliedIntervention[]
  addRecord: (record: Omit<VitalRecord, 'id' | 'vitalScore' | 'hash'>) => void
  getPatientRecords: (patientId: string) => VitalRecord[]
  applyIntervention: (
    patientId: string,
    protocolId: string,
    rationale: string,
    author: string,
  ) => void
}

const VitalStrataContext = createContext<VitalStrataState | undefined>(undefined)

const MOCK_PROTOCOLS_VITAL: ClinicalProtocol[] = [
  {
    id: 'cp-01',
    name: 'Estimulação SMR (Sensoriomotora)',
    type: 'Neuromodulation',
    targetDomain: 'neuro',
    expectedOutcome: 'Aumento da estabilidade cortical e redução de hiperatividade motora.',
    duration: '20 sessões',
    description: 'Treinamento de neurofeedback focado na faixa de 12-15Hz na região central (Cz).',
  },
  {
    id: 'cp-02',
    name: 'Treino de Flexibilidade Cognitiva',
    type: 'Cognitive',
    targetDomain: 'cognitive',
    expectedOutcome: 'Melhora no Task-Switching e redução da rigidez atencional.',
    duration: '12 semanas',
    description:
      'Bateria de exercícios neurocognitivos gamificados com aumento progressivo de dificuldade.',
  },
  {
    id: 'cp-03',
    name: 'Modulação Fronto-Límbica (tDCS)',
    type: 'Neuromodulation',
    targetDomain: 'emotional',
    expectedOutcome: 'Maior controle inibitório sobre reatividade emocional.',
    duration: '15 sessões',
    description: 'Estimulação transcraniana por corrente contínua anódica no DLPFC esquerdo.',
  },
  {
    id: 'cp-04',
    name: 'Protocolo Anti-Inflamatório Intenso',
    type: 'Metabolic',
    targetDomain: 'metabolic',
    expectedOutcome: 'Redução de marcadores inflamatórios e melhora do brain fog.',
    duration: '90 dias',
    description: 'Combinação de Ômega-3 (EPA/DHA alto), Cúrcuma e dieta cetogênica cíclica.',
  },
  {
    id: 'cp-05',
    name: 'Reestruturação de Higiene do Sono',
    type: 'Behavioral',
    targetDomain: 'contextual',
    expectedOutcome: 'Aumento da eficiência do sono e recuperação da reserva vagal.',
    duration: '30 dias',
    description:
      'Bloqueio de luz azul pós 20h, regulação térmica do quarto e suplementação de L-Treonato de Magnésio.',
  },
]

const MOCK_RECORDS: VitalRecord[] = [
  {
    id: 'vr-003',
    patientId: 'P001',
    timestamp: new Date().toISOString(),
    domains: { neuro: 78, cognitive: 70, emotional: 55, metabolic: 55, contextual: 45 },
    proprietaryMetrics: {
      reserveDelta: -2,
      strainIndex: 75,
      frictionScore: 40,
      allostaticLoad: 65,
    },
    vitalScore: calculateVitalScore({
      neuro: 78,
      cognitive: 70,
      emotional: 55,
      metabolic: 55,
      contextual: 45,
    }),
    source: 'Revisão Clínica (Check-up)',
    reliability: 'High',
    evidenceLink: '/assessment',
    author: 'Dr. Renato Alves',
    isAlert: true,
    alertMessage:
      'Deterioração Silenciosa: Queda acentuada em eixos metabólico e emocional, enquanto neuro-marcador primário se mantém falsamente estável.',
    hash: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
    interventions: ['Ajuste Medicamentoso', 'Protocolo Nutricional Anti-inflamatório'],
  },
  {
    id: 'vr-002',
    patientId: 'P001',
    timestamp: new Date(Date.now() - 15 * 86400000).toISOString(),
    domains: { neuro: 80, cognitive: 75, emotional: 70, metabolic: 70, contextual: 60 },
    proprietaryMetrics: {
      reserveDelta: -5,
      strainIndex: 60,
      frictionScore: 35,
      allostaticLoad: 50,
    },
    vitalScore: calculateVitalScore({
      neuro: 80,
      cognitive: 75,
      emotional: 70,
      metabolic: 70,
      contextual: 60,
    }),
    source: 'Sincronização Wearables + Auto-relato',
    reliability: 'Medium',
    evidenceLink: '/patient-portal',
    author: 'Sistema Autônomo',
    hash: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
    interventions: [],
  },
]

export function VitalStrataStoreProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<VitalRecord[]>(MOCK_RECORDS)
  const [appliedInterventions, setAppliedInterventions] = useState<AppliedIntervention[]>([])

  const addRecord = (record: Omit<VitalRecord, 'id' | 'vitalScore' | 'hash'>) => {
    const newRecord: VitalRecord = {
      ...record,
      id: `vr-${Date.now()}`,
      vitalScore: calculateVitalScore(record.domains),
      hash:
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    }
    setRecords((prev) => [newRecord, ...prev])
  }

  const applyIntervention = (
    patientId: string,
    protocolId: string,
    rationale: string,
    author: string,
  ) => {
    const protocol = MOCK_PROTOCOLS_VITAL.find((p) => p.id === protocolId)
    if (!protocol) return

    const newApplied: AppliedIntervention = {
      id: `api-${Date.now()}`,
      patientId,
      protocolId,
      appliedAt: new Date().toISOString(),
      appliedBy: author,
      rationale,
      status: 'Active',
    }

    setAppliedInterventions((prev) => [newApplied, ...prev])

    // Generate an Audit Event by creating a new VitalRecord state reflection
    setRecords((prev) => {
      const patientRecords = prev.filter((r) => r.patientId === patientId)
      const latest = patientRecords[0]
      if (!latest) return prev

      const newRecord: VitalRecord = {
        ...latest,
        id: `vr-${Date.now()}`,
        timestamp: new Date().toISOString(),
        source: 'Atribuição de Plano de Cuidado',
        interventions: [...(latest.interventions || []), protocol.name],
        hash:
          Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        author: author,
        isAlert: false,
        alertMessage: undefined,
      }
      return [newRecord, ...prev]
    })
  }

  const getPatientRecords = (patientId: string) => {
    return records
      .filter((r) => r.patientId === patientId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  return (
    <VitalStrataContext.Provider
      value={{
        records,
        protocols: MOCK_PROTOCOLS_VITAL,
        appliedInterventions,
        addRecord,
        getPatientRecords,
        applyIntervention,
      }}
    >
      {children}
    </VitalStrataContext.Provider>
  )
}

export default function useVitalStrataStore() {
  const context = useContext(VitalStrataContext)
  if (!context) throw new Error('useVitalStrataStore must be used within Provider')
  return context
}
