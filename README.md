# OpenDoor

**Find opportunities you shouldn’t have to search for alone.**

An independent, evidence-backed scholarship discovery app for Indian college students. Eligibility rules and application instructions are scattered across providers; OpenDoor brings a small, carefully qualified collection together and makes each comparison explainable.

## Run locally

Requires Node.js 20.9+ and npm. Node 24 is supported. No environment variables, account, API keys, database or paid services are needed.

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:3000. For a production server:

```powershell
npm run build
npm start
```

If the default npm cache is full, install with `npm install --cache D:\opendoor\.npm-cache`. After a lockfile exists, use `npm ci` for reproducible installation. The core app uses local data and system fonts; only installing dependencies and visiting official sources require network access.

## Features

- Editorial landing page with a custom CSS doorway illustration and logo.
- Validated academic profile; optional income and scheme-specific context with unknown defaults.
- Search and filters for education, state coverage, type and application status; relevance/name/deadline sorting.
- Deterministic matching with per-criterion evidence, matched/conflicting/unknown counts and relevance bands.
- Five complete detail pages with explicit verification limits and official links.
- Generic preparation tasks separated from source-documented document examples.
- Device-local saved shortlist and task completion, JSON download and print layouts.
- Methodology and privacy pages; clearing profile or all local information.
- Responsive layouts, keyboard focus, skip link, labeled controls, loading/error/empty states.

## Architecture and files

Next.js App Router, React, strict TypeScript, plain CSS design tokens, Lucide icons, ESLint, Vitest. CSS is used instead of Tailwind to keep the dependency and configuration surface small.

| Module | Responsibility |
| --- | --- |
| `src/app/` | Landing, profile, explorer, results, saved, sources, privacy and dynamic opportunity routes |
| `src/components/provider.tsx` | In-memory profile and guarded localStorage persistence |
| `src/components/opportunities.tsx` | Cards, matching evidence, search/filter/sort and export UI |
| `src/components/detail.tsx` | Details, evidence, printable view and planner |
| `src/data/opportunities.ts` | Typed local scheme records and criterion-level sources |
| `src/types/index.ts` | Opportunity, criterion, evidence and profile types |
| `src/lib/matching.ts` | React-independent tri-state engine and date status |
| `src/lib/validation.ts` | Allowed profile choices and input validation |
| `src/lib/storage.ts` | Malformed-storage recovery and shape sanitization |
| `src/lib/export.ts` | JSON shortlist download, excluding profile answers |
| `src/lib/core.test.ts` | Matching, validation, storage and dataset contract tests |
| `src/app/globals.css` | Responsive design system and print styling |

## Checks

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

Unit coverage includes missing inputs, unsupported income values, exact and overlapping income brackets, unverified conditions, conflict precedence, empty criteria, all-match band, date expiry, profile validation and malformed persisted data. See `QA.md` for the actual verification log and manual acceptance checklist.

## Dataset and source methodology

Source review date: **29 October 2026**. This is a curated snapshot, not a live verification service. All five records are **partially verified**; none is advertised as accepting applications. Opening and closing dates remain `null`.

