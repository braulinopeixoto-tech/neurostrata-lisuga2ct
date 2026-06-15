import { AudienceBriefingPanel } from '@/components/sensetrust/AudienceBriefingPanel'
import { AuthorizedMaterialsPanel } from '@/components/sensetrust/AuthorizedMaterialsPanel'
import { DemoHandoffGovernancePanel } from '@/components/sensetrust/DemoHandoffGovernancePanel'
import { DemoOnePagerPanel } from '@/components/sensetrust/DemoOnePagerPanel'
import { FollowUpSequencePanel } from '@/components/sensetrust/FollowUpSequencePanel'
import { MeetingScriptPanel } from '@/components/sensetrust/MeetingScriptPanel'
import { PartnerDemoKitDashboard } from '@/components/sensetrust/PartnerDemoKitDashboard'
import { PartnerDemoRiskPanel } from '@/components/sensetrust/PartnerDemoRiskPanel'
import { PostDemoFeedbackPanel } from '@/components/sensetrust/PostDemoFeedbackPanel'
import { PreMeetingChecklistPanel } from '@/components/sensetrust/PreMeetingChecklistPanel'
import { createPartnerDemoKitState } from '@/services/sensetrust/partner-demo-kit-service'

export default function SenseTrustPartnerDemoKit() {
  const state = createPartnerDemoKitState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <PartnerDemoKitDashboard state={state} />
        <DemoOnePagerPanel onePager={state.partner_demo_kit.one_pager} />
        <AudienceBriefingPanel briefings={state.partner_demo_kit.audience_briefings} />
        <MeetingScriptPanel scripts={state.partner_demo_kit.meeting_scripts} />
        <PreMeetingChecklistPanel checklist={state.pre_meeting_checklist} />
        <PostDemoFeedbackPanel checklist={state.post_demo_checklist} feedback={state.feedback_mock} />
        <AuthorizedMaterialsPanel authorized={state.authorized_materials} prohibited={state.prohibited_materials} />
        <FollowUpSequencePanel sequences={state.follow_up_sequences} />
        <PartnerDemoRiskPanel risks={state.risks} />
        <DemoHandoffGovernancePanel items={state.handoff_governance} />
      </div>
    </main>
  )
}
