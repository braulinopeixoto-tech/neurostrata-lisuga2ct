# Final Canonical Consolidation Result

Date: 2026-07-22

Repository: `neurostrata-ai-trust-skip`

Verified main: `e29b2faf56cd856240625578d5146f74ec8c9657`

Controlled branch: `feature/neurostrata-canonical-consolidation`

## Git truth

PR #4 is closed and merged on 2026-07-22. GitHub records merge commit `e29b2faf56cd856240625578d5146f74ec8c9657`, source commit `29eaaabc304c8bc1face01fd67d9dc40f4b238c0`, and target `main`. The source commit is not an ancestor of `main` because GitHub used a squash merge. The source and merge trees are identical (`47246700b3de985a58a966281741b444b1bf4b4b`), so no PR #4 content remains outside `main`.

## Canonical architecture

- Product shell: NeuroStrata, with one `BrowserRouter` and one application root.
- Authentication: one Supabase session context, session restoration, login, logout, loading/error states, and fail-closed protected routes.
- Supabase: one browser `createClient` factory, configured only by `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; the authorized staging project reference is validated as `dujbstywpckdmnmfalbz`.
- Organization: derived from the authenticated membership query; it is not accepted from arbitrary frontend input.
- AI Trust: existing repository, append-only, organization isolation, chain validation, diagnostic route, dashboard status, synthetic timeline, and details panel preserved.
- PocketBase: not adopted.
- Production and clinical data: not accessed.

## Resolution of the 34 divergences

| # | Divergence | Resolution | Result |
|---:|---|---|---|
| 1 | `App.tsx` | MANUAL_CONFLICT_RESOLUTION | Canonical V2 routes retained; donor routes, one auth boundary, and AI Trust route integrated. |
| 2 | `components/AddPatientModal.tsx` | KEEP_CANONICAL_AI_TRUST | Richer canonical implementation retained. |
| 3 | `components/AppSidebar.tsx` | MANUAL_CONFLICT_RESOLUTION | Canonical navigation retained; dashboard, AI Trust, and logout integrated. |
| 4 | `components/TrustSection.tsx` | KEEP_CANONICAL_AI_TRUST | Current governed trust presentation retained. |
| 5 | `components/charts/BrainMapVisualizer.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical visualization retained. |
| 6 | `components/charts/MentalRadarChart.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical visualization retained. |
| 7 | `components/medical/AutomationTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical module retained. |
| 8 | `components/medical/ClinicalHubTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical module retained. |
| 9 | `components/medical/DiagnosticsTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical module retained. |
| 10 | `components/medical/GovernanceTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical module retained. |
| 11 | `components/medical/MonitoringTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical module retained. |
| 12 | `components/medical/SmartClinicalAlerts.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical module retained; no clinical fixtures introduced. |
| 13 | `components/patient/PatientDashboardTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical shell retained. |
| 14 | `components/patient-portal/DynamicBiograma.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical implementation retained. |
| 15 | `lib/supabase/client.ts` | KEEP_CANONICAL_AI_TRUST | Reworked as the sole lazy browser client factory with fail-closed staging validation. |
| 16 | `lib/supabase/types.ts` | KEEP_CANONICAL_AI_TRUST | Existing generated database contract retained. |
| 17 | `pages/Index.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical entry retained. |
| 18 | `pages/MedicalArea.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 19 | `pages/NeuropsychologyArea.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 20 | `pages/NutritionArea.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 21 | `pages/PatientDetail.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 22 | `pages/PatientPortal.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 23 | `pages/Patients.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 24 | `pages/PerformanceTimeline.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 25 | `pages/Pharmacopeia.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical page retained. |
| 26 | `pages/assessment/Assessment.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical flow retained. |
| 27 | `pages/assessment/StepBigFive.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical step retained. |
| 28 | `pages/assessment/StepBiomarkers.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical step retained. |
| 29 | `pages/assessment/StepQuickReport.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical step retained. |
| 30 | `pages/assessment/StepRDoC.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical step retained. |
| 31 | `pages/tabs/NeuropsychologyTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical tab retained. |
| 32 | `pages/tabs/PsychopedagogyTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical tab retained. |
| 33 | `pages/tabs/SpeechTherapyTab.tsx` | KEEP_CANONICAL_AI_TRUST | Current canonical tab retained. |
| 34 | `services/dnda-report-ai.ts` | DISCARD_LEGACY | Donor version discarded; canonical service retained. |

All 34 divergences have a recorded disposition. Dashboard donor patterns were adapted directly into the AI Trust status, timeline, details, and protected-route states; no donor authentication, PocketBase dependency, environment file, credential, or clinical data was imported.

## External gates

The local browser confirms that the canonical login renders and denies access when staging configuration is absent. Real authentication, persistent synthetic append, chain verification against staging, RLS cross-organization denial, and Skip preview publication require the authorized non-production environment values and preview platform access. No fallback to production is permitted.
