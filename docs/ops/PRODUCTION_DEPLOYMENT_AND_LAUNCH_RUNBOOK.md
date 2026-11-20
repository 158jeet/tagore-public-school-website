# Production deployment and launch-readiness runbook

Updated: 2026-11-20

## Purpose and safety boundary

This runbook describes the release process for the two independently deployed Next.js applications in this repository:

- TPS: repository root; canonical host `https://www.tpsgudhagorji.com`
- TIER: `apps/tier`; canonical host `https://www.tieredu.org`

It is a deployment plan, not authorization to change DNS, cPanel, hosting, Cloudflare, production secrets, or either live website. Do not point either domain at this rebuild until the owner has approved the content, assets, hosting target, forms, privacy notice and release acceptance.

## 1. Environments and indexing

Maintain separate preview/staging and production environments for each application.

| Setting | TPS | TIER | Handling |
|---|---|---|---|
| `SITE_INDEXING_ENABLED` | `true` only after approved production launch | `true` only after approved production launch | Server-side environment variable; unset/false in preview and staging |
| `NEXT_PUBLIC_SITE_URL` | `https://www.tpsgudhagorji.com` | `https://www.tieredu.org` | Public canonical base URL; set at build/runtime according to hosting model |
| `WEB3FORMS_ACCESS_KEY` | Required for enquiry delivery | Required for group enquiry delivery | Secret; configure only in server environment, never in browser code, Git, build args, issue comments or logs |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional, digits with country code | Not currently used by TIER | Public contact-routing value, not a secret; verify the number and ownership before setting |

The smoke-test CI intentionally starts the production server with indexing disabled. Indexing opt-in is not access control: staging must also be protected from public access using the hosting platform's access controls if it contains non-public content.

## 2. Pre-deployment gates

Do not deploy until every applicable item is checked and the owner signs off.

- [ ] Confirm the production hosting platform, account owner, deployment region, runtime support and rollback method.
- [ ] Confirm the domain/DNS owner and document current records before proposing any change.
- [ ] Confirm both sites have separate staging and production environment scopes.
- [ ] Confirm approved logo files, brand usage, authentic campus media and documented image permissions.
- [ ] Verify school/group contact numbers, email routing, institution names, board/affiliation, address, classes, eligibility, academic-year availability and all public claims.
- [ ] Approve the privacy notice, consent language, retention period, grievance contact and child-safety review.
- [ ] Configure the enquiry provider key as a server-only secret and complete a real end-to-end delivery test to the approved recipient.
- [ ] Confirm staff ownership, response-time SLA, spam handling and a monitored fallback contact route.
- [ ] Review the current legacy URL migration workbook and prepare redirects from the supplied old URL inventory.
- [ ] Confirm current CI, CodeQL, dependency audit and secret-scan checks are green on the exact release commit.
- [ ] Complete mobile, keyboard, screen-reader, accessibility, performance and cross-browser acceptance on staging.
- [ ] Take a restorable backup of the current live sites and record the restore procedure before DNS cutover.

A green build does not prove that enquiry delivery, factual content, privacy compliance, accessibility or production hosting is ready.

## 3. Build and release procedure

Run each application independently from its own directory.

TPS:
```sh
npm ci
npm run typecheck
npm run test:security
npm run test:forms
npm run test:config
npm run lint
npm run build
npm run test:smoke
```

TIER:
```sh
cd apps/tier
npm ci
npm run typecheck
npm run lint
npm run build
SMOKE_APP=tier npm run test:smoke
```

For TPS, run the smoke test with `SMOKE_APP=tps`. CI runs both smoke tests after each production build. Use the exact commit SHA that passed CI for deployment; do not deploy an unreviewed working tree or a branch head that has not passed the release checks.

Suggested release sequence:

