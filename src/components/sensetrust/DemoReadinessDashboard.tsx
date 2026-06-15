import type { SenseTrustDemoReadinessState } from '@/types/sensetrust/demo-readiness'
import { AudienceTalkTrackPanel } from './AudienceTalkTrackPanel'
import { DemoGovernancePanel } from './DemoGovernancePanel'
import { DemoObjectionHandlingPanel } from './DemoObjectionHandlingPanel'
import { DemoRiskMatrixPanel } from './DemoRiskMatrixPanel'
import { DemoScriptPanel } from './DemoScriptPanel'
import { PresentationChecklistPanel } from './PresentationChecklistPanel'
import { VisualQAChecklistPanel } from './VisualQAChecklistPanel'

export function DemoReadinessDashboard({ state }: { state: SenseTrustDemoReadinessState }) {
  const blockers = state.visual_qa_checks.filter((check) => check.blocks_demo).length + state.demo_risks.filter((risk) => risk.blocks_demo).length
  const warnings = state.visual_qa_checks.filter((check) => check.status === 'warning').length
  const audiences = new Set(state.talk_tracks.map((track) => track.audience))
  const guardrails = ['no production deploy', 'no real lead collection', 'no real analytics', 'no clinical data', 'no real revenue', 'no real billing', 'no diagnostic truth certification']

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Demo Readiness v2.1</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{state.status} / metadata_only / simulated_only</p>
          </div>
          <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">score {state.readiness_score.score}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          <Metric label="qa checks" value={state.visual_qa_checks.length} />
          <Metric label="warnings" value={warnings} />
          <Metric label="blockers" value={blockers} />
          <Metric label="audiencias" value={audiences.size} />
          <Metric label="riscos" value={state.demo_risks.length} />
          <Metric label="objeções" value={state.objections.length} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {guardrails.map((guardrail) => (
            <span key={guardrail} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{guardrail}</span>
          ))}
        </div>
      </section>
      <VisualQAChecklistPanel checks={state.visual_qa_checks} />
      <DemoScriptPanel script={state.demo_script} />
      <AudienceTalkTrackPanel tracks={state.talk_tracks} />
      <DemoRiskMatrixPanel risks={state.demo_risks} />
      <DemoObjectionHandlingPanel objections={state.objections} />
      <PresentationChecklistPanel items={state.presentation_checklist} />
      <DemoGovernancePanel items={state.governance_items} />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-xl font-black text-slate-950">{value}</p>
    </div>
  )
}
