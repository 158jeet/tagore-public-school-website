# ADR-001: Retain the TPS and TIER applications in one repository

- **Status:** Accepted
- **Date:** 2026-11-21
- **Decision owners:** Tagore website programme owner
- **Scope:** TPS website at repository root and TIER website under `apps/tier`

## Context

The programme maintains two distinct public websites with separate audiences, domains, canonical URLs, sitemaps, builds and release requirements. The applications currently share a Git repository, documentation, security policy and a single free CI workflow. There is one coordinated delivery programme and no confirmed need for independent repository permissions or separate engineering teams.

The project constraint is to avoid paid services and unnecessary operational complexity. The two applications must remain independently buildable and deployable even while their source is kept together.

## Decision

Retain the monorepo for the current programme phase. Keep the application boundaries explicit:

- TPS application source and build configuration remain at repository root.
- TIER application source and build configuration remain under `apps/tier`.
- Each app keeps its own domain identity, metadata, sitemap, robots policy and deployment configuration.
- CI continues to run separate TPS and TIER quality jobs.
- Do not introduce cross-app runtime imports or shared components unless a later ADR defines a stable shared package boundary.
- Keep secrets and production environment variables isolated per application and environment.

## Consequences

### Benefits
- One review surface and one canonical feature register.
- One free CI workflow can validate both websites in parallel.
- Shared security, quality and content governance are easier to maintain.
- No immediate repository migration, duplicated automation or additional service configuration.

### Trade-offs
- Repository-level permissions and settings are shared.
- A change to shared root configuration can affect both applications.
- Dependency upgrades may require coordinated review even though each app has its own package manifest.

## Revisit triggers

Reconsider extraction only if one or more conditions become real and persistent:

1. Separate teams need independent repository permissions and release ownership.
2. TPS and TIER require incompatible toolchains or dependency lifecycles.
3. A legal, security or operational boundary requires separate repositories.
4. CI contention or repository size becomes a measured delivery bottleneck.
5. One application needs a distinct release process that cannot be maintained safely in the monorepo.

Until then, independent app builds and deployments provide the required separation without paying the operational cost of repository extraction.
