import { WebsiteBlueprintDashboard } from '@/components/sensetrust/WebsiteBlueprintDashboard'
import { createWebsiteBlueprintState } from '@/services/sensetrust/website-blueprint-service'

export default function SenseTrustWebsiteBlueprint() {
  const state = createWebsiteBlueprintState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <WebsiteBlueprintDashboard state={state} />
      </div>
    </main>
  )
}
