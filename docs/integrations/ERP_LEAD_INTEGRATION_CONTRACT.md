# Website-to-Tagore ERP lead integration contract (proposal)
Status: Draft for joint website/ERP engineering review
Updated: 2026-11-20
Scope: TPS admissions and campus visits; TIER group/institution enquiries.

This document defines a proposed boundary contract only. It does not assert that the ERP API exists, that any endpoint is deployed, or that credentials are configured. The ERP team must confirm route names, authentication, tenant/institution mapping, required fields and response semantics before implementation.

## 1. System boundary and ownership
- Websites collect only the minimum information needed to respond to an enquiry.
- Website server routes call an authenticated ERP API; browsers never call ERP directly.
- Websites must never connect to the ERP database, reuse staff login credentials or expose ERP tokens in client bundles.
- ERP is the system of record for leads, assignments, follow-up, visits, applications and enrolment outcomes.
- Until ERP sandbox acceptance is complete, existing website provider delivery remains a separate, explicitly configured fallback. Do not silently claim ERP receipt.
- The UI may say "received" only after the configured delivery system confirms receipt. A visit is not booked until staff confirm it.

## 2. Proposed versioned lead envelope
The following is a conceptual JSON schema. The final contract must be aligned with the ERP's existing Laravel conventions and validation.

```json
{
  "schema_version": "1",
  "source": {
    "site": "tps",
    "form": "admission",
    "submitted_at": "2026-11-20T09:30:00+05:30",
    "request_id": "server-generated-uuid"
  },
  "contact": {
    "name": "Parent or guardian",
    "mobile": "+91XXXXXXXXXX",
    "email": "optional@example.com"
  },
  "student": {
    "class_seeking": "Class 6"
  },
  "enquiry": {
    "topic": "academics",
    "message": null
  },
  "visit": {
    "preferred_date": null,
    "preferred_time": null
  },
  "institution": {
    "code": "TPS",
    "name": "Tagore Public School"
  },
  "consent": {
    "accepted": true,
    "wording_version": "pending-approval",
    "accepted_at": "2026-11-20T09:30:00+05:30"
  },
  "attribution": {
    "first_touch": {},
    "last_touch": {},
    "landing_path": "/admissions"
  }
}
```

TIER submissions use `source.site = "tier"`, `source.form = "group_enquiry"`, an approved institution code, and an enquiry message. Do not invent class or student fields for TIER submissions. Campus visit uses `source.form = "campus_visit"` and the visit object. The ERP must maintain an explicit mapping table for institution codes rather than trusting arbitrary client-supplied names.

## 3. Field and privacy rules
- Server generates request ID and submission timestamp; client timestamps are never authoritative.
- Validate all values again in ERP; do not trust website validation.
- Mobile is normalized to E.164 where possible, preserving a safe display value if normalization is ambiguous.
- Email is optional and normalized; free-text is length-limited and treated as untrusted text.
- Consent is required for follow-up and must record the exact approved wording version and server receipt time. The current wording/version still needs management/legal approval.
- Do not collect student full name, date of birth, identity numbers, medical information, documents or financial details in the public enquiry form.
- Do not put names, mobile, email, student details or lead IDs in URLs, analytics events or logs.
- Attribution is limited to approved non-personal UTM values and landing path. Do not persist full referrer URLs if they may contain personal data.
- Define ERP retention, access, correction and deletion handling with the approved privacy notice before production lead collection.

## 4. Proposed API behavior
The exact path and auth mechanism must be agreed with the ERP team. Conceptual interface:

`POST /api/integrations/v1/website-leads`

Headers:
- `Authorization: Bearer <dedicated-scoped-server-credential>` OR an agreed request-signature scheme.
- `Idempotency-Key: <server-generated-unique-key>`
- `Content-Type: application/json`
- `X-Request-ID: <uuid>`

The credential must be limited to lead creation, stored only in server secret storage, rotated, and separately scoped for staging/production. Do not use an owner's human login token. Add timestamp/replay protection if request signing is selected.

Expected responses:
- `201 Created` for a newly accepted lead; return opaque ERP lead ID and status.
- `200 OK` for an idempotent replay of the same request; return the original result.
- `400/422` for schema or business validation errors; never echo sensitive values.
- `401/403` for authentication/authorization failure.
- `409 Conflict` only for a documented idempotency/payload conflict.
- `429 Too Many Requests` with `Retry-After` where appropriate.
- `5xx` for temporary ERP failure.

No response should return private student/parent records or internal staff data to the public browser.

## 5. Reliability, duplicate prevention and retries
- Website creates an idempotency key before first delivery and reuses it for retries of the same logical submission.
- ERP enforces uniqueness on the idempotency key and returns the original accepted lead for repeats.
- Retry only network errors, timeouts, 429 (respect Retry-After) and transient 5xx responses.
- Do not retry 4xx validation/auth failures without correcting the request or credentials.
- Use bounded exponential backoff with jitter and a maximum retry window.
- Durable outbox/queue and dead-letter visibility are required before high-volume production. In-memory retry is not durable and is not sufficient.
- If no durable queue exists in the website hosting architecture, return a clear temporary failure and keep the parent able to retry; never show success on an unconfirmed delivery.
- Monitor counts and queue age without exposing PII; alert a named operator on sustained failures.

## 6. Routing and ERP workflow
Proposed routing metadata:
- TPS admission → TPS institution / admissions queue.
- TPS campus visit → TPS admissions/visitor coordination queue with requested date/time clearly marked as unconfirmed.
- TIER institution enquiry → exact institution queue from an ERP-controlled mapping.
- TIER general group enquiry → central group enquiry queue.
- Partnerships/careers should be separate form types and queues if added later.

ERP should own assignment, owner/staff permissions, SLA timers, follow-up notes, call outcomes, visit confirmation/attendance, application status, offer and enrolment. Websites should not implement a second lead database.

## 7. Acceptance test plan
- [ ] ERP publishes a versioned OpenAPI/JSON schema and sandbox endpoint.
- [ ] Separate least-privilege staging credential works; production credential is not present in preview builds.
- [ ] TPS admission, TPS visit and TIER group payloads pass ERP validation.
- [ ] Unknown institution/form codes are rejected.
- [ ] Missing/false consent is rejected; approved wording version and timestamp are retained.
- [ ] Same idempotency key twice creates one ERP lead.
- [ ] Timeout followed by retry does not create a duplicate.
- [ ] 401/403/422 do not trigger blind retries.
- [ ] 429 and transient 5xx use bounded retry behavior.
- [ ] No PII appears in URLs, analytics, logs, error pages or browser bundles.
- [ ] ERP routing, assignment and SLA are verified by the responsible staff.
- [ ] End-to-end test lead is removed/anonymized according to the approved test-data policy.

## 8. Decisions required before implementation
1. ERP API owner, base URL, route and versioning strategy.
2. Authentication/signature method and secret rotation owner.
3. Institution codes and central queue mapping.
4. Exact required fields and whether a guardian mobile can be shared across siblings/leads.
5. Approved consent wording, privacy notice version and retention policy.
6. Idempotency storage, outbox/retry ownership and monitoring destination.
7. ERP response schema and allowed status values.
8. Sandbox access and named acceptance testers.

No endpoint, key, private ERP data or live lead has been accessed or changed as part of this draft.
