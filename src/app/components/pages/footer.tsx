"use client"
import { MapPin, Building, GraduationCap, Lightbulb, Users, Tag, BarChart2, Rocket, UserCog } from "lucide-react";
import React from 'react';
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiAnthropic, SiGithubcopilot, SiGooglegemini, SiOpenai, SiPerplexity, SiX } from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import FooterScroll from "./FooterScroll";

const EARLYJOBS_AI_PROMPT =
  "What is EarlyJobs.ai (https://www.earlyjobs.ai) and how can it help job seekers, employers, and recruiters in India?";

const buildAiAssistantUrl = (baseUrl: string, param: "q" | "prompt" = "q") =>
  `${baseUrl}?${param}=${encodeURIComponent(EARLYJOBS_AI_PROMPT)}`;

const aiAssistantLinks = [
  { name: "ChatGPT", href: buildAiAssistantUrl("https://chatgpt.com"), Icon: SiOpenai },
  { name: "Grok", href: buildAiAssistantUrl("https://grok.com"), Icon: SiX },
  { name: "Claude", href: buildAiAssistantUrl("https://claude.ai/new"), Icon: SiAnthropic },
  { name: "Gemini", href: buildAiAssistantUrl("https://gemini.google.com/app", "prompt"), Icon: SiGooglegemini },
  { name: "Perplexity", href: buildAiAssistantUrl("https://www.perplexity.ai/search"), Icon: SiPerplexity },
  { name: "Copilot", href: buildAiAssistantUrl("https://copilot.microsoft.com"), Icon: SiGithubcopilot },
];

