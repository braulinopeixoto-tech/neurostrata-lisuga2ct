import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_PATIENTS, MOCK_PROFESSIONALS, MOCK_FORMULAS } from '@/lib/mock-data'

interface AppState {
  currentUser: { id: string; fullName: string; role: string; registrationId: string }
  patients: typeof MOCK_PATIENTS
  addPatient: (patient: any) => void
  currentAssessmentId: string | null
  setCurrentAssessmentId: (id: string | null) => void
  professionals: typeof MOCK_PROFESSIONALS
  addProfessional: (professional: any) => void
  updateProfessional: (id: string, professional: any) => void
  deleteProfessional: (id: string) => void
  formulas: typeof MOCK_FORMULAS
  addFormula: (formula: any) => void
  updateFormula: (id: string, formula: any) => void
  deleteFormula: (id: string) => void
  currentAssessmentData: {
    qeegTheta: boolean
    qeegAlpha: boolean
    seizureRisk: boolean
    implants: boolean
    age: string
    medications: string
    sleepQuality: string
    comorbidities: string
  }
  setAssessmentData: (data: Partial<AppState['currentAssessmentData']>) => void
  documents: any[]
  addDocument: (doc: any) => void
  updateDocument: (id: string, data: any) => void
  patientEvidence: Record<string, any>
  setPatientEvidence: (patientId: string, evidence: any) => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [currentUser] = useState({
    id: 'NS-P001',
    fullName: 'Dr. Renato Alves',
    role: 'Médico',
    registrationId: 'CRM 12345-SP',
  })
  const [patients, setPatients] = useState(MOCK_PATIENTS)
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null)
  const [professionals, setProfessionals] = useState(MOCK_PROFESSIONALS)
  const [formulas, setFormulas] = useState(MOCK_FORMULAS)
  const [documents, setDocuments] = useState<any[]>([])
  const [patientEvidence, setPatientEvidence] = useState<Record<string, any>>({})

  const [currentAssessmentData, setCurrentAssessmentData] = useState({
    qeegTheta: false,
    qeegAlpha: false,
    seizureRisk: false,
    implants: false,
    age: '',
    medications: '',
    sleepQuality: 'regular',
    comorbidities: '',
  })

  const setAssessmentData = (data: Partial<typeof currentAssessmentData>) =>
    setCurrentAssessmentData((prev) => ({ ...prev, ...data }))

  const addPatient = (patient: any) =>
    setPatients((prev) => [
      {
        id: Date.now().toString(),
        ...patient,
        auditLogs: [
          {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            action: 'Registro Inicial (EHR)',
            user: currentUser.fullName,
          },
        ],
      },
      ...prev,
    ])

  const addProfessional = (professional: any) =>
    setProfessionals((prev) => [{ ...professional, id: `NS-P${Date.now()}` }, ...prev])
  const updateProfessional = (id: string, professional: any) =>
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, ...professional } : p)))
  const deleteProfessional = (id: string) =>
    setProfessionals((prev) => prev.filter((p) => p.id !== id))

  const addFormula = (formula: any) =>
    setFormulas((prev) => [
      { ...formula, id: `NS-F${Date.now()}`, createdAt: new Date().toISOString() },
      ...prev,
    ])
  const updateFormula = (id: string, formula: any) =>
    setFormulas((prev) => prev.map((f) => (f.id === id ? { ...f, ...formula } : f)))
  const deleteFormula = (id: string) => setFormulas((prev) => prev.filter((f) => f.id !== id))

  const addDocument = (doc: any) => setDocuments((prev) => [doc, ...prev])
  const updateDocument = (id: string, data: any) =>
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...data } : d)))
  const updatePatientEvidence = (patientId: string, evidence: any) =>
    setPatientEvidence((prev) => ({ ...prev, [patientId]: evidence }))

  return (
    <AppStateContext.Provider
      value={{
        currentUser,
        patients,
        addPatient,
        currentAssessmentId,
        setCurrentAssessmentId,
        professionals,
        addProfessional,
        updateProfessional,
        deleteProfessional,
        formulas,
        addFormula,
        updateFormula,
        deleteFormula,
        currentAssessmentData,
        setAssessmentData,
        documents,
        addDocument,
        updateDocument,
        patientEvidence,
        setPatientEvidence: updatePatientEvidence,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export default function useAppStore() {
  const context = useContext(AppStateContext)
  if (!context) throw new Error('useAppStore must be used within AppStoreProvider')
  return context
}
