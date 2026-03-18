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
  addRecord: (record: Omit<VitalRecord, 'id' | 'vitalScore' | 'hash'>) => void
  getPatientRecords: (patientId: string) => VitalRecord[]
}

const VitalStrataContext = createContext<VitalStrataState | undefined>(undefined)

const MOCK_RECORDS: VitalRecord[] = [
  {
    id: 'vr-003',
    patientId: 'P001',
    timestamp: new Date().toISOString(),
    domains: { neuro: 78, cognitive: 70, emotional: 60, metabolic: 55, contextual: 45 },
    proprietaryMetrics: {
      reserveDelta: -2,
      strainIndex: 75,
      frictionScore: 40,
      allostaticLoad: 65,
    },
    vitalScore: calculateVitalScore({
      neuro: 78,
      cognitive: 70,
      emotional: 60,
      metabolic: 55,
      contextual: 45,
    }),
    source: 'Revisão Clínica (Check-up)',
    reliability: 'High',
    evidenceLink: '/assessment',
    author: 'Dr. Renato Alves',
    isAlert: true,
    alertMessage:
      'Deterioração Silenciosa: Queda acentuada em eixos metabólico e contextual, enquanto neuro-marcador primário se mantém falsamente estável.',
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
  {
    id: 'vr-001',
    patientId: 'P001',
    timestamp: new Date(Date.now() - 30 * 86400000).toISOString(),
    domains: { neuro: 80, cognitive: 80, emotional: 80, metabolic: 80, contextual: 80 },
    proprietaryMetrics: { reserveDelta: 0, strainIndex: 30, frictionScore: 20, allostaticLoad: 40 },
    vitalScore: calculateVitalScore({
      neuro: 80,
      cognitive: 80,
      emotional: 80,
      metabolic: 80,
      contextual: 80,
    }),
    source: 'Avaliação Multidimensional (EHR)',
    reliability: 'High',
    evidenceLink: '/report/rep-1',
    author: 'Dr. Renato Alves',
    hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    interventions: ['Início de Terapia', 'Prescrição tDCS'],
  },
]

export function VitalStrataStoreProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<VitalRecord[]>(MOCK_RECORDS)

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

  const getPatientRecords = (patientId: string) => {
    return records
      .filter((r) => r.patientId === patientId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  return (
    <VitalStrataContext.Provider value={{ records, addRecord, getPatientRecords }}>
      {children}
    </VitalStrataContext.Provider>
  )
}

export default function useVitalStrataStore() {
  const context = useContext(VitalStrataContext)
  if (!context) throw new Error('useVitalStrataStore must be used within Provider')
  return context
}
