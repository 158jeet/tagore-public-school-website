# Tagore Group website master feature register and delivery plan
Updated: 2026-11-21 (SEO discoverability, conversion-guide links, content/media governance and release controls)
Status key: [x] implemented in Git; [~] in progress / specification only; [ ] not yet implemented; [!] blocked on owner input or external dependency.

This is the canonical scope register for both public websites. Every implementation pull request must reference a workstream ID below and update this file when acceptance status changes. A checked item means code or an approved specification exists; it does not mean production deployment or owner acceptance unless explicitly stated.

## 1. Programme boundaries and architecture

- [x] **ARCH-01** TPS standalone Next.js App Router + TypeScript application at repository root.
- [x] **ARCH-02** TIER standalone Next.js application in `apps/tier`, independently buildable/deployable.
- [x] **ARCH-03** Separate domain, sitemap, canonical URLs and SEO identity for TPS and TIER.
- [x] **ARCH-04** Separate CI quality jobs for both applications.
- [x] **ARCH-05** Retain the monorepo for the current phase while keeping TPS and TIER independently buildable/deployable; revisit triggers are recorded in `docs/architecture/ADR-001-monorepo.md`.
- [~] **ARCH-06** Production deployment, staging isolation, rollback and release runbook documented; actual hosting environments, ownership and release approval remain unconfigured.
- [~] **ARCH-07** Initial environment-variable and secret-handling inventory documented; hosting secret ownership, access controls and rotation procedures remain to be configured.
- [x] **ARCH-08** Initial architecture decision record created for the monorepo boundary and revisit triggers (`docs/architecture/ADR-001-monorepo.md`).

## 2. Public experience and admissions conversion

