import type { GccPageContent } from "./types";

const sharedComparisonRows = [
  { traditional: "Recruitment agencies work role by role", enterprise: "GCC hiring requires long-term hiring strategy" },
  { traditional: "Recruiters work independently", enterprise: "Hiring needs coordinated execution" },
  { traditional: "Limited market visibility", enterprise: "Enterprises need talent intelligence" },
  { traditional: "Manual coordination", enterprise: "Hiring requires operational efficiency" },
  { traditional: "Reactive hiring", enterprise: "Continuous talent pipeline" },
];

const sharedValueItems = [
  "Dedicated recruiter pods",
  "Distributed recruiter network across India",
  "AI-assisted sourcing and screening",
  "Interview coordination and offer management",
  "Employer branding support",
  "Candidate engagement workflows",
  "Hiring analytics and recruitment operations",
];

const sharedTimeline = [
  { title: "Discovery", description: "Understand business goals, hiring plans, and timelines." },
  { title: "Hiring Strategy", description: "Define workforce priorities, locations, and recruiter allocation." },
  { title: "Recruiter Pod Setup", description: "Deploy dedicated hiring teams aligned to your GCC functions." },
  { title: "Talent Mapping", description: "Map market availability across India's talent hubs." },
  { title: "AI-assisted Candidate Discovery", description: "Source and rank candidates using Human + AI workflows." },
  { title: "Screening", description: "Qualify candidates against skills, experience, and culture fit." },
  { title: "Interview Coordination", description: "Coordinate recruiters, hiring managers, and candidates." },
  { title: "Offer Management", description: "Manage offers, negotiations, and joining support." },
  { title: "Joining", description: "Track successful joins and onboarding readiness." },
];

export const gccHiringSolutions: GccPageContent = {
  slug: "gcc-hiring-solutions",
  variant: "pillar",
  meta: {
    title: "GCC Hiring Solutions | EarlyJobs.ai",
    description:
      "Build and scale your Global Capability Center in India with Human + AI hiring infrastructure, dedicated recruiter pods, and enterprise recruitment operations.",
    keywords: [
      "GCC hiring solutions",
      "Global Capability Center hiring",
      "India GCC recruitment",
      "enterprise hiring partner",
      "GCC talent acquisition",
    ],
  },
  hero: {
    eyebrow: "GCC Hiring Solutions",
    headline: "GCC Hiring Solutions Built for High-Growth Global Capability Centers",
    subheadline:
      "Build and scale your Global Capability Center in India through a Human + AI hiring infrastructure designed to deliver engineering, product, leadership, and business talent faster.",
    paragraph:
      "Whether you're establishing your first GCC or expanding an existing capability center, EarlyJobs helps enterprise organizations hire with speed, quality, and consistency through dedicated recruiter networks, structured hiring operations, and AI-assisted recruitment workflows.",
    primaryCta: "Book a GCC Hiring Consultation",
    secondaryCta: "Download GCC Hiring Playbook",
    trustBar: ["Engineering Hiring", "Leadership Hiring", "Volume Hiring", "Campus Hiring", "Recruitment Operations"],
  },
  editorial: {
    heading: "The Next Generation of Global Capability Centers Will Be Built on Better Hiring.",
    content:
      "Over the past decade, India has evolved from being a cost-efficient outsourcing destination into one of the world's largest innovation and capability hubs.\n\nToday, Global Capability Centers are driving engineering, AI, product development, cybersecurity, finance, customer success, and enterprise operations for some of the world's leading organizations.\n\nHowever, as more companies expand into India, hiring has become significantly more competitive. The challenge is no longer access to talent. The challenge is building a hiring system capable of identifying, engaging, and onboarding the right talent at scale.",
  },
  challenges: {
    heading: "Why Scaling a GCC Is More Difficult Than Filling Open Roles",
    items: [
      "Engineering talent shortages",
      "Leadership hiring complexity",
      "Offer drop-offs",
      "Multiple recruitment vendors",
      "Slow interview coordination",
      "Lack of hiring visibility",
      "Employer branding challenges",
      "Scaling recruiter capacity",
    ],
  },
  comparison: {
    heading: "Why Traditional Recruitment Models Fall Short",
    rows: sharedComparisonRows,
    footer: "Traditional recruitment solves vacancies. Modern GCCs require hiring infrastructure.",
  },
  valueProposition: {
    heading: "Human + AI Hiring Infrastructure for GCCs",
    subheading: "Introducing EarlyJobs",
    items: sharedValueItems,
    outcome: "A predictable, scalable hiring engine for enterprise GCC growth.",
  },
  categories: {
    heading: "What We Help GCCs Hire",
    items: [
      "Engineering",
      "Cloud",
      "DevOps",
      "Cybersecurity",
      "AI & Machine Learning",
      "Product",
      "Design",
      "Finance",
      "Shared Services",
      "Operations",
      "HR & Legal",
      "Customer Success",
      "Leadership",
      "Campus & Volume Hiring",
    ],
  },
  timeline: {
    heading: "How EarlyJobs Works",
    steps: sharedTimeline,
  },
  differentiators: {
    heading: "Why Enterprises Choose EarlyJobs",
    items: [
      "Nationwide Recruiter Network",
      "Human + AI Hiring",
      "Dedicated Hiring Pods",
      "Recruitment Operations",
      "Faster Time-to-Hire",
      "Scalable Delivery",
    ],
  },
  outcomes: {
    heading: "Business Outcomes",
    items: [
      "Reduce Time-to-Hire",
      "Increase Hiring Velocity",
      "Improve Recruiter Productivity",
      "Higher Offer-to-Join Ratio",
      "Better Candidate Experience",
      "Lower Vendor Complexity",
    ],
  },
  industries: {
    heading: "Industries We Support",
    items: [
      "Technology",
      "SaaS",
      "BFSI",
      "Healthcare",
      "Retail",
      "Manufacturing",
      "Automotive",
      "Enterprise Software",
      "Global Business Services",
    ],
  },
  successStory: {
    heading: "Enterprise Hiring Success Framework",
    steps: [
      { title: "Challenge", description: "Hiring bottlenecks during GCC expansion." },
      { title: "Solution", description: "Dedicated recruiter pods and AI-assisted recruitment operations." },
      { title: "Execution", description: "End-to-end hiring support across engineering and shared services." },
      { title: "Outcome", description: "Faster hiring, improved visibility, and scalable recruitment execution." },
    ],
  },
  faqs: [
    {
      question: "What is GCC hiring?",
      answer:
        "GCC hiring is the process of building and scaling talent teams for Global Capability Centers in India—covering workforce planning, sourcing, screening, interviews, offers, and joining at enterprise scale.",
    },
    {
      question: "Why India for GCC expansion?",
      answer:
        "India offers deep engineering talent, mature digital infrastructure, innovation ecosystems, and proven GCC delivery capability across technology, finance, and shared services.",
    },
    {
      question: "How is EarlyJobs different from recruitment agencies?",
      answer:
        "EarlyJobs is a hiring infrastructure partner—not a resume vendor. We combine recruiter pods, nationwide networks, AI-assisted operations, and hiring analytics to deliver predictable outcomes.",
    },
    {
      question: "What roles can you hire?",
      answer:
        "We support engineering, product, leadership, finance, operations, shared services, campus, and high-volume hiring across GCC functions.",
    },
    {
      question: "How do recruiter pods work?",
      answer:
        "Dedicated recruiter pods are aligned to your GCC functions and hiring priorities, operating as an extension of your talent team with structured workflows and reporting.",
    },
    {
      question: "Can you support leadership hiring?",
      answer: "Yes. We support leadership and specialized hiring with dedicated search expertise and structured evaluation workflows.",
    },
    {
      question: "Do you provide hiring analytics?",
      answer:
        "Yes. Hiring dashboards, funnel metrics, recruiter performance, and leadership reporting are part of our recruitment operations model.",
    },
    {
      question: "How quickly can hiring begin?",
      answer:
        "After discovery and strategy alignment, recruiter pod deployment and sourcing can begin quickly based on your hiring roadmap and priorities.",
    },
  ],
  finalCta: {
    heading: "Build a Hiring Engine That Scales with Your GCC",
    paragraph:
      "Whether you're launching a new Global Capability Center or expanding an existing one, EarlyJobs helps you hire exceptional talent through a structured, Human + AI hiring infrastructure built for enterprise growth.",
    primaryCta: "Book a GCC Hiring Consultation",
    secondaryCta: "Download the GCC Hiring Playbook",
  },
};

