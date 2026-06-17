import type { SenseTrustPipelineGovernanceState } from '@/types/sensetrust/pipeline-governance'
import { DecisionBoardAuditTrailPanel } from './DecisionBoardAuditTrailPanel'
import { GoNoGoDecisionPanel } from './GoNoGoDecisionPanel'
import { HumanReviewQueuePanel } from './HumanReviewQueuePanel'
import { InstitutionalReadinessPanel } from './InstitutionalReadinessPanel'
import { NextMoveRecommendationPanel } from './NextMoveRecommendationPanel'
import { OpportunityPrioritizationBoard } from './OpportunityPrioritizationBoard'
import { PipelineStageGatePanel } from './PipelineStageGatePanel'
import { RelationshipGovernanceBoardPanel } from './RelationshipGovernanceBoardPanel'
import { RiskPriorityMatrixPanel } from './RiskPriorityMatrixPanel'

export function PipelineGovernanceDashboard({ state }: { state: SenseTrustPipelineGovernanceState }) {
  const stages = new Set(state.opportunities.map((item) => item.pipeline_stage))
  const strategic = state.opportunities.filter((item) => item.priority_level === 'strategic').length
  const critical = state.opportunities.filter((item) => item.risk_level === 'critical').length
  const guardrails = ['no real CRM', 'no real analytics', 'no real email automation', 'no clinical data', 'no real revenue', 'no real billing', 'no diagnostic truth certification', 'no real client claim']

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Pipeline Governance v2.4</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">decision board / metadata_only / simulated_only</p>
          </div>
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">no automatic decision</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          <Metric label="oportunidades" value={state.opportunities.length} />
          <Metric label="estagios" value={stages.size} />
          <Metric label="estrategicas" value={strategic} />
          <Metric label="risco critico" value={critical} />
          <Metric label="go/no-go" value={state.go_no_go_decisions.length} />
          <Metric label="revisao" value={state.human_review_queue.length} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{guardrails.map((item) => <span key={item} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{item}</span>)}</div>
      </section>
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
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="text-xs font-semibold uppercase text-slate-500">{label}</p><p className="mt-1 font-mono text-xl font-black text-slate-950">{value}</p></div>
}
