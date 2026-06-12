const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;

export const WEBINAR_PATH = "/public/webinar";
export const WEBINAR_REGISTER_PATH = "/public/webinar/register";

export interface WebinarStipendTier {
  range: string;
  amount: string;
  highlight?: boolean;
}

export interface WebinarTestimonial {
  name: string;
  role: string;
  earning: string;
  quote: string;
  img?: number | string;
}

export interface WebinarMentor {
  name: string;
  title: string;
  subtitle?: string;
  bio: string;
  extendedBio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
}

export interface WebinarFaq {
  question: string;
  answer: string;
}

export interface WebinarStat {
  value: string;
  label: string;
}

export interface HrRecruiterWebinarData {
  id?: string;
  isActive: boolean;
  webinarDate: string;
  webinarTime: string;
  webinarDateDisplay: string;
  mode: string;
  duration: string;
  countdownSeconds: number;
  badgeText: string;
  title: string;
  titleHighlight: string;
  heroDescription: string;
  videoUrl?: string;
  rating: string;
  trainedCount: string;
  socialProofTitle: string;
  socialProofSubtitle: string;
  featuredIn: string[];
  companyLogos: string[];
  problemPoints: string[];
  problemNote: string;
  learnPoints: string[];
  aboutDescription: string;
  aboutPoints: string[];
  aboutNote: string;
  stipendTiers: WebinarStipendTier[];
  testimonials: WebinarTestimonial[];
  successStoriesNote: string;
  whoShouldAttend: string[];
  mentor: WebinarMentor;
  wfhPoints: string[];
  wfhNote: string;
  importantNotes: string[];
  importantNote: string;
  stats: WebinarStat[];
  faqs: WebinarFaq[];
  finalCtaLine1: string;
  finalCtaLine2: string;
}

export interface WebinarRegistrationPayload {
  name: string;
  email: string;
  mobile: string;
  city?: string;
  webinarId?: string;
}

const DEFAULT_FAQS: WebinarFaq[] = [
  {
    question: "Do I need prior HR experience?",
    answer:
      "No prior experience is required. We provide complete training and mentorship to help you get started.",
  },
  {
    question: "Is this internship really work from home?",
    answer:
      "Yes! The entire internship is remote. You can work from anywhere in India with just a laptop and internet connection.",
  },
  {
    question: "How does the stipend work?",
    answer:
      "The stipend is performance-based. You earn based on successful candidate joinings — the more placements you make, the more you earn.",
  },
  {
    question: "When will I get the webinar link?",
    answer:
      "After registration, you will receive the meeting link on your WhatsApp and email within a few hours.",
  },
  {
    question: "Is the webinar really free?",
    answer: "Yes, the webinar is 100% free. There are no hidden charges to attend.",
  },
];

const DEFAULT_TESTIMONIALS: WebinarTestimonial[] = [
  {
    name: "Jyoti",
    role: "HR Recruiter Intern",
    earning: "₹36,000/month",
    quote:
      "Started with zero HR experience. Within one month, I earned ₹36,000 through placements.",
    img: 5,
  },
  {
    name: "Tushar",
    role: "HR Recruiter Intern",
    earning: "₹24,000/month",
    quote:
      "The internship gave me real skills and confidence. I earned ₹24,000 in my first month.",
    img: 12,
  },
  {
    name: "Priya",
    role: "Fresher → HR Intern",
    earning: "₹18,000/month",
    quote:
      "I was applying everywhere with no luck. This webinar showed me exactly how to start and earn from home.",
    img: 9,
  },
];

function formatWebinarDateDisplay(value: string): string {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return value;
}

