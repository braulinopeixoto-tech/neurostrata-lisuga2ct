import { PilotCheckpointMonitoringPanel } from '@/components/sensetrust/PilotCheckpointMonitoringPanel'
import { PilotDecisionTriggerPanel } from '@/components/sensetrust/PilotDecisionTriggerPanel'
import { PilotDeviationEscalationPanel } from '@/components/sensetrust/PilotDeviationEscalationPanel'
import { PilotDeviationSignalPanel } from '@/components/sensetrust/PilotDeviationSignalPanel'
import { PilotEvidenceChainOfCustodyPanel } from '@/components/sensetrust/PilotEvidenceChainOfCustodyPanel'
import { PilotEvidenceIntakeQueuePanel } from '@/components/sensetrust/PilotEvidenceIntakeQueuePanel'
import { PilotEvidenceIntakeRecordPanel } from '@/components/sensetrust/PilotEvidenceIntakeRecordPanel'
import { PilotEvidenceIntegrityCheckPanel } from '@/components/sensetrust/PilotEvidenceIntegrityCheckPanel'
import { PilotHumanReviewTriggerPanel } from '@/components/sensetrust/PilotHumanReviewTriggerPanel'
import { PilotMonitoringAuditTrailPanel } from '@/components/sensetrust/PilotMonitoringAuditTrailPanel'
import { PilotMonitoringDashboardMetricsPanel } from '@/components/sensetrust/PilotMonitoringDashboardMetricsPanel'
import { PilotMonitoringRiskRegisterPanel } from '@/components/sensetrust/PilotMonitoringRiskRegisterPanel'
import { PilotMonitoringScenarioPanel } from '@/components/sensetrust/PilotMonitoringScenarioPanel'
import { PilotMonitoringTimelinePanel } from '@/components/sensetrust/PilotMonitoringTimelinePanel'
import { PilotRiskSignalUpdatePanel } from '@/components/sensetrust/PilotRiskSignalUpdatePanel'
import { StrategicPilotMonitoringEvidenceIntakeRoomDashboard } from '@/components/sensetrust/StrategicPilotMonitoringEvidenceIntakeRoomDashboard'
import { StrategicPilotMonitoringEvidenceIntakeRoomPanel } from '@/components/sensetrust/StrategicPilotMonitoringEvidenceIntakeRoomPanel'
import { StrategicPilotMonitoringExecutiveReportPanel } from '@/components/sensetrust/StrategicPilotMonitoringExecutiveReportPanel'
import { createStrategicPilotMonitoringEvidenceIntakeState } from '@/services/sensetrust/strategic-pilot-monitoring-evidence-intake-room-service'

export default function SenseTrustStrategicPilotMonitoringEvidenceIntakeRoom() {
  const state = createStrategicPilotMonitoringEvidenceIntakeState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicPilotMonitoringEvidenceIntakeRoomDashboard state={state} /><StrategicPilotMonitoringEvidenceIntakeRoomPanel rooms={state.rooms} /><PilotMonitoringScenarioPanel scenarios={state.scenarios} /><PilotEvidenceIntakeQueuePanel queues={state.evidenceIntakeQueues} /><PilotEvidenceIntakeRecordPanel records={state.evidenceIntakeRecords} /><PilotCheckpointMonitoringPanel records={state.checkpointMonitoringRecords} /><PilotMonitoringTimelinePanel timelines={state.monitoringTimelines} /><PilotDeviationSignalPanel signals={state.deviationSignals} /><PilotDeviationEscalationPanel escalations={state.deviationEscalations} /><PilotRiskSignalUpdatePanel updates={state.riskSignalUpdates} /><PilotMonitoringRiskRegisterPanel registers={state.monitoringRiskRegisters} /><PilotDecisionTriggerPanel triggers={state.decisionTriggers} /><PilotHumanReviewTriggerPanel triggers={state.humanReviewTriggers} /><PilotEvidenceIntegrityCheckPanel checks={state.evidenceIntegrityChecks} /><PilotEvidenceChainOfCustodyPanel chains={state.evidenceChainOfCustody} /><PilotMonitoringAuditTrailPanel trails={state.monitoringAuditTrails} /><PilotMonitoringDashboardMetricsPanel metrics={state.dashboardMetrics} /><StrategicPilotMonitoringExecutiveReportPanel reports={state.executiveReports} /></div></main>
}
