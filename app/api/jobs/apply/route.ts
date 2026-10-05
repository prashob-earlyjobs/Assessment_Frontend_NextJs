import { NextResponse } from "next/server";

const APPLY_ENDPOINT = "https://portal-bd-prod.earlyjobs.ai/api/public/jobs/apply";

const applyHeaders = {
  Referer: "https://www.earlyjobs.ai/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
  "sec-ch-ua": '"Google Chrome";v="153", "Not_A Brand";v="8", "Chromium";v="153"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
};

type ApplyBody = {
  jobId: string;
  fullName: string;
  email: string;
  fatherName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  aadharNumber?: string;
  highestQualification: string;
  currentLocationDetails: string;
  spokenLanguages: string[];
  totalExperienceYears: number;
  totalExperienceMonths: number;
  skills: string[];
  workMode: string[];
  isExternalJob: boolean;
};

function asStringList(value: unknown) {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : null;
}

function application(body: ApplyBody): ApplyBody | null {
  if (!body || typeof body !== "object") return null;
  if (!/^ej[A-Za-z0-9]+$/.test(body.jobId ?? "")) return null;
  const spokenLanguages = asStringList(body.spokenLanguages);
  const skills = asStringList(body.skills);
  const workMode = asStringList(body.workMode);
  if (!spokenLanguages || !skills || !workMode) return null;

  const application: ApplyBody = {
    jobId: body.jobId,
    fullName: String(body.fullName ?? "").trim(),
    email: String(body.email ?? "").trim(),
    fatherName: String(body.fatherName ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    dateOfBirth: String(body.dateOfBirth ?? ""),
    gender: String(body.gender ?? ""),
    highestQualification: String(body.highestQualification ?? ""),
    currentLocationDetails: String(body.currentLocationDetails ?? "").trim(),
    spokenLanguages,
    totalExperienceYears: Number(body.totalExperienceYears) || 0,
    totalExperienceMonths: Number(body.totalExperienceMonths) || 0,
    skills,
    workMode,
    isExternalJob: body.isExternalJob === true,
  };
  const aadhar = String(body.aadharNumber ?? "").trim();
  if (aadhar) application.aadharNumber = aadhar;
  return application;
}

export async function POST(request: Request) {
  const incoming = await request.formData().catch(() => null);
  const raw = incoming?.get("application");
  let parsed: ApplyBody | null = null;
  try {
    parsed = raw ? (JSON.parse(String(raw)) as ApplyBody) : null;
  } catch {
    parsed = null;
  }
  const body = application(parsed as ApplyBody);
  if (!body) return NextResponse.json({ error: "Invalid application" }, { status: 400 });

  const resume = incoming?.get("resume");
  const file = resume instanceof File && resume.size > 0 ? resume : null;
  if (file && file.size > 3 * 1024 * 1024) {
    return NextResponse.json({ error: "Resume must be 3MB or smaller" }, { status: 400 });
  }

  const response = file
    ? await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: applyHeaders,
        body: (() => {
          const form = new FormData();
          form.append("jobId", body.jobId);
          form.append("fullName", body.fullName);
          form.append("email", body.email);
          form.append("fatherName", body.fatherName);
          form.append("phone", body.phone);
          form.append("dateOfBirth", body.dateOfBirth);
          form.append("gender", body.gender);
          if (body.aadharNumber) form.append("aadharNumber", body.aadharNumber);
          form.append("highestQualification", body.highestQualification);
          form.append("currentLocationDetails", body.currentLocationDetails);
          form.append("spokenLanguages", JSON.stringify(body.spokenLanguages));
          form.append("totalExperienceYears", String(body.totalExperienceYears));
          form.append("totalExperienceMonths", String(body.totalExperienceMonths));
          form.append("skills", JSON.stringify(body.skills));
          form.append("workMode", JSON.stringify(body.workMode));
          form.append("isExternalJob", String(body.isExternalJob));
          form.append("resume", file);
          return form;
        })(),
      })
    : await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: {
          ...applyHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

  const result = (await response.json().catch(() => ({}))) as {
    status?: string;
    message?: string;
    error?: string | { message?: string };
  };
  const status = typeof result.status === "string" ? result.status.toLowerCase() : "";
  const errorText = typeof result.error === "string" ? result.error : result.error?.message || "";
  const message = (typeof result.message === "string" ? result.message.trim() : "") || errorText;
  const failedStatus = status === "fail" || status === "failed" || status === "error";
  const success =
    !failedStatus &&
    !errorText &&
    (status === "success" || (response.ok && /success|submitted/i.test(message)));

  if (!success) {
    return NextResponse.json(
      { status: "fail", message: message || "Failed to submit application" },
      { status: response.ok ? 400 : response.status || 400 },
    );
  }

  return NextResponse.json({ status: "success", message: message || "Application submitted" });
}
