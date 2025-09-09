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
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL_IN;
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

  const handleSuggestionClick = (job) => {
    const slug = createSlug(job.title);
    window.location.href = `/jobs/${slug}/${job.id}`;
  };

  return (
    <div className="bg-gradient-to-b from-white via-orange-100/90 to-orange-50/40 min-h-screen px-4 sm:px-6 lg:px-8">
      <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] lg:min-h-screen">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-[radial-gradient(70%_70%_at_15%_5%,rgba(251,146,60,0.6),transparent_60%),radial-gradient(60%_60%_at_85%_10%,rgba(249,115,22,0.55),transparent_60%),radial-gradient(50%_50%_at_50%_40%,rgba(253,186,116,0.4),transparent_70%)]" />

        <div className="container mx-auto grid gap-6 py-6 sm:gap-8 sm:py-8 md:grid-cols-2 md:items-center md:gap-10 md:py-12 lg:py-16">
          <div className="space-y-4 lg:mr-10">
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 sm:px-3 sm:py-1.5">
              New
            </span>
            <h1 className="text-xl font-extrabold leading-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              <span className="text-orange-500">EarlyJobs</span> makes it easy to find your next role
            </h1>
            <p className="text-sm text-gray-600 sm:text-base md:text-lg lg:max-w-lg">
              Discover opportunities on EarlyJobs. Search by industry or category — then apply in one click.
            </p>

            <div className="relative w-full rounded-xl border border-orange-200/80 bg-white/95 p-2 shadow-sm ring-1 ring-orange-200/70 backdrop-blur sm:p-3 md:shadow-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const params = new URLSearchParams({ industry });
                  window.location.href = `/jobs?${params.toString()}`;
                }}
              >
                <div className="grid gap-2">
                  <div className="relative">
                    <label className="flex items-center gap-2 rounded-lg border border-orange-100 bg-white px-2 py-1.5 text-sm text-gray-700 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-200 sm:px-3 sm:py-2">
                      <Search className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                      <input
                        ref={industryInputRef}
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        onKeyDown={handleIndustryKeyDown}
                        placeholder="Search Job Role, Industry, Location"
                        className="w-full bg-transparent placeholder:text-gray-400 focus:outline-none text-sm sm:text-base"
                      />
                    </label>
                    {suggestions.length > 0 && (
                      <ul
                        ref={dropdownRef}
                        className="absolute z-10 w-full mt-1 bg-white border border-orange-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                      >
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={suggestion.id}
                            className={`px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-orange-50 flex items-center gap-2 sm:px-4 sm:py-3 ${
                              index === highlightedIndex ? "bg-orange-100" : ""
                            }`}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <img
                              src={suggestion.company_logo_url}
                              alt={`${suggestion.company_name} logo`}
                              className="w-6 h-6 rounded-full object-contain sm:w-8 sm:h-8"
                            />
                            <div>
                              <p className="font-semibold">{suggestion.title}</p>
                              <p className="text-xs text-gray-500 sm:text-sm">{suggestion.company_name}</p>
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

            <p className="text-xs text-gray-500 sm:text-sm">
              Popular searches: <a className="text-orange-700 hover:underline" href="#">Information Technology</a>,{" "}
              <a className="text-orange-700 hover:underline" href="#">Finance</a>,{" "}
              <a className="text-orange-700 hover:underline" href="#">Management</a>
            </p>
          </div>

          <div className="relative h-[200px] sm:h-[280px] md:h-[360px] lg:h-[420px] xl:h-[460px]">
            <div className="absolute -left-2 -top-2 size-16 rounded-3xl bg-orange-200/60 blur-lg sm:size-20 sm:blur-xl md:size-24 md:blur-2xl" />
            <div className="absolute -right-4 bottom-0 size-20 rounded-full bg-orange-300/60 blur-xl sm:size-24 sm:blur-2xl md:size-28 md:blur-3xl" />
            <div className="absolute right-1 top-1 h-10 w-10 rounded-lg opacity-40 [background-image:linear-gradient(to_right,rgba(249,115,22,.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.35)_1px,transparent_1px)] [background-size:8px_8px] sm:h-12 sm:w-12 md:h-14 md:w-14" />
            <div className="absolute left-1 bottom-1/3 h-8 w-8 rounded-lg opacity-30 [background-image:linear-gradient(to_right,rgba(249,115,22,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,.3)_1px,transparent_1px)] [background-size:6px_6px] sm:h-10 sm:w-10 md:h-12 md:w-12" />
            <div className="relative flex justify-center items-center">
              
              <img
                src="/images/HeroImg3.jpg"
                alt="Team meeting"
                className="relative h-36 w-[240px] rounded-lg bg-white object-cover shadow-md sm:h-48 sm:w-[320px] md:h-56 md:w-[360px] lg:h-64 lg:w-[420px] xl:rounded-xl"
              />
            </div>
            <div className="relative hidden md:block flex justify-center items-center mt-4 sm:mt-6 md:absolute md:left-2 md:bottom-2 z-10">
               <img
                src="/images/Networking.jpg"
                alt="Networking"
                className="relative h-28 w-[200px] rounded-lg bg-white object-cover shadow-md sm:h-36 sm:w-[240px] md:h-48 md:w-[280px] lg:h-56 lg:w-[320px] xl:rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sm:py-4 md:py-6 lg:py-8">
        <JobFairSection />
      </section>

      <section className="container mx-auto py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">Browse by Industry</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base md:text-lg">Find the role that fits. New jobs added daily.</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <div key={c.title} className="group rounded-xl border border-orange-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 text-xl text-orange-600 ring-1 ring-orange-100 sm:h-12 sm:w-12 sm:text-2xl">
                  {c.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{c.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-4 shadow-sm sm:mt-8 sm:p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-700 sm:text-sm">We are hiring</p>
              <h3 className="mt-1 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">Let’s work together & explore opportunities</h3>
            </div>
            <a href="/jobs" className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 text-sm font-semibold text-white shadow hover:from-orange-600 hover:to-orange-700 sm:h-11 sm:px-6">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <section className="hidden lg:block py-6 sm:py-8 md:py-10 lg:py-12">
        <Experience />
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
              Got questions? We've got answers regarding EarlyJobs.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {faqs.slice(0, 10).map((faq, index) => {
              const { ref, isVisible } = useScrollAnimation();
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`transition-all duration-700 delay-${index * 100} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="bg-gray-50 rounded-lg shadow-sm border-0">
                    <button
                      className="w-full flex justify-between items-center p-4 text-left text-gray-900 font-semibold text-base sm:p-5 sm:text-lg"
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-4 h-4 text-orange-600 sm:w-5 sm:h-5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="p-4 pt-0 text-gray-600 text-sm sm:p-5 sm:text-base">
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