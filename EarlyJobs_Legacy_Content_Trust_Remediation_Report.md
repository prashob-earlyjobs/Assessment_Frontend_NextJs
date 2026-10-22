# EarlyJobs legacy content, brand, and trust remediation

Local check date: 22 October 2026. Production (`www.earlyjobs.ai` and `dev.earlyjobs.ai`) was not deployed and was not re-crawled after these edits.

## 1. Legacy headings and brand voice

**Routes:** `/it-recruitment`, `/recruitment-process-outsourcing`  
**Status:** Fixed and verified locally

The strings lived in the legacy service templates, not in a CMS. Shared heading styles in `components/legacy/pages/ourServices/style.css` force `text-transform: uppercase`. A `service-page-heading-plain` class turns that off so the new sentence-case headings render as written. The hero eyebrow was an `h3` above the page `h1`; it is now a paragraph so the first heading is the H1.

| Location | Before | After |
| --- | --- | --- |
| `/it-recruitment` section heading | WELCOME TO EARLYJOBS CONSULTANCY - YOUR IT RECRUITMENT PARTNER | IT recruitment with EarlyJobs |
| `/it-recruitment` highlights heading | KEY HIGHLIGHTS OF CHOOSE OUR IT RECRUITMENT SERVICES. | Key Highlights of Our IT Recruitment Services |
| `/recruitment-process-outsourcing` eyebrow | ENGAGE WITH THE BEST RPO FIRM | Recruitment process outsourcing |
| `/recruitment-process-outsourcing` H1 | Our firm uses artificial intelligence to streamline your recruitment process outsourcing needs. | Recruitment process outsourcing for the hiring plan you share. |
| `/recruitment-process-outsourcing` section heading | WELCOME TO OUR Recruitment Process Outsourcing | How EarlyJobs supports recruitment process outsourcing |

No literal `###` was found in the rendered HTML. Nearby RPO cards that claimed “only the best candidates”, an AI-driven faster cycle, a published cost saving, or an end-to-end outcome were rewritten so they describe an agreed engagement and do not promise a result. Page metadata and `schema/recruitment-process-outsourcing.jsonld.json` were already factual and were left in place. One H1 remains on each page.

Verified on `http://127.0.0.1:200/it-recruitment` and `http://127.0.0.1:200/recruitment-process-outsourcing`: the old strings are absent, and the new H1s are present.

## 2. Service illustration

**Routes:** `/it-recruitment`, `/recruitment-process-outsourcing`  
**Status:** Fixed and verified locally

`HowWeHelpSection` renders `<img src="/services_imgs/features-summary.svg">`. The file is valid SVG (XML parses, 33,009 bytes, `image/svg+xml`). On the local dev server the image request returned HTTP 200 with `Content-Type: image/svg+xml`. In the browser the image completed decoding at 260×198 and showed the existing illustration of a person holding a scroll that reads “Here’s how we can help you..”. The same asset decoded on the RPO page. The PNG beside the RPO copy also decoded (471×305).

The Next.js image optimizer rejects this file. `GET /_next/image?url=/services_imgs/features-summary.svg&w=640&q=75` returns HTTP 400: “url parameter is valid but image type is not allowed”. These two pages do not use that optimizer for the illustration. Footer assistant icons that did use `next/image` for SVG files were switched to a normal `<img>`, which is why those icons also decode (150×150 and 800×800).

The illustration was not replaced. It already loads, and replacing it would change the artwork.

## 3. Expired franchise promotion

**Route:** `/franchise`  
**Status:** Fixed and verified locally

| Location | Before | After |
| --- | --- | --- |
| `LimitedOffer.jsx` deadline line | A promotional fee that ended on 31 August 2025 is no longer available. | Contact the EarlyJobs team for current commercial terms. |
| `FAQ.jsx` and `schema/franchise.jsonld.json` | The same August 2025 sentence | Contact the EarlyJobs team for the current terms. |

The visible block no longer lists a fee, a deposit, a “first 10” cap, or a deadline. The button still says “Apply for Franchise Now” and still opens the existing franchise request form. The form was not submitted.

Searches of the franchise components found no remaining “31 August 2025”, “June 20, 2025”, “50% risk”, or “Launch Offer”.

## 4. Brand casing

**Status:** Fixed and verified locally for controlled visible copy

