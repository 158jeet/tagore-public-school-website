# Tagore Growth Funnels and Business Acquisition System

Status: proposed product and delivery specification; no campaign tracking, paid media, live lead collection, or ERP automation is enabled by this document.
Last updated: 2026-11-20

## 1. Commercial objective

Build an ethical, measurable acquisition system that turns relevant parent, student, institutional and partnership interest into qualified conversations, campus visits, applications and enrolments. The website remains the authoritative brand and information layer; focused landing pages remove distractions for specific campaigns and audiences.

Measure outcomes, not vanity metrics. The primary business measures are qualified enquiries, contact rate, campus visits booked/attended, applications started/completed, admissions/enrolments, response time, and cost per qualified enquiry/admission where spend data is available.

## 2. Audience and funnel map

### TPS — school admissions
- Parent exploring schools: local search/social/referral -> class/need-specific landing page -> parent guide/prospectus -> callback or campus visit -> application -> enrolment.
- Parent comparing a specific grade: grade page with verified curriculum, day structure, support, transport/hostel applicability and FAQs -> visit or callback.
- Hostel-intent family: residential information page -> hostel-specific enquiry -> supervised hostel visit and staff follow-up.
- Returning/known family: clear re-enquiry and sibling pathway, without exposing existing student data on public pages.

### TIER — group and institutional growth
- Parent/student: choose institution and programme -> institution profile -> relevant enquiry.
- Teacher/candidate: careers pathway -> role-specific application interest; no public job promises without approval.
- School/college/institution partner: partnership landing page -> structured collaboration enquiry -> leadership follow-up.
- Vendor/community/general contact: route to the correct group office without mixing with admissions leads.

### Campaign landing-page principles
- One audience, one problem/intent, one primary call to action per page.
- Campaign-specific headline and useful, verifiable content; avoid generic doorway pages and duplicate SEO pages.
- Keep global navigation available but visually subordinate to the campaign action.
- Use a short form first; ask optional qualifying questions only when they change routing or follow-up.
- Provide a clear privacy/consent explanation, expected next step and response-time expectation only after the organisation approves an SLA.
- Support Hindi and English where translation improves parent comprehension; use human review for important admissions/legal content.

## 3. Funnel and landing-page feature backlog

### GROW-09 — TPS admissions campaign funnel
- Dedicated landing page templates for admissions, grade/class, campus visit, hostel and approved event campaigns.
- Parent-first value proposition, verified proof, FAQs, clear eligibility/availability disclaimers and prominent visit/callback CTAs.
- Source-specific pages for search, social, referral and offline QR campaigns without thin or duplicate indexable pages.
- Success page with next steps, contact details and visit preparation; no false confirmation until a booking is actually accepted.
- Acceptance: mobile-first page, keyboard accessible, fast, tested form states, correct institution routing, privacy copy approved, no unverified claims.

### GROW-10 — TIER segmented group funnel
- Audience routes for parents/students, institutional partnerships, careers, vendors/community and general group enquiries.
- Institution/programme selector that routes to the correct team and records only necessary context.
- Partnership page with collaboration themes and a structured request for meeting/callback.
- Acceptance: each route has a distinct owner/recipient, accessible form, no misrouted leads, verified institution details.

### GROW-11 — Conversion assets and lead magnets
- Approved prospectus download/request, parent admission checklist, campus-visit guide, hostel guide and event registration.
- Offer useful information without forcing a phone number for material that can reasonably be public.
- If gated, state exactly what the user receives and why contact details are requested.
- Track asset requests only with consent and no sensitive child/student information.
- Acceptance: current approved documents, accessible PDFs/pages, clear version/date, tested delivery and retention policy.

### GROW-12 — Campus visit and event conversion
- Request/preferred-slot flow with date/time preferences, visit type, number of accompanying adults and optional areas of interest.
- Staff confirmation workflow; a request is not a confirmed booking until staff accepts it.
- Visit confirmation, directions, checklist and reschedule/cancel contact route.
- Open-house, orientation, parent webinar and approved event registration templates.
- Attendance outcome and follow-up recorded in ERP once an authenticated integration exists.
- Acceptance: timezone Asia/Kolkata, duplicate-safe requests, accessible confirmation, clear operational owner and tested reminders.

### GROW-13 — Callback and contact choice
- Let families choose callback, phone, WhatsApp or campus visit where each channel is operationally supported.
- Explicit channel-specific consent; WhatsApp marketing opt-in must not be bundled with an admissions enquiry.
- Display verified phone/email and operating hours; no fabricated instant-response promise.
- Acceptance: consent recorded with wording/version/time, no unsolicited promotional messages, correct staff routing.

