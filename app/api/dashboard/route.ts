import { NextResponse } from "next/server";
import { fallbackDashboard, getDashboard } from "@/lib/dashboard";

export async function GET() {
  try {
    const data = await getDashboard();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: fallbackDashboard }, { status: 200 });
  }
}
