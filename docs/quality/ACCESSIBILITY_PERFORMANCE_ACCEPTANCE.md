# Website accessibility, performance and browser acceptance
Updated: 2026-11-20. Applies independently to TPS and TIER.

## Cross-browser browser baseline (follow-up to PR #44)
- The CI browser suite runs against Chromium, Firefox and WebKit on Ubuntu 24.04 for each app.
- Each tested route is checked at 390px and 320 CSS px for horizontal overflow.
- Existing form and directory interactions, keyboard focus, runtime errors and axe-core WCAG 2.2 A/AA scans run in each engine.
- This does not certify Safari/iOS, Edge on Windows, real Android devices, screen readers or 200% browser zoom; those remain manual/device-matrix acceptance items.

## Automated browser baseline (PR #44)
- GitHub CI runs pinned Playwright Chromium and axe-core against both production builds.
- TPS routes: `/`, `/parent-guide`, `/admissions`, `/visit`; TIER routes: `/`, `/institutions`, `/contact`.
- Automated interactions cover 390px mobile reflow, initial keyboard focus, parent-guide class/topic context, admission and campus-visit native required-field validation, TIER category/search/clear filters, group-enquiry required-field validation and browser runtime errors.
- axe-core scans WCAG 2.2 A/AA rule tags on each route. Serious and critical findings fail CI; moderate and minor findings are reported as warnings for triage.
- Automated checks do not constitute a complete WCAG 2.2 AA audit. They do not replace manual screen-reader testing, full keyboard review, 320px reflow, 200% zoom, reduced-motion checks or the cross-browser/device matrix below.
- Form tests stop at client-side validation; they do not submit real enquiries or prove provider/ERP delivery.

## Performance targets
Measure production-like staging on mobile and desktop; use field data when available.

| Metric | Target | Interpretation |
|---|---:|---|
| Largest Contentful Paint | ≤ 2.5 s | 75th percentile field target |
| Interaction to Next Paint | ≤ 200 ms | 75th percentile field target |
| Cumulative Layout Shift | ≤ 0.1 | 75th percentile field target |
| Lighthouse performance | ≥ 90 | Representative mobile lab target, not field-data substitute |
| Route JavaScript | Minimize | Prefer server components and progressive enhancement |
| Images | AVIF/WebP where supported | Responsive sizes, dimensions and useful alt text |
| Third parties | None by default | Add only approved, consent-aware services |

## WCAG 2.2 AA checklist
- [~] Playwright verifies initial keyboard focus on the homepage; complete keyboard operation and no-trap review remains manual.
- [~] Initial visible focus is browser-tested; full focus visibility and logical order review remains manual.
- [~] axe-core scans key routes for WCAG A/AA contrast; serious/critical findings block CI, while lower-impact findings require triage and manual review.
- [~] axe-core and browser form checks cover key enquiry forms; full form and screen-reader review remains pending.
- [ ] Validation errors identify fields and explain recovery.
- [ ] Submission and failure messages announced to assistive technology.
- [ ] Controls expose accessible name, role, value and state.
- [ ] Semantic headings, landmarks, lists and links.
- [ ] Touch targets usable on mobile and satisfy WCAG 2.2 requirements or documented exceptions.
- [~] Automated reflow checks at 320 CSS px in Chromium, Firefox and WebKit on key routes; full page and device review remains pending.
- [ ] Zoom to 200% retains content and functionality.
- [ ] Reduced-motion preference respected.
- [ ] Images have useful alt text or empty alt when decorative.
- [ ] No color-only status/instructions; page language declared; unique descriptive titles.

## Critical user journeys

### TPS
1. Homepage → Parent Guide → choose class/topic → admissions form.
2. Parent Guide → FAQ → expand/collapse → admissions enquiry.
3. Homepage → Campus Visit → request visit → understand pending confirmation.
4. Mobile navigation → admissions, visit and contact.
5. Invalid form, provider missing, slow provider and successful provider response.

### TIER
1. Homepage → Institutions → search/filter → institution profile.
2. Empty search → clear filters → all institutions return.
3. Institution profile → group contact form.
4. Mobile navigation → institution directory/contact.
5. Invalid form, provider missing, slow provider and successful provider response.

## Browser/device matrix
- [~] Chromium, Firefox and WebKit engines are exercised in Ubuntu CI; Windows Chrome/Edge and actual Safari/iOS remain unverified.
- [ ] Safari on macOS/iOS where available.
- [ ] Android Chrome at 360–430 px.
- [ ] Tablet widths and landscape.
- [ ] Keyboard-only navigation and one screen-reader pass.
- [ ] Slow 4G/throttled network and reduced-motion preference.

## SEO/content checks
- [ ] Unique title, description and canonical per indexable page.
- [ ] Correct robots and sitemap host for each domain.
- [ ] No broken internal links, empty CTA destinations or redirect loops.
- [ ] Structured data matches visible verified content.
- [ ] No fabricated claims, unauthorized student media or stock images represented as campus.
- [ ] No personal data in URLs, analytics or third-party logs.

## Release evidence
Attach per app: Lighthouse mobile/desktop reports; automated CI and browser journey evidence; accessibility findings and resolved exceptions; test form delivery; SEO crawl/redirect results; open issues, severity, owner and explicit risk acceptance.

A green Lighthouse score alone is not a substitute for real-device, accessibility or journey testing.
