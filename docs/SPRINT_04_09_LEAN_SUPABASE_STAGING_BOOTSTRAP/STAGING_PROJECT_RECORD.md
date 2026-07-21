# STAGING PROJECT RECORD

## Identity

- Program: `PROGRAM_04_AI_TRUST_ENGINE`
- Sprint: `SPRINT_04.09_LEAN_SUPABASE_STAGING_BOOTSTRAP`
- Project name: `neurostrata-ai-trust-staging`
- Project ref: `dujbstywpckdmnmfalbz`
- Owner: Braulino Peixoto organization
- Organization id: `zgjwbjegoqegtadtsfxt`
- Region: `sa-east-1`
- Created at: `2026-07-21T23:18:33.857948Z`
- Environment classification: `STAGING_NON_PRODUCTION`

## Isolation evidence

- The project was created during this controlled execution with Supabase CLI `2.109.1`.
- No legacy Supabase project was listed, inspected, linked, queried, or modified.
- The project was linked by its exact new `project_ref` only.
- Before the authorized migration, the project was newly provisioned and contained no project-specific application data.
- After migration, the `public` schema contained exactly the five authorized AI Trust tables.
- Final validation found zero non-synthetic events, zero rows in the other four AI Trust tables, and zero prohibited-content matches.
- No production reference, clinical data, credential, service-role key, or patient data was used.

## Scope boundary

This record identifies only the isolated AI Trust staging project. It does not authorize production access, application deployment, registry promotion, clinical processing, or use of any legacy Supabase project.
