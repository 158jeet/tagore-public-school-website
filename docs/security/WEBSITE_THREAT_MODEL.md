# Tagore public websites — security threat model
Updated: 2026-11-20. Applies to TPS (repository root) and TIER (`apps/tier`).

## Security objectives
Protect parent/enquirer personal information; keep public sites available without exposing administrative/ERP surfaces; ensure acknowledgements reflect confirmed delivery; preserve integrity of school facts and media rights; make releases reviewable, reversible and observable.

## Assets and trust boundaries
| Asset | Sensitivity | Boundary |
|---|---|---|
| Parent name, phone, email, enquiry | Personal | Browser → website API → approved provider / ERP |
| Consent choice and wording version | Compliance evidence | Form → server → approved lead system |
| Provider/ERP credentials | Secret | Deployment secret store → server only |
| Public content, logos, media | Integrity / rights | Git/CMS → build → CDN |
| CMS accounts and publishing rights | Privileged | Staff identity → CMS → content |
| CI/dependencies/deployment artifacts | Supply-chain | PR → Actions → release |
| DNS, TLS and hosting control plane | Critical | Registrar / DNS / hosting |

## Threats and controls

### Public forms
Threats include spam, automation, oversized payloads, cross-origin submissions, malformed data, injection, duplicate requests, provider outage and false-success messages.
Existing controls: strict origin validation, bounded streaming request body, server-side validation and allowlists, honeypot, form timing checks, provider timeout, generic errors, no-store responses and negative-path tests.
Next controls: edge/distributed rate limiting, idempotency, durable retry/outbox, delivery monitoring, data minimization and retention. Never log full request bodies, phone numbers, emails or free-text messages.

### Credentials and access
Threats: leaked API keys, browser-bundle exposure, overprivileged staff access and account takeover.
Controls: server-only secrets; never expose credentials via `NEXT_PUBLIC_*`; least privilege; MFA for future CMS; secret scanning; rotation and audited recovery. No public admin surface until an authenticated CMS is approved.

### CI and supply chain
Threats: compromised dependencies/actions, malicious PRs, secret exposure and unreviewed release.
Controls: lockfiles and `npm ci`, Dependabot, CodeQL, dependency audits, pinned Actions SHAs, Gitleaks, independent TPS/TIER builds.
Next: required branch checks where permissions allow, artifact provenance, dependency update review and release approval.

### Browser and content delivery
Threats: clickjacking, MIME sniffing, referrer leakage, XSS, unsafe embeds, third-party tracking and mixed content.
Existing: security response headers and CSP Report-Only.
Next: inspect CSP reports, remove unnecessary third parties, define nonce/hash policy and enforce CSP only after staging validation. Verify actual deployed response headers, not just source configuration.

### Child safety and content integrity
Threats: fabricated claims, unauthorized student images/testimonials, disclosure of child data and misleading facility/safety claims.
Controls: evidence owner and review date for factual claims; documented media consent; no student personal data; no ad personalization, session replay or child tracking.
Next: approve privacy notice, retention schedule, grievance contact and content publication workflow.

### DNS, hosting and release
Threats: unauthorized DNS changes, insecure TLS, accidental production release, outage and untested rollback.
Controls: preview/staging first, separate secrets, no direct ERP database access, production approval and rollback plan. WAF/DNS rules remain proposed until topology is confirmed; never alter live DNS without owner approval.

## Risk register
| Risk | Current state | Release gate |
|---|---|---|
| Durable rate limiting | In-memory limits unsuitable for multi-instance hosting | Edge/distributed limit configured and tested |
| Form delivery | Provider key absent; APIs intentionally return unavailable | End-to-end test with approved destination |
| ERP integration | Contract only; no live endpoint configured | Authenticated sandbox, idempotency and retry proof |
| CSP | Report-Only | Reports reviewed and enforced policy tested on staging |
| Facts and media rights | Owner inputs pending | Claims, logos, photos and disclosures approved |
| CMS | No CMS/admin surface selected | Secure access model approved before adding CMS |
| Production topology | Not verified | Staging, monitoring, backup and rollback proven |

## Security acceptance evidence
- CI, CodeQL, dependency audit and secret scan pass for both apps.
- Enquiry abuse/negative-path tests pass.
- Staging headers and CSP verified from real browser/network responses.
- Rate limits, provider outage and safe retries tested.
- No secrets in client bundles, logs or repository scan.
- Privacy/consent, retention, image rights and incident contacts approved.
- Restore and rollback procedure exercised.

This engineering threat model is not legal advice and does not claim every listed control is deployed.
