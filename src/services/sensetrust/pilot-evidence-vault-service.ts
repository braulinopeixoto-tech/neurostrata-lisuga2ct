import {
  PILOT_EVIDENCE_REAL_CLAIM_DENYLIST,
  PILOT_EVIDENCE_REFERENCES,
  PILOT_EVIDENCE_SENSITIVE_DENYLIST,
  SIMULATED_ACCEPTANCE_EVIDENCE_LINKS,
  SIMULATED_ACCEPTANCE_LEDGER_ENTRIES,
  SIMULATED_ACCEPTANCE_LEDGERS,
  SIMULATED_ACCEPTANCE_STATES,
  SIMULATED_EVIDENCE_AUDIT_TRAIL,
  SIMULATED_EVIDENCE_COMPLETENESS_SCORES,
  SIMULATED_EVIDENCE_MINIMUM_MATRICES,
  SIMULATED_EVIDENCE_MISUSE_BLOCKERS,
  SIMULATED_EVIDENCE_RISK_SIGNALS,
  SIMULATED_EVIDENCE_VAULT_EXECUTIVE_REPORTS,
  SIMULATED_PILOT_EVIDENCE_HASHES,
  SIMULATED_PILOT_EVIDENCE_MANIFESTS,
  SIMULATED_PILOT_EVIDENCE_RECORDS,
  SIMULATED_PILOT_EVIDENCE_STATES,
  SIMULATED_PILOT_EVIDENCE_VAULT_EXPORT_PAYLOAD,
  SIMULATED_PILOT_EVIDENCE_VAULT_STATE,
  SIMULATED_PILOT_EVIDENCE_VAULTS,
  simulatedLogicalHash,
} from '@/fixtures/sensetrust/simulated-pilot-evidence-vault'
import type {
  SenseTrustAcceptanceStateType,
  SenseTrustEvidenceRiskLevel,
  SenseTrustEvidenceStateType,
  SenseTrustPilotEvidenceVaultExportPayload,
  SenseTrustPilotEvidenceVaultState,
  SenseTrustPilotEvidenceVaultValidationResult,
} from '@/types/sensetrust/pilot-evidence-vault'

export function createPilotEvidenceVaultState() { return createDefaultPilotEvidenceVaultState() }
export function createPilotEvidenceVault() { return { ...SIMULATED_PILOT_EVIDENCE_VAULTS[0] } }
export function createPilotEvidenceRecord() { return { ...SIMULATED_PILOT_EVIDENCE_RECORDS[0] } }
export function createPilotEvidenceManifest() { return { ...SIMULATED_PILOT_EVIDENCE_MANIFESTS[0], evidence_ids: [...SIMULATED_PILOT_EVIDENCE_MANIFESTS[0].evidence_ids] } }
export function createPilotEvidenceHash() { return { ...SIMULATED_PILOT_EVIDENCE_HASHES[0] } }
export function createPilotEvidenceState() { return { ...SIMULATED_PILOT_EVIDENCE_STATES[0] } }
export function createAcceptanceLedger() { return { ...SIMULATED_ACCEPTANCE_LEDGERS[0], entries: SIMULATED_ACCEPTANCE_LEDGERS[0].entries.map((item) => ({ ...item, required_review: [...item.required_review], blocked_actions: [...item.blocked_actions] })) } }
export function createAcceptanceLedgerEntry() { return { ...SIMULATED_ACCEPTANCE_LEDGER_ENTRIES[0], required_review: [...SIMULATED_ACCEPTANCE_LEDGER_ENTRIES[0].required_review], blocked_actions: [...SIMULATED_ACCEPTANCE_LEDGER_ENTRIES[0].blocked_actions] } }
export function createAcceptanceState() { return { ...SIMULATED_ACCEPTANCE_STATES[0] } }
export function createAcceptanceEvidenceLink() { return { ...SIMULATED_ACCEPTANCE_EVIDENCE_LINKS[0] } }
export function createEvidenceMinimumMatrix() { return { ...SIMULATED_EVIDENCE_MINIMUM_MATRICES[0] } }
export function createEvidenceCompletenessScore() { return { ...SIMULATED_EVIDENCE_COMPLETENESS_SCORES[0] } }
export function createEvidenceRiskSignal() { return { ...SIMULATED_EVIDENCE_RISK_SIGNALS[0] } }
export function createEvidenceMisuseBlocker() { return { ...SIMULATED_EVIDENCE_MISUSE_BLOCKERS[0] } }
export function createEvidenceAuditTrailItem() { return { ...SIMULATED_EVIDENCE_AUDIT_TRAIL[0] } }
export function createEvidenceVaultExecutiveReport() { return { ...SIMULATED_EVIDENCE_VAULT_EXECUTIVE_REPORTS[0], pending_items: [...SIMULATED_EVIDENCE_VAULT_EXECUTIVE_REPORTS[0].pending_items] } }

