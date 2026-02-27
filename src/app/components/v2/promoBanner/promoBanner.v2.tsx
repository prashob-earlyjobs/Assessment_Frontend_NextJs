"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

const PromoBannerV2 = () => {
  const router = useRouter();

  const banners = [
    {
      id: 1,
      theme: "dark",
      bgClass: "bg-black",
      textClass: "text-white",
      subTextClass: "text-gray-300",
      buttonClass: "bg-[#F08504] hover:bg-orange-600 text-white",
      title: "Everything to Get Hired",
      description: [
        <span key="desc-1"><strong className="font-bold">◉ AI-Powered Job Matching -:</strong> Smart AI matches your profile with the most relevant job openings based on your skills and experience.</span>,
        <span key="desc-2"><strong className="font-bold">◉ Access to 400+ Recruiters -:</strong> Your profile reaches verified recruiters hiring for 200+ companies across India.</span>,
        <span key="desc-3"><strong className="font-bold">◉ Faster Shortlisting -:</strong>  AI + human recruiter screening increases your chances of getting shortlisted quickly.</span>,
        <span key="desc-4"><strong className="font-bold">◉ Multiple Interview Opportunities -:</strong>  Apply once and get connected to multiple employers.</span>,
        <span key="desc-5"><strong className="font-bold">◉ Career Guidance Support -:</strong> Get insights, feedback, and better role alignment to improve your hiring success.</span>,

      ],
      image: "/v2/images/Everything to Get Hired.png",
      buttonText: "Search Job",
      buttonLink: "/jobs"
    },
    {
      id: 2,
      theme: "orange",
      bgClass: "bg-[#F08504]",
      textClass: "text-white",
      subTextClass: "text-orange-100",
      buttonClass: "bg-white hover:bg-gray-100 text-[#F08504]",
      title: "Hire Your Ideal Team. 10X Faster",
      description: [
        <span key="desc-1"><strong className="font-bold">◉ AI + Human Recruiter Network -:</strong> AI-powered screening with 400+ freelance recruiters ensures faster, better matches.</span>,
        <span key="desc-2"><strong className="font-bold">◉ Access to Pre-Screened Talent -:</strong> Receive relevant, filtered candidates instead of random bulk applications.</span>,
        <span key="desc-3"><strong className="font-bold">◉ Faster Hiring Turnaround -:</strong> Reduced time-to-hire through distributed recruiter network across PAN India.</span>,
        <span key="desc-4"><strong className="font-bold">◉ Cost-Effective Recruitment -:</strong> Optimized sourcing reduces reliance on costly job portals and internal hiring efforts.</span>,
        <span key="desc-5"><strong className="font-bold">◉ Scalable Hiring Across Locations -:</strong> District expansion and recruiter network enable efficient multi-city hiring</span>,
      ],
      buttonText: "Post Jobs",
      buttonLink: "/freejobposting",
      image: "/v2/images/Hire Your Ideal Team. 10X Faster.png"
    },
    {
      id: 3,
      theme: "orange",
      bgClass: "bg-[#4DA6FF]",
      textClass: "text-white",
      subTextClass: "text-orange-100",
      buttonClass: "bg-white hover:bg-gray-100 text-[#F08504]",
      title: "Freelancer Growth Hub",
      description: [
        <span key="desc-1"><strong className="font-bold">◉ Access to 200+ Hiring Companies -:</strong>  Get exclusive openings from top companies across PAN India.</span>,
        <span key="desc-2"><strong className="font-bold">◉ AI-Powered Candidate Matching -:</strong> Quickly find the best-fit candidates using smart AI tools.</span>,
        <span key="desc-3"><strong className="font-bold">◉ Earn More, Work Flexibly -:</strong> Choose assignments, set your own pace, and get paid per successful placement.</span>,
        <span key="desc-4"><strong className="font-bold">◉ Expand Your Network -:</strong> Connect with other recruiters and build a strong professional network.</span>,
        <span key="desc-5"><strong className="font-bold">◉ Support & Tools to Close Faster -:</strong>  Use EarlyJobs platform resources to streamline sourcing, submissions, and follow-ups.</span>,

      ],
      buttonText: "Become a Recruiter",
      buttonLink: "/apply-as-a-recruiter",
      image: "/v2/images/Freelancer Growth Hub.png"
    },
    {
      id: 4,
      theme: "orange",
      bgClass: "bg-[#A0522D]",
      textClass: "text-white",
      subTextClass: "text-orange-100",
      buttonClass: "bg-white hover:bg-gray-100 text-[#F08504]",
      title: "Empowering Campus Placements",
      description: [
        <span key="desc-1"><strong className="font-bold">◉ AI-Based Student Job Matching  -:</strong> AI matches students with jobs based on skills and interests.</span>,
        <span key="desc-2"><strong className="font-bold">◉ Access to 400+ Recruiter -:</strong> Connect with a network of recruiters hiring for 200+ companies PAN India.</span>,
        <span key="desc-3"><strong className="font-bold">◉ Improved Placement Rate -:</strong> More interview opportunities increase students’ chances of getting placed faster.</span>,
        <span key="desc-4"><strong className="font-bold">◉ Industry Exposure & Guidance -:</strong> Students gain market insights, hiring trends, and recruiter feedback.</span>,
        <span key="desc-5"><strong className="font-bold">◉ Support for Tier 2 & Tier 3 Colleges -:</strong> Equal hiring access beyond metro cities through a district recruiter network.</span>,
      ],
      buttonText: "Register Now",
      buttonLink: "/college-partnerships",
      image: "/v2/images/Empowering Campus Placements.png"
    },
    {
      id: 5,
      theme: "orange",
      bgClass: "bg-[#757575]",
      textClass: "text-white",
      subTextClass: "text-orange-100",
      buttonClass: "bg-white hover:bg-gray-100 text-[#F08504]",
      title: "Unlock Your Potential",
      description: [
        <span key="desc-1"><strong className="font-bold">◉ Access to Pan-India Opportunities -:</strong> Apply to startups and companies across India, beyond your city.</span>,
        <span key="desc-2"><strong className="font-bold">◉ AI-Powered Role Matching -:</strong> AI recommends internships based on your skills and goals</span>,
        <span key="desc-3"><strong className="font-bold">◉ Hands-On Recruitment Experience -:</strong> Gain hands-on experience in sourcing, screening, and interview coordination.</span>,
        <span key="desc-4"><strong className="font-bold">◉ Direct Connection & Mentorship -:</strong> Get noticed by 400+ recruiters with expert feedback and guidance.</span>,
        <span key="desc-5"><strong className="font-bold">◉ Faster Placement & Real-World Exposure -:</strong> More interviews and opportunities without relocation limits.</span>,

      ],
      buttonText: "Become a Recruiter",
      buttonLink: "/apply-as-a-recruiter",
      image: "/v2/images/Unlock Your Potential.png"
    },
    {
      id: 6,
      theme: "orange",
      bgClass: "bg-[#16A34A]",
      textClass: "text-white",
      subTextClass: "text-orange-100",
      buttonClass: "bg-white hover:bg-gray-100 text-[#F08504]",
      title: "Powering Consultancy Growth",
      description: [
        <span key="desc-1"><strong className="font-bold">◉ Free Job Posting & Sourcing -:</strong>  Post unlimited jobs and access active candidates without heavy portal costs..</span>,
        <span key="desc-2"><strong className="font-bold">◉ AI-Powered Candidate Matching -:</strong>   Smart AI helps you find relevant profiles faster, reducing manual screening time.</span>,
        <span key="desc-3"><strong className="font-bold">◉ Higher Closures, Faster Turnaround -:</strong>  Access to a wider talent pool increases submission quality and improves closure ratio</span>,
        <span key="desc-4"><strong className="font-bold">◉ Pan-India Recruiter Network -:</strong> Collaborate with 400+ freelance recruiters and expand your reach beyond your local market.</span>,
        <span key="desc-5"><strong className="font-bold">◉ Scalable Growth Without Extra Cost -:</strong>  Grow your consultancy without increasing sourcing costs.</span>,

      ],
      buttonText: "Post Jobs",
      buttonLink: "/freejobposting",
      image: "/v2/images/Powering Consultancy Growth.png"
    }
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* First Section: Good Life Begins */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          <div>
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/v2/images/Award.png"
                alt="Good Company"
                fill
                className="object-cover rounded-2xl"
                priority={false}
              />
            </div>
            <a
              href="https://www.entrepreneurindia.com/startup/awards_winner.php"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-center font-bold text-gray-800 hover:text-orange-500 transition-colors cursor-pointer block"
            >
              Honored to receive the Startup Awards 2026 – HRTech of the Year from Entrepreneur India. 🏆
            </a>
          </div>
          <div className="flex flex-col justify-start items-center text-center pt-2 md:pt-4 lg:pt-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500 leading-tight mb-4">
              Who We Are</h2>
            <h3 className="text-1xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">EarlyJobs: From Women's Empowerment to Nationalwide Hiring</h3>
            <p className="text-base text-gray-600 leading-relaxed mb-6 line-clamp-8 text-left w-full">
              EarlyJobs is a tech-enabled recruitment ecosystem transforming how India hires. We empower women recruiters to restart and grow their careers through flexible, remote opportunities, while helping companies access high-quality talent beyond metro cities. By combining decentralized recruiter networks, AI-powered matching, and structured campus-to-corporate programs, we bridge the gap between employers and emerging talent across Tier 2 and Tier 3 India. Whether you’re a job seeker looking for the right opportunity or a company aiming to hire fast in bulk, EarlyJobs is your ultimate partner. EarlyJobs – where talent meets opportunity, fast.
            </p>
            <button
              onClick={() => router.push("/story")}
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors inline-flex items-center gap-1"
            >
              Read Our Story
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { label: "Interviews Conducted", value: "35000+" },
            { label: "Successful Placements", value: "2700+" },
            { label: "Companies", value: "200+" },
            { label: "Freelance Recruiters", value: "400+" },
            { label: "Colleges", value: "200+" },
            { label: "Expanding Hiring Access", value: "22+ Districts" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center h-full min-h-[160px]"
            >
              <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stat.value}</p>
              <p className="text-lg font-semibold text-gray-800">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Carousel Banner Section */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="min-h-[680px] sm:min-h-[600px] md:min-h-[500px] lg:h-[550px] xl:h-[500px]">
            {banners.map((banner) => (
              <CarouselItem key={banner.id} className="h-full">
                <div className={`relative overflow-hidden rounded-2xl ${banner.bgClass} shadow-lg h-full`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[400px]">
                    {/* Left side - Text content */}
                    <div className={`p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center ${banner.textClass} ${banner.id % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                      <h3 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold leading-tight mb-3 md:mb-4">
                        {banner.title}
                      </h3>
                      <div className={`text-[12px] md:text-[13.5px] lg:text-base mb-4 sm:mb-6 md:mb-8 max-w-lg ${banner.subTextClass}`}>
                        {Array.isArray(banner.description) ? (
                          banner.description.map((line, index) => (
                            <p key={index} className="mb-1">{line}</p>
                          ))
                        ) : (
                          <p>{banner.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => router.push(banner.buttonLink)}
                        className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-colors w-fit ${banner.buttonClass}`}
                      >
                        {banner.buttonText}
                      </button>
                    </div>

                    {/* Right side - People image */}
                    <div className={`relative h-48 sm:h-56 md:h-full min-h-[250px] md:min-h-0 ${banner.id % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                      <Image
                        src={banner.image}
                        alt="Banner Image"
                        fill
                        priority={false}
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 border-none text-white" />
            <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 border-none text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PromoBannerV2;