export const buildGccIndia: GccPageContent = {
  slug: "build-gcc-india",
  variant: "expansion",
  meta: {
    title: "Build GCC in India | EarlyJobs.ai",
    description:
      "Build your Global Capability Center in India with strategic hiring, recruiter networks, and Human + AI recruitment operations from day one.",
    keywords: [
      "build GCC in India",
      "Global Capability Center India",
      "India GCC strategy",
      "GCC expansion India",
      "offshore capability center India",
    ],
  },
  hero: {
    eyebrow: "Build GCC in India",
    headline: "Build Your Global Capability Center in India with Confidence",
    subheadline:
      "Whether you're launching your first Global Capability Center or expanding an existing operation, EarlyJobs helps you build high-performing teams through strategic hiring, recruiter networks, and Human + AI recruitment operations.",
    paragraph:
      "India has become the world's leading destination for Global Capability Centers—but success depends on more than choosing a city. It depends on building the right hiring strategy, attracting exceptional talent, and creating a scalable recruitment engine from day one.",
    primaryCta: "Book a GCC Strategy Consultation",
    secondaryCta: "Download the GCC Expansion Guide",
    trustBar: ["Greenfield GCC", "Expansion Hiring", "Workforce Planning", "Multi-City Hiring", "Leadership Hiring"],
  },
  editorial: {
    heading: "India Has Become the Global Innovation Hub for Enterprise Growth.",
    content:
      "India is no longer only an outsourcing destination. GCCs now drive engineering, AI, cybersecurity, product development, finance, and shared services.\n\nOrganizations succeed when they combine talent depth, startup ecosystem maturity, digital infrastructure, and global delivery capability with a hiring foundation built before they scale.",
    transition: "Most hiring problems don't appear on Day 1. They appear when companies need to scale from 20 hires to 200.",
    planningQuestions: [
      "Why are you building a GCC?",
      "Which functions should be built first?",
      "Which city aligns with your hiring goals?",
      "What talent will you need over 24 months?",
      "Can your recruitment model scale?",
    ],
  },
  challenges: {
    heading: "The Hiring Challenges Most GCCs Underestimate",
    items: [
      "Competition for engineering talent",
      "Leadership hiring delays",
      "Offer drop-offs",
      "Employer branding gaps",
      "Recruitment operations complexity",
      "Lack of hiring visibility",
      "Scaling recruiter capacity",
      "Interview coordination bottlenecks",
    ],
  },
  comparison: {
    heading: "Why Traditional Recruitment Models Fall Short",
    rows: [
      { traditional: "Resume sourcing", enterprise: "Hiring strategy + execution" },
      { traditional: "Multiple agencies", enterprise: "One hiring partner" },
      { traditional: "Reactive hiring", enterprise: "Workforce planning" },
      { traditional: "Limited visibility", enterprise: "Hiring dashboards" },
      { traditional: "Manual coordination", enterprise: "AI-assisted operations" },
    ],
    footer: "Build your GCC with the right hiring strategy from day one—not just immediate hiring.",
  },
  valueProposition: {
    heading: "Your Hiring Infrastructure Partner from Planning to Scale",
    subheading: "How EarlyJobs Supports GCC Expansion",
    items: [
      "GCC hiring strategy and workforce planning",
      "Talent mapping across India",
      "Dedicated recruiter pods",
      "Recruiter network across India",
      "AI-assisted sourcing",
      "Employer branding and interview operations",
      "Offer management and hiring analytics",
      "Leadership, campus, and volume hiring",
    ],
    outcome: "A repeatable enterprise methodology: Discover → Design → Deploy → Deliver → Scale.",
  },
  categories: {
    heading: "Roles We Help Build",
    items: [
      "Software Development",
      "AI & ML",
      "Cloud & DevOps",
      "Cybersecurity",
      "Data Engineering",
      "Product Management",
      "Finance & HR",
      "Operations",
      "Shared Services",
      "Leadership",
      "Graduate Programs",
    ],
  },
  framework: {
    heading: "The Five Stages of Building a Successful GCC",
    phases: [
      { title: "Business Strategy", description: "Define why you're building a GCC and which capabilities matter most." },
      { title: "Location Selection", description: "Align city strategy with talent availability, cost, and hiring goals." },
      { title: "Talent & Hiring Strategy", description: "EarlyJobs partners from this stage—workforce planning and hiring roadmap." },
      { title: "Recruitment Execution", description: "Deploy recruiter pods, sourcing, screening, and interview operations." },
      { title: "Scale & Optimize", description: "Expand capacity, improve hiring velocity, and optimize delivery." },
    ],
  },
  timeline: {
    heading: "GCC Hiring Framework",
    steps: [
      { title: "Business Goals" },
      { title: "Hiring Forecast" },
      { title: "Recruiter Deployment" },
      { title: "AI Candidate Discovery" },
      { title: "Screening" },
      { title: "Interview Coordination" },
      { title: "Offer Management" },
      { title: "Joining" },
      { title: "Hiring Dashboard" },
    ],
  },
  differentiators: {
    heading: "Why EarlyJobs",
    items: [
      "India Expansion Hiring Partner",
      "Strategic hiring—not transactional recruiting",
      "Human + AI recruitment operations",
      "Nationwide recruiter network",
      "Greenfield and expansion GCC support",
      "Long-term hiring partnership",
    ],
  },
  outcomes: {
    heading: "Business Outcomes",
    items: [
      "Faster GCC team build-out",
      "Structured hiring from Stage 3 onward",
      "Reduced vendor complexity",
      "Improved hiring visibility",
      "Scalable recruiter capacity",
      "Better offer-to-join outcomes",
    ],
  },
  faqs: [
    {
      question: "What is a Global Capability Center?",
      answer:
        "A GCC is an in-country capability center that delivers engineering, product, finance, operations, or shared services for a global enterprise—often in India.",
    },
    {
      question: "Why should companies build a GCC in India?",
      answer:
        "India offers talent depth, innovation ecosystems, and proven GCC delivery across technology and business functions at enterprise scale.",
    },
    {
      question: "Can EarlyJobs support greenfield GCC launches?",
      answer:
        "Yes. We support greenfield launches with hiring strategy, workforce planning, recruiter deployment, and end-to-end execution.",
    },
    {
      question: "Which city is best for a GCC?",
      answer:
        "It depends on your function and hiring goals. Bengaluru, Hyderabad, Pune, Chennai, and NCR each offer distinct talent advantages.",
    },
    {
      question: "Do you help with workforce planning?",
      answer: "Yes. Workforce planning and hiring forecasting are core parts of our GCC expansion support.",
    },
  ],
  finalCta: {
    heading: "Planning to Build a GCC in India?",
    paragraph:
      "Talk to EarlyJobs and design a hiring strategy that supports long-term growth—not just immediate hiring.",
    primaryCta: "Book a GCC Strategy Consultation",
    secondaryCta: "Download the India GCC Expansion Playbook",
  },
};