export function createDefaultPilotEvidenceVaults() { return SIMULATED_PILOT_EVIDENCE_VAULTS.map((item) => ({ ...item })) }
export function createDefaultPilotEvidenceRecords() { return SIMULATED_PILOT_EVIDENCE_RECORDS.map((item) => ({ ...item })) }
export function createDefaultPilotEvidenceManifests() { return SIMULATED_PILOT_EVIDENCE_MANIFESTS.map((item) => ({ ...item, evidence_ids: [...item.evidence_ids] })) }
export function createDefaultAcceptanceLedgers() { return SIMULATED_ACCEPTANCE_LEDGERS.map((item) => ({ ...item, entries: item.entries.map((entry) => ({ ...entry, required_review: [...entry.required_review], blocked_actions: [...entry.blocked_actions] })) })) }
export function createDefaultAcceptanceLedgerEntries() { return SIMULATED_ACCEPTANCE_LEDGER_ENTRIES.map((item) => ({ ...item, required_review: [...item.required_review], blocked_actions: [...item.blocked_actions] })) }
export function createDefaultAcceptanceStates() { return SIMULATED_ACCEPTANCE_STATES.map((item) => ({ ...item })) }
export function createDefaultEvidenceMinimumMatrix() { return SIMULATED_EVIDENCE_MINIMUM_MATRICES.map((item) => ({ ...item })) }
export function createDefaultEvidenceCompletenessScores() { return SIMULATED_EVIDENCE_COMPLETENESS_SCORES.map((item) => ({ ...item })) }
export function createDefaultEvidenceRiskSignals() { return SIMULATED_EVIDENCE_RISK_SIGNALS.map((item) => ({ ...item })) }
export function createDefaultEvidenceMisuseBlockers() { return SIMULATED_EVIDENCE_MISUSE_BLOCKERS.map((item) => ({ ...item })) }
export function createDefaultEvidenceAuditTrail() { return SIMULATED_EVIDENCE_AUDIT_TRAIL.map((item) => ({ ...item })) }
export function createDefaultEvidenceVaultExecutiveReports() { return SIMULATED_EVIDENCE_VAULT_EXECUTIVE_REPORTS.map((item) => ({ ...item, pending_items: [...item.pending_items] })) }

