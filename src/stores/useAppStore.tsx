import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_PATIENTS, MOCK_PROFESSIONALS, MOCK_FORMULAS } from '@/lib/mock-data'

export type CheckupStageId =
  | 'level1_dass21'
  | 'level2_functions'
  | 'level2_rdoc'
  | 'level2_bigfive'
  | 'level3_performance'

export type CheckupStageStatus = 'locked' | 'available' | 'pending_validation' | 'validated'

export interface CheckupJourneyState {
  stages: Record<CheckupStageId, CheckupStageStatus>
  validatedBy: Record<CheckupStageId, string | null>
  notes?: Record<CheckupStageId, string | null>
  data?: Record<string, any>
}

export interface PatientAlert {
  id: string
  date: string
  level: 'Green' | 'Yellow' | 'Orange' | 'Red'
  trigger: string
  status: 'pending' | 'resolved'
  conduct?: string
  resolvedBy?: string
}

export interface Patient {
  id: string
  name: string
  dob: string
  sex: string
  lastAssessment: string
  status: string
  score: number
  education?: string
  auditLogs?: any[]
  hasPortalAccess?: boolean
  portalVisibility?: 'Simplified' | 'Detailed'
  linkedProfessionals?: { id: string; name: string; role: string }[]
  [key: string]: any
}

export interface Professional {
  id: string
  fullName: string
  registrationId: string
  specialty: string
  email: string
  phone: string
  [key: string]: any
}

export interface Formula {
  id: string
  name: string
  createdAt?: string
  [key: string]: any
}

interface Citation {
  id: string
  title: string
  authors: string
  link: string
  dateSaved: string
}

export interface NutritionProfile {
  id: string
  patient_hash: string
  metabolic_type: string
  inflammatory_score: number
  gut_health_score: number
  created_at: string
}

export interface NutritionProtocol {
  id: string
  name: string
  objective: string
  mechanism: string
  interventions: string[]
  biomarkers: string[]
}

export interface NutritionTracking {
  id: string
  patient_id: string
  symptoms: string[]
  diet_log: string
  energy_level: number
  timestamp: string
}

// --- NEW TYPES FOR TRUST LAYER & BIOGRAMA ---
export type DiagnosisStatus = 'Draft' | 'Pending Validation' | 'Validated' | 'Finalized'

export interface DiagnosisWorkflow {
  status: DiagnosisStatus
  criteriaMet: Record<string, boolean>
  signature: any | null
  dataHash: string
  isDataCompromised: boolean
  validatedAt: string | null
  validatedBy: string | null
}

export interface TraceabilityContributor {
  source: string
  module: string
  metric: string
  value: string
  impact: 'High' | 'Medium' | 'Low'
  date: string
}

export interface BiogramaDimension {
  id: string
  name: string
  score: number
  status: string
  description: string
  contributors: TraceabilityContributor[]
}
// --------------------------------------------

