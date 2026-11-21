# Disposable Public CI Mirror Ledger

Last updated: 2026-11-21 (Asia/Kolkata)

## Purpose and operating rule

`158jeet/tagore-public-school-website` is the sole canonical, private source of truth. `158jeet/atlas-build-lab` is a disposable public CI mirror used only to obtain free GitHub-hosted Ubuntu Actions runs.

The mirror is not a backup, not a development source of truth, and not a confidentiality boundary. Public commits, forks, clones, caches, and downloaded copies may survive deletion or repository cleanup. Never publish secrets, personal/student/family information, private operational records, or production deployment credentials.

## Snapshot register

| Snapshot | Private source branch | Private source commit | Public target | Public snapshot commit | Status |
|---|---|---|---|---|---|
| 001 | main | `f9f6d499fa24de91f9dd13d6caa3bef0210ff481` | `158jeet/atlas-build-lab` | `b8c35ba8af6556939467f55182023989689996ef` | Published; CI `44876177550` passed |
| 002 | main | `c9423e490c5b5b2f033a75d9cc8905b5e8c3ff57` | `158jeet/atlas-build-lab` | `bf8abe09eace140eb711d4eba4039b167b0dea9d` | Published; CI `44878876669` passed both app jobs |

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

- 2026-11-21: To validate private candidate PRs without enabling paid/private runners, created temporary public mirror QA branches and draft PRs containing only the respective single approved changed component (no private history, docs, secrets, or unrelated files):
  - Private PR #80 candidate component mirrored to public QA PR #1, branch `qa/pr80-tps-accessibility`, head `6698106ba4e7973640c19c7ac4e7bb3d4c5389a4`; run `44876548248`.
  - Private PR #81 candidate component mirrored to public QA PR #2, branch `qa/pr81-tier-directory-accessibility`, head `a8bbfc19af1ed378887b0257a6d6b450e2b20f26`; run `44876551603`.
  - Both public QA PRs are draft and must not be merged. They exist only to trigger the free CI workflow. At ledger update, both workflow runs were in progress. Do not merge private PRs #80/#81 until each candidate's corresponding full CI run succeeds and any required security/dependency scans are addressed.

- 2026-11-21: Private PR #80 was merged after both TPS and TIER candidate jobs passed on the free CI mirror. Private merge commit: `6897d823286cceeaf445f508e77520b4ac3c548a`. Candidate source component was identical to the mirrored file tested in public run `44876548248` (all steps successful).
- 2026-11-21: The first TIER accessibility candidate run `44876551603` failed its browser journey because the empty-state panel and active-filter toolbar both rendered a button named "Clear filters", making the test locator ambiguous. Fixed the private candidate by showing the toolbar reset only when results remain; the empty-state reset remains the sole button when there are no results. Updated private PR #81 head: `1e274b9d068f5bc0fbf22c973b24bb74aa205782`. New public mirror run `44877036890`: TIER job completed successfully; TPS job was still completing its performance step at ledger update.
- 2026-11-21: Started three parallel private implementation/quality lanes and mirrored only their changed files into draft public QA PRs for free CI:
  - Private PR #83 — TPS searchable admissions FAQ (TPS-05/GROW-21 foundation); public QA PR #3; run `44877217105`; private head `e048eb3093d7613e6c20a4a5eb705e00a7edfb16`.
  - Private PR #84 — TIER searchable group pathway help (TIER-05/GROW-21 foundation); public QA PR #4; run `44877238435`; private head `9d6164f22e346b1074af4d4ceaa6421fdc21054e`.
  - Private PR #85 — automated SEO acceptance gates (SEO-07/QA-08); public QA PR #5; run `44877258952`; private head `10c0ea3b2fcceef76074cc68c70b375dbca16600`.
  - These are draft candidates and must not merge until exact-source CI passes. No external AI, analytics, production settings, deployment, DNS or lead-provider changes were added.

- 2026-11-21: PR #81 was merged after the corrected candidate passed both TIER and TPS jobs in free CI run `44877036890`; private merge commit `3919585a60f4e7dd76b44c113582d755dc5aae46`. The initial failed run remains documented above for auditability.
- 2026-11-21: Master feature register updated in private commit `5fd1c0382b90c23a5362c95393728d96547db175`: TPS-05, TIER-05, SEO-07 and GROW-21 now reflect partial implementation and the remaining owner-input dependencies. PRs #80 and #81 are recorded as merged.

