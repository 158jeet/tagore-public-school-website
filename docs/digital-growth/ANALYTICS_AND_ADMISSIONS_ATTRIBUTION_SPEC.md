# Website analytics and admissions attribution specification

Status: implementation specification; analytics is **not active** until approved measurement IDs, consent configuration and end-to-end tests are supplied.
Last updated: 2026-11-20

## 1. Measurement outcomes

Measure the admissions funnel, not vanity traffic:

1. Qualified enquiry submitted
2. Campus visit requested
3. Visit confirmed by staff (offline/CRM status)
4. Visit attended (offline/CRM status)
5. Application started and submitted
6. Offer made and accepted / admission enrolled

Website events can establish steps 1 and 2 only. Staff/ERP workflow must supply confirmed visits, attendance and application outcomes. Never infer these from a form submission.

## 2. Separate properties and ownership

- TPS domain: its own GA4 property and Search Console property.
- TIER domain: its own GA4 property and Search Console property.
- Keep cross-domain user stitching disabled by default. Enable only after an explicit measurement and privacy review.
- The Owner controls property ownership; grant staff least-privilege access using named accounts and MFA.
- Keep measurement IDs in deployment environment configuration, never commit real IDs or credentials.

## 3. Event taxonomy

Use lowercase snake_case event names. Events must be meaningful, deduplicated and contain no direct personal data.

| Event | Trigger | Allowed parameters |
|---|---|---|
| `admission_cta_click` | Admissions CTA activation | `placement`, `page_path` |
| `parent_guide_select` | Parent guide choice | `class_band`, `topic` |
| `enquiry_form_start` | First meaningful form interaction | `form_type`, `page_path` |
| `enquiry_submit_success` | Server accepts a valid enquiry | `form_type`, `institution`, `class_band`, `topic` |
| `enquiry_submit_error` | Submission fails | `form_type`, `error_category` |
| `campus_visit_request_success` | Server accepts a visit request | `class_band`, `visit_period` |
| `phone_click` | User activates a phone link | `placement` |
| `whatsapp_click` | User activates an approved WhatsApp link | `placement` |
| `institution_profile_view` | TIER institution page view | `institution_slug` |

Do not send names, phone numbers, email addresses, free-text messages, exact preferred visit dates, student names, form contents, IP addresses as custom parameters, or document identifiers to analytics. Do not put PII in URLs, UTMs, page titles or event labels.

## 4. Attribution conventions

Persist only approved, consented attribution fields in the CRM/enquiry record, not in public URLs or analytics event payloads:

- `utm_source`: originating platform or partner (e.g. google, facebook, instagram, youtube, referral)
- `utm_medium`: organic, paid, social, referral, email, whatsapp, offline
- `utm_campaign`: stable campaign identifier, e.g. `2027_admissions`
- `utm_content`: creative or placement identifier
- `utm_term`: keyword only for campaigns where it is appropriate

Normalize values to lowercase ASCII with underscores. Never put names, mobile numbers, student details or other personal data in UTM values. Preserve first-touch and last-touch separately if the approved CRM supports it; document attribution window and overwrite rules before implementation.

## 5. Consent, privacy and security gates

- Before enabling analytics storage or advertising tags, obtain a privacy/legal review of the applicable Indian data-protection requirements and publish an accurate privacy notice.
- Use a consent-management mechanism appropriate to the selected analytics and advertising technologies. Do not load non-essential analytics or advertising tags before the required consent.
- Provide a clear way to change or withdraw consent; do not bundle analytics consent with permission to receive an admission call.
- Keep analytics identifiers separate from enquiry form contact data.
- Do not enable ad-personalization, remarketing, session replay, heatmaps or third-party pixels in the initial release.
- No tracking of children or student accounts. These websites are parent/enquirer-facing.
- Restrict access, configure retention deliberately, and review vendor processing terms and data location.
- Analytics must never be used as the source of truth for admissions or fee status.

## 6. Implementation and QA sequence

1. Owner approves analytics provider, property ownership, privacy notice and consent behaviour.
2. Create separate production and staging properties/streams (or equivalent environments).
3. Add environment IDs via hosting secrets/environment variables; do not commit them.
4. Implement a small typed event helper with a strict allowlist and a consent gate.
5. Trigger success events only after the server returns an accepted response; never on button click alone.
6. Verify no PII in browser network requests, analytics DebugView and vendor exports.
7. Test consent accepted, rejected, withdrawn, blocked scripts, API errors, duplicate clicks and mobile flows.
8. Verify UTM capture through enquiry receipt into the authorized CRM/ERP API, with no direct database access.
9. Record test evidence and owner sign-off before enabling production tracking.

## 7. Reporting

Weekly dashboard, split by TPS and TIER:
- sessions and landing pages by source/medium/campaign
- qualified enquiries, visit requests and conversion rates
- cost per qualified enquiry for paid campaigns (spend imported from platform)
- staff first-response time and follow-up completion (CRM/ERP)
- visit confirmation and attendance rates (CRM/ERP)
- application, offer and enrolment conversion (CRM/ERP)

Always show counts and denominators. Segment paid vs organic. Do not compare campaigns on raw lead volume without lead quality and follow-up outcomes.

## 8. Current blockers

- No approved GA4/property IDs supplied.
- No privacy notice / consent design approved.
- Enquiry provider key and delivery verification are still pending.
- ERP admissions API contract and lead-status lifecycle are not yet ready.
- Staff ownership and response-time SLA need assignment.

Until these are resolved, keep measurement in specification mode. Do not claim analytics, attribution or CRM integration is live.
