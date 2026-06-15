import { useMemo, useState } from 'react'
import { PrototypeAudiencePage } from '@/components/sensetrust/PrototypeAudiencePage'
import { PrototypeHomePage } from '@/components/sensetrust/PrototypeHomePage'
import { PrototypeHowItWorksPage } from '@/components/sensetrust/PrototypeHowItWorksPage'
import { PrototypeMockLeadForm } from '@/components/sensetrust/PrototypeMockLeadForm'
import { PrototypeNavigationShell } from '@/components/sensetrust/PrototypeNavigationShell'
import { PrototypePublicVerificationDemo } from '@/components/sensetrust/PrototypePublicVerificationDemo'
import { createPrototypeUXState } from '@/services/sensetrust/prototype-ux-service'

export default function SenseTrustPublicPrototype() {
  const state = useMemo(() => createPrototypeUXState(), [])
  const [activePath, setActivePath] = useState('/')
  const activeRoute = state.routes.find((route) => route.route_path === activePath) ?? state.routes[0]

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PrototypeNavigationShell navigation={state.navigation} activeRoute={activeRoute} onSelectRoute={setActivePath}>
          {activeRoute.route_type === 'home' && <PrototypeHomePage route={activeRoute} />}
          {activeRoute.route_type === 'how_it_works' && <PrototypeHowItWorksPage />}
          {activeRoute.route_type === 'public_verification' && <PrototypePublicVerificationDemo />}
          {activeRoute.route_type === 'contact_mockup' && <PrototypeMockLeadForm forms={state.mock_forms} />}
          {!['home', 'how_it_works', 'public_verification', 'contact_mockup'].includes(activeRoute.route_type) && <PrototypeAudiencePage flows={state.audience_flows} />}
        </PrototypeNavigationShell>
      </div>
    </main>
  )
}
