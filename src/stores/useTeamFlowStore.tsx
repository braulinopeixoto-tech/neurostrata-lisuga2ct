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
  alert_level?: 'Green' | 'Yellow' | 'Orange' | 'Red'
  nfli?: number
  dvi?: number
  fii?: number
  sri?: number
  domain_scores?: Record<string, number>
  raw_data?: Record<string, { freq: number; agr: number }>
  recommendations?: string[]
}

export type CaseStatus =
  | 'Triagem'
  | 'Coleta'
  | 'Análise Multidisciplinar'
  | 'Convergência'
  | 'Revisão Médica'
  | 'Laudo Validado'

export interface NeuroModelBlocks {
  b1_identification?: any
  b2_reason?: string
  b3_history?: string
  b4_behavior?: string
  b5_cognitive?: any
  b6_rdoc?: any
  b7_bigfive?: any
  b8_psychic?: any
  b9_neurophysio?: string
  b10_integration?: string
  b11_hypotheses?: string
  b12_intervention?: string
  b13_index?: any
  b14_graphics?: any
  b15_conclusion?: string
  b16_references?: string[]
  b17_signature?: any
}

export interface CaseWorkspace {
  id: string
  patient_id: string
  status: CaseStatus
  created_at: string
  title: string
  risk_score: number
  consistency_score: number
  blocks: NeuroModelBlocks
}

export interface TeamMember {
  id: string
  name: string
  role: 'Medical Leader' | 'Clinical Coordinator' | 'Specialist' | 'Auditor'
  specialty?: string
}

interface TeamFlowState {
  organization: { id: string; name: string; crm: string }
  teamMembers: TeamMember[]
  caseWorkspaces: CaseWorkspace[]
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
  createCaseWorkspace: (
    caseData: Omit<CaseWorkspace, 'id' | 'created_at' | 'blocks'>,
    actor: string,
  ) => void
  updateCaseBlock: (
    caseId: string,
    blockKey: keyof NeuroModelBlocks,
    data: any,
    actor: string,
  ) => void
  addVitalSnapshot: (snapshot: VitalscoreSnapshot, actor: string) => void
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
      status: 'Convergência',
      created_at: new Date().toISOString(),
      title: 'Investigação de Déficit Atencional Secundário',
      risk_score: 65,
      consistency_score: 88,
      blocks: {
        b2_reason: 'Dificuldade de foco sustentado e regulação emocional.',
        b3_history: 'Histórico familiar de TDAH. Nenhuma complicação neonatal.',
        b6_rdoc: { 'Sistemas Cognitivos': 'Déficit severo na memória de trabalho.' },
        b15_conclusion:
          'Convergência preliminar aponta para TDAH combinado com desregulação límbica.',
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
      new_version: { status: 'Convergência' },
    },
  ])

  const [vitalSnapshots, setVitalSnapshots] = useState<VitalscoreSnapshot[]>([
    {
      id: 'VS1',
      patient_id: 'P001',
      case_workspace_id: 'CW1',
      total_score: 62,
      reserve_level: 'Moderada',
      trend: 'Estável',
      model_version: 'v2.1',
      alert_level: 'Yellow',
      nfli: 1.45,
      dvi: 0.8,
      fii: 1.2,
      sri: 0.5,
      domain_scores: { A: 1.2, B: 0.8, C: 1.8, D: 0.5, E: 1.1, F: 0.9 },
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

  const createCaseWorkspace = (
    caseData: Omit<CaseWorkspace, 'id' | 'created_at' | 'blocks'>,
    actor: string,
  ) => {
    const newCase: CaseWorkspace = {
      ...caseData,
      id: `CW-${Date.now()}`,
      created_at: new Date().toISOString(),
      blocks: {},
    }
    setCaseWorkspaces((prev) => [newCase, ...prev])
    logAction('case_workspace', newCase.id, 'CREATE', null, newCase, actor)
  }

  const updateCaseBlock = (
    caseId: string,
    blockKey: keyof NeuroModelBlocks,
    data: any,
    actor: string,
  ) => {
    setCaseWorkspaces((prev) =>
      prev.map((cw) => {
        if (cw.id === caseId) {
          const updatedBlocks = { ...cw.blocks, [blockKey]: data }
          logAction(
            'case_workspace_block',
            `${caseId}-${blockKey}`,
            'UPDATE_BLOCK',
            cw.blocks[blockKey],
            data,
            actor,
          )
          return { ...cw, blocks: updatedBlocks }
        }
        return cw
      }),
    )
  }

  const addVitalSnapshot = (snapshot: VitalscoreSnapshot, actor: string) => {
    setVitalSnapshots((prev) => [snapshot, ...prev])
    logAction(
      'vital_snapshot',
      snapshot.id,
      'CREATE_SNAPSHOT',
      null,
      { score: snapshot.total_score, alert: snapshot.alert_level },
      actor,
    )
  }

  return (
    <TeamFlowContext.Provider
      value={{
        organization,
        teamMembers,
        caseWorkspaces,
        auditLogs,
        vitalSnapshots,
        updateOrganization,
        logAction,
        updateCaseStatus,
        createCaseWorkspace,
        updateCaseBlock,
        addVitalSnapshot,
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