export const gccRecruitmentPartner: GccPageContent = {
  slug: "gcc-recruitment-partner",
  variant: "partner",
  meta: {
    title: "GCC Recruitment Partner | EarlyJobs.ai",
    description:
      "Your GCC needs more than a recruitment agency. Partner with EarlyJobs for dedicated recruiter pods, Human + AI hiring operations, and enterprise-grade recruitment execution.",
    keywords: [
      "GCC recruitment partner",
      "recruitment partner for GCC",
      "GCC hiring partner India",
      "enterprise recruitment partner",
      "India recruitment partner",
    ],
  },
  hero: {
    eyebrow: "GCC Recruitment Partner",
    headline: "Your GCC Needs More Than a Recruitment Agency. It Needs a Hiring Partner.",
    subheadline:
      "Scale your Global Capability Center with a dedicated recruitment partner that combines nationwide recruiter networks, Human + AI hiring operations, and enterprise-grade recruitment execution.",
    paragraph:
      "Whether you're hiring your first engineering team or expanding across multiple business functions, EarlyJobs helps Global Capability Centers accelerate hiring through structured recruitment operations, dedicated recruiter pods, and deep expertise in India's talent market.",
    primaryCta: "Book a Recruitment Strategy Call",
    secondaryCta: "View Our GCC Hiring Framework",
    trustBar: [
      "Dedicated Recruiter Pods",
      "Engineering Hiring",
      "Leadership Search",
      "Multi-location Hiring",
      "Recruitment Analytics",
    ],
  },
  editorial: {
    heading: "The Success of Your GCC Depends on the Quality of Your Hiring Partner.",
    content:
      "A recruitment partner doesn't simply fill vacancies. They influence speed-to-hire, employer brand, candidate experience, hiring costs, leadership confidence, and business expansion.\n\nPoor recruitment partnerships create slow hiring, vendor management complexity, poor visibility, candidate drop-offs, and inconsistent hiring quality.",
    transition: "Most recruitment agencies deliver resumes. Enterprise organizations need predictable hiring outcomes.",
  },
  challenges: {
    heading: "What Enterprise GCCs Actually Need",
    items: [
      "Dedicated hiring teams",
      "Engineering recruiters",
      "Leadership hiring specialists",
      "AI-assisted recruitment",
      "Interview operations",
      "Candidate experience",
      "Offer management",
      "Hiring analytics",
      "Talent intelligence",
      "Recruiter network",
      "Employer branding",
      "Scalable recruitment",
    ],
  },
  comparison: {
    heading: "Why Traditional Recruitment Agencies Fall Short",
    rows: [
      { traditional: "Works role-by-role", enterprise: "Builds long-term hiring capability" },
      { traditional: "Individual recruiters", enterprise: "Dedicated recruiter pods" },
      { traditional: "Manual tracking", enterprise: "Centralized hiring dashboards" },
      { traditional: "Limited specialization", enterprise: "Domain-specific recruiters" },
      { traditional: "Reactive hiring", enterprise: "Workforce planning" },
    ],
    footer: "Recruitment agencies focus on vacancies. EarlyJobs focuses on hiring infrastructure.",
  },
  valueProposition: {
    heading: "Built to Become an Extension of Your Talent Acquisition Team",
    subheading: "Meet Your GCC Recruitment Partner",
    items: [
      "Dedicated hiring pods",
      "Recruitment operations",
      "AI-powered sourcing",
      "Candidate engagement",
      "Interview coordination",
      "Offer management",
      "Hiring dashboards",
      "Recruitment governance",
      "Workforce planning",
      "Continuous hiring optimization",
    ],
    outcome: "A structured hiring engine—not a transactional agency relationship.",
  },
  services: {
    heading: "Recruitment Services for GCCs",
    items: [
      "Engineering Hiring",
      "Leadership Hiring",
      "Product Hiring",
      "Shared Services",
      "Campus Hiring",
      "Volume Hiring",
      "Confidential Hiring",
      "Multi-location Hiring",
      "Specialized Technology Hiring",
      "Recruitment Process Management",
      "Employer Branding Support",
      "Recruitment Analytics",
    ],
  },
  timeline: {
    heading: "How We Work",
    steps: sharedTimeline,
  },
  differentiators: {
    heading: "Why EarlyJobs",
    items: [
      "Nationwide Recruiter Network",
      "Human + AI Hiring Infrastructure",
      "Dedicated Recruiter Pods",
      "Enterprise Recruitment Operations",
      "Hiring Analytics & Reporting",
      "Proven GCC Hiring Experience",
    ],
  },
  outcomes: {
    heading: "Business Outcomes",
    items: [
      "Accelerate Hiring",
      "Improve Recruiter Productivity",
      "Reduce Vendor Complexity",
      "Increase Offer Acceptance",
      "Improve Candidate Experience",
      "Scale Across India",
      "Better Hiring Visibility",
      "Lower Cost-per-Hire",
    ],
  },
  engagementModels: {
    heading: "Enterprise Engagement Models",
    items: [
      "Project Hiring",
      "Dedicated Recruiter Pods",
      "Recruitment as a Service (RaaS)",
      "Long-term Hiring Partnership",
      "Leadership Search",
      "High-volume Recruitment",
    ],
  },
  industries: {
    heading: "Industries We Support",
    items: [
      "Technology",
      "SaaS",
      "Healthcare",
      "Manufacturing",
      "Retail",
      "BFSI",
      "Telecom",
      "Automotive",
      "Global Business Services",
      "Product Companies",
    ],
  },
  successStory: {
    heading: "Customer Success Framework",
    steps: [
      { title: "Discover" },
      { title: "Design" },
      { title: "Deploy" },
      { title: "Deliver" },
      { title: "Optimize" },
      { title: "Scale" },
    ],
  },
  faqs: [
    {
      question: "What makes a good GCC recruitment partner?",
      answer:
        "A strong partner delivers dedicated teams, hiring operations, domain expertise, visibility, and scalable execution—not just resume submissions.",
    },
    {
      question: "Do you provide dedicated recruiters?",
      answer: "Yes. Dedicated recruiter pods are a core part of our enterprise engagement model.",
    },
    {
      question: "Can you hire across multiple cities?",
      answer: "Yes. Our nationwide recruiter network supports multi-city GCC hiring across India.",
    },
    {
      question: "How do you measure hiring performance?",
      answer:
        "We track hiring velocity, funnel metrics, offer acceptance, recruiter productivity, and SLA performance through hiring dashboards.",
    },
    {
      question: "Do you support confidential hiring?",
      answer: "Yes. We support confidential and leadership hiring with structured governance and discretion.",
    },
  ],
  finalCta: {
    heading: "Looking for a Recruitment Partner That Can Scale with Your GCC?",
    paragraph:
      "Build a hiring engine designed for enterprise growth—not just vacancy filling.",
    primaryCta: "Book a Recruitment Strategy Call",
    secondaryCta: "Download GCC Hiring Framework",
  },
};