- 2026-11-21: Free CI runs for the three parallel lanes completed successfully on both TPS and TIER jobs:
  - Run `44877217105` validated PR #83 candidate; both jobs passed. Private PR #83 merged as `1d769fcbd3bd22472a4ec7720aaa2242d52d63db`.
  - Run `44877238435` validated PR #84 candidate; both jobs passed. Private PR #84 merged as `956cc0a44ec80e0fc1a068205af680a75b1ada1d`.
  - Run `44877258952` validated PR #85 candidate, including the new `npm run test:seo` step; both jobs passed. Private PR #85 merged as `a7e358d700f09d2f3dc181df6babb05d10129ba1`.
- 2026-11-21: Master feature register updated in private commit `4e01878f6fec1c1adcc9fce7f6ede6345b4883ec` to record PRs #83–85 merged and PR #86 in validation.
- 2026-11-21: Started PR #86 for consistent keyboard dismissal/focus restoration across both mobile navigation menus, with browser assertions for Escape handling, expanded state and focus return. Public QA PR #6 run `44877590782` was in progress on exact mirror head `b1569eb7581d5e87c180e50f585573d6b704e7ce`; do not merge private PR #86 until both jobs pass.

- 2026-11-21: PR #86 exact candidate passed both site jobs on public CI run `44877739699`, attempt 2. TIER job passed on first attempt; TPS's first attempt reported transient WebKit RSC access-control console errors after Chromium and Firefox passed. Re-running only the failed TPS job passed browser journeys, smoke tests and performance checks. Final run conclusion: success. Private PR #86 merged as `9573f8c0924aba0e8607615f9e609c15ae76daa2`.
- 2026-11-21: The successful PR #86 candidate included mobile-menu Escape dismissal/focus restoration and browser interaction coverage for both the TPS admissions FAQ and TIER group-help search/filter routes. Feature tracker updated in private commit `17bd833a02ab0a98b4eb07da2f93ddd85ad830e8`.

- 2026-11-21: GROW-22 candidate run `44878579964` completed successfully on both TPS and TIER jobs. The TPS job passed typecheck, security/forms/config/SEO tests, lint, build, browser journeys including English/Hindi toggle, smoke test and performance lab. The TIER job passed typecheck, lint, build, browser journeys including English/Hindi toggle, smoke test and performance lab. Private PR #87 merged as `3633b7be07a54b00871688533aa5dd4a56afea08`.
- 2026-11-21: Hindi content remains disabled by default. CI alone sets `NEXT_PUBLIC_HINDI_CONTENT_ENABLED=true` to test it. Private review checklist `docs/content/HINDI_LOCALIZATION_REVIEW.md` records that an authorised Tagore reviewer must approve all translations before the flag is enabled in staging/production. No external translation API, analytics or paid services were added.
- 2026-11-21: Master feature register updated in private commit `5495c2d2fc8d7ae33edcefc40a30392f30d9a11e` to record PR #87 merged while retaining human-review, QR and low-bandwidth acceptance gates.

## Audit record — snapshot 002

- Private canonical main commit: `c9423e490c5b5b2f033a75d9cc8905b5e8c3ff57`.
- Public mirror main commit: `bf8abe09eace140eb711d4eba4039b167b0dea9d`.
- Approved current source manifest: 66 files (the original 62-file manifest plus the four files below). The 66 approved path/blob entries were compared against the private main tree; all 66 matched exactly at verification time.
- New files added since snapshot 001:
  - `apps/tier/src/app/help/page.tsx`
  - `apps/tier/src/components/group-help-finder.tsx`
  - `src/components/admissions-faq-finder.tsx`
  - `tests/seo-acceptance.test.mjs`
- Thirteen changed approved files were re-fetched and screened for private-key headers, common GitHub token prefixes, AWS access-key IDs, Slack token prefixes and likely credential assignments. No pattern hits were found. This is a screening measure, not a guarantee.
- The refresh used one consolidated Git tree/commit on the public mirror. It did not copy private commit history, `docs/**`, README files, environment templates, operational records or credentials.
- Public snapshot CI run `44878876669` completed with overall conclusion **success**. Both TPS and TIER jobs passed every configured step, including typecheck, security/form/config/SEO checks (TPS), lint, production builds, browser journeys/accessibility, production smoke tests, performance labs and artifact uploads.
- The 14-day visual/performance artifacts for this run should be reviewed before expiry.

### Snapshot 002 candidate QA runs

