"use client";

import { Briefcase, Building, MapPin, Rocket, Users } from "lucide-react";
import Image from "next/image";
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
        <div className="grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-5">
          <div className="flex flex-col">
            <Link href="/" className="mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="earlyjobs" className="h-[90px] w-[130px]" />
            </Link>
            <div className="mb-5 flex items-start">
              <SlLocationPin className="mr-2.5 text-2xl text-gray-400" />
              <p className="text-base font-normal leading-6 text-gray-400">
                2nd Floor, Regent Insignia, Obeya Tulip, Mahakavi Vemana Rd, KHB Block
                Koramangala, Koramangala 4-B Block, 4th Block, Koramangala, Bengaluru,
                Karnataka 560095
              </p>
            </div>
            <div className="mb-5 flex items-start">
              <HiOutlineMail className="mr-2.5 text-2xl text-gray-400" />
              <a
                href="mailto:info@earlyjobs.in"
                className="text-base font-normal leading-6 text-gray-400 no-underline"
              >
                info@earlyjobs.in
              </a>
            </div>
            <div className="mb-5 flex items-start">
              <HiOutlinePhone className="mr-2.5 text-2xl text-gray-400" />
              <a
                href="tel:+918217527926"
                className="text-base font-normal leading-6 text-gray-400 no-underline"
              >
                +91 8217527926
              </a>
            </div>
            <div className="mt-5 flex items-center">
              {social.map(({ label, href, Icon, className }) => (
                <a
                  key={label}
                  href={href}
                  className="mr-5 no-underline"
                  rel="noreferrer"
                  target="_blank"
                  aria-label={label}
                >
                  <Icon className={className ?? "text-2xl text-white"} />
                </a>
              ))}
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
              href="/jobs"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Job Openings
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
              href="/top-executive-recruitment-firm"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Top Executive Recruitment
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
              href="/value-staffing-service"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              Value Staffing Services
            </Link>
          </div>

          <div className="flex flex-col">
            <h3 className="pt-8 text-base font-semibold leading-5 text-white uppercase lg:pt-12">
              Tools & Tie-Ups
            </h3>
            <Link
              href="/agency-onboarding"
              className="mt-4 bg-transparent p-0 text-left text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <Rocket className="mr-2 inline-block h-5 w-5" />
              Agencies and consultancies tie-up
            </Link>
            <Link
              href="/clientele"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <Building className="mr-2 inline-block h-5 w-5" />
              Company Tie-Ups
            </Link>
            <Link
              href="/franchise"
              className="mt-4 text-base font-normal leading-5 text-gray-400 no-underline hover:text-gray-200 lg:mt-6"
            >
              <MapPin className="mr-2 inline-block h-5 w-5" />
              Franchise With Us
            </Link>
            <Link
              href="/recruiter"
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
              <Briefcase className="mr-2 inline-block h-5 w-5" />
              Gigworkers Hiring
            </a>
          </div>
        </div>

        <div className="mt-5 w-full px-4 lg:px-8">
          <h3 className="text-base font-semibold leading-5 text-white">Available on</h3>
          <div className="mt-1 flex w-full items-center justify-between gap-4">
            <div className="flex shrink-0 items-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.victaman.earlyjobs"
                rel="noreferrer"
                target="_blank"
                className="flex h-[92px] shrink-0 items-center overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/google-play-badge-logo.svg"
                  alt="google-play"
                  className="-translate-y-1 h-auto w-[120px] select-none"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/earlyjobs-ai/id6754554572"
                rel="noreferrer"
                target="_blank"
                className="flex h-[92px] shrink-0 items-center overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/app-store-logo.svg"
                  alt="app-store"
                  className="-translate-y-1 h-auto w-[120px] select-none"
                />
              </a>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
                    <Image
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
                  href="tel:+918217527926"
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
