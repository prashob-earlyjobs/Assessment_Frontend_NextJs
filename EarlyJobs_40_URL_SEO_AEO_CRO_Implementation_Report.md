# EarlyJobs 40-URL SEO, AEO, GEO and CRO implementation report

Checked on 22 October 2026 against a local production build (`next build`, then `next start` at `http://127.0.0.1:3001`). This is not a crawl of `https://www.earlyjobs.ai`.

The Excel workbook named in the request was not in the workspace or Downloads. The attached Markdown audit was read in full and used as the source. Recommended titles, H1s and social copy in that audit were compared with the current pages and kept where the live copy was already accurate. They were not pasted over published headings.

Nothing here is a ranking, indexing, or rich-result guarantee.

## Checks

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass |
| `npx next build` | Pass (Next.js 16.3.6, 53 routes) |
| All 40 URLs, local HTTP status, robots, canonical, H1 count | Checked. See the route table. |
| Sitemap XML | Pass locally. `application/xml`, 988 production URLs: 32 static, 45 blogs, 911 jobs. Counts come from the feeds at build time. |
| Unknown blog slug | HTTP 404, title “Page not found \| EarlyJobs”, robots `noindex`. |
| `/blogs` initial HTML | 12 article links present in the server HTML. |
| Forms, Core Web Vitals, full mobile pass, production host | Not Verified. Forms were not submitted. |

Homepage counters in this render were the live dashboard values `3,485+`, `266+`, `74,000+` and `5,600+`, not `0+`. Those numbers will change when the dashboard changes. The older search snippet that showed `0+` does not match this build.

## What changed in this pass

- `/it-recruitment`, `/finance-and-accounting-recruitment` and `/hr-executive-recruitment-services` now have one H1. Extra section headings were changed to H2 and kept their existing classes. The shared FAQ heading was already an H2.
- Visible grammar fixes only: sales H1 “We stand”, executive H1 “We serve”, “a strong commitment”, and the broken HR sentence “The aim is to enable”.
- The sitewide footer line “10X Quicker.” is now “Through recruiters.” The marquee layout is unchanged. The speed claim was not substantiated.
- `/press-release` now lists official press releases only and points coverage to `/newsroom`. `/newsroom` still lists both coverage and press releases. Both stay indexable because the bodies are no longer the same page.
- `/become-a-recruiter/apply` includes its H1 in the first HTML response. It stays `noindex, follow`.

## Route results

Local status, indexing and H1 count. Canonical is self-canonical unless noted. Production is Not Verified for every row.