### TPS — Tagore Public School
- [x] **TPS-01** Parent-first homepage foundation and primary admissions journey.
- [x] **TPS-02** About, admissions and campus visit page foundations.
- [x] **TPS-03** Parent Decision Centre at `/parent-guide` with contextual class/topic selection.
- [x] **TPS-04** Admissions enquiry form and campus visit request UI.
- [~] **TPS-05** Searchable admissions FAQ foundation implemented (PR #83 merged); full academics, student development, safety, transport, residential, fee/process and verified-proof content still needs approved evidence.
- [~] **TPS-06** Grade-stage admissions guidance pages with parent discussion prompts and class-prefilled next steps are implemented (PR #88 merged); verification of institution-specific details and full conversion acceptance remain pending.
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
- [~] **TIER-05** Institution portfolio foundations and searchable group pathway-help page implemented (PR #84 merged); consistent verified profiles, full facts and operational audience routing remain pending.
- [ ] **TIER-06** Dedicated group story, leadership/governance and impact pages using approved evidence.
- [~] **TIER-07** Searchable/filterable directory and side-by-side comparison for up to three institutions are implemented (PR #89 merged); verified operational routing remains pending.
- [~] **TIER-08** Group-level contact, partnership, career and general enquiry pathways implemented; recipient verification and operational routing remain pending.
- [~] **TIER-09** TPS and TIER mobile navigation now share keyboard dismissal, `aria-controls` and focus restoration behavior (PR #86); broader design-system and responsive-navigation consistency remains pending.

### Shared conversion standards
- [x] **CRO-01** Primary and secondary conversion actions are defined across key TPS/TIER pages in `docs/digital-growth/PAGE_CTA_HIERARCHY.md`; measurement remains disabled pending privacy approval.
- [~] **CRO-02** Consent-based forms and accessible success/error feedback implemented; privacy notice, retention details and full legal review remain pending.
- [~] **CRO-03** Playwright checks 390px and 320 CSS px reflow on key routes in Chromium, Firefox and WebKit; simulated 400kbps / 400ms slow-3G checks now cover both text-first QR landing pages (PR #101). Real-world network measurements and physical-device checks remain pending.
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
- [~] **SEO-07** Automated metadata, canonical, JSON-LD escaping, indexing-gate, sitemap-host and noindex-route checks implemented (PR #85); route acceptance covers grade-stage, help and QR pages (PR #95), and dynamic canonical metadata is now checked for all five TPS stage pages and five TIER institution profiles (PR #105). Full content/link/alt-text and live indexability audit remains pending.
- [x] **SEO-08** Safe BreadcrumbList JSON-LD added to TPS grade-stage pathways and TIER institution/pathway pages (PR #95); no new unverified organization, school, course or event facts added.
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
- [~] **QA-05** iPhone 13 Safari and Pixel 5 Chrome device emulation now covers all current TPS/TIER routes, touch navigation and overflow (PR #101); Edge and physical iOS/Android/tablet certification remain pending.
- [~] **QA-06** Browser tests now cover every current public TPS route (including all five grade-stage pathways) and TIER route (including all five institution profiles) across Chromium/Firefox/WebKit, with 390px/320px reflow, axe WCAG 2.2 A/AA serious/critical gates, keyboard navigation, reduced motion and form journeys (PR #104). Screen-reader passes, 200% zoom, provider failure/success, duplicate submission and refresh/back navigation remain pending.
- [~] **QA-07** CI captures full-page 390px mobile and 1440px desktop screenshots for all key TPS/TIER routes as 14-day artifacts; baseline pixel-diff regression and manual visual sign-off remain pending.
- [~] **QA-08** Expanded production HTTP smoke matrix covers TPS/TIER routes, same-origin links, enquiry form fields, security headers, robots, sitemap URL/host/noindex rules, metadata and JSON-LD (PR #97); both sites now have branded 404 recovery pages with tested internal recovery links (PR #106). Full redirect, 500 and site-wide broken-link audits remain pending.
- [ ] **QA-09** Production acceptance report with screenshots, test evidence, open risks and owner sign-off.

## 8. Content operations / CMS

- [x] **CMS-01** Evaluated Decap CMS, TinaCMS, Payload and Strapi against Git permissions, authentication, database/hosting, preview and maintenance; findings are recorded in ADR-002.
- [x] **CMS-02** Decision: retain Git-managed static content for the current phase; defer CMS installation until recurring nontechnical-editor demand justifies its authentication, infrastructure and maintenance overhead (ADR-002).
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
- [~] **GROW-09** TPS admissions campaign funnel and five grade-stage guidance pages implemented (PR #88); verified proof, operational callback/visit conversion and final acceptance remain pending.
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
- [~] **GROW-21** Deterministic, searchable, source-grounded TPS/TIER FAQ and pathway finders implemented (PRs #83–84); an advanced assistant, approved knowledge corpus, human handoff and privacy review remain pending.
- [~] **GROW-22** TPS and TIER Hindi FAQ/help translations and language selectors are merged behind an opt-in feature flag (PR #87); text-first no-login QR landing pages are implemented (PR #94 merged). Authorised human translation review, production enablement, QR artwork/print approval and low-bandwidth campaign acceptance remain pending.

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
- [x] PR #87 gated Hindi FAQ/help content for TPS and TIER merged after exact-source free CI passed both site jobs; Hindi mode remains disabled until authorised human review.
- [x] PR #88 TPS grade-stage admissions guides merged after exact-source free CI passed both site jobs.
- [x] PR #89 TIER institution comparison merged after exact-source free CI passed both site jobs.
- [x] PR #91 initial architecture decision record and page-by-page CTA hierarchy merged; no analytics or tracking enabled.
- [x] PR #94 text-first TPS/TIER QR landing pages merged after exact-source free CI passed both site jobs; QR artwork, print proof and public distribution remain unapproved.
- [x] PR #95 BreadcrumbList schema and consolidated SEO-07 route acceptance tests merged after both public free-CI site jobs passed; PR #96 was closed as superseded and no duplicate code was merged.
- [x] PR #97 expanded production HTTP route/sitemap smoke coverage merged after both free CI site jobs passed.
- [x] PR #101 mobile device emulation, slow-3G validation and single-main QR page accessibility fix merged after both free CI site jobs passed.
- [x] PR #102 CMS evaluation and Git-managed-content ADR merged; no CMS service or database was added.
- [ ] Reconcile institution facts, media permissions and approvals from authorised source documents before publishing claims/assets.
- [ ] Complete hosting-specific staging/production inventory and test the release/rollback runbook with the hosting owner.
- [ ] Staging and owner acceptance.
- [ ] Production launch approval.

- [x] PR #105 expanded SEO metadata acceptance to every generated TPS grade-stage pathway and TIER institution profile; exact-source public free CI run `44882422513` passed both TPS and TIER jobs. Private merge commit: `fb0e3f6352796bca572312bf41b238ccf5425b32`.

- [x] PR #106 added branded 404 recovery pages to TPS and TIER and extended production smoke assertions to check 404 status, heading and recovery links. Exact-source public free CI run `44882581805` passed both site jobs. Private merge commit: `46b0e470fc1ed183b5d5428a675f553e6001aaa1`.

- [x] PR #104 expanded Playwright and axe browser acceptance to every current public TPS/TIER route, including all grade-stage and institution profile pages. Exact-source public free CI run `44882641431` passed both site jobs. Private merge commit: `ed94d88812b7344918ce7eea5a0a34b71512d258`.


## 18. Legacy website content and media migration — 2026-11-23

- [x] **MIG-01** Identified the current public source websites: TPS `https://www.tpsgudhagorji.com/` and Tagore Group `https://www.tieredu.org/`.
- [x] **MIG-02** Added a page-by-page legacy source/destination inventory at `docs/content/LEGACY_SITE_MIGRATION_INVENTORY.md`.
- [x] **MIG-03** Added `docs/content/legacy-media-manifest.json` with authentic legacy image URLs, alt text and explicit production consent-review flags.
- [x] **MIG-04** TPS homepage prototype now uses the legacy campus photograph, campus/play-area/computer-learning photographs, the school's 2004 origin and its legacy 3-H Head/Heart/Hand educational philosophy.
- [x] **MIG-05** TIER homepage prototype now uses a legacy aerial campus photograph, campus/sports/computer/hostel photographs and the legacy institutional origin/campus story.
- [~] **MIG-06** The images are referenced from the existing public legacy hosts for prototype review. Downloading approved originals into the private media library, image optimization, responsive variants and image rights/consent verification remain open.
- [~] **MIG-07** Remaining legacy pages to migrate into their corresponding new routes include TPS Why Tagore, Vision/Mission, founder-chairman message, principal message, infrastructure, hostel, sports academy, play school, admission, statutory disclosure and gallery; TIER campus, hostel, library, course/admission and institution profiles.
- [!] **MIG-08** Reconcile legacy inconsistencies before production: TPS principal name conflict, old phone routing, 4.5-acre claim versus CBSE disclosure's 12,999 sq m, old admission-year labels, TIER historical course/portfolio labels and unsupported TIER numeric claims. Identifiable student images require documented consent before public launch.
- [~] **MIG-09** Private PR #115 created as a draft for the first populated prototype pass. CI currently fails before any job steps on all six checks; do not treat this as an application-code failure or acceptance result until runner/Actions execution is restored.

### Private Actions diagnostic comparison — 2026-11-23

- Private PR #45's head `797c4e9e` had six successful checks on 2026-11-20: TPS quality, TIER quality, CodeQL, both dependency audits and secret scanning.
- Private PR #114 head `7f992ad3` has five workflow groups failing within seconds with empty job step lists and unavailable job logs (`BlobNotFound`).
- New private PR #115 head `a6a57387` independently reproduces the same pattern across all six checks: TPS quality, TIER quality, CodeQL, dependency audits and secret scanning. All jobs report no steps; logs are unavailable.
- This rules out a failure unique to the CONTENT-05 files, but does not establish whether the cause is Actions quota, repository settings, runner provisioning or a GitHub-side issue. No setting/billing cause is confirmed.
- Keep #114 and #115 draft/unmerged; validate source and tests on the public CI mirror while private Actions is investigated. No production deployment.


### Minimal private Actions runner probe — 2026-11-23

- Created isolated diagnostic branch `diagnostics/private-actions-runner-probe` from private `main`, with a new workflow containing only `runs-on: ubuntu-latest` and one shell `echo` step; no checkout, Node, dependencies, secrets or third-party actions.
- Run `45130979954`, job `137546155613`, completed as failure before any step; step list is empty and log download returns Azure `BlobNotFound`.
- This reproduces the same failure with a minimal workflow and therefore rules out the website code, dependency installation, CodeQL/secret-scan workflow logic and the CONTENT-05 workflow as the cause.
- Current evidence localizes the blocker to private-repository GitHub Actions admission/hosted-runner allocation or account/repository policy/billing. The exact rejection reason is not exposed by the available GitHub connector; no quota, spending-limit, payment, repository setting or GitHub incident cause is confirmed.
- Public mirror standard-hosted-runner CI continues to execute real steps, so use that as the validation path while checking the private account's Billing & licensing → Usage / Actions budget and repository Settings → Actions → General. If those are clean, send GitHub Support the minimal probe run/job IDs above and the matching PR #115 runs.


## 19. Deeper legacy content migration and visual review — 2026-11-23

- [x] **MIG-10** TPS About page now carries the legacy school origin, 3-H Head/Heart/Hand philosophy, founder-chairman source link, CBSE affiliation/school identifiers and authentic campus / early-years / computer-learning photos.
- [x] **MIG-11** TIER About page now carries the Gudha Gorji origin story under Mr. Veerpal Singh Shekhawat and legacy campus / PG College building / library / computer-centre / NCC imagery.
- [x] **MIG-12** TIER institution profiles now contain legacy-derived material for Bal Niketan, Smart School, Vedant Academy, PG College and Hostel. Historical content is separated from current programme claims and management review notes.
- [x] **MIG-13** Source inventory now includes TPS Why Tagore, Olympiad, admissions policy/document references; TIER RBSE, Defence Academy, PG College courses/mission/director/gallery, hostel and library pages; separate Nimbi Jodhan and inaccessible legacy RBSE site references.
- [x] **MIG-14** Media manifest expanded with PG College library/computer/NCC and hostel photos. All identifiable-person images require consent review before production.
- [x] **MIG-15** TPS homepage now includes a facilities/enrichment section covering labs, sports, transport, residential support, Olympiad and qualified-team themes from legacy content, explicitly marked for current confirmation.
- [~] **MIG-16** TPS legacy gallery photos initially did not render in the full-page screenshot when using fill-only sizing. Replaced those gallery images with explicit dimensions and eager loading. PR #37 visual capture is pending to confirm the fix.
- [x] **MIG-17** TIER homepage screenshot review confirmed the legacy campus, sports, computer-learning and hostel images render on desktop and mobile. Formal visual sign-off remains open.
- [~] **MIG-18** Localizing/optimizing approved images into private repository assets, final content reconciliation, management review and production approval remain open.

### Current migration review branches / PRs

- Private PR #115 (first populated TPS/TIER homepage pass): `https://github.com/158jeet/tagore-public-school-website/pull/115`, draft/unmerged.
- Private PR #116 (deeper TPS About, TIER About and institution profile migration, stacked on #115): `https://github.com/158jeet/tagore-public-school-website/pull/116`, draft/unmerged.
- Public mirror PR #37 (full-stack CI mirror against public main): `https://github.com/158jeet/atlas-build-lab/pull/37`, draft/unmerged.
- Public mirror CI run `45130775950` passed both TPS and TIER quality jobs for the first homepage/photo pass. Visual artifacts were inspected: TIER campus gallery renders; TPS hero renders but its lower gallery was blank, which was corrected with explicit image dimensions/eager loading.
- Latest public mirror run `45131819043` is validating the expanded stack including the TPS gallery fix and new facilities section; final result pending at this tracker update.

### Private Actions diagnostic status

- Minimal private runner probe branch `diagnostics/private-actions-runner-probe`, commit `e2381eeb`, run `45130979954`, job `137546155613`: one shell echo step only, but it failed before any step, empty step list, Azure BlobNotFound logs.
- Private website PR checks continue to fail before step execution; no code failure can be inferred.
- Exact root cause still unconfirmed. Account Actions usage/budget and repository Settings → Actions → General must be checked; if clear, GitHub Support needs the minimal probe run/job IDs.
- Public mirror standard-hosted-runner CI is the current working validation path. No PR has been merged and no production deployment has occurred.


### Additional current-source migration — 2026-11-23

- [x] **MIG-19** Added a dated 2025–26 CBSE disclosure snapshot to the TPS homepage: Class X 166/166 (100%), Class XII 93/93 (100%) and 99 teachers. The page links to the current public disclosure and explicitly asks management to recheck the figures before launch.
- [x] **MIG-20** Added a concise Principal’s Message section to TPS About. Current public Principal’s Message and CBSE disclosure both list Sachin Joshi; the source inventory was corrected so it no longer claims a name conflict.
- [x] **MIG-21** Corrected the TPS establishment copy to year 2004 only; no unsupported day/month is shown.
- [x] **MIG-22** Added the existing TIER group-office address, 01594-319504 and tagoregg@gmail.com to the TIER contact prototype, explicitly labelled as legacy details requiring current routing verification.
- [x] **MIG-23** Source inventory records the detailed TPS admission page's stale 2023–24 label against the homepage's 2026–27 promotion; only current-year content is retained in the prototype and school-office confirmation is required.
- [~] **MIG-24** Latest public full-stack CI run `45131819043` is in browser journeys / performance checks. It includes the expanded TPS results and facilities sections, TIER profile pages, responsive layout and legacy group contact card once these changes are mirrored.


### Consolidated review target — 2026-11-23

- Private PR #116 has been retargeted to `main` and now contains the full-stack migration (first homepage pass plus deeper TPS/TIER pages), so it is the single canonical review target: `https://github.com/158jeet/tagore-public-school-website/pull/116`.
- PR #115 remains open as the first staged implementation record; #116 contains the complete stack.
- Public mirror PR #37 targets `main` and validates the complete stack. Latest public run `45132412876` is currently running TPS and TIER production builds after the additional CBSE outcome and group-contact updates.
- Prior complete stack run `45131819043` passed both site jobs and screenshot review. Its screenshots confirm TPS images render and TIER gallery renders.
- No merge, deployment, DNS change or live integration has occurred.


### Hosted-runner label comparison — 2026-11-23

- Extended the isolated probe to test both `ubuntu-latest` and `ubuntu-24.04` with one shell-only echo step each.
- Run `45132784384`: both jobs failed before any steps; job IDs `137551889495` and `137551889801` return empty step lists.
- The failure is not specific to the `ubuntu-latest` image label. Together with the original probe, this isolates the blocker to private-repository hosted-runner allocation/admission or account/repository policy/billing. The available GitHub API connection does not expose the exact rejection annotation or billing usage.
- Required owner-side check remains: account Settings → Billing and licensing → Usage (Actions included compute / spending budget), then repository Settings → Actions → General. If both are clear, escalate both probe run IDs to GitHub Support.


### TPS residential and stage-curriculum migration — 2026-11-23

- [x] **MIG-25** Added the legacy TPS hostel description to `/hostel/guide`: separate boys'/girls' accommodation, triple/quadruple rooms, attached washrooms/balconies in many rooms, centrally air-cooled accommodation, house-in-charge/superintendent supervision, extra classes, medical and counselling support. Every detail is explicitly marked as legacy and subject to current verification.
- [x] **MIG-26** Added source-linked legacy curriculum notes to the dynamic admissions pathway pages for early years, primary, middle and secondary stages. Senior secondary page now notes the current Class XII disclosure and flags the old Science/Commerce stream wording as historical pending confirmation.
- [x] **MIG-27** Expanded the TPS content source inventory with the old Primary School and Secondary School pages.
- [~] **MIG-28** Public mirror CI run `45132899609` is validating these newest hostel and admissions-stage changes. Prior full-stack run `45132412876` passed both site jobs including current CBSE results and TIER group-contact content.


### Brand asset integrity — 2026-11-23

- [x] **BRAND-01** TIER header now uses the exact legacy `https://www.tieredu.org/images/logo-wide.png` wordmark, unchanged.
- [x] **BRAND-02** Removed the invented TPS “TPS” circular monogram from the header. No standalone approved TPS logo file was present in the private repository or available Project/Library files; the header uses text-only school identity until the exact original logo is supplied.
- [x] **BRAND-03** Added logo-source status to the media manifest and migration inventory. Do not redraw, trace, recolor, crop or otherwise modify either institution’s logo.
- [~] **BRAND-04** Public mirror CI is validating the official TIER wordmark and TPS text-only header change; screenshot review pending.


- [x] **BRAND-05** Removed the decorative “TG” hero monogram from TIER and replaced it with a Gudha Gorji location label, so no recreated mark is presented as an institutional logo.


### TIER leadership, faculty and co-curricular migration — 2026-11-23

- [x] **MIG-29** TIER About page now includes legacy sports and cultural activity themes from `act.php` (cricket, basketball, volleyball, badminton, table tennis, kabaddi, kho-kho, taekwondo, athletics, singing, dance, drama and debate), with current availability/coaches/schedules flagged for confirmation.
- [x] **MIG-30** TIER About page now includes the Director’s legacy message themes (innovation, excellence, cultural values) and the teacher page’s description of trained, experienced, subject-specialist educators and holistic development.
- [x] **MIG-31** Current staff names, qualifications, staff counts and allocations are not inferred from legacy copy; they remain pending management confirmation.


- [x] **BRAND-06** Follow-up source inspection found the first placeholder-removal edit had targeted an obsolete markup selector. Corrected the actual rendered headers: TPS inline “TPS” circle is now removed, and TIER inline “T” circle is replaced by the exact legacy Tier Edu wordmark. This corrected markup is awaiting the next public mirror CI/screenshot pass.


### TPS safeguarding content migration — 2026-11-23

- [x] **MIG-32** Parent Guide now links the current 2026–27 Child Protection (POCSO), Anti-Bullying and Grievance Redressal Committee PDFs from the existing TPS website.
- [x] **MIG-33** Committee member names and phone numbers were not copied into new page text; the original official PDFs remain linked and the page tells families to confirm current reporting contacts with the school.
- [x] **MIG-34** Source inventory now records the three current committee documents and their verification requirements.


## 17. Legacy content migration and private validation diagnosis (2026-11-23)

- [x] **MIG-01** Source-page inventory created for the current TPS source website (`tpsgudhagorji.com`) and TIER source website (`tieredu.org`): `docs/content/LEGACY_SITE_MIGRATION_INVENTORY.md`.
- [x] **MIG-02** Structured media manifest created at `docs/content/legacy-media-manifest.json`; current prototype uses authentic legacy-hosted images, with each identifiable-person image marked for consent review.
- [x] **MIG-03** First populated TPS pass: homepage, about/story, founder/principal messages, campus imagery, hostel family guide, parent guide, admissions stage content and dated CBSE disclosure snapshot.
- [x] **MIG-04** First populated TIER pass: homepage, about/history, campus/college/library/computer/NCC imagery, sports/cultural activities, Director's message, faculty philosophy, contact and five institution profiles.
- [x] **MIG-05** Reconciliation notes record stale or conflicting facts, legacy contact routing, historic numerical claims, separate Nimbi Jodhan campus, the unresolved RBSE source and TPS logo gap. Exact TIER wordmark is reused unchanged; no logo is redrawn.
- [~] **MIG-06** External legacy image URLs are prototype-only. Copy approved originals to the private media library, optimize responsive local variants and verify image rights/consent before production.
- [~] **MIG-07** Management review remains pending for current facilities, admission criteria, fees, phone/email routing, leadership, results, policies, image consent and final institutional naming.
- [x] **MIG-08** Public mirror PR #37 validates the current migration code. Latest run **#45134444297** passed both TPS and TIER jobs, including typecheck, lint, production builds, browser journeys/accessibility, HTTP smoke tests and performance-lab steps. This is validation of the mirror branch, not production acceptance.
- [!] **CI-PRIVATE-01** Private canonical PR #116 (branch `content/legacy-institution-profiles`) has the same Website CI workflow blob as the public mirror (`8e8129ae071a81613ba4799a9a9dbf1611ef0e1b`). Latest private runs on head `924c6bc5ab29ef47834ee49ada37801881bf33a7`: Website CI #45134792429, CodeQL #45134792433, Secret Scanning #45134792447, Dependency Security Audit #45134792471.
- [!] **CI-PRIVATE-02** The latest private Website CI jobs #137558382751 and #137558382996 completed in 2–3 seconds with `runner_id=0`, blank `runner_name`, empty `steps=[]`, and no runner assignment. All four workflow groups fail before any job step. Earlier tests on `ubuntu-latest` and the current `ubuntu-24.04` both show the same pre-runner failure. Job-log downloads return `BlobNotFound` because no job log was produced.
- [!] **CI-PRIVATE-03** Evidence isolates the failure to the private repository/account runner-dispatch path, not the application test commands or the shared Website CI YAML. The available GitHub integration cannot read private Actions administration/billing settings, so it cannot establish whether the cause is repository Actions policy, included-compute/spending restriction, account-level restriction or GitHub platform provisioning. Do not label it a confirmed billing issue or repeatedly rerun unchanged jobs.
- [~] **CI-PRIVATE-04** Next diagnostic: repository owner checks Settings → Actions → General for hosted-runner/action policies and account Settings → Billing & licensing → Usage for Actions compute/spending status; inspect the failed run summary for an explicit rejection annotation. If those are clear, submit the exact run/job IDs to GitHub Support for runner-dispatch telemetry. Public mirror CI remains the no-cost validation path while this is unresolved.
- [ ] **CI-PRIVATE-05** Restore meaningful private validation before merging the content migration or any other website feature PR. Keep PR #116 draft/unmerged and do not deploy until private validation, owner review and production release gates are satisfied.


### Latest full-stack content and mobile review — 2026-11-23

- [x] **MIG-35** Public mirror run `45135171585` passed both TPS and TIER typecheck, lint, tests, production builds, browser/accessibility journeys, smoke tests and lab performance checks.
- [x] **VIS-01** Screenshot review confirms TPS legacy gallery images render on desktop/mobile; TIER official legacy wordmark renders in the header, group gallery photos render, and the mobile hero uses a location label rather than a decorative monogram.
- [x] **VIS-02** TIER contact card and legacy group office details render in desktop/mobile screenshots.
- [~] **VIS-03** Mobile screenshot showed the persistent quick-action bar still overlapped one line of the TIER contact introduction. Reduced the contact section's mobile top padding further; public mirror run `45135780006` is pending to validate the final adjustment.
- [~] **MIG-36** Added current 2026–27 POCSO, Anti-Bullying and Grievance Redressal committee PDF links to TPS Parent Guide. The linked PDFs are not transcribed; current reporting contacts remain for management verification.
