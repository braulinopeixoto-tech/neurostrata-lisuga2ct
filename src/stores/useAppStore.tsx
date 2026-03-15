import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_PATIENTS } from '@/lib/mock-data'

interface AppState {
  patients: typeof MOCK_PATIENTS
  addPatient: (patient: any) => void
  currentAssessmentId: string | null
  setCurrentAssessmentId: (id: string | null) => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState(MOCK_PATIENTS)
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null)

  const addPatient = (patient: any) => {
    setPatients((prev) => [{ id: Date.now().toString(), ...patient }, ...prev])
  }

  return (
    <AppStateContext.Provider
      value={{ patients, addPatient, currentAssessmentId, setCurrentAssessmentId }}
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