export function createDefaultPilotEvidenceVaultState(): SenseTrustPilotEvidenceVaultState {
  return {
    ...SIMULATED_PILOT_EVIDENCE_VAULT_STATE,
    vaults: createDefaultPilotEvidenceVaults(),
    evidence_records: createDefaultPilotEvidenceRecords(),
    evidence_manifests: createDefaultPilotEvidenceManifests(),
    evidence_hashes: SIMULATED_PILOT_EVIDENCE_HASHES.map((item) => ({ ...item })),
    evidence_states: SIMULATED_PILOT_EVIDENCE_STATES.map((item) => ({ ...item })),
    acceptance_ledgers: createDefaultAcceptanceLedgers(),
    acceptance_ledger_entries: createDefaultAcceptanceLedgerEntries(),
    acceptance_states: createDefaultAcceptanceStates(),
    acceptance_evidence_links: SIMULATED_ACCEPTANCE_EVIDENCE_LINKS.map((item) => ({ ...item })),
    evidence_minimum_matrices: createDefaultEvidenceMinimumMatrix(),
    completeness_scores: createDefaultEvidenceCompletenessScores(),
    risk_signals: createDefaultEvidenceRiskSignals(),
    misuse_blockers: createDefaultEvidenceMisuseBlockers(),
    audit_trail: createDefaultEvidenceAuditTrail(),
    executive_reports: createDefaultEvidenceVaultExecutiveReports(),
    references: [...PILOT_EVIDENCE_REFERENCES],
  }
}

export function calculateEvidenceCompletenessScore(present = 3, total = 5) { return total === 0 ? 0 : Math.round((present / total) * 100) }
export function calculateAcceptanceProgress(accepted = 1, total = 4) { return total === 0 ? 0 : Math.round((accepted / total) * 100) }
export function calculateEvidenceRiskScore(level: SenseTrustEvidenceRiskLevel = 'medium') { return ({ low: 20, medium: 45, high: 70, critical: 95 })[level] }
export function classifyEvidenceState(hasEvidence = true, blocked = false): SenseTrustEvidenceStateType { if (blocked) return 'blocked'; return hasEvidence ? 'registered' : 'draft' }
export function classifyAcceptanceState(progress = 25, blocked = false): SenseTrustAcceptanceStateType { if (blocked) return 'blocked'; if (progress >= 80) return 'accepted_simulated'; if (progress > 0) return 'partially_accepted'; return 'pending' }
export function classifyEvidenceRisk(score = 45): SenseTrustEvidenceRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function generateLogicalEvidenceHash(seed = 'evidence') { return `logical-${seed}-${seed.length * 17}` }
export function generateLogicalLedgerEntryHash(seed = 'ledger') { return `logical-${seed}-${seed.length * 23}` }
export function linkEvidenceToCheckpoint(evidenceId = 'PEV-REC-1') { return `${evidenceId}:IP-CHK-1` }
export function linkEvidenceToAcceptanceCriterion(evidenceId = 'PEV-REC-1') { return `${evidenceId}:IP-ACC-1` }
export function linkEvidenceToDecisionLog(evidenceId = 'PEV-REC-1') { return `${evidenceId}:IP-DEC-1` }
export function buildEvidenceManifest() { return createPilotEvidenceManifest() }
export function buildAcceptanceLedger() { return createAcceptanceLedger() }
export function buildEvidenceMinimumMatrix() { return createDefaultEvidenceMinimumMatrix() }
export function buildEvidenceAuditTrail() { return createDefaultEvidenceAuditTrail() }

