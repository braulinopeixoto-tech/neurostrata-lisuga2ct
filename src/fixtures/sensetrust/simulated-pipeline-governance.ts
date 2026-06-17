import type {
  SenseTrustDecisionAuditTrailItem,
  SenseTrustGoNoGoDecision,
  SenseTrustHumanReviewQueueItem,
  SenseTrustInstitutionalReadinessScore,
  SenseTrustNextMoveRecommendation,
  SenseTrustOpportunityPriorityScore,
  SenseTrustPipelineAudienceType,
  SenseTrustPipelineDecision,
  SenseTrustPipelineDecisionBoard,
  SenseTrustPipelineOpportunity,
  SenseTrustPipelineRiskScore,
  SenseTrustPipelineRiskSignal,
  SenseTrustPipelineStage,
  SenseTrustPipelineStageGate,
  SenseTrustPipelineStageType,
  SenseTrustRelationshipGovernanceBoard,
} from '@/types/sensetrust/pipeline-governance'

export const PIPELINE_GOVERNANCE_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'cid real', 'qeeg real', 'eeg real', 'laudo real']
export const PIPELINE_GOVERNANCE_REAL_CLAIM_DENYLIST = ['real revenue booked', 'billing real ativo', 'contrato real assinado', 'crm real ativo', 'analytics real ativo', 'email automation real', 'cliente real confirmado']

export const PIPELINE_AUDIENCES: SenseTrustPipelineAudienceType[] = ['clinics', 'public_sector', 'legal_partners', 'investors', 'institutions', 'press', 'regulators', 'internal_team']
export const PIPELINE_STAGE_TYPES: SenseTrustPipelineStageType[] = ['identified', 'demo_completed', 'feedback_recorded', 'qualified_simulated', 'human_review', 'strategic_review', 'legal_review_required', 'go']

export const SIMULATED_PRIORITY_SCORES: SenseTrustOpportunityPriorityScore[] = Array.from({ length: 12 }, (_, index) => ({
  score_id: `PG-PRIORITY-${index + 1}`,
  opportunity_id: `PG-OPP-${index + 1}`,
  score: 42 + index * 4,
  priority_level: index > 8 ? 'strategic' : index > 5 ? 'high' : index > 2 ? 'moderate' : 'low',
  rationale: 'Score simulado baseado em interesse, maturidade e risco.',
  simulated_only: true,
}))

export const SIMULATED_READINESS_SCORES: SenseTrustInstitutionalReadinessScore[] = Array.from({ length: 12 }, (_, index) => ({
  readiness_id: `PG-READY-${index + 1}`,
  opportunity_id: `PG-OPP-${index + 1}`,
  institutional_score: 60 + index,
  technical_score: 58 + index,
  legal_score: 50 + index,
  governance_score: 62 + index,
  recommendation: 'Prosseguir apenas com revisao humana e material autorizado.',
  simulated_only: true,
}))

export const SIMULATED_PIPELINE_RISK_SCORES: SenseTrustPipelineRiskScore[] = Array.from({ length: 12 }, (_, index) => ({
  risk_score_id: `PG-RISK-SCORE-${index + 1}`,
  opportunity_id: `PG-OPP-${index + 1}`,
  score: 25 + index * 5,
  risk_level: index > 9 ? 'critical' : index > 6 ? 'high' : index > 3 ? 'medium' : 'low',
  rationale: 'Risco simulado por interpretacao indevida, material ou revisao pendente.',
  simulated_only: true,
}))

