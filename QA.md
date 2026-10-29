# OpenDoor verification log

Date: 29 October 2026. Local environment: Windows, Node 24.21.0, npm 11.19.0.

## Executed checks

- Dependency installation succeeded with the npm cache redirected to `D:\opendoor\.npm-cache` after the system-drive cache ran out of space.
- `npm run lint`: passed after documenting the intentional post-hydration browser-storage read and excluding the npm cache.
- `npm run typecheck`: passed.
- `npm test`: 21 tests passed; matching, validation, storage sanitization and dataset contracts covered.
- `npm run build`: passed, including all static routes. Initial 11-worker static generation crashed on this host; `experimental.cpus: 2` resolved it.
- Production HTTP checks: `/`, `/profile`, `/opportunities`, `/results`, `/saved`, `/sources`, `/privacy` and all five detail routes returned 200. An unknown opportunity returned 404.

## Browser checks actually performed

- Landing and explorer visually inspected at desktop and mobile viewport sizes. No horizontal overflow detected on inspected landing/explorer pages.
- Empty profile submission displayed validation errors.
- Synthetic scenario: Telangana, postgraduate, Science, year 1, regular/full-time. PG scholarship ranked first with 3 matches, 0 conflicts and 2 unknown conditions.
- Saved the PG opportunity; ticked an application-planner task; refreshed. Both persisted.
- Refresh removed the in-memory profile: the detail matching state became insufficient verified information.
- Saved page displayed the saved record.
- JSON export downloaded successfully; downloaded contents inspected and contained the opportunity/source metadata, no profile attributes.
- Search for a nonexistent scheme displayed the empty state; reset restored the collection.
- Postgraduate filtering returned 2 records; adding verified-open status returned 0.
- Privacy clear-all removed the test shortlist and tasks and displayed a success message; saved page became empty.
- Browser console reported no warnings/errors during the tested workflow.

## Verification boundaries

- Print-friendly CSS is implemented; native printer/PDF output was not tested.
- Malformed storage is covered by unit tests. A browser with storage disabled was not separately exercised.
- No full assistive-technology audit, exhaustive cross-browser testing, or automated end-to-end suite.
- Source URLs were researched through browsing, with direct-access versus indexed-content limitations in each record. Current application windows and full cycle-specific conditions remain unverified.
- No GitHub publication or deployment was performed. Demo video has not been recorded.

## Real screenshots

`docs/landing-desktop.jpg` and `docs/landing-mobile.jpg` are browser captures of the running app, not mockups. See README for additional capture and demo instructions.

## Manual checks before public submission

1. Re-audit official current-cycle sources, including fresh versus renewal scope and conflicting Swanath guidance.
2. Inspect print output and keyboard navigation in the browser used for the demo.
3. Replace the demo-video placeholder with a real 1–3 minute recording.
4. Choose a license, review Git staging, and follow README publication steps.