The following draft public PRs are CI-only mirrors. Do not merge them. They are based on snapshot 002 and contain only the approved code/test changes from their matching private PRs:
- Private PR #88 (TPS-06) → public draft PR #8, head `aec358913dec55f9ce0419bf5e623e28107c802f`, run `44878965236`.
- Private PR #89 (TIER-07) → public draft PR #9, head `a6ab9556f94e8c3f55b9ed278669eab8eca27dd4`, run `44878968519`.
- Private PR #90 (GROW-22 QR gateways) → public draft PR #11, head `8fc83eb58b177940f857e702af0e99a1f57bb8ba`, run `44879096910`.
At the time of this ledger update, these three candidate runs were still in progress. Exact-head CI must succeed before merging the private implementation PRs. Private PR #91 is documentation-only and is not mirrored to the public repository.

- 2026-11-21: Public mirror main was refreshed from the private canonical source by approved sync commit `bf8abe09eace140eb711d4eba4039b167b0dea9d` (13 changed source/CI/test files; no private docs, credentials or history). Free CI run `44878876669` passed both TPS and TIER jobs on that snapshot.
- 2026-11-21: Two additional private feature lanes are being validated in parallel:
  - PR #88 TPS-06 grade-stage admissions guides: public QA PR #8, run `44878965236`; TPS job passed, TIER job was still in browser validation at ledger update.
  - PR #89 TIER-07 institution comparison: public QA PR #9, run `44878968519`; TIER job passed, TPS job was completing performance validation at ledger update.
- 2026-11-21: GROW-22 QR landing page PR #90 has a current-snapshot public QA mirror PR #12, run `44879183407`. An earlier mirror PR #10 was closed as superseded before merge; PR #12 is the active exact-source candidate.

- 2026-11-21: Private PR #89 TIER institution comparison passed both jobs in public free CI run `44878968519`. Verified that all three changed file blobs matched exactly between the private PR head and public QA branch. Private PR #89 merged as `5ddddc45eb634c4c01db25d4fb0335049f1576f4`. Feature tracker updated in private commit `da90bf3395c1a7ba54348e5f77cf8f209f326efb`.

- 2026-11-21: Private PR #88 TPS grade-stage admissions guides passed both TPS and TIER jobs in public free CI run `44878965236`. All four changed file blobs matched exactly between private PR head and public QA branch. Private PR #88 merged as `c00b812a667d9ae85b3ddc269aafa0c042260cd4`. Feature tracker updated in private commit `d816ed92c8e3ca6ae11ddb87c7b27c3cc7269f73`.

- 2026-11-21: After private PRs #88 and #89 merged, refreshed the public mirror main in a single commit `1253ba711b9637c19625f9dd829bac63cb2cfc47` with seven approved files (TPS grade-stage routes/admissions/sitemap, TIER comparison CSS/component, browser journeys). This commit was created from the private main file blobs; no private docs or credentials were copied. Its free CI run `44879622946` was in progress at ledger update; an earlier superseded run `44879613851` was cancelled by the newer snapshot update.
- 2026-11-21: QR landing candidate PR #90 passed both free CI site jobs in run `44879183407`, with exact matching blob SHAs for both new pages and browser tests. It was superseded/closed because its private branch had a tracker conflict after other feature merges. Rebased private PR #92 carries the same code plus current-main browser tests and a corrected tracker reference. Public QA PR #14 is the active candidate against the refreshed snapshot; awaiting its run trigger/result.
- 2026-11-21: Private tracker records PR #92 in progress; prior PR #90 is closed and must not be merged.

- 2026-11-21: QR landing candidate PR #93 (rebased after PR #88/#89) passed both free CI jobs in public run `44879648552`. Verified exact blob equality for TPS start page, TIER start page and browser journeys between private candidate and public QA PR #13. PR #93 was closed only because the private main moved during ledger/tracker updates; the same source files were carried forward to PR #94, whose branch is based on the latest private main. Public QA PR #13 was closed as superseded. No code was merged from PR #93.
- 2026-11-21: Final active private candidate is PR #94, head `828de2c79d70de361679c9a1afb66fa82245d93e`; its three public-tested source blobs exactly match QA run `44879648552`. PR #94 is open and ready for merge after base/mergeability refresh. Private tracker now references PR #94.
- 2026-11-21: Public main refresh commit `1253ba711b9637c19625f9dd829bac63cb2cfc47` triggered run `44879622946`; TIER passed but TPS browser journeys reported the same WebKit RSC access-control console noise previously observed in PR #86. Only the failed TPS job was re-run (attempt 2); outcome pending at ledger update. Do not treat this as a source-code test failure until the retry is inspected.

