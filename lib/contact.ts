/** Verified EarlyJobs contact details — single source for footer + Contact Us. */
export const earlyJobsContact = {
  email: "info@earlyjobs.in",
  phoneDisplay: "+91 82175 27926",
  phoneTel: "+918217527926",
  /** Matches the site footer address exactly. */
  address:
    "2nd Floor, Regent Insignia, Obeya Tulip, Mahakavi Vemana Rd, KHB Block, 4th Block, Koramangala, Bengaluru, Karnataka 560095",
  addressShort:
    "Regent Insignia, Mahakavi Vemana Rd, Koramangala, Bengaluru 560095",
  mapsEmbed:
    "https://maps.google.com/maps?q=Regent%20Insignia%2C%20Mahakavi%20Vemana%20Rd%2C%20Koramangala%2C%20Bengaluru%20560095&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Regent+Insignia+Mahakavi+Vemana+Rd+Koramangala+Bengaluru+560095",
} as const;

export const gigKaroContact = {
  email: "hello@gigkaro.in",
  phoneDisplay: "+91 91803 79173",
  phoneTel: "+919180379173",
  site: "https://gigkaro.in",
} as const;

export const huntloContact = {
  email: "info@huntlo.ai",
  phoneDisplay: "+91 96113 29404",
  phoneTel: "+919611329404",
  site: "https://www.huntlo.ai",
} as const;

export const enquiryTopics = [
  "Hiring for my company",
  "Recruitment consultancy partnership",
  "Freelance recruiter opportunities",
  "Franchise partnership",
  "Frontline hiring through GigKaro",
  "Global or GCC recruitment",
  "General enquiry",
] as const;

export type EnquiryTopic = (typeof enquiryTopics)[number];

export type ContactEnquiryPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  topic: EnquiryTopic | string;
  company?: string;
  message: string;
};

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Build a mailto link that opens the user's email client with the enquiry. */
export function buildEnquiryMailto(payload: ContactEnquiryPayload) {
  const lines = [
    `Name: ${payload.firstName.trim()} ${payload.lastName.trim()}`,
    `Work email: ${payload.email.trim()}`,
    payload.phone?.trim() ? `Phone: ${payload.phone.trim()}` : null,
    `Topic: ${payload.topic}`,
    payload.company?.trim() ? `Company: ${payload.company.trim()}` : null,
    "",
    payload.message.trim(),
  ].filter((line): line is string => line !== null);

  const subject = `EarlyJobs enquiry — ${payload.topic}`;
  return `mailto:${earlyJobsContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