function getCountdownSeconds(
  countdownEndsAt?: string,
  webinarDate?: string,
  webinarTime?: string
): number {
  if (countdownEndsAt) {
    const end = new Date(countdownEndsAt).getTime();
    const diff = Math.floor((end - Date.now()) / 1000);
    if (diff > 0) return diff;
  }

  if (webinarDate) {
    const parsed = new Date(webinarDate);
    if (!Number.isNaN(parsed.getTime())) {
      const diff = Math.floor((parsed.getTime() - Date.now()) / 1000);
      if (diff > 0) return diff;
    }
  }

  return 15 * 60;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
  return items.length ? items : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function isValidWebinarPayload(raw: unknown): boolean {
  if (!isRecord(raw)) return false;
  if (raw.isActive === false) return false;

  const webinarDate = asString(raw.webinarDate) ?? asString(raw.date);
  const webinarTime = asString(raw.webinarTime) ?? asString(raw.time);

  return Boolean(webinarDate && webinarTime);
}

export function normalizeWebinarData(raw: unknown): HrRecruiterWebinarData | null {
  if (!isValidWebinarPayload(raw)) return null;

  const data = raw as Record<string, unknown>;
  const webinarDate = asString(data.webinarDate) ?? asString(data.date)!;
  const webinarTime = asString(data.webinarTime) ?? asString(data.time)!;
  const webinarDateDisplay =
    asString(data.webinarDateDisplay) ?? formatWebinarDateDisplay(webinarDate);

  const mentorRaw = isRecord(data.mentor) ? data.mentor : {};

  return {
    id: asString(data.id) ?? asString(data._id),
    isActive: data.isActive !== false,
    webinarDate,
    webinarTime,
    webinarDateDisplay,
    mode: asString(data.mode) ?? "Online (Google Meet / Zoom)",
    duration: asString(data.duration) ?? "30–45 Minutes",
    countdownSeconds: getCountdownSeconds(
      asString(data.countdownEndsAt),
      webinarDate,
      webinarTime
    ),
    badgeText: asString(data.badgeText) ?? "Free Live Webinar – Limited Seats",
    title:
      asString(data.title) ?? "Start Your Career as an HR Recruiter Intern",
    titleHighlight: asString(data.titleHighlight) ?? "(Work From Home)",
    heroDescription:
      asString(data.heroDescription) ??
      "No prior experience required. Learn how to break into HR recruitment, gain real corporate experience, and start earning from home.",
    videoUrl: asString(data.videoUrl),
    rating: asString(data.rating) ?? "4.8/5",
    trainedCount: asString(data.trainedCount) ?? "2,500+ Interns Trained",
    socialProofTitle:
      asString(data.socialProofTitle) ?? "Join 2,500+ Aspiring HR Professionals",
    socialProofSubtitle:
      asString(data.socialProofSubtitle) ??
      "Students and freshers already building their careers with us",
    featuredIn: asStringArray(data.featuredIn) ?? [
      "YourStory",
      "Inc42",
      "Economic Times",
      "Hindustan Times",
      "DNA India",
      "Business Standard",
    ],
    companyLogos: asStringArray(data.companyLogos) ?? [
      "TCS",
      "Infosys",
      "Wipro",
      "HCL",
      "Accenture",
      "Amazon",
      "Flipkart",
      "Deloitte",
      "Cognizant",
      "Capgemini",
      "IBM",
      "Genpact",
    ],
    problemPoints: asStringArray(data.problemPoints) ?? [
      "Applied to 20–30 jobs but got no response?",
      "Don't have any practical experience?",
      "Confused about how to start your career?",
    ],
    problemNote:
      asString(data.problemNote) ??
      "You're not alone — and this webinar will help you fix it.",
    learnPoints: asStringArray(data.learnPoints) ?? [
      "How the hiring process actually works",
      "How to gain real HR experience from home",
      "How to start earning while learning",
      "Step-by-step path to become an HR Recruiter Intern",
    ],
    aboutDescription:
      asString(data.aboutDescription) ??
      "We are offering an HR Recruiter Internship (Remote) where you will:",
    aboutPoints: asStringArray(data.aboutPoints) ?? [
      "Work on real hiring requirements",
      "Screen and shortlist candidates",
      "Conduct initial interviews",
      "Coordinate with hiring teams",
    ],
    aboutNote:
      asString(data.aboutNote) ??
      "This is not just learning — this is real corporate experience.",
    stipendTiers: Array.isArray(data.stipendTiers)
      ? (data.stipendTiers as WebinarStipendTier[])
      : [
          { range: "0–4 Joinings", amount: "No stipend", highlight: false },
          { range: "5–8 Joinings", amount: "₹3,000", highlight: true },
          { range: "9–12 Joinings", amount: "₹5,000", highlight: true },
        ],
    testimonials: Array.isArray(data.testimonials)
      ? (data.testimonials as WebinarTestimonial[])
      : DEFAULT_TESTIMONIALS,
    successStoriesNote:
      asString(data.successStoriesNote) ?? "You can be the next success story.",
    whoShouldAttend: asStringArray(data.whoShouldAttend) ?? [
      "Students looking for internships",
      "Freshers struggling to get jobs",
      "Anyone who wants to earn while learning",
      "Individuals looking for work-from-home opportunities",
      "Women who want to restart their careers",
      "Those serious about building a career",
    ],
    mentor: {
      name: asString(mentorRaw.name) ?? "Priya Sharma",
      title:
        asString(mentorRaw.title) ??
        "Senior HR Recruiter & Internship Program Lead",
      subtitle: asString(mentorRaw.subtitle) ?? "EarlyJobs · 8+ Years in Recruitment",
      bio:
        asString(mentorRaw.bio) ??
        "Priya has helped 2,500+ students and freshers start their careers in HR recruitment.",
      extendedBio:
        asString(mentorRaw.extendedBio) ??
        "In this free webinar, she'll show you exactly how the hiring process works, how to gain real experience from home, and how to start earning through performance-based stipends — with no prior experience needed.",
      imageUrl:
        asString(mentorRaw.imageUrl) ??
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop",
      linkedinUrl: asString(mentorRaw.linkedinUrl),
      youtubeUrl: asString(mentorRaw.youtubeUrl),
      instagramUrl: asString(mentorRaw.instagramUrl),
    },
    wfhPoints: asStringArray(data.wfhPoints) ?? [
      "Women looking to restart their careers",
      "Individuals seeking flexible work-from-home roles",
      "Anyone wanting to build a career without relocating",
    ],
    wfhNote:
      asString(data.wfhNote) ??
      "Learn, work, and earn — all from the comfort of your home.",
    importantNotes: asStringArray(data.importantNotes) ?? [
      "Not for timepass",
      "Requires consistency and effort",
      "Performance-based growth",
    ],
    importantNote:
      asString(data.importantNote) ??
      "Only apply if you are serious about your future.",
    stats: Array.isArray(data.stats)
      ? (data.stats as WebinarStat[])
      : [
          { value: "2,500+", label: "Interns Trained" },
          { value: "4.8/5", label: "Student Rating" },
          { value: "100%", label: "Work From Home" },
          { value: "₹36K", label: "Top Monthly Earning" },
        ],
    faqs: Array.isArray(data.faqs)
      ? (data.faqs as Array<Record<string, string>>).map((faq) => ({
          question: faq.question ?? faq.q ?? "",
          answer: faq.answer ?? faq.a ?? "",
        })).filter((faq) => faq.question && faq.answer)
      : DEFAULT_FAQS,
    finalCtaLine1:
      asString(data.finalCtaLine1) ?? "This webinar won't change your life —",
    finalCtaLine2:
      asString(data.finalCtaLine2) ?? "But taking action after it will.",
  };
}

export async function fetchHrRecruiterWebinarData(): Promise<HrRecruiterWebinarData | null> {
  if (!API_BASE) return null;

  try {
    const response = await fetch(`${API_BASE}${WEBINAR_PATH}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return null;

    const json = await response.json();
    const payload = json?.data ?? json;
    return normalizeWebinarData(payload);
  } catch {
    return null;
  }
}

export async function registerHrRecruiterWebinar(
  payload: WebinarRegistrationPayload
): Promise<{ success: boolean; message?: string }> {
  if (!API_BASE) {
    return { success: false, message: "API is not configured" };
  }

  try {
    const response = await fetch(`${API_BASE}${WEBINAR_REGISTER_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: json?.message || "Registration failed. Please try again.",
      };
    }

    return {
      success: true,
      message:
        json?.message ||
        "Registration successful! You will receive the meeting link on WhatsApp/Email shortly.",
    };
  } catch {
    return { success: false, message: "Registration failed. Please try again." };
  }
}
