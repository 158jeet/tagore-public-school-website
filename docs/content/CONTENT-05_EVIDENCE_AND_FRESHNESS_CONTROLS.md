# CONTENT-05 — Factual content evidence and freshness controls

Status: specification and reusable register template. No factual claim is approved for publication by this document alone.
Owner: Tagore Group management must assign a named accountable owner for each record.
Last updated: 2026-11-23

## Purpose

Every material factual statement published on TPS or TIER must be traceable to an authoritative source, reviewed by an accountable person, and rechecked before its review date expires. This process applies to visible page copy, FAQs, metadata, structured data, downloadable documents, campaign pages and image captions.

## Required record fields

Create one record per claim or tightly scoped group of claims. Required fields:

| Field | Requirement |
|---|---|
| Claim ID | Stable unique identifier, e.g. TPS-AFF-001 |
| Site / institution | TPS, TIER, or the named institution |
| Exact claim | The precise wording proposed for publication |
| Claim category | Identity, affiliation, address, contact, programme, eligibility, fee, facility, safety, outcome, award, policy, leadership, event or other |
| Source title and URL/path | Exact official source; internal documents must have controlled repository/file reference |
| Source authority | Issuing authority / document owner; explain why it is authoritative |
| Source date | Publication, issue or effective date, if available |
| Evidence excerpt | Short quotation, page/section or exact data point supporting the claim |
| Accountable owner | Named role/person responsible for accuracy |
| Reviewer / approver | Authorised management reviewer; distinct review for sensitive claims |
| Last verified | Date evidence was checked against the source |
| Next review due | Date the claim must be rechecked |
| Status | Draft, evidence-needed, review-pending, approved, expired, rejected or withdrawn |
| Publication locations | Exact route, component, metadata field or document where used |
| Change history | What changed, who changed it and when |

Do not record personal student information in this register. Store evidence links to access-controlled source documents rather than copying sensitive records into Git.

## Evidence and approval rules

1. Prefer current official issuing-authority records, signed institutional documents, approved policy documents and directly accountable institution records.
2. A search snippet, social post, old brochure, third-party directory or verbal recollection is not sufficient evidence for a high-impact claim.
3. Record the source date and effective period. If the source has no date, mark the limitation and require explicit owner confirmation.
4. Keep the exact evidence excerpt concise and sufficient to reproduce the verification.
5. The person entering a claim cannot self-approve high-impact claims. Require an authorised management reviewer.
6. Never infer admission availability, fee, eligibility, safety certification, affiliation validity, staff credentials, results, awards, rankings or facility availability.
7. Where evidence conflicts, mark the claim review-pending and do not publish until the accountable owner resolves the conflict.
8. When a claim changes, preserve the prior record in change history; do not silently overwrite its provenance.
9. If a claim expires, becomes disputed or loses its source, remove or qualify it promptly and mark it expired/withdrawn.
10. Images require a separate rights/consent record; this register does not grant permission to publish media.

## Review cadence (maximum interval)

| Claim category | Maximum review interval |
|---|---:|
| Admissions open, class availability, event dates, contact routing, office hours | 30 days and on every operational change |
| Fees, eligibility, academic year, transport/hostel terms, policies | 90 days and on every approved revision |
| Leadership, staff roles, facilities, safety arrangements | 180 days and on every material change |
| Affiliation, statutory disclosures, board details, legal identity | 365 days, and immediately when the issuing authority changes the record |
| Historical foundation facts and dated outcomes | 365 days; retain the original dated evidence |
| Testimonials and identifiable-person media | Reconfirm consent and allowed usage before each new use; follow the media rights register |

These are internal maximum intervals, not claims that the information is currently valid. A shorter source expiry or effective date always takes precedence.

## Publication gate

A claim may be published only when all of the following are true:

- Status is approved.
- Source is accessible to the reviewer and directly supports the exact wording.
- Last verified and next review due are recorded; next review due is in the future.
- Accountable owner and authorised approver are recorded.
- Publication locations are listed.
- Any required privacy, legal, safeguarding or media-consent review is complete.

Automated validation is implemented in `scripts/content-governance.mjs` and exercised by `tests/content-governance.test.mjs`. The targeted `Content governance` GitHub Actions workflow runs both the test suite and the live register validation. This is a governance CI gate; it does not itself approve claims or replace management review.

## Stale-claim response

When a claim reaches its review date:
1. Mark it expired pending re-verification.
2. Remove time-sensitive wording from public pages or replace it with a neutral contact route.
3. Recheck the authoritative source and obtain renewed approval.
4. Record the new evidence, reviewer, verification date and next due date.
5. Run the affected route, metadata and structured-data checks before publishing.

For an urgent correction, remove or qualify the claim first; do not wait for the normal review cycle.

## Starter register

No records below are pre-approved. Populate each row only after source evidence and named owner/reviewer are supplied.

| Claim ID | Site / institution | Claim | Source | Owner | Approver | Last verified | Next review due | Status | Publication location |
|---|---|---|---|---|---|---|---|---|---|
| TPS-AFF-001 | TPS | Official affiliation details — exact wording pending source check | Official issuing-authority record required | Unassigned | Unassigned | — | — | evidence-needed | — |
| TPS-CON-001 | TPS | Official phone/email routing — confirm preferred channels | Current management-approved contact record required | Unassigned | Unassigned | — | — | evidence-needed | — |
| TIER-INS-001 | TIER | Current institution portfolio and operating details | Management-approved institution master required | Unassigned | Unassigned | — | — | evidence-needed | — |

## Acceptance criteria for CONTENT-05

- [ ] Management assigns accountable owners and approvers for each institution and claim category.
- [ ] Existing published material is inventoried by route, metadata, structured data and downloadable document.
- [ ] Each material factual claim is linked to evidence and a review date.
- [ ] Expired, unsupported and conflicting claims are flagged and withheld from publication.
- [ ] Sensitive claims receive appropriate independent review.
- [ ] A repeatable stale-content review process is scheduled and has an operational owner.
- [ ] Automated validation is implemented and tested before this workstream is marked complete.

## Boundaries

This register is not a substitute for legal advice, statutory compliance review, child-safeguarding review, privacy review or media consent. It does not authorise public publication, analytics, lead collection, hosting changes or deployment.
