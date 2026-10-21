# EarlyJobs full-website SEO and AEO report

Date: 21 October 2026. Checks were run against the local app at `http://localhost:3001`. Canonicals and the sitemap use `https://www.earlyjobs.ai`. This is not a claim that the live production host was crawled, and it is not a claim that rankings or indexing will change.

The machine-readable inventory is `EarlyJobs_Full_Website_SEO_AEO_Inventory.csv`.

## 1. Scope

| Item | Count |
| --- | ---: |
| URLs in the generated sitemap | 988 |
| URLs in the inventory CSV | 997 |
| Static and template pages whose HTML was opened | 40 |
| Published job URLs inventoried from the live jobs feed | 911 |
| Published blog URLs inventoried from the live blog feed | 45 |
| Redirects verified | 3 |
| Non-indexable utility or legacy URLs verified | 5 |
| URLs whose page HTML was not opened | 954 |
| Production build | Not run |

The 954 unopened URLs are the other published jobs and articles. They are in the sitemap because the feed returned them. Their titles, H1s, and schema were not opened one by one. The job template and the blog template were each checked on one live record.

Routes were taken from `app/**/page.tsx`, `next.config.ts` redirects, the sitemap, and the published jobs and blogs APIs. No extra marketing URLs were invented.

## 2. What was verified

| Check | Result |
| --- | --- |
| HTTP status for the static route list, three redirects, one job, one article, one unknown article, and one unknown path | Verified on local dev |
| Canonical tags on the rendered static routes, the sample job, and the sample article | Verified. They point at `https://www.earlyjobs.ai` |
| Robots meta on those rendered routes | Verified |
| `robots.txt` for `localhost`, `dev.earlyjobs.ai`, and `www.earlyjobs.ai` via the Host header on the local server | Verified |
| Sitemap membership after regeneration | Verified. 32 static URLs, 45 articles, 911 jobs. `/resources` and `/recruiters` are absent |
| H1 count on rendered routes | Verified. Seven legacy service templates and `/recruiter` still have more than one H1 |
| JobPosting on one active vacancy with a description, `created_at`, company, and location | Verified |
| BlogPosting on one published article | Verified |
| Unknown blog slug | HTTP 404, `noindex` |
| Unknown path `/not-a-real-page` | HTTP 404 and the not-found page |
| Trailing slash `/about/` | HTTP 308 to `/about` |
| `/about-us`, `/about-us/our-story`, `/teams` | HTTP 301 to `/about`, `/story`, and `/team` |
| Typecheck `npx tsc --noEmit` | Passed |
| Core Web Vitals, Lighthouse, mobile emulation, image compression, full broken-link crawl, form submission, and job-application submission | Not Verified |
| Live `https://www.earlyjobs.ai` and `https://dev.earlyjobs.ai` responses | Not Verified. Host-header checks were local only |

A rendered page marked Pass in the CSV means the checks named in that row did not show a remaining defect. It does not mean every possible SEO check passed.

## 3. Indexing controls

Local and development hosts disallow every path. A request with `Host: www.earlyjobs.ai` allows crawling and advertises `https://www.earlyjobs.ai/sitemap.xml`. A request with `Host: dev.earlyjobs.ai` disallows `/`. This was not changed.

Utility routes stay out of the sitemap and send `noindex`:

- `/resources` is only the heading “Resources”. It is now `noindex` and was removed from the sitemap.
- `/agency-onboarding`, `/become-a-recruiter/apply`, and `/become-a-recruiter/apply/thank-you` were already `noindex`.
- `/recruiter` is a legacy page that still shows counts that are not the dashboard figures (`1K+`, `70+`, `5K+`, `7+` years, `250+`, `15+`). It is now `noindex` and is not in the sitemap. The visible counts were not rewritten, because they do not map to the dashboard fields.

`/recruiters` and `/become-a-recruiter` render the same page. `/recruiters` now canonicalises to `/become-a-recruiter`, and only `/become-a-recruiter` is in the sitemap.

## 4. Changes made

- Sitemap now lists the static canonical URLs, every published blog slug, and every published job URL returned by the live feeds. It no longer stamps every URL with the current time. `/resources` and `/recruiters` are excluded. Redirect sources were already excluded.
- Job detail pages now have a canonical URL, a description taken from the vacancy text, and `noindex` when the vacancy is inactive. Active vacancies with a description, post date, and company name get JobPosting markup that uses those same fields. Salary and employment type are included only when the feed provides a known value.
- Blog articles with a title, body, and publish date get BlogPosting markup. The listing page does not.
- Pages that previously inherited the root description now have their own title, description, and canonical: story, team, privacy policy, terms, value staffing, recruitment process outsourcing, sales and marketing, and executive recruitment.
- Open Graph images that pointed at missing `/og/...` or `/images/og-services.jpg` files now use `/images/logo.png`. The logo file is 1000×650, so the metadata no longer claims 1200×630.
- The jobs index uses one H1, “Open roles”. Extra H1 tags inside a job description are rendered as H2 so the vacancy title is the only H1.
- The not-found page title is “Page not found | EarlyJobs” and is `noindex`.

Network counts on the public marketing pages still come from the dashboard API. That work is separate from this audit and was left in place.

## 5. Issues still open

| Priority | Issue |
| --- | --- |
| P2 | `/it-recruitment` (5), `/sales-marketing-services` (4), `/finance-and-accounting-recruitment` (3), `/hr-executive-recruitment-services` (3), `/top-executive-recruitment-firm` (3), `/recruitment-process-outsourcing` (3), and `/value-staffing-service` (3) still render more than one H1. Those headings are in the older service templates. They were not restyled in this pass. |
| P2 | `/newsroom` and `/press-release` are both indexable and render the same published list, with different headings. |
| P2 | `/recruiter` is noindex, but anyone who opens it still sees the unverified legacy counts. |
| P2 | Social images use the logo because the referenced Open Graph files are not in the repository. A 1200×630 image was not created. |
| P3 | 954 job and article URLs were inventoried, not opened. A later crawl should sample more than one of each template. |
| Not Verified | Performance, mobile layout, image weight, broken internal links beyond the route list, and form or application submission. |

JobPosting was not added to `/jobs`. NewsArticle was not added to the newsroom or press-release listings, because those pages are collections and the items link out to existing coverage.

## 6. Files

- `app/sitemap.ts`
- `app/not-found.tsx`
- `app/jobs/[slug]/[jobId]/page.tsx`
- `app/blogs/[slug]/page.tsx`
- `app/story/page.tsx`, `app/team/page.tsx`, `app/recruiters/page.tsx`, `app/resources/page.tsx`, `app/recruiter/page.tsx`
- `app/privacy-policy/page.tsx`, `app/terms-and-conditions/page.tsx`
- `app/value-staffing-service/page.tsx`, `app/recruitment-process-outsourcing/page.tsx`, `app/sales-marketing-services/page.tsx`, `app/top-executive-recruitment-firm/page.tsx`
- `lib/page-metadata.ts`, `lib/public-jobs.ts`, `lib/public-blogs.ts`, `lib/job-posting.ts`
- `components/jobs/open-roles.tsx`
- `components/legacy/gcc/GccRoutePage.tsx`
- `EarlyJobs_Full_Website_SEO_AEO_Inventory.csv`

`npx tsc --noEmit` passed. `next build` was not run. The website is not fully optimised: the unopened job and article URLs, the legacy multiple-H1 templates, the shared newsroom and press-release list, and the untested performance and form checks are still open.
