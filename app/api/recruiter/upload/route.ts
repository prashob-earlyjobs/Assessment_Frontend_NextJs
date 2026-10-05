import { NextResponse } from "next/server";
import { uploadPublicFile } from "@/lib/recruiter-upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const folderPath = String(form.get("folderPath") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ message: "A file is required" }, { status: 400 });
    }
    if (!folderPath) {
      return NextResponse.json({ message: "folderPath is required" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "Only image files are allowed" }, { status: 400 });
    }
    if (file.size > 1 * 1024 * 1024) {
      return NextResponse.json({ message: "File must be 1 MB or smaller" }, { status: 400 });
    }

    const data = await uploadPublicFile(file, folderPath);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload file";
    console.error("[recruiter/upload]", message);
    const status = /too large|413/i.test(message) ? 413 : 502;
    return NextResponse.json({ message }, { status });
  }
}
