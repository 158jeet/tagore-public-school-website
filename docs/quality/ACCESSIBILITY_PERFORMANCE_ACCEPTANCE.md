# Website accessibility, performance and browser acceptance
Updated: 2026-11-20. Applies independently to TPS and TIER.

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
- [ ] All content and controls keyboard-operable; no keyboard traps.
- [ ] Visible focus and logical focus order.
- [ ] Text and controls meet WCAG AA contrast.
- [ ] Inputs have programmatic labels and required/optional status.
- [ ] Validation errors identify fields and explain recovery.
- [ ] Submission and failure messages announced to assistive technology.
- [ ] Controls expose accessible name, role, value and state.
- [ ] Semantic headings, landmarks, lists and links.
- [ ] Touch targets usable on mobile and satisfy WCAG 2.2 requirements or documented exceptions.
- [ ] Reflow at 320 CSS px without unnecessary horizontal scrolling.
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
- [ ] Current Chrome and Edge on Windows desktop.
- [ ] Current Firefox desktop.
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
