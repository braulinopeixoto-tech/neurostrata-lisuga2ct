import type { SenseTrustMeetingIntelligenceState } from '@/types/sensetrust/meeting-intelligence'
import { FeedbackCapturePanel } from './FeedbackCapturePanel'
import { FollowUpGovernancePanel } from './FollowUpGovernancePanel'
import { InterestSignalPanel } from './InterestSignalPanel'
import { MeetingInsightsPanel } from './MeetingInsightsPanel'
import { MeetingRecordPanel } from './MeetingRecordPanel'
import { MeetingRiskSignalPanel } from './MeetingRiskSignalPanel'
import { NextStepsGovernancePanel } from './NextStepsGovernancePanel'
import { ObjectionTrackingPanel } from './ObjectionTrackingPanel'
import { OpportunityScorePanel } from './OpportunityScorePanel'

export function MeetingIntelligenceDashboard({ state }: { state: SenseTrustMeetingIntelligenceState }) {
  const guardrails = ['no real CRM', 'no real lead collection', 'no real analytics', 'no real email automation', 'no clinical data', 'no real revenue', 'no real billing', 'no diagnostic truth certification']
  const blockers = state.risk_signals.filter((risk) => risk.blocks_follow_up).length
  const averageOpportunity = Math.round(state.opportunity_scores.reduce((sum, item) => sum + item.opportunity_score, 0) / state.opportunity_scores.length)

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Meeting Intelligence v2.3</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">metadata_only / simulated_only / no real CRM</p>
          </div>
          <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">avg opportunity {averageOpportunity}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          <Metric label="reunioes" value={state.meeting_records.length} />
          <Metric label="feedback" value={state.feedback_items.length} />
          <Metric label="objecoes" value={state.objections.length} />
          <Metric label="interesse" value={state.interest_signals.length} />
          <Metric label="riscos" value={state.risk_signals.length} />
          <Metric label="blockers" value={blockers} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {guardrails.map((item) => <span key={item} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{item}</span>)}
        </div>
      </section>
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
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="text-xs font-semibold uppercase text-slate-500">{label}</p><p className="mt-1 font-mono text-xl font-black text-slate-950">{value}</p></div>
}
