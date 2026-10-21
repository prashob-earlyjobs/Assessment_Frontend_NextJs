# EarlyJobs next 10 pages — minimal optimization

Date: 2026-10-21  
Scope: the ten routes in `EarlyJobs_Next10_Minimal_Optimization_Audit.xlsx`  
UI: existing layouts, sections, and forms were kept. Copy, metadata, and schema were edited in place.

## What changed

| Route | Change |
|---|---|
| `/global-recruitment` | Title, description, canonical, and H1. Intro states that markets depend on the role and that the page does not claim an international office network. |
| `/hr-executive-recruitment-services` | Title and H1. Removed the 40% job-board claim, the 150+ companies claim, the labor-law claim, and the “no candidate fee” sentence. |
| `/india-gcc-hiring-services` | Title, H1, and intro. Removed the speed claim, the dashboard comparison, and the 400+ recruiter figure. The published figure on that line is 3,449+ recruiters. The page says it does not give legal, tax, or real-estate advice and does not rank cities. |
| `/internship` | Title and H1. Removed rupee stipend amounts, the PPO salary range, and certificate promises. Terms are described as confirmed in writing. |
| `/investor-relations` | Title and H1. The intro says the page does not publish projections, fundraising targets, or private reports. |
| `/it-recruitment` | Title and H1. Removed the replacement guarantee, the “no candidate fee” sentence, and the claim that assessments always happen. |
| `/jobs` | Title, description, and collection-page schema. Listings still come from the existing job feed. The board label stays “Open roles”. |
| `/newsroom` | Title and H1. Existing published items and external links were left in place. |
| `/offshore-capability-center-hiring` | Title, H1, and intro. Removed the standard dashboard and SLA claims. Secondary link goes to `/india-gcc-hiring-services`. |
| `/press-release` | New route using the existing newsroom layout, headed “EarlyJobs Press Releases”, with the same published press items. Added to the sitemap. |

JSON-LD was added for each route. It references the existing organization and website IDs. FAQ schema is included only where the questions are on the page. Job posting schema was not added to `/jobs` or `/internship`. Individual vacancy pages do not yet emit JobPosting.

Dev crawling is still blocked by `robots.txt` when the host is `dev.earlyjobs.ai` or localhost. Production canonicals still point at `https://www.earlyjobs.ai`.

## Verification on local dev

All ten routes returned 200 with the new titles and a JSON-LD script.

- `/internship` no longer contains a rupee amount or “Certificate on completion”.
- `/jobs` rendered live vacancy links from the feed (84 `/jobs/` links in the HTML checked).
- `/hr-executive-recruitment-services` no longer contains “Reduce 40%” or “labor laws”.
- `/it-recruitment` no longer contains “replacement guarantee”.
- `/india-gcc-hiring-services` contains the legal-advice limit and 3,449+ recruiters.
- `/offshore-capability-center-hiring` no longer contains “SLA tracking”.
- `/press-release` shows the press heading and “Read More” links.
- `tsc --noEmit` completed with no errors.

## Not changed

- Page layouts, colors, forms, and the jobs filter UI.
- Named internship stories that do not state a stipend or a certificate. They were not replaced with new quotations.
- Newsroom items that link to already published articles, including funding coverage. No new announcements were written.
- JobPosting and NewsArticle schema on individual records.
- Form submissions. No enquiry was sent.
- A full production build and a mobile screenshot pass.

## Blockers

None of the ten routes failed to render. JobPosting schema still needs a field-by-field check of salary, date, and expiry on each vacancy before it is added.
