import { AudienceTalkTrackPanel } from '@/components/sensetrust/AudienceTalkTrackPanel'
import { DemoGovernancePanel } from '@/components/sensetrust/DemoGovernancePanel'
import { DemoObjectionHandlingPanel } from '@/components/sensetrust/DemoObjectionHandlingPanel'
import { DemoReadinessDashboard } from '@/components/sensetrust/DemoReadinessDashboard'
import { DemoRiskMatrixPanel } from '@/components/sensetrust/DemoRiskMatrixPanel'
import { DemoScriptPanel } from '@/components/sensetrust/DemoScriptPanel'
import { PresentationChecklistPanel } from '@/components/sensetrust/PresentationChecklistPanel'
import { VisualQAChecklistPanel } from '@/components/sensetrust/VisualQAChecklistPanel'
import { createDemoReadinessState } from '@/services/sensetrust/demo-readiness-service'

export default function SenseTrustDemoReadiness() {
  const state = createDemoReadinessState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <DemoReadinessDashboard state={state} />
        <VisualQAChecklistPanel checks={state.visual_qa_checks} />
        <DemoScriptPanel script={state.demo_script} />
        <AudienceTalkTrackPanel tracks={state.talk_tracks} />
        <DemoRiskMatrixPanel risks={state.demo_risks} />
        <DemoObjectionHandlingPanel objections={state.objections} />
        <PresentationChecklistPanel items={state.presentation_checklist} />
        <DemoGovernancePanel items={state.governance_items} />
      </div>
    </main>
  )
}
