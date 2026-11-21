# Campus Visit Conversion — Operating Specification

Status: proposed operating model; not authorization to confirm visits or contact families.
Workstream: GROW-12 / TPS-07 / LEAD-10
Last updated: 2026-11-21

## Purpose

Turn the existing TPS campus-visit request into a reliable, staff-confirmed visit journey. A preferred date/time is a request only. The website must never imply a booking, available slot or confirmed appointment until an authorized staff member confirms it.

## Current website baseline

- TPS has a public `/visit` page and a visit request form.
- The request captures a parent contact, class context, preferred date and broad preferred time (morning/afternoon).
- The server API validates the request and is designed to send it through a server-side provider key.
- The Web3Forms key is not configured, provider delivery is not verified, and no ERP endpoint/sandbox is confirmed.
- The current page explicitly says a staff member must confirm the visit.

## Proposed lifecycle

1. **Request received** — form passes server validation and secure delivery; show only “request received”, never “visit booked”.
2. **Ownership assigned** — route to the approved TPS campus-visit owner and named backup.
3. **Availability checked** — staff consult the authoritative school calendar; website must not invent or expose staff availability.
4. **Confirmation offered** — staff contacts the parent through the requested/approved channel and confirms a specific date/time, meeting point and relevant visit instructions.
5. **Parent confirms** — record acceptance; if the proposed slot is unsuitable, return to scheduling.
6. **Reminder** — send only after channel, template, sender and timing are approved; do not enable automatic reminders by default.
7. **Visit outcome** — staff records attended, rescheduled, cancelled, no-show or unable-to-contact in the approved operational system.
8. **Follow-up** — any admissions follow-up is purpose-limited and respects the contact choice and opt-out.

## Minimum operational fields

Keep the initial web form minimal. The operational record may contain:
- opaque request/lead ID;
- institution and request type;
- parent contact details already supplied;
- requested date and broad time window;
- assigned owner and backup;
- status and status-change timestamps;
- confirmed date/time only after staff confirmation;
- channel/purpose consent evidence;
- attendance outcome and next-action date.

Do not collect child DOB, identity documents, marks, health data or sensitive records to arrange a first visit. Do not place personal details in URLs, analytics events or public calendars.

## Status model

| Status | Meaning | Parent-facing wording |
|---|---|---|
| Received | Request securely accepted by the service | “Your request has been received; the school team must confirm it.” |
| Assigned | Staff owner identified | No automatic status message unless approved |
| Contact attempted | Authorized contact attempt recorded | No booking implication |
| Slot proposed | Staff offered a time; parent has not accepted | “Please confirm whether this time works.” |
| Confirmed | Staff and parent agreed on exact time | “Your campus visit is confirmed for…” |
| Reschedule requested | Parent or school needs another time | “The visit is not yet rescheduled.” |
| Attended | Visit took place | Internal outcome |
| Cancelled / No-show / Closed | Final operational outcome | Neutral, respectful wording |

## Ownership and service levels

Management must name:
- primary TPS visit coordinator;
- backup owner and escalation recipient;
- contact hours and approved contact channel;
- realistic first-attempt target and escalation threshold;
- who may confirm, change or cancel a visit.

Do not publish or automate a response SLA until staffing capacity is demonstrated and the target is approved in writing.

## Reminder and cancellation rules

- A reminder is permitted only for a confirmed visit and an approved contact channel.
- Include date, time, location/meeting point and a human reschedule route.
- Do not send promotional content in an operational reminder.
- Record cancellation/reschedule requests promptly and suppress reminders for cancelled visits.
- Provide an accessible human contact route if digital delivery fails.

## Acceptance tests

- A successful form response says “request received”, not “booked”.
- Provider failure is visible and offers a human contact alternative.
- Duplicate submissions do not create duplicate confirmed visits.
- Only authorized staff can create or alter a confirmed slot.
- Parent acceptance is recorded before status becomes Confirmed.
- Reschedule/cancel actions suppress stale reminders.
- Consent, contact purpose and opt-out are auditable.
- Mobile, keyboard, screen-reader and reduced-motion journeys remain usable.

## Release gates

1. Named owner and backup, approved contact hours and SLA.
2. Authoritative staff calendar and confirmation process.
3. Approved privacy notice, retention, consent wording and reminder templates.
4. Verified provider credentials and authorized test inbox/number.
5. ERP API/auth/schema and sandbox independently confirmed if ERP is used.
6. Duplicate-safe end-to-end tests, monitoring and rollback procedure.

Until these gates pass, retain the current request-only language and do not activate calendar integrations, automated reminders, provider delivery or ERP writes.