const Footer = () => {
  const router = useRouter();

  return (
    <>
      <footer className="w-full flex flex-col items-center py-8 bg-[#0A0F10] text-white md:py-10 lg:py-10 px-3">
        <div className="grid grid-cols-1 gap-5 px-4 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:px-8">
          <div className="flex flex-col">
            <Link href="/" className="mb-5">
              <img src="/images/logo.png" alt="earlyjobs" className="w-[130px] h-[90px]" />
            </Link>
            <div className="flex items-start mb-5">
              <SlLocationPin className="text-gray-400 text-2xl mr-2.5" />
              <p className="text-gray-400 text-base font-normal leading-6">
                53, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034
              </p>
            </div>
            <div className="flex items-start mb-5">
              <HiOutlineMail className="text-gray-400 text-2xl mr-2.5" />
              <a href="mailto:info@earlyjobs.in" className="text-gray-400 text-base font-normal leading-6 no-underline">
                info@earlyjobs.in
              </a>
            </div>
            <div className="flex items-start mb-5">
              <HiOutlinePhone className="text-gray-400 text-2xl mr-2.5" />
              <a href="tel:+918217527926" className="text-gray-400 text-base font-normal leading-6 no-underline">
                +91 8217527926
              </a>
            </div>
            <div className="flex items-center mt-5">
              <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL} className="mr-5 no-underline" rel="noreferrer" target="_blank">
                <FaFacebook className="text-white text-2xl" />
              </a>
              <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} className="mr-5 no-underline" rel="noreferrer" target="_blank">
                <AiFillInstagram className="text-white text-3xl" />
              </a>
              <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL} className="mr-5 no-underline" rel="noreferrer" target="_blank">
                <FaLinkedin className="text-white text-2xl" />
              </a>
              <a href={process.env.NEXT_PUBLIC_YOUTUBE_URL} className="mr-5 no-underline" rel="noreferrer" target="_blank">
                <FaYoutube className="text-white text-2xl" />
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="pt-8 text-white text-base font-semibold uppercase leading-5 lg:pt-12">Company</h3>
            <Link href="/about-us" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">About Us</Link>
            <Link href="/team" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Team</Link>
            <Link href="/blogs" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Blogs</Link>
            <a href="tel:+918217527926" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 cursor-pointer lg:mt-6" id="contact-link">Contact Us</a>
            <Link href="/story" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Our Story</Link>
            <Link href="/jobs" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Job Openings</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="pt-8 text-white text-base font-semibold uppercase leading-5 lg:pt-12">GCC</h3>
            <Link href="/gcc-hiring-solutions" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">GCC Hiring Solutions</Link>
            <Link href="/build-gcc-india" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Build GCC India</Link>
            <Link href="/gcc-recruitment-partner" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">GCC Recruitment Partner</Link>
            <Link href="/offshore-capability-center-hiring" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Offshore Capability Center Hiring</Link>
            <Link href="/gcc-talent-acquisition" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">GCC Talent Acquisition</Link>
            <Link href="/india-gcc-hiring-services" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">India GCC Hiring Services</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="pt-8 text-white text-base font-semibold uppercase leading-5 lg:pt-12">Our Services</h3>
            <Link href="/it-recruitment" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">IT Recruitment</Link>
            <Link href="/finance-and-accounting-recruitment" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Finance & Accounting Recruitment</Link>
            <Link href="/sales-marketing-services" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Sales & Marketing Recruitment</Link>
            <Link href="/top-executive-recruitment-firm" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Top Executive Recruitment</Link>
            <Link href="/hr-executive-recruitment-services" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">HR & Executive Recruitment</Link>
            <Link href="/recruitment-process-outsourcing" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Recruitment Process Outsourcing</Link>
            <Link href="/value-staffing-service" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Value Staffing Services</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="pt-8 text-white text-base font-semibold uppercase leading-5 lg:pt-12">Tools & Tie-Ups</h3>
            {/* <Link href="/assessments" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
              <BarChart2 className="w-5 h-5 mr-2 inline-block" />
              Assessments
            </Link> */}
            <Link
              href="/agency-onboarding"
              className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline text-left lg:mt-6 bg-transparent p-0"
            >
              <Rocket className="w-5 h-5 mr-2 inline-block" />
              Agencies and consultancies tie-up
            </Link>

            <Link href="/clientele" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
              <Building className="w-5 h-5 mr-2 inline-block" />
              Company Tie-Ups
            </Link>
            <Link href="/franchise" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
              <MapPin className="w-5 h-5 mr-2 inline-block" />
              Franchise With Us
            </Link>
            {/* <Link href="/join-creator-programme" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
              <Users className="w-5 h-5 mr-2 inline-block" />
              Join Creator Programme
            </Link> */}
            <Link href="/recruiter" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
              <Users className="w-5 h-5 mr-2 inline-block" />
              Become Freelance Recruiter
            </Link>

            {/* <Link href="/freelance-career-counsellor" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
              <UserCog className="w-5 h-5 mr-2 inline-block" />
              Freelance Career Counsellor
            </Link> */}
          </div>
        </div>
        <div className="w-full px-4 lg:px-8 mt-5">
          <h3 className="text-white text-base font-semibold leading-5">Available on</h3>
          <div className="flex items-center justify-between gap-4 mt-1 w-full">
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://play.google.com/store/apps/details?id=com.victaman.earlyjobs"
                rel="noreferrer"
                target="_blank"
                className="shrink-0 h-[92px] overflow-hidden flex items-center"
              >
                <img src="/images/google-play-badge-logo.svg" alt="google-play" className="w-[120px] h-auto select-none -translate-y-1" />
              </a>
              <a
                href="https://apps.apple.com/in/app/earlyjobs-ai/id6754554572"
                rel="noreferrer"
                target="_blank"
                className="shrink-0 h-[92px] overflow-hidden flex items-center"
              >
                <img src="/images/app-store-logo.svg" alt="app-store" className="w-[120px] h-auto select-none -translate-y-1" />
              </a>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {aiAssistantLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  className="shrink-0 text-white transition-transform duration-200 hover:scale-105 active:scale-95"
                  rel="noreferrer"
                  target="_blank"
                  aria-label={name}
                  title={name}
                >
                  <Icon className="text-xl sm:text-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full mt-2 px-4 pb-4">
          {/* Available in section */}
          <div className="text-center mt-6 lg:mt-0 mb-4">
            <span
              onClick={() => router.push("/franchise/locations")}
              className="text-2xl font-bold text-gray-300 block sm:inline cursor-pointer hover:text-gray-200 transition-colors duration-200"
            >
              Franchise Location
            </span>
            <div className="flex flex-wrap gap-4 mt-3 justify-center">
              <p
                onClick={() => router.push("/franchise/mohali")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Mohali
              </p>
              <p
                onClick={() => router.push("/franchise/coimbatore")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Coimbatore
              </p>
              <p
                onClick={() => router.push("/franchise/ananthapur")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Ananthapur
              </p>

              <p
                onClick={() => router.push("/franchise/ramanagara")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Ramanagara
              </p>

              <p
                onClick={() => router.push("/franchise/sonipat")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Sonipat
              </p>

              <p
                onClick={() => router.push("/franchise/sikar")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Sikar
              </p>

              <p
                onClick={() => router.push("/franchise/ballari")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Bellari
              </p>

              <p
                onClick={() => router.push("/franchise/medchal_malkajgiri")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Medchal
              </p>
              <p
                onClick={() => router.push("/franchise/Lucknow")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Lucknow
              </p>

            </div>
          </div>

          {/* Expanding in section */}


          <div className="hidden pb-4 mb-6 text-center mt-10 lg:mt-0">
            <span className=" text-2xl font-bold text-gray-300 block sm:inline">Starting Soon:</span>
            <div className="flex flex-wrap gap-4 mt-3 justify-center">
              <p
                onClick={() => router.push("/franchise/ghaziabad")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Ghaziabad
              </p>
              <p
                onClick={() => router.push("/franchise/chengalpattu")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Chengalpattu
              </p>
              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Faridabad
              </p>

              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Bijapur
              </p>
              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Gulbarga
              </p>

              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Mangalore
              </p>

              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Visakhapatnam
              </p>

              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Bhopal
              </p>

              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Patna
              </p>

              <p
                onClick={() => router.push("/")}
                className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
              >
                Udupi
              </p>
              <p
                onClick={() => router.push("/franchise/locations")}
                className="text-orange-500 font-semibold text-lg hover:text-orange-400 transition-all duration-300 cursor-pointer"
              >
                View All Locations →
              </p>

            </div>
          </div>


          {/* <div className="text-gray-300 mt-6 text-center">
    <span className=" text-xl font-bold block sm:inline">Starting Soon:</span>
    <div className="flex flex-wrap gap-4 mt-3 justify-center">
      {[
        "Ghaziabad",
        "Chengalpattu",
        "Lucknow",
        "Faridabad",
        "Bijapur",
        // "Sonipat",
        // "Ramanagara",
        "Gulbarga",
        // "Ananthapur",
        "Mangalore",
        "Visakhapatnam",
        "Bhopal",
        "Patna", 
        "Udupi",
        "Gulbarga"

      ].map((city, index) => (
        <p
          key={`city-${index}-${city}`}
          
          onClick={()=>router.push(`/`)}
          className="text-gray-400  text-lg hover:text-amber-500 transition-all duration-300 cursor-not-allowed"
        >
          {city}
        </p>
      ))}
    </div>
  </div> */}


        </div>
        <div className="w-full border-t border-gray-300 mt-6 px-4 py-6 ">
          <div className="flex justify-center items-center text-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a
                  href="/privacy-policy"
                  className="text-gray-400  text-lg hover:text-amber-500 transition-all duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-and-conditions"
                  className="text-gray-400  text-lg hover:text-amber-500 transition-all duration-300"
                >
                  Terms & Conditions
                </a>
                <a
                  href="tel:+918217527926"
                  className="text-gray-400  text-lg hover:text-amber-500 transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-base font-normal leading-6 text-center mt-8 lg:mt-0">© 2024-{new Date().getFullYear()} Victa EarlyJobs Technologies Private Limited | <span className="font-semibold">CIN</span>: U78300KA2025PTC198732 | All rights reserved.</p>
      </footer>
      <FooterScroll />
    </>
  );
};

export default Footer;