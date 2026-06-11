export const SIMULATED_CERTIFICATE_TOKEN = 'sim-token-dnda-2026-0001'

export const SIMULATED_CERTIFICATE_CONTENT =
  'DNDA_SIMULATED_PUBLIC_CERTIFICATE_V03_NO_CLINICAL_CONTENT'

export const SIMULATED_CERTIFICATE = {
  document_id: 'DNDA-SIM-2026-0001',
  document_type: 'DNDA_REPORT_SIMULATED',
  document_version: 'v0.3-simulated',
  certificate_status: 'active',
  patient_scope: 'pseudonymized',
  document_hash: '0833f21a6f1ddae541c66c3255d64d428ea4e0e1a3111a4f401500b41e1f0d9f',
  manifest_hash: '34a8f9b3ee9f4a6877b8928f5db656ae5f13237d2374b81c4880f617b7dd1c0c',
  token: SIMULATED_CERTIFICATE_TOKEN,
  issuer: 'NeuroStrata Simulated Lab',
  issued_at: '2026-06-11T10:30:00Z',
  verification_status: 'valid',
  hash_match: true,
  revocation_status: 'not_revoked',
} as const

export const SIMULATED_REVOKED_CERTIFICATE = {
  ...SIMULATED_CERTIFICATE,
  token: 'sim-token-dnda-2026-revoked',
  certificate_status: 'revoked',
  verification_status: 'revoked',
  hash_match: true,
  revocation_status: 'revoked',
} as const
