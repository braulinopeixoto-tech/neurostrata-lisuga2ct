import { EntryExitCriteriaMatrixPanel } from '@/components/sensetrust/EntryExitCriteriaMatrixPanel'
import { HumanReviewEscalationPathPanel } from '@/components/sensetrust/HumanReviewEscalationPathPanel'
import { InstitutionalExecutionPlanPanel } from '@/components/sensetrust/InstitutionalExecutionPlanPanel'
import { OperatingModelMisuseBlockerPanel } from '@/components/sensetrust/OperatingModelMisuseBlockerPanel'
import { OperationalControlBoardPanel } from '@/components/sensetrust/OperationalControlBoardPanel'
import { ScaleDecisionLogPanel } from '@/components/sensetrust/ScaleDecisionLogPanel'
import { ScaleGovernanceCalendarPanel } from '@/components/sensetrust/ScaleGovernanceCalendarPanel'
import { ScaleOperatingCadencePanel } from '@/components/sensetrust/ScaleOperatingCadencePanel'
import { ScaleRaciMatrixPanel } from '@/components/sensetrust/ScaleRaciMatrixPanel'
import { ScaleReadinessScorecardPanel } from '@/components/sensetrust/ScaleReadinessScorecardPanel'
import { ScaleRiskRegisterPanel } from '@/components/sensetrust/ScaleRiskRegisterPanel'
import { StrategicScaleOperatingExecutiveReportPanel } from '@/components/sensetrust/StrategicScaleOperatingExecutiveReportPanel'
import { StrategicScaleOperatingModelDashboard } from '@/components/sensetrust/StrategicScaleOperatingModelDashboard'
import { StrategicScaleOperatingModelPanel } from '@/components/sensetrust/StrategicScaleOperatingModelPanel'
import { createStrategicScaleOperatingModelState } from '@/services/sensetrust/strategic-scale-operating-model-service'

export default function SenseTrustStrategicScaleOperatingModel() {
  const state = createStrategicScaleOperatingModelState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicScaleOperatingModelDashboard state={state} /><StrategicScaleOperatingModelPanel models={state.operating_models} /><ScaleOperatingCadencePanel cadences={state.operating_cadences} /><ScaleRaciMatrixPanel matrices={state.raci_matrices} /><EntryExitCriteriaMatrixPanel matrices={state.entry_exit_criteria_matrices} /><InstitutionalExecutionPlanPanel plans={state.execution_plans} /><ScaleGovernanceCalendarPanel calendars={state.governance_calendars} /><ScaleRiskRegisterPanel registers={state.risk_registers} /><ScaleDecisionLogPanel logs={state.decision_logs} /><OperationalControlBoardPanel boards={state.operational_control_boards} /><HumanReviewEscalationPathPanel paths={state.human_review_escalation_paths} /><ScaleReadinessScorecardPanel scorecards={state.readiness_scorecards} /><OperatingModelMisuseBlockerPanel blockers={state.misuse_blockers} /><StrategicScaleOperatingExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
