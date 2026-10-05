import { NextResponse } from "next/server";
import {
  buildRecruiterOnboardingPayload,
  createRecruiterOnboarding,
  type RecruiterOnboardingInput,
} from "@/lib/recruiter-onboarding";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as RecruiterOnboardingInput;
    if (!input?.personal || !input?.qualification || !input?.about || !input?.references || !input?.identification) {
      return NextResponse.json({ message: "Incomplete application payload" }, { status: 400 });
    }

    const payload = buildRecruiterOnboardingPayload(input);
    const data = await createRecruiterOnboarding(payload);
    return NextResponse.json({ status: "success", data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit application";
    console.error("[recruiter/onboarding]", message);
    return NextResponse.json({ message }, { status: 502 });
  }
}