export const offshoreCapabilityCenterHiring: GccPageContent = {
  slug: "offshore-capability-center-hiring",
  variant: "offshore",
  meta: {
    title: "Offshore Capability Center Hiring | EarlyJobs.ai",
    description:
      "Build and scale your offshore capability center with structured hiring operations, dedicated recruiter pods, and Human + AI recruitment infrastructure.",
    keywords: [
      "offshore capability center hiring",
      "offshore hiring India",
      "offshore development center hiring",
      "offshore recruitment partner India",
      "India offshore recruitment",
    ],
  },
  hero: {
    eyebrow: "Offshore Capability Center Hiring",
    headline: "Offshore Capability Center Hiring Built for Enterprise Scale",
    subheadline:
      "From engineering and product to finance, shared services, and leadership hiring, EarlyJobs helps Global Capability Centers build scalable hiring operations through Human + AI recruitment infrastructure.",
    paragraph:
      "Whether you're setting up a new offshore capability center or expanding an existing team, we provide dedicated recruiter pods, AI-assisted recruitment workflows, and nationwide hiring expertise to accelerate growth without compromising quality.",
    primaryCta: "Book Offshore Hiring Consultation",
    secondaryCta: "Download Offshore Hiring Playbook",
    trustBar: [
      "Engineering Hiring",
      "Leadership Hiring",
      "Volume Hiring",
      "Hiring Governance",
      "Multi-city Execution",
    ],
  },
  editorial: {
    heading: "Offshore Capability Centers Are No Longer Cost Centers. They're Innovation Centers.",
    content:
      "Modern offshore centers are responsible for engineering, product development, AI, data, cybersecurity, finance, customer success, and shared services.\n\nHiring has become a strategic business capability. The companies that scale fastest invest in structured hiring operations—not just recruitment.",
    transition:
      "These challenges don't appear when hiring 10 people. They appear when you're hiring 100+ across multiple teams.",
  },
  challenges: {
    heading: "Challenges Offshore Capability Centers Face",
    items: [
      "Engineering talent shortages",
      "Leadership hiring delays",
      "Multiple hiring stakeholders",
      "Vendor dependency",
      "Interview bottlenecks",
      "Offer drop-offs",
      "Hiring visibility gaps",
      "Scaling recruiter capacity",
      "Employer branding",
      "Cross-city hiring",
    ],
  },
  comparison: {
    heading: "Why Traditional Hiring Models Break Down",
    rows: [
      { traditional: "One recruiter", enterprise: "Multi-functional hiring teams" },
      { traditional: "Multiple agencies", enterprise: "Unified hiring operations" },
      { traditional: "Resume delivery", enterprise: "End-to-end execution" },
      { traditional: "Manual follow-ups", enterprise: "AI-assisted coordination" },
      { traditional: "Static reporting", enterprise: "Real-time hiring visibility" },
    ],
    footer: "Recruitment alone cannot support enterprise-scale offshore growth. Operations can.",
  },
  framework: {
    heading: "The EarlyJobs Offshore Hiring Framework",
    phases: [
      { title: "Hiring Discovery", description: "Understand business goals, functions, hiring plans, and timelines." },
      { title: "Talent Strategy", description: "Identify hiring priorities, locations, recruiter allocation, and market availability." },
      { title: "Execution", description: "Dedicated recruiter pods begin sourcing, screening, and coordinating interviews." },
      { title: "Optimization", description: "Weekly hiring reviews, bottleneck analysis, and pipeline improvements." },
      { title: "Scale", description: "Expand recruiter capacity and support new business units." },
    ],
  },
  services: {
    heading: "What EarlyJobs Delivers",
    items: [
      "Engineering Hiring",
      "Leadership Hiring",
      "Volume Hiring",
      "Campus Hiring",
      "Recruiter Pods",
      "Recruitment Operations",
      "AI Candidate Discovery",
      "Interview Coordination",
      "Employer Branding",
      "Offer Management",
      "Candidate Engagement",
      "Hiring Analytics",
    ],
  },
  categories: {
    heading: "Roles We Hire",
    items: [
      "Backend & Frontend Engineering",
      "Cloud & DevOps",
      "AI & ML",
      "Cybersecurity",
      "QA",
      "Product",
      "Finance & HR",
      "Operations",
      "Customer Success",
      "Leadership",
      "Graduate Hiring",
      "Shared Services",
    ],
  },
  differentiators: {
    heading: "Why Enterprises Trust EarlyJobs",
    items: [
      "Human + AI Hiring",
      "Recruiter Network Across India",
      "Dedicated Hiring Pods",
      "Operational Excellence",
      "Hiring Governance",
      "Recruitment Analytics",
      "Employer Branding Support",
      "Enterprise Delivery Model",
    ],
  },
  outcomes: {
    heading: "Business Outcomes",
    items: [
      "Reduce Hiring Time",
      "Increase Hiring Velocity",
      "Improve Candidate Experience",
      "Lower Vendor Complexity",
      "Improve Offer Acceptance",
      "Increase Recruiter Productivity",
      "Scalable Recruitment Operations",
      "Hiring Visibility",
    ],
  },
  governance: {
    heading: "Delivery Governance",
    items: [
      "Weekly Hiring Reviews",
      "Hiring Dashboards",
      "Recruitment Analytics",
      "SLA Tracking",
      "Interview Metrics",
      "Offer Funnel Reporting",
      "Leadership Reporting",
      "Recruiter Performance Reviews",
    ],
  },
  successStory: {
    heading: "Offshore Hiring Success Framework",
    steps: [
      { title: "Business Challenge", description: "Scaling offshore hiring across multiple teams and functions." },
      { title: "Hiring Strategy", description: "Structured workforce planning and recruiter pod deployment." },
      { title: "Execution Model", description: "End-to-end hiring operations with Human + AI workflows." },
      { title: "Hiring Outcomes", description: "Improved velocity, visibility, and offer acceptance." },
      { title: "Business Impact", description: "Scalable offshore growth with operational confidence." },
    ],
  },
  faqs: [
    {
      question: "What is offshore capability center hiring?",
      answer:
        "It is the end-to-end hiring execution required to build and scale offshore capability centers—including sourcing, screening, interviews, offers, and joining at enterprise volume.",
    },
    {
      question: "How does EarlyJobs support offshore expansion?",
      answer:
        "We operationalize hiring through recruiter pods, AI-assisted workflows, governance, and nationwide execution—not just resume delivery.",
    },
    {
      question: "Can you hire engineering teams?",
      answer: "Yes. Engineering hiring is a core capability across backend, frontend, cloud, DevOps, AI, and cybersecurity.",
    },
    {
      question: "Do you provide hiring analytics?",
      answer: "Yes. Real-time hiring dashboards, funnel metrics, and leadership reporting are part of our delivery model.",
    },
  ],
  finalCta: {
    heading: "Build an Offshore Hiring Engine That Can Scale with Your Business",
    paragraph:
      "Whether you're hiring 25 people or building a 1,000-person capability center, EarlyJobs helps you execute hiring with speed, structure, and confidence.",
    primaryCta: "Book Offshore Hiring Consultation",
    secondaryCta: "Download Offshore Hiring Playbook",
  },
};