1. Deploy TPS and TIER to separate staging targets.
2. Configure staging canonical URLs and keep `SITE_INDEXING_ENABLED` unset/false.
3. Validate all routes, headers, robots, sitemap, forms and responsive layouts.
4. Test enquiry delivery with a clearly identified internal test submission; verify the receiving inbox and staff workflow.
5. Obtain owner approval for content, privacy, security and operations.
6. Deploy to production with the correct canonical URL and server-only provider secret.
7. Verify HTTPS, redirects, headers, canonical URLs, robots, sitemap, forms and monitoring.
8. Set `SITE_INDEXING_ENABLED=true` only after the production host and public content are verified.
9. Submit the production sitemap to the approved search property after launch approval.

## 4. Security and edge protection

- Keep secrets in the hosting provider's encrypted environment/secret store. Restrict who can read or change production secrets; rotate them after suspected exposure or staff/vendor changes.
- Keep TLS enabled end-to-end. If a CDN/reverse proxy is used, configure strict origin TLS and prevent direct public access to the origin where the platform supports it.
- Keep the existing response security headers. The current CSP is Report-Only; review real staging violations before proposing enforcement. Do not blindly tighten it in production because that can break forms, fonts, styles or framework runtime.
- Evaluate the host/CDN's managed WAF, bot protection and request-rate controls for `POST /api/enquiry`. Start with a conservative threshold and test false positives. Do not rely on in-process memory rate limiting for a serverless or multi-instance deployment.
- Do not add CAPTCHA, third-party analytics, pixels, session replay or external scripts without privacy review and explicit approval.
- Keep the API body-size, origin, validation, honeypot and timing controls. These are layered checks, not a substitute for edge rate limiting or operational monitoring.
- Never expose provider keys through `NEXT_PUBLIC_*`, client bundles, source maps, URLs, analytics, screenshots or error messages.

## 5. Monitoring and incident response

At minimum, monitor:

- HTTP availability and latency for each site's key routes.
- HTTP 4xx/5xx rates, especially `POST /api/enquiry` (403, 413, 502 and 503).
- Provider delivery failures and the receiving mailbox's successful receipt of test enquiries.
- WAF/rate-limit blocks and false positives.
- Certificate expiry, DNS changes, deployment failures and unexpected indexing signals.
- Backup completion and restore-test date.

Do not log enquiry bodies, parent/student names, mobile numbers, email addresses, child details, provider keys or session tokens. Logs should use request IDs and aggregate counts where possible.

Incident response:
1. Preserve the failing release SHA, timestamps, sanitized logs and provider status.
2. Disable a compromised secret at the provider and rotate it in the hosting secret store.
3. Roll back to the last known-good release if the issue affects availability or data protection.
4. If form delivery is unavailable, publish/use the approved phone/WhatsApp fallback and notify the admissions owner.
5. Record the incident, cause, corrective action and retest evidence before redeployment.

## 6. Rollback and recovery

- Keep the last known-good deployment for each app independently.
- Roll back the affected app without forcing a rollback of the other app unless a shared dependency requires it.
- Preserve DNS records and the previous hosting configuration before cutover.
- Confirm that a rollback restores working pages, headers, canonical URLs and enquiry routing.
- Re-run the smoke tests and an internal enquiry delivery test after recovery.
- Do not delete old hosting files or databases until the owner confirms retention and the backup restore test has passed.

## 7. Required owner-provided inputs

The following remain external blockers and must not be guessed:

- Hosting provider and target environment details, plus authorized deployment access through a secure channel.
- Approved production contact routing and enquiry recipient(s).
- Provider access key configured directly in the hosting secret store (never pasted into GitHub issues or chat).
- Approved logos, brand guide, prospectus/disclosures, authentic media and permissions.
- Legacy website file backups, SQL exports, sitemap/robots/redirect files and Search Console or analytics landing-page URL exports.
- Written approval of privacy notice, retention, consent, accessibility and factual content.
- Release approval and agreed DNS cutover window.

## 8. Current status

This runbook is documentation only. No hosting, production secrets, DNS, CDN/WAF, analytics, email routing or live website settings have been changed. The enquiry APIs return a controlled `503` when `WEB3FORMS_ACCESS_KEY` is absent; forms must not be represented as operational until real delivery is verified.
