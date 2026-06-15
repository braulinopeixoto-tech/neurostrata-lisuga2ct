import type { SenseTrustPartnerDemoKitState } from '@/types/sensetrust/partner-demo-kit'
import { AudienceBriefingPanel } from './AudienceBriefingPanel'
import { AuthorizedMaterialsPanel } from './AuthorizedMaterialsPanel'
import { DemoHandoffGovernancePanel } from './DemoHandoffGovernancePanel'
import { DemoOnePagerPanel } from './DemoOnePagerPanel'
import { FollowUpSequencePanel } from './FollowUpSequencePanel'
import { PartnerDemoRiskPanel } from './PartnerDemoRiskPanel'
import { PostDemoFeedbackPanel } from './PostDemoFeedbackPanel'
import { PreMeetingChecklistPanel } from './PreMeetingChecklistPanel'

export function PartnerDemoKitDashboard({ state }: { state: SenseTrustPartnerDemoKitState }) {
  const audiences = new Set(state.partner_demo_kit.audience_briefings.map((briefing) => briefing.audience_type))
  const guardrails = ['no production deploy', 'no real lead collection', 'no real analytics', 'no clinical data', 'no real revenue', 'no real billing', 'no diagnostic truth certification', 'no binding contract']

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Partner Demo Kit v2.2</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{state.partner_demo_kit.status} / metadata_only / simulated_only</p>
          </div>
          <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">score {state.readiness_score.score}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          <Metric label="publicos" value={audiences.size} />
          <Metric label="autorizados" value={state.authorized_materials.length} />
          <Metric label="bloqueados" value={state.prohibited_materials.length} />
          <Metric label="riscos" value={state.risks.length} />
          <Metric label="follow-ups" value={state.follow_up_sequences.length} />
          <Metric label="feedback" value={state.feedback_mock.length} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {guardrails.map((guardrail) => <span key={guardrail} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{guardrail}</span>)}
        </div>
      </section>
      <DemoOnePagerPanel onePager={state.partner_demo_kit.one_pager} />
      <AudienceBriefingPanel briefings={state.partner_demo_kit.audience_briefings} />
      <PreMeetingChecklistPanel checklist={state.pre_meeting_checklist} />
      <PostDemoFeedbackPanel checklist={state.post_demo_checklist} feedback={state.feedback_mock} />
      <AuthorizedMaterialsPanel authorized={state.authorized_materials} prohibited={state.prohibited_materials} />
      <FollowUpSequencePanel sequences={state.follow_up_sequences} />
      <PartnerDemoRiskPanel risks={state.risks} />
      <DemoHandoffGovernancePanel items={state.handoff_governance} />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="text-xs font-semibold uppercase text-slate-500">{label}</p><p className="mt-1 font-mono text-xl font-black text-slate-950">{value}</p></div>
}