- 2026-11-21: Final private PR #94 merged as `3943bb7c447883a6eb05b7db4eeaeac0ea7c160a`. Its TPS/TIER start pages and browser journey blobs exactly matched public QA PR #13/run `44879648552`; both site jobs passed. PR #93 and PR #92 were superseded/closed; no duplicate code was merged. Tracker updated in private commit `fd3fb7df0e63d17ed21910e5598fc95b74a3ac65`.
- 2026-11-21: Refreshed public mirror main snapshot `1253ba711b9637c19625f9dd829bac63cb2cfc47` ultimately passed both jobs in run `44879622946` attempt 2. The first TPS attempt had transient WebKit RSC access-control console errors; rerunning only the failed job passed. Final run conclusion: success.

- 2026-11-21: PR #96 SEO route-coverage tests were consolidated into concurrent PR #95 (SEO-08 BreadcrumbList schema) to avoid two branches modifying `tests/seo-acceptance.test.mjs`. PR #96 and public QA PR #17 were closed as superseded; no code was merged from them. Combined private PR #95 now contains the expanded TPS/TIER canonical metadata and QR noindex/sitemap assertions in addition to breadcrumb schema tests. Its updated public QA run is `44880391196` (pending); earlier run `44880245377` is superseded by the latest head.
- 2026-11-21: Tracker updated in private commit `4cb6f1e169a55c3afbe5c39b2f5b038b468dcc07b` to record combined SEO validation in PR #95.

- 2026-11-21: Combined SEO PR #95 passed both TPS and TIER jobs in free CI run `44880391196`. Verified exact blob equality for all eight changed files between private PR head and public QA branch. Private PR #95 merged as `e06a9ec28a5f182d5660eac473a680a6a8c11ec6`, adding safe BreadcrumbList JSON-LD and expanded metadata/sitemap/noindex route tests. Tracker update is recorded in private main commit `77f124770d0f4b88539b5df4924772f12189792b`.
- 2026-11-21: QA-08 expanded runtime smoke coverage is under private PR #97. Public QA run `44880580572` has TIER job passed and TPS performance validation underway; the changed runtime-smoke source was mirrored from the public QA branch into the private candidate. Do not merge PR #97 until the full two-site run passes.

- 2026-11-21: QA-08 expanded production smoke PR #97 passed both TPS and TIER jobs in public free CI run `44880580572`. Verified exact runtime-smoke file blob equality between private PR branch and public QA branch. Private PR #97 merged as `51e601215c151a2a76e740269b7d21037635fd51`. Tracker updated in private commit `d46320e069969228be8c834d991056a5a32eff60`.
- 2026-11-21: The refreshed public main snapshot `26a0e409890a660cdbd3cda2911c456438c02253` passed both jobs in run `44880286436` attempt 2. The first TPS browser attempt showed the recurring WebKit local RSC access-control console noise; the isolated retry passed. Final run conclusion: success.

- 2026-11-21: The combined QA-05/CRO-03 work was consolidated into private PR #101. Its first exact-source CI run exposed a genuine semantic issue: each QR route rendered a nested `<main>` inside the root layout's `<main>`. The fix removed the redundant page-level main wrappers and strengthened the browser check to require exactly one main landmark; it did not weaken the selector.
- 2026-11-21: Private PR #101 passed both TPS and TIER jobs in public free CI run `44881350446`. Verified exact blob equality for both QR page files and `tests/browser-journeys.mjs` between private PR head and public QA branch. The run covered iPhone 13 Safari and Pixel 5 Chrome emulation across routes, touch navigation, horizontal overflow and simulated 400kbps / 400ms slow-3G rendering. Private PR #101 merged as `3ce50f88295433710d0f8da6e48b86b431abfb66`.
- 2026-11-21: Private PR #99 and #100, and their earlier public QA mirrors #19/#20, were closed as superseded by PR #101. The earlier run `44881307502` belongs to the superseded candidate and is not an acceptance result for the merged code.
- 2026-11-21: Private PR #98 duplicated the runtime-smoke file already merged in PR #97; its `tests/runtime-smoke.mjs` blob was identical. It was merged without adding a code delta; PR #97 remains the original QA-08 acceptance record.
- 2026-11-21: Private PR #102 merged documentation-only ADR-002 after evaluating Decap CMS, TinaCMS, Payload and Strapi. Decision: retain Git-managed static content for the current phase; no CMS service, database, editor accounts or paid dependency was introduced.
