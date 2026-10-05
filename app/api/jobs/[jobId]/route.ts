import { NextResponse } from "next/server";
import { getPublicJob } from "@/lib/public-jobs";

export async function GET(_request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await getPublicJob(jobId);
  if (!job) return NextResponse.json({ status: "fail" }, { status: 404 });
  return NextResponse.json({ status: "success", data: job });
}
