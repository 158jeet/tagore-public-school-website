# Website Production Release and Rollback Runbook

Status: operational template only. No hosting provider, deployment target, DNS account, CDN/WAF, production secret store or release operator is confirmed by this document. No production action is authorised.
Scope: TPS application at repository root and TIER application in apps/tier.

## 1. Release principles

- Git main is the source of truth; release only an identified, reviewed commit.
- TPS and TIER are independently buildable and deployable. A release may include one or both, but record the exact application and commit.
- Never deploy from a developer's uncommitted working tree.
- Do not place secrets in Git, build logs, browser bundles or issue comments.
- A green CI run is necessary but does not prove provider delivery, ERP integration, production health or owner acceptance.
- Production release requires an explicit owner-approved change window and a named operator.

## 2. Environment inventory — must be completed by the hosting owner

For each application, record:

| Item | TPS | TIER |
|---|---|---|
| Production domain | www.tpsgudhagorji.com | www.tieredu.org |
| Hosting/project identifier | Pending | Pending |
| Production branch and commit | Pending | Pending |
| Build command | Confirm from package scripts | Confirm from package scripts |
| Runtime/start command | Pending | Pending |
| Environment variable names (never values) | Pending | Pending |
| Secret store and secret owner | Pending | Pending |
| Health-check URL | Pending | Pending |
| Log/alert destination | Pending | Pending |
| Rollback mechanism/operator | Pending | Pending |
| Backup/restore requirements | Pending | Pending |

Do not add actual secret values to this document. Store credentials only in the approved hosting secret manager and grant least-privilege access.

## 3. Pre-release gates

A release is blocked until all applicable gates are satisfied:

1. Pull request reviewed and merged to main; release SHA recorded.
2. Website CI passes for every application being released on that exact SHA.
3. CodeQL, dependency audit and secret scanning pass on the release SHA.
4. Production build succeeds from a clean checkout using the documented lockfile and supported runtime.
5. Staging smoke tests pass for homepage, navigation, key conversion pages, forms' validation/error states, mobile layouts and 404/robots/sitemap.
6. Accessibility checks pass for keyboard navigation, visible focus, headings, labels, contrast and automated axe checks; manual review covers key journeys.
7. Privacy/content owner approves public facts, consent text, privacy notice, contact destinations and media permissions.
8. Form provider delivery is verified with an authorised test destination. Missing provider credentials or unverified delivery blocks live lead collection.
9. ERP integration, analytics, pixels, maps embeds and marketing automation remain disabled unless their separate contracts, approvals and end-to-end tests are complete.
10. Named owner approves release scope, timing and rollback operator.

## 4. Deployment procedure

1. Announce the intended site(s), change summary, release SHA, expected impact and rollback owner.
2. Confirm the hosting environment is the intended staging or production target.
3. Confirm environment variables and secrets are present in the provider secret store without printing values.
4. Build and deploy the exact merged SHA using the provider's approved workflow.
5. Run smoke tests against the deployed environment:
   - homepage and primary navigation;
   - TPS admissions funnel, parent checklist and visit/hostel guides;
   - TIER connect, choose and partnership pages;
   - sitemap, robots.txt, canonical metadata and noindex behavior;
   - mobile 390px and 320px layouts;
   - form invalid-input and safe failure behavior;
   - no client-side secret leakage or unexpected third-party requests.
6. Verify server logs and error rate; do not submit real family/student data as a test.
7. Record deployment ID, timestamp, operator, commit SHA, test evidence and outcome.
8. Obtain owner acceptance before announcing the site as live or starting campaigns.

## 5. Rollback triggers

Rollback or disable the affected feature if any of the following occurs:

- Site is unavailable or a key route returns persistent server errors.
- Forms misroute enquiries, expose personal data, or report success without confirmed delivery.
- A security secret is exposed or a material security control fails.
- A factual/legal disclosure, privacy notice or consent defect creates material risk.
- A release causes a major mobile/navigation/accessibility regression.
- Error rate or performance breaches the thresholds approved by the hosting owner.

## 6. Rollback procedure

1. Stop campaign traffic or disable the affected feature if safe and technically possible.
2. Notify the release owner and record the incident start time and observed symptoms.
3. Revert to the last known-good deployment using the hosting provider's documented rollback mechanism; do not assume that a Git revert alone reverses an external deployment.
4. If data/schema changes were introduced, follow the separately approved backward-compatible recovery plan. Never run destructive database rollback commands without an authorised backup and owner approval.
5. Re-run the smoke tests against the restored version.
6. Confirm form delivery and routing remain safe; if uncertain, disable collection and show a monitored human contact route.
7. Record cause, impact, affected commit/deployment, recovery time and corrective actions.
8. Re-release only after the failed gate is understood and the fix passes the normal release process.

## 7. Post-release monitoring and evidence

For each release retain:
- release SHA and PR links;
- CI/security run links and conclusions;
- deployment ID and operator;
- pre/post smoke-test results;
- uptime/error/performance observations;
- form-provider test result and recipient approval (never message contents);
- rollback decision and incident record if applicable;
- owner acceptance.

## 8. Current blockers

- Hosting provider and project ownership not recorded.
- Staging and production environments not verified.
- Production secrets and rotation ownership not confirmed.
- Health checks, monitoring, alerting and rollback mechanism not documented for a real host.
- Privacy notice, retention and public-content approvals remain pending.
- Web3Forms key/provider delivery is not configured or end-to-end verified.
- ERP API contract, authentication and sandbox are not verified.
- Analytics IDs, pixels and campaign tracking are not configured or approved.

Until these blockers are resolved, keep production deployment and live lead collection out of scope.
