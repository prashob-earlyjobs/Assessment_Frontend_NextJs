import { NextResponse } from "next/server";
import { getPublicCompanies } from "@/lib/public-companies";

export async function GET() {
  try {
    const data = await getPublicCompanies();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, data: [] }, { status: 200 });
  }
}
