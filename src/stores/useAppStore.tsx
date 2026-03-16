import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_PATIENTS, MOCK_PROFESSIONALS, MOCK_FORMULAS } from '@/lib/mock-data'

interface Citation {
  id: string
  title: string
  authors: string
  link: string
  dateSaved: string
}

interface AppState {
  currentUser: { id: string; fullName: string; role: string; registrationId: string }
  patients: typeof MOCK_PATIENTS
  addPatient: (patient: any) => void
  addPatientAuditLog: (patientId: string, log: any) => void
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
  patientCompliance: Record<string, Record<string, { status: string; observation: string }>>
  setPatientCompliance: (
    patientId: string,
    compliance: Record<string, { status: string; observation: string }>,
  ) => void
  quickReportDraft: string
  setQuickReportDraft: (text: string) => void
  appendQuickReportDraft: (text: string) => void
  citations: Citation[]
  addCitation: (cit: Omit<Citation, 'id' | 'dateSaved'>) => void
  removeCitation: (id: string) => void
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
  const [patientCompliance, setPatientComplianceState] = useState<
    Record<string, Record<string, { status: string; observation: string }>>
  >({})
  const [quickReportDraft, setQuickReportDraft] = useState('')
  const [citations, setCitations] = useState<Citation[]>([
    {
      id: 'cit-1',
      title: 'Large-scale brain networks in cognition and disease',
      authors: 'Bressler, S. L., & Menon, V.',
      link: 'https://doi.org/10.1016/j.tics.2010.04.004',
      dateSaved: new Date().toISOString(),
    },
  ])

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

  const appendQuickReportDraft = (text: string) =>
    setQuickReportDraft((prev) => (prev ? prev + text : text))

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

  const addPatientAuditLog = (patientId: string, log: any) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            auditLogs: [{ ...log, id: `log-${Date.now()}` }, ...(p.auditLogs || [])],
          }
        }
        return p
      }),
    )
  }

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

  const setPatientCompliance = (
    patientId: string,
    compliance: Record<string, { status: string; observation: string }>,
  ) => {
    setPatientComplianceState((prev) => ({ ...prev, [patientId]: compliance }))
  }

  const addCitation = (cit: Omit<Citation, 'id' | 'dateSaved'>) =>
    setCitations((prev) => [
      { ...cit, id: `cit-${Date.now()}`, dateSaved: new Date().toISOString() },
      ...prev,
    ])
  const removeCitation = (id: string) => setCitations((prev) => prev.filter((c) => c.id !== id))

  return (
    <AppStateContext.Provider
      value={{
        currentUser,
        patients,
        addPatient,
        addPatientAuditLog,
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
        patientCompliance,
        setPatientCompliance,
        quickReportDraft,
        setQuickReportDraft,
        appendQuickReportDraft,
        citations,
        addCitation,
        removeCitation,
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
