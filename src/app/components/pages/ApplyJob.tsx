"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import JobFairSection from "./Jobfair";
import Experience from "./Experience";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Cookies from "js-cookie";

const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

export default function Index() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
  const router = useRouter(); // Initialize useRouter
  const categories = useMemo(
    () => [
      { icon: "🛍️", title: "Information Technology" },
      { icon: "✍️", title: "BPO/KPO" },
      { icon: "🩺", title: "HealthCare" },
      { icon: "📊", title: "Retail & Sales" },
      { icon: "🏭", title: "Manufacturing" },
      { icon: "💳", title: "Banking & Finance" },
      { icon: "📈", title: "SaaS/eCommerce" },
      { icon: "🏨", title: "Tourism/Hospitality" },
      { icon: "🚚", title: "Logistics/Transport" },
    ],
    []
  );

  const [industry, setIndustry] = useState("");
  const [jobs, setJobs] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const industryInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const faqs = [
    {
      question: "How does EarlyJobs work?",
      answer: "EarlyJobs is a platform that connects job seekers with opportunities across various industries. Simply search by job role, industry, or location, and apply directly to roles that match your skills and preference.",
    },
    {
      question: "Is there a cost to use EarlyJobs?",
      answer: "Job seekers can browse and apply jobs for free. Employers may opt subscription plans for posting jobs, which you can learn more about by contacting our team.",
    },
    {
      question: "How often are new jobs added?",
      answer: "New jobs are added daily. We work with employers across multiple sectors to ensure a steady stream of fresh opportunities for our users.",
    },
    {
      question: "Can I save jobs to apply later?",
      answer: "Registered users can save jobs to their profile and return to apply at their convenience. Sign up to access this feature.",
    },
    {
      question: "What industries does EarlyJobs cover?",
      answer: "EarlyJobs covers a wide range of industries, including Information Technology, Health Care, Banking & Finance, Retail, Manufacturing, SaaS/eCommerce, BPO/KPO, and more.",
    },
    {
      question: "Does EarlyJobs offer resume-building tools?",
      answer: "EarlyJobs provides an AI-powered resume builder to help job seekers create professional resumes tailored to their desired roles.",
    },
    {
      question: "Can I get job alerts for specific roles?",
      answer: "Absolutely! Registered users can set up personalized job alerts based on their preferred job roles, industries, or locations.",
    },
    {
      question: "How does EarlyJobs ensure job quality?",
      answer: "We partner with verified employers and review job postings to ensure they meet our quality standards, providing legitimate and relevant opportunities.",
    },
    {
      question: "Is there support for interview preparation?",
      answer: "EarlyJobs offers resources like mock interviews, assessment tools, and career tips to help job seekers prepare effectively.",
    },
    {
      question: "Can I connect with employers directly?",
      answer: "Through EarlyJobs, you can apply directly to employers, and some roles allow for direct communication via our platform’s messaging feature.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Handle industry suggestions
  useEffect(() => {
    if (industry.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/public/jobs?search=${encodeURIComponent(
              industry
            )}&limit=7`
          );
          const data = await response.json();
          const filtered = data.data.jobs.filter(
            (job) =>
              job.title.toLowerCase().includes(industry.toLowerCase()) ||
              job.company_name.toLowerCase().includes(industry.toLowerCase()) ||
              job.category.toLowerCase().includes(industry.toLowerCase())
          );
          setSuggestions(filtered.slice(0, 7));
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  }, [industry]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !industryInputRef.current.contains(event.target)
      ) {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation for industry
  const handleIndustryKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      const selectedJob = suggestions[highlightedIndex];
      const slug = createSlug(selectedJob.title);
      router.push(`/jobs/${slug}/${selectedJob.id}`);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (job) => {
    const slug = createSlug(job.title);
    router.push(`/jobs/${slug}/${job.jobId}`);
  };

  return (
    <div className="bg-gradient-to-b from-white via-orange-50/20 to-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.15),transparent_50%)]"/>
          <div className="absolute inset-x-0 -top-40 h-[1000px] bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.1),transparent_70%)]"/>
        </div>

        <div className="container mx-auto grid gap-12 px-6 pt-12 pb-8 sm:px-8 sm:pt-16 sm:pb-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16 xl:px-24 lg:pt-20 lg:pb-16">
          <div className="lg:pr-8">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200/50 px-3 py-1.5 text-xs font-semibold text-orange-700 shadow-sm">
              <span className="mr-1.5">🚀</span> New Opportunities Daily
            </span>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">EarlyJobs</span> makes it easy to find your next role
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg md:mt-6 lg:text-xl lg:max-w-xl leading-relaxed">
              Discover opportunities across industries. Search by role, location, or skills — apply with confidence.
            </p>

            {/* Search Box */}
            <div className="relative z-10 mt-8 w-full rounded-2xl bg-white/95 p-3 sm:p-4 shadow-2xl shadow-orange-200/20 ring-1 ring-orange-100 backdrop-blur-sm lg:mt-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  Cookies.set("searchQuery", industry); // Store search query in sessionStorage
                  router.push("/jobs"); // Navigate to /jobs without query params
                }}
              >
                <div className="grid gap-2">
                  <div className="relative flex items-center">
                    <label className="flex items-center gap-3 flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-sm text-gray-700 focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-200/50 transition-all duration-200">
                      <Search className="h-5 w-5 text-gray-400" />
                      <input
                        ref={industryInputRef}
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        onKeyDown={handleIndustryKeyDown}
                        placeholder="Search Jobs by Role, Industry, or Location"
                        className="h-12 w-full bg-transparent placeholder:text-gray-500 focus:outline-none text-base font-medium"
                      />
                    </label>
                    <button
                      type="submit"
                      className="ml-3 h-12 px-6 lg:px-8 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold text-base hover:from-orange-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg shadow-orange-500/25 transition-all duration-200"
                    >
                      Search
                    </button>
                  </div>
                  {suggestions.length > 0 && (
                    <ul
                      ref={dropdownRef}
                      className="absolute z-[200] w-full bg-white border border-orange-200 rounded-xl shadow-lg max-h-60 overflow-auto top-full mt-2"
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={suggestion.id}
                          className={`px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-orange-50 flex items-center gap-3 ${
                            index === highlightedIndex ? "bg-orange-100" : ""
                          }`}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <img
                            src={suggestion.companyLogoUrl}
                            alt={`${suggestion.company_name} logo`}
                            className="w-8 h-8 rounded-full object-contain"
                          />
                          <div>
                            <p className="font-semibold">{suggestion.title}</p>
                            <p className="text-sm text-gray-500">{suggestion.companyName}</p>
                            <p className="text-xs text-gray-400">{suggestion.location}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </form>
            </div>

            <p className="mt-4 text-sm text-gray-600 sm:text-base">
              Popular: 
              <a className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors ml-1" href="#">IT Jobs</a>,
              <a className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors ml-1" href="#">Finance</a>,
              <a className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors ml-1" href="#">Management</a>,
              <a className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors ml-1" href="#">Healthcare</a>
            </p>
          </div>

          <div className="relative lg:h-[460px] z-0">
            {/* Mobile-only talent pool card */}
            <div className="block lg:hidden relative z-10">
              <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/images/Networking.jpg"
                  alt="Join our talent pool"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Join Our Talent Pool</h3>
                  <p className="text-sm text-gray-200 mt-1">
                    Be discovered by top employers. Share your skills and get matched with exciting opportunities.
                  </p>
                  <a
                    href="/talent-pool"
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-orange-500 px-6 text-sm font-semibold text-white shadow hover:bg-orange-600"
                  >
                    Join Now
                  </a>
                </div>
              </div>
            </div>

            {/* Existing images, hidden in mobile view */}
            <div className="hidden lg:block absolute -left-4 -top-4 size-20 rounded-3xl bg-orange-200/60 blur-xl sm:size-24 sm:blur-2xl md:size-28 md:blur-2xl" />
            <div className="hidden lg:block absolute -right-6 bottom-0 size-24 rounded-full bg-orange-300/60 blur-2xl sm:size-28 sm:blur-3xl md:size-36 md:blur-3xl" />
            <div className="hidden lg:block absolute right-1 top-1 h-12 w-12 rounded-lg opacity-40 [background-image:linear-gradient(to_right,rgba(249,115,22,.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.35)_1px,transparent_1px)] [background-size:10px_10px] sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <div className="hidden lg:block absolute left-2 bottom-1/3 h-10 w-10 rounded-lg opacity-30 [background-image:linear-gradient(to_right,rgba(249,115,22,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.3)_1px,transparent_1px)] [background-size:8px_8px] sm:h-12 sm:w-12 md:h-14 md:w-14" />
            <div className="hidden lg:flex relative justify-center items-center md:absolute md:right-2 md:top-6 z-0">
              <div className="absolute -left-2 -top-2 h-48 w-[360px] rounded-xl sm:h-56 sm:w-[400px] md:h-64 md:w-[460px] md:rounded-[2rem]"></div>
              <img
                src="/images/HeroImg3.jpg"
                alt="Team meeting"
                className="relative h-48 w-full rounded-xl bg-white object-cover shadow-xl sm:h-56 sm:w-[400px] md:h-64 md:w-[460px] md:rounded-[2rem]"
              />
            </div>
            <div className="hidden lg:flex relative justify-center items-center md:absolute md:left-4 md:bottom-4 z-10">
              <div className="absolute -left-2 -top-2 h-40 w-[280px] rounded-xl sm:h-48 sm:w-[320px] md:h-56 md:w-[360px] md:rounded-[2rem]"></div>
              <img
                src="/images/Networking.jpg"
                alt="Networking"
                className="relative h-40 w-full rounded-xl bg-white object-cover shadow-xl sm:h-48 sm:w-[320px] md:h-56 md:w-[360px] md:rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Job Fair Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <JobFairSection />
      </section>

      {/* Browse by Industry Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Browse by Industry</h2>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">Find the perfect role in your preferred industry</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div key={c.title} className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-orange-200 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-2xl shadow-sm group-hover:shadow-md transition-shadow">
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{c.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">Browse openings →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-orange-600 to-orange-700 p-8 sm:p-12 lg:p-16 shadow-2xl">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-100">Join thousands of professionals</p>
                <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Let's work together & explore opportunities</h3>
                <p className="mt-4 text-lg text-orange-50 leading-relaxed">Over 100+ leading employers trust EarlyJobs to find the right talent. Build your career with opportunities from startups, enterprises, and global brands.</p>
              </div>
              <a href="/jobs" className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-semibold text-orange-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Apply Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="hidden md:block py-12 lg:py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <Experience />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about finding your next opportunity
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {faqs.slice(0, 10).map((faq, index) => {
              const { ref, isVisible } = useScrollAnimation();
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`transition-all duration-700 delay-${index * 150} ${
                    isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-200 transition-all duration-300">
                    <button
                      className="w-full flex justify-between items-center p-6 text-left text-gray-900 font-semibold text-lg hover:text-orange-600 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-orange-600 transition-transform" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-6 text-gray-600 animate-in slide-in-from-top-2 duration-200">
                        <p className="leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}