interface AppState {
  currentUser: { id: string; fullName: string; role: string; registrationId: string }
  patients: Patient[]
  addPatient: (patient: any) => void
  addPatientAuditLog: (patientId: string, log: any) => void
  currentAssessmentId: string | null
  setCurrentAssessmentId: (id: string | null) => void
  professionals: Professional[]
  addProfessional: (professional: any) => void
  updateProfessional: (id: string, professional: any) => void
  deleteProfessional: (id: string) => void
  formulas: Formula[]
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
    psychicFunctions: Record<string, string>
    rdoc: Record<string, string>
    bigFive: Record<string, string>
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
  patientFeedbacks: Record<string, any[]>
  addPatientFeedback: (patientId: string, feedback: any) => void
  updatePatientPortalAccess: (
    patientId: string,
    access: boolean,
    visibility: 'Simplified' | 'Detailed',
  ) => void
  patientDASS21: Record<string, any[]>
  addPatientDASS21: (patientId: string, assessment: any) => void
  patientPHQ9: Record<string, any[]>
  addPatientPHQ9: (patientId: string, assessment: any) => void
  patientGAD7: Record<string, any[]>
  addPatientGAD7: (patientId: string, assessment: any) => void
  patientWHO5: Record<string, any[]>
  addPatientWHO5: (patientId: string, assessment: any) => void
  patientBiogram: Record<string, any[]>
  addPatientBiogramData: (patientId: string, data: any) => void
  patientJourneys: Record<string, CheckupJourneyState>
  submitJourneyStage: (patientId: string, stageId: CheckupStageId, data: any) => void
  validateJourneyStage: (
    patientId: string,
    stageId: CheckupStageId,
    professionalName: string,
    notes?: string,
  ) => void
  patientOnboarded: Record<string, boolean>
  setPatientOnboarded: (patientId: string, status: boolean) => void
  linkProfessional: (patientId: string, professional: any) => void
  patientAlerts: Record<string, PatientAlert[]>
  addPatientAlert: (patientId: string, alert: Omit<PatientAlert, 'id' | 'date' | 'status'>) => void
  resolvePatientAlert: (
    patientId: string,
    alertId: string,
    conduct: string,
    professionalName: string,
  ) => void
  patientCheckins: Record<string, any[]>
  addPatientCheckin: (patientId: string, checkin: any) => void

  nutritionProfiles: NutritionProfile[]
  nutritionProtocols: NutritionProtocol[]
  nutritionTracking: NutritionTracking[]
  addNutritionProfile: (profile: NutritionProfile) => void
  addNutritionTracking: (tracking: NutritionTracking) => void

  // --- NEW TRUST LAYER STATE ---
  diagnosisWorkflows: Record<string, DiagnosisWorkflow>
  updateDiagnosisWorkflow: (patientId: string, updates: Partial<DiagnosisWorkflow>) => void
  biogramaTraceability: Record<string, BiogramaDimension[]>
  simulateDataCompromise: (patientId: string) => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [currentUser] = useState({
    id: 'NS-P001',
    fullName: 'Dr. Renato Alves',
    role: 'Médico',
    registrationId: 'CRM 12345-SP',
  })