### GROW-14 — Referral and community acquisition
- Parent/alumni/community referral codes or campaign tags, with transparent terms and no undisclosed incentives.
- Printable QR and short links for village outreach, school events, community meetings and approved offline campaigns.
- Staff/partner referral attribution without exposing the referrer's personal information to the referred family.
- No referral reward programme until management approves eligibility, budget, compliance and terms.
- Acceptance: deduplicated attribution, abuse controls, documented terms and privacy review.

### GROW-15 — Trust and proof conversion modules
- Verified affiliation/disclosure panels, leadership/faculty profiles, facilities evidence, dated results/awards, safety/process information and authentic campus media.
- Parent/student stories only with documented consent; no invented testimonials, star ratings, rankings or outcome guarantees.
- Evidence source and last-reviewed date for each factual claim.
- Acceptance: every published claim has an owner and source; photo/video permissions recorded.

### GROW-16 — Local discovery and high-intent SEO
- Distinct, useful pages for real institutions/programmes and relevant local search intent; no doorway pages or fabricated service areas.
- Consistent name/address/phone/email, map/directions, hours and official profile links after verification.
- Institution-specific metadata, internal links, useful FAQs and eligible structured data.
- Google Business Profile/Search Console management only with owner authorization.
- Acceptance: NAP verified, schema validated, no duplicate/thin pages, redirects and indexability tested.

### GROW-17 — Campaign attribution and conversion reporting
- Consistent source/medium/campaign/content/term UTM convention; no names, phone numbers, emails or other PII in URLs.
- Capture first-touch and last-touch source where consent and privacy rules permit; retain attribution in the lead record, not browser fingerprinting.
- Separate TPS and TIER properties by default; no cross-domain identity stitching.
- Funnel dashboard: visits -> CTA -> enquiry start -> valid submit -> qualified -> contacted -> visit booked/attended -> application -> enrolment.
- Report channel, campaign, institution and grade cohorts only where sample sizes protect privacy.
- Acceptance: approved analytics provider, consent model, retention and no-PII event schema; reconcile web events with ERP outcomes.

### GROW-18 — Ethical remarketing and enquiry recovery
- Optional consent-based follow-up for users who explicitly request contact or opt into updates.
- No covert abandoned-form identification, fingerprinting, purchased lists or unsolicited WhatsApp/SMS campaigns.
- Frequency caps, suppression after opt-out/admission, source tracking and deletion process.
- Paid retargeting only after platform/provider, consent, privacy notice and budget approvals.
- Acceptance: consent audit trail, opt-out propagation, suppression tests and privacy/legal approval.

### GROW-19 — Lead qualification, routing and response SLA
- Explainable lead priority based on stated intent, institution, grade, visit preference and requested contact timing—not sensitive profiling.
- Route TPS admissions, hostel, TIER institution, partnership and careers leads to accountable teams.
- ERP owns lead status, assignment, call notes, follow-up tasks, reminders, visit attendance and enrolment outcome.
- SLA dashboard: time to first attempt, contact rate, overdue leads, visit conversion and lost reasons.
- Acceptance: approved SLA/owners, authenticated ERP API, idempotency, retry/outbox, audit trail and sandbox end-to-end test.

### GROW-20 — Conversion optimisation programme
- Hypothesis-led A/B tests for headline, CTA, page order, form length, proof placement and language.
- Predefine one primary metric, guardrail metrics, sample-size/stop rule and test period.
- Do not experiment on safety/legal disclosures, consent wording or critical eligibility information.
- No tracking/experimentation scripts before privacy approval; no dark patterns.
- Acceptance: experiment log, reproducible results, accessible variants and rollback plan.

### GROW-21 — Helpful admissions assistant
- Optional FAQ assistant for institution discovery, admissions steps, campus visit preparation and routing to a human.
- Ground responses only in approved website/prospectus content; disclose uncertainty and offer staff contact.
- Never collect sensitive child data, make admission/fee promises, assess a child's prospects, or impersonate staff.
- Human handoff with explicit consent and minimal context; log only operationally necessary data.
- Acceptance: source-grounded answer set, refusal/escalation rules, privacy review, abuse controls and staff owner.

### GROW-22 — Hindi-first local reach and offline-to-online
- Human-reviewed Hindi/English campaign pages and parent guides.
- QR-enabled brochures, campus signage, village outreach material and event handouts with campaign-specific source tags.
- Lightweight pages and compressed media for slower mobile networks.
- Acceptance: language QA, QR destination tests, mobile/low-bandwidth tests and print-proof approval.