`Earlyjobs` in visible copy was changed to `EarlyJobs` on the IT, RPO, HR, sales, executive, value-staffing, recruiter, agency-onboarding, and success-story surfaces, in the footer logo alt text, and in the story diagram label. The agency declaration now says “EarlyJobs reserves”. The franchise notification sign-off says “EarlyJobs team”.

### Exceptions kept

| Text | Why it stays |
| --- | --- |
| `whyEarlyjobs`, `EARLYJOBS_AI_PROMPT`, `EARLYJOBS_CAPABILITIES`, `earlyJobsContact` | Code identifiers. The prompt string itself says “EarlyJobs.ai”. |
| `info@earlyjobs.in`, `franchise@earlyjobs.in`, and other `@earlyjobs.in` addresses | Email domains. |
| Keyword strings such as `earlyjobs, early jobs` in `metaConstants.js` | Search queries, not a displayed brand name. |
| `earlyjobs.in` inside meta titles such as “Recruiter Job - earlyjobs.in” | The domain, not the wordmark. |
| `Victaman Enterprises` in the franchise email | Existing legal or historical name in that message. It was not rewritten. |
| `Victa EarlyJobs Technologies Private Limited` | Registered name. Casing already matches EarlyJobs. |
| Diagram nodes such as EMPLOYERS and RECRUITERS | Those are category labels in the same all-caps diagram style. The EarlyJobs node itself now reads `EarlyJobs`. |
| Older implementation reports | They quote the old heading as a historical finding. |

`metaConstants.js` still titles the legacy recruiter document “EarlyJobs-India's No.1 Portal…”. That superlative was already there. It was not removed in this pass. The recruiter card still says “100+ EarlyJobs Clients”.

## 5. Internship testimonials

**Route:** `/internship`  
**Status:** Fixed and verified locally

No consent record or source for the named quotes was in the repository. The stories section was removed, including Priya Sahu (Bilaspur), Rohit Meena, Ayesha Khatoon, Sneha Patil, Vikram Nair, and Divya Reddy, their locations, quotes, and star icons. The “Illustrative stories…” disclaimer and the Stories nav link were removed. `schema/internship.jsonld.json` has WebPage, BreadcrumbList, and FAQPage only. It has no Review, AggregateRating, or Person nodes for those names.

Rendered HTML on `http://127.0.0.1:200/internship` does not contain those names or the disclaimer.

The “Top performers also get” list, which offered awards and later roles without a source, now states what the page does not promise. The career-path heading notes that a later role is not promised. “No hidden charges. Ever.” was changed to “No registration fee is charged to join this internship,” matching the existing FAQ.

Still on the page, and not newly verified: the weekly free webinar (“100% free to attend”, “Limited seats”), the 3-month duration, and the career-step titles (intern, freelance recruiter, senior hiring manager). Those titles remain as descriptions, with the new sentence that they are not a promised progression.

## 6. SEO, structure, and accessibility

- Titles, descriptions, canonicals, and robots for `/it-recruitment`, `/recruitment-process-outsourcing`, `/franchise`, and `/internship` were not replaced. Indexing status is unchanged.
- RPO and franchise FAQ schema still match the visible answers that were edited. Internship schema does not describe the removed stories.
- IT and RPO each render one H1, then H2 and H3. The uppercase CSS no longer restyles the rewritten headings.
- The service illustration has alt text: “Illustration for this recruitment service”. The RPO side image alt is “Recruitment process outsourcing”.
- Franchise apply control is still in the rendered page. It was not submitted.
- Internal nav links on the checked pages still resolve in the accessibility tree.

## 7. Commands

| Command | Result |
| --- | --- |
| `npx tsc --noEmit` | Exit 0 |
| `npx next build` | Exit 0. Next.js 16.3.6 compiled and generated 53 routes. |
| `npx eslint` on `success-stories.tsx`, `ecosystem-svg.tsx`, `site-footer.tsx` | Exit 0 |
| `npx eslint` on the legacy service, franchise, and internship files | Those files are eslint-ignored. No new lint rule was applied to them. |
| Automated test script | None in `package.json`. |

## 8. Not verified

- Production and `dev.earlyjobs.ai` after a deploy.
- Franchise, internship, and contact form delivery.
- Whether every remaining service page outside this pass still uses consultancy-style claims. Sales, HR, and executive pages had `Earlyjobs` corrected, but their existing “leading” and “best” sentences were not rewritten.
- The “No.1” recruiter title and the “100+ EarlyJobs Clients” line.
