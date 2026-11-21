# Referral, Community and QR Acquisition Playbook

Status: specification only; no campaign, incentive, QR destination or public distribution is approved.
Workstreams: GROW-14 / GROW-22
Last updated: 2026-11-21

## Objective

Make existing community and offline outreach measurable without turning families, students or staff into unsolicited sales channels. Every campaign must have a useful destination, an accountable owner and a clear privacy boundary.

## Eligible campaign types

- Parent information sessions and campus open days.
- Village/community outreach material.
- Printed admissions checklists and campus-visit guides.
- Alumni/community awareness where participation is voluntary.
- Institution partnership information.
- Event registration only after the event, capacity and owner are verified.

Referral incentives, discounts, commissions, gifts or preferential admission are explicitly out of scope until separately approved in writing and reviewed for fairness, legal compliance and safeguarding.

## QR destination rules

Each QR should resolve to a first-party HTTPS landing page or approved short link. The destination must:
- explain the institution and purpose in plain language;
- identify the campaign context without exposing the distributor's identity;
- work without login and on low-bandwidth mobile devices;
- offer a clear human contact path;
- avoid unsupported admission, fee, result or availability claims;
- remain useful if campaign measurement is disabled.

Use opaque campaign codes such as `src=community`, `med=print`, `cmp=campus_open_day_2027`. Do not encode names, phone numbers, student IDs, class rosters, household IDs or other personal information in the URL or QR payload.

## Referral experience

A voluntary referral may be recorded only when the referred person independently submits an enquiry and the approved form asks an optional, minimal “How did you hear about us?” source question. Do not require the referrer's name or phone number. Do not upload address books, scrape contacts, infer relationships or message a referred person before they contact the school.

If a referral code is used:
- use a random, non-identifying campaign token;
- do not grant admission preference or imply guaranteed benefit;
- document expiry and misuse controls;
- disclose any approved incentive before participation;
- allow an enquiry without a referral code.

## Campaign taxonomy

| Parameter | Meaning | Example |
|---|---|---|
| `utm_source` | Broad origin | `community`, `parent_session`, `print` |
| `utm_medium` | Channel type | `qr`, `offline`, `referral` |
| `utm_campaign` | Approved campaign slug | `campus_open_day_2027` |
| `utm_content` | Creative/placement variant | `poster_a`, `brochure_front` |

Use lowercase ASCII slugs, stable values and no personal data. Do not add `utm_term` for child/student attributes or sensitive characteristics. Never put contact details or free-text enquiry content in query parameters.

## Measurement boundaries

- Count aggregate visits and qualified enquiries only after analytics and privacy approval.
- Store source/campaign in the lead record only after an approved ERP contract exists.
- Do not join device identities across TPS and TIER domains by default.
- Do not use fingerprinting, abandoned-form identification or purchased lists.
- Do not expose referral attribution to other families or public leaderboards.
- Define retention and deletion before collecting any campaign-level identifiers.

## Print and distribution QA

Before release, verify:
1. Destination URL and redirect are first-party, HTTPS and correct.
2. QR scans on current Android and iOS devices and at realistic print sizes.
3. Printed URL fallback is readable and matches the QR destination.
4. Page loads on slow mobile connections and has no login requirement.
5. Campaign slug, dates, owner and approved copy are correct.
6. No personal data or unapproved incentive is embedded in the QR.
7. Expired campaign destinations redirect to a useful evergreen page, not a dead end.

## Approval checklist

- Campaign purpose, audience and owner approved.
- Landing page content and institution facts verified.
- QR/short-link destination and expiry approved.
- Referral question and privacy notice approved.
- Any incentive separately approved and reviewed.
- Analytics and ERP attribution separately approved and tested.
- Print proof signed off before distribution.

## Non-goals

No paid acquisition, referral rewards, public QR distribution, marketing automation, unsolicited messaging, contact scraping, cross-site identity stitching or analytics activation is authorized by this document.
