# EarlyJobs 13-URL SEO and AEO implementation report

Checked on 22 October 2026 against a local production build (`next build`, then `next start` at `http://127.0.0.1:3001`). This is not a crawl of `https://www.earlyjobs.ai`. Local Host-header checks do not prove what production is serving until this build is deployed.

Nothing here is a ranking guarantee. Pages that still contain unsupported wording, and checks that were not run, are marked that way.

## Result

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass |
| `npx next build` | Pass (Next.js 16.3.6). Static generation completed for 53 routes. |
| ESLint on the edited route files | Pass. `components/navbar.tsx` still reports existing `react-hooks/set-state-in-effect` errors. The only edit there was the “For Recruiters” destination. |
| Rendered HTML for the 12 HTML routes | Checked locally. See the route table. |
| Sitemap XML | Pass locally. Valid `urlset`, `Content-Type: application/xml`, 988 production URLs. |
| `www.earlyjobs.ai` live crawl | Not Verified |
| Forms | Not submitted |
| Core Web Vitals, full link crawl, image compression | Not Verified |

Sitemap membership at this build: 32 static URLs, 45 published blog URLs, and 911 published job URLs. Those feed counts come from the live jobs and blogs APIs during the build. They will change when the feeds change. They were not copied from an earlier report as targets.

## Route results

| URL | Local status | Indexing | What changed | Verdict |
| --- | --- | --- | --- | --- |
| `/privacy-policy` | 200 | index, follow. Canonical `https://www.earlyjobs.ai/privacy-policy`. One H1: “Privacy Policy”. | WebPage and BreadcrumbList JSON-LD only. Legal text was not edited. “July 7, 2025” is still in the HTML. | Pass locally |
| `/recruiter` | 200 | noindex, follow. Self-canonical. One H1. | Extra H1s were demoted to H2. The existing classes were kept. The published counts (1K+, 70+, 5K+, 7+, 250+, 15+) were not rewritten. No JobPosting. Still absent from the sitemap. | Pass for the heading and index rules. The legacy wording and counts remain an unresolved content risk. |
| `/recruiters` | 200 | index, follow. Canonical `https://www.earlyjobs.ai/become-a-recruiter`. One H1. | No second schema block and no noindex. Navigation and contextual links now go to `/become-a-recruiter`. Absent from the sitemap. | Pass locally |
| `/recruitment-process-outsourcing` | 200 | index, follow. Self-canonical. One H1. | Section and FAQ headings demoted to H2. WebPage, BreadcrumbList, and Service JSON-LD added. | Pass for metadata, headings, and schema. Body still says “ENGAGE WITH THE BEST RPO FIRM”. That sentence was not rewritten. |
| `/resources` | 200 | noindex, follow. One H1: “Resources”. | No change. No article or collection schema. Absent from the sitemap. No cards or downloads were invented. | Pass locally. The page is still empty by design. |
| `/sales-marketing-services` | 200 | index, follow. Self-canonical. One H1. | Two section H1s and the shared FAQ heading demoted to H2. WebPage, BreadcrumbList, and Service JSON-LD added. | Pass for headings and schema. Existing grammar (“We stands”) and claims such as “10K+” and “top-tier” were left in the body. |
| `/sitemap.xml` | 200 | XML endpoint, not an HTML page. | No schema. Production canonical host only. | Pass locally |
| `/story` | 200 | index, follow. Self-canonical. One H1: “We're Building a Better Way to Hire.” | AboutPage and BreadcrumbList added. The visible H1 and the existing description were kept. | Pass locally |
| `/team` | 200 | index, follow. Self-canonical. One H1: “Our Team”. Title is now “Our Team \| EarlyJobs”. | WebPage and BreadcrumbList. Five Person nodes, matching the five people rendered from the teams API: name, job title, image, LinkedIn, and biography only where those fields are shown. | Pass locally. If the teams API fails, the page renders WebPage only and no Person nodes. |
| `/teams` | 301 to `/team` | Redirect source. | No schema on the 301 response. No internal links to `/teams` were found. Absent from the sitemap. One hop, then `/team`. | Pass locally |
| `/terms-and-conditions` | 200 | index, follow. Self-canonical. One H1: “Terms & Conditions”. | WebPage and BreadcrumbList only. Legal text was not edited. “July 7, 2025” is still in the HTML. | Pass locally |
| `/top-executive-recruitment-firm` | 200 | index, follow. Self-canonical. One H1. | The extra H1 was demoted to H2. Service JSON-LD uses “Executive recruitment” and does not add a “top” claim. The slug was not changed. | Pass for headings and schema. The visible H1 still begins “We serves…”. That sentence was not rewritten. |
| `/value-staffing-service` | 200 | index, follow. Self-canonical. One H1. | The extra H1 was demoted to H2. Service JSON-LD uses the existing service name. The slug was not changed and “value staffing” was not redefined. | Pass locally |

