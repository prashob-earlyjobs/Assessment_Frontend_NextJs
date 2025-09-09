"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import JobFairSection from "./Jobfair";
import Experience from "./Experience";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

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
  const API_BASE_URL= process.env.NEXT_PUBLIC_BACKEND_URL_IN;
  const categories = useMemo(
    () => [
      { icon: "🛍️", title: "Information Technology" },
      { icon: "✍️", title: "BPO/KPO" },
      { icon: "🩺", title: "HealthCare" },
      { icon: "📊", title: "Retail & Sales" },
      { icon: "🏭", title: "Manufacturing" },
      { icon: "💳", title: "Banking & Finance" },
      { icon: "📈", title: "SaaS/eCommerce" },
      { icon: "👥", title: "Others" },
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
      answer: "EarlyJobs is a platform that connects job seekers with opportunities across various industries. Simply search by job role, industry, or location, and apply directly to roles that match your skills and preferences.",
    },
    {
      question: "Is there a cost to use EarlyJobs?",
      answer: "Job seekers can browse and apply to jobs for free. Employers may have subscription plans for posting jobs, which you can learn more about by contacting our team.",
    },
    {
      question: "How often are new jobs added?",
      answer: "New jobs are added daily. We work with employers across multiple sectors to ensure a steady stream of fresh opportunities for our users.",
    },
    {
      question: "Can I save jobs to apply later?",
      answer: "Yes, registered users can save jobs to their profile and return to apply at their convenience. Sign up to access this feature.",
    },
    {
      question: "What industries does EarlyJobs cover?",
      answer: "EarlyJobs covers a wide range of industries, including Information Technology, Health Care, Banking & Finance, Retail, Manufacturing, SaaS/eCommerce, BPO/KPO, and more.",
    },
    {
      question: "Does EarlyJobs offer resume-building tools?",
      answer: "Yes, EarlyJobs provides an AI-powered resume builder to help job seekers create professional resumes tailored to their desired roles.",
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
      answer: "Yes, EarlyJobs offers resources like mock interviews, assessment tools, and career tips to help job seekers prepare effectively.",
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
          const filtered = data.jobs.filter(
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
      window.location.href = `/jobs/${slug}/${selectedJob.id}`;
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (job) => {
    const slug = createSlug(job.title);
    window.location.href = `/jobs/${slug}/${job.id}`;
  };

  return (
    <div className="bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40  sm:py-0  lg:mt-0 ml-2 mx-auto">
      <section className="relative h-screen">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] sm:h-[700px] md:h-[900px] bg-[radial-gradient(70%_70%_at_15%_5%,rgba(251,146,60,0.6),transparent_60%),radial-gradient(60%_60%_at_85%_10%,rgba(249,115,22,0.55),transparent_60%),radial-gradient(50%_50%_at_50%_40%,rgba(253,186,116,0.4),transparent_70%)]" />

        <div className="container mx-auto grid gap-8 py-8 sm:gap-10 sm:py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16 lg:py-24">
          <div>
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 md:px-3 md:py-1">
              New
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-orange-500">EarlyJobs</span> makes it easy to find your next role
            </h1>
            <p className="mt-3 text-sm text-gray-600 sm:text-base md:mt-4 md:text-base lg:max-w-xl">
              Discover opportunities on EarlyJobs. Search by industry or category — then apply in one click.
            </p>

            <div className="relative mt-4 w-full rounded-2xl border border-orange-200/80 bg-white/95 p-2 sm:p-3 shadow-[0_10px_30px_-8px_rgba(251,146,60,0.3)] ring-1 ring-orange-200/70 backdrop-blur md:p-3 md:shadow-[0_14px_40px_-12px_rgba(251,146,60,0.35)]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const params = new URLSearchParams({ industry });
                  window.location.href = `/jobs?${params.toString()}`;
                }}
              >
                <div className="grid gap-2">
                  <div className="relative">
                    <label className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-2.5 py-1.5 text-sm text-gray-700 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-200 sm:px-3 sm:py-2 md:px-3 md:py-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <input
                        ref={industryInputRef}
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        onKeyDown={handleIndustryKeyDown}
                        placeholder="Search Job Role, Industry, Location"
                        className="h-10 w-full bg-transparent placeholder:text-gray-400 focus:outline-none text-sm sm:h-11 md:h-11"
                      />
                    </label>
                    {suggestions.length > 0 && (
                      <ul
                        ref={dropdownRef}
                        className="absolute z-10 w-full mt-1 bg-white border border-orange-200 rounded-xl shadow-lg max-h-60 overflow-auto"
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
                              src={suggestion.company_logo_url}
                              alt={`${suggestion.company_name} logo`}
                              className="w-8 h-8 rounded-full object-contain"
                            />
                            <div>
                              <p className="font-semibold">{suggestion.title}</p>
                              <p className="text-xs text-gray-500">{suggestion.company_name}</p>
                              <p className="text-xs text-gray-400">{suggestion.location}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <p className="mt-2 text-xs text-gray-500 sm:mt-3 sm:text-sm md:mt-3 md:text-sm">
              Popular searches: <a className="text-orange-700 hover:underline" href="#">Information Technology</a>,{" "}
              <a className="text-orange-700 hover:underline" href="#">Finance</a>,{" "}
              <a className="text-orange-700 hover:underline" href="#">Management</a>
            </p>
          </div>

          <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
            <div className="absolute -left-4 -top-4 size-20 rounded-3xl bg-orange-200/60 blur-xl sm:size-24 sm:blur-2xl md:size-28 md:blur-2xl" />
            <div className="absolute -right-6 bottom-0 size-24 rounded-full bg-orange-300/60 blur-2xl sm:size-28 sm:blur-3xl md:size-36 md:blur-3xl" />
            <div className="absolute right-1 top-1 h-12 w-12 rounded-lg opacity-40 [background-image:linear-gradient(to_right,rgba(249,115,22,.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.35)_1px,transparent_1px)] [background-size:10px_10px] sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <div className="absolute left-2 bottom-1/3 h-10 w-10 rounded-lg opacity-30 [background-image:linear-gradient(to_right,rgba(249,115,22,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.3)_1px,transparent_1px)] [background-size:8px_8px] sm:h-12 sm:w-12 md:h-14 md:w-14" />
            <div className="relative flex justify-center items-center md:absolute md:right-1 md:top-4 z-0 sm:right-2 sm:top-6 md:right-2 md:top-6">
              <div className="hidden md:block absolute -left-2 -top-2 h-48 w-[360px] rounded-xl md:border-2 md:border-orange-400/70 sm:h-56 sm:w-[400px] md:h-64 md:w-[460px] md:rounded-[2rem] md:border-4"></div>
              <img
                src="/images/HeroImg3.jpg"
                alt="Team meeting"
                className="relative h-48 w-[360px] rounded-xl bg-white object-cover shadow-xl sm:h-56 sm:w-[400px] md:h-64 md:w-[460px] md:rounded-[2rem]"
              />
            </div>
            <div className="relative hidden flex justify-center items-center md:block md:absolute md:left-2 md:bottom-2 z-10 sm:left-4 sm:bottom-4 md:left-4 md:bottom-4">
              <div className="absolute -left-2 -top-2 h-40 w-[280px] rounded-xl md:border-2 border-orange-400/70 sm:h-48 sm:w-[320px] md:h-56 md:w-[360px] md:rounded-[2rem] md:border-4"></div>
              <img
                src="/images/Networking.jpg"
                alt="Networking"
                className="relative h-40 w-[280px] rounded-xl bg-white object-cover shadow-xl sm:h-48 sm:w-[320px] md:h-56 md:w-[360px] md:rounded-[2rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <JobFairSection />
      </section>

      <section className="container mx-auto py-2 sm:py-12 md:py-12 lg:py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-3xl">Browse by Industry</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base md:text-base">Find the role that fits. New jobs added daily.</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-4 md:mt-8">
          {categories.map((c) => (
            <div key={c.title} className="group rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-2xl text-orange-600 ring-1 ring-orange-100">
                  {c.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{c.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-6 shadow-sm sm:p-10 md:mt-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-700">We are hiring</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900">Let’s work together & explore opportunities</h3>
            </div>
            <a href="/jobs" className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <section className="hidden md:block">
        <Experience />
      </section>

      <section className="py-16 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers regarding EarlyJobs.
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
                  <div className="bg-gray-50 rounded-lg shadow-md border-0">
                    <button
                      className="w-full flex justify-between items-center p-5 text-left text-gray-900 font-semibold text-lg"
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-orange-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="p-5 pt-0 text-gray-600">
                        <p>{faq.answer}</p>
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