# SenseTrust SaaS Core v0.9

Status: implemented locally, pending final build, Obsidian write and Git remote confirmation.

## Objective

SenseTrust v0.9 adds a simulated SaaS core for organizations, users, roles, plans, usage limits, monthly usage ledger and closed pilot readiness.

## Scope

- Simulated organizations and users only.
- No real billing.
- No payment gateway.
- No advanced real authentication.
- No Supabase migration in this sprint.
- No clinical data.

## SaaS model

The model separates:

- organization;
- user;
- role;
- permission;
- plan;
- usage ledger;
- commercial offer;
- tenant isolation.

## Relationship with v0.8

Public verification remains metadata-only. Each future certificate and public verification can be associated with an organization and counted as usage.

## Current limit

The SaaS layer is a product model and validation contract, not a production billing or identity system.
