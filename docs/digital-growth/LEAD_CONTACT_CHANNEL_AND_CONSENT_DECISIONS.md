# Lead Contact Channel, Consent and Operational Ownership

Status: decision document; not authorization to collect leads, contact families, or enable messaging.
Last updated: 2026-11-21

## Objective

Define a respectful, auditable process for responding to TPS admissions and visit requests and TIER group enquiries. The website must not promise a response time, route a lead automatically, or send promotional messages until the relevant owner and operating process are approved.

## Channel rules

| Channel | Permitted purpose | Required decision/evidence before activation |
|---|---|---|
| Phone callback | Respond to a specific enquiry where the person requested a call | Approved caller/team, operating hours, callback ownership and wording |
| WhatsApp reply | Reply to a person who explicitly selected/requested WhatsApp for this enquiry | Verified official number, channel-specific consent, approved templates and opt-out handling |
| WhatsApp/SMS campaigns | Optional promotional updates, separate from service response | Separate unbundled opt-in, approved sender/provider, frequency cap, suppression and legal review |
| Email | Send requested information or operational confirmation | Verified sender/recipient ownership, message templates, delivery monitoring and retention |
| Campus visit | Coordinate a requested visit | Staff calendar/owner, confirmation process, directions and reschedule/cancel route |

A phone number supplied for an enquiry is not blanket consent for WhatsApp marketing, SMS campaigns, or repeated follow-up.

## Decisions required from management

1. Name the accountable owner and backup for TPS admissions, campus visits, hostel enquiries and each TIER enquiry category.
2. Confirm official phone numbers, email addresses, WhatsApp Business accounts and who controls each account.
3. Approve contact hours and a realistic first-response target for each category; publish no SLA until staffing can meet it.
4. Approve separate, plain-language consent statements for requested service contact and optional promotional updates.
5. Decide whether WhatsApp is enabled for replies, campaigns, both, or neither; document opt-out handling and suppression.
6. Approve data retention periods, access roles, deletion/request handling and escalation for misdirected enquiries.
7. Confirm whether the website form provider and ERP integration may be used for real enquiries after sandbox tests.

## Minimum consent record

When approved and implemented, retain only what is operationally necessary:
- channel and purpose selected by the person;
- exact consent text/version shown;
- affirmative choice and timestamp (Asia/Kolkata);
- form/source and institution context;
- withdrawal/opt-out timestamp and suppression status where applicable.

Do not infer consent from a filled phone field, a visit to a page, an abandoned form, or a prior unrelated enquiry. Do not place personal information in URLs or analytics events.

## Routing and service workflow

1. Validate and securely receive the enquiry.
2. Assign it to the named institution/category owner.
3. Check the selected channel and purpose before contact.
4. Record first attempt, outcome and next action in the approved operational system.
5. Honour opt-outs and correct misroutes promptly.
6. Escalate unassigned or overdue items to the named backup.
7. Reconcile delivery and response outcomes without exposing personal data in dashboards.

## Release gates

- Written approval of owners, contact channels, hours and service targets.
- Approved privacy notice, retention, consent language and opt-out process.
- Verified provider credentials and authorized test inbox/number.
- ERP API/auth/schema and sandbox independently confirmed before integration.
- Successful duplicate-safe end-to-end tests and a documented failure/rollback procedure.

Until all gates pass, keep provider delivery and campaign messaging disabled. A form submission must not be represented as a confirmed visit, admission, appointment or partnership.

## Explicit non-goals

No covert abandoned-form recovery, fingerprinting, purchased lists, unsolicited WhatsApp/SMS, bundled marketing consent, child profiling, or invented instant-response promises.