| URL | Local result | Verdict |
| --- | --- | --- |
| `/` | 200, index, one H1, Organization/WebSite/WebPage/FAQPage. Live counters. | Pass locally. OG image is the existing logo fallback where a 1200×630 file does not exist. |
| `/about` | 200, index, one H1, AboutPage. | Pass locally. Address in copy is Koramangala, Bengaluru. |
| `/about-us` | 301 to `/about`. Not in the sitemap. | Pass locally |
| `/about-us/our-story` | 301 to `/story`. Not in the sitemap. | Pass locally |
| `/agency-onboarding` | 200, noindex, one H1. Not in the sitemap. | Pass locally. Form delivery Not Verified. |
| `/become-a-recruiter` | 200, index, self-canonical, one H1, WebPage/Service/FAQPage. | Pass locally |
| `/become-a-recruiter/apply` | 200, noindex, one H1 in the initial HTML. Not in the sitemap. | Pass for index and heading. Submission Not Verified. |
| `/blogs` | 200, index, one H1, article links in the initial HTML. | Pass locally |
| `/build-gcc-india` | 200, index, one H1. | Pass locally. Scope claims were not rewritten. |
| `/clientele` | 200, index, one H1. | Pass for the route. Client-logo crawl depth Not Verified beyond the rendered page. |
| `/contact-us` | 200, index, one H1. Footer and contact use the same Koramangala address, phone and email. | Pass locally. Form delivery Not Verified. |
| `/employers` | 200, index, one H1. | Pass locally. Anonymous testimonial eligibility was not re-litigated in this pass. |
| `/finance-and-accounting-recruitment` | 200, index, one H1. The page already says it does not describe executive search. | Pass locally |
| `/franchise` | 200, index, one H1. | Pass locally. Earnings are not newly guaranteed. |
| `/gcc-hiring-solutions` | 200, index, one H1. | Pass locally |
| `/gcc-recruitment-partner` | 200, index, one H1. | Pass locally. Operational claims such as dashboards were not newly verified. |
| `/gcc-talent-acquisition` | 200, index, one H1. | Pass locally |
| `/global-recruitment` | 200, index, one H1. | Pass locally. Country coverage was not expanded. |
| `/hr-executive-recruitment-services` | 200, index, one H1. | Pass for the heading. Broader HR copy was not rewritten. |
| `/india-gcc-hiring-services` | 200, index, one H1. Recruiter line uses the live dashboard value when the API responds. | Pass locally |
| `/internship` | 200, index, one H1. | Pass for the route. Whether every listed internship is still open was Not Verified. |
| `/investor-relations` | 200, index, one H1, WebPage only. | Pass locally. No financial-offer schema. |
| `/it-recruitment` | 200, index, one H1. | Pass locally |
| `/jobs` | 200, index, one H1 “Open roles”. No JobPosting on the index. | Pass locally. Individual salary quality Not Verified. |
| `/newsroom` | 200, index, one H1, CollectionPage. Coverage and press releases both remain. | Pass locally |
| `/offshore-capability-center-hiring` | 200, index, one H1. | Pass locally |
| `/press-release` | 200, index, one H1, CollectionPage. Press releases only. | Pass locally. The items are existing published links, not new releases. |
| `/privacy-policy` | 200, index, one H1, WebPage. Legal text unchanged. | Pass locally |
| `/recruiter` | 200, noindex, self-canonical, one H1. Not in the sitemap. No JobPosting. | Pass locally. Legacy counts were not rewritten. |
| `/recruiters` | 200, index, canonical `https://www.earlyjobs.ai/become-a-recruiter`, one H1. Same page component as the canonical URL. Not in the sitemap. No second schema block. | Pass locally. The older search snapshot that treated this as a different page does not match the current code. |
| `/recruitment-process-outsourcing` | 200, index, one H1, Service. | Pass for heading and schema. “BEST RPO FIRM” remains in the existing subheading. |
| `/resources` | 200, noindex, one H1, no collection schema. Not in the sitemap. | Pass locally. Still an empty page. |
| `/sales-marketing-services` | 200, index, one H1, Service. | Pass for heading and grammar. Existing “10K+” and “top-tier” lines remain. |
| `/sitemap.xml` | 200 XML. No JSON-LD. Excludes noindex routes, `/recruiters`, `/teams` and `/about-us`. All locs use `https://www.earlyjobs.ai`. | Pass locally |
| `/story` | 200, index, one H1, AboutPage. | Pass locally |
| `/team` | 200, index, one H1 “Our Team”. Person data is added only for members the teams API returns. | Pass locally |
| `/teams` | 301 to `/team`. Not in the sitemap. | Pass locally |
| `/terms-and-conditions` | 200, index, one H1, WebPage. Legal text unchanged. | Pass locally |
| `/top-executive-recruitment-firm` | 200, index, one H1, Service without a “top” claim in the schema. Slug unchanged. | Pass for heading and grammar. The body still says “leading” and “best placement consultancy”. |
| `/value-staffing-service` | 200, index, one H1, Service. Slug unchanged. | Pass locally |

`robots.txt` on this server, with `Host: www.earlyjobs.ai`, allows `/` and points at `https://www.earlyjobs.ai/sitemap.xml`.

## Left unchanged on purpose

- No new 1200×630 Open Graph files. Missing social images already fall back to the real logo, and the card type stays `summary` for that logo. Inventing a branded 1200×630 image would have been a new asset.
- No new AggregateRating, reviews, awards, jobs, articles, or press releases.
- No FAQPage added to service pages. Existing FAQPage blocks on the homepage, about, employers, franchise and the canonical recruiter page were already in the code and were not expanded.
- Privacy and terms legal text.
- `/recruiter` was not redirected. It stays the noindex legacy page.
- `/recruiters` was not given a second noindex. It already canonicalises to `/become-a-recruiter`.
- Recommended H1 replacements such as “Our Story”, “Meet the EarlyJobs Team” and “IT Recruitment Services” were not applied where a different accurate H1 is already visible.

## Still open

- Deploy this build before treating `www.earlyjobs.ai` as updated.
- Service and newsroom copy still includes older figures and superlatives, including published funding coverage. Those sentences were not newly verified.
- GCC pages that mention dashboards, SLAs or city coverage were not operationally re-audited.
- Forms, job applications, mobile layout and performance were not tested.
- The Excel tracker could not be updated because the workbook was not attached.