export function validatePilotEvidenceVaults(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.vaults.length, 8, 'vaults') }
export function validatePilotEvidenceRecords(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.evidence_records.length, 40, 'evidence_records') }
export function validateEvidenceManifests(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.evidence_manifests.length, 8, 'evidence_manifests') }
export function validateAcceptanceLedgers(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.acceptance_ledgers.length, 8, 'acceptance_ledgers') }
export function validateAcceptanceLedgerEntries(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.acceptance_ledger_entries.length, 32, 'acceptance_ledger_entries') }
export function validateEvidenceMinimumMatrix(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.evidence_minimum_matrices.length, 8, 'evidence_minimum_matrices') }
export function validateEvidenceCompletenessScores(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.completeness_scores.length, 8, 'completeness_scores') }
export function validateEvidenceMisuseBlockers(state = createDefaultPilotEvidenceVaultState()) { return countCheck(state.misuse_blockers.length, 16, 'misuse_blockers') }
export function validateNoClinicalDataExposure(payload: unknown) { return denylistCheck(payload, PILOT_EVIDENCE_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(payload: unknown) { return flagCheck(payload, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(payload: unknown) { return flagCheck(payload, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealStorageClaim(payload: unknown) { return flagCheck(payload, ['real_storage_claimed":true', 'storage_real_enabled":true'], 'real_storage_true') }
export function validateNoRealLegalSignature(payload: unknown) { return flagCheck(payload, ['legal_signature_claimed":true', 'legal_signature_enabled":true'], 'legal_signature_true') }
export function validateNoBlockchainClaim(payload: unknown) { return flagCheck(payload, ['blockchain_claimed":true', 'blockchain_enabled":true'], 'blockchain_true') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, ['diagnostic_truth_certification_claimed":true'], 'diagnostic_truth_true') }
export function validateNoRealClinicalOperation(payload: unknown) { return flagCheck(payload, ['real_clinical_operation_claimed":true'], 'real_clinical_operation_true') }
export function validateNoRealRevenueClaim(payload: unknown) { return denylistCheck(payload, PILOT_EVIDENCE_REAL_CLAIM_DENYLIST, ['real_revenue_claimed":true']) }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, ['real_billing_claimed":true'], 'real_billing_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, ['contract_binding_claimed":true', 'contract_binding_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(payload: unknown) { return flagCheck(payload, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(payload: unknown) { return flagCheck(payload, ['partnership_claim":true'], 'partnership_claim_true') }

export function buildPilotEvidenceVaultExportPayload(): SenseTrustPilotEvidenceVaultExportPayload { return { ...SIMULATED_PILOT_EVIDENCE_VAULT_EXPORT_PAYLOAD, state: createDefaultPilotEvidenceVaultState() } }
export function validatePilotEvidenceVaultExportPayload(payload = buildPilotEvidenceVaultExportPayload()): SenseTrustPilotEvidenceVaultValidationResult {
  const checks = [validatePilotEvidenceVaults(payload.state), validatePilotEvidenceRecords(payload.state), validateEvidenceManifests(payload.state), validateAcceptanceLedgers(payload.state), validateAcceptanceLedgerEntries(payload.state), validateEvidenceMinimumMatrix(payload.state), validateEvidenceCompletenessScores(payload.state), validateEvidenceMisuseBlockers(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealStorageClaim(payload.state), validateNoRealLegalSignature(payload.state), validateNoBlockchainClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealClinicalOperation(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state)]
  const errors = checks.flatMap((check) => check.errors)
  return { valid: errors.length === 0, errors }
}

export function assertPilotEvidenceVaultNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'pilot_evidence_sensitive_exposure') }
export function assertPilotEvidenceVaultMetadataOnly(payload: { metadata_only?: boolean }) { if (!payload.metadata_only) throw new Error('pilot_evidence_not_metadata_only'); return { valid: true, errors: [] } }
export function assertPilotEvidenceVaultNoRealStorage(payload: unknown) { return assertValid(validateNoRealStorageClaim(payload), 'pilot_evidence_real_storage') }
export function assertPilotEvidenceVaultNoLegalSignature(payload: unknown) { return assertValid(validateNoRealLegalSignature(payload), 'pilot_evidence_legal_signature') }
export function assertPilotEvidenceVaultNoBlockchain(payload: unknown) { return assertValid(validateNoBlockchainClaim(payload), 'pilot_evidence_blockchain') }
export function assertPilotEvidenceVaultNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'pilot_evidence_diagnostic_truth') }
export function linkPilotEvidenceVaultToInstitutionalPilot() { return 'SenseTrust Institutional Pilot Control Room v2.5' }
export function linkPilotEvidenceVaultToPipelineGovernance() { return 'SenseTrust Pipeline Governance v2.4' }
export function linkPilotEvidenceVaultToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }

function countCheck(actual: number, expected: number, label: string): SenseTrustPilotEvidenceVaultValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustPilotEvidenceVaultValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustPilotEvidenceVaultValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustPilotEvidenceVaultValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
