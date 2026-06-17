import { DecisionBoardAuditTrailPanel } from '@/components/sensetrust/DecisionBoardAuditTrailPanel'
import { GoNoGoDecisionPanel } from '@/components/sensetrust/GoNoGoDecisionPanel'
import { HumanReviewQueuePanel } from '@/components/sensetrust/HumanReviewQueuePanel'
import { InstitutionalReadinessPanel } from '@/components/sensetrust/InstitutionalReadinessPanel'
import { NextMoveRecommendationPanel } from '@/components/sensetrust/NextMoveRecommendationPanel'
import { OpportunityPrioritizationBoard } from '@/components/sensetrust/OpportunityPrioritizationBoard'
import { PipelineGovernanceDashboard } from '@/components/sensetrust/PipelineGovernanceDashboard'
import { PipelineStageGatePanel } from '@/components/sensetrust/PipelineStageGatePanel'
import { RelationshipGovernanceBoardPanel } from '@/components/sensetrust/RelationshipGovernanceBoardPanel'
import { RiskPriorityMatrixPanel } from '@/components/sensetrust/RiskPriorityMatrixPanel'
import { createPipelineGovernanceState } from '@/services/sensetrust/pipeline-governance-service'

export default function SenseTrustPipelineGovernance() {
  const state = createPipelineGovernanceState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <PipelineGovernanceDashboard state={state} />
        <OpportunityPrioritizationBoard opportunities={state.opportunities} />
        <GoNoGoDecisionPanel decisions={state.go_no_go_decisions} />
        <InstitutionalReadinessPanel scores={state.readiness_scores} />
        <RiskPriorityMatrixPanel risks={state.risk_signals} />
        <HumanReviewQueuePanel items={state.human_review_queue} />
        <NextMoveRecommendationPanel items={state.next_move_recommendations} />
        <PipelineStageGatePanel gates={state.stage_gates} />
        <DecisionBoardAuditTrailPanel items={state.decision_audit_trail} />
        <RelationshipGovernanceBoardPanel board={state.relationship_governance_board} />
      </div>
    </main>
  )
}
