import { createContext, useContext, useState, ReactNode } from 'react'

export interface TrustLayerLog {
  id: string
  entity_type: string
  entity_id: string
  action: string
  actor_id: string
  timestamp: string
  previous_version: any | null
  new_version: any
}

export interface VitalscoreSnapshot {
  id: string
  patient_id: string
  case_workspace_id: string
  total_score: number
  reserve_level: string
  trend: string
  model_version: string
}

export type CaseStatus =
  | 'Triagem'
  | 'Coleta'
  | 'Análise Multidisciplinar'
  | 'Convergência'
  | 'Revisão Médica'
  | 'Laudo Validado'

export interface CaseWorkspace {
  id: string
  patient_id: string
  status: CaseStatus
  created_at: string
  title: string
}

export interface TeamMember {
  id: string
  name: string
  role: 'Medical Leader' | 'Clinical Coordinator' | 'Specialist' | 'Auditor'
  specialty?: string
}

export interface SpecialtyReport {
  id: string
  case_id: string
  specialty: string
  author_id: string
  structured_data: {
    checklists: Record<string, boolean>
    scales: Record<string, number>
    evidence_links: string[]
  }
  status: 'Draft' | 'Submitted'
  updated_at: string
}

interface TeamFlowState {
  organization: { id: string; name: string; crm: string }
  teamMembers: TeamMember[]
  caseWorkspaces: CaseWorkspace[]
  specialtyReports: SpecialtyReport[]
  auditLogs: TrustLayerLog[]
  vitalSnapshots: VitalscoreSnapshot[]
  updateOrganization: (org: { name: string; crm: string }) => void
  logAction: (
    entityType: string,
    entityId: string,
    action: string,
    prev: any,
    next: any,
    actor: string,
  ) => void
  updateCaseStatus: (caseId: string, newStatus: CaseStatus, actor: string) => void
  saveSpecialtyReport: (report: SpecialtyReport, actor: string) => void
}

const TeamFlowContext = createContext<TeamFlowState | undefined>(undefined)

const MOCK_TEAM: TeamMember[] = [
  { id: 'TM1', name: 'Dr. Renato Alves', role: 'Medical Leader', specialty: 'Neurologia' },
  { id: 'TM2', name: 'Dra. Camila Rocha', role: 'Specialist', specialty: 'Neuropsicologia' },
  { id: 'TM3', name: 'Dr. João Silva', role: 'Specialist', specialty: 'Nutrição' },
]

export function TeamFlowProvider({ children }: { children: ReactNode }) {
  const [organization, setOrganization] = useState({
    id: 'ORG1',
    name: 'NeuroStrata Clinic',
    crm: 'CRM 12345-SP',
  })
  const [teamMembers] = useState<TeamMember[]>(MOCK_TEAM)
  const [caseWorkspaces, setCaseWorkspaces] = useState<CaseWorkspace[]>([
    {
      id: 'CW1',
      patient_id: 'P001',
      status: 'Análise Multidisciplinar',
      created_at: new Date().toISOString(),
      title: 'Investigação de Déficit Atencional Secundário',
    },
  ])
  const [specialtyReports, setSpecialtyReports] = useState<SpecialtyReport[]>([
    {
      id: 'SR1',
      case_id: 'CW1',
      specialty: 'Neuropsicologia',
      author_id: 'TM2',
      status: 'Submitted',
      updated_at: new Date().toISOString(),
      structured_data: {
        checklists: { 'Déficit de Memória Operacional': true, 'Impulsividade Motora': false },
        scales: { 'Nível de Prejuízo Funcional': 7 },
        evidence_links: ['WAIS-IV_Report.pdf', 'DASS-21_Raw.json'],
      },
    },
  ])
  const [auditLogs, setAuditLogs] = useState<TrustLayerLog[]>([
    {
      id: 'LOG1',
      entity_type: 'case_workspace',
      entity_id: 'CW1',
      action: 'STATUS_CHANGE',
      actor_id: 'TM1',
      timestamp: new Date().toISOString(),
      previous_version: { status: 'Coleta' },
      new_version: { status: 'Análise Multidisciplinar' },
    },
  ])
  const [vitalSnapshots] = useState<VitalscoreSnapshot[]>([
    {
      id: 'VS1',
      patient_id: 'P001',
      case_workspace_id: 'CW1',
      total_score: 62,
      reserve_level: 'Moderada',
      trend: 'Estável',
      model_version: 'v2.1',
    },
  ])

  const updateOrganization = (org: { name: string; crm: string }) => {
    setOrganization((prev) => ({ ...prev, ...org }))
  }

  const logAction = (
    entityType: string,
    entityId: string,
    action: string,
    prev: any,
    next: any,
    actor: string,
  ) => {
    const log: TrustLayerLog = {
      id: `LOG-${Date.now()}`,
      entity_type: entityType,
      entity_id: entityId,
      action,
      actor_id: actor,
      timestamp: new Date().toISOString(),
      previous_version: prev,
      new_version: next,
    }
    setAuditLogs((current) => [log, ...current])
  }

  const updateCaseStatus = (caseId: string, newStatus: CaseStatus, actor: string) => {
    setCaseWorkspaces((prev) =>
      prev.map((cw) => {
        if (cw.id === caseId) {
          logAction(
            'case_workspace',
            caseId,
            'UPDATE_STATUS',
            { status: cw.status },
            { status: newStatus },
            actor,
          )
          return { ...cw, status: newStatus }
        }
        return cw
      }),
    )
  }

  const saveSpecialtyReport = (report: SpecialtyReport, actor: string) => {
    setSpecialtyReports((prev) => {
      const existing = prev.find((r) => r.id === report.id)
      logAction(
        'specialty_report',
        report.id,
        existing ? 'UPDATE' : 'CREATE',
        existing || null,
        report,
        actor,
      )
      if (existing) return prev.map((r) => (r.id === report.id ? report : r))
      return [...prev, report]
    })
  }

  return (
    <TeamFlowContext.Provider
      value={{
        organization,
        teamMembers,
        caseWorkspaces,
        specialtyReports,
        auditLogs,
        vitalSnapshots,
        updateOrganization,
        logAction,
        updateCaseStatus,
        saveSpecialtyReport,
      }}
    >
      {children}
    </TeamFlowContext.Provider>
  )
}

export function useTeamFlowStore() {
  const context = useContext(TeamFlowContext)
  if (!context) throw new Error('useTeamFlowStore must be used within Provider')
  return context
}
