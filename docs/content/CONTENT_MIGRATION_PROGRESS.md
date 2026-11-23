# Legacy content migration progress

Updated: 2026-11-23

## Delivery objective

Populate the new Tagore Public School (TPS) and Tagore Group (TIER) prototypes with relevant text and photographs from the existing public websites. This is an internal review draft. It does not approve current claims, image rights or publication.

## Prototype content migration status

| Source website | Legacy material | New prototype destination | Status |
|---|---|---|---|
| TPS | School history, 2004 origin, school identity, founder-chairman philosophy, 3-H Head/Heart/Hand and principal message | Home and About | Migrated; full founder-chairman Hindi and principal English messages are preserved in expandable source-copy sections |
| TPS | Early-years, primary, middle and secondary learning descriptions | Admissions pathway pages | Migrated; current curriculum and class structure require confirmation |
| TPS | Admission process and family questions | Admissions, FAQ, funnel and parent checklist | Migrated as a modern enquiry journey; obsolete 2023–24 criteria and forms intentionally excluded |
| TPS | Hostel rooms, supervision, academic support, medical and counselling descriptions | Hostel family guide | Migrated with explicit current-verification warnings |
| TPS | Why Tagore, facilities, transport, sports and Olympiad references | Home / school-experience sections | Migrated as review topics; no unsupported current promises |
| TPS | Published safeguarding committee documents | Parent Guide | Linked to source PDFs; current lists and contact procedures require confirmation |
| TPS | CBSE identity and dated public disclosure snapshot | About and homepage outcomes section | Migrated with source links and date/recheck notice |
| TPS | Campus, building, early-years and computer-learning photos | Home and About | Legacy image URLs embedded for prototype review |
| TIER | Group origin, director's message, faculty philosophy and institution portfolio | Home and About | Migrated as source-derived summaries |
| TIER | Campus, library, computer centre, labs, NCC and infrastructure descriptions | New Campus life page and About | Migrated as legacy descriptions; current availability requires confirmation |
| TIER | Sports and cultural activities | Campus life page | Legacy activity list migrated; current schedules/coaches need confirmation |
| TIER | Hostel facilities, supervision, extra classes and student support | Hostel profile and Campus life page | Migrated with current-verification warnings |
| TIER | RBSE, defence academy and PG College legacy pathways | Institution profiles | Migrated selectively; current institution names, courses, affiliation and batches need reconciliation |
| TIER | Library, PG College and campus photographs | About and Campus life page | Legacy image URLs embedded for prototype review |
| TIER | Group office address, phone and email | Contact page | Legacy details shown with explicit routing-verification notice |

## Latest additions in this pass

- Added `/campus` to the TIER website with legacy campus, library, computer learning, PG College, sports, hostel and photo-gallery material.
- Added Campus life to the desktop and mobile navigation.
- Added the route to the TIER sitemap and included the other public conversion routes already present in the app.
- Kept conflicting campus-area and historic group-size claims out of public-facing copy.

## Media handling — important distinction

The prototype pages currently reference the original image URLs hosted on the legacy TPS and TIER websites. This makes the photos visible in the prototype, but it is **not yet a local media-library copy**. Before launch, approved originals should be downloaded into the repository's media directory, optimized into responsive AVIF/WebP variants, and given documented source/permission/consent records. Photos with identifiable children or students require documented permission and a safeguarding review. Do not treat a public legacy URL as proof of reuse permission.

## Management review gates

- Confirm current phone, WhatsApp, email and enquiry routing for each institution.
- Confirm current leadership, faculty, school recognition/affiliation, classes, subjects, courses and academic-year details.
- Confirm current fees, transport routes, hostel facilities, capacity, supervision, health and safeguarding procedures.
- Recheck all results, teacher counts, awards, achievements, course claims and statutory disclosures against current signed records.
- Confirm exact approved logos. No logo has been redrawn; the TPS header remains text-only until the exact approved standalone asset is supplied.
- Confirm photo rights, image currentness and consent before production.
- Confirm the six-institution portfolio and resolve legacy references to separate campuses or historical entities.

## Completion definition

**Prototype text migration:** substantially populated across the identified legacy page families; the page-level inventory records what was used and what was intentionally excluded.

**Prototype image placement:** legacy photographs are visible through their existing source URLs.

**Not complete for production:** local image copying/optimization, permission and consent verification, factual refresh, management approval, final visual review and deployment. The team can review the populated prototype now, but these gates must not be represented as completed.

## Media governance automation — 2026-11-23

- Added `scripts/audit-legacy-media.mjs` and `tests/legacy-media-manifest.test.mjs` to both the public development mirror and canonical repository branch.
- Added `npm run media:audit` to report every legacy asset, source host, missing metadata, and whether identifiable-person consent is required.
- Added `npm run test:media` to validate unique IDs, HTTPS source URLs, descriptive alt text, rights/consent notes and explicit consent gating.
- Added `npm run media:production-check` as a fail-closed production gate: it exits unsuccessfully while any legacy asset remains unapproved.
- The audit intentionally does not download or copy images. No image is promoted into a repository media directory until rights, currentness and required consent have been documented.
- This is governance automation, not completion of local media migration. Production still requires an approved asset register and private media storage.
