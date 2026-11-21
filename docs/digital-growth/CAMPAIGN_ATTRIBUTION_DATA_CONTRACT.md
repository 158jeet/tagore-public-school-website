# Privacy-Safe Campaign Attribution Data Contract

Status: proposed contract; analytics and ERP persistence are not enabled.
Workstreams: GROW-17 / GROW-05 / GROW-03
Last updated: 2026-11-21

## Purpose

Define a small, consistent attribution vocabulary so TPS and TIER can understand which public campaigns generate qualified enquiries and eventual outcomes. Attribution must not collect personal information, identify children, or overstate causality.

## URL parameter convention

Allow only normalized campaign metadata:
- `utm_source`: origin such as `google`, `community`, `parent_session`, `print`, `youtube`.
- `utm_medium`: channel such as `organic`, `paid_search`, `social`, `qr`, `referral`, `email`.
- `utm_campaign`: approved campaign slug such as `tps_admissions_2027`.
- `utm_content`: creative/placement slug such as `poster_a` or `hero_cta`.

Rules:
- lowercase ASCII; use `[a-z0-9_-]`; enforce length limits (source/medium 40 chars, campaign/content 80 chars).
- reject or discard unknown keys; never preserve arbitrary query strings.
- never include names, phone numbers, email addresses, student IDs, class/grade, health, marks, household IDs or free text.
- never use personal data in redirect URLs, analytics events, referrer fields or error logs.

## Attribution semantics

- **First touch**: earliest eligible campaign touch observed within the approved retention window.
- **Last non-direct touch**: most recent eligible campaign touch before the enquiry; direct visits do not overwrite a known non-direct source.
- **Enquiry source**: the source attached to the submitted enquiry, if present and consent/notice requirements are met.
- **Unknown/direct**: use explicit values; do not fabricate missing source.
- **Cross-domain**: keep TPS and TIER attribution separate by default. Do not stitch user identity between domains without a separate approved purpose and legal review.

Attribution is descriptive, not proof that a campaign caused an enrolment. Reports must show date range, denominator, missing-source rate and attribution model.

## Proposed data fields

| Field | Type | Rule |
|---|---|---|
| `source` | enum/string | normalized allowlist |
| `medium` | enum/string | normalized allowlist |
| `campaign` | string | bounded approved slug |
| `content` | string | bounded approved slug |
| `first_touch_at` | timestamp | only if retention and storage are approved |
| `last_non_direct_at` | timestamp | only if retention and storage are approved |
| `attribution_model_version` | string | versioned, e.g. `v1` |
| `institution` | enum | TPS or approved TIER institution |
| `consent_state` | enum | only as defined by approved privacy design |

Do not store raw IP addresses, full user-agent fingerprints, device IDs or third-party advertising IDs as attribution fields.

## Proposed ERP mapping

The website may eventually send the normalized fields through an authenticated server-to-server API. The browser must never connect to the ERP database. The ERP contract, authentication, idempotency key, schema, sandbox and data owner must be confirmed before implementation.

Suggested mapping:
- website event/enquiry ID -> ERP external reference;
- institution + enquiry category -> lead routing context;
- approved source/medium/campaign/content -> attribution fields;
- first/last touch -> optional bounded metadata;
- consent evidence -> consent record reference/version, not a free-text copy of all form data.

No field mapping in this document asserts that the ERP currently supports these fields.

## Reporting definitions

- Qualified enquiry rate = qualified enquiries / eligible landing-page sessions.
- Contact rate = enquiries with a recorded contact attempt / assigned enquiries.
- Visit request rate = visit requests / eligible landing-page sessions.
- Visit attendance rate = attended visits / confirmed visits.
- Application conversion = applications / qualified enquiries (define cohort and time window).
- Enrolment conversion = enrolments / qualified enquiries (define cohort and time window).

Always display numerator, denominator, date range, institution, source coverage and exclusions. Avoid comparing campaigns with materially different audiences without qualification.

## Governance and retention

Management must approve:
- analytics provider and separate TPS/TIER properties;
- cookie/consent approach and privacy notice;
- attribution retention period and deletion process;
- ERP field owner and access roles;
- campaign taxonomy owner and change process;
- reporting access and minimum aggregation thresholds.

Until approval, do not enable analytics, cookies, pixels, local storage identifiers, attribution persistence or ERP writes. The site may use a clean, useful landing page with no measurement.
