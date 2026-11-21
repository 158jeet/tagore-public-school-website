# ADR-002: Keep website content Git-managed; defer a CMS

- **Status:** Accepted for the current phase
- **Date:** 2026-11-21
- **Scope:** TPS and TIER Next.js websites
- **Decision owner:** Tagore website programme owner

## Context

The two websites are currently content-led Next.js applications. Their page copy, structured data and institution directory are maintained in the private canonical Git repository. Changes can be reviewed through pull requests, checked by free CI and reverted through Git history.

The project constraints are to complete the websites quickly, avoid paid services, preserve the private repository as the source of truth, and avoid adding infrastructure that is not needed by the current editorial workflow. No separate group of nontechnical content editors, weekly publishing cadence or required visual-editor workflow has been confirmed.

## Decision

Keep content Git-managed for the current phase. Do not install or expose a CMS, add a CMS database, create an editor login, or add a hosted content provider now.

- Keep structured institution and pathway content in typed, reviewed source data.
- Make copy and content changes through private pull requests with owner review.
- Continue using free CI to validate types, content contracts, metadata, accessibility and builds.
- Keep editorial facts, media rights and evidence approval separate from code readiness.
- Revisit this decision when there is a demonstrated recurring need for nontechnical editing, multiple editors, scheduled publishing or richer draft/preview workflows.

This is a deferral decision, not a claim that open-source CMS software is paid. Self-hosted software can have zero licence fees while still requiring hosting, databases, authentication, backups, patching and operational ownership.

## Options evaluated

| Option | Licence / hosting model | Editorial and access considerations | Fit for this phase |
|---|---|---|---|
| Git-managed content (chosen) | No additional product or service; uses the existing private Git repository and free CI | Pull requests provide review, history and rollback. Editors need repository contribution access, so keep access limited to approved maintainers. | Best fit now: no new runtime, database, identity system or vendor dependency |
| Decap CMS | Open-source, Git-based CMS; can use GitHub and other Git backends | The standard GitHub backend requires users to have push access to the content repository. Open Authoring can use a fork/PR workflow, but private repositories still require read access and an OAuth/authentication arrangement. Hosted authentication/proxy options add another service. | Technically viable later, but current repository access and authentication requirements do not justify installing it now |
| TinaCMS | Open-source editor with hosted TinaCloud and a self-hosted backend option | The current free TinaCloud plan advertises two users and two roles. Self-hosting requires the team to provide backend, database, authentication and Git integration. | Free tier may be useful for a small editorial team, but it adds a hosted dependency or self-hosted operations not currently required |
| Payload | Open-source, MIT-licensed and self-hostable | Provides an admin panel and APIs, but requires a compatible database (MongoDB, PostgreSQL or SQLite) and a maintained Node.js/Next.js runtime. | Strong Next.js integration, but materially increases infrastructure and security scope for mostly static pages |
| Strapi Community | Open-source, MIT-licensed and self-hostable | Requires a Node.js host and database; the team owns updates, backups, access control and production operations. | Viable when content modeling and editor workflows justify a separate CMS service; unnecessary for the current static content volume |

## Security and operating rules

1. Do not expose a CMS admin route or create editor accounts until the owner approves the role model and authentication design.
2. Do not give teachers, parents, students or external partners access to the private website source repository as a workaround for editorial editing.
3. Do not use a public repository as a CMS content backend for private operational content.
4. Never store secrets, student/parent data, enquiry records or private operational documents in public content.
5. Any later CMS must support least-privilege roles, draft/preview review, audit history, backups, rollback, content validation and a documented patching owner.
6. A CMS must not become a prerequisite for the public websites to build or serve their published content.

## Revisit triggers

Re-evaluate the decision if one or more conditions become persistent:

- Nontechnical staff need to publish or correct content regularly without developer involvement.
- Multiple editors require role-based draft, review and approval workflows.
- The content catalogue becomes large enough that code-based editing is a measurable bottleneck.
- A verified content owner, authentication owner, backup process and hosting plan are available.

If those triggers occur, run a small proof of concept with a private content-only repository or a carefully scoped content collection before connecting any CMS to the production websites.

## Official references checked 2026-11-21

- Decap CMS overview: https://decapcms.org/docs/
- Decap GitHub backend permissions and authentication: https://decapcms.org/docs/github-backend/
- Decap Open Authoring requirements: https://decapcms.org/docs/open-authoring/
- TinaCMS current pricing: https://tina.io/pricing
- TinaCMS self-hosting: https://tina.io/docs/self-hosted/overview
- Payload self-hosted product and licence: https://payloadcms.com/get-started
- Payload database/software requirements: https://payloadcms.com/docs/getting-started/installation
- Strapi Community self-hosting and MIT licence: https://strapi.io/hosting
