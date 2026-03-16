import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MOCK_PATIENTS, MOCK_PROFESSIONALS, MOCK_FORMULAS } from '@/lib/mock-data'

export type CheckupStageId = 'psychic_functions' | 'rdoc' | 'big_five'
export type CheckupStageStatus = 'locked' | 'available' | 'pending_validation' | 'validated'

export interface CheckupJourneyState {
  stages: Record<CheckupStageId, CheckupStageStatus>
  validatedBy: Record<CheckupStageId, string | null>
  data?: Record<string, any>
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
  ) => void
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
    })) as Patient[],
  )
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null)
  const [professionals, setProfessionals] = useState<Professional[]>(
    MOCK_PROFESSIONALS as Professional[],
  )
  const [formulas, setFormulas] = useState<Formula[]>(MOCK_FORMULAS as Formula[])

  const [documents, setDocuments] = useState<any[]>([
    {
      id: 'doc-mock-1',
      patientId: 'P001',
      name: 'Ressonância Magnética Funcional.pdf',
      category: 'Exames',
      date: new Date(Date.now() - 5 * 86400000).toISOString(),
      status: 'completed',
      validationStatus: 'Validado',
    },
    {
      id: 'doc-mock-2',
      patientId: 'P001',
      name: 'Relatório Neuropsicológico Prévio.pdf',
      category: 'Relatórios',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      status: 'completed',
      validationStatus: 'Pendente',
    },
  ])

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

  const [patientFeedbacks, setPatientFeedbacks] = useState<Record<string, any[]>>({
    P001: [
      {
        id: 'f1',
        date: new Date(Date.now() - 86400000).toISOString(),
        mood: 3,
        focus: 4,
        sleep: 2,
        anxiety: 4,
        notes: 'Dormi mal, mas consegui focar no trabalho.',
      },
    ],
  })

  const [patientBiogram, setPatientBiogram] = useState<Record<string, any[]>>({
    P001: [
      { id: 'b1', date: '10 Jan', bemEstar: 60, foco: 55, energia: 45 },
      { id: 'b2', date: '15 Fev', bemEstar: 65, foco: 60, energia: 50 },
      { id: 'b3', date: '20 Mar', bemEstar: 70, foco: 65, energia: 60 },
      { id: 'b4', date: '05 Abr', bemEstar: 80, foco: 75, energia: 65 },
    ],
  })

  const [patientDASS21, setPatientDASS21] = useState<Record<string, any[]>>({})
  const [patientPHQ9, setPatientPHQ9] = useState<Record<string, any[]>>({})
  const [patientGAD7, setPatientGAD7] = useState<Record<string, any[]>>({})
  const [patientWHO5, setPatientWHO5] = useState<Record<string, any[]>>({})

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

  const defaultJourney: CheckupJourneyState = {
    stages: {
      psychic_functions: 'available',
      rdoc: 'locked',
      big_five: 'locked',
    },
    validatedBy: { psychic_functions: null, rdoc: null, big_five: null },
    data: {},
  }

  const [patientJourneys, setPatientJourneys] = useState<Record<string, CheckupJourneyState>>({
    P001: {
      stages: { psychic_functions: 'pending_validation', rdoc: 'locked', big_five: 'locked' },
      validatedBy: { psychic_functions: null, rdoc: null, big_five: null },
      data: {
        psychic_functions: {
          'Atenção Sustentada': 'Regular',
          'Atenção Alternada': 'Disfuncional',
          'Labilidade Afetiva': 'Disfuncional grave',
        },
      },
    },
  })

  const submitJourneyStage = (patientId: string, stageId: CheckupStageId, data: any) => {
    setPatientJourneys((prev) => {
      const journey = prev[patientId] || defaultJourney
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
  ) => {
    const stageData = patientJourneys[patientId]?.data?.[stageId]

    setPatientJourneys((prev) => {
      const journey = prev[patientId] || defaultJourney
      const newStages = { ...journey.stages, [stageId]: 'validated' as CheckupStageStatus }
      const newVal = { ...journey.validatedBy, [stageId]: professionalName }

      const order: CheckupStageId[] = ['psychic_functions', 'rdoc', 'big_five']
      const currentIndex = order.indexOf(stageId)
      if (currentIndex !== -1 && currentIndex < order.length - 1) {
        const nextStage = order[currentIndex + 1]
        if (newStages[nextStage] === 'locked') {
          newStages[nextStage] = 'available'
        }
      }

      return { ...prev, [patientId]: { ...journey, stages: newStages, validatedBy: newVal } }
    })

    if (stageData && stageId === 'psychic_functions') {
      const getVal = (v: string) => {
        if (v === 'Plenamente preservado') return 100
        if (v === 'Preservado') return 80
        if (v === 'Regular') return 60
        if (v === 'Disfuncional') return 40
        if (v === 'Disfuncional grave') return 20
        return 50
      }
      let bemEstarAcc = 0,
        focoAcc = 0,
        energiaAcc = 0
      let bemEstarCount = 0,
        focoCount = 0,
        energiaCount = 0
      Object.entries(stageData).forEach(([key, val]) => {
        const v = getVal(val as string)
        if (
          [
            'Reatividade ao Estresse',
            'Labilidade Afetiva',
            'Controle de Impulsos',
            'Tolerância à Frustração',
          ].includes(key)
        ) {
          bemEstarAcc += v
          bemEstarCount++
        } else if (
          [
            'Atenção Sustentada',
            'Atenção Alternada',
            'Atenção Dividida',
            'Memória de Trabalho',
          ].includes(key)
        ) {
          focoAcc += v
          focoCount++
        } else {
          energiaAcc += v
          energiaCount++
        }
      })
      const newPoint = {
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        bemEstar: bemEstarCount ? Math.round(bemEstarAcc / bemEstarCount) : 60,
        foco: focoCount ? Math.round(focoAcc / focoCount) : 60,
        energia: energiaCount ? Math.round(energiaAcc / energiaCount) : 60,
      }
      addPatientBiogramData(patientId, newPoint)
    }

    addPatientAuditLog(patientId, {
      date: new Date().toISOString(),
      action: `Validação Profissional do Check-up: ${stageId}`,
      user: professionalName,
      details: 'A etapa foi clinicamente avaliada e integrada ao Biograma.',
    })
  }

  const setAssessmentData = (data: Partial<typeof currentAssessmentData>) =>
    setCurrentAssessmentData((prev) => ({ ...prev, ...data }))

  const appendQuickReportDraft = (text: string) =>
    setQuickReportDraft((prev) => (prev ? prev + text : text))

  const addPatient = (patient: any) =>
    setPatients((prev) => [
      {
        id: Date.now().toString(),
        ...patient,
        hasPortalAccess: true,
        portalVisibility: 'Detailed',
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

  const addPatientFeedback = (patientId: string, feedback: any) => {
    setPatientFeedbacks((prev) => ({
      ...prev,
      [patientId]: [
        { ...feedback, id: `fb-${Date.now()}`, date: new Date().toISOString() },
        ...(prev[patientId] || []),
      ],
    }))
  }

  const addPatientDASS21 = (patientId: string, assessment: any) => {
    setPatientDASS21((prev) => ({
      ...prev,
      [patientId]: [
        { ...assessment, id: `dass-${Date.now()}`, date: new Date().toISOString() },
        ...(prev[patientId] || []),
      ],
    }))
  }

  const addPatientPHQ9 = (patientId: string, assessment: any) => {
    setPatientPHQ9((prev) => ({
      ...prev,
      [patientId]: [
        { ...assessment, id: `phq9-${Date.now()}`, date: new Date().toISOString() },
        ...(prev[patientId] || []),
      ],
    }))
  }

  const addPatientGAD7 = (patientId: string, assessment: any) => {
    setPatientGAD7((prev) => ({
      ...prev,
      [patientId]: [
        { ...assessment, id: `gad7-${Date.now()}`, date: new Date().toISOString() },
        ...(prev[patientId] || []),
      ],
    }))
  }

  const addPatientWHO5 = (patientId: string, assessment: any) => {
    setPatientWHO5((prev) => ({
      ...prev,
      [patientId]: [
        { ...assessment, id: `who5-${Date.now()}`, date: new Date().toISOString() },
        ...(prev[patientId] || []),
      ],
    }))
  }

  const updatePatientPortalAccess = (
    patientId: string,
    access: boolean,
    visibility: 'Simplified' | 'Detailed',
  ) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId ? { ...p, hasPortalAccess: access, portalVisibility: visibility } : p,
      ),
    )
  }

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
