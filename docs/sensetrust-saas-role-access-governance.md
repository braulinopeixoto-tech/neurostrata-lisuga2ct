# SenseTrust SaaS Role Access Governance

Status: simulated role policy.

## Roles

- owner: full organization, user, billing, issuance and audit permissions;
- admin: manages organization and users, but not billing without billing_manager;
- clinical_reviewer: reviews and exports authorized metadata, but does not issue certificates;
- issuer: issues certificates and signs emissions;
- auditor: views audit trail and public verification, but does not mutate documents;
- viewer: views authorized metadata;
- public_verifier: accesses only public verification;
- billing_manager: manages simulated billing and plan consumption.

## Permission boundary

Roles control metadata workflows only. No role grants public access to clinical content.

## Future production requirement

Real authentication and RLS policy reconciliation must be implemented before any production pilot.
