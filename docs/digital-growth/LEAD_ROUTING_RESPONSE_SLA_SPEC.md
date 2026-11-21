# Lead Routing and Response SLA — Operating Specification

Status: proposed model; no routing automation, SLA promise or ERP dashboard is enabled.
Workstreams: GROW-19 / GROW-07 / LEAD-10–13
Last updated: 2026-11-21

## Objective

Ensure every legitimate website enquiry reaches an accountable human team, receives a timely first attempt and has a traceable next action. The system must distinguish a request from a confirmed appointment, application or enrolment.

## Routing categories

| Institution/context | Proposed owner | Required management decision |
|---|---|---|
| TPS admission | TPS admissions coordinator | Name primary and backup |
| TPS campus visit | Campus visit coordinator | Confirm calendar authority |
| TPS hostel/residential | Hostel admissions owner | Name primary and backup |
| TIER institution discovery | Group office / institution contact | Verify recipient per institution |
| TIER partnership | Group leadership contact | Name accountable decision-maker |
| TIER careers | HR/recruitment owner | Confirm approved hiring inbox |
| General/community | Group office | Confirm triage owner |

These are role placeholders, not assignments to named people. A pathway selection on the website is context only and does not guarantee routing until recipients are verified.

## Lifecycle and controls

1. Receive and validate the enquiry.
2. Create one canonical lead using a stable idempotency key.
3. Assign by institution and category using an approved, versioned routing table.
4. Notify only the assigned owner through an approved internal channel.
5. Record first contact attempt, outcome and next action.
6. Escalate unassigned or overdue items to the named backup.
7. Close with a controlled outcome: enrolled, not proceeding, duplicate, invalid/spam, unable to contact, or other approved reason.
8. Preserve a private audit trail of assignment, status and consent changes.

Do not automatically message a parent through WhatsApp/SMS or infer marketing consent from a phone field.

## SLA design

Management must choose separate targets for:
- assignment after receipt;
- first contact attempt during approved contact hours;
- escalation to backup;
- resolution of provider delivery failures.

SLA clocks should pause outside approved contact hours and on public holidays if that is the approved policy. Measure actual first attempt, not successful contact; report contact rate separately. Do not publish “instant response” or “within X minutes” until capacity is proven over a representative pilot.

## Proposed dashboard

Owner-facing aggregate metrics:
- new/unassigned leads by institution and category;
- oldest unassigned item and queue age;
- first-attempt SLA met/missed;
- overdue follow-up tasks;
- contact attempt and contact-success rates;
- visit requested / proposed / confirmed / attended;
- application and enrolment outcomes by cohort;
- duplicate, invalid and provider-failure rates;
- consent withdrawal and channel opt-out counts.

Access controls:
- owner-level cross-institution view only for explicitly authorized roles;
- institution staff see only their assigned institution/category;
- no student/parent contact details in aggregate KPI tiles;
- row-level personal data visible only to staff with an operational need;
- every sensitive record access and status change auditable.

## Minimum event record

- opaque lead ID;
- institution/category;
- assigned owner/backup role;
- received, assigned, first-attempt and next-action timestamps;
- current status and controlled outcome;
- approved contact channel/purpose and consent reference;
- provider delivery status and safe error code;
- attribution fields only after GROW-17 and privacy approval.

Avoid raw provider payloads, secrets, full request bodies, IP addresses and child-sensitive data in dashboard logs.

## Acceptance criteria

- Every accepted enquiry has exactly one canonical lead or a visible safe failure state.
- Duplicate retries do not create duplicate leads or duplicate parent contact.
- Routing table is versioned and owner-approved.
- Unassigned/overdue leads have an escalation path.
- Institution access is enforced server-side, not merely hidden in the UI.
- SLA metrics use approved contact hours and transparent denominators.
- Parent contact and consent details are excluded from aggregate views.
- Audit events cover assignment, reassignment, status, contact attempts and opt-outs.
- Provider failure and ERP unavailability are monitored without exposing personal data.

## Release gates

1. Named accountable owners and backups for every category.
2. Approved contact hours, realistic SLA and escalation policy.
3. Approved privacy notice, consent, retention and access matrix.
4. Confirmed ERP endpoint/auth/schema/sandbox and idempotency design.
5. Verified provider credentials and authorized end-to-end test.
6. Security review, audit logging, alerting and rollback plan.

Until all gates pass, treat routing and SLA as proposed operating design only. Do not claim a live lead dashboard or automated follow-up.