export const gccTalentAcquisition: GccPageContent = {
  slug: "gcc-talent-acquisition",
  variant: "talent",
  meta: {
    title: "GCC Talent Acquisition | EarlyJobs.ai",
    description:
      "Build a scalable Talent Acquisition function for your GCC with workforce planning, employer branding, recruiter operations, and Human + AI hiring infrastructure.",
    keywords: [
      "GCC talent acquisition",
      "talent acquisition for global capability centers",
      "enterprise talent acquisition India",
      "GCC hiring strategy",
      "India talent partner",
    ],
  },
  hero: {
    eyebrow: "GCC Talent Acquisition",
    headline: "Modern Talent Acquisition for Global Capability Centers",
    subheadline:
      "Build a scalable Talent Acquisition function that combines Human expertise, AI-powered hiring workflows, recruiter networks, and structured recruitment operations to help your GCC grow faster.",
    paragraph:
      "EarlyJobs partners with Global Capability Centers to design and execute modern talent acquisition strategies—from workforce planning and employer branding to engineering hiring, recruiter operations, and candidate experience.",
    primaryCta: "Book Talent Strategy Consultation",
    secondaryCta: "Download GCC Talent Acquisition Playbook",
    trustBar: [
      "Workforce Planning",
      "Employer Branding",
      "Talent Intelligence",
      "Candidate Experience",
      "Hiring Analytics",
    ],
  },
  editorial: {
    heading: "The Best GCCs Build Talent Pipelines—Not Hiring Pipelines.",
    content:
      "Traditional recruitment is reactive: someone resigns, a recruiter searches, an interview happens, a position gets filled.\n\nModern Talent Acquisition is proactive—building relationships with talent before roles open through talent communities, employer branding, workforce planning, recruiter networks, candidate experience, and hiring intelligence.",
    transition:
      "As GCCs grow, hiring becomes less about recruitment and more about building a repeatable talent acquisition engine.",
  },
  challenges: {
    heading: "Challenges Modern GCC Talent Teams Face",
    items: [
      "Engineering talent shortage",
      "Employer branding gaps",
      "Candidate experience issues",
      "Passive talent engagement",
      "Leadership hiring complexity",
      "Offer drop-offs",
      "Recruiter productivity",
      "Hiring visibility",
      "Multi-city hiring",
      "Forecasting workforce demand",
    ],
  },
  framework: {
    heading: "The EarlyJobs Talent Acquisition Framework",
    phases: [
      { title: "Business Goals" },
      { title: "Workforce Planning" },
      { title: "Talent Intelligence" },
      { title: "Recruiter Network" },
      { title: "Employer Branding" },
      { title: "AI Candidate Discovery" },
      { title: "Recruitment Operations" },
      { title: "Interview Coordination" },
      { title: "Offer Management" },
      { title: "Hiring Analytics" },
      { title: "Talent Community" },
    ],
  },
  services: {
    heading: "Our Talent Acquisition Capabilities",
    items: [
      "Talent Intelligence",
      "Recruiter Marketplace",
      "Dedicated Recruiter Pods",
      "Employer Branding",
      "Recruitment Marketing",
      "Candidate Engagement",
      "Interview Operations",
      "Offer Management",
      "Leadership Hiring",
      "Engineering Hiring",
      "Campus Hiring",
      "Volume Hiring",
      "Hiring Analytics",
      "Workforce Planning",
    ],
  },
  valueProposition: {
    heading: "Candidate Experience Matters More Than Ever",
    subheading: "Employer Branding as a Hiring Advantage",
    items: [
      "Clear and consistent communication",
      "Faster response and interview coordination",
      "Transparent hiring journey",
      "Strong interview experience",
      "Structured offer and joining support",
      "Employer brand influence on offer acceptance and talent quality",
    ],
    outcome: "EarlyJobs supports employer branding and candidate experience as strategic hiring advantages.",
  },
  comparison: {
    heading: "Why Talent Leaders Choose EarlyJobs",
    rows: [
      { traditional: "Fill vacancies", enterprise: "Build talent ecosystems" },
      { traditional: "Agency relationship", enterprise: "Strategic partnership" },
      { traditional: "Resume delivery", enterprise: "End-to-end hiring operations" },
      { traditional: "Limited visibility", enterprise: "Hiring intelligence" },
      { traditional: "One-time engagement", enterprise: "Continuous talent acquisition" },
    ],
    footer: "Hiring fills today's vacancies. Talent Acquisition builds tomorrow's workforce.",
  },
  maturityModel: {
    heading: "Talent Acquisition Maturity Model",
    levels: [
      "Reactive Recruitment",
      "Agency Hiring",
      "Internal TA",
      "Human + AI Hiring",
      "Talent Acquisition Infrastructure",
    ],
    footer: "EarlyJobs enables Level 5—predictable, data-driven, Human + AI Talent Acquisition at enterprise scale.",
  },
  outcomes: {
    heading: "Business Outcomes",
    items: [
      "Reduce Time-to-Hire",
      "Improve Candidate Experience",
      "Increase Offer Acceptance",
      "Build Talent Communities",
      "Improve Recruiter Productivity",
      "Strengthen Employer Brand",
      "Scalable Hiring Operations",
      "Better Workforce Planning",
    ],
  },
  faqs: [
    {
      question: "What is Talent Acquisition for GCCs?",
      answer:
        "It is the strategic function of building long-term talent pipelines, employer brand, and hiring operations—not just filling individual roles.",
    },
    {
      question: "How is Talent Acquisition different from recruitment?",
      answer:
        "Recruitment is reactive vacancy filling. Talent Acquisition is proactive workforce building with planning, branding, and pipeline development.",
    },
    {
      question: "Can EarlyJobs support workforce planning?",
      answer: "Yes. Workforce planning and hiring forecasting are integrated into our TA framework.",
    },
    {
      question: "How do you improve candidate experience?",
      answer:
        "Through structured communication, faster coordination, transparent journeys, and offer/joining support across the hiring lifecycle.",
    },
  ],
  finalCta: {
    heading: "Build a Talent Acquisition Function That Scales with Your Business",
    paragraph:
      "Whether you're building your first GCC or expanding globally, EarlyJobs helps enterprises create a predictable, data-driven, Human + AI Talent Acquisition engine.",
    primaryCta: "Book Talent Strategy Consultation",
    secondaryCta: "Download Talent Acquisition Playbook",
  },
};

