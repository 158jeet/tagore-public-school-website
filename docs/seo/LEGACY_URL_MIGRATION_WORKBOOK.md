# TPS and TIER legacy URL migration workbook
Updated: 2026-11-20. Preserve search traffic and inbound links while rebuilding both sites cleanly.

## Required source material
- Full cPanel backups and SQL exports for both existing sites (reference/content recovery only).
- Current `sitemap.xml`, `robots.txt`, `.htaccess` and redirect rules.
- Search Console page/query exports and Analytics landing-page exports where available.
- Backlink/landing-page exports, prospectus and disclosure URLs.
- Approved destination URL inventory for the new TPS and TIER sites.

Do not copy legacy code or untrusted scripts into the new build. Never place passwords, DB credentials, OTPs or private personal data in Git or issues.

## URL inventory template
| Legacy host | Legacy path | Evidence/source | Clicks/impressions/backlinks | Intent | New destination | Action | Status | Reviewer |
|---|---|---|---:|---|---|---|---|---|
| TPS | TBD | Sitemap / Search Console | TBD | TBD | TBD | 301 / retain / retire | Blocked | TBD |
| TIER | TBD | Sitemap / Search Console | TBD | TBD | TBD | 301 / retain / retire | Blocked | TBD |

## Mapping rules
1. Map valuable URLs to the closest equivalent destination, not automatically to homepage.
2. Normalize path and trailing-slash behavior consistently; preserve query semantics only when needed.
3. Use one-hop permanent redirects; avoid chains, loops and broad catch-all redirects.
4. Retain legacy content only if useful, accurate, authorized and maintained.
5. Return 404/410 for genuinely removed content without a useful replacement.
6. Preserve PDFs/disclosures only after verifying current approved documents.
7. Ensure canonical URLs point to final destinations and agree with redirects.
8. Test www/non-www, HTTP→HTTPS, trailing slash, encoded paths and legacy query strings.
9. Record source, target, reason, owner and test evidence for every redirect.
10. Keep legacy hosting available until cutover acceptance and rollback window close.

## Validation
- [ ] Every source URL has an explicit action.
- [ ] No high-value URL omitted without review.
- [ ] Every 301 target returns 200 and matches original intent.
- [ ] No redirect chain, loop or cross-domain mistake.
- [ ] Canonical tags, sitemap entries and robots rules agree.
- [ ] Sitemaps contain only canonical indexable URLs.
- [ ] Search Console properties verified and sitemaps submitted after owner approval.
- [ ] Post-cutover crawl and 404 monitoring scheduled.

## Current known destinations
TPS: `/`, `/about`, `/admissions`, `/parent-guide`, `/admissions/faq`, `/visit`.
TIER: `/`, `/about`, `/institutions`, `/institutions/[slug]`, `/contact`.

## Blocker
The legacy sites were built by a third party and source code is unavailable to this project. The owner has cPanel access and may provide backups/exports. Final URL mapping is blocked until actual sitemap, redirects and search-performance exports are received.
