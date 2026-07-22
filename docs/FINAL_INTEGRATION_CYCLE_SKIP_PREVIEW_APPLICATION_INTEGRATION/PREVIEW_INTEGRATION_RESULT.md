# AI Trust Skip Preview Integration Result

## Result

- Route: `/ai-trust-preview`
- Environment: `STAGING_ONLY`
- Supabase project: `neurostrata-ai-trust-staging`
- Project ref: `dujbstywpckdmnmfalbz`
- Region: `sa-east-1`
- Branch: `feature/ai-trust-preview-integration`
- Implementation commit: `e471fa4bcdb71ccfdf749310b5aafbd518dbd3eb`
- Pull request: [#4](https://github.com/braulinopeixoto-tech/neurostrata-lisuga2ct/pull/4)

The route integrates the existing `SupabaseTrustRepository` through an injected
staging client. It resolves `organization_id` from active authenticated membership
data and never accepts an arbitrary organization identifier from a user field.

## User-testable local result

- Synthetic user authentication: PASS.
- Trusted organization resolution: PASS.
- Synthetic event append: PASS.
- Ordered resource chain retrieval: PASS.
- Chain integrity: `VALID`.
- Event visible after browser reload: PASS.
- Cross-organization visibility: `DENIED_AS_EXPECTED`.
- Anonymous append: denied by the interface and RLS boundary.
- Update/delete action exposed by preview: no.

The transient synthetic membership and Auth user were removed after validation.
Only append-only synthetic staging evidence remains. No clinical, EEG, diagnostic,
patient, or other operational data was used.

## Integrity correction

Migration `20260722104500_ai_trust_org_scoped_append.sql` scopes the append lock and
latest-hash lookup to `organization_id + resource_id`. A dry-run identified exactly
that migration, it was applied only to the authorized staging project, and remote
migration history now contains the three governed AI Trust migrations.

## Preview deployment

Preview URL: `NOT_AVAILABLE`

GitHub reports zero deployments for the branch and the repository contains only the
`AI Trust CI` workflow. No project-native preview deployment configuration or safe
preview target is available. No production or public deployment was attempted.
