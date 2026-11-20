"use client";

import { Building, GraduationCap, HardHat, MapPin, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import {
  SiAnthropic,
  SiGithubcopilot,
  SiGooglegemini,
  SiPerplexity,
  SiX,
} from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";
import type { IconType } from "react-icons";
import { FooterScroll } from "@/components/footer-scroll";
import { earlyJobsContact } from "@/lib/contact";

const EARLYJOBS_AI_PROMPT =
  "What is EarlyJobs.ai (https://www.earlyjobs.ai) and how can it help job seekers, employers, and recruiters in India?";

const buildAiAssistantUrl = (baseUrl: string, param: "q" | "prompt" = "q") =>
  `${baseUrl}?${param}=${encodeURIComponent(EARLYJOBS_AI_PROMPT)}`;

type AiLink =
  | { name: string; href: string; Icon: IconType; image?: undefined }
  | { name: string; href: string; image: string; Icon?: undefined };

const aiAssistantLinks: AiLink[] = [
  {
    name: "ChatGPT",
    href: buildAiAssistantUrl("https://chatgpt.com"),
    image: "/store/ai-openai.svg",
  },
  { name: "Grok", href: buildAiAssistantUrl("https://grok.com"), Icon: SiX },
  { name: "Claude", href: buildAiAssistantUrl("https://claude.ai/new"), Icon: SiAnthropic },
  {
    name: "Gemini",
    href: buildAiAssistantUrl("https://gemini.google.com/app", "prompt"),
    Icon: SiGooglegemini,
  },
  {
    name: "Perplexity",
    href: buildAiAssistantUrl("https://www.perplexity.ai/search"),
    Icon: SiPerplexity,
  },
  {
    name: "Copilot",
    href: buildAiAssistantUrl("https://copilot.microsoft.com"),
    Icon: SiGithubcopilot,
  },
];

const social = [
  {
    label: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/earlyjobs",
    Icon: FaFacebook,
    className: "text-2xl text-white",
  },
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/earlyjobs.ai",
    Icon: AiFillInstagram,
    className: "text-3xl text-white",
  },
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/earlyjobs",
    Icon: FaLinkedin,
    className: "text-2xl text-white",
  },
  {
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@earlyjobs",
    Icon: FaYoutube,
    className: "text-2xl text-white",
  },
] as const;

