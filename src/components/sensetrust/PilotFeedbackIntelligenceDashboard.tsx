import type { SenseTrustPilotFeedbackIntelligenceState } from '@/types/sensetrust/pilot-feedback-intelligence'
import { PilotAcceptanceMetricsPanel } from './PilotAcceptanceMetricsPanel'
import { PilotFeedbackTimeline } from './PilotFeedbackTimeline'
import { PilotGTMRecommendationPanel } from './PilotGTMRecommendationPanel'
import { PilotObjectionRiskMatrix } from './PilotObjectionRiskMatrix'
import { PilotSegmentPriorityMatrix } from './PilotSegmentPriorityMatrix'
import { PilotValuePerceptionScoreCard } from './PilotValuePerceptionScoreCard'

interface PilotFeedbackIntelligenceDashboardProps {
  state: SenseTrustPilotFeedbackIntelligenceState
}

export function PilotFeedbackIntelligenceDashboard({ state }: PilotFeedbackIntelligenceDashboardProps) {
  const score = state.report.score

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Feedback Intelligence</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">simulated_only / metadata_only / human review required</p>
          </div>
          <span className="rounded-md bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">no clinical data / no billing</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          <Metric label="acceptance" value={score.acceptance_score} />
          <Metric label="perceived value" value={score.perceived_value_score} />
          <Metric label="trust clarity" value={score.trust_clarity_score} />
          <Metric label="privacy" value={score.privacy_confidence_score} />
          <Metric label="commercial intent" value={score.commercial_intent_score} />
        </div>
      </section>

      <PilotGTMRecommendationPanel recommendation={state.gtm_recommendation} />

      <div className="grid gap-5 xl:grid-cols-2">
        <PilotAcceptanceMetricsPanel metrics={state.acceptance_metrics} />
        <PilotValuePerceptionScoreCard metrics={state.value_metrics} />
      </div>

      <PilotObjectionRiskMatrix objections={state.objections} risks={state.risk_patterns} />
      <PilotSegmentPriorityMatrix segments={state.segment_signals} />
      <PilotFeedbackTimeline items={state.feedback_items} />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-xl font-black text-slate-950">{value}/100</p>
    </div>
  )
}
