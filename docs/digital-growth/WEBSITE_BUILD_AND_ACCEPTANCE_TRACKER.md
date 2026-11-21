# Tagore Group website master feature register and delivery plan
Updated: 2026-11-21 (SEO discoverability, conversion-guide links, content/media governance and release controls)
Status key: [x] implemented in Git; [~] in progress / specification only; [ ] not yet implemented; [!] blocked on owner input or external dependency.

This is the canonical scope register for both public websites. Every implementation pull request must reference a workstream ID below and update this file when acceptance status changes. A checked item means code or an approved specification exists; it does not mean production deployment or owner acceptance unless explicitly stated.

## 1. Programme boundaries and architecture

- [x] **ARCH-01** TPS standalone Next.js App Router + TypeScript application at repository root.
- [x] **ARCH-02** TIER standalone Next.js application in `apps/tier`, independently buildable/deployable.
- [x] **ARCH-03** Separate domain, sitemap, canonical URLs and SEO identity for TPS and TIER.
- [x] **ARCH-04** Separate CI quality jobs for both applications.
- [ ] **ARCH-05** Decide whether to retain monorepo or extract TIER to its own repository; preserve deploy independence meanwhile.
- [~] **ARCH-06** Production deployment, staging isolation, rollback and release runbook documented; actual hosting environments, ownership and release approval remain unconfigured.
- [~] **ARCH-07** Initial environment-variable and secret-handling inventory documented; hosting secret ownership, access controls and rotation procedures remain to be configured.
- [ ] **ARCH-08** Create architecture decision records for major choices; avoid unnecessary paid services and vendor lock-in.

## 2. Public experience and admissions conversion

### TPS — Tagore Public School
- [x] **TPS-01** Parent-first homepage foundation and primary admissions journey.
- [x] **TPS-02** About, admissions and campus visit page foundations.
- [x] **TPS-03** Parent Decision Centre at `/parent-guide` with contextual class/topic selection.
- [x] **TPS-04** Admissions enquiry form and campus visit request UI.
- [~] **TPS-05** Parent decision journey is in progress: searchable admissions FAQ foundation is under PR #83; full academics, student development, safety, transport, residential, fee/process and verified-proof content still needs approved evidence.
- [ ] **TPS-06** Conversion-focused class/grade landing pages with unique useful content and clear next steps.
- [~] **TPS-07** Campus visit request UI captures preferred date/time and contact consent; staff confirmation, calendar ownership and follow-up workflow remain pending (request-only; see `CAMPUS_VISIT_CONVERSION_OPERATING_SPEC.md`).
- [~] **TPS-08** Accessible mobile sticky admissions-enquiry and campus-visit actions implemented; call/WhatsApp actions and approved event hooks remain pending.
- [ ] **TPS-09** Trust centre: approved affiliations, mandatory disclosures, policies, leadership, dated outcomes and authentic evidence.
- [~] **TPS-10** Admissions FAQ page implemented; eligibility, academic-year availability and process content still require management approval.
- [~] **TPS-11** Clear success and error states implemented for admissions and campus-visit forms; end-to-end provider delivery and final staff follow-up workflow remain pending.

