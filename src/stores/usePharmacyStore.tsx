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

interface PharmacyState {
  baselines: Record<string, PharmacyBaseline>
  formulas: PharmacyFormula[]
  monitoringLogs: Record<string, PharmacyMonitoring[]>
  setBaseline: (patientId: string, baseline: PharmacyBaseline) => void
  addFormula: (formula: PharmacyFormula) => void
  updateFormulaStatus: (formulaId: string, status: PharmacyFormula['status']) => void
  addFormulaNote: (formulaId: string, note: { role: string; content: string; date: string }) => void
  addMonitoringLog: (patientId: string, log: PharmacyMonitoring) => void
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

  const setBaseline = (patientId: string, baseline: PharmacyBaseline) => {
    setBaselines((prev) => ({ ...prev, [patientId]: baseline }))
  }

  const addFormula = (formula: PharmacyFormula) => {
    setFormulas((prev) => [formula, ...prev])
  }

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
    setMonitoringLogs((prev) => ({
      ...prev,
      [patientId]: [log, ...(prev[patientId] || [])],
    }))
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