| Record | Evidence actually reviewed | Rules represented |
| --- | --- | --- |
| PM-USP CSSS | [Official myScheme listing](https://www.myscheme.gov.in/schemes/csss-cus), indexed official content | Degree, regular study, recognized institution, income at most ₹4.5 lakh, Class XII board-stream percentile above 80 |
| National Scholarship for PG Studies | [UGC summary](https://www.ugc.gov.in/Scholarships/stu_Scholarship6), directly readable | PG, first year, regular/full-time; age and degree/institution recognition retained as manual checks |
| Pragati Technical Degree | [Official myScheme listing](https://www.myscheme.gov.in/schemes/psgs-deg), indexed official content | Girl students, technical undergraduate study, AICTE institution, first year or second-year lateral entry, income at most ₹8 lakh; family beneficiary limit and other aid require manual checks |
| Saksham Diploma / Degree | [Nagaland government directory](https://highereducation.nagaland.gov.in/nagaland-scholarship-nodal-cell-nsnc/), directly readable | Technical diploma/degree, disability at least 40%, income at most ₹8 lakh; remaining conditions unverified |
| Swanath | [Official myScheme listing](https://www.myscheme.gov.in/schemes/aicte-ssss), indexed official content, compared with the Nagaland directory | Degree/diploma, AICTE institution, regular study, income at most ₹8 lakh, source-stated restriction on other scholarships; family circumstances explicitly unresolved |

Direct myScheme extraction returned a JavaScript shell. Its scheme text was available in official-domain search results; each source records this access limitation. Do not describe this as a complete live guideline audit. The National Scholarship Portal and UGC were checked; the National Government Services Portal returned an access error and supplied no facts. Some portal notices mention current cycles or renewals; these were not generalized to all students or scheme variants.

Swanath sources differ on qualifying family circumstances, and portal notices may change scholarship-combination policy. The app displays this uncertainty. No personal family-loss question is collected. Source-documented preparation examples are explicitly partial document lists; the complete list must be checked on the official portal.

Each opportunity has stable identity, provider, audience, levels, coverage, typed criteria, sources, application/information links, nullable dates/benefit, documents, application route, review date, verification status and limitations. Each criterion contains a source URL, source name and section. Unsupported benefit amounts and dates are null rather than invented. The status enum also supports fully verified, needs-verification and historical records for future curation.

## Matching algorithm

1. Evaluate only verified criteria with a supported profile field and rule.
2. Missing values and unmodeled conditions yield `UNKNOWN`.
3. A documented comparison yields `MATCH` or `DOES_NOT_MATCH`.
4. Income comparisons use whole bracket bounds: wholly below/equal the cap matches; wholly above conflicts; overlapping brackets stay unknown.
5. Score = matched / all listed criteria × 100. This is a relevance explanation, not probability or entitlement.
6. Any conflict produces “Some criteria do not match.” No matches means “Insufficient verified information.” Some matches with unknowns means “Possible match — information needed.” All checks matching means “Strong potential match.”

No LLM, scraping service, backend matching API or external model is involved. Unanswered sensitive attributes never silently pass or fail. Current records retain manual checks, so do not expect fully resolved eligibility from them.

## Privacy

Profile values exist only in React memory. Internal navigation preserves them; refresh/closing the app clears them. localStorage contains only saved opportunity IDs and task flags. JSON exports exclude profiles. Even a saved scheme ID can imply an interest or circumstance, which the privacy page explains for shared devices. No analytics, authentication, document upload or identity verification is implemented. Official sites have separate privacy policies. Clear-all removes the local key and in-memory answers, but cannot delete an already downloaded file.

## Limitations and future work

- Five national schemes are an intentionally small collection. State filters currently retain all nationally covered records; educational-support type has an honest empty state.
- Current application periods and complete current-cycle conditions are unverified. No live deadline alerts.
- Institution recognition is self-reported. Manual source checks remain necessary.
- Fresh versus renewal variants are not fully modeled; more precise cycle-specific records are a future improvement.
- Profiles are not persisted across refresh. No cross-device or multi-tab synchronization is promised.
- No provider decision, selection guarantee, application submission, funding disbursement or government partnership.
- Future work: direct guideline audits, regional schemes, translations, dated cycle records, audited renewal logic and browser automation regression coverage.

## Adding an opportunity

1. Find an official government/provider source and inspect its actual content. Record access method, review date and precise section.
2. Add a typed record to `src/data/opportunities.ts` with a unique ID. Omit unsupported claims and use null dates/amounts.
3. Attach provenance to every criterion. Leave unverified/unmodeled conditions unknown. Add profile choices only if the question is needed, non-identifying and sensitively optional.
4. Review full current-cycle eligibility, variant and cohort before changing verification labels or application status. A government URL alone is insufficient.
5. If adding dates, store ISO dates and evidence identifying the application cycle and cohort; verify runtime expiry.
6. Add meaningful rule tests and run lint, typecheck, tests and build. Inspect the detail page and source links.

## Public GitHub preparation

No repository has been published by this build. Review the source and QA notes, ensure no personal files/secrets are staged, then:

```powershell
git init
git add .
git status
git commit -m "Build OpenDoor scholarship discovery application"
git branch -M main
```

Create an empty **public** repository on GitHub (choose a license appropriate for your work), copy its HTTPS URL, then run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/opendoor.git
git push -u origin main
```

Do not commit dependency caches, build output, credentials or real student information. The included `.gitignore` excludes local caches/builds. Decide and add a license before public release; no license choice is assumed.

## Screenshots and demo

**Real screenshots:** [Desktop landing](docs/landing-desktop.jpg), [mobile landing](docs/landing-mobile.jpg), and [desktop preview](docs/landing-preview.jpg). These are captures of the running production build. Additional results/planner screenshots remain optional submission work. Capture those at desktop 1440×1000 and mobile 390×844.

**Demo video: placeholder — insert your real public/unlisted video link here.**

Suggested 1–3 minute recording:

1. (0:00–0:20) Explain the discovery problem and show the landing page.
2. (0:20–0:50) Enter a clearly labeled demo scenario: Telangana, postgraduate, Science, year 1, regular/full-time. Leave optional attributes unanswered.
3. (0:50–1:20) Show PG matches, unknown age/recognition checks and criterion-level sources. Explain why relevance is not eligibility.
4. (1:20–1:50) Save a record, tick planner tasks, visit the saved page and export JSON.
5. (1:50–2:20) Show methodology, partial verification, privacy and mobile layout. Explain the absence of paid APIs and the current-data limitations.

Use synthetic answers, record the real running app, and confirm that the saved shortlist persists after refresh while the profile disappears.
