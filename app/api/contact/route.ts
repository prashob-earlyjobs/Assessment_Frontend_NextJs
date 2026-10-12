import { NextResponse } from "next/server";
import {
  buildEnquiryMailto,
  enquiryTopics,
  isValidEmail,
  type ContactEnquiryPayload,
} from "@/lib/contact";

/**
 * Contact form handler.
 *
 * If CONTACT_FORM_WEBHOOK_URL is set, posts JSON to that endpoint.
 * Otherwise returns a mailto URL so the client can open the user's email
 * app addressed to info@earlyjobs.in (direct connect, no third-party service).
 */
export async function POST(request: Request) {
  let body: Partial<ContactEnquiryPayload>;
  try {
    body = (await request.json()) as Partial<ContactEnquiryPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!firstName || !lastName || !email || !topic || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }
  if (!(enquiryTopics as readonly string[]).includes(topic)) {
    return NextResponse.json({ ok: false, error: "Invalid enquiry topic." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  const payload: ContactEnquiryPayload = {
    firstName,
    lastName,
    email,
    phone: phone || undefined,
    topic,
    company: company || undefined,
    message,
  };

  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
  if (!webhook) {
    return NextResponse.json({
      ok: true,
      delivery: "mailto",
      mailtoUrl: buildEnquiryMailto(payload),
    });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        source: "earlyjobs-contact-us",
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "We could not deliver your enquiry. Please try again or email info@earlyjobs.in.",
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "We could not deliver your enquiry. Please try again or email info@earlyjobs.in.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivery: "webhook" });
}
