# Tagore Public School Website

Standalone Next.js public website and admissions funnel for Tagore Public School, Gudha Gorji. This repository is intentionally separate from the Laravel ERP.

## Architecture
- Public website: Next.js App Router, TypeScript, Tailwind CSS.
- Admissions: website captures enquiries; ERP becomes the system of record through a versioned authenticated API.
- Hosting: Vercel; preview deployments for pull requests and production from `main`.
- Quality: GitHub Actions typecheck and production build.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## Important
Verify school-specific claims, affiliation identifiers, facilities, results, fees and contact details against authoritative school records before launch. Do not invent testimonials, rankings or statistics. Keep the existing site live until content, mobile, accessibility, form delivery, SEO, performance and rollback checks pass.

## ERP integration principles
The website must never connect directly to the ERP database. A server-side integration layer will use authenticated APIs, schema validation, rate limiting, idempotency and retry-safe delivery. ERP owns lead assignment, follow-ups, applications, conversion and student creation. Never expose ERP credentials or private CMS tokens in `NEXT_PUBLIC_*` variables.
