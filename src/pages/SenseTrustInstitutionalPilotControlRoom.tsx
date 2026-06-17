import { InstitutionalPilotControlRoomDashboard } from '@/components/sensetrust/InstitutionalPilotControlRoomDashboard'
import { InstitutionalPilotExecutiveReportPanel } from '@/components/sensetrust/InstitutionalPilotExecutiveReportPanel'
import { PilotCheckpointTimelinePanel } from '@/components/sensetrust/PilotCheckpointTimelinePanel'
import { PilotDecisionLogPanel } from '@/components/sensetrust/PilotDecisionLogPanel'
import { PilotEvidenceChecklistPanel } from '@/components/sensetrust/PilotEvidenceChecklistPanel'
import { PilotExecutionRiskRegisterPanel } from '@/components/sensetrust/PilotExecutionRiskRegisterPanel'
import { PilotInterruptionGovernancePanel } from '@/components/sensetrust/PilotInterruptionGovernancePanel'
import { PilotRaciGovernancePanel } from '@/components/sensetrust/PilotRaciGovernancePanel'
import { PilotScopePanel } from '@/components/sensetrust/PilotScopePanel'
import { SupervisedAcceptancePanel } from '@/components/sensetrust/SupervisedAcceptancePanel'
import { createInstitutionalPilotControlRoomState } from '@/services/sensetrust/institutional-pilot-control-room-service'

export default function SenseTrustInstitutionalPilotControlRoom() {
  const state = createInstitutionalPilotControlRoomState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <InstitutionalPilotControlRoomDashboard state={state} />
        <PilotScopePanel scopes={state.scopes} />
        <PilotRaciGovernancePanel roles={state.raci_roles} />
        <PilotCheckpointTimelinePanel checkpoints={state.checkpoints} />
        <SupervisedAcceptancePanel criteria={state.acceptance_criteria} />
        <PilotExecutionRiskRegisterPanel risks={state.execution_risks} />
        <PilotEvidenceChecklistPanel items={state.evidence_items} />
        <PilotInterruptionGovernancePanel rules={state.interruption_rules} />
        <PilotDecisionLogPanel items={state.decision_logs} />
        <InstitutionalPilotExecutiveReportPanel reports={state.executive_reports} />
      </div>
    </main>
  )
}
