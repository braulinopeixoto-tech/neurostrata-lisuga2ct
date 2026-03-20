import { useState } from 'react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import { VitalScoreForm } from './VitalScoreForm'
import { VitalScoreDashboard } from './VitalScoreDashboard'

export function LayerVitalScore({ caseId }: { caseId: string }) {
  const { vitalSnapshots } = useTeamFlowStore()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const snapshot = vitalSnapshots
    .filter((vs) => vs.case_workspace_id === caseId)
    .sort((a, b) => parseInt(b.id.split('-')[1] || '0') - parseInt(a.id.split('-')[1] || '0'))[0]

  if (isFormOpen || !snapshot) {
    return <VitalScoreForm caseId={caseId} onComplete={() => setIsFormOpen(false)} />
  }

  return <VitalScoreDashboard caseId={caseId} onRetake={() => setIsFormOpen(true)} />
}