export const SIMULATED_PIPELINE_OPPORTUNITIES: SenseTrustPipelineOpportunity[] = Array.from({ length: 12 }, (_, index) => {
  const audience = PIPELINE_AUDIENCES[index % PIPELINE_AUDIENCES.length]
  const riskScore = SIMULATED_PIPELINE_RISK_SCORES[index]
  const priority = SIMULATED_PRIORITY_SCORES[index]
  return {
    opportunity_id: `PG-OPP-${index + 1}`,
    opportunity_name: `Oportunidade simulada ${audience} ${index + 1}`,
    audience_type: audience,
    pipeline_stage: PIPELINE_STAGE_TYPES[index % PIPELINE_STAGE_TYPES.length],
    source_meeting_id: `MI-MEETING-${audience}`,
    meeting_intelligence_reference: 'SenseTrust Meeting Intelligence v2.3',
    partner_demo_kit_reference: 'SenseTrust Partner Demo Kit v2.2',
    main_interest_signal: 'Solicitou proximo passo governado ou material autorizado.',
    main_objection: 'Risco de interpretar demo como producao, contrato ou cliente real.',
    risk_level: riskScore.risk_level,
    priority_level: priority.priority_level,
    institutional_readiness_score: SIMULATED_READINESS_SCORES[index],
    opportunity_priority_score: priority,
    pipeline_risk_score: riskScore,
    recommended_decision: riskScore.risk_level === 'critical' ? 'blocked' : priority.priority_level === 'strategic' ? 'go' : 'human_review_required',
    recommended_next_move: 'Enviar material autorizado ou abrir revisao humana.',
    human_review_required: true,
    legal_review_required: riskScore.risk_level === 'high' || riskScore.risk_level === 'critical',
    data_classification: 'metadata_only',
    clinical_data_used: false,
    real_crm_enabled: false,
    real_analytics_enabled: false,
    real_email_automation_enabled: false,
    contract_binding_claim: false,
    simulated_only: true,
  }
})

export const SIMULATED_PIPELINE_STAGES: SenseTrustPipelineStage[] = PIPELINE_STAGE_TYPES.map((stage) => ({
  stage_id: `PG-STAGE-${stage}`,
  stage_type: stage,
  entry_criteria: ['registro metadata_only', 'sem dado real', 'fonte de meeting intelligence'],
  exit_criteria: ['revisao humana quando aplicavel', 'decisao go/no-go simulada'],
  blockers: ['dado sensivel', 'contrato real', 'cliente real', 'score tratado como decisao automatica'],
  human_review_required: ['human_review', 'strategic_review', 'legal_review_required', 'go'].includes(stage),
}))

export const SIMULATED_GO_NO_GO_DECISIONS: SenseTrustGoNoGoDecision[] = SIMULATED_PIPELINE_OPPORTUNITIES.map((opportunity, index) => ({
  decision_id: `PG-GNG-${index + 1}`,
  opportunity_id: opportunity.opportunity_id,
  decision_type: opportunity.recommended_decision,
  decision_reason: 'Decisao simulada baseada em prioridade, risco e maturidade institucional.',
  evidence_summary: 'Evidencia resumida de Meeting Intelligence v2.3 e Partner Demo Kit v2.2.',
  required_review: opportunity.legal_review_required ? ['legal', 'institutional'] : ['institutional'],
  allowed_next_move: opportunity.recommended_next_move,
  blocked_actions: ['contrato real', 'cliente real', 'CRM real', 'email automatico real'],
  risk_level: opportunity.risk_level,
  approved_by_human: false,
  simulated_only: true,
}))

export const SIMULATED_PIPELINE_DECISIONS: SenseTrustPipelineDecision[] = SIMULATED_GO_NO_GO_DECISIONS.map((decision) => ({ decision_id: `PG-DEC-${decision.opportunity_id}`, opportunity_id: decision.opportunity_id, decision_type: decision.decision_type, decision_reason: decision.decision_reason, simulated_only: true }))

export const SIMULATED_PIPELINE_RISK_SIGNALS: SenseTrustPipelineRiskSignal[] = Array.from({ length: 20 }, (_, index) => ({
  signal_id: `PG-RISK-${index + 1}`,
  opportunity_id: `PG-OPP-${(index % 12) + 1}`,
  audience_type: PIPELINE_AUDIENCES[index % PIPELINE_AUDIENCES.length],
  risk_level: index % 5 === 0 ? 'critical' : index % 3 === 0 ? 'high' : 'medium',
  impact: 'Pode gerar interpretacao indevida sobre producao, cliente, contrato ou validade.',
  mitigation: 'Revisao humana, disclosure e material autorizado.',
  blocks_go_no_go: index % 5 === 0,
}))

