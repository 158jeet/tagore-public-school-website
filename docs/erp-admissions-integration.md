# Website ↔ ERP admissions integration contract (draft)

## Ownership
- Website owns public content, marketing landing pages, consent capture and enquiry UX.
- ERP owns the canonical lead, assignment, communication history, campus visit, application, admission decision, fee setup and student conversion.
- Website must never connect to the ERP database or expose ERP endpoints/tokens in browser code.

## Initial enquiry payload
```json
{
  "schema_version": "1.0",
  "source": "tagore-public-school-website",
  "source_page": "/admissions",
  "campaign": null,
  "parent_name": "string",
  "mobile": "string",
  "email": null,
  "class_applied_for": "string",
  "academic_year": "2026-27",
  "contact_consent": true,
  "consent_text_version": "v1",
  "submitted_at": "ISO-8601 timestamp",
  "idempotency_key": "UUID"
}
```

## Required server-side behavior
1. Validate and normalize payloads on the server.
2. Apply abuse protection (rate limit, bot mitigation and input size limits).
3. Require explicit consent before contact follow-up.
4. Generate/verify an idempotency key to prevent duplicate leads on retries.
5. Deliver through an authenticated, versioned ERP endpoint.
6. Retry transient failures safely; log correlation IDs, not unnecessary personal data.
7. Never return internal ERP errors or credentials to the browser.
8. Keep a temporary delivery queue/outbox if ERP is unavailable; alert an operator when delivery is delayed.

## ERP workflow requirements
- Match likely duplicates using normalized mobile plus school/academic year; do not silently merge uncertain matches.
- Store source, campaign, landing page and consent evidence.
- Support owner-level visibility, assignment, follow-up reminders, call notes, campus visit scheduling, application status and conversion to student.
- Website receives only a safe acknowledgement and optional public reference number.

## Current state
This is a design contract only. No ERP API endpoint or credential has been configured. Temporary form-provider delivery must not be treated as the long-term admissions system of record.