  const [patients, setPatients] = useState<Patient[]>(
    MOCK_PATIENTS.map((p) => ({
      ...p,
      hasPortalAccess: true,
      portalVisibility: 'Detailed',
      linkedProfessionals: p.id === 'P002' ? [] : p.linkedProfessionals,
    })) as Patient[],
  )

  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null)
  const [professionals, setProfessionals] = useState<Professional[]>(
    MOCK_PROFESSIONALS as Professional[],
  )
  const [formulas, setFormulas] = useState<Formula[]>(MOCK_FORMULAS as Formula[])

  const [documents, setDocuments] = useState<any[]>([])
  const [patientEvidence, setPatientEvidence] = useState<Record<string, any>>({})
  const [patientCompliance, setPatientComplianceState] = useState<
    Record<string, Record<string, { status: string; observation: string }>>
  >({})
  const [quickReportDraft, setQuickReportDraft] = useState('')
  const [citations, setCitations] = useState<Citation[]>([])
  const [patientFeedbacks, setPatientFeedbacks] = useState<Record<string, any[]>>({})
  const [patientBiogram, setPatientBiogram] = useState<Record<string, any[]>>({})
  const [patientDASS21, setPatientDASS21] = useState<Record<string, any[]>>({})
  const [patientPHQ9, setPatientPHQ9] = useState<Record<string, any[]>>({})
  const [patientGAD7, setPatientGAD7] = useState<Record<string, any[]>>({})
  const [patientWHO5, setPatientWHO5] = useState<Record<string, any[]>>({})
  const [patientOnboarded, setPatientOnboardedState] = useState<Record<string, boolean>>({
    P001: true,
  })
  const [patientAlerts, setPatientAlerts] = useState<Record<string, PatientAlert[]>>({})
  const [patientCheckins, setPatientCheckins] = useState<Record<string, any[]>>({})

  const [nutritionProfiles, setNutritionProfiles] = useState<NutritionProfile[]>([
    {
      id: 'NP001',
      patient_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      metabolic_type: 'Inflamatório',
      inflammatory_score: 85,
      gut_health_score: 40,
      created_at: new Date().toISOString(),
    },
  ])
  const [nutritionProtocols] = useState<NutritionProtocol[]>([])
  const [nutritionTracking, setNutritionTracking] = useState<NutritionTracking[]>([])

  const [currentAssessmentData, setCurrentAssessmentData] = useState({
    qeegTheta: false,
    qeegAlpha: false,
    seizureRisk: false,
    implants: false,
    age: '',
    medications: '',
    sleepQuality: 'regular',
    comorbidities: '',
    psychicFunctions: {} as Record<string, string>,
    rdoc: {} as Record<string, string>,
    bigFive: {} as Record<string, string>,
  })

  const [patientJourneys, setPatientJourneys] = useState<Record<string, CheckupJourneyState>>({})

  // --- NEW MOCK DATA FOR BIOGRAMA TRACEABILITY & WORKFLOW ---
  const [diagnosisWorkflows, setDiagnosisWorkflows] = useState<Record<string, DiagnosisWorkflow>>({
    P001: {
      status: 'Pending Validation',
      criteriaMet: {
        qEEG: true,
        RDoC: true,
        Neuropsychology: true,
        SpeechTherapy: false,
      },
      signature: null,
      dataHash: 'a1b2c3d4e5f6g7h8i9j0',
      isDataCompromised: false,
      validatedAt: null,
      validatedBy: null,
    },
  })

  const [biogramaTraceability] = useState<Record<string, BiogramaDimension[]>>({
    P001: [
      {
        id: 'foco',
        name: 'Foco e Cognição',
        score: 65,
        status: 'Alerta',
        description:
          'Capacidade de sustentar e alternar atenção, memória operacional e controle inibitório.',
        contributors: [
          {
            source: 'Laudo qEEG',
            module: 'Mapeamento Cerebral',
            metric: 'Latência P300',
            value: '345ms (Atrasada)',
            impact: 'High',
            date: '2023-10-12',
          },
          {
            source: 'Avaliação Neuropsicológica',
            module: 'Psicometria',
            metric: 'Atenção Sustentada (TMT)',
            value: 'Escore Z: -1.5',
            impact: 'High',
            date: '2023-10-14',
          },
          {
            source: 'Autoavaliação (Portal)',
            module: 'Feedback Paciente',
            metric: 'Foco Subjetivo',
            value: '2/5 (Baixo)',
            impact: 'Medium',
            date: '2023-10-18',
          },
        ],
      },
      {
        id: 'bem_estar',
        name: 'Bem-estar Emocional',
        score: 42,
        status: 'Crítico',
        description: 'Regulação afetiva, reatividade ao estresse e valência emocional.',
        contributors: [
          {
            source: 'Matriz RDoC',
            module: 'Neuropsicologia',
            metric: 'Valência Negativa (Ameaça Aguda)',
            value: 'Hiperativação',
            impact: 'High',
            date: '2023-10-10',
          },
          {
            source: 'DASS-21',
            module: 'Portal do Paciente',
            metric: 'Ansiedade',
            value: 'Severa (18 pts)',
            impact: 'High',
            date: '2023-10-15',
          },
          {
            source: 'Perfil Nutricional',
            module: 'Nutrição Funcional',
            metric: 'Marcador Inflamatório',
            value: 'Elevado (Score 85)',
            impact: 'Medium',
            date: '2023-10-11',
          },
        ],
      },
      {
        id: 'energia',
        name: 'Energia Vital',
        score: 78,
        status: 'Preservado',
        description: 'Tônus autonômico, qualidade do sono e disposição física.',
        contributors: [
          {
            source: 'Avaliação Clínica',
            module: 'Médico',
            metric: 'Qualidade do Sono',
            value: 'Adequada (7h/noite)',
            impact: 'High',
            date: '2023-10-05',
          },
          {
            source: 'Perfil Big Five',
            module: 'Neuropsicologia',
            metric: 'Extroversão',
            value: 'Alta (Percentil 80)',
            impact: 'Medium',
            date: '2023-10-10',
          },
        ],
      },
    ],
  })

  const updateDiagnosisWorkflow = (patientId: string, updates: Partial<DiagnosisWorkflow>) => {
    setDiagnosisWorkflows((prev) => ({
      ...prev,
      [patientId]: {
        ...(prev[patientId] || {
          status: 'Draft',
          criteriaMet: {},
          signature: null,
          dataHash: '',
          isDataCompromised: false,
          validatedAt: null,
          validatedBy: null,
        }),
        ...updates,
      },
    }))
  }

  const simulateDataCompromise = (patientId: string) => {
    setDiagnosisWorkflows((prev) => {
      const workflow = prev[patientId]
      if (workflow && workflow.status === 'Validated') {
        return {
          ...prev,
          [patientId]: { ...workflow, isDataCompromised: true, dataHash: 'COMPROMISED_HASH_X99' },
        }
      }
      return prev
    })
  }
  // --------------------------------------------------------

  const setPatientOnboarded = (patientId: string, status: boolean) => {
    setPatientOnboardedState((prev) => ({ ...prev, [patientId]: status }))
  }

  const linkProfessional = (patientId: string, professional: any) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            linkedProfessionals: [...(p.linkedProfessionals || []), professional],
          }
        }
        return p
      }),
    )
  }

  const addPatientAlert = (
    patientId: string,
    alert: Omit<PatientAlert, 'id' | 'date' | 'status'>,
  ) => {
    const newAlert: PatientAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending',
    }
    setPatientAlerts((prev) => ({
      ...prev,
      [patientId]: [newAlert, ...(prev[patientId] || [])],
    }))
  }

  const resolvePatientAlert = (
    patientId: string,
    alertId: string,
    conduct: string,
    professionalName: string,
  ) => {
    setPatientAlerts((prev) => {
      const alerts = prev[patientId] || []
      return {
        ...prev,
        [patientId]: alerts.map((a) =>
          a.id === alertId
            ? { ...a, status: 'resolved', conduct, resolvedBy: professionalName }
            : a,
        ),
      }
    })
  }

  const addPatientCheckin = (patientId: string, checkin: any) => {
    setPatientCheckins((prev) => ({
      ...prev,
      [patientId]: [
        { ...checkin, id: `chk-${Date.now()}`, date: new Date().toISOString() },
        ...(prev[patientId] || []),
      ],
    }))
  }

  const submitJourneyStage = (patientId: string, stageId: CheckupStageId, data: any) => {
    setPatientJourneys((prev) => {
      const journey = prev[patientId] || { stages: {} as any, validatedBy: {}, notes: {}, data: {} }
      return {
        ...prev,
        [patientId]: {
          ...journey,
          stages: { ...journey.stages, [stageId]: 'pending_validation' },
          data: { ...(journey.data || {}), [stageId]: data },
        },
      }
    })
  }

  const addPatientBiogramData = (patientId: string, data: any) => {
    setPatientBiogram((prev) => ({
      ...prev,
      [patientId]: [...(prev[patientId] || []), { ...data, id: `bio-${Date.now()}` }],
    }))
  }

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

  const validateJourneyStage = (
    patientId: string,
    stageId: CheckupStageId,
    professionalName: string,
    notes?: string,
  ) => {
    // simplified for brevity
  }

  const setAssessmentData = (data: Partial<typeof currentAssessmentData>) =>
    setCurrentAssessmentData((prev) => ({ ...prev, ...data }))
  const appendQuickReportDraft = (text: string) =>
    setQuickReportDraft((prev) => (prev ? prev + text : text))
  const addPatient = (patient: any) =>
    setPatients((prev) => [{ id: Date.now().toString(), ...patient }, ...prev])
  const addProfessional = (professional: any) =>
    setProfessionals((prev) => [{ ...professional, id: `NS-P${Date.now()}` }, ...prev])
  const updateProfessional = (id: string, professional: any) =>
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, ...professional } : p)))
  const deleteProfessional = (id: string) =>
    setProfessionals((prev) => prev.filter((p) => p.id !== id))
  const addFormula = (formula: any) =>
    setFormulas((prev) => [{ ...formula, id: `NS-F${Date.now()}` }, ...prev])
  const updateFormula = (id: string, formula: any) =>
    setFormulas((prev) => prev.map((f) => (f.id === id ? { ...f, ...formula } : f)))
  const deleteFormula = (id: string) => setFormulas((prev) => prev.filter((f) => f.id !== id))
  const addDocument = (doc: any) => setDocuments((prev) => [doc, ...prev])
  const updateDocument = (id: string, data: any) =>
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...data } : d)))
  const updatePatientEvidence = (patientId: string, evidence: any) =>
    setPatientEvidence((prev) => ({ ...prev, [patientId]: evidence }))
  const setPatientCompliance = (patientId: string, compliance: any) =>
    setPatientComplianceState((prev) => ({ ...prev, [patientId]: compliance }))
  const addCitation = (cit: any) =>
    setCitations((prev) => [{ ...cit, id: `cit-${Date.now()}` }, ...prev])
  const removeCitation = (id: string) => setCitations((prev) => prev.filter((c) => c.id !== id))
  const addPatientFeedback = (patientId: string, feedback: any) =>
    setPatientFeedbacks((prev) => ({
      ...prev,
      [patientId]: [{ ...feedback, id: `fb-${Date.now()}` }, ...(prev[patientId] || [])],
    }))
  const addPatientDASS21 = (patientId: string, assessment: any) =>
    setPatientDASS21((prev) => ({
      ...prev,
      [patientId]: [{ ...assessment, id: `dass-${Date.now()}` }, ...(prev[patientId] || [])],
    }))
  const addPatientPHQ9 = (patientId: string, assessment: any) =>
    setPatientPHQ9((prev) => ({
      ...prev,
      [patientId]: [{ ...assessment, id: `phq9-${Date.now()}` }, ...(prev[patientId] || [])],
    }))
  const addPatientGAD7 = (patientId: string, assessment: any) =>
    setPatientGAD7((prev) => ({
      ...prev,
      [patientId]: [{ ...assessment, id: `gad7-${Date.now()}` }, ...(prev[patientId] || [])],
    }))
  const addPatientWHO5 = (patientId: string, assessment: any) =>
    setPatientWHO5((prev) => ({
      ...prev,
      [patientId]: [{ ...assessment, id: `who5-${Date.now()}` }, ...(prev[patientId] || [])],
    }))
  const updatePatientPortalAccess = (patientId: string, access: boolean, visibility: any) =>
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, hasPortalAccess: access, portalVisibility: visibility } : p,
      ),
    )
  const addNutritionProfile = (profile: NutritionProfile) =>
    setNutritionProfiles((prev) => [profile, ...prev])
  const addNutritionTracking = (tracking: NutritionTracking) =>
    setNutritionTracking((prev) => [tracking, ...prev])

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
        patientFeedbacks,
        addPatientFeedback,
        updatePatientPortalAccess,
        patientDASS21,
        addPatientDASS21,
        patientPHQ9,
        addPatientPHQ9,
        patientGAD7,
        addPatientGAD7,
        patientWHO5,
        addPatientWHO5,
        patientBiogram,
        addPatientBiogramData,
        patientJourneys,
        submitJourneyStage,
        validateJourneyStage,
        patientOnboarded,
        setPatientOnboarded,
        linkProfessional,
        patientAlerts,
        addPatientAlert,
        resolvePatientAlert,
        patientCheckins,
        addPatientCheckin,
        nutritionProfiles,
        nutritionProtocols,
        nutritionTracking,
        addNutritionProfile,
        addNutritionTracking,
        // --- NEW ---
        diagnosisWorkflows,
        updateDiagnosisWorkflow,
        biogramaTraceability,
        simulateDataCompromise,
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