## 4. Shared conversion UX requirements

- One dominant primary CTA per campaign page; secondary actions remain clear but not competing.
- Forms ask only for information needed to respond or route; child name, date of birth, marks, health, identity documents and other sensitive details are not requested at initial enquiry.
- Phone validation must support Indian numbers without unnecessarily rejecting legitimate formats.
- Preserve user-entered values after recoverable validation/provider errors; prevent accidental double-submit.
- Show accessible inline errors and a clear success state; distinguish received, pending staff confirmation and confirmed booking.
- Provide a human contact route if the form fails.
- Do not place personal information in query strings, analytics events, logs, referrers or confirmation URLs.
- Consent is granular, optional where appropriate, unbundled from service enquiries and recorded with wording version.
- Forms must work with keyboard, screen reader, zoom, reduced motion and mobile devices.
- Use real, permissioned photos; generated concept imagery must never be represented as the actual Tagore campus.

## 5. Acquisition channel playbook

1. High-intent search: admissions, school/board/class, hostel and institution searches; send each to a matching useful page.
2. Local presence: verified Google Business Profiles, directions, reviews handled under platform rules, current contact details and event updates.
3. Social: short authentic campus/faculty/event videos and parent information posts; link to one matching landing page.
4. Video: YouTube explainers for admissions process, curriculum, campus visit and institution introductions; captions and approved claims.
5. Offline: village/community outreach, printed prospectus, events and QR codes with campaign attribution.
6. Referral: transparent parent/alumni/community referrals after approved policy.
7. Partnerships: structured B2B/education collaboration page and leadership follow-up.
8. Organic content: useful parent guides, FAQs and institution pages; avoid mass-produced low-value SEO content.
9. Paid campaigns: only after landing pages, lead delivery, attribution, privacy consent and staff response capacity are proven. Start with a controlled pilot and agreed budget.

## 6. Lead and data lifecycle

Campaign click -> landing page -> consented enquiry -> server-side validation/anti-abuse -> secure delivery -> ERP idempotent lead create -> team assignment -> first contact -> visit/application -> enrolment/lost reason -> aggregate reporting.

The current website enquiry APIs and draft ERP contract are foundations only. Web3Forms credentials, real delivery, ERP endpoint/auth/schema/sandbox, retention and consent approvals are not confirmed. Do not mark this lifecycle live until the complete end-to-end test succeeds.

## 7. Delivery sequence and dependencies

### Phase 0 — specification and measurement foundation
- Approve audience routes, CTA hierarchy, verified claims, contact owners, consent language and operational SLA.
- Finalise lead schema, campaign taxonomy and privacy/retention decisions.
- Validate provider delivery and ERP sandbox before scaling acquisition.

### Phase 1 — TPS pilot
- Build one core admissions funnel and one campus-visit funnel.
- Add class/grade pathways only where unique verified content exists.
- Add prospectus/parent checklist and hostel pathway when current approved assets/details exist.
- Pilot organic, local and existing community channels before paid spend.

### Phase 2 — TIER group acquisition
- Build parent/student institution routing and partnership/careers pathways.
- Add institution-specific funnels after each profile's facts and recipient are verified.

### Phase 3 — optimise and scale
- Enable privacy-approved attribution dashboard and ERP outcome reconciliation.
- Run controlled campaign tests, referral/QR campaigns and paid pilot only after staff response capacity is demonstrated.
- Expand only channels with qualified leads and acceptable admission economics.

## 8. Success metrics

- Qualified enquiry rate = qualified enquiries / relevant landing-page sessions.
- Contact SLA = leads with first contact attempt within approved SLA / assigned leads.
- Visit booking rate and visit attendance rate.
- Application-start and application-completion rates.
- Enrolment conversion by source/campaign/institution/grade.
- Cost per qualified enquiry and cost per enrolment where reliable spend data exists.
- Lead duplication, invalid/spam rate, delivery failure rate and opt-out rate as guardrails.
- Report denominators, date ranges and attribution rules; do not claim causation from simple last-click reports.

## 9. Non-goals / safeguards

- No fabricated reviews, results, rankings, awards, urgency, scarcity or admission guarantees.
- No sale/share of enquiry lists, covert tracking, child profiling or unsolicited messaging.
- No paid media scale-up before form delivery, staff follow-up and outcome tracking are operational.
- No direct browser-to-ERP database connection.
- No production analytics, ad pixels, CRM automation, DNS or deployment changes from this specification alone.
