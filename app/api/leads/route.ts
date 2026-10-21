import { NextResponse } from "next/server";
import { earlyJobsContact, isValidEmail } from "@/lib/contact";

const specialisations = [
  "BPO",
  "IT",
  "Banking",
  "Insurance",
  "Aviation",
  "Retail",
  "Education",
  "Manufacturing",
  "Healthcare",
  "E-commerce",
  "Hospitality",
  "Construction",
  "Other",
] as const;

type LeadBody = {
  name?: string;
  agencyName?: string;
  email?: string;
  phone?: string;
  specialisation?: string;
  cities?: string;
  consent?: boolean;
  source?: string;
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const agencyName = String(body.agencyName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const specialisation = String(body.specialisation ?? "").trim();
  const cities = String(body.cities ?? "").trim();
  const source = String(body.source ?? "").trim();

  if (!name || !agencyName || !email || !phone || !specialisation || !cities) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }
  if (!(specialisations as readonly string[]).includes(specialisation)) {
    return NextResponse.json({ ok: false, error: "Invalid specialisation." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: "Consent is required." }, { status: 400 });
  }
  if (source !== "agency_partnership") {
    return NextResponse.json({ ok: false, error: "Invalid lead source." }, { status: 400 });
  }

  const payload = {
    source,
    submittedAt: new Date().toISOString(),
    name,
    agencyName,
    email,
    phone,
    specialisation,
    cities,
    consent: true,
  };

  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
  if (!webhook) {
    const lines = [
      `Name: ${name}`,
      `Agency name: ${agencyName}`,
      `Work email: ${email}`,
      `Phone: ${phone}`,
      `Primary specialisation: ${specialisation}`,
      `Cities served: ${cities}`,
      "Consent: I agree to be contacted about partnership.",
    ];
    const mailtoUrl = `mailto:${earlyJobsContact.email}?subject=${encodeURIComponent("Agency partnership application")}&body=${encodeURIComponent(lines.join("\n"))}`;
    return NextResponse.json({ ok: true, delivery: "mailto", mailtoUrl });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "Lead delivery failed." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Lead delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivery: "webhook" });
}