export const SIMULATED_HUMAN_REVIEW_QUEUE: SenseTrustHumanReviewQueueItem[] = SIMULATED_PIPELINE_OPPORTUNITIES.map((opportunity, index) => ({
  queue_id: `PG-HRQ-${index + 1}`,
  opportunity_id: opportunity.opportunity_id,
  audience_type: opportunity.audience_type,
  review_reason: 'Revisar risco, material, linguagem e proximo movimento.',
  risk_level: opportunity.risk_level,
  simulated_owner: ['institucional', 'juridico', 'privacidade', 'comercial'][index % 4],
  pending_decision: opportunity.recommended_decision,
}))

export const SIMULATED_NEXT_MOVES: SenseTrustNextMoveRecommendation[] = SIMULATED_PIPELINE_OPPORTUNITIES.map((opportunity, index) => ({
  recommendation_id: `PG-NEXT-${index + 1}`,
  opportunity_id: opportunity.opportunity_id,
  next_move: opportunity.recommended_next_move,
  authorized_material: 'Material metadata_only autorizado',
  suggested_meeting: index % 3 === 0 ? 'revisao juridica' : 'follow-up controlado',
  blocked_action: 'contrato, cliente real, CRM real ou automacao real',
  rationale: 'Movimento simulado e governado por risco e prioridade.',
}))

export const SIMULATED_STAGE_GATES: SenseTrustPipelineStageGate[] = SIMULATED_PIPELINE_STAGES.map((stage) => ({ gate_id: `PG-GATE-${stage.stage_type}`, stage_type: stage.stage_type, entry_criteria: [...stage.entry_criteria], exit_criteria: [...stage.exit_criteria], blockers: [...stage.blockers], human_review_required: stage.human_review_required }))

export const SIMULATED_DECISION_AUDIT_TRAIL: SenseTrustDecisionAuditTrailItem[] = Array.from({ length: 20 }, (_, index) => ({
  audit_id: `PG-AUDIT-${index + 1}`,
  opportunity_id: `PG-OPP-${(index % 12) + 1}`,
  previous_stage: PIPELINE_STAGE_TYPES[index % PIPELINE_STAGE_TYPES.length],
  next_stage: PIPELINE_STAGE_TYPES[(index + 1) % PIPELINE_STAGE_TYPES.length],
  reason: 'Mudanca simulada de estagio com trilha metadata_only.',
  simulated_date_label: 'data simulada',
  metadata_only: true,
}))

export const SIMULATED_RELATIONSHIP_GOVERNANCE_BOARD: SenseTrustRelationshipGovernanceBoard = {
  board_id: 'PG-REL-GOV-V24',
  contact_policy: 'Contato controlado, sem automacao real.',
  material_policy: 'Apenas material autorizado e metadata_only.',
  usage_limits: ['nao declarar parceria antes da formalizacao', 'nao declarar cliente real', 'nao usar dados sensiveis'],
  partnership_disclosure_rule: 'Toda parceria exige formalizacao, revisao humana e autorizacao explicita.',
  human_review_required: true,
}

export const SIMULATED_DECISION_BOARD: SenseTrustPipelineDecisionBoard = {
  board_id: 'PG-BOARD-V24',
  title: 'SenseTrust Pipeline Governance Decision Board v2.4',
  opportunities: SIMULATED_PIPELINE_OPPORTUNITIES,
  decisions: SIMULATED_GO_NO_GO_DECISIONS,
  human_review_queue: SIMULATED_HUMAN_REVIEW_QUEUE,
  relationship_governance: SIMULATED_RELATIONSHIP_GOVERNANCE_BOARD,
}

export const SIMULATED_PIPELINE_REFERENCES = ['SenseTrust Meeting Intelligence v2.3', 'SenseTrust Partner Demo Kit v2.2', 'SenseTrust Demo Readiness v2.1']
