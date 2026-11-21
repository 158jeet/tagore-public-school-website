# Disposable Public CI Mirror Ledger

Last updated: 2026-11-21 (Asia/Kolkata)

## Purpose and operating rule

`158jeet/tagore-public-school-website` is the sole canonical, private source of truth. `158jeet/atlas-build-lab` is a disposable public CI mirror used only to obtain free GitHub-hosted Ubuntu Actions runs.

The mirror is not a backup, not a development source of truth, and not a confidentiality boundary. Public commits, forks, clones, caches, and downloaded copies may survive deletion or repository cleanup. Never publish secrets, personal/student/family information, private operational records, or production deployment credentials.

## Snapshot register

| Snapshot | Private source branch | Private source commit | Public target | Public snapshot commit | Status |
|---|---|---|---|---|---|
| 001 | main | `f9f6d499fa24de91f9dd13d6caa3bef0210ff481` | `158jeet/atlas-build-lab` | `b8c35ba8af6556939467f55182023989689996ef` | Published; Website CI running; initial quality stages passed |

## Audit record — snapshot 001

- Private source tree: 91 tracked files; tree SHA `e80aaf3e6064a67592a903b98039816835ca5e9e`.
- Commit history observed: 174 commits across two pages. The private history will **not** be copied to the public mirror.
- Audited the 64-file current-code/CI whitelist individually using GitHub file retrieval and credential-pattern checks for private-key headers, common GitHub token prefixes, AWS access-key IDs, email addresses, and likely credential assignments.
- No credential-pattern hits were found in the approved whitelist. Regex scanning is a screening measure, not a guarantee that source contains no sensitive information.
- A placeholder email `you@example.com` appears in form UI; institutional contact details and public campus information appear in source and are intentionally public-facing.
- The environment templates `.env.example` and `apps/tier/.env.example` are excluded from the public snapshot. The templates currently show blank delivery-key values.
- Excluded all `docs/**` internal planning, growth, operational, ERP-integration, deployment, threat-model, verification, and acceptance documents; excluded README files and environment templates.
- Excluded all old commits and commit history. The public mirror is populated as a fresh snapshot.
- No production secrets, GitHub secrets, deployment credentials, live lead data, analytics IDs, or pixels are to be added.

### Approved snapshot manifest

The public snapshot is limited to the current app source, tests, dependency manifests/lockfiles, build configuration, `.gitignore`, Dependabot configuration, and the primary CI workflow:

```text
.github/dependabot.yml
.github/workflows/ci.yml
.gitignore
apps/tier/eslint.config.mjs
apps/tier/next.config.ts
apps/tier/package-lock.json
apps/tier/package.json
apps/tier/postcss.config.js
apps/tier/src/app/about/page.tsx
apps/tier/src/app/api/enquiry/route.ts
apps/tier/src/app/choose/page.tsx
apps/tier/src/app/connect/page.tsx
apps/tier/src/app/contact/page.tsx
apps/tier/src/app/globals.css
apps/tier/src/app/institutions/[slug]/page.tsx
apps/tier/src/app/institutions/page.tsx
apps/tier/src/app/layout.tsx
apps/tier/src/app/page.tsx
apps/tier/src/app/partnerships/page.tsx
apps/tier/src/app/robots.ts
apps/tier/src/app/sitemap.ts
apps/tier/src/components/group-enquiry-form.tsx
apps/tier/src/components/institution-directory.tsx
apps/tier/src/components/mobile-quick-actions.tsx
apps/tier/src/components/site-footer.tsx
apps/tier/src/components/site-header.tsx
apps/tier/tailwind.config.ts
apps/tier/tsconfig.json
eslint.config.mjs
next.config.ts
package-lock.json
package.json
postcss.config.js
src/app/about/page.tsx
src/app/admissions/faq/page.tsx
src/app/admissions/funnel/page.tsx
src/app/admissions/page.tsx
src/app/admissions/parent-checklist/page.tsx
src/app/api/enquiry/route.ts
src/app/globals.css
src/app/hostel/guide/page.tsx
src/app/layout.tsx
src/app/page.tsx
src/app/parent-guide/page.tsx
src/app/robots.ts
src/app/sitemap.ts
src/app/visit/guide/page.tsx
src/app/visit/page.tsx
src/components/enquiry-form.tsx
src/components/mobile-quick-actions.tsx
src/components/parent-decision-centre.tsx
src/components/site-footer.tsx
src/components/site-header.tsx
src/components/visit-request-form.tsx
tailwind.config.ts
tests/browser-journeys.mjs
tests/form-contract.test.mjs
tests/performance-audit.mjs
tests/runtime-smoke.mjs
tests/security-api.test.mjs
tests/site-config.test.mjs
tsconfig.json
```

## Synchronization protocol

1. Make all feature work and fixes in the private canonical repository first.
2. Record the exact private source commit and approved manifest here before each mirror refresh.
3. Re-scan the current snapshot before publishing; never mirror private Git history.
4. Populate/update the public mirror only from the approved manifest. Do not configure secrets or production deployments there.
5. Run and inspect CI against the exact mirrored snapshot commit.
6. Before a later refresh, retain the previous public run result/commit SHA in this ledger. Replace the mirror with a fresh clean snapshot rather than assuming deletion of files erases old public Git history.
7. After the websites are complete and private verification is done, remove public mirror contents/repository if desired. Assume anything already public may remain copied elsewhere.

## Change log

- 2026-11-21: Created this ledger before publishing any application source to the public CI mirror. Confirmed the canonical repository remains private and the public mirror was empty at the start of the audit.
- 2026-11-21: Published a fresh 62-file current-source snapshot to the public mirror as separate initial commits; the private 174-commit history and all internal `docs/**` files were excluded. Primary CI workflow was added last to avoid triggering it for every file upload. Public snapshot head: `b8c35ba8af6556939467f55182023989689996ef`. Website CI run `44876177550` was queued at the time of ledger update. Dependabot also initiated automatic update runs; two were reported failed and one succeeded. These are Dependabot update runs, separate from the website CI. The Website CI run is `in_progress`: TPS `npm ci`, typecheck, security/forms/config tests, lint, and build have passed; TIER `npm ci`, typecheck, lint, and build have passed. Both jobs are currently installing browser tooling; browser journeys, smoke tests, and performance audits have not yet completed.

- 2026-11-21: Website CI run `44876177550` completed with overall conclusion **success** on public snapshot `b8c35ba8af6556939467f55182023989689996ef`. Both jobs passed every step:
  - TPS: install, typecheck, security/forms/config tests, lint, production build, browser journeys/accessibility, production smoke test, performance lab, and artifact uploads.
  - TIER: install, typecheck, lint, production build, browser journeys/accessibility, production smoke test, performance lab, and artifact uploads.
  - Artifacts created: `tps-quality-visual-review`, `tier-quality-visual-review`, `tps-performance-lab`, and `tier-performance-lab`. GitHub artifact retention is 14 days (expires 2026-12-05); download/inspect before expiry if visual/performance review is needed.
- 2026-11-21: Open private PRs #80 (TPS parent decision-centre accessibility; head `a5a6329aeb57d3f7608538abb9bfacb6dea91d78`) and #81 (TIER directory filter accessibility; head `3388b2982814cbe74d78b901c64cb43f22488b82`) remain unmerged. Their exact-head combined commit statuses currently return no status checks. Do not merge until each exact head has successful CI and required security/dependency checks.
