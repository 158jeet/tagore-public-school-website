# Hindi Localization Review — GROW-22

Status: draft translation prepared; **not approved for production publication**.

## Feature gate

The TPS admissions FAQ and TIER group-help finder include an optional Hindi language mode. The selector is hidden unless `NEXT_PUBLIC_HINDI_CONTENT_ENABLED=true` is supplied at build time.

- The default website behavior remains English.
- The free CI workflow sets the flag to `true` only to exercise the Hindi UI in browser tests.
- Do not set this flag in a staging or production deployment until the translations below have been reviewed and approved by the institution.
- No external translation API, analytics, tracking, or paid service is used.

## Required human review

Before enabling Hindi content publicly, an authorised reviewer should confirm:

1. Hindi grammar, spelling, punctuation and readability for local parents.
2. Consistent terms for admission, class, fee, campus visit, transport, hostel, partnership and career.
3. Accurate meaning compared with the English source; no added promises or omitted caveats.
4. Correct institutional names and retained English abbreviations such as CBSE/RBSE where appropriate.
5. The disclaimer that enquiry is not admission confirmation and that availability, fees and programme details must be confirmed directly.
6. Screen-reader pronunciation, keyboard navigation and mobile wrapping of Hindi text.

## Content scope

- TPS: eight existing admissions FAQ questions and answers.
- TIER: seven existing institution/pathway help questions and answers.
- Search matches both English and Hindi text while the language mode is enabled.
- Category filters, result counts, empty states and action labels are translated.

## Acceptance gate

- [ ] Hindi text reviewed by an authorised Tagore representative.
- [ ] Corrections applied and reviewed again.
- [ ] Owner approves enabling `NEXT_PUBLIC_HINDI_CONTENT_ENABLED=true` for the intended environment.
- [ ] Final browser and accessibility checks pass with the approved text.
