"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../ui/button";
import CountUp from 'react-countup';

import { Input } from "../../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Search } from "lucide-react";

const clientLogos = [
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(4).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },
    { src: "https://storage.googleapis.com/earlyjobs_datas/partnerLogos/9%20(2).png", alt: "Client 1" },

];

const HeroV2 = ({ data }: { data: any }) => {
    const router = useRouter();
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [typedPlaceholder, setTypedPlaceholder] = useState("");

    const locations = [
        "All Locations",
        "Bangalore",
        "Mumbai",
        "Delhi",
        "Hyderabad",
        "Chennai",
        "Pune",
        "Kolkata",
        "Ahmedabad",
        "Jaipur",
        "Remote",
    ];

    const categories = [
        "All Categories",
        "IT & Software",
        "Finance",
        "Marketing",
        "Sales",
        "HR & Recruitment",
        "Operations",
        "Design",
        "Engineering",
    ];

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (jobTitle) params.append("search", jobTitle);
        if (location && location !== "All Locations") params.append("location", location);
        if (category && category !== "All Categories") params.append("category", category);

        const queryString = params.toString();
        router.push(`/jobs${queryString ? `?${queryString}` : ""}`);
    };

    // Typewriter placeholder examples (only when input is empty)
    useEffect(() => {
        const examples = [
            "Sales Executive",
            "Frontend Developer",
            "Data Analyst",
            "TCS",
            "Marketing Intern",
        ];

        let exampleIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let timeoutId: number | undefined;

        const tick = () => {
            // If user started typing, stop animating and clear placeholder
            if (jobTitle.trim().length > 0) {
                setTypedPlaceholder("");
                return;
            }

            const current = examples[exampleIndex] ?? "";

            if (!deleting) {
                charIndex += 1;
                setTypedPlaceholder(`e.g. ${current.slice(0, charIndex)}`);
                if (charIndex >= current.length) {
                    deleting = true;
                    timeoutId = window.setTimeout(tick, 1200);
                    return;
                }
            } else {
                charIndex -= 1;
                setTypedPlaceholder(`e.g. ${current.slice(0, Math.max(0, charIndex))}`);
                if (charIndex <= 0) {
                    deleting = false;
                    exampleIndex = (exampleIndex + 1) % examples.length;
                }
            }

            timeoutId = window.setTimeout(tick, deleting ? 35 : 55);
        };

        timeoutId = window.setTimeout(tick, 400);
        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [jobTitle]);

    return (
        <div className="relative w-full text-white h-[100vh] flex flex-col justify-between bg-[url('/v2/images/hero-bg.png')] bg-cover bg-center overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center py-6 sm:py-12 md:py-16 lg:py-20">
                <div className="space-y-4 sm:space-y-8 md:space-y-10 lg:space-y-12">
                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight px-2 sm:px-4">
                        Find Your Dream Job Today!
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-300 max-w-3xl mx-auto px-2 sm:px-6">
                        Connecting Talent with Opportunity: Your Gateway to Career Success
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-5xl mx-auto px-2 sm:px-4">
                        <div className="bg-white rounded-xl sm:rounded-full shadow-lg flex flex-col sm:flex-row items-stretch overflow-hidden">
                            <div className="flex flex-col sm:flex-row gap-2 items-stretch flex-1 p-2.5 sm:p-0 sm:pl-4">
                                <Input
                                    type="text"
                                    placeholder={typedPlaceholder || "Job Title or Company"}
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="flex-1 border-0 bg-transparent text-black placeholder:text-gray-500 focus-visible:ring-0 h-12 sm:h-14 px-4 sm:px-6 rounded-lg sm:rounded-none"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />

                                <Select value={location} onValueChange={setLocation}>
                                    <SelectTrigger className="w-full sm:w-auto sm:min-w-[140px] border-0 bg-transparent text-black focus:ring-0 h-12 sm:h-14 px-4 sm:px-6 rounded-lg sm:rounded-none">
                                        <SelectValue placeholder="Select Location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data?.popularCities?.map((loc) => (
                                            <SelectItem key={loc?.label} value={loc?.label}>
                                                {loc?.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="w-full sm:w-auto sm:min-w-[140px] border-0 bg-transparent text-black focus:ring-0 h-12 sm:h-14 px-4 sm:px-6 rounded-lg sm:rounded-none">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data?.categories?.map((cat: any) => (
                                            <SelectItem key={cat?.label} value={cat?.label}>
                                                {cat?.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <button
                                onClick={handleSearch}
                                className="flex items-center justify-center gap-2 px-6 sm:px-8 h-12 sm:h-14 bg-[#F08504] hover:bg-[#F08504]/90 text-white rounded-lg sm:rounded-l-none sm:rounded-r-full transition-colors font-medium m-2 sm:m-0"
                            >
                                <Search className="h-5 w-5" />
                                <span className="hidden sm:inline">Search Job</span>
                                <span className="sm:hidden">Search</span>
                            </button>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 pt-2 sm:mt-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                                <Image
                                    src="/v2/icons/hjobs.png"
                                    alt="Jobs"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                                    <CountUp start={0} end={data?.totalJobs || 0} duration={2.7} />+
                                </div>
                                <p className="text-xs sm:text-sm md:text-base text-gray-400">Jobs</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                                <Image
                                    src="/v2/icons/hCandidates.png"
                                    alt="Candidates"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                                    <CountUp start={0} end={data?.totalCandidates || 0} duration={2.7} />+
                                </div>
                                <p className="text-xs sm:text-sm md:text-base text-gray-400">Resumes</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                                <Image
                                    src="/v2/icons/hCompanies.png"
                                    alt="Companies"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                                    <CountUp start={0} end={data?.totalCompanies || 0} duration={2.7} />+
                                </div>
                                <p className="text-xs sm:text-sm md:text-base text-gray-400">Companies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel Above Footer - Right Side */}
            <div className="relative z-10 overflow-hidden hidden lg:block">
                <div className="max-w-7.5xl mx-auto px-1 sm:px-6 lg:px-8 relative">
                    <div className="flex justify-end">
                        <div className="w-full overflow-hidden relative h-14 md:h-18 flex items-center">
                            <div className="overflow-hidden relative w-full">
                                {/* Left gradient overlay */}
                                {/* <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 lg:w-56 bg-gradient-to-r from-[#111] via-[#111]/50 to-transparent z-10 pointer-events-none" /> */}
                                
                                {/* Right gradient overlay */}
                                {/* <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 lg:w-56 bg-gradient-to-l from-[#111] via-[#111]/50 to-transparent z-10 pointer-events-none" /> */}
                                
                                <div className="flex gap-6 md:gap-8 lg:gap-12 carousel-horizontal-top">
                                    {[...clientLogos, ...clientLogos].map((logo, idx) => (
                                        <div key={`top-client-${idx}`} className="flex-shrink-0 w-20 h-16 md:w-28 md:h-20 flex items-center justify-center">
                                            <Image
                                                src={logo.src}
                                                alt={logo.alt}
                                                width={70}
                                                height={55}
                                                className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes scroll-horizontal-top {
                            0% { transform: translateX(-50%); }
                            100% { transform: translateX(0); }
                        }
                        .carousel-horizontal-top {
                            animation: scroll-horizontal-top 30s linear infinite;
                            width: fit-content;
                        }
                        .carousel-horizontal-top:hover {
                            animation-play-state: paused;
                        }
                    `
                }} />
            </div>

            {/* Footer with Horizontal Client Carousel */}
            <div className="relative z-10 overflow-hidden">
                <div className="max-w-7.5xl mx-auto px-1 sm:px-6 lg:px-8 relative">
                    <div className="overflow-hidden relative h-14 md:h-18 flex items-center">
                        {/* Left gradient overlay */}
                        {/* <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 lg:w-56 bg-gradient-to-r from-[#111] via-[#111]/50 to-transparent z-10 pointer-events-none" /> */}
                        
                        {/* Right gradient overlay */}
                        {/* <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 lg:w-56 bg-gradient-to-l from-[#111] via-[#111]/50 to-transparent z-10 pointer-events-none" /> */}
                        
                        <div className="flex gap-6 md:gap-8 lg:gap-12 carousel-horizontal">
                            {[...clientLogos, ...clientLogos].map((logo, idx) => (
                                <div key={`client-${idx}`} className="flex-shrink-0 w-20 h-16 md:w-28 md:h-20 flex items-center justify-center">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={70}
                                        height={55}
                                        className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes scroll-horizontal {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .carousel-horizontal {
                            animation: scroll-horizontal 30s linear infinite;
                            width: fit-content;
                        }
                        .carousel-horizontal:hover {
                            animation-play-state: paused;
                        }
                    `
                }} />
            </div>
        </div>
    );
};

export default HeroV2;