Trailing slashes such as `/privacy-policy/` return the framework’s 308 to the slashless path. That is separate from the `/teams` 301.

## Schema

New JSON-LD reuses `https://www.earlyjobs.ai/#organization` and `https://www.earlyjobs.ai/#website`. These pages do not emit a second Organization node.

| Page | Types rendered locally |
| --- | --- |
| Privacy, terms | WebPage, BreadcrumbList |
| Story | AboutPage, BreadcrumbList |
| Team | WebPage, BreadcrumbList, and Person inside `mainEntity` for each visible member |
| Four service pages | WebPage, BreadcrumbList, Service |
| Resources, recruiter, recruiters, sitemap, teams | No page-level JSON-LD |

FAQPage was not added to the four service pages. The questions are on the page, inside a collapsed accordion, and several answers make process or fee statements that this pass did not adopt into schema. FAQ rich results are also not a general commercial-site feature. The canonical recruiter URL, `/become-a-recruiter`, already had its own WebPage, Service, and FAQPage from earlier work. `/recruiters` does not repeat that block.

No AggregateRating, Review, JobPosting, Article, or LegalService was added on these routes.

## Internal links

Checked in the rendered HTML of `/`, `/story`, `/recruiters`, and `/sales-marketing-services`.

- “For Recruiters” in the header now points to `/become-a-recruiter`. The label is unchanged.
- “Explore How It Works”, the recruiter-page cross link, and the unused story call-to-action now point to `/become-a-recruiter` instead of `/recruiters` or `/recruiter`.
- No remaining `href="/recruiters"`, `href="/recruiter"`, or `href="/teams"` was found in those renders.
- The footer already linked to `/team`, privacy, terms, contact, and `/sitemap.xml`. Those were left in place. Sitemap was not added as a new navigation item.

## What was deliberately not changed

- Privacy and terms legal copy.
- Already accurate titles and descriptions on privacy, terms, story, and the four service pages. The team title was the exception, so it matches the visible H1 “Our Team”.
- `/resources` and `/recruiter` stay noindex and out of the sitemap.
- `/recruiters` stays indexable with a canonical to `/become-a-recruiter`. It was not also set to noindex.
- Sales-page “Executive Search” sections stay. They describe sales and marketing leadership hiring, not a pasted copy of the executive-recruitment page.
- No new calls to action, filters, forms, images, or layout changes. Heading edits kept the existing CSS classes. The sales hero still renders as the large page heading.
- No new jobs, articles, ratings, prices, SLAs, or placement guarantees.

## Files

- `components/legacy/Servicesfooter/Faqs.tsx` — FAQ heading is an H2. The same component is used by other service templates, so those pages lose the extra FAQ H1 as well.
- `components/legacy/pages/ourServices/RecruitmentProcessOutsourcingPage.jsx`
- `components/legacy/pages/ourServices/SalesMarketingServicePage.jsx`
- `components/legacy/pages/ourServices/TopExecutiveServicePage.jsx`
- `components/legacy/pages/ourServices/ValueStaffingServicesPage.jsx`
- `components/legacy/pages/Recruiter/index.js`
- `components/navbar.tsx`
- `components/how-it-works.tsx`
- `components/freelance-recruiters/page.tsx`
- `components/story/cta-block.tsx`
- `app/privacy-policy/page.tsx`
- `app/terms-and-conditions/page.tsx`
- `app/story/page.tsx`
- `app/team/page.tsx`
- `app/recruitment-process-outsourcing/page.tsx`
- `app/sales-marketing-services/page.tsx`
- `app/top-executive-recruitment-firm/page.tsx`
- `app/value-staffing-service/page.tsx`
- `schema/privacy-policy.jsonld.json`
- `schema/terms-and-conditions.jsonld.json`
- `schema/story.jsonld.json`
- `schema/recruitment-process-outsourcing.jsonld.json`
- `schema/sales-marketing-services.jsonld.json`
- `schema/top-executive-recruitment-firm.jsonld.json`
- `schema/value-staffing-service.jsonld.json`

## Still open

- Deploy this build and recheck status, canonical, robots, H1, JSON-LD, and sitemap on `https://www.earlyjobs.ai`. Until then, production is Not Verified.
- Service-page body copy still includes superlatives, grammar errors, and figures such as “10K+” that were not verified in this pass.
- `/recruiter` remains a noindex legacy page with its original counts.
- `/resources` remains an empty noindex page until real resources exist.
- The four service FAQs are visible in the accordion and are not represented as FAQPage.
- Performance, mobile layout, and form submission were not tested.
