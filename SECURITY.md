# Security Policy

## Scope

This policy applies to the Tagore Public School website and the Tagore Group website in this repository, including their public pages, enquiry endpoints, build and deployment workflows, and integrations.

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in public issues, pull requests, discussions, screenshots, or social media. Report them privately to the repository owner through GitHub's private vulnerability reporting feature when enabled, or through a verified private security contact supplied by the project owner.

Include:
- A concise description and affected URL/component.
- Reproduction steps and impact.
- Any relevant request/response evidence with personal data and secrets removed.

Do not access, modify, download, or retain other people's data; do not perform denial-of-service, destructive, social-engineering, or physical attacks. Stop testing if personal data or production systems may be affected.

## Supported versions

The latest maintained default-branch version is the supported development version. Production deployments must be traceable to a reviewed commit and a successful CI run.

## Security response principles

- Acknowledge reports privately and assess severity and exposure.
- Prioritise active exploitation, authentication bypass, sensitive-data exposure, injection, and supply-chain compromise.
- Coordinate remediation and disclosure with the reporter.
- Never place credentials, tokens, personal data, or exploit details in public tickets.

## Release gate

A passing build is not, by itself, a security approval. Production release also requires review of security checks, environment configuration, HTTPS/DNS, access controls, backups, monitoring, and a tested rollback plan.
