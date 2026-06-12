# SenseTrust SaaS Tenant Isolation Policy

Status: simulated tenant isolation contract.

## Rule

A user from one organization cannot access another organization's resources.

## Validation

The v0.9 service validates actor organization id against resource organization id. Cross-tenant access returns `cross_tenant_access_blocked`.

## Public portal exception

The public portal remains metadata-only and token-based. Public verification does not expose clinical or tenant-private data.

## Production requirement

Future Supabase implementation must enforce tenant isolation through RLS, service-role boundaries, audit events and explicit organization ownership checks.