export function SiteFooter() {
  return (
    <div className="relative z-40 w-full min-w-0 overflow-x-clip">
      <footer className="site-footer mt-auto flex w-full flex-col items-center bg-[#0A0F10] px-3 py-8 text-white md:py-10 lg:py-10">
        <div className="relative grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-5">
          <div className="flex h-full flex-col">
            <Link href="/" className="mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="EarlyJobs" className="h-[90px] w-[130px]" />
            </Link>
            <div className="mb-5 flex items-start">
              <SlLocationPin className="mr-2.5 shrink-0 text-2xl text-gray-400" />
              <p className="text-base font-normal leading-6 text-gray-400">
                {earlyJobsContact.address}
              </p>
            </div>
            <div className="mb-5 flex items-start">
              <HiOutlineMail className="mr-2.5 shrink-0 text-2xl text-gray-400" />
              <a
                href={`mailto:${earlyJobsContact.email}`}
                className="text-base font-normal leading-6 text-gray-400 no-underline"
              >
                {earlyJobsContact.email}
              </a>
            </div>
            <div className="mb-5 flex items-start">
              <HiOutlinePhone className="mr-2.5 shrink-0 text-2xl text-gray-400" />
              <a
                href={`tel:${earlyJobsContact.phoneTel}`}
                className="text-base font-normal leading-6 text-gray-400 no-underline"
              >
                {earlyJobsContact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="pt-8 text-base font-semibold leading-5 text-white uppercase lg:pt-12">
              Company
            </h3>
            <Link
              href="/about"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              About Us
            </Link>
            <Link
              href="/team"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Team
            </Link>
            <Link
              href="/blogs"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Blogs
            </Link>
            <Link
              href="/story"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Our Story
            </Link>
            <Link
              href="/newsroom"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Newsroom
            </Link>
            <Link
              href="/investor-relations"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Investor Relations
            </Link>
          </div>

          <div className="flex flex-col">
            <h3 className="pt-8 text-base font-semibold leading-5 text-white uppercase lg:pt-12">
              GCC
            </h3>
            <Link
              href="/gcc-hiring-solutions"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              GCC Hiring Solutions
            </Link>
            <Link
              href="/build-gcc-india"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Build GCC India
            </Link>
            <Link
              href="/gcc-recruitment-partner"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              GCC Recruitment Partner
            </Link>
            <Link
              href="/offshore-capability-center-hiring"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Offshore Capability Center Hiring
            </Link>
            <Link
              href="/gcc-talent-acquisition"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              GCC Talent Acquisition
            </Link>
            <Link
              href="/india-gcc-hiring-services"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              India GCC Hiring Services
            </Link>
          </div>

          <div className="flex flex-col">
            <h3 className="pt-8 text-base font-semibold leading-5 text-white uppercase lg:pt-12">
              Our Services
            </h3>
            <Link
              href="/it-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              IT Recruitment
            </Link>
            <Link
              href="/finance-and-accounting-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Finance & Accounting Recruitment
            </Link>
            <Link
              href="/sales-marketing-services"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Sales & Marketing Recruitment
            </Link>
            <Link
              href="/global-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Global Recruitment
            </Link>
            <Link
              href="/hr-executive-recruitment-services"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              HR & Executive Recruitment
            </Link>
            <Link
              href="/recruitment-process-outsourcing"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Recruitment Process Outsourcing
            </Link>
            <Link
              href="/ai-recruiting-automation-healthcare-staffing"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Healthcare Staffing Automation
            </Link>
            <Link
              href="/ai-recruiting-automation-manufacturing"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Manufacturing Recruiting Automation
            </Link>
            <Link
              href="/ai-recruiting-automation-ev-manufacturing"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              EV Manufacturing Automation
            </Link>
            <Link
              href="/pharmaceutical-manufacturing-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Pharmaceutical Manufacturing Recruitment
            </Link>
            <Link
              href="/electronics-manufacturing-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Electronics Manufacturing Recruitment
            </Link>
            <Link
              href="/solar-renewable-energy-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Solar & Renewable Energy Recruitment
            </Link>
            <Link
              href="/ev-automotive-manufacturing-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              EV & Automotive Manufacturing Recruitment
            </Link>
            <Link
              href="/diagnostic-centre-lab-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Diagnostic Centre & Lab Recruitment
            </Link>
            <Link
              href="/warehouse-distribution-centre-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Warehouse & Distribution Centre Recruitment
            </Link>
            <Link
              href="/battery-manufacturing-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Battery Manufacturing Recruitment
            </Link>
            <Link
              href="/food-processing-fmcg-manufacturing-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Food Processing & FMCG Recruitment
            </Link>
            <Link
              href="/construction-infrastructure-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Construction & Infrastructure Recruitment
            </Link>
            <Link
              href="/medical-device-manufacturing-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Medical Device Manufacturing Recruitment
            </Link>
            <Link
              href="/semiconductor-electronics-component-recruitment"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Semiconductor & Electronics Component Recruitment
            </Link>
          </div>

          <div className="flex flex-col">
            <h3 className="pt-8 text-base font-semibold leading-5 text-white uppercase lg:pt-12">
              Tools & Tie-Ups
            </h3>
            <Link
              href="/recruiting-roi-calculator"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Recruiting ROI Calculator
            </Link>
            <Link
              href="/salary-benchmark-tool"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Salary Benchmarking Tool
            </Link>
            <Link
              href="/tools/cost-per-hire-calculator"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Cost Per Hire Calculator
            </Link>
            <Link
              href="/tools/employee-attrition-cost-calculator"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Employee Attrition Cost Calculator
            </Link>
            <Link
              href="/tools/recruitment-funnel-calculator"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Recruitment Funnel Calculator
            </Link>
            <Link
              href="/tools/vacancy-cost-calculator"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Vacancy Cost Calculator
            </Link>
            <Link
              href="/tools/job-description-generator"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Job Description Generator
            </Link>
            <Link
              href="/tools/salary-benchmarking-planner"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Salary Benchmarking Planner
            </Link>
            <Link
              href="/compare/recruitment-agency-vs-in-house-hiring"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Agency vs In-House Hiring
            </Link>
            <Link
              href="/resources/bulk-hiring-checklist"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Bulk Hiring Checklist
            </Link>
            <Link
              href="/resources/90-day-workforce-hiring-plan"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              90-Day Hiring Plan Template
            </Link>
            <Link
              href="/agency-partnerships"
              className="mt-4 bg-transparent p-0 text-left text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <Rocket className="mr-2 inline-block h-5 w-5" />
              Consultancies tie ups
            </Link>
            <Link
              href="/clientele"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <Building className="mr-2 inline-block h-5 w-5" />
              Hiring Partners
            </Link>
            <Link
              href="/franchise"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <MapPin className="mr-2 inline-block h-5 w-5" />
              Franchise With Us
            </Link>
            <Link
              href="/franchise/locations"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Franchise Locations
            </Link>
            <Link
              href="/become-a-recruiter"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <Users className="mr-2 inline-block h-5 w-5" />
              Become Freelance Recruiter
            </Link>
            <a
              href="https://gigkaro.in"
              target="_blank"
              rel="noreferrer"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <HardHat className="mr-2 inline-block h-5 w-5" />
              Hire Gigworkers
            </a>
            <Link
              href="/internship"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <GraduationCap className="mr-2 inline-block h-5 w-5" />
              HR Internships
            </Link>
          </div>
        </div>

        <div className="mt-8 w-full px-4 text-center sm:mt-6 lg:px-8">
          <h3 className="text-base font-semibold leading-5 text-white uppercase">
            Our Flywheels
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 text-center sm:mt-5 md:grid-cols-4 md:gap-x-6 lg:gap-x-10">
            <a
              href="https://www.earlyjobs.ai"
              target="_blank"
              rel="noreferrer"
              className="min-w-0 no-underline"
            >
              <span className="block text-base font-semibold leading-5 text-white hover:text-gray-200">
                EarlyJobs
              </span>
              <span className="mt-1 block text-sm font-normal leading-5 text-gray-400">
                Recruiter-First Hiring Network
              </span>
            </a>
            <a
              href="https://www.huntlo.ai"
              target="_blank"
              rel="noreferrer"
              className="min-w-0 no-underline"
            >
              <span className="block text-base font-semibold leading-5 text-white hover:text-gray-200">
                Huntlo AI
              </span>
              <span className="mt-1 block text-sm font-normal leading-5 text-gray-400">
                AI Hiring Infrastructure
              </span>
            </a>
            <a
              href="https://gigkaro.in"
              target="_blank"
              rel="noreferrer"
              className="min-w-0 no-underline"
            >
              <span className="block text-base font-semibold leading-5 text-white hover:text-gray-200">
                GigKaro
              </span>
              <span className="mt-1 block text-sm font-normal leading-5 text-gray-400">
                Gig Hiring Infrastructure
              </span>
            </a>
            <a
              href="https://rojmitra.in"
              target="_blank"
              rel="noreferrer"
              className="min-w-0 no-underline"
            >
              <span className="block text-base font-semibold leading-5 text-white hover:text-gray-200">
                Rojmitra
              </span>
              <span className="mt-1 block text-sm font-normal leading-5 text-gray-400">
                Workforce Intelligence for India
              </span>
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:mt-6 sm:grid-cols-3 sm:items-end">
            <div className="flex flex-col items-start">
              <p className="text-base font-semibold leading-5 text-white">Ask AI about us</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                {aiAssistantLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="shrink-0 text-white transition-transform duration-200 hover:scale-105 active:scale-95"
                    rel="noreferrer"
                    target="_blank"
                    aria-label={item.name}
                    title={item.name}
                  >
                    {item.image ? (
                      // SVG is served directly. The image optimizer rejects this file type.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 object-contain sm:size-6"
                      />
                    ) : item.Icon ? (
                      <item.Icon className="text-xl sm:text-2xl" />
                    ) : null}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-base font-semibold leading-5 text-white">Follow us</p>
              <div className="mt-2 flex items-center justify-center">
                {social.map(({ label, href, Icon, className }) => (
                  <a
                    key={label}
                    href={href}
                    className="mr-5 last:mr-0 no-underline"
                    rel="noreferrer"
                    target="_blank"
                    aria-label={label}
                  >
                    <Icon className={className ?? "text-2xl text-white"} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start text-left sm:items-end sm:text-right">
              <p className="text-base font-semibold leading-5 text-white">Available on</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 sm:justify-end">
                <a
                  href="https://play.google.com/store/apps/details?id=com.victaman.earlyjobs"
                  rel="noreferrer"
                  target="_blank"
                  className="flex h-10 shrink-0 items-center overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/google-play-badge-logo.svg"
                    alt="Get it on Google Play"
                    className="-translate-y-1 h-auto w-[110px] select-none"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/earlyjobs-ai/id6754554572"
                  rel="noreferrer"
                  target="_blank"
                  className="flex h-10 shrink-0 items-center overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/app-store-logo.svg"
                    alt="Download on the App Store"
                    className="-translate-y-1 h-auto w-[110px] select-none"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full border-t border-gray-300 px-4 py-6">
          <div className="flex items-center justify-center text-center">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a
                  href="/privacy-policy"
                  className="text-lg text-gray-400 transition-all duration-300 hover:text-amber-500"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-and-conditions"
                  className="text-lg text-gray-400 transition-all duration-300 hover:text-amber-500"
                >
                  Terms & Conditions
                </a>
                <a
                  href="/sitemap.xml"
                  className="text-lg text-gray-400 transition-all duration-300 hover:text-amber-500"
                >
                  Sitemap
                </a>
                <a
                  href="/contact-us"
                  className="text-lg text-gray-400 transition-all duration-300 hover:text-amber-500"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-base font-normal leading-6 text-gray-400 lg:mt-0">
          © 2024-{new Date().getFullYear()} Victa EarlyJobs Technologies Private Limited |{" "}
          <span className="font-semibold">CIN</span>: U78300KA2025PTC198732 | All rights reserved.
        </p>
      </footer>
      <FooterScroll />
    </div>
  );
}
