# Tagore Group website build and acceptance tracker
Updated: 2026-11-19

## Programme boundaries
- TPS: https://www.tpsgudhagorji.com — dedicated CBSE school website.
- TIER: https://www.tieredu.org — group identity and institution directory.
- Live websites remain untouched until staging, content, SEO, mobile, accessibility, enquiry routing and owner acceptance pass.
- Old source code is not a prerequisite. Existing URL structures, approved copy, assets and integration details may be recovered from cPanel for migration.

## Implemented
- [x] TPS Next.js foundation and initial pages.
- [x] TPS parent-first homepage refresh.
- [x] TIER standalone Next.js application scaffolded under apps/tier.
- [x] TIER flagship homepage, group story and institution directory.
- [x] Separate CI quality jobs for TPS and TIER.
- [ ] Create a separate TIER GitHub repository. Current GitHub connector supports repository reads and file/issue writes but not repository creation; app is isolated for clean transfer.
- [ ] Add exact approved Tagore logo assets (never redraw or distort).
- [ ] Add authentic campus, classroom, activity and faculty media with permissions.
- [ ] Verify official institution names, addresses, contact details, affiliations, courses, fees, facilities, safety disclosures, staff credentials and admission processes.
- [ ] Implement real group enquiry routing and visit requests.
- [ ] Add authorized staff CMS with approval and audit trail.
- [ ] Configure structured data, analytics, Search Console and legacy URL redirects.
- [ ] Complete mobile, browser, accessibility, security and form-delivery acceptance.
- [ ] Production deployment and DNS cutover only after owner approval.

## Truth controls
Do not publish unsupported rankings, awards, student counts, graduate counts, results, years of experience, testimonials, safety claims, facilities or placement claims. Every public factual claim needs an evidence owner.

## Deployment topology
- TPS Vercel project root: repository root.
- TIER Vercel project root: apps/tier (can move into its own repository later).
- Separate domains, analytics properties, sitemaps and Search Console properties.
- ERP remains the system of record for leads/admissions once its versioned API is ready. No direct database access from either website.
