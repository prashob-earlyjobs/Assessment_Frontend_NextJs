"use client"
import { MapPin, Building, GraduationCap, Lightbulb, Users, Tag, FileText, BarChart2, Rocket } from "lucide-react";
import { toast } from "sonner";
import React from 'react';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import FooterScroll from "./FooterScroll";

const Footer = () => {
    const router = useRouter();

    return (
        <>
        <footer className="w-full flex flex-col items-center py-8 bg-[#0A0F10] text-white md:py-10 lg:py-10 px-3">
            <div className="grid grid-cols-1 gap-5 px-4 w-full sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
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
                    </div>
                    <h3 className="pt-5 text-white text-base font-semibold uppercase leading-5">Also Available In</h3>
                    <div className="flex items-center mt-5">
                        <a href="https://play.google.com/store/apps/details?id=com.victaman.earlyjobs" rel="noreferrer" target="_blank" className="mr-5">
                            <img src="/images/google-play-badge-logo.svg" alt="google-play" className="w-[120px] select-none" />
                        </a>
                        <a href="https://apps.apple.com/in/app/earlyjobs/id6590626019" rel="noreferrer" target="_blank">
                            <img src="/images/app-store-logo.svg" alt="app-store" className="w-[120px] select-none" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className="pt-8 text-white text-base font-semibold uppercase leading-5 lg:pt-12">Company</h3>
                    <Link href="/about-us" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">About Us</Link>
                    <Link href="/team" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Team</Link>
                    <Link href="/blogs" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Blogs</Link>
                    <Link href="/franchise" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Franchise With Us</Link>
                    <a href="tel:+918217527926" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 cursor-pointer lg:mt-6" id="contact-link">Contact Us</a>
                    <Link href="/story" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Our Story</Link>
                    <Link href="/jobs" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">Job Openings</Link>
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
                    <Link href="/airesume" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
                        <FileText className="w-5 h-5 mr-2 inline-block" />
                        AI Resume Builder
                    </Link>
                    <Link href="/assessments" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
                        <BarChart2 className="w-5 h-5 mr-2 inline-block" />
                        Assessments
                    </Link>
                    <button
                        type="button"
                        className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline text-left lg:mt-6 bg-transparent p-0"
                        onClick={() => toast.info("We're working on Auto-Apply! This feature will be updated soon.")}
                        style={{ outline: "none", border: "none" }}
                    >
                        <Rocket className="w-5 h-5 mr-2 inline-block" />
                        Auto-Apply
                    </button>
                    
                    <Link href="/clientele" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
                        <Building className="w-5 h-5 mr-2 inline-block" />
                        Company Tie-Ups
                    </Link>
                    <Link href="/college-tieups" className="text-gray-400 text-base font-normal leading-5 mt-4 hover:text-gray-200 no-underline lg:mt-6">
                        <GraduationCap className="w-5 h-5 mr-2 inline-block" />
                        College Tie-Ups
                    </Link>
                </div>
            </div>
            <div className="w-full  mt-2 px-4 pb-10">
  {/* Available in section */}
  <div className=" pb-4 mb-6 text-center mt-10 lg:mt-0">
    <span className=" text-2xl font-bold text-gray-300 block sm:inline">Available in:</span>
    <div className="flex flex-wrap gap-4 mt-3 justify-center">
      <p
        onClick={()=>router.push("/franchise/mohali")}
        className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
      >
        Mohali
      </p>
      <p
        onClick={()=>router.push("/franchise/chandigarh")}
        className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
      >
        Chandigarh
      </p>
      <p
        onClick={()=>router.push("/franchise/hyderabad")}
        className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
      >
        Hyderabad
      </p>
     <p
        onClick={()=>router.push("/franchise/chennai")}
        className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
      >
        Chennai
      </p>

        <p
        onClick={()=>router.push("/franchise/rampur")}
        className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
      >
        Rampur
      </p>
       <p
        onClick={()=>router.push("/franchise/coimbatore")}
        className="text-gray-400  text-lg hover:text-amber-600 transition-all duration-300 cursor-pointer"
      >
        Coimbatore
      </p>
    </div>
  </div>

  {/* Expanding in section */}
  <div className="text-gray-300 mt-6 text-center">
    <span className=" text-xl font-bold block sm:inline">Starting Soon:</span>
    <div className="flex flex-wrap gap-4 mt-3 justify-center">
      {[
        "Ghaziabad",
        "Chengalpattu",
        "Lucknow",
        "Bangalore Urban",
        "Faridabad",
        "Bijapur",
        "Sonipat",
        "Ramanagara",
        "Gulbarga",
        "Ananthapur",
        "Mangalore",
      ].map((city) => (
        <p
          key={city}
          
          onClick={()=>router.push(`/franchise/${city.toLowerCase()}`)}
          className="text-gray-400  text-lg hover:text-amber-500 transition-all duration-300 cursor-not-allowed"
        >
          {city}
        </p>
      ))}
    </div>
  </div>
</div>
  <div className="w-full border-t border-gray-300 mt-10 px-4 py-6 ">
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
            <p className="text-gray-400 text-base font-normal leading-6 text-center mt-8 lg:mt-0">© 2024-25 Victa EarlyJobs Technologies Private Limited | <span className="font-semibold">CIN</span>: U78300KA2025PTC198732 | All rights reserved.</p>
        </footer>
        <FooterScroll />
        </>
    );
};

export default Footer;