### TIER — Tagore Group
- [x] **TIER-01** Group identity homepage foundation.
- [x] **TIER-02** Group story/about page foundation.
- [x] **TIER-03** Institution directory and institution profile route foundations.
- [x] **TIER-04** Group contact/enquiry UI.
- [~] **TIER-05** Institution portfolio foundations and a searchable group pathway-help page are in progress (PR #84); consistent verified profiles, full facts and operational audience routing remain pending.
- [ ] **TIER-06** Dedicated group story, leadership/governance and impact pages using approved evidence.
- [~] **TIER-07** Searchable/filterable institution directory implemented; pathway comparison and verified routing remain in progress.
- [~] **TIER-08** Group-level contact, partnership, career and general enquiry pathways implemented; recipient verification and operational routing remain pending.
- [~] **TIER-09** TPS and TIER mobile navigation now share keyboard dismissal, `aria-controls` and focus restoration behavior (PR #86); broader design-system and responsive-navigation consistency remains pending.

### Shared conversion standards
- [ ] **CRO-01** Define primary and secondary conversion actions for each page and audience.
- [~] **CRO-02** Consent-based forms and accessible success/error feedback implemented; privacy notice, retention details and full legal review remain pending.
- [~] **CRO-03** Playwright checks 390px and 320 CSS px reflow on key routes in Chromium, Firefox and WebKit; real Android/iOS/tablet devices and low-bandwidth conditions remain pending.
- [ ] **CRO-04** Add real, approved parent/student stories only with documented consent.
- [ ] **CRO-05** Create content-led experiments with hypotheses and measurable outcomes; no unapproved tracking pixels.

## 3. Brand, content and media governance

- [ ] **BRAND-01** Add exact approved Tagore Group and TPS logo files; never redraw, recolor, distort or substitute.
- [ ] **BRAND-02** Record official brand colors, typography, spacing, logo clear-space and usage rules.
- [ ] **MEDIA-01** Create optimized authentic campus/classroom/lab/library/sports/hostel/faculty/event media library.
- [ ] **MEDIA-02** Record image/video owner, date, location, permission/consent and allowed usage for every identifiable person.
- [ ] **MEDIA-03** Generate responsive AVIF/WebP variants, dimensions, alt text and focal-point metadata.
- [ ] **CONTENT-01** Verify institution names, board/affiliation, address, contact, phone routing and email ownership.
- [ ] **CONTENT-02** Verify classes offered, admissions open, age criteria, academic year, fee/transport/hostel details.
- [ ] **CONTENT-03** Verify leadership/staff credentials, facilities, safety policies, results, awards and all numerical claims.
- [ ] **CONTENT-04** Publish prospectus and mandatory disclosures only from current approved source documents.
- [ ] **CONTENT-05** Establish content owner, evidence source, last-reviewed date and next-review date for factual claims.
- [ ] **CONTENT-06** Add privacy notice, consent language, data-retention period, grievance contact and child-safety review.
- [ ] **CONTENT-07** No fabricated testimonials, rankings, student outcomes, statistics, facilities or stock images represented as Tagore property.
- [ ] **CONTENT-08** Hindi/English content strategy and translation review where it improves parent comprehension and local reach.

## 4. Enquiry, lead operations and ERP integration

- [x] **LEAD-01** Server-side TPS and TIER enquiry API endpoints.
- [x] **LEAD-02** Strict origin checks, streaming request-size limits, server-side validation and field allowlists.
- [x] **LEAD-03** Honeypot and form-timing bot checks; provider timeout and generic failure handling.
- [x] **LEAD-04** Security API tests for origin, malformed/oversized body, honeypot, timing, allowlists, provider missing/failure and valid provider success.
- [x] **LEAD-05** Additional invalid-email and provider-declared-failure negative-path tests.
- [~] **LEAD-06** Proposed versioned website-to-ERP lead contract drafted; ERP route, authentication, schema and sandbox remain unconfirmed.
- [ ] **LEAD-07** Approve final lead schema, contact consent wording/version, academic year and source/campaign attribution.
- [ ] **LEAD-08** Implement authenticated server-to-server ERP API adapter; website must never access ERP database directly.
- [ ] **LEAD-09** Idempotency, duplicate detection, safe retry/outbox, dead-letter handling and operator alerting.
- [ ] **LEAD-10** Lead assignment, response SLA, reminders, call notes, campus visit scheduling and conversion status in ERP.
- [ ] **LEAD-11** Separate routing rules for TPS admissions, TIER institution enquiries, partnerships and careers.
- [ ] **LEAD-12** Verify delivery end-to-end with authorized test inbox/ERP sandbox before accepting real leads.
- [ ] **LEAD-13** Add operational dashboard for delivery success/failure, queue age and response-time SLA without exposing personal data.
- [ ] **LEAD-14** Confirm privacy notice, retention, consent capture and deletion/request process before production collection.

## 5. SEO, discoverability and migration

- [x] **SEO-01** Page-level canonical URLs for TPS and TIER.
- [x] **SEO-02** Stable sitemaps with canonical pages and institution profiles.
- [x] **SEO-03** robots.txt foundations and social metadata.
- [x] **SEO-04** Initial structured data implementation.
- [~] **SEO-05** Legacy URL migration workbook and mapping rules documented; actual URL audit is blocked on legacy exports.
- [ ] **SEO-06** Implement tested permanent redirects; preserve query parameters only where required and avoid redirect chains/loops.
- [~] **SEO-07** Automated metadata, canonical, JSON-LD escaping, indexing-gate, sitemap-host and noindex-route checks are under PR #85; full route/content/link/alt-text and live indexability audit remains pending.
- [ ] **SEO-08** Expand schema only where facts are verified (Organization, School/EducationalOrganization, Course/Event where eligible, BreadcrumbList).
- [ ] **SEO-09** Local SEO: accurate NAP, map/location details, service area and official profile links.
- [ ] **SEO-10** Separate Google Search Console properties and sitemap submission for both domains after owner authorization.
- [ ] **SEO-11** Measure search visibility and qualified enquiries; no ranking guarantees or doorway pages.
- [ ] **SEO-12** AI/search answer readiness through clear entity facts, authoritative disclosures, useful FAQs and consistent public identity.

## 6. Security, privacy and resilience

- [x] **SEC-01** Security policy and dependency update configuration.
- [x] **SEC-02** GitHub Actions CI, CodeQL, dependency audits and incoming-commit secret scanning.
- [x] **SEC-03** Security response headers and CSP Report-Only baseline.
- [x] **SEC-04** Server-only form provider secret; no client-exposed access key.
- [x] **SEC-05** Input validation, origin validation, request-size controls and provider timeout.
- [ ] **SEC-06** Review CSP reports, resolve violations and move to enforced CSP with nonce/hash strategy where appropriate.
- [ ] **SEC-07** Configure edge/WAF rate limiting and bot controls after deployment topology and DNS ownership are confirmed.
- [ ] **SEC-08** Add durable distributed rate limiting; do not rely on in-memory counters in serverless/multi-instance production.
- [x] **SEC-09** Security/privacy threat model documented; implementation of the listed release gates remains tracked separately.
- [ ] **SEC-10** Add admin/CMS authentication, MFA, least privilege, audit logs and secure recovery if a CMS is approved.
- [~] **SEC-11** Automated Playwright + axe-core accessibility/journey checks run in CI for both sites across Chromium/Firefox/WebKit; broader accessibility coverage and periodic dependency/license review remain pending.
- [ ] **SEC-12** Document incident response, secret rotation, backup/restore and rollback drills.
- [ ] **SEC-13** Verify security headers, TLS, cookies, cache controls and public endpoints on staging before production.
- [ ] **SEC-14** No public admin surface, secrets in client bundles, PII in analytics, or child/student tracking.

## 7. Performance, accessibility and quality

- [~] **QA-01** Repeatable synthetic production-build baselines measured for all key TPS/TIER routes at 390px mobile and 1440px desktop using a fresh Playwright browser context per route, with service workers blocked and non-zero resource-transfer assertions (PR #48, corrected by PR #50; 14-day CI artifacts). Latest PR #50 artifacts: TPS 8 route/viewport samples, 117,908–141,936 transferred bytes, 110,757–116,581 JS bytes; TIER 6 samples, 126,197–138,243 transferred bytes, 112,930 JS bytes. Observed lab LCP 64–204ms and CLS 0–0.0313 in this CI run; these unusually fast synthetic local-runner observations are not user-experience guarantees or field data. Field p75 Core Web Vitals, INP, Lighthouse scores and real-device/staging validation remain pending.
- [~] **QA-02** TIER no longer depends on runtime Google Fonts CSS or build-time remote font fetching; CSS system font stacks provide a resilient local fallback (PR #64). Bundled self-hosted brand font files are not included; TPS font/image optimization, bundle analysis, caching and broader route-loading work remain pending.
- [~] **QA-03** Playwright + axe-core WCAG 2.2 A/AA scans run on key TPS/TIER routes in Chromium, Firefox and WebKit; serious/critical findings fail CI and minor/moderate findings are reported. Full manual WCAG 2.2 AA verification remains pending.
- [~] **QA-04** CI HTTP smoke tests plus Playwright Chromium/Firefox/WebKit journeys cover TPS parent-guide class/topic selection, admissions funnel enquiry/visit CTAs, admissions/visit required-field validation, TIER institution search/filter/clear and segmented group-enquiry prefill, mobile reflow, keyboard focus, browser runtime errors, key internal links, metadata and JSON-LD. PR #56 exposed and PR #57 fixes low-contrast TPS funnel step markers. Provider-backed submit/delivery and complete user journeys remain pending.
- [ ] **QA-05** Test current Chrome, Edge, Firefox, Safari/iOS and Android browsers at common screen sizes.
- [~] **QA-06** Browser tests verify initial keyboard focus, Escape-to-close mobile navigation with focus restoration, FAQ/help search interactions, native required-field validation and reduced-motion preference across Chromium/Firefox/WebKit; screen-reader passes, 200% zoom, slow network, provider failure/success, duplicate submission and refresh/back navigation remain pending.
- [~] **QA-07** CI captures full-page 390px mobile and 1440px desktop screenshots for all key TPS/TIER routes as 14-day artifacts; baseline pixel-diff regression and manual visual sign-off remain pending.
- [~] **QA-08** Production HTTP smoke tests verify journey links, same-origin links, robots, sitemap host separation, unknown-route 404, page metadata and JSON-LD; Playwright adds interactive journey checks on key routes across Chromium/Firefox/WebKit. Complete metadata/canonical, redirect, 500 and site-wide broken-link audits remain pending.
- [ ] **QA-09** Production acceptance report with screenshots, test evidence, open risks and owner sign-off.

## 8. Content operations / CMS

- [ ] **CMS-01** Evaluate low-cost/self-hostable CMS options against security, ease of use, preview, roles and maintenance.
- [ ] **CMS-02** Select CMS only if staff need frequent content changes; static Git-managed content remains acceptable initially.
- [ ] **CMS-03** Define roles: Owner, Content Editor, Reviewer; enforce approval before public publish.
- [ ] **CMS-04** Structured content models for institution, programme, faculty, news/event, FAQ, disclosure and media.
- [ ] **CMS-05** Draft/preview/schedule/publish, version history, rollback and audit trail.
- [ ] **CMS-06** Secure media uploads with file-type/size checks, malware scanning strategy and private originals.
- [ ] **CMS-07** Content review reminders and stale-fact expiry controls.

## 9. Analytics and growth operations

- [x] **GROW-01** Privacy-first analytics and admissions attribution specification; implementation is not enabled.
- [ ] **GROW-02** Approve provider, property IDs, privacy notice, consent model and retention before adding analytics.
- [ ] **GROW-03** Implement no-PII event taxonomy and consent-aware measurement for CTA, form, visit and institution discovery.
- [ ] **GROW-04** Separate TPS and TIER analytics/Search Console properties; no cross-domain identity stitching by default.
- [ ] **GROW-05** Store approved first/last-touch campaign attribution in ERP lead records; never put personal data in URLs/UTMs.
- [ ] **GROW-06** Report qualified enquiries, visits requested/confirmed/attended, applications, offers and enrolments from ERP outcomes.
- [ ] **GROW-07** Define lead-response and campus-visit operational SLAs with accountable staff.
- [ ] **GROW-08** Establish monthly content/SEO/CRO review based on verified performance data.
- [~] **GROW-09** TPS admissions campaign funnel: focused landing page and parent guide link implemented; class/grade pathways, verified proof, operational callback/visit conversion and final acceptance remain pending.
- [~] **GROW-10** TIER segmented group funnel: parent/student, institution partnership, careers and general pathways implemented; verified team routing, delivery and final acceptance remain pending.
- [~] **GROW-11** Parent admission checklist, campus-visit guide and hostel family guide implemented; approved prospectus and event registration remain pending.
- [~] **GROW-12** Preferred-slot request UI and operating specification drafted; staff confirmation, reminders, reschedule path and attendance outcome remain unimplemented (`CAMPUS_VISIT_CONVERSION_OPERATING_SPEC.md`).
- [ ] **GROW-13** Callback/contact choice: channel-specific consent for phone/WhatsApp/email, verified contact hours and operational ownership.
- [~] **GROW-14** Ethical referral and QR acquisition playbook drafted; live referral capture, QR distribution and any incentive remain unapproved (`REFERRAL_QR_CAMPAIGN_PLAYBOOK.md`).
- [~] **GROW-15** Trust/proof governance established: institution fact verification register and media rights/asset register merged (PR #75); actual evidence collection, approvals and public trust modules remain pending.
- [ ] **GROW-16** Local discovery: verified NAP, useful local-intent pages, map/directions, institution SEO and authorised business profiles.
- [~] **GROW-17** Privacy-safe UTM convention, first/last-touch semantics and reporting contract drafted; analytics, ERP persistence and outcome reconciliation remain disabled (`CAMPAIGN_ATTRIBUTION_DATA_CONTRACT.md`).
- [ ] **GROW-18** Ethical enquiry recovery/remarketing: explicit opt-in, suppression and opt-out; no covert abandoned-form identification or unsolicited messaging.
- [~] **GROW-19** Lead routing, owner/backup model, SLA metrics and dashboard specification drafted; accountable staff assignments, automation and ERP dashboard remain pending (`LEAD_ROUTING_RESPONSE_SLA_SPEC.md`).
- [ ] **GROW-20** Conversion optimisation: hypothesis-led A/B testing with approved analytics, guardrails, accessibility and rollback.
- [~] **GROW-21** Deterministic, searchable, source-grounded FAQ/pathway finders are under PRs #83–84; an advanced assistant, approved knowledge corpus, human handoff and privacy review remain pending.
- [~] **GROW-22** TPS and TIER Hindi FAQ/help translations and language selectors are drafted behind an opt-in feature flag (PR #87); authorised human translation review, production enablement, QR acquisition and low-bandwidth campaign acceptance remain pending.

Detailed scope, acceptance criteria, safeguards, channel playbook and phased rollout: `docs/digital-growth/TAGORE_GROWTH_FUNNELS_AND_ACQUISITION_SPEC.md`.

## 10. Deployment, operations and launch

- [ ] **OPS-01** Configure independent preview/staging deployments for TPS and TIER.
- [ ] **OPS-02** Verify environment variables and secrets separately per application/environment.
- [ ] **OPS-03** Add uptime/availability and form-delivery monitoring with privacy-safe alerts.
- [~] **OPS-04** Website release/rollback runbook documented (PR #76); actual host-specific backup, restore, deployment and rollback mechanisms remain pending.
- [~] **OPS-05** Pre-launch release gates and evidence checklist documented (PR #76); staging execution, provider-backed enquiry acceptance and owner sign-off remain pending.
- [ ] **OPS-06** Obtain owner approval for final content, analytics, provider integrations and deployment.
- [ ] **OPS-07** DNS/domain cutover only after explicit owner approval; retain old site and rollback path.
- [ ] **OPS-08** Post-launch smoke test, Search Console checks, lead-delivery monitoring and 30-day stabilization.

## 11. Parallel delivery lanes

Work can run concurrently when each lane owns separate paths and interfaces. Do not have parallel branches editing the same files. Every lane must open a focused PR, pass both app CI where relevant, CodeQL, dependency audit and secret scan, and update this register after merge.

| Lane | Workstream | Initial scope | Primary ownership boundary | Dependency |
|---|---|---|---|---|
| A | TPS conversion experience | Parent Decision Centre completion, class landing pages, visit journey and mobile CTA | `src/app/**`, TPS-only components | Approved factual content for final publication |
| B | TIER group experience | Institution profile schema/content UX, group discovery and enquiry pathways | `apps/tier/src/app/**`, TIER-only components | Verified institution facts |
| C | Lead operations | Form delivery contract, consent, idempotency, ERP adapter/outbox design and tests | `src/app/api/**`, `apps/tier/src/app/api/**`, integration docs/tests; coordinate shared test paths | ERP API contract, provider key, consent approval |
| D | SEO and migration | Legacy URL inventory, redirect map, schema audit, metadata and local discovery | SEO docs, redirects/config, metadata files; coordinate sitemap files | Legacy URL exports and verified NAP |
| E | Security/platform | CSP report review, threat model, edge controls, deployment security checklist | `.github/**`, `SECURITY.md`, security docs and isolated config PRs | Hosting/DNS topology for edge enforcement |
| F | Performance/accessibility | Core Web Vitals baseline, WCAG audit, browser journeys and visual QA | QA docs/tests and isolated component fixes agreed with A/B | Preview URLs for browser testing |
| G | Brand/content/CMS | Brand/media governance, content models and CMS decision | `docs/content/**`, CMS docs; no unapproved public factual claims | Approved logos/media and staff workflow input |
| H | Analytics/growth | Consent-ready analytics implementation plan, CRM attribution and SLA dashboards | `docs/analytics/**`, isolated instrumentation only after approval | Provider IDs, privacy approval, ERP attribution fields |

### Parallel execution rules
1. Start independent research/specification and code work in parallel; do not wait for one lane if its interface can be documented.
2. Keep one branch per lane/feature, not one branch per person or one giant integration branch.
3. Establish API/schema contracts before dependent UI and integration work diverge.
4. Avoid simultaneous edits to shared files (layout, global CSS, package manifests, sitemap, shared form components). Assign a single integration owner or sequence those changes.
5. PRs must be small enough to review, linked to lane IDs, and state changed paths, tests, risks and blocked inputs.
6. Merge only after all required checks pass and branch is mergeable. Rebase/update stale branches before merging.
7. Re-run affected tests after merge; never claim a feature is production-ready merely because code merged.
8. Never introduce paid agents/services without approval; prefer GitHub Actions and free/self-hostable options.
9. No live website, production data, DNS, tracking pixel or public lead collection changes without explicit approval.

## 12. Current external inputs / blockers

- [!] **INPUT-01** Exact approved TPS and Tagore Group logo files and brand guide.
- [!] **INPUT-02** Authentic campus/faculty/event media and publication permissions.
- [!] **INPUT-03** Verified institution list, contact routing, official phone/email owners and current admissions facts.
- [!] **INPUT-04** Current prospectus, mandatory disclosures, policies, fee/transport/hostel details and approved claims.
- [!] **INPUT-05** Full cPanel backups and SQL exports for both legacy websites, plus sitemaps, redirects and URL exports (for migration intelligence only; no old-code dependency).
- [!] **INPUT-06** Web3Forms access key or approved alternative provider credentials, stored only as deployment secret.
- [!] **INPUT-07** ERP admissions API sandbox/base URL, auth method, schema, idempotency and ownership/SLA.
- [!] **INPUT-08** Privacy/legal approval for consent, retention, analytics and child-safety requirements.
- [!] **INPUT-09** Hosting account access through authorized invitation or deployment ownership; never share passwords/OTPs in GitHub issues.
- [!] **INPUT-10** Explicit approval for staging/production deployment and eventual DNS cutover.

## 13. Definition of done

A workstream is complete only when:
- Its acceptance criteria and evidence are recorded in the PR.
- Relevant unit/security tests and both app builds pass where applicable.
- Accessibility, mobile, SEO, privacy and security impacts are reviewed.
- Content claims are verified and media rights are documented.
- Failure states and operational ownership are defined.
- Documentation and this register are updated.
- Production readiness is separately marked and owner-approved; merge alone is not launch approval.

## 14. Existing foundations and references

- `docs/content-verification.md` — verified baseline and owner approval checklist.
- `docs/erp-admissions-integration.md` — draft website-to-ERP contract; no live integration exists yet.
- `docs/digital-growth/ANALYTICS_AND_ADMISSIONS_ATTRIBUTION_SPEC.md` — privacy-first analytics specification; no analytics tags are enabled.
- `SECURITY.md` — vulnerability reporting and security practices.
- GitHub Actions: CI, CodeQL, dependency audit and secret scan.

## 15. Current release status

- [x] PR #22 Parent Decision Centre and contextual enquiry topic selection merged.
- [x] PR #23 page-level canonical URLs and stable sitemap merged.
- [x] PR #24 privacy-first analytics and attribution specification merged (specification only).
- [x] PR #25 expanded negative-path enquiry API tests merged.
- [x] PR #50 isolated every performance route/viewport in a fresh browser context and enforced non-zero transfer measurements; both TPS and TIER reports plus visual QA artifacts uploaded successfully (14-day retention).
- [x] Master feature register reviewed and merged.
- [x] Parallel workstream PRs created and underway.
- [x] PR #73 sitemap discoverability for indexable parent/TIER pathway guides merged; noindex campaign/support pages remain excluded.
- [x] PR #74 added contextual conversion-guide links to TPS admissions funnel and TIER navigation.
- [x] PR #75 institution fact verification and media rights/asset governance registers merged.
- [x] PR #76 production release and rollback runbook merged.
- [x] PR #80 TPS parent decision-centre accessibility improvements merged after exact-source free CI passed.
- [x] PR #81 TIER directory filter accessibility improvements merged after the duplicate empty-state reset control was corrected and exact-source free CI passed.
- [x] PR #83 TPS searchable admissions FAQ, PR #84 TIER searchable pathway help, and PR #85 automated SEO acceptance gates merged after both site jobs passed in free CI.
- [x] PR #86 consistent keyboard dismissal/focus restoration for TPS and TIER mobile navigation merged after exact-source free CI passed both site jobs.
- [ ] Reconcile institution facts, media permissions and approvals from authorised source documents before publishing claims/assets.
- [ ] Complete hosting-specific staging/production inventory and test the release/rollback runbook with the hosting owner.
- [ ] Staging and owner acceptance.
- [ ] Production launch approval.
