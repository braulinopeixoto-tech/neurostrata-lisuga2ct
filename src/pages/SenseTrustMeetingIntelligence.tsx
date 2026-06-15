import { FeedbackCapturePanel } from '@/components/sensetrust/FeedbackCapturePanel'
import { FollowUpGovernancePanel } from '@/components/sensetrust/FollowUpGovernancePanel'
import { InterestSignalPanel } from '@/components/sensetrust/InterestSignalPanel'
import { MeetingInsightsPanel } from '@/components/sensetrust/MeetingInsightsPanel'
import { MeetingIntelligenceDashboard } from '@/components/sensetrust/MeetingIntelligenceDashboard'
import { MeetingRecordPanel } from '@/components/sensetrust/MeetingRecordPanel'
import { MeetingRiskSignalPanel } from '@/components/sensetrust/MeetingRiskSignalPanel'
import { NextStepsGovernancePanel } from '@/components/sensetrust/NextStepsGovernancePanel'
import { ObjectionTrackingPanel } from '@/components/sensetrust/ObjectionTrackingPanel'
import { OpportunityScorePanel } from '@/components/sensetrust/OpportunityScorePanel'
import { createMeetingIntelligenceState } from '@/services/sensetrust/meeting-intelligence-service'

export default function SenseTrustMeetingIntelligence() {
  const state = createMeetingIntelligenceState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <MeetingIntelligenceDashboard state={state} />
        <MeetingRecordPanel records={state.meeting_records} />
        <FeedbackCapturePanel items={state.feedback_items} />
        <ObjectionTrackingPanel objections={state.objections} />
        <InterestSignalPanel signals={state.interest_signals} />
        <MeetingRiskSignalPanel risks={state.risk_signals} />
        <NextStepsGovernancePanel steps={state.next_steps} />
        <OpportunityScorePanel opportunities={state.opportunity_scores} readiness={state.readiness_scores} />
        <MeetingInsightsPanel insights={state.insights} />
        <FollowUpGovernancePanel items={state.follow_up_governance} />
      </div>
    </main>
  )
}
