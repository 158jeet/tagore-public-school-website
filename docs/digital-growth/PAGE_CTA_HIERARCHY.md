# Website primary and secondary conversion action map

- **Status:** Implementation baseline for CRO-01
- **Date:** 2026-11-21
- **Measurement:** No analytics, pixels, personal-data tracking or A/B tests are enabled by this map.

This document defines the intended next action for each existing high-intent page. It is a UX contract, not a claim that enquiry delivery, staff response or booking operations are live.

## Tagore Public School (TPS)

| Page / audience | Primary action | Secondary action | Expected behavior / guardrail |
|---|---|---|---|
| Homepage — prospective families | Explore admissions | Parent Decision Centre / campus visit | Lead to the admissions journey; no admission or seat guarantee |
| Admissions — parents/guardians | Submit an admissions enquiry | Explore stage guides / request a visit | Carry selected class/topic into the form; enquiry is not admission |
| Admissions funnel — high-intent families | Enquire about admission | Plan a campus visit | Primary CTA scrolls to enquiry form; visit remains a separate request |
| Parent Decision Centre — researching parents | Continue to admission enquiry | Request a campus visit | Carry selected class/topic as context only; do not infer eligibility |
| Stage pathway pages — early years through senior secondary | Select the class and ask the school | Parent Decision Centre / campus visit | Pre-fill class only; current availability, fees and eligibility are confirmed by staff |
| Admissions FAQ — information-seeking parents | Ask an admission question | Request a campus visit | Search is self-service guidance; direct confirmation remains available |
| Campus visit — visiting families | Request a preferred visit slot | Admissions enquiry | A requested slot is not a confirmed booking |
| Parent checklist / hostel / visit guides | Continue to an enquiry or visit request | Read related guidance | Guides support a decision; no unverified facility or service claim |

## Tagore Group (TIER)

| Page / audience | Primary action | Secondary action | Expected behavior / guardrail |
|---|---|---|---|
| Group homepage — families, learners and institutions | Choose a pathway | Explore institutions / connect | Help visitors identify the right institution; do not imply automatic routing |
| Institution directory — prospective families | Explore an institution | Compare published pathways | Comparison shows only current directory summaries; it is not a ranking |
| Institution profile — families and learners | Contact the group about this institution | Return to all institutions | Current programme, affiliation, fees and availability require institutional confirmation |
| Choose pathway — families and learners | Open the relevant institution pathway | General group enquiry | Pathway selection provides context, not a guaranteed recipient or response time |
| Group help — information seekers | Open the relevant answer pathway | General group enquiry | Searchable FAQ remains deterministic; no unapproved AI assistant |
| Connect — families, candidates and partners | Select the matching enquiry route | General contact | Preserve the selected pathway in the enquiry context; do not promise a response SLA |
| Partnerships — institutions | Discuss a partnership | General group contact | A submission is an enquiry, not partnership approval or meeting confirmation |
| Start / QR gateway — offline visitors | Select the information pathway | Human contact route | No login, tracking or lead capture on the gateway; QR distribution requires separate approval |

## Shared interaction rules

1. Each page has one visually dominant primary action; secondary actions remain available but do not compete with it.
2. Labels describe the actual next step (for example, “Request a visit”, not “Book a visit” unless a booking is confirmed).
3. A form submission is not represented as a completed admission, confirmed appointment, accepted partnership or successful delivery unless the relevant system confirms it.
4. Preserve non-sensitive context such as selected class or enquiry pathway; never put a person's name, phone number, student identifier or other personal data in a URL.
5. Every action must have a working destination, keyboard-accessible focus state and clear error/success/pending wording.
6. Do not add conversion tracking until privacy, consent, retention and provider approvals are complete.
7. Revisit this map when the owner confirms official contact routing, campus-visit ownership, form delivery and ERP lead handling.
