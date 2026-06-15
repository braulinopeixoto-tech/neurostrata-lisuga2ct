import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from '@/components/Layout'
import NotFound from '@/pages/NotFound'
import { AppStoreProvider } from '@/stores/useAppStore'
import { ReportStoreProvider } from '@/stores/useReportStore'
import { TrustStoreProvider } from '@/stores/useTrustStore'
import { PharmacyStoreProvider } from '@/stores/usePharmacyStore'
import { VitalStrataStoreProvider } from '@/stores/useVitalStrataStore'
import { TeamFlowProvider } from '@/stores/useTeamFlowStore'

import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import MedicalArea from '@/pages/MedicalArea'
import NeuropsychologyArea from '@/pages/NeuropsychologyArea'
import NutritionArea from '@/pages/NutritionArea'
import SpeechTherapyArea from '@/pages/SpeechTherapyArea'
import PsychopedagogyArea from '@/pages/PsychopedagogyArea'
import Patients from '@/pages/Patients'
import PatientDetail from '@/pages/PatientDetail'
import Assessment from '@/pages/assessment/Assessment'
import Analysis from '@/pages/Analysis'
import Report from '@/pages/Report'
import Protocols from '@/pages/Protocols'
import Professionals from '@/pages/Professionals'
import Pharmacopeia from '@/pages/Pharmacopeia'
import Neuronavigation from '@/pages/Neuronavigation'
import AuditorPortal from '@/pages/AuditorPortal'
import DefensorPortal from '@/pages/DefensorPortal'
import ReportCenter from '@/pages/ReportCenter'
import PerformanceTimeline from '@/pages/PerformanceTimeline'
import PatientPortal from '@/pages/PatientPortal'
import VerifyDocument from '@/pages/VerifyDocument'
import VitalStrata from '@/pages/VitalStrata'
import PsychometricLab from '@/pages/PsychometricLab'

import TeamFlowDashboard from '@/pages/teamflow/TeamFlowDashboard'
import TeamManagement from '@/pages/teamflow/TeamManagement'
import CaseWorkspaceList from '@/pages/teamflow/CaseWorkspaceList'
import CaseWorkspaceDetail from '@/pages/teamflow/CaseWorkspaceDetail'

// New V2 Architecture Pages
import ClinicalJourney from '@/pages/ClinicalJourney'
import DiagnosticCore from '@/pages/DiagnosticCore'
import Interventions from '@/pages/Interventions'
import TrustLayer from '@/pages/TrustLayer'
import SenseTrustPrototypeUX from '@/pages/SenseTrustPrototypeUX'
import SenseTrustPublicPrototype from '@/pages/SenseTrustPublicPrototype'
import SenseTrustDemoReadiness from '@/pages/SenseTrustDemoReadiness'
import SenseTrustPartnerDemoKit from '@/pages/SenseTrustPartnerDemoKit'

const App = () => (
  <AppStoreProvider>
    <ReportStoreProvider>
      <TrustStoreProvider>
        <PharmacyStoreProvider>
          <VitalStrataStoreProvider>
            <TeamFlowProvider>
              <BrowserRouter>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <Routes>
                    <Route path="/verify/:id" element={<VerifyDocument />} />
                    <Route element={<Layout />}>
                      <Route path="/" element={<Index />} />

                      {/* V2 Core Architecture */}
                      <Route path="/clinical-journey" element={<ClinicalJourney />} />
                      <Route path="/diagnostic-core" element={<DiagnosticCore />} />
                      <Route path="/interventions" element={<Interventions />} />
                      <Route path="/trust-layer" element={<TrustLayer />} />
                      <Route path="/sensetrust-prototype-ux" element={<SenseTrustPrototypeUX />} />
                      <Route path="/sensetrust-public-prototype" element={<SenseTrustPublicPrototype />} />
                      <Route path="/sensetrust-demo-readiness" element={<SenseTrustDemoReadiness />} />
                      <Route path="/sensetrust-partner-demo-kit" element={<SenseTrustPartnerDemoKit />} />

                      <Route path="/vitalstrata" element={<VitalStrata />} />
                      <Route path="/psychometric-lab" element={<PsychometricLab />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/medical" element={<MedicalArea />} />
                      <Route path="/neuropsychology" element={<NeuropsychologyArea />} />
                      <Route path="/nutrition" element={<NutritionArea />} />
                      <Route path="/speech-therapy" element={<SpeechTherapyArea />} />
                      <Route path="/psychopedagogy" element={<PsychopedagogyArea />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/patients/:id" element={<PatientDetail />} />
                      <Route path="/professionals" element={<Professionals />} />
                      <Route path="/assessment" element={<Assessment />} />
                      <Route path="/gestao-metabolica" element={<Pharmacopeia />} />
                      <Route path="/neuronavigation" element={<Neuronavigation />} />
                      <Route path="/analysis/:id" element={<Analysis />} />
                      <Route path="/report/:id" element={<Report />} />
                      <Route path="/report/new" element={<Report />} />
                      <Route path="/protocols" element={<Protocols />} />
                      <Route path="/auditor-portal" element={<AuditorPortal />} />
                      <Route path="/defensor-portal" element={<DefensorPortal />} />
                      <Route path="/report-center" element={<ReportCenter />} />
                      <Route path="/performance-timeline" element={<PerformanceTimeline />} />
                      <Route path="/patient-portal" element={<PatientPortal />} />

                      {/* TeamFlow / NeuroModel Routes */}
                      <Route path="/teamflow" element={<TeamFlowDashboard />} />
                      <Route path="/teamflow/team" element={<TeamManagement />} />
                      <Route path="/teamflow/cases" element={<CaseWorkspaceList />} />
                      <Route path="/teamflow/cases/:id" element={<CaseWorkspaceDetail />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </TooltipProvider>
              </BrowserRouter>
            </TeamFlowProvider>
          </VitalStrataStoreProvider>
        </PharmacyStoreProvider>
      </TrustStoreProvider>
    </ReportStoreProvider>
  </AppStoreProvider>
)

export default App
