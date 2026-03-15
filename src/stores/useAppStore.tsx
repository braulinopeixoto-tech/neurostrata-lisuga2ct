import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_PATIENTS, MOCK_PROFESSIONALS } from '@/lib/mock-data'

interface AppState {
  patients: typeof MOCK_PATIENTS
  addPatient: (patient: any) => void
  currentAssessmentId: string | null
  setCurrentAssessmentId: (id: string | null) => void
  professionals: typeof MOCK_PROFESSIONALS
  addProfessional: (professional: any) => void
  updateProfessional: (id: string, professional: any) => void
  deleteProfessional: (id: string) => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState(MOCK_PATIENTS)
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null)
  const [professionals, setProfessionals] = useState(MOCK_PROFESSIONALS)

  const addPatient = (patient: any) => {
    const newPatient = {
      id: Date.now().toString(),
      ...patient,
      auditLogs: [
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          action: 'Registro Inicial (EHR)',
          user: 'Usuário Atual',
        },
      ],
    }
    setPatients((prev) => [newPatient, ...prev])
  }

  const addProfessional = (professional: any) => {
    const newProfessional = {
      ...professional,
      id: `NS-P${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
    }
    setProfessionals((prev) => [newProfessional, ...prev])
  }

  const updateProfessional = (id: string, professional: any) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, ...professional } : p)))
  }

  const deleteProfessional = (id: string) => {
    setProfessionals((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <AppStateContext.Provider
      value={{
        patients,
        addPatient,
        currentAssessmentId,
        setCurrentAssessmentId,
        professionals,
        addProfessional,
        updateProfessional,
        deleteProfessional,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export default function useAppStore() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppStore must be used within AppStoreProvider')
  }
  return context
}