export const indiaGccHiringServices: GccPageContent = {
  slug: "india-gcc-hiring-services",
  variant: "pan-india",
  meta: {
    title: "India GCC Hiring Services | EarlyJobs.ai",
    description:
      "Pan-India GCC hiring services with dedicated recruiter pods, multi-city execution, and Human + AI recruitment operations for enterprise Global Capability Centers.",
    keywords: [
      "India GCC hiring services",
      "GCC hiring India",
      "pan India recruitment GCC",
      "multi-city GCC hiring",
      "India hiring partner GCC",
    ],
  },
  hero: {
    eyebrow: "India GCC Hiring Services",
    headline: "Pan-India GCC Hiring Services Built for Enterprise Scale",
    subheadline:
      "Execute hiring across India's talent hubs with dedicated recruiter pods, nationwide networks, and Human + AI recruitment operations designed for Global Capability Centers.",
    paragraph:
      "EarlyJobs delivers end-to-end GCC hiring services across Bengaluru, Hyderabad, Pune, Chennai, NCR, and beyond—helping enterprises hire engineering, product, leadership, and business talent with speed, structure, and visibility.",
    primaryCta: "Book India GCC Hiring Consultation",
    secondaryCta: "Download India Hiring Services Guide",
    trustBar: [
      "Pan-India Coverage",
      "Multi-City Hiring",
      "Engineering Teams",
      "Leadership Hiring",
      "Volume Recruitment",
    ],
  },
  editorial: {
    heading: "India's GCC Growth Requires Nationwide Hiring Execution.",
    content:
      "As Global Capability Centers expand beyond a single city, hiring complexity grows exponentially—multiple talent markets, competing employers, leadership gaps, and operational overhead.\n\nEarlyJobs provides India-wide hiring services that unify sourcing, screening, interview coordination, and offer management under one structured delivery model.",
    transition: "One partner. Multiple cities. Predictable hiring outcomes.",
  },
  challenges: {
    heading: "Why Pan-India GCC Hiring Is Hard to Execute",
    items: [
      "Different talent markets per city",
      "Cross-city recruiter coordination",
      "Leadership hiring across locations",
      "Employer brand consistency",
      "Vendor fragmentation",
      "Hiring visibility across regions",
      "Volume hiring at scale",
      "Offer competition by market",
    ],
  },
  comparison: {
    heading: "Fragmented Hiring vs. Unified India GCC Services",
    rows: [
      { traditional: "City-by-city agencies", enterprise: "One pan-India hiring partner" },
      { traditional: "Inconsistent processes", enterprise: "Standardized recruitment operations" },
      { traditional: "Local-only visibility", enterprise: "Unified hiring dashboards" },
      { traditional: "Separate recruiter teams", enterprise: "Coordinated recruiter network" },
      { traditional: "Reactive city hiring", enterprise: "National workforce planning" },
    ],
    footer: "Scale your GCC across India with one hiring infrastructure—not six separate vendors.",
  },
  valueProposition: {
    heading: "End-to-End India GCC Hiring Delivery",
    subheading: "What EarlyJobs Delivers",
    items: [
      "Pan-India recruiter network",
      "Multi-city engineering hiring",
      "Leadership and specialized search",
      "Campus and volume hiring",
      "AI-assisted sourcing across markets",
      "Interview operations and offer management",
      "Hiring analytics by city and function",
      "Dedicated account governance",
    ],
    outcome: "Nationwide hiring execution with enterprise-grade visibility and control.",
  },
  services: {
    heading: "India GCC Hiring Services",
    items: [
      "Engineering Hiring",
      "Product & Design Hiring",
      "Leadership Search",
      "Shared Services Hiring",
      "Finance & Operations Hiring",
      "Campus Recruitment",
      "High-Volume Hiring",
      "Confidential Hiring",
      "Multi-location Deployment",
      "Recruitment Operations",
      "Employer Branding Support",
      "Hiring Analytics",
    ],
  },
  categories: {
    heading: "Cities & Talent Hubs We Serve",
    items: ["Bengaluru", "Hyderabad", "Pune", "Chennai", "NCR", "Mumbai", "Kolkata", "Ahmedabad", "Coimbatore", "Tier 2 Expansion"],
  },
  timeline: {
    heading: "How India GCC Hiring Services Work",
    steps: sharedTimeline,
  },
  differentiators: {
    heading: "Why Enterprises Choose EarlyJobs for India Hiring",
    items: [
      "400+ Recruiter Network",
      "Human + AI Hiring Infrastructure",
      "Multi-City Execution",
      "Dedicated Hiring Pods",
      "Recruitment Operations",
      "Enterprise Governance",
    ],
  },
  outcomes: {
    heading: "Business Outcomes",
    items: [
      "Faster Multi-City Hiring",
      "Reduced Vendor Complexity",
      "Improved Hiring Visibility",
      "Higher Offer Acceptance",
      "Scalable Recruiter Capacity",
      "Consistent Candidate Experience",
    ],
  },
  governance: {
    heading: "Delivery Governance",
    items: [
      "City-wise hiring dashboards",
      "Weekly performance reviews",
      "SLA and funnel tracking",
      "Leadership reporting",
      "Recruiter performance metrics",
      "Cross-city hiring coordination",
    ],
  },
  faqs: [
    {
      question: "Do you support hiring across multiple Indian cities?",
      answer: "Yes. Multi-city GCC hiring is a core part of our India hiring services delivery model.",
    },
    {
      question: "Can you hire engineering teams in Bengaluru and Hyderabad simultaneously?",
      answer: "Yes. We deploy recruiter pods and coordinate hiring across multiple talent hubs in parallel.",
    },
    {
      question: "How is this different from using local agencies in each city?",
      answer:
        "EarlyJobs provides unified processes, visibility, governance, and a single accountable partner—not fragmented local vendors.",
    },
    {
      question: "Do you support both greenfield and expansion hiring?",
      answer: "Yes. We support new GCC launches and expansion hiring across India.",
    },
  ],
  finalCta: {
    heading: "Ready to Scale Hiring Across India?",
    paragraph:
      "Partner with EarlyJobs for pan-India GCC hiring services that combine recruiter networks, Human + AI operations, and enterprise-grade execution.",
    primaryCta: "Book India GCC Hiring Consultation",
    secondaryCta: "Download India Hiring Services Guide",
  },
};

export const GCC_PAGES: Record<string, GccPageContent> = {
  "gcc-hiring-solutions": gccHiringSolutions,
  "build-gcc-india": buildGccIndia,
  "gcc-recruitment-partner": gccRecruitmentPartner,
  "offshore-capability-center-hiring": offshoreCapabilityCenterHiring,
  "gcc-talent-acquisition": gccTalentAcquisition,
  "india-gcc-hiring-services": indiaGccHiringServices,
};

export function getGccPageContent(slug: string): GccPageContent | undefined {
  return GCC_PAGES[slug];
}